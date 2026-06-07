import { jsx as o, jsxs as C } from "react/jsx-runtime";
import { createContext as G, useContext as K, useRef as D, useState as $, useMemo as I, useEffect as R } from "react";
import { c as S } from "./cn-B6yFEsav.js";
const j = G(null);
function se({
  value: e,
  children: a
}) {
  return /* @__PURE__ */ o(j.Provider, { value: e, children: a });
}
function ie() {
  const e = K(j);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const _ = "'SF Mono', Menlo, monospace", A = 12, T = 1.5, V = A * T, P = 8, Z = 10, q = 36;
function le({
  value: e,
  onChange: a,
  language: c = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: i,
  minLines: s = 4,
  maxLines: f = 20,
  readOnly: p = !1,
  variables: x,
  "aria-label": m
}) {
  const l = D(null), [b, d] = $(!1), g = I(() => Math.max(1, e.split(`
`).length), [e]), v = I(() => {
    const r = Math.max(g, s), w = [];
    for (let h = 1; h <= r; h++) w.push(String(h));
    return w.join(`
`);
  }, [g, s]), t = Math.min(Math.max(g, s), f) * V + P * 2, u = g > f, y = (r) => {
    const w = l.current, h = e ?? "";
    if (!w) {
      a(h + r);
      return;
    }
    const F = w.selectionStart ?? h.length, M = w.selectionEnd ?? h.length, N = h.slice(0, F) + r + h.slice(M);
    a(N), queueMicrotask(() => {
      if (l.current) {
        const k = F + r.length;
        l.current.focus(), l.current.setSelectionRange(k, k);
      }
    });
  }, E = (r) => {
    p || r.key === "Tab" && (r.preventDefault(), y("  "));
  }, L = (r) => {
    a(r.target.value);
  };
  return R(() => {
    const r = l.current;
    if (!r || !u) return;
    const w = r.parentElement?.querySelector("[data-gutter]");
    if (!w) return;
    const h = () => {
      w.scrollTop = r.scrollTop;
    };
    return r.addEventListener("scroll", h), () => r.removeEventListener("scroll", h);
  }, [u]), /* @__PURE__ */ C("div", { children: [
    x && x.length > 0 && /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1 mb-1", children: x.map((r) => /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => y(`{{ ${r} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: _ },
        title: `Insert {{ ${r} }}`,
        disabled: p,
        children: r
      },
      r
    )) }),
    /* @__PURE__ */ C(
      "div",
      {
        className: S(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          b && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: _, fontSize: A, lineHeight: T, height: t },
        children: [
          /* @__PURE__ */ o(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: q, padding: `${P}px 6px`, fontFamily: _, lineHeight: T },
              children: v
            }
          ),
          /* @__PURE__ */ o(
            "textarea",
            {
              ref: l,
              value: e,
              onChange: L,
              onKeyDown: E,
              onFocus: () => d(!0),
              onBlur: () => d(!1),
              placeholder: i,
              readOnly: p,
              "aria-label": m,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${P}px ${Z}px`,
                fontFamily: _,
                fontSize: A,
                lineHeight: T,
                tabSize: 2,
                height: t,
                overflow: u ? "auto" : "hidden"
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
  active: a,
  onPick: c
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => c(e),
      className: S(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        a ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": a,
      children: e
    }
  );
}
function ce({
  value: e,
  onChange: a,
  curated: c
}) {
  const [i, s] = $(!1), [f, p] = $(!1), [x, m] = $(""), l = D(null), b = D(null), d = c ?? U;
  R(() => {
    if (!i) return;
    const n = (t) => {
      const u = t.target;
      l.current && l.current.contains(u) || b.current && b.current.contains(u) || s(!1);
    };
    return window.addEventListener("mousedown", n), () => window.removeEventListener("mousedown", n);
  }, [i]);
  const g = (n) => {
    a(n), s(!1);
  }, v = () => {
    const n = x.trim();
    n.length !== 0 && (a(n), m(""), s(!1));
  };
  return /* @__PURE__ */ C("div", { className: "relative inline-block", ref: l, children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => s((n) => !n),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": i,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ o("span", { "aria-hidden": !0, children: e })
      }
    ),
    i ? /* @__PURE__ */ C("div", { ref: b, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: d.map((n, t) => /* @__PURE__ */ o(
        X,
        {
          emoji: n,
          active: n === e,
          onPick: g
        },
        `${n}-${t}`
      )) }),
      /* @__PURE__ */ C("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "text",
            value: x,
            onChange: (n) => m(n.target.value),
            onKeyDown: (n) => {
              n.key === "Enter" ? (n.preventDefault(), v()) : n.key === "Escape" && s(!1);
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
            onClick: v,
            disabled: x.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
const Y = {
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
function de({
  value: e,
  threshold: a = 0.5,
  tone: c,
  size: i = "md",
  showLabel: s = !0,
  formatLabel: f,
  ariaLabel: p,
  className: x
}) {
  const m = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, l = c ?? (m >= a ? "success" : "danger"), b = (f ?? z)(m);
  return /* @__PURE__ */ C(
    "div",
    {
      role: "meter",
      "aria-valuenow": m,
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-label": p ?? `Score ${b} (threshold ${z(a)})`,
      className: S("flex w-full items-center gap-2", x),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: S(
              "relative flex-1 overflow-hidden rounded-full bg-surface-panel",
              J[i]
            ),
            children: /* @__PURE__ */ o(
              "div",
              {
                className: S("absolute inset-y-0 left-0 rounded-full transition-[width]", Y[l]),
                style: { width: `${m * 100}%` }
              }
            )
          }
        ),
        s ? /* @__PURE__ */ o("span", { className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary", children: b }) : null
      ]
    }
  );
}
function z(e) {
  return `${Math.round(e * 100)}%`;
}
function ue({
  points: e,
  yMin: a,
  yMax: c,
  width: i = 120,
  height: s = 32,
  stroke: f = "currentColor",
  strokeWidth: p = 1.5,
  showLastPoint: x = !0,
  showFill: m = !0,
  ariaLabel: l,
  className: b
}) {
  const d = e.filter((N) => Number.isFinite(N));
  if (d.length === 0)
    return /* @__PURE__ */ o(
      "div",
      {
        role: "img",
        "aria-label": l ?? "No trend data",
        className: S(
          "inline-flex items-center justify-center text-[10px] text-text-tertiary",
          b
        ),
        style: { width: i, height: s },
        children: "—"
      }
    );
  const g = Math.min(...d), v = Math.max(...d), n = a ?? (g === v ? g - 1 : g), t = c ?? (g === v ? v + 1 : v), u = Math.max(1e-9, t - n), y = d.length === 1 ? 0 : i / (d.length - 1), E = p, L = s - E * 2, r = d.map((N, k) => {
    const O = d.length === 1 ? i / 2 : k * y, B = E + L - (N - n) / u * L;
    return { x: O, y: B };
  }), w = r.map((N, k) => `${k === 0 ? "M" : "L"}${N.x.toFixed(2)},${N.y.toFixed(2)}`).join(" "), h = `${w} L${r[r.length - 1].x.toFixed(2)},${(s - E).toFixed(2)} L${r[0].x.toFixed(2)},${(s - E).toFixed(2)} Z`, F = r[r.length - 1], M = `Trend, ${d.length} points, starts ${H(d[0])}, ends ${H(d[d.length - 1])}`;
  return /* @__PURE__ */ o(
    "div",
    {
      role: "img",
      "aria-label": l ?? M,
      className: S("inline-block align-middle text-text-secondary", b),
      style: { width: i, height: s },
      children: /* @__PURE__ */ C(
        "svg",
        {
          "aria-hidden": !0,
          viewBox: `0 0 ${i} ${s}`,
          width: i,
          height: s,
          style: { display: "block" },
          children: [
            m ? /* @__PURE__ */ o("path", { d: h, fill: f, fillOpacity: 0.12, stroke: "none" }) : null,
            /* @__PURE__ */ o(
              "path",
              {
                d: w,
                fill: "none",
                stroke: f,
                strokeWidth: p,
                strokeLinejoin: "round",
                strokeLinecap: "round"
              }
            ),
            x ? /* @__PURE__ */ o("circle", { cx: F.x, cy: F.y, r: p * 1.5, fill: f }) : null
          ]
        }
      )
    }
  );
}
function H(e) {
  return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
function Q(e, a) {
  const c = e.trim();
  return a ? c.toLowerCase() : c;
}
function fe({
  value: e,
  onChange: a,
  placeholder: c = "add tag...",
  suggestions: i,
  lowercase: s = !0
}) {
  const [f, p] = $(""), [x, m] = $(!1), l = D(null), b = (t) => {
    const u = Q(t, s);
    if (u) {
      if (e.includes(u)) {
        p("");
        return;
      }
      a([...e, u]), p("");
    }
  }, d = (t) => {
    a(e.filter((u) => u !== t));
  }, g = (t) => {
    if (t.key === "Enter") {
      t.preventDefault(), b(f);
      return;
    }
    t.key === "Backspace" && f === "" && e.length > 0 && (t.preventDefault(), d(e[e.length - 1]));
  }, v = I(() => {
    if (!i || i.length === 0) return [];
    const t = f.trim().toLowerCase(), u = new Set(e.map((y) => y.toLowerCase()));
    return i.map((y) => y.trim().toLowerCase()).filter((y) => y.length > 0 && !u.has(y)).filter((y) => t ? y.includes(t) : !0).slice(0, 12);
  }, [i, e, f]), n = x && v.length > 0;
  return /* @__PURE__ */ C("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((t) => /* @__PURE__ */ C(
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
              onClick: () => d(t),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      t
    )),
    /* @__PURE__ */ C("div", { className: "relative", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: l,
          "data-testid": "tag-editor-input",
          type: "text",
          value: f,
          onChange: (t) => p(t.target.value),
          onKeyDown: g,
          onFocus: () => m(!0),
          onBlur: () => {
            setTimeout(() => m(!1), 120);
          },
          placeholder: c,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      n ? /* @__PURE__ */ o(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: v.map((t) => /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onMouseDown: (u) => {
                u.preventDefault();
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
const W = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, ee = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", te = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", re = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function pe({
  active: e,
  onClick: a,
  color: c,
  dot: i = !1,
  size: s = "sm",
  children: f,
  className: p,
  disabled: x = !1,
  "data-testid": m
}) {
  const l = e && !!c, b = l ? { background: `${c}22`, borderColor: `${c}66`, color: c } : void 0;
  return /* @__PURE__ */ C(
    "button",
    {
      type: "button",
      onClick: a,
      disabled: x,
      "aria-pressed": e,
      "data-testid": m,
      className: S(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        W[s],
        e ? l ? re : te : ee,
        x && "opacity-50 cursor-not-allowed",
        p
      ),
      style: b,
      children: [
        i && /* @__PURE__ */ o(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
            style: { background: c || "currentColor" }
          }
        ),
        f
      ]
    }
  );
}
export {
  le as C,
  U as D,
  pe as F,
  ce as I,
  se as P,
  de as S,
  fe as T,
  ue as a,
  ie as u
};
