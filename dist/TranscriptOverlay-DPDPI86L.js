import { jsxs as a, jsx as e, Fragment as X } from "react/jsx-runtime";
import { useRef as D, useState as T, useEffect as P, useMemo as ee, useCallback as Z } from "react";
import { c as h } from "./cn-B6yFEsav.js";
import { P as ne } from "./HangoutLayout-DTIq3ne2.js";
import { A as ie } from "./Avatar-BvKIaNVE.js";
const oe = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function We({
  src: t,
  stream: r,
  autoPlay: n = !1,
  muted: o = !0,
  loop: i = !1,
  controls: l = !1,
  poster: s,
  phase: d,
  className: c,
  style: u,
  onPhaseChange: m,
  onTimeUpdate: x
}) {
  const f = D(null), [g, w] = T("idle"), y = d ?? g;
  P(() => {
    const b = f.current;
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
    return k.forEach(([p, M]) => b.addEventListener(p, M)), () => k.forEach(([p, M]) => b.removeEventListener(p, M));
  }, [m, x]), P(() => {
    const b = f.current;
    b && r !== void 0 && (b.srcObject = r);
  }, [r]);
  const E = y !== "playing", C = oe[y];
  return /* @__PURE__ */ a(
    "div",
    {
      className: h("relative bg-black rounded-lg overflow-hidden aspect-video", c),
      style: u,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: f,
            src: r ? void 0 : t,
            autoPlay: n,
            muted: o,
            loop: i,
            controls: l,
            poster: s,
            playsInline: !0,
            className: h("w-full h-full object-contain block")
          }
        ),
        E && C && /* @__PURE__ */ a("div", { className: h("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          y === "buffering" && /* @__PURE__ */ e(ae, {}),
          /* @__PURE__ */ e("span", { className: h(y === "buffering" ? "ml-2" : ""), children: C })
        ] })
      ]
    }
  );
}
function ae() {
  return /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: h("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function le(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Fe({ metrics: t, style: r }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: h("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", le(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && n.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: h("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: r, children: n.map(([o, i]) => /* @__PURE__ */ a("div", { className: h("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: h("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: h("font-mono"), children: i })
  ] }, o)) });
}
const se = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, ce = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, de = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function ze({ quality: t, style: r }) {
  const n = se[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ a("div", { className: h("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: r, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ e(
      "rect",
      {
        x: i * 4,
        y: 12 - (i + 1) * 3,
        width: "3",
        height: (i + 1) * 3,
        rx: "0.5",
        fill: i < o ? n : "rgba(255,255,255,0.2)"
      },
      i
    )) }),
    /* @__PURE__ */ e("span", { className: ce[t], children: de[t] })
  ] });
}
function Oe({ participants: t, style: r }) {
  const n = t.length, o = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: h("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...r },
      children: t.map((i) => /* @__PURE__ */ e(
        ne,
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
function _e({ reactions: t, style: r }) {
  const [n, o] = T([]);
  return P(() => {
    if (t.length === 0) return;
    const i = t[t.length - 1], l = {
      id: i.id + "-" + Date.now(),
      emoji: i.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((s) => [...s.slice(-20), l]);
  }, [t]), P(() => {
    const i = setInterval(() => {
      o((l) => l.filter((s) => Date.now() - s.createdAt < 3e3));
    }, 500);
    return () => clearInterval(i);
  }, []), /* @__PURE__ */ e("div", { className: h("absolute inset-0 pointer-events-none overflow-hidden"), style: r, children: n.map((i) => /* @__PURE__ */ e(
    "span",
    {
      className: h("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${i.x}%` },
      children: i.emoji
    },
    i.id
  )) });
}
const ue = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Ue({ onReact: t, emojis: r = ue, style: n }) {
  return /* @__PURE__ */ e("div", { className: h("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: n, children: r.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: h("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (i) => i.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (i) => i.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (i) => i.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function he(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function fe(t) {
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${n}:${String(o).padStart(2, "0")}`;
}
const me = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, pe = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Ke({ phase: t, bitrateBps: r, viewerCount: n, duration: o, style: i }) {
  const l = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ a("div", { className: h("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: i, children: [
    /* @__PURE__ */ a("span", { className: h("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: h("w-[7px] h-[7px] rounded-full", me[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: h("font-semibold", pe[t] ?? "text-slate-400"), children: l })
    ] }),
    r !== void 0 && /* @__PURE__ */ e("span", { children: he(r) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: fe(o) }),
    n !== void 0 && /* @__PURE__ */ a("span", { className: h("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function Ye({ count: t, style: r }) {
  const n = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ a("div", { className: h("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: r, children: [
    /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ a("span", { children: [
      n,
      " watching"
    ] })
  ] });
}
function te(t) {
  const r = Math.floor(t / 60), n = t % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function ge(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function xe(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function U({ participant: t, size: r = 32 }) {
  const n = xe(t.displayName);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: r,
        height: r,
        fontSize: r * 0.38,
        background: t.avatarUrl ? void 0 : `hsl(${n}, 55%, 45%)`
      },
      children: [
        t.avatarUrl ? /* @__PURE__ */ e("img", { src: t.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : ge(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]" })
      ]
    }
  );
}
function F({
  icon: t,
  label: r,
  active: n = !1,
  danger: o = !1,
  onClick: i,
  disabled: l = !1,
  testId: s
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: r,
      "aria-label": r,
      disabled: l,
      onClick: i,
      "data-testid": s,
      className: h(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        n && !o && "bg-white/20 text-white",
        !n && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        l && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function J({ stream: t, muted: r = !1, className: n }) {
  const o = D(null);
  return P(() => {
    const i = o.current;
    i && i.srcObject !== t && (i.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: h("w-full h-full object-cover", n)
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
function ve({ callerName: t, onAnswer: r, onDecline: n }) {
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
          onClick: n,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: I.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: I.phoneAnswer
        }
      )
    ] })
  ] });
}
function be({
  mode: t,
  participants: r,
  localParticipant: n,
  duration: o,
  isMuted: i,
  isCameraOn: l,
  isScreenSharing: s,
  onToggleMute: d,
  onToggleCamera: c,
  onToggleScreenShare: u,
  onUpgradeToVideo: m,
  onAddParticipant: x,
  availableParticipants: f,
  onEndCall: g,
  layoutComponent: w
}) {
  const y = t === "video" && l, [E, C] = T(!1), b = new Set(r.map((p) => p.id)), k = (f || []).filter((p) => !b.has(p.id));
  return /* @__PURE__ */ a("div", { className: "flex flex-col", children: [
    t === "video" && w && /* @__PURE__ */ e("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden", children: w }),
    t === "video" && !w && /* @__PURE__ */ a("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && y ? /* @__PURE__ */ e(J, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: n && /* @__PURE__ */ e(U, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ a("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        r[0].videoStream ? /* @__PURE__ */ e(J, { stream: r[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(U, { participant: r[0], size: 28 }) }),
        r[0].isMuted && /* @__PURE__ */ e(
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
      r.slice(0, 4).map((p) => /* @__PURE__ */ e(U, { participant: p, size: 36 }, p.id)),
      r.length > 4 && /* @__PURE__ */ a("span", { className: "text-white/50 text-xs font-medium", children: [
        "+",
        r.length - 4
      ] }),
      r.length === 0 && n && /* @__PURE__ */ e(U, { participant: n, size: 40 })
    ] }),
    /* @__PURE__ */ a("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: te(o) }),
      /* @__PURE__ */ a("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
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
          onClick: d,
          testId: "mute-button"
        }
      ),
      t === "video" && /* @__PURE__ */ e(
        F,
        {
          icon: l ? I.camera : I.cameraOff,
          label: l ? "Turn off camera" : "Turn on camera",
          active: !l,
          onClick: c,
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
          label: s ? "Stop sharing" : "Share screen",
          active: s,
          onClick: u,
          testId: "screenshare-button"
        }
      ),
      x && /* @__PURE__ */ e(
        F,
        {
          icon: I.userPlus,
          label: "Add participant",
          active: E,
          onClick: () => C((p) => !p),
          testId: "add-participant-button"
        }
      ),
      /* @__PURE__ */ e(
        F,
        {
          icon: I.phoneEnd,
          label: "End call",
          danger: !0,
          onClick: g,
          testId: "hangup-button"
        }
      )
    ] }),
    E && x && /* @__PURE__ */ a("div", { className: "border-t border-white/5 bg-[#0f172a]/80", children: [
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
      k.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: k.map((p) => /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
          onClick: () => {
            x(p.id), k.length <= 1 && C(!1);
          },
          children: [
            /* @__PURE__ */ e(U, { participant: p, size: 22 }),
            /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: p.displayName }),
            /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
          ]
        },
        p.id
      )) })
    ] })
  ] });
}
function we({
  state: t,
  mode: r,
  participants: n,
  duration: o,
  isMuted: i,
  callerName: l,
  onToggleMute: s,
  onEndCall: d,
  onExpand: c
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: c,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (u) => u.key === "Enter" && c?.(),
      children: [
        /* @__PURE__ */ e("span", { className: h(
          "w-2 h-2 rounded-full shrink-0",
          t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: l || "Incoming call" }) : /* @__PURE__ */ a("span", { className: "text-white text-xs font-medium", children: [
          r === "video" ? "Video" : "Audio",
          " call",
          o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: te(o) })
        ] }) }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1", onClick: (u) => u.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: s,
              className: h(
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
              onClick: d,
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
function ye(t, r = "bottom-right") {
  const [n, o] = T({ x: 0, y: 0 }), [i, l] = T(!1), [s, d] = T(!1), c = D(!1), u = D({ x: 0, y: 0 }), m = D({ x: 0, y: 0 }), x = D(null), f = Z((C) => {
    t && (c.current = !0, l(!0), d(!1), u.current = { x: C.clientX, y: C.clientY }, m.current = { ...n }, C.preventDefault());
  }, [t, n]), g = Z(() => {
    d(!0), o({ x: 0, y: 0 }), setTimeout(() => d(!1), 200);
  }, []), w = Z((C) => {
    const b = x.current;
    if (!b) return;
    const k = b.offsetParent, p = 16;
    let M = window.innerWidth, j = window.innerHeight;
    k && (M = k.clientWidth, j = k.clientHeight);
    const L = b.getBoundingClientRect(), $ = k ? k.getBoundingClientRect() : { left: 0, top: 0 };
    let B, A;
    switch (C) {
      case "top-left":
        B = p, A = p;
        break;
      case "top-right":
        B = M - L.width - p, A = p;
        break;
      case "bottom-left":
        B = p, A = j - L.height - p;
        break;
      default:
        B = M - L.width - p, A = j - L.height - p;
        break;
    }
    L.left - $.left, L.top - $.top;
    const R = L.left - $.left - n.x, H = L.top - $.top - n.y;
    d(!0), o({ x: B - R, y: A - H }), setTimeout(() => d(!1), 200);
  }, [n]), y = D(w);
  y.current = w, P(() => {
    if (!t) return;
    const C = (k) => {
      c.current && o({
        x: m.current.x + (k.clientX - u.current.x),
        y: m.current.y + (k.clientY - u.current.y)
      });
    }, b = (k) => {
      if (!c.current) return;
      c.current = !1, l(!1);
      const p = x.current;
      if (!p) return;
      const M = p.offsetParent, j = 80;
      let L = window.innerWidth, $ = window.innerHeight;
      if (M) {
        const W = M.getBoundingClientRect();
        L = W.width, $ = W.height;
      }
      const B = p.getBoundingClientRect(), A = M ? M.getBoundingClientRect() : { left: 0, top: 0 }, R = B.left - A.left, H = B.top - A.top, z = L - (R + B.width), O = $ - (H + B.height), v = R < j, N = z < j, S = H < j, V = O < j;
      S && v ? y.current("top-left") : S && N ? y.current("top-right") : V && v ? y.current("bottom-left") : V && N && y.current("bottom-right");
    };
    return document.addEventListener("mousemove", C), document.addEventListener("mouseup", b), () => {
      document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", b);
    };
  }, [t]);
  const E = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: f, resetOffset: g, snapToCorner: w, isDragging: i, isAnimating: s, hasMoved: E, widgetRef: x };
}
function ke({ onSnap: t, contained: r }) {
  const n = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: h(r ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: n.map(({ id: o, classes: i }) => /* @__PURE__ */ e(
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
function Ze({
  state: t,
  mode: r,
  participants: n,
  localParticipant: o,
  callerName: i,
  duration: l,
  isMuted: s = !1,
  isCameraOn: d = !0,
  isScreenSharing: c = !1,
  onAnswer: u,
  onDecline: m,
  onEndCall: x,
  onToggleMute: f,
  onToggleCamera: g,
  onToggleScreenShare: w,
  onUpgradeToVideo: y,
  onAddParticipant: E,
  availableParticipants: C,
  onMinimize: b,
  layoutComponent: k,
  minimized: p = !1,
  position: M = "bottom-right",
  contained: j = !1,
  draggable: L = !0,
  className: $,
  style: B,
  dataAttrs: A
}) {
  const { offset: R, handleMouseDown: H, resetOffset: z, snapToCorner: O, isDragging: v, isAnimating: N, hasMoved: S, widgetRef: V } = ye(L, M), W = {};
  if (A)
    for (const [re, K] of Object.entries(A))
      K != null && K !== "" && (W[re] = K);
  const _ = ee(() => {
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
    v && /* @__PURE__ */ e(ke, { onSnap: O, contained: j }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: V,
        className: h(
          j ? "absolute z-50" : "fixed z-[9999]",
          _,
          $
        ),
        style: {
          transform: `translate(${R.x}px, ${R.y}px)`,
          transition: N ? "transform 0.2s ease-out" : void 0,
          ...B
        },
        ...W,
        children: /* @__PURE__ */ a(
          "div",
          {
            className: h(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              p ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !p && /* @__PURE__ */ a(
                "div",
                {
                  className: h(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    L && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: H,
                  children: [
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                      S && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: z,
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
              p && /* @__PURE__ */ e(
                "div",
                {
                  className: h(L && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: H,
                  children: /* @__PURE__ */ e(
                    we,
                    {
                      state: t,
                      mode: r,
                      participants: n,
                      duration: l,
                      isMuted: s,
                      callerName: i,
                      onToggleMute: f,
                      onEndCall: x,
                      onExpand: b
                    }
                  )
                }
              ),
              !p && /* @__PURE__ */ a(X, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  ve,
                  {
                    callerName: i,
                    onAnswer: u,
                    onDecline: m
                  }
                ),
                t === "connecting" && /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-3 py-6 px-4", children: [
                  /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                  /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                ] }),
                t === "active" && /* @__PURE__ */ e(
                  be,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: o,
                    duration: l,
                    isMuted: s,
                    isCameraOn: d,
                    isScreenSharing: c,
                    onToggleMute: f,
                    onToggleCamera: g,
                    onToggleScreenShare: w,
                    onUpgradeToVideo: y,
                    onAddParticipant: E,
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
function Xe({
  callerName: t,
  callerAvatarUrl: r,
  context: n,
  mode: o = "started",
  onJoin: i,
  onDismiss: l,
  autoExpireSec: s = 30,
  className: d,
  style: c
}) {
  const [u, m] = T(!0);
  return P(() => {
    if (!s || s <= 0) return;
    const x = setTimeout(() => {
      m(!1), l?.();
    }, s * 1e3);
    return () => clearTimeout(x);
  }, [s, l]), u ? /* @__PURE__ */ a(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": t,
      className: h(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        d
      ),
      style: c,
      children: [
        /* @__PURE__ */ e(Ne, { name: t, avatarUrl: r }),
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          n && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: n })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          l && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                m(!1), l();
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
function Ne({ name: t, avatarUrl: r }) {
  const n = Le(t);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ e("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : Ce(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function Ce(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function Le(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function G(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), i = r > 0 ? String(n).padStart(2, "0") : String(n), l = String(o).padStart(2, "0");
  return r > 0 ? `${r}:${i}:${l}` : `${i}:${l}`;
}
function Je({
  playlistUrl: t,
  poster: r,
  autoPlay: n = !1,
  muted: o = !1,
  onLoadedMetadata: i,
  onTimeUpdate: l,
  onError: s,
  hideDownload: d = !1,
  className: c
}) {
  const u = D(null), m = D(null), [x, f] = T(!1), [g, w] = T(0), [y, E] = T(0), [C, b] = T(1), [k, p] = T(1), [M, j] = T(!1), [L, $] = T(null);
  P(() => {
    const v = u.current;
    if (!v || !t) return;
    if ($(null), j(!0), v.canPlayType("application/vnd.apple.mpegurl"))
      return v.src = t, () => {
        v.removeAttribute("src"), v.load();
      };
    let N = !1;
    return (async () => {
      try {
        const S = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (N) return;
        if (!S.isSupported()) {
          $("HLS playback is not supported in this browser."), j(!1);
          return;
        }
        const V = new S({ enableWorker: !0 });
        m.current = V, V.attachMedia(v), V.on(S.Events.MEDIA_ATTACHED, () => V.loadSource(t)), V.on(S.Events.ERROR, (W, _) => {
          _.fatal && ($(`HLS error: ${_.type}`), s?.(new Error(`HLS fatal: ${_.type}`)));
        });
      } catch (S) {
        if (N) return;
        $(`Failed to load hls.js — install it in the consumer app: ${S?.message ?? S}`);
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
  }, [t, s]);
  const B = () => {
    const v = u.current;
    v && (v.paused ? v.play().catch(() => {
    }) : v.pause());
  }, A = (v) => {
    const N = u.current;
    !N || !isFinite(y) || y <= 0 || (N.currentTime = Number(v.target.value));
  }, R = (v) => {
    const N = u.current;
    if (!N) return;
    const S = Number(v.target.value);
    N.volume = S, b(S);
  }, H = (v) => {
    const N = u.current;
    if (!N) return;
    const S = Number(v.target.value);
    N.playbackRate = S, p(S);
  }, z = () => {
    const v = u.current;
    v && (document.fullscreenElement ? document.exitFullscreen() : v.requestFullscreen?.());
  }, O = ee(
    () => y > 0 ? Math.min(100, g / y * 100) : 0,
    [g, y]
  );
  return /* @__PURE__ */ a("div", { className: h("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", c), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: u,
        autoPlay: n,
        muted: o,
        poster: r,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => f(!0),
        onPause: () => f(!1),
        onLoadedMetadata: (v) => {
          const N = v.currentTarget;
          E(N.duration), j(!1), i?.(N.duration);
        },
        onTimeUpdate: (v) => {
          const N = v.currentTarget;
          w(N.currentTime), l?.(N.currentTime, N.duration);
        },
        onWaiting: () => j(!0),
        onCanPlay: () => j(!1),
        onError: () => {
          $("Playback error."), s?.(new Error("video element error")), j(!1);
        }
      }
    ),
    M && !L && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    L && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: L }),
    /* @__PURE__ */ a("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: G(g) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(y) ? y : 0,
            step: 0.1,
            value: g,
            onChange: A,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${O}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: G(y) })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: B,
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
              /* @__PURE__ */ e("option", { value: 0.5, children: "0.5×" }),
              /* @__PURE__ */ e("option", { value: 1, children: "1×" }),
              /* @__PURE__ */ e("option", { value: 1.5, children: "1.5×" }),
              /* @__PURE__ */ e("option", { value: 2, children: "2×" })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        !d && t && /* @__PURE__ */ e(
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
            onClick: z,
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
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
function Q(t) {
  if (!t) return "—";
  try {
    const r = new Date(t);
    return new Intl.DateTimeFormat(void 0, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(r);
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
function Se({
  id: t,
  startIso: r,
  durationSec: n,
  participantCount: o,
  thumbnailUrl: i,
  label: l,
  status: s = "ready",
  selected: d,
  onClick: c,
  actions: u,
  className: m
}) {
  const x = typeof c == "function";
  return /* @__PURE__ */ a(
    "div",
    {
      ...x ? {
        role: "button",
        tabIndex: 0,
        onClick: () => c(t),
        onKeyDown: (g) => {
          x && (g.key === "Enter" || g.key === " ") && (g.preventDefault(), c(t));
        },
        "aria-pressed": d ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": s,
      className: h(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        x && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        d ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
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
              onError: (g) => {
                g.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(je, { status: s }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Me(n) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: l ?? Q(r) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ a("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        l && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: Q(r) }),
        u && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (g) => g.stopPropagation(),
            children: u
          }
        )
      ]
    }
  );
}
function Ge({
  recordings: t,
  selectedId: r,
  onSelect: n,
  loading: o,
  emptyState: i,
  renderActions: l,
  className: s
}) {
  return o ? /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", s), children: [0, 1, 2].map((d) => /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    d
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s), children: i ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", s), children: t.map((d) => /* @__PURE__ */ e(
    Se,
    {
      id: d.id,
      startIso: d.startIso,
      endIso: d.endIso,
      durationSec: d.durationSec,
      participantCount: d.participantCount,
      thumbnailUrl: d.thumbnailUrl,
      label: d.label,
      status: d.status,
      selected: d.id === r,
      onClick: n,
      actions: l?.(d)
    },
    d.id
  )) });
}
function Qe({
  getVideoElement: t,
  className: r,
  title: n
}) {
  const [o, i] = T(!1), [l, s] = T(!1);
  P(() => {
    s(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), P(() => {
    const u = () => i(!1), m = () => i(!0);
    return document.addEventListener("leavepictureinpicture", u), document.addEventListener("enterpictureinpicture", m), () => {
      document.removeEventListener("leavepictureinpicture", u), document.removeEventListener("enterpictureinpicture", m);
    };
  }, []);
  const d = Z(async () => {
    if (l)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), i(!1);
          return;
        }
        const u = t();
        if (!u) return;
        u.disablePictureInPicture = !1, await u.requestPictureInPicture(), i(!0);
      } catch {
      }
  }, [l, t]), c = !l;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: d,
      disabled: c,
      title: n ?? (c ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: h(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        c ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function Te(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function qe({
  participants: t,
  activeSpeakerId: r,
  onParticipantClick: n,
  count: o,
  title: i = "Participants",
  footer: l,
  className: s
}) {
  const d = o ?? t.length;
  return /* @__PURE__ */ a(
    "aside",
    {
      className: h(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        s
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ a("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: i }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: d })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((c) => {
          const u = c.id === r;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: n ? () => n(c.id) : void 0,
              className: h(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                u && "bg-white/[0.04]",
                n ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !n,
              children: [
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: h(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      u && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      c.avatarUrl ? /* @__PURE__ */ e("img", { src: c.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: Te(c.displayName) }),
                      c.isScreenSharing && /* @__PURE__ */ e(
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
                  c.displayName,
                  c.isLocal && /* @__PURE__ */ e("span", { className: "ml-1 text-xs text-[var(--color-text-secondary)]", children: "(you)" })
                ] }),
                c.handRaised && /* @__PURE__ */ e("span", { title: "Hand raised", "aria-label": "Hand raised", children: "✋" }),
                c.isMuted && /* @__PURE__ */ e(
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
          ) }, c.id);
        }) }),
        l && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: l })
      ]
    }
  );
}
let Y = null;
function Ee() {
  if (Y) return Y;
  try {
    return Y = new AudioContext(), Y;
  } catch {
    return null;
  }
}
function et({
  localStream: t,
  isMuted: r,
  threshold: n = -45,
  triggerMs: o = 1500,
  cooldownMs: i = 6e3
}) {
  const [l, s] = T(!1);
  return P(() => {
    if (!r || !t || t.getAudioTracks().filter((E) => E.readyState === "live").length === 0) return;
    const c = Ee();
    if (!c) return;
    let u, m;
    try {
      u = c.createMediaStreamSource(t), m = c.createAnalyser(), m.fftSize = 512, m.smoothingTimeConstant = 0.6, u.connect(m);
    } catch {
      return;
    }
    let x = null, f = 0, g = !1;
    const w = new Float32Array(m.frequencyBinCount), y = setInterval(() => {
      if (g) return;
      m.getFloatTimeDomainData(w);
      let E = 0;
      for (let k = 0; k < w.length; k++) E += w[k] * w[k];
      const C = 20 * Math.log10(Math.sqrt(E / w.length)), b = Date.now();
      C > n ? (x == null && (x = b), b - x >= o && b - f > i && (s(!0), f = b, setTimeout(() => {
        g || s(!1);
      }, 3e3), x = null)) : x = null;
    }, 200);
    return () => {
      g = !0, clearInterval(y);
      try {
        u.disconnect();
      } catch {
      }
      try {
        m.disconnect();
      } catch {
      }
    };
  }, [t, r, n, o, i]), P(() => {
    r || s(!1);
  }, [r]), l;
}
function $e(t, r) {
  const [n, o] = T(0);
  return P(() => {
    if (!t) return;
    const i = (f, g) => {
      console.info("[useTrackStateBump] remote track", f, {
        participant: r,
        kind: g.kind,
        enabled: g.enabled,
        muted: g.muted,
        readyState: g.readyState,
        id: g.id
      }), o((w) => w + 1);
    }, l = (f) => i("mute", f.target), s = (f) => i("unmute", f.target), d = (f) => i("ended", f.target), c = /* @__PURE__ */ new WeakSet(), u = (f) => {
      c.has(f) || (c.add(f), f.addEventListener("mute", l), f.addEventListener("unmute", s), f.addEventListener("ended", d));
    };
    for (const f of t.getVideoTracks()) u(f);
    const m = (f) => {
      const g = f.track;
      g && g.kind === "video" && u(g), o((w) => w + 1);
    }, x = () => o((f) => f + 1);
    return t.addEventListener("addtrack", m), t.addEventListener("removetrack", x), () => {
      for (const f of t.getVideoTracks())
        f.removeEventListener("mute", l), f.removeEventListener("unmute", s), f.removeEventListener("ended", d);
      t.removeEventListener("addtrack", m), t.removeEventListener("removetrack", x);
    };
  }, [t, r]), n;
}
function Be(t) {
  if (!t) return !1;
  const r = t.getVideoTracks();
  return r.length === 0 ? !1 : r.some((n) => n.readyState === "live" && n.enabled && !n.muted);
}
function Pe({
  stream: t,
  muted: r = !1,
  videoRef: n,
  className: o = "h-full w-full object-cover"
}) {
  const i = D(null);
  return P(() => {
    const l = i.current;
    return l && l.srcObject !== t && (l.srcObject = t), n && (n.current = l), () => {
      n && n.current === l && (n.current = null);
    };
  }, [t, n]), /* @__PURE__ */ e(
    "video",
    {
      ref: i,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: o
    }
  );
}
function tt({
  stream: t,
  displayName: r,
  cameraOn: n,
  avatarSize: o = 96
}) {
  $e(t, r);
  const i = Be(t);
  return !n || !i || !t ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ e(ie, { name: r, size: o }) }) : /* @__PURE__ */ e(Pe, { stream: t });
}
function rt({ show: t, label: r }) {
  return t ? /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "calling-pill",
      "data-call-status": "calling",
      className: "pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-medium text-white",
      children: [
        "Calling ",
        r || "user",
        "…"
      ]
    }
  ) : null;
}
function nt({ show: t, label: r = "Reconnecting…" }) {
  return t ? /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "hangout-reconnecting-banner",
      className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-amber-500/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
      role: "status",
      "aria-live": "polite",
      children: r
    }
  ) : null;
}
function it({
  show: t,
  label: r = "You're muted — tap mic to unmute"
}) {
  return t ? /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "mute-while-talking-toast",
      className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-500/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
      role: "alert",
      children: r
    }
  ) : null;
}
const q = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Ae(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++) r = r * 31 + t.charCodeAt(n) | 0;
  return q[Math.abs(r) % q.length];
}
function ot({
  lines: t,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: o
}) {
  const i = Date.now(), l = t.slice(-r).map((s) => {
    const d = i - new Date(s.at).getTime(), c = Math.max(0.35, 1 - d / n);
    return { ...s, opacity: c };
  }).filter((s) => s.opacity > 0);
  return l.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: l.map((s) => /* @__PURE__ */ a(
        "div",
        {
          className: h(
            "flex items-baseline gap-2 text-sm transition-opacity",
            s.interim && "italic"
          ),
          style: { opacity: s.opacity },
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Ae(s.speakerId) },
                children: s.speakerName ?? s.speakerId.slice(0, 6)
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-white", children: s.text })
          ]
        },
        s.id
      ))
    }
  );
}
export {
  Xe as C,
  it as M,
  ze as N,
  Qe as P,
  _e as R,
  Fe as S,
  ot as T,
  Oe as V,
  Ze as a,
  rt as b,
  Ue as c,
  nt as d,
  Ge as e,
  Je as f,
  Se as g,
  tt as h,
  qe as i,
  Ke as j,
  Pe as k,
  We as l,
  Ye as m,
  $e as n,
  Be as s,
  et as u
};
