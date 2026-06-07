import { jsxs as i, jsx as e, Fragment as re } from "react/jsx-runtime";
import { useRef as H, useState as E, useEffect as T, useMemo as J, useCallback as R, useImperativeHandle as Pe, useLayoutEffect as Ie } from "react";
import { c as v } from "./cn-B6yFEsav.js";
import { P as Te } from "./HangoutLayout-ddC4Y1h7.js";
import { A as ce } from "./Avatar-BvKIaNVE.js";
import { B as de } from "./Button-Qsbxqsl9.js";
import { C as ne } from "./Chip-CAS9vOWq.js";
import { S as ye, P as Ae } from "./PermissionDeniedCard-B9U2evs3.js";
const Be = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Jt({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: o = !0,
  loop: a = !1,
  controls: d = !1,
  poster: s,
  phase: c,
  className: u,
  style: p,
  onPhaseChange: x,
  onTimeUpdate: w
}) {
  const f = H(null), [l, m] = E("idle"), b = c ?? l;
  T(() => {
    const N = f.current;
    if (!N) return;
    const C = [
      ["waiting", () => {
        m("buffering"), x?.("buffering");
      }],
      ["playing", () => {
        m("playing"), x?.("playing");
      }],
      ["error", () => {
        m("error"), x?.("error");
      }],
      ["loadstart", () => {
        m("connecting"), x?.("connecting");
      }],
      ["timeupdate", () => {
        w?.(N.currentTime, N.duration);
      }]
    ];
    return C.forEach(([S, j]) => N.addEventListener(S, j)), () => C.forEach(([S, j]) => N.removeEventListener(S, j));
  }, [x, w]), T(() => {
    const N = f.current;
    N && n !== void 0 && (N.srcObject = n);
  }, [n]);
  const y = b !== "playing", g = Be[b];
  return /* @__PURE__ */ i(
    "div",
    {
      className: v("relative bg-black rounded-lg overflow-hidden aspect-video", u),
      style: p,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: f,
            src: n ? void 0 : t,
            autoPlay: r,
            muted: o,
            loop: a,
            controls: d,
            poster: s,
            playsInline: !0,
            className: v("w-full h-full object-contain block")
          }
        ),
        y && g && /* @__PURE__ */ i("div", { className: v("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          b === "buffering" && /* @__PURE__ */ e(He, {}),
          /* @__PURE__ */ e("span", { className: v(b === "buffering" ? "ml-2" : ""), children: g })
        ] })
      ]
    }
  );
}
function He() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: v("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function Re(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function Zt({
  onClose: t,
  sources: n,
  title: r,
  subtitle: o,
  autoPlay: a = !0,
  muted: d = !1,
  hideDownload: s = !1,
  header: c,
  footer: u,
  className: p
}) {
  const x = J(() => n.filter((m) => !!m.url), [n]), [w, f] = E(0), l = x[w];
  return T(() => {
    const m = (b) => {
      b.key === "Escape" && t();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [t]), /* @__PURE__ */ e(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": r || "Video player",
      onClick: t,
      className: v(
        "fixed inset-0 z-50 grid place-items-center p-4",
        "bg-black/80 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          onClick: (m) => m.stopPropagation(),
          className: v(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            p
          ),
          children: [
            (r || o || c) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                r && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: r }),
                o && /* @__PURE__ */ e("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
                c,
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: t,
                    "aria-label": "Close",
                    className: v(
                      "h-8 w-8 grid place-items-center rounded text-xl leading-none",
                      "hover:bg-white/10"
                    ),
                    children: "×"
                  }
                )
              ] })
            ] }),
            l ? /* @__PURE__ */ e(
              "video",
              {
                src: l.url,
                controls: !0,
                autoPlay: a,
                muted: d,
                className: "w-full max-h-[70vh] bg-black"
              },
              l.url
            ) : /* @__PURE__ */ e("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            x.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: v(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: x.map((m, b) => {
                  const y = b === w;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => f(b),
                      className: v(
                        "px-2.5 py-1 rounded transition-colors",
                        y ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": y ? "true" : void 0,
                      title: m.sizeBytes != null ? Re(m.sizeBytes) : void 0,
                      children: m.label || `Segment ${b + 1}`
                    },
                    `${b}:${m.url}`
                  );
                })
              }
            ),
            (u || !s && l) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: u }),
              !s && l && /* @__PURE__ */ e(
                "a",
                {
                  href: l.url,
                  download: !0,
                  className: "underline hover:text-[var(--color-primary)] shrink-0",
                  children: "Download"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function $e(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function qt({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: v("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", $e(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: v("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, a]) => /* @__PURE__ */ i("div", { className: v("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: v("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: v("font-mono"), children: a })
  ] }, o)) });
}
const De = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, ze = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, Fe = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function We({ quality: t, style: n }) {
  const r = De[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ i("div", { className: v("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((a) => /* @__PURE__ */ e(
      "rect",
      {
        x: a * 4,
        y: 12 - (a + 1) * 3,
        width: "3",
        height: (a + 1) * 3,
        rx: "0.5",
        fill: a < o ? r : "rgba(255,255,255,0.2)"
      },
      a
    )) }),
    /* @__PURE__ */ e("span", { className: ze[t], children: Fe[t] })
  ] });
}
function Qt({ participants: t, style: n }) {
  const r = t.length, o = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: v("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...n },
      children: t.map((a) => /* @__PURE__ */ e(
        Te,
        {
          id: a.id,
          displayName: a.displayName,
          avatarUrl: a.avatarUrl,
          isSpeaking: a.isSpeaking,
          isMuted: a.isMuted,
          isLocal: a.isLocal,
          videoElement: a.videoElement
        },
        a.id
      ))
    }
  );
}
function en({ reactions: t, style: n }) {
  const [r, o] = E([]);
  return T(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], d = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((s) => [...s.slice(-20), d]);
  }, [t]), T(() => {
    const a = setInterval(() => {
      o((d) => d.filter((s) => Date.now() - s.createdAt < 3e3));
    }, 500);
    return () => clearInterval(a);
  }, []), /* @__PURE__ */ e("div", { className: v("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((a) => /* @__PURE__ */ e(
    "span",
    {
      className: v("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${a.x}%` },
      children: a.emoji
    },
    a.id
  )) });
}
const Oe = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function tn({ onReact: t, emojis: n = Oe, style: r }) {
  return /* @__PURE__ */ e("div", { className: v("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: v("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (a) => a.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (a) => a.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (a) => a.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function Ve(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function _e(t) {
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${r}:${String(o).padStart(2, "0")}`;
}
const Ue = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, Xe = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function nn({ phase: t, bitrateBps: n, viewerCount: r, duration: o, style: a }) {
  const d = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: v("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: v("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: v("w-[7px] h-[7px] rounded-full", Ue[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: v("font-semibold", Xe[t] ?? "text-slate-400"), children: d })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: Ve(n) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: _e(o) }),
    r !== void 0 && /* @__PURE__ */ i("span", { className: v("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function rn({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i("div", { className: v("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
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
function Ye(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Ke(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function Z({ participant: t, size: n = 32 }) {
  const r = Ke(t.displayName);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "call-avatar",
      "data-speaking": t.isSpeaking ? "true" : void 0,
      "data-muted": t.isMuted ? "true" : void 0,
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: n,
        height: n,
        fontSize: n * 0.38,
        background: t.avatarUrl ? void 0 : `hsl(${r}, 55%, 45%)`
      },
      children: [
        t.avatarUrl ? /* @__PURE__ */ e(
          "img",
          {
            src: t.avatarUrl,
            alt: "",
            className: "w-full h-full rounded-full object-cover"
          }
        ) : Ye(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e(
          "span",
          {
            "data-testid": "call-avatar-speaking",
            className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]"
          }
        ),
        t.isMuted && /* @__PURE__ */ e(
          "span",
          {
            "data-testid": "call-avatar-muted",
            "aria-label": "Microphone muted",
            className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            children: /* @__PURE__ */ i(
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
                  /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
                  /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
                  /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Ge({
  participants: t,
  localFallback: n,
  maxVisible: r = 4,
  avatarSize: o = 36,
  testId: a = "call-participant-strip",
  className: d,
  style: s
}) {
  const c = t.slice(0, r), u = Math.max(0, t.length - r), p = t.length === 0 && !!n;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": a,
      "data-count": t.length,
      className: v(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        d
      ),
      style: s,
      children: [
        c.map((x) => /* @__PURE__ */ e(Z, { participant: x, size: o }, x.id)),
        u > 0 && /* @__PURE__ */ i(
          "span",
          {
            "data-testid": "call-participant-strip-overflow",
            className: "text-white/50 text-xs font-medium",
            children: [
              "+",
              u
            ]
          }
        ),
        p && n && /* @__PURE__ */ e(Z, { participant: n, size: o + 4 })
      ]
    }
  );
}
const _ = {
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
  userPlus: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ e("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] })
};
function K({
  icon: t,
  label: n,
  active: r = !1,
  danger: o = !1,
  onClick: a,
  disabled: d = !1,
  testId: s
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      disabled: d,
      onClick: a,
      "data-testid": s,
      className: v(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        r && !o && "bg-white/20 text-white",
        !r && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        d && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function Je({
  mode: t,
  isMuted: n = !1,
  isCameraOn: r = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: d,
  onToggleScreenShare: s,
  onUpgradeToVideo: c,
  onEndCall: u,
  onAddParticipant: p,
  availableParticipants: x,
  currentParticipantIds: w,
  className: f
}) {
  const [l, m] = E(!1), b = new Set(w ?? []), y = (x ?? []).filter((g) => !b.has(g.id));
  return /* @__PURE__ */ i("div", { className: v("flex flex-col", f), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            K,
            {
              icon: n ? _.micOff : _.mic,
              label: n ? "Unmute" : "Mute",
              active: n,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            K,
            {
              icon: r ? _.camera : _.cameraOff,
              label: r ? "Turn off camera" : "Turn on camera",
              active: !r,
              onClick: d,
              testId: "camera-button"
            }
          ),
          t === "audio" && c && /* @__PURE__ */ e(
            K,
            {
              icon: _.videoUpgrade,
              label: "Switch to video",
              onClick: c,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            K,
            {
              icon: _.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: s,
              testId: "screenshare-button"
            }
          ),
          p && /* @__PURE__ */ e(
            K,
            {
              icon: _.userPlus,
              label: "Add participant",
              active: l,
              onClick: () => m((g) => !g),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ e(
            K,
            {
              icon: _.phoneEnd,
              label: "End call",
              danger: !0,
              onClick: u,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    l && p && /* @__PURE__ */ i(
      "div",
      {
        className: "border-t border-white/5 bg-[#0f172a]/80",
        "data-testid": "add-participant-picker",
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
            /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => m(!1),
                className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
                "aria-label": "Close add-participant picker",
                children: "✕"
              }
            )
          ] }),
          y.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: y.map((g) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                p(g.id), y.length <= 1 && m(!1);
              },
              children: [
                /* @__PURE__ */ e(Z, { participant: g, size: 22 }),
                /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: g.displayName }),
                /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
              ]
            },
            g.id
          )) })
        ]
      }
    )
  ] });
}
function Ze(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const qe = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function Qe(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)} Mb/s` : `${Math.round(t)} kb/s`;
}
function ue({
  stats: t,
  position: n = "top-left",
  testId: r = "call-stats-overlay",
  className: o,
  style: a
}) {
  return Ze(t) ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": r,
      className: v(
        "absolute z-10 pointer-events-none",
        qe[n],
        "flex flex-col gap-1.5",
        o
      ),
      style: a,
      children: [
        t.networkQuality && /* @__PURE__ */ e(We, { quality: t.networkQuality }),
        (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              t.bitrateKbps !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                Qe(t.bitrateKbps)
              ] }),
              t.latencyMs !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-latency", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "latency" }),
                Math.round(t.latencyMs),
                " ms"
              ] }),
              t.packetLossPct !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-packet-loss", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "loss" }),
                t.packetLossPct.toFixed(1),
                "%"
              ] })
            ]
          }
        )
      ]
    }
  ) : null;
}
function ke(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function he({
  stream: t,
  muted: n = !1,
  className: r
}) {
  const o = H(null);
  return T(() => {
    const a = o.current;
    a && a.srcObject !== t && (a.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: v("w-full h-full object-cover", r)
    }
  );
}
const ie = {
  phoneEnd: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
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
function et({
  callerName: t,
  onAnswer: n,
  onDecline: r
}) {
  return /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-4 py-5 px-4", "data-testid": "call-ringing-view", children: [
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
          children: ie.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: ie.phoneAnswer
        }
      )
    ] })
  ] });
}
function tt({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: o,
  isMuted: a,
  isCameraOn: d,
  isScreenSharing: s,
  onToggleMute: c,
  onToggleCamera: u,
  onToggleScreenShare: p,
  onUpgradeToVideo: x,
  onAddParticipant: w,
  availableParticipants: f,
  onEndCall: l,
  layoutComponent: m,
  callStats: b
}) {
  const y = t === "video" && d;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && m && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      m,
      /* @__PURE__ */ e(ue, { stats: b, position: "bottom-left" })
    ] }),
    t === "video" && !m && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && y ? /* @__PURE__ */ e(he, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(Z, { participant: r, size: 48 }) }),
      n.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        n[0].videoStream ? /* @__PURE__ */ e(he, { stream: n[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(Z, { participant: n[0], size: 28 }) }),
        n[0].isMuted && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ i("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ e(ue, { stats: b, position: "bottom-left" })
    ] }),
    t === "audio" && /* @__PURE__ */ e(
      Ge,
      {
        participants: n,
        localFallback: r,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: ke(o) }),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ e(
      Je,
      {
        mode: t,
        isMuted: a,
        isCameraOn: d,
        isScreenSharing: s,
        onToggleMute: c,
        onToggleCamera: u,
        onToggleScreenShare: p,
        onUpgradeToVideo: x,
        onEndCall: l,
        onAddParticipant: w,
        availableParticipants: f,
        currentParticipantIds: n.map((g) => g.id)
      }
    )
  ] });
}
function nt({
  state: t,
  mode: n,
  duration: r,
  isMuted: o,
  callerName: a,
  onToggleMute: d,
  onEndCall: s,
  onExpand: c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: c,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (u) => u.key === "Enter" && c?.(),
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: v(
              "w-2 h-2 rounded-full shrink-0",
              t === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
            )
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: a || "Incoming call" }) : /* @__PURE__ */ i("span", { className: "text-white text-xs font-medium", children: [
          n === "video" ? "Video" : "Audio",
          " call",
          r !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: ke(r) })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (u) => u.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: d,
              className: v(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(re, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(re, { children: [
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
function rt(t) {
  const [n, r] = E({ x: 0, y: 0 }), [o, a] = E(!1), [d, s] = E(!1), c = H(!1), u = H({ x: 0, y: 0 }), p = H({ x: 0, y: 0 }), x = H(null), w = R(
    (y) => {
      t && (c.current = !0, a(!0), s(!1), u.current = { x: y.clientX, y: y.clientY }, p.current = { ...n }, y.preventDefault());
    },
    [t, n]
  ), f = R(() => {
    s(!0), r({ x: 0, y: 0 }), setTimeout(() => s(!1), 200);
  }, []), l = R(
    (y) => {
      const g = x.current;
      if (!g) return;
      const N = g.offsetParent, C = 16;
      let S = window.innerWidth, j = window.innerHeight;
      N && (S = N.clientWidth, j = N.clientHeight);
      const L = g.getBoundingClientRect(), P = N ? N.getBoundingClientRect() : { left: 0, top: 0 };
      let I, A;
      switch (y) {
        case "top-left":
          I = C, A = C;
          break;
        case "top-right":
          I = S - L.width - C, A = C;
          break;
        case "bottom-left":
          I = C, A = j - L.height - C;
          break;
        default:
          I = S - L.width - C, A = j - L.height - C;
          break;
      }
      const D = L.left - P.left - n.x, z = L.top - P.top - n.y;
      s(!0), r({ x: I - D, y: A - z }), setTimeout(() => s(!1), 200);
    },
    [n]
  ), m = H(l);
  m.current = l, T(() => {
    if (!t) return;
    const y = (N) => {
      c.current && r({
        x: p.current.x + (N.clientX - u.current.x),
        y: p.current.y + (N.clientY - u.current.y)
      });
    }, g = () => {
      if (!c.current) return;
      c.current = !1, a(!1);
      const N = x.current;
      if (!N) return;
      const C = N.offsetParent, S = 80;
      let j = window.innerWidth, L = window.innerHeight;
      if (C) {
        const k = C.getBoundingClientRect();
        j = k.width, L = k.height;
      }
      const P = N.getBoundingClientRect(), I = C ? C.getBoundingClientRect() : { left: 0, top: 0 }, A = P.left - I.left, D = P.top - I.top, z = j - (A + P.width), V = L - (D + P.height), W = A < S, F = z < S, M = D < S, h = V < S;
      M && W ? m.current("top-left") : M && F ? m.current("top-right") : h && W ? m.current("bottom-left") : h && F && m.current("bottom-right");
    };
    return document.addEventListener("mousemove", y), document.addEventListener("mouseup", g), () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", g);
    };
  }, [t]);
  const b = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: w, resetOffset: f, snapToCorner: l, isDragging: o, isAnimating: d, hasMoved: b, widgetRef: x };
}
function it({
  onSnap: t,
  contained: n
}) {
  const r = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: v(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: o, classes: a }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${a} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => t(o),
      title: `Snap to ${o.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    o
  )) });
}
function on({
  state: t,
  mode: n,
  participants: r,
  localParticipant: o,
  callerName: a,
  duration: d,
  isMuted: s = !1,
  isCameraOn: c = !0,
  isScreenSharing: u = !1,
  onAnswer: p,
  onDecline: x,
  onEndCall: w,
  onToggleMute: f,
  onToggleCamera: l,
  onToggleScreenShare: m,
  onUpgradeToVideo: b,
  onAddParticipant: y,
  availableParticipants: g,
  onMinimize: N,
  onExpand: C,
  layoutComponent: S,
  callStats: j,
  minimized: L = !1,
  position: P = "bottom-right",
  contained: I = !1,
  draggable: A = !0,
  className: D,
  style: z,
  dataAttrs: V
}) {
  const { offset: W, handleMouseDown: F, resetOffset: M, snapToCorner: h, isDragging: k, isAnimating: B, hasMoved: X, widgetRef: O } = rt(A), Y = {};
  if (V)
    for (const [Ee, q] of Object.entries(V))
      q != null && q !== "" && (Y[Ee] = q);
  const Se = J(() => {
    switch (P) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [P]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(re, { children: [
    k && /* @__PURE__ */ e(it, { onSnap: h, contained: I }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: O,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: v(
          I ? "absolute z-50" : "fixed z-[9999]",
          Se,
          D
        ),
        style: {
          transform: `translate(${W.x}px, ${W.y}px)`,
          transition: B ? "transform 0.2s ease-out" : void 0,
          ...z
        },
        ...Y,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: v(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              L ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !L && /* @__PURE__ */ i(
                "div",
                {
                  className: v(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    A && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: F,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                      X && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: M,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: ie.snapBack
                        }
                      ),
                      C && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: C,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Expand to window",
                          title: "Expand",
                          "data-testid": "call-widget-expand-button",
                          children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ e("path", { d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) })
                        }
                      ),
                      N && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: N,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: ie.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              L && /* @__PURE__ */ e(
                "div",
                {
                  className: v(A && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: F,
                  children: /* @__PURE__ */ e(
                    nt,
                    {
                      state: t,
                      mode: n,
                      duration: d,
                      isMuted: s,
                      callerName: a,
                      onToggleMute: f,
                      onEndCall: w,
                      onExpand: N
                    }
                  )
                }
              ),
              !L && /* @__PURE__ */ i(re, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  et,
                  {
                    callerName: a,
                    onAnswer: p,
                    onDecline: x
                  }
                ),
                t === "connecting" && /* @__PURE__ */ i(
                  "div",
                  {
                    className: "flex flex-col items-center gap-3 py-6 px-4",
                    "data-testid": "call-connecting-view",
                    children: [
                      /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                      /* @__PURE__ */ e("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                    ]
                  }
                ),
                t === "active" && /* @__PURE__ */ e(
                  tt,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: o,
                    duration: d,
                    isMuted: s,
                    isCameraOn: c,
                    isScreenSharing: u,
                    onToggleMute: f,
                    onToggleCamera: l,
                    onToggleScreenShare: m,
                    onUpgradeToVideo: b,
                    onAddParticipant: y,
                    availableParticipants: g,
                    onEndCall: w,
                    layoutComponent: S,
                    callStats: j
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
function an({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: o = "started",
  onJoin: a,
  onDismiss: d,
  autoExpireSec: s = 30,
  className: c,
  style: u
}) {
  const [p, x] = E(!0);
  return T(() => {
    if (!s || s <= 0) return;
    const w = setTimeout(() => {
      x(!1), d?.();
    }, s * 1e3);
    return () => clearTimeout(w);
  }, [s, d]), p ? /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": t,
      className: v(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        c
      ),
      style: u,
      children: [
        /* @__PURE__ */ e(ot, { name: t, avatarUrl: n }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          d && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                x(!1), d();
              },
              className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
              "aria-label": "Dismiss call invitation",
              "data-testid": "incoming-call-dismiss",
              children: "Dismiss"
            }
          ),
          a && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                x(!1), a();
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
function ot({ name: t, avatarUrl: n }) {
  const r = lt(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : at(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function at(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function lt(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function fe(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = n > 0 ? String(r).padStart(2, "0") : String(r), d = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${a}:${d}` : `${a}:${d}`;
}
function ln({
  playlistUrl: t,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: d,
  onError: s,
  hideDownload: c = !1,
  className: u
}) {
  const p = H(null), x = H(null), [w, f] = E(!1), [l, m] = E(0), [b, y] = E(0), [g, N] = E(1), [C, S] = E(1), [j, L] = E(!1), [P, I] = E(null);
  T(() => {
    const M = p.current;
    if (!M || !t) return;
    if (I(null), L(!0), M.canPlayType("application/vnd.apple.mpegurl"))
      return M.src = t, () => {
        M.removeAttribute("src"), M.load();
      };
    let h = !1;
    return (async () => {
      try {
        const k = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (h) return;
        if (!k.isSupported()) {
          I("HLS playback is not supported in this browser."), L(!1);
          return;
        }
        const B = new k({ enableWorker: !0 });
        x.current = B, B.attachMedia(M), B.on(k.Events.MEDIA_ATTACHED, () => B.loadSource(t)), B.on(k.Events.ERROR, (X, O) => {
          O.fatal && (I(`HLS error: ${O.type}`), s?.(new Error(`HLS fatal: ${O.type}`)));
        });
      } catch (k) {
        if (h) return;
        I(`Failed to load hls.js — install it in the consumer app: ${k?.message ?? k}`);
      }
    })(), () => {
      if (h = !0, x.current) {
        try {
          x.current.destroy();
        } catch {
        }
        x.current = null;
      }
    };
  }, [t, s]);
  const A = () => {
    const M = p.current;
    M && (M.paused ? M.play().catch(() => {
    }) : M.pause());
  }, D = (M) => {
    const h = p.current;
    !h || !isFinite(b) || b <= 0 || (h.currentTime = Number(M.target.value));
  }, z = (M) => {
    const h = p.current;
    if (!h) return;
    const k = Number(M.target.value);
    h.volume = k, N(k);
  }, V = (M) => {
    const h = p.current;
    if (!h) return;
    const k = Number(M.target.value);
    h.playbackRate = k, S(k);
  }, W = () => {
    const M = p.current;
    M && (document.fullscreenElement ? document.exitFullscreen() : M.requestFullscreen?.());
  }, F = J(
    () => b > 0 ? Math.min(100, l / b * 100) : 0,
    [l, b]
  );
  return /* @__PURE__ */ i("div", { className: v("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", u), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: p,
        autoPlay: r,
        muted: o,
        poster: n,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => f(!0),
        onPause: () => f(!1),
        onLoadedMetadata: (M) => {
          const h = M.currentTarget;
          y(h.duration), L(!1), a?.(h.duration);
        },
        onTimeUpdate: (M) => {
          const h = M.currentTarget;
          m(h.currentTime), d?.(h.currentTime, h.duration);
        },
        onWaiting: () => L(!0),
        onCanPlay: () => L(!1),
        onError: () => {
          I("Playback error."), s?.(new Error("video element error")), L(!1);
        }
      }
    ),
    j && !P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: P }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: fe(l) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(b) ? b : 0,
            step: 0.1,
            value: l,
            onChange: D,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${F}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: fe(b) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: A,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": w ? "Pause" : "Play",
            children: w ? /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
              /* @__PURE__ */ e("rect", { x: "2", y: "1", width: "3", height: "12" }),
              /* @__PURE__ */ e("rect", { x: "9", y: "1", width: "3", height: "12" })
            ] }) : /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("polygon", { points: "2,1 12,7 2,13" }) })
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-xs opacity-70", children: "Vol" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: g,
              onChange: z,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "select",
          {
            value: C,
            onChange: V,
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
        !c && t && /* @__PURE__ */ e(
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
            onClick: W,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function st(t) {
  if (!isFinite(t) || t < 0) return "—";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}h ${r}m` : r > 0 ? `${r}m ${o}s` : `${o}s`;
}
function me(t) {
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
function ct({ status: t }) {
  return t === "ready" ? null : t === "processing" ? /* @__PURE__ */ i(
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
function dt({
  id: t,
  startIso: n,
  durationSec: r,
  participantCount: o,
  thumbnailUrl: a,
  label: d,
  status: s = "ready",
  selected: c,
  onClick: u,
  actions: p,
  className: x
}) {
  const w = typeof u == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...w ? {
        role: "button",
        tabIndex: 0,
        onClick: () => u(t),
        onKeyDown: (l) => {
          w && (l.key === "Enter" || l.key === " ") && (l.preventDefault(), u(t));
        },
        "aria-pressed": c ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": s,
      className: v(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        w && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        c ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        x
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "relative aspect-video rounded bg-black overflow-hidden mb-2", children: [
          a ? /* @__PURE__ */ e(
            "img",
            {
              src: a,
              alt: "",
              className: "w-full h-full object-cover",
              loading: "lazy",
              onError: (l) => {
                l.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(ct, { status: s }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: st(r) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: d ?? me(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        d && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: me(n) }),
        p && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (l) => l.stopPropagation(),
            children: p
          }
        )
      ]
    }
  );
}
function sn({
  recordings: t,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: a,
  renderActions: d,
  className: s
}) {
  return o ? /* @__PURE__ */ e("div", { className: v("flex flex-col gap-2", s), children: [0, 1, 2].map((c) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    c
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: v("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: v("flex flex-col gap-2", s), children: t.map((c) => /* @__PURE__ */ e(
    dt,
    {
      id: c.id,
      startIso: c.startIso,
      endIso: c.endIso,
      durationSec: c.durationSec,
      participantCount: c.participantCount,
      thumbnailUrl: c.thumbnailUrl,
      label: c.label,
      status: c.status,
      selected: c.id === n,
      onClick: r,
      actions: d?.(c)
    },
    c.id
  )) });
}
function cn({
  getVideoElement: t,
  className: n,
  title: r
}) {
  const [o, a] = E(!1), [d, s] = E(!1);
  T(() => {
    s(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), T(() => {
    const p = () => a(!1), x = () => a(!0);
    return document.addEventListener("leavepictureinpicture", p), document.addEventListener("enterpictureinpicture", x), () => {
      document.removeEventListener("leavepictureinpicture", p), document.removeEventListener("enterpictureinpicture", x);
    };
  }, []);
  const c = R(async () => {
    if (d)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), a(!1);
          return;
        }
        const p = t();
        if (!p) return;
        p.disablePictureInPicture = !1, await p.requestPictureInPicture(), a(!0);
      } catch {
      }
  }, [d, t]), u = !d;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: c,
      disabled: u,
      title: r ?? (u ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: v(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        u ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        n
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function ut(t) {
  if (!t) return "?";
  const n = t.trim().split(/\s+/);
  return n.length === 1 ? n[0].slice(0, 2).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function dn({
  participants: t,
  activeSpeakerId: n,
  onParticipantClick: r,
  count: o,
  title: a = "Participants",
  footer: d,
  className: s
}) {
  const c = o ?? t.length;
  return /* @__PURE__ */ i(
    "aside",
    {
      className: v(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        s
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ i("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: a }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: c })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((u) => {
          const p = u.id === n;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: r ? () => r(u.id) : void 0,
              className: v(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                p && "bg-white/[0.04]",
                r ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !r,
              children: [
                /* @__PURE__ */ i(
                  "div",
                  {
                    className: v(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      p && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      u.avatarUrl ? /* @__PURE__ */ e("img", { src: u.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: ut(u.displayName) }),
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
                /* @__PURE__ */ i("span", { className: "flex-1 truncate text-sm text-[var(--color-text-primary)]", children: [
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
        d && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: d })
      ]
    }
  );
}
let Q = null;
function ht() {
  if (Q) return Q;
  try {
    return Q = new AudioContext(), Q;
  } catch {
    return null;
  }
}
function un({
  localStream: t,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [d, s] = E(!1);
  return T(() => {
    if (!n || !t || t.getAudioTracks().filter((y) => y.readyState === "live").length === 0) return;
    const u = ht();
    if (!u) return;
    let p, x;
    try {
      p = u.createMediaStreamSource(t), x = u.createAnalyser(), x.fftSize = 512, x.smoothingTimeConstant = 0.6, p.connect(x);
    } catch {
      return;
    }
    let w = null, f = 0, l = !1;
    const m = new Float32Array(x.frequencyBinCount), b = setInterval(() => {
      if (l) return;
      x.getFloatTimeDomainData(m);
      let y = 0;
      for (let C = 0; C < m.length; C++) y += m[C] * m[C];
      const g = 20 * Math.log10(Math.sqrt(y / m.length)), N = Date.now();
      g > r ? (w == null && (w = N), N - w >= o && N - f > a && (s(!0), f = N, setTimeout(() => {
        l || s(!1);
      }, 3e3), w = null)) : w = null;
    }, 200);
    return () => {
      l = !0, clearInterval(b);
      try {
        p.disconnect();
      } catch {
      }
      try {
        x.disconnect();
      } catch {
      }
    };
  }, [t, n, r, o, a]), T(() => {
    n || s(!1);
  }, [n]), d;
}
function ft(t, n) {
  const [r, o] = E(0);
  return T(() => {
    if (!t) return;
    const a = (f, l) => {
      console.info("[useTrackStateBump] remote track", f, {
        participant: n,
        kind: l.kind,
        enabled: l.enabled,
        muted: l.muted,
        readyState: l.readyState,
        id: l.id
      }), o((m) => m + 1);
    }, d = (f) => a("mute", f.target), s = (f) => a("unmute", f.target), c = (f) => a("ended", f.target), u = /* @__PURE__ */ new WeakSet(), p = (f) => {
      u.has(f) || (u.add(f), f.addEventListener("mute", d), f.addEventListener("unmute", s), f.addEventListener("ended", c));
    };
    for (const f of t.getVideoTracks()) p(f);
    const x = (f) => {
      const l = f.track;
      l && l.kind === "video" && p(l), o((m) => m + 1);
    }, w = () => o((f) => f + 1);
    return t.addEventListener("addtrack", x), t.addEventListener("removetrack", w), () => {
      for (const f of t.getVideoTracks())
        f.removeEventListener("mute", d), f.removeEventListener("unmute", s), f.removeEventListener("ended", c);
      t.removeEventListener("addtrack", x), t.removeEventListener("removetrack", w);
    };
  }, [t, n]), r;
}
function mt(t) {
  if (!t) return !1;
  const n = t.getVideoTracks();
  return n.length === 0 ? !1 : n.some((r) => r.readyState === "live" && r.enabled && !r.muted);
}
function Ne({
  stream: t,
  muted: n = !1,
  videoRef: r,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: a
}) {
  const d = H(null), s = H(a);
  return s.current = a, T(() => {
    const c = d.current;
    if (!c) return;
    c.srcObject !== t && (c.srcObject = t), r && (r.current = c);
    const u = (y) => {
      typeof t?.getTracks == "function" && console.info(`[StreamVideo] ${y}`, {
        streamId: t.id,
        tracks: t.getTracks().map((g) => ({
          kind: g.kind,
          id: g.id,
          ready: g.readyState,
          muted: g.muted,
          enabled: g.enabled
        }))
      });
    };
    u("bind");
    const p = (y) => {
      s.current?.(y);
    }, x = () => p("playing"), w = () => p("ended"), f = () => {
      c.ended && p("ended");
    }, l = () => {
      const y = c.play();
      y && typeof y.catch == "function" && y.catch((g) => {
        g?.name === "NotAllowedError" && p("paused-by-autoplay");
      });
    }, m = (y) => {
      u(`stream ${y.type}`), c.srcObject = null, c.srcObject = t, l();
    };
    c.addEventListener("play", x), c.addEventListener("ended", w), c.addEventListener("pause", f);
    const b = typeof t?.addEventListener == "function";
    return b && (t.addEventListener("addtrack", m), t.addEventListener("removetrack", m)), l(), () => {
      c.removeEventListener("play", x), c.removeEventListener("ended", w), c.removeEventListener("pause", f), b && (t.removeEventListener("addtrack", m), t.removeEventListener("removetrack", m)), r && r.current === c && (r.current = null);
    };
  }, [t, r]), /* @__PURE__ */ e(
    "video",
    {
      ref: d,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: o
    }
  );
}
const pt = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function gt() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((n) => {
    if (n.paused) {
      const r = n.play();
      r && typeof r.catch == "function" && r.catch(() => {
      });
    }
  });
}
function hn({
  chipLabel: t = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...a
}) {
  const [d, s] = E(!1), c = H(null), p = a.videoRef ?? c, x = R(
    (f) => {
      f === "paused-by-autoplay" ? s(!0) : f === "playing" && s(!1), o?.(f);
    },
    [o]
  ), w = R(() => {
    const f = p.current;
    if (f) {
      f.muted = !1;
      const l = f.play();
      l && typeof l.catch == "function" && l.catch(() => {
      });
    }
    gt(), s(!1);
  }, [p]);
  return /* @__PURE__ */ i("div", { className: v("relative h-full w-full", r), children: [
    /* @__PURE__ */ e(
      Ne,
      {
        ...a,
        videoRef: p,
        onPlayStateChange: x
      }
    ),
    d && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: w,
        className: v(pt, n),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
const pe = 1;
function xt({
  persistKey: t,
  defaults: n,
  debounceMs: r = 200
}) {
  const [o, a] = E(() => {
    if (!t || typeof window > "u") return n;
    try {
      const c = window.localStorage.getItem(t);
      if (!c) return n;
      const u = JSON.parse(c);
      return !u || u.v !== pe ? n : {
        mode: u.mode === "docked" ? "docked" : "mini",
        x: ee(u.x, n.x),
        y: ee(u.y, n.y),
        width: ee(u.width, n.width),
        height: ee(u.height, n.height)
      };
    } catch {
      try {
        window.localStorage.removeItem(t);
      } catch {
      }
      return n;
    }
  }), d = H(null);
  T(() => {
    if (!(!t || typeof window > "u"))
      return d.current && clearTimeout(d.current), d.current = setTimeout(() => {
        try {
          const c = { v: pe, ...o };
          window.localStorage.setItem(t, JSON.stringify(c));
        } catch {
        }
      }, r), () => {
        d.current && clearTimeout(d.current);
      };
  }, [t, o, r]);
  const s = R((c) => {
    a((u) => ({ ...u, ...c }));
  }, []);
  return { state: o, setState: s };
}
function ee(t, n) {
  return typeof t == "number" && Number.isFinite(t) ? t : n;
}
const ae = 320, le = 200, vt = 640, bt = 400, wt = 1440, yt = 900, ge = 960, xe = 600, $ = 8;
function fn({
  title: t,
  subtitle: n,
  children: r,
  controls: o,
  defaultMode: a = "mini",
  onModeChange: d,
  persistKey: s,
  apiRef: c,
  defaultCorner: u = "bottom-right",
  expandable: p = !0,
  zIndex: x = 9999,
  className: w
}) {
  const f = J(() => a === "docked" ? ve(ge, xe) : be(u), [a, u]), { state: l, setState: m } = xt({
    persistKey: s,
    defaults: {
      mode: a,
      x: f.x,
      y: f.y,
      width: ge,
      height: xe
    }
  }), [b, y] = E(!1), g = b ? "fullscreen" : l.mode, N = H(null), C = H(!1);
  T(() => {
    const h = () => {
      !((document.fullscreenElement ?? document.webkitFullscreenElement) === N.current) && b && (y(!1), C.current || m({ mode: "docked" }), C.current = !1);
    };
    return document.addEventListener("fullscreenchange", h), document.addEventListener("webkitfullscreenchange", h), () => {
      document.removeEventListener("fullscreenchange", h), document.removeEventListener("webkitfullscreenchange", h);
    };
  }, [b, m]);
  const S = R(() => {
    const h = N.current;
    if (!h) return;
    const k = h.requestFullscreen?.bind(h) ?? h.webkitRequestFullscreen?.bind(h);
    if (!k) return;
    const B = k();
    B && typeof B.then == "function" ? B.then(
      () => y(!0),
      () => {
      }
    ) : y(!0);
  }, []), j = R(() => {
    if (!(document.fullscreenElement ?? document.webkitFullscreenElement)) return;
    C.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {
    });
  }, []), L = R((h) => {
    if (h !== g) {
      if (h === "fullscreen") {
        S();
        return;
      }
      if (g === "fullscreen") {
        j(), m({ mode: h });
        return;
      }
      if (h === "docked" && g === "mini") {
        const k = ve(l.width, l.height);
        m({ mode: h, x: k.x, y: k.y });
        return;
      }
      if (h === "mini" && g === "docked") {
        const k = be(u);
        m({ mode: h, x: k.x, y: k.y });
        return;
      }
      m({ mode: h });
    }
  }, [g, S, j, m, l.width, l.height, u]);
  T(() => {
    d?.(g);
  }, [g, d]), Pe(c, () => ({ mode: g, setMode: L }), [g, L]);
  const P = H(null), I = R((h) => {
    g === "docked" && (h.target.closest("button") || (h.currentTarget.setPointerCapture(h.pointerId), P.current = {
      startX: h.clientX,
      startY: h.clientY,
      origX: l.x,
      origY: l.y
    }));
  }, [g, l.x, l.y]), A = R((h) => {
    const k = P.current;
    if (!k) return;
    const B = h.clientX - k.startX, X = h.clientY - k.startY, O = te(k.origX + B, l.width, window.innerWidth), Y = te(k.origY + X, l.height, window.innerHeight);
    m({ x: O, y: Y });
  }, [m, l.width, l.height]), D = R((h) => {
    h.currentTarget.releasePointerCapture(h.pointerId), P.current = null;
  }, []), z = H(null), V = R((h) => {
    g === "docked" && (h.stopPropagation(), h.currentTarget.setPointerCapture(h.pointerId), z.current = {
      startX: h.clientX,
      startY: h.clientY,
      origW: l.width,
      origH: l.height
    });
  }, [g, l.width, l.height]), W = R((h) => {
    const k = z.current;
    if (!k) return;
    const B = h.clientX - k.startX, X = h.clientY - k.startY, O = se(k.origW + B, vt, Math.min(wt, window.innerWidth - $ * 2)), Y = se(k.origH + X, bt, Math.min(yt, window.innerHeight - $ * 2));
    m({ width: O, height: Y });
  }, [m]), F = R((h) => {
    h.currentTarget.releasePointerCapture(h.pointerId), z.current = null;
  }, []);
  Ie(() => {
    if (g !== "docked") return;
    const h = () => {
      const k = te(l.x, l.width, window.innerWidth), B = te(l.y, l.height, window.innerHeight);
      (k !== l.x || B !== l.y) && m({ x: k, y: B });
    };
    return window.addEventListener("resize", h), () => window.removeEventListener("resize", h);
  }, [g, l.x, l.y, l.width, l.height, m]);
  const M = J(() => g === "fullscreen" ? {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: x
  } : g === "docked" ? {
    position: "fixed",
    left: l.x,
    top: l.y,
    width: l.width,
    height: l.height,
    zIndex: x
  } : {
    position: "fixed",
    left: l.x,
    top: l.y,
    width: ae,
    height: le,
    zIndex: x
  }, [g, l.x, l.y, l.width, l.height, x]);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: N,
      "data-call-widget-mode": g,
      style: M,
      className: v(
        "flex flex-col bg-[#0f172a] text-white shadow-2xl overflow-hidden border border-white/10",
        g === "fullscreen" ? "rounded-none" : "rounded-lg",
        w
      ),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: v(
              "flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none",
              g === "docked" ? "cursor-grab active:cursor-grabbing" : ""
            ),
            onPointerDown: I,
            onPointerMove: A,
            onPointerUp: D,
            onPointerCancel: D,
            children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex items-center gap-2 text-xs text-white/80", children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-emerald-400", "aria-hidden": !0 }),
                /* @__PURE__ */ e("span", { className: "truncate font-medium", children: t }),
                n && /* @__PURE__ */ e("span", { className: "truncate text-white/50", children: n })
              ] }),
              p && /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: g === "mini",
                    label: "Mini",
                    onClick: () => L("mini"),
                    testId: "call-widget-mode-mini",
                    children: /* @__PURE__ */ e(kt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: g === "docked",
                    label: "Window",
                    onClick: () => L("docked"),
                    testId: "call-widget-mode-docked",
                    children: /* @__PURE__ */ e(Nt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: g === "fullscreen",
                    label: "Fullscreen",
                    onClick: () => L(g === "fullscreen" ? "docked" : "fullscreen"),
                    testId: "call-widget-mode-fullscreen",
                    children: /* @__PURE__ */ e(Ct, {})
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative flex-1 min-h-0 bg-black", children: r }),
        o && /* @__PURE__ */ e("div", { className: "border-t border-white/5 px-2 py-2 bg-[#0a1020]", children: o }),
        g === "docked" && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
            onPointerDown: V,
            onPointerMove: W,
            onPointerUp: F,
            onPointerCancel: F,
            "data-testid": "call-widget-resize-handle",
            "aria-label": "Resize call widget",
            children: /* @__PURE__ */ e("svg", { viewBox: "0 0 16 16", className: "w-full h-full text-white/30", children: /* @__PURE__ */ e("path", { d: "M14 10v4h-4M14 6v8M10 14h4", stroke: "currentColor", strokeWidth: "1.5", fill: "none" }) })
          }
        )
      ]
    }
  );
}
function oe({
  active: t,
  label: n,
  onClick: r,
  testId: o,
  children: a
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: r,
      "aria-pressed": t,
      "aria-label": n,
      title: n,
      "data-testid": o,
      className: v(
        "w-6 h-6 grid place-items-center rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors",
        t && "text-white bg-white/15"
      ),
      children: a
    }
  );
}
function kt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "6.5", y: "6.5", width: "4", height: "3", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function Nt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "1.5", y: "2.5", width: "9", height: "7", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function Ct() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) });
}
function ve(t, n) {
  return typeof window > "u" ? { x: 16, y: 16 } : {
    x: Math.max($, Math.floor((window.innerWidth - t) / 2)),
    y: Math.max($, Math.floor((window.innerHeight - n) / 2))
  };
}
function be(t) {
  if (typeof window > "u") return { x: 16, y: 16 };
  const n = window.innerWidth, r = window.innerHeight;
  switch (t) {
    case "top-left":
      return { x: $, y: $ };
    case "top-right":
      return { x: n - ae - $, y: $ };
    case "bottom-left":
      return { x: $, y: r - le - $ };
    default:
      return { x: n - ae - $, y: r - le - $ };
  }
}
function se(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function te(t, n, r) {
  return se(t, $, Math.max($, r - n - $));
}
function Mt({ stream: t }) {
  const n = H(null);
  return T(() => {
    const r = n.current;
    if (!r) return;
    if (!t) {
      r.srcObject && (r.srcObject = null);
      return;
    }
    r.srcObject !== t && (r.srcObject = t);
    const o = r.play();
    o && typeof o.catch == "function" && o.catch(() => {
    });
  }, [t]), /* @__PURE__ */ e(
    "audio",
    {
      ref: n,
      autoPlay: !0,
      playsInline: !0,
      style: { display: "none" },
      "data-testid": "remote-tile-hidden-audio"
    }
  );
}
function mn({
  stream: t,
  displayName: n,
  cameraOn: r,
  avatarSize: o = 96
}) {
  ft(t, n);
  const a = mt(t);
  return !r || !a || !t ? /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
      "data-testid": "remote-tile-avatar-branch",
      children: [
        /* @__PURE__ */ e(ce, { name: n, size: o }),
        t && /* @__PURE__ */ e(Mt, { stream: t })
      ]
    }
  ) : /* @__PURE__ */ e(Ne, { stream: t });
}
function pn({ show: t, label: n }) {
  return t ? /* @__PURE__ */ i(
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
function gn({ show: t, label: n = "Reconnecting…" }) {
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
function xn({
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
const we = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Lt(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) | 0;
  return we[Math.abs(n) % we.length];
}
function vn({
  lines: t,
  maxLines: n = 3,
  fadeAfterMs: r = 8e3,
  className: o
}) {
  const a = Date.now(), d = t.slice(-n).map((s) => {
    const c = a - new Date(s.at).getTime(), u = Math.max(0.35, 1 - c / r);
    return { ...s, opacity: u };
  }).filter((s) => s.opacity > 0);
  return d.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: v(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: d.map((s) => /* @__PURE__ */ i(
        "div",
        {
          className: v(
            "flex items-baseline gap-2 text-sm transition-opacity",
            s.interim && "italic"
          ),
          style: { opacity: s.opacity },
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Lt(s.speakerId) },
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
const jt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, St = "bg-slate-200 text-slate-900 hover:bg-slate-300", Et = "bg-slate-100 text-slate-500 hover:bg-slate-200", Pt = "bg-red-100 text-red-700 hover:bg-red-200";
function G({
  on: t,
  iconOn: n,
  iconOff: r,
  "aria-label": o,
  offTone: a = "danger",
  size: d = "md",
  disabled: s,
  className: c,
  ...u
}) {
  const p = t ? St : a === "danger" ? Pt : Et;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": o,
      "aria-pressed": t,
      disabled: s,
      className: v(
        "rounded-full grid place-items-center transition-colors duration-150",
        jt[d],
        p,
        s && "opacity-40 cursor-not-allowed",
        !s && "cursor-pointer",
        c
      ),
      ...u,
      children: t ? n : r
    }
  );
}
function U(t, n) {
  return {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": !0,
    focusable: !1,
    ...n
  };
}
function Ce({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Me({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ e("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
    /* @__PURE__ */ e("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Le({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function je({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function It({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function Tt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function At({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function bn({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "5", cy: "12", r: "1" })
  ] });
}
function Bt(t, n, r) {
  if (r) return "Checking room…";
  if (!n || n === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return n === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function Ht(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function wn({
  channelName: t,
  localIdentity: n,
  previewStream: r,
  permission: o,
  permissionMessage: a,
  audioEnabled: d,
  videoEnabled: s,
  onToggleAudio: c,
  onToggleVideo: u,
  onRetryPermission: p,
  participants: x,
  readyState: w,
  readyLoading: f = !1,
  onJoin: l,
  onCancel: m,
  joinLabel: b,
  joinDisabled: y,
  subtitleOverride: g,
  className: N,
  "data-testid": C
}) {
  const S = H(null);
  T(() => {
    S.current && r && (S.current.srcObject = r);
  }, [r]);
  const j = o === "granted", L = Ht(o), P = y ?? !j, I = b ?? (P && !j ? "Allow camera to join" : "Join now"), A = g ?? Bt(x, w, f);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": C,
      className: v(
        "flex flex-col h-full min-h-0 bg-slate-50 text-slate-900",
        N
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-slate-500 mt-0.5", children: A })
          ] }),
          /* @__PURE__ */ e(de, { variant: "ghost", size: "sm", onClick: m, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black", children: [
              r && j && /* @__PURE__ */ e(
                "video",
                {
                  ref: S,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: v(
                    "w-full h-full object-cover scale-x-[-1]",
                    !s && "opacity-0"
                  )
                }
              ),
              j && !s && (n ? (
                // Meet/Teams-style identity tile: large avatar + display
                // name + "Camera off" subtitle. Avatar falls back to
                // initials when avatarSrc is absent.
                /* @__PURE__ */ e(
                  "div",
                  {
                    "data-testid": "prejoin-identity-tile",
                    className: "absolute inset-0 grid place-items-center bg-slate-900/95",
                    children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 px-6 text-center", children: [
                      /* @__PURE__ */ e(
                        ce,
                        {
                          name: n.displayName,
                          src: n.avatarSrc,
                          size: 96
                        }
                      ),
                      /* @__PURE__ */ i("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ e("span", { className: "text-white text-base font-medium truncate max-w-[16rem]", children: n.displayName }),
                        /* @__PURE__ */ e("span", { className: "text-slate-300 text-xs", children: "Camera off" })
                      ] })
                    ] })
                  }
                )
              ) : /* @__PURE__ */ e(
                "div",
                {
                  "data-testid": "prejoin-camera-off-fallback",
                  className: "absolute inset-0 grid place-items-center text-slate-300 text-sm",
                  children: "Camera off"
                }
              )),
              o === "pending" && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ e(ye, { size: "lg" }) }),
              L && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center bg-slate-50/95", children: /* @__PURE__ */ e(
                Ae,
                {
                  kind: "camera",
                  state: L,
                  message: a,
                  onRetry: p,
                  "data-testid": "prejoin-permission-card"
                }
              ) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ e(
                G,
                {
                  on: d,
                  onClick: c,
                  disabled: !j,
                  "aria-label": d ? "Mute mic before joining" : "Unmute mic before joining",
                  title: d ? "Mute mic before joining" : "Unmute mic before joining",
                  iconOn: /* @__PURE__ */ e(Ce, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Me, { size: 18 }),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                G,
                {
                  on: s,
                  onClick: u,
                  disabled: !j,
                  "aria-label": s ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: s ? "Turn camera off before joining" : "Turn camera on before joining",
                  iconOn: /* @__PURE__ */ e(Le, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(je, { size: 18 }),
                  "data-testid": "prejoin-toggle-video"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i("section", { className: "lg:w-96 flex flex-col", children: [
            /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ e("h2", { className: "text-2xl font-semibold mb-2", children: "Ready to join?" }),
              /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6", children: A }),
              /* @__PURE__ */ e(Rt, { participants: x, loading: f }),
              w === "pending" && !f && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-amber-600 flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" }),
                "Other publishers are still connecting — you can join anyway."
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ e(
                de,
                {
                  variant: "primary",
                  size: "lg",
                  onClick: () => l({ audio: d, video: s }),
                  disabled: P,
                  "data-testid": "prejoin-join-button",
                  children: I
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: m,
                  className: "text-xs text-slate-500 hover:text-slate-900 transition-colors text-center",
                  children: "Back to rooms"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Rt({
  participants: t,
  loading: n
}) {
  return n ? /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
    /* @__PURE__ */ e(ye, { size: "sm" }),
    " Checking room…"
  ] }) : !t || t.length === 0 ? null : /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ e("div", { className: "text-xs uppercase tracking-wide text-slate-500", children: "In the room" }),
    /* @__PURE__ */ i("ul", { className: "flex flex-col gap-1.5", children: [
      t.slice(0, 8).map((r) => {
        const o = r.displayName ?? r.participantId.slice(0, 8);
        return /* @__PURE__ */ i("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e(ce, { name: o, size: 24 }),
          /* @__PURE__ */ e("span", { className: "font-mono text-xs truncate", children: o }),
          /* @__PURE__ */ e(
            ne,
            {
              size: "xs",
              tone: r.ready ? "success" : "warning",
              dot: r.ready ? "static" : "pulse",
              uppercase: !0,
              className: "ml-auto",
              children: r.ready ? "live" : "connecting"
            }
          )
        ] }, r.participantId);
      }),
      t.length > 8 && /* @__PURE__ */ i("li", { className: "text-xs text-slate-500", children: [
        "+",
        t.length - 8,
        " more"
      ] })
    ] })
  ] });
}
const $t = {
  idle: "neutral",
  joining: "warning",
  joined: "success",
  reconnecting: "warning",
  ended: "neutral",
  failed: "danger"
}, Dt = {
  idle: "Idle",
  joining: "Joining…",
  joined: "Live",
  reconnecting: "Reconnecting…",
  ended: "Ended",
  failed: "Failed"
};
function zt() {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "10",
      height: "10",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ e("polyline", { points: "12 7 12 12 15 14" })
      ]
    }
  );
}
function yn({
  channelName: t,
  subtitle: n,
  recording: r,
  elapsedLabel: o,
  phase: a,
  actions: d,
  className: s,
  "data-testid": c
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": c,
      className: v(
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-white",
        s
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate text-slate-900", children: t }),
          (n || r?.armed || o) && /* @__PURE__ */ i("div", { className: "text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap", children: [
            n && /* @__PURE__ */ e("span", { children: n }),
            r?.armed && /* @__PURE__ */ e(
              ne,
              {
                tone: r.active ? "danger" : "neutral",
                size: "xs",
                uppercase: !0,
                dot: r.active ? "pulse" : "static",
                title: r.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
                "data-testid": "hangout-room-header-recording",
                children: "Rec"
              }
            ),
            o && /* @__PURE__ */ e(
              ne,
              {
                tone: "neutral",
                size: "xs",
                icon: /* @__PURE__ */ e(zt, {}),
                title: "Time since you joined this room",
                "data-testid": "hangout-room-header-elapsed",
                children: /* @__PURE__ */ e("span", { className: "tabular-nums", children: o })
              }
            )
          ] })
        ] }),
        (a || d) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
          a && /* @__PURE__ */ e(
            ne,
            {
              tone: $t[a],
              size: "sm",
              dot: a === "reconnecting" ? "pulse" : "static",
              "data-testid": "hangout-room-header-phase",
              children: Dt[a]
            }
          ),
          d
        ] })
      ]
    }
  );
}
const Ft = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, Wt = {
  sm: 16,
  md: 20,
  lg: 24
};
function kn({
  audioOn: t,
  videoOn: n,
  screenSharing: r = !1,
  onToggleAudio: o,
  onToggleVideo: a,
  onToggleScreenShare: d,
  onLeave: s,
  audioDisabled: c,
  videoDisabled: u,
  screenShareDisabled: p,
  extras: x,
  leaveLabel: w = "Leave call",
  size: f = "md",
  className: l,
  "data-testid": m
}) {
  const b = f === "lg" ? 22 : f === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": m,
      className: v(
        "flex items-center justify-center gap-3 px-4 py-3",
        l
      ),
      children: [
        /* @__PURE__ */ e(
          G,
          {
            on: t,
            onClick: o,
            disabled: c,
            size: f,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(Ce, { size: b }),
            iconOff: /* @__PURE__ */ e(Me, { size: b }),
            "data-testid": "media-controls-mic"
          }
        ),
        /* @__PURE__ */ e(
          G,
          {
            on: n,
            onClick: a,
            disabled: u,
            size: f,
            "aria-label": n ? "Turn off camera" : "Turn on camera",
            title: n ? "Turn off camera" : "Turn on camera",
            iconOn: /* @__PURE__ */ e(Le, { size: b }),
            iconOff: /* @__PURE__ */ e(je, { size: b }),
            "data-testid": "media-controls-cam"
          }
        ),
        d && /* @__PURE__ */ e(
          G,
          {
            on: r,
            onClick: d,
            disabled: p,
            size: f,
            offTone: "neutral",
            "aria-label": r ? "Stop sharing screen" : "Share screen",
            title: r ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(It, { size: b }),
            iconOff: /* @__PURE__ */ e(Tt, { size: b }),
            "data-testid": "media-controls-screenshare"
          }
        ),
        x,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
            "aria-label": w,
            title: w,
            "data-testid": "media-controls-leave",
            className: v(
              "rounded-full grid place-items-center transition-colors duration-150",
              Ft[f],
              "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            ),
            children: /* @__PURE__ */ e(At, { size: Wt[f] })
          }
        )
      ]
    }
  );
}
export {
  hn as A,
  Zt as B,
  Je as C,
  rn as D,
  fn as E,
  mt as F,
  xt as G,
  wn as H,
  un as I,
  ft as J,
  kn as M,
  We as N,
  At as P,
  en as R,
  It as S,
  vn as T,
  Qt as V,
  Ge as a,
  an as b,
  ue as c,
  on as d,
  pn as e,
  G as f,
  yn as g,
  Ce as h,
  Me as i,
  bn as j,
  xn as k,
  cn as l,
  tn as m,
  gn as n,
  sn as o,
  ln as p,
  dt as q,
  mn as r,
  dn as s,
  Tt as t,
  qt as u,
  nn as v,
  Ne as w,
  Le as x,
  je as y,
  Jt as z
};
