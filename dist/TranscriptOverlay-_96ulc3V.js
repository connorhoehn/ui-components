import { jsxs as a, jsx as t, Fragment as Z } from "react/jsx-runtime";
import { useRef as T, useState as L, useEffect as $, useMemo as G, useCallback as _ } from "react";
import { c as m } from "./cn-B6yFEsav.js";
import { P as le } from "./HangoutLayout-BT6X2zG6.js";
import { A as se } from "./Avatar-BvKIaNVE.js";
const ce = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function qe({
  src: e,
  stream: r,
  autoPlay: n = !1,
  muted: o = !0,
  loop: i = !1,
  controls: c = !1,
  poster: l,
  phase: s,
  className: d,
  style: h,
  onPhaseChange: p,
  onTimeUpdate: g
}) {
  const u = T(null), [f, x] = L("idle"), b = s ?? f;
  $(() => {
    const v = u.current;
    if (!v) return;
    const N = [
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
    return N.forEach(([B, E]) => v.addEventListener(B, E)), () => N.forEach(([B, E]) => v.removeEventListener(B, E));
  }, [p, g]), $(() => {
    const v = u.current;
    v && r !== void 0 && (v.srcObject = r);
  }, [r]);
  const y = b !== "playing", k = ce[b];
  return /* @__PURE__ */ a(
    "div",
    {
      className: m("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: h,
      children: [
        /* @__PURE__ */ t(
          "video",
          {
            ref: u,
            src: r ? void 0 : e,
            autoPlay: n,
            muted: o,
            loop: i,
            controls: c,
            poster: l,
            playsInline: !0,
            className: m("w-full h-full object-contain block")
          }
        ),
        y && k && /* @__PURE__ */ a("div", { className: m("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          b === "buffering" && /* @__PURE__ */ t(de, {}),
          /* @__PURE__ */ t("span", { className: m(b === "buffering" ? "ml-2" : ""), children: k })
        ] })
      ]
    }
  );
}
function de() {
  return /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: m("animate-spin"), children: [
    /* @__PURE__ */ t("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function ue(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : e < 1024 * 1024 * 1024 ? `${(e / (1024 * 1024)).toFixed(1)} MB` : `${(e / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function Je({
  onClose: e,
  sources: r,
  title: n,
  subtitle: o,
  autoPlay: i = !0,
  muted: c = !1,
  hideDownload: l = !1,
  header: s,
  footer: d,
  className: h
}) {
  const p = G(() => r.filter((x) => !!x.url), [r]), [g, u] = L(0), f = p[g];
  return $(() => {
    const x = (b) => {
      b.key === "Escape" && e();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [e]), /* @__PURE__ */ t(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": n || "Video player",
      onClick: e,
      className: m(
        "fixed inset-0 z-50 grid place-items-center p-4",
        "bg-black/80 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ a(
        "div",
        {
          onClick: (x) => x.stopPropagation(),
          className: m(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            h
          ),
          children: [
            (n || o || s) && /* @__PURE__ */ a("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ a("div", { className: "min-w-0 flex-1", children: [
                n && /* @__PURE__ */ t("h2", { className: "text-sm font-semibold truncate", children: n }),
                o && /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ a("div", { className: "flex items-center gap-1 shrink-0", children: [
                s,
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: e,
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
            f ? /* @__PURE__ */ t(
              "video",
              {
                src: f.url,
                controls: !0,
                autoPlay: i,
                muted: c,
                className: "w-full max-h-[70vh] bg-black"
              },
              f.url
            ) : /* @__PURE__ */ t("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            p.length > 1 && /* @__PURE__ */ t(
              "nav",
              {
                className: m(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: p.map((x, b) => {
                  const y = b === g;
                  return /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => u(b),
                      className: m(
                        "px-2.5 py-1 rounded transition-colors",
                        y ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": y ? "true" : void 0,
                      title: x.sizeBytes != null ? ue(x.sizeBytes) : void 0,
                      children: x.label || `Segment ${b + 1}`
                    },
                    `${b}:${x.url}`
                  );
                })
              }
            ),
            (d || !l && f) && /* @__PURE__ */ a("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ t("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: d }),
              !l && f && /* @__PURE__ */ t(
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
function he(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function et({ metrics: e, style: r }) {
  if (!e)
    return /* @__PURE__ */ t("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", he(e.bitrateBps)],
    ["FPS", `${e.fps}`],
    ["Resolution", `${e.resolution.width}×${e.resolution.height}`],
    ["Packets Lost", `${e.packetsLost}`]
  ];
  return e.jitter !== void 0 && n.push(["Jitter", `${e.jitter.toFixed(1)} ms`]), /* @__PURE__ */ t("div", { className: m("p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]"), style: r, children: n.map(([o, i]) => /* @__PURE__ */ a("div", { className: m("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ t("span", { className: m("text-[#94a3b8]"), children: o }),
    /* @__PURE__ */ t("span", { className: m("font-mono"), children: i })
  ] }, o)) });
}
const fe = {
  good: "#22c55e",
  medium: "#eab308",
  poor: "#f97316",
  dead: "#ef4444"
}, me = {
  good: "text-green-500",
  medium: "text-yellow-500",
  poor: "text-orange-500",
  dead: "text-red-500"
}, pe = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function xe({ quality: e, style: r }) {
  const n = fe[e], o = e === "good" ? 4 : e === "medium" ? 3 : e === "poor" ? 2 : 1;
  return /* @__PURE__ */ a("div", { className: m("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: r, children: [
    /* @__PURE__ */ t("svg", { width: "14", height: "12", viewBox: "0 0 14 12", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ t(
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
    /* @__PURE__ */ t("span", { className: me[e], children: pe[e] })
  ] });
}
function tt({ participants: e, style: r }) {
  const n = e.length, o = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ t(
    "div",
    {
      className: m("grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...r },
      children: e.map((i) => /* @__PURE__ */ t(
        le,
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
function rt({ reactions: e, style: r }) {
  const [n, o] = L([]);
  return $(() => {
    if (e.length === 0) return;
    const i = e[e.length - 1], c = {
      id: i.id + "-" + Date.now(),
      emoji: i.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), c]);
  }, [e]), $(() => {
    const i = setInterval(() => {
      o((c) => c.filter((l) => Date.now() - l.createdAt < 3e3));
    }, 500);
    return () => clearInterval(i);
  }, []), /* @__PURE__ */ t("div", { className: m("absolute inset-0 pointer-events-none overflow-hidden"), style: r, children: n.map((i) => /* @__PURE__ */ t(
    "span",
    {
      className: m("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${i.x}%` },
      children: i.emoji
    },
    i.id
  )) });
}
const ge = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function nt({ onReact: e, emojis: r = ge, style: n }) {
  return /* @__PURE__ */ t("div", { className: m("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: n, children: r.map((o) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: () => e(o),
      className: m("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (i) => i.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (i) => i.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (i) => i.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function ve(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function be(e) {
  const r = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), o = Math.floor(e % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${n}:${String(o).padStart(2, "0")}`;
}
const we = {
  live: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  playing: "bg-green-500 shadow-[0_0_6px_#22c55e]",
  connecting: "bg-yellow-500",
  reconnecting: "bg-yellow-500",
  buffering: "bg-yellow-500",
  idle: "bg-slate-400",
  error: "bg-red-500"
}, ye = {
  live: "text-green-500",
  playing: "text-green-500",
  connecting: "text-yellow-500",
  reconnecting: "text-yellow-500",
  buffering: "text-yellow-500",
  idle: "text-slate-400",
  error: "text-red-500"
};
function it({ phase: e, bitrateBps: r, viewerCount: n, duration: o, style: i }) {
  const c = e === "playing" ? "LIVE" : e.toUpperCase();
  return /* @__PURE__ */ a("div", { className: m("inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono"), style: i, children: [
    /* @__PURE__ */ a("span", { className: m("flex items-center gap-1"), children: [
      /* @__PURE__ */ t("span", { className: m("w-[7px] h-[7px] rounded-full", we[e] ?? "bg-slate-400") }),
      /* @__PURE__ */ t("span", { className: m("font-semibold", ye[e] ?? "text-slate-400"), children: c })
    ] }),
    r !== void 0 && /* @__PURE__ */ t("span", { children: ve(r) }),
    o !== void 0 && /* @__PURE__ */ t("span", { children: be(o) }),
    n !== void 0 && /* @__PURE__ */ a("span", { className: m("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ t("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ t("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function ot({ count: e, style: r }) {
  const n = e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : `${e}`;
  return /* @__PURE__ */ a("div", { className: m("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium"), style: r, children: [
    /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
      /* @__PURE__ */ t("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
      /* @__PURE__ */ t("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ a("span", { children: [
      n,
      " watching"
    ] })
  ] });
}
function ke(e) {
  return e.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function Ne(e) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r = e.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function U({ participant: e, size: r = 32 }) {
  const n = Ne(e.displayName);
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "call-avatar",
      "data-speaking": e.isSpeaking ? "true" : void 0,
      "data-muted": e.isMuted ? "true" : void 0,
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
      style: {
        width: r,
        height: r,
        fontSize: r * 0.38,
        background: e.avatarUrl ? void 0 : `hsl(${n}, 55%, 45%)`
      },
      children: [
        e.avatarUrl ? /* @__PURE__ */ t(
          "img",
          {
            src: e.avatarUrl,
            alt: "",
            className: "w-full h-full rounded-full object-cover"
          }
        ) : ke(e.displayName),
        e.isSpeaking && /* @__PURE__ */ t(
          "span",
          {
            "data-testid": "call-avatar-speaking",
            className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#1e293b]"
          }
        ),
        e.isMuted && /* @__PURE__ */ t(
          "span",
          {
            "data-testid": "call-avatar-muted",
            "aria-label": "Microphone muted",
            className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            children: /* @__PURE__ */ a(
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
                  /* @__PURE__ */ t("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
                  /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
                  /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Ce({
  participants: e,
  localFallback: r,
  maxVisible: n = 4,
  avatarSize: o = 36,
  testId: i = "call-participant-strip",
  className: c,
  style: l
}) {
  const s = e.slice(0, n), d = Math.max(0, e.length - n), h = e.length === 0 && !!r;
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": i,
      "data-count": e.length,
      className: m(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        c
      ),
      style: l,
      children: [
        s.map((p) => /* @__PURE__ */ t(U, { participant: p, size: o }, p.id)),
        d > 0 && /* @__PURE__ */ a(
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
        h && r && /* @__PURE__ */ t(U, { participant: r, size: o + 4 })
      ]
    }
  );
}
const V = {
  mic: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
    /* @__PURE__ */ t("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  micOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ t("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
    /* @__PURE__ */ t("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
    /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
    /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }),
  camera: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }),
    /* @__PURE__ */ t("circle", { cx: "12", cy: "13", r: "3" })
  ] }),
  cameraOff: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ t("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
    /* @__PURE__ */ t("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
    /* @__PURE__ */ t("path", { d: "M15 13a3 3 0 1 0-6 0" })
  ] }),
  screenShare: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ t("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ t("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ t("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
  ] }),
  phoneEnd: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  userPlus: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ t("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ t("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] }),
  videoUpgrade: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polygon", { points: "23 7 16 12 23 17 23 7" }),
    /* @__PURE__ */ t("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })
  ] })
};
function O({
  icon: e,
  label: r,
  active: n = !1,
  danger: o = !1,
  onClick: i,
  disabled: c = !1,
  testId: l
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      title: r,
      "aria-label": r,
      disabled: c,
      onClick: i,
      "data-testid": l,
      className: m(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-red-500 text-white hover:bg-red-600",
        n && !o && "bg-white/20 text-white",
        !n && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: e
    }
  );
}
function Le({
  mode: e,
  isMuted: r = !1,
  isCameraOn: n = !0,
  isScreenSharing: o = !1,
  onToggleMute: i,
  onToggleCamera: c,
  onToggleScreenShare: l,
  onUpgradeToVideo: s,
  onEndCall: d,
  onAddParticipant: h,
  availableParticipants: p,
  currentParticipantIds: g,
  className: u
}) {
  const [f, x] = L(!1), b = new Set(g ?? []), y = (p ?? []).filter((k) => !b.has(k.id));
  return /* @__PURE__ */ a("div", { className: m("flex flex-col", u), children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ t(
            O,
            {
              icon: r ? V.micOff : V.mic,
              label: r ? "Unmute" : "Mute",
              active: r,
              onClick: i,
              testId: "mute-button"
            }
          ),
          e === "video" && /* @__PURE__ */ t(
            O,
            {
              icon: n ? V.camera : V.cameraOff,
              label: n ? "Turn off camera" : "Turn on camera",
              active: !n,
              onClick: c,
              testId: "camera-button"
            }
          ),
          e === "audio" && s && /* @__PURE__ */ t(
            O,
            {
              icon: V.videoUpgrade,
              label: "Switch to video",
              onClick: s,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ t(
            O,
            {
              icon: V.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          h && /* @__PURE__ */ t(
            O,
            {
              icon: V.userPlus,
              label: "Add participant",
              active: f,
              onClick: () => x((k) => !k),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ t(
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
    f && h && /* @__PURE__ */ a(
      "div",
      {
        className: "border-t border-white/5 bg-[#0f172a]/80",
        "data-testid": "add-participant-picker",
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide", children: "Add to call" }),
            /* @__PURE__ */ t(
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
          y.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ t("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: y.map((k) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                h(k.id), y.length <= 1 && x(!1);
              },
              children: [
                /* @__PURE__ */ t(U, { participant: k, size: 22 }),
                /* @__PURE__ */ t("span", { className: "text-xs text-white/80", children: k.displayName }),
                /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-indigo-400", children: "+ Add" })
              ]
            },
            k.id
          )) })
        ]
      }
    )
  ] });
}
function Me(e) {
  return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
const Se = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function je(e) {
  return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function q({
  stats: e,
  position: r = "top-left",
  testId: n = "call-stats-overlay",
  className: o,
  style: i
}) {
  return Me(e) ? /* @__PURE__ */ a(
    "div",
    {
      "data-testid": n,
      className: m(
        "absolute z-10 pointer-events-none",
        Se[r],
        "flex flex-col gap-1.5",
        o
      ),
      style: i,
      children: [
        e.networkQuality && /* @__PURE__ */ t(xe, { quality: e.networkQuality }),
        (e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0) && /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              e.bitrateKbps !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                je(e.bitrateKbps)
              ] }),
              e.latencyMs !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-latency", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "latency" }),
                Math.round(e.latencyMs),
                " ms"
              ] }),
              e.packetLossPct !== void 0 && /* @__PURE__ */ a("span", { "data-testid": "call-stats-packet-loss", children: [
                /* @__PURE__ */ t("span", { className: "text-white/50 mr-1.5", children: "loss" }),
                e.packetLossPct.toFixed(1),
                "%"
              ] })
            ]
          }
        )
      ]
    }
  ) : null;
}
function ne(e) {
  const r = Math.floor(e / 60), n = e % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function J({
  stream: e,
  muted: r = !1,
  className: n
}) {
  const o = T(null);
  return $(() => {
    const i = o.current;
    i && i.srcObject !== e && (i.srcObject = e);
  }, [e]), /* @__PURE__ */ t(
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
const X = {
  phoneEnd: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
    /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] }),
  phoneAnswer: /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }),
  minimize: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polyline", { points: "4 14 10 14 10 20" }),
    /* @__PURE__ */ t("polyline", { points: "20 10 14 10 14 4" }),
    /* @__PURE__ */ t("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
    /* @__PURE__ */ t("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
  ] }),
  snapBack: /* @__PURE__ */ a("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t("polyline", { points: "1 4 1 10 7 10" }),
    /* @__PURE__ */ t("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
  ] })
};
function Ee({
  callerName: e,
  onAnswer: r,
  onDecline: n
}) {
  return /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-4 py-5 px-4", "data-testid": "call-ringing-view", children: [
    /* @__PURE__ */ t("div", { className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: /* @__PURE__ */ t("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" }) }) }),
    /* @__PURE__ */ a("div", { className: "text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-white font-semibold text-sm m-0", children: e || "Incoming call" }),
      /* @__PURE__ */ t("p", { className: "text-white/50 text-xs m-0 mt-1", children: "is calling..." })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: n,
          className: "w-11 h-11 rounded-full bg-red-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors",
          "aria-label": "Decline call",
          children: X.phoneEnd
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-green-500 text-white border-none cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors",
          "aria-label": "Answer call",
          children: X.phoneAnswer
        }
      )
    ] })
  ] });
}
function Be({
  mode: e,
  participants: r,
  localParticipant: n,
  duration: o,
  isMuted: i,
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: s,
  onToggleCamera: d,
  onToggleScreenShare: h,
  onUpgradeToVideo: p,
  onAddParticipant: g,
  availableParticipants: u,
  onEndCall: f,
  layoutComponent: x,
  callStats: b
}) {
  const y = e === "video" && c;
  return /* @__PURE__ */ a("div", { className: "flex flex-col", children: [
    e === "video" && x && /* @__PURE__ */ a("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ t(q, { stats: b, position: "bottom-left" })
    ] }),
    e === "video" && !x && /* @__PURE__ */ a("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && y ? /* @__PURE__ */ t(J, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ t("div", { className: "w-full h-full flex items-center justify-center bg-[#1e293b]", children: n && /* @__PURE__ */ t(U, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ a("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-[#1e293b]", children: [
        r[0].videoStream ? /* @__PURE__ */ t(J, { stream: r[0].videoStream }) : /* @__PURE__ */ t("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ t(U, { participant: r[0], size: 28 }) }),
        r[0].isMuted && /* @__PURE__ */ t(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ a("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ t("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ t("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ t(q, { stats: b, position: "bottom-left" })
    ] }),
    e === "audio" && /* @__PURE__ */ t(
      Ce,
      {
        participants: r,
        localFallback: n,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ a("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ t("span", { className: "text-white/60 text-xs font-mono", children: ne(o) }),
      /* @__PURE__ */ a("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ t(
      Le,
      {
        mode: e,
        isMuted: i,
        isCameraOn: c,
        isScreenSharing: l,
        onToggleMute: s,
        onToggleCamera: d,
        onToggleScreenShare: h,
        onUpgradeToVideo: p,
        onEndCall: f,
        onAddParticipant: g,
        availableParticipants: u,
        currentParticipantIds: r.map((k) => k.id)
      }
    )
  ] });
}
function $e({
  state: e,
  mode: r,
  duration: n,
  isMuted: o,
  callerName: i,
  onToggleMute: c,
  onEndCall: l,
  onExpand: s
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: s,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (d) => d.key === "Enter" && s?.(),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: m(
              "w-2 h-2 rounded-full shrink-0",
              e === "active" ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"
            )
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: e === "ringing" ? /* @__PURE__ */ t("span", { className: "text-white text-xs font-medium truncate", children: i || "Incoming call" }) : /* @__PURE__ */ a("span", { className: "text-white text-xs font-medium", children: [
          r === "video" ? "Video" : "Audio",
          " call",
          n !== void 0 && /* @__PURE__ */ t("span", { className: "text-white/50 ml-1.5 font-mono", children: ne(n) })
        ] }) }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1", onClick: (d) => d.stopPropagation(), children: [
          e === "active" && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: c,
              className: m(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ t("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ a(Z, { children: [
                /* @__PURE__ */ t("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ t("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ t("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ t("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ a(Z, { children: [
                /* @__PURE__ */ t("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
                /* @__PURE__ */ t("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
              ] }) })
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: l,
              className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors",
              "aria-label": "End call",
              children: /* @__PURE__ */ a("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ t("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }),
                /* @__PURE__ */ t("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function Pe(e) {
  const [r, n] = L({ x: 0, y: 0 }), [o, i] = L(!1), [c, l] = L(!1), s = T(!1), d = T({ x: 0, y: 0 }), h = T({ x: 0, y: 0 }), p = T(null), g = _(
    (y) => {
      e && (s.current = !0, i(!0), l(!1), d.current = { x: y.clientX, y: y.clientY }, h.current = { ...r }, y.preventDefault());
    },
    [e, r]
  ), u = _(() => {
    l(!0), n({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), f = _(
    (y) => {
      const k = p.current;
      if (!k) return;
      const v = k.offsetParent, N = 16;
      let B = window.innerWidth, E = window.innerHeight;
      v && (B = v.clientWidth, E = v.clientHeight);
      const M = k.getBoundingClientRect(), P = v ? v.getBoundingClientRect() : { left: 0, top: 0 };
      let S, A;
      switch (y) {
        case "top-left":
          S = N, A = N;
          break;
        case "top-right":
          S = B - M.width - N, A = N;
          break;
        case "bottom-left":
          S = N, A = E - M.height - N;
          break;
        default:
          S = B - M.width - N, A = E - M.height - N;
          break;
      }
      const I = M.left - P.left - r.x, R = M.top - P.top - r.y;
      l(!0), n({ x: S - I, y: A - R }), setTimeout(() => l(!1), 200);
    },
    [r]
  ), x = T(f);
  x.current = f, $(() => {
    if (!e) return;
    const y = (v) => {
      s.current && n({
        x: h.current.x + (v.clientX - d.current.x),
        y: h.current.y + (v.clientY - d.current.y)
      });
    }, k = () => {
      if (!s.current) return;
      s.current = !1, i(!1);
      const v = p.current;
      if (!v) return;
      const N = v.offsetParent, B = 80;
      let E = window.innerWidth, M = window.innerHeight;
      if (N) {
        const j = N.getBoundingClientRect();
        E = j.width, M = j.height;
      }
      const P = v.getBoundingClientRect(), S = N ? N.getBoundingClientRect() : { left: 0, top: 0 }, A = P.left - S.left, I = P.top - S.top, R = E - (A + P.width), F = M - (I + P.height), D = A < B, H = R < B, w = I < B, C = F < B;
      w && D ? x.current("top-left") : w && H ? x.current("top-right") : C && D ? x.current("bottom-left") : C && H && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", y), document.addEventListener("mouseup", k), () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", k);
    };
  }, [e]);
  const b = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: g, resetOffset: u, snapToCorner: f, isDragging: o, isAnimating: c, hasMoved: b, widgetRef: p };
}
function Ae({
  onSnap: e,
  contained: r
}) {
  const n = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ t("div", { className: m(r ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: n.map(({ id: o, classes: i }) => /* @__PURE__ */ t(
    "div",
    {
      className: `absolute ${i} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110`,
      onClick: () => e(o),
      title: `Snap to ${o.replace("-", " ")}`,
      children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ t("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    o
  )) });
}
function at({
  state: e,
  mode: r,
  participants: n,
  localParticipant: o,
  callerName: i,
  duration: c,
  isMuted: l = !1,
  isCameraOn: s = !0,
  isScreenSharing: d = !1,
  onAnswer: h,
  onDecline: p,
  onEndCall: g,
  onToggleMute: u,
  onToggleCamera: f,
  onToggleScreenShare: x,
  onUpgradeToVideo: b,
  onAddParticipant: y,
  availableParticipants: k,
  onMinimize: v,
  layoutComponent: N,
  callStats: B,
  minimized: E = !1,
  position: M = "bottom-right",
  contained: P = !1,
  draggable: S = !0,
  className: A,
  style: I,
  dataAttrs: R
}) {
  const { offset: F, handleMouseDown: D, resetOffset: H, snapToCorner: w, isDragging: C, isAnimating: j, hasMoved: W, widgetRef: Q } = Pe(S), z = {};
  if (R)
    for (const [ae, K] of Object.entries(R))
      K != null && K !== "" && (z[ae] = K);
  const oe = G(() => {
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
  return e === "idle" || e === "ended" ? null : /* @__PURE__ */ a(Z, { children: [
    C && /* @__PURE__ */ t(Ae, { onSnap: w, contained: P }),
    /* @__PURE__ */ t(
      "div",
      {
        ref: Q,
        "data-testid": "call-widget",
        "data-call-state": e,
        className: m(
          P ? "absolute z-50" : "fixed z-[9999]",
          oe,
          A
        ),
        style: {
          transform: `translate(${F.x}px, ${F.y}px)`,
          transition: j ? "transform 0.2s ease-out" : void 0,
          ...I
        },
        ...z,
        children: /* @__PURE__ */ a(
          "div",
          {
            className: m(
              "bg-[#1e293b] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              E ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !E && /* @__PURE__ */ a(
                "div",
                {
                  className: m(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    S && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: D,
                  children: [
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ t("span", { className: "w-2 h-2 rounded-full bg-green-400" }),
                      /* @__PURE__ */ t("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                      W && /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: H,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: X.snapBack
                        }
                      ),
                      v && /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: v,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: X.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              E && /* @__PURE__ */ t(
                "div",
                {
                  className: m(S && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: D,
                  children: /* @__PURE__ */ t(
                    $e,
                    {
                      state: e,
                      mode: r,
                      duration: c,
                      isMuted: l,
                      callerName: i,
                      onToggleMute: u,
                      onEndCall: g,
                      onExpand: v
                    }
                  )
                }
              ),
              !E && /* @__PURE__ */ a(Z, { children: [
                e === "ringing" && /* @__PURE__ */ t(
                  Ee,
                  {
                    callerName: i,
                    onAnswer: h,
                    onDecline: p
                  }
                ),
                e === "connecting" && /* @__PURE__ */ a(
                  "div",
                  {
                    className: "flex flex-col items-center gap-3 py-6 px-4",
                    "data-testid": "call-connecting-view",
                    children: [
                      /* @__PURE__ */ t("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }),
                      /* @__PURE__ */ t("span", { className: "text-white/60 text-xs", children: "Connecting..." })
                    ]
                  }
                ),
                e === "active" && /* @__PURE__ */ t(
                  Be,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: o,
                    duration: c,
                    isMuted: l,
                    isCameraOn: s,
                    isScreenSharing: d,
                    onToggleMute: u,
                    onToggleCamera: f,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: b,
                    onAddParticipant: y,
                    availableParticipants: k,
                    onEndCall: g,
                    layoutComponent: N,
                    callStats: B
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
function lt({
  callerName: e,
  callerAvatarUrl: r,
  context: n,
  mode: o = "started",
  onJoin: i,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: s,
  style: d
}) {
  const [h, p] = L(!0);
  return $(() => {
    if (!l || l <= 0) return;
    const g = setTimeout(() => {
      p(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(g);
  }, [l, c]), h ? /* @__PURE__ */ a(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": e,
      className: m(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-[#1e293b] text-white border border-white/10",
        s
      ),
      style: d,
      children: [
        /* @__PURE__ */ t(Te, { name: e, avatarUrl: r }),
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${e} is calling you` : `${e} started a call` }),
          n && /* @__PURE__ */ t("p", { className: "text-xs text-white/60 m-0 truncate", children: n })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          c && /* @__PURE__ */ t(
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
          i && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => {
                p(!1), i();
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
function Te({ name: e, avatarUrl: r }) {
  const n = Re(e);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ t("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : Ie(e),
        /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1e293b] animate-pulse" })
      ]
    }
  );
}
function Ie(e) {
  return e.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function Re(e) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r = e.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function ee(e) {
  if (!isFinite(e) || e < 0) return "0:00";
  const r = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), o = Math.floor(e % 60), i = r > 0 ? String(n).padStart(2, "0") : String(n), c = String(o).padStart(2, "0");
  return r > 0 ? `${r}:${i}:${c}` : `${i}:${c}`;
}
function st({
  playlistUrl: e,
  poster: r,
  autoPlay: n = !1,
  muted: o = !1,
  onLoadedMetadata: i,
  onTimeUpdate: c,
  onError: l,
  hideDownload: s = !1,
  className: d
}) {
  const h = T(null), p = T(null), [g, u] = L(!1), [f, x] = L(0), [b, y] = L(0), [k, v] = L(1), [N, B] = L(1), [E, M] = L(!1), [P, S] = L(null);
  $(() => {
    const w = h.current;
    if (!w || !e) return;
    if (S(null), M(!0), w.canPlayType("application/vnd.apple.mpegurl"))
      return w.src = e, () => {
        w.removeAttribute("src"), w.load();
      };
    let C = !1;
    return (async () => {
      try {
        const j = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (C) return;
        if (!j.isSupported()) {
          S("HLS playback is not supported in this browser."), M(!1);
          return;
        }
        const W = new j({ enableWorker: !0 });
        p.current = W, W.attachMedia(w), W.on(j.Events.MEDIA_ATTACHED, () => W.loadSource(e)), W.on(j.Events.ERROR, (Q, z) => {
          z.fatal && (S(`HLS error: ${z.type}`), l?.(new Error(`HLS fatal: ${z.type}`)));
        });
      } catch (j) {
        if (C) return;
        S(`Failed to load hls.js — install it in the consumer app: ${j?.message ?? j}`);
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
  }, [e, l]);
  const A = () => {
    const w = h.current;
    w && (w.paused ? w.play().catch(() => {
    }) : w.pause());
  }, I = (w) => {
    const C = h.current;
    !C || !isFinite(b) || b <= 0 || (C.currentTime = Number(w.target.value));
  }, R = (w) => {
    const C = h.current;
    if (!C) return;
    const j = Number(w.target.value);
    C.volume = j, v(j);
  }, F = (w) => {
    const C = h.current;
    if (!C) return;
    const j = Number(w.target.value);
    C.playbackRate = j, B(j);
  }, D = () => {
    const w = h.current;
    w && (document.fullscreenElement ? document.exitFullscreen() : w.requestFullscreen?.());
  }, H = G(
    () => b > 0 ? Math.min(100, f / b * 100) : 0,
    [f, b]
  );
  return /* @__PURE__ */ a("div", { className: m("relative bg-[#0f0f0f] rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ t(
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
        onLoadedMetadata: (w) => {
          const C = w.currentTarget;
          y(C.duration), M(!1), i?.(C.duration);
        },
        onTimeUpdate: (w) => {
          const C = w.currentTarget;
          x(C.currentTime), c?.(C.currentTime, C.duration);
        },
        onWaiting: () => M(!0),
        onCanPlay: () => M(!1),
        onError: () => {
          S("Playback error."), l?.(new Error("video element error")), M(!1);
        }
      }
    ),
    E && !P && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    P && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: P }),
    /* @__PURE__ */ a("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ t("span", { className: "text-white text-xs tabular-nums w-12", children: ee(f) }),
        /* @__PURE__ */ t(
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
        /* @__PURE__ */ t("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: ee(b) })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: A,
            className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": g ? "Pause" : "Play",
            children: g ? /* @__PURE__ */ a("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: [
              /* @__PURE__ */ t("rect", { x: "2", y: "1", width: "3", height: "12" }),
              /* @__PURE__ */ t("rect", { x: "9", y: "1", width: "3", height: "12" })
            ] }) : /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ t("polygon", { points: "2,1 12,7 2,13" }) })
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "text-xs opacity-70", children: "Vol" }),
          /* @__PURE__ */ t(
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
        /* @__PURE__ */ a(
          "select",
          {
            value: N,
            onChange: F,
            className: "bg-white/10 hover:bg-white/20 text-white text-xs rounded px-2 py-1 border-0 outline-none",
            "aria-label": "Playback speed",
            children: [
              /* @__PURE__ */ t("option", { value: 0.5, children: "0.5×" }),
              /* @__PURE__ */ t("option", { value: 1, children: "1×" }),
              /* @__PURE__ */ t("option", { value: 1.5, children: "1.5×" }),
              /* @__PURE__ */ t("option", { value: 2, children: "2×" })
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        !s && e && /* @__PURE__ */ t(
          "a",
          {
            href: e,
            download: !0,
            className: "text-white/80 hover:text-white text-xs underline",
            "aria-label": "Download",
            children: "Download"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: D,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ t("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function Ve(e) {
  if (!isFinite(e) || e < 0) return "—";
  const r = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), o = Math.floor(e % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
function te(e) {
  if (!e) return "—";
  try {
    const r = new Date(e);
    return new Intl.DateTimeFormat(void 0, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(r);
  } catch {
    return e;
  }
}
function De({ status: e }) {
  return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "processing",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
      children: [
        /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }),
        "Processing"
      ]
    }
  ) : /* @__PURE__ */ t(
    "span",
    {
      "data-testid": "recording-row-status",
      "data-status": "failed",
      className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
      children: "Failed"
    }
  );
}
function We({
  id: e,
  startIso: r,
  durationSec: n,
  participantCount: o,
  thumbnailUrl: i,
  label: c,
  status: l = "ready",
  selected: s,
  onClick: d,
  actions: h,
  className: p
}) {
  const g = typeof d == "function";
  return /* @__PURE__ */ a(
    "div",
    {
      ...g ? {
        role: "button",
        tabIndex: 0,
        onClick: () => d(e),
        onKeyDown: (f) => {
          g && (f.key === "Enter" || f.key === " ") && (f.preventDefault(), d(e));
        },
        "aria-pressed": s ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": e,
      "data-status": l,
      className: m(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        g && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        s ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        p
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "relative aspect-video rounded bg-black overflow-hidden mb-2", children: [
          i ? /* @__PURE__ */ t(
            "img",
            {
              src: i,
              alt: "",
              className: "w-full h-full object-cover",
              loading: "lazy",
              onError: (f) => {
                f.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ t("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ t("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ t(De, { status: l }),
          /* @__PURE__ */ t("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: Ve(n) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? te(r) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ a("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ t("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: te(r) }),
        h && /* @__PURE__ */ t(
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
function ct({
  recordings: e,
  selectedId: r,
  onSelect: n,
  loading: o,
  emptyState: i,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ t("div", { className: m("flex flex-col gap-2", l), children: [0, 1, 2].map((s) => /* @__PURE__ */ a(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ t("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ t("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    s
  )) }) : e.length === 0 ? /* @__PURE__ */ t("div", { className: m("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: i ?? "No recordings yet." }) : /* @__PURE__ */ t("div", { className: m("flex flex-col gap-2", l), children: e.map((s) => /* @__PURE__ */ t(
    We,
    {
      id: s.id,
      startIso: s.startIso,
      endIso: s.endIso,
      durationSec: s.durationSec,
      participantCount: s.participantCount,
      thumbnailUrl: s.thumbnailUrl,
      label: s.label,
      status: s.status,
      selected: s.id === r,
      onClick: n,
      actions: c?.(s)
    },
    s.id
  )) });
}
function dt({
  getVideoElement: e,
  className: r,
  title: n
}) {
  const [o, i] = L(!1), [c, l] = L(!1);
  $(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), $(() => {
    const h = () => i(!1), p = () => i(!0);
    return document.addEventListener("leavepictureinpicture", h), document.addEventListener("enterpictureinpicture", p), () => {
      document.removeEventListener("leavepictureinpicture", h), document.removeEventListener("enterpictureinpicture", p);
    };
  }, []);
  const s = _(async () => {
    if (c)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), i(!1);
          return;
        }
        const h = e();
        if (!h) return;
        h.disablePictureInPicture = !1, await h.requestPictureInPicture(), i(!0);
      } catch {
      }
  }, [c, e]), d = !c;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: s,
      disabled: d,
      title: n ?? (d ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: m(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ t("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function Fe(e) {
  if (!e) return "?";
  const r = e.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function ut({
  participants: e,
  activeSpeakerId: r,
  onParticipantClick: n,
  count: o,
  title: i = "Participants",
  footer: c,
  className: l
}) {
  const s = o ?? e.length;
  return /* @__PURE__ */ a(
    "aside",
    {
      className: m(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ a("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: i }),
          /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: s })
        ] }),
        /* @__PURE__ */ t("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: e.map((d) => {
          const h = d.id === r;
          return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ a(
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
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: m(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      h && "ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      d.avatarUrl ? /* @__PURE__ */ t("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ t("span", { children: Fe(d.displayName) }),
                      d.isScreenSharing && /* @__PURE__ */ t(
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
                  d.displayName,
                  d.isLocal && /* @__PURE__ */ t("span", { className: "ml-1 text-xs text-[var(--color-text-secondary)]", children: "(you)" })
                ] }),
                d.handRaised && /* @__PURE__ */ t("span", { title: "Hand raised", "aria-label": "Hand raised", children: "✋" }),
                d.isMuted && /* @__PURE__ */ t(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 16 16",
                    className: "text-[var(--color-text-secondary)]",
                    "aria-label": "Muted",
                    children: /* @__PURE__ */ t(
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
        c && /* @__PURE__ */ t("div", { className: "border-t border-[var(--color-border)] p-3", children: c })
      ]
    }
  );
}
let Y = null;
function He() {
  if (Y) return Y;
  try {
    return Y = new AudioContext(), Y;
  } catch {
    return null;
  }
}
function ht({
  localStream: e,
  isMuted: r,
  threshold: n = -45,
  triggerMs: o = 1500,
  cooldownMs: i = 6e3
}) {
  const [c, l] = L(!1);
  return $(() => {
    if (!r || !e || e.getAudioTracks().filter((y) => y.readyState === "live").length === 0) return;
    const d = He();
    if (!d) return;
    let h, p;
    try {
      h = d.createMediaStreamSource(e), p = d.createAnalyser(), p.fftSize = 512, p.smoothingTimeConstant = 0.6, h.connect(p);
    } catch {
      return;
    }
    let g = null, u = 0, f = !1;
    const x = new Float32Array(p.frequencyBinCount), b = setInterval(() => {
      if (f) return;
      p.getFloatTimeDomainData(x);
      let y = 0;
      for (let N = 0; N < x.length; N++) y += x[N] * x[N];
      const k = 20 * Math.log10(Math.sqrt(y / x.length)), v = Date.now();
      k > n ? (g == null && (g = v), v - g >= o && v - u > i && (l(!0), u = v, setTimeout(() => {
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
  }, [e, r, n, o, i]), $(() => {
    r || l(!1);
  }, [r]), c;
}
function ze(e, r) {
  const [n, o] = L(0);
  return $(() => {
    if (!e) return;
    const i = (u, f) => {
      console.info("[useTrackStateBump] remote track", u, {
        participant: r,
        kind: f.kind,
        enabled: f.enabled,
        muted: f.muted,
        readyState: f.readyState,
        id: f.id
      }), o((x) => x + 1);
    }, c = (u) => i("mute", u.target), l = (u) => i("unmute", u.target), s = (u) => i("ended", u.target), d = /* @__PURE__ */ new WeakSet(), h = (u) => {
      d.has(u) || (d.add(u), u.addEventListener("mute", c), u.addEventListener("unmute", l), u.addEventListener("ended", s));
    };
    for (const u of e.getVideoTracks()) h(u);
    const p = (u) => {
      const f = u.track;
      f && f.kind === "video" && h(f), o((x) => x + 1);
    }, g = () => o((u) => u + 1);
    return e.addEventListener("addtrack", p), e.addEventListener("removetrack", g), () => {
      for (const u of e.getVideoTracks())
        u.removeEventListener("mute", c), u.removeEventListener("unmute", l), u.removeEventListener("ended", s);
      e.removeEventListener("addtrack", p), e.removeEventListener("removetrack", g);
    };
  }, [e, r]), n;
}
function Oe(e) {
  if (!e) return !1;
  const r = e.getVideoTracks();
  return r.length === 0 ? !1 : r.some((n) => n.readyState === "live" && n.enabled && !n.muted);
}
function ie({
  stream: e,
  muted: r = !1,
  videoRef: n,
  className: o = "h-full w-full object-cover",
  onPlayStateChange: i
}) {
  const c = T(null), l = T(i);
  return l.current = i, $(() => {
    const s = c.current;
    if (!s) return;
    s.srcObject !== e && (s.srcObject = e), n && (n.current = s);
    const d = (f) => {
      l.current?.(f);
    }, h = () => d("playing"), p = () => d("ended"), g = () => {
      s.ended && d("ended");
    };
    s.addEventListener("play", h), s.addEventListener("ended", p), s.addEventListener("pause", g);
    const u = s.play();
    return u && typeof u.catch == "function" && u.catch((f) => {
      f?.name === "NotAllowedError" && d("paused-by-autoplay");
    }), () => {
      s.removeEventListener("play", h), s.removeEventListener("ended", p), s.removeEventListener("pause", g), n && n.current === s && (n.current = null);
    };
  }, [e, n]), /* @__PURE__ */ t(
    "video",
    {
      ref: c,
      autoPlay: !0,
      playsInline: !0,
      muted: r,
      className: o
    }
  );
}
const _e = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Ue() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((r) => {
    if (r.paused) {
      const n = r.play();
      n && typeof n.catch == "function" && n.catch(() => {
      });
    }
  });
}
function ft({
  chipLabel: e = "Tap to unmute",
  chipClassName: r,
  wrapperClassName: n,
  onPlayStateChange: o,
  ...i
}) {
  const [c, l] = L(!1), s = T(null), h = i.videoRef ?? s, p = _(
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
    Ue(), l(!1);
  }, [h]);
  return /* @__PURE__ */ a("div", { className: m("relative h-full w-full", n), children: [
    /* @__PURE__ */ t(
      ie,
      {
        ...i,
        videoRef: h,
        onPlayStateChange: p
      }
    ),
    c && /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: g,
        className: m(_e, r),
        "data-testid": "autoplay-gate-chip",
        children: e
      }
    ) })
  ] });
}
function mt({
  stream: e,
  displayName: r,
  cameraOn: n,
  avatarSize: o = 96
}) {
  ze(e, r);
  const i = Oe(e);
  return !n || !i || !e ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]", children: /* @__PURE__ */ t(se, { name: r, size: o }) }) : /* @__PURE__ */ t(ie, { stream: e });
}
function pt({ show: e, label: r }) {
  return e ? /* @__PURE__ */ a(
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
function xt({ show: e, label: r = "Reconnecting…" }) {
  return e ? /* @__PURE__ */ t(
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
function gt({
  show: e,
  label: r = "You're muted — tap mic to unmute"
}) {
  return e ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "mute-while-talking-toast",
      className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-500/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
      role: "alert",
      children: r
    }
  ) : null;
}
const re = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function Ke(e) {
  let r = 0;
  for (let n = 0; n < e.length; n++) r = r * 31 + e.charCodeAt(n) | 0;
  return re[Math.abs(r) % re.length];
}
function vt({
  lines: e,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: o
}) {
  const i = Date.now(), c = e.slice(-r).map((l) => {
    const s = i - new Date(l.at).getTime(), d = Math.max(0.35, 1 - s / n);
    return { ...l, opacity: d };
  }).filter((l) => l.opacity > 0);
  return c.length === 0 ? null : /* @__PURE__ */ t(
    "div",
    {
      className: m(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: c.map((l) => /* @__PURE__ */ a(
        "div",
        {
          className: m(
            "flex items-baseline gap-2 text-sm transition-opacity",
            l.interim && "italic"
          ),
          style: { opacity: l.opacity },
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: Ke(l.speakerId) },
                children: l.speakerName ?? l.speakerId.slice(0, 6)
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-white", children: l.text })
          ]
        },
        l.id
      ))
    }
  );
}
export {
  ft as A,
  Le as C,
  gt as M,
  xe as N,
  dt as P,
  rt as R,
  et as S,
  vt as T,
  tt as V,
  Ce as a,
  lt as b,
  q as c,
  at as d,
  pt as e,
  nt as f,
  xt as g,
  ct as h,
  st as i,
  We as j,
  mt as k,
  ut as l,
  it as m,
  ie as n,
  qe as o,
  Je as p,
  ot as q,
  ze as r,
  Oe as s,
  ht as u
};
