import { jsxs as i, jsx as e, Fragment as X } from "react/jsx-runtime";
import { useRef as P, useState as E, useEffect as A, useMemo as q, useCallback as U } from "react";
import { c as m } from "./cn-B6yFEsav.js";
import { P as ge } from "./HangoutLayout-BT6X2zG6.js";
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
  controls: s = !1,
  poster: l,
  phase: c,
  className: u,
  style: h,
  onPhaseChange: p,
  onTimeUpdate: g
}) {
  const d = P(null), [f, x] = E("idle"), v = c ?? f;
  A(() => {
    const b = d.current;
    if (!b) return;
    const y = [
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
        g?.(b.currentTime, b.duration);
      }]
    ];
    return y.forEach(([L, S]) => b.addEventListener(L, S)), () => y.forEach(([L, S]) => b.removeEventListener(L, S));
  }, [p, g]), A(() => {
    const b = d.current;
    b && n !== void 0 && (b.srcObject = n);
  }, [n]);
  const w = v !== "playing", N = be[v];
  return /* @__PURE__ */ i(
    "div",
    {
      className: m("relative bg-black rounded-lg overflow-hidden aspect-video", u),
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
            controls: s,
            poster: l,
            playsInline: !0,
            className: m("w-full h-full object-contain block")
          }
        ),
        w && N && /* @__PURE__ */ i("div", { className: m("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          v === "buffering" && /* @__PURE__ */ e(we, {}),
          /* @__PURE__ */ e("span", { className: m(v === "buffering" ? "ml-2" : ""), children: N })
        ] })
      ]
    }
  );
}
function we() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: m("animate-spin"), children: [
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
  muted: s = !1,
  hideDownload: l = !1,
  header: c,
  footer: u,
  className: h
}) {
  const p = q(() => n.filter((x) => !!x.url), [n]), [g, d] = E(0), f = p[g];
  return A(() => {
    const x = (v) => {
      v.key === "Escape" && t();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [t]), /* @__PURE__ */ e(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": r || "Video player",
      onClick: t,
      className: m(
        "fixed inset-0 z-50 grid place-items-center p-4",
        "bg-black/80 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          onClick: (x) => x.stopPropagation(),
          className: m(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            h
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
                    className: m(
                      "h-8 w-8 grid place-items-center rounded text-xl leading-none",
                      "hover:bg-white/10"
                    ),
                    children: "×"
                  }
                )
              ] })
            ] }),
            f ? /* @__PURE__ */ e(
              "video",
              {
                src: f.url,
                controls: !0,
                autoPlay: a,
                muted: s,
                className: "w-full max-h-[70vh] bg-black"
              },
              f.url
            ) : /* @__PURE__ */ e("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            p.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: m(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: p.map((x, v) => {
                  const w = v === g;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => d(v),
                      className: m(
                        "px-2.5 py-1 rounded transition-colors",
                        w ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": w ? "true" : void 0,
                      title: x.sizeBytes != null ? ye(x.sizeBytes) : void 0,
                      children: x.label || `Segment ${v + 1}`
                    },
                    `${v}:${x.url}`
                  );
                })
              }
            ),
            (u || !l && f) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: u }),
              !l && f && /* @__PURE__ */ e(
                "a",
                {
                  href: f.url,
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
    return /* @__PURE__ */ e("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: n, children: "No stream data" });
  const r = [
    ["Bitrate", ke(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && r.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: n, children: r.map(([o, a]) => /* @__PURE__ */ i("div", { className: m("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: m("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: m("font-mono"), children: a })
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
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: n, children: [
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
      className: m("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
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
function Bt({ reactions: t, style: n }) {
  const [r, o] = E([]);
  return A(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], s = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), s]);
  }, [t]), A(() => {
    const a = setInterval(() => {
      o((s) => s.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(a);
  }, []), /* @__PURE__ */ e("div", { className: m("absolute inset-0 pointer-events-none overflow-hidden"), style: n, children: r.map((a) => /* @__PURE__ */ e(
    "span",
    {
      className: m("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${a.x}%` },
      children: a.emoji
    },
    a.id
  )) });
}
const je = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function Tt({ onReact: t, emojis: n = je, style: r }) {
  return /* @__PURE__ */ e("div", { className: m("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: r, children: n.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: m("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
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
const Be = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, Te = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function At({ phase: t, bitrateBps: n, viewerCount: r, duration: o, style: a }) {
  const s = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: m("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: m("w-[7px] h-[7px] rounded-full", Be[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: m("font-semibold", Te[t] ?? "text-slate-400"), children: s })
    ] }),
    n !== void 0 && /* @__PURE__ */ e("span", { children: Se(n) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: Ee(o) }),
    r !== void 0 && /* @__PURE__ */ i("span", { className: m("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      r
    ] })
  ] });
}
function Pt({ count: t, style: n }) {
  const r = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: n, children: [
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
function Ae(t) {
  return t.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function Pe(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return Math.abs(n) % 360;
}
function Z({ participant: t, size: n = 32 }) {
  const r = Pe(t.displayName);
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
        ) : Ae(t.displayName),
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
  className: s,
  style: l
}) {
  const c = t.slice(0, r), u = Math.max(0, t.length - r), h = t.length === 0 && !!n;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": a,
      "data-count": t.length,
      className: m(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        s
      ),
      style: l,
      children: [
        c.map((p) => /* @__PURE__ */ e(Z, { participant: p, size: o }, p.id)),
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
const z = {
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
  disabled: s = !1,
  testId: l
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      disabled: s,
      onClick: a,
      "data-testid": l,
      className: m(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        r && !o && "bg-white/20 text-white",
        !r && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        s && "opacity-40 cursor-not-allowed"
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
  onToggleCamera: s,
  onToggleScreenShare: l,
  onUpgradeToVideo: c,
  onEndCall: u,
  onAddParticipant: h,
  availableParticipants: p,
  currentParticipantIds: g,
  className: d
}) {
  const [f, x] = E(!1), v = new Set(g ?? []), w = (p ?? []).filter((N) => !v.has(N.id));
  return /* @__PURE__ */ i("div", { className: m("flex flex-col", d), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            _,
            {
              icon: n ? z.micOff : z.mic,
              label: n ? "Unmute" : "Mute",
              active: n,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            _,
            {
              icon: r ? z.camera : z.cameraOff,
              label: r ? "Turn off camera" : "Turn on camera",
              active: !r,
              onClick: s,
              testId: "camera-button"
            }
          ),
          t === "audio" && c && /* @__PURE__ */ e(
            _,
            {
              icon: z.videoUpgrade,
              label: "Switch to video",
              onClick: c,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            _,
            {
              icon: z.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          h && /* @__PURE__ */ e(
            _,
            {
              icon: z.userPlus,
              label: "Add participant",
              active: f,
              onClick: () => x((N) => !N),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ e(
            _,
            {
              icon: z.phoneEnd,
              label: "End call",
              danger: !0,
              onClick: u,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    f && h && /* @__PURE__ */ i(
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
          w.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: w.map((N) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                h(N.id), w.length <= 1 && x(!1);
              },
              children: [
                /* @__PURE__ */ e(Z, { participant: N, size: 22 }),
                /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: N.displayName }),
                /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
              ]
            },
            N.id
          )) })
        ]
      }
    )
  ] });
}
function Re(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const ze = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function Ve(t) {
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
      className: m(
        "absolute z-10 pointer-events-none",
        ze[n],
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
                Ve(t.bitrateKbps)
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
  const o = P(null);
  return A(() => {
    const a = o.current;
    a && a.srcObject !== t && (a.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: n,
      className: m("w-full h-full object-cover", r)
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
function De({
  mode: t,
  participants: n,
  localParticipant: r,
  duration: o,
  isMuted: a,
  isCameraOn: s,
  isScreenSharing: l,
  onToggleMute: c,
  onToggleCamera: u,
  onToggleScreenShare: h,
  onUpgradeToVideo: p,
  onAddParticipant: g,
  availableParticipants: d,
  onEndCall: f,
  layoutComponent: x,
  callStats: v
}) {
  const w = t === "video" && s;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && x && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ e(ne, { stats: v, position: "bottom-left" })
    ] }),
    t === "video" && !x && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      r?.videoStream && w ? /* @__PURE__ */ e(re, { stream: r.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: r && /* @__PURE__ */ e(Z, { participant: r, size: 48 }) }),
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
      /* @__PURE__ */ e(ne, { stats: v, position: "bottom-left" })
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
        isCameraOn: s,
        isScreenSharing: l,
        onToggleMute: c,
        onToggleCamera: u,
        onToggleScreenShare: h,
        onUpgradeToVideo: p,
        onEndCall: f,
        onAddParticipant: g,
        availableParticipants: d,
        currentParticipantIds: n.map((N) => N.id)
      }
    )
  ] });
}
function Fe({
  state: t,
  mode: n,
  duration: r,
  isMuted: o,
  callerName: a,
  onToggleMute: s,
  onEndCall: l,
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
            className: m(
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
              onClick: s,
              className: m(
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
function Oe(t) {
  const [n, r] = E({ x: 0, y: 0 }), [o, a] = E(!1), [s, l] = E(!1), c = P(!1), u = P({ x: 0, y: 0 }), h = P({ x: 0, y: 0 }), p = P(null), g = U(
    (w) => {
      t && (c.current = !0, a(!0), l(!1), u.current = { x: w.clientX, y: w.clientY }, h.current = { ...n }, w.preventDefault());
    },
    [t, n]
  ), d = U(() => {
    l(!0), r({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), f = U(
    (w) => {
      const N = p.current;
      if (!N) return;
      const b = N.offsetParent, y = 16;
      let L = window.innerWidth, S = window.innerHeight;
      b && (L = b.clientWidth, S = b.clientHeight);
      const M = N.getBoundingClientRect(), T = b ? b.getBoundingClientRect() : { left: 0, top: 0 };
      let j, $;
      switch (w) {
        case "top-left":
          j = y, $ = y;
          break;
        case "top-right":
          j = L - M.width - y, $ = y;
          break;
        case "bottom-left":
          j = y, $ = S - M.height - y;
          break;
        default:
          j = L - M.width - y, $ = S - M.height - y;
          break;
      }
      const I = M.left - T.left - n.x, R = M.top - T.top - n.y;
      l(!0), r({ x: j - I, y: $ - R }), setTimeout(() => l(!1), 200);
    },
    [n]
  ), x = P(f);
  x.current = f, A(() => {
    if (!t) return;
    const w = (b) => {
      c.current && r({
        x: h.current.x + (b.clientX - u.current.x),
        y: h.current.y + (b.clientY - u.current.y)
      });
    }, N = () => {
      if (!c.current) return;
      c.current = !1, a(!1);
      const b = p.current;
      if (!b) return;
      const y = b.offsetParent, L = 80;
      let S = window.innerWidth, M = window.innerHeight;
      if (y) {
        const B = y.getBoundingClientRect();
        S = B.width, M = B.height;
      }
      const T = b.getBoundingClientRect(), j = y ? y.getBoundingClientRect() : { left: 0, top: 0 }, $ = T.left - j.left, I = T.top - j.top, R = S - ($ + T.width), F = M - (I + T.height), H = $ < L, O = R < L, k = I < L, C = F < L;
      k && H ? x.current("top-left") : k && O ? x.current("top-right") : C && H ? x.current("bottom-left") : C && O && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", w), document.addEventListener("mouseup", N), () => {
      document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", N);
    };
  }, [t]);
  const v = n.x !== 0 || n.y !== 0;
  return { offset: n, handleMouseDown: g, resetOffset: d, snapToCorner: f, isDragging: o, isAnimating: s, hasMoved: v, widgetRef: p };
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
  return /* @__PURE__ */ e("div", { className: m(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: r.map(({ id: o, classes: a }) => /* @__PURE__ */ e(
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
  duration: s,
  isMuted: l = !1,
  isCameraOn: c = !0,
  isScreenSharing: u = !1,
  onAnswer: h,
  onDecline: p,
  onEndCall: g,
  onToggleMute: d,
  onToggleCamera: f,
  onToggleScreenShare: x,
  onUpgradeToVideo: v,
  onAddParticipant: w,
  availableParticipants: N,
  onMinimize: b,
  layoutComponent: y,
  callStats: L,
  minimized: S = !1,
  position: M = "bottom-right",
  contained: T = !1,
  draggable: j = !0,
  className: $,
  style: I,
  dataAttrs: R
}) {
  const { offset: F, handleMouseDown: H, resetOffset: O, snapToCorner: k, isDragging: C, isAnimating: B, hasMoved: D, widgetRef: ee } = Oe(j), W = {};
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
    C && /* @__PURE__ */ e(We, { onSnap: k, contained: T }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: ee,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: m(
          T ? "absolute z-50" : "fixed z-[9999]",
          pe,
          $
        ),
        style: {
          transform: `translate(${F.x}px, ${F.y}px)`,
          transition: B ? "transform 0.2s ease-out" : void 0,
          ...I
        },
        ...W,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: m(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              S ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !S && /* @__PURE__ */ i(
                "div",
                {
                  className: m(
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
                      D && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: O,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: Q.snapBack
                        }
                      ),
                      b && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: b,
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
                  className: m(j && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: H,
                  children: /* @__PURE__ */ e(
                    Fe,
                    {
                      state: t,
                      mode: n,
                      duration: s,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: d,
                      onEndCall: g,
                      onExpand: b
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
                  De,
                  {
                    mode: n,
                    participants: r,
                    localParticipant: o,
                    duration: s,
                    isMuted: l,
                    isCameraOn: c,
                    isScreenSharing: u,
                    onToggleMute: d,
                    onToggleCamera: f,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: v,
                    onAddParticipant: w,
                    availableParticipants: N,
                    onEndCall: g,
                    layoutComponent: y,
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
  onDismiss: s,
  autoExpireSec: l = 30,
  className: c,
  style: u
}) {
  const [h, p] = E(!0);
  return A(() => {
    if (!l || l <= 0) return;
    const g = setTimeout(() => {
      p(!1), s?.();
    }, l * 1e3);
    return () => clearTimeout(g);
  }, [l, s]), h ? /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": t,
      className: m(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        c
      ),
      style: u,
      children: [
        /* @__PURE__ */ e(_e, { name: t, avatarUrl: n }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          r && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: r })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          s && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                p(!1), s();
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
  const n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = n > 0 ? String(r).padStart(2, "0") : String(r), s = String(o).padStart(2, "0");
  return n > 0 ? `${n}:${a}:${s}` : `${a}:${s}`;
}
function Rt({
  playlistUrl: t,
  poster: n,
  autoPlay: r = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: s,
  onError: l,
  hideDownload: c = !1,
  className: u
}) {
  const h = P(null), p = P(null), [g, d] = E(!1), [f, x] = E(0), [v, w] = E(0), [N, b] = E(1), [y, L] = E(1), [S, M] = E(!1), [T, j] = E(null);
  A(() => {
    const k = h.current;
    if (!k || !t) return;
    if (j(null), M(!0), k.canPlayType("application/vnd.apple.mpegurl"))
      return k.src = t, () => {
        k.removeAttribute("src"), k.load();
      };
    let C = !1;
    return (async () => {
      try {
        const B = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (C) return;
        if (!B.isSupported()) {
          j("HLS playback is not supported in this browser."), M(!1);
          return;
        }
        const D = new B({ enableWorker: !0 });
        p.current = D, D.attachMedia(k), D.on(B.Events.MEDIA_ATTACHED, () => D.loadSource(t)), D.on(B.Events.ERROR, (ee, W) => {
          W.fatal && (j(`HLS error: ${W.type}`), l?.(new Error(`HLS fatal: ${W.type}`)));
        });
      } catch (B) {
        if (C) return;
        j(`Failed to load hls.js — install it in the consumer app: ${B?.message ?? B}`);
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
    const k = h.current;
    k && (k.paused ? k.play().catch(() => {
    }) : k.pause());
  }, I = (k) => {
    const C = h.current;
    !C || !isFinite(v) || v <= 0 || (C.currentTime = Number(k.target.value));
  }, R = (k) => {
    const C = h.current;
    if (!C) return;
    const B = Number(k.target.value);
    C.volume = B, b(B);
  }, F = (k) => {
    const C = h.current;
    if (!C) return;
    const B = Number(k.target.value);
    C.playbackRate = B, L(B);
  }, H = () => {
    const k = h.current;
    k && (document.fullscreenElement ? document.exitFullscreen() : k.requestFullscreen?.());
  }, O = q(
    () => v > 0 ? Math.min(100, f / v * 100) : 0,
    [f, v]
  );
  return /* @__PURE__ */ i("div", { className: m("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", u), children: [
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
        onLoadedMetadata: (k) => {
          const C = k.currentTarget;
          w(C.duration), M(!1), a?.(C.duration);
        },
        onTimeUpdate: (k) => {
          const C = k.currentTarget;
          x(C.currentTime), s?.(C.currentTime, C.duration);
        },
        onWaiting: () => M(!0),
        onCanPlay: () => M(!1),
        onError: () => {
          j("Playback error."), l?.(new Error("video element error")), M(!1);
        }
      }
    ),
    S && !T && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    T && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: T }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: ie(f) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(v) ? v : 0,
            step: 0.1,
            value: f,
            onChange: I,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${O}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: ie(v) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: $,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": g ? "Pause" : "Play",
            children: g ? /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
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
              value: N,
              onChange: R,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "select",
          {
            value: y,
            onChange: F,
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
  label: s,
  status: l = "ready",
  selected: c,
  onClick: u,
  actions: h,
  className: p
}) {
  const g = typeof u == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...g ? {
        role: "button",
        tabIndex: 0,
        onClick: () => u(t),
        onKeyDown: (f) => {
          g && (f.key === "Enter" || f.key === " ") && (f.preventDefault(), u(t));
        },
        "aria-pressed": c ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: m(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        g && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        c ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
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
              onError: (f) => {
                f.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(Je, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Ze(r) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: s ?? ae(n) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        s && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: ae(n) }),
        h && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (f) => f.stopPropagation(),
            children: h
          }
        )
      ]
    }
  );
}
function zt({
  recordings: t,
  selectedId: n,
  onSelect: r,
  loading: o,
  emptyState: a,
  renderActions: s,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: m("flex flex-col gap-2", l), children: [0, 1, 2].map((c) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    c
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: m("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: m("flex flex-col gap-2", l), children: t.map((c) => /* @__PURE__ */ e(
    Ye,
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
      actions: s?.(c)
    },
    c.id
  )) });
}
function Vt({
  getVideoElement: t,
  className: n,
  title: r
}) {
  const [o, a] = E(!1), [s, l] = E(!1);
  A(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), A(() => {
    const h = () => a(!1), p = () => a(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", p), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", p);
    };
  }, []);
  const c = U(async () => {
    if (s)
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
  }, [s, t]), u = !s;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: c,
      disabled: u,
      title: r ?? (u ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: m(
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
  footer: s,
  className: l
}) {
  const c = o ?? t.length;
  return /* @__PURE__ */ i(
    "aside",
    {
      className: m(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ i("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: a }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: c })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((u) => {
          const h = u.id === n;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: r ? () => r(u.id) : void 0,
              className: m(
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
                    className: m(
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
        s && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: s })
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
function Dt({
  localStream: t,
  isMuted: n,
  threshold: r = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [s, l] = E(!1);
  return A(() => {
    if (!n || !t || t.getAudioTracks().filter((w) => w.readyState === "live").length === 0) return;
    const u = Xe();
    if (!u) return;
    let h, p;
    try {
      h = u.createMediaStreamSource(t), p = u.createAnalyser(), p.fftSize = 512, p.smoothingTimeConstant = 0.6, h.connect(p);
    } catch {
      return;
    }
    let g = null, d = 0, f = !1;
    const x = new Float32Array(p.frequencyBinCount), v = setInterval(() => {
      if (f) return;
      p.getFloatTimeDomainData(x);
      let w = 0;
      for (let y = 0; y < x.length; y++) w += x[y] * x[y];
      const N = 20 * Math.log10(Math.sqrt(w / x.length)), b = Date.now();
      N > r ? (g == null && (g = b), b - g >= o && b - d > a && (l(!0), d = b, setTimeout(() => {
        f || l(!1);
      }, 3e3), g = null)) : g = null;
    }, 200);
    return () => {
      f = !0, clearInterval(v);
      try {
        h.disconnect();
      } catch {
      }
      try {
        p.disconnect();
      } catch {
      }
    };
  }, [t, n, r, o, a]), A(() => {
    n || l(!1);
  }, [n]), s;
}
function Qe(t, n) {
  const [r, o] = E(0);
  return A(() => {
    if (!t) return;
    const a = (d, f) => {
      console.info("[useTrackStateBump] remote track", d, {
        participant: n,
        kind: f.kind,
        enabled: f.enabled,
        muted: f.muted,
        readyState: f.readyState,
        id: f.id
      }), o((x) => x + 1);
    }, s = (d) => a("mute", d.target), l = (d) => a("unmute", d.target), c = (d) => a("ended", d.target), u = /* @__PURE__ */ new WeakSet(), h = (d) => {
      u.has(d) || (u.add(d), d.addEventListener("mute", s), d.addEventListener("unmute", l), d.addEventListener("ended", c));
    };
    for (const d of t.getVideoTracks()) h(d);
    const p = (d) => {
      const f = d.track;
      f && f.kind === "video" && h(f), o((x) => x + 1);
    }, g = () => o((d) => d + 1);
    return t.addEventListener("addtrack", p), t.addEventListener("removetrack", g), () => {
      for (const d of t.getVideoTracks())
        d.removeEventListener("mute", s), d.removeEventListener("unmute", l), d.removeEventListener("ended", c);
      t.removeEventListener("addtrack", p), t.removeEventListener("removetrack", g);
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
  const s = P(null), l = P(a);
  return l.current = a, A(() => {
    const c = s.current;
    if (!c) return;
    c.srcObject !== t && (c.srcObject = t), r && (r.current = c);
    const u = (f) => {
      l.current?.(f);
    }, h = () => u("playing"), p = () => u("ended"), g = () => {
      c.ended && u("ended");
    };
    c.addEventListener("play", h), c.addEventListener("ended", p), c.addEventListener("pause", g);
    const d = c.play();
    return d && typeof d.catch == "function" && d.catch((f) => {
      f?.name === "NotAllowedError" && u("paused-by-autoplay");
    }), () => {
      c.removeEventListener("play", h), c.removeEventListener("ended", p), c.removeEventListener("pause", g), r && r.current === c && (r.current = null);
    };
  }, [t, r]), /* @__PURE__ */ e(
    "video",
    {
      ref: s,
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
function Ft({
  chipLabel: t = "Tap to unmute",
  chipClassName: n,
  wrapperClassName: r,
  onPlayStateChange: o,
  ...a
}) {
  const [s, l] = E(!1), c = P(null), h = a.videoRef ?? c, p = U(
    (d) => {
      d === "paused-by-autoplay" ? l(!0) : d === "playing" && l(!1), o?.(d);
    },
    [o]
  ), g = U(() => {
    const d = h.current;
    if (d) {
      d.muted = !1;
      const f = d.play();
      f && typeof f.catch == "function" && f.catch(() => {
      });
    }
    tt(), l(!1);
  }, [h]);
  return /* @__PURE__ */ i("div", { className: m("relative h-full w-full", r), children: [
    /* @__PURE__ */ e(
      de,
      {
        ...a,
        videoRef: h,
        onPlayStateChange: p
      }
    ),
    s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: g,
        className: m(et, n),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
function Ot({
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
  const a = Date.now(), s = t.slice(-n).map((l) => {
    const c = a - new Date(l.at).getTime(), u = Math.max(0.35, 1 - c / r);
    return { ...l, opacity: u };
  }).filter((l) => l.opacity > 0);
  return s.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: m(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: s.map((l) => /* @__PURE__ */ i(
        "div",
        {
          className: m(
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
  size: s = "md",
  disabled: l,
  className: c,
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
      className: m(
        "rounded-full grid place-items-center transition-colors duration-150",
        rt[s],
        h,
        l && "opacity-40 cursor-not-allowed",
        !l && "cursor-pointer",
        c
      ),
      ...u,
      children: t ? n : r
    }
  );
}
function V(t, n) {
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
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function he({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
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
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function me({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function lt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function st({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function ct({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function Zt({ size: t = 20, ...n }) {
  return /* @__PURE__ */ i("svg", { ...V(t, n), children: [
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
  videoEnabled: s,
  onToggleAudio: l,
  onToggleVideo: c,
  onRetryPermission: u,
  participants: h,
  readyState: p,
  readyLoading: g = !1,
  onJoin: d,
  onCancel: f,
  joinLabel: x,
  joinDisabled: v,
  subtitleOverride: w,
  className: N,
  "data-testid": b
}) {
  const y = P(null);
  A(() => {
    y.current && n && (y.current.srcObject = n);
  }, [n]);
  const L = r === "granted", S = ut(r), M = v ?? !L, T = x ?? (M && !L ? "Allow camera to join" : "Join now"), j = w ?? dt(h, p, g);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": b,
      className: m(
        "flex flex-col h-full min-h-0 bg-slate-50 text-slate-900",
        N
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-slate-500 mt-0.5", children: j })
          ] }),
          /* @__PURE__ */ e(te, { variant: "ghost", size: "sm", onClick: f, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black", children: [
              n && L && /* @__PURE__ */ e(
                "video",
                {
                  ref: y,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: m(
                    "w-full h-full object-cover scale-x-[-1]",
                    !s && "opacity-0"
                  )
                }
              ),
              L && !s && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center text-slate-300 text-sm", children: "Camera off" }),
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
                  on: s,
                  onClick: c,
                  disabled: !L,
                  "aria-label": s ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: s ? "Turn camera off before joining" : "Turn camera on before joining",
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
              /* @__PURE__ */ e(ht, { participants: h, loading: g }),
              p === "pending" && !g && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-amber-600 flex items-center gap-2", children: [
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
                  onClick: () => d({ audio: a, video: s }),
                  disabled: M,
                  "data-testid": "prejoin-join-button",
                  children: T
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: f,
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
  actions: s,
  className: l,
  "data-testid": c
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": c,
      className: m(
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
        (a || s) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
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
          s
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
  onToggleScreenShare: s,
  onLeave: l,
  audioDisabled: c,
  videoDisabled: u,
  screenShareDisabled: h,
  extras: p,
  leaveLabel: g = "Leave call",
  size: d = "md",
  className: f,
  "data-testid": x
}) {
  const v = d === "lg" ? 22 : d === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": x,
      className: m(
        "flex items-center justify-center gap-3 px-4 py-3",
        f
      ),
      children: [
        /* @__PURE__ */ e(
          K,
          {
            on: t,
            onClick: o,
            disabled: c,
            size: d,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(ue, { size: v }),
            iconOff: /* @__PURE__ */ e(he, { size: v }),
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
            iconOn: /* @__PURE__ */ e(fe, { size: v }),
            iconOff: /* @__PURE__ */ e(me, { size: v }),
            "data-testid": "media-controls-cam"
          }
        ),
        s && /* @__PURE__ */ e(
          K,
          {
            on: r,
            onClick: s,
            disabled: h,
            size: d,
            offTone: "neutral",
            "aria-label": r ? "Stop sharing screen" : "Share screen",
            title: r ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(lt, { size: v }),
            iconOff: /* @__PURE__ */ e(st, { size: v }),
            "data-testid": "media-controls-screenshare"
          }
        ),
        p,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: l,
            "aria-label": g,
            title: g,
            "data-testid": "media-controls-leave",
            className: m(
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
  Ft as A,
  jt as B,
  Ie as C,
  Pt as D,
  qe as E,
  Dt as F,
  Qe as G,
  Jt as H,
  Gt as M,
  Me as N,
  ct as P,
  Bt as R,
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
  Vt as l,
  Tt as m,
  _t as n,
  zt as o,
  Rt as p,
  Ye as q,
  Ot as r,
  Ht as s,
  st as t,
  St as u,
  At as v,
  de as w,
  fe as x,
  me as y,
  Mt as z
};
