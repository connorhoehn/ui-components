import { S as W } from "./DocumentEditorPage-8c0s4Uxk.js";
import { A as we, a as Ne, D as ke, b as Ce, c as Me, E as Se, F as je, H as Ae, K as $e, M as Pe, d as Ee, P as _e, R as De, e as Ie, f as Te, g as Re, h as He, T as Le, V as Oe, i as Be, j as Ue, k as We, l as Fe, m as Ve, r as Xe, u as Ke, n as qe } from "./DocumentEditorPage-8c0s4Uxk.js";
import { jsxs as n, jsx as r, Fragment as $ } from "react/jsx-runtime";
import { useState as j, useMemo as _, useCallback as T, useRef as P, useEffect as D } from "react";
import { N as F, T as R } from "./NewDocumentModal--mWvUs78.js";
import { E as Ge, a as Ye, b as Qe } from "./NewDocumentModal--mWvUs78.js";
import { c as t } from "./cn-B6yFEsav.js";
import { o as V, p as X } from "./useWebSocket-Bn4OeUor.js";
import { T as K } from "./Textarea-kaa9rHUL.js";
function q(e) {
  const o = Date.now(), l = new Date(e).getTime();
  if (isNaN(l)) return "";
  const c = o - l;
  if (c < 0) return "just now";
  const s = Math.floor(c / 1e3);
  if (s < 60) return "just now";
  const a = Math.floor(s / 60);
  if (a < 60) return `${a}m ago`;
  const d = Math.floor(a / 60);
  if (d < 24) return `${d}h ago`;
  const f = Math.floor(d / 24);
  return f < 30 ? `${f}d ago` : `${Math.floor(f / 30)}mo ago`;
}
const H = {
  draft: { bg: "var(--color-warning-bg)", color: "var(--color-warning-fg)" },
  review: { bg: "var(--color-info-bg)", color: "var(--color-info-fg)" },
  final: { bg: "var(--color-success-bg)", color: "var(--color-success-fg)" },
  archived: { bg: "var(--color-surface-hover)", color: "var(--color-text-secondary)" }
};
function z({ status: e }) {
  const o = H[e] ?? H.draft;
  return /* @__PURE__ */ r(
    "span",
    {
      className: t("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
      style: { background: o.bg, color: o.color },
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
  onClickUser: o
}) {
  const c = e.slice(0, 5), s = e.length - 5;
  return /* @__PURE__ */ n("div", { className: t("flex items-center gap-0.5"), children: [
    c.map((a, d) => {
      const f = L[a.mode ?? "editor"] ?? L.editor, p = a.idle === !0, y = p ? "var(--color-warning)" : "var(--color-success)";
      return /* @__PURE__ */ n(
        "div",
        {
          title: `${a.displayName} — ${p ? "Away" : f.label}`,
          onClick: (h) => {
            h.stopPropagation(), o(a.userId);
          },
          className: t("relative cursor-pointer"),
          style: { marginLeft: d > 0 ? -6 : 0, zIndex: 5 - d },
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
                style: { background: y }
              }
            ),
            /* @__PURE__ */ r("div", { className: t("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none"), children: f.icon })
          ]
        },
        a.userId
      );
    }),
    s > 0 && /* @__PURE__ */ n(
      "div",
      {
        className: t("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function fe({
  documents: e,
  presence: o,
  onOpenDocument: l,
  onCreateDocument: c,
  onDeleteDocument: s,
  onJumpToUser: a,
  hideHeader: d
}) {
  const [f, p] = j(!1), [y, h] = j(null), [b, v] = j(1), u = 10, m = Math.max(1, Math.ceil(e.length / u)), w = Math.min(b, m), M = _(() => {
    const i = (w - 1) * u;
    return e.slice(i, i + u);
  }, [e, w]), x = T(
    (i, k, S) => {
      i.stopPropagation(), window.confirm(`Delete "${S}"? This cannot be undone.`) && s(k);
    },
    [s]
  );
  return /* @__PURE__ */ n("div", { className: t("px-4"), children: [
    !d && /* @__PURE__ */ n("div", { className: t("flex items-center justify-between mb-5"), children: [
      /* @__PURE__ */ r("h1", { className: t("m-0 text-[22px] font-bold text-text-primary"), children: "Documents" }),
      /* @__PURE__ */ n(
        "button",
        {
          "data-testid": "new-document-btn",
          onClick: () => p(!0),
          className: t("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
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
    ) : /* @__PURE__ */ r("div", { className: t("flex flex-col gap-3"), children: M.map((i) => {
      const k = o[i.id] ?? [], S = y === i.id;
      return /* @__PURE__ */ n(
        "div",
        {
          "data-testid": `document-card-${i.id}`,
          onClick: () => l(i.id),
          onMouseEnter: () => h(i.id),
          onMouseLeave: () => h(null),
          className: t(
            "flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150",
            S ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          ),
          children: [
            /* @__PURE__ */ r("span", { className: t("text-2xl shrink-0"), children: i.icon }),
            /* @__PURE__ */ n("div", { className: t("flex-1 min-w-0"), children: [
              /* @__PURE__ */ n("div", { className: t("flex items-center gap-2 mb-0.5"), children: [
                /* @__PURE__ */ r("span", { className: t("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: i.title }),
                /* @__PURE__ */ r(z, { status: i.status }),
                i.type && /* @__PURE__ */ r("span", { className: t("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"), children: i.type }),
                i.activeCallSessionId && /* @__PURE__ */ n("span", { className: t("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"), children: [
                  /* @__PURE__ */ r("span", { className: t("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }),
                  "Live Call"
                ] })
              ] }),
              i.description && /* @__PURE__ */ r("div", { className: t("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"), children: i.description }),
              /* @__PURE__ */ n("div", { className: t("text-xs text-text-tertiary"), children: [
                "Updated ",
                q(i.updatedAt)
              ] })
            ] }),
            k.length > 0 && /* @__PURE__ */ r("div", { className: t("shrink-0"), children: /* @__PURE__ */ r(
              G,
              {
                users: k,
                onClickUser: (C) => a(i.id, C)
              }
            ) }),
            S && /* @__PURE__ */ r(
              "button",
              {
                onClick: (C) => x(C, i.id, i.title),
                title: "Delete document",
                className: t("absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-danger-bg text-danger-fg text-sm leading-none cursor-pointer font-[inherit] p-0"),
                children: "×"
              }
            )
          ]
        },
        i.id
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
              disabled: w <= 1,
              onClick: () => v((i) => Math.max(1, i - 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                w <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
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
                w,
                " of ",
                m
              ]
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              "data-testid": "pagination-next",
              disabled: w >= m,
              onClick: () => v((i) => Math.min(m, i + 1)),
              className: t(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                w >= m ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
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
        open: f,
        onClose: () => p(!1),
        onCreate: c
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
  provider: o,
  fragment: l,
  user: c,
  fragmentName: s = U,
  editable: a,
  placeholder: d,
  className: f,
  onFragmentReady: p
}) {
  const y = _(
    () => l ?? e.getXmlFragment(s),
    [l, e, s]
  ), h = P(!1);
  return h.current || (h.current = !0, p?.(y, e)), /* @__PURE__ */ r("div", { className: t(f), children: /* @__PURE__ */ r(
    R,
    {
      fragment: y,
      ydoc: e,
      provider: o,
      user: c,
      editable: a,
      placeholder: d
    }
  ) });
}
function Z({
  gatewayUrl: e,
  docId: o,
  authToken: l,
  channel: c,
  user: s,
  fragmentName: a = U,
  editable: d,
  placeholder: f,
  className: p,
  onFragmentReady: y,
  loadingSlot: h
}) {
  const b = c ?? `doc:${o}`, v = P(/* @__PURE__ */ new Set()), u = T(
    (C) => (v.current.add(C), () => {
      v.current.delete(C);
    }),
    []
  ), m = T((C) => {
    v.current.forEach((N) => N(C));
  }, []), w = _(
    () => ({
      wsUrl: e,
      cognitoToken: l,
      defaultChannel: b
    }),
    [e, l, b]
  ), M = V({ config: w, onMessage: m }), { ydoc: x, provider: i } = X({
    documentId: o,
    ws: M,
    onMessage: u
  }), k = _(
    () => x ? x.getXmlFragment(a) : null,
    [x, a]
  ), S = P(!1);
  return !S.current && k && x && (S.current = !0, y?.(k, x)), !x || !k ? /* @__PURE__ */ r("div", { className: t(p), children: h ?? null }) : /* @__PURE__ */ r("div", { className: t(p), children: /* @__PURE__ */ r(
    R,
    {
      fragment: k,
      ydoc: x,
      provider: i,
      user: s,
      editable: d,
      placeholder: f
    }
  ) });
}
function J({ current: e, total: o }) {
  const l = o > 0 ? Math.round(e / o * 100) : 0;
  return /* @__PURE__ */ n("div", { className: t("mb-4"), children: [
    /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-secondary mb-1 flex justify-between"), children: [
      /* @__PURE__ */ n("span", { children: [
        e,
        " of ",
        o,
        " sections reviewed"
      ] }),
      /* @__PURE__ */ n("span", { children: [
        l,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: t("h-2 bg-surface-emphasis rounded overflow-hidden"), children: /* @__PURE__ */ r(
      "div",
      {
        className: t("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${l}%` }
      }
    ) })
  ] });
}
const ee = {
  pending: { bg: "var(--color-warning-bg)", text: "var(--color-warning-fg)" },
  acked: { bg: "var(--color-success-bg)", text: "var(--color-success-fg)" },
  done: { bg: "var(--color-info-bg)", text: "var(--color-info-fg)" },
  rejected: { bg: "var(--color-danger-bg)", text: "var(--color-danger-fg)" }
}, O = {
  low: "var(--color-neutral)",
  medium: "var(--color-warning)",
  high: "var(--color-danger)"
};
function te({ item: e, onAck: o, onReject: l }) {
  const [c, s] = j(!1), [a, d] = j(""), [f, p] = j("none"), y = P(e.status), h = ee[e.status], [b, v] = j(!1), u = P(null);
  D(() => () => {
    u.current && clearTimeout(u.current);
  }, []), D(() => {
    y.current === "pending" && e.status === "acked" ? p("ack") : y.current === "pending" && e.status === "rejected" && p("reject"), y.current = e.status;
  }, [e.status]);
  const m = () => {
    b || (v(!0), p("ack"), u.current = setTimeout(() => {
      u.current = null, o(a || void 0), d(""), s(!1), v(!1);
    }, 150));
  }, w = () => {
    if (!b) {
      if (!a.trim()) {
        s(!0);
        return;
      }
      v(!0), p("reject"), u.current = setTimeout(() => {
        u.current = null, l(a), d(""), s(!1), v(!1);
      }, 150);
    }
  };
  return /* @__PURE__ */ n("div", { className: t("bg-white border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", f === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : f === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""), children: [
    /* @__PURE__ */ n("div", { className: t("flex items-center mb-1.5"), children: [
      /* @__PURE__ */ r("span", { className: t("text-sm font-medium flex-1 text-text-primary"), children: e.text }),
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
    e.status === "acked" && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 text-xs text-text-secondary mb-1"), children: [
      /* @__PURE__ */ r("span", { className: t("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✓" }),
      /* @__PURE__ */ n("span", { children: [
        "Approved by ",
        /* @__PURE__ */ r("strong", { className: t("text-text-primary"), children: e.ackedBy?.slice(0, 8) ?? "user" }),
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
    e.status === "rejected" && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 text-xs text-danger-fg mb-1"), children: [
      /* @__PURE__ */ r("span", { className: t("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✕" }),
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
        /* @__PURE__ */ r("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", b && "opacity-60 cursor-not-allowed"), onClick: m, disabled: b, children: "Acknowledge" }),
        /* @__PURE__ */ r("button", { type: "button", className: t("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", b && "opacity-60 cursor-not-allowed"), onClick: w, disabled: b, children: "Reject" }),
        !c && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: t("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
            onClick: () => s(!0),
            children: "Add note"
          }
        )
      ] }),
      c && /* @__PURE__ */ n("div", { className: t("mt-2"), children: [
        /* @__PURE__ */ r(
          K,
          {
            value: a,
            onChange: (x) => d(x.target.value),
            onKeyDown: (x) => {
              x.key === "Enter" && !x.shiftKey && (x.preventDefault(), a.trim() && m()), x.key === "Escape" && (s(!1), d(""));
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
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
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
              className: t("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
              onClick: w,
              disabled: b,
              tabIndex: 0,
              children: "Submit & Reject"
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: t("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
              onClick: () => {
                s(!1), d("");
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
  summary: { bg: "var(--color-info-bg)", text: "var(--color-info-fg)" },
  tasks: { bg: "var(--color-warning-bg)", text: "var(--color-warning-fg)" },
  decisions: { bg: "var(--color-accent-bg)", text: "var(--color-accent-fg)" },
  notes: { bg: "var(--color-surface-hover)", text: "var(--color-text-primary)" },
  custom: { bg: "var(--color-primary-bg)", text: "var(--color-primary-fg)" }
};
function re({ section: e, onAckItem: o, onRejectItem: l, fragment: c, ydoc: s, provider: a, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: y, participants: h }) {
  const b = B[e.type] ?? B.custom, v = e.items.filter((u) => u.status !== "pending").length;
  return /* @__PURE__ */ n("div", { className: t("bg-white border border-border rounded-lg p-5 mb-4"), children: [
    /* @__PURE__ */ r("h2", { className: t("text-xl font-bold m-0 mb-1 text-text-primary"), children: e.title }),
    /* @__PURE__ */ r(
      "span",
      {
        className: t("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
        style: { background: b.bg, color: b.text },
        children: e.type
      }
    ),
    c && /* @__PURE__ */ r("div", { className: t(e.items.length > 0 ? "mb-4" : ""), children: /* @__PURE__ */ r(
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
    !c && e.items.length === 0 && /* @__PURE__ */ n("div", { className: t("py-6 text-text-tertiary text-sm text-center"), children: [
      "This ",
      e.type,
      " section has no content. Switch to Editor mode to add content."
    ] }),
    e.items.length > 0 && /* @__PURE__ */ n("div", { children: [
      e.items.map((u) => /* @__PURE__ */ r(
        te,
        {
          item: u,
          onAck: (m) => o(u.id, m),
          onReject: (m) => l(u.id, m)
        },
        u.id
      )),
      /* @__PURE__ */ n("div", { className: t("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"), children: [
        v,
        " of ",
        e.items.length,
        " items reviewed"
      ] })
    ] }),
    f && /* @__PURE__ */ r(
      W,
      {
        comments: d ?? [],
        onAddComment: f,
        participants: h,
        onResolveThread: p,
        onUnresolveThread: y
      }
    )
  ] });
}
const E = 4;
function he({ sections: e, onAckItem: o, onRejectItem: l, participants: c, onSectionFocus: s, jumpToIndex: a, onJumpComplete: d, getSectionFragment: f, ydoc: p, provider: y, comments: h, onAddComment: b, onResolveThread: v, onUnresolveThread: u }) {
  const [m, w] = j(0), M = Math.max(1, Math.ceil(e.length / E)), x = m * E, i = e.slice(x, x + E);
  if (D(() => {
    a != null && a >= 0 && a < e.length && (w(Math.floor(a / E)), d?.());
  }, [a, e.length, d]), D(() => {
    i.length > 0 && s && s(i[0].id);
  }, [x, s]), e.length === 0)
    return /* @__PURE__ */ r("div", { className: t("text-center p-12 text-text-secondary text-[15px]"), children: "No sections to review." });
  const k = () => w((N) => Math.max(0, N - 1)), S = () => w((N) => Math.min(M - 1, N + 1)), C = x + i.length;
  return /* @__PURE__ */ n("div", { children: [
    /* @__PURE__ */ r(J, { current: C, total: e.length }),
    /* @__PURE__ */ r("div", { className: t("flex flex-col gap-4"), children: i.map((N) => {
      const I = c?.filter((g) => g.currentSectionId === N.id) ?? [];
      return /* @__PURE__ */ n("div", { children: [
        I.length > 0 && /* @__PURE__ */ n("div", { className: t("flex gap-1 mb-1.5 items-center"), children: [
          /* @__PURE__ */ r("span", { className: t("text-xs text-text-secondary mr-1"), children: "Viewing:" }),
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
            section: N,
            onAckItem: (g, A) => o(N.id, g, A),
            onRejectItem: (g, A) => l(N.id, g, A),
            fragment: f(N.id),
            ydoc: p,
            provider: y,
            comments: h?.[N.id],
            onAddComment: b ? (g, A) => b(N.id, g, A) : void 0,
            onResolveThread: v ? (g) => v(N.id, g) : void 0,
            onUnresolveThread: u ? (g) => u(N.id, g) : void 0,
            participants: I
          }
        )
      ] }, N.id);
    }) }),
    /* @__PURE__ */ n("div", { className: t("flex justify-between items-center mt-4 py-3"), children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          className: t(
            "px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]",
            m === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-white text-text-primary cursor-pointer"
          ),
          onClick: k,
          disabled: m === 0,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n("span", { className: t("text-[13px] text-text-secondary"), children: [
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
            m === M - 1 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-white text-text-primary cursor-pointer"
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
function oe(e, o) {
  const l = o.documentTitle ? ` in ${o.documentTitle}` : "";
  switch (e) {
    case "doc.ack":
      return `acknowledged "${o.itemText || "item"}"${l}`;
    case "doc.reject":
      return `rejected "${o.itemText || "item"}"${l}`;
    case "doc.add_item":
      return `added task in "${o.sectionTitle || "section"}"${l}`;
    case "doc.add_section":
      return `added new section${l}`;
    case "doc.edit_section":
      return `edited "${o.sectionTitle || "section"}"${l}`;
    case "doc.remove_item":
      return `removed "${o.itemText || "item"}"${l}`;
    case "doc.comment":
      return `commented: "${o.text || "..."}"${l}`;
    case "pipeline.run.started": {
      const c = o.pipelineId ?? "";
      return c ? `triggered pipeline ${c}` : "triggered a pipeline";
    }
    case "pipeline.run.completed":
      return typeof o.durationMs == "number" ? `pipeline run completed in ${o.durationMs}ms` : "pipeline run completed";
    case "pipeline.run.failed":
      return `pipeline run failed: ${o.error ?? "unknown error"}`;
    case "pipeline.approval.requested":
      return "approval requested";
    default:
      return o.description ? String(o.description) : e;
  }
}
function se(e) {
  return e.split(" ").map((o) => o[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function ie(e) {
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
function ge({ events: e, participants: o }) {
  const [l, c] = j(!1);
  return /* @__PURE__ */ n("div", { className: t("bg-surface-panel border border-border rounded-lg overflow-hidden"), children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: t("flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
        onClick: () => c((s) => !s),
        children: [
          /* @__PURE__ */ n("span", { children: [
            "Activity ",
            e.length > 0 && `(${e.length})`
          ] }),
          /* @__PURE__ */ r("span", { className: t("text-[11px] font-normal text-text-tertiary"), children: l ? "▶" : "▼" })
        ]
      }
    ),
    !l && /* @__PURE__ */ n($, { children: [
      o.length > 0 && /* @__PURE__ */ n("div", { className: t("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"), children: [
        /* @__PURE__ */ r("span", { className: t("font-semibold"), children: "Active:" }),
        o.map((s) => /* @__PURE__ */ n("span", { className: t("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"), children: [
          /* @__PURE__ */ r("span", { className: t("w-2 h-2 rounded-full shrink-0"), style: { background: s.color } }),
          s.displayName,
          " (",
          ae(s.mode),
          ")"
        ] }, s.clientId))
      ] }),
      /* @__PURE__ */ r("div", { className: t("max-h-[260px] overflow-y-auto py-1"), children: e.length === 0 ? /* @__PURE__ */ r("div", { className: t("px-3 py-4 text-center text-text-tertiary text-xs"), children: "No activity yet. Actions like acknowledging tasks will appear here." }) : e.map((s) => /* @__PURE__ */ n("div", { className: t("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"), children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: t("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
            style: { background: s.color || "var(--color-text-tertiary)" },
            children: se(s.displayName || "Unknown")
          }
        ),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ r("span", { className: t("font-semibold text-text-primary"), children: s.displayName || "Unknown" }),
          " ",
          /* @__PURE__ */ n("span", { className: t("text-neutral"), children: [
            ne(s.eventType),
            " ",
            oe(s.eventType, s.detail)
          ] })
        ] }),
        /* @__PURE__ */ r("span", { className: t("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"), children: ie(s.timestamp) })
      ] }, s.id)) })
    ] })
  ] });
}
export {
  he as AckMode,
  we as ActionItemsCard,
  ge as ActivityFeed,
  Ne as AttachmentsPanel,
  re as ChunkViewer,
  ke as DiffViewer,
  Ce as DocumentEditorPage,
  Me as DocumentHeader,
  fe as DocumentListPage,
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
