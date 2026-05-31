import { jsxs as a, jsx as t, Fragment as Z } from "react/jsx-runtime";
import { useRef as $, useState as M, useEffect as A, useMemo as ne, useCallback as _ } from "react";
import { c as p } from "./cn-B6yFEsav.js";
import { P as le } from "./HangoutLayout-BT6X2zG6.js";
import { A as se } from "./Avatar-BvKIaNVE.js";
const ce = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function qe({
  src: e,
  stream: n,
  autoPlay: r = !1,
  muted: o = !0,
  loop: i = !1,
  controls: c = !1,
  poster: l,
  phase: s,
  className: d,
  style: h,
  onPhaseChange: f,
  onTimeUpdate: g
}) {
  const u = $(null), [m, x] = M("idle"), N = s ?? m;
  A(() => {
    const v = u.current;
    if (!v) return;
    const k = [
      ["waiting", () => {
        x("buffering"), f?.("buffering");
      }],
      ["playing", () => {
        x("playing"), f?.("playing");
      }],
      ["error", () => {
        x("error"), f?.("error");
      }],
      ["loadstart", () => {
        x("connecting"), f?.("connecting");
      }],
      ["timeupdate", () => {
        g?.(v.currentTime, v.duration);
      }]
    ];
    return k.forEach(([P, E]) => v.addEventListener(P, E)), () => k.forEach(([P, E]) => v.removeEventListener(P, E));
  }, [f, g]), A(() => {
    const v = u.current;
    v && n !== void 0 && (v.srcObject = n);
  }, [n]);
  const y = N !== "playing", w = ce[N];
  return /* @__PURE__ */ a(
    "div",
    {
      className: p("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: h,
      children: [
        /* @__PURE__ */ t(
          "video",
          {
            ref: u,
            src: n ? void 0 : e,
            autoPlay: r,
            muted: o,
            loop: i,
            controls: c,
            poster: l,
            playsInline: !0,
            className: p("w-full h-full object-contain block")
          }
        ),
        y && w && /* @__PURE__ */ a("div", { className: p("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          N === "buffering" && /* @__PURE__ */ t(de, {}),
          /* @__PURE__ */ t("span", { className: p(N === "buffering" ? "ml-2" : ""), children: w })
        ] })
      ]
    }
  );
}
function de() {
  return /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: p("animate-spin"), children: [
    /* @__PURE__ */ t("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function ue(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function Ge({ metrics: e, style: n }) {
  if (!e)
    return /* @__PURE__ */ t("div", { className: p("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", ue(e.bitrateBps)],
    ["FPS", `${e.fps}`],
    ["Resolution", `${e.resolution.width}×${e.resolution.height}`],
    ["Packets Lost", `${e.packetsLost}`]
  ];
  return e.jitter !== void 0 && r.push(["Jitter", `${e.jitter.toFixed(1)} ms`]), /* @__PURE__ */ t("div", { className: p("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, i]) => /* @__PURE__ */ a("div", { className: p("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ t("span", { className: p("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ t("span", { className: p("font-mono"), children: i })
  ] }, o)) });
}
const he = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, fe = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, pe = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function me({ quality: e, style: n }) {
  const r = he[e], o = e === "good" ? 4 : e === "medium" ? 3 : e === "poor" ? 2 : 1;
  return /* @__PURE__ */ a("div", { className: p("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
    /* @__PURE__ */ t("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ t(
      "rect",
      {
        x: i * 4,
        y: 12 - (i + 1) * 3,
        width: "3",
        height: (i + 1) * 3,
        rx: "0.5",
        fill: i < o ? r : "rgba(255,255,255,0.2)"
      },
      i
    )) }),
    /* @__PURE__ */ t("span", { className: fe[e], children: pe[e] })
  ] });
}
function Je({ participants: e, style: n }) {
  const r = e.length, o = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ t(
    "div",
    {
      className: p("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...n },
      children: e.map((i) => /* @__PURE__ */ t(
        le,
        {
          id: i.id,
          displayName: i.displayName,
          avatarUrl: i.avatarUrl,
          isSpeaking: i.isSpeaking,
          isMuted: i.isMuted,
          isLocal: i.isLocal,
          videoElement: i.videoElement
        },
        i.id
      ))
    }
  );
}
function et({ reactions: e, style: n }) {
  const [r, o] = M([]);
  return A(() => {
    if (e.length === 0) return;
    const i = e[e.length - 1], c = {
      id: i.id + "-" + Date.now(),
      emoji: i.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), c]);
  }, [e]), A(() => {
    const i = setInterval(() => {
      o((c) => c.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(i);
  }, []), /* @__PURE__ */ t("div", { className: p("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((i) => /* @__PURE__ */ t(
    "span",
    {
      className: p("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${i.x}%` },
      children: i.emoji
    },
    i.id
  )) });
}
const ge = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function tt({ onReact: e, emojis: n = ge, style: r }) {
  return /* @__PURE__ */ t("div", { className: p("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((o) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: () => e(o),
      className: p("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (i) => i.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (i) => i.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (i) => i.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function xe(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function ve(e) {
  const n = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), o = Math.floor(e % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${r}:${String(o).padStart(2, "0")}`;
}
const be = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, we = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function nt({ phase: e, bitrateBps: n, viewerCount: r, duration: o, style: i }) {
  const c = e === "playing" ? "LIVE" : e.toUpperCase();
  return /* @__PURE__ */ a("div", { className: p("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: i, children: [
    /* @__PURE__ */ a("span", { className: p("flex items-center gap-1"), children: [
      /* @__PURE__ */ t("span", { className: p("w-[7px] h-[7px] rounded-full", be[e] ?? "bg-slate-400") }),
      /* @__PURE__ */ t("span", { className: p("font-semibold", we[e] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ t("span", { children: xe(n) }),
    o !== void 0 && /* @__PURE__ */ t("span", { children: ve(o) }),
    r !== void 0 && /* @__PURE__ */ a("span", { className: p("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ t("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ t("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function rt({ count: e, style: n }) {
  const r = e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : `${e}`;
  return /* @__PURE__ */ a("div", { className: p("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
    /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ t("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ t("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ a("span", { children: [
      r,
      " watching"
    ] })
  ] });
}
function ye(e) {
  return e.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function ke(e) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n = e.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function U({ participant: e, size: n = 32 }) {
  const r = ke(e.displayName);
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "call-avatar",
      "data-speaking": e.isSpeaking ? "true" : void 0,
      "data-muted": e.isMuted ? "true" : void 0,
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: n,
        height: n,
        fontSize: n * 0.38,
        background: e.avatarUrl ? void 0 : `hsl(${r}, 55%, 45%)`
      },
      children: [
        e.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: e.avatarUrl,
            alt: "",
            className: "w-full h-full rounded-full object-cover"
          }
        ) : ye(e.displayName),
        e.isSpeaking && /* @__PURE__ */ t(
          "span",
          {
            "data-testid": "call-avatar-speaking",
            className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]"
          }
        ),
        e.isMuted && /* @__PURE__ */ t(
          "span",
          {
            "data-testid": "call-avatar-muted",
            "aria-label": "Microphone muted",
            className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            children: /* @__PURE__ */ a(
              "svg",
              {
                width: "8",
                height: "8",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": !0,
                children: [
                  /* @__PURE__ */ t("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
                  /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
                  /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Ne({
  participants: e,
  localFallback: n,
  maxVisible: r = 4,
  avatarSize: o = 36,
  testId: i = "call-participant-strip",
  className: c,
  style: l
}) {
  const s = e.slice(0, r), d = Math.max(0, e.length - r), h = e.length === 0 && !!n;
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": i,
      "data-count": e.length,
      className: p(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        c
      ),
      style: l,
      children: [
        s.map((f) => /* @__PURE__ */ t(U, { participant: f, size: o }, f.id)),
        d > 0 && /* @__PURE__ */ a(
          "span",
          {
            "data-testid": "call-participant-strip-overflow",
            className: "text-white/50 text-xs font-medium",
            children: [
              "+",
              d
            ]
          }
        ),
        h && n && /* @__PURE__ */ t(U, { participant: n, size: o + 4 })
      ]
    }
  );
}
const V = {
  mic: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ t("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ t("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ t("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ t("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ t("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ t("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ t("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ t("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ t("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  userPlus: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ t("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ t("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ t("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] })
};
function O({
  icon: e,
  label: n,
  active: r = !1,
  danger: o = !1,
  onClick: i,
  disabled: c = !1,
  testId: l
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      disabled: c,
      onClick: i,
      "data-testid": l,
      className: p(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        r && !o && "bg-white/20 text-white",
        !r && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: e
    }
  );
}
function Ce({
  mode: e,
  isMuted: n = !1,
  isCameraOn: r = !0,
  isScreenSharing: o = !1,
  onToggleMute: i,
  onToggleCamera: c,
  onToggleScreenShare: l,
  onUpgradeToVideo: s,
  onEndCall: d,
  onAddParticipant: h,
  availableParticipants: f,
  currentParticipantIds: g,
  className: u
}) {
  const [m, x] = M(!1), N = new Set(g ?? []), y = (f ?? []).filter((w) => !N.has(w.id));
  return /* @__PURE__ */ a("div", { className: p("flex flex-col", u), children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ t(
            O,
            {
              icon: n ? V.micOff : V.mic,
              label: n ? "Unmute" : "Mute",
              active: n,
              onClick: i,
              testId: "mute-button"
            }
          ),
          e === "video" && /* @__PURE__ */ t(
            O,
            {
              icon: r ? V.camera : V.cameraOff,
              label: r ? "Turn off camera" : "Turn on camera",
              active: !r,
              onClick: c,
              testId: "camera-button"
            }
          ),
          e === "audio" && s && /* @__PURE__ */ t(
            O,
            {
              icon: V.videoUpgrade,
              label: "Switch to video",
              onClick: s,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ t(
            O,
            {
              icon: V.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          h && /* @__PURE__ */ t(
            O,
            {
              icon: V.userPlus,
              label: "Add participant",
              active: m,
              onClick: () => x((w) => !w),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ t(
            O,
            {
              icon: V.phoneEnd,
              label: "End call",
              danger: !0,
              onClick: d,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    m && h && /* @__PURE__ */ a(
      "div",
      {
        className: "border-t border-white/5 bg-[#0f172a]/80",
        "data-testid": "add-participant-picker",
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => x(!1),
                className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
                "aria-label": "Close add-participant picker",
                children: "✕"
              }
            )
          ] }),
          y.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ t("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: y.map((w) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                h(w.id), y.length <= 1 && x(!1);
              },
              children: [
                /* @__PURE__ */ t(U, { participant: w, size: 22 }),
                /* @__PURE__ */ t("span", { className: "text-xs text-white/80", children: w.displayName }),
                /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
              ]
            },
            w.id
          )) })
        ]
      }
    )
  ] });
}
function Le(e) {
  return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
const Me = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function Se(e) {
  return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function q({
  stats: e,
  position: n = "top-left",
  testId: r = "call-stats-overlay",
  className: o,
  style: i
}) {
  return Le(e) ? /* @__PURE__ */ a(
    "div",
    {
      "data-testid": r,
      className: p(
        "absolute z-10 pointer-events-none",
        Me[n],
        "flex flex-col gap-1.5",
        o
      ),
      style: i,
      children: [
        e.networkQuality && /* @__PURE__ */ t(me, { quality: e.networkQuality }),
        (e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0) && /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              e.bitrateKbps !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                Se(e.bitrateKbps)
              ] }),
              e.latencyMs !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-latency", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "latency" }),
                Math.round(e.latencyMs),
                " ms"
              ] }),
              e.packetLossPct !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-packet-loss", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "loss" }),
                e.packetLossPct.toFixed(1),
                "%"
              ] })
            ]
          }
        )
      ]
    }
  ) : null;
}
function re(e) {
  const n = Math.floor(e / 60), r = e % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function G({
  stream: e,
  muted: n = !1,
  className: r
}) {
  const o = $(null);
  return A(() => {
    const i = o.current;
    i && i.srcObject !== e && (i.srcObject = e);
  }, [e]), /* @__PURE__ */ t(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: p("w-full h-full object-cover", r)
    }
  );
}
const X = {
  phoneEnd: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  minimize: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ t("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ t("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ t("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ t("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function je({
  callerName: e,
  onAnswer: n,
  onDecline: r
}) {
  return /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-4 py-5 px-4", "data-testid": "call-ringing-view", children: [
    /* @__PURE__ */ t("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ t("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ a("div", { className: "text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-white font-semibold text-sm m-0", children: e || "Incoming call" }),
      /* @__PURE__ */ t("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: X.phoneEnd
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: X.phoneAnswer
        }
      )
    ] })
  ] });
}
function Ee({
  mode: e,
  participants: n,
  localParticipant: r,
  duration: o,
  isMuted: i,
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: s,
  onToggleCamera: d,
  onToggleScreenShare: h,
  onUpgradeToVideo: f,
  onAddParticipant: g,
  availableParticipants: u,
  onEndCall: m,
  layoutComponent: x,
  callStats: N
}) {
  const y = e === "video" && c;
  return /* @__PURE__ */ a("div", { className: "flex flex-col", children: [
    e === "video" && x && /* @__PURE__ */ a("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ t(q, { stats: N, position: "bottom-left" })
    ] }),
    e === "video" && !x && /* @__PURE__ */ a("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && y ? /* @__PURE__ */ t(G, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ t("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ t(U, { participant: r, size: 48 }) }),
      n.length > 0 && /* @__PURE__ */ a("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        n[0].videoStream ? /* @__PURE__ */ t(G, { stream: n[0].videoStream }) : /* @__PURE__ */ t("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ t(U, { participant: n[0], size: 28 }) }),
        n[0].isMuted && /* @__PURE__ */ t(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ a("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ t("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ t(q, { stats: N, position: "bottom-left" })
    ] }),
    e === "audio" && /* @__PURE__ */ t(
      Ne,
      {
        participants: n,
        localFallback: r,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ a("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ t("span", { className: "text-white/60 text-xs font-mono", children: re(o) }),
      /* @__PURE__ */ a("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ t(
      Ce,
      {
        mode: e,
        isMuted: i,
        isCameraOn: c,
        isScreenSharing: l,
        onToggleMute: s,
        onToggleCamera: d,
        onToggleScreenShare: h,
        onUpgradeToVideo: f,
        onEndCall: m,
        onAddParticipant: g,
        availableParticipants: u,
        currentParticipantIds: n.map((w) => w.id)
      }
    )
  ] });
}
function Pe({
  state: e,
  mode: n,
  duration: r,
  isMuted: o,
  callerName: i,
  onToggleMute: c,
  onEndCall: l,
  onExpand: s
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: s,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (d) => d.key === "Enter" && s?.(),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: p(
              "w-2 h-2 rounded-full shrink-0",
              e === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
            )
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: e === "ringing" ? /* @__PURE__ */ t("span", { className: "text-white text-xs font-medium truncate", children: i || "Incoming call" }) : /* @__PURE__ */ a("span", { className: "text-white text-xs font-medium", children: [
          n === "video" ? "Video" : "Audio",
          " call",
          r !== void 0 && /* @__PURE__ */ t("span", { className: "text-white/50 ml-1.5 font-mono", children: re(r) })
        ] }) }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1", onClick: (d) => d.stopPropagation(), children: [
          e === "active" && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: c,
              className: p(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ t("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ a(Z, { children: [
                /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ t("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ t("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ a(Z, { children: [
                /* @__PURE__ */ t("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ t("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: l,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
                /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function Te(e) {
  const [n, r] = M({ x: 0, y: 0 }), [o, i] = M(!1), [c, l] = M(!1), s = $(!1), d = $({ x: 0, y: 0 }), h = $({ x: 0, y: 0 }), f = $(null), g = _(
    (y) => {
      e && (s.current = !0, i(!0), l(!1), d.current = { x: y.clientX, y: y.clientY }, h.current = { ...n }, y.preventDefault());
    },
    [e, n]
  ), u = _(() => {
    l(!0), r({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), m = _(
    (y) => {
      const w = f.current;
      if (!w) return;
      const v = w.offsetParent, k = 16;
      let P = window.innerWidth, E = window.innerHeight;
      v && (P = v.clientWidth, E = v.clientHeight);
      const L = w.getBoundingClientRect(), T = v ? v.getBoundingClientRect() : { left: 0, top: 0 };
      let S, B;
      switch (y) {
        case "top-left":
          S = k, B = k;
          break;
        case "top-right":
          S = P - L.width - k, B = k;
          break;
        case "bottom-left":
          S = k, B = E - L.height - k;
          break;
        default:
          S = P - L.width - k, B = E - L.height - k;
          break;
      }
      const I = L.left - T.left - n.x, R = L.top - T.top - n.y;
      l(!0), r({ x: S - I, y: B - R }), setTimeout(() => l(!1), 200);
    },
    [n]
  ), x = $(m);
  x.current = m, A(() => {
    if (!e) return;
    const y = (v) => {
      s.current && r({
        x: h.current.x + (v.clientX - d.current.x),
        y: h.current.y + (v.clientY - d.current.y)
      });
    }, w = () => {
      if (!s.current) return;
      s.current = !1, i(!1);
      const v = f.current;
      if (!v) return;
      const k = v.offsetParent, P = 80;
      let E = window.innerWidth, L = window.innerHeight;
      if (k) {
        const j = k.getBoundingClientRect();
        E = j.width, L = j.height;
      }
      const T = v.getBoundingClientRect(), S = k ? k.getBoundingClientRect() : { left: 0, top: 0 }, B = T.left - S.left, I = T.top - S.top, R = E - (B + T.width), H = L - (I + T.height), D = B < P, F = R < P, b = I < P, C = H < P;
      b && D ? x.current("top-left") : b && F ? x.current("top-right") : C && D ? x.current("bottom-left") : C && F && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", y), document.addEventListener("mouseup", w), () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", w);
    };
  }, [e]);
  const N = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: g, resetOffset: u, snapToCorner: m, isDragging: o, isAnimating: c, hasMoved: N, widgetRef: f };
}
function Ae({
  onSnap: e,
  contained: n
}) {
  const r = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ t("div", { className: p(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: o, classes: i }) => /* @__PURE__ */ t(
    "div",
    {
      className: `absolute ${i} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => e(o),
      title: `Snap to ${o.replace("-", " ")}`,
      children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ t("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    o
  )) });
}
function it({
  state: e,
  mode: n,
  participants: r,
  localParticipant: o,
  callerName: i,
  duration: c,
  isMuted: l = !1,
  isCameraOn: s = !0,
  isScreenSharing: d = !1,
  onAnswer: h,
  onDecline: f,
  onEndCall: g,
  onToggleMute: u,
  onToggleCamera: m,
  onToggleScreenShare: x,
  onUpgradeToVideo: N,
  onAddParticipant: y,
  availableParticipants: w,
  onMinimize: v,
  layoutComponent: k,
  callStats: P,
  minimized: E = !1,
  position: L = "bottom-right",
  contained: T = !1,
  draggable: S = !0,
  className: B,
  style: I,
  dataAttrs: R
}) {
  const { offset: H, handleMouseDown: D, resetOffset: F, snapToCorner: b, isDragging: C, isAnimating: j, hasMoved: W, widgetRef: Q } = Te(S), z = {};
  if (R)
    for (const [ae, K] of Object.entries(R))
      K != null && K !== "" && (z[ae] = K);
  const oe = ne(() => {
    switch (L) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [L]);
  return e === "idle" || e === "ended" ? null : /* @__PURE__ */ a(Z, { children: [
    C && /* @__PURE__ */ t(Ae, { onSnap: b, contained: T }),
    /* @__PURE__ */ t(
      "div",
      {
        ref: Q,
        "data-testid": "call-widget",
        "data-call-state": e,
        className: p(
          T ? "absolute z-50" : "fixed z-[9999]",
          oe,
          B
        ),
        style: {
          transform: `translate(${H.x}px, ${H.y}px)`,
          transition: j ? "transform 0.2s ease-out" : void 0,
          ...I
        },
        ...z,
        children: /* @__PURE__ */ a(
          "div",
          {
            className: p(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              E ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !E && /* @__PURE__ */ a(
                "div",
                {
                  className: p(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    S && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: D,
                  children: [
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ t("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ t("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                      W && /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: F,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: X.snapBack
                        }
                      ),
                      v && /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: v,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: X.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              E && /* @__PURE__ */ t(
                "div",
                {
                  className: p(S && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: D,
                  children: /* @__PURE__ */ t(
                    Pe,
                    {
                      state: e,
                      mode: n,
                      duration: c,
                      isMuted: l,
                      callerName: i,
                      onToggleMute: u,
                      onEndCall: g,
                      onExpand: v
                    }
                  )
                }
              ),
              !E && /* @__PURE__ */ a(Z, { children: [
                e === "ringing" && /* @__PURE__ */ t(
                  je,
                  {
                    callerName: i,
                    onAnswer: h,
                    onDecline: f
                  }
                ),
                e === "connecting" && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "flex flex-col items-center gap-3 py-6 px-4",
                    "data-testid": "call-connecting-view",
                    children: [
                      /* @__PURE__ */ t("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                      /* @__PURE__ */ t("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                    ]
                  }
                ),
                e === "active" && /* @__PURE__ */ t(
                  Ee,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: o,
                    duration: c,
                    isMuted: l,
                    isCameraOn: s,
                    isScreenSharing: d,
                    onToggleMute: u,
                    onToggleCamera: m,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: N,
                    onAddParticipant: y,
                    availableParticipants: w,
                    onEndCall: g,
                    layoutComponent: k,
                    callStats: P
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function ot({
  callerName: e,
  callerAvatarUrl: n,
  context: r,
  mode: o = "started",
  onJoin: i,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: s,
  style: d
}) {
  const [h, f] = M(!0);
  return A(() => {
    if (!l || l <= 0) return;
    const g = setTimeout(() => {
      f(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(g);
  }, [l, c]), h ? /* @__PURE__ */ a(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": e,
      className: p(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        s
      ),
      style: d,
      children: [
        /* @__PURE__ */ t(Be, { name: e, avatarUrl: n }),
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${e} is calling you` : `${e} started a call` }),
          r && /* @__PURE__ */ t("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => {
                f(!1), c();
              },
              className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
              "aria-label": "Dismiss call invitation",
              "data-testid": "incoming-call-dismiss",
              children: "Dismiss"
            }
          ),
          i && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => {
                f(!1), i();
              },
              className: "text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded",
              "aria-label": "Join call",
              "data-testid": "incoming-call-join",
              children: "Join"
            }
          )
        ] })
      ]
    }
  ) : null;
}
function Be({ name: e, avatarUrl: n }) {
  const r = Ie(e);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ t("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : $e(e),
        /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function $e(e) {
  return e.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Ie(e) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n = e.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function J(e) {
  if (!isFinite(e) || e < 0) return "0:00";
  const n = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), o = Math.floor(e % 60), i = n > 0 ? String(r).padStart(2, "0") : String(r), c = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${i}:${c}` : `${i}:${c}`;
}
function at({
  playlistUrl: e,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: i,
  onTimeUpdate: c,
  onError: l,
  hideDownload: s = !1,
  className: d
}) {
  const h = $(null), f = $(null), [g, u] = M(!1), [m, x] = M(0), [N, y] = M(0), [w, v] = M(1), [k, P] = M(1), [E, L] = M(!1), [T, S] = M(null);
  A(() => {
    const b = h.current;
    if (!b || !e) return;
    if (S(null), L(!0), b.canPlayType("application/vnd.apple.mpegurl"))
      return b.src = e, () => {
        b.removeAttribute("src"), b.load();
      };
    let C = !1;
    return (async () => {
      try {
        const j = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (C) return;
        if (!j.isSupported()) {
          S("HLS playback is not supported in this browser."), L(!1);
          return;
        }
        const W = new j({ enableWorker: !0 });
        f.current = W, W.attachMedia(b), W.on(j.Events.MEDIA_ATTACHED, () => W.loadSource(e)), W.on(j.Events.ERROR, (Q, z) => {
          z.fatal && (S(`HLS error: ${z.type}`), l?.(new Error(`HLS fatal: ${z.type}`)));
        });
      } catch (j) {
        if (C) return;
        S(`Failed to load hls.js — install it in the consumer app: ${j?.message ?? j}`);
      }
    })(), () => {
      if (C = !0, f.current) {
        try {
          f.current.destroy();
        } catch {
        }
        f.current = null;
      }
    };
  }, [e, l]);
  const B = () => {
    const b = h.current;
    b && (b.paused ? b.play().catch(() => {
    }) : b.pause());
  }, I = (b) => {
    const C = h.current;
    !C || !isFinite(N) || N <= 0 || (C.currentTime = Number(b.target.value));
  }, R = (b) => {
    const C = h.current;
    if (!C) return;
    const j = Number(b.target.value);
    C.volume = j, v(j);
  }, H = (b) => {
    const C = h.current;
    if (!C) return;
    const j = Number(b.target.value);
    C.playbackRate = j, P(j);
  }, D = () => {
    const b = h.current;
    b && (document.fullscreenElement ? document.exitFullscreen() : b.requestFullscreen?.());
  }, F = ne(
    () => N > 0 ? Math.min(100, m / N * 100) : 0,
    [m, N]
  );
  return /* @__PURE__ */ a("div", { className: p("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ t(
      "video",
      {
        ref: h,
        autoPlay: r,
        muted: o,
        poster: n,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => u(!0),
        onPause: () => u(!1),
        onLoadedMetadata: (b) => {
          const C = b.currentTarget;
          y(C.duration), L(!1), i?.(C.duration);
        },
        onTimeUpdate: (b) => {
          const C = b.currentTarget;
          x(C.currentTime), c?.(C.currentTime, C.duration);
        },
        onWaiting: () => L(!0),
        onCanPlay: () => L(!1),
        onError: () => {
          S("Playback error."), l?.(new Error("video element error")), L(!1);
        }
      }
    ),
    E && !T && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    T && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: T }),
    /* @__PURE__ */ a("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ t("span", { className: "text-white text-xs tabular-nums w-12", children: J(m) }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(N) ? N : 0,
            step: 0.1,
            value: m,
            onChange: I,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${F}%` }
          }
        ),
        /* @__PURE__ */ t("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: J(N) })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: B,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": g ? "Pause" : "Play",
            children: g ? /* @__PURE__ */ a("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
              /* @__PURE__ */ t("rect", { x: "2", y: "1", width: "3", height: "12" }),
              /* @__PURE__ */ t("rect", { x: "9", y: "1", width: "3", height: "12" })
            ] }) : /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ t("polygon", { points: "2,1 12,7 2,13" }) })
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "text-xs opacity-70", children: "Vol" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: w,
              onChange: R,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "select",
          {
            value: k,
            onChange: H,
            className: "bg-white/10 hover:bg-white/20 text-white text-xs rounded px-2 py-1 border-0 outline-none",
            "aria-label": "Playback speed",
            children: [
              /* @__PURE__ */ t("option", { value: 0.5, children: "0.5×" }),
              /* @__PURE__ */ t("option", { value: 1, children: "1×" }),
              /* @__PURE__ */ t("option", { value: 1.5, children: "1.5×" }),
              /* @__PURE__ */ t("option", { value: 2, children: "2×" })
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        !s && e && /* @__PURE__ */ t(
          "a",
          {
            href: e,
            download: !0,
            className: "text-white/80 hover:text-white text-xs underline",
            "aria-label": "Download",
            children: "Download"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: D,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ t("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Re(e) {
  if (!isFinite(e) || e < 0) return "—";
  const n = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), o = Math.floor(e % 60);
  return n > 0 ? `${n}h ${r}m` : r > 0 ? `${r}m ${o}s` : `${o}s`;
}
function ee(e) {
  if (!e) return "—";
  try {
    const n = new Date(e);
    return new Intl.DateTimeFormat(void 0, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(n);
  } catch {
    return e;
  }
}
function Ve({ status: e }) {
  return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "processing",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
      children: [
        /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }),
        "Processing"
      ]
    }
  ) : /* @__PURE__ */ t(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "failed",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
      children: "Failed"
    }
  );
}
function De({
  id: e,
  startIso: n,
  durationSec: r,
  participantCount: o,
  thumbnailUrl: i,
  label: c,
  status: l = "ready",
  selected: s,
  onClick: d,
  actions: h,
  className: f
}) {
  const g = typeof d == "function";
  return /* @__PURE__ */ a(
    "div",
    {
      ...g ? {
        role: "button",
        tabIndex: 0,
        onClick: () => d(e),
        onKeyDown: (m) => {
          g && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), d(e));
        },
        "aria-pressed": s ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": e,
      "data-status": l,
      className: p(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        g && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        s ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        f
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "relative aspect-video rounded bg-black overflow-hidden mb-2", children: [
          i ? /* @__PURE__ */ t(
            "img",
            {
              src: i,
              alt: "",
              className: "w-full h-full object-cover",
              loading: "lazy",
              onError: (m) => {
                m.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ t("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ t("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ t(Ve, { status: l }),
          /* @__PURE__ */ t("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Re(r) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? ee(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ a("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ t("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: ee(n) }),
        h && /* @__PURE__ */ t(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (m) => m.stopPropagation(),
            children: h
          }
        )
      ]
    }
  );
}
function lt({
  recordings: e,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: i,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ t("div", { className: p("flex flex-col gap-2", l), children: [0, 1, 2].map((s) => /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ t("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ t("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    s
  )) }) : e.length === 0 ? /* @__PURE__ */ t("div", { className: p("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: i ?? "No recordings yet." }) : /* @__PURE__ */ t("div", { className: p("flex flex-col gap-2", l), children: e.map((s) => /* @__PURE__ */ t(
    De,
    {
      id: s.id,
      startIso: s.startIso,
      endIso: s.endIso,
      durationSec: s.durationSec,
      participantCount: s.participantCount,
      thumbnailUrl: s.thumbnailUrl,
      label: s.label,
      status: s.status,
      selected: s.id === n,
      onClick: r,
      actions: c?.(s)
    },
    s.id
  )) });
}
function st({
  getVideoElement: e,
  className: n,
  title: r
}) {
  const [o, i] = M(!1), [c, l] = M(!1);
  A(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), A(() => {
    const h = () => i(!1), f = () => i(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", f), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", f);
    };
  }, []);
  const s = _(async () => {
    if (c)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), i(!1);
          return;
        }
        const h = e();
        if (!h) return;
        h.disablePictureInPicture = !1, await h.requestPictureInPicture(), i(!0);
      } catch {
      }
  }, [c, e]), d = !c;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: s,
      disabled: d,
      title: r ?? (d ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: p(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        n
      ),
      children: /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ t("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function We(e) {
  if (!e) return "?";
  const n = e.trim().split(/\s+/);
  return n.length === 1 ? n[0].slice(0, 2).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function ct({
  participants: e,
  activeSpeakerId: n,
  onParticipantClick: r,
  count: o,
  title: i = "Participants",
  footer: c,
  className: l
}) {
  const s = o ?? e.length;
  return /* @__PURE__ */ a(
    "aside",
    {
      className: p(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ a("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: i }),
          /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: s })
        ] }),
        /* @__PURE__ */ t("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: e.map((d) => {
          const h = d.id === n;
          return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: r ? () => r(d.id) : void 0,
              className: p(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                h && "bg-white/[0.04]",
                r ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !r,
              children: [
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: p(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      h && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      d.avatarUrl ? /* @__PURE__ */ t("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ t("span", { children: We(d.displayName) }),
                      d.isScreenSharing && /* @__PURE__ */ t(
                        "span",
                        {
                          title: "Sharing screen",
                          className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-[var(--color-surface)]"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ a("span", { className: "flex-1 truncate text-sm text-[var(--color-text-primary)]", children: [
                  d.displayName,
                  d.isLocal && /* @__PURE__ */ t("span", { className: "ml-1 text-xs text-[var(--color-text-secondary)]", children: "(you)" })
                ] }),
                d.handRaised && /* @__PURE__ */ t("span", { title: "Hand raised", "aria-label": "Hand raised", children: "✋" }),
                d.isMuted && /* @__PURE__ */ t(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 16 16",
                    className: "text-[var(--color-text-secondary)]",
                    "aria-label": "Muted",
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
                      }
                    )
                  }
                )
              ]
            }
          ) }, d.id);
        }) }),
        c && /* @__PURE__ */ t("div", { className: "border-t border-[var(--color-border)] p-3", children: c })
      ]
    }
  );
}
let Y = null;
function He() {
  if (Y) return Y;
  try {
    return Y = new AudioContext(), Y;
  } catch {
    return null;
  }
}
function dt({
  localStream: e,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: i = 6e3
}) {
  const [c, l] = M(!1);
  return A(() => {
    if (!n || !e || e.getAudioTracks().filter((y) => y.readyState === "live").length === 0) return;
    const d = He();
    if (!d) return;
    let h, f;
    try {
      h = d.createMediaStreamSource(e), f = d.createAnalyser(), f.fftSize = 512, f.smoothingTimeConstant = 0.6, h.connect(f);
    } catch {
      return;
    }
    let g = null, u = 0, m = !1;
    const x = new Float32Array(f.frequencyBinCount), N = setInterval(() => {
      if (m) return;
      f.getFloatTimeDomainData(x);
      let y = 0;
      for (let k = 0; k < x.length; k++) y += x[k] * x[k];
      const w = 20 * Math.log10(Math.sqrt(y / x.length)), v = Date.now();
      w > r ? (g == null && (g = v), v - g >= o && v - u > i && (l(!0), u = v, setTimeout(() => {
        m || l(!1);
      }, 3e3), g = null)) : g = null;
    }, 200);
    return () => {
      m = !0, clearInterval(N);
      try {
        h.disconnect();
      } catch {
      }
      try {
        f.disconnect();
      } catch {
      }
    };
  }, [e, n, r, o, i]), A(() => {
    n || l(!1);
  }, [n]), c;
}
function Fe(e, n) {
  const [r, o] = M(0);
  return A(() => {
    if (!e) return;
    const i = (u, m) => {
      console.info("[useTrackStateBump] remote track", u, {
        participant: n,
        kind: m.kind,
        enabled: m.enabled,
        muted: m.muted,
        readyState: m.readyState,
        id: m.id
      }), o((x) => x + 1);
    }, c = (u) => i("mute", u.target), l = (u) => i("unmute", u.target), s = (u) => i("ended", u.target), d = /* @__PURE__ */ new WeakSet(), h = (u) => {
      d.has(u) || (d.add(u), u.addEventListener("mute", c), u.addEventListener("unmute", l), u.addEventListener("ended", s));
    };
    for (const u of e.getVideoTracks()) h(u);
    const f = (u) => {
      const m = u.track;
      m && m.kind === "video" && h(m), o((x) => x + 1);
    }, g = () => o((u) => u + 1);
    return e.addEventListener("addtrack", f), e.addEventListener("removetrack", g), () => {
      for (const u of e.getVideoTracks())
        u.removeEventListener("mute", c), u.removeEventListener("unmute", l), u.removeEventListener("ended", s);
      e.removeEventListener("addtrack", f), e.removeEventListener("removetrack", g);
    };
  }, [e, n]), r;
}
function ze(e) {
  if (!e) return !1;
  const n = e.getVideoTracks();
  return n.length === 0 ? !1 : n.some((r) => r.readyState === "live" && r.enabled && !r.muted);
}
function ie({
  stream: e,
  muted: n = !1,
  videoRef: r,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: i
}) {
  const c = $(null), l = $(i);
  return l.current = i, A(() => {
    const s = c.current;
    if (!s) return;
    s.srcObject !== e && (s.srcObject = e), r && (r.current = s);
    const d = (m) => {
      l.current?.(m);
    }, h = () => d("playing"), f = () => d("ended"), g = () => {
      s.ended && d("ended");
    };
    s.addEventListener("play", h), s.addEventListener("ended", f), s.addEventListener("pause", g);
    const u = s.play();
    return u && typeof u.catch == "function" && u.catch((m) => {
      m?.name === "NotAllowedError" && d("paused-by-autoplay");
    }), () => {
      s.removeEventListener("play", h), s.removeEventListener("ended", f), s.removeEventListener("pause", g), r && r.current === s && (r.current = null);
    };
  }, [e, r]), /* @__PURE__ */ t(
    "video",
    {
      ref: c,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: o
    }
  );
}
const Oe = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function _e() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((n) => {
    if (n.paused) {
      const r = n.play();
      r && typeof r.catch == "function" && r.catch(() => {
      });
    }
  });
}
function ut({
  chipLabel: e = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...i
}) {
  const [c, l] = M(!1), s = $(null), h = i.videoRef ?? s, f = _(
    (u) => {
      u === "paused-by-autoplay" ? l(!0) : u === "playing" && l(!1), o?.(u);
    },
    [o]
  ), g = _(() => {
    const u = h.current;
    if (u) {
      u.muted = !1;
      const m = u.play();
      m && typeof m.catch == "function" && m.catch(() => {
      });
    }
    _e(), l(!1);
  }, [h]);
  return /* @__PURE__ */ a("div", { className: p("relative h-full w-full", r), children: [
    /* @__PURE__ */ t(
      ie,
      {
        ...i,
        videoRef: h,
        onPlayStateChange: f
      }
    ),
    c && /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: g,
        className: p(Oe, n),
        "data-testid": "autoplay-gate-chip",
        children: e
      }
    ) })
  ] });
}
function ht({
  stream: e,
  displayName: n,
  cameraOn: r,
  avatarSize: o = 96
}) {
  Fe(e, n);
  const i = ze(e);
  return !r || !i || !e ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ t(se, { name: n, size: o }) }) : /* @__PURE__ */ t(ie, { stream: e });
}
function ft({ show: e, label: n }) {
  return e ? /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "calling-pill",
      "data-call-status": "calling",
      className: "pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-medium text-white",
      children: [
        "Calling ",
        n || "user",
        "…"
      ]
    }
  ) : null;
}
function pt({ show: e, label: n = "Reconnecting…" }) {
  return e ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "hangout-reconnecting-banner",
      className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-amber-500/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
      role: "status",
      "aria-live": "polite",
      children: n
    }
  ) : null;
}
function mt({
  show: e,
  label: n = "You're muted — tap mic to unmute"
}) {
  return e ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "mute-while-talking-toast",
      className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-500/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
      role: "alert",
      children: n
    }
  ) : null;
}
const te = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Ue(e) {
  let n = 0;
  for (let r = 0; r < e.length; r++) n = n * 31 + e.charCodeAt(r) | 0;
  return te[Math.abs(n) % te.length];
}
function gt({
  lines: e,
  maxLines: n = 3,
  fadeAfterMs: r = 8e3,
  className: o
}) {
  const i = Date.now(), c = e.slice(-n).map((l) => {
    const s = i - new Date(l.at).getTime(), d = Math.max(0.35, 1 - s / r);
    return { ...l, opacity: d };
  }).filter((l) => l.opacity > 0);
  return c.length === 0 ? null : /* @__PURE__ */ t(
    "div",
    {
      className: p(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: c.map((l) => /* @__PURE__ */ a(
        "div",
        {
          className: p(
            "flex items-baseline gap-2 text-sm transition-opacity",
            l.interim && "italic"
          ),
          style: { opacity: l.opacity },
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Ue(l.speakerId) },
                children: l.speakerName ?? l.speakerId.slice(0, 6)
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-white", children: l.text })
          ]
        },
        l.id
      ))
    }
  );
}
export {
  ut as A,
  Ce as C,
  mt as M,
  me as N,
  st as P,
  et as R,
  Ge as S,
  gt as T,
  Je as V,
  Ne as a,
  ot as b,
  q as c,
  it as d,
  ft as e,
  tt as f,
  pt as g,
  lt as h,
  at as i,
  De as j,
  ht as k,
  ct as l,
  nt as m,
  ie as n,
  qe as o,
  rt as p,
  Fe as q,
  ze as s,
  dt as u
};
