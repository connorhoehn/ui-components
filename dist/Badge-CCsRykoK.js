import { jsx as a, jsxs as f } from "react/jsx-runtime";
import { c as u } from "./cn-B6yFEsav.js";
import { useState as k, useRef as B, useCallback as N, useEffect as T } from "react";
import { B as E } from "./Banner-B8AcwPH_.js";
import { E as _ } from "./EmptyState-PM9wTjxk.js";
const R = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, W = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, K = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function oe({
  checked: e,
  onChange: n,
  disabled: r = !1,
  size: t = "md",
  "aria-label": c,
  "aria-labelledby": o,
  className: l,
  style: h,
  "data-testid": d
}) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": c,
      "aria-labelledby": o,
      disabled: r,
      "data-testid": d,
      onClick: () => {
        r || n(!e);
      },
      className: u(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        R[t],
        e ? "bg-blue-600" : "bg-gray-300",
        r ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        l
      ),
      style: h,
      children: /* @__PURE__ */ a(
        "span",
        {
          className: u(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            W[t],
            e ? K[t] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
const P = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5"
};
function F({
  color: e,
  pulse: n = !1,
  size: r = "sm",
  label: t,
  className: c,
  style: o,
  title: l,
  "data-testid": h,
  "aria-label": d
}) {
  const i = e ?? "var(--color-text-tertiary)", p = /* @__PURE__ */ a(
    "span",
    {
      "aria-hidden": t != null ? !0 : void 0,
      "aria-label": t == null ? d : void 0,
      className: u(
        "inline-block rounded-full shrink-0",
        P[r],
        n && "animate-pulse"
      ),
      style: { background: i }
    }
  );
  return t == null ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": h,
      title: l,
      className: u("inline-flex items-center", c),
      style: o,
      children: p
    }
  ) : /* @__PURE__ */ f(
    "span",
    {
      "data-testid": h,
      title: l,
      "aria-label": d,
      className: u("inline-flex items-center", c),
      style: o,
      children: [
        p,
        /* @__PURE__ */ a("span", { className: "ml-1.5 text-[11px] text-[var(--color-text-secondary)]", children: t })
      ]
    }
  );
}
const j = [
  "#4f7cff",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#14b8a6",
  "#0ea5e9",
  "#f97316"
];
function G(e) {
  let n = 5381;
  for (let t = 0; t < e.length; t++)
    n = n * 33 ^ e.charCodeAt(t);
  const r = Math.abs(n) % j.length;
  return j[r];
}
function M(e) {
  const n = e.trim();
  if (!n) return "?";
  const r = n.split(/\s+/);
  if (r.length >= 2)
    return (r[0][0] + r[1][0]).toUpperCase();
  const t = r[0];
  return t.length >= 2 ? t[0].toUpperCase() + t[1].toLowerCase() : t[0].toUpperCase();
}
function $({
  name: e,
  size: n = 28,
  color: r,
  className: t,
  style: c,
  title: o
}) {
  const l = r || G(e), h = M(e);
  return /* @__PURE__ */ a(
    "div",
    {
      title: o ?? e,
      className: u(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none",
        t
      ),
      style: {
        width: n,
        height: n,
        background: l,
        color: "#fff",
        fontSize: n * 0.38,
        ...c
      },
      children: h
    }
  );
}
function le({
  names: e,
  maxVisible: n = 5,
  size: r = 28,
  className: t
}) {
  const c = e.slice(0, n), o = e.length - c.length, l = -(r * 0.3);
  return /* @__PURE__ */ f("div", { className: u("inline-flex items-center", t), children: [
    c.map((h, d) => /* @__PURE__ */ a(
      $,
      {
        name: h,
        size: r,
        style: {
          marginLeft: d > 0 ? l : 0,
          border: "2px solid white"
        }
      },
      `${h}-${d}`
    )),
    o > 0 && /* @__PURE__ */ f(
      "div",
      {
        className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-slate-200 text-slate-600",
        style: {
          width: r,
          height: r,
          fontSize: r * 0.38,
          marginLeft: l,
          border: "2px solid white"
        },
        title: `+${o} more`,
        children: [
          "+",
          o
        ]
      }
    )
  ] });
}
function ie({
  users: e,
  maxVisible: n = 5,
  size: r = 28,
  onMoreClick: t,
  className: c
}) {
  const o = e.slice(0, n), l = e.length - o.length, h = -(r * 0.3), d = Math.max(1, Math.round(r * 0.07));
  return /* @__PURE__ */ f("div", { className: u("inline-flex items-center", c), role: "list", "aria-label": "Online users", children: [
    o.map((i, p) => /* @__PURE__ */ f(
      "div",
      {
        role: "listitem",
        className: "relative shrink-0",
        title: i.name,
        "data-testid": "presence-avatar",
        "data-presence-user": i.name,
        "data-presence-user-id": i.id,
        style: {
          marginLeft: p > 0 ? h : 0
        },
        children: [
          i.avatarUrl ? /* @__PURE__ */ a(
            "img",
            {
              src: i.avatarUrl,
              alt: i.name,
              className: "rounded-full object-cover",
              style: {
                width: r,
                height: r,
                border: `${d}px solid white`
              }
            }
          ) : /* @__PURE__ */ a(
            $,
            {
              name: i.name,
              size: r,
              style: { border: `${d}px solid white` }
            }
          ),
          i.online !== void 0 && /* @__PURE__ */ a("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ a(
            F,
            {
              color: i.online ? "#22c55e" : "#94a3b8",
              size: "xs",
              "aria-label": i.online ? `${i.name} online` : `${i.name} offline`
            }
          ) })
        ]
      },
      i.id
    )),
    l > 0 && /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: t,
        disabled: !t,
        "aria-label": `${l} more users`,
        className: u(
          "inline-flex items-center justify-center rounded-full shrink-0",
          "font-semibold select-none bg-slate-200 text-slate-600",
          t && "cursor-pointer hover:bg-slate-300",
          !t && "cursor-default",
          "border-white"
        ),
        style: {
          width: r,
          height: r,
          fontSize: r * 0.34,
          marginLeft: h,
          border: `${d}px solid white`
        },
        children: [
          "+",
          l
        ]
      }
    )
  ] });
}
function A(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function V(e, n) {
  return n.split(",").map((t) => t.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function se({
  accept: e,
  maxSize: n,
  multiple: r = !1,
  onFiles: t,
  onError: c,
  disabled: o = !1,
  label: l,
  className: h,
  "data-testid": d
}) {
  const [i, p] = k(!1), [x, s] = k(null), g = B(null), v = N((m) => {
    const b = Array.from(m);
    if (!r && b.length > 1) {
      const y = "Only one file is allowed.";
      return s(y), c?.(y), null;
    }
    for (const y of b) {
      if (e && !V(y, e)) {
        const w = `"${y.name}" has an unsupported file type.`;
        return s(w), c?.(w), null;
      }
      if (n && y.size > n) {
        const w = `"${y.name}" exceeds the ${A(n)} size limit.`;
        return s(w), c?.(w), null;
      }
    }
    return s(null), b;
  }, [e, n, r, c]), I = N((m) => {
    if (m.preventDefault(), p(!1), o) return;
    const b = v(m.dataTransfer.files);
    b && t(b);
  }, [o, v, t]), S = N((m) => {
    m.preventDefault(), o || p(!0);
  }, [o]), L = N(() => {
    p(!1);
  }, []), U = N((m) => {
    if (!m.target.files || m.target.files.length === 0) return;
    const b = v(m.target.files);
    b && t(b), m.target.value = "";
  }, [v, t]), D = n ? `Up to ${A(n)}` : void 0, C = e ?? void 0;
  return /* @__PURE__ */ f("div", { className: u("flex flex-col gap-2", h), "data-testid": d, children: [
    /* @__PURE__ */ f(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": l ?? "File upload drop zone",
        "aria-disabled": o,
        onDrop: I,
        onDragOver: S,
        onDragLeave: L,
        onClick: () => !o && g.current?.click(),
        onKeyDown: (m) => {
          !o && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), g.current?.click());
        },
        className: u(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-6 py-10 text-center transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          i ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]",
          o ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"
        ),
        children: [
          /* @__PURE__ */ f(
            "svg",
            {
              width: "32",
              height: "32",
              viewBox: "0 0 32 32",
              fill: "none",
              "aria-hidden": "true",
              className: "text-[var(--color-text-tertiary)]",
              children: [
                /* @__PURE__ */ a(
                  "path",
                  {
                    d: "M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3",
                    stroke: "currentColor",
                    strokeWidth: "1.75",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ a("rect", { x: "2", y: "2", width: "28", height: "28", rx: "6", stroke: "currentColor", strokeWidth: "1.5", opacity: ".2" })
              ]
            }
          ),
          /* @__PURE__ */ f("div", { children: [
            /* @__PURE__ */ a("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: l ?? (i ? "Drop to upload" : "Drag & drop or click to upload") }),
            (C || D) && /* @__PURE__ */ a("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [C, D].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    x && /* @__PURE__ */ a(E, { variant: "error", onDismiss: () => s(null), children: x }),
    /* @__PURE__ */ a(
      "input",
      {
        ref: g,
        type: "file",
        accept: e,
        multiple: r,
        disabled: o,
        "aria-hidden": "true",
        tabIndex: -1,
        className: "hidden",
        onChange: U
      }
    )
  ] });
}
function Z(e) {
  if (e == null) return null;
  const n = new Date(e);
  if (isNaN(n.getTime())) return null;
  const t = Date.now() - n.getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function ce({
  items: e,
  onItemClick: n,
  onMarkAllRead: r,
  onClearAll: t,
  className: c,
  "data-testid": o
}) {
  const [l, h] = k("unread"), d = e.filter((s) => !s.read), i = l === "unread" ? d : e, p = d.length > 0, x = (s) => u(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    s ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-testid": o,
      className: u(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        c
      ),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ f("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            p && /* @__PURE__ */ a("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: d.length })
          ] }),
          /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
            r && p && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: r,
                className: "text-xs text-[#2563eb] bg-transparent border-none cursor-pointer hover:underline",
                children: "Mark all read"
              }
            ),
            t && e.length > 0 && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: t,
                className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
                children: "Clear all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ f("button", { type: "button", className: x(l === "unread"), onClick: () => h("unread"), children: [
            "Unread ",
            d.length > 0 && `(${d.length})`
          ] }),
          /* @__PURE__ */ a("button", { type: "button", className: x(l === "all"), onClick: () => h("all"), children: "All" })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: i.length === 0 ? /* @__PURE__ */ a(
          _,
          {
            icon: l === "unread" ? "✓" : "🔔",
            title: l === "unread" ? "All caught up" : "No notifications",
            body: l === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : i.map((s) => /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            onClick: () => n?.(s),
            className: u(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              s.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              s.icon && /* @__PURE__ */ a("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: s.icon }),
              /* @__PURE__ */ f("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ a(
                    "span",
                    {
                      className: u(
                        "text-sm leading-snug truncate",
                        s.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: s.title
                    }
                  ),
                  !s.read && /* @__PURE__ */ a(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                s.body && /* @__PURE__ */ a("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: s.body }),
                s.timestamp != null && /* @__PURE__ */ a("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: Z(s.timestamp) })
              ] })
            ]
          },
          s.id
        )) })
      ]
    }
  );
}
const H = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function q(e) {
  const n = e.trim().split(/\s+/), r = n[0] ?? "", t = n[1]?.[0] ?? "";
  return t ? `${r} ${t}.` : r;
}
const J = [1, 0.5, 0.18];
function Q({ item: e, opacity: n, dotColor: r }) {
  const t = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
  return /* @__PURE__ */ f(
    "div",
    {
      className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
      style: { opacity: n },
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: "w-[5px] h-[5px] rounded-full shrink-0",
            style: { background: r }
          }
        ),
        /* @__PURE__ */ a($, { name: e.actor, size: 17 }),
        /* @__PURE__ */ a("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: q(e.actor) }),
        /* @__PURE__ */ a("span", { className: "text-[11px] text-[#9ca3af] shrink-0", children: e.action }),
        e.ticketId && /* @__PURE__ */ a("span", { className: "text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap", children: e.ticketId }),
        /* @__PURE__ */ a(
          "span",
          {
            className: "text-[11px] text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
            title: e.subject,
            children: t
          }
        ),
        e.timeLabel && /* @__PURE__ */ a("span", { className: "text-[10px] text-[#d1d5db] shrink-0 whitespace-nowrap", children: e.timeLabel })
      ]
    }
  );
}
function de({
  items: e,
  visibleCount: n = 3,
  rotateMs: r = 4200,
  staggerMs: t = 0,
  kindColors: c,
  className: o
}) {
  const l = { ...H, ...c }, [h, d] = k(
    () => e.slice(0, n)
  ), i = B(n);
  return T(() => {
    d(e.slice(0, n)), i.current = n;
  }, [e, n]), T(() => {
    if (!r || e.length <= n) return;
    let p;
    const x = setTimeout(() => {
      p = setInterval(() => {
        if (!e.length) return;
        const s = e[i.current % e.length];
        s && (i.current = (i.current + 1) % e.length, d((g) => {
          const v = [s];
          return g[0] && v.push(g[0]), g[1] && v.push(g[1]), v.slice(0, n);
        }));
      }, r);
    }, t);
    return () => {
      clearTimeout(x), clearInterval(p);
    };
  }, [e, n, r, t]), h.length === 0 ? /* @__PURE__ */ a("div", { className: u("flex-1 flex items-center", o), children: /* @__PURE__ */ a("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ a("div", { className: u("flex-1 flex flex-col overflow-hidden", o), children: h.map((p, x) => /* @__PURE__ */ a(
    Q,
    {
      item: p,
      opacity: J[x] ?? 0.1,
      dotColor: l[p.kind ?? ""] ?? "#94a3b8"
    },
    p.id
  )) });
}
const X = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, O = {
  accent: "bg-blue-500",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  muted: "bg-slate-400"
}, Y = {
  accent: "bg-blue-400/60",
  success: "bg-emerald-400/60",
  danger: "bg-rose-400/60",
  muted: "bg-slate-400/60"
};
function z(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function ue({
  variant: e,
  value: n,
  color: r = "accent",
  "aria-label": t,
  className: c,
  "data-testid": o
}) {
  if (e === "count") {
    const l = z(n);
    return /* @__PURE__ */ a(
      "span",
      {
        "data-testid": o,
        "aria-label": t ?? `${l} items`,
        className: u(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          X[r],
          c
        ),
        children: l
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: u(
        "inline-block w-2 h-2 rounded-full shrink-0",
        O[r],
        c
      )
    }
  ) : /* @__PURE__ */ f(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: u("relative inline-flex w-2.5 h-2.5 shrink-0", c),
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": "true",
            className: u(
              "absolute inset-0 rounded-full animate-ping",
              Y[r]
            )
          }
        ),
        /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": "true",
            className: u(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              O[r]
            )
          }
        )
      ]
    }
  );
}
export {
  de as A,
  ue as B,
  se as F,
  ce as N,
  ie as P,
  F as S,
  $ as a,
  le as b,
  oe as c,
  M as d,
  G as n
};
