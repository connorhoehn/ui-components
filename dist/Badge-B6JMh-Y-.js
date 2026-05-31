import { jsx as n, jsxs as d } from "react/jsx-runtime";
import { c as u } from "./cn-B6yFEsav.js";
import { A as I } from "./Avatar-BvKIaNVE.js";
import { S as U } from "./StatusDot-BC7B1tTr.js";
import { useState as k, useRef as O, useCallback as w, useEffect as $ } from "react";
import { B as _ } from "./Banner-B8AcwPH_.js";
import { E } from "./EmptyState-D_CN3LUx.js";
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
function ae({
  checked: e,
  onChange: a,
  disabled: r = !1,
  size: t = "md",
  "aria-label": f,
  "aria-labelledby": o,
  className: s,
  style: h,
  "data-testid": c
}) {
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": f,
      "aria-labelledby": o,
      disabled: r,
      "data-testid": c,
      onClick: () => {
        r || a(!e);
      },
      className: u(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        R[t],
        e ? "bg-blue-600" : "bg-gray-300",
        r ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: h,
      children: /* @__PURE__ */ n(
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
const F = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function oe({
  state: e,
  compact: a = !1,
  withLabel: r = !0,
  labels: t,
  className: f,
  "data-testid": o = "connection-pill"
}) {
  const s = F[e], h = t?.[e] ?? s.label, c = r && !a;
  return /* @__PURE__ */ d(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": c ? void 0 : h,
      "data-testid": o,
      "data-state": e,
      className: u("inline-flex items-center gap-1.5 font-mono", f),
      children: [
        /* @__PURE__ */ n("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        c && /* @__PURE__ */ n("span", { className: u(s.colorClass, "font-semibold"), children: h })
      ]
    }
  );
}
function le({
  users: e,
  maxVisible: a = 5,
  size: r = 28,
  onMoreClick: t,
  className: f
}) {
  const o = e.slice(0, a), s = e.length - o.length, h = -(r * 0.3), c = Math.max(1, Math.round(r * 0.07));
  return /* @__PURE__ */ d("div", { className: u("inline-flex items-center", f), role: "list", "aria-label": "Online users", children: [
    o.map((i, p) => /* @__PURE__ */ d(
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
          i.avatarUrl ? /* @__PURE__ */ n(
            "img",
            {
              src: i.avatarUrl,
              alt: i.name,
              className: "rounded-full object-cover",
              style: {
                width: r,
                height: r,
                border: `${c}px solid white`
              }
            }
          ) : /* @__PURE__ */ n(
            I,
            {
              name: i.name,
              size: r,
              style: { border: `${c}px solid white` }
            }
          ),
          i.online !== void 0 && /* @__PURE__ */ n("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ n(
            U,
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
    s > 0 && /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        onClick: t,
        disabled: !t,
        "aria-label": `${s} more users`,
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
          border: `${c}px solid white`
        },
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function j(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function P(e, a) {
  return a.split(",").map((t) => t.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function se({
  accept: e,
  maxSize: a,
  multiple: r = !1,
  onFiles: t,
  onError: f,
  disabled: o = !1,
  label: s,
  className: h,
  "data-testid": c
}) {
  const [i, p] = k(!1), [b, l] = k(null), g = O(null), v = w((m) => {
    const x = Array.from(m);
    if (!r && x.length > 1) {
      const y = "Only one file is allowed.";
      return l(y), f?.(y), null;
    }
    for (const y of x) {
      if (e && !P(y, e)) {
        const N = `"${y.name}" has an unsupported file type.`;
        return l(N), f?.(N), null;
      }
      if (a && y.size > a) {
        const N = `"${y.name}" exceeds the ${j(a)} size limit.`;
        return l(N), f?.(N), null;
      }
    }
    return l(null), x;
  }, [e, a, r, f]), A = w((m) => {
    if (m.preventDefault(), p(!1), o) return;
    const x = v(m.dataTransfer.files);
    x && t(x);
  }, [o, v, t]), B = w((m) => {
    m.preventDefault(), o || p(!0);
  }, [o]), S = w(() => {
    p(!1);
  }, []), L = w((m) => {
    if (!m.target.files || m.target.files.length === 0) return;
    const x = v(m.target.files);
    x && t(x), m.target.value = "";
  }, [v, t]), C = a ? `Up to ${j(a)}` : void 0, D = e ?? void 0;
  return /* @__PURE__ */ d("div", { className: u("flex flex-col gap-2", h), "data-testid": c, children: [
    /* @__PURE__ */ d(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": s ?? "File upload drop zone",
        "aria-disabled": o,
        onDrop: A,
        onDragOver: B,
        onDragLeave: S,
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
          /* @__PURE__ */ d(
            "svg",
            {
              width: "32",
              height: "32",
              viewBox: "0 0 32 32",
              fill: "none",
              "aria-hidden": "true",
              className: "text-[var(--color-text-tertiary)]",
              children: [
                /* @__PURE__ */ n(
                  "path",
                  {
                    d: "M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3",
                    stroke: "currentColor",
                    strokeWidth: "1.75",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ n("rect", { x: "2", y: "2", width: "28", height: "28", rx: "6", stroke: "currentColor", strokeWidth: "1.5", opacity: ".2" })
              ]
            }
          ),
          /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ n("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: s ?? (i ? "Drop to upload" : "Drag & drop or click to upload") }),
            (D || C) && /* @__PURE__ */ n("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [D, C].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    b && /* @__PURE__ */ n(_, { variant: "error", onDismiss: () => l(null), children: b }),
    /* @__PURE__ */ n(
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
        onChange: L
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
function ie({
  items: e,
  onItemClick: a,
  onMarkAllRead: r,
  onClearAll: t,
  className: f,
  "data-testid": o
}) {
  const [s, h] = k("unread"), c = e.filter((l) => !l.read), i = s === "unread" ? c : e, p = c.length > 0, b = (l) => u(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    l ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ d(
    "div",
    {
      "data-testid": o,
      className: u(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        f
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ d("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            p && /* @__PURE__ */ n("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: c.length })
          ] }),
          /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
            r && p && /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: r,
                className: "text-xs text-[#2563eb] bg-transparent border-none cursor-pointer hover:underline",
                children: "Mark all read"
              }
            ),
            t && e.length > 0 && /* @__PURE__ */ n(
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
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ d("button", { type: "button", className: b(s === "unread"), onClick: () => h("unread"), children: [
            "Unread ",
            c.length > 0 && `(${c.length})`
          ] }),
          /* @__PURE__ */ n("button", { type: "button", className: b(s === "all"), onClick: () => h("all"), children: "All" })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: i.length === 0 ? /* @__PURE__ */ n(
          E,
          {
            icon: s === "unread" ? "✓" : "🔔",
            title: s === "unread" ? "All caught up" : "No notifications",
            body: s === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : i.map((l) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => a?.(l),
            className: u(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              l.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              l.icon && /* @__PURE__ */ n("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: l.icon }),
              /* @__PURE__ */ d("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ d("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: u(
                        "text-sm leading-snug truncate",
                        l.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: l.title
                    }
                  ),
                  !l.read && /* @__PURE__ */ n(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                l.body && /* @__PURE__ */ n("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: l.body }),
                l.timestamp != null && /* @__PURE__ */ n("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: G(l.timestamp) })
              ] })
            ]
          },
          l.id
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
function M(e) {
  const a = e.trim().split(/\s+/), r = a[0] ?? "", t = a[1]?.[0] ?? "";
  return t ? `${r} ${t}.` : r;
}
const V = [1, 0.5, 0.18];
function Z({ item: e, opacity: a, dotColor: r }) {
  const t = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
      style: { opacity: a },
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "w-[5px] h-[5px] rounded-full shrink-0",
            style: { background: r }
          }
        ),
        /* @__PURE__ */ n(I, { name: e.actor, size: 17 }),
        /* @__PURE__ */ n("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: M(e.actor) }),
        /* @__PURE__ */ n("span", { className: "text-[11px] text-[#9ca3af] shrink-0", children: e.action }),
        e.ticketId && /* @__PURE__ */ n("span", { className: "text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap", children: e.ticketId }),
        /* @__PURE__ */ n(
          "span",
          {
            className: "text-[11px] text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
            title: e.subject,
            children: t
          }
        ),
        e.timeLabel && /* @__PURE__ */ n("span", { className: "text-[10px] text-[#d1d5db] shrink-0 whitespace-nowrap", children: e.timeLabel })
      ]
    }
  );
}
function ce({
  items: e,
  visibleCount: a = 3,
  rotateMs: r = 4200,
  staggerMs: t = 0,
  kindColors: f,
  className: o
}) {
  const s = { ...H, ...f }, [h, c] = k(
    () => e.slice(0, a)
  ), i = O(a);
  return $(() => {
    c(e.slice(0, a)), i.current = a;
  }, [e, a]), $(() => {
    if (!r || e.length <= a) return;
    let p;
    const b = setTimeout(() => {
      p = setInterval(() => {
        if (!e.length) return;
        const l = e[i.current % e.length];
        l && (i.current = (i.current + 1) % e.length, c((g) => {
          const v = [l];
          return g[0] && v.push(g[0]), g[1] && v.push(g[1]), v.slice(0, a);
        }));
      }, r);
    }, t);
    return () => {
      clearTimeout(b), clearInterval(p);
    };
  }, [e, a, r, t]), h.length === 0 ? /* @__PURE__ */ n("div", { className: u("flex-1 flex items-center", o), children: /* @__PURE__ */ n("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ n("div", { className: u("flex-1 flex flex-col overflow-hidden", o), children: h.map((p, b) => /* @__PURE__ */ n(
    Z,
    {
      item: p,
      opacity: V[b] ?? 0.1,
      dotColor: s[p.kind ?? ""] ?? "#94a3b8"
    },
    p.id
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
function de({
  variant: e,
  value: a,
  color: r = "accent",
  "aria-label": t,
  className: f,
  "data-testid": o
}) {
  if (e === "count") {
    const s = Q(a);
    return /* @__PURE__ */ n(
      "span",
      {
        "data-testid": o,
        "aria-label": t ?? `${s} items`,
        className: u(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          q[r],
          f
        ),
        children: s
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ n(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: u(
        "inline-block w-2 h-2 rounded-full shrink-0",
        T[r],
        f
      )
    }
  ) : /* @__PURE__ */ d(
    "span",
    {
      "data-testid": o,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: u("relative inline-flex w-2.5 h-2.5 shrink-0", f),
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": "true",
            className: u(
              "absolute inset-0 rounded-full animate-ping",
              J[r]
            )
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": "true",
            className: u(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              T[r]
            )
          }
        )
      ]
    }
  );
}
export {
  ce as A,
  de as B,
  oe as C,
  se as F,
  ie as N,
  le as P,
  ae as S
};
