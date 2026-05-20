import { jsxs as l, jsx as e, Fragment as O } from "react/jsx-runtime";
import { useRef as T, useState as A, useEffect as E, useMemo as K, useCallback as Z } from "react";
import { c as a } from "./cn-B6yFEsav.js";
import { u as _e } from "./useActiveSpeaker-Xyga4KBG.js";
const Q = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Ce({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: i = !0,
  loop: o = !1,
  controls: c = !1,
  poster: u,
  phase: f,
  className: s,
  style: m,
  onPhaseChange: g,
  onTimeUpdate: p
}) {
  const N = T(null), [B, w] = A("idle"), v = f ?? B;
  E(() => {
    const x = N.current;
    if (!x) return;
    const b = [
      ["waiting", () => {
        w("buffering"), g?.("buffering");
      }],
      ["playing", () => {
        w("playing"), g?.("playing");
      }],
      ["error", () => {
        w("error"), g?.("error");
      }],
      ["loadstart", () => {
        w("connecting"), g?.("connecting");
      }],
      ["timeupdate", () => {
        p?.(x.currentTime, x.duration);
      }]
    ];
    return b.forEach(([d, y]) => x.addEventListener(d, y)), () => b.forEach(([d, y]) => x.removeEventListener(d, y));
  }, [g, p]), E(() => {
    const x = N.current;
    x && n !== void 0 && (x.srcObject = n);
  }, [n]);
  const $ = v !== "playing", h = Q[v];
  return /* @__PURE__ */ l(
    "div",
    {
      className: a("relative bg-black rounded-lg overflow-hidden aspect-video", s),
      style: m,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: N,
            src: n ? void 0 : t,
            autoPlay: r,
            muted: i,
            loop: o,
            controls: c,
            poster: u,
            playsInline: !0,
            className: a("w-full h-full object-contain block")
          }
        ),
        $ && h && /* @__PURE__ */ l("div", { className: a("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          v === "buffering" && /* @__PURE__ */ e(q, {}),
          /* @__PURE__ */ e("span", { className: a(v === "buffering" ? "ml-2" : ""), children: h })
        ] })
      ]
    }
  );
}
function q() {
  return /* @__PURE__ */ l("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: a("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function P(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Me({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: a("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", P(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: a("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([i, o]) => /* @__PURE__ */ l("div", { className: a("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: a("text-[#94a3b8]"), children: i }),
    /* @__PURE__ */ e("span", { className: a("font-mono"), children: o })
  ] }, i)) });
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
function je({ quality: t, style: n }) {
  const r = ee[t], i = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ l("div", { className: a("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((o) => /* @__PURE__ */ e(
      "rect",
      {
        x: o * 4,
        y: 12 - (o + 1) * 3,
        width: "3",
        height: (o + 1) * 3,
        rx: "0.5",
        fill: o < i ? r : "rgba(255,255,255,0.2)"
      },
      o
    )) }),
    /* @__PURE__ */ e("span", { className: te[t], children: ne[t] })
  ] });
}
function R({
  displayName: t,
  avatarUrl: n,
  isSpeaking: r = !1,
  isMuted: i = !1,
  isLocal: o = !1,
  isSpotlight: c = !1,
  videoElement: u,
  onClick: f,
  className: s,
  style: m
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: a(
        "relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors",
        "aspect-video",
        r ? "border-[#22c55e]" : "border-transparent",
        f && "cursor-pointer hover:border-white/30",
        s
      ),
      style: m,
      onClick: f,
      role: f ? "button" : void 0,
      tabIndex: f ? 0 : void 0,
      onKeyDown: f ? (g) => {
        (g.key === "Enter" || g.key === " ") && f();
      } : void 0,
      children: [
        u ?? /* @__PURE__ */ e(
          "div",
          {
            className: a(
              "rounded-full flex items-center justify-center text-white font-semibold",
              c ? "w-16 h-16 text-2xl" : "w-10 h-10 text-base"
            ),
            style: { background: re(t) },
            children: n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: a("w-full h-full rounded-full object-cover") }) : t.charAt(0).toUpperCase()
          }
        ),
        /* @__PURE__ */ l("div", { className: a("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden"), children: [
          o && /* @__PURE__ */ e("span", { className: a("text-[#60a5fa] truncate"), children: "You" }),
          !o && /* @__PURE__ */ e("span", { className: "truncate", children: t }),
          i && /* @__PURE__ */ e("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: /* @__PURE__ */ e("path", { d: "M1 1l8 8M5 1v4.5", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" }) })
        ] }),
        r && /* @__PURE__ */ e("div", { className: a("absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]") })
      ]
    }
  );
}
function re(t) {
  let n = 0;
  for (let i = 0; i < t.length; i++)
    n = t.charCodeAt(i) + ((n << 5) - n);
  return `hsl(${Math.abs(n) % 360}, 55%, 45%)`;
}
function Be({ participants: t, style: n }) {
  const r = t.length, i = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: a("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${i}, 1fr)`, ...n },
      children: t.map((o) => /* @__PURE__ */ e(
        R,
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
function $e({ reactions: t, style: n }) {
  const [r, i] = A([]);
  return E(() => {
    if (t.length === 0) return;
    const o = t[t.length - 1], c = {
      id: o.id + "-" + Date.now(),
      emoji: o.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    i((u) => [...u.slice(-20), c]);
  }, [t]), E(() => {
    const o = setInterval(() => {
      i((c) => c.filter((u) => Date.now() - u.createdAt < 3e3));
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
const oe = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Se({ onReact: t, emojis: n = oe, style: r }) {
  return /* @__PURE__ */ e("div", { className: a("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((i) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(i),
      className: a("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (o) => o.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (o) => o.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (o) => o.currentTarget.style.transform = "scale(1)",
      children: i
    },
    i
  )) });
}
function ie(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function le(t) {
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = Math.floor(t % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
const se = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, ae = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Ae({ phase: t, bitrateBps: n, viewerCount: r, duration: i, style: o }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ l("div", { className: a("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: o, children: [
    /* @__PURE__ */ l("span", { className: a("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: a("w-[7px] h-[7px] rounded-full", se[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: a("font-semibold", ae[t] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: ie(n) }),
    i !== void 0 && /* @__PURE__ */ e("span", { children: le(i) }),
    r !== void 0 && /* @__PURE__ */ l("span", { className: a("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ l("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function Ee({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ l("div", { className: a("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
    /* @__PURE__ */ l("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ l("span", { children: [
      r,
      " watching"
    ] })
  ] });
}
function G(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function ce(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function de(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function I({ participant: t, size: n = 32 }) {
  const r = de(t.displayName);
  return /* @__PURE__ */ l(
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
        t.avatarUrl ? /* @__PURE__ */ e("img", { src: t.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : ce(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]" })
      ]
    }
  );
}
function D({
  icon: t,
  label: n,
  active: r = !1,
  danger: i = !1,
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
        i && "bg-red-500 text-white hover:bg-red-600",
        r && !i && "bg-white/20 text-white",
        !r && !i && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function J({ stream: t, muted: n = !1, className: r }) {
  const i = T(null);
  return E(() => {
    const o = i.current;
    o && o.srcObject !== t && (o.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: i,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: a("w-full h-full object-cover", r)
    }
  );
}
const C = {
  mic: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ e("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ e("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ e("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  userPlus: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ e("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] }),
  minimize: /* @__PURE__ */ l("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ e("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ e("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ l("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function he({ callerName: t, onAnswer: n, onDecline: r }) {
  return /* @__PURE__ */ l("div", { className: "flex flex-col items-center gap-4 py-5 px-4", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ l("div", { className: "text-center", children: [
      /* @__PURE__ */ e("p", { className: "text-white font-semibold text-sm m-0", children: t || "Incoming call" }),
      /* @__PURE__ */ e("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ l("div", { className: "flex gap-4", children: [
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
function ue({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: i,
  isMuted: o,
  isCameraOn: c,
  isScreenSharing: u,
  onToggleMute: f,
  onToggleCamera: s,
  onToggleScreenShare: m,
  onUpgradeToVideo: g,
  onAddParticipant: p,
  availableParticipants: N,
  onEndCall: B,
  layoutComponent: w
}) {
  const v = t === "video" && c, [$, h] = A(!1), x = new Set(n.map((d) => d.id)), b = (N || []).filter((d) => !x.has(d.id));
  return /* @__PURE__ */ l("div", { className: "flex flex-col", children: [
    t === "video" && w && /* @__PURE__ */ e("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden", children: w }),
    t === "video" && !w && /* @__PURE__ */ l("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && v ? /* @__PURE__ */ e(J, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(I, { participant: r, size: 48 }) }),
      n.length > 0 && n[0].videoStream && /* @__PURE__ */ e("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20", children: /* @__PURE__ */ e(J, { stream: n[0].videoStream }) })
    ] }),
    t === "audio" && /* @__PURE__ */ l("div", { className: "flex items-center justify-center gap-2 py-4 px-3 flex-wrap", children: [
      n.slice(0, 4).map((d) => /* @__PURE__ */ e(I, { participant: d, size: 36 }, d.id)),
      n.length > 4 && /* @__PURE__ */ l("span", { className: "text-white/50 text-xs font-medium", children: [
        "+",
        n.length - 4
      ] }),
      n.length === 0 && r && /* @__PURE__ */ e(I, { participant: r, size: 40 })
    ] }),
    /* @__PURE__ */ l("div", { className: "text-center py-1.5", children: [
      i !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: G(i) }),
      /* @__PURE__ */ l("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: "flex items-center justify-center gap-2 px-3 pb-3", children: [
      /* @__PURE__ */ e(
        D,
        {
          icon: o ? C.micOff : C.mic,
          label: o ? "Unmute" : "Mute",
          active: o,
          onClick: f
        }
      ),
      t === "video" && /* @__PURE__ */ e(
        D,
        {
          icon: c ? C.camera : C.cameraOff,
          label: c ? "Turn off camera" : "Turn on camera",
          active: !c,
          onClick: s
        }
      ),
      t === "audio" && g && /* @__PURE__ */ e(
        D,
        {
          icon: C.videoUpgrade,
          label: "Switch to video",
          onClick: g
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          icon: C.screenShare,
          label: u ? "Stop sharing" : "Share screen",
          active: u,
          onClick: m
        }
      ),
      p && /* @__PURE__ */ e(
        D,
        {
          icon: C.userPlus,
          label: "Add participant",
          active: $,
          onClick: () => h((d) => !d)
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          icon: C.phoneEnd,
          label: "End call",
          danger: !0,
          onClick: B
        }
      )
    ] }),
    $ && p && /* @__PURE__ */ l("div", { className: "border-t border-white/5 bg-[#0f172a]/80", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => h(!1),
            className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
            children: "✕"
          }
        )
      ] }),
      b.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: b.map((d) => /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
          onClick: () => {
            p(d.id), b.length <= 1 && h(!1);
          },
          children: [
            /* @__PURE__ */ e(I, { participant: d, size: 22 }),
            /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: d.displayName }),
            /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
          ]
        },
        d.id
      )) })
    ] })
  ] });
}
function fe({
  state: t,
  mode: n,
  participants: r,
  duration: i,
  isMuted: o,
  callerName: c,
  onToggleMute: u,
  onEndCall: f,
  onExpand: s
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: s,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (m) => m.key === "Enter" && s?.(),
      children: [
        /* @__PURE__ */ e("span", { className: a(
          "w-2 h-2 rounded-full shrink-0",
          t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: c || "Incoming call" }) : /* @__PURE__ */ l("span", { className: "text-white text-xs font-medium", children: [
          n === "video" ? "Video" : "Audio",
          " call",
          i !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: G(i) })
        ] }) }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-1", onClick: (m) => m.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              className: a(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ l(O, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ l(O, { children: [
                /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: f,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ l("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
function me(t, n = "bottom-right") {
  const [r, i] = A({ x: 0, y: 0 }), [o, c] = A(!1), [u, f] = A(!1), s = T(!1), m = T({ x: 0, y: 0 }), g = T({ x: 0, y: 0 }), p = T(null), N = Z((h) => {
    t && (s.current = !0, c(!0), f(!1), m.current = { x: h.clientX, y: h.clientY }, g.current = { ...r }, h.preventDefault());
  }, [t, r]), B = Z(() => {
    f(!0), i({ x: 0, y: 0 }), setTimeout(() => f(!1), 200);
  }, []), w = Z((h) => {
    const x = p.current;
    if (!x) return;
    const b = x.offsetParent, d = 16;
    let y = window.innerWidth, M = window.innerHeight;
    b && (y = b.clientWidth, M = b.clientHeight);
    const k = x.getBoundingClientRect(), S = b ? b.getBoundingClientRect() : { left: 0, top: 0 };
    let L, j;
    switch (h) {
      case "top-left":
        L = d, j = d;
        break;
      case "top-right":
        L = y - k.width - d, j = d;
        break;
      case "bottom-left":
        L = d, j = M - k.height - d;
        break;
      default:
        L = y - k.width - d, j = M - k.height - d;
        break;
    }
    k.left - S.left, k.top - S.top;
    const W = k.left - S.left - r.x, U = k.top - S.top - r.y;
    f(!0), i({ x: L - W, y: j - U }), setTimeout(() => f(!1), 200);
  }, [r]), v = T(w);
  v.current = w, E(() => {
    if (!t) return;
    const h = (b) => {
      s.current && i({
        x: g.current.x + (b.clientX - m.current.x),
        y: g.current.y + (b.clientY - m.current.y)
      });
    }, x = (b) => {
      if (!s.current) return;
      s.current = !1, c(!1);
      const d = p.current;
      if (!d) return;
      const y = d.offsetParent, M = 80;
      let k = window.innerWidth, S = window.innerHeight;
      if (y) {
        const X = y.getBoundingClientRect();
        k = X.width, S = X.height;
      }
      const L = d.getBoundingClientRect(), j = y ? y.getBoundingClientRect() : { left: 0, top: 0 }, W = L.left - j.left, U = L.top - j.top, z = k - (W + L.width), Y = S - (U + L.height), _ = W < M, V = z < M, F = U < M, H = Y < M;
      F && _ ? v.current("top-left") : F && V ? v.current("top-right") : H && _ ? v.current("bottom-left") : H && V && v.current("bottom-right");
    };
    return document.addEventListener("mousemove", h), document.addEventListener("mouseup", x), () => {
      document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", x);
    };
  }, [t]);
  const $ = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: N, resetOffset: B, snapToCorner: w, isDragging: o, isAnimating: u, hasMoved: $, widgetRef: p };
}
function ge({ onSnap: t, contained: n }) {
  const r = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: a(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: i, classes: o }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${o} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => t(i),
      title: `Snap to ${i.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    i
  )) });
}
function We({
  state: t,
  mode: n,
  participants: r,
  localParticipant: i,
  callerName: o,
  duration: c,
  isMuted: u = !1,
  isCameraOn: f = !0,
  isScreenSharing: s = !1,
  onAnswer: m,
  onDecline: g,
  onEndCall: p,
  onToggleMute: N,
  onToggleCamera: B,
  onToggleScreenShare: w,
  onUpgradeToVideo: v,
  onAddParticipant: $,
  availableParticipants: h,
  onMinimize: x,
  layoutComponent: b,
  minimized: d = !1,
  position: y = "bottom-right",
  contained: M = !1,
  draggable: k = !0,
  className: S,
  style: L
}) {
  const { offset: j, handleMouseDown: W, resetOffset: U, snapToCorner: z, isDragging: Y, isAnimating: _, hasMoved: V, widgetRef: F } = me(k, y), H = K(() => {
    switch (y) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [y]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ l(O, { children: [
    Y && /* @__PURE__ */ e(ge, { onSnap: z, contained: M }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: F,
        className: a(
          M ? "absolute z-50" : "fixed z-[9999]",
          H,
          S
        ),
        style: {
          transform: `translate(${j.x}px, ${j.y}px)`,
          transition: _ ? "transform 0.2s ease-out" : void 0,
          ...L
        },
        children: /* @__PURE__ */ l(
          "div",
          {
            className: a(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              d ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !d && /* @__PURE__ */ l(
                "div",
                {
                  className: a(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    k && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: W,
                  children: [
                    /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ l("div", { className: "flex items-center gap-1", children: [
                      V && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: U,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: C.snapBack
                        }
                      ),
                      x && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: x,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: C.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              d && /* @__PURE__ */ e(
                "div",
                {
                  className: a(k && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: W,
                  children: /* @__PURE__ */ e(
                    fe,
                    {
                      state: t,
                      mode: n,
                      participants: r,
                      duration: c,
                      isMuted: u,
                      callerName: o,
                      onToggleMute: N,
                      onEndCall: p,
                      onExpand: x
                    }
                  )
                }
              ),
              !d && /* @__PURE__ */ l(O, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  he,
                  {
                    callerName: o,
                    onAnswer: m,
                    onDecline: g
                  }
                ),
                t === "connecting" && /* @__PURE__ */ l("div", { className: "flex flex-col items-center gap-3 py-6 px-4", children: [
                  /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                  /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                ] }),
                t === "active" && /* @__PURE__ */ e(
                  ue,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: i,
                    duration: c,
                    isMuted: u,
                    isCameraOn: f,
                    isScreenSharing: s,
                    onToggleMute: N,
                    onToggleCamera: B,
                    onToggleScreenShare: w,
                    onUpgradeToVideo: v,
                    onAddParticipant: $,
                    availableParticipants: h,
                    onEndCall: p,
                    layoutComponent: b
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
function Te({
  participants: t,
  localParticipant: n = null,
  mode: r = "auto",
  activeSpeakerId: i = null,
  speakerHysteresisMs: o = 750,
  spotlightContent: c,
  onParticipantClick: u,
  className: f,
  style: s
}) {
  const m = c ? "spotlight" : r, g = ve(i, o), p = t.length, N = !!n && p === 0, B = !!n && p >= 3, w = !!n && p > 0 && p <= 2;
  if (m === "spotlight")
    return /* @__PURE__ */ e(
      xe,
      {
        participants: t,
        localParticipant: n,
        spotlightContent: c,
        spotlightParticipantId: g,
        onParticipantClick: u,
        className: f,
        style: s
      }
    );
  const v = K(() => {
    if (N && n) return [{ ...n, isLocal: !0 }];
    const h = [...t];
    return B && n && h.push({ ...n, isLocal: !0 }), h;
  }, [t, N, B, n]), $ = pe(v.length);
  return /* @__PURE__ */ l(
    "div",
    {
      className: a("relative grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", f),
      style: { gridTemplateColumns: `repeat(${$}, 1fr)`, ...s },
      children: [
        v.map((h) => /* @__PURE__ */ e(
          R,
          {
            id: h.id,
            displayName: h.displayName,
            avatarUrl: h.avatarUrl,
            isSpeaking: h.id === i,
            isMuted: h.isMuted,
            isLocal: h.isLocal,
            videoElement: h.videoElement,
            onClick: u ? () => u(h.id) : void 0
          },
          h.id
        )),
        v.length === 0 && /* @__PURE__ */ e("div", { className: "aspect-video flex items-center justify-center text-white/40 text-sm", children: "Waiting for others to join…" }),
        w && n && /* @__PURE__ */ e("div", { className: "absolute bottom-2 right-2 w-24 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10", children: /* @__PURE__ */ e(
          R,
          {
            id: n.id,
            displayName: n.displayName,
            avatarUrl: n.avatarUrl,
            isMuted: n.isMuted,
            isLocal: !0,
            videoElement: n.videoElement
          }
        ) })
      ]
    }
  );
}
function xe({
  participants: t,
  localParticipant: n,
  spotlightContent: r,
  spotlightParticipantId: i,
  onParticipantClick: o,
  className: c,
  style: u
}) {
  const f = K(() => {
    const s = t.filter((m) => m.id !== i);
    return n && s.push({ ...n, isLocal: !0 }), s;
  }, [t, i, n]);
  return /* @__PURE__ */ l("div", { className: a("flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden", c), style: u, children: [
    /* @__PURE__ */ e("div", { className: "flex-1 bg-black aspect-video relative", children: r ?? // Fall back to the active speaker if no explicit spotlight content.
    (i && (() => {
      const s = t.find((m) => m.id === i);
      return s ? /* @__PURE__ */ e(
        R,
        {
          id: s.id,
          displayName: s.displayName,
          avatarUrl: s.avatarUrl,
          isMuted: s.isMuted,
          isLocal: s.isLocal,
          isSpotlight: !0,
          videoElement: s.videoElement,
          className: "w-full h-full"
        }
      ) : null;
    })()) }),
    f.length > 0 && /* @__PURE__ */ e("div", { className: "flex gap-1 overflow-x-auto px-1 pb-1", children: f.map((s) => /* @__PURE__ */ e("div", { className: "w-32 shrink-0", children: /* @__PURE__ */ e(
      R,
      {
        id: s.id,
        displayName: s.displayName,
        avatarUrl: s.avatarUrl,
        isMuted: s.isMuted,
        isLocal: s.isLocal,
        videoElement: s.videoElement,
        onClick: o ? () => o(s.id) : void 0
      }
    ) }, s.id)) })
  ] });
}
function pe(t) {
  return t <= 1 ? 1 : t === 2 || t <= 4 ? 2 : t <= 9 ? 3 : 4;
}
function ve(t, n) {
  const [r, i] = A(t);
  return E(() => {
    if (n <= 0) {
      i(t);
      return;
    }
    if (t === r) return;
    const o = setTimeout(() => i(t), n);
    return () => clearTimeout(o);
  }, [t, n, r]), r;
}
function Ue({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: i = "started",
  onJoin: o,
  onDismiss: c,
  autoExpireSec: u = 30,
  className: f,
  style: s
}) {
  const [m, g] = A(!0);
  return E(() => {
    if (!u || u <= 0) return;
    const p = setTimeout(() => {
      g(!1), c?.();
    }, u * 1e3);
    return () => clearTimeout(p);
  }, [u, c]), m ? /* @__PURE__ */ l(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: a(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        f
      ),
      style: s,
      children: [
        /* @__PURE__ */ e(be, { name: t, avatarUrl: n }),
        /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: i === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                g(!1), c();
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
                g(!1), o();
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
function be({ name: t, avatarUrl: n }) {
  const r = ye(t);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : we(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function we(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function ye(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
export {
  Ue as CallStartedBanner,
  We as CallWidget,
  Te as HangoutLayout,
  je as NetworkQualityBadge,
  R as ParticipantTile,
  $e as ReactionOverlay,
  Se as ReactionPicker,
  Me as StatsCard,
  Ae as StatusStrip,
  Be as VideoGrid,
  Ce as VideoPlayer,
  Ee as ViewerCount,
  _e as useActiveSpeaker
};
