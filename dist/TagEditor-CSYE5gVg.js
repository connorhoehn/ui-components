import { jsx as a, jsxs as g } from "react/jsx-runtime";
import { createContext as G, useContext as K, useRef as D, useState as C, useMemo as _, useEffect as $ } from "react";
import { c as k } from "./cn-B6yFEsav.js";
const M = G(null);
function Q({
  value: e,
  children: o
}) {
  return /* @__PURE__ */ a(M.Provider, { value: e, children: o });
}
function ee() {
  const e = K(M);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const S = "'SF Mono', Menlo, monospace", T = 12, E = 1.5, B = T * E, P = 8, j = 10, q = 36;
function te({
  value: e,
  onChange: o,
  language: f = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: l,
  minLines: c = 4,
  maxLines: p = 20,
  readOnly: x = !1,
  variables: m,
  "aria-label": d
}) {
  const i = D(null), [b, v] = C(!1), y = _(() => Math.max(1, e.split(`
`).length), [e]), N = _(() => {
    const r = Math.max(y, c), w = [];
    for (let u = 1; u <= r; u++) w.push(String(u));
    return w.join(`
`);
  }, [y, c]), t = Math.min(Math.max(y, c), p) * B + P * 2, s = y > p, h = (r) => {
    const w = i.current, u = e ?? "";
    if (!w) {
      o(u + r);
      return;
    }
    const F = w.selectionStart ?? u.length, R = w.selectionEnd ?? u.length, A = u.slice(0, F) + r + u.slice(R);
    o(A), queueMicrotask(() => {
      if (i.current) {
        const I = F + r.length;
        i.current.focus(), i.current.setSelectionRange(I, I);
      }
    });
  }, z = (r) => {
    x || r.key === "Tab" && (r.preventDefault(), h("  "));
  }, H = (r) => {
    o(r.target.value);
  };
  return $(() => {
    const r = i.current;
    if (!r || !s) return;
    const w = r.parentElement?.querySelector("[data-gutter]");
    if (!w) return;
    const u = () => {
      w.scrollTop = r.scrollTop;
    };
    return r.addEventListener("scroll", u), () => r.removeEventListener("scroll", u);
  }, [s]), /* @__PURE__ */ g("div", { children: [
    m && m.length > 0 && /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1 mb-1", children: m.map((r) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => h(`{{ ${r} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: S },
        title: `Insert {{ ${r} }}`,
        disabled: x,
        children: r
      },
      r
    )) }),
    /* @__PURE__ */ g(
      "div",
      {
        className: k(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          b && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: S, fontSize: T, lineHeight: E, height: t },
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: q, padding: `${P}px 6px`, fontFamily: S, lineHeight: E },
              children: N
            }
          ),
          /* @__PURE__ */ a(
            "textarea",
            {
              ref: i,
              value: e,
              onChange: H,
              onKeyDown: z,
              onFocus: () => v(!0),
              onBlur: () => v(!1),
              placeholder: l,
              readOnly: x,
              "aria-label": d,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${P}px ${j}px`,
                fontFamily: S,
                fontSize: T,
                lineHeight: E,
                tabSize: 2,
                height: t,
                overflow: s ? "auto" : "hidden"
              }
            }
          )
        ]
      }
    )
  ] });
}
const O = [
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
function U({
  emoji: e,
  active: o,
  onPick: f
}) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      onClick: () => f(e),
      className: k(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        o ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": o,
      children: e
    }
  );
}
function ne({
  value: e,
  onChange: o,
  curated: f
}) {
  const [l, c] = C(!1), [p, x] = C(!1), [m, d] = C(""), i = D(null), b = D(null), v = f ?? O;
  $(() => {
    if (!l) return;
    const n = (t) => {
      const s = t.target;
      i.current && i.current.contains(s) || b.current && b.current.contains(s) || c(!1);
    };
    return window.addEventListener("mousedown", n), () => window.removeEventListener("mousedown", n);
  }, [l]);
  const y = (n) => {
    o(n), c(!1);
  }, N = () => {
    const n = m.trim();
    n.length !== 0 && (o(n), d(""), c(!1));
  };
  return /* @__PURE__ */ g("div", { className: "relative inline-block", ref: i, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => c((n) => !n),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": l,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ a("span", { "aria-hidden": !0, children: e })
      }
    ),
    l ? /* @__PURE__ */ g("div", { ref: b, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ a("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: v.map((n, t) => /* @__PURE__ */ a(
        U,
        {
          emoji: n,
          active: n === e,
          onPick: y
        },
        `${n}-${t}`
      )) }),
      /* @__PURE__ */ g("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "text",
            value: m,
            onChange: (n) => d(n.target.value),
            onKeyDown: (n) => {
              n.key === "Enter" ? (n.preventDefault(), N()) : n.key === "Escape" && c(!1);
            },
            placeholder: "Paste any emoji…",
            className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "data-testid": "icon-picker-custom-input",
            "aria-label": "Custom emoji"
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: N,
            disabled: m.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
const X = {
  success: "bg-state-completed",
  warning: "bg-state-awaiting",
  danger: "bg-state-failed",
  info: "bg-state-running",
  neutral: "bg-state-idle"
}, Y = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3"
};
function re({
  value: e,
  threshold: o = 0.5,
  tone: f,
  size: l = "md",
  showLabel: c = !0,
  formatLabel: p,
  ariaLabel: x,
  className: m
}) {
  const d = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, i = f ?? (d >= o ? "success" : "danger"), b = (p ?? L)(d);
  return /* @__PURE__ */ g(
    "div",
    {
      role: "meter",
      "aria-valuenow": d,
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-label": x ?? `Score ${b} (threshold ${L(o)})`,
      className: k("flex w-full items-center gap-2", m),
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: k(
              "relative flex-1 overflow-hidden rounded-full bg-surface-panel",
              Y[l]
            ),
            children: /* @__PURE__ */ a(
              "div",
              {
                className: k("absolute inset-y-0 left-0 rounded-full transition-[width]", X[i]),
                style: { width: `${d * 100}%` }
              }
            )
          }
        ),
        c ? /* @__PURE__ */ a("span", { className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary", children: b }) : null
      ]
    }
  );
}
function L(e) {
  return `${Math.round(e * 100)}%`;
}
function Z(e, o) {
  const f = e.trim();
  return o ? f.toLowerCase() : f;
}
function oe({
  value: e,
  onChange: o,
  placeholder: f = "add tag...",
  suggestions: l,
  lowercase: c = !0
}) {
  const [p, x] = C(""), [m, d] = C(!1), i = D(null), b = (t) => {
    const s = Z(t, c);
    if (s) {
      if (e.includes(s)) {
        x("");
        return;
      }
      o([...e, s]), x("");
    }
  }, v = (t) => {
    o(e.filter((s) => s !== t));
  }, y = (t) => {
    if (t.key === "Enter") {
      t.preventDefault(), b(p);
      return;
    }
    t.key === "Backspace" && p === "" && e.length > 0 && (t.preventDefault(), v(e[e.length - 1]));
  }, N = _(() => {
    if (!l || l.length === 0) return [];
    const t = p.trim().toLowerCase(), s = new Set(e.map((h) => h.toLowerCase()));
    return l.map((h) => h.trim().toLowerCase()).filter((h) => h.length > 0 && !s.has(h)).filter((h) => t ? h.includes(t) : !0).slice(0, 12);
  }, [l, e, p]), n = m && N.length > 0;
  return /* @__PURE__ */ g("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((t) => /* @__PURE__ */ g(
      "span",
      {
        className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600",
        "data-testid": `tag-chip-${t}`,
        children: [
          t,
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "aria-label": `Remove tag ${t}`,
              onClick: () => v(t),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      t
    )),
    /* @__PURE__ */ g("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "input",
        {
          ref: i,
          "data-testid": "tag-editor-input",
          type: "text",
          value: p,
          onChange: (t) => x(t.target.value),
          onKeyDown: y,
          onFocus: () => d(!0),
          onBlur: () => {
            setTimeout(() => d(!1), 120);
          },
          placeholder: f,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      n ? /* @__PURE__ */ a(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: N.map((t) => /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onMouseDown: (s) => {
                s.preventDefault();
              },
              onClick: () => b(t),
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
  te as C,
  O as D,
  ne as I,
  Q as P,
  re as S,
  oe as T,
  ee as u
};
