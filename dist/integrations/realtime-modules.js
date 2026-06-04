import { jsx as a, jsxs as u, Fragment as C } from "react/jsx-runtime";
import { C as T, P as W } from "../PresencePanel-mBtTn35O.js";
import { A as B, F as H, N as _, P as L, B as j, S as $ } from "../Badge-D2m7pGPU.js";
import { useState as w, useEffect as z, useMemo as S } from "react";
import { R as V, S as D, a as q } from "../ReactionsOverlay-CoaX3hRz.js";
import { a as F } from "../HangoutLayout-BT6X2zG6.js";
import { useRoomOccupancy as X } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { E as Y } from "../EmptyState-PM9wTjxk.js";
import { B as E } from "../Button-Qsbxqsl9.js";
import { I as K } from "../IconButton-Da1kJ5WO.js";
import { M as G } from "../Modal-2jg4229_.js";
import { useLVSHangout as Q } from "@connorhoehn/realtime-modules/client/video";
import { A as Z } from "../Avatar-BvKIaNVE.js";
function J(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0,
    avatarUrl: e.metadata?.avatarUrl ?? void 0
  };
}
function ee(e) {
  return e.map(J);
}
function te(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function $e(e) {
  return e.map(te);
}
const P = [15, 25, 35, 45, 55, 65, 75, 85], M = [20, 35, 50, 65, 80];
function O(e, t) {
  const n = P[t % P.length] ?? 50, r = M[Math.floor(t / P.length) % M.length] ?? 50, o = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: o?.x ?? n,
    y: o?.y ?? r,
    timestamp: e.timestamp
  };
}
function Me(e) {
  return e.map(O);
}
function ae(e) {
  try {
    const t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
    return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
  } catch {
    return "";
  }
}
const ne = {
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
function oe(e) {
  const t = e.detail;
  return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
let ie = 0;
function re(e) {
  return {
    id: `${e.eventType}-${e.timestamp}-${ie++}`,
    actor: e.displayName,
    action: ne[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
    subject: oe(e),
    ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
    timeLabel: ae(e.timestamp),
    kind: e.eventType.split(".")[0]
    // e.g. "social", "pipeline"
  };
}
function se(e) {
  return e.map(re);
}
function le(e) {
  return {
    id: e.id,
    filename: e.filename,
    progress: e.progress ?? 0,
    status: e.status,
    downloadUrl: e.downloadUrl,
    error: e.error
  };
}
function ce(e) {
  return e.map(le);
}
function de(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function ue(e, t) {
  return e.map((n) => de(n, t));
}
function me(e) {
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
function pe(e) {
  return e.map(me);
}
function Ue({
  chat: e,
  presence: t,
  disabled: n,
  typingUsers: r
}) {
  const o = ee(e.messages), i = r ?? t?.roster.filter((c) => c.metadata?.isTyping === !0).map(
    (c) => c.metadata?.displayName ?? c.clientId.slice(0, 8)
  ) ?? [];
  return /* @__PURE__ */ a(
    T,
    {
      messages: o,
      onSend: e.sendMessage,
      disabled: n,
      typingUsers: i
    }
  );
}
function ze({
  presence: e,
  currentClientId: t
}) {
  const n = e.roster.map((r) => ({
    clientId: r.clientId,
    status: r.status,
    metadata: r.metadata
  }));
  return /* @__PURE__ */ a(W, { users: n, currentClientId: t });
}
function De({
  activity: e,
  visibleCount: t,
  rotateMs: n,
  staggerMs: r,
  kindColors: o,
  className: i
}) {
  const c = se(e.events);
  return /* @__PURE__ */ a(
    B,
    {
      items: c,
      visibleCount: t,
      rotateMs: n,
      staggerMs: r,
      kindColors: o,
      className: i
    }
  );
}
function Fe({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [n, r] = w([]), o = e.reactions;
  return z(() => {
    if (o.length === 0) return;
    const i = o[o.length - 1], c = O(i, o.length - 1);
    r((m) => m.some((p) => p.id === c.id) ? m : [...m, c]);
    const h = setTimeout(() => {
      r((m) => m.filter((p) => p.id !== c.id));
    }, t);
    return () => clearTimeout(h);
  }, [o, t]), /* @__PURE__ */ a(V, { reactions: n });
}
function Oe({
  fileUpload: e,
  accept: t,
  maxSize: n,
  multiple: r,
  disabled: o,
  label: i,
  className: c,
  uploadMetadata: h,
  onError: m
}) {
  const p = ce(e.uploads);
  function b(s) {
    for (const g of s)
      e.upload(g, h ? { metadata: h } : void 0).catch(
        (l) => {
          const d = l instanceof Error ? l.message : "Upload failed";
          m?.(d);
        }
      );
  }
  return /* @__PURE__ */ u("div", { children: [
    /* @__PURE__ */ a(
      H,
      {
        accept: t,
        maxSize: n,
        multiple: r,
        disabled: o,
        label: i,
        className: c,
        onFiles: b,
        onError: m
      }
    ),
    p.length > 0 && /* @__PURE__ */ a(
      "ul",
      {
        style: { margin: "8px 0 0", padding: 0, listStyle: "none", fontSize: 13 },
        children: p.map((s) => /* @__PURE__ */ u(
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
              /* @__PURE__ */ a("span", { style: { color: fe(s.status), fontWeight: 600, fontSize: 12 }, children: s.status === "uploading" ? `${s.progress}%` : s.status }),
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
function fe(e) {
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
function Te({
  hangout: e,
  localClientId: t,
  videoElements: n,
  mode: r,
  spotlightContent: o,
  activeSpeakerId: i,
  speakerHysteresisMs: c,
  onParticipantClick: h,
  className: m
}) {
  const p = ue(e.participants, t), b = t != null ? p.find((l) => l.id === t) ?? null : null, s = t != null ? p.filter((l) => l.id !== t) : p;
  function g(l) {
    return n ? l.map((d) => ({
      ...d,
      videoElement: n[d.id] ?? d.videoElement
    })) : l;
  }
  return /* @__PURE__ */ a(
    F,
    {
      participants: g(s),
      localParticipant: b ? g([b])[0] : null,
      mode: r,
      spotlightContent: o,
      activeSpeakerId: i,
      speakerHysteresisMs: c,
      onParticipantClick: h,
      className: m
    }
  );
}
function We({
  notifications: e,
  onItemClick: t,
  ...n
}) {
  const r = pe(e.notifications);
  return /* @__PURE__ */ a(
    _,
    {
      items: r,
      onItemClick: (i) => {
        t ? t(i) : e.markAsRead(i.id);
      },
      onMarkAllRead: e.markAllRead,
      onClearAll: e.clearAll,
      ...n
    }
  );
}
function Be({
  capability: e,
  loading: t,
  fallback: n,
  children: r
}) {
  return e.isLoading ? /* @__PURE__ */ a(C, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ a(C, { children: r }) : /* @__PURE__ */ a(C, { children: n ?? null });
}
function ge({
  slug: e,
  name: t,
  participantId: n,
  occupancy: r,
  subscribeRoomsIndex: o,
  onClick: i,
  onContextMenu: c,
  kebab: h,
  className: m,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  "data-testid": p = "room-row"
}) {
  const b = X(o ? e : null, {
    subscribeRoomsIndex: o
  }), s = o ? b.occupancy ?? null : r ?? null, g = s?.count ?? 0, l = s?.members ?? [], d = S(() => n ? l.some((x) => x.participantId === n) : !1, [l, n]), y = d, N = S(
    () => l.slice(0, 3).map((x) => ({
      id: x.participantId,
      name: x.displayName ?? x.userId,
      online: !0
    })),
    [l]
  );
  let v = null;
  return g > 1 ? v = /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ a(L, { users: N, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ a(j, { variant: "count", value: g, color: "muted" })
  ] }) : g === 1 && d ? v = /* @__PURE__ */ a(
    j,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${p}-self-pulse`
    }
  ) : g === 1 && (v = /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ a(L, { users: N, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ a(j, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ a(
    D,
    {
      "data-testid": p,
      icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "font-semibold text-slate-400", children: "#" }),
      label: t,
      trailing: v,
      active: y,
      onClick: i,
      onContextMenu: c,
      kebab: h,
      "aria-label": `${t} room`,
      className: m,
      dataAttrs: {
        "data-room-slug": e,
        "data-room-name": t,
        "data-room-active-count": g,
        "data-joined": y ? "true" : "false"
      }
    }
  );
}
const U = 3, A = 48;
function he(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function be(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < U ? `Name must be at least ${U} characters.` : t.length > A ? `Name must be at most ${A} characters.` : null;
}
function ye({
  open: e,
  onClose: t,
  onCreate: n,
  onCreated: r,
  defaultVisibility: o
}) {
  const [i, c] = w(""), [h, m] = w(""), [p, b] = w(!1), [s, g] = w(!1), [l, d] = w(!1), [y, N] = w(null);
  z(() => {
    e && (c(""), m(""), b(!1), g(!1), d(!1), N(null));
  }, [e]);
  const v = S(() => be(i), [i]), x = S(() => he(i), [i]), f = !v && !l;
  async function R(k) {
    if (k.preventDefault(), !!f) {
      d(!0), N(null);
      try {
        const I = await n({
          name: i.trim(),
          description: h.trim() || void 0,
          visibility: o,
          settings: {
            audioOnly: p,
            recordingEnabled: s
          }
        });
        r?.(I), t();
      } catch (I) {
        N(I instanceof Error ? I.message : "Failed to create room."), d(!1);
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
      children: /* @__PURE__ */ u("form", { onSubmit: R, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ u("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ a("span", { className: "text-[12px] font-semibold text-slate-700", children: "Name" }),
          /* @__PURE__ */ a(
            "input",
            {
              "data-autofocus": !0,
              "data-testid": "new-hangout-room-name",
              type: "text",
              value: i,
              onChange: (k) => c(k.target.value),
              placeholder: "Team standup",
              maxLength: A + 10,
              disabled: l,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ u("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ a("span", { "data-testid": "new-hangout-room-slug-preview", children: x ? `#${x}` : "Slug preview appears here" }),
            /* @__PURE__ */ a("span", { children: `${i.trim().length}/${A}` })
          ] }),
          v && i.length > 0 && /* @__PURE__ */ a(
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
        /* @__PURE__ */ u("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ u("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Audio only" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Skip video tracks — voice-only room." })
            ] }),
            /* @__PURE__ */ a(
              $,
              {
                checked: p,
                onChange: b,
                disabled: l,
                "aria-label": "Audio only",
                "data-testid": "new-hangout-room-audio-only"
              }
            )
          ] }),
          /* @__PURE__ */ u("label", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-slate-700", children: "Recording enabled" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-slate-400", children: "Allow server-side recording of sessions." })
            ] }),
            /* @__PURE__ */ a(
              $,
              {
                checked: s,
                onChange: g,
                disabled: l,
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
        /* @__PURE__ */ u("div", { className: "flex justify-end gap-2 pt-1", children: [
          /* @__PURE__ */ a(
            E,
            {
              type: "button",
              variant: "ghost",
              onClick: t,
              disabled: l,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a(
            E,
            {
              type: "submit",
              variant: "primary",
              disabled: !f,
              "data-testid": "new-hangout-room-submit",
              children: l ? "Creating…" : "Create room"
            }
          )
        ] })
      ] })
    }
  );
}
function He({
  rooms: e,
  occupancyFor: t,
  occupancyAdapter: n,
  participantId: r,
  onJoinRoom: o,
  onContextMenu: i,
  onBrowseAll: c,
  maxVisible: h = 10,
  title: m = "Rooms",
  storageKey: p,
  renderCreateDialog: b
}) {
  const [s, g] = w(!1), l = () => g(!0), d = () => g(!1), y = S(
    () => e.rooms.filter((f) => f.state === "active"),
    [e.rooms]
  ), N = S(
    () => y.slice(0, h),
    [y, h]
  ), v = y.length - N.length;
  return /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ u(
      q,
      {
        title: m,
        storageKey: p,
        actions: /* @__PURE__ */ a(
          K,
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
          e.isLoading && /* @__PURE__ */ a("div", { className: "flex flex-col gap-1 px-1 py-1", "data-testid": "hangout-rooms-loading", children: [0, 1, 2].map((f) => /* @__PURE__ */ a(
            "div",
            {
              "aria-hidden": "true",
              className: "h-7 rounded-md bg-slate-100 animate-pulse"
            },
            f
          )) }),
          !e.isLoading && e.error && /* @__PURE__ */ u(
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
            Y,
            {
              testId: "hangout-rooms-empty",
              title: "No rooms yet",
              description: "Create one to start an ongoing hangout.",
              action: /* @__PURE__ */ a(E, { onClick: l, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && y.length > 0 && /* @__PURE__ */ u("div", { className: "flex flex-col gap-0.5", children: [
            N.map((f) => /* @__PURE__ */ a(
              ge,
              {
                slug: f.slug,
                name: f.name,
                participantId: r,
                subscribeRoomsIndex: n,
                occupancy: n ? null : t?.(f.slug) ?? null,
                onClick: o ? () => o(f) : void 0,
                onContextMenu: i ? (R) => i(f, R) : void 0
              },
              f.slug
            )),
            v > 0 && /* @__PURE__ */ a(
              D,
              {
                "data-testid": "hangout-rooms-browse-all",
                label: /* @__PURE__ */ u("span", { className: "text-[12px] text-slate-500", children: [
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
    b ? b({ open: s, onClose: d }) : /* @__PURE__ */ a(
      ye,
      {
        open: s,
        onClose: d,
        onCreate: e.createRoom,
        onCreated: (f) => {
          o?.(f);
        }
      }
    )
  ] });
}
function ve(e, t) {
  const n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), o = e.streams[0];
  return {
    id: e.participantId,
    displayName: r,
    isLocal: n,
    isMuted: !e.hasAudio,
    videoElement: o ? /* @__PURE__ */ a(
      "video",
      {
        autoPlay: !0,
        playsInline: !0,
        muted: n,
        ref: (i) => {
          i && i.srcObject !== o && (i.srcObject = o);
        },
        className: `w-full h-full object-cover ${n ? "scale-x-[-1]" : ""}`
      }
    ) : /* @__PURE__ */ a("div", { className: "w-full h-full grid place-items-center bg-slate-200", children: /* @__PURE__ */ a(Z, { name: r, size: 64, src: void 0 }) })
  };
}
function _e({
  stageToken: e,
  participantId: t,
  userId: n,
  localClientId: r,
  getStageToken: o,
  overlay: i,
  spotlightContent: c,
  onParticipantClick: h,
  mode: m = "auto",
  activeSpeakerStrategy: p = "audio-level",
  localTileLabel: b,
  showLocalAsTile: s = !0,
  className: g,
  "data-testid": l
}) {
  const d = Q({
    stageToken: e,
    participantId: t,
    userId: n ?? t.slice(0, 8),
    getAuthToken: o
  }), y = S(() => d.participants.filter((f) => s || !f.isLocal).map((f) => ve(f, b)), [d.participants, s, b]), N = d.participants.filter((x) => !x.isLocal).length, v = {
    connectionState: d.connectionState,
    error: d.error,
    participantCount: d.participants.length,
    remoteCount: N
  };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-testid": l,
      className: `relative flex-1 min-h-0 ${g ?? ""}`,
      children: [
        /* @__PURE__ */ a(
          F,
          {
            participants: y,
            localParticipant: null,
            mode: m,
            spotlightContent: c,
            onParticipantClick: h,
            className: "h-full"
          }
        ),
        i && /* @__PURE__ */ a("div", { className: "absolute inset-0 pointer-events-none z-10", "data-testid": "wrapped-overlay-slot", children: /* @__PURE__ */ a("div", { className: "pointer-events-auto", children: i(v) }) })
      ]
    }
  );
}
export {
  Be as CapabilityBoundary,
  ge as HangoutRoomRow,
  He as HangoutRoomsSection,
  ye as NewHangoutRoomDialog,
  De as WrappedActivityPanel,
  Ue as WrappedChatPanel,
  Oe as WrappedFileUploadDrop,
  Te as WrappedHangoutLayout,
  _e as WrappedLVSHangoutLayout,
  We as WrappedNotificationCenter,
  ze as WrappedPresencePanel,
  Fe as WrappedReactionsOverlay,
  re as adaptActivityEvent,
  se as adaptActivityEvents,
  J as adaptChatMessage,
  ee as adaptChatMessages,
  le as adaptFileUploadState,
  ce as adaptFileUploads,
  de as adaptHangoutParticipant,
  ue as adaptHangoutParticipants,
  me as adaptNotification,
  pe as adaptNotifications,
  te as adaptPresenceEntry,
  $e as adaptPresenceRoster,
  O as adaptReaction,
  Me as adaptReactions,
  he as slugifyRoomName
};
