import { S as W } from "./DocumentEditorPage-D8JmjZFh.js";
import { A as we, a as Ne, D as ye, b as ve, c as ke, E as Ce, F as Me, H as Se, K as je, M as Ae, d as $e, P as Pe, R as Ee, e as _e, f as De, g as Ie, h as Te, T as Re, V as He, i as Le, j as Oe, k as Be, l as Ue, m as We, r as Fe, u as Ve, n as Xe } from "./DocumentEditorPage-D8JmjZFh.js";
import { jsxs as r, jsx as n, Fragment as $ } from "react/jsx-runtime";
import { useState as j, useMemo as E, useCallback as I, useRef as _, useEffect as T } from "react";
import { N as F, T as R } from "./index-arbn-S4b.js";
import { E as qe, a as ze, b as Ge } from "./index-arbn-S4b.js";
import { c as t } from "./cn-B6yFEsav.js";
import { o as V, p as X } from "./useWebSocket-CRbD5UIz.js";
function K(e) {
  const i = Date.now(), d = new Date(e).getTime();
  if (isNaN(d)) return "";
  const c = i - d;
  if (c < 0) return "just now";
  const s = Math.floor(c / 1e3);
  if (s < 60) return "just now";
  const a = Math.floor(s / 60);
  if (a < 60) return `${a}m ago`;
  const u = Math.floor(a / 60);
  if (u < 24) return `${u}h ago`;
  const m = Math.floor(u / 24);
  return m < 30 ? `${m}d ago` : `${Math.floor(m / 30)}mo ago`;
}
const H = {
  draft: { bg: "#fef3c7", color: "#92400e" },
  review: { bg: "#dbeafe", color: "#1e40af" },
  final: { bg: "#d1fae5", color: "#065f46" },
  archived: { bg: "#f1f5f9", color: "#475569" }
};
function q({ status: e }) {
  const i = H[e] ?? H.draft;
  return /* @__PURE__ */ n(
    "span",
    {
      className: t("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
      style: { background: i.bg, color: i.color },
      children: e
    }
  );
}
const L = {
  editor: { icon: "✏", label: "Editing" },
  reviewer: { icon: "✔", label: "Reviewing" },
  reader: { icon: "👁", label: "Viewing" }
};
function z({
  users: e,
  onClickUser: i
}) {
  const c = e.slice(0, 5), s = e.length - 5;
  return /* @__PURE__ */ r("div", { className: t("flex items-center gap-0.5"), children: [
    c.map((a, u) => {
      const m = L[a.mode ?? "editor"] ?? L.editor, p = a.idle === !0, h = p ? "#f59e0b" : "#10b981";
      return /* @__PURE__ */ r(
        "div",
        {
          title: `${a.displayName} — ${p ? "Away" : m.label}`,
          onClick: (f) => {
            f.stopPropagation(), i(a.userId);
          },
          className: t("relative cursor-pointer"),
          style: { marginLeft: u > 0 ? -6 : 0, zIndex: 5 - u },
          children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: t("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
                style: { background: p ? `${a.color}99` : a.color },
                children: a.displayName.split(" ").map((f) => f[0]).join("").slice(0, 2).toUpperCase()
              }
            ),
            /* @__PURE__ */ n(
              "div",
              {
                className: t("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
                style: { background: h }
              }
            ),
            /* @__PURE__ */ n("div", { className: t("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none"), children: m.icon })
          ]
        },
        a.userId
      );
    }),
    s > 0 && /* @__PURE__ */ r(
      "div",
      {
        className: t("w-8 h-8 rounded-full bg-[#94a3b8] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function me({
  documents: e,
  presence: i,
  onOpenDocument: d,
  onCreateDocument: c,
  onDeleteDocument: s,
  onJumpToUser: a,
  hideHeader: u
}) {
  const [m, p] = j(!1), [h, f] = j(null), [w, N] = j(1), x = 10, l = Math.max(1, Math.ceil(e.length / x)), v = Math.min(w, l), S = E(() => {
    const o = (v - 1) * x;
    return e.slice(o, o + x);
  }, [e, v]), y = I(
    (o, k, M) => {
      o.stopPropagation(), window.confirm(`Delete "${M}"? This cannot be undone.`) && s(k);
    },
    [s]
  );
  return /* @__PURE__ */ r("div", { className: t("px-4"), children: [
    !u && /* @__PURE__ */ r("div", { className: t("flex items-center justify-between mb-5"), children: [
      /* @__PURE__ */ n("h1", { className: t("m-0 text-[22px] font-bold text-[#1e293b]"), children: "Documents" }),
      /* @__PURE__ */ r(
        "button",
        {
          "data-testid": "new-document-btn",
          onClick: () => p(!0),
          className: t("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-[#3b82f6] text-white cursor-pointer font-[inherit]"),
          children: [
            /* @__PURE__ */ n("span", { className: t("text-base leading-none"), children: "+" }),
            "New Document"
          ]
        }
      )
    ] }),
    e.length === 0 ? /* @__PURE__ */ n(
      "div",
      {
        "data-testid": "documents-empty",
        className: t("text-center px-4 py-12 text-text-tertiary text-[15px]"),
        children: "No documents yet. Create your first document to get started."
      }
    ) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-3"), children: S.map((o) => {
      const k = i[o.id] ?? [], M = h === o.id;
      return /* @__PURE__ */ r(
        "div",
        {
          "data-testid": `document-card-${o.id}`,
          onClick: () => d(o.id),
          onMouseEnter: () => f(o.id),
          onMouseLeave: () => f(null),
          className: t(
            "flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150",
            M ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          ),
          children: [
            /* @__PURE__ */ n("span", { className: t("text-2xl shrink-0"), children: o.icon }),
            /* @__PURE__ */ r("div", { className: t("flex-1 min-w-0"), children: [
              /* @__PURE__ */ r("div", { className: t("flex items-center gap-2 mb-0.5"), children: [
                /* @__PURE__ */ n("span", { className: t("text-[15px] font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: o.title }),
                /* @__PURE__ */ n(q, { status: o.status }),
                o.type && /* @__PURE__ */ n("span", { className: t("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-[#f1f5f9] text-text-secondary whitespace-nowrap shrink-0"), children: o.type }),
                o.activeCallSessionId && /* @__PURE__ */ r("span", { className: t("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#dcfce7] text-[#166534] leading-[18px]"), children: [
                  /* @__PURE__ */ n("span", { className: t("w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse") }),
                  "Live Call"
                ] })
              ] }),
              o.description && /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"), children: o.description }),
              /* @__PURE__ */ r("div", { className: t("text-xs text-text-tertiary"), children: [
                "Updated ",
                K(o.updatedAt)
              ] })
            ] }),
            k.length > 0 && /* @__PURE__ */ n("div", { className: t("shrink-0"), children: /* @__PURE__ */ n(
              z,
              {
                users: k,
                onClickUser: (C) => a(o.id, C)
              }
            ) }),
            M && /* @__PURE__ */ n(
              "button",
              {
                onClick: (C) => y(C, o.id, o.title),
                title: "Delete document",
                className: t("absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-[#fee2e2] text-[#dc2626] text-sm leading-none cursor-pointer font-[inherit] p-0"),
                children: "×"
              }
            )
          ]
        },
        o.id
      );
    }) }),
    e.length > x && /* @__PURE__ */ r(
      "div",
      {
        "data-testid": "pagination-controls",
        className: t("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
        children: [
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "pagination-prev",
              disabled: v <= 1,
              onClick: () => N((o) => Math.max(1, o - 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                v <= 1 ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Previous"
            }
          ),
          /* @__PURE__ */ r(
            "span",
            {
              "data-testid": "pagination-info",
              className: t("text-[13px] text-text-secondary font-medium"),
              children: [
                "Page ",
                v,
                " of ",
                l
              ]
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "pagination-next",
              disabled: v >= l,
              onClick: () => N((o) => Math.min(l, o + 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                v >= l ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Next"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(
      F,
      {
        open: m,
        onClose: () => p(!1),
        onCreate: c
      }
    )
  ] });
}
const U = "prosemirror";
function G(e) {
  return e.ydoc !== void 0;
}
function fe(e) {
  return G(e) ? /* @__PURE__ */ n(Y, { ...e }) : /* @__PURE__ */ n(Q, { ...e });
}
function Y({
  ydoc: e,
  provider: i,
  fragment: d,
  user: c,
  fragmentName: s = U,
  editable: a,
  placeholder: u,
  className: m,
  onFragmentReady: p
}) {
  const h = E(
    () => d ?? e.getXmlFragment(s),
    [d, e, s]
  ), f = _(!1);
  return f.current || (f.current = !0, p?.(h, e)), /* @__PURE__ */ n("div", { className: t(m), children: /* @__PURE__ */ n(
    R,
    {
      fragment: h,
      ydoc: e,
      provider: i,
      user: c,
      editable: a,
      placeholder: u
    }
  ) });
}
function Q({
  gatewayUrl: e,
  docId: i,
  authToken: d,
  channel: c,
  user: s,
  fragmentName: a = U,
  editable: u,
  placeholder: m,
  className: p,
  onFragmentReady: h,
  loadingSlot: f
}) {
  const w = c ?? `doc:${i}`, N = _(/* @__PURE__ */ new Set()), x = I(
    (C) => (N.current.add(C), () => {
      N.current.delete(C);
    }),
    []
  ), l = I((C) => {
    N.current.forEach((g) => g(C));
  }, []), v = E(
    () => ({
      wsUrl: e,
      cognitoToken: d,
      defaultChannel: w
    }),
    [e, d, w]
  ), S = V({ config: v, onMessage: l }), { ydoc: y, provider: o } = X({
    documentId: i,
    ws: S,
    onMessage: x
  }), k = E(
    () => y ? y.getXmlFragment(a) : null,
    [y, a]
  ), M = _(!1);
  return !M.current && k && y && (M.current = !0, h?.(k, y)), !y || !k ? /* @__PURE__ */ n("div", { className: t(p), children: f ?? null }) : /* @__PURE__ */ n("div", { className: t(p), children: /* @__PURE__ */ n(
    R,
    {
      fragment: k,
      ydoc: y,
      provider: o,
      user: s,
      editable: u,
      placeholder: m
    }
  ) });
}
function Z({ current: e, total: i }) {
  const d = i > 0 ? Math.round(e / i * 100) : 0;
  return /* @__PURE__ */ r("div", { className: t("mb-4"), children: [
    /* @__PURE__ */ r("div", { className: t("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
      /* @__PURE__ */ r("span", { children: [
        e,
        " of ",
        i,
        " sections reviewed"
      ] }),
      /* @__PURE__ */ r("span", { children: [
        d,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: t("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ n(
      "div",
      {
        className: t("h-full bg-[#3b82f6] rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${d}%` }
      }
    ) })
  ] });
}
const J = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  acked: { bg: "#d1fae5", text: "#065f46" },
  done: { bg: "#dbeafe", text: "#1e40af" },
  rejected: { bg: "#fee2e2", text: "#991b1b" }
}, O = {
  low: "#6b7280",
  medium: "#f59e0b",
  high: "#ef4444"
};
function ee({ item: e, onAck: i, onReject: d }) {
  const [c, s] = j(!1), [a, u] = j(""), [m, p] = j("none"), h = _(e.status), f = J[e.status];
  T(() => {
    h.current === "pending" && e.status === "acked" ? p("ack") : h.current === "pending" && e.status === "rejected" && p("reject"), h.current = e.status;
  }, [e.status]);
  const w = () => {
    p("ack"), setTimeout(() => {
      i(a || void 0), u(""), s(!1);
    }, 150);
  }, N = () => {
    if (!a.trim()) {
      s(!0);
      return;
    }
    p("reject"), setTimeout(() => {
      d(a), u(""), s(!1);
    }, 150);
  };
  return /* @__PURE__ */ r("div", { className: t("bg-white border border-[#e5e7eb] rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", m === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-[#22c55e] bg-[#f0fdf4]" : m === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-[#ef4444] bg-[#fef2f2]" : ""), children: [
    /* @__PURE__ */ r("div", { className: t("flex items-center mb-1.5"), children: [
      /* @__PURE__ */ n("span", { className: t("text-sm font-medium flex-1 text-[#1e293b]"), children: e.text }),
      /* @__PURE__ */ n(
        "span",
        {
          className: t("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
          style: { background: f.bg, color: f.text },
          children: e.status
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          className: t("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
          style: { color: O[e.priority], border: `1px solid ${O[e.priority]}` },
          children: e.priority
        }
      )
    ] }),
    e.status === "acked" && /* @__PURE__ */ r("div", { className: t("flex items-center gap-1.5 text-xs text-[#6b7280] mb-1"), children: [
      /* @__PURE__ */ n("span", { className: t("w-5 h-5 rounded-full bg-[#22c55e] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✓" }),
      /* @__PURE__ */ r("span", { children: [
        "Approved by ",
        /* @__PURE__ */ n("strong", { className: t("text-[#334155]"), children: e.ackedBy?.slice(0, 8) ?? "user" }),
        e.ackedAt && /* @__PURE__ */ r($, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ r($, { children: [
          " — ",
          e.notes
        ] })
      ] })
    ] }),
    e.status === "rejected" && /* @__PURE__ */ r("div", { className: t("flex items-center gap-1.5 text-xs text-[#991b1b] mb-1"), children: [
      /* @__PURE__ */ n("span", { className: t("w-5 h-5 rounded-full bg-[#ef4444] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✕" }),
      /* @__PURE__ */ r("span", { children: [
        "Rejected by ",
        /* @__PURE__ */ n("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
        e.ackedAt && /* @__PURE__ */ r($, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ r($, { children: [
          " — ",
          e.notes
        ] })
      ] })
    ] }),
    e.status === "pending" && /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ r("div", { className: t("flex gap-2 mt-1.5"), children: [
        /* @__PURE__ */ n("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"), onClick: w, children: "Acknowledge" }),
        /* @__PURE__ */ n("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"), onClick: N, children: "Reject" }),
        !c && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]"),
            onClick: () => s(!0),
            children: "Add note"
          }
        )
      ] }),
      c && /* @__PURE__ */ r("div", { className: t("mt-2"), children: [
        /* @__PURE__ */ n(
          "textarea",
          {
            value: a,
            onChange: (l) => u(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && !l.shiftKey && (l.preventDefault(), a.trim() && w()), l.key === "Escape" && (s(!1), u(""));
            },
            placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
            autoFocus: !0,
            className: t("w-full min-h-[60px] p-2 text-[13px] border border-[#d1d5db] rounded-md resize-y font-[inherit] bg-white text-[#1e293b] outline-none")
          }
        ),
        /* @__PURE__ */ r("div", { className: t("flex gap-1.5 mt-1.5"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"),
              onClick: w,
              tabIndex: 0,
              children: "Submit & Acknowledge"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"),
              onClick: N,
              tabIndex: 0,
              children: "Submit & Reject"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]"),
              onClick: () => {
                s(!1), u("");
              },
              tabIndex: 0,
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const B = {
  summary: { bg: "#dbeafe", text: "#1e40af" },
  tasks: { bg: "#fef3c7", text: "#92400e" },
  decisions: { bg: "#ede9fe", text: "#5b21b6" },
  notes: { bg: "#f3f4f6", text: "#374151" },
  custom: { bg: "#e0e7ff", text: "#3730a3" }
};
function te({ section: e, onAckItem: i, onRejectItem: d, fragment: c, ydoc: s, provider: a, comments: u, onAddComment: m, onResolveThread: p, onUnresolveThread: h, participants: f }) {
  const w = B[e.type] ?? B.custom, N = e.items.filter((x) => x.status !== "pending").length;
  return /* @__PURE__ */ r("div", { className: t("bg-white border border-[#e5e7eb] rounded-lg p-5 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xl font-bold m-0 mb-1 text-[#1e293b]"), children: e.title }),
    /* @__PURE__ */ n(
      "span",
      {
        className: t("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
        style: { background: w.bg, color: w.text },
        children: e.type
      }
    ),
    c && /* @__PURE__ */ n("div", { className: t(e.items.length > 0 ? "mb-4" : ""), children: /* @__PURE__ */ n(
      R,
      {
        fragment: c,
        ydoc: s,
        provider: a,
        user: { name: "", color: "" },
        editable: !1,
        sectionId: e.id
      }
    ) }),
    !c && e.items.length === 0 && /* @__PURE__ */ r("div", { className: t("py-6 text-text-tertiary text-sm text-center"), children: [
      "This ",
      e.type,
      " section has no content. Switch to Editor mode to add content."
    ] }),
    e.items.length > 0 && /* @__PURE__ */ r("div", { children: [
      e.items.map((x) => /* @__PURE__ */ n(
        ee,
        {
          item: x,
          onAck: (l) => i(x.id, l),
          onReject: (l) => d(x.id, l)
        },
        x.id
      )),
      /* @__PURE__ */ r("div", { className: t("text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f3f4f6]"), children: [
        N,
        " of ",
        e.items.length,
        " items reviewed"
      ] })
    ] }),
    m && /* @__PURE__ */ n(
      W,
      {
        comments: u ?? [],
        onAddComment: m,
        participants: f,
        onResolveThread: p,
        onUnresolveThread: h
      }
    )
  ] });
}
const P = 4;
function xe({ sections: e, onAckItem: i, onRejectItem: d, participants: c, onSectionFocus: s, jumpToIndex: a, onJumpComplete: u, getSectionFragment: m, ydoc: p, provider: h, comments: f, onAddComment: w, onResolveThread: N, onUnresolveThread: x }) {
  const [l, v] = j(0), S = Math.max(1, Math.ceil(e.length / P)), y = l * P, o = e.slice(y, y + P);
  if (T(() => {
    a != null && a >= 0 && a < e.length && (v(Math.floor(a / P)), u?.());
  }, [a, e.length, u]), T(() => {
    o.length > 0 && s && s(o[0].id);
  }, [y, s]), e.length === 0)
    return /* @__PURE__ */ n("div", { className: t("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." });
  const k = () => v((g) => Math.max(0, g - 1)), M = () => v((g) => Math.min(S - 1, g + 1)), C = y + o.length;
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ n(Z, { current: C, total: e.length }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-4"), children: o.map((g) => {
      const D = c?.filter((b) => b.currentSectionId === g.id) ?? [];
      return /* @__PURE__ */ r("div", { children: [
        D.length > 0 && /* @__PURE__ */ r("div", { className: t("flex gap-1 mb-1.5 items-center"), children: [
          /* @__PURE__ */ n("span", { className: t("text-xs text-[#6b7280] mr-1"), children: "Viewing:" }),
          D.map((b) => /* @__PURE__ */ n(
            "div",
            {
              title: `${b.displayName} (${b.mode})`,
              className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
              style: { background: b.color },
              children: b.displayName.split(" ").map((A) => A[0]).join("").toUpperCase().slice(0, 2)
            },
            b.clientId
          ))
        ] }),
        /* @__PURE__ */ n(
          te,
          {
            section: g,
            onAckItem: (b, A) => i(g.id, b, A),
            onRejectItem: (b, A) => d(g.id, b, A),
            fragment: m(g.id),
            ydoc: p,
            provider: h,
            comments: f?.[g.id],
            onAddComment: w ? (b, A) => w(g.id, b, A) : void 0,
            onResolveThread: N ? (b) => N(g.id, b) : void 0,
            onUnresolveThread: x ? (b) => x(g.id, b) : void 0,
            participants: D
          }
        )
      ] }, g.id);
    }) }),
    /* @__PURE__ */ r("div", { className: t("flex justify-between items-center mt-4 py-3"), children: [
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: t(
            "px-[18px] py-2 text-sm font-semibold border border-[#d1d5db] rounded-md font-[inherit]",
            l === 0 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: k,
          disabled: l === 0,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r("span", { className: t("text-[13px] text-[#6b7280]"), children: [
        "Page ",
        l + 1,
        " of ",
        S,
        " (",
        e.length,
        " sections)"
      ] }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: t(
            "px-[18px] py-2 text-sm font-semibold border border-[#d1d5db] rounded-md font-[inherit]",
            l === S - 1 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: M,
          disabled: l === S - 1,
          children: "Next"
        }
      )
    ] })
  ] });
}
function ne(e) {
  return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function re(e, i) {
  const d = i.documentTitle ? ` in ${i.documentTitle}` : "";
  switch (e) {
    case "doc.ack":
      return `acknowledged "${i.itemText || "item"}"${d}`;
    case "doc.reject":
      return `rejected "${i.itemText || "item"}"${d}`;
    case "doc.add_item":
      return `added task in "${i.sectionTitle || "section"}"${d}`;
    case "doc.add_section":
      return `added new section${d}`;
    case "doc.edit_section":
      return `edited "${i.sectionTitle || "section"}"${d}`;
    case "doc.remove_item":
      return `removed "${i.itemText || "item"}"${d}`;
    case "doc.comment":
      return `commented: "${i.text || "..."}"${d}`;
    case "pipeline.run.started": {
      const c = i.pipelineId ?? "";
      return c ? `triggered pipeline ${c}` : "triggered a pipeline";
    }
    case "pipeline.run.completed":
      return typeof i.durationMs == "number" ? `pipeline run completed in ${i.durationMs}ms` : "pipeline run completed";
    case "pipeline.run.failed":
      return `pipeline run failed: ${i.error ?? "unknown error"}`;
    case "pipeline.approval.requested":
      return "approval requested";
    default:
      return i.description ? String(i.description) : e;
  }
}
function ie(e) {
  return e.split(" ").map((i) => i[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function se(e) {
  try {
    return new Date(e).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "";
  }
}
function oe(e) {
  switch (e) {
    case "editor":
      return "editing";
    case "reviewer":
      return "reviewing";
    case "reader":
      return "reading";
    default:
      return "online";
  }
}
function be({ events: e, participants: i }) {
  const [d, c] = j(!1);
  return /* @__PURE__ */ r("div", { className: t("bg-[#f8fafc] border border-border rounded-lg overflow-hidden"), children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: t("flex items-center justify-between px-3 py-2 bg-[#f1f5f9] border-b border-border text-[13px] font-semibold text-[#334155] cursor-pointer select-none"),
        onClick: () => c((s) => !s),
        children: [
          /* @__PURE__ */ r("span", { children: [
            "Activity ",
            e.length > 0 && `(${e.length})`
          ] }),
          /* @__PURE__ */ n("span", { className: t("text-[11px] font-normal text-text-tertiary"), children: d ? "▶" : "▼" })
        ]
      }
    ),
    !d && /* @__PURE__ */ r($, { children: [
      i.length > 0 && /* @__PURE__ */ r("div", { className: t("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-[#64748b] flex-wrap"), children: [
        /* @__PURE__ */ n("span", { className: t("font-semibold"), children: "Active:" }),
        i.map((s) => /* @__PURE__ */ r("span", { className: t("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-[#334155]"), children: [
          /* @__PURE__ */ n("span", { className: t("w-2 h-2 rounded-full shrink-0"), style: { background: s.color } }),
          s.displayName,
          " (",
          oe(s.mode),
          ")"
        ] }, s.clientId))
      ] }),
      /* @__PURE__ */ n("div", { className: t("max-h-[260px] overflow-y-auto py-1"), children: e.length === 0 ? /* @__PURE__ */ n("div", { className: t("px-3 py-4 text-center text-text-tertiary text-xs"), children: "No activity yet. Actions like acknowledging tasks will appear here." }) : e.map((s) => /* @__PURE__ */ r("div", { className: t("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-[#f1f5f9]"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
            style: { background: s.color || "#94a3b8" },
            children: ie(s.displayName || "Unknown")
          }
        ),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ n("span", { className: t("font-semibold text-[#334155]"), children: s.displayName || "Unknown" }),
          " ",
          /* @__PURE__ */ r("span", { className: t("text-[#64748b]"), children: [
            ne(s.eventType),
            " ",
            re(s.eventType, s.detail)
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: t("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"), children: se(s.timestamp) })
      ] }, s.id)) })
    ] })
  ] });
}
export {
  xe as AckMode,
  we as ActionItemsCard,
  be as ActivityFeed,
  Ne as AttachmentsPanel,
  te as ChunkViewer,
  ye as DiffViewer,
  ve as DocumentEditorPage,
  ke as DocumentHeader,
  me as DocumentListPage,
  qe as EditorToolbar,
  Ce as ExecutiveSummaryCard,
  Me as FollowModeBar,
  Se as HeaderBanner,
  je as KeyDecisionsCard,
  Ae as MentionDropdown,
  $e as MyMentionsPanel,
  F as NewDocumentModal,
  Pe as ParticipantAvatars,
  Ee as ReaderMode,
  _e as ReviewMode,
  Z as ReviewProgress,
  ee as ReviewableItem,
  De as SectionBlock,
  W as SectionComments,
  Ie as SectionList,
  Te as SectionSummariesCard,
  fe as StandaloneTiptap,
  Re as TableOfContents,
  ze as TaskItemRow,
  Ge as TaskList,
  R as TiptapEditor,
  He as VersionHistoryPanel,
  Le as VideoCallPanel,
  Oe as VideoHistoryPanel,
  Be as countAllComments,
  Ue as generateSummaryBullets,
  We as getInitials,
  Fe as relativeTime,
  Ve as useDocumentActions,
  Xe as useSidebarPanels
};
