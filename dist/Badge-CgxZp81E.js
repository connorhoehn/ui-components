import { jsx as t, jsxs as c, Fragment as O } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
import { A } from "./Avatar-BvKIaNVE.js";
import { S as _ } from "./StatusDot-BC7B1tTr.js";
import { useState as I, useRef as C, useEffect as $ } from "react";
import { E as D } from "./EmptyState-PM9wTjxk.js";
const R = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, B = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, P = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function te({
  checked: e,
  onChange: l,
  disabled: r = !1,
  size: n = "md",
  "aria-label": b,
  "aria-labelledby": p,
  className: i,
  style: h,
  "data-testid": d
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": b,
      "aria-labelledby": p,
      disabled: r,
      "data-testid": d,
      onClick: () => {
        r || l(!e);
      },
      className: s(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        R[n],
        e ? "bg-blue-600" : "bg-gray-300",
        r ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        i
      ),
      style: h,
      children: /* @__PURE__ */ t(
        "span",
        {
          className: s(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            B[n],
            e ? P[n] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
const U = {
  editor: { glyph: "✏", label: "Editing" },
  // pencil
  reviewer: { glyph: "✔", label: "Reviewing" },
  // check
  reader: { glyph: "👁", label: "Viewing" }
  // eye
};
function F(e) {
  return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "#94a3b8" : e.online === !0 ? "#22c55e" : null;
}
function L(e) {
  if (e)
    return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function ne({
  users: e,
  maxVisible: l = 5,
  size: r = 28,
  onMoreClick: n,
  onUserClick: b,
  className: p
}) {
  const i = e.slice(0, l), h = e.length - i.length, d = -(r * 0.3), u = Math.max(1, Math.round(r * 0.07)), f = Math.max(10, Math.round(r * 0.42));
  return /* @__PURE__ */ c("div", { className: s("inline-flex items-center", p), role: "list", "aria-label": "Online users", children: [
    i.map((a, o) => {
      const x = F(a), m = a.idle === !0, T = m ? L(a.color) : a.color, v = m && !a.color ? 0.6 : void 0, g = a.mode ? U[a.mode] : null, y = [a.name];
      m ? y.push("Away") : g && y.push(g.label);
      const w = y.join(" — "), N = {
        "data-testid": "presence-avatar",
        "data-presence-user": a.name,
        "data-presence-user-id": a.id,
        ...m ? { "data-presence-idle": "true" } : {},
        ...a.mode ? { "data-presence-mode": a.mode } : {}
      }, k = /* @__PURE__ */ c(O, { children: [
        a.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: a.avatarUrl,
            alt: a.name,
            className: "rounded-full object-cover",
            style: {
              width: r,
              height: r,
              border: `${u}px solid white`,
              opacity: v
            }
          }
        ) : /* @__PURE__ */ t(
          A,
          {
            name: a.name,
            size: r,
            color: T,
            style: {
              border: `${u}px solid white`,
              opacity: v
            }
          }
        ),
        x && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
          _,
          {
            color: x,
            size: "xs",
            "aria-label": m ? `${a.name} away` : a.online === !1 ? `${a.name} offline` : `${a.name} online`
          }
        ) }),
        g && /* @__PURE__ */ t(
          "span",
          {
            className: "absolute flex items-center justify-center rounded-full bg-white border border-slate-200 select-none",
            style: {
              top: -u,
              right: -u,
              width: f,
              height: f,
              fontSize: f * 0.6,
              lineHeight: 1
            },
            "data-testid": "presence-mode-badge",
            "aria-label": g.label,
            children: g.glyph
          }
        )
      ] }), S = {
        marginLeft: o > 0 ? d : 0
      };
      return b ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          role: "listitem",
          onClick: (E) => {
            E.stopPropagation(), b(a.id);
          },
          className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full",
          title: w,
          "aria-label": w,
          ...N,
          style: S,
          children: k
        },
        a.id
      ) : /* @__PURE__ */ t(
        "div",
        {
          role: "listitem",
          className: "relative shrink-0",
          title: w,
          ...N,
          style: S,
          children: k
        },
        a.id
      );
    }),
    h > 0 && /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: n,
        disabled: !n,
        "aria-label": `${h} more users`,
        className: s(
          "inline-flex items-center justify-center rounded-full shrink-0",
          "font-semibold select-none bg-slate-200 text-slate-600",
          n && "cursor-pointer hover:bg-slate-300",
          !n && "cursor-default",
          "border-white"
        ),
        style: {
          width: r,
          height: r,
          fontSize: r * 0.34,
          marginLeft: d,
          border: `${u}px solid white`
        },
        children: [
          "+",
          h
        ]
      }
    )
  ] });
}
function G(e) {
  if (e == null) return null;
  const l = new Date(e);
  if (isNaN(l.getTime())) return null;
  const n = Date.now() - l.getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function re({
  items: e,
  onItemClick: l,
  onMarkAllRead: r,
  onClearAll: n,
  className: b,
  "data-testid": p
}) {
  const [i, h] = I("unread"), d = e.filter((o) => !o.read), u = i === "unread" ? d : e, f = d.length > 0, a = (o) => s(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": p,
      className: s(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        b
      ),
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ c("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            f && /* @__PURE__ */ t("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: d.length })
          ] }),
          /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
            r && f && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: r,
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
        /* @__PURE__ */ c("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ c("button", { type: "button", className: a(i === "unread"), onClick: () => h("unread"), children: [
            "Unread ",
            d.length > 0 && `(${d.length})`
          ] }),
          /* @__PURE__ */ t("button", { type: "button", className: a(i === "all"), onClick: () => h("all"), children: "All" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: u.length === 0 ? /* @__PURE__ */ t(
          D,
          {
            icon: i === "unread" ? "✓" : "🔔",
            title: i === "unread" ? "All caught up" : "No notifications",
            body: i === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : u.map((o) => /* @__PURE__ */ c(
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
              /* @__PURE__ */ c("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2", children: [
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
                o.timestamp != null && /* @__PURE__ */ t("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: G(o.timestamp) })
              ] })
            ]
          },
          o.id
        )) })
      ]
    }
  );
}
const K = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function M(e) {
  const l = e.trim().split(/\s+/), r = l[0] ?? "", n = l[1]?.[0] ?? "";
  return n ? `${r} ${n}.` : r;
}
const H = [1, 0.5, 0.18];
function V({ item: e, opacity: l, dotColor: r }) {
  const n = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
  return /* @__PURE__ */ c(
    "div",
    {
      className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
      style: { opacity: l },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: "w-[5px] h-[5px] rounded-full shrink-0",
            style: { background: r }
          }
        ),
        /* @__PURE__ */ t(A, { name: e.actor, size: 17 }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: M(e.actor) }),
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
function ae({
  items: e,
  visibleCount: l = 3,
  rotateMs: r = 4200,
  staggerMs: n = 0,
  kindColors: b,
  className: p
}) {
  const i = { ...K, ...b }, [h, d] = I(
    () => e.slice(0, l)
  ), u = C(l);
  return $(() => {
    d(e.slice(0, l)), u.current = l;
  }, [e, l]), $(() => {
    if (!r || e.length <= l) return;
    let f;
    const a = setTimeout(() => {
      f = setInterval(() => {
        if (!e.length) return;
        const o = e[u.current % e.length];
        o && (u.current = (u.current + 1) % e.length, d((x) => {
          const m = [o];
          return x[0] && m.push(x[0]), x[1] && m.push(x[1]), m.slice(0, l);
        }));
      }, r);
    }, n);
    return () => {
      clearTimeout(a), clearInterval(f);
    };
  }, [e, l, r, n]), h.length === 0 ? /* @__PURE__ */ t("div", { className: s("flex-1 flex items-center", p), children: /* @__PURE__ */ t("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ t("div", { className: s("flex-1 flex flex-col overflow-hidden", p), children: h.map((f, a) => /* @__PURE__ */ t(
    V,
    {
      item: f,
      opacity: H[a] ?? 0.1,
      dotColor: i[f.kind ?? ""] ?? "#94a3b8"
    },
    f.id
  )) });
}
const Z = {
  accent: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
  muted: "bg-slate-200 text-slate-600"
}, j = {
  accent: "bg-blue-500",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
  muted: "bg-slate-400"
}, W = {
  accent: "bg-blue-400/60",
  success: "bg-emerald-400/60",
  danger: "bg-rose-400/60",
  muted: "bg-slate-400/60"
};
function Y(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function le({
  variant: e,
  value: l,
  color: r = "accent",
  "aria-label": n,
  className: b,
  "data-testid": p
}) {
  if (e === "count") {
    const i = Y(l);
    return /* @__PURE__ */ t(
      "span",
      {
        "data-testid": p,
        "aria-label": n ?? `${i} items`,
        className: s(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          Z[r],
          b
        ),
        children: i
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ t(
    "span",
    {
      "data-testid": p,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s(
        "inline-block w-2 h-2 rounded-full shrink-0",
        j[r],
        b
      )
    }
  ) : /* @__PURE__ */ c(
    "span",
    {
      "data-testid": p,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s("relative inline-flex w-2.5 h-2.5 shrink-0", b),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "absolute inset-0 rounded-full animate-ping",
              W[r]
            )
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              j[r]
            )
          }
        )
      ]
    }
  );
}
export {
  ae as A,
  le as B,
  re as N,
  ne as P,
  te as S
};
