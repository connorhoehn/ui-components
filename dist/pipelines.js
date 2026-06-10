import { jsxs as o, jsx as e, Fragment as K } from "react/jsx-runtime";
import go, { useState as S, useRef as le, useMemo as q, useEffect as ne, memo as Zo, useCallback as E, useContext as xo, createContext as ea } from "react";
import { useNavigate as Be, useParams as gt, Navigate as xt, useSearchParams as an } from "react-router";
import { v as he, w as Ae, q as Re, G as Vn, x as Ue, u as bt, i as ta, g as na, f as nr, p as ra, y as oa, J as cn, t as bo, I as yo, e as Bt, S as en, N as aa, T as dn, n as vo, a as ot, z as No, A as Wn, B as En, C as wo, D as ia, E as sa, F as la, b as ca, H as at, K as da, L as pa, M as it, O as rr, Q as ua, j as ma, o as ko, R as tn, U as ha, m as or, P as fa, V as ga, r as xa, W as nn, l as ar, X as ba, k as ya } from "./PipelineEditorServicesContext-D_ZyIOs7.js";
import { h as lf } from "./PipelineEditorServicesContext-D_ZyIOs7.js";
import { Handle as U, Position as F, useNodeConnections as va, getSmoothStepPath as Na, EdgeLabelRenderer as ir, ReactFlowProvider as wa, useReactFlow as ka, useNodesState as Co, useEdgesState as Io, ReactFlow as So, Background as $o, BackgroundVariant as Ca, Controls as To, MiniMap as Ia } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as Jn, a as sn } from "./ToastProvider-aHBNxMTO.js";
import { u as Sa, I as yt, F as $a, b as Ta, C as Hn, T as Aa, S as Gn, a as Ra } from "./FilterChip-BvY6ESrs.js";
import "clsx";
import "tailwind-merge";
import { M as He } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Ee, u as Pa } from "./EventStreamContext-CjzSHXy-.js";
import { E as df } from "./EventStreamContext-CjzSHXy-.js";
import { B as Oe } from "./Button-Qsbxqsl9.js";
import { I as mt, F as Ma } from "./FileUploadDrop-Cmz3XANg.js";
import { u as Kn } from "./IdentityContext-CLalsm_M.js";
import { B as Ze } from "./Banner-DKb3JiLs.js";
import { C as se } from "./Chip-CAS9vOWq.js";
import { E as ze } from "./EmptyState-PM9wTjxk.js";
import { C as rn } from "./ConfirmDialog-CNoxvYGu.js";
import { B as Da, L as qt } from "./Chart-ByoxeiYX.js";
import { S as pn } from "./SkeletonCard-C89GWQ3p.js";
const Ea = "";
function sr(t, n) {
  const r = t.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function Oa({ value: t, onChange: n, placeholder: r, maxSelect: a }) {
  const { presenceUsers: i } = Sa(), { idToken: s } = Kn(), [d, c] = S(""), [l, p] = S(!1), [u, f] = S(0), [h, g] = S([]), x = le(null), m = le(null), N = q(() => {
    const $ = new Set(t), R = [];
    for (const D of i)
      $.has(D.clientId) || ($.add(D.clientId), R.push({
        userId: D.clientId,
        displayName: sr(D.metadata, D.clientId)
      }));
    return R;
  }, [i, t]);
  ne(() => {
    const $ = d.trim();
    if (!$ || !s) {
      g([]);
      return;
    }
    const R = new AbortController(), D = setTimeout(() => {
      const A = `${Ea}/api/profiles?q=${encodeURIComponent($)}&limit=20`;
      fetch(A, {
        headers: { Authorization: `Bearer ${s}` },
        signal: R.signal
      }).then((B) => B.ok ? B.json() : Promise.reject(new Error(`HTTP ${B.status}`))).then((B) => {
        g(Array.isArray(B.profiles) ? B.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(D), R.abort();
    };
  }, [d, s]);
  const y = q(() => {
    const $ = new Set(t), R = [];
    for (const D of N)
      $.has(D.userId) || ($.add(D.userId), R.push(D));
    for (const D of h)
      $.has(D.userId) || ($.add(D.userId), R.push({
        userId: D.userId,
        displayName: D.displayName || D.userId.slice(0, 8)
      }));
    return R;
  }, [N, h, t]), v = q(() => {
    const $ = d.trim().toLowerCase();
    return $ ? y.filter(
      (R) => R.displayName.toLowerCase().includes($) || R.userId.toLowerCase().includes($)
    ) : y;
  }, [y, d]), w = typeof a == "number" && t.length >= a, b = ($) => {
    const R = $.trim();
    R && (t.includes(R) || w || (n([...t, R]), c(""), f(0)));
  }, k = ($) => {
    n(t.filter((R) => R !== $));
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
    if (R) return sr(R.metadata, $);
    const D = h.find((A) => A.userId === $);
    return D && D.displayName ? D.displayName : $;
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
const _a = {
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
}, La = {
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
function On(t, n, r, a) {
  return !(!Ba(t, n) || !Ua(r, a));
}
function Ba(t, n) {
  const r = _a[t];
  return r === "fork" ? Fa(n) : r.includes(n);
}
function Ua(t, n) {
  const r = La[t];
  return r === null ? !1 : r === "join" ? ja(n) : r.includes(n);
}
function Fa(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function ja(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const za = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
}, qa = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function xe(t) {
  const { icon: n, subtitle: r, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, category: f, children: h } = t, g = za[a], x = f ? qa[f] : void 0, m = Jn(), [N, y] = S(!1), v = a === "failed" && typeof c == "function", w = ($) => {
    $.preventDefault(), $.stopPropagation(), c?.();
  }, b = !m && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !m && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", k = !!(i || s || v), C = !!(i || s), T = r ? `${r}, state: ${a}` : `Node, state: ${a}`;
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
              children: /* @__PURE__ */ e("span", { className: I("text-xs leading-none", x.glyph), children: n })
            }
          ) : /* @__PURE__ */ e("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: n }),
          /* @__PURE__ */ e("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
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
const Va = {
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
  return Va[t];
}
const Wa = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-slate-300",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-amber-500",
  error: "!w-2 !h-2 !bg-red-600"
};
function z(t) {
  return Wa[t];
}
function lr(t) {
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
function Ja(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function Ha(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${lr(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    xe,
    {
      icon: "▶",
      subtitle: lr(r),
      state: c,
      category: fe("trigger"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ja(r) }),
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
          className: z("data")
        }
      )
    }
  );
}
function Ga(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Ka({ info: t }) {
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
function Ya(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = Ae(), h = c === "failed" ? () => f(n) : void 0, g = /* @__PURE__ */ e("span", { className: "italic", children: Ga(r.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, N = m ? /* @__PURE__ */ e(Ka, { info: m }) : void 0, y = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), v = y.length === 0 ? "no system prompt" : `system prompt: ${y.length > 60 ? `${y.slice(0, 60)}…` : y}`, w = `LLM node, ${r.model || r.provider}, ${v}, state: ${c}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      category: fe("llm"),
      body: g,
      footer: N,
      selected: a,
      onRetry: h,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("text")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function Xa(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Qa(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: fe("transform"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Xa(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function Za(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ei(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: fe("condition"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Za(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "true", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "false", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function ti(t) {
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
function ni(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: fe("action"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: ti(r) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function ri(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), f = Array.from({ length: u }, (h, g) => {
    const x = r.branchLabels?.[g];
    return x && x.trim().length > 0 ? x : `branch ${g}`;
  });
  return /* @__PURE__ */ o(
    xe,
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
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        f.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            U,
            {
              type: "source",
              position: F.Right,
              id: `branch-${g}`,
              className: z("control"),
              style: { top: `${x}%` }
            },
            g
          );
        })
      ]
    }
  );
}
function oi(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function ai(t) {
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
function ii(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = va({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⑃",
      subtitle: oi(r),
      state: c,
      category: fe("join"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: ai(r.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, g) => {
          const x = (g + 1) / (f + 1) * 100;
          return /* @__PURE__ */ e(
            U,
            {
              type: "target",
              position: F.Left,
              id: `in-${g}`,
              className: z("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function si(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function li(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], f = u.length, h = r.requiredCount ?? 0, g = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, x = u.slice(0, 2), m = Math.max(0, u.length - 2), N = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((y, v) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: si(y)
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
    xe,
    {
      icon: "✋",
      subtitle: g,
      state: c,
      category: fe("approval"),
      body: N,
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "approved", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "rejected", className: `${z("data")} !top-[60%]` })
      ]
    }
  );
}
function ci({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: fe("agent"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function di({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: fe("mcp-tool"),
      body: n.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function pi({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: fe("knowledge-base"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function ui({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: fe("graph-query"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function mi({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: fe("memory"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function hi({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    xe,
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
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "pass", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "block", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function fi({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Ae(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ o(
    xe,
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
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "allow", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "deny", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function gi({ id: t, data: n, selected: r }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ e(
    xe,
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
      children: /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") })
    }
  );
}
const xi = (t) => t.stopPropagation();
function bi(t) {
  const { id: n, data: r, selected: a } = t, [i, s] = S(!1), d = he(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Re(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = h ? /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        ),
        onMouseDown: xi,
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
  return /* @__PURE__ */ e(
    xe,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: p,
      category: fe("image-source"),
      body: g,
      footer: x,
      selected: a,
      ariaLabel: `Image Source node, state: ${p}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        U,
        {
          type: "source",
          position: F.Right,
          id: "out",
          className: z("image")
        }
      )
    }
  );
}
const cr = (t) => t.stopPropagation(), dr = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
);
function ln({
  images: t,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const a = Re(), [i, s] = S(null);
  if (t.length === 0) return null;
  const d = t.length > n, c = d ? t.slice(0, n - 1) : t, l = t.length - c.length, p = (u) => (f) => {
    f.stopPropagation(), s(u);
  };
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("div", { "data-testid": r, className: "flex flex-row items-center gap-1", children: [
      c.map((u, f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": `${r}-thumb-${f}`,
          "aria-label": u.alt ?? `Result image ${f + 1} of ${t.length}`,
          className: dr,
          onMouseDown: cr,
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
          "data-testid": `${r}-overflow`,
          "aria-label": `Show all ${t.length} images`,
          className: I(
            dr,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: cr,
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
function yi(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.images ?? [], u = i?.output?.filename ?? null, f = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
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
  ), h = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, x = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), m = "image:save", N = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⬇",
      subtitle: m,
      state: c,
      category: fe("image:save"),
      body: f,
      footer: x,
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
            className: z("image")
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            type: "source",
            position: F.Right,
            id: "out",
            className: z("image")
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            type: "source",
            position: F.Right,
            id: "error",
            className: `${z("error")} !top-[75%]`
          }
        )
      ]
    }
  );
}
function vi(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Ni(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: vi(r.itemsPath ?? "") }),
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
  ] }) : void 0, g = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", x = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", m = `scatter${g}${x}`, N = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      category: fe("scatter"),
      body: u,
      footer: h,
      selected: a,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("control") })
      ]
    }
  );
}
function wi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, f = p ? /* @__PURE__ */ e(
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
  ] }) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      category: fe("image:resize"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ki(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Ci(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], f = u.length > 0 ? u.map(ki).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
    xe,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      category: fe("image:transform"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ii(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function Si(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? Ii(r) : null, f = p ? /* @__PURE__ */ e(
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
    xe,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: fe("image:format-convert"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function $i(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, f = p ? /* @__PURE__ */ e(
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
    xe,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: fe("image:sharpen"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ti(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", f = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
  ), g = r.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    f
  ] }) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      category: fe("image:watermark"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ai(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function Ri(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = Ai(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
  ) : void 0, x = `Crop node, source: ${r.sourceImagePath ?? "default"}, state: ${l}`;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      category: fe("image:crop"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") })
      ]
    }
  );
}
function Pi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
  ), f = r.algorithm ?? "luminosity", h = r.contrast ?? 1, g = /* @__PURE__ */ o(
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
    xe,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      category: fe("image:adjust-bw"),
      body: u,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { top: "75%" } })
      ]
    }
  );
}
function Mi(t) {
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
function Di(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], f = p ? /* @__PURE__ */ e(
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
          children: Mi(x)
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
    xe,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      category: fe("image:adjust-layer"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { top: "75%" } })
      ]
    }
  );
}
function Ei(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Oi(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const _i = (t) => t.stopPropagation(), Li = Zo(function({ info: n }) {
  const [r, a] = S(!1), [i, s] = S(!1);
  if (n.failure) {
    const u = n.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: u ? "Content policy refusal" : `Failure: ${n.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ e("span", { className: "bg-transparent border-none p-0 text-[12px] text-red-600 font-medium text-left", children: u ? "✕ Content policy refusal" : `✕ ${n.failure.reason}` }),
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
        onClick: () => a((u) => !u),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          r ? "▾" : "▸",
          " ",
          n.streaming ? "Streaming" : "Response",
          typeof n.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            Ei(n.costUsd)
          ] }),
          d && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
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
            "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          ),
          onMouseDown: _i,
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
        yt,
        {
          images: [{ src: n.getImageUrl(n.imageId), alt: "Vision input", caption: "Vision input" }],
          openIndex: i ? 0 : null,
          onClose: () => s(!1)
        }
      )
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words",
        style: { maxHeight: r ? "none" : "1.4em", overflow: "hidden" },
        children: l
      }
    )
  ] });
});
function Bi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = Ae(), u = l === "failed" ? () => p(n) : void 0, f = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: Oi(r.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
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
  } : void 0, N = m ? /* @__PURE__ */ e(Li, { info: m }) : void 0, y = r.model || "claude-sonnet-4-6", v = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${y}, mode ${v}, state: ${l}`;
  return /* @__PURE__ */ o(
    xe,
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
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function Ui(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, f = (r.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Labels: ${f}` : "No labels configured" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🏷",
      subtitle: g,
      state: c,
      category: fe("image:vision-classify"),
      body: h,
      selected: a,
      ariaLabel: `Vision Classify node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Fi(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, f = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "💬",
      subtitle: g,
      state: c,
      category: fe("image:vision-describe"),
      body: h,
      selected: a,
      ariaLabel: `Vision Describe node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ji(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (i?.output?.extracted?.tags ?? []).slice(0, 5), f = (r.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Candidates: ${f}…` : "Open-vocabulary tagging" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "🔖",
      subtitle: g,
      state: c,
      category: fe("image:vision-tag"),
      body: h,
      selected: a,
      ariaLabel: `Vision Tag node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function zi(t) {
  const { id: n, data: r, selected: a } = t, i = he(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.lines ?? [], u = p[0], f = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
    xe,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      category: fe("image:vision-extract-text"),
      body: f,
      selected: a,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function qi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const Vi = (t) => t.stopPropagation();
function Wi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = (r.numImages ?? 1) > 1 || f.length > 1;
  let m;
  if (f.length > 0 && x)
    m = /* @__PURE__ */ e(ln, { images: f, "data-testid": "generate-thumb-strip" });
  else if (g || f.length === 1) {
    const w = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "generate-output-preview",
          "aria-label": w ? "View generated image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            w ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: Vi,
          onClick: (b) => {
            b.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ e(
            Vn,
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
        children: qi(r.prompt)
      }
    );
  const N = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, y = r.width && r.height ? `${r.width}×${r.height}` : null, v = N || y ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [y, N].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: fe("image:generate"),
      body: m,
      footer: v,
      selected: a,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
const Ji = (t) => t.stopPropagation();
function Hi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = r.numVariations ?? 1, m = x > 1 || f.length > 1, N = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
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
    y = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "variation-output-preview",
          "aria-label": b ? "View variation image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            b ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: Ji,
          onClick: (k) => {
            k.stopPropagation(), b && d(!0);
          },
          children: /* @__PURE__ */ e(
            Vn,
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
  ] }), w = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    r.similarity
  ] }) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: u,
      category: fe("image:variation"),
      body: v,
      footer: w,
      selected: a,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Gi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const Ki = (t) => t.stopPropagation();
function Yi(t) {
  const { id: n, data: r, selected: a } = t, i = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = f.length > 1;
  let m;
  if (x)
    m = /* @__PURE__ */ e(ln, { images: f, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || f.length === 1) {
    const y = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "edit-prompt-output-preview",
          "aria-label": y ? "View edited image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            y ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: Ki,
          onClick: (v) => {
            v.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ e(
            Vn,
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
        children: Gi(r.prompt)
      }
    );
  const N = r.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    r.maskImagePath
  ] }) : void 0;
  return /* @__PURE__ */ o(
    xe,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: u,
      category: fe("image:edit-prompt"),
      body: m,
      footer: N,
      selected: a,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: z("error"), style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
const Xi = {
  trigger: Ha,
  llm: Ya,
  transform: Qa,
  condition: ei,
  action: ni,
  fork: ri,
  join: ii,
  approval: li,
  agent: ci,
  "mcp-tool": di,
  "knowledge-base": pi,
  "graph-query": ui,
  memory: mi,
  guardrail: hi,
  policy: fi,
  "ag-ui-output": gi,
  "image-source": bi,
  "image:save": yi,
  scatter: Ni,
  "image:resize": wi,
  "image:transform": Ci,
  "image:format-convert": Si,
  "image:sharpen": $i,
  "image:watermark": Ti,
  "image:crop": Ri,
  "image:adjust-bw": Pi,
  "image:adjust-layer": Di,
  "image:vision-analyze": Bi,
  "image:vision-classify": Ui,
  "image:vision-describe": Fi,
  "image:vision-tag": ji,
  "image:vision-extract-text": zi,
  "image:generate": Wi,
  "image:variation": Hi,
  "image:edit-prompt": Yi
}, Qi = "#c4b5fd";
function Zi(t) {
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
function es({
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
  const u = c ?? {}, f = Jn(), [h, g, x] = Na({
    sourceX: n,
    sourceY: r,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), m = Zi(u.state), N = (u.state ?? "default") === "default", y = u.payload, v = m.animate && !f;
  let w = m.stroke, b = m.strokeWidth, k = v ? m.strokeDasharray : void 0;
  y === "image" ? (b = 2.5, N && (w = Qi)) : y === "control" && (b = 1.5, N && (k = "2 4"));
  const C = u.volume, T = typeof C == "number" && C >= 2;
  T && (b = Math.min(4, b + Math.log2(C)));
  const $ = p ? "#646cff" : w, R = p ? Math.max(2.5, b) : b, D = y === "image" && u.state === "active" && !f;
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
    D ? /* @__PURE__ */ e("circle", { r: 3, fill: $, className: "pointer-events-none", children: /* @__PURE__ */ e("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: h }) }) : null,
    u.label ? /* @__PURE__ */ e(ir, { children: /* @__PURE__ */ e(
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
    T ? /* @__PURE__ */ e(ir, { children: /* @__PURE__ */ e(
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
function ft(t, n, r) {
  const a = le(n);
  a.current = n, ne(() => {
    if (r === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, r]);
}
const ts = [
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
function ns(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function rs({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = S(""), [c, l] = S(0), p = le(null), u = le(null), f = q(() => new Set(r), [r]), h = q(
    () => ts.filter((m) => !f.has(m.type) && ns(m, s)),
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
    !N || !n || (i(N.type, n), a());
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
function os({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: a
}) {
  ne(() => {
  }, [t, n, r, a]);
}
function as({
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
  ne(() => {
    const f = u.current;
    if (!f) return;
    const h = (x) => {
      const m = f.querySelector(
        `.react-flow__node[data-id="${CSS.escape(x)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, g = (x) => {
      if (Xn(x.target)) return;
      const m = document.activeElement, N = !!m && f.contains(m);
      if (x.key === "Tab") {
        if (!N || !t || t.nodes.length === 0) return;
        const y = Ss(t);
        if (y.length === 0) return;
        const w = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = w !== null ? y.indexOf(w) : -1, k = x.shiftKey ? -1 : 1, C = b === -1 ? x.shiftKey ? y.length - 1 : 0 : (b + k + y.length) % y.length, T = y[C];
        h(T) && x.preventDefault();
        return;
      }
      if (N && !x.altKey) {
        if (x.key === "Enter" || x.key === " " || x.key === "Spacebar") {
          const v = m?.closest(".react-flow__node")?.getAttribute("data-id");
          v && (x.preventDefault(), r(v));
          return;
        }
        if (x.key === "Delete" || x.key === "Backspace") {
          if (n) {
            x.preventDefault(), a(n);
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
          x.preventDefault(), r(null);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "c" && n) {
          x.preventDefault(), p.current = n;
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "v" && p.current) {
          x.preventDefault();
          const y = l([p.current]);
          y.length > 0 && r(y[0]);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "d" && n) {
          x.preventDefault();
          const y = l([n]);
          y.length > 0 && r(y[0]);
          return;
        }
        if (x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight") {
          if (x.preventDefault(), x.stopPropagation(), !x.shiftKey || !n) return;
          const y = 8, v = x.key === "ArrowLeft" ? -y : x.key === "ArrowRight" ? y : 0, w = x.key === "ArrowUp" ? -y : x.key === "ArrowDown" ? y : 0;
          s((b) => {
            const k = b.map(
              (T) => T.id === n ? {
                ...T,
                position: {
                  x: T.position.x + v,
                  y: T.position.y + w
                }
              } : T
            ), C = k.find((T) => T.id === n);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return f.addEventListener("keydown", g), () => f.removeEventListener("keydown", g);
  }, [t, n, r, a, i, s, d, c, l, p, u]);
}
function is({
  addNode: t,
  screenToFlowPosition: n
}) {
  const r = E((i) => {
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
function ss({
  nodeMenu: t,
  breakpoints: n,
  showBreakpointOption: r,
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
const ls = [
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
], cs = [
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
}, Dt = cs.map(({ key: t, name: n }) => ({
  key: t,
  name: n,
  items: ls.filter((r) => fe(r.type) === t).map((r) => ({ ...r, category: n, nodeCategory: t }))
})).filter((t) => t.items.length > 0), ds = Dt.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), ps = Dt.map((t) => t.name), Yn = "pipeline.palette.recents", us = 5, pr = "pipeline.palette.compact";
function _n() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(Yn);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function ms(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Yn, JSON.stringify(t));
    } catch {
    }
}
function _h(t) {
  const n = _n().filter((a) => a !== t), r = [t, ...n].slice(0, us);
  ms(r);
}
const Ao = "pipeline.palette.collapsed.";
function hs(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(Ao + t) === "true";
  } catch {
    return !1;
  }
}
function fs(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Ao + t, String(n));
    } catch {
    }
}
function gs(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function ur({ expanded: t }) {
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
function xs({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [a, i] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => _n()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(pr) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const A = {};
    for (const B of Dt)
      A[B.name] = hs(B.name);
    return A;
  }), g = q(() => new Set(t), [t]);
  ne(() => {
    const A = (B) => {
      B.key === Yn && l(_n());
    };
    return window.addEventListener("storage", A), () => window.removeEventListener("storage", A);
  }, []), ne(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(pr, String(p));
      } catch {
      }
  }, [p]);
  const x = E((A) => {
    i((B) => {
      const W = new Set(B);
      return W.has(A) ? W.delete(A) : W.add(A), W;
    });
  }, []), m = E(() => {
    r(""), i(/* @__PURE__ */ new Set());
  }, []), N = E((A) => {
    h((B) => {
      const W = { ...B, [A]: !B[A] };
      return fs(A, W[A]), W;
    });
  }, []), y = q(() => {
    const A = /* @__PURE__ */ new Map();
    for (const B of Dt)
      for (const W of B.items) A.set(W.type, W);
    return A;
  }, []), v = q(
    () => c.map((A) => y.get(A)).filter(Boolean),
    [c, y]
  ), w = q(() => Dt.map((A) => {
    const B = a.size > 0 && !a.has(A.name) ? [] : A.items.filter((W) => gs(W, n));
    return { ...A, items: B };
  }).filter((A) => A.items.length > 0), [n, a]), b = q(() => {
    const A = /* @__PURE__ */ new Set(), B = [];
    if (!n && a.size === 0)
      for (const W of v)
        B.push(W), A.add(W.type);
    for (const W of w)
      for (const ie of W.items)
        A.has(ie.type) || (B.push(ie), A.add(ie.type));
    return B;
  }, [v, w, n, a]), k = le(b);
  ne(() => {
    k.current = b;
  }, [b]);
  const C = w.length === 0 && (n !== "" || a.size > 0), T = (A) => (B) => {
    if (g.has(A.type)) {
      B.preventDefault();
      return;
    }
    B.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: A.type })
    ), B.dataTransfer.effectAllowed = "move";
  }, $ = (A, B) => {
    const W = g.has(A.type), ie = s === A.type && !W, Y = B !== null && B < 9 ? B + 1 : null;
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
          ie ? "bg-slate-100" : "bg-transparent"
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
                "ml-auto text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
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
          ie ? "bg-slate-50" : "bg-transparent"
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
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-slate-900 flex items-center gap-1.5", W && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: A.name }),
              Y !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${A.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    W && "opacity-50"
                  ),
                  children: Y
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-500 truncate", children: W ? "Placed" : A.description })
          ] })
        ]
      },
      A.type
    );
  }, R = v.length > 0 && !n && a.size === 0;
  let D = 0;
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
                onChange: (A) => r(A.target.value),
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
                onClick: () => u((A) => !A),
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
              children: ps.map((A) => /* @__PURE__ */ e(
                $a,
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
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ e(ur, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ e("div", { children: v.map((A) => {
              const B = D++;
              return $(A, B);
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
          ) : w.map((A) => {
            const B = !!f[A.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${A.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => N(A.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                  "aria-expanded": !B,
                  children: [
                    /* @__PURE__ */ e(ur, { expanded: !B }),
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
              !B && /* @__PURE__ */ e("div", { children: A.items.map((W) => {
                const ie = D++;
                return $(W, ie);
              }) })
            ] }, A.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-slate-200 text-[10px] text-slate-400 font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function bs({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: a
}) {
  return ne(() => {
    const i = (s) => {
      if (!Xn(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = ds[d];
        if (!c || c.type === "trigger" && t?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = a.current?.getBoundingClientRect(), u = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: f, y: h } = u;
        if (t)
          for (const g of t.nodes)
            Math.abs(g.position.x - f) < 16 && Math.abs(g.position.y - h) < 16 && (f += 24, h += 24);
        n(c.type, { x: f, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n, t, r, a]), null;
}
const ys = 280, vs = 120, Ns = 40, ws = 40;
function ks(t, n) {
  const r = ys, a = vs, i = Ns, s = ws;
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
    const y = u.get(N), v = y.length, w = i + N * r;
    for (let b = 0; b < v; b++) {
      const k = s + (b - v / 2) * a;
      x.push({ id: y[b], position: { x: w, y: k } });
    }
  }
  return x;
}
function Cs({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const a = E(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), i = E(() => {
    if (!t) return;
    const s = ks(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: a, handleAutoArrange: i };
}
function Is({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: a, handleAutoArrange: i } = Cs({
    definition: t,
    setPositions: n,
    fitView: r
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
function Xn(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Ss(t) {
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
const $s = { animated: es }, Ts = Xi;
function As(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Rs(t) {
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
function Ps({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
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
  } = Ue(), { screenToFlowPosition: v, fitView: w } = ka();
  os({
    addNode: p,
    addEdge: f,
    updateNodeData: y,
    getDefinition: () => l
  });
  const [b, k, C] = Co([]), [T, $, R] = Io([]), [D, A] = S(!0), [B, W] = S(!0), ie = le(null), Y = le(null), [te, O] = S(null), [P, H] = S(null), G = E(
    (Q, ae) => {
      Q.preventDefault(), H({ nodeId: ae.id, x: Q.clientX, y: Q.clientY });
    },
    []
  ), L = E(() => {
    P && (t?.(P.nodeId), H(null));
  }, [P, t]), V = E(() => {
    if (!P) return;
    const Q = P.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Q).catch(() => {
    }), H(null);
  }, [P]), J = E(() => {
    P && (d?.(P.nodeId), H(null));
  }, [P, d]), X = E(() => {
    if (!P) return;
    const Q = x([P.nodeId]);
    Q.length > 0 && N(Q[0]), H(null);
  }, [P, x, N]), pe = E(() => H(null), []);
  ne(() => {
    if (!l) {
      k([]), $([]);
      return;
    }
    k((Q) => {
      const ae = new Map(Q.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const be = ae.get(ue.id), Pe = As(ue);
        return s && s.size > 0 && (Pe.data._hasBreakpoint = s.has(ue.id)), c && (Pe.data._pausedAtBreakpoint = ue.id === c), be ? { ...be, ...Pe, selected: be.selected } : Pe;
      });
    }), $(() => l.edges.map(Rs));
  }, [l, s, c, k, $]), ne(() => {
    if (!n) {
      r?.(null);
      return;
    }
    k(
      (Q) => Q.map((ae) => ({
        ...ae,
        className: ae.id === n ? "node-error" : ae.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Q = ie.current;
      if (!Q) return;
      const ae = Q.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!ae) {
        r?.(null);
        return;
      }
      const ue = ae.getBoundingClientRect();
      r?.({ x: ue.right, y: ue.top + ue.height / 2 });
    });
  }, [n, k, r]), ne(() => {
    i && k(
      (Q) => Q.map((ae) => {
        const ue = i[ae.id] ?? "", Pe = [ae.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let $e;
        ue === "node-replay-active" ? $e = "running" : ue === "node-replay-completed" ? $e = "completed" : ue === "node-replay-failed" && ($e = "failed");
        const Ge = { ...ae.data };
        return $e ? Ge._state = $e : Ge._state = "idle", { ...ae, className: Pe, data: Ge };
      })
    );
  }, [i, n, k]), ne(() => {
    a && $(
      (Q) => Q.map((ae) => {
        const ue = a[ae.id];
        if (!ue) return ae;
        const be = ae.data ?? {};
        return be.state === ue ? ae : { ...ae, data: { ...be, state: ue } };
      })
    );
  }, [a, $]);
  const j = E(
    (Q) => {
      C(Q);
      const ae = [], ue = [];
      for (const be of Q)
        be.type === "position" && be.position && be.dragging === !1 ? ae.push({ id: be.id, position: be.position }) : be.type === "remove" && ue.push(be.id);
      ae.length && u(ae);
      for (const be of ue) g(be);
    },
    [C, u, g]
  ), ce = E(
    (Q) => {
      R(Q);
      for (const ae of Q)
        ae.type === "remove" && h(ae.id);
    },
    [R, h]
  ), we = E(
    (Q) => {
      if (!l || !Q.source || !Q.target) return;
      const ae = l.nodes.find(($e) => $e.id === Q.source), ue = l.nodes.find(($e) => $e.id === Q.target);
      if (!ae || !ue) return;
      const be = Q.sourceHandle ?? "out", Pe = Q.targetHandle ?? "in";
      On(
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
  ), _e = E(
    (Q) => {
      if (!l || !Q.source || !Q.target) return !1;
      const ae = l.nodes.find((be) => be.id === Q.source), ue = l.nodes.find((be) => be.id === Q.target);
      return !ae || !ue ? !1 : On(
        ae.type,
        Q.sourceHandle ?? "out",
        ue.type,
        Q.targetHandle ?? "in"
      );
    },
    [l]
  ), Ye = E(
    (Q, ae) => {
      N(ae.id);
    },
    [N]
  ), Fe = E(() => {
    N(null);
  }, [N]), De = E(
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
  ), qe = E(() => O(null), []), je = E(
    (Q, ae) => {
      p(Q, ae);
    },
    [p]
  ), Ve = q(() => l ? l.nodes.some((Q) => Q.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: Ie, handleDrop: ge } = is({
    addNode: p,
    screenToFlowPosition: v
  });
  ne(() => {
    const Q = (ae) => {
      if (!Xn(ae.target) && !(ae.metaKey || ae.ctrlKey || ae.altKey)) {
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
  }, []), as({
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
  const oe = E((Q) => {
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
      onDrop: ge,
      onDoubleClick: De,
      children: [
        /* @__PURE__ */ o(
          So,
          {
            nodes: b,
            edges: T,
            nodeTypes: Ts,
            edgeTypes: $s,
            onNodesChange: j,
            onEdgesChange: ce,
            onConnect: we,
            isValidConnection: _e,
            onNodeClick: Ye,
            onNodeContextMenu: G,
            onPaneClick: Fe,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                $o,
                {
                  variant: Ca.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              B ? /* @__PURE__ */ e(
                To,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              D ? /* @__PURE__ */ e(
                Ia,
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
          rs,
          {
            anchor: te.anchor,
            flowPosition: te.flowPosition,
            disabledTypes: Ve,
            onClose: qe,
            onInsert: je
          }
        ) : null,
        /* @__PURE__ */ e(
          bs,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: v,
            containerRef: ie
          }
        ),
        /* @__PURE__ */ e(
          Is,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        P ? /* @__PURE__ */ e(
          ss,
          {
            nodeMenu: P,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: L,
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
function Ms({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(wa, { children: /* @__PURE__ */ e(
    Ps,
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
const mr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Ds(t) {
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
function Es({ error: t, anchor: n, onDismiss: r, onRetry: a }) {
  const [i, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = mr[l] ?? mr.UnknownError, u = E(async () => {
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
  }, [t, l]), f = E(() => {
    a?.();
  }, [a]), h = Math.min(n.y + 8, window.innerHeight - 440), g = Math.min(n.x + 12, window.innerWidth - 360);
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
              children: Ds(l)
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
function Os(t, n) {
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
function Ro(t) {
  const n = [], r = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return _s(a, n), Ls(a, i, n), Bs(i, s, n), Us(a, n), Hs(a, i, n), Gs(a, i, r), Ks(a, i, r), Ys(a, i, r), Xs(a, i, r), r.push(...Qs(t)), r.push(...Zs(t)), r.push(...el(t)), r.push(...tl(t)), r.push(...nl(t)), r.push(...rl(t)), r.push(...ol(t)), r.push(...al(t)), r.push(...il(t)), r.push(...sl(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function _s(t, n) {
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
function Ls(t, n, r) {
  const a = Os(t, n);
  a !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function Bs(t, n, r) {
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
    On(
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
function Us(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        Fs(r.id, r.data, n);
        break;
      case "transform":
        js(r.id, r.data, n);
        break;
      case "condition":
        zs(r.id, r.data, n);
        break;
      case "action":
        qs(r.id, r.data, n);
        break;
      case "fork":
        Vs(r.id, r.data, n);
        break;
      case "join":
        Ws(r.id, r.data, n);
        break;
      case "approval":
        Js(r.id, r.data, n);
        break;
    }
}
function Fs(t, n, r) {
  n.provider || Je(r, t, "provider"), (!n.model || !n.model.trim()) && Je(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Je(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Je(r, t, "userPromptTemplate");
}
function js(t, n, r) {
  n.transformType || Je(r, t, "transformType"), (!n.expression || !n.expression.trim()) && Je(r, t, "expression");
}
function zs(t, n, r) {
  (!n.expression || !n.expression.trim()) && Je(r, t, "expression");
}
function qs(t, n, r) {
  n.actionType || Je(r, t, "actionType");
}
function Vs(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Ws(t, n, r) {
  n.mode || Je(r, t, "mode"), n.mergeStrategy || Je(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function Js(t, n, r) {
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
function Hs(t, n, r) {
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
function Je(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function Gs(t, n, r) {
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
function Ks(t, n, r) {
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
function Ys(t, n, r) {
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
function Xs(t, n, r) {
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
function et(t) {
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
function Qs(t) {
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
      message: `${c.data.type} node '${et(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Zs(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${et(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function el(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${et(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function tl(t) {
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
function nl(t) {
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
function rl(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = et(a), s = r.get(i) ?? [];
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
function ol(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${et(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return n;
}
function al(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function il(t) {
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
      message: `Condition '${et(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return n;
}
function sl(t) {
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
    (u || f.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${et(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function ll(t, n) {
  return `${t}${n}`;
}
const cl = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, dl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Po(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const pl = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function ul(t) {
  const n = dl[t.type] ?? "■", r = pl[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return Po(a ? `${i}<br/>${a}` : i);
}
function ml(t, n) {
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
function hl(t) {
  return !t || t === "out" ? null : t;
}
function fl(t) {
  const n = ["flowchart TD"], r = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = cl[i.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    a.set(i.id, ll(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = ml(i.type, ul(i));
    n.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = hl(i.sourceHandle);
    c ? n.push(`  ${s} --"${Po(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function hr(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const a = Object.keys(r).sort(), i = {};
      for (const s of a) i[s] = r[s];
      return i;
    }
    return r;
  });
}
function fr(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function gr(t) {
  return new Set(t.edges.map((n) => n.id));
}
function gl(t, n) {
  if (!n)
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
  const r = fr(t.nodes), a = fr(n.nodes), i = [], s = [], d = [];
  for (const [v, w] of r) {
    const b = a.get(v);
    if (!b) {
      i.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = hr(w.data) !== hr(b.data), C = w.position.x !== b.position.x || w.position.y !== b.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [v, w] of a)
    r.has(v) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = gr(t), l = gr(n);
  let p = 0, u = 0;
  for (const v of c) l.has(v) || p++;
  for (const v of l) c.has(v) || u++;
  const f = t.name !== n.name, h = (t.icon ?? "") !== (n.icon ?? ""), g = new Set(t.tags ?? []), x = new Set(n.tags ?? []), m = [], N = [];
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
    previousName: f ? n.name : void 0,
    iconChanged: h,
    previousIcon: h ? n.icon : void 0,
    tagsChanged: y,
    tagsAdded: m,
    tagsRemoved: N
  };
}
const xl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function bl(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function mn(t, n, r) {
  const a = t.node, i = xl[a.type] ?? "■", s = n !== "removed" && !!r;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: bl(a) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function yl({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = q(
    () => gl(r, a),
    [r, a]
  ), d = (u) => {
    i && i(u), n();
  }, c = a !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    He,
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
function vl({ open: t, onClose: n }) {
  return null;
}
const hn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", xr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Nl(t) {
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
    onClearRunsConfirm: g,
    versionDiffOpen: x,
    onVersionDiffClose: m,
    currentDef: N,
    publishedDef: y,
    onJumpToNode: v,
    simPanelOpen: w,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      He,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: hn, children: "Cancel" }),
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
      He,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: hn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: xr, children: "Delete" })
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
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: hn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: g, className: xr, children: "Clear history" })
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
      yl,
      {
        open: x,
        onClose: m,
        currentDef: N,
        publishedDef: y,
        onJumpToNode: v
      }
    ),
    /* @__PURE__ */ e(
      vl,
      {
        open: w,
        onClose: b
      }
    )
  ] });
}
function wl({ runId: t, visible: n }) {
  const [r, a] = S(/* @__PURE__ */ new Map()), i = le(null), s = le(!0), d = le(null);
  ne(() => {
    t !== d.current && (d.current = t, a(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = E(() => {
    const g = i.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = E(() => {
    if (!s.current) return;
    const g = i.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = E(
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
  Ee("*", p), ne(() => {
    l();
  }, [r, l]);
  const u = E((g) => {
    a((x) => {
      const m = new Map(x), N = m.get(g);
      return N && m.set(g, { ...N, collapsed: !N.collapsed }), m;
    });
  }, []), f = q(() => {
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
function Et(t, n) {
  const r = new Blob([n], { type: "application/json" }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Ot(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function kl(t) {
  const n = bt(), { toast: r } = sn(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Ue(), d = le(n.runs);
  ne(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = le(a);
  ne(() => {
    c.current = a;
  }, [a]);
  const l = E(
    (M) => M ? d.current[M]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [f, h] = S(null), g = E(() => {
    u(null), h(null);
  }, []), x = E(
    (M) => {
      h(M);
    },
    []
  ), m = E(
    (M) => {
      "eventType" in M || M.pipelineId === t && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [t, r]
  ), N = E(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = Math.round(M.durationMs / 100) / 10;
      r(`Run completed in ${_}s`, { type: "success" });
    },
    [l, r]
  ), y = E(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.error.nodeId, de = Ot(c.current, _);
      r(`Run failed at ${de}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(M.error);
    },
    [l, s, r]
  ), v = E(
    (M) => {
      "eventType" in M || l(M.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = E(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.stepId, de = Ot(c.current, _);
      r(`Approval requested on "${de}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, r]
  );
  Ee("pipeline.run.started", m), Ee("pipeline.run.completed", N), Ee("pipeline.run.failed", y), Ee("pipeline.run.cancelled", v), Ee("pipeline.approval.requested", w);
  const [b, k] = S(null);
  ne(() => {
    if (n.activeRunIds.length > 0) {
      const M = n.activeRunIds[n.activeRunIds.length - 1];
      M !== b && k(M);
      return;
    }
    if (!b) {
      const M = Object.values(n.runs).sort(
        (_, de) => de.startedAt.localeCompare(_.startedAt)
      );
      M.length > 0 && k(M[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const C = b ? n.runs[b] : void 0, T = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [$, R] = S(/* @__PURE__ */ new Set()), [D, A] = S(null), [B, W] = S(null), [ie, Y] = S(null), [te, O] = S(0), [P, H] = S(!1), [G, L] = S(null), V = E(
    (M, _) => {
      _ === null ? (W(null), Y(null)) : (W(_), Y(M));
    },
    []
  ), J = E((M) => {
    R((_) => {
      const de = new Set(_);
      return de.has(M) ? de.delete(M) : de.add(M), de;
    });
  }, []), X = E(async () => {
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
  }, [$, n, t]), pe = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "continue"), A(null));
  }, [D, n]), j = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "step_over"), A(null));
  }, [D, n]), ce = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "resume_all"), A(null));
  }, [D, n]), we = E(async () => {
    if (!(!D || !B || ie !== D.stepId) && Object.keys(B).length !== 0) {
      H(!0);
      try {
        await ta(
          t,
          D.runId,
          D.stepId,
          { mode: "merge", values: B }
        ), W(null), Y(null), O((M) => M + 1), n.resolveBreakpoint(D.runId, D.stepId, "continue"), A(null);
      } catch (M) {
        if (M instanceof na)
          r(`Patch rejected: ${M.reason}`, { type: "error", durationMs: 8e3 });
        else if (M instanceof nr)
          r(`Apply failed (HTTP ${M.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = M instanceof Error ? M.message : String(M);
          r(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        H(!1);
      }
    }
  }, [D, B, ie, t, n, r]), _e = E(
    async (M) => {
      if (D) {
        L(M);
        try {
          await ra(
            t,
            D.runId,
            D.stepId,
            M
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof nr)
            r(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const de = _ instanceof Error ? _.message : String(_);
            r(`Revert failed: ${de}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          L(null);
        }
      }
    },
    [D, t, r]
  ), Ye = E(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      A({ runId: M.runId, stepId: M.stepId });
      const _ = Ot(c.current, M.stepId);
      r(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Ee("pipeline.step.breakpoint", Ye);
  const Fe = E(
    (M) => {
      "eventType" in M || D && D.runId === M.runId && A(null);
    },
    [D]
  );
  Ee("pipeline.run.completed", Fe), Ee("pipeline.run.failed", Fe), Ee("pipeline.run.cancelled", Fe);
  const De = E(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), qe = a?.status === "published", je = !T && !qe, Ve = T ? "Cancel the active run" : qe ? "Start a new run" : "Publish the pipeline to enable runs", [Ie, ge] = S(!1), [oe, Q] = S({}), [ae, ue] = S(!1), [be, Pe] = S("config");
  ne(() => {
    i !== null && Pe("config");
  }, [i]);
  const $e = E(async (M) => {
    ue(!0);
    try {
      const _ = await n.triggerRun(t, M);
      k(_), Pe("runs"), r(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), r(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      ue(!1);
    }
  }, [n, t, r]), Ge = E(async () => {
    if (T && b) {
      n.cancelRun(b);
      return;
    }
    je || $e();
  }, [T, b, je, n, $e]), zt = E(() => {
    ge(!1), $e(oe);
  }, [$e, oe]);
  return {
    currentRunId: b,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: De,
    handleRunClick: Ge,
    handleTriggerInputSubmit: zt,
    isRunActive: T,
    runDisabled: je,
    runTitle: Ve,
    isTriggering: ae,
    triggerInputOpen: Ie,
    setTriggerInputOpen: ge,
    triggerInputValues: oe,
    setTriggerInputValues: Q,
    breakpoints: $,
    handleToggleBreakpoint: J,
    handleDebugRunClick: X,
    pausedBreakpoint: D,
    handleBreakpointContinue: pe,
    handleBreakpointStepOver: j,
    handleBreakpointResumeAll: ce,
    handleApplyAndContinue: we,
    handleRevertPatch: _e,
    applyingPatch: P,
    revertingPatchId: G,
    dirtyPatch: B,
    dirtyPatchStepId: ie,
    handleContextEditBufferChange: V,
    resetEditBufferKey: te,
    sidebarTab: be,
    setSidebarTab: Pe
  };
}
function Cl({
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
  ), g = I(
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
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Il({
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
  const $ = Be(), { rename: R, setIcon: D, setSelectedNodeId: A } = Ue(), [B, W] = S(!1), [ie, Y] = S(""), te = le(null);
  ne(() => {
    B && (Y(n.name ?? ""), setTimeout(() => te.current?.focus(), 0));
  }, [B, n.name]);
  const O = () => {
    const oe = ie.trim();
    oe && oe !== n.name && R(oe), W(!1);
  }, P = n ? Ro(n) : null;
  (P?.errors.length ?? 0) > 0;
  const H = n.status === "published", G = r ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, L = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, V = P ? P.errors.length > 0 ? { label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`, variant: "danger" } : P.warnings.length > 0 ? { label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [J, X] = S(!1), pe = le(null);
  ft(pe, () => X(!1), J);
  const j = P ? [...P.errors, ...P.warnings] : [], ce = (oe) => {
    oe && (A(oe), X(!1));
  }, we = n.nodes.filter((oe) => oe.type !== "trigger").length, _e = l ? Object.values(l.steps).filter(
    (oe) => oe.status === "completed" || oe.status === "skipped"
  ).length : 0, Fe = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), De = i && l ? { text: `Running (${_e}/${we} steps) · ${Fe}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Ot(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, qe = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, je = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ve, Ie] = S(!1), ge = le(null);
  return ft(ge, () => Ie(!1), Ve), /* @__PURE__ */ o(
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
          Ta,
          {
            value: n.icon ?? "🔀",
            onChange: D
          }
        ),
        B ? /* @__PURE__ */ e(
          "input",
          {
            ref: te,
            value: ie,
            onChange: (oe) => Y(oe.target.value),
            onBlur: O,
            onKeyDown: (oe) => {
              oe.key === "Enter" && O(), oe.key === "Escape" && (Y(n.name), W(!1));
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
              fn[G.variant]
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
              fn[L.variant]
            ),
            "data-testid": "version-badge",
            children: L.label
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
          J && j.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: j.map((oe, Q) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => ce(oe.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    oe.nodeId ? "cursor-pointer" : "cursor-default",
                    Q < j.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          oe.severity === "error" ? "text-red-600" : "text-amber-600"
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
        De.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              qe[De.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              De.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              De.variant === "success" && "✓ ",
              De.variant === "error" && "✗ ",
              De.text
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
        /* @__PURE__ */ o("div", { className: "relative", ref: ge, children: [
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
            Cl,
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
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Sl = 12;
function Te(t) {
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
  depth: n = 0,
  highlightKeys: r,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = S(n > 2);
  if (n > Sl)
    return /* @__PURE__ */ e("span", { className: Te("string"), children: "[max depth]" });
  const c = i || a != null && r?.has(a);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Te("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Te("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Te("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Te("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Te("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Te("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Te("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(Ut, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Te("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Te("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Te("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Te("bracket"), children: "{" }),
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
          /* @__PURE__ */ e("span", { className: Te("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Ut,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ e("span", { className: Te("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Te("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Te("string"), children: String(t) });
}
function $l({
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
function Tl(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Al({ k: t, initial: n, onCommit: r, onError: a, onFocus: i }) {
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
function Rl({
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
      const g = h in n, x = g ? n[h] : t[h], m = Tl(x), N = g;
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
                Al,
                {
                  k: h,
                  initial: x,
                  onCommit: (y) => c(h, y),
                  onError: (y) => p(h, y),
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
function Pl(t, n, r) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[n] = r, a.steps = i, r && typeof r == "object" && !Array.isArray(r) && Object.assign(a, r), a;
}
function Ml(t, n) {
  const r = [];
  for (const a of Object.keys(n))
    a in t || r.push(a);
  return r;
}
function Dl(t) {
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
      l = Pl(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = Ml(s, l);
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
function El(t, n) {
  const [r, a] = S(/* @__PURE__ */ new Map()), [i, s] = S(
    /* @__PURE__ */ new Map()
  ), d = le(null);
  ne(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = E(
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
  Ee("*", c);
  const l = q(() => t ? Dl(t) : [], [t]), p = q(() => l.map((h) => {
    const g = r.get(h.stepId), x = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, r, i]), u = q(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), f = q(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function br({ attempt: t, label: n }) {
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
      /* @__PURE__ */ e(Ut, { data: t.output, depth: 0 })
    ] })
  ] });
}
function Ol({
  run: t,
  activeStepId: n,
  onStepSelect: r,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, g] = S({}), [x, m] = S(null), [N, y] = S({}), [v, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: k, newKeysSet: C } = El(t, n), T = k?.resolvedPrompt != null, $ = k?.stepExecution.attempts, R = ($?.length ?? 0) >= 2;
  ne(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !R && c("input");
  }, [d, T, R]), ne(() => {
    p(0);
  }, [n]);
  const D = !!(t && t.status === "paused_at_breakpoint" && n && (t.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), A = !!a && !!D;
  ne(() => {
    A ? x && x !== n && (g({}), m(null), y({})) : (u && f(!1), Object.keys(h).length > 0 && g({}), x && m(null), Object.keys(N).length > 0 && y({}));
  }, [A, n]), ne(() => {
    s !== void 0 && (g({}), m(null), y({}), w({ key: "", value: "" }));
  }, [s]), ne(() => {
    !A || !n || i && (Object.keys(h).length === 0 ? i(n, null) : i(n, h));
  }, [h, A, n]);
  const B = E(
    (P, H) => {
      m(n), g((G) => P in G ? G : { ...G, [P]: H });
    },
    [n]
  ), W = E(
    (P, H) => {
      m(n), g((G) => ({ ...G, [P]: H })), y((G) => {
        if (!(P in G)) return G;
        const L = { ...G };
        return delete L[P], L;
      });
    },
    [n]
  ), ie = E((P) => {
    g((H) => {
      if (!(P in H)) return H;
      const G = { ...H };
      return delete G[P], G;
    }), y((H) => {
      if (!(P in H)) return H;
      const G = { ...H };
      return delete G[P], G;
    });
  }, []), Y = E((P, H) => {
    y((G) => ({ ...G, [P]: H }));
  }, []), te = E(() => {
    g({}), m(null), y({}), w({ key: "", value: "" });
  }, []), O = E(() => {
    const P = v.key.trim();
    if (!P) return;
    let H = v.value;
    const G = v.value;
    if (G.trim().length > 0)
      try {
        H = JSON.parse(G);
      } catch {
        H = G;
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
        $l,
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
          Rl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: N,
            newKeyDraft: v,
            setNewKeyDraft: w,
            onCommitNewKey: O,
            onBeginEditKey: B,
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
          /* @__PURE__ */ e(br, { attempt: $[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(br, { attempt: $[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function _l({
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
  const x = bt().runs[n.runId] ?? null, N = x?.steps?.[n.stepId]?.patches ?? [], y = !!i && s === n.stepId && Object.keys(i).length > 0, v = x?.status === "paused_at_breakpoint";
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
            Ot(t, n.stepId)
          ] }),
          y && /* @__PURE__ */ e(
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
              /* @__PURE__ */ e("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: x ? /* @__PURE__ */ e(
                Ol,
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
                              w.appliedBy && /* @__PURE__ */ o(K, { children: [
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
                                  v ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
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
function ve({ label: t, required: n, help: r, error: a, children: i, className: s }) {
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
function Ll({ title: t, defaultCollapsed: n = !1, children: r, className: a }) {
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
function Ne({ children: t, className: n }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: t });
}
const Bl = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Ul(t, n, r) {
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
function Fl(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let a = 0; a < 5; a++) {
    const i = Bl[a], s = Ul(n[a], i.min, i.max);
    if (!s) return null;
    r[i.name] = s;
  }
  return r;
}
function Nt(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function jl(t, n) {
  return Nt(t.minute, n.getMinutes(), 0) && Nt(t.hour, n.getHours(), 0) && Nt(t.dayOfMonth, n.getDate(), 1) && Nt(t.month, n.getMonth() + 1, 1) && Nt(t.dayOfWeek, n.getDay(), 0);
}
function zl(t, n, r) {
  const a = [], i = new Date(n.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < r; c++)
    jl(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const yr = /^[a-zA-Z0-9_-]{1,64}$/, ql = "http://localhost:13001";
function Vl() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Wl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Jl({ data: t, onChange: n }) {
  const { toast: r } = sn(), i = xo(oa)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = q(() => c ? Vl() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, f = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", g = t.triggerType === "webhook" && h.length > 0 && !yr.test(h), x = t.triggerType === "webhook" && yr.test(h) ? `${ql}/hooks/pipeline/${h}` : null, m = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, N = () => {
    i && navigator.clipboard.writeText(i).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, y = t.triggerType === "schedule" ? t.schedule ?? "" : "", v = q(
    () => y ? Fl(y) : null,
    [y]
  ), w = q(() => v ? zl(v, /* @__PURE__ */ new Date(), 3) : [], [v]), b = t.triggerType === "schedule" && !!y && !v, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ e(ve, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: Wl.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      ve,
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
      ve,
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
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, T) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, T))
          ] }) : /* @__PURE__ */ e("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    t.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(
        ve,
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
const vr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Hl = 3e4;
function Gl(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function Kl(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(a, Hl));
  }
  return n;
}
function Qn({ value: t, onChange: n }) {
  const r = t !== void 0, a = t ?? vr, i = r ? Kl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? vr : void 0),
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(Gl).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const Nr = {
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
}, Yl = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], Mo = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function wr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => Mo[r] ?? `{{${r}}}`);
}
function Xl({ data: t, onChange: n }) {
  const [r, a] = S(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = Nr[c], p = l.includes(t.model) ? t.model : l[0];
    n({ provider: c, model: p });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ e(ve, { label: "Provider", required: !0, children: /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(ve, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.model,
        onChange: (c) => n({ model: c.target.value }),
        children: Nr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
      }
    ) }),
    /* @__PURE__ */ e(
      ve,
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
      ve,
      {
        label: "User prompt template",
        required: !0,
        error: s ? "User prompt template is required." : void 0,
        help: s ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ e(
          Hn,
          {
            value: t.userPromptTemplate,
            onChange: (c) => n({ userPromptTemplate: c }),
            language: "template",
            variables: Yl,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(Ll, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        ve,
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
      /* @__PURE__ */ e(ve, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
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
        Qn,
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
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: wr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: wr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(Mo).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const Ql = ["context", "context.steps", "context.trigger"], Zl = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function ec({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ e(ve, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Zl.map((a) => /* @__PURE__ */ o(
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
      ve,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          Hn,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: Ql,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      ve,
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
      Qn,
      {
        value: t.retryPolicy,
        onChange: (a) => n({ retryPolicy: a })
      }
    ),
    /* @__PURE__ */ e(ve, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
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
const tc = ["context.trigger", "context.steps"];
function nc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ e(
      ve,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          Hn,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: "javascript",
            variables: tc,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(ve, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
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
const rc = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], oc = {
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
function ac({ data: t, onChange: n }) {
  const r = oc[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ e(ve, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: rc.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(ve, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
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
    t.idempotent && /* @__PURE__ */ o(ve, { label: "Dedup scope", children: [
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
      Qn,
      {
        value: t.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(ve, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
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
const tt = 2, wt = 8;
function kr(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function ic({ data: t, onChange: n }) {
  const r = Math.max(tt, Math.min(wt, t.branchCount || tt)), a = kr(t.branchLabels, r), i = (d) => {
    const c = Math.max(tt, Math.min(wt, d));
    n({
      branchCount: c,
      branchLabels: kr(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(
      ve,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${tt} and ${wt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: tt,
              max: wt,
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
              min: tt,
              max: wt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10) || tt)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(ve, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
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
const sc = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], lc = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function cc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(ve, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: sc.map((r) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(ve, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: lc.map((r) => /* @__PURE__ */ o(
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
const _t = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function dc(t) {
  return !t || t <= 0 ? "minutes" : t % _t.hours === 0 ? "hours" : t % _t.minutes === 0 ? "minutes" : "seconds";
}
function pc({ data: t, onChange: n }) {
  const r = t.approvers ?? [], a = r.length === 0, [i, s] = S(() => dc(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / _t[i]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = r.filter((y) => y.type === "role"), N = [...g.map((y) => ({ type: "user", value: y })), ...x];
    n({
      approvers: N,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, N.length || 1))
    });
  }, p = (g) => {
    const x = r.filter((m, N) => N !== g);
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
    n({ timeoutMs: x * _t[i] });
  }, f = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * _t[g] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(
      ve,
      {
        label: "Approvers",
        required: !0,
        error: a ? "At least one approver is required." : void 0,
        help: a ? void 0 : "Who can approve this step.",
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
      ve,
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
    /* @__PURE__ */ o(ve, { label: "Timeout", help: "Leave blank for no timeout.", children: [
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
    /* @__PURE__ */ e(ve, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
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
function Ln(t) {
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
function Do(t) {
  const n = Array.isArray(t.type) ? t.type[0] : t.type;
  if (n === "array") {
    const r = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Lt(t, n, r, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Lt(l, n, r, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = Ln(l);
      a.push({
        path: p,
        label: `${c} (${Do(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Lt(l, p, r + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? Ln(l) : "unknown";
    a.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Lt(l, c, r + 1, a, i);
  }
}
function uc(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = Ln(d);
      r.push({
        path: c,
        label: `${s} (${Do(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Lt(d, c, 1, r, a);
    }
  else
    Lt(t, n, 0, r, a);
  return r;
}
const mc = {};
function hc() {
  return `${(typeof import.meta < "u" && mc?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let gn = null, kt = null;
async function fc() {
  return gn || (kt || (kt = fetch(hc()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (gn = t, kt = null, t)).catch((t) => {
    throw kt = null, t;
  })), kt);
}
const gc = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function xc({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        gc[t]
      ),
      children: t
    }
  );
}
function bc({ entry: t, isSelected: n, onPick: r }) {
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
        /* @__PURE__ */ e(xc, { kind: t.kind })
      ]
    }
  );
}
function yc({
  value: t,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: a
}) {
  const [i, s] = S("idle"), [d, c] = S(null), l = le(!0);
  ne(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = q(() => a !== void 0 ? a : d, [a, d]);
  ne(() => {
    !r || a !== void 0 || (s("loading"), fc().then((m) => {
      if (!l.current) return;
      const N = m.schemas[r] ?? null;
      c(N), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, a]);
  const u = q(
    () => uc(p),
    [p]
  ), f = p !== null && u.length > 0, h = E(
    (m) => {
      n(m);
    },
    [n]
  );
  if (!r && a === void 0)
    return /* @__PURE__ */ e(
      cn,
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
        cn,
        {
          value: t,
          onChange: n,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const x = u.filter((m) => m.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-500 leading-4", children: [
      "Click a path to set itemsPath.",
      x && /* @__PURE__ */ o(K, { children: [
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
          bc,
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
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-input",
        placeholder: "$.path selected above or type manually"
      }
    )
  ] });
}
const xn = "text-[12px] font-semibold text-text-secondary", bn = "text-[11px] text-text-tertiary mt-0.5", vc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Nc(t) {
  const { definition: n } = Ue();
  return q(() => {
    if (!t || !n) return;
    const r = n.edges.find((i) => i.target === t);
    if (!r) return;
    const a = n.nodes.find((i) => i.id === r.source);
    if (a)
      return a.type;
  }, [t, n]);
}
function wc({ data: t, onChange: n }) {
  const { selectedNodeId: r } = Ue(), a = Nc(r), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: xn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        yc,
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
          className: vc,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
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
            n({
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
const Ic = ["cover", "contain", "fill", "inside", "outside"], Ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", It = "text-[12px] font-semibold text-text-secondary", Cr = "text-[11px] text-text-tertiary mt-0.5";
function Sc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Cc, { samples: kc, onSelect: (r) => n({ sourceImagePath: r }) })
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
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ width: Number.isFinite(a) && a > 0 ? a : void 0 });
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
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: It, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: Ct,
          value: t.fit ?? "cover",
          onChange: (r) => n({ fit: r.target.value }),
          children: Ic.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ o("div", { className: Cr, children: [
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
          onChange: (r) => n({ background: r.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: Cr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const $c = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Tc({ samples: t, onSelect: n }) {
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
function Ac(t) {
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
const Bn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Rc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ir = "text-[12px] font-semibold text-text-secondary", Pc = "text-[11px] text-text-tertiary mt-0.5";
function Mc({ op: t, index: n, onUpdate: r, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: Rc,
          value: t.op,
          onChange: (i) => r(Ac(i.target.value)),
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
            className: `${Bn} w-24`,
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
            className: `${Bn} flex-1`,
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
function Dc({ data: t, onChange: n }) {
  const r = t.operations ?? [], a = (d, c) => {
    n({ operations: r.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    n({ operations: r.filter((c, l) => l !== d) });
  }, s = () => {
    n({ operations: [...r, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: Ir, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Bn}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Tc, { samples: $c, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Ir} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      r.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: r.map((d, c) => /* @__PURE__ */ e(
        Mc,
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
      /* @__PURE__ */ e("div", { className: `${Pc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const Ec = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Oc({ samples: t, onSelect: n }) {
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
const _c = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Un = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Lc = `${Un} font-mono`, yn = "text-[12px] font-semibold text-text-secondary", vn = "text-[11px] text-text-tertiary mt-0.5";
function Bc({ data: t, onChange: n }) {
  const r = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: Lc,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Oc, { samples: Ec, onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: yn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Un,
          value: t.format ?? "jpeg",
          onChange: (a) => n({ format: a.target.value }),
          children: _c.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    r && /* @__PURE__ */ o("div", { children: [
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
          className: Un,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            n({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
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
            onChange: (a) => n({ lossless: a.target.checked }),
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
            onChange: (a) => n({ stripMetadata: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Strip EXIF and metadata"
      ] }),
      /* @__PURE__ */ e("div", { className: vn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
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
const Vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Wt = "text-[12px] font-semibold text-text-secondary", Nn = "text-[11px] text-text-tertiary mt-0.5";
function jc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Fc, { samples: Uc, onSelect: (r) => n({ sourceImagePath: r }) })
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
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
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
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
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
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const zc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function qc({ samples: t, onSelect: n }) {
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
const Vc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], Rt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Sr = `${Rt} font-mono`, st = "text-[12px] font-semibold text-text-secondary", $r = "text-[11px] text-text-tertiary mt-0.5";
function Wc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: Sr,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(qc, { samples: zc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: st, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: Sr,
          value: t.overlayImageId ?? "",
          onChange: (r) => n({ overlayImageId: r.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: $r, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: st, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: Rt,
          value: t.gravity ?? "southeast",
          onChange: (r) => n({ gravity: r.target.value }),
          children: Vc.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ e("div", { className: $r, children: "Where the overlay is placed on the source image. Default: southeast." })
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
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ opacity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 1 });
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
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ offsetX: Number.isFinite(a) ? a : void 0 });
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
const Tr = 50;
function Jc(t, n) {
  const [r, a] = S(t), [i, s] = S([]), [d, c] = S([]), l = le(r);
  l.current = r;
  const p = E(
    (y) => {
      a((v) => {
        const w = y(v);
        return s((b) => {
          const k = [...b, v];
          return k.length > Tr && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = E(
    (y) => {
      p((v) => [...v, y]);
    },
    [p]
  ), f = E(
    (y, v, w) => {
      p(
        (b) => b.map((k) => k.id === y ? { ...k, x: v, y: w } : k)
      );
    },
    [p]
  ), h = E(
    (y, v, w, b, k) => {
      p(
        (C) => C.map((T) => T.id === y ? { ...T, x: v, y: w, width: b, height: k } : T)
      );
    },
    [p]
  ), g = E(
    (y, v) => {
      p(
        (w) => w.map((b) => b.id === y ? { ...b, label: v } : b)
      );
    },
    [p]
  ), x = E(
    (y) => {
      p((v) => v.filter((w) => w.id !== y));
    },
    [p]
  ), m = E(() => {
    s((y) => {
      if (y.length === 0) return y;
      const v = y[y.length - 1];
      c((b) => [...b, l.current]);
      const w = v;
      return a(w), n(w), y.slice(0, -1);
    });
  }, [n]), N = E(() => {
    c((y) => {
      if (y.length === 0) return y;
      const v = y[y.length - 1];
      s((b) => {
        const k = [...b, l.current];
        return k.length > Tr && k.shift(), k;
      });
      const w = v;
      return a(w), n(w), y.slice(0, -1);
    });
  }, [n]);
  return {
    boxes: r,
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
function Hc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ce(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function wn(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ce(t.clientX - r.left, 0, r.width),
    y: Ce(t.clientY - r.top, 0, r.height)
  };
}
function kn(t, n, r, a, i, s) {
  const d = i / r, c = s / a;
  return { x: t * d, y: n * c };
}
function Ar(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function Gc(t, n, r) {
  for (let a = r.length - 1; a >= 0; a--) {
    const i = r[a];
    if (t >= i.x && t <= i.x + i.width && n >= i.y && n <= i.y + i.height)
      return i;
  }
  return null;
}
function Eo({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = le(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = le(null), { addBox: g, moveBox: x, resizeBox: m, setLabel: N, deleteBox: y } = Jc(
    a,
    i
  );
  ne(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const v = E(
    (O) => {
      if (s || O.button !== 0) return;
      const P = c.current;
      if (!P) return;
      O.preventDefault(), P.setPointerCapture(O.pointerId);
      const { x: H, y: G } = wn(O, P), L = P.getBoundingClientRect(), { x: V, y: J } = kn(
        H,
        G,
        L.width,
        L.height,
        n,
        r
      ), X = Gc(V, J, a);
      p(X ? {
        kind: "move",
        id: X.id,
        offsetX: V - X.x,
        offsetY: J - X.y,
        currentX: V,
        currentY: J
      } : { kind: "create", startX: V, startY: J, currentX: V, currentY: J });
    },
    [s, a, n, r]
  ), w = E(
    (O, P, H) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const G = c.current;
      if (!G) return;
      G.setPointerCapture(O.pointerId);
      const { x: L, y: V } = wn(O, G), J = G.getBoundingClientRect(), { x: X, y: pe } = kn(L, V, J.width, J.height, n, r);
      p({ kind: "resize", id: P.id, corner: H, origBox: { ...P }, currentX: X, currentY: pe });
    },
    [s, n, r]
  ), b = E(
    (O) => {
      if (l.kind === "idle") return;
      const P = c.current;
      if (!P) return;
      const { x: H, y: G } = wn(O, P), L = P.getBoundingClientRect(), { x: V, y: J } = kn(H, G, L.width, L.height, n, r);
      l.kind === "create" ? p((X) => X.kind === "create" ? { ...X, currentX: V, currentY: J } : X) : l.kind === "move" ? p((X) => X.kind === "move" ? { ...X, currentX: V, currentY: J } : X) : l.kind === "resize" && p((X) => X.kind === "resize" ? { ...X, currentX: V, currentY: J } : X);
    },
    [l.kind, n, r]
  ), k = E(
    (O) => {
      if (l.kind === "create") {
        const P = Math.min(l.startX, l.currentX), H = Math.min(l.startY, l.currentY), G = Math.max(l.startX, l.currentX), L = Math.max(l.startY, l.currentY), V = G - P, J = L - H;
        V >= 4 && J >= 4 && g({ id: Hc(), x: P, y: H, width: V, height: J });
      } else if (l.kind === "move") {
        const P = a.find((H) => H.id === l.id);
        if (P) {
          const H = Ce(l.currentX - l.offsetX, 0, n - P.width), G = Ce(l.currentY - l.offsetY, 0, r - P.height);
          x(l.id, H, G);
        }
      } else if (l.kind === "resize") {
        const { id: P, corner: H, origBox: G, currentX: L, currentY: V } = l;
        let { x: J, y: X, width: pe, height: j } = G;
        if (H === "nw") {
          const ce = Ce(L, 0, J + pe - 4), we = Ce(V, 0, X + j - 4);
          pe = J + pe - ce, j = X + j - we, J = ce, X = we;
        } else if (H === "ne") {
          const ce = Ce(V, 0, X + j - 4);
          pe = Ce(L - J, 4, n - J), j = X + j - ce, X = ce;
        } else if (H === "sw") {
          const ce = Ce(L, 0, J + pe - 4);
          pe = J + pe - ce, j = Ce(V - X, 4, r - X), J = ce;
        } else
          pe = Ce(L - J, 4, n - J), j = Ce(V - X, 4, r - X);
        m(P, J, X, pe, j);
      }
      p({ kind: "idle" });
    },
    [l, a, g, x, m, n, r]
  ), C = E(
    (O, P) => {
      s || (O.preventDefault(), y(P));
    },
    [s, y]
  ), T = E(
    (O, P) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), y(P));
    },
    [s, y]
  ), $ = E(
    (O, P) => {
      s || (O.stopPropagation(), f({ id: P.id, value: P.label ?? "" }));
    },
    [s]
  ), R = E(() => {
    u && (N(u.id, u.value), f(null));
  }, [u, N]);
  let D = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), P = Math.min(l.startY, l.currentY), H = Math.max(l.startX, l.currentX), G = Math.max(l.startY, l.currentY);
    H - O >= 2 && G - P >= 2 && (D = { x: O, y: P, width: H - O, height: G - P });
  }
  let A = null;
  if (l.kind === "move") {
    const O = a.find((P) => P.id === l.id);
    if (O) {
      const P = Ce(l.currentX - l.offsetX, 0, n - O.width), H = Ce(l.currentY - l.offsetY, 0, r - O.height);
      A = { ...O, x: P, y: H };
    }
  }
  let B = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: P, currentX: H, currentY: G } = l;
    let { x: L, y: V, width: J, height: X } = P;
    if (O === "nw") {
      const pe = Ce(H, 0, L + J - 4), j = Ce(G, 0, V + X - 4);
      J = L + J - pe, X = V + X - j, L = pe, V = j;
    } else if (O === "ne") {
      const pe = Ce(G, 0, V + X - 4);
      J = Ce(H - L, 4, n - L), X = V + X - pe, V = pe;
    } else if (O === "sw") {
      const pe = Ce(H, 0, L + J - 4);
      J = L + J - pe, X = Ce(G - V, 4, r - V), L = pe;
    } else
      J = Ce(H - L, 4, n - L), X = Ce(G - V, 4, r - V);
    B = { ...P, x: L, y: V, width: J, height: X };
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
        onPointerDown: (G) => w(G, O, P)
      },
      P
    );
  }, Y = (O, P, H, G) => {
    const L = Ar(O, n, r), V = u?.id === O.id;
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
          H && !s && /* @__PURE__ */ o(K, { children: [
            ie(O, "nw"),
            ie(O, "ne"),
            ie(O, "sw"),
            ie(O, "se")
          ] })
        ]
      },
      G
    );
  }, te = () => {
    if (!D) return null;
    const O = Ar(D, n, r);
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
              B && Y(B, !0, !0, "ghost-resize"),
              te()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const Kc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Yc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], Xc = "crop-region", Qc = "crop";
function Rr({
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
const Pr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Cn = "text-[12px] font-semibold text-text-secondary", St = "text-[11px] text-text-tertiary mt-0.5";
function Zc(t) {
  const { definition: n } = Ue(), r = q(() => !t || !n ? null : n.edges.find((d) => d.target === t)?.source ?? null, [n, t]), i = he(r ?? "")?.images?.[0];
  return i ? { imageId: i.imageId, width: i.width, height: i.height } : null;
}
function ed({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const a = t.materialize !== !1, i = Zc(r), s = Re(), d = q(() => t.bbox ? [
    {
      id: Xc,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: Qc
    }
  ] : [], [t.bbox]), c = E(
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
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: Pr,
          value: t.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
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
        Rr,
        {
          samples: Kc,
          onSelect: (l) => n({ sourceImagePath: l })
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
          className: Pr,
          value: t.bboxPath ?? "",
          onChange: (l) => n({ bboxPath: l.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: St, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        Rr,
        {
          samples: Yc,
          onSelect: (l) => n({ bboxPath: l })
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
      i ? /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e(
          Eo,
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
            children: t.bbox ? /* @__PURE__ */ o(K, { children: [
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
              onChange: (l) => n({ materialize: l.target.checked }),
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
function td(t) {
  const { selectedNodeId: n } = Ue();
  return /* @__PURE__ */ e(ed, { ...t, currentNodeId: n });
}
const nd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
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
const Mr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", In = "text-[12px] font-semibold text-text-secondary", Sn = "text-[11px] text-text-tertiary mt-0.5";
function od({ data: t, onChange: n }) {
  const r = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: `${Mr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => n({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(rd, { samples: nd, onSelect: (i) => n({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: In, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: Mr,
          value: r,
          onChange: (i) => n({ algorithm: i.target.value }),
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
            n({ contrast: Number.isFinite(s) ? Math.max(0, s) : 1 });
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
function ad({
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
  const [u, f] = S(!1), [h, g] = S(null), [x, m] = S("");
  async function N(w) {
    f(!0), g(null);
    try {
      const b = await r(w);
      n(b), m("");
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
            yo,
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
          Ma,
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
            className: "text-sm text-red-600",
            "data-testid": p ? `${p}-error` : void 0,
            children: h
          }
        )
      ]
    }
  );
}
function Oo(t) {
  const n = bo(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    ad,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const Fn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, _o = Object.keys(Fn).map((t) => ({
  value: t,
  label: Fn[t]
})), id = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function Lo(t) {
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
function sd(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Dr(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
  }
}
const ld = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function cd({ layer: t, index: n, onUpdate: r, onRemove: a }) {
  const i = id[t.kind], s = sd(t), d = (p) => {
    r(Lo(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Dr(t, u));
  }, l = (p) => {
    r(Dr(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: ld, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          en,
          {
            value: t.kind,
            onChange: d,
            options: _o,
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
            "aria-label": `${Fn[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          aa,
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
const dd = 150;
function pd(t, n, r) {
  const [a, i] = S(null), [s, d] = S(!1), c = le(null), l = le(null), p = E(
    async (u, f) => {
      l.current?.abort();
      const h = new AbortController();
      l.current = h, d(!0);
      try {
        const g = await fetch(`${r}/api/pipeline/preview/adjust-layer`, {
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
    [r]
  );
  return ne(() => {
    if (!t) {
      i(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(t, n);
    }, dd), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: a, loading: s };
}
function Er(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function ud({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: a,
  onPinnedSourceImageIdChange: i,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = r ?? s, h = a ?? f, g = !!a, { previewSrc: x, loading: m } = pd(h, t, d), N = () => {
    i?.(void 0);
  }, y = (C) => {
    C?.imageId && (i?.(C.imageId), u(!1));
  }, v = (C, T) => {
    n(t.map(($, R) => R === C ? T : $));
  }, w = (C) => {
    n(t.filter((T, $) => $ !== C));
  }, b = () => {
    n([...t, Lo(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, T) => /* @__PURE__ */ e(
        cd,
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
            options: _o,
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
                    Er(h),
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
                  Er(f),
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
            Oo,
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
          yo,
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
const md = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function hd({ samples: t, onSelect: n }) {
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
const Or = "text-[12px] font-semibold text-text-secondary", fd = "text-[11px] text-text-tertiary mt-0.5";
function gd(t) {
  const { definition: n } = Ue(), r = q(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return he(r ?? "")?.images?.[0]?.imageId;
}
function xd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const a = gd(r), i = t.previewSourceImageId, s = t.layers ?? [];
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: Or, children: [
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
      /* @__PURE__ */ e("div", { className: fd, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(hd, { samples: md, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Or} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        ud,
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
function bd(t) {
  const { selectedNodeId: n } = Ue();
  return /* @__PURE__ */ e(xd, { ...t, currentNodeId: n });
}
const yd = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], vd = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function Nd(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function wd(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const pt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", jn = "mt-1 w-full text-[12px] rounded border border-red-500 bg-white px-2 py-1 outline-none", kd = `${pt} font-mono`, Cd = `${jn} font-mono`, nt = "text-[12px] font-semibold text-text-secondary", Ke = "text-[11px] text-text-tertiary mt-0.5", Jt = "text-[11px] text-red-600 mt-0.5";
function Id({ data: t, onChange: n }) {
  const [r, a] = S(!1), [i, s] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = S(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = Nd(t.outputSchema), h = E(
    (x) => {
      n({ seedRegions: x });
    },
    [n]
  ), g = (x) => {
    s(x);
    const m = wd(x);
    if (!m.ok) {
      c(m.error);
      return;
    }
    c(null), n({ outputSchema: m.value });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: nt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: pt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (x) => n({ model: x.target.value }),
          children: yd.map((x) => /* @__PURE__ */ e("option", { value: x, children: x }, x))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ke, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: nt, children: [
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
          className: p || u ? Cd : kd,
          value: t.imageRefPath ?? "",
          onChange: (x) => n({ imageRefPath: x.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Jt, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Jt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: Ke, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: vd.map((x) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n({ imageRefPath: x }),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
          children: x
        },
        x
      )) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: nt, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": l ? "true" : void 0,
          "aria-describedby": l ? "vision-user-prompt-error" : void 0,
          className: `${l ? jn : pt} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (x) => n({ userPrompt: x.target.value })
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
        Eo,
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
          className: `${d ? jn : pt} font-mono text-[11px] min-h-28 resize-y`,
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
            /* @__PURE__ */ e("span", { children: r ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      r && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
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
                n({ maxOutputTokens: m === "" ? void 0 : Math.max(1, parseInt(m, 10) || 0) });
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
              onChange: (x) => n({ systemPrompt: x.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: Ke, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const Sd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function $d({ samples: t, onSelect: n }) {
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
const Td = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Pt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ad = `${Pt} font-mono`, $t = "text-[12px] font-semibold text-text-secondary", _r = "text-[11px] text-text-tertiary mt-0.5";
function Rd({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.labels ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ labels: [...i, c] }), a(""));
  }, d = (c) => {
    n({ labels: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: $t, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Ad,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: _r, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e($d, { samples: Sd, onSelect: (c) => n({ imageRefPath: c }) })
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
            className: `${Pt} flex-1 mt-0`,
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
      /* @__PURE__ */ e("div", { className: _r, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: $t, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Pt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => n({ model: c.target.value }),
          children: Td.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
          onChange: (c) => n({ systemPrompt: c.target.value || void 0 }),
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
            n({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const Pd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Md({ samples: t, onSelect: n }) {
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
const Dd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], Mt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ed = `${Mt} font-mono`, Tt = "text-[12px] font-semibold text-text-secondary", Lr = "text-[11px] text-text-tertiary mt-0.5";
function Od({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: Tt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Ed,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Lr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(Md, { samples: Pd, onSelect: (r) => n({ imageRefPath: r }) })
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
          onChange: (r) => n({ userPrompt: r.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: Lr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: Tt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: Mt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (r) => n({ model: r.target.value }),
          children: Dd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
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
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
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
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 512 });
          }
        }
      )
    ] })
  ] });
}
const _d = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
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
], ut = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ud = `${ut} font-mono`, lt = "text-[12px] font-semibold text-text-secondary", Br = "text-[11px] text-text-tertiary mt-0.5";
function Fd({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.candidateTags ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ candidateTags: [...i, c] }), a(""));
  }, d = (c) => {
    n({ candidateTags: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: lt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Ud,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Br, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Ld, { samples: _d, onSelect: (c) => n({ imageRefPath: c }) })
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
            className: `${ut} flex-1 mt-0`,
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
      /* @__PURE__ */ e("div", { className: Br, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
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
            n({ maxTags: Number.isFinite(l) && l >= 1 ? l : 10 });
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
          onChange: (c) => n({ model: c.target.value }),
          children: Bd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
          onChange: (c) => n({ systemPrompt: c.target.value || void 0 }),
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
            n({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const jd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function zd({ samples: t, onSelect: n }) {
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
const qd = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Yt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Vd = `${Yt} font-mono`, Ht = "text-[12px] font-semibold text-text-secondary", $n = "text-[11px] text-text-tertiary mt-0.5";
function Wd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Ht, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Vd,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: $n, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(zd, { samples: jd, onSelect: (r) => n({ imageRefPath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Ht, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Yt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (r) => n({ model: r.target.value }),
          children: qd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: $n, children: "Defaults to Sonnet for best OCR accuracy." })
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
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
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
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: $n, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const Jd = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", dt = "text-[12px] font-semibold text-text-secondary", Ur = "text-[11px] text-text-tertiary mt-0.5";
function Hd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "A photorealistic photograph of a golden retriever in a sunny meadow"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ur, children: "Text description of the image to generate. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-model", className: dt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "generate-model",
          className: ct,
          value: t.model ?? "amazon.titan-image-generator-v2:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Jd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
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
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ width: Number.isFinite(a) && a > 0 ? a : 512 });
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
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ height: Number.isFinite(a) && a > 0 ? a : 512 });
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
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ seed: Number.isFinite(a) && a >= 0 ? a : void 0 });
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
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ numImages: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Ur, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const Gd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Kd({ samples: t, onSelect: n }) {
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
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Xt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Xd = `${Xt} font-mono`, Gt = "text-[12px] font-semibold text-text-secondary", Fr = "text-[11px] text-text-tertiary mt-0.5";
function Qd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: Xd,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Kd, { samples: Gd, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Gt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Xt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Yd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
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
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Fr, children: "Always fans out — each variation becomes a separate arm downstream." })
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
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Fr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const Zd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], ep = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function jr({ samples: t, onSelect: n }) {
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
const tp = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], zn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", zr = `${zn} font-mono`, Kt = "text-[12px] font-semibold text-text-secondary", qr = "text-[11px] text-text-tertiary mt-0.5";
function np({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
          className: zr,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(jr, { samples: Zd, onSelect: (r) => n({ sourceImagePath: r }) })
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
          className: zr,
          value: t.maskImagePath ?? "",
          onChange: (r) => n({ maskImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: qr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(jr, { samples: ep, onSelect: (r) => n({ maskImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Kt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${zn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: qr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Kt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: zn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: tp.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] })
  ] });
}
const rp = {
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
};
function op({ result: t, className: n }) {
  const { caption: r, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !r && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
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
const ap = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function ip({
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
  const f = n ?? t, [h, g] = S(null), x = le(null), m = E(() => {
    const v = x.current;
    v && (!r || !a) && g({ w: v.naturalWidth, h: v.naturalHeight });
  }, [r, a]), N = q(() => r && a && r > 0 && a > 0 ? { w: r, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [r, a, h]), y = (v, w, b, k, C) => {
    if (!N) return null;
    const T = Math.max(0, Math.min(v.x1, N.w)), $ = Math.max(0, Math.min(v.y1, N.h)), R = Math.max(0, Math.min(v.x2, N.w)), D = Math.max(0, Math.min(v.y2, N.h));
    if (!Number.isFinite(T) || !Number.isFinite($) || !Number.isFinite(R) || !Number.isFinite(D) || R <= T || D <= $) return null;
    const A = T / N.w * 100, B = $ / N.h * 100, W = (R - T) / N.w * 100, ie = (D - $) / N.h * 100, Y = ap[b];
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
          top: `${B}%`,
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
function sp(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function lp({ people: t, highlightedIndex: n, onSelect: r, className: a }) {
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
function cp({ objects: t, onSelect: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
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
function dp({ tags: t, onTagClick: n, className: r }) {
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
function Tn(t) {
  const n = Qt(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function pp({
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
          /* @__PURE__ */ e(se, { tone: Qt(t.verdict), size: "sm", children: Tn(t.verdict) }),
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
          /* @__PURE__ */ e(se, { tone: Qt(n.verdict), size: "sm", children: Tn(n.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(se, { tone: Qt(r), size: "sm", children: Tn(r) }) })
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
function up({
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
  const [f, h] = S(), [g, x] = S(!1), m = (y) => h(f === y.index ? void 0 : y.index), N = sp(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          ip,
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
        r ? /* @__PURE__ */ e(op, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          lp,
          {
            people: t.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(cp, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(dp, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      pp,
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
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
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
const mp = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], Vr = "claude-sonnet-4-6", Wr = [
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
function hp(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function fp({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: a,
  onSave: i,
  apiBase: s = ""
}) {
  const d = bo(), [c, l] = S(t), [p, u] = S(n), [f, h] = S(a ?? Vr), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [m, N] = S("0"), [y, v] = S(null), [w, b] = S(!1), [k, C] = S(null), [T, $] = S(null), R = E(() => {
    const te = g.trim();
    if (te)
      try {
        const O = JSON.parse(te);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [g]), D = E((te) => {
    N(te);
    const O = Number(te), P = Wr[O];
    P && (x(P.value ? JSON.stringify(P.value, null, 2) : ""), P.systemPrompt !== void 0 && l(P.systemPrompt));
  }, []), A = y?.imageId ?? null, B = A ? d.getImageUrl(A) : null, W = E(async () => {
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
          model: f || Vr
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
        imageUrl: B ?? "",
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
  }, [A, B, p, c, f, R, s]), ie = () => {
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
        Oo,
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
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
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
              onChange: (te) => D(te.target.value),
              options: Wr.map((te, O) => ({ value: String(O), label: te.label })),
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
          options: mp,
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
        className: "text-[12px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2",
        "data-testid": "bench-error",
        children: k
      }
    ),
    T && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          hp(T.usage),
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
        up,
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
const gp = {
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
}, An = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), We = ({ data: t }) => /* @__PURE__ */ o("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ e("strong", { children: t.type }),
  " — coming in Phase C."
] }), xp = {
  trigger: Jl,
  llm: Xl,
  transform: ec,
  condition: nc,
  action: ac,
  fork: ic,
  join: cc,
  approval: pc,
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
  scatter: wc,
  "image:resize": Sc,
  "image:transform": Dc,
  "image:format-convert": Bc,
  "image:sharpen": jc,
  "image:watermark": Wc,
  "image:crop": td,
  "image:adjust-bw": od,
  "image:adjust-layer": bd,
  "image:vision-analyze": Id,
  "image:vision-classify": Rd,
  "image:vision-describe": Od,
  "image:vision-tag": Fd,
  "image:vision-extract-text": Wd,
  "image:generate": Hd,
  "image:variation": Qd,
  "image:edit-prompt": np
};
function bp(t, n) {
  const r = xp[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n });
}
function yp({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Ue(), [c, l] = S("config"), p = le(null), u = le(null);
  Jn();
  const f = q(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), h = f.length > 1, g = f.length > 0, x = q(() => h || f.length === 0 || !n ? null : n.nodes.find((b) => b.id === f[0]) ?? null, [n, f, h]), m = E(() => {
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
  const N = x ? gp[x.type] : null, y = () => {
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
    /* @__PURE__ */ o(K, { children: [
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
    /* @__PURE__ */ o(K, { children: [
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
            const C = x && An.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], T = C.indexOf(c);
            let $ = null;
            b.key === "ArrowRight" ? $ = C[(T + 1) % C.length] : b.key === "ArrowLeft" ? $ = C[(T - 1 + C.length) % C.length] : b.key === "Home" ? $ = C[0] : b.key === "End" && ($ = C[C.length - 1]), $ && (b.preventDefault(), l($), u.current?.querySelector(
              `[data-tab="${$}"]`
            )?.focus());
          },
          children: (x && An.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((b) => {
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
        c === "config" && bp(x, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: rp[x.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && An.has(x.type) && (() => {
          const b = x.data;
          return /* @__PURE__ */ e(
            fp,
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
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function ht(t) {
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
function vp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Np(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function wp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Jr(t) {
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
function Rn(t) {
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
function kp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function rt({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Cp({ pipelineId: t, run: n, onBack: r }) {
  const a = Be();
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
      /* @__PURE__ */ e(rt, { label: "Status", children: /* @__PURE__ */ e(
        se,
        {
          tone: Jr(n.status),
          "aria-label": `Status: ${Rn(n.status)}`,
          children: Rn(n.status)
        }
      ) }),
      /* @__PURE__ */ e(rt, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(rt, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(rt, { label: "Duration", children: Se(n.durationMs) }),
      /* @__PURE__ */ e(rt, { label: "Triggered by", children: kp(n) }),
      /* @__PURE__ */ e(rt, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(rt, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", wp(n.estimatedCostUsd)), children: Np(n.estimatedCostUsd) }),
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
          const d = Jr(s.status), c = Rn(s.status), l = s.output, p = l?.response;
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
        /* @__PURE__ */ e("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Hr(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Ip(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Sp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function $p(t) {
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
function Tp(t) {
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
function Ap(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function Rp({ pipelineId: t, onClose: n }) {
  const r = Be(), [a, i] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [g, x] = S([]), m = le(null), N = E(async () => {
    d(!0), l(null);
    try {
      const b = await vo(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  ne(() => {
    m.current !== t && (m.current = t, N());
  }, [t, N]), Ee("*", E((b) => {
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
          i((D) => [R, ...D.filter((A) => A.id !== $.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const $ = C;
          i(
            (R) => R.map(
              (D) => D.id === $.runId ? { ...D, status: "completed", completedAt: $.at, durationMs: $.durationMs } : D
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const $ = C;
          i(
            (R) => R.map(
              (D) => D.id === $.runId ? { ...D, status: "failed", completedAt: $.at, error: $.error } : D
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const $ = C;
          i(
            (R) => R.map(
              (D) => D.id === $.runId ? { ...D, status: "cancelled", completedAt: $.at } : D
            )
          );
          break;
        }
      }
  }, [t]));
  const y = q(
    () => a.find((b) => b.id === p) ?? null,
    [a, p]
  ), v = E((b) => {
    x((k) => k.includes(b) ? k.filter((C) => C !== b) : k.length >= 2 ? [k[1], b] : [...k, b]);
  }, []), w = E(() => {
    if (g.length !== 2) return;
    const [b, k] = g;
    r(`/pipelines/${t}/compare?a=${b}&b=${k}`);
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
            Cp,
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
            const k = $p(b.status), C = Tp(b.status), T = g.includes(b.id);
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
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Sp(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: Se(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", Ip(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Hr(b.estimatedCostUsd)}`,
                        children: Hr(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Ap(b) })
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
function Pp({
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(yp, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            Rp,
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
function Mp(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Dp(t) {
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
function Ep(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Lh() {
  const { pipelineId: t } = gt(), n = q(() => t ? ot(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(No, { pipelineId: t, children: /* @__PURE__ */ e(Op, { pipelineId: t }) });
}
function Op({ pipelineId: t }) {
  const n = Be(), r = Ue(), a = bt(), { toast: i } = sn(), {
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
  } = r, m = kl(t), [N, y] = S(!1), v = le(null), w = le(d);
  ne(() => (w.current && !d && (y(!0), v.current && clearTimeout(v.current), v.current = setTimeout(() => y(!1), 450)), w.current = d, () => {
    v.current && (clearTimeout(v.current), v.current = null);
  }), [d]);
  const b = q(
    () => s ? Ro(s) : null,
    [s]
  ), k = (b?.errors.length ?? 0) > 0, C = q(
    () => Dp(s),
    [s]
  ), $ = q(() => s ? s.nodes.some((ge) => ge.type === "trigger") : !1, [s]) ? ["trigger"] : [], [R, D] = S(!0), [A, B] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), W = E(() => {
    B((ge) => {
      const oe = !ge;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          oe ? "true" : "false"
        );
      } catch {
      }
      return oe;
    });
  }, []), [ie, Y] = S(!1), [te, O] = S(!1), [P, H] = S(!1), [G, L] = S(!1), [V, J] = S(!1), X = q(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), pe = s?.status === "published", j = !m.isRunActive && (!pe || k), ce = m.isRunActive ? "Cancel the active run" : pe ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", we = E(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!j) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((ge) => [ge, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, j, C]);
  ne(() => {
    const ge = (oe) => {
      if (Ep(oe.target)) return;
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
    return window.addEventListener("keydown", ge), () => window.removeEventListener("keydown", ge);
  }, [p, i, we, m, a, h, g, l]);
  const _e = () => {
    if (!s) return;
    const ge = Wn(s.id);
    ge && n(`/pipelines/${ge.id}`);
  }, Ye = () => {
    if (!s) return;
    const ge = En(s.id);
    ge && Et(`${Mp(s.name)}.pipeline.json`, ge);
  }, Fe = async () => {
    if (!s) return;
    const ge = fl(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(ge), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (oe) {
      console.warn("[PipelineEditor] clipboard write failed", oe), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, De = () => {
    L(!0);
  }, qe = () => {
    Y(!1), !k && (u(), i("Pipeline published", { type: "success" }));
  }, je = () => {
    s && (ia(s.id), O(!1), n("/pipelines"));
  }, Ve = () => {
    wo(t), H(!1), i("Run history cleared", { type: "success" });
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
          Il,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: N,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: j,
            runTitle: ce,
            currentRun: Ie,
            breakpoints: m.breakpoints,
            onRunClick: we,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: Ye,
            onPublishClick: () => Y(!0),
            onDuplicate: _e,
            onCopyMermaid: Fe,
            onViewVersions: De,
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
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ e(
                Aa,
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
          /* @__PURE__ */ e(xs, { disabledTypes: $ }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Ms,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            Pp,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          _l,
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
          Es,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          wl,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && R
          }
        ),
        /* @__PURE__ */ e(
          Nl,
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
            versionDiffOpen: G,
            onVersionDiffClose: () => L(!1),
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
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(Oe, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                Oe,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((ge) => !m.triggerInputValues[ge]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ e("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((ge) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: ge }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    "data-autofocus": ge === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: m.triggerInputValues[ge] ?? "",
                    onChange: (oe) => m.setTriggerInputValues((Q) => ({ ...Q, [ge]: oe.target.value }))
                  }
                )
              ] }, ge))
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
function _p(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function Lp({
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
  const [u, f] = S(!1), [h, g] = S(!1), x = le(null);
  ft(x, () => f(!1), u);
  const m = t.status === "published", N = t.status === "archived", y = typeof t.publishedVersion == "number", v = _p(t.triggerBinding);
  let w, b;
  N ? (w = `Archived · v${t.version}`, b = "danger") : m ? (w = `Published · v${t.version}`, b = "success") : y ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (w = `Draft · v${t.version}`, b = "neutral");
  const k = !m, C = (R) => (D) => {
    D.stopPropagation(), R();
  }, T = d || c || h || l, $ = (R) => {
    d ? p(R.shiftKey) : n();
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
const Bp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Up = ["draft", "published"];
function Fp({
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
            children: Zn.map((h) => {
              const g = a ? r.has(h) : Up.includes(h);
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
                  children: Bp[h]
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
function jp({
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Xe, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Xe, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Xe, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Xe, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Xe, onClick: r, children: "Export all" }),
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
function zp({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, a] = S(!1), [i, s] = S(/* @__PURE__ */ new Set()), d = le(null), c = le(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    r ? (l(), a(!1)) : a(!0);
  }, [r, l]), u = E(
    (m, N = !1) => {
      const y = t, v = y.findIndex((b) => b.id === m), w = d.current;
      v !== -1 && (d.current = v), s((b) => {
        const k = new Set(b), C = !k.has(m);
        if (N && w != null && v !== -1) {
          const T = Math.min(w, v), $ = Math.max(w, v);
          for (let R = T; R <= $; R++) {
            const D = y[R];
            D && (C ? k.add(D.id) : k.delete(D.id));
          }
        } else C ? k.add(m) : k.delete(m);
        return k;
      });
    },
    [t]
  ), f = E(() => {
    s(new Set(n));
  }, [n]), h = t.length > 0 && t.every((m) => i.has(m.id)), g = !h && t.some((m) => i.has(m.id)), x = E(() => {
    s((m) => {
      const N = new Set(m);
      if (h)
        for (const y of t) N.delete(y.id);
      else
        for (const y of t) N.add(y.id);
      return N;
    }), r || a(!0);
  }, [h, t, r]);
  return ne(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: r,
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
const qp = 280, ke = 160, Vp = 40, Wp = 200;
function Z(t) {
  return Vp + t * qp;
}
function ee(t) {
  return Wp + t * ke;
}
function re(t, n, r, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: n,
    target: r,
    targetHandle: a
  };
}
function Jp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Hp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: p },
    { id: a, type: "fork", position: { x: Z(1), y: ee(0) }, data: u },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) - ke / 2 }, data: f },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: h },
    { id: d, type: "llm", position: { x: Z(2), y: ee(0) + ke / 2 }, data: g },
    { id: c, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: x },
    { id: l, type: "join", position: { x: Z(4), y: ee(0) }, data: m }
  ], y = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Gp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: f },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: h },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: g },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: x },
    { id: d, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: m },
    { id: c, type: "approval", position: { x: Z(4), y: ee(0) + ke / 2 }, data: N },
    { id: l, type: "condition", position: { x: Z(5), y: ee(0) + ke / 2 }, data: y },
    { id: p, type: "action", position: { x: Z(6), y: ee(0) }, data: v },
    { id: u, type: "action", position: { x: Z(6), y: ee(0) + ke }, data: w }
  ], k = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Kp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "transform", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Yp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "approval", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "approval", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Xp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "transform", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Qp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Zp(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function eu(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: l },
    { id: a, type: "fork", position: { x: Z(1), y: ee(0) }, data: p },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) - ke / 2 }, data: u },
    { id: s, type: "approval", position: { x: Z(2), y: ee(0) + ke / 2 }, data: f },
    { id: d, type: "join", position: { x: Z(3), y: ee(0) }, data: h },
    { id: c, type: "action", position: { x: Z(4), y: ee(0) }, data: g }
  ], m = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function tu(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: l },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: p },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: u },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: f },
    { id: d, type: "approval", position: { x: Z(4), y: ee(0) - ke / 2 }, data: h },
    { id: c, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: g }
  ], m = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function nu(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: f },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: h },
    { id: i, type: "fork", position: { x: Z(2), y: ee(0) }, data: g },
    { id: s, type: "llm", position: { x: Z(3), y: ee(0) - ke }, data: x },
    { id: d, type: "llm", position: { x: Z(3), y: ee(0) }, data: m },
    { id: c, type: "llm", position: { x: Z(3), y: ee(0) + ke }, data: N },
    { id: l, type: "join", position: { x: Z(4), y: ee(0) }, data: y },
    { id: p, type: "llm", position: { x: Z(5), y: ee(0) }, data: v },
    { id: u, type: "action", position: { x: Z(6), y: ee(0) }, data: w }
  ], k = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function ru(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: c },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: l },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: p },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: u },
    { id: d, type: "approval", position: { x: Z(3), y: ee(0) + ke / 2 }, data: f }
  ], g = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function ou(t) {
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
    { id: r, type: "trigger", position: { x: Z(0), y: ee(0) }, data: u },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: f },
    { id: i, type: "transform", position: { x: Z(2), y: ee(0) }, data: h },
    { id: s, type: "condition", position: { x: Z(3), y: ee(0) }, data: g },
    { id: d, type: "action", position: { x: Z(4), y: ee(0) - ke / 2 }, data: x },
    { id: c, type: "llm", position: { x: Z(4), y: ee(0) + ke / 2 }, data: m },
    { id: l, type: "approval", position: { x: Z(5), y: ee(0) + ke / 2 }, data: N },
    { id: p, type: "action", position: { x: Z(6), y: ee(0) + ke / 2 }, data: y }
  ], w = [
    re(r, "out", a),
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
const Pn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Jp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Hp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Gp,
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
    build: Kp,
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
    build: Yp,
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
    build: Xp
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Qp
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Zp
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: eu
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: tu
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: nu
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: ru
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: ou
  }
], Bo = "/api";
async function au(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const a = await iu(r.name);
      if (a) {
        n.createdTypes.push(a.typeId);
        continue;
      }
      const i = await su(r);
      n.createdTypes.push(i.typeId);
    } catch (a) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return n;
}
async function iu(t) {
  try {
    const n = await fetch(`${Bo}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const a = (await n.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function su(t) {
  const n = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: lu(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), r = await fetch(`${Bo}/document-types`, {
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
function lu(t) {
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
function cu(t) {
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
function du(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function pu({ template: t, meta: n, onPick: r }) {
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
function uu({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: a
}) {
  const { userId: i } = Kn(), [s, d] = S(""), c = le(null);
  ne(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = q(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of Pn) {
      const x = g.build(i || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: du(x) });
    }
    return h;
  }, [i, t]), p = q(() => {
    const h = s.trim().toLowerCase();
    return h ? Pn.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : Pn;
  }, [s]), u = (h) => {
    if (r) {
      const g = h.build(i || "anonymous"), x = cu(g);
      sa(x), n(), r(x.id), h.prerequisites && au(h.prerequisites).then((m) => {
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
              pu,
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
const Zn = ["draft", "published", "archived"], Gr = ["draft", "published"];
function mu(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(Zn);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function hu(t, n) {
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
function fu(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function Kr(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function gu() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${a}`;
}
function xu({
  open: t,
  onClose: n,
  onCreate: r
}) {
  const [a, i] = S(""), s = le(null);
  ne(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && r(a.trim());
  };
  return /* @__PURE__ */ o(
    He,
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
function Bh() {
  const t = Be(), { userId: n } = Kn(), { toast: r } = sn(), { triggerRun: a, isTriggering: i } = la(), [s, d] = an(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [g, x] = S("updated"), m = q(
    () => mu(s.get("status")),
    [s]
  ), N = q(() => m ?? new Set(Gr), [m]), y = m != null, v = (M) => {
    const _ = new URLSearchParams(s);
    if (M.size === 0)
      _.set("status", "");
    else {
      const de = Zn.filter((me) => M.has(me)).join(",");
      _.set("status", de);
    }
    d(_, { replace: !0 });
  }, w = (M) => {
    const _ = y ? new Set(N) : new Set(Gr);
    _.has(M) ? _.delete(M) : _.add(M), v(_);
  }, [b, k] = S(!1), [C, T] = S(!1), [$, R] = S(null), [D, A] = S(!1), [B, W] = S(!1), [ie, Y] = S(!1), te = E(async () => {
    const M = await ca(), _ = [];
    for (const de of M) {
      const me = await at(de.id);
      me && _.push(hu(me, de.icon));
    }
    l(_);
  }, []);
  ne(() => {
    te();
  }, [te]);
  const O = q(() => {
    const M = p.trim().toLowerCase(), de = [...c.filter((me) => {
      if (M) {
        const ye = me.name.toLowerCase().includes(M), Le = me.tags.some((tr) => tr.toLowerCase().includes(M));
        if (!ye && !Le) return !1;
      }
      return !(!(y && N.size === 0) && !N.has(me.status) || f !== "all" && fu(me.triggerBinding) !== f);
    })];
    return g === "name" ? de.sort((me, ye) => me.name.localeCompare(ye.name)) : g === "created" ? de.sort((me, ye) => ye.createdAt.localeCompare(me.createdAt)) : de.sort((me, ye) => ye.updatedAt.localeCompare(me.updatedAt)), de;
  }, [c, p, N, y, f, g]), P = q(() => O.map((M) => M.id), [O]), {
    selectionMode: H,
    selected: G,
    allVisibleSelected: L,
    selectAllRef: V,
    handleToggleSelect: J,
    handleSelectAllFiltered: X,
    handleHeaderToggleAll: pe,
    clearSelection: j,
    setSelectionMode: ce
  } = zp({ visibleRows: O, filteredIds: P }), we = q(() => {
    const M = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (G.has(_.id))
        for (const de of _.tags) M.add(de);
    return Array.from(M).sort((_, de) => _.localeCompare(de));
  }, [c, G]), _e = async (M) => {
    const _ = await da({ name: M, createdBy: n });
    k(!1), t(`/pipelines/${_.id}`);
  }, Ye = () => {
    const M = pa(n);
    it(M).then(() => te()), t(`/pipelines/${M.id}`);
  }, Fe = (M) => {
    const _ = M.build(n);
    it(_), T(!1), t(`/pipelines/${_.id}`);
  }, De = (M) => t(`/pipelines/${M}`), qe = async (M) => {
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
  }, je = (M) => {
    const _ = Wn(M);
    _ && (it(_).then(() => te()), r(`Duplicated as "${_.name}"`, { type: "success" }));
  }, Ve = (M) => {
    const _ = En(M.id);
    if (!_) {
      r("Export failed", { type: "error" });
      return;
    }
    Et(`${Kr(M.name)}.pipeline.json`, _);
  }, Ie = async () => {
    $ && (await rr($), R(null), te(), r("Pipeline deleted", { type: "success" }));
  }, ge = $ ? c.find((M) => M.id === $) : null, oe = () => {
    const M = Array.from(G);
    M.length !== 0 && (M.forEach((_, de) => {
      window.setTimeout(() => {
        const me = c.find((Le) => Le.id === _), ye = En(_);
        !me || !ye || Et(`${Kr(me.name)}-${gu()}.pipeline.json`, ye);
      }, de * 100);
    }), r(`Exported ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Q = async (M) => {
    const _ = Array.from(G);
    for (const de of _) {
      const me = await at(de);
      if (!me) continue;
      const ye = me.tags ?? [];
      ye.includes(M) || (me.tags = [...ye, M], await it(me));
    }
    W(!1), te(), r(`Added tag "${M}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ae = async (M) => {
    const _ = Array.from(G);
    for (const de of _) {
      const me = await at(de);
      if (!me) continue;
      const ye = me.tags ?? [];
      ye.includes(M) && (me.tags = ye.filter((Le) => Le !== M), await it(me));
    }
    te(), r(`Removed tag "${M}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ue = async () => {
    const M = Array.from(G);
    for (const _ of M) await rr(_);
    A(!1), j(), te(), r(`Deleted ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, be = async () => {
    const M = Array.from(G);
    if (M.length === 0) return;
    let _ = 0, de = 0;
    for (const me of M) {
      const ye = await at(me);
      if (!ye) continue;
      if (ye.status === "published") {
        de += 1;
        continue;
      }
      await ua(me) && (_ += 1);
    }
    te(), de > 0 ? r(
      `Published ${_}; skipped ${de} already published`,
      { type: "success" }
    ) : r(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Pe = async () => {
    const M = Array.from(G);
    if (M.length === 0) return;
    let _ = 0, de = 0;
    for (const ye of M) {
      const Le = await at(ye);
      if (!Le) continue;
      Le.status === "archived" ? (Le.status = "draft", de += 1) : (Le.status = "archived", _ += 1), await it(Le);
    }
    te();
    const me = [];
    _ > 0 && me.push(`Archived ${_}`), de > 0 && me.push(`Unarchived ${de}`), r(me.join(" · ") || "No pipelines changed", { type: "success" });
  }, $e = async () => {
    const M = Array.from(G);
    if (M.length === 0) return;
    const _ = [];
    for (const me of M) {
      const ye = await at(me);
      ye && _.push(ye);
    }
    if (_.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Et(`pipelines-${de}.json`, JSON.stringify(_, null, 2)), r(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  ne(() => {
    const M = (_) => {
      const de = _.target;
      if (de) {
        const ye = de.tagName;
        if (ye === "INPUT" || ye === "TEXTAREA" || ye === "SELECT" || de.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (G.size > 0 || H || B || ie) && (W(!1), Y(!1), j(), ce(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        H && (_.preventDefault(), X());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && G.size > 0 && !D && !$ && !b && !C && (_.preventDefault(), A(!0));
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [
    G,
    H,
    B,
    ie,
    D,
    $,
    b,
    C,
    j,
    X,
    ce
  ]);
  const Ge = c.length > 0, zt = G.size > 0;
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
          Fp,
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
            allVisibleSelected: L,
            selectAllRef: V,
            onHeaderToggleAll: pe
          }
        ),
        zt && /* @__PURE__ */ e(
          jp,
          {
            count: G.size,
            onClear: j,
            onExport: oe,
            onExportAsJSON: $e,
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
            addTagOpen: B,
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
                  Lp,
                  {
                    row: M,
                    onOpen: () => De(M.id),
                    onRun: () => {
                      qe(M);
                    },
                    onDuplicate: () => je(M.id),
                    onExport: () => Ve(M),
                    onDelete: () => R(M.id),
                    selectionMode: H,
                    selected: G.has(M.id),
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
          xu,
          {
            open: b,
            onClose: () => k(!1),
            onCreate: _e
          }
        ),
        /* @__PURE__ */ e(
          uu,
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
            footer: /* @__PURE__ */ o(K, { children: [
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
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: ge && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                ge.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ e(
          He,
          {
            open: D,
            onClose: () => A(!1),
            title: `Delete ${G.size} pipeline${G.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(K, { children: [
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
                    "bg-red-600 text-white border-none rounded-[7px]",
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
const bu = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Uo(t, n, r) {
  const a = bu[t], i = Math.max(0, n | 0), s = Math.max(0, r | 0);
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
  const n = {};
  let r = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = Uo(l.model, p, u), h = n[l.model];
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
function jt(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function yu(t) {
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
function Fo(t, n) {
  let r = 0;
  if (t.llm) {
    const i = n.get(t.nodeId);
    i && (r += Uo(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (r += a), r;
}
function vu(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), a.set(l.id, yu(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = Fo(p, r);
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
function Nu(t) {
  return t.slice(0, 10);
}
function wu(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function ku(t, n, r = 30, a = /* @__PURE__ */ new Date()) {
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
    const f = Nu(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += Fo(g, i);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: wu(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
    });
  }
  return p;
}
const jo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], zo = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], qo = ["24h", "7d", "30d", "all"], Cu = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Iu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function Su(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const a = r.attempts?.length ?? 0;
    a > 1 && (n += a - 1);
  }
  return n;
}
function Vo(t, n) {
  const r = n.now ?? Date.now(), a = n.range === "all" ? null : r - Cu[n.range], i = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = Iu(s.triggeredBy.triggerType);
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
function Yr(t, n) {
  if (!t) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function Wo(t) {
  const n = t.get("range") ?? "7d", r = qo.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: Yr(t.get("status"), jo),
    triggerKinds: Yr(t.get("trigger"), zo),
    range: r
  };
}
const $u = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Tu = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Au = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function Xr({
  label: t,
  options: n,
  selected: r,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = le(null);
  ft(l, () => c(!1), d);
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
function Jo({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: qo.map((u) => /* @__PURE__ */ e(
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
            children: Au[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          Xr,
          {
            label: "Status",
            options: jo,
            selected: n,
            onToggle: s,
            labels: $u,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          Xr,
          {
            label: "Trigger",
            options: zo,
            selected: r,
            onToggle: d,
            labels: Tu,
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
function er(t) {
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
const Mu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Du(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Eu({
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
  const p = le(!1), u = le(null), f = t.length > 0 && t.every((m) => n.has(m.id)), h = !f && t.some((m) => n.has(m.id)), g = () => {
    const m = new Set(n);
    if (f)
      for (const N of t) m.delete(N.id);
    else
      for (const N of t) m.add(N.id);
    r(m);
  }, x = (m, N, y) => {
    const v = new Set(n), w = !v.has(m);
    if (y && u.current != null) {
      const b = Math.min(u.current, N), k = Math.max(u.current, N);
      for (let C = b; C <= k; C++) {
        const T = t[C];
        T && (w ? v.add(T.id) : v.delete(T.id));
      }
    } else w ? v.add(m) : v.delete(m);
    u.current = N, r(v);
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
          const { tone: y, label: v } = er(m.status), w = n.has(m.id), b = Su(m);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Du(m.startedAt) }),
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
                      tone: Pu(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: Mu[m.error.errorCategory] ?? m.error.errorCategory
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
                            await ma(m.pipelineId, m.id);
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
function Uh() {
  const { pipelineId: t } = gt(), n = Be(), [r, a] = an(), [i, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, m] = S(!1), [N, y] = S(null), [v, w] = S(!1), b = E((L) => {
    const V = L.error?.nodeId;
    if (!V || V === "unknown") return;
    const J = Object.entries(L.steps).filter(([X, pe]) => X !== V && pe.status === "completed").map(([X]) => X);
    g({ run: L, nodeId: V, skippedNodes: J, snapshotInput: !1 }), y(null);
  }, []), k = E(async () => {
    if (h) {
      y(null), m(!0);
      try {
        const L = await ko(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        g(null), n(`/pipelines/${h.run.pipelineId}/runs/${L.newRunId}`);
      } catch (L) {
        y(L instanceof Error ? L.message : String(L)), m(!1);
      }
    }
  }, [h, n]), { query: C, statuses: T, triggerKinds: $, range: R } = q(
    () => Wo(r),
    [r]
  ), D = (L, V) => {
    const J = new URLSearchParams(r);
    V ? J.set(L, V) : J.delete(L), a(J, { replace: !0 });
  }, A = (L) => {
    const V = new Set(T);
    V.has(L) ? V.delete(L) : V.add(L), D("status", V.size === 0 ? null : Array.from(V).join(","));
  }, B = (L) => {
    const V = new Set($);
    V.has(L) ? V.delete(L) : V.add(L), D("trigger", V.size === 0 ? null : Array.from(V).join(","));
  }, W = (L) => {
    D("range", L === "7d" ? null : L);
  }, ie = (L) => {
    D("q", L.length === 0 ? null : L);
  }, Y = (L) => {
    p((V) => V.includes(L) ? V.filter((J) => J !== L) : V.length >= 2 ? [V[1], L] : [...V, L]);
  };
  ne(() => {
    t && (c(ot(t)), s(tn(t)));
  }, [t]);
  const te = q(
    () => Vo(i, { query: C, statuses: T, triggerKinds: $, range: R }),
    [i, C, T, $, R]
  ), O = q(() => {
    const L = /* @__PURE__ */ new Map();
    if (!d) return L;
    for (const V of d.nodes)
      V.data.type === "llm" && L.set(V.id, V.data.model);
    return L;
  }, [d]), P = q(() => {
    const L = {};
    for (const V of te) {
      const J = Object.values(V.steps).filter((X) => !!X.llm).map((X) => ({
        model: O.get(X.nodeId),
        tokensIn: X.llm?.tokensIn ?? 0,
        tokensOut: X.llm?.tokensOut ?? 0
      }));
      L[V.id] = jt(vt(J).total);
    }
    return L;
  }, [te, O]), H = () => {
    if (!t) return;
    w(!1);
    const L = Array.from(u), V = i.filter((J) => !u.has(J.id));
    wo(t);
    for (const J of [...V].sort((X, pe) => X.startedAt.localeCompare(pe.startedAt)))
      ha(t, J);
    s(tn(t)), f(/* @__PURE__ */ new Set()), p((J) => J.filter((X) => !L.includes(X)));
  }, G = () => {
    const L = i.filter((j) => u.has(j.id));
    if (L.length === 0) return;
    const V = new Blob([JSON.stringify(L, null, 2)], { type: "application/json" }), J = URL.createObjectURL(V), X = document.createElement("a"), pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
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
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((L) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: L.slice(0, 10) }, L)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (L) => g((V) => V && { ...V, snapshotInput: L.target.checked }), className: "accent-primary" }),
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
            const [L, V] = l;
            n(`/pipelines/${t}/runs/compare/${L}/${V}`);
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
      Jo,
      {
        query: C,
        statuses: T,
        triggerKinds: $,
        range: R,
        onQueryChange: ie,
        onStatusToggle: A,
        onTriggerToggle: B,
        onRangeChange: W,
        onClearFilters: () => {
          ie(""), D("status", null), D("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      Ru,
      {
        selectionCount: u.size,
        onExport: G,
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
      Eu,
      {
        filtered: te,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: Y,
        costByRunId: P,
        pipelineId: t,
        onNavigate: n,
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
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 });
}
function Ou(t) {
  return q(() => {
    if (!t) return null;
    const n = ot(t.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const i of n.nodes)
      i.data.type === "llm" && r.set(i.id, i.data.model);
    const a = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
      model: r.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return vt(a).total;
  }, [t]);
}
function Qe({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const Qr = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Zr = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", Mn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Me = "px-2 py-[5px] text-[11px] text-text-secondary align-top", _u = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function At(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${_u[t] ?? ""}`.trimEnd();
}
const Lu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function Bu({ stepId: t, step: n, index: r, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, f = n.llm, h = n.input, g = Lu[n.status] ?? "#94a3b8";
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
        style: { border: `1px solid ${g}40` },
        children: [
          /* @__PURE__ */ e(Qe, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: Mn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Mn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Mn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: new Date(n.startedAt).toLocaleTimeString() }),
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
          /* @__PURE__ */ e(Qe, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([x]) => x !== "type").map(([x, m]) => /* @__PURE__ */ o(go.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Qe, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: Qr, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ e(Qe, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: Zr, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ e(Qe, { title: "Response", children: /* @__PURE__ */ e("div", { className: Zr, children: u ?? f?.response }) }) : /* @__PURE__ */ e(Qe, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: Qr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
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
          n.error && /* @__PURE__ */ e(Qe, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
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
function Uu({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = q(() => {
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
    const h = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", g = [];
    for (const b of r)
      f.has(b.source) && h(b.sourceHandle) && g.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const x = /* @__PURE__ */ new Map();
    for (const b of r)
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
        const D = { stepId: $, step: R, children: [] }, A = p($);
        if (f.has(A)) {
          const W = g.filter((ie) => ie.forkId === A);
          for (const { branch: ie, targetNodeId: Y } of W) {
            const te = N(Y);
            for (const O of te)
              O.branch = O.branch ?? ie;
            te.length > 0 && (te[0].branch = ie, D.children.push(...te));
          }
        }
        k.push(D);
        const B = x.get(A)?.filter((W) => W.handle === "out");
        C = B && B.length === 1 ? B[0].target : null;
      }
      return k;
    }
    const y = /* @__PURE__ */ new Set();
    for (const b of r)
      y.add(b.target);
    const v = l.find(([b]) => !y.has(p(b)))?.[1] ? l.find(([b]) => !y.has(p(b)))[0] : l[0]?.[0];
    let w = [];
    v && (w = N(p(v)));
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
      const h = u++, g = /* @__PURE__ */ new Map();
      for (const x of f.children) {
        const m = x.branch ?? "default";
        g.has(m) || g.set(m, []), g.get(m).push(x);
      }
      return /* @__PURE__ */ o(go.Fragment, { children: [
        /* @__PURE__ */ e(
          Bu,
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
const Fu = 5e3, ju = "synthetic-";
function zu(t) {
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
function qn(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function qu(t, n) {
  if (n.length === 0) return t.slice().sort(qn);
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
  return [...t, ...i].sort(qn);
}
function Vu(t, n, r = {}) {
  const { pollMs: a = Fu, filters: i } = r, s = Pa(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, g] = S(null), [x, m] = S(void 0), [N, y] = S(0), [v, w] = S(!1), b = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  ne(() => {
    if (!t || !n) return;
    let R = !1;
    return f(!0), g(null), (async () => {
      try {
        const D = await or(t, n, i ?? {});
        if (R) return;
        c(D.items), m(D.nextCursor), f(!1);
      } catch (D) {
        if (R) return;
        g(D instanceof Error ? D.message : String(D)), f(!1);
      }
    })(), () => {
      R = !0;
    };
  }, [t, n, b, N]), ne(() => {
    if (!t || !n || a <= 0) return;
    const R = window.setInterval(() => {
      y((D) => D + 1);
    }, a);
    return () => window.clearInterval(R);
  }, [t, n, a]), ne(() => {
    if (!t || !n) return;
    const R = [], D = (B, W) => {
      const ie = zu(B);
      if (!ie) return;
      const Y = W;
      if (Y.runId !== n) return;
      w(!0);
      const te = {
        auditId: `${ju}${B}-${Y.stepId ?? "run"}-${Date.now()}`,
        timestamp: Y.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ie,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
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
    for (const B of A)
      R.push(s.subscribe(B, (W) => D(B, W)));
    return R.push(s.subscribeToRun(n)), () => {
      for (const B of R) B();
    };
  }, [s, t, n]), ne(() => {
    d.length !== 0 && p((R) => {
      if (R.length === 0) return R;
      const D = /* @__PURE__ */ new Map();
      for (const A of d) {
        const B = D.get(A.action);
        (!B || A.timestamp > B) && D.set(A.action, A.timestamp);
      }
      return R.filter((A) => {
        const B = D.get(A.action);
        return !B || A.timestamp >= B;
      });
    });
  }, [d]);
  const k = le(!1), C = E(() => {
    !t || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const R = await or(t, n, {
          ...i ?? {},
          cursor: x
        });
        c((D) => {
          const A = new Set(D.map((W) => W.auditId)), B = D.concat(R.items.filter((W) => !A.has(W.auditId)));
          return B.sort(qn), B;
        }), m(R.nextCursor);
      } catch (R) {
        g(R instanceof Error ? R.message : String(R));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, x, b]), T = E(() => {
    y((R) => R + 1);
  }, []);
  return {
    items: q(() => qu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: v,
    refresh: T
  };
}
const Wu = "#3b82f6", Ju = "#eab308", Hu = "#f97316", eo = "#64748b", Gu = "#ef4444", Ku = "#a855f7";
function Yu(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Gu : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Ku : t.action.startsWith("pipeline.approval.") ? Ju : t.action.startsWith("pipeline.breakpoint.") ? Hu : t.action.startsWith("pipeline.step.") ? Wu : (t.action.startsWith("pipeline.run."), eo);
}
const Xu = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, to = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Qu(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function no(t) {
  const n = t.details, r = t.trace, a = n && typeof n.stepId == "string" ? n.stepId : void 0, i = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return a ?? i ?? s;
}
function Zu(t, n = Date.now()) {
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
function em({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const a = Vu(t, n), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [g, x] = S("all"), [m, N] = S(/* @__PURE__ */ new Set()), y = E((C) => {
    u((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), v = E((C) => {
    N((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), w = q(() => {
    const C = Qu(g), T = f.trim().toLowerCase(), $ = to.filter((R) => p.has(R.label));
    return i.filter((R) => {
      if ($.length > 0 && !$.some((D) => D.matches(R.action)) || T && !R.actorUserId.toLowerCase().includes(T)) return !1;
      if (C !== null) {
        const D = Date.parse(R.timestamp);
        if (!Number.isFinite(D) || D < C) return !1;
      }
      return !0;
    });
  }, [i, p, f, g]), b = E(() => {
    if (typeof window > "u") return;
    const C = w.map((D) => JSON.stringify(D)).join(`
`) + (w.length > 0 ? `
` : ""), T = new Blob([C], { type: "application/x-ndjson" }), $ = URL.createObjectURL(T), R = document.createElement("a");
    R.href = $, R.download = `executor-log-${n}.ndjson`, document.body.appendChild(R), R.click(), document.body.removeChild(R), URL.revokeObjectURL($);
  }, [w, n]), k = E(
    (C) => {
      if (v(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const T = no(C);
      T && r(T);
    },
    [r, v]
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
          to.map((C) => {
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
                children: Xu[C]
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
            const T = m.has(C.auditId), R = C.action.startsWith("pipeline.step.") ? no(C) : void 0;
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
                      style: { background: Yu(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Zu(C.timestamp)
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
                      onClick: (D) => D.stopPropagation(),
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
function Fh() {
  const { pipelineId: t, runId: n } = gt();
  return !t || !n ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(No, { pipelineId: t, children: /* @__PURE__ */ e(fa, { children: /* @__PURE__ */ e(tm, { pipelineId: t, runId: n }) }) });
}
function tm({ pipelineId: t, runId: n }) {
  const r = Be(), a = Ue(), i = bt(), { definition: s } = a, [d, c] = S(null);
  ne(() => {
    let j = !1;
    return import("./PipelineEditorServicesContext-D_ZyIOs7.js").then((ce) => ce.Y).then(({ getPipelineRun: ce }) => {
      ce(t, n).then((we) => {
        !j && we && c(we);
      });
    }), () => {
      j = !0;
    };
  }, [t, n]);
  const l = q(() => {
    const j = i.runs[n], ce = d;
    if (!j && !ce) return;
    if (!j) return ce ?? void 0;
    if (!ce) return j;
    const we = Object.keys(j.steps).length, _e = Object.keys(ce.steps).length;
    return we >= _e ? j : { ...ce, status: j.status, currentStepIds: j.currentStepIds };
  }, [i.runs, n, d]);
  ga(n);
  const p = Ou(l ?? null), u = q(() => {
    const j = {};
    if (!s) return j;
    for (const ce of s.nodes)
      j[ce.id] = { type: ce.data.type, data: ce.data };
    return j;
  }, [s]), [f, h] = S(!1), g = le(null);
  ft(g, () => h(!1), f);
  const [x, m] = S("steps"), [N, y] = S(null), v = E((j) => {
    y(j), m("steps");
  }, []), [w, b] = S(null), [k, C] = S(null), [T, $] = S(!1), R = l?.status === "failed" ? l.error?.nodeId : void 0, D = E((j) => {
    if (!l) return;
    const ce = Object.entries(l.steps).filter(([we, _e]) => we !== j && _e.status === "completed").map(([we]) => we);
    b({ nodeId: j, skippedNodes: ce, snapshotInput: !1 }), C(null);
  }, [l]), A = E(async () => {
    if (!(!w || !l)) {
      C(null), $(!0);
      try {
        const j = await ko(
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
  }, [w, l, t, r]), [B, W] = S(null), [ie, Y] = S(null), [te, O] = S(null), P = E(async (j) => {
    if (l) {
      Y(null), W(j);
      try {
        const ce = await xa(t, l.id, j);
        O(
          `Resumed from ${j.slice(0, 10)}${j.length > 10 ? "…" : ""} (replay #${ce.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (ce) {
        Y(ce instanceof Error ? ce.message : String(ce));
      } finally {
        W(null);
      }
    }
  }, [l, t, r]), H = E(async () => {
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
  }, [l, i, t, r]), G = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, L = () => {
    if (h(!1), !l) return;
    const j = JSON.stringify(l, null, 2);
    Et(`run-${n}.json`, j);
  }, V = () => {
    if (h(!1), !s) return;
    const j = Wn(
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
              mt,
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
              Oe,
              {
                onClick: () => r(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const J = er(l.status), X = l.triggeredBy.userId ?? l.triggeredBy.triggerType, pe = jt(p);
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
              onClick: () => D(R),
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
                onClick: () => h((j) => !j),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: G, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: L, children: "Export run JSON" }),
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
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: w.skippedNodes.map((j) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: j.slice(0, 10) }, j)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: w.snapshotInput,
                    onChange: (j) => b((ce) => ce && { ...ce, snapshotInput: j.target.checked }),
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
                    ht(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((j, ce) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: j.fromNodeId.slice(0, 12) }),
                      " at ",
                      ht(j.at)
                    ] }, `${j.fromNodeId}-${j.at}-${ce}`))
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
                const ce = x === j.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": ce,
                    onClick: () => m(j.id),
                    "data-testid": `run-replay-tab-${j.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      ce ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
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
              Uu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: D,
                onResumeFromStep: l.status === "failed" ? P : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            em,
            {
              pipelineId: t,
              runId: n,
              onStepClick: v
            }
          ) })
        ] }) })
      ]
    }
  );
}
function nm(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Se(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function rm(t) {
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
function om(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function am(t, n) {
  if (!t) return !1;
  const r = t.nodes.find((a) => a.id === n);
  return !!r && r.data.type === "condition";
}
function ro(t) {
  if (!t) return;
  const n = t.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function im(t, n) {
  const r = (h) => h.split(/(\s+)/).filter((g) => g.length > 0), a = r(t), i = r(n), s = a.length, d = i.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
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
function sm(t, n, r) {
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
    const g = am(r, s), x = g ? ro(d) : void 0, m = g ? ro(c) : void 0, N = g && x !== void 0 && m !== void 0 && x !== m;
    return {
      nodeId: s,
      name: om(r, s),
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
function lm(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function oo({
  step: t,
  branch: n,
  isCondition: r
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = rm(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(se, { tone: a, children: t.status }),
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
function cm({ a: t, b: n }) {
  const r = q(() => im(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function dm({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, a = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, i = lm(t);
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(oo, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(oo, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: nm(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          cm,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function pm({ runA: t, runB: n, def: r }) {
  const a = q(() => sm(t, n, r), [t, n, r]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(dm, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function um(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Se(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function mm(t) {
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
function hm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function ao(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return jt(vt(r).total);
}
function io({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: a
}) {
  const i = mm(n.status);
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
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: ht(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(se, { tone: i, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: Se(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: r })
        ] })
      ]
    }
  );
}
function jh() {
  const { pipelineId: t, runIdA: n, runIdB: r } = gt(), a = Be(), i = q(
    () => t ? ot(t) : null,
    [t]
  ), s = q(
    () => t && n ? nn(t, n) : null,
    [t, n]
  ), d = q(
    () => t && r ? nn(t, r) : null,
    [t, r]
  ), c = q(() => hm(i), [i]);
  if (!t || !n || !r)
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
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = ao(s, c), u = ao(d, c), f = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(io, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(io, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: um(l) }),
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
    /* @__PURE__ */ e(pm, { runA: s, runB: d, def: i })
  ] });
}
function fm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
}
function so(t) {
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
function gm({
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
              /* @__PURE__ */ e(se, { tone: so(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ht(t.startedAt) }),
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
              /* @__PURE__ */ e(se, { tone: so(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ht(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Se(n.durationMs),
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
              children: fm(d)
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
function xm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
}
function lo(t) {
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
function bm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function ym(t, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, N = x != null && m != null ? m - x : void 0;
    return {
      nodeId: s,
      name: bm(r, s),
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
function vm({ runA: t, runB: n, def: r }) {
  const a = q(() => ym(t, n, r), [t, n, r]);
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
            /* @__PURE__ */ e(se, { tone: lo(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Se(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(se, { tone: lo(i.b.status), children: i.b.status }),
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
                children: xm(i.durationDelta)
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
function Nm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function on(t, n = "", r = 0) {
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
        for (const [c, l] of on(t[s], d, r + 1))
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
      for (const [l, p] of on(d, c, r + 1))
        a.set(l, p);
    }
  return a;
}
function Ho(t, n) {
  const r = on(t), a = on(n), i = /* @__PURE__ */ new Set([...r.keys(), ...a.keys()]), s = [];
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
const wm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function km({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: a
}) {
  const [i, s] = S(!1), d = q(() => Ho(r, a), [r, a]), c = d.filter((l) => l.type !== "unchanged").length;
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
              wm[l.type]
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
function Cm({ runA: t, runB: n, def: r }) {
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
    km,
    {
      nodeId: i,
      name: Nm(r, i),
      outputA: t.steps[i]?.output,
      outputB: n.steps[i]?.output
    },
    i
  )) });
}
function Im(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function co(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return jt(vt(r).total);
}
function Zt({
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
              r && /* @__PURE__ */ e(se, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const Sm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function $m({
  runA: t,
  runB: n
}) {
  const r = q(
    () => Ho(t.context, n.context),
    [t.context, n.context]
  ), a = r.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Zt,
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
            Sm[i.type]
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
function Tm({ pipelineId: t, runIdA: n, runIdB: r }) {
  const a = Be(), i = q(
    () => ot(t),
    [t]
  ), s = q(
    () => nn(t, n),
    [t, n]
  ), d = q(
    () => nn(t, r),
    [t, r]
  ), c = q(() => Im(i), [i]);
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
  const l = co(s, c), p = co(d, c);
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
        /* @__PURE__ */ e(Zt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          gm,
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
            children: /* @__PURE__ */ e(vm, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Zt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(Cm, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e($m, { runA: s, runB: d })
      ]
    }
  );
}
function zh() {
  const { pipelineId: t } = gt(), [n] = an(), r = n.get("a"), a = n.get("b");
  return !t || !r || !a ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Tm, { pipelineId: t, runIdA: r, runIdB: a });
}
function qh() {
  const t = Be(), [n, r] = an(), [a, i] = S([]), { runs: s } = bt();
  ne(() => {
    let v = !1;
    return (async () => {
      const w = ar(), b = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await vo(k.id, { limit: 50 });
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
    const v = new Map(ar().map((k) => [k.id, k.name])), w = new Set(a.map((k) => k.id)), b = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && b.push({
        ...C,
        pipelineName: v.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = q(
    () => Wo(n),
    [n]
  ), f = (v, w) => {
    const b = new URLSearchParams(n);
    w ? b.set(v, w) : b.delete(v), r(b, { replace: !0 });
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
    () => Vo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
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
      Jo,
      {
        query: c,
        onQueryChange: m,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: g,
        range: u,
        onRangeChange: x,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
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
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(se, { tone: er(v.status).tone, size: "sm", children: v.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: v.triggerType ?? v.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: vp(v.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v.completedAt ? Se(new Date(v.completedAt).getTime() - new Date(v.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y[v.id] ?? "—" })
          ]
        },
        v.id
      )) })
    ] }) })
  ] });
}
function Go(t) {
  let n = 0, r = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (n += a.llm.tokensIn ?? 0, r += a.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Am(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Rm(t, n) {
  const r = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && r.push({
      model: n.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return vt(r).total.totalCostUsd;
}
function po(t, n) {
  if (t.length === 0) return 0;
  const r = Math.min(t.length - 1, Math.floor(t.length * n));
  return t[r];
}
function uo(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function mo(t) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Pm(t) {
  return t.slice(0, 8);
}
function Mm(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Dm(t, n) {
  const r = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const N = Go(m);
    if (c += N.tokensIn, l += N.tokensOut, p += Rm(m, n), m.error?.message) {
      const y = m.error.message.slice(0, 48), v = u.get(y);
      v ? (v.count += 1, m.startedAt > v.lastSeenAt && (v.lastSeenAt = m.startedAt, v.exampleRunId = m.id)) : u.set(y, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, N) => m - N);
  const f = po(d, 0.5), h = po(d, 0.95), g = r === 0 ? 0 : Math.round(a / r * 100), x = [...u.entries()].map(([m, N]) => ({ key: m, count: N.count, lastSeenAt: N.lastSeenAt, exampleRunId: N.exampleRunId })).sort((m, N) => N.count - m.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: a,
    failedCount: i,
    cancelledCount: s,
    successRatePct: g,
    medianMs: f,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: x
  };
}
function Em(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function Om(t) {
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
function _m(t, n) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function Lm(t) {
  const n = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), r = [], a = [];
  for (const i of n) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Go(i);
    r.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function Vh() {
  const { pipelineId: t } = gt(), n = Be(), [r, a] = S(null), [i, s] = S([]), [d, c] = S("50");
  ne(() => {
    t && (a(ot(t)), s(tn(t)));
  }, [t]);
  const l = q(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = q(() => Am(r), [r]), u = q(() => Dm(l, p), [l, p]), f = q(
    () => vu(l, r).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, r]
  ), h = q(() => ku(i, r, 30), [i, r]), g = q(
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
  if (!r)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      ze,
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
                  style: { color: Em(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: uo(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                uo(u.costPerRun),
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
                Da,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: mo
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
                  yFormat: mo
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
              series: Om(l),
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
              series: _m(l, u.medianMs),
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
              series: Lm(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: Mm(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Pm(m.exampleRunId),
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
function Bm(t) {
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
function Um(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function Fm({ approver: t, idx: n }) {
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
function jm(t, n) {
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
function zm({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [a, i] = S(""), s = E(
    (p) => {
      n(p, a.trim()), i("");
    },
    [a, n]
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
            Um(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Bm(t.requestedAt) })
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(Fm, { approver: p, idx: u }, u)),
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
function Wh() {
  const t = Be(), { approvals: n, isLoading: r, error: a, retry: i } = ba(), { resolveApproval: s, runs: d } = bt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  ne(() => {
    if (c.size === 0) return;
    const m = new Set(n.map((v) => `${v.runId}::${v.stepId}`));
    let N = !1;
    const y = new Set(c);
    for (const v of c)
      m.has(v) || (y.delete(v), N = !0);
    N && l(y);
  }, [n, c]);
  const [p, u] = S({}), f = le(/* @__PURE__ */ new Set());
  ne(() => {
    for (const m of n)
      f.current.has(m.runId) || (f.current.add(m.runId), ya(m.pipelineId, m.runId).then((N) => {
        N && u((y) => ({
          ...y,
          [m.runId]: { context: N.context, steps: N.steps }
        }));
      }));
  }, [n]);
  const h = q(() => {
    const m = /* @__PURE__ */ new Map(), N = [];
    for (const y of n) {
      const v = `${y.runId}::${y.stepId}`;
      if (c.has(v)) continue;
      let w = m.get(y.pipelineId);
      w === void 0 && (w = ot(y.pipelineId), m.set(y.pipelineId, w));
      const b = w?.name ?? (y.pipelineId ? `Pipeline ${y.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[y.runId]?.context ?? d[y.runId]?.context, C = p[y.runId]?.steps;
      N.push({ ...y, pipelineName: b, runContext: k, runSteps: C });
    }
    return N;
  }, [n, c, d, p]), g = E(
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
      r && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
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
        zm,
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
function Jh({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
        Bt,
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
const qm = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], Vm = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function ho({
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
function Hh({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
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
        ho,
        {
          samples: qm,
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
        Bt,
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
          ho,
          {
            samples: Vm,
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
function Gh({
  status: t,
  result: n,
  runId: r,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, f = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(se, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(se, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-red-700", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    f.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: f.map((x) => /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", children: [
      "#",
      x
    ] }, x)) }) : null
  ] }), g = I(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    t === "running" ? "border-indigo-300 ring-1 ring-indigo-200" : t === "failed" ? "border-red-300" : "border-border"
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
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
          c
        ),
        children: h
      }
    );
  }
  return /* @__PURE__ */ e("article", { className: I(g, c), children: h });
}
function Kh(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = le(/* @__PURE__ */ new Map()), d = le(!0);
  return ne(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Ee("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = typeof u.at == "number" ? u.at : Date.now(), m = (N) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...N }, w;
        }
        const y = [N, ...h];
        y.length > n && (y.length = n);
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
function Wm(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function Jm({ result: t, className: n }) {
  const r = Wm(t.overallVerdict), a = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
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
            Gn,
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
function Hm({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) r.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(Gm, { score: a, def: r.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function Gm({
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
      /* @__PURE__ */ e(se, { tone: r, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      Gn,
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
const Ko = ea(null);
function Yh({ value: t, children: n }) {
  return /* @__PURE__ */ e(Ko.Provider, { value: t, children: n });
}
function Yo() {
  return xo(Ko);
}
function Xh({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = Yo(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [g, x] = S(null), m = le(!0);
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
    n ? /* @__PURE__ */ e(Jm, { result: t }) : null,
    r ? /* @__PURE__ */ e(Hm, { result: t }) : null,
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
    i && y ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
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
      c ? /* @__PURE__ */ e(
        Km,
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
function Km({
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
function Qh({ aggregate: t, className: n }) {
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
          /* @__PURE__ */ o(se, { tone: i, size: "sm", children: [
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
            Gn,
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
function Zh({
  aggregates: t,
  sortOrder: n = "desc",
  caption: r,
  loading: a = !1,
  className: i
}) {
  const s = q(() => {
    const f = t.slice();
    return f.sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)), n === "desc" && f.reverse(), f;
  }, [t, n]), d = q(() => t.slice().sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
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
        Ra,
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
      /* @__PURE__ */ e("tbody", { children: s.map((f) => /* @__PURE__ */ e(Ym, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function Ym({ row: t }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, r = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(se, { tone: a, size: "sm", children: [
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
function Xm(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function ef(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = le(/* @__PURE__ */ new Map()), d = le(!0);
  return ne(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Ee("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = Xm(u.at), m = (N) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...N }, w;
        }
        const y = [N, ...h];
        y.length > n && (y.length = n);
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
function tf(t) {
  const n = Yo(), [r, a] = S([]), [i, s] = S(!1), [d, c] = S(null), l = le(!0), p = le(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: g, limit: x, refreshIntervalMs: m = 0, paused: N = !1 } = t, y = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${g ?? ""}|${x ?? ""}|${N ? "1" : "0"}`;
  return ne(() => (l.current = !0, () => {
    l.current = !1;
  }), []), ne(() => {
    if (!n) {
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
        const b = await n.fetchAggregates({
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
  }, [n, y, m]), {
    aggregates: r,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const Qm = 100, Zm = 500, Xo = 148, Qo = 116, eh = 56, th = 20;
function nh(t) {
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
    const u = l * (Xo + eh);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (Qo + th)
      });
    });
  }
  return c;
}
function rh(t, n) {
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
function oh({ src: t, alt: n, testId: r }) {
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
function ah({ data: t }) {
  const { entry: n, highlighted: r, selected: a, onSelect: i, getImageUrl: s } = t, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(K, { children: [
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
            oh,
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
const ih = { lineageNode: ah };
function sh() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function lh(t, n) {
  if (t.length <= n) return t;
  const r = t.map((a, i) => ({ e: a, i }));
  return r.sort((a, i) => {
    const s = Date.parse(a.e.at), d = Date.parse(i.e.at);
    return d !== s ? d - s : i.i - a.i;
  }), r.slice(0, n).map((a) => a.e);
}
function Dn(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function ch({
  navEntries: t,
  imageId: n,
  onClose: r,
  onNavigate: a,
  getImageUrl: i
}) {
  const s = t.find((u) => u.imageId === n), [d, c] = S(!1);
  ne(() => {
    c(!1);
  }, [n]), ne(() => {
    const u = (f) => {
      if (f.key !== "ArrowRight" && f.key !== "ArrowLeft" || t.length === 0) return;
      const h = t.findIndex((m) => m.imageId === n);
      if (h === -1) return;
      const g = t.length, x = f.key === "ArrowRight" ? (h + 1) % g : (h - 1 + g) % g;
      f.preventDefault(), a(t[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, t, a]);
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
    He,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${Dn(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ e(
        Oe,
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
function nf({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: a = Qm
}) {
  const i = Re(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), f = t.length, h = !s && f > a, g = q(
    () => h ? lh(t, a) : t,
    [t, h, a]
  ), x = q(
    () => n ? rh(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), m = q(() => nh(g), [g]), N = E(
    (Y) => {
      r?.(Y), u(Y);
    },
    [r]
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
          selected: Y.imageId === n,
          onSelect: N,
          getImageUrl: i
        },
        style: { width: Xo, height: Qo }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, n, x, N, i]
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
  ), [b, , k] = Co(y), [C, , T] = Io(w), $ = E(
    (Y, te) => {
      N(te.id);
    },
    [N]
  ), R = E(() => {
    f > Zm ? l(!0) : d(!0);
  }, [f]), D = E(() => {
    d(!0), l(!1);
  }, []), A = E(() => {
    l(!1);
  }, []), B = q(() => {
    const Y = g.slice();
    return Y.sort((te, O) => {
      const P = Date.parse(te.at), H = Date.parse(O.at);
      return P !== H ? P - H : te.imageId.localeCompare(O.imageId);
    }), Y;
  }, [g]), W = E(() => u(null), []), ie = E(
    (Y) => u(Y),
    []
  );
  return f === 0 ? /* @__PURE__ */ e(sh, {}) : /* @__PURE__ */ o(
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
            So,
            {
              nodes: b,
              edges: C,
              onNodesChange: k,
              onEdgesChange: T,
              onNodeClick: $,
              nodeTypes: ih,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e($o, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(To, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          rn,
          {
            open: c,
            onConfirm: D,
            onCancel: A,
            title: "Show all artifacts?",
            body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ e(
          ch,
          {
            navEntries: B,
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
const Ft = /* @__PURE__ */ new Map(), dh = 6e4;
function fo(t) {
  const n = Ft.get(t);
  return n ? Date.now() - n.fetchedAt > dh ? (Ft.delete(t), null) : n.entries : null;
}
function ph(t, n) {
  Ft.set(t, { entries: n, fetchedAt: Date.now() });
}
function rf() {
  Ft.clear();
}
function of(t, n) {
  const [r, a] = S(() => t ? fo(t) ?? [] : []), [i, s] = S(!1), [d, c] = S(null), l = le(0), p = E(() => {
    if (!t || !n) return;
    const f = fo(t);
    if (f) {
      a(f), s(!1), c(null);
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
        const y = `image-lineage: ${x.status} ${x.statusText}`;
        c(y), s(!1);
        return;
      }
      const m = await x.json();
      if (h !== l.current) return;
      const N = Array.isArray(m.entries) ? m.entries : [];
      ph(t, N), a(N), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [t, n]), u = E(() => {
    t && Ft.delete(t), p();
  }, [t, p]);
  return ne(() => {
    p();
  }, [p]), { entries: r, loading: i, error: d, refetch: u };
}
export {
  ni as ActionNode,
  od as AdjustBwConfig,
  Pi as AdjustBwNode,
  bd as AdjustLayerConfig,
  Di as AdjustLayerNode,
  gi as AgUiOutputNode,
  ci as AgentNode,
  Qh as AggregateSummaryCard,
  qh as AllRunsPage,
  es as AnimatedEdge,
  li as ApprovalNode,
  xe as BaseNode,
  op as CaptionPanel,
  ei as ConditionNode,
  Hm as CriteriaPanel,
  td as CropConfig,
  Ri as CropNode,
  np as EditPromptConfig,
  Yi as EditPromptNode,
  pp as EditRecommendationsPanel,
  df as EventStreamProvider,
  ri as ForkNode,
  Bc as FormatConvertConfig,
  Si as FormatConvertNode,
  Hd as GenerateConfig,
  Wi as GenerateNode,
  ui as GraphQueryNode,
  hi as GuardrailNode,
  nf as ImageLineageGraph,
  Jh as ImageSourceConfig,
  bi as ImageSourceNode,
  ip as ImageWithBBoxOverlay,
  ii as JoinNode,
  Yh as JudgmentApiProvider,
  Xh as JudgmentResultViewer,
  Zh as JudgmentTrendChart,
  pi as KnowledgeBaseNode,
  Ya as LLMNode,
  di as McpToolNode,
  mi as MemoryNode,
  Va as NODE_CATEGORIES,
  xs as NodePalette,
  ln as NodeThumbStrip,
  cp as ObjectsPanel,
  ds as PALETTE_ITEMS,
  Wa as PORT_CLS,
  Wh as PendingApprovalsPage,
  lp as PeoplePanel,
  Ms as PipelineCanvas,
  oa as PipelineEditorContext,
  Lh as PipelineEditorPage,
  No as PipelineEditorProvider,
  lf as PipelineEditorServicesProvider,
  jh as PipelineRunComparePage,
  zh as PipelineRunDiff,
  Fh as PipelineRunReplayPage,
  Uh as PipelineRunsPage,
  fa as PipelineRunsProvider,
  Vh as PipelineStatsPage,
  Bh as PipelinesPage,
  fi as PolicyNode,
  Sc as ResizeConfig,
  wi as ResizeNode,
  Hh as SaveConfig,
  yi as SaveNode,
  wc as ScatterConfig,
  Ni as ScatterNode,
  jc as SharpenConfig,
  $i as SharpenNode,
  dp as TagsPanel,
  Dc as TransformGeoConfig,
  Ci as TransformGeoNode,
  Qa as TransformNode,
  Ha as TriggerNode,
  Qd as VariationConfig,
  Hi as VariationNode,
  Jm as VerdictPanel,
  Rd as VisionClassifyConfig,
  Ui as VisionClassifyNode,
  Id as VisionConfig,
  Od as VisionDescribeConfig,
  Fi as VisionDescribeNode,
  Wd as VisionExtractTextConfig,
  zi as VisionExtractTextNode,
  Bi as VisionNode,
  up as VisionResultViewer,
  Gh as VisionRunCard,
  Fd as VisionTagConfig,
  ji as VisionTagNode,
  Wc as WatermarkConfig,
  Ti as WatermarkNode,
  fe as categoryFor,
  rf as clearImageLineageCache,
  sp as imageOverlayPropsFrom,
  Xi as nodeTypes,
  z as portCls,
  _h as recordRecentType,
  Ee as useEventStream,
  Pa as useEventStreamContext,
  of as useImageLineage,
  Re as useImageUrl,
  tf as useJudgmentAggregates,
  Yo as useJudgmentApi,
  ef as useJudgmentResults,
  he as useLatestStepForNode,
  Ue as usePipelineEditor,
  bo as usePipelineEditorServices,
  bt as usePipelineRuns,
  Ae as useRetryFromStep,
  Kh as useVisionResults
};
