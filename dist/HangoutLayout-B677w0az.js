import { jsxs as w, jsx as s } from "react/jsx-runtime";
import { useMemo as L, useState as M, useEffect as k } from "react";
import { c } from "./cn-B6yFEsav.js";
function y({
  id: t,
  displayName: e,
  avatarUrl: l,
  isSpeaking: d = !1,
  isMuted: u = !1,
  isLocal: a = !1,
  isSpotlight: n = !1,
  videoElement: f,
  onClick: o,
  className: h,
  style: m
}) {
  const v = a ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ w(
    "div",
    {
      className: c(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        "aspect-video",
        d ? "border-[#22c55e]" : "border-transparent",
        o && "cursor-pointer hover:border-white/30",
        h
      ),
      style: m,
      onClick: o,
      role: o ? "button" : void 0,
      tabIndex: o ? 0 : void 0,
      onKeyDown: o ? (r) => {
        (r.key === "Enter" || r.key === " ") && o();
      } : void 0,
      "data-testid": v,
      "data-peer-id": t,
      "data-peer-name": e,
      "data-is-local": a ? "true" : "false",
      "data-is-spotlight": n ? "true" : "false",
      "data-is-muted": u ? "true" : "false",
      "data-track-kind": f ? "camera" : "avatar",
      children: [
        f ?? // Avatar fallback. Fills the tile with the deterministic name-hashed
        // color so even when the consumer passes a null/undefined videoElement
        // (e.g. peer toggled camera off) the participant is unambiguously
        // present — never an empty black square. The colored backdrop spans
        // the whole tile; the initials chip sits centered on top.
        /* @__PURE__ */ s(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center",
            style: { background: U(e) },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: c(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  n ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: l ? /* @__PURE__ */ s("img", { src: l, alt: "", className: c("w-full h-full rounded-full object-cover") }) : T(e)
              }
            )
          }
        ),
        /* @__PURE__ */ w("div", { className: c("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          a && /* @__PURE__ */ s("span", { className: c("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !a && /* @__PURE__ */ s("span", { className: "truncate font-medium", children: e }),
          u && /* @__PURE__ */ s("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ s("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        u && /* @__PURE__ */ s(
          "div",
          {
            className: c(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-red-500/90 text-white shadow-md",
              n ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ w("svg", { width: n ? 16 : 12, height: n ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ s("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ s("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ s("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ s("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ s("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        d && /* @__PURE__ */ s("div", { className: c("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function T(t) {
  const e = t.trim();
  if (!e) return "?";
  const l = e.split(/\s+/);
  return l.length === 1 ? l[0].charAt(0).toUpperCase() : (l[0].charAt(0) + l[l.length - 1].charAt(0)).toUpperCase();
}
function U(t) {
  let e = 0;
  for (let d = 0; d < t.length; d++)
    e = t.charCodeAt(d) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function j({
  participants: t,
  localParticipant: e = null,
  activeSpeakerId: l = null,
  onParticipantClick: d,
  className: u,
  style: a
}) {
  const n = t.length, f = !!e && n === 0, o = !!e && n >= 2, h = !!e && n === 1, m = L(() => {
    if (f && e) return [{ ...e, isLocal: !0 }];
    const r = [...t];
    return o && e && r.push({ ...e, isLocal: !0 }), r;
  }, [t, f, o, e]), v = S(m.length);
  return /* @__PURE__ */ w(
    "div",
    {
      className: c("relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", u),
      style: { gridTemplateColumns: `repeat(${v}, 1fr)`, ...a },
      children: [
        m.map((r) => /* @__PURE__ */ s(
          y,
          {
            id: r.id,
            displayName: r.displayName,
            avatarUrl: r.avatarUrl,
            isSpeaking: r.id === l,
            isMuted: r.isMuted,
            isLocal: r.isLocal,
            videoElement: r.videoElement,
            onClick: d ? () => d(r.id) : void 0
          },
          r.id
        )),
        m.length === 0 && /* @__PURE__ */ s("div", { className: "aspect-video flex items-center justify-center text-white/40 text-sm", children: "Waiting for others to join…" }),
        h && e && /* @__PURE__ */ s("div", { className: "absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10", children: /* @__PURE__ */ s(
          y,
          {
            id: e.id,
            displayName: e.displayName,
            avatarUrl: e.avatarUrl,
            isMuted: e.isMuted,
            isLocal: !0,
            videoElement: e.videoElement
          }
        ) })
      ]
    }
  );
}
function S(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function p({
  participants: t,
  localParticipant: e = null,
  spotlightContent: l,
  activeSpeakerId: d = null,
  speakerHysteresisMs: u = 750,
  onParticipantClick: a,
  className: n,
  style: f
}) {
  const o = H(d, u), h = L(() => {
    const i = t.find((N) => N.screenElement);
    return i || (e && e.screenElement ? { ...e, isLocal: !0 } : null);
  }, [t, e]), m = L(() => {
    const i = l || h ? null : o, N = t.filter((E) => E.id !== i);
    return e && N.push({ ...e, isLocal: !0 }), N;
  }, [t, o, e, l, h]), r = (o ? t.find((i) => i.id === o) ?? null : null) ?? t[0] ?? e ?? null;
  let g, b, x = null;
  return l ? (g = "screen", b = r?.displayName ?? "", x = l) : h ? (g = "screen", b = h.displayName, x = h.screenElement) : r ? (g = "camera", b = r.displayName, x = /* @__PURE__ */ s(
    y,
    {
      id: r.id,
      displayName: r.displayName,
      avatarUrl: r.avatarUrl,
      isMuted: r.isMuted,
      isLocal: r.isLocal,
      isSpotlight: !0,
      videoElement: r.videoElement,
      className: "w-full h-full"
    }
  )) : (g = "camera", b = ""), /* @__PURE__ */ w(
    "div",
    {
      className: c("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", n),
      style: f,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: "flex-1 bg-black aspect-video relative",
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": g,
            "data-spotlight-user": b,
            children: x
          }
        ),
        m.length > 0 && /* @__PURE__ */ s("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: m.map((i) => /* @__PURE__ */ s("div", { className: "w-32 shrink-0", children: /* @__PURE__ */ s(
          y,
          {
            id: i.id,
            displayName: i.displayName,
            avatarUrl: i.avatarUrl,
            isMuted: i.isMuted,
            isLocal: i.isLocal,
            videoElement: i.videoElement,
            onClick: a ? () => a(i.id) : void 0
          }
        ) }, i.id)) })
      ]
    }
  );
}
function H(t, e) {
  const [l, d] = M(t ?? null);
  return k(() => {
    const u = t ?? null;
    if (e <= 0) {
      d(u);
      return;
    }
    if (u === l) return;
    const a = setTimeout(() => d(u), e);
    return () => clearTimeout(a);
  }, [t, e, l]), l;
}
const A = 10;
function W({
  participants: t,
  localParticipant: e = null,
  mode: l = "auto",
  activeSpeakerId: d = null,
  speakerHysteresisMs: u = 750,
  spotlightContent: a,
  onParticipantClick: n,
  className: f,
  style: o
}) {
  const h = t.length + (e ? 1 : 0), m = t.some((r) => r.screenElement) || !!(e && e.screenElement);
  return (a || m || l === "auto" && h >= A ? "spotlight" : l) === "spotlight" ? /* @__PURE__ */ s(
    p,
    {
      participants: t,
      localParticipant: e,
      spotlightContent: a,
      activeSpeakerId: d,
      speakerHysteresisMs: u,
      onParticipantClick: n,
      className: f,
      style: o
    }
  ) : /* @__PURE__ */ s(
    j,
    {
      participants: t,
      localParticipant: e,
      activeSpeakerId: d,
      onParticipantClick: n,
      className: f,
      style: o
    }
  );
}
export {
  j as H,
  y as P,
  W as a,
  p as b,
  S as g,
  H as u
};
