import { jsx as i, jsxs as x } from "react/jsx-runtime";
import { createContext as A, useContext as K, useRef as E, useState as N, useMemo as _, useEffect as F } from "react";
import { c as L } from "./cn-B6yFEsav.js";
const M = A(null);
function Z({
  value: t,
  children: o
}) {
  return /* @__PURE__ */ i(M.Provider, { value: t, children: o });
}
function J() {
  const t = K(M);
  if (!t)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return t;
}
const k = "'SF Mono', Menlo, monospace", S = 12, D = 1.5, G = S * D, P = 8, j = 10, q = 36;
function Q({
  value: t,
  onChange: o,
  language: f = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: c,
  minLines: d = 4,
  maxLines: p = 20,
  readOnly: h = !1,
  variables: b,
  "aria-label": y
}) {
  const a = E(null), [g, v] = N(!1), w = _(() => Math.max(1, t.split(`
`).length), [t]), C = _(() => {
    const n = Math.max(w, d), m = [];
    for (let l = 1; l <= n; l++) m.push(String(l));
    return m.join(`
`);
  }, [w, d]), e = Math.min(Math.max(w, d), p) * G + P * 2, s = w > p, u = (n) => {
    const m = a.current, l = t ?? "";
    if (!m) {
      o(l + n);
      return;
    }
    const T = m.selectionStart ?? l.length, H = m.selectionEnd ?? l.length, R = l.slice(0, T) + n + l.slice(H);
    o(R), queueMicrotask(() => {
      if (a.current) {
        const I = T + n.length;
        a.current.focus(), a.current.setSelectionRange(I, I);
      }
    });
  }, $ = (n) => {
    h || n.key === "Tab" && (n.preventDefault(), u("  "));
  }, z = (n) => {
    o(n.target.value);
  };
  return F(() => {
    const n = a.current;
    if (!n || !s) return;
    const m = n.parentElement?.querySelector("[data-gutter]");
    if (!m) return;
    const l = () => {
      m.scrollTop = n.scrollTop;
    };
    return n.addEventListener("scroll", l), () => n.removeEventListener("scroll", l);
  }, [s]), /* @__PURE__ */ x("div", { children: [
    b && b.length > 0 && /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1 mb-1", children: b.map((n) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => u(`{{ ${n} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: k },
        title: `Insert {{ ${n} }}`,
        disabled: h,
        children: n
      },
      n
    )) }),
    /* @__PURE__ */ x(
      "div",
      {
        className: L(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          g && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: k, fontSize: S, lineHeight: D, height: e },
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: q, padding: `${P}px 6px`, fontFamily: k, lineHeight: D },
              children: C
            }
          ),
          /* @__PURE__ */ i(
            "textarea",
            {
              ref: a,
              value: t,
              onChange: z,
              onKeyDown: $,
              onFocus: () => v(!0),
              onBlur: () => v(!1),
              placeholder: c,
              readOnly: h,
              "aria-label": y,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${P}px ${j}px`,
                fontFamily: k,
                fontSize: S,
                lineHeight: D,
                tabSize: 2,
                height: e,
                overflow: s ? "auto" : "hidden"
              }
            }
          )
        ]
      }
    )
  ] });
}
const B = [
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
function O({
  emoji: t,
  active: o,
  onPick: f
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: () => f(t),
      className: L(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        o ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${t}`,
      "aria-pressed": o,
      children: t
    }
  );
}
function V({
  value: t,
  onChange: o,
  curated: f
}) {
  const [c, d] = N(!1), [p, h] = N(!1), [b, y] = N(""), a = E(null), g = E(null), v = f ?? B;
  F(() => {
    if (!c) return;
    const r = (e) => {
      const s = e.target;
      a.current && a.current.contains(s) || g.current && g.current.contains(s) || d(!1);
    };
    return window.addEventListener("mousedown", r), () => window.removeEventListener("mousedown", r);
  }, [c]);
  const w = (r) => {
    o(r), d(!1);
  }, C = () => {
    const r = b.trim();
    r.length !== 0 && (o(r), y(""), d(!1));
  };
  return /* @__PURE__ */ x("div", { className: "relative inline-block", ref: a, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => d((r) => !r),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": c,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ i("span", { "aria-hidden": !0, children: t })
      }
    ),
    c ? /* @__PURE__ */ x("div", { ref: g, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: v.map((r, e) => /* @__PURE__ */ i(
        O,
        {
          emoji: r,
          active: r === t,
          onPick: w
        },
        `${r}-${e}`
      )) }),
      /* @__PURE__ */ x("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "text",
            value: b,
            onChange: (r) => y(r.target.value),
            onKeyDown: (r) => {
              r.key === "Enter" ? (r.preventDefault(), C()) : r.key === "Escape" && d(!1);
            },
            placeholder: "Paste any emoji…",
            className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "data-testid": "icon-picker-custom-input",
            "aria-label": "Custom emoji"
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: C,
            disabled: b.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
function U(t, o) {
  const f = t.trim();
  return o ? f.toLowerCase() : f;
}
function ee({
  value: t,
  onChange: o,
  placeholder: f = "add tag...",
  suggestions: c,
  lowercase: d = !0
}) {
  const [p, h] = N(""), [b, y] = N(!1), a = E(null), g = (e) => {
    const s = U(e, d);
    if (s) {
      if (t.includes(s)) {
        h("");
        return;
      }
      o([...t, s]), h("");
    }
  }, v = (e) => {
    o(t.filter((s) => s !== e));
  }, w = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(), g(p);
      return;
    }
    e.key === "Backspace" && p === "" && t.length > 0 && (e.preventDefault(), v(t[t.length - 1]));
  }, C = _(() => {
    if (!c || c.length === 0) return [];
    const e = p.trim().toLowerCase(), s = new Set(t.map((u) => u.toLowerCase()));
    return c.map((u) => u.trim().toLowerCase()).filter((u) => u.length > 0 && !s.has(u)).filter((u) => e ? u.includes(e) : !0).slice(0, 12);
  }, [c, t, p]), r = b && C.length > 0;
  return /* @__PURE__ */ x("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    t.map((e) => /* @__PURE__ */ x(
      "span",
      {
        className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600",
        "data-testid": `tag-chip-${e}`,
        children: [
          e,
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-label": `Remove tag ${e}`,
              onClick: () => v(e),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      e
    )),
    /* @__PURE__ */ x("div", { className: "relative", children: [
      /* @__PURE__ */ i(
        "input",
        {
          ref: a,
          "data-testid": "tag-editor-input",
          type: "text",
          value: p,
          onChange: (e) => h(e.target.value),
          onKeyDown: w,
          onFocus: () => y(!0),
          onBlur: () => {
            setTimeout(() => y(!1), 120);
          },
          placeholder: f,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      r ? /* @__PURE__ */ i(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: C.map((e) => /* @__PURE__ */ x(
            "button",
            {
              type: "button",
              onMouseDown: (s) => {
                s.preventDefault();
              },
              onClick: () => g(e),
              className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 cursor-pointer border border-dashed border-gray-300",
              children: [
                "+ ",
                e
              ]
            },
            e
          ))
        }
      ) : null
    ] })
  ] });
}
export {
  Q as C,
  B as D,
  V as I,
  Z as P,
  ee as T,
  J as u
};
