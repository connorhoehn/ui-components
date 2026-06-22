import { jsx as a, jsxs as u, Fragment as C } from "react/jsx-runtime";
import { C as F, P as W } from "../PresencePanel-DhsDetgi.js";
import { A as B, N as H, P as L, B as j, S as $ } from "../Badge-CgxZp81E.js";
import { useState as w, useEffect as U, useMemo as S } from "react";
import { R as V, S as z, a as _ } from "../ReactionsOverlay-CoaX3hRz.js";
import { F as q, I as X } from "../FileUploadDrop-Cmz3XANg.js";
import { a as D, R as Y, S as K } from "../RemoteTileSlot-BXvSW4lr.js";
import { useRoomOccupancy as G } from "@connorhoehnslalom/realtime-modules/client/hangout-rooms";
import { E as Q } from "../EmptyState-PM9wTjxk.js";
import { B as P } from "../Button-Qsbxqsl9.js";
import { M as Z } from "../Modal-2jg4229_.js";
import { useLVSHangout as J } from "@connorhoehnslalom/realtime-modules/client/video";
import { A as ee } from "../Avatar-BvKIaNVE.js";
function te(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0,
    avatarUrl: e.metadata?.avatarUrl ?? void 0
  };
}
function ae(e) {
  return e.map(te);
}
function ne(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function Ue(e) {
  return e.map(ne);
}
const E = [15, 25, 35, 45, 55, 65, 75, 85], M = [20, 35, 50, 65, 80];
function O(e, t) {
  const n = E[t % E.length] ?? 50, r = M[Math.floor(t / E.length) % M.length] ?? 50, o = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: o?.x ?? n,
    y: o?.y ?? r,
    timestamp: e.timestamp
  };
}
function ze(e) {
  return e.map(O);
}
function oe(e) {
  try {
    const t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
    return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
  } catch {
    return "";
  }
}
const ie = {
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
function re(e) {
  const t = e.detail;
  return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
let se = 0;
function le(e) {
  return {
    id: `${e.eventType}-${e.timestamp}-${se++}`,
    actor: e.displayName,
    action: ie[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
    subject: re(e),
    ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
    timeLabel: oe(e.timestamp),
    kind: e.eventType.split(".")[0]
    // e.g. "social", "pipeline"
  };
}
function ce(e) {
  return e.map(le);
}
function de(e) {
  return {
    id: e.id,
    filename: e.filename,
    progress: e.progress ?? 0,
    status: e.status,
    downloadUrl: e.downloadUrl,
    error: e.error
  };
}
function ue(e) {
  return e.map(de);
}
function me(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function pe(e, t) {
  return e.map((n) => me(n, t));
}
function fe(e) {
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
function ge(e) {
  return e.map(fe);
}
function De({
  chat: e,
  presence: t,
  disabled: n,
  typingUsers: r
}) {
  const o = ae(e.messages), i = r ?? t?.roster.filter((c) => c.metadata?.isTyping === !0).map(
    (c) => c.metadata?.displayName ?? c.clientId.slice(0, 8)
  ) ?? [];
  return /* @__PURE__ */ a(
    F,
    {
      messages: o,
      onSend: e.sendMessage,
      disabled: n,
      typingUsers: i
    }
  );
}
function Oe({
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
function Fe({
  activity: e,
  visibleCount: t,
  rotateMs: n,
  staggerMs: r,
  kindColors: o,
  className: i
}) {
  const c = ce(e.events);
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
function We({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [n, r] = w([]), o = e.reactions;
  return U(() => {
    if (o.length === 0) return;
    const i = o[o.length - 1], c = O(i, o.length - 1);
    r((m) => m.some((p) => p.id === c.id) ? m : [...m, c]);
    const g = setTimeout(() => {
      r((m) => m.filter((p) => p.id !== c.id));
    }, t);
    return () => clearTimeout(g);
  }, [o, t]), /* @__PURE__ */ a(V, { reactions: n });
}
function Be({
  fileUpload: e,
  accept: t,
  maxSize: n,
  multiple: r,
  disabled: o,
  label: i,
  className: c,
  uploadMetadata: g,
  onError: m
}) {
  const p = ue(e.uploads);
  function b(s) {
    for (const h of s)
      e.upload(h, g ? { metadata: g } : void 0).catch(
        (l) => {
          const d = l instanceof Error ? l.message : "Upload failed";
          m?.(d);
        }
      );
  }
  return /* @__PURE__ */ u("div", { children: [
    /* @__PURE__ */ a(
      q,
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
              /* @__PURE__ */ a("span", { style: { color: he(s.status), fontWeight: 600, fontSize: 12 }, children: s.status === "uploading" ? `${s.progress}%` : s.status }),
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
function he(e) {
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
function He({
  hangout: e,
  localClientId: t,
  videoElements: n,
  mode: r,
  spotlightContent: o,
  activeSpeakerId: i,
  speakerHysteresisMs: c,
  onParticipantClick: g,
  className: m
}) {
  const p = pe(e.participants, t), b = t != null ? p.find((l) => l.id === t) ?? null : null, s = t != null ? p.filter((l) => l.id !== t) : p;
  function h(l) {
    return n ? l.map((d) => ({
      ...d,
      videoElement: n[d.id] ?? d.videoElement
    })) : l;
  }
  return /* @__PURE__ */ a(
    D,
    {
      participants: h(s),
      localParticipant: b ? h([b])[0] : null,
      mode: r,
      spotlightContent: o,
      activeSpeakerId: i,
      speakerHysteresisMs: c,
      onParticipantClick: g,
      className: m
    }
  );
}
function Ve({
  notifications: e,
  onItemClick: t,
  ...n
}) {
  const r = ge(e.notifications);
  return /* @__PURE__ */ a(
    H,
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
function _e({
  capability: e,
  loading: t,
  fallback: n,
  children: r
}) {
  return e.isLoading ? /* @__PURE__ */ a(C, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ a(C, { children: r }) : /* @__PURE__ */ a(C, { children: n ?? null });
}
function be({
  slug: e,
  name: t,
  participantId: n,
  occupancy: r,
  subscribeRoomsIndex: o,
  onClick: i,
  onContextMenu: c,
  kebab: g,
  className: m,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  "data-testid": p = "room-row"
}) {
  const b = G(o ? e : null, {
    subscribeRoomsIndex: o
  }), s = o ? b.occupancy ?? null : r ?? null, h = s?.count ?? 0, l = s?.members ?? [], d = S(() => n ? l.some((x) => x.participantId === n) : !1, [l, n]), y = d, N = S(
    () => l.slice(0, 3).map((x) => ({
      id: x.participantId,
      name: x.displayName ?? x.userId,
      online: !0
    })),
    [l]
  );
  let v = null;
  return h > 1 ? v = /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ a(L, { users: N, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ a(j, { variant: "count", value: h, color: "muted" })
  ] }) : h === 1 && d ? v = /* @__PURE__ */ a(
    j,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${p}-self-pulse`
    }
  ) : h === 1 && (v = /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ a(L, { users: N, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ a(j, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ a(
    z,
    {
      "data-testid": p,
      icon: /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "font-semibold text-slate-400", children: "#" }),
      label: t,
      trailing: v,
      active: y,
      onClick: i,
      onContextMenu: c,
      kebab: g,
      "aria-label": `${t} room`,
      className: m,
      dataAttrs: {
        "data-room-slug": e,
        "data-room-name": t,
        "data-room-active-count": h,
        "data-joined": y ? "true" : "false"
      }
    }
  );
}
const T = 3, R = 48;
function ye(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function ve(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < T ? `Name must be at least ${T} characters.` : t.length > R ? `Name must be at most ${R} characters.` : null;
}
function xe({
  open: e,
  onClose: t,
  onCreate: n,
  onCreated: r,
  defaultVisibility: o
}) {
  const [i, c] = w(""), [g, m] = w(""), [p, b] = w(!1), [s, h] = w(!1), [l, d] = w(!1), [y, N] = w(null);
  U(() => {
    e && (c(""), m(""), b(!1), h(!1), d(!1), N(null));
  }, [e]);
  const v = S(() => ve(i), [i]), x = S(() => ye(i), [i]), f = !v && !l;
  async function A(k) {
    if (k.preventDefault(), !!f) {
      d(!0), N(null);
      try {
        const I = await n({
          name: i.trim(),
          description: g.trim() || void 0,
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
    Z,
    {
      open: e,
      onClose: l ? () => {
      } : t,
      title: "New room",
      maxWidth: 440,
      rawChildren: !0,
      backdropTestId: "new-hangout-room-dialog",
      footer: null,
      children: /* @__PURE__ */ u("form", { onSubmit: A, className: "flex flex-col gap-4", children: [
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
              maxLength: R + 10,
              disabled: l,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ u("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ a("span", { "data-testid": "new-hangout-room-slug-preview", children: x ? `#${x}` : "Slug preview appears here" }),
            /* @__PURE__ */ a("span", { children: `${i.trim().length}/${R}` })
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
              value: g,
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
                onChange: h,
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
            P,
            {
              type: "button",
              variant: "ghost",
              onClick: t,
              disabled: l,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a(
            P,
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
function qe({
  rooms: e,
  occupancyFor: t,
  occupancyAdapter: n,
  participantId: r,
  onJoinRoom: o,
  onContextMenu: i,
  onBrowseAll: c,
  maxVisible: g = 10,
  title: m = "Rooms",
  storageKey: p,
  renderCreateDialog: b
}) {
  const [s, h] = w(!1), l = () => h(!0), d = () => h(!1), y = S(
    () => e.rooms.filter((f) => f.state === "active"),
    [e.rooms]
  ), N = S(
    () => y.slice(0, g),
    [y, g]
  ), v = y.length - N.length;
  return /* @__PURE__ */ u(C, { children: [
    /* @__PURE__ */ u(
      _,
      {
        title: m,
        storageKey: p,
        actions: /* @__PURE__ */ a(
          X,
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
            Q,
            {
              testId: "hangout-rooms-empty",
              title: "No rooms yet",
              description: "Create one to start an ongoing hangout.",
              action: /* @__PURE__ */ a(P, { onClick: l, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && y.length > 0 && /* @__PURE__ */ u("div", { className: "flex flex-col gap-0.5", children: [
            N.map((f) => /* @__PURE__ */ a(
              be,
              {
                slug: f.slug,
                name: f.name,
                participantId: r,
                subscribeRoomsIndex: n,
                occupancy: n ? null : t?.(f.slug) ?? null,
                onClick: o ? () => o(f) : void 0,
                onContextMenu: i ? (A) => i(f, A) : void 0
              },
              f.slug
            )),
            v > 0 && /* @__PURE__ */ a(
              z,
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
      xe,
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
function Ne({
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
  ) : /* @__PURE__ */ a("div", { className: "w-full h-full grid place-items-center bg-slate-200", "data-testid": "local-camera-avatar", children: /* @__PURE__ */ a(ee, { name: t, size: 64 }) });
}
function we(e, t) {
  const n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), o = e.streams[0], i = e.screenStream, c = n ? /* @__PURE__ */ a(Ne, { stream: o, displayName: r }) : /* @__PURE__ */ a(Y, { stream: o, displayName: r, cameraOn: e.hasVideo }), g = i ? /* @__PURE__ */ a(K, { stream: i, muted: n, className: "w-full h-full object-contain bg-black" }) : void 0;
  return {
    id: e.participantId,
    displayName: r,
    isLocal: n,
    isMuted: !e.hasAudio,
    videoElement: c,
    screenElement: g
  };
}
function Xe({
  stageToken: e,
  participantId: t,
  userId: n,
  localClientId: r,
  getStageToken: o,
  overlay: i,
  spotlightContent: c,
  onParticipantClick: g,
  mode: m = "auto",
  activeSpeakerStrategy: p = "audio-level",
  localTileLabel: b,
  showLocalAsTile: s = !0,
  className: h,
  "data-testid": l
}) {
  const d = J({
    stageToken: e,
    participantId: t,
    userId: n ?? t.slice(0, 8),
    getAuthToken: o
  }), y = S(() => d.participants.filter((f) => s || !f.isLocal).map((f) => we(f, b)), [d.participants, s, b]), N = d.participants.filter((x) => !x.isLocal).length, v = {
    connectionState: d.connectionState,
    error: d.error,
    participantCount: d.participants.length,
    remoteCount: N
  };
  return /* @__PURE__ */ u(
    "div",
    {
      "data-testid": l,
      className: `relative flex-1 min-h-0 ${h ?? ""}`,
      children: [
        /* @__PURE__ */ a(
          D,
          {
            participants: y,
            localParticipant: null,
            mode: m,
            spotlightContent: c,
            onParticipantClick: g,
            className: "h-full"
          }
        ),
        i && /* @__PURE__ */ a("div", { className: "absolute inset-0 pointer-events-none z-10", "data-testid": "wrapped-overlay-slot", children: /* @__PURE__ */ a("div", { className: "pointer-events-auto", children: i(v) }) })
      ]
    }
  );
}
export {
  _e as CapabilityBoundary,
  be as HangoutRoomRow,
  qe as HangoutRoomsSection,
  xe as NewHangoutRoomDialog,
  Fe as WrappedActivityPanel,
  De as WrappedChatPanel,
  Be as WrappedFileUploadDrop,
  He as WrappedHangoutLayout,
  Xe as WrappedLVSHangoutLayout,
  Ve as WrappedNotificationCenter,
  Oe as WrappedPresencePanel,
  We as WrappedReactionsOverlay,
  le as adaptActivityEvent,
  ce as adaptActivityEvents,
  te as adaptChatMessage,
  ae as adaptChatMessages,
  de as adaptFileUploadState,
  ue as adaptFileUploads,
  me as adaptHangoutParticipant,
  pe as adaptHangoutParticipants,
  fe as adaptNotification,
  ge as adaptNotifications,
  ne as adaptPresenceEntry,
  Ue as adaptPresenceRoster,
  O as adaptReaction,
  ze as adaptReactions,
  ye as slugifyRoomName
};
