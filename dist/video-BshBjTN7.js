import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n, r } from "./useAudioRecorder-BhPxnLmg.js";
import { _ as i, t as a } from "./overlayStack-CHdlnODN.js";
import { t as o } from "./Chip-4IBrlduZ.js";
import { t as s } from "./IconButton-DDeXW3mZ.js";
import { M as c, f as l, n as u, p as d, q as f, tt as p, v as m } from "./Icons-BSEVGRI6.js";
import { t as h } from "./Badge-BGDepkwI.js";
import { t as g } from "./Banner-IBpLsSJQ.js";
import { t as _ } from "./Modal-DMFNRUDx.js";
import { t as v } from "./Input-DLknWXri.js";
import { i as y, n as b, r as x, t as S } from "./Drawer-vgGETlwD.js";
import { t as C } from "./Spinner-CLcq5z8N.js";
import { t as w } from "./FormField-E8Z0ppOp.js";
import { n as T, r as E, t as D } from "./focusTrap-C5l9cvTe.js";
import { t as O } from "./SkeletonCard-CGe8XFPB.js";
import { n as k, t as A } from "./Slider-izEq1bGO.js";
import { n as j } from "./Tabs-CWj6ZL7J.js";
import { t as M } from "./DockedPanelContext-pH9A5z1h.js";
import { t as N } from "./Textarea-Dz4doxTv.js";
import { n as P, t as F } from "./Avatar-DeJWic2B.js";
import { i as I, r as ee, t as L } from "./ChoiceList-DXzbK-3K.js";
import { t as te } from "./SegmentedControl-CKYHtOJ0.js";
import { t as R } from "./InlinePopover-DpXHdWeE.js";
import { t as z } from "./DropdownMenu-CHrQvZgc.js";
import { t as B } from "./Select-D3fGI8SO.js";
import { t as V } from "./Checkbox-Dftwml_V.js";
import { t as H } from "./Tooltip-af4BrR7T.js";
import { t as ne } from "./activationKey-CjbL3LUv.js";
import { a as U, b as W, c as re, d as ie, f as ae, h as oe, i as G, l as se, m as ce, n as le, o as ue, p as de, r as fe, s as pe, t as me, u as he, x as ge, y as _e } from "./MediaIcons-_ai5Til2.js";
import { A as ve, b as ye } from "./AudioVideoSettingsForm-RynnAku7.js";
import { useCallback as K, useEffect as q, useImperativeHandle as be, useLayoutEffect as xe, useMemo as Se, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var Ce = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function we({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = J(null), [m, h] = Y("idle"), g = c ?? m;
	q(() => {
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
	}, [d, f]), q(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let _ = g !== "playing", v = Ce[g];
	return /* @__PURE__ */ Q("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ Z("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), _ && v && /* @__PURE__ */ Q("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ Z(Te, {}), /* @__PURE__ */ Z("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: v
			})]
		})]
	});
}
function Te() {
	return /* @__PURE__ */ Q("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ Z("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ Z("path", {
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
function Ee(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function De({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: o = !0, muted: s = !1, hideDownload: c = !1, header: l, footer: u, className: d }) {
	let f = Se(() => n.filter((e) => !!e.url), [n]), [p, m] = Y(0), h = f[p], g = J(null), _ = J(null), v = a(!0);
	return q(() => {
		let e = (e) => {
			if (v()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				E(e, g.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, v]), q(() => (_.current = typeof document < "u" ? document.activeElement : null, D(g.current), () => {
		T(_.current), _.current = null;
	}), []), /* @__PURE__ */ Z("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ Q("div", {
			ref: g,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", d),
			children: [
				(r || i || l) && /* @__PURE__ */ Q("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ Q("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ Z("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ Z("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ Q("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [l, /* @__PURE__ */ Z("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				h ? /* @__PURE__ */ Z("video", {
					src: h.url,
					controls: !0,
					autoPlay: o,
					muted: s,
					className: "w-full max-h-[70vh] bg-black"
				}, h.url) : /* @__PURE__ */ Z("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				f.length > 1 && /* @__PURE__ */ Z("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: f.map((t, n) => {
						let r = n === p;
						return /* @__PURE__ */ Z("button", {
							type: "button",
							onClick: () => m(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : Ee(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(u || !c && h) && /* @__PURE__ */ Q("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ Z("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: u
					}), !c && h && /* @__PURE__ */ Z("a", {
						href: h.url,
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
function Oe(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function ke({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ Z("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", Oe(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ Z("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ Q("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ Z("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ Z("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var Ae = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, je = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, Me = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function Ne({ quality: t, className: n, style: r }) {
	let i = Ae[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ Q("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ Z("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ Z("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ Z("span", {
			className: je[t],
			children: Me[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function Pe({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ Z("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ Z(ve, {
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
var Fe = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function Ie(e) {
	return Fe[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function Le({ reactions: t, className: n, style: r }) {
	let [i, a] = Y([]);
	return q(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), q(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ Z("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ Z("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var Re = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function ze({ onReact: t, emojis: n = Re, className: r, style: i }) {
	return /* @__PURE__ */ Z("div", {
		"data-testid": "reaction-picker",
		className: e("flex gap-1 px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border", r),
		style: i,
		children: n.map((n) => {
			let r = Ie(n);
			return /* @__PURE__ */ Z("button", {
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
var Be = /* @__PURE__ */ Q("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ Z("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ Z("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ Z("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ Z("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function Ve({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, tone: o = "chrome", className: s }) {
	let [c, l] = Y(!1);
	return /* @__PURE__ */ Q("div", {
		className: e("relative inline-flex", s),
		children: [/* @__PURE__ */ Z("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": c,
			disabled: a,
			onClick: () => l((e) => !e),
			"data-testid": "reaction-picker-open",
			"data-tone": o,
			className: e(o === "surface" ? ["w-8 h-8 rounded-md flex items-center justify-center border border-solid border-border cursor-pointer transition-colors duration-150", c ? "bg-surface-inset text-text-primary" : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", c ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"], a && "opacity-40 cursor-not-allowed"),
			children: Be
		}), c && /* @__PURE__ */ Z(ze, {
			emojis: n,
			onReact: (e) => {
				t(e), r && l(!1);
			},
			className: e("absolute bottom-full mb-2 z-10 shadow-lg", i === "center" && "left-1/2 -translate-x-1/2", i === "left" && "left-0", i === "right" && "right-0")
		})]
	});
}
//#endregion
//#region src/components/video/PlaybackReactionsLayer.tsx
var He = 3, Ue = 1500, We = 200;
function Ge({ reactions: e, currentTimeMs: t, className: n }) {
	let r = Se(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = J(t), a = J([]), [o, s] = Y([]);
	return q(() => {
		let e = i.current;
		if (i.current = t, t < e - Ue) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > He ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), q(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, We);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ Z("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ Z(Le, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function Ke(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function qe(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var Je = {
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
function Xe({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ Q("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ Q("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ Z("span", { className: e("w-[7px] h-[7px] rounded-full", Je[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ Z("span", {
					className: e("font-semibold", Ye[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ Z("span", { children: Ke(n) }),
			i !== void 0 && /* @__PURE__ */ Z("span", { children: qe(i) }),
			r !== void 0 && /* @__PURE__ */ Q("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ Q("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ Z("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ Z("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function Ze(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function Qe(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function $e({ participant: e, size: t = 32 }) {
	let n = Qe(e.displayName);
	return /* @__PURE__ */ Q("div", {
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
			e.avatarUrl ? /* @__PURE__ */ Z("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : Ze(e.displayName),
			e.isSpeaking && /* @__PURE__ */ Z("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ Z("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ Q("svg", {
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
						/* @__PURE__ */ Z("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ Z("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ Z("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function et({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ Q("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ Z($e, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ Q("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ Z($e, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var tt = {
	mic: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ Z("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ Z("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ Z("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ Z("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ Z("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ Z("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ Z("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ Z("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ Z("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ Z("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ Z("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ Z("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ Z("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ Z("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Z("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ Z("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ Z("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ Z("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ Z("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	}),
	more: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			})
		]
	})
};
function nt({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s, expanded: c, buttonRef: l }) {
	return /* @__PURE__ */ Z("button", {
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
function rt({ controls: t }) {
	let [n, r] = Y(!1), i = J(null), a = J(null);
	return q(() => {
		if (!n) return;
		let e = (e) => {
			i.current?.contains(e.target) || r(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [n]), /* @__PURE__ */ Q("div", {
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
		children: [/* @__PURE__ */ Z(nt, {
			icon: tt.more,
			label: "More call controls",
			active: n,
			expanded: n,
			buttonRef: a,
			onClick: () => r((e) => !e),
			testId: "call-controls-more-button"
		}), n && /* @__PURE__ */ Z("div", {
			role: "menu",
			"aria-label": "More call controls",
			"data-testid": "call-controls-overflow",
			className: "absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg",
			children: t.map((t) => /* @__PURE__ */ Q("button", {
				type: "button",
				role: "menuitem",
				"data-testid": t.testId,
				"aria-label": t.label,
				onClick: () => {
					t.onClick(), r(!1);
				},
				className: e("flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors", t.active ? "bg-white/15 text-white" : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"),
				children: [/* @__PURE__ */ Z("span", {
					className: "shrink-0",
					"aria-hidden": "true",
					children: t.icon
				}), t.label]
			}, t.key))
		})]
	});
}
var it = /* @__PURE__ */ new Set(["mute", "camera"]);
function at({ mode: t, density: n = "full", isMuted: r = !1, isCameraOn: i = !0, isScreenSharing: a = !1, onToggleMute: o, onToggleCamera: s, onToggleScreenShare: c, onUpgradeToVideo: l, onEndCall: u, onAddParticipant: d, availableParticipants: f, currentParticipantIds: p, onOpenAddParticipant: m, extras: h, className: g }) {
	let [_, v] = Y(!1), y = new Set(p ?? []), b = (f ?? []).filter((e) => !y.has(e.id)), x = [];
	o && x.push({
		key: "mute",
		icon: r ? tt.micOff : tt.mic,
		label: r ? "Unmute" : "Mute",
		active: r,
		onClick: o,
		testId: "mute-button"
	}), t === "video" && s && x.push({
		key: "camera",
		icon: i ? tt.camera : tt.cameraOff,
		label: i ? "Turn off camera" : "Turn on camera",
		active: !i,
		onClick: s,
		testId: "camera-button"
	}), t === "audio" && l && x.push({
		key: "upgrade",
		icon: tt.videoUpgrade,
		label: "Switch to video",
		onClick: l,
		testId: "upgrade-to-video-button"
	}), c && x.push({
		key: "screenshare",
		icon: tt.screenShare,
		label: a ? "Stop sharing" : "Share screen",
		active: a,
		onClick: c,
		testId: "screenshare-button"
	}), (d || m) && x.push({
		key: "add-participant",
		icon: tt.userPlus,
		label: "Add people to this call",
		active: _,
		onClick: m ?? (() => v((e) => !e)),
		testId: "add-participant-button"
	});
	let S = n === "compact", C = S ? x.filter((e) => it.has(e.key)) : x, w = S ? x.filter((e) => !it.has(e.key)) : [];
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col", g),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				C.map((e) => /* @__PURE__ */ Z(nt, {
					icon: e.icon,
					label: e.label,
					active: e.active,
					onClick: e.onClick,
					testId: e.testId
				}, e.key)),
				w.length > 0 && /* @__PURE__ */ Z(rt, { controls: w }),
				h,
				u && /* @__PURE__ */ Z(nt, {
					icon: tt.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: u,
					testId: "hangup-button"
				})
			]
		}), _ && d && !m && /* @__PURE__ */ Q("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => v(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), b.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ Z("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: b.map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						d(e.id), b.length <= 1 && v(!1);
					},
					children: [
						/* @__PURE__ */ Z($e, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ Z("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ Z("span", {
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
function ot(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var st = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function ct(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function lt({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return ot(t) ? /* @__PURE__ */ Q("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", st[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ Z(Ne, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ Q("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ Q("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), ct(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ Q("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ Z("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ Q("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ Z("span", {
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
//#region src/components/video/CallSidePanel.tsx
var ut = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, dt = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function ft(e) {
	return e.toggleTestId ?? ut[e.id] ?? `call-side-panel-open-${e.id}`;
}
function pt(e) {
	return e.panelTestId ?? dt[e.id] ?? `call-side-panel-body-${e.id}`;
}
function mt(e) {
	return e === "mini" ? "overlay" : "docked";
}
function ht(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ Z(le, { size: 16 });
		case "people": return /* @__PURE__ */ Z(_e, { size: 16 });
		case "captions": return /* @__PURE__ */ Z(me, { size: 16 });
		case "devices": return /* @__PURE__ */ Z(oe, { size: 16 });
		default: return null;
	}
}
function gt({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, tone: a = "chrome", className: o, "data-testid": s = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ Z("div", {
		"data-testid": s,
		className: e("flex items-center", a === "surface" ? "gap-2" : "gap-1", o),
		"data-tone": a,
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let o = t.id === n, s = i || t.disabled === !0;
			return /* @__PURE__ */ Q("button", {
				type: "button",
				"aria-label": t.label,
				"aria-pressed": o,
				title: t.label,
				disabled: s,
				"data-testid": ft(t),
				"data-active": o ? "true" : "false",
				onClick: () => r?.(o ? null : t.id),
				className: e(a === "surface" ? ["relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid transition-colors duration-150", o ? "border-border bg-surface-inset text-text-primary" : "border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", o ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"], s ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? ht(t.id) ?? /* @__PURE__ */ Z("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ Z("span", {
					"data-testid": `${ft(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var _t = "__legacy__";
function vt({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = f ? t : [{
		id: _t,
		label: s ?? "",
		content: c
	}], m = f ? n ?? null : a ? _t : null, h = p.find((e) => e.id === m) ?? null;
	if (!h) return null;
	let g = mt(i), _ = f && p.length > 1;
	return /* @__PURE__ */ Q("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": g,
		"data-call-side-panel-tab": f ? h.id : void 0,
		"aria-label": h.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", g === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ Q("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [_ ? /* @__PURE__ */ Z("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: p.map((t) => {
					let n = t.id === h.id;
					return /* @__PURE__ */ Z("button", {
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
			}) : /* @__PURE__ */ Z("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: h.label
			}), /* @__PURE__ */ Z("button", {
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ Z("div", {
			role: _ ? "tabpanel" : void 0,
			"data-testid": f ? pt(h) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ Z(M, {
				hasHeader: !0,
				fillsHeight: !0,
				children: h.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function yt(e) {
	return e === "docked" ? "window" : e;
}
function bt(e) {
	return e === "window" ? "docked" : e;
}
function xt(e) {
	return e ? "mini" : "window";
}
var St = /* @__PURE__ */ new Set();
function Ct(e, t) {
	process.env.NODE_ENV !== "production" && (St.has(e) || (St.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var wt = "w-[380px]", Tt = "w-[480px]", Et = "h-[480px]", Dt = "application/x-call-dock";
function Ot(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function kt({ stream: t, muted: n = !1, className: r }) {
	let i = J(null);
	return q(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ Z("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var At = {
	phoneEnd: /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Z("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ Z("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ Q("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Z("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ Z("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ Z("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ Z("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ Q("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ Z("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	}),
	grip: /* @__PURE__ */ Q("svg", {
		width: "10",
		height: "12",
		viewBox: "0 0 10 16",
		fill: "currentColor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ Z("circle", {
				cx: "3",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "7",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "3",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "7",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "3",
				cy: "13",
				r: "1.3"
			}),
			/* @__PURE__ */ Z("circle", {
				cx: "7",
				cy: "13",
				r: "1.3"
			})
		]
	}),
	dockTo: /* @__PURE__ */ Q("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Z("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "16",
			rx: "2"
		}), /* @__PURE__ */ Z("line", {
			x1: "15",
			y1: "4",
			x2: "15",
			y2: "20"
		})]
	})
};
function jt({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ Z("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ Z("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ Q("div", {
				className: "text-center",
				children: [/* @__PURE__ */ Z("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ Z("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: At.phoneEnd
				}), t && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: At.phoneAnswer
				})]
			})
		]
	});
}
function Mt({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, onAddParticipant: p, availableParticipants: m, onOpenAddParticipant: h, controlsExtras: g, onEndCall: _, layoutComponent: v, callStats: y }) {
	let b = t === "video" && s;
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			v && /* @__PURE__ */ Q("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [v, /* @__PURE__ */ Z(lt, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			!v && t === "video" && /* @__PURE__ */ Q("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && b ? /* @__PURE__ */ Z(kt, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ Z("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ Z($e, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ Q("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ Z(kt, { stream: r[0].videoStream }) : /* @__PURE__ */ Z("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ Z($e, {
								participant: r[0],
								size: 28
							})
						}), r[0].isMuted && /* @__PURE__ */ Z("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ Q("svg", {
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
									/* @__PURE__ */ Z("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ Z("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ Z("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ Z(lt, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			!v && t === "audio" && /* @__PURE__ */ Z("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ Z(et, {
					participants: r,
					localFallback: i,
					maxVisible: 4,
					avatarSize: 36
				})
			}),
			/* @__PURE__ */ Q("div", {
				className: "text-center py-1.5 shrink-0",
				children: [a !== void 0 && /* @__PURE__ */ Z("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": a,
					children: Ot(a)
				}), /* @__PURE__ */ Q("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ Z(at, {
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
function Nt({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ Q("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? ne(c) : void 0,
		children: [
			/* @__PURE__ */ Z("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ Z("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ Z("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ Q("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ Z("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ot(r)
						})
					]
				})
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ Z("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ Q(X, { children: [
							/* @__PURE__ */ Z("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ Z("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ Z("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ Z("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ Z("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ Q("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ Z("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Z("line", {
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
function Pt(e) {
	let t = null;
	for (let n of document.querySelectorAll("[data-call-dock-target]")) {
		let r = n.dataset.callDockTarget;
		if (!r) continue;
		let i = n.getBoundingClientRect(), a = Math.min(e.right, i.right) - Math.max(e.left, i.left), o = Math.min(e.bottom, i.bottom) - Math.max(e.top, i.top);
		if (a <= 0 || o <= 0) continue;
		let s = a * o;
		s < i.width * i.height * .25 || (!t || s > t.area) && (t = {
			id: r,
			el: n,
			area: s
		});
	}
	return t ? {
		id: t.id,
		el: t.el
	} : null;
}
function Ft(e, t, n) {
	let [r, i] = Y({
		x: 0,
		y: 0
	}), [a, o] = Y(!1), [s, c] = Y(!1), l = J(null), u = K(() => {
		l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 200);
	}, []);
	q(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let d = J(!1), f = J({
		x: 0,
		y: 0
	}), p = J({
		x: 0,
		y: 0
	}), m = J(null), h = J(null), g = J(null), _ = K((t) => {
		e && (h.current = m.current?.getBoundingClientRect() ?? null, g.current = h.current, d.current = !0, o(!0), c(!1), f.current = {
			x: t.clientX,
			y: t.clientY
		}, p.current = { ...r }, t.preventDefault());
	}, [e, r]), v = K(() => {
		c(!0), i({
			x: 0,
			y: 0
		}), u();
	}, [u]), y = K((e) => {
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
	}, [r, u]), b = J(v);
	b.current = v;
	let x = J(t);
	x.current = t;
	let S = J(n);
	S.current = n;
	let C = J(null);
	return q(() => {
		if (!e) return;
		let t = (e) => {
			if (!d.current) return;
			i({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
			let t = h.current;
			t && (g.current = new DOMRect(t.left + e.clientX - f.current.x, t.top + e.clientY - f.current.y, t.width, t.height));
			let n = (g.current ? Pt(g.current) : null)?.id ?? null;
			n !== C.current && (C.current = n, x.current?.(n));
		}, n = () => {
			if (!d.current) return;
			d.current = !1, o(!1);
			let e = m.current;
			if (!e) return;
			let t = g.current ?? e.getBoundingClientRect(), n = Pt(t);
			if (C.current !== null && (C.current = null, x.current?.(null)), n && S.current?.(n.id)) {
				b.current();
				return;
			}
			let r = e.offsetParent, a = window.innerWidth, s = window.innerHeight;
			if (r) {
				let e = r.getBoundingClientRect();
				a = e.width, s = e.height;
			}
			let l = r ? r.getBoundingClientRect() : {
				left: 0,
				top: 0
			}, f = t.left - l.left, _ = t.top - l.top, v = a - (f + t.width), y = s - (_ + t.height), w = f < 80, T = v < 80, E = _ < 80;
			if ((E || y < 80) && (w || T) && h.current) {
				let e = h.current, n = e.left - l.left - p.current.x, r = e.top - l.top - p.current.y;
				i({
					x: (w ? 16 : a - t.width - 16) - n,
					y: (E ? 16 : s - t.height - 16) - r
				}), c(!0), u();
			}
		};
		return document.addEventListener("mousemove", t), document.addEventListener("mouseup", n), () => {
			document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", n);
		};
	}, [e, u]), {
		offset: r,
		handleMouseDown: _,
		resetOffset: v,
		snapToCorner: y,
		isDragging: a,
		isAnimating: s,
		hasMoved: r.x !== 0 || r.y !== 0,
		widgetRef: m
	};
}
function It({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ Z("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ Z("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ Z("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ Z("rect", {
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
function Lt({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: b, onMinimize: x, onExpand: S, layoutComponent: C, callStats: w, displayMode: T, minimized: E, sidePanelTabs: D, activeSidePanelTab: O = null, onSidePanelTabChange: k, sidePanelWidthClassName: A = "w-80", dockTargets: j, activeDockId: M = null, onDockTo: N, onDragStateChange: P, position: F = "bottom-right", contained: I = !1, draggable: ee = !0, className: L, style: te, dataAttrs: R }) {
	T !== void 0 && E !== void 0 && Ct("CallWidget", "minimized");
	let z = T ?? xt(E ?? !1), B = z === "mini", V = D ?? [], H = V.length > 0 && !B && t === "active", ne = H && V.some((e) => e.id === O), U = (j ?? []).length > 0, W = U && M != null, re = ee && !W, ie = R?.["data-call-id"], ae = ie == null || ie === "" ? void 0 : String(ie), oe = K((e) => {
		let t = e.dataTransfer;
		if (!t) return;
		let n = {
			callId: ae,
			fromDockId: M ?? null
		};
		t.setData(Dt, JSON.stringify(n)), t.effectAllowed = "move";
	}, [ae, M]), { offset: G, handleMouseDown: se, resetOffset: ce, snapToCorner: le, isDragging: ue, isAnimating: de, hasMoved: fe, widgetRef: pe } = Ft(re, K((e) => {
		for (let t of document.querySelectorAll("[data-call-dock-target]")) e && t.dataset.callDockTarget === e ? t.dataset.pointerOver = "true" : delete t.dataset.pointerOver;
	}, []), K((e) => N ? (N(e), !0) : !1, [N])), me = J(P);
	me.current = P, q(() => {
		me.current?.(ue);
	}, [ue]);
	let he = {};
	if (R) for (let [e, t] of Object.entries(R)) t != null && t !== "" && (he[e] = t);
	let ge = Se(() => {
		switch (F) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [F]);
	if (t === "idle" || t === "ended") return null;
	let _e = /* @__PURE__ */ Q(X, { children: [
		t === "ringing" && /* @__PURE__ */ Z(jt, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ Q("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ Z("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ Z("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ Z(Mt, {
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
			controlsExtras: H ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(gt, {
				tabs: V,
				activeTab: O,
				onTabChange: k
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: C,
			callStats: w
		})
	] });
	return /* @__PURE__ */ Q(X, { children: [ue && /* @__PURE__ */ Z(It, {
		onSnap: le,
		contained: I
	}), /* @__PURE__ */ Z("div", {
		ref: pe,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": z,
		"data-call-widget-mode-legacy": bt(z),
		"data-call-dock-id": W ? M : void 0,
		className: e(W ? "relative" : [I ? "absolute z-50" : "fixed z-[10001]", ge], L),
		style: {
			transform: W ? void 0 : `translate(${G.x}px, ${G.y}px)`,
			transition: de ? "transform 0.2s ease-out" : void 0,
			...te
		},
		...he,
		children: /* @__PURE__ */ Q("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", B ? "w-[260px]" : ne ? "w-auto" : wt),
			"data-call-side-panel-open": ne ? "true" : "false",
			children: [
				!B && /* @__PURE__ */ Q("div", {
					className: e("relative flex items-center justify-between px-3 py-2 border-b border-white/5", re && "cursor-grab active:cursor-grabbing"),
					onMouseDown: se,
					draggable: W || void 0,
					onDragStart: U ? oe : void 0,
					"data-call-dock-source": U ? "true" : void 0,
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2",
						children: [
							U && /* @__PURE__ */ Z("span", {
								draggable: W || void 0,
								className: "flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors",
								title: "Drag the call into the page",
								"data-testid": "call-dock-drag-handle",
								"aria-hidden": !0,
								children: At.grip
							}),
							/* @__PURE__ */ Z("span", { className: "w-2 h-2 rounded-full bg-success" }),
							/* @__PURE__ */ Z("span", {
								className: "text-white/80 text-xs font-medium",
								"data-testid": "call-widget-title",
								children: n === "video" ? "Video Call" : "Audio Call"
							})
						]
					}), /* @__PURE__ */ Q("div", {
						className: "flex items-center gap-1",
						children: [
							fe && /* @__PURE__ */ Z("button", {
								type: "button",
								onClick: ce,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: At.snapBack
							}),
							S && /* @__PURE__ */ Z("button", {
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ Z("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ Z("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							x && /* @__PURE__ */ Z("button", {
								type: "button",
								onClick: x,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: At.minimize
							})
						]
					})]
				}),
				B && /* @__PURE__ */ Z("div", {
					className: e(re && "cursor-grab active:cursor-grabbing"),
					onMouseDown: se,
					children: /* @__PURE__ */ Z(Nt, {
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
				!B && (ne ? /* @__PURE__ */ Q("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ Z("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: _e
					}), /* @__PURE__ */ Z(vt, {
						mode: z,
						tabs: V,
						activeTab: O,
						onTabChange: k,
						widthClassName: A
					})]
				}) : _e)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function Rt({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: f = 84, tileTestIdPrefix: p = "call-tile", className: m, style: h, "data-testid": g = "call-tile-row" }) {
	if (c === "dock") {
		let a = n ? [n, ...t] : t, c = u === "collapse" && a.length > d ? a.slice(0, Math.max(1, d - 1)) : a, _ = a.length - c.length;
		return /* @__PURE__ */ Q("div", {
			className: e("flex min-w-0 items-center gap-2", u === "scroll" ? "overflow-x-auto" : "overflow-hidden", m),
			style: h,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": g,
			"data-variant": "dock",
			"data-tile-count": a.length,
			children: [c.map((e) => /* @__PURE__ */ Z(zt, {
				participant: e,
				width: i,
				height: f,
				speaking: e.id === r,
				highlighted: e.id === l,
				testId: `${p}-${e.id}`,
				...s ? { onClick: () => s(e.id) } : {}
			}, e.id)), _ > 0 && /* @__PURE__ */ Z("div", {
				className: "flex shrink-0 items-center justify-center rounded-md bg-video-tile text-white",
				style: {
					width: i,
					height: f
				},
				"data-testid": `${p}-overflow`,
				"aria-label": `${_} more`,
				role: "img",
				children: /* @__PURE__ */ Z(F, {
					name: `+ ${_}`,
					initials: `+${_}`,
					size: 40,
					color: "rgba(255,255,255,0.18)",
					showTitle: !1
				})
			})]
		});
	}
	let _ = n ? [...t, n] : t, v = _.map((t) => /* @__PURE__ */ Z(ve, {
		id: t.id,
		displayName: t.displayName,
		...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
		isMuted: t.isMuted,
		isLocal: t.isLocal,
		isSpeaking: t.id === r,
		videoElement: t.videoElement,
		...s ? { onClick: () => s(t.id) } : {},
		className: e("shrink-0", c === "floating" && "rounded-xl shadow-lg ring-1 ring-black/10", t.id === l && "ring-2 ring-primary"),
		style: { width: i }
	}, t.id)), y = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ Q("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", m),
		style: h,
		role: "group",
		"aria-label": y,
		"data-testid": g,
		"data-variant": "floating",
		"data-tile-count": _.length,
		children: [/* @__PURE__ */ Z("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${g}-tiles`,
			children: _.map((t) => t.videoElement ? /* @__PURE__ */ Z(ve, {
				id: t.id,
				displayName: t.displayName,
				...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
				isMuted: t.isMuted,
				isLocal: t.isLocal,
				isSpeaking: t.id === r,
				videoElement: t.videoElement,
				...s ? { onClick: () => s(t.id) } : {},
				className: e("shrink-0 rounded-xl !border-0 shadow-lg ring-2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&>*:first-child]:h-full [&>*:first-child]:w-full", t.id === l ? "ring-primary" : t.id === r ? "ring-success" : "ring-white/80"),
				style: { width: i }
			}, t.id) : /* @__PURE__ */ Z(Bt, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ Z("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${g}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ Q("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", m),
		style: h,
		role: "group",
		"aria-label": y,
		"data-testid": g,
		"data-variant": "bar",
		"data-tile-count": _.length,
		children: [
			o && /* @__PURE__ */ Z("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${g}-title`,
				children: o
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${g}-tiles`,
				children: v
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${g}-controls`,
				children: a
			})
		]
	});
}
function zt({ participant: t, width: n, height: r, speaking: i, highlighted: a, testId: o, onClick: s }) {
	let c = t.isLocal ? "You" : t.displayName, l = `${t.isLocal ? "You" : t.displayName}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
	return /* @__PURE__ */ Q("div", {
		className: e("relative shrink-0 overflow-hidden rounded-md text-white", t.videoElement && !t.cameraOff ? "bg-video-tile" : "bg-video-tile-off", "[&_video]:h-full [&_video]:w-full [&_video]:object-cover", s && "cursor-pointer"),
		style: {
			width: n,
			height: r
		},
		title: l,
		"aria-label": l,
		role: s ? "button" : "img",
		tabIndex: s ? 0 : void 0,
		onClick: s,
		onKeyDown: s ? (e) => {
			(e.key === "Enter" || e.key === " ") && s();
		} : void 0,
		"data-testid": o,
		"data-peer-id": t.id,
		"data-is-local": t.isLocal ? "true" : "false",
		"data-is-muted": t.isMuted ? "true" : "false",
		"data-highlighted": a ? "true" : "false",
		"data-speaking": i ? "true" : "false",
		"data-track-kind": t.videoElement && !t.cameraOff ? "camera" : "avatar",
		children: [
			t.videoElement && t.cameraOff && /* @__PURE__ */ Z("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${o}-media-sink`,
				children: t.videoElement
			}),
			t.audioElement != null && /* @__PURE__ */ Z("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${o}-audio-sink`,
				children: t.audioElement
			}),
			t.videoElement && !t.cameraOff ? t.videoElement : /* @__PURE__ */ Z("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ Z(F, {
					name: t.displayName,
					size: Math.round(Math.min(40, r * .48)),
					...t.avatarUrl ? { src: t.avatarUrl } : {},
					color: "rgba(71,80,92,0.28)",
					showTitle: !1
				})
			}),
			t.reconnecting && /* @__PURE__ */ Z("div", {
				className: "absolute inset-0 bg-surface-inverse/40",
				"data-testid": `${o}-reconnecting`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Q("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-xs",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1 truncate font-medium",
						children: c
					}),
					t.screenSharing && /* @__PURE__ */ Z(de, {
						size: 13,
						className: "shrink-0"
					}),
					t.isMuted ? /* @__PURE__ */ Z(U, {
						size: 14,
						className: "shrink-0"
					}) : /* @__PURE__ */ Z(G, {
						size: 14,
						className: "shrink-0"
					})
				]
			}),
			(a || i) && /* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				"data-testid": `${o}-ring`,
				"data-ring": a ? "highlighted" : "speaking",
				className: e("pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset", a ? "ring-primary" : "ring-success")
			}),
			i && a && /* @__PURE__ */ Z("span", {
				className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-success",
				"aria-hidden": "true"
			})
		]
	});
}
function Bt({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ Q("div", {
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
		children: [/* @__PURE__ */ Z(F, {
			name: t.displayName,
			size: 44,
			...t.avatarUrl ? { src: t.avatarUrl } : {}
		}), t.isMuted && /* @__PURE__ */ Z("span", {
			className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
			"aria-hidden": "true",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function Vt({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", media: o, onJoin: s, onDismiss: c, autoExpireSec: l = 30, className: u, style: d }) {
	let [f, p] = Y(!0), m = t(c);
	if (q(() => {
		if (!l || l <= 0) return;
		let e = setTimeout(() => {
			p(!1), m();
		}, l * 1e3);
		return () => clearTimeout(e);
	}, [l, m]), !f) return null;
	let h = [o === "audio" ? "Audio call" : o === "video" ? "Video call" : null, i].filter(Boolean).join(" · ");
	return /* @__PURE__ */ Q("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-call-media": o,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", u),
		style: d,
		children: [
			/* @__PURE__ */ Z(Ht, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ Z("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), h && /* @__PURE__ */ Z("p", {
					className: "text-xs text-white/60 m-0 truncate",
					"data-testid": "incoming-call-subtitle",
					children: h
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => {
						p(!1), c();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), s && /* @__PURE__ */ Z("button", {
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
function Ht({ name: e, avatarUrl: t }) {
	let n = Wt(e);
	return /* @__PURE__ */ Q("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ Z("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : Ut(e), /* @__PURE__ */ Z("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function Ut(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function Wt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function Gt(e) {
	let t = e.split("#")[0].split("?")[0].toLowerCase();
	return t.endsWith(".m3u8") ? "hls" : /\.(mp4|m4v|mov|webm|ogv|ogg|m4a|mp3|wav|aac)$/.test(t) ? "progressive" : "unknown";
}
function Kt(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function qt({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = J(null), d = J(null), f = J(s);
	f.current = s;
	let [p, m] = Y(!1), [h, g] = Y(0), [_, v] = Y(0), [y, b] = Y(1), [x, S] = Y(1), [C, w] = Y(!1), [T, E] = Y(null);
	q(() => {
		let e = u.current;
		if (!e || !t) return;
		if (E(null), w(!0), Gt(t) === "progressive" || e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
					E("HLS playback is not supported in this browser."), w(!1);
					return;
				}
				let i = new r({ enableWorker: !0 });
				d.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (E(`HLS error: ${t.type}`), f.current?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				E(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
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
	let D = () => {
		let e = u.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, O = (e) => {
		let t = u.current;
		!t || !isFinite(_) || _ <= 0 || (t.currentTime = Number(e.target.value));
	}, k = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, b(n);
	}, A = (e) => {
		let t = u.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, S(n);
	}, j = () => {
		let e = u.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, M = Se(() => _ > 0 ? Math.min(100, h / _ * 100) : 0, [h, _]);
	return /* @__PURE__ */ Q("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ Z("video", {
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
					v(t.duration), w(!1), a?.(t.duration);
				},
				onTimeUpdate: (e) => {
					let t = e.currentTarget;
					g(t.currentTime), o?.(t.currentTime, t.duration);
				},
				onWaiting: () => w(!0),
				onCanPlay: () => w(!1),
				onError: () => {
					E("Playback error."), s?.(/* @__PURE__ */ Error("video element error")), w(!1);
				}
			}),
			C && !T && /* @__PURE__ */ Z("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			T && /* @__PURE__ */ Z("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: T
			}),
			/* @__PURE__ */ Q("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ Z("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: Kt(h)
						}),
						/* @__PURE__ */ Z("input", {
							type: "range",
							min: 0,
							max: isFinite(_) ? _ : 0,
							step: .1,
							value: h,
							onChange: O,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${M}%` }
						}),
						/* @__PURE__ */ Z("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: Kt(_)
						})
					]
				}), /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ Z("button", {
							type: "button",
							onClick: D,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ Q("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ Z("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ Z("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ Z("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ Z("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ Q("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ Z("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ Z("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: y,
								onChange: k,
								className: "w-20 h-1 accent-white/90 cursor-pointer",
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ Z(B, {
							size: "sm",
							value: String(x),
							onChange: A,
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
						/* @__PURE__ */ Z("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ Z("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							onClick: j,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ Z("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ Z("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function Jt(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function Yt(e) {
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
function Xt({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ Q("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ Z("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ Z("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function Zt({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ Q("div", {
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
			/* @__PURE__ */ Q("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ Z("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ Z("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ Z("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ Z("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ Z(Xt, { status: s }),
					/* @__PURE__ */ Z("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: Jt(r)
					})
				]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? Yt(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ Q("span", {
					className: "inline-flex shrink-0 items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)]",
					title: `${i} ${i === 1 ? "person" : "people"} in this call`,
					children: [i, /* @__PURE__ */ Z(_e, { size: 12 })]
				})]
			}),
			o && /* @__PURE__ */ Z("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: Yt(n)
			}),
			u && /* @__PURE__ */ Z("div", {
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
function Qt({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ Z("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ Q("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ Z("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ Z("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ Z("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ Z("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ Z(Zt, {
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
var $t = 864e5, en = [
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
function tn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function nn(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
function rn(e, t, n = Date.now()) {
	if (e === "never") return null;
	let r = en.find((t) => t.id === e);
	if (r?.days) return new Date(n + r.days * $t).toISOString();
	if (e === "custom") {
		if (!t) return;
		let e = /* @__PURE__ */ new Date(`${t}T23:59:59`);
		return Number.isNaN(e.getTime()) ? void 0 : e.toISOString();
	}
}
function an({ open: e, expiresAt: t, onSave: n, onClose: r, title: a = "Recording expiry", "data-testid": o = "recording-expiry-dialog" }) {
	let [s, c] = Y(t === null ? "never" : "custom"), [l, u] = Y(t ? nn(Date.parse(t)) : ""), [d, f] = Y(!1), [p, m] = Y(null);
	q(() => {
		e && (c(t === null ? "never" : "custom"), u(t ? nn(Date.parse(t)) : ""), m(null), f(!1));
	}, [e, t]);
	let h = Se(() => rn(s, l), [s, l]), g = typeof h == "string" && Date.parse(h) < Date.now() + 36e5, v = h !== void 0 && !g && !d, y = t === null ? "This recording does not expire." : t ? `Set to expire ${tn(t)}.` : "No expiry is recorded.", b = async () => {
		if (h !== void 0) {
			f(!0), m(null);
			try {
				await n(h), r();
			} catch (e) {
				m(e instanceof Error ? e.message : String(e)), f(!1);
			}
		}
	};
	return /* @__PURE__ */ Z(_, {
		open: e,
		onClose: r,
		title: a,
		maxWidth: 440,
		footer: /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(i, {
			variant: "secondary",
			size: "sm",
			onClick: r,
			disabled: d,
			"data-testid": `${o}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ Z(i, {
			variant: "primary",
			size: "sm",
			onClick: () => void b(),
			disabled: !v,
			"data-testid": `${o}-save`,
			children: d ? "Saving…" : "Save"
		})] }),
		children: /* @__PURE__ */ Q("div", {
			className: "flex min-h-[19rem] flex-col gap-3 text-sm",
			"data-testid": o,
			children: [
				/* @__PURE__ */ Z("p", {
					className: "m-0 text-text-secondary",
					"data-testid": `${o}-current`,
					children: y
				}),
				/* @__PURE__ */ Z(L, {
					"data-testid": `${o}-choices`,
					children: en.map((e) => /* @__PURE__ */ Z(ee, {
						title: e.title,
						selected: s === e.id,
						onSelect: () => c(e.id),
						disabled: d,
						"data-testid": `${o}-choice-${e.id}`
					}, e.id))
				}),
				s === "custom" && /* @__PURE__ */ Z(w, {
					label: "Expires on",
					hint: "At the end of that day, your local time.",
					...g ? { error: "Pick a date at least an hour from now." } : {},
					children: (e) => /* @__PURE__ */ Z("input", {
						...e,
						type: "date",
						value: l,
						min: nn(Date.now()),
						onChange: (e) => u(e.target.value),
						className: "rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary",
						"data-testid": `${o}-date`
					})
				}),
				p && /* @__PURE__ */ Z("p", {
					className: "m-0 text-xs text-danger-fg",
					role: "alert",
					"data-testid": `${o}-error`,
					children: p
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/TranscriptPanel.tsx
function on(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function sn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function cn(e) {
	let t = e.speakerId || e.speakerLabel;
	return t ? `hsl(${sn(t)}, 65%, 60%)` : null;
}
var ln = "Speaker";
function un({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, errorDetail: s, pendingMessage: c, idleState: l, className: u }) {
	let d = J(null), f = Se(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return q(() => {
		if (f < 0 || !d.current) return;
		let e = d.current.querySelector(`[data-seg-index="${f}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [f]), t === "idle" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: l ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Q("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ Z("span", { children: a }),
				/* @__PURE__ */ Z("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Z("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-secondary",
			children: c ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", u),
		children: [
			/* @__PURE__ */ Q("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [a, " — failed"]
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-sm text-text-secondary",
				children: o ?? "Transcript generation failed. Reach out to support if this persists."
			}),
			/* @__PURE__ */ Z(y, {
				text: s,
				className: "mt-2"
			})
		]
	}) : !n || n.length === 0 ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", u),
		children: [/* @__PURE__ */ Q("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ Q("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ Z("div", {
			ref: d,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === f, a = cn(t), o = !!i;
				return /* @__PURE__ */ Q("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? ne(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${on(t.startMs)} — ${t.speakerLabel ?? ln}` : void 0,
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ Z("span", {
							className: e("text-xs font-semibold", !a && "text-text-secondary"),
							...a ? { style: { color: a } } : {},
							children: t.speakerLabel ?? ln
						}), /* @__PURE__ */ Z("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: on(t.startMs)
						})]
					}), /* @__PURE__ */ Z("p", {
						className: "text-sm text-text-primary leading-relaxed",
						children: t.text
					})]
				}, `${t.startMs}-${t.speakerId ?? ""}-${n}`);
			})
		})]
	});
}
//#endregion
//#region src/components/video/SummaryPanel.tsx
function dn({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, errorDetail: o, pendingMessage: s, idleState: c, className: l }) {
	return t === "idle" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Q("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ Z("span", { children: i }), /* @__PURE__ */ Z("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-secondary",
			children: s ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", l),
		children: [
			/* @__PURE__ */ Q("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [i, " — failed"]
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-sm text-text-secondary",
				children: a ?? "Summary generation failed."
			}),
			/* @__PURE__ */ Z(y, {
				text: o,
				className: "mt-2"
			})
		]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ Q("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ Z("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ Z("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function fn({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = Y(!1), [o, s] = Y(!1);
	q(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), q(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = K(async () => {
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
	return /* @__PURE__ */ Z("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ Z("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ Z("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function pn(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function mn({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, tone: s = "light", className: c }) {
	let l = s === "dark", u = i ?? t.length;
	return /* @__PURE__ */ Q("aside", {
		className: e("flex flex-col w-64 shrink-0", l ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", c),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ Q("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", l ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ Z("h3", {
					className: e("text-sm font-semibold", l ? "text-white" : "text-[var(--color-text-primary)]"),
					children: a
				}), /* @__PURE__ */ Z("span", {
					className: e("text-xs tabular-nums", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					children: u
				})]
			}),
			/* @__PURE__ */ Z("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ Q("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ Z("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ Z("span", { children: pn(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ Z("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ Q("span", {
								className: e("flex-1 truncate text-sm", l ? "text-white/90" : "text-[var(--color-text-primary)]"),
								children: [t.displayName, t.isLocal && /* @__PURE__ */ Z("span", {
									className: e("ml-1 text-xs", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ Z("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ Z("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: l ? "text-white/50" : "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ Z("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ Z("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var hn = null;
function gn() {
	if (hn) return hn;
	try {
		return hn = new AudioContext(), hn;
	} catch {
		return null;
	}
}
function _n({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = Y(!1);
	return q(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = gn();
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
	]), q(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var vn = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function yn() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function bn({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = Y(!1), c = J(null), l = a.videoRef ?? c, u = K((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = K(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		yn(), s(!1);
	}, [l]);
	return /* @__PURE__ */ Q("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ Z(ye, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ Z("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: d,
				className: e(vn, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var xn = 1;
function Sn({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = Y(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== xn ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: Cn(r.x, t.x),
				y: Cn(r.y, t.y),
				width: Cn(r.width, t.width),
				height: Cn(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = J(null), o = J(!1), s = J(r);
	s.current = r;
	let c = J({
		key: e,
		value: r
	}), l = K((e, t) => {
		try {
			let n = {
				v: xn,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return q(() => {
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
	]), q(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: K((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Cn(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var wn = 320, Tn = 200, En = 640, Dn = 400, On = 1440, kn = 900, An = 960, jn = 600, $ = 8;
function Mn({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", inline: s = !1, onModeChange: c, persistKey: l, apiRef: u, defaultCorner: d = "bottom-right", expandable: f = !0, sidePanelTabs: p, activeSidePanelTab: m = null, onSidePanelTabChange: h, zIndex: g = 9999, className: _, "data-testid": v = "expandable-call-widget" }) {
	let y = o === "docked" ? "window" : o, b = Se(() => y === "window" ? Ln(An, jn) : Rn(d), [y, d]), { state: x, setState: S } = Sn({
		persistKey: l,
		defaults: {
			mode: y,
			x: b.x,
			y: b.y,
			width: An,
			height: jn
		}
	}), [C, w] = Y(!1), T = C ? "fullscreen" : x.mode, E = J(null), D = p ?? [], O = D.length > 0, k = O && D.some((e) => e.id === m), A = J(!1);
	q(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== E.current && C && (w(!1), A.current || S({ mode: "window" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [C, S]);
	let j = K(() => {
		let e = E.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => w(!0), () => {}) : w(!0);
	}, []), M = K(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = K((e) => {
		let t = yt(e);
		if (t !== T) {
			if (t === "fullscreen") {
				j();
				return;
			}
			if (T === "fullscreen") {
				M(), S({ mode: t });
				return;
			}
			if (t === "window" && T === "mini") {
				let e = Ln(x.width, x.height);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && T === "window") {
				let e = Rn(d);
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
		T,
		j,
		M,
		S,
		x.width,
		x.height,
		d
	]);
	q(() => {
		c?.(T);
	}, [T, c]), be(u, () => ({
		mode: T,
		setMode: N
	}), [T, N]);
	let P = J(null), F = K((e) => {
		T === "window" && (e.target.closest("button") || (e.currentTarget.setPointerCapture(e.pointerId), P.current = {
			startX: e.clientX,
			startY: e.clientY,
			origX: x.x,
			origY: x.y
		}));
	}, [
		T,
		x.x,
		x.y
	]), I = K((e) => {
		let t = P.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Bn(t.origX + n, x.width, window.innerWidth), a = Bn(t.origY + r, x.height, window.innerHeight);
		S({
			x: i,
			y: a
		});
	}, [
		S,
		x.width,
		x.height
	]), ee = K((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), L = J(null), te = K((e) => {
		T === "window" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), L.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: x.width,
			origH: x.height
		});
	}, [
		T,
		x.width,
		x.height
	]), R = K((e) => {
		let t = L.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = zn(t.origW + n, En, Math.min(On, window.innerWidth - 16)), a = zn(t.origH + r, Dn, Math.min(kn, window.innerHeight - 16));
		S({
			width: i,
			height: a
		});
	}, [S]), z = K((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), L.current = null;
	}, []);
	xe(() => {
		if (T !== "window") return;
		let e = () => {
			let e = Bn(x.x, x.width, window.innerWidth), t = Bn(x.y, x.height, window.innerHeight);
			(e !== x.x || t !== x.y) && S({
				x: e,
				y: t
			});
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		T,
		x.x,
		x.y,
		x.width,
		x.height,
		S
	]);
	let B = Se(() => s ? {
		position: "relative",
		width: "100%",
		height: "auto"
	} : T === "fullscreen" ? {
		position: "fixed",
		inset: 0,
		width: "100vw",
		height: "100vh",
		zIndex: g
	} : T === "window" ? {
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
		width: wn,
		height: Tn,
		zIndex: g
	}, [
		s,
		T,
		x.x,
		x.y,
		x.width,
		x.height,
		g
	]);
	return /* @__PURE__ */ Q("div", {
		ref: E,
		"data-testid": v,
		"data-call-widget-mode": T,
		"data-call-widget-mode-legacy": bt(T),
		"data-call-side-panel-open": k ? "true" : "false",
		style: B,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", T === "fullscreen" ? "rounded-none" : "rounded-lg", _),
		children: [
			/* @__PURE__ */ Q("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", T === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: F,
				onPointerMove: I,
				onPointerUp: ee,
				onPointerCancel: ee,
				children: [/* @__PURE__ */ Q("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ Z("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ Z("span", {
							className: "truncate font-medium",
							"data-testid": "call-widget-window-title",
							children: t
						}),
						n && /* @__PURE__ */ Z("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ Z("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Ot(r)
						})
					]
				}), f && /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ Z(Nn, {
							active: T === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ Z(Pn, {})
						}),
						/* @__PURE__ */ Z(Nn, {
							active: T === "window",
							label: "Window",
							onClick: () => N("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ Z(Fn, {})
						}),
						/* @__PURE__ */ Z(Nn, {
							active: T === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(T === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ Z(In, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: e("relative flex-1 min-h-0 bg-black", k && "flex items-stretch"),
				children: [k ? /* @__PURE__ */ Z("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, k && /* @__PURE__ */ Z(vt, {
					mode: T,
					tabs: D,
					activeTab: m,
					onTabChange: h,
					widthClassName: T === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || O) && /* @__PURE__ */ Z("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: O ? /* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Z("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ Z(gt, {
						tabs: D,
						activeTab: m,
						onTabChange: h
					})]
				}) : a
			}),
			T === "window" && /* @__PURE__ */ Z("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: te,
				onPointerMove: R,
				onPointerUp: z,
				onPointerCancel: z,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ Z("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ Z("path", {
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
function Nn({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ Z("button", {
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
function Pn() {
	return /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Z("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Fn() {
	return /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Z("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function In() {
	return /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Z("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function Ln(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max($, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max($, Math.floor((window.innerHeight - t) / 2))
	};
}
function Rn(e) {
	if (typeof window > "u") return {
		x: 16,
		y: 16
	};
	let t = window.innerWidth, n = window.innerHeight;
	switch (e) {
		case "top-left": return {
			x: $,
			y: $
		};
		case "top-right": return {
			x: t - wn - $,
			y: $
		};
		case "bottom-left": return {
			x: $,
			y: n - Tn - $
		};
		default: return {
			x: t - wn - $,
			y: n - Tn - $
		};
	}
}
function zn(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Bn(e, t, n) {
	return zn(e, $, Math.max($, n - t - $));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Vn({ show: e, label: t }) {
	return e ? /* @__PURE__ */ Q("div", {
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
function Hn({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ Z("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var Un = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Wn = 3e3, Gn = .35;
function Kn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Un[Math.abs(t) % Un.length];
}
function qn({ lines: t, maxLines: n = 4, fadeAfterMs: r = Wn, now: i, className: a }) {
	let [, o] = Y(0), s = i === void 0, c = t.length > 0;
	q(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = J(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(Gn, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Wn);
	return f.length === 0 ? null : /* @__PURE__ */ Q("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ Z("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ Q("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ Z("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: Kn(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ Z("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var Jn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Yn = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Xn = "bg-surface-hover text-neutral hover:bg-surface-emphasis", Zn = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function Qn({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? Yn : a === "danger" ? Zn : Xn;
	return /* @__PURE__ */ Z("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", Jn[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function $n(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function er(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
var tr = "bg-white/15 text-white hover:bg-white/25", nr = "bg-white text-video-stage hover:bg-white";
function rr({ channelName: t, eyebrow: n, localIdentity: r, previewStream: a, permission: o, permissionMessage: s, audioEnabled: c, videoEnabled: l, onToggleAudio: u, onToggleVideo: d, onRetryPermission: f, participants: p, readyState: m, readyLoading: h = !1, effectsSlot: g, devicesSlot: _, devicesOpen: v, onToggleDevices: y, secondaryActions: x, onJoin: S, onCancel: w, joinLabel: T, joinDisabled: E, subtitleOverride: D, className: O, "data-testid": k }) {
	let A = J(null), [j, M] = Y(!1);
	q(() => {
		A.current && a && (A.current.srcObject = a);
	}, [a]);
	let N = o === "granted", P = er(o), I = E ?? !N, ee = T ?? (I && !N ? "Allow camera to join" : "Join now"), L = D ?? $n(p, m, h), te = !!_, R = te && (v ?? j);
	function z(e) {
		v === void 0 && M(e), y?.(e);
	}
	return /* @__PURE__ */ Z("div", {
		"data-testid": k,
		className: e("flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary", O),
		children: /* @__PURE__ */ Z("div", {
			className: "mx-auto w-full max-w-5xl flex flex-col gap-4 px-4 py-4 sm:px-5",
			children: /* @__PURE__ */ Q("div", {
				className: "flex flex-col lg:flex-row lg:items-start gap-4",
				children: [/* @__PURE__ */ Q("section", {
					className: "w-full min-w-0 lg:flex-1 flex flex-col gap-4",
					children: [/* @__PURE__ */ Q("div", {
						className: "relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage",
						children: [
							a && N && /* @__PURE__ */ Z("video", {
								ref: A,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !l && "opacity-0")
							}),
							N && !l && (r ? /* @__PURE__ */ Z("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ Q("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ Z(F, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ Q("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ Z("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ Z("span", {
											className: "text-white/60 text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ Z("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-white/60 text-sm",
								children: "Camera off"
							})),
							o === "pending" && /* @__PURE__ */ Z("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ Z(C, { size: "lg" })
							}),
							P && /* @__PURE__ */ Z("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ Z(b, {
									kind: "camera",
									state: P,
									message: s,
									onRetry: f,
									"data-testid": "prejoin-permission-card"
								})
							}),
							/* @__PURE__ */ Z("div", {
								className: "absolute right-2 top-1/2 -translate-y-1/2 sm:right-3",
								children: /* @__PURE__ */ Q("div", {
									className: "flex flex-col items-center gap-2 rounded-full bg-black/55 p-2 backdrop-blur-sm",
									children: [
										/* @__PURE__ */ Z(Qn, {
											on: c,
											onClick: u,
											disabled: !N,
											"aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
											title: c ? "Mute mic before joining" : "Unmute mic before joining",
											iconOn: /* @__PURE__ */ Z(G, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(U, { size: 18 }),
											className: e(c && tr),
											"data-testid": "prejoin-toggle-audio"
										}),
										/* @__PURE__ */ Z(Qn, {
											on: l,
											onClick: d,
											disabled: !N,
											"aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
											title: l ? "Turn camera off before joining" : "Turn camera on before joining",
											iconOn: /* @__PURE__ */ Z(W, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(ge, { size: 18 }),
											className: e(l && tr),
											"data-testid": "prejoin-toggle-video"
										}),
										te && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
											"aria-hidden": "true",
											className: "h-px w-6 bg-white/20"
										}), /* @__PURE__ */ Z(Qn, {
											on: R,
											onClick: () => z(!R),
											"aria-label": R ? "Close device settings" : "Open device settings",
											title: R ? "Close device settings" : "Open device settings",
											iconOn: /* @__PURE__ */ Z(oe, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(oe, { size: 18 }),
											className: R ? nr : tr,
											"data-testid": "prejoin-devices-toggle"
										})] })
									]
								})
							})
						]
					}), g && /* @__PURE__ */ Z("div", {
						"data-testid": "prejoin-effects-slot",
						children: g
					})]
				}), /* @__PURE__ */ Q("section", {
					className: "w-full lg:w-72 xl:w-80 lg:shrink-0 lg:self-stretch flex flex-col gap-3 lg:justify-between",
					children: [/* @__PURE__ */ Q("div", {
						className: "flex flex-col gap-3 min-h-0",
						children: [/* @__PURE__ */ Q("div", {
							className: "min-w-0",
							children: [
								n && /* @__PURE__ */ Z("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral",
									children: n
								}),
								/* @__PURE__ */ Z("h1", {
									"data-testid": "prejoin-title",
									className: "text-lg font-semibold leading-tight truncate",
									children: t
								}),
								/* @__PURE__ */ Z("p", {
									"data-testid": "prejoin-subtitle",
									className: "mt-0.5 text-xs text-neutral",
									children: L
								})
							]
						}), R ? /* @__PURE__ */ Q("div", {
							"data-testid": "prejoin-devices-panel",
							className: "rounded-xl border border-border bg-surface p-3",
							children: [/* @__PURE__ */ Q("div", {
								className: "flex items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ Z("h2", {
									className: "text-sm font-semibold",
									children: "Device settings"
								}), /* @__PURE__ */ Z(i, {
									variant: "ghost",
									size: "sm",
									onClick: () => z(!1),
									"data-testid": "prejoin-devices-close",
									children: "Close"
								})]
							}), _]
						}) : /* @__PURE__ */ Q("div", {
							className: e(h || p && p.length > 0 ? "rounded-xl border border-border bg-surface p-3" : "px-0.5"),
							children: [/* @__PURE__ */ Z(ir, {
								participants: p,
								loading: h
							}), m === "pending" && !h && /* @__PURE__ */ Q("p", {
								className: "mt-3 text-xs text-warning-fg flex items-center gap-2",
								children: [/* @__PURE__ */ Z("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
							})]
						})]
					}), /* @__PURE__ */ Q("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ Z(i, {
								variant: "primary",
								size: "lg",
								fullWidth: !0,
								onClick: () => S({
									audio: c,
									video: l
								}),
								disabled: I,
								"data-testid": "prejoin-join-button",
								children: ee
							}),
							x && /* @__PURE__ */ Z("div", {
								"data-testid": "prejoin-secondary-actions",
								children: x
							}),
							/* @__PURE__ */ Z("button", {
								type: "button",
								onClick: w,
								"data-testid": "prejoin-cancel",
								className: "text-xs text-neutral hover:text-text-primary transition-colors text-center cursor-pointer",
								children: "Cancel"
							})
						]
					})]
				})]
			})
		})
	});
}
function ir({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ Q("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ Z(C, { size: "sm" }), " Finding people…"]
	}) : !e || e.length === 0 ? /* @__PURE__ */ Z("div", {
		className: "text-xs text-neutral",
		children: "Nobody here yet."
	}) : /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ Z("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ Q("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ Q("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ Z(F, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ Z("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ Z(o, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ Q("li", {
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
var ar = {
	active: "Recording — saved to /recordings when the call ends",
	armed: "Recording armed — will start once the call is under way"
};
function or({ armed: e, active: t, titles: n, className: r, "data-testid": i = "recording-chip" }) {
	return !e && !t ? null : /* @__PURE__ */ Z(o, {
		tone: t ? "danger" : "neutral",
		size: "xs",
		uppercase: !0,
		dot: t ? "pulse" : "static",
		title: t ? n?.active ?? ar.active : n?.armed ?? ar.armed,
		className: r,
		"data-testid": i,
		"aria-label": t ? "Recording" : "Recording armed",
		children: "Rec"
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var sr = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, cr = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function lr() {
	return /* @__PURE__ */ Q("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ Z("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ Z("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function ur({ channelName: t, subtitle: n, recording: r, elapsedLabel: i, phase: a, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ Q("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ Q("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ Z("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || r?.armed || i) && /* @__PURE__ */ Q("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ Z("span", { children: n }),
					r?.armed && /* @__PURE__ */ Z(or, {
						armed: r.armed,
						active: r.active,
						titles: { armed: "Recording armed — will start when someone joins" },
						"data-testid": "hangout-room-header-recording"
					}),
					i && /* @__PURE__ */ Z(o, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ Z(lr, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ Z("span", {
							className: "tabular-nums",
							children: i
						})
					})
				]
			})]
		}), (a || s) && /* @__PURE__ */ Q("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [a && /* @__PURE__ */ Z(o, {
				tone: sr[a],
				size: "sm",
				dot: a === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: cr[a]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var dr = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, fr = {
	sm: 16,
	md: 20,
	lg: 24
};
function pr({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ Q("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ Z(Qn, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ Z(G, { size: g }),
				iconOff: /* @__PURE__ */ Z(U, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ Z(Qn, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ Z(W, { size: g }),
				iconOff: /* @__PURE__ */ Z(ge, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ Z(Qn, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ Z(de, { size: g }),
				iconOff: /* @__PURE__ */ Z(ce, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ Z("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", dr[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ Z(he, { size: fr[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var mr = {
	devices: "Devices",
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function hr({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", devicesContent: a, effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...a == null ? [] : ["devices"],
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = Y(i);
	q(() => {
		t && m(i);
	}, [t, i]);
	let h = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ Z(_, {
		open: t,
		onClose: n,
		ariaLabel: u,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden",
		children: /* @__PURE__ */ Q("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", d),
			children: [/* @__PURE__ */ Q("header", {
				className: "flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3",
				children: [/* @__PURE__ */ Z("h2", {
					className: "m-0 text-sm font-semibold text-white",
					children: u
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ Q("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [l && /* @__PURE__ */ Z("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(ye, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ Z("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ Q("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ Z("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ Q("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [f.length > 0 && /* @__PURE__ */ Z("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2",
						children: f.map((t) => /* @__PURE__ */ Z("button", {
							type: "button",
							role: "tab",
							"aria-selected": t === h,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === h ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: mr[t]
						}, t))
					}), /* @__PURE__ */ Q("div", {
						role: "tabpanel",
						"data-testid": "call-settings-panel",
						className: "min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[460px]",
						children: [
							h === "devices" ? a : null,
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
//#region src/components/video/GoLiveButton.tsx
function gr(e) {
	return `Start broadcasting this room and tell everyone in ${e ?? "the channel"}`;
}
var _r = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50", vr = "text-xs text-text-tertiary";
function yr({ live: t = !1, starting: n = !1, onGoLive: r, onEndBroadcast: i, viewerCount: a, streamReady: o, connection: s = "online", channelName: c, error: l, endHint: u, label: d, disabled: f, className: p, "data-testid": m = "go-live" }) {
	if (t) {
		let t = s !== "online", n = t || o === !1;
		return /* @__PURE__ */ Q("div", {
			className: e("flex flex-col gap-1", p),
			children: [/* @__PURE__ */ Q("div", {
				"data-testid": m,
				"data-live": "true",
				"data-stream": o === void 0 ? "unknown" : o ? "ready" : "pending",
				"data-connection": s,
				className: "inline-flex items-center gap-2",
				children: [
					/* @__PURE__ */ Q("span", {
						"data-testid": `${m}-status`,
						role: "status",
						className: e(_r, n ? "bg-warning-bg text-warning-fg" : "bg-danger text-white"),
						children: [/* @__PURE__ */ Z("span", {
							"aria-hidden": !0,
							className: e("h-1.5 w-1.5 rounded-full", n ? "bg-warning-fg" : "bg-white")
						}), t ? s === "offline" ? "You are offline — nobody is receiving this" : "Reconnecting — your audience may not be receiving this" : n ? "On the call — no stream yet" : "You are live"]
					}),
					!n && typeof a == "number" && Number.isFinite(a) && a >= 0 && /* @__PURE__ */ Q("span", {
						"data-testid": `${m}-viewers`,
						className: vr,
						children: [a, " watching"]
					}),
					i && /* @__PURE__ */ Z("button", {
						type: "button",
						"data-testid": `${m}-end`,
						onClick: i,
						className: e(_r, "cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover"),
						children: "End broadcast"
					})
				]
			}), (n || !i && u) && /* @__PURE__ */ Z("span", {
				"data-testid": `${m}-hint`,
				className: vr,
				children: t ? s === "offline" ? "Your connection dropped. The broadcast resumes if it comes back." : "Your connection is unstable. What you see locally is not what they see." : n ? "Nobody can watch yet — the stream has not started." : u
			})]
		});
	}
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col gap-1", p),
		children: [
			/* @__PURE__ */ Q("button", {
				type: "button",
				"data-testid": m,
				"data-live": "false",
				disabled: f || n,
				onClick: r,
				title: gr(c),
				"aria-label": n ? "Going live…" : `${d ?? "Go live"} — ${gr(c).toLowerCase()}`,
				className: e(_r, "cursor-pointer bg-danger text-white hover:opacity-90"),
				children: [/* @__PURE__ */ Z("span", {
					"aria-hidden": !0,
					className: "h-1.5 w-1.5 rounded-full bg-white"
				}), n ? "Going live…" : d ?? "Go live"]
			}),
			/* @__PURE__ */ Z("span", {
				"data-testid": `${m}-hint`,
				className: vr,
				children: n ? "Connecting — this takes a few seconds." : `Starts a broadcast in ${c ?? "this channel"} and tells everyone there.`
			}),
			l && /* @__PURE__ */ Z("span", {
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
function br() {
	let [e, t] = Y(!1), n = J(null);
	return {
		play: K(async (e) => {
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
function xr({ value: e, onChange: t, showCamera: n = !0, children: a, "data-testid": o = "device-settings" }) {
	let s = r(), { play: c, playing: l } = br();
	if (!s.supported) return /* @__PURE__ */ Z("p", {
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
	return /* @__PURE__ */ Q("div", {
		"data-testid": o,
		className: "flex flex-col gap-3",
		children: [
			s.labelsHidden ? /* @__PURE__ */ Z("p", {
				"data-testid": `${o}-labels-hidden`,
				className: "m-0 text-xs text-text-tertiary",
				children: "Device names appear once the browser has been allowed to use your microphone or camera."
			}) : null,
			/* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Microphone", /* @__PURE__ */ Z(B, {
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
			n ? /* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Camera", /* @__PURE__ */ Z(B, {
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
			s.canSelectSpeaker ? /* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Speaker", /* @__PURE__ */ Q("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ Z(B, {
						size: "sm",
						"data-testid": `${o}-speaker`,
						value: e.speakerId ?? "",
						onChange: (n) => t({
							...e,
							speakerId: n.target.value || void 0
						}),
						options: u(s.speakers, e.speakerId),
						className: "min-w-0 flex-1"
					}), /* @__PURE__ */ Z(i, {
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
function Sr(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Cr({ src: t, autoPlay: n = !1, onFirstPlay: r, onEnded: i, durationHint: a, size: o = "md", className: s, "data-testid": c = "audio-player" }) {
	let l = J(null), [u, d] = Y(!1), [f, p] = Y(0), [m, h] = Y(a ?? 0), g = J(!1);
	q(() => {
		d(!1), p(0), h(a ?? 0), g.current = !1;
	}, [t, a]);
	let _ = () => {
		let e = l.current;
		e && (u ? e.pause() : e.play().catch(() => d(!1)));
	}, v = (e) => {
		let t = l.current;
		t && (t.currentTime = e, p(e));
	}, y = m > 0 ? m : Math.max(f, 1);
	return /* @__PURE__ */ Q("div", {
		className: e("flex min-w-0 items-center gap-2", o === "sm" ? "text-xs" : "text-sm", s),
		"data-testid": c,
		"data-playing": u,
		children: [
			/* @__PURE__ */ Z("audio", {
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
			/* @__PURE__ */ Z(Qn, {
				on: u,
				offTone: "neutral",
				size: o === "sm" ? "sm" : "md",
				"aria-label": u ? "Pause" : "Play",
				iconOn: /* @__PURE__ */ Z(re, { size: o === "sm" ? 14 : 18 }),
				iconOff: /* @__PURE__ */ Z(ie, { size: o === "sm" ? 14 : 18 }),
				onClick: _,
				"data-testid": `${c}-toggle`
			}),
			/* @__PURE__ */ Z("span", {
				className: "w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary",
				"data-testid": `${c}-time`,
				children: Sr(f)
			}),
			/* @__PURE__ */ Z(A, {
				"aria-label": "Seek",
				min: 0,
				max: y,
				step: .1,
				value: Math.min(f, y),
				onChange: v,
				className: "min-w-[96px] flex-1",
				"data-testid": `${c}-scrubber`
			}),
			/* @__PURE__ */ Z("span", {
				className: "w-9 shrink-0 font-mono tabular-nums text-text-tertiary",
				"data-testid": `${c}-duration`,
				children: Sr(m)
			})
		]
	});
}
//#endregion
//#region src/components/video/VoicemailRecorder.tsx
function wr(e) {
	let t = Math.max(0, Math.floor(e / 1e3));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Tr({ open: e, onClose: t, recipientName: r, getStream: a, onSend: o, maxSeconds: s = 60, "data-testid": c = "voicemail-recorder" }) {
	let l = n({
		getStream: a,
		maxMs: s * 1e3
	}), [u, d] = Y(!1), [f, p] = Y(null), m = J(!1);
	q(() => {
		e && !m.current && (p(null), d(!1), l.start()), !e && m.current && l.reset(), m.current = e;
	}, [e]);
	let h = async () => {
		if (l.blob) {
			d(!0), p(null);
			try {
				await o(l.blob, l.elapsedMs, l.mimeType ?? (l.blob.type || "audio/webm")), t();
			} catch (e) {
				p(e instanceof Error ? e.message : "Could not send the voicemail.");
			} finally {
				d(!1);
			}
		}
	}, g = l.state === "starting" ? "Opening the microphone…" : l.state === "recording" ? "Recording — speak now" : l.state === "recorded" ? "Listen back, then send" : l.state === "error" ? l.error ?? "Something went wrong" : "Ready";
	return /* @__PURE__ */ Z(_, {
		open: e,
		onClose: t,
		title: `Leave a voicemail for ${r}`,
		maxWidth: 440,
		footer: /* @__PURE__ */ Q("div", {
			className: "flex w-full items-center justify-end gap-2",
			"data-testid": `${c}-actions`,
			children: [
				/* @__PURE__ */ Z(i, {
					variant: "ghost",
					size: "sm",
					onClick: t,
					disabled: u,
					"data-testid": `${c}-cancel`,
					children: "Cancel"
				}),
				l.state === "recording" && /* @__PURE__ */ Z(i, {
					variant: "primary",
					size: "sm",
					onClick: l.stop,
					"data-testid": `${c}-stop`,
					children: "Stop"
				}),
				(l.state === "recorded" || l.state === "error") && /* @__PURE__ */ Z(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void l.start(),
					disabled: u,
					"data-testid": `${c}-rerecord`,
					children: l.state === "error" ? "Try again" : "Re-record"
				}),
				l.state === "recorded" && /* @__PURE__ */ Z(i, {
					variant: "primary",
					size: "sm",
					onClick: () => void h(),
					disabled: u || !l.blob,
					"data-testid": `${c}-send`,
					children: u ? "Sending…" : "Send voicemail"
				})
			]
		}),
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col items-center gap-3 py-2",
			"data-testid": c,
			"data-state": l.state,
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 text-sm text-text-secondary",
					role: "status",
					"data-testid": `${c}-status`,
					children: [l.state === "recording" && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						className: "inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger"
					}), g]
				}),
				/* @__PURE__ */ Q("div", {
					className: "font-mono text-3xl tabular-nums text-text-primary",
					"data-testid": `${c}-clock`,
					children: [wr(l.elapsedMs), /* @__PURE__ */ Q("span", {
						className: "text-base text-text-tertiary",
						children: [" / ", wr(s * 1e3)]
					})]
				}),
				l.state === "recorded" && l.url && /* @__PURE__ */ Z(Cr, {
					src: l.url,
					durationHint: l.elapsedMs / 1e3,
					className: "w-full",
					"data-testid": `${c}-preview`
				}),
				f && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-danger",
					role: "alert",
					children: f
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/AuthedAudio.tsx
function Er({ src: e, getAuthToken: t, onFirstPlay: n, eager: r = !1, className: a, "data-testid": o = "authed-audio" }) {
	let [s, c] = Y(null), [l, u] = Y("idle"), [d, f] = Y(r), p = J(!1);
	return q(() => {
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
	}, [e, d]), l === "idle" ? /* @__PURE__ */ Z(i, {
		variant: "secondary",
		size: "sm",
		onClick: () => f(!0),
		"data-testid": `${o}-load`,
		children: "▶ Play"
	}) : l === "loading" ? /* @__PURE__ */ Z("span", {
		className: "text-sm text-text-tertiary",
		"data-testid": `${o}-loading`,
		children: "Loading…"
	}) : l === "error" || !s ? /* @__PURE__ */ Z(i, {
		variant: "ghost",
		size: "sm",
		onClick: () => {
			u("idle"), f(!1), setTimeout(() => f(!0), 0);
		},
		"data-testid": `${o}-error`,
		children: "Couldn’t load — retry"
	}) : /* @__PURE__ */ Z(Cr, {
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
function Dr(e) {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
function Or({ title: t, subtitle: n, durationSeconds: r, live: i = !0, recording: a, onPopOut: o, popOutLabel: c = "Pop the call out", children: l, controls: u, aside: d, stage: f = "video", className: p, "data-testid": m = "embedded-call-panel" }) {
	return /* @__PURE__ */ Q("section", {
		className: e("flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md", d && "@container", p),
		"aria-label": typeof t == "string" ? `Call: ${t}` : "Call",
		"data-testid": m,
		"data-stage": f,
		children: [
			/* @__PURE__ */ Q("header", {
				className: "flex min-w-0 items-center gap-2 px-3 py-2",
				children: [
					i && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						className: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success"
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1 truncate text-sm font-semibold",
						"data-testid": `${m}-title`,
						children: t
					}),
					a && /* @__PURE__ */ Z(or, {
						armed: a.armed,
						active: a.active,
						className: "shrink-0",
						"data-testid": `${m}-recording`
					}),
					n && /* @__PURE__ */ Z("span", {
						className: "shrink-0 text-xs text-white/60",
						"data-testid": `${m}-subtitle`,
						children: n
					}),
					r !== void 0 && /* @__PURE__ */ Z("span", {
						className: "shrink-0 font-mono text-xs tabular-nums text-white/80",
						"data-testid": `${m}-duration`,
						children: Dr(r)
					}),
					o && /* @__PURE__ */ Z(s, {
						"aria-label": c,
						title: c,
						size: "sm",
						variant: "ghost",
						icon: /* @__PURE__ */ Z(ae, { size: 16 }),
						onClick: o,
						className: "shrink-0 text-white/80 hover:text-white",
						"data-testid": `${m}-pop-out`
					})
				]
			}),
			d ? /* @__PURE__ */ Q("div", {
				className: "flex min-h-0 min-w-0 flex-col @lg:flex-row",
				children: [/* @__PURE__ */ Z("div", {
					className: e("relative w-full min-w-0 bg-black/40 @lg:flex-1", f === "video" ? "aspect-video" : "min-h-[88px]"),
					"data-testid": `${m}-stage`,
					children: /* @__PURE__ */ Z("div", {
						className: "absolute inset-0",
						children: l
					})
				}), /* @__PURE__ */ Z("div", {
					className: "flex max-h-80 min-h-0 min-w-0 flex-col overflow-y-auto @lg:max-h-none @lg:shrink-0",
					"data-testid": `${m}-aside`,
					children: d
				})]
			}) : /* @__PURE__ */ Z("div", {
				className: e("relative w-full min-w-0 bg-black/40", f === "video" ? "aspect-video" : "min-h-[88px]"),
				"data-testid": `${m}-stage`,
				children: /* @__PURE__ */ Z("div", {
					className: "absolute inset-0",
					children: l
				})
			}),
			u && /* @__PURE__ */ Z("div", {
				className: "flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2",
				"data-testid": `${m}-controls`,
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/video/CallNoticePill.tsx
var kr = {
	warning: "bg-warning/95 text-white",
	error: "bg-danger/95 text-white",
	info: "bg-black/70 text-white"
};
function Ar({ show: t, tone: n = "warning", message: r, actions: i, className: a, "data-testid": o = "call-notice" }) {
	return t ? /* @__PURE__ */ Q("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		"data-tone": n,
		className: e("pointer-events-auto absolute left-1/2 top-3 z-30 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg", kr[n], a),
		children: [/* @__PURE__ */ Z("span", {
			className: "min-w-0 truncate",
			children: r
		}), i && /* @__PURE__ */ Z("span", {
			className: "flex shrink-0 items-center gap-1",
			children: i
		})]
	}) : null;
}
//#endregion
//#region src/components/video/CallInterruptedNotice.tsx
function jr({ show: t, title: n, description: r, actions: i, className: a, "data-testid": o = "call-interrupted-notice" }) {
	return t ? /* @__PURE__ */ Q("div", {
		role: "alert",
		"aria-live": "assertive",
		"data-testid": o,
		className: e("pointer-events-auto absolute left-1/2 top-1/2 z-30 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2", "rounded-xl px-4 py-4 text-center shadow-2xl", "border border-call-chrome-border bg-call-chrome text-white", a),
		children: [
			/* @__PURE__ */ Z("p", {
				className: "m-0 text-sm font-semibold",
				children: n
			}),
			/* @__PURE__ */ Z("p", {
				className: "m-0 mt-1 text-xs leading-relaxed text-white/70",
				children: r
			}),
			i && /* @__PURE__ */ Z("div", {
				className: "mt-3 flex flex-wrap items-center justify-center gap-2",
				children: i
			})
		]
	}) : null;
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var Mr = {
	microphone: "Mic",
	camera: "Camera"
}, Nr = {
	microphone: "microphone",
	camera: "camera"
}, Pr = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, Fr = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function Ir({ kind: t, on: n, onToggle: r, devices: i, selectedDeviceId: a, onSelectDevice: o, permission: s, level: c, size: u = "sm", showLabel: d = !1, extraItems: f, disabledReason: p, className: m, "data-testid": h = `device-toggle-${t}` }) {
	let g = s === "denied" || s === "unavailable", _ = p ?? (s === "denied" ? Pr[t] : s === "unavailable" ? Fr[t] : void 0), v = !!_ || g, y = n && !v, b = t === "microphone" && y && (c ?? 0) > .08, x = u === "md" ? 20 : 18, S;
	S = Z(t === "microphone" ? y ? G : U : y ? W : ge, { size: x });
	let C = `${Mr[t]} ${y ? "on" : "off"}`, w = y ? `Turn ${Nr[t]} off` : `Turn ${Nr[t]} on`, T = i.length ? i.map((e) => ({
		label: e.label,
		checked: e.deviceId === a,
		onSelect: () => o(e.deviceId),
		"data-testid": `${h}-device-${e.deviceId}`
	})) : [{
		label: Fr[t],
		disabled: !0
	}], E = u === "md" ? "h-10" : "h-8", D = !y && t === "microphone" && !v ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ Q("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", b && "ring-2 ring-primary/50", E, m),
		"data-kind": t,
		"data-on": y ? "true" : "false",
		"data-permission": s,
		children: [/* @__PURE__ */ Q("button", {
			type: "button",
			onClick: v ? void 0 : r,
			disabled: v,
			"aria-pressed": y,
			"aria-label": d ? void 0 : w,
			title: _ ?? w,
			"data-testid": h,
			className: e("inline-flex cursor-pointer items-center gap-2 rounded-l-md border-none bg-transparent font-[inherit] text-sm font-medium", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", u === "md" ? "px-2.5" : "px-2", d && "min-w-0 flex-1 justify-start gap-1.5 pr-2", D),
			children: [S, d && /* @__PURE__ */ Z("span", {
				className: "min-w-0 truncate whitespace-nowrap",
				children: C
			})]
		}), /* @__PURE__ */ Z(z, {
			trigger: /* @__PURE__ */ Z(l, { size: 14 }),
			triggerLabel: `Choose ${Nr[t]}`,
			triggerTitle: `Choose ${Nr[t]}`,
			triggerTestId: `${h}-menu`,
			triggerVariant: "link",
			triggerClassName: e("h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary", u === "md" && "px-2"),
			align: "end",
			"data-testid": `${h}-menu-panel`,
			sections: [{
				label: t === "microphone" ? "Microphone" : "Camera",
				items: T
			}, ...f?.length ? [{ items: f }] : []]
		})]
	});
}
//#endregion
//#region src/components/video/MediaPrecheckRow.tsx
var Lr = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
};
function Rr(e, t) {
	if (t === "denied") return Lr[e];
	if (t === "unavailable") return e === "microphone" ? "No microphone found" : "No camera found";
}
function zr({ micOn: t, cameraOn: n, showCamera: r = !0, permission: a, onToggleMic: o, onToggleCamera: s, onOpenSettings: c, testIdPrefix: l = "start-call-precheck", settingsTestId: u = "start-call-settings", className: d }) {
	let f = typeof a == "string" ? {
		microphone: a,
		camera: a
	} : a, p = Rr("microphone", f.microphone), m = Rr("camera", f.camera), h = t && !p, g = n && !m, _ = (t) => e("inline-flex h-8 items-center gap-2 border-transparent px-2 py-0 font-medium", t ? "text-danger-fg" : "text-text-primary");
	return /* @__PURE__ */ Q("div", {
		className: e("flex items-center gap-2", d),
		"data-testid": `${l}-row`,
		children: [
			/* @__PURE__ */ Q(i, {
				variant: "ghost",
				onClick: o,
				disabled: !!p,
				title: p ?? (h ? "Turn microphone off" : "Turn microphone on"),
				"aria-pressed": h,
				"data-testid": `${l}-mic`,
				className: _(!!p),
				children: [Z(h ? G : U, { size: 18 }), h ? "Mic on" : "Mic off"]
			}),
			r && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				className: "h-5 w-px shrink-0 bg-border"
			}), /* @__PURE__ */ Q(i, {
				variant: "ghost",
				onClick: s,
				disabled: !!m,
				title: m ?? (g ? "Turn camera off" : "Turn camera on"),
				"aria-pressed": g,
				"data-testid": `${l}-camera`,
				className: _(!!m),
				children: [Z(g ? W : ge, { size: 18 }), g ? "Camera on" : "Camera off"]
			})] }),
			/* @__PURE__ */ Z(i, {
				variant: "link",
				onClick: c,
				"data-testid": u,
				className: "ml-auto text-sm",
				children: "Settings"
			})
		]
	});
}
//#endregion
//#region src/components/video/ReviewDocumentList.tsx
function Br({ items: t, trailing: n, onRemove: r, onOpen: i, onSelect: a, onReorder: o, emptyLabel: c = "No documents yet", className: l, "data-testid": u = "review-document-list", rowTestIdPrefix: f = "call-document" }) {
	let [p, h] = Y(null), g = n === "remove";
	if (t.length === 0) return /* @__PURE__ */ Z("p", {
		className: e("m-0 py-2 text-sm text-text-tertiary", l),
		"data-testid": u,
		children: c
	});
	let _ = (e) => (t) => {
		t.preventDefault(), p && o && o(p, e), h(null);
	};
	return /* @__PURE__ */ Z("ul", {
		className: e("m-0 flex list-none flex-col p-0", !g && "gap-1", l),
		"data-testid": u,
		children: t.map((t, c) => {
			let l = t.removable !== !1, u = t.sublineTone ? t.sublineTone === "accent" : t.selected;
			return /* @__PURE__ */ Q("li", {
				"data-testid": `${f}-${t.id}`,
				"data-selected": t.selected ? "true" : "false",
				draggable: !!o,
				onDragStart: o ? () => h(t.id) : void 0,
				onDragOver: o ? (e) => e.preventDefault() : void 0,
				onDrop: o ? _(c) : void 0,
				className: e("group/doc flex items-center rounded-md", g ? "min-h-8 gap-2.5 px-0.5" : "min-h-[58px] gap-3 px-3 py-2", t.selected && "bg-primary-bg", !t.selected && !g && "hover:bg-surface-hover", a && "cursor-pointer", p === t.id && "opacity-50"),
				onClick: a ? () => a(t.id) : void 0,
				children: [
					/* @__PURE__ */ Z("span", {
						className: e("flex shrink-0 text-text-secondary", t.selected && "text-primary"),
						"aria-hidden": "true",
						children: t.icon ?? /* @__PURE__ */ Z(m, { size: g ? 18 : 24 })
					}),
					/* @__PURE__ */ Q("span", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ Z("span", {
							className: e("truncate text-text-primary", g ? "text-sm" : "text-[15px] font-medium"),
							children: t.title
						}), t.subline != null && /* @__PURE__ */ Z("span", {
							className: e("truncate text-sm", u ? "text-primary" : "text-text-tertiary"),
							children: t.subline
						})]
					}),
					n === "remove" && l && r && /* @__PURE__ */ Z(s, {
						"aria-label": `Remove ${t.title}`,
						size: "sm",
						icon: /* @__PURE__ */ Z(d, { size: 14 }),
						onClick: (e) => {
							e.stopPropagation(), r(t.id);
						},
						"data-testid": `${f}-remove-${t.id}`,
						className: "shrink-0 text-text-secondary"
					}),
					n === "open" && i && /* @__PURE__ */ Z(s, {
						"aria-label": `Open ${t.title}`,
						title: `Open ${t.title}`,
						icon: /* @__PURE__ */ Z(ae, { size: 18 }),
						onClick: (e) => {
							e.stopPropagation(), i(t.id);
						},
						"data-testid": `${f}-open-${t.id}`,
						className: "shrink-0 text-text-secondary"
					})
				]
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/video/CollaboratorCheckList.tsx
function Vr({ title: t, rows: n, selected: r, onToggle: i, loading: a = !1, emptyLabel: o = "No one else has this document open", footnote: s, className: c, "data-testid": l = "start-call-collaborators", rowTestIdPrefix: u = "start-call-collaborator" }) {
	let d = new Set(r);
	return /* @__PURE__ */ Q("section", {
		className: e("flex flex-col", c),
		"data-testid": l,
		"aria-label": t,
		children: [
			t && /* @__PURE__ */ Z("h4", {
				className: "m-0 mb-1 text-sm font-normal text-text-secondary",
				children: t
			}),
			a ? /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-2 py-1",
				"data-testid": `${l}-loading`,
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ Z(O, {
					height: 33,
					rounded: "md"
				}, e))
			}) : n.length === 0 ? /* @__PURE__ */ Z("p", {
				className: "m-0 py-2 text-sm text-text-tertiary",
				children: o
			}) : /* @__PURE__ */ Z("ul", {
				className: "m-0 flex list-none flex-col p-0",
				children: n.map((t) => {
					let n = d.has(t.userId), r = !!t.disabledReason;
					return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("label", {
						className: e("flex min-h-[39px] items-center gap-3 rounded-md", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
						title: t.disabledReason,
						"data-testid": `${u}-${t.userId}`,
						"data-checked": n ? "true" : "false",
						"data-presence": t.presence,
						children: [
							/* @__PURE__ */ Q("span", {
								className: "relative inline-flex shrink-0",
								children: [/* @__PURE__ */ Z(F, {
									name: t.name,
									size: 32,
									...t.avatarUrl ? { src: t.avatarUrl } : {},
									...t.color ? { color: t.color } : {},
									showTitle: !1
								}), /* @__PURE__ */ Z(I, {
									state: t.presence,
									pulse: !1,
									size: "sm",
									className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-surface",
									"data-testid": `${u}-presence-${t.userId}`
								})]
							}),
							/* @__PURE__ */ Z("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: t.name
							}),
							/* @__PURE__ */ Z("span", {
								className: "w-20 shrink-0 text-xs text-text-tertiary",
								children: t.statusLabel
							}),
							/* @__PURE__ */ Z(V, {
								checked: n,
								disabled: r,
								onChange: (e) => i(t.userId, e),
								"aria-label": `Invite ${t.name}`,
								className: "h-[18px] w-[18px] shrink-0",
								"data-testid": `${u}-check-${t.userId}`
							})
						]
					}) }, t.userId);
				})
			}),
			s && /* @__PURE__ */ Z("p", {
				className: "m-0 mt-2 text-xs text-text-tertiary",
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/video/CallPeopleList.tsx
function Hr(e) {
	let t = null;
	return e.state === "ringing" ? t = {
		label: "Ringing…",
		tone: "muted",
		kind: "ringing"
	} : e.state === "notified" ? t = {
		label: "Offline · notified",
		tone: "muted",
		kind: "notified"
	} : e.state === "missed" ? t = {
		label: "Didn't answer",
		tone: "muted",
		kind: "missed"
	} : e.state === "declined" ? t = {
		label: "Declined",
		tone: "muted",
		kind: "declined"
	} : e.state === "left" ? t = {
		label: "Left",
		tone: "muted",
		kind: "left"
	} : e.presenting ? t = {
		label: "Presenting",
		tone: "accent",
		kind: "presenting"
	} : e.screenSharing ? t = {
		label: "Sharing screen",
		tone: "accent",
		kind: "sharing"
	} : e.cameraOn ? e.state === "reconnecting" && (t = {
		label: "Reconnecting…",
		tone: "warning",
		kind: "reconnecting"
	}) : t = {
		label: "Camera off",
		tone: "muted",
		kind: "camera-off"
	}, e.state === "reconnecting" && t?.kind === "camera-off" && (t = {
		label: "Reconnecting…",
		tone: "warning",
		kind: "reconnecting"
	}), e.isHost ? t ? {
		...t,
		label: `Host · ${t.label}`
	} : {
		label: "Host",
		tone: "muted",
		kind: "host"
	} : t ?? {
		label: "",
		tone: "muted",
		kind: "none"
	};
}
var Ur = /* @__PURE__ */ new Set([
	"ringing",
	"notified",
	"missed",
	"declined",
	"left"
]);
function Wr({ people: t, count: n, followingUserId: r, canModerate: a, onInvite: o, onFollow: s, onMuteForMe: c, onMute: l, onRemove: u, onMakeHost: d, onRingAgain: f, onOpenSelfSettings: p, onLeave: m, hideHeading: g = !1, className: _, "data-testid": v = "call-people-list" }) {
	return /* @__PURE__ */ Q("section", {
		className: e("flex flex-col", _),
		"data-testid": v,
		"aria-label": "People",
		children: [!g && /* @__PURE__ */ Q("div", {
			className: "mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ Z("h3", {
					className: "m-0 text-base font-semibold text-text-primary",
					children: "People"
				}),
				/* @__PURE__ */ Z(h, {
					variant: "count",
					value: n,
					color: "muted",
					"aria-label": `${n} people`
				}),
				/* @__PURE__ */ Z(i, {
					variant: "ghost",
					size: "md",
					onClick: o,
					"data-testid": "call-invite",
					className: "ml-auto font-medium",
					children: "Invite..."
				})
			]
		}), /* @__PURE__ */ Z("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: t.map((t) => {
				let n = Hr(t), o = Ur.has(t.state), h = [];
				if (!t.isLocal && !o) {
					let e = r === t.userId;
					h.push({
						label: e ? "Stop following" : "Follow",
						onSelect: () => s(e ? null : t.userId),
						"data-testid": `call-person-follow-${t.userId}`
					}), h.push({
						label: "Mute for me",
						onSelect: () => c(t.userId)
					});
				}
				a && !t.isLocal && !o && (l && h.push({
					label: "Mute",
					onSelect: () => l(t.userId),
					disabled: !t.audioOn
				}), d && !t.isHost && h.push({
					label: "Make host",
					onSelect: () => d(t.userId)
				}), u && h.push({
					label: "Remove from call",
					danger: !0,
					onSelect: () => u(t.userId)
				})), t.isLocal && (p && h.push({
					label: "Call settings",
					onSelect: p,
					"data-testid": "call-person-self-settings"
				}), m && h.push({
					label: "Leave call",
					danger: !0,
					onSelect: m,
					"data-testid": "call-person-self-leave"
				})), t.state === "missed" && f && h.push({
					label: "Ring again",
					onSelect: () => f(t.userId)
				});
				let g = null;
				return n.label && (g = /* @__PURE__ */ Q("span", {
					className: e("inline-flex items-center gap-1.5 truncate text-sm", n.tone === "accent" && "text-primary", n.tone === "muted" && "text-text-tertiary", n.tone === "warning" && "text-warning-fg"),
					"data-testid": `call-person-status-${t.userId}`,
					"data-status": n.kind,
					children: [
						n.kind === "ringing" && /* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							className: "h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
						}),
						n.label,
						n.kind === "presenting" && /* @__PURE__ */ Z(ue, {
							size: 16,
							className: "ml-1"
						})
					]
				})), /* @__PURE__ */ Q("li", {
					className: e("flex min-h-16 items-center gap-3", o && "opacity-60"),
					"data-testid": `call-person-${t.userId}`,
					"data-state": t.state,
					children: [
						/* @__PURE__ */ Q("span", {
							className: "relative inline-flex shrink-0",
							children: [/* @__PURE__ */ Z(F, {
								name: t.name,
								size: 46,
								...t.avatarUrl ? { src: t.avatarUrl } : {},
								...t.color ? { color: t.color } : {},
								showTitle: !1
							}), t.presence && t.state === "in-call" && !t.isLocal && /* @__PURE__ */ Z(I, {
								state: t.presence,
								pulse: !1,
								className: "absolute bottom-0 right-0 rounded-full ring-2 ring-surface"
							})]
						}),
						/* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ Q("span", {
								className: "truncate text-[15px] text-text-primary",
								children: [t.name, t.isLocal && /* @__PURE__ */ Z("span", {
									className: "text-text-secondary",
									children: " (you)"
								})]
							}), g]
						}),
						t.state === "missed" && f ? /* @__PURE__ */ Z(i, {
							variant: "link",
							onClick: () => f(t.userId),
							className: "shrink-0 text-sm",
							"data-testid": `call-person-ring-${t.userId}`,
							children: "Ring again"
						}) : !o && /* @__PURE__ */ Z("span", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center text-text-secondary",
							"aria-label": t.audioOn ? "Microphone on" : "Microphone muted",
							role: "img",
							"data-testid": `call-person-mic-${t.userId}`,
							"data-audio": t.audioOn ? "on" : "off",
							children: t.audioOn ? /* @__PURE__ */ Z(G, { size: 20 }) : /* @__PURE__ */ Z(U, { size: 20 })
						}),
						h.length > 0 ? /* @__PURE__ */ Z(z, {
							trigger: /* @__PURE__ */ Z(pe, { size: 20 }),
							triggerLabel: `More for ${t.name}`,
							triggerVariant: "link",
							triggerClassName: "h-8 w-8 shrink-0 px-0",
							triggerTestId: `call-person-menu-${t.userId}`,
							align: "end",
							sections: [{ items: h }],
							"data-testid": `call-person-menu-panel-${t.userId}`
						}) : /* @__PURE__ */ Z("span", {
							className: "h-8 w-8 shrink-0",
							"aria-hidden": "true"
						})
					]
				}, t.userId);
			})
		})]
	});
}
//#endregion
//#region src/components/video/CallSettingsDrawer.tsx
var Gr = [
	{
		id: "audio-video",
		label: "Audio & video"
	},
	{
		id: "effects",
		label: "Effects"
	},
	{
		id: "captions",
		label: "Captions"
	}
];
function Kr({ open: t, onClose: n, initialTab: r = "audio-video", tab: a, onTabChange: o, docked: s = !0, audioVideo: c, effects: l, captions: u, effectsFooter: d, width: f = 380, className: p, "data-testid": m = "call-settings-drawer" }) {
	let [h, g] = Y(r);
	q(() => {
		t && g(r);
	}, [t, r]);
	let _ = a ?? h, v = (e) => {
		g(e), o?.(e);
	}, y = _ === "effects" && d ? /* @__PURE__ */ Q("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ Z("span", {
				className: "mr-auto text-sm text-text-tertiary",
				"data-testid": "effects-changes",
				children: d.changeCount === 0 ? "No changes" : `${d.changeCount} ${d.changeCount === 1 ? "change" : "changes"}`
			}),
			/* @__PURE__ */ Z(i, {
				variant: "ghost",
				onClick: d.onCancel,
				"data-testid": "effects-cancel",
				className: "font-medium",
				children: "Cancel"
			}),
			/* @__PURE__ */ Z(i, {
				onClick: d.onApply,
				disabled: d.changeCount === 0 || d.applying,
				"data-testid": "effects-apply",
				children: "Apply"
			})
		]
	}) : /* @__PURE__ */ Q("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ Z("span", {
			className: "mr-auto text-xs text-text-tertiary",
			children: "Devices update immediately"
		}), /* @__PURE__ */ Z(i, {
			onClick: n,
			"data-testid": "settings-done",
			children: "Done"
		})]
	});
	return /* @__PURE__ */ Q(S, {
		open: t,
		onClose: n,
		title: "Call settings",
		docked: s,
		modal: !1,
		backdrop: !1,
		trapFocus: !1,
		...s ? {} : { width: f },
		footer: y,
		className: e(p),
		headerClassName: "border-b-0 px-5 pb-2 pt-5",
		titleClassName: "text-xl",
		bodyClassName: "flex flex-col p-0",
		footerClassName: "bg-surface px-5 py-3.5",
		closeTestId: `${m}-close`,
		"data-testid": m,
		children: [/* @__PURE__ */ Z("div", {
			className: "shrink-0 px-5",
			children: /* @__PURE__ */ Z(j, {
				items: Gr.map((e) => ({
					id: e.id,
					label: e.label,
					testId: `call-settings-tab-${e.id}`
				})),
				value: _,
				onValueChange: (e) => v(e),
				variant: "underline",
				"aria-label": "Call settings",
				getItemTestId: (e) => `call-settings-tab-${e.id}`
			})
		}), /* @__PURE__ */ Q("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-5 pt-2.5 pb-2",
			"data-testid": `${m}-body`,
			"data-tab": _,
			children: [
				_ === "audio-video" && c,
				_ === "effects" && l,
				_ === "captions" && u
			]
		})]
	});
}
function qr({ enabled: t, onEnabledChange: n, language: r, onLanguageChange: i, languages: a = [{
	value: "en",
	label: "English"
}], className: o }) {
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col gap-4", o),
		"data-testid": "settings-captions",
		children: [/* @__PURE__ */ Q("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ Z("span", {
				id: "settings-captions-label",
				className: "text-sm text-text-primary",
				children: "Show live captions"
			}), /* @__PURE__ */ Z(k, {
				checked: t,
				onChange: n,
				"aria-labelledby": "settings-captions-label",
				"data-testid": "settings-captions-toggle"
			})]
		}), /* @__PURE__ */ Q("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ Z("label", {
				htmlFor: "settings-captions-language",
				className: "text-sm text-text-primary",
				children: "Language"
			}), /* @__PURE__ */ Z(B, {
				id: "settings-captions-language",
				value: r,
				onChange: (e) => i?.(e.target.value),
				disabled: a.length < 2 || !i,
				options: a,
				chevron: "custom",
				className: "h-9 w-full text-sm",
				wrapperClassName: "w-40 shrink-0",
				"data-testid": "settings-captions-language"
			})]
		})]
	});
}
//#endregion
//#region src/components/video/StartCallDrawer.tsx
function Jr(e) {
	return e === 0 ? "No one selected" : e === 1 ? "1 person selected" : `${e} people selected`;
}
function Yr({ children: e, action: t }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ Z("h3", {
			className: "m-0 text-[15px] font-semibold text-text-primary",
			children: e
		}), t]
	});
}
function Xr({ open: e, onClose: t, title: n, onTitleChange: r, media: a, onMediaChange: s, documents: l, onManageAccess: u, people: d, message: m, onMessageChange: h, messageMaxLength: _ = 280, ring: y, onRingChange: b, precheck: w, selectedCount: T, onCopyLink: E, onStart: D, starting: O = !1, startDisabledReason: k, error: A, width: j = 400, docked: M = !0, className: P, "data-testid": F = "start-call-drawer" }) {
	let { onAdd: I, ...ee } = l, L = !!k || O || !n.trim(), R = /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-2.5",
		children: [
			A && /* @__PURE__ */ Z(g, {
				variant: "error",
				title: `Could not start the call — ${A.message}`,
				action: /* @__PURE__ */ Z(i, {
					variant: "ghost",
					size: "sm",
					onClick: A.onRetry,
					"data-testid": "start-call-retry",
					children: "Retry"
				}),
				"data-testid": "start-call-error"
			}),
			/* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": "start-call-selected-count",
				children: Jr(T)
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ Q(i, {
					variant: "ghost",
					onClick: E,
					"data-testid": "start-call-copy-link",
					className: "inline-flex items-center gap-2 font-medium",
					children: [/* @__PURE__ */ Z(c, { size: 16 }), "Copy invite link"]
				}), /* @__PURE__ */ Q(i, {
					onClick: D,
					disabled: L,
					title: k ?? (n.trim() ? void 0 : "Give the call a title"),
					"data-testid": "start-call-submit",
					className: "inline-flex items-center gap-2 px-5",
					children: [O && /* @__PURE__ */ Z(C, {
						size: "sm",
						color: "currentColor",
						decorative: !0
					}), O ? "Starting…" : "Start call"]
				})]
			})
		]
	});
	return /* @__PURE__ */ Q(S, {
		open: e,
		onClose: t,
		title: "Start a call",
		docked: M,
		modal: !1,
		backdrop: !1,
		trapFocus: !1,
		...M ? {} : { width: j },
		footer: R,
		className: P,
		headerClassName: "border-b-0 px-5 pb-3 pt-5",
		titleClassName: "text-lg",
		bodyClassName: "flex flex-col gap-3.5 px-5 pt-0.5 pb-0",
		footerClassName: "bg-surface px-5 pt-3 pb-7",
		closeTestId: `${F}-close`,
		"data-testid": F,
		children: [
			/* @__PURE__ */ Z(x, {
				value: n,
				onCommit: r,
				placeholder: "Call title",
				editLabel: "Rename call",
				"data-testid": "start-call-title"
			}),
			/* @__PURE__ */ Z(te, {
				options: [{
					value: "video",
					label: "Video"
				}, {
					value: "audio",
					label: "Audio"
				}],
				value: a,
				onChange: (e) => s(e),
				fullWidth: !0,
				tone: "accent",
				"aria-label": "Call type",
				"data-testid": "start-call-media"
			}),
			/* @__PURE__ */ Q("section", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ Z(Yr, {
						action: /* @__PURE__ */ Q(i, {
							variant: "link",
							onClick: I,
							"data-testid": "start-call-add-document",
							className: "inline-flex items-center gap-1 text-sm",
							children: [/* @__PURE__ */ Z(f, { size: 14 }), "Add"]
						}),
						children: "Review documents"
					}),
					/* @__PURE__ */ Z(Br, {
						...ee,
						trailing: "remove",
						"data-testid": "start-call-documents",
						rowTestIdPrefix: "start-call-document"
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ Z("span", {
							className: "text-text-tertiary",
							children: "Existing document access applies."
						}), /* @__PURE__ */ Z(i, {
							variant: "link",
							onClick: u,
							"data-testid": "start-call-manage",
							className: "text-xs",
							children: "Manage"
						})]
					})
				]
			}),
			/* @__PURE__ */ Q("section", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ Z(Yr, { children: "People" }),
					/* @__PURE__ */ Z(v, {
						value: d.query,
						onChange: (e) => d.onQueryChange(e.target.value),
						placeholder: d.placeholder ?? "Find people, teams or channels",
						"aria-label": d.placeholder ?? "Find people, teams or channels",
						prefix: /* @__PURE__ */ Z(p, { size: 16 }),
						"data-testid": "start-call-people-search"
					}),
					d.chips.length > 0 && /* @__PURE__ */ Z("div", {
						className: "flex flex-wrap gap-2",
						"data-testid": "start-call-chips",
						children: d.chips.map((e) => /* @__PURE__ */ Z(o, {
							tone: "neutral",
							onRemove: () => d.onRemoveChip(e.userId),
							removeLabel: `Remove ${e.name}`,
							removeTestId: `start-call-chip-remove-${e.userId}`,
							"data-testid": `start-call-chip-${e.userId}`,
							className: "rounded-md px-2.5 py-1 text-[13px]",
							children: e.name
						}, e.userId))
					}),
					/* @__PURE__ */ Z(Vr, {
						title: "Document collaborators",
						footnote: "Offline people can use the invite link.",
						...d.collaborators
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Q("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ Q("label", {
					htmlFor: `${F}-message`,
					className: "text-sm text-text-primary",
					children: ["Message ", /* @__PURE__ */ Z("span", {
						className: "text-text-tertiary",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ Z(N, {
					id: `${F}-message`,
					value: m,
					onChange: (e) => h(e.target.value.slice(0, _)),
					maxLength: _,
					rows: 2,
					className: "min-h-0 h-12 resize-none py-1.5",
					"data-testid": "start-call-message"
				})]
			}),
			/* @__PURE__ */ Q("label", {
				className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
				children: [/* @__PURE__ */ Z(V, {
					checked: y,
					onChange: (e) => b(e),
					className: "h-[18px] w-[18px]",
					"data-testid": "start-call-ring"
				}), "Ring online participants"]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Z(zr, {
				showCamera: a === "video",
				...w
			})
		]
	});
}
//#endregion
//#region src/components/video/CallDock.tsx
function Zr(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function Qr(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
function $r({ title: t, participantCount: n, elapsedMs: r, phase: a, callingTo: o, documents: c = [], participants: l, localParticipantId: u, activeSpeakerId: d = null, followingUserId: f = null, mic: p, camera: _, screenShare: v, onOpenPeople: y, onOpenDocuments: b, peopleOpen: x = !1, documentsOpen: S = !1, onOpenSettings: C, extras: w, onPopOut: T, onLeave: E, canEndForEveryone: D = !1, onEndForEveryone: k, onTileClick: A, onTitleClick: j, onDocumentClick: M, endedSummary: N, error: P, onDismiss: F, compact: I = !1, className: ee, "data-testid": L = "call-dock" }) {
	let te = J(null), [z, B] = Y(!1);
	if (a === "error" && P) return /* @__PURE__ */ Z("div", {
		className: e("border-t border-border bg-surface px-5 py-3", ee),
		"data-testid": L,
		"data-phase": "error",
		children: /* @__PURE__ */ Z(g, {
			variant: "error",
			title: P.title ?? `Lost the call — ${P.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ Z(i, {
					size: "sm",
					onClick: P.onRetry,
					"data-testid": "call-dock-rejoin",
					children: P.retryLabel ?? "Rejoin"
				}), F && /* @__PURE__ */ Z(i, {
					size: "sm",
					variant: "ghost",
					onClick: F,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (a === "ended") return /* @__PURE__ */ Q("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", ee),
		"data-testid": L,
		"data-phase": "ended",
		children: [/* @__PURE__ */ Q("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ Z("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				r != null && /* @__PURE__ */ Q(X, { children: [" · ", Zr(r)] }),
				N != null && /* @__PURE__ */ Q(X, { children: [" · ", N] })
			]
		}), F && /* @__PURE__ */ Z(i, {
			variant: "link",
			onClick: F,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let V = a === "calling", H = a === "connecting", ne = a === "reconnecting", U = l.find((e) => e.userId === u) ?? null, W = l.filter((e) => e.userId !== u), re = (e, t) => ({
		...e,
		id: e.userId,
		isLocal: t,
		isMuted: !e.audioOn,
		videoElement: e.videoElement,
		cameraOff: !e.cameraOn && !e.screenSharing,
		audioElement: e.audioElement,
		screenSharing: e.screenSharing,
		reconnecting: ne || e.connection === "reconnecting"
	}), ie;
	ie = V ? o ? `Calling ${o}…` : "Calling…" : H ? "Connecting…" : ne ? /* @__PURE__ */ Z("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${Qr(n)}${r == null ? "" : ` · ${Zr(r)}`}`;
	let ae = I ? 132 : 176, G = I ? 74 : 88, se = () => {
		!V && D && k ? B(!0) : E();
	};
	return /* @__PURE__ */ Q("section", {
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", ee),
		"aria-label": `Call: ${t}`,
		"data-testid": L,
		"data-phase": a,
		"data-compact": I ? "true" : "false",
		children: [/* @__PURE__ */ Q("div", {
			className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2",
			"data-testid": `${L}-header`,
			children: [/* @__PURE__ */ Q("div", {
				className: "flex min-w-0 flex-auto items-baseline gap-3",
				children: [
					/* @__PURE__ */ Z("button", {
						type: "button",
						onClick: j,
						disabled: !j,
						className: "max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline",
						"data-testid": "call-dock-title",
						title: t,
						children: t
					}),
					/* @__PURE__ */ Z("span", {
						className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
						"data-testid": "call-dock-meta",
						children: ie
					}),
					c.length > 0 && /* @__PURE__ */ Z("span", {
						className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
						"data-testid": "call-dock-documents-chips",
						children: c.map((t) => /* @__PURE__ */ Q("button", {
							type: "button",
							onClick: M ? () => M(t.id) : void 0,
							className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", M ? "cursor-pointer hover:underline" : "cursor-default"),
							"data-testid": `call-dock-document-${t.id}`,
							"data-presenting": t.presenting ? "true" : "false",
							title: t.presenting ? `${t.title} · Presenting` : t.title,
							children: [/* @__PURE__ */ Z(m, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ Z("span", {
								className: "truncate",
								children: t.title
							})]
						}, t.id))
					})
				]
			}), /* @__PURE__ */ Q("div", {
				className: "ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2",
				"data-testid": `${L}-controls`,
				children: [
					/* @__PURE__ */ Z(Ir, {
						kind: "microphone",
						...p,
						"data-testid": "call-dock-mic",
						...H ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ Z(Ir, {
						kind: "camera",
						..._,
						"data-testid": "call-dock-camera",
						...H ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ Q(i, {
						variant: v.on ? "danger" : "ghost",
						size: "sm",
						onClick: v.onToggle,
						disabled: H || V || !!v.disabledReason,
						title: V ? "You can share once someone joins" : v.disabledReason ?? (v.on ? "Stop sharing" : "Share your screen"),
						"aria-label": v.on ? "Stop sharing" : "Share",
						"aria-pressed": v.on,
						"data-testid": "call-dock-share",
						className: "inline-flex h-8 items-center gap-1.5 bg-surface font-medium",
						children: [/* @__PURE__ */ Z(de, { size: 16 }), /* @__PURE__ */ Z("span", {
							className: "hidden @min-[860px]:inline",
							children: v.on ? "Stop sharing" : "Share"
						})]
					}),
					/* @__PURE__ */ Q(i, {
						variant: x ? "secondary" : "ghost",
						size: "sm",
						onClick: y,
						disabled: H,
						"aria-label": `People (${n})`,
						"aria-pressed": x,
						"data-testid": "call-dock-people",
						className: e("inline-flex h-8 items-center gap-1.5 font-medium", !x && "bg-surface"),
						children: [
							/* @__PURE__ */ Z(_e, { size: 16 }),
							/* @__PURE__ */ Z("span", {
								className: "hidden @min-[860px]:inline",
								children: "People"
							}),
							/* @__PURE__ */ Z(h, {
								variant: "count",
								value: n,
								color: "muted",
								"aria-label": `${n} people`
							})
						]
					}),
					b && /* @__PURE__ */ Q(i, {
						variant: S ? "secondary" : "ghost",
						size: "sm",
						onClick: b,
						disabled: H,
						"aria-label": `Documents (${c.length})`,
						"aria-pressed": S,
						"data-testid": "call-dock-documents",
						className: e("hidden h-8 items-center gap-1.5 font-medium @min-[980px]:inline-flex", !S && "bg-surface"),
						children: [
							/* @__PURE__ */ Z(m, { size: 16 }),
							/* @__PURE__ */ Z("span", {
								className: "hidden @min-[860px]:inline",
								children: "Documents"
							}),
							/* @__PURE__ */ Z(h, {
								variant: "count",
								value: c.length,
								color: "muted",
								"aria-label": `${c.length} documents`
							})
						]
					}),
					w != null && /* @__PURE__ */ Z("div", {
						className: "contents",
						"data-testid": "call-dock-extras",
						children: w
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-testid": "call-dock-end",
						children: [
							/* @__PURE__ */ Z(s, {
								"aria-label": "Call settings",
								title: "Call settings",
								variant: "outline",
								onClick: C,
								icon: /* @__PURE__ */ Z(oe, { size: 18 }),
								"data-testid": "call-dock-settings"
							}),
							/* @__PURE__ */ Z(s, {
								"aria-label": "Pop out the call",
								title: "Pop out the call",
								variant: "outline",
								onClick: T,
								disabled: H,
								icon: /* @__PURE__ */ Z(fe, { size: 16 }),
								"data-testid": "call-dock-popout"
							}),
							/* @__PURE__ */ Q(i, {
								ref: te,
								variant: "danger-solid",
								size: "sm",
								onClick: se,
								"aria-haspopup": D && !V ? "dialog" : void 0,
								title: V ? "Cancel the call" : void 0,
								"data-testid": "call-dock-leave",
								className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5 font-medium",
								children: [/* @__PURE__ */ Z(he, { size: 16 }), V ? "Cancel" : "Leave"]
							})
						]
					}),
					/* @__PURE__ */ Q(R, {
						trigger: te,
						open: z,
						onClose: () => B(!1),
						placement: "bottom-end",
						"aria-label": "Leave the call",
						"data-testid": "call-dock-leave-confirm",
						className: "w-64 p-3",
						children: [/* @__PURE__ */ Z("p", {
							className: "m-0 mb-3 text-sm text-text-primary",
							children: "Leave the call? Others stay on."
						}), /* @__PURE__ */ Q("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ Z(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									B(!1), E();
								},
								"data-testid": "call-dock-leave-confirm-leave",
								children: "Leave"
							}), /* @__PURE__ */ Z(i, {
								variant: "danger-solid",
								size: "sm",
								onClick: () => {
									B(!1), k?.();
								},
								"data-testid": "call-dock-end-for-everyone",
								children: "End for everyone"
							})]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ Q("div", {
			className: "relative",
			"data-testid": "call-dock-tiles",
			children: [ne && /* @__PURE__ */ Z("div", {
				className: "mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg",
				role: "status",
				"data-testid": "call-dock-reconnecting",
				children: "Reconnecting…"
			}), H ? /* @__PURE__ */ Z("div", {
				className: "flex gap-2",
				"data-testid": "call-dock-connecting",
				children: /* @__PURE__ */ Z("div", {
					className: e("shrink-0 overflow-hidden rounded-md", I ? "h-[74px] w-[132px]" : "h-[88px] w-[176px]"),
					children: /* @__PURE__ */ Z(O, {
						height: "100%",
						rounded: "md"
					})
				})
			}) : /* @__PURE__ */ Z(Rt, {
				variant: "dock",
				participants: W.map((e) => re(e, !1)),
				localParticipant: U ? re(U, !0) : null,
				activeSpeakerId: d,
				highlightedId: f,
				tileWidth: ae,
				tileHeight: G,
				overflow: "collapse",
				maxVisible: I ? 5 : 6,
				...A ? { onParticipantClick: A } : {},
				title: t,
				"data-testid": "call-dock-tile-row"
			})]
		})]
	});
}
//#endregion
//#region src/components/video/IncomingCallPopover.tsx
function ei(e, t) {
	return e === 0 ? "Nobody has joined yet" : t ? `${e} in call` : e === 1 ? "1 person in the call" : `${e} people in the call`;
}
function ti({ open: t, anchorRef: n, compact: r = !1, caller: a, title: o, documents: c, onOpenDocument: l, participants: f, participantCount: p, mic: h, camera: g, onOpenSettings: _, busy: v = !1, onJoin: y, onSwitch: b, onDecline: x, onDismiss: S, ringing: C = !0, initialFocus: w = "join", className: T, "data-testid": E = "incoming-call-popover" }) {
	let [D, ...O] = c, k = O.length ? r ? `+${O.length}` : `+${O.length} ${O.length === 1 ? "document" : "documents"}` : null, A = v && !!b, j = J(null);
	return q(() => {
		if (!t || w !== "join") return;
		let e = requestAnimationFrame(() => j.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [
		t,
		w,
		A
	]), /* @__PURE__ */ Z(R, {
		trigger: n,
		open: t,
		onClose: S,
		placement: "bottom-end",
		offset: 8,
		"aria-label": `Incoming call from ${a.name}`,
		"data-testid": E,
		className: e("rounded-xl p-0 shadow-xl", r ? "w-[375px]" : "w-[407px]", T),
		children: /* @__PURE__ */ Q("div", {
			className: e("flex flex-col", r ? "gap-2.5 px-4 pt-3 pb-4" : "gap-3.5 px-5 pt-4 pb-4"),
			"data-compact": r ? "true" : "false",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ Z(se, {
							size: 20,
							className: e("shrink-0 text-success", C && "motion-safe:animate-pulse")
						}),
						/* @__PURE__ */ Z("span", {
							className: "flex-1 text-[15px] font-semibold text-text-primary",
							children: "Incoming call"
						}),
						/* @__PURE__ */ Z(s, {
							"aria-label": "Not now",
							title: "Not now",
							size: "sm",
							icon: /* @__PURE__ */ Z(d, { size: 16 }),
							onClick: x,
							"data-testid": "incoming-call-close",
							className: "text-text-secondary"
						})
					]
				}),
				r ? /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ Z(F, {
						name: a.name,
						size: 36,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ Q("span", {
						className: "min-w-0 truncate text-[15px] text-text-primary",
						"data-testid": "incoming-call-caller",
						children: [
							/* @__PURE__ */ Z("span", {
								className: "font-medium",
								children: a.name
							}),
							" ",
							/* @__PURE__ */ Z("span", {
								className: "text-text-secondary",
								children: "invited you"
							})
						]
					})]
				}) : /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ Z(F, {
						name: a.name,
						size: 44,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 flex-col",
						"data-testid": "incoming-call-caller",
						children: [/* @__PURE__ */ Z("span", {
							className: "truncate text-[15px] font-semibold text-text-primary",
							children: a.name
						}), /* @__PURE__ */ Z("span", {
							className: "truncate text-sm text-text-secondary",
							children: "invited you to a review"
						})]
					})]
				}),
				/* @__PURE__ */ Z("h3", {
					className: e("m-0 font-semibold text-text-primary", r ? "text-lg" : "text-xl"),
					"data-testid": "incoming-call-title",
					children: o
				}),
				D && /* @__PURE__ */ Q("div", {
					className: "flex min-w-0 items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ Z(m, {
							size: r ? 20 : 22,
							className: "shrink-0 text-primary"
						}),
						/* @__PURE__ */ Z(i, {
							variant: "link",
							onClick: () => l(D.id),
							"data-testid": `incoming-call-document-${D.id}`,
							className: "min-w-0 truncate text-[15px] underline",
							children: D.title
						}),
						k && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							className: "h-4 w-px shrink-0 bg-border"
						}), /* @__PURE__ */ Z(H, {
							content: O.map((e) => e.title).join(", "),
							children: /* @__PURE__ */ Z(i, {
								variant: "link",
								onClick: () => l(O[0].id),
								"data-testid": "incoming-call-more",
								className: "shrink-0 text-[15px] underline",
								children: k
							})
						})] }),
						r && /* @__PURE__ */ Z("span", {
							className: "ml-auto shrink-0 text-text-secondary",
							"data-testid": "incoming-call-participants",
							children: ei(p, !0)
						})
					]
				}),
				!r && /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					"data-testid": "incoming-call-participants",
					children: [f.length > 0 && /* @__PURE__ */ Z(P, {
						items: f.slice(0, 3).map((e) => ({
							name: e.name,
							...e.avatarUrl ? { src: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 34,
						className: "[&>*]:!border-surface [&>*+*]:!ml-[-4px]"
					}), /* @__PURE__ */ Z("span", {
						className: "text-sm text-text-secondary",
						children: ei(p, !1)
					})]
				}),
				!r && /* @__PURE__ */ Z("div", {
					className: "h-px bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Z(Ir, {
							kind: "microphone",
							size: "md",
							showLabel: !0,
							...h,
							className: e("min-w-0 flex-auto justify-between", h.className),
							"data-testid": "incoming-call-mic"
						}),
						/* @__PURE__ */ Z(Ir, {
							kind: "camera",
							size: "md",
							showLabel: !0,
							...g,
							className: e("min-w-0 flex-auto justify-between", g.className),
							"data-testid": "incoming-call-camera"
						}),
						/* @__PURE__ */ Z(s, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							size: "lg",
							icon: /* @__PURE__ */ Z(oe, { size: 18 }),
							onClick: _,
							"data-testid": "incoming-call-settings",
							className: "shrink-0"
						})
					]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ Z(i, {
						variant: "ghost",
						onClick: x,
						"data-testid": "incoming-call-decline",
						className: "border-transparent font-medium",
						children: "Not now"
					}), A ? /* @__PURE__ */ Q(i, {
						ref: j,
						onClick: b,
						"data-testid": "incoming-call-switch",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Switch", /* @__PURE__ */ Z(u, { size: 16 })]
					}) : /* @__PURE__ */ Q(i, {
						ref: j,
						onClick: y,
						"data-testid": "incoming-call-join",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Join call", /* @__PURE__ */ Z(u, { size: 16 })]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/DocumentCallPanel.tsx
function ni({ title: t, participantCount: n, elapsedMs: r, people: a, documents: o, presenting: l, currentDocumentId: u, canPresent: d, presentDisabledReason: p, onPresent: m, onCopyLink: g, onManageAccess: _, onPopOut: v, onClose: y, loading: b = !1, notice: x, className: C, "data-testid": w = "document-call-panel" }) {
	let { count: T, onAdd: E, ...D } = o, k = a.people.find((e) => e.isLocal), A = !!(l && k && l.userId === k.userId && l.documentId === u), j = !!(l && (!k || l.userId !== k.userId)), M = a.people.filter((e) => e.state === "in-call" && !e.isLocal).length === 0, N = `${n === 1 ? "1 person" : `${n} people`}${r == null ? "" : ` · ${Zr(r)}`}`;
	return /* @__PURE__ */ Q(S, {
		open: !0,
		docked: !0,
		onClose: y,
		title: "Call",
		actions: /* @__PURE__ */ Z(s, {
			"aria-label": "Pop out the call",
			title: "Pop out the call",
			size: "sm",
			icon: /* @__PURE__ */ Z(ae, { size: 18 }),
			onClick: v,
			"data-testid": "call-panel-popout",
			className: "text-text-secondary"
		}),
		closeTestId: "call-panel-close",
		className: e(C),
		headerClassName: "border-b-0 px-5 pb-2 pt-5",
		titleClassName: "text-lg",
		bodyClassName: "flex flex-col gap-5 px-5 pt-2 pb-6",
		"data-testid": w,
		children: [
			x,
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ Z("h3", {
					className: "m-0 text-lg font-semibold text-text-primary",
					"data-testid": "call-panel-title",
					children: t
				}), /* @__PURE__ */ Z("span", {
					className: "text-sm tabular-nums text-text-tertiary",
					"data-testid": "call-panel-meta",
					children: N
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-mt-2 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			b ? /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-3",
				"data-testid": "call-panel-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ Z(O, {
					height: 52,
					rounded: "md"
				}, e))
			}) : /* @__PURE__ */ Q(X, { children: [
				/* @__PURE__ */ Z(Wr, { ...a }),
				M && /* @__PURE__ */ Q("p", {
					className: "m-0 -mt-2 text-sm text-text-tertiary",
					"data-testid": "call-panel-waiting",
					children: [
						"Waiting for others —",
						" ",
						/* @__PURE__ */ Z(i, {
							variant: "link",
							onClick: g,
							className: "text-sm",
							children: "Copy call link"
						})
					]
				}),
				/* @__PURE__ */ Z("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Q("section", {
					className: "-mx-2 flex flex-col gap-2",
					"aria-label": "Review documents",
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2 px-2",
						children: [
							/* @__PURE__ */ Z("h3", {
								className: "m-0 text-base font-semibold text-text-primary",
								children: "Review documents"
							}),
							/* @__PURE__ */ Z(h, {
								variant: "count",
								value: T,
								color: "muted",
								"aria-label": `${T} documents`
							}),
							/* @__PURE__ */ Q(i, {
								variant: "link",
								onClick: E,
								"data-testid": "call-add-document",
								className: "ml-auto inline-flex items-center gap-1 text-sm",
								children: [/* @__PURE__ */ Z(f, { size: 14 }), "Add"]
							})
						]
					}), /* @__PURE__ */ Z(Br, {
						...D,
						trailing: "open",
						"data-testid": "call-documents-list",
						rowTestIdPrefix: "call-document"
					})]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ Q(i, {
						variant: "ghost",
						onClick: () => m(A ? null : u),
						disabled: !A && !d,
						title: !A && !d ? p : j ? `Take over from ${l.name}` : void 0,
						"data-take-over": j && d ? "true" : void 0,
						"data-testid": "call-present",
						className: "inline-flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ Z(ue, { size: 18 }), A ? "Stop presenting" : "Present this document"]
					}), /* @__PURE__ */ Q(i, {
						variant: "link",
						onClick: g,
						"data-testid": "call-copy-link",
						className: "inline-flex items-center gap-1.5 text-sm",
						children: [/* @__PURE__ */ Z(c, { size: 16 }), "Copy call link"]
					})]
				}),
				/* @__PURE__ */ Z("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3 text-xs",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-text-tertiary",
						children: "Document access stays unchanged."
					}), /* @__PURE__ */ Z(i, {
						variant: "link",
						onClick: _,
						"data-testid": "call-manage-access",
						className: "text-sm",
						children: "Manage access"
					})]
				})
			] })
		]
	});
}
//#endregion
export { xt as $, qn as A, un as B, hr as C, or as D, ar as E, bn as F, qt as G, rn as H, _n as I, wt as J, Vt as K, mn as L, Vn as M, Mn as N, rr as O, Sn as P, Lt as Q, fn as R, yr as S, ur as T, Qt as U, an as V, Zt as W, Et as X, Dt as Y, Tt as Z, Er as _, Ne as _t, Xr as a, mt as at, Sr as b, we as bt, Wr as c, at as ct, Br as d, Ge as dt, yt as et, zr as f, Le as ft, Or as g, Pe as gt, Ar as h, Ie as ht, Zr as i, pt as it, Hn as j, Qn as k, Hr as l, et as lt, jr as m, Ve as mt, ti as n, vt as nt, qr as o, ft as ot, Ir as p, ze as pt, Rt as q, $r as r, gt as rt, Kr as s, lt as st, ni as t, bt as tt, Vr as u, Xe as ut, Tr as v, ke as vt, pr as w, xr as x, Cr as y, De as yt, dn as z };
