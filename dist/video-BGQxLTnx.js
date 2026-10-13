import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n, r } from "./useAudioRecorder-BhPxnLmg.js";
import { n as i } from "./Button-uREUOWUk.js";
import { t as a } from "./overlayStack-D0Hf2ZrU.js";
import { t as o } from "./Chip-DJyxHDn3.js";
import { t as s } from "./IconButton-IE5g44md.js";
import { S as c, Y as l, Z as u, d, h as f, lt as p, n as m, tt as h, z as g } from "./Icons-B_xESAH3.js";
import { a as _, b as v, c as y, d as b, f as x, h as S, i as C, l as w, m as T, n as E, o as D, p as O, s as k, t as A, u as j, x as M, y as N } from "./MediaIcons-_ai5Til2.js";
import { i as P, t as F } from "./Text-BL8gq6ym.js";
import { t as I } from "./Badge-POenI45X.js";
import { t as ee } from "./Banner-8ngXUtJu.js";
import { t as L } from "./Modal-CjgKqXl7.js";
import { t as te } from "./Input-DE3zl--S.js";
import { t as R } from "./Select-DcKBWGgP.js";
import { t as z } from "./Tooltip-DWyAb81m.js";
import { t as B } from "./InlinePopover-Cc7F7MZm.js";
import { t as V } from "./FormField-BQhFpmZJ.js";
import { i as ne, n as re, r as ie, t as H } from "./Drawer-DFl86oc0.js";
import { t as ae } from "./Spinner-CYflBP-c.js";
import { n as oe, r as se, t as ce } from "./focusTrap-Cj-AL49l.js";
import { t as le } from "./SkeletonCard-D3FL0TB7.js";
import { n as ue, t as de } from "./Slider-DEbQCKD1.js";
import { t as fe } from "./DropdownMenu-B9nahmH-.js";
import { t as pe } from "./DockedPanelContext-pH9A5z1h.js";
import { t as me } from "./Textarea-BwvE1HPn.js";
import { n as he, t as ge } from "./Avatar-MKwdWqLr.js";
import { i as _e, r as ve, t as ye } from "./ChoiceList-DFLtTVha.js";
import { t as be } from "./SegmentedControl-DzCwfWbm.js";
import { t as xe } from "./Checkbox-C70AGFS5.js";
import { t as Se } from "./activationKey-CjbL3LUv.js";
import { C as Ce, P as we, b as Te, y as Ee } from "./AudioVideoSettingsForm-PruwrzxO.js";
import { useCallback as U, useEffect as W, useImperativeHandle as De, useLayoutEffect as Oe, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as J, jsx as Y, jsxs as X } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var ke = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function Ae({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = K(null), [m, h] = q("idle"), g = c ?? m;
	W(() => {
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
	}, [d, f]), W(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let _ = g !== "playing", v = ke[g];
	return /* @__PURE__ */ X("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ Y("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), _ && v && /* @__PURE__ */ X("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ Y(je, {}), /* @__PURE__ */ Y("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: v
			})]
		})]
	});
}
function je() {
	return /* @__PURE__ */ X("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ Y("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ Y("path", {
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
function Me(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function Ne({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: o = !0, muted: s = !1, hideDownload: c = !1, header: l, footer: u, className: d }) {
	let f = G(() => n.filter((e) => !!e.url), [n]), [p, m] = q(0), h = f[p], g = K(null), _ = K(null), v = a(!0);
	return W(() => {
		let e = (e) => {
			if (v()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				se(e, g.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, v]), W(() => (_.current = typeof document < "u" ? document.activeElement : null, ce(g.current), () => {
		oe(_.current), _.current = null;
	}), []), /* @__PURE__ */ Y("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ X("div", {
			ref: g,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", d),
			children: [
				(r || i || l) && /* @__PURE__ */ X("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ X("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ Y("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ Y("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ X("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [l, /* @__PURE__ */ Y("button", {
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				h ? /* @__PURE__ */ Y("video", {
					src: h.url,
					controls: !0,
					autoPlay: o,
					muted: s,
					className: "w-full max-h-[70vh] bg-black"
				}, h.url) : /* @__PURE__ */ Y("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				f.length > 1 && /* @__PURE__ */ Y("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: f.map((t, n) => {
						let r = n === p;
						return /* @__PURE__ */ Y("button", {
							type: "button",
							onClick: () => m(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : Me(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(u || !c && h) && /* @__PURE__ */ X("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ Y("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: u
					}), !c && h && /* @__PURE__ */ Y("a", {
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
function Pe(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function Fe({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ Y("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", Pe(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ Y("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ X("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ Y("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ Y("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var Ie = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, Le = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, Re = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function ze({ quality: t, className: n, style: r }) {
	let i = Ie[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ X("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ Y("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ Y("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ Y("span", {
			className: Le[t],
			children: Re[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function Be({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ Y("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ Y(we, {
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
var Ve = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function He(e) {
	return Ve[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function Ue({ reactions: t, className: n, style: r }) {
	let [i, a] = q([]);
	return W(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), W(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ Y("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ Y("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var We = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function Ge({ onReact: t, emojis: n = We, className: r, style: i }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": "reaction-picker",
		className: e("flex gap-1 px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border", r),
		style: i,
		children: n.map((n) => {
			let r = He(n);
			return /* @__PURE__ */ Y("button", {
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
var Ke = /* @__PURE__ */ X("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ Y("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ Y("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ Y("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ Y("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function qe({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, tone: o = "chrome", className: s }) {
	let [c, l] = q(!1);
	return /* @__PURE__ */ X("div", {
		className: e("relative inline-flex", s),
		children: [/* @__PURE__ */ Y("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": c,
			disabled: a,
			onClick: () => l((e) => !e),
			"data-testid": "reaction-picker-open",
			"data-tone": o,
			className: e(o === "surface" ? ["w-8 h-8 rounded-md flex items-center justify-center border border-solid border-border cursor-pointer transition-colors duration-150", c ? "bg-surface-inset text-text-primary" : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", c ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"], a && "opacity-40 cursor-not-allowed"),
			children: Ke
		}), c && /* @__PURE__ */ Y(Ge, {
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
var Je = 3, Ye = 1500, Xe = 200;
function Ze({ reactions: e, currentTimeMs: t, className: n }) {
	let r = G(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = K(t), a = K([]), [o, s] = q([]);
	return W(() => {
		let e = i.current;
		if (i.current = t, t < e - Ye) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > Je ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), W(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, Xe);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ Y("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ Y(Ue, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function Qe(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function $e(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var et = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, tt = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function nt({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ X("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ X("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ Y("span", { className: e("w-[7px] h-[7px] rounded-full", et[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ Y("span", {
					className: e("font-semibold", tt[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ Y("span", { children: Qe(n) }),
			i !== void 0 && /* @__PURE__ */ Y("span", { children: $e(i) }),
			r !== void 0 && /* @__PURE__ */ X("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ X("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ Y("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ Y("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function rt(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function it(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function at({ participant: e, size: t = 32 }) {
	let n = it(e.displayName);
	return /* @__PURE__ */ X("div", {
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
			e.avatarUrl ? /* @__PURE__ */ Y("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : rt(e.displayName),
			e.isSpeaking && /* @__PURE__ */ Y("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ Y("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ X("svg", {
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
						/* @__PURE__ */ Y("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ Y("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ Y("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function ot({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ X("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ Y(at, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ X("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ Y(at, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var Z = {
	mic: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ Y("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ Y("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ Y("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ Y("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ Y("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ Y("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ Y("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ Y("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ Y("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ Y("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ Y("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ Y("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ Y("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ Y("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Y("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ Y("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ Y("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ Y("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ Y("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	}),
	more: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			})
		]
	})
};
function st({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s, expanded: c, buttonRef: l }) {
	return /* @__PURE__ */ Y("button", {
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
function ct({ controls: t }) {
	let [n, r] = q(!1), i = K(null), a = K(null);
	return W(() => {
		if (!n) return;
		let e = (e) => {
			i.current?.contains(e.target) || r(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [n]), /* @__PURE__ */ X("div", {
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
		children: [/* @__PURE__ */ Y(st, {
			icon: Z.more,
			label: "More call controls",
			active: n,
			expanded: n,
			buttonRef: a,
			onClick: () => r((e) => !e),
			testId: "call-controls-more-button"
		}), n && /* @__PURE__ */ Y("div", {
			role: "menu",
			"aria-label": "More call controls",
			"data-testid": "call-controls-overflow",
			className: "absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg",
			children: t.map((t) => /* @__PURE__ */ X("button", {
				type: "button",
				role: "menuitem",
				"data-testid": t.testId,
				"aria-label": t.label,
				onClick: () => {
					t.onClick(), r(!1);
				},
				className: e("flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors", t.active ? "bg-white/15 text-white" : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"),
				children: [/* @__PURE__ */ Y("span", {
					className: "shrink-0",
					"aria-hidden": "true",
					children: t.icon
				}), t.label]
			}, t.key))
		})]
	});
}
var lt = /* @__PURE__ */ new Set(["mute", "camera"]);
function ut({ mode: t, density: n = "full", isMuted: r = !1, isCameraOn: i = !0, isScreenSharing: a = !1, onToggleMute: o, onToggleCamera: s, onToggleScreenShare: c, onUpgradeToVideo: l, onEndCall: u, onAddParticipant: d, availableParticipants: f, currentParticipantIds: p, onOpenAddParticipant: m, extras: h, className: g }) {
	let [_, v] = q(!1), y = new Set(p ?? []), b = (f ?? []).filter((e) => !y.has(e.id)), x = [];
	o && x.push({
		key: "mute",
		icon: r ? Z.micOff : Z.mic,
		label: r ? "Unmute" : "Mute",
		active: r,
		onClick: o,
		testId: "mute-button"
	}), t === "video" && s && x.push({
		key: "camera",
		icon: i ? Z.camera : Z.cameraOff,
		label: i ? "Turn off camera" : "Turn on camera",
		active: !i,
		onClick: s,
		testId: "camera-button"
	}), t === "audio" && l && x.push({
		key: "upgrade",
		icon: Z.videoUpgrade,
		label: "Switch to video",
		onClick: l,
		testId: "upgrade-to-video-button"
	}), c && x.push({
		key: "screenshare",
		icon: Z.screenShare,
		label: a ? "Stop sharing" : "Share screen",
		active: a,
		onClick: c,
		testId: "screenshare-button"
	}), (d || m) && x.push({
		key: "add-participant",
		icon: Z.userPlus,
		label: "Add people to this call",
		active: _,
		onClick: m ?? (() => v((e) => !e)),
		testId: "add-participant-button"
	});
	let S = n === "compact", C = S ? x.filter((e) => lt.has(e.key)) : x, w = S ? x.filter((e) => !lt.has(e.key)) : [];
	return /* @__PURE__ */ X("div", {
		className: e("flex flex-col", g),
		children: [/* @__PURE__ */ X("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				C.map((e) => /* @__PURE__ */ Y(st, {
					icon: e.icon,
					label: e.label,
					active: e.active,
					onClick: e.onClick,
					testId: e.testId
				}, e.key)),
				w.length > 0 && /* @__PURE__ */ Y(ct, { controls: w }),
				h,
				u && /* @__PURE__ */ Y(st, {
					icon: Z.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: u,
					testId: "hangup-button"
				})
			]
		}), _ && d && !m && /* @__PURE__ */ X("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ X("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ Y("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: () => v(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), b.length === 0 ? /* @__PURE__ */ Y("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ Y("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: b.map((e) => /* @__PURE__ */ X("button", {
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						d(e.id), b.length <= 1 && v(!1);
					},
					children: [
						/* @__PURE__ */ Y(at, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ Y("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ Y("span", {
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
function dt(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var ft = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function pt(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function mt({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return dt(t) ? /* @__PURE__ */ X("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", ft[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ Y(ze, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ X("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ X("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ Y("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), pt(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ X("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ Y("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ X("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ Y("span", {
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
var ht = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, gt = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function _t(e) {
	return e.toggleTestId ?? ht[e.id] ?? `call-side-panel-open-${e.id}`;
}
function vt(e) {
	return e.panelTestId ?? gt[e.id] ?? `call-side-panel-body-${e.id}`;
}
function yt(e) {
	return e === "mini" ? "overlay" : "docked";
}
function bt(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ Y(E, { size: 16 });
		case "people": return /* @__PURE__ */ Y(N, { size: 16 });
		case "captions": return /* @__PURE__ */ Y(A, { size: 16 });
		case "devices": return /* @__PURE__ */ Y(S, { size: 16 });
		default: return null;
	}
}
function xt({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, tone: a = "chrome", className: o, "data-testid": s = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ Y("div", {
		"data-testid": s,
		className: e("flex items-center", a === "surface" ? "gap-2" : "gap-1", o),
		"data-tone": a,
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let o = t.id === n, s = i || t.disabled === !0;
			return /* @__PURE__ */ X("button", {
				type: "button",
				"aria-label": t.label,
				"aria-pressed": o,
				title: t.label,
				disabled: s,
				"data-testid": _t(t),
				"data-active": o ? "true" : "false",
				onClick: () => r?.(o ? null : t.id),
				className: e(a === "surface" ? ["relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid transition-colors duration-150", o ? "border-border bg-surface-inset text-text-primary" : "border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", o ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"], s ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? bt(t.id) ?? /* @__PURE__ */ Y("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ Y("span", {
					"data-testid": `${_t(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var St = "__legacy__";
function Ct({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = f ? t : [{
		id: St,
		label: s ?? "",
		content: c
	}], m = f ? n ?? null : a ? St : null, h = p.find((e) => e.id === m) ?? null;
	if (!h) return null;
	let g = yt(i), _ = f && p.length > 1;
	return /* @__PURE__ */ X("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": g,
		"data-call-side-panel-tab": f ? h.id : void 0,
		"aria-label": h.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", g === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ X("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [_ ? /* @__PURE__ */ Y("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: p.map((t) => {
					let n = t.id === h.id;
					return /* @__PURE__ */ Y("button", {
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
			}) : /* @__PURE__ */ Y("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: h.label
			}), /* @__PURE__ */ Y("button", {
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ Y("div", {
			role: _ ? "tabpanel" : void 0,
			"data-testid": f ? vt(h) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ Y(pe, {
				hasHeader: !0,
				fillsHeight: !0,
				children: h.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function wt(e) {
	return e === "docked" ? "window" : e;
}
function Tt(e) {
	return e === "window" ? "docked" : e;
}
function Et(e) {
	return e ? "mini" : "window";
}
var Dt = /* @__PURE__ */ new Set();
function Ot(e, t) {
	process.env.NODE_ENV !== "production" && (Dt.has(e) || (Dt.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var kt = "w-[380px]", At = "w-[480px]", jt = "h-[480px]", Mt = "application/x-call-dock";
function Nt(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function Pt({ stream: t, muted: n = !1, className: r }) {
	let i = K(null);
	return W(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ Y("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var Ft = {
	phoneEnd: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Y("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ Y("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ Y("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ Y("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ Y("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ Y("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ Y("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ Y("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	}),
	grip: /* @__PURE__ */ X("svg", {
		width: "10",
		height: "12",
		viewBox: "0 0 10 16",
		fill: "currentColor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ Y("circle", {
				cx: "3",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "7",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "3",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "7",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "3",
				cy: "13",
				r: "1.3"
			}),
			/* @__PURE__ */ Y("circle", {
				cx: "7",
				cy: "13",
				r: "1.3"
			})
		]
	}),
	dockTo: /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ Y("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "16",
			rx: "2"
		}), /* @__PURE__ */ Y("line", {
			x1: "15",
			y1: "4",
			x2: "15",
			y2: "20"
		})]
	})
};
function It({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ X("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ Y("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ Y("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ X("div", {
				className: "text-center",
				children: [/* @__PURE__ */ Y("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ Y("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: Ft.phoneEnd
				}), t && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: Ft.phoneAnswer
				})]
			})
		]
	});
}
function Lt({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, onAddParticipant: p, availableParticipants: m, onOpenAddParticipant: h, controlsExtras: g, onEndCall: _, layoutComponent: v, callStats: y }) {
	let b = t === "video" && s;
	return /* @__PURE__ */ X("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			v && /* @__PURE__ */ X("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [v, /* @__PURE__ */ Y(mt, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			!v && t === "video" && /* @__PURE__ */ X("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && b ? /* @__PURE__ */ Y(Pt, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ Y("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ Y(at, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ X("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ Y(Pt, { stream: r[0].videoStream }) : /* @__PURE__ */ Y("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ Y(at, {
								participant: r[0],
								size: 28
							})
						}), r[0].isMuted && /* @__PURE__ */ Y("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ X("svg", {
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
									/* @__PURE__ */ Y("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ Y("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ Y("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ Y(mt, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			!v && t === "audio" && /* @__PURE__ */ Y("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ Y(ot, {
					participants: r,
					localFallback: i,
					maxVisible: 4,
					avatarSize: 36
				})
			}),
			/* @__PURE__ */ X("div", {
				className: "text-center py-1.5 shrink-0",
				children: [a !== void 0 && /* @__PURE__ */ Y("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": a,
					children: Nt(a)
				}), /* @__PURE__ */ X("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ Y(ut, {
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
function Rt({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ X("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? Se(c) : void 0,
		children: [
			/* @__PURE__ */ Y("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ Y("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ Y("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ X("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ Y("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Nt(r)
						})
					]
				})
			}),
			/* @__PURE__ */ X("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ Y("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ X(J, { children: [
							/* @__PURE__ */ Y("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ Y("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ Y("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ Y("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ Y("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ X("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ Y("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ Y("line", {
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
function zt(e) {
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
function Bt(e, t, n) {
	let [r, i] = q({
		x: 0,
		y: 0
	}), [a, o] = q(!1), [s, c] = q(!1), l = K(null), u = U(() => {
		l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 200);
	}, []);
	W(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let d = K(!1), f = K({
		x: 0,
		y: 0
	}), p = K({
		x: 0,
		y: 0
	}), m = K(null), h = K(null), g = K(null), _ = U((t) => {
		e && (h.current = m.current?.getBoundingClientRect() ?? null, g.current = h.current, d.current = !0, o(!0), c(!1), f.current = {
			x: t.clientX,
			y: t.clientY
		}, p.current = { ...r }, t.preventDefault());
	}, [e, r]), v = U(() => {
		c(!0), i({
			x: 0,
			y: 0
		}), u();
	}, [u]), y = U((e) => {
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
	}, [r, u]), b = K(v);
	b.current = v;
	let x = K(t);
	x.current = t;
	let S = K(n);
	S.current = n;
	let C = K(null);
	return W(() => {
		if (!e) return;
		let t = (e) => {
			if (!d.current) return;
			i({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
			let t = h.current;
			t && (g.current = new DOMRect(t.left + e.clientX - f.current.x, t.top + e.clientY - f.current.y, t.width, t.height));
			let n = (g.current ? zt(g.current) : null)?.id ?? null;
			n !== C.current && (C.current = n, x.current?.(n));
		}, n = () => {
			if (!d.current) return;
			d.current = !1, o(!1);
			let e = m.current;
			if (!e) return;
			let t = g.current ?? e.getBoundingClientRect(), n = zt(t);
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
function Vt({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ Y("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ Y("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ Y("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ Y("rect", {
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
function Ht({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: b, onMinimize: x, onExpand: S, layoutComponent: C, callStats: w, displayMode: T, minimized: E, sidePanelTabs: D, activeSidePanelTab: O = null, onSidePanelTabChange: k, sidePanelWidthClassName: A = "w-80", dockTargets: j, activeDockId: M = null, onDockTo: N, onDragStateChange: P, position: F = "bottom-right", contained: I = !1, draggable: ee = !0, className: L, style: te, dataAttrs: R }) {
	T !== void 0 && E !== void 0 && Ot("CallWidget", "minimized");
	let z = T ?? Et(E ?? !1), B = z === "mini", V = D ?? [], ne = V.length > 0 && !B && t === "active", re = ne && V.some((e) => e.id === O), ie = (j ?? []).length > 0, H = ie && M != null, ae = ee && !H, oe = R?.["data-call-id"], se = oe == null || oe === "" ? void 0 : String(oe), ce = U((e) => {
		let t = e.dataTransfer;
		if (!t) return;
		let n = {
			callId: se,
			fromDockId: M ?? null
		};
		t.setData(Mt, JSON.stringify(n)), t.effectAllowed = "move";
	}, [se, M]), { offset: le, handleMouseDown: ue, resetOffset: de, snapToCorner: fe, isDragging: pe, isAnimating: me, hasMoved: he, widgetRef: ge } = Bt(ae, U((e) => {
		for (let t of document.querySelectorAll("[data-call-dock-target]")) e && t.dataset.callDockTarget === e ? t.dataset.pointerOver = "true" : delete t.dataset.pointerOver;
	}, []), U((e) => N ? (N(e), !0) : !1, [N])), _e = K(P);
	_e.current = P, W(() => {
		_e.current?.(pe);
	}, [pe]);
	let ve = {};
	if (R) for (let [e, t] of Object.entries(R)) t != null && t !== "" && (ve[e] = t);
	let ye = G(() => {
		switch (F) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [F]);
	if (t === "idle" || t === "ended") return null;
	let be = /* @__PURE__ */ X(J, { children: [
		t === "ringing" && /* @__PURE__ */ Y(It, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ X("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ Y("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ Y("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ Y(Lt, {
			mode: n,
			fillHeight: re,
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
			controlsExtras: ne ? /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(xt, {
				tabs: V,
				activeTab: O,
				onTabChange: k
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: C,
			callStats: w
		})
	] });
	return /* @__PURE__ */ X(J, { children: [pe && /* @__PURE__ */ Y(Vt, {
		onSnap: fe,
		contained: I
	}), /* @__PURE__ */ Y("div", {
		ref: ge,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": z,
		"data-call-widget-mode-legacy": Tt(z),
		"data-call-dock-id": H ? M : void 0,
		className: e(H ? "relative" : [I ? "absolute z-50" : "fixed z-[10001]", ye], L),
		style: {
			transform: H ? void 0 : `translate(${le.x}px, ${le.y}px)`,
			transition: me ? "transform 0.2s ease-out" : void 0,
			...te
		},
		...ve,
		children: /* @__PURE__ */ X("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", B ? "w-[260px]" : re ? "w-auto" : kt),
			"data-call-side-panel-open": re ? "true" : "false",
			children: [
				!B && /* @__PURE__ */ X("div", {
					className: e("relative flex items-center justify-between px-3 py-2 border-b border-white/5", ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					draggable: H || void 0,
					onDragStart: ie ? ce : void 0,
					"data-call-dock-source": ie ? "true" : void 0,
					children: [/* @__PURE__ */ X("div", {
						className: "flex items-center gap-2",
						children: [
							ie && /* @__PURE__ */ Y("span", {
								draggable: H || void 0,
								className: "flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors",
								title: "Drag the call into the page",
								"data-testid": "call-dock-drag-handle",
								"aria-hidden": !0,
								children: Ft.grip
							}),
							/* @__PURE__ */ Y("span", { className: "w-2 h-2 rounded-full bg-success" }),
							/* @__PURE__ */ Y("span", {
								className: "text-white/80 text-xs font-medium",
								"data-testid": "call-widget-title",
								children: n === "video" ? "Video Call" : "Audio Call"
							})
						]
					}), /* @__PURE__ */ X("div", {
						className: "flex items-center gap-1",
						children: [
							he && /* @__PURE__ */ Y("button", {
								type: "button",
								onClick: de,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: Ft.snapBack
							}),
							S && /* @__PURE__ */ Y("button", {
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ Y("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ Y("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							x && /* @__PURE__ */ Y("button", {
								type: "button",
								onClick: x,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: Ft.minimize
							})
						]
					})]
				}),
				B && /* @__PURE__ */ Y("div", {
					className: e(ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					children: /* @__PURE__ */ Y(Rt, {
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
				!B && (re ? /* @__PURE__ */ X("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ Y("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: be
					}), /* @__PURE__ */ Y(Ct, {
						mode: z,
						tabs: V,
						activeTab: O,
						onTabChange: k,
						widthClassName: A
					})]
				}) : be)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function Ut({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", media: o, onJoin: s, onDismiss: c, autoExpireSec: l = 30, className: u, style: d }) {
	let [f, p] = q(!0), m = t(c);
	if (W(() => {
		if (!l || l <= 0) return;
		let e = setTimeout(() => {
			p(!1), m();
		}, l * 1e3);
		return () => clearTimeout(e);
	}, [l, m]), !f) return null;
	let h = [o === "audio" ? "Audio call" : o === "video" ? "Video call" : null, i].filter(Boolean).join(" · ");
	return /* @__PURE__ */ X("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-call-media": o,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", u),
		style: d,
		children: [
			/* @__PURE__ */ Y(Wt, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ X("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ Y("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), h && /* @__PURE__ */ Y("p", {
					className: "text-xs text-white/60 m-0 truncate",
					"data-testid": "incoming-call-subtitle",
					children: h
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: () => {
						p(!1), c();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), s && /* @__PURE__ */ Y("button", {
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
function Wt({ name: e, avatarUrl: t }) {
	let n = Kt(e);
	return /* @__PURE__ */ X("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ Y("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : Gt(e), /* @__PURE__ */ Y("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function Gt(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function Kt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function qt(e) {
	let t = e.split("#")[0].split("?")[0].toLowerCase();
	return t.endsWith(".m3u8") ? "hls" : /\.(mp4|m4v|mov|webm|ogv|ogg|m4a|mp3|wav|aac)$/.test(t) ? "progressive" : "unknown";
}
function Jt(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function Yt({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = K(null), d = K(null), f = K(s);
	f.current = s;
	let [p, m] = q(!1), [h, g] = q(0), [_, v] = q(0), [y, b] = q(1), [x, S] = q(1), [C, w] = q(!1), [T, E] = q(null);
	W(() => {
		let e = u.current;
		if (!e || !t) return;
		if (E(null), w(!0), qt(t) === "progressive" || e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
	}, M = G(() => _ > 0 ? Math.min(100, h / _ * 100) : 0, [h, _]);
	return /* @__PURE__ */ X("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ Y("video", {
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
			C && !T && /* @__PURE__ */ Y("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			T && /* @__PURE__ */ Y("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: T
			}),
			/* @__PURE__ */ X("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ X("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ Y("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: Jt(h)
						}),
						/* @__PURE__ */ Y("input", {
							type: "range",
							min: 0,
							max: isFinite(_) ? _ : 0,
							step: .1,
							value: h,
							onChange: O,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${M}%` }
						}),
						/* @__PURE__ */ Y("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: Jt(_)
						})
					]
				}), /* @__PURE__ */ X("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ Y("button", {
							type: "button",
							onClick: D,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ X("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ Y("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ Y("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ Y("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ Y("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ X("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ Y("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ Y("input", {
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
						/* @__PURE__ */ Y(R, {
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
						/* @__PURE__ */ Y("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ Y("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ Y("button", {
							type: "button",
							onClick: j,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ Y("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ Y("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function Xt(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function Zt(e) {
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
function Qt({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ X("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ Y("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ Y("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function $t({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ X("div", {
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
			/* @__PURE__ */ X("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ Y("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ Y("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ Y("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ Y("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ Y(Qt, { status: s }),
					/* @__PURE__ */ Y("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: Xt(r)
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ Y("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? Zt(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ X("span", {
					className: "inline-flex shrink-0 items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)]",
					title: `${i} ${i === 1 ? "person" : "people"} in this call`,
					children: [i, /* @__PURE__ */ Y(N, { size: 12 })]
				})]
			}),
			o && /* @__PURE__ */ Y("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: Zt(n)
			}),
			u && /* @__PURE__ */ Y("div", {
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
function en({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ Y("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ X("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ Y("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ Y("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ Y("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ Y("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ Y($t, {
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
var tn = 864e5, nn = [
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
function rn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function an(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
function on(e, t, n = Date.now()) {
	if (e === "never") return null;
	let r = nn.find((t) => t.id === e);
	if (r?.days) return new Date(n + r.days * tn).toISOString();
	if (e === "custom") {
		if (!t) return;
		let e = /* @__PURE__ */ new Date(`${t}T23:59:59`);
		return Number.isNaN(e.getTime()) ? void 0 : e.toISOString();
	}
}
function sn({ open: e, expiresAt: t, onSave: n, onClose: r, title: a = "Recording expiry", "data-testid": o = "recording-expiry-dialog" }) {
	let [s, c] = q(t === null ? "never" : "custom"), [l, u] = q(t ? an(Date.parse(t)) : ""), [d, f] = q(!1), [p, m] = q(null);
	W(() => {
		e && (c(t === null ? "never" : "custom"), u(t ? an(Date.parse(t)) : ""), m(null), f(!1));
	}, [e, t]);
	let h = G(() => on(s, l), [s, l]), g = typeof h == "string" && Date.parse(h) < Date.now() + 36e5, _ = h !== void 0 && !g && !d, v = t === null ? "This recording does not expire." : t ? `Set to expire ${rn(t)}.` : "No expiry is recorded.", y = async () => {
		if (h !== void 0) {
			f(!0), m(null);
			try {
				await n(h), r();
			} catch (e) {
				m(e instanceof Error ? e.message : String(e)), f(!1);
			}
		}
	};
	return /* @__PURE__ */ Y(L, {
		open: e,
		onClose: r,
		title: a,
		maxWidth: 440,
		footer: /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(i, {
			variant: "secondary",
			size: "sm",
			onClick: r,
			disabled: d,
			"data-testid": `${o}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ Y(i, {
			variant: "primary",
			size: "sm",
			onClick: () => void y(),
			disabled: !_,
			"data-testid": `${o}-save`,
			children: d ? "Saving…" : "Save"
		})] }),
		children: /* @__PURE__ */ X("div", {
			className: "flex min-h-[19rem] flex-col gap-3 text-sm",
			"data-testid": o,
			children: [
				/* @__PURE__ */ Y("p", {
					className: "m-0 text-text-secondary",
					"data-testid": `${o}-current`,
					children: v
				}),
				/* @__PURE__ */ Y(ye, {
					"data-testid": `${o}-choices`,
					children: nn.map((e) => /* @__PURE__ */ Y(ve, {
						title: e.title,
						selected: s === e.id,
						onSelect: () => c(e.id),
						disabled: d,
						"data-testid": `${o}-choice-${e.id}`
					}, e.id))
				}),
				s === "custom" && /* @__PURE__ */ Y(V, {
					label: "Expires on",
					hint: "At the end of that day, your local time.",
					...g ? { error: "Pick a date at least an hour from now." } : {},
					children: (e) => /* @__PURE__ */ Y("input", {
						...e,
						type: "date",
						value: l,
						min: an(Date.now()),
						onChange: (e) => u(e.target.value),
						className: "rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary",
						"data-testid": `${o}-date`
					})
				}),
				p && /* @__PURE__ */ Y("p", {
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
function cn(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function ln(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function un(e) {
	let t = e.speakerId || e.speakerLabel;
	return t ? `hsl(${ln(t)}, 65%, 60%)` : null;
}
var dn = "Speaker";
function fn({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, errorDetail: s, pendingMessage: c, idleState: l, className: u }) {
	let d = K(null), f = G(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return W(() => {
		if (f < 0 || !d.current) return;
		let e = d.current.querySelector(`[data-seg-index="${f}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [f]), t === "idle" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Y("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-tertiary",
			children: l ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ Y("span", { children: a }),
				/* @__PURE__ */ Y("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Y("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-secondary",
			children: c ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", u),
		children: [
			/* @__PURE__ */ X("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [a, " — failed"]
			}),
			/* @__PURE__ */ Y("div", {
				className: "text-sm text-text-secondary",
				children: o ?? "Transcript generation failed. Reach out to support if this persists."
			}),
			/* @__PURE__ */ Y(ne, {
				text: s,
				className: "mt-2"
			})
		]
	}) : !n || n.length === 0 ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Y("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", u),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ X("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ Y("div", {
			ref: d,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === f, a = un(t), o = !!i;
				return /* @__PURE__ */ X("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? Se(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${cn(t.startMs)} — ${t.speakerLabel ?? dn}` : void 0,
					children: [/* @__PURE__ */ X("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ Y("span", {
							className: e("text-xs font-semibold", !a && "text-text-secondary"),
							...a ? { style: { color: a } } : {},
							children: t.speakerLabel ?? dn
						}), /* @__PURE__ */ Y("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: cn(t.startMs)
						})]
					}), /* @__PURE__ */ Y("p", {
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
function pn({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, errorDetail: o, pendingMessage: s, idleState: c, className: l }) {
	return t === "idle" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Y("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ Y("span", { children: i }), /* @__PURE__ */ Y("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-secondary",
			children: s ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-danger-border bg-surface p-4", l),
		children: [
			/* @__PURE__ */ X("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [i, " — failed"]
			}),
			/* @__PURE__ */ Y("div", {
				className: "text-sm text-text-secondary",
				children: a ?? "Summary generation failed."
			}),
			/* @__PURE__ */ Y(ne, {
				text: o,
				className: "mt-2"
			})
		]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Y("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Y("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ X("section", {
		className: e("rounded-lg border border-border bg-surface flex flex-col", l),
		children: [/* @__PURE__ */ Y("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ Y("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ Y("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function mn({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = q(!1), [o, s] = q(!1);
	W(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), W(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = U(async () => {
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
	return /* @__PURE__ */ Y("button", {
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ Y("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ Y("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function hn(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function gn({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: i, title: a = "Participants", footer: o, tone: s = "light", className: c }) {
	let l = s === "dark", u = i ?? t.length;
	return /* @__PURE__ */ X("aside", {
		className: e("flex flex-col w-64 shrink-0", l ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", c),
		"aria-label": "Call participants",
		children: [
			/* @__PURE__ */ X("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", l ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ Y("h3", {
					className: e("text-sm font-semibold", l ? "text-white" : "text-[var(--color-text-primary)]"),
					children: a
				}), /* @__PURE__ */ Y("span", {
					className: e("text-xs tabular-nums", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					children: u
				})]
			}),
			/* @__PURE__ */ Y("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: t.map((t) => {
					let i = t.id === n;
					return /* @__PURE__ */ Y("li", { children: /* @__PURE__ */ X("button", {
						type: "button",
						onClick: r ? () => r(t.id) : void 0,
						className: e("w-full flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", i && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
						disabled: !r,
						children: [
							/* @__PURE__ */ X("div", {
								className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", i && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
								children: [t.avatarUrl ? /* @__PURE__ */ Y("img", {
									src: t.avatarUrl,
									alt: "",
									className: "w-full h-full rounded-full object-cover"
								}) : /* @__PURE__ */ Y("span", { children: hn(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ Y("span", {
									title: "Sharing screen",
									className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
								})]
							}),
							/* @__PURE__ */ X("span", {
								className: e("flex-1 truncate text-sm", l ? "text-white/90" : "text-[var(--color-text-primary)]"),
								children: [t.displayName, t.isLocal && /* @__PURE__ */ Y("span", {
									className: e("ml-1 text-xs", l ? "text-white/50" : "text-[var(--color-text-secondary)]"),
									children: "(you)"
								})]
							}),
							t.handRaised && /* @__PURE__ */ Y("span", {
								title: "Hand raised",
								"aria-label": "Hand raised",
								children: "✋"
							}),
							t.isMuted && /* @__PURE__ */ Y("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								className: l ? "text-white/50" : "text-[var(--color-text-secondary)]",
								"aria-label": "Muted",
								children: /* @__PURE__ */ Y("path", {
									fill: "currentColor",
									d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
								})
							})
						]
					}) }, t.id);
				})
			}),
			o && /* @__PURE__ */ Y("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: o
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var _n = null;
function vn() {
	if (_n) return _n;
	try {
		return _n = new AudioContext(), _n;
	} catch {
		return null;
	}
}
function yn({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = q(!1);
	return W(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = vn();
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
	]), W(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var bn = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function xn() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function Sn({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = q(!1), c = K(null), l = a.videoRef ?? c, u = U((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = U(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		xn(), s(!1);
	}, [l]);
	return /* @__PURE__ */ X("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ Y(Ce, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ Y("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: d,
				className: e(bn, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var Cn = 1;
function wn({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = q(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== Cn ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: Tn(r.x, t.x),
				y: Tn(r.y, t.y),
				width: Tn(r.width, t.width),
				height: Tn(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = K(null), o = K(!1), s = K(r);
	s.current = r;
	let c = K({
		key: e,
		value: r
	}), l = U((e, t) => {
		try {
			let n = {
				v: Cn,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return W(() => {
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
	]), W(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: U((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function Tn(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var En = 320, Dn = 200, On = 640, kn = 400, An = 1440, jn = 900, Mn = 960, Nn = 600, Q = 8;
function Pn({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", inline: s = !1, onModeChange: c, persistKey: l, apiRef: u, defaultCorner: d = "bottom-right", expandable: f = !0, sidePanelTabs: p, activeSidePanelTab: m = null, onSidePanelTabChange: h, zIndex: g = 9999, className: _, "data-testid": v = "expandable-call-widget" }) {
	let y = o === "docked" ? "window" : o, b = G(() => y === "window" ? zn(Mn, Nn) : Bn(d), [y, d]), { state: x, setState: S } = wn({
		persistKey: l,
		defaults: {
			mode: y,
			x: b.x,
			y: b.y,
			width: Mn,
			height: Nn
		}
	}), [C, w] = q(!1), T = C ? "fullscreen" : x.mode, E = K(null), D = p ?? [], O = D.length > 0, k = O && D.some((e) => e.id === m), A = K(!1);
	W(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== E.current && C && (w(!1), A.current || S({ mode: "window" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [C, S]);
	let j = U(() => {
		let e = E.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => w(!0), () => {}) : w(!0);
	}, []), M = U(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = U((e) => {
		let t = wt(e);
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
				let e = zn(x.width, x.height);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && T === "window") {
				let e = Bn(d);
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
	W(() => {
		c?.(T);
	}, [T, c]), De(u, () => ({
		mode: T,
		setMode: N
	}), [T, N]);
	let P = K(null), F = U((e) => {
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
	]), I = U((e) => {
		let t = P.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Hn(t.origX + n, x.width, window.innerWidth), a = Hn(t.origY + r, x.height, window.innerHeight);
		S({
			x: i,
			y: a
		});
	}, [
		S,
		x.width,
		x.height
	]), ee = U((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), L = K(null), te = U((e) => {
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
	]), R = U((e) => {
		let t = L.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Vn(t.origW + n, On, Math.min(An, window.innerWidth - 16)), a = Vn(t.origH + r, kn, Math.min(jn, window.innerHeight - 16));
		S({
			width: i,
			height: a
		});
	}, [S]), z = U((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), L.current = null;
	}, []);
	Oe(() => {
		if (T !== "window") return;
		let e = () => {
			let e = Hn(x.x, x.width, window.innerWidth), t = Hn(x.y, x.height, window.innerHeight);
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
	let B = G(() => s ? {
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
		width: En,
		height: Dn,
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
	return /* @__PURE__ */ X("div", {
		ref: E,
		"data-testid": v,
		"data-call-widget-mode": T,
		"data-call-widget-mode-legacy": Tt(T),
		"data-call-side-panel-open": k ? "true" : "false",
		style: B,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", T === "fullscreen" ? "rounded-none" : "rounded-lg", _),
		children: [
			/* @__PURE__ */ X("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", T === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: F,
				onPointerMove: I,
				onPointerUp: ee,
				onPointerCancel: ee,
				children: [/* @__PURE__ */ X("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ Y("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ Y("span", {
							className: "truncate font-medium",
							"data-testid": "call-widget-window-title",
							children: t
						}),
						n && /* @__PURE__ */ Y("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ Y("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Nt(r)
						})
					]
				}), f && /* @__PURE__ */ X("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ Y(Fn, {
							active: T === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ Y(In, {})
						}),
						/* @__PURE__ */ Y(Fn, {
							active: T === "window",
							label: "Window",
							onClick: () => N("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ Y(Ln, {})
						}),
						/* @__PURE__ */ Y(Fn, {
							active: T === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(T === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ Y(Rn, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: e("relative flex-1 min-h-0 bg-black", k && "flex items-stretch"),
				children: [k ? /* @__PURE__ */ Y("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, k && /* @__PURE__ */ Y(Ct, {
					mode: T,
					tabs: D,
					activeTab: m,
					onTabChange: h,
					widthClassName: T === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || O) && /* @__PURE__ */ Y("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: O ? /* @__PURE__ */ X("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Y("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ Y(xt, {
						tabs: D,
						activeTab: m,
						onTabChange: h
					})]
				}) : a
			}),
			T === "window" && /* @__PURE__ */ Y("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: te,
				onPointerMove: R,
				onPointerUp: z,
				onPointerCancel: z,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ Y("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ Y("path", {
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
function Fn({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ Y("button", {
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
function In() {
	return /* @__PURE__ */ Y("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Y("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Ln() {
	return /* @__PURE__ */ Y("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Y("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Rn() {
	return /* @__PURE__ */ Y("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ Y("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function zn(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max(Q, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max(Q, Math.floor((window.innerHeight - t) / 2))
	};
}
function Bn(e) {
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
			x: t - En - Q,
			y: Q
		};
		case "bottom-left": return {
			x: Q,
			y: n - Dn - Q
		};
		default: return {
			x: t - En - Q,
			y: n - Dn - Q
		};
	}
}
function Vn(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Hn(e, t, n) {
	return Vn(e, Q, Math.max(Q, n - t - Q));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Un({ show: e, label: t }) {
	return e ? /* @__PURE__ */ X("div", {
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
function Wn({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ Y("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var Gn = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Kn = 3e3, qn = .35;
function Jn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Gn[Math.abs(t) % Gn.length];
}
function Yn({ lines: t, maxLines: n = 4, fadeAfterMs: r = Kn, now: i, className: a }) {
	let [, o] = q(0), s = i === void 0, c = t.length > 0;
	W(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = K(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(qn, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Kn);
	return f.length === 0 ? null : /* @__PURE__ */ X("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ Y("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ X("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ Y("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: Jn(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ Y("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var Xn = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Zn = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", Qn = "bg-surface-hover text-neutral hover:bg-surface-emphasis", $n = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function $({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? Zn : a === "danger" ? $n : Qn;
	return /* @__PURE__ */ Y("button", {
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", Xn[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function er(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function tr(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
var nr = "bg-white/15 text-white hover:bg-white/25", rr = "bg-white text-video-stage hover:bg-white";
function ir({ channelName: t, eyebrow: n, localIdentity: r, previewStream: a, permission: o, permissionMessage: s, audioEnabled: c, videoEnabled: l, onToggleAudio: u, onToggleVideo: d, onRetryPermission: f, participants: p, readyState: m, readyLoading: h = !1, effectsSlot: g, devicesSlot: y, devicesOpen: b, onToggleDevices: x, secondaryActions: w, onJoin: T, onCancel: E, joinLabel: D, joinDisabled: O, subtitleOverride: k, className: A, "data-testid": j }) {
	let N = K(null), [P, F] = q(!1);
	W(() => {
		N.current && a && (N.current.srcObject = a);
	}, [a]);
	let I = o === "granted", ee = tr(o), L = O ?? !I, te = D ?? (L && !I ? "Allow camera to join" : "Join now"), R = k ?? er(p, m, h), z = !!y, B = z && (b ?? P);
	function V(e) {
		b === void 0 && F(e), x?.(e);
	}
	return /* @__PURE__ */ Y("div", {
		"data-testid": j,
		className: e("flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary", A),
		children: /* @__PURE__ */ Y("div", {
			className: "mx-auto w-full max-w-5xl flex flex-col gap-4 px-4 py-4 sm:px-5",
			children: /* @__PURE__ */ X("div", {
				className: "flex flex-col lg:flex-row lg:items-start gap-4",
				children: [/* @__PURE__ */ X("section", {
					className: "w-full min-w-0 lg:flex-1 flex flex-col gap-4",
					children: [/* @__PURE__ */ X("div", {
						className: "relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage",
						children: [
							a && I && /* @__PURE__ */ Y("video", {
								ref: N,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !l && "opacity-0")
							}),
							I && !l && (r ? /* @__PURE__ */ Y("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ X("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ Y(ge, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ X("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ Y("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ Y("span", {
											className: "text-white/60 text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ Y("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-white/60 text-sm",
								children: "Camera off"
							})),
							o === "pending" && /* @__PURE__ */ Y("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ Y(ae, { size: "lg" })
							}),
							ee && /* @__PURE__ */ Y("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ Y(re, {
									kind: "camera",
									state: ee,
									message: s,
									onRetry: f,
									"data-testid": "prejoin-permission-card"
								})
							}),
							/* @__PURE__ */ Y("div", {
								className: "absolute right-2 top-1/2 -translate-y-1/2 sm:right-3",
								children: /* @__PURE__ */ X("div", {
									className: "flex flex-col items-center gap-2 rounded-full bg-black/55 p-2 backdrop-blur-sm",
									children: [
										/* @__PURE__ */ Y($, {
											on: c,
											onClick: u,
											disabled: !I,
											"aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
											title: c ? "Mute mic before joining" : "Unmute mic before joining",
											iconOn: /* @__PURE__ */ Y(C, { size: 18 }),
											iconOff: /* @__PURE__ */ Y(_, { size: 18 }),
											className: e(c && nr),
											"data-testid": "prejoin-toggle-audio"
										}),
										/* @__PURE__ */ Y($, {
											on: l,
											onClick: d,
											disabled: !I,
											"aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
											title: l ? "Turn camera off before joining" : "Turn camera on before joining",
											iconOn: /* @__PURE__ */ Y(v, { size: 18 }),
											iconOff: /* @__PURE__ */ Y(M, { size: 18 }),
											className: e(l && nr),
											"data-testid": "prejoin-toggle-video"
										}),
										z && /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y("span", {
											"aria-hidden": "true",
											className: "h-px w-6 bg-white/20"
										}), /* @__PURE__ */ Y($, {
											on: B,
											onClick: () => V(!B),
											"aria-label": B ? "Close device settings" : "Open device settings",
											title: B ? "Close device settings" : "Open device settings",
											iconOn: /* @__PURE__ */ Y(S, { size: 18 }),
											iconOff: /* @__PURE__ */ Y(S, { size: 18 }),
											className: B ? rr : nr,
											"data-testid": "prejoin-devices-toggle"
										})] })
									]
								})
							})
						]
					}), g && /* @__PURE__ */ Y("div", {
						"data-testid": "prejoin-effects-slot",
						children: g
					})]
				}), /* @__PURE__ */ X("section", {
					className: "w-full lg:w-72 xl:w-80 lg:shrink-0 lg:self-stretch flex flex-col gap-3 lg:justify-between",
					children: [/* @__PURE__ */ X("div", {
						className: "flex flex-col gap-3 min-h-0",
						children: [/* @__PURE__ */ X("div", {
							className: "min-w-0",
							children: [
								n && /* @__PURE__ */ Y("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral",
									children: n
								}),
								/* @__PURE__ */ Y("h1", {
									"data-testid": "prejoin-title",
									className: "text-lg font-semibold leading-tight truncate",
									children: t
								}),
								/* @__PURE__ */ Y("p", {
									"data-testid": "prejoin-subtitle",
									className: "mt-0.5 text-xs text-neutral",
									children: R
								})
							]
						}), B ? /* @__PURE__ */ X("div", {
							"data-testid": "prejoin-devices-panel",
							className: "rounded-xl border border-border bg-surface p-3",
							children: [/* @__PURE__ */ X("div", {
								className: "flex items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ Y("h2", {
									className: "text-sm font-semibold",
									children: "Device settings"
								}), /* @__PURE__ */ Y(i, {
									variant: "ghost",
									size: "sm",
									onClick: () => V(!1),
									"data-testid": "prejoin-devices-close",
									children: "Close"
								})]
							}), y]
						}) : /* @__PURE__ */ X("div", {
							className: e(h || p && p.length > 0 ? "rounded-xl border border-border bg-surface p-3" : "px-0.5"),
							children: [/* @__PURE__ */ Y(ar, {
								participants: p,
								loading: h
							}), m === "pending" && !h && /* @__PURE__ */ X("p", {
								className: "mt-3 text-xs text-warning-fg flex items-center gap-2",
								children: [/* @__PURE__ */ Y("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
							})]
						})]
					}), /* @__PURE__ */ X("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ Y(i, {
								variant: "primary",
								size: "lg",
								fullWidth: !0,
								onClick: () => T({
									audio: c,
									video: l
								}),
								disabled: L,
								"data-testid": "prejoin-join-button",
								children: te
							}),
							w && /* @__PURE__ */ Y("div", {
								"data-testid": "prejoin-secondary-actions",
								children: w
							}),
							/* @__PURE__ */ Y("button", {
								type: "button",
								onClick: E,
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
function ar({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ Y(ae, { size: "sm" }), " Finding people…"]
	}) : !e || e.length === 0 ? /* @__PURE__ */ Y("div", {
		className: "text-xs text-neutral",
		children: "Nobody here yet."
	}) : /* @__PURE__ */ X("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ Y("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ X("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ X("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ Y(ge, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ Y("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ Y(o, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ X("li", {
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
var or = {
	active: "Recording — saved to /recordings when the call ends",
	armed: "Recording armed — will start once the call is under way"
};
function sr({ armed: e, active: t, titles: n, className: r, "data-testid": i = "recording-chip" }) {
	return !e && !t ? null : /* @__PURE__ */ Y(o, {
		tone: t ? "danger" : "neutral",
		size: "xs",
		uppercase: !0,
		dot: t ? "pulse" : "static",
		title: t ? n?.active ?? or.active : n?.armed ?? or.armed,
		className: r,
		"data-testid": i,
		"aria-label": t ? "Recording" : "Recording armed",
		children: "Rec"
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var cr = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, lr = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function ur() {
	return /* @__PURE__ */ X("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ Y("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ Y("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function dr({ channelName: t, subtitle: n, recording: r, elapsedLabel: i, phase: a, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ X("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ X("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ Y("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || r?.armed || i) && /* @__PURE__ */ X("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ Y("span", { children: n }),
					r?.armed && /* @__PURE__ */ Y(sr, {
						armed: r.armed,
						active: r.active,
						titles: { armed: "Recording armed — will start when someone joins" },
						"data-testid": "hangout-room-header-recording"
					}),
					i && /* @__PURE__ */ Y(o, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ Y(ur, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ Y("span", {
							className: "tabular-nums",
							children: i
						})
					})
				]
			})]
		}), (a || s) && /* @__PURE__ */ X("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [a && /* @__PURE__ */ Y(o, {
				tone: cr[a],
				size: "sm",
				dot: a === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: lr[a]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/HuddleBar.tsx
var fr = {
	idle: "offline",
	live: "online",
	connecting: "away",
	ringing: "away",
	reconnecting: "away",
	ended: "offline"
}, pr = {
	idle: "No call",
	live: "Live",
	connecting: "Connecting",
	ringing: "Ringing",
	reconnecting: "Reconnecting",
	ended: "Ended"
}, mr = {
	idle: null,
	live: null,
	connecting: "Connecting…",
	ringing: "Ringing…",
	reconnecting: "Reconnecting…",
	ended: "Ended"
};
function hr(e, t) {
	let [n, r] = q(() => Date.now());
	return W(() => {
		if (!t || e == null) return;
		r(Date.now());
		let n = setInterval(() => r(Date.now()), 1e3);
		return () => clearInterval(n);
	}, [t, e]), t && e != null ? Math.max(0, n - e) : null;
}
function gr(e, t) {
	let n = `${e} joined`;
	return t > 0 ? `${n} · ${t} ringing` : n;
}
function _r({ name: t, showContext: n = !0, phase: r = "live", statusLabel: a, startedAt: o, participantCount: s, ringingCount: c = 0, mic: f, camera: p, shareSlot: m, onToggleChat: h, chatOpen: g = !1, chatUnread: _ = 0, onToggleMedia: v, mediaOpen: y = !1, mediaToggleLabel: b = "Participants", onStart: x, startLabel: S = "Huddle", startDisabledReason: C, chatLabel: w = "Chat", chatDisabledReason: T, onLeave: E, leaveLabel: D = "Leave", extras: O, className: k, "data-testid": A = "huddle-bar" }) {
	let M = hr(o, r === "live"), N = a === void 0 ? mr[r] : a, P = (e, t) => /* @__PURE__ */ Y(Te, {
		kind: e,
		on: t.on,
		onToggle: t.onToggle,
		devices: t.devices ?? [],
		onSelectDevice: t.onSelectDevice ?? (() => {}),
		permission: t.permission ?? "granted",
		deviceMenu: !!(t.devices && t.onSelectDevice),
		...t.selectedDeviceId === void 0 ? {} : { selectedDeviceId: t.selectedDeviceId },
		...t.level === void 0 ? {} : { level: t.level },
		...t.disabledReason === void 0 ? {} : { disabledReason: t.disabledReason },
		"data-testid": `${A}-${e === "microphone" ? "mic" : "camera"}`
	});
	return /* @__PURE__ */ X("div", {
		role: "group",
		"aria-label": r === "idle" ? t : `${t} huddle`,
		"data-testid": A,
		"data-phase": r,
		className: e("@container flex min-w-0 items-center gap-3 px-3 py-1.5", k),
		children: [n && /* @__PURE__ */ X("div", {
			className: "flex min-w-0 items-center gap-2",
			"data-testid": `${A}-status`,
			children: [
				/* @__PURE__ */ Y(_e, {
					state: fr[r],
					ariaLabel: pr[r],
					"data-testid": `${A}-dot`
				}),
				/* @__PURE__ */ Y(F, {
					className: "min-w-0 truncate",
					size: "xs",
					weight: r === "idle" ? "normal" : "medium",
					tone: r === "idle" ? "secondary" : "primary",
					title: t,
					"data-testid": `${A}-name`,
					children: t
				}),
				N != null && /* @__PURE__ */ Y(F, {
					className: "shrink-0",
					size: "xs",
					tone: "secondary",
					"data-testid": `${A}-phase`,
					children: N
				}),
				M !== null && /* @__PURE__ */ Y(F, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "tertiary",
					tabular: !0,
					"data-testid": `${A}-timer`,
					children: Ee(M)
				}),
				s !== void 0 && /* @__PURE__ */ Y(F, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "secondary",
					"data-testid": `${A}-people`,
					children: gr(s, c)
				})
			]
		}), /* @__PURE__ */ X("div", {
			className: "ml-auto flex shrink-0 items-center gap-2",
			children: [
				f && P("microphone", f),
				p && P("camera", p),
				m != null && /* @__PURE__ */ Y(F, {
					className: "items-center",
					"data-testid": `${A}-share`,
					children: m
				}),
				v && /* @__PURE__ */ X(i, {
					variant: y ? "secondary" : "ghost",
					size: "sm",
					onClick: v,
					"aria-pressed": y,
					"aria-expanded": y,
					"aria-label": b,
					title: b,
					"data-testid": `${A}-media`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Y(l, { size: 16 }), s !== void 0 && /* @__PURE__ */ Y(F, {
						tabular: !0,
						children: s
					})]
				}),
				r === "idle" && x && /* @__PURE__ */ X(i, {
					variant: "secondary",
					size: "sm",
					onClick: x,
					disabled: C !== void 0,
					title: C,
					"data-testid": `${A}-start`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Y(u, { size: 16 }), S]
				}),
				h && /* @__PURE__ */ X(F, {
					className: "relative inline-flex",
					children: [/* @__PURE__ */ X(i, {
						variant: g ? "secondary" : "ghost",
						size: "sm",
						onClick: h,
						"aria-pressed": g,
						"aria-label": w,
						disabled: T !== void 0,
						title: T,
						"data-testid": `${A}-chat`,
						className: "gap-1.5",
						children: [/* @__PURE__ */ Y(d, { size: 16 }), /* @__PURE__ */ Y(F, {
							className: "hidden @lg:inline",
							children: w
						})]
					}), _ > 0 && /* @__PURE__ */ Y(F, {
						className: "absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-[10px] leading-none text-white",
						weight: "semibold",
						"data-testid": `${A}-chat-unread`,
						children: _ > 99 ? "99+" : _
					})]
				}),
				O,
				r !== "idle" && E && /* @__PURE__ */ X(i, {
					variant: "danger-solid",
					size: "sm",
					onClick: E,
					"aria-label": D,
					"data-testid": `${A}-leave`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Y(j, { size: 16 }), /* @__PURE__ */ Y(F, {
						className: "hidden @lg:inline",
						children: D
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var vr = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, yr = {
	sm: 16,
	md: 20,
	lg: 24
};
function br({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ X("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ Y($, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ Y(C, { size: g }),
				iconOff: /* @__PURE__ */ Y(_, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ Y($, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ Y(v, { size: g }),
				iconOff: /* @__PURE__ */ Y(M, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ Y($, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ Y(O, { size: g }),
				iconOff: /* @__PURE__ */ Y(T, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ Y("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", vr[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ Y(j, { size: yr[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var xr = {
	devices: "Devices",
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function Sr({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", devicesContent: a, effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...a == null ? [] : ["devices"],
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = q(i);
	W(() => {
		t && m(i);
	}, [t, i]);
	let h = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ Y(L, {
		open: t,
		onClose: n,
		ariaLabel: u,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden",
		children: /* @__PURE__ */ X("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", d),
			children: [/* @__PURE__ */ X("header", {
				className: "flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3",
				children: [/* @__PURE__ */ Y("h2", {
					className: "m-0 text-sm font-semibold text-white",
					children: u
				}), /* @__PURE__ */ Y("button", {
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ X("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [l && /* @__PURE__ */ Y("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(Ce, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ Y("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ X("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ Y("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ X("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [f.length > 0 && /* @__PURE__ */ Y("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2",
						children: f.map((t) => /* @__PURE__ */ Y("button", {
							type: "button",
							role: "tab",
							"aria-selected": t === h,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === h ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: xr[t]
						}, t))
					}), /* @__PURE__ */ X("div", {
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
function Cr(e) {
	return `Start broadcasting this room and tell everyone in ${e ?? "the channel"}`;
}
var wr = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50", Tr = "text-xs text-text-tertiary";
function Er({ live: t = !1, starting: n = !1, onGoLive: r, onEndBroadcast: i, viewerCount: a, streamReady: o, connection: s = "online", channelName: c, error: l, endHint: u, label: d, disabled: f, className: p, "data-testid": m = "go-live" }) {
	if (t) {
		let t = s !== "online", n = t || o === !1;
		return /* @__PURE__ */ X("div", {
			className: e("flex flex-col gap-1", p),
			children: [/* @__PURE__ */ X("div", {
				"data-testid": m,
				"data-live": "true",
				"data-stream": o === void 0 ? "unknown" : o ? "ready" : "pending",
				"data-connection": s,
				className: "inline-flex items-center gap-2",
				children: [
					/* @__PURE__ */ X("span", {
						"data-testid": `${m}-status`,
						role: "status",
						className: e(wr, n ? "bg-warning-bg text-warning-fg" : "bg-danger text-white"),
						children: [/* @__PURE__ */ Y("span", {
							"aria-hidden": !0,
							className: e("h-1.5 w-1.5 rounded-full", n ? "bg-warning-fg" : "bg-white")
						}), t ? s === "offline" ? "You are offline — nobody is receiving this" : "Reconnecting — your audience may not be receiving this" : n ? "On the call — no stream yet" : "You are live"]
					}),
					!n && typeof a == "number" && Number.isFinite(a) && a >= 0 && /* @__PURE__ */ X("span", {
						"data-testid": `${m}-viewers`,
						className: Tr,
						children: [a, " watching"]
					}),
					i && /* @__PURE__ */ Y("button", {
						type: "button",
						"data-testid": `${m}-end`,
						onClick: i,
						className: e(wr, "cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover"),
						children: "End broadcast"
					})
				]
			}), (n || !i && u) && /* @__PURE__ */ Y("span", {
				"data-testid": `${m}-hint`,
				className: Tr,
				children: t ? s === "offline" ? "Your connection dropped. The broadcast resumes if it comes back." : "Your connection is unstable. What you see locally is not what they see." : n ? "Nobody can watch yet — the stream has not started." : u
			})]
		});
	}
	return /* @__PURE__ */ X("div", {
		className: e("flex flex-col gap-1", p),
		children: [
			/* @__PURE__ */ X("button", {
				type: "button",
				"data-testid": m,
				"data-live": "false",
				disabled: f || n,
				onClick: r,
				title: Cr(c),
				"aria-label": n ? "Going live…" : `${d ?? "Go live"} — ${Cr(c).toLowerCase()}`,
				className: e(wr, "cursor-pointer bg-danger text-white hover:opacity-90"),
				children: [/* @__PURE__ */ Y("span", {
					"aria-hidden": !0,
					className: "h-1.5 w-1.5 rounded-full bg-white"
				}), n ? "Going live…" : d ?? "Go live"]
			}),
			/* @__PURE__ */ Y("span", {
				"data-testid": `${m}-hint`,
				className: Tr,
				children: n ? "Connecting — this takes a few seconds." : `Starts a broadcast in ${c ?? "this channel"} and tells everyone there.`
			}),
			l && /* @__PURE__ */ Y("span", {
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
function Dr() {
	let [e, t] = q(!1), n = K(null);
	return {
		play: U(async (e) => {
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
function Or({ value: e, onChange: t, showCamera: n = !0, children: a, "data-testid": o = "device-settings" }) {
	let s = r(), { play: c, playing: l } = Dr();
	if (!s.supported) return /* @__PURE__ */ Y("p", {
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
	return /* @__PURE__ */ X("div", {
		"data-testid": o,
		className: "flex flex-col gap-3",
		children: [
			s.labelsHidden ? /* @__PURE__ */ Y("p", {
				"data-testid": `${o}-labels-hidden`,
				className: "m-0 text-xs text-text-tertiary",
				children: "Device names appear once the browser has been allowed to use your microphone or camera."
			}) : null,
			/* @__PURE__ */ X("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Microphone", /* @__PURE__ */ Y(R, {
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
			n ? /* @__PURE__ */ X("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Camera", /* @__PURE__ */ Y(R, {
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
			s.canSelectSpeaker ? /* @__PURE__ */ X("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Speaker", /* @__PURE__ */ X("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ Y(R, {
						size: "sm",
						"data-testid": `${o}-speaker`,
						value: e.speakerId ?? "",
						onChange: (n) => t({
							...e,
							speakerId: n.target.value || void 0
						}),
						options: u(s.speakers, e.speakerId),
						className: "min-w-0 flex-1"
					}), /* @__PURE__ */ Y(i, {
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
function kr(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Ar({ src: t, autoPlay: n = !1, onFirstPlay: r, onEnded: i, durationHint: a, size: o = "md", className: s, "data-testid": c = "audio-player" }) {
	let l = K(null), [u, d] = q(!1), [f, p] = q(0), [m, h] = q(a ?? 0), g = K(!1);
	W(() => {
		d(!1), p(0), h(a ?? 0), g.current = !1;
	}, [t, a]);
	let _ = () => {
		let e = l.current;
		e && (u ? e.pause() : e.play().catch(() => d(!1)));
	}, v = (e) => {
		let t = l.current;
		t && (t.currentTime = e, p(e));
	}, x = m > 0 ? m : Math.max(f, 1);
	return /* @__PURE__ */ X("div", {
		className: e("flex min-w-0 items-center gap-2", o === "sm" ? "text-xs" : "text-sm", s),
		"data-testid": c,
		"data-playing": u,
		children: [
			/* @__PURE__ */ Y("audio", {
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
			/* @__PURE__ */ Y($, {
				on: u,
				offTone: "neutral",
				size: o === "sm" ? "sm" : "md",
				"aria-label": u ? "Pause" : "Play",
				iconOn: /* @__PURE__ */ Y(y, { size: o === "sm" ? 14 : 18 }),
				iconOff: /* @__PURE__ */ Y(b, { size: o === "sm" ? 14 : 18 }),
				onClick: _,
				"data-testid": `${c}-toggle`
			}),
			/* @__PURE__ */ Y("span", {
				className: "w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary",
				"data-testid": `${c}-time`,
				children: kr(f)
			}),
			/* @__PURE__ */ Y(de, {
				"aria-label": "Seek",
				min: 0,
				max: x,
				step: .1,
				value: Math.min(f, x),
				onChange: v,
				className: "min-w-[96px] flex-1",
				"data-testid": `${c}-scrubber`
			}),
			/* @__PURE__ */ Y("span", {
				className: "w-9 shrink-0 font-mono tabular-nums text-text-tertiary",
				"data-testid": `${c}-duration`,
				children: kr(m)
			})
		]
	});
}
//#endregion
//#region src/components/video/VoicemailRecorder.tsx
function jr(e) {
	let t = Math.max(0, Math.floor(e / 1e3));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Mr({ open: e, onClose: t, recipientName: r, getStream: a, onSend: o, maxSeconds: s = 60, "data-testid": c = "voicemail-recorder" }) {
	let l = n({
		getStream: a,
		maxMs: s * 1e3
	}), [u, d] = q(!1), [f, p] = q(null), m = K(!1);
	W(() => {
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
	return /* @__PURE__ */ Y(L, {
		open: e,
		onClose: t,
		title: `Leave a voicemail for ${r}`,
		maxWidth: 440,
		footer: /* @__PURE__ */ X("div", {
			className: "flex w-full items-center justify-end gap-2",
			"data-testid": `${c}-actions`,
			children: [
				/* @__PURE__ */ Y(i, {
					variant: "ghost",
					size: "sm",
					onClick: t,
					disabled: u,
					"data-testid": `${c}-cancel`,
					children: "Cancel"
				}),
				l.state === "recording" && /* @__PURE__ */ Y(i, {
					variant: "primary",
					size: "sm",
					onClick: l.stop,
					"data-testid": `${c}-stop`,
					children: "Stop"
				}),
				(l.state === "recorded" || l.state === "error") && /* @__PURE__ */ Y(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void l.start(),
					disabled: u,
					"data-testid": `${c}-rerecord`,
					children: l.state === "error" ? "Try again" : "Re-record"
				}),
				l.state === "recorded" && /* @__PURE__ */ Y(i, {
					variant: "primary",
					size: "sm",
					onClick: () => void h(),
					disabled: u || !l.blob,
					"data-testid": `${c}-send`,
					children: u ? "Sending…" : "Send voicemail"
				})
			]
		}),
		children: /* @__PURE__ */ X("div", {
			className: "flex flex-col items-center gap-3 py-2",
			"data-testid": c,
			"data-state": l.state,
			children: [
				/* @__PURE__ */ X("div", {
					className: "flex items-center gap-2 text-sm text-text-secondary",
					role: "status",
					"data-testid": `${c}-status`,
					children: [l.state === "recording" && /* @__PURE__ */ Y("span", {
						"aria-hidden": "true",
						className: "inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger"
					}), g]
				}),
				/* @__PURE__ */ X("div", {
					className: "font-mono text-3xl tabular-nums text-text-primary",
					"data-testid": `${c}-clock`,
					children: [jr(l.elapsedMs), /* @__PURE__ */ X("span", {
						className: "text-base text-text-tertiary",
						children: [" / ", jr(s * 1e3)]
					})]
				}),
				l.state === "recorded" && l.url && /* @__PURE__ */ Y(Ar, {
					src: l.url,
					durationHint: l.elapsedMs / 1e3,
					className: "w-full",
					"data-testid": `${c}-preview`
				}),
				f && /* @__PURE__ */ Y("p", {
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
function Nr({ src: e, getAuthToken: t, onFirstPlay: n, eager: r = !1, className: a, "data-testid": o = "authed-audio" }) {
	let [s, c] = q(null), [l, u] = q("idle"), [d, f] = q(r), p = K(!1);
	return W(() => {
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
	}, [e, d]), l === "idle" ? /* @__PURE__ */ Y(i, {
		variant: "secondary",
		size: "sm",
		onClick: () => f(!0),
		"data-testid": `${o}-load`,
		children: "▶ Play"
	}) : l === "loading" ? /* @__PURE__ */ Y("span", {
		className: "text-sm text-text-tertiary",
		"data-testid": `${o}-loading`,
		children: "Loading…"
	}) : l === "error" || !s ? /* @__PURE__ */ Y(i, {
		variant: "ghost",
		size: "sm",
		onClick: () => {
			u("idle"), f(!1), setTimeout(() => f(!0), 0);
		},
		"data-testid": `${o}-error`,
		children: "Couldn’t load — retry"
	}) : /* @__PURE__ */ Y(Ar, {
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
function Pr(e) {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
function Fr({ title: t, subtitle: n, durationSeconds: r, live: i = !0, recording: a, onPopOut: o, popOutLabel: c = "Pop the call out", children: l, controls: u, aside: d, stage: f = "video", className: p, "data-testid": m = "embedded-call-panel" }) {
	return /* @__PURE__ */ X("section", {
		className: e("flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md", d && "@container", p),
		"aria-label": typeof t == "string" ? `Call: ${t}` : "Call",
		"data-testid": m,
		"data-stage": f,
		children: [
			/* @__PURE__ */ X("header", {
				className: "flex min-w-0 items-center gap-2 px-3 py-2",
				children: [
					i && /* @__PURE__ */ Y("span", {
						"aria-hidden": "true",
						className: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success"
					}),
					/* @__PURE__ */ Y("span", {
						className: "min-w-0 flex-1 truncate text-sm font-semibold",
						"data-testid": `${m}-title`,
						children: t
					}),
					a && /* @__PURE__ */ Y(sr, {
						armed: a.armed,
						active: a.active,
						className: "shrink-0",
						"data-testid": `${m}-recording`
					}),
					n && /* @__PURE__ */ Y("span", {
						className: "shrink-0 text-xs text-white/60",
						"data-testid": `${m}-subtitle`,
						children: n
					}),
					r !== void 0 && /* @__PURE__ */ Y("span", {
						className: "shrink-0 font-mono text-xs tabular-nums text-white/80",
						"data-testid": `${m}-duration`,
						children: Pr(r)
					}),
					o && /* @__PURE__ */ Y(s, {
						"aria-label": c,
						title: c,
						size: "sm",
						variant: "ghost",
						icon: /* @__PURE__ */ Y(x, { size: 16 }),
						onClick: o,
						className: "shrink-0 text-white/80 hover:text-white",
						"data-testid": `${m}-pop-out`
					})
				]
			}),
			d ? /* @__PURE__ */ X("div", {
				className: "flex min-h-0 min-w-0 flex-col @lg:flex-row",
				children: [/* @__PURE__ */ Y("div", {
					className: e("relative w-full min-w-0 bg-black/40 @lg:flex-1", f === "video" ? "aspect-video" : "min-h-[88px]"),
					"data-testid": `${m}-stage`,
					children: /* @__PURE__ */ Y("div", {
						className: "absolute inset-0",
						children: l
					})
				}), /* @__PURE__ */ Y("div", {
					className: "flex max-h-80 min-h-0 min-w-0 flex-col overflow-y-auto @lg:max-h-none @lg:shrink-0",
					"data-testid": `${m}-aside`,
					children: d
				})]
			}) : /* @__PURE__ */ Y("div", {
				className: e("relative w-full min-w-0 bg-black/40", f === "video" ? "aspect-video" : "min-h-[88px]"),
				"data-testid": `${m}-stage`,
				children: /* @__PURE__ */ Y("div", {
					className: "absolute inset-0",
					children: l
				})
			}),
			u && /* @__PURE__ */ Y("div", {
				className: "flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2",
				"data-testid": `${m}-controls`,
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/video/CallNoticePill.tsx
var Ir = {
	warning: "bg-warning/95 text-white",
	error: "bg-danger/95 text-white",
	info: "bg-black/70 text-white"
};
function Lr({ show: t, tone: n = "warning", message: r, actions: i, className: a, "data-testid": o = "call-notice" }) {
	return t ? /* @__PURE__ */ X("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		"data-tone": n,
		className: e("pointer-events-auto absolute left-1/2 top-3 z-30 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg", Ir[n], a),
		children: [/* @__PURE__ */ Y("span", {
			className: "min-w-0 truncate",
			children: r
		}), i && /* @__PURE__ */ Y("span", {
			className: "flex shrink-0 items-center gap-1",
			children: i
		})]
	}) : null;
}
//#endregion
//#region src/components/video/CallInterruptedNotice.tsx
function Rr({ show: t, title: n, description: r, actions: i, className: a, "data-testid": o = "call-interrupted-notice" }) {
	return t ? /* @__PURE__ */ X("div", {
		role: "alert",
		"aria-live": "assertive",
		"data-testid": o,
		className: e("pointer-events-auto absolute left-1/2 top-1/2 z-30 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2", "rounded-xl px-4 py-4 text-center shadow-2xl", "border border-call-chrome-border bg-call-chrome text-white", a),
		children: [
			/* @__PURE__ */ Y("p", {
				className: "m-0 text-sm font-semibold",
				children: n
			}),
			/* @__PURE__ */ Y("p", {
				className: "m-0 mt-1 text-xs leading-relaxed text-white/70",
				children: r
			}),
			i && /* @__PURE__ */ Y("div", {
				className: "mt-3 flex flex-wrap items-center justify-center gap-2",
				children: i
			})
		]
	}) : null;
}
//#endregion
//#region src/components/video/MediaPrecheckRow.tsx
var zr = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
};
function Br(e, t) {
	if (t === "denied") return zr[e];
	if (t === "unavailable") return e === "microphone" ? "No microphone found" : "No camera found";
}
function Vr({ micOn: t, cameraOn: n, showCamera: r = !0, permission: a, onToggleMic: o, onToggleCamera: s, onOpenSettings: c, testIdPrefix: l = "start-call-precheck", settingsTestId: u = "start-call-settings", className: d }) {
	let f = typeof a == "string" ? {
		microphone: a,
		camera: a
	} : a, p = Br("microphone", f.microphone), m = Br("camera", f.camera), h = t && !p, g = n && !m, y = (t) => e("inline-flex h-8 items-center gap-2 border-transparent px-2 py-0 font-medium", t ? "text-danger-fg" : "text-text-primary");
	return /* @__PURE__ */ X("div", {
		className: e("flex items-center gap-2", d),
		"data-testid": `${l}-row`,
		children: [
			/* @__PURE__ */ X(i, {
				variant: "ghost",
				onClick: o,
				disabled: !!p,
				title: p ?? (h ? "Turn microphone off" : "Turn microphone on"),
				"aria-pressed": h,
				"data-testid": `${l}-mic`,
				className: y(!!p),
				children: [Y(h ? C : _, { size: 18 }), h ? "Mic on" : "Mic off"]
			}),
			r && /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y("span", {
				"aria-hidden": "true",
				className: "h-5 w-px shrink-0 bg-border"
			}), /* @__PURE__ */ X(i, {
				variant: "ghost",
				onClick: s,
				disabled: !!m,
				title: m ?? (g ? "Turn camera off" : "Turn camera on"),
				"aria-pressed": g,
				"data-testid": `${l}-camera`,
				className: y(!!m),
				children: [Y(g ? v : M, { size: 18 }), g ? "Camera on" : "Camera off"]
			})] }),
			/* @__PURE__ */ Y(i, {
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
function Hr({ items: t, trailing: n, onRemove: r, onOpen: i, onSelect: a, onReorder: o, emptyLabel: l = "No documents yet", className: u, "data-testid": d = "review-document-list", rowTestIdPrefix: p = "call-document" }) {
	let [m, h] = q(null), g = n === "remove";
	if (t.length === 0) return /* @__PURE__ */ Y("p", {
		className: e("m-0 py-2 text-sm text-text-tertiary", u),
		"data-testid": d,
		children: l
	});
	let _ = (e) => (t) => {
		t.preventDefault(), m && o && o(m, e), h(null);
	};
	return /* @__PURE__ */ Y("ul", {
		className: e("m-0 flex list-none flex-col p-0", !g && "gap-1", u),
		"data-testid": d,
		children: t.map((t, l) => {
			let u = t.removable !== !1, d = t.sublineTone ? t.sublineTone === "accent" : t.selected;
			return /* @__PURE__ */ X("li", {
				"data-testid": `${p}-${t.id}`,
				"data-selected": t.selected ? "true" : "false",
				draggable: !!o,
				onDragStart: o ? () => h(t.id) : void 0,
				onDragOver: o ? (e) => e.preventDefault() : void 0,
				onDrop: o ? _(l) : void 0,
				className: e("group/doc flex items-center rounded-md", g ? "min-h-8 gap-2.5 px-0.5" : "min-h-[58px] gap-3 px-3 py-2", t.selected && "bg-primary-bg", !t.selected && !g && "hover:bg-surface-hover", a && "cursor-pointer", m === t.id && "opacity-50"),
				onClick: a ? () => a(t.id) : void 0,
				children: [
					/* @__PURE__ */ Y("span", {
						className: e("flex shrink-0 text-text-secondary", t.selected && "text-primary"),
						"aria-hidden": "true",
						children: t.icon ?? /* @__PURE__ */ Y(c, { size: g ? 18 : 24 })
					}),
					/* @__PURE__ */ X("span", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ Y("span", {
							className: e("truncate text-text-primary", g ? "text-sm" : "text-[15px] font-medium"),
							children: t.title
						}), t.subline != null && /* @__PURE__ */ Y("span", {
							className: e("truncate text-sm", d ? "text-primary" : "text-text-tertiary"),
							children: t.subline
						})]
					}),
					n === "remove" && u && r && /* @__PURE__ */ Y(s, {
						"aria-label": `Remove ${t.title}`,
						size: "sm",
						icon: /* @__PURE__ */ Y(f, { size: 14 }),
						onClick: (e) => {
							e.stopPropagation(), r(t.id);
						},
						"data-testid": `${p}-remove-${t.id}`,
						className: "shrink-0 text-text-secondary"
					}),
					n === "open" && i && /* @__PURE__ */ Y(s, {
						"aria-label": `Open ${t.title}`,
						title: `Open ${t.title}`,
						icon: /* @__PURE__ */ Y(x, { size: 18 }),
						onClick: (e) => {
							e.stopPropagation(), i(t.id);
						},
						"data-testid": `${p}-open-${t.id}`,
						className: "shrink-0 text-text-secondary"
					})
				]
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/video/CollaboratorCheckList.tsx
function Ur({ title: t, rows: n, selected: r, onToggle: i, loading: a = !1, emptyLabel: o = "No one else has this document open", footnote: s, className: c, "data-testid": l = "start-call-collaborators", rowTestIdPrefix: u = "start-call-collaborator" }) {
	let d = new Set(r);
	return /* @__PURE__ */ X("section", {
		className: e("flex flex-col", c),
		"data-testid": l,
		"aria-label": t,
		children: [
			t && /* @__PURE__ */ Y("h4", {
				className: "m-0 mb-1 text-sm font-normal text-text-secondary",
				children: t
			}),
			a ? /* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-2 py-1",
				"data-testid": `${l}-loading`,
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ Y(le, {
					height: 33,
					rounded: "md"
				}, e))
			}) : n.length === 0 ? /* @__PURE__ */ Y("p", {
				className: "m-0 py-2 text-sm text-text-tertiary",
				children: o
			}) : /* @__PURE__ */ Y("ul", {
				className: "m-0 flex list-none flex-col p-0",
				children: n.map((t) => {
					let n = d.has(t.userId), r = !!t.disabledReason;
					return /* @__PURE__ */ Y("li", { children: /* @__PURE__ */ X("label", {
						className: e("flex min-h-[39px] items-center gap-3 rounded-md", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
						title: t.disabledReason,
						"data-testid": `${u}-${t.userId}`,
						"data-checked": n ? "true" : "false",
						"data-presence": t.presence,
						children: [
							/* @__PURE__ */ X("span", {
								className: "relative inline-flex shrink-0",
								children: [/* @__PURE__ */ Y(ge, {
									name: t.name,
									size: 32,
									...t.avatarUrl ? { src: t.avatarUrl } : {},
									...t.color ? { color: t.color } : {},
									showTitle: !1
								}), /* @__PURE__ */ Y(_e, {
									state: t.presence,
									pulse: !1,
									size: "sm",
									className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-surface",
									"data-testid": `${u}-presence-${t.userId}`
								})]
							}),
							/* @__PURE__ */ Y("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: t.name
							}),
							/* @__PURE__ */ Y("span", {
								className: "w-20 shrink-0 text-xs text-text-tertiary",
								children: t.statusLabel
							}),
							/* @__PURE__ */ Y(xe, {
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
			s && /* @__PURE__ */ Y("p", {
				className: "m-0 mt-2 text-xs text-text-tertiary",
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/video/CallPeopleList.tsx
function Wr(e) {
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
var Gr = /* @__PURE__ */ new Set([
	"ringing",
	"notified",
	"missed",
	"declined",
	"left"
]);
function Kr({ people: t, count: n, followingUserId: r, canModerate: a, onInvite: o, onFollow: s, onMuteForMe: c, onMute: l, onRemove: u, onMakeHost: d, onRingAgain: f, onOpenSelfSettings: p, onLeave: m, hideHeading: h = !1, className: g, "data-testid": v = "call-people-list" }) {
	return /* @__PURE__ */ X("section", {
		className: e("flex flex-col", g),
		"data-testid": v,
		"aria-label": "People",
		children: [!h && /* @__PURE__ */ X("div", {
			className: "mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ Y("h3", {
					className: "m-0 text-base font-semibold text-text-primary",
					children: "People"
				}),
				/* @__PURE__ */ Y(I, {
					variant: "count",
					value: n,
					color: "muted",
					"aria-label": `${n} people`
				}),
				/* @__PURE__ */ Y(i, {
					variant: "ghost",
					size: "md",
					onClick: o,
					"data-testid": "call-invite",
					className: "ml-auto",
					children: "Invite..."
				})
			]
		}), /* @__PURE__ */ Y("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: t.map((t) => {
				let n = Wr(t), o = Gr.has(t.state), h = [];
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
				return n.label && (g = /* @__PURE__ */ X("span", {
					className: e("inline-flex items-center gap-1.5 truncate text-sm", n.tone === "accent" && "text-primary", n.tone === "muted" && "text-text-tertiary", n.tone === "warning" && "text-warning-fg"),
					"data-testid": `call-person-status-${t.userId}`,
					"data-status": n.kind,
					children: [
						n.kind === "ringing" && /* @__PURE__ */ Y("span", {
							"aria-hidden": "true",
							className: "h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
						}),
						n.label,
						n.kind === "presenting" && /* @__PURE__ */ Y(D, {
							size: 16,
							className: "ml-1"
						})
					]
				})), /* @__PURE__ */ X("li", {
					className: e("flex min-h-16 items-center gap-3", o && "opacity-60"),
					"data-testid": `call-person-${t.userId}`,
					"data-state": t.state,
					children: [
						/* @__PURE__ */ X("span", {
							className: "relative inline-flex shrink-0",
							children: [/* @__PURE__ */ Y(ge, {
								name: t.name,
								size: 46,
								...t.avatarUrl ? { src: t.avatarUrl } : {},
								...t.color ? { color: t.color } : {},
								showTitle: !1
							}), t.presence && t.state === "in-call" && !t.isLocal && /* @__PURE__ */ Y(_e, {
								state: t.presence,
								pulse: !1,
								className: "absolute bottom-0 right-0 rounded-full ring-2 ring-surface"
							})]
						}),
						/* @__PURE__ */ X("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ X("span", {
								className: "truncate text-[15px] text-text-primary",
								children: [t.name, t.isLocal && /* @__PURE__ */ Y("span", {
									className: "text-text-secondary",
									children: " (you)"
								})]
							}), g]
						}),
						t.state === "missed" && f ? /* @__PURE__ */ Y(i, {
							variant: "link",
							onClick: () => f(t.userId),
							className: "shrink-0 text-sm",
							"data-testid": `call-person-ring-${t.userId}`,
							children: "Ring again"
						}) : !o && /* @__PURE__ */ Y("span", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center text-text-secondary",
							"aria-label": t.audioOn ? "Microphone on" : "Microphone muted",
							role: "img",
							"data-testid": `call-person-mic-${t.userId}`,
							"data-audio": t.audioOn ? "on" : "off",
							children: t.audioOn ? /* @__PURE__ */ Y(C, { size: 20 }) : /* @__PURE__ */ Y(_, { size: 20 })
						}),
						h.length > 0 ? /* @__PURE__ */ Y(fe, {
							trigger: /* @__PURE__ */ Y(k, { size: 20 }),
							triggerLabel: `More for ${t.name}`,
							triggerVariant: "link",
							triggerClassName: "h-8 w-8 shrink-0 px-0",
							triggerTestId: `call-person-menu-${t.userId}`,
							align: "end",
							sections: [{ items: h }],
							"data-testid": `call-person-menu-panel-${t.userId}`
						}) : /* @__PURE__ */ Y("span", {
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
var qr = [
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
function Jr({ open: t, onClose: n, initialTab: r = "audio-video", tab: a, onTabChange: o, docked: s = !0, audioVideo: c, effects: l, captions: u, effectsFooter: d, width: f = 380, className: p, "data-testid": m = "call-settings-drawer" }) {
	let [h, g] = q(r);
	W(() => {
		t && g(r);
	}, [t, r]);
	let _ = a ?? h, v = (e) => {
		g(e), o?.(e);
	}, y = _ === "effects" && d ? /* @__PURE__ */ X("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ Y("span", {
				className: "mr-auto text-sm text-text-tertiary",
				"data-testid": "effects-changes",
				children: d.changeCount === 0 ? "No changes" : `${d.changeCount} ${d.changeCount === 1 ? "change" : "changes"}`
			}),
			/* @__PURE__ */ Y(i, {
				variant: "ghost",
				onClick: d.onCancel,
				"data-testid": "effects-cancel",
				children: "Cancel"
			}),
			/* @__PURE__ */ Y(i, {
				onClick: d.onApply,
				disabled: d.changeCount === 0 || d.applying,
				"data-testid": "effects-apply",
				children: "Apply"
			})
		]
	}) : /* @__PURE__ */ X("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ Y("span", {
			className: "mr-auto text-xs text-text-tertiary",
			children: "Devices update immediately"
		}), /* @__PURE__ */ Y(i, {
			onClick: n,
			"data-testid": "settings-done",
			children: "Done"
		})]
	});
	return /* @__PURE__ */ X(H, {
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
		children: [/* @__PURE__ */ Y("div", {
			className: "shrink-0 px-5",
			children: /* @__PURE__ */ Y(P, {
				items: qr.map((e) => ({
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
		}), /* @__PURE__ */ X("div", {
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
function Yr({ enabled: t, onEnabledChange: n, language: r, onLanguageChange: i, languages: a = [{
	value: "en",
	label: "English"
}], className: o }) {
	return /* @__PURE__ */ X("div", {
		className: e("flex flex-col gap-4", o),
		"data-testid": "settings-captions",
		children: [/* @__PURE__ */ X("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ Y("span", {
				id: "settings-captions-label",
				className: "text-sm text-text-primary",
				children: "Show live captions"
			}), /* @__PURE__ */ Y(ue, {
				checked: t,
				onChange: n,
				"aria-labelledby": "settings-captions-label",
				"data-testid": "settings-captions-toggle"
			})]
		}), /* @__PURE__ */ X("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ Y("label", {
				htmlFor: "settings-captions-language",
				className: "text-sm text-text-primary",
				children: "Language"
			}), /* @__PURE__ */ Y(R, {
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
function Xr(e) {
	return e === 0 ? "No one selected" : e === 1 ? "1 person selected" : `${e} people selected`;
}
function Zr({ children: e, action: t }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ Y("h3", {
			className: "m-0 text-[15px] font-semibold text-text-primary",
			children: e
		}), t]
	});
}
function Qr({ open: e, onClose: t, title: n, onTitleChange: r, media: a, onMediaChange: s, documents: c, onManageAccess: l, people: u, message: d, onMessageChange: f, messageMaxLength: m = 280, ring: _, onRingChange: v, precheck: y, selectedCount: b, onCopyLink: x, onStart: S, starting: C = !1, startDisabledReason: w, error: T, width: E = 400, docked: D = !0, className: O, "data-testid": k = "start-call-drawer" }) {
	let { onAdd: A, ...j } = c, M = !!w || C || !n.trim(), N = /* @__PURE__ */ X("div", {
		className: "flex flex-col gap-2.5",
		children: [
			T && /* @__PURE__ */ Y(ee, {
				variant: "error",
				title: `Could not start the call — ${T.message}`,
				action: /* @__PURE__ */ Y(i, {
					variant: "ghost",
					size: "sm",
					onClick: T.onRetry,
					"data-testid": "start-call-retry",
					children: "Retry"
				}),
				"data-testid": "start-call-error"
			}),
			/* @__PURE__ */ Y("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": "start-call-selected-count",
				children: Xr(b)
			}),
			/* @__PURE__ */ X("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ X(i, {
					variant: "ghost",
					onClick: x,
					"data-testid": "start-call-copy-link",
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ Y(g, { size: 16 }), "Copy invite link"]
				}), /* @__PURE__ */ X(i, {
					onClick: S,
					disabled: M,
					title: w ?? (n.trim() ? void 0 : "Give the call a title"),
					"data-testid": "start-call-submit",
					className: "inline-flex items-center gap-2 px-5",
					children: [C && /* @__PURE__ */ Y(ae, {
						size: "sm",
						color: "currentColor",
						decorative: !0
					}), C ? "Starting…" : "Start call"]
				})]
			})
		]
	});
	return /* @__PURE__ */ X(H, {
		open: e,
		onClose: t,
		title: "Start a call",
		docked: D,
		modal: !1,
		backdrop: !1,
		trapFocus: !1,
		...D ? {} : { width: E },
		footer: N,
		className: O,
		headerClassName: "border-b-0 px-5 pb-3 pt-5",
		titleClassName: "text-lg",
		bodyClassName: "flex flex-col gap-3.5 px-5 pt-0.5 pb-0",
		footerClassName: "bg-surface px-5 pt-3 pb-7",
		closeTestId: `${k}-close`,
		"data-testid": k,
		children: [
			/* @__PURE__ */ Y(ie, {
				value: n,
				onCommit: r,
				placeholder: "Call title",
				editLabel: "Rename call",
				"data-testid": "start-call-title"
			}),
			/* @__PURE__ */ Y(be, {
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
			/* @__PURE__ */ X("section", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ Y(Zr, {
						action: /* @__PURE__ */ X(i, {
							variant: "link",
							onClick: A,
							"data-testid": "start-call-add-document",
							className: "inline-flex items-center gap-1 text-sm",
							children: [/* @__PURE__ */ Y(h, { size: 14 }), "Add"]
						}),
						children: "Review documents"
					}),
					/* @__PURE__ */ Y(Hr, {
						...j,
						trailing: "remove",
						"data-testid": "start-call-documents",
						rowTestIdPrefix: "start-call-document"
					}),
					/* @__PURE__ */ X("div", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ Y("span", {
							className: "text-text-tertiary",
							children: "Existing document access applies."
						}), /* @__PURE__ */ Y(i, {
							variant: "link",
							onClick: l,
							"data-testid": "start-call-manage",
							className: "text-xs",
							children: "Manage"
						})]
					})
				]
			}),
			/* @__PURE__ */ X("section", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ Y(Zr, { children: "People" }),
					/* @__PURE__ */ Y(te, {
						value: u.query,
						onChange: (e) => u.onQueryChange(e.target.value),
						placeholder: u.placeholder ?? "Find people, teams or channels",
						"aria-label": u.placeholder ?? "Find people, teams or channels",
						prefix: /* @__PURE__ */ Y(p, { size: 16 }),
						"data-testid": "start-call-people-search"
					}),
					u.chips.length > 0 && /* @__PURE__ */ Y("div", {
						className: "flex flex-wrap gap-2",
						"data-testid": "start-call-chips",
						children: u.chips.map((e) => /* @__PURE__ */ Y(o, {
							tone: "neutral",
							onRemove: () => u.onRemoveChip(e.userId),
							removeLabel: `Remove ${e.name}`,
							removeTestId: `start-call-chip-remove-${e.userId}`,
							"data-testid": `start-call-chip-${e.userId}`,
							className: "rounded-md px-2.5 py-1 text-[13px]",
							children: e.name
						}, e.userId))
					}),
					/* @__PURE__ */ Y(Ur, {
						title: "Document collaborators",
						footnote: "Offline people can use the invite link.",
						...u.collaborators
					})
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ X("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ X("label", {
					htmlFor: `${k}-message`,
					className: "text-sm text-text-primary",
					children: ["Message ", /* @__PURE__ */ Y("span", {
						className: "text-text-tertiary",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ Y(me, {
					id: `${k}-message`,
					value: d,
					onChange: (e) => f(e.target.value.slice(0, m)),
					maxLength: m,
					rows: 2,
					className: "min-h-0 h-12 resize-none py-1.5",
					"data-testid": "start-call-message"
				})]
			}),
			/* @__PURE__ */ X("label", {
				className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
				children: [/* @__PURE__ */ Y(xe, {
					checked: _,
					onChange: (e) => v(e),
					className: "h-[18px] w-[18px]",
					"data-testid": "start-call-ring"
				}), "Ring online participants"]
			}),
			/* @__PURE__ */ Y("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Y(Vr, {
				showCamera: a === "video",
				...y
			})
		]
	});
}
//#endregion
//#region src/components/video/IncomingCallPopover.tsx
function $r(e, t) {
	return e === 0 ? "Nobody has joined yet" : t ? `${e} in call` : e === 1 ? "1 person in the call" : `${e} people in the call`;
}
function ei({ open: t, anchorRef: n, compact: r = !1, caller: a, title: o, documents: l, onOpenDocument: u, participants: d, participantCount: p, mic: h, camera: g, onOpenSettings: _, busy: v = !1, onJoin: y, onSwitch: b, onDecline: x, onDismiss: C, ringing: T = !0, initialFocus: E = "join", className: D, "data-testid": O = "incoming-call-popover" }) {
	let [k, ...A] = l, j = A.length ? r ? `+${A.length}` : `+${A.length} ${A.length === 1 ? "document" : "documents"}` : null, M = v && !!b, N = K(null);
	return W(() => {
		if (!t || E !== "join") return;
		let e = requestAnimationFrame(() => N.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [
		t,
		E,
		M
	]), /* @__PURE__ */ Y(B, {
		trigger: n,
		open: t,
		onClose: C,
		placement: "bottom-end",
		offset: 8,
		"aria-label": `Incoming call from ${a.name}`,
		"data-testid": O,
		className: e("rounded-xl p-0 shadow-xl", r ? "w-[375px]" : "w-[407px]", D),
		children: /* @__PURE__ */ X("div", {
			className: e("flex flex-col", r ? "gap-2.5 px-4 pt-3 pb-4" : "gap-3.5 px-5 pt-4 pb-4"),
			"data-compact": r ? "true" : "false",
			children: [
				/* @__PURE__ */ X("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ Y(w, {
							size: 20,
							className: e("shrink-0 text-success", T && "motion-safe:animate-pulse")
						}),
						/* @__PURE__ */ Y("span", {
							className: "flex-1 text-[15px] font-semibold text-text-primary",
							children: "Incoming call"
						}),
						/* @__PURE__ */ Y(s, {
							"aria-label": "Not now",
							title: "Not now",
							size: "sm",
							icon: /* @__PURE__ */ Y(f, { size: 16 }),
							onClick: x,
							"data-testid": "incoming-call-close",
							className: "text-text-secondary"
						})
					]
				}),
				r ? /* @__PURE__ */ X("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ Y(ge, {
						name: a.name,
						size: 36,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ X("span", {
						className: "min-w-0 truncate text-[15px] text-text-primary",
						"data-testid": "incoming-call-caller",
						children: [
							/* @__PURE__ */ Y("span", {
								className: "font-medium",
								children: a.name
							}),
							" ",
							/* @__PURE__ */ Y("span", {
								className: "text-text-secondary",
								children: "invited you"
							})
						]
					})]
				}) : /* @__PURE__ */ X("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ Y(ge, {
						name: a.name,
						size: 44,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ X("span", {
						className: "flex min-w-0 flex-col",
						"data-testid": "incoming-call-caller",
						children: [/* @__PURE__ */ Y("span", {
							className: "truncate text-[15px] font-semibold text-text-primary",
							children: a.name
						}), /* @__PURE__ */ Y("span", {
							className: "truncate text-sm text-text-secondary",
							children: "invited you to a review"
						})]
					})]
				}),
				/* @__PURE__ */ Y("h3", {
					className: e("m-0 font-semibold text-text-primary", r ? "text-lg" : "text-xl"),
					"data-testid": "incoming-call-title",
					children: o
				}),
				k && /* @__PURE__ */ X("div", {
					className: "flex min-w-0 items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ Y(c, {
							size: r ? 20 : 22,
							className: "shrink-0 text-primary"
						}),
						/* @__PURE__ */ Y(i, {
							variant: "link",
							onClick: () => u(k.id),
							"data-testid": `incoming-call-document-${k.id}`,
							className: "min-w-0 truncate text-[15px] underline",
							children: k.title
						}),
						j && /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y("span", {
							"aria-hidden": "true",
							className: "h-4 w-px shrink-0 bg-border"
						}), /* @__PURE__ */ Y(z, {
							content: A.map((e) => e.title).join(", "),
							children: /* @__PURE__ */ Y(i, {
								variant: "link",
								onClick: () => u(A[0].id),
								"data-testid": "incoming-call-more",
								className: "shrink-0 text-[15px] underline",
								children: j
							})
						})] }),
						r && /* @__PURE__ */ Y("span", {
							className: "ml-auto shrink-0 text-text-secondary",
							"data-testid": "incoming-call-participants",
							children: $r(p, !0)
						})
					]
				}),
				!r && /* @__PURE__ */ X("div", {
					className: "flex items-center gap-3",
					"data-testid": "incoming-call-participants",
					children: [d.length > 0 && /* @__PURE__ */ Y(he, {
						items: d.slice(0, 3).map((e) => ({
							name: e.name,
							...e.avatarUrl ? { src: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 34,
						className: "[&>*]:!border-surface [&>*+*]:!ml-[-4px]"
					}), /* @__PURE__ */ Y("span", {
						className: "text-sm text-text-secondary",
						children: $r(p, !1)
					})]
				}),
				!r && /* @__PURE__ */ Y("div", {
					className: "h-px bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Y(Te, {
							kind: "microphone",
							size: "md",
							showLabel: !0,
							...h,
							className: e("min-w-0 flex-auto justify-between", h.className),
							"data-testid": "incoming-call-mic"
						}),
						/* @__PURE__ */ Y(Te, {
							kind: "camera",
							size: "md",
							showLabel: !0,
							...g,
							className: e("min-w-0 flex-auto justify-between", g.className),
							"data-testid": "incoming-call-camera"
						}),
						/* @__PURE__ */ Y(s, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							size: "lg",
							icon: /* @__PURE__ */ Y(S, { size: 18 }),
							onClick: _,
							"data-testid": "incoming-call-settings",
							className: "shrink-0"
						})
					]
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ Y(i, {
						variant: "ghost",
						onClick: x,
						"data-testid": "incoming-call-decline",
						className: "border-transparent",
						children: "Not now"
					}), M ? /* @__PURE__ */ X(i, {
						ref: N,
						onClick: b,
						"data-testid": "incoming-call-switch",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Switch", /* @__PURE__ */ Y(m, { size: 16 })]
					}) : /* @__PURE__ */ X(i, {
						ref: N,
						onClick: y,
						"data-testid": "incoming-call-join",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Join call", /* @__PURE__ */ Y(m, { size: 16 })]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/DocumentCallPanel.tsx
function ti({ title: t, participantCount: n, elapsedMs: r, people: a, documents: o, presenting: c, currentDocumentId: l, canPresent: u, presentDisabledReason: d, onPresent: f, onCopyLink: p, onManageAccess: m, onPopOut: _, onClose: v, loading: y = !1, notice: b, className: S, "data-testid": C = "document-call-panel" }) {
	let { count: w, onAdd: T, ...E } = o, O = a.people.find((e) => e.isLocal), k = !!(c && O && c.userId === O.userId && c.documentId === l), A = !!(c && (!O || c.userId !== O.userId)), j = a.people.filter((e) => e.state === "in-call" && !e.isLocal).length === 0, M = `${n === 1 ? "1 person" : `${n} people`}${r == null ? "" : ` · ${Ee(r)}`}`;
	return /* @__PURE__ */ X(H, {
		open: !0,
		docked: !0,
		onClose: v,
		title: "Call",
		actions: /* @__PURE__ */ Y(s, {
			"aria-label": "Pop out the call",
			title: "Pop out the call",
			size: "sm",
			icon: /* @__PURE__ */ Y(x, { size: 18 }),
			onClick: _,
			"data-testid": "call-panel-popout",
			className: "text-text-secondary"
		}),
		closeTestId: "call-panel-close",
		className: e(S),
		headerClassName: "border-b-0 px-5 pb-2 pt-5",
		titleClassName: "text-lg",
		bodyClassName: "flex flex-col gap-5 px-5 pt-2 pb-6",
		"data-testid": C,
		children: [
			b,
			/* @__PURE__ */ X("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ Y("h3", {
					className: "m-0 text-lg font-semibold text-text-primary",
					"data-testid": "call-panel-title",
					children: t
				}), /* @__PURE__ */ Y("span", {
					className: "text-sm tabular-nums text-text-tertiary",
					"data-testid": "call-panel-meta",
					children: M
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "-mt-2 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			y ? /* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-3",
				"data-testid": "call-panel-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ Y(le, {
					height: 52,
					rounded: "md"
				}, e))
			}) : /* @__PURE__ */ X(J, { children: [
				/* @__PURE__ */ Y(Kr, { ...a }),
				j && /* @__PURE__ */ X("p", {
					className: "m-0 -mt-2 text-sm text-text-tertiary",
					"data-testid": "call-panel-waiting",
					children: [
						"Waiting for others —",
						" ",
						/* @__PURE__ */ Y(i, {
							variant: "link",
							onClick: p,
							className: "text-sm",
							children: "Copy call link"
						})
					]
				}),
				/* @__PURE__ */ Y("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ X("section", {
					className: "-mx-2 flex flex-col gap-2",
					"aria-label": "Review documents",
					children: [/* @__PURE__ */ X("div", {
						className: "flex items-center gap-2 px-2",
						children: [
							/* @__PURE__ */ Y("h3", {
								className: "m-0 text-base font-semibold text-text-primary",
								children: "Review documents"
							}),
							/* @__PURE__ */ Y(I, {
								variant: "count",
								value: w,
								color: "muted",
								"aria-label": `${w} documents`
							}),
							/* @__PURE__ */ X(i, {
								variant: "link",
								onClick: T,
								"data-testid": "call-add-document",
								className: "ml-auto inline-flex items-center gap-1 text-sm",
								children: [/* @__PURE__ */ Y(h, { size: 14 }), "Add"]
							})
						]
					}), /* @__PURE__ */ Y(Hr, {
						...E,
						trailing: "open",
						"data-testid": "call-documents-list",
						rowTestIdPrefix: "call-document"
					})]
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ X(i, {
						variant: "ghost",
						onClick: () => f(k ? null : l),
						disabled: !k && !u,
						title: !k && !u ? d : A ? `Take over from ${c.name}` : void 0,
						"data-take-over": A && u ? "true" : void 0,
						"data-testid": "call-present",
						className: "inline-flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ Y(D, { size: 18 }), k ? "Stop presenting" : "Present this document"]
					}), /* @__PURE__ */ X(i, {
						variant: "link",
						onClick: p,
						"data-testid": "call-copy-link",
						className: "inline-flex items-center gap-1.5 text-sm",
						children: [/* @__PURE__ */ Y(g, { size: 16 }), "Copy call link"]
					})]
				}),
				/* @__PURE__ */ Y("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center gap-3 text-xs",
					children: [/* @__PURE__ */ Y("span", {
						className: "text-text-tertiary",
						children: "Document access stays unchanged."
					}), /* @__PURE__ */ Y(i, {
						variant: "link",
						onClick: m,
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
export { Ct as $, Un as A, on as B, dr as C, $ as D, ir as E, gn as F, kt as G, $t as H, mn as I, At as J, Mt as K, pn as L, wn as M, Sn as N, Yn as O, yn as P, Tt as Q, fn as R, _r as S, sr as T, Yt as U, en as V, Ut as W, Et as X, Ht as Y, wt as Z, kr as _, Ae as _t, Jr as a, ut as at, Sr as b, Ur as c, Ze as ct, Rr as d, qe as dt, xt as et, Lr as f, He as ft, Ar as g, Ne as gt, Mr as h, Fe as ht, Yr as i, mt as it, Pn as j, Wn as k, Hr as l, Ue as lt, Nr as m, ze as mt, ei as n, yt as nt, Kr as o, ot, Fr as p, Be as pt, jt as q, Qr as r, _t as rt, Wr as s, nt as st, ti as t, vt as tt, Vr as u, Ge as ut, Or as v, or as w, br as x, Er as y, sn as z };
