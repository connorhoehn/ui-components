import { jsx as n, jsxs as d } from "react/jsx-runtime";
import { c as i } from "./cn-B6yFEsav.js";
import { A as w } from "./Avatar-BvKIaNVE.js";
import { S as y } from "./StatusDot-BC7B1tTr.js";
import { useState as v, useRef as k, useEffect as g } from "react";
import { E as S } from "./EmptyState-PM9wTjxk.js";
const j = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, T = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, $ = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function F({
  checked: e,
  onChange: a,
  disabled: r = !1,
  size: t = "md",
  "aria-label": f,
  "aria-labelledby": u,
  className: s,
  style: p,
  "data-testid": c
}) {
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": f,
      "aria-labelledby": u,
      disabled: r,
      "data-testid": c,
      onClick: () => {
        r || a(!e);
      },
      className: i(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        j[t],
        e ? "bg-blue-600" : "bg-gray-300",
        r ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: p,
      children: /* @__PURE__ */ n(
        "span",
        {
          className: i(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            T[t],
            e ? $[t] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
function Z({
  users: e,
  maxVisible: a = 5,
  size: r = 28,
  onMoreClick: t,
  className: f
}) {
  const u = e.slice(0, a), s = e.length - u.length, p = -(r * 0.3), c = Math.max(1, Math.round(r * 0.07));
  return /* @__PURE__ */ d("div", { className: i("inline-flex items-center", f), role: "list", "aria-label": "Online users", children: [
    u.map((l, b) => /* @__PURE__ */ d(
      "div",
      {
        role: "listitem",
        className: "relative shrink-0",
        title: l.name,
        "data-testid": "presence-avatar",
        "data-presence-user": l.name,
        "data-presence-user-id": l.id,
        style: {
          marginLeft: b > 0 ? p : 0
        },
        children: [
          l.avatarUrl ? /* @__PURE__ */ n(
            "img",
            {
              src: l.avatarUrl,
              alt: l.name,
              className: "rounded-full object-cover",
              style: {
                width: r,
                height: r,
                border: `${c}px solid white`
              }
            }
          ) : /* @__PURE__ */ n(
            w,
            {
              name: l.name,
              size: r,
              style: { border: `${c}px solid white` }
            }
          ),
          l.online !== void 0 && /* @__PURE__ */ n("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ n(
            y,
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
    s > 0 && /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        onClick: t,
        disabled: !t,
        "aria-label": `${s} more users`,
        className: i(
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
          marginLeft: p,
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
function A(e) {
  if (e == null) return null;
  const a = new Date(e);
  if (isNaN(a.getTime())) return null;
  const t = Date.now() - a.getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function V({
  items: e,
  onItemClick: a,
  onMarkAllRead: r,
  onClearAll: t,
  className: f,
  "data-testid": u
}) {
  const [s, p] = v("unread"), c = e.filter((o) => !o.read), l = s === "unread" ? c : e, b = c.length > 0, h = (o) => i(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ d(
    "div",
    {
      "data-testid": u,
      className: i(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        f
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ d("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            b && /* @__PURE__ */ n("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: c.length })
          ] }),
          /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
            r && b && /* @__PURE__ */ n(
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
          /* @__PURE__ */ d("button", { type: "button", className: h(s === "unread"), onClick: () => p("unread"), children: [
            "Unread ",
            c.length > 0 && `(${c.length})`
          ] }),
          /* @__PURE__ */ n("button", { type: "button", className: h(s === "all"), onClick: () => p("all"), children: "All" })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: l.length === 0 ? /* @__PURE__ */ n(
          S,
          {
            icon: s === "unread" ? "✓" : "🔔",
            title: s === "unread" ? "All caught up" : "No notifications",
            body: s === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : l.map((o) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => a?.(o),
            className: i(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              o.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              o.icon && /* @__PURE__ */ n("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: o.icon }),
              /* @__PURE__ */ d("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ d("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: i(
                        "text-sm leading-snug truncate",
                        o.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: o.title
                    }
                  ),
                  !o.read && /* @__PURE__ */ n(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                o.body && /* @__PURE__ */ n("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: o.body }),
                o.timestamp != null && /* @__PURE__ */ n("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: A(o.timestamp) })
              ] })
            ]
          },
          o.id
        )) })
      ]
    }
  );
}
const I = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function E(e) {
  const a = e.trim().split(/\s+/), r = a[0] ?? "", t = a[1]?.[0] ?? "";
  return t ? `${r} ${t}.` : r;
}
const O = [1, 0.5, 0.18];
function _({ item: e, opacity: a, dotColor: r }) {
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
        /* @__PURE__ */ n(w, { name: e.actor, size: 17 }),
        /* @__PURE__ */ n("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: E(e.actor) }),
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
function W({
  items: e,
  visibleCount: a = 3,
  rotateMs: r = 4200,
  staggerMs: t = 0,
  kindColors: f,
  className: u
}) {
  const s = { ...I, ...f }, [p, c] = v(
    () => e.slice(0, a)
  ), l = k(a);
  return g(() => {
    c(e.slice(0, a)), l.current = a;
  }, [e, a]), g(() => {
    if (!r || e.length <= a) return;
    let b;
    const h = setTimeout(() => {
      b = setInterval(() => {
        if (!e.length) return;
        const o = e[l.current % e.length];
        o && (l.current = (l.current + 1) % e.length, c((m) => {
          const x = [o];
          return m[0] && x.push(m[0]), m[1] && x.push(m[1]), x.slice(0, a);
        }));
      }, r);
    }, t);
    return () => {
      clearTimeout(h), clearInterval(b);
    };
  }, [e, a, r, t]), p.length === 0 ? /* @__PURE__ */ n("div", { className: i("flex-1 flex items-center", u), children: /* @__PURE__ */ n("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ n("div", { className: i("flex-1 flex flex-col overflow-hidden", u), children: p.map((b, h) => /* @__PURE__ */ n(
    _,
    {
      item: b,
      opacity: O[h] ?? 0.1,
      dotColor: s[b.kind ?? ""] ?? "#94a3b8"
    },
    b.id
  )) });
}
const U = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, N = {
  accent: "bg-blue-500",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  muted: "bg-slate-400"
}, R = {
  accent: "bg-blue-400/60",
  success: "bg-emerald-400/60",
  danger: "bg-rose-400/60",
  muted: "bg-slate-400/60"
};
function B(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function q({
  variant: e,
  value: a,
  color: r = "accent",
  "aria-label": t,
  className: f,
  "data-testid": u
}) {
  if (e === "count") {
    const s = B(a);
    return /* @__PURE__ */ n(
      "span",
      {
        "data-testid": u,
        "aria-label": t ?? `${s} items`,
        className: i(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          U[r],
          f
        ),
        children: s
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ n(
    "span",
    {
      "data-testid": u,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: i(
        "inline-block w-2 h-2 rounded-full shrink-0",
        N[r],
        f
      )
    }
  ) : /* @__PURE__ */ d(
    "span",
    {
      "data-testid": u,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: i("relative inline-flex w-2.5 h-2.5 shrink-0", f),
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": "true",
            className: i(
              "absolute inset-0 rounded-full animate-ping",
              R[r]
            )
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": "true",
            className: i(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              N[r]
            )
          }
        )
      ]
    }
  );
}
export {
  W as A,
  q as B,
  V as N,
  Z as P,
  F as S
};
