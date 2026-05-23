import { jsxs as o, jsx as e, Fragment as Z } from "react/jsx-runtime";
import { useRef as I, useState as j, useEffect as H, useMemo as q, useCallback as U } from "react";
import { c } from "./cn-B6yFEsav.js";
import { P as te } from "./HangoutLayout-DntwKebh.js";
import { H as Ye } from "./HangoutLayout-DntwKebh.js";
import { u as Ge } from "./useActiveSpeaker-BOwJ262O.js";
const re = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Pe({
  src: t,
  stream: r,
  autoPlay: n = !1,
  muted: a = !0,
  loop: i = !1,
  controls: s = !1,
  poster: l,
  phase: g,
  className: d,
  style: u,
  onPhaseChange: f,
  onTimeUpdate: b
}) {
  const S = I(null), [$, y] = j("idle"), x = g ?? $;
  H(() => {
    const p = S.current;
    if (!p) return;
    const v = [
      ["waiting", () => {
        y("buffering"), f?.("buffering");
      }],
      ["playing", () => {
        y("playing"), f?.("playing");
      }],
      ["error", () => {
        y("error"), f?.("error");
      }],
      ["loadstart", () => {
        y("connecting"), f?.("connecting");
      }],
      ["timeupdate", () => {
        b?.(p.currentTime, p.duration);
      }]
    ];
    return v.forEach(([h, C]) => p.addEventListener(h, C)), () => v.forEach(([h, C]) => p.removeEventListener(h, C));
  }, [f, b]), H(() => {
    const p = S.current;
    p && r !== void 0 && (p.srcObject = r);
  }, [r]);
  const B = x !== "playing", k = re[x];
  return /* @__PURE__ */ o(
    "div",
    {
      className: c("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: u,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: S,
            src: r ? void 0 : t,
            autoPlay: n,
            muted: a,
            loop: i,
            controls: s,
            poster: l,
            playsInline: !0,
            className: c("w-full h-full object-contain block")
          }
        ),
        B && k && /* @__PURE__ */ o("div", { className: c("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          x === "buffering" && /* @__PURE__ */ e(ne, {}),
          /* @__PURE__ */ e("span", { className: c(x === "buffering" ? "ml-2" : ""), children: k })
        ] })
      ]
    }
  );
}
function ne() {
  return /* @__PURE__ */ o("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: c("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function ie(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Te({ metrics: t, style: r }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: c("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", ie(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && n.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: c("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: r, children: n.map(([a, i]) => /* @__PURE__ */ o("div", { className: c("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: c("text-[#94a3b8]"), children: a }),
    /* @__PURE__ */ e("span", { className: c("font-mono"), children: i })
  ] }, a)) });
}
const oe = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, ae = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, le = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function Ae({ quality: t, style: r }) {
  const n = oe[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ o("div", { className: c("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: r, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ e(
      "rect",
      {
        x: i * 4,
        y: 12 - (i + 1) * 3,
        width: "3",
        height: (i + 1) * 3,
        rx: "0.5",
        fill: i < a ? n : "rgba(255,255,255,0.2)"
      },
      i
    )) }),
    /* @__PURE__ */ e("span", { className: ae[t], children: le[t] })
  ] });
}
function Ee({ participants: t, style: r }) {
  const n = t.length, a = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: c("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${a}, 1fr)`, ...r },
      children: t.map((i) => /* @__PURE__ */ e(
        te,
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
function He({ reactions: t, style: r }) {
  const [n, a] = j([]);
  return H(() => {
    if (t.length === 0) return;
    const i = t[t.length - 1], s = {
      id: i.id + "-" + Date.now(),
      emoji: i.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    a((l) => [...l.slice(-20), s]);
  }, [t]), H(() => {
    const i = setInterval(() => {
      a((s) => s.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(i);
  }, []), /* @__PURE__ */ e("div", { className: c("absolute inset-0 pointer-events-none overflow-hidden"), style: r, children: n.map((i) => /* @__PURE__ */ e(
    "span",
    {
      className: c("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${i.x}%` },
      children: i.emoji
    },
    i.id
  )) });
}
const se = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function De({ onReact: t, emojis: r = se, style: n }) {
  return /* @__PURE__ */ e("div", { className: c("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: n, children: r.map((a) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(a),
      className: c("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (i) => i.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (i) => i.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (i) => i.currentTarget.style.transform = "scale(1)",
      children: a
    },
    a
  )) });
}
function ce(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function de(t) {
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = Math.floor(t % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(a).padStart(2, "0")}` : `${n}:${String(a).padStart(2, "0")}`;
}
const ue = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, he = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Re({ phase: t, bitrateBps: r, viewerCount: n, duration: a, style: i }) {
  const s = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ o("div", { className: c("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: i, children: [
    /* @__PURE__ */ o("span", { className: c("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: c("w-[7px] h-[7px] rounded-full", ue[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: c("font-semibold", he[t] ?? "text-slate-400"), children: s })
    ] }),
    r !== void 0 && /* @__PURE__ */ e("span", { children: ce(r) }),
    a !== void 0 && /* @__PURE__ */ e("span", { children: de(a) }),
    n !== void 0 && /* @__PURE__ */ o("span", { className: c("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ o("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function Ie({ count: t, style: r }) {
  const n = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ o("div", { className: c("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: r, children: [
    /* @__PURE__ */ o("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ o("span", { children: [
      n,
      " watching"
    ] })
  ] });
}
function ee(t) {
  const r = Math.floor(t / 60), n = t % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function fe(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function me(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function O({ participant: t, size: r = 32 }) {
  const n = me(t.displayName);
  return /* @__PURE__ */ o(
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
        t.avatarUrl ? /* @__PURE__ */ e("img", { src: t.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : fe(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]" })
      ]
    }
  );
}
function V({
  icon: t,
  label: r,
  active: n = !1,
  danger: a = !1,
  onClick: i,
  disabled: s = !1
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: r,
      "aria-label": r,
      disabled: s,
      onClick: i,
      className: c(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        a && "bg-red-500 text-white hover:bg-red-600",
        n && !a && "bg-white/20 text-white",
        !n && !a && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        s && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function Y({ stream: t, muted: r = !1, className: n }) {
  const a = I(null);
  return H(() => {
    const i = a.current;
    i && i.srcObject !== t && (i.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: a,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: c("w-full h-full object-cover", n)
    }
  );
}
const E = {
  mic: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ e("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ e("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ e("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  userPlus: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ e("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] }),
  minimize: /* @__PURE__ */ o("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ e("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ e("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ o("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function pe({ callerName: t, onAnswer: r, onDecline: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col items-center gap-4 py-5 px-4", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ o("div", { className: "text-center", children: [
      /* @__PURE__ */ e("p", { className: "text-white font-semibold text-sm m-0", children: t || "Incoming call" }),
      /* @__PURE__ */ e("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: E.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: E.phoneAnswer
        }
      )
    ] })
  ] });
}
function ge({
  mode: t,
  participants: r,
  localParticipant: n,
  duration: a,
  isMuted: i,
  isCameraOn: s,
  isScreenSharing: l,
  onToggleMute: g,
  onToggleCamera: d,
  onToggleScreenShare: u,
  onUpgradeToVideo: f,
  onAddParticipant: b,
  availableParticipants: S,
  onEndCall: $,
  layoutComponent: y
}) {
  const x = t === "video" && s, [B, k] = j(!1), p = new Set(r.map((h) => h.id)), v = (S || []).filter((h) => !p.has(h.id));
  return /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
    t === "video" && y && /* @__PURE__ */ e("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden", children: y }),
    t === "video" && !y && /* @__PURE__ */ o("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && x ? /* @__PURE__ */ e(Y, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: n && /* @__PURE__ */ e(O, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        r[0].videoStream ? /* @__PURE__ */ e(Y, { stream: r[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(O, { participant: r[0], size: 28 }) }),
        r[0].isMuted && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ o("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] })
    ] }),
    t === "audio" && /* @__PURE__ */ o("div", { className: "flex items-center justify-center gap-2 py-4 px-3 flex-wrap", children: [
      r.slice(0, 4).map((h) => /* @__PURE__ */ e(O, { participant: h, size: 36 }, h.id)),
      r.length > 4 && /* @__PURE__ */ o("span", { className: "text-white/50 text-xs font-medium", children: [
        "+",
        r.length - 4
      ] }),
      r.length === 0 && n && /* @__PURE__ */ e(O, { participant: n, size: 40 })
    ] }),
    /* @__PURE__ */ o("div", { className: "text-center py-1.5", children: [
      a !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: ee(a) }),
      /* @__PURE__ */ o("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center justify-center gap-2 px-3 pb-3", children: [
      /* @__PURE__ */ e(
        V,
        {
          icon: i ? E.micOff : E.mic,
          label: i ? "Unmute" : "Mute",
          active: i,
          onClick: g
        }
      ),
      t === "video" && /* @__PURE__ */ e(
        V,
        {
          icon: s ? E.camera : E.cameraOff,
          label: s ? "Turn off camera" : "Turn on camera",
          active: !s,
          onClick: d
        }
      ),
      t === "audio" && f && /* @__PURE__ */ e(
        V,
        {
          icon: E.videoUpgrade,
          label: "Switch to video",
          onClick: f
        }
      ),
      /* @__PURE__ */ e(
        V,
        {
          icon: E.screenShare,
          label: l ? "Stop sharing" : "Share screen",
          active: l,
          onClick: u
        }
      ),
      b && /* @__PURE__ */ e(
        V,
        {
          icon: E.userPlus,
          label: "Add participant",
          active: B,
          onClick: () => k((h) => !h)
        }
      ),
      /* @__PURE__ */ e(
        V,
        {
          icon: E.phoneEnd,
          label: "End call",
          danger: !0,
          onClick: $
        }
      )
    ] }),
    B && b && /* @__PURE__ */ o("div", { className: "border-t border-white/5 bg-[#0f172a]/80", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => k(!1),
            className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
            children: "✕"
          }
        )
      ] }),
      v.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: v.map((h) => /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
          onClick: () => {
            b(h.id), v.length <= 1 && k(!1);
          },
          children: [
            /* @__PURE__ */ e(O, { participant: h, size: 22 }),
            /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: h.displayName }),
            /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
          ]
        },
        h.id
      )) })
    ] })
  ] });
}
function xe({
  state: t,
  mode: r,
  participants: n,
  duration: a,
  isMuted: i,
  callerName: s,
  onToggleMute: l,
  onEndCall: g,
  onExpand: d
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: d,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (u) => u.key === "Enter" && d?.(),
      children: [
        /* @__PURE__ */ e("span", { className: c(
          "w-2 h-2 rounded-full shrink-0",
          t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: s || "Incoming call" }) : /* @__PURE__ */ o("span", { className: "text-white text-xs font-medium", children: [
          r === "video" ? "Video" : "Audio",
          " call",
          a !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: ee(a) })
        ] }) }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1", onClick: (u) => u.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: l,
              className: c(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                i ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": i ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: i ? /* @__PURE__ */ o(Z, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ o(Z, { children: [
                /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: g,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ o("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
function ve(t, r = "bottom-right") {
  const [n, a] = j({ x: 0, y: 0 }), [i, s] = j(!1), [l, g] = j(!1), d = I(!1), u = I({ x: 0, y: 0 }), f = I({ x: 0, y: 0 }), b = I(null), S = U((k) => {
    t && (d.current = !0, s(!0), g(!1), u.current = { x: k.clientX, y: k.clientY }, f.current = { ...n }, k.preventDefault());
  }, [t, n]), $ = U(() => {
    g(!0), a({ x: 0, y: 0 }), setTimeout(() => g(!1), 200);
  }, []), y = U((k) => {
    const p = b.current;
    if (!p) return;
    const v = p.offsetParent, h = 16;
    let C = window.innerWidth, L = window.innerHeight;
    v && (C = v.clientWidth, L = v.clientHeight);
    const N = p.getBoundingClientRect(), P = v ? v.getBoundingClientRect() : { left: 0, top: 0 };
    let T, A;
    switch (k) {
      case "top-left":
        T = h, A = h;
        break;
      case "top-right":
        T = C - N.width - h, A = h;
        break;
      case "bottom-left":
        T = h, A = L - N.height - h;
        break;
      default:
        T = C - N.width - h, A = L - N.height - h;
        break;
    }
    N.left - P.left, N.top - P.top;
    const R = N.left - P.left - n.x, W = N.top - P.top - n.y;
    g(!0), a({ x: T - R, y: A - W }), setTimeout(() => g(!1), 200);
  }, [n]), x = I(y);
  x.current = y, H(() => {
    if (!t) return;
    const k = (v) => {
      d.current && a({
        x: f.current.x + (v.clientX - u.current.x),
        y: f.current.y + (v.clientY - u.current.y)
      });
    }, p = (v) => {
      if (!d.current) return;
      d.current = !1, s(!1);
      const h = b.current;
      if (!h) return;
      const C = h.offsetParent, L = 80;
      let N = window.innerWidth, P = window.innerHeight;
      if (C) {
        const K = C.getBoundingClientRect();
        N = K.width, P = K.height;
      }
      const T = h.getBoundingClientRect(), A = C ? C.getBoundingClientRect() : { left: 0, top: 0 }, R = T.left - A.left, W = T.top - A.top, F = N - (R + T.width), z = P - (W + T.height), m = R < L, w = F < L, M = W < L, D = z < L;
      M && m ? x.current("top-left") : M && w ? x.current("top-right") : D && m ? x.current("bottom-left") : D && w && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", k), document.addEventListener("mouseup", p), () => {
      document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", p);
    };
  }, [t]);
  const B = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: S, resetOffset: $, snapToCorner: y, isDragging: i, isAnimating: l, hasMoved: B, widgetRef: b };
}
function be({ onSnap: t, contained: r }) {
  const n = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: c(r ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: n.map(({ id: a, classes: i }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${i} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => t(a),
      title: `Snap to ${a.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    a
  )) });
}
function We({
  state: t,
  mode: r,
  participants: n,
  localParticipant: a,
  callerName: i,
  duration: s,
  isMuted: l = !1,
  isCameraOn: g = !0,
  isScreenSharing: d = !1,
  onAnswer: u,
  onDecline: f,
  onEndCall: b,
  onToggleMute: S,
  onToggleCamera: $,
  onToggleScreenShare: y,
  onUpgradeToVideo: x,
  onAddParticipant: B,
  availableParticipants: k,
  onMinimize: p,
  layoutComponent: v,
  minimized: h = !1,
  position: C = "bottom-right",
  contained: L = !1,
  draggable: N = !0,
  className: P,
  style: T
}) {
  const { offset: A, handleMouseDown: R, resetOffset: W, snapToCorner: F, isDragging: z, isAnimating: m, hasMoved: w, widgetRef: M } = ve(N, C), D = q(() => {
    switch (C) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [C]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ o(Z, { children: [
    z && /* @__PURE__ */ e(be, { onSnap: F, contained: L }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: M,
        className: c(
          L ? "absolute z-50" : "fixed z-[9999]",
          D,
          P
        ),
        style: {
          transform: `translate(${A.x}px, ${A.y}px)`,
          transition: m ? "transform 0.2s ease-out" : void 0,
          ...T
        },
        children: /* @__PURE__ */ o(
          "div",
          {
            className: c(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              h ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !h && /* @__PURE__ */ o(
                "div",
                {
                  className: c(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    N && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: R,
                  children: [
                    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ o("div", { className: "flex items-center gap-1", children: [
                      w && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: W,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: E.snapBack
                        }
                      ),
                      p && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: p,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: E.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              h && /* @__PURE__ */ e(
                "div",
                {
                  className: c(N && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: R,
                  children: /* @__PURE__ */ e(
                    xe,
                    {
                      state: t,
                      mode: r,
                      participants: n,
                      duration: s,
                      isMuted: l,
                      callerName: i,
                      onToggleMute: S,
                      onEndCall: b,
                      onExpand: p
                    }
                  )
                }
              ),
              !h && /* @__PURE__ */ o(Z, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  pe,
                  {
                    callerName: i,
                    onAnswer: u,
                    onDecline: f
                  }
                ),
                t === "connecting" && /* @__PURE__ */ o("div", { className: "flex flex-col items-center gap-3 py-6 px-4", children: [
                  /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                  /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                ] }),
                t === "active" && /* @__PURE__ */ e(
                  ge,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: a,
                    duration: s,
                    isMuted: l,
                    isCameraOn: g,
                    isScreenSharing: d,
                    onToggleMute: S,
                    onToggleCamera: $,
                    onToggleScreenShare: y,
                    onUpgradeToVideo: x,
                    onAddParticipant: B,
                    availableParticipants: k,
                    onEndCall: b,
                    layoutComponent: v
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
function Ve({
  callerName: t,
  callerAvatarUrl: r,
  context: n,
  mode: a = "started",
  onJoin: i,
  onDismiss: s,
  autoExpireSec: l = 30,
  className: g,
  style: d
}) {
  const [u, f] = j(!0);
  return H(() => {
    if (!l || l <= 0) return;
    const b = setTimeout(() => {
      f(!1), s?.();
    }, l * 1e3);
    return () => clearTimeout(b);
  }, [l, s]), u ? /* @__PURE__ */ o(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: c(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        g
      ),
      style: d,
      children: [
        /* @__PURE__ */ e(we, { name: t, avatarUrl: r }),
        /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: a === "calling" ? `${t} is calling you` : `${t} started a call` }),
          n && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: n })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          s && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                f(!1), s();
              },
              className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
              "aria-label": "Dismiss call invitation",
              children: "Dismiss"
            }
          ),
          i && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                f(!1), i();
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
function we({ name: t, avatarUrl: r }) {
  const n = ke(t);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ e("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : ye(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function ye(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function ke(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function J(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = Math.floor(t % 60), i = r > 0 ? String(n).padStart(2, "0") : String(n), s = String(a).padStart(2, "0");
  return r > 0 ? `${r}:${i}:${s}` : `${i}:${s}`;
}
function Fe({
  playlistUrl: t,
  poster: r,
  autoPlay: n = !1,
  muted: a = !1,
  onLoadedMetadata: i,
  onTimeUpdate: s,
  onError: l,
  hideDownload: g = !1,
  className: d
}) {
  const u = I(null), f = I(null), [b, S] = j(!1), [$, y] = j(0), [x, B] = j(0), [k, p] = j(1), [v, h] = j(1), [C, L] = j(!1), [N, P] = j(null);
  H(() => {
    const m = u.current;
    if (!m || !t) return;
    if (P(null), L(!0), m.canPlayType("application/vnd.apple.mpegurl"))
      return m.src = t, () => {
        m.removeAttribute("src"), m.load();
      };
    let w = !1;
    return (async () => {
      try {
        const M = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (w) return;
        if (!M.isSupported()) {
          P("HLS playback is not supported in this browser."), L(!1);
          return;
        }
        const D = new M({ enableWorker: !0 });
        f.current = D, D.attachMedia(m), D.on(M.Events.MEDIA_ATTACHED, () => D.loadSource(t)), D.on(M.Events.ERROR, (K, X) => {
          X.fatal && (P(`HLS error: ${X.type}`), l?.(new Error(`HLS fatal: ${X.type}`)));
        });
      } catch (M) {
        if (w) return;
        P(`Failed to load hls.js — install it in the consumer app: ${M?.message ?? M}`);
      }
    })(), () => {
      if (w = !0, f.current) {
        try {
          f.current.destroy();
        } catch {
        }
        f.current = null;
      }
    };
  }, [t, l]);
  const T = () => {
    const m = u.current;
    m && (m.paused ? m.play().catch(() => {
    }) : m.pause());
  }, A = (m) => {
    const w = u.current;
    !w || !isFinite(x) || x <= 0 || (w.currentTime = Number(m.target.value));
  }, R = (m) => {
    const w = u.current;
    if (!w) return;
    const M = Number(m.target.value);
    w.volume = M, p(M);
  }, W = (m) => {
    const w = u.current;
    if (!w) return;
    const M = Number(m.target.value);
    w.playbackRate = M, h(M);
  }, F = () => {
    const m = u.current;
    m && (document.fullscreenElement ? document.exitFullscreen() : m.requestFullscreen?.());
  }, z = q(
    () => x > 0 ? Math.min(100, $ / x * 100) : 0,
    [$, x]
  );
  return /* @__PURE__ */ o("div", { className: c("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: u,
        autoPlay: n,
        muted: a,
        poster: r,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => S(!0),
        onPause: () => S(!1),
        onLoadedMetadata: (m) => {
          const w = m.currentTarget;
          B(w.duration), L(!1), i?.(w.duration);
        },
        onTimeUpdate: (m) => {
          const w = m.currentTarget;
          y(w.currentTime), s?.(w.currentTime, w.duration);
        },
        onWaiting: () => L(!0),
        onCanPlay: () => L(!1),
        onError: () => {
          P("Playback error."), l?.(new Error("video element error")), L(!1);
        }
      }
    ),
    C && !N && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    N && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: N }),
    /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: J($) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(x) ? x : 0,
            step: 0.1,
            value: $,
            onChange: A,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${z}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: J(x) })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: T,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": b ? "Pause" : "Play",
            children: b ? /* @__PURE__ */ o("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
              /* @__PURE__ */ e("rect", { x: "2", y: "1", width: "3", height: "12" }),
              /* @__PURE__ */ e("rect", { x: "9", y: "1", width: "3", height: "12" })
            ] }) : /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("polygon", { points: "2,1 12,7 2,13" }) })
          }
        ),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-xs opacity-70", children: "Vol" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: k,
              onChange: R,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ o(
          "select",
          {
            value: v,
            onChange: W,
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
        !g && t && /* @__PURE__ */ e(
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
            onClick: F,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Ne(t) {
  if (!isFinite(t) || t < 0) return "—";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), a = Math.floor(t % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${a}s` : `${a}s`;
}
function G(t) {
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
function ze({
  recordings: t,
  selectedId: r,
  onSelect: n,
  loading: a,
  emptyState: i,
  className: s
}) {
  return a ? /* @__PURE__ */ e("div", { className: c("flex flex-col gap-2", s), children: [0, 1, 2].map((l) => /* @__PURE__ */ o(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    l
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: c("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s), children: i ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: c("flex flex-col gap-2", s), children: t.map((l) => {
    const g = l.id === r;
    return /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => n(l.id),
        className: c(
          "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
          "hover:border-[var(--color-primary)] hover:bg-white/[0.02]",
          g ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]"
        ),
        "aria-pressed": g,
        children: [
          /* @__PURE__ */ o("div", { className: "relative aspect-video rounded bg-black overflow-hidden mb-2", children: [
            l.thumbnailUrl ? /* @__PURE__ */ e(
              "img",
              {
                src: l.thumbnailUrl,
                alt: "",
                className: "w-full h-full object-cover",
                loading: "lazy",
                onError: (d) => {
                  d.currentTarget.style.display = "none";
                }
              }
            ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
            /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Ne(l.durationSec) })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: l.label ?? G(l.startIso) }),
            typeof l.participantCount == "number" && l.participantCount > 0 && /* @__PURE__ */ o("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
              l.participantCount,
              " 👥"
            ] })
          ] }),
          l.label && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: G(l.startIso) })
        ]
      },
      l.id
    );
  }) });
}
function Oe({
  getVideoElement: t,
  className: r,
  title: n
}) {
  const [a, i] = j(!1), [s, l] = j(!1);
  H(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), H(() => {
    const u = () => i(!1), f = () => i(!0);
    return document.addEventListener("leavepictureinpicture", u), document.addEventListener("enterpictureinpicture", f), () => {
      document.removeEventListener("leavepictureinpicture", u), document.removeEventListener("enterpictureinpicture", f);
    };
  }, []);
  const g = U(async () => {
    if (s)
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
  }, [s, t]), d = !s;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: g,
      disabled: d,
      title: n ?? (d ? "Picture-in-Picture not supported" : a ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": a ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": a,
      className: c(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function Ce(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function _e({
  participants: t,
  activeSpeakerId: r,
  onParticipantClick: n,
  count: a,
  title: i = "Participants",
  footer: s,
  className: l
}) {
  const g = a ?? t.length;
  return /* @__PURE__ */ o(
    "aside",
    {
      className: c(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ o("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: i }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: g })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((d) => {
          const u = d.id === r;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              onClick: n ? () => n(d.id) : void 0,
              className: c(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                u && "bg-white/[0.04]",
                n ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !n,
              children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    className: c(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      u && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      d.avatarUrl ? /* @__PURE__ */ e("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: Ce(d.displayName) }),
                      d.isScreenSharing && /* @__PURE__ */ e(
                        "span",
                        {
                          title: "Sharing screen",
                          className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-[var(--color-surface)]"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ o("span", { className: "flex-1 truncate text-sm text-[var(--color-text-primary)]", children: [
                  d.displayName,
                  d.isLocal && /* @__PURE__ */ e("span", { className: "ml-1 text-xs text-[var(--color-text-secondary)]", children: "(you)" })
                ] }),
                d.handRaised && /* @__PURE__ */ e("span", { title: "Hand raised", "aria-label": "Hand raised", children: "✋" }),
                d.isMuted && /* @__PURE__ */ e(
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
          ) }, d.id);
        }) }),
        s && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: s })
      ]
    }
  );
}
let _ = null;
function Le() {
  if (_) return _;
  try {
    return _ = new AudioContext(), _;
  } catch {
    return null;
  }
}
function Ue({
  localStream: t,
  isMuted: r,
  threshold: n = -45,
  triggerMs: a = 1500,
  cooldownMs: i = 6e3
}) {
  const [s, l] = j(!1);
  return H(() => {
    if (!r || !t || t.getAudioTracks().filter((B) => B.readyState === "live").length === 0) return;
    const d = Le();
    if (!d) return;
    let u, f;
    try {
      u = d.createMediaStreamSource(t), f = d.createAnalyser(), f.fftSize = 512, f.smoothingTimeConstant = 0.6, u.connect(f);
    } catch {
      return;
    }
    let b = null, S = 0, $ = !1;
    const y = new Float32Array(f.frequencyBinCount), x = setInterval(() => {
      if ($) return;
      f.getFloatTimeDomainData(y);
      let B = 0;
      for (let v = 0; v < y.length; v++) B += y[v] * y[v];
      const k = 20 * Math.log10(Math.sqrt(B / y.length)), p = Date.now();
      k > n ? (b == null && (b = p), p - b >= a && p - S > i && (l(!0), S = p, setTimeout(() => {
        $ || l(!1);
      }, 3e3), b = null)) : b = null;
    }, 200);
    return () => {
      $ = !0, clearInterval(x);
      try {
        u.disconnect();
      } catch {
      }
      try {
        f.disconnect();
      } catch {
      }
    };
  }, [t, r, n, a, i]), H(() => {
    r || l(!1);
  }, [r]), s;
}
const Q = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Me(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++) r = r * 31 + t.charCodeAt(n) | 0;
  return Q[Math.abs(r) % Q.length];
}
function Ze({
  lines: t,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: a
}) {
  const i = Date.now(), s = t.slice(-r).map((l) => {
    const g = i - new Date(l.at).getTime(), d = Math.max(0.35, 1 - g / n);
    return { ...l, opacity: d };
  }).filter((l) => l.opacity > 0);
  return s.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: c(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        a
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: s.map((l) => /* @__PURE__ */ o(
        "div",
        {
          className: c(
            "flex items-baseline gap-2 text-sm transition-opacity",
            l.interim && "italic"
          ),
          style: { opacity: l.opacity },
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Me(l.speakerId) },
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
  Ve as CallStartedBanner,
  We as CallWidget,
  Ye as HangoutLayout,
  Ae as NetworkQualityBadge,
  te as ParticipantTile,
  Oe as PiPButton,
  He as ReactionOverlay,
  De as ReactionPicker,
  ze as RecordingList,
  Fe as RecordingPlayer,
  _e as RosterPanel,
  Te as StatsCard,
  Re as StatusStrip,
  Ze as TranscriptOverlay,
  Ee as VideoGrid,
  Pe as VideoPlayer,
  Ie as ViewerCount,
  Ge as useActiveSpeaker,
  Ue as useMuteWhileTalking
};
