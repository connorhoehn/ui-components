import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { t as n } from "./Button-CTpms90-.js";
import { t as r } from "./overlayStack-8srL4FsO.js";
import { t as i } from "./Chip-Cie-j-4o.js";
import { t as a } from "./Modal-DfKwlGxh.js";
import { n as o, t as s } from "./PermissionDeniedCard-5FQ6reO7.js";
import { n as c, r as l, t as u } from "./focusTrap-CPpSEdvJ.js";
import { a as d, t as f } from "./Avatar-Yxs_9Jio.js";
import { t as p } from "./activationKey-CjbL3LUv.js";
import { t as m } from "./Select-CqVokE2v.js";
import { m as h, o as g } from "./MediaEffectsPreviewPanel-Alkfwgwk.js";
import { useCallback as _, useEffect as v, useImperativeHandle as y, useLayoutEffect as b, useMemo as x, useRef as S, useState as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var D = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function O({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = S(null), [m, h] = C("idle"), g = c ?? m;
	v(() => {
		let e = p.current;
		if (!e) return;
		let t = [
			["waiting", () => {
				h("buffering"), d?.("buffering");
			}],
			["playing", () => {
				h("playing"), d?.("playing");
			}],
			["error", () => {
				h("error"), d?.("error");
			}],
			["loadstart", () => {
				h("connecting"), d?.("connecting");
			}],
			["timeupdate", () => {
				f?.(e.currentTime, e.duration);
			}]
		];
		return t.forEach(([t, n]) => e.addEventListener(t, n)), () => t.forEach(([t, n]) => e.removeEventListener(t, n));
	}, [d, f]), v(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let _ = g !== "playing", y = D[g];
	return /* @__PURE__ */ E("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ T("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), _ && y && /* @__PURE__ */ E("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ T(k, {}), /* @__PURE__ */ T("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: y
			})]
		})]
	});
}
function k() {
	return /* @__PURE__ */ E("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ T("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ T("path", {
			d: "M9 2a7 7 0 0 1 7 7",
			fill: "none",
			stroke: "#fff",
			strokeWidth: "2",
			strokeLinecap: "round"
		})]
	});
}
//#endregion
//#region src/components/video/VideoPlayerModal.tsx
function A(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function j({ onClose: t, sources: n, title: i, subtitle: a, autoPlay: o = !0, muted: s = !1, hideDownload: d = !1, header: f, footer: p, className: m }) {
	let h = x(() => n.filter((e) => !!e.url), [n]), [g, _] = C(0), y = h[g], b = S(null), w = S(null), D = r(!0);
	return v(() => {
		let e = (e) => {
			if (D()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				l(e, b.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, D]), v(() => (w.current = typeof document < "u" ? document.activeElement : null, u(b.current), () => {
		c(w.current), w.current = null;
	}), []), /* @__PURE__ */ T("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": i || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ E("div", {
			ref: b,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", m),
			children: [
				(i || a || f) && /* @__PURE__ */ E("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ E("div", {
						className: "min-w-0 flex-1",
						children: [i && /* @__PURE__ */ T("h2", {
							className: "text-sm font-semibold truncate",
							children: i
						}), a && /* @__PURE__ */ T("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: a
						})]
					}), /* @__PURE__ */ E("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [f, /* @__PURE__ */ T("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				y ? /* @__PURE__ */ T("video", {
					src: y.url,
					controls: !0,
					autoPlay: o,
					muted: s,
					className: "w-full max-h-[70vh] bg-black"
				}, y.url) : /* @__PURE__ */ T("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				h.length > 1 && /* @__PURE__ */ T("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: h.map((t, n) => {
						let r = n === g;
						return /* @__PURE__ */ T("button", {
							type: "button",
							onClick: () => _(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : A(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(p || !d && y) && /* @__PURE__ */ E("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ T("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: p
					}), !d && y && /* @__PURE__ */ T("a", {
						href: y.url,
						download: !0,
						className: "underline hover:text-[var(--color-primary)] shrink-0",
						children: "Download"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/StatsCard.tsx
function M(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function N({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ T("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", M(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ T("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ E("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ T("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ T("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var P = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, F = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, I = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function L({ quality: t, className: n, style: r }) {
	let i = P[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ E("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ T("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ T("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ T("span", {
			className: F[t],
			children: I[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function R({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ T("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ T(h, {
			id: e.id,
			displayName: e.displayName,
			avatarUrl: e.avatarUrl,
			isSpeaking: e.isSpeaking,
			isMuted: e.isMuted,
			isLocal: e.isLocal,
			videoElement: e.videoElement
		}, e.id))
	});
}
//#endregion
//#region src/components/video/ReactionOverlay.tsx
var z = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function B(e) {
	return z[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function V({ reactions: t, className: n, style: r }) {
	let [i, a] = C([]);
	return v(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), v(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ T("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ T("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var H = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function U({ onReact: t, emojis: n = H, className: r, style: i }) {
	return /* @__PURE__ */ T("div", {
		"data-testid": "reaction-picker",
		className: e("flex gap-1 px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border", r),
		style: i,
		children: n.map((n) => {
			let r = B(n);
			return /* @__PURE__ */ T("button", {
				type: "button",
				onClick: () => t(n),
				"aria-label": `React with ${r}`,
				"data-testid": `reaction-option-${r}`,
				className: e("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded", "transition-transform duration-100 hover:bg-white/10 active:scale-125"),
				children: n
			}, n);
		})
	});
}
var W = /* @__PURE__ */ E("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ T("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ T("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ T("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ T("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function G({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, className: o }) {
	let [s, c] = C(!1);
	return /* @__PURE__ */ E("div", {
		className: e("relative inline-flex", o),
		children: [/* @__PURE__ */ T("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": s,
			disabled: a,
			onClick: () => c((e) => !e),
			"data-testid": "reaction-picker-open",
			className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", s ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white", a && "opacity-40 cursor-not-allowed"),
			children: W
		}), s && /* @__PURE__ */ T(U, {
			emojis: n,
			onReact: (e) => {
				t(e), r && c(!1);
			},
			className: e("absolute bottom-full mb-2 z-10 shadow-lg", i === "center" && "left-1/2 -translate-x-1/2", i === "left" && "left-0", i === "right" && "right-0")
		})]
	});
}
//#endregion
//#region src/components/video/PlaybackReactionsLayer.tsx
var K = 3, q = 1500, ee = 200;
function te({ reactions: e, currentTimeMs: t, className: n }) {
	let r = x(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = S(t), a = S([]), [o, s] = C([]);
	return v(() => {
		let e = i.current;
		if (i.current = t, t < e - q) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > K ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), v(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, ee);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ T("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ T(V, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function ne(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function re(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var ie = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, ae = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function oe({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ E("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ E("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ T("span", { className: e("w-[7px] h-[7px] rounded-full", ie[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ T("span", {
					className: e("font-semibold", ae[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ T("span", { children: ne(n) }),
			i !== void 0 && /* @__PURE__ */ T("span", { children: re(i) }),
			r !== void 0 && /* @__PURE__ */ E("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ E("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ T("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ T("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function se({ count: t, className: n, style: r }) {
	let i = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ E("div", {
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ E("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: [/* @__PURE__ */ T("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ T("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ E("span", { children: [i, " watching"] })]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function ce(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function le(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function J({ participant: e, size: t = 32 }) {
	let n = le(e.displayName);
	return /* @__PURE__ */ E("div", {
		"data-testid": "call-avatar",
		"data-speaking": e.isSpeaking ? "true" : void 0,
		"data-muted": e.isMuted ? "true" : void 0,
		className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative",
		style: {
			width: t,
			height: t,
			fontSize: t * .38,
			background: e.avatarUrl ? void 0 : `hsl(${n}, 55%, 45%)`
		},
		children: [
			e.avatarUrl ? /* @__PURE__ */ T("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : ce(e.displayName),
			e.isSpeaking && /* @__PURE__ */ T("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ T("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ E("svg", {
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
						/* @__PURE__ */ T("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ T("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ T("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function ue({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ E("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ T(J, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ E("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ T(J, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var Y = {
	mic: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ T("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ T("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ T("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ T("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ T("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ T("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ T("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ T("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ T("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ T("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ T("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ T("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ T("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ T("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ T("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ T("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ T("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ T("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ T("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	})
};
function X({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s }) {
	return /* @__PURE__ */ T("button", {
		type: "button",
		title: n,
		"aria-label": n,
		disabled: o,
		onClick: a,
		"data-testid": s,
		className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", i && "bg-danger text-white hover:bg-danger", r && !i && "bg-white/20 text-white", !r && !i && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white", o && "opacity-40 cursor-not-allowed"),
		children: t
	});
}
function de({ mode: t, isMuted: n = !1, isCameraOn: r = !0, isScreenSharing: i = !1, onToggleMute: a, onToggleCamera: o, onToggleScreenShare: s, onUpgradeToVideo: c, onEndCall: l, onAddParticipant: u, availableParticipants: d, currentParticipantIds: f, onOpenAddParticipant: p, extras: m, className: h }) {
	let [g, _] = C(!1), v = new Set(f ?? []), y = (d ?? []).filter((e) => !v.has(e.id));
	return /* @__PURE__ */ E("div", {
		className: e("flex flex-col", h),
		children: [/* @__PURE__ */ E("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				a && /* @__PURE__ */ T(X, {
					icon: n ? Y.micOff : Y.mic,
					label: n ? "Unmute" : "Mute",
					active: n,
					onClick: a,
					testId: "mute-button"
				}),
				t === "video" && o && /* @__PURE__ */ T(X, {
					icon: r ? Y.camera : Y.cameraOff,
					label: r ? "Turn off camera" : "Turn on camera",
					active: !r,
					onClick: o,
					testId: "camera-button"
				}),
				t === "audio" && c && /* @__PURE__ */ T(X, {
					icon: Y.videoUpgrade,
					label: "Switch to video",
					onClick: c,
					testId: "upgrade-to-video-button"
				}),
				s && /* @__PURE__ */ T(X, {
					icon: Y.screenShare,
					label: i ? "Stop sharing" : "Share screen",
					active: i,
					onClick: s,
					testId: "screenshare-button"
				}),
				(u || p) && /* @__PURE__ */ T(X, {
					icon: Y.userPlus,
					label: "Add people to this call",
					active: g,
					onClick: p || (() => _((e) => !e)),
					testId: "add-participant-button"
				}),
				m,
				l && /* @__PURE__ */ T(X, {
					icon: Y.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: l,
					testId: "hangup-button"
				})
			]
		}), g && u && !p && /* @__PURE__ */ E("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ T("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ T("button", {
					type: "button",
					onClick: () => _(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), y.length === 0 ? /* @__PURE__ */ T("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ T("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: y.map((e) => /* @__PURE__ */ E("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						u(e.id), y.length <= 1 && _(!1);
					},
					children: [
						/* @__PURE__ */ T(J, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ T("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ T("span", {
							className: "ml-auto text-[10px] text-primary-fg",
							children: "+ Add"
						})
					]
				}, e.id))
			})]
		})]
	});
}
//#endregion
//#region src/components/video/CallStatsOverlay.tsx
function fe(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var pe = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function me(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function he({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return fe(t) ? /* @__PURE__ */ E("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", pe[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ T(L, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ E("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ E("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ T("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), me(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ E("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ T("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ E("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ T("span", {
							className: "text-white/50 mr-1.5",
							children: "loss"
						}),
						t.packetLossPct.toFixed(1),
						"%"
					]
				})
			]
		})]
	}) : null;
}
//#endregion
//#region src/components/video/MediaIcons.tsx
function Z(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		focusable: !1,
		...t
	};
}
function ge({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "11",
				rx: "3"
			}),
			/* @__PURE__ */ T("path", { d: "M5 11a7 7 0 0 0 14 0" }),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ T("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function _e({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ T("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ T("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ T("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
			/* @__PURE__ */ T("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ T("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function ve({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [/* @__PURE__ */ T("path", { d: "M22 8l-6 4 6 4V8z" }), /* @__PURE__ */ T("rect", {
			x: "2",
			y: "6",
			width: "14",
			height: "12",
			rx: "2"
		})]
	});
}
function ye({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ T("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
			/* @__PURE__ */ T("path", { d: "M22 8l-6 4 6 4V8z" })
		]
	});
}
function be({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("rect", {
				x: "2",
				y: "4",
				width: "20",
				height: "12",
				rx: "2"
			}),
			/* @__PURE__ */ T("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			}),
			/* @__PURE__ */ T("polyline", { points: "9 10 12 7 15 10" }),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "7",
				x2: "12",
				y2: "13"
			})
		]
	});
}
function xe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ T("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
			/* @__PURE__ */ T("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
			/* @__PURE__ */ T("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ T("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			})
		]
	});
}
function Se({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
			/* @__PURE__ */ T("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
			/* @__PURE__ */ T("line", {
				x1: "22",
				y1: "2",
				x2: "2",
				y2: "22"
			})
		]
	});
}
function Ce({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...t,
		children: [
			/* @__PURE__ */ T("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ T("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ T("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ T("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	});
}
function we({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("path", { d: "M12 3l1.9 5.1a1 1 0 0 0 .6.6L19.6 10.6a1 1 0 0 1 0 1.9L14.5 14.4a1 1 0 0 0-.6.6L12 20.1a1 1 0 0 1-1.9 0L8.2 15a1 1 0 0 0-.6-.6L2.5 12.5a1 1 0 0 1 0-1.9L7.6 8.7a1 1 0 0 0 .6-.6L10.1 3a1 1 0 0 1 1.9 0z" }),
			/* @__PURE__ */ T("path", { d: "M19 3v4" }),
			/* @__PURE__ */ T("path", { d: "M17 5h4" }),
			/* @__PURE__ */ T("path", { d: "M19 17v4" }),
			/* @__PURE__ */ T("path", { d: "M17 19h4" })
		]
	});
}
function Te({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...Z(e, t),
		children: /* @__PURE__ */ T("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
	});
}
function Ee({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ T("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ T("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
			/* @__PURE__ */ T("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
		]
	});
}
function De({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "14",
				rx: "2"
			}),
			/* @__PURE__ */ T("path", { d: "M10.5 10.2a2.2 2.2 0 1 0 0 3.6" }),
			/* @__PURE__ */ T("path", { d: "M16.5 10.2a2.2 2.2 0 1 0 0 3.6" })
		]
	});
}
function Oe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ E("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ T("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ T("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ T("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSidePanel.tsx
var ke = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, Ae = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function je(e) {
	return e.toggleTestId ?? ke[e.id] ?? `call-side-panel-open-${e.id}`;
}
function Me(e) {
	return e.panelTestId ?? Ae[e.id] ?? `call-side-panel-body-${e.id}`;
}
function Ne(e) {
	return e === "mini" ? "overlay" : "docked";
}
function Pe(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ T(Te, { size: 16 });
		case "people": return /* @__PURE__ */ T(Ee, { size: 16 });
		case "captions": return /* @__PURE__ */ T(De, { size: 16 });
		default: return null;
	}
}
function Fe({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, className: a, "data-testid": o = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ T("div", {
		"data-testid": o,
		className: e("flex items-center gap-1", a),
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let a = t.id === n, o = i || t.disabled === !0;
			return /* @__PURE__ */ E("button", {
				type: "button",
				"aria-label": t.label,
				"aria-pressed": a,
				title: t.label,
				disabled: o,
				"data-testid": je(t),
				"data-active": a ? "true" : "false",
				onClick: () => r?.(a ? null : t.id),
				className: e("relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", a ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white", o ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? Pe(t.id) ?? /* @__PURE__ */ T("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ T("span", {
					"data-testid": `${je(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var Ie = "__legacy__";
function Le({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": f = "call-side-panel" }) {
	let p = Array.isArray(t), m = p ? t : [{
		id: Ie,
		label: s ?? "",
		content: c
	}], h = p ? n ?? null : a ? Ie : null, g = m.find((e) => e.id === h) ?? null;
	if (!g) return null;
	let _ = Ne(i), v = p && m.length > 1;
	return /* @__PURE__ */ E("aside", {
		"data-testid": f,
		"data-call-side-panel-placement": _,
		"data-call-side-panel-tab": p ? g.id : void 0,
		"aria-label": g.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", _ === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ E("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [v ? /* @__PURE__ */ T("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: m.map((t) => {
					let n = t.id === g.id;
					return /* @__PURE__ */ T("button", {
						type: "button",
						role: "tab",
						"aria-selected": n,
						disabled: t.disabled === !0,
						onClick: () => r?.(t.id),
						"data-testid": `call-side-panel-tab-${t.id}`,
						className: e("shrink-0 rounded-full px-3 py-1 text-[13px] font-medium transition-colors", n ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white/90", t.disabled === !0 ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
						children: t.label
					}, t.id);
				})
			}) : /* @__PURE__ */ T("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: g.label
			}), /* @__PURE__ */ T("button", {
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ T("div", {
			role: v ? "tabpanel" : void 0,
			"data-testid": p ? Me(g) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ T(d, {
				hasHeader: !0,
				fillsHeight: !0,
				children: g.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function Re(e) {
	return e === "docked" ? "window" : e;
}
function ze(e) {
	return e === "window" ? "docked" : e;
}
function Be(e) {
	return e ? "mini" : "window";
}
var Ve = /* @__PURE__ */ new Set();
function He(e, t) {
	process.env.NODE_ENV !== "production" && (Ve.has(e) || (Ve.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var Ue = "w-[380px]", We = "w-[480px]", Ge = "h-[480px]";
function Ke(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function qe({ stream: t, muted: n = !1, className: r }) {
	let i = S(null);
	return v(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ T("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var Je = {
	phoneEnd: /* @__PURE__ */ E("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ T("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ T("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ T("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ E("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ T("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ T("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ T("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ T("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ E("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ T("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ T("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	})
};
function Ye({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ E("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ T("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ T("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ T("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ E("div", {
				className: "text-center",
				children: [/* @__PURE__ */ T("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ T("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: Je.phoneEnd
				}), t && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: Je.phoneAnswer
				})]
			})
		]
	});
}
function Xe({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, onAddParticipant: p, availableParticipants: m, onOpenAddParticipant: h, controlsExtras: g, onEndCall: _, layoutComponent: v, callStats: y }) {
	let b = t === "video" && s;
	return /* @__PURE__ */ E("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			t === "video" && v && /* @__PURE__ */ E("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [v, /* @__PURE__ */ T(he, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			t === "video" && !v && /* @__PURE__ */ E("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && b ? /* @__PURE__ */ T(qe, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ T("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ T(J, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ E("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ T(qe, { stream: r[0].videoStream }) : /* @__PURE__ */ T("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ T(J, {
								participant: r[0],
								size: 28
							})
						}), r[0].isMuted && /* @__PURE__ */ T("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ E("svg", {
								width: "9",
								height: "9",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": !0,
								children: [
									/* @__PURE__ */ T("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ T("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ T("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ T(he, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			t === "audio" && /* @__PURE__ */ T("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ T(ue, {
					participants: r,
					localFallback: i,
					maxVisible: 4,
					avatarSize: 36
				})
			}),
			/* @__PURE__ */ E("div", {
				className: "text-center py-1.5 shrink-0",
				children: [a !== void 0 && /* @__PURE__ */ T("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": a,
					children: Ke(a)
				}), /* @__PURE__ */ E("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ T(de, {
				className: n ? "shrink-0" : void 0,
				mode: t,
				isMuted: o,
				isCameraOn: s,
				isScreenSharing: c,
				onToggleMute: l,
				onToggleCamera: u,
				onToggleScreenShare: d,
				onUpgradeToVideo: f,
				onEndCall: _,
				onAddParticipant: p,
				availableParticipants: m,
				onOpenAddParticipant: h,
				currentParticipantIds: r.map((e) => e.id),
				extras: g
			})
		]
	});
}
function Ze({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ E("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? p(c) : void 0,
		children: [
			/* @__PURE__ */ T("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ T("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ T("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ E("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ T("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ke(r)
						})
					]
				})
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ T("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ E(w, { children: [
							/* @__PURE__ */ T("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ T("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ T("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ T("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ T("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ E("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ T("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ T("line", {
							x1: "22",
							y1: "2",
							x2: "2",
							y2: "22"
						})]
					})
				})]
			})
		]
	});
}
function Qe(e) {
	let [t, n] = C({
		x: 0,
		y: 0
	}), [r, i] = C(!1), [a, o] = C(!1), s = S(null), c = _(() => {
		s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 200);
	}, []);
	v(() => () => {
		s.current && clearTimeout(s.current);
	}, []);
	let l = S(!1), u = S({
		x: 0,
		y: 0
	}), d = S({
		x: 0,
		y: 0
	}), f = S(null), p = _((n) => {
		e && (l.current = !0, i(!0), o(!1), u.current = {
			x: n.clientX,
			y: n.clientY
		}, d.current = { ...t }, n.preventDefault());
	}, [e, t]), m = _(() => {
		o(!0), n({
			x: 0,
			y: 0
		}), c();
	}, [c]), h = _((e) => {
		let r = f.current;
		if (!r) return;
		let i = r.offsetParent, a = window.innerWidth, s = window.innerHeight;
		i && (a = i.clientWidth, s = i.clientHeight);
		let l = r.getBoundingClientRect(), u = i ? i.getBoundingClientRect() : {
			left: 0,
			top: 0
		}, d, p;
		switch (e) {
			case "top-left":
				d = 16, p = 16;
				break;
			case "top-right":
				d = a - l.width - 16, p = 16;
				break;
			case "bottom-left":
				d = 16, p = s - l.height - 16;
				break;
			default: d = a - l.width - 16, p = s - l.height - 16;
		}
		let m = l.left - u.left - t.x, h = l.top - u.top - t.y;
		o(!0), n({
			x: d - m,
			y: p - h
		}), c();
	}, [t, c]), g = S(h);
	return g.current = h, v(() => {
		if (!e) return;
		let t = (e) => {
			l.current && n({
				x: d.current.x + (e.clientX - u.current.x),
				y: d.current.y + (e.clientY - u.current.y)
			});
		}, r = () => {
			if (!l.current) return;
			l.current = !1, i(!1);
			let e = f.current;
			if (!e) return;
			let t = e.offsetParent, n = window.innerWidth, r = window.innerHeight;
			if (t) {
				let e = t.getBoundingClientRect();
				n = e.width, r = e.height;
			}
			let a = e.getBoundingClientRect(), o = t ? t.getBoundingClientRect() : {
				left: 0,
				top: 0
			}, s = a.left - o.left, c = a.top - o.top, u = n - (s + a.width), d = r - (c + a.height), p = s < 80, m = u < 80, h = c < 80, _ = d < 80;
			h && p ? g.current("top-left") : h && m ? g.current("top-right") : _ && p ? g.current("bottom-left") : _ && m && g.current("bottom-right");
		};
		return document.addEventListener("mousemove", t), document.addEventListener("mouseup", r), () => {
			document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", r);
		};
	}, [e]), {
		offset: t,
		handleMouseDown: p,
		resetOffset: m,
		snapToCorner: h,
		isDragging: r,
		isAnimating: a,
		hasMoved: t.x !== 0 || t.y !== 0,
		widgetRef: f
	};
}
function $e({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ T("div", {
		className: e(n ? "absolute z-[49]" : "fixed z-[9998]", "inset-0 pointer-events-none"),
		children: [
			{
				id: "top-left",
				classes: "top-3 left-3"
			},
			{
				id: "top-right",
				classes: "top-3 right-3"
			},
			{
				id: "bottom-left",
				classes: "bottom-3 left-3"
			},
			{
				id: "bottom-right",
				classes: "bottom-3 right-3"
			}
		].map(({ id: e, classes: n }) => /* @__PURE__ */ T("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ T("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ T("rect", {
					x: "3",
					y: "3",
					width: "18",
					height: "18",
					rx: "2",
					ry: "2"
				})
			})
		}, e))
	});
}
function et({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: b, onMinimize: S, onExpand: C, layoutComponent: D, callStats: O, displayMode: k, minimized: A, sidePanelTabs: j, activeSidePanelTab: M = null, onSidePanelTabChange: N, sidePanelWidthClassName: P = "w-80", position: F = "bottom-right", contained: I = !1, draggable: L = !0, className: R, style: z, dataAttrs: B }) {
	k !== void 0 && A !== void 0 && He("CallWidget", "minimized");
	let V = k ?? Be(A ?? !1), H = V === "mini", U = j ?? [], W = U.length > 0 && !H && t === "active", G = W && U.some((e) => e.id === M), { offset: K, handleMouseDown: q, resetOffset: ee, snapToCorner: te, isDragging: ne, isAnimating: re, hasMoved: ie, widgetRef: ae } = Qe(L), oe = {};
	if (B) for (let [e, t] of Object.entries(B)) t != null && t !== "" && (oe[e] = t);
	let se = x(() => {
		switch (F) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [F]);
	if (t === "idle" || t === "ended") return null;
	let ce = /* @__PURE__ */ E(w, { children: [
		t === "ringing" && /* @__PURE__ */ T(Ye, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ E("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ T("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ T("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ T(Xe, {
			mode: n,
			fillHeight: G,
			participants: r,
			localParticipant: i,
			duration: o,
			isMuted: s,
			isCameraOn: c,
			isScreenSharing: l,
			onToggleMute: p,
			onToggleCamera: m,
			onToggleScreenShare: h,
			onUpgradeToVideo: g,
			onAddParticipant: _,
			availableParticipants: v,
			onOpenAddParticipant: b,
			controlsExtras: W ? /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T(Fe, {
				tabs: U,
				activeTab: M,
				onTabChange: N
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: D,
			callStats: O
		})
	] });
	return /* @__PURE__ */ E(w, { children: [ne && /* @__PURE__ */ T($e, {
		onSnap: te,
		contained: I
	}), /* @__PURE__ */ T("div", {
		ref: ae,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": V,
		"data-call-widget-mode-legacy": ze(V),
		className: e(I ? "absolute z-50" : "fixed z-[9999]", se, R),
		style: {
			transform: `translate(${K.x}px, ${K.y}px)`,
			transition: re ? "transform 0.2s ease-out" : void 0,
			...z
		},
		...oe,
		children: /* @__PURE__ */ E("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", H ? "w-[260px]" : G ? "w-auto" : Ue),
			"data-call-side-panel-open": G ? "true" : "false",
			children: [
				!H && /* @__PURE__ */ E("div", {
					className: e("flex items-center justify-between px-3 py-2 border-b border-white/5", L && "cursor-grab active:cursor-grabbing"),
					onMouseDown: q,
					children: [/* @__PURE__ */ E("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ T("span", { className: "w-2 h-2 rounded-full bg-success" }), /* @__PURE__ */ T("span", {
							className: "text-white/80 text-xs font-medium",
							"data-testid": "call-widget-title",
							children: n === "video" ? "Video Call" : "Audio Call"
						})]
					}), /* @__PURE__ */ E("div", {
						className: "flex items-center gap-1",
						children: [
							ie && /* @__PURE__ */ T("button", {
								type: "button",
								onClick: ee,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: Je.snapBack
							}),
							C && /* @__PURE__ */ T("button", {
								type: "button",
								onClick: C,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ T("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ T("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							S && /* @__PURE__ */ T("button", {
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: Je.minimize
							})
						]
					})]
				}),
				H && /* @__PURE__ */ T("div", {
					className: e(L && "cursor-grab active:cursor-grabbing"),
					onMouseDown: q,
					children: /* @__PURE__ */ T(Ze, {
						state: t,
						mode: n,
						duration: o,
						isMuted: s,
						callerName: a,
						onToggleMute: p,
						onEndCall: f,
						onExpand: S
					})
				}),
				!H && (G ? /* @__PURE__ */ E("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ T("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: ce
					}), /* @__PURE__ */ T(Le, {
						mode: V,
						tabs: U,
						activeTab: M,
						onTabChange: N,
						widthClassName: P
					})]
				}) : ce)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function tt({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", onJoin: o, onDismiss: s, autoExpireSec: c = 30, className: l, style: u }) {
	let [d, f] = C(!0), p = t(s);
	return v(() => {
		if (!c || c <= 0) return;
		let e = setTimeout(() => {
			f(!1), p();
		}, c * 1e3);
		return () => clearTimeout(e);
	}, [c, p]), d ? /* @__PURE__ */ E("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", l),
		style: u,
		children: [
			/* @__PURE__ */ T(nt, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ E("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ T("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), i && /* @__PURE__ */ T("p", {
					className: "text-xs text-white/60 m-0 truncate",
					children: i
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2",
				children: [s && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: () => {
						f(!1), s();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), o && /* @__PURE__ */ T("button", {
					type: "button",
					onClick: () => {
						f(!1), o();
					},
					className: "text-xs font-semibold bg-success hover:bg-success text-white px-3 py-1.5 rounded",
					"aria-label": "Join call",
					"data-testid": "incoming-call-join",
					children: "Join"
				})]
			})
		]
	}) : null;
}
function nt({ name: e, avatarUrl: t }) {
	let n = it(e);
	return /* @__PURE__ */ E("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ T("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : rt(e), /* @__PURE__ */ T("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function rt(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function it(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function at(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function ot({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = S(null), d = S(null), f = S(s);
	f.current = s;
	let [p, h] = C(!1), [g, _] = C(0), [y, b] = C(0), [w, D] = C(1), [O, k] = C(1), [A, j] = C(!1), [M, N] = C(null);
	v(() => {
		let e = u.current;
		if (!e || !t) return;
		if (N(null), j(!0), e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
			e.removeAttribute("src"), e.load();
		};
		let n = !1;
		return (async () => {
			try {
				let r = (await import(
					/* @vite-ignore */
					"hls.js"
)).default;
				if (n) return;
				if (!r.isSupported()) {
					N("HLS playback is not supported in this browser."), j(!1);
					return;
				}
				let i = new r({ enableWorker: !0 });
				d.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (N(`HLS error: ${t.type}`), f.current?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				N(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
			}
		})(), () => {
			if (n = !0, d.current) {
				try {
					d.current.destroy();
				} catch {}
				d.current = null;
			}
		};
	}, [t]);
	let P = () => {
		let e = u.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, F = (e) => {
		let t = u.current;
		!t || !isFinite(y) || y <= 0 || (t.currentTime = Number(e.target.value));
	}, I = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, D(n);
	}, L = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, k(n);
	}, R = () => {
		let e = u.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, z = x(() => y > 0 ? Math.min(100, g / y * 100) : 0, [g, y]);
	return /* @__PURE__ */ E("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ T("video", {
				ref: u,
				autoPlay: r,
				muted: i,
				poster: n,
				playsInline: !0,
				className: "w-full h-full object-contain",
				onPlay: () => h(!0),
				onPause: () => h(!1),
				onLoadedMetadata: (e) => {
					let t = e.currentTarget;
					b(t.duration), j(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					_(t.currentTime), o?.(t.currentTime, t.duration);
				},
				onWaiting: () => j(!0),
				onCanPlay: () => j(!1),
				onError: () => {
					N("Playback error."), s?.(/* @__PURE__ */ Error("video element error")), j(!1);
				}
			}),
			A && !M && /* @__PURE__ */ T("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			M && /* @__PURE__ */ T("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: M
			}),
			/* @__PURE__ */ E("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ E("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ T("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: at(g)
						}),
						/* @__PURE__ */ T("input", {
							type: "range",
							min: 0,
							max: isFinite(y) ? y : 0,
							step: .1,
							value: g,
							onChange: F,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${z}%` }
						}),
						/* @__PURE__ */ T("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: at(y)
						})
					]
				}), /* @__PURE__ */ E("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ T("button", {
							type: "button",
							onClick: P,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ E("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ T("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ T("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ T("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ T("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ E("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ T("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ T("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: w,
								onChange: I,
								className: "w-20 h-1 accent-white/90 cursor-pointer",
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ T(m, {
							size: "sm",
							value: String(O),
							onChange: L,
							className: "w-auto bg-white/10 hover:bg-white/20 text-white border-transparent focus:bg-white/20 focus:border-transparent",
							"aria-label": "Playback speed",
							options: [
								{
									value: "0.5",
									label: "0.5×"
								},
								{
									value: "1",
									label: "1×"
								},
								{
									value: "1.5",
									label: "1.5×"
								},
								{
									value: "2",
									label: "2×"
								}
							]
						}),
						/* @__PURE__ */ T("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ T("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							onClick: R,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ T("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ T("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/video/RecordingRow.tsx
function st(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function ct(e) {
	if (!e) return "—";
	try {
		let t = new Date(e);
		return new Intl.DateTimeFormat(void 0, {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit"
		}).format(t);
	} catch {
		return e;
	}
}
function lt({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ E("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ T("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ T("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function ut({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ E("div", {
		...f ? {
			role: "button",
			tabIndex: 0,
			onClick: () => l(t),
			onKeyDown: (e) => {
				f && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), l(t));
			},
			"aria-pressed": c ?? !1
		} : {},
		"data-testid": "recording-row",
		"data-recording-id": t,
		"data-status": s,
		className: e("text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors", f && "cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60", c ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40" : "border-[var(--color-border)]", d),
		children: [
			/* @__PURE__ */ E("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ T("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ T("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ T("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ T("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ T(lt, { status: s }),
					/* @__PURE__ */ T("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: st(r)
					})
				]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ T("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? ct(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ E("span", {
					className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0",
					children: [i, " 👥"]
				})]
			}),
			o && /* @__PURE__ */ T("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: ct(n)
			}),
			u && /* @__PURE__ */ T("div", {
				"data-testid": "recording-row-actions",
				className: "mt-2 flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/video/RecordingList.tsx
function dt({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ T("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ E("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ T("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ T("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ T("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ T("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ T(ut, {
			id: e.id,
			startIso: e.startIso,
			endIso: e.endIso,
			durationSec: e.durationSec,
			participantCount: e.participantCount,
			thumbnailUrl: e.thumbnailUrl,
			label: e.label,
			status: e.status,
			selected: e.id === n,
			onClick: r,
			actions: o?.(e)
		}, e.id))
	});
}
//#endregion
//#region src/components/video/TranscriptPanel.tsx
function ft(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function pt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function mt({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, pendingMessage: s, idleState: c, className: l }) {
	let u = S(null), d = x(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return v(() => {
		if (d < 0 || !u.current) return;
		let e = u.current.querySelector(`[data-seg-index="${d}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [d]), t === "idle" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ E("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ T("span", { children: a }),
				/* @__PURE__ */ T("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ T("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-secondary",
			children: s ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", l),
		children: [/* @__PURE__ */ E("header", {
			className: "text-sm font-medium text-danger mb-2",
			children: [a, " — failed"]
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-secondary",
			children: o ?? "Transcript generation failed. Reach out to support if this persists."
		})]
	}) : !n || n.length === 0 ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", l),
		children: [/* @__PURE__ */ E("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ E("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ T("div", {
			ref: u,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === d, a = pt(t.speakerId), o = !!i;
				return /* @__PURE__ */ E("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? p(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${ft(t.startMs)} — ${t.speakerLabel}` : void 0,
					children: [/* @__PURE__ */ E("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ T("span", {
							className: "text-xs font-semibold",
							style: { color: `hsl(${a}, 65%, 60%)` },
							children: t.speakerLabel
						}), /* @__PURE__ */ T("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: ft(t.startMs)
						})]
					}), /* @__PURE__ */ T("p", {
						className: "text-sm text-text-primary leading-relaxed",
						children: t.text
					})]
				}, `${t.startMs}-${t.speakerId}-${n}`);
			})
		})]
	});
}
//#endregion
//#region src/components/video/SummaryPanel.tsx
function ht({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, pendingMessage: o, idleState: s, className: c }) {
	return t === "idle" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-tertiary",
			children: s ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ E("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ T("span", { children: i }), /* @__PURE__ */ T("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-secondary",
			children: o ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", c),
		children: [/* @__PURE__ */ E("header", {
			className: "text-sm font-medium text-danger mb-2",
			children: [i, " — failed"]
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-secondary",
			children: a ?? "Summary generation failed."
		})]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ T("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ E("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", c),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ T("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ T("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function gt({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = C(!1), [o, s] = C(!1);
	v(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), v(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = _(async () => {
		if (o) try {
			if (document.pictureInPictureElement) {
				await document.exitPictureInPicture(), a(!1);
				return;
			}
			let e = t();
			if (!e) return;
			e.disablePictureInPicture = !1, await e.requestPictureInPicture(), a(!0);
		} catch {}
	}, [o, t]), l = !o;
	return /* @__PURE__ */ T("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ T("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ T("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function _t(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function vt({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, tone: s = "light", className: c }) {
	let l = s === "dark", u = i ?? t.length;
	return /* @__PURE__ */ E("aside", {
		className: e("flex flex-col w-64 shrink-0", l ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", c),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ E("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", l ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ T("h3", {
					className: e("text-sm font-semibold", l ? "text-white" : "text-[var(--color-text-primary)]"),
					children: a
				}), /* @__PURE__ */ T("span", {
					className: e("text-xs tabular-nums", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					children: u
				})]
			}),
			/* @__PURE__ */ T("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ T("li", { children: /* @__PURE__ */ E("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ E("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ T("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ T("span", { children: _t(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ T("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ E("span", {
								className: e("flex-1 truncate text-sm", l ? "text-white/90" : "text-[var(--color-text-primary)]"),
								children: [t.displayName, t.isLocal && /* @__PURE__ */ T("span", {
									className: e("ml-1 text-xs", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ T("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ T("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: l ? "text-white/50" : "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ T("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ T("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var yt = null;
function bt() {
	if (yt) return yt;
	try {
		return yt = new AudioContext(), yt;
	} catch {
		return null;
	}
}
function xt({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = C(!1);
	return v(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = bt();
		if (!a) return;
		let s, c;
		try {
			s = a.createMediaStreamSource(e), c = a.createAnalyser(), c.fftSize = 512, c.smoothingTimeConstant = .6, s.connect(c);
		} catch {
			return;
		}
		let l = null, u = 0, d = !1, f = null, p = new Float32Array(c.frequencyBinCount), m = setInterval(() => {
			if (d) return;
			c.getFloatTimeDomainData(p);
			let e = 0;
			for (let t = 0; t < p.length; t++) e += p[t] * p[t];
			let t = 20 * Math.log10(Math.sqrt(e / p.length)), a = Date.now();
			t > n ? (l ??= a, a - l >= r && a - u > i && (o(!0), u = a, f !== null && clearTimeout(f), f = setTimeout(() => {
				f = null, d || o(!1);
			}, 3e3), l = null)) : l = null;
		}, 200);
		return () => {
			d = !0, clearInterval(m), f !== null && (clearTimeout(f), f = null);
			try {
				s.disconnect();
			} catch {}
			try {
				c.disconnect();
			} catch {}
		};
	}, [
		e,
		t,
		n,
		r,
		i
	]), v(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var St = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Ct() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function wt({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = C(!1), c = S(null), l = a.videoRef ?? c, u = _((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = _(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		Ct(), s(!1);
	}, [l]);
	return /* @__PURE__ */ E("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ T(g, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ T("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ T("button", {
				type: "button",
				onClick: d,
				className: e(St, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var Tt = 1;
function Et({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = C(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== Tt ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: Dt(r.x, t.x),
				y: Dt(r.y, t.y),
				width: Dt(r.width, t.width),
				height: Dt(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = S(null), o = S(!1), s = S(r);
	s.current = r;
	let c = S({
		key: e,
		value: r
	}), l = _((e, t) => {
		try {
			let n = {
				v: Tt,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return v(() => {
		if (!(!e || typeof window > "u") && (c.current.key !== e || c.current.value !== r)) return a.current && clearTimeout(a.current), o.current = !0, a.current = setTimeout(() => {
			o.current = !1, l(e, s.current);
		}, n), () => {
			a.current && clearTimeout(a.current);
		};
	}, [
		e,
		r,
		n,
		l
	]), v(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: _((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Dt(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var Ot = 320, kt = 200, At = 640, jt = 400, Mt = 1440, Nt = 900, Pt = 960, Ft = 600, Q = 8;
function It({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", onModeChange: s, persistKey: c, apiRef: l, defaultCorner: u = "bottom-right", expandable: d = !0, sidePanelTabs: f, activeSidePanelTab: p = null, onSidePanelTabChange: m, zIndex: h = 9999, className: g, "data-testid": w = "expandable-call-widget" }) {
	let D = o === "docked" ? "window" : o, O = x(() => D === "window" ? Vt(Pt, Ft) : Ht(u), [D, u]), { state: k, setState: A } = Et({
		persistKey: c,
		defaults: {
			mode: D,
			x: O.x,
			y: O.y,
			width: Pt,
			height: Ft
		}
	}), [j, M] = C(!1), N = j ? "fullscreen" : k.mode, P = S(null), F = f ?? [], I = F.length > 0, L = I && F.some((e) => e.id === p), R = S(!1);
	v(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== P.current && j && (M(!1), R.current || A({ mode: "window" }), R.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [j, A]);
	let z = _(() => {
		let e = P.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => M(!0), () => {}) : M(!0);
	}, []), B = _(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (R.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), V = _((e) => {
		let t = Re(e);
		if (t !== N) {
			if (t === "fullscreen") {
				z();
				return;
			}
			if (N === "fullscreen") {
				B(), A({ mode: t });
				return;
			}
			if (t === "window" && N === "mini") {
				let e = Vt(k.width, k.height);
				A({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && N === "window") {
				let e = Ht(u);
				A({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			A({ mode: t });
		}
	}, [
		N,
		z,
		B,
		A,
		k.width,
		k.height,
		u
	]);
	v(() => {
		s?.(N);
	}, [N, s]), y(l, () => ({
		mode: N,
		setMode: V
	}), [N, V]);
	let H = S(null), U = _((e) => {
		N === "window" && (e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), H.current = {
			startX: e.clientX,
			startY: e.clientY,
			origX: k.x,
			origY: k.y
		}));
	}, [
		N,
		k.x,
		k.y
	]), W = _((e) => {
		let t = H.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Wt(t.origX + n, k.width, window.innerWidth), a = Wt(t.origY + r, k.height, window.innerHeight);
		A({
			x: i,
			y: a
		});
	}, [
		A,
		k.width,
		k.height
	]), G = _((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), H.current = null;
	}, []), K = S(null), q = _((e) => {
		N === "window" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), K.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: k.width,
			origH: k.height
		});
	}, [
		N,
		k.width,
		k.height
	]), ee = _((e) => {
		let t = K.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Ut(t.origW + n, At, Math.min(Mt, window.innerWidth - 16)), a = Ut(t.origH + r, jt, Math.min(Nt, window.innerHeight - 16));
		A({
			width: i,
			height: a
		});
	}, [A]), te = _((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), K.current = null;
	}, []);
	b(() => {
		if (N !== "window") return;
		let e = () => {
			let e = Wt(k.x, k.width, window.innerWidth), t = Wt(k.y, k.height, window.innerHeight);
			(e !== k.x || t !== k.y) && A({
				x: e,
				y: t
			});
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		N,
		k.x,
		k.y,
		k.width,
		k.height,
		A
	]);
	let ne = x(() => N === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: h
	} : N === "window" ? {
		position: "fixed",
		left: k.x,
		top: k.y,
		width: k.width,
		height: k.height,
		zIndex: h
	} : {
		position: "fixed",
		left: k.x,
		top: k.y,
		width: Ot,
		height: kt,
		zIndex: h
	}, [
		N,
		k.x,
		k.y,
		k.width,
		k.height,
		h
	]);
	return /* @__PURE__ */ E("div", {
		ref: P,
		"data-testid": w,
		"data-call-widget-mode": N,
		"data-call-widget-mode-legacy": ze(N),
		"data-call-side-panel-open": L ? "true" : "false",
		style: ne,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", N === "fullscreen" ? "rounded-none" : "rounded-lg", g),
		children: [
			/* @__PURE__ */ E("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", N === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: U,
				onPointerMove: W,
				onPointerUp: G,
				onPointerCancel: G,
				children: [/* @__PURE__ */ E("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ T("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ T("span", {
							className: "truncate font-medium",
							"data-testid": "call-widget-window-title",
							children: t
						}),
						n && /* @__PURE__ */ T("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ T("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ke(r)
						})
					]
				}), d && /* @__PURE__ */ E("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ T(Lt, {
							active: N === "mini",
							label: "Mini",
							onClick: () => V("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ T(Rt, {})
						}),
						/* @__PURE__ */ T(Lt, {
							active: N === "window",
							label: "Window",
							onClick: () => V("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ T(zt, {})
						}),
						/* @__PURE__ */ T(Lt, {
							active: N === "fullscreen",
							label: "Fullscreen",
							onClick: () => V(N === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ T(Bt, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: e("relative flex-1 min-h-0 bg-black", L && "flex items-stretch"),
				children: [L ? /* @__PURE__ */ T("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, L && /* @__PURE__ */ T(Le, {
					mode: N,
					tabs: F,
					activeTab: p,
					onTabChange: m,
					widthClassName: N === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || I) && /* @__PURE__ */ T("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: I ? /* @__PURE__ */ E("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ T("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ T(Fe, {
						tabs: F,
						activeTab: p,
						onTabChange: m
					})]
				}) : a
			}),
			N === "window" && /* @__PURE__ */ T("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: q,
				onPointerMove: ee,
				onPointerUp: te,
				onPointerCancel: te,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ T("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ T("path", {
						d: "M14 10v4h-4M14 6v8M10 14h4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						fill: "none"
					})
				})
			})
		]
	});
}
function Lt({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ T("button", {
		type: "button",
		onClick: r,
		"aria-pressed": t,
		"aria-label": n,
		title: n,
		"data-testid": i,
		className: e("w-6 h-6 grid place-items-center rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors", t && "text-white bg-white/15"),
		children: a
	});
}
function Rt() {
	return /* @__PURE__ */ T("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ T("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function zt() {
	return /* @__PURE__ */ T("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ T("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Bt() {
	return /* @__PURE__ */ T("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ T("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function Vt(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(Q, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(Q, Math.floor((window.innerHeight - t) / 2))
	};
}
function Ht(e) {
	if (typeof window > "u") return {
		x: 16,
		y: 16
	};
	let t = window.innerWidth, n = window.innerHeight;
	switch (e) {
		case "top-left": return {
			x: Q,
			y: Q
		};
		case "top-right": return {
			x: t - Ot - Q,
			y: Q
		};
		case "bottom-left": return {
			x: Q,
			y: n - kt - Q
		};
		default: return {
			x: t - Ot - Q,
			y: n - kt - Q
		};
	}
}
function Ut(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Wt(e, t, n) {
	return Ut(e, Q, Math.max(Q, n - t - Q));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Gt({ show: e, label: t }) {
	return e ? /* @__PURE__ */ E("div", {
		"data-testid": "calling-pill",
		"data-call-status": "calling",
		className: "pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-medium text-white",
		children: [
			"Calling ",
			t || "user",
			"…"
		]
	}) : null;
}
//#endregion
//#region src/components/video/MuteWhileTalkingToast.tsx
function Kt({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ T("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var qt = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Jt = 3e3, Yt = .35;
function Xt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return qt[Math.abs(t) % qt.length];
}
function Zt({ lines: t, maxLines: n = 4, fadeAfterMs: r = Jt, now: i, className: a }) {
	let [, o] = C(0), s = i === void 0, c = t.length > 0;
	v(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = S(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
	for (let e of u.keys()) d.has(e) || u.delete(e);
	for (let e of t) {
		let t = u.get(e.id);
		if (t) e.text !== t.lastIncomingText && (t.lastIncomingText = e.text, t.lastUpdateMs = l, (!e.interim || e.text.length > .85 * t.displayedText.length) && (t.displayedText = e.text));
		else {
			let t = Date.parse(e.at);
			u.set(e.id, {
				displayedText: e.text,
				lastIncomingText: e.text,
				lastUpdateMs: Number.isFinite(t) ? Math.min(t, l) : l
			});
		}
	}
	let f = t.slice(-n).map((e) => {
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(Yt, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Jt);
	return f.length === 0 ? null : /* @__PURE__ */ E("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ T("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ E("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ T("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: Xt(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ T("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var Qt = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, $t = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", en = "bg-surface-hover text-neutral hover:bg-surface-emphasis", tn = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function $({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? $t : a === "danger" ? tn : en;
	return /* @__PURE__ */ T("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", Qt[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function nn(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function rn(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
function an({ channelName: t, localIdentity: r, previewStream: i, permission: a, permissionMessage: c, audioEnabled: l, videoEnabled: u, onToggleAudio: d, onToggleVideo: p, onRetryPermission: m, participants: h, readyState: g, readyLoading: _ = !1, effectsSlot: y, onJoin: b, onCancel: x, joinLabel: C, joinDisabled: w, subtitleOverride: D, className: O, "data-testid": k }) {
	let A = S(null);
	v(() => {
		A.current && i && (A.current.srcObject = i);
	}, [i]);
	let j = a === "granted", M = rn(a), N = w ?? !j, P = C ?? (N && !j ? "Allow camera to join" : "Join now"), F = D ?? nn(h, g, _);
	return /* @__PURE__ */ E("div", {
		"data-testid": k,
		className: e("flex flex-col h-full min-h-0 bg-surface-panel text-text-primary", O),
		children: [/* @__PURE__ */ E("header", {
			className: "flex items-center justify-between px-6 py-4 border-b border-border bg-surface",
			children: [/* @__PURE__ */ E("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ T("h1", {
					className: "text-lg font-semibold truncate",
					children: t
				}), /* @__PURE__ */ T("p", {
					className: "text-xs text-neutral mt-0.5",
					children: F
				})]
			}), /* @__PURE__ */ T(n, {
				variant: "ghost",
				size: "sm",
				onClick: x,
				children: "Cancel"
			})]
		}), /* @__PURE__ */ E("main", {
			className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full",
			children: [/* @__PURE__ */ E("section", {
				className: "lg:flex-1 min-h-0",
				children: [
					/* @__PURE__ */ E("div", {
						className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black",
						children: [
							i && j && /* @__PURE__ */ T("video", {
								ref: A,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !u && "opacity-0")
							}),
							j && !u && (r ? /* @__PURE__ */ T("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ E("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ T(f, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ E("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ T("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ T("span", {
											className: "text-white/60 text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ T("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-white/60 text-sm",
								children: "Camera off"
							})),
							a === "pending" && /* @__PURE__ */ T("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ T(o, { size: "lg" })
							}),
							M && /* @__PURE__ */ T("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ T(s, {
									kind: "camera",
									state: M,
									message: c,
									onRetry: m,
									"data-testid": "prejoin-permission-card"
								})
							})
						]
					}),
					/* @__PURE__ */ E("div", {
						className: "mt-4 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ T($, {
							on: l,
							onClick: d,
							disabled: !j,
							"aria-label": l ? "Mute mic before joining" : "Unmute mic before joining",
							title: l ? "Mute mic before joining" : "Unmute mic before joining",
							iconOn: /* @__PURE__ */ T(ge, { size: 18 }),
							iconOff: /* @__PURE__ */ T(_e, { size: 18 }),
							"data-testid": "prejoin-toggle-audio"
						}), /* @__PURE__ */ T($, {
							on: u,
							onClick: p,
							disabled: !j,
							"aria-label": u ? "Turn camera off before joining" : "Turn camera on before joining",
							title: u ? "Turn camera off before joining" : "Turn camera on before joining",
							iconOn: /* @__PURE__ */ T(ve, { size: 18 }),
							iconOff: /* @__PURE__ */ T(ye, { size: 18 }),
							"data-testid": "prejoin-toggle-video"
						})]
					}),
					y && /* @__PURE__ */ T("div", {
						className: "mt-4",
						"data-testid": "prejoin-effects-slot",
						children: y
					})
				]
			}), /* @__PURE__ */ E("section", {
				className: "lg:w-96 flex flex-col",
				children: [/* @__PURE__ */ E("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ T("h2", {
							className: "text-2xl font-semibold mb-2",
							children: "Ready to join?"
						}),
						/* @__PURE__ */ T("p", {
							className: "text-sm text-neutral mb-6",
							children: F
						}),
						/* @__PURE__ */ T(on, {
							participants: h,
							loading: _
						}),
						g === "pending" && !_ && /* @__PURE__ */ E("p", {
							className: "mt-4 text-xs text-warning-fg flex items-center gap-2",
							children: [/* @__PURE__ */ T("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
						})
					]
				}), /* @__PURE__ */ E("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ T(n, {
						variant: "primary",
						size: "lg",
						onClick: () => b({
							audio: l,
							video: u
						}),
						disabled: N,
						"data-testid": "prejoin-join-button",
						children: P
					}), /* @__PURE__ */ T("button", {
						type: "button",
						onClick: x,
						className: "text-xs text-neutral hover:text-text-primary transition-colors text-center",
						children: "Back to rooms"
					})]
				})]
			})]
		})]
	});
}
function on({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ E("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ T(o, { size: "sm" }), " Checking room…"]
	}) : !e || e.length === 0 ? null : /* @__PURE__ */ E("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ T("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ E("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ E("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ T(f, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ T("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ T(i, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ E("li", {
				className: "text-xs text-neutral",
				children: [
					"+",
					e.length - 8,
					" more"
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var sn = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, cn = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function ln() {
	return /* @__PURE__ */ E("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ T("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ T("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function un({ channelName: t, subtitle: n, recording: r, elapsedLabel: a, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ E("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ E("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ T("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || r?.armed || a) && /* @__PURE__ */ E("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ T("span", { children: n }),
					r?.armed && /* @__PURE__ */ T(i, {
						tone: r.active ? "danger" : "neutral",
						size: "xs",
						uppercase: !0,
						dot: r.active ? "pulse" : "static",
						title: r.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
						"data-testid": "hangout-room-header-recording",
						children: "Rec"
					}),
					a && /* @__PURE__ */ T(i, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ T(ln, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ T("span", {
							className: "tabular-nums",
							children: a
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ E("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ T(i, {
				tone: sn[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: cn[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var dn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, fn = {
	sm: 16,
	md: 20,
	lg: 24
};
function pn({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ E("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ T($, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ T(ge, { size: g }),
				iconOff: /* @__PURE__ */ T(_e, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ T($, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ T(ve, { size: g }),
				iconOff: /* @__PURE__ */ T(ye, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ T($, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ T(be, { size: g }),
				iconOff: /* @__PURE__ */ T(xe, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ T("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", dn[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ T(Se, { size: fn[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var mn = {
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function hn({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = C(i);
	v(() => {
		t && m(i);
	}, [t, i]);
	let h = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ T(a, {
		open: t,
		onClose: n,
		ariaLabel: u,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden",
		children: /* @__PURE__ */ E("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", d),
			children: [/* @__PURE__ */ E("header", {
				className: "flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3",
				children: [/* @__PURE__ */ T("h2", {
					className: "m-0 text-sm font-semibold text-white",
					children: u
				}), /* @__PURE__ */ T("button", {
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ E("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [l && /* @__PURE__ */ T("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T(g, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ T("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ E("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ T("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ E("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [f.length > 0 && /* @__PURE__ */ T("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2",
						children: f.map((t) => /* @__PURE__ */ T("button", {
							type: "button",
							role: "tab",
							"aria-selected": t === h,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === h ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: mn[t]
						}, t))
					}), /* @__PURE__ */ E("div", {
						role: "tabpanel",
						"data-testid": "call-settings-panel",
						className: "min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[460px]",
						children: [
							h === "effects" ? o : null,
							h === "people" ? s : null,
							h === "chat" ? c : null
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { U as $, Me as A, xe as B, We as C, ze as D, Re as E, ge as F, ye as G, Ce as H, _e as I, ue as J, he as K, Oe as L, je as M, De as N, Le as O, Te as P, V as Q, Se as R, Ge as S, Be as T, Ee as U, we as V, ve as W, oe as X, se as Y, te as Z, dt as _, $ as a, j as at, tt as b, Gt as c, wt as d, G as et, xt as f, mt as g, ht as h, an as i, N as it, Ne as j, Fe as k, It as l, gt as m, pn as n, R as nt, Zt as o, O as ot, vt as p, de as q, un as r, L as rt, Kt as s, hn as t, B as tt, Et as u, ut as v, et as w, Ue as x, ot as y, be as z };
