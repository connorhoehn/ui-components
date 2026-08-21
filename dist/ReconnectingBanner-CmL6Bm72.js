import { jsxs as k, jsx as s } from "react/jsx-runtime";
import { useMemo as T, useState as S, useEffect as N, useRef as j } from "react";
import { c as x } from "./cn-B6yFEsav.js";
import { A as U } from "./Avatar-B7O2g50s.js";
function L({
  id: e,
  displayName: t,
  avatarUrl: n,
  isSpeaking: d = !1,
  isMuted: a = !1,
  isLocal: c = !1,
  isSpotlight: f = !1,
  videoElement: o,
  onClick: u,
  fillParent: v = !1,
  className: b,
  style: h
}) {
  const r = c ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ k(
    "div",
    {
      className: x(
        "relative bg-video-tile flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        // fillParent: defer sizing to the parent grid cell. Default:
        // enforce 16:9 so the tile renders correctly even in a parent
        // with no explicit height (the mini-widget case).
        v ? "w-full h-full" : "aspect-video",
        d ? "border-success" : "border-transparent",
        u && "cursor-pointer hover:border-white/30",
        b
      ),
      style: h,
      onClick: u,
      role: u ? "button" : void 0,
      tabIndex: u ? 0 : void 0,
      onKeyDown: u ? (i) => {
        (i.key === "Enter" || i.key === " ") && u();
      } : void 0,
      "data-testid": r,
      "data-peer-id": e,
      "data-peer-name": t,
      "data-is-local": c ? "true" : "false",
      "data-is-spotlight": f ? "true" : "false",
      "data-is-muted": a ? "true" : "false",
      "data-track-kind": o ? "camera" : "avatar",
      children: [
        o ?? // Avatar fallback. Fills the tile with the deterministic name-hashed
        // color so even when the consumer passes a null/undefined videoElement
        // (e.g. peer toggled camera off) the participant is unambiguously
        // present — never an empty black square. The colored backdrop spans
        // the whole tile; the initials chip sits centered on top.
        /* @__PURE__ */ s(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center",
            style: { background: O(t) },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: x(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  f ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: n ? /* @__PURE__ */ s("img", { src: n, alt: "", className: x("w-full h-full rounded-full object-cover") }) : A(t)
              }
            )
          }
        ),
        /* @__PURE__ */ k("div", { className: x("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          c && /* @__PURE__ */ s("span", { className: x("text-code-blue truncate font-medium"), children: "You" }),
          !c && /* @__PURE__ */ s("span", { className: "truncate font-medium", children: t }),
          a && /* @__PURE__ */ s("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ s("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        a && /* @__PURE__ */ s(
          "div",
          {
            className: x(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md",
              f ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ k("svg", { width: f ? 16 : 12, height: f ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ s("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ s("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ s("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ s("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ s("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        d && /* @__PURE__ */ s("div", { className: x("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function A(e) {
  const t = e.trim();
  if (!t) return "?";
  const n = t.split(/\s+/);
  return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function O(e) {
  let t = 0;
  for (let d = 0; d < e.length; d++)
    t = e.charCodeAt(d) + ((t << 5) - t);
  return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
function H({
  participants: e,
  localParticipant: t = null,
  activeSpeakerId: n = null,
  onParticipantClick: d,
  fillParent: a = !1,
  pipWidth: c = 96,
  className: f,
  style: o
}) {
  const u = e.length, v = !!t && u === 0, b = !!t && u >= 2, h = !!t && u === 1, r = T(() => {
    if (v && t) return [{ ...t, isLocal: !0 }];
    const l = [...e];
    return b && t && l.push({ ...t, isLocal: !0 }), l;
  }, [e, v, b, t]), i = V(r.length), w = Math.max(1, Math.ceil(r.length / i));
  return /* @__PURE__ */ k(
    "div",
    {
      className: x(
        "relative grid gap-1 bg-video-stage rounded-lg overflow-hidden",
        a && "h-full w-full",
        f
      ),
      style: {
        gridTemplateColumns: `repeat(${i}, 1fr)`,
        ...a ? { gridTemplateRows: `repeat(${w}, 1fr)` } : {},
        ...o
      },
      children: [
        r.map((l) => /* @__PURE__ */ s(
          L,
          {
            id: l.id,
            displayName: l.displayName,
            avatarUrl: l.avatarUrl,
            isSpeaking: l.id === n,
            isMuted: l.isMuted,
            isLocal: l.isLocal,
            videoElement: l.videoElement,
            fillParent: a,
            onClick: d ? () => d(l.id) : void 0
          },
          l.id
        )),
        r.length === 0 && /* @__PURE__ */ s("div", { className: x(
          "flex items-center justify-center text-white/40 text-sm",
          a ? "h-full w-full" : "aspect-video"
        ), children: "Waiting for others to join…" }),
        h && t && /* @__PURE__ */ s(
          "div",
          {
            className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
            style: { width: c },
            children: /* @__PURE__ */ s(
              L,
              {
                id: t.id,
                displayName: t.displayName,
                avatarUrl: t.avatarUrl,
                isMuted: t.isMuted,
                isLocal: !0,
                videoElement: t.videoElement
              }
            )
          }
        )
      ]
    }
  );
}
function V(e) {
  return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
function B({
  participants: e,
  localParticipant: t = null,
  spotlightContent: n,
  spotlightContentLabel: d,
  activeSpeakerId: a = null,
  speakerHysteresisMs: c = 750,
  onParticipantClick: f,
  fillParent: o = !1,
  filmstripTileWidth: u = 128,
  className: v,
  style: b
}) {
  const h = I(a, c), r = T(() => {
    const g = e.find((p) => p.screenElement);
    return g || (t && t.screenElement ? { ...t, isLocal: !0 } : null);
  }, [e, t]), i = T(() => {
    const g = n || r ? null : h, p = e.filter((M) => M.id !== g);
    return t && p.push({ ...t, isLocal: !0 }), p;
  }, [e, h, t, n, r]), l = (h ? e.find((g) => g.id === h) ?? null : null) ?? e[0] ?? t ?? null;
  let m, y, E = null;
  return n ? (m = "screen", y = d ?? l?.displayName ?? "", E = n) : r ? (m = "screen", y = r.displayName, E = r.screenElement) : l ? (m = "camera", y = l.displayName, E = /* @__PURE__ */ s(
    L,
    {
      id: l.id,
      displayName: l.displayName,
      avatarUrl: l.avatarUrl,
      isMuted: l.isMuted,
      isLocal: l.isLocal,
      isSpotlight: !0,
      fillParent: !0,
      videoElement: l.videoElement,
      className: "w-full h-full"
    }
  )) : (m = "camera", y = ""), /* @__PURE__ */ k(
    "div",
    {
      className: x(
        "flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden",
        o && "h-full w-full",
        v
      ),
      style: b,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: x(
              "bg-black relative",
              // fillParent: spotlight stretches with flexbox; otherwise it
              // enforces 16:9 against width (the mini-widget case).
              o ? "flex-1 min-h-0" : "flex-1 aspect-video"
            ),
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": m,
            "data-spotlight-user": y,
            children: E
          }
        ),
        i.length > 0 && /* @__PURE__ */ s("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0", children: i.map((g) => /* @__PURE__ */ s(
          "div",
          {
            className: "shrink-0",
            style: { width: u },
            children: /* @__PURE__ */ s(
              L,
              {
                id: g.id,
                displayName: g.displayName,
                avatarUrl: g.avatarUrl,
                isMuted: g.isMuted,
                isLocal: g.isLocal,
                videoElement: g.videoElement,
                onClick: f ? () => f(g.id) : void 0
              }
            )
          },
          g.id
        )) })
      ]
    }
  );
}
function I(e, t) {
  const [n, d] = S(e ?? null);
  return N(() => {
    const a = e ?? null;
    if (t <= 0) {
      d(a);
      return;
    }
    if (a === n) return;
    const c = setTimeout(() => d(a), t);
    return () => clearTimeout(c);
  }, [e, t, n]), n;
}
const _ = 10;
function q({
  participants: e,
  localParticipant: t = null,
  mode: n = "auto",
  activeSpeakerId: d = null,
  speakerHysteresisMs: a = 750,
  spotlightContent: c,
  spotlightContentLabel: f,
  onParticipantClick: o,
  fillParent: u = !1,
  pipWidth: v,
  filmstripTileWidth: b,
  className: h,
  style: r
}) {
  const i = e.length + (t ? 1 : 0), w = e.some((m) => m.screenElement) || !!(t && t.screenElement);
  return (c || w || n === "auto" && i >= _ ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ s(
    B,
    {
      participants: e,
      localParticipant: t,
      spotlightContent: c,
      spotlightContentLabel: f,
      activeSpeakerId: d,
      speakerHysteresisMs: a,
      onParticipantClick: o,
      fillParent: u,
      filmstripTileWidth: b,
      className: h,
      style: r
    }
  ) : /* @__PURE__ */ s(
    H,
    {
      participants: e,
      localParticipant: t,
      activeSpeakerId: d,
      onParticipantClick: o,
      fillParent: u,
      pipWidth: v,
      className: h,
      style: r
    }
  );
}
function $(e, t) {
  const [n, d] = S(0);
  return N(() => {
    if (!e) return;
    const a = (r, i) => {
      console.info("[useTrackStateBump] remote track", r, {
        participant: t,
        kind: i.kind,
        enabled: i.enabled,
        muted: i.muted,
        readyState: i.readyState,
        id: i.id
      }), d((w) => w + 1);
    }, c = (r) => a("mute", r.target), f = (r) => a("unmute", r.target), o = (r) => a("ended", r.target), u = /* @__PURE__ */ new WeakSet(), v = (r) => {
      u.has(r) || (u.add(r), r.addEventListener("mute", c), r.addEventListener("unmute", f), r.addEventListener("ended", o));
    };
    for (const r of e.getVideoTracks()) v(r);
    const b = (r) => {
      const i = r.track;
      i && i.kind === "video" && v(i), d((w) => w + 1);
    }, h = () => d((r) => r + 1);
    return e.addEventListener("addtrack", b), e.addEventListener("removetrack", h), () => {
      for (const r of e.getVideoTracks())
        r.removeEventListener("mute", c), r.removeEventListener("unmute", f), r.removeEventListener("ended", o);
      e.removeEventListener("addtrack", b), e.removeEventListener("removetrack", h);
    };
  }, [e, t]), n;
}
function R(e) {
  if (!e) return !1;
  const t = e.getVideoTracks();
  return t.length === 0 ? !1 : t.some((n) => n.readyState === "live" && n.enabled && !n.muted);
}
function W({
  stream: e,
  muted: t = !1,
  videoRef: n,
  className: d = "h-full w-full object-cover",
  onPlayStateChange: a
}) {
  const c = j(null), f = j(a);
  return f.current = a, N(() => {
    const o = c.current;
    if (!o) return;
    o.srcObject !== e && (o.srcObject = e), n && (n.current = o);
    const u = (m) => {
      typeof e?.getTracks == "function" && console.info(`[StreamVideo] ${m}`, {
        streamId: e.id,
        tracks: e.getTracks().map((y) => ({
          kind: y.kind,
          id: y.id,
          ready: y.readyState,
          muted: y.muted,
          enabled: y.enabled
        }))
      });
    };
    u("bind");
    const v = (m) => {
      f.current?.(m);
    }, b = () => v("playing"), h = () => v("ended"), r = () => {
      o.ended && v("ended");
    }, i = () => {
      const m = o.play();
      m && typeof m.catch == "function" && m.catch((y) => {
        y?.name === "NotAllowedError" && v("paused-by-autoplay");
      });
    }, w = (m) => {
      u(`stream ${m.type}`), o.srcObject = null, o.srcObject = e, i();
    };
    o.addEventListener("play", b), o.addEventListener("ended", h), o.addEventListener("pause", r);
    const l = typeof e?.addEventListener == "function";
    return l && (e.addEventListener("addtrack", w), e.addEventListener("removetrack", w)), i(), () => {
      o.removeEventListener("play", b), o.removeEventListener("ended", h), o.removeEventListener("pause", r), l && (e.removeEventListener("addtrack", w), e.removeEventListener("removetrack", w)), n && n.current === o && (n.current = null);
    };
  }, [e, n]), /* @__PURE__ */ s(
    "video",
    {
      ref: c,
      autoPlay: !0,
      playsInline: !0,
      muted: t,
      className: d
    }
  );
}
function z({ stream: e }) {
  const t = j(null);
  return N(() => {
    const n = t.current;
    if (!n) return;
    if (!e) {
      n.srcObject && (n.srcObject = null);
      return;
    }
    n.srcObject !== e && (n.srcObject = e);
    const d = n.play();
    d && typeof d.catch == "function" && d.catch(() => {
    });
  }, [e]), /* @__PURE__ */ s(
    "audio",
    {
      ref: t,
      autoPlay: !0,
      playsInline: !0,
      className: "hidden",
      "data-testid": "remote-tile-hidden-audio"
    }
  );
}
function F({
  stream: e,
  displayName: t,
  cameraOn: n,
  avatarSize: d = 96
}) {
  $(e, t);
  const a = R(e);
  return !n || !a || !e ? /* @__PURE__ */ k(
    "div",
    {
      className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
      "data-testid": "remote-tile-avatar-branch",
      children: [
        /* @__PURE__ */ s(U, { name: t, size: d }),
        e && /* @__PURE__ */ s(z, { stream: e })
      ]
    }
  ) : /* @__PURE__ */ s(W, { stream: e });
}
function J({ show: e, label: t = "Reconnecting…" }) {
  return e ? /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "hangout-reconnecting-banner",
      className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
      role: "status",
      "aria-live": "polite",
      children: t
    }
  ) : null;
}
export {
  H,
  L as P,
  J as R,
  W as S,
  q as a,
  B as b,
  F as c,
  $ as d,
  V as g,
  R as s,
  I as u
};
