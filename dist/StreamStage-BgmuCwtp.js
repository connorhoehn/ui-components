import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./ActivityFeed-BvBfBfGZ.js";
import { useEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/video/ParticipantTile.tsx
function l({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, isLocal: o = !1, isSpotlight: l = !1, videoElement: f, onClick: p, fillParent: m = !1, className: h, style: g }) {
	let _ = o ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ c("div", {
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
		"data-is-spotlight": l ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-track-kind": f ? "camera" : "avatar",
		children: [
			f ?? /* @__PURE__ */ s("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: d(n) },
				children: /* @__PURE__ */ s("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", l ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ s("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : u(n)
				})
			}),
			/* @__PURE__ */ c("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					o && /* @__PURE__ */ s("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!o && /* @__PURE__ */ s("span", {
						className: "truncate font-medium",
						children: n
					}),
					a && /* @__PURE__ */ s("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ s("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ s("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", l ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ c("svg", {
					width: l ? 16 : 12,
					height: l ? 16 : 12,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": !0,
					children: [
						/* @__PURE__ */ s("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ s("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ s("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ s("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ s("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ s("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function u(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function d(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function f({ count: t, className: n, style: r }) {
	let i = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ c("div", {
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ c("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			children: [/* @__PURE__ */ s("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ s("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ c("span", { children: [i, " watching"] })]
	});
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function p({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: a, fillParent: o = !1, pipWidth: u = 96, className: d, style: f }) {
	let p = t.length, h = !!n && p === 0, g = !!n && p >= 2, _ = !!n && p === 1, v = i(() => {
		if (h && n) return [{
			...n,
			isLocal: !0
		}];
		let e = [...t];
		return g && n && e.push({
			...n,
			isLocal: !0
		}), e;
	}, [
		t,
		h,
		g,
		n
	]), y = m(v.length), b = Math.max(1, Math.ceil(v.length / y));
	return /* @__PURE__ */ c("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", o && "h-full w-full", d),
		style: {
			gridTemplateColumns: `repeat(${y}, 1fr)`,
			...o ? { gridTemplateRows: `repeat(${b}, 1fr)` } : {},
			...f
		},
		children: [
			v.map((e) => /* @__PURE__ */ s(l, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === r,
				isMuted: e.isMuted,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: o,
				onClick: a ? () => a(e.id) : void 0
			}, e.id)),
			v.length === 0 && /* @__PURE__ */ s("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", o ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			_ && n && /* @__PURE__ */ s("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: u },
				children: /* @__PURE__ */ s(l, {
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
function m(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function h({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: a, activeSpeakerId: o = null, speakerHysteresisMs: u = 750, onParticipantClick: d, fillParent: f = !1, filmstripTileWidth: p = 128, className: m, style: h }) {
	let _ = g(o, u), v = i(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), y = i(() => {
		let e = r || v ? null : _, i = t.filter((t) => t.id !== e);
		return n && i.push({
			...n,
			isLocal: !0
		}), i;
	}, [
		t,
		_,
		n,
		r,
		v
	]), b = (_ ? t.find((e) => e.id === _) ?? null : null) ?? t[0] ?? n ?? null, x, S, C = null;
	return r ? (x = "screen", S = a ?? b?.displayName ?? "", C = r) : v ? (x = "screen", S = v.displayName, C = v.screenElement) : b ? (x = "camera", S = b.displayName, C = /* @__PURE__ */ s(l, {
		id: b.id,
		displayName: b.displayName,
		avatarUrl: b.avatarUrl,
		isMuted: b.isMuted,
		isLocal: b.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: b.videoElement,
		className: "w-full h-full"
	})) : (x = "camera", S = ""), /* @__PURE__ */ c("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", f && "h-full w-full", m),
		style: h,
		children: [/* @__PURE__ */ s("div", {
			className: e("bg-black relative", f ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": x,
			"data-spotlight-user": S,
			children: C
		}), y.length > 0 && /* @__PURE__ */ s("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: y.map((e) => /* @__PURE__ */ s("div", {
				className: "shrink-0",
				style: { width: p },
				children: /* @__PURE__ */ s(l, {
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
function g(e, t) {
	let [n, i] = o(e ?? null);
	return r(() => {
		let r = e ?? null;
		if (t <= 0) {
			i(r);
			return;
		}
		if (r === n) return;
		let a = setTimeout(() => i(r), t);
		return () => clearTimeout(a);
	}, [
		e,
		t,
		n
	]), n;
}
//#endregion
//#region src/components/video/HangoutLayout.tsx
var _ = 10;
function v({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: c, fillParent: l = !1, pipWidth: u, filmstripTileWidth: d, className: f, style: m }) {
	let g = e.length + +!!t, v = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || v || n === "auto" && g >= _ ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ s(h, {
		participants: e,
		localParticipant: t,
		spotlightContent: a,
		spotlightContentLabel: o,
		activeSpeakerId: r,
		speakerHysteresisMs: i,
		onParticipantClick: c,
		fillParent: l,
		filmstripTileWidth: d,
		className: f,
		style: m
	}) : /* @__PURE__ */ s(p, {
		participants: e,
		localParticipant: t,
		activeSpeakerId: r,
		onParticipantClick: c,
		fillParent: l,
		pipWidth: u,
		className: f,
		style: m
	});
}
//#endregion
//#region src/lib/video/useTrackStateBump.ts
function y(e, t) {
	let [n, i] = o(0);
	return r(() => {
		if (!e) return;
		let n = (e, n) => {
			console.info("[useTrackStateBump] remote track", e, {
				participant: t,
				kind: n.kind,
				enabled: n.enabled,
				muted: n.muted,
				readyState: n.readyState,
				id: n.id
			}), i((e) => e + 1);
		}, r = (e) => n("mute", e.target), a = (e) => n("unmute", e.target), o = (e) => n("ended", e.target), s = /* @__PURE__ */ new Set(), c = (e) => {
			s.has(e) || (s.add(e), e.addEventListener("mute", r), e.addEventListener("unmute", a), e.addEventListener("ended", o));
		};
		for (let t of e.getVideoTracks()) c(t);
		let l = (e) => {
			let t = e.track;
			t && t.kind === "video" && c(t), i((e) => e + 1);
		}, u = () => i((e) => e + 1);
		return e.addEventListener("addtrack", l), e.addEventListener("removetrack", u), () => {
			for (let e of s) e.removeEventListener("mute", r), e.removeEventListener("unmute", a), e.removeEventListener("ended", o);
			s.clear(), e.removeEventListener("addtrack", l), e.removeEventListener("removetrack", u);
		};
	}, [e, t]), n;
}
function b(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function x({ stream: e, muted: t = !1, videoRef: n, className: i = "h-full w-full object-cover", onPlayStateChange: o }) {
	let c = a(null), l = a(o);
	return l.current = o, r(() => {
		let t = c.current;
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
		}, a = () => i("playing"), o = () => i("ended"), s = () => {
			t.ended && i("ended");
		}, u = () => {
			let e = t.play();
			e && typeof e.catch == "function" && e.catch((e) => {
				e?.name === "NotAllowedError" && i("paused-by-autoplay");
			});
		}, d = (n) => {
			r(`stream ${n.type}`), t.srcObject = null, t.srcObject = e, u();
		};
		t.addEventListener("play", a), t.addEventListener("ended", o), t.addEventListener("pause", s);
		let f = typeof e?.addEventListener == "function";
		return f && (e.addEventListener("addtrack", d), e.addEventListener("removetrack", d)), u(), () => {
			t.removeEventListener("play", a), t.removeEventListener("ended", o), t.removeEventListener("pause", s), f && (e.removeEventListener("addtrack", d), e.removeEventListener("removetrack", d)), n && n.current === t && (n.current = null);
		};
	}, [e, n]), /* @__PURE__ */ s("video", {
		ref: c,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: i
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function S({ stream: e }) {
	let t = a(null);
	return r(() => {
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
	}, [e]), /* @__PURE__ */ s("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function C({ stream: e, displayName: n, cameraOn: r, avatarSize: i = 96 }) {
	y(e, n);
	let a = b(e);
	return !r || !a || !e ? /* @__PURE__ */ c("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ s(t, {
			name: n,
			size: i
		}), e && /* @__PURE__ */ s(S, { stream: e })]
	}) : /* @__PURE__ */ s(x, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function w({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ s("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function T({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": l }) {
	return /* @__PURE__ */ c("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": l,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ s("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function E({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ c("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ s("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ s("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function D({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p = !1, compact: m = !1, className: h, "data-testid": g }) {
	return /* @__PURE__ */ c("div", {
		"data-testid": g,
		className: e("flex flex-col text-white", m ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", h),
		children: [
			/* @__PURE__ */ s(E, {
				label: "Filters",
				compact: m,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ s(T, {
						label: e.label,
						active: t,
						disabled: p,
						compact: m,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ c(E, {
				label: "Background",
				compact: m,
				children: [
					/* @__PURE__ */ s(T, {
						label: "None",
						active: a === "none",
						disabled: p,
						compact: m,
						onClick: () => l("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ s(T, {
						label: "Blur",
						active: a === "blur",
						disabled: p,
						compact: m,
						onClick: () => l(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ s(T, {
							label: e.label,
							active: t,
							disabled: p,
							compact: m,
							onClick: () => t ? l("none", null) : l("image", e.url),
							thumbUrl: e.url,
							"data-testid": `effects-bg-${e.id}`
						}, e.id);
					})
				]
			}),
			/* @__PURE__ */ c(E, {
				label: "Face FX",
				compact: m,
				children: [/* @__PURE__ */ s(T, {
					label: "None",
					active: d === null,
					disabled: p,
					compact: m,
					onClick: () => f(null),
					"data-testid": "effects-face-none"
				}), u.map((e) => {
					let t = e.id === d;
					return /* @__PURE__ */ s(T, {
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
function O(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function k({ previewActive: t, previewStream: n, isDirty: r, onApply: i, onCancel: a, filters: o, activeFilterId: l, onSelectFilter: u, backgrounds: d, backgroundMode: f, activeBackgroundUrl: p, onSelectBackground: m, faceSprites: h, activeFaceSpriteId: g, onSelectFaceSprite: _, disabled: v = !1, title: y = "Video effects", applyLabel: b = "Apply", className: S, "data-testid": C = "media-effects-preview-panel" }) {
	let w = (e) => O(t, e), T = t && r && !v;
	return /* @__PURE__ */ c("section", {
		"data-testid": C,
		"data-preview-active": t ? "true" : "false",
		"data-preview-dirty": r ? "true" : "false",
		"aria-label": y,
		className: e("flex flex-col gap-3 text-white", S),
		children: [
			/* @__PURE__ */ c("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [n ? /* @__PURE__ */ s("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ s(x, {
						stream: n,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ c("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ s("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), t ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ s("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ s("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: t ? `This preview is private. Nobody else in the call can see these effects until you choose ${b}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ s(D, {
				"data-testid": "media-effects-preview-tray",
				disabled: v || !t,
				filters: o,
				activeFilterId: l,
				onSelectFilter: w(u),
				backgrounds: d,
				backgroundMode: f,
				activeBackgroundUrl: p,
				onSelectBackground: w(m),
				faceSprites: h,
				activeFaceSpriteId: g,
				onSelectFaceSprite: w(_)
			}),
			/* @__PURE__ */ c("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ s("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: r ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ s("button", {
						type: "button",
						onClick: a,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ s("button", {
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
function A(e, t, n = {}) {
	let { live: i = !1 } = n, [s, c] = o(null), [l, u] = o(!1), d = a(null), f = a(n.onError);
	return r(() => {
		f.current = n.onError;
	}, [n.onError]), r(() => {
		let n = e.current;
		if (!n || !t) return;
		if (c(null), u(!0), n.canPlayType("application/vnd.apple.mpegurl")) return n.src = t, () => {
			n.removeAttribute("src"), n.load();
		};
		let r = !1;
		return (async () => {
			try {
				let e = (await import(
					/* @vite-ignore */
					"hls.js"
)).default;
				if (r) return;
				if (!e.isSupported()) {
					c("HLS playback is not supported in this browser."), u(!1);
					return;
				}
				let a = new e(i ? {
					enableWorker: !0,
					lowLatencyMode: !0,
					backBufferLength: 30
				} : { enableWorker: !0 });
				d.current = a, a.attachMedia(n), a.on(e.Events.MEDIA_ATTACHED, () => a.loadSource(t)), a.on(e.Events.ERROR, (e, t) => {
					t?.fatal && (c(`HLS error: ${t.type}`), f.current?.(/* @__PURE__ */ Error(`HLS fatal: ${t.type}`)));
				});
			} catch (e) {
				if (r) return;
				c(`Failed to load hls.js — install it in the consumer app: ${e?.message ?? e}`);
			}
		})(), () => {
			if (r = !0, d.current) {
				try {
					d.current.destroy();
				} catch {}
				d.current = null;
			}
		};
	}, [
		e,
		t,
		i
	]), r(() => {
		let n = e.current;
		if (!n || !t) return;
		if (n.readyState >= 2) {
			u(!1);
			return;
		}
		let r = () => u(!1), i = [
			"loadeddata",
			"playing",
			"canplay"
		];
		return i.forEach((e) => n.addEventListener(e, r)), () => i.forEach((e) => n.removeEventListener(e, r));
	}, [e, t]), {
		error: s,
		loading: l
	};
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function j(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function M({ messages: t, visibleCount: r = 3, rotateMs: a = 4200, window: o = 20, className: c, "data-testid": l = "stream-chat-ticker" }) {
	let u = i(() => t.slice(-o).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: j(e.timestamp),
		kind: "comment"
	})), [t, o]);
	return u.length === 0 ? null : /* @__PURE__ */ s("div", {
		"data-testid": l,
		className: e("pointer-events-none max-w-sm", c),
		children: /* @__PURE__ */ s(n, {
			items: u,
			visibleCount: r,
			rotateMs: a,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var N = 1e4;
function P({ stream: t = null, playlistUrl: n = null, onPlaybackError: i, title: l, viewerCount: u, live: d = !1, notStartedLabel: p, stallAfterMs: m = N, chatMessages: h, chatVisibleCount: g, chatRotateMs: _, muted: v = !0, controls: y, placeholder: b, className: S, "data-testid": C = "stream-stage" }) {
	let w = a(null), T = A(w, t ? null : n, {
		live: !0,
		onError: i
	}), E = t ? d : d && !T.loading && !T.error, [D, O] = o(!1);
	return r(() => {
		if (O(!1), !n || t || !T.loading || T.error) return;
		let e = setTimeout(() => O(!0), m);
		return () => clearTimeout(e);
	}, [
		n,
		t,
		T.loading,
		T.error,
		m
	]), /* @__PURE__ */ c("div", {
		"data-testid": C,
		"data-live": String(E),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ s(x, {
				stream: t,
				muted: v,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ s("video", {
				ref: w,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: v,
				className: "h-full w-full object-contain"
			}) : /* @__PURE__ */ s("div", {
				"data-testid": `${C}-placeholder`,
				className: "flex h-full w-full items-center justify-center text-sm text-white/60",
				children: b ?? "Waiting for the stream to start…"
			}),
			n && !t && T.loading && !T.error && /* @__PURE__ */ s("div", {
				"data-testid": D ? `${C}-not-started` : `${C}-connecting`,
				className: "absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/60",
				children: D ? p ?? "Nothing is being broadcast right now." : "Connecting…"
			}),
			T.error && /* @__PURE__ */ s("div", {
				"data-testid": `${C}-error`,
				className: "absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/80",
				children: T.error
			}),
			(l || E || u !== void 0) && /* @__PURE__ */ c("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					E && /* @__PURE__ */ s("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					l && /* @__PURE__ */ s("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: l
					}),
					u !== void 0 && /* @__PURE__ */ s(f, { count: u })
				]
			}),
			h && h.length > 0 && /* @__PURE__ */ s(M, {
				messages: h,
				visibleCount: g,
				rotateMs: _,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			y && /* @__PURE__ */ s("div", {
				className: "absolute bottom-3 right-3 flex items-center gap-2",
				children: y
			})
		]
	});
}
//#endregion
export { l as _, D as a, x as c, v as d, h as f, f as g, m as h, O as i, b as l, p as m, M as n, w as o, g as p, k as r, C as s, P as t, y as u };
