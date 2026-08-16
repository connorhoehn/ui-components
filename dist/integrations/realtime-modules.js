import { jsx as a, jsxs as p, Fragment as w } from "react/jsx-runtime";
import { C as H, P as z } from "../PresencePanel-DhsDetgi.js";
import { Component as V, useState as C, useEffect as U, useMemo as S } from "react";
import { E as j } from "../EmptyState-D_CN3LUx.js";
import { c as _ } from "../cn-B6yFEsav.js";
import { R as q, a as W, c as X, S as Y } from "../ReconnectingBanner-XXXykHhO.js";
import { S as K } from "../SkeletonCard-C89GWQ3p.js";
import { A as G, N as Q, C as Z, P as D, B as A, S as $ } from "../Badge-BxoS25bM.js";
import { R as J, S as B, a as ee } from "../ReactionsOverlay-CoaX3hRz.js";
import { F as te, I as ae } from "../FileUploadDrop-Cmz3XANg.js";
import { useRoomOccupancy as ne } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { B as I } from "../Button-Qsbxqsl9.js";
import { M as re } from "../Modal-2jg4229_.js";
import { useLVSHangout as ie } from "@connorhoehn/realtime-modules/client/video";
import { A as oe } from "../Avatar-BvKIaNVE.js";
function se(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0,
    avatarUrl: e.metadata?.avatarUrl ?? void 0
  };
}
function le(e) {
  return e.map(se);
}
function ce(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function Ye(e) {
  return e.map(ce);
}
const P = [15, 25, 35, 45, 55, 65, 75, 85], M = [20, 35, 50, 65, 80];
function O(e, t) {
  const n = P[t % P.length] ?? 50, o = M[Math.floor(t / P.length) % M.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: i?.x ?? n,
    y: i?.y ?? o,
    timestamp: e.timestamp
  };
}
function Ke(e) {
  return e.map(O);
}
function de(e) {
  try {
    const t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
    return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
  } catch {
    return "";
  }
}
const ue = {
  "social.room.join": "joined",
  "social.room.leave": "left",
  "social.follow": "followed",
  "social.unfollow": "unfollowed",
  "social.like": "liked",
  "social.reaction": "reacted",
  "social.post.created": "posted",
  "social.comment.created": "commented",
  "pipeline.run.started": "triggered",
  "pipeline.run.completed": "completed",
  "pipeline.run.failed": "failed",
  "pipeline.approval.requested": "requested approval"
};
function me(e) {
  const t = e.detail;
  return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
let pe = 0;
function fe(e) {
  return {
    id: `${e.eventType}-${e.timestamp}-${pe++}`,
    actor: e.displayName,
    action: ue[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
    subject: me(e),
    ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
    timeLabel: de(e.timestamp),
    kind: e.eventType.split(".")[0]
    // e.g. "social", "pipeline"
  };
}
function he(e) {
  return e.map(fe);
}
function ge(e) {
  return {
    id: e.id,
    filename: e.filename,
    progress: e.progress ?? 0,
    status: e.status,
    downloadUrl: e.downloadUrl,
    error: e.error
  };
}
function be(e) {
  return e.map(ge);
}
function ye(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function ve(e, t) {
  return e.map((n) => ye(n, t));
}
function xe(e) {
  return {
    id: e.id,
    title: e.title,
    body: e.body,
    timestamp: e.timestamp,
    read: e.read ?? !1,
    category: e.type,
    icon: typeof e.payload?.icon == "string" ? e.payload.icon : void 0
  };
}
function Ne(e) {
  return e.map(xe);
}
class we extends V {
  state = { error: null };
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, n) {
    const { onError: o } = this.props;
    o ? o(t, n) : console.error("[NetworkErrorBoundary]", t, n.componentStack);
  }
  reset = () => {
    this.props.onRetry?.(), this.setState({ error: null });
  };
  render() {
    const { error: t } = this.state;
    if (t == null) return this.props.children;
    const {
      fallback: n,
      title: o = "Something went wrong",
      description: i,
      retryLabel: r = "Retry"
    } = this.props;
    return n ? n(t, this.reset) : /* @__PURE__ */ a("div", { "data-testid": "network-error-boundary-fallback", children: /* @__PURE__ */ a(
      j,
      {
        icon: "⚠️",
        title: o,
        description: i ?? t.message,
        actionLabel: r,
        onAction: this.reset
      }
    ) });
  }
}
function Ce({
  connectionState: e,
  children: t,
  onRetry: n,
  reconnectingLabel: o,
  disconnectedTitle: i = "Disconnected",
  disconnectedDescription: r = "The connection to the server was lost. Check your network and try again.",
  retryLabel: c = "Try again",
  connectingPlaceholder: u,
  disconnectedFallback: l,
  className: d
}) {
  return e === "connecting" ? /* @__PURE__ */ a("div", { "data-testid": "reconnecting-shim-connecting", className: d, children: u ?? /* @__PURE__ */ a(K, { height: 120 }) }) : e === "disconnected" ? /* @__PURE__ */ a("div", { "data-testid": "reconnecting-shim-disconnected", className: d, children: l ?? /* @__PURE__ */ a(
    j,
    {
      icon: "📡",
      title: i,
      description: r,
      actionLabel: n ? c : void 0,
      onAction: n
    }
  ) }) : e === "reconnecting" ? /* @__PURE__ */ p(
    "div",
    {
      "data-testid": "reconnecting-shim-reconnecting",
      className: _("relative", d),
      children: [
        /* @__PURE__ */ a("div", { className: "opacity-60 pointer-events-none", children: t }),
        /* @__PURE__ */ a(q, { show: !0, label: o })
      ]
    }
  ) : /* @__PURE__ */ a("div", { "data-testid": "reconnecting-shim-connected", className: d, children: t });
}
function T(e, t) {
  return t ? /* @__PURE__ */ a(
    we,
    {
      title: t.errorTitle,
      description: t.errorDescription,
      retryLabel: t.retryLabel,
      onRetry: t.onRetry,
      onError: t.onError,
      fallback: t.errorFallback,
      children: /* @__PURE__ */ a(
        Ce,
        {
          connectionState: t.connectionState,
          onRetry: t.onRetry,
          reconnectingLabel: t.reconnectingLabel,
          disconnectedTitle: t.disconnectedTitle,
          disconnectedDescription: t.disconnectedDescription,
          retryLabel: t.retryLabel,
          connectingPlaceholder: t.connectingPlaceholder,
          disconnectedFallback: t.disconnectedFallback,
          className: t.className,
          children: e
        }
      )
    }
  ) : e;
}
function Ge({
  chat: e,
  presence: t,
  disabled: n,
  typingUsers: o,
  wrapWithNetworkShim: i
}) {
  const r = le(e.messages), c = o ?? t?.roster.filter((l) => l.metadata?.isTyping === !0).map(
    (l) => l.metadata?.displayName ?? l.clientId.slice(0, 8)
  ) ?? [], u = /* @__PURE__ */ a(
    H,
    {
      messages: r,
      onSend: e.sendMessage,
      disabled: n,
      typingUsers: c
    }
  );
  return /* @__PURE__ */ a(w, { children: T(u, i) });
}
function Qe({
  presence: e,
  currentClientId: t,
  wrapWithNetworkShim: n
}) {
  const o = e.roster.map((r) => ({
    clientId: r.clientId,
    status: r.status,
    metadata: r.metadata
  }));
  return /* @__PURE__ */ a(w, { children: T(/* @__PURE__ */ a(z, { users: o, currentClientId: t }), n) });
}
function Ze({
  activity: e,
  visibleCount: t,
  rotateMs: n,
  staggerMs: o,
  kindColors: i,
  className: r
}) {
  const c = he(e.events);
  return /* @__PURE__ */ a(
    G,
    {
      items: c,
      visibleCount: t,
      rotateMs: n,
      staggerMs: o,
      kindColors: i,
      className: r
    }
  );
}
function Je({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [n, o] = C([]), i = e.reactions;
  return U(() => {
    if (i.length === 0) return;
    const r = i[i.length - 1], c = O(r, i.length - 1);
    o((l) => l.some((d) => d.id === c.id) ? l : [...l, c]);
    const u = setTimeout(() => {
      o((l) => l.filter((d) => d.id !== c.id));
    }, t);
    return () => clearTimeout(u);
  }, [i, t]), /* @__PURE__ */ a(J, { reactions: n });
}
function et({
  fileUpload: e,
  accept: t,
  maxSize: n,
  multiple: o,
  disabled: i,
  label: r,
  className: c,
  uploadMetadata: u,
  onError: l
}) {
  const d = be(e.uploads);
  function g(b) {
    for (const f of b)
      e.upload(f, u ? { metadata: u } : void 0).catch(
        (s) => {
          const m = s instanceof Error ? s.message : "Upload failed";
          l?.(m);
        }
      );
  }
  return /* @__PURE__ */ p("div", { children: [
    /* @__PURE__ */ a(
      te,
      {
        accept: t,
        maxSize: n,
        multiple: o,
        disabled: i,
        label: r,
        className: c,
        onFiles: g,
        onError: l
      }
    ),
    d.length > 0 && /* @__PURE__ */ a(
      Se,
      {
        summaries: d,
        onDismiss: () => e.removeCompleted()
      }
    )
  ] });
}
function Se({ summaries: e, onDismiss: t }) {
  return /* @__PURE__ */ a("ul", { className: "mt-2 p-0 list-none text-[13px]", children: e.map((n) => /* @__PURE__ */ p(
    "li",
    {
      className: "flex items-center gap-2 py-1 border-b border-border",
      children: [
        /* @__PURE__ */ a("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: n.filename }),
        /* @__PURE__ */ a("span", { className: `text-xs font-semibold ${ke(n.status)}`, children: n.status === "uploading" ? `${n.progress}%` : n.status }),
        (n.status === "completed" || n.status === "clean") && n.downloadUrl && /* @__PURE__ */ a(
          "a",
          {
            href: n.downloadUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "text-xs text-info",
            children: "Download"
          }
        ),
        (n.status === "failed" || n.status === "infected") && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: t,
            className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
            children: "Dismiss"
          }
        )
      ]
    },
    n.id
  )) });
}
function ke(e) {
  switch (e) {
    case "completed":
    case "clean":
      return "text-state-completed";
    case "failed":
    case "infected":
      return "text-state-failed";
    case "scanning":
      return "text-state-awaiting";
    case "uploading":
      return "text-state-running";
    default:
      return "text-text-tertiary";
  }
}
function tt({
  hangout: e,
  localClientId: t,
  videoElements: n,
  mode: o,
  spotlightContent: i,
  activeSpeakerId: r,
  speakerHysteresisMs: c,
  onParticipantClick: u,
  className: l
}) {
  const d = ve(e.participants, t), g = t != null ? d.find((s) => s.id === t) ?? null : null, b = t != null ? d.filter((s) => s.id !== t) : d;
  function f(s) {
    return n ? s.map((m) => ({
      ...m,
      videoElement: n[m.id] ?? m.videoElement
    })) : s;
  }
  return /* @__PURE__ */ a(
    W,
    {
      participants: f(b),
      localParticipant: g ? f([g])[0] : null,
      mode: o,
      spotlightContent: i,
      activeSpeakerId: r,
      speakerHysteresisMs: c,
      onParticipantClick: u,
      className: l
    }
  );
}
function at({
  notifications: e,
  onItemClick: t,
  ...n
}) {
  const o = Ne(e.notifications);
  return /* @__PURE__ */ a(
    Q,
    {
      items: o,
      onItemClick: (r) => {
        t ? t(r) : e.markAsRead(r.id);
      },
      onMarkAllRead: e.markAllRead,
      onClearAll: e.clearAll,
      ...n
    }
  );
}
function nt({
  socket: e,
  ...t
}) {
  return /* @__PURE__ */ a(Z, { state: e.connectionState, ...t });
}
function rt({
  capability: e,
  loading: t,
  fallback: n,
  children: o
}) {
  return e.isLoading ? /* @__PURE__ */ a(w, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ a(w, { children: o }) : /* @__PURE__ */ a(w, { children: n ?? null });
}
function Re({
  slug: e,
  name: t,
  participantId: n,
  occupancy: o,
  subscribeRoomsIndex: i,
  onClick: r,
  onContextMenu: c,
  kebab: u,
  className: l,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  "data-testid": d = "room-row"
}) {
  const g = ne(i ? e : null, {
    subscribeRoomsIndex: i
  }), b = i ? g.occupancy ?? null : o ?? null, f = b?.count ?? 0, s = b?.members ?? [], m = S(() => n ? s.some((N) => N.participantId === n) : !1, [s, n]), y = m, v = S(
    () => s.slice(0, 3).map((N) => ({
      id: N.participantId,
      name: N.displayName ?? N.userId,
      online: !0
    })),
    [s]
  );
  let x = null;
  return f > 1 ? x = /* @__PURE__ */ p(w, { children: [
    /* @__PURE__ */ a(D, { users: v, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ a(A, { variant: "count", value: f, color: "muted" })
  ] }) : f === 1 && m ? x = /* @__PURE__ */ a(
    A,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${d}-self-pulse`
    }
  ) : f === 1 && (x = /* @__PURE__ */ p(w, { children: [
    /* @__PURE__ */ a(D, { users: v, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ a(A, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ a(
    B,
    {
      "data-testid": d,
      icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "font-semibold text-slate-400", children: "#" }),
      label: t,
      trailing: x,
      active: y,
      onClick: r,
      onContextMenu: c,
      kebab: u,
      "aria-label": `${t} room`,
      className: l,
      dataAttrs: {
        "data-room-slug": e,
        "data-room-name": t,
        "data-room-active-count": f,
        "data-joined": y ? "true" : "false"
      }
    }
  );
}
const F = 3, L = 48;
function Le(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function Ee(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < F ? `Name must be at least ${F} characters.` : t.length > L ? `Name must be at most ${L} characters.` : null;
}
function Ae({
  open: e,
  onClose: t,
  onCreate: n,
  onCreated: o,
  defaultVisibility: i
}) {
  const [r, c] = C(""), [u, l] = C(""), [d, g] = C(!1), [b, f] = C(!1), [s, m] = C(!1), [y, v] = C(null);
  U(() => {
    e && (c(""), l(""), g(!1), f(!1), m(!1), v(null));
  }, [e]);
  const x = S(() => Ee(r), [r]), N = S(() => Le(r), [r]), h = !x && !s;
  async function E(k) {
    if (k.preventDefault(), !!h) {
      m(!0), v(null);
      try {
        const R = await n({
          name: r.trim(),
          description: u.trim() || void 0,
          visibility: i,
          settings: {
            audioOnly: d,
            recordingEnabled: b
          }
        });
        o?.(R), t();
      } catch (R) {
        v(R instanceof Error ? R.message : "Failed to create room."), m(!1);
      }
    }
  }
  return /* @__PURE__ */ a(
    re,
    {
      open: e,
      onClose: s ? () => {
      } : t,
      title: "New room",
      maxWidth: 440,
      rawChildren: !0,
      backdropTestId: "new-hangout-room-dialog",
      footer: null,
      children: /* @__PURE__ */ p("form", { onSubmit: E, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ p("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ a("span", { className: "text-[12px] font-semibold text-slate-700", children: "Name" }),
          /* @__PURE__ */ a(
            "input",
            {
              "data-autofocus": !0,
              "data-testid": "new-hangout-room-name",
              type: "text",
              value: r,
              onChange: (k) => c(k.target.value),
              placeholder: "Team standup",
              maxLength: L + 10,
              disabled: s,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ p("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ a("span", { "data-testid": "new-hangout-room-slug-preview", children: N ? `#${N}` : "Slug preview appears here" }),
            /* @__PURE__ */ a("span", { children: `${r.trim().length}/${L}` })
          ] }),
          x && r.length > 0 && /* @__PURE__ */ a(
            "span",
            {
              "data-testid": "new-hangout-room-name-error",
              className: "text-[11px] text-rose-600",
              children: x
            }
          )
        ] }),
        /* @__PURE__ */ p("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ p("span", { className: "text-[12px] font-semibold text-slate-700", children: [
            "Description ",
            /* @__PURE__ */ a("span", { className: "font-normal text-slate-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ a(
            "textarea",
            {
              "data-testid": "new-hangout-room-description",
              value: u,
              onChange: (k) => l(k.target.value),
              placeholder: "What's this room for?",
              rows: 2,
              disabled: s,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ p("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ p("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Audio only" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Skip video tracks — voice-only room." })
            ] }),
            /* @__PURE__ */ a(
              $,
              {
                checked: d,
                onChange: g,
                disabled: s,
                "aria-label": "Audio only",
                "data-testid": "new-hangout-room-audio-only"
              }
            )
          ] }),
          /* @__PURE__ */ p("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ p("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Recording enabled" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Allow server-side recording of sessions." })
            ] }),
            /* @__PURE__ */ a(
              $,
              {
                checked: b,
                onChange: f,
                disabled: s,
                "aria-label": "Recording enabled",
                "data-testid": "new-hangout-room-recording"
              }
            )
          ] })
        ] }),
        y && /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "new-hangout-room-error",
            role: "alert",
            className: "text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2",
            children: y
          }
        ),
        /* @__PURE__ */ p("div", { className: "flex justify-end gap-2 pt-1", children: [
          /* @__PURE__ */ a(
            I,
            {
              type: "button",
              variant: "ghost",
              onClick: t,
              disabled: s,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a(
            I,
            {
              type: "submit",
              variant: "primary",
              disabled: !h,
              "data-testid": "new-hangout-room-submit",
              children: s ? "Creating…" : "Create room"
            }
          )
        ] })
      ] })
    }
  );
}
function Pe({
  rooms: e,
  occupancyFor: t,
  occupancyAdapter: n,
  participantId: o,
  onJoinRoom: i,
  onContextMenu: r,
  onBrowseAll: c,
  maxVisible: u = 10,
  title: l = "Rooms",
  storageKey: d,
  renderCreateDialog: g
}) {
  const [b, f] = C(!1), s = () => f(!0), m = () => f(!1), y = S(
    () => e.rooms.filter((h) => h.state === "active"),
    [e.rooms]
  ), v = S(
    () => y.slice(0, u),
    [y, u]
  ), x = y.length - v.length;
  return /* @__PURE__ */ p(w, { children: [
    /* @__PURE__ */ p(
      ee,
      {
        title: l,
        storageKey: d,
        actions: /* @__PURE__ */ a(
          ae,
          {
            "aria-label": "New room",
            size: "sm",
            onClick: s,
            icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "text-[14px] leading-none font-bold", children: "+" }),
            "data-testid": "new-room-button"
          }
        ),
        "data-testid": "rooms-section",
        children: [
          e.isLoading && /* @__PURE__ */ a("div", { className: "flex flex-col gap-1 px-1 py-1", "data-testid": "hangout-rooms-loading", children: [0, 1, 2].map((h) => /* @__PURE__ */ a(
            "div",
            {
              "aria-hidden": "true",
              className: "h-7 rounded-md bg-slate-100 animate-pulse"
            },
            h
          )) }),
          !e.isLoading && e.error && /* @__PURE__ */ p(
            "div",
            {
              role: "alert",
              "data-testid": "hangout-rooms-error",
              className: "mx-1 my-1 px-3 py-2 text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-md flex items-center justify-between gap-2",
              children: [
                /* @__PURE__ */ a("span", { className: "truncate", children: "Couldn't load rooms." }),
                /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      e.refetch();
                    },
                    className: "text-rose-700 underline hover:text-rose-900 cursor-pointer",
                    children: "Retry"
                  }
                )
              ]
            }
          ),
          !e.isLoading && !e.error && y.length === 0 && /* @__PURE__ */ a(
            j,
            {
              testId: "hangout-rooms-empty",
              title: "No rooms yet",
              description: "Create one to start an ongoing hangout.",
              action: /* @__PURE__ */ a(I, { onClick: s, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && y.length > 0 && /* @__PURE__ */ p("div", { className: "flex flex-col gap-0.5", children: [
            v.map((h) => /* @__PURE__ */ a(
              Re,
              {
                slug: h.slug,
                name: h.name,
                participantId: o,
                subscribeRoomsIndex: n,
                occupancy: n ? null : t?.(h.slug) ?? null,
                onClick: i ? () => i(h) : void 0,
                onContextMenu: r ? (E) => r(h, E) : void 0
              },
              h.slug
            )),
            x > 0 && /* @__PURE__ */ a(
              B,
              {
                "data-testid": "hangout-rooms-browse-all",
                label: /* @__PURE__ */ p("span", { className: "text-[12px] text-slate-500", children: [
                  "Browse all (",
                  y.length,
                  ")"
                ] }),
                onClick: c
              }
            )
          ] })
        ]
      }
    ),
    g ? g({ open: b, onClose: m }) : /* @__PURE__ */ a(
      Ae,
      {
        open: b,
        onClose: m,
        onCreate: e.createRoom,
        onCreated: (h) => {
          i?.(h);
        }
      }
    )
  ] });
}
function Ie({
  stream: e,
  displayName: t
}) {
  return e ? /* @__PURE__ */ a(
    "video",
    {
      autoPlay: !0,
      playsInline: !0,
      muted: !0,
      ref: (n) => {
        n && n.srcObject !== e && (n.srcObject = e);
      },
      className: "w-full h-full object-cover scale-x-[-1]"
    }
  ) : /* @__PURE__ */ a("div", { className: "w-full h-full grid place-items-center bg-slate-200", "data-testid": "local-camera-avatar", children: /* @__PURE__ */ a(oe, { name: t, size: 64 }) });
}
function je(e, t) {
  const n = e.isLocal, o = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], r = e.screenStream, c = n ? /* @__PURE__ */ a(Ie, { stream: i, displayName: o }) : /* @__PURE__ */ a(X, { stream: i, displayName: o, cameraOn: e.hasVideo }), u = r ? /* @__PURE__ */ a(Y, { stream: r, muted: n, className: "w-full h-full object-contain bg-black" }) : void 0;
  return {
    id: e.participantId,
    displayName: o,
    isLocal: n,
    isMuted: !e.hasAudio,
    videoElement: c,
    screenElement: u
  };
}
function it({
  stageToken: e,
  participantId: t,
  userId: n,
  localClientId: o,
  getStageToken: i,
  overlay: r,
  spotlightContent: c,
  onParticipantClick: u,
  mode: l = "auto",
  activeSpeakerStrategy: d = "audio-level",
  localTileLabel: g,
  showLocalAsTile: b = !0,
  className: f,
  "data-testid": s
}) {
  const m = ie({
    stageToken: e,
    participantId: t,
    userId: n ?? t.slice(0, 8),
    getAuthToken: i
  }), y = S(() => m.participants.filter((h) => b || !h.isLocal).map((h) => je(h, g)), [m.participants, b, g]), v = m.participants.filter((N) => !N.isLocal).length, x = {
    connectionState: m.connectionState,
    error: m.error,
    participantCount: m.participants.length,
    remoteCount: v
  };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-testid": s,
      className: `relative flex-1 min-h-0 ${f ?? ""}`,
      children: [
        /* @__PURE__ */ a(
          W,
          {
            participants: y,
            localParticipant: null,
            mode: l,
            spotlightContent: c,
            onParticipantClick: u,
            className: "h-full"
          }
        ),
        r && /* @__PURE__ */ a("div", { className: "absolute inset-0 pointer-events-none z-10", "data-testid": "wrapped-overlay-slot", children: /* @__PURE__ */ a("div", { className: "pointer-events-auto", children: r(x) }) })
      ]
    }
  );
}
function ot({
  hangoutRooms: e,
  subscribeRoomsIndex: t,
  occupancyFor: n,
  participantId: o,
  onJoin: i,
  onContextMenu: r,
  onBrowseAll: c,
  maxVisible: u,
  title: l,
  storageKey: d,
  renderEmpty: g,
  renderCreateDialog: b,
  wrapWithNetworkShim: f
}) {
  return e.rooms.filter(
    (v) => v.state === "active"
  ).length === 0 && !e.isLoading && !e.error && g ? /* @__PURE__ */ a("div", { "data-testid": "wrapped-hangout-rooms-empty-slot", children: g }) : /* @__PURE__ */ a(w, { children: T(/* @__PURE__ */ a(
    Pe,
    {
      rooms: e,
      occupancyAdapter: t,
      occupancyFor: n,
      participantId: o,
      onJoinRoom: i ? (v) => i(v.slug) : void 0,
      onContextMenu: r,
      onBrowseAll: c,
      maxVisible: u,
      title: l,
      storageKey: d,
      renderCreateDialog: b
    }
  ), f) });
}
export {
  rt as CapabilityBoundary,
  Re as HangoutRoomRow,
  Pe as HangoutRoomsSection,
  we as NetworkErrorBoundary,
  Ae as NewHangoutRoomDialog,
  Ce as ReconnectingShim,
  Ze as WrappedActivityPanel,
  Ge as WrappedChatPanel,
  nt as WrappedConnectionPill,
  et as WrappedFileUploadDrop,
  tt as WrappedHangoutLayout,
  ot as WrappedHangoutRoomsList,
  it as WrappedLVSHangoutLayout,
  at as WrappedNotificationCenter,
  Qe as WrappedPresencePanel,
  Je as WrappedReactionsOverlay,
  fe as adaptActivityEvent,
  he as adaptActivityEvents,
  se as adaptChatMessage,
  le as adaptChatMessages,
  ge as adaptFileUploadState,
  be as adaptFileUploads,
  ye as adaptHangoutParticipant,
  ve as adaptHangoutParticipants,
  xe as adaptNotification,
  Ne as adaptNotifications,
  ce as adaptPresenceEntry,
  Ye as adaptPresenceRoster,
  O as adaptReaction,
  Ke as adaptReactions,
  T as applyNetworkShim,
  Le as slugifyRoomName
};
