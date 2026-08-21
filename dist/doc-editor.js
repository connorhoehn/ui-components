import { S as W } from "./DocumentEditorPage-DmOW28h7.js";
import { A as ye, a as ve, D as ke, b as Ce, c as Me, E as Se, F as je, H as Ae, K as $e, M as Pe, d as Ee, P as _e, R as De, e as Ie, f as Te, g as Re, h as He, T as Le, V as Oe, i as Be, j as Ue, k as We, l as Fe, m as Ve, r as Xe, u as Ke, n as qe } from "./DocumentEditorPage-DmOW28h7.js";
import { jsxs as n, jsx as r, Fragment as $ } from "react/jsx-runtime";
import { useState as j, useMemo as _, useCallback as T, useRef as P, useEffect as D } from "react";
import { N as F, T as R } from "./NewDocumentModal-CkLx3Yvx.js";
import { E as Ge, a as Ye, b as Qe } from "./NewDocumentModal-CkLx3Yvx.js";
import { c as t } from "./cn-B6yFEsav.js";
import { o as V, p as X } from "./useWebSocket-Bn4OeUor.js";
import { T as K } from "./Textarea-kaa9rHUL.js";
function q(e) {
  const s = Date.now(), d = new Date(e).getTime();
  if (isNaN(d)) return "";
  const l = s - d;
  if (l < 0) return "just now";
  const i = Math.floor(l / 1e3);
  if (i < 60) return "just now";
  const a = Math.floor(i / 60);
  if (a < 60) return `${a}m ago`;
  const c = Math.floor(a / 60);
  if (c < 24) return `${c}h ago`;
  const x = Math.floor(c / 24);
  return x < 30 ? `${x}d ago` : `${Math.floor(x / 30)}mo ago`;
}
const H = {
  draft: { bg: "#fef3c7", color: "#92400e" },
  review: { bg: "#dbeafe", color: "#1e40af" },
  final: { bg: "#d1fae5", color: "#065f46" },
  archived: { bg: "#f1f5f9", color: "#475569" }
};
function z({ status: e }) {
  const s = H[e] ?? H.draft;
  return /* @__PURE__ */ r(
    "span",
    {
      className: t("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
      style: { background: s.bg, color: s.color },
      children: e
    }
  );
}
const L = {
  editor: { icon: "✏", label: "Editing" },
  reviewer: { icon: "✔", label: "Reviewing" },
  reader: { icon: "👁", label: "Viewing" }
};
function G({
  users: e,
  onClickUser: s
}) {
  const l = e.slice(0, 5), i = e.length - 5;
  return /* @__PURE__ */ n("div", { className: t("flex items-center gap-0.5"), children: [
    l.map((a, c) => {
      const x = L[a.mode ?? "editor"] ?? L.editor, p = a.idle === !0, w = p ? "#f59e0b" : "#10b981";
      return /* @__PURE__ */ n(
        "div",
        {
          title: `${a.displayName} — ${p ? "Away" : x.label}`,
          onClick: (h) => {
            h.stopPropagation(), s(a.userId);
          },
          className: t("relative cursor-pointer"),
          style: { marginLeft: c > 0 ? -6 : 0, zIndex: 5 - c },
          children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: t("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
                style: { background: p ? `${a.color}99` : a.color },
                children: a.displayName.split(" ").map((h) => h[0]).join("").slice(0, 2).toUpperCase()
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: t("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
                style: { background: w }
              }
            ),
            /* @__PURE__ */ r("div", { className: t("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none"), children: x.icon })
          ]
        },
        a.userId
      );
    }),
    i > 0 && /* @__PURE__ */ n(
      "div",
      {
        className: t("w-8 h-8 rounded-full bg-[#94a3b8] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
        children: [
          "+",
          i
        ]
      }
    )
  ] });
}
function xe({
  documents: e,
  presence: s,
  onOpenDocument: d,
  onCreateDocument: l,
  onDeleteDocument: i,
  onJumpToUser: a,
  hideHeader: c
}) {
  const [x, p] = j(!1), [w, h] = j(null), [b, N] = j(1), u = 10, m = Math.max(1, Math.ceil(e.length / u)), y = Math.min(b, m), M = _(() => {
    const o = (y - 1) * u;
    return e.slice(o, o + u);
  }, [e, y]), f = T(
    (o, k, S) => {
      o.stopPropagation(), window.confirm(`Delete "${S}"? This cannot be undone.`) && i(k);
    },
    [i]
  );
  return /* @__PURE__ */ n("div", { className: t("px-4"), children: [
    !c && /* @__PURE__ */ n("div", { className: t("flex items-center justify-between mb-5"), children: [
      /* @__PURE__ */ r("h1", { className: t("m-0 text-[22px] font-bold text-[#1e293b]"), children: "Documents" }),
      /* @__PURE__ */ n(
        "button",
        {
          "data-testid": "new-document-btn",
          onClick: () => p(!0),
          className: t("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-[#3b82f6] text-white cursor-pointer font-[inherit]"),
          children: [
            /* @__PURE__ */ r("span", { className: t("text-base leading-none"), children: "+" }),
            "New Document"
          ]
        }
      )
    ] }),
    e.length === 0 ? /* @__PURE__ */ r(
      "div",
      {
        "data-testid": "documents-empty",
        className: t("text-center px-4 py-12 text-text-tertiary text-[15px]"),
        children: "No documents yet. Create your first document to get started."
      }
    ) : /* @__PURE__ */ r("div", { className: t("flex flex-col gap-3"), children: M.map((o) => {
      const k = s[o.id] ?? [], S = w === o.id;
      return /* @__PURE__ */ n(
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
            /* @__PURE__ */ r("span", { className: t("text-2xl shrink-0"), children: o.icon }),
            /* @__PURE__ */ n("div", { className: t("flex-1 min-w-0"), children: [
              /* @__PURE__ */ n("div", { className: t("flex items-center gap-2 mb-0.5"), children: [
                /* @__PURE__ */ r("span", { className: t("text-[15px] font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: o.title }),
                /* @__PURE__ */ r(z, { status: o.status }),
                o.type && /* @__PURE__ */ r("span", { className: t("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"), children: o.type }),
                o.activeCallSessionId && /* @__PURE__ */ n("span", { className: t("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#dcfce7] text-[#166534] leading-[18px]"), children: [
                  /* @__PURE__ */ r("span", { className: t("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }),
                  "Live Call"
                ] })
              ] }),
              o.description && /* @__PURE__ */ r("div", { className: t("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"), children: o.description }),
              /* @__PURE__ */ n("div", { className: t("text-xs text-text-tertiary"), children: [
                "Updated ",
                q(o.updatedAt)
              ] })
            ] }),
            k.length > 0 && /* @__PURE__ */ r("div", { className: t("shrink-0"), children: /* @__PURE__ */ r(
              G,
              {
                users: k,
                onClickUser: (C) => a(o.id, C)
              }
            ) }),
            S && /* @__PURE__ */ r(
              "button",
              {
                onClick: (C) => f(C, o.id, o.title),
                title: "Delete document",
                className: t("absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-[#fee2e2] text-danger-fg text-sm leading-none cursor-pointer font-[inherit] p-0"),
                children: "×"
              }
            )
          ]
        },
        o.id
      );
    }) }),
    e.length > u && /* @__PURE__ */ n(
      "div",
      {
        "data-testid": "pagination-controls",
        className: t("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
        children: [
          /* @__PURE__ */ r(
            "button",
            {
              "data-testid": "pagination-prev",
              disabled: y <= 1,
              onClick: () => N((o) => Math.max(1, o - 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                y <= 1 ? "bg-surface-hover text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Previous"
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              "data-testid": "pagination-info",
              className: t("text-[13px] text-text-secondary font-medium"),
              children: [
                "Page ",
                y,
                " of ",
                m
              ]
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              "data-testid": "pagination-next",
              disabled: y >= m,
              onClick: () => N((o) => Math.min(m, o + 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                y >= m ? "bg-surface-hover text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Next"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ r(
      F,
      {
        open: x,
        onClose: () => p(!1),
        onCreate: l
      }
    )
  ] });
}
const U = "prosemirror";
function Y(e) {
  return e.ydoc !== void 0;
}
function be(e) {
  return Y(e) ? /* @__PURE__ */ r(Q, { ...e }) : /* @__PURE__ */ r(Z, { ...e });
}
function Q({
  ydoc: e,
  provider: s,
  fragment: d,
  user: l,
  fragmentName: i = U,
  editable: a,
  placeholder: c,
  className: x,
  onFragmentReady: p
}) {
  const w = _(
    () => d ?? e.getXmlFragment(i),
    [d, e, i]
  ), h = P(!1);
  return h.current || (h.current = !0, p?.(w, e)), /* @__PURE__ */ r("div", { className: t(x), children: /* @__PURE__ */ r(
    R,
    {
      fragment: w,
      ydoc: e,
      provider: s,
      user: l,
      editable: a,
      placeholder: c
    }
  ) });
}
function Z({
  gatewayUrl: e,
  docId: s,
  authToken: d,
  channel: l,
  user: i,
  fragmentName: a = U,
  editable: c,
  placeholder: x,
  className: p,
  onFragmentReady: w,
  loadingSlot: h
}) {
  const b = l ?? `doc:${s}`, N = P(/* @__PURE__ */ new Set()), u = T(
    (C) => (N.current.add(C), () => {
      N.current.delete(C);
    }),
    []
  ), m = T((C) => {
    N.current.forEach((v) => v(C));
  }, []), y = _(
    () => ({
      wsUrl: e,
      cognitoToken: d,
      defaultChannel: b
    }),
    [e, d, b]
  ), M = V({ config: y, onMessage: m }), { ydoc: f, provider: o } = X({
    documentId: s,
    ws: M,
    onMessage: u
  }), k = _(
    () => f ? f.getXmlFragment(a) : null,
    [f, a]
  ), S = P(!1);
  return !S.current && k && f && (S.current = !0, w?.(k, f)), !f || !k ? /* @__PURE__ */ r("div", { className: t(p), children: h ?? null }) : /* @__PURE__ */ r("div", { className: t(p), children: /* @__PURE__ */ r(
    R,
    {
      fragment: k,
      ydoc: f,
      provider: o,
      user: i,
      editable: c,
      placeholder: x
    }
  ) });
}
function J({ current: e, total: s }) {
  const d = s > 0 ? Math.round(e / s * 100) : 0;
  return /* @__PURE__ */ n("div", { className: t("mb-4"), children: [
    /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
      /* @__PURE__ */ n("span", { children: [
        e,
        " of ",
        s,
        " sections reviewed"
      ] }),
      /* @__PURE__ */ n("span", { children: [
        d,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: t("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ r(
      "div",
      {
        className: t("h-full bg-[#3b82f6] rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${d}%` }
      }
    ) })
  ] });
}
const ee = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  acked: { bg: "#d1fae5", text: "#065f46" },
  done: { bg: "#dbeafe", text: "#1e40af" },
  rejected: { bg: "#fee2e2", text: "#991b1b" }
}, O = {
  low: "#6b7280",
  medium: "#f59e0b",
  high: "#ef4444"
};
function te({ item: e, onAck: s, onReject: d }) {
  const [l, i] = j(!1), [a, c] = j(""), [x, p] = j("none"), w = P(e.status), h = ee[e.status], [b, N] = j(!1), u = P(null);
  D(() => () => {
    u.current && clearTimeout(u.current);
  }, []), D(() => {
    w.current === "pending" && e.status === "acked" ? p("ack") : w.current === "pending" && e.status === "rejected" && p("reject"), w.current = e.status;
  }, [e.status]);
  const m = () => {
    b || (N(!0), p("ack"), u.current = setTimeout(() => {
      u.current = null, s(a || void 0), c(""), i(!1), N(!1);
    }, 150));
  }, y = () => {
    if (!b) {
      if (!a.trim()) {
        i(!0);
        return;
      }
      N(!0), p("reject"), u.current = setTimeout(() => {
        u.current = null, d(a), c(""), i(!1), N(!1);
      }, 150);
    }
  };
  return /* @__PURE__ */ n("div", { className: t("bg-white border border-[#e5e7eb] rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", x === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-[#22c55e] bg-success-bg" : x === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-[#ef4444] bg-danger-bg" : ""), children: [
    /* @__PURE__ */ n("div", { className: t("flex items-center mb-1.5"), children: [
      /* @__PURE__ */ r("span", { className: t("text-sm font-medium flex-1 text-[#1e293b]"), children: e.text }),
      /* @__PURE__ */ r(
        "span",
        {
          className: t("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
          style: { background: h.bg, color: h.text },
          children: e.status
        }
      ),
      /* @__PURE__ */ r(
        "span",
        {
          className: t("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
          style: { color: O[e.priority], border: `1px solid ${O[e.priority]}` },
          children: e.priority
        }
      )
    ] }),
    e.status === "acked" && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 text-xs text-[#6b7280] mb-1"), children: [
      /* @__PURE__ */ r("span", { className: t("w-5 h-5 rounded-full bg-[#22c55e] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✓" }),
      /* @__PURE__ */ n("span", { children: [
        "Approved by ",
        /* @__PURE__ */ r("strong", { className: t("text-[#334155]"), children: e.ackedBy?.slice(0, 8) ?? "user" }),
        e.ackedAt && /* @__PURE__ */ n($, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ n($, { children: [
          " — ",
          e.notes
        ] })
      ] })
    ] }),
    e.status === "rejected" && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 text-xs text-[#991b1b] mb-1"), children: [
      /* @__PURE__ */ r("span", { className: t("w-5 h-5 rounded-full bg-[#ef4444] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✕" }),
      /* @__PURE__ */ n("span", { children: [
        "Rejected by ",
        /* @__PURE__ */ r("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
        e.ackedAt && /* @__PURE__ */ n($, { children: [
          " · ",
          new Date(e.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        e.notes && /* @__PURE__ */ n($, { children: [
          " — ",
          e.notes
        ] })
      ] })
    ] }),
    e.status === "pending" && /* @__PURE__ */ n("div", { children: [
      /* @__PURE__ */ n("div", { className: t("flex gap-2 mt-1.5"), children: [
        /* @__PURE__ */ r("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white", b && "opacity-60 cursor-not-allowed"), onClick: m, disabled: b, children: "Acknowledge" }),
        /* @__PURE__ */ r("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white", b && "opacity-60 cursor-not-allowed"), onClick: y, disabled: b, children: "Reject" }),
        !l && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: t("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-border-field"),
            onClick: () => i(!0),
            children: "Add note"
          }
        )
      ] }),
      l && /* @__PURE__ */ n("div", { className: t("mt-2"), children: [
        /* @__PURE__ */ r(
          K,
          {
            value: a,
            onChange: (f) => c(f.target.value),
            onKeyDown: (f) => {
              f.key === "Enter" && !f.shiftKey && (f.preventDefault(), a.trim() && m()), f.key === "Escape" && (i(!1), c(""));
            },
            placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
            autoFocus: !0,
            className: t("min-h-[60px] resize-y")
          }
        ),
        /* @__PURE__ */ n("div", { className: t("flex gap-1.5 mt-1.5"), children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"),
              onClick: m,
              disabled: b,
              tabIndex: 0,
              children: "Submit & Acknowledge"
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"),
              onClick: y,
              disabled: b,
              tabIndex: 0,
              children: "Submit & Reject"
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-border-field"),
              onClick: () => {
                i(!1), c("");
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
function re({ section: e, onAckItem: s, onRejectItem: d, fragment: l, ydoc: i, provider: a, comments: c, onAddComment: x, onResolveThread: p, onUnresolveThread: w, participants: h }) {
  const b = B[e.type] ?? B.custom, N = e.items.filter((u) => u.status !== "pending").length;
  return /* @__PURE__ */ n("div", { className: t("bg-white border border-[#e5e7eb] rounded-lg p-5 mb-4"), children: [
    /* @__PURE__ */ r("h2", { className: t("text-xl font-bold m-0 mb-1 text-[#1e293b]"), children: e.title }),
    /* @__PURE__ */ r(
      "span",
      {
        className: t("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
        style: { background: b.bg, color: b.text },
        children: e.type
      }
    ),
    l && /* @__PURE__ */ r("div", { className: t(e.items.length > 0 ? "mb-4" : ""), children: /* @__PURE__ */ r(
      R,
      {
        fragment: l,
        ydoc: i,
        provider: a,
        user: { name: "", color: "" },
        editable: !1,
        sectionId: e.id
      }
    ) }),
    !l && e.items.length === 0 && /* @__PURE__ */ n("div", { className: t("py-6 text-text-tertiary text-sm text-center"), children: [
      "This ",
      e.type,
      " section has no content. Switch to Editor mode to add content."
    ] }),
    e.items.length > 0 && /* @__PURE__ */ n("div", { children: [
      e.items.map((u) => /* @__PURE__ */ r(
        te,
        {
          item: u,
          onAck: (m) => s(u.id, m),
          onReject: (m) => d(u.id, m)
        },
        u.id
      )),
      /* @__PURE__ */ n("div", { className: t("text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f3f4f6]"), children: [
        N,
        " of ",
        e.items.length,
        " items reviewed"
      ] })
    ] }),
    x && /* @__PURE__ */ r(
      W,
      {
        comments: c ?? [],
        onAddComment: x,
        participants: h,
        onResolveThread: p,
        onUnresolveThread: w
      }
    )
  ] });
}
const E = 4;
function he({ sections: e, onAckItem: s, onRejectItem: d, participants: l, onSectionFocus: i, jumpToIndex: a, onJumpComplete: c, getSectionFragment: x, ydoc: p, provider: w, comments: h, onAddComment: b, onResolveThread: N, onUnresolveThread: u }) {
  const [m, y] = j(0), M = Math.max(1, Math.ceil(e.length / E)), f = m * E, o = e.slice(f, f + E);
  if (D(() => {
    a != null && a >= 0 && a < e.length && (y(Math.floor(a / E)), c?.());
  }, [a, e.length, c]), D(() => {
    o.length > 0 && i && i(o[0].id);
  }, [f, i]), e.length === 0)
    return /* @__PURE__ */ r("div", { className: t("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." });
  const k = () => y((v) => Math.max(0, v - 1)), S = () => y((v) => Math.min(M - 1, v + 1)), C = f + o.length;
  return /* @__PURE__ */ n("div", { children: [
    /* @__PURE__ */ r(J, { current: C, total: e.length }),
    /* @__PURE__ */ r("div", { className: t("flex flex-col gap-4"), children: o.map((v) => {
      const I = l?.filter((g) => g.currentSectionId === v.id) ?? [];
      return /* @__PURE__ */ n("div", { children: [
        I.length > 0 && /* @__PURE__ */ n("div", { className: t("flex gap-1 mb-1.5 items-center"), children: [
          /* @__PURE__ */ r("span", { className: t("text-xs text-[#6b7280] mr-1"), children: "Viewing:" }),
          I.map((g) => /* @__PURE__ */ r(
            "div",
            {
              title: `${g.displayName} (${g.mode})`,
              className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
              style: { background: g.color },
              children: g.displayName.split(" ").map((A) => A[0]).join("").toUpperCase().slice(0, 2)
            },
            g.clientId
          ))
        ] }),
        /* @__PURE__ */ r(
          re,
          {
            section: v,
            onAckItem: (g, A) => s(v.id, g, A),
            onRejectItem: (g, A) => d(v.id, g, A),
            fragment: x(v.id),
            ydoc: p,
            provider: w,
            comments: h?.[v.id],
            onAddComment: b ? (g, A) => b(v.id, g, A) : void 0,
            onResolveThread: N ? (g) => N(v.id, g) : void 0,
            onUnresolveThread: u ? (g) => u(v.id, g) : void 0,
            participants: I
          }
        )
      ] }, v.id);
    }) }),
    /* @__PURE__ */ n("div", { className: t("flex justify-between items-center mt-4 py-3"), children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          className: t(
            "px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]",
            m === 0 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: k,
          disabled: m === 0,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n("span", { className: t("text-[13px] text-[#6b7280]"), children: [
        "Page ",
        m + 1,
        " of ",
        M,
        " (",
        e.length,
        " sections)"
      ] }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          className: t(
            "px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]",
            m === M - 1 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: S,
          disabled: m === M - 1,
          children: "Next"
        }
      )
    ] })
  ] });
}
function ne(e) {
  return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function se(e, s) {
  const d = s.documentTitle ? ` in ${s.documentTitle}` : "";
  switch (e) {
    case "doc.ack":
      return `acknowledged "${s.itemText || "item"}"${d}`;
    case "doc.reject":
      return `rejected "${s.itemText || "item"}"${d}`;
    case "doc.add_item":
      return `added task in "${s.sectionTitle || "section"}"${d}`;
    case "doc.add_section":
      return `added new section${d}`;
    case "doc.edit_section":
      return `edited "${s.sectionTitle || "section"}"${d}`;
    case "doc.remove_item":
      return `removed "${s.itemText || "item"}"${d}`;
    case "doc.comment":
      return `commented: "${s.text || "..."}"${d}`;
    case "pipeline.run.started": {
      const l = s.pipelineId ?? "";
      return l ? `triggered pipeline ${l}` : "triggered a pipeline";
    }
    case "pipeline.run.completed":
      return typeof s.durationMs == "number" ? `pipeline run completed in ${s.durationMs}ms` : "pipeline run completed";
    case "pipeline.run.failed":
      return `pipeline run failed: ${s.error ?? "unknown error"}`;
    case "pipeline.approval.requested":
      return "approval requested";
    default:
      return s.description ? String(s.description) : e;
  }
}
function ie(e) {
  return e.split(" ").map((s) => s[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function oe(e) {
  try {
    return new Date(e).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "";
  }
}
function ae(e) {
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
function ge({ events: e, participants: s }) {
  const [d, l] = j(!1);
  return /* @__PURE__ */ n("div", { className: t("bg-surface-panel border border-border rounded-lg overflow-hidden"), children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: t("flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-[#334155] cursor-pointer select-none"),
        onClick: () => l((i) => !i),
        children: [
          /* @__PURE__ */ n("span", { children: [
            "Activity ",
            e.length > 0 && `(${e.length})`
          ] }),
          /* @__PURE__ */ r("span", { className: t("text-[11px] font-normal text-text-tertiary"), children: d ? "▶" : "▼" })
        ]
      }
    ),
    !d && /* @__PURE__ */ n($, { children: [
      s.length > 0 && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"), children: [
        /* @__PURE__ */ r("span", { className: t("font-semibold"), children: "Active:" }),
        s.map((i) => /* @__PURE__ */ n("span", { className: t("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-[#334155]"), children: [
          /* @__PURE__ */ r("span", { className: t("w-2 h-2 rounded-full shrink-0"), style: { background: i.color } }),
          i.displayName,
          " (",
          ae(i.mode),
          ")"
        ] }, i.clientId))
      ] }),
      /* @__PURE__ */ r("div", { className: t("max-h-[260px] overflow-y-auto py-1"), children: e.length === 0 ? /* @__PURE__ */ r("div", { className: t("px-3 py-4 text-center text-text-tertiary text-xs"), children: "No activity yet. Actions like acknowledging tasks will appear here." }) : e.map((i) => /* @__PURE__ */ n("div", { className: t("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-[#f1f5f9]"), children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: t("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
            style: { background: i.color || "#94a3b8" },
            children: ie(i.displayName || "Unknown")
          }
        ),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ r("span", { className: t("font-semibold text-[#334155]"), children: i.displayName || "Unknown" }),
          " ",
          /* @__PURE__ */ n("span", { className: t("text-neutral"), children: [
            ne(i.eventType),
            " ",
            se(i.eventType, i.detail)
          ] })
        ] }),
        /* @__PURE__ */ r("span", { className: t("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"), children: oe(i.timestamp) })
      ] }, i.id)) })
    ] })
  ] });
}
export {
  he as AckMode,
  ye as ActionItemsCard,
  ge as ActivityFeed,
  ve as AttachmentsPanel,
  re as ChunkViewer,
  ke as DiffViewer,
  Ce as DocumentEditorPage,
  Me as DocumentHeader,
  xe as DocumentListPage,
  Ge as EditorToolbar,
  Se as ExecutiveSummaryCard,
  je as FollowModeBar,
  Ae as HeaderBanner,
  $e as KeyDecisionsCard,
  Pe as MentionDropdown,
  Ee as MyMentionsPanel,
  F as NewDocumentModal,
  _e as ParticipantAvatars,
  De as ReaderMode,
  Ie as ReviewMode,
  J as ReviewProgress,
  te as ReviewableItem,
  Te as SectionBlock,
  W as SectionComments,
  Re as SectionList,
  He as SectionSummariesCard,
  be as StandaloneTiptap,
  Le as TableOfContents,
  Ye as TaskItemRow,
  Qe as TaskList,
  R as TiptapEditor,
  Oe as VersionHistoryPanel,
  Be as VideoCallPanel,
  Ue as VideoHistoryPanel,
  We as countAllComments,
  Fe as generateSummaryBullets,
  Ve as getInitials,
  Xe as relativeTime,
  Ke as useDocumentActions,
  qe as useSidebarPanels
};
