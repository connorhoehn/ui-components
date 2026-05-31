import { jsxs as g, jsx as r } from "react/jsx-runtime";
import { useMemo as w, useState as N, useEffect as y } from "react";
import { c } from "./cn-B6yFEsav.js";
function b({
  id: t,
  displayName: e,
  avatarUrl: o,
  isSpeaking: s = !1,
  isMuted: a = !1,
  isLocal: i = !1,
  isSpotlight: d = !1,
  videoElement: f,
  onClick: n,
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
        s ? "border-[#22c55e]" : "border-transparent",
        n && "cursor-pointer hover:border-white/30",
        m
      ),
      style: v,
      onClick: n,
      role: n ? "button" : void 0,
      tabIndex: n ? 0 : void 0,
      onKeyDown: n ? (l) => {
        (l.key === "Enter" || l.key === " ") && n();
      } : void 0,
      "data-testid": h,
      "data-peer-id": t,
      "data-peer-name": e,
      "data-is-local": i ? "true" : "false",
      "data-is-spotlight": d ? "true" : "false",
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
                  d ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"
                ),
                children: o ? /* @__PURE__ */ r("img", { src: o, alt: "", className: c("w-full h-full rounded-full object-cover") }) : L(e)
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
              d ? "w-7 h-7" : "w-5 h-5"
            ),
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ g("svg", { width: d ? 16 : 12, height: d ? 16 : 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ r("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ r("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ r("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
              /* @__PURE__ */ r("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
              /* @__PURE__ */ r("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
            ] })
          }
        ),
        s && /* @__PURE__ */ r("div", { className: c("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function L(t) {
  const e = t.trim();
  if (!e) return "?";
  const o = e.split(/\s+/);
  return o.length === 1 ? o[0].charAt(0).toUpperCase() : (o[0].charAt(0) + o[o.length - 1].charAt(0)).toUpperCase();
}
function M(t) {
  let e = 0;
  for (let s = 0; s < t.length; s++)
    e = t.charCodeAt(s) + ((e << 5) - e);
  return `hsl(${Math.abs(e) % 360}, 55%, 45%)`;
}
function k({
  participants: t,
  localParticipant: e = null,
  activeSpeakerId: o = null,
  onParticipantClick: s,
  className: a,
  style: i
}) {
  const d = t.length, f = !!e && d === 0, n = !!e && d >= 2, m = !!e && d === 1, v = w(() => {
    if (f && e) return [{ ...e, isLocal: !0 }];
    const l = [...t];
    return n && e && l.push({ ...e, isLocal: !0 }), l;
  }, [t, f, n, e]), h = U(v.length);
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
            isSpeaking: l.id === o,
            isMuted: l.isMuted,
            isLocal: l.isLocal,
            videoElement: l.videoElement,
            onClick: s ? () => s(l.id) : void 0
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
  spotlightContent: o,
  activeSpeakerId: s = null,
  speakerHysteresisMs: a = 750,
  onParticipantClick: i,
  className: d,
  style: f
}) {
  const n = E(s, a), m = w(() => {
    const u = t.filter((p) => p.id !== n);
    return e && u.push({ ...e, isLocal: !0 }), u;
  }, [t, n, e]), h = (n ? t.find((u) => u.id === n) ?? null : null) ?? t[0] ?? e ?? null, l = o ? "screen" : "camera", x = h?.displayName ?? "";
  return /* @__PURE__ */ g(
    "div",
    {
      className: c("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", d),
      style: f,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: "flex-1 bg-black aspect-video relative",
            "data-testid": "hangout-spotlight",
            "data-spotlight-type": l,
            "data-spotlight-user": x,
            children: o ?? (h && /* @__PURE__ */ r(
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
  const [o, s] = N(t ?? null);
  return y(() => {
    const a = t ?? null;
    if (e <= 0) {
      s(a);
      return;
    }
    if (a === o) return;
    const i = setTimeout(() => s(a), e);
    return () => clearTimeout(i);
  }, [t, e, o]), o;
}
const T = 10;
function R({
  participants: t,
  localParticipant: e = null,
  mode: o = "auto",
  activeSpeakerId: s = null,
  speakerHysteresisMs: a = 750,
  spotlightContent: i,
  onParticipantClick: d,
  className: f,
  style: n
}) {
  const m = t.length + (e ? 1 : 0);
  return (i || o === "auto" && m >= T ? "spotlight" : o) === "spotlight" ? /* @__PURE__ */ r(
    j,
    {
      participants: t,
      localParticipant: e,
      spotlightContent: i,
      activeSpeakerId: s,
      speakerHysteresisMs: a,
      onParticipantClick: d,
      className: f,
      style: n
    }
  ) : /* @__PURE__ */ r(
    k,
    {
      participants: t,
      localParticipant: e,
      activeSpeakerId: s,
      onParticipantClick: d,
      className: f,
      style: n
    }
  );
}
function B({ show: t, label: e = "Reconnecting…" }) {
  return t ? /* @__PURE__ */ r(
    "div",
    {
      "data-testid": "hangout-reconnecting-banner",
      className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-amber-500/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
      role: "status",
      "aria-live": "polite",
      children: e
    }
  ) : null;
}
export {
  k as H,
  b as P,
  B as R,
  R as a,
  j as b,
  U as g,
  E as u
};
