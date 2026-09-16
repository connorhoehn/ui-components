import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n, r } from "./useAudioRecorder-BhPxnLmg.js";
import { t as i } from "./Button-BhS4-R6_.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { t as o } from "./Chip-BENLwTlq.js";
import { t as s } from "./overlayStack-BFH9XXvN.js";
import { t as c } from "./Modal-CyoyiNKN.js";
import { n as l, t as u } from "./PermissionDeniedCard-BMjG5fxY.js";
import { t as d } from "./Spinner-CLcq5z8N.js";
import { t as f } from "./FormField-CimyMT7N.js";
import { n as p, r as m, t as h } from "./focusTrap-CmWJlptm.js";
import { t as g } from "./DockedPanelContext-pH9A5z1h.js";
import { t as _ } from "./Avatar-BzicCOft.js";
import { t as v } from "./Select-CqVokE2v.js";
import { t as y } from "./Slider-CUwLSARC.js";
import { r as b, t as x } from "./ChoiceList-CaZ4rZrS.js";
import { t as S } from "./activationKey-CjbL3LUv.js";
import { E as C, g as w } from "./StreamStage-d9JKcXlp.js";
import { useCallback as T, useEffect as E, useImperativeHandle as D, useLayoutEffect as O, useMemo as k, useRef as A, useState as j } from "react";
import { Fragment as M, jsx as N, jsxs as P } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var F = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function I({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = A(null), [m, h] = j("idle"), g = c ?? m;
	E(() => {
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
	}, [d, f]), E(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let _ = g !== "playing", v = F[g];
	return /* @__PURE__ */ P("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ N("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), _ && v && /* @__PURE__ */ P("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ N(L, {}), /* @__PURE__ */ N("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: v
			})]
		})]
	});
}
function L() {
	return /* @__PURE__ */ P("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ N("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ N("path", {
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
function R(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function z({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: a = !0, muted: o = !1, hideDownload: c = !1, header: l, footer: u, className: d }) {
	let f = k(() => n.filter((e) => !!e.url), [n]), [g, _] = j(0), v = f[g], y = A(null), b = A(null), x = s(!0);
	return E(() => {
		let e = (e) => {
			if (x()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				m(e, y.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, x]), E(() => (b.current = typeof document < "u" ? document.activeElement : null, h(y.current), () => {
		p(b.current), b.current = null;
	}), []), /* @__PURE__ */ N("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ P("div", {
			ref: y,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", d),
			children: [
				(r || i || l) && /* @__PURE__ */ P("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ P("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ N("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ N("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ P("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [l, /* @__PURE__ */ N("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				v ? /* @__PURE__ */ N("video", {
					src: v.url,
					controls: !0,
					autoPlay: a,
					muted: o,
					className: "w-full max-h-[70vh] bg-black"
				}, v.url) : /* @__PURE__ */ N("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				f.length > 1 && /* @__PURE__ */ N("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: f.map((t, n) => {
						let r = n === g;
						return /* @__PURE__ */ N("button", {
							type: "button",
							onClick: () => _(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : R(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(u || !c && v) && /* @__PURE__ */ P("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ N("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: u
					}), !c && v && /* @__PURE__ */ N("a", {
						href: v.url,
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
function B(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function V({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ N("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", B(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ N("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ P("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ N("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ N("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var H = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, U = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, ee = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function W({ quality: t, className: n, style: r }) {
	let i = H[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ P("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ N("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ N("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ N("span", {
			className: U[t],
			children: ee[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function G({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ N("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ N(C, {
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
var K = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function q(e) {
	return K[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function J({ reactions: t, className: n, style: r }) {
	let [i, a] = j([]);
	return E(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), E(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ N("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ N("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var Y = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function te({ onReact: t, emojis: n = Y, className: r, style: i }) {
	return /* @__PURE__ */ N("div", {
		"data-testid": "reaction-picker",
		className: e("flex gap-1 px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border", r),
		style: i,
		children: n.map((n) => {
			let r = q(n);
			return /* @__PURE__ */ N("button", {
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
var ne = /* @__PURE__ */ P("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ N("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ N("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ N("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ N("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function re({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, className: o }) {
	let [s, c] = j(!1);
	return /* @__PURE__ */ P("div", {
		className: e("relative inline-flex", o),
		children: [/* @__PURE__ */ N("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": s,
			disabled: a,
			onClick: () => c((e) => !e),
			"data-testid": "reaction-picker-open",
			className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", s ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white", a && "opacity-40 cursor-not-allowed"),
			children: ne
		}), s && /* @__PURE__ */ N(te, {
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
var ie = 3, ae = 1500, oe = 200;
function se({ reactions: e, currentTimeMs: t, className: n }) {
	let r = k(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = A(t), a = A([]), [o, s] = j([]);
	return E(() => {
		let e = i.current;
		if (i.current = t, t < e - ae) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > ie ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), E(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, oe);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ N("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ N(J, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function ce(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function le(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var ue = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, de = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function fe({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ P("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ P("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ N("span", { className: e("w-[7px] h-[7px] rounded-full", ue[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ N("span", {
					className: e("font-semibold", de[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ N("span", { children: ce(n) }),
			i !== void 0 && /* @__PURE__ */ N("span", { children: le(i) }),
			r !== void 0 && /* @__PURE__ */ P("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ P("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ N("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ N("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function pe(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function me(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function he({ participant: e, size: t = 32 }) {
	let n = me(e.displayName);
	return /* @__PURE__ */ P("div", {
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
			e.avatarUrl ? /* @__PURE__ */ N("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : pe(e.displayName),
			e.isSpeaking && /* @__PURE__ */ N("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ N("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ P("svg", {
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
						/* @__PURE__ */ N("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ N("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ N("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function ge({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ P("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ N(he, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ P("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ N(he, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var X = {
	mic: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ N("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ N("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ N("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ N("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ N("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ N("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ N("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ N("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ N("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ N("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ N("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ N("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ N("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ N("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ N("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ N("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	}),
	more: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			})
		]
	})
};
function _e({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s, expanded: c, buttonRef: l }) {
	return /* @__PURE__ */ N("button", {
		ref: l,
		type: "button",
		title: n,
		"aria-label": n,
		"aria-haspopup": c === void 0 ? void 0 : "menu",
		"aria-expanded": c,
		disabled: o,
		onClick: a,
		"data-testid": s,
		className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", i && "bg-danger text-white hover:bg-danger", r && !i && "bg-white/20 text-white", !r && !i && "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white", o && "opacity-40 cursor-not-allowed"),
		children: t
	});
}
function ve({ controls: t }) {
	let [n, r] = j(!1), i = A(null), a = A(null);
	return E(() => {
		if (!n) return;
		let e = (e) => {
			i.current?.contains(e.target) || r(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [n]), /* @__PURE__ */ P("div", {
		className: "relative inline-flex",
		ref: i,
		onKeyDown: (e) => {
			if (e.key === "Escape") {
				r(!1), a.current?.focus();
				return;
			}
			if (![
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = Array.from(i.current?.querySelectorAll("[role=\"menuitem\"]") ?? []);
			if (t.length === 0) return;
			e.preventDefault();
			let n = t.indexOf(document.activeElement), o;
			o = e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : e.key === "ArrowDown" ? n < 0 ? 0 : (n + 1) % t.length : n <= 0 ? t.length - 1 : n - 1, t[o].focus();
		},
		children: [/* @__PURE__ */ N(_e, {
			icon: X.more,
			label: "More call controls",
			active: n,
			expanded: n,
			buttonRef: a,
			onClick: () => r((e) => !e),
			testId: "call-controls-more-button"
		}), n && /* @__PURE__ */ N("div", {
			role: "menu",
			"aria-label": "More call controls",
			"data-testid": "call-controls-overflow",
			className: "absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg",
			children: t.map((t) => /* @__PURE__ */ P("button", {
				type: "button",
				role: "menuitem",
				"data-testid": t.testId,
				"aria-label": t.label,
				onClick: () => {
					t.onClick(), r(!1);
				},
				className: e("flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors", t.active ? "bg-white/15 text-white" : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"),
				children: [/* @__PURE__ */ N("span", {
					className: "shrink-0",
					"aria-hidden": "true",
					children: t.icon
				}), t.label]
			}, t.key))
		})]
	});
}
var ye = /* @__PURE__ */ new Set(["mute", "camera"]);
function be({ mode: t, density: n = "full", isMuted: r = !1, isCameraOn: i = !0, isScreenSharing: a = !1, onToggleMute: o, onToggleCamera: s, onToggleScreenShare: c, onUpgradeToVideo: l, onEndCall: u, onAddParticipant: d, availableParticipants: f, currentParticipantIds: p, onOpenAddParticipant: m, extras: h, className: g }) {
	let [_, v] = j(!1), y = new Set(p ?? []), b = (f ?? []).filter((e) => !y.has(e.id)), x = [];
	o && x.push({
		key: "mute",
		icon: r ? X.micOff : X.mic,
		label: r ? "Unmute" : "Mute",
		active: r,
		onClick: o,
		testId: "mute-button"
	}), t === "video" && s && x.push({
		key: "camera",
		icon: i ? X.camera : X.cameraOff,
		label: i ? "Turn off camera" : "Turn on camera",
		active: !i,
		onClick: s,
		testId: "camera-button"
	}), t === "audio" && l && x.push({
		key: "upgrade",
		icon: X.videoUpgrade,
		label: "Switch to video",
		onClick: l,
		testId: "upgrade-to-video-button"
	}), c && x.push({
		key: "screenshare",
		icon: X.screenShare,
		label: a ? "Stop sharing" : "Share screen",
		active: a,
		onClick: c,
		testId: "screenshare-button"
	}), (d || m) && x.push({
		key: "add-participant",
		icon: X.userPlus,
		label: "Add people to this call",
		active: _,
		onClick: m ?? (() => v((e) => !e)),
		testId: "add-participant-button"
	});
	let S = n === "compact", C = S ? x.filter((e) => ye.has(e.key)) : x, w = S ? x.filter((e) => !ye.has(e.key)) : [];
	return /* @__PURE__ */ P("div", {
		className: e("flex flex-col", g),
		children: [/* @__PURE__ */ P("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				C.map((e) => /* @__PURE__ */ N(_e, {
					icon: e.icon,
					label: e.label,
					active: e.active,
					onClick: e.onClick,
					testId: e.testId
				}, e.key)),
				w.length > 0 && /* @__PURE__ */ N(ve, { controls: w }),
				h,
				u && /* @__PURE__ */ N(_e, {
					icon: X.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: u,
					testId: "hangup-button"
				})
			]
		}), _ && d && !m && /* @__PURE__ */ P("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ N("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ N("button", {
					type: "button",
					onClick: () => v(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), b.length === 0 ? /* @__PURE__ */ N("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ N("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: b.map((e) => /* @__PURE__ */ P("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						d(e.id), b.length <= 1 && v(!1);
					},
					children: [
						/* @__PURE__ */ N(he, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ N("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ N("span", {
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
function xe(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var Se = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function Ce(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function we({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return xe(t) ? /* @__PURE__ */ P("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", Se[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ N(W, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ P("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ P("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ N("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), Ce(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ P("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ N("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ P("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ N("span", {
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
function Te({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "11",
				rx: "3"
			}),
			/* @__PURE__ */ N("path", { d: "M5 11a7 7 0 0 0 14 0" }),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ N("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function Ee({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ N("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ N("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ N("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
			/* @__PURE__ */ N("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ N("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function De({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [/* @__PURE__ */ N("path", { d: "M22 8l-6 4 6 4V8z" }), /* @__PURE__ */ N("rect", {
			x: "2",
			y: "6",
			width: "14",
			height: "12",
			rx: "2"
		})]
	});
}
function Oe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ N("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
			/* @__PURE__ */ N("path", { d: "M22 8l-6 4 6 4V8z" })
		]
	});
}
function ke({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("rect", {
				x: "2",
				y: "4",
				width: "20",
				height: "12",
				rx: "2"
			}),
			/* @__PURE__ */ N("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			}),
			/* @__PURE__ */ N("polyline", { points: "9 10 12 7 15 10" }),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "7",
				x2: "12",
				y2: "13"
			})
		]
	});
}
function Ae({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ N("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
			/* @__PURE__ */ N("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
			/* @__PURE__ */ N("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ N("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			})
		]
	});
}
function je({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
			/* @__PURE__ */ N("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
			/* @__PURE__ */ N("line", {
				x1: "22",
				y1: "2",
				x2: "2",
				y2: "22"
			})
		]
	});
}
function Me({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
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
			/* @__PURE__ */ N("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ N("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ N("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ N("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	});
}
function Ne({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("path", { d: "M12 3l1.9 5.1a1 1 0 0 0 .6.6L19.6 10.6a1 1 0 0 1 0 1.9L14.5 14.4a1 1 0 0 0-.6.6L12 20.1a1 1 0 0 1-1.9 0L8.2 15a1 1 0 0 0-.6-.6L2.5 12.5a1 1 0 0 1 0-1.9L7.6 8.7a1 1 0 0 0 .6-.6L10.1 3a1 1 0 0 1 1.9 0z" }),
			/* @__PURE__ */ N("path", { d: "M19 3v4" }),
			/* @__PURE__ */ N("path", { d: "M17 5h4" }),
			/* @__PURE__ */ N("path", { d: "M19 17v4" }),
			/* @__PURE__ */ N("path", { d: "M17 19h4" })
		]
	});
}
function Pe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ N("svg", {
		...Z(e, t),
		children: /* @__PURE__ */ N("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
	});
}
function Fe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ N("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ N("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
			/* @__PURE__ */ N("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
		]
	});
}
function Ie({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "14",
				rx: "2"
			}),
			/* @__PURE__ */ N("path", { d: "M10.5 10.2a2.2 2.2 0 1 0 0 3.6" }),
			/* @__PURE__ */ N("path", { d: "M16.5 10.2a2.2 2.2 0 1 0 0 3.6" })
		]
	});
}
function Le({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [
			/* @__PURE__ */ N("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			})
		]
	});
}
function Re({ size: e = 20, ...t }) {
	return /* @__PURE__ */ N("svg", {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", { d: "M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14Z" })
	});
}
function ze({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ N("rect", {
			x: "6",
			y: "5",
			width: "4",
			height: "14",
			rx: "1"
		}), /* @__PURE__ */ N("rect", {
			x: "14",
			y: "5",
			width: "4",
			height: "14",
			rx: "1"
		})]
	});
}
function Be({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ N("path", { d: "M14 4h6v6" }),
			/* @__PURE__ */ N("path", { d: "M20 4 10 14" }),
			/* @__PURE__ */ N("path", { d: "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" })
		]
	});
}
function Ve({ size: e = 20, ...t }) {
	return /* @__PURE__ */ P("svg", {
		...Z(e, t),
		children: [/* @__PURE__ */ N("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ N("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" })]
	});
}
//#endregion
//#region src/components/video/CallSidePanel.tsx
var He = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, Ue = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function We(e) {
	return e.toggleTestId ?? He[e.id] ?? `call-side-panel-open-${e.id}`;
}
function Ge(e) {
	return e.panelTestId ?? Ue[e.id] ?? `call-side-panel-body-${e.id}`;
}
function Ke(e) {
	return e === "mini" ? "overlay" : "docked";
}
function qe(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ N(Pe, { size: 16 });
		case "people": return /* @__PURE__ */ N(Fe, { size: 16 });
		case "captions": return /* @__PURE__ */ N(Ie, { size: 16 });
		case "devices": return /* @__PURE__ */ N(Ve, { size: 16 });
		default: return null;
	}
}
function Je({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, className: a, "data-testid": o = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ N("div", {
		"data-testid": o,
		className: e("flex items-center gap-1", a),
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let a = t.id === n, o = i || t.disabled === !0;
			return /* @__PURE__ */ P("button", {
				type: "button",
				"aria-label": t.label,
				"aria-pressed": a,
				title: t.label,
				disabled: o,
				"data-testid": We(t),
				"data-active": a ? "true" : "false",
				onClick: () => r?.(a ? null : t.id),
				className: e("relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", a ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white", o ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? qe(t.id) ?? /* @__PURE__ */ N("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ N("span", {
					"data-testid": `${We(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var Ye = "__legacy__";
function Xe({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = f ? t : [{
		id: Ye,
		label: s ?? "",
		content: c
	}], m = f ? n ?? null : a ? Ye : null, h = p.find((e) => e.id === m) ?? null;
	if (!h) return null;
	let _ = Ke(i), v = f && p.length > 1;
	return /* @__PURE__ */ P("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": _,
		"data-call-side-panel-tab": f ? h.id : void 0,
		"aria-label": h.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", _ === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ P("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [v ? /* @__PURE__ */ N("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: p.map((t) => {
					let n = t.id === h.id;
					return /* @__PURE__ */ N("button", {
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
			}) : /* @__PURE__ */ N("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: h.label
			}), /* @__PURE__ */ N("button", {
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ N("div", {
			role: v ? "tabpanel" : void 0,
			"data-testid": f ? Ge(h) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ N(g, {
				hasHeader: !0,
				fillsHeight: !0,
				children: h.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function Ze(e) {
	return e === "docked" ? "window" : e;
}
function Qe(e) {
	return e === "window" ? "docked" : e;
}
function $e(e) {
	return e ? "mini" : "window";
}
var et = /* @__PURE__ */ new Set();
function tt(e, t) {
	process.env.NODE_ENV !== "production" && (et.has(e) || (et.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var nt = "w-[380px]", rt = "w-[480px]", it = "h-[480px]", at = "application/x-call-dock";
function ot(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function st({ stream: t, muted: n = !1, className: r }) {
	let i = A(null);
	return E(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ N("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var ct = {
	phoneEnd: /* @__PURE__ */ P("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ N("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ N("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ N("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ P("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ N("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ N("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ N("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ N("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ P("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ N("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	}),
	grip: /* @__PURE__ */ P("svg", {
		width: "10",
		height: "12",
		viewBox: "0 0 10 16",
		fill: "currentColor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ N("circle", {
				cx: "3",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "7",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "3",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "7",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "3",
				cy: "13",
				r: "1.3"
			}),
			/* @__PURE__ */ N("circle", {
				cx: "7",
				cy: "13",
				r: "1.3"
			})
		]
	}),
	dockTo: /* @__PURE__ */ P("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ N("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "16",
			rx: "2"
		}), /* @__PURE__ */ N("line", {
			x1: "15",
			y1: "4",
			x2: "15",
			y2: "20"
		})]
	})
};
function lt({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ P("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ N("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ N("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ N("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "text-center",
				children: [/* @__PURE__ */ N("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ N("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: ct.phoneEnd
				}), t && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: ct.phoneAnswer
				})]
			})
		]
	});
}
function ut({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, onAddParticipant: p, availableParticipants: m, onOpenAddParticipant: h, controlsExtras: g, onEndCall: _, layoutComponent: v, callStats: y }) {
	let b = t === "video" && s;
	return /* @__PURE__ */ P("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			v && /* @__PURE__ */ P("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [v, /* @__PURE__ */ N(we, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			!v && t === "video" && /* @__PURE__ */ P("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && b ? /* @__PURE__ */ N(st, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ N("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ N(he, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ P("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ N(st, { stream: r[0].videoStream }) : /* @__PURE__ */ N("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ N(he, {
								participant: r[0],
								size: 28
							})
						}), r[0].isMuted && /* @__PURE__ */ N("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ P("svg", {
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
									/* @__PURE__ */ N("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ N("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ N("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ N(we, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			!v && t === "audio" && /* @__PURE__ */ N("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ N(ge, {
					participants: r,
					localFallback: i,
					maxVisible: 4,
					avatarSize: 36
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "text-center py-1.5 shrink-0",
				children: [a !== void 0 && /* @__PURE__ */ N("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": a,
					children: ot(a)
				}), /* @__PURE__ */ P("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ N(be, {
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
function dt({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ P("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? S(c) : void 0,
		children: [
			/* @__PURE__ */ N("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ N("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ N("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ P("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ N("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: ot(r)
						})
					]
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ N("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ P(M, { children: [
							/* @__PURE__ */ N("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ N("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ N("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ N("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ N("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ P("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ N("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ N("line", {
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
function ft(e) {
	let t = e.getBoundingClientRect(), n = null;
	for (let e of document.querySelectorAll("[data-call-dock-target]")) {
		let r = e.dataset.callDockTarget;
		if (!r) continue;
		let i = e.getBoundingClientRect(), a = Math.min(t.right, i.right) - Math.max(t.left, i.left), o = Math.min(t.bottom, i.bottom) - Math.max(t.top, i.top);
		if (a <= 0 || o <= 0) continue;
		let s = a * o;
		s < i.width * i.height * .25 || (!n || s > n.area) && (n = {
			id: r,
			el: e,
			area: s
		});
	}
	return n ? {
		id: n.id,
		el: n.el
	} : null;
}
function pt(e, t, n) {
	let [r, i] = j({
		x: 0,
		y: 0
	}), [a, o] = j(!1), [s, c] = j(!1), l = A(null), u = T(() => {
		l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 200);
	}, []);
	E(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let d = A(!1), f = A({
		x: 0,
		y: 0
	}), p = A({
		x: 0,
		y: 0
	}), m = A(null), h = T((t) => {
		e && (d.current = !0, o(!0), c(!1), f.current = {
			x: t.clientX,
			y: t.clientY
		}, p.current = { ...r }, t.preventDefault());
	}, [e, r]), g = T(() => {
		c(!0), i({
			x: 0,
			y: 0
		}), u();
	}, [u]), _ = T((e) => {
		let t = m.current;
		if (!t) return;
		let n = t.offsetParent, a = window.innerWidth, o = window.innerHeight;
		n && (a = n.clientWidth, o = n.clientHeight);
		let s = t.getBoundingClientRect(), l = n ? n.getBoundingClientRect() : {
			left: 0,
			top: 0
		}, d, f;
		switch (e) {
			case "top-left":
				d = 16, f = 16;
				break;
			case "top-right":
				d = a - s.width - 16, f = 16;
				break;
			case "bottom-left":
				d = 16, f = o - s.height - 16;
				break;
			default: d = a - s.width - 16, f = o - s.height - 16;
		}
		let p = s.left - l.left - r.x, h = s.top - l.top - r.y;
		c(!0), i({
			x: d - p,
			y: f - h
		}), u();
	}, [r, u]), v = A(_);
	v.current = _;
	let y = A(g);
	y.current = g;
	let b = A(t);
	b.current = t;
	let x = A(n);
	x.current = n;
	let S = A(null);
	return E(() => {
		if (!e) return;
		let t = (e) => {
			if (!d.current) return;
			i({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
			let t = m.current, n = (t ? ft(t) : null)?.id ?? null;
			n !== S.current && (S.current = n, b.current?.(n));
		}, n = () => {
			if (!d.current) return;
			d.current = !1, o(!1);
			let e = m.current;
			if (!e) return;
			let t = ft(e);
			if (S.current !== null && (S.current = null, b.current?.(null)), t && x.current?.(t.id)) {
				y.current();
				return;
			}
			let n = e.offsetParent, r = window.innerWidth, i = window.innerHeight;
			if (n) {
				let e = n.getBoundingClientRect();
				r = e.width, i = e.height;
			}
			let a = e.getBoundingClientRect(), s = n ? n.getBoundingClientRect() : {
				left: 0,
				top: 0
			}, c = a.left - s.left, l = a.top - s.top, u = r - (c + a.width), f = i - (l + a.height), p = c < 80, h = u < 80, g = l < 80, _ = f < 80;
			g && p ? v.current("top-left") : g && h ? v.current("top-right") : _ && p ? v.current("bottom-left") : _ && h && v.current("bottom-right");
		};
		return document.addEventListener("mousemove", t), document.addEventListener("mouseup", n), () => {
			document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", n);
		};
	}, [e]), {
		offset: r,
		handleMouseDown: h,
		resetOffset: g,
		snapToCorner: _,
		isDragging: a,
		isAnimating: s,
		hasMoved: r.x !== 0 || r.y !== 0,
		widgetRef: m
	};
}
function mt({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ N("div", {
		className: e(n ? "absolute z-[49]" : "fixed z-[10000]", "inset-0 pointer-events-none"),
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ N("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ N("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ N("rect", {
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
function ht({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: b, onMinimize: x, onExpand: S, layoutComponent: C, callStats: w, displayMode: D, minimized: O, sidePanelTabs: j, activeSidePanelTab: F = null, onSidePanelTabChange: I, sidePanelWidthClassName: L = "w-80", dockTargets: R, activeDockId: z = null, onDockTo: B, onDragStateChange: V, position: H = "bottom-right", contained: U = !1, draggable: ee = !0, className: W, style: G, dataAttrs: K }) {
	D !== void 0 && O !== void 0 && tt("CallWidget", "minimized");
	let q = D ?? $e(O ?? !1), J = q === "mini", Y = j ?? [], te = Y.length > 0 && !J && t === "active", ne = te && Y.some((e) => e.id === F), re = (R ?? []).length > 0, ie = re && z != null, ae = ee && !ie, oe = K?.["data-call-id"], se = oe == null || oe === "" ? void 0 : String(oe), ce = T((e) => {
		let t = e.dataTransfer;
		if (!t) return;
		let n = {
			callId: se,
			fromDockId: z ?? null
		};
		t.setData(at, JSON.stringify(n)), t.effectAllowed = "move";
	}, [se, z]), { offset: le, handleMouseDown: ue, resetOffset: de, snapToCorner: fe, isDragging: pe, isAnimating: me, hasMoved: he, widgetRef: ge } = pt(ae, T((e) => {
		for (let t of document.querySelectorAll("[data-call-dock-target]")) e && t.dataset.callDockTarget === e ? t.dataset.pointerOver = "true" : delete t.dataset.pointerOver;
	}, []), T((e) => B ? (B(e), !0) : !1, [B])), X = A(V);
	X.current = V, E(() => {
		X.current?.(pe);
	}, [pe]);
	let _e = {};
	if (K) for (let [e, t] of Object.entries(K)) t != null && t !== "" && (_e[e] = t);
	let ve = k(() => {
		switch (H) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [H]);
	if (t === "idle" || t === "ended") return null;
	let ye = /* @__PURE__ */ P(M, { children: [
		t === "ringing" && /* @__PURE__ */ N(lt, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ P("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ N("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ N("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ N(ut, {
			mode: n,
			fillHeight: ne,
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
			controlsExtras: te ? /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N(Je, {
				tabs: Y,
				activeTab: F,
				onTabChange: I
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: C,
			callStats: w
		})
	] });
	return /* @__PURE__ */ P(M, { children: [pe && /* @__PURE__ */ N(mt, {
		onSnap: fe,
		contained: U
	}), /* @__PURE__ */ N("div", {
		ref: ge,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": q,
		"data-call-widget-mode-legacy": Qe(q),
		"data-call-dock-id": ie ? z : void 0,
		className: e(ie ? "relative" : [U ? "absolute z-50" : "fixed z-[10001]", ve], W),
		style: {
			transform: ie ? void 0 : `translate(${le.x}px, ${le.y}px)`,
			transition: me ? "transform 0.2s ease-out" : void 0,
			...G
		},
		..._e,
		children: /* @__PURE__ */ P("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", J ? "w-[260px]" : ne ? "w-auto" : nt),
			"data-call-side-panel-open": ne ? "true" : "false",
			children: [
				!J && /* @__PURE__ */ P("div", {
					className: e("relative flex items-center justify-between px-3 py-2 border-b border-white/5", ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					draggable: ie || void 0,
					onDragStart: re ? ce : void 0,
					"data-call-dock-source": re ? "true" : void 0,
					children: [/* @__PURE__ */ P("div", {
						className: "flex items-center gap-2",
						children: [
							re && /* @__PURE__ */ N("span", {
								draggable: !0,
								onMouseDown: (e) => e.stopPropagation(),
								className: "flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors",
								title: "Drag the call into the page",
								"data-testid": "call-dock-drag-handle",
								"aria-hidden": !0,
								children: ct.grip
							}),
							/* @__PURE__ */ N("span", { className: "w-2 h-2 rounded-full bg-success" }),
							/* @__PURE__ */ N("span", {
								className: "text-white/80 text-xs font-medium",
								"data-testid": "call-widget-title",
								children: n === "video" ? "Video Call" : "Audio Call"
							})
						]
					}), /* @__PURE__ */ P("div", {
						className: "flex items-center gap-1",
						children: [
							he && /* @__PURE__ */ N("button", {
								type: "button",
								onClick: de,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: ct.snapBack
							}),
							S && /* @__PURE__ */ N("button", {
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ N("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ N("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							x && /* @__PURE__ */ N("button", {
								type: "button",
								onClick: x,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: ct.minimize
							})
						]
					})]
				}),
				J && /* @__PURE__ */ N("div", {
					className: e(ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					children: /* @__PURE__ */ N(dt, {
						state: t,
						mode: n,
						duration: o,
						isMuted: s,
						callerName: a,
						onToggleMute: p,
						onEndCall: f,
						onExpand: x
					})
				}),
				!J && (ne ? /* @__PURE__ */ P("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ N("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: ye
					}), /* @__PURE__ */ N(Xe, {
						mode: q,
						tabs: Y,
						activeTab: F,
						onTabChange: I,
						widthClassName: L
					})]
				}) : ye)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function gt({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", className: l, style: u, "data-testid": d = "call-tile-row" }) {
	let f = n ? [...t, n] : t, p = f.map((t) => /* @__PURE__ */ N(C, {
		id: t.id,
		displayName: t.displayName,
		...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
		isMuted: t.isMuted,
		isLocal: t.isLocal,
		isSpeaking: t.id === r,
		videoElement: t.videoElement,
		...s ? { onClick: () => s(t.id) } : {},
		className: e("shrink-0", c === "floating" && "rounded-xl shadow-lg ring-1 ring-black/10"),
		style: { width: i }
	}, t.id)), m = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ P("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", l),
		style: u,
		role: "group",
		"aria-label": m,
		"data-testid": d,
		"data-variant": "floating",
		"data-tile-count": f.length,
		children: [/* @__PURE__ */ N("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${d}-tiles`,
			children: f.map((t) => t.videoElement ? /* @__PURE__ */ N(C, {
				id: t.id,
				displayName: t.displayName,
				...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
				isMuted: t.isMuted,
				isLocal: t.isLocal,
				isSpeaking: t.id === r,
				videoElement: t.videoElement,
				...s ? { onClick: () => s(t.id) } : {},
				className: e("shrink-0 rounded-xl !border-0 shadow-lg ring-2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&>*:first-child]:h-full [&>*:first-child]:w-full", t.id === r ? "ring-success" : "ring-white/80"),
				style: { width: i }
			}, t.id) : /* @__PURE__ */ N(_t, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ N("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${d}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ P("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", l),
		style: u,
		role: "group",
		"aria-label": m,
		"data-testid": d,
		"data-variant": "bar",
		"data-tile-count": f.length,
		children: [
			o && /* @__PURE__ */ N("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${d}-title`,
				children: o
			}),
			/* @__PURE__ */ N("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${d}-tiles`,
				children: p
			}),
			a && /* @__PURE__ */ N("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${d}-controls`,
				children: a
			})
		]
	});
}
function _t({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ P("div", {
		className: e("relative shrink-0 rounded-full shadow-lg ring-2 transition-shadow", n ? "ring-success" : "ring-white/70", r && "cursor-pointer"),
		title: i,
		"aria-label": i,
		role: r ? "button" : "img",
		tabIndex: r ? 0 : void 0,
		onClick: r,
		onKeyDown: r ? (e) => {
			(e.key === "Enter" || e.key === " ") && r();
		} : void 0,
		"data-testid": t.isLocal ? "local-bubble" : "remote-bubble",
		"data-peer-id": t.id,
		"data-is-muted": t.isMuted ? "true" : "false",
		children: [/* @__PURE__ */ N(_, {
			name: t.displayName,
			size: 44,
			...t.avatarUrl ? { src: t.avatarUrl } : {}
		}), t.isMuted && /* @__PURE__ */ N("span", {
			className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
			"aria-hidden": "true",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function vt({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", media: o, onJoin: s, onDismiss: c, autoExpireSec: l = 30, className: u, style: d }) {
	let [f, p] = j(!0), m = t(c);
	if (E(() => {
		if (!l || l <= 0) return;
		let e = setTimeout(() => {
			p(!1), m();
		}, l * 1e3);
		return () => clearTimeout(e);
	}, [l, m]), !f) return null;
	let h = [o === "audio" ? "Audio call" : o === "video" ? "Video call" : null, i].filter(Boolean).join(" · ");
	return /* @__PURE__ */ P("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-call-media": o,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", u),
		style: d,
		children: [
			/* @__PURE__ */ N(yt, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ P("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ N("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), h && /* @__PURE__ */ N("p", {
					className: "text-xs text-white/60 m-0 truncate",
					"data-testid": "incoming-call-subtitle",
					children: h
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: () => {
						p(!1), c();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), s && /* @__PURE__ */ N("button", {
					type: "button",
					onClick: () => {
						p(!1), s();
					},
					className: "text-xs font-semibold bg-success hover:bg-success text-white px-3 py-1.5 rounded",
					"aria-label": "Join call",
					"data-testid": "incoming-call-join",
					children: "Join"
				})]
			})
		]
	});
}
function yt({ name: e, avatarUrl: t }) {
	let n = xt(e);
	return /* @__PURE__ */ P("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ N("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : bt(e), /* @__PURE__ */ N("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function bt(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function xt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function St(e) {
	let t = e.split("#")[0].split("?")[0].toLowerCase();
	return t.endsWith(".m3u8") ? "hls" : /\.(mp4|m4v|mov|webm|ogv|ogg|m4a|mp3|wav|aac)$/.test(t) ? "progressive" : "unknown";
}
function Ct(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function wt({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = A(null), d = A(null), f = A(s);
	f.current = s;
	let [p, m] = j(!1), [h, g] = j(0), [_, y] = j(0), [b, x] = j(1), [S, C] = j(1), [w, T] = j(!1), [D, O] = j(null);
	E(() => {
		let e = u.current;
		if (!e || !t) return;
		if (O(null), T(!0), St(t) === "progressive" || e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
					O("HLS playback is not supported in this browser."), T(!1);
					return;
				}
				let i = new r({ enableWorker: !0 });
				d.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (O(`HLS error: ${t.type}`), f.current?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				O(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
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
	let M = () => {
		let e = u.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, F = (e) => {
		let t = u.current;
		!t || !isFinite(_) || _ <= 0 || (t.currentTime = Number(e.target.value));
	}, I = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, x(n);
	}, L = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, C(n);
	}, R = () => {
		let e = u.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, z = k(() => _ > 0 ? Math.min(100, h / _ * 100) : 0, [h, _]);
	return /* @__PURE__ */ P("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ N("video", {
				ref: u,
				autoPlay: r,
				muted: i,
				poster: n,
				playsInline: !0,
				className: "w-full h-full object-contain",
				onPlay: () => m(!0),
				onPause: () => m(!1),
				onLoadedMetadata: (e) => {
					let t = e.currentTarget;
					y(t.duration), T(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					g(t.currentTime), o?.(t.currentTime, t.duration);
				},
				onWaiting: () => T(!0),
				onCanPlay: () => T(!1),
				onError: () => {
					O("Playback error."), s?.(/* @__PURE__ */ Error("video element error")), T(!1);
				}
			}),
			w && !D && /* @__PURE__ */ N("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			D && /* @__PURE__ */ N("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: D
			}),
			/* @__PURE__ */ P("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ N("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: Ct(h)
						}),
						/* @__PURE__ */ N("input", {
							type: "range",
							min: 0,
							max: isFinite(_) ? _ : 0,
							step: .1,
							value: h,
							onChange: F,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${z}%` }
						}),
						/* @__PURE__ */ N("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: Ct(_)
						})
					]
				}), /* @__PURE__ */ P("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ N("button", {
							type: "button",
							onClick: M,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ P("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ N("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ N("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ N("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ N("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ P("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ N("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ N("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: b,
								onChange: I,
								className: "w-20 h-1 accent-white/90 cursor-pointer",
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ N(v, {
							size: "sm",
							value: String(S),
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
						/* @__PURE__ */ N("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ N("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ N("button", {
							type: "button",
							onClick: R,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ N("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ N("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function Tt(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function Et(e) {
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
function Dt({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ P("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ N("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ N("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function Ot({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ P("div", {
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
			/* @__PURE__ */ P("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ N("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ N("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ N("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ N("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ N(Dt, { status: s }),
					/* @__PURE__ */ N("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: Tt(r)
					})
				]
			}),
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ N("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? Et(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ P("span", {
					className: "inline-flex shrink-0 items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)]",
					title: `${i} ${i === 1 ? "person" : "people"} in this call`,
					children: [i, /* @__PURE__ */ N(Fe, { size: 12 })]
				})]
			}),
			o && /* @__PURE__ */ N("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: Et(n)
			}),
			u && /* @__PURE__ */ N("div", {
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
function kt({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ N("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ P("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ N("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ N("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ N("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ N("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ N(Ot, {
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
//#region src/components/video/RecordingExpiryDialog.tsx
var At = 864e5, jt = [
	{
		id: "30d",
		title: "In 30 days",
		days: 30
	},
	{
		id: "90d",
		title: "In 90 days",
		days: 90
	},
	{
		id: "365d",
		title: "In a year",
		days: 365
	},
	{
		id: "never",
		title: "Never"
	},
	{
		id: "custom",
		title: "On a date…"
	}
];
function Mt(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function Nt(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
function Pt(e, t, n = Date.now()) {
	if (e === "never") return null;
	let r = jt.find((t) => t.id === e);
	if (r?.days) return new Date(n + r.days * At).toISOString();
	if (e === "custom") {
		if (!t) return;
		let e = /* @__PURE__ */ new Date(`${t}T23:59:59`);
		return Number.isNaN(e.getTime()) ? void 0 : e.toISOString();
	}
}
function Ft({ open: e, expiresAt: t, onSave: n, onClose: r, title: a = "Recording expiry", "data-testid": o = "recording-expiry-dialog" }) {
	let [s, l] = j(t === null ? "never" : "custom"), [u, d] = j(t ? Nt(Date.parse(t)) : ""), [p, m] = j(!1), [h, g] = j(null);
	E(() => {
		e && (l(t === null ? "never" : "custom"), d(t ? Nt(Date.parse(t)) : ""), g(null), m(!1));
	}, [e, t]);
	let _ = k(() => Pt(s, u), [s, u]), v = typeof _ == "string" && Date.parse(_) < Date.now() + 36e5, y = _ !== void 0 && !v && !p, S = t === null ? "This recording does not expire." : t ? `Set to expire ${Mt(t)}.` : "No expiry is recorded.", C = async () => {
		if (_ !== void 0) {
			m(!0), g(null);
			try {
				await n(_), r();
			} catch (e) {
				g(e instanceof Error ? e.message : String(e)), m(!1);
			}
		}
	};
	return /* @__PURE__ */ N(c, {
		open: e,
		onClose: r,
		title: a,
		maxWidth: 440,
		footer: /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N(i, {
			variant: "secondary",
			size: "sm",
			onClick: r,
			disabled: p,
			"data-testid": `${o}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ N(i, {
			variant: "primary",
			size: "sm",
			onClick: () => void C(),
			disabled: !y,
			"data-testid": `${o}-save`,
			children: p ? "Saving…" : "Save"
		})] }),
		children: /* @__PURE__ */ P("div", {
			className: "flex min-h-[19rem] flex-col gap-3 text-sm",
			"data-testid": o,
			children: [
				/* @__PURE__ */ N("p", {
					className: "m-0 text-text-secondary",
					"data-testid": `${o}-current`,
					children: S
				}),
				/* @__PURE__ */ N(x, {
					"data-testid": `${o}-choices`,
					children: jt.map((e) => /* @__PURE__ */ N(b, {
						title: e.title,
						selected: s === e.id,
						onSelect: () => l(e.id),
						disabled: p,
						"data-testid": `${o}-choice-${e.id}`
					}, e.id))
				}),
				s === "custom" && /* @__PURE__ */ N(f, {
					label: "Expires on",
					hint: "At the end of that day, your local time.",
					...v ? { error: "Pick a date at least an hour from now." } : {},
					children: (e) => /* @__PURE__ */ N("input", {
						...e,
						type: "date",
						value: u,
						min: Nt(Date.now()),
						onChange: (e) => d(e.target.value),
						className: "rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary",
						"data-testid": `${o}-date`
					})
				}),
				h && /* @__PURE__ */ N("p", {
					className: "m-0 text-xs text-danger-fg",
					role: "alert",
					"data-testid": `${o}-error`,
					children: h
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/TranscriptPanel.tsx
function It(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function Lt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function Rt({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, errorDetail: s, pendingMessage: c, idleState: u, className: d }) {
	let f = A(null), p = k(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return E(() => {
		if (p < 0 || !f.current) return;
		let e = f.current.querySelector(`[data-seg-index="${p}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [p]), t === "idle" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", d),
		children: [/* @__PURE__ */ N("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-tertiary",
			children: u ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", d),
		children: [/* @__PURE__ */ P("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ N("span", { children: a }),
				/* @__PURE__ */ N("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ N("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-secondary",
			children: c ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", d),
		children: [
			/* @__PURE__ */ P("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [a, " — failed"]
			}),
			/* @__PURE__ */ N("div", {
				className: "text-sm text-text-secondary",
				children: o ?? "Transcript generation failed. Reach out to support if this persists."
			}),
			/* @__PURE__ */ N(l, {
				text: s,
				className: "mt-2"
			})
		]
	}) : !n || n.length === 0 ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", d),
		children: [/* @__PURE__ */ N("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", d),
		children: [/* @__PURE__ */ P("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ P("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ N("div", {
			ref: f,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === p, a = Lt(t.speakerId), o = !!i;
				return /* @__PURE__ */ P("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? S(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${It(t.startMs)} — ${t.speakerLabel}` : void 0,
					children: [/* @__PURE__ */ P("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ N("span", {
							className: "text-xs font-semibold",
							style: { color: `hsl(${a}, 65%, 60%)` },
							children: t.speakerLabel
						}), /* @__PURE__ */ N("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: It(t.startMs)
						})]
					}), /* @__PURE__ */ N("p", {
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
function zt({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, errorDetail: o, pendingMessage: s, idleState: c, className: u }) {
	return t === "idle" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ N("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ P("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ N("span", { children: i }), /* @__PURE__ */ N("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-secondary",
			children: s ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", u),
		children: [
			/* @__PURE__ */ P("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [i, " — failed"]
			}),
			/* @__PURE__ */ N("div", {
				className: "text-sm text-text-secondary",
				children: a ?? "Summary generation failed."
			}),
			/* @__PURE__ */ N(l, {
				text: o,
				className: "mt-2"
			})
		]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ N("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ N("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ P("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", u),
		children: [/* @__PURE__ */ N("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ N("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ N("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function Bt({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = j(!1), [o, s] = j(!1);
	E(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), E(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = T(async () => {
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
	return /* @__PURE__ */ N("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ N("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ N("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function Vt(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function Ht({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, tone: s = "light", className: c }) {
	let l = s === "dark", u = i ?? t.length;
	return /* @__PURE__ */ P("aside", {
		className: e("flex flex-col w-64 shrink-0", l ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", c),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ P("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", l ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ N("h3", {
					className: e("text-sm font-semibold", l ? "text-white" : "text-[var(--color-text-primary)]"),
					children: a
				}), /* @__PURE__ */ N("span", {
					className: e("text-xs tabular-nums", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					children: u
				})]
			}),
			/* @__PURE__ */ N("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ N("li", { children: /* @__PURE__ */ P("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ P("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ N("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ N("span", { children: Vt(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ N("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ P("span", {
								className: e("flex-1 truncate text-sm", l ? "text-white/90" : "text-[var(--color-text-primary)]"),
								children: [t.displayName, t.isLocal && /* @__PURE__ */ N("span", {
									className: e("ml-1 text-xs", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ N("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ N("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: l ? "text-white/50" : "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ N("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ N("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var Ut = null;
function Wt() {
	if (Ut) return Ut;
	try {
		return Ut = new AudioContext(), Ut;
	} catch {
		return null;
	}
}
function Gt({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = j(!1);
	return E(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = Wt();
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
	]), E(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var Kt = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function qt() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function Jt({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = j(!1), c = A(null), l = a.videoRef ?? c, u = T((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = T(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		qt(), s(!1);
	}, [l]);
	return /* @__PURE__ */ P("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ N(w, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ N("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ N("button", {
				type: "button",
				onClick: d,
				className: e(Kt, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var Yt = 1;
function Xt({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = j(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== Yt ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: Zt(r.x, t.x),
				y: Zt(r.y, t.y),
				width: Zt(r.width, t.width),
				height: Zt(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = A(null), o = A(!1), s = A(r);
	s.current = r;
	let c = A({
		key: e,
		value: r
	}), l = T((e, t) => {
		try {
			let n = {
				v: Yt,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return E(() => {
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
	]), E(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: T((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Zt(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var Qt = 320, $t = 200, en = 640, tn = 400, nn = 1440, rn = 900, an = 960, on = 600, Q = 8;
function sn({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", inline: s = !1, onModeChange: c, persistKey: l, apiRef: u, defaultCorner: d = "bottom-right", expandable: f = !0, sidePanelTabs: p, activeSidePanelTab: m = null, onSidePanelTabChange: h, zIndex: g = 9999, className: _, "data-testid": v = "expandable-call-widget" }) {
	let y = o === "docked" ? "window" : o, b = k(() => y === "window" ? fn(an, on) : pn(d), [y, d]), { state: x, setState: S } = Xt({
		persistKey: l,
		defaults: {
			mode: y,
			x: b.x,
			y: b.y,
			width: an,
			height: on
		}
	}), [C, w] = j(!1), M = C ? "fullscreen" : x.mode, F = A(null), I = p ?? [], L = I.length > 0, R = L && I.some((e) => e.id === m), z = A(!1);
	E(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== F.current && C && (w(!1), z.current || S({ mode: "window" }), z.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [C, S]);
	let B = T(() => {
		let e = F.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => w(!0), () => {}) : w(!0);
	}, []), V = T(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (z.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), H = T((e) => {
		let t = Ze(e);
		if (t !== M) {
			if (t === "fullscreen") {
				B();
				return;
			}
			if (M === "fullscreen") {
				V(), S({ mode: t });
				return;
			}
			if (t === "window" && M === "mini") {
				let e = fn(x.width, x.height);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && M === "window") {
				let e = pn(d);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			S({ mode: t });
		}
	}, [
		M,
		B,
		V,
		S,
		x.width,
		x.height,
		d
	]);
	E(() => {
		c?.(M);
	}, [M, c]), D(u, () => ({
		mode: M,
		setMode: H
	}), [M, H]);
	let U = A(null), ee = T((e) => {
		M === "window" && (e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), U.current = {
			startX: e.clientX,
			startY: e.clientY,
			origX: x.x,
			origY: x.y
		}));
	}, [
		M,
		x.x,
		x.y
	]), W = T((e) => {
		let t = U.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = hn(t.origX + n, x.width, window.innerWidth), a = hn(t.origY + r, x.height, window.innerHeight);
		S({
			x: i,
			y: a
		});
	}, [
		S,
		x.width,
		x.height
	]), G = T((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), U.current = null;
	}, []), K = A(null), q = T((e) => {
		M === "window" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), K.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: x.width,
			origH: x.height
		});
	}, [
		M,
		x.width,
		x.height
	]), J = T((e) => {
		let t = K.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = mn(t.origW + n, en, Math.min(nn, window.innerWidth - 16)), a = mn(t.origH + r, tn, Math.min(rn, window.innerHeight - 16));
		S({
			width: i,
			height: a
		});
	}, [S]), Y = T((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), K.current = null;
	}, []);
	O(() => {
		if (M !== "window") return;
		let e = () => {
			let e = hn(x.x, x.width, window.innerWidth), t = hn(x.y, x.height, window.innerHeight);
			(e !== x.x || t !== x.y) && S({
				x: e,
				y: t
			});
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		M,
		x.x,
		x.y,
		x.width,
		x.height,
		S
	]);
	let te = k(() => s ? {
		position: "relative",
		width: "100%",
		height: "auto"
	} : M === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: g
	} : M === "window" ? {
		position: "fixed",
		left: x.x,
		top: x.y,
		width: x.width,
		height: x.height,
		zIndex: g
	} : {
		position: "fixed",
		left: x.x,
		top: x.y,
		width: Qt,
		height: $t,
		zIndex: g
	}, [
		s,
		M,
		x.x,
		x.y,
		x.width,
		x.height,
		g
	]);
	return /* @__PURE__ */ P("div", {
		ref: F,
		"data-testid": v,
		"data-call-widget-mode": M,
		"data-call-widget-mode-legacy": Qe(M),
		"data-call-side-panel-open": R ? "true" : "false",
		style: te,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", M === "fullscreen" ? "rounded-none" : "rounded-lg", _),
		children: [
			/* @__PURE__ */ P("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", M === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: ee,
				onPointerMove: W,
				onPointerUp: G,
				onPointerCancel: G,
				children: [/* @__PURE__ */ P("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ N("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ N("span", {
							className: "truncate font-medium",
							"data-testid": "call-widget-window-title",
							children: t
						}),
						n && /* @__PURE__ */ N("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ N("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: ot(r)
						})
					]
				}), f && /* @__PURE__ */ P("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ N(cn, {
							active: M === "mini",
							label: "Mini",
							onClick: () => H("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ N(ln, {})
						}),
						/* @__PURE__ */ N(cn, {
							active: M === "window",
							label: "Window",
							onClick: () => H("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ N(un, {})
						}),
						/* @__PURE__ */ N(cn, {
							active: M === "fullscreen",
							label: "Fullscreen",
							onClick: () => H(M === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ N(dn, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: e("relative flex-1 min-h-0 bg-black", R && "flex items-stretch"),
				children: [R ? /* @__PURE__ */ N("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, R && /* @__PURE__ */ N(Xe, {
					mode: M,
					tabs: I,
					activeTab: m,
					onTabChange: h,
					widthClassName: M === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || L) && /* @__PURE__ */ N("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: L ? /* @__PURE__ */ P("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ N("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ N(Je, {
						tabs: I,
						activeTab: m,
						onTabChange: h
					})]
				}) : a
			}),
			M === "window" && /* @__PURE__ */ N("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: q,
				onPointerMove: J,
				onPointerUp: Y,
				onPointerCancel: Y,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ N("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ N("path", {
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
function cn({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ N("button", {
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
function ln() {
	return /* @__PURE__ */ N("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ N("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function un() {
	return /* @__PURE__ */ N("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ N("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function dn() {
	return /* @__PURE__ */ N("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ N("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function fn(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(Q, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(Q, Math.floor((window.innerHeight - t) / 2))
	};
}
function pn(e) {
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
			x: t - Qt - Q,
			y: Q
		};
		case "bottom-left": return {
			x: Q,
			y: n - $t - Q
		};
		default: return {
			x: t - Qt - Q,
			y: n - $t - Q
		};
	}
}
function mn(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function hn(e, t, n) {
	return mn(e, Q, Math.max(Q, n - t - Q));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function gn({ show: e, label: t }) {
	return e ? /* @__PURE__ */ P("div", {
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
function _n({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ N("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var vn = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], yn = 3e3, bn = .35;
function xn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return vn[Math.abs(t) % vn.length];
}
function Sn({ lines: t, maxLines: n = 4, fadeAfterMs: r = yn, now: i, className: a }) {
	let [, o] = j(0), s = i === void 0, c = t.length > 0;
	E(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = A(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(bn, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= yn);
	return f.length === 0 ? null : /* @__PURE__ */ P("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ N("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ P("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ N("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: xn(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ N("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var Cn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, wn = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Tn = "bg-surface-hover text-neutral hover:bg-surface-emphasis", En = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function $({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? wn : a === "danger" ? En : Tn;
	return /* @__PURE__ */ N("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", Cn[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function Dn(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function On(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
var kn = "bg-white/15 text-white hover:bg-white/25", An = "bg-white text-video-stage hover:bg-white";
function jn({ channelName: t, eyebrow: n, localIdentity: r, previewStream: a, permission: o, permissionMessage: s, audioEnabled: c, videoEnabled: l, onToggleAudio: f, onToggleVideo: p, onRetryPermission: m, participants: h, readyState: g, readyLoading: v = !1, effectsSlot: y, devicesSlot: b, devicesOpen: x, onToggleDevices: S, secondaryActions: C, onJoin: w, onCancel: T, joinLabel: D, joinDisabled: O, subtitleOverride: k, className: F, "data-testid": I }) {
	let L = A(null), [R, z] = j(!1);
	E(() => {
		L.current && a && (L.current.srcObject = a);
	}, [a]);
	let B = o === "granted", V = On(o), H = O ?? !B, U = D ?? (H && !B ? "Allow camera to join" : "Join now"), ee = k ?? Dn(h, g, v), W = !!b, G = W && (x ?? R);
	function K(e) {
		x === void 0 && z(e), S?.(e);
	}
	return /* @__PURE__ */ N("div", {
		"data-testid": I,
		className: e("flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary", F),
		children: /* @__PURE__ */ P("div", {
			className: "mx-auto w-full max-w-6xl flex flex-col gap-6 px-4 py-6 sm:px-6",
			children: [/* @__PURE__ */ P("div", {
				className: "text-center",
				children: [
					n && /* @__PURE__ */ N("p", {
						className: "text-xs font-semibold uppercase tracking-[0.18em] text-neutral",
						children: n
					}),
					/* @__PURE__ */ N("h1", {
						"data-testid": "prejoin-title",
						className: "mt-1 text-2xl font-semibold truncate",
						children: t
					}),
					/* @__PURE__ */ N("p", {
						"data-testid": "prejoin-subtitle",
						className: "mt-1 text-sm text-neutral",
						children: ee
					})
				]
			}), /* @__PURE__ */ P("div", {
				className: "flex flex-col lg:flex-row lg:items-start gap-6",
				children: [/* @__PURE__ */ P("section", {
					className: "w-full min-w-0 lg:flex-1 flex flex-col gap-4",
					children: [/* @__PURE__ */ P("div", {
						className: "relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage",
						children: [
							a && B && /* @__PURE__ */ N("video", {
								ref: L,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !l && "opacity-0")
							}),
							B && !l && (r ? /* @__PURE__ */ N("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ P("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ N(_, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ P("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ N("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ N("span", {
											className: "text-white/60 text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ N("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-white/60 text-sm",
								children: "Camera off"
							})),
							o === "pending" && /* @__PURE__ */ N("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ N(d, { size: "lg" })
							}),
							V && /* @__PURE__ */ N("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ N(u, {
									kind: "camera",
									state: V,
									message: s,
									onRetry: m,
									"data-testid": "prejoin-permission-card"
								})
							}),
							/* @__PURE__ */ N("div", {
								className: "absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-4",
								children: /* @__PURE__ */ P("div", {
									className: "flex items-center gap-2 rounded-full bg-black/55 p-2 backdrop-blur-sm",
									children: [
										/* @__PURE__ */ N($, {
											on: c,
											onClick: f,
											disabled: !B,
											"aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
											title: c ? "Mute mic before joining" : "Unmute mic before joining",
											iconOn: /* @__PURE__ */ N(Te, { size: 18 }),
											iconOff: /* @__PURE__ */ N(Ee, { size: 18 }),
											className: e(c && kn),
											"data-testid": "prejoin-toggle-audio"
										}),
										/* @__PURE__ */ N($, {
											on: l,
											onClick: p,
											disabled: !B,
											"aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
											title: l ? "Turn camera off before joining" : "Turn camera on before joining",
											iconOn: /* @__PURE__ */ N(De, { size: 18 }),
											iconOff: /* @__PURE__ */ N(Oe, { size: 18 }),
											className: e(l && kn),
											"data-testid": "prejoin-toggle-video"
										}),
										W && /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N("span", {
											"aria-hidden": "true",
											className: "h-6 w-px bg-white/20"
										}), /* @__PURE__ */ N($, {
											on: G,
											onClick: () => K(!G),
											"aria-label": G ? "Close device settings" : "Open device settings",
											title: G ? "Close device settings" : "Open device settings",
											iconOn: /* @__PURE__ */ N(Ve, { size: 18 }),
											iconOff: /* @__PURE__ */ N(Ve, { size: 18 }),
											className: G ? An : kn,
											"data-testid": "prejoin-devices-toggle"
										})] })
									]
								})
							})
						]
					}), y && /* @__PURE__ */ N("div", {
						"data-testid": "prejoin-effects-slot",
						children: y
					})]
				}), /* @__PURE__ */ P("section", {
					className: "w-full lg:w-80 xl:w-96 lg:shrink-0 flex flex-col gap-4",
					children: [G ? /* @__PURE__ */ P("div", {
						"data-testid": "prejoin-devices-panel",
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ P("div", {
							className: "flex items-center justify-between gap-2 mb-3",
							children: [/* @__PURE__ */ N("h2", {
								className: "text-sm font-semibold",
								children: "Device settings"
							}), /* @__PURE__ */ N(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => K(!1),
								"data-testid": "prejoin-devices-close",
								children: "Close"
							})]
						}), b]
					}) : /* @__PURE__ */ P("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ N(Mn, {
							participants: h,
							loading: v
						}), g === "pending" && !v && /* @__PURE__ */ P("p", {
							className: "mt-3 text-xs text-warning-fg flex items-center gap-2",
							children: [/* @__PURE__ */ N("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
						})]
					}), /* @__PURE__ */ P("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ N(i, {
								variant: "primary",
								size: "lg",
								fullWidth: !0,
								onClick: () => w({
									audio: c,
									video: l
								}),
								disabled: H,
								"data-testid": "prejoin-join-button",
								children: U
							}),
							C && /* @__PURE__ */ N("div", {
								"data-testid": "prejoin-secondary-actions",
								children: C
							}),
							/* @__PURE__ */ N("button", {
								type: "button",
								onClick: T,
								"data-testid": "prejoin-cancel",
								className: "text-xs text-neutral hover:text-text-primary transition-colors text-center cursor-pointer",
								children: "Cancel"
							})
						]
					})]
				})]
			})]
		})
	});
}
function Mn({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ P("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ N(d, { size: "sm" }), " Finding people…"]
	}) : !e || e.length === 0 ? /* @__PURE__ */ N("div", {
		className: "text-xs text-neutral",
		children: "Nobody here yet."
	}) : /* @__PURE__ */ P("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ N("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ P("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ P("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ N(_, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ N("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ N(o, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ P("li", {
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
//#region src/components/video/RecordingChip.tsx
var Nn = {
	active: "Recording — saved to /recordings when the call ends",
	armed: "Recording armed — will start once the call is under way"
};
function Pn({ armed: e, active: t, titles: n, className: r, "data-testid": i = "recording-chip" }) {
	return !e && !t ? null : /* @__PURE__ */ N(o, {
		tone: t ? "danger" : "neutral",
		size: "xs",
		uppercase: !0,
		dot: t ? "pulse" : "static",
		title: t ? n?.active ?? Nn.active : n?.armed ?? Nn.armed,
		className: r,
		"data-testid": i,
		"aria-label": t ? "Recording" : "Recording armed",
		children: "Rec"
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var Fn = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, In = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function Ln() {
	return /* @__PURE__ */ P("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ N("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ N("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function Rn({ channelName: t, subtitle: n, recording: r, elapsedLabel: i, phase: a, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ P("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ P("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ N("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || r?.armed || i) && /* @__PURE__ */ P("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ N("span", { children: n }),
					r?.armed && /* @__PURE__ */ N(Pn, {
						armed: r.armed,
						active: r.active,
						titles: { armed: "Recording armed — will start when someone joins" },
						"data-testid": "hangout-room-header-recording"
					}),
					i && /* @__PURE__ */ N(o, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ N(Ln, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ N("span", {
							className: "tabular-nums",
							children: i
						})
					})
				]
			})]
		}), (a || s) && /* @__PURE__ */ P("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [a && /* @__PURE__ */ N(o, {
				tone: Fn[a],
				size: "sm",
				dot: a === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: In[a]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var zn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Bn = {
	sm: 16,
	md: 20,
	lg: 24
};
function Vn({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ P("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ N($, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ N(Te, { size: g }),
				iconOff: /* @__PURE__ */ N(Ee, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ N($, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ N(De, { size: g }),
				iconOff: /* @__PURE__ */ N(Oe, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ N($, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ N(ke, { size: g }),
				iconOff: /* @__PURE__ */ N(Ae, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ N("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", zn[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ N(je, { size: Bn[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var Hn = {
	devices: "Devices",
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function Un({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", devicesContent: a, effectsContent: o, peopleContent: s, chatContent: l, showPreview: u = !0, title: d = "Call settings", className: f }) {
	let p = [
		...a == null ? [] : ["devices"],
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...l == null ? [] : ["chat"]
	], [m, h] = j(i);
	E(() => {
		t && h(i);
	}, [t, i]);
	let g = p.includes(m) ? m : p[0] ?? null;
	return /* @__PURE__ */ N(c, {
		open: t,
		onClose: n,
		ariaLabel: d,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden",
		children: /* @__PURE__ */ P("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", f),
			children: [/* @__PURE__ */ P("header", {
				className: "flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3",
				children: [/* @__PURE__ */ N("h2", {
					className: "m-0 text-sm font-semibold text-white",
					children: d
				}), /* @__PURE__ */ N("button", {
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ P("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [u && /* @__PURE__ */ N("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N(w, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ N("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ P("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ N("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ P("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [p.length > 0 && /* @__PURE__ */ N("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2",
						children: p.map((t) => /* @__PURE__ */ N("button", {
							type: "button",
							role: "tab",
							"aria-selected": t === g,
							onClick: () => h(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === g ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: Hn[t]
						}, t))
					}), /* @__PURE__ */ P("div", {
						role: "tabpanel",
						"data-testid": "call-settings-panel",
						className: "min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[460px]",
						children: [
							g === "devices" ? a : null,
							g === "effects" ? o : null,
							g === "people" ? s : null,
							g === "chat" ? l : null
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/video/GoLiveButton.tsx
function Wn(e) {
	return `Start broadcasting this room and tell everyone in ${e ?? "the channel"}`;
}
var Gn = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50", Kn = "text-xs text-text-tertiary";
function qn({ live: t = !1, starting: n = !1, onGoLive: r, onEndBroadcast: i, viewerCount: a, streamReady: o, connection: s = "online", channelName: c, error: l, endHint: u, label: d, disabled: f, className: p, "data-testid": m = "go-live" }) {
	if (t) {
		let t = s !== "online", n = t || o === !1;
		return /* @__PURE__ */ P("div", {
			className: e("flex flex-col gap-1", p),
			children: [/* @__PURE__ */ P("div", {
				"data-testid": m,
				"data-live": "true",
				"data-stream": o === void 0 ? "unknown" : o ? "ready" : "pending",
				"data-connection": s,
				className: "inline-flex items-center gap-2",
				children: [
					/* @__PURE__ */ P("span", {
						"data-testid": `${m}-status`,
						role: "status",
						className: e(Gn, n ? "bg-warning-bg text-warning-fg" : "bg-danger text-white"),
						children: [/* @__PURE__ */ N("span", {
							"aria-hidden": !0,
							className: e("h-1.5 w-1.5 rounded-full", n ? "bg-warning-fg" : "bg-white")
						}), t ? s === "offline" ? "You are offline — nobody is receiving this" : "Reconnecting — your audience may not be receiving this" : n ? "On the call — no stream yet" : "You are live"]
					}),
					!n && typeof a == "number" && Number.isFinite(a) && a >= 0 && /* @__PURE__ */ P("span", {
						"data-testid": `${m}-viewers`,
						className: Kn,
						children: [a, " watching"]
					}),
					i && /* @__PURE__ */ N("button", {
						type: "button",
						"data-testid": `${m}-end`,
						onClick: i,
						className: e(Gn, "cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover"),
						children: "End broadcast"
					})
				]
			}), (n || !i && u) && /* @__PURE__ */ N("span", {
				"data-testid": `${m}-hint`,
				className: Kn,
				children: t ? s === "offline" ? "Your connection dropped. The broadcast resumes if it comes back." : "Your connection is unstable. What you see locally is not what they see." : n ? "Nobody can watch yet — the stream has not started." : u
			})]
		});
	}
	return /* @__PURE__ */ P("div", {
		className: e("flex flex-col gap-1", p),
		children: [
			/* @__PURE__ */ P("button", {
				type: "button",
				"data-testid": m,
				"data-live": "false",
				disabled: f || n,
				onClick: r,
				title: Wn(c),
				"aria-label": n ? "Going live…" : `${d ?? "Go live"} — ${Wn(c).toLowerCase()}`,
				className: e(Gn, "cursor-pointer bg-danger text-white hover:opacity-90"),
				children: [/* @__PURE__ */ N("span", {
					"aria-hidden": !0,
					className: "h-1.5 w-1.5 rounded-full bg-white"
				}), n ? "Going live…" : d ?? "Go live"]
			}),
			/* @__PURE__ */ N("span", {
				"data-testid": `${m}-hint`,
				className: Kn,
				children: n ? "Connecting — this takes a few seconds." : `Starts a broadcast in ${c ?? "this channel"} and tells everyone there.`
			}),
			l && /* @__PURE__ */ N("span", {
				"data-testid": `${m}-error`,
				role: "alert",
				className: "text-xs text-danger-fg",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/video/DeviceSettingsPanel.tsx
function Jn() {
	let [e, t] = j(!1), n = A(null);
	return {
		play: T(async (e) => {
			if (!(typeof AudioContext > "u")) {
				t(!0);
				try {
					let t = new AudioContext(), r = t.createMediaStreamDestination(), i = t.createOscillator(), a = t.createGain();
					i.frequency.value = 660, a.gain.value = .08, i.connect(a).connect(r);
					let o = n.current ?? document.createElement("audio");
					n.current = o, o.srcObject = r.stream;
					let s = o;
					e && s.setSinkId && await s.setSinkId(e).catch(() => void 0), i.start(), await o.play().catch(() => void 0), await new Promise((e) => setTimeout(e, 700)), i.stop(), o.pause(), o.srcObject = null, await t.close();
				} finally {
					t(!1);
				}
			}
		}, []),
		playing: e
	};
}
function Yn({ value: e, onChange: t, showCamera: n = !0, children: a, "data-testid": o = "device-settings" }) {
	let s = r(), { play: c, playing: l } = Jn();
	if (!s.supported) return /* @__PURE__ */ N("p", {
		"data-testid": `${o}-unsupported`,
		className: "m-0 text-sm text-text-tertiary",
		children: "This browser does not let a page choose its devices."
	});
	let u = (e, t) => [
		{
			value: "",
			label: "System default"
		},
		...t && !e.some((e) => e.deviceId === t) ? [{
			value: t,
			label: "Remembered device (not connected)"
		}] : [],
		...e.map((e) => ({
			value: e.deviceId,
			label: e.label
		}))
	];
	return /* @__PURE__ */ P("div", {
		"data-testid": o,
		className: "flex flex-col gap-3",
		children: [
			s.labelsHidden ? /* @__PURE__ */ N("p", {
				"data-testid": `${o}-labels-hidden`,
				className: "m-0 text-xs text-text-tertiary",
				children: "Device names appear once the browser has been allowed to use your microphone or camera."
			}) : null,
			/* @__PURE__ */ P("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Microphone", /* @__PURE__ */ N(v, {
					size: "sm",
					"data-testid": `${o}-microphone`,
					value: e.microphoneId ?? "",
					onChange: (n) => t({
						...e,
						microphoneId: n.target.value || void 0
					}),
					options: u(s.microphones, e.microphoneId)
				})]
			}),
			n ? /* @__PURE__ */ P("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Camera", /* @__PURE__ */ N(v, {
					size: "sm",
					"data-testid": `${o}-camera`,
					value: e.cameraId ?? "",
					onChange: (n) => t({
						...e,
						cameraId: n.target.value || void 0
					}),
					options: u(s.cameras, e.cameraId)
				})]
			}) : null,
			s.canSelectSpeaker ? /* @__PURE__ */ P("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Speaker", /* @__PURE__ */ P("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ N(v, {
						size: "sm",
						"data-testid": `${o}-speaker`,
						value: e.speakerId ?? "",
						onChange: (n) => t({
							...e,
							speakerId: n.target.value || void 0
						}),
						options: u(s.speakers, e.speakerId),
						className: "min-w-0 flex-1"
					}), /* @__PURE__ */ N(i, {
						variant: "ghost",
						size: "sm",
						disabled: l,
						onClick: () => void c(e.speakerId),
						"data-testid": `${o}-speaker-test`,
						children: l ? "Playing…" : "Test"
					})]
				})]
			}) : null,
			a
		]
	});
}
//#endregion
//#region src/components/video/AudioPlayer.tsx
function Xn(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Zn({ src: t, autoPlay: n = !1, onFirstPlay: r, onEnded: i, durationHint: a, size: o = "md", className: s, "data-testid": c = "audio-player" }) {
	let l = A(null), [u, d] = j(!1), [f, p] = j(0), [m, h] = j(a ?? 0), g = A(!1);
	E(() => {
		d(!1), p(0), h(a ?? 0), g.current = !1;
	}, [t, a]);
	let _ = () => {
		let e = l.current;
		e && (u ? e.pause() : e.play().catch(() => d(!1)));
	}, v = (e) => {
		let t = l.current;
		t && (t.currentTime = e, p(e));
	}, b = m > 0 ? m : Math.max(f, 1);
	return /* @__PURE__ */ P("div", {
		className: e("flex min-w-0 items-center gap-2", o === "sm" ? "text-xs" : "text-sm", s),
		"data-testid": c,
		"data-playing": u,
		children: [
			/* @__PURE__ */ N("audio", {
				ref: l,
				src: t,
				autoPlay: n,
				preload: "metadata",
				className: "hidden",
				onPlay: () => {
					d(!0), g.current || (g.current = !0, r?.());
				},
				onPause: () => d(!1),
				onEnded: () => {
					d(!1), i?.();
				},
				onTimeUpdate: (e) => p(e.currentTarget.currentTime),
				onLoadedMetadata: (e) => {
					let t = e.currentTarget.duration;
					Number.isFinite(t) && t > 0 && h(t);
				},
				onDurationChange: (e) => {
					let t = e.currentTarget.duration;
					Number.isFinite(t) && t > 0 && h(t);
				},
				"data-testid": `${c}-element`
			}),
			/* @__PURE__ */ N($, {
				on: u,
				offTone: "neutral",
				size: o === "sm" ? "sm" : "md",
				"aria-label": u ? "Pause" : "Play",
				iconOn: /* @__PURE__ */ N(ze, { size: o === "sm" ? 14 : 18 }),
				iconOff: /* @__PURE__ */ N(Re, { size: o === "sm" ? 14 : 18 }),
				onClick: _,
				"data-testid": `${c}-toggle`
			}),
			/* @__PURE__ */ N("span", {
				className: "w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary",
				"data-testid": `${c}-time`,
				children: Xn(f)
			}),
			/* @__PURE__ */ N(y, {
				"aria-label": "Seek",
				min: 0,
				max: b,
				step: .1,
				value: Math.min(f, b),
				onChange: v,
				className: "min-w-[96px] flex-1",
				"data-testid": `${c}-scrubber`
			}),
			/* @__PURE__ */ N("span", {
				className: "w-9 shrink-0 font-mono tabular-nums text-text-tertiary",
				"data-testid": `${c}-duration`,
				children: Xn(m)
			})
		]
	});
}
//#endregion
//#region src/components/video/VoicemailRecorder.tsx
function Qn(e) {
	let t = Math.max(0, Math.floor(e / 1e3));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function $n({ open: e, onClose: t, recipientName: r, getStream: a, onSend: o, maxSeconds: s = 60, "data-testid": l = "voicemail-recorder" }) {
	let u = n({
		getStream: a,
		maxMs: s * 1e3
	}), [d, f] = j(!1), [p, m] = j(null), h = A(!1);
	E(() => {
		e && !h.current && (m(null), f(!1), u.start()), !e && h.current && u.reset(), h.current = e;
	}, [e]);
	let g = async () => {
		if (u.blob) {
			f(!0), m(null);
			try {
				await o(u.blob, u.elapsedMs, u.mimeType ?? (u.blob.type || "audio/webm")), t();
			} catch (e) {
				m(e instanceof Error ? e.message : "Could not send the voicemail.");
			} finally {
				f(!1);
			}
		}
	}, _ = u.state === "starting" ? "Opening the microphone…" : u.state === "recording" ? "Recording — speak now" : u.state === "recorded" ? "Listen back, then send" : u.state === "error" ? u.error ?? "Something went wrong" : "Ready";
	return /* @__PURE__ */ N(c, {
		open: e,
		onClose: t,
		title: `Leave a voicemail for ${r}`,
		maxWidth: 440,
		footer: /* @__PURE__ */ P("div", {
			className: "flex w-full items-center justify-end gap-2",
			"data-testid": `${l}-actions`,
			children: [
				/* @__PURE__ */ N(i, {
					variant: "ghost",
					size: "sm",
					onClick: t,
					disabled: d,
					"data-testid": `${l}-cancel`,
					children: "Cancel"
				}),
				u.state === "recording" && /* @__PURE__ */ N(i, {
					variant: "primary",
					size: "sm",
					onClick: u.stop,
					"data-testid": `${l}-stop`,
					children: "Stop"
				}),
				(u.state === "recorded" || u.state === "error") && /* @__PURE__ */ N(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void u.start(),
					disabled: d,
					"data-testid": `${l}-rerecord`,
					children: u.state === "error" ? "Try again" : "Re-record"
				}),
				u.state === "recorded" && /* @__PURE__ */ N(i, {
					variant: "primary",
					size: "sm",
					onClick: () => void g(),
					disabled: d || !u.blob,
					"data-testid": `${l}-send`,
					children: d ? "Sending…" : "Send voicemail"
				})
			]
		}),
		children: /* @__PURE__ */ P("div", {
			className: "flex flex-col items-center gap-3 py-2",
			"data-testid": l,
			"data-state": u.state,
			children: [
				/* @__PURE__ */ P("div", {
					className: "flex items-center gap-2 text-sm text-text-secondary",
					role: "status",
					"data-testid": `${l}-status`,
					children: [u.state === "recording" && /* @__PURE__ */ N("span", {
						"aria-hidden": "true",
						className: "inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger"
					}), _]
				}),
				/* @__PURE__ */ P("div", {
					className: "font-mono text-3xl tabular-nums text-text-primary",
					"data-testid": `${l}-clock`,
					children: [Qn(u.elapsedMs), /* @__PURE__ */ P("span", {
						className: "text-base text-text-tertiary",
						children: [" / ", Qn(s * 1e3)]
					})]
				}),
				u.state === "recorded" && u.url && /* @__PURE__ */ N(Zn, {
					src: u.url,
					durationHint: u.elapsedMs / 1e3,
					className: "w-full",
					"data-testid": `${l}-preview`
				}),
				p && /* @__PURE__ */ N("p", {
					className: "m-0 text-sm text-danger",
					role: "alert",
					children: p
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/AuthedAudio.tsx
function er({ src: e, getAuthToken: t, onFirstPlay: n, eager: r = !1, className: a, "data-testid": o = "authed-audio" }) {
	let [s, c] = j(null), [l, u] = j("idle"), [d, f] = j(r), p = A(!1);
	return E(() => {
		if (!d) return;
		let n = !1, r = null;
		return u("loading"), (async () => {
			try {
				let i = await t(), a = await fetch(e, { headers: i ? { Authorization: `Bearer ${i}` } : {} });
				if (!a.ok) throw Error(`HTTP ${a.status}`);
				let o = await a.blob();
				if (n) return;
				r = URL.createObjectURL(o), c(r), u("ready");
			} catch {
				n || u("error");
			}
		})(), () => {
			n = !0, r && URL.revokeObjectURL(r);
		};
	}, [e, d]), l === "idle" ? /* @__PURE__ */ N(i, {
		variant: "secondary",
		size: "sm",
		onClick: () => f(!0),
		"data-testid": `${o}-load`,
		children: "▶ Play"
	}) : l === "loading" ? /* @__PURE__ */ N("span", {
		className: "text-sm text-text-tertiary",
		"data-testid": `${o}-loading`,
		children: "Loading…"
	}) : l === "error" || !s ? /* @__PURE__ */ N(i, {
		variant: "ghost",
		size: "sm",
		onClick: () => {
			u("idle"), f(!1), setTimeout(() => f(!0), 0);
		},
		"data-testid": `${o}-error`,
		children: "Couldn’t load — retry"
	}) : /* @__PURE__ */ N(Zn, {
		src: s,
		autoPlay: !0,
		size: "sm",
		className: a,
		"data-testid": o,
		onFirstPlay: () => {
			p.current || (p.current = !0, n?.());
		}
	});
}
//#endregion
//#region src/components/video/EmbeddedCallPanel.tsx
function tr(e) {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
function nr({ title: t, subtitle: n, durationSeconds: r, live: i = !0, recording: o, onPopOut: s, popOutLabel: c = "Pop the call out", children: l, controls: u, aside: d, stage: f = "video", className: p, "data-testid": m = "embedded-call-panel" }) {
	return /* @__PURE__ */ P("section", {
		className: e("flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md", d && "@container", p),
		"aria-label": typeof t == "string" ? `Call: ${t}` : "Call",
		"data-testid": m,
		"data-stage": f,
		children: [
			/* @__PURE__ */ P("header", {
				className: "flex min-w-0 items-center gap-2 px-3 py-2",
				children: [
					i && /* @__PURE__ */ N("span", {
						"aria-hidden": "true",
						className: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success"
					}),
					/* @__PURE__ */ N("span", {
						className: "min-w-0 flex-1 truncate text-sm font-semibold",
						"data-testid": `${m}-title`,
						children: t
					}),
					o && /* @__PURE__ */ N(Pn, {
						armed: o.armed,
						active: o.active,
						className: "shrink-0",
						"data-testid": `${m}-recording`
					}),
					n && /* @__PURE__ */ N("span", {
						className: "shrink-0 text-xs text-white/60",
						"data-testid": `${m}-subtitle`,
						children: n
					}),
					r !== void 0 && /* @__PURE__ */ N("span", {
						className: "shrink-0 font-mono text-xs tabular-nums text-white/80",
						"data-testid": `${m}-duration`,
						children: tr(r)
					}),
					s && /* @__PURE__ */ N(a, {
						"aria-label": c,
						title: c,
						size: "sm",
						variant: "ghost",
						icon: /* @__PURE__ */ N(Be, { size: 16 }),
						onClick: s,
						className: "shrink-0 text-white/80 hover:text-white",
						"data-testid": `${m}-pop-out`
					})
				]
			}),
			d ? /* @__PURE__ */ P("div", {
				className: "flex min-h-0 min-w-0 flex-col @lg:flex-row",
				children: [/* @__PURE__ */ N("div", {
					className: e("relative w-full min-w-0 bg-black/40 @lg:flex-1", f === "video" ? "aspect-video" : "min-h-[88px]"),
					"data-testid": `${m}-stage`,
					children: /* @__PURE__ */ N("div", {
						className: "absolute inset-0",
						children: l
					})
				}), /* @__PURE__ */ N("div", {
					className: "flex max-h-80 min-h-0 min-w-0 flex-col overflow-y-auto @lg:max-h-none @lg:shrink-0",
					"data-testid": `${m}-aside`,
					children: d
				})]
			}) : /* @__PURE__ */ N("div", {
				className: e("relative w-full min-w-0 bg-black/40", f === "video" ? "aspect-video" : "min-h-[88px]"),
				"data-testid": `${m}-stage`,
				children: /* @__PURE__ */ N("div", {
					className: "absolute inset-0",
					children: l
				})
			}),
			u && /* @__PURE__ */ N("div", {
				className: "flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2",
				"data-testid": `${m}-controls`,
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/video/CallNoticePill.tsx
var rr = {
	warning: "bg-warning/95 text-white",
	error: "bg-danger/95 text-white",
	info: "bg-black/70 text-white"
};
function ir({ show: t, tone: n = "warning", message: r, actions: i, className: a, "data-testid": o = "call-notice" }) {
	return t ? /* @__PURE__ */ P("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		"data-tone": n,
		className: e("pointer-events-auto absolute left-1/2 top-3 z-30 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg", rr[n], a),
		children: [/* @__PURE__ */ N("span", {
			className: "min-w-0 truncate",
			children: r
		}), i && /* @__PURE__ */ N("span", {
			className: "flex shrink-0 items-center gap-1",
			children: i
		})]
	}) : null;
}
//#endregion
export { je as $, Ot as A, Ze as B, Ht as C, Ft as D, Rt as E, at as F, Ke as G, Xe as H, it as I, Pe as J, We as K, rt as L, vt as M, gt as N, Pt as O, nt as P, ze as Q, ht as R, Gt as S, I as St, zt as T, Je as U, Qe as V, Ge as W, Ee as X, Te as Y, Le as Z, _n as _, q as _t, Zn as a, Me as at, Xt as b, V as bt, qn as c, Oe as ct, Rn as d, ge as dt, Re as et, Nn as f, fe as ft, Sn as g, re as gt, $ as h, te as ht, $n as i, Ne as it, wt as j, kt as k, Un as l, we as lt, jn as m, J as mt, nr as n, ke as nt, Xn as o, Fe as ot, Pn as p, se as pt, Ie as q, er as r, Ae as rt, Yn as s, De as st, ir as t, Be as tt, Vn as u, be as ut, gn as v, G as vt, Bt as w, Jt as x, z as xt, sn as y, W as yt, $e as z };
