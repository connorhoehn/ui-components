import { jsx as n, jsxs as u, Fragment as w } from "react/jsx-runtime";
import { C as H, P as O } from "../PresencePanel-mBtTn35O.js";
import { Component as z, useState as C, useEffect as U, useMemo as k } from "react";
import { E as D } from "../EmptyState-D_CN3LUx.js";
import { c as _ } from "../cn-B6yFEsav.js";
import { R as V, a as q } from "../ReconnectingBanner-BsZT-j-R.js";
import { S as X } from "../SkeletonCard-C89GWQ3p.js";
import { A as K, F as Y, N as G, C as Q, P as $, B as A, S as T } from "../Badge-B6JMh-Y-.js";
import { R as Z, S as W, a as J } from "../ReactionsOverlay-CoaX3hRz.js";
import { useRoomOccupancy as ee } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { a as I } from "../Banner-B8AcwPH_.js";
import { I as te } from "../IconButton-Da1kJ5WO.js";
import { M as ne } from "../Modal-2jg4229_.js";
function ae(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0,
    avatarUrl: e.metadata?.avatarUrl ?? void 0
  };
}
function re(e) {
  return e.map(ae);
}
function ie(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function Be(e) {
  return e.map(ie);
}
const L = [15, 25, 35, 45, 55, 65, 75, 85], F = [20, 35, 50, 65, 80];
function B(e, t) {
  const a = L[t % L.length] ?? 50, o = F[Math.floor(t / L.length) % F.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: i?.x ?? a,
    y: i?.y ?? o,
    timestamp: e.timestamp
  };
}
function He(e) {
  return e.map(B);
}
function oe(e) {
  try {
    const t = Date.now() - new Date(e).getTime(), a = Math.floor(t / 1e3);
    return a < 60 ? "just now" : a < 3600 ? `${Math.floor(a / 60)}m ago` : a < 86400 ? `${Math.floor(a / 3600)}h ago` : e.slice(0, 10);
  } catch {
    return "";
  }
}
const se = {
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
function le(e) {
  const t = e.detail;
  return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
let ce = 0;
function de(e) {
  return {
    id: `${e.eventType}-${e.timestamp}-${ce++}`,
    actor: e.displayName,
    action: se[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
    subject: le(e),
    ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
    timeLabel: oe(e.timestamp),
    kind: e.eventType.split(".")[0]
    // e.g. "social", "pipeline"
  };
}
function ue(e) {
  return e.map(de);
}
function me(e) {
  return {
    id: e.id,
    filename: e.filename,
    progress: e.progress ?? 0,
    status: e.status,
    downloadUrl: e.downloadUrl,
    error: e.error
  };
}
function pe(e) {
  return e.map(me);
}
function fe(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function he(e, t) {
  return e.map((a) => fe(a, t));
}
function ge(e) {
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
function be(e) {
  return e.map(ge);
}
class xe extends z {
  state = { error: null };
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, a) {
    const { onError: o } = this.props;
    o ? o(t, a) : console.error("[NetworkErrorBoundary]", t, a.componentStack);
  }
  reset = () => {
    this.props.onRetry?.(), this.setState({ error: null });
  };
  render() {
    const { error: t } = this.state;
    if (t == null) return this.props.children;
    const {
      fallback: a,
      title: o = "Something went wrong",
      description: i,
      retryLabel: r = "Retry"
    } = this.props;
    return a ? a(t, this.reset) : /* @__PURE__ */ n("div", { "data-testid": "network-error-boundary-fallback", children: /* @__PURE__ */ n(
      D,
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
function ye({
  connectionState: e,
  children: t,
  onRetry: a,
  reconnectingLabel: o,
  disconnectedTitle: i = "Disconnected",
  disconnectedDescription: r = "The connection to the server was lost. Check your network and try again.",
  retryLabel: d = "Try again",
  connectingPlaceholder: m,
  disconnectedFallback: l,
  className: c
}) {
  return e === "connecting" ? /* @__PURE__ */ n("div", { "data-testid": "reconnecting-shim-connecting", className: c, children: m ?? /* @__PURE__ */ n(X, { height: 120 }) }) : e === "disconnected" ? /* @__PURE__ */ n("div", { "data-testid": "reconnecting-shim-disconnected", className: c, children: l ?? /* @__PURE__ */ n(
    D,
    {
      icon: "📡",
      title: i,
      description: r,
      actionLabel: a ? d : void 0,
      onAction: a
    }
  ) }) : e === "reconnecting" ? /* @__PURE__ */ u(
    "div",
    {
      "data-testid": "reconnecting-shim-reconnecting",
      className: _("relative", c),
      children: [
        /* @__PURE__ */ n("div", { className: "opacity-60 pointer-events-none", children: t }),
        /* @__PURE__ */ n(V, { show: !0, label: o })
      ]
    }
  ) : /* @__PURE__ */ n("div", { "data-testid": "reconnecting-shim-connected", className: c, children: t });
}
function j(e, t) {
  return t ? /* @__PURE__ */ n(
    xe,
    {
      title: t.errorTitle,
      description: t.errorDescription,
      retryLabel: t.retryLabel,
      onRetry: t.onRetry,
      onError: t.onError,
      fallback: t.errorFallback,
      children: /* @__PURE__ */ n(
        ye,
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
function Oe({
  chat: e,
  presence: t,
  disabled: a,
  typingUsers: o,
  wrapWithNetworkShim: i
}) {
  const r = re(e.messages), d = o ?? t?.roster.filter((l) => l.metadata?.isTyping === !0).map(
    (l) => l.metadata?.displayName ?? l.clientId.slice(0, 8)
  ) ?? [], m = /* @__PURE__ */ n(
    H,
    {
      messages: r,
      onSend: e.sendMessage,
      disabled: a,
      typingUsers: d
    }
  );
  return /* @__PURE__ */ n(w, { children: j(m, i) });
}
function ze({
  presence: e,
  currentClientId: t,
  wrapWithNetworkShim: a
}) {
  const o = e.roster.map((r) => ({
    clientId: r.clientId,
    status: r.status,
    metadata: r.metadata
  }));
  return /* @__PURE__ */ n(w, { children: j(/* @__PURE__ */ n(O, { users: o, currentClientId: t }), a) });
}
function _e({
  activity: e,
  visibleCount: t,
  rotateMs: a,
  staggerMs: o,
  kindColors: i,
  className: r
}) {
  const d = ue(e.events);
  return /* @__PURE__ */ n(
    K,
    {
      items: d,
      visibleCount: t,
      rotateMs: a,
      staggerMs: o,
      kindColors: i,
      className: r
    }
  );
}
function Ve({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [a, o] = C([]), i = e.reactions;
  return U(() => {
    if (i.length === 0) return;
    const r = i[i.length - 1], d = B(r, i.length - 1);
    o((l) => l.some((c) => c.id === d.id) ? l : [...l, d]);
    const m = setTimeout(() => {
      o((l) => l.filter((c) => c.id !== d.id));
    }, t);
    return () => clearTimeout(m);
  }, [i, t]), /* @__PURE__ */ n(Z, { reactions: a });
}
function qe({
  fileUpload: e,
  accept: t,
  maxSize: a,
  multiple: o,
  disabled: i,
  label: r,
  className: d,
  uploadMetadata: m,
  onError: l
}) {
  const c = pe(e.uploads);
  function h(b) {
    for (const p of b)
      e.upload(p, m ? { metadata: m } : void 0).catch(
        (s) => {
          const f = s instanceof Error ? s.message : "Upload failed";
          l?.(f);
        }
      );
  }
  return /* @__PURE__ */ u("div", { children: [
    /* @__PURE__ */ n(
      Y,
      {
        accept: t,
        maxSize: a,
        multiple: o,
        disabled: i,
        label: r,
        className: d,
        onFiles: h,
        onError: l
      }
    ),
    c.length > 0 && /* @__PURE__ */ n(
      ve,
      {
        summaries: c,
        onDismiss: () => e.removeCompleted()
      }
    )
  ] });
}
function ve({ summaries: e, onDismiss: t }) {
  return /* @__PURE__ */ n("ul", { className: "mt-2 p-0 list-none text-[13px]", children: e.map((a) => /* @__PURE__ */ u(
    "li",
    {
      className: "flex items-center gap-2 py-1 border-b border-border",
      children: [
        /* @__PURE__ */ n("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: a.filename }),
        /* @__PURE__ */ n("span", { className: `text-xs font-semibold ${Ne(a.status)}`, children: a.status === "uploading" ? `${a.progress}%` : a.status }),
        (a.status === "completed" || a.status === "clean") && a.downloadUrl && /* @__PURE__ */ n(
          "a",
          {
            href: a.downloadUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "text-xs text-info",
            children: "Download"
          }
        ),
        (a.status === "failed" || a.status === "infected") && /* @__PURE__ */ n(
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
    a.id
  )) });
}
function Ne(e) {
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
function Xe({
  hangout: e,
  localClientId: t,
  videoElements: a,
  mode: o,
  spotlightContent: i,
  activeSpeakerId: r,
  speakerHysteresisMs: d,
  onParticipantClick: m,
  className: l
}) {
  const c = he(e.participants, t), h = t != null ? c.find((s) => s.id === t) ?? null : null, b = t != null ? c.filter((s) => s.id !== t) : c;
  function p(s) {
    return a ? s.map((f) => ({
      ...f,
      videoElement: a[f.id] ?? f.videoElement
    })) : s;
  }
  return /* @__PURE__ */ n(
    q,
    {
      participants: p(b),
      localParticipant: h ? p([h])[0] : null,
      mode: o,
      spotlightContent: i,
      activeSpeakerId: r,
      speakerHysteresisMs: d,
      onParticipantClick: m,
      className: l
    }
  );
}
function Ke({
  notifications: e,
  onItemClick: t,
  ...a
}) {
  const o = be(e.notifications);
  return /* @__PURE__ */ n(
    G,
    {
      items: o,
      onItemClick: (r) => {
        t ? t(r) : e.markAsRead(r.id);
      },
      onMarkAllRead: e.markAllRead,
      onClearAll: e.clearAll,
      ...a
    }
  );
}
function Ye({
  socket: e,
  ...t
}) {
  return /* @__PURE__ */ n(Q, { state: e.connectionState, ...t });
}
function Ge({
  capability: e,
  loading: t,
  fallback: a,
  children: o
}) {
  return e.isLoading ? /* @__PURE__ */ n(w, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ n(w, { children: o }) : /* @__PURE__ */ n(w, { children: a ?? null });
}
function we({
  slug: e,
  name: t,
  participantId: a,
  occupancy: o,
  subscribeRoomsIndex: i,
  onClick: r,
  onContextMenu: d,
  kebab: m,
  className: l,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  "data-testid": c = "room-row"
}) {
  const h = ee(i ? e : null, {
    subscribeRoomsIndex: i
  }), b = i ? h.occupancy ?? null : o ?? null, p = b?.count ?? 0, s = b?.members ?? [], f = k(() => a ? s.some((N) => N.participantId === a) : !1, [s, a]), x = f, y = k(
    () => s.slice(0, 3).map((N) => ({
      id: N.participantId,
      name: N.displayName ?? N.userId,
      online: !0
    })),
    [s]
  );
  let v = null;
  return p > 1 ? v = /* @__PURE__ */ u(w, { children: [
    /* @__PURE__ */ n($, { users: y, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ n(A, { variant: "count", value: p, color: "muted" })
  ] }) : p === 1 && f ? v = /* @__PURE__ */ n(
    A,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${c}-self-pulse`
    }
  ) : p === 1 && (v = /* @__PURE__ */ u(w, { children: [
    /* @__PURE__ */ n($, { users: y, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ n(A, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ n(
    W,
    {
      "data-testid": c,
      icon: /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "font-semibold text-slate-400", children: "#" }),
      label: t,
      trailing: v,
      active: x,
      onClick: r,
      onContextMenu: d,
      kebab: m,
      "aria-label": `${t} room`,
      className: l,
      dataAttrs: {
        "data-room-slug": e,
        "data-room-name": t,
        "data-room-active-count": p,
        "data-joined": x ? "true" : "false"
      }
    }
  );
}
const M = 3, E = 48;
function Ce(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function ke(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < M ? `Name must be at least ${M} characters.` : t.length > E ? `Name must be at most ${E} characters.` : null;
}
function Re({
  open: e,
  onClose: t,
  onCreate: a,
  onCreated: o,
  defaultVisibility: i
}) {
  const [r, d] = C(""), [m, l] = C(""), [c, h] = C(!1), [b, p] = C(!1), [s, f] = C(!1), [x, y] = C(null);
  U(() => {
    e && (d(""), l(""), h(!1), p(!1), f(!1), y(null));
  }, [e]);
  const v = k(() => ke(r), [r]), N = k(() => Ce(r), [r]), g = !v && !s;
  async function P(R) {
    if (R.preventDefault(), !!g) {
      f(!0), y(null);
      try {
        const S = await a({
          name: r.trim(),
          description: m.trim() || void 0,
          visibility: i,
          settings: {
            audioOnly: c,
            recordingEnabled: b
          }
        });
        o?.(S), t();
      } catch (S) {
        y(S instanceof Error ? S.message : "Failed to create room."), f(!1);
      }
    }
  }
  return /* @__PURE__ */ n(
    ne,
    {
      open: e,
      onClose: s ? () => {
      } : t,
      title: "New room",
      maxWidth: 440,
      rawChildren: !0,
      backdropTestId: "new-hangout-room-dialog",
      footer: null,
      children: /* @__PURE__ */ u("form", { onSubmit: P, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ u("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n("span", { className: "text-[12px] font-semibold text-slate-700", children: "Name" }),
          /* @__PURE__ */ n(
            "input",
            {
              "data-autofocus": !0,
              "data-testid": "new-hangout-room-name",
              type: "text",
              value: r,
              onChange: (R) => d(R.target.value),
              placeholder: "Team standup",
              maxLength: E + 10,
              disabled: s,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ u("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ n("span", { "data-testid": "new-hangout-room-slug-preview", children: N ? `#${N}` : "Slug preview appears here" }),
            /* @__PURE__ */ n("span", { children: `${r.trim().length}/${E}` })
          ] }),
          v && r.length > 0 && /* @__PURE__ */ n(
            "span",
            {
              "data-testid": "new-hangout-room-name-error",
              className: "text-[11px] text-rose-600",
              children: v
            }
          )
        ] }),
        /* @__PURE__ */ u("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ u("span", { className: "text-[12px] font-semibold text-slate-700", children: [
            "Description ",
            /* @__PURE__ */ n("span", { className: "font-normal text-slate-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ n(
            "textarea",
            {
              "data-testid": "new-hangout-room-description",
              value: m,
              onChange: (R) => l(R.target.value),
              placeholder: "What's this room for?",
              rows: 2,
              disabled: s,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ u("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ n("span", { className: "text-[13px] font-semibold text-slate-700", children: "Audio only" }),
              /* @__PURE__ */ n("span", { className: "text-[11px] text-slate-400", children: "Skip video tracks — voice-only room." })
            ] }),
            /* @__PURE__ */ n(
              T,
              {
                checked: c,
                onChange: h,
                disabled: s,
                "aria-label": "Audio only",
                "data-testid": "new-hangout-room-audio-only"
              }
            )
          ] }),
          /* @__PURE__ */ u("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ n("span", { className: "text-[13px] font-semibold text-slate-700", children: "Recording enabled" }),
              /* @__PURE__ */ n("span", { className: "text-[11px] text-slate-400", children: "Allow server-side recording of sessions." })
            ] }),
            /* @__PURE__ */ n(
              T,
              {
                checked: b,
                onChange: p,
                disabled: s,
                "aria-label": "Recording enabled",
                "data-testid": "new-hangout-room-recording"
              }
            )
          ] })
        ] }),
        x && /* @__PURE__ */ n(
          "div",
          {
            "data-testid": "new-hangout-room-error",
            role: "alert",
            className: "text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2",
            children: x
          }
        ),
        /* @__PURE__ */ u("div", { className: "flex justify-end gap-2 pt-1", children: [
          /* @__PURE__ */ n(
            I,
            {
              type: "button",
              variant: "ghost",
              onClick: t,
              disabled: s,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ n(
            I,
            {
              type: "submit",
              variant: "primary",
              disabled: !g,
              "data-testid": "new-hangout-room-submit",
              children: s ? "Creating…" : "Create room"
            }
          )
        ] })
      ] })
    }
  );
}
function Se({
  rooms: e,
  occupancyFor: t,
  occupancyAdapter: a,
  participantId: o,
  onJoinRoom: i,
  onContextMenu: r,
  onBrowseAll: d,
  maxVisible: m = 10,
  title: l = "Rooms",
  storageKey: c,
  renderCreateDialog: h
}) {
  const [b, p] = C(!1), s = () => p(!0), f = () => p(!1), x = k(
    () => e.rooms.filter((g) => g.state === "active"),
    [e.rooms]
  ), y = k(
    () => x.slice(0, m),
    [x, m]
  ), v = x.length - y.length;
  return /* @__PURE__ */ u(w, { children: [
    /* @__PURE__ */ u(
      J,
      {
        title: l,
        storageKey: c,
        actions: /* @__PURE__ */ n(
          te,
          {
            "aria-label": "New room",
            size: "sm",
            onClick: s,
            icon: /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "text-[14px] leading-none font-bold", children: "+" }),
            "data-testid": "new-room-button"
          }
        ),
        "data-testid": "rooms-section",
        children: [
          e.isLoading && /* @__PURE__ */ n("div", { className: "flex flex-col gap-1 px-1 py-1", "data-testid": "hangout-rooms-loading", children: [0, 1, 2].map((g) => /* @__PURE__ */ n(
            "div",
            {
              "aria-hidden": "true",
              className: "h-7 rounded-md bg-slate-100 animate-pulse"
            },
            g
          )) }),
          !e.isLoading && e.error && /* @__PURE__ */ u(
            "div",
            {
              role: "alert",
              "data-testid": "hangout-rooms-error",
              className: "mx-1 my-1 px-3 py-2 text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-md flex items-center justify-between gap-2",
              children: [
                /* @__PURE__ */ n("span", { className: "truncate", children: "Couldn't load rooms." }),
                /* @__PURE__ */ n(
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
          !e.isLoading && !e.error && x.length === 0 && /* @__PURE__ */ n(
            D,
            {
              testId: "hangout-rooms-empty",
              title: "No rooms yet",
              description: "Create one to start an ongoing hangout.",
              action: /* @__PURE__ */ n(I, { onClick: s, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && x.length > 0 && /* @__PURE__ */ u("div", { className: "flex flex-col gap-0.5", children: [
            y.map((g) => /* @__PURE__ */ n(
              we,
              {
                slug: g.slug,
                name: g.name,
                participantId: o,
                subscribeRoomsIndex: a,
                occupancy: a ? null : t?.(g.slug) ?? null,
                onClick: i ? () => i(g) : void 0,
                onContextMenu: r ? (P) => r(g, P) : void 0
              },
              g.slug
            )),
            v > 0 && /* @__PURE__ */ n(
              W,
              {
                "data-testid": "hangout-rooms-browse-all",
                label: /* @__PURE__ */ u("span", { className: "text-[12px] text-slate-500", children: [
                  "Browse all (",
                  x.length,
                  ")"
                ] }),
                onClick: d
              }
            )
          ] })
        ]
      }
    ),
    h ? h({ open: b, onClose: f }) : /* @__PURE__ */ n(
      Re,
      {
        open: b,
        onClose: f,
        onCreate: e.createRoom,
        onCreated: (g) => {
          i?.(g);
        }
      }
    )
  ] });
}
function Qe({
  hangoutRooms: e,
  subscribeRoomsIndex: t,
  occupancyFor: a,
  participantId: o,
  onJoin: i,
  onContextMenu: r,
  onBrowseAll: d,
  maxVisible: m,
  title: l,
  storageKey: c,
  renderEmpty: h,
  renderCreateDialog: b,
  wrapWithNetworkShim: p
}) {
  return e.rooms.filter(
    (y) => y.state === "active"
  ).length === 0 && !e.isLoading && !e.error && h ? /* @__PURE__ */ n("div", { "data-testid": "wrapped-hangout-rooms-empty-slot", children: h }) : /* @__PURE__ */ n(w, { children: j(/* @__PURE__ */ n(
    Se,
    {
      rooms: e,
      occupancyAdapter: t,
      occupancyFor: a,
      participantId: o,
      onJoinRoom: i ? (y) => i(y.slug) : void 0,
      onContextMenu: r,
      onBrowseAll: d,
      maxVisible: m,
      title: l,
      storageKey: c,
      renderCreateDialog: b
    }
  ), p) });
}
export {
  Ge as CapabilityBoundary,
  we as HangoutRoomRow,
  Se as HangoutRoomsSection,
  xe as NetworkErrorBoundary,
  Re as NewHangoutRoomDialog,
  ye as ReconnectingShim,
  _e as WrappedActivityPanel,
  Oe as WrappedChatPanel,
  Ye as WrappedConnectionPill,
  qe as WrappedFileUploadDrop,
  Xe as WrappedHangoutLayout,
  Qe as WrappedHangoutRoomsList,
  Ke as WrappedNotificationCenter,
  ze as WrappedPresencePanel,
  Ve as WrappedReactionsOverlay,
  de as adaptActivityEvent,
  ue as adaptActivityEvents,
  ae as adaptChatMessage,
  re as adaptChatMessages,
  me as adaptFileUploadState,
  pe as adaptFileUploads,
  fe as adaptHangoutParticipant,
  he as adaptHangoutParticipants,
  ge as adaptNotification,
  be as adaptNotifications,
  ie as adaptPresenceEntry,
  Be as adaptPresenceRoster,
  B as adaptReaction,
  He as adaptReactions,
  j as applyNetworkShim,
  Ce as slugifyRoomName
};
