import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { t as n } from "./Chip-2lIuHwy5.js";
import { n as r, t as i } from "./PermissionDeniedCard-CbMdNs9F.js";
import { t as a } from "./Avatar-u3ZNK9l2.js";
import { t as o } from "./Select-CBb9fCiw.js";
import { d as s, r as c } from "./ReconnectingBanner-C5jBpTlY.js";
import { useCallback as l, useEffect as u, useImperativeHandle as d, useLayoutEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var y = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function b({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: d, onPhaseChange: f, onTimeUpdate: p }) {
	let g = m(null), [b, S] = h("idle"), C = c ?? b;
	u(() => {
		let e = g.current;
		if (!e) return;
		let t = [
			["waiting", () => {
				S("buffering"), f?.("buffering");
			}],
			["playing", () => {
				S("playing"), f?.("playing");
			}],
			["error", () => {
				S("error"), f?.("error");
			}],
			["loadstart", () => {
				S("connecting"), f?.("connecting");
			}],
			["timeupdate", () => {
				p?.(e.currentTime, e.duration);
			}]
		];
		return t.forEach(([t, n]) => e.addEventListener(t, n)), () => t.forEach(([t, n]) => e.removeEventListener(t, n));
	}, [f, p]), u(() => {
		let e = g.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let w = C !== "playing", T = y[C];
	return /* @__PURE__ */ v("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: d,
		children: [/* @__PURE__ */ _("video", {
			ref: g,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), w && T && /* @__PURE__ */ v("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [C === "buffering" && /* @__PURE__ */ _(x, {}), /* @__PURE__ */ _("span", {
				className: e(C === "buffering" ? "ml-2" : ""),
				children: T
			})]
		})]
	});
}
function x() {
	return /* @__PURE__ */ v("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ _("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ _("path", {
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
function S(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function C({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: a = !0, muted: o = !1, hideDownload: s = !1, header: c, footer: l, className: d }) {
	let f = p(() => n.filter((e) => !!e.url), [n]), [m, g] = h(0), y = f[m];
	return u(() => {
		let e = (e) => {
			e.key === "Escape" && t();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t]), /* @__PURE__ */ _("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ v("div", {
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", d),
			children: [
				(r || i || c) && /* @__PURE__ */ v("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ v("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ _("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ _("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ v("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [c, /* @__PURE__ */ _("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				y ? /* @__PURE__ */ _("video", {
					src: y.url,
					controls: !0,
					autoPlay: a,
					muted: o,
					className: "w-full max-h-[70vh] bg-black"
				}, y.url) : /* @__PURE__ */ _("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				f.length > 1 && /* @__PURE__ */ _("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: f.map((t, n) => {
						let r = n === m;
						return /* @__PURE__ */ _("button", {
							type: "button",
							onClick: () => g(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : S(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(l || !s && y) && /* @__PURE__ */ v("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ _("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: l
					}), !s && y && /* @__PURE__ */ _("a", {
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
function w(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function T({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ _("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", w(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ _("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ v("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ _("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ _("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var E = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, D = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, O = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function k({ quality: t, className: n, style: r }) {
	let i = E[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ v("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ _("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ _("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ _("span", {
			className: D[t],
			children: O[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function A({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ _("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ _(s, {
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
function j({ reactions: t, className: n, style: r }) {
	let [i, a] = h([]);
	return u(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), u(() => {
		let e = setInterval(() => {
			a((e) => e.filter((e) => Date.now() - e.createdAt < 3e3));
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ _("div", {
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ _("span", {
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var M = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function N({ onReact: t, emojis: n = M, className: r, style: i }) {
	return /* @__PURE__ */ _("div", {
		className: e("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]", r),
		style: i,
		children: n.map((n) => /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => t(n),
			className: e("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100"),
			onMouseDown: (e) => e.currentTarget.style.transform = "scale(1.3)",
			onMouseUp: (e) => e.currentTarget.style.transform = "scale(1)",
			onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)",
			children: n
		}, n))
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function P(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function F(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var I = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, L = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function R({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ v("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-surface-inverse rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ v("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ _("span", { className: e("w-[7px] h-[7px] rounded-full", I[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ _("span", {
					className: e("font-semibold", L[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ _("span", { children: P(n) }),
			i !== void 0 && /* @__PURE__ */ _("span", { children: F(i) }),
			r !== void 0 && /* @__PURE__ */ v("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ v("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ _("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ _("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function ee({ count: t, className: n, style: r }) {
	let i = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ v("div", {
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ v("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: [/* @__PURE__ */ _("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ _("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ v("span", { children: [i, " watching"] })]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function z(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function B(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function V({ participant: e, size: t = 32 }) {
	let n = B(e.displayName);
	return /* @__PURE__ */ v("div", {
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
			e.avatarUrl ? /* @__PURE__ */ _("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : z(e.displayName),
			e.isSpeaking && /* @__PURE__ */ _("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ _("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ v("svg", {
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
						/* @__PURE__ */ _("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ _("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ _("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function H({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ v("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ _(V, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ v("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ _(V, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var U = {
	mic: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ _("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ _("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ _("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ _("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ _("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ _("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ _("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ _("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ _("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ _("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ _("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ _("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ _("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ _("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ _("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ _("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ _("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ _("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ _("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	})
};
function W({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s }) {
	return /* @__PURE__ */ _("button", {
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
function te({ mode: t, isMuted: n = !1, isCameraOn: r = !0, isScreenSharing: i = !1, onToggleMute: a, onToggleCamera: o, onToggleScreenShare: s, onUpgradeToVideo: c, onEndCall: l, onAddParticipant: u, availableParticipants: d, currentParticipantIds: f, onOpenAddParticipant: p, className: m }) {
	let [g, y] = h(!1), b = new Set(f ?? []), x = (d ?? []).filter((e) => !b.has(e.id));
	return /* @__PURE__ */ v("div", {
		className: e("flex flex-col", m),
		children: [/* @__PURE__ */ v("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				/* @__PURE__ */ _(W, {
					icon: n ? U.micOff : U.mic,
					label: n ? "Unmute" : "Mute",
					active: n,
					onClick: a,
					testId: "mute-button"
				}),
				t === "video" && /* @__PURE__ */ _(W, {
					icon: r ? U.camera : U.cameraOff,
					label: r ? "Turn off camera" : "Turn on camera",
					active: !r,
					onClick: o,
					testId: "camera-button"
				}),
				t === "audio" && c && /* @__PURE__ */ _(W, {
					icon: U.videoUpgrade,
					label: "Switch to video",
					onClick: c,
					testId: "upgrade-to-video-button"
				}),
				/* @__PURE__ */ _(W, {
					icon: U.screenShare,
					label: i ? "Stop sharing" : "Share screen",
					active: i,
					onClick: s,
					testId: "screenshare-button"
				}),
				(u || p) && /* @__PURE__ */ _(W, {
					icon: U.userPlus,
					label: "Add people to this call",
					active: g,
					onClick: p || (() => y((e) => !e)),
					testId: "add-participant-button"
				}),
				/* @__PURE__ */ _(W, {
					icon: U.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: l,
					testId: "hangup-button"
				})
			]
		}), g && u && !p && /* @__PURE__ */ v("div", {
			className: "border-t border-white/5 bg-surface-inverse/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ v("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ _("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ _("button", {
					type: "button",
					onClick: () => y(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), x.length === 0 ? /* @__PURE__ */ _("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ _("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: x.map((e) => /* @__PURE__ */ v("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						u(e.id), x.length <= 1 && y(!1);
					},
					children: [
						/* @__PURE__ */ _(V, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ _("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ _("span", {
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
function ne(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var re = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function ie(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function G({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return ne(t) ? /* @__PURE__ */ v("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", re[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ _(k, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ v("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ v("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ _("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), ie(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ v("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ _("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ v("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ _("span", {
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
//#region src/components/video/CallWidget.tsx
function K(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function ae({ stream: t, muted: n = !1, className: r }) {
	let i = m(null);
	return u(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ _("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var q = {
	phoneEnd: /* @__PURE__ */ v("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ _("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ _("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ _("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ _("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ v("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ _("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ _("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ _("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ _("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ v("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ _("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ _("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	})
};
function oe({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ v("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ _("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ _("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ _("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ v("div", {
				className: "text-center",
				children: [/* @__PURE__ */ _("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ _("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ v("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ _("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: q.phoneEnd
				}), /* @__PURE__ */ _("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: q.phoneAnswer
				})]
			})
		]
	});
}
function se({ mode: e, participants: t, localParticipant: n, duration: r, isMuted: i, isCameraOn: a, isScreenSharing: o, onToggleMute: s, onToggleCamera: c, onToggleScreenShare: l, onUpgradeToVideo: u, onAddParticipant: d, availableParticipants: f, onOpenAddParticipant: p, controlsExtras: m, onEndCall: h, layoutComponent: g, callStats: y }) {
	let b = e === "video" && a;
	return /* @__PURE__ */ v("div", {
		className: "flex flex-col",
		children: [
			e === "video" && g && /* @__PURE__ */ v("div", {
				className: "mx-3 mt-3 rounded-lg overflow-hidden relative",
				children: [g, /* @__PURE__ */ _(G, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			e === "video" && !g && /* @__PURE__ */ v("div", {
				className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3",
				children: [
					n?.videoStream && b ? /* @__PURE__ */ _(ae, {
						stream: n.videoStream,
						muted: !0
					}) : /* @__PURE__ */ _("div", {
						className: "w-full h-full flex items-center justify-center bg-surface-inverse",
						children: n && /* @__PURE__ */ _(V, {
							participant: n,
							size: 48
						})
					}),
					t.length > 0 && /* @__PURE__ */ v("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse",
						children: [t[0].videoStream ? /* @__PURE__ */ _(ae, { stream: t[0].videoStream }) : /* @__PURE__ */ _("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ _(V, {
								participant: t[0],
								size: 28
							})
						}), t[0].isMuted && /* @__PURE__ */ _("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ v("svg", {
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
									/* @__PURE__ */ _("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ _("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ _("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ _(G, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			e === "audio" && /* @__PURE__ */ _(H, {
				participants: t,
				localFallback: n,
				maxVisible: 4,
				avatarSize: 36
			}),
			/* @__PURE__ */ v("div", {
				className: "text-center py-1.5",
				children: [r !== void 0 && /* @__PURE__ */ _("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": r,
					children: K(r)
				}), /* @__PURE__ */ v("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [t.length + 1, " in call"]
				})]
			}),
			m ? /* @__PURE__ */ _("div", {
				className: "flex items-center justify-center pb-1",
				children: m
			}) : null,
			/* @__PURE__ */ _(te, {
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
				currentParticipantIds: t.map((e) => e.id)
			})
		]
	});
}
function ce({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ v("div", {
		className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
		onClick: c,
		role: "button",
		tabIndex: 0,
		"aria-label": "Expand call widget",
		onKeyDown: (e) => e.key === "Enter" && c?.(),
		children: [
			/* @__PURE__ */ _("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ _("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ _("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ v("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ _("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: K(r)
						})
					]
				})
			}),
			/* @__PURE__ */ v("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && /* @__PURE__ */ _("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ _("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ v(g, { children: [
							/* @__PURE__ */ _("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ _("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ _("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ _("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ _("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), /* @__PURE__ */ _("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ v("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ _("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ _("line", {
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
function le(e) {
	let [t, n] = h({
		x: 0,
		y: 0
	}), [r, i] = h(!1), [a, o] = h(!1), s = m(null), c = l(() => {
		s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 200);
	}, []);
	u(() => () => {
		s.current && clearTimeout(s.current);
	}, []);
	let d = m(!1), f = m({
		x: 0,
		y: 0
	}), p = m({
		x: 0,
		y: 0
	}), g = m(null), _ = l((n) => {
		e && (d.current = !0, i(!0), o(!1), f.current = {
			x: n.clientX,
			y: n.clientY
		}, p.current = { ...t }, n.preventDefault());
	}, [e, t]), v = l(() => {
		o(!0), n({
			x: 0,
			y: 0
		}), c();
	}, [c]), y = l((e) => {
		let r = g.current;
		if (!r) return;
		let i = r.offsetParent, a = window.innerWidth, s = window.innerHeight;
		i && (a = i.clientWidth, s = i.clientHeight);
		let l = r.getBoundingClientRect(), u = i ? i.getBoundingClientRect() : {
			left: 0,
			top: 0
		}, d, f;
		switch (e) {
			case "top-left":
				d = 16, f = 16;
				break;
			case "top-right":
				d = a - l.width - 16, f = 16;
				break;
			case "bottom-left":
				d = 16, f = s - l.height - 16;
				break;
			default: d = a - l.width - 16, f = s - l.height - 16;
		}
		let p = l.left - u.left - t.x, m = l.top - u.top - t.y;
		o(!0), n({
			x: d - p,
			y: f - m
		}), c();
	}, [t, c]), b = m(y);
	return b.current = y, u(() => {
		if (!e) return;
		let t = (e) => {
			d.current && n({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
		}, r = () => {
			if (!d.current) return;
			d.current = !1, i(!1);
			let e = g.current;
			if (!e) return;
			let t = e.offsetParent, n = window.innerWidth, r = window.innerHeight;
			if (t) {
				let e = t.getBoundingClientRect();
				n = e.width, r = e.height;
			}
			let a = e.getBoundingClientRect(), o = t ? t.getBoundingClientRect() : {
				left: 0,
				top: 0
			}, s = a.left - o.left, c = a.top - o.top, l = n - (s + a.width), u = r - (c + a.height), f = s < 80, p = l < 80, m = c < 80, h = u < 80;
			m && f ? b.current("top-left") : m && p ? b.current("top-right") : h && f ? b.current("bottom-left") : h && p && b.current("bottom-right");
		};
		return document.addEventListener("mousemove", t), document.addEventListener("mouseup", r), () => {
			document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", r);
		};
	}, [e]), {
		offset: t,
		handleMouseDown: _,
		resetOffset: v,
		snapToCorner: y,
		isDragging: r,
		isAnimating: a,
		hasMoved: t.x !== 0 || t.y !== 0,
		widgetRef: g
	};
}
function ue({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ _("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ _("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ _("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ _("rect", {
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
function de({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: m, onToggleCamera: h, onToggleScreenShare: y, onUpgradeToVideo: b, onAddParticipant: x, availableParticipants: S, controlsExtras: C, onOpenAddParticipant: w, onMinimize: T, onExpand: E, layoutComponent: D, callStats: O, minimized: k = !1, position: A = "bottom-right", contained: j = !1, draggable: M = !0, className: N, style: P, dataAttrs: F }) {
	let { offset: I, handleMouseDown: L, resetOffset: R, snapToCorner: ee, isDragging: z, isAnimating: B, hasMoved: V, widgetRef: H } = le(M), U = {};
	if (F) for (let [e, t] of Object.entries(F)) t != null && t !== "" && (U[e] = t);
	let W = p(() => {
		switch (A) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [A]);
	return t === "idle" || t === "ended" ? null : /* @__PURE__ */ v(g, { children: [z && /* @__PURE__ */ _(ue, {
		onSnap: ee,
		contained: j
	}), /* @__PURE__ */ _("div", {
		ref: H,
		"data-testid": "call-widget",
		"data-call-state": t,
		className: e(j ? "absolute z-50" : "fixed z-[9999]", W, N),
		style: {
			transform: `translate(${I.x}px, ${I.y}px)`,
			transition: B ? "transform 0.2s ease-out" : void 0,
			...P
		},
		...U,
		children: /* @__PURE__ */ v("div", {
			className: e("bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm", k ? "w-[260px]" : "w-[320px]"),
			children: [
				!k && /* @__PURE__ */ v("div", {
					className: e("flex items-center justify-between px-3 py-2 border-b border-white/5", M && "cursor-grab active:cursor-grabbing"),
					onMouseDown: L,
					children: [/* @__PURE__ */ v("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _("span", { className: "w-2 h-2 rounded-full bg-success" }), /* @__PURE__ */ _("span", {
							className: "text-white/80 text-xs font-medium",
							children: n === "video" ? "Video Call" : "Audio Call"
						})]
					}), /* @__PURE__ */ v("div", {
						className: "flex items-center gap-1",
						children: [
							V && /* @__PURE__ */ _("button", {
								type: "button",
								onClick: R,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: q.snapBack
							}),
							E && /* @__PURE__ */ _("button", {
								type: "button",
								onClick: E,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ _("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ _("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							T && /* @__PURE__ */ _("button", {
								type: "button",
								onClick: T,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: q.minimize
							})
						]
					})]
				}),
				k && /* @__PURE__ */ _("div", {
					className: e(M && "cursor-grab active:cursor-grabbing"),
					onMouseDown: L,
					children: /* @__PURE__ */ _(ce, {
						state: t,
						mode: n,
						duration: o,
						isMuted: s,
						callerName: a,
						onToggleMute: m,
						onEndCall: f,
						onExpand: T
					})
				}),
				!k && /* @__PURE__ */ v(g, { children: [
					t === "ringing" && /* @__PURE__ */ _(oe, {
						callerName: a,
						onAnswer: u,
						onDecline: d
					}),
					t === "connecting" && /* @__PURE__ */ v("div", {
						className: "flex flex-col items-center gap-3 py-6 px-4",
						"data-testid": "call-connecting-view",
						children: [/* @__PURE__ */ _("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ _("span", {
							className: "text-white/60 text-xs",
							children: "Connecting..."
						})]
					}),
					t === "active" && /* @__PURE__ */ _(se, {
						mode: n,
						participants: r,
						localParticipant: i,
						duration: o,
						isMuted: s,
						isCameraOn: c,
						isScreenSharing: l,
						onToggleMute: m,
						onToggleCamera: h,
						onToggleScreenShare: y,
						onUpgradeToVideo: b,
						onAddParticipant: x,
						availableParticipants: S,
						onOpenAddParticipant: w,
						controlsExtras: C,
						onEndCall: f,
						layoutComponent: D,
						callStats: O
					})
				] })
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function fe({ callerName: t, callerAvatarUrl: n, context: r, mode: i = "started", onJoin: a, onDismiss: o, autoExpireSec: s = 30, className: c, style: l }) {
	let [d, f] = h(!0);
	return u(() => {
		if (!s || s <= 0) return;
		let e = setTimeout(() => {
			f(!1), o?.();
		}, s * 1e3);
		return () => clearTimeout(e);
	}, [s, o]), d ? /* @__PURE__ */ v("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": i,
		"data-caller-name": t,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-surface-inverse text-white border border-white/10", c),
		style: l,
		children: [
			/* @__PURE__ */ _(pe, {
				name: t,
				avatarUrl: n
			}),
			/* @__PURE__ */ v("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ _("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: i === "calling" ? `${t} is calling you` : `${t} started a call`
				}), r && /* @__PURE__ */ _("p", {
					className: "text-xs text-white/60 m-0 truncate",
					children: r
				})]
			}),
			/* @__PURE__ */ v("div", {
				className: "flex items-center gap-2",
				children: [o && /* @__PURE__ */ _("button", {
					type: "button",
					onClick: () => {
						f(!1), o();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), a && /* @__PURE__ */ _("button", {
					type: "button",
					onClick: () => {
						f(!1), a();
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
function pe({ name: e, avatarUrl: t }) {
	let n = he(e);
	return /* @__PURE__ */ v("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ _("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : me(e), /* @__PURE__ */ _("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function me(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function he(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function ge(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function _e({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: s, onError: c, hideDownload: l = !1, className: d }) {
	let f = m(null), g = m(null), [y, b] = h(!1), [x, S] = h(0), [C, w] = h(0), [T, E] = h(1), [D, O] = h(1), [k, A] = h(!1), [j, M] = h(null);
	u(() => {
		let e = f.current;
		if (!e || !t) return;
		if (M(null), A(!0), e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
					M("HLS playback is not supported in this browser."), A(!1);
					return;
				}
				let i = new r({ enableWorker: !0 });
				g.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (M(`HLS error: ${t.type}`), c?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				M(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
			}
		})(), () => {
			if (n = !0, g.current) {
				try {
					g.current.destroy();
				} catch {}
				g.current = null;
			}
		};
	}, [t, c]);
	let N = () => {
		let e = f.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, P = (e) => {
		let t = f.current;
		!t || !isFinite(C) || C <= 0 || (t.currentTime = Number(e.target.value));
	}, F = (e) => {
		let t = f.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, E(n);
	}, I = (e) => {
		let t = f.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, O(n);
	}, L = () => {
		let e = f.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, R = p(() => C > 0 ? Math.min(100, x / C * 100) : 0, [x, C]);
	return /* @__PURE__ */ v("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", d),
		children: [
			/* @__PURE__ */ _("video", {
				ref: f,
				autoPlay: r,
				muted: i,
				poster: n,
				playsInline: !0,
				className: "w-full h-full object-contain",
				onPlay: () => b(!0),
				onPause: () => b(!1),
				onLoadedMetadata: (e) => {
					let t = e.currentTarget;
					w(t.duration), A(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					S(t.currentTime), s?.(t.currentTime, t.duration);
				},
				onWaiting: () => A(!0),
				onCanPlay: () => A(!1),
				onError: () => {
					M("Playback error."), c?.(/* @__PURE__ */ Error("video element error")), A(!1);
				}
			}),
			k && !j && /* @__PURE__ */ _("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			j && /* @__PURE__ */ _("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: j
			}),
			/* @__PURE__ */ v("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ v("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ _("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: ge(x)
						}),
						/* @__PURE__ */ _("input", {
							type: "range",
							min: 0,
							max: isFinite(C) ? C : 0,
							step: .1,
							value: x,
							onChange: P,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${R}%` }
						}),
						/* @__PURE__ */ _("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: ge(C)
						})
					]
				}), /* @__PURE__ */ v("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ _("button", {
							type: "button",
							onClick: N,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": y ? "Pause" : "Play",
							children: y ? /* @__PURE__ */ v("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ _("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ _("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ _("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ _("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ v("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ _("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: T,
								onChange: F,
								className: "w-20 h-1 accent-white/90 cursor-pointer",
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ _(o, {
							size: "sm",
							value: String(D),
							onChange: I,
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
						/* @__PURE__ */ _("div", { className: "flex-1" }),
						!l && t && /* @__PURE__ */ _("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ _("button", {
							type: "button",
							onClick: L,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ _("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ _("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function ve(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function ye(e) {
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
function be({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ v("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ _("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ _("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function xe({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ v("div", {
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
			/* @__PURE__ */ v("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ _("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ _("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ _("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ _("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ _(be, { status: s }),
					/* @__PURE__ */ _("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: ve(r)
					})
				]
			}),
			/* @__PURE__ */ v("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ _("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? ye(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ v("span", {
					className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0",
					children: [i, " 👥"]
				})]
			}),
			o && /* @__PURE__ */ _("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: ye(n)
			}),
			u && /* @__PURE__ */ _("div", {
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
function Se({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ _("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ v("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ _("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ _("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ _("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ _("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ _(xe, {
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
function Ce(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function we(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function Te({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, pendingMessage: s, idleState: c, className: l }) {
	let d = m(null), f = p(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return u(() => {
		if (f < 0 || !d.current) return;
		let e = d.current.querySelector(`[data-seg-index="${f}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [f]), t === "idle" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ _("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: a
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: c ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ v("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ _("span", { children: a }),
				/* @__PURE__ */ _("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ _("span", {
					className: "text-xs font-normal text-[var(--color-text-tertiary,#737373)]",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: s ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ v("header", {
			className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2",
			children: [a, " — failed"]
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: o ?? "Transcript generation failed. Reach out to support if this persists."
		})]
	}) : !n || n.length === 0 ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ _("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: a
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", l),
		children: [/* @__PURE__ */ v("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]",
			children: [a, /* @__PURE__ */ v("span", {
				className: "ml-2 text-xs font-normal text-[var(--color-text-tertiary,#737373)]",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ _("div", {
			ref: d,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === f, a = we(t.speakerId), o = !!i;
				return /* @__PURE__ */ v("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-[var(--color-surface-active,rgba(255,255,255,0.06))] ring-1 ring-[var(--color-border-focus,#3b82f6)]" : "hover:bg-[var(--color-surface-hover,rgba(255,255,255,0.03))]", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					children: [/* @__PURE__ */ v("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ _("span", {
							className: "text-xs font-semibold",
							style: { color: `hsl(${a}, 65%, 60%)` },
							children: t.speakerLabel
						}), /* @__PURE__ */ _("span", {
							className: "text-xs font-mono text-[var(--color-text-tertiary,#737373)]",
							children: Ce(t.startMs)
						})]
					}), /* @__PURE__ */ _("p", {
						className: "text-sm text-[var(--color-text-primary)] leading-relaxed",
						children: t.text
					})]
				}, `${t.startMs}-${t.speakerId}-${n}`);
			})
		})]
	});
}
//#endregion
//#region src/components/video/SummaryPanel.tsx
function Ee({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, pendingMessage: o, idleState: s, className: c }) {
	return t === "idle" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ _("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: i
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: s ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ v("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ _("span", { children: i }), /* @__PURE__ */ _("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: o ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ v("header", {
			className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2",
			children: [i, " — failed"]
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: a ?? "Summary generation failed."
		})]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ _("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: i
		}), /* @__PURE__ */ _("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ v("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", c),
		children: [/* @__PURE__ */ _("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]",
			children: i
		}), /* @__PURE__ */ _("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ _("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-[var(--color-text-primary)]",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function De({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = h(!1), [o, s] = h(!1);
	u(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), u(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = l(async () => {
		if (o) try {
			if (document.pictureInPictureElement) {
				await document.exitPictureInPicture(), a(!1);
				return;
			}
			let e = t();
			if (!e) return;
			e.disablePictureInPicture = !1, await e.requestPictureInPicture(), a(!0);
		} catch {}
	}, [o, t]), d = !o;
	return /* @__PURE__ */ _("button", {
		type: "button",
		onClick: c,
		disabled: d,
		title: r ?? (d ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", d ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ _("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ _("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function Oe(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function ke({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, className: s }) {
	let c = i ?? t.length;
	return /* @__PURE__ */ v("aside", {
		className: e("flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]", s),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ v("header", {
				className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between",
				children: [/* @__PURE__ */ _("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: a
				}), /* @__PURE__ */ _("span", {
					className: "text-xs text-[var(--color-text-secondary)] tabular-nums",
					children: c
				})]
			}),
			/* @__PURE__ */ _("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ _("li", { children: /* @__PURE__ */ v("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ v("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ _("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ _("span", { children: Oe(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ _("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ v("span", {
								className: "flex-1 truncate text-sm text-[var(--color-text-primary)]",
								children: [t.displayName, t.isLocal && /* @__PURE__ */ _("span", {
									className: "ml-1 text-xs text-[var(--color-text-secondary)]",
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ _("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ _("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ _("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ _("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var J = null;
function Ae() {
	if (J) return J;
	try {
		return J = new AudioContext(), J;
	} catch {
		return null;
	}
}
function je({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = h(!1);
	return u(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = Ae();
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
	]), u(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var Me = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Ne() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function Pe({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = h(!1), u = m(null), d = a.videoRef ?? u, f = l((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), p = l(() => {
		let e = d.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		Ne(), s(!1);
	}, [d]);
	return /* @__PURE__ */ v("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ _(c, {
			...a,
			videoRef: d,
			onPlayStateChange: f
		}), o && /* @__PURE__ */ _("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ _("button", {
				type: "button",
				onClick: p,
				className: e(Me, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var Fe = 1;
function Ie({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = h(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== Fe ? t : {
				mode: r.mode === "docked" ? "docked" : "mini",
				x: Y(r.x, t.x),
				y: Y(r.y, t.y),
				width: Y(r.width, t.width),
				height: Y(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = m(null);
	return u(() => {
		if (!(!e || typeof window > "u")) return a.current && clearTimeout(a.current), a.current = setTimeout(() => {
			try {
				let t = {
					v: Fe,
					...r
				};
				window.localStorage.setItem(e, JSON.stringify(t));
			} catch {}
		}, n), () => {
			a.current && clearTimeout(a.current);
		};
	}, [
		e,
		r,
		n
	]), {
		state: r,
		setState: l((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Y(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var Le = 320, Re = 200, ze = 640, Be = 400, Ve = 1440, He = 900, Ue = 960, We = 600, X = 8;
function Ge({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", onModeChange: s, persistKey: c, apiRef: g, defaultCorner: y = "bottom-right", expandable: b = !0, zIndex: x = 9999, className: S }) {
	let C = p(() => o === "docked" ? Xe(Ue, We) : Ze(y), [o, y]), { state: w, setState: T } = Ie({
		persistKey: c,
		defaults: {
			mode: o,
			x: C.x,
			y: C.y,
			width: Ue,
			height: We
		}
	}), [E, D] = h(!1), O = E ? "fullscreen" : w.mode, k = m(null), A = m(!1);
	u(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== k.current && E && (D(!1), A.current || T({ mode: "docked" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [E, T]);
	let j = l(() => {
		let e = k.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => D(!0), () => {}) : D(!0);
	}, []), M = l(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = l((e) => {
		if (e !== O) {
			if (e === "fullscreen") {
				j();
				return;
			}
			if (O === "fullscreen") {
				M(), T({ mode: e });
				return;
			}
			if (e === "docked" && O === "mini") {
				let t = Xe(w.width, w.height);
				T({
					mode: e,
					x: t.x,
					y: t.y
				});
				return;
			}
			if (e === "mini" && O === "docked") {
				let t = Ze(y);
				T({
					mode: e,
					x: t.x,
					y: t.y
				});
				return;
			}
			T({ mode: e });
		}
	}, [
		O,
		j,
		M,
		T,
		w.width,
		w.height,
		y
	]);
	u(() => {
		s?.(O);
	}, [O, s]), d(g, () => ({
		mode: O,
		setMode: N
	}), [O, N]);
	let P = m(null), F = l((e) => {
		O === "docked" && (e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), P.current = {
			startX: e.clientX,
			startY: e.clientY,
			origX: w.x,
			origY: w.y
		}));
	}, [
		O,
		w.x,
		w.y
	]), I = l((e) => {
		let t = P.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Z(t.origX + n, w.width, window.innerWidth), a = Z(t.origY + r, w.height, window.innerHeight);
		T({
			x: i,
			y: a
		});
	}, [
		T,
		w.width,
		w.height
	]), L = l((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), R = m(null), ee = l((e) => {
		O === "docked" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), R.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: w.width,
			origH: w.height
		});
	}, [
		O,
		w.width,
		w.height
	]), z = l((e) => {
		let t = R.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Qe(t.origW + n, ze, Math.min(Ve, window.innerWidth - 16)), a = Qe(t.origH + r, Be, Math.min(He, window.innerHeight - 16));
		T({
			width: i,
			height: a
		});
	}, [T]), B = l((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), R.current = null;
	}, []);
	f(() => {
		if (O !== "docked") return;
		let e = () => {
			let e = Z(w.x, w.width, window.innerWidth), t = Z(w.y, w.height, window.innerHeight);
			(e !== w.x || t !== w.y) && T({
				x: e,
				y: t
			});
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		O,
		w.x,
		w.y,
		w.width,
		w.height,
		T
	]);
	let V = p(() => O === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: x
	} : O === "docked" ? {
		position: "fixed",
		left: w.x,
		top: w.y,
		width: w.width,
		height: w.height,
		zIndex: x
	} : {
		position: "fixed",
		left: w.x,
		top: w.y,
		width: Le,
		height: Re,
		zIndex: x
	}, [
		O,
		w.x,
		w.y,
		w.width,
		w.height,
		x
	]);
	return /* @__PURE__ */ v("div", {
		ref: k,
		"data-call-widget-mode": O,
		style: V,
		className: e("flex flex-col bg-surface-inverse text-white shadow-2xl overflow-hidden border border-white/10", O === "fullscreen" ? "rounded-none" : "rounded-lg", S),
		children: [
			/* @__PURE__ */ v("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", O === "docked" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: F,
				onPointerMove: I,
				onPointerUp: L,
				onPointerCancel: L,
				children: [/* @__PURE__ */ v("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ _("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ _("span", {
							className: "truncate font-medium",
							children: t
						}),
						n && /* @__PURE__ */ _("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ _("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: K(r)
						})
					]
				}), b && /* @__PURE__ */ v("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ _(Ke, {
							active: O === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ _(qe, {})
						}),
						/* @__PURE__ */ _(Ke, {
							active: O === "docked",
							label: "Window",
							onClick: () => N("docked"),
							testId: "call-widget-mode-docked",
							children: /* @__PURE__ */ _(Je, {})
						}),
						/* @__PURE__ */ _(Ke, {
							active: O === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(O === "fullscreen" ? "docked" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ _(Ye, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "relative flex-1 min-h-0 bg-black",
				children: i
			}),
			a && /* @__PURE__ */ _("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: a
			}),
			O === "docked" && /* @__PURE__ */ _("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: ee,
				onPointerMove: z,
				onPointerUp: B,
				onPointerCancel: B,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ _("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ _("path", {
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
function Ke({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ _("button", {
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
function qe() {
	return /* @__PURE__ */ _("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ _("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Je() {
	return /* @__PURE__ */ _("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ _("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Ye() {
	return /* @__PURE__ */ _("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ _("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function Xe(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(X, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(X, Math.floor((window.innerHeight - t) / 2))
	};
}
function Ze(e) {
	if (typeof window > "u") return {
		x: 16,
		y: 16
	};
	let t = window.innerWidth, n = window.innerHeight;
	switch (e) {
		case "top-left": return {
			x: X,
			y: X
		};
		case "top-right": return {
			x: t - Le - X,
			y: X
		};
		case "bottom-left": return {
			x: X,
			y: n - Re - X
		};
		default: return {
			x: t - Le - X,
			y: n - Re - X
		};
	}
}
function Qe(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Z(e, t, n) {
	return Qe(e, X, Math.max(X, n - t - X));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function $e({ show: e, label: t }) {
	return e ? /* @__PURE__ */ v("div", {
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
function et({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ _("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var tt = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
];
function nt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return tt[Math.abs(t) % tt.length];
}
function rt({ lines: t, maxLines: n = 3, fadeAfterMs: r = 8e3, now: i, className: a }) {
	let o = i ?? Date.now(), s = t.slice(-n).map((e) => {
		let t = o - new Date(e.at).getTime(), n = Math.max(.35, 1 - t / r);
		return {
			...e,
			opacity: n
		};
	}).filter((e) => e.opacity > 0);
	return s.length === 0 ? null : /* @__PURE__ */ _("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: s.map((t) => /* @__PURE__ */ v("div", {
			className: e("flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ _("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: nt(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ _("span", {
				className: "text-white",
				children: t.text
			})]
		}, t.id))
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var it = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, at = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", ot = "bg-surface-hover text-neutral hover:bg-surface-emphasis", st = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function Q({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? at : a === "danger" ? st : ot;
	return /* @__PURE__ */ _("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", it[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/MediaIcons.tsx
function $(e, t) {
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
function ct({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "11",
				rx: "3"
			}),
			/* @__PURE__ */ _("path", { d: "M5 11a7 7 0 0 0 14 0" }),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ _("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function lt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ _("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ _("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ _("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
			/* @__PURE__ */ _("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ _("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function ut({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [/* @__PURE__ */ _("path", { d: "M22 8l-6 4 6 4V8z" }), /* @__PURE__ */ _("rect", {
			x: "2",
			y: "6",
			width: "14",
			height: "12",
			rx: "2"
		})]
	});
}
function dt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ _("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
			/* @__PURE__ */ _("path", { d: "M22 8l-6 4 6 4V8z" })
		]
	});
}
function ft({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("rect", {
				x: "2",
				y: "4",
				width: "20",
				height: "12",
				rx: "2"
			}),
			/* @__PURE__ */ _("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			}),
			/* @__PURE__ */ _("polyline", { points: "9 10 12 7 15 10" }),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "7",
				x2: "12",
				y2: "13"
			})
		]
	});
}
function pt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ _("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
			/* @__PURE__ */ _("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
			/* @__PURE__ */ _("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ _("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			})
		]
	});
}
function mt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
			/* @__PURE__ */ _("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
			/* @__PURE__ */ _("line", {
				x1: "22",
				y1: "2",
				x2: "2",
				y2: "22"
			})
		]
	});
}
function ht({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
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
			/* @__PURE__ */ _("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ _("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ _("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ _("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	});
}
function gt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ v("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ _("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ _("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ _("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			})
		]
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function _t(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function vt(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
function yt({ channelName: n, localIdentity: o, previewStream: s, permission: c, permissionMessage: l, audioEnabled: d, videoEnabled: f, onToggleAudio: p, onToggleVideo: h, onRetryPermission: g, participants: y, readyState: b, readyLoading: x = !1, onJoin: S, onCancel: C, joinLabel: w, joinDisabled: T, subtitleOverride: E, className: D, "data-testid": O }) {
	let k = m(null);
	u(() => {
		k.current && s && (k.current.srcObject = s);
	}, [s]);
	let A = c === "granted", j = vt(c), M = T ?? !A, N = w ?? (M && !A ? "Allow camera to join" : "Join now"), P = E ?? _t(y, b, x);
	return /* @__PURE__ */ v("div", {
		"data-testid": O,
		className: e("flex flex-col h-full min-h-0 bg-surface-panel text-text-primary", D),
		children: [/* @__PURE__ */ v("header", {
			className: "flex items-center justify-between px-6 py-4 border-b border-border bg-white",
			children: [/* @__PURE__ */ v("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ _("h1", {
					className: "text-lg font-semibold truncate",
					children: n
				}), /* @__PURE__ */ _("p", {
					className: "text-xs text-neutral mt-0.5",
					children: P
				})]
			}), /* @__PURE__ */ _(t, {
				variant: "ghost",
				size: "sm",
				onClick: C,
				children: "Cancel"
			})]
		}), /* @__PURE__ */ v("main", {
			className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full",
			children: [/* @__PURE__ */ v("section", {
				className: "lg:flex-1 min-h-0",
				children: [/* @__PURE__ */ v("div", {
					className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black",
					children: [
						s && A && /* @__PURE__ */ _("video", {
							ref: k,
							autoPlay: !0,
							playsInline: !0,
							muted: !0,
							className: e("w-full h-full object-cover scale-x-[-1]", !f && "opacity-0")
						}),
						A && !f && (o ? /* @__PURE__ */ _("div", {
							"data-testid": "prejoin-identity-tile",
							className: "absolute inset-0 grid place-items-center bg-surface-inverse/95",
							children: /* @__PURE__ */ v("div", {
								className: "flex flex-col items-center gap-3 px-6 text-center",
								children: [/* @__PURE__ */ _(a, {
									name: o.displayName,
									src: o.avatarSrc,
									size: 96
								}), /* @__PURE__ */ v("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ _("span", {
										className: "text-white text-base font-medium truncate max-w-[16rem]",
										children: o.displayName
									}), /* @__PURE__ */ _("span", {
										className: "text-text-disabled text-xs",
										children: "Camera off"
									})]
								})]
							})
						}) : /* @__PURE__ */ _("div", {
							"data-testid": "prejoin-camera-off-fallback",
							className: "absolute inset-0 grid place-items-center text-text-disabled text-sm",
							children: "Camera off"
						})),
						c === "pending" && /* @__PURE__ */ _("div", {
							className: "absolute inset-0 grid place-items-center",
							children: /* @__PURE__ */ _(r, { size: "lg" })
						}),
						j && /* @__PURE__ */ _("div", {
							className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
							children: /* @__PURE__ */ _(i, {
								kind: "camera",
								state: j,
								message: l,
								onRetry: g,
								"data-testid": "prejoin-permission-card"
							})
						})
					]
				}), /* @__PURE__ */ v("div", {
					className: "mt-4 flex items-center justify-center gap-3",
					children: [/* @__PURE__ */ _(Q, {
						on: d,
						onClick: p,
						disabled: !A,
						"aria-label": d ? "Mute mic before joining" : "Unmute mic before joining",
						title: d ? "Mute mic before joining" : "Unmute mic before joining",
						iconOn: /* @__PURE__ */ _(ct, { size: 18 }),
						iconOff: /* @__PURE__ */ _(lt, { size: 18 }),
						"data-testid": "prejoin-toggle-audio"
					}), /* @__PURE__ */ _(Q, {
						on: f,
						onClick: h,
						disabled: !A,
						"aria-label": f ? "Turn camera off before joining" : "Turn camera on before joining",
						title: f ? "Turn camera off before joining" : "Turn camera on before joining",
						iconOn: /* @__PURE__ */ _(ut, { size: 18 }),
						iconOff: /* @__PURE__ */ _(dt, { size: 18 }),
						"data-testid": "prejoin-toggle-video"
					})]
				})]
			}), /* @__PURE__ */ v("section", {
				className: "lg:w-96 flex flex-col",
				children: [/* @__PURE__ */ v("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ _("h2", {
							className: "text-2xl font-semibold mb-2",
							children: "Ready to join?"
						}),
						/* @__PURE__ */ _("p", {
							className: "text-sm text-neutral mb-6",
							children: P
						}),
						/* @__PURE__ */ _(bt, {
							participants: y,
							loading: x
						}),
						b === "pending" && !x && /* @__PURE__ */ v("p", {
							className: "mt-4 text-xs text-warning-fg flex items-center gap-2",
							children: [/* @__PURE__ */ _("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
						})
					]
				}), /* @__PURE__ */ v("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ _(t, {
						variant: "primary",
						size: "lg",
						onClick: () => S({
							audio: d,
							video: f
						}),
						disabled: M,
						"data-testid": "prejoin-join-button",
						children: N
					}), /* @__PURE__ */ _("button", {
						type: "button",
						onClick: C,
						className: "text-xs text-neutral hover:text-text-primary transition-colors text-center",
						children: "Back to rooms"
					})]
				})]
			})]
		})]
	});
}
function bt({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ v("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ _(r, { size: "sm" }), " Checking room…"]
	}) : !e || e.length === 0 ? null : /* @__PURE__ */ v("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ _("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ v("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ v("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ _(a, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ _("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ _(n, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ v("li", {
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
var xt = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, St = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function Ct() {
	return /* @__PURE__ */ v("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ _("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ _("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function wt({ channelName: t, subtitle: r, recording: i, elapsedLabel: a, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ v("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white", c),
		children: [/* @__PURE__ */ v("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ _("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (r || i?.armed || a) && /* @__PURE__ */ v("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					r && /* @__PURE__ */ _("span", { children: r }),
					i?.armed && /* @__PURE__ */ _(n, {
						tone: i.active ? "danger" : "neutral",
						size: "xs",
						uppercase: !0,
						dot: i.active ? "pulse" : "static",
						title: i.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
						"data-testid": "hangout-room-header-recording",
						children: "Rec"
					}),
					a && /* @__PURE__ */ _(n, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ _(Ct, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ _("span", {
							className: "tabular-nums",
							children: a
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ v("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ _(n, {
				tone: xt[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: St[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var Tt = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Et = {
	sm: 16,
	md: 20,
	lg: 24
};
function Dt({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ v("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ _(Q, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ _(ct, { size: g }),
				iconOff: /* @__PURE__ */ _(lt, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ _(Q, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ _(ut, { size: g }),
				iconOff: /* @__PURE__ */ _(dt, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ _(Q, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ _(ft, { size: g }),
				iconOff: /* @__PURE__ */ _(pt, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ _("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", Tt[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ _(mt, { size: Et[p] })
			})
		]
	});
}
//#endregion
export { G as A, C as B, Ee as C, _e as D, xe as E, j as F, N as I, A as L, H as M, ee as N, fe as O, R as P, k as R, De as S, Se as T, b as V, Ge as _, lt as a, je as b, ft as c, ut as d, dt as f, $e as g, et as h, ct as i, te as j, de as k, pt as l, rt as m, wt as n, gt as o, Q as p, yt as r, mt as s, Dt as t, ht as u, Ie as v, Te as w, ke as x, Pe as y, T as z };
