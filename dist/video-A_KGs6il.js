import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { t as n } from "./Chip-BtSN-nsV.js";
import { n as r, t as i } from "./Stack-CE1FjEn8.js";
import { t as a } from "./Text-XdCzxWMv.js";
import { t as o } from "./safeHref-dF2rw8EK.js";
import { t as s } from "./useEventCallback-Cwx9QVSi.js";
import { n as c, r as l } from "./useAudioRecorder-BhPxnLmg.js";
import { t as u } from "./IconButton-BgM9MvwA.js";
import { $ as d, B as f, E as p, S as m, at as h, d as g, h as _, m as v, n as y, pt as b, s as x, tt as S } from "./Icons-CNCMF52q.js";
import { _ as C, a as w, b as T, c as E, d as D, f as O, h as k, i as A, l as j, m as M, n as N, o as P, p as F, s as I, t as L, u as R, x as ee, y as z } from "./MediaIcons-_ai5Til2.js";
import { t as B } from "./Badge-hAdAjIrX.js";
import { t as V } from "./Banner-CL5Cl_V8.js";
import { t as te } from "./overlayStack-BFH9XXvN.js";
import { t as H } from "./Modal-C88cabjQ.js";
import { t as ne } from "./Input-DiOEvL5h.js";
import { t as U } from "./Select-k38b8PrZ.js";
import { n as re, t as W } from "./Tooltip-DGN3JB6V.js";
import { t as ie } from "./InlinePopover-CEzf8hyR.js";
import { t as ae } from "./FormField-BDZIVA7n.js";
import { i as oe, n as se, r as ce, t as le } from "./Drawer-BtqKlsu-.js";
import { t as ue } from "./Spinner-BLY4ERdL.js";
import { n as de, r as fe, t as pe } from "./focusTrap-CmWJlptm.js";
import { t as me } from "./Slider-COaaKXgy.js";
import { t as he } from "./DropdownMenu-8X91cU7p.js";
import { t as ge } from "./SegmentedControl-CO8w_o0t.js";
import { n as _e } from "./Tabs-VCUI4Fx2.js";
import { n as ve, r as ye } from "./Avatar-DPJ8Mh6Y.js";
import { t as be } from "./SkeletonCard-BryltcC7.js";
import { n as xe } from "./VisuallyHidden-CVFiyXyk.js";
import { t as Se } from "./Switch-CRiY_kzy.js";
import { t as Ce } from "./DockedPanelContext-pH9A5z1h.js";
import { t as we } from "./Textarea-Cf4WFXAs.js";
import { i as Te, r as Ee, t as De } from "./ChoiceList-DHsxqQ1Y.js";
import { n as Oe } from "./RovingToolbar-eUKIxXK4.js";
import { t as ke } from "./PresenceAvatars-CM37OyKJ.js";
import { t as Ae } from "./Checkbox-DrdG_-IA.js";
import { t as je } from "./activationKey-CjbL3LUv.js";
import { A as Me, C as Ne, E as Pe, H as Fe, K as Ie, S as Le, U as Re, X as ze, Z as Be, ct as Ve, k as He, lt as Ue, ot as We } from "./BreakoutRoomsPanel--Zx-uEs_.js";
import "./RecordingConsentNotice-bKeUtUG1.js";
import { useCallback as G, useEffect as K, useId as Ge, useImperativeHandle as Ke, useLayoutEffect as qe, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
//#region src/components/video/VideoPlayer.tsx
function Je(e) {
	let t = Math.max(0, Math.round(Number(e) || 0));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
var Ye = {
	idle: "Ready",
	connecting: "Connecting…",
	buffering: "Buffering…",
	playing: "",
	error: "Playback Error"
};
function Xe({ src: t, stream: n, autoPlay: r = !1, muted: i = !0, loop: a = !1, controls: o = !1, poster: s, phase: c, className: l, style: u, onPhaseChange: d, onTimeUpdate: f, chapters: p, markers: m, seekTo: h, onChapterChange: g }) {
	let _ = J(null), [v, y] = Y("idle"), [b, x] = Y(!1), S = c ?? v, [C, w] = Y(0), [T, E] = Y(0), D = !!(p?.length || m?.length), O = n ? "stream" : t ? "file" : "none";
	K(() => {
		let e = _.current;
		if (!e) return;
		let t = [
			["waiting", () => {
				y("buffering"), d?.("buffering");
			}],
			["playing", () => {
				y("playing"), d?.("playing");
			}],
			["error", () => {
				y("error"), d?.("error");
			}],
			["loadstart", () => {
				x(!1), y("connecting"), d?.("connecting");
			}],
			["loadedmetadata", () => {
				e.srcObject || x(!0);
			}],
			["timeupdate", () => {
				w(e.currentTime), f?.(e.currentTime, e.duration);
			}],
			["durationchange", () => {
				Number.isFinite(e.duration) && E(e.duration);
			}]
		];
		return t.forEach(([t, n]) => e.addEventListener(t, n)), e.readyState >= 1 && !e.srcObject && e.currentSrc && x(!0), () => t.forEach(([t, n]) => e.removeEventListener(t, n));
	}, [d, f]), K(() => {
		let e = _.current;
		e && n !== void 0 && (e.srcObject = n);
	}, [n]);
	let k = (e) => {
		let t = _.current;
		if (!t || !Number.isFinite(e)) return;
		let n = () => {
			t.currentTime = Math.max(0, e), w(t.currentTime);
		};
		t.readyState >= 1 ? n() : t.addEventListener("loadedmetadata", n, { once: !0 });
	};
	K(() => {
		h && Number.isFinite(h.seconds) && k(h.seconds);
	}, [h?.seconds, h?.nonce]);
	let A = [...p || []].sort((e, t) => e.start - t.start), j = -1;
	A.forEach((e, t) => {
		e.start <= C + .001 && (j = t);
	});
	let M = J(-1);
	K(() => {
		j >= 0 && j !== M.current && (M.current = j, g?.(A[j], j));
	}, [j]);
	let N = T || Math.max(0, ...A.map((e) => e.start), ...(m || []).map((e) => e.at)) || 1, P = S !== "playing" && !(O === "file" && b && (S === "idle" || S === "connecting")), F = Ye[S], I = /* @__PURE__ */ Q("div", {
		className: e("relative bg-black rounded-lg overflow-hidden aspect-video", D ? void 0 : l),
		style: D ? void 0 : u,
		"data-video-player": "",
		"data-phase": S,
		"data-source": O,
		...O === "file" && b ? { "data-file-loaded": "" } : {},
		children: [/* @__PURE__ */ Z("video", {
			ref: _,
			src: n ? void 0 : t,
			autoPlay: r,
			muted: i,
			loop: a,
			controls: o,
			poster: s,
			playsInline: !0,
			className: e("w-full h-full object-contain block")
		}), P && F && /* @__PURE__ */ Q("div", {
			className: e("absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium tracking-wide"),
			"data-video-overlay": S,
			children: [S === "buffering" && /* @__PURE__ */ Z(Qe, {}), /* @__PURE__ */ Z("span", {
				className: e(S === "buffering" ? "ml-2" : ""),
				children: F
			})]
		})]
	});
	if (!D) return I;
	let L = "flex w-full items-baseline gap-3 rounded-md px-2 py-1 text-left text-sm text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col gap-2", l),
		style: u,
		"data-video-timed": "",
		children: [
			I,
			!!m?.length && /* @__PURE__ */ Q("div", {
				className: "relative h-2 rounded-full bg-border",
				"aria-hidden": "true",
				"data-video-track": "",
				children: [A.map((e, t) => t > 0 && /* @__PURE__ */ Z("span", {
					className: "absolute top-0 h-2 w-px bg-text-tertiary",
					style: { left: `${e.start / N * 100}%` }
				}, `c-${e.id ?? t}`)), m.map((t, n) => /* @__PURE__ */ Z("span", {
					className: e("absolute -top-0.5 h-3 w-1.5 -translate-x-1/2 rounded-sm", Ze[t.tone ?? "warning"]),
					style: { left: `${t.at / N * 100}%` },
					"data-video-marker-tick": t.id ?? n
				}, `m-${t.id ?? n}`))]
			}),
			!!A.length && /* @__PURE__ */ Z("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				"aria-label": "Chapters",
				"data-video-chapters": "",
				children: A.map((t, n) => /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => k(t.start),
					"aria-current": n === j ? "true" : void 0,
					"data-video-chapter": t.id ?? n,
					className: e(L, n === j && "bg-surface-hover font-semibold"),
					children: [/* @__PURE__ */ Z("span", {
						className: "shrink-0 text-xs tabular-nums text-text-secondary",
						children: Je(t.start)
					}), /* @__PURE__ */ Z("span", {
						className: "min-w-0 break-words",
						children: t.title
					})]
				}) }, t.id ?? n))
			}),
			!!m?.length && /* @__PURE__ */ Z("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				"aria-label": "Marked moments",
				"data-video-markers": "",
				children: m.map((e, t) => /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => k(e.at),
					"data-video-marker": e.id ?? t,
					"data-tone": e.tone ?? "warning",
					className: L,
					children: [/* @__PURE__ */ Z("span", {
						className: "shrink-0 text-xs tabular-nums text-text-secondary",
						children: Je(e.at)
					}), /* @__PURE__ */ Z("span", {
						className: "min-w-0 break-words",
						children: e.label
					})]
				}) }, e.id ?? t))
			})
		]
	});
}
var Ze = {
	info: "bg-info",
	warning: "bg-warning",
	danger: "bg-danger"
};
function Qe() {
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
function $e(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : e < 1073741824 ? `${(e / 1048576).toFixed(1)} MB` : `${(e / 1073741824).toFixed(2)} GB`;
}
function et({ onClose: t, sources: n, title: r, subtitle: i, autoPlay: a = !0, muted: s = !1, hideDownload: c = !1, header: l, footer: u, className: d }) {
	let f = q(() => n.filter((e) => !!e.url), [n]), [p, m] = Y(0), h = f[p], g = J(null), _ = J(null), v = te(!0);
	return K(() => {
		let e = (e) => {
			if (v()) {
				if (e.key === "Escape") {
					t();
					return;
				}
				fe(e, g.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, v]), K(() => (_.current = typeof document < "u" ? document.activeElement : null, pe(g.current), () => {
		de(_.current), _.current = null;
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
							"data-ui-part": "",
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
					autoPlay: a,
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
							"data-ui-part": "",
							type: "button",
							onClick: () => m(n),
							className: e("px-2.5 py-1 rounded transition-colors", r ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10"),
							"aria-current": r ? "true" : void 0,
							title: t.sizeBytes == null ? void 0 : $e(t.sizeBytes),
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
						href: o(h.url) ?? void 0,
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
function tt(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : e >= 1e3 ? `${(e / 1e3).toFixed(0)} Kbps` : `${e} bps`;
}
function nt({ metrics: t, className: n, style: r }) {
	if (!t) return /* @__PURE__ */ Z("div", {
		className: e("p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs", n),
		style: r,
		children: "No stream data"
	});
	let i = [
		["Bitrate", tt(t.bitrateBps)],
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
var rt = {
	good: "var(--color-success)",
	medium: "var(--color-warning)",
	poor: "var(--color-caution)",
	dead: "var(--color-danger)"
}, it = {
	good: "text-success-fg",
	medium: "text-warning-fg",
	poor: "text-caution-fg",
	dead: "text-danger-fg"
}, at = {
	good: "Good",
	medium: "Fair",
	poor: "Poor",
	dead: "No Connection"
};
function ot({ quality: t, label: n, className: r, style: i }) {
	let a = rt[t], o = t === "good" ? 4 : t === "medium" ? 3 : t === "poor" ? 2 : 1;
	return /* @__PURE__ */ Q("div", {
		className: e("inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium", r),
		style: i,
		children: [
			/* @__PURE__ */ Z("svg", {
				width: "14",
				height: "12",
				viewBox: "0 0 14 12",
				"aria-hidden": "true",
				focusable: "false",
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
					fill: e < o ? a : "rgba(255,255,255,0.2)"
				}, e))
			}),
			/* @__PURE__ */ Z(xe, { children: "Network quality: " }),
			/* @__PURE__ */ Z("span", {
				className: it[t],
				children: n ?? at[t]
			})
		]
	});
}
//#endregion
//#region src/components/video/VideoGrid.tsx
function st({ participants: t, className: n, style: r }) {
	let i = t.length, a = i <= 1 ? 1 : i <= 4 ? 2 : i <= 9 ? 3 : 4;
	return /* @__PURE__ */ Z("div", {
		className: e("grid gap-1 bg-video-stage rounded-lg overflow-hidden", n),
		style: {
			gridTemplateColumns: `repeat(${a}, 1fr)`,
			...r
		},
		children: t.map((e) => /* @__PURE__ */ Z(ze, {
			id: e.id,
			displayName: e.displayName,
			avatarUrl: e.avatarUrl,
			isSpeaking: e.isSpeaking,
			isMuted: e.isMuted,
			isLocal: e.isLocal,
			access: e.access,
			videoElement: e.videoElement
		}, e.id))
	});
}
//#endregion
//#region src/components/video/PlaybackReactionsLayer.tsx
var ct = 3, lt = 1500, ut = 200;
function dt({ reactions: e, currentTimeMs: t, className: n }) {
	let r = q(() => [...e].sort((e, t) => e.offsetMs - t.offsetMs), [e]), i = J(t), a = J([]), [o, s] = Y([]);
	return K(() => {
		let e = i.current;
		if (i.current = t, t < e - lt) {
			a.current = [];
			return;
		}
		if (t <= e) return;
		let n = r.filter((n) => n.offsetMs > e && n.offsetMs <= t);
		if (n.length === 0) return;
		let o = n.length > ct ? n.slice(-3) : n;
		a.current = [...a.current, ...o];
	}, [t, r]), K(() => {
		let e = setInterval(() => {
			let e = a.current.shift();
			e && s((t) => [...t.slice(-30), {
				id: `${e.id}@${Date.now()}`,
				emoji: e.emoji,
				displayName: e.displayName
			}]);
		}, ut);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ Z("div", {
		"data-testid": "playback-reactions-layer",
		className: "absolute inset-0 pointer-events-none",
		children: /* @__PURE__ */ Z(Ie, {
			reactions: o,
			className: n
		})
	});
}
//#endregion
//#region src/components/video/StatusStrip.tsx
function ft(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)} Mbps` : `${(e / 1e3).toFixed(0)} Kbps`;
}
function pt(e) {
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}
var mt = {
	live: "bg-success shadow-[0_0_6px_#22c55e]",
	playing: "bg-success shadow-[0_0_6px_#22c55e]",
	connecting: "bg-warning",
	reconnecting: "bg-warning",
	buffering: "bg-warning",
	idle: "bg-surface-emphasis",
	error: "bg-danger"
}, ht = {
	live: "text-success-fg",
	playing: "text-success-fg",
	connecting: "text-warning-fg",
	reconnecting: "text-warning-fg",
	buffering: "text-warning-fg",
	idle: "text-text-tertiary",
	error: "text-danger-fg"
};
function gt({ phase: t, bitrateBps: n, viewerCount: r, duration: i, className: a, style: o }) {
	let s = t === "playing" ? "LIVE" : t.toUpperCase();
	return /* @__PURE__ */ Q("div", {
		className: e("inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono", a),
		style: o,
		children: [
			/* @__PURE__ */ Q("span", {
				className: e("flex items-center gap-1"),
				children: [/* @__PURE__ */ Z("span", { className: e("w-[7px] h-[7px] rounded-full", mt[t] ?? "bg-surface-emphasis") }), /* @__PURE__ */ Z("span", {
					className: e("font-semibold", ht[t] ?? "text-text-tertiary"),
					children: s
				})]
			}),
			n !== void 0 && /* @__PURE__ */ Z("span", { children: ft(n) }),
			i !== void 0 && /* @__PURE__ */ Z("span", { children: pt(i) }),
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
function _t(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function vt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
function yt({ participant: e, size: t = 32 }) {
	let n = vt(e.displayName);
	return /* @__PURE__ */ Q("div", {
		"data-testid": "call-avatar",
		"data-speaking": e.isSpeaking ? "true" : void 0,
		"data-muted": e.isMuted ? "true" : void 0,
		"data-access": e.access,
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
			}) : _t(e.displayName),
			e.isSpeaking && /* @__PURE__ */ Z("span", {
				"data-testid": "call-avatar-speaking",
				className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
			}),
			/* @__PURE__ */ Z(Ve, {
				access: e.access,
				tone: "overlay",
				iconOnly: !0,
				className: "absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 bg-call-chrome [&_svg]:h-2.5 [&_svg]:w-2.5",
				"data-testid": "call-avatar-access"
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
function bt({ participants: t, localFallback: n, maxVisible: r = 4, avatarSize: i = 36, testId: a = "call-participant-strip", className: o, style: s }) {
	let c = t.slice(0, r), l = Math.max(0, t.length - r), u = t.length === 0 && !!n;
	return /* @__PURE__ */ Q("div", {
		"data-testid": a,
		"data-count": t.length,
		className: e("flex items-center justify-center gap-2 py-4 px-3 flex-wrap", o),
		style: s,
		children: [
			c.map((e) => /* @__PURE__ */ Z(yt, {
				participant: e,
				size: i
			}, e.id)),
			l > 0 && /* @__PURE__ */ Q("span", {
				"data-testid": "call-participant-strip-overflow",
				className: "text-white/50 text-xs font-medium",
				children: ["+", l]
			}),
			u && n && /* @__PURE__ */ Z(yt, {
				participant: n,
				size: i + 4
			})
		]
	});
}
//#endregion
//#region src/components/video/CallControls.tsx
var xt = {
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
function St({ icon: t, label: n, active: r = !1, danger: i = !1, onClick: a, disabled: o = !1, disabledReason: s, testId: c, expanded: l, buttonRef: u }) {
	let d = Re(s, o), f = d.reason;
	return /* @__PURE__ */ Z(Fe, {
		reason: f,
		children: /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
			ref: u,
			type: "button",
			title: f === void 0 ? n : void 0,
			"aria-label": n,
			"aria-haspopup": l === void 0 ? void 0 : "menu",
			"aria-expanded": l,
			...d.buttonProps,
			onClick: d.guard(a),
			"data-testid": c,
			className: e("w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80", i && "bg-danger text-white hover:bg-danger", r && !i && "bg-white/20 text-white", !r && !i && (f === void 0 ? "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white" : "bg-white/5 text-white/80"), f !== void 0 && "cursor-not-allowed *:opacity-45", f === void 0 && d.off && "opacity-40 cursor-not-allowed"),
			children: [t, d.description]
		})
	});
}
function Ct({ controls: e }) {
	let [t, n] = Y(!1), r = J(null), i = J(null);
	return K(() => {
		if (!t) return;
		let e = (e) => {
			r.current?.contains(e.target) || n(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [t]), /* @__PURE__ */ Q("div", {
		className: "relative inline-flex",
		ref: r,
		onKeyDown: (e) => {
			if (e.key === "Escape") {
				n(!1), i.current?.focus();
				return;
			}
			if (![
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = Array.from(r.current?.querySelectorAll("[role=\"menuitem\"]") ?? []);
			if (t.length === 0) return;
			e.preventDefault();
			let a = t.indexOf(document.activeElement), o;
			o = e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : e.key === "ArrowDown" ? a < 0 ? 0 : (a + 1) % t.length : a <= 0 ? t.length - 1 : a - 1, t[o].focus();
		},
		children: [/* @__PURE__ */ Z(St, {
			icon: xt.more,
			label: "More call controls",
			active: t,
			expanded: t,
			buttonRef: i,
			onClick: () => n((e) => !e),
			testId: "call-controls-more-button"
		}), t && /* @__PURE__ */ Z("div", {
			role: "menu",
			"aria-label": "More call controls",
			"data-testid": "call-controls-overflow",
			className: "absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg",
			children: e.map((e) => /* @__PURE__ */ Z(wt, {
				control: e,
				onDone: () => n(!1)
			}, e.key))
		})]
	});
}
function wt({ control: t, onDone: n }) {
	let r = Ge(), i = t.disabled && t.disabledReason || void 0;
	return /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		type: "button",
		role: "menuitem",
		"data-testid": t.testId,
		"aria-label": t.label,
		"aria-disabled": t.disabled ? "true" : void 0,
		"aria-describedby": i ? r : void 0,
		title: i,
		"data-disabled-reason": i,
		onClick: () => {
			t.disabled || (t.onClick(), n());
		},
		className: e("flex w-full items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors", t.disabled ? "cursor-not-allowed bg-transparent text-white/40" : t.active ? "cursor-pointer bg-white/15 text-white" : "cursor-pointer bg-transparent text-white/80 hover:bg-white/10 hover:text-white"),
		children: [/* @__PURE__ */ Z("span", {
			className: "shrink-0",
			"aria-hidden": "true",
			children: t.icon
		}), /* @__PURE__ */ Q("span", {
			className: "flex min-w-0 flex-col",
			children: [t.label, i && /* @__PURE__ */ Z("span", {
				id: r,
				className: "text-[10px] leading-tight text-white/50",
				children: i
			})]
		})]
	});
}
var Tt = /* @__PURE__ */ new Set(["mute", "camera"]);
function Et(e, t) {
	return t ? {
		disabled: !0,
		disabledReason: t
	} : e ? { disabled: !0 } : {};
}
function Dt({ mode: t, density: n = "full", isMuted: r = !1, isCameraOn: i = !0, isScreenSharing: a = !1, onToggleMute: o, onToggleCamera: s, onToggleScreenShare: c, onUpgradeToVideo: l, onEndCall: u, audioDisabled: d = !1, audioDisabledReason: f, videoDisabled: p = !1, videoDisabledReason: m, screenShareDisabled: h = !1, screenShareDisabledReason: g, onAddParticipant: _, availableParticipants: v, currentParticipantIds: y, onOpenAddParticipant: b, extras: x, className: S }) {
	let [C, w] = Y(!1), T = new Set(y ?? []), E = (v ?? []).filter((e) => !T.has(e.id)), D = [];
	o && D.push({
		key: "mute",
		icon: r ? xt.micOff : xt.mic,
		label: r ? "Unmute" : "Mute",
		active: r,
		onClick: o,
		testId: "mute-button",
		...Et(d, f)
	}), t === "video" && s && D.push({
		key: "camera",
		icon: i ? xt.camera : xt.cameraOff,
		label: i ? "Turn off camera" : "Turn on camera",
		active: !i,
		onClick: s,
		testId: "camera-button",
		...Et(p, m)
	}), t === "audio" && l && D.push({
		key: "upgrade",
		icon: xt.videoUpgrade,
		label: "Switch to video",
		onClick: l,
		testId: "upgrade-to-video-button",
		...Et(p, m)
	}), c && D.push({
		key: "screenshare",
		icon: xt.screenShare,
		label: a ? "Stop sharing" : "Share screen",
		active: a,
		onClick: c,
		testId: "screenshare-button",
		...Et(h, g)
	}), (_ || b) && D.push({
		key: "add-participant",
		icon: xt.userPlus,
		label: "Add people to this call",
		active: C,
		onClick: b ?? (() => w((e) => !e)),
		testId: "add-participant-button"
	});
	let O = n === "compact", k = O ? D.filter((e) => Tt.has(e.key)) : D, A = O ? D.filter((e) => !Tt.has(e.key)) : [];
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col", S),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex items-center justify-center gap-2 px-3 pb-3",
			"data-testid": "call-controls",
			children: [
				k.map((e) => /* @__PURE__ */ Z(St, {
					icon: e.icon,
					label: e.label,
					active: e.active,
					onClick: e.onClick,
					testId: e.testId,
					disabled: e.disabled,
					disabledReason: e.disabledReason
				}, e.key)),
				A.length > 0 && /* @__PURE__ */ Z(Ct, { controls: A }),
				x,
				u && /* @__PURE__ */ Z(St, {
					icon: xt.phoneEnd,
					label: "End call",
					danger: !0,
					onClick: u,
					testId: "hangup-button"
				})
			]
		}), C && _ && !b && /* @__PURE__ */ Q("div", {
			className: "border-t border-white/5 bg-call-chrome/80",
			"data-testid": "add-participant-picker",
			children: [/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between px-3 py-1.5",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-[10px] font-semibold text-white/50 uppercase tracking-wide",
					children: "Add to call"
				}), /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => w(!1),
					className: "text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer",
					"aria-label": "Close add-participant picker",
					children: "✕"
				})]
			}), E.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "px-3 pb-2.5 text-xs text-white/40 text-center",
				children: "Everyone is already in the call"
			}) : /* @__PURE__ */ Z("div", {
				className: "max-h-[120px] overflow-y-auto pb-1",
				children: E.map((e) => /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					className: "w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors",
					onClick: () => {
						_(e.id), E.length <= 1 && w(!1);
					},
					children: [
						/* @__PURE__ */ Z(yt, {
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
function Ot(e) {
	return e ? e.networkQuality !== void 0 || e.bitrateKbps !== void 0 || e.latencyMs !== void 0 || e.packetLossPct !== void 0 : !1;
}
var kt = {
	"top-left": "top-2 left-2",
	"top-right": "top-2 right-2",
	"bottom-left": "bottom-2 left-2",
	"bottom-right": "bottom-2 right-2"
};
function At(e) {
	return e >= 1e3 ? `${(e / 1e3).toFixed(1)} Mb/s` : `${Math.round(e)} kb/s`;
}
function jt({ stats: t, position: n = "top-left", testId: r = "call-stats-overlay", className: i, style: a }) {
	return Ot(t) ? /* @__PURE__ */ Q("div", {
		"data-testid": r,
		className: e("absolute z-10 pointer-events-none", kt[n], "flex flex-col gap-1.5", i),
		style: a,
		children: [t.networkQuality && /* @__PURE__ */ Z(ot, { quality: t.networkQuality }), (t.bitrateKbps !== void 0 || t.latencyMs !== void 0 || t.packetLossPct !== void 0) && /* @__PURE__ */ Q("div", {
			"data-testid": "call-stats-overlay-metrics",
			className: "inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono",
			children: [
				t.bitrateKbps !== void 0 && /* @__PURE__ */ Q("span", {
					"data-testid": "call-stats-bitrate",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-white/50 mr-1.5",
						children: "bitrate"
					}), At(t.bitrateKbps)]
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
var Mt = {
	chat: "call-chat-open",
	people: "call-people-open",
	captions: "captions-toggle"
}, Nt = {
	chat: "call-chat-panel",
	people: "call-people-panel",
	captions: "call-captions-panel"
};
function Pt(e) {
	return e.toggleTestId ?? Mt[e.id] ?? `call-side-panel-open-${e.id}`;
}
function Ft(e) {
	return e.panelTestId ?? Nt[e.id] ?? `call-side-panel-body-${e.id}`;
}
function It(e) {
	return e === "mini" ? "overlay" : "docked";
}
function Lt(e) {
	switch (e) {
		case "chat": return /* @__PURE__ */ Z(N, { size: 16 });
		case "people": return /* @__PURE__ */ Z(z, { size: 16 });
		case "captions": return /* @__PURE__ */ Z(L, { size: 16 });
		case "devices": return /* @__PURE__ */ Z(k, { size: 16 });
		default: return null;
	}
}
function Rt({ tabs: t, activeTab: n = null, onTabChange: r, disabled: i = !1, tone: a = "chrome", className: o, "data-testid": s = "call-side-panel-toggles" }) {
	return t.length === 0 ? null : /* @__PURE__ */ Z("div", {
		"data-testid": s,
		className: e("flex items-center", a === "surface" ? "gap-2" : "gap-1", o),
		"data-tone": a,
		role: "group",
		"aria-label": "Call side panel",
		children: t.map((t) => {
			let o = t.id === n, s = i || t.disabled === !0;
			return /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": t.label,
				"aria-pressed": o,
				title: t.label,
				disabled: s,
				"data-testid": Pt(t),
				"data-active": o ? "true" : "false",
				onClick: () => r?.(o ? null : t.id),
				className: e(a === "surface" ? ["relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-solid transition-colors duration-150", o ? "border-border bg-surface-inset text-text-primary" : "border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150", o ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"], s ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
				children: [t.icon ?? Lt(t.id) ?? /* @__PURE__ */ Z("span", {
					className: "text-[11px] font-semibold uppercase",
					children: t.label.slice(0, 2)
				}), t.badgeCount !== void 0 && t.badgeCount > 0 && /* @__PURE__ */ Z("span", {
					"data-testid": `${Pt(t)}-badge`,
					className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white",
					children: t.badgeCount > 99 ? "99+" : t.badgeCount
				})]
			}, t.id);
		})
	});
}
var zt = "__legacy__", Bt = "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-[13px] leading-5 font-medium", Vt = 4;
function Ht({ tabs: t, activeTab: n, onTabChange: r, mode: i = "window", open: a, onClose: o, title: s, children: c, widthClassName: l = "w-80", className: u, "data-testid": d = "call-side-panel" }) {
	let f = Array.isArray(t), p = J(null), m = J(null), [h, g] = Y([]), _ = f ? t : [{
		id: zt,
		label: s ?? "",
		content: c
	}], v = f ? n ?? null : a ? zt : null, y = _.find((e) => e.id === v) ?? null, b = f && _.length > 1 && y !== null, x = _.map((e) => `${e.id}\u0000${e.label}`).join("");
	if (qe(() => {
		if (!b) {
			g((e) => e.length ? [] : e);
			return;
		}
		let e = p.current, t = () => {
			let t = m.current;
			if (!e || !t) return;
			let n = e.clientWidth;
			if (n === 0) return;
			let r = /* @__PURE__ */ new Map();
			t.querySelectorAll("[data-measure-tab]").forEach((e) => r.set(e.dataset.measureTab ?? "", e.offsetWidth));
			let i = t.querySelector("[data-measure-more]")?.offsetWidth ?? 0, a = _.map((e) => e.id), o = (e) => r.get(e) ?? 0, s = a.reduce((e, t, n) => e + o(t) + (n > 0 ? Vt : 0), 0), c = [];
			if (s > n) {
				let e = i + o(v ?? ""), t = /* @__PURE__ */ new Set([v ?? ""]);
				for (let r of a) if (r !== v) {
					if (e + Vt + o(r) > n) break;
					e += Vt + o(r), t.add(r);
				}
				c = a.filter((e) => !t.has(e));
			}
			g((e) => e.length === c.length && e.every((e, t) => e === c[t]) ? e : c);
		};
		if (t(), !e || typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [
		b,
		x,
		v
	]), !y) return null;
	let S = It(i), C = _.filter((e) => h.includes(e.id) && e.id !== y.id), w = _.filter((e) => !C.includes(e));
	return /* @__PURE__ */ Q("aside", {
		"data-testid": d,
		"data-call-side-panel-placement": S,
		"data-call-side-panel-tab": f ? y.id : void 0,
		"aria-label": y.label,
		className: e("flex min-h-0 flex-col overflow-hidden bg-call-chrome text-white", S === "docked" ? ["h-full shrink-0 border-l border-call-chrome-border", l] : "absolute inset-0 z-20", u),
		children: [/* @__PURE__ */ Q("header", {
			className: "relative flex shrink-0 items-center justify-between gap-2 border-b border-call-chrome-border px-2 py-2",
			children: [b ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("div", {
				ref: p,
				className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
				"data-testid": "call-side-panel-rail",
				"data-tabs-hidden": C.length || void 0,
				children: [/* @__PURE__ */ Z("div", {
					role: "tablist",
					"aria-label": "Call side panel sections",
					className: "flex min-w-0 items-center gap-1",
					children: w.map((t) => {
						let n = t.id === y.id;
						return /* @__PURE__ */ Z("button", {
							"data-ui-part": "",
							type: "button",
							role: "tab",
							"aria-selected": n,
							disabled: t.disabled === !0,
							onClick: () => r?.(t.id),
							"data-testid": `call-side-panel-tab-${t.id}`,
							className: e(Bt, "transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/80", n ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white/90", t.disabled === !0 ? "cursor-not-allowed opacity-40" : "cursor-pointer"),
							children: t.label
						}, t.id);
					})
				}), C.length > 0 && /* @__PURE__ */ Z(he, {
					trigger: /* @__PURE__ */ Q("span", {
						className: "inline-flex items-center gap-1",
						children: ["More", /* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							className: "text-[10px] leading-none",
							children: "▾"
						})]
					}),
					triggerLabel: `More sections: ${C.map((e) => e.label).join(", ")}`,
					triggerVariant: "link",
					triggerClassName: e(Bt, "text-white/60 hover:bg-white/10 hover:text-white/90 aria-expanded:bg-white/10 aria-expanded:text-white"),
					triggerTestId: "call-side-panel-more",
					align: "end",
					"data-testid": "call-side-panel-more-menu",
					sections: [{ items: C.map((e) => ({
						label: e.label,
						onSelect: () => r?.(e.id),
						...e.badgeCount ? { trailing: e.badgeCount > 99 ? "99+" : String(e.badgeCount) } : {},
						...e.disabled ? { disabled: !0 } : {},
						"data-testid": `call-side-panel-tab-${e.id}`
					})) }]
				})]
			}), /* @__PURE__ */ Q("div", {
				ref: m,
				"aria-hidden": "true",
				className: "pointer-events-none invisible absolute left-0 top-0 flex whitespace-nowrap",
				"data-testid": "call-side-panel-rail-measure",
				children: [_.map((t) => /* @__PURE__ */ Z("span", {
					"data-measure-tab": t.id,
					"data-label": t.label,
					className: e(Bt, "before:content-[attr(data-label)]")
				}, t.id)), /* @__PURE__ */ Z("span", {
					"data-measure-more": "",
					className: e(Bt, "inline-flex items-center gap-1 before:content-['More']"),
					children: /* @__PURE__ */ Z("span", { className: "text-[10px] leading-none before:content-['▾']" })
				})]
			})] }) : /* @__PURE__ */ Z("h2", {
				className: "m-0 truncate text-sm font-semibold text-white",
				children: y.label
			}), /* @__PURE__ */ Z("button", {
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
		}), /* @__PURE__ */ Z("div", {
			role: b ? "tabpanel" : void 0,
			"data-testid": f ? Ft(y) : void 0,
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ Z(Ce, {
				hasHeader: !0,
				fillsHeight: !0,
				children: y.content
			})
		})]
	});
}
//#endregion
//#region src/components/video/callWidgetMode.ts
function Ut(e) {
	return e === "docked" ? "window" : e;
}
function Wt(e) {
	return e === "window" ? "docked" : e;
}
function Gt(e) {
	return e ? "mini" : "window";
}
var Kt = /* @__PURE__ */ new Set();
function qt(e, t) {
	process.env.NODE_ENV !== "production" && (Kt.has(e) || (Kt.add(e), console.warn(`[${e}] both \`${t}\` and the canonical mode prop were supplied. The mode prop wins; \`${t}\` is deprecated (${t} === true → 'mini', false → 'window'). Drop the legacy prop.`)));
}
//#endregion
//#region src/components/video/CallWidget.tsx
var Jt = "w-[380px]", Yt = "w-[480px]", Xt = "h-[480px]", Zt = "application/x-call-dock";
function Qt(e) {
	return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
}
function $t({ stream: t, muted: n = !1, className: r }) {
	let i = J(null);
	return K(() => {
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
var en = {
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
function tn({ callerName: e, onAnswer: t, onDecline: n }) {
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
					"data-ui-part": "",
					type: "button",
					onClick: n,
					className: "w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors",
					"aria-label": "Decline call",
					children: en.phoneEnd
				}), t && /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					onClick: t,
					className: "w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors",
					"aria-label": "Answer call",
					children: en.phoneAnswer
				})]
			})
		]
	});
}
function nn({ mode: t, fillHeight: n = !1, participants: r, localParticipant: i, duration: a, isMuted: o, isCameraOn: s, isScreenSharing: c, onToggleMute: l, onToggleCamera: u, onToggleScreenShare: d, onUpgradeToVideo: f, audioDisabled: p, audioDisabledReason: m, videoDisabled: h, videoDisabledReason: g, screenShareDisabled: _, screenShareDisabledReason: v, onAddParticipant: y, availableParticipants: b, onOpenAddParticipant: x, controlsExtras: S, onEndCall: C, layoutComponent: w, callStats: T }) {
	let E = t === "video" && s;
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col", n && "h-full min-h-0"),
		children: [
			w && /* @__PURE__ */ Q("div", {
				className: e("mx-3 mt-3 rounded-lg overflow-hidden relative", n && "min-h-0 flex-1"),
				children: [w, /* @__PURE__ */ Z(jt, {
					stats: T,
					position: "bottom-left"
				})]
			}),
			!w && t === "video" && /* @__PURE__ */ Q("div", {
				className: e("relative bg-black rounded-lg overflow-hidden mx-3 mt-3", n ? "min-h-0 flex-1" : "aspect-video"),
				children: [
					i?.videoStream && E ? /* @__PURE__ */ Z($t, {
						stream: i.videoStream,
						muted: !0
					}) : /* @__PURE__ */ Z("div", {
						className: "w-full h-full flex items-center justify-center bg-video-stage",
						children: i && /* @__PURE__ */ Z(yt, {
							participant: i,
							size: 48
						})
					}),
					r.length > 0 && /* @__PURE__ */ Q("div", {
						className: "absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile",
						children: [r[0].videoStream ? /* @__PURE__ */ Z($t, { stream: r[0].videoStream }) : /* @__PURE__ */ Z("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ Z(yt, {
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
					/* @__PURE__ */ Z(jt, {
						stats: T,
						position: "bottom-left"
					})
				]
			}),
			!w && t === "audio" && /* @__PURE__ */ Z("div", {
				className: e(n && "flex min-h-0 flex-1 items-center justify-center"),
				children: /* @__PURE__ */ Z(bt, {
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
					children: Qt(a)
				}), /* @__PURE__ */ Q("span", {
					className: "text-white/40 text-[10px] ml-2",
					children: [r.length + 1, " in call"]
				})]
			}),
			/* @__PURE__ */ Z(Dt, {
				className: n ? "shrink-0" : void 0,
				mode: t,
				isMuted: o,
				isCameraOn: s,
				isScreenSharing: c,
				onToggleMute: l,
				onToggleCamera: u,
				onToggleScreenShare: d,
				onUpgradeToVideo: f,
				onEndCall: C,
				audioDisabled: p,
				audioDisabledReason: m,
				videoDisabled: h,
				videoDisabledReason: g,
				screenShareDisabled: _,
				screenShareDisabledReason: v,
				onAddParticipant: y,
				availableParticipants: b,
				onOpenAddParticipant: x,
				currentParticipantIds: r.map((e) => e.id),
				extras: S
			})
		]
	});
}
function rn({ state: t, mode: n, duration: r, isMuted: i, callerName: a, onToggleMute: o, audioDisabled: s = !1, audioDisabledReason: c, onEndCall: l, onExpand: u }) {
	let d = Re(c, s), f = d.reason;
	return /* @__PURE__ */ Q("div", {
		className: e("flex items-center gap-2 px-3 py-2 select-none", u && "cursor-pointer"),
		onClick: u,
		role: u ? "button" : void 0,
		tabIndex: u ? 0 : void 0,
		"aria-label": u ? "Expand call widget" : void 0,
		onKeyDown: u ? je(u) : void 0,
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
							children: Qt(r)
						})
					]
				})
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-1",
				onClick: (e) => e.stopPropagation(),
				children: [t === "active" && o && /* @__PURE__ */ Z(Fe, {
					reason: f,
					placement: "bottom",
					children: /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						type: "button",
						onClick: d.guard(o),
						...d.buttonProps,
						"data-testid": "call-pill-mute",
						className: e("w-6 h-6 rounded-full flex items-center justify-center border-none transition-colors", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80", i ? "bg-danger/20 text-danger-fg" : e("bg-white/10 text-white/70", f === void 0 && "hover:text-white"), f === void 0 ? d.off ? "opacity-40 cursor-not-allowed" : "cursor-pointer" : "cursor-not-allowed *:opacity-45"),
						"aria-label": i ? "Unmute" : "Mute",
						children: [d.description, /* @__PURE__ */ Z("svg", {
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
						})]
					})
				}), l && /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					onClick: l,
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
function an(e) {
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
function on(e, t, n) {
	let [r, i] = Y({
		x: 0,
		y: 0
	}), [a, o] = Y(!1), [s, c] = Y(!1), l = J(null), u = G(() => {
		l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 200);
	}, []);
	K(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let d = J(!1), f = J({
		x: 0,
		y: 0
	}), p = J({
		x: 0,
		y: 0
	}), m = J(null), h = J(null), g = J(null), _ = G((t) => {
		e && (h.current = m.current?.getBoundingClientRect() ?? null, g.current = h.current, d.current = !0, o(!0), c(!1), f.current = {
			x: t.clientX,
			y: t.clientY
		}, p.current = { ...r }, t.preventDefault());
	}, [e, r]), v = G(() => {
		c(!0), i({
			x: 0,
			y: 0
		}), u();
	}, [u]), y = G((e) => {
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
	return K(() => {
		if (!e) return;
		let t = (e) => {
			if (!d.current) return;
			i({
				x: p.current.x + (e.clientX - f.current.x),
				y: p.current.y + (e.clientY - f.current.y)
			});
			let t = h.current;
			t && (g.current = new DOMRect(t.left + e.clientX - f.current.x, t.top + e.clientY - f.current.y, t.width, t.height));
			let n = (g.current ? an(g.current) : null)?.id ?? null;
			n !== C.current && (C.current = n, x.current?.(n));
		}, n = () => {
			if (!d.current) return;
			d.current = !1, o(!1);
			let e = m.current;
			if (!e) return;
			let t = g.current ?? e.getBoundingClientRect(), n = an(t);
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
function sn({ onSnap: t, contained: n }) {
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
function cn({ state: t, mode: n, participants: r, localParticipant: i, callerName: a, duration: o, isMuted: s = !1, isCameraOn: c = !0, isScreenSharing: l = !1, onAnswer: u, onDecline: d, onEndCall: f, onToggleMute: p, onToggleCamera: m, onToggleScreenShare: h, onUpgradeToVideo: g, audioDisabled: _ = !1, audioDisabledReason: v, videoDisabled: y = !1, videoDisabledReason: b, screenShareDisabled: x = !1, screenShareDisabledReason: S, onAddParticipant: C, availableParticipants: w, controlsExtras: T, onOpenAddParticipant: E, onMinimize: D, onExpand: O, layoutComponent: k, callStats: A, displayMode: j, minimized: M, sidePanelTabs: N, activeSidePanelTab: P = null, onSidePanelTabChange: F, sidePanelWidthClassName: I = "w-80", dockTargets: L, activeDockId: R = null, onDockTo: ee, onDragStateChange: z, position: B = "bottom-right", contained: V = !1, draggable: te = !0, className: H, style: ne, dataAttrs: U }) {
	j !== void 0 && M !== void 0 && qt("CallWidget", "minimized");
	let re = j ?? Gt(M ?? !1), W = re === "mini", ie = N ?? [], ae = ie.length > 0 && !W && t === "active", oe = ae && ie.some((e) => e.id === P), se = (L ?? []).length > 0, ce = se && R != null, le = te && !ce, ue = U?.["data-call-id"], de = ue == null || ue === "" ? void 0 : String(ue), fe = G((e) => {
		let t = e.dataTransfer;
		if (!t) return;
		let n = {
			callId: de,
			fromDockId: R ?? null
		};
		t.setData(Zt, JSON.stringify(n)), t.effectAllowed = "move";
	}, [de, R]), { offset: pe, handleMouseDown: me, resetOffset: he, snapToCorner: ge, isDragging: _e, isAnimating: ve, hasMoved: ye, widgetRef: be } = on(le, G((e) => {
		for (let t of document.querySelectorAll("[data-call-dock-target]")) e && t.dataset.callDockTarget === e ? t.dataset.pointerOver = "true" : delete t.dataset.pointerOver;
	}, []), G((e) => ee ? (ee(e), !0) : !1, [ee])), xe = J(z);
	xe.current = z, K(() => {
		xe.current?.(_e);
	}, [_e]);
	let Se = {};
	if (U) for (let [e, t] of Object.entries(U)) t != null && t !== "" && (Se[e] = t);
	let Ce = q(() => {
		switch (B) {
			case "bottom-left": return "bottom-4 left-4";
			case "top-right": return "top-4 right-4";
			case "top-left": return "top-4 left-4";
			default: return "bottom-4 right-4";
		}
	}, [B]);
	if (t === "idle" || t === "ended") return null;
	let we = /* @__PURE__ */ Q(X, { children: [
		t === "ringing" && /* @__PURE__ */ Z(tn, {
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
		t === "active" && /* @__PURE__ */ Z(nn, {
			mode: n,
			fillHeight: oe,
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
			audioDisabled: _,
			audioDisabledReason: v,
			videoDisabled: y,
			videoDisabledReason: b,
			screenShareDisabled: x,
			screenShareDisabledReason: S,
			onAddParticipant: C,
			availableParticipants: w,
			onOpenAddParticipant: E,
			controlsExtras: ae ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(Rt, {
				tabs: ie,
				activeTab: P,
				onTabChange: F
			}), T] }) : T,
			onEndCall: f,
			layoutComponent: k,
			callStats: A
		})
	] });
	return /* @__PURE__ */ Q(X, { children: [_e && /* @__PURE__ */ Z(sn, {
		onSnap: ge,
		contained: V
	}), /* @__PURE__ */ Z("div", {
		ref: be,
		"data-testid": "call-widget",
		"data-call-state": t,
		"data-call-widget-mode": re,
		"data-call-widget-mode-legacy": Wt(re),
		"data-call-dock-id": ce ? R : void 0,
		className: e(ce ? "relative" : [V ? "absolute z-50" : "fixed z-[10001]", Ce], H),
		style: {
			transform: ce ? void 0 : `translate(${pe.x}px, ${pe.y}px)`,
			transition: ve ? "transform 0.2s ease-out" : void 0,
			...ne
		},
		...Se,
		children: /* @__PURE__ */ Q("div", {
			className: e("bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm", W ? "w-[260px]" : oe ? "w-auto" : Jt),
			"data-call-side-panel-open": oe ? "true" : "false",
			children: [
				!W && /* @__PURE__ */ Q("div", {
					className: e("relative flex items-center justify-between px-3 py-2 border-b border-white/5", le && "cursor-grab active:cursor-grabbing"),
					onMouseDown: me,
					draggable: ce || void 0,
					onDragStart: se ? fe : void 0,
					"data-call-dock-source": se ? "true" : void 0,
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2",
						children: [
							se && /* @__PURE__ */ Z("span", {
								draggable: ce || void 0,
								className: "flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors",
								title: "Drag the call into the page",
								"data-testid": "call-dock-drag-handle",
								"aria-hidden": !0,
								children: en.grip
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
							ye && /* @__PURE__ */ Z("button", {
								"data-ui-part": "",
								type: "button",
								onClick: he,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Snap back to corner",
								title: "Snap back to corner",
								children: en.snapBack
							}),
							O && /* @__PURE__ */ Z("button", {
								"data-ui-part": "",
								type: "button",
								onClick: O,
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
							D && /* @__PURE__ */ Z("button", {
								"data-ui-part": "",
								type: "button",
								onClick: D,
								className: "w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors",
								"aria-label": "Minimize",
								children: en.minimize
							})
						]
					})]
				}),
				W && /* @__PURE__ */ Z("div", {
					className: e(le && "cursor-grab active:cursor-grabbing"),
					onMouseDown: me,
					children: /* @__PURE__ */ Z(rn, {
						state: t,
						mode: n,
						duration: o,
						isMuted: s,
						callerName: a,
						onToggleMute: p,
						audioDisabled: _,
						audioDisabledReason: v,
						onEndCall: f,
						onExpand: D
					})
				}),
				!W && (oe ? /* @__PURE__ */ Q("div", {
					className: e("flex min-h-0 items-stretch", "h-[480px]"),
					"data-testid": "call-widget-dock-row",
					children: [/* @__PURE__ */ Z("div", {
						className: e("flex h-full min-h-0 flex-col shrink-0", "w-[480px]"),
						"data-testid": "call-widget-stage-column",
						children: we
					}), /* @__PURE__ */ Z(Ht, {
						mode: re,
						tabs: ie,
						activeTab: P,
						onTabChange: F,
						widthClassName: I
					})]
				}) : we)
			]
		})
	})] });
}
//#endregion
//#region src/components/video/CallStartedBanner.tsx
function ln({ callerName: t, callerAvatarUrl: n, context: r, mode: i = "started", media: a, onJoin: o, onDismiss: c, autoExpireSec: l = 30, className: u, style: d }) {
	let [f, p] = Y(!0), m = s(c);
	if (K(() => {
		if (!l || l <= 0) return;
		let e = setTimeout(() => {
			p(!1), m();
		}, l * 1e3);
		return () => clearTimeout(e);
	}, [l, m]), !f) return null;
	let h = [a === "audio" ? "Audio call" : a === "video" ? "Video call" : null, r].filter(Boolean).join(" · ");
	return /* @__PURE__ */ Q("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "incoming-call-toast",
		"data-call-mode": i,
		"data-call-media": a,
		"data-caller-name": t,
		className: e("flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg", "bg-call-chrome text-white border border-call-chrome-border", u),
		style: d,
		children: [
			/* @__PURE__ */ Z(un, {
				name: t,
				avatarUrl: n
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ Z("p", {
					className: "text-sm font-semibold m-0 truncate",
					children: i === "calling" ? `${t} is calling you` : `${t} started a call`
				}), h && /* @__PURE__ */ Z("p", {
					className: "text-xs text-white/60 m-0 truncate",
					"data-testid": "incoming-call-subtitle",
					children: h
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => {
						p(!1), c();
					},
					className: "text-xs text-white/60 hover:text-white px-2 py-1 rounded",
					"aria-label": "Dismiss call invitation",
					"data-testid": "incoming-call-dismiss",
					children: "Dismiss"
				}), o && /* @__PURE__ */ Z("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => {
						p(!1), o();
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
function un({ name: e, avatarUrl: t }) {
	let n = fn(e);
	return /* @__PURE__ */ Q("div", {
		className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 relative",
		style: { background: t ? void 0 : `hsl(${n}, 55%, 45%)` },
		children: [t ? /* @__PURE__ */ Z("img", {
			src: t,
			alt: "",
			className: "w-full h-full rounded-full object-cover"
		}) : dn(e), /* @__PURE__ */ Z("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-code-border animate-pulse" })]
	});
}
function dn(e) {
	return e.split(" ").map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function fn(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return Math.abs(t) % 360;
}
//#endregion
//#region src/components/video/RecordingPlayer.tsx
function pn(e) {
	let t = e.split("#")[0].split("?")[0].toLowerCase();
	return t.endsWith(".m3u8") ? "hls" : /\.(mp4|m4v|mov|webm|ogv|ogg|m4a|mp3|wav|aac)$/.test(t) ? "progressive" : "unknown";
}
function mn(e, t) {
	let n = Math.max(0, e);
	return Number.isFinite(t) && t > 0 ? Math.min(n, t) : n;
}
function hn(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n), a = String(r).padStart(2, "0");
	return t > 0 ? `${t}:${i}:${a}` : `${i}:${a}`;
}
function gn({ playlistUrl: t, poster: n, autoPlay: r = !1, muted: i = !1, onLoadedMetadata: a, onTimeUpdate: s, onError: c, hideDownload: l = !1, className: u, startAt: d, ref: f }) {
	let p = J(null), m = J(!1), h = J(null), g = J(d);
	g.current = d;
	let _ = J(null), v = J(c);
	v.current = c;
	let [y, b] = Y(!1), [x, S] = Y(0), [C, w] = Y(0), [T, E] = Y(1), [D, O] = Y(1), [k, A] = Y(!1), [j, M] = Y(null);
	K(() => {
		m.current = !1;
		let e = p.current;
		if (!e || !t) return;
		if (M(null), A(!0), pn(t) === "progressive" || e.canPlayType("application/vnd.apple.mpegurl")) return e.src = t, () => {
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
				_.current = i, i.attachMedia(e), i.on(r.Events.MEDIA_ATTACHED, () => i.loadSource(t)), i.on(r.Events.ERROR, (e, t) => {
					t.fatal && (M(`HLS error: ${t.type}`), v.current?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (n) return;
				M(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
			}
		})(), () => {
			if (n = !0, _.current) {
				try {
					_.current.destroy();
				} catch {}
				_.current = null;
			}
		};
	}, [t]), Ke(f, () => ({
		seek(e) {
			let t = p.current;
			if (Number.isFinite(e)) {
				if (!t || !m.current) {
					h.current = Math.max(0, e);
					return;
				}
				t.currentTime = mn(e, t.duration);
			}
		},
		play() {
			p.current?.play()?.catch(() => {});
		},
		pause() {
			p.current?.pause();
		},
		get currentTime() {
			let e = p.current;
			return !e || !m.current ? h.current ?? 0 : e.currentTime;
		}
	}), []);
	let N = () => {
		let e = p.current;
		e && (e.paused ? e.play().catch(() => {}) : e.pause());
	}, P = (e) => {
		let t = p.current;
		!t || !isFinite(C) || C <= 0 || (t.currentTime = Number(e.target.value));
	}, F = (e) => {
		let t = p.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.volume = n, E(n);
	}, I = (e) => {
		let t = p.current;
		if (!t) return;
		let n = Number(e.target.value);
		t.playbackRate = n, O(n);
	}, L = () => {
		let e = p.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen?.());
	}, R = q(() => C > 0 ? Math.min(100, x / C * 100) : 0, [x, C]);
	return /* @__PURE__ */ Q("div", {
		className: e("relative bg-video-stage rounded-lg overflow-hidden aspect-video group", u),
		children: [
			/* @__PURE__ */ Z("video", {
				ref: p,
				autoPlay: r,
				muted: i,
				poster: n,
				playsInline: !0,
				className: "w-full h-full object-contain",
				onPlay: () => b(!0),
				onPause: () => b(!1),
				onLoadedMetadata: (e) => {
					let t = e.currentTarget, n = !m.current;
					m.current = !0;
					let r = h.current ?? (n ? g.current : void 0);
					h.current = null, r !== void 0 && Number.isFinite(r) && (t.currentTime = mn(r, t.duration)), w(t.duration), A(!1), a?.(t.duration);
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
			k && !j && /* @__PURE__ */ Z("div", {
				role: "status",
				className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm",
				children: "Loading…"
			}),
			j && /* @__PURE__ */ Z("div", {
				role: "alert",
				className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm px-4 text-center",
				children: j
			}),
			/* @__PURE__ */ Q("div", {
				className: "absolute bottom-0 left-0 right-0 px-3 pt-8 pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200",
				children: [/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ Z("span", {
							className: "text-white text-xs tabular-nums w-12",
							children: hn(x)
						}),
						/* @__PURE__ */ Z("input", {
							"data-ui-part": "",
							type: "range",
							min: 0,
							max: isFinite(C) ? C : 0,
							step: .1,
							value: x,
							onChange: P,
							className: "flex-1 h-1 accent-white/90 cursor-pointer",
							style: { "--progress": `${R}%` }
						}),
						/* @__PURE__ */ Z("span", {
							className: "text-white text-xs tabular-nums w-12 text-right",
							children: hn(C)
						})
					]
				}), /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3 text-white",
					children: [
						/* @__PURE__ */ Z("button", {
							"data-ui-part": "",
							type: "button",
							onClick: N,
							className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center",
							"aria-label": y ? "Pause" : "Play",
							children: y ? /* @__PURE__ */ Q("svg", {
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
								"data-ui-part": "",
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
						/* @__PURE__ */ Z(U, {
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
						/* @__PURE__ */ Z("div", { className: "flex-1" }),
						!l && t && /* @__PURE__ */ Z("a", {
							href: o(t) ?? void 0,
							download: !0,
							className: "text-white/80 hover:text-white text-xs underline",
							"aria-label": "Download",
							children: "Download"
						}),
						/* @__PURE__ */ Z("button", {
							"data-ui-part": "",
							type: "button",
							onClick: L,
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
function _n(e) {
	if (!isFinite(e) || e < 0) return "—";
	let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
	return t > 0 ? `${t}h ${n}m` : n > 0 ? `${n}m ${r}s` : `${r}s`;
}
function vn(e) {
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
function yn({ status: e }) {
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
function bn({ id: t, startIso: n, durationSec: r, participantCount: i, thumbnailUrl: a, label: o, status: s = "ready", selected: c, onClick: l, actions: u, className: d }) {
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
					/* @__PURE__ */ Z(yn, { status: s }),
					/* @__PURE__ */ Z("span", {
						className: "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums",
						children: _n(r)
					})
				]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)] truncate",
					children: o ?? vn(n)
				}), typeof i == "number" && i > 0 && /* @__PURE__ */ Q("span", {
					className: "inline-flex shrink-0 items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)]",
					title: `${i} ${i === 1 ? "person" : "people"} in this call`,
					children: [i, /* @__PURE__ */ Z(z, { size: 12 })]
				})]
			}),
			o && /* @__PURE__ */ Z("div", {
				className: "mt-0.5 text-xs text-[var(--color-text-secondary)]",
				children: vn(n)
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
function xn({ recordings: t, selectedId: n, onSelect: r, loading: i, emptyState: a, renderActions: o, className: s }) {
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
		children: t.map((e) => /* @__PURE__ */ Z(bn, {
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
var Sn = 864e5, Cn = [
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
function wn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function Tn(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
function En(e, t, n = Date.now()) {
	if (e === "never") return null;
	let r = Cn.find((t) => t.id === e);
	if (r?.days) return new Date(n + r.days * Sn).toISOString();
	if (e === "custom") {
		if (!t) return;
		let e = /* @__PURE__ */ new Date(`${t}T23:59:59`);
		return Number.isNaN(e.getTime()) ? void 0 : e.toISOString();
	}
}
function Dn({ open: e, expiresAt: n, onSave: r, onClose: i, title: a = "Recording expiry", "data-testid": o = "recording-expiry-dialog" }) {
	let [s, c] = Y(n === null ? "never" : "custom"), [l, u] = Y(n ? Tn(Date.parse(n)) : ""), [d, f] = Y(!1), [p, m] = Y(null);
	K(() => {
		e && (c(n === null ? "never" : "custom"), u(n ? Tn(Date.parse(n)) : ""), m(null), f(!1));
	}, [e, n]);
	let h = q(() => En(s, l), [s, l]), g = typeof h == "string" && Date.parse(h) < Date.now() + 36e5, _ = h !== void 0 && !g && !d, v = n === null ? "This recording does not expire." : n ? `Set to expire ${wn(n)}.` : "No expiry is recorded.", y = async () => {
		if (h !== void 0) {
			f(!0), m(null);
			try {
				await r(h), i();
			} catch (e) {
				m(e instanceof Error ? e.message : String(e)), f(!1);
			}
		}
	};
	return /* @__PURE__ */ Z(H, {
		open: e,
		onClose: i,
		title: a,
		maxWidth: 440,
		footer: /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(t, {
			variant: "secondary",
			size: "sm",
			onClick: i,
			disabled: d,
			"data-testid": `${o}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ Z(t, {
			variant: "primary",
			size: "sm",
			onClick: () => void y(),
			disabled: !_,
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
					children: v
				}),
				/* @__PURE__ */ Z(De, {
					"data-testid": `${o}-choices`,
					children: Cn.map((e) => /* @__PURE__ */ Z(Ee, {
						title: e.title,
						selected: s === e.id,
						onSelect: () => c(e.id),
						disabled: d,
						"data-testid": `${o}-choice-${e.id}`
					}, e.id))
				}),
				s === "custom" && /* @__PURE__ */ Z(ae, {
					label: "Expires on",
					hint: "At the end of that day, your local time.",
					...g ? { error: "Pick a date at least an hour from now." } : {},
					children: (e) => /* @__PURE__ */ Z("input", {
						"data-ui-part": "",
						...e,
						type: "date",
						value: l,
						min: Tn(Date.now()),
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
var On = 24;
function kn(e) {
	let t = Math.floor(e / 1e3), n = Math.floor(t / 60), r = t % 60;
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function An(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % 360;
}
function jn(e) {
	let t = e.speakerId || e.speakerLabel;
	return t ? `hsl(${An(t)}, 65%, 60%)` : null;
}
var Mn = "Speaker";
function Nn({ status: t, segments: n, currentTimeMs: r, onSeek: i, title: a = "Transcript", errorMessage: o, errorDetail: s, pendingMessage: c, idleState: l, follow: u = !1, jumpLabel: d = "Jump to latest", headerMeta: f, headerActions: p, beforeSegments: m, emptyMessage: h, frame: g = "card", className: _, "data-testid": v }) {
	let y = J(null), b = J(!0), [x, S] = Y(!1), C = G(() => {
		let e = y.current;
		if (!u || !e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight <= On;
		b.current = t, S(!t);
	}, [u]), w = n?.length ? `${n.length}:${n[n.length - 1].id ?? n[n.length - 1].startMs}` : "";
	qe(() => {
		let e = y.current;
		!u || !e || !b.current || (e.scrollTop = e.scrollHeight);
	}, [u, w]);
	let T = () => {
		let e = y.current;
		b.current = !0, S(!1), e && (e.scrollTop = e.scrollHeight);
	}, E = g === "fill", D = E ? "flex min-h-0 flex-1 flex-col bg-surface" : "rounded-lg border border-border bg-surface", O = (t) => p !== void 0 || f !== void 0 || E ? /* @__PURE__ */ Q("header", {
		className: e("flex shrink-0 items-center gap-2 text-sm font-medium text-text-secondary", E ? "px-3 py-2 border-b border-border" : "px-4 py-3 border-b border-border"),
		children: [
			/* @__PURE__ */ Z("span", {
				className: "shrink-0",
				children: a
			}),
			/* @__PURE__ */ Z("span", {
				className: "min-w-0 flex-1 truncate text-xs font-normal text-text-tertiary",
				children: f ?? t
			}),
			p
		]
	}) : null, k = q(() => {
		if (!n || r == null) return -1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (r >= t.startMs && r < t.endMs) return e;
		}
		return -1;
	}, [n, r]);
	if (K(() => {
		if (k < 0 || !y.current) return;
		let e = y.current.querySelector(`[data-seg-index="${k}"]`);
		e && e.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [k]), t === "idle") return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", _),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: l ?? "Transcription was not enabled for this recording."
		})]
	});
	if (t === "pending" || t === "processing") return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", _),
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
	});
	if (t === "failed") return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-danger-border bg-surface p-4", _),
		children: [
			/* @__PURE__ */ Q("header", {
				className: "text-sm font-medium text-danger mb-2",
				children: [a, " — failed"]
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-sm text-text-secondary",
				children: o ?? "Transcript generation failed. Reach out to support if this persists."
			}),
			/* @__PURE__ */ Z(oe, {
				text: s,
				className: "mt-2"
			})
		]
	});
	if ((!n || n.length === 0) && (E || h !== void 0 || p !== void 0 || m !== void 0)) return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		"data-testid": v,
		className: e(D, _),
		children: [O(null) ?? /* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary px-4 pt-4 mb-2",
			children: a
		}), /* @__PURE__ */ Q("div", {
			className: e("min-h-0 overflow-y-auto", E ? "flex-1 px-3 py-2 space-y-2" : "px-4 pb-4 space-y-2"),
			children: [m, /* @__PURE__ */ Z("div", {
				className: "text-sm text-text-tertiary",
				"data-testid": v ? `${v}-empty` : void 0,
				children: h ?? "No audible speech was captured in this recording."
			})]
		})]
	});
	if (!n || n.length === 0) return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", _),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: a
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: "No audible speech was captured in this recording."
		})]
	});
	let A = n.some((e) => e.speakerAvatarUrl !== void 0);
	return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		"data-testid": v,
		"data-follow": u ? x ? "detached" : "following" : void 0,
		className: e(E ? D : "rounded-lg border border-border bg-surface flex flex-col", u && "relative", _),
		children: [
			O(`${n.length} segments`) ?? /* @__PURE__ */ Q("header", {
				className: "text-sm font-medium text-text-secondary px-4 py-3 border-b border-border",
				children: [a, /* @__PURE__ */ Q("span", {
					className: "ml-2 text-xs font-normal text-text-tertiary",
					children: [n.length, " segments"]
				})]
			}),
			/* @__PURE__ */ Q("div", {
				ref: y,
				onScroll: u ? C : void 0,
				className: e("flex-1 overflow-y-auto space-y-2", E ? "min-h-0 px-3 py-2" : "max-h-[60vh] p-4"),
				children: [m, n.map((t, n) => {
					let r = n === k, a = jn(t), o = !!i;
					return /* @__PURE__ */ Q("div", {
						"data-seg-index": n,
						className: e("rounded-md px-3 py-2 transition-colors", r ? "bg-surface-emphasis ring-1 ring-primary" : "hover:bg-surface-hover", o && "cursor-pointer"),
						onClick: o ? () => i(t.startMs) : void 0,
						onKeyDown: o ? je(() => i(t.startMs)) : void 0,
						role: o ? "button" : void 0,
						tabIndex: o ? 0 : void 0,
						"aria-label": o ? `Seek to ${kn(t.startMs)} — ${t.speakerLabel ?? Mn}` : void 0,
						children: [/* @__PURE__ */ Q("div", {
							className: e("flex gap-2 mb-1", A ? "items-center" : "items-baseline"),
							children: [
								A && /* @__PURE__ */ Z(ve, {
									name: t.speakerLabel ?? Mn,
									src: t.speakerAvatarUrl ?? void 0,
									size: 20,
									showTitle: !1
								}),
								/* @__PURE__ */ Z("span", {
									className: e("text-xs font-semibold", !a && "text-text-secondary"),
									...a ? { style: { color: a } } : {},
									children: t.speakerLabel ?? Mn
								}),
								/* @__PURE__ */ Z("span", {
									className: "text-xs font-mono text-text-tertiary",
									children: kn(t.startMs)
								})
							]
						}), /* @__PURE__ */ Z("p", {
							className: "text-sm text-text-primary leading-relaxed",
							children: t.text
						})]
					}, t.id ?? `${t.startMs}-${t.speakerId ?? ""}-${n}`);
				})]
			}),
			u && x && /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: T,
				"data-testid": "transcript-jump-latest",
				className: "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-primary shadow-md hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: d
			})
		]
	});
}
//#endregion
//#region src/components/video/SummaryPanel.tsx
function Pn({ status: t, markdown: n, renderMarkdown: r, title: i = "Summary", errorMessage: a, errorDetail: o, pendingMessage: s, idleState: c, className: l }) {
	return t === "idle" ? /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: c ?? "No summary generated for this recording."
		})]
	}) : t === "pending" || t === "processing" ? /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
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
		"data-ui-part": "",
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
			/* @__PURE__ */ Z(oe, {
				text: o,
				className: "mt-2"
			})
		]
	}) : !n || n.trim().length === 0 ? /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("rounded-lg border border-border bg-surface p-4", l),
		children: [/* @__PURE__ */ Z("header", {
			className: "text-sm font-medium text-text-secondary mb-2",
			children: i
		}), /* @__PURE__ */ Z("div", {
			className: "text-sm text-text-tertiary",
			children: "No summary content was generated."
		})]
	}) : /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
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
function Fn({ getVideoElement: t, className: n, title: r }) {
	let [i, a] = Y(!1), [o, s] = Y(!1);
	K(() => {
		s(typeof document < "u" && document.pictureInPictureEnabled === !0);
	}, []), K(() => {
		let e = () => a(!1), t = () => a(!0);
		return document.addEventListener("leavepictureinpicture", e), document.addEventListener("enterpictureinpicture", t), () => {
			document.removeEventListener("leavepictureinpicture", e), document.removeEventListener("enterpictureinpicture", t);
		};
	}, []);
	let c = G(async () => {
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
		"data-ui-part": "",
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
function In(e) {
	return typeof e == "number" ? e : e ? 2 ** 53 - 1 - 1 : 2 ** 53 - 1;
}
function Ln(e) {
	return e.map((e, t) => ({
		p: e,
		i: t,
		rank: In(e.handRaised)
	})).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.p);
}
function Rn(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function zn({ participants: n, activeSpeakerId: r, onParticipantClick: i, count: a, title: o = "Participants", footer: s, tone: c = "light", raisedHandsFirst: l = !1, onLowerHand: u, onLowerAllHands: d, rowMenu: f, rowMenuLabel: p, accessBadge: m = "auto", extraEntries: h, countExtraEntries: g = !1, className: _ }) {
	let v = c === "dark", y = a ?? n.length + (g ? h?.length ?? 0 : 0), b = l ? Ln(n) : n, S = n.filter((e) => e.handRaised).length, C = J(null), w = (e) => {
		let t = Array.from(C.current?.querySelectorAll("[data-testid=\"roster-lower-hand\"]") ?? []), n = e ? t.indexOf(e) : -1;
		((n >= 0 ? t[n + 1] ?? t[n - 1] : void 0) ?? C.current)?.focus();
	};
	return /* @__PURE__ */ Q("aside", {
		className: e("flex flex-col w-64 shrink-0 focus:outline-none", v ? "bg-call-chrome border-l border-call-chrome-border" : "bg-[var(--color-surface)] border-l border-[var(--color-border)]", _),
		"aria-label": "Call participants",
		ref: C,
		tabIndex: -1,
		children: [
			/* @__PURE__ */ Q("header", {
				className: e("px-4 py-3 border-b flex items-center justify-between", v ? "border-white/10" : "border-[var(--color-border)]"),
				children: [/* @__PURE__ */ Z("h3", {
					className: e("text-sm font-semibold", v ? "text-white" : "text-[var(--color-text-primary)]"),
					children: o
				}), /* @__PURE__ */ Q("span", {
					className: "flex items-center gap-2",
					children: [d && S > 0 && /* @__PURE__ */ Z(t, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							w(null), d();
						},
						className: v ? "text-white/80 hover:text-white" : void 0,
						"data-testid": "roster-lower-all",
						children: "Lower all hands"
					}), /* @__PURE__ */ Z("span", {
						className: e("text-xs tabular-nums", v ? "text-white/50" : "text-[var(--color-text-secondary)]"),
						children: y
					})]
				})]
			}),
			/* @__PURE__ */ Q("ul", {
				className: "flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
				children: [b.map((n) => {
					let a = n.id === r, o = f?.(n)?.filter((e) => e.items.length > 0) ?? [];
					return /* @__PURE__ */ Q("li", {
						className: "flex items-center",
						"data-testid": "roster-row",
						"data-user-id": n.id,
						children: [
							/* @__PURE__ */ Z(Vn, {
								participant: n,
								speaking: a,
								dark: v,
								accessBadge: m,
								trailing: o.length > 0 || !!(u && n.handRaised),
								...i ? { onClick: () => i(n.id) } : {}
							}),
							u && n.handRaised && /* @__PURE__ */ Z(t, {
								variant: "ghost",
								size: "sm",
								onClick: (e) => {
									w(e.currentTarget), u(n.id);
								},
								"aria-label": `Lower ${n.displayName}'s hand`,
								className: e("mr-2 shrink-0", v && "text-white/80 hover:text-white"),
								"data-testid": "roster-lower-hand",
								children: "Lower"
							}),
							o.length > 0 && /* @__PURE__ */ Z(he, {
								trigger: /* @__PURE__ */ Z(I, { size: 18 }),
								triggerLabel: p ? p(n) : `Actions for ${n.displayName}`,
								triggerVariant: "link",
								triggerClassName: e("mr-2 h-7 w-7 shrink-0 justify-center px-0", v && "text-white/70 hover:bg-white/10 hover:text-white"),
								triggerTestId: "roster-row-menu",
								align: "end",
								sections: o,
								"data-testid": `roster-row-menu-panel-${n.id}`
							})
						]
					}, n.id);
				}), h?.map((t) => /* @__PURE__ */ Q("li", {
					className: "flex items-center gap-2.5 py-2 pl-4 pr-4",
					"data-testid": "roster-extra-entry",
					"data-entry-id": t.id,
					children: [/* @__PURE__ */ Z("span", {
						"aria-hidden": !0,
						className: e("flex h-8 w-8 shrink-0 items-center justify-center rounded-md border", v ? "border-white/20 bg-white/10 text-white/80" : "border-border bg-surface-inset text-text-secondary"),
						children: t.icon ?? /* @__PURE__ */ Z(x, { size: 16 })
					}), /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 flex-1 flex-col text-sm",
						children: [/* @__PURE__ */ Q("span", {
							className: "flex min-w-0 items-baseline gap-1.5",
							children: [/* @__PURE__ */ Z("span", {
								className: e("min-w-0 truncate", v ? "text-white/90" : "text-text-primary"),
								children: t.name
							}), t.label && /* @__PURE__ */ Z("span", {
								className: e("shrink-0 text-xs", v ? "text-white/50" : "text-text-secondary"),
								"data-testid": "roster-extra-label",
								children: t.label
							})]
						}), t.status && /* @__PURE__ */ Z("span", {
							className: e("truncate text-xs", v ? "text-white/50" : "text-text-tertiary"),
							"data-testid": "roster-extra-status",
							children: t.status
						})]
					})]
				}, t.id))]
			}),
			s && /* @__PURE__ */ Z("div", {
				className: "border-t border-[var(--color-border)] p-3",
				children: s
			})
		]
	});
}
function Bn(e) {
	return e.scrollWidth > e.clientWidth + 1;
}
function Vn({ participant: t, speaking: n, dark: r, accessBadge: i, trailing: a, onClick: o }) {
	let s = J(null), c = J(null), l = J(null), u = J(null), d = J(null), f = J(0), [p, m] = Y(!1), h = i === "auto" && t.access != null;
	qe(() => {
		if (!h) {
			m(!1);
			return;
		}
		let e = s.current, t = () => {
			let t = c.current, n = l.current, r = d.current;
			if (!e || !t || !n || !r || e.clientWidth === 0) return;
			if (!p) {
				f.current = r.offsetWidth, Bn(n) && m(!0);
				return;
			}
			let i = f.current - r.offsetWidth, a = n.scrollWidth + (u.current ? u.current.offsetWidth + 4 : 0);
			t.clientWidth - a >= i && m(!1);
		};
		if (t(), !e || typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [
		h,
		p,
		t.displayName,
		t.isLocal,
		t.access
	]);
	let g = i === "icon" || h && p;
	return /* @__PURE__ */ Q("button", {
		ref: s,
		"data-ui-part": "",
		type: "button",
		onClick: o,
		className: e("min-w-0 flex-1 flex items-center gap-2.5 overflow-hidden py-2 pl-4 text-left transition-colors", a ? "pr-1" : "pr-4", "hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", n && "bg-white/[0.04]", o ? "cursor-pointer" : "cursor-default"),
		disabled: !o,
		"data-access-badge": t.access ? g ? "icon" : "label" : void 0,
		children: [
			/* @__PURE__ */ Q("div", {
				className: e("relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0", "bg-[var(--color-primary)] text-white", n && "ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]"),
				children: [t.avatarUrl ? /* @__PURE__ */ Z("img", {
					src: t.avatarUrl,
					alt: "",
					className: "w-full h-full rounded-full object-cover"
				}) : /* @__PURE__ */ Z("span", { children: Rn(t.displayName) }), t.isScreenSharing && /* @__PURE__ */ Z("span", {
					title: "Sharing screen",
					className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
				})]
			}),
			/* @__PURE__ */ Q("span", {
				ref: c,
				className: e("flex min-w-0 flex-1 items-baseline gap-1 overflow-hidden text-sm", r ? "text-white/90" : "text-[var(--color-text-primary)]"),
				"data-testid": "roster-name",
				children: [/* @__PURE__ */ Z(W, {
					content: t.displayName,
					onlyWhenTruncated: !0,
					triggerClassName: "flex min-w-0",
					"data-testid": "roster-name-tooltip",
					children: /* @__PURE__ */ Z("span", {
						ref: l,
						className: "min-w-0 truncate",
						children: t.displayName
					})
				}), t.isLocal && /* @__PURE__ */ Z("span", {
					ref: u,
					className: e("shrink-0 text-xs", r ? "text-white/50" : "text-[var(--color-text-secondary)]"),
					"data-testid": "roster-you",
					children: "(you)"
				})]
			}),
			t.access && /* @__PURE__ */ Z("span", {
				ref: d,
				className: "inline-flex shrink-0",
				children: /* @__PURE__ */ Z(Ve, {
					access: t.access,
					tone: r ? "overlay" : "chip",
					iconOnly: g,
					"data-testid": "roster-access"
				})
			}),
			/* @__PURE__ */ Z(Be, {
				raised: t.handRaised,
				tone: r ? "overlay" : "chip",
				"data-testid": "roster-raised-hand"
			}),
			t.isMuted && /* @__PURE__ */ Z("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 16 16",
				className: e("shrink-0", r ? "text-white/50" : "text-[var(--color-text-secondary)]"),
				"aria-label": "Muted",
				children: /* @__PURE__ */ Z("path", {
					fill: "currentColor",
					d: "M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
				})
			})
		]
	});
}
//#endregion
//#region src/lib/video/useMuteWhileTalking.ts
var Hn = null;
function Un() {
	if (Hn) return Hn;
	try {
		return Hn = new AudioContext(), Hn;
	} catch {
		return null;
	}
}
function Wn({ localStream: e, isMuted: t, threshold: n = -45, triggerMs: r = 1500, cooldownMs: i = 6e3 }) {
	let [a, o] = Y(!1);
	return K(() => {
		if (!t || !e || e.getAudioTracks().filter((e) => e.readyState === "live").length === 0) return;
		let a = Un();
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
	]), K(() => {
		t || o(!1);
	}, [t]), a;
}
//#endregion
//#region src/components/video/VideoSurface.tsx
var Gn = {
	video: "aspect-video w-full",
	square: "aspect-square w-full",
	portrait: "aspect-[9/16] h-full",
	fill: "h-full w-full"
}, Kn = "pointer-events-none absolute z-10 flex max-w-[calc(100%-1rem)] flex-col gap-1.5 [&>*]:pointer-events-auto";
function qn(e) {
	return e != null && e !== !1 && e !== "";
}
function Jn(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Yn({ videoRef: t, stream: n, muted: r = !1, autoPlay: i = !0, playsInline: a = !0, controls: o = !1, poster: s, fit: c = "contain", mirrored: l = !1, aspect: u = "video", state: d = "ready", placeholder: f = "No video", loadingLabel: p = "Loading…", error: m = "Video unavailable", topLeft: h, topRight: g, bottomLeft: _, bottomRight: v, center: y, label: b, onPlayStateChange: x, className: S, "data-testid": C = "video-surface" }) {
	let w = J(null), T = J(t);
	T.current = t;
	let E = J(x);
	E.current = x;
	let D = G((e) => {
		w.current = e, Jn(T.current, e);
	}, []);
	K(() => {
		!t || !w.current || Jn(t, w.current);
	}, [t]), K(() => {
		let e = w.current;
		if (!e || !n) return;
		let t = Me(e, n, { onPlayState: (e) => E.current?.(e) });
		return () => {
			t(), e.srcObject === n && (e.srcObject = null);
		};
	}, [n]);
	let O = o ? "bottom-12" : "bottom-2";
	return /* @__PURE__ */ Q("div", {
		"data-testid": C,
		"data-video-surface": "",
		"data-state": d,
		"data-fit": c,
		"data-aspect": u,
		...l ? { "data-mirrored": "" } : {},
		className: e("relative overflow-hidden rounded-lg bg-video-stage", Gn[u], S),
		children: [
			/* @__PURE__ */ Z("video", {
				ref: D,
				"aria-label": b,
				autoPlay: i,
				playsInline: a,
				muted: r,
				controls: o,
				poster: s,
				className: e("block h-full w-full", c === "cover" ? "object-cover" : "object-contain", l && "-scale-x-100")
			}),
			d === "loading" && /* @__PURE__ */ Z("div", {
				role: "status",
				"data-video-surface-state": "loading",
				className: e("pointer-events-none absolute inset-0 flex justify-center bg-black/40 text-xs font-medium text-white", o ? "items-start pt-3" : "items-center"),
				children: /* @__PURE__ */ Q("span", {
					className: e("flex items-center gap-2", o ? "flex-row rounded-full bg-black/65 px-3 py-1.5" : "flex-col"),
					children: [/* @__PURE__ */ Z(ue, {
						size: o ? "sm" : "md",
						color: "currentColor",
						decorative: !0
					}), /* @__PURE__ */ Z("span", { children: p })]
				})
			}),
			d === "empty" && /* @__PURE__ */ Z("div", {
				"data-video-surface-state": "empty",
				className: "absolute inset-0 flex items-center justify-center bg-video-stage px-4 text-center text-sm text-white/60",
				children: f
			}),
			d === "error" && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-video-surface-state": "error",
				className: "absolute inset-0 flex items-center justify-center bg-video-stage px-4 text-center text-sm font-medium text-white",
				children: /* @__PURE__ */ Z("span", {
					className: "max-w-full rounded-md bg-danger/90 px-3 py-1.5",
					children: m
				})
			}),
			qn(y) && /* @__PURE__ */ Z("div", {
				"data-video-surface-slot": "center",
				className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center [&>*]:pointer-events-auto",
				children: y
			}),
			qn(h) && /* @__PURE__ */ Z("div", {
				"data-video-surface-slot": "top-left",
				className: e(Kn, "left-2 top-2 items-start"),
				children: h
			}),
			qn(g) && /* @__PURE__ */ Z("div", {
				"data-video-surface-slot": "top-right",
				className: e(Kn, "right-2 top-2 items-end"),
				children: g
			}),
			qn(_) && /* @__PURE__ */ Z("div", {
				"data-video-surface-slot": "bottom-left",
				className: e(Kn, O, "left-2 items-start"),
				children: _
			}),
			qn(v) && /* @__PURE__ */ Z("div", {
				"data-video-surface-slot": "bottom-right",
				className: e(Kn, O, "right-2 items-end"),
				children: v
			})
		]
	});
}
//#endregion
//#region src/components/video/VideoOverlayChip.tsx
var Xn = {
	neutral: "bg-black/65 text-white",
	success: "bg-success/85 text-white",
	warning: "bg-warning/90 text-white",
	danger: "bg-danger/90 text-white",
	info: "bg-info/85 text-white"
}, Zn = "inline-flex max-w-full flex-col items-start rounded-md px-2 py-1 text-xs leading-4 backdrop-blur-sm";
function Qn({ children: t, tone: n = "neutral", mono: r = !1, details: i, expanded: a, defaultExpanded: o = !1, onExpandedChange: s, live: c = !1, title: l, className: u, "data-testid": d = "video-overlay-chip" }) {
	let f = Ge(), [p, m] = Y(o), h = a ?? p, g = c ? {
		role: "status",
		"aria-live": "polite"
	} : {}, _ = e(Zn, Xn[n], r && "font-mono tabular-nums", u);
	if (i == null) return /* @__PURE__ */ Z("span", {
		"data-testid": d,
		"data-tone": n,
		title: l,
		className: _,
		...g,
		children: /* @__PURE__ */ Z("span", {
			className: "min-w-0 break-words",
			children: t
		})
	});
	let v = () => {
		let e = !h;
		a === void 0 && m(e), s?.(e);
	};
	return /* @__PURE__ */ Q("div", {
		"data-testid": d,
		"data-tone": n,
		"data-expanded": h ? "true" : "false",
		className: e(_, h && "px-3 py-2"),
		...g,
		children: [/* @__PURE__ */ Z("button", {
			type: "button",
			"aria-expanded": h,
			"aria-controls": f,
			title: l,
			onClick: v,
			className: "max-w-full cursor-pointer break-words text-left font-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
			children: t
		}), /* @__PURE__ */ Z("div", {
			id: f,
			hidden: !h,
			className: "mt-1 text-[11px] leading-4 text-white/75",
			children: i
		})]
	});
}
//#endregion
//#region src/components/video/AutoplayGate.tsx
var $n = "pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
function er() {
	typeof document > "u" || document.querySelectorAll("video").forEach((e) => {
		if (e.paused) {
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
	});
}
function tr({ chipLabel: t = "Tap to unmute", chipClassName: n, wrapperClassName: r, onPlayStateChange: i, ...a }) {
	let [o, s] = Y(!1), c = J(null), l = a.videoRef ?? c, u = G((e) => {
		e === "paused-by-autoplay" ? s(!0) : e === "playing" && s(!1), i?.(e);
	}, [i]), d = G(() => {
		let e = l.current;
		if (e) {
			e.muted = !1;
			let t = e.play();
			t && typeof t.catch == "function" && t.catch(() => {});
		}
		er(), s(!1);
	}, [l]);
	return /* @__PURE__ */ Q("div", {
		className: e("relative h-full w-full", r),
		children: [/* @__PURE__ */ Z(He, {
			...a,
			videoRef: l,
			onPlayStateChange: u
		}), o && /* @__PURE__ */ Z("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ Z("button", {
				"data-ui-part": "",
				type: "button",
				onClick: d,
				className: e($n, n),
				"data-testid": "autoplay-gate-chip",
				children: t
			})
		})]
	});
}
//#endregion
//#region src/components/video/useCallWidgetPersistence.ts
var nr = 1;
function rr({ persistKey: e, defaults: t, debounceMs: n = 200 }) {
	let [r, i] = Y(() => {
		if (!e || typeof window > "u") return t;
		try {
			let n = window.localStorage.getItem(e);
			if (!n) return t;
			let r = JSON.parse(n);
			return !r || r.v !== nr ? t : {
				mode: r.mode === "docked" || r.mode === "window" ? "window" : "mini",
				x: ir(r.x, t.x),
				y: ir(r.y, t.y),
				width: ir(r.width, t.width),
				height: ir(r.height, t.height)
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
	}), l = G((e, t) => {
		try {
			let n = {
				v: nr,
				...t,
				mode: t.mode === "window" ? "docked" : t.mode
			};
			window.localStorage.setItem(e, JSON.stringify(n)), c.current = {
				key: e,
				value: t
			};
		} catch {}
	}, []);
	return K(() => {
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
	]), K(() => {
		if (!(!e || typeof window > "u")) return () => {
			o.current && (o.current = !1, l(e, s.current));
		};
	}, [e, l]), {
		state: r,
		setState: G((e) => {
			i((t) => ({
				...t,
				...e
			}));
		}, [])
	};
}
function ir(e, t) {
	return typeof e == "number" && Number.isFinite(e) ? e : t;
}
//#endregion
//#region src/components/video/ExpandableCallWidget.tsx
var ar = 320, or = 200, sr = 640, cr = 400, lr = 1440, ur = 900, dr = 960, fr = 600, $ = 8;
function pr({ title: t, subtitle: n, durationSeconds: r, children: i, controls: a, defaultMode: o = "mini", inline: s = !1, onModeChange: c, persistKey: l, apiRef: u, defaultCorner: d = "bottom-right", expandable: f = !0, sidePanelTabs: p, activeSidePanelTab: m = null, onSidePanelTabChange: h, zIndex: g = 9999, className: _, "data-testid": v = "expandable-call-widget" }) {
	let y = o === "docked" ? "window" : o, b = q(() => y === "window" ? vr(dr, fr) : yr(d), [y, d]), { state: x, setState: S } = rr({
		persistKey: l,
		defaults: {
			mode: y,
			x: b.x,
			y: b.y,
			width: dr,
			height: fr
		}
	}), [C, w] = Y(!1), T = C ? "fullscreen" : x.mode, E = J(null), D = p ?? [], O = D.length > 0, k = O && D.some((e) => e.id === m), A = J(!1);
	K(() => {
		let e = () => {
			(document.fullscreenElement ?? document.webkitFullscreenElement) !== E.current && C && (w(!1), A.current || S({ mode: "window" }), A.current = !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [C, S]);
	let j = G(() => {
		let e = E.current;
		if (!e) return;
		let t = e.requestFullscreen?.bind(e) ?? e.webkitRequestFullscreen?.bind(e);
		if (!t) return;
		let n = t();
		n && typeof n.then == "function" ? n.then(() => w(!0), () => {}) : w(!0);
	}, []), M = G(() => {
		(document.fullscreenElement ?? document.webkitFullscreenElement) && (A.current = !0, (document.exitFullscreen?.bind(document) ?? document.webkitExitFullscreen?.bind(document))?.().catch(() => {}));
	}, []), N = G((e) => {
		let t = Ut(e);
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
				let e = vr(x.width, x.height);
				S({
					mode: t,
					x: e.x,
					y: e.y
				});
				return;
			}
			if (t === "mini" && T === "window") {
				let e = yr(d);
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
	K(() => {
		c?.(T);
	}, [T, c]), Ke(u, () => ({
		mode: T,
		setMode: N
	}), [T, N]);
	let P = J(null), F = G((e) => {
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
	]), I = G((e) => {
		let t = P.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = xr(t.origX + n, x.width, window.innerWidth), a = xr(t.origY + r, x.height, window.innerHeight);
		S({
			x: i,
			y: a
		});
	}, [
		S,
		x.width,
		x.height
	]), L = G((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), P.current = null;
	}, []), R = J(null), ee = G((e) => {
		T === "window" && (e.stopPropagation(), e.currentTarget.setPointerCapture(e.pointerId), R.current = {
			startX: e.clientX,
			startY: e.clientY,
			origW: x.width,
			origH: x.height
		});
	}, [
		T,
		x.width,
		x.height
	]), z = G((e) => {
		let t = R.current;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY, i = br(t.origW + n, sr, Math.min(lr, window.innerWidth - 16)), a = br(t.origH + r, cr, Math.min(ur, window.innerHeight - 16));
		S({
			width: i,
			height: a
		});
	}, [S]), B = G((e) => {
		e.currentTarget.releasePointerCapture(e.pointerId), R.current = null;
	}, []);
	qe(() => {
		if (T !== "window") return;
		let e = () => {
			let e = xr(x.x, x.width, window.innerWidth), t = xr(x.y, x.height, window.innerHeight);
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
	let V = q(() => s ? {
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
		width: ar,
		height: or,
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
		"data-call-widget-mode-legacy": Wt(T),
		"data-call-side-panel-open": k ? "true" : "false",
		style: V,
		className: e("flex flex-col bg-call-chrome text-white shadow-2xl overflow-hidden border border-call-chrome-border", T === "fullscreen" ? "rounded-none" : "rounded-lg", _),
		children: [
			/* @__PURE__ */ Q("div", {
				className: e("flex items-center justify-between gap-2 px-3 h-8 min-h-8 border-b border-white/5 select-none", T === "window" ? "cursor-grab active:cursor-grabbing" : ""),
				onPointerDown: F,
				onPointerMove: I,
				onPointerUp: L,
				onPointerCancel: L,
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
							children: Qt(r)
						})
					]
				}), f && /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ Z(mr, {
							active: T === "mini",
							label: "Mini",
							onClick: () => N("mini"),
							testId: "call-widget-mode-mini",
							children: /* @__PURE__ */ Z(hr, {})
						}),
						/* @__PURE__ */ Z(mr, {
							active: T === "window",
							label: "Window",
							onClick: () => N("window"),
							testId: "call-widget-mode-window",
							children: /* @__PURE__ */ Z(gr, {})
						}),
						/* @__PURE__ */ Z(mr, {
							active: T === "fullscreen",
							label: "Fullscreen",
							onClick: () => N(T === "fullscreen" ? "window" : "fullscreen"),
							testId: "call-widget-mode-fullscreen",
							children: /* @__PURE__ */ Z(_r, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: e("relative flex-1 min-h-0 bg-black", k && "flex items-stretch"),
				children: [k ? /* @__PURE__ */ Z("div", {
					className: "relative min-w-0 flex-1",
					children: i
				}) : i, k && /* @__PURE__ */ Z(Ht, {
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
					}), /* @__PURE__ */ Z(Rt, {
						tabs: D,
						activeTab: m,
						onTabChange: h
					})]
				}) : a
			}),
			T === "window" && /* @__PURE__ */ Z("div", {
				className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
				onPointerDown: ee,
				onPointerMove: z,
				onPointerUp: B,
				onPointerCancel: B,
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
function mr({ active: t, label: n, onClick: r, testId: i, children: a }) {
	return /* @__PURE__ */ Z("button", {
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
function hr() {
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
function gr() {
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
function _r() {
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
function vr(e, t) {
	return typeof window > "u" ? {
		x: 16,
		y: 16
	} : {
		x: Math.max($, Math.floor((window.innerWidth - e) / 2)),
		y: Math.max($, Math.floor((window.innerHeight - t) / 2))
	};
}
function yr(e) {
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
			x: t - ar - $,
			y: $
		};
		case "bottom-left": return {
			x: $,
			y: n - or - $
		};
		default: return {
			x: t - ar - $,
			y: n - or - $
		};
	}
}
function br(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function xr(e, t, n) {
	return br(e, $, Math.max($, n - t - $));
}
//#endregion
//#region src/components/video/CallingStatusPill.tsx
function Sr({ show: e, label: t }) {
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
function Cr({ show: e, label: t = "You're muted — tap mic to unmute" }) {
	return e ? /* @__PURE__ */ Z("div", {
		"data-testid": "mute-while-talking-toast",
		className: "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg",
		role: "alert",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/TranscriptOverlay.tsx
var wr = [
	"#60a5fa",
	"#f472b6",
	"#34d399",
	"#fbbf24",
	"#a78bfa",
	"#fb7185"
], Tr = 3e3, Er = .35;
function Dr(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) | 0;
	return wr[Math.abs(t) % wr.length];
}
function Or({ lines: t, maxLines: n = 4, fadeAfterMs: r = Tr, now: i, className: a }) {
	let [, o] = Y(0), s = i === void 0, c = t.length > 0;
	K(() => {
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
		let t = u.get(e.id), n = l - t.lastUpdateMs, i = Math.max(Er, 1 - n / r);
		return {
			...e,
			text: t.displayedText,
			sinceUpdate: n,
			opacity: i
		};
	}).filter((e) => e.sinceUpdate <= Tr);
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
				style: { color: Dr(t.speakerId) },
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
var kr = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, Ar = "bg-surface-emphasis text-text-primary hover:bg-surface-emphasis", jr = "bg-surface-hover text-neutral hover:bg-surface-emphasis", Mr = "bg-danger-bg text-danger-fg hover:bg-danger-bg", Nr = "bg-surface-emphasis/50 text-text-primary", Pr = "bg-surface-hover/60 text-neutral", Fr = "bg-danger-bg/60 text-danger-fg";
function Ir({ on: t, iconOn: n, iconOff: r, "aria-label": i, offTone: a = "danger", size: o = "md", disabled: s, disabledReason: c, className: l, title: u, onClick: d, "aria-describedby": f, ...p }) {
	let m = Re(c, s, f), h = m.reason, g = h === void 0 ? t ? Ar : a === "danger" ? Mr : jr : t ? Nr : a === "danger" ? Fr : Pr;
	return /* @__PURE__ */ Z(Fe, {
		reason: h,
		children: /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
			type: "button",
			"aria-label": i,
			"aria-pressed": t,
			...m.buttonProps,
			title: h === void 0 ? u : void 0,
			onClick: m.guard(d),
			className: e("rounded-full grid place-items-center transition-colors duration-150", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", kr[o], g, h !== void 0 && "cursor-not-allowed *:opacity-45", h === void 0 && m.off && "opacity-40 cursor-not-allowed", !m.off && "cursor-pointer", l),
			...p,
			children: [t ? n : r, m.description]
		})
	});
}
//#endregion
//#region src/components/video/HangoutPreJoinShell.tsx
function Lr(e, t, n) {
	if (n) return "Checking room…";
	if (!t || t === "empty") return "You'll be the first one in this room";
	let r = e?.length ?? 0;
	return t === "ready" ? r === 1 ? "1 person is in this call" : `${r} people are in this call` : r === 1 ? "1 person is joining (connecting…)" : `${r} people are joining (connecting…)`;
}
function Rr(e) {
	return e === "denied" ? "denied" : e === "blocked" ? "blocked" : e === "no-device" ? "no-device" : e === "unavailable" ? "unavailable" : null;
}
var zr = "bg-white/15 text-white hover:bg-white/25", Br = "bg-white text-video-stage hover:bg-white";
function Vr({ channelName: n, eyebrow: r, localIdentity: i, previewStream: a, permission: o, permissionMessage: s, audioEnabled: c, videoEnabled: l, onToggleAudio: u, onToggleVideo: d, onRetryPermission: f, participants: p, readyState: m, readyLoading: h = !1, effectsSlot: g, devicesSlot: _, devicesOpen: v, onToggleDevices: y, secondaryActions: b, onJoin: x, onCancel: S, joinLabel: C, joinDisabled: E, subtitleOverride: D, className: O, "data-testid": j }) {
	let M = J(null), [N, P] = Y(!1);
	K(() => {
		M.current && a && (M.current.srcObject = a);
	}, [a]);
	let F = o === "granted", I = Rr(o), L = E ?? !F, R = C ?? (L && !F ? "Allow camera to join" : "Join now"), z = D ?? Lr(p, m, h), B = !!_, V = B && (v ?? N);
	function te(e) {
		v === void 0 && P(e), y?.(e);
	}
	return /* @__PURE__ */ Z("div", {
		"data-testid": j,
		className: e("flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary", O),
		children: /* @__PURE__ */ Z("div", {
			className: "mx-auto w-full max-w-5xl flex flex-col gap-4 px-4 py-4 sm:px-5",
			children: /* @__PURE__ */ Q("div", {
				className: "flex flex-col lg:flex-row lg:items-start gap-4",
				children: [/* @__PURE__ */ Q("section", {
					"data-ui-part": "",
					className: "w-full min-w-0 lg:flex-1 flex flex-col gap-4",
					children: [/* @__PURE__ */ Q("div", {
						className: "relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage",
						children: [
							a && F && /* @__PURE__ */ Z("video", {
								ref: M,
								autoPlay: !0,
								playsInline: !0,
								muted: !0,
								className: e("w-full h-full object-cover scale-x-[-1]", !l && "opacity-0")
							}),
							F && !l && (i ? /* @__PURE__ */ Z("div", {
								"data-testid": "prejoin-identity-tile",
								className: "absolute inset-0 grid place-items-center bg-video-stage/95",
								children: /* @__PURE__ */ Q("div", {
									className: "flex flex-col items-center gap-3 px-6 text-center",
									children: [/* @__PURE__ */ Z(ve, {
										name: i.displayName,
										src: i.avatarSrc,
										size: 96
									}), /* @__PURE__ */ Q("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ Z("span", {
											className: "text-white text-base font-medium truncate max-w-[16rem]",
											children: i.displayName
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
								children: /* @__PURE__ */ Z(ue, { size: "lg" })
							}),
							I && /* @__PURE__ */ Z("div", {
								className: "absolute inset-0 grid place-items-center bg-surface-panel/95",
								children: /* @__PURE__ */ Z(se, {
									kind: "camera",
									state: I,
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
										/* @__PURE__ */ Z(Ir, {
											on: c,
											onClick: u,
											disabled: !F,
											"aria-label": c ? "Mute mic before joining" : "Unmute mic before joining",
											title: c ? "Mute mic before joining" : "Unmute mic before joining",
											iconOn: /* @__PURE__ */ Z(A, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(w, { size: 18 }),
											className: e(c && zr),
											"data-testid": "prejoin-toggle-audio"
										}),
										/* @__PURE__ */ Z(Ir, {
											on: l,
											onClick: d,
											disabled: !F,
											"aria-label": l ? "Turn camera off before joining" : "Turn camera on before joining",
											title: l ? "Turn camera off before joining" : "Turn camera on before joining",
											iconOn: /* @__PURE__ */ Z(T, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(ee, { size: 18 }),
											className: e(l && zr),
											"data-testid": "prejoin-toggle-video"
										}),
										B && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
											"aria-hidden": "true",
											className: "h-px w-6 bg-white/20"
										}), /* @__PURE__ */ Z(Ir, {
											on: V,
											onClick: () => te(!V),
											"aria-label": V ? "Close device settings" : "Open device settings",
											title: V ? "Close device settings" : "Open device settings",
											iconOn: /* @__PURE__ */ Z(k, { size: 18 }),
											iconOff: /* @__PURE__ */ Z(k, { size: 18 }),
											className: V ? Br : zr,
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
					"data-ui-part": "",
					className: "w-full lg:w-72 xl:w-80 lg:shrink-0 lg:self-stretch flex flex-col gap-3 lg:justify-between",
					children: [/* @__PURE__ */ Q("div", {
						className: "flex flex-col gap-3 min-h-0",
						children: [/* @__PURE__ */ Q("div", {
							className: "min-w-0",
							children: [
								r && /* @__PURE__ */ Z("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral",
									children: r
								}),
								/* @__PURE__ */ Z("h1", {
									"data-testid": "prejoin-title",
									className: "text-lg font-semibold leading-tight truncate",
									children: n
								}),
								/* @__PURE__ */ Z("p", {
									"data-testid": "prejoin-subtitle",
									className: "mt-0.5 text-xs text-neutral",
									children: z
								})
							]
						}), V ? /* @__PURE__ */ Q("div", {
							"data-testid": "prejoin-devices-panel",
							className: "rounded-xl border border-border bg-surface p-3",
							children: [/* @__PURE__ */ Q("div", {
								className: "flex items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ Z("h2", {
									className: "text-sm font-semibold",
									children: "Device settings"
								}), /* @__PURE__ */ Z(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => te(!1),
									"data-testid": "prejoin-devices-close",
									children: "Close"
								})]
							}), _]
						}) : /* @__PURE__ */ Q("div", {
							className: e(h || p && p.length > 0 ? "rounded-xl border border-border bg-surface p-3" : "px-0.5"),
							children: [/* @__PURE__ */ Z(Hr, {
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
							/* @__PURE__ */ Z(t, {
								variant: "primary",
								size: "lg",
								fullWidth: !0,
								onClick: () => x({
									audio: c,
									video: l
								}),
								disabled: L,
								"data-testid": "prejoin-join-button",
								children: R
							}),
							b && /* @__PURE__ */ Z("div", {
								"data-testid": "prejoin-secondary-actions",
								children: b
							}),
							/* @__PURE__ */ Z("button", {
								"data-ui-part": "",
								type: "button",
								onClick: S,
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
function Hr({ participants: e, loading: t }) {
	return t ? /* @__PURE__ */ Q("div", {
		className: "flex items-center gap-2 text-xs text-neutral",
		children: [/* @__PURE__ */ Z(ue, { size: "sm" }), " Finding people…"]
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
						/* @__PURE__ */ Z(ve, {
							name: t,
							size: 24
						}),
						/* @__PURE__ */ Z("span", {
							className: "font-mono text-xs truncate",
							children: t
						}),
						/* @__PURE__ */ Z(n, {
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
var Ur = {
	active: "Recording — saved to /recordings when the call ends",
	armed: "Recording armed — will start once the call is under way"
};
function Wr({ armed: e, active: t, titles: r, className: i, "data-testid": a = "recording-chip" }) {
	return !e && !t ? null : /* @__PURE__ */ Z(n, {
		tone: t ? "danger" : "neutral",
		size: "xs",
		uppercase: !0,
		dot: t ? "pulse" : "static",
		title: t ? r?.active ?? Ur.active : r?.armed ?? Ur.armed,
		className: i,
		"data-testid": a,
		"aria-label": t ? "Recording" : "Recording armed",
		children: "Rec"
	});
}
//#endregion
//#region src/components/video/HangoutRoomHeader.tsx
var Gr = {
	idle: "neutral",
	joining: "warning",
	joined: "success",
	reconnecting: "warning",
	ended: "neutral",
	failed: "danger"
}, Kr = {
	idle: "Idle",
	joining: "Joining…",
	joined: "Live",
	reconnecting: "Reconnecting…",
	ended: "Ended",
	failed: "Failed"
};
function qr() {
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
function Jr({ channelName: t, subtitle: r, recording: i, elapsedLabel: a, phase: o, actions: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ Q("header", {
		"data-testid": l,
		className: e("flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface", c),
		children: [/* @__PURE__ */ Q("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ Z("h1", {
				className: "text-lg font-semibold truncate text-text-primary",
				children: t
			}), (r || i?.armed || a) && /* @__PURE__ */ Q("div", {
				className: "text-xs text-neutral mt-0.5 flex items-center gap-2 flex-wrap",
				children: [
					r && /* @__PURE__ */ Z("span", { children: r }),
					i?.armed && /* @__PURE__ */ Z(Wr, {
						armed: i.armed,
						active: i.active,
						titles: { armed: "Recording armed — will start when someone joins" },
						"data-testid": "hangout-room-header-recording"
					}),
					a && /* @__PURE__ */ Z(n, {
						tone: "neutral",
						size: "xs",
						icon: /* @__PURE__ */ Z(qr, {}),
						title: "Time since you joined this room",
						"data-testid": "hangout-room-header-elapsed",
						children: /* @__PURE__ */ Z("span", {
							className: "tabular-nums",
							children: a
						})
					})
				]
			})]
		}), (o || s) && /* @__PURE__ */ Q("div", {
			className: "flex items-center gap-3 shrink-0",
			children: [o && /* @__PURE__ */ Z(n, {
				tone: Gr[o],
				size: "sm",
				dot: o === "reconnecting" ? "pulse" : "static",
				"data-testid": "hangout-room-header-phase",
				children: Kr[o]
			}), s]
		})]
	});
}
//#endregion
//#region src/components/video/HuddleBar.tsx
var Yr = {
	idle: "offline",
	joinable: "online",
	live: "online",
	connecting: "away",
	ringing: "away",
	reconnecting: "away",
	ended: "offline"
}, Xr = (e) => e.charAt(0).toUpperCase() + e.slice(1), Zr = {
	idle: "No call",
	joinable: "Huddle live",
	live: "Live",
	connecting: "Connecting",
	ringing: "Ringing",
	reconnecting: "Reconnecting",
	ended: "Ended"
}, Qr = {
	idle: null,
	joinable: null,
	live: null,
	connecting: "Connecting…",
	ringing: "Ringing…",
	reconnecting: "Reconnecting…",
	ended: "Ended"
};
function $r(e, t) {
	let [n, r] = Y(() => Date.now());
	return K(() => {
		if (!t || e == null) return;
		r(Date.now());
		let n = setInterval(() => r(Date.now()), 1e3);
		return () => clearInterval(n);
	}, [t, e]), t && e != null ? Math.max(0, n - e) : null;
}
function ei(e, t) {
	let n = `${e} joined`;
	return t > 0 ? `${n} · ${t} ringing` : n;
}
function ti({ name: n, showContext: r = !0, phase: i = "live", statusLabel: o, startedAt: s, participantCount: c, ringingCount: l = 0, mic: f, camera: p, shareSlot: m, onToggleChat: h, chatOpen: _ = !1, chatUnread: v = 0, onToggleMedia: y, mediaOpen: b = !1, mediaToggleLabel: x = "Participants", onStart: C, startLabel: w = "Huddle", callNoun: T, startDisabledReason: E, liveParticipants: D = [], onJoin: O, joinLabel: k = "Join", joinDisabledReason: A, chatLabel: j = "Chat", chatDisabledReason: M, onLeave: N, leaveLabel: P = "Leave", meetingItems: F, extras: I, compact: L = !1, className: ee, "data-testid": z = "huddle-bar" }) {
	let B = Pe(T), V = $r(s, i === "live"), te = o === void 0 ? Qr[i] : o, H = i === "joinable", ne = i === "idle" || H, U = c ?? D.length, re = (e, t) => /* @__PURE__ */ Z(Ne, {
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
		"data-testid": `${z}-${e === "microphone" ? "mic" : "camera"}`
	});
	return /* @__PURE__ */ Q("div", {
		role: "group",
		"aria-label": i === "idle" ? n : `${n} ${B}`,
		"data-testid": z,
		"data-phase": i,
		"data-compact": L ? "" : void 0,
		className: e("@container flex min-w-0 items-center", L ? "gap-1.5 px-1 py-1" : "gap-3 px-3 py-1.5", ee),
		children: [r && /* @__PURE__ */ Q("div", {
			className: "flex min-w-0 items-center gap-2",
			"data-testid": `${z}-status`,
			children: [
				/* @__PURE__ */ Z(Te, {
					state: Yr[i],
					ariaLabel: i === "joinable" ? `${Xr(B)} live` : Zr[i],
					"data-testid": `${z}-dot`
				}),
				/* @__PURE__ */ Z(a, {
					className: "min-w-0 truncate",
					size: "xs",
					weight: i === "idle" ? "normal" : "medium",
					tone: i === "idle" ? "secondary" : "primary",
					title: n,
					"data-testid": `${z}-name`,
					children: n
				}),
				H && /* @__PURE__ */ Q(a, {
					className: "shrink-0",
					size: "xs",
					tone: "secondary",
					"data-testid": `${z}-live`,
					children: [
						B,
						" live · ",
						U,
						" joined"
					]
				}),
				H && D.length > 0 && /* @__PURE__ */ Z(a, {
					className: "hidden shrink-0 @sm:inline-flex",
					"data-testid": `${z}-avatars`,
					children: /* @__PURE__ */ Z(ke, {
						users: D.map((e) => ({
							id: e.id,
							name: e.displayName,
							...e.avatarUrl ? { avatarUrl: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 20
					})
				}),
				te != null && /* @__PURE__ */ Z(a, {
					className: "shrink-0",
					size: "xs",
					tone: "secondary",
					"data-testid": `${z}-phase`,
					children: te
				}),
				V !== null && /* @__PURE__ */ Z(a, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "tertiary",
					tabular: !0,
					"data-testid": `${z}-timer`,
					children: Le(V)
				}),
				c !== void 0 && !H && /* @__PURE__ */ Z(a, {
					className: "hidden shrink-0 @md:inline",
					size: "xs",
					tone: "secondary",
					"data-testid": `${z}-people`,
					children: ei(c, l)
				})
			]
		}), /* @__PURE__ */ Q("div", {
			className: e("ml-auto flex shrink-0 items-center", L ? "gap-1" : "gap-2"),
			children: [
				!H && f && re("microphone", f),
				!H && p && re("camera", p),
				!H && m != null && /* @__PURE__ */ Z(a, {
					className: "items-center",
					"data-testid": `${z}-share`,
					children: m
				}),
				!H && y && /* @__PURE__ */ Q(t, {
					variant: b ? "secondary" : "ghost",
					size: "sm",
					onClick: y,
					"aria-pressed": b,
					"aria-expanded": b,
					"aria-label": x,
					title: x,
					"data-testid": `${z}-media`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Z(d, { size: 16 }), c !== void 0 && /* @__PURE__ */ Z(a, {
						tabular: !0,
						children: c
					})]
				}),
				i === "idle" && C && (L ? /* @__PURE__ */ Z(W, {
					content: E ?? w,
					children: /* @__PURE__ */ Z(u, {
						variant: "outline",
						size: "sm",
						onClick: C,
						disabled: E !== void 0,
						"aria-label": w,
						icon: /* @__PURE__ */ Z(S, { size: 16 }),
						"data-testid": `${z}-start`
					})
				}) : /* @__PURE__ */ Q(t, {
					variant: "secondary",
					size: "sm",
					onClick: C,
					disabled: E !== void 0,
					title: E,
					"data-testid": `${z}-start`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Z(S, { size: 16 }), w]
				})),
				H && O && (L ? /* @__PURE__ */ Z(W, {
					content: A ?? `${k} ${n} ${B}`,
					children: /* @__PURE__ */ Z(u, {
						variant: "primary",
						size: "sm",
						onClick: O,
						disabled: A !== void 0,
						"aria-label": `${k} ${n} ${B}`,
						icon: /* @__PURE__ */ Z(S, { size: 16 }),
						"data-testid": `${z}-join`
					})
				}) : /* @__PURE__ */ Q(t, {
					variant: "primary",
					size: "sm",
					onClick: O,
					disabled: A !== void 0,
					title: A,
					"aria-label": `${k} ${n} ${B}`,
					"data-testid": `${z}-join`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Z(S, { size: 16 }), k]
				})),
				h && /* @__PURE__ */ Q(a, {
					className: "relative inline-flex",
					children: [/* @__PURE__ */ Q(t, {
						variant: _ ? "secondary" : "ghost",
						size: "sm",
						onClick: h,
						"aria-pressed": _,
						"aria-label": j,
						disabled: M !== void 0,
						title: M,
						"data-testid": `${z}-chat`,
						className: "gap-1.5",
						children: [/* @__PURE__ */ Z(g, { size: 16 }), /* @__PURE__ */ Z(a, {
							className: "hidden @lg:inline",
							children: j
						})]
					}), v > 0 && /* @__PURE__ */ Z(a, {
						className: "absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-[10px] leading-none text-white",
						weight: "semibold",
						"data-testid": `${z}-chat-unread`,
						children: v > 99 ? "99+" : v
					})]
				}),
				!ne && F?.map((e) => /* @__PURE__ */ Z(ni, {
					item: e,
					testId: `${z}-meeting-${e.id}`
				}, e.id)),
				I,
				!ne && N && /* @__PURE__ */ Q(t, {
					variant: "danger-solid",
					size: "sm",
					onClick: N,
					"aria-label": P,
					"data-testid": `${z}-leave`,
					className: "gap-1.5",
					children: [/* @__PURE__ */ Z(R, { size: 16 }), /* @__PURE__ */ Z(a, {
						className: "hidden @lg:inline",
						children: P
					})]
				})
			]
		})]
	});
}
function ni({ item: e, testId: n }) {
	let r = J(null), [i, o] = Y(!1), s = !!e.popover, c = s && i && !e.disabled, l = e.pressed || e.active || c, u = e.count === void 0 ? e.label : `${e.label}, ${e.count}`;
	return /* @__PURE__ */ Q(a, {
		className: "relative inline-flex",
		children: [
			/* @__PURE__ */ Q(t, {
				ref: r,
				variant: l ? "secondary" : "ghost",
				size: "sm",
				onClick: s ? () => o((e) => !e) : e.onClick,
				disabled: e.disabled,
				title: e.disabled && e.disabledReason ? e.disabledReason : e.title ?? e.label,
				"aria-label": u,
				"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
				"aria-expanded": s ? c : e.active === void 0 ? void 0 : e.active,
				"aria-haspopup": s ? "dialog" : void 0,
				"data-testid": n,
				className: "gap-1.5 [&_svg]:size-4",
				children: [
					e.icon,
					e.count !== void 0 && /* @__PURE__ */ Z(a, {
						tabular: !0,
						children: e.count
					}),
					/* @__PURE__ */ Z(a, {
						className: "hidden @lg:inline",
						children: e.label
					})
				]
			}),
			!!e.badge && /* @__PURE__ */ Z(a, {
				className: "absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-text-inverse",
				size: "xs",
				weight: "semibold",
				"data-testid": `${n}-badge`,
				children: e.badge > 99 ? "99+" : e.badge
			}),
			s && /* @__PURE__ */ Z(ie, {
				trigger: r,
				open: c,
				onClose: () => o(!1),
				placement: e.popoverPlacement ?? "bottom-end",
				"aria-label": e.popoverLabel ?? e.label,
				kind: "huddle-bar-popover",
				"data-testid": `${n}-popover`,
				children: c && e.popover(() => o(!1))
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaControlsBar.tsx
var ri = {
	sm: "h-9 w-9",
	md: "h-11 w-11",
	lg: "h-14 w-14"
}, ii = {
	sm: 16,
	md: 20,
	lg: 24
};
function ai({ audioOn: t, videoOn: n, screenSharing: r = !1, onToggleAudio: i, onToggleVideo: a, onToggleScreenShare: o, onLeave: s, audioDisabled: c, videoDisabled: l, screenShareDisabled: u, audioDisabledReason: d, videoDisabledReason: f, screenShareDisabledReason: p, extras: m, leaveLabel: h = "Leave call", size: g = "md", className: _, "data-testid": v }) {
	let y = g === "lg" ? 22 : g === "sm" ? 16 : 18;
	return /* @__PURE__ */ Q("div", {
		"data-testid": v,
		className: e("flex items-center justify-center gap-3 px-4 py-3", _),
		children: [
			/* @__PURE__ */ Z(Ir, {
				on: t,
				onClick: i,
				disabled: c,
				disabledReason: d,
				size: g,
				"aria-label": t ? "Mute microphone" : "Unmute microphone",
				title: t ? "Mute microphone" : "Unmute microphone",
				iconOn: /* @__PURE__ */ Z(A, { size: y }),
				iconOff: /* @__PURE__ */ Z(w, { size: y }),
				"data-testid": "media-controls-mic"
			}),
			/* @__PURE__ */ Z(Ir, {
				on: n,
				onClick: a,
				disabled: l,
				disabledReason: f,
				size: g,
				"aria-label": n ? "Turn off camera" : "Turn on camera",
				title: n ? "Turn off camera" : "Turn on camera",
				iconOn: /* @__PURE__ */ Z(T, { size: y }),
				iconOff: /* @__PURE__ */ Z(ee, { size: y }),
				"data-testid": "media-controls-cam"
			}),
			o && /* @__PURE__ */ Z(Ir, {
				on: r,
				onClick: o,
				disabled: u,
				disabledReason: p,
				size: g,
				offTone: "neutral",
				"aria-label": r ? "Stop sharing screen" : "Share screen",
				title: r ? "Stop sharing screen" : "Share screen",
				iconOn: /* @__PURE__ */ Z(F, { size: y }),
				iconOff: /* @__PURE__ */ Z(M, { size: y }),
				"data-testid": "media-controls-screenshare"
			}),
			m,
			/* @__PURE__ */ Z("button", {
				"data-ui-part": "",
				type: "button",
				onClick: s,
				"aria-label": h,
				title: h,
				"data-testid": "media-controls-leave",
				className: e("rounded-full grid place-items-center transition-colors duration-150", ri[g], "bg-danger text-white hover:bg-danger cursor-pointer"),
				children: /* @__PURE__ */ Z(R, { size: ii[g] })
			})
		]
	});
}
//#endregion
//#region src/components/video/CallSettingsDialog.tsx
var oi = {
	devices: "Devices",
	effects: "Effects",
	people: "People",
	chat: "Chat"
};
function si({ open: t, onClose: n, previewStream: r, initialTab: i = "effects", devicesContent: a, effectsContent: o, peopleContent: s, chatContent: c, showPreview: l = !0, title: u = "Call settings", className: d }) {
	let f = [
		...a == null ? [] : ["devices"],
		...o == null ? [] : ["effects"],
		...s == null ? [] : ["people"],
		...c == null ? [] : ["chat"]
	], [p, m] = Y(i);
	K(() => {
		t && m(i);
	}, [t, i]);
	let h = f.includes(p) ? p : f[0] ?? null;
	return /* @__PURE__ */ Z(H, {
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
					"data-ui-part": "",
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
					children: r ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(He, {
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
							"data-ui-part": "",
							type: "button",
							role: "tab",
							"aria-selected": t === h,
							onClick: () => m(t),
							"data-testid": `call-settings-tab-${t}`,
							className: e("cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors", t === h ? "border-call-chrome-accent text-white" : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"),
							children: oi[t]
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
function ci(e) {
	return `Start broadcasting this room and tell everyone in ${e ?? "the channel"}`;
}
var li = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50", ui = "text-xs text-text-tertiary";
function di({ live: t = !1, starting: n = !1, onGoLive: r, onEndBroadcast: i, viewerCount: a, streamReady: o, connection: s = "online", channelName: c, error: l, endHint: u, label: d, disabled: f, className: p, "data-testid": m = "go-live" }) {
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
						className: e(li, n ? "bg-warning-bg text-warning-fg" : "bg-danger text-white"),
						children: [/* @__PURE__ */ Z("span", {
							"aria-hidden": !0,
							className: e("h-1.5 w-1.5 rounded-full", n ? "bg-warning-fg" : "bg-white")
						}), t ? s === "offline" ? "You are offline — nobody is receiving this" : "Reconnecting — your audience may not be receiving this" : n ? "On the call — no stream yet" : "You are live"]
					}),
					!n && typeof a == "number" && Number.isFinite(a) && a >= 0 && /* @__PURE__ */ Q("span", {
						"data-testid": `${m}-viewers`,
						className: ui,
						children: [a, " watching"]
					}),
					i && /* @__PURE__ */ Z("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${m}-end`,
						onClick: i,
						className: e(li, "cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover"),
						children: "End broadcast"
					})
				]
			}), (n || !i && u) && /* @__PURE__ */ Z("span", {
				"data-testid": `${m}-hint`,
				className: ui,
				children: t ? s === "offline" ? "Your connection dropped. The broadcast resumes if it comes back." : "Your connection is unstable. What you see locally is not what they see." : n ? "Nobody can watch yet — the stream has not started." : u
			})]
		});
	}
	return /* @__PURE__ */ Q("div", {
		className: e("flex flex-col gap-1", p),
		children: [
			/* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": m,
				"data-live": "false",
				disabled: f || n,
				onClick: r,
				title: ci(c),
				"aria-label": n ? "Going live…" : `${d ?? "Go live"} — ${ci(c).toLowerCase()}`,
				className: e(li, "cursor-pointer bg-danger text-white hover:opacity-90"),
				children: [/* @__PURE__ */ Z("span", {
					"aria-hidden": !0,
					className: "h-1.5 w-1.5 rounded-full bg-white"
				}), n ? "Going live…" : d ?? "Go live"]
			}),
			/* @__PURE__ */ Z("span", {
				"data-testid": `${m}-hint`,
				className: ui,
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
function fi() {
	let [e, t] = Y(!1), n = J(null);
	return {
		play: G(async (e) => {
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
function pi({ value: e, onChange: n, showCamera: r = !0, children: i, "data-testid": a = "device-settings" }) {
	let o = l(), { play: s, playing: c } = fi();
	if (!o.supported) return /* @__PURE__ */ Z("p", {
		"data-testid": `${a}-unsupported`,
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
		"data-testid": a,
		className: "flex flex-col gap-3",
		children: [
			o.labelsHidden ? /* @__PURE__ */ Z("p", {
				"data-testid": `${a}-labels-hidden`,
				className: "m-0 text-xs text-text-tertiary",
				children: "Device names appear once the browser has been allowed to use your microphone or camera."
			}) : null,
			/* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Microphone", /* @__PURE__ */ Z(U, {
					size: "sm",
					"data-testid": `${a}-microphone`,
					value: e.microphoneId ?? "",
					onChange: (t) => n({
						...e,
						microphoneId: t.target.value || void 0
					}),
					options: u(o.microphones, e.microphoneId)
				})]
			}),
			r ? /* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Camera", /* @__PURE__ */ Z(U, {
					size: "sm",
					"data-testid": `${a}-camera`,
					value: e.cameraId ?? "",
					onChange: (t) => n({
						...e,
						cameraId: t.target.value || void 0
					}),
					options: u(o.cameras, e.cameraId)
				})]
			}) : null,
			o.canSelectSpeaker ? /* @__PURE__ */ Q("label", {
				className: "flex flex-col gap-1 text-xs font-semibold text-text-secondary",
				children: ["Speaker", /* @__PURE__ */ Q("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ Z(U, {
						size: "sm",
						"data-testid": `${a}-speaker`,
						value: e.speakerId ?? "",
						onChange: (t) => n({
							...e,
							speakerId: t.target.value || void 0
						}),
						options: u(o.speakers, e.speakerId),
						className: "min-w-0 flex-1"
					}), /* @__PURE__ */ Z(t, {
						variant: "ghost",
						size: "sm",
						disabled: c,
						onClick: () => void s(e.speakerId),
						"data-testid": `${a}-speaker-test`,
						children: c ? "Playing…" : "Test"
					})]
				})]
			}) : null,
			i
		]
	});
}
//#endregion
//#region src/components/video/AudioPlayer.tsx
function mi(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function hi(e) {
	return e.controller ? /* @__PURE__ */ Z(_i, {
		...e,
		controller: e.controller
	}) : /* @__PURE__ */ Z(vi, { ...e });
}
function gi({ playing: t, time: n, duration: r, onToggle: i, onSeek: a, size: o = "md", className: s, testId: c, children: l }) {
	let u = r > 0 ? r : Math.max(n, 1);
	return /* @__PURE__ */ Q("div", {
		className: e("flex min-w-0 items-center gap-2", o === "sm" ? "text-xs" : "text-sm", s),
		"data-testid": c,
		"data-playing": t,
		children: [
			l,
			/* @__PURE__ */ Z(Ir, {
				on: t,
				offTone: "neutral",
				size: o === "sm" ? "sm" : "md",
				"aria-label": t ? "Pause" : "Play",
				iconOn: /* @__PURE__ */ Z(E, { size: o === "sm" ? 14 : 18 }),
				iconOff: /* @__PURE__ */ Z(D, { size: o === "sm" ? 14 : 18 }),
				onClick: i,
				"data-testid": `${c}-toggle`
			}),
			/* @__PURE__ */ Z("span", {
				className: "w-9 shrink-0 text-right font-mono tabular-nums text-text-secondary",
				"data-testid": `${c}-time`,
				children: mi(n)
			}),
			/* @__PURE__ */ Z(me, {
				"aria-label": "Seek",
				min: 0,
				max: u,
				step: .1,
				value: Math.min(n, u),
				onChange: a,
				className: "min-w-[96px] flex-1",
				"data-testid": `${c}-scrubber`
			}),
			/* @__PURE__ */ Z("span", {
				className: "w-9 shrink-0 font-mono tabular-nums text-text-tertiary",
				"data-testid": `${c}-duration`,
				children: mi(r)
			})
		]
	});
}
function _i({ controller: e, durationHint: t, onFirstPlay: n, size: r, className: i, "data-testid": a = "audio-player" }) {
	let o = J(!1);
	K(() => {
		e.playing && !o.current && (o.current = !0, n?.());
	}, [e.playing, n]);
	let s = e.duration && e.duration > 0 ? e.duration : t ?? 0;
	return /* @__PURE__ */ Z(gi, {
		playing: e.playing,
		time: e.time,
		duration: s,
		onToggle: e.onToggle,
		onSeek: e.onSeek,
		size: r,
		className: i,
		testId: a
	});
}
function vi({ src: e, autoPlay: t = !1, onFirstPlay: n, onEnded: r, durationHint: i, size: a = "md", className: o, "data-testid": s = "audio-player" }) {
	let c = J(null), [l, u] = Y(!1), [d, f] = Y(0), [p, m] = Y(i ?? 0), h = J(!1);
	return K(() => {
		u(!1), f(0), m(i ?? 0), h.current = !1;
	}, [e, i]), /* @__PURE__ */ Z(gi, {
		playing: l,
		time: d,
		duration: p,
		onToggle: () => {
			let e = c.current;
			e && (l ? e.pause() : e.play().catch(() => u(!1)));
		},
		onSeek: (e) => {
			let t = c.current;
			t && (t.currentTime = e, f(e));
		},
		size: a,
		className: o,
		testId: s,
		children: /* @__PURE__ */ Z("audio", {
			ref: c,
			src: e,
			autoPlay: t,
			preload: "metadata",
			className: "hidden",
			onPlay: () => {
				u(!0), h.current || (h.current = !0, n?.());
			},
			onPause: () => u(!1),
			onEnded: () => {
				u(!1), r?.();
			},
			onTimeUpdate: (e) => f(e.currentTarget.currentTime),
			onLoadedMetadata: (e) => {
				let t = e.currentTarget.duration;
				Number.isFinite(t) && t > 0 && m(t);
			},
			onDurationChange: (e) => {
				let t = e.currentTarget.duration;
				Number.isFinite(t) && t > 0 && m(t);
			},
			"data-testid": `${s}-element`
		})
	});
}
//#endregion
//#region src/components/video/VoicemailRecorder.tsx
function yi(e) {
	let t = Math.max(0, Math.floor(e / 1e3));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function bi({ open: e, onClose: n, recipientName: r, getStream: i, onSend: a, maxSeconds: o = 60, "data-testid": s = "voicemail-recorder" }) {
	let l = c({
		getStream: i,
		maxMs: o * 1e3
	}), [u, d] = Y(!1), [f, p] = Y(null), m = J(!1);
	K(() => {
		e && !m.current && (p(null), d(!1), l.start()), !e && m.current && l.reset(), m.current = e;
	}, [e]);
	let h = async () => {
		if (l.blob) {
			d(!0), p(null);
			try {
				await a(l.blob, l.elapsedMs, l.mimeType ?? (l.blob.type || "audio/webm")), n();
			} catch (e) {
				p(e instanceof Error ? e.message : "Could not send the voicemail.");
			} finally {
				d(!1);
			}
		}
	}, g = l.state === "starting" ? "Opening the microphone…" : l.state === "recording" ? "Recording — speak now" : l.state === "recorded" ? "Listen back, then send" : l.state === "error" ? l.error ?? "Something went wrong" : "Ready";
	return /* @__PURE__ */ Z(H, {
		open: e,
		onClose: n,
		title: `Leave a voicemail for ${r}`,
		maxWidth: 440,
		footer: /* @__PURE__ */ Q("div", {
			className: "flex w-full items-center justify-end gap-2",
			"data-testid": `${s}-actions`,
			children: [
				/* @__PURE__ */ Z(t, {
					variant: "ghost",
					size: "sm",
					onClick: n,
					disabled: u,
					"data-testid": `${s}-cancel`,
					children: "Cancel"
				}),
				l.state === "recording" && /* @__PURE__ */ Z(t, {
					variant: "primary",
					size: "sm",
					onClick: l.stop,
					"data-testid": `${s}-stop`,
					children: "Stop"
				}),
				(l.state === "recorded" || l.state === "error") && /* @__PURE__ */ Z(t, {
					variant: "secondary",
					size: "sm",
					onClick: () => void l.start(),
					disabled: u,
					"data-testid": `${s}-rerecord`,
					children: l.state === "error" ? "Try again" : "Re-record"
				}),
				l.state === "recorded" && /* @__PURE__ */ Z(t, {
					variant: "primary",
					size: "sm",
					onClick: () => void h(),
					disabled: u || !l.blob,
					"data-testid": `${s}-send`,
					children: u ? "Sending…" : "Send voicemail"
				})
			]
		}),
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col items-center gap-3 py-2",
			"data-testid": s,
			"data-state": l.state,
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 text-sm text-text-secondary",
					role: "status",
					"data-testid": `${s}-status`,
					children: [l.state === "recording" && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						className: "inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger"
					}), g]
				}),
				/* @__PURE__ */ Q("div", {
					className: "font-mono text-3xl tabular-nums text-text-primary",
					"data-testid": `${s}-clock`,
					children: [yi(l.elapsedMs), /* @__PURE__ */ Q("span", {
						className: "text-base text-text-tertiary",
						children: [" / ", yi(o * 1e3)]
					})]
				}),
				l.state === "recorded" && l.url && /* @__PURE__ */ Z(hi, {
					src: l.url,
					durationHint: l.elapsedMs / 1e3,
					className: "w-full",
					"data-testid": `${s}-preview`
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
function xi({ src: e, getAuthToken: n, onFirstPlay: r, eager: i = !1, className: a, "data-testid": o = "authed-audio" }) {
	let [s, c] = Y(null), [l, u] = Y("idle"), [d, f] = Y(i), p = J(!1);
	return K(() => {
		if (!d) return;
		let t = !1, r = null;
		return u("loading"), (async () => {
			try {
				let i = await n(), a = await fetch(e, { headers: i ? { Authorization: `Bearer ${i}` } : {} });
				if (!a.ok) throw Error(`HTTP ${a.status}`);
				let o = await a.blob();
				if (t) return;
				r = URL.createObjectURL(o), c(r), u("ready");
			} catch {
				t || u("error");
			}
		})(), () => {
			t = !0, r && URL.revokeObjectURL(r);
		};
	}, [e, d]), l === "idle" ? /* @__PURE__ */ Z(t, {
		variant: "secondary",
		size: "sm",
		onClick: () => f(!0),
		"data-testid": `${o}-load`,
		children: "▶ Play"
	}) : l === "loading" ? /* @__PURE__ */ Z("span", {
		className: "text-sm text-text-tertiary",
		"data-testid": `${o}-loading`,
		children: "Loading…"
	}) : l === "error" || !s ? /* @__PURE__ */ Z(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => {
			u("idle"), f(!1), setTimeout(() => f(!0), 0);
		},
		"data-testid": `${o}-error`,
		children: "Couldn’t load — retry"
	}) : /* @__PURE__ */ Z(hi, {
		src: s,
		autoPlay: !0,
		size: "sm",
		className: a,
		"data-testid": o,
		onFirstPlay: () => {
			p.current || (p.current = !0, r?.());
		}
	});
}
//#endregion
//#region src/components/video/EmbeddedCallPanel.tsx
function Si(e) {
	let t = Math.max(0, Math.floor(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
function Ci({ title: t, subtitle: n, durationSeconds: r, live: i = !0, recording: a, onPopOut: o, popOutLabel: s = "Pop the call out", children: c, controls: l, aside: d, stage: f = "video", className: p, "data-testid": m = "embedded-call-panel" }) {
	return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
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
					a && /* @__PURE__ */ Z(Wr, {
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
						children: Si(r)
					}),
					o && /* @__PURE__ */ Z(u, {
						"aria-label": s,
						title: s,
						size: "sm",
						variant: "ghost",
						icon: /* @__PURE__ */ Z(O, { size: 16 }),
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
						children: c
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
					children: c
				})
			}),
			l && /* @__PURE__ */ Z("div", {
				className: "flex w-full min-w-0 items-center justify-center overflow-x-auto px-2 py-2",
				"data-testid": `${m}-controls`,
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/video/CallNoticePill.tsx
var wi = {
	warning: "bg-warning/95 text-call-chrome",
	error: "bg-danger/95 text-on-danger",
	info: "bg-black/70 text-white"
}, Ti = {
	1: "truncate",
	2: "line-clamp-2 break-words",
	3: "line-clamp-3 break-words"
};
function Ei({ show: t, tone: n = "warning", message: r, actions: i, maxLines: a = 2, className: o, "data-testid": s = "call-notice" }) {
	let c = J(null), [l, u] = Y(!1);
	return qe(() => {
		let e = c.current;
		if (!t || !e) {
			u(!1);
			return;
		}
		let n = () => u(re(e));
		if (n(), typeof ResizeObserver > "u") return;
		let r = new ResizeObserver(n);
		return r.observe(e), () => r.disconnect();
	}, [
		t,
		r,
		a
	]), t ? /* @__PURE__ */ Q("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": s,
		"data-tone": n,
		"data-max-lines": a,
		"data-truncated": l ? "true" : void 0,
		className: e("pointer-events-auto absolute left-1/2 top-3 z-30 flex w-max max-w-[min(36rem,calc(100%-1rem))] -translate-x-1/2 items-center gap-2 px-3 py-1.5 text-xs font-medium shadow-lg", a === 1 ? "rounded-full" : "rounded-2xl", wi[n], o),
		children: [/* @__PURE__ */ Z(W, {
			content: r,
			disabled: !l,
			placement: "bottom",
			triggerClassName: "block min-w-0",
			"data-testid": `${s}-full-text`,
			children: /* @__PURE__ */ Z("span", {
				ref: c,
				className: e("block min-w-0 leading-4", Ti[a], l && "-mx-1 rounded-sm px-1 focus-visible:outline-2 focus-visible:outline-current"),
				tabIndex: l ? 0 : void 0,
				"data-testid": `${s}-message`,
				children: r
			})
		}), i && /* @__PURE__ */ Z("span", {
			className: "flex shrink-0 items-center gap-1",
			children: i
		})]
	}) : null;
}
//#endregion
//#region src/components/video/CallInterruptedNotice.tsx
function Di({ show: t, title: n, description: r, actions: i, className: a, "data-testid": o = "call-interrupted-notice" }) {
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
//#region src/components/video/MediaPrecheckRow.tsx
var Oi = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
};
function ki(e, t) {
	if (t === "denied") return Oi[e];
	if (t === "unavailable") return e === "microphone" ? "No microphone found" : "No camera found";
}
function Ai({ micOn: n, cameraOn: r, showCamera: i = !0, permission: a, onToggleMic: o, onToggleCamera: s, onOpenSettings: c, testIdPrefix: l = "start-call-precheck", settingsTestId: u = "start-call-settings", className: d }) {
	let f = typeof a == "string" ? {
		microphone: a,
		camera: a
	} : a, p = ki("microphone", f.microphone), m = ki("camera", f.camera), h = n && !p, g = r && !m, _ = (t) => e("inline-flex h-8 items-center gap-2 border-transparent px-2 py-0 font-medium", t ? "text-danger-fg" : "text-text-primary");
	return /* @__PURE__ */ Q("div", {
		className: e("flex items-center gap-2", d),
		"data-testid": `${l}-row`,
		children: [
			/* @__PURE__ */ Q(t, {
				variant: "ghost",
				onClick: o,
				disabled: !!p,
				title: p ?? (h ? "Turn microphone off" : "Turn microphone on"),
				"aria-pressed": h,
				"data-testid": `${l}-mic`,
				className: _(!!p),
				children: [Z(h ? A : w, { size: 18 }), h ? "Mic on" : "Mic off"]
			}),
			i && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				className: "h-5 w-px shrink-0 bg-border"
			}), /* @__PURE__ */ Q(t, {
				variant: "ghost",
				onClick: s,
				disabled: !!m,
				title: m ?? (g ? "Turn camera off" : "Turn camera on"),
				"aria-pressed": g,
				"data-testid": `${l}-camera`,
				className: _(!!m),
				children: [Z(g ? T : ee, { size: 18 }), g ? "Camera on" : "Camera off"]
			})] }),
			/* @__PURE__ */ Z(t, {
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
function ji({ items: t, trailing: n, onRemove: r, onOpen: i, onSelect: a, onReorder: o, emptyLabel: s = "No documents yet", className: c, "data-testid": l = "review-document-list", rowTestIdPrefix: d = "call-document" }) {
	let [f, p] = Y(null), h = n === "remove";
	if (t.length === 0) return /* @__PURE__ */ Z("p", {
		className: e("m-0 py-2 text-sm text-text-tertiary", c),
		"data-testid": l,
		children: s
	});
	let g = (e) => (t) => {
		t.preventDefault(), f && o && o(f, e), p(null);
	};
	return /* @__PURE__ */ Z("ul", {
		className: e("m-0 flex list-none flex-col p-0", !h && "gap-1", c),
		"data-testid": l,
		children: t.map((t, s) => {
			let c = t.removable !== !1, l = t.sublineTone ? t.sublineTone === "accent" : t.selected;
			return /* @__PURE__ */ Q("li", {
				"data-testid": `${d}-${t.id}`,
				"data-selected": t.selected ? "true" : "false",
				draggable: !!o,
				onDragStart: o ? () => p(t.id) : void 0,
				onDragOver: o ? (e) => e.preventDefault() : void 0,
				onDrop: o ? g(s) : void 0,
				className: e("group/doc flex items-center rounded-md", h ? "min-h-8 gap-2.5 px-0.5" : "min-h-[58px] gap-3 px-3 py-2", t.selected && "bg-primary-bg", !t.selected && !h && "hover:bg-surface-hover", a && "cursor-pointer", f === t.id && "opacity-50"),
				onClick: a ? () => a(t.id) : void 0,
				children: [
					/* @__PURE__ */ Z("span", {
						className: e("flex shrink-0 text-text-secondary", t.selected && "text-primary"),
						"aria-hidden": "true",
						children: t.icon ?? /* @__PURE__ */ Z(m, { size: h ? 18 : 24 })
					}),
					/* @__PURE__ */ Q("span", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ Z("span", {
							className: e("truncate text-text-primary", h ? "text-sm" : "text-[15px] font-medium"),
							children: t.title
						}), t.subline != null && /* @__PURE__ */ Z("span", {
							className: e("truncate text-sm", l ? "text-primary" : "text-text-tertiary"),
							children: t.subline
						})]
					}),
					n === "remove" && c && r && /* @__PURE__ */ Z(u, {
						"aria-label": `Remove ${t.title}`,
						size: "sm",
						icon: /* @__PURE__ */ Z(_, { size: 14 }),
						onClick: (e) => {
							e.stopPropagation(), r(t.id);
						},
						"data-testid": `${d}-remove-${t.id}`,
						className: "shrink-0 text-text-secondary"
					}),
					n === "open" && i && /* @__PURE__ */ Z(u, {
						"aria-label": `Open ${t.title}`,
						title: `Open ${t.title}`,
						icon: /* @__PURE__ */ Z(O, { size: 18 }),
						onClick: (e) => {
							e.stopPropagation(), i(t.id);
						},
						"data-testid": `${d}-open-${t.id}`,
						className: "shrink-0 text-text-secondary"
					})
				]
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/video/CollaboratorCheckList.tsx
function Mi({ title: t, rows: n, selected: r, onToggle: i, loading: a = !1, emptyLabel: o = "No one else has this document open", footnote: s, className: c, "data-testid": l = "start-call-collaborators", rowTestIdPrefix: u = "start-call-collaborator" }) {
	let d = new Set(r);
	return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
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
				].map((e) => /* @__PURE__ */ Z(be, {
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
								children: [/* @__PURE__ */ Z(ve, {
									name: t.name,
									size: 32,
									...t.avatarUrl ? { src: t.avatarUrl } : {},
									...t.color ? { color: t.color } : {},
									showTitle: !1
								}), /* @__PURE__ */ Z(Te, {
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
							/* @__PURE__ */ Z(Ae, {
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
function Ni(e) {
	let t = null, n = Ue(e.access);
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
	} : n ? t = {
		label: n.label,
		tone: "muted",
		kind: "view-only"
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
	}, e.state === "reconnecting" && (t?.kind === "camera-off" || t?.kind === "view-only") && (t = {
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
var Pi = /* @__PURE__ */ new Set([
	"ringing",
	"notified",
	"missed",
	"declined",
	"left"
]);
function Fi({ people: n, count: r, followingUserId: i, canModerate: a, onInvite: o, onFollow: s, onMuteForMe: c, onMute: l, onRemove: u, onMakeHost: d, onRingAgain: f, onOpenSelfSettings: m, onLeave: h, hideHeading: g = !1, rowMenu: _, className: v, "data-testid": y = "call-people-list" }) {
	return /* @__PURE__ */ Q("section", {
		"data-ui-part": "",
		className: e("flex flex-col", v),
		"data-testid": y,
		"aria-label": "People",
		children: [!g && /* @__PURE__ */ Q("div", {
			className: "mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ Z("h3", {
					className: "m-0 text-base font-semibold text-text-primary",
					children: "People"
				}),
				/* @__PURE__ */ Z(B, {
					variant: "count",
					value: r,
					color: "muted",
					"aria-label": `${r} people`
				}),
				/* @__PURE__ */ Z(t, {
					variant: "ghost",
					size: "md",
					onClick: o,
					"data-testid": "call-invite",
					className: "ml-auto",
					children: "Invite..."
				})
			]
		}), /* @__PURE__ */ Z("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: n.map((n) => {
				let r = Ni(n), o = Pi.has(n.state), g = [];
				if (!n.isLocal && !o) {
					let e = i === n.userId;
					g.push({
						label: e ? "Stop following" : "Follow",
						onSelect: () => s(e ? null : n.userId),
						"data-testid": `call-person-follow-${n.userId}`
					}), g.push({
						label: "Mute for me",
						onSelect: () => c(n.userId)
					});
				}
				a && !n.isLocal && !o && (l && g.push({
					label: "Mute",
					onSelect: () => l(n.userId),
					disabled: !n.audioOn
				}), d && !n.isHost && g.push({
					label: "Make host",
					onSelect: () => d(n.userId)
				}), u && g.push({
					label: "Remove from call",
					danger: !0,
					onSelect: () => u(n.userId)
				})), n.isLocal && (m && g.push({
					label: "Call settings",
					onSelect: m,
					"data-testid": "call-person-self-settings"
				}), h && g.push({
					label: "Leave call",
					danger: !0,
					onSelect: h,
					"data-testid": "call-person-self-leave"
				})), n.state === "missed" && f && g.push({
					label: "Ring again",
					onSelect: () => f(n.userId)
				});
				let v = [...g.length > 0 ? [{ items: g }] : [], ..._?.(n)?.filter((e) => e.items.length > 0) ?? []], y = null;
				return r.label && (y = /* @__PURE__ */ Q("span", {
					className: e("inline-flex items-center gap-1.5 truncate text-sm", r.tone === "accent" && "text-primary", r.tone === "muted" && "text-text-tertiary", r.tone === "warning" && "text-warning-fg"),
					"data-testid": `call-person-status-${n.userId}`,
					"data-status": r.kind,
					...r.kind === "view-only" ? { title: Ue(n.access)?.description } : {},
					children: [
						r.kind === "view-only" && /* @__PURE__ */ Z(p, {
							size: 14,
							className: "shrink-0"
						}),
						r.kind === "ringing" && /* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							className: "h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
						}),
						r.label,
						r.kind === "presenting" && /* @__PURE__ */ Z(P, {
							size: 16,
							className: "ml-1"
						})
					]
				})), /* @__PURE__ */ Q("li", {
					className: e("flex min-h-16 items-center gap-3", o && "opacity-60"),
					"data-testid": `call-person-${n.userId}`,
					"data-state": n.state,
					children: [
						/* @__PURE__ */ Q("span", {
							className: "relative inline-flex shrink-0",
							children: [/* @__PURE__ */ Z(ve, {
								name: n.name,
								size: 46,
								...n.avatarUrl ? { src: n.avatarUrl } : {},
								...n.color ? { color: n.color } : {},
								showTitle: !1
							}), n.presence && n.state === "in-call" && !n.isLocal && /* @__PURE__ */ Z(Te, {
								state: n.presence,
								pulse: !1,
								className: "absolute bottom-0 right-0 rounded-full ring-2 ring-surface"
							})]
						}),
						/* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ Q("span", {
								className: "truncate text-[15px] text-text-primary",
								children: [n.name, n.isLocal && /* @__PURE__ */ Z("span", {
									className: "text-text-secondary",
									children: " (you)"
								})]
							}), y]
						}),
						n.state === "missed" && f ? /* @__PURE__ */ Z(t, {
							variant: "link",
							onClick: () => f(n.userId),
							className: "shrink-0 text-sm",
							"data-testid": `call-person-ring-${n.userId}`,
							children: "Ring again"
						}) : !o && /* @__PURE__ */ Z("span", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center text-text-secondary",
							"aria-label": n.audioOn ? "Microphone on" : "Microphone muted",
							role: "img",
							"data-testid": `call-person-mic-${n.userId}`,
							"data-audio": n.audioOn ? "on" : "off",
							children: n.audioOn ? /* @__PURE__ */ Z(A, { size: 20 }) : /* @__PURE__ */ Z(w, { size: 20 })
						}),
						v.length > 0 ? /* @__PURE__ */ Z(he, {
							trigger: /* @__PURE__ */ Z(I, { size: 20 }),
							triggerLabel: `More for ${n.name}`,
							triggerVariant: "link",
							triggerClassName: "h-8 w-8 shrink-0 px-0",
							triggerTestId: `call-person-menu-${n.userId}`,
							align: "end",
							sections: v,
							"data-testid": `call-person-menu-panel-${n.userId}`
						}) : /* @__PURE__ */ Z("span", {
							className: "h-8 w-8 shrink-0",
							"aria-hidden": "true"
						})
					]
				}, n.userId);
			})
		})]
	});
}
//#endregion
//#region src/components/video/CallSettingsDrawer.tsx
var Ii = [
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
function Li({ open: n, onClose: r, initialTab: i = "audio-video", tab: a, onTabChange: o, docked: s = !0, audioVideo: c, effects: l, captions: u, effectsFooter: d, width: f = 380, className: p, "data-testid": m = "call-settings-drawer" }) {
	let [h, g] = Y(i);
	K(() => {
		n && g(i);
	}, [n, i]);
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
			/* @__PURE__ */ Z(t, {
				variant: "ghost",
				onClick: d.onCancel,
				"data-testid": "effects-cancel",
				children: "Cancel"
			}),
			/* @__PURE__ */ Z(t, {
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
		}), /* @__PURE__ */ Z(t, {
			onClick: r,
			"data-testid": "settings-done",
			children: "Done"
		})]
	});
	return /* @__PURE__ */ Q(le, {
		open: n,
		onClose: r,
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
			children: /* @__PURE__ */ Z(_e, {
				items: Ii.map((e) => ({
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
function Ri({ enabled: t, onEnabledChange: n, language: r, onLanguageChange: i, languages: a = [{
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
			}), /* @__PURE__ */ Z(Se, {
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
			}), /* @__PURE__ */ Z(U, {
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
function zi(e) {
	return e === 0 ? "No one selected" : e === 1 ? "1 person selected" : `${e} people selected`;
}
function Bi({ children: e, action: t }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ Z("h3", {
			className: "m-0 text-[15px] font-semibold text-text-primary",
			children: e
		}), t]
	});
}
function Vi({ open: e, onClose: r, title: i, onTitleChange: a, media: o, onMediaChange: s, documents: c, onManageAccess: l, people: u, message: d, onMessageChange: p, messageMaxLength: m = 280, ring: g, onRingChange: _, precheck: v, selectedCount: y, onCopyLink: x, onStart: S, starting: C = !1, startDisabledReason: w, error: T, width: E = 400, docked: D = !0, className: O, "data-testid": k = "start-call-drawer" }) {
	let { onAdd: A, ...j } = c, M = !!w || C || !i.trim(), N = /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-2.5",
		children: [
			T && /* @__PURE__ */ Z(V, {
				variant: "error",
				title: `Could not start the call — ${T.message}`,
				action: /* @__PURE__ */ Z(t, {
					variant: "ghost",
					size: "sm",
					onClick: T.onRetry,
					"data-testid": "start-call-retry",
					children: "Retry"
				}),
				"data-testid": "start-call-error"
			}),
			/* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": "start-call-selected-count",
				children: zi(y)
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ Q(t, {
					variant: "ghost",
					onClick: x,
					"data-testid": "start-call-copy-link",
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ Z(f, { size: 16 }), "Copy invite link"]
				}), /* @__PURE__ */ Q(t, {
					onClick: S,
					disabled: M,
					title: w ?? (i.trim() ? void 0 : "Give the call a title"),
					"data-testid": "start-call-submit",
					className: "inline-flex items-center gap-2 px-5",
					children: [C && /* @__PURE__ */ Z(ue, {
						size: "sm",
						color: "currentColor",
						decorative: !0
					}), C ? "Starting…" : "Start call"]
				})]
			})
		]
	});
	return /* @__PURE__ */ Q(le, {
		open: e,
		onClose: r,
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
			/* @__PURE__ */ Z(ce, {
				value: i,
				onCommit: a,
				placeholder: "Call title",
				editLabel: "Rename call",
				"data-testid": "start-call-title"
			}),
			/* @__PURE__ */ Z(ge, {
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
			/* @__PURE__ */ Q("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ Z(Bi, {
						action: /* @__PURE__ */ Q(t, {
							variant: "link",
							onClick: A,
							"data-testid": "start-call-add-document",
							className: "inline-flex items-center gap-1 text-sm",
							children: [/* @__PURE__ */ Z(h, { size: 14 }), "Add"]
						}),
						children: "Review documents"
					}),
					/* @__PURE__ */ Z(ji, {
						...j,
						trailing: "remove",
						"data-testid": "start-call-documents",
						rowTestIdPrefix: "start-call-document"
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ Z("span", {
							className: "text-text-tertiary",
							children: "Existing document access applies."
						}), /* @__PURE__ */ Z(t, {
							variant: "link",
							onClick: l,
							"data-testid": "start-call-manage",
							className: "text-xs",
							children: "Manage"
						})]
					})
				]
			}),
			/* @__PURE__ */ Q("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ Z(Bi, { children: "People" }),
					/* @__PURE__ */ Z(ne, {
						value: u.query,
						onChange: (e) => u.onQueryChange(e.target.value),
						placeholder: u.placeholder ?? "Find people, teams or channels",
						"aria-label": u.placeholder ?? "Find people, teams or channels",
						prefix: /* @__PURE__ */ Z(b, { size: 16 }),
						"data-testid": "start-call-people-search"
					}),
					u.chips.length > 0 && /* @__PURE__ */ Z("div", {
						className: "flex flex-wrap gap-2",
						"data-testid": "start-call-chips",
						children: u.chips.map((e) => /* @__PURE__ */ Z(n, {
							tone: "neutral",
							onRemove: () => u.onRemoveChip(e.userId),
							removeLabel: `Remove ${e.name}`,
							removeTestId: `start-call-chip-remove-${e.userId}`,
							"data-testid": `start-call-chip-${e.userId}`,
							className: "rounded-md px-2.5 py-1 text-[13px]",
							children: e.name
						}, e.userId))
					}),
					/* @__PURE__ */ Z(Mi, {
						title: "Document collaborators",
						footnote: "Offline people can use the invite link.",
						...u.collaborators
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Q("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ Q("label", {
					htmlFor: `${k}-message`,
					className: "text-sm text-text-primary",
					children: ["Message ", /* @__PURE__ */ Z("span", {
						className: "text-text-tertiary",
						children: "(optional)"
					})]
				}), /* @__PURE__ */ Z(we, {
					id: `${k}-message`,
					value: d,
					onChange: (e) => p(e.target.value.slice(0, m)),
					maxLength: m,
					rows: 2,
					className: "min-h-0 h-12 resize-none py-1.5",
					"data-testid": "start-call-message"
				})]
			}),
			/* @__PURE__ */ Q("label", {
				className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
				children: [/* @__PURE__ */ Z(Ae, {
					checked: g,
					onChange: (e) => _(e),
					className: "h-[18px] w-[18px]",
					"data-testid": "start-call-ring"
				}), "Ring online participants"]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-my-0.5 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ Z(Ai, {
				showCamera: o === "video",
				...v
			})
		]
	});
}
//#endregion
//#region src/components/video/IncomingCallPopover.tsx
function Hi(e, t) {
	return e === 0 ? "Nobody has joined yet" : t ? `${e} in call` : e === 1 ? "1 person in the call" : `${e} people in the call`;
}
function Ui({ open: n, anchorRef: r, compact: i = !1, caller: a, title: o, documents: s, onOpenDocument: c, participants: l, participantCount: d, mic: f, camera: p, onOpenSettings: h, busy: g = !1, onJoin: v, onSwitch: b, onDecline: x, onDismiss: S, ringing: C = !0, initialFocus: w = "join", className: T, "data-testid": E = "incoming-call-popover" }) {
	let [D, ...O] = s, A = O.length ? i ? `+${O.length}` : `+${O.length} ${O.length === 1 ? "document" : "documents"}` : null, M = g && !!b, N = J(null);
	return K(() => {
		if (!n || w !== "join") return;
		let e = requestAnimationFrame(() => N.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [
		n,
		w,
		M
	]), /* @__PURE__ */ Z(ie, {
		trigger: r,
		open: n,
		onClose: S,
		placement: "bottom-end",
		offset: 8,
		"aria-label": `Incoming call from ${a.name}`,
		"data-testid": E,
		className: e("rounded-xl p-0 shadow-xl", i ? "w-[375px]" : "w-[407px]", T),
		children: /* @__PURE__ */ Q("div", {
			className: e("flex flex-col", i ? "gap-2.5 px-4 pt-3 pb-4" : "gap-3.5 px-5 pt-4 pb-4"),
			"data-compact": i ? "true" : "false",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ Z(j, {
							size: 20,
							className: e("shrink-0 text-success", C && "motion-safe:animate-pulse")
						}),
						/* @__PURE__ */ Z("span", {
							className: "flex-1 text-[15px] font-semibold text-text-primary",
							children: "Incoming call"
						}),
						/* @__PURE__ */ Z(u, {
							"aria-label": "Not now",
							title: "Not now",
							size: "sm",
							icon: /* @__PURE__ */ Z(_, { size: 16 }),
							onClick: x,
							"data-testid": "incoming-call-close",
							className: "text-text-secondary"
						})
					]
				}),
				i ? /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ Z(ve, {
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
					children: [/* @__PURE__ */ Z(ve, {
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
					className: e("m-0 font-semibold text-text-primary", i ? "text-lg" : "text-xl"),
					"data-testid": "incoming-call-title",
					children: o
				}),
				D && /* @__PURE__ */ Q("div", {
					className: "flex min-w-0 items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ Z(m, {
							size: i ? 20 : 22,
							className: "shrink-0 text-primary"
						}),
						/* @__PURE__ */ Z(t, {
							variant: "link",
							onClick: () => c(D.id),
							"data-testid": `incoming-call-document-${D.id}`,
							className: "min-w-0 truncate text-[15px] underline",
							children: D.title
						}),
						A && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							className: "h-4 w-px shrink-0 bg-border"
						}), /* @__PURE__ */ Z(W, {
							content: O.map((e) => e.title).join(", "),
							children: /* @__PURE__ */ Z(t, {
								variant: "link",
								onClick: () => c(O[0].id),
								"data-testid": "incoming-call-more",
								className: "shrink-0 text-[15px] underline",
								children: A
							})
						})] }),
						i && /* @__PURE__ */ Z("span", {
							className: "ml-auto shrink-0 text-text-secondary",
							"data-testid": "incoming-call-participants",
							children: Hi(d, !0)
						})
					]
				}),
				!i && /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-3",
					"data-testid": "incoming-call-participants",
					children: [l.length > 0 && /* @__PURE__ */ Z(ye, {
						items: l.slice(0, 3).map((e) => ({
							name: e.name,
							...e.avatarUrl ? { src: e.avatarUrl } : {}
						})),
						maxVisible: 3,
						size: 34,
						className: "[&>*]:!border-surface [&>*+*]:!ml-[-4px]"
					}), /* @__PURE__ */ Z("span", {
						className: "text-sm text-text-secondary",
						children: Hi(d, !1)
					})]
				}),
				!i && /* @__PURE__ */ Z("div", {
					className: "h-px bg-border",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Z(Ne, {
							kind: "microphone",
							size: "md",
							showLabel: !0,
							...f,
							className: e("min-w-0 flex-auto justify-between", f.className),
							"data-testid": "incoming-call-mic"
						}),
						/* @__PURE__ */ Z(Ne, {
							kind: "camera",
							size: "md",
							showLabel: !0,
							...p,
							className: e("min-w-0 flex-auto justify-between", p.className),
							"data-testid": "incoming-call-camera"
						}),
						/* @__PURE__ */ Z(u, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							size: "lg",
							icon: /* @__PURE__ */ Z(k, { size: 18 }),
							onClick: h,
							"data-testid": "incoming-call-settings",
							className: "shrink-0"
						})
					]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ Z(t, {
						variant: "ghost",
						onClick: x,
						"data-testid": "incoming-call-decline",
						className: "border-transparent",
						children: "Not now"
					}), M ? /* @__PURE__ */ Q(t, {
						ref: N,
						onClick: b,
						"data-testid": "incoming-call-switch",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Switch", /* @__PURE__ */ Z(y, { size: 16 })]
					}) : /* @__PURE__ */ Q(t, {
						ref: N,
						onClick: v,
						"data-testid": "incoming-call-join",
						className: "inline-flex h-10 items-center gap-2 px-4",
						children: ["Join call", /* @__PURE__ */ Z(y, { size: 16 })]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/video/DocumentCallPanel.tsx
function Wi({ title: n, participantCount: r, elapsedMs: i, people: a, documents: o, presenting: s, currentDocumentId: c, canPresent: l, presentDisabledReason: d, onPresent: p, onCopyLink: m, onManageAccess: g, onPopOut: _, onClose: v, loading: y = !1, notice: b, className: x, "data-testid": S = "document-call-panel" }) {
	let { count: C, onAdd: w, ...T } = o, E = a.people.find((e) => e.isLocal), D = !!(s && E && s.userId === E.userId && s.documentId === c), k = !!(s && (!E || s.userId !== E.userId)), A = a.people.filter((e) => e.state === "in-call" && !e.isLocal).length === 0, j = `${r === 1 ? "1 person" : `${r} people`}${i == null ? "" : ` · ${Le(i)}`}`;
	return /* @__PURE__ */ Q(le, {
		open: !0,
		docked: !0,
		onClose: v,
		title: "Call",
		actions: /* @__PURE__ */ Z(u, {
			"aria-label": "Pop out the call",
			title: "Pop out the call",
			size: "sm",
			icon: /* @__PURE__ */ Z(O, { size: 18 }),
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
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ Z("h3", {
					className: "m-0 text-lg font-semibold text-text-primary",
					"data-testid": "call-panel-title",
					children: n
				}), /* @__PURE__ */ Z("span", {
					className: "text-sm tabular-nums text-text-tertiary",
					"data-testid": "call-panel-meta",
					children: j
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "-mt-2 h-px shrink-0 bg-border",
				"aria-hidden": "true"
			}),
			y ? /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-3",
				"data-testid": "call-panel-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ Z(be, {
					height: 52,
					rounded: "md"
				}, e))
			}) : /* @__PURE__ */ Q(X, { children: [
				/* @__PURE__ */ Z(Fi, { ...a }),
				A && /* @__PURE__ */ Q("p", {
					className: "m-0 -mt-2 text-sm text-text-tertiary",
					"data-testid": "call-panel-waiting",
					children: [
						"Waiting for others —",
						" ",
						/* @__PURE__ */ Z(t, {
							variant: "link",
							onClick: m,
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
					"data-ui-part": "",
					className: "-mx-2 flex flex-col gap-2",
					"aria-label": "Review documents",
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2 px-2",
						children: [
							/* @__PURE__ */ Z("h3", {
								className: "m-0 text-base font-semibold text-text-primary",
								children: "Review documents"
							}),
							/* @__PURE__ */ Z(B, {
								variant: "count",
								value: C,
								color: "muted",
								"aria-label": `${C} documents`
							}),
							/* @__PURE__ */ Q(t, {
								variant: "link",
								onClick: w,
								"data-testid": "call-add-document",
								className: "ml-auto inline-flex items-center gap-1 text-sm",
								children: [/* @__PURE__ */ Z(h, { size: 14 }), "Add"]
							})
						]
					}), /* @__PURE__ */ Z(ji, {
						...T,
						trailing: "open",
						"data-testid": "call-documents-list",
						rowTestIdPrefix: "call-document"
					})]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ Q(t, {
						variant: "ghost",
						onClick: () => p(D ? null : c),
						disabled: !D && !l,
						title: !D && !l ? d : k ? `Take over from ${s.name}` : void 0,
						"data-take-over": k && l ? "true" : void 0,
						"data-testid": "call-present",
						className: "inline-flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ Z(P, { size: 18 }), D ? "Stop presenting" : "Present this document"]
					}), /* @__PURE__ */ Q(t, {
						variant: "link",
						onClick: m,
						"data-testid": "call-copy-link",
						className: "inline-flex items-center gap-1.5 text-sm",
						children: [/* @__PURE__ */ Z(f, { size: 16 }), "Copy call link"]
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
					}), /* @__PURE__ */ Z(t, {
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
var Gi = "relative inline-flex flex-col items-center justify-center rounded-md text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent", Ki = `${Gi} h-14 min-w-14 gap-0.5 px-2`, qi = {
	labelled: Ki,
	compact: `${Gi} h-8 min-w-8 px-1.5 [&_svg]:size-[18px]`,
	phone: `${Gi} h-10 min-w-10 px-1.5 [&_svg]:size-5`
};
function Ji({ item: t, look: n = "compact" }) {
	let r = n !== "labelled", i = t.disabled && t.disabledReason ? t.disabledReason : t.title ?? t.label, o = J(null), [s, c] = Y(!1), l = !!t.popover, u = l && s && !t.disabled, d = l ? u || !!t.active : t.active, f = /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		ref: o,
		type: "button",
		onClick: l ? () => c((e) => !e) : t.onClick,
		disabled: t.disabled,
		title: !r || t.disabled ? i : void 0,
		"aria-label": t.count === void 0 ? t.label : `${t.label}, ${t.count}`,
		"aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
		"aria-haspopup": l ? "dialog" : void 0,
		"aria-expanded": l ? u : t.active === void 0 ? void 0 : t.active,
		"data-testid": `meeting-toolbar-${t.id}`,
		"data-active": d ? "true" : void 0,
		"data-pressed": t.pressed ? "true" : void 0,
		"data-tone": t.tone ?? "default",
		className: e(qi[n], d && "text-primary-fg hover:text-primary-fg", t.pressed && "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg", t.tone === "danger" && "text-danger hover:bg-danger-bg hover:text-danger", t.menu && n !== "phone" && "rounded-r-none pr-1", t.menu && n === "compact" && "pr-0.5"),
		children: [
			/* @__PURE__ */ Q("span", {
				className: "relative inline-flex items-center gap-1.5",
				children: [
					t.icon,
					t.count !== void 0 && (r ? /* @__PURE__ */ Z(B, {
						variant: "count",
						color: "muted",
						value: t.count,
						"aria-label": String(t.count),
						className: "shrink-0",
						"data-testid": `meeting-toolbar-${t.id}-count`
					}) : /* @__PURE__ */ Z(a, {
						size: "sm",
						weight: "semibold",
						tone: "inherit",
						tabular: !0,
						"data-testid": `meeting-toolbar-${t.id}-count`,
						children: t.count
					})),
					!!t.badge && /* @__PURE__ */ Z(B, {
						variant: "count",
						color: "danger",
						value: t.badge,
						className: "shrink-0",
						"data-testid": `meeting-toolbar-${t.id}-badge`
					})
				]
			}),
			!r && /* @__PURE__ */ Z(a, {
				size: "xs",
				tone: "inherit",
				className: "leading-tight whitespace-nowrap",
				children: t.label
			}),
			d && /* @__PURE__ */ Z("span", {
				"aria-hidden": !0,
				className: e("absolute bottom-0 h-0.5 rounded-full bg-primary", r ? "inset-x-1.5" : "inset-x-2"),
				"data-testid": `meeting-toolbar-${t.id}-active`
			})
		]
	}), p = r && !t.disabled ? /* @__PURE__ */ Z(W, {
		content: i,
		placement: "bottom",
		"data-testid": `meeting-toolbar-${t.id}-tooltip`,
		children: f
	}) : f;
	if (l) {
		let e = () => c(!1);
		return /* @__PURE__ */ Q(X, { children: [p, /* @__PURE__ */ Z(ie, {
			trigger: o,
			open: u,
			onClose: e,
			placement: t.popoverPlacement ?? "bottom-start",
			"aria-label": t.popoverLabel ?? t.label,
			kind: "meeting-toolbar-popover",
			"data-testid": `meeting-toolbar-${t.id}-popover`,
			children: u && t.popover(e)
		})] });
	}
	return !t.menu || n === "phone" ? p : /* @__PURE__ */ Q("span", {
		className: "inline-flex items-stretch",
		"data-testid": `meeting-toolbar-${t.id}-split`,
		children: [p, /* @__PURE__ */ Z(he, {
			trigger: /* @__PURE__ */ Z(v, { size: n === "compact" ? 12 : 14 }),
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
function Yi(e) {
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
function Xi(e, t) {
	let [n, r] = Y(Infinity);
	return K(() => {
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
function Zi({ compact: t }) {
	return /* @__PURE__ */ Z("span", {
		"aria-hidden": !0,
		className: e("w-px shrink-0 bg-border", t ? "mx-0.5 h-5" : "mx-1 h-8")
	});
}
function Qi({ start: t, items: n, media: r = [], moreSections: i = [], onLeave: o, leaveLabel: s = "Leave", leaveMenu: c, compactBelow: l = 960, compact: u, phoneBelow: d = 820, phone: f, labels: p = "tooltip", className: m, "data-testid": h = "meeting-toolbar" }) {
	let g = Oe(), _ = Xi(g.ref, u !== void 0 && f !== void 0), v = f ?? _ < d, y = v || (u ?? _ < l), b = (e) => !e.popover && (v || e.priority === "secondary"), x = y ? n.filter((e) => !b(e)) : n, S = y ? n.filter(b) : [], C = y ? r.filter((e) => e.priority !== "secondary") : r, w = y ? r.filter((e) => e.priority === "secondary") : [], T = v ? [...C.flatMap((e) => e.menu ?? []), ...o ? c ?? [] : []] : [], E = [...S, ...w], D = v ? "phone" : p === "visible" ? "labelled" : "compact", O = D !== "labelled", k = [
		...E.length ? [{
			items: E.map(Yi),
			"data-testid": "meeting-toolbar-more-folded"
		}] : [],
		...T,
		...i
	];
	return /* @__PURE__ */ Q("div", {
		...g,
		role: "toolbar",
		"aria-label": "Meeting controls",
		"data-ui-meeting-toolbar": !0,
		"data-testid": h,
		"data-compact": y ? "true" : void 0,
		"data-layout": v ? "phone" : void 0,
		"data-labels": p,
		className: e("flex items-center border-b border-border bg-surface", v ? "flex-wrap gap-0.5 px-2 pt-1" : D === "compact" ? "min-h-10 gap-0.5 px-2 py-1" : "min-h-16 gap-1 px-3", m),
		children: [
			/* @__PURE__ */ Z("div", {
				className: e("flex min-w-0 items-center overflow-hidden", O ? "gap-2" : "gap-3", v ? "basis-full" : "flex-1"),
				children: t
			}),
			v && /* @__PURE__ */ Z("span", {
				"aria-hidden": !0,
				className: "flex-1"
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex shrink-0 items-center gap-0.5",
				"data-testid": `${h}-items`,
				children: [x.map((e) => /* @__PURE__ */ Z(Ji, {
					item: e,
					look: D
				}, e.id)), k.length > 0 && /* @__PURE__ */ Z(he, {
					trigger: /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(I, { size: 20 }), !O && /* @__PURE__ */ Z(a, {
						size: "xs",
						tone: "inherit",
						className: "leading-tight",
						children: "More"
					})] }),
					triggerLabel: "More",
					triggerVariant: "link",
					triggerClassName: e(qi[D], "gap-0.5 font-normal"),
					triggerTestId: "meeting-toolbar-more",
					align: "end",
					sections: k
				})]
			}),
			C.length > 0 && /* @__PURE__ */ Z(Zi, { compact: O }),
			C.length > 0 && /* @__PURE__ */ Z("div", {
				className: "flex shrink-0 items-center gap-0.5",
				"data-testid": `${h}-media`,
				children: C.map((e) => /* @__PURE__ */ Z(Ji, {
					item: e,
					look: D
				}, e.id))
			}),
			o && /* @__PURE__ */ Z(Zi, { compact: O }),
			o && /* @__PURE__ */ Z(Ji, {
				item: {
					id: "leave",
					label: s,
					icon: /* @__PURE__ */ Z(R, { size: 20 }),
					onClick: o,
					tone: "danger",
					menu: c,
					menuLabel: "Leave options"
				},
				look: D
			})
		]
	});
}
function $i(e, t, n, r, i = []) {
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
function ea(e, t) {
	let n = e == null ? null : typeof e == "number" ? e : Date.parse(e), [r, i] = Y(() => Date.now());
	return K(() => {
		if (!t || n === null || !Number.isFinite(n)) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null || !Number.isFinite(n) ? null : Math.max(0, r - n);
}
function ta({ title: t, recording: n, startedAt: r, elapsedMs: i, onOpenOptions: o, optionsLabel: s = "Meeting options", className: c, "data-testid": l = "meeting-status" }) {
	let d = ea(r, i === void 0), f = i === void 0 ? d : i;
	return /* @__PURE__ */ Q("div", {
		className: e("flex min-w-0 items-center gap-3", c),
		"data-testid": l,
		children: [
			o && /* @__PURE__ */ Z(u, {
				"aria-label": s,
				title: s,
				variant: "ghost",
				size: "sm",
				onClick: o,
				"data-testid": `${l}-options`,
				children: /* @__PURE__ */ Z(We, { size: 18 })
			}),
			n && /* @__PURE__ */ Z(Wr, {
				armed: n.armed,
				active: n.active,
				"data-testid": `${l}-recording`
			}),
			f !== null && /* @__PURE__ */ Z(a, {
				size: "base",
				tone: "primary",
				tabular: !0,
				"data-testid": `${l}-elapsed`,
				"aria-label": `Meeting time ${Le(f)}`,
				children: Le(f)
			}),
			t && /* @__PURE__ */ Z(a, {
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
var na = {
	sourceId: null,
	playing: !1,
	time: 0,
	duration: 0
};
function ra({ source: t, autoPlay: n = !1, onClose: a, onPrevious: o, onNext: s, status: c, emptyLabel: l = "Select audio or video to preview", onStateChange: u, controlRef: d, className: f, "data-testid": p = "media-playback-dock" }) {
	let m = J(u);
	return m.current = u, K(() => {
		t || m.current?.(na);
	}, [t]), /* @__PURE__ */ Z(r, {
		as: "footer",
		gap: "none",
		"aria-label": "Media player",
		className: e("shrink-0 min-w-0 border-t border-border bg-surface", f),
		"data-testid": p,
		children: t ? /* @__PURE__ */ Z(ia, {
			source: t,
			autoPlay: n,
			onClose: a,
			onPrevious: o,
			onNext: s,
			status: c,
			onStateChange: u,
			controlRef: d
		}, `${t.id}:${t.kind}:${t.src}`) : /* @__PURE__ */ Q(i, {
			gap: "md",
			align: "center",
			justify: "between",
			className: "min-h-11 px-4 py-1",
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs text-text-secondary",
				children: l
			}), c]
		})
	});
}
function ia({ source: n, autoPlay: r, onClose: a, onPrevious: o, onNext: s, status: c, onStateChange: l, controlRef: d }) {
	let f = J(null), [p, m] = Y(!1), [h, g] = Y(0), [y, b] = Y(0), [x, S] = Y(1), [w, T] = Y(!1), [O, k] = Y(1), [A, j] = Y(""), [M, N] = Y(!0);
	K(() => {
		let e = f.current;
		return () => {
			e?.pause();
		};
	}, []);
	let P = () => {
		let e = f.current;
		e && (j(""), e.play().catch(() => j("Playback could not start. Try Play again or check the source.")));
	}, F = () => {
		let e = f.current;
		e && (e.paused ? P() : e.pause());
	}, I = (e) => {
		f.current && (f.current.currentTime = e), g(e);
	};
	Ke(d, () => ({
		play: () => {
			f.current?.paused && P();
		},
		pause: () => {
			f.current?.pause();
		},
		toggle: F,
		seek: I
	}));
	let L = J(l);
	L.current = l, K(() => {
		L.current?.({
			sourceId: n.id,
			playing: p,
			time: h,
			duration: y
		});
	}, [
		n.id,
		p,
		h,
		y
	]);
	let R = {
		src: n.src,
		autoPlay: r,
		preload: "metadata",
		"aria-label": n.title,
		"data-testid": "playback-element",
		onPlay: () => m(!0),
		onPause: () => m(!1),
		onEnded: () => m(!1),
		onError: () => {
			m(!1), j("This media could not be loaded. Check the source file and supported format.");
		},
		onTimeUpdate: (e) => g(e.currentTarget.currentTime),
		onDurationChange: (e) => {
			let t = e.currentTarget.duration;
			b(Number.isFinite(t) && t > 0 ? t : 0);
		}
	};
	return /* @__PURE__ */ Q(X, { children: [
		n.kind === "video" ? /* @__PURE__ */ Z("video", {
			...R,
			ref: (e) => {
				f.current = e;
			},
			playsInline: !0,
			hidden: !M,
			className: e("w-full max-h-[40dvh] bg-code-bg object-contain", !M && "hidden")
		}) : /* @__PURE__ */ Z("audio", {
			...R,
			ref: (e) => {
				f.current = e;
			},
			className: "hidden"
		}),
		A && /* @__PURE__ */ Z("p", {
			role: "alert",
			className: "m-0 px-4 py-1 text-xs text-danger-fg",
			children: A
		}),
		/* @__PURE__ */ Q(i, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: "@container min-h-11 min-w-0 px-3 py-1",
			"data-testid": "playback-controls",
			children: [
				/* @__PURE__ */ Q("div", {
					className: e("min-w-0 flex-1 basis-40", a && aa),
					"data-playback-title": "",
					title: n.subtitle ? `${n.title} — ${n.subtitle}` : n.title,
					children: [/* @__PURE__ */ Z("div", {
						className: "truncate text-sm font-semibold text-text-primary",
						children: n.title
					}), n.subtitle && /* @__PURE__ */ Z("div", {
						className: "truncate text-xs text-text-secondary",
						children: n.subtitle
					})]
				}),
				/* @__PURE__ */ Q(i, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: oa,
					children: [
						o && /* @__PURE__ */ Z(u, {
							size: "sm",
							"aria-label": "Previous media",
							icon: /* @__PURE__ */ Z(v, { dir: "left" }),
							onClick: o
						}),
						/* @__PURE__ */ Z(u, {
							size: "sm",
							variant: "primary",
							"aria-label": p ? "Pause" : "Play",
							icon: Z(p ? E : D, { size: 16 }),
							onClick: F
						}),
						s && /* @__PURE__ */ Z(u, {
							size: "sm",
							"aria-label": "Next media",
							icon: /* @__PURE__ */ Z(v, { dir: "right" }),
							onClick: s
						})
					]
				}),
				/* @__PURE__ */ Q(i, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: e("min-w-40 flex-1 basis-48", oa),
					children: [
						/* @__PURE__ */ Z("span", {
							className: "text-xs tabular-nums text-text-secondary",
							children: mi(h)
						}),
						/* @__PURE__ */ Z(me, {
							"aria-label": "Seek media",
							value: Math.min(h, y),
							min: 0,
							max: y || 1,
							step: .1,
							readout: !1,
							disabled: !y,
							className: "min-w-0 flex-1",
							onChange: I
						}),
						/* @__PURE__ */ Z("span", {
							className: "text-xs tabular-nums text-text-secondary",
							children: mi(y)
						})
					]
				}),
				/* @__PURE__ */ Q(i, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: oa,
					children: [
						/* @__PURE__ */ Z(u, {
							size: "sm",
							"aria-label": w ? "Unmute" : "Mute",
							"aria-pressed": w,
							icon: /* @__PURE__ */ Z(C, { size: 16 }),
							onClick: () => {
								f.current && (f.current.muted = !w), T(!w);
							}
						}),
						/* @__PURE__ */ Z(me, {
							"aria-label": "Volume",
							value: x,
							max: 1,
							step: .05,
							readout: !1,
							className: "w-16",
							onChange: (e) => {
								f.current && (f.current.volume = e), S(e);
							}
						}),
						/* @__PURE__ */ Z(U, {
							"aria-label": "Playback speed",
							value: String(O),
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
								f.current && (f.current.playbackRate = t), k(t);
							}
						})
					]
				}),
				n.kind === "video" && /* @__PURE__ */ Z(t, {
					size: "sm",
					variant: "ghost",
					className: oa,
					onClick: () => N(!M),
					"aria-expanded": M,
					children: M ? "Hide video" : "Show video"
				}),
				a && /* @__PURE__ */ Z(u, {
					size: "sm",
					"aria-label": "Close player",
					icon: /* @__PURE__ */ Z(_, {}),
					onClick: a,
					className: "shrink-0 @max-2xl:order-1",
					"data-playback-close": ""
				}),
				c && /* @__PURE__ */ Z("span", {
					className: e("min-w-0", oa),
					children: c
				})
			]
		})
	] });
}
var aa = "@max-2xl:basis-[calc(100%-var(--ui-control-sm,1.75rem)-0.75rem)]", oa = "@max-2xl:order-2";
function sa(e = null) {
	let [t, n] = Y(e), [r, i] = Y(!1), [a, o] = Y(na), s = J(null), c = J(null), l = G((e) => {
		o((t) => t.sourceId === e.sourceId && t.playing === e.playing && t.time === e.time && t.duration === e.duration ? t : e);
		let t = c.current;
		t && e.sourceId === t.id && e.duration > 0 && (c.current = null, s.current?.seek(t.seconds));
	}, []), u = G((e, t) => {
		i(t), n(e);
	}, []), d = G(() => {
		n(null), i(!1);
	}, []);
	return {
		source: t,
		state: a,
		play: (e) => u(e, !0),
		load: (e) => u(e, !1),
		close: d,
		controllerFor: G((e) => {
			let t = a.sourceId === e.id;
			return {
				playing: t && a.playing,
				time: t ? a.time : 0,
				duration: t && a.duration > 0 ? a.duration : void 0,
				onToggle: () => {
					t ? s.current?.toggle() : u(e, !0);
				},
				onSeek: (n) => {
					t ? s.current?.seek(n) : (c.current = {
						id: e.id,
						seconds: n
					}, u(e, !1));
				}
			};
		}, [a, u]),
		controlRef: s,
		dockProps: q(() => ({
			source: t,
			autoPlay: r,
			onStateChange: l,
			controlRef: s,
			onClose: d
		}), [
			t,
			r,
			l,
			d
		])
	};
}
//#endregion
export { ln as $, Ur as A, Qn as B, mi as C, Je as Ct, ai as D, si as E, Cr as F, Fn as G, Wn as H, Sr as I, Dn as J, Pn as K, pr as L, Vr as M, Ir as N, ti as O, Or as P, gn as Q, rr as R, hi as S, Xe as St, di as T, zn as U, Yn as V, Ln as W, xn as X, En as Y, bn as Z, Di as _, dt as _t, Qi as a, Gt as at, xi as b, nt as bt, Ui as c, Ht as ct, Li as d, It as dt, Jt as et, Fi as f, Pt as ft, Ai as g, gt, ji as h, bt as ht, Ki as i, cn as it, Wr as j, Jr as k, Vi as l, Rt as lt, Mi as m, Dt as mt, sa as n, Xt as nt, $i as o, Ut as ot, Ni as p, jt as pt, Nn as q, ta as r, Yt as rt, Wi as s, Wt as st, ra as t, Zt as tt, Ri as u, Ft as ut, Ei as v, st as vt, pi as w, bi as x, et as xt, Ci as y, ot as yt, tr as z };
