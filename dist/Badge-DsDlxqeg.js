import { jsx as t, jsxs as d, Fragment as E } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
import { A as j } from "./Avatar-DIEPZUB9.js";
import { S as O } from "./StatusDot-BC7B1tTr.js";
import { useState as A, useRef as _, useEffect as C } from "react";
import { E as D } from "./EmptyState-D_CN3LUx.js";
const R = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, P = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, B = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function ne({
  checked: e,
  onChange: l,
  disabled: a = !1,
  size: n = "md",
  "aria-label": u,
  "aria-labelledby": f,
  className: i,
  style: b,
  "data-testid": c
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": u,
      "aria-labelledby": f,
      disabled: a,
      "data-testid": c,
      onClick: () => {
        a || l(!e);
      },
      className: s(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        R[n],
        e ? "bg-blue-600" : "bg-gray-300",
        a ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        i
      ),
      style: b,
      children: /* @__PURE__ */ t(
        "span",
        {
          className: s(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            P[n],
            e ? B[n] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
const U = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function ae({
  state: e,
  compact: l = !1,
  withLabel: a = !0,
  labels: n,
  className: u,
  "data-testid": f = "connection-pill"
}) {
  const i = U[e], b = n?.[e] ?? i.label, c = a && !l;
  return /* @__PURE__ */ d(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": c ? void 0 : b,
      "data-testid": f,
      "data-state": e,
      className: s("inline-flex items-center gap-1.5 font-mono", u),
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: i.colorClass, children: "⬤" }),
        c && /* @__PURE__ */ t("span", { className: s(i.colorClass, "font-semibold"), children: b })
      ]
    }
  );
}
const F = {
  editor: { glyph: "✏", label: "Editing" },
  // pencil
  reviewer: { glyph: "✔", label: "Reviewing" },
  // check
  reader: { glyph: "👁", label: "Viewing" }
  // eye
};
function L(e) {
  return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "#94a3b8" : e.online === !0 ? "#22c55e" : null;
}
function G(e) {
  if (e)
    return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function re({
  users: e,
  maxVisible: l = 5,
  size: a = 28,
  onMoreClick: n,
  onUserClick: u,
  className: f
}) {
  const i = e.slice(0, l), b = e.length - i.length, c = -(a * 0.3), p = Math.max(1, Math.round(a * 0.07)), h = Math.max(10, Math.round(a * 0.42));
  return /* @__PURE__ */ d("div", { className: s("inline-flex items-center", f), role: "list", "aria-label": "Online users", children: [
    i.map((r, o) => {
      const x = L(r), m = r.idle === !0, I = m ? G(r.color) : r.color, v = m && !r.color ? 0.6 : void 0, g = r.mode ? F[r.mode] : null, y = [r.name];
      m ? y.push("Away") : g && y.push(g.label);
      const N = y.join(" — "), w = {
        "data-testid": "presence-avatar",
        "data-presence-user": r.name,
        "data-presence-user-id": r.id,
        ...m ? { "data-presence-idle": "true" } : {},
        ...r.mode ? { "data-presence-mode": r.mode } : {}
      }, k = /* @__PURE__ */ d(E, { children: [
        r.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: r.avatarUrl,
            alt: r.name,
            className: "rounded-full object-cover",
            style: {
              width: a,
              height: a,
              border: `${p}px solid white`,
              opacity: v
            }
          }
        ) : /* @__PURE__ */ t(
          j,
          {
            name: r.name,
            size: a,
            color: I,
            style: {
              border: `${p}px solid white`,
              opacity: v
            }
          }
        ),
        x && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
          O,
          {
            color: x,
            size: "xs",
            "aria-label": m ? `${r.name} away` : r.online === !1 ? `${r.name} offline` : `${r.name} online`
          }
        ) }),
        g && /* @__PURE__ */ t(
          "span",
          {
            className: "absolute flex items-center justify-center rounded-full bg-white border border-slate-200 select-none",
            style: {
              top: -p,
              right: -p,
              width: h,
              height: h,
              fontSize: h * 0.6,
              lineHeight: 1
            },
            "data-testid": "presence-mode-badge",
            "aria-label": g.label,
            children: g.glyph
          }
        )
      ] }), S = {
        marginLeft: o > 0 ? c : 0
      };
      return u ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          role: "listitem",
          onClick: (T) => {
            T.stopPropagation(), u(r.id);
          },
          className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full",
          title: N,
          "aria-label": N,
          ...w,
          style: S,
          children: k
        },
        r.id
      ) : /* @__PURE__ */ t(
        "div",
        {
          role: "listitem",
          className: "relative shrink-0",
          title: N,
          ...w,
          style: S,
          children: k
        },
        r.id
      );
    }),
    b > 0 && /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        onClick: n,
        disabled: !n,
        "aria-label": `${b} more users`,
        className: s(
          "inline-flex items-center justify-center rounded-full shrink-0",
          "font-semibold select-none bg-slate-200 text-slate-600",
          n && "cursor-pointer hover:bg-slate-300",
          !n && "cursor-default",
          "border-white"
        ),
        style: {
          width: a,
          height: a,
          fontSize: a * 0.34,
          marginLeft: c,
          border: `${p}px solid white`
        },
        children: [
          "+",
          b
        ]
      }
    )
  ] });
}
function K(e) {
  if (e == null) return null;
  const l = new Date(e);
  if (isNaN(l.getTime())) return null;
  const n = Date.now() - l.getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function le({
  items: e,
  onItemClick: l,
  onMarkAllRead: a,
  onClearAll: n,
  className: u,
  "data-testid": f
}) {
  const [i, b] = A("unread"), c = e.filter((o) => !o.read), p = i === "unread" ? c : e, h = c.length > 0, r = (o) => s(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ d(
    "div",
    {
      "data-testid": f,
      className: s(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        u
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ d("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            h && /* @__PURE__ */ t("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: c.length })
          ] }),
          /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
            a && h && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: a,
                className: "text-xs text-[#2563eb] bg-transparent border-none cursor-pointer hover:underline",
                children: "Mark all read"
              }
            ),
            n && e.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: n,
                className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
                children: "Clear all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ d("button", { type: "button", className: r(i === "unread"), onClick: () => b("unread"), children: [
            "Unread ",
            c.length > 0 && `(${c.length})`
          ] }),
          /* @__PURE__ */ t("button", { type: "button", className: r(i === "all"), onClick: () => b("all"), children: "All" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: p.length === 0 ? /* @__PURE__ */ t(
          D,
          {
            icon: i === "unread" ? "✓" : "🔔",
            title: i === "unread" ? "All caught up" : "No notifications",
            body: i === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : p.map((o) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => l?.(o),
            className: s(
              "flex items-start gap-3 px-4 py-3 text-left border-none",
              "transition-colors duration-100 cursor-pointer font-[inherit] w-full",
              o.read ? "bg-transparent hover:bg-[var(--color-surface-hover)]" : "bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]"
            ),
            children: [
              o.icon && /* @__PURE__ */ t("span", { className: "text-lg shrink-0 mt-0.5", "aria-hidden": "true", children: o.icon }),
              /* @__PURE__ */ d("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ d("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: s(
                        "text-sm leading-snug truncate",
                        o.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"
                      ),
                      children: o.title
                    }
                  ),
                  !o.read && /* @__PURE__ */ t(
                    "span",
                    {
                      className: "shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]",
                      "aria-label": "Unread"
                    }
                  )
                ] }),
                o.body && /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2", children: o.body }),
                o.timestamp != null && /* @__PURE__ */ t("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: K(o.timestamp) })
              ] })
            ]
          },
          o.id
        )) })
      ]
    }
  );
}
const M = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function H(e) {
  const l = e.trim().split(/\s+/), a = l[0] ?? "", n = l[1]?.[0] ?? "";
  return n ? `${a} ${n}.` : a;
}
const V = [1, 0.5, 0.18];
function Z({ item: e, opacity: l, dotColor: a }) {
  const n = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
      style: { opacity: l },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: "w-[5px] h-[5px] rounded-full shrink-0",
            style: { background: a }
          }
        ),
        /* @__PURE__ */ t(j, { name: e.actor, size: 17 }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: H(e.actor) }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#9ca3af] shrink-0", children: e.action }),
        e.ticketId && /* @__PURE__ */ t("span", { className: "text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap", children: e.ticketId }),
        /* @__PURE__ */ t(
          "span",
          {
            className: "text-[11px] text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
            title: e.subject,
            children: n
          }
        ),
        e.timeLabel && /* @__PURE__ */ t("span", { className: "text-[10px] text-[#d1d5db] shrink-0 whitespace-nowrap", children: e.timeLabel })
      ]
    }
  );
}
function oe({
  items: e,
  visibleCount: l = 3,
  rotateMs: a = 4200,
  staggerMs: n = 0,
  kindColors: u,
  className: f
}) {
  const i = { ...M, ...u }, [b, c] = A(
    () => e.slice(0, l)
  ), p = _(l);
  return C(() => {
    c(e.slice(0, l)), p.current = l;
  }, [e, l]), C(() => {
    if (!a || e.length <= l) return;
    let h;
    const r = setTimeout(() => {
      h = setInterval(() => {
        if (!e.length) return;
        const o = e[p.current % e.length];
        o && (p.current = (p.current + 1) % e.length, c((x) => {
          const m = [o];
          return x[0] && m.push(x[0]), x[1] && m.push(x[1]), m.slice(0, l);
        }));
      }, a);
    }, n);
    return () => {
      clearTimeout(r), clearInterval(h);
    };
  }, [e, l, a, n]), b.length === 0 ? /* @__PURE__ */ t("div", { className: s("flex-1 flex items-center", f), children: /* @__PURE__ */ t("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ t("div", { className: s("flex-1 flex flex-col overflow-hidden", f), children: b.map((h, r) => /* @__PURE__ */ t(
    Z,
    {
      item: h,
      opacity: V[r] ?? 0.1,
      dotColor: i[h.kind ?? ""] ?? "#94a3b8"
    },
    h.id
  )) });
}
const W = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, $ = {
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
function q(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function ie({
  variant: e,
  value: l,
  color: a = "accent",
  "aria-label": n,
  className: u,
  "data-testid": f
}) {
  if (e === "count") {
    const i = q(l);
    return /* @__PURE__ */ t(
      "span",
      {
        "data-testid": f,
        "aria-label": n ?? `${i} items`,
        className: s(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          W[a],
          u
        ),
        children: i
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ t(
    "span",
    {
      "data-testid": f,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s(
        "inline-block w-2 h-2 rounded-full shrink-0",
        $[a],
        u
      )
    }
  ) : /* @__PURE__ */ d(
    "span",
    {
      "data-testid": f,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s("relative inline-flex w-2.5 h-2.5 shrink-0", u),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "absolute inset-0 rounded-full animate-ping",
              Y[a]
            )
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              $[a]
            )
          }
        )
      ]
    }
  );
}
export {
  oe as A,
  ie as B,
  ae as C,
  le as N,
  re as P,
  ne as S
};
