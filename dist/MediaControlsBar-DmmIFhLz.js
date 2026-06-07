import { jsxs as i, jsx as e, Fragment as re } from "react/jsx-runtime";
import { useRef as H, useState as I, useEffect as B, useMemo as J, useCallback as R, useImperativeHandle as Ee, useLayoutEffect as Pe } from "react";
import { c as f } from "./cn-B6yFEsav.js";
import { P as Ie, S as Te } from "./RemoteTileSlot-BXvSW4lr.js";
import { B as ce } from "./Button-Qsbxqsl9.js";
import { A as we } from "./Avatar-BvKIaNVE.js";
import { C as ne } from "./Chip-CAS9vOWq.js";
import { S as ye, P as Ae } from "./PermissionDeniedCard-B9U2evs3.js";
const Be = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Yt({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: o = !0,
  loop: a = !1,
  controls: c = !1,
  poster: l,
  phase: h,
  className: d,
  style: p,
  onPhaseChange: x,
  onTimeUpdate: y
}) {
  const v = H(null), [s, m] = I("idle"), b = h ?? s;
  B(() => {
    const k = v.current;
    if (!k) return;
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
        y?.(k.currentTime, k.duration);
      }]
    ];
    return C.forEach(([j, S]) => k.addEventListener(j, S)), () => C.forEach(([j, S]) => k.removeEventListener(j, S));
  }, [x, y]), B(() => {
    const k = v.current;
    k && n !== void 0 && (k.srcObject = n);
  }, [n]);
  const N = b !== "playing", g = Be[b];
  return /* @__PURE__ */ i(
    "div",
    {
      className: f("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: p,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: v,
            src: n ? void 0 : t,
            autoPlay: r,
            muted: o,
            loop: a,
            controls: c,
            poster: l,
            playsInline: !0,
            className: f("w-full h-full object-contain block")
          }
        ),
        N && g && /* @__PURE__ */ i("div", { className: f("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          b === "buffering" && /* @__PURE__ */ e(Re, {}),
          /* @__PURE__ */ e("span", { className: f(b === "buffering" ? "ml-2" : ""), children: g })
        ] })
      ]
    }
  );
}
function Re() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: f("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function He(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function Kt({
  onClose: t,
  sources: n,
  title: r,
  subtitle: o,
  autoPlay: a = !0,
  muted: c = !1,
  hideDownload: l = !1,
  header: h,
  footer: d,
  className: p
}) {
  const x = J(() => n.filter((m) => !!m.url), [n]), [y, v] = I(0), s = x[y];
  return B(() => {
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
      className: f(
        "fixed inset-0 z-50 grid place-items-center p-4",
        "bg-black/80 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          onClick: (m) => m.stopPropagation(),
          className: f(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            p
          ),
          children: [
            (r || o || h) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                r && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: r }),
                o && /* @__PURE__ */ e("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
                h,
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: t,
                    "aria-label": "Close",
                    className: f(
                      "h-8 w-8 grid place-items-center rounded text-xl leading-none",
                      "hover:bg-white/10"
                    ),
                    children: "×"
                  }
                )
              ] })
            ] }),
            s ? /* @__PURE__ */ e(
              "video",
              {
                src: s.url,
                controls: !0,
                autoPlay: a,
                muted: c,
                className: "w-full max-h-[70vh] bg-black"
              },
              s.url
            ) : /* @__PURE__ */ e("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            x.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: f(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: x.map((m, b) => {
                  const N = b === y;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => v(b),
                      className: f(
                        "px-2.5 py-1 rounded transition-colors",
                        N ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": N ? "true" : void 0,
                      title: m.sizeBytes != null ? He(m.sizeBytes) : void 0,
                      children: m.label || `Segment ${b + 1}`
                    },
                    `${b}:${m.url}`
                  );
                })
              }
            ),
            (d || !l && s) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: d }),
              !l && s && /* @__PURE__ */ e(
                "a",
                {
                  href: s.url,
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
function Gt({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", $e(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, a]) => /* @__PURE__ */ i("div", { className: f("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: f("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: f("font-mono"), children: a })
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
  return /* @__PURE__ */ i("div", { className: f("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
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
function Jt({ participants: t, style: n }) {
  const r = t.length, o = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: f("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...n },
      children: t.map((a) => /* @__PURE__ */ e(
        Ie,
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
function Zt({ reactions: t, style: n }) {
  const [r, o] = I([]);
  return B(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], c = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), c]);
  }, [t]), B(() => {
    const a = setInterval(() => {
      o((c) => c.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(a);
  }, []), /* @__PURE__ */ e("div", { className: f("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((a) => /* @__PURE__ */ e(
    "span",
    {
      className: f("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${a.x}%` },
      children: a.emoji
    },
    a.id
  )) });
}
const Ve = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function qt({ onReact: t, emojis: n = Ve, style: r }) {
  return /* @__PURE__ */ e("div", { className: f("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: f("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (a) => a.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (a) => a.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (a) => a.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function Oe(t) {
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
function Qt({ phase: t, bitrateBps: n, viewerCount: r, duration: o, style: a }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: f("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: f("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: f("w-[7px] h-[7px] rounded-full", Ue[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: f("font-semibold", Xe[t] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: Oe(n) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: _e(o) }),
    r !== void 0 && /* @__PURE__ */ i("span", { className: f("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function en({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i("div", { className: f("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
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
  className: c,
  style: l
}) {
  const h = t.slice(0, r), d = Math.max(0, t.length - r), p = t.length === 0 && !!n;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": a,
      "data-count": t.length,
      className: f(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        c
      ),
      style: l,
      children: [
        h.map((x) => /* @__PURE__ */ e(Z, { participant: x, size: o }, x.id)),
        d > 0 && /* @__PURE__ */ i(
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
      onClick: a,
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
function Je({
  mode: t,
  isMuted: n = !1,
  isCameraOn: r = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: c,
  onToggleScreenShare: l,
  onUpgradeToVideo: h,
  onEndCall: d,
  onAddParticipant: p,
  availableParticipants: x,
  currentParticipantIds: y,
  className: v
}) {
  const [s, m] = I(!1), b = new Set(y ?? []), N = (x ?? []).filter((g) => !b.has(g.id));
  return /* @__PURE__ */ i("div", { className: f("flex flex-col", v), children: [
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
              onClick: c,
              testId: "camera-button"
            }
          ),
          t === "audio" && h && /* @__PURE__ */ e(
            K,
            {
              icon: _.videoUpgrade,
              label: "Switch to video",
              onClick: h,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            K,
            {
              icon: _.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          p && /* @__PURE__ */ e(
            K,
            {
              icon: _.userPlus,
              label: "Add participant",
              active: s,
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
              onClick: d,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    s && p && /* @__PURE__ */ i(
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
          N.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: N.map((g) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                p(g.id), N.length <= 1 && m(!1);
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
function de({
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
      className: f(
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
function ue({
  stream: t,
  muted: n = !1,
  className: r
}) {
  const o = H(null);
  return B(() => {
    const a = o.current;
    a && a.srcObject !== t && (a.srcObject = t);
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
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: h,
  onToggleCamera: d,
  onToggleScreenShare: p,
  onUpgradeToVideo: x,
  onAddParticipant: y,
  availableParticipants: v,
  onEndCall: s,
  layoutComponent: m,
  callStats: b
}) {
  const N = t === "video" && c;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && m && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      m,
      /* @__PURE__ */ e(de, { stats: b, position: "bottom-left" })
    ] }),
    t === "video" && !m && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && N ? /* @__PURE__ */ e(ue, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(Z, { participant: r, size: 48 }) }),
      n.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        n[0].videoStream ? /* @__PURE__ */ e(ue, { stream: n[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(Z, { participant: n[0], size: 28 }) }),
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
      /* @__PURE__ */ e(de, { stats: b, position: "bottom-left" })
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
        isCameraOn: c,
        isScreenSharing: l,
        onToggleMute: h,
        onToggleCamera: d,
        onToggleScreenShare: p,
        onUpgradeToVideo: x,
        onEndCall: s,
        onAddParticipant: y,
        availableParticipants: v,
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
  onToggleMute: c,
  onEndCall: l,
  onExpand: h
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: h,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (d) => d.key === "Enter" && h?.(),
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: f(
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
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (d) => d.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: c,
              className: f(
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
              onClick: l,
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
  const [n, r] = I({ x: 0, y: 0 }), [o, a] = I(!1), [c, l] = I(!1), h = H(!1), d = H({ x: 0, y: 0 }), p = H({ x: 0, y: 0 }), x = H(null), y = R(
    (N) => {
      t && (h.current = !0, a(!0), l(!1), d.current = { x: N.clientX, y: N.clientY }, p.current = { ...n }, N.preventDefault());
    },
    [t, n]
  ), v = R(() => {
    l(!0), r({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), s = R(
    (N) => {
      const g = x.current;
      if (!g) return;
      const k = g.offsetParent, C = 16;
      let j = window.innerWidth, S = window.innerHeight;
      k && (j = k.clientWidth, S = k.clientHeight);
      const L = g.getBoundingClientRect(), E = k ? k.getBoundingClientRect() : { left: 0, top: 0 };
      let P, T;
      switch (N) {
        case "top-left":
          P = C, T = C;
          break;
        case "top-right":
          P = j - L.width - C, T = C;
          break;
        case "bottom-left":
          P = C, T = S - L.height - C;
          break;
        default:
          P = j - L.width - C, T = S - L.height - C;
          break;
      }
      const D = L.left - E.left - n.x, z = L.top - E.top - n.y;
      l(!0), r({ x: P - D, y: T - z }), setTimeout(() => l(!1), 200);
    },
    [n]
  ), m = H(s);
  m.current = s, B(() => {
    if (!t) return;
    const N = (k) => {
      h.current && r({
        x: p.current.x + (k.clientX - d.current.x),
        y: p.current.y + (k.clientY - d.current.y)
      });
    }, g = () => {
      if (!h.current) return;
      h.current = !1, a(!1);
      const k = x.current;
      if (!k) return;
      const C = k.offsetParent, j = 80;
      let S = window.innerWidth, L = window.innerHeight;
      if (C) {
        const w = C.getBoundingClientRect();
        S = w.width, L = w.height;
      }
      const E = k.getBoundingClientRect(), P = C ? C.getBoundingClientRect() : { left: 0, top: 0 }, T = E.left - P.left, D = E.top - P.top, z = S - (T + E.width), O = L - (D + E.height), W = T < j, F = z < j, M = D < j, u = O < j;
      M && W ? m.current("top-left") : M && F ? m.current("top-right") : u && W ? m.current("bottom-left") : u && F && m.current("bottom-right");
    };
    return document.addEventListener("mousemove", N), document.addEventListener("mouseup", g), () => {
      document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", g);
    };
  }, [t]);
  const b = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: y, resetOffset: v, snapToCorner: s, isDragging: o, isAnimating: c, hasMoved: b, widgetRef: x };
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
  return /* @__PURE__ */ e("div", { className: f(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: o, classes: a }) => /* @__PURE__ */ e(
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
function tn({
  state: t,
  mode: n,
  participants: r,
  localParticipant: o,
  callerName: a,
  duration: c,
  isMuted: l = !1,
  isCameraOn: h = !0,
  isScreenSharing: d = !1,
  onAnswer: p,
  onDecline: x,
  onEndCall: y,
  onToggleMute: v,
  onToggleCamera: s,
  onToggleScreenShare: m,
  onUpgradeToVideo: b,
  onAddParticipant: N,
  availableParticipants: g,
  onMinimize: k,
  onExpand: C,
  layoutComponent: j,
  callStats: S,
  minimized: L = !1,
  position: E = "bottom-right",
  contained: P = !1,
  draggable: T = !0,
  className: D,
  style: z,
  dataAttrs: O
}) {
  const { offset: W, handleMouseDown: F, resetOffset: M, snapToCorner: u, isDragging: w, isAnimating: A, hasMoved: X, widgetRef: V } = rt(T), Y = {};
  if (O)
    for (const [je, q] of Object.entries(O))
      q != null && q !== "" && (Y[je] = q);
  const Se = J(() => {
    switch (E) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [E]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(re, { children: [
    w && /* @__PURE__ */ e(it, { onSnap: u, contained: P }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: V,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: f(
          P ? "absolute z-50" : "fixed z-[9999]",
          Se,
          D
        ),
        style: {
          transform: `translate(${W.x}px, ${W.y}px)`,
          transition: A ? "transform 0.2s ease-out" : void 0,
          ...z
        },
        ...Y,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: f(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              L ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !L && /* @__PURE__ */ i(
                "div",
                {
                  className: f(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    T && "cursor-grab active:cursor-grabbing"
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
                      k && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: k,
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
                  className: f(T && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: F,
                  children: /* @__PURE__ */ e(
                    nt,
                    {
                      state: t,
                      mode: n,
                      duration: c,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: v,
                      onEndCall: y,
                      onExpand: k
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
                    duration: c,
                    isMuted: l,
                    isCameraOn: h,
                    isScreenSharing: d,
                    onToggleMute: v,
                    onToggleCamera: s,
                    onToggleScreenShare: m,
                    onUpgradeToVideo: b,
                    onAddParticipant: N,
                    availableParticipants: g,
                    onEndCall: y,
                    layoutComponent: j,
                    callStats: S
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
function nn({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: o = "started",
  onJoin: a,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: h,
  style: d
}) {
  const [p, x] = I(!0);
  return B(() => {
    if (!l || l <= 0) return;
    const y = setTimeout(() => {
      x(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(y);
  }, [l, c]), p ? /* @__PURE__ */ i(
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
        h
      ),
      style: d,
      children: [
        /* @__PURE__ */ e(ot, { name: t, avatarUrl: n }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                x(!1), c();
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
function he(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = n > 0 ? String(r).padStart(2, "0") : String(r), c = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${a}:${c}` : `${a}:${c}`;
}
function rn({
  playlistUrl: t,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: c,
  onError: l,
  hideDownload: h = !1,
  className: d
}) {
  const p = H(null), x = H(null), [y, v] = I(!1), [s, m] = I(0), [b, N] = I(0), [g, k] = I(1), [C, j] = I(1), [S, L] = I(!1), [E, P] = I(null);
  B(() => {
    const M = p.current;
    if (!M || !t) return;
    if (P(null), L(!0), M.canPlayType("application/vnd.apple.mpegurl"))
      return M.src = t, () => {
        M.removeAttribute("src"), M.load();
      };
    let u = !1;
    return (async () => {
      try {
        const w = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (u) return;
        if (!w.isSupported()) {
          P("HLS playback is not supported in this browser."), L(!1);
          return;
        }
        const A = new w({ enableWorker: !0 });
        x.current = A, A.attachMedia(M), A.on(w.Events.MEDIA_ATTACHED, () => A.loadSource(t)), A.on(w.Events.ERROR, (X, V) => {
          V.fatal && (P(`HLS error: ${V.type}`), l?.(new Error(`HLS fatal: ${V.type}`)));
        });
      } catch (w) {
        if (u) return;
        P(`Failed to load hls.js — install it in the consumer app: ${w?.message ?? w}`);
      }
    })(), () => {
      if (u = !0, x.current) {
        try {
          x.current.destroy();
        } catch {
        }
        x.current = null;
      }
    };
  }, [t, l]);
  const T = () => {
    const M = p.current;
    M && (M.paused ? M.play().catch(() => {
    }) : M.pause());
  }, D = (M) => {
    const u = p.current;
    !u || !isFinite(b) || b <= 0 || (u.currentTime = Number(M.target.value));
  }, z = (M) => {
    const u = p.current;
    if (!u) return;
    const w = Number(M.target.value);
    u.volume = w, k(w);
  }, O = (M) => {
    const u = p.current;
    if (!u) return;
    const w = Number(M.target.value);
    u.playbackRate = w, j(w);
  }, W = () => {
    const M = p.current;
    M && (document.fullscreenElement ? document.exitFullscreen() : M.requestFullscreen?.());
  }, F = J(
    () => b > 0 ? Math.min(100, s / b * 100) : 0,
    [s, b]
  );
  return /* @__PURE__ */ i("div", { className: f("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: p,
        autoPlay: r,
        muted: o,
        poster: n,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => v(!0),
        onPause: () => v(!1),
        onLoadedMetadata: (M) => {
          const u = M.currentTarget;
          N(u.duration), L(!1), a?.(u.duration);
        },
        onTimeUpdate: (M) => {
          const u = M.currentTarget;
          m(u.currentTime), c?.(u.currentTime, u.duration);
        },
        onWaiting: () => L(!0),
        onCanPlay: () => L(!1),
        onError: () => {
          P("Playback error."), l?.(new Error("video element error")), L(!1);
        }
      }
    ),
    S && !E && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    E && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: E }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: he(s) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(b) ? b : 0,
            step: 0.1,
            value: s,
            onChange: D,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${F}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: he(b) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: T,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": y ? "Pause" : "Play",
            children: y ? /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
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
            onChange: O,
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
        !h && t && /* @__PURE__ */ e(
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
function fe(t) {
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
  label: c,
  status: l = "ready",
  selected: h,
  onClick: d,
  actions: p,
  className: x
}) {
  const y = typeof d == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...y ? {
        role: "button",
        tabIndex: 0,
        onClick: () => d(t),
        onKeyDown: (s) => {
          y && (s.key === "Enter" || s.key === " ") && (s.preventDefault(), d(t));
        },
        "aria-pressed": h ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: f(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        y && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        h ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
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
              onError: (s) => {
                s.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(ct, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: st(r) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? fe(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: fe(n) }),
        p && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (s) => s.stopPropagation(),
            children: p
          }
        )
      ]
    }
  );
}
function on({
  recordings: t,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: a,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: [0, 1, 2].map((h) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    h
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: f("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: t.map((h) => /* @__PURE__ */ e(
    dt,
    {
      id: h.id,
      startIso: h.startIso,
      endIso: h.endIso,
      durationSec: h.durationSec,
      participantCount: h.participantCount,
      thumbnailUrl: h.thumbnailUrl,
      label: h.label,
      status: h.status,
      selected: h.id === n,
      onClick: r,
      actions: c?.(h)
    },
    h.id
  )) });
}
function an({
  getVideoElement: t,
  className: n,
  title: r
}) {
  const [o, a] = I(!1), [c, l] = I(!1);
  B(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), B(() => {
    const p = () => a(!1), x = () => a(!0);
    return document.addEventListener("leavepictureinpicture", p), document.addEventListener("enterpictureinpicture", x), () => {
      document.removeEventListener("leavepictureinpicture", p), document.removeEventListener("enterpictureinpicture", x);
    };
  }, []);
  const h = R(async () => {
    if (c)
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
  }, [c, t]), d = !c;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: h,
      disabled: d,
      title: r ?? (d ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: f(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
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
function ln({
  participants: t,
  activeSpeakerId: n,
  onParticipantClick: r,
  count: o,
  title: a = "Participants",
  footer: c,
  className: l
}) {
  const h = o ?? t.length;
  return /* @__PURE__ */ i(
    "aside",
    {
      className: f(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ i("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: a }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: h })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((d) => {
          const p = d.id === n;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: r ? () => r(d.id) : void 0,
              className: f(
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
                    className: f(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      p && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      d.avatarUrl ? /* @__PURE__ */ e("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: ut(d.displayName) }),
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
                /* @__PURE__ */ i("span", { className: "flex-1 truncate text-sm text-[var(--color-text-primary)]", children: [
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
        c && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: c })
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
function sn({
  localStream: t,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [c, l] = I(!1);
  return B(() => {
    if (!n || !t || t.getAudioTracks().filter((N) => N.readyState === "live").length === 0) return;
    const d = ht();
    if (!d) return;
    let p, x;
    try {
      p = d.createMediaStreamSource(t), x = d.createAnalyser(), x.fftSize = 512, x.smoothingTimeConstant = 0.6, p.connect(x);
    } catch {
      return;
    }
    let y = null, v = 0, s = !1;
    const m = new Float32Array(x.frequencyBinCount), b = setInterval(() => {
      if (s) return;
      x.getFloatTimeDomainData(m);
      let N = 0;
      for (let C = 0; C < m.length; C++) N += m[C] * m[C];
      const g = 20 * Math.log10(Math.sqrt(N / m.length)), k = Date.now();
      g > r ? (y == null && (y = k), k - y >= o && k - v > a && (l(!0), v = k, setTimeout(() => {
        s || l(!1);
      }, 3e3), y = null)) : y = null;
    }, 200);
    return () => {
      s = !0, clearInterval(b);
      try {
        p.disconnect();
      } catch {
      }
      try {
        x.disconnect();
      } catch {
      }
    };
  }, [t, n, r, o, a]), B(() => {
    n || l(!1);
  }, [n]), c;
}
const ft = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function mt() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((n) => {
    if (n.paused) {
      const r = n.play();
      r && typeof r.catch == "function" && r.catch(() => {
      });
    }
  });
}
function cn({
  chipLabel: t = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...a
}) {
  const [c, l] = I(!1), h = H(null), p = a.videoRef ?? h, x = R(
    (v) => {
      v === "paused-by-autoplay" ? l(!0) : v === "playing" && l(!1), o?.(v);
    },
    [o]
  ), y = R(() => {
    const v = p.current;
    if (v) {
      v.muted = !1;
      const s = v.play();
      s && typeof s.catch == "function" && s.catch(() => {
      });
    }
    mt(), l(!1);
  }, [p]);
  return /* @__PURE__ */ i("div", { className: f("relative h-full w-full", r), children: [
    /* @__PURE__ */ e(
      Te,
      {
        ...a,
        videoRef: p,
        onPlayStateChange: x
      }
    ),
    c && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: y,
        className: f(ft, n),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
const me = 1;
function pt({
  persistKey: t,
  defaults: n,
  debounceMs: r = 200
}) {
  const [o, a] = I(() => {
    if (!t || typeof window > "u") return n;
    try {
      const h = window.localStorage.getItem(t);
      if (!h) return n;
      const d = JSON.parse(h);
      return !d || d.v !== me ? n : {
        mode: d.mode === "docked" ? "docked" : "mini",
        x: ee(d.x, n.x),
        y: ee(d.y, n.y),
        width: ee(d.width, n.width),
        height: ee(d.height, n.height)
      };
    } catch {
      try {
        window.localStorage.removeItem(t);
      } catch {
      }
      return n;
    }
  }), c = H(null);
  B(() => {
    if (!(!t || typeof window > "u"))
      return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        try {
          const h = { v: me, ...o };
          window.localStorage.setItem(t, JSON.stringify(h));
        } catch {
        }
      }, r), () => {
        c.current && clearTimeout(c.current);
      };
  }, [t, o, r]);
  const l = R((h) => {
    a((d) => ({ ...d, ...h }));
  }, []);
  return { state: o, setState: l };
}
function ee(t, n) {
  return typeof t == "number" && Number.isFinite(t) ? t : n;
}
const ae = 320, le = 200, xt = 640, gt = 400, vt = 1440, bt = 900, pe = 960, xe = 600, $ = 8;
function dn({
  title: t,
  subtitle: n,
  children: r,
  controls: o,
  defaultMode: a = "mini",
  onModeChange: c,
  persistKey: l,
  apiRef: h,
  defaultCorner: d = "bottom-right",
  expandable: p = !0,
  zIndex: x = 9999,
  className: y
}) {
  const v = J(() => a === "docked" ? ge(pe, xe) : ve(d), [a, d]), { state: s, setState: m } = pt({
    persistKey: l,
    defaults: {
      mode: a,
      x: v.x,
      y: v.y,
      width: pe,
      height: xe
    }
  }), [b, N] = I(!1), g = b ? "fullscreen" : s.mode, k = H(null), C = H(!1);
  B(() => {
    const u = () => {
      !((document.fullscreenElement ?? document.webkitFullscreenElement) === k.current) && b && (N(!1), C.current || m({ mode: "docked" }), C.current = !1);
    };
    return document.addEventListener("fullscreenchange", u), document.addEventListener("webkitfullscreenchange", u), () => {
      document.removeEventListener("fullscreenchange", u), document.removeEventListener("webkitfullscreenchange", u);
    };
  }, [b, m]);
  const j = R(() => {
    const u = k.current;
    if (!u) return;
    const w = u.requestFullscreen?.bind(u) ?? u.webkitRequestFullscreen?.bind(u);
    if (!w) return;
    const A = w();
    A && typeof A.then == "function" ? A.then(
      () => N(!0),
      () => {
      }
    ) : N(!0);
  }, []), S = R(() => {
    if (!(document.fullscreenElement ?? document.webkitFullscreenElement)) return;
    C.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {
    });
  }, []), L = R((u) => {
    if (u !== g) {
      if (u === "fullscreen") {
        j();
        return;
      }
      if (g === "fullscreen") {
        S(), m({ mode: u });
        return;
      }
      if (u === "docked" && g === "mini") {
        const w = ge(s.width, s.height);
        m({ mode: u, x: w.x, y: w.y });
        return;
      }
      if (u === "mini" && g === "docked") {
        const w = ve(d);
        m({ mode: u, x: w.x, y: w.y });
        return;
      }
      m({ mode: u });
    }
  }, [g, j, S, m, s.width, s.height, d]);
  B(() => {
    c?.(g);
  }, [g, c]), Ee(h, () => ({ mode: g, setMode: L }), [g, L]);
  const E = H(null), P = R((u) => {
    g === "docked" && (u.target.closest("button") || (u.currentTarget.setPointerCapture(u.pointerId), E.current = {
      startX: u.clientX,
      startY: u.clientY,
      origX: s.x,
      origY: s.y
    }));
  }, [g, s.x, s.y]), T = R((u) => {
    const w = E.current;
    if (!w) return;
    const A = u.clientX - w.startX, X = u.clientY - w.startY, V = te(w.origX + A, s.width, window.innerWidth), Y = te(w.origY + X, s.height, window.innerHeight);
    m({ x: V, y: Y });
  }, [m, s.width, s.height]), D = R((u) => {
    u.currentTarget.releasePointerCapture(u.pointerId), E.current = null;
  }, []), z = H(null), O = R((u) => {
    g === "docked" && (u.stopPropagation(), u.currentTarget.setPointerCapture(u.pointerId), z.current = {
      startX: u.clientX,
      startY: u.clientY,
      origW: s.width,
      origH: s.height
    });
  }, [g, s.width, s.height]), W = R((u) => {
    const w = z.current;
    if (!w) return;
    const A = u.clientX - w.startX, X = u.clientY - w.startY, V = se(w.origW + A, xt, Math.min(vt, window.innerWidth - $ * 2)), Y = se(w.origH + X, gt, Math.min(bt, window.innerHeight - $ * 2));
    m({ width: V, height: Y });
  }, [m]), F = R((u) => {
    u.currentTarget.releasePointerCapture(u.pointerId), z.current = null;
  }, []);
  Pe(() => {
    if (g !== "docked") return;
    const u = () => {
      const w = te(s.x, s.width, window.innerWidth), A = te(s.y, s.height, window.innerHeight);
      (w !== s.x || A !== s.y) && m({ x: w, y: A });
    };
    return window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [g, s.x, s.y, s.width, s.height, m]);
  const M = J(() => g === "fullscreen" ? {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: x
  } : g === "docked" ? {
    position: "fixed",
    left: s.x,
    top: s.y,
    width: s.width,
    height: s.height,
    zIndex: x
  } : {
    position: "fixed",
    left: s.x,
    top: s.y,
    width: ae,
    height: le,
    zIndex: x
  }, [g, s.x, s.y, s.width, s.height, x]);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: k,
      "data-call-widget-mode": g,
      style: M,
      className: f(
        "flex flex-col bg-[#0f172a] text-white shadow-2xl overflow-hidden border border-white/10",
        g === "fullscreen" ? "rounded-none" : "rounded-lg",
        y
      ),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: f(
              "flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none",
              g === "docked" ? "cursor-grab active:cursor-grabbing" : ""
            ),
            onPointerDown: P,
            onPointerMove: T,
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
                    children: /* @__PURE__ */ e(wt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: g === "docked",
                    label: "Window",
                    onClick: () => L("docked"),
                    testId: "call-widget-mode-docked",
                    children: /* @__PURE__ */ e(yt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: g === "fullscreen",
                    label: "Fullscreen",
                    onClick: () => L(g === "fullscreen" ? "docked" : "fullscreen"),
                    testId: "call-widget-mode-fullscreen",
                    children: /* @__PURE__ */ e(kt, {})
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
            onPointerDown: O,
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
      className: f(
        "w-6 h-6 grid place-items-center rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors",
        t && "text-white bg-white/15"
      ),
      children: a
    }
  );
}
function wt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "6.5", y: "6.5", width: "4", height: "3", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function yt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "1.5", y: "2.5", width: "9", height: "7", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function kt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) });
}
function ge(t, n) {
  return typeof window > "u" ? { x: 16, y: 16 } : {
    x: Math.max($, Math.floor((window.innerWidth - t) / 2)),
    y: Math.max($, Math.floor((window.innerHeight - n) / 2))
  };
}
function ve(t) {
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
function un({ show: t, label: n }) {
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
function hn({ show: t, label: n = "Reconnecting…" }) {
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
function fn({
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
const be = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Nt(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) | 0;
  return be[Math.abs(n) % be.length];
}
function mn({
  lines: t,
  maxLines: n = 3,
  fadeAfterMs: r = 8e3,
  className: o
}) {
  const a = Date.now(), c = t.slice(-n).map((l) => {
    const h = a - new Date(l.at).getTime(), d = Math.max(0.35, 1 - h / r);
    return { ...l, opacity: d };
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
      children: c.map((l) => /* @__PURE__ */ i(
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
                style: { color: Nt(l.speakerId) },
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
const Ct = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, Mt = "bg-slate-200 text-slate-900 hover:bg-slate-300", Lt = "bg-slate-100 text-slate-500 hover:bg-slate-200", St = "bg-red-100 text-red-700 hover:bg-red-200";
function G({
  on: t,
  iconOn: n,
  iconOff: r,
  "aria-label": o,
  offTone: a = "danger",
  size: c = "md",
  disabled: l,
  className: h,
  ...d
}) {
  const p = t ? Mt : a === "danger" ? St : Lt;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": o,
      "aria-pressed": t,
      disabled: l,
      className: f(
        "rounded-full grid place-items-center transition-colors duration-150",
        Ct[c],
        p,
        l && "opacity-40 cursor-not-allowed",
        !l && "cursor-pointer",
        h
      ),
      ...d,
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
function Ne({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Ce({ size: t = 20, ...n }) {
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
function Me({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function Le({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function jt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function Et({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function Pt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function pn({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...U(t, n), children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "5", cy: "12", r: "1" })
  ] });
}
function It(t, n, r) {
  if (r) return "Checking room…";
  if (!n || n === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return n === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function Tt(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function xn({
  channelName: t,
  localIdentity: n,
  previewStream: r,
  permission: o,
  permissionMessage: a,
  audioEnabled: c,
  videoEnabled: l,
  onToggleAudio: h,
  onToggleVideo: d,
  onRetryPermission: p,
  participants: x,
  readyState: y,
  readyLoading: v = !1,
  onJoin: s,
  onCancel: m,
  joinLabel: b,
  joinDisabled: N,
  subtitleOverride: g,
  className: k,
  "data-testid": C
}) {
  const j = H(null);
  B(() => {
    j.current && r && (j.current.srcObject = r);
  }, [r]);
  const S = o === "granted", L = Tt(o), E = N ?? !S, P = b ?? (E && !S ? "Allow camera to join" : "Join now"), T = g ?? It(x, y, v);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": C,
      className: f(
        "flex flex-col h-full min-h-0 bg-slate-50 text-slate-900",
        k
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-slate-500 mt-0.5", children: T })
          ] }),
          /* @__PURE__ */ e(ce, { variant: "ghost", size: "sm", onClick: m, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black", children: [
              r && S && /* @__PURE__ */ e(
                "video",
                {
                  ref: j,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: f(
                    "w-full h-full object-cover scale-x-[-1]",
                    !l && "opacity-0"
                  )
                }
              ),
              S && !l && (n ? (
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
                        we,
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
                  on: c,
                  onClick: h,
                  disabled: !S,
                  "aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
                  title: c ? "Mute mic before joining" : "Unmute mic before joining",
                  iconOn: /* @__PURE__ */ e(Ne, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Ce, { size: 18 }),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                G,
                {
                  on: l,
                  onClick: d,
                  disabled: !S,
                  "aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: l ? "Turn camera off before joining" : "Turn camera on before joining",
                  iconOn: /* @__PURE__ */ e(Me, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Le, { size: 18 }),
                  "data-testid": "prejoin-toggle-video"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i("section", { className: "lg:w-96 flex flex-col", children: [
            /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ e("h2", { className: "text-2xl font-semibold mb-2", children: "Ready to join?" }),
              /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6", children: T }),
              /* @__PURE__ */ e(At, { participants: x, loading: v }),
              y === "pending" && !v && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-amber-600 flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" }),
                "Other publishers are still connecting — you can join anyway."
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ e(
                ce,
                {
                  variant: "primary",
                  size: "lg",
                  onClick: () => s({ audio: c, video: l }),
                  disabled: E,
                  "data-testid": "prejoin-join-button",
                  children: P
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
function At({
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
          /* @__PURE__ */ e(we, { name: o, size: 24 }),
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
const Bt = {
  idle: "neutral",
  joining: "warning",
  joined: "success",
  reconnecting: "warning",
  ended: "neutral",
  failed: "danger"
}, Rt = {
  idle: "Idle",
  joining: "Joining…",
  joined: "Live",
  reconnecting: "Reconnecting…",
  ended: "Ended",
  failed: "Failed"
};
function Ht() {
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
function gn({
  channelName: t,
  subtitle: n,
  recording: r,
  elapsedLabel: o,
  phase: a,
  actions: c,
  className: l,
  "data-testid": h
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": h,
      className: f(
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-white",
        l
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
                icon: /* @__PURE__ */ e(Ht, {}),
                title: "Time since you joined this room",
                "data-testid": "hangout-room-header-elapsed",
                children: /* @__PURE__ */ e("span", { className: "tabular-nums", children: o })
              }
            )
          ] })
        ] }),
        (a || c) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
          a && /* @__PURE__ */ e(
            ne,
            {
              tone: Bt[a],
              size: "sm",
              dot: a === "reconnecting" ? "pulse" : "static",
              "data-testid": "hangout-room-header-phase",
              children: Rt[a]
            }
          ),
          c
        ] })
      ]
    }
  );
}
const $t = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, Dt = {
  sm: 16,
  md: 20,
  lg: 24
};
function vn({
  audioOn: t,
  videoOn: n,
  screenSharing: r = !1,
  onToggleAudio: o,
  onToggleVideo: a,
  onToggleScreenShare: c,
  onLeave: l,
  audioDisabled: h,
  videoDisabled: d,
  screenShareDisabled: p,
  extras: x,
  leaveLabel: y = "Leave call",
  size: v = "md",
  className: s,
  "data-testid": m
}) {
  const b = v === "lg" ? 22 : v === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": m,
      className: f(
        "flex items-center justify-center gap-3 px-4 py-3",
        s
      ),
      children: [
        /* @__PURE__ */ e(
          G,
          {
            on: t,
            onClick: o,
            disabled: h,
            size: v,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(Ne, { size: b }),
            iconOff: /* @__PURE__ */ e(Ce, { size: b }),
            "data-testid": "media-controls-mic"
          }
        ),
        /* @__PURE__ */ e(
          G,
          {
            on: n,
            onClick: a,
            disabled: d,
            size: v,
            "aria-label": n ? "Turn off camera" : "Turn on camera",
            title: n ? "Turn off camera" : "Turn on camera",
            iconOn: /* @__PURE__ */ e(Me, { size: b }),
            iconOff: /* @__PURE__ */ e(Le, { size: b }),
            "data-testid": "media-controls-cam"
          }
        ),
        c && /* @__PURE__ */ e(
          G,
          {
            on: r,
            onClick: c,
            disabled: p,
            size: v,
            offTone: "neutral",
            "aria-label": r ? "Stop sharing screen" : "Share screen",
            title: r ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(jt, { size: b }),
            iconOff: /* @__PURE__ */ e(Et, { size: b }),
            "data-testid": "media-controls-screenshare"
          }
        ),
        x,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: l,
            "aria-label": y,
            title: y,
            "data-testid": "media-controls-leave",
            className: f(
              "rounded-full grid place-items-center transition-colors duration-150",
              $t[v],
              "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            ),
            children: /* @__PURE__ */ e(Pt, { size: Dt[v] })
          }
        )
      ]
    }
  );
}
export {
  cn as A,
  pt as B,
  Je as C,
  sn as D,
  dn as E,
  xn as H,
  vn as M,
  We as N,
  Pt as P,
  Zt as R,
  jt as S,
  mn as T,
  Jt as V,
  Ge as a,
  nn as b,
  de as c,
  tn as d,
  un as e,
  G as f,
  gn as g,
  Ne as h,
  Ce as i,
  pn as j,
  fn as k,
  an as l,
  qt as m,
  hn as n,
  on as o,
  rn as p,
  dt as q,
  ln as r,
  Et as s,
  Gt as t,
  Qt as u,
  Me as v,
  Le as w,
  Yt as x,
  Kt as y,
  en as z
};
