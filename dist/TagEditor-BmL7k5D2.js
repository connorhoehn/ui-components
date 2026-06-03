import { jsx as o, jsxs as N } from "react/jsx-runtime";
import { createContext as K, useContext as O, useRef as T, useState as S, useMemo as I, useEffect as A } from "react";
import { c as k } from "./cn-B6yFEsav.js";
const j = K(null);
function ne({
  value: e,
  children: a
}) {
  return /* @__PURE__ */ o(j.Provider, { value: e, children: a });
}
function re() {
  const e = O(j);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const M = "'SF Mono', Menlo, monospace", z = 12, P = 1.5, q = z * P, _ = 8, X = 10, Z = 36;
function oe({
  value: e,
  onChange: a,
  language: b = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: s,
  minLines: i = 4,
  maxLines: u = 20,
  readOnly: f = !1,
  variables: h,
  "aria-label": p
}) {
  const d = T(null), [x, l] = S(!1), g = I(() => Math.max(1, e.split(`
`).length), [e]), w = I(() => {
    const n = Math.max(g, i), v = [];
    for (let m = 1; m <= n; m++) v.push(String(m));
    return v.join(`
`);
  }, [g, i]), t = Math.min(Math.max(g, i), u) * q + _ * 2, c = g > u, y = (n) => {
    const v = d.current, m = e ?? "";
    if (!v) {
      a(m + n);
      return;
    }
    const E = v.selectionStart ?? m.length, L = v.selectionEnd ?? m.length, C = m.slice(0, E) + n + m.slice(L);
    a(C), queueMicrotask(() => {
      if (d.current) {
        const F = E + n.length;
        d.current.focus(), d.current.setSelectionRange(F, F);
      }
    });
  }, $ = (n) => {
    f || n.key === "Tab" && (n.preventDefault(), y("  "));
  }, D = (n) => {
    a(n.target.value);
  };
  return A(() => {
    const n = d.current;
    if (!n || !c) return;
    const v = n.parentElement?.querySelector("[data-gutter]");
    if (!v) return;
    const m = () => {
      v.scrollTop = n.scrollTop;
    };
    return n.addEventListener("scroll", m), () => n.removeEventListener("scroll", m);
  }, [c]), /* @__PURE__ */ N("div", { children: [
    h && h.length > 0 && /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1 mb-1", children: h.map((n) => /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => y(`{{ ${n} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: M },
        title: `Insert {{ ${n} }}`,
        disabled: f,
        children: n
      },
      n
    )) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: k(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          x && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: M, fontSize: z, lineHeight: P, height: t },
        children: [
          /* @__PURE__ */ o(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: Z, padding: `${_}px 6px`, fontFamily: M, lineHeight: P },
              children: w
            }
          ),
          /* @__PURE__ */ o(
            "textarea",
            {
              ref: d,
              value: e,
              onChange: D,
              onKeyDown: $,
              onFocus: () => l(!0),
              onBlur: () => l(!1),
              placeholder: s,
              readOnly: f,
              "aria-label": p,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${_}px ${X}px`,
                fontFamily: M,
                fontSize: z,
                lineHeight: P,
                tabSize: 2,
                height: t,
                overflow: c ? "auto" : "hidden"
              }
            }
          )
        ]
      }
    )
  ] });
}
const U = [
  "🔀",
  "🔁",
  "🔄",
  "⚙️",
  "🛠",
  "🧰",
  "🔧",
  "⚡",
  "🧠",
  "💡",
  "📊",
  "📈",
  "📉",
  "📋",
  "📝",
  "📄",
  "✉️",
  "💬",
  "📨",
  "📤",
  "📥",
  "🔔",
  "📢",
  "📡",
  "🚀",
  "🎯",
  "🎨",
  "🧪",
  "🔬",
  "🔭",
  "🧭",
  "🗺",
  "🗂",
  "📁",
  "🗃",
  "🗄",
  "💾",
  "🔒",
  "🔑",
  "🛡",
  "🌐",
  "🔗",
  "🔀",
  "⏩",
  "⏱",
  "🔍",
  "📌",
  "🏷"
];
function Y({
  emoji: e,
  active: a,
  onPick: b
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => b(e),
      className: k(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        a ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": a,
      children: e
    }
  );
}
function ae({
  value: e,
  onChange: a,
  curated: b
}) {
  const [s, i] = S(!1), [u, f] = S(!1), [h, p] = S(""), d = T(null), x = T(null), l = b ?? U;
  A(() => {
    if (!s) return;
    const r = (t) => {
      const c = t.target;
      d.current && d.current.contains(c) || x.current && x.current.contains(c) || i(!1);
    };
    return window.addEventListener("mousedown", r), () => window.removeEventListener("mousedown", r);
  }, [s]);
  const g = (r) => {
    a(r), i(!1);
  }, w = () => {
    const r = h.trim();
    r.length !== 0 && (a(r), p(""), i(!1));
  };
  return /* @__PURE__ */ N("div", { className: "relative inline-block", ref: d, children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => i((r) => !r),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": s,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ o("span", { "aria-hidden": !0, children: e })
      }
    ),
    s ? /* @__PURE__ */ N("div", { ref: x, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: l.map((r, t) => /* @__PURE__ */ o(
        Y,
        {
          emoji: r,
          active: r === e,
          onPick: g
        },
        `${r}-${t}`
      )) }),
      /* @__PURE__ */ N("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "text",
            value: h,
            onChange: (r) => p(r.target.value),
            onKeyDown: (r) => {
              r.key === "Enter" ? (r.preventDefault(), w()) : r.key === "Escape" && i(!1);
            },
            placeholder: "Paste any emoji…",
            className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "data-testid": "icon-picker-custom-input",
            "aria-label": "Custom emoji"
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: w,
            disabled: h.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
const V = {
  success: "bg-state-completed",
  warning: "bg-state-awaiting",
  danger: "bg-state-failed",
  info: "bg-state-running",
  neutral: "bg-state-idle"
}, J = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3"
};
function ie({
  value: e,
  threshold: a = 0.5,
  tone: b,
  size: s = "md",
  showLabel: i = !0,
  formatLabel: u,
  ariaLabel: f,
  className: h
}) {
  const p = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, d = b ?? (p >= a ? "success" : "danger"), x = (u ?? H)(p);
  return /* @__PURE__ */ N(
    "div",
    {
      role: "meter",
      "aria-valuenow": p,
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-label": f ?? `Score ${x} (threshold ${H(a)})`,
      className: k("flex w-full items-center gap-2", h),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: k(
              "relative flex-1 overflow-hidden rounded-full bg-surface-panel",
              J[s]
            ),
            children: /* @__PURE__ */ o(
              "div",
              {
                className: k("absolute inset-y-0 left-0 rounded-full transition-[width]", V[d]),
                style: { width: `${p * 100}%` }
              }
            )
          }
        ),
        i ? /* @__PURE__ */ o("span", { className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary", children: x }) : null
      ]
    }
  );
}
function H(e) {
  return `${Math.round(e * 100)}%`;
}
function se({
  points: e,
  yMin: a,
  yMax: b,
  width: s = 120,
  height: i = 32,
  stroke: u = "currentColor",
  strokeWidth: f = 1.5,
  showLastPoint: h = !0,
  showFill: p = !0,
  ariaLabel: d,
  className: x
}) {
  const l = e.filter((C) => Number.isFinite(C));
  if (l.length === 0)
    return /* @__PURE__ */ o(
      "div",
      {
        role: "img",
        "aria-label": d ?? "No trend data",
        className: k(
          "inline-flex items-center justify-center text-[10px] text-text-tertiary",
          x
        ),
        style: { width: s, height: i },
        children: "—"
      }
    );
  const g = Math.min(...l), w = Math.max(...l), r = a ?? (g === w ? g - 1 : g), t = b ?? (g === w ? w + 1 : w), c = Math.max(1e-9, t - r), y = l.length === 1 ? 0 : s / (l.length - 1), $ = f, D = i - $ * 2, n = l.map((C, F) => {
    const B = l.length === 1 ? s / 2 : F * y, G = $ + D - (C - r) / c * D;
    return { x: B, y: G };
  }), v = n.map((C, F) => `${F === 0 ? "M" : "L"}${C.x.toFixed(2)},${C.y.toFixed(2)}`).join(" "), m = `${v} L${n[n.length - 1].x.toFixed(2)},${(i - $).toFixed(2)} L${n[0].x.toFixed(2)},${(i - $).toFixed(2)} Z`, E = n[n.length - 1], L = `Trend, ${l.length} points, starts ${R(l[0])}, ends ${R(l[l.length - 1])}`;
  return /* @__PURE__ */ o(
    "div",
    {
      role: "img",
      "aria-label": d ?? L,
      className: k("inline-block align-middle text-text-secondary", x),
      style: { width: s, height: i },
      children: /* @__PURE__ */ N(
        "svg",
        {
          "aria-hidden": !0,
          viewBox: `0 0 ${s} ${i}`,
          width: s,
          height: i,
          style: { display: "block" },
          children: [
            p ? /* @__PURE__ */ o("path", { d: m, fill: u, fillOpacity: 0.12, stroke: "none" }) : null,
            /* @__PURE__ */ o(
              "path",
              {
                d: v,
                fill: "none",
                stroke: u,
                strokeWidth: f,
                strokeLinejoin: "round",
                strokeLinecap: "round"
              }
            ),
            h ? /* @__PURE__ */ o("circle", { cx: E.x, cy: E.y, r: f * 1.5, fill: u }) : null
          ]
        }
      )
    }
  );
}
function R(e) {
  return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
function Q(e, a) {
  const b = e.trim();
  return a ? b.toLowerCase() : b;
}
function le({
  value: e,
  onChange: a,
  placeholder: b = "add tag...",
  suggestions: s,
  lowercase: i = !0
}) {
  const [u, f] = S(""), [h, p] = S(!1), d = T(null), x = (t) => {
    const c = Q(t, i);
    if (c) {
      if (e.includes(c)) {
        f("");
        return;
      }
      a([...e, c]), f("");
    }
  }, l = (t) => {
    a(e.filter((c) => c !== t));
  }, g = (t) => {
    if (t.key === "Enter") {
      t.preventDefault(), x(u);
      return;
    }
    t.key === "Backspace" && u === "" && e.length > 0 && (t.preventDefault(), l(e[e.length - 1]));
  }, w = I(() => {
    if (!s || s.length === 0) return [];
    const t = u.trim().toLowerCase(), c = new Set(e.map((y) => y.toLowerCase()));
    return s.map((y) => y.trim().toLowerCase()).filter((y) => y.length > 0 && !c.has(y)).filter((y) => t ? y.includes(t) : !0).slice(0, 12);
  }, [s, e, u]), r = h && w.length > 0;
  return /* @__PURE__ */ N("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((t) => /* @__PURE__ */ N(
      "span",
      {
        className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600",
        "data-testid": `tag-chip-${t}`,
        children: [
          t,
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              "aria-label": `Remove tag ${t}`,
              onClick: () => l(t),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      t
    )),
    /* @__PURE__ */ N("div", { className: "relative", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          "data-testid": "tag-editor-input",
          type: "text",
          value: u,
          onChange: (t) => f(t.target.value),
          onKeyDown: g,
          onFocus: () => p(!0),
          onBlur: () => {
            setTimeout(() => p(!1), 120);
          },
          placeholder: b,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      r ? /* @__PURE__ */ o(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: w.map((t) => /* @__PURE__ */ N(
            "button",
            {
              type: "button",
              onMouseDown: (c) => {
                c.preventDefault();
              },
              onClick: () => x(t),
              className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 cursor-pointer border border-dashed border-gray-300",
              children: [
                "+ ",
                t
              ]
            },
            t
          ))
        }
      ) : null
    ] })
  ] });
}
export {
  oe as C,
  U as D,
  ae as I,
  ne as P,
  ie as S,
  le as T,
  se as a,
  re as u
};
