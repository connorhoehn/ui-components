import { jsxs as a, jsx as e, Fragment as X } from "react/jsx-runtime";
import { useRef as R, useState as S, useEffect as B, useMemo as ee, useCallback as z } from "react";
import { c as f } from "./cn-B6yFEsav.js";
import { P as ie } from "./HangoutLayout-BT6X2zG6.js";
import { A as oe } from "./Avatar-BvKIaNVE.js";
const ae = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function ze({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: o = !0,
  loop: i = !1,
  controls: c = !1,
  poster: l,
  phase: s,
  className: u,
  style: h,
  onPhaseChange: m,
  onTimeUpdate: x
}) {
  const d = R(null), [p, w] = S("idle"), y = s ?? p;
  B(() => {
    const b = d.current;
    if (!b) return;
    const k = [
      ["waiting", () => {
        w("buffering"), m?.("buffering");
      }],
      ["playing", () => {
        w("playing"), m?.("playing");
      }],
      ["error", () => {
        w("error"), m?.("error");
      }],
      ["loadstart", () => {
        w("connecting"), m?.("connecting");
      }],
      ["timeupdate", () => {
        x?.(b.currentTime, b.duration);
      }]
    ];
    return k.forEach(([g, M]) => b.addEventListener(g, M)), () => k.forEach(([g, M]) => b.removeEventListener(g, M));
  }, [m, x]), B(() => {
    const b = d.current;
    b && n !== void 0 && (b.srcObject = n);
  }, [n]);
  const T = y !== "playing", C = ae[y];
  return /* @__PURE__ */ a(
    "div",
    {
      className: f("relative bg-black rounded-lg overflow-hidden aspect-video", u),
      style: h,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: d,
            src: n ? void 0 : t,
            autoPlay: r,
            muted: o,
            loop: i,
            controls: c,
            poster: l,
            playsInline: !0,
            className: f("w-full h-full object-contain block")
          }
        ),
        T && C && /* @__PURE__ */ a("div", { className: f("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          y === "buffering" && /* @__PURE__ */ e(le, {}),
          /* @__PURE__ */ e("span", { className: f(y === "buffering" ? "ml-2" : ""), children: C })
        ] })
      ]
    }
  );
}
function le() {
  return /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: f("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function se(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Oe({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", se(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, i]) => /* @__PURE__ */ a("div", { className: f("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: f("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: f("font-mono"), children: i })
  ] }, o)) });
}
const ce = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, de = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, ue = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function _e({ quality: t, style: n }) {
  const r = ce[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ a("div", { className: f("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ e(
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
    /* @__PURE__ */ e("span", { className: de[t], children: ue[t] })
  ] });
}
function Ue({ participants: t, style: n }) {
  const r = t.length, o = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: f("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...n },
      children: t.map((i) => /* @__PURE__ */ e(
        ie,
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
function Ke({ reactions: t, style: n }) {
  const [r, o] = S([]);
  return B(() => {
    if (t.length === 0) return;
    const i = t[t.length - 1], c = {
      id: i.id + "-" + Date.now(),
      emoji: i.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), c]);
  }, [t]), B(() => {
    const i = setInterval(() => {
      o((c) => c.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(i);
  }, []), /* @__PURE__ */ e("div", { className: f("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((i) => /* @__PURE__ */ e(
    "span",
    {
      className: f("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${i.x}%` },
      children: i.emoji
    },
    i.id
  )) });
}
const he = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Ye({ onReact: t, emojis: n = he, style: r }) {
  return /* @__PURE__ */ e("div", { className: f("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: f("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (i) => i.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (i) => i.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (i) => i.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function fe(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function me(t) {
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${r}:${String(o).padStart(2, "0")}`;
}
const pe = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, ge = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Ze({ phase: t, bitrateBps: n, viewerCount: r, duration: o, style: i }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ a("div", { className: f("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: i, children: [
    /* @__PURE__ */ a("span", { className: f("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: f("w-[7px] h-[7px] rounded-full", pe[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: f("font-semibold", ge[t] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: fe(n) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: me(o) }),
    r !== void 0 && /* @__PURE__ */ a("span", { className: f("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function Xe({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ a("div", { className: f("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
    /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ a("span", { children: [
      r,
      " watching"
    ] })
  ] });
}
function te(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function xe(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function ve(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function K({ participant: t, size: n = 32 }) {
  const r = ve(t.displayName);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: n,
        height: n,
        fontSize: n * 0.38,
        background: t.avatarUrl ? void 0 : `hsl(${r}, 55%, 45%)`
      },
      children: [
        t.avatarUrl ? /* @__PURE__ */ e("img", { src: t.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : xe(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]" })
      ]
    }
  );
}
function F({
  icon: t,
  label: n,
  active: r = !1,
  danger: o = !1,
  onClick: i,
  disabled: c = !1,
  testId: l
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      disabled: c,
      onClick: i,
      "data-testid": l,
      className: f(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        r && !o && "bg-white/20 text-white",
        !r && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function G({ stream: t, muted: n = !1, className: r }) {
  const o = R(null);
  return B(() => {
    const i = o.current;
    i && i.srcObject !== t && (i.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: f("w-full h-full object-cover", r)
    }
  );
}
const I = {
  mic: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ e("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ e("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ e("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  userPlus: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ e("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] }),
  minimize: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ e("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ e("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function be({ callerName: t, onAnswer: n, onDecline: r }) {
  return /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-4 py-5 px-4", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ a("div", { className: "text-center", children: [
      /* @__PURE__ */ e("p", { className: "text-white font-semibold text-sm m-0", children: t || "Incoming call" }),
      /* @__PURE__ */ e("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: I.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: I.phoneAnswer
        }
      )
    ] })
  ] });
}
function we({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: o,
  isMuted: i,
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: s,
  onToggleCamera: u,
  onToggleScreenShare: h,
  onUpgradeToVideo: m,
  onAddParticipant: x,
  availableParticipants: d,
  onEndCall: p,
  layoutComponent: w
}) {
  const y = t === "video" && c, [T, C] = S(!1), b = new Set(n.map((g) => g.id)), k = (d || []).filter((g) => !b.has(g.id));
  return /* @__PURE__ */ a("div", { className: "flex flex-col", children: [
    t === "video" && w && /* @__PURE__ */ e("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden", children: w }),
    t === "video" && !w && /* @__PURE__ */ a("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && y ? /* @__PURE__ */ e(G, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(K, { participant: r, size: 48 }) }),
      n.length > 0 && /* @__PURE__ */ a("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        n[0].videoStream ? /* @__PURE__ */ e(G, { stream: n[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(K, { participant: n[0], size: 28 }) }),
        n[0].isMuted && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ a("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] })
    ] }),
    t === "audio" && /* @__PURE__ */ a("div", { className: "flex items-center justify-center gap-2 py-4 px-3 flex-wrap", children: [
      n.slice(0, 4).map((g) => /* @__PURE__ */ e(K, { participant: g, size: 36 }, g.id)),
      n.length > 4 && /* @__PURE__ */ a("span", { className: "text-white/50 text-xs font-medium", children: [
        "+",
        n.length - 4
      ] }),
      n.length === 0 && r && /* @__PURE__ */ e(K, { participant: r, size: 40 })
    ] }),
    /* @__PURE__ */ a("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: te(o) }),
      /* @__PURE__ */ a("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center justify-center gap-2 px-3 pb-3", "data-testid": "call-controls", children: [
      /* @__PURE__ */ e(
        F,
        {
          icon: i ? I.micOff : I.mic,
          label: i ? "Unmute" : "Mute",
          active: i,
          onClick: s,
          testId: "mute-button"
        }
      ),
      t === "video" && /* @__PURE__ */ e(
        F,
        {
          icon: c ? I.camera : I.cameraOff,
          label: c ? "Turn off camera" : "Turn on camera",
          active: !c,
          onClick: u,
          testId: "camera-button"
        }
      ),
      t === "audio" && m && /* @__PURE__ */ e(
        F,
        {
          icon: I.videoUpgrade,
          label: "Switch to video",
          onClick: m,
          testId: "upgrade-to-video-button"
        }
      ),
      /* @__PURE__ */ e(
        F,
        {
          icon: I.screenShare,
          label: l ? "Stop sharing" : "Share screen",
          active: l,
          onClick: h,
          testId: "screenshare-button"
        }
      ),
      x && /* @__PURE__ */ e(
        F,
        {
          icon: I.userPlus,
          label: "Add participant",
          active: T,
          onClick: () => C((g) => !g),
          testId: "add-participant-button"
        }
      ),
      /* @__PURE__ */ e(
        F,
        {
          icon: I.phoneEnd,
          label: "End call",
          danger: !0,
          onClick: p,
          testId: "hangup-button"
        }
      )
    ] }),
    T && x && /* @__PURE__ */ a("div", { className: "border-t border-white/5 bg-[#0f172a]/80", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => C(!1),
            className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
            children: "✕"
          }
        )
      ] }),
      k.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: k.map((g) => /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
          onClick: () => {
            x(g.id), k.length <= 1 && C(!1);
          },
          children: [
            /* @__PURE__ */ e(K, { participant: g, size: 22 }),
            /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: g.displayName }),
            /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
          ]
        },
        g.id
      )) })
    ] })
  ] });
}
function ye({
  state: t,
  mode: n,
  participants: r,
  duration: o,
  isMuted: i,
  callerName: c,
  onToggleMute: l,
  onEndCall: s,
  onExpand: u
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: u,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (h) => h.key === "Enter" && u?.(),
      children: [
        /* @__PURE__ */ e("span", { className: f(
          "w-2 h-2 rounded-full shrink-0",
          t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: c || "Incoming call" }) : /* @__PURE__ */ a("span", { className: "text-white text-xs font-medium", children: [
          n === "video" ? "Video" : "Audio",
          " call",
          o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: te(o) })
        ] }) }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1", onClick: (h) => h.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: l,
              className: f(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                i ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": i ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: i ? /* @__PURE__ */ a(X, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ a(X, { children: [
                /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: s,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
                /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function ke(t, n = "bottom-right") {
  const [r, o] = S({ x: 0, y: 0 }), [i, c] = S(!1), [l, s] = S(!1), u = R(!1), h = R({ x: 0, y: 0 }), m = R({ x: 0, y: 0 }), x = R(null), d = z((C) => {
    t && (u.current = !0, c(!0), s(!1), h.current = { x: C.clientX, y: C.clientY }, m.current = { ...r }, C.preventDefault());
  }, [t, r]), p = z(() => {
    s(!0), o({ x: 0, y: 0 }), setTimeout(() => s(!1), 200);
  }, []), w = z((C) => {
    const b = x.current;
    if (!b) return;
    const k = b.offsetParent, g = 16;
    let M = window.innerWidth, j = window.innerHeight;
    k && (M = k.clientWidth, j = k.clientHeight);
    const L = b.getBoundingClientRect(), A = k ? k.getBoundingClientRect() : { left: 0, top: 0 };
    let P, $;
    switch (C) {
      case "top-left":
        P = g, $ = g;
        break;
      case "top-right":
        P = M - L.width - g, $ = g;
        break;
      case "bottom-left":
        P = g, $ = j - L.height - g;
        break;
      default:
        P = M - L.width - g, $ = j - L.height - g;
        break;
    }
    L.left - A.left, L.top - A.top;
    const D = L.left - A.left - r.x, H = L.top - A.top - r.y;
    s(!0), o({ x: P - D, y: $ - H }), setTimeout(() => s(!1), 200);
  }, [r]), y = R(w);
  y.current = w, B(() => {
    if (!t) return;
    const C = (k) => {
      u.current && o({
        x: m.current.x + (k.clientX - h.current.x),
        y: m.current.y + (k.clientY - h.current.y)
      });
    }, b = (k) => {
      if (!u.current) return;
      u.current = !1, c(!1);
      const g = x.current;
      if (!g) return;
      const M = g.offsetParent, j = 80;
      let L = window.innerWidth, A = window.innerHeight;
      if (M) {
        const W = M.getBoundingClientRect();
        L = W.width, A = W.height;
      }
      const P = g.getBoundingClientRect(), $ = M ? M.getBoundingClientRect() : { left: 0, top: 0 }, D = P.left - $.left, H = P.top - $.top, O = L - (D + P.width), _ = A - (H + P.height), v = D < j, N = O < j, E = H < j, V = _ < j;
      E && v ? y.current("top-left") : E && N ? y.current("top-right") : V && v ? y.current("bottom-left") : V && N && y.current("bottom-right");
    };
    return document.addEventListener("mousemove", C), document.addEventListener("mouseup", b), () => {
      document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", b);
    };
  }, [t]);
  const T = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: d, resetOffset: p, snapToCorner: w, isDragging: i, isAnimating: l, hasMoved: T, widgetRef: x };
}
function Ne({ onSnap: t, contained: n }) {
  const r = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: f(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: o, classes: i }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${i} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => t(o),
      title: `Snap to ${o.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    o
  )) });
}
function Ge({
  state: t,
  mode: n,
  participants: r,
  localParticipant: o,
  callerName: i,
  duration: c,
  isMuted: l = !1,
  isCameraOn: s = !0,
  isScreenSharing: u = !1,
  onAnswer: h,
  onDecline: m,
  onEndCall: x,
  onToggleMute: d,
  onToggleCamera: p,
  onToggleScreenShare: w,
  onUpgradeToVideo: y,
  onAddParticipant: T,
  availableParticipants: C,
  onMinimize: b,
  layoutComponent: k,
  minimized: g = !1,
  position: M = "bottom-right",
  contained: j = !1,
  draggable: L = !0,
  className: A,
  style: P,
  dataAttrs: $
}) {
  const { offset: D, handleMouseDown: H, resetOffset: O, snapToCorner: _, isDragging: v, isAnimating: N, hasMoved: E, widgetRef: V } = ke(L, M), W = {};
  if ($)
    for (const [re, Y] of Object.entries($))
      Y != null && Y !== "" && (W[re] = Y);
  const U = ee(() => {
    switch (M) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [M]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ a(X, { children: [
    v && /* @__PURE__ */ e(Ne, { onSnap: _, contained: j }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: V,
        className: f(
          j ? "absolute z-50" : "fixed z-[9999]",
          U,
          A
        ),
        style: {
          transform: `translate(${D.x}px, ${D.y}px)`,
          transition: N ? "transform 0.2s ease-out" : void 0,
          ...P
        },
        ...W,
        children: /* @__PURE__ */ a(
          "div",
          {
            className: f(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              g ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !g && /* @__PURE__ */ a(
                "div",
                {
                  className: f(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    L && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: H,
                  children: [
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                      E && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: O,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: I.snapBack
                        }
                      ),
                      b && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: b,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: I.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              g && /* @__PURE__ */ e(
                "div",
                {
                  className: f(L && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: H,
                  children: /* @__PURE__ */ e(
                    ye,
                    {
                      state: t,
                      mode: n,
                      participants: r,
                      duration: c,
                      isMuted: l,
                      callerName: i,
                      onToggleMute: d,
                      onEndCall: x,
                      onExpand: b
                    }
                  )
                }
              ),
              !g && /* @__PURE__ */ a(X, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  be,
                  {
                    callerName: i,
                    onAnswer: h,
                    onDecline: m
                  }
                ),
                t === "connecting" && /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-3 py-6 px-4", children: [
                  /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                  /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                ] }),
                t === "active" && /* @__PURE__ */ e(
                  we,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: o,
                    duration: c,
                    isMuted: l,
                    isCameraOn: s,
                    isScreenSharing: u,
                    onToggleMute: d,
                    onToggleCamera: p,
                    onToggleScreenShare: w,
                    onUpgradeToVideo: y,
                    onAddParticipant: T,
                    availableParticipants: C,
                    onEndCall: x,
                    layoutComponent: k
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
function Je({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: o = "started",
  onJoin: i,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: s,
  style: u
}) {
  const [h, m] = S(!0);
  return B(() => {
    if (!l || l <= 0) return;
    const x = setTimeout(() => {
      m(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(x);
  }, [l, c]), h ? /* @__PURE__ */ a(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": t,
      className: f(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        s
      ),
      style: u,
      children: [
        /* @__PURE__ */ e(Ce, { name: t, avatarUrl: n }),
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                m(!1), c();
              },
              className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
              "aria-label": "Dismiss call invitation",
              "data-testid": "incoming-call-dismiss",
              children: "Dismiss"
            }
          ),
          i && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                m(!1), i();
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
function Ce({ name: t, avatarUrl: n }) {
  const r = Se(t);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : Le(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function Le(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Se(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function J(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), i = n > 0 ? String(r).padStart(2, "0") : String(r), c = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${i}:${c}` : `${i}:${c}`;
}
function qe({
  playlistUrl: t,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: i,
  onTimeUpdate: c,
  onError: l,
  hideDownload: s = !1,
  className: u
}) {
  const h = R(null), m = R(null), [x, d] = S(!1), [p, w] = S(0), [y, T] = S(0), [C, b] = S(1), [k, g] = S(1), [M, j] = S(!1), [L, A] = S(null);
  B(() => {
    const v = h.current;
    if (!v || !t) return;
    if (A(null), j(!0), v.canPlayType("application/vnd.apple.mpegurl"))
      return v.src = t, () => {
        v.removeAttribute("src"), v.load();
      };
    let N = !1;
    return (async () => {
      try {
        const E = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (N) return;
        if (!E.isSupported()) {
          A("HLS playback is not supported in this browser."), j(!1);
          return;
        }
        const V = new E({ enableWorker: !0 });
        m.current = V, V.attachMedia(v), V.on(E.Events.MEDIA_ATTACHED, () => V.loadSource(t)), V.on(E.Events.ERROR, (W, U) => {
          U.fatal && (A(`HLS error: ${U.type}`), l?.(new Error(`HLS fatal: ${U.type}`)));
        });
      } catch (E) {
        if (N) return;
        A(`Failed to load hls.js — install it in the consumer app: ${E?.message ?? E}`);
      }
    })(), () => {
      if (N = !0, m.current) {
        try {
          m.current.destroy();
        } catch {
        }
        m.current = null;
      }
    };
  }, [t, l]);
  const P = () => {
    const v = h.current;
    v && (v.paused ? v.play().catch(() => {
    }) : v.pause());
  }, $ = (v) => {
    const N = h.current;
    !N || !isFinite(y) || y <= 0 || (N.currentTime = Number(v.target.value));
  }, D = (v) => {
    const N = h.current;
    if (!N) return;
    const E = Number(v.target.value);
    N.volume = E, b(E);
  }, H = (v) => {
    const N = h.current;
    if (!N) return;
    const E = Number(v.target.value);
    N.playbackRate = E, g(E);
  }, O = () => {
    const v = h.current;
    v && (document.fullscreenElement ? document.exitFullscreen() : v.requestFullscreen?.());
  }, _ = ee(
    () => y > 0 ? Math.min(100, p / y * 100) : 0,
    [p, y]
  );
  return /* @__PURE__ */ a("div", { className: f("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", u), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: h,
        autoPlay: r,
        muted: o,
        poster: n,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => d(!0),
        onPause: () => d(!1),
        onLoadedMetadata: (v) => {
          const N = v.currentTarget;
          T(N.duration), j(!1), i?.(N.duration);
        },
        onTimeUpdate: (v) => {
          const N = v.currentTarget;
          w(N.currentTime), c?.(N.currentTime, N.duration);
        },
        onWaiting: () => j(!0),
        onCanPlay: () => j(!1),
        onError: () => {
          A("Playback error."), l?.(new Error("video element error")), j(!1);
        }
      }
    ),
    M && !L && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    L && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: L }),
    /* @__PURE__ */ a("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: J(p) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(y) ? y : 0,
            step: 0.1,
            value: p,
            onChange: $,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${_}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: J(y) })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: P,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": x ? "Pause" : "Play",
            children: x ? /* @__PURE__ */ a("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
              /* @__PURE__ */ e("rect", { x: "2", y: "1", width: "3", height: "12" }),
              /* @__PURE__ */ e("rect", { x: "9", y: "1", width: "3", height: "12" })
            ] }) : /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("polygon", { points: "2,1 12,7 2,13" }) })
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-xs opacity-70", children: "Vol" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: C,
              onChange: D,
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
              /* @__PURE__ */ e("option", { value: 0.5, children: "0.5×" }),
              /* @__PURE__ */ e("option", { value: 1, children: "1×" }),
              /* @__PURE__ */ e("option", { value: 1.5, children: "1.5×" }),
              /* @__PURE__ */ e("option", { value: 2, children: "2×" })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        !s && t && /* @__PURE__ */ e(
          "a",
          {
            href: t,
            download: !0,
            className: "text-white/80 hover:text-white text-xs underline",
            "aria-label": "Download",
            children: "Download"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: O,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Me(t) {
  if (!isFinite(t) || t < 0) return "—";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}h ${r}m` : r > 0 ? `${r}m ${o}s` : `${o}s`;
}
function q(t) {
  if (!t) return "—";
  try {
    const n = new Date(t);
    return new Intl.DateTimeFormat(void 0, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(n);
  } catch {
    return t;
  }
}
function je({ status: t }) {
  return t === "ready" ? null : t === "processing" ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "processing",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
      children: [
        /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }),
        "Processing"
      ]
    }
  ) : /* @__PURE__ */ e(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "failed",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
      children: "Failed"
    }
  );
}
function Ee({
  id: t,
  startIso: n,
  durationSec: r,
  participantCount: o,
  thumbnailUrl: i,
  label: c,
  status: l = "ready",
  selected: s,
  onClick: u,
  actions: h,
  className: m
}) {
  const x = typeof u == "function";
  return /* @__PURE__ */ a(
    "div",
    {
      ...x ? {
        role: "button",
        tabIndex: 0,
        onClick: () => u(t),
        onKeyDown: (p) => {
          x && (p.key === "Enter" || p.key === " ") && (p.preventDefault(), u(t));
        },
        "aria-pressed": s ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: f(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        x && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        s ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        m
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "relative aspect-video rounded bg-black overflow-hidden mb-2", children: [
          i ? /* @__PURE__ */ e(
            "img",
            {
              src: i,
              alt: "",
              className: "w-full h-full object-cover",
              loading: "lazy",
              onError: (p) => {
                p.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(je, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Me(r) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? q(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ a("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: q(n) }),
        h && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (p) => p.stopPropagation(),
            children: h
          }
        )
      ]
    }
  );
}
function Qe({
  recordings: t,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: i,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: [0, 1, 2].map((s) => /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    s
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: f("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: i ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: t.map((s) => /* @__PURE__ */ e(
    Ee,
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
function et({
  getVideoElement: t,
  className: n,
  title: r
}) {
  const [o, i] = S(!1), [c, l] = S(!1);
  B(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), B(() => {
    const h = () => i(!1), m = () => i(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", m), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", m);
    };
  }, []);
  const s = z(async () => {
    if (c)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), i(!1);
          return;
        }
        const h = t();
        if (!h) return;
        h.disablePictureInPicture = !1, await h.requestPictureInPicture(), i(!0);
      } catch {
      }
  }, [c, t]), u = !c;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: s,
      disabled: u,
      title: r ?? (u ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: f(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        u ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        n
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function Te(t) {
  if (!t) return "?";
  const n = t.trim().split(/\s+/);
  return n.length === 1 ? n[0].slice(0, 2).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function tt({
  participants: t,
  activeSpeakerId: n,
  onParticipantClick: r,
  count: o,
  title: i = "Participants",
  footer: c,
  className: l
}) {
  const s = o ?? t.length;
  return /* @__PURE__ */ a(
    "aside",
    {
      className: f(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ a("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: i }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: s })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((u) => {
          const h = u.id === n;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: r ? () => r(u.id) : void 0,
              className: f(
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
                    className: f(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      h && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      u.avatarUrl ? /* @__PURE__ */ e("img", { src: u.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: Te(u.displayName) }),
                      u.isScreenSharing && /* @__PURE__ */ e(
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
                  u.displayName,
                  u.isLocal && /* @__PURE__ */ e("span", { className: "ml-1 text-xs text-[var(--color-text-secondary)]", children: "(you)" })
                ] }),
                u.handRaised && /* @__PURE__ */ e("span", { title: "Hand raised", "aria-label": "Hand raised", children: "✋" }),
                u.isMuted && /* @__PURE__ */ e(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 16 16",
                    className: "text-[var(--color-text-secondary)]",
                    "aria-label": "Muted",
                    children: /* @__PURE__ */ e(
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
          ) }, u.id);
        }) }),
        c && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: c })
      ]
    }
  );
}
let Z = null;
function Ae() {
  if (Z) return Z;
  try {
    return Z = new AudioContext(), Z;
  } catch {
    return null;
  }
}
function nt({
  localStream: t,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: i = 6e3
}) {
  const [c, l] = S(!1);
  return B(() => {
    if (!n || !t || t.getAudioTracks().filter((T) => T.readyState === "live").length === 0) return;
    const u = Ae();
    if (!u) return;
    let h, m;
    try {
      h = u.createMediaStreamSource(t), m = u.createAnalyser(), m.fftSize = 512, m.smoothingTimeConstant = 0.6, h.connect(m);
    } catch {
      return;
    }
    let x = null, d = 0, p = !1;
    const w = new Float32Array(m.frequencyBinCount), y = setInterval(() => {
      if (p) return;
      m.getFloatTimeDomainData(w);
      let T = 0;
      for (let k = 0; k < w.length; k++) T += w[k] * w[k];
      const C = 20 * Math.log10(Math.sqrt(T / w.length)), b = Date.now();
      C > r ? (x == null && (x = b), b - x >= o && b - d > i && (l(!0), d = b, setTimeout(() => {
        p || l(!1);
      }, 3e3), x = null)) : x = null;
    }, 200);
    return () => {
      p = !0, clearInterval(y);
      try {
        h.disconnect();
      } catch {
      }
      try {
        m.disconnect();
      } catch {
      }
    };
  }, [t, n, r, o, i]), B(() => {
    n || l(!1);
  }, [n]), c;
}
function Pe(t, n) {
  const [r, o] = S(0);
  return B(() => {
    if (!t) return;
    const i = (d, p) => {
      console.info("[useTrackStateBump] remote track", d, {
        participant: n,
        kind: p.kind,
        enabled: p.enabled,
        muted: p.muted,
        readyState: p.readyState,
        id: p.id
      }), o((w) => w + 1);
    }, c = (d) => i("mute", d.target), l = (d) => i("unmute", d.target), s = (d) => i("ended", d.target), u = /* @__PURE__ */ new WeakSet(), h = (d) => {
      u.has(d) || (u.add(d), d.addEventListener("mute", c), d.addEventListener("unmute", l), d.addEventListener("ended", s));
    };
    for (const d of t.getVideoTracks()) h(d);
    const m = (d) => {
      const p = d.track;
      p && p.kind === "video" && h(p), o((w) => w + 1);
    }, x = () => o((d) => d + 1);
    return t.addEventListener("addtrack", m), t.addEventListener("removetrack", x), () => {
      for (const d of t.getVideoTracks())
        d.removeEventListener("mute", c), d.removeEventListener("unmute", l), d.removeEventListener("ended", s);
      t.removeEventListener("addtrack", m), t.removeEventListener("removetrack", x);
    };
  }, [t, n]), r;
}
function Be(t) {
  if (!t) return !1;
  const n = t.getVideoTracks();
  return n.length === 0 ? !1 : n.some((r) => r.readyState === "live" && r.enabled && !r.muted);
}
function ne({
  stream: t,
  muted: n = !1,
  videoRef: r,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: i
}) {
  const c = R(null), l = R(i);
  return l.current = i, B(() => {
    const s = c.current;
    if (!s) return;
    s.srcObject !== t && (s.srcObject = t), r && (r.current = s);
    const u = (p) => {
      l.current?.(p);
    }, h = () => u("playing"), m = () => u("ended"), x = () => {
      s.ended && u("ended");
    };
    s.addEventListener("play", h), s.addEventListener("ended", m), s.addEventListener("pause", x);
    const d = s.play();
    return d && typeof d.catch == "function" && d.catch((p) => {
      p?.name === "NotAllowedError" && u("paused-by-autoplay");
    }), () => {
      s.removeEventListener("play", h), s.removeEventListener("ended", m), s.removeEventListener("pause", x), r && r.current === s && (r.current = null);
    };
  }, [t, r]), /* @__PURE__ */ e(
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
const $e = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Ie() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((n) => {
    if (n.paused) {
      const r = n.play();
      r && typeof r.catch == "function" && r.catch(() => {
      });
    }
  });
}
function rt({
  chipLabel: t = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...i
}) {
  const [c, l] = S(!1), s = R(null), h = i.videoRef ?? s, m = z(
    (d) => {
      d === "paused-by-autoplay" ? l(!0) : d === "playing" && l(!1), o?.(d);
    },
    [o]
  ), x = z(() => {
    const d = h.current;
    if (d) {
      d.muted = !1;
      const p = d.play();
      p && typeof p.catch == "function" && p.catch(() => {
      });
    }
    Ie(), l(!1);
  }, [h]);
  return /* @__PURE__ */ a("div", { className: f("relative h-full w-full", r), children: [
    /* @__PURE__ */ e(
      ne,
      {
        ...i,
        videoRef: h,
        onPlayStateChange: m
      }
    ),
    c && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: x,
        className: f($e, n),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
function it({
  stream: t,
  displayName: n,
  cameraOn: r,
  avatarSize: o = 96
}) {
  Pe(t, n);
  const i = Be(t);
  return !r || !i || !t ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ e(oe, { name: n, size: o }) }) : /* @__PURE__ */ e(ne, { stream: t });
}
function ot({ show: t, label: n }) {
  return t ? /* @__PURE__ */ a(
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
function at({ show: t, label: n = "Reconnecting…" }) {
  return t ? /* @__PURE__ */ e(
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
function lt({
  show: t,
  label: n = "You're muted — tap mic to unmute"
}) {
  return t ? /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "mute-while-talking-toast",
      className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-500/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
      role: "alert",
      children: n
    }
  ) : null;
}
const Q = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Re(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) | 0;
  return Q[Math.abs(n) % Q.length];
}
function st({
  lines: t,
  maxLines: n = 3,
  fadeAfterMs: r = 8e3,
  className: o
}) {
  const i = Date.now(), c = t.slice(-n).map((l) => {
    const s = i - new Date(l.at).getTime(), u = Math.max(0.35, 1 - s / r);
    return { ...l, opacity: u };
  }).filter((l) => l.opacity > 0);
  return c.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: f(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: c.map((l) => /* @__PURE__ */ a(
        "div",
        {
          className: f(
            "flex items-baseline gap-2 text-sm transition-opacity",
            l.interim && "italic"
          ),
          style: { opacity: l.opacity },
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Re(l.speakerId) },
                children: l.speakerName ?? l.speakerId.slice(0, 6)
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-white", children: l.text })
          ]
        },
        l.id
      ))
    }
  );
}
export {
  rt as A,
  Je as C,
  lt as M,
  _e as N,
  et as P,
  Ke as R,
  Oe as S,
  st as T,
  Ue as V,
  Ge as a,
  ot as b,
  Ye as c,
  at as d,
  Qe as e,
  qe as f,
  Ee as g,
  it as h,
  tt as i,
  Ze as j,
  ne as k,
  ze as l,
  Xe as m,
  Pe as n,
  Be as s,
  nt as u
};
