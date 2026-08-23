import { jsxs as i, jsx as e, Fragment as ie } from "react/jsx-runtime";
import { useRef as H, useState as T, useEffect as B, useMemo as K, useCallback as $, useImperativeHandle as Pe, useLayoutEffect as Te } from "react";
import { c as h } from "./cn-B6yFEsav.js";
import { P as Ae, S as Be } from "./ReconnectingBanner-CmL6Bm72.js";
import { S as He } from "./Select-DAEcKWg2.js";
import { B as he } from "./Button-DILgRebO.js";
import { A as ke } from "./Avatar-B7O2g50s.js";
import { C as ne } from "./Chip-BDT8ro4h.js";
import { S as Ce, P as $e } from "./PermissionDeniedCard-0XYb6Eju.js";
const Re = {
  idle: "Ready",
  connecting: "Connecting…",
  buffering: "Buffering…",
  playing: "",
  error: "Playback Error"
};
function Qt({
  src: t,
  stream: r,
  autoPlay: n = !1,
  muted: o = !0,
  loop: a = !1,
  controls: s = !1,
  poster: l,
  phase: d,
  className: u,
  style: x,
  onPhaseChange: g,
  onTimeUpdate: v
}) {
  const b = H(null), [w, c] = T("idle"), p = d ?? w;
  B(() => {
    const f = b.current;
    if (!f) return;
    const C = [
      ["waiting", () => {
        c("buffering"), g?.("buffering");
      }],
      ["playing", () => {
        c("playing"), g?.("playing");
      }],
      ["error", () => {
        c("error"), g?.("error");
      }],
      ["loadstart", () => {
        c("connecting"), g?.("connecting");
      }],
      ["timeupdate", () => {
        v?.(f.currentTime, f.duration);
      }]
    ];
    return C.forEach(([L, j]) => f.addEventListener(L, j)), () => C.forEach(([L, j]) => f.removeEventListener(L, j));
  }, [g, v]), B(() => {
    const f = b.current;
    f && r !== void 0 && (f.srcObject = r);
  }, [r]);
  const y = p !== "playing", M = Re[p];
  return /* @__PURE__ */ i(
    "div",
    {
      className: h("relative bg-black rounded-lg overflow-hidden aspect-video", u),
      style: x,
      children: [
        /* @__PURE__ */ e(
          "video",
          {
            ref: b,
            src: r ? void 0 : t,
            autoPlay: n,
            muted: o,
            loop: a,
            controls: s,
            poster: l,
            playsInline: !0,
            className: h("w-full h-full object-contain block")
          }
        ),
        y && M && /* @__PURE__ */ i("div", { className: h("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"), children: [
          p === "buffering" && /* @__PURE__ */ e(De, {}),
          /* @__PURE__ */ e("span", { className: h(p === "buffering" ? "ml-2" : ""), children: M })
        ] })
      ]
    }
  );
}
function De() {
  return /* @__PURE__ */ i("svg", { width: "18", height: "18", viewBox: "0 0 18 18", className: h("animate-spin"), children: [
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "7", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "2" }),
    /* @__PURE__ */ e("path", { d: "M9 2a7 7 0 0 1 7 7", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function Fe(t) {
  return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : t < 1024 * 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)} MB` : `${(t / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function er({
  onClose: t,
  sources: r,
  title: n,
  subtitle: o,
  autoPlay: a = !0,
  muted: s = !1,
  hideDownload: l = !1,
  header: d,
  footer: u,
  className: x
}) {
  const g = K(() => r.filter((c) => !!c.url), [r]), [v, b] = T(0), w = g[v];
  return B(() => {
    const c = (p) => {
      p.key === "Escape" && t();
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
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
          onClick: (c) => c.stopPropagation(),
          className: h(
            "w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            x
          ),
          children: [
            (n || o || d) && /* @__PURE__ */ i("header", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
                n && /* @__PURE__ */ e("h2", { className: "text-sm font-semibold truncate", children: n }),
                o && /* @__PURE__ */ e("p", { className: "text-xs text-[var(--color-text-secondary)] truncate", children: o })
              ] }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
                d,
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
            w ? /* @__PURE__ */ e(
              "video",
              {
                src: w.url,
                controls: !0,
                autoPlay: a,
                muted: s,
                className: "w-full max-h-[70vh] bg-black"
              },
              w.url
            ) : /* @__PURE__ */ e("div", { className: "p-10 text-center text-[var(--color-text-secondary)] text-sm", children: "No playable sources." }),
            g.length > 1 && /* @__PURE__ */ e(
              "nav",
              {
                className: h(
                  "flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]",
                  "text-xs"
                ),
                "aria-label": "Segments",
                children: g.map((c, p) => {
                  const y = p === v;
                  return /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => b(p),
                      className: h(
                        "px-2.5 py-1 rounded transition-colors",
                        y ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"
                      ),
                      "aria-current": y ? "true" : void 0,
                      title: c.sizeBytes != null ? Fe(c.sizeBytes) : void 0,
                      children: c.label || `Segment ${p + 1}`
                    },
                    `${p}:${c.url}`
                  );
                })
              }
            ),
            (u || !l && w) && /* @__PURE__ */ i("footer", { className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]", children: [
              /* @__PURE__ */ e("div", { className: "min-w-0 flex-1 flex items-center gap-2", children: u }),
              !l && w && /* @__PURE__ */ e(
                "a",
                {
                  href: w.url,
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
function We(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} Kbps` : `${t} bps`;
}
function tr({ metrics: t, style: r }) {
  if (!t)
    return /* @__PURE__ */ e("div", { className: h("p-3 bg-surface-inverse rounded-lg text-text-tertiary text-xs"), style: r, children: "No stream data" });
  const n = [
    ["Bitrate", We(t.bitrateBps)],
    ["FPS", `${t.fps}`],
    ["Resolution", `${t.resolution.width}×${t.resolution.height}`],
    ["Packets Lost", `${t.packetsLost}`]
  ];
  return t.jitter !== void 0 && n.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ e("div", { className: h("p-3 bg-surface-inverse rounded-lg text-xs text-code-text"), style: r, children: n.map(([o, a]) => /* @__PURE__ */ i("div", { className: h("flex justify-between py-[3px]"), children: [
    /* @__PURE__ */ e("span", { className: h("text-text-tertiary"), children: o }),
    /* @__PURE__ */ e("span", { className: h("font-mono"), children: a })
  ] }, o)) });
}
const ze = {
  good: "var(--color-success)",
  medium: "var(--color-warning)",
  poor: "var(--color-caution)",
  dead: "var(--color-danger)"
}, Ve = {
  good: "text-success-fg",
  medium: "text-warning-fg",
  poor: "text-caution-fg",
  dead: "text-danger-fg"
}, _e = {
  good: "Good",
  medium: "Fair",
  poor: "Poor",
  dead: "No Connection"
};
function Oe({ quality: t, style: r }) {
  const n = ze[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
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
    /* @__PURE__ */ e("span", { className: Ve[t], children: _e[t] })
  ] });
}
function rr({ participants: t, style: r }) {
  const n = t.length, o = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
  return /* @__PURE__ */ e(
    "div",
    {
      className: h("grid gap-1 bg-video-stage rounded-lg overflow-hidden"),
      style: { gridTemplateColumns: `repeat(${o}, 1fr)`, ...r },
      children: t.map((a) => /* @__PURE__ */ e(
        Ae,
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
function nr({ reactions: t, style: r }) {
  const [n, o] = T([]);
  return B(() => {
    if (t.length === 0) return;
    const a = t[t.length - 1], s = {
      id: a.id + "-" + Date.now(),
      emoji: a.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now()
    };
    o((l) => [...l.slice(-20), s]);
  }, [t]), B(() => {
    const a = setInterval(() => {
      o((s) => s.filter((l) => Date.now() - l.createdAt < 3e3));
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
const Ue = ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯"];
function ir({ onReact: t, emojis: r = Ue, style: n }) {
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
function Xe(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} Mbps` : `${(t / 1e3).toFixed(0)} Kbps`;
}
function Ye(t) {
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}` : `${n}:${String(o).padStart(2, "0")}`;
}
const Ke = {
  live: "bg-success shadow-[0_0_6px_#22c55e]",
  playing: "bg-success shadow-[0_0_6px_#22c55e]",
  connecting: "bg-warning",
  reconnecting: "bg-warning",
  buffering: "bg-warning",
  idle: "bg-surface-emphasis",
  error: "bg-danger"
}, Ge = {
  live: "text-success-fg",
  playing: "text-success-fg",
  connecting: "text-warning-fg",
  reconnecting: "text-warning-fg",
  buffering: "text-warning-fg",
  idle: "text-text-tertiary",
  error: "text-danger-fg"
};
function or({ phase: t, bitrateBps: r, viewerCount: n, duration: o, style: a }) {
  const s = t === "playing" ? "LIVE" : t.toUpperCase();
  return /* @__PURE__ */ i("div", { className: h("inline-flex items-center gap-4 px-4 py-2 bg-surface-inverse rounded-md text-xs text-code-text font-mono"), style: a, children: [
    /* @__PURE__ */ i("span", { className: h("flex items-center gap-1"), children: [
      /* @__PURE__ */ e("span", { className: h("w-[7px] h-[7px] rounded-full", Ke[t] ?? "bg-surface-emphasis") }),
      /* @__PURE__ */ e("span", { className: h("font-semibold", Ge[t] ?? "text-text-tertiary"), children: s })
    ] }),
    r !== void 0 && /* @__PURE__ */ e("span", { children: Xe(r) }),
    o !== void 0 && /* @__PURE__ */ e("span", { children: Ye(o) }),
    n !== void 0 && /* @__PURE__ */ i("span", { className: h("flex items-center gap-[3px]"), children: [
      /* @__PURE__ */ i("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: [
        /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
        /* @__PURE__ */ e("path", { d: "M1 9a4 4 0 0 1 8 0" })
      ] }),
      n
    ] })
  ] });
}
function ar({ count: t, className: r, style: n }) {
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
function Je(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function qe(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function Z({ participant: t, size: r = 32 }) {
  const n = qe(t.displayName);
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
        ) : Je(t.displayName),
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
function Ze({
  participants: t,
  localFallback: r,
  maxVisible: n = 4,
  avatarSize: o = 36,
  testId: a = "call-participant-strip",
  className: s,
  style: l
}) {
  const d = t.slice(0, n), u = Math.max(0, t.length - n), x = t.length === 0 && !!r;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": a,
      "data-count": t.length,
      className: h(
        "flex items-center justify-center gap-2 py-4 px-3 flex-wrap",
        s
      ),
      style: l,
      children: [
        d.map((g) => /* @__PURE__ */ e(Z, { participant: g, size: o }, g.id)),
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
        x && r && /* @__PURE__ */ e(Z, { participant: r, size: o + 4 })
      ]
    }
  );
}
const U = {
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
function Y({
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
      className: h(
        "w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150",
        o && "bg-danger text-white hover:bg-danger",
        n && !o && "bg-white/20 text-white",
        !n && !o && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        s && "opacity-40 cursor-not-allowed"
      ),
      children: t
    }
  );
}
function Qe({
  mode: t,
  isMuted: r = !1,
  isCameraOn: n = !0,
  isScreenSharing: o = !1,
  onToggleMute: a,
  onToggleCamera: s,
  onToggleScreenShare: l,
  onUpgradeToVideo: d,
  onEndCall: u,
  onAddParticipant: x,
  availableParticipants: g,
  currentParticipantIds: v,
  onOpenAddParticipant: b,
  className: w
}) {
  const [c, p] = T(!1), y = new Set(v ?? []), M = (g ?? []).filter((f) => !y.has(f.id));
  return /* @__PURE__ */ i("div", { className: h("flex flex-col", w), children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center justify-center gap-2 px-3 pb-3",
        "data-testid": "call-controls",
        children: [
          /* @__PURE__ */ e(
            Y,
            {
              icon: r ? U.micOff : U.mic,
              label: r ? "Unmute" : "Mute",
              active: r,
              onClick: a,
              testId: "mute-button"
            }
          ),
          t === "video" && /* @__PURE__ */ e(
            Y,
            {
              icon: n ? U.camera : U.cameraOff,
              label: n ? "Turn off camera" : "Turn on camera",
              active: !n,
              onClick: s,
              testId: "camera-button"
            }
          ),
          t === "audio" && d && /* @__PURE__ */ e(
            Y,
            {
              icon: U.videoUpgrade,
              label: "Switch to video",
              onClick: d,
              testId: "upgrade-to-video-button"
            }
          ),
          /* @__PURE__ */ e(
            Y,
            {
              icon: U.screenShare,
              label: o ? "Stop sharing" : "Share screen",
              active: o,
              onClick: l,
              testId: "screenshare-button"
            }
          ),
          (x || b) && /* @__PURE__ */ e(
            Y,
            {
              icon: U.userPlus,
              label: "Add people to this call",
              active: c,
              onClick: b || (() => p((f) => !f)),
              testId: "add-participant-button"
            }
          ),
          /* @__PURE__ */ e(
            Y,
            {
              icon: U.phoneEnd,
              label: "End call",
              danger: !0,
              onClick: u,
              testId: "hangup-button"
            }
          )
        ]
      }
    ),
    c && x && !b && /* @__PURE__ */ i(
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
                onClick: () => p(!1),
                className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
                "aria-label": "Close add-participant picker",
                children: "✕"
              }
            )
          ] }),
          M.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 pb-2.5 text-xs text-white/40 text-center", children: "Everyone is already in the call" }) : /* @__PURE__ */ e("div", { className: "max-h-[120px] overflow-y-auto pb-1", children: M.map((f) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
              onClick: () => {
                x(f.id), M.length <= 1 && p(!1);
              },
              children: [
                /* @__PURE__ */ e(Z, { participant: f, size: 22 }),
                /* @__PURE__ */ e("span", { className: "text-xs text-white/80", children: f.displayName }),
                /* @__PURE__ */ e("span", { className: "ml-auto text-[10px] text-primary-fg", children: "+ Add" })
              ]
            },
            f.id
          )) })
        ]
      }
    )
  ] });
}
function et(t) {
  return t ? t.networkQuality !== void 0 || t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0 : !1;
}
const tt = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2"
};
function rt(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)} Mb/s` : `${Math.round(t)} kb/s`;
}
function fe({
  stats: t,
  position: r = "top-left",
  testId: n = "call-stats-overlay",
  className: o,
  style: a
}) {
  return et(t) ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": n,
      className: h(
        "absolute z-10 pointer-events-none",
        tt[r],
        "flex flex-col gap-1.5",
        o
      ),
      style: a,
      children: [
        t.networkQuality && /* @__PURE__ */ e(Oe, { quality: t.networkQuality }),
        (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "call-stats-overlay-metrics",
            className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
            children: [
              t.bitrateKbps !== void 0 && /* @__PURE__ */ i("span", { "data-testid": "call-stats-bitrate", children: [
                /* @__PURE__ */ e("span", { className: "text-white/50 mr-1.5", children: "bitrate" }),
                rt(t.bitrateKbps)
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
function de(t) {
  const r = Math.floor(t / 60), n = t % 60;
  return `${r}:${n.toString().padStart(2, "0")}`;
}
function me({
  stream: t,
  muted: r = !1,
  className: n
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
      muted: r,
      className: h("w-full h-full object-cover", n)
    }
  );
}
const oe = {
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
function nt({
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
          children: oe.phoneEnd
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
          "aria-label": "Answer call",
          children: oe.phoneAnswer
        }
      )
    ] })
  ] });
}
function it({
  mode: t,
  participants: r,
  localParticipant: n,
  duration: o,
  isMuted: a,
  isCameraOn: s,
  isScreenSharing: l,
  onToggleMute: d,
  onToggleCamera: u,
  onToggleScreenShare: x,
  onUpgradeToVideo: g,
  onAddParticipant: v,
  availableParticipants: b,
  controlsExtras: w,
  onEndCall: c,
  layoutComponent: p,
  callStats: y
}) {
  const M = t === "video" && s;
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    t === "video" && p && /* @__PURE__ */ i("div", { className: "mx-3 mt-3 rounded-lg overflow-hidden relative", children: [
      p,
      /* @__PURE__ */ e(fe, { stats: y, position: "bottom-left" })
    ] }),
    t === "video" && !p && /* @__PURE__ */ i("div", { className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3", children: [
      n?.videoStream && M ? /* @__PURE__ */ e(me, { stream: n.videoStream, muted: !0 }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center bg-surface-inverse", children: n && /* @__PURE__ */ e(Z, { participant: n, size: 48 }) }),
      r.length > 0 && /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse", children: [
        r[0].videoStream ? /* @__PURE__ */ e(me, { stream: r[0].videoStream }) : /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ e(Z, { participant: r[0], size: 28 }) }),
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
      /* @__PURE__ */ e(fe, { stats: y, position: "bottom-left" })
    ] }),
    t === "audio" && /* @__PURE__ */ e(
      Ze,
      {
        participants: r,
        localFallback: n,
        maxVisible: 4,
        avatarSize: 36
      }
    ),
    /* @__PURE__ */ i("div", { className: "text-center py-1.5", children: [
      o !== void 0 && /* @__PURE__ */ e(
        "span",
        {
          className: "text-white/60 text-xs font-mono",
          "data-testid": "call-timer",
          "data-call-duration": o,
          children: de(o)
        }
      ),
      /* @__PURE__ */ i("span", { className: "text-white/40 text-[10px] ml-2", children: [
        r.length + 1,
        " in call"
      ] })
    ] }),
    w ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center pb-1", children: w }) : null,
    /* @__PURE__ */ e(
      Qe,
      {
        mode: t,
        isMuted: a,
        isCameraOn: s,
        isScreenSharing: l,
        onToggleMute: d,
        onToggleCamera: u,
        onToggleScreenShare: x,
        onUpgradeToVideo: g,
        onEndCall: c,
        onAddParticipant: v,
        availableParticipants: b,
        currentParticipantIds: r.map((f) => f.id)
      }
    )
  ] });
}
function ot({
  state: t,
  mode: r,
  duration: n,
  isMuted: o,
  callerName: a,
  onToggleMute: s,
  onEndCall: l,
  onExpand: d
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
      onClick: d,
      role: "button",
      tabIndex: 0,
      "aria-label": "Expand call widget",
      onKeyDown: (u) => u.key === "Enter" && d?.(),
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
          n !== void 0 && /* @__PURE__ */ e(
            "span",
            {
              className: "text-white/50 ml-1.5 font-mono",
              "data-testid": "call-timer",
              "data-call-duration": n,
              children: de(n)
            }
          )
        ] }) }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1", onClick: (u) => u.stopPropagation(), children: [
          t === "active" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: s,
              className: h(
                "w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors",
                o ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"
              ),
              "aria-label": o ? "Unmute" : "Mute",
              children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: o ? /* @__PURE__ */ i(ie, { children: [
                /* @__PURE__ */ e("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
                /* @__PURE__ */ e("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
                /* @__PURE__ */ e("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
                /* @__PURE__ */ e("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
              ] }) : /* @__PURE__ */ i(ie, { children: [
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
function at(t) {
  const [r, n] = T({ x: 0, y: 0 }), [o, a] = T(!1), [s, l] = T(!1), d = H(!1), u = H({ x: 0, y: 0 }), x = H({ x: 0, y: 0 }), g = H(null), v = $(
    (y) => {
      t && (d.current = !0, a(!0), l(!1), u.current = { x: y.clientX, y: y.clientY }, x.current = { ...r }, y.preventDefault());
    },
    [t, r]
  ), b = $(() => {
    l(!0), n({ x: 0, y: 0 }), setTimeout(() => l(!1), 200);
  }, []), w = $(
    (y) => {
      const M = g.current;
      if (!M) return;
      const f = M.offsetParent, C = 16;
      let L = window.innerWidth, j = window.innerHeight;
      f && (L = f.clientWidth, j = f.clientHeight);
      const E = M.getBoundingClientRect(), P = f ? f.getBoundingClientRect() : { left: 0, top: 0 };
      let I, A;
      switch (y) {
        case "top-left":
          I = C, A = C;
          break;
        case "top-right":
          I = L - E.width - C, A = C;
          break;
        case "bottom-left":
          I = C, A = j - E.height - C;
          break;
        default:
          I = L - E.width - C, A = j - E.height - C;
          break;
      }
      const W = E.left - P.left - r.x, F = E.top - P.top - r.y;
      l(!0), n({ x: I - W, y: A - F }), setTimeout(() => l(!1), 200);
    },
    [r]
  ), c = H(w);
  c.current = w, B(() => {
    if (!t) return;
    const y = (f) => {
      d.current && n({
        x: x.current.x + (f.clientX - u.current.x),
        y: x.current.y + (f.clientY - u.current.y)
      });
    }, M = () => {
      if (!d.current) return;
      d.current = !1, a(!1);
      const f = g.current;
      if (!f) return;
      const C = f.offsetParent, L = 80;
      let j = window.innerWidth, E = window.innerHeight;
      if (C) {
        const m = C.getBoundingClientRect();
        j = m.width, E = m.height;
      }
      const P = f.getBoundingClientRect(), I = C ? C.getBoundingClientRect() : { left: 0, top: 0 }, A = P.left - I.left, W = P.top - I.top, F = j - (A + P.width), z = E - (W + P.height), O = A < L, V = F < L, N = W < L, S = z < L;
      N && O ? c.current("top-left") : N && V ? c.current("top-right") : S && O ? c.current("bottom-left") : S && V && c.current("bottom-right");
    };
    return document.addEventListener("mousemove", y), document.addEventListener("mouseup", M), () => {
      document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", M);
    };
  }, [t]);
  const p = r.x !== 0 || r.y !== 0;
  return { offset: r, handleMouseDown: v, resetOffset: b, snapToCorner: w, isDragging: o, isAnimating: s, hasMoved: p, widgetRef: g };
}
function lt({
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
function lr({
  state: t,
  mode: r,
  participants: n,
  localParticipant: o,
  callerName: a,
  duration: s,
  isMuted: l = !1,
  isCameraOn: d = !0,
  isScreenSharing: u = !1,
  onAnswer: x,
  onDecline: g,
  onEndCall: v,
  onToggleMute: b,
  onToggleCamera: w,
  onToggleScreenShare: c,
  onUpgradeToVideo: p,
  onAddParticipant: y,
  availableParticipants: M,
  controlsExtras: f,
  onOpenAddParticipant: C,
  onMinimize: L,
  onExpand: j,
  layoutComponent: E,
  callStats: P,
  minimized: I = !1,
  position: A = "bottom-right",
  contained: W = !1,
  draggable: F = !0,
  className: z,
  style: O,
  dataAttrs: V
}) {
  const { offset: N, handleMouseDown: S, resetOffset: m, snapToCorner: k, isDragging: D, isAnimating: _, hasMoved: G, widgetRef: J } = at(F), ue = {};
  if (V)
    for (const [Ee, Q] of Object.entries(V))
      Q != null && Q !== "" && (ue[Ee] = Q);
  const Ie = K(() => {
    switch (A) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  }, [A]);
  return t === "idle" || t === "ended" ? null : /* @__PURE__ */ i(ie, { children: [
    D && /* @__PURE__ */ e(lt, { onSnap: k, contained: W }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: J,
        "data-testid": "call-widget",
        "data-call-state": t,
        className: h(
          W ? "absolute z-50" : "fixed z-[9999]",
          Ie,
          z
        ),
        style: {
          transform: `translate(${N.x}px, ${N.y}px)`,
          transition: _ ? "transform 0.2s ease-out" : void 0,
          ...O
        },
        ...ue,
        children: /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm",
              I ? "w-[260px]" : "w-[320px]"
            ),
            children: [
              !I && /* @__PURE__ */ i(
                "div",
                {
                  className: h(
                    "flex items-center justify-between px-3 py-2 border-b border-white/5",
                    F && "cursor-grab active:cursor-grabbing"
                  ),
                  onMouseDown: S,
                  children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-success" }),
                      /* @__PURE__ */ e("span", { className: "text-white/80 text-xs font-medium", children: r === "video" ? "Video Call" : "Audio Call" })
                    ] }),
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                      G && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: m,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Snap back to corner",
                          title: "Snap back to corner",
                          children: oe.snapBack
                        }
                      ),
                      j && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: j,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Expand to window",
                          title: "Expand",
                          "data-testid": "call-widget-expand-button",
                          children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ e("path", { d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) })
                        }
                      ),
                      L && /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          onClick: L,
                          className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
                          "aria-label": "Minimize",
                          children: oe.minimize
                        }
                      )
                    ] })
                  ]
                }
              ),
              I && /* @__PURE__ */ e(
                "div",
                {
                  className: h(F && "cursor-grab active:cursor-grabbing"),
                  onMouseDown: S,
                  children: /* @__PURE__ */ e(
                    ot,
                    {
                      state: t,
                      mode: r,
                      duration: s,
                      isMuted: l,
                      callerName: a,
                      onToggleMute: b,
                      onEndCall: v,
                      onExpand: L
                    }
                  )
                }
              ),
              !I && /* @__PURE__ */ i(ie, { children: [
                t === "ringing" && /* @__PURE__ */ e(
                  nt,
                  {
                    callerName: a,
                    onAnswer: x,
                    onDecline: g
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
                  it,
                  {
                    mode: r,
                    participants: n,
                    localParticipant: o,
                    duration: s,
                    isMuted: l,
                    isCameraOn: d,
                    isScreenSharing: u,
                    onToggleMute: b,
                    onToggleCamera: w,
                    onToggleScreenShare: c,
                    onUpgradeToVideo: p,
                    onAddParticipant: y,
                    availableParticipants: M,
                    onOpenAddParticipant: C,
                    controlsExtras: f,
                    onEndCall: v,
                    layoutComponent: E,
                    callStats: P
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
function sr({
  callerName: t,
  callerAvatarUrl: r,
  context: n,
  mode: o = "started",
  onJoin: a,
  onDismiss: s,
  autoExpireSec: l = 30,
  className: d,
  style: u
}) {
  const [x, g] = T(!0);
  return B(() => {
    if (!l || l <= 0) return;
    const v = setTimeout(() => {
      g(!1), s?.();
    }, l * 1e3);
    return () => clearTimeout(v);
  }, [l, s]), x ? /* @__PURE__ */ i(
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
        d
      ),
      style: u,
      children: [
        /* @__PURE__ */ e(st, { name: t, avatarUrl: r }),
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
                g(!1), s();
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
                g(!1), a();
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
function st({ name: t, avatarUrl: r }) {
  const n = dt(t);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
      style: { background: r ? void 0 : `hsl(${n}, 55%, 45%)` },
      children: [
        r ? /* @__PURE__ */ e("img", { src: r, alt: "", className: "w-full h-full rounded-full object-cover" }) : ct(t),
        /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })
      ]
    }
  );
}
function ct(t) {
  return t.split(" ").map((r) => r[0]).slice(0, 2).join("").toUpperCase();
}
function dt(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = t.charCodeAt(n) + ((r << 5) - r);
  return Math.abs(r) % 360;
}
function xe(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60), a = r > 0 ? String(n).padStart(2, "0") : String(n), s = String(o).padStart(2, "0");
  return r > 0 ? `${r}:${a}:${s}` : `${a}:${s}`;
}
function cr({
  playlistUrl: t,
  poster: r,
  autoPlay: n = !1,
  muted: o = !1,
  onLoadedMetadata: a,
  onTimeUpdate: s,
  onError: l,
  hideDownload: d = !1,
  className: u
}) {
  const x = H(null), g = H(null), [v, b] = T(!1), [w, c] = T(0), [p, y] = T(0), [M, f] = T(1), [C, L] = T(1), [j, E] = T(!1), [P, I] = T(null);
  B(() => {
    const N = x.current;
    if (!N || !t) return;
    if (I(null), E(!0), N.canPlayType("application/vnd.apple.mpegurl"))
      return N.src = t, () => {
        N.removeAttribute("src"), N.load();
      };
    let S = !1;
    return (async () => {
      try {
        const m = (await import(
          /* @vite-ignore */
          "hls.js"
        )).default;
        if (S) return;
        if (!m.isSupported()) {
          I("HLS playback is not supported in this browser."), E(!1);
          return;
        }
        const k = new m({ enableWorker: !0 });
        g.current = k, k.attachMedia(N), k.on(m.Events.MEDIA_ATTACHED, () => k.loadSource(t)), k.on(m.Events.ERROR, (D, _) => {
          _.fatal && (I(`HLS error: ${_.type}`), l?.(new Error(`HLS fatal: ${_.type}`)));
        });
      } catch (m) {
        if (S) return;
        I(`Failed to load hls.js — install it in the consumer app: ${m?.message ?? m}`);
      }
    })(), () => {
      if (S = !0, g.current) {
        try {
          g.current.destroy();
        } catch {
        }
        g.current = null;
      }
    };
  }, [t, l]);
  const A = () => {
    const N = x.current;
    N && (N.paused ? N.play().catch(() => {
    }) : N.pause());
  }, W = (N) => {
    const S = x.current;
    !S || !isFinite(p) || p <= 0 || (S.currentTime = Number(N.target.value));
  }, F = (N) => {
    const S = x.current;
    if (!S) return;
    const m = Number(N.target.value);
    S.volume = m, f(m);
  }, z = (N) => {
    const S = x.current;
    if (!S) return;
    const m = Number(N.target.value);
    S.playbackRate = m, L(m);
  }, O = () => {
    const N = x.current;
    N && (document.fullscreenElement ? document.exitFullscreen() : N.requestFullscreen?.());
  }, V = K(
    () => p > 0 ? Math.min(100, w / p * 100) : 0,
    [w, p]
  );
  return /* @__PURE__ */ i("div", { className: h("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", u), children: [
    /* @__PURE__ */ e(
      "video",
      {
        ref: x,
        autoPlay: n,
        muted: o,
        poster: r,
        playsInline: !0,
        className: "w-full h-full object-contain",
        onPlay: () => b(!0),
        onPause: () => b(!1),
        onLoadedMetadata: (N) => {
          const S = N.currentTarget;
          y(S.duration), E(!1), a?.(S.duration);
        },
        onTimeUpdate: (N) => {
          const S = N.currentTarget;
          c(S.currentTime), s?.(S.currentTime, S.duration);
        },
        onWaiting: () => E(!0),
        onCanPlay: () => E(!1),
        onError: () => {
          I("Playback error."), l?.(new Error("video element error")), E(!1);
        }
      }
    ),
    j && !P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm", children: "Loading…" }),
    P && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center", children: P }),
    /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12", children: xe(w) }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: 0,
            max: isFinite(p) ? p : 0,
            step: 0.1,
            value: w,
            onChange: W,
            className: "flex-1 h-1 accent-white/90 cursor-pointer",
            style: { "--progress": `${V}%` }
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-white text-xs tabular-nums w-12 text-right", children: xe(p) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: A,
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
              value: M,
              onChange: F,
              className: "w-20 h-1 accent-white/90 cursor-pointer",
              "aria-label": "Volume"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          He,
          {
            size: "sm",
            value: String(C),
            onChange: z,
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
        !d && t && /* @__PURE__ */ e(
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
            onClick: O,
            className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
            "aria-label": "Fullscreen",
            children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" }) })
          }
        )
      ] })
    ] })
  ] });
}
function ut(t) {
  if (!isFinite(t) || t < 0) return "—";
  const r = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = Math.floor(t % 60);
  return r > 0 ? `${r}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
function pe(t) {
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
function ht({ status: t }) {
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
function ft({
  id: t,
  startIso: r,
  durationSec: n,
  participantCount: o,
  thumbnailUrl: a,
  label: s,
  status: l = "ready",
  selected: d,
  onClick: u,
  actions: x,
  className: g
}) {
  const v = typeof u == "function";
  return /* @__PURE__ */ i(
    "div",
    {
      ...v ? {
        role: "button",
        tabIndex: 0,
        onClick: () => u(t),
        onKeyDown: (w) => {
          v && (w.key === "Enter" || w.key === " ") && (w.preventDefault(), u(t));
        },
        "aria-pressed": d ?? !1
      } : {},
      "data-testid": "recording-row",
      "data-recording-id": t,
      "data-status": l,
      className: h(
        "text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors",
        v && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60",
        d ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]",
        g
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
              onError: (w) => {
                w.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center text-white/30", children: /* @__PURE__ */ e("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ e(ht, { status: l }),
          /* @__PURE__ */ e("span", { className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums", children: ut(n) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-[var(--color-text-primary)] truncate", children: s ?? pe(r) }),
          typeof o == "number" && o > 0 && /* @__PURE__ */ i("span", { className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0", children: [
            o,
            " 👥"
          ] })
        ] }),
        s && /* @__PURE__ */ e("div", { className: "mt-0.5 text-xs text-[var(--color-text-secondary)]", children: pe(r) }),
        x && /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "recording-row-actions",
            className: "mt-2 flex items-center gap-1",
            onClick: (w) => w.stopPropagation(),
            children: x
          }
        )
      ]
    }
  );
}
function dr({
  recordings: t,
  selectedId: r,
  onSelect: n,
  loading: o,
  emptyState: a,
  renderActions: s,
  className: l
}) {
  return o ? /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", l), children: [0, 1, 2].map((d) => /* @__PURE__ */ i(
    "div",
    {
      className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
      children: [
        /* @__PURE__ */ e("div", { className: "aspect-video rounded bg-white/5 mb-2" }),
        /* @__PURE__ */ e("div", { className: "h-3 w-2/3 bg-white/5 rounded" })
      ]
    },
    d
  )) }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", l), children: a ?? "No recordings yet." }) : /* @__PURE__ */ e("div", { className: h("flex flex-col gap-2", l), children: t.map((d) => /* @__PURE__ */ e(
    ft,
    {
      id: d.id,
      startIso: d.startIso,
      endIso: d.endIso,
      durationSec: d.durationSec,
      participantCount: d.participantCount,
      thumbnailUrl: d.thumbnailUrl,
      label: d.label,
      status: d.status,
      selected: d.id === r,
      onClick: n,
      actions: s?.(d)
    },
    d.id
  )) });
}
function mt(t) {
  const r = Math.floor(t / 1e3), n = Math.floor(r / 60), o = r % 60;
  return `${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function xt(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    r = r * 31 + t.charCodeAt(n) | 0;
  return Math.abs(r) % 360;
}
function ur({
  status: t,
  segments: r,
  currentTimeMs: n,
  onSeek: o,
  title: a = "Transcript",
  errorMessage: s,
  pendingMessage: l,
  idleState: d,
  className: u
}) {
  const x = H(null), g = K(() => {
    if (!r || n == null) return -1;
    for (let v = 0; v < r.length; v++) {
      const b = r[v];
      if (n >= b.startMs && n < b.endMs) return v;
    }
    return -1;
  }, [r, n]);
  return B(() => {
    if (g < 0 || !x.current) return;
    const v = x.current.querySelector(`[data-seg-index="${g}"]`);
    v && v.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [g]), t === "idle" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: a }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: d ?? "Transcription was not enabled for this recording." })
  ] }) : t === "pending" || t === "processing" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2", children: [
      /* @__PURE__ */ e("span", { children: a }),
      /* @__PURE__ */ e("span", { className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse", "aria-hidden": "true" }),
      /* @__PURE__ */ e("span", { className: "text-xs font-normal text-[var(--color-text-tertiary,#737373)]", children: t === "pending" ? "queued" : "processing" })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: l ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.") })
  ] }) : t === "failed" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2", children: [
      a,
      " — failed"
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: s ?? "Transcript generation failed. Reach out to support if this persists." })
  ] }) : !r || r.length === 0 ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", u), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: a }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: "No audible speech was captured in this recording." })
  ] }) : /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", u), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]", children: [
      a,
      /* @__PURE__ */ i("span", { className: "ml-2 text-xs font-normal text-[var(--color-text-tertiary,#737373)]", children: [
        r.length,
        " segments"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { ref: x, className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2", children: r.map((v, b) => {
      const w = b === g, c = xt(v.speakerId), p = !!o;
      return /* @__PURE__ */ i(
        "div",
        {
          "data-seg-index": b,
          className: h(
            "rounded-md px-3 py-2 transition-colors",
            w ? "bg-[var(--color-surface-active,rgba(255,255,255,0.06))] ring-1 ring-[var(--color-border-focus,#3b82f6)]" : "hover:bg-[var(--color-surface-hover,rgba(255,255,255,0.03))]",
            p && "cursor-pointer"
          ),
          onClick: p ? () => o(v.startMs) : void 0,
          role: p ? "button" : void 0,
          tabIndex: p ? 0 : void 0,
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-baseline gap-2 mb-1", children: [
              /* @__PURE__ */ e(
                "span",
                {
                  className: "text-xs font-semibold",
                  style: { color: `hsl(${c}, 65%, 60%)` },
                  children: v.speakerLabel
                }
              ),
              /* @__PURE__ */ e("span", { className: "text-xs font-mono text-[var(--color-text-tertiary,#737373)]", children: mt(v.startMs) })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-sm text-[var(--color-text-primary)] leading-relaxed", children: v.text })
          ]
        },
        `${v.startMs}-${v.speakerId}-${b}`
      );
    }) })
  ] });
}
function hr({
  status: t,
  markdown: r,
  renderMarkdown: n,
  title: o = "Summary",
  errorMessage: a,
  pendingMessage: s,
  idleState: l,
  className: d
}) {
  return t === "idle" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: o }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: l ?? "No summary generated for this recording." })
  ] }) : t === "pending" || t === "processing" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2", children: [
      /* @__PURE__ */ e("span", { children: o }),
      /* @__PURE__ */ e("span", { className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: s ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing." })
  ] }) : t === "failed" ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ i("header", { className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2", children: [
      o,
      " — failed"
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-secondary)]", children: a ?? "Summary generation failed." })
  ] }) : !r || r.trim().length === 0 ? /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", d), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2", children: o }),
    /* @__PURE__ */ e("div", { className: "text-sm text-[var(--color-text-tertiary,#737373)]", children: "No summary content was generated." })
  ] }) : /* @__PURE__ */ i("section", { className: h("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", d), children: [
    /* @__PURE__ */ e("header", { className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]", children: o }),
    /* @__PURE__ */ e("div", { className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]", children: n ? n(r) : /* @__PURE__ */ e("pre", { className: "whitespace-pre-wrap text-sm font-sans text-[var(--color-text-primary)]", children: r }) })
  ] });
}
function fr({
  getVideoElement: t,
  className: r,
  title: n
}) {
  const [o, a] = T(!1), [s, l] = T(!1);
  B(() => {
    l(typeof document < "u" && document.pictureInPictureEnabled === !0);
  }, []), B(() => {
    const x = () => a(!1), g = () => a(!0);
    return document.addEventListener("leavepictureinpicture", x), document.addEventListener("enterpictureinpicture", g), () => {
      document.removeEventListener("leavepictureinpicture", x), document.removeEventListener("enterpictureinpicture", g);
    };
  }, []);
  const d = $(async () => {
    if (s)
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture(), a(!1);
          return;
        }
        const x = t();
        if (!x) return;
        x.disablePictureInPicture = !1, await x.requestPictureInPicture(), a(!0);
      } catch {
      }
  }, [s, t]), u = !s;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: d,
      disabled: u,
      title: n ?? (u ? "Picture-in-Picture not supported" : o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
      "aria-label": o ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
      "aria-pressed": o,
      className: h(
        "w-9 h-9 rounded flex items-center justify-center transition-colors",
        u ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white",
        r
      ),
      children: /* @__PURE__ */ e("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" }) })
    }
  );
}
function pt(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
function mr({
  participants: t,
  activeSpeakerId: r,
  onParticipantClick: n,
  count: o,
  title: a = "Participants",
  footer: s,
  className: l
}) {
  const d = o ?? t.length;
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
          /* @__PURE__ */ e("span", { className: "text-xs text-[var(--color-text-secondary)] tabular-nums", children: d })
        ] }),
        /* @__PURE__ */ e("ul", { className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]", children: t.map((u) => {
          const x = u.id === r;
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: n ? () => n(u.id) : void 0,
              className: h(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                "hover:bg-white/[0.03]",
                x && "bg-white/[0.04]",
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
                      x && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"
                    ),
                    children: [
                      u.avatarUrl ? /* @__PURE__ */ e("img", { src: u.avatarUrl, alt: "", className: "w-full h-full rounded-full object-cover" }) : /* @__PURE__ */ e("span", { children: pt(u.displayName) }),
                      u.isScreenSharing && /* @__PURE__ */ e(
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
let ee = null;
function gt() {
  if (ee) return ee;
  try {
    return ee = new AudioContext(), ee;
  } catch {
    return null;
  }
}
function xr({
  localStream: t,
  isMuted: r,
  threshold: n = -45,
  triggerMs: o = 1500,
  cooldownMs: a = 6e3
}) {
  const [s, l] = T(!1);
  return B(() => {
    if (!r || !t || t.getAudioTracks().filter((y) => y.readyState === "live").length === 0) return;
    const u = gt();
    if (!u) return;
    let x, g;
    try {
      x = u.createMediaStreamSource(t), g = u.createAnalyser(), g.fftSize = 512, g.smoothingTimeConstant = 0.6, x.connect(g);
    } catch {
      return;
    }
    let v = null, b = 0, w = !1;
    const c = new Float32Array(g.frequencyBinCount), p = setInterval(() => {
      if (w) return;
      g.getFloatTimeDomainData(c);
      let y = 0;
      for (let C = 0; C < c.length; C++) y += c[C] * c[C];
      const M = 20 * Math.log10(Math.sqrt(y / c.length)), f = Date.now();
      M > n ? (v == null && (v = f), f - v >= o && f - b > a && (l(!0), b = f, setTimeout(() => {
        w || l(!1);
      }, 3e3), v = null)) : v = null;
    }, 200);
    return () => {
      w = !0, clearInterval(p);
      try {
        x.disconnect();
      } catch {
      }
      try {
        g.disconnect();
      } catch {
      }
    };
  }, [t, r, n, o, a]), B(() => {
    r || l(!1);
  }, [r]), s;
}
const vt = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function bt() {
  if (typeof document > "u") return;
  document.querySelectorAll("video").forEach((r) => {
    if (r.paused) {
      const n = r.play();
      n && typeof n.catch == "function" && n.catch(() => {
      });
    }
  });
}
function pr({
  chipLabel: t = "Tap to unmute",
  chipClassName: r,
  wrapperClassName: n,
  onPlayStateChange: o,
  ...a
}) {
  const [s, l] = T(!1), d = H(null), x = a.videoRef ?? d, g = $(
    (b) => {
      b === "paused-by-autoplay" ? l(!0) : b === "playing" && l(!1), o?.(b);
    },
    [o]
  ), v = $(() => {
    const b = x.current;
    if (b) {
      b.muted = !1;
      const w = b.play();
      w && typeof w.catch == "function" && w.catch(() => {
      });
    }
    bt(), l(!1);
  }, [x]);
  return /* @__PURE__ */ i("div", { className: h("relative h-full w-full", n), children: [
    /* @__PURE__ */ e(
      Be,
      {
        ...a,
        videoRef: x,
        onPlayStateChange: g
      }
    ),
    s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: v,
        className: h(vt, r),
        "data-testid": "autoplay-gate-chip",
        children: t
      }
    ) })
  ] });
}
const ge = 1;
function wt({
  persistKey: t,
  defaults: r,
  debounceMs: n = 200
}) {
  const [o, a] = T(() => {
    if (!t || typeof window > "u") return r;
    try {
      const d = window.localStorage.getItem(t);
      if (!d) return r;
      const u = JSON.parse(d);
      return !u || u.v !== ge ? r : {
        mode: u.mode === "docked" ? "docked" : "mini",
        x: te(u.x, r.x),
        y: te(u.y, r.y),
        width: te(u.width, r.width),
        height: te(u.height, r.height)
      };
    } catch {
      try {
        window.localStorage.removeItem(t);
      } catch {
      }
      return r;
    }
  }), s = H(null);
  B(() => {
    if (!(!t || typeof window > "u"))
      return s.current && clearTimeout(s.current), s.current = setTimeout(() => {
        try {
          const d = { v: ge, ...o };
          window.localStorage.setItem(t, JSON.stringify(d));
        } catch {
        }
      }, n), () => {
        s.current && clearTimeout(s.current);
      };
  }, [t, o, n]);
  const l = $((d) => {
    a((u) => ({ ...u, ...d }));
  }, []);
  return { state: o, setState: l };
}
function te(t, r) {
  return typeof t == "number" && Number.isFinite(t) ? t : r;
}
const le = 320, se = 200, yt = 640, Nt = 400, kt = 1440, Ct = 900, ve = 960, be = 600, R = 8;
function gr({
  title: t,
  subtitle: r,
  durationSeconds: n,
  children: o,
  controls: a,
  defaultMode: s = "mini",
  onModeChange: l,
  persistKey: d,
  apiRef: u,
  defaultCorner: x = "bottom-right",
  expandable: g = !0,
  zIndex: v = 9999,
  className: b
}) {
  const w = K(() => s === "docked" ? we(ve, be) : ye(x), [s, x]), { state: c, setState: p } = wt({
    persistKey: d,
    defaults: {
      mode: s,
      x: w.x,
      y: w.y,
      width: ve,
      height: be
    }
  }), [y, M] = T(!1), f = y ? "fullscreen" : c.mode, C = H(null), L = H(!1);
  B(() => {
    const m = () => {
      !((document.fullscreenElement ?? document.webkitFullscreenElement) === C.current) && y && (M(!1), L.current || p({ mode: "docked" }), L.current = !1);
    };
    return document.addEventListener("fullscreenchange", m), document.addEventListener("webkitfullscreenchange", m), () => {
      document.removeEventListener("fullscreenchange", m), document.removeEventListener("webkitfullscreenchange", m);
    };
  }, [y, p]);
  const j = $(() => {
    const m = C.current;
    if (!m) return;
    const k = m.requestFullscreen?.bind(m) ?? m.webkitRequestFullscreen?.bind(m);
    if (!k) return;
    const D = k();
    D && typeof D.then == "function" ? D.then(
      () => M(!0),
      () => {
      }
    ) : M(!0);
  }, []), E = $(() => {
    if (!(document.fullscreenElement ?? document.webkitFullscreenElement)) return;
    L.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {
    });
  }, []), P = $((m) => {
    if (m !== f) {
      if (m === "fullscreen") {
        j();
        return;
      }
      if (f === "fullscreen") {
        E(), p({ mode: m });
        return;
      }
      if (m === "docked" && f === "mini") {
        const k = we(c.width, c.height);
        p({ mode: m, x: k.x, y: k.y });
        return;
      }
      if (m === "mini" && f === "docked") {
        const k = ye(x);
        p({ mode: m, x: k.x, y: k.y });
        return;
      }
      p({ mode: m });
    }
  }, [f, j, E, p, c.width, c.height, x]);
  B(() => {
    l?.(f);
  }, [f, l]), Pe(u, () => ({ mode: f, setMode: P }), [f, P]);
  const I = H(null), A = $((m) => {
    f === "docked" && (m.target.closest("button") || (m.currentTarget.setPointerCapture(m.pointerId), I.current = {
      startX: m.clientX,
      startY: m.clientY,
      origX: c.x,
      origY: c.y
    }));
  }, [f, c.x, c.y]), W = $((m) => {
    const k = I.current;
    if (!k) return;
    const D = m.clientX - k.startX, _ = m.clientY - k.startY, G = re(k.origX + D, c.width, window.innerWidth), J = re(k.origY + _, c.height, window.innerHeight);
    p({ x: G, y: J });
  }, [p, c.width, c.height]), F = $((m) => {
    m.currentTarget.releasePointerCapture(m.pointerId), I.current = null;
  }, []), z = H(null), O = $((m) => {
    f === "docked" && (m.stopPropagation(), m.currentTarget.setPointerCapture(m.pointerId), z.current = {
      startX: m.clientX,
      startY: m.clientY,
      origW: c.width,
      origH: c.height
    });
  }, [f, c.width, c.height]), V = $((m) => {
    const k = z.current;
    if (!k) return;
    const D = m.clientX - k.startX, _ = m.clientY - k.startY, G = ce(k.origW + D, yt, Math.min(kt, window.innerWidth - R * 2)), J = ce(k.origH + _, Nt, Math.min(Ct, window.innerHeight - R * 2));
    p({ width: G, height: J });
  }, [p]), N = $((m) => {
    m.currentTarget.releasePointerCapture(m.pointerId), z.current = null;
  }, []);
  Te(() => {
    if (f !== "docked") return;
    const m = () => {
      const k = re(c.x, c.width, window.innerWidth), D = re(c.y, c.height, window.innerHeight);
      (k !== c.x || D !== c.y) && p({ x: k, y: D });
    };
    return window.addEventListener("resize", m), () => window.removeEventListener("resize", m);
  }, [f, c.x, c.y, c.width, c.height, p]);
  const S = K(() => f === "fullscreen" ? {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: v
  } : f === "docked" ? {
    position: "fixed",
    left: c.x,
    top: c.y,
    width: c.width,
    height: c.height,
    zIndex: v
  } : {
    position: "fixed",
    left: c.x,
    top: c.y,
    width: le,
    height: se,
    zIndex: v
  }, [f, c.x, c.y, c.width, c.height, v]);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: C,
      "data-call-widget-mode": f,
      style: S,
      className: h(
        "flex flex-col bg-surface-inverse text-white shadow-2xl overflow-hidden border border-white/10",
        f === "fullscreen" ? "rounded-none" : "rounded-lg",
        b
      ),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none",
              f === "docked" ? "cursor-grab active:cursor-grabbing" : ""
            ),
            onPointerDown: A,
            onPointerMove: W,
            onPointerUp: F,
            onPointerCancel: F,
            children: [
              /* @__PURE__ */ i("div", { className: "min-w-0 flex items-center gap-2 text-xs text-white/80", children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-success", "aria-hidden": !0 }),
                /* @__PURE__ */ e("span", { className: "truncate font-medium", children: t }),
                r && /* @__PURE__ */ e("span", { className: "truncate text-white/50", children: r }),
                n !== void 0 && /* @__PURE__ */ e(
                  "span",
                  {
                    className: "font-mono text-white/60",
                    "data-testid": "call-timer",
                    "data-call-duration": n,
                    children: de(n)
                  }
                )
              ] }),
              g && /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e(
                  ae,
                  {
                    active: f === "mini",
                    label: "Mini",
                    onClick: () => P("mini"),
                    testId: "call-widget-mode-mini",
                    children: /* @__PURE__ */ e(Mt, {})
                  }
                ),
                /* @__PURE__ */ e(
                  ae,
                  {
                    active: f === "docked",
                    label: "Window",
                    onClick: () => P("docked"),
                    testId: "call-widget-mode-docked",
                    children: /* @__PURE__ */ e(St, {})
                  }
                ),
                /* @__PURE__ */ e(
                  ae,
                  {
                    active: f === "fullscreen",
                    label: "Fullscreen",
                    onClick: () => P(f === "fullscreen" ? "docked" : "fullscreen"),
                    testId: "call-widget-mode-fullscreen",
                    children: /* @__PURE__ */ e(Lt, {})
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative flex-1 min-h-0 bg-black", children: o }),
        a && /* @__PURE__ */ e("div", { className: "border-t border-white/5 px-2 py-2 bg-video-tile", children: a }),
        f === "docked" && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
            onPointerDown: O,
            onPointerMove: V,
            onPointerUp: N,
            onPointerCancel: N,
            "data-testid": "call-widget-resize-handle",
            "aria-label": "Resize call widget",
            children: /* @__PURE__ */ e("svg", { viewBox: "0 0 16 16", className: "w-full h-full text-white/30", children: /* @__PURE__ */ e("path", { d: "M14 10v4h-4M14 6v8M10 14h4", stroke: "currentColor", strokeWidth: "1.5", fill: "none" }) })
          }
        )
      ]
    }
  );
}
function ae({
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
function Mt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "6.5", y: "6.5", width: "4", height: "3", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function St() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("rect", { x: "1.5", y: "2.5", width: "9", height: "7", stroke: "currentColor", strokeWidth: "1.2" }) });
}
function Lt() {
  return /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ e("path", { d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) });
}
function we(t, r) {
  return typeof window > "u" ? { x: 16, y: 16 } : {
    x: Math.max(R, Math.floor((window.innerWidth - t) / 2)),
    y: Math.max(R, Math.floor((window.innerHeight - r) / 2))
  };
}
function ye(t) {
  if (typeof window > "u") return { x: 16, y: 16 };
  const r = window.innerWidth, n = window.innerHeight;
  switch (t) {
    case "top-left":
      return { x: R, y: R };
    case "top-right":
      return { x: r - le - R, y: R };
    case "bottom-left":
      return { x: R, y: n - se - R };
    default:
      return { x: r - le - R, y: n - se - R };
  }
}
function ce(t, r, n) {
  return Math.max(r, Math.min(n, t));
}
function re(t, r, n) {
  return ce(t, R, Math.max(R, n - r - R));
}
function vr({ show: t, label: r }) {
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
function br({
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
const Ne = [
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb7185"
];
function jt(t) {
  let r = 0;
  for (let n = 0; n < t.length; n++) r = r * 31 + t.charCodeAt(n) | 0;
  return Ne[Math.abs(r) % Ne.length];
}
function wr({
  lines: t,
  maxLines: r = 3,
  fadeAfterMs: n = 8e3,
  className: o
}) {
  const a = Date.now(), s = t.slice(-r).map((l) => {
    const d = a - new Date(l.at).getTime(), u = Math.max(0.35, 1 - d / n);
    return { ...l, opacity: u };
  }).filter((l) => l.opacity > 0);
  return s.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20",
        "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm",
        o
      ),
      "aria-live": "polite",
      "aria-label": "Live transcript",
      children: s.map((l) => /* @__PURE__ */ i(
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
                style: { color: jt(l.speakerId) },
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
const It = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, Et = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Pt = "bg-surface-hover text-neutral hover:bg-surface-emphasis", Tt = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function q({
  on: t,
  iconOn: r,
  iconOff: n,
  "aria-label": o,
  offTone: a = "danger",
  size: s = "md",
  disabled: l,
  className: d,
  ...u
}) {
  const x = t ? Et : a === "danger" ? Tt : Pt;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": o,
      "aria-pressed": t,
      disabled: l,
      className: h(
        "rounded-full grid place-items-center transition-colors duration-150",
        It[s],
        x,
        l && "opacity-40 cursor-not-allowed",
        !l && "cursor-pointer",
        d
      ),
      ...u,
      children: t ? r : n
    }
  );
}
function X(t, r) {
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
function Me({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("rect", { x: "9", y: "3", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ e("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Se({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ e("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ e("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
    /* @__PURE__ */ e("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
  ] });
}
function Le({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" }),
    /* @__PURE__ */ e("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" })
  ] });
}
function je({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
    /* @__PURE__ */ e("path", { d: "M22 8l-6 4 6 4V8z" })
  ] });
}
function At({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "20", height: "12", rx: "2" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" }),
    /* @__PURE__ */ e("polyline", { points: "9 10 12 7 15 10" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
  ] });
}
function Bt({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("line", { x1: "3", y1: "3", x2: "21", y2: "21" }),
    /* @__PURE__ */ e("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
    /* @__PURE__ */ e("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
    /* @__PURE__ */ e("line", { x1: "8", y1: "20", x2: "16", y2: "20" }),
    /* @__PURE__ */ e("line", { x1: "12", y1: "16", x2: "12", y2: "20" })
  ] });
}
function Ht({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
    /* @__PURE__ */ e("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "2", x2: "2", y2: "22" })
  ] });
}
function yr({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...r, children: [
    /* @__PURE__ */ e("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ e("line", { x1: "19", y1: "8", x2: "19", y2: "14" }),
    /* @__PURE__ */ e("line", { x1: "22", y1: "11", x2: "16", y2: "11" })
  ] });
}
function Nr({ size: t = 20, ...r }) {
  return /* @__PURE__ */ i("svg", { ...X(t, r), children: [
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ e("circle", { cx: "5", cy: "12", r: "1" })
  ] });
}
function $t(t, r, n) {
  if (n) return "Checking room…";
  if (!r || r === "empty") return "You'll be the first one in this room";
  const o = t?.length ?? 0;
  return r === "ready" ? o === 1 ? "1 person is in this call" : `${o} people are in this call` : o === 1 ? "1 person is joining (connecting…)" : `${o} people are joining (connecting…)`;
}
function Rt(t) {
  return t === "denied" ? "denied" : t === "blocked" ? "blocked" : t === "no-device" ? "no-device" : t === "unavailable" ? "unavailable" : null;
}
function kr({
  channelName: t,
  localIdentity: r,
  previewStream: n,
  permission: o,
  permissionMessage: a,
  audioEnabled: s,
  videoEnabled: l,
  onToggleAudio: d,
  onToggleVideo: u,
  onRetryPermission: x,
  participants: g,
  readyState: v,
  readyLoading: b = !1,
  onJoin: w,
  onCancel: c,
  joinLabel: p,
  joinDisabled: y,
  subtitleOverride: M,
  className: f,
  "data-testid": C
}) {
  const L = H(null);
  B(() => {
    L.current && n && (L.current.srcObject = n);
  }, [n]);
  const j = o === "granted", E = Rt(o), P = y ?? !j, I = p ?? (P && !j ? "Allow camera to join" : "Join now"), A = M ?? $t(g, v, b);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": C,
      className: h(
        "flex flex-col h-full min-h-0 bg-surface-panel text-text-primary",
        f
      ),
      children: [
        /* @__PURE__ */ i("header", { className: "flex items-center justify-between px-6 py-4 border-b border-border bg-white", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("h1", { className: "text-lg font-semibold truncate", children: t }),
            /* @__PURE__ */ e("p", { className: "text-xs text-neutral mt-0.5", children: A })
          ] }),
          /* @__PURE__ */ e(he, { variant: "ghost", size: "sm", onClick: c, children: "Cancel" })
        ] }),
        /* @__PURE__ */ i("main", { className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full", children: [
          /* @__PURE__ */ i("section", { className: "lg:flex-1 min-h-0", children: [
            /* @__PURE__ */ i("div", { className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black", children: [
              n && j && /* @__PURE__ */ e(
                "video",
                {
                  ref: L,
                  autoPlay: !0,
                  playsInline: !0,
                  muted: !0,
                  className: h(
                    "w-full h-full object-cover scale-x-[-1]",
                    !l && "opacity-0"
                  )
                }
              ),
              j && !l && (r ? (
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
                        ke,
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
              o === "pending" && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ e(Ce, { size: "lg" }) }),
              E && /* @__PURE__ */ e("div", { className: "absolute inset-0 grid place-items-center bg-surface-panel/95", children: /* @__PURE__ */ e(
                $e,
                {
                  kind: "camera",
                  state: E,
                  message: a,
                  onRetry: x,
                  "data-testid": "prejoin-permission-card"
                }
              ) })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ e(
                q,
                {
                  on: s,
                  onClick: d,
                  disabled: !j,
                  "aria-label": s ? "Mute mic before joining" : "Unmute mic before joining",
                  title: s ? "Mute mic before joining" : "Unmute mic before joining",
                  iconOn: /* @__PURE__ */ e(Me, { size: 18 }),
                  iconOff: /* @__PURE__ */ e(Se, { size: 18 }),
                  "data-testid": "prejoin-toggle-audio"
                }
              ),
              /* @__PURE__ */ e(
                q,
                {
                  on: l,
                  onClick: u,
                  disabled: !j,
                  "aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
                  title: l ? "Turn camera off before joining" : "Turn camera on before joining",
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
              /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6", children: A }),
              /* @__PURE__ */ e(Dt, { participants: g, loading: b }),
              v === "pending" && !b && /* @__PURE__ */ i("p", { className: "mt-4 text-xs text-warning-fg flex items-center gap-2", children: [
                /* @__PURE__ */ e("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }),
                "Other publishers are still connecting — you can join anyway."
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ e(
                he,
                {
                  variant: "primary",
                  size: "lg",
                  onClick: () => w({ audio: s, video: l }),
                  disabled: P,
                  "data-testid": "prejoin-join-button",
                  children: I
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: c,
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
function Dt({
  participants: t,
  loading: r
}) {
  return r ? /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-xs text-neutral", children: [
    /* @__PURE__ */ e(Ce, { size: "sm" }),
    " Checking room…"
  ] }) : !t || t.length === 0 ? null : /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ e("div", { className: "text-xs uppercase tracking-wide text-neutral", children: "In the room" }),
    /* @__PURE__ */ i("ul", { className: "flex flex-col gap-1.5", children: [
      t.slice(0, 8).map((n) => {
        const o = n.displayName ?? n.participantId.slice(0, 8);
        return /* @__PURE__ */ i("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e(ke, { name: o, size: 24 }),
          /* @__PURE__ */ e("span", { className: "font-mono text-xs truncate", children: o }),
          /* @__PURE__ */ e(
            ne,
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
const Ft = {
  idle: "neutral",
  joining: "warning",
  joined: "success",
  reconnecting: "warning",
  ended: "neutral",
  failed: "danger"
}, Wt = {
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
function Cr({
  channelName: t,
  subtitle: r,
  recording: n,
  elapsedLabel: o,
  phase: a,
  actions: s,
  className: l,
  "data-testid": d
}) {
  return /* @__PURE__ */ i(
    "header",
    {
      "data-testid": d,
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
              ne,
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
        (a || s) && /* @__PURE__ */ i("div", { className: "flex items-center gap-3 shrink-0", children: [
          a && /* @__PURE__ */ e(
            ne,
            {
              tone: Ft[a],
              size: "sm",
              dot: a === "reconnecting" ? "pulse" : "static",
              "data-testid": "hangout-room-header-phase",
              children: Wt[a]
            }
          ),
          s
        ] })
      ]
    }
  );
}
const Vt = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14"
}, _t = {
  sm: 16,
  md: 20,
  lg: 24
};
function Mr({
  audioOn: t,
  videoOn: r,
  screenSharing: n = !1,
  onToggleAudio: o,
  onToggleVideo: a,
  onToggleScreenShare: s,
  onLeave: l,
  audioDisabled: d,
  videoDisabled: u,
  screenShareDisabled: x,
  extras: g,
  leaveLabel: v = "Leave call",
  size: b = "md",
  className: w,
  "data-testid": c
}) {
  const p = b === "lg" ? 22 : b === "sm" ? 16 : 18;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": c,
      className: h(
        "flex items-center justify-center gap-3 px-4 py-3",
        w
      ),
      children: [
        /* @__PURE__ */ e(
          q,
          {
            on: t,
            onClick: o,
            disabled: d,
            size: b,
            "aria-label": t ? "Mute microphone" : "Unmute microphone",
            title: t ? "Mute microphone" : "Unmute microphone",
            iconOn: /* @__PURE__ */ e(Me, { size: p }),
            iconOff: /* @__PURE__ */ e(Se, { size: p }),
            "data-testid": "media-controls-mic"
          }
        ),
        /* @__PURE__ */ e(
          q,
          {
            on: r,
            onClick: a,
            disabled: u,
            size: b,
            "aria-label": r ? "Turn off camera" : "Turn on camera",
            title: r ? "Turn off camera" : "Turn on camera",
            iconOn: /* @__PURE__ */ e(Le, { size: p }),
            iconOff: /* @__PURE__ */ e(je, { size: p }),
            "data-testid": "media-controls-cam"
          }
        ),
        s && /* @__PURE__ */ e(
          q,
          {
            on: n,
            onClick: s,
            disabled: x,
            size: b,
            offTone: "neutral",
            "aria-label": n ? "Stop sharing screen" : "Share screen",
            title: n ? "Stop sharing screen" : "Share screen",
            iconOn: /* @__PURE__ */ e(At, { size: p }),
            iconOff: /* @__PURE__ */ e(Bt, { size: p }),
            "data-testid": "media-controls-screenshare"
          }
        ),
        g,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: l,
            "aria-label": v,
            title: v,
            "data-testid": "media-controls-leave",
            className: h(
              "rounded-full grid place-items-center transition-colors duration-150",
              Vt[b],
              "bg-danger text-white hover:bg-danger cursor-pointer"
            ),
            children: /* @__PURE__ */ e(Ht, { size: _t[b] })
          }
        )
      ]
    }
  );
}
export {
  pr as A,
  ar as B,
  Qe as C,
  wt as D,
  gr as E,
  xr as F,
  kr as H,
  Mr as M,
  Oe as N,
  Ht as P,
  nr as R,
  At as S,
  wr as T,
  yr as U,
  rr as V,
  Ze as a,
  sr as b,
  fe as c,
  lr as d,
  vr as e,
  q as f,
  Cr as g,
  Me as h,
  Se as i,
  Nr as j,
  br as k,
  fr as l,
  ir as m,
  dr as n,
  cr as o,
  ft as p,
  mr as q,
  Bt as r,
  tr as s,
  or as t,
  hr as u,
  ur as v,
  Le as w,
  je as x,
  Qt as y,
  er as z
};
