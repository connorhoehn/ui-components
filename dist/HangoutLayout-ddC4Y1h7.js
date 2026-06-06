import { jsxs as N, jsx as r } from "react/jsx-runtime";
import { useMemo as E, useState as T, useEffect as U } from "react";
import { c as v } from "./cn-B6yFEsav.js";
function M({
  id: t,
  displayName: e,
  avatarUrl: s,
  isSpeaking: d = !1,
  isMuted: o = !1,
  isLocal: i = !1,
  isSpotlight: u = !1,
  videoElement: g,
  onClick: a,
  fillParent: w = !1,
  className: h,
  style: f
}) {
  const c = i ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ N(
    "div",
    {
      className: v(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        // fillParent: defer sizing to the parent grid cell. Default:
        // enforce 16:9 so the tile renders correctly even in a parent
        // with no explicit height (the mini-widget case).
        w ? "w-full h-full" : "aspect-video",
        d ? "border-[#22c55e]" : "border-transparent",
        a && "cursor-pointer hover:border-white/30",
        h
      ),
      style: f,
      onClick: a,
      role: a ? "button" : void 0,
      tabIndex: a ? 0 : void 0,
      onKeyDown: a ? (b) => {
        (b.key === "Enter" || b.key === " ") && a();
      } : void 0,
      "data-testid": c,
      "data-peer-id": t,
      "data-peer-name": e,
      "data-is-local": i ? "true" : "false",
      "data-is-spotlight": u ? "true" : "false",
      "data-is-muted": o ? "true" : "false",
      "data-track-kind": g ? "camera" : "avatar",
      children: [
        g ?? // Avatar fallback. Fills the tile with the deterministic name-hashed
        // color so even when the consumer passes a null/undefined videoElement
        // (e.g. peer toggled camera off) the participant is unambiguously
        // present — never an empty black square. The colored backdrop spans
        // the whole tile; the initials chip sits centered on top.
        /* @__PURE__ */ r(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center",
            style: { background: p(e) },
            children: /* @__PURE__ */ r(
              "div",
              {
                className: v(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  u ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: s ? /* @__PURE__ */ r("img", { src: s, alt: "", className: v("w-full h-full rounded-full object-cover") }) : j(e)
              }
            )
          }
        ),
        /* @__PURE__ */ N("div", { className: v("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          i && /* @__PURE__ */ r("span", { className: v("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !i && /* @__PURE__ */ r("span", { className: "truncate font-medium", children: e }),
          o && /* @__PURE__ */ r("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        o && /* @__PURE__ */ r(
          "div",
          {
            className: v(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-red-500/90 text-white shadow-md",
              u ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ N("svg", { width: u ? 16 : 12, height: u ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ r("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ r("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ r("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ r("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ r("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        d && /* @__PURE__ */ r("div", { className: v("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function j(t) {
  const e = t.trim();
  if (!e) return "?";
  const s = e.split(/\s+/);
  return s.length === 1 ? s[0].charAt(0).toUpperCase() : (s[0].charAt(0) + s[s.length - 1].charAt(0)).toUpperCase();
}
function p(t) {
  let e = 0;
  for (let d = 0; d < t.length; d++)
    e = t.charCodeAt(d) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function S({
  participants: t,
  localParticipant: e = null,
  activeSpeakerId: s = null,
  onParticipantClick: d,
  fillParent: o = !1,
  pipWidth: i = 96,
  className: u,
  style: g
}) {
  const a = t.length, w = !!e && a === 0, h = !!e && a >= 2, f = !!e && a === 1, c = E(() => {
    if (w && e) return [{ ...e, isLocal: !0 }];
    const l = [...t];
    return h && e && l.push({ ...e, isLocal: !0 }), l;
  }, [t, w, h, e]), b = H(c.length), m = Math.max(1, Math.ceil(c.length / b));
  return /* @__PURE__ */ N(
    "div",
    {
      className: v(
        "relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden",
        o && "h-full w-full",
        u
      ),
      style: {
        gridTemplateColumns: `repeat(${b}, 1fr)`,
        ...o ? { gridTemplateRows: `repeat(${m}, 1fr)` } : {},
        ...g
      },
      children: [
        c.map((l) => /* @__PURE__ */ r(
          M,
          {
            id: l.id,
            displayName: l.displayName,
            avatarUrl: l.avatarUrl,
            isSpeaking: l.id === s,
            isMuted: l.isMuted,
            isLocal: l.isLocal,
            videoElement: l.videoElement,
            fillParent: o,
            onClick: d ? () => d(l.id) : void 0
          },
          l.id
        )),
        c.length === 0 && /* @__PURE__ */ r("div", { className: v(
          "flex items-center justify-center text-white/40 text-sm",
          o ? "h-full w-full" : "aspect-video"
        ), children: "Waiting for others to join…" }),
        f && e && /* @__PURE__ */ r(
          "div",
          {
            className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
            style: { width: i },
            children: /* @__PURE__ */ r(
              M,
              {
                id: e.id,
                displayName: e.displayName,
                avatarUrl: e.avatarUrl,
                isMuted: e.isMuted,
                isLocal: !0,
                videoElement: e.videoElement
              }
            )
          }
        )
      ]
    }
  );
}
function H(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function A({
  participants: t,
  localParticipant: e = null,
  spotlightContent: s,
  activeSpeakerId: d = null,
  speakerHysteresisMs: o = 750,
  onParticipantClick: i,
  fillParent: u = !1,
  filmstripTileWidth: g = 128,
  className: a,
  style: w
}) {
  const h = _(d, o), f = E(() => {
    const n = t.find((L) => L.screenElement);
    return n || (e && e.screenElement ? { ...e, isLocal: !0 } : null);
  }, [t, e]), c = E(() => {
    const n = s || f ? null : h, L = t.filter((k) => k.id !== n);
    return e && L.push({ ...e, isLocal: !0 }), L;
  }, [t, h, e, s, f]), m = (h ? t.find((n) => n.id === h) ?? null : null) ?? t[0] ?? e ?? null;
  let l, x, y = null;
  return s ? (l = "screen", x = m?.displayName ?? "", y = s) : f ? (l = "screen", x = f.displayName, y = f.screenElement) : m ? (l = "camera", x = m.displayName, y = /* @__PURE__ */ r(
    M,
    {
      id: m.id,
      displayName: m.displayName,
      avatarUrl: m.avatarUrl,
      isMuted: m.isMuted,
      isLocal: m.isLocal,
      isSpotlight: !0,
      fillParent: !0,
      videoElement: m.videoElement,
      className: "w-full h-full"
    }
  )) : (l = "camera", x = ""), /* @__PURE__ */ N(
    "div",
    {
      className: v(
        "flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden",
        u && "h-full w-full",
        a
      ),
      style: w,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: v(
              "bg-black relative",
              // fillParent: spotlight stretches with flexbox; otherwise it
              // enforces 16:9 against width (the mini-widget case).
              u ? "flex-1 min-h-0" : "flex-1 aspect-video"
            ),
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": l,
            "data-spotlight-user": x,
            children: y
          }
        ),
        c.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0", children: c.map((n) => /* @__PURE__ */ r(
          "div",
          {
            className: "shrink-0",
            style: { width: g },
            children: /* @__PURE__ */ r(
              M,
              {
                id: n.id,
                displayName: n.displayName,
                avatarUrl: n.avatarUrl,
                isMuted: n.isMuted,
                isLocal: n.isLocal,
                videoElement: n.videoElement,
                onClick: i ? () => i(n.id) : void 0
              }
            )
          },
          n.id
        )) })
      ]
    }
  );
}
function _(t, e) {
  const [s, d] = T(t ?? null);
  return U(() => {
    const o = t ?? null;
    if (e <= 0) {
      d(o);
      return;
    }
    if (o === s) return;
    const i = setTimeout(() => d(o), e);
    return () => clearTimeout(i);
  }, [t, e, s]), s;
}
const I = 10;
function B({
  participants: t,
  localParticipant: e = null,
  mode: s = "auto",
  activeSpeakerId: d = null,
  speakerHysteresisMs: o = 750,
  spotlightContent: i,
  onParticipantClick: u,
  fillParent: g = !1,
  pipWidth: a,
  filmstripTileWidth: w,
  className: h,
  style: f
}) {
  const c = t.length + (e ? 1 : 0), b = t.some((l) => l.screenElement) || !!(e && e.screenElement);
  return (i || b || s === "auto" && c >= I ? "spotlight" : s) === "spotlight" ? /* @__PURE__ */ r(
    A,
    {
      participants: t,
      localParticipant: e,
      spotlightContent: i,
      activeSpeakerId: d,
      speakerHysteresisMs: o,
      onParticipantClick: u,
      fillParent: g,
      filmstripTileWidth: w,
      className: h,
      style: f
    }
  ) : /* @__PURE__ */ r(
    S,
    {
      participants: t,
      localParticipant: e,
      activeSpeakerId: d,
      onParticipantClick: u,
      fillParent: g,
      pipWidth: a,
      className: h,
      style: f
    }
  );
}
export {
  S as H,
  M as P,
  B as a,
  A as b,
  H as g,
  _ as u
};
