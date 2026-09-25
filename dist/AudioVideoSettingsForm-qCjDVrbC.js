import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-CHdlnODN.js";
import { q as n } from "./Icons-BSEVGRI6.js";
import { n as r } from "./Badge-BGDepkwI.js";
import { t as i } from "./SkeletonCard-CGe8XFPB.js";
import { n as a, t as o } from "./Slider-izEq1bGO.js";
import { t as s } from "./Avatar-DeJWic2B.js";
import { t as c } from "./InlineAlert-CRnIKeAF.js";
import { t as l } from "./ActivityFeed-ay5wcWka.js";
import { t as u } from "./Select-D2EQq7Wi.js";
import { t as d } from "./Checkbox-Dftwml_V.js";
import { _ as f, s as p } from "./MediaIcons-_ai5Til2.js";
import { useCallback as m, useEffect as h, useMemo as g, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
//#region src/components/video/ParticipantTile.tsx
function S({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, isLocal: o = !1, isSpotlight: s = !1, videoElement: c, onClick: l, fillParent: u = !1, className: d, style: f }) {
	let p = o ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ x("div", {
		className: e("relative bg-video-tile flex items-center justify-center rounded overflow-hidden border-2 transition-colors", u ? "w-full h-full" : "aspect-video", i ? "border-success" : "border-transparent", l && "cursor-pointer hover:border-white/30", d),
		style: f,
		onClick: l,
		role: l ? "button" : void 0,
		tabIndex: l ? 0 : void 0,
		onKeyDown: l ? (e) => {
			(e.key === "Enter" || e.key === " ") && l();
		} : void 0,
		"data-testid": p,
		"data-peer-id": t,
		"data-peer-name": n,
		"data-is-local": o ? "true" : "false",
		"data-is-spotlight": s ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-track-kind": c ? "camera" : "avatar",
		children: [
			c ?? /* @__PURE__ */ b("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: w(n) },
				children: /* @__PURE__ */ b("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", s ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ b("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : C(n)
				})
			}),
			/* @__PURE__ */ x("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					o && /* @__PURE__ */ b("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!o && /* @__PURE__ */ b("span", {
						className: "truncate font-medium",
						children: n
					}),
					a && /* @__PURE__ */ b("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ b("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ b("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", s ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ x("svg", {
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
						/* @__PURE__ */ b("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ b("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ b("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ b("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ b("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ b("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function C(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function w(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function T(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function E({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!T(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ x("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ x("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ b("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ b("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ x("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function D({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = g(() => {
		if (u && n) return [{
			...n,
			isLocal: !0
		}];
		let e = [...t];
		return d && n && e.push({
			...n,
			isLocal: !0
		}), e;
	}, [
		t,
		u,
		d,
		n
	]), m = O(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ x("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ b(S, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === r,
				isMuted: e.isMuted,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: a,
				onClick: i ? () => i(e.id) : void 0
			}, e.id)),
			p.length === 0 && /* @__PURE__ */ b("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", a ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			f && n && /* @__PURE__ */ b("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: o },
				children: /* @__PURE__ */ b(S, {
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
function O(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function k({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = A(a, o), p = g(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = g(() => {
		let e = r || p ? null : f, i = t.filter((t) => t.id !== e);
		return n && i.push({
			...n,
			isLocal: !0
		}), i;
	}, [
		t,
		f,
		n,
		r,
		p
	]), h = (f ? t.find((e) => e.id === f) ?? null : null) ?? t[0] ?? n ?? null, _, v, y = null;
	return r ? (_ = "screen", v = i ?? h?.displayName ?? "", y = r) : p ? (_ = "screen", v = p.displayName, y = p.screenElement) : h ? (_ = "camera", v = h.displayName, y = /* @__PURE__ */ b(S, {
		id: h.id,
		displayName: h.displayName,
		avatarUrl: h.avatarUrl,
		isMuted: h.isMuted,
		isLocal: h.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: h.videoElement,
		className: "w-full h-full"
	})) : (_ = "camera", v = ""), /* @__PURE__ */ x("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", c && "h-full w-full", u),
		style: d,
		children: [/* @__PURE__ */ b("div", {
			className: e("bg-black relative", c ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": _,
			"data-spotlight-user": v,
			children: y
		}), m.length > 0 && /* @__PURE__ */ b("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: m.map((e) => /* @__PURE__ */ b("div", {
				className: "shrink-0",
				style: { width: l },
				children: /* @__PURE__ */ b(S, {
					id: e.id,
					displayName: e.displayName,
					avatarUrl: e.avatarUrl,
					isMuted: e.isMuted,
					isLocal: e.isLocal,
					videoElement: e.videoElement,
					onClick: s ? () => s(e.id) : void 0
				})
			}, e.id))
		})]
	});
}
function A(e, t) {
	let [n, r] = v(e ?? null);
	return h(() => {
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
var j = 10;
function M({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= j ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ b(k, {
		participants: e,
		localParticipant: t,
		spotlightContent: a,
		spotlightContentLabel: o,
		activeSpeakerId: r,
		speakerHysteresisMs: i,
		onParticipantClick: s,
		fillParent: c,
		filmstripTileWidth: u,
		className: d,
		style: f
	}) : /* @__PURE__ */ b(D, {
		participants: e,
		localParticipant: t,
		activeSpeakerId: r,
		onParticipantClick: s,
		fillParent: c,
		pipWidth: l,
		className: d,
		style: f
	});
}
//#endregion
//#region src/lib/video/useTrackStateBump.ts
function N(e, t) {
	let [n, r] = v(0);
	return h(() => {
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
function P(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function F({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
	let a = _(null), o = _(i);
	return o.current = i, h(() => {
		let t = a.current;
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
			o.current?.(e);
		}, s = () => i("playing"), c = () => i("ended"), l = () => {
			t.ended && i("ended");
		}, u = () => {
			let e = t.play();
			e && typeof e.catch == "function" && e.catch((e) => {
				e?.name === "NotAllowedError" && i("paused-by-autoplay");
			});
		}, d = (n) => {
			r(`stream ${n.type}`), t.srcObject = null, t.srcObject = e, u();
		};
		t.addEventListener("play", s), t.addEventListener("ended", c), t.addEventListener("pause", l);
		let f = typeof e?.addEventListener == "function";
		return f && (e.addEventListener("addtrack", d), e.addEventListener("removetrack", d)), u(), () => {
			t.removeEventListener("play", s), t.removeEventListener("ended", c), t.removeEventListener("pause", l), f && (e.removeEventListener("addtrack", d), e.removeEventListener("removetrack", d)), n && n.current === t && (n.current = null);
		};
	}, [e, n]), /* @__PURE__ */ b("video", {
		ref: a,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function ee({ stream: e }) {
	let t = _(null);
	return h(() => {
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
	}, [e]), /* @__PURE__ */ b("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function I({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	N(e, t);
	let i = P(e);
	return !n || !i || !e ? /* @__PURE__ */ x("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ b(s, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ b(ee, { stream: e })]
	}) : /* @__PURE__ */ b(F, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function te({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ b("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function L({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ x("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ b("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function R({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ x("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ b("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ b("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function z({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: S, "data-testid": C }) {
	return p === "grid" ? /* @__PURE__ */ b(W, {
		filters: t,
		activeFilterId: n,
		onSelectFilter: r,
		backgrounds: i,
		backgroundMode: a,
		activeBackgroundUrl: o,
		onSelectBackground: s,
		faceSprites: c,
		activeFaceSpriteId: l,
		onSelectFaceSprite: u,
		disabled: d,
		columns: m,
		thumbnailStream: h,
		...g ? { thumbnailSrc: g } : {},
		filterLimit: _,
		...v ? { onSelectCustomBackground: v } : {},
		backgroundsUnsupported: y,
		...S ? { className: S } : {},
		...C ? { "data-testid": C } : {}
	}) : /* @__PURE__ */ x("div", {
		"data-testid": C,
		className: e("flex flex-col text-white", f ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", S),
		children: [
			/* @__PURE__ */ b(R, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ b(L, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ x(R, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ b(L, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ b(L, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ b(L, {
							label: e.label,
							active: t,
							disabled: d,
							compact: f,
							onClick: () => t ? s("none", null) : s("image", e.url),
							thumbUrl: e.url,
							"data-testid": `effects-bg-${e.id}`
						}, e.id);
					})
				]
			}),
			/* @__PURE__ */ x(R, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ b(L, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ b(L, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => u(t ? null : e.id),
						"data-testid": `effects-face-${e.id}`
					}, e.id);
				})]
			})
		]
	});
}
var ne = 5242880;
function re(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function B({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ b("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: re(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ b("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ b(F, {
			stream: e,
			muted: !0,
			className: "h-full w-full scale-x-[-1] object-cover"
		}) : t ? /* @__PURE__ */ b("img", {
			src: t,
			alt: "",
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ b("span", { className: "block h-full w-full bg-gradient-to-br from-white/15 to-black/30" })
	});
}
function V({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
	return /* @__PURE__ */ x("button", {
		type: "button",
		onClick: i,
		disabled: r,
		"aria-pressed": s ? void 0 : n,
		title: t,
		"data-testid": a,
		"data-active": n ? "true" : "false",
		className: e("group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]", "disabled:cursor-not-allowed disabled:opacity-50"),
		children: [/* @__PURE__ */ b("span", {
			className: e("relative flex aspect-[96/56] w-full items-center justify-center overflow-hidden rounded-md", s ? "border border-dashed border-border-emphasis bg-surface text-text-tertiary" : "bg-video-tile", n ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : !s && "group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis"),
			children: o
		}), /* @__PURE__ */ b("span", {
			className: e("truncate text-xs", s ? "text-primary" : "text-text-secondary"),
			children: t
		})]
	});
}
function H({ children: e, action: t }) {
	return /* @__PURE__ */ x("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ b("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var U = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function W({ filters: r, activeFilterId: i, onSelectFilter: a, backgrounds: o, backgroundMode: s, activeBackgroundUrl: l, onSelectBackground: d, faceSprites: f, activeFaceSpriteId: m, onSelectFaceSprite: h, disabled: g, columns: y, thumbnailStream: S, thumbnailSrc: C, filterLimit: w, onSelectCustomBackground: T, backgroundsUnsupported: E, className: D, "data-testid": O }) {
	let [k, A] = v(!1), [j, M] = v(!1), N = _(null), P = U[y] ?? "grid-cols-3", F = !k && r.length > w + 1, ee = F ? r.slice(0, w) : r, I = !j && f.length > 3, te = I ? f.slice(0, 2) : f, L = {
		stream: S,
		...C ? { src: C } : {}
	};
	return /* @__PURE__ */ x("div", {
		"data-testid": O,
		"data-layout": "grid",
		className: e("flex flex-col gap-4 text-text-primary", D),
		children: [
			/* @__PURE__ */ x("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Filter",
				children: [/* @__PURE__ */ b(H, {
					action: /* @__PURE__ */ b(t, {
						variant: "link",
						onClick: () => a("none"),
						disabled: g,
						"data-testid": "effects-filter-reset",
						className: "text-sm",
						children: "Reset"
					}),
					children: "Filter"
				}), /* @__PURE__ */ x("div", {
					className: e("grid gap-x-3 gap-y-2", P),
					children: [ee.map((e) => /* @__PURE__ */ b(V, {
						label: e.label,
						active: e.id === i,
						disabled: g,
						onClick: () => a(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ b(B, {
							...L,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), F && /* @__PURE__ */ x(V, {
						label: "More...",
						active: !1,
						disabled: g,
						onClick: () => A(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ b(B, {
							...L,
							filter: "blur(3px)"
						}), /* @__PURE__ */ b("span", {
							className: "relative text-white",
							children: /* @__PURE__ */ b(p, { size: 22 })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ x("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Background",
				children: [/* @__PURE__ */ b(H, { children: "Background" }), E ? /* @__PURE__ */ b(c, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ x("div", {
					className: e("grid gap-x-3 gap-y-2", P),
					children: [
						/* @__PURE__ */ b(V, {
							label: "None",
							active: s === "none",
							disabled: g,
							onClick: () => d("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ b(B, { ...L })
						}),
						/* @__PURE__ */ b(V, {
							label: "Blur",
							active: s === "blur",
							disabled: g,
							onClick: () => d("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ b(B, {
								...L,
								filter: "blur(4px)"
							})
						}),
						o.map((e) => /* @__PURE__ */ b(V, {
							label: e.label,
							active: s === "image" && l === e.url,
							disabled: g,
							onClick: () => d("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ b(B, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						T && /* @__PURE__ */ x(V, {
							label: "+ Custom",
							active: !1,
							disabled: g,
							dashed: !0,
							onClick: () => N.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ b(n, { size: 22 }), /* @__PURE__ */ b("input", {
								ref: N,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= ne && T(t);
								}
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ x("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Face effects",
				children: [
					/* @__PURE__ */ b(H, { children: "Face effects" }),
					/* @__PURE__ */ b(u, {
						value: m ?? "",
						onChange: (e) => h(e.target.value || null),
						disabled: g,
						"aria-label": "Face effect",
						"data-testid": "effects-face-select",
						options: [{
							value: "",
							label: "None"
						}, ...f.map((e) => ({
							value: e.id,
							label: e.label
						}))]
					}),
					f.length > 0 && /* @__PURE__ */ x("div", {
						className: e("grid gap-2", P),
						children: [te.map((t) => {
							let n = t.id === m;
							return /* @__PURE__ */ x("button", {
								type: "button",
								onClick: () => h(n ? null : t.id),
								disabled: g,
								"aria-pressed": n,
								"data-testid": `effects-face-${t.id}`,
								className: e("flex cursor-pointer flex-col items-center gap-1 rounded-md border-none bg-transparent py-1.5 font-[inherit] text-xs text-text-secondary", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", n && "bg-primary-bg text-primary"),
								children: [/* @__PURE__ */ b("span", {
									className: "flex h-9 w-9 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary",
									children: t.icon ?? t.label.slice(0, 1)
								}), /* @__PURE__ */ b("span", {
									className: "truncate",
									children: t.label
								})]
							}, t.id);
						}), I && /* @__PURE__ */ x("button", {
							type: "button",
							onClick: () => M(!0),
							disabled: g,
							"data-testid": "effects-face-more",
							className: "flex cursor-pointer flex-col items-center gap-1 rounded-md border-none bg-transparent py-1.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover",
							children: [/* @__PURE__ */ b("span", {
								className: "flex h-9 w-9 items-center justify-center rounded-lg bg-surface-inset text-text-primary",
								children: /* @__PURE__ */ b(p, { size: 20 })
							}), /* @__PURE__ */ b("span", { children: "More" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function ie(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function G({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: S = "chrome", showFooter: C = !0, hint: w = "Changes appear in the call after Apply.", thumbnailSrc: T, onSelectCustomBackground: E, backgroundsUnsupported: D = !1, className: O, "data-testid": k = "media-effects-preview-panel" }) {
	let A = (e) => ie(n, e), j = n && i && !_;
	return S === "surface" ? /* @__PURE__ */ x("section", {
		"data-testid": k,
		"data-variant": "surface",
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-text-primary", O),
		children: [
			/* @__PURE__ */ x("div", {
				"data-testid": "effects-preview",
				className: "relative aspect-[320/170] w-full shrink-0 overflow-hidden rounded-lg bg-video-stage",
				children: [r ? /* @__PURE__ */ b("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ b(F, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ b("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70",
					children: n ? "Turn the camera on to preview effects" : "Preview is not running"
				}), /* @__PURE__ */ b("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
					children: "Preview · Only you"
				})]
			}),
			w != null && /* @__PURE__ */ b("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 text-xs text-text-secondary",
				children: w
			}),
			/* @__PURE__ */ b(z, {
				"data-testid": "media-effects-preview-tray",
				layout: "grid",
				className: "mt-2",
				disabled: _ || !n,
				thumbnailStream: r,
				...T ? { thumbnailSrc: T } : {},
				...E ? { onSelectCustomBackground: A(E) } : {},
				backgroundsUnsupported: D,
				filters: s,
				activeFilterId: c,
				onSelectFilter: A(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: A(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: A(g)
			}),
			C && /* @__PURE__ */ x("footer", {
				className: "mt-2 flex items-center justify-end gap-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ b("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-sm text-text-tertiary",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ b(t, {
						variant: "ghost",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						children: "Cancel"
					}),
					/* @__PURE__ */ b(t, {
						onClick: a,
						disabled: !j,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ x("section", {
		"data-testid": k,
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-white", O),
		children: [
			/* @__PURE__ */ x("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [r ? /* @__PURE__ */ b("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ b(F, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ x("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ b("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), n ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ b("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ b("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: n ? `This preview is private. Nobody else in the call can see these effects until you choose ${y}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ b(z, {
				"data-testid": "media-effects-preview-tray",
				disabled: _ || !n,
				filters: s,
				activeFilterId: c,
				onSelectFilter: A(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: A(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: A(g)
			}),
			C && /* @__PURE__ */ x("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ b("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ b("button", {
						type: "button",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ b("button", {
						type: "button",
						onClick: a,
						disabled: !j,
						"data-testid": "media-effects-preview-apply",
						className: e("rounded-lg border-none px-4 py-1.5 text-[13px] font-semibold transition-colors", j ? "cursor-pointer bg-call-chrome-accent text-white hover:bg-call-chrome-accent-hover" : "cursor-not-allowed bg-white/10 text-white/40"),
						children: y
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/video/useHlsSource.ts
var K = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function q(e) {
	return e ? K[e.kind] : null;
}
function ae(e) {
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
var oe = 3e3, se = 1e3, J = 1500, ce = 8e3, le = .5;
function ue(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = ce } = n, [a, o] = v(null), s = q(a), [c, l] = v(!1), [u, d] = v(!1), [f, p] = v(!1), [g, y] = v(null), [b, x] = v(null), [S, C] = v(0), w = _(null), T = _(!1), E = _(0), D = _(n.onError);
	h(() => {
		D.current = n.onError;
	}, [n.onError]);
	let O = m(() => {
		o(null), d(!1), p(!1), C((e) => e + 1);
	}, []), k = m(() => {
		let t = e.current;
		if (t) try {
			let e = w.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return h(() => {
		let n = e.current;
		if (!n || !t) return;
		o(null), l(!0), y(null), x(null);
		let i = !1, a = () => n.canPlayType("application/vnd.apple.mpegurl") ? (n.src = t, T.current = !0, !0) : (o({
			kind: "unsupported",
			status: null,
			detail: "no MSE (hls.js isSupported() false) and canPlayType() rejects application/vnd.apple.mpegurl",
			retryable: !1
		}), l(!1), !1);
		return (async () => {
			try {
				let e = (await import(
					/* @vite-ignore */
					"hls.js"
)).default;
				if (i) return;
				if (!e.isSupported()) {
					a();
					return;
				}
				let s = new e(r ? {
					enableWorker: !0,
					lowLatencyMode: !0,
					backBufferLength: 30
				} : { enableWorker: !0 });
				w.current = s, s.attachMedia(n), s.on(e.Events.MEDIA_ATTACHED, () => s.loadSource(t)), s.on(e.Events.ERROR, (e, n) => {
					if (n?.fatal) {
						let e = ae(n);
						o(e), console.error("[useHlsSource] playback failed:", e.kind, e.detail, t), D.current?.(/* @__PURE__ */ Error(`HLS fatal: ${e.detail}`));
					}
				});
			} catch (e) {
				if (i) return;
				a() || o({
					kind: "unsupported",
					status: null,
					detail: `hls.js failed to load — install it in the consumer app: ${e?.message ?? e}`,
					retryable: !1
				});
			}
		})(), () => {
			if (i = !0, w.current) {
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
		r,
		S
	]), h(() => {
		let n = e.current;
		if (!n || !t) return;
		n.readyState >= 2 && l(!1);
		let i = () => {
			n.readyState < 1 || y(n.videoWidth === 0 && n.videoHeight === 0);
		}, a = () => {
			l(!1), i();
		}, s = () => {
			if (!r) return;
			d(!0);
			let e = Date.now();
			if (!(e - E.current < oe)) {
				E.current = e;
				try {
					w.current ? w.current.startLoad() : T.current && (n.src = t, n.load()), n.play().catch(() => {});
				} catch {}
			}
		}, c = () => d(!0), u = () => o({
			kind: "media",
			status: null,
			detail: `<video> error event; networkState=${n.networkState} readyState=${n.readyState}`,
			retryable: !0
		}), f = [
			"loadeddata",
			"playing",
			"canplay"
		];
		return f.forEach((e) => n.addEventListener(e, a)), n.addEventListener("loadedmetadata", i), n.addEventListener("resize", i), n.addEventListener("waiting", c), n.addEventListener("error", u), n.addEventListener("ended", s), () => {
			f.forEach((e) => n.removeEventListener(e, a)), n.removeEventListener("loadedmetadata", i), n.removeEventListener("resize", i), n.removeEventListener("waiting", c), n.removeEventListener("error", u), n.removeEventListener("ended", s);
		};
	}, [
		e,
		t,
		r,
		S
	]), h(() => {
		if (!t) {
			d(!1), p(!1), x(null);
			return;
		}
		let n = e.current;
		if (!n) return;
		let r = NaN, a = Date.now(), o = () => {
			let e = null, t = w.current;
			if (t && typeof t.latency == "number" && Number.isFinite(t.latency) && t.latency > 0) e = t.latency;
			else if (n.seekable && n.seekable.length > 0) {
				let t = n.seekable.end(n.seekable.length - 1);
				Number.isFinite(t) && (e = Math.max(0, t - n.currentTime));
			}
			x((t) => {
				if (e === null) return t === null ? t : null;
				let n = Math.round(e * 10) / 10;
				return t !== null && Math.abs(t - n) < le ? t : n;
			});
		}, s = setInterval(() => {
			o();
			let e = Date.now(), t = n.currentTime;
			if (t !== r) {
				r = t, a = e, d(!1), p(!1);
				return;
			}
			if (!(!n.paused || n.ended)) return;
			let s = e - a;
			s >= i ? p(!0) : s >= J && d(!0);
		}, se);
		return () => clearInterval(s);
	}, [
		e,
		t,
		r,
		S,
		i
	]), {
		error: s,
		failure: a,
		loading: c,
		phase: t ? s ? "error" : c ? "connecting" : f ? "stalled" : u ? "buffering" : "playing" : "idle",
		audioOnly: g,
		latencySec: b,
		seekToLive: k,
		retry: O
	};
}
//#endregion
//#region src/lib/video/useAudioLevel.ts
var de = 80, fe = .6;
function pe(e) {
	let [t, n] = v(null), r = _(0);
	return h(() => {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * fe);
			r.current = c, n(c);
		}, de);
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
var Y = [
	.55,
	.8,
	1,
	.8,
	.55
], me = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], he = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], X = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function ge(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return me[Math.min(me.length - 1, Math.round(n * (me.length - 1)))];
}
function _e({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: c, "data-testid": l = "stream-audio-only" }) {
	let u = typeof r == "number" && i, d = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ x("div", {
		"data-testid": l,
		"data-measured": String(u),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", c),
		children: [
			t ? /* @__PURE__ */ b(s, {
				name: t,
				src: n,
				size: 64
			}) : /* @__PURE__ */ b("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ b("span", {
					className: "text-sm font-medium text-white",
					children: t ?? "Audio only"
				}), /* @__PURE__ */ b("span", {
					"data-testid": `${l}-hint`,
					className: "text-xs text-white/60",
					children: d
				})]
			}),
			/* @__PURE__ */ b("div", {
				"data-testid": `${l}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: Y.map((t, n) => /* @__PURE__ */ b("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !u && i && ["uic-audio-bar", X[n]], u ? ge(r, t) : he[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function ve({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function ye(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function be(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function Z(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function xe({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = g(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: Z(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ b("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ b(l, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var Se = 1e4;
function Ce(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !P(e);
}
var we = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function Te({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = Se, chatMessages: y, chatVisibleCount: S, chatRotateMs: C, muted: w = !0, allowFullscreen: D = !0, showLatency: O = !0, controls: k, placeholder: A, className: j, "data-testid": M = "stream-stage" }) {
	let [P, ee] = v(w);
	h(() => {
		ee(w);
	}, [w]);
	let I = _(null), te = _(null), L = ue(te, t ? null : n, {
		live: !0,
		onError: r
	}), R = _(!1);
	(t || n) && (R.current = !0);
	let z = N(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), ne = g(() => Ce(t), [t, z]), re = g(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, z]), B = !!t && re !== !1 || !!n && !L.loading, [V, H] = v(!1);
	h(() => {
		if (H(!1), B || L.error) return;
		let e = setTimeout(() => H(!0), p);
		return () => clearTimeout(e);
	}, [
		B,
		L.error,
		p
	]);
	let U = ve({
		hasStream: !!t,
		streamHasTracks: re,
		hasPlaylist: !!n,
		hadSource: R.current,
		graceExpired: V,
		hls: L
	}), W = L.failure ?? null, ie = _(!1);
	U === "playing" && (ie.current = !0);
	let G = U === "error" && W?.kind === "no-broadcast" ? ie.current ? "ended" : "not-started" : U, K = G === "ended" ? U === "ended" ? "withdrawn" : "stopped" : null, q = s && ye(G), ae = t ? ne : L.audioOnly === !0, oe = (c ?? ae) && (G === "playing" || G === "buffering" || G === "stalled"), se = pe(oe && t ? t : null), [J, ce] = v(!1);
	h(() => {
		if (typeof document > "u") return;
		let e = () => ce(document.fullscreenElement === I.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let le = m(() => {
		let e = I.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), de = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), fe = L.retry, Y = m(() => {
		fe?.(), i?.();
	}, [fe, i]), me = !!(t || n), he = !!n && !t, X = me && G !== "error" && G !== "not-started" && G !== "ended", ge = X || !!k, be = !W || W.retryable, Z = (he || !!i) && be, Te = W?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ x("div", {
		ref: I,
		"data-testid": M,
		"data-live": String(q),
		"data-phase": G,
		"data-audio-only": String(oe),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": W?.kind,
		"data-error-detail": W?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", j),
		children: [
			t ? /* @__PURE__ */ b(F, {
				stream: t,
				muted: P,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ b("video", {
				ref: te,
				"data-testid": `${M}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: P,
				className: "h-full w-full object-contain"
			}) : null,
			oe && /* @__PURE__ */ b(_e, {
				"data-testid": `${M}-audio-only`,
				name: l,
				avatarUrl: u,
				level: se,
				active: G !== "stalled" && !P,
				muted: P
			}),
			G === "idle" && /* @__PURE__ */ b(Q, {
				testId: `${M}-placeholder`,
				children: A ?? "Waiting for the stream to start…"
			}),
			G === "ended" && /* @__PURE__ */ x(Q, {
				testId: `${M}-ended`,
				"data-ended-reason": K,
				children: [
					/* @__PURE__ */ b("span", { children: f ?? (K === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					K === "stopped" && !f && /* @__PURE__ */ b("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					K === "stopped" ? Z && /* @__PURE__ */ b($, {
						testId: `${M}-retry`,
						label: "Try again",
						onClick: Y
					}) : i && /* @__PURE__ */ b($, {
						testId: `${M}-retry`,
						label: "Check again",
						onClick: Y
					})
				]
			}),
			G === "not-started" && /* @__PURE__ */ x(Q, {
				testId: `${M}-not-started`,
				children: [/* @__PURE__ */ b("span", { children: d ?? "Nothing is being broadcast right now." }), Z && /* @__PURE__ */ b($, {
					testId: `${M}-retry`,
					label: Te,
					onClick: Y
				})]
			}),
			G === "connecting" && /* @__PURE__ */ b(Q, {
				testId: `${M}-connecting`,
				children: "Connecting…"
			}),
			G === "buffering" && /* @__PURE__ */ b("div", {
				"data-testid": `${M}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			G === "stalled" && /* @__PURE__ */ x(Q, {
				testId: `${M}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ b("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ b("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					Z && /* @__PURE__ */ b($, {
						testId: `${M}-retry`,
						onClick: Y
					})
				]
			}),
			G === "error" && /* @__PURE__ */ x(Q, {
				testId: `${M}-error`,
				dim: !0,
				children: [/* @__PURE__ */ b("span", { children: L.error ?? "This stream could not be played." }), Z && /* @__PURE__ */ b($, {
					testId: `${M}-retry`,
					label: Te,
					onClick: Y
				})]
			}),
			(a || q || T(o)) && /* @__PURE__ */ x("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					q && /* @__PURE__ */ b("span", {
						"data-testid": `${M}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ b("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					T(o) && /* @__PURE__ */ b(E, { count: o })
				]
			}),
			y && y.length > 0 && /* @__PURE__ */ b(xe, {
				messages: y,
				visibleCount: S,
				rotateMs: C,
				className: "absolute bottom-3 left-3",
				"data-testid": `${M}-chat`
			}),
			ge && /* @__PURE__ */ x("div", {
				"data-testid": `${M}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					X && he && O && (G === "playing" || G === "buffering") && /* @__PURE__ */ b("button", {
						type: "button",
						"data-testid": `${M}-latency`,
						onClick: () => L.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(we, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof L.latencySec == "number" && Number.isFinite(L.latencySec) ? `${Math.max(1, Math.round(L.latencySec))}s behind` : "Behind live"
					}),
					X && q && /* @__PURE__ */ x("button", {
						type: "button",
						"data-testid": `${M}-mute-toggle`,
						"aria-label": P ? "Unmute" : "Mute",
						"aria-pressed": P,
						onClick: () => ee((e) => !e),
						className: e(we, P ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ b("span", {
							"aria-hidden": !0,
							children: P ? "🔇" : "🔊"
						}), P ? "Unmute" : "Mute"]
					}),
					X && D && de && /* @__PURE__ */ x("button", {
						type: "button",
						"data-testid": `${M}-fullscreen`,
						"aria-label": J ? "Exit full screen" : "Full screen",
						"aria-pressed": J,
						onClick: le,
						className: e(we, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ b("span", {
							"aria-hidden": !0,
							children: J ? "↙" : "↗"
						}), J ? "Exit" : "Full screen"]
					}),
					k
				]
			})
		]
	});
}
function Q({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ b("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function $({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ b("button", {
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(we, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function Ee({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
	let s = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0, c = i ? 0 : Math.round(s * n), l = Math.round(s * 100);
	return /* @__PURE__ */ b("div", {
		role: "meter",
		"aria-label": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": i ? 0 : l,
		"data-testid": o,
		"data-lit": c,
		className: e("inline-flex items-center gap-[3px]", a),
		children: Array.from({ length: n }, (t, n) => /* @__PURE__ */ b("span", {
			"aria-hidden": "true",
			className: e("h-3.5 w-1.5 rounded-[2px] transition-colors duration-75", n < c ? "bg-success" : "bg-border")
		}, n))
	});
}
//#endregion
//#region src/components/video/VolumeSlider.tsx
function De({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: s = !1, muted: c = !1, disabled: l = !1, className: u, "data-testid": d = "settings-volume", testButtonTestId: p = "settings-test-sound" }) {
	let m = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ x("div", {
		className: e("flex items-center gap-3", u),
		children: [
			/* @__PURE__ */ b(f, {
				size: 20,
				className: e("shrink-0", c ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ b(o, {
				value: m,
				onChange: (e) => r(e / 100),
				min: 0,
				max: 100,
				step: 1,
				readout: !1,
				disabled: l,
				"aria-label": "Speaker volume",
				"data-testid": d,
				className: "min-w-0 flex-1"
			}),
			i && /* @__PURE__ */ b(t, {
				variant: "ghost",
				size: "md",
				onClick: i,
				disabled: l || s,
				"data-testid": p,
				className: "shrink-0 font-medium",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/video/AudioVideoSettingsForm.tsx
var Oe = [
	{
		value: "auto",
		label: "Auto"
	},
	{
		value: "720p",
		label: "720p"
	},
	{
		value: "480p",
		label: "480p"
	},
	{
		value: "360p",
		label: "360p"
	}
], ke = [
	{
		value: "auto",
		label: "Auto"
	},
	{
		value: "30",
		label: "30 fps"
	},
	{
		value: "15",
		label: "15 fps"
	}
];
function Ae(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function je({ children: t, divided: n = !0 }) {
	return /* @__PURE__ */ b("section", {
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border"),
		children: t
	});
}
function Me({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ b("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function Ne({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ x("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ b(d, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function Pe({ value: n, onChange: o, devices: l, permission: d, micLevel: f, previewStream: p, cameraOn: m, speakerSelectionSupported: h, onTestMic: g, onTestSound: _, testMicState: v = "idle", selfName: S = "You", selfAvatarUrl: C, className: w, "data-testid": T = "audio-video-settings-form" }) {
	let E = (e) => o({
		...n,
		...e
	}), D = d.microphone === "denied", O = d.camera === "denied", k = "w-full h-9 text-sm", A = v === "recording" ? "Recording…" : v === "playing" ? "Playing…" : "Test mic", j;
	return j = O ? null : m ? p ? /* @__PURE__ */ b(F, {
		stream: p,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ b("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ b(i, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ x("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ b(s, {
			name: S,
			size: 48,
			...C ? { src: C } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), /* @__PURE__ */ x("div", {
		className: e("flex flex-col", w),
		"data-testid": T,
		children: [
			/* @__PURE__ */ x(je, { children: [
				/* @__PURE__ */ b(Me, {
					htmlFor: `${T}-mic`,
					children: "Microphone"
				}),
				D ? /* @__PURE__ */ b(c, {
					tone: "error",
					"data-testid": "settings-mic-denied",
					children: "Microphone blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ b(u, {
					id: `${T}-mic`,
					value: n.microphoneId ?? l.microphones[0]?.deviceId ?? "",
					onChange: (e) => E({ microphoneId: e.target.value }),
					options: Ae(l.microphones, "No microphone found"),
					disabled: l.microphones.length === 0,
					className: k,
					"data-testid": "settings-mic-select"
				}),
				/* @__PURE__ */ x("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ b("span", {
							className: "w-24 shrink-0 text-sm text-text-primary",
							children: "Input level"
						}),
						/* @__PURE__ */ b(Ee, {
							level: f,
							disabled: D,
							"data-testid": "settings-mic-level"
						}),
						/* @__PURE__ */ b(t, {
							variant: "ghost",
							onClick: () => void g(),
							disabled: D || v !== "idle",
							"data-testid": "settings-test-mic",
							className: "ml-auto shrink-0 font-medium",
							children: A
						})
					]
				}),
				/* @__PURE__ */ x("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ b("span", {
						id: `${T}-noise`,
						className: "text-sm text-text-primary",
						children: "Noise reduction"
					}), /* @__PURE__ */ b(a, {
						checked: n.noiseSuppression,
						onChange: (e) => E({ noiseSuppression: e }),
						disabled: D,
						"aria-labelledby": `${T}-noise`,
						"data-testid": "settings-noise"
					})]
				})
			] }),
			/* @__PURE__ */ x(je, { children: [
				h && /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ b(Me, {
					htmlFor: `${T}-speaker`,
					children: "Speakers"
				}), /* @__PURE__ */ b(u, {
					id: `${T}-speaker`,
					value: n.speakerId ?? l.speakers[0]?.deviceId ?? "",
					onChange: (e) => E({ speakerId: e.target.value }),
					options: Ae(l.speakers, "No speakers found"),
					disabled: l.speakers.length === 0,
					className: k,
					"data-testid": "settings-speaker-select"
				})] }),
				!h && /* @__PURE__ */ b(Me, { children: "Volume" }),
				/* @__PURE__ */ b(De, {
					value: n.volume,
					onChange: (e) => E({ volume: e }),
					onTest: () => void _()
				})
			] }),
			/* @__PURE__ */ x(je, { children: [
				/* @__PURE__ */ b(Me, {
					htmlFor: `${T}-camera`,
					children: "Camera"
				}),
				O ? /* @__PURE__ */ b(c, {
					tone: "error",
					"data-testid": "settings-camera-denied",
					children: "Camera blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ b(u, {
					id: `${T}-camera`,
					value: n.cameraId ?? l.cameras[0]?.deviceId ?? "",
					onChange: (e) => E({ cameraId: e.target.value }),
					options: Ae(l.cameras, "No camera found"),
					disabled: l.cameras.length === 0,
					className: k,
					"data-testid": "settings-camera-select"
				}), /* @__PURE__ */ x("div", {
					className: "relative aspect-[321/164] w-full overflow-hidden rounded-lg bg-video-stage",
					"data-testid": "settings-preview",
					"data-mirrored": n.mirrorPreview ? "true" : "false",
					children: [j, /* @__PURE__ */ b("span", {
						className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
						children: "Your preview"
					})]
				})] }),
				/* @__PURE__ */ b(Ne, {
					checked: n.mirrorPreview,
					onChange: (e) => E({ mirrorPreview: e }),
					testId: "settings-mirror",
					children: "Mirror my preview"
				}),
				/* @__PURE__ */ x("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ b("label", {
						htmlFor: `${T}-quality`,
						className: "text-sm text-text-primary",
						children: "Quality"
					}), /* @__PURE__ */ b(u, {
						id: `${T}-quality`,
						value: n.quality,
						onChange: (e) => E({ quality: e.target.value }),
						options: Oe,
						className: "h-9 w-32 text-sm",
						"data-testid": "settings-quality"
					})]
				})
			] }),
			/* @__PURE__ */ b(je, { children: /* @__PURE__ */ x(r, {
				summary: "Advanced",
				variant: "plain",
				"data-testid": "settings-advanced",
				summaryClassName: "text-[15px] font-medium text-text-primary",
				bodyClassName: "flex flex-col gap-3 pt-3",
				children: [
					/* @__PURE__ */ x("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ b("span", {
							id: `${T}-echo`,
							className: "text-sm text-text-primary",
							children: "Echo cancellation"
						}), /* @__PURE__ */ b(a, {
							checked: n.echoCancellation,
							onChange: (e) => E({ echoCancellation: e }),
							"aria-labelledby": `${T}-echo`,
							"data-testid": "settings-echo"
						})]
					}),
					/* @__PURE__ */ x("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ b("span", {
							id: `${T}-agc`,
							className: "text-sm text-text-primary",
							children: "Auto gain control"
						}), /* @__PURE__ */ b(a, {
							checked: n.autoGainControl,
							onChange: (e) => E({ autoGainControl: e }),
							"aria-labelledby": `${T}-agc`,
							"data-testid": "settings-agc"
						})]
					}),
					/* @__PURE__ */ x("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ b("label", {
							htmlFor: `${T}-fps`,
							className: "text-sm text-text-primary",
							children: "Frame rate"
						}), /* @__PURE__ */ b(u, {
							id: `${T}-fps`,
							value: String(n.frameRate),
							onChange: (e) => {
								let t = e.target.value;
								E({ frameRate: t === "auto" ? "auto" : Number(t) });
							},
							options: ke,
							className: "h-9 w-32 text-sm",
							"data-testid": "settings-frame-rate"
						})]
					})
				]
			}) }),
			/* @__PURE__ */ b(je, {
				divided: !1,
				children: /* @__PURE__ */ b(Ne, {
					checked: n.rememberDevices,
					onChange: (e) => E({ rememberDevices: e }),
					testId: "settings-remember",
					children: "Use these devices next time"
				})
			})
		]
	});
}
//#endregion
export { k as C, E as D, O as E, T as O, M as S, D as T, te as _, Ce as a, P as b, be as c, pe as d, q as f, z as g, ie as h, Te as i, S as k, ve as l, G as m, De as n, xe as o, ue as p, Ee as r, ye as s, Pe as t, _e as u, I as v, A as w, N as x, F as y };
