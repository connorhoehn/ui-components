import { jsxs as c, jsx as r } from "react/jsx-runtime";
import { useMemo as N, useState as E, useEffect as U } from "react";
import { c as h } from "./cn-B6yFEsav.js";
function v({
  displayName: t,
  avatarUrl: e,
  isSpeaking: o = !1,
  isMuted: s = !1,
  isLocal: a = !1,
  isSpotlight: u = !1,
  videoElement: f,
  onClick: l,
  className: d,
  style: n
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: h(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        "aspect-video",
        o ? "border-[#22c55e]" : "border-transparent",
        l && "cursor-pointer hover:border-white/30",
        d
      ),
      style: n,
      onClick: l,
      role: l ? "button" : void 0,
      tabIndex: l ? 0 : void 0,
      onKeyDown: l ? (m) => {
        (m.key === "Enter" || m.key === " ") && l();
      } : void 0,
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
            style: { background: T(t) },
            children: /* @__PURE__ */ r(
              "div",
              {
                className: h(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  u ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: e ? /* @__PURE__ */ r("img", { src: e, alt: "", className: h("w-full h-full rounded-full object-cover") }) : k(t)
              }
            )
          }
        ),
        /* @__PURE__ */ c("div", { className: h("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          a && /* @__PURE__ */ r("span", { className: h("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !a && /* @__PURE__ */ r("span", { className: "truncate font-medium", children: t }),
          s && /* @__PURE__ */ r("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        s && /* @__PURE__ */ r(
          "div",
          {
            className: h(
              "absolute top-1 left-1 flex items-center justify-center rounded-full bg-red-500/90 text-white shadow-md",
              u ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ c("svg", { width: u ? 16 : 12, height: u ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ r("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ r("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ r("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ r("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ r("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        o && /* @__PURE__ */ r("div", { className: h("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function k(t) {
  const e = t.trim();
  if (!e) return "?";
  const o = e.split(/\s+/);
  return o.length === 1 ? o[0].charAt(0).toUpperCase() : (o[0].charAt(0) + o[o.length - 1].charAt(0)).toUpperCase();
}
function T(t) {
  let e = 0;
  for (let s = 0; s < t.length; s++)
    e = t.charCodeAt(s) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function H({
  participants: t,
  localParticipant: e = null,
  mode: o = "auto",
  activeSpeakerId: s = null,
  speakerHysteresisMs: a = 750,
  spotlightContent: u,
  onParticipantClick: f,
  className: l,
  style: d
}) {
  const m = t.length + (e ? 1 : 0), y = u || o === "auto" && m >= 10 ? "spotlight" : o, L = W(s, a), b = t.length, w = !!e && b === 0, x = !!e && b >= 2, M = !!e && b === 1, g = N(() => {
    if (w && e) return [{ ...e, isLocal: !0 }];
    const i = [...t];
    return x && e && i.push({ ...e, isLocal: !0 }), i;
  }, [t, w, x, e]);
  if (y === "spotlight")
    return /* @__PURE__ */ r(
      A,
      {
        participants: t,
        localParticipant: e,
        spotlightContent: u,
        spotlightParticipantId: L,
        onParticipantClick: f,
        className: l,
        style: d
      }
    );
  const j = p(g.length);
  return /* @__PURE__ */ c(
    "div",
    {
      className: h("relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", l),
      style: { gridTemplateColumns: `repeat(${j}, 1fr)`, ...d },
      children: [
        g.map((i) => /* @__PURE__ */ r(
          v,
          {
            id: i.id,
            displayName: i.displayName,
            avatarUrl: i.avatarUrl,
            isSpeaking: i.id === s,
            isMuted: i.isMuted,
            isLocal: i.isLocal,
            videoElement: i.videoElement,
            onClick: f ? () => f(i.id) : void 0
          },
          i.id
        )),
        g.length === 0 && /* @__PURE__ */ r("div", { className: "aspect-video flex items-center justify-center text-white/40 text-sm", children: "Waiting for others to join…" }),
        M && e && /* @__PURE__ */ r("div", { className: "absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10", children: /* @__PURE__ */ r(
          v,
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
function A({
  participants: t,
  localParticipant: e,
  spotlightContent: o,
  spotlightParticipantId: s,
  onParticipantClick: a,
  className: u,
  style: f
}) {
  const l = N(() => {
    const d = t.filter((n) => n.id !== s);
    return e && d.push({ ...e, isLocal: !0 }), d;
  }, [t, s, e]);
  return /* @__PURE__ */ c("div", { className: h("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", u), style: f, children: [
    /* @__PURE__ */ r("div", { className: "flex-1 bg-black aspect-video relative", children: o ?? (() => {
      const n = (s ? t.find((m) => m.id === s) ?? null : null) ?? t[0] ?? e;
      return n ? /* @__PURE__ */ r(
        v,
        {
          id: n.id,
          displayName: n.displayName,
          avatarUrl: n.avatarUrl,
          isMuted: n.isMuted,
          isLocal: n.isLocal,
          isSpotlight: !0,
          videoElement: n.videoElement,
          className: "w-full h-full"
        }
      ) : null;
    })() }),
    l.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: l.map((d) => /* @__PURE__ */ r("div", { className: "w-32 shrink-0", children: /* @__PURE__ */ r(
      v,
      {
        id: d.id,
        displayName: d.displayName,
        avatarUrl: d.avatarUrl,
        isMuted: d.isMuted,
        isLocal: d.isLocal,
        videoElement: d.videoElement,
        onClick: a ? () => a(d.id) : void 0
      }
    ) }, d.id)) })
  ] });
}
function p(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function W(t, e) {
  const [o, s] = E(t);
  return U(() => {
    if (e <= 0) {
      s(t);
      return;
    }
    if (t === o) return;
    const a = setTimeout(() => s(t), e);
    return () => clearTimeout(a);
  }, [t, e, o]), o;
}
export {
  H,
  v as P
};
