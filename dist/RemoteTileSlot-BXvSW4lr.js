import { jsxs as E, jsx as s } from "react/jsx-runtime";
import { useMemo as N, useState as j, useEffect as p, useRef as T } from "react";
import { c as k } from "./cn-B6yFEsav.js";
import { A as M } from "./Avatar-BvKIaNVE.js";
function L({
  id: e,
  displayName: t,
  avatarUrl: n,
  isSpeaking: d = !1,
  isMuted: l = !1,
  isLocal: c = !1,
  isSpotlight: h = !1,
  videoElement: o,
  onClick: f,
  fillParent: g = !1,
  className: m,
  style: v
}) {
  const r = c ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ E(
    "div",
    {
      className: k(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        // fillParent: defer sizing to the parent grid cell. Default:
        // enforce 16:9 so the tile renders correctly even in a parent
        // with no explicit height (the mini-widget case).
        g ? "w-full h-full" : "aspect-video",
        d ? "border-[#22c55e]" : "border-transparent",
        f && "cursor-pointer hover:border-white/30",
        m
      ),
      style: v,
      onClick: f,
      role: f ? "button" : void 0,
      tabIndex: f ? 0 : void 0,
      onKeyDown: f ? (i) => {
        (i.key === "Enter" || i.key === " ") && f();
      } : void 0,
      "data-testid": r,
      "data-peer-id": e,
      "data-peer-name": t,
      "data-is-local": c ? "true" : "false",
      "data-is-spotlight": h ? "true" : "false",
      "data-is-muted": l ? "true" : "false",
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
            style: { background: A(t) },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: k(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  h ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: n ? /* @__PURE__ */ s("img", { src: n, alt: "", className: k("w-full h-full rounded-full object-cover") }) : U(t)
              }
            )
          }
        ),
        /* @__PURE__ */ E("div", { className: k("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          c && /* @__PURE__ */ s("span", { className: k("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !c && /* @__PURE__ */ s("span", { className: "truncate font-medium", children: t }),
          l && /* @__PURE__ */ s("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ s("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        l && /* @__PURE__ */ s(
          "div",
          {
            className: k(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-red-500/90 text-white shadow-md",
              h ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ E("svg", { width: h ? 16 : 12, height: h ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ s("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ s("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ s("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ s("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ s("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        d && /* @__PURE__ */ s("div", { className: k("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function U(e) {
  const t = e.trim();
  if (!t) return "?";
  const n = t.split(/\s+/);
  return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function A(e) {
  let t = 0;
  for (let d = 0; d < e.length; d++)
    t = e.charCodeAt(d) + ((t << 5) - t);
  return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
function O({
  participants: e,
  localParticipant: t = null,
  activeSpeakerId: n = null,
  onParticipantClick: d,
  fillParent: l = !1,
  pipWidth: c = 96,
  className: h,
  style: o
}) {
  const f = e.length, g = !!t && f === 0, m = !!t && f >= 2, v = !!t && f === 1, r = N(() => {
    if (g && t) return [{ ...t, isLocal: !0 }];
    const a = [...e];
    return m && t && a.push({ ...t, isLocal: !0 }), a;
  }, [e, g, m, t]), i = H(r.length), u = Math.max(1, Math.ceil(r.length / i));
  return /* @__PURE__ */ E(
    "div",
    {
      className: k(
        "relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden",
        l && "h-full w-full",
        h
      ),
      style: {
        gridTemplateColumns: `repeat(${i}, 1fr)`,
        ...l ? { gridTemplateRows: `repeat(${u}, 1fr)` } : {},
        ...o
      },
      children: [
        r.map((a) => /* @__PURE__ */ s(
          L,
          {
            id: a.id,
            displayName: a.displayName,
            avatarUrl: a.avatarUrl,
            isSpeaking: a.id === n,
            isMuted: a.isMuted,
            isLocal: a.isLocal,
            videoElement: a.videoElement,
            fillParent: l,
            onClick: d ? () => d(a.id) : void 0
          },
          a.id
        )),
        r.length === 0 && /* @__PURE__ */ s("div", { className: k(
          "flex items-center justify-center text-white/40 text-sm",
          l ? "h-full w-full" : "aspect-video"
        ), children: "Waiting for others to join…" }),
        v && t && /* @__PURE__ */ s(
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
function H(e) {
  return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
function V({
  participants: e,
  localParticipant: t = null,
  spotlightContent: n,
  activeSpeakerId: d = null,
  speakerHysteresisMs: l = 750,
  onParticipantClick: c,
  fillParent: h = !1,
  filmstripTileWidth: o = 128,
  className: f,
  style: g
}) {
  const m = I(d, l), v = N(() => {
    const b = e.find((x) => x.screenElement);
    return b || (t && t.screenElement ? { ...t, isLocal: !0 } : null);
  }, [e, t]), r = N(() => {
    const b = n || v ? null : m, x = e.filter((S) => S.id !== b);
    return t && x.push({ ...t, isLocal: !0 }), x;
  }, [e, m, t, n, v]), u = (m ? e.find((b) => b.id === m) ?? null : null) ?? e[0] ?? t ?? null;
  let a, y, w = null;
  return n ? (a = "screen", y = u?.displayName ?? "", w = n) : v ? (a = "screen", y = v.displayName, w = v.screenElement) : u ? (a = "camera", y = u.displayName, w = /* @__PURE__ */ s(
    L,
    {
      id: u.id,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      isMuted: u.isMuted,
      isLocal: u.isLocal,
      isSpotlight: !0,
      fillParent: !0,
      videoElement: u.videoElement,
      className: "w-full h-full"
    }
  )) : (a = "camera", y = ""), /* @__PURE__ */ E(
    "div",
    {
      className: k(
        "flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden",
        h && "h-full w-full",
        f
      ),
      style: g,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: k(
              "bg-black relative",
              // fillParent: spotlight stretches with flexbox; otherwise it
              // enforces 16:9 against width (the mini-widget case).
              h ? "flex-1 min-h-0" : "flex-1 aspect-video"
            ),
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": a,
            "data-spotlight-user": y,
            children: w
          }
        ),
        r.length > 0 && /* @__PURE__ */ s("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0", children: r.map((b) => /* @__PURE__ */ s(
          "div",
          {
            className: "shrink-0",
            style: { width: o },
            children: /* @__PURE__ */ s(
              L,
              {
                id: b.id,
                displayName: b.displayName,
                avatarUrl: b.avatarUrl,
                isMuted: b.isMuted,
                isLocal: b.isLocal,
                videoElement: b.videoElement,
                onClick: c ? () => c(b.id) : void 0
              }
            )
          },
          b.id
        )) })
      ]
    }
  );
}
function I(e, t) {
  const [n, d] = j(e ?? null);
  return p(() => {
    const l = e ?? null;
    if (t <= 0) {
      d(l);
      return;
    }
    if (l === n) return;
    const c = setTimeout(() => d(l), t);
    return () => clearTimeout(c);
  }, [e, t, n]), n;
}
const B = 10;
function Y({
  participants: e,
  localParticipant: t = null,
  mode: n = "auto",
  activeSpeakerId: d = null,
  speakerHysteresisMs: l = 750,
  spotlightContent: c,
  onParticipantClick: h,
  fillParent: o = !1,
  pipWidth: f,
  filmstripTileWidth: g,
  className: m,
  style: v
}) {
  const r = e.length + (t ? 1 : 0), i = e.some((a) => a.screenElement) || !!(t && t.screenElement);
  return (c || i || n === "auto" && r >= B ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ s(
    V,
    {
      participants: e,
      localParticipant: t,
      spotlightContent: c,
      activeSpeakerId: d,
      speakerHysteresisMs: l,
      onParticipantClick: h,
      fillParent: o,
      filmstripTileWidth: g,
      className: m,
      style: v
    }
  ) : /* @__PURE__ */ s(
    O,
    {
      participants: e,
      localParticipant: t,
      activeSpeakerId: d,
      onParticipantClick: h,
      fillParent: o,
      pipWidth: f,
      className: m,
      style: v
    }
  );
}
function _(e, t) {
  const [n, d] = j(0);
  return p(() => {
    if (!e) return;
    const l = (r, i) => {
      console.info("[useTrackStateBump] remote track", r, {
        participant: t,
        kind: i.kind,
        enabled: i.enabled,
        muted: i.muted,
        readyState: i.readyState,
        id: i.id
      }), d((u) => u + 1);
    }, c = (r) => l("mute", r.target), h = (r) => l("unmute", r.target), o = (r) => l("ended", r.target), f = /* @__PURE__ */ new WeakSet(), g = (r) => {
      f.has(r) || (f.add(r), r.addEventListener("mute", c), r.addEventListener("unmute", h), r.addEventListener("ended", o));
    };
    for (const r of e.getVideoTracks()) g(r);
    const m = (r) => {
      const i = r.track;
      i && i.kind === "video" && g(i), d((u) => u + 1);
    }, v = () => d((r) => r + 1);
    return e.addEventListener("addtrack", m), e.addEventListener("removetrack", v), () => {
      for (const r of e.getVideoTracks())
        r.removeEventListener("mute", c), r.removeEventListener("unmute", h), r.removeEventListener("ended", o);
      e.removeEventListener("addtrack", m), e.removeEventListener("removetrack", v);
    };
  }, [e, t]), n;
}
function $(e) {
  if (!e) return !1;
  const t = e.getVideoTracks();
  return t.length === 0 ? !1 : t.some((n) => n.readyState === "live" && n.enabled && !n.muted);
}
function W({
  stream: e,
  muted: t = !1,
  videoRef: n,
  className: d = "h-full w-full object-cover",
  onPlayStateChange: l
}) {
  const c = T(null), h = T(l);
  return h.current = l, p(() => {
    const o = c.current;
    if (!o) return;
    o.srcObject !== e && (o.srcObject = e), n && (n.current = o);
    const f = (y) => {
      typeof e?.getTracks == "function" && console.info(`[StreamVideo] ${y}`, {
        streamId: e.id,
        tracks: e.getTracks().map((w) => ({
          kind: w.kind,
          id: w.id,
          ready: w.readyState,
          muted: w.muted,
          enabled: w.enabled
        }))
      });
    };
    f("bind");
    const g = (y) => {
      h.current?.(y);
    }, m = () => g("playing"), v = () => g("ended"), r = () => {
      o.ended && g("ended");
    }, i = () => {
      const y = o.play();
      y && typeof y.catch == "function" && y.catch((w) => {
        w?.name === "NotAllowedError" && g("paused-by-autoplay");
      });
    }, u = (y) => {
      f(`stream ${y.type}`), o.srcObject = null, o.srcObject = e, i();
    };
    o.addEventListener("play", m), o.addEventListener("ended", v), o.addEventListener("pause", r);
    const a = typeof e?.addEventListener == "function";
    return a && (e.addEventListener("addtrack", u), e.addEventListener("removetrack", u)), i(), () => {
      o.removeEventListener("play", m), o.removeEventListener("ended", v), o.removeEventListener("pause", r), a && (e.removeEventListener("addtrack", u), e.removeEventListener("removetrack", u)), n && n.current === o && (n.current = null);
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
  const t = T(null);
  return p(() => {
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
      style: { display: "none" },
      "data-testid": "remote-tile-hidden-audio"
    }
  );
}
function q({
  stream: e,
  displayName: t,
  cameraOn: n,
  avatarSize: d = 96
}) {
  _(e, t);
  const l = $(e);
  return !n || !l || !e ? /* @__PURE__ */ E(
    "div",
    {
      className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
      "data-testid": "remote-tile-avatar-branch",
      children: [
        /* @__PURE__ */ s(M, { name: t, size: d }),
        e && /* @__PURE__ */ s(z, { stream: e })
      ]
    }
  ) : /* @__PURE__ */ s(W, { stream: e });
}
export {
  O as H,
  L as P,
  q as R,
  W as S,
  Y as a,
  V as b,
  _ as c,
  H as g,
  $ as s,
  I as u
};
