import { jsxs as i, jsx as e, Fragment as ne } from "react/jsx-runtime";
import { useRef as $, useState as I, useEffect as B, useMemo as G, useCallback as H, useImperativeHandle as Pe, useLayoutEffect as Ee } from "react";
import { c as h } from "./cn-B6yFEsav.js";
import { P as Ie, S as Te } from "./ReconnectingBanner-D8cBoHPp.js";
import { S as Ae } from "./Select-DAEcKWg2.js";
import { B as ce } from "./Button-DILgRebO.js";
import { A as we } from "./Avatar-B7O2g50s.js";
import { C as re } from "./Chip-BDT8ro4h.js";
import { S as ye, P as Be } from "./PermissionDeniedCard-0XYb6Eju.js";
const $e = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function qt({
  src: t,
  stream: r,
  autoPlay: n = !1,
  muted: o = !0,
  loop: a = !1,
  controls: c = !1,
  poster: l,
  phase: u,
  className: d,
  style: m,
  onPhaseChange: p,
  onTimeUpdate: g
}) {
  const b = $(null), [s, x] = I("idle"), w = u ?? s;
  B(() => {
    const N = b.current;
    if (!N) return;
    const C = [
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
        g?.(N.currentTime, N.duration);
      }]
    ];
    return C.forEach(([j, L]) => N.addEventListener(j, L)), () => C.forEach(([j, L]) => N.removeEventListener(j, L));
  }, [p, g]), B(() => {
    const N = b.current;
    N && r !== void 0 && (N.srcObject = r);
  }, [r]);
  const k = w !== "playing", v = $e[w];
  return /* @__PURE__ */ i(
    "div",
    {
      className: h("relative bg-black rounded-lg overflow-hidden aspect-video", d),
      style: m,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: b,
            src: r ? void 0 : t,
            autoPlay: n,
            muted: o,
            loop: a,
            controls: c,
            poster: l,
            playsInline: !0,
            className: h("w-full h-full object-contain block")
          }
        ),
        k && v && /* @__PURE__ */ i("div", { className: h("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          w === "buffering" && /* @__PURE__ */ e(He, {}),
          /* @__PURE__ */ e("span", { className: h(w === "buffering" ? "ml-2" : ""), children: v })
        ] })
      ]
    }
  );
}
function He() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: h("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function Re(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function Zt({
  onClose: t,
  sources: r,
  title: n,
  subtitle: o,
  autoPlay: a = !0,
  muted: c = !1,
  hideDownload: l = !1,
  header: u,
  footer: d,
  className: m
}) {
  const p = G(() => r.filter((x) => !!x.url), [r]), [g, b] = I(0), s = p[g];
  return B(() => {
    const x = (w) => {
      w.key === "Escape" && t();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [t]), /* @__PURE__ */ e(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": n || "Video player",
      onClick: t,
      className: h(
        "fixed inset-0 z-50 grid place-items-center p-4",
        "bg-black/80 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          onClick: (x) => x.stopPropagation(),
          className: h(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            m
          ),
          children: [
            (n || o || u) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                n && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: n }),
                o && /* @__PURE__ */ e("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
                u,
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: t,
                    "aria-label": "Close",
                    className: h(
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
            p.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: h(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: p.map((x, w) => {
                  const k = w === g;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => b(w),
                      className: h(
                        "px-2.5 py-1 rounded transition-colors",
                        k ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": k ? "true" : void 0,
                      title: x.sizeBytes != null ? Re(x.sizeBytes) : void 0,
                      children: x.label || `Segment ${w + 1}`
                    },
                    `${w}:${x.url}`
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
function De(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function Qt({ metrics: t, style: r }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: h("p-3 bg-surface-inverse rounded-lg text-text-tertiary text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", De(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && n.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: h("p-3 bg-surface-inverse rounded-lg text-xs text-code-text"), style: r, children: n.map(([o, a]) => /* @__PURE__ */ i("div", { className: h("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: h("text-text-tertiary"), children: o }),
    /* @__PURE__ */ e("span", { className: h("font-mono"), children: a })
  ] }, o)) });
}
const Fe = {
  good: "var(--color-success)",
  medium: "var(--color-warning)",
  poor: "var(--color-caution)",
  dead: "var(--color-danger)"
}, ze = {
  good: "text-success-fg",
  medium: "text-warning-fg",
  poor: "text-caution-fg",
  dead: "text-danger-fg"
}, We = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function Ve({ quality: t, style: r }) {
  const n = Fe[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
  return /* @__PURE__ */ i("div", { className: h("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium"), style: r, children: [
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
    /* @__PURE__ */ e("span", { className: ze[t], children: We[t] })
  ] });
}
function er({ participants: t, style: r }) {
  const n = t.length, o = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: h("grid gap-1 bg-video-stage rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...r },
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
function tr({ reactions: t, style: r }) {
  const [n, o] = I([]);
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
  }, []), /* @__PURE__ */ e("div", { className: h("absolute inset-0 pointer-events-none overflow-hidden"), style: r, children: n.map((a) => /* @__PURE__ */ e(
    "span",
    {
      className: h("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
      style: { left: `${a.x}%` },
      children: a.emoji
    },
    a.id
  )) });
}
const Oe = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function rr({ onReact: t, emojis: r = Oe, style: n }) {
  return /* @__PURE__ */ e("div", { className: h("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]"), style: n, children: r.map((o) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => t(o),
      className: h("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
      onMouseDown: (a) => a.currentTarget.style.transform = "scale(1.3)",
      onMouseUp: (a) => a.currentTarget.style.transform = "scale(1)",
      onMouseLeave: (a) => a.currentTarget.style.transform = "scale(1)",
      children: o
    },
    o
  )) });
}
function _e(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function Ue(t) {
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${n}:${String(o).padStart(2, "0")}`;
}
const Xe = {
  live: "bg-success shadow-[0_0_6px_#22c55e]",
  playing: "bg-success shadow-[0_0_6px_#22c55e]",
  connecting: "bg-warning",
  reconnecting: "bg-warning",
  buffering: "bg-warning",
  idle: "bg-surface-emphasis",
  error: "bg-danger"
}, Ye = {
  live: "text-success-fg",
  playing: "text-success-fg",
  connecting: "text-warning-fg",
  reconnecting: "text-warning-fg",
  buffering: "text-warning-fg",
  idle: "text-text-tertiary",
  error: "text-danger-fg"
};
function nr({ phase: t, bitrateBps: r, viewerCount: n, duration: o, style: a }) {
  const c = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: h("inline-flex items-center gap-4 px-4 py-2 bg-surface-inverse rounded-md text-xs text-code-text font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: h("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: h("w-[7px] h-[7px] rounded-full", Xe[t] ?? "bg-surface-emphasis") }),
      /* @__PURE__ */ e("span", { className: h("font-semibold", Ye[t] ?? "text-text-tertiary"), children: c })
    ] }),
    r !== void 0 && /* @__PURE__ */ e("span", { children: _e(r) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: Ue(o) }),
    n !== void 0 && /* @__PURE__ */ i("span", { className: h("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function ir({ count: t, className: r, style: n }) {
  const o = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
  return /* @__PURE__ */ i(
    "div",
    {
      className: h(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium",
        r
      ),
      style: n,
      children: [
        /* @__PURE__ */ i("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
          /* @__PURE__ */ e("circle", { cx: "6", cy: "4", r: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
          /* @__PURE__ */ e("path", { d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
        ] }),
        /* @__PURE__ */ i("span", { children: [
          o,
          " watching"
        ] })
      ]
    }
  );
}
function Ke(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function Ge(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function q({ participant: t, size: r = 32 }) {
  const n = Ge(t.displayName);
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
        ) : Ke(t.displayName),
        t.isSpeaking && /* @__PURE__ */ e(
          "span",
          {
            "data-testid": "call-avatar-speaking",
            className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
          }
        ),
        t.isMuted && /* @__PURE__ */ e(
          "span",
          {
            "data-testid": "call-avatar-muted",
            "aria-label": "Microphone muted",
            className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
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
function Je({
  participants: t,
  localFallback: r,
  maxVisible: n = 4,
  avatarSize: o = 36,
  testId: a = "call-participant-strip",
  className: c,
  style: l
}) {
  const u = t.slice(0, n), d = Math.max(0, t.length - n), m = t.length === 0 && !!r;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": a,
      "data-count": t.length,
      className: h(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        c
      ),
      style: l,
      children: [
        u.map((p) => /* @__PURE__ */ e(q, { participant: p, size: o }, p.id)),
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
        m && r && /* @__PURE__ */ e(q, { participant: r, size: o + 4 })
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
  label: r,
  active: n = !1,
  danger: o = !1,
  onClick: a,
  disabled: c = !1,
  testId: l
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      title: r,
      "aria-label": r,
      disabled: c,
      onClick: a,
      "data-testid": l,
      className: h(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-danger text-white hover:bg-danger",
        n && !o && "bg-white/20 text-white",
        !n && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        c && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function qe({
  mode: t,
  isMuted: r = !1,
  isCameraOn: n = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: c,
  onToggleScreenShare: l,
  onUpgradeToVideo: u,
  onEndCall: d,
  onAddParticipant: m,
  availableParticipants: p,
  currentParticipantIds: g,
  className: b
}) {
  const [s, x] = I(!1), w = new Set(g ?? []), k = (p ?? []).filter((v) => !w.has(v.id));
  return /* @__PURE__ */ i("div", { className: h("flex flex-col", b), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            K,
            {
              icon: r ? _.micOff : _.mic,
              label: r ? "Unmute" : "Mute",
              active: r,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            K,
            {
              icon: n ? _.camera : _.cameraOff,
              label: n ? "Turn off camera" : "Turn on camera",
              active: !n,
              onClick: c,
              testId: "camera-button"
            }
          ),
          t === "audio" && u && /* @__PURE__ */ e(
            K,
            {
              icon: _.videoUpgrade,
              label: "Switch to video",
              onClick: u,
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
          m && /* @__PURE__ */ e(
            K,
            {
              icon: _.userPlus,
              label: "Add participant",
              active: s,
              onClick: () => x((v) => !v),
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
    s && m && /* @__PURE__ */ i(
      "div",
      {
        className: "border-t border-white/5 bg-surface-inverse/80",
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
          k.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: k.map((v) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                m(v.id), k.length <= 1 && x(!1);
              },
              children: [
                /* @__PURE__ */ e(q, { participant: v, size: 22 }),
                /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: v.displayName }),
                /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-primary-fg", children: "+ Add" })
              ]
            },
            v.id
          )) })
        ]
      }
    )
  ] });
}
function Ze(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const Qe = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function et(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)} Mb/s` : `${Math.round(t)} kb/s`;
}
function de({
  stats: t,
  position: r = "top-left",
  testId: n = "call-stats-overlay",
  className: o,
  style: a
}) {
  return Ze(t) ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": n,
      className: h(
        "absolute z-10 pointer-events-none",
        Qe[r],
        "flex flex-col gap-1.5",
        o
      ),
      style: a,
      children: [
        t.networkQuality && /* @__PURE__ */ e(Ve, { quality: t.networkQuality }),
        (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              t.bitrateKbps !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                et(t.bitrateKbps)
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
function Ne(t) {
  const r = Math.floor(t / 60), n = t % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function ue({
  stream: t,
  muted: r = !1,
  className: n
}) {
  const o = $(null);
  return B(() => {
    const a = o.current;
    a && a.srcObject !== t && (a.srcObject = t);
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
function tt({
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
          className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
          "aria-label": "Decline call",
          children: ie.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
          "aria-label": "Answer call",
          children: ie.phoneAnswer
        }
      )
    ] })
  ] });
}
function rt({
  mode: t,
  participants: r,
  localParticipant: n,
  duration: o,
  isMuted: a,
  isCameraOn: c,
  isScreenSharing: l,
  onToggleMute: u,
  onToggleCamera: d,
  onToggleScreenShare: m,
  onUpgradeToVideo: p,
  onAddParticipant: g,
  availableParticipants: b,
  onEndCall: s,
  layoutComponent: x,
  callStats: w
}) {
  const k = t === "video" && c;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && x && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      x,
      /* @__PURE__ */ e(de, { stats: w, position: "bottom-left" })
    ] }),
    t === "video" && !x && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && k ? /* @__PURE__ */ e(ue, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-surface-inverse", children: n && /* @__PURE__ */ e(q, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse", children: [
        r[0].videoStream ? /* @__PURE__ */ e(ue, { stream: r[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(q, { participant: r[0], size: 28 }) }),
        r[0].isMuted && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
            "aria-label": "Microphone muted",
            children: /* @__PURE__ */ i("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
              /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
              /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
              /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ e(de, { stats: w, position: "bottom-left" })
    ] }),
    t === "audio" && /* @__PURE__ */ e(
      Je,
      {
        participants: r,
        localFallback: n,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/60 text-xs font-mono", children: Ne(o) }),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
        " in call"
      ] })
    ] }),
    /* @__PURE__ */ e(
      qe,
      {
        mode: t,
        isMuted: a,
        isCameraOn: c,
        isScreenSharing: l,
        onToggleMute: u,
        onToggleCamera: d,
        onToggleScreenShare: m,
        onUpgradeToVideo: p,
        onEndCall: s,
        onAddParticipant: g,
        availableParticipants: b,
        currentParticipantIds: r.map((v) => v.id)
      }
    )
  ] });
}
function nt({
  state: t,
  mode: r,
  duration: n,
  isMuted: o,
  callerName: a,
  onToggleMute: c,
  onEndCall: l,
  onExpand: u
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: u,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (d) => d.key === "Enter" && u?.(),
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: h(
              "w-2 h-2 rounded-full shrink-0",
              t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse"
            )
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: t === "ringing" ? /* @__PURE__ */ e("span", { className: "text-white text-xs font-medium truncate", children: a || "Incoming call" }) : /* @__PURE__ */ i("span", { className: "text-white text-xs font-medium", children: [
          r === "video" ? "Video" : "Audio",
          " call",
          n !== void 0 && /* @__PURE__ */ e("span", { className: "text-white/50 ml-1.5 font-mono", children: Ne(n) })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (d) => d.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: c,
              className: h(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(ne, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(ne, { children: [
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
              className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
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
function it(t) {
  const [r, n] = I({ x: 0, y: 0 }), [o, a] = I(!1), [c, l] = I(!1), u = $(!1), d = $({ x: 0, y: 0 }), m = $({ x: 0, y: 0 }), p = $(null), g = H(
    (k) => {
      t && (u.current = !0, a(!0), l(!1), d.current = { x: k.clientX, y: k.clientY }, m.current = { ...r }, k.preventDefault());
    },
    [t, r]
  ), b = H(() => {
    l(!0), n({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), s = H(
    (k) => {
      const v = p.current;
      if (!v) return;
      const N = v.offsetParent, C = 16;
      let j = window.innerWidth, L = window.innerHeight;
      N && (j = N.clientWidth, L = N.clientHeight);
      const S = v.getBoundingClientRect(), P = N ? N.getBoundingClientRect() : { left: 0, top: 0 };
      let E, T;
      switch (k) {
        case "top-left":
          E = C, T = C;
          break;
        case "top-right":
          E = j - S.width - C, T = C;
          break;
        case "bottom-left":
          E = C, T = L - S.height - C;
          break;
        default:
          E = j - S.width - C, T = L - S.height - C;
          break;
      }
      const D = S.left - P.left - r.x, F = S.top - P.top - r.y;
      l(!0), n({ x: E - D, y: T - F }), setTimeout(() => l(!1), 200);
    },
    [r]
  ), x = $(s);
  x.current = s, B(() => {
    if (!t) return;
    const k = (N) => {
      u.current && n({
        x: m.current.x + (N.clientX - d.current.x),
        y: m.current.y + (N.clientY - d.current.y)
      });
    }, v = () => {
      if (!u.current) return;
      u.current = !1, a(!1);
      const N = p.current;
      if (!N) return;
      const C = N.offsetParent, j = 80;
      let L = window.innerWidth, S = window.innerHeight;
      if (C) {
        const y = C.getBoundingClientRect();
        L = y.width, S = y.height;
      }
      const P = N.getBoundingClientRect(), E = C ? C.getBoundingClientRect() : { left: 0, top: 0 }, T = P.left - E.left, D = P.top - E.top, F = L - (T + P.width), O = S - (D + P.height), W = T < j, z = F < j, M = D < j, f = O < j;
      M && W ? x.current("top-left") : M && z ? x.current("top-right") : f && W ? x.current("bottom-left") : f && z && x.current("bottom-right");
    };
    return document.addEventListener("mousemove", k), document.addEventListener("mouseup", v), () => {
      document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", v);
    };
  }, [t]);
  const w = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: g, resetOffset: b, snapToCorner: s, isDragging: o, isAnimating: c, hasMoved: w, widgetRef: p };
}
function ot({
  onSnap: t,
  contained: r
}) {
  const n = [
    { id: "top-left", classes: "top-3 left-3" },
    { id: "top-right", classes: "top-3 right-3" },
    { id: "bottom-left", classes: "bottom-3 left-3" },
    { id: "bottom-right", classes: "bottom-3 right-3" }
  ];
  return /* @__PURE__ */ e("div", { className: h(r ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"), children: n.map(({ id: o, classes: a }) => /* @__PURE__ */ e(
    "div",
    {
      className: `absolute ${a} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
      onClick: () => t(o),
      title: `Snap to ${o.replace("-", " ")}`,
      children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white/40", children: /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) })
    },
    o
  )) });
}
function or({
  state: t,
  mode: r,
  participants: n,
  localParticipant: o,
  callerName: a,
  duration: c,
  isMuted: l = !1,
  isCameraOn: u = !0,
  isScreenSharing: d = !1,
  onAnswer: m,
  onDecline: p,
  onEndCall: g,
  onToggleMute: b,
  onToggleCamera: s,
  onToggleScreenShare: x,
  onUpgradeToVideo: w,
  onAddParticipant: k,
  availableParticipants: v,
  onMinimize: N,
  onExpand: C,
  layoutComponent: j,
  callStats: L,
  minimized: S = !1,
  position: P = "bottom-right",
  contained: E = !1,
  draggable: T = !0,
  className: D,
  style: F,
  dataAttrs: O
}) {
  const { offset: W, handleMouseDown: z, resetOffset: M, snapToCorner: f, isDragging: y, isAnimating: A, hasMoved: X, widgetRef: V } = it(T), Y = {};
  if (O)
    for (const [je, Z] of Object.entries(O))
      Z != null && Z !== "" && (Y[je] = Z);
  const Le = G(() => {
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
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(ne, { children: [
    y && /* @__PURE__ */ e(ot, { onSnap: f, contained: E }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: V,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: h(
          E ? "absolute z-50" : "fixed z-[9999]",
          Le,
          D
        ),
        style: {
          transform: `translate(${W.x}px, ${W.y}px)`,
          transition: A ? "transform 0.2s ease-out" : void 0,
          ...F
        },
        ...Y,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              S ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !S && /* @__PURE__ */ i(
                "div",
                {
                  className: h(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    T && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: z,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-success" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
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
              S && /* @__PURE__ */ e(
                "div",
                {
                  className: h(T && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: z,
                  children: /* @__PURE__ */ e(
                    nt,
                    {
                      state: t,
                      mode: r,
                      duration: c,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: b,
                      onEndCall: g,
                      onExpand: N
                    }
                  )
                }
              ),
              !S && /* @__PURE__ */ i(ne, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  tt,
                  {
                    callerName: a,
                    onAnswer: m,
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
                  rt,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: o,
                    duration: c,
                    isMuted: l,
                    isCameraOn: u,
                    isScreenSharing: d,
                    onToggleMute: b,
                    onToggleCamera: s,
                    onToggleScreenShare: x,
                    onUpgradeToVideo: w,
                    onAddParticipant: k,
                    availableParticipants: v,
                    onEndCall: g,
                    layoutComponent: j,
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
function ar({
  callerName: t,
  callerAvatarUrl: r,
  context: n,
  mode: o = "started",
  onJoin: a,
  onDismiss: c,
  autoExpireSec: l = 30,
  className: u,
  style: d
}) {
  const [m, p] = I(!0);
  return B(() => {
    if (!l || l <= 0) return;
    const g = setTimeout(() => {
      p(!1), c?.();
    }, l * 1e3);
    return () => clearTimeout(g);
  }, [l, c]), m ? /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": "incoming-call-toast",
      "data-call-mode": o,
      "data-caller-name": t,
      className: h(
        "flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg",
        "bg-surface-inverse text-white border border-white/10",
        u
      ),
      style: d,
      children: [
        /* @__PURE__ */ e(at, { name: t, avatarUrl: r }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: "text-sm font-semibold m-0 truncate", children: o === "calling" ? `${t} is calling you` : `${t} started a call` }),
          n && /* @__PURE__ */ e("p", { className: "text-xs text-white/60 m-0 truncate", children: n })
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
              className: "text-xs font-semibold bg-success hover:bg-success text-white px-3 py-1.5 rounded",
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
function at({ name: t, avatarUrl: r }) {
  const n = st(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ e("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : lt(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })
      ]
    }
  );
}
function lt(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function st(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function he(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = r > 0 ? String(n).padStart(2, "0") : String(n), c = String(o).padStart(2, "0");
  return r > 0 ? `${r}:${a}:${c}` : `${a}:${c}`;
}
function lr({
  playlistUrl: t,
  poster: r,
  autoPlay: n = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: c,
  onError: l,
  hideDownload: u = !1,
  className: d
}) {
  const m = $(null), p = $(null), [g, b] = I(!1), [s, x] = I(0), [w, k] = I(0), [v, N] = I(1), [C, j] = I(1), [L, S] = I(!1), [P, E] = I(null);
  B(() => {
    const M = m.current;
    if (!M || !t) return;
    if (E(null), S(!0), M.canPlayType("application/vnd.apple.mpegurl"))
      return M.src = t, () => {
        M.removeAttribute("src"), M.load();
      };
    let f = !1;
    return (async () => {
      try {
        const y = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (f) return;
        if (!y.isSupported()) {
          E("HLS playback is not supported in this browser."), S(!1);
          return;
        }
        const A = new y({ enableWorker: !0 });
        p.current = A, A.attachMedia(M), A.on(y.Events.MEDIA_ATTACHED, () => A.loadSource(t)), A.on(y.Events.ERROR, (X, V) => {
          V.fatal && (E(`HLS error: ${V.type}`), l?.(new Error(`HLS fatal: ${V.type}`)));
        });
      } catch (y) {
        if (f) return;
        E(`Failed to load hls.js — install it in the consumer app: ${y?.message ?? y}`);
      }
    })(), () => {
      if (f = !0, p.current) {
        try {
          p.current.destroy();
        } catch {
        }
        p.current = null;
      }
    };
  }, [t, l]);
  const T = () => {
    const M = m.current;
    M && (M.paused ? M.play().catch(() => {
    }) : M.pause());
  }, D = (M) => {
    const f = m.current;
    !f || !isFinite(w) || w <= 0 || (f.currentTime = Number(M.target.value));
  }, F = (M) => {
    const f = m.current;
    if (!f) return;
    const y = Number(M.target.value);
    f.volume = y, N(y);
  }, O = (M) => {
    const f = m.current;
    if (!f) return;
    const y = Number(M.target.value);
    f.playbackRate = y, j(y);
  }, W = () => {
    const M = m.current;
    M && (document.fullscreenElement ? document.exitFullscreen() : M.requestFullscreen?.());
  }, z = G(
    () => w > 0 ? Math.min(100, s / w * 100) : 0,
    [s, w]
  );
  return /* @__PURE__ */ i("div", { className: h("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", d), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: m,
        autoPlay: n,
        muted: o,
        poster: r,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => b(!0),
        onPause: () => b(!1),
        onLoadedMetadata: (M) => {
          const f = M.currentTarget;
          k(f.duration), S(!1), a?.(f.duration);
        },
        onTimeUpdate: (M) => {
          const f = M.currentTarget;
          x(f.currentTime), c?.(f.currentTime, f.duration);
        },
        onWaiting: () => S(!0),
        onCanPlay: () => S(!1),
        onError: () => {
          E("Playback error."), l?.(new Error("video element error")), S(!1);
        }
      }
    ),
    L && !P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: P }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: he(s) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(w) ? w : 0,
            step: 0.1,
            value: s,
            onChange: D,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${z}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: he(w) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: T,
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
              value: v,
              onChange: F,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          Ae,
          {
            size: "sm",
            value: String(C),
            onChange: O,
            className: "w-auto bg-white/10 hover:bg-white/20 text-white border-transparent focus:bg-white/20 focus:border-transparent",
            "aria-label": "Playback speed",
            options: [
              { value: "0.5", label: "0.5×" },
              { value: "1", label: "1×" },
              { value: "1.5", label: "1.5×" },
              { value: "2", label: "2×" }
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        !u && t && /* @__PURE__ */ e(
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
function ct(t) {
  if (!isFinite(t) || t < 0) return "—";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
function fe(t) {
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
function dt({ status: t }) {
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
function ut({
  id: t,
  startIso: r,
  durationSec: n,
  participantCount: o,
  thumbnailUrl: a,
  label: c,
  status: l = "ready",
  selected: u,
  onClick: d,
  actions: m,
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
        onKeyDown: (s) => {
          g && (s.key === "Enter" || s.key === " ") && (s.preventDefault(), d(t));
        },
        "aria-pressed": u ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: h(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        g && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        u ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
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
              onError: (s) => {
                s.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(dt, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: ct(n) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: c ?? fe(r) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        c && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: fe(r) }),
        m && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (s) => s.stopPropagation(),
            children: m
          }
        )
      ]
    }
  );
}
function sr({
  recordings: t,
  selectedId: r,
  onSelect: n,
  loading: o,
  emptyState: a,
  renderActions: c,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", l), children: [0, 1, 2].map((u) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    u
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", l), children: t.map((u) => /* @__PURE__ */ e(
    ut,
    {
      id: u.id,
      startIso: u.startIso,
      endIso: u.endIso,
      durationSec: u.durationSec,
      participantCount: u.participantCount,
      thumbnailUrl: u.thumbnailUrl,
      label: u.label,
      status: u.status,
      selected: u.id === r,
      onClick: n,
      actions: c?.(u)
    },
    u.id
  )) });
}
function ht(t) {
  const r = Math.floor(t / 1e3), n = Math.floor(r / 60), o = r % 60;
  return `${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function ft(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = r * 31 + t.charCodeAt(n) | 0;
  return Math.abs(r) % 360;
}
function cr({
  status: t,
  segments: r,
  currentTimeMs: n,
  onSeek: o,
  title: a = "Transcript",
  errorMessage: c,
  pendingMessage: l,
  idleState: u,
  className: d
}) {
  const m = $(null), p = G(() => {
    if (!r || n == null) return -1;
    for (let g = 0; g < r.length; g++) {
      const b = r[g];
      if (n >= b.startMs && n < b.endMs) return g;
    }
    return -1;
  }, [r, n]);
  return B(() => {
    if (p < 0 || !m.current) return;
    const g = m.current.querySelector(`[data-seg-index="${p}"]`);
    g && g.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [p]), t === "idle" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: a }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: u ?? "Transcription was not enabled for this recording." })
  ] }) : t === "pending" || t === "processing" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2", children: [
      /* @__PURE__ */ e("span", { children: a }),
      /* @__PURE__ */ e("span", { className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse", "aria-hidden": "true" }),
      /* @__PURE__ */ e("span", { className: "text-xs font-normal text-[var(--color-text-tertiary,#737373)]", children: t === "pending" ? "queued" : "processing" })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: l ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.") })
  ] }) : t === "failed" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2", children: [
      a,
      " — failed"
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: c ?? "Transcript generation failed. Reach out to support if this persists." })
  ] }) : !r || r.length === 0 ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: a }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: "No audible speech was captured in this recording." })
  ] }) : /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", d), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]", children: [
      a,
      /* @__PURE__ */ i("span", { className: "ml-2 text-xs font-normal text-[var(--color-text-tertiary,#737373)]", children: [
        r.length,
        " segments"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { ref: m, className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2", children: r.map((g, b) => {
      const s = b === p, x = ft(g.speakerId), w = !!o;
      return /* @__PURE__ */ i(
        "div",
        {
          "data-seg-index": b,
          className: h(
            "rounded-md px-3 py-2 transition-colors",
            s ? "bg-[var(--color-surface-active,rgba(255,255,255,0.06))] ring-1 ring-[var(--color-border-focus,#3b82f6)]" : "hover:bg-[var(--color-surface-hover,rgba(255,255,255,0.03))]",
            w && "cursor-pointer"
          ),
          onClick: w ? () => o(g.startMs) : void 0,
          role: w ? "button" : void 0,
          tabIndex: w ? 0 : void 0,
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-baseline gap-2 mb-1", children: [
              /* @__PURE__ */ e(
                "span",
                {
                  className: "text-xs font-semibold",
                  style: { color: `hsl(${x}, 65%, 60%)` },
                  children: g.speakerLabel
                }
              ),
              /* @__PURE__ */ e("span", { className: "text-xs font-mono text-[var(--color-text-tertiary,#737373)]", children: ht(g.startMs) })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-sm text-[var(--color-text-primary)] leading-relaxed", children: g.text })
          ]
        },
        `${g.startMs}-${g.speakerId}-${b}`
      );
    }) })
  ] });
}
function dr({
  status: t,
  markdown: r,
  renderMarkdown: n,
  title: o = "Summary",
  errorMessage: a,
  pendingMessage: c,
  idleState: l,
  className: u
}) {
  return t === "idle" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: o }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: l ?? "No summary generated for this recording." })
  ] }) : t === "pending" || t === "processing" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2", children: [
      /* @__PURE__ */ e("span", { children: o }),
      /* @__PURE__ */ e("span", { className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: c ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing." })
  ] }) : t === "failed" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2", children: [
      o,
      " — failed"
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: a ?? "Summary generation failed." })
  ] }) : !r || r.trim().length === 0 ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: o }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: "No summary content was generated." })
  ] }) : /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", u), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]", children: o }),
    /* @__PURE__ */ e("div", { className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]", children: n ? n(r) : /* @__PURE__ */ e("pre", { className: "whitespace-pre-wrap text-sm font-sans text-[var(--color-text-primary)]", children: r }) })
  ] });
}
function ur({
  getVideoElement: t,
  className: r,
  title: n
}) {
  const [o, a] = I(!1), [c, l] = I(!1);
  B(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), B(() => {
    const m = () => a(!1), p = () => a(!0);
    return document.addEventListener("leavepictureinpicture", m), document.addEventListener("enterpictureinpicture", p), () => {
      document.removeEventListener("leavepictureinpicture", m), document.removeEventListener("enterpictureinpicture", p);
    };
  }, []);
  const u = H(async () => {
    if (c)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), a(!1);
          return;
        }
        const m = t();
        if (!m) return;
        m.disablePictureInPicture = !1, await m.requestPictureInPicture(), a(!0);
      } catch {
      }
  }, [c, t]), d = !c;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: u,
      disabled: d,
      title: n ?? (d ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: h(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function mt(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function hr({
  participants: t,
  activeSpeakerId: r,
  onParticipantClick: n,
  count: o,
  title: a = "Participants",
  footer: c,
  className: l
}) {
  const u = o ?? t.length;
  return /* @__PURE__ */ i(
    "aside",
    {
      className: h(
        "flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]",
        l
      ),
      "aria-label": "Call participants",
      children: [
        /* @__PURE__ */ i("header", { className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: a }),
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: u })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((d) => {
          const m = d.id === r;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: n ? () => n(d.id) : void 0,
              className: h(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                m && "bg-white/[0.04]",
                n ? "cursor-pointer" : "cursor-default"
              ),
              disabled: !n,
              children: [
                /* @__PURE__ */ i(
                  "div",
                  {
                    className: h(
                      "relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      "bg-[var(--color-primary)] text-white",
                      m && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      d.avatarUrl ? /* @__PURE__ */ e("img", { src: d.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: mt(d.displayName) }),
                      d.isScreenSharing && /* @__PURE__ */ e(
                        "span",
                        {
                          title: "Sharing screen",
                          className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
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
function pt() {
  if (Q) return Q;
  try {
    return Q = new AudioContext(), Q;
  } catch {
    return null;
  }
}
function fr({
  localStream: t,
  isMuted: r,
  threshold: n = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [c, l] = I(!1);
  return B(() => {
    if (!r || !t || t.getAudioTracks().filter((k) => k.readyState === "live").length === 0) return;
    const d = pt();
    if (!d) return;
    let m, p;
    try {
      m = d.createMediaStreamSource(t), p = d.createAnalyser(), p.fftSize = 512, p.smoothingTimeConstant = 0.6, m.connect(p);
    } catch {
      return;
    }
    let g = null, b = 0, s = !1;
    const x = new Float32Array(p.frequencyBinCount), w = setInterval(() => {
      if (s) return;
      p.getFloatTimeDomainData(x);
      let k = 0;
      for (let C = 0; C < x.length; C++) k += x[C] * x[C];
      const v = 20 * Math.log10(Math.sqrt(k / x.length)), N = Date.now();
      v > n ? (g == null && (g = N), N - g >= o && N - b > a && (l(!0), b = N, setTimeout(() => {
        s || l(!1);
      }, 3e3), g = null)) : g = null;
    }, 200);
    return () => {
      s = !0, clearInterval(w);
      try {
        m.disconnect();
      } catch {
      }
      try {
        p.disconnect();
      } catch {
      }
    };
  }, [t, r, n, o, a]), B(() => {
    r || l(!1);
  }, [r]), c;
}
const xt = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function gt() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((r) => {
    if (r.paused) {
      const n = r.play();
      n && typeof n.catch == "function" && n.catch(() => {
      });
    }
  });
}
function mr({
  chipLabel: t = "Tap to unmute",
  chipClassName: r,
  wrapperClassName: n,
  onPlayStateChange: o,
  ...a
}) {
  const [c, l] = I(!1), u = $(null), m = a.videoRef ?? u, p = H(
    (b) => {
      b === "paused-by-autoplay" ? l(!0) : b === "playing" && l(!1), o?.(b);
    },
    [o]
  ), g = H(() => {
    const b = m.current;
    if (b) {
      b.muted = !1;
      const s = b.play();
      s && typeof s.catch == "function" && s.catch(() => {
      });
    }
    gt(), l(!1);
  }, [m]);
  return /* @__PURE__ */ i("div", { className: h("relative h-full w-full", n), children: [
    /* @__PURE__ */ e(
      Te,
      {
        ...a,
        videoRef: m,
        onPlayStateChange: p
      }
    ),
    c && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: g,
        className: h(xt, r),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
const me = 1;
function vt({
  persistKey: t,
  defaults: r,
  debounceMs: n = 200
}) {
  const [o, a] = I(() => {
    if (!t || typeof window > "u") return r;
    try {
      const u = window.localStorage.getItem(t);
      if (!u) return r;
      const d = JSON.parse(u);
      return !d || d.v !== me ? r : {
        mode: d.mode === "docked" ? "docked" : "mini",
        x: ee(d.x, r.x),
        y: ee(d.y, r.y),
        width: ee(d.width, r.width),
        height: ee(d.height, r.height)
      };
    } catch {
      try {
        window.localStorage.removeItem(t);
      } catch {
      }
      return r;
    }
  }), c = $(null);
  B(() => {
    if (!(!t || typeof window > "u"))
      return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        try {
          const u = { v: me, ...o };
          window.localStorage.setItem(t, JSON.stringify(u));
        } catch {
        }
      }, n), () => {
        c.current && clearTimeout(c.current);
      };
  }, [t, o, n]);
  const l = H((u) => {
    a((d) => ({ ...d, ...u }));
  }, []);
  return { state: o, setState: l };
}
function ee(t, r) {
  return typeof t == "number" && Number.isFinite(t) ? t : r;
}
const ae = 320, le = 200, bt = 640, wt = 400, yt = 1440, Nt = 900, pe = 960, xe = 600, R = 8;
function pr({
  title: t,
  subtitle: r,
  children: n,
  controls: o,
  defaultMode: a = "mini",
  onModeChange: c,
  persistKey: l,
  apiRef: u,
  defaultCorner: d = "bottom-right",
  expandable: m = !0,
  zIndex: p = 9999,
  className: g
}) {
  const b = G(() => a === "docked" ? ge(pe, xe) : ve(d), [a, d]), { state: s, setState: x } = vt({
    persistKey: l,
    defaults: {
      mode: a,
      x: b.x,
      y: b.y,
      width: pe,
      height: xe
    }
  }), [w, k] = I(!1), v = w ? "fullscreen" : s.mode, N = $(null), C = $(!1);
  B(() => {
    const f = () => {
      !((document.fullscreenElement ?? document.webkitFullscreenElement) === N.current) && w && (k(!1), C.current || x({ mode: "docked" }), C.current = !1);
    };
    return document.addEventListener("fullscreenchange", f), document.addEventListener("webkitfullscreenchange", f), () => {
      document.removeEventListener("fullscreenchange", f), document.removeEventListener("webkitfullscreenchange", f);
    };
  }, [w, x]);
  const j = H(() => {
    const f = N.current;
    if (!f) return;
    const y = f.requestFullscreen?.bind(f) ?? f.webkitRequestFullscreen?.bind(f);
    if (!y) return;
    const A = y();
    A && typeof A.then == "function" ? A.then(
      () => k(!0),
      () => {
      }
    ) : k(!0);
  }, []), L = H(() => {
    if (!(document.fullscreenElement ?? document.webkitFullscreenElement)) return;
    C.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {
    });
  }, []), S = H((f) => {
    if (f !== v) {
      if (f === "fullscreen") {
        j();
        return;
      }
      if (v === "fullscreen") {
        L(), x({ mode: f });
        return;
      }
      if (f === "docked" && v === "mini") {
        const y = ge(s.width, s.height);
        x({ mode: f, x: y.x, y: y.y });
        return;
      }
      if (f === "mini" && v === "docked") {
        const y = ve(d);
        x({ mode: f, x: y.x, y: y.y });
        return;
      }
      x({ mode: f });
    }
  }, [v, j, L, x, s.width, s.height, d]);
  B(() => {
    c?.(v);
  }, [v, c]), Pe(u, () => ({ mode: v, setMode: S }), [v, S]);
  const P = $(null), E = H((f) => {
    v === "docked" && (f.target.closest("button") || (f.currentTarget.setPointerCapture(f.pointerId), P.current = {
      startX: f.clientX,
      startY: f.clientY,
      origX: s.x,
      origY: s.y
    }));
  }, [v, s.x, s.y]), T = H((f) => {
    const y = P.current;
    if (!y) return;
    const A = f.clientX - y.startX, X = f.clientY - y.startY, V = te(y.origX + A, s.width, window.innerWidth), Y = te(y.origY + X, s.height, window.innerHeight);
    x({ x: V, y: Y });
  }, [x, s.width, s.height]), D = H((f) => {
    f.currentTarget.releasePointerCapture(f.pointerId), P.current = null;
  }, []), F = $(null), O = H((f) => {
    v === "docked" && (f.stopPropagation(), f.currentTarget.setPointerCapture(f.pointerId), F.current = {
      startX: f.clientX,
      startY: f.clientY,
      origW: s.width,
      origH: s.height
    });
  }, [v, s.width, s.height]), W = H((f) => {
    const y = F.current;
    if (!y) return;
    const A = f.clientX - y.startX, X = f.clientY - y.startY, V = se(y.origW + A, bt, Math.min(yt, window.innerWidth - R * 2)), Y = se(y.origH + X, wt, Math.min(Nt, window.innerHeight - R * 2));
    x({ width: V, height: Y });
  }, [x]), z = H((f) => {
    f.currentTarget.releasePointerCapture(f.pointerId), F.current = null;
  }, []);
  Ee(() => {
    if (v !== "docked") return;
    const f = () => {
      const y = te(s.x, s.width, window.innerWidth), A = te(s.y, s.height, window.innerHeight);
      (y !== s.x || A !== s.y) && x({ x: y, y: A });
    };
    return window.addEventListener("resize", f), () => window.removeEventListener("resize", f);
  }, [v, s.x, s.y, s.width, s.height, x]);
  const M = G(() => v === "fullscreen" ? {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: p
  } : v === "docked" ? {
    position: "fixed",
    left: s.x,
    top: s.y,
    width: s.width,
    height: s.height,
    zIndex: p
  } : {
    position: "fixed",
    left: s.x,
    top: s.y,
    width: ae,
    height: le,
    zIndex: p
  }, [v, s.x, s.y, s.width, s.height, p]);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: N,
      "data-call-widget-mode": v,
      style: M,
      className: h(
        "flex flex-col bg-surface-inverse text-white shadow-2xl overflow-hidden border border-white/10",
        v === "fullscreen" ? "rounded-none" : "rounded-lg",
        g
      ),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none",
              v === "docked" ? "cursor-grab active:cursor-grabbing" : ""
            ),
            onPointerDown: E,
            onPointerMove: T,
            onPointerUp: D,
            onPointerCancel: D,
            children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex items-center gap-2 text-xs text-white/80", children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-success", "aria-hidden": !0 }),
                /* @__PURE__ */ e("span", { className: "truncate font-medium", children: t }),
                r && /* @__PURE__ */ e("span", { className: "truncate text-white/50", children: r })
              ] }),
              m && /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: v === "mini",
                    label: "Mini",
                    onClick: () => S("mini"),
                    testId: "call-widget-mode-mini",
                    children: /* @__PURE__ */ e(kt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: v === "docked",
                    label: "Window",
                    onClick: () => S("docked"),
                    testId: "call-widget-mode-docked",
                    children: /* @__PURE__ */ e(Ct, {})
                  }
                ),
                /* @__PURE__ */ e(
                  oe,
                  {
                    active: v === "fullscreen",
                    label: "Fullscreen",
                    onClick: () => S(v === "fullscreen" ? "docked" : "fullscreen"),
                    testId: "call-widget-mode-fullscreen",
                    children: /* @__PURE__ */ e(Mt, {})
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative flex-1 min-h-0 bg-black", children: n }),
        o && /* @__PURE__ */ e("div", { className: "border-t border-white/5 px-2 py-2 bg-video-tile", children: o }),
        v === "docked" && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
            onPointerDown: O,
            onPointerMove: W,
            onPointerUp: z,
            onPointerCancel: z,
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
  label: r,
  onClick: n,
  testId: o,
  children: a
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: n,
      "aria-pressed": t,
      "aria-label": r,
      title: r,
      "data-testid": o,
      className: h(
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
function Ct() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "1.5", y: "2.5", width: "9", height: "7", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function Mt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) });
}
function ge(t, r) {
  return typeof window > "u" ? { x: 16, y: 16 } : {
    x: Math.max(R, Math.floor((window.innerWidth - t) / 2)),
    y: Math.max(R, Math.floor((window.innerHeight - r) / 2))
  };
}
function ve(t) {
  if (typeof window > "u") return { x: 16, y: 16 };
  const r = window.innerWidth, n = window.innerHeight;
  switch (t) {
    case "top-left":
      return { x: R, y: R };
    case "top-right":
      return { x: r - ae - R, y: R };
    case "bottom-left":
      return { x: R, y: n - le - R };
    default:
      return { x: r - ae - R, y: n - le - R };
  }
}
function se(t, r, n) {
  return Math.max(r, Math.min(n, t));
}
function te(t, r, n) {
  return se(t, R, Math.max(R, n - r - R));
}
function xr({ show: t, label: r }) {
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
function gr({
  show: t,
  label: r = "You're muted — tap mic to unmute"
}) {
  return t ? /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "mute-while-talking-toast",
      className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
      role: "alert",
      children: r
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
function St(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++) r = r * 31 + t.charCodeAt(n) | 0;
  return be[Math.abs(r) % be.length];
}
function vr({
  lines: t,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: o
}) {
  const a = Date.now(), c = t.slice(-r).map((l) => {
    const u = a - new Date(l.at).getTime(), d = Math.max(0.35, 1 - u / n);
    return { ...l, opacity: d };
  }).filter((l) => l.opacity > 0);
  return c.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: c.map((l) => /* @__PURE__ */ i(
        "div",
        {
          className: h(
            "flex items-baseline gap-2 text-sm transition-opacity",
            l.interim && "italic"
          ),
          style: { opacity: l.opacity },
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "font-medium text-xs shrink-0",
                style: { color: St(l.speakerId) },
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
const Lt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, jt = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Pt = "bg-surface-hover text-neutral hover:bg-surface-emphasis", Et = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function J({
  on: t,
  iconOn: r,
  iconOff: n,
  "aria-label": o,
  offTone: a = "danger",
  size: c = "md",
  disabled: l,
  className: u,
  ...d
}) {
  const m = t ? jt : a === "danger" ? Et : Pt;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": o,
      "aria-pressed": t,
      disabled: l,
      className: h(
        "rounded-full grid place-items-center transition-colors duration-150",
        Lt[c],
        m,
        l && "opacity-40 cursor-not-allowed",
        !l && "cursor-pointer",
        u
      ),
      ...d,
      children: t ? r : n
    }
  );
}
function U(t, r) {
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
    ...r
  };
}
function ke({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Ce({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ e("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
    /* @__PURE__ */ e("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Me({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function Se({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function It({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function Tt({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function At({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function br({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...U(t, r), children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "5", cy: "12", r: "1" })
  ] });
}
function Bt(t, r, n) {
  if (n) return "Checking room…";
  if (!r || r === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return r === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function $t(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function wr({
  channelName: t,
  localIdentity: r,
  previewStream: n,
  permission: o,
  permissionMessage: a,
  audioEnabled: c,
  videoEnabled: l,
  onToggleAudio: u,
  onToggleVideo: d,
  onRetryPermission: m,
  participants: p,
  readyState: g,
  readyLoading: b = !1,
  onJoin: s,
  onCancel: x,
  joinLabel: w,
  joinDisabled: k,
  subtitleOverride: v,
  className: N,
  "data-testid": C
}) {
  const j = $(null);
  B(() => {
    j.current && n && (j.current.srcObject = n);
  }, [n]);
  const L = o === "granted", S = $t(o), P = k ?? !L, E = w ?? (P && !L ? "Allow camera to join" : "Join now"), T = v ?? Bt(p, g, b);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": C,
      className: h(
        "flex flex-col h-full min-h-0 bg-surface-panel text-text-primary",
        N
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-neutral mt-0.5", children: T })
          ] }),
          /* @__PURE__ */ e(ce, { variant: "ghost", size: "sm", onClick: x, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black", children: [
              n && L && /* @__PURE__ */ e(
                "video",
                {
                  ref: j,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: h(
                    "w-full h-full object-cover scale-x-[-1]",
                    !l && "opacity-0"
                  )
                }
              ),
              L && !l && (r ? (
                // Meet/Teams-style identity tile: large avatar + display
                // name + "Camera off" subtitle. Avatar falls back to
                // initials when avatarSrc is absent.
                /* @__PURE__ */ e(
                  "div",
                  {
                    "data-testid": "prejoin-identity-tile",
                    className: "absolute inset-0 grid place-items-center bg-surface-inverse/95",
                    children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 px-6 text-center", children: [
                      /* @__PURE__ */ e(
                        we,
                        {
                          name: r.displayName,
                          src: r.avatarSrc,
                          size: 96
                        }
                      ),
                      /* @__PURE__ */ i("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ e("span", { className: "text-white text-base font-medium truncate max-w-[16rem]", children: r.displayName }),
                        /* @__PURE__ */ e("span", { className: "text-text-disabled text-xs", children: "Camera off" })
                      ] })
                    ] })
                  }
                )
              ) : /* @__PURE__ */ e(
                "div",
                {
                  "data-testid": "prejoin-camera-off-fallback",
                  className: "absolute inset-0 grid place-items-center text-text-disabled text-sm",
                  children: "Camera off"
                }
              )),
              o === "pending" && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ e(ye, { size: "lg" }) }),
              S && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center bg-surface-panel/95", children: /* @__PURE__ */ e(
                Be,
                {
                  kind: "camera",
                  state: S,
                  message: a,
                  onRetry: m,
                  "data-testid": "prejoin-permission-card"
                }
              ) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ e(
                J,
                {
                  on: c,
                  onClick: u,
                  disabled: !L,
                  "aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
                  title: c ? "Mute mic before joining" : "Unmute mic before joining",
                  iconOn: /* @__PURE__ */ e(ke, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Ce, { size: 18 }),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                J,
                {
                  on: l,
                  onClick: d,
                  disabled: !L,
                  "aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: l ? "Turn camera off before joining" : "Turn camera on before joining",
                  iconOn: /* @__PURE__ */ e(Me, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Se, { size: 18 }),
                  "data-testid": "prejoin-toggle-video"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i("section", { className: "lg:w-96 flex flex-col", children: [
            /* @__PURE__ */ i("div", { className: "flex-1", children: [
              /* @__PURE__ */ e("h2", { className: "text-2xl font-semibold mb-2", children: "Ready to join?" }),
              /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6", children: T }),
              /* @__PURE__ */ e(Ht, { participants: p, loading: b }),
              g === "pending" && !b && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-warning-fg flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }),
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
                  disabled: P,
                  "data-testid": "prejoin-join-button",
                  children: E
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: x,
                  className: "text-xs text-neutral hover:text-text-primary transition-colors text-center",
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
function Ht({
  participants: t,
  loading: r
}) {
  return r ? /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-xs text-neutral", children: [
    /* @__PURE__ */ e(ye, { size: "sm" }),
    " Checking room…"
  ] }) : !t || t.length === 0 ? null : /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ e("div", { className: "text-xs uppercase tracking-wide text-neutral", children: "In the room" }),
    /* @__PURE__ */ i("ul", { className: "flex flex-col gap-1.5", children: [
      t.slice(0, 8).map((n) => {
        const o = n.displayName ?? n.participantId.slice(0, 8);
        return /* @__PURE__ */ i("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e(we, { name: o, size: 24 }),
          /* @__PURE__ */ e("span", { className: "font-mono text-xs truncate", children: o }),
          /* @__PURE__ */ e(
            re,
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
      t.length > 8 && /* @__PURE__ */ i("li", { className: "text-xs text-neutral", children: [
        "+",
        t.length - 8,
        " more"
      ] })
    ] })
  ] });
}
const Rt = {
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
function Ft() {
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
function yr({
  channelName: t,
  subtitle: r,
  recording: n,
  elapsedLabel: o,
  phase: a,
  actions: c,
  className: l,
  "data-testid": u
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": u,
      className: h(
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white",
        l
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate text-text-primary", children: t }),
          (r || n?.armed || o) && /* @__PURE__ */ i("div", { className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap", children: [
            r && /* @__PURE__ */ e("span", { children: r }),
            n?.armed && /* @__PURE__ */ e(
              re,
              {
                tone: n.active ? "danger" : "neutral",
                size: "xs",
                uppercase: !0,
                dot: n.active ? "pulse" : "static",
                title: n.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
                "data-testid": "hangout-room-header-recording",
                children: "Rec"
              }
            ),
            o && /* @__PURE__ */ e(
              re,
              {
                tone: "neutral",
                size: "xs",
                icon: /* @__PURE__ */ e(Ft, {}),
                title: "Time since you joined this room",
                "data-testid": "hangout-room-header-elapsed",
                children: /* @__PURE__ */ e("span", { className: "tabular-nums", children: o })
              }
            )
          ] })
        ] }),
        (a || c) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
          a && /* @__PURE__ */ e(
            re,
            {
              tone: Rt[a],
              size: "sm",
              dot: a === "reconnecting" ? "pulse" : "static",
              "data-testid": "hangout-room-header-phase",
              children: Dt[a]
            }
          ),
          c
        ] })
      ]
    }
  );
}
const zt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, Wt = {
  sm: 16,
  md: 20,
  lg: 24
};
function Nr({
  audioOn: t,
  videoOn: r,
  screenSharing: n = !1,
  onToggleAudio: o,
  onToggleVideo: a,
  onToggleScreenShare: c,
  onLeave: l,
  audioDisabled: u,
  videoDisabled: d,
  screenShareDisabled: m,
  extras: p,
  leaveLabel: g = "Leave call",
  size: b = "md",
  className: s,
  "data-testid": x
}) {
  const w = b === "lg" ? 22 : b === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": x,
      className: h(
        "flex items-center justify-center gap-3 px-4 py-3",
        s
      ),
      children: [
        /* @__PURE__ */ e(
          J,
          {
            on: t,
            onClick: o,
            disabled: u,
            size: b,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(ke, { size: w }),
            iconOff: /* @__PURE__ */ e(Ce, { size: w }),
            "data-testid": "media-controls-mic"
          }
        ),
        /* @__PURE__ */ e(
          J,
          {
            on: r,
            onClick: a,
            disabled: d,
            size: b,
            "aria-label": r ? "Turn off camera" : "Turn on camera",
            title: r ? "Turn off camera" : "Turn on camera",
            iconOn: /* @__PURE__ */ e(Me, { size: w }),
            iconOff: /* @__PURE__ */ e(Se, { size: w }),
            "data-testid": "media-controls-cam"
          }
        ),
        c && /* @__PURE__ */ e(
          J,
          {
            on: n,
            onClick: c,
            disabled: m,
            size: b,
            offTone: "neutral",
            "aria-label": n ? "Stop sharing screen" : "Share screen",
            title: n ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(It, { size: w }),
            iconOff: /* @__PURE__ */ e(Tt, { size: w }),
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
            className: h(
              "rounded-full grid place-items-center transition-colors duration-150",
              zt[b],
              "bg-danger text-white hover:bg-danger cursor-pointer"
            ),
            children: /* @__PURE__ */ e(At, { size: Wt[b] })
          }
        )
      ]
    }
  );
}
export {
  mr as A,
  ir as B,
  qe as C,
  vt as D,
  pr as E,
  fr as F,
  wr as H,
  Nr as M,
  Ve as N,
  At as P,
  tr as R,
  It as S,
  vr as T,
  er as V,
  Je as a,
  ar as b,
  de as c,
  or as d,
  xr as e,
  J as f,
  yr as g,
  ke as h,
  Ce as i,
  br as j,
  gr as k,
  ur as l,
  rr as m,
  sr as n,
  lr as o,
  ut as p,
  hr as q,
  Tt as r,
  Qt as s,
  nr as t,
  dr as u,
  cr as v,
  Me as w,
  Se as x,
  qt as y,
  Zt as z
};
