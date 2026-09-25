import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-B_FZn2OW.js";
import { t as n } from "./ActivityFeed-BotodCTS.js";
import { useCallback as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/video/ParticipantTile.tsx
function u({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, isLocal: o = !1, isSpotlight: s = !1, videoElement: u, onClick: p, fillParent: m = !1, className: h, style: g }) {
	let _ = o ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ l("div", {
		className: e("relative bg-video-tile flex items-center justify-center rounded overflow-hidden border-2 transition-colors", m ? "w-full h-full" : "aspect-video", i ? "border-success" : "border-transparent", p && "cursor-pointer hover:border-white/30", h),
		style: g,
		onClick: p,
		role: p ? "button" : void 0,
		tabIndex: p ? 0 : void 0,
		onKeyDown: p ? (e) => {
			(e.key === "Enter" || e.key === " ") && p();
		} : void 0,
		"data-testid": _,
		"data-peer-id": t,
		"data-peer-name": n,
		"data-is-local": o ? "true" : "false",
		"data-is-spotlight": s ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-track-kind": u ? "camera" : "avatar",
		children: [
			u ?? /* @__PURE__ */ c("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: f(n) },
				children: /* @__PURE__ */ c("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", s ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ c("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : d(n)
				})
			}),
			/* @__PURE__ */ l("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					o && /* @__PURE__ */ c("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!o && /* @__PURE__ */ c("span", {
						className: "truncate font-medium",
						children: n
					}),
					a && /* @__PURE__ */ c("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ c("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ c("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", s ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ l("svg", {
					width: s ? 16 : 12,
					height: s ? 16 : 12,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": !0,
					children: [
						/* @__PURE__ */ c("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ c("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ c("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ c("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ c("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ c("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function d(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function f(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function p(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function m({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!p(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ l("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ l("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ c("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ c("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ l("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function h({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: o = !1, pipWidth: s = 96, className: d, style: f }) {
	let p = t.length, m = !!n && p === 0, h = !!n && p >= 2, _ = !!n && p === 1, v = a(() => {
		if (m && n) return [{
			...n,
			isLocal: !0
		}];
		let e = [...t];
		return h && n && e.push({
			...n,
			isLocal: !0
		}), e;
	}, [
		t,
		m,
		h,
		n
	]), y = g(v.length), b = Math.max(1, Math.ceil(v.length / y));
	return /* @__PURE__ */ l("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", o && "h-full w-full", d),
		style: {
			gridTemplateColumns: `repeat(${y}, 1fr)`,
			...o ? { gridTemplateRows: `repeat(${b}, 1fr)` } : {},
			...f
		},
		children: [
			v.map((e) => /* @__PURE__ */ c(u, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === r,
				isMuted: e.isMuted,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: o,
				onClick: i ? () => i(e.id) : void 0
			}, e.id)),
			v.length === 0 && /* @__PURE__ */ c("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", o ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			_ && n && /* @__PURE__ */ c("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: s },
				children: /* @__PURE__ */ c(u, {
					id: n.id,
					displayName: n.displayName,
					avatarUrl: n.avatarUrl,
					isMuted: n.isMuted,
					isLocal: !0,
					videoElement: n.videoElement
				})
			})
		]
	});
}
function g(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function _({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: o = null, speakerHysteresisMs: s = 750, onParticipantClick: d, fillParent: f = !1, filmstripTileWidth: p = 128, className: m, style: h }) {
	let g = v(o, s), _ = a(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), y = a(() => {
		let e = r || _ ? null : g, i = t.filter((t) => t.id !== e);
		return n && i.push({
			...n,
			isLocal: !0
		}), i;
	}, [
		t,
		g,
		n,
		r,
		_
	]), b = (g ? t.find((e) => e.id === g) ?? null : null) ?? t[0] ?? n ?? null, x, S, C = null;
	return r ? (x = "screen", S = i ?? b?.displayName ?? "", C = r) : _ ? (x = "screen", S = _.displayName, C = _.screenElement) : b ? (x = "camera", S = b.displayName, C = /* @__PURE__ */ c(u, {
		id: b.id,
		displayName: b.displayName,
		avatarUrl: b.avatarUrl,
		isMuted: b.isMuted,
		isLocal: b.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: b.videoElement,
		className: "w-full h-full"
	})) : (x = "camera", S = ""), /* @__PURE__ */ l("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", f && "h-full w-full", m),
		style: h,
		children: [/* @__PURE__ */ c("div", {
			className: e("bg-black relative", f ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": x,
			"data-spotlight-user": S,
			children: C
		}), y.length > 0 && /* @__PURE__ */ c("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: y.map((e) => /* @__PURE__ */ c("div", {
				className: "shrink-0",
				style: { width: p },
				children: /* @__PURE__ */ c(u, {
					id: e.id,
					displayName: e.displayName,
					avatarUrl: e.avatarUrl,
					isMuted: e.isMuted,
					isLocal: e.isLocal,
					videoElement: e.videoElement,
					onClick: d ? () => d(e.id) : void 0
				})
			}, e.id))
		})]
	});
}
function v(e, t) {
	let [n, r] = s(e ?? null);
	return i(() => {
		let i = e ?? null;
		if (t <= 0) {
			r(i);
			return;
		}
		if (i === n) return;
		let a = setTimeout(() => r(i), t);
		return () => clearTimeout(a);
	}, [
		e,
		t,
		n
	]), n;
}
//#endregion
//#region src/components/video/HangoutLayout.tsx
var y = 10;
function b({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: l = !1, pipWidth: u, filmstripTileWidth: d, className: f, style: p }) {
	let m = e.length + +!!t, g = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || g || n === "auto" && m >= y ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ c(_, {
		participants: e,
		localParticipant: t,
		spotlightContent: a,
		spotlightContentLabel: o,
		activeSpeakerId: r,
		speakerHysteresisMs: i,
		onParticipantClick: s,
		fillParent: l,
		filmstripTileWidth: d,
		className: f,
		style: p
	}) : /* @__PURE__ */ c(h, {
		participants: e,
		localParticipant: t,
		activeSpeakerId: r,
		onParticipantClick: s,
		fillParent: l,
		pipWidth: u,
		className: f,
		style: p
	});
}
//#endregion
//#region src/lib/video/useTrackStateBump.ts
function x(e, t) {
	let [n, r] = s(0);
	return i(() => {
		if (!e) return;
		let n = (e, n) => {
			console.info("[useTrackStateBump] remote track", e, {
				participant: t,
				kind: n.kind,
				enabled: n.enabled,
				muted: n.muted,
				readyState: n.readyState,
				id: n.id
			}), r((e) => e + 1);
		}, i = (e) => n("mute", e.target), a = (e) => n("unmute", e.target), o = (e) => n("ended", e.target), s = /* @__PURE__ */ new Set(), c = (e) => {
			!e || typeof e.addEventListener != "function" || s.has(e) || (s.add(e), e.addEventListener("mute", i), e.addEventListener("unmute", a), e.addEventListener("ended", o));
		};
		if (typeof e.getVideoTracks == "function") for (let t of e.getVideoTracks()) c(t);
		let l = (e) => {
			let t = e.track;
			t && t.kind === "video" && c(t), r((e) => e + 1);
		}, u = () => r((e) => e + 1), d = typeof e.addEventListener == "function";
		return d && (e.addEventListener("addtrack", l), e.addEventListener("removetrack", u)), () => {
			for (let e of s) e.removeEventListener("mute", i), e.removeEventListener("unmute", a), e.removeEventListener("ended", o);
			s.clear(), d && (e.removeEventListener("addtrack", l), e.removeEventListener("removetrack", u));
		};
	}, [e, t]), n;
}
function S(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function C({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: a }) {
	let s = o(null), l = o(a);
	return l.current = a, i(() => {
		let t = s.current;
		if (!t) return;
		t.srcObject !== e && (t.srcObject = e), n && (n.current = t);
		let r = (t) => {
			typeof e?.getTracks == "function" && console.info(`[StreamVideo] ${t}`, {
				streamId: e.id,
				tracks: e.getTracks().map((e) => ({
					kind: e.kind,
					id: e.id,
					ready: e.readyState,
					muted: e.muted,
					enabled: e.enabled
				}))
			});
		};
		r("bind");
		let i = (e) => {
			l.current?.(e);
		}, a = () => i("playing"), o = () => i("ended"), c = () => {
			t.ended && i("ended");
		}, u = () => {
			let e = t.play();
			e && typeof e.catch == "function" && e.catch((e) => {
				e?.name === "NotAllowedError" && i("paused-by-autoplay");
			});
		}, d = (n) => {
			r(`stream ${n.type}`), t.srcObject = null, t.srcObject = e, u();
		};
		t.addEventListener("play", a), t.addEventListener("ended", o), t.addEventListener("pause", c);
		let f = typeof e?.addEventListener == "function";
		return f && (e.addEventListener("addtrack", d), e.addEventListener("removetrack", d)), u(), () => {
			t.removeEventListener("play", a), t.removeEventListener("ended", o), t.removeEventListener("pause", c), f && (e.removeEventListener("addtrack", d), e.removeEventListener("removetrack", d)), n && n.current === t && (n.current = null);
		};
	}, [e, n]), /* @__PURE__ */ c("video", {
		ref: s,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function w({ stream: e }) {
	let t = o(null);
	return i(() => {
		let n = t.current;
		if (!n) return;
		if (!e) {
			n.srcObject &&= null;
			return;
		}
		n.srcObject !== e && (n.srcObject = e);
		let r = n.play();
		return r && typeof r.catch == "function" && r.catch(() => {}), () => {
			n.pause(), n.srcObject = null;
		};
	}, [e]), /* @__PURE__ */ c("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function T({ stream: e, displayName: n, cameraOn: r, avatarSize: i = 96 }) {
	x(e, n);
	let a = S(e);
	return !r || !a || !e ? /* @__PURE__ */ l("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ c(t, {
			name: n,
			size: i
		}), e && /* @__PURE__ */ c(w, { stream: e })]
	}) : /* @__PURE__ */ c(C, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function E({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ c("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function D({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ l("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ c("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function O({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ l("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ c("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ c("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function k({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p = !1, compact: m = !1, className: h, "data-testid": g }) {
	return /* @__PURE__ */ l("div", {
		"data-testid": g,
		className: e("flex flex-col text-white", m ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", h),
		children: [
			/* @__PURE__ */ c(O, {
				label: "Filters",
				compact: m,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ c(D, {
						label: e.label,
						active: t,
						disabled: p,
						compact: m,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ l(O, {
				label: "Background",
				compact: m,
				children: [
					/* @__PURE__ */ c(D, {
						label: "None",
						active: a === "none",
						disabled: p,
						compact: m,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ c(D, {
						label: "Blur",
						active: a === "blur",
						disabled: p,
						compact: m,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ c(D, {
							label: e.label,
							active: t,
							disabled: p,
							compact: m,
							onClick: () => t ? s("none", null) : s("image", e.url),
							thumbUrl: e.url,
							"data-testid": `effects-bg-${e.id}`
						}, e.id);
					})
				]
			}),
			/* @__PURE__ */ l(O, {
				label: "Face FX",
				compact: m,
				children: [/* @__PURE__ */ c(D, {
					label: "None",
					active: d === null,
					disabled: p,
					compact: m,
					onClick: () => f(null),
					"data-testid": "effects-face-none"
				}), u.map((e) => {
					let t = e.id === d;
					return /* @__PURE__ */ c(D, {
						label: e.label,
						active: t,
						disabled: p,
						compact: m,
						onClick: () => f(t ? null : e.id),
						"data-testid": `effects-face-${e.id}`
					}, e.id);
				})]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function A(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function j({ previewActive: t, previewStream: n, isDirty: r, onApply: i, onCancel: a, filters: o, activeFilterId: s, onSelectFilter: u, backgrounds: d, backgroundMode: f, activeBackgroundUrl: p, onSelectBackground: m, faceSprites: h, activeFaceSpriteId: g, onSelectFaceSprite: _, disabled: v = !1, title: y = "Video effects", applyLabel: b = "Apply", className: x, "data-testid": S = "media-effects-preview-panel" }) {
	let w = (e) => A(t, e), T = t && r && !v;
	return /* @__PURE__ */ l("section", {
		"data-testid": S,
		"data-preview-active": t ? "true" : "false",
		"data-preview-dirty": r ? "true" : "false",
		"aria-label": y,
		className: e("flex flex-col gap-3 text-white", x),
		children: [
			/* @__PURE__ */ l("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [n ? /* @__PURE__ */ c("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ c(C, {
						stream: n,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ l("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ c("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), t ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ c("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ c("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: t ? `This preview is private. Nobody else in the call can see these effects until you choose ${b}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ c(k, {
				"data-testid": "media-effects-preview-tray",
				disabled: v || !t,
				filters: o,
				activeFilterId: s,
				onSelectFilter: w(u),
				backgrounds: d,
				backgroundMode: f,
				activeBackgroundUrl: p,
				onSelectBackground: w(m),
				faceSprites: h,
				activeFaceSpriteId: g,
				onSelectFaceSprite: w(_)
			}),
			/* @__PURE__ */ l("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ c("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: r ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ c("button", {
						type: "button",
						onClick: a,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ c("button", {
						type: "button",
						onClick: i,
						disabled: !T,
						"data-testid": "media-effects-preview-apply",
						className: e("rounded-lg border-none px-4 py-1.5 text-[13px] font-semibold transition-colors", T ? "cursor-pointer bg-call-chrome-accent text-white hover:bg-call-chrome-accent-hover" : "cursor-not-allowed bg-white/10 text-white/40"),
						children: b
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/video/useHlsSource.ts
var ee = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function te(e) {
	return e ? ee[e.kind] : null;
}
function M(e) {
	let t = typeof e?.response?.code == "number" ? e.response.code : null, n = [
		e?.details,
		e?.type,
		t ? `HTTP ${t}` : null
	].filter(Boolean).join(" / ") || "unknown hls.js error";
	return e?.type === "mediaError" ? {
		kind: "media",
		status: t,
		detail: n,
		retryable: !0
	} : e?.type === "networkError" || t !== null ? t === 404 || t === 410 || t === 503 ? {
		kind: "no-broadcast",
		status: t,
		detail: n,
		retryable: !0
	} : t === null ? {
		kind: "network",
		status: t,
		detail: n,
		retryable: !0
	} : {
		kind: "server",
		status: t,
		detail: n,
		retryable: !0
	} : {
		kind: "other",
		status: t,
		detail: n,
		retryable: !0
	};
}
var N = 3e3, ne = 1e3, P = 1500, F = 8e3, I = .5;
function re(e, t, n = {}) {
	let { live: a = !1, stalledAfterMs: c = F } = n, [l, u] = s(null), d = te(l), [f, p] = s(!1), [m, h] = s(!1), [g, _] = s(!1), [v, y] = s(null), [b, x] = s(null), [S, C] = s(0), w = o(null), T = o(!1), E = o(0), D = o(n.onError);
	i(() => {
		D.current = n.onError;
	}, [n.onError]);
	let O = r(() => {
		u(null), h(!1), _(!1), C((e) => e + 1);
	}, []), k = r(() => {
		let t = e.current;
		if (t) try {
			let e = w.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return i(() => {
		let n = e.current;
		if (!n || !t) return;
		u(null), p(!0), y(null), x(null);
		let r = !1, i = () => n.canPlayType("application/vnd.apple.mpegurl") ? (n.src = t, T.current = !0, !0) : (u({
			kind: "unsupported",
			status: null,
			detail: "no MSE (hls.js isSupported() false) and canPlayType() rejects application/vnd.apple.mpegurl",
			retryable: !1
		}), p(!1), !1);
		return (async () => {
			try {
				let e = (await import(
					/* @vite-ignore */
					"hls.js"
)).default;
				if (r) return;
				if (!e.isSupported()) {
					i();
					return;
				}
				let o = new e(a ? {
					enableWorker: !0,
					lowLatencyMode: !0,
					backBufferLength: 30
				} : { enableWorker: !0 });
				w.current = o, o.attachMedia(n), o.on(e.Events.MEDIA_ATTACHED, () => o.loadSource(t)), o.on(e.Events.ERROR, (e, n) => {
					if (n?.fatal) {
						let e = M(n);
						u(e), console.error("[useHlsSource] playback failed:", e.kind, e.detail, t), D.current?.(/* @__PURE__ */ Error(`HLS fatal: ${e.detail}`));
					}
				});
			} catch (e) {
				if (r) return;
				i() || u({
					kind: "unsupported",
					status: null,
					detail: `hls.js failed to load — install it in the consumer app: ${e?.message ?? e}`,
					retryable: !1
				});
			}
		})(), () => {
			if (r = !0, w.current) {
				try {
					w.current.destroy();
				} catch {}
				w.current = null;
			}
			T.current && (T.current = !1, n.removeAttribute("src"), n.load());
		};
	}, [
		e,
		t,
		a,
		S
	]), i(() => {
		let n = e.current;
		if (!n || !t) return;
		n.readyState >= 2 && p(!1);
		let r = () => {
			n.readyState < 1 || y(n.videoWidth === 0 && n.videoHeight === 0);
		}, i = () => {
			p(!1), r();
		}, o = () => {
			if (!a) return;
			h(!0);
			let e = Date.now();
			if (!(e - E.current < N)) {
				E.current = e;
				try {
					w.current ? w.current.startLoad() : T.current && (n.src = t, n.load()), n.play().catch(() => {});
				} catch {}
			}
		}, s = () => h(!0), c = () => u({
			kind: "media",
			status: null,
			detail: `<video> error event; networkState=${n.networkState} readyState=${n.readyState}`,
			retryable: !0
		}), l = [
			"loadeddata",
			"playing",
			"canplay"
		];
		return l.forEach((e) => n.addEventListener(e, i)), n.addEventListener("loadedmetadata", r), n.addEventListener("resize", r), n.addEventListener("waiting", s), n.addEventListener("error", c), n.addEventListener("ended", o), () => {
			l.forEach((e) => n.removeEventListener(e, i)), n.removeEventListener("loadedmetadata", r), n.removeEventListener("resize", r), n.removeEventListener("waiting", s), n.removeEventListener("error", c), n.removeEventListener("ended", o);
		};
	}, [
		e,
		t,
		a,
		S
	]), i(() => {
		if (!t) {
			h(!1), _(!1), x(null);
			return;
		}
		let n = e.current;
		if (!n) return;
		let r = NaN, i = Date.now(), a = () => {
			let e = null, t = w.current;
			if (t && typeof t.latency == "number" && Number.isFinite(t.latency) && t.latency > 0) e = t.latency;
			else if (n.seekable && n.seekable.length > 0) {
				let t = n.seekable.end(n.seekable.length - 1);
				Number.isFinite(t) && (e = Math.max(0, t - n.currentTime));
			}
			x((t) => {
				if (e === null) return t === null ? t : null;
				let n = Math.round(e * 10) / 10;
				return t !== null && Math.abs(t - n) < I ? t : n;
			});
		}, o = setInterval(() => {
			a();
			let e = Date.now(), t = n.currentTime;
			if (t !== r) {
				r = t, i = e, h(!1), _(!1);
				return;
			}
			if (!(!n.paused || n.ended)) return;
			let o = e - i;
			o >= c ? _(!0) : o >= P && h(!0);
		}, ne);
		return () => clearInterval(o);
	}, [
		e,
		t,
		a,
		S,
		c
	]), {
		error: d,
		failure: l,
		loading: f,
		phase: t ? d ? "error" : f ? "connecting" : g ? "stalled" : m ? "buffering" : "playing" : "idle",
		audioOnly: v,
		latencySec: b,
		seekToLive: k,
		retry: O
	};
}
//#endregion
//#region src/lib/video/useAudioLevel.ts
var L = 80, R = .6;
function ie(e) {
	let [t, n] = s(null), r = o(0);
	return i(() => {
		if (r.current = 0, n(null), !e || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0) return;
		let t = typeof window > "u" ? void 0 : window.AudioContext ?? window.webkitAudioContext;
		if (!t) return;
		let i, a, o;
		try {
			i = new t(), o = i.createAnalyser(), o.fftSize = 256, a = i.createMediaStreamSource(e), a.connect(o);
		} catch {
			return;
		}
		i.resume?.().catch(() => {});
		let s = new Uint8Array(o.frequencyBinCount), c = setInterval(() => {
			if (i.state !== "running") {
				n(null);
				return;
			}
			o.getByteTimeDomainData(s);
			let e = 0;
			for (let t = 0; t < s.length; t++) {
				let n = (s[t] - 128) / 128;
				e += n * n;
			}
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * R);
			r.current = c, n(c);
		}, L);
		return () => {
			clearInterval(c);
			try {
				a.disconnect();
			} catch {}
			try {
				o.disconnect();
			} catch {}
			try {
				i.close?.();
			} catch {}
		};
	}, [e]), t;
}
//#endregion
//#region src/components/video/StreamAudioOnly.tsx
var ae = [
	.55,
	.8,
	1,
	.8,
	.55
], z = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], B = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], oe = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function V(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return z[Math.min(z.length - 1, Math.round(n * (z.length - 1)))];
}
function se({ name: n, avatarUrl: r, level: i = null, active: a = !1, muted: o = !1, hint: s, className: u, "data-testid": d = "stream-audio-only" }) {
	let f = typeof i == "number" && a, p = s ?? (o ? "Audio only — unmute to hear it." : a ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ l("div", {
		"data-testid": d,
		"data-measured": String(f),
		"data-active": String(a),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", u),
		children: [
			n ? /* @__PURE__ */ c(t, {
				name: n,
				src: r,
				size: 64
			}) : /* @__PURE__ */ c("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ l("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ c("span", {
					className: "text-sm font-medium text-white",
					children: n ?? "Audio only"
				}), /* @__PURE__ */ c("span", {
					"data-testid": `${d}-hint`,
					className: "text-xs text-white/60",
					children: p
				})]
			}),
			/* @__PURE__ */ c("div", {
				"data-testid": `${d}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: ae.map((t, n) => /* @__PURE__ */ c("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", a ? "bg-white/80" : "bg-white/25", !f && a && ["uic-audio-bar", oe[n]], f ? V(i, t) : B[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function ce({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function le(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function H(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function U(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function ue({ messages: t, visibleCount: r = 3, rotateMs: i = 4200, window: o = 20, className: s, "data-testid": l = "stream-chat-ticker" }) {
	let u = a(() => t.slice(-o).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: U(e.timestamp),
		kind: "comment"
	})), [t, o]);
	return u.length === 0 ? null : /* @__PURE__ */ c("div", {
		"data-testid": l,
		className: e("pointer-events-none max-w-sm", s),
		children: /* @__PURE__ */ c(n, {
			items: u,
			visibleCount: r,
			rotateMs: i,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var de = 1e4;
function fe(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !S(e);
}
var W = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function pe({ stream: t = null, playlistUrl: n = null, onPlaybackError: u, onRetry: d, title: f, viewerCount: h, live: g = !1, audioOnly: _, speakerName: v, speakerAvatarUrl: y, notStartedLabel: b, endedLabel: S, stallAfterMs: w = de, chatMessages: T, chatVisibleCount: E, chatRotateMs: D, muted: O = !0, allowFullscreen: k = !0, showLatency: A = !0, controls: j, placeholder: ee, className: te, "data-testid": M = "stream-stage" }) {
	let [N, ne] = s(O);
	i(() => {
		ne(O);
	}, [O]);
	let P = o(null), F = o(null), I = re(F, t ? null : n, {
		live: !0,
		onError: u
	}), L = o(!1);
	(t || n) && (L.current = !0);
	let R = x(t && typeof t.getVideoTracks == "function" ? t : null, f ?? "stream"), ae = a(() => fe(t), [t, R]), z = a(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, R]), B = !!t && z !== !1 || !!n && !I.loading, [oe, V] = s(!1);
	i(() => {
		if (V(!1), B || I.error) return;
		let e = setTimeout(() => V(!0), w);
		return () => clearTimeout(e);
	}, [
		B,
		I.error,
		w
	]);
	let H = ce({
		hasStream: !!t,
		streamHasTracks: z,
		hasPlaylist: !!n,
		hadSource: L.current,
		graceExpired: oe,
		hls: I
	}), U = I.failure ?? null, pe = o(!1);
	H === "playing" && (pe.current = !0);
	let q = H === "error" && U?.kind === "no-broadcast" ? pe.current ? "ended" : "not-started" : H, J = q === "ended" ? H === "ended" ? "withdrawn" : "stopped" : null, Y = g && le(q), me = t ? ae : I.audioOnly === !0, he = (_ ?? me) && (q === "playing" || q === "buffering" || q === "stalled"), ge = ie(he && t ? t : null), [X, _e] = s(!1);
	i(() => {
		if (typeof document > "u") return;
		let e = () => _e(document.fullscreenElement === P.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let ve = r(() => {
		let e = P.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), ye = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), be = I.retry, Z = r(() => {
		be?.(), d?.();
	}, [be, d]), xe = !!(t || n), Se = !!n && !t, Q = xe && q !== "error" && q !== "not-started" && q !== "ended", Ce = Q || !!j, we = !U || U.retryable, $ = (Se || !!d) && we, Te = U?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ l("div", {
		ref: P,
		"data-testid": M,
		"data-live": String(Y),
		"data-phase": q,
		"data-audio-only": String(he),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": U?.kind,
		"data-error-detail": U?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", te),
		children: [
			t ? /* @__PURE__ */ c(C, {
				stream: t,
				muted: N,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ c("video", {
				ref: F,
				"data-testid": `${M}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: N,
				className: "h-full w-full object-contain"
			}) : null,
			he && /* @__PURE__ */ c(se, {
				"data-testid": `${M}-audio-only`,
				name: v,
				avatarUrl: y,
				level: ge,
				active: q !== "stalled" && !N,
				muted: N
			}),
			q === "idle" && /* @__PURE__ */ c(G, {
				testId: `${M}-placeholder`,
				children: ee ?? "Waiting for the stream to start…"
			}),
			q === "ended" && /* @__PURE__ */ l(G, {
				testId: `${M}-ended`,
				"data-ended-reason": J,
				children: [
					/* @__PURE__ */ c("span", { children: S ?? (J === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					J === "stopped" && !S && /* @__PURE__ */ c("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					J === "stopped" ? $ && /* @__PURE__ */ c(K, {
						testId: `${M}-retry`,
						label: "Try again",
						onClick: Z
					}) : d && /* @__PURE__ */ c(K, {
						testId: `${M}-retry`,
						label: "Check again",
						onClick: Z
					})
				]
			}),
			q === "not-started" && /* @__PURE__ */ l(G, {
				testId: `${M}-not-started`,
				children: [/* @__PURE__ */ c("span", { children: b ?? "Nothing is being broadcast right now." }), $ && /* @__PURE__ */ c(K, {
					testId: `${M}-retry`,
					label: Te,
					onClick: Z
				})]
			}),
			q === "connecting" && /* @__PURE__ */ c(G, {
				testId: `${M}-connecting`,
				children: "Connecting…"
			}),
			q === "buffering" && /* @__PURE__ */ c("div", {
				"data-testid": `${M}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			q === "stalled" && /* @__PURE__ */ l(G, {
				testId: `${M}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ c("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ c("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					$ && /* @__PURE__ */ c(K, {
						testId: `${M}-retry`,
						onClick: Z
					})
				]
			}),
			q === "error" && /* @__PURE__ */ l(G, {
				testId: `${M}-error`,
				dim: !0,
				children: [/* @__PURE__ */ c("span", { children: I.error ?? "This stream could not be played." }), $ && /* @__PURE__ */ c(K, {
					testId: `${M}-retry`,
					label: Te,
					onClick: Z
				})]
			}),
			(f || Y || p(h)) && /* @__PURE__ */ l("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					Y && /* @__PURE__ */ c("span", {
						"data-testid": `${M}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					f && /* @__PURE__ */ c("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: f
					}),
					p(h) && /* @__PURE__ */ c(m, { count: h })
				]
			}),
			T && T.length > 0 && /* @__PURE__ */ c(ue, {
				messages: T,
				visibleCount: E,
				rotateMs: D,
				className: "absolute bottom-3 left-3",
				"data-testid": `${M}-chat`
			}),
			Ce && /* @__PURE__ */ l("div", {
				"data-testid": `${M}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					Q && Se && A && (q === "playing" || q === "buffering") && /* @__PURE__ */ c("button", {
						type: "button",
						"data-testid": `${M}-latency`,
						onClick: () => I.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(W, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof I.latencySec == "number" && Number.isFinite(I.latencySec) ? `${Math.max(1, Math.round(I.latencySec))}s behind` : "Behind live"
					}),
					Q && Y && /* @__PURE__ */ l("button", {
						type: "button",
						"data-testid": `${M}-mute-toggle`,
						"aria-label": N ? "Unmute" : "Mute",
						"aria-pressed": N,
						onClick: () => ne((e) => !e),
						className: e(W, N ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ c("span", {
							"aria-hidden": !0,
							children: N ? "🔇" : "🔊"
						}), N ? "Unmute" : "Mute"]
					}),
					Q && k && ye && /* @__PURE__ */ l("button", {
						type: "button",
						"data-testid": `${M}-fullscreen`,
						"aria-label": X ? "Exit full screen" : "Full screen",
						"aria-pressed": X,
						onClick: ve,
						className: e(W, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ c("span", {
							"aria-hidden": !0,
							children: X ? "↙" : "↗"
						}), X ? "Exit" : "Full screen"]
					}),
					j
				]
			})
		]
	});
}
function G({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ c("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function K({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ c("button", {
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(W, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
export { g as C, u as E, h as S, p as T, S as _, H as a, _ as b, ie as c, j as d, A as f, C as g, T as h, le as i, te as l, E as m, fe as n, ce as o, k as p, ue as r, se as s, pe as t, re as u, x as v, m as w, v as x, b as y };
