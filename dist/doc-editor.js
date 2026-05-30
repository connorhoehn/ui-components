import { S as H } from "./DocumentEditorPage-Dz7CIgYp.js";
import { A as ue, a as pe, D as me, b as fe, c as xe, E as be, F as he, H as ge, K as we, M as Ne, d as ye, P as ve, R as ke, e as Ce, f as Me, g as je, h as Se, T as Ae, V as Pe, i as $e, j as _e, k as De, l as Ie, m as Ee, r as Re, u as Te, n as He } from "./DocumentEditorPage-Dz7CIgYp.js";
import { jsxs as r, jsx as n, Fragment as P } from "react/jsx-runtime";
import { useState as v, useMemo as L, useCallback as O, useRef as B, useEffect as D } from "react";
import { N as U, T as V } from "./index-DL8soTWz.js";
import { E as Oe, a as Be, b as Ue } from "./index-DL8soTWz.js";
import { c as t } from "./cn-B6yFEsav.js";
function W(e) {
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
const I = {
  draft: { bg: "#fef3c7", color: "#92400e" },
  review: { bg: "#dbeafe", color: "#1e40af" },
  final: { bg: "#d1fae5", color: "#065f46" },
  archived: { bg: "#f1f5f9", color: "#475569" }
};
function K({ status: e }) {
  const i = I[e] ?? I.draft;
  return /* @__PURE__ */ n(
    "span",
    {
      className: t("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
      style: { background: i.bg, color: i.color },
      children: e
    }
  );
}
const E = {
  editor: { icon: "✏", label: "Editing" },
  reviewer: { icon: "✔", label: "Reviewing" },
  reader: { icon: "👁", label: "Viewing" }
};
function X({
  users: e,
  onClickUser: i
}) {
  const c = e.slice(0, 5), s = e.length - 5;
  return /* @__PURE__ */ r("div", { className: t("flex items-center gap-0.5"), children: [
    c.map((a, u) => {
      const m = E[a.mode ?? "editor"] ?? E.editor, f = a.idle === !0, g = f ? "#f59e0b" : "#10b981";
      return /* @__PURE__ */ r(
        "div",
        {
          title: `${a.displayName} — ${f ? "Away" : m.label}`,
          onClick: (h) => {
            h.stopPropagation(), i(a.userId);
          },
          className: t("relative cursor-pointer"),
          style: { marginLeft: u > 0 ? -6 : 0, zIndex: 5 - u },
          children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: t("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
                style: { background: f ? `${a.color}99` : a.color },
                children: a.displayName.split(" ").map((h) => h[0]).join("").slice(0, 2).toUpperCase()
              }
            ),
            /* @__PURE__ */ n(
              "div",
              {
                className: t("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
                style: { background: g }
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
function oe({
  documents: e,
  presence: i,
  onOpenDocument: d,
  onCreateDocument: c,
  onDeleteDocument: s,
  onJumpToUser: a,
  hideHeader: u
}) {
  const [m, f] = v(!1), [g, h] = v(null), [w, y] = v(1), x = 10, l = Math.max(1, Math.ceil(e.length / x)), N = Math.min(w, l), C = L(() => {
    const o = (N - 1) * x;
    return e.slice(o, o + x);
  }, [e, N]), M = O(
    (o, j, S) => {
      o.stopPropagation(), window.confirm(`Delete "${S}"? This cannot be undone.`) && s(j);
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
          onClick: () => f(!0),
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
    ) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-3"), children: C.map((o) => {
      const j = i[o.id] ?? [], S = g === o.id;
      return /* @__PURE__ */ r(
        "div",
        {
          "data-testid": `document-card-${o.id}`,
          onClick: () => d(o.id),
          onMouseEnter: () => h(o.id),
          onMouseLeave: () => h(null),
          className: t(
            "flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150",
            S ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          ),
          children: [
            /* @__PURE__ */ n("span", { className: t("text-2xl shrink-0"), children: o.icon }),
            /* @__PURE__ */ r("div", { className: t("flex-1 min-w-0"), children: [
              /* @__PURE__ */ r("div", { className: t("flex items-center gap-2 mb-0.5"), children: [
                /* @__PURE__ */ n("span", { className: t("text-[15px] font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: o.title }),
                /* @__PURE__ */ n(K, { status: o.status }),
                o.type && /* @__PURE__ */ n("span", { className: t("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-[#f1f5f9] text-text-secondary whitespace-nowrap shrink-0"), children: o.type }),
                o.activeCallSessionId && /* @__PURE__ */ r("span", { className: t("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#dcfce7] text-[#166534] leading-[18px]"), children: [
                  /* @__PURE__ */ n("span", { className: t("w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse") }),
                  "Live Call"
                ] })
              ] }),
              o.description && /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"), children: o.description }),
              /* @__PURE__ */ r("div", { className: t("text-xs text-text-tertiary"), children: [
                "Updated ",
                W(o.updatedAt)
              ] })
            ] }),
            j.length > 0 && /* @__PURE__ */ n("div", { className: t("shrink-0"), children: /* @__PURE__ */ n(
              X,
              {
                users: j,
                onClickUser: (A) => a(o.id, A)
              }
            ) }),
            S && /* @__PURE__ */ n(
              "button",
              {
                onClick: (A) => M(A, o.id, o.title),
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
              disabled: N <= 1,
              onClick: () => y((o) => Math.max(1, o - 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                N <= 1 ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
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
                N,
                " of ",
                l
              ]
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "pagination-next",
              disabled: N >= l,
              onClick: () => y((o) => Math.min(l, o + 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                N >= l ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Next"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(
      U,
      {
        open: m,
        onClose: () => f(!1),
        onCreate: c
      }
    )
  ] });
}
function q({ current: e, total: i }) {
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
const z = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  acked: { bg: "#d1fae5", text: "#065f46" },
  done: { bg: "#dbeafe", text: "#1e40af" },
  rejected: { bg: "#fee2e2", text: "#991b1b" }
}, R = {
  low: "#6b7280",
  medium: "#f59e0b",
  high: "#ef4444"
};
function F({ item: e, onAck: i, onReject: d }) {
  const [c, s] = v(!1), [a, u] = v(""), [m, f] = v("none"), g = B(e.status), h = z[e.status];
  D(() => {
    g.current === "pending" && e.status === "acked" ? f("ack") : g.current === "pending" && e.status === "rejected" && f("reject"), g.current = e.status;
  }, [e.status]);
  const w = () => {
    f("ack"), setTimeout(() => {
      i(a || void 0), u(""), s(!1);
    }, 150);
  }, y = () => {
    if (!a.trim()) {
      s(!0);
      return;
    }
    f("reject"), setTimeout(() => {
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
          style: { background: h.bg, color: h.text },
          children: e.status
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          className: t("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
          style: { color: R[e.priority], border: `1px solid ${R[e.priority]}` },
          children: e.priority
        }
      )
    ] }),
    e.status === "acked" && /* @__PURE__ */ r("div", { className: t("flex items-center gap-1.5 text-xs text-[#6b7280] mb-1"), children: [
      /* @__PURE__ */ n("span", { className: t("w-5 h-5 rounded-full bg-[#22c55e] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✓" }),
      /* @__PURE__ */ r("span", { children: [
        "Approved by ",
        /* @__PURE__ */ n("strong", { className: t("text-[#334155]"), children: e.ackedBy?.slice(0, 8) ?? "user" }),
        e.ackedAt && /* @__PURE__ */ r(P, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ r(P, { children: [
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
        e.ackedAt && /* @__PURE__ */ r(P, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ r(P, { children: [
          " — ",
          e.notes
        ] })
      ] })
    ] }),
    e.status === "pending" && /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ r("div", { className: t("flex gap-2 mt-1.5"), children: [
        /* @__PURE__ */ n("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"), onClick: w, children: "Acknowledge" }),
        /* @__PURE__ */ n("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"), onClick: y, children: "Reject" }),
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
              onClick: y,
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
const T = {
  summary: { bg: "#dbeafe", text: "#1e40af" },
  tasks: { bg: "#fef3c7", text: "#92400e" },
  decisions: { bg: "#ede9fe", text: "#5b21b6" },
  notes: { bg: "#f3f4f6", text: "#374151" },
  custom: { bg: "#e0e7ff", text: "#3730a3" }
};
function G({ section: e, onAckItem: i, onRejectItem: d, fragment: c, ydoc: s, provider: a, comments: u, onAddComment: m, onResolveThread: f, onUnresolveThread: g, participants: h }) {
  const w = T[e.type] ?? T.custom, y = e.items.filter((x) => x.status !== "pending").length;
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
      V,
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
        F,
        {
          item: x,
          onAck: (l) => i(x.id, l),
          onReject: (l) => d(x.id, l)
        },
        x.id
      )),
      /* @__PURE__ */ r("div", { className: t("text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f3f4f6]"), children: [
        y,
        " of ",
        e.items.length,
        " items reviewed"
      ] })
    ] }),
    m && /* @__PURE__ */ n(
      H,
      {
        comments: u ?? [],
        onAddComment: m,
        participants: h,
        onResolveThread: f,
        onUnresolveThread: g
      }
    )
  ] });
}
const $ = 4;
function ae({ sections: e, onAckItem: i, onRejectItem: d, participants: c, onSectionFocus: s, jumpToIndex: a, onJumpComplete: u, getSectionFragment: m, ydoc: f, provider: g, comments: h, onAddComment: w, onResolveThread: y, onUnresolveThread: x }) {
  const [l, N] = v(0), C = Math.max(1, Math.ceil(e.length / $)), M = l * $, o = e.slice(M, M + $);
  if (D(() => {
    a != null && a >= 0 && a < e.length && (N(Math.floor(a / $)), u?.());
  }, [a, e.length, u]), D(() => {
    o.length > 0 && s && s(o[0].id);
  }, [M, s]), e.length === 0)
    return /* @__PURE__ */ n("div", { className: t("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." });
  const j = () => N((b) => Math.max(0, b - 1)), S = () => N((b) => Math.min(C - 1, b + 1)), A = M + o.length;
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ n(q, { current: A, total: e.length }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-4"), children: o.map((b) => {
      const _ = c?.filter((p) => p.currentSectionId === b.id) ?? [];
      return /* @__PURE__ */ r("div", { children: [
        _.length > 0 && /* @__PURE__ */ r("div", { className: t("flex gap-1 mb-1.5 items-center"), children: [
          /* @__PURE__ */ n("span", { className: t("text-xs text-[#6b7280] mr-1"), children: "Viewing:" }),
          _.map((p) => /* @__PURE__ */ n(
            "div",
            {
              title: `${p.displayName} (${p.mode})`,
              className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
              style: { background: p.color },
              children: p.displayName.split(" ").map((k) => k[0]).join("").toUpperCase().slice(0, 2)
            },
            p.clientId
          ))
        ] }),
        /* @__PURE__ */ n(
          G,
          {
            section: b,
            onAckItem: (p, k) => i(b.id, p, k),
            onRejectItem: (p, k) => d(b.id, p, k),
            fragment: m(b.id),
            ydoc: f,
            provider: g,
            comments: h?.[b.id],
            onAddComment: w ? (p, k) => w(b.id, p, k) : void 0,
            onResolveThread: y ? (p) => y(b.id, p) : void 0,
            onUnresolveThread: x ? (p) => x(b.id, p) : void 0,
            participants: _
          }
        )
      ] }, b.id);
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
          onClick: j,
          disabled: l === 0,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r("span", { className: t("text-[13px] text-[#6b7280]"), children: [
        "Page ",
        l + 1,
        " of ",
        C,
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
            l === C - 1 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: S,
          disabled: l === C - 1,
          children: "Next"
        }
      )
    ] })
  ] });
}
function Y(e) {
  return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Q(e, i) {
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
function Z(e) {
  return e.split(" ").map((i) => i[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function J(e) {
  try {
    return new Date(e).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "";
  }
}
function ee(e) {
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
function de({ events: e, participants: i }) {
  const [d, c] = v(!1);
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
    !d && /* @__PURE__ */ r(P, { children: [
      i.length > 0 && /* @__PURE__ */ r("div", { className: t("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-[#64748b] flex-wrap"), children: [
        /* @__PURE__ */ n("span", { className: t("font-semibold"), children: "Active:" }),
        i.map((s) => /* @__PURE__ */ r("span", { className: t("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-[#334155]"), children: [
          /* @__PURE__ */ n("span", { className: t("w-2 h-2 rounded-full shrink-0"), style: { background: s.color } }),
          s.displayName,
          " (",
          ee(s.mode),
          ")"
        ] }, s.clientId))
      ] }),
      /* @__PURE__ */ n("div", { className: t("max-h-[260px] overflow-y-auto py-1"), children: e.length === 0 ? /* @__PURE__ */ n("div", { className: t("px-3 py-4 text-center text-text-tertiary text-xs"), children: "No activity yet. Actions like acknowledging tasks will appear here." }) : e.map((s) => /* @__PURE__ */ r("div", { className: t("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-[#f1f5f9]"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
            style: { background: s.color || "#94a3b8" },
            children: Z(s.displayName || "Unknown")
          }
        ),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ n("span", { className: t("font-semibold text-[#334155]"), children: s.displayName || "Unknown" }),
          " ",
          /* @__PURE__ */ r("span", { className: t("text-[#64748b]"), children: [
            Y(s.eventType),
            " ",
            Q(s.eventType, s.detail)
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: t("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"), children: J(s.timestamp) })
      ] }, s.id)) })
    ] })
  ] });
}
export {
  ae as AckMode,
  ue as ActionItemsCard,
  de as ActivityFeed,
  pe as AttachmentsPanel,
  G as ChunkViewer,
  me as DiffViewer,
  fe as DocumentEditorPage,
  xe as DocumentHeader,
  oe as DocumentListPage,
  Oe as EditorToolbar,
  be as ExecutiveSummaryCard,
  he as FollowModeBar,
  ge as HeaderBanner,
  we as KeyDecisionsCard,
  Ne as MentionDropdown,
  ye as MyMentionsPanel,
  U as NewDocumentModal,
  ve as ParticipantAvatars,
  ke as ReaderMode,
  Ce as ReviewMode,
  q as ReviewProgress,
  F as ReviewableItem,
  Me as SectionBlock,
  H as SectionComments,
  je as SectionList,
  Se as SectionSummariesCard,
  Ae as TableOfContents,
  Be as TaskItemRow,
  Ue as TaskList,
  V as TiptapEditor,
  Pe as VersionHistoryPanel,
  $e as VideoCallPanel,
  _e as VideoHistoryPanel,
  De as countAllComments,
  Ie as generateSummaryBullets,
  Ee as getInitials,
  Re as relativeTime,
  Te as useDocumentActions,
  He as useSidebarPanels
};
