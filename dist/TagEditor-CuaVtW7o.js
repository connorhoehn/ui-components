import { jsx as a, jsxs as x } from "react/jsx-runtime";
import { createContext as A, useContext as K, useRef as E, useState as N, useMemo as _, useEffect as L } from "react";
import { c as I } from "./cn-B6yFEsav.js";
const z = A(null);
function Q({
  value: e,
  children: o
}) {
  return /* @__PURE__ */ a(z.Provider, { value: e, children: o });
}
function V() {
  const e = K(z);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const j = {
  ghost: "bg-transparent text-[#374151] hover:bg-[#f3f4f6]",
  primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
  danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]"
}, B = {
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg"
};
function ee({
  "aria-label": e,
  icon: o,
  children: u,
  disabled: i = !1,
  variant: l = "ghost",
  size: f = "md",
  className: m,
  ...p
}) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      "aria-label": e,
      disabled: i,
      className: I(
        "inline-flex items-center justify-center border-none rounded-md",
        "transition-colors duration-150 ease-in-out",
        j[l],
        B[f],
        i && "opacity-50 cursor-not-allowed",
        !i && "cursor-pointer",
        m
      ),
      ...p,
      children: o ?? u
    }
  );
}
const k = "'SF Mono', Menlo, monospace", S = 12, D = 1.5, G = S * D, P = 8, q = 10, O = 36;
function te({
  value: e,
  onChange: o,
  language: u = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: i,
  minLines: l = 4,
  maxLines: f = 20,
  readOnly: m = !1,
  variables: p,
  "aria-label": y
}) {
  const c = E(null), [g, v] = N(!1), w = _(() => Math.max(1, e.split(`
`).length), [e]), C = _(() => {
    const n = Math.max(w, l), h = [];
    for (let d = 1; d <= n; d++) h.push(String(d));
    return h.join(`
`);
  }, [w, l]), t = Math.min(Math.max(w, l), f) * G + P * 2, s = w > f, b = (n) => {
    const h = c.current, d = e ?? "";
    if (!h) {
      o(d + n);
      return;
    }
    const T = h.selectionStart ?? d.length, H = h.selectionEnd ?? d.length, R = d.slice(0, T) + n + d.slice(H);
    o(R), queueMicrotask(() => {
      if (c.current) {
        const F = T + n.length;
        c.current.focus(), c.current.setSelectionRange(F, F);
      }
    });
  }, M = (n) => {
    m || n.key === "Tab" && (n.preventDefault(), b("  "));
  }, $ = (n) => {
    o(n.target.value);
  };
  return L(() => {
    const n = c.current;
    if (!n || !s) return;
    const h = n.parentElement?.querySelector("[data-gutter]");
    if (!h) return;
    const d = () => {
      h.scrollTop = n.scrollTop;
    };
    return n.addEventListener("scroll", d), () => n.removeEventListener("scroll", d);
  }, [s]), /* @__PURE__ */ x("div", { children: [
    p && p.length > 0 && /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1 mb-1", children: p.map((n) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => b(`{{ ${n} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: k },
        title: `Insert {{ ${n} }}`,
        disabled: m,
        children: n
      },
      n
    )) }),
    /* @__PURE__ */ x(
      "div",
      {
        className: I(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          g && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: k, fontSize: S, lineHeight: D, height: t },
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: O, padding: `${P}px 6px`, fontFamily: k, lineHeight: D },
              children: C
            }
          ),
          /* @__PURE__ */ a(
            "textarea",
            {
              ref: c,
              value: e,
              onChange: $,
              onKeyDown: M,
              onFocus: () => v(!0),
              onBlur: () => v(!1),
              placeholder: i,
              readOnly: m,
              "aria-label": y,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${P}px ${q}px`,
                fontFamily: k,
                fontSize: S,
                lineHeight: D,
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
function X({
  emoji: e,
  active: o,
  onPick: u
}) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      onClick: () => u(e),
      className: I(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        o ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": o,
      children: e
    }
  );
}
function re({
  value: e,
  onChange: o,
  curated: u
}) {
  const [i, l] = N(!1), [f, m] = N(!1), [p, y] = N(""), c = E(null), g = E(null), v = u ?? U;
  L(() => {
    if (!i) return;
    const r = (t) => {
      const s = t.target;
      c.current && c.current.contains(s) || g.current && g.current.contains(s) || l(!1);
    };
    return window.addEventListener("mousedown", r), () => window.removeEventListener("mousedown", r);
  }, [i]);
  const w = (r) => {
    o(r), l(!1);
  }, C = () => {
    const r = p.trim();
    r.length !== 0 && (o(r), y(""), l(!1));
  };
  return /* @__PURE__ */ x("div", { className: "relative inline-block", ref: c, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => l((r) => !r),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": i,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ a("span", { "aria-hidden": !0, children: e })
      }
    ),
    i ? /* @__PURE__ */ x("div", { ref: g, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ a("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: v.map((r, t) => /* @__PURE__ */ a(
        X,
        {
          emoji: r,
          active: r === e,
          onPick: w
        },
        `${r}-${t}`
      )) }),
      /* @__PURE__ */ x("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "text",
            value: p,
            onChange: (r) => y(r.target.value),
            onKeyDown: (r) => {
              r.key === "Enter" ? (r.preventDefault(), C()) : r.key === "Escape" && l(!1);
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
            onClick: C,
            disabled: p.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
function Y(e, o) {
  const u = e.trim();
  return o ? u.toLowerCase() : u;
}
function ne({
  value: e,
  onChange: o,
  placeholder: u = "add tag...",
  suggestions: i,
  lowercase: l = !0
}) {
  const [f, m] = N(""), [p, y] = N(!1), c = E(null), g = (t) => {
    const s = Y(t, l);
    if (s) {
      if (e.includes(s)) {
        m("");
        return;
      }
      o([...e, s]), m("");
    }
  }, v = (t) => {
    o(e.filter((s) => s !== t));
  }, w = (t) => {
    if (t.key === "Enter") {
      t.preventDefault(), g(f);
      return;
    }
    t.key === "Backspace" && f === "" && e.length > 0 && (t.preventDefault(), v(e[e.length - 1]));
  }, C = _(() => {
    if (!i || i.length === 0) return [];
    const t = f.trim().toLowerCase(), s = new Set(e.map((b) => b.toLowerCase()));
    return i.map((b) => b.trim().toLowerCase()).filter((b) => b.length > 0 && !s.has(b)).filter((b) => t ? b.includes(t) : !0).slice(0, 12);
  }, [i, e, f]), r = p && C.length > 0;
  return /* @__PURE__ */ x("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((t) => /* @__PURE__ */ x(
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
    /* @__PURE__ */ x("div", { className: "relative", children: [
      /* @__PURE__ */ a(
        "input",
        {
          ref: c,
          "data-testid": "tag-editor-input",
          type: "text",
          value: f,
          onChange: (t) => m(t.target.value),
          onKeyDown: w,
          onFocus: () => y(!0),
          onBlur: () => {
            setTimeout(() => y(!1), 120);
          },
          placeholder: u,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      r ? /* @__PURE__ */ a(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: C.map((t) => /* @__PURE__ */ x(
            "button",
            {
              type: "button",
              onMouseDown: (s) => {
                s.preventDefault();
              },
              onClick: () => g(t),
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
  U as D,
  ee as I,
  Q as P,
  ne as T,
  re as a,
  V as u
};
