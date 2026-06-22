import { jsxs as g, jsx as o, Fragment as G } from "react/jsx-runtime";
import { useRef as $, useState as S, useEffect as P, useMemo as A, createContext as V, useContext as Z } from "react";
import { createPortal as q } from "react-dom";
import { c as C } from "./cn-B6yFEsav.js";
const j = C(
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
  "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none",
  "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
);
function de({ images: e, openIndex: r, onClose: s, onNavigate: i }) {
  const l = $(null), p = $(null), [h, m] = S(r);
  P(() => {
    m(r);
  }, [r]);
  const u = r !== null && e.length > 0, d = i ? r : h ?? r, f = d === null ? 0 : Math.min(Math.max(d, 0), e.length - 1), c = (t) => {
    const n = e.length;
    if (n < 2) return;
    const x = (f + t + n) % n;
    i ? i(x) : m(x);
  };
  if (P(() => {
    if (u)
      return p.current = typeof document < "u" ? document.activeElement : null, l.current?.focus(), () => {
        const t = p.current;
        t && typeof t.focus == "function" && document.contains(t) && t.focus(), p.current = null;
      };
  }, [u]), P(() => {
    if (!u) return;
    const t = (n) => {
      n.key === "Escape" ? (n.stopPropagation(), s()) : n.key === "ArrowLeft" ? (n.preventDefault(), c(-1)) : n.key === "ArrowRight" && (n.preventDefault(), c(1));
    };
    return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
  }, [u, f, e.length, s, i]), !u) return null;
  const b = e[f], y = e.length > 1;
  return q(
    /* @__PURE__ */ g(
      "div",
      {
        ref: l,
        "data-testid": "image-lightbox",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": b.caption ?? b.alt ?? `Image ${f + 1} of ${e.length}`,
        tabIndex: -1,
        className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
        onClick: s,
        children: [
          /* @__PURE__ */ g(
            "div",
            {
              "data-testid": "image-lightbox-counter",
              className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
              children: [
                f + 1,
                " / ",
                e.length
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              "aria-label": "Close",
              "data-testid": "image-lightbox-close",
              className: C(
                "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full",
                "bg-black/50 text-lg leading-none text-white hover:bg-black/70",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              ),
              onClick: (t) => {
                t.stopPropagation(), s();
              },
              children: "✕"
            }
          ),
          /* @__PURE__ */ g(
            "figure",
            {
              className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
              onClick: (t) => t.stopPropagation(),
              children: [
                /* @__PURE__ */ o(
                  "img",
                  {
                    "data-testid": "image-lightbox-img",
                    src: b.src,
                    alt: b.alt ?? "",
                    className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
                  }
                ),
                b.caption && /* @__PURE__ */ o(
                  "figcaption",
                  {
                    "data-testid": "image-lightbox-caption",
                    className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
                    children: b.caption
                  }
                )
              ]
            }
          ),
          y && /* @__PURE__ */ g(G, { children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-label": "Previous image",
                "data-testid": "image-lightbox-prev",
                className: C(j, "left-3"),
                onClick: (t) => {
                  t.stopPropagation(), c(-1);
                },
                children: "‹"
              }
            ),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-label": "Next image",
                "data-testid": "image-lightbox-next",
                className: C(j, "right-3"),
                onClick: (t) => {
                  t.stopPropagation(), c(1);
                },
                children: "›"
              }
            )
          ] })
        ]
      }
    ),
    document.body
  );
}
const U = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, X = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", Y = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", J = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function ue({
  active: e,
  onClick: r,
  color: s,
  dot: i = !1,
  size: l = "sm",
  children: p,
  className: h,
  disabled: m = !1,
  "data-testid": u
}) {
  const d = e && !!s, f = d ? { background: `${s}22`, borderColor: `${s}66`, color: s } : void 0;
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: r,
      disabled: m,
      "aria-pressed": e,
      "data-testid": u,
      className: C(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        U[l],
        e ? d ? J : Y : X,
        m && "opacity-50 cursor-not-allowed",
        h
      ),
      style: f,
      children: [
        i && /* @__PURE__ */ o(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
            style: { background: s || "currentColor" }
          }
        ),
        p
      ]
    }
  );
}
function Q(e, r) {
  const s = e.trim();
  return r ? s.toLowerCase() : s;
}
function fe({
  value: e,
  onChange: r,
  placeholder: s = "add tag...",
  suggestions: i,
  lowercase: l = !0
}) {
  const [p, h] = S(""), [m, u] = S(!1), d = $(null), f = (n) => {
    const x = Q(n, l);
    if (x) {
      if (e.includes(x)) {
        h("");
        return;
      }
      r([...e, x]), h("");
    }
  }, c = (n) => {
    r(e.filter((x) => x !== n));
  }, b = (n) => {
    if (n.key === "Enter") {
      n.preventDefault(), f(p);
      return;
    }
    n.key === "Backspace" && p === "" && e.length > 0 && (n.preventDefault(), c(e[e.length - 1]));
  }, y = A(() => {
    if (!i || i.length === 0) return [];
    const n = p.trim().toLowerCase(), x = new Set(e.map((w) => w.toLowerCase()));
    return i.map((w) => w.trim().toLowerCase()).filter((w) => w.length > 0 && !x.has(w)).filter((w) => n ? w.includes(n) : !0).slice(0, 12);
  }, [i, e, p]), t = m && y.length > 0;
  return /* @__PURE__ */ g("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((n) => /* @__PURE__ */ g(
      "span",
      {
        className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600",
        "data-testid": `tag-chip-${n}`,
        children: [
          n,
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              "aria-label": `Remove tag ${n}`,
              onClick: () => c(n),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      n
    )),
    /* @__PURE__ */ g("div", { className: "relative", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          "data-testid": "tag-editor-input",
          type: "text",
          value: p,
          onChange: (n) => h(n.target.value),
          onKeyDown: b,
          onFocus: () => u(!0),
          onBlur: () => {
            setTimeout(() => u(!1), 120);
          },
          placeholder: s,
          className: "border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        }
      ),
      t ? /* @__PURE__ */ o(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: y.map((n) => /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onMouseDown: (x) => {
                x.preventDefault();
              },
              onClick: () => f(n),
              className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 cursor-pointer border border-dashed border-gray-300",
              children: [
                "+ ",
                n
              ]
            },
            n
          ))
        }
      ) : null
    ] })
  ] });
}
const W = [
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
function ee({
  emoji: e,
  active: r,
  onPick: s
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => s(e),
      className: C(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]",
        r ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": r,
      children: e
    }
  );
}
function pe({
  value: e,
  onChange: r,
  curated: s
}) {
  const [i, l] = S(!1), [p, h] = S(!1), [m, u] = S(""), d = $(null), f = $(null), c = s ?? W;
  P(() => {
    if (!i) return;
    const t = (n) => {
      const x = n.target;
      d.current && d.current.contains(x) || f.current && f.current.contains(x) || l(!1);
    };
    return window.addEventListener("mousedown", t), () => window.removeEventListener("mousedown", t);
  }, [i]);
  const b = (t) => {
    r(t), l(!1);
  }, y = () => {
    const t = m.trim();
    t.length !== 0 && (r(t), u(""), l(!1));
  };
  return /* @__PURE__ */ g("div", { className: "relative inline-block", ref: d, children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => l((t) => !t),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": i,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ o("span", { "aria-hidden": !0, children: e })
      }
    ),
    i ? /* @__PURE__ */ g("div", { ref: f, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: c.map((t, n) => /* @__PURE__ */ o(
        ee,
        {
          emoji: t,
          active: t === e,
          onPick: b
        },
        `${t}-${n}`
      )) }),
      /* @__PURE__ */ g("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "text",
            value: m,
            onChange: (t) => u(t.target.value),
            onKeyDown: (t) => {
              t.key === "Enter" ? (t.preventDefault(), y()) : t.key === "Escape" && l(!1);
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
            onClick: y,
            disabled: m.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
const _ = "'SF Mono', Menlo, monospace", R = 12, T = 1.5, te = R * T, I = 8, ne = 10, re = 36;
function xe({
  value: e,
  onChange: r,
  language: s = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: i,
  minLines: l = 4,
  maxLines: p = 20,
  readOnly: h = !1,
  variables: m,
  "aria-label": u
}) {
  const d = $(null), [f, c] = S(!1), b = A(() => Math.max(1, e.split(`
`).length), [e]), y = A(() => {
    const a = Math.max(b, l), k = [];
    for (let v = 1; v <= a; v++) k.push(String(v));
    return k.join(`
`);
  }, [b, l]), n = Math.min(Math.max(b, l), p) * te + I * 2, x = b > p, w = (a) => {
    const k = d.current, v = e ?? "";
    if (!k) {
      r(v + a);
      return;
    }
    const L = k.selectionStart ?? v.length, M = k.selectionEnd ?? v.length, N = v.slice(0, L) + a + v.slice(M);
    r(N), queueMicrotask(() => {
      if (d.current) {
        const F = L + a.length;
        d.current.focus(), d.current.setSelectionRange(F, F);
      }
    });
  }, E = (a) => {
    h || a.key === "Tab" && (a.preventDefault(), w("  "));
  }, D = (a) => {
    r(a.target.value);
  };
  return P(() => {
    const a = d.current;
    if (!a || !x) return;
    const k = a.parentElement?.querySelector("[data-gutter]");
    if (!k) return;
    const v = () => {
      k.scrollTop = a.scrollTop;
    };
    return a.addEventListener("scroll", v), () => a.removeEventListener("scroll", v);
  }, [x]), /* @__PURE__ */ g("div", { children: [
    m && m.length > 0 && /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1 mb-1", children: m.map((a) => /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => w(`{{ ${a} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: _ },
        title: `Insert {{ ${a} }}`,
        disabled: h,
        children: a
      },
      a
    )) }),
    /* @__PURE__ */ g(
      "div",
      {
        className: C(
          "flex border border-border-field rounded-md bg-[#fafbfc] overflow-hidden box-border",
          f && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: _, fontSize: R, lineHeight: T, height: n },
        children: [
          /* @__PURE__ */ o(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-[#f8fafc] text-text-tertiary text-[11px]",
              style: { width: re, padding: `${I}px 6px`, fontFamily: _, lineHeight: T },
              children: y
            }
          ),
          /* @__PURE__ */ o(
            "textarea",
            {
              ref: d,
              value: e,
              onChange: D,
              onKeyDown: E,
              onFocus: () => c(!0),
              onBlur: () => c(!1),
              placeholder: i,
              readOnly: h,
              "aria-label": u,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${I}px ${ne}px`,
                fontFamily: _,
                fontSize: R,
                lineHeight: T,
                tabSize: 2,
                height: n,
                overflow: x ? "auto" : "hidden"
              }
            }
          )
        ]
      }
    )
  ] });
}
const O = V(null);
function be({
  value: e,
  children: r
}) {
  return /* @__PURE__ */ o(O.Provider, { value: e, children: r });
}
function me() {
  const e = Z(O);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const oe = {
  success: "bg-state-completed",
  warning: "bg-state-awaiting",
  danger: "bg-state-failed",
  info: "bg-state-running",
  neutral: "bg-state-idle"
}, ae = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3"
};
function he({
  value: e,
  threshold: r = 0.5,
  tone: s,
  size: i = "md",
  showLabel: l = !0,
  formatLabel: p,
  ariaLabel: h,
  className: m
}) {
  const u = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, d = s ?? (u >= r ? "success" : "danger"), f = (p ?? z)(u);
  return /* @__PURE__ */ g(
    "div",
    {
      role: "meter",
      "aria-valuenow": u,
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-label": h ?? `Score ${f} (threshold ${z(r)})`,
      className: C("flex w-full items-center gap-2", m),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: C(
              "relative flex-1 overflow-hidden rounded-full bg-surface-panel",
              ae[i]
            ),
            children: /* @__PURE__ */ o(
              "div",
              {
                className: C("absolute inset-y-0 left-0 rounded-full transition-[width]", oe[d]),
                style: { width: `${u * 100}%` }
              }
            )
          }
        ),
        l ? /* @__PURE__ */ o("span", { className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary", children: f }) : null
      ]
    }
  );
}
function z(e) {
  return `${Math.round(e * 100)}%`;
}
function ge({
  points: e,
  yMin: r,
  yMax: s,
  width: i = 120,
  height: l = 32,
  stroke: p = "currentColor",
  strokeWidth: h = 1.5,
  showLastPoint: m = !0,
  showFill: u = !0,
  ariaLabel: d,
  className: f
}) {
  const c = e.filter((N) => Number.isFinite(N));
  if (c.length === 0)
    return /* @__PURE__ */ o(
      "div",
      {
        role: "img",
        "aria-label": d ?? "No trend data",
        className: C(
          "inline-flex items-center justify-center text-[10px] text-text-tertiary",
          f
        ),
        style: { width: i, height: l },
        children: "—"
      }
    );
  const b = Math.min(...c), y = Math.max(...c), t = r ?? (b === y ? b - 1 : b), n = s ?? (b === y ? y + 1 : y), x = Math.max(1e-9, n - t), w = c.length === 1 ? 0 : i / (c.length - 1), E = h, D = l - E * 2, a = c.map((N, F) => {
    const B = c.length === 1 ? i / 2 : F * w, K = E + D - (N - t) / x * D;
    return { x: B, y: K };
  }), k = a.map((N, F) => `${F === 0 ? "M" : "L"}${N.x.toFixed(2)},${N.y.toFixed(2)}`).join(" "), v = `${k} L${a[a.length - 1].x.toFixed(2)},${(l - E).toFixed(2)} L${a[0].x.toFixed(2)},${(l - E).toFixed(2)} Z`, L = a[a.length - 1], M = `Trend, ${c.length} points, starts ${H(c[0])}, ends ${H(c[c.length - 1])}`;
  return /* @__PURE__ */ o(
    "div",
    {
      role: "img",
      "aria-label": d ?? M,
      className: C("inline-block align-middle text-text-secondary", f),
      style: { width: i, height: l },
      children: /* @__PURE__ */ g(
        "svg",
        {
          "aria-hidden": !0,
          viewBox: `0 0 ${i} ${l}`,
          width: i,
          height: l,
          style: { display: "block" },
          children: [
            u ? /* @__PURE__ */ o("path", { d: v, fill: p, fillOpacity: 0.12, stroke: "none" }) : null,
            /* @__PURE__ */ o(
              "path",
              {
                d: k,
                fill: "none",
                stroke: p,
                strokeWidth: h,
                strokeLinejoin: "round",
                strokeLinecap: "round"
              }
            ),
            m ? /* @__PURE__ */ o("circle", { cx: L.x, cy: L.y, r: h * 1.5, fill: p }) : null
          ]
        }
      )
    }
  );
}
function H(e) {
  return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
export {
  xe as C,
  W as D,
  ue as F,
  de as I,
  be as P,
  he as S,
  fe as T,
  ge as a,
  pe as b,
  me as u
};
