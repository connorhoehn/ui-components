import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/video/ParticipantTile.tsx
function c({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, isLocal: c = !1, isSpotlight: d = !1, videoElement: f, onClick: p, fillParent: m = !1, className: h, style: g }) {
	let _ = c ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ s("div", {
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
		"data-is-local": c ? "true" : "false",
		"data-is-spotlight": d ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-track-kind": f ? "camera" : "avatar",
		children: [
			f ?? /* @__PURE__ */ o("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: u(n) },
				children: /* @__PURE__ */ o("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", d ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ o("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : l(n)
				})
			}),
			/* @__PURE__ */ s("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					c && /* @__PURE__ */ o("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!c && /* @__PURE__ */ o("span", {
						className: "truncate font-medium",
						children: n
					}),
					a && /* @__PURE__ */ o("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ o("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ o("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", d ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ s("svg", {
					width: d ? 16 : 12,
					height: d ? 16 : 12,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": !0,
					children: [
						/* @__PURE__ */ o("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ o("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ o("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ o("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ o("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ o("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function l(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function u(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function d({ participants: t, localParticipant: n = null, activeSpeakerId: i = null, onParticipantClick: a, fillParent: l = !1, pipWidth: u = 96, className: d, style: p }) {
	let m = t.length, h = !!n && m === 0, g = !!n && m >= 2, _ = !!n && m === 1, v = r(() => {
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
	]), y = f(v.length), b = Math.max(1, Math.ceil(v.length / y));
	return /* @__PURE__ */ s("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", l && "h-full w-full", d),
		style: {
			gridTemplateColumns: `repeat(${y}, 1fr)`,
			...l ? { gridTemplateRows: `repeat(${b}, 1fr)` } : {},
			...p
		},
		children: [
			v.map((e) => /* @__PURE__ */ o(c, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === i,
				isMuted: e.isMuted,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: l,
				onClick: a ? () => a(e.id) : void 0
			}, e.id)),
			v.length === 0 && /* @__PURE__ */ o("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", l ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			_ && n && /* @__PURE__ */ o("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: u },
				children: /* @__PURE__ */ o(c, {
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
function f(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function p({ participants: t, localParticipant: n = null, spotlightContent: i, spotlightContentLabel: a, activeSpeakerId: l = null, speakerHysteresisMs: u = 750, onParticipantClick: d, fillParent: f = !1, filmstripTileWidth: p = 128, className: h, style: g }) {
	let _ = m(l, u), v = r(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), y = r(() => {
		let e = i || v ? null : _, r = t.filter((t) => t.id !== e);
		return n && r.push({
			...n,
			isLocal: !0
		}), r;
	}, [
		t,
		_,
		n,
		i,
		v
	]), b = (_ ? t.find((e) => e.id === _) ?? null : null) ?? t[0] ?? n ?? null, x, S, C = null;
	return i ? (x = "screen", S = a ?? b?.displayName ?? "", C = i) : v ? (x = "screen", S = v.displayName, C = v.screenElement) : b ? (x = "camera", S = b.displayName, C = /* @__PURE__ */ o(c, {
		id: b.id,
		displayName: b.displayName,
		avatarUrl: b.avatarUrl,
		isMuted: b.isMuted,
		isLocal: b.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: b.videoElement,
		className: "w-full h-full"
	})) : (x = "camera", S = ""), /* @__PURE__ */ s("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", f && "h-full w-full", h),
		style: g,
		children: [/* @__PURE__ */ o("div", {
			className: e("bg-black relative", f ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": x,
			"data-spotlight-user": S,
			children: C
		}), y.length > 0 && /* @__PURE__ */ o("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: y.map((e) => /* @__PURE__ */ o("div", {
				className: "shrink-0",
				style: { width: p },
				children: /* @__PURE__ */ o(c, {
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
function m(e, t) {
	let [r, i] = a(e ?? null);
	return n(() => {
		let n = e ?? null;
		if (t <= 0) {
			i(n);
			return;
		}
		if (n === r) return;
		let a = setTimeout(() => i(n), t);
		return () => clearTimeout(a);
	}, [
		e,
		t,
		r
	]), r;
}
//#endregion
//#region src/components/video/HangoutLayout.tsx
var h = 10;
function g({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: s, onParticipantClick: c, fillParent: l = !1, pipWidth: u, filmstripTileWidth: f, className: m, style: g }) {
	let _ = e.length + +!!t, v = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || v || n === "auto" && _ >= h ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ o(p, {
		participants: e,
		localParticipant: t,
		spotlightContent: a,
		spotlightContentLabel: s,
		activeSpeakerId: r,
		speakerHysteresisMs: i,
		onParticipantClick: c,
		fillParent: l,
		filmstripTileWidth: f,
		className: m,
		style: g
	}) : /* @__PURE__ */ o(d, {
		participants: e,
		localParticipant: t,
		activeSpeakerId: r,
		onParticipantClick: c,
		fillParent: l,
		pipWidth: u,
		className: m,
		style: g
	});
}
//#endregion
//#region src/lib/video/useTrackStateBump.ts
function _(e, t) {
	let [r, i] = a(0);
	return n(() => {
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
	}, [e, t]), r;
}
function v(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function y({ stream: e, muted: t = !1, videoRef: r, className: a = "h-full w-full object-cover", onPlayStateChange: s }) {
	let c = i(null), l = i(s);
	return l.current = s, n(() => {
		let t = c.current;
		if (!t) return;
		t.srcObject !== e && (t.srcObject = e), r && (r.current = t);
		let n = (t) => {
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
		n("bind");
		let i = (e) => {
			l.current?.(e);
		}, a = () => i("playing"), o = () => i("ended"), s = () => {
			t.ended && i("ended");
		}, u = () => {
			let e = t.play();
			e && typeof e.catch == "function" && e.catch((e) => {
				e?.name === "NotAllowedError" && i("paused-by-autoplay");
			});
		}, d = (r) => {
			n(`stream ${r.type}`), t.srcObject = null, t.srcObject = e, u();
		};
		t.addEventListener("play", a), t.addEventListener("ended", o), t.addEventListener("pause", s);
		let f = typeof e?.addEventListener == "function";
		return f && (e.addEventListener("addtrack", d), e.addEventListener("removetrack", d)), u(), () => {
			t.removeEventListener("play", a), t.removeEventListener("ended", o), t.removeEventListener("pause", s), f && (e.removeEventListener("addtrack", d), e.removeEventListener("removetrack", d)), r && r.current === t && (r.current = null);
		};
	}, [e, r]), /* @__PURE__ */ o("video", {
		ref: c,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: a
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function b({ stream: e }) {
	let t = i(null);
	return n(() => {
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
	}, [e]), /* @__PURE__ */ o("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function x({ stream: e, displayName: n, cameraOn: r, avatarSize: i = 96 }) {
	_(e, n);
	let a = v(e);
	return !r || !a || !e ? /* @__PURE__ */ s("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ o(t, {
			name: n,
			size: i
		}), e && /* @__PURE__ */ o(b, { stream: e })]
	}) : /* @__PURE__ */ o(y, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function S({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ o("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function C({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: c, "data-testid": l }) {
	return /* @__PURE__ */ s("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": l,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-primary text-white" : "bg-white/10 text-text-inverse hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [c && /* @__PURE__ */ o("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${c})` }
		}), t]
	});
}
function w({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ s("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ o("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ o("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function T({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: c, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p = !1, compact: m = !1, className: h, "data-testid": g }) {
	return /* @__PURE__ */ s("div", {
		"data-testid": g,
		className: e("flex flex-col text-text-inverse", m ? "gap-3 rounded-xl border border-white/10 bg-surface-inverse p-3" : "gap-4", h),
		children: [
			/* @__PURE__ */ o(w, {
				label: "Filters",
				compact: m,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ o(C, {
						label: e.label,
						active: t,
						disabled: p,
						compact: m,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ s(w, {
				label: "Background",
				compact: m,
				children: [
					/* @__PURE__ */ o(C, {
						label: "None",
						active: a === "none",
						disabled: p,
						compact: m,
						onClick: () => l("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ o(C, {
						label: "Blur",
						active: a === "blur",
						disabled: p,
						compact: m,
						onClick: () => l(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && c === e.url;
						return /* @__PURE__ */ o(C, {
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
			/* @__PURE__ */ s(w, {
				label: "Face FX",
				compact: m,
				children: [/* @__PURE__ */ o(C, {
					label: "None",
					active: d === null,
					disabled: p,
					compact: m,
					onClick: () => f(null),
					"data-testid": "effects-face-none"
				}), u.map((e) => {
					let t = e.id === d;
					return /* @__PURE__ */ o(C, {
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
export { v as a, p as c, f as d, c as f, y as i, m as l, S as n, _ as o, x as r, g as s, T as t, d as u };
