import { jsxs as i, jsx as e, Fragment as X } from "react/jsx-runtime";
import { useRef as A, useState as E, useEffect as P, useMemo as q, useCallback as U } from "react";
import { c as f } from "./cn-B6yFEsav.js";
import { P as ge } from "./HangoutLayout-B677w0az.js";
import { A as le } from "./Avatar-BvKIaNVE.js";
import { B as te } from "./Button-Qsbxqsl9.js";
import { C as G } from "./Chip-CAS9vOWq.js";
import { S as se, P as ve } from "./PermissionDeniedCard-B9U2evs3.js";
const be = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Mt({
  src: t,
  stream: n,
  autoPlay: r = !1,
  muted: o = !0,
  loop: a = !1,
  controls: c = !1,
  poster: l,
  phase: s,
  className: u,
  style: h,
  onPhaseChange: p,
  onTimeUpdate: v
}) {
  const d = A(null), [m, x] = E("idle"), g = s ?? m;
  P(() => {
    const w = d.current;
    if (!w) return;
    const k = [
      ["waiting", () => {
        x("buffering"), p?.("buffering");
      }],
      ["playing", () => {
        x("playing"), p?.("playing");
      }],
      ["error", () => {
        x("error"), p?.("error");
      }],
      ["loadstart", () => {
        x("connecting"), p?.("connecting");
      }],
      ["timeupdate", () => {
        v?.(w.currentTime, w.duration);
      }]
    ];
    return k.forEach(([L, S]) => w.addEventListener(L, S)), () => k.forEach(([L, S]) => w.removeEventListener(L, S));
  }, [p, v]), P(() => {
    const w = d.current;
    w && n !== void 0 && (w.srcObject = n);
  }, [n]);
  const b = g !== "playing", y = be[g];
  return /* @__PURE__ */ i(
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
            loop: a,
            controls: c,
            poster: l,
            playsInline: !0,
            className: f("w-full h-full object-contain block")
          }
        ),
        b && y && /* @__PURE__ */ i("div", { className: f("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          g === "buffering" && /* @__PURE__ */ e(we, {}),
          /* @__PURE__ */ e("span", { className: f(g === "buffering" ? "ml-2" : ""), children: y })
        ] })
      ]
    }
  );
}
function we() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: f("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function ye(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function jt({
  onClose: t,
  sources: n,
  title: r,
  subtitle: o,
  autoPlay: a = !0,
  muted: c = !1,
  hideDownload: l = !1,
  header: s,
  footer: u,
  className: h
}) {
  const p = q(() => n.filter((x) => !!x.url), [n]), [v, d] = E(0), m = p[v];
  return P(() => {
    const x = (g) => {
      g.key === "Escape" && t();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
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
          onClick: (x) => x.stopPropagation(),
          className: f(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            h
          ),
          children: [
            (r || o || s) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                r && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: r }),
                o && /* @__PURE__ */ e("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
                s,
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
            m ? /* @__PURE__ */ e(
              "video",
              {
                src: m.url,
                controls: !0,
                autoPlay: a,
                muted: c,
                className: "w-full max-h-[70vh] bg-black"
              },
              m.url
            ) : /* @__PURE__ */ e("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            p.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: f(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: p.map((x, g) => {
                  const b = g === v;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => d(g),
                      className: f(
                        "px-2.5 py-1 rounded transition-colors",
                        b ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": b ? "true" : void 0,
                      title: x.sizeBytes != null ? ye(x.sizeBytes) : void 0,
                      children: x.label || `Segment ${g + 1}`
                    },
                    `${g}:${x.url}`
                  );
                })
              }
            ),
            (u || !l && m) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: u }),
              !l && m && /* @__PURE__ */ e(
                "a",
                {
                  href: m.url,
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
function ke(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function St({ metrics: t, style: n }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", ke(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: f("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, a]) => /* @__PURE__ */ i("div", { className: f("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: f("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: f("font-mono"), children: a })
  ] }, o)) });
}
const Ne = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, Ce = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, Le = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function Me({ quality: t, style: n }) {
  const r = Ne[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
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
    /* @__PURE__ */ e("span", { className: Ce[t], children: Le[t] })
  ] });
}
function Et({ participants: t, style: n }) {
  const r = t.length, o = r <= 1 ? 1 : r <= 4 ? 2 : r <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: f("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...n },
      children: t.map((a) => /* @__PURE__ */ e(
        ge,
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
function Tt({ reactions: t, style: n }) {
  const [r, o] = E([]);
  return P(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], c = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), c]);
  }, [t]), P(() => {
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
const je = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Bt({ onReact: t, emojis: n = je, style: r }) {
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
function Se(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function Ee(t) {
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${r}:${String(o).padStart(2, "0")}`;
}
const Te = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, Be = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function Pt({ phase: t, bitrateBps: n, viewerCount: r, duration: o, style: a }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: f("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: f("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: f("w-[7px] h-[7px] rounded-full", Te[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: f("font-semibold", Be[t] ?? "text-slate-400"), children: c })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: Se(n) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: Ee(o) }),
    r !== void 0 && /* @__PURE__ */ i("span", { className: f("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function At({ count: t, style: n }) {
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
function Pe(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Ae(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function Z({ participant: t, size: n = 32 }) {
  const r = Ae(t.displayName);
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
        ) : Pe(t.displayName),
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
function $e({
  participants: t,
  localFallback: n,
  maxVisible: r = 4,
  avatarSize: o = 36,
  testId: a = "call-participant-strip",
  className: c,
  style: l
}) {
  const s = t.slice(0, r), u = Math.max(0, t.length - r), h = t.length === 0 && !!n;
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
        s.map((p) => /* @__PURE__ */ e(Z, { participant: p, size: o }, p.id)),
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
        h && n && /* @__PURE__ */ e(Z, { participant: n, size: o + 4 })
      ]
    }
  );
}
const V = {
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
function _({
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
function Ie({
  mode: t,
  isMuted: n = !1,
  isCameraOn: r = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: c,
  onToggleScreenShare: l,
  onUpgradeToVideo: s,
  onEndCall: u,
  onAddParticipant: h,
  availableParticipants: p,
  currentParticipantIds: v,
  className: d
}) {
  const [m, x] = E(!1), g = new Set(v ?? []), b = (p ?? []).filter((y) => !g.has(y.id));
  return /* @__PURE__ */ i("div", { className: f("flex flex-col", d), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            _,
            {
              icon: n ? V.micOff : V.mic,
              label: n ? "Unmute" : "Mute",
              active: n,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            _,
            {
              icon: r ? V.camera : V.cameraOff,
              label: r ? "Turn off camera" : "Turn on camera",
              active: !r,
              onClick: c,
              testId: "camera-button"
            }
          ),
          t === "audio" && s && /* @__PURE__ */ e(
            _,
            {
              icon: V.videoUpgrade,
              label: "Switch to video",
              onClick: s,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            _,
            {
              icon: V.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          h && /* @__PURE__ */ e(
            _,
            {
              icon: V.userPlus,
              label: "Add participant",
              active: m,
              onClick: () => x((y) => !y),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ e(
            _,
            {
              icon: V.phoneEnd,
              label: "End call",
              danger: !0,
              onClick: u,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    m && h && /* @__PURE__ */ i(
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
                onClick: () => x(!1),
                className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
                "aria-label": "Close add-participant picker",
                children: "✕"
              }
            )
          ] }),
          b.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: b.map((y) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                h(y.id), b.length <= 1 && x(!1);
              },
              children: [
                /* @__PURE__ */ e(Z, { participant: y, size: 22 }),
                /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: y.displayName }),
                /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
              ]
            },
            y.id
          )) })
        ]
      }
    )
  ] });
}
function Re(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const Ve = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function ze(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)} Mb/s` : `${Math.round(t)} kb/s`;
}
function ne({
  stats: t,
  position: n = "top-left",
  testId: r = "call-stats-overlay",
  className: o,
  style: a
}) {
  return Re(t) ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": r,
      className: f(
        "absolute z-10 pointer-events-none",
        Ve[n],
        "flex flex-col gap-1.5",
        o
      ),
      style: a,
      children: [
        t.networkQuality && /* @__PURE__ */ e(Me, { quality: t.networkQuality }),
        (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              t.bitrateKbps !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                ze(t.bitrateKbps)
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
function ce(t) {
  const n = Math.floor(t / 60), r = t % 60;
  return `${n}:${r.toString().padStart(2, "0")}`;
}
function re({
  stream: t,
  muted: n = !1,
  className: r
}) {
  const o = A(null);
  return P(() => {
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
const Q = {
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
function He({
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
          children: Q.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: Q.phoneAnswer
        }
      )
    ] })
  ] });
}
function Oe({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: o,
  isMuted: a,
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: s,
  onToggleCamera: u,
  onToggleScreenShare: h,
  onUpgradeToVideo: p,
  onAddParticipant: v,
  availableParticipants: d,
  onEndCall: m,
  layoutComponent: x,
  callStats: g
}) {
  const b = t === "video" && c;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && x && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ e(ne, { stats: g, position: "bottom-left" })
    ] }),
    t === "video" && !x && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && b ? /* @__PURE__ */ e(re, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(Z, { participant: r, size: 48 }) }),
      n.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        n[0].videoStream ? /* @__PURE__ */ e(re, { stream: n[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(Z, { participant: n[0], size: 28 }) }),
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
      /* @__PURE__ */ e(ne, { stats: g, position: "bottom-left" })
    ] }),
    t === "audio" && /* @__PURE__ */ e(
      $e,
      {
        participants: n,
        localFallback: r,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: ce(o) }),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        n.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ e(
      Ie,
      {
        mode: t,
        isMuted: a,
        isCameraOn: c,
        isScreenSharing: l,
        onToggleMute: s,
        onToggleCamera: u,
        onToggleScreenShare: h,
        onUpgradeToVideo: p,
        onEndCall: m,
        onAddParticipant: v,
        availableParticipants: d,
        currentParticipantIds: n.map((y) => y.id)
      }
    )
  ] });
}
function De({
  state: t,
  mode: n,
  duration: r,
  isMuted: o,
  callerName: a,
  onToggleMute: c,
  onEndCall: l,
  onExpand: s
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: s,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (u) => u.key === "Enter" && s?.(),
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
          r !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: ce(r) })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (u) => u.stopPropagation(), children: [
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
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(X, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(X, { children: [
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
function Fe(t) {
  const [n, r] = E({ x: 0, y: 0 }), [o, a] = E(!1), [c, l] = E(!1), s = A(!1), u = A({ x: 0, y: 0 }), h = A({ x: 0, y: 0 }), p = A(null), v = U(
    (b) => {
      t && (s.current = !0, a(!0), l(!1), u.current = { x: b.clientX, y: b.clientY }, h.current = { ...n }, b.preventDefault());
    },
    [t, n]
  ), d = U(() => {
    l(!0), r({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), m = U(
    (b) => {
      const y = p.current;
      if (!y) return;
      const w = y.offsetParent, k = 16;
      let L = window.innerWidth, S = window.innerHeight;
      w && (L = w.clientWidth, S = w.clientHeight);
      const M = y.getBoundingClientRect(), B = w ? w.getBoundingClientRect() : { left: 0, top: 0 };
      let j, $;
      switch (b) {
        case "top-left":
          j = k, $ = k;
          break;
        case "top-right":
          j = L - M.width - k, $ = k;
          break;
        case "bottom-left":
          j = k, $ = S - M.height - k;
          break;
        default:
          j = L - M.width - k, $ = S - M.height - k;
          break;
      }
      const I = M.left - B.left - n.x, R = M.top - B.top - n.y;
      l(!0), r({ x: j - I, y: $ - R }), setTimeout(() => l(!1), 200);
    },
    [n]
  ), x = A(m);
  x.current = m, P(() => {
    if (!t) return;
    const b = (w) => {
      s.current && r({
        x: h.current.x + (w.clientX - u.current.x),
        y: h.current.y + (w.clientY - u.current.y)
      });
    }, y = () => {
      if (!s.current) return;
      s.current = !1, a(!1);
      const w = p.current;
      if (!w) return;
      const k = w.offsetParent, L = 80;
      let S = window.innerWidth, M = window.innerHeight;
      if (k) {
        const T = k.getBoundingClientRect();
        S = T.width, M = T.height;
      }
      const B = w.getBoundingClientRect(), j = k ? k.getBoundingClientRect() : { left: 0, top: 0 }, $ = B.left - j.left, I = B.top - j.top, R = S - ($ + B.width), D = M - (I + B.height), H = $ < L, F = R < L, N = I < L, C = D < L;
      N && H ? x.current("top-left") : N && F ? x.current("top-right") : C && H ? x.current("bottom-left") : C && F && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", b), document.addEventListener("mouseup", y), () => {
      document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", y);
    };
  }, [t]);
  const g = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: v, resetOffset: d, snapToCorner: m, isDragging: o, isAnimating: c, hasMoved: g, widgetRef: p };
}
function We({
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
function $t({
  state: t,
  mode: n,
  participants: r,
  localParticipant: o,
  callerName: a,
  duration: c,
  isMuted: l = !1,
  isCameraOn: s = !0,
  isScreenSharing: u = !1,
  onAnswer: h,
  onDecline: p,
  onEndCall: v,
  onToggleMute: d,
  onToggleCamera: m,
  onToggleScreenShare: x,
  onUpgradeToVideo: g,
  onAddParticipant: b,
  availableParticipants: y,
  onMinimize: w,
  layoutComponent: k,
  callStats: L,
  minimized: S = !1,
  position: M = "bottom-right",
  contained: B = !1,
  draggable: j = !0,
  className: $,
  style: I,
  dataAttrs: R
}) {
  const { offset: D, handleMouseDown: H, resetOffset: F, snapToCorner: N, isDragging: C, isAnimating: T, hasMoved: O, widgetRef: ee } = Fe(j), W = {};
  if (R)
    for (const [xe, J] of Object.entries(R))
      J != null && J !== "" && (W[xe] = J);
  const pe = q(() => {
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
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(X, { children: [
    C && /* @__PURE__ */ e(We, { onSnap: N, contained: B }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: ee,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: f(
          B ? "absolute z-50" : "fixed z-[9999]",
          pe,
          $
        ),
        style: {
          transform: `translate(${D.x}px, ${D.y}px)`,
          transition: T ? "transform 0.2s ease-out" : void 0,
          ...I
        },
        ...W,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: f(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              S ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !S && /* @__PURE__ */ i(
                "div",
                {
                  className: f(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    j && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: H,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: n === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                      O && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: F,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: Q.snapBack
                        }
                      ),
                      w && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: w,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: Q.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              S && /* @__PURE__ */ e(
                "div",
                {
                  className: f(j && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: H,
                  children: /* @__PURE__ */ e(
                    De,
                    {
                      state: t,
                      mode: n,
                      duration: c,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: d,
                      onEndCall: v,
                      onExpand: w
                    }
                  )
                }
              ),
              !S && /* @__PURE__ */ i(X, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  He,
                  {
                    callerName: a,
                    onAnswer: h,
                    onDecline: p
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
                  Oe,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: o,
                    duration: c,
                    isMuted: l,
                    isCameraOn: s,
                    isScreenSharing: u,
                    onToggleMute: d,
                    onToggleCamera: m,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: g,
                    onAddParticipant: b,
                    availableParticipants: y,
                    onEndCall: v,
                    layoutComponent: k,
                    callStats: L
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
function It({
  callerName: t,
  callerAvatarUrl: n,
  context: r,
  mode: o = "started",
  onJoin: a,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: s,
  style: u
}) {
  const [h, p] = E(!0);
  return P(() => {
    if (!l || l <= 0) return;
    const v = setTimeout(() => {
      p(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(v);
  }, [l, c]), h ? /* @__PURE__ */ i(
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
        /* @__PURE__ */ e(_e, { name: t, avatarUrl: n }),
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
                p(!1), c();
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
                p(!1), a();
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
function _e({ name: t, avatarUrl: n }) {
  const r = Ke(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: n ? void 0 : `hsl(${r}, 55%, 45%)` },
      children: [
        n ? /* @__PURE__ */ e("img", { src: n, alt: "", className: "w-full h-full rounded-full object-cover" }) : Ue(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function Ue(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Ke(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function ie(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = n > 0 ? String(r).padStart(2, "0") : String(r), c = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${a}:${c}` : `${a}:${c}`;
}
function Rt({
  playlistUrl: t,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: c,
  onError: l,
  hideDownload: s = !1,
  className: u
}) {
  const h = A(null), p = A(null), [v, d] = E(!1), [m, x] = E(0), [g, b] = E(0), [y, w] = E(1), [k, L] = E(1), [S, M] = E(!1), [B, j] = E(null);
  P(() => {
    const N = h.current;
    if (!N || !t) return;
    if (j(null), M(!0), N.canPlayType("application/vnd.apple.mpegurl"))
      return N.src = t, () => {
        N.removeAttribute("src"), N.load();
      };
    let C = !1;
    return (async () => {
      try {
        const T = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (C) return;
        if (!T.isSupported()) {
          j("HLS playback is not supported in this browser."), M(!1);
          return;
        }
        const O = new T({ enableWorker: !0 });
        p.current = O, O.attachMedia(N), O.on(T.Events.MEDIA_ATTACHED, () => O.loadSource(t)), O.on(T.Events.ERROR, (ee, W) => {
          W.fatal && (j(`HLS error: ${W.type}`), l?.(new Error(`HLS fatal: ${W.type}`)));
        });
      } catch (T) {
        if (C) return;
        j(`Failed to load hls.js — install it in the consumer app: ${T?.message ?? T}`);
      }
    })(), () => {
      if (C = !0, p.current) {
        try {
          p.current.destroy();
        } catch {
        }
        p.current = null;
      }
    };
  }, [t, l]);
  const $ = () => {
    const N = h.current;
    N && (N.paused ? N.play().catch(() => {
    }) : N.pause());
  }, I = (N) => {
    const C = h.current;
    !C || !isFinite(g) || g <= 0 || (C.currentTime = Number(N.target.value));
  }, R = (N) => {
    const C = h.current;
    if (!C) return;
    const T = Number(N.target.value);
    C.volume = T, w(T);
  }, D = (N) => {
    const C = h.current;
    if (!C) return;
    const T = Number(N.target.value);
    C.playbackRate = T, L(T);
  }, H = () => {
    const N = h.current;
    N && (document.fullscreenElement ? document.exitFullscreen() : N.requestFullscreen?.());
  }, F = q(
    () => g > 0 ? Math.min(100, m / g * 100) : 0,
    [m, g]
  );
  return /* @__PURE__ */ i("div", { className: f("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", u), children: [
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
        onLoadedMetadata: (N) => {
          const C = N.currentTarget;
          b(C.duration), M(!1), a?.(C.duration);
        },
        onTimeUpdate: (N) => {
          const C = N.currentTarget;
          x(C.currentTime), c?.(C.currentTime, C.duration);
        },
        onWaiting: () => M(!0),
        onCanPlay: () => M(!1),
        onError: () => {
          j("Playback error."), l?.(new Error("video element error")), M(!1);
        }
      }
    ),
    S && !B && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    B && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: B }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: ie(m) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(g) ? g : 0,
            step: 0.1,
            value: m,
            onChange: I,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${F}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: ie(g) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: $,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": v ? "Pause" : "Play",
            children: v ? /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
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
              value: y,
              onChange: R,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "select",
          {
            value: k,
            onChange: D,
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
            onClick: H,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Ze(t) {
  if (!isFinite(t) || t < 0) return "—";
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return n > 0 ? `${n}h ${r}m` : r > 0 ? `${r}m ${o}s` : `${o}s`;
}
function ae(t) {
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
function Je({ status: t }) {
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
function Ye({
  id: t,
  startIso: n,
  durationSec: r,
  participantCount: o,
  thumbnailUrl: a,
  label: c,
  status: l = "ready",
  selected: s,
  onClick: u,
  actions: h,
  className: p
}) {
  const v = typeof u == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...v ? {
        role: "button",
        tabIndex: 0,
        onClick: () => u(t),
        onKeyDown: (m) => {
          v && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), u(t));
        },
        "aria-pressed": s ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: f(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        v && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        s ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        p
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
              onError: (m) => {
                m.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(Je, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Ze(r) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? ae(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: ae(n) }),
        h && /* @__PURE__ */ e(
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
function Vt({
  recordings: t,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: a,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: [0, 1, 2].map((s) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    s
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: f("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: f("flex flex-col gap-2", l), children: t.map((s) => /* @__PURE__ */ e(
    Ye,
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
function zt({
  getVideoElement: t,
  className: n,
  title: r
}) {
  const [o, a] = E(!1), [c, l] = E(!1);
  P(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), P(() => {
    const h = () => a(!1), p = () => a(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", p), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", p);
    };
  }, []);
  const s = U(async () => {
    if (c)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), a(!1);
          return;
        }
        const h = t();
        if (!h) return;
        h.disablePictureInPicture = !1, await h.requestPictureInPicture(), a(!0);
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
function Ge(t) {
  if (!t) return "?";
  const n = t.trim().split(/\s+/);
  return n.length === 1 ? n[0].slice(0, 2).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function Ht({
  participants: t,
  activeSpeakerId: n,
  onParticipantClick: r,
  count: o,
  title: a = "Participants",
  footer: c,
  className: l
}) {
  const s = o ?? t.length;
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
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: s })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((u) => {
          const h = u.id === n;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
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
                /* @__PURE__ */ i(
                  "div",
                  {
                    className: f(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      h && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      u.avatarUrl ? /* @__PURE__ */ e("img", { src: u.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: Ge(u.displayName) }),
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
        c && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: c })
      ]
    }
  );
}
let Y = null;
function Xe() {
  if (Y) return Y;
  try {
    return Y = new AudioContext(), Y;
  } catch {
    return null;
  }
}
function Ot({
  localStream: t,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [c, l] = E(!1);
  return P(() => {
    if (!n || !t || t.getAudioTracks().filter((b) => b.readyState === "live").length === 0) return;
    const u = Xe();
    if (!u) return;
    let h, p;
    try {
      h = u.createMediaStreamSource(t), p = u.createAnalyser(), p.fftSize = 512, p.smoothingTimeConstant = 0.6, h.connect(p);
    } catch {
      return;
    }
    let v = null, d = 0, m = !1;
    const x = new Float32Array(p.frequencyBinCount), g = setInterval(() => {
      if (m) return;
      p.getFloatTimeDomainData(x);
      let b = 0;
      for (let k = 0; k < x.length; k++) b += x[k] * x[k];
      const y = 20 * Math.log10(Math.sqrt(b / x.length)), w = Date.now();
      y > r ? (v == null && (v = w), w - v >= o && w - d > a && (l(!0), d = w, setTimeout(() => {
        m || l(!1);
      }, 3e3), v = null)) : v = null;
    }, 200);
    return () => {
      m = !0, clearInterval(g);
      try {
        h.disconnect();
      } catch {
      }
      try {
        p.disconnect();
      } catch {
      }
    };
  }, [t, n, r, o, a]), P(() => {
    n || l(!1);
  }, [n]), c;
}
function Qe(t, n) {
  const [r, o] = E(0);
  return P(() => {
    if (!t) return;
    const a = (d, m) => {
      console.info("[useTrackStateBump] remote track", d, {
        participant: n,
        kind: m.kind,
        enabled: m.enabled,
        muted: m.muted,
        readyState: m.readyState,
        id: m.id
      }), o((x) => x + 1);
    }, c = (d) => a("mute", d.target), l = (d) => a("unmute", d.target), s = (d) => a("ended", d.target), u = /* @__PURE__ */ new WeakSet(), h = (d) => {
      u.has(d) || (u.add(d), d.addEventListener("mute", c), d.addEventListener("unmute", l), d.addEventListener("ended", s));
    };
    for (const d of t.getVideoTracks()) h(d);
    const p = (d) => {
      const m = d.track;
      m && m.kind === "video" && h(m), o((x) => x + 1);
    }, v = () => o((d) => d + 1);
    return t.addEventListener("addtrack", p), t.addEventListener("removetrack", v), () => {
      for (const d of t.getVideoTracks())
        d.removeEventListener("mute", c), d.removeEventListener("unmute", l), d.removeEventListener("ended", s);
      t.removeEventListener("addtrack", p), t.removeEventListener("removetrack", v);
    };
  }, [t, n]), r;
}
function qe(t) {
  if (!t) return !1;
  const n = t.getVideoTracks();
  return n.length === 0 ? !1 : n.some((r) => r.readyState === "live" && r.enabled && !r.muted);
}
function de({
  stream: t,
  muted: n = !1,
  videoRef: r,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: a
}) {
  const c = A(null), l = A(a);
  return l.current = a, P(() => {
    const s = c.current;
    if (!s) return;
    s.srcObject !== t && (s.srcObject = t), r && (r.current = s);
    const u = (g) => {
      console.info(`[StreamVideo] ${g}`, {
        streamId: t.id,
        tracks: t.getTracks().map((b) => ({
          kind: b.kind,
          id: b.id,
          ready: b.readyState,
          muted: b.muted,
          enabled: b.enabled
        }))
      });
    };
    u("bind");
    const h = (g) => {
      l.current?.(g);
    }, p = () => h("playing"), v = () => h("ended"), d = () => {
      s.ended && h("ended");
    }, m = () => {
      const g = s.play();
      g && typeof g.catch == "function" && g.catch((b) => {
        b?.name === "NotAllowedError" && h("paused-by-autoplay");
      });
    }, x = (g) => {
      u(`stream ${g.type}`), s.srcObject = null, s.srcObject = t, m();
    };
    return s.addEventListener("play", p), s.addEventListener("ended", v), s.addEventListener("pause", d), t.addEventListener("addtrack", x), t.addEventListener("removetrack", x), m(), () => {
      s.removeEventListener("play", p), s.removeEventListener("ended", v), s.removeEventListener("pause", d), t.removeEventListener("addtrack", x), t.removeEventListener("removetrack", x), r && r.current === s && (r.current = null);
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
const et = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function tt() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((n) => {
    if (n.paused) {
      const r = n.play();
      r && typeof r.catch == "function" && r.catch(() => {
      });
    }
  });
}
function Dt({
  chipLabel: t = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...a
}) {
  const [c, l] = E(!1), s = A(null), h = a.videoRef ?? s, p = U(
    (d) => {
      d === "paused-by-autoplay" ? l(!0) : d === "playing" && l(!1), o?.(d);
    },
    [o]
  ), v = U(() => {
    const d = h.current;
    if (d) {
      d.muted = !1;
      const m = d.play();
      m && typeof m.catch == "function" && m.catch(() => {
      });
    }
    tt(), l(!1);
  }, [h]);
  return /* @__PURE__ */ i("div", { className: f("relative h-full w-full", r), children: [
    /* @__PURE__ */ e(
      de,
      {
        ...a,
        videoRef: h,
        onPlayStateChange: p
      }
    ),
    c && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: v,
        className: f(et, n),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
function Ft({
  stream: t,
  displayName: n,
  cameraOn: r,
  avatarSize: o = 96
}) {
  Qe(t, n);
  const a = qe(t);
  return !r || !a || !t ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ e(le, { name: n, size: o }) }) : /* @__PURE__ */ e(de, { stream: t });
}
function Wt({ show: t, label: n }) {
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
function _t({ show: t, label: n = "Reconnecting…" }) {
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
function Ut({
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
const oe = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function nt(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) | 0;
  return oe[Math.abs(n) % oe.length];
}
function Kt({
  lines: t,
  maxLines: n = 3,
  fadeAfterMs: r = 8e3,
  className: o
}) {
  const a = Date.now(), c = t.slice(-n).map((l) => {
    const s = a - new Date(l.at).getTime(), u = Math.max(0.35, 1 - s / r);
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
                style: { color: nt(l.speakerId) },
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
const rt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, it = "bg-slate-200 text-slate-900 hover:bg-slate-300", at = "bg-slate-100 text-slate-500 hover:bg-slate-200", ot = "bg-red-100 text-red-700 hover:bg-red-200";
function K({
  on: t,
  iconOn: n,
  iconOff: r,
  "aria-label": o,
  offTone: a = "danger",
  size: c = "md",
  disabled: l,
  className: s,
  ...u
}) {
  const h = t ? it : a === "danger" ? ot : at;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": o,
      "aria-pressed": t,
      disabled: l,
      className: f(
        "rounded-full grid place-items-center transition-colors duration-150",
        rt[c],
        h,
        l && "opacity-40 cursor-not-allowed",
        !l && "cursor-pointer",
        s
      ),
      ...u,
      children: t ? n : r
    }
  );
}
function z(t, n) {
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
function ue({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function he({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ e("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
    /* @__PURE__ */ e("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function fe({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function me({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function lt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function st({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function ct({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function Zt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...z(t, n), children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "5", cy: "12", r: "1" })
  ] });
}
function dt(t, n, r) {
  if (r) return "Checking room…";
  if (!n || n === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return n === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function ut(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function Jt({
  channelName: t,
  previewStream: n,
  permission: r,
  permissionMessage: o,
  audioEnabled: a,
  videoEnabled: c,
  onToggleAudio: l,
  onToggleVideo: s,
  onRetryPermission: u,
  participants: h,
  readyState: p,
  readyLoading: v = !1,
  onJoin: d,
  onCancel: m,
  joinLabel: x,
  joinDisabled: g,
  subtitleOverride: b,
  className: y,
  "data-testid": w
}) {
  const k = A(null);
  P(() => {
    k.current && n && (k.current.srcObject = n);
  }, [n]);
  const L = r === "granted", S = ut(r), M = g ?? !L, B = x ?? (M && !L ? "Allow camera to join" : "Join now"), j = b ?? dt(h, p, v);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": w,
      className: f(
        "flex flex-col h-full min-h-0 bg-slate-50 text-slate-900",
        y
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-slate-500 mt-0.5", children: j })
          ] }),
          /* @__PURE__ */ e(te, { variant: "ghost", size: "sm", onClick: m, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black", children: [
              n && L && /* @__PURE__ */ e(
                "video",
                {
                  ref: k,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: f(
                    "w-full h-full object-cover scale-x-[-1]",
                    !c && "opacity-0"
                  )
                }
              ),
              L && !c && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center text-slate-300 text-sm", children: "Camera off" }),
              r === "pending" && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ e(se, { size: "lg" }) }),
              S && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center bg-slate-50/95", children: /* @__PURE__ */ e(
                ve,
                {
                  kind: "camera",
                  state: S,
                  message: o,
                  onRetry: u,
                  "data-testid": "prejoin-permission-card"
                }
              ) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ e(
                K,
                {
                  on: a,
                  onClick: l,
                  disabled: !L,
                  "aria-label": a ? "Mute mic before joining" : "Unmute mic before joining",
                  title: a ? "Mute mic before joining" : "Unmute mic before joining",
                  iconOn: /* @__PURE__ */ e(ue, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(he, { size: 18 }),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                K,
                {
                  on: c,
                  onClick: s,
                  disabled: !L,
                  "aria-label": c ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: c ? "Turn camera off before joining" : "Turn camera on before joining",
                  iconOn: /* @__PURE__ */ e(fe, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(me, { size: 18 }),
                  "data-testid": "prejoin-toggle-video"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i("section", { className: "lg:w-96 flex flex-col", children: [
            /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ e("h2", { className: "text-2xl font-semibold mb-2", children: "Ready to join?" }),
              /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6", children: j }),
              /* @__PURE__ */ e(ht, { participants: h, loading: v }),
              p === "pending" && !v && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-amber-600 flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" }),
                "Other publishers are still connecting — you can join anyway."
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ e(
                te,
                {
                  variant: "primary",
                  size: "lg",
                  onClick: () => d({ audio: a, video: c }),
                  disabled: M,
                  "data-testid": "prejoin-join-button",
                  children: B
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
function ht({
  participants: t,
  loading: n
}) {
  return n ? /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
    /* @__PURE__ */ e(se, { size: "sm" }),
    " Checking room…"
  ] }) : !t || t.length === 0 ? null : /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ e("div", { className: "text-xs uppercase tracking-wide text-slate-500", children: "In the room" }),
    /* @__PURE__ */ i("ul", { className: "flex flex-col gap-1.5", children: [
      t.slice(0, 8).map((r) => {
        const o = r.displayName ?? r.participantId.slice(0, 8);
        return /* @__PURE__ */ i("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e(le, { name: o, size: 24 }),
          /* @__PURE__ */ e("span", { className: "font-mono text-xs truncate", children: o }),
          /* @__PURE__ */ e(
            G,
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
const ft = {
  idle: "neutral",
  joining: "warning",
  joined: "success",
  reconnecting: "warning",
  ended: "neutral",
  failed: "danger"
}, mt = {
  idle: "Idle",
  joining: "Joining…",
  joined: "Live",
  reconnecting: "Reconnecting…",
  ended: "Ended",
  failed: "Failed"
};
function pt() {
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
function Yt({
  channelName: t,
  subtitle: n,
  recording: r,
  elapsedLabel: o,
  phase: a,
  actions: c,
  className: l,
  "data-testid": s
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": s,
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
              G,
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
              G,
              {
                tone: "neutral",
                size: "xs",
                icon: /* @__PURE__ */ e(pt, {}),
                title: "Time since you joined this room",
                "data-testid": "hangout-room-header-elapsed",
                children: /* @__PURE__ */ e("span", { className: "tabular-nums", children: o })
              }
            )
          ] })
        ] }),
        (a || c) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
          a && /* @__PURE__ */ e(
            G,
            {
              tone: ft[a],
              size: "sm",
              dot: a === "reconnecting" ? "pulse" : "static",
              "data-testid": "hangout-room-header-phase",
              children: mt[a]
            }
          ),
          c
        ] })
      ]
    }
  );
}
const xt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, gt = {
  sm: 16,
  md: 20,
  lg: 24
};
function Gt({
  audioOn: t,
  videoOn: n,
  screenSharing: r = !1,
  onToggleAudio: o,
  onToggleVideo: a,
  onToggleScreenShare: c,
  onLeave: l,
  audioDisabled: s,
  videoDisabled: u,
  screenShareDisabled: h,
  extras: p,
  leaveLabel: v = "Leave call",
  size: d = "md",
  className: m,
  "data-testid": x
}) {
  const g = d === "lg" ? 22 : d === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": x,
      className: f(
        "flex items-center justify-center gap-3 px-4 py-3",
        m
      ),
      children: [
        /* @__PURE__ */ e(
          K,
          {
            on: t,
            onClick: o,
            disabled: s,
            size: d,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(ue, { size: g }),
            iconOff: /* @__PURE__ */ e(he, { size: g }),
            "data-testid": "media-controls-mic"
          }
        ),
        /* @__PURE__ */ e(
          K,
          {
            on: n,
            onClick: a,
            disabled: u,
            size: d,
            "aria-label": n ? "Turn off camera" : "Turn on camera",
            title: n ? "Turn off camera" : "Turn on camera",
            iconOn: /* @__PURE__ */ e(fe, { size: g }),
            iconOff: /* @__PURE__ */ e(me, { size: g }),
            "data-testid": "media-controls-cam"
          }
        ),
        c && /* @__PURE__ */ e(
          K,
          {
            on: r,
            onClick: c,
            disabled: h,
            size: d,
            offTone: "neutral",
            "aria-label": r ? "Stop sharing screen" : "Share screen",
            title: r ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(lt, { size: g }),
            iconOff: /* @__PURE__ */ e(st, { size: g }),
            "data-testid": "media-controls-screenshare"
          }
        ),
        p,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: l,
            "aria-label": v,
            title: v,
            "data-testid": "media-controls-leave",
            className: f(
              "rounded-full grid place-items-center transition-colors duration-150",
              xt[d],
              "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            ),
            children: /* @__PURE__ */ e(ct, { size: gt[d] })
          }
        )
      ]
    }
  );
}
export {
  Dt as A,
  jt as B,
  Ie as C,
  At as D,
  qe as E,
  Ot as F,
  Qe as G,
  Jt as H,
  Gt as M,
  Me as N,
  ct as P,
  Tt as R,
  lt as S,
  Kt as T,
  Et as V,
  $e as a,
  It as b,
  ne as c,
  $t as d,
  Wt as e,
  K as f,
  Yt as g,
  ue as h,
  he as i,
  Zt as j,
  Ut as k,
  zt as l,
  Bt as m,
  _t as n,
  Vt as o,
  Rt as p,
  Ye as q,
  Ft as r,
  Ht as s,
  st as t,
  St as u,
  Pt as v,
  de as w,
  fe as x,
  me as y,
  Mt as z
};
