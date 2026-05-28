import { jsxs as g, jsx as r } from "react/jsx-runtime";
import { useMemo as L, useState as j, useEffect as k } from "react";
import { c as h } from "./cn-B6yFEsav.js";
function b({
  id: t,
  displayName: e,
  avatarUrl: s,
  isSpeaking: d = !1,
  isMuted: a = !1,
  isLocal: u = !1,
  isSpotlight: n = !1,
  videoElement: f,
  onClick: o,
  className: l,
  style: c
}) {
  const v = u ? "local-tile" : "remote-tile";
  return /* @__PURE__ */ g(
    "div",
    {
      className: h(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        "aspect-video",
        d ? "border-[#22c55e]" : "border-transparent",
        o && "cursor-pointer hover:border-white/30",
        l
      ),
      style: c,
      onClick: o,
      role: o ? "button" : void 0,
      tabIndex: o ? 0 : void 0,
      onKeyDown: o ? (m) => {
        (m.key === "Enter" || m.key === " ") && o();
      } : void 0,
      "data-testid": v,
      "data-peer-id": t,
      "data-peer-name": e,
      "data-is-local": u ? "true" : "false",
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
            style: { background: E(e) },
            children: /* @__PURE__ */ r(
              "div",
              {
                className: h(
                  "rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner",
                  n ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: s ? /* @__PURE__ */ r("img", { src: s, alt: "", className: h("w-full h-full rounded-full object-cover") }) : U(e)
              }
            )
          }
        ),
        /* @__PURE__ */ g("div", { className: h("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"), children: [
          u && /* @__PURE__ */ r("span", { className: h("text-[#60a5fa] truncate font-medium"), children: "You" }),
          !u && /* @__PURE__ */ r("span", { className: "truncate font-medium", children: e }),
          a && /* @__PURE__ */ r("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        a && /* @__PURE__ */ r(
          "div",
          {
            className: h(
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
        d && /* @__PURE__ */ r("div", { className: h("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function U(t) {
  const e = t.trim();
  if (!e) return "?";
  const s = e.split(/\s+/);
  return s.length === 1 ? s[0].charAt(0).toUpperCase() : (s[0].charAt(0) + s[s.length - 1].charAt(0)).toUpperCase();
}
function E(t) {
  let e = 0;
  for (let d = 0; d < t.length; d++)
    e = t.charCodeAt(d) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function $({
  participants: t,
  localParticipant: e = null,
  mode: s = "auto",
  activeSpeakerId: d = null,
  speakerHysteresisMs: a = 750,
  spotlightContent: u,
  onParticipantClick: n,
  className: f,
  style: o
}) {
  const c = t.length + (e ? 1 : 0), v = u || s === "auto" && c >= 10 ? "spotlight" : s, m = W(d, a), w = t.length, N = !!e && w === 0, y = !!e && w >= 2, M = !!e && w === 1, x = L(() => {
    if (N && e) return [{ ...e, isLocal: !0 }];
    const i = [...t];
    return y && e && i.push({ ...e, isLocal: !0 }), i;
  }, [t, N, y, e]);
  if (v === "spotlight")
    return /* @__PURE__ */ r(
      T,
      {
        participants: t,
        localParticipant: e,
        spotlightContent: u,
        spotlightParticipantId: m,
        onParticipantClick: n,
        className: f,
        style: o
      }
    );
  const p = A(x.length);
  return /* @__PURE__ */ g(
    "div",
    {
      className: h("relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", f),
      style: { gridTemplateColumns: `repeat(${p}, 1fr)`, ...o },
      children: [
        x.map((i) => /* @__PURE__ */ r(
          b,
          {
            id: i.id,
            displayName: i.displayName,
            avatarUrl: i.avatarUrl,
            isSpeaking: i.id === d,
            isMuted: i.isMuted,
            isLocal: i.isLocal,
            videoElement: i.videoElement,
            onClick: n ? () => n(i.id) : void 0
          },
          i.id
        )),
        x.length === 0 && /* @__PURE__ */ r("div", { className: "aspect-video flex items-center justify-center text-white/40 text-sm", children: "Waiting for others to join…" }),
        M && e && /* @__PURE__ */ r("div", { className: "absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10", children: /* @__PURE__ */ r(
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
function T({
  participants: t,
  localParticipant: e,
  spotlightContent: s,
  spotlightParticipantId: d,
  onParticipantClick: a,
  className: u,
  style: n
}) {
  const f = L(() => {
    const o = t.filter((l) => l.id !== d);
    return e && o.push({ ...e, isLocal: !0 }), o;
  }, [t, d, e]);
  return /* @__PURE__ */ g("div", { className: h("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", u), style: n, children: [
    (() => {
      const l = (d ? t.find((m) => m.id === d) ?? null : null) ?? t[0] ?? e, c = s ? "screen" : "camera", v = l?.displayName ?? "";
      return /* @__PURE__ */ r(
        "div",
        {
          className: "flex-1 bg-black aspect-video relative",
          "data-testid": "hangout-spotlight",
          "data-spotlight-type": c,
          "data-spotlight-user": v,
          children: s ?? (l ? /* @__PURE__ */ r(
            b,
            {
              id: l.id,
              displayName: l.displayName,
              avatarUrl: l.avatarUrl,
              isMuted: l.isMuted,
              isLocal: l.isLocal,
              isSpotlight: !0,
              videoElement: l.videoElement,
              className: "w-full h-full"
            }
          ) : null)
        }
      );
    })(),
    f.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: f.map((o) => /* @__PURE__ */ r("div", { className: "w-32 shrink-0", children: /* @__PURE__ */ r(
      b,
      {
        id: o.id,
        displayName: o.displayName,
        avatarUrl: o.avatarUrl,
        isMuted: o.isMuted,
        isLocal: o.isLocal,
        videoElement: o.videoElement,
        onClick: a ? () => a(o.id) : void 0
      }
    ) }, o.id)) })
  ] });
}
function A(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function W(t, e) {
  const [s, d] = j(t);
  return k(() => {
    if (e <= 0) {
      d(t);
      return;
    }
    if (t === s) return;
    const a = setTimeout(() => d(t), e);
    return () => clearTimeout(a);
  }, [t, e, s]), s;
}
export {
  $ as H,
  b as P
};
