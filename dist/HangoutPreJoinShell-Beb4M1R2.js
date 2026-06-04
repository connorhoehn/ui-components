import { jsxs as i, jsx as e, Fragment as J } from "react/jsx-runtime";
import { useRef as A, useState as B, useEffect as T, useMemo as X, useCallback as _ } from "react";
import { c as m } from "./cn-B6yFEsav.js";
import { P as ue } from "./HangoutLayout-BT6X2zG6.js";
import { A as ae } from "./Avatar-BvKIaNVE.js";
import { B as Q } from "./Button-Qsbxqsl9.js";
import { C as he } from "./Chip-CAS9vOWq.js";
import { S as oe, P as fe } from "./PermissionDeniedCard-B9U2evs3.js";
const me = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function ft({
  src: t,
  stream: r,
  autoPlay: n = !1,
  muted: o = !0,
  loop: a = !1,
  controls: s = !1,
  poster: l,
  phase: c,
  className: d,
  style: h,
  onPhaseChange: p,
  onTimeUpdate: g
}) {
  const u = A(null), [f, x] = B("idle"), b = c ?? f;
  T(() => {
    const v = u.current;
    if (!v) return;
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
        g?.(v.currentTime, v.duration);
      }]
    ];
    return y.forEach(([L, S]) => v.addEventListener(L, S)), () => y.forEach(([L, S]) => v.removeEventListener(L, S));
  }, [p, g]), T(() => {
    const v = u.current;
    v && r !== void 0 && (v.srcObject = r);
  }, [r]);
  const w = b !== "playing", N = me[b];
  return /* @__PURE__ */ i(
    "div",
    {
      className: m("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: h,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: u,
            src: r ? void 0 : t,
            autoPlay: n,
            muted: o,
            loop: a,
            controls: s,
            poster: l,
            playsInline: !0,
            className: m("w-full h-full object-contain block")
          }
        ),
        w && N && /* @__PURE__ */ i("div", { className: m("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          b === "buffering" && /* @__PURE__ */ e(pe, {}),
          /* @__PURE__ */ e("span", { className: m(b === "buffering" ? "ml-2" : ""), children: N })
        ] })
      ]
    }
  );
}
function pe() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: m("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function xe(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function mt({
  onClose: t,
  sources: r,
  title: n,
  subtitle: o,
  autoPlay: a = !0,
  muted: s = !1,
  hideDownload: l = !1,
  header: c,
  footer: d,
  className: h
}) {
  const p = X(() => r.filter((x) => !!x.url), [r]), [g, u] = B(0), f = p[g];
  return T(() => {
    const x = (b) => {
      b.key === "Escape" && t();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [t]), /* @__PURE__ */ e(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": n || "Video player",
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
            (n || o || c) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                n && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: n }),
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
                children: p.map((x, b) => {
                  const w = b === g;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => u(b),
                      className: m(
                        "px-2.5 py-1 rounded transition-colors",
                        w ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": w ? "true" : void 0,
                      title: x.sizeBytes != null ? xe(x.sizeBytes) : void 0,
                      children: x.label || `Segment ${b + 1}`
                    },
                    `${b}:${x.url}`
                  );
                })
              }
            ),
            (d || !l && f) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: d }),
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
function ge(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function pt({ metrics: t, style: r }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", ge(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && n.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: r, children: n.map(([o, a]) => /* @__PURE__ */ i("div", { className: m("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: m("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ e("span", { className: m("font-mono"), children: a })
  ] }, o)) });
}
const ve = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, be = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, we = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function ye({ quality: t, style: r }) {
  const n = ve[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: r, children: [
    /* @__PURE__ */ e("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((a) => /* @__PURE__ */ e(
      "rect",
      {
        x: a * 4,
        y: 12 - (a + 1) * 3,
        width: "3",
        height: (a + 1) * 3,
        rx: "0.5",
        fill: a < o ? n : "rgba(255,255,255,0.2)"
      },
      a
    )) }),
    /* @__PURE__ */ e("span", { className: be[t], children: we[t] })
  ] });
}
function xt({ participants: t, style: r }) {
  const n = t.length, o = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: m("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...r },
      children: t.map((a) => /* @__PURE__ */ e(
        ue,
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
function gt({ reactions: t, style: r }) {
  const [n, o] = B([]);
  return T(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], s = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), s]);
  }, [t]), T(() => {
    const a = setInterval(() => {
      o((s) => s.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(a);
  }, []), /* @__PURE__ */ e("div", { className: m("absolute inset-0 pointer-events-none overflow-hidden"), style: r, children: n.map((a) => /* @__PURE__ */ e(
    "span",
    {
      className: m("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${a.x}%` },
      children: a.emoji
    },
    a.id
  )) });
}
const ke = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function vt({ onReact: t, emojis: r = ke, style: n }) {
  return /* @__PURE__ */ e("div", { className: m("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: n, children: r.map((o) => /* @__PURE__ */ e(
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
function Ne(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function Ce(t) {
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${n}:${String(o).padStart(2, "0")}`;
}
const Le = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, Me = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function bt({ phase: t, bitrateBps: r, viewerCount: n, duration: o, style: a }) {
  const s = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: m("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: m("w-[7px] h-[7px] rounded-full", Le[t] ?? "bg-slate-400") }),
      /* @__PURE__ */ e("span", { className: m("font-semibold", Me[t] ?? "text-slate-400"), children: s })
    ] }),
    r !== void 0 && /* @__PURE__ */ e("span", { children: Ne(r) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: Ce(o) }),
    n !== void 0 && /* @__PURE__ */ i("span", { className: m("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function wt({ count: t, style: r }) {
  const n = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i("div", { className: m("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: r, children: [
    /* @__PURE__ */ i("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ i("span", { children: [
      n,
      " watching"
    ] })
  ] });
}
function je(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function Se(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function U({ participant: t, size: r = 32 }) {
  const n = Se(t.displayName);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "call-avatar",
      "data-speaking": t.isSpeaking ? "true" : void 0,
      "data-muted": t.isMuted ? "true" : void 0,
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: r,
        height: r,
        fontSize: r * 0.38,
        background: t.avatarUrl ? void 0 : `hsl(${n}, 55%, 45%)`
      },
      children: [
        t.avatarUrl ? /* @__PURE__ */ e(
          "img",
          {
            src: t.avatarUrl,
            alt: "",
            className: "w-full h-full rounded-full object-cover"
          }
        ) : je(t.displayName),
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
function Be({
  participants: t,
  localFallback: r,
  maxVisible: n = 4,
  avatarSize: o = 36,
  testId: a = "call-participant-strip",
  className: s,
  style: l
}) {
  const c = t.slice(0, n), d = Math.max(0, t.length - n), h = t.length === 0 && !!r;
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
        c.map((p) => /* @__PURE__ */ e(U, { participant: p, size: o }, p.id)),
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
        h && r && /* @__PURE__ */ e(U, { participant: r, size: o + 4 })
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
function O({
  icon: t,
  label: r,
  active: n = !1,
  danger: o = !1,
  onClick: a,
  disabled: s = !1,
  testId: l
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: r,
      "aria-label": r,
      disabled: s,
      onClick: a,
      "data-testid": l,
      className: m(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        n && !o && "bg-white/20 text-white",
        !n && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        s && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function Pe({
  mode: t,
  isMuted: r = !1,
  isCameraOn: n = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: s,
  onToggleScreenShare: l,
  onUpgradeToVideo: c,
  onEndCall: d,
  onAddParticipant: h,
  availableParticipants: p,
  currentParticipantIds: g,
  className: u
}) {
  const [f, x] = B(!1), b = new Set(g ?? []), w = (p ?? []).filter((N) => !b.has(N.id));
  return /* @__PURE__ */ i("div", { className: m("flex flex-col", u), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            O,
            {
              icon: r ? V.micOff : V.mic,
              label: r ? "Unmute" : "Mute",
              active: r,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            O,
            {
              icon: n ? V.camera : V.cameraOff,
              label: n ? "Turn off camera" : "Turn on camera",
              active: !n,
              onClick: s,
              testId: "camera-button"
            }
          ),
          t === "audio" && c && /* @__PURE__ */ e(
            O,
            {
              icon: V.videoUpgrade,
              label: "Switch to video",
              onClick: c,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            O,
            {
              icon: V.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          h && /* @__PURE__ */ e(
            O,
            {
              icon: V.userPlus,
              label: "Add participant",
              active: f,
              onClick: () => x((N) => !N),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ e(
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
                /* @__PURE__ */ e(U, { participant: N, size: 22 }),
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
function $e(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const Te = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function Ae(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)} Mb/s` : `${Math.round(t)} kb/s`;
}
function q({
  stats: t,
  position: r = "top-left",
  testId: n = "call-stats-overlay",
  className: o,
  style: a
}) {
  return $e(t) ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": n,
      className: m(
        "absolute z-10 pointer-events-none",
        Te[r],
        "flex flex-col gap-1.5",
        o
      ),
      style: a,
      children: [
        t.networkQuality && /* @__PURE__ */ e(ye, { quality: t.networkQuality }),
        (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              t.bitrateKbps !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                Ae(t.bitrateKbps)
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
function le(t) {
  const r = Math.floor(t / 60), n = t % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function ee({
  stream: t,
  muted: r = !1,
  className: n
}) {
  const o = A(null);
  return T(() => {
    const a = o.current;
    a && a.srcObject !== t && (a.srcObject = t);
  }, [t]), /* @__PURE__ */ e(
    "video",
    {
      ref: o,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: m("w-full h-full object-cover", n)
    }
  );
}
const Y = {
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
function Ee({
  callerName: t,
  onAnswer: r,
  onDecline: n
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
          onClick: n,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: Y.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: Y.phoneAnswer
        }
      )
    ] })
  ] });
}
function Ie({
  mode: t,
  participants: r,
  localParticipant: n,
  duration: o,
  isMuted: a,
  isCameraOn: s,
  isScreenSharing: l,
  onToggleMute: c,
  onToggleCamera: d,
  onToggleScreenShare: h,
  onUpgradeToVideo: p,
  onAddParticipant: g,
  availableParticipants: u,
  onEndCall: f,
  layoutComponent: x,
  callStats: b
}) {
  const w = t === "video" && s;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && x && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ e(q, { stats: b, position: "bottom-left" })
    ] }),
    t === "video" && !x && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && w ? /* @__PURE__ */ e(ee, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: n && /* @__PURE__ */ e(U, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        r[0].videoStream ? /* @__PURE__ */ e(ee, { stream: r[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(U, { participant: r[0], size: 28 }) }),
        r[0].isMuted && /* @__PURE__ */ e(
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
      /* @__PURE__ */ e(q, { stats: b, position: "bottom-left" })
    ] }),
    t === "audio" && /* @__PURE__ */ e(
      Be,
      {
        participants: r,
        localFallback: n,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: le(o) }),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ e(
      Pe,
      {
        mode: t,
        isMuted: a,
        isCameraOn: s,
        isScreenSharing: l,
        onToggleMute: c,
        onToggleCamera: d,
        onToggleScreenShare: h,
        onUpgradeToVideo: p,
        onEndCall: f,
        onAddParticipant: g,
        availableParticipants: u,
        currentParticipantIds: r.map((N) => N.id)
      }
    )
  ] });
}
function Re({
  state: t,
  mode: r,
  duration: n,
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
      onKeyDown: (d) => d.key === "Enter" && c?.(),
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
          r === "video" ? "Video" : "Audio",
          " call",
          n !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: le(n) })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (d) => d.stopPropagation(), children: [
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
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(J, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(J, { children: [
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
function Ve(t) {
  const [r, n] = B({ x: 0, y: 0 }), [o, a] = B(!1), [s, l] = B(!1), c = A(!1), d = A({ x: 0, y: 0 }), h = A({ x: 0, y: 0 }), p = A(null), g = _(
    (w) => {
      t && (c.current = !0, a(!0), l(!1), d.current = { x: w.clientX, y: w.clientY }, h.current = { ...r }, w.preventDefault());
    },
    [t, r]
  ), u = _(() => {
    l(!0), n({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), f = _(
    (w) => {
      const N = p.current;
      if (!N) return;
      const v = N.offsetParent, y = 16;
      let L = window.innerWidth, S = window.innerHeight;
      v && (L = v.clientWidth, S = v.clientHeight);
      const M = N.getBoundingClientRect(), $ = v ? v.getBoundingClientRect() : { left: 0, top: 0 };
      let j, E;
      switch (w) {
        case "top-left":
          j = y, E = y;
          break;
        case "top-right":
          j = L - M.width - y, E = y;
          break;
        case "bottom-left":
          j = y, E = S - M.height - y;
          break;
        default:
          j = L - M.width - y, E = S - M.height - y;
          break;
      }
      const I = M.left - $.left - r.x, R = M.top - $.top - r.y;
      l(!0), n({ x: j - I, y: E - R }), setTimeout(() => l(!1), 200);
    },
    [r]
  ), x = A(f);
  x.current = f, T(() => {
    if (!t) return;
    const w = (v) => {
      c.current && n({
        x: h.current.x + (v.clientX - d.current.x),
        y: h.current.y + (v.clientY - d.current.y)
      });
    }, N = () => {
      if (!c.current) return;
      c.current = !1, a(!1);
      const v = p.current;
      if (!v) return;
      const y = v.offsetParent, L = 80;
      let S = window.innerWidth, M = window.innerHeight;
      if (y) {
        const P = y.getBoundingClientRect();
        S = P.width, M = P.height;
      }
      const $ = v.getBoundingClientRect(), j = y ? y.getBoundingClientRect() : { left: 0, top: 0 }, E = $.left - j.left, I = $.top - j.top, R = S - (E + $.width), z = M - (I + $.height), D = E < L, H = R < L, k = I < L, C = z < L;
      k && D ? x.current("top-left") : k && H ? x.current("top-right") : C && D ? x.current("bottom-left") : C && H && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", w), document.addEventListener("mouseup", N), () => {
      document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", N);
    };
  }, [t]);
  const b = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: g, resetOffset: u, snapToCorner: f, isDragging: o, isAnimating: s, hasMoved: b, widgetRef: p };
}
function De({
  onSnap: t,
  contained: r
}) {
  const n = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: m(r ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: n.map(({ id: o, classes: a }) => /* @__PURE__ */ e(
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
function yt({
  state: t,
  mode: r,
  participants: n,
  localParticipant: o,
  callerName: a,
  duration: s,
  isMuted: l = !1,
  isCameraOn: c = !0,
  isScreenSharing: d = !1,
  onAnswer: h,
  onDecline: p,
  onEndCall: g,
  onToggleMute: u,
  onToggleCamera: f,
  onToggleScreenShare: x,
  onUpgradeToVideo: b,
  onAddParticipant: w,
  availableParticipants: N,
  onMinimize: v,
  layoutComponent: y,
  callStats: L,
  minimized: S = !1,
  position: M = "bottom-right",
  contained: $ = !1,
  draggable: j = !0,
  className: E,
  style: I,
  dataAttrs: R
}) {
  const { offset: z, handleMouseDown: D, resetOffset: H, snapToCorner: k, isDragging: C, isAnimating: P, hasMoved: W, widgetRef: G } = Ve(j), F = {};
  if (R)
    for (const [de, K] of Object.entries(R))
      K != null && K !== "" && (F[de] = K);
  const ce = X(() => {
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
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(J, { children: [
    C && /* @__PURE__ */ e(De, { onSnap: k, contained: $ }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: G,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: m(
          $ ? "absolute z-50" : "fixed z-[9999]",
          ce,
          E
        ),
        style: {
          transform: `translate(${z.x}px, ${z.y}px)`,
          transition: P ? "transform 0.2s ease-out" : void 0,
          ...I
        },
        ...F,
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
                  onMouseDown: D,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                      W && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: H,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: Y.snapBack
                        }
                      ),
                      v && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: v,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: Y.minimize
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
                  onMouseDown: D,
                  children: /* @__PURE__ */ e(
                    Re,
                    {
                      state: t,
                      mode: r,
                      duration: s,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: u,
                      onEndCall: g,
                      onExpand: v
                    }
                  )
                }
              ),
              !S && /* @__PURE__ */ i(J, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  Ee,
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
                  Ie,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: o,
                    duration: s,
                    isMuted: l,
                    isCameraOn: c,
                    isScreenSharing: d,
                    onToggleMute: u,
                    onToggleCamera: f,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: b,
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
function kt({
  callerName: t,
  callerAvatarUrl: r,
  context: n,
  mode: o = "started",
  onJoin: a,
  onDismiss: s,
  autoExpireSec: l = 30,
  className: c,
  style: d
}) {
  const [h, p] = B(!0);
  return T(() => {
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
      style: d,
      children: [
        /* @__PURE__ */ e(We, { name: t, avatarUrl: r }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          n && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: n })
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
function We({ name: t, avatarUrl: r }) {
  const n = He(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ e("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : ze(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function ze(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function He(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function te(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = r > 0 ? String(n).padStart(2, "0") : String(n), s = String(o).padStart(2, "0");
  return r > 0 ? `${r}:${a}:${s}` : `${a}:${s}`;
}
function Nt({
  playlistUrl: t,
  poster: r,
  autoPlay: n = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: s,
  onError: l,
  hideDownload: c = !1,
  className: d
}) {
  const h = A(null), p = A(null), [g, u] = B(!1), [f, x] = B(0), [b, w] = B(0), [N, v] = B(1), [y, L] = B(1), [S, M] = B(!1), [$, j] = B(null);
  T(() => {
    const k = h.current;
    if (!k || !t) return;
    if (j(null), M(!0), k.canPlayType("application/vnd.apple.mpegurl"))
      return k.src = t, () => {
        k.removeAttribute("src"), k.load();
      };
    let C = !1;
    return (async () => {
      try {
        const P = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (C) return;
        if (!P.isSupported()) {
          j("HLS playback is not supported in this browser."), M(!1);
          return;
        }
        const W = new P({ enableWorker: !0 });
        p.current = W, W.attachMedia(k), W.on(P.Events.MEDIA_ATTACHED, () => W.loadSource(t)), W.on(P.Events.ERROR, (G, F) => {
          F.fatal && (j(`HLS error: ${F.type}`), l?.(new Error(`HLS fatal: ${F.type}`)));
        });
      } catch (P) {
        if (C) return;
        j(`Failed to load hls.js — install it in the consumer app: ${P?.message ?? P}`);
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
  const E = () => {
    const k = h.current;
    k && (k.paused ? k.play().catch(() => {
    }) : k.pause());
  }, I = (k) => {
    const C = h.current;
    !C || !isFinite(b) || b <= 0 || (C.currentTime = Number(k.target.value));
  }, R = (k) => {
    const C = h.current;
    if (!C) return;
    const P = Number(k.target.value);
    C.volume = P, v(P);
  }, z = (k) => {
    const C = h.current;
    if (!C) return;
    const P = Number(k.target.value);
    C.playbackRate = P, L(P);
  }, D = () => {
    const k = h.current;
    k && (document.fullscreenElement ? document.exitFullscreen() : k.requestFullscreen?.());
  }, H = X(
    () => b > 0 ? Math.min(100, f / b * 100) : 0,
    [f, b]
  );
  return /* @__PURE__ */ i("div", { className: m("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: h,
        autoPlay: n,
        muted: o,
        poster: r,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => u(!0),
        onPause: () => u(!1),
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
    S && !$ && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    $ && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: $ }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: te(f) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(b) ? b : 0,
            step: 0.1,
            value: f,
            onChange: I,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${H}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: te(b) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: E,
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
            onChange: z,
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
            onClick: D,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Fe(t) {
  if (!isFinite(t) || t < 0) return "—";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
function re(t) {
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
function Oe({ status: t }) {
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
function _e({
  id: t,
  startIso: r,
  durationSec: n,
  participantCount: o,
  thumbnailUrl: a,
  label: s,
  status: l = "ready",
  selected: c,
  onClick: d,
  actions: h,
  className: p
}) {
  const g = typeof d == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...g ? {
        role: "button",
        tabIndex: 0,
        onClick: () => d(t),
        onKeyDown: (f) => {
          g && (f.key === "Enter" || f.key === " ") && (f.preventDefault(), d(t));
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
          /* @__PURE__ */ e(Oe, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Fe(n) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: s ?? re(r) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        s && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: re(r) }),
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
function Ct({
  recordings: t,
  selectedId: r,
  onSelect: n,
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
    _e,
    {
      id: c.id,
      startIso: c.startIso,
      endIso: c.endIso,
      durationSec: c.durationSec,
      participantCount: c.participantCount,
      thumbnailUrl: c.thumbnailUrl,
      label: c.label,
      status: c.status,
      selected: c.id === r,
      onClick: n,
      actions: s?.(c)
    },
    c.id
  )) });
}
function Lt({
  getVideoElement: t,
  className: r,
  title: n
}) {
  const [o, a] = B(!1), [s, l] = B(!1);
  T(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), T(() => {
    const h = () => a(!1), p = () => a(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", p), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", p);
    };
  }, []);
  const c = _(async () => {
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
  }, [s, t]), d = !s;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: c,
      disabled: d,
      title: n ?? (d ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: m(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function Ue(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function Mt({
  participants: t,
  activeSpeakerId: r,
  onParticipantClick: n,
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
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((d) => {
          const h = d.id === r;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: n ? () => n(d.id) : void 0,
              className: m(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                h && "bg-white/[0.04]",
                n ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !n,
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
                      d.avatarUrl ? /* @__PURE__ */ e("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: Ue(d.displayName) }),
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
        s && /* @__PURE__ */ e("div", { className: "border-t border-[var(--color-border)] p-3", children: s })
      ]
    }
  );
}
let Z = null;
function Ke() {
  if (Z) return Z;
  try {
    return Z = new AudioContext(), Z;
  } catch {
    return null;
  }
}
function jt({
  localStream: t,
  isMuted: r,
  threshold: n = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [s, l] = B(!1);
  return T(() => {
    if (!r || !t || t.getAudioTracks().filter((w) => w.readyState === "live").length === 0) return;
    const d = Ke();
    if (!d) return;
    let h, p;
    try {
      h = d.createMediaStreamSource(t), p = d.createAnalyser(), p.fftSize = 512, p.smoothingTimeConstant = 0.6, h.connect(p);
    } catch {
      return;
    }
    let g = null, u = 0, f = !1;
    const x = new Float32Array(p.frequencyBinCount), b = setInterval(() => {
      if (f) return;
      p.getFloatTimeDomainData(x);
      let w = 0;
      for (let y = 0; y < x.length; y++) w += x[y] * x[y];
      const N = 20 * Math.log10(Math.sqrt(w / x.length)), v = Date.now();
      N > n ? (g == null && (g = v), v - g >= o && v - u > a && (l(!0), u = v, setTimeout(() => {
        f || l(!1);
      }, 3e3), g = null)) : g = null;
    }, 200);
    return () => {
      f = !0, clearInterval(b);
      try {
        h.disconnect();
      } catch {
      }
      try {
        p.disconnect();
      } catch {
      }
    };
  }, [t, r, n, o, a]), T(() => {
    r || l(!1);
  }, [r]), s;
}
function Ze(t, r) {
  const [n, o] = B(0);
  return T(() => {
    if (!t) return;
    const a = (u, f) => {
      console.info("[useTrackStateBump] remote track", u, {
        participant: r,
        kind: f.kind,
        enabled: f.enabled,
        muted: f.muted,
        readyState: f.readyState,
        id: f.id
      }), o((x) => x + 1);
    }, s = (u) => a("mute", u.target), l = (u) => a("unmute", u.target), c = (u) => a("ended", u.target), d = /* @__PURE__ */ new WeakSet(), h = (u) => {
      d.has(u) || (d.add(u), u.addEventListener("mute", s), u.addEventListener("unmute", l), u.addEventListener("ended", c));
    };
    for (const u of t.getVideoTracks()) h(u);
    const p = (u) => {
      const f = u.track;
      f && f.kind === "video" && h(f), o((x) => x + 1);
    }, g = () => o((u) => u + 1);
    return t.addEventListener("addtrack", p), t.addEventListener("removetrack", g), () => {
      for (const u of t.getVideoTracks())
        u.removeEventListener("mute", s), u.removeEventListener("unmute", l), u.removeEventListener("ended", c);
      t.removeEventListener("addtrack", p), t.removeEventListener("removetrack", g);
    };
  }, [t, r]), n;
}
function Je(t) {
  if (!t) return !1;
  const r = t.getVideoTracks();
  return r.length === 0 ? !1 : r.some((n) => n.readyState === "live" && n.enabled && !n.muted);
}
function se({
  stream: t,
  muted: r = !1,
  videoRef: n,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: a
}) {
  const s = A(null), l = A(a);
  return l.current = a, T(() => {
    const c = s.current;
    if (!c) return;
    c.srcObject !== t && (c.srcObject = t), n && (n.current = c);
    const d = (f) => {
      l.current?.(f);
    }, h = () => d("playing"), p = () => d("ended"), g = () => {
      c.ended && d("ended");
    };
    c.addEventListener("play", h), c.addEventListener("ended", p), c.addEventListener("pause", g);
    const u = c.play();
    return u && typeof u.catch == "function" && u.catch((f) => {
      f?.name === "NotAllowedError" && d("paused-by-autoplay");
    }), () => {
      c.removeEventListener("play", h), c.removeEventListener("ended", p), c.removeEventListener("pause", g), n && n.current === c && (n.current = null);
    };
  }, [t, n]), /* @__PURE__ */ e(
    "video",
    {
      ref: s,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: o
    }
  );
}
const Ye = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Xe() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((r) => {
    if (r.paused) {
      const n = r.play();
      n && typeof n.catch == "function" && n.catch(() => {
      });
    }
  });
}
function St({
  chipLabel: t = "Tap to unmute",
  chipClassName: r,
  wrapperClassName: n,
  onPlayStateChange: o,
  ...a
}) {
  const [s, l] = B(!1), c = A(null), h = a.videoRef ?? c, p = _(
    (u) => {
      u === "paused-by-autoplay" ? l(!0) : u === "playing" && l(!1), o?.(u);
    },
    [o]
  ), g = _(() => {
    const u = h.current;
    if (u) {
      u.muted = !1;
      const f = u.play();
      f && typeof f.catch == "function" && f.catch(() => {
      });
    }
    Xe(), l(!1);
  }, [h]);
  return /* @__PURE__ */ i("div", { className: m("relative h-full w-full", n), children: [
    /* @__PURE__ */ e(
      se,
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
        className: m(Ye, r),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
function Bt({
  stream: t,
  displayName: r,
  cameraOn: n,
  avatarSize: o = 96
}) {
  Ze(t, r);
  const a = Je(t);
  return !n || !a || !t ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ e(ae, { name: r, size: o }) }) : /* @__PURE__ */ e(se, { stream: t });
}
function Pt({ show: t, label: r }) {
  return t ? /* @__PURE__ */ i(
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
function $t({ show: t, label: r = "Reconnecting…" }) {
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
function Tt({
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
const ne = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Ge(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++) r = r * 31 + t.charCodeAt(n) | 0;
  return ne[Math.abs(r) % ne.length];
}
function At({
  lines: t,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: o
}) {
  const a = Date.now(), s = t.slice(-r).map((l) => {
    const c = a - new Date(l.at).getTime(), d = Math.max(0.35, 1 - c / n);
    return { ...l, opacity: d };
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
                style: { color: Ge(l.speakerId) },
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
function Qe(t, r, n) {
  if (n) return "Checking room…";
  if (!r || r === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return r === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function qe(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function Et({
  channelName: t,
  previewStream: r,
  permission: n,
  permissionMessage: o,
  audioEnabled: a,
  videoEnabled: s,
  onToggleAudio: l,
  onToggleVideo: c,
  onRetryPermission: d,
  participants: h,
  readyState: p,
  readyLoading: g = !1,
  onJoin: u,
  onCancel: f,
  joinLabel: x,
  joinDisabled: b,
  subtitleOverride: w,
  className: N,
  "data-testid": v
}) {
  const y = A(null);
  T(() => {
    y.current && r && (y.current.srcObject = r);
  }, [r]);
  const L = n === "granted", S = qe(n), M = b ?? !L, $ = x ?? (M && !L ? "Allow camera to join" : "Join now"), j = w ?? Qe(h, p, g);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": v,
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
          /* @__PURE__ */ e(Q, { variant: "ghost", size: "sm", onClick: f, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black", children: [
              r && L && /* @__PURE__ */ e(
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
              n === "pending" && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ e(oe, { size: "lg" }) }),
              S && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center bg-slate-50/95", children: /* @__PURE__ */ e(
                fe,
                {
                  kind: "camera",
                  state: S,
                  message: o,
                  onRetry: d,
                  "data-testid": "prejoin-permission-card"
                }
              ) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ e(
                ie,
                {
                  active: a,
                  onClick: l,
                  disabled: !L,
                  label: a ? "Mute mic before joining" : "Unmute mic before joining",
                  icon: a ? /* @__PURE__ */ e(tt, {}) : /* @__PURE__ */ e(rt, {}),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                ie,
                {
                  active: s,
                  onClick: c,
                  disabled: !L,
                  label: s ? "Turn camera off before joining" : "Turn camera on before joining",
                  icon: s ? /* @__PURE__ */ e(nt, {}) : /* @__PURE__ */ e(it, {}),
                  "data-testid": "prejoin-toggle-video"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i("section", { className: "lg:w-96 flex flex-col", children: [
            /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ e("h2", { className: "text-2xl font-semibold mb-2", children: "Ready to join?" }),
              /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6", children: j }),
              /* @__PURE__ */ e(et, { participants: h, loading: g }),
              p === "pending" && !g && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-amber-600 flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" }),
                "Other publishers are still connecting — you can join anyway."
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ e(
                Q,
                {
                  variant: "primary",
                  size: "lg",
                  onClick: () => u({ audio: a, video: s }),
                  disabled: M,
                  "data-testid": "prejoin-join-button",
                  children: $
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
function et({
  participants: t,
  loading: r
}) {
  return r ? /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
    /* @__PURE__ */ e(oe, { size: "sm" }),
    " Checking room…"
  ] }) : !t || t.length === 0 ? null : /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ e("div", { className: "text-xs uppercase tracking-wide text-slate-500", children: "In the room" }),
    /* @__PURE__ */ i("ul", { className: "flex flex-col gap-1.5", children: [
      t.slice(0, 8).map((n) => {
        const o = n.displayName ?? n.participantId.slice(0, 8);
        return /* @__PURE__ */ i("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e(ae, { name: o, size: 24 }),
          /* @__PURE__ */ e("span", { className: "font-mono text-xs truncate", children: o }),
          /* @__PURE__ */ e(
            he,
            {
              size: "xs",
              tone: n.ready ? "success" : "warning",
              dot: n.ready ? "static" : "pulse",
              uppercase: !0,
              className: "ml-auto",
              children: n.ready ? "live" : "connecting"
            }
          )
        ] }, n.participantId);
      }),
      t.length > 8 && /* @__PURE__ */ i("li", { className: "text-xs text-slate-500", children: [
        "+",
        t.length - 8,
        " more"
      ] })
    ] })
  ] });
}
function ie({
  active: t,
  onClick: r,
  label: n,
  icon: o,
  disabled: a,
  "data-testid": s
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": n,
      "aria-pressed": t,
      title: n,
      onClick: r,
      disabled: a,
      "data-testid": s,
      className: m(
        "inline-flex items-center justify-center h-11 w-11 rounded-full transition-colors border",
        t ? "bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200" : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200",
        a && "opacity-40 cursor-not-allowed"
      ),
      children: o
    }
  );
}
function tt() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ e("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] });
}
function rt() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ e("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2" }),
    /* @__PURE__ */ e("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] });
}
function nt() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ e("path", { d: "m22 8-6 4 6 4V8Z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", ry: "2" })
  ] });
}
function it() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ e("path", { d: "M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" }),
    /* @__PURE__ */ e("path", { d: "M2 6.5v9a2 2 0 0 0 2 2h7" }),
    /* @__PURE__ */ e("path", { d: "m22 8-6 4 6 4V8Z" })
  ] });
}
export {
  St as A,
  Pe as C,
  Et as H,
  Tt as M,
  ye as N,
  Lt as P,
  gt as R,
  pt as S,
  At as T,
  xt as V,
  Be as a,
  kt as b,
  q as c,
  yt as d,
  Pt as e,
  vt as f,
  $t as g,
  Ct as h,
  Nt as i,
  _e as j,
  Bt as k,
  Mt as l,
  bt as m,
  se as n,
  ft as o,
  mt as p,
  wt as q,
  Ze as r,
  Je as s,
  jt as u
};
