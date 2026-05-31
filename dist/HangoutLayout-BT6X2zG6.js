import { jsxs as g, jsx as r } from "react/jsx-runtime";
import { useMemo as w, useState as y, useEffect as p } from "react";
import { c } from "./cn-B6yFEsav.js";
function b({
  id: t,
  displayName: e,
  avatarUrl: s,
  isSpeaking: o = !1,
  isMuted: a = !1,
  isLocal: i = !1,
  isSpotlight: n = !1,
  videoElement: f,
  onClick: d,
  className: m,
  style: v
}) {
  const h = i ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ g(
    "div",
    {
      className: c(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        "aspect-video",
        o ? "border-[#22c55e]" : "border-transparent",
        d && "cursor-pointer hover:border-white/30",
        m
      ),
      style: v,
      onClick: d,
      role: d ? "button" : void 0,
      tabIndex: d ? 0 : void 0,
      onKeyDown: d ? (l) => {
        (l.key === "Enter" || l.key === " ") && d();
      } : void 0,
      "data-testid": h,
      "data-peer-id": t,
      "data-peer-name": e,
      "data-is-local": i ? "true" : "false",
      "data-is-spotlight": n ? "true" : "false",
      "data-is-muted": a ? "true" : "false",
      "data-track-kind": f ? "camera" : "avatar",
      children: [
        f ?? // Avatar fallback. Fills the tile with the deterministic name-hashed
        // color so even when the consumer passes a null/undefined videoElement
        // (e.g. peer toggled camera off) the participant is unambiguously
        // present — never an empty black square. The colored backdrop spans
        // the whole tile; the initials chip sits centered on top.
        /* @__PURE__ */ r(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center",
            style: { background: M(e) },
            children: /* @__PURE__ */ r(
              "div",
              {
                className: c(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  n ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: s ? /* @__PURE__ */ r("img", { src: s, alt: "", className: c("w-full h-full rounded-full object-cover") }) : L(e)
              }
            )
          }
        ),
        /* @__PURE__ */ g("div", { className: c("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          i && /* @__PURE__ */ r("span", { className: c("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !i && /* @__PURE__ */ r("span", { className: "truncate font-medium", children: e }),
          a && /* @__PURE__ */ r("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        a && /* @__PURE__ */ r(
          "div",
          {
            className: c(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-red-500/90 text-white shadow-md",
              n ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ g("svg", { width: n ? 16 : 12, height: n ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ r("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ r("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ r("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ r("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ r("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        o && /* @__PURE__ */ r("div", { className: c("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function L(t) {
  const e = t.trim();
  if (!e) return "?";
  const s = e.split(/\s+/);
  return s.length === 1 ? s[0].charAt(0).toUpperCase() : (s[0].charAt(0) + s[s.length - 1].charAt(0)).toUpperCase();
}
function M(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++)
    e = t.charCodeAt(o) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function k({
  participants: t,
  localParticipant: e = null,
  activeSpeakerId: s = null,
  onParticipantClick: o,
  className: a,
  style: i
}) {
  const n = t.length, f = !!e && n === 0, d = !!e && n >= 2, m = !!e && n === 1, v = w(() => {
    if (f && e) return [{ ...e, isLocal: !0 }];
    const l = [...t];
    return d && e && l.push({ ...e, isLocal: !0 }), l;
  }, [t, f, d, e]), h = U(v.length);
  return /* @__PURE__ */ g(
    "div",
    {
      className: c("relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", a),
      style: { gridTemplateColumns: `repeat(${h}, 1fr)`, ...i },
      children: [
        v.map((l) => /* @__PURE__ */ r(
          b,
          {
            id: l.id,
            displayName: l.displayName,
            avatarUrl: l.avatarUrl,
            isSpeaking: l.id === s,
            isMuted: l.isMuted,
            isLocal: l.isLocal,
            videoElement: l.videoElement,
            onClick: o ? () => o(l.id) : void 0
          },
          l.id
        )),
        v.length === 0 && /* @__PURE__ */ r("div", { className: "aspect-video flex items-center justify-center text-white/40 text-sm", children: "Waiting for others to join…" }),
        m && e && /* @__PURE__ */ r("div", { className: "absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10", children: /* @__PURE__ */ r(
          b,
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
function U(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function j({
  participants: t,
  localParticipant: e = null,
  spotlightContent: s,
  activeSpeakerId: o = null,
  speakerHysteresisMs: a = 750,
  onParticipantClick: i,
  className: n,
  style: f
}) {
  const d = E(o, a), m = w(() => {
    const u = t.filter((N) => N.id !== d);
    return e && u.push({ ...e, isLocal: !0 }), u;
  }, [t, d, e]), h = (d ? t.find((u) => u.id === d) ?? null : null) ?? t[0] ?? e ?? null, l = s ? "screen" : "camera", x = h?.displayName ?? "";
  return /* @__PURE__ */ g(
    "div",
    {
      className: c("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", n),
      style: f,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: "flex-1 bg-black aspect-video relative",
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": l,
            "data-spotlight-user": x,
            children: s ?? (h && /* @__PURE__ */ r(
              b,
              {
                id: h.id,
                displayName: h.displayName,
                avatarUrl: h.avatarUrl,
                isMuted: h.isMuted,
                isLocal: h.isLocal,
                isSpotlight: !0,
                videoElement: h.videoElement,
                className: "w-full h-full"
              }
            ))
          }
        ),
        m.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: m.map((u) => /* @__PURE__ */ r("div", { className: "w-32 shrink-0", children: /* @__PURE__ */ r(
          b,
          {
            id: u.id,
            displayName: u.displayName,
            avatarUrl: u.avatarUrl,
            isMuted: u.isMuted,
            isLocal: u.isLocal,
            videoElement: u.videoElement,
            onClick: i ? () => i(u.id) : void 0
          }
        ) }, u.id)) })
      ]
    }
  );
}
function E(t, e) {
  const [s, o] = y(t ?? null);
  return p(() => {
    const a = t ?? null;
    if (e <= 0) {
      o(a);
      return;
    }
    if (a === s) return;
    const i = setTimeout(() => o(a), e);
    return () => clearTimeout(i);
  }, [t, e, s]), s;
}
const T = 10;
function I({
  participants: t,
  localParticipant: e = null,
  mode: s = "auto",
  activeSpeakerId: o = null,
  speakerHysteresisMs: a = 750,
  spotlightContent: i,
  onParticipantClick: n,
  className: f,
  style: d
}) {
  const m = t.length + (e ? 1 : 0);
  return (i || s === "auto" && m >= T ? "spotlight" : s) === "spotlight" ? /* @__PURE__ */ r(
    j,
    {
      participants: t,
      localParticipant: e,
      spotlightContent: i,
      activeSpeakerId: o,
      speakerHysteresisMs: a,
      onParticipantClick: n,
      className: f,
      style: d
    }
  ) : /* @__PURE__ */ r(
    k,
    {
      participants: t,
      localParticipant: e,
      activeSpeakerId: o,
      onParticipantClick: n,
      className: f,
      style: d
    }
  );
}
export {
  k as H,
  b as P,
  I as a,
  j as b,
  U as g,
  E as u
};
