import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { t as n } from "./Button-CTpms90-.js";
import { t as r } from "./Chip-2lIuHwy5.js";
import { t as i } from "./overlayStack-BFH9XXvN.js";
import { t as a } from "./Modal-BcTT8crX.js";
import { n as o, t as s } from "./PermissionDeniedCard-5FQ6reO7.js";
import { n as c, r as l, t as u } from "./focusTrap-CmWJlptm.js";
import { t as d } from "./Avatar-BzicCOft.js";
import { t as f } from "./activationKey-CjbL3LUv.js";
import { t as p } from "./Select-Z0TLUVeL.js";
import { m, o as h } from "./MediaEffectsPreviewPanel-CHyjo-Xq.js";
import { useCallback as g, useEffect as _, useImperativeHandle as v, useLayoutEffect as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var E = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function D({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = x(null), [m, h] = S("idle"), g = c ?? m;
	_(() => {
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
	}, [d, f]), _(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let v = g !== "playing", y = E[g];
	return /* @__PURE__ */ T("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ w("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), v && y && /* @__PURE__ */ T("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ w(O, {}), /* @__PURE__ */ w("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: y
			})]
		})]
	});
}
function O() {
	return /* @__PURE__ */ T("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ w("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ w("path", {
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
function k(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function A({ onClose: t, sources: n, title: r, subtitle: a, autoPlay: o = !0, muted: s = !1, hideDownload: d = !1, header: f, footer: p, className: m }) {
	let h = b(() => n.filter((e) => !!e.url), [n]), [g, v] = S(0), y = h[g], C = x(null), E = x(null), D = i(!0);
	return _(() => {
		let e = (e) => {
			if (D()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				l(e, C.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, D]), _(() => (E.current = typeof document < "u" ? document.activeElement : null, u(C.current), () => {
		c(E.current), E.current = null;
	}), []), /* @__PURE__ */ w("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ T("div", {
			ref: C,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", m),
			children: [
				(r || a || f) && /* @__PURE__ */ T("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ T("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ w("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), a && /* @__PURE__ */ w("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: a
						})]
					}), /* @__PURE__ */ T("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [f, /* @__PURE__ */ w("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				y ? /* @__PURE__ */ w("video", {
					src: y.url,
					controls: !0,
					autoPlay: o,
					muted: s,
					className: "w-full max-h-[70vh] bg-black"
				}, y.url) : /* @__PURE__ */ w("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				h.length > 1 && /* @__PURE__ */ w("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: h.map((t, n) => {
						let r = n === g;
						return /* @__PURE__ */ w("button", {
							type: "button",
							onClick: () => v(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : k(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(p || !d && y) && /* @__PURE__ */ T("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ w("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: p
					}), !d && y && /* @__PURE__ */ w("a", {
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
function j(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function M({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ w("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", j(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ w("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ T("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ w("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ w("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var N = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, P = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, F = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function I({ quality: t, className: n, style: r }) {
	let i = N[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ T("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ w("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ w("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ w("span", {
			className: P[t],
			children: F[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function L({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ w("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ w(m, {
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
var R = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function z(e) {
	return R[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function B({ reactions: t, className: n, style: r }) {
	let [i, a] = S([]);
	return _(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), _(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ w("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ w("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var V = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function H({ onReact: t, emojis: n = V, className: r, style: i }) {
	return /* @__PURE__ */ w("div", {
		"data-testid": "reaction-picker",
		className: e("flex gap-1 px-2 py-1.5 rounded-[20px] bg-surface-inverse/90 border border-white/10", r),
		style: i,
		children: n.map((n) => {
			let r = z(n);
			return /* @__PURE__ */ w("button", {
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
var U = /* @__PURE__ */ T("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ w("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ w("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ w("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ w("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function W({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, className: o }) {
	let [s, c] = S(!1);
	return /* @__PURE__ */ T("div", {
		className: e("relative inline-flex", o),
		children: [/* @__PURE__ */ w("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": s,
			disabled: a,
			onClick: () => c((e) => !e),
			"data-testid": "reaction-picker-open",
			className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", s ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white", a && "opacity-40 cursor-not-allowed"),
			children: U
		}), s && /* @__PURE__ */ w(H, {
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
var G = 3, ee = 1500, te = 200;
function K({ reactions: e, currentTimeMs: t, className: n }) {
	let r = b(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = x(t), a = x([]), [o, s] = S([]);
	return _(() => {
		let e = i.current;
		if (i.current = t, t < e - ee) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > G ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), _(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, te);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ w("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ w(B, {
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
	return /* @__PURE__ */ T("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-surface-inverse rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ T("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ w("span", { className: e("w-[7px] h-[7px] rounded-full", ie[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ w("span", {
					className: e("font-semibold", ae[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ w("span", { children: ne(n) }),
			i !== void 0 && /* @__PURE__ */ w("span", { children: re(i) }),
			r !== void 0 && /* @__PURE__ */ T("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ T("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ w("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ w("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function se({ count: t, className: n, style: r }) {
	let i = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ T("div", {
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ T("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: [/* @__PURE__ */ w("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ w("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ T("span", { children: [i, " watching"] })]
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
function q({ participant: e, size: t = 32 }) {
	let n = le(e.displayName);
	return /* @__PURE__ */ T("div", {
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
			e.avatarUrl ? /* @__PURE__ */ w("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : ce(e.displayName),
			e.isSpeaking && /* @__PURE__ */ w("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ w("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ T("svg", {
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
						/* @__PURE__ */ w("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ w("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ w("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function ue({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ T("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ w(q, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ T("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ w(q, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var J = {
	mic: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ w("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ w("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ w("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ w("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ w("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ w("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ w("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ w("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ w("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ w("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ w("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ w("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ w("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ w("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ w("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ w("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ w("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ w("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ w("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	})
};
function Y({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s }) {
	return /* @__PURE__ */ w("button", {
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
	let [g, _] = S(!1), v = new Set(f ?? []), y = (d ?? []).filter((e) => !v.has(e.id));
	return /* @__PURE__ */ T("div", {
		className: e("flex flex-col", h),
		children: [/* @__PURE__ */ T("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				a && /* @__PURE__ */ w(Y, {
					icon: n ? J.micOff : J.mic,
					label: n ? "Unmute" : "Mute",
					active: n,
					onClick: a,
					testId: "mute-button"
				}),
				t === "video" && o && /* @__PURE__ */ w(Y, {
					icon: r ? J.camera : J.cameraOff,
					label: r ? "Turn off camera" : "Turn on camera",
					active: !r,
					onClick: o,
					testId: "camera-button"
				}),
				t === "audio" && c && /* @__PURE__ */ w(Y, {
					icon: J.videoUpgrade,
					label: "Switch to video",
					onClick: c,
					testId: "upgrade-to-video-button"
				}),
				s && /* @__PURE__ */ w(Y, {
					icon: J.screenShare,
					label: i ? "Stop sharing" : "Share screen",
					active: i,
					onClick: s,
					testId: "screenshare-button"
				}),
				(u || p) && /* @__PURE__ */ w(Y, {
					icon: J.userPlus,
					label: "Add people to this call",
					active: g,
					onClick: p || (() => _((e) => !e)),
					testId: "add-participant-button"
				}),
				m,
				l && /* @__PURE__ */ w(Y, {
					icon: J.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: l,
					testId: "hangup-button"
				})
			]
		}), g && u && !p && /* @__PURE__ */ T("div", {
			className: "border-t border-white/5 bg-surface-inverse/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ w("button", {
					type: "button",
					onClick: () => _(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), y.length === 0 ? /* @__PURE__ */ w("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ w("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: y.map((e) => /* @__PURE__ */ T("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						u(e.id), y.length <= 1 && _(!1);
					},
					children: [
						/* @__PURE__ */ w(q, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ w("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ w("span", {
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
	return fe(t) ? /* @__PURE__ */ T("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", pe[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ w(I, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ T("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ T("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ w("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), me(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ T("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ w("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ T("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ w("span", {
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
function X(e, t) {
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
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "11",
				rx: "3"
			}),
			/* @__PURE__ */ w("path", { d: "M5 11a7 7 0 0 0 14 0" }),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ w("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function _e({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ w("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ w("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ w("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
			/* @__PURE__ */ w("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ w("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function ve({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [/* @__PURE__ */ w("path", { d: "M22 8l-6 4 6 4V8z" }), /* @__PURE__ */ w("rect", {
			x: "2",
			y: "6",
			width: "14",
			height: "12",
			rx: "2"
		})]
	});
}
function ye({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ w("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
			/* @__PURE__ */ w("path", { d: "M22 8l-6 4 6 4V8z" })
		]
	});
}
function be({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("rect", {
				x: "2",
				y: "4",
				width: "20",
				height: "12",
				rx: "2"
			}),
			/* @__PURE__ */ w("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			}),
			/* @__PURE__ */ w("polyline", { points: "9 10 12 7 15 10" }),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "7",
				x2: "12",
				y2: "13"
			})
		]
	});
}
function xe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ w("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
			/* @__PURE__ */ w("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
			/* @__PURE__ */ w("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ w("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			})
		]
	});
}
function Se({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
			/* @__PURE__ */ w("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
			/* @__PURE__ */ w("line", {
				x1: "22",
				y1: "2",
				x2: "2",
				y2: "22"
			})
		]
	});
}
function Ce({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
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
			/* @__PURE__ */ w("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ w("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ w("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ w("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	});
}
function we({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("path", { d: "M12 3l1.9 5.1a1 1 0 0 0 .6.6L19.6 10.6a1 1 0 0 1 0 1.9L14.5 14.4a1 1 0 0 0-.6.6L12 20.1a1 1 0 0 1-1.9 0L8.2 15a1 1 0 0 0-.6-.6L2.5 12.5a1 1 0 0 1 0-1.9L7.6 8.7a1 1 0 0 0 .6-.6L10.1 3a1 1 0 0 1 1.9 0z" }),
			/* @__PURE__ */ w("path", { d: "M19 3v4" }),
			/* @__PURE__ */ w("path", { d: "M17 5h4" }),
			/* @__PURE__ */ w("path", { d: "M19 17v4" }),
			/* @__PURE__ */ w("path", { d: "M17 19h4" })
		]
	});
}
function Te({ size: e = 20, ...t }) {
	return /* @__PURE__ */ w("svg", {
		...X(e, t),
		children: /* @__PURE__ */ w("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
	});
}
function Ee({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ w("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ w("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
			/* @__PURE__ */ w("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
		]
	});
}
function De({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "14",
				rx: "2"
			}),
			/* @__PURE__ */ w("path", { d: "M10.5 10.2a2.2 2.2 0 1 0 0 3.6" }),
			/* @__PURE__ */ w("path", { d: "M16.5 10.2a2.2 2.2 0 1 0 0 3.6" })
		]
	});
}
function Oe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ T("svg", {
		...X(e, t),
		children: [
			/* @__PURE__ */ w("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ w("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ w("circle", {
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
		case "chat": return /* @__PURE__ */ w(Te, { size: 16 });
		case "people": return /* @__PURE__ */ w(Ee, { size: 16 });
		case "captions": return /* @__PURE__ */ w(De, { size: 16 });
		default: return null;
	}
}
function Fe({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, className: a, "data-testid": o = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ w("div", {
		"data-testid": o,
		className: e("flex items-center gap-1", a),
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let a = t.id === n, o = i || t.disabled === !0;
			return /* @__PURE__ */ T("button", {
				type: "button",
				"aria-label": t.label,
				"aria-pressed": a,
				title: t.label,
				disabled: o,
				"data-testid": je(t),
				"data-active": a ? "true" : "false",
				onClick: () => r?.(a ? null : t.id),
				className: e("relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", a ? "bg-primary text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white", o ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? Pe(t.id) ?? /* @__PURE__ */ w("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ w("span", {
					"data-testid": `${je(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var Ie = "__legacy__";
function Le({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = f ? t : [{
		id: Ie,
		label: s ?? "",
		content: c
	}], m = f ? n ?? null : a ? Ie : null, h = p.find((e) => e.id === m) ?? null;
	if (!h) return null;
	let g = Ne(i), _ = f && p.length > 1;
	return /* @__PURE__ */ T("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": g,
		"data-call-side-panel-tab": f ? h.id : void 0,
		"aria-label": h.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-surface-inverse text-text-inverse", g === "docked" ? ["h-full shrink-0 border-l border-white/10", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ T("header", {
			className: "flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3",
			children: [_ ? /* @__PURE__ */ w("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: p.map((t) => {
					let n = t.id === h.id;
					return /* @__PURE__ */ w("button", {
						type: "button",
						role: "tab",
						"aria-selected": n,
						disabled: t.disabled === !0,
						onClick: () => r?.(t.id),
						"data-testid": `call-side-panel-tab-${t.id}`,
						className: e("shrink-0 rounded-full px-3 py-1 text-[13px] font-medium transition-colors", n ? "bg-white/15 text-text-inverse" : "text-white/60 hover:bg-white/10 hover:text-white/90", t.disabled === !0 ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
						children: t.label
					}, t.id);
				})
			}) : /* @__PURE__ */ w("h2", {
				className: "m-0 truncate text-sm font-semibold text-text-inverse",
				children: h.label
			}), /* @__PURE__ */ w("button", {
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ w("div", {
			role: _ ? "tabpanel" : void 0,
			"data-testid": f ? Me(h) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: h.content
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
function Ue(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function We({ stream: t, muted: n = !1, className: r }) {
	let i = x(null);
	return _(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ w("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var Z = {
	phoneEnd: /* @__PURE__ */ T("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ w("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ w("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ w("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ w("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ T("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ w("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ w("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ w("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ w("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ T("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ w("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ w("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	})
};
function Ge({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ T("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ w("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ w("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ w("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "text-center",
				children: [/* @__PURE__ */ w("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ w("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: Z.phoneEnd
				}), t && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: Z.phoneAnswer
				})]
			})
		]
	});
}
function Ke({ mode: e, participants: t, localParticipant: n, duration: r, isMuted: i, isCameraOn: a, isScreenSharing: o, onToggleMute: s, onToggleCamera: c, onToggleScreenShare: l, onUpgradeToVideo: u, onAddParticipant: d, availableParticipants: f, onOpenAddParticipant: p, controlsExtras: m, onEndCall: h, layoutComponent: g, callStats: _ }) {
	let v = e === "video" && a;
	return /* @__PURE__ */ T("div", {
		className: "flex flex-col",
		children: [
			e === "video" && g && /* @__PURE__ */ T("div", {
				className: "mx-3 mt-3 rounded-lg overflow-hidden relative",
				children: [g, /* @__PURE__ */ w(he, {
					stats: _,
					position: "bottom-left"
				})]
			}),
			e === "video" && !g && /* @__PURE__ */ T("div", {
				className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3",
				children: [
					n?.videoStream && v ? /* @__PURE__ */ w(We, {
						stream: n.videoStream,
						muted: !0
					}) : /* @__PURE__ */ w("div", {
						className: "w-full h-full flex items-center justify-center bg-surface-inverse",
						children: n && /* @__PURE__ */ w(q, {
							participant: n,
							size: 48
						})
					}),
					t.length > 0 && /* @__PURE__ */ T("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse",
						children: [t[0].videoStream ? /* @__PURE__ */ w(We, { stream: t[0].videoStream }) : /* @__PURE__ */ w("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ w(q, {
								participant: t[0],
								size: 28
							})
						}), t[0].isMuted && /* @__PURE__ */ w("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ T("svg", {
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
									/* @__PURE__ */ w("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ w("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ w("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ w(he, {
						stats: _,
						position: "bottom-left"
					})
				]
			}),
			e === "audio" && /* @__PURE__ */ w(ue, {
				participants: t,
				localFallback: n,
				maxVisible: 4,
				avatarSize: 36
			}),
			/* @__PURE__ */ T("div", {
				className: "text-center py-1.5",
				children: [r !== void 0 && /* @__PURE__ */ w("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": r,
					children: Ue(r)
				}), /* @__PURE__ */ T("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [t.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ w(de, {
				mode: e,
				isMuted: i,
				isCameraOn: a,
				isScreenSharing: o,
				onToggleMute: s,
				onToggleCamera: c,
				onToggleScreenShare: l,
				onUpgradeToVideo: u,
				onEndCall: h,
				onAddParticipant: d,
				availableParticipants: f,
				onOpenAddParticipant: p,
				currentParticipantIds: t.map((e) => e.id),
				extras: m
			})
		]
	});
}
function qe({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ T("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? f(c) : void 0,
		children: [
			/* @__PURE__ */ w("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ w("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ w("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ T("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ w("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ue(r)
						})
					]
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ w("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ T(C, { children: [
							/* @__PURE__ */ w("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ w("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ w("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ w("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ w("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ T("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ w("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ w("line", {
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
function Je(e) {
	let [t, n] = S({
		x: 0,
		y: 0
	}), [r, i] = S(!1), [a, o] = S(!1), s = x(null), c = g(() => {
		s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 200);
	}, []);
	_(() => () => {
		s.current && clearTimeout(s.current);
	}, []);
	let l = x(!1), u = x({
		x: 0,
		y: 0
	}), d = x({
		x: 0,
		y: 0
	}), f = x(null), p = g((n) => {
		e && (l.current = !0, i(!0), o(!1), u.current = {
			x: n.clientX,
			y: n.clientY
		}, d.current = { ...t }, n.preventDefault());
	}, [e, t]), m = g(() => {
		o(!0), n({
			x: 0,
			y: 0
		}), c();
	}, [c]), h = g((e) => {
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
	}, [t, c]), v = x(h);
	return v.current = h, _(() => {
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
			}, s = a.left - o.left, c = a.top - o.top, u = n - (s + a.width), d = r - (c + a.height), p = s < 80, m = u < 80, h = c < 80, g = d < 80;
			h && p ? v.current("top-left") : h && m ? v.current("top-right") : g && p ? v.current("bottom-left") : g && m && v.current("bottom-right");
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
function Ye({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ w("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ w("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ w("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ w("rect", {
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
function Xe({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: x, onMinimize: S, onExpand: E, layoutComponent: D, callStats: O, displayMode: k, minimized: A, sidePanelTabs: j, activeSidePanelTab: M = null, onSidePanelTabChange: N, sidePanelWidthClassName: P = "w-80", position: F = "bottom-right", contained: I = !1, draggable: L = !0, className: R, style: z, dataAttrs: B }) {
	k !== void 0 && A !== void 0 && He("CallWidget", "minimized");
	let V = k ?? Be(A ?? !1), H = V === "mini", U = j ?? [], W = U.length > 0 && !H && t === "active", G = W && U.some((e) => e.id === M), { offset: ee, handleMouseDown: te, resetOffset: K, snapToCorner: ne, isDragging: re, isAnimating: ie, hasMoved: ae, widgetRef: oe } = Je(L), se = {};
	if (B) for (let [e, t] of Object.entries(B)) t != null && t !== "" && (se[e] = t);
	let ce = b(() => {
		switch (F) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [F]);
	if (t === "idle" || t === "ended") return null;
	let le = /* @__PURE__ */ T(C, { children: [
		t === "ringing" && /* @__PURE__ */ w(Ge, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ T("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ w("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ w("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ w(Ke, {
			mode: n,
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
			onOpenAddParticipant: x,
			controlsExtras: W ? /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(Fe, {
				tabs: U,
				activeTab: M,
				onTabChange: N
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: D,
			callStats: O
		})
	] });
	return /* @__PURE__ */ T(C, { children: [re && /* @__PURE__ */ w(Ye, {
		onSnap: ne,
		contained: I
	}), /* @__PURE__ */ w("div", {
		ref: oe,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": V,
		"data-call-widget-mode-legacy": ze(V),
		className: e(I ? "absolute z-50" : "fixed z-[9999]", ce, R),
		style: {
			transform: `translate(${ee.x}px, ${ee.y}px)`,
			transition: ie ? "transform 0.2s ease-out" : void 0,
			...z
		},
		...se,
		children: /* @__PURE__ */ T("div", {
			className: e("bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm", H ? "w-[260px]" : G ? "w-auto" : "w-[320px]"),
			"data-call-side-panel-open": G ? "true" : "false",
			children: [
				!H && /* @__PURE__ */ T("div", {
					className: e("flex items-center justify-between px-3 py-2 border-b border-white/5", L && "cursor-grab active:cursor-grabbing"),
					onMouseDown: te,
					children: [/* @__PURE__ */ T("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ w("span", { className: "w-2 h-2 rounded-full bg-success" }), /* @__PURE__ */ w("span", {
							className: "text-white/80 text-xs font-medium",
							children: n === "video" ? "Video Call" : "Audio Call"
						})]
					}), /* @__PURE__ */ T("div", {
						className: "flex items-center gap-1",
						children: [
							ae && /* @__PURE__ */ w("button", {
								type: "button",
								onClick: K,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: Z.snapBack
							}),
							E && /* @__PURE__ */ w("button", {
								type: "button",
								onClick: E,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ w("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ w("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							S && /* @__PURE__ */ w("button", {
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: Z.minimize
							})
						]
					})]
				}),
				H && /* @__PURE__ */ w("div", {
					className: e(L && "cursor-grab active:cursor-grabbing"),
					onMouseDown: te,
					children: /* @__PURE__ */ w(qe, {
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
				!H && (G ? /* @__PURE__ */ T("div", {
					className: "flex min-h-0 items-stretch",
					children: [/* @__PURE__ */ w("div", {
						className: "w-[320px] shrink-0",
						children: le
					}), /* @__PURE__ */ w(Le, {
						mode: V,
						tabs: U,
						activeTab: M,
						onTabChange: N,
						widthClassName: P,
						className: "max-h-[420px]"
					})]
				}) : le)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function Ze({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", onJoin: o, onDismiss: s, autoExpireSec: c = 30, className: l, style: u }) {
	let [d, f] = S(!0), p = t(s);
	return _(() => {
		if (!c || c <= 0) return;
		let e = setTimeout(() => {
			f(!1), p();
		}, c * 1e3);
		return () => clearTimeout(e);
	}, [c, p]), d ? /* @__PURE__ */ T("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-surface-inverse text-white border border-white/10", l),
		style: u,
		children: [
			/* @__PURE__ */ w(Qe, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ T("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ w("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), i && /* @__PURE__ */ w("p", {
					className: "text-xs text-white/60 m-0 truncate",
					children: i
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "flex items-center gap-2",
				children: [s && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: () => {
						f(!1), s();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), o && /* @__PURE__ */ w("button", {
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
function Qe({ name: e, avatarUrl: t }) {
	let n = et(e);
	return /* @__PURE__ */ T("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ w("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : $e(e), /* @__PURE__ */ w("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function $e(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function et(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function tt(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function nt({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = x(null), d = x(null), f = x(s);
	f.current = s;
	let [m, h] = S(!1), [g, v] = S(0), [y, C] = S(0), [E, D] = S(1), [O, k] = S(1), [A, j] = S(!1), [M, N] = S(null);
	_(() => {
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
	}, z = b(() => y > 0 ? Math.min(100, g / y * 100) : 0, [g, y]);
	return /* @__PURE__ */ T("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ w("video", {
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
					C(t.duration), j(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					v(t.currentTime), o?.(t.currentTime, t.duration);
				},
				onWaiting: () => j(!0),
				onCanPlay: () => j(!1),
				onError: () => {
					N("Playback error."), s?.(/* @__PURE__ */ Error("video element error")), j(!1);
				}
			}),
			A && !M && /* @__PURE__ */ w("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			M && /* @__PURE__ */ w("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: M
			}),
			/* @__PURE__ */ T("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ w("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: tt(g)
						}),
						/* @__PURE__ */ w("input", {
							type: "range",
							min: 0,
							max: isFinite(y) ? y : 0,
							step: .1,
							value: g,
							onChange: F,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${z}%` }
						}),
						/* @__PURE__ */ w("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: tt(y)
						})
					]
				}), /* @__PURE__ */ T("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ w("button", {
							type: "button",
							onClick: P,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": m ? "Pause" : "Play",
							children: m ? /* @__PURE__ */ T("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ w("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ w("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ w("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ w("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ T("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ w("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ w("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: E,
								onChange: I,
								className: "w-20 h-1 accent-white/90 cursor-pointer",
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ w(p, {
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
						/* @__PURE__ */ w("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ w("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ w("button", {
							type: "button",
							onClick: R,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ w("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ w("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function rt(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function it(e) {
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
function at({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ T("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ w("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ w("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function ot({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ T("div", {
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
			/* @__PURE__ */ T("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ w("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ w("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ w("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ w("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ w(at, { status: s }),
					/* @__PURE__ */ w("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: rt(r)
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ w("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? it(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ T("span", {
					className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0",
					children: [i, " 👥"]
				})]
			}),
			o && /* @__PURE__ */ w("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: it(n)
			}),
			u && /* @__PURE__ */ w("div", {
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
function st({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ w("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ T("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ w("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ w("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ w("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ w("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ w(ot, {
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
function ct(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function lt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function ut({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, pendingMessage: s, idleState: c, className: l }) {
	let u = x(null), d = b(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return _(() => {
		if (d < 0 || !u.current) return;
		let e = u.current.querySelector(`[data-seg-index="${d}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [d]), t === "idle" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ w("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ w("span", { children: a }),
				/* @__PURE__ */ w("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ w("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-secondary",
			children: s ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", l),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-danger mb-2",
			children: [a, " — failed"]
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-secondary",
			children: o ?? "Transcript generation failed. Reach out to support if this persists."
		})]
	}) : !n || n.length === 0 ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ w("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", l),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ T("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ w("div", {
			ref: u,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === d, a = lt(t.speakerId), o = !!i;
				return /* @__PURE__ */ T("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? f(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${ct(t.startMs)} — ${t.speakerLabel}` : void 0,
					children: [/* @__PURE__ */ T("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold",
							style: { color: `hsl(${a}, 65%, 60%)` },
							children: t.speakerLabel
						}), /* @__PURE__ */ w("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: ct(t.startMs)
						})]
					}), /* @__PURE__ */ w("p", {
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
function dt({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, pendingMessage: o, idleState: s, className: c }) {
	return t === "idle" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ w("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-tertiary",
			children: s ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ w("span", { children: i }), /* @__PURE__ */ w("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-secondary",
			children: o ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", c),
		children: [/* @__PURE__ */ T("header", {
			className: "text-sm font-medium text-danger mb-2",
			children: [i, " — failed"]
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-secondary",
			children: a ?? "Summary generation failed."
		})]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface p-4", c),
		children: [/* @__PURE__ */ w("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ w("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ T("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", c),
		children: [/* @__PURE__ */ w("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ w("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ w("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function ft({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = S(!1), [o, s] = S(!1);
	_(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), _(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = g(async () => {
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
	return /* @__PURE__ */ w("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ w("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ w("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function pt(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function mt({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, tone: s = "light", className: c }) {
	let l = s === "dark", u = i ?? t.length;
	return /* @__PURE__ */ T("aside", {
		className: e("flex flex-col w-64 shrink-0", l ? "bg-surface-inverse border-l border-white/10" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", c),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ T("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", l ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ w("h3", {
					className: e("text-sm font-semibold", l ? "text-white" : "text-[var(--color-text-primary)]"),
					children: a
				}), /* @__PURE__ */ w("span", {
					className: e("text-xs tabular-nums", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					children: u
				})]
			}),
			/* @__PURE__ */ w("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ w("li", { children: /* @__PURE__ */ T("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ T("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ w("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ w("span", { children: pt(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ w("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ T("span", {
								className: e("flex-1 truncate text-sm", l ? "text-white/90" : "text-[var(--color-text-primary)]"),
								children: [t.displayName, t.isLocal && /* @__PURE__ */ w("span", {
									className: e("ml-1 text-xs", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ w("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ w("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: l ? "text-white/50" : "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ w("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ w("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var ht = null;
function gt() {
	if (ht) return ht;
	try {
		return ht = new AudioContext(), ht;
	} catch {
		return null;
	}
}
function _t({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = S(!1);
	return _(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = gt();
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
	]), _(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var vt = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function yt() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function bt({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = S(!1), c = x(null), l = a.videoRef ?? c, u = g((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = g(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		yt(), s(!1);
	}, [l]);
	return /* @__PURE__ */ T("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ w(h, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ w("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ w("button", {
				type: "button",
				onClick: d,
				className: e(vt, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var xt = 1;
function St({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = S(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== xt ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: Ct(r.x, t.x),
				y: Ct(r.y, t.y),
				width: Ct(r.width, t.width),
				height: Ct(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = x(null), o = x(!1), s = x(r);
	s.current = r;
	let c = x({
		key: e,
		value: r
	}), l = g((e, t) => {
		try {
			let n = {
				v: xt,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return _(() => {
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
	]), _(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: g((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Ct(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var wt = 320, Tt = 200, Et = 640, Dt = 400, Ot = 1440, kt = 900, At = 960, jt = 600, Q = 8;
function Mt({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", onModeChange: s, persistKey: c, apiRef: l, defaultCorner: u = "bottom-right", expandable: d = !0, sidePanelTabs: f, activeSidePanelTab: p = null, onSidePanelTabChange: m, zIndex: h = 9999, className: C }) {
	let E = o === "docked" ? "window" : o, D = b(() => E === "window" ? Lt(At, jt) : Rt(u), [E, u]), { state: O, setState: k } = St({
		persistKey: c,
		defaults: {
			mode: E,
			x: D.x,
			y: D.y,
			width: At,
			height: jt
		}
	}), [A, j] = S(!1), M = A ? "fullscreen" : O.mode, N = x(null), P = f ?? [], F = P.length > 0, I = F && P.some((e) => e.id === p), L = x(!1);
	_(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== N.current && A && (j(!1), L.current || k({ mode: "window" }), L.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [A, k]);
	let R = g(() => {
		let e = N.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => j(!0), () => {}) : j(!0);
	}, []), z = g(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (L.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), B = g((e) => {
		let t = Re(e);
		if (t !== M) {
			if (t === "fullscreen") {
				R();
				return;
			}
			if (M === "fullscreen") {
				z(), k({ mode: t });
				return;
			}
			if (t === "window" && M === "mini") {
				let e = Lt(O.width, O.height);
				k({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && M === "window") {
				let e = Rt(u);
				k({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			k({ mode: t });
		}
	}, [
		M,
		R,
		z,
		k,
		O.width,
		O.height,
		u
	]);
	_(() => {
		s?.(M);
	}, [M, s]), v(l, () => ({
		mode: M,
		setMode: B
	}), [M, B]);
	let V = x(null), H = g((e) => {
		M === "window" && (e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), V.current = {
			startX: e.clientX,
			startY: e.clientY,
			origX: O.x,
			origY: O.y
		}));
	}, [
		M,
		O.x,
		O.y
	]), U = g((e) => {
		let t = V.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Bt(t.origX + n, O.width, window.innerWidth), a = Bt(t.origY + r, O.height, window.innerHeight);
		k({
			x: i,
			y: a
		});
	}, [
		k,
		O.width,
		O.height
	]), W = g((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), V.current = null;
	}, []), G = x(null), ee = g((e) => {
		M === "window" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), G.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: O.width,
			origH: O.height
		});
	}, [
		M,
		O.width,
		O.height
	]), te = g((e) => {
		let t = G.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = zt(t.origW + n, Et, Math.min(Ot, window.innerWidth - 16)), a = zt(t.origH + r, Dt, Math.min(kt, window.innerHeight - 16));
		k({
			width: i,
			height: a
		});
	}, [k]), K = g((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), G.current = null;
	}, []);
	y(() => {
		if (M !== "window") return;
		let e = () => {
			let e = Bt(O.x, O.width, window.innerWidth), t = Bt(O.y, O.height, window.innerHeight);
			(e !== O.x || t !== O.y) && k({
				x: e,
				y: t
			});
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		M,
		O.x,
		O.y,
		O.width,
		O.height,
		k
	]);
	let ne = b(() => M === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: h
	} : M === "window" ? {
		position: "fixed",
		left: O.x,
		top: O.y,
		width: O.width,
		height: O.height,
		zIndex: h
	} : {
		position: "fixed",
		left: O.x,
		top: O.y,
		width: wt,
		height: Tt,
		zIndex: h
	}, [
		M,
		O.x,
		O.y,
		O.width,
		O.height,
		h
	]);
	return /* @__PURE__ */ T("div", {
		ref: N,
		"data-call-widget-mode": M,
		"data-call-widget-mode-legacy": ze(M),
		"data-call-side-panel-open": I ? "true" : "false",
		style: ne,
		className: e("flex flex-col bg-surface-inverse text-white shadow-2xl overflow-hidden border border-white/10", M === "fullscreen" ? "rounded-none" : "rounded-lg", C),
		children: [
			/* @__PURE__ */ T("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", M === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: H,
				onPointerMove: U,
				onPointerUp: W,
				onPointerCancel: W,
				children: [/* @__PURE__ */ T("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ w("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ w("span", {
							className: "truncate font-medium",
							children: t
						}),
						n && /* @__PURE__ */ w("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ w("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ue(r)
						})
					]
				}), d && /* @__PURE__ */ T("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ w(Nt, {
							active: M === "mini",
							label: "Mini",
							onClick: () => B("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ w(Pt, {})
						}),
						/* @__PURE__ */ w(Nt, {
							active: M === "window",
							label: "Window",
							onClick: () => B("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ w(Ft, {})
						}),
						/* @__PURE__ */ w(Nt, {
							active: M === "fullscreen",
							label: "Fullscreen",
							onClick: () => B(M === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ w(It, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: e("relative flex-1 min-h-0 bg-black", I && "flex items-stretch"),
				children: [I ? /* @__PURE__ */ w("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, I && /* @__PURE__ */ w(Le, {
					mode: M,
					tabs: P,
					activeTab: p,
					onTabChange: m,
					widthClassName: M === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || F) && /* @__PURE__ */ w("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: F ? /* @__PURE__ */ T("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ w("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ w(Fe, {
						tabs: P,
						activeTab: p,
						onTabChange: m
					})]
				}) : a
			}),
			M === "window" && /* @__PURE__ */ w("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: ee,
				onPointerMove: te,
				onPointerUp: K,
				onPointerCancel: K,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ w("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ w("path", {
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
function Nt({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ w("button", {
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
function Pt() {
	return /* @__PURE__ */ w("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ w("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Ft() {
	return /* @__PURE__ */ w("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ w("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function It() {
	return /* @__PURE__ */ w("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ w("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function Lt(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(Q, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(Q, Math.floor((window.innerHeight - t) / 2))
	};
}
function Rt(e) {
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
			x: t - wt - Q,
			y: Q
		};
		case "bottom-left": return {
			x: Q,
			y: n - Tt - Q
		};
		default: return {
			x: t - wt - Q,
			y: n - Tt - Q
		};
	}
}
function zt(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Bt(e, t, n) {
	return zt(e, Q, Math.max(Q, n - t - Q));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Vt({ show: e, label: t }) {
	return e ? /* @__PURE__ */ T("div", {
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
function Ht({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ w("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var Ut = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Wt = 3e3, Gt = .35;
function Kt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Ut[Math.abs(t) % Ut.length];
}
function qt({ lines: t, maxLines: n = 4, fadeAfterMs: r = Wt, now: i, className: a }) {
	let [, o] = S(0), s = i === void 0, c = t.length > 0;
	_(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = x(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(Gt, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Wt);
	return f.length === 0 ? null : /* @__PURE__ */ T("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ w("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ T("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ w("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: Kt(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ w("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var Jt = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Yt = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Xt = "bg-surface-hover text-neutral hover:bg-surface-emphasis", Zt = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function $({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? Yt : a === "danger" ? Zt : Xt;
	return /* @__PURE__ */ w("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", Jt[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function Qt(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function $t(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
function en({ channelName: t, localIdentity: r, previewStream: i, permission: a, permissionMessage: c, audioEnabled: l, videoEnabled: u, onToggleAudio: f, onToggleVideo: p, onRetryPermission: m, participants: h, readyState: g, readyLoading: v = !1, effectsSlot: y, onJoin: b, onCancel: S, joinLabel: C, joinDisabled: E, subtitleOverride: D, className: O, "data-testid": k }) {
	let A = x(null);
	_(() => {
		A.current && i && (A.current.srcObject = i);
	}, [i]);
	let j = a === "granted", M = $t(a), N = E ?? !j, P = C ?? (N && !j ? "Allow camera to join" : "Join now"), F = D ?? Qt(h, g, v);
	return /* @__PURE__ */ T("div", {
		"data-testid": k,
		className: e("flex flex-col h-full min-h-0 bg-surface-panel text-text-primary", O),
		children: [/* @__PURE__ */ T("header", {
			className: "flex items-center justify-between px-6 py-4 border-b border-border bg-white",
			children: [/* @__PURE__ */ T("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ w("h1", {
					className: "text-lg font-semibold truncate",
					children: t
				}), /* @__PURE__ */ w("p", {
					className: "text-xs text-neutral mt-0.5",
					children: F
				})]
			}), /* @__PURE__ */ w(n, {
				variant: "ghost",
				size: "sm",
				onClick: S,
				children: "Cancel"
			})]
		}), /* @__PURE__ */ T("main", {
			className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full",
			children: [/* @__PURE__ */ T("section", {
				className: "lg:flex-1 min-h-0",
				children: [
					/* @__PURE__ */ T("div", {
						className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black",
						children: [
							i && j && /* @__PURE__ */ w("video", {
								ref: A,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !u && "opacity-0")
							}),
							j && !u && (r ? /* @__PURE__ */ w("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-surface-inverse/95",
								children: /* @__PURE__ */ T("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ w(d, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ T("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ w("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ w("span", {
											className: "text-text-disabled text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ w("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-text-disabled text-sm",
								children: "Camera off"
							})),
							a === "pending" && /* @__PURE__ */ w("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ w(o, { size: "lg" })
							}),
							M && /* @__PURE__ */ w("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ w(s, {
									kind: "camera",
									state: M,
									message: c,
									onRetry: m,
									"data-testid": "prejoin-permission-card"
								})
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "mt-4 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ w($, {
							on: l,
							onClick: f,
							disabled: !j,
							"aria-label": l ? "Mute mic before joining" : "Unmute mic before joining",
							title: l ? "Mute mic before joining" : "Unmute mic before joining",
							iconOn: /* @__PURE__ */ w(ge, { size: 18 }),
							iconOff: /* @__PURE__ */ w(_e, { size: 18 }),
							"data-testid": "prejoin-toggle-audio"
						}), /* @__PURE__ */ w($, {
							on: u,
							onClick: p,
							disabled: !j,
							"aria-label": u ? "Turn camera off before joining" : "Turn camera on before joining",
							title: u ? "Turn camera off before joining" : "Turn camera on before joining",
							iconOn: /* @__PURE__ */ w(ve, { size: 18 }),
							iconOff: /* @__PURE__ */ w(ye, { size: 18 }),
							"data-testid": "prejoin-toggle-video"
						})]
					}),
					y && /* @__PURE__ */ w("div", {
						className: "mt-4",
						"data-testid": "prejoin-effects-slot",
						children: y
					})
				]
			}), /* @__PURE__ */ T("section", {
				className: "lg:w-96 flex flex-col",
				children: [/* @__PURE__ */ T("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ w("h2", {
							className: "text-2xl font-semibold mb-2",
							children: "Ready to join?"
						}),
						/* @__PURE__ */ w("p", {
							className: "text-sm text-neutral mb-6",
							children: F
						}),
						/* @__PURE__ */ w(tn, {
							participants: h,
							loading: v
						}),
						g === "pending" && !v && /* @__PURE__ */ T("p", {
							className: "mt-4 text-xs text-warning-fg flex items-center gap-2",
							children: [/* @__PURE__ */ w("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
						})
					]
				}), /* @__PURE__ */ T("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ w(n, {
						variant: "primary",
						size: "lg",
						onClick: () => b({
							audio: l,
							video: u
						}),
						disabled: N,
						"data-testid": "prejoin-join-button",
						children: P
					}), /* @__PURE__ */ w("button", {
						type: "button",
						onClick: S,
						className: "text-xs text-neutral hover:text-text-primary transition-colors text-center",
						children: "Back to rooms"
					})]
				})]
			})]
		})]
	});
}
function tn({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ T("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ w(o, { size: "sm" }), " Checking room…"]
	}) : !e || e.length === 0 ? null : /* @__PURE__ */ T("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ w("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ T("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ T("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ w(d, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ w("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ w(r, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ T("li", {
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
var nn = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, rn = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function an() {
	return /* @__PURE__ */ T("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ w("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ w("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function on({ channelName: t, subtitle: n, recording: i, elapsedLabel: a, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ T("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white", c),
		children: [/* @__PURE__ */ T("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ w("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || i?.armed || a) && /* @__PURE__ */ T("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ w("span", { children: n }),
					i?.armed && /* @__PURE__ */ w(r, {
						tone: i.active ? "danger" : "neutral",
						size: "xs",
						uppercase: !0,
						dot: i.active ? "pulse" : "static",
						title: i.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
						"data-testid": "hangout-room-header-recording",
						children: "Rec"
					}),
					a && /* @__PURE__ */ w(r, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ w(an, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ w("span", {
							className: "tabular-nums",
							children: a
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ T("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ w(r, {
				tone: nn[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: rn[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var sn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, cn = {
	sm: 16,
	md: 20,
	lg: 24
};
function ln({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ T("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ w($, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ w(ge, { size: g }),
				iconOff: /* @__PURE__ */ w(_e, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ w($, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ w(ve, { size: g }),
				iconOff: /* @__PURE__ */ w(ye, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ w($, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ w(be, { size: g }),
				iconOff: /* @__PURE__ */ w(xe, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ w("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", sn[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ w(Se, { size: cn[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var un = {
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function dn({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = S(i);
	_(() => {
		t && m(i);
	}, [t, i]);
	let g = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ w(a, {
		open: t,
		onClose: n,
		ariaLabel: u,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-surface-inverse text-text-inverse border border-white/10 p-0 overflow-hidden",
		children: /* @__PURE__ */ T("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", d),
			children: [/* @__PURE__ */ T("header", {
				className: "flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ w("h2", {
					className: "m-0 text-sm font-semibold text-text-inverse",
					children: u
				}), /* @__PURE__ */ w("button", {
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ T("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [l && /* @__PURE__ */ w("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(h, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ w("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ T("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ w("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ T("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [f.length > 0 && /* @__PURE__ */ w("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-white/10 px-3 pt-2",
						children: f.map((t) => /* @__PURE__ */ w("button", {
							type: "button",
							role: "tab",
							"aria-selected": t === g,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === g ? "border-primary text-text-inverse" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: un[t]
						}, t))
					}), /* @__PURE__ */ T("div", {
						role: "tabpanel",
						"data-testid": "call-settings-panel",
						className: "min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[460px]",
						children: [
							g === "effects" ? o : null,
							g === "people" ? s : null,
							g === "chat" ? c : null
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { L as $, De as A, Ee as B, Re as C, Me as D, Fe as E, Se as F, ue as G, ye as H, be as I, K as J, se as K, xe as L, ge as M, _e as N, Ne as O, Oe as P, z as Q, we as R, Be as S, Le as T, he as U, ve as V, de as W, H as X, B as Y, W as Z, st as _, $ as a, Ze as b, Vt as c, bt as d, I as et, _t as f, ut as g, dt as h, en as i, Te as j, je as k, Mt as l, ft as m, ln as n, A as nt, qt as o, mt as p, oe as q, on as r, D as rt, Ht as s, dn as t, M as tt, St as u, ot as v, ze as w, Xe as x, nt as y, Ce as z };
