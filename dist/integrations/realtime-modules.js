import { jsx as a, jsxs as c, Fragment as _ } from "react/jsx-runtime";
import { C as U, P as F } from "../PresencePanel-DHgUm0vc.js";
import { A as O, F as W, N as B, P, B as R, c as $ } from "../Badge-CCsRykoK.js";
import { useState as N, useEffect as z, useMemo as C } from "react";
import { c as H } from "../cn-B6yFEsav.js";
import { H as V } from "../HangoutLayout-DTIq3ne2.js";
import { useRoomOccupancy as q } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { S as D, a as X } from "../SidebarRow-Cw4xIxer.js";
import { E as K } from "../EmptyState-PM9wTjxk.js";
import { a as j } from "../Banner-B8AcwPH_.js";
import { I as Y } from "../IconButton-Da1kJ5WO.js";
import { M as G } from "../Modal-2jg4229_.js";
function J(e) {
  return {
    id: e.id,
    clientId: e.clientId,
    content: e.message,
    timestamp: e.timestamp,
    displayName: e.metadata?.displayName ?? void 0
  };
}
function Q(e) {
  return e.map(J);
}
function Z(e) {
  return {
    id: e.clientId,
    name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
    avatarUrl: e.metadata?.avatarUrl ?? void 0,
    online: e.status !== "offline"
  };
}
function je(e) {
  return e.map(Z);
}
const E = [15, 25, 35, 45, 55, 65, 75, 85], M = [20, 35, 50, 65, 80];
function T(e, t) {
  const n = E[t % E.length] ?? 50, i = M[Math.floor(t / E.length) % M.length] ?? 50, o = e.position != null && typeof e.position == "object" ? e.position : null;
  return {
    id: e.id,
    emoji: e.emoji,
    x: o?.x ?? n,
    y: o?.y ?? i,
    timestamp: e.timestamp
  };
}
function Pe(e) {
  return e.map(T);
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
function se(e) {
  return e.map(re);
}
function le(e, t) {
  return {
    id: e.clientId,
    displayName: e.displayName ?? e.clientId.slice(0, 12),
    isMuted: !e.audioOn,
    isLocal: t != null ? e.clientId === t : void 0
  };
}
function de(e, t) {
  return e.map((n) => le(n, t));
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
function $e({
  chat: e,
  presence: t,
  disabled: n,
  typingUsers: i
}) {
  const o = Q(e.messages), r = i ?? t?.roster.filter((d) => d.metadata?.isTyping === !0).map(
    (d) => d.metadata?.displayName ?? d.clientId.slice(0, 8)
  ) ?? [];
  return /* @__PURE__ */ a(
    U,
    {
      messages: o,
      onSend: e.sendMessage,
      disabled: n,
      typingUsers: r
    }
  );
}
function Me({
  presence: e,
  currentClientId: t
}) {
  const n = e.roster.map((i) => ({
    clientId: i.clientId,
    status: i.status,
    metadata: i.metadata
  }));
  return /* @__PURE__ */ a(F, { users: n, currentClientId: t });
}
function Le({
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
const me = {
  "❤️": "[animation:reaction-heart_2.5s_ease-out_forwards]",
  "😂": "[animation:reaction-laugh_2.5s_ease-out_forwards]",
  "👍": "[animation:reaction-thumbsup_2.5s_ease-out_forwards]",
  "👎": "[animation:reaction-thumbsdown_2.5s_ease-out_forwards]",
  "😮": "[animation:reaction-wow_2.5s_ease-out_forwards]",
  "😢": "[animation:reaction-cry_2.5s_ease-out_forwards]",
  "😡": "[animation:reaction-angry_1.8s_ease-out_forwards]",
  "🎉": "[animation:reaction-party_2.5s_ease-out_forwards]",
  "🔥": "[animation:reaction-fire_2.5s_ease-out_forwards]",
  "⚡": "[animation:reaction-lightning_1.5s_ease-out_forwards]",
  "💯": "[animation:reaction-hundred_2.0s_ease-out_forwards]",
  "🚀": "[animation:reaction-rocket_2.0s_ease-out_forwards]"
};
function pe({ reactions: e }) {
  return /* @__PURE__ */ a("div", { className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]", children: e.map((t) => /* @__PURE__ */ a(
    "span",
    {
      className: H(
        "absolute text-[2rem] select-none",
        me[t.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"
      ),
      style: { left: `${t.x}%`, top: `${t.y}%` },
      children: t.emoji
    },
    t.id
  )) });
}
function ze({
  reactions: e,
  ttlMs: t = 2500
}) {
  const [n, i] = N([]), o = e.reactions;
  return z(() => {
    if (o.length === 0) return;
    const r = o[o.length - 1], d = T(r, o.length - 1);
    i((m) => m.some((u) => u.id === d.id) ? m : [...m, d]);
    const h = setTimeout(() => {
      i((m) => m.filter((u) => u.id !== d.id));
    }, t);
    return () => clearTimeout(h);
  }, [o, t]), /* @__PURE__ */ a(pe, { reactions: n });
}
function De({
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
  const u = se(e.uploads);
  function b(l) {
    for (const p of l)
      e.upload(p, h ? { metadata: h } : void 0).catch(
        (s) => {
          const f = s instanceof Error ? s.message : "Upload failed";
          m?.(f);
        }
      );
  }
  return /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ a(
      W,
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
        children: u.map((l) => /* @__PURE__ */ c(
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
              /* @__PURE__ */ a("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: l.filename }),
              /* @__PURE__ */ a("span", { style: { color: fe(l.status), fontWeight: 600, fontSize: 12 }, children: l.status === "uploading" ? `${l.progress}%` : l.status }),
              (l.status === "completed" || l.status === "clean") && l.downloadUrl && /* @__PURE__ */ a(
                "a",
                {
                  href: l.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  style: { fontSize: 12, color: "#3b82f6" },
                  children: "Download"
                }
              ),
              (l.status === "failed" || l.status === "infected") && /* @__PURE__ */ a(
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
          l.id
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
  mode: i,
  spotlightContent: o,
  activeSpeakerId: r,
  speakerHysteresisMs: d,
  onParticipantClick: h,
  className: m
}) {
  const u = de(e.participants, t), b = t != null ? u.find((s) => s.id === t) ?? null : null, l = t != null ? u.filter((s) => s.id !== t) : u;
  function p(s) {
    return n ? s.map((f) => ({
      ...f,
      videoElement: n[f.id] ?? f.videoElement
    })) : s;
  }
  return /* @__PURE__ */ a(
    V,
    {
      participants: p(l),
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
function Ue({
  notifications: e,
  onItemClick: t,
  ...n
}) {
  const i = ue(e.notifications);
  return /* @__PURE__ */ a(
    B,
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
function Fe({
  capability: e,
  loading: t,
  fallback: n,
  children: i
}) {
  return e.isLoading ? /* @__PURE__ */ a(_, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ a(_, { children: i }) : /* @__PURE__ */ a(_, { children: n ?? null });
}
function ge({
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
  const b = q(o ? e : null, {
    subscribeRoomsIndex: o
  }), l = o ? b.occupancy ?? null : i ?? null, p = l?.count ?? 0, s = l?.members ?? [], f = C(() => n ? s.some((v) => v.participantId === n) : !1, [s, n]), x = f, w = C(
    () => s.slice(0, 3).map((v) => ({
      id: v.participantId,
      name: v.displayName ?? v.userId,
      online: !0
    })),
    [s]
  );
  let y = null;
  return p > 1 ? y = /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ a(P, { users: w, maxVisible: 3, size: 18 }),
    /* @__PURE__ */ a(R, { variant: "count", value: p, color: "muted" })
  ] }) : p === 1 && f ? y = /* @__PURE__ */ a(
    R,
    {
      variant: "pulse",
      color: "accent",
      "aria-label": "Just you in this room",
      "data-testid": `${u}-self-pulse`
    }
  ) : p === 1 && (y = /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ a(P, { users: w, maxVisible: 1, size: 18 }),
    /* @__PURE__ */ a(R, { variant: "count", value: 1, color: "muted" })
  ] })), /* @__PURE__ */ a(
    D,
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
const L = 3, I = 48;
function he(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function be(e) {
  const t = e.trim();
  return t.length === 0 ? "Name is required." : t.length < L ? `Name must be at least ${L} characters.` : t.length > I ? `Name must be at most ${I} characters.` : null;
}
function xe({
  open: e,
  onClose: t,
  onCreate: n,
  onCreated: i,
  defaultVisibility: o
}) {
  const [r, d] = N(""), [h, m] = N(""), [u, b] = N(!1), [l, p] = N(!1), [s, f] = N(!1), [x, w] = N(null);
  z(() => {
    e && (d(""), m(""), b(!1), p(!1), f(!1), w(null));
  }, [e]);
  const y = C(() => be(r), [r]), v = C(() => he(r), [r]), g = !y && !s;
  async function A(S) {
    if (S.preventDefault(), !!g) {
      f(!0), w(null);
      try {
        const k = await n({
          name: r.trim(),
          description: h.trim() || void 0,
          visibility: o,
          settings: {
            audioOnly: u,
            recordingEnabled: l
          }
        });
        i?.(k), t();
      } catch (k) {
        w(k instanceof Error ? k.message : "Failed to create room."), f(!1);
      }
    }
  }
  return /* @__PURE__ */ a(
    G,
    {
      open: e,
      onClose: s ? () => {
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
              onChange: (S) => d(S.target.value),
              placeholder: "Team standup",
              maxLength: I + 10,
              disabled: s,
              className: "w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ a("span", { "data-testid": "new-hangout-room-slug-preview", children: v ? `#${v}` : "Slug preview appears here" }),
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
              onChange: (S) => m(S.target.value),
              placeholder: "What's this room for?",
              rows: 2,
              disabled: s,
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
              $,
              {
                checked: u,
                onChange: b,
                disabled: s,
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
              $,
              {
                checked: l,
                onChange: p,
                disabled: s,
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
              disabled: s,
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
              children: s ? "Creating…" : "Create room"
            }
          )
        ] })
      ] })
    }
  );
}
function Oe({
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
  const [l, p] = N(!1), s = () => p(!0), f = () => p(!1), x = C(
    () => e.rooms.filter((g) => g.state === "active"),
    [e.rooms]
  ), w = C(
    () => x.slice(0, h),
    [x, h]
  ), y = x.length - w.length;
  return /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ c(
      X,
      {
        title: m,
        storageKey: u,
        actions: /* @__PURE__ */ a(
          Y,
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
              action: /* @__PURE__ */ a(j, { onClick: s, variant: "primary", size: "sm", children: "Create room" })
            }
          ),
          !e.isLoading && !e.error && x.length > 0 && /* @__PURE__ */ c("div", { className: "flex flex-col gap-0.5", children: [
            w.map((g) => /* @__PURE__ */ a(
              ge,
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
              D,
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
    b ? b({ open: l, onClose: f }) : /* @__PURE__ */ a(
      xe,
      {
        open: l,
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
  Fe as CapabilityBoundary,
  ge as HangoutRoomRow,
  Oe as HangoutRoomsSection,
  xe as NewHangoutRoomDialog,
  Le as WrappedActivityPanel,
  $e as WrappedChatPanel,
  De as WrappedFileUploadDrop,
  Te as WrappedHangoutLayout,
  Ue as WrappedNotificationCenter,
  Me as WrappedPresencePanel,
  ze as WrappedReactionsOverlay,
  oe as adaptActivityEvent,
  ie as adaptActivityEvents,
  J as adaptChatMessage,
  Q as adaptChatMessages,
  re as adaptFileUploadState,
  se as adaptFileUploads,
  le as adaptHangoutParticipant,
  de as adaptHangoutParticipants,
  ce as adaptNotification,
  ue as adaptNotifications,
  Z as adaptPresenceEntry,
  je as adaptPresenceRoster,
  T as adaptReaction,
  Pe as adaptReactions,
  he as slugifyRoomName
};
