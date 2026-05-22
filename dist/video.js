import { jsxs as i, jsx as e, Fragment as F } from "react/jsx-runtime";
import { useRef as W, useState as T, useEffect as E, useMemo as K, useCallback as z } from "react";
import { c as a } from "./cn-B6yFEsav.js";
import { P as J } from "./HangoutLayout-CvkOjsy0.js";
import { H as Ee } from "./HangoutLayout-CvkOjsy0.js";
import { u as De } from "./useActiveSpeaker-Xyga4KBG.js";
const G = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function ke({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: l = !0,
  loop: o = !1,
  controls: c = !1,
  poster: h,
  phase: x,
  className: m,
  style: b,
  onPhaseChange: u,
  onTimeUpdate: v
}) {
  const M = W(null), [S, y] = T("idle"), k = x ?? S;
  E(() => {
    const d = M.current;
    if (!d) return;
    const f = [
      ["waiting", () => {
        y("buffering"), u?.("buffering");
      }],
      ["playing", () => {
        y("playing"), u?.("playing");
      }],
      ["error", () => {
        y("error"), u?.("error");
      }],
      ["loadstart", () => {
        y("connecting"), u?.("connecting");
      }],
      ["timeupdate", () => {
        v?.(d.currentTime, d.duration);
      }]
    ];
    return f.forEach(([s, p]) => d.addEventListener(s, p)), () => f.forEach(([s, p]) => d.removeEventListener(s, p));
  }, [u, v]), E(() => {
    const d = M.current;
    d && n !== void 0 && (d.srcObject = n);
  }, [n]);
  const $ = k !== "playing", g = G[k];
  return /* @__PURE__ */ i(
    "div",
    {
      className: a("relative bg-black rounded-lg overflow-hidden aspect-video", m),
      style: b,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: M,
            src: n ? void 0 : t,
            autoPlay: r,
            muted: l,
            loop: o,
            controls: c,
            poster: h,
            playsInline: !0,
            className: a("w-full h-full object-contain block")
          }
        ),
        $ && g && /* @__PURE__ */ i("div", { className: a("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          k === "buffering" && /* @__PURE__ */ e(Q, {}),
          /* @__PURE__ */ e("span", { className: a(k === "buffering" ? "ml-2" : ""), children: g })
        ] })
      ]
    }
  );
}
function Q() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: a("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function q(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Ne({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: a("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", q(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: a("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([l, o]) => /* @__PURE__ */ i("div", { className: a("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: a("text-[#94a3b8]"), children: l }),
    /* @__PURE__ */ e("span", { className: a("font-mono"), children: o })
  ] }, l)) });
}
const ee = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, te = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, ne = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function Ce({ quality: t, style: n }) {
  const r = ee[t], l = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ i("div", { className: a("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((o) => /* @__PURE__ */ e(
      "rect",
      {
        x: o * 4,
        y: 12 - (o + 1) * 3,
        width: "3",
        height: (o + 1) * 3,
        rx: "0.5",
        fill: o < l ? r : "rgba(255,255,255,0.2)"
      },
      o
    )) }),
    /* @__PURE__ */ e("span", { className: te[t], children: ne[t] })
  ] });
}
function Le({ participants: t, style: n }) {
  const r = t.length, l = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: a("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${l}, 1fr)`, ...n },
      children: t.map((o) => /* @__PURE__ */ e(
        J,
        {
          id: o.id,
          displayName: o.displayName,
          avatarUrl: o.avatarUrl,
          isSpeaking: o.isSpeaking,
          isMuted: o.isMuted,
          isLocal: o.isLocal,
          videoElement: o.videoElement
        },
        o.id
      ))
    }
  );
}
function je({ reactions: t, style: n }) {
  const [r, l] = T([]);
  return E(() => {
    if (t.length === 0) return;
    const o = t[t.length - 1], c = {
      id: o.id + "-" + Date.now(),
      emoji: o.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    l((h) => [...h.slice(-20), c]);
  }, [t]), E(() => {
    const o = setInterval(() => {
      l((c) => c.filter((h) => Date.now() - h.createdAt < 3e3));
    }, 500);
    return () => clearInterval(o);
  }, []), /* @__PURE__ */ e("div", { className: a("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((o) => /* @__PURE__ */ e(
    "span",
    {
      className: a("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${o.x}%` },
      children: o.emoji
    },
    o.id
  )) });
}
const re = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Me({ onReact: t, emojis: n = re, style: r }) {
  return /* @__PURE__ */ e("div", { className: a("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((l) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(l),
      className: a("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (o) => o.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (o) => o.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (o) => o.currentTarget.style.transform = "scale(1)",
      children: l
    },
    l
  )) });
}
function oe(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function ie(t) {
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), l = Math.floor(t % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(l).padStart(2, "0")}` : `${r}:${String(l).padStart(2, "0")}`;
}
const le = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, se = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Be({ phase: t, bitrateBps: n, viewerCount: r, duration: l, style: o }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: a("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: o, children: [
    /* @__PURE__ */ i("span", { className: a("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: a("w-[7px] h-[7px] rounded-full", le[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: a("font-semibold", se[t] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: oe(n) }),
    l !== void 0 && /* @__PURE__ */ e("span", { children: ie(l) }),
    r !== void 0 && /* @__PURE__ */ i("span", { className: a("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function $e({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i("div", { className: a("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
    /* @__PURE__ */ i("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ i("span", { children: [
      r,
      " watching"
    ] })
  ] });
}
function Y(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function ae(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function ce(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function H({ participant: t, size: n = 32 }) {
  const r = ce(t.displayName);
  return /* @__PURE__ */ i(
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
        t.avatarUrl ? /* @__PURE__ */ e("img", { src: t.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : ae(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]" })
      ]
    }
  );
}
function D({
  icon: t,
  label: n,
  active: r = !1,
  danger: l = !1,
  onClick: o,
  disabled: c = !1
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      disabled: c,
      onClick: o,
      className: a(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        l && "bg-red-500 text-white hover:bg-red-600",
        r && !l && "bg-white/20 text-white",
        !r && !l && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function X({ stream: t, muted: n = !1, className: r }) {
  const l = W(null);
  return E(() => {
    const o = l.current;
    o && o.srcObject !== t && (o.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: l,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: a("w-full h-full object-cover", r)
    }
  );
}
const C = {
  mic: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ e("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ e("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ e("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  userPlus: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ e("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] }),
  minimize: /* @__PURE__ */ i("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ e("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ e("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ i("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function de({ callerName: t, onAnswer: n, onDecline: r }) {
  return /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-4 py-5 px-4", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ i("div", { className: "text-center", children: [
      /* @__PURE__ */ e("p", { className: "text-white font-semibold text-sm m-0", children: t || "Incoming call" }),
      /* @__PURE__ */ e("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: C.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: C.phoneAnswer
        }
      )
    ] })
  ] });
}
function he({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: l,
  isMuted: o,
  isCameraOn: c,
  isScreenSharing: h,
  onToggleMute: x,
  onToggleCamera: m,
  onToggleScreenShare: b,
  onUpgradeToVideo: u,
  onAddParticipant: v,
  availableParticipants: M,
  onEndCall: S,
  layoutComponent: y
}) {
  const k = t === "video" && c, [$, g] = T(!1), d = new Set(n.map((s) => s.id)), f = (M || []).filter((s) => !d.has(s.id));
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && y && /* @__PURE__ */ e("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden", children: y }),
    t === "video" && !y && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && k ? /* @__PURE__ */ e(X, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(H, { participant: r, size: 48 }) }),
      n.length > 0 && n[0].videoStream && /* @__PURE__ */ e("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20", children: /* @__PURE__ */ e(X, { stream: n[0].videoStream }) })
    ] }),
    t === "audio" && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 py-4 px-3 flex-wrap", children: [
      n.slice(0, 4).map((s) => /* @__PURE__ */ e(H, { participant: s, size: 36 }, s.id)),
      n.length > 4 && /* @__PURE__ */ i("span", { className: "text-white/50 text-xs font-medium", children: [
        "+",
        n.length - 4
      ] }),
      n.length === 0 && r && /* @__PURE__ */ e(H, { participant: r, size: 40 })
    ] }),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      l !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: Y(l) }),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 px-3 pb-3", children: [
      /* @__PURE__ */ e(
        D,
        {
          icon: o ? C.micOff : C.mic,
          label: o ? "Unmute" : "Mute",
          active: o,
          onClick: x
        }
      ),
      t === "video" && /* @__PURE__ */ e(
        D,
        {
          icon: c ? C.camera : C.cameraOff,
          label: c ? "Turn off camera" : "Turn on camera",
          active: !c,
          onClick: m
        }
      ),
      t === "audio" && u && /* @__PURE__ */ e(
        D,
        {
          icon: C.videoUpgrade,
          label: "Switch to video",
          onClick: u
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          icon: C.screenShare,
          label: h ? "Stop sharing" : "Share screen",
          active: h,
          onClick: b
        }
      ),
      v && /* @__PURE__ */ e(
        D,
        {
          icon: C.userPlus,
          label: "Add participant",
          active: $,
          onClick: () => g((s) => !s)
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          icon: C.phoneEnd,
          label: "End call",
          danger: !0,
          onClick: S
        }
      )
    ] }),
    $ && v && /* @__PURE__ */ i("div", { className: "border-t border-white/5 bg-[#0f172a]/80", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => g(!1),
            className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
            children: "✕"
          }
        )
      ] }),
      f.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: f.map((s) => /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
          onClick: () => {
            v(s.id), f.length <= 1 && g(!1);
          },
          children: [
            /* @__PURE__ */ e(H, { participant: s, size: 22 }),
            /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: s.displayName }),
            /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
          ]
        },
        s.id
      )) })
    ] })
  ] });
}
function ue({
  state: t,
  mode: n,
  participants: r,
  duration: l,
  isMuted: o,
  callerName: c,
  onToggleMute: h,
  onEndCall: x,
  onExpand: m
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: m,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (b) => b.key === "Enter" && m?.(),
      children: [
        /* @__PURE__ */ e("span", { className: a(
          "w-2 h-2 rounded-full shrink-0",
          t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: c || "Incoming call" }) : /* @__PURE__ */ i("span", { className: "text-white text-xs font-medium", children: [
          n === "video" ? "Video" : "Audio",
          " call",
          l !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: Y(l) })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (b) => b.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: h,
              className: a(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(F, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(F, { children: [
                /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: x,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
function fe(t, n = "bottom-right") {
  const [r, l] = T({ x: 0, y: 0 }), [o, c] = T(!1), [h, x] = T(!1), m = W(!1), b = W({ x: 0, y: 0 }), u = W({ x: 0, y: 0 }), v = W(null), M = z((g) => {
    t && (m.current = !0, c(!0), x(!1), b.current = { x: g.clientX, y: g.clientY }, u.current = { ...r }, g.preventDefault());
  }, [t, r]), S = z(() => {
    x(!0), l({ x: 0, y: 0 }), setTimeout(() => x(!1), 200);
  }, []), y = z((g) => {
    const d = v.current;
    if (!d) return;
    const f = d.offsetParent, s = 16;
    let p = window.innerWidth, L = window.innerHeight;
    f && (p = f.clientWidth, L = f.clientHeight);
    const w = d.getBoundingClientRect(), B = f ? f.getBoundingClientRect() : { left: 0, top: 0 };
    let N, j;
    switch (g) {
      case "top-left":
        N = s, j = s;
        break;
      case "top-right":
        N = p - w.width - s, j = s;
        break;
      case "bottom-left":
        N = s, j = L - w.height - s;
        break;
      default:
        N = p - w.width - s, j = L - w.height - s;
        break;
    }
    w.left - B.left, w.top - B.top;
    const A = w.left - B.left - r.x, R = w.top - B.top - r.y;
    x(!0), l({ x: N - A, y: j - R }), setTimeout(() => x(!1), 200);
  }, [r]), k = W(y);
  k.current = y, E(() => {
    if (!t) return;
    const g = (f) => {
      m.current && l({
        x: u.current.x + (f.clientX - b.current.x),
        y: u.current.y + (f.clientY - b.current.y)
      });
    }, d = (f) => {
      if (!m.current) return;
      m.current = !1, c(!1);
      const s = v.current;
      if (!s) return;
      const p = s.offsetParent, L = 80;
      let w = window.innerWidth, B = window.innerHeight;
      if (p) {
        const Z = p.getBoundingClientRect();
        w = Z.width, B = Z.height;
      }
      const N = s.getBoundingClientRect(), j = p ? p.getBoundingClientRect() : { left: 0, top: 0 }, A = N.left - j.left, R = N.top - j.top, O = w - (A + N.width), P = B - (R + N.height), I = A < L, V = O < L, U = R < L, _ = P < L;
      U && I ? k.current("top-left") : U && V ? k.current("top-right") : _ && I ? k.current("bottom-left") : _ && V && k.current("bottom-right");
    };
    return document.addEventListener("mousemove", g), document.addEventListener("mouseup", d), () => {
      document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", d);
    };
  }, [t]);
  const $ = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: M, resetOffset: S, snapToCorner: y, isDragging: o, isAnimating: h, hasMoved: $, widgetRef: v };
}
function ge({ onSnap: t, contained: n }) {
  const r = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: a(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: l, classes: o }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${o} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => t(l),
      title: `Snap to ${l.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    l
  )) });
}
function Se({
  state: t,
  mode: n,
  participants: r,
  localParticipant: l,
  callerName: o,
  duration: c,
  isMuted: h = !1,
  isCameraOn: x = !0,
  isScreenSharing: m = !1,
  onAnswer: b,
  onDecline: u,
  onEndCall: v,
  onToggleMute: M,
  onToggleCamera: S,
  onToggleScreenShare: y,
  onUpgradeToVideo: k,
  onAddParticipant: $,
  availableParticipants: g,
  onMinimize: d,
  layoutComponent: f,
  minimized: s = !1,
  position: p = "bottom-right",
  contained: L = !1,
  draggable: w = !0,
  className: B,
  style: N
}) {
  const { offset: j, handleMouseDown: A, resetOffset: R, snapToCorner: O, isDragging: P, isAnimating: I, hasMoved: V, widgetRef: U } = fe(w, p), _ = K(() => {
    switch (p) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [p]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(F, { children: [
    P && /* @__PURE__ */ e(ge, { onSnap: O, contained: L }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: U,
        className: a(
          L ? "absolute z-50" : "fixed z-[9999]",
          _,
          B
        ),
        style: {
          transform: `translate(${j.x}px, ${j.y}px)`,
          transition: I ? "transform 0.2s ease-out" : void 0,
          ...N
        },
        children: /* @__PURE__ */ i(
          "div",
          {
            className: a(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              s ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !s && /* @__PURE__ */ i(
                "div",
                {
                  className: a(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    w && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: A,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                      V && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: R,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: C.snapBack
                        }
                      ),
                      d && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: d,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: C.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              s && /* @__PURE__ */ e(
                "div",
                {
                  className: a(w && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: A,
                  children: /* @__PURE__ */ e(
                    ue,
                    {
                      state: t,
                      mode: n,
                      participants: r,
                      duration: c,
                      isMuted: h,
                      callerName: o,
                      onToggleMute: M,
                      onEndCall: v,
                      onExpand: d
                    }
                  )
                }
              ),
              !s && /* @__PURE__ */ i(F, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  de,
                  {
                    callerName: o,
                    onAnswer: b,
                    onDecline: u
                  }
                ),
                t === "connecting" && /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 py-6 px-4", children: [
                  /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                  /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                ] }),
                t === "active" && /* @__PURE__ */ e(
                  he,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: l,
                    duration: c,
                    isMuted: h,
                    isCameraOn: x,
                    isScreenSharing: m,
                    onToggleMute: M,
                    onToggleCamera: S,
                    onToggleScreenShare: y,
                    onUpgradeToVideo: k,
                    onAddParticipant: $,
                    availableParticipants: g,
                    onEndCall: v,
                    layoutComponent: f
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
function Ae({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: l = "started",
  onJoin: o,
  onDismiss: c,
  autoExpireSec: h = 30,
  className: x,
  style: m
}) {
  const [b, u] = T(!0);
  return E(() => {
    if (!h || h <= 0) return;
    const v = setTimeout(() => {
      u(!1), c?.();
    }, h * 1e3);
    return () => clearTimeout(v);
  }, [h, c]), b ? /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: a(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        x
      ),
      style: m,
      children: [
        /* @__PURE__ */ e(pe, { name: t, avatarUrl: n }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: l === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                u(!1), c();
              },
              className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
              "aria-label": "Dismiss call invitation",
              children: "Dismiss"
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                u(!1), o();
              },
              className: "text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded",
              "aria-label": "Join call",
              children: "Join"
            }
          )
        ] })
      ]
    }
  ) : null;
}
function pe({ name: t, avatarUrl: n }) {
  const r = me(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : xe(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function xe(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function me(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
export {
  Ae as CallStartedBanner,
  Se as CallWidget,
  Ee as HangoutLayout,
  Ce as NetworkQualityBadge,
  J as ParticipantTile,
  je as ReactionOverlay,
  Me as ReactionPicker,
  Ne as StatsCard,
  Be as StatusStrip,
  Le as VideoGrid,
  ke as VideoPlayer,
  $e as ViewerCount,
  De as useActiveSpeaker
};
