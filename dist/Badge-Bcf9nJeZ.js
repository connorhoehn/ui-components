import { jsx as t, jsxs as d, Fragment as O } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
import { A as $ } from "./Avatar-DIEPZUB9.js";
import { S as _ } from "./StatusDot-BC7B1tTr.js";
import { useState as j, useRef as D, useEffect as T } from "react";
import { E as R } from "./EmptyState-CSXnZFAs.js";
import { c as B, e as w } from "./tones-DknNcB3q.js";
const F = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, P = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, L = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function re({
  checked: e,
  onChange: l,
  disabled: r = !1,
  size: n = "md",
  "aria-label": f,
  "aria-labelledby": u,
  className: i,
  style: p,
  "data-testid": c
}) {
  return /* @__PURE__ */ t(
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
        r || l(!e);
      },
      className: s(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
        F[n],
        e ? "bg-info" : "bg-gray-300",
        r ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        i
      ),
      style: p,
      children: /* @__PURE__ */ t(
        "span",
        {
          className: s(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            P[n],
            e ? L[n] : "translate-x-0.5"
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
  withLabel: r = !0,
  labels: n,
  className: f,
  "data-testid": u = "connection-pill"
}) {
  const i = U[e], p = n?.[e] ?? i.label, c = r && !l;
  return /* @__PURE__ */ d(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": c ? void 0 : p,
      "data-testid": u,
      "data-state": e,
      className: s("inline-flex items-center gap-1.5 font-mono", f),
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: i.colorClass, children: "⬤" }),
        c && /* @__PURE__ */ t("span", { className: s(i.colorClass, "font-semibold"), children: p })
      ]
    }
  );
}
const G = {
  editor: { glyph: "✏", label: "Editing" },
  // pencil
  reviewer: { glyph: "✔", label: "Reviewing" },
  // check
  reader: { glyph: "👁", label: "Viewing" }
  // eye
};
function K(e) {
  return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "#94a3b8" : e.online === !0 ? "#22c55e" : null;
}
function M(e) {
  if (e)
    return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function le({
  users: e,
  maxVisible: l = 5,
  size: r = 28,
  onMoreClick: n,
  onUserClick: f,
  className: u
}) {
  const i = e.slice(0, l), p = e.length - i.length, c = -(r * 0.3), h = Math.max(1, Math.round(r * 0.07)), b = Math.max(10, Math.round(r * 0.42));
  return /* @__PURE__ */ d("div", { className: s("inline-flex items-center", u), role: "list", "aria-label": "Online users", children: [
    i.map((a, o) => {
      const x = K(a), m = a.idle === !0, E = m ? M(a.color) : a.color, k = m && !a.color ? 0.6 : void 0, g = a.mode ? G[a.mode] : null, N = [a.name];
      m ? N.push("Away") : g && N.push(g.label);
      const v = N.join(" — "), S = {
        "data-testid": "presence-avatar",
        "data-presence-user": a.name,
        "data-presence-user-id": a.id,
        ...m ? { "data-presence-idle": "true" } : {},
        ...a.mode ? { "data-presence-mode": a.mode } : {}
      }, C = /* @__PURE__ */ d(O, { children: [
        a.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: a.avatarUrl,
            alt: a.name,
            className: "rounded-full object-cover",
            style: {
              width: r,
              height: r,
              border: `${h}px solid white`,
              opacity: k
            }
          }
        ) : /* @__PURE__ */ t(
          $,
          {
            name: a.name,
            size: r,
            color: E,
            style: {
              border: `${h}px solid white`,
              opacity: k
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
              top: -h,
              right: -h,
              width: b,
              height: b,
              fontSize: b * 0.6,
              lineHeight: 1
            },
            "data-testid": "presence-mode-badge",
            "aria-label": g.label,
            children: g.glyph
          }
        )
      ] }), A = {
        marginLeft: o > 0 ? c : 0
      };
      return f ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          role: "listitem",
          onClick: (I) => {
            I.stopPropagation(), f(a.id);
          },
          className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
          title: v,
          "aria-label": v,
          ...S,
          style: A,
          children: C
        },
        a.id
      ) : /* @__PURE__ */ t(
        "div",
        {
          role: "listitem",
          className: "relative shrink-0",
          title: v,
          ...S,
          style: A,
          children: C
        },
        a.id
      );
    }),
    p > 0 && /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        onClick: n,
        disabled: !n,
        "aria-label": `${p} more users`,
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
          marginLeft: c,
          border: `${h}px solid white`
        },
        children: [
          "+",
          p
        ]
      }
    )
  ] });
}
function H(e) {
  if (e == null) return null;
  const l = new Date(e);
  if (isNaN(l.getTime())) return null;
  const n = Date.now() - l.getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function oe({
  items: e,
  onItemClick: l,
  onMarkAllRead: r,
  onClearAll: n,
  className: f,
  "data-testid": u
}) {
  const [i, p] = j("unread"), c = e.filter((o) => !o.read), h = i === "unread" ? c : e, b = c.length > 0, a = (o) => s(
    "px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100",
    o ? "bg-[#e0e7ff] text-[#1e1b4b] font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ d(
    "div",
    {
      "data-testid": u,
      className: s(
        "flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden",
        f
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]", children: [
          /* @__PURE__ */ d("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: [
            "Notifications",
            b && /* @__PURE__ */ t("span", { className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none", children: c.length })
          ] }),
          /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
            r && b && /* @__PURE__ */ t(
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
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1 px-3 pt-2", children: [
          /* @__PURE__ */ d("button", { type: "button", className: a(i === "unread"), onClick: () => p("unread"), children: [
            "Unread ",
            c.length > 0 && `(${c.length})`
          ] }),
          /* @__PURE__ */ t("button", { type: "button", className: a(i === "all"), onClick: () => p("all"), children: "All" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col overflow-y-auto max-h-[420px] py-2", children: h.length === 0 ? /* @__PURE__ */ t(
          R,
          {
            icon: i === "unread" ? "✓" : "🔔",
            title: i === "unread" ? "All caught up" : "No notifications",
            body: i === "unread" ? "No unread notifications." : "Notifications will appear here."
          }
        ) : h.map((o) => /* @__PURE__ */ d(
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
                o.timestamp != null && /* @__PURE__ */ t("p", { className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono", children: H(o.timestamp) })
              ] })
            ]
          },
          o.id
        )) })
      ]
    }
  );
}
const V = {
  task: "#10b981",
  pr: "#6366f1",
  decision: "#f59e0b",
  comment: "#94a3b8",
  status: "#3b82f6"
};
function Z(e) {
  const l = e.trim().split(/\s+/), r = l[0] ?? "", n = l[1]?.[0] ?? "";
  return n ? `${r} ${n}.` : r;
}
const W = [1, 0.5, 0.18];
function Y({ item: e, opacity: l, dotColor: r }) {
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
            style: { background: r }
          }
        ),
        /* @__PURE__ */ t($, { name: e.actor, size: 17 }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-[#374151] font-medium shrink-0", children: Z(e.actor) }),
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
function ie({
  items: e,
  visibleCount: l = 3,
  rotateMs: r = 4200,
  staggerMs: n = 0,
  kindColors: f,
  className: u
}) {
  const i = { ...V, ...f }, [p, c] = j(
    () => e.slice(0, l)
  ), h = D(l);
  return T(() => {
    c(e.slice(0, l)), h.current = l;
  }, [e, l]), T(() => {
    if (!r || e.length <= l) return;
    let b;
    const a = setTimeout(() => {
      b = setInterval(() => {
        if (!e.length) return;
        const o = e[h.current % e.length];
        o && (h.current = (h.current + 1) % e.length, c((x) => {
          const m = [o];
          return x[0] && m.push(x[0]), x[1] && m.push(x[1]), m.slice(0, l);
        }));
      }, r);
    }, n);
    return () => {
      clearTimeout(a), clearInterval(b);
    };
  }, [e, l, r, n]), p.length === 0 ? /* @__PURE__ */ t("div", { className: s("flex-1 flex items-center", u), children: /* @__PURE__ */ t("span", { className: "text-[11px] text-[#e5e7eb]", children: "No recent activity" }) }) : /* @__PURE__ */ t("div", { className: s("flex-1 flex flex-col overflow-hidden", u), children: p.map((b, a) => /* @__PURE__ */ t(
    Y,
    {
      item: b,
      opacity: W[a] ?? 0.1,
      dotColor: i[b.kind ?? ""] ?? "#94a3b8"
    },
    b.id
  )) });
}
const y = {
  accent: "info",
  success: "success",
  danger: "danger",
  muted: "neutral"
};
function q(e) {
  return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function se({
  variant: e,
  value: l,
  color: r = "accent",
  "aria-label": n,
  className: f,
  "data-testid": u
}) {
  if (e === "count") {
    const i = q(l);
    return /* @__PURE__ */ t(
      "span",
      {
        "data-testid": u,
        "aria-label": n ?? `${i} items`,
        className: s(
          "inline-flex items-center justify-center min-w-[18px] h-[18px]",
          "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none",
          B[y[r]],
          f
        ),
        children: i
      }
    );
  }
  return e === "dot" ? /* @__PURE__ */ t(
    "span",
    {
      "data-testid": u,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s(
        "inline-block w-2 h-2 rounded-full shrink-0",
        w[y[r]],
        f
      )
    }
  ) : /* @__PURE__ */ d(
    "span",
    {
      "data-testid": u,
      "aria-label": n,
      role: n ? "img" : void 0,
      className: s("relative inline-flex w-2.5 h-2.5 shrink-0", f),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "absolute inset-0 rounded-full animate-ping",
              s(w[y[r]], "opacity-60")
            )
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "relative inline-block w-2.5 h-2.5 rounded-full",
              w[y[r]]
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
  ae as C,
  oe as N,
  le as P,
  re as S
};
