import { jsxs as v, jsx as s, Fragment as q } from "react/jsx-runtime";
import { useRef as F, useState as $, useEffect as M, useMemo as _, createContext as G, useContext as V } from "react";
import { createPortal as Z } from "react-dom";
import { c as I } from "./cn-B6yFEsav.js";
import { u as X } from "./IdentityContext-CLalsm_M.js";
const U = I(
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
  "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none",
  "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
);
function xe({ images: e, openIndex: a, onClose: c, onNavigate: l }) {
  const d = F(null), x = F(null), [m, w] = $(a);
  M(() => {
    w(a);
  }, [a]);
  const b = a !== null && e.length > 0, f = l ? a : m ?? a, h = f === null ? 0 : Math.min(Math.max(f, 0), e.length - 1), u = (n) => {
    const r = e.length;
    if (r < 2) return;
    const y = (h + n + r) % r;
    l ? l(y) : w(y);
  };
  if (M(() => {
    if (b)
      return x.current = typeof document < "u" ? document.activeElement : null, d.current?.focus(), () => {
        const n = x.current;
        n && typeof n.focus == "function" && document.contains(n) && n.focus(), x.current = null;
      };
  }, [b]), M(() => {
    if (!b) return;
    const n = (r) => {
      r.key === "Escape" ? (r.stopPropagation(), c()) : r.key === "ArrowLeft" ? (r.preventDefault(), u(-1)) : r.key === "ArrowRight" && (r.preventDefault(), u(1));
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [b, h, e.length, c, l]), !b) return null;
  const g = e[h], N = e.length > 1;
  return Z(
    /* @__PURE__ */ v(
      "div",
      {
        ref: d,
        "data-testid": "image-lightbox",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": g.caption ?? g.alt ?? `Image ${h + 1} of ${e.length}`,
        tabIndex: -1,
        className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
        onClick: c,
        children: [
          /* @__PURE__ */ v(
            "div",
            {
              "data-testid": "image-lightbox-counter",
              className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
              children: [
                h + 1,
                " / ",
                e.length
              ]
            }
          ),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              "aria-label": "Close",
              "data-testid": "image-lightbox-close",
              className: I(
                "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full",
                "bg-black/50 text-lg leading-none text-white hover:bg-black/70",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              ),
              onClick: (n) => {
                n.stopPropagation(), c();
              },
              children: "✕"
            }
          ),
          /* @__PURE__ */ v(
            "figure",
            {
              className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
              onClick: (n) => n.stopPropagation(),
              children: [
                /* @__PURE__ */ s(
                  "img",
                  {
                    "data-testid": "image-lightbox-img",
                    src: g.src,
                    alt: g.alt ?? "",
                    className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
                  }
                ),
                g.caption && /* @__PURE__ */ s(
                  "figcaption",
                  {
                    "data-testid": "image-lightbox-caption",
                    className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
                    children: g.caption
                  }
                )
              ]
            }
          ),
          N && /* @__PURE__ */ v(q, { children: [
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                "aria-label": "Previous image",
                "data-testid": "image-lightbox-prev",
                className: I(U, "left-3"),
                onClick: (n) => {
                  n.stopPropagation(), u(-1);
                },
                children: "‹"
              }
            ),
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                "aria-label": "Next image",
                "data-testid": "image-lightbox-next",
                className: I(U, "right-3"),
                onClick: (n) => {
                  n.stopPropagation(), u(1);
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
const Y = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, Q = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", J = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", W = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function he({
  active: e,
  onClick: a,
  color: c,
  dot: l = !1,
  size: d = "sm",
  children: x,
  className: m,
  disabled: w = !1,
  "data-testid": b
}) {
  const f = e && !!c, h = f ? { background: `${c}22`, borderColor: `${c}66`, color: c } : void 0;
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: a,
      disabled: w,
      "aria-pressed": e,
      "data-testid": b,
      className: I(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        Y[d],
        e ? f ? W : J : Q,
        w && "opacity-50 cursor-not-allowed",
        m
      ),
      style: h,
      children: [
        l && /* @__PURE__ */ s(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
            style: { background: c || "currentColor" }
          }
        ),
        x
      ]
    }
  );
}
function ee(e, a) {
  const c = e.trim();
  return a ? c.toLowerCase() : c;
}
function be({
  value: e,
  onChange: a,
  placeholder: c = "add tag...",
  suggestions: l,
  lowercase: d = !0
}) {
  const [x, m] = $(""), [w, b] = $(!1), f = F(null), h = (r) => {
    const y = ee(r, d);
    if (y) {
      if (e.includes(y)) {
        m("");
        return;
      }
      a([...e, y]), m("");
    }
  }, u = (r) => {
    a(e.filter((y) => y !== r));
  }, g = (r) => {
    if (r.key === "Enter") {
      r.preventDefault(), h(x);
      return;
    }
    r.key === "Backspace" && x === "" && e.length > 0 && (r.preventDefault(), u(e[e.length - 1]));
  }, N = _(() => {
    if (!l || l.length === 0) return [];
    const r = x.trim().toLowerCase(), y = new Set(e.map((k) => k.toLowerCase()));
    return l.map((k) => k.trim().toLowerCase()).filter((k) => k.length > 0 && !y.has(k)).filter((k) => r ? k.includes(r) : !0).slice(0, 12);
  }, [l, e, x]), n = w && N.length > 0;
  return /* @__PURE__ */ v("div", { className: "relative flex flex-wrap items-center gap-1.5", "data-testid": "tag-editor", children: [
    e.map((r) => /* @__PURE__ */ v(
      "span",
      {
        className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
        "data-testid": `tag-chip-${r}`,
        children: [
          r,
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              "aria-label": `Remove tag ${r}`,
              onClick: () => u(r),
              className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
              children: "×"
            }
          )
        ]
      },
      r
    )),
    /* @__PURE__ */ v("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        "input",
        {
          ref: f,
          "data-testid": "tag-editor-input",
          type: "text",
          value: x,
          onChange: (r) => m(r.target.value),
          onKeyDown: g,
          onFocus: () => b(!0),
          onBlur: () => {
            setTimeout(() => b(!1), 120);
          },
          placeholder: c,
          className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
        }
      ),
      n ? /* @__PURE__ */ s(
        "div",
        {
          className: "absolute top-full mt-1 bg-white border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
          "data-testid": "tag-suggestions",
          children: N.map((r) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onMouseDown: (y) => {
                y.preventDefault();
              },
              onClick: () => h(r),
              className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary cursor-pointer border border-dashed border-border-emphasis",
              children: [
                "+ ",
                r
              ]
            },
            r
          ))
        }
      ) : null
    ] })
  ] });
}
const te = [
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
function re({
  emoji: e,
  active: a,
  onPick: c
}) {
  return /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: () => c(e),
      className: I(
        "w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover",
        a ? "border border-primary" : "border border-transparent"
      ),
      "aria-label": `Select ${e}`,
      "aria-pressed": a,
      children: e
    }
  );
}
function ge({
  value: e,
  onChange: a,
  curated: c
}) {
  const [l, d] = $(!1), [x, m] = $(!1), [w, b] = $(""), f = F(null), h = F(null), u = c ?? te;
  M(() => {
    if (!l) return;
    const n = (r) => {
      const y = r.target;
      f.current && f.current.contains(y) || h.current && h.current.contains(y) || d(!1);
    };
    return window.addEventListener("mousedown", n), () => window.removeEventListener("mousedown", n);
  }, [l]);
  const g = (n) => {
    a(n), d(!1);
  }, N = () => {
    const n = w.trim();
    n.length !== 0 && (a(n), b(""), d(!1));
  };
  return /* @__PURE__ */ v("div", { className: "relative inline-block", ref: f, children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => d((n) => !n),
        className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
        "aria-label": "Choose icon",
        "aria-haspopup": "dialog",
        "aria-expanded": l,
        "data-testid": "icon-picker-trigger",
        children: /* @__PURE__ */ s("span", { "aria-hidden": !0, children: e })
      }
    ),
    l ? /* @__PURE__ */ v("div", { ref: h, className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]", "data-testid": "icon-picker-popover", children: [
      /* @__PURE__ */ s("div", { className: "grid grid-cols-[repeat(8,28px)] gap-1", children: u.map((n, r) => /* @__PURE__ */ s(
        re,
        {
          emoji: n,
          active: n === e,
          onPick: g
        },
        `${n}-${r}`
      )) }),
      /* @__PURE__ */ v("div", { className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border", children: [
        /* @__PURE__ */ s(
          "input",
          {
            type: "text",
            value: w,
            onChange: (n) => b(n.target.value),
            onKeyDown: (n) => {
              n.key === "Enter" ? (n.preventDefault(), N()) : n.key === "Escape" && d(!1);
            },
            placeholder: "Paste any emoji…",
            className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
            "data-testid": "icon-picker-custom-input",
            "aria-label": "Custom emoji"
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: N,
            disabled: w.trim().length === 0,
            className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            children: "Set"
          }
        )
      ] })
    ] }) : null
  ] });
}
const A = "'SF Mono', Menlo, monospace", z = 12, R = 1.5, ne = z * R, j = 8, oe = 10, ae = 36;
function ye({
  value: e,
  onChange: a,
  language: c = "plain",
  // Phase 1: accepted but not applied yet
  placeholder: l,
  minLines: d = 4,
  maxLines: x = 20,
  readOnly: m = !1,
  variables: w,
  "aria-label": b
}) {
  const f = F(null), [h, u] = $(!1), g = _(() => Math.max(1, e.split(`
`).length), [e]), N = _(() => {
    const i = Math.max(g, d), E = [];
    for (let C = 1; C <= i; C++) E.push(String(C));
    return E.join(`
`);
  }, [g, d]), r = Math.min(Math.max(g, d), x) * ne + j * 2, y = g > x, k = (i) => {
    const E = f.current, C = e ?? "";
    if (!E) {
      a(C + i);
      return;
    }
    const D = E.selectionStart ?? C.length, t = E.selectionEnd ?? C.length, o = C.slice(0, D) + i + C.slice(t);
    a(o), queueMicrotask(() => {
      if (f.current) {
        const p = D + i.length;
        f.current.focus(), f.current.setSelectionRange(p, p);
      }
    });
  }, S = (i) => {
    m || i.key === "Tab" && (i.preventDefault(), k("  "));
  }, L = (i) => {
    a(i.target.value);
  };
  return M(() => {
    const i = f.current;
    if (!i || !y) return;
    const E = i.parentElement?.querySelector("[data-gutter]");
    if (!E) return;
    const C = () => {
      E.scrollTop = i.scrollTop;
    };
    return i.addEventListener("scroll", C), () => i.removeEventListener("scroll", C);
  }, [y]), /* @__PURE__ */ v("div", { children: [
    w && w.length > 0 && /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1 mb-1", children: w.map((i) => /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => k(`{{ ${i} }}`),
        className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
        style: { fontFamily: A },
        title: `Insert {{ ${i} }}`,
        disabled: m,
        children: i
      },
      i
    )) }),
    /* @__PURE__ */ v(
      "div",
      {
        className: I(
          "flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border",
          h && "border-primary shadow-[0_0_0_1px_#646cff]"
        ),
        style: { fontFamily: A, fontSize: z, lineHeight: R, height: r },
        children: [
          /* @__PURE__ */ s(
            "div",
            {
              "data-gutter": !0,
              className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
              style: { width: ae, padding: `${j}px 6px`, fontFamily: A, lineHeight: R },
              children: N
            }
          ),
          /* @__PURE__ */ s(
            "textarea",
            {
              ref: f,
              value: e,
              onChange: L,
              onKeyDown: S,
              onFocus: () => u(!0),
              onBlur: () => u(!1),
              placeholder: l,
              readOnly: m,
              "aria-label": b,
              spellCheck: !1,
              autoCorrect: "off",
              autoCapitalize: "off",
              className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
              style: {
                padding: `${j}px ${oe}px`,
                fontFamily: A,
                fontSize: z,
                lineHeight: R,
                tabSize: 2,
                height: r,
                overflow: y ? "auto" : "hidden"
              }
            }
          )
        ]
      }
    )
  ] });
}
const K = G(null);
function we({
  value: e,
  children: a
}) {
  return /* @__PURE__ */ s(K.Provider, { value: e, children: a });
}
function se() {
  const e = V(K);
  if (!e)
    throw new Error("usePresenceContext must be used within a <PresenceProvider>");
  return e;
}
const ie = "";
function H(e, a) {
  const c = e.displayName;
  return typeof c == "string" && c.length > 0 ? c : a.slice(0, 8);
}
function ve({ value: e, onChange: a, placeholder: c, maxSelect: l }) {
  const { presenceUsers: d } = se(), { idToken: x } = X(), [m, w] = $(""), [b, f] = $(!1), [h, u] = $(0), [g, N] = $([]), n = F(null), r = F(null), y = _(() => {
    const t = new Set(e), o = [];
    for (const p of d)
      t.has(p.clientId) || (t.add(p.clientId), o.push({
        userId: p.clientId,
        displayName: H(p.metadata, p.clientId)
      }));
    return o;
  }, [d, e]);
  M(() => {
    const t = m.trim();
    if (!t || !x) {
      N([]);
      return;
    }
    const o = new AbortController(), p = setTimeout(() => {
      const T = `${ie}/api/profiles?q=${encodeURIComponent(t)}&limit=20`;
      fetch(T, {
        headers: { Authorization: `Bearer ${x}` },
        signal: o.signal
      }).then((P) => P.ok ? P.json() : Promise.reject(new Error(`HTTP ${P.status}`))).then((P) => {
        N(Array.isArray(P.profiles) ? P.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(p), o.abort();
    };
  }, [m, x]);
  const k = _(() => {
    const t = new Set(e), o = [];
    for (const p of y)
      t.has(p.userId) || (t.add(p.userId), o.push(p));
    for (const p of g)
      t.has(p.userId) || (t.add(p.userId), o.push({
        userId: p.userId,
        displayName: p.displayName || p.userId.slice(0, 8)
      }));
    return o;
  }, [y, g, e]), S = _(() => {
    const t = m.trim().toLowerCase();
    return t ? k.filter(
      (o) => o.displayName.toLowerCase().includes(t) || o.userId.toLowerCase().includes(t)
    ) : k;
  }, [k, m]), L = typeof l == "number" && e.length >= l, i = (t) => {
    const o = t.trim();
    o && (e.includes(o) || L || (a([...e, o]), w(""), u(0)));
  }, E = (t) => {
    a(e.filter((o) => o !== t));
  }, C = (t) => {
    if (t.key === "ArrowDown")
      t.preventDefault(), f(!0), u((o) => Math.min(o + 1, Math.max(S.length - 1, 0)));
    else if (t.key === "ArrowUp")
      t.preventDefault(), u((o) => Math.max(o - 1, 0));
    else if (t.key === "Enter") {
      t.preventDefault();
      const o = S[h];
      o ? i(o.userId) : m.trim() && i(m.trim());
    } else t.key === "Escape" ? f(!1) : t.key === "Backspace" && !m && e.length > 0 && E(e[e.length - 1]);
  }, D = (t) => {
    const o = d.find((T) => T.clientId === t);
    if (o) return H(o.metadata, t);
    const p = g.find((T) => T.userId === t);
    return p && p.displayName ? p.displayName : t;
  };
  return /* @__PURE__ */ v("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    e.length > 0 && /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1.5", children: e.map((t) => /* @__PURE__ */ v(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          D(t),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              onClick: () => E(t),
              "aria-label": `Remove ${D(t)}`,
              className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      t
    )) }),
    /* @__PURE__ */ v("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        "input",
        {
          ref: n,
          type: "text",
          value: m,
          disabled: L,
          placeholder: L ? `Max ${l} selected` : c ?? "Search users…",
          onChange: (t) => {
            w(t.target.value), f(!0), u(0);
          },
          onFocus: () => f(!0),
          onBlur: () => {
            r.current = setTimeout(() => f(!1), 120);
          },
          onKeyDown: C,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
        }
      ),
      b && !L && S.length > 0 && /* @__PURE__ */ s(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: (t) => {
            t.preventDefault(), r.current && clearTimeout(r.current);
          },
          children: S.map((t, o) => /* @__PURE__ */ v(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer",
                o === h ? "bg-surface-hover" : "bg-transparent"
              ),
              onMouseEnter: () => u(o),
              onClick: () => {
                i(t.userId), n.current?.focus();
              },
              children: [
                /* @__PURE__ */ s("span", { className: "font-medium", children: t.displayName }),
                t.displayName !== t.userId && /* @__PURE__ */ s("span", { className: "text-text-tertiary ml-2 text-[11px] font-mono", children: t.userId.slice(0, 12) })
              ]
            },
            t.userId
          ))
        }
      )
    ] })
  ] });
}
const le = {
  success: "bg-state-completed",
  warning: "bg-state-awaiting",
  danger: "bg-state-failed",
  info: "bg-state-running",
  neutral: "bg-state-idle"
}, ce = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3"
};
function Ne({
  value: e,
  threshold: a = 0.5,
  tone: c,
  size: l = "md",
  showLabel: d = !0,
  formatLabel: x,
  ariaLabel: m,
  className: w
}) {
  const b = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, f = c ?? (b >= a ? "success" : "danger"), h = (x ?? B)(b);
  return /* @__PURE__ */ v(
    "div",
    {
      role: "meter",
      "aria-valuenow": b,
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-label": m ?? `Score ${h} (threshold ${B(a)})`,
      className: I("flex w-full items-center gap-2", w),
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: I(
              "relative flex-1 overflow-hidden rounded-full bg-surface-panel",
              ce[l]
            ),
            children: /* @__PURE__ */ s(
              "div",
              {
                className: I("absolute inset-y-0 left-0 rounded-full transition-[width]", le[f]),
                style: { width: `${b * 100}%` }
              }
            )
          }
        ),
        d ? /* @__PURE__ */ s("span", { className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary", children: h }) : null
      ]
    }
  );
}
function B(e) {
  return `${Math.round(e * 100)}%`;
}
function ke({
  points: e,
  yMin: a,
  yMax: c,
  width: l = 120,
  height: d = 32,
  stroke: x = "currentColor",
  strokeWidth: m = 1.5,
  showLastPoint: w = !0,
  showFill: b = !0,
  ariaLabel: f,
  className: h
}) {
  const u = e.filter((o) => Number.isFinite(o));
  if (u.length === 0)
    return /* @__PURE__ */ s(
      "div",
      {
        role: "img",
        "aria-label": f ?? "No trend data",
        className: I(
          "inline-flex items-center justify-center text-[10px] text-text-tertiary",
          h
        ),
        style: { width: l, height: d },
        children: "—"
      }
    );
  const g = Math.min(...u), N = Math.max(...u), n = a ?? (g === N ? g - 1 : g), r = c ?? (g === N ? N + 1 : N), y = Math.max(1e-9, r - n), k = u.length === 1 ? 0 : l / (u.length - 1), S = m, L = d - S * 2, i = u.map((o, p) => {
    const T = u.length === 1 ? l / 2 : p * k, P = S + L - (o - n) / y * L;
    return { x: T, y: P };
  }), E = i.map((o, p) => `${p === 0 ? "M" : "L"}${o.x.toFixed(2)},${o.y.toFixed(2)}`).join(" "), C = `${E} L${i[i.length - 1].x.toFixed(2)},${(d - S).toFixed(2)} L${i[0].x.toFixed(2)},${(d - S).toFixed(2)} Z`, D = i[i.length - 1], t = `Trend, ${u.length} points, starts ${O(u[0])}, ends ${O(u[u.length - 1])}`;
  return /* @__PURE__ */ s(
    "div",
    {
      role: "img",
      "aria-label": f ?? t,
      className: I("inline-block align-middle text-text-secondary", h),
      style: { width: l, height: d },
      children: /* @__PURE__ */ v(
        "svg",
        {
          "aria-hidden": !0,
          viewBox: `0 0 ${l} ${d}`,
          width: l,
          height: d,
          className: "block",
          children: [
            b ? /* @__PURE__ */ s("path", { d: C, fill: x, fillOpacity: 0.12, stroke: "none" }) : null,
            /* @__PURE__ */ s(
              "path",
              {
                d: E,
                fill: "none",
                stroke: x,
                strokeWidth: m,
                strokeLinejoin: "round",
                strokeLinecap: "round"
              }
            ),
            w ? /* @__PURE__ */ s("circle", { cx: D.x, cy: D.y, r: m * 1.5, fill: x }) : null
          ]
        }
      )
    }
  );
}
function O(e) {
  return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
export {
  ye as C,
  te as D,
  he as F,
  ge as I,
  we as P,
  Ne as S,
  be as T,
  ve as U,
  xe as a,
  ke as b,
  se as u
};
