import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n, r } from "./useAudioRecorder-BhPxnLmg.js";
import { n as i } from "./Button-C-I3BxWI.js";
import { n as a, t as o } from "./overlayStack-DxIDMUs-.js";
import { t as s } from "./IconButton-Bf5Wy0tS.js";
import { B as c, Q as l, S as u, d, et as f, ft as p, h as m, it as h, m as g, n as _ } from "./Icons-CqVFbuiZ.js";
import { _ as v, a as y, b, c as x, d as S, f as C, h as w, i as T, l as E, m as D, n as O, o as k, p as A, s as j, t as M, u as N, x as P, y as ee } from "./MediaIcons-_ai5Til2.js";
import { c as F, i as I, l as L, t as R } from "./Text-BEZVdfww.js";
import { t as z } from "./Badge-D58pEJIm.js";
import { t as B } from "./Banner-400g6E1q.js";
import { t as V } from "./Modal-PO0F6rAp.js";
import { t as H } from "./Input-Brvp1kPv.js";
import { t as te } from "./Select-CpZyUWay.js";
import { t as ne } from "./Tooltip-Q0urBp4N.js";
import { t as re } from "./InlinePopover-Dx8-r-XU.js";
import { t as ie } from "./FormField-CQ27qxWt.js";
import { i as ae, n as oe, r as se, t as ce } from "./Drawer-DmPnSirj.js";
import { t as le } from "./Spinner-CYflBP-c.js";
import { n as ue, r as de, t as fe } from "./focusTrap-D9J7npjl.js";
import { t as pe } from "./SkeletonCard-D3FL0TB7.js";
import { n as me, t as he } from "./Slider-DCKY5jPg.js";
import { t as ge } from "./DropdownMenu-DP3rRjEd.js";
import { t as _e } from "./DockedPanelContext-pH9A5z1h.js";
import { t as ve } from "./Textarea-CvdLeuO_.js";
import { n as ye, t as U } from "./Avatar-DkkMISPQ.js";
import { i as be, r as xe, t as Se } from "./ChoiceList-e9ggV8ZP.js";
import { t as Ce } from "./SegmentedControl-DAjnOtF4.js";
import { n as we } from "./RovingToolbar-B1Fai5PF.js";
import { t as Te } from "./PresenceAvatars-DqCOZ057.js";
import { t as Ee } from "./Checkbox-BW-hyqCM.js";
import { t as De } from "./activationKey-CjbL3LUv.js";
import { C as Oe, E as ke, H as Ae, L as je, S as Me, V as Ne, Z as Pe } from "./BreakoutRoomsPanel-SgRHRp3k.js";
import "./RecordingConsentNotice-CTl6644Z.js";
import { useCallback as W, useEffect as G, useImperativeHandle as Fe, useLayoutEffect as Ie, useMemo as K, useRef as q, useState as J } from "react";
import { Fragment as Y, jsx as X, jsxs as Z } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
var Le = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function Re({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f }) {
	let p = q(null), [m, h] = J("idle"), g = c ?? m;
	G(() => {
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
	}, [d, f]), G(() => {
		let e = p.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let _ = g !== "playing", v = Le[g];
	return /* @__PURE__ */ Z("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", l),
		style: u,
		children: [/* @__PURE__ */ X("video", {
			ref: p,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), _ && v && /* @__PURE__ */ Z("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			children: [g === "buffering" && /* @__PURE__ */ X(ze, {}), /* @__PURE__ */ X("span", {
				className: e(g === "buffering" ? "ml-2" : ""),
				children: v
			})]
		})]
	});
}
function ze() {
	return /* @__PURE__ */ Z("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		className: e("animate-spin"),
		children: [/* @__PURE__ */ X("circle", {
			cx: "9",
			cy: "9",
			r: "7",
			fill: "none",
			stroke: "rgba(255,255,255,0.3)",
			strokeWidth: "2"
		}), /* @__PURE__ */ X("path", {
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
function Be(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function Ve({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: a = !0, muted: s = !1, hideDownload: c = !1, header: l, footer: u, className: d }) {
	let f = K(() => n.filter((e) => !!e.url), [n]), [p, m] = J(0), h = f[p], g = q(null), _ = q(null), v = o(!0);
	return G(() => {
		let e = (e) => {
			if (v()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				de(e, g.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, v]), G(() => (_.current = typeof document < "u" ? document.activeElement : null, fe(g.current), () => {
		ue(_.current), _.current = null;
	}), []), /* @__PURE__ */ X("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r || "Video player",
		onClick: t,
		className: e("fixed inset-0 z-50 grid place-items-center p-4", "bg-black/80 backdrop-blur-sm"),
		children: /* @__PURE__ */ Z("div", {
			ref: g,
			onClick: (e) => e.stopPropagation(),
			className: e("w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl", "bg-[var(--color-surface)] text-[var(--color-text-primary)]", d),
			children: [
				(r || i || l) && /* @__PURE__ */ Z("header", {
					className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]",
					children: [/* @__PURE__ */ Z("div", {
						className: "min-w-0 flex-1",
						children: [r && /* @__PURE__ */ X("h2", {
							className: "text-sm font-semibold truncate",
							children: r
						}), i && /* @__PURE__ */ X("p", {
							className: "text-xs text-[var(--color-text-secondary)] truncate",
							children: i
						})]
					}), /* @__PURE__ */ Z("div", {
						className: "flex items-center gap-1 shrink-0",
						children: [l, /* @__PURE__ */ X("button", {
							"data-ui-part": "",
							type: "button",
							onClick: t,
							"aria-label": "Close",
							className: e("h-8 w-8 grid place-items-center rounded text-xl leading-none", "hover:bg-white/10"),
							children: "×"
						})]
					})]
				}),
				h ? /* @__PURE__ */ X("video", {
					src: h.url,
					controls: !0,
					autoPlay: a,
					muted: s,
					className: "w-full max-h-[70vh] bg-black"
				}, h.url) : /* @__PURE__ */ X("div", {
					className: "p-10 text-center text-[var(--color-text-secondary)] text-sm",
					children: "No playable sources."
				}),
				f.length > 1 && /* @__PURE__ */ X("nav", {
					className: e("flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]", "text-xs"),
					"aria-label": "Segments",
					children: f.map((t, n) => {
						let r = n === p;
						return /* @__PURE__ */ X("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => m(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : Be(t.sizeBytes),
							children: t.label || `Segment ${n + 1}`
						}, `${n}:${t.url}`);
					})
				}),
				(u || !c && h) && /* @__PURE__ */ Z("footer", {
					className: "flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]",
					children: [/* @__PURE__ */ X("div", {
						className: "min-w-0 flex-1 flex items-center gap-2",
						children: u
					}), !c && h && /* @__PURE__ */ X("a", {
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
function He(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function Ue({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ X("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", He(t.bitrateBps)],
		["FPS", `${t.fps}`],
		["Resolution", `${t.resolution.width}×${t.resolution.height}`],
		["Packets Lost", `${t.packetsLost}`]
	];
	return t.jitter !== void 0 && i.push(["Jitter", `${t.jitter.toFixed(1)} ms`]), /* @__PURE__ */ X("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-xs text-code-text", n),
		style: r,
		children: i.map(([t, n]) => /* @__PURE__ */ Z("div", {
			className: e("flex justify-between py-[3px]"),
			children: [/* @__PURE__ */ X("span", {
				className: e("text-text-tertiary"),
				children: t
			}), /* @__PURE__ */ X("span", {
				className: e("font-mono"),
				children: n
			})]
		}, t))
	});
}
//#endregion
//#region src/components/video/NetworkQualityBadge.tsx
var We = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, Ge = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, Ke = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function qe({ quality: t, className: n, style: r }) {
	let i = We[t], a = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ Z("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", n),
		style: r,
		children: [/* @__PURE__ */ X("svg", {
			width: "14",
			height: "12",
			viewBox: "0 0 14 12",
			children: [
				0,
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ X("rect", {
				x: e * 4,
				y: 12 - (e + 1) * 3,
				width: "3",
				height: (e + 1) * 3,
				rx: "0.5",
				fill: e < a ? i : "rgba(255,255,255,0.2)"
			}, e))
		}), /* @__PURE__ */ X("span", {
			className: Ge[t],
			children: Ke[t]
		})]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function Je({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ X("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ X(Ne, {
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
//#region src/components/video/PlaybackReactionsLayer.tsx
var Ye = 3, Xe = 1500, Ze = 200;
function Qe({ reactions: e, currentTimeMs: t, className: n }) {
	let r = K(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = q(t), a = q([]), [o, s] = J([]);
	return G(() => {
		let e = i.current;
		if (i.current = t, t < e - Xe) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > Ye ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), G(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, Ze);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ X("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ X(je, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function $e(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function et(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var tt = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, nt = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function rt({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ Z("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ Z("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ X("span", { className: e("w-[7px] h-[7px] rounded-full", tt[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ X("span", {
					className: e("font-semibold", nt[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ X("span", { children: $e(n) }),
			i !== void 0 && /* @__PURE__ */ X("span", { children: et(i) }),
			r !== void 0 && /* @__PURE__ */ Z("span", {
				className: e("flex items-center gap-[3px]"),
				children: [/* @__PURE__ */ Z("svg", {
					width: "10",
					height: "10",
					viewBox: "0 0 10 10",
					fill: "currentColor",
					children: [/* @__PURE__ */ X("circle", {
						cx: "5",
						cy: "4",
						r: "2"
					}), /* @__PURE__ */ X("path", { d: "M1 9a4 4 0 0 1 8 0" })]
				}), r]
			})
		]
	});
}
//#endregion
//#region src/components/video/CallParticipantStrip.tsx
function it(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function at(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function ot({ participant: e, size: t = 32 }) {
	let n = at(e.displayName);
	return /* @__PURE__ */ Z("div", {
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
			e.avatarUrl ? /* @__PURE__ */ X("img", {
				src: e.avatarUrl,
				alt: "",
				className: "w-full h-full rounded-full object-cover"
			}) : it(e.displayName),
			e.isSpeaking && /* @__PURE__ */ X("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			e.isMuted && /* @__PURE__ */ X("span", {
				"data-testid": "call-avatar-muted",
				"aria-label": "Microphone muted",
				className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white",
				children: /* @__PURE__ */ Z("svg", {
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
						/* @__PURE__ */ X("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ X("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ X("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
					]
				})
			})
		]
	});
}
function st({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ Z("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ X(ot, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ Z("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ X(ot, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var Q = {
	mic: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }),
			/* @__PURE__ */ X("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
			/* @__PURE__ */ X("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	micOff: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ X("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
			/* @__PURE__ */ X("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
			/* @__PURE__ */ X("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
			/* @__PURE__ */ X("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ X("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}),
	camera: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), /* @__PURE__ */ X("circle", {
			cx: "12",
			cy: "13",
			r: "3"
		})]
	}),
	cameraOff: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ X("path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }),
			/* @__PURE__ */ X("path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }),
			/* @__PURE__ */ X("path", { d: "M15 13a3 3 0 1 0-6 0" })
		]
	}),
	screenShare: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ X("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ X("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ X("polyline", { points: "12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" })
		]
	}),
	phoneEnd: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ X("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	userPlus: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
			/* @__PURE__ */ X("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			/* @__PURE__ */ X("line", {
				x1: "19",
				y1: "8",
				x2: "19",
				y2: "14"
			}),
			/* @__PURE__ */ X("line", {
				x1: "22",
				y1: "11",
				x2: "16",
				y2: "11"
			})
		]
	}),
	videoUpgrade: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ X("rect", {
			x: "1",
			y: "5",
			width: "15",
			height: "14",
			rx: "2",
			ry: "2"
		})]
	}),
	more: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("circle", {
				cx: "5",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "19",
				cy: "12",
				r: "1"
			})
		]
	})
};
function ct({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, testId: s, expanded: c, buttonRef: l }) {
	return /* @__PURE__ */ X("button", {
		"data-ui-part": "",
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
function lt({ controls: t }) {
	let [n, r] = J(!1), i = q(null), a = q(null);
	return G(() => {
		if (!n) return;
		let e = (e) => {
			i.current?.contains(e.target) || r(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [n]), /* @__PURE__ */ Z("div", {
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
		children: [/* @__PURE__ */ X(ct, {
			icon: Q.more,
			label: "More call controls",
			active: n,
			expanded: n,
			buttonRef: a,
			onClick: () => r((e) => !e),
			testId: "call-controls-more-button"
		}), n && /* @__PURE__ */ X("div", {
			role: "menu",
			"aria-label": "More call controls",
			"data-testid": "call-controls-overflow",
			className: "absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg",
			children: t.map((t) => /* @__PURE__ */ Z("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitem",
				"data-testid": t.testId,
				"aria-label": t.label,
				onClick: () => {
					t.onClick(), r(!1);
				},
				className: e("flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors", t.active ? "bg-white/15 text-white" : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"),
				children: [/* @__PURE__ */ X("span", {
					className: "shrink-0",
					"aria-hidden": "true",
					children: t.icon
				}), t.label]
			}, t.key))
		})]
	});
}
var ut = /* @__PURE__ */ new Set(["mute", "camera"]);
function dt({ mode: t, density: n = "full", isMuted: r = !1, isCameraOn: i = !0, isScreenSharing: a = !1, onToggleMute: o, onToggleCamera: s, onToggleScreenShare: c, onUpgradeToVideo: l, onEndCall: u, onAddParticipant: d, availableParticipants: f, currentParticipantIds: p, onOpenAddParticipant: m, extras: h, className: g }) {
	let [_, v] = J(!1), y = new Set(p ?? []), b = (f ?? []).filter((e) => !y.has(e.id)), x = [];
	o && x.push({
		key: "mute",
		icon: r ? Q.micOff : Q.mic,
		label: r ? "Unmute" : "Mute",
		active: r,
		onClick: o,
		testId: "mute-button"
	}), t === "video" && s && x.push({
		key: "camera",
		icon: i ? Q.camera : Q.cameraOff,
		label: i ? "Turn off camera" : "Turn on camera",
		active: !i,
		onClick: s,
		testId: "camera-button"
	}), t === "audio" && l && x.push({
		key: "upgrade",
		icon: Q.videoUpgrade,
		label: "Switch to video",
		onClick: l,
		testId: "upgrade-to-video-button"
	}), c && x.push({
		key: "screenshare",
		icon: Q.screenShare,
		label: a ? "Stop sharing" : "Share screen",
		active: a,
		onClick: c,
		testId: "screenshare-button"
	}), (d || m) && x.push({
		key: "add-participant",
		icon: Q.userPlus,
		label: "Add people to this call",
		active: _,
		onClick: m ?? (() => v((e) => !e)),
		testId: "add-participant-button"
	});
	let S = n === "compact", C = S ? x.filter((e) => ut.has(e.key)) : x, w = S ? x.filter((e) => !ut.has(e.key)) : [];
	return /* @__PURE__ */ Z("div", {
		className: e("flex flex-col", g),
		children: [/* @__PURE__ */ Z("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				C.map((e) => /* @__PURE__ */ X(ct, {
					icon: e.icon,
					label: e.label,
					active: e.active,
					onClick: e.onClick,
					testId: e.testId
				}, e.key)),
				w.length > 0 && /* @__PURE__ */ X(lt, { controls: w }),
				h,
				u && /* @__PURE__ */ X(ct, {
					icon: Q.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: u,
					testId: "hangup-button"
				})
			]
		}), _ && d && !m && /* @__PURE__ */ Z("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ Z("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ X("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => v(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), b.length === 0 ? /* @__PURE__ */ X("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ X("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: b.map((e) => /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						d(e.id), b.length <= 1 && v(!1);
					},
					children: [
						/* @__PURE__ */ X(ot, {
							participant: e,
							size: 22
						}),
						/* @__PURE__ */ X("span", {
							className: "text-xs text-white/80",
							children: e.displayName
						}),
						/* @__PURE__ */ X("span", {
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
function ft(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var pt = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function mt(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function ht({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return ft(t) ? /* @__PURE__ */ Z("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", pt[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ X(qe, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ Z("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ Z("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ X("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), mt(t.bitrateKbps)]
				}),
				t.latencyMs !== void 0 && /* @__PURE__ */ Z("span", {
					"data-testid": "call-stats-latency",
					children: [
						/* @__PURE__ */ X("span", {
							className: "text-white/50 mr-1.5",
							children: "latency"
						}),
						Math.round(t.latencyMs),
						" ms"
					]
				}),
				t.packetLossPct !== void 0 && /* @__PURE__ */ Z("span", {
					"data-testid": "call-stats-packet-loss",
					children: [
						/* @__PURE__ */ X("span", {
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
var gt = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, _t = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function vt(e) {
	return e.toggleTestId ?? gt[e.id] ?? `call-side-panel-open-${e.id}`;
}
function yt(e) {
	return e.panelTestId ?? _t[e.id] ?? `call-side-panel-body-${e.id}`;
}
function bt(e) {
	return e === "mini" ? "overlay" : "docked";
}
function xt(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ X(O, { size: 16 });
		case "people": return /* @__PURE__ */ X(ee, { size: 16 });
		case "captions": return /* @__PURE__ */ X(M, { size: 16 });
		case "devices": return /* @__PURE__ */ X(w, { size: 16 });
		default: return null;
	}
}
function St({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, tone: a = "chrome", className: o, "data-testid": s = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ X("div", {
		"data-testid": s,
		className: e("flex items-center", a === "surface" ? "gap-2" : "gap-1", o),
		"data-tone": a,
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let o = t.id === n, s = i || t.disabled === !0;
			return /* @__PURE__ */ Z("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": t.label,
				"aria-pressed": o,
				title: t.label,
				disabled: s,
				"data-testid": vt(t),
				"data-active": o ? "true" : "false",
				onClick: () => r?.(o ? null : t.id),
				className: e(a === "surface" ? ["relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid transition-colors duration-150", o ? "border-border bg-surface-inset text-text-primary" : "border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", o ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"], s ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? xt(t.id) ?? /* @__PURE__ */ X("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ X("span", {
					"data-testid": `${vt(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var Ct = "__legacy__";
function wt({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = f ? t : [{
		id: Ct,
		label: s ?? "",
		content: c
	}], m = f ? n ?? null : a ? Ct : null, h = p.find((e) => e.id === m) ?? null;
	if (!h) return null;
	let g = bt(i), _ = f && p.length > 1;
	return /* @__PURE__ */ Z("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": g,
		"data-call-side-panel-tab": f ? h.id : void 0,
		"aria-label": h.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", g === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ Z("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [_ ? /* @__PURE__ */ X("div", {
				role: "tablist",
				"aria-label": "Call side panel sections",
				className: "flex min-w-0 items-center gap-1 overflow-x-auto",
				children: p.map((t) => {
					let n = t.id === h.id;
					return /* @__PURE__ */ X("button", {
						"data-ui-part": "",
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
			}) : /* @__PURE__ */ X("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: h.label
			}), /* @__PURE__ */ X("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Close",
				onClick: () => {
					r?.(null), o?.();
				},
				"data-testid": "call-side-panel-close",
				className: "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
				children: "×"
			})]
		}), /* @__PURE__ */ X("div", {
			role: _ ? "tabpanel" : void 0,
			"data-testid": f ? yt(h) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ X(_e, {
				hasHeader: !0,
				fillsHeight: !0,
				children: h.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function Tt(e) {
	return e === "docked" ? "window" : e;
}
function Et(e) {
	return e === "window" ? "docked" : e;
}
function Dt(e) {
	return e ? "mini" : "window";
}
var Ot = /* @__PURE__ */ new Set();
function kt(e, t) {
	process.env.NODE_ENV !== "production" && (Ot.has(e) || (Ot.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var At = "w-[380px]", jt = "w-[480px]", Mt = "h-[480px]", Nt = "application/x-call-dock";
function Pt(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function Ft({ stream: t, muted: n = !1, className: r }) {
	let i = q(null);
	return G(() => {
		let e = i.current;
		e && e.srcObject !== t && (e.srcObject = t);
	}, [t]), /* @__PURE__ */ X("video", {
		ref: i,
		autoPlay: !0,
		playsInline: !0,
		muted: n,
		className: e("w-full h-full object-cover", r)
	});
}
var It = {
	phoneEnd: /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ X("line", {
			x1: "22",
			y1: "2",
			x2: "2",
			y2: "22"
		})]
	}),
	phoneAnswer: /* @__PURE__ */ X("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ X("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
	}),
	minimize: /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ X("polyline", { points: "4 14 10 14 10 20" }),
			/* @__PURE__ */ X("polyline", { points: "20 10 14 10 14 4" }),
			/* @__PURE__ */ X("line", {
				x1: "14",
				y1: "10",
				x2: "21",
				y2: "3"
			}),
			/* @__PURE__ */ X("line", {
				x1: "3",
				y1: "21",
				x2: "10",
				y2: "14"
			})
		]
	}),
	snapBack: /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("polyline", { points: "1 4 1 10 7 10" }), /* @__PURE__ */ X("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })]
	}),
	grip: /* @__PURE__ */ Z("svg", {
		width: "10",
		height: "12",
		viewBox: "0 0 10 16",
		fill: "currentColor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ X("circle", {
				cx: "3",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "7",
				cy: "3",
				r: "1.3"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "3",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "7",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "3",
				cy: "13",
				r: "1.3"
			}),
			/* @__PURE__ */ X("circle", {
				cx: "7",
				cy: "13",
				r: "1.3"
			})
		]
	}),
	dockTo: /* @__PURE__ */ Z("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ X("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "16",
			rx: "2"
		}), /* @__PURE__ */ X("line", {
			x1: "15",
			y1: "4",
			x2: "15",
			y2: "20"
		})]
	})
};
function Lt({ callerName: e, onAnswer: t, onDecline: n }) {
	return /* @__PURE__ */ Z("div", {
		className: "flex flex-col items-center gap-4 py-5 px-4",
		"data-testid": "call-ringing-view",
		children: [
			/* @__PURE__ */ X("div", {
				className: "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse",
				children: /* @__PURE__ */ X("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "text-white",
					children: /* @__PURE__ */ X("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" })
				})
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-center",
				children: [/* @__PURE__ */ X("p", {
					className: "text-white font-semibold text-sm m-0",
					children: e || "Incoming call"
				}), /* @__PURE__ */ X("p", {
					className: "text-white/50 text-xs m-0 mt-1",
					children: "is calling..."
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex gap-4",
				children: [n && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: It.phoneEnd
				}), t && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: It.phoneAnswer
				})]
			})
		]
	});
}
function Rt({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, onAddParticipant: p, availableParticipants: m, onOpenAddParticipant: h, controlsExtras: g, onEndCall: _, layoutComponent: v, callStats: y }) {
	let b = t === "video" && s;
	return /* @__PURE__ */ Z("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			v && /* @__PURE__ */ Z("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [v, /* @__PURE__ */ X(ht, {
					stats: y,
					position: "bottom-left"
				})]
			}),
			!v && t === "video" && /* @__PURE__ */ Z("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && b ? /* @__PURE__ */ X(Ft, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ X("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ X(ot, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ Z("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ X(Ft, { stream: r[0].videoStream }) : /* @__PURE__ */ X("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ X(ot, {
								participant: r[0],
								size: 28
							})
						}), r[0].isMuted && /* @__PURE__ */ X("div", {
							className: "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white",
							"aria-label": "Microphone muted",
							children: /* @__PURE__ */ Z("svg", {
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
									/* @__PURE__ */ X("line", {
										x1: "3",
										y1: "3",
										x2: "21",
										y2: "21"
									}),
									/* @__PURE__ */ X("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
									/* @__PURE__ */ X("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
								]
							})
						})]
					}),
					/* @__PURE__ */ X(ht, {
						stats: y,
						position: "bottom-left"
					})
				]
			}),
			!v && t === "audio" && /* @__PURE__ */ X("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ X(st, {
					participants: r,
					localFallback: i,
					maxVisible: 4,
					avatarSize: 36
				})
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-center py-1.5 shrink-0",
				children: [a !== void 0 && /* @__PURE__ */ X("span", {
					className: "text-white/60 text-xs font-mono",
					"data-testid": "call-timer",
					"data-call-duration": a,
					children: Pt(a)
				}), /* @__PURE__ */ Z("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ X(dt, {
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
function zt({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, onEndCall: s, onExpand: c }) {
	return /* @__PURE__ */ Z("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", c && "cursor-pointer"),
		onClick: c,
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		"aria-label": c ? "Expand call widget" : void 0,
		onKeyDown: c ? De(c) : void 0,
		children: [
			/* @__PURE__ */ X("span", { className: e("w-2 h-2 rounded-full shrink-0", t === "active" ? "bg-success animate-pulse" : "bg-warning animate-pulse") }),
			/* @__PURE__ */ X("div", {
				className: "flex-1 min-w-0",
				children: t === "ringing" ? /* @__PURE__ */ X("span", {
					className: "text-white text-xs font-medium truncate",
					children: a || "Incoming call"
				}) : /* @__PURE__ */ Z("span", {
					className: "text-white text-xs font-medium",
					children: [
						n === "video" ? "Video" : "Audio",
						" call",
						r !== void 0 && /* @__PURE__ */ X("span", {
							className: "text-white/50 ml-1.5 font-mono",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Pt(r)
						})
					]
				})
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: o,
					className: e("w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors", i ? "bg-danger/20 text-danger-fg" : "bg-white/10 text-white/70 hover:text-white"),
					"aria-label": i ? "Unmute" : "Mute",
					children: /* @__PURE__ */ X("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: i ? /* @__PURE__ */ Z(Y, { children: [
							/* @__PURE__ */ X("line", {
								x1: "2",
								y1: "2",
								x2: "22",
								y2: "22"
							}),
							/* @__PURE__ */ X("path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }),
							/* @__PURE__ */ X("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" }),
							/* @__PURE__ */ X("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" })
						] }) : /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), /* @__PURE__ */ X("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })] })
					})
				}), s && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: s,
					className: "w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors",
					"aria-label": "End call",
					children: /* @__PURE__ */ Z("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ X("path", { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" }), /* @__PURE__ */ X("line", {
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
function Bt(e) {
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
function Vt(e, t, n) {
	let [r, i] = J({
		x: 0,
		y: 0
	}), [a, o] = J(!1), [s, c] = J(!1), l = q(null), u = W(() => {
		l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 200);
	}, []);
	G(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let d = q(!1), f = q({
		x: 0,
		y: 0
	}), p = q({
		x: 0,
		y: 0
	}), m = q(null), h = q(null), g = q(null), _ = W((t) => {
		e && (h.current = m.current?.getBoundingClientRect() ?? null, g.current = h.current, d.current = !0, o(!0), c(!1), f.current = {
			x: t.clientX,
			y: t.clientY
		}, p.current = { ...r }, t.preventDefault());
	}, [e, r]), v = W(() => {
		c(!0), i({
			x: 0,
			y: 0
		}), u();
	}, [u]), y = W((e) => {
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
	}, [r, u]), b = q(v);
	b.current = v;
	let x = q(t);
	x.current = t;
	let S = q(n);
	S.current = n;
	let C = q(null);
	return G(() => {
		if (!e) return;
		let t = (e) => {
			if (!d.current) return;
			i({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
			let t = h.current;
			t && (g.current = new DOMRect(t.left + e.clientX - f.current.x, t.top + e.clientY - f.current.y, t.width, t.height));
			let n = (g.current ? Bt(g.current) : null)?.id ?? null;
			n !== C.current && (C.current = n, x.current?.(n));
		}, n = () => {
			if (!d.current) return;
			d.current = !1, o(!1);
			let e = m.current;
			if (!e) return;
			let t = g.current ?? e.getBoundingClientRect(), n = Bt(t);
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
function Ht({ onSnap: t, contained: n }) {
	return /* @__PURE__ */ X("div", {
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
		].map(({ id: e, classes: n }) => /* @__PURE__ */ X("div", {
			className: `absolute ${n} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`,
			onClick: () => t(e),
			title: `Snap to ${e.replace("-", " ")}`,
			children: /* @__PURE__ */ X("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "text-white/40",
				children: /* @__PURE__ */ X("rect", {
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
function Ut({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, onAddParticipant: _, availableParticipants: v, controlsExtras: y, onOpenAddParticipant: b, onMinimize: x, onExpand: S, layoutComponent: C, callStats: w, displayMode: T, minimized: E, sidePanelTabs: D, activeSidePanelTab: O = null, onSidePanelTabChange: k, sidePanelWidthClassName: A = "w-80", dockTargets: j, activeDockId: M = null, onDockTo: N, onDragStateChange: P, position: ee = "bottom-right", contained: F = !1, draggable: I = !0, className: L, style: R, dataAttrs: z }) {
	T !== void 0 && E !== void 0 && kt("CallWidget", "minimized");
	let B = T ?? Dt(E ?? !1), V = B === "mini", H = D ?? [], te = H.length > 0 && !V && t === "active", ne = te && H.some((e) => e.id === O), re = (j ?? []).length > 0, ie = re && M != null, ae = I && !ie, oe = z?.["data-call-id"], se = oe == null || oe === "" ? void 0 : String(oe), ce = W((e) => {
		let t = e.dataTransfer;
		if (!t) return;
		let n = {
			callId: se,
			fromDockId: M ?? null
		};
		t.setData(Nt, JSON.stringify(n)), t.effectAllowed = "move";
	}, [se, M]), { offset: le, handleMouseDown: ue, resetOffset: de, snapToCorner: fe, isDragging: pe, isAnimating: me, hasMoved: he, widgetRef: ge } = Vt(ae, W((e) => {
		for (let t of document.querySelectorAll("[data-call-dock-target]")) e && t.dataset.callDockTarget === e ? t.dataset.pointerOver = "true" : delete t.dataset.pointerOver;
	}, []), W((e) => N ? (N(e), !0) : !1, [N])), _e = q(P);
	_e.current = P, G(() => {
		_e.current?.(pe);
	}, [pe]);
	let ve = {};
	if (z) for (let [e, t] of Object.entries(z)) t != null && t !== "" && (ve[e] = t);
	let ye = K(() => {
		switch (ee) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [ee]);
	if (t === "idle" || t === "ended") return null;
	let U = /* @__PURE__ */ Z(Y, { children: [
		t === "ringing" && /* @__PURE__ */ X(Lt, {
			callerName: a,
			onAnswer: u,
			onDecline: d
		}),
		t === "connecting" && /* @__PURE__ */ Z("div", {
			className: "flex flex-col items-center gap-3 py-6 px-4",
			"data-testid": "call-connecting-view",
			children: [/* @__PURE__ */ X("div", { className: "w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" }), /* @__PURE__ */ X("span", {
				className: "text-white/60 text-xs",
				children: "Connecting..."
			})]
		}),
		t === "active" && /* @__PURE__ */ X(Rt, {
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
			controlsExtras: te ? /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(St, {
				tabs: H,
				activeTab: O,
				onTabChange: k
			}), y] }) : y,
			onEndCall: f,
			layoutComponent: C,
			callStats: w
		})
	] });
	return /* @__PURE__ */ Z(Y, { children: [pe && /* @__PURE__ */ X(Ht, {
		onSnap: fe,
		contained: F
	}), /* @__PURE__ */ X("div", {
		ref: ge,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": B,
		"data-call-widget-mode-legacy": Et(B),
		"data-call-dock-id": ie ? M : void 0,
		className: e(ie ? "relative" : [F ? "absolute z-50" : "fixed z-[10001]", ye], L),
		style: {
			transform: ie ? void 0 : `translate(${le.x}px, ${le.y}px)`,
			transition: me ? "transform 0.2s ease-out" : void 0,
			...R
		},
		...ve,
		children: /* @__PURE__ */ Z("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", V ? "w-[260px]" : ne ? "w-auto" : At),
			"data-call-side-panel-open": ne ? "true" : "false",
			children: [
				!V && /* @__PURE__ */ Z("div", {
					className: e("relative flex items-center justify-between px-3 py-2 border-b border-white/5", ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					draggable: ie || void 0,
					onDragStart: re ? ce : void 0,
					"data-call-dock-source": re ? "true" : void 0,
					children: [/* @__PURE__ */ Z("div", {
						className: "flex items-center gap-2",
						children: [
							re && /* @__PURE__ */ X("span", {
								draggable: ie || void 0,
								className: "flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors",
								title: "Drag the call into the page",
								"data-testid": "call-dock-drag-handle",
								"aria-hidden": !0,
								children: It.grip
							}),
							/* @__PURE__ */ X("span", { className: "w-2 h-2 rounded-full bg-success" }),
							/* @__PURE__ */ X("span", {
								className: "text-white/80 text-xs font-medium",
								"data-testid": "call-widget-title",
								children: n === "video" ? "Video Call" : "Audio Call"
							})
						]
					}), /* @__PURE__ */ Z("div", {
						className: "flex items-center gap-1",
						children: [
							he && /* @__PURE__ */ X("button", {
								"data-ui-part": "",
								type: "button",
								onClick: de,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: It.snapBack
							}),
							S && /* @__PURE__ */ X("button", {
								"data-ui-part": "",
								type: "button",
								onClick: S,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Expand to window",
								title: "Expand",
								"data-testid": "call-widget-expand-button",
								children: /* @__PURE__ */ X("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 14 14",
									fill: "none",
									children: /* @__PURE__ */ X("path", {
										d: "M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9",
										stroke: "currentColor",
										strokeWidth: "1.6",
										strokeLinecap: "round"
									})
								})
							}),
							x && /* @__PURE__ */ X("button", {
								"data-ui-part": "",
								type: "button",
								onClick: x,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: It.minimize
							})
						]
					})]
				}),
				V && /* @__PURE__ */ X("div", {
					className: e(ae && "cursor-grab active:cursor-grabbing"),
					onMouseDown: ue,
					children: /* @__PURE__ */ X(zt, {
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
				!V && (ne ? /* @__PURE__ */ Z("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ X("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: U
					}), /* @__PURE__ */ X(wt, {
						mode: B,
						tabs: H,
						activeTab: O,
						onTabChange: k,
						widthClassName: A
					})]
				}) : U)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function Wt({ callerName: n, callerAvatarUrl: r, context: i, mode: a = "started", media: o, onJoin: s, onDismiss: c, autoExpireSec: l = 30, className: u, style: d }) {
	let [f, p] = J(!0), m = t(c);
	if (G(() => {
		if (!l || l <= 0) return;
		let e = setTimeout(() => {
			p(!1), m();
		}, l * 1e3);
		return () => clearTimeout(e);
	}, [l, m]), !f) return null;
	let h = [o === "audio" ? "Audio call" : o === "video" ? "Video call" : null, i].filter(Boolean).join(" · ");
	return /* @__PURE__ */ Z("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": a,
		"data-call-media": o,
		"data-caller-name": n,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", u),
		style: d,
		children: [
			/* @__PURE__ */ X(Gt, {
				name: n,
				avatarUrl: r
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ X("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: a === "calling" ? `${n} is calling you` : `${n} started a call`
				}), h && /* @__PURE__ */ X("p", {
					className: "text-xs text-white/60 m-0 truncate",
					"data-testid": "incoming-call-subtitle",
					children: h
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => {
						p(!1), c();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), s && /* @__PURE__ */ X("button", {
					"data-ui-part": "",
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
function Gt({ name: e, avatarUrl: t }) {
	let n = qt(e);
	return /* @__PURE__ */ Z("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ X("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : Kt(e), /* @__PURE__ */ X("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function Kt(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function qt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function Jt(e) {
	let t = e.split("#")[0].split("?")[0].toLowerCase();
	return t.endsWith(".m3u8") ? "hls" : /\.(mp4|m4v|mov|webm|ogv|ogg|m4a|mp3|wav|aac)$/.test(t) ? "progressive" : "unknown";
}
function Yt(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function Xt({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: o, onError: s, hideDownload: c = !1, className: l }) {
	let u = q(null), d = q(null), f = q(s);
	f.current = s;
	let [p, m] = J(!1), [h, g] = J(0), [_, v] = J(0), [y, b] = J(1), [x, S] = J(1), [C, w] = J(!1), [T, E] = J(null);
	G(() => {
		let e = u.current;
		if (!e || !t) return;
		if (E(null), w(!0), Jt(t) === "progressive" || e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
	}, M = K(() => _ > 0 ? Math.min(100, h / _ * 100) : 0, [h, _]);
	return /* @__PURE__ */ Z("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", l),
		children: [
			/* @__PURE__ */ X("video", {
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
			C && !T && /* @__PURE__ */ X("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			T && /* @__PURE__ */ X("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: T
			}),
			/* @__PURE__ */ Z("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ X("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: Yt(h)
						}),
						/* @__PURE__ */ X("input", {
							"data-ui-part": "",
							type: "range",
							min: 0,
							max: isFinite(_) ? _ : 0,
							step: .1,
							value: h,
							onChange: O,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${M}%` }
						}),
						/* @__PURE__ */ X("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: Yt(_)
						})
					]
				}), /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ X("button", {
							"data-ui-part": "",
							type: "button",
							onClick: D,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": p ? "Pause" : "Play",
							children: p ? /* @__PURE__ */ Z("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: [/* @__PURE__ */ X("rect", {
									x: "2",
									y: "1",
									width: "3",
									height: "12"
								}), /* @__PURE__ */ X("rect", {
									x: "9",
									y: "1",
									width: "3",
									height: "12"
								})]
							}) : /* @__PURE__ */ X("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ X("polygon", { points: "2,1 12,7 2,13" })
							})
						}),
						/* @__PURE__ */ Z("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ X("span", {
								className: "text-xs opacity-70",
								children: "Vol"
							}), /* @__PURE__ */ X("input", {
								"data-ui-part": "",
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
						/* @__PURE__ */ X(te, {
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
						/* @__PURE__ */ X("div", { className: "flex-1" }),
						!c && t && /* @__PURE__ */ X("a", {
							href: t,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ X("button", {
							"data-ui-part": "",
							type: "button",
							onClick: j,
							className: "w-9 h-9 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": "Fullscreen",
							children: /* @__PURE__ */ X("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "currentColor",
								children: /* @__PURE__ */ X("path", { d: "M2 2h4v1.5H3.5V6H2V2zm10 0v4h-1.5V3.5H8V2h4zM2 12v-4h1.5v2.5H6V12H2zm10 0H8v-1.5h2.5V8H12v4z" })
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
function Zt(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function Qt(e) {
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
function $t({ status: e }) {
	return e === "ready" ? null : e === "processing" ? /* @__PURE__ */ Z("span", {
		"data-testid": "recording-row-status",
		"data-status": "processing",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1",
		children: [/* @__PURE__ */ X("span", { className: "size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" }), "Processing"]
	}) : /* @__PURE__ */ X("span", {
		"data-testid": "recording-row-status",
		"data-status": "failed",
		className: "absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white",
		children: "Failed"
	});
}
function en({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
	let f = typeof l == "function";
	return /* @__PURE__ */ Z("div", {
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
			/* @__PURE__ */ Z("div", {
				className: "relative aspect-video rounded bg-black overflow-hidden mb-2",
				children: [
					a ? /* @__PURE__ */ X("img", {
						src: a,
						alt: "",
						className: "w-full h-full object-cover",
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : /* @__PURE__ */ X("div", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ X("svg", {
							width: "36",
							height: "36",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ X("path", { d: "M8 5v14l11-7z" })
						})
					}),
					/* @__PURE__ */ X($t, { status: s }),
					/* @__PURE__ */ X("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: Zt(r)
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ X("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? Qt(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ Z("span", {
					className: "inline-flex shrink-0 items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)]",
					title: `${i} ${i === 1 ? "person" : "people"} in this call`,
					children: [i, /* @__PURE__ */ X(ee, { size: 12 })]
				})]
			}),
			o && /* @__PURE__ */ X("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: Qt(n)
			}),
			u && /* @__PURE__ */ X("div", {
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
function tn({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
	return i ? /* @__PURE__ */ X("div", {
		className: e("flex flex-col gap-2", s),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ Z("div", {
			className: "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse",
			children: [/* @__PURE__ */ X("div", { className: "aspect-video rounded bg-white/5 mb-2" }), /* @__PURE__ */ X("div", { className: "h-3 w-2/3 bg-white/5 rounded" })]
		}, e))
	}) : t.length === 0 ? /* @__PURE__ */ X("div", {
		className: e("rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]", s),
		children: a ?? "No recordings yet."
	}) : /* @__PURE__ */ X("div", {
		className: e("flex flex-col gap-2", s),
		children: t.map((e) => /* @__PURE__ */ X(en, {
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
var nn = 864e5, rn = [
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
function an(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function on(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
function sn(e, t, n = Date.now()) {
	if (e === "never") return null;
	let r = rn.find((t) => t.id === e);
	if (r?.days) return new Date(n + r.days * nn).toISOString();
	if (e === "custom") {
		if (!t) return;
		let e = /* @__PURE__ */ new Date(`${t}T23:59:59`);
		return Number.isNaN(e.getTime()) ? void 0 : e.toISOString();
	}
}
function cn({ open: e, expiresAt: t, onSave: n, onClose: r, title: a = "Recording expiry", "data-testid": o = "recording-expiry-dialog" }) {
	let [s, c] = J(t === null ? "never" : "custom"), [l, u] = J(t ? on(Date.parse(t)) : ""), [d, f] = J(!1), [p, m] = J(null);
	G(() => {
		e && (c(t === null ? "never" : "custom"), u(t ? on(Date.parse(t)) : ""), m(null), f(!1));
	}, [e, t]);
	let h = K(() => sn(s, l), [s, l]), g = typeof h == "string" && Date.parse(h) < Date.now() + 36e5, _ = h !== void 0 && !g && !d, v = t === null ? "This recording does not expire." : t ? `Set to expire ${an(t)}.` : "No expiry is recorded.", y = async () => {
		if (h !== void 0) {
			f(!0), m(null);
			try {
				await n(h), r();
			} catch (e) {
				m(e instanceof Error ? e.message : String(e)), f(!1);
			}
		}
	};
	return /* @__PURE__ */ X(V, {
		open: e,
		onClose: r,
		title: a,
		maxWidth: 440,
		footer: /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(i, {
			variant: "secondary",
			size: "sm",
			onClick: r,
			disabled: d,
			"data-testid": `${o}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ X(i, {
			variant: "primary",
			size: "sm",
			onClick: () => void y(),
			disabled: !_,
			"data-testid": `${o}-save`,
			children: d ? "Saving…" : "Save"
		})] }),
		children: /* @__PURE__ */ Z("div", {
			className: "flex min-h-[19rem] flex-col gap-3 text-sm",
			"data-testid": o,
			children: [
				/* @__PURE__ */ X("p", {
					className: "m-0 text-text-secondary",
					"data-testid": `${o}-current`,
					children: v
				}),
				/* @__PURE__ */ X(Se, {
					"data-testid": `${o}-choices`,
					children: rn.map((e) => /* @__PURE__ */ X(xe, {
						title: e.title,
						selected: s === e.id,
						onSelect: () => c(e.id),
						disabled: d,
						"data-testid": `${o}-choice-${e.id}`
					}, e.id))
				}),
				s === "custom" && /* @__PURE__ */ X(ie, {
					label: "Expires on",
					hint: "At the end of that day, your local time.",
					...g ? { error: "Pick a date at least an hour from now." } : {},
					children: (e) => /* @__PURE__ */ X("input", {
						"data-ui-part": "",
						...e,
						type: "date",
						value: l,
						min: on(Date.now()),
						onChange: (e) => u(e.target.value),
						className: "rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary",
						"data-testid": `${o}-date`
					})
				}),
				p && /* @__PURE__ */ X("p", {
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
function ln(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function un(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function dn(e) {
	let t = e.speakerId || e.speakerLabel;
	return t ? `hsl(${un(t)}, 65%, 60%)` : null;
}
var fn = "Speaker";
function pn({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, errorDetail: s, pendingMessage: c, idleState: l, className: u }) {
	let d = q(null), f = K(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	return G(() => {
		if (f < 0 || !d.current) return;
		let e = d.current.querySelector(`[data-seg-index="${f}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [f]), t === "idle" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-tertiary",
			children: l ?? "Transcription was not enabled for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ X("span", { children: a }),
				/* @__PURE__ */ X("span", {
					className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ X("span", {
					className: "text-xs font-normal text-text-tertiary",
					children: t === "pending" ? "queued" : "processing"
				})
			]
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-secondary",
			children: c ?? (t === "pending" ? "Transcription is queued. This usually starts within a few seconds." : "Generating transcript and summary. Long recordings may take several minutes.")
		})]
	}) : t === "failed" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-danger-border bg-surface p-4", u),
		children: [
			/* @__PURE__ */ Z("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [a, " — failed"]
			}),
			/* @__PURE__ */ X("div", {
				className: "text-sm text-text-secondary",
				children: o ?? "Transcript generation failed. Reach out to support if this persists."
			}),
			/* @__PURE__ */ X(ae, {
				text: s,
				className: "mt-2"
			})
		]
	}) : !n || n.length === 0 ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", u),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	}) : /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface flex flex-col", u),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: [a, /* @__PURE__ */ Z("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [n.length, " segments"]
			})]
		}), /* @__PURE__ */ X("div", {
			ref: d,
			className: "flex-1 overflow-y-auto max-h-[60vh] p-4 space-y-2",
			children: n.map((t, n) => {
				let r = n === f, a = dn(t), o = !!i;
				return /* @__PURE__ */ Z("div", {
					"data-seg-index": n,
					className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
					onClick: o ? () => i(t.startMs) : void 0,
					onKeyDown: o ? De(() => i(t.startMs)) : void 0,
					role: o ? "button" : void 0,
					tabIndex: o ? 0 : void 0,
					"aria-label": o ? `Seek to ${ln(t.startMs)} — ${t.speakerLabel ?? fn}` : void 0,
					children: [/* @__PURE__ */ Z("div", {
						className: "flex items-baseline gap-2 mb-1",
						children: [/* @__PURE__ */ X("span", {
							className: e("text-xs font-semibold", !a && "text-text-secondary"),
							...a ? { style: { color: a } } : {},
							children: t.speakerLabel ?? fn
						}), /* @__PURE__ */ X("span", {
							className: "text-xs font-mono text-text-tertiary",
							children: ln(t.startMs)
						})]
					}), /* @__PURE__ */ X("p", {
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
function mn({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, errorDetail: o, pendingMessage: s, idleState: c, className: l }) {
	return t === "idle" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ X("span", { children: i }), /* @__PURE__ */ X("span", {
				className: "inline-block h-2 w-2 rounded-full bg-warning animate-pulse",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-secondary",
			children: s ?? "Generating summary from the transcript. This typically completes within a minute of transcription finishing."
		})]
	}) : t === "failed" ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-danger-border bg-surface p-4", l),
		children: [
			/* @__PURE__ */ Z("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [i, " — failed"]
			}),
			/* @__PURE__ */ X("div", {
				className: "text-sm text-text-secondary",
				children: a ?? "Summary generation failed."
			}),
			/* @__PURE__ */ X(ae, {
				text: o,
				className: "mt-2"
			})
		]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ X("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface flex flex-col", l),
		children: [/* @__PURE__ */ X("header", {
			className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
			children: i
		}), /* @__PURE__ */ X("div", {
			className: "prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]",
			children: r ? r(n) : /* @__PURE__ */ X("pre", {
				className: "whitespace-pre-wrap text-sm font-sans text-text-primary",
				children: n
			})
		})]
	});
}
//#endregion
//#region src/components/video/PiPButton.tsx
function hn({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = J(!1), [o, s] = J(!1);
	G(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), G(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = W(async () => {
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
	return /* @__PURE__ */ X("button", {
		"data-ui-part": "",
		type: "button",
		onClick: c,
		disabled: l,
		title: r ?? (l ? "Picture-in-Picture not supported" : i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture"),
		"aria-label": i ? "Exit Picture-in-Picture" : "Open Picture-in-Picture",
		"aria-pressed": i,
		className: e("w-9 h-9 rounded flex items-center justify-center transition-colors", l ? "bg-white/5 text-white/30 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white", n),
		children: /* @__PURE__ */ X("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			"aria-hidden": !0,
			children: /* @__PURE__ */ X("path", { d: "M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z" })
		})
	});
}
//#endregion
//#region src/components/video/RosterPanel.tsx
function gn(e) {
	return typeof e == "number" ? e : e ? 2 ** 53 - 1 - 1 : 2 ** 53 - 1;
}
function _n(e) {
	return e.map((e, t) => ({
		p: e,
		i: t,
		rank: gn(e.handRaised)
	})).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.p);
}
function vn(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function yn({ participants: t, activeSpeakerId: n, onParticipantClick: r, count: a, title: o = "Participants", footer: s, tone: c = "light", raisedHandsFirst: l = !1, onLowerHand: u, onLowerAllHands: d, className: f }) {
	let p = c === "dark", m = a ?? t.length, h = l ? _n(t) : t, g = t.filter((e) => e.handRaised).length, _ = q(null), v = (e) => {
		let t = Array.from(_.current?.querySelectorAll("[data-testid=\"roster-lower-hand\"]") ?? []), n = e ? t.indexOf(e) : -1;
		((n >= 0 ? t[n + 1] ?? t[n - 1] : void 0) ?? _.current)?.focus();
	};
	return /* @__PURE__ */ Z("aside", {
		className: e("flex flex-col w-64 shrink-0 focus:outline-none", p ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", f),
		"aria-label": "Call participants",
		ref: _,
		tabIndex: -1,
		children: [
			/* @__PURE__ */ Z("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", p ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ X("h3", {
					className: e("text-sm font-semibold", p ? "text-white" : "text-[var(--color-text-primary)]"),
					children: o
				}), /* @__PURE__ */ Z("span", {
					className: "flex items-center gap-2",
					children: [d && g > 0 && /* @__PURE__ */ X(i, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							v(null), d();
						},
						className: p ? "text-white/80 hover:text-white" : void 0,
						"data-testid": "roster-lower-all",
						children: "Lower all hands"
					}), /* @__PURE__ */ X("span", {
						className: e("text-xs tabular-nums", p ? "text-white/50" : "text-[var(--color-text-secondary)]"),
						children: m
					})]
				})]
			}),
			/* @__PURE__ */ X("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: h.map((t) => {
					let a = t.id === n;
					return /* @__PURE__ */ Z("li", {
						className: "flex items-center",
						"data-testid": "roster-row",
						"data-user-id": t.id,
						children: [/* @__PURE__ */ Z("button", {
							"data-ui-part": "",
							type: "button",
							onClick: r ? () => r(t.id) : void 0,
							className: e("min-w-0 flex-1 flex items-center gap-3 px-4 py-2 text-left transition-colors", "hover:bg-white/[0.03]", a && "bg-white/[0.04]", r ? "cursor-pointer" : "cursor-default"),
							disabled: !r,
							children: [
								/* @__PURE__ */ Z("div", {
									className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", a && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
									children: [t.avatarUrl ? /* @__PURE__ */ X("img", {
										src: t.avatarUrl,
										alt: "",
										className: "w-full h-full rounded-full object-cover"
									}) : /* @__PURE__ */ X("span", { children: vn(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ X("span", {
										title: "Sharing screen",
										className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
									})]
								}),
								/* @__PURE__ */ Z("span", {
									className: e("flex-1 truncate text-sm", p ? "text-white/90" : "text-[var(--color-text-primary)]"),
									children: [t.displayName, t.isLocal && /* @__PURE__ */ X("span", {
										className: e("ml-1 text-xs", p ? "text-white/50" : "text-[var(--color-text-secondary)]"),
										children: "(you)"
									})]
								}),
								/* @__PURE__ */ X(Ae, {
									raised: t.handRaised,
									tone: p ? "overlay" : "chip",
									"data-testid": "roster-raised-hand"
								}),
								t.isMuted && /* @__PURE__ */ X("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 16 16",
									className: p ? "text-white/50" : "text-[var(--color-text-secondary)]",
									"aria-label": "Muted",
									children: /* @__PURE__ */ X("path", {
										fill: "currentColor",
										d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
									})
								})
							]
						}), u && t.handRaised && /* @__PURE__ */ X(i, {
							variant: "ghost",
							size: "sm",
							onClick: (e) => {
								v(e.currentTarget), u(t.id);
							},
							"aria-label": `Lower ${t.displayName}'s hand`,
							className: e("mr-2 shrink-0", p && "text-white/80 hover:text-white"),
							"data-testid": "roster-lower-hand",
							children: "Lower"
						})]
					}, t.id);
				})
			}),
			s && /* @__PURE__ */ X("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: s
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var bn = null;
function xn() {
	if (bn) return bn;
	try {
		return bn = new AudioContext(), bn;
	} catch {
		return null;
	}
}
function Sn({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = J(!1);
	return G(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = xn();
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
	]), G(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var Cn = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function wn() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function Tn({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = J(!1), c = q(null), l = a.videoRef ?? c, u = W((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = W(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		wn(), s(!1);
	}, [l]);
	return /* @__PURE__ */ Z("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ X(ke, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ X("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ X("button", {
				"data-ui-part": "",
				type: "button",
				onClick: d,
				className: e(Cn, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var En = 1;
function Dn({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = J(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== En ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: On(r.x, t.x),
				y: On(r.y, t.y),
				width: On(r.width, t.width),
				height: On(r.height, t.height)
			};
		} catch {
			try {
				window.localStorage.removeItem(e);
			} catch {}
			return t;
		}
	}), a = q(null), o = q(!1), s = q(r);
	s.current = r;
	let c = q({
		key: e,
		value: r
	}), l = W((e, t) => {
		try {
			let n = {
				v: En,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return G(() => {
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
	]), G(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: W((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function On(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var kn = 320, An = 200, jn = 640, Mn = 400, Nn = 1440, Pn = 900, Fn = 960, In = 600, $ = 8;
function Ln({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", inline: s = !1, onModeChange: c, persistKey: l, apiRef: u, defaultCorner: d = "bottom-right", expandable: f = !0, sidePanelTabs: p, activeSidePanelTab: m = null, onSidePanelTabChange: h, zIndex: g = 9999, className: _, "data-testid": v = "expandable-call-widget" }) {
	let y = o === "docked" ? "window" : o, b = K(() => y === "window" ? Hn(Fn, In) : Un(d), [y, d]), { state: x, setState: S } = Dn({
		persistKey: l,
		defaults: {
			mode: y,
			x: b.x,
			y: b.y,
			width: Fn,
			height: In
		}
	}), [C, w] = J(!1), T = C ? "fullscreen" : x.mode, E = q(null), D = p ?? [], O = D.length > 0, k = O && D.some((e) => e.id === m), A = q(!1);
	G(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== E.current && C && (w(!1), A.current || S({ mode: "window" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [C, S]);
	let j = W(() => {
		let e = E.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => w(!0), () => {}) : w(!0);
	}, []), M = W(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = W((e) => {
		let t = Tt(e);
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
				let e = Hn(x.width, x.height);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && T === "window") {
				let e = Un(d);
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
	G(() => {
		c?.(T);
	}, [T, c]), Fe(u, () => ({
		mode: T,
		setMode: N
	}), [T, N]);
	let P = q(null), ee = W((e) => {
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
	]), F = W((e) => {
		let t = P.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Gn(t.origX + n, x.width, window.innerWidth), a = Gn(t.origY + r, x.height, window.innerHeight);
		S({
			x: i,
			y: a
		});
	}, [
		S,
		x.width,
		x.height
	]), I = W((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), L = q(null), R = W((e) => {
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
	]), z = W((e) => {
		let t = L.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = Wn(t.origW + n, jn, Math.min(Nn, window.innerWidth - 16)), a = Wn(t.origH + r, Mn, Math.min(Pn, window.innerHeight - 16));
		S({
			width: i,
			height: a
		});
	}, [S]), B = W((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), L.current = null;
	}, []);
	Ie(() => {
		if (T !== "window") return;
		let e = () => {
			let e = Gn(x.x, x.width, window.innerWidth), t = Gn(x.y, x.height, window.innerHeight);
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
	let V = K(() => s ? {
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
		width: kn,
		height: An,
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
	return /* @__PURE__ */ Z("div", {
		ref: E,
		"data-testid": v,
		"data-call-widget-mode": T,
		"data-call-widget-mode-legacy": Et(T),
		"data-call-side-panel-open": k ? "true" : "false",
		style: V,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", T === "fullscreen" ? "rounded-none" : "rounded-lg", _),
		children: [
			/* @__PURE__ */ Z("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", T === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: ee,
				onPointerMove: F,
				onPointerUp: I,
				onPointerCancel: I,
				children: [/* @__PURE__ */ Z("div", {
					className: "min-w-0 flex items-center gap-2 text-xs text-white/80",
					children: [
						/* @__PURE__ */ X("span", {
							className: "w-2 h-2 rounded-full bg-success",
							"aria-hidden": !0
						}),
						/* @__PURE__ */ X("span", {
							className: "truncate font-medium",
							"data-testid": "call-widget-window-title",
							children: t
						}),
						n && /* @__PURE__ */ X("span", {
							className: "truncate text-white/50",
							children: n
						}),
						r !== void 0 && /* @__PURE__ */ X("span", {
							className: "font-mono text-white/60",
							"data-testid": "call-timer",
							"data-call-duration": r,
							children: Pt(r)
						})
					]
				}), f && /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ X(Rn, {
							active: T === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ X(zn, {})
						}),
						/* @__PURE__ */ X(Rn, {
							active: T === "window",
							label: "Window",
							onClick: () => N("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ X(Bn, {})
						}),
						/* @__PURE__ */ X(Rn, {
							active: T === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(T === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ X(Vn, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: e("relative flex-1 min-h-0 bg-black", k && "flex items-stretch"),
				children: [k ? /* @__PURE__ */ X("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, k && /* @__PURE__ */ X(wt, {
					mode: T,
					tabs: D,
					activeTab: m,
					onTabChange: h,
					widthClassName: T === "fullscreen" ? "w-96" : "w-80"
				})]
			}),
			(a || O) && /* @__PURE__ */ X("div", {
				className: "border-t border-white/5 px-2 py-2 bg-video-tile",
				children: O ? /* @__PURE__ */ Z("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ X("div", {
						className: "min-w-0 flex-1",
						children: a
					}), /* @__PURE__ */ X(St, {
						tabs: D,
						activeTab: m,
						onTabChange: h
					})]
				}) : a
			}),
			T === "window" && /* @__PURE__ */ X("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: R,
				onPointerMove: z,
				onPointerUp: B,
				onPointerCancel: B,
				"data-testid": "call-widget-resize-handle",
				"aria-label": "Resize call widget",
				children: /* @__PURE__ */ X("svg", {
					viewBox: "0 0 16 16",
					className: "w-full h-full text-white/30",
					children: /* @__PURE__ */ X("path", {
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
function Rn({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ X("button", {
		"data-ui-part": "",
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
function zn() {
	return /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ X("rect", {
			x: "6.5",
			y: "6.5",
			width: "4",
			height: "3",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Bn() {
	return /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ X("rect", {
			x: "1.5",
			y: "2.5",
			width: "9",
			height: "7",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
function Vn() {
	return /* @__PURE__ */ X("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": !0,
		children: /* @__PURE__ */ X("path", {
			d: "M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}
function Hn(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max($, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max($, Math.floor((window.innerHeight - t) / 2))
	};
}
function Un(e) {
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
			x: t - kn - $,
			y: $
		};
		case "bottom-left": return {
			x: $,
			y: n - An - $
		};
		default: return {
			x: t - kn - $,
			y: n - An - $
		};
	}
}
function Wn(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Gn(e, t, n) {
	return Wn(e, $, Math.max($, n - t - $));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Kn({ show: e, label: t }) {
	return e ? /* @__PURE__ */ Z("div", {
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
function qn({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ X("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var Jn = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Yn = 3e3, Xn = .35;
function Zn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Jn[Math.abs(t) % Jn.length];
}
function Qn({ lines: t, maxLines: n = 4, fadeAfterMs: r = Yn, now: i, className: a }) {
	let [, o] = J(0), s = i === void 0, c = t.length > 0;
	G(() => {
		if (!s || !c) return;
		let e = setInterval(() => o((e) => e + 1), 500);
		return () => clearInterval(e);
	}, [s, c]);
	let l = i ?? Date.now(), u = q(/* @__PURE__ */ new Map()).current, d = new Set(t.map((e) => e.id));
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(Xn, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Yn);
	return f.length === 0 ? null : /* @__PURE__ */ Z("div", {
		className: e("absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[min(720px,80%)] z-20", "flex flex-col items-start gap-1 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm overflow-hidden", a),
		"aria-live": "polite",
		"aria-label": "Live transcript",
		children: [/* @__PURE__ */ X("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-lg bg-gradient-to-b from-black/60 to-transparent"
		}), f.map((t) => /* @__PURE__ */ Z("div", {
			className: e("transcript-line-enter flex items-baseline gap-2 text-sm transition-opacity", t.interim && "italic"),
			style: { opacity: t.opacity },
			children: [/* @__PURE__ */ X("span", {
				className: "font-medium text-xs shrink-0",
				style: { color: Zn(t.speakerId) },
				children: t.speakerName ?? t.speakerId.slice(0, 6)
			}), /* @__PURE__ */ X("span", {
				className: "transcript-line-scrim text-white",
				children: t.text
			})]
		}, t.id))]
	});
}
//#endregion
//#region src/components/video/CircularIconToggle.tsx
var $n = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, er = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", tr = "bg-surface-hover text-neutral hover:bg-surface-emphasis", nr = "bg-danger-bg text-danger-fg hover:bg-danger-bg";
function rr({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, className: c, ...l }) {
	let u = t ? er : a === "danger" ? nr : tr;
	return /* @__PURE__ */ X("button", {
		"data-ui-part": "",
		type: "button",
		"aria-label": i,
		"aria-pressed": t,
		disabled: s,
		className: e("rounded-full grid place-items-center transition-colors duration-150", $n[o], u, s && "opacity-40 cursor-not-allowed", !s && "cursor-pointer", c),
		...l,
		children: t ? n : r
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function ir(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function ar(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
var or = "bg-white/15 text-white hover:bg-white/25", sr = "bg-white text-video-stage hover:bg-white";
function cr({ channelName: t, eyebrow: n, localIdentity: r, previewStream: a, permission: o, permissionMessage: s, audioEnabled: c, videoEnabled: l, onToggleAudio: u, onToggleVideo: d, onRetryPermission: f, participants: p, readyState: m, readyLoading: h = !1, effectsSlot: g, devicesSlot: _, devicesOpen: v, onToggleDevices: x, secondaryActions: S, onJoin: C, onCancel: E, joinLabel: D, joinDisabled: O, subtitleOverride: k, className: A, "data-testid": j }) {
	let M = q(null), [N, ee] = J(!1);
	G(() => {
		M.current && a && (M.current.srcObject = a);
	}, [a]);
	let F = o === "granted", I = ar(o), L = O ?? !F, R = D ?? (L && !F ? "Allow camera to join" : "Join now"), z = k ?? ir(p, m, h), B = !!_, V = B && (v ?? N);
	function H(e) {
		v === void 0 && ee(e), x?.(e);
	}
	return /* @__PURE__ */ X("div", {
		"data-testid": j,
		className: e("flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary", A),
		children: /* @__PURE__ */ X("div", {
			className: "mx-auto w-full max-w-5xl flex flex-col gap-4 px-4 py-4 sm:px-5",
			children: /* @__PURE__ */ Z("div", {
				className: "flex flex-col lg:flex-row lg:items-start gap-4",
				children: [/* @__PURE__ */ Z("section", {
					"data-ui-part": "",
					className: "w-full min-w-0 lg:flex-1 flex flex-col gap-4",
					children: [/* @__PURE__ */ Z("div", {
						className: "relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage",
						children: [
							a && F && /* @__PURE__ */ X("video", {
								ref: M,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !l && "opacity-0")
							}),
							F && !l && (r ? /* @__PURE__ */ X("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ Z("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ X(U, {
										name: r.displayName,
										src: r.avatarSrc,
										size: 96
									}), /* @__PURE__ */ Z("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ X("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: r.displayName
										}), /* @__PURE__ */ X("span", {
											className: "text-white/60 text-xs",
											children: "Camera off"
										})]
									})]
								})
							}) : /* @__PURE__ */ X("div", {
								"data-testid": "prejoin-camera-off-fallback",
								className: "absolute inset-0 grid place-items-center text-white/60 text-sm",
								children: "Camera off"
							})),
							o === "pending" && /* @__PURE__ */ X("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ X(le, { size: "lg" })
							}),
							I && /* @__PURE__ */ X("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ X(oe, {
									kind: "camera",
									state: I,
									message: s,
									onRetry: f,
									"data-testid": "prejoin-permission-card"
								})
							}),
							/* @__PURE__ */ X("div", {
								className: "absolute right-2 top-1/2 -translate-y-1/2 sm:right-3",
								children: /* @__PURE__ */ Z("div", {
									className: "flex flex-col items-center gap-2 rounded-full bg-black/55 p-2 backdrop-blur-sm",
									children: [
										/* @__PURE__ */ X(rr, {
											on: c,
											onClick: u,
											disabled: !F,
											"aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
											title: c ? "Mute mic before joining" : "Unmute mic before joining",
											iconOn: /* @__PURE__ */ X(T, { size: 18 }),
											iconOff: /* @__PURE__ */ X(y, { size: 18 }),
											className: e(c && or),
											"data-testid": "prejoin-toggle-audio"
										}),
										/* @__PURE__ */ X(rr, {
											on: l,
											onClick: d,
											disabled: !F,
											"aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
											title: l ? "Turn camera off before joining" : "Turn camera on before joining",
											iconOn: /* @__PURE__ */ X(b, { size: 18 }),
											iconOff: /* @__PURE__ */ X(P, { size: 18 }),
											className: e(l && or),
											"data-testid": "prejoin-toggle-video"
										}),
										B && /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X("span", {
											"aria-hidden": "true",
											className: "h-px w-6 bg-white/20"
										}), /* @__PURE__ */ X(rr, {
											on: V,
											onClick: () => H(!V),
											"aria-label": V ? "Close device settings" : "Open device settings",
											title: V ? "Close device settings" : "Open device settings",
											iconOn: /* @__PURE__ */ X(w, { size: 18 }),
											iconOff: /* @__PURE__ */ X(w, { size: 18 }),
											className: V ? sr : or,
											"data-testid": "prejoin-devices-toggle"
										})] })
									]
								})
							})
						]
					}), g && /* @__PURE__ */ X("div", {
						"data-testid": "prejoin-effects-slot",
						children: g
					})]
				}), /* @__PURE__ */ Z("section", {
					"data-ui-part": "",
					className: "w-full lg:w-72 xl:w-80 lg:shrink-0 lg:self-stretch flex flex-col gap-3 lg:justify-between",
					children: [/* @__PURE__ */ Z("div", {
						className: "flex flex-col gap-3 min-h-0",
						children: [/* @__PURE__ */ Z("div", {
							className: "min-w-0",
							children: [
								n && /* @__PURE__ */ X("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral",
									children: n
								}),
								/* @__PURE__ */ X("h1", {
									"data-testid": "prejoin-title",
									className: "text-lg font-semibold leading-tight truncate",
									children: t
								}),
								/* @__PURE__ */ X("p", {
									"data-testid": "prejoin-subtitle",
									className: "mt-0.5 text-xs text-neutral",
									children: z
								})
							]
						}), V ? /* @__PURE__ */ Z("div", {
							"data-testid": "prejoin-devices-panel",
							className: "rounded-xl border border-border bg-surface p-3",
							children: [/* @__PURE__ */ Z("div", {
								className: "flex items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ X("h2", {
									className: "text-sm font-semibold",
									children: "Device settings"
								}), /* @__PURE__ */ X(i, {
									variant: "ghost",
									size: "sm",
									onClick: () => H(!1),
									"data-testid": "prejoin-devices-close",
									children: "Close"
								})]
							}), _]
						}) : /* @__PURE__ */ Z("div", {
							className: e(h || p && p.length > 0 ? "rounded-xl border border-border bg-surface p-3" : "px-0.5"),
							children: [/* @__PURE__ */ X(lr, {
								participants: p,
								loading: h
							}), m === "pending" && !h && /* @__PURE__ */ Z("p", {
								className: "mt-3 text-xs text-warning-fg flex items-center gap-2",
								children: [/* @__PURE__ */ X("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Other publishers are still connecting — you can join anyway."]
							})]
						})]
					}), /* @__PURE__ */ Z("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ X(i, {
								variant: "primary",
								size: "lg",
								fullWidth: !0,
								onClick: () => C({
									audio: c,
									video: l
								}),
								disabled: L,
								"data-testid": "prejoin-join-button",
								children: R
							}),
							S && /* @__PURE__ */ X("div", {
								"data-testid": "prejoin-secondary-actions",
								children: S
							}),
							/* @__PURE__ */ X("button", {
								"data-ui-part": "",
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
function lr({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ Z("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ X(le, { size: "sm" }), " Finding people…"]
	}) : !e || e.length === 0 ? /* @__PURE__ */ X("div", {
		className: "text-xs text-neutral",
		children: "Nobody here yet."
	}) : /* @__PURE__ */ Z("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ X("div", {
			className: "text-xs uppercase tracking-wide text-neutral",
			children: "In the room"
		}), /* @__PURE__ */ Z("ul", {
			className: "flex flex-col gap-1.5",
			children: [e.slice(0, 8).map((e) => {
				let t = e.displayName ?? e.participantId.slice(0, 8);
				return /* @__PURE__ */ Z("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ X(U, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ X("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ X(a, {
							size: "xs",
							tone: e.ready ? "success" : "warning",
							dot: e.ready ? "static" : "pulse",
							uppercase: !0,
							className: "ml-auto",
							children: e.ready ? "live" : "connecting"
						})
					]
				}, e.participantId);
			}), e.length > 8 && /* @__PURE__ */ Z("li", {
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
var ur = {
	active: "Recording — saved to /recordings when the call ends",
	armed: "Recording armed — will start once the call is under way"
};
function dr({ armed: e, active: t, titles: n, className: r, "data-testid": i = "recording-chip" }) {
	return !e && !t ? null : /* @__PURE__ */ X(a, {
		tone: t ? "danger" : "neutral",
		size: "xs",
		uppercase: !0,
		dot: t ? "pulse" : "static",
		title: t ? n?.active ?? ur.active : n?.armed ?? ur.armed,
		className: r,
		"data-testid": i,
		"aria-label": t ? "Recording" : "Recording armed",
		children: "Rec"
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var fr = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, pr = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function mr() {
	return /* @__PURE__ */ Z("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ X("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ X("polyline", { points: "12 7 12 12 15 14" })]
	});
}
function hr({ channelName: t, subtitle: n, recording: r, elapsedLabel: i, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ Z("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ Z("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ X("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (n || r?.armed || i) && /* @__PURE__ */ Z("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					n && /* @__PURE__ */ X("span", { children: n }),
					r?.armed && /* @__PURE__ */ X(dr, {
						armed: r.armed,
						active: r.active,
						titles: { armed: "Recording armed — will start when someone joins" },
						"data-testid": "hangout-room-header-recording"
					}),
					i && /* @__PURE__ */ X(a, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ X(mr, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ X("span", {
							className: "tabular-nums",
							children: i
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ Z("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ X(a, {
				tone: fr[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: pr[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/HuddleBar.tsx
var gr = {
	idle: "offline",
	joinable: "online",
	live: "online",
	connecting: "away",
	ringing: "away",
	reconnecting: "away",
	ended: "offline"
}, _r = {
	idle: "No call",
	joinable: "Huddle live",
	live: "Live",
	connecting: "Connecting",
	ringing: "Ringing",
	reconnecting: "Reconnecting",
	ended: "Ended"
}, vr = {
	idle: null,
	joinable: null,
	live: null,
	connecting: "Connecting…",
	ringing: "Ringing…",
	reconnecting: "Reconnecting…",
	ended: "Ended"
};
function yr(e, t) {
	let [n, r] = J(() => Date.now());
	return G(() => {
		if (!t || e == null) return;
		r(Date.now());
		let n = setInterval(() => r(Date.now()), 1e3);
		return () => clearInterval(n);
	}, [t, e]), t && e != null ? Math.max(0, n - e) : null;
}
function br(e, t) {
	let n = `${e} joined`;
	return t > 0 ? `${n} · ${t} ringing` : n;
}
function xr({ name: t, showContext: n = !0, phase: r = "live", statusLabel: a, startedAt: o, participantCount: s, ringingCount: c = 0, mic: u, camera: p, shareSlot: m, onToggleChat: h, chatOpen: g = !1, chatUnread: _ = 0, onToggleMedia: v, mediaOpen: y = !1, mediaToggleLabel: b = "Participants", onStart: x, startLabel: S = "Huddle", startDisabledReason: C, liveParticipants: w = [], onJoin: T, joinLabel: E = "Join", joinDisabledReason: D, chatLabel: O = "Chat", chatDisabledReason: k, onLeave: A, leaveLabel: j = "Leave", meetingItems: M, extras: P, className: ee, "data-testid": F = "huddle-bar" }) {
	let I = yr(o, r === "live"), L = a === void 0 ? vr[r] : a, z = r === "joinable", B = r === "idle" || z, V = s ?? w.length, H = (e, t) => /* @__PURE__ */ X(Oe, {
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
		"data-testid": `${F}-${e === "microphone" ? "mic" : "camera"}`
	});
	return /* @__PURE__ */ Z("div", {
		role: "group",
		"aria-label": r === "idle" ? t : `${t} huddle`,
		"data-testid": F,
		"data-phase": r,
		className: e("@container flex min-w-0 items-center gap-3 px-3 py-1.5", ee),
		children: [n && /* @__PURE__ */ Z("div", {
			className: "flex min-w-0 items-center gap-2",
			"data-testid": `${F}-status`,
			children: [
				/* @__PURE__ */ X(be, {
					state: gr[r],
					ariaLabel: _r[r],
					"data-testid": `${F}-dot`
				}),
				/* @__PURE__ */ X(R, {
					className: "min-w-0 truncate",
					size: "xs",
					weight: r === "idle" ? "normal" : "medium",
					tone: r === "idle" ? "secondary" : "primary",
					title: t,
					"data-testid": `${F}-name`,
					children: t
				}),
				z && /* @__PURE__ */ Z(R, {
					className: "shrink-0",
					size: "xs",
					tone: "secondary",
					"data-testid": `${F}-live`,
					children: [
						"huddle live · ",
						V,
						" joined"
					]
				}),
				z && w.length > 0 && /* @__PURE__ */ X(R, {
					className: "hidden shrink-0 @sm:inline-flex",
					"data-testid": `${F}-avatars`,
					children: /* @__PURE__ */ X(Te, {
						users: w.map((e) => ({
							id: e.id,
							name: e.displayName,
							...e.avatarUrl ? { avatarUrl: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 20
					})
				}),
				L != null && /* @__PURE__ */ X(R, {
					className: "shrink-0",
					size: "xs",
					tone: "secondary",
					"data-testid": `${F}-phase`,
					children: L
				}),
				I !== null && /* @__PURE__ */ X(R, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "tertiary",
					tabular: !0,
					"data-testid": `${F}-timer`,
					children: Me(I)
				}),
				s !== void 0 && !z && /* @__PURE__ */ X(R, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "secondary",
					"data-testid": `${F}-people`,
					children: br(s, c)
				})
			]
		}), /* @__PURE__ */ Z("div", {
			className: "ml-auto flex shrink-0 items-center gap-2",
			children: [
				!z && u && H("microphone", u),
				!z && p && H("camera", p),
				!z && m != null && /* @__PURE__ */ X(R, {
					className: "items-center",
					"data-testid": `${F}-share`,
					children: m
				}),
				!z && v && /* @__PURE__ */ Z(i, {
					variant: y ? "secondary" : "ghost",
					size: "sm",
					onClick: v,
					"aria-pressed": y,
					"aria-expanded": y,
					"aria-label": b,
					title: b,
					"data-testid": `${F}-media`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ X(l, { size: 16 }), s !== void 0 && /* @__PURE__ */ X(R, {
						tabular: !0,
						children: s
					})]
				}),
				r === "idle" && x && /* @__PURE__ */ Z(i, {
					variant: "secondary",
					size: "sm",
					onClick: x,
					disabled: C !== void 0,
					title: C,
					"data-testid": `${F}-start`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ X(f, { size: 16 }), S]
				}),
				z && T && /* @__PURE__ */ Z(i, {
					variant: "primary",
					size: "sm",
					onClick: T,
					disabled: D !== void 0,
					title: D,
					"aria-label": `${E} ${t} huddle`,
					"data-testid": `${F}-join`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ X(f, { size: 16 }), E]
				}),
				h && /* @__PURE__ */ Z(R, {
					className: "relative inline-flex",
					children: [/* @__PURE__ */ Z(i, {
						variant: g ? "secondary" : "ghost",
						size: "sm",
						onClick: h,
						"aria-pressed": g,
						"aria-label": O,
						disabled: k !== void 0,
						title: k,
						"data-testid": `${F}-chat`,
						className: "gap-1.5",
						children: [/* @__PURE__ */ X(d, { size: 16 }), /* @__PURE__ */ X(R, {
							className: "hidden @lg:inline",
							children: O
						})]
					}), _ > 0 && /* @__PURE__ */ X(R, {
						className: "absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-[10px] leading-none text-white",
						weight: "semibold",
						"data-testid": `${F}-chat-unread`,
						children: _ > 99 ? "99+" : _
					})]
				}),
				!B && M?.map((e) => /* @__PURE__ */ X(Sr, {
					item: e,
					testId: `${F}-meeting-${e.id}`
				}, e.id)),
				P,
				!B && A && /* @__PURE__ */ Z(i, {
					variant: "danger-solid",
					size: "sm",
					onClick: A,
					"aria-label": j,
					"data-testid": `${F}-leave`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ X(N, { size: 16 }), /* @__PURE__ */ X(R, {
						className: "hidden @lg:inline",
						children: j
					})]
				})
			]
		})]
	});
}
function Sr({ item: e, testId: t }) {
	let n = q(null), [r, a] = J(!1), o = !!e.popover, s = o && r && !e.disabled, c = e.pressed || e.active || s, l = e.count === void 0 ? e.label : `${e.label}, ${e.count}`;
	return /* @__PURE__ */ Z(R, {
		className: "relative inline-flex",
		children: [
			/* @__PURE__ */ Z(i, {
				ref: n,
				variant: c ? "secondary" : "ghost",
				size: "sm",
				onClick: o ? () => a((e) => !e) : e.onClick,
				disabled: e.disabled,
				title: e.disabled && e.disabledReason ? e.disabledReason : e.title ?? e.label,
				"aria-label": l,
				"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
				"aria-expanded": o ? s : e.active === void 0 ? void 0 : e.active,
				"aria-haspopup": o ? "dialog" : void 0,
				"data-testid": t,
				className: "gap-1.5 [&_svg]:size-4",
				children: [
					e.icon,
					e.count !== void 0 && /* @__PURE__ */ X(R, {
						tabular: !0,
						children: e.count
					}),
					/* @__PURE__ */ X(R, {
						className: "hidden @lg:inline",
						children: e.label
					})
				]
			}),
			!!e.badge && /* @__PURE__ */ X(R, {
				className: "absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-text-inverse",
				size: "xs",
				weight: "semibold",
				"data-testid": `${t}-badge`,
				children: e.badge > 99 ? "99+" : e.badge
			}),
			o && /* @__PURE__ */ X(re, {
				trigger: n,
				open: s,
				onClose: () => a(!1),
				placement: e.popoverPlacement ?? "bottom-end",
				"aria-label": e.popoverLabel ?? e.label,
				kind: "huddle-bar-popover",
				"data-testid": `${t}-popover`,
				children: s && e.popover(() => a(!1))
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var Cr = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, wr = {
	sm: 16,
	md: 20,
	lg: 24
};
function Tr({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, extras: d, leaveLabel: f = "Leave call", size: p = "md", className: m, "data-testid": h }) {
	let g = p === "lg" ? 22 : p === "sm" ? 16 : 18;
	return /* @__PURE__ */ Z("div", {
		"data-testid": h,
		className: e("flex items-center justify-center gap-3 px-4 py-3", m),
		children: [
			/* @__PURE__ */ X(rr, {
				on: t,
				onClick: i,
				disabled: c,
				size: p,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ X(T, { size: g }),
				iconOff: /* @__PURE__ */ X(y, { size: g }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ X(rr, {
				on: n,
				onClick: a,
				disabled: l,
				size: p,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ X(b, { size: g }),
				iconOff: /* @__PURE__ */ X(P, { size: g }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ X(rr, {
				on: r,
				onClick: o,
				disabled: u,
				size: p,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ X(A, { size: g }),
				iconOff: /* @__PURE__ */ X(D, { size: g }),
				"data-testid": "media-controls-screenshare"
			}),
			d,
			/* @__PURE__ */ X("button", {
				"data-ui-part": "",
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", Cr[p], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ X(N, { size: wr[p] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var Er = {
	devices: "Devices",
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function Dr({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", devicesContent: a, effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...a == null ? [] : ["devices"],
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = J(i);
	G(() => {
		t && m(i);
	}, [t, i]);
	let h = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ X(V, {
		open: t,
		onClose: n,
		ariaLabel: u,
		maxWidth: 768,
		rawChildren: !0,
		backdropTestId: "call-settings-backdrop",
		cardClassName: "max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden",
		children: /* @__PURE__ */ Z("div", {
			"data-testid": "call-settings-dialog",
			className: e("flex flex-col", d),
			children: [/* @__PURE__ */ Z("header", {
				className: "flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3",
				children: [/* @__PURE__ */ X("h2", {
					className: "m-0 text-sm font-semibold text-white",
					children: u
				}), /* @__PURE__ */ X("button", {
					"data-ui-part": "",
					type: "button",
					"aria-label": "Close",
					onClick: n,
					"data-testid": "call-settings-close",
					className: "grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white",
					children: "×"
				})]
			}), /* @__PURE__ */ Z("div", {
				className: "flex flex-col sm:flex-row sm:items-stretch",
				children: [l && /* @__PURE__ */ X("div", {
					"data-testid": "call-settings-preview",
					className: e("relative shrink-0 overflow-hidden bg-video-stage", "aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]"),
					children: r ? /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(ke, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					}), /* @__PURE__ */ X("span", {
						className: "absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white",
						"data-testid": "call-settings-preview-label",
						children: "You"
					})] }) : /* @__PURE__ */ Z("div", {
						"data-testid": "call-settings-preview-empty",
						className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": !0,
							className: "text-2xl",
							children: "📷"
						}), "Camera off"]
					})
				}), /* @__PURE__ */ Z("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [f.length > 0 && /* @__PURE__ */ X("div", {
						role: "tablist",
						"aria-label": "Call settings sections",
						className: "flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2",
						children: f.map((t) => /* @__PURE__ */ X("button", {
							"data-ui-part": "",
							type: "button",
							role: "tab",
							"aria-selected": t === h,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === h ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: Er[t]
						}, t))
					}), /* @__PURE__ */ Z("div", {
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
function Or(e) {
	return `Start broadcasting this room and tell everyone in ${e ?? "the channel"}`;
}
var kr = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50", Ar = "text-xs text-text-tertiary";
function jr({ live: t = !1, starting: n = !1, onGoLive: r, onEndBroadcast: i, viewerCount: a, streamReady: o, connection: s = "online", channelName: c, error: l, endHint: u, label: d, disabled: f, className: p, "data-testid": m = "go-live" }) {
	if (t) {
		let t = s !== "online", n = t || o === !1;
		return /* @__PURE__ */ Z("div", {
			className: e("flex flex-col gap-1", p),
			children: [/* @__PURE__ */ Z("div", {
				"data-testid": m,
				"data-live": "true",
				"data-stream": o === void 0 ? "unknown" : o ? "ready" : "pending",
				"data-connection": s,
				className: "inline-flex items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						"data-testid": `${m}-status`,
						role: "status",
						className: e(kr, n ? "bg-warning-bg text-warning-fg" : "bg-danger text-white"),
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": !0,
							className: e("h-1.5 w-1.5 rounded-full", n ? "bg-warning-fg" : "bg-white")
						}), t ? s === "offline" ? "You are offline — nobody is receiving this" : "Reconnecting — your audience may not be receiving this" : n ? "On the call — no stream yet" : "You are live"]
					}),
					!n && typeof a == "number" && Number.isFinite(a) && a >= 0 && /* @__PURE__ */ Z("span", {
						"data-testid": `${m}-viewers`,
						className: Ar,
						children: [a, " watching"]
					}),
					i && /* @__PURE__ */ X("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${m}-end`,
						onClick: i,
						className: e(kr, "cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover"),
						children: "End broadcast"
					})
				]
			}), (n || !i && u) && /* @__PURE__ */ X("span", {
				"data-testid": `${m}-hint`,
				className: Ar,
				children: t ? s === "offline" ? "Your connection dropped. The broadcast resumes if it comes back." : "Your connection is unstable. What you see locally is not what they see." : n ? "Nobody can watch yet — the stream has not started." : u
			})]
		});
	}
	return /* @__PURE__ */ Z("div", {
		className: e("flex flex-col gap-1", p),
		children: [
			/* @__PURE__ */ Z("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": m,
				"data-live": "false",
				disabled: f || n,
				onClick: r,
				title: Or(c),
				"aria-label": n ? "Going live…" : `${d ?? "Go live"} — ${Or(c).toLowerCase()}`,
				className: e(kr, "cursor-pointer bg-danger text-white hover:opacity-90"),
				children: [/* @__PURE__ */ X("span", {
					"aria-hidden": !0,
					className: "h-1.5 w-1.5 rounded-full bg-white"
				}), n ? "Going live…" : d ?? "Go live"]
			}),
			/* @__PURE__ */ X("span", {
				"data-testid": `${m}-hint`,
				className: Ar,
				children: n ? "Connecting — this takes a few seconds." : `Starts a broadcast in ${c ?? "this channel"} and tells everyone there.`
			}),
			l && /* @__PURE__ */ X("span", {
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
function Mr() {
	let [e, t] = J(!1), n = q(null);
	return {
		play: W(async (e) => {
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
function Nr({ value: e, onChange: t, showCamera: n = !0, children: a, "data-testid": o = "device-settings" }) {
	let s = r(), { play: c, playing: l } = Mr();
	if (!s.supported) return /* @__PURE__ */ X("p", {
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
	return /* @__PURE__ */ Z("div", {
		"data-testid": o,
		className: "flex flex-col gap-3",
		children: [
			s.labelsHidden ? /* @__PURE__ */ X("p", {
				"data-testid": `${o}-labels-hidden`,
				className: "m-0 text-xs text-text-tertiary",
				children: "Device names appear once the browser has been allowed to use your microphone or camera."
			}) : null,
			/* @__PURE__ */ Z("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Microphone", /* @__PURE__ */ X(te, {
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
			n ? /* @__PURE__ */ Z("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Camera", /* @__PURE__ */ X(te, {
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
			s.canSelectSpeaker ? /* @__PURE__ */ Z("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Speaker", /* @__PURE__ */ Z("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ X(te, {
						size: "sm",
						"data-testid": `${o}-speaker`,
						value: e.speakerId ?? "",
						onChange: (n) => t({
							...e,
							speakerId: n.target.value || void 0
						}),
						options: u(s.speakers, e.speakerId),
						className: "min-w-0 flex-1"
					}), /* @__PURE__ */ X(i, {
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
function Pr(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Fr({ src: t, autoPlay: n = !1, onFirstPlay: r, onEnded: i, durationHint: a, size: o = "md", className: s, "data-testid": c = "audio-player" }) {
	let l = q(null), [u, d] = J(!1), [f, p] = J(0), [m, h] = J(a ?? 0), g = q(!1);
	G(() => {
		d(!1), p(0), h(a ?? 0), g.current = !1;
	}, [t, a]);
	let _ = () => {
		let e = l.current;
		e && (u ? e.pause() : e.play().catch(() => d(!1)));
	}, v = (e) => {
		let t = l.current;
		t && (t.currentTime = e, p(e));
	}, y = m > 0 ? m : Math.max(f, 1);
	return /* @__PURE__ */ Z("div", {
		className: e("flex min-w-0 items-center gap-2", o === "sm" ? "text-xs" : "text-sm", s),
		"data-testid": c,
		"data-playing": u,
		children: [
			/* @__PURE__ */ X("audio", {
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
			/* @__PURE__ */ X(rr, {
				on: u,
				offTone: "neutral",
				size: o === "sm" ? "sm" : "md",
				"aria-label": u ? "Pause" : "Play",
				iconOn: /* @__PURE__ */ X(x, { size: o === "sm" ? 14 : 18 }),
				iconOff: /* @__PURE__ */ X(S, { size: o === "sm" ? 14 : 18 }),
				onClick: _,
				"data-testid": `${c}-toggle`
			}),
			/* @__PURE__ */ X("span", {
				className: "w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary",
				"data-testid": `${c}-time`,
				children: Pr(f)
			}),
			/* @__PURE__ */ X(he, {
				"aria-label": "Seek",
				min: 0,
				max: y,
				step: .1,
				value: Math.min(f, y),
				onChange: v,
				className: "min-w-[96px] flex-1",
				"data-testid": `${c}-scrubber`
			}),
			/* @__PURE__ */ X("span", {
				className: "w-9 shrink-0 font-mono tabular-nums text-text-tertiary",
				"data-testid": `${c}-duration`,
				children: Pr(m)
			})
		]
	});
}
//#endregion
//#region src/components/video/VoicemailRecorder.tsx
function Ir(e) {
	let t = Math.max(0, Math.floor(e / 1e3));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Lr({ open: e, onClose: t, recipientName: r, getStream: a, onSend: o, maxSeconds: s = 60, "data-testid": c = "voicemail-recorder" }) {
	let l = n({
		getStream: a,
		maxMs: s * 1e3
	}), [u, d] = J(!1), [f, p] = J(null), m = q(!1);
	G(() => {
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
	return /* @__PURE__ */ X(V, {
		open: e,
		onClose: t,
		title: `Leave a voicemail for ${r}`,
		maxWidth: 440,
		footer: /* @__PURE__ */ Z("div", {
			className: "flex w-full items-center justify-end gap-2",
			"data-testid": `${c}-actions`,
			children: [
				/* @__PURE__ */ X(i, {
					variant: "ghost",
					size: "sm",
					onClick: t,
					disabled: u,
					"data-testid": `${c}-cancel`,
					children: "Cancel"
				}),
				l.state === "recording" && /* @__PURE__ */ X(i, {
					variant: "primary",
					size: "sm",
					onClick: l.stop,
					"data-testid": `${c}-stop`,
					children: "Stop"
				}),
				(l.state === "recorded" || l.state === "error") && /* @__PURE__ */ X(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void l.start(),
					disabled: u,
					"data-testid": `${c}-rerecord`,
					children: l.state === "error" ? "Try again" : "Re-record"
				}),
				l.state === "recorded" && /* @__PURE__ */ X(i, {
					variant: "primary",
					size: "sm",
					onClick: () => void h(),
					disabled: u || !l.blob,
					"data-testid": `${c}-send`,
					children: u ? "Sending…" : "Send voicemail"
				})
			]
		}),
		children: /* @__PURE__ */ Z("div", {
			className: "flex flex-col items-center gap-3 py-2",
			"data-testid": c,
			"data-state": l.state,
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2 text-sm text-text-secondary",
					role: "status",
					"data-testid": `${c}-status`,
					children: [l.state === "recording" && /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger"
					}), g]
				}),
				/* @__PURE__ */ Z("div", {
					className: "font-mono text-3xl tabular-nums text-text-primary",
					"data-testid": `${c}-clock`,
					children: [Ir(l.elapsedMs), /* @__PURE__ */ Z("span", {
						className: "text-base text-text-tertiary",
						children: [" / ", Ir(s * 1e3)]
					})]
				}),
				l.state === "recorded" && l.url && /* @__PURE__ */ X(Fr, {
					src: l.url,
					durationHint: l.elapsedMs / 1e3,
					className: "w-full",
					"data-testid": `${c}-preview`
				}),
				f && /* @__PURE__ */ X("p", {
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
function Rr({ src: e, getAuthToken: t, onFirstPlay: n, eager: r = !1, className: a, "data-testid": o = "authed-audio" }) {
	let [s, c] = J(null), [l, u] = J("idle"), [d, f] = J(r), p = q(!1);
	return G(() => {
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
	}, [e, d]), l === "idle" ? /* @__PURE__ */ X(i, {
		variant: "secondary",
		size: "sm",
		onClick: () => f(!0),
		"data-testid": `${o}-load`,
		children: "▶ Play"
	}) : l === "loading" ? /* @__PURE__ */ X("span", {
		className: "text-sm text-text-tertiary",
		"data-testid": `${o}-loading`,
		children: "Loading…"
	}) : l === "error" || !s ? /* @__PURE__ */ X(i, {
		variant: "ghost",
		size: "sm",
		onClick: () => {
			u("idle"), f(!1), setTimeout(() => f(!0), 0);
		},
		"data-testid": `${o}-error`,
		children: "Couldn’t load — retry"
	}) : /* @__PURE__ */ X(Fr, {
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
function zr(e) {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
function Br({ title: t, subtitle: n, durationSeconds: r, live: i = !0, recording: a, onPopOut: o, popOutLabel: c = "Pop the call out", children: l, controls: u, aside: d, stage: f = "video", className: p, "data-testid": m = "embedded-call-panel" }) {
	return /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-video-stage text-white shadow-md", d && "@container", p),
		"aria-label": typeof t == "string" ? `Call: ${t}` : "Call",
		"data-testid": m,
		"data-stage": f,
		children: [
			/* @__PURE__ */ Z("header", {
				className: "flex min-w-0 items-center gap-2 px-3 py-2",
				children: [
					i && /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-success"
					}),
					/* @__PURE__ */ X("span", {
						className: "min-w-0 flex-1 truncate text-sm font-semibold",
						"data-testid": `${m}-title`,
						children: t
					}),
					a && /* @__PURE__ */ X(dr, {
						armed: a.armed,
						active: a.active,
						className: "shrink-0",
						"data-testid": `${m}-recording`
					}),
					n && /* @__PURE__ */ X("span", {
						className: "shrink-0 text-xs text-white/60",
						"data-testid": `${m}-subtitle`,
						children: n
					}),
					r !== void 0 && /* @__PURE__ */ X("span", {
						className: "shrink-0 font-mono text-xs tabular-nums text-white/80",
						"data-testid": `${m}-duration`,
						children: zr(r)
					}),
					o && /* @__PURE__ */ X(s, {
						"aria-label": c,
						title: c,
						size: "sm",
						variant: "ghost",
						icon: /* @__PURE__ */ X(C, { size: 16 }),
						onClick: o,
						className: "shrink-0 text-white/80 hover:text-white",
						"data-testid": `${m}-pop-out`
					})
				]
			}),
			d ? /* @__PURE__ */ Z("div", {
				className: "flex min-h-0 min-w-0 flex-col @lg:flex-row",
				children: [/* @__PURE__ */ X("div", {
					className: e("relative w-full min-w-0 bg-black/40 @lg:flex-1", f === "video" ? "aspect-video" : "min-h-[88px]"),
					"data-testid": `${m}-stage`,
					children: /* @__PURE__ */ X("div", {
						className: "absolute inset-0",
						children: l
					})
				}), /* @__PURE__ */ X("div", {
					className: "flex max-h-80 min-h-0 min-w-0 flex-col overflow-y-auto @lg:max-h-none @lg:shrink-0",
					"data-testid": `${m}-aside`,
					children: d
				})]
			}) : /* @__PURE__ */ X("div", {
				className: e("relative w-full min-w-0 bg-black/40", f === "video" ? "aspect-video" : "min-h-[88px]"),
				"data-testid": `${m}-stage`,
				children: /* @__PURE__ */ X("div", {
					className: "absolute inset-0",
					children: l
				})
			}),
			u && /* @__PURE__ */ X("div", {
				className: "flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2",
				"data-testid": `${m}-controls`,
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/video/CallNoticePill.tsx
var Vr = {
	warning: "bg-warning/95 text-white",
	error: "bg-danger/95 text-white",
	info: "bg-black/70 text-white"
};
function Hr({ show: t, tone: n = "warning", message: r, actions: i, className: a, "data-testid": o = "call-notice" }) {
	return t ? /* @__PURE__ */ Z("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		"data-tone": n,
		className: e("pointer-events-auto absolute left-1/2 top-3 z-30 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg", Vr[n], a),
		children: [/* @__PURE__ */ X("span", {
			className: "min-w-0 truncate",
			children: r
		}), i && /* @__PURE__ */ X("span", {
			className: "flex shrink-0 items-center gap-1",
			children: i
		})]
	}) : null;
}
//#endregion
//#region src/components/video/CallInterruptedNotice.tsx
function Ur({ show: t, title: n, description: r, actions: i, className: a, "data-testid": o = "call-interrupted-notice" }) {
	return t ? /* @__PURE__ */ Z("div", {
		role: "alert",
		"aria-live": "assertive",
		"data-testid": o,
		className: e("pointer-events-auto absolute left-1/2 top-1/2 z-30 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2", "rounded-xl px-4 py-4 text-center shadow-2xl", "border border-call-chrome-border bg-call-chrome text-white", a),
		children: [
			/* @__PURE__ */ X("p", {
				className: "m-0 text-sm font-semibold",
				children: n
			}),
			/* @__PURE__ */ X("p", {
				className: "m-0 mt-1 text-xs leading-relaxed text-white/70",
				children: r
			}),
			i && /* @__PURE__ */ X("div", {
				className: "mt-3 flex flex-wrap items-center justify-center gap-2",
				children: i
			})
		]
	}) : null;
}
//#endregion
//#region src/components/video/MediaPrecheckRow.tsx
var Wr = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
};
function Gr(e, t) {
	if (t === "denied") return Wr[e];
	if (t === "unavailable") return e === "microphone" ? "No microphone found" : "No camera found";
}
function Kr({ micOn: t, cameraOn: n, showCamera: r = !0, permission: a, onToggleMic: o, onToggleCamera: s, onOpenSettings: c, testIdPrefix: l = "start-call-precheck", settingsTestId: u = "start-call-settings", className: d }) {
	let f = typeof a == "string" ? {
		microphone: a,
		camera: a
	} : a, p = Gr("microphone", f.microphone), m = Gr("camera", f.camera), h = t && !p, g = n && !m, _ = (t) => e("inline-flex h-8 items-center gap-2 border-transparent px-2 py-0 font-medium", t ? "text-danger-fg" : "text-text-primary");
	return /* @__PURE__ */ Z("div", {
		className: e("flex items-center gap-2", d),
		"data-testid": `${l}-row`,
		children: [
			/* @__PURE__ */ Z(i, {
				variant: "ghost",
				onClick: o,
				disabled: !!p,
				title: p ?? (h ? "Turn microphone off" : "Turn microphone on"),
				"aria-pressed": h,
				"data-testid": `${l}-mic`,
				className: _(!!p),
				children: [X(h ? T : y, { size: 18 }), h ? "Mic on" : "Mic off"]
			}),
			r && /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X("span", {
				"aria-hidden": "true",
				className: "h-5 w-px shrink-0 bg-border"
			}), /* @__PURE__ */ Z(i, {
				variant: "ghost",
				onClick: s,
				disabled: !!m,
				title: m ?? (g ? "Turn camera off" : "Turn camera on"),
				"aria-pressed": g,
				"data-testid": `${l}-camera`,
				className: _(!!m),
				children: [X(g ? b : P, { size: 18 }), g ? "Camera on" : "Camera off"]
			})] }),
			/* @__PURE__ */ X(i, {
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
function qr({ items: t, trailing: n, onRemove: r, onOpen: i, onSelect: a, onReorder: o, emptyLabel: c = "No documents yet", className: l, "data-testid": d = "review-document-list", rowTestIdPrefix: f = "call-document" }) {
	let [p, h] = J(null), g = n === "remove";
	if (t.length === 0) return /* @__PURE__ */ X("p", {
		className: e("m-0 py-2 text-sm text-text-tertiary", l),
		"data-testid": d,
		children: c
	});
	let _ = (e) => (t) => {
		t.preventDefault(), p && o && o(p, e), h(null);
	};
	return /* @__PURE__ */ X("ul", {
		className: e("m-0 flex list-none flex-col p-0", !g && "gap-1", l),
		"data-testid": d,
		children: t.map((t, c) => {
			let l = t.removable !== !1, d = t.sublineTone ? t.sublineTone === "accent" : t.selected;
			return /* @__PURE__ */ Z("li", {
				"data-testid": `${f}-${t.id}`,
				"data-selected": t.selected ? "true" : "false",
				draggable: !!o,
				onDragStart: o ? () => h(t.id) : void 0,
				onDragOver: o ? (e) => e.preventDefault() : void 0,
				onDrop: o ? _(c) : void 0,
				className: e("group/doc flex items-center rounded-md", g ? "min-h-8 gap-2.5 px-0.5" : "min-h-[58px] gap-3 px-3 py-2", t.selected && "bg-primary-bg", !t.selected && !g && "hover:bg-surface-hover", a && "cursor-pointer", p === t.id && "opacity-50"),
				onClick: a ? () => a(t.id) : void 0,
				children: [
					/* @__PURE__ */ X("span", {
						className: e("flex shrink-0 text-text-secondary", t.selected && "text-primary"),
						"aria-hidden": "true",
						children: t.icon ?? /* @__PURE__ */ X(u, { size: g ? 18 : 24 })
					}),
					/* @__PURE__ */ Z("span", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ X("span", {
							className: e("truncate text-text-primary", g ? "text-sm" : "text-[15px] font-medium"),
							children: t.title
						}), t.subline != null && /* @__PURE__ */ X("span", {
							className: e("truncate text-sm", d ? "text-primary" : "text-text-tertiary"),
							children: t.subline
						})]
					}),
					n === "remove" && l && r && /* @__PURE__ */ X(s, {
						"aria-label": `Remove ${t.title}`,
						size: "sm",
						icon: /* @__PURE__ */ X(m, { size: 14 }),
						onClick: (e) => {
							e.stopPropagation(), r(t.id);
						},
						"data-testid": `${f}-remove-${t.id}`,
						className: "shrink-0 text-text-secondary"
					}),
					n === "open" && i && /* @__PURE__ */ X(s, {
						"aria-label": `Open ${t.title}`,
						title: `Open ${t.title}`,
						icon: /* @__PURE__ */ X(C, { size: 18 }),
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
function Jr({ title: t, rows: n, selected: r, onToggle: i, loading: a = !1, emptyLabel: o = "No one else has this document open", footnote: s, className: c, "data-testid": l = "start-call-collaborators", rowTestIdPrefix: u = "start-call-collaborator" }) {
	let d = new Set(r);
	return /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("flex flex-col", c),
		"data-testid": l,
		"aria-label": t,
		children: [
			t && /* @__PURE__ */ X("h4", {
				className: "m-0 mb-1 text-sm font-normal text-text-secondary",
				children: t
			}),
			a ? /* @__PURE__ */ X("div", {
				className: "flex flex-col gap-2 py-1",
				"data-testid": `${l}-loading`,
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ X(pe, {
					height: 33,
					rounded: "md"
				}, e))
			}) : n.length === 0 ? /* @__PURE__ */ X("p", {
				className: "m-0 py-2 text-sm text-text-tertiary",
				children: o
			}) : /* @__PURE__ */ X("ul", {
				className: "m-0 flex list-none flex-col p-0",
				children: n.map((t) => {
					let n = d.has(t.userId), r = !!t.disabledReason;
					return /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("label", {
						className: e("flex min-h-[39px] items-center gap-3 rounded-md", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
						title: t.disabledReason,
						"data-testid": `${u}-${t.userId}`,
						"data-checked": n ? "true" : "false",
						"data-presence": t.presence,
						children: [
							/* @__PURE__ */ Z("span", {
								className: "relative inline-flex shrink-0",
								children: [/* @__PURE__ */ X(U, {
									name: t.name,
									size: 32,
									...t.avatarUrl ? { src: t.avatarUrl } : {},
									...t.color ? { color: t.color } : {},
									showTitle: !1
								}), /* @__PURE__ */ X(be, {
									state: t.presence,
									pulse: !1,
									size: "sm",
									className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-surface",
									"data-testid": `${u}-presence-${t.userId}`
								})]
							}),
							/* @__PURE__ */ X("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: t.name
							}),
							/* @__PURE__ */ X("span", {
								className: "w-20 shrink-0 text-xs text-text-tertiary",
								children: t.statusLabel
							}),
							/* @__PURE__ */ X(Ee, {
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
			s && /* @__PURE__ */ X("p", {
				className: "m-0 mt-2 text-xs text-text-tertiary",
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/video/CallPeopleList.tsx
function Yr(e) {
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
var Xr = /* @__PURE__ */ new Set([
	"ringing",
	"notified",
	"missed",
	"declined",
	"left"
]);
function Zr({ people: t, count: n, followingUserId: r, canModerate: a, onInvite: o, onFollow: s, onMuteForMe: c, onMute: l, onRemove: u, onMakeHost: d, onRingAgain: f, onOpenSelfSettings: p, onLeave: m, hideHeading: h = !1, className: g, "data-testid": _ = "call-people-list" }) {
	return /* @__PURE__ */ Z("section", {
		"data-ui-part": "",
		className: e("flex flex-col", g),
		"data-testid": _,
		"aria-label": "People",
		children: [!h && /* @__PURE__ */ Z("div", {
			className: "mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ X("h3", {
					className: "m-0 text-base font-semibold text-text-primary",
					children: "People"
				}),
				/* @__PURE__ */ X(z, {
					variant: "count",
					value: n,
					color: "muted",
					"aria-label": `${n} people`
				}),
				/* @__PURE__ */ X(i, {
					variant: "ghost",
					size: "md",
					onClick: o,
					"data-testid": "call-invite",
					className: "ml-auto",
					children: "Invite..."
				})
			]
		}), /* @__PURE__ */ X("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: t.map((t) => {
				let n = Yr(t), o = Xr.has(t.state), h = [];
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
				return n.label && (g = /* @__PURE__ */ Z("span", {
					className: e("inline-flex items-center gap-1.5 truncate text-sm", n.tone === "accent" && "text-primary", n.tone === "muted" && "text-text-tertiary", n.tone === "warning" && "text-warning-fg"),
					"data-testid": `call-person-status-${t.userId}`,
					"data-status": n.kind,
					children: [
						n.kind === "ringing" && /* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
						}),
						n.label,
						n.kind === "presenting" && /* @__PURE__ */ X(k, {
							size: 16,
							className: "ml-1"
						})
					]
				})), /* @__PURE__ */ Z("li", {
					className: e("flex min-h-16 items-center gap-3", o && "opacity-60"),
					"data-testid": `call-person-${t.userId}`,
					"data-state": t.state,
					children: [
						/* @__PURE__ */ Z("span", {
							className: "relative inline-flex shrink-0",
							children: [/* @__PURE__ */ X(U, {
								name: t.name,
								size: 46,
								...t.avatarUrl ? { src: t.avatarUrl } : {},
								...t.color ? { color: t.color } : {},
								showTitle: !1
							}), t.presence && t.state === "in-call" && !t.isLocal && /* @__PURE__ */ X(be, {
								state: t.presence,
								pulse: !1,
								className: "absolute bottom-0 right-0 rounded-full ring-2 ring-surface"
							})]
						}),
						/* @__PURE__ */ Z("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ Z("span", {
								className: "truncate text-[15px] text-text-primary",
								children: [t.name, t.isLocal && /* @__PURE__ */ X("span", {
									className: "text-text-secondary",
									children: " (you)"
								})]
							}), g]
						}),
						t.state === "missed" && f ? /* @__PURE__ */ X(i, {
							variant: "link",
							onClick: () => f(t.userId),
							className: "shrink-0 text-sm",
							"data-testid": `call-person-ring-${t.userId}`,
							children: "Ring again"
						}) : !o && /* @__PURE__ */ X("span", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center text-text-secondary",
							"aria-label": t.audioOn ? "Microphone on" : "Microphone muted",
							role: "img",
							"data-testid": `call-person-mic-${t.userId}`,
							"data-audio": t.audioOn ? "on" : "off",
							children: t.audioOn ? /* @__PURE__ */ X(T, { size: 20 }) : /* @__PURE__ */ X(y, { size: 20 })
						}),
						h.length > 0 ? /* @__PURE__ */ X(ge, {
							trigger: /* @__PURE__ */ X(j, { size: 20 }),
							triggerLabel: `More for ${t.name}`,
							triggerVariant: "link",
							triggerClassName: "h-8 w-8 shrink-0 px-0",
							triggerTestId: `call-person-menu-${t.userId}`,
							align: "end",
							sections: [{ items: h }],
							"data-testid": `call-person-menu-panel-${t.userId}`
						}) : /* @__PURE__ */ X("span", {
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
var Qr = [
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
function $r({ open: t, onClose: n, initialTab: r = "audio-video", tab: a, onTabChange: o, docked: s = !0, audioVideo: c, effects: l, captions: u, effectsFooter: d, width: f = 380, className: p, "data-testid": m = "call-settings-drawer" }) {
	let [h, g] = J(r);
	G(() => {
		t && g(r);
	}, [t, r]);
	let _ = a ?? h, v = (e) => {
		g(e), o?.(e);
	}, y = _ === "effects" && d ? /* @__PURE__ */ Z("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ X("span", {
				className: "mr-auto text-sm text-text-tertiary",
				"data-testid": "effects-changes",
				children: d.changeCount === 0 ? "No changes" : `${d.changeCount} ${d.changeCount === 1 ? "change" : "changes"}`
			}),
			/* @__PURE__ */ X(i, {
				variant: "ghost",
				onClick: d.onCancel,
				"data-testid": "effects-cancel",
				children: "Cancel"
			}),
			/* @__PURE__ */ X(i, {
				onClick: d.onApply,
				disabled: d.changeCount === 0 || d.applying,
				"data-testid": "effects-apply",
				children: "Apply"
			})
		]
	}) : /* @__PURE__ */ Z("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ X("span", {
			className: "mr-auto text-xs text-text-tertiary",
			children: "Devices update immediately"
		}), /* @__PURE__ */ X(i, {
			onClick: n,
			"data-testid": "settings-done",
			children: "Done"
		})]
	});
	return /* @__PURE__ */ Z(ce, {
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
		children: [/* @__PURE__ */ X("div", {
			className: "shrink-0 px-5",
			children: /* @__PURE__ */ X(I, {
				items: Qr.map((e) => ({
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
		}), /* @__PURE__ */ Z("div", {
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
function ei({ enabled: t, onEnabledChange: n, language: r, onLanguageChange: i, languages: a = [{
	value: "en",
	label: "English"
}], className: o }) {
	return /* @__PURE__ */ Z("div", {
		className: e("flex flex-col gap-4", o),
		"data-testid": "settings-captions",
		children: [/* @__PURE__ */ Z("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ X("span", {
				id: "settings-captions-label",
				className: "text-sm text-text-primary",
				children: "Show live captions"
			}), /* @__PURE__ */ X(me, {
				checked: t,
				onChange: n,
				"aria-labelledby": "settings-captions-label",
				"data-testid": "settings-captions-toggle"
			})]
		}), /* @__PURE__ */ Z("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ X("label", {
				htmlFor: "settings-captions-language",
				className: "text-sm text-text-primary",
				children: "Language"
			}), /* @__PURE__ */ X(te, {
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
function ti(e) {
	return e === 0 ? "No one selected" : e === 1 ? "1 person selected" : `${e} people selected`;
}
function ni({ children: e, action: t }) {
	return /* @__PURE__ */ Z("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ X("h3", {
			className: "m-0 text-[15px] font-semibold text-text-primary",
			children: e
		}), t]
	});
}
function ri({ open: e, onClose: t, title: n, onTitleChange: r, media: o, onMediaChange: s, documents: l, onManageAccess: u, people: d, message: f, onMessageChange: m, messageMaxLength: g = 280, ring: _, onRingChange: v, precheck: y, selectedCount: b, onCopyLink: x, onStart: S, starting: C = !1, startDisabledReason: w, error: T, width: E = 400, docked: D = !0, className: O, "data-testid": k = "start-call-drawer" }) {
	let { onAdd: A, ...j } = l, M = !!w || C || !n.trim(), N = /* @__PURE__ */ Z("div", {
		className: "flex flex-col gap-2.5",
		children: [
			T && /* @__PURE__ */ X(B, {
				variant: "error",
				title: `Could not start the call — ${T.message}`,
				action: /* @__PURE__ */ X(i, {
					variant: "ghost",
					size: "sm",
					onClick: T.onRetry,
					"data-testid": "start-call-retry",
					children: "Retry"
				}),
				"data-testid": "start-call-error"
			}),
			/* @__PURE__ */ X("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": "start-call-selected-count",
				children: ti(b)
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ Z(i, {
					variant: "ghost",
					onClick: x,
					"data-testid": "start-call-copy-link",
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ X(c, { size: 16 }), "Copy invite link"]
				}), /* @__PURE__ */ Z(i, {
					onClick: S,
					disabled: M,
					title: w ?? (n.trim() ? void 0 : "Give the call a title"),
					"data-testid": "start-call-submit",
					className: "inline-flex items-center gap-2 px-5",
					children: [C && /* @__PURE__ */ X(le, {
						size: "sm",
						color: "currentColor",
						decorative: !0
					}), C ? "Starting…" : "Start call"]
				})]
			})
		]
	});
	return /* @__PURE__ */ Z(ce, {
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
			/* @__PURE__ */ X(se, {
				value: n,
				onCommit: r,
				placeholder: "Call title",
				editLabel: "Rename call",
				"data-testid": "start-call-title"
			}),
			/* @__PURE__ */ X(Ce, {
				options: [{
					value: "video",
					label: "Video"
				}, {
					value: "audio",
					label: "Audio"
				}],
				value: o,
				onChange: (e) => s(e),
				fullWidth: !0,
				tone: "accent",
				"aria-label": "Call type",
				"data-testid": "start-call-media"
			}),
			/* @__PURE__ */ Z("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ X(ni, {
						action: /* @__PURE__ */ Z(i, {
							variant: "link",
							onClick: A,
							"data-testid": "start-call-add-document",
							className: "inline-flex items-center gap-1 text-sm",
							children: [/* @__PURE__ */ X(h, { size: 14 }), "Add"]
						}),
						children: "Review documents"
					}),
					/* @__PURE__ */ X(qr, {
						...j,
						trailing: "remove",
						"data-testid": "start-call-documents",
						rowTestIdPrefix: "start-call-document"
					}),
					/* @__PURE__ */ Z("div", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ X("span", {
							className: "text-text-tertiary",
							children: "Existing document access applies."
						}), /* @__PURE__ */ X(i, {
							variant: "link",
							onClick: u,
							"data-testid": "start-call-manage",
							className: "text-xs",
							children: "Manage"
						})]
					})
				]
			}),
			/* @__PURE__ */ Z("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ X(ni, { children: "People" }),
					/* @__PURE__ */ X(H, {
						value: d.query,
						onChange: (e) => d.onQueryChange(e.target.value),
						placeholder: d.placeholder ?? "Find people, teams or channels",
						"aria-label": d.placeholder ?? "Find people, teams or channels",
						prefix: /* @__PURE__ */ X(p, { size: 16 }),
						"data-testid": "start-call-people-search"
					}),
					d.chips.length > 0 && /* @__PURE__ */ X("div", {
						className: "flex flex-wrap gap-2",
						"data-testid": "start-call-chips",
						children: d.chips.map((e) => /* @__PURE__ */ X(a, {
							tone: "neutral",
							onRemove: () => d.onRemoveChip(e.userId),
							removeLabel: `Remove ${e.name}`,
							removeTestId: `start-call-chip-remove-${e.userId}`,
							"data-testid": `start-call-chip-${e.userId}`,
							className: "rounded-md px-2.5 py-1 text-[13px]",
							children: e.name
						}, e.userId))
					}),
					/* @__PURE__ */ X(Jr, {
						title: "Document collaborators",
						footnote: "Offline people can use the invite link.",
						...d.collaborators
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Z("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ Z("label", {
					htmlFor: `${k}-message`,
					className: "text-sm text-text-primary",
					children: ["Message ", /* @__PURE__ */ X("span", {
						className: "text-text-tertiary",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ X(ve, {
					id: `${k}-message`,
					value: f,
					onChange: (e) => m(e.target.value.slice(0, g)),
					maxLength: g,
					rows: 2,
					className: "min-h-0 h-12 resize-none py-1.5",
					"data-testid": "start-call-message"
				})]
			}),
			/* @__PURE__ */ Z("label", {
				className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
				children: [/* @__PURE__ */ X(Ee, {
					checked: _,
					onChange: (e) => v(e),
					className: "h-[18px] w-[18px]",
					"data-testid": "start-call-ring"
				}), "Ring online participants"]
			}),
			/* @__PURE__ */ X("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ X(Kr, {
				showCamera: o === "video",
				...y
			})
		]
	});
}
//#endregion
//#region src/components/video/IncomingCallPopover.tsx
function ii(e, t) {
	return e === 0 ? "Nobody has joined yet" : t ? `${e} in call` : e === 1 ? "1 person in the call" : `${e} people in the call`;
}
function ai({ open: t, anchorRef: n, compact: r = !1, caller: a, title: o, documents: c, onOpenDocument: l, participants: d, participantCount: f, mic: p, camera: h, onOpenSettings: g, busy: v = !1, onJoin: y, onSwitch: b, onDecline: x, onDismiss: S, ringing: C = !0, initialFocus: T = "join", className: D, "data-testid": O = "incoming-call-popover" }) {
	let [k, ...A] = c, j = A.length ? r ? `+${A.length}` : `+${A.length} ${A.length === 1 ? "document" : "documents"}` : null, M = v && !!b, N = q(null);
	return G(() => {
		if (!t || T !== "join") return;
		let e = requestAnimationFrame(() => N.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [
		t,
		T,
		M
	]), /* @__PURE__ */ X(re, {
		trigger: n,
		open: t,
		onClose: S,
		placement: "bottom-end",
		offset: 8,
		"aria-label": `Incoming call from ${a.name}`,
		"data-testid": O,
		className: e("rounded-xl p-0 shadow-xl", r ? "w-[375px]" : "w-[407px]", D),
		children: /* @__PURE__ */ Z("div", {
			className: e("flex flex-col", r ? "gap-2.5 px-4 pt-3 pb-4" : "gap-3.5 px-5 pt-4 pb-4"),
			"data-compact": r ? "true" : "false",
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ X(E, {
							size: 20,
							className: e("shrink-0 text-success", C && "motion-safe:animate-pulse")
						}),
						/* @__PURE__ */ X("span", {
							className: "flex-1 text-[15px] font-semibold text-text-primary",
							children: "Incoming call"
						}),
						/* @__PURE__ */ X(s, {
							"aria-label": "Not now",
							title: "Not now",
							size: "sm",
							icon: /* @__PURE__ */ X(m, { size: 16 }),
							onClick: x,
							"data-testid": "incoming-call-close",
							className: "text-text-secondary"
						})
					]
				}),
				r ? /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ X(U, {
						name: a.name,
						size: 36,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ Z("span", {
						className: "min-w-0 truncate text-[15px] text-text-primary",
						"data-testid": "incoming-call-caller",
						children: [
							/* @__PURE__ */ X("span", {
								className: "font-medium",
								children: a.name
							}),
							" ",
							/* @__PURE__ */ X("span", {
								className: "text-text-secondary",
								children: "invited you"
							})
						]
					})]
				}) : /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ X(U, {
						name: a.name,
						size: 44,
						...a.avatarUrl ? { src: a.avatarUrl } : {},
						...a.color ? { color: a.color } : {},
						showTitle: !1
					}), /* @__PURE__ */ Z("span", {
						className: "flex min-w-0 flex-col",
						"data-testid": "incoming-call-caller",
						children: [/* @__PURE__ */ X("span", {
							className: "truncate text-[15px] font-semibold text-text-primary",
							children: a.name
						}), /* @__PURE__ */ X("span", {
							className: "truncate text-sm text-text-secondary",
							children: "invited you to a review"
						})]
					})]
				}),
				/* @__PURE__ */ X("h3", {
					className: e("m-0 font-semibold text-text-primary", r ? "text-lg" : "text-xl"),
					"data-testid": "incoming-call-title",
					children: o
				}),
				k && /* @__PURE__ */ Z("div", {
					className: "flex min-w-0 items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ X(u, {
							size: r ? 20 : 22,
							className: "shrink-0 text-primary"
						}),
						/* @__PURE__ */ X(i, {
							variant: "link",
							onClick: () => l(k.id),
							"data-testid": `incoming-call-document-${k.id}`,
							className: "min-w-0 truncate text-[15px] underline",
							children: k.title
						}),
						j && /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "h-4 w-px shrink-0 bg-border"
						}), /* @__PURE__ */ X(ne, {
							content: A.map((e) => e.title).join(", "),
							children: /* @__PURE__ */ X(i, {
								variant: "link",
								onClick: () => l(A[0].id),
								"data-testid": "incoming-call-more",
								className: "shrink-0 text-[15px] underline",
								children: j
							})
						})] }),
						r && /* @__PURE__ */ X("span", {
							className: "ml-auto shrink-0 text-text-secondary",
							"data-testid": "incoming-call-participants",
							children: ii(f, !0)
						})
					]
				}),
				!r && /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3",
					"data-testid": "incoming-call-participants",
					children: [d.length > 0 && /* @__PURE__ */ X(ye, {
						items: d.slice(0, 3).map((e) => ({
							name: e.name,
							...e.avatarUrl ? { src: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 34,
						className: "[&>*]:!border-surface [&>*+*]:!ml-[-4px]"
					}), /* @__PURE__ */ X("span", {
						className: "text-sm text-text-secondary",
						children: ii(f, !1)
					})]
				}),
				!r && /* @__PURE__ */ X("div", {
					className: "h-px bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ X(Oe, {
							kind: "microphone",
							size: "md",
							showLabel: !0,
							...p,
							className: e("min-w-0 flex-auto justify-between", p.className),
							"data-testid": "incoming-call-mic"
						}),
						/* @__PURE__ */ X(Oe, {
							kind: "camera",
							size: "md",
							showLabel: !0,
							...h,
							className: e("min-w-0 flex-auto justify-between", h.className),
							"data-testid": "incoming-call-camera"
						}),
						/* @__PURE__ */ X(s, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							size: "lg",
							icon: /* @__PURE__ */ X(w, { size: 18 }),
							onClick: g,
							"data-testid": "incoming-call-settings",
							className: "shrink-0"
						})
					]
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ X(i, {
						variant: "ghost",
						onClick: x,
						"data-testid": "incoming-call-decline",
						className: "border-transparent",
						children: "Not now"
					}), M ? /* @__PURE__ */ Z(i, {
						ref: N,
						onClick: b,
						"data-testid": "incoming-call-switch",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Switch", /* @__PURE__ */ X(_, { size: 16 })]
					}) : /* @__PURE__ */ Z(i, {
						ref: N,
						onClick: y,
						"data-testid": "incoming-call-join",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Join call", /* @__PURE__ */ X(_, { size: 16 })]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/DocumentCallPanel.tsx
function oi({ title: t, participantCount: n, elapsedMs: r, people: a, documents: o, presenting: l, currentDocumentId: u, canPresent: d, presentDisabledReason: f, onPresent: p, onCopyLink: m, onManageAccess: g, onPopOut: _, onClose: v, loading: y = !1, notice: b, className: x, "data-testid": S = "document-call-panel" }) {
	let { count: w, onAdd: T, ...E } = o, D = a.people.find((e) => e.isLocal), O = !!(l && D && l.userId === D.userId && l.documentId === u), A = !!(l && (!D || l.userId !== D.userId)), j = a.people.filter((e) => e.state === "in-call" && !e.isLocal).length === 0, M = `${n === 1 ? "1 person" : `${n} people`}${r == null ? "" : ` · ${Me(r)}`}`;
	return /* @__PURE__ */ Z(ce, {
		open: !0,
		docked: !0,
		onClose: v,
		title: "Call",
		actions: /* @__PURE__ */ X(s, {
			"aria-label": "Pop out the call",
			title: "Pop out the call",
			size: "sm",
			icon: /* @__PURE__ */ X(C, { size: 18 }),
			onClick: _,
			"data-testid": "call-panel-popout",
			className: "text-text-secondary"
		}),
		closeTestId: "call-panel-close",
		className: e(x),
		headerClassName: "border-b-0 px-5 pb-2 pt-5",
		titleClassName: "text-lg",
		bodyClassName: "flex flex-col gap-5 px-5 pt-2 pb-6",
		"data-testid": S,
		children: [
			b,
			/* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ X("h3", {
					className: "m-0 text-lg font-semibold text-text-primary",
					"data-testid": "call-panel-title",
					children: t
				}), /* @__PURE__ */ X("span", {
					className: "text-sm tabular-nums text-text-tertiary",
					"data-testid": "call-panel-meta",
					children: M
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: "-mt-2 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			y ? /* @__PURE__ */ X("div", {
				className: "flex flex-col gap-3",
				"data-testid": "call-panel-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ X(pe, {
					height: 52,
					rounded: "md"
				}, e))
			}) : /* @__PURE__ */ Z(Y, { children: [
				/* @__PURE__ */ X(Zr, { ...a }),
				j && /* @__PURE__ */ Z("p", {
					className: "m-0 -mt-2 text-sm text-text-tertiary",
					"data-testid": "call-panel-waiting",
					children: [
						"Waiting for others —",
						" ",
						/* @__PURE__ */ X(i, {
							variant: "link",
							onClick: m,
							className: "text-sm",
							children: "Copy call link"
						})
					]
				}),
				/* @__PURE__ */ X("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Z("section", {
					"data-ui-part": "",
					className: "-mx-2 flex flex-col gap-2",
					"aria-label": "Review documents",
					children: [/* @__PURE__ */ Z("div", {
						className: "flex items-center gap-2 px-2",
						children: [
							/* @__PURE__ */ X("h3", {
								className: "m-0 text-base font-semibold text-text-primary",
								children: "Review documents"
							}),
							/* @__PURE__ */ X(z, {
								variant: "count",
								value: w,
								color: "muted",
								"aria-label": `${w} documents`
							}),
							/* @__PURE__ */ Z(i, {
								variant: "link",
								onClick: T,
								"data-testid": "call-add-document",
								className: "ml-auto inline-flex items-center gap-1 text-sm",
								children: [/* @__PURE__ */ X(h, { size: 14 }), "Add"]
							})
						]
					}), /* @__PURE__ */ X(qr, {
						...E,
						trailing: "open",
						"data-testid": "call-documents-list",
						rowTestIdPrefix: "call-document"
					})]
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ Z(i, {
						variant: "ghost",
						onClick: () => p(O ? null : u),
						disabled: !O && !d,
						title: !O && !d ? f : A ? `Take over from ${l.name}` : void 0,
						"data-take-over": A && d ? "true" : void 0,
						"data-testid": "call-present",
						className: "inline-flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ X(k, { size: 18 }), O ? "Stop presenting" : "Present this document"]
					}), /* @__PURE__ */ Z(i, {
						variant: "link",
						onClick: m,
						"data-testid": "call-copy-link",
						className: "inline-flex items-center gap-1.5 text-sm",
						children: [/* @__PURE__ */ X(c, { size: 16 }), "Copy call link"]
					})]
				}),
				/* @__PURE__ */ X("div", {
					className: "h-px shrink-0 bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-3 text-xs",
					children: [/* @__PURE__ */ X("span", {
						className: "text-text-tertiary",
						children: "Document access stays unchanged."
					}), /* @__PURE__ */ X(i, {
						variant: "link",
						onClick: g,
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
//#region src/components/video/MeetingToolbar.tsx
var si = "relative inline-flex flex-col items-center justify-center rounded-md text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent", ci = `${si} h-14 min-w-14 gap-0.5 px-2`, li = {
	labelled: ci,
	compact: `${si} h-8 min-w-8 px-1.5 [&_svg]:size-[18px]`,
	phone: `${si} h-10 min-w-10 px-1.5 [&_svg]:size-5`
};
function ui({ item: t, look: n = "compact" }) {
	let r = n !== "labelled", i = t.disabled && t.disabledReason ? t.disabledReason : t.title ?? t.label, a = q(null), [o, s] = J(!1), c = !!t.popover, l = c && o && !t.disabled, u = c ? l || !!t.active : t.active, d = /* @__PURE__ */ Z("button", {
		"data-ui-part": "",
		ref: a,
		type: "button",
		onClick: c ? () => s((e) => !e) : t.onClick,
		disabled: t.disabled,
		title: !r || t.disabled ? i : void 0,
		"aria-label": t.count === void 0 ? t.label : `${t.label}, ${t.count}`,
		"aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
		"aria-haspopup": c ? "dialog" : void 0,
		"aria-expanded": c ? l : t.active === void 0 ? void 0 : t.active,
		"data-testid": `meeting-toolbar-${t.id}`,
		"data-active": u ? "true" : void 0,
		"data-pressed": t.pressed ? "true" : void 0,
		"data-tone": t.tone ?? "default",
		className: e(li[n], u && "text-primary-fg hover:text-primary-fg", t.pressed && "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg", t.tone === "danger" && "text-danger hover:bg-danger-bg hover:text-danger", t.menu && n !== "phone" && "rounded-r-none pr-1", t.menu && n === "compact" && "pr-0.5"),
		children: [
			/* @__PURE__ */ Z("span", {
				className: "relative inline-flex items-center gap-1.5",
				children: [
					t.icon,
					t.count !== void 0 && (r ? /* @__PURE__ */ X(z, {
						variant: "count",
						color: "muted",
						value: t.count,
						"aria-label": String(t.count),
						className: "shrink-0",
						"data-testid": `meeting-toolbar-${t.id}-count`
					}) : /* @__PURE__ */ X(R, {
						size: "sm",
						weight: "semibold",
						tone: "inherit",
						tabular: !0,
						"data-testid": `meeting-toolbar-${t.id}-count`,
						children: t.count
					})),
					!!t.badge && /* @__PURE__ */ X(z, {
						variant: "count",
						color: "danger",
						value: t.badge,
						className: "shrink-0",
						"data-testid": `meeting-toolbar-${t.id}-badge`
					})
				]
			}),
			!r && /* @__PURE__ */ X(R, {
				size: "xs",
				tone: "inherit",
				className: "leading-tight whitespace-nowrap",
				children: t.label
			}),
			u && /* @__PURE__ */ X("span", {
				"aria-hidden": !0,
				className: e("absolute bottom-0 h-0.5 rounded-full bg-primary", r ? "inset-x-1.5" : "inset-x-2"),
				"data-testid": `meeting-toolbar-${t.id}-active`
			})
		]
	}), f = r && !t.disabled ? /* @__PURE__ */ X(ne, {
		content: i,
		placement: "bottom",
		"data-testid": `meeting-toolbar-${t.id}-tooltip`,
		children: d
	}) : d;
	if (c) {
		let e = () => s(!1);
		return /* @__PURE__ */ Z(Y, { children: [f, /* @__PURE__ */ X(re, {
			trigger: a,
			open: l,
			onClose: e,
			placement: t.popoverPlacement ?? "bottom-start",
			"aria-label": t.popoverLabel ?? t.label,
			kind: "meeting-toolbar-popover",
			"data-testid": `meeting-toolbar-${t.id}-popover`,
			children: l && t.popover(e)
		})] });
	}
	return !t.menu || n === "phone" ? f : /* @__PURE__ */ Z("span", {
		className: "inline-flex items-stretch",
		"data-testid": `meeting-toolbar-${t.id}-split`,
		children: [f, /* @__PURE__ */ X(ge, {
			trigger: /* @__PURE__ */ X(g, { size: n === "compact" ? 12 : 14 }),
			triggerLabel: t.menuLabel ?? `${t.label} options`,
			triggerVariant: "link",
			triggerClassName: e("rounded-l-none rounded-r-md px-0 text-text-secondary hover:bg-surface-hover", n === "compact" ? "h-8 w-4" : "h-14 w-5"),
			triggerTestId: `meeting-toolbar-${t.id}-menu`,
			disabled: t.disabled,
			align: "end",
			sections: t.menu
		})]
	});
}
function di(e) {
	return {
		label: e.count === void 0 ? e.label : `${e.label} (${e.count})`,
		icon: e.icon,
		onSelect: e.onClick,
		active: e.active,
		checked: e.pressed,
		disabled: e.disabled,
		disabledReason: e.disabledReason,
		"data-testid": `meeting-toolbar-more-${e.id}`
	};
}
function fi(e, t) {
	let [n, r] = J(Infinity);
	return G(() => {
		if (t) return;
		let n = e.current;
		if (!n || typeof ResizeObserver > "u") return;
		let i = () => {
			let e = n.getBoundingClientRect().width;
			r(e > 0 ? e : Infinity);
		};
		i();
		let a = new ResizeObserver(i);
		return a.observe(n), () => a.disconnect();
	}, [e, t]), n;
}
function pi({ compact: t }) {
	return /* @__PURE__ */ X("span", {
		"aria-hidden": !0,
		className: e("w-px shrink-0 bg-border", t ? "mx-0.5 h-5" : "mx-1 h-8")
	});
}
function mi({ start: t, items: n, media: r = [], moreSections: i = [], onLeave: a, leaveLabel: o = "Leave", leaveMenu: s, compactBelow: c = 960, compact: l, phoneBelow: u = 820, phone: d, labels: f = "tooltip", className: p, "data-testid": m = "meeting-toolbar" }) {
	let h = we(), g = fi(h.ref, l !== void 0 && d !== void 0), _ = d ?? g < u, v = _ || (l ?? g < c), y = (e) => !e.popover && (_ || e.priority === "secondary"), b = v ? n.filter((e) => !y(e)) : n, x = v ? n.filter(y) : [], S = v ? r.filter((e) => e.priority !== "secondary") : r, C = v ? r.filter((e) => e.priority === "secondary") : [], w = _ ? [...S.flatMap((e) => e.menu ?? []), ...a ? s ?? [] : []] : [], T = [...x, ...C], E = _ ? "phone" : f === "visible" ? "labelled" : "compact", D = E !== "labelled", O = [
		...T.length ? [{
			items: T.map(di),
			"data-testid": "meeting-toolbar-more-folded"
		}] : [],
		...w,
		...i
	];
	return /* @__PURE__ */ Z("div", {
		...h,
		role: "toolbar",
		"aria-label": "Meeting controls",
		"data-ui-meeting-toolbar": !0,
		"data-testid": m,
		"data-compact": v ? "true" : void 0,
		"data-layout": _ ? "phone" : void 0,
		"data-labels": f,
		className: e("flex items-center border-b border-border bg-surface", _ ? "flex-wrap gap-0.5 px-2 pt-1" : E === "compact" ? "min-h-10 gap-0.5 px-2 py-1" : "min-h-16 gap-1 px-3", p),
		children: [
			/* @__PURE__ */ X("div", {
				className: e("flex min-w-0 items-center overflow-hidden", D ? "gap-2" : "gap-3", _ ? "basis-full" : "flex-1"),
				children: t
			}),
			_ && /* @__PURE__ */ X("span", {
				"aria-hidden": !0,
				className: "flex-1"
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex shrink-0 items-center gap-0.5",
				"data-testid": `${m}-items`,
				children: [b.map((e) => /* @__PURE__ */ X(ui, {
					item: e,
					look: E
				}, e.id)), O.length > 0 && /* @__PURE__ */ X(ge, {
					trigger: /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(j, { size: 20 }), !D && /* @__PURE__ */ X(R, {
						size: "xs",
						tone: "inherit",
						className: "leading-tight",
						children: "More"
					})] }),
					triggerLabel: "More",
					triggerVariant: "link",
					triggerClassName: e(li[E], "gap-0.5 font-normal"),
					triggerTestId: "meeting-toolbar-more",
					align: "end",
					sections: O
				})]
			}),
			S.length > 0 && /* @__PURE__ */ X(pi, { compact: D }),
			S.length > 0 && /* @__PURE__ */ X("div", {
				className: "flex shrink-0 items-center gap-0.5",
				"data-testid": `${m}-media`,
				children: S.map((e) => /* @__PURE__ */ X(ui, {
					item: e,
					look: E
				}, e.id))
			}),
			a && /* @__PURE__ */ X(pi, { compact: D }),
			a && /* @__PURE__ */ X(ui, {
				item: {
					id: "leave",
					label: o,
					icon: /* @__PURE__ */ X(N, { size: 20 }),
					onClick: a,
					tone: "danger",
					menu: s,
					menuLabel: "Leave options"
				},
				look: E
			})
		]
	});
}
function hi(e, t, n, r, i = []) {
	let a = {
		label: e,
		items: t.length ? t.map((t, i) => ({
			label: t.label || `${e} ${i + 1}`,
			checked: t.deviceId === n,
			onSelect: () => r(t.deviceId),
			"data-testid": `device-${t.deviceId}`
		})) : [{
			label: `No ${e.toLowerCase()} found`,
			disabled: !0
		}]
	};
	return i.length ? [a, { items: i }] : [a];
}
//#endregion
//#region src/components/video/MeetingStatusCluster.tsx
function gi(e, t) {
	let n = e == null ? null : typeof e == "number" ? e : Date.parse(e), [r, i] = J(() => Date.now());
	return G(() => {
		if (!t || n === null || !Number.isFinite(n)) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null || !Number.isFinite(n) ? null : Math.max(0, r - n);
}
function _i({ title: t, recording: n, startedAt: r, elapsedMs: i, onOpenOptions: a, optionsLabel: o = "Meeting options", className: c, "data-testid": l = "meeting-status" }) {
	let u = gi(r, i === void 0), d = i === void 0 ? u : i;
	return /* @__PURE__ */ Z("div", {
		className: e("flex min-w-0 items-center gap-3", c),
		"data-testid": l,
		children: [
			a && /* @__PURE__ */ X(s, {
				"aria-label": o,
				title: o,
				variant: "ghost",
				size: "sm",
				onClick: a,
				"data-testid": `${l}-options`,
				children: /* @__PURE__ */ X(Pe, { size: 18 })
			}),
			n && /* @__PURE__ */ X(dr, {
				armed: n.armed,
				active: n.active,
				"data-testid": `${l}-recording`
			}),
			d !== null && /* @__PURE__ */ X(R, {
				size: "base",
				tone: "primary",
				tabular: !0,
				"data-testid": `${l}-elapsed`,
				"aria-label": `Meeting time ${Me(d)}`,
				children: Me(d)
			}),
			t && /* @__PURE__ */ X(R, {
				size: "sm",
				weight: "semibold",
				className: "truncate",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaPlaybackDock.tsx
function vi({ source: t, autoPlay: n = !1, onClose: r, onPrevious: i, onNext: a, status: o, emptyLabel: s = "Select audio or video to preview", className: c, "data-testid": l = "media-playback-dock" }) {
	return /* @__PURE__ */ X(L, {
		as: "footer",
		gap: "none",
		"aria-label": "Media player",
		className: e("shrink-0 min-w-0 border-t border-border bg-surface", c),
		"data-testid": l,
		children: t ? /* @__PURE__ */ X(yi, {
			source: t,
			autoPlay: n,
			onClose: r,
			onPrevious: i,
			onNext: a,
			status: o
		}, `${t.id}:${t.kind}:${t.src}`) : /* @__PURE__ */ Z(F, {
			gap: "md",
			align: "center",
			justify: "between",
			className: "min-h-11 px-4 py-1",
			children: [/* @__PURE__ */ X("span", {
				className: "text-xs text-text-secondary",
				children: s
			}), o]
		})
	});
}
function yi({ source: t, autoPlay: n, onClose: r, onPrevious: a, onNext: o, status: c }) {
	let l = q(null), [u, d] = J(!1), [f, p] = J(0), [h, _] = J(0), [y, b] = J(1), [C, w] = J(!1), [T, E] = J(1), [D, O] = J(""), [k, A] = J(!0);
	G(() => {
		let e = l.current;
		return () => {
			e?.pause();
		};
	}, []);
	let j = () => {
		let e = l.current;
		e && (e.paused ? (O(""), e.play().catch(() => O("Playback could not start. Try Play again or check the source."))) : e.pause());
	}, M = {
		src: t.src,
		autoPlay: n,
		preload: "metadata",
		"aria-label": t.title,
		"data-testid": "playback-element",
		onPlay: () => d(!0),
		onPause: () => d(!1),
		onEnded: () => d(!1),
		onError: () => {
			d(!1), O("This media could not be loaded. Check the source file and supported format.");
		},
		onTimeUpdate: (e) => p(e.currentTarget.currentTime),
		onDurationChange: (e) => {
			let t = e.currentTarget.duration;
			_(Number.isFinite(t) && t > 0 ? t : 0);
		}
	};
	return /* @__PURE__ */ Z(Y, { children: [
		t.kind === "video" ? /* @__PURE__ */ X("video", {
			...M,
			ref: (e) => {
				l.current = e;
			},
			playsInline: !0,
			hidden: !k,
			className: e("w-full max-h-[40dvh] bg-code-bg object-contain", !k && "hidden")
		}) : /* @__PURE__ */ X("audio", {
			...M,
			ref: (e) => {
				l.current = e;
			},
			className: "hidden"
		}),
		D && /* @__PURE__ */ X("p", {
			role: "alert",
			className: "m-0 px-4 py-1 text-xs text-danger-fg",
			children: D
		}),
		/* @__PURE__ */ Z(F, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: "min-h-11 min-w-0 px-3 py-1",
			"data-testid": "playback-controls",
			children: [
				/* @__PURE__ */ Z("div", {
					className: "min-w-0 flex-1 basis-40",
					title: t.subtitle ? `${t.title} — ${t.subtitle}` : t.title,
					children: [/* @__PURE__ */ X("div", {
						className: "truncate text-sm font-semibold text-text-primary",
						children: t.title
					}), t.subtitle && /* @__PURE__ */ X("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.subtitle
					})]
				}),
				/* @__PURE__ */ Z(F, {
					gap: "xs",
					align: "center",
					wrap: !1,
					children: [
						a && /* @__PURE__ */ X(s, {
							size: "sm",
							"aria-label": "Previous media",
							icon: /* @__PURE__ */ X(g, { dir: "left" }),
							onClick: a
						}),
						/* @__PURE__ */ X(s, {
							size: "sm",
							variant: "primary",
							"aria-label": u ? "Pause" : "Play",
							icon: X(u ? x : S, { size: 16 }),
							onClick: j
						}),
						o && /* @__PURE__ */ X(s, {
							size: "sm",
							"aria-label": "Next media",
							icon: /* @__PURE__ */ X(g, { dir: "right" }),
							onClick: o
						})
					]
				}),
				/* @__PURE__ */ Z(F, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "min-w-40 flex-1 basis-48",
					children: [
						/* @__PURE__ */ X("span", {
							className: "text-xs tabular-nums text-text-secondary",
							children: Pr(f)
						}),
						/* @__PURE__ */ X(he, {
							"aria-label": "Seek media",
							value: Math.min(f, h),
							min: 0,
							max: h || 1,
							step: .1,
							readout: !1,
							disabled: !h,
							className: "min-w-0 flex-1",
							onChange: (e) => {
								l.current && (l.current.currentTime = e), p(e);
							}
						}),
						/* @__PURE__ */ X("span", {
							className: "text-xs tabular-nums text-text-secondary",
							children: Pr(h)
						})
					]
				}),
				/* @__PURE__ */ Z(F, {
					gap: "xs",
					align: "center",
					wrap: !1,
					children: [
						/* @__PURE__ */ X(s, {
							size: "sm",
							"aria-label": C ? "Unmute" : "Mute",
							"aria-pressed": C,
							icon: /* @__PURE__ */ X(v, { size: 16 }),
							onClick: () => {
								l.current && (l.current.muted = !C), w(!C);
							}
						}),
						/* @__PURE__ */ X(he, {
							"aria-label": "Volume",
							value: y,
							max: 1,
							step: .05,
							readout: !1,
							className: "w-16",
							onChange: (e) => {
								l.current && (l.current.volume = e), b(e);
							}
						}),
						/* @__PURE__ */ X(te, {
							"aria-label": "Playback speed",
							value: String(T),
							options: [
								.75,
								1,
								1.25,
								1.5,
								2
							].map((e) => ({
								value: String(e),
								label: `${e}×`
							})),
							onChange: (e) => {
								let t = Number(e.target.value);
								l.current && (l.current.playbackRate = t), E(t);
							}
						})
					]
				}),
				t.kind === "video" && /* @__PURE__ */ X(i, {
					size: "sm",
					variant: "ghost",
					onClick: () => A(!k),
					"aria-expanded": k,
					children: k ? "Hide video" : "Show video"
				}),
				r && /* @__PURE__ */ X(s, {
					size: "sm",
					"aria-label": "Close player",
					icon: /* @__PURE__ */ X(m, {}),
					onClick: r
				}),
				c
			]
		})
	] });
}
//#endregion
export { Mt as $, dr as A, yn as B, Nr as C, xr as D, Tr as E, Kn as F, cn as G, hn as H, Ln as I, en as J, sn as K, Dn as L, rr as M, Qn as N, hr as O, qn as P, Nt as Q, Tn as R, Pr as S, Dr as T, mn as U, _n as V, pn as W, Wt as X, Xt as Y, At as Z, Hr as _, Ue as _t, hi as a, wt as at, Lr as b, ri as c, bt as ct, Zr as d, dt, jt as et, Yr as f, st as ft, Ur as g, qe as gt, Kr as h, Je as ht, mi as i, Et as it, cr as j, ur as k, ei as l, vt as lt, qr as m, Qe as mt, _i as n, Dt as nt, oi as o, St as ot, Jr as p, rt as pt, tn as q, ci as r, Tt as rt, ai as s, yt as st, vi as t, Ut as tt, $r as u, ht as ut, Br as v, Ve as vt, jr as w, Fr as x, Rr as y, Re as yt, Sn as z };
