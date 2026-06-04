import { jsx as r, jsxs as c } from "react/jsx-runtime";
import { c as d } from "./cn-B6yFEsav.js";
import { A as T } from "./Avatar-BvKIaNVE.js";
import { S as U } from "./StatusDot-BC7B1tTr.js";
import { useState as k, useRef as A, useCallback as w, useEffect as j } from "react";
import { B as _ } from "./Banner-DKb3JiLs.js";
import { E } from "./EmptyState-PM9wTjxk.js";
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
function ne({
  checked: e,
  onChange: a,
  disabled: n = !1,
  size: t = "md",
  "aria-label": u,
  "aria-labelledby": l,
  className: s,
  style: m,
  "data-testid": f
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": u,
      "aria-labelledby": l,
      disabled: n,
      "data-testid": f,
      onClick: () => {
        n || a(!e);
      },
      className: d(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        R[t],
        e ? "bg-blue-600" : "bg-gray-300",
        n ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: m,
      children: /* @__PURE__ */ r(
        "span",
        {
          className: d(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            W[t],
            e ? K[t] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
function ae({
  users: e,
  maxVisible: a = 5,
  size: n = 28,
  onMoreClick: t,
  className: u
}) {
  const l = e.slice(0, a), s = e.length - l.length, m = -(n * 0.3), f = Math.max(1, Math.round(n * 0.07));
  return /* @__PURE__ */ c("div", { className: d("inline-flex items-center", u), role: "list", "aria-label": "Online users", children: [
    l.map((i, h) => /* @__PURE__ */ c(
      "div",
      {
        role: "listitem",
        className: "relative shrink-0",
        title: i.name,
        "data-testid": "presence-avatar",
        "data-presence-user": i.name,
        "data-presence-user-id": i.id,
        style: {
          marginLeft: h > 0 ? m : 0
        },
        children: [
          i.avatarUrl ? /* @__PURE__ */ r(
            "img",
            {
              src: i.avatarUrl,
              alt: i.name,
              className: "rounded-full object-cover",
              style: {
                width: n,
                height: n,
                border: `${f}px solid white`
              }
            }
          ) : /* @__PURE__ */ r(
            T,
            {
              name: i.name,
              size: n,
              style: { border: `${f}px solid white` }
            }
          ),
          i.online !== void 0 && /* @__PURE__ */ r("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ r(
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
    s > 0 && /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: t,
        disabled: !t,
        "aria-label": `${s} more users`,
        className: d(
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
          marginLeft: m,
          border: `${f}px solid white`
        },
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function B(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function F(e, a) {
  return a.split(",").map((t) => t.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function oe({
  accept: e,
  maxSize: a,
  multiple: n = !1,
  onFiles: t,
  onError: u,
  disabled: l = !1,
  label: s,
  className: m,
  "data-testid": f
}) {
  const [i, h] = k(!1), [x, o] = k(null), g = A(null), v = w((p) => {
    const b = Array.from(p);
    if (!n && b.length > 1) {
      const y = "Only one file is allowed.";
      return o(y), u?.(y), null;
    }
    for (const y of b) {
      if (e && !F(y, e)) {
        const N = `"${y.name}" has an unsupported file type.`;
        return o(N), u?.(N), null;
      }
      if (a && y.size > a) {
        const N = `"${y.name}" exceeds the ${B(a)} size limit.`;
        return o(N), u?.(N), null;
      }
    }
    return o(null), b;
  }, [e, a, n, u]), C = w((p) => {
    if (p.preventDefault(), h(!1), l) return;
    const b = v(p.dataTransfer.files);
    b && t(b);
  }, [l, v, t]), I = w((p) => {
    p.preventDefault(), l || h(!0);
  }, [l]), S = w(() => {
    h(!1);
  }, []), L = w((p) => {
    if (!p.target.files || p.target.files.length === 0) return;
    const b = v(p.target.files);
    b && t(b), p.target.value = "";
  }, [v, t]), D = a ? `Up to ${B(a)}` : void 0, $ = e ?? void 0;
  return /* @__PURE__ */ c("div", { className: d("flex flex-col gap-2", m), "data-testid": f, children: [
    /* @__PURE__ */ c(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": s ?? "File upload drop zone",
        "aria-disabled": l,
        onDrop: C,
        onDragOver: I,
        onDragLeave: S,
        onClick: () => !l && g.current?.click(),
        onKeyDown: (p) => {
          !l && (p.key === "Enter" || p.key === " ") && (p.preventDefault(), g.current?.click());
        },
        className: d(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-6 py-10 text-center transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          i ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]",
          l ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"
        ),
        children: [
          /* @__PURE__ */ c(
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
          /* @__PURE__ */ c("div", { children: [
            /* @__PURE__ */ r("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: s ?? (i ? "Drop to upload" : "Drag & drop or click to upload") }),
            ($ || D) && /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [$, D].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    x && /* @__PURE__ */ r(_, { variant: "error", onDismiss: () => o(null), children: x }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: g,
        type: "file",
        accept: e,
        multiple: n,
        disabled: l,
        "aria-hidden": "true",
        tabIndex: -1,
        className: "hidden",
        onChange: L
      }
    )
  ] });
}
function P(e) {
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
  className: u,
  "data-testid": l
}) {
  const [s, m] = k("unread"), f = e.filter((o) => !o.read), i = s === "unread" ? f : e, h = f.length > 0, x = (o) => d(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": l,
      className: d(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        u
      ),
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ c("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            h && /* @__PURE__ */ r("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: f.length })
          ] }),
          /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
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
        /* @__PURE__ */ c("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ c("button", { type: "button", className: x(s === "unread"), onClick: () => m("unread"), children: [
            "Unread ",
            f.length > 0 && `(${f.length})`
          ] }),
          /* @__PURE__ */ r("button", { type: "button", className: x(s === "all"), onClick: () => m("all"), children: "All" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: i.length === 0 ? /* @__PURE__ */ r(
          E,
          {
            icon: s === "unread" ? "✓" : "🔔",
            title: s === "unread" ? "All caught up" : "No notifications",
            body: s === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : i.map((o) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => a?.(o),
            className: d(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              o.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              o.icon && /* @__PURE__ */ r("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: o.icon }),
              /* @__PURE__ */ c("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ r(
                    "span",
                    {
                      className: d(
                        "text-sm leading-snug truncate",
                        o.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: o.title
                    }
                  ),
                  !o.read && /* @__PURE__ */ r(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                o.body && /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: o.body }),
                o.timestamp != null && /* @__PURE__ */ r("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: P(o.timestamp) })
              ] })
            ]
          },
          o.id
        )) })
      ]
    }
  );
}
const G = {
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
  return /* @__PURE__ */ c(
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
        /* @__PURE__ */ r(T, { name: e.actor, size: 17 }),
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
  kindColors: u,
  className: l
}) {
  const s = { ...G, ...u }, [m, f] = k(
    () => e.slice(0, a)
  ), i = A(a);
  return j(() => {
    f(e.slice(0, a)), i.current = a;
  }, [e, a]), j(() => {
    if (!n || e.length <= a) return;
    let h;
    const x = setTimeout(() => {
      h = setInterval(() => {
        if (!e.length) return;
        const o = e[i.current % e.length];
        o && (i.current = (i.current + 1) % e.length, f((g) => {
          const v = [o];
          return g[0] && v.push(g[0]), g[1] && v.push(g[1]), v.slice(0, a);
        }));
      }, n);
    }, t);
    return () => {
      clearTimeout(x), clearInterval(h);
    };
  }, [e, a, n, t]), m.length === 0 ? /* @__PURE__ */ r("div", { className: d("flex-1 flex items-center", l), children: /* @__PURE__ */ r("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ r("div", { className: d("flex-1 flex flex-col overflow-hidden", l), children: m.map((h, x) => /* @__PURE__ */ r(
    V,
    {
      item: h,
      opacity: M[x] ?? 0.1,
      dotColor: s[h.kind ?? ""] ?? "#94a3b8"
    },
    h.id
  )) });
}
const Z = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, O = {
  accent: "bg-blue-500",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  muted: "bg-slate-400"
}, q = {
  accent: "bg-blue-400/60",
  success: "bg-emerald-400/60",
  danger: "bg-rose-400/60",
  muted: "bg-slate-400/60"
};
function J(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function se({
  variant: e,
  value: a,
  color: n = "accent",
  "aria-label": t,
  className: u,
  "data-testid": l
}) {
  if (e === "count") {
    const s = J(a);
    return /* @__PURE__ */ r(
      "span",
      {
        "data-testid": l,
        "aria-label": t ?? `${s} items`,
        className: d(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          Z[n],
          u
        ),
        children: s
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ r(
    "span",
    {
      "data-testid": l,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: d(
        "inline-block w-2 h-2 rounded-full shrink-0",
        O[n],
        u
      )
    }
  ) : /* @__PURE__ */ c(
    "span",
    {
      "data-testid": l,
      "aria-label": t,
      role: t ? "img" : void 0,
      className: d("relative inline-flex w-2.5 h-2.5 shrink-0", u),
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: d(
              "absolute inset-0 rounded-full animate-ping",
              q[n]
            )
          }
        ),
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: d(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              O[n]
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
  ne as S
};
