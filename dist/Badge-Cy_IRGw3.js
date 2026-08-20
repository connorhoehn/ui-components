import { jsxs as c, jsx as t, Fragment as E } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
import { A } from "./Avatar-B7O2g50s.js";
import { S as D } from "./StatusDot-BC7B1tTr.js";
import { useState as T, useRef as _, useEffect as S } from "react";
import { E as F } from "./EmptyState-Ejc9dJA3.js";
import { c as P, e as w } from "./tones-DknNcB3q.js";
const R = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function ee({
  state: e,
  compact: l = !1,
  withLabel: a = !0,
  labels: n,
  className: p,
  "data-testid": h = "connection-pill"
}) {
  const i = R[e], m = n?.[e] ?? i.label, d = a && !l;
  return /* @__PURE__ */ c(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": d ? void 0 : m,
      "data-testid": h,
      "data-state": e,
      className: s("inline-flex items-center gap-1.5 font-mono", p),
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: i.colorClass, children: "⬤" }),
        d && /* @__PURE__ */ t("span", { className: s(i.colorClass, "font-semibold"), children: m })
      ]
    }
  );
}
const B = {
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
function U(e) {
  if (e)
    return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function te({
  users: e,
  maxVisible: l = 5,
  size: a = 28,
  onMoreClick: n,
  onUserClick: p,
  className: h
}) {
  const i = e.slice(0, l), m = e.length - i.length, d = -(a * 0.3), f = Math.max(1, Math.round(a * 0.07)), u = Math.max(10, Math.round(a * 0.42));
  return /* @__PURE__ */ c("div", { className: s("inline-flex items-center", h), role: "list", "aria-label": "Online users", children: [
    i.map((r, o) => {
      const x = L(r), b = r.idle === !0, I = b ? U(r.color) : r.color, k = b && !r.color ? 0.6 : void 0, g = r.mode ? B[r.mode] : null, v = [r.name];
      b ? v.push("Away") : g && v.push(g.label);
      const N = v.join(" — "), C = {
        "data-testid": "presence-avatar",
        "data-presence-user": r.name,
        "data-presence-user-id": r.id,
        ...b ? { "data-presence-idle": "true" } : {},
        ...r.mode ? { "data-presence-mode": r.mode } : {}
      }, $ = /* @__PURE__ */ c(E, { children: [
        r.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: r.avatarUrl,
            alt: r.name,
            className: "rounded-full object-cover",
            style: {
              width: a,
              height: a,
              border: `${f}px solid white`,
              opacity: k
            }
          }
        ) : /* @__PURE__ */ t(
          A,
          {
            name: r.name,
            size: a,
            color: I,
            style: {
              border: `${f}px solid white`,
              opacity: k
            }
          }
        ),
        x && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
          D,
          {
            color: x,
            size: "xs",
            "aria-label": b ? `${r.name} away` : r.online === !1 ? `${r.name} offline` : `${r.name} online`
          }
        ) }),
        g && /* @__PURE__ */ t(
          "span",
          {
            className: "absolute flex items-center justify-center rounded-full bg-white border border-border select-none",
            style: {
              top: -f,
              right: -f,
              width: u,
              height: u,
              fontSize: u * 0.6,
              lineHeight: 1
            },
            "data-testid": "presence-mode-badge",
            "aria-label": g.label,
            children: g.glyph
          }
        )
      ] }), j = {
        marginLeft: o > 0 ? d : 0
      };
      return p ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          role: "listitem",
          onClick: (O) => {
            O.stopPropagation(), p(r.id);
          },
          className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
          title: N,
          "aria-label": N,
          ...C,
          style: j,
          children: $
        },
        r.id
      ) : /* @__PURE__ */ t(
        "div",
        {
          role: "listitem",
          className: "relative shrink-0",
          title: N,
          ...C,
          style: j,
          children: $
        },
        r.id
      );
    }),
    m > 0 && /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: n,
        disabled: !n,
        "aria-label": `${m} more users`,
        className: s(
          "inline-flex items-center justify-center rounded-full shrink-0",
          "font-semibold select-none bg-surface-emphasis text-text-secondary",
          n && "cursor-pointer hover:bg-surface-emphasis",
          !n && "cursor-default",
          "border-white"
        ),
        style: {
          width: a,
          height: a,
          fontSize: a * 0.34,
          marginLeft: d,
          border: `${f}px solid white`
        },
        children: [
          "+",
          m
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
function ne({
  items: e,
  onItemClick: l,
  onMarkAllRead: a,
  onClearAll: n,
  className: p,
  "data-testid": h
}) {
  const [i, m] = T("unread"), d = e.filter((o) => !o.read), f = i === "unread" ? d : e, u = d.length > 0, r = (o) => s(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": h,
      className: s(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        p
      ),
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ c("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            u && /* @__PURE__ */ t("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: d.length })
          ] }),
          /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
            a && u && /* @__PURE__ */ t(
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
        /* @__PURE__ */ c("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ c("button", { type: "button", className: r(i === "unread"), onClick: () => m("unread"), children: [
            "Unread ",
            d.length > 0 && `(${d.length})`
          ] }),
          /* @__PURE__ */ t("button", { type: "button", className: r(i === "all"), onClick: () => m("all"), children: "All" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: f.length === 0 ? /* @__PURE__ */ t(
          F,
          {
            icon: i === "unread" ? "✓" : "🔔",
            title: i === "unread" ? "All caught up" : "No notifications",
            body: i === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : f.map((o) => /* @__PURE__ */ c(
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
function K({ item: e, opacity: l, dotColor: a }) {
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
            style: { background: a }
          }
        ),
        /* @__PURE__ */ t(A, { name: e.actor, size: 17 }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: H(e.actor) }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#9ca3af] shrink-0", children: e.action }),
        e.ticketId && /* @__PURE__ */ t("span", { className: "text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap", children: e.ticketId }),
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
function re({
  items: e,
  visibleCount: l = 3,
  rotateMs: a = 4200,
  staggerMs: n = 0,
  kindColors: p,
  className: h
}) {
  const i = { ...M, ...p }, [m, d] = T(
    () => e.slice(0, l)
  ), f = _(l);
  return S(() => {
    d(e.slice(0, l)), f.current = l;
  }, [e, l]), S(() => {
    if (!a || e.length <= l) return;
    let u;
    const r = setTimeout(() => {
      u = setInterval(() => {
        if (!e.length) return;
        const o = e[f.current % e.length];
        o && (f.current = (f.current + 1) % e.length, d((x) => {
          const b = [o];
          return x[0] && b.push(x[0]), x[1] && b.push(x[1]), b.slice(0, l);
        }));
      }, a);
    }, n);
    return () => {
      clearTimeout(r), clearInterval(u);
    };
  }, [e, l, a, n]), m.length === 0 ? /* @__PURE__ */ t("div", { className: s("flex-1 flex items-center", h), children: /* @__PURE__ */ t("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ t("div", { className: s("flex-1 flex flex-col overflow-hidden", h), children: m.map((u, r) => /* @__PURE__ */ t(
    K,
    {
      item: u,
      opacity: V[r] ?? 0.1,
      dotColor: i[u.kind ?? ""] ?? "#94a3b8"
    },
    u.id
  )) });
}
const y = {
  accent: "info",
  success: "success",
  danger: "danger",
  muted: "neutral"
};
function W(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function ae({
  variant: e,
  value: l,
  color: a = "accent",
  "aria-label": n,
  className: p,
  "data-testid": h
}) {
  if (e === "count") {
    const i = W(l);
    return /* @__PURE__ */ t(
      "span",
      {
        "data-testid": h,
        "aria-label": n ?? `${i} items`,
        className: s(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          P[y[a]],
          p
        ),
        children: i
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ t(
    "span",
    {
      "data-testid": h,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s(
        "inline-block w-2 h-2 rounded-full shrink-0",
        w[y[a]],
        p
      )
    }
  ) : /* @__PURE__ */ c(
    "span",
    {
      "data-testid": h,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s("relative inline-flex w-2.5 h-2.5 shrink-0", p),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "absolute inset-0 rounded-full animate-ping",
              s(w[y[a]], "opacity-60")
            )
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              w[y[a]]
            )
          }
        )
      ]
    }
  );
}
export {
  re as A,
  ae as B,
  ee as C,
  ne as N,
  te as P
};
