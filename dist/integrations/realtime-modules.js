import { jsx as a, jsxs as c, Fragment as C } from "react/jsx-runtime";
import { C as T, P as W } from "../PresencePanel-mBtTn35O.js";
import { A as O, F as B, N as H, P as $, B as E, S as M } from "../Badge-tH4NRy5U.js";
import { useState as w, useEffect as L, useMemo as S } from "react";
import { R as _, S as z, a as V } from "../ReactionsOverlay-CoaX3hRz.js";
import { a as q } from "../HangoutLayout-BT6X2zG6.js";
import { useRoomOccupancy as X } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { E as K } from "../EmptyState-PM9wTjxk.js";
import { a as j } from "../Banner-B8AcwPH_.js";
import { I as Y } from "../IconButton-Da1kJ5WO.js";
import { M as G } from "../Modal-2jg4229_.js";
function Q(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0,
    avatarUrl: e.metadata?.avatarUrl ?? void 0
  };
}
function Z(e) {
  return e.map(Q);
}
function J(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function Ae(e) {
  return e.map(J);
}
const P = [15, 25, 35, 45, 55, 65, 75, 85], U = [20, 35, 50, 65, 80];
function F(e, t) {
  const n = P[t % P.length] ?? 50, i = U[Math.floor(t / P.length) % U.length] ?? 50, o = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: o?.x ?? n,
    y: o?.y ?? i,
    timestamp: e.timestamp
  };
}
function Ee(e) {
  return e.map(F);
}
function ee(e) {
  try {
    const t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
    return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
  } catch {
    return "";
  }
}
const te = {
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
function ae(e) {
  const t = e.detail;
  return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
let ne = 0;
function oe(e) {
  return {
    id: `${e.eventType}-${e.timestamp}-${ne++}`,
    actor: e.displayName,
    action: te[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
    subject: ae(e),
    ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
    timeLabel: ee(e.timestamp),
    kind: e.eventType.split(".")[0]
    // e.g. "social", "pipeline"
  };
}
function ie(e) {
  return e.map(oe);
}
function re(e) {
  return {
    id: e.id,
    filename: e.filename,
    progress: e.progress ?? 0,
    status: e.status,
    downloadUrl: e.downloadUrl,
    error: e.error
  };
}
function le(e) {
  return e.map(re);
}
function se(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function de(e, t) {
  return e.map((n) => se(n, t));
}
function ce(e) {
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
function ue(e) {
  return e.map(ce);
}
function Pe({
  chat: e,
  presence: t,
  disabled: n,
  typingUsers: i
}) {
  const o = Z(e.messages), r = i ?? t?.roster.filter((d) => d.metadata?.isTyping === !0).map(
    (d) => d.metadata?.displayName ?? d.clientId.slice(0, 8)
  ) ?? [];
  return /* @__PURE__ */ a(
    T,
    {
      messages: o,
      onSend: e.sendMessage,
      disabled: n,
      typingUsers: r
    }
  );
}
function je({
  presence: e,
  currentClientId: t
}) {
  const n = e.roster.map((i) => ({
    clientId: i.clientId,
    status: i.status,
    metadata: i.metadata
  }));
  return /* @__PURE__ */ a(W, { users: n, currentClientId: t });
}
function $e({
  activity: e,
  visibleCount: t,
  rotateMs: n,
  staggerMs: i,
  kindColors: o,
  className: r
}) {
  const d = ie(e.events);
  return /* @__PURE__ */ a(
    O,
    {
      items: d,
      visibleCount: t,
      rotateMs: n,
      staggerMs: i,
      kindColors: o,
      className: r
    }
  );
}
function Me({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [n, i] = w([]), o = e.reactions;
  return L(() => {
    if (o.length === 0) return;
    const r = o[o.length - 1], d = F(r, o.length - 1);
    i((m) => m.some((u) => u.id === d.id) ? m : [...m, d]);
    const h = setTimeout(() => {
      i((m) => m.filter((u) => u.id !== d.id));
    }, t);
    return () => clearTimeout(h);
  }, [o, t]), /* @__PURE__ */ a(_, { reactions: n });
}
function Ue({
  fileUpload: e,
  accept: t,
  maxSize: n,
  multiple: i,
  disabled: o,
  label: r,
  className: d,
  uploadMetadata: h,
  onError: m
}) {
  const u = le(e.uploads);
  function b(s) {
    for (const p of s)
      e.upload(p, h ? { metadata: h } : void 0).catch(
        (l) => {
          const f = l instanceof Error ? l.message : "Upload failed";
          m?.(f);
        }
      );
  }
  return /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ a(
      B,
      {
        accept: t,
        maxSize: n,
        multiple: i,
        disabled: o,
        label: r,
        className: d,
        onFiles: b,
        onError: m
      }
    ),
    u.length > 0 && /* @__PURE__ */ a(
      "ul",
      {
        style: { margin: "8px 0 0", padding: 0, listStyle: "none", fontSize: 13 },
        children: u.map((s) => /* @__PURE__ */ c(
          "li",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 0",
              borderBottom: "1px solid #e2e8f0"
            },
            children: [
              /* @__PURE__ */ a("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.filename }),
              /* @__PURE__ */ a("span", { style: { color: me(s.status), fontWeight: 600, fontSize: 12 }, children: s.status === "uploading" ? `${s.progress}%` : s.status }),
              (s.status === "completed" || s.status === "clean") && s.downloadUrl && /* @__PURE__ */ a(
                "a",
                {
                  href: s.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  style: { fontSize: 12, color: "#3b82f6" },
                  children: "Download"
                }
              ),
              (s.status === "failed" || s.status === "infected") && /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: () => e.removeCompleted(),
                  style: { fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer" },
                  children: "Dismiss"
                }
              )
            ]
          },
          s.id
        ))
      }
    )
  ] });
}
function me(e) {
  switch (e) {
    case "completed":
    case "clean":
      return "#22c55e";
    case "failed":
    case "infected":
      return "#ef4444";
    case "scanning":
      return "#f59e0b";
    case "uploading":
      return "#3b82f6";
    default:
      return "#94a3b8";
  }
}
function De({
  hangout: e,
  localClientId: t,
  videoElements: n,
  mode: i,
  spotlightContent: o,
  activeSpeakerId: r,
  speakerHysteresisMs: d,
  onParticipantClick: h,
  className: m
}) {
  const u = de(e.participants, t), b = t != null ? u.find((l) => l.id === t) ?? null : null, s = t != null ? u.filter((l) => l.id !== t) : u;
  function p(l) {
    return n ? l.map((f) => ({
      ...f,
      videoElement: n[f.id] ?? f.videoElement
    })) : l;
  }
  return /* @__PURE__ */ a(
    q,
    {
      participants: p(s),
      localParticipant: b ? p([b])[0] : null,
      mode: i,
      spotlightContent: o,
      activeSpeakerId: r,
      speakerHysteresisMs: d,
      onParticipantClick: h,
      className: m
    }
  );
}
function Le({
  notifications: e,
  onItemClick: t,
  ...n
}) {
  const i = ue(e.notifications);
  return /* @__PURE__ */ a(
    H,
    {
      items: i,
      onItemClick: (r) => {
        t ? t(r) : e.markAsRead(r.id);
      },
      onMarkAllRead: e.markAllRead,
      onClearAll: e.clearAll,
      ...n
    }
  );
}
function ze({
  capability: e,
  loading: t,
  fallback: n,
  children: i
}) {
  return e.isLoading ? /* @__PURE__ */ a(C, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ a(C, { children: i }) : /* @__PURE__ */ a(C, { children: n ?? null });
}
function pe({
  slug: e,
  name: t,
  participantId: n,
  occupancy: i,
  subscribeRoomsIndex: o,
  onClick: r,
  onContextMenu: d,
  kebab: h,
  className: m,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  "data-testid": u = "room-row"
}) {
  const b = X(o ? e : null, {
    subscribeRoomsIndex: o
  }), s = o ? b.occupancy ?? null : i ?? null, p = s?.count ?? 0, l = s?.members ?? [], f = S(() => n ? l.some((N) => N.participantId === n) : !1, [l, n]), x = f, v = S(
    () => l.slice(0, 3).map((N) => ({
      id: N.participantId,
      name: N.displayName ?? N.userId,
      online: !0
    })),
    [l]
  );
  let y = null;
  return p > 1 ? y = /* @__PURE__ */ c(C, { children: [
    /* @__PURE__ */ a($, { users: v, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ a(E, { variant: "count", value: p, color: "muted" })
  ] }) : p === 1 && f ? y = /* @__PURE__ */ a(
    E,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${u}-self-pulse`
    }
  ) : p === 1 && (y = /* @__PURE__ */ c(C, { children: [
    /* @__PURE__ */ a($, { users: v, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ a(E, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ a(
    z,
    {
      "data-testid": u,
      icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "font-semibold text-slate-400", children: "#" }),
      label: t,
      trailing: y,
      active: x,
      onClick: r,
      onContextMenu: d,
      kebab: h,
      "aria-label": `${t} room`,
      className: m,
      dataAttrs: {
        "data-room-slug": e,
        "data-room-name": t,
        "data-room-active-count": p,
        "data-joined": x ? "true" : "false"
      }
    }
  );
}
const D = 3, I = 48;
function fe(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function ge(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < D ? `Name must be at least ${D} characters.` : t.length > I ? `Name must be at most ${I} characters.` : null;
}
function he({
  open: e,
  onClose: t,
  onCreate: n,
  onCreated: i,
  defaultVisibility: o
}) {
  const [r, d] = w(""), [h, m] = w(""), [u, b] = w(!1), [s, p] = w(!1), [l, f] = w(!1), [x, v] = w(null);
  L(() => {
    e && (d(""), m(""), b(!1), p(!1), f(!1), v(null));
  }, [e]);
  const y = S(() => ge(r), [r]), N = S(() => fe(r), [r]), g = !y && !l;
  async function A(k) {
    if (k.preventDefault(), !!g) {
      f(!0), v(null);
      try {
        const R = await n({
          name: r.trim(),
          description: h.trim() || void 0,
          visibility: o,
          settings: {
            audioOnly: u,
            recordingEnabled: s
          }
        });
        i?.(R), t();
      } catch (R) {
        v(R instanceof Error ? R.message : "Failed to create room."), f(!1);
      }
    }
  }
  return /* @__PURE__ */ a(
    G,
    {
      open: e,
      onClose: l ? () => {
      } : t,
      title: "New room",
      maxWidth: 440,
      rawChildren: !0,
      backdropTestId: "new-hangout-room-dialog",
      footer: null,
      children: /* @__PURE__ */ c("form", { onSubmit: A, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ c("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ a("span", { className: "text-[12px] font-semibold text-slate-700", children: "Name" }),
          /* @__PURE__ */ a(
            "input",
            {
              "data-autofocus": !0,
              "data-testid": "new-hangout-room-name",
              type: "text",
              value: r,
              onChange: (k) => d(k.target.value),
              placeholder: "Team standup",
              maxLength: I + 10,
              disabled: l,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ a("span", { "data-testid": "new-hangout-room-slug-preview", children: N ? `#${N}` : "Slug preview appears here" }),
            /* @__PURE__ */ a("span", { children: `${r.trim().length}/${I}` })
          ] }),
          y && r.length > 0 && /* @__PURE__ */ a(
            "span",
            {
              "data-testid": "new-hangout-room-name-error",
              className: "text-[11px] text-rose-600",
              children: y
            }
          )
        ] }),
        /* @__PURE__ */ c("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ c("span", { className: "text-[12px] font-semibold text-slate-700", children: [
            "Description ",
            /* @__PURE__ */ a("span", { className: "font-normal text-slate-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ a(
            "textarea",
            {
              "data-testid": "new-hangout-room-description",
              value: h,
              onChange: (k) => m(k.target.value),
              placeholder: "What's this room for?",
              rows: 2,
              disabled: l,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ c("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ c("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Audio only" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Skip video tracks — voice-only room." })
            ] }),
            /* @__PURE__ */ a(
              M,
              {
                checked: u,
                onChange: b,
                disabled: l,
                "aria-label": "Audio only",
                "data-testid": "new-hangout-room-audio-only"
              }
            )
          ] }),
          /* @__PURE__ */ c("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ c("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Recording enabled" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Allow server-side recording of sessions." })
            ] }),
            /* @__PURE__ */ a(
              M,
              {
                checked: s,
                onChange: p,
                disabled: l,
                "aria-label": "Recording enabled",
                "data-testid": "new-hangout-room-recording"
              }
            )
          ] })
        ] }),
        x && /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "new-hangout-room-error",
            role: "alert",
            className: "text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2",
            children: x
          }
        ),
        /* @__PURE__ */ c("div", { className: "flex justify-end gap-2 pt-1", children: [
          /* @__PURE__ */ a(
            j,
            {
              type: "button",
              variant: "ghost",
              onClick: t,
              disabled: l,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a(
            j,
            {
              type: "submit",
              variant: "primary",
              disabled: !g,
              "data-testid": "new-hangout-room-submit",
              children: l ? "Creating…" : "Create room"
            }
          )
        ] })
      ] })
    }
  );
}
function Fe({
  rooms: e,
  occupancyFor: t,
  occupancyAdapter: n,
  participantId: i,
  onJoinRoom: o,
  onContextMenu: r,
  onBrowseAll: d,
  maxVisible: h = 10,
  title: m = "Rooms",
  storageKey: u,
  renderCreateDialog: b
}) {
  const [s, p] = w(!1), l = () => p(!0), f = () => p(!1), x = S(
    () => e.rooms.filter((g) => g.state === "active"),
    [e.rooms]
  ), v = S(
    () => x.slice(0, h),
    [x, h]
  ), y = x.length - v.length;
  return /* @__PURE__ */ c(C, { children: [
    /* @__PURE__ */ c(
      V,
      {
        title: m,
        storageKey: u,
        actions: /* @__PURE__ */ a(
          Y,
          {
            "aria-label": "New room",
            size: "sm",
            onClick: l,
            icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "text-[14px] leading-none font-bold", children: "+" }),
            "data-testid": "new-room-button"
          }
        ),
        "data-testid": "rooms-section",
        children: [
          e.isLoading && /* @__PURE__ */ a("div", { className: "flex flex-col gap-1 px-1 py-1", "data-testid": "hangout-rooms-loading", children: [0, 1, 2].map((g) => /* @__PURE__ */ a(
            "div",
            {
              "aria-hidden": "true",
              className: "h-7 rounded-md bg-slate-100 animate-pulse"
            },
            g
          )) }),
          !e.isLoading && e.error && /* @__PURE__ */ c(
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
          !e.isLoading && !e.error && x.length === 0 && /* @__PURE__ */ a(
            K,
            {
              testId: "hangout-rooms-empty",
              title: "No rooms yet",
              description: "Create one to start an ongoing hangout.",
              action: /* @__PURE__ */ a(j, { onClick: l, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && x.length > 0 && /* @__PURE__ */ c("div", { className: "flex flex-col gap-0.5", children: [
            v.map((g) => /* @__PURE__ */ a(
              pe,
              {
                slug: g.slug,
                name: g.name,
                participantId: i,
                subscribeRoomsIndex: n,
                occupancy: n ? null : t?.(g.slug) ?? null,
                onClick: o ? () => o(g) : void 0,
                onContextMenu: r ? (A) => r(g, A) : void 0
              },
              g.slug
            )),
            y > 0 && /* @__PURE__ */ a(
              z,
              {
                "data-testid": "hangout-rooms-browse-all",
                label: /* @__PURE__ */ c("span", { className: "text-[12px] text-slate-500", children: [
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
    b ? b({ open: s, onClose: f }) : /* @__PURE__ */ a(
      he,
      {
        open: s,
        onClose: f,
        onCreate: e.createRoom,
        onCreated: (g) => {
          o?.(g);
        }
      }
    )
  ] });
}
export {
  ze as CapabilityBoundary,
  pe as HangoutRoomRow,
  Fe as HangoutRoomsSection,
  he as NewHangoutRoomDialog,
  $e as WrappedActivityPanel,
  Pe as WrappedChatPanel,
  Ue as WrappedFileUploadDrop,
  De as WrappedHangoutLayout,
  Le as WrappedNotificationCenter,
  je as WrappedPresencePanel,
  Me as WrappedReactionsOverlay,
  oe as adaptActivityEvent,
  ie as adaptActivityEvents,
  Q as adaptChatMessage,
  Z as adaptChatMessages,
  re as adaptFileUploadState,
  le as adaptFileUploads,
  se as adaptHangoutParticipant,
  de as adaptHangoutParticipants,
  ce as adaptNotification,
  ue as adaptNotifications,
  J as adaptPresenceEntry,
  Ae as adaptPresenceRoster,
  F as adaptReaction,
  Ee as adaptReactions,
  fe as slugifyRoomName
};
