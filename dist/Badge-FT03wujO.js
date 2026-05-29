import { jsx as r, jsxs as f } from "react/jsx-runtime";
import { c } from "./cn-B6yFEsav.js";
import { A as B } from "./Avatar-Q-j4vnWn.js";
import { useState as k, useRef as C, useCallback as w, useEffect as j } from "react";
import { B as _ } from "./Banner-B8AcwPH_.js";
import { E } from "./EmptyState-PM9wTjxk.js";
const L = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, R = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, W = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function ne({
  checked: e,
  onChange: a,
  disabled: n = !1,
  size: t = "md",
  "aria-label": d,
  "aria-labelledby": o,
  className: s,
  style: p,
  "data-testid": u
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": d,
      "aria-labelledby": o,
      disabled: n,
      "data-testid": u,
      onClick: () => {
        n || a(!e);
      },
      className: c(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        L[t],
        e ? "bg-blue-600" : "bg-gray-300",
        n ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: p,
      children: /* @__PURE__ */ r(
        "span",
        {
          className: c(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            R[t],
            e ? W[t] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
const K = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5"
};
function F({
  color: e,
  pulse: a = !1,
  size: n = "sm",
  label: t,
  className: d,
  style: o,
  title: s,
  "data-testid": p,
  "aria-label": u
}) {
  const l = e ?? "var(--color-text-tertiary)", h = /* @__PURE__ */ r(
    "span",
    {
      "aria-hidden": t != null ? !0 : void 0,
      "aria-label": t == null ? u : void 0,
      className: c(
        "inline-block rounded-full shrink-0",
        K[n],
        a && "animate-pulse"
      ),
      style: { background: l }
    }
  );
  return t == null ? /* @__PURE__ */ r(
    "span",
    {
      "data-testid": p,
      title: s,
      className: c("inline-flex items-center", d),
      style: o,
      children: h
    }
  ) : /* @__PURE__ */ f(
    "span",
    {
      "data-testid": p,
      title: s,
      "aria-label": u,
      className: c("inline-flex items-center", d),
      style: o,
      children: [
        h,
        /* @__PURE__ */ r("span", { className: "ml-1.5 text-[11px] text-[var(--color-text-secondary)]", children: t })
      ]
    }
  );
}
function ae({
  users: e,
  maxVisible: a = 5,
  size: n = 28,
  onMoreClick: t,
  className: d
}) {
  const o = e.slice(0, a), s = e.length - o.length, p = -(n * 0.3), u = Math.max(1, Math.round(n * 0.07));
  return /* @__PURE__ */ f("div", { className: c("inline-flex items-center", d), role: "list", "aria-label": "Online users", children: [
    o.map((l, h) => /* @__PURE__ */ f(
      "div",
      {
        role: "listitem",
        className: "relative shrink-0",
        title: l.name,
        "data-testid": "presence-avatar",
        "data-presence-user": l.name,
        "data-presence-user-id": l.id,
        style: {
          marginLeft: h > 0 ? p : 0
        },
        children: [
          l.avatarUrl ? /* @__PURE__ */ r(
            "img",
            {
              src: l.avatarUrl,
              alt: l.name,
              className: "rounded-full object-cover",
              style: {
                width: n,
                height: n,
                border: `${u}px solid white`
              }
            }
          ) : /* @__PURE__ */ r(
            B,
            {
              name: l.name,
              size: n,
              style: { border: `${u}px solid white` }
            }
          ),
          l.online !== void 0 && /* @__PURE__ */ r("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ r(
            F,
            {
              color: l.online ? "#22c55e" : "#94a3b8",
              size: "xs",
              "aria-label": l.online ? `${l.name} online` : `${l.name} offline`
            }
          ) })
        ]
      },
      l.id
    )),
    s > 0 && /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: t,
        disabled: !t,
        "aria-label": `${s} more users`,
        className: c(
          "inline-flex items-center justify-center rounded-full shrink-0",
          "font-semibold select-none bg-slate-200 text-slate-600",
          t && "cursor-pointer hover:bg-slate-300",
          !t && "cursor-default",
          "border-white"
        ),
        style: {
          width: n,
          height: n,
          fontSize: n * 0.34,
          marginLeft: p,
          border: `${u}px solid white`
        },
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function O(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function P(e, a) {
  return a.split(",").map((t) => t.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function oe({
  accept: e,
  maxSize: a,
  multiple: n = !1,
  onFiles: t,
  onError: d,
  disabled: o = !1,
  label: s,
  className: p,
  "data-testid": u
}) {
  const [l, h] = k(!1), [x, i] = k(null), g = C(null), v = w((m) => {
    const b = Array.from(m);
    if (!n && b.length > 1) {
      const y = "Only one file is allowed.";
      return i(y), d?.(y), null;
    }
    for (const y of b) {
      if (e && !P(y, e)) {
        const N = `"${y.name}" has an unsupported file type.`;
        return i(N), d?.(N), null;
      }
      if (a && y.size > a) {
        const N = `"${y.name}" exceeds the ${O(a)} size limit.`;
        return i(N), d?.(N), null;
      }
    }
    return i(null), b;
  }, [e, a, n, d]), A = w((m) => {
    if (m.preventDefault(), h(!1), o) return;
    const b = v(m.dataTransfer.files);
    b && t(b);
  }, [o, v, t]), I = w((m) => {
    m.preventDefault(), o || h(!0);
  }, [o]), S = w(() => {
    h(!1);
  }, []), U = w((m) => {
    if (!m.target.files || m.target.files.length === 0) return;
    const b = v(m.target.files);
    b && t(b), m.target.value = "";
  }, [v, t]), D = a ? `Up to ${O(a)}` : void 0, $ = e ?? void 0;
  return /* @__PURE__ */ f("div", { className: c("flex flex-col gap-2", p), "data-testid": u, children: [
    /* @__PURE__ */ f(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": s ?? "File upload drop zone",
        "aria-disabled": o,
        onDrop: A,
        onDragOver: I,
        onDragLeave: S,
        onClick: () => !o && g.current?.click(),
        onKeyDown: (m) => {
          !o && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), g.current?.click());
        },
        className: c(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-6 py-10 text-center transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          l ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]",
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
                /* @__PURE__ */ r(
                  "path",
                  {
                    d: "M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3",
                    stroke: "currentColor",
                    strokeWidth: "1.75",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ r("rect", { x: "2", y: "2", width: "28", height: "28", rx: "6", stroke: "currentColor", strokeWidth: "1.5", opacity: ".2" })
              ]
            }
          ),
          /* @__PURE__ */ f("div", { children: [
            /* @__PURE__ */ r("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: s ?? (l ? "Drop to upload" : "Drag & drop or click to upload") }),
            ($ || D) && /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [$, D].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    x && /* @__PURE__ */ r(_, { variant: "error", onDismiss: () => i(null), children: x }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: g,
        type: "file",
        accept: e,
        multiple: n,
        disabled: o,
        "aria-hidden": "true",
        tabIndex: -1,
        className: "hidden",
        onChange: U
      }
    )
  ] });
}
function G(e) {
  if (e == null) return null;
  const a = new Date(e);
  if (isNaN(a.getTime())) return null;
  const t = Date.now() - a.getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function le({
  items: e,
  onItemClick: a,
  onMarkAllRead: n,
  onClearAll: t,
  className: d,
  "data-testid": o
}) {
  const [s, p] = k("unread"), u = e.filter((i) => !i.read), l = s === "unread" ? u : e, h = u.length > 0, x = (i) => c(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    i ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-testid": o,
      className: c(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        d
      ),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ f("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            h && /* @__PURE__ */ r("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: u.length })
          ] }),
          /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
            n && h && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: n,
                className: "text-xs text-[#2563eb] bg-transparent border-none cursor-pointer hover:underline",
                children: "Mark all read"
              }
            ),
            t && e.length > 0 && /* @__PURE__ */ r(
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
          /* @__PURE__ */ f("button", { type: "button", className: x(s === "unread"), onClick: () => p("unread"), children: [
            "Unread ",
            u.length > 0 && `(${u.length})`
          ] }),
          /* @__PURE__ */ r("button", { type: "button", className: x(s === "all"), onClick: () => p("all"), children: "All" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: l.length === 0 ? /* @__PURE__ */ r(
          E,
          {
            icon: s === "unread" ? "✓" : "🔔",
            title: s === "unread" ? "All caught up" : "No notifications",
            body: s === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : l.map((i) => /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            onClick: () => a?.(i),
            className: c(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              i.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              i.icon && /* @__PURE__ */ r("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: i.icon }),
              /* @__PURE__ */ f("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ r(
                    "span",
                    {
                      className: c(
                        "text-sm leading-snug truncate",
                        i.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: i.title
                    }
                  ),
                  !i.read && /* @__PURE__ */ r(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                i.body && /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: i.body }),
                i.timestamp != null && /* @__PURE__ */ r("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: G(i.timestamp) })
              ] })
            ]
          },
          i.id
        )) })
      ]
    }
  );
}
const Z = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function H(e) {
  const a = e.trim().split(/\s+/), n = a[0] ?? "", t = a[1]?.[0] ?? "";
  return t ? `${n} ${t}.` : n;
}
const M = [1, 0.5, 0.18];
function V({ item: e, opacity: a, dotColor: n }) {
  const t = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
  return /* @__PURE__ */ f(
    "div",
    {
      className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
      style: { opacity: a },
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "w-[5px] h-[5px] rounded-full shrink-0",
            style: { background: n }
          }
        ),
        /* @__PURE__ */ r(B, { name: e.actor, size: 17 }),
        /* @__PURE__ */ r("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: H(e.actor) }),
        /* @__PURE__ */ r("span", { className: "text-[11px] text-[#9ca3af] shrink-0", children: e.action }),
        e.ticketId && /* @__PURE__ */ r("span", { className: "text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap", children: e.ticketId }),
        /* @__PURE__ */ r(
          "span",
          {
            className: "text-[11px] text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
            title: e.subject,
            children: t
          }
        ),
        e.timeLabel && /* @__PURE__ */ r("span", { className: "text-[10px] text-[#d1d5db] shrink-0 whitespace-nowrap", children: e.timeLabel })
      ]
    }
  );
}
function ie({
  items: e,
  visibleCount: a = 3,
  rotateMs: n = 4200,
  staggerMs: t = 0,
  kindColors: d,
  className: o
}) {
  const s = { ...Z, ...d }, [p, u] = k(
    () => e.slice(0, a)
  ), l = C(a);
  return j(() => {
    u(e.slice(0, a)), l.current = a;
  }, [e, a]), j(() => {
    if (!n || e.length <= a) return;
    let h;
    const x = setTimeout(() => {
      h = setInterval(() => {
        if (!e.length) return;
        const i = e[l.current % e.length];
        i && (l.current = (l.current + 1) % e.length, u((g) => {
          const v = [i];
          return g[0] && v.push(g[0]), g[1] && v.push(g[1]), v.slice(0, a);
        }));
      }, n);
    }, t);
    return () => {
      clearTimeout(x), clearInterval(h);
    };
  }, [e, a, n, t]), p.length === 0 ? /* @__PURE__ */ r("div", { className: c("flex-1 flex items-center", o), children: /* @__PURE__ */ r("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ r("div", { className: c("flex-1 flex flex-col overflow-hidden", o), children: p.map((h, x) => /* @__PURE__ */ r(
    V,
    {
      item: h,
      opacity: M[x] ?? 0.1,
      dotColor: s[h.kind ?? ""] ?? "#94a3b8"
    },
    h.id
  )) });
}
const q = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, T = {
  accent: "bg-blue-500",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  muted: "bg-slate-400"
}, J = {
  accent: "bg-blue-400/60",
  success: "bg-emerald-400/60",
  danger: "bg-rose-400/60",
  muted: "bg-slate-400/60"
};
function Q(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function se({
  variant: e,
  value: a,
  color: n = "accent",
  "aria-label": t,
  className: d,
  "data-testid": o
}) {
  if (e === "count") {
    const s = Q(a);
    return /* @__PURE__ */ r(
      "span",
      {
        "data-testid": o,
        "aria-label": t ?? `${s} items`,
        className: c(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          q[n],
          d
        ),
        children: s
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ r(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: c(
        "inline-block w-2 h-2 rounded-full shrink-0",
        T[n],
        d
      )
    }
  ) : /* @__PURE__ */ f(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: c("relative inline-flex w-2.5 h-2.5 shrink-0", d),
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: c(
              "absolute inset-0 rounded-full animate-ping",
              J[n]
            )
          }
        ),
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: c(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              T[n]
            )
          }
        )
      ]
    }
  );
}
export {
  ie as A,
  se as B,
  oe as F,
  le as N,
  ae as P,
  F as S,
  ne as a
};
