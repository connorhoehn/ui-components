import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { t as n } from "./Button-CTpms90-.js";
import { t as r } from "./Chip-2lIuHwy5.js";
import { n as i, t as a } from "./PermissionDeniedCard-CbMdNs9F.js";
import { n as o, r as s, t as c } from "./focusTrap-BWX7tm6P.js";
import { t as l } from "./Avatar-u3ZNK9l2.js";
import { t as u } from "./activationKey-CjbL3LUv.js";
import { t as d } from "./Select-Z0TLUVeL.js";
import { d as f, r as p } from "./ReconnectingBanner-C5jBpTlY.js";
import { useCallback as m, useEffect as h, useImperativeHandle as g, useLayoutEffect as _, useMemo as v, useRef as y, useState as b } from "react";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var w = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function T({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = y(null), [m, g] = b("idle"), _ = c ?? m;
	h(() => {
		let e = p.current;
		if (!e) return;
		let t = [
			["waiting", () => {
				g("buffering"), d?.("buffering");
			}],
			["playing", () => {
				g("playing"), d?.("playing");
			}],
			["error", () => {
				g("error"), d?.("error");
			}],
			["loadstart", () => {
				g("connecting"), d?.("connecting");
			}],
			["timeupdate", () => {
				f?.(e.currentTime, e.duration);
			}]
		];
		return t.forEach(([t, n]) => e.addEventListener(t, n)), () => t.forEach(([t, n]) => e.removeEventListener(t, n));
	}, [d, f]), h(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let v = _ !== "playing", x = w[_];
	return /* @__PURE__ */ C("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ S("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), v && x && /* @__PURE__ */ C("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [_ === "buffering" && /* @__PURE__ */ S(E, {}), /* @__PURE__ */ S("span", {
				className: e(_ === "buffering" ? "ml-2" : ""),
				children: x
			})]
		})]
	});
}
function E() {
	return /* @__PURE__ */ C("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ S("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ S("path", {
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
function D(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function O({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: a = !0, muted: l = !1, hideDownload: u = !1, header: d, footer: f, className: p }) {
	let m = v(() => n.filter((e) => !!e.url), [n]), [g, _] = b(0), x = m[g], w = y(null), T = y(null);
	return h(() => {
		let e = (e) => {
			if (e.key === "Escape") {
				t();
				return;
			}
			s(e, w.current);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t]), h(() => (T.current = typeof document < "u" ? document.activeElement : null, c(w.current), () => {
		o(T.current), T.current = null;
	}), []), /* @__PURE__ */ S("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ C("div", {
			ref: w,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", p),
			children: [
				(r || i || d) && /* @__PURE__ */ C("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ C("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ S("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ S("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ C("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [d, /* @__PURE__ */ S("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				x ? /* @__PURE__ */ S("video", {
					src: x.url,
					controls: !0,
					autoPlay: a,
					muted: l,
					className: "w-full max-h-[70vh] bg-black"
				}, x.url) : /* @__PURE__ */ S("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				m.length > 1 && /* @__PURE__ */ S("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: m.map((t, n) => {
						let r = n === g;
						return /* @__PURE__ */ S("button", {
							type: "button",
							onClick: () => _(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : D(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(f || !u && x) && /* @__PURE__ */ C("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ S("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: f
					}), !u && x && /* @__PURE__ */ S("a", {
						href: x.url,
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
function k(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function A({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ S("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", k(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ S("div", {
		className: e("p-3 bg-surface-inverse rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ C("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ S("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ S("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var j = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, M = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, N = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function P({ quality: t, className: n, style: r }) {
	let i = j[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ C("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ S("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ S("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ S("span", {
			className: M[t],
			children: N[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function F({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ S("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ S(f, {
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
function I({ reactions: t, className: n, style: r }) {
	let [i, a] = b([]);
	return h(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), h(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ S("div", {
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ S("span", {
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var L = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function R({ onReact: t, emojis: n = L, className: r, style: i }) {
	return /* @__PURE__ */ S("div", {
		className: e("flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]", r),
		style: i,
		children: n.map((n) => /* @__PURE__ */ S("button", {
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
function ee(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function z(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var B = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, V = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function te({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ C("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-surface-inverse rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ C("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ S("span", { className: e("w-[7px] h-[7px] rounded-full", B[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ S("span", {
					className: e("font-semibold", V[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ S("span", { children: ee(n) }),
			i !== void 0 && /* @__PURE__ */ S("span", { children: z(i) }),
			r !== void 0 && /* @__PURE__ */ C("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ C("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ S("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ S("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function H({ count: t, className: n, style: r }) {
	let i = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ C("div", {
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ C("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: [/* @__PURE__ */ S("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ S("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ C("span", { children: [i, " watching"] })]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function ne(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function re(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function U({ participant: e, size: t = 32 }) {
	let n = re(e.displayName);
	return /* @__PURE__ */ C("div", {
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
			e.avatarUrl ? /* @__PURE__ */ S("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : ne(e.displayName),
			e.isSpeaking && /* @__PURE__ */ S("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ S("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ C("svg", {
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
						/* @__PURE__ */ S("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ S("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ S("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function ie({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ C("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ S(U, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ C("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ S(U, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var W = {
	mic: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ S("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ S("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ S("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ S("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ S("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ S("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ S("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ S("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ S("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ S("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ S("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ S("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ S("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ S("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ S("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ S("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ S("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ S("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ S("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	})
};
function G({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s }) {
	return /* @__PURE__ */ S("button", {
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
function ae({ mode: t, isMuted: n = !1, isCameraOn: r = !0, isScreenSharing: i = !1, onToggleMute: a, onToggleCamera: o, onToggleScreenShare: s, onUpgradeToVideo: c, onEndCall: l, onAddParticipant: u, availableParticipants: d, currentParticipantIds: f, onOpenAddParticipant: p, className: m }) {
	let [h, g] = b(!1), _ = new Set(f ?? []), v = (d ?? []).filter((e) => !_.has(e.id));
	return /* @__PURE__ */ C("div", {
		className: e("flex flex-col", m),
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				/* @__PURE__ */ S(G, {
					icon: n ? W.micOff : W.mic,
					label: n ? "Unmute" : "Mute",
					active: n,
					onClick: a,
					testId: "mute-button"
				}),
				t === "video" && /* @__PURE__ */ S(G, {
					icon: r ? W.camera : W.cameraOff,
					label: r ? "Turn off camera" : "Turn on camera",
					active: !r,
					onClick: o,
					testId: "camera-button"
				}),
				t === "audio" && c && /* @__PURE__ */ S(G, {
					icon: W.videoUpgrade,
					label: "Switch to video",
					onClick: c,
					testId: "upgrade-to-video-button"
				}),
				/* @__PURE__ */ S(G, {
					icon: W.screenShare,
					label: i ? "Stop sharing" : "Share screen",
					active: i,
					onClick: s,
					testId: "screenshare-button"
				}),
				(u || p) && /* @__PURE__ */ S(G, {
					icon: W.userPlus,
					label: "Add people to this call",
					active: h,
					onClick: p || (() => g((e) => !e)),
					testId: "add-participant-button"
				}),
				/* @__PURE__ */ S(G, {
					icon: W.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: l,
					testId: "hangup-button"
				})
			]
		}), h && u && !p && /* @__PURE__ */ C("div", {
			className: "border-t border-white/5 bg-surface-inverse/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ C("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ S("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ S("button", {
					type: "button",
					onClick: () => g(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), v.length === 0 ? /* @__PURE__ */ S("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ S("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: v.map((e) => /* @__PURE__ */ C("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						u(e.id), v.length <= 1 && g(!1);
					},
					children: [
						/* @__PURE__ */ S(U, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ S("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ S("span", {
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
function oe(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var se = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function ce(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function K({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return oe(t) ? /* @__PURE__ */ C("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", se[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ S(P, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ C("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ C("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ S("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), ce(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ C("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ S("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ C("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ S("span", {
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
function le(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function ue({ stream: t, muted: n = !1, className: r }) {
	let i = y(null);
	return h(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ S("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var q = {
	phoneEnd: /* @__PURE__ */ C("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ S("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ S("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ S("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ S("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ C("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ S("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ S("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ S("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ S("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ C("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ S("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ S("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	})
};
function de({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ C("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ S("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ S("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ S("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ C("div", {
				className: "text-center",
				children: [/* @__PURE__ */ S("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ S("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ C("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ S("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: q.phoneEnd
				}), /* @__PURE__ */ S("button", {
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
function fe({ mode: e, participants: t, localParticipant: n, duration: r, isMuted: i, isCameraOn: a, isScreenSharing: o, onToggleMute: s, onToggleCamera: c, onToggleScreenShare: l, onUpgradeToVideo: u, onAddParticipant: d, availableParticipants: f, onOpenAddParticipant: p, controlsExtras: m, onEndCall: h, layoutComponent: g, callStats: _ }) {
	let v = e === "video" && a;
	return /* @__PURE__ */ C("div", {
		className: "flex flex-col",
		children: [
			e === "video" && g && /* @__PURE__ */ C("div", {
				className: "mx-3 mt-3 rounded-lg overflow-hidden relative",
				children: [g, /* @__PURE__ */ S(K, {
					stats: _,
					position: "bottom-left"
				})]
			}),
			e === "video" && !g && /* @__PURE__ */ C("div", {
				className: "relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3",
				children: [
					n?.videoStream && v ? /* @__PURE__ */ S(ue, {
						stream: n.videoStream,
						muted: !0
					}) : /* @__PURE__ */ S("div", {
						className: "w-full h-full flex items-center justify-center bg-surface-inverse",
						children: n && /* @__PURE__ */ S(U, {
							participant: n,
							size: 48
						})
					}),
					t.length > 0 && /* @__PURE__ */ C("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse",
						children: [t[0].videoStream ? /* @__PURE__ */ S(ue, { stream: t[0].videoStream }) : /* @__PURE__ */ S("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ S(U, {
								participant: t[0],
								size: 28
							})
						}), t[0].isMuted && /* @__PURE__ */ S("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ C("svg", {
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
									/* @__PURE__ */ S("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ S("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ S("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ S(K, {
						stats: _,
						position: "bottom-left"
					})
				]
			}),
			e === "audio" && /* @__PURE__ */ S(ie, {
				participants: t,
				localFallback: n,
				maxVisible: 4,
				avatarSize: 36
			}),
			/* @__PURE__ */ C("div", {
				className: "text-center py-1.5",
				children: [r !== void 0 && /* @__PURE__ */ S("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": r,
					children: le(r)
				}), /* @__PURE__ */ C("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [t.length + 1, " in call"]
				})]
			}),
			m ? /* @__PURE__ */ S("div", {
				className: "flex items-center justify-center pb-1",
				children: m
			}) : null,
			/* @__PURE__ */ S(ae, {
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
function pe({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ C("div", {
		className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none",
		onClick: c,
		role: "button",
		tabIndex: 0,
		"aria-label": "Expand call widget",
		onKeyDown: u(() => c?.()),
		children: [
			/* @__PURE__ */ S("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ S("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ S("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ C("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ S("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: le(r)
						})
					]
				})
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && /* @__PURE__ */ S("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ S("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ C(x, { children: [
							/* @__PURE__ */ S("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ S("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ S("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ S("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ S("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), /* @__PURE__ */ S("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ C("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ S("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ S("line", {
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
function me(e) {
	let [t, n] = b({
		x: 0,
		y: 0
	}), [r, i] = b(!1), [a, o] = b(!1), s = y(null), c = m(() => {
		s.current && clearTimeout(s.current), s.current = setTimeout(() => o(!1), 200);
	}, []);
	h(() => () => {
		s.current && clearTimeout(s.current);
	}, []);
	let l = y(!1), u = y({
		x: 0,
		y: 0
	}), d = y({
		x: 0,
		y: 0
	}), f = y(null), p = m((n) => {
		e && (l.current = !0, i(!0), o(!1), u.current = {
			x: n.clientX,
			y: n.clientY
		}, d.current = { ...t }, n.preventDefault());
	}, [e, t]), g = m(() => {
		o(!0), n({
			x: 0,
			y: 0
		}), c();
	}, [c]), _ = m((e) => {
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
	}, [t, c]), v = y(_);
	return v.current = _, h(() => {
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
		resetOffset: g,
		snapToCorner: _,
		isDragging: r,
		isAnimating: a,
		hasMoved: t.x !== 0 || t.y !== 0,
		widgetRef: f
	};
}
function he({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ S("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ S("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ S("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ S("rect", {
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
function ge({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: y, controlsExtras: b, onOpenAddParticipant: w, onMinimize: T, onExpand: E, layoutComponent: D, callStats: O, minimized: k = !1, position: A = "bottom-right", contained: j = !1, draggable: M = !0, className: N, style: P, dataAttrs: F }) {
	let { offset: I, handleMouseDown: L, resetOffset: R, snapToCorner: ee, isDragging: z, isAnimating: B, hasMoved: V, widgetRef: te } = me(M), H = {};
	if (F) for (let [e, t] of Object.entries(F)) t != null && t !== "" && (H[e] = t);
	let ne = v(() => {
		switch (A) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [A]);
	return t === "idle" || t === "ended" ? null : /* @__PURE__ */ C(x, { children: [z && /* @__PURE__ */ S(he, {
		onSnap: ee,
		contained: j
	}), /* @__PURE__ */ S("div", {
		ref: te,
		"data-testid": "call-widget",
		"data-call-state": t,
		className: e(j ? "absolute z-50" : "fixed z-[9999]", ne, N),
		style: {
			transform: `translate(${I.x}px, ${I.y}px)`,
			transition: B ? "transform 0.2s ease-out" : void 0,
			...P
		},
		...H,
		children: /* @__PURE__ */ C("div", {
			className: e("bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm", k ? "w-[260px]" : "w-[320px]"),
			children: [
				!k && /* @__PURE__ */ C("div", {
					className: e("flex items-center justify-between px-3 py-2 border-b border-white/5", M && "cursor-grab active:cursor-grabbing"),
					onMouseDown: L,
					children: [/* @__PURE__ */ C("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ S("span", { className: "w-2 h-2 rounded-full bg-success" }), /* @__PURE__ */ S("span", {
							className: "text-white/80 text-xs font-medium",
							children: n === "video" ? "Video Call" : "Audio Call"
						})]
					}), /* @__PURE__ */ C("div", {
						className: "flex items-center gap-1",
						children: [
							V && /* @__PURE__ */ S("button", {
								type: "button",
								onClick: R,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: q.snapBack
							}),
							E && /* @__PURE__ */ S("button", {
								type: "button",
								onClick: E,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ S("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ S("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							T && /* @__PURE__ */ S("button", {
								type: "button",
								onClick: T,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: q.minimize
							})
						]
					})]
				}),
				k && /* @__PURE__ */ S("div", {
					className: e(M && "cursor-grab active:cursor-grabbing"),
					onMouseDown: L,
					children: /* @__PURE__ */ S(pe, {
						state: t,
						mode: n,
						duration: o,
						isMuted: s,
						callerName: a,
						onToggleMute: p,
						onEndCall: f,
						onExpand: T
					})
				}),
				!k && /* @__PURE__ */ C(x, { children: [
					t === "ringing" && /* @__PURE__ */ S(de, {
						callerName: a,
						onAnswer: u,
						onDecline: d
					}),
					t === "connecting" && /* @__PURE__ */ C("div", {
						className: "flex flex-col items-center gap-3 py-6 px-4",
						"data-testid": "call-connecting-view",
						children: [/* @__PURE__ */ S("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ S("span", {
							className: "text-white/60 text-xs",
							children: "Connecting..."
						})]
					}),
					t === "active" && /* @__PURE__ */ S(fe, {
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
						availableParticipants: y,
						onOpenAddParticipant: w,
						controlsExtras: b,
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
function _e({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", onJoin: o, onDismiss: s, autoExpireSec: c = 30, className: l, style: u }) {
	let [d, f] = b(!0), p = t(s);
	return h(() => {
		if (!c || c <= 0) return;
		let e = setTimeout(() => {
			f(!1), p();
		}, c * 1e3);
		return () => clearTimeout(e);
	}, [c, p]), d ? /* @__PURE__ */ C("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-surface-inverse text-white border border-white/10", l),
		style: u,
		children: [
			/* @__PURE__ */ S(ve, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ C("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ S("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), i && /* @__PURE__ */ S("p", {
					className: "text-xs text-white/60 m-0 truncate",
					children: i
				})]
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2",
				children: [s && /* @__PURE__ */ S("button", {
					type: "button",
					onClick: () => {
						f(!1), s();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), o && /* @__PURE__ */ S("button", {
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
function ve({ name: e, avatarUrl: t }) {
	let n = be(e);
	return /* @__PURE__ */ C("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ S("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : ye(e), /* @__PURE__ */ S("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function ye(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function be(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function xe(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function Se({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = y(null), f = y(null), [p, m] = b(!1), [g, _] = b(0), [x, w] = b(0), [T, E] = b(1), [D, O] = b(1), [k, A] = b(!1), [j, M] = b(null);
	h(() => {
		let e = u.current;
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
				f.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (M(`HLS error: ${t.type}`), s?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				M(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
			}
		})(), () => {
			if (n = !0, f.current) {
				try {
					f.current.destroy();
				} catch {}
				f.current = null;
			}
		};
	}, [t, s]);
	let N = () => {
		let e = u.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, P = (e) => {
		let t = u.current;
		!t || !isFinite(x) || x <= 0 || (t.currentTime = Number(e.target.value));
	}, F = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, E(n);
	}, I = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, O(n);
	}, L = () => {
		let e = u.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, R = v(() => x > 0 ? Math.min(100, g / x * 100) : 0, [g, x]);
	return /* @__PURE__ */ C("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ S("video", {
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
					w(t.duration), A(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					_(t.currentTime), o?.(t.currentTime, t.duration);
				},
				onWaiting: () => A(!0),
				onCanPlay: () => A(!1),
				onError: () => {
					M("Playback error."), s?.(/* @__PURE__ */ Error("video element error")), A(!1);
				}
			}),
			k && !j && /* @__PURE__ */ S("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			j && /* @__PURE__ */ S("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: j
			}),
			/* @__PURE__ */ C("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ C("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ S("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: xe(g)
						}),
						/* @__PURE__ */ S("input", {
							type: "range",
							min: 0,
							max: isFinite(x) ? x : 0,
							step: .1,
							value: g,
							onChange: P,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${R}%` }
						}),
						/* @__PURE__ */ S("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: xe(x)
						})
					]
				}), /* @__PURE__ */ C("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ S("button", {
							type: "button",
							onClick: N,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ C("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ S("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ S("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ S("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ S("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ C("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ S("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ S("input", {
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
						/* @__PURE__ */ S(d, {
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
						/* @__PURE__ */ S("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ S("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ S("button", {
							type: "button",
							onClick: L,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ S("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ S("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function Ce(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function we(e) {
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
function Te({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ C("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ S("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ S("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function Ee({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ C("div", {
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
			/* @__PURE__ */ C("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ S("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ S("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ S("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ S("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ S(Te, { status: s }),
					/* @__PURE__ */ S("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: Ce(r)
					})
				]
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ S("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? we(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ C("span", {
					className: "text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0",
					children: [i, " 👥"]
				})]
			}),
			o && /* @__PURE__ */ S("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: we(n)
			}),
			u && /* @__PURE__ */ S("div", {
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
function De({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ S("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ C("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ S("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ S("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ S("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ S("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ S(Ee, {
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
function Oe(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function ke(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function Ae({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, pendingMessage: s, idleState: c, className: l }) {
	let d = y(null), f = v(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return h(() => {
		if (f < 0 || !d.current) return;
		let e = d.current.querySelector(`[data-seg-index="${f}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [f]), t === "idle" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ S("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: a
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: c ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ C("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ S("span", { children: a }),
				/* @__PURE__ */ S("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ S("span", {
					className: "text-xs font-normal text-[var(--color-text-tertiary,#737373)]",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: s ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ C("header", {
			className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2",
			children: [a, " — failed"]
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: o ?? "Transcript generation failed. Reach out to support if this persists."
		})]
	}) : !n || n.length === 0 ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", l),
		children: [/* @__PURE__ */ S("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: a
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", l),
		children: [/* @__PURE__ */ C("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]",
			children: [a, /* @__PURE__ */ C("span", {
				className: "ml-2 text-xs font-normal text-[var(--color-text-tertiary,#737373)]",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ S("div", {
			ref: d,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === f, a = ke(t.speakerId), o = !!i;
				return /* @__PURE__ */ C("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-[var(--color-surface-active,rgba(255,255,255,0.06))] ring-1 ring-[var(--color-border-focus,#3b82f6)]" : "hover:bg-[var(--color-surface-hover,rgba(255,255,255,0.03))]", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? u(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${Oe(t.startMs)} — ${t.speakerLabel}` : void 0,
					children: [/* @__PURE__ */ C("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ S("span", {
							className: "text-xs font-semibold",
							style: { color: `hsl(${a}, 65%, 60%)` },
							children: t.speakerLabel
						}), /* @__PURE__ */ S("span", {
							className: "text-xs font-mono text-[var(--color-text-tertiary,#737373)]",
							children: Oe(t.startMs)
						})]
					}), /* @__PURE__ */ S("p", {
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
function je({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, pendingMessage: o, idleState: s, className: c }) {
	return t === "idle" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ S("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: i
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: s ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ C("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ S("span", { children: i }), /* @__PURE__ */ S("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: o ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border-danger,#7f1d1d)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ C("header", {
			className: "text-sm font-medium text-[var(--color-danger,#dc2626)] mb-2",
			children: [i, " — failed"]
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-secondary)]",
			children: a ?? "Summary generation failed."
		})]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4", c),
		children: [/* @__PURE__ */ S("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] mb-2",
			children: i
		}), /* @__PURE__ */ S("div", {
			className: "text-sm text-[var(--color-text-tertiary,#737373)]",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ C("section", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col", c),
		children: [/* @__PURE__ */ S("header", {
			className: "text-sm font-medium text-[var(--color-text-secondary)] px-4 py-3 border-b border-[var(--color-border)]",
			children: i
		}), /* @__PURE__ */ S("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ S("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-[var(--color-text-primary)]",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function Me({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = b(!1), [o, s] = b(!1);
	h(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), h(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = m(async () => {
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
	return /* @__PURE__ */ S("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ S("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ S("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function Ne(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function Pe({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, className: s }) {
	let c = i ?? t.length;
	return /* @__PURE__ */ C("aside", {
		className: e("flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]", s),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ C("header", {
				className: "px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between",
				children: [/* @__PURE__ */ S("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: a
				}), /* @__PURE__ */ S("span", {
					className: "text-xs text-[var(--color-text-secondary)] tabular-nums",
					children: c
				})]
			}),
			/* @__PURE__ */ S("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ S("li", { children: /* @__PURE__ */ C("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ C("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ S("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ S("span", { children: Ne(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ S("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ C("span", {
								className: "flex-1 truncate text-sm text-[var(--color-text-primary)]",
								children: [t.displayName, t.isLocal && /* @__PURE__ */ S("span", {
									className: "ml-1 text-xs text-[var(--color-text-secondary)]",
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ S("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ S("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ S("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ S("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var J = null;
function Fe() {
	if (J) return J;
	try {
		return J = new AudioContext(), J;
	} catch {
		return null;
	}
}
function Ie({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = b(!1);
	return h(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = Fe();
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
	]), h(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var Le = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function Re() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function ze({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = b(!1), c = y(null), l = a.videoRef ?? c, u = m((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = m(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		Re(), s(!1);
	}, [l]);
	return /* @__PURE__ */ C("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ S(p, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ S("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ S("button", {
				type: "button",
				onClick: d,
				className: e(Le, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var Be = 1;
function Ve({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = b(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== Be ? t : {
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
	}), a = y(null), o = y(!1), s = y(r);
	s.current = r;
	let c = m((e, t) => {
		try {
			let n = {
				v: Be,
				...t
			};
			window.localStorage.setItem(e, JSON.stringify(n));
		} catch {}
	}, []);
	return h(() => {
		if (!(!e || typeof window > "u")) return a.current && clearTimeout(a.current), o.current = !0, a.current = setTimeout(() => {
			o.current = !1, c(e, s.current);
		}, n), () => {
			a.current && clearTimeout(a.current);
		};
	}, [
		e,
		r,
		n,
		c
	]), h(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, c(e, s.current));
		};
	}, [e, c]), {
		state: r,
		setState: m((e) => {
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
var He = 320, Ue = 200, We = 640, Ge = 400, Ke = 1440, qe = 900, Je = 960, Ye = 600, X = 8;
function Xe({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", onModeChange: s, persistKey: c, apiRef: l, defaultCorner: u = "bottom-right", expandable: d = !0, zIndex: f = 9999, className: p }) {
	let x = v(() => o === "docked" ? tt(Je, Ye) : nt(u), [o, u]), { state: w, setState: T } = Ve({
		persistKey: c,
		defaults: {
			mode: o,
			x: x.x,
			y: x.y,
			width: Je,
			height: Ye
		}
	}), [E, D] = b(!1), O = E ? "fullscreen" : w.mode, k = y(null), A = y(!1);
	h(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== k.current && E && (D(!1), A.current || T({ mode: "docked" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [E, T]);
	let j = m(() => {
		let e = k.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => D(!0), () => {}) : D(!0);
	}, []), M = m(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = m((e) => {
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
				let t = tt(w.width, w.height);
				T({
					mode: e,
					x: t.x,
					y: t.y
				});
				return;
			}
			if (e === "mini" && O === "docked") {
				let t = nt(u);
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
		u
	]);
	h(() => {
		s?.(O);
	}, [O, s]), g(l, () => ({
		mode: O,
		setMode: N
	}), [O, N]);
	let P = y(null), F = m((e) => {
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
	]), I = m((e) => {
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
	]), L = m((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), R = y(null), ee = m((e) => {
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
	]), z = m((e) => {
		let t = R.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = rt(t.origW + n, We, Math.min(Ke, window.innerWidth - 16)), a = rt(t.origH + r, Ge, Math.min(qe, window.innerHeight - 16));
		T({
			width: i,
			height: a
		});
	}, [T]), B = m((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), R.current = null;
	}, []);
	_(() => {
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
	let V = v(() => O === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: f
	} : O === "docked" ? {
		position: "fixed",
		left: w.x,
		top: w.y,
		width: w.width,
		height: w.height,
		zIndex: f
	} : {
		position: "fixed",
		left: w.x,
		top: w.y,
		width: He,
		height: Ue,
		zIndex: f
	}, [
		O,
		w.x,
		w.y,
		w.width,
		w.height,
		f
	]);
	return /* @__PURE__ */ C("div", {
		ref: k,
		"data-call-widget-mode": O,
		style: V,
		className: e("flex flex-col bg-surface-inverse text-white shadow-2xl overflow-hidden border border-white/10", O === "fullscreen" ? "rounded-none" : "rounded-lg", p),
		children: [
			/* @__PURE__ */ C("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", O === "docked" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: F,
				onPointerMove: I,
				onPointerUp: L,
				onPointerCancel: L,
				children: [/* @__PURE__ */ C("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ S("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ S("span", {
							className: "truncate font-medium",
							children: t
						}),
						n && /* @__PURE__ */ S("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ S("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: le(r)
						})
					]
				}), d && /* @__PURE__ */ C("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ S(Ze, {
							active: O === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ S(Qe, {})
						}),
						/* @__PURE__ */ S(Ze, {
							active: O === "docked",
							label: "Window",
							onClick: () => N("docked"),
							testId: "call-widget-mode-docked",
							children: /* @__PURE__ */ S($e, {})
						}),
						/* @__PURE__ */ S(Ze, {
							active: O === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(O === "fullscreen" ? "docked" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ S(et, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ S("div", {
				className: "relative flex-1 min-h-0 bg-black",
				children: i
			}),
			a && /* @__PURE__ */ S("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: a
			}),
			O === "docked" && /* @__PURE__ */ S("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: ee,
				onPointerMove: z,
				onPointerUp: B,
				onPointerCancel: B,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ S("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ S("path", {
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
function Ze({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ S("button", {
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
function Qe() {
	return /* @__PURE__ */ S("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ S("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function $e() {
	return /* @__PURE__ */ S("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ S("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function et() {
	return /* @__PURE__ */ S("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ S("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function tt(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(X, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(X, Math.floor((window.innerHeight - t) / 2))
	};
}
function nt(e) {
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
			x: t - He - X,
			y: X
		};
		case "bottom-left": return {
			x: X,
			y: n - Ue - X
		};
		default: return {
			x: t - He - X,
			y: n - Ue - X
		};
	}
}
function rt(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Z(e, t, n) {
	return rt(e, X, Math.max(X, n - t - X));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function it({ show: e, label: t }) {
	return e ? /* @__PURE__ */ C("div", {
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
function at({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ S("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var ot = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
];
function st(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return ot[Math.abs(t) % ot.length];
}
function ct({ lines: t, maxLines: n = 3, fadeAfterMs: r = 8e3, now: i, className: a }) {
	let o = i ?? Date.now(), s = t.slice(-n).map((e) => {
		let t = o - new Date(e.at).getTime(), n = Math.max(.35, 1 - t / r);
		return {
			...e,
			opacity: n
		};
	}).filter((e) => e.opacity > 0);
	return s.length === 0 ? null : /* @__PURE__ */ S("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: s.map((t) => /* @__PURE__ */ C("div", {
			className: e("flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ S("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: st(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ S("span", {
				className: "text-white",
				children: t.text
			})]
		}, t.id))
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var lt = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, ut = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", dt = "bg-surface-hover text-neutral hover:bg-surface-emphasis", ft = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function Q({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? ut : a === "danger" ? ft : dt;
	return /* @__PURE__ */ S("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", lt[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
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
function pt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "11",
				rx: "3"
			}),
			/* @__PURE__ */ S("path", { d: "M5 11a7 7 0 0 0 14 0" }),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ S("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function mt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ S("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ S("path", { d: "M15 9.34V6a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ S("path", { d: "M17 16.95A7 7 0 0 1 5 11" }),
			/* @__PURE__ */ S("path", { d: "M19 11a7 7 0 0 1-.11 1.23" }),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "18",
				x2: "12",
				y2: "22"
			}),
			/* @__PURE__ */ S("line", {
				x1: "8",
				y1: "22",
				x2: "16",
				y2: "22"
			})
		]
	});
}
function ht({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [/* @__PURE__ */ S("path", { d: "M22 8l-6 4 6 4V8z" }), /* @__PURE__ */ S("rect", {
			x: "2",
			y: "6",
			width: "14",
			height: "12",
			rx: "2"
		})]
	});
}
function gt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ S("path", { d: "M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" }),
			/* @__PURE__ */ S("path", { d: "M22 8l-6 4 6 4V8z" })
		]
	});
}
function _t({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("rect", {
				x: "2",
				y: "4",
				width: "20",
				height: "12",
				rx: "2"
			}),
			/* @__PURE__ */ S("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			}),
			/* @__PURE__ */ S("polyline", { points: "9 10 12 7 15 10" }),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "7",
				x2: "12",
				y2: "13"
			})
		]
	});
}
function vt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("line", {
				x1: "3",
				y1: "3",
				x2: "21",
				y2: "21"
			}),
			/* @__PURE__ */ S("path", { d: "M22 14V6a2 2 0 0 0-2-2H6" }),
			/* @__PURE__ */ S("path", { d: "M2 6v8a2 2 0 0 0 2 2h12" }),
			/* @__PURE__ */ S("line", {
				x1: "8",
				y1: "20",
				x2: "16",
				y2: "20"
			}),
			/* @__PURE__ */ S("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "20"
			})
		]
	});
}
function yt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" }),
			/* @__PURE__ */ S("path", { d: "M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" }),
			/* @__PURE__ */ S("line", {
				x1: "22",
				y1: "2",
				x2: "2",
				y2: "22"
			})
		]
	});
}
function bt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
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
			/* @__PURE__ */ S("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ S("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ S("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ S("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	});
}
function xt({ size: e = 20, ...t }) {
	return /* @__PURE__ */ C("svg", {
		...$(e, t),
		children: [
			/* @__PURE__ */ S("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ S("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ S("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			})
		]
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function St(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function Ct(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
function wt({ channelName: t, localIdentity: r, previewStream: o, permission: s, permissionMessage: c, audioEnabled: u, videoEnabled: d, onToggleAudio: f, onToggleVideo: p, onRetryPermission: m, participants: g, readyState: _, readyLoading: v = !1, onJoin: b, onCancel: x, joinLabel: w, joinDisabled: T, subtitleOverride: E, className: D, "data-testid": O }) {
	let k = y(null);
	h(() => {
		k.current && o && (k.current.srcObject = o);
	}, [o]);
	let A = s === "granted", j = Ct(s), M = T ?? !A, N = w ?? (M && !A ? "Allow camera to join" : "Join now"), P = E ?? St(g, _, v);
	return /* @__PURE__ */ C("div", {
		"data-testid": O,
		className: e("flex flex-col h-full min-h-0 bg-surface-panel text-text-primary", D),
		children: [/* @__PURE__ */ C("header", {
			className: "flex items-center justify-between px-6 py-4 border-b border-border bg-white",
			children: [/* @__PURE__ */ C("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ S("h1", {
					className: "text-lg font-semibold truncate",
					children: t
				}), /* @__PURE__ */ S("p", {
					className: "text-xs text-neutral mt-0.5",
					children: P
				})]
			}), /* @__PURE__ */ S(n, {
				variant: "ghost",
				size: "sm",
				onClick: x,
				children: "Cancel"
			})]
		}), /* @__PURE__ */ C("main", {
			className: "flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full",
			children: [/* @__PURE__ */ C("section", {
				className: "lg:flex-1 min-h-0",
				children: [/* @__PURE__ */ C("div", {
					className: "relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black",
					children: [
						o && A && /* @__PURE__ */ S("video", {
							ref: k,
							autoPlay: !0,
							playsInline: !0,
							muted: !0,
							className: e("w-full h-full object-cover scale-x-[-1]", !d && "opacity-0")
						}),
						A && !d && (r ? /* @__PURE__ */ S("div", {
							"data-testid": "prejoin-identity-tile",
							className: "absolute inset-0 grid place-items-center bg-surface-inverse/95",
							children: /* @__PURE__ */ C("div", {
								className: "flex flex-col items-center gap-3 px-6 text-center",
								children: [/* @__PURE__ */ S(l, {
									name: r.displayName,
									src: r.avatarSrc,
									size: 96
								}), /* @__PURE__ */ C("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ S("span", {
										className: "text-white text-base font-medium truncate max-w-[16rem]",
										children: r.displayName
									}), /* @__PURE__ */ S("span", {
										className: "text-text-disabled text-xs",
										children: "Camera off"
									})]
								})]
							})
						}) : /* @__PURE__ */ S("div", {
							"data-testid": "prejoin-camera-off-fallback",
							className: "absolute inset-0 grid place-items-center text-text-disabled text-sm",
							children: "Camera off"
						})),
						s === "pending" && /* @__PURE__ */ S("div", {
							className: "absolute inset-0 grid place-items-center",
							children: /* @__PURE__ */ S(i, { size: "lg" })
						}),
						j && /* @__PURE__ */ S("div", {
							className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
							children: /* @__PURE__ */ S(a, {
								kind: "camera",
								state: j,
								message: c,
								onRetry: m,
								"data-testid": "prejoin-permission-card"
							})
						})
					]
				}), /* @__PURE__ */ C("div", {
					className: "mt-4 flex items-center justify-center gap-3",
					children: [/* @__PURE__ */ S(Q, {
						on: u,
						onClick: f,
						disabled: !A,
						"aria-label": u ? "Mute mic before joining" : "Unmute mic before joining",
						title: u ? "Mute mic before joining" : "Unmute mic before joining",
						iconOn: /* @__PURE__ */ S(pt, { size: 18 }),
						iconOff: /* @__PURE__ */ S(mt, { size: 18 }),
						"data-testid": "prejoin-toggle-audio"
					}), /* @__PURE__ */ S(Q, {
						on: d,
						onClick: p,
						disabled: !A,
						"aria-label": d ? "Turn camera off before joining" : "Turn camera on before joining",
						title: d ? "Turn camera off before joining" : "Turn camera on before joining",
						iconOn: /* @__PURE__ */ S(ht, { size: 18 }),
						iconOff: /* @__PURE__ */ S(gt, { size: 18 }),
						"data-testid": "prejoin-toggle-video"
					})]
				})]
			}), /* @__PURE__ */ C("section", {
				className: "lg:w-96 flex flex-col",
				children: [/* @__PURE__ */ C("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ S("h2", {
							className: "text-2xl font-semibold mb-2",
							children: "Ready to join?"
						}),
						/* @__PURE__ */ S("p", {
							className: "text-sm text-neutral mb-6",
							children: P
						}),
						/* @__PURE__ */ S(Tt, {
							participants: g,
							loading: v
						}),
						_ === "pending" && !v && /* @__PURE__ */ C("p", {
							className: "mt-4 text-xs text-warning-fg flex items-center gap-2",
							children: [/* @__PURE__ */ S("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
						})
					]
				}), /* @__PURE__ */ C("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ S(n, {
						variant: "primary",
						size: "lg",
						onClick: () => b({
							audio: u,
							video: d
						}),
						disabled: M,
						"data-testid": "prejoin-join-button",
						children: N
					}), /* @__PURE__ */ S("button", {
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
function Tt({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ C("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ S(i, { size: "sm" }), " Checking room…"]
	}) : !e || e.length === 0 ? null : /* @__PURE__ */ C("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ S("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ C("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ C("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ S(l, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ S("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ S(r, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ C("li", {
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
var Et = {
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
function Ot() {
	return /* @__PURE__ */ C("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ S("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ S("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function kt({ channelName: t, subtitle: n, recording: i, elapsedLabel: a, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ C("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white", c),
		children: [/* @__PURE__ */ C("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ S("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || i?.armed || a) && /* @__PURE__ */ C("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ S("span", { children: n }),
					i?.armed && /* @__PURE__ */ S(r, {
						tone: i.active ? "danger" : "neutral",
						size: "xs",
						uppercase: !0,
						dot: i.active ? "pulse" : "static",
						title: i.active ? "Recording — saved to /recordings when the call ends" : "Recording armed — will start when someone joins",
						"data-testid": "hangout-room-header-recording",
						children: "Rec"
					}),
					a && /* @__PURE__ */ S(r, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ S(Ot, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ S("span", {
							className: "tabular-nums",
							children: a
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ C("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ S(r, {
				tone: Et[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: Dt[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var At = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, jt = {
	sm: 16,
	md: 20,
	lg: 24
};
function Mt({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ C("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ S(Q, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ S(pt, { size: g }),
				iconOff: /* @__PURE__ */ S(mt, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ S(Q, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ S(ht, { size: g }),
				iconOff: /* @__PURE__ */ S(gt, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ S(Q, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ S(_t, { size: g }),
				iconOff: /* @__PURE__ */ S(vt, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ S("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", At[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ S(yt, { size: jt[p] })
			})
		]
	});
}
//#endregion
export { K as A, O as B, je as C, Se as D, Ee as E, I as F, R as I, F as L, ie as M, H as N, _e as O, te as P, P as R, Me as S, De as T, T as V, Xe as _, mt as a, Ie as b, _t as c, ht as d, gt as f, it as g, at as h, pt as i, ae as j, ge as k, vt as l, ct as m, kt as n, xt as o, Q as p, wt as r, yt as s, Mt as t, bt as u, Ve as v, Ae as w, Pe as x, ze as y, A as z };
