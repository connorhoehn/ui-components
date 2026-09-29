import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-DHAs60_m.js";
import { t as n } from "./IconButton-DDeXW3mZ.js";
import { J as r, f as i, v as a } from "./Icons-CCn6EnUZ.js";
import { n as o, t as s } from "./Badge-t9rXTGOV.js";
import { t as c } from "./Banner-e3wgB68D.js";
import { t as l } from "./SkeletonCard-CGe8XFPB.js";
import { n as u, t as d } from "./Slider-izEq1bGO.js";
import { t as f } from "./Avatar-Chz9yWlo.js";
import { t as p } from "./InlineAlert-CRnIKeAF.js";
import { t as m } from "./InlinePopover-CO_TmyX7.js";
import { t as h } from "./ActivityFeed-BC0RoWoK.js";
import { t as g } from "./DropdownMenu-DEpM9pWr.js";
import { t as _ } from "./Select-D9v37avj.js";
import { t as v } from "./Checkbox-DWpeFfD2.js";
import { _ as y, a as b, b as x, h as S, i as C, p as w, r as T, s as E, u as D, x as O, y as k } from "./MediaIcons-_ai5Til2.js";
import { memo as A, useCallback as j, useEffect as M, useMemo as N, useRef as P, useState as F } from "react";
import { Fragment as ee, jsx as I, jsxs as L } from "react/jsx-runtime";
//#region src/components/video/ParticipantTile.tsx
function R({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, isLocal: o = !1, isSpotlight: s = !1, videoElement: c, onClick: l, fillParent: u = !1, className: d, style: f }) {
	let p = o ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ L("div", {
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
			c ?? /* @__PURE__ */ I("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: ne(n) },
				children: /* @__PURE__ */ I("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", s ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ I("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : te(n)
				})
			}),
			/* @__PURE__ */ L("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					o && /* @__PURE__ */ I("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!o && /* @__PURE__ */ I("span", {
						className: "truncate font-medium",
						children: n
					}),
					a && /* @__PURE__ */ I("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ I("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ I("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", s ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ L("svg", {
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
						/* @__PURE__ */ I("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ I("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ I("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ I("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ I("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ I("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function te(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function ne(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function z(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function re({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!z(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ L("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ L("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ I("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ I("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ L("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/video/callDockRenderProbe.ts
var ie = null;
function B(e, t) {
	ie?.(e, t);
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function V({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: p = 84, tileTestIdPrefix: m = "call-tile", className: h, style: g, "data-testid": _ = "call-tile-row" }) {
	if (c === "dock") {
		let a = n ? [n, ...t] : t, c = u === "collapse" && a.length > d ? a.slice(0, Math.max(1, d - 1)) : a, v = a.length - c.length;
		return /* @__PURE__ */ L("div", {
			className: e("flex min-w-0 items-center gap-2", u === "scroll" ? "overflow-x-auto" : "overflow-hidden", h),
			style: g,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": _,
			"data-variant": "dock",
			"data-tile-count": a.length,
			children: [c.map((e) => /* @__PURE__ */ I(U, {
				participant: e,
				width: i,
				height: p,
				speaking: e.id === r,
				highlighted: e.id === l,
				testId: `${m}-${e.id}`,
				...s ? { onParticipantClick: s } : {}
			}, e.id)), v > 0 && /* @__PURE__ */ I("div", {
				className: "flex shrink-0 items-center justify-center rounded-md bg-video-tile text-white",
				style: {
					width: i,
					height: p
				},
				"data-testid": `${m}-overflow`,
				"aria-label": `${v} more`,
				role: "img",
				children: /* @__PURE__ */ I(f, {
					name: `+ ${v}`,
					initials: `+${v}`,
					size: 40,
					color: "rgba(255,255,255,0.18)",
					showTitle: !1
				})
			})]
		});
	}
	let v = n ? [...t, n] : t, y = v.map((t) => /* @__PURE__ */ I(R, {
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
	}, t.id)), b = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ L("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "floating",
		"data-tile-count": v.length,
		children: [/* @__PURE__ */ I("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${_}-tiles`,
			children: v.map((t) => t.videoElement ? /* @__PURE__ */ I(R, {
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
			}, t.id) : /* @__PURE__ */ I(G, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ I("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${_}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ L("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "bar",
		"data-tile-count": v.length,
		children: [
			o && /* @__PURE__ */ I("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${_}-title`,
				children: o
			}),
			/* @__PURE__ */ I("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${_}-tiles`,
				children: y
			}),
			a && /* @__PURE__ */ I("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${_}-controls`,
				children: a
			})
		]
	});
}
function H(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => Object.is(e[n], t[n]));
}
var U = A(W, (e, t) => e.width === t.width && e.height === t.height && e.speaking === t.speaking && e.highlighted === t.highlighted && e.testId === t.testId && e.onParticipantClick === t.onParticipantClick && H(e.participant, t.participant));
function W({ participant: t, width: n, height: r, speaking: i, highlighted: a, testId: o, onParticipantClick: s }) {
	B("tile", t.id);
	let c = s ? () => s(t.id) : void 0, l = t.isLocal ? "You" : t.displayName, u = `${t.isLocal ? "You" : t.displayName}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
	return /* @__PURE__ */ L("div", {
		className: e("relative shrink-0 overflow-hidden rounded-md text-white", t.videoElement && !t.cameraOff ? "bg-video-tile" : "bg-video-tile-off", "[&_video]:h-full [&_video]:w-full [&_video]:object-cover", c && "cursor-pointer"),
		style: {
			width: n,
			height: r
		},
		title: u,
		"aria-label": u,
		role: c ? "button" : "img",
		tabIndex: c ? 0 : void 0,
		onClick: c,
		onKeyDown: c ? (e) => {
			(e.key === "Enter" || e.key === " ") && c();
		} : void 0,
		"data-testid": o,
		"data-peer-id": t.id,
		"data-is-local": t.isLocal ? "true" : "false",
		"data-is-muted": t.isMuted ? "true" : "false",
		"data-highlighted": a ? "true" : "false",
		"data-speaking": i ? "true" : "false",
		"data-track-kind": t.videoElement && !t.cameraOff ? "camera" : "avatar",
		children: [
			t.videoElement && t.cameraOff && /* @__PURE__ */ I("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${o}-media-sink`,
				children: t.videoElement
			}),
			t.audioElement != null && /* @__PURE__ */ I("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${o}-audio-sink`,
				children: t.audioElement
			}),
			t.videoElement && !t.cameraOff ? t.videoElement : /* @__PURE__ */ I("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ I(f, {
					name: t.displayName,
					size: Math.round(Math.min(40, r * .48)),
					...t.avatarUrl ? { src: t.avatarUrl } : {},
					color: "rgba(71,80,92,0.28)",
					showTitle: !1
				})
			}),
			t.reconnecting && /* @__PURE__ */ I("div", {
				className: "absolute inset-0 bg-surface-inverse/40",
				"data-testid": `${o}-reconnecting`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ L("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-xs",
				children: [
					/* @__PURE__ */ I("span", {
						className: "min-w-0 flex-1 truncate font-medium",
						children: l
					}),
					t.screenSharing && /* @__PURE__ */ I(w, {
						size: 13,
						className: "shrink-0"
					}),
					t.isMuted ? /* @__PURE__ */ I(b, {
						size: 14,
						className: "shrink-0"
					}) : /* @__PURE__ */ I(C, {
						size: 14,
						className: "shrink-0"
					})
				]
			}),
			(a || i) && /* @__PURE__ */ I("span", {
				"aria-hidden": "true",
				"data-testid": `${o}-ring`,
				"data-ring": a ? "highlighted" : "speaking",
				className: e("pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset", a ? "ring-primary" : "ring-success")
			}),
			i && a && /* @__PURE__ */ I("span", {
				className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-success",
				"aria-hidden": "true"
			})
		]
	});
}
function G({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ L("div", {
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
		children: [/* @__PURE__ */ I(f, {
			name: t.displayName,
			size: 44,
			...t.avatarUrl ? { src: t.avatarUrl } : {}
		}), t.isMuted && /* @__PURE__ */ I("span", {
			className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
			"aria-hidden": "true",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function ae({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = N(() => {
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
	]), m = oe(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ L("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ I(R, {
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
			p.length === 0 && /* @__PURE__ */ I("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", a ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			f && n && /* @__PURE__ */ I("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: o },
				children: /* @__PURE__ */ I(R, {
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
function oe(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function K({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = q(a, o), p = N(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = N(() => {
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
	]), h = (f ? t.find((e) => e.id === f) ?? null : null) ?? t[0] ?? n ?? null, g, _, v = null;
	return r ? (g = "screen", _ = i ?? h?.displayName ?? "", v = r) : p ? (g = "screen", _ = p.displayName, v = p.screenElement) : h ? (g = "camera", _ = h.displayName, v = /* @__PURE__ */ I(R, {
		id: h.id,
		displayName: h.displayName,
		avatarUrl: h.avatarUrl,
		isMuted: h.isMuted,
		isLocal: h.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: h.videoElement,
		className: "w-full h-full"
	})) : (g = "camera", _ = ""), /* @__PURE__ */ L("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", c && "h-full w-full", u),
		style: d,
		children: [/* @__PURE__ */ I("div", {
			className: e("bg-black relative", c ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": g,
			"data-spotlight-user": _,
			children: v
		}), m.length > 0 && /* @__PURE__ */ I("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: m.map((e) => /* @__PURE__ */ I("div", {
				className: "shrink-0",
				style: { width: l },
				children: /* @__PURE__ */ I(R, {
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
function q(e, t) {
	let [n, r] = F(e ?? null);
	return M(() => {
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
var se = 10;
function J({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= se ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ I(K, {
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
	}) : /* @__PURE__ */ I(ae, {
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
function Y(e, t) {
	let [n, r] = F(0);
	return M(() => {
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
function ce(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function X({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
	let a = P(null), o = P(i);
	return o.current = i, M(() => {
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
	}, [e, n]), /* @__PURE__ */ I("video", {
		ref: a,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function le({ stream: e }) {
	let t = P(null);
	return M(() => {
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
	}, [e]), /* @__PURE__ */ I("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function ue({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	Y(e, t);
	let i = ce(e);
	return !n || !i || !e ? /* @__PURE__ */ L("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ I(f, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ I(le, { stream: e })]
	}) : /* @__PURE__ */ I(X, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function de({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ I("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function Z({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ I("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function Q({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ L("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ I("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ I("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function fe({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: b, "data-testid": x }) {
	return p === "grid" ? /* @__PURE__ */ I(ye, {
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
		...b ? { className: b } : {},
		...x ? { "data-testid": x } : {}
	}) : /* @__PURE__ */ L("div", {
		"data-testid": x,
		className: e("flex flex-col text-white", f ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", b),
		children: [
			/* @__PURE__ */ I(Q, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ I(Z, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ L(Q, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ I(Z, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ I(Z, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ I(Z, {
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
			/* @__PURE__ */ L(Q, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ I(Z, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ I(Z, {
						label: typeof e.icon == "string" && !e.label.startsWith(e.icon) ? `${e.icon} ${e.label}` : e.label,
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
var pe = 5242880;
function me(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function $({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ I("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: me(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ I("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ I(X, {
			stream: e,
			muted: !0,
			className: "h-full w-full scale-x-[-1] object-cover"
		}) : t ? /* @__PURE__ */ I("img", {
			src: t,
			alt: "",
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ I("span", { className: "block h-full w-full bg-gradient-to-br from-white/15 to-black/30" })
	});
}
function he({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: i,
		disabled: r,
		"aria-pressed": s ? void 0 : n,
		title: t,
		"data-testid": a,
		"data-active": n ? "true" : "false",
		className: e("group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]", "disabled:cursor-not-allowed disabled:opacity-50"),
		children: [/* @__PURE__ */ I("span", {
			className: e("relative flex aspect-[101/50] w-full items-center justify-center overflow-hidden rounded-md", s ? "border border-dashed border-border-emphasis bg-surface text-text-tertiary" : "bg-video-tile", n ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : !s && "group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis"),
			children: o
		}), /* @__PURE__ */ I("span", {
			className: e("truncate text-xs", s ? "text-primary" : "text-text-secondary"),
			children: t
		})]
	});
}
function ge(e) {
	let t = /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s*(.*)$/u.exec(e.trim());
	if (!t) return {
		glyph: null,
		text: e
	};
	let n = t[2].trim();
	return {
		glyph: t[1],
		text: n ? n.charAt(0) + n.slice(1).toLowerCase() : e
	};
}
function _e({ children: e, action: t }) {
	return /* @__PURE__ */ L("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ I("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var ve = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function ye({ filters: n, activeFilterId: i, onSelectFilter: a, backgrounds: o, backgroundMode: s, activeBackgroundUrl: c, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: m, columns: h, thumbnailStream: g, thumbnailSrc: v, filterLimit: y, onSelectCustomBackground: b, backgroundsUnsupported: x, className: S, "data-testid": C }) {
	let [w, T] = F(!1), [D, O] = F(!1), k = P(null), A = ve[h] ?? "grid-cols-3", j = !w && n.length > y + 1, M = j ? n.slice(0, y) : n, N = !D && u.length > 3, ee = N ? u.slice(0, 2) : u, R = {
		stream: g,
		...v ? { src: v } : {}
	};
	return /* @__PURE__ */ L("div", {
		"data-testid": C,
		"data-layout": "grid",
		className: e("flex flex-col gap-3 text-text-primary", S),
		children: [
			/* @__PURE__ */ L("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Filter",
				children: [/* @__PURE__ */ I(_e, {
					action: /* @__PURE__ */ I(t, {
						variant: "link",
						onClick: () => a("none"),
						disabled: m,
						"data-testid": "effects-filter-reset",
						className: "text-sm",
						children: "Reset"
					}),
					children: "Filter"
				}), /* @__PURE__ */ L("div", {
					className: e("grid gap-x-3 gap-y-2", A),
					children: [M.map((e) => /* @__PURE__ */ I(he, {
						label: e.label,
						active: e.id === i,
						disabled: m,
						onClick: () => a(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ I($, {
							...R,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), j && /* @__PURE__ */ L(he, {
						label: "More...",
						active: !1,
						disabled: m,
						onClick: () => T(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ I($, {
							...R,
							filter: "blur(3px)"
						}), /* @__PURE__ */ I("span", {
							className: "relative text-white",
							children: /* @__PURE__ */ I(E, { size: 22 })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ L("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Background",
				children: [/* @__PURE__ */ I(_e, { children: "Background" }), x ? /* @__PURE__ */ I(p, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ L("div", {
					className: e("grid gap-x-3 gap-y-2", A),
					children: [
						/* @__PURE__ */ I(he, {
							label: "None",
							active: s === "none",
							disabled: m,
							onClick: () => l("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ I($, { ...R })
						}),
						/* @__PURE__ */ I(he, {
							label: "Blur",
							active: s === "blur",
							disabled: m,
							onClick: () => l("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ I($, {
								...R,
								filter: "blur(4px)"
							})
						}),
						o.map((e) => /* @__PURE__ */ I(he, {
							label: e.label,
							active: s === "image" && c === e.url,
							disabled: m,
							onClick: () => l("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ I($, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						b && /* @__PURE__ */ L(he, {
							label: "+ Custom",
							active: !1,
							disabled: m,
							dashed: !0,
							onClick: () => k.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ I(r, { size: 22 }), /* @__PURE__ */ I("input", {
								ref: k,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= pe && b(t);
								}
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ L("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Face effects",
				children: [
					/* @__PURE__ */ I(_e, { children: "Face effects" }),
					/* @__PURE__ */ I(_, {
						value: d ?? "",
						onChange: (e) => f(e.target.value || null),
						disabled: m,
						"aria-label": "Face effect",
						chevron: "custom",
						className: "h-9 text-sm",
						"data-testid": "effects-face-select",
						options: [{
							value: "",
							label: "None"
						}, ...u.map((e) => ({
							value: e.id,
							label: e.label
						}))]
					}),
					u.length > 0 && /* @__PURE__ */ L("div", {
						className: e("-mt-0.5 grid gap-2", A),
						children: [ee.map((t) => {
							let n = t.id === d, { glyph: r, text: i } = ge(t.label);
							return /* @__PURE__ */ L("button", {
								type: "button",
								onClick: () => f(n ? null : t.id),
								disabled: m,
								"aria-pressed": n,
								"data-testid": `effects-face-${t.id}`,
								className: e("flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", n && "bg-primary-bg text-primary"),
								children: [/* @__PURE__ */ I("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary",
									children: t.icon ?? r ?? Array.from(i)[0]
								}), /* @__PURE__ */ I("span", {
									className: "truncate",
									children: t.icon ? t.label : i
								})]
							}, t.id);
						}), N && /* @__PURE__ */ L("button", {
							type: "button",
							onClick: () => O(!0),
							disabled: m,
							"data-testid": "effects-face-more",
							className: "flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover",
							children: [/* @__PURE__ */ I("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-text-primary",
								children: /* @__PURE__ */ I(E, { size: 20 })
							}), /* @__PURE__ */ I("span", { children: "More" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function be(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function xe({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: b = "chrome", showFooter: x = !0, hint: S = "Changes appear in the call after Apply.", thumbnailSrc: C, onSelectCustomBackground: w, backgroundsUnsupported: T = !1, className: E, "data-testid": D = "media-effects-preview-panel" }) {
	let O = (e) => be(n, e), k = n && i && !_;
	return b === "surface" ? /* @__PURE__ */ L("section", {
		"data-testid": D,
		"data-variant": "surface",
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-text-primary", E),
		children: [
			/* @__PURE__ */ L("div", {
				"data-testid": "effects-preview",
				className: "relative aspect-[338/161] w-full shrink-0 overflow-hidden rounded-lg bg-video-stage",
				children: [r ? /* @__PURE__ */ I("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ I(X, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ I("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70",
					children: n ? "Turn the camera on to preview effects" : "Preview is not running"
				}), /* @__PURE__ */ I("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
					children: "Preview · Only you"
				})]
			}),
			S != null && /* @__PURE__ */ I("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 text-xs text-text-secondary",
				children: S
			}),
			/* @__PURE__ */ I(fe, {
				"data-testid": "media-effects-preview-tray",
				layout: "grid",
				className: "mt-1.5",
				disabled: _ || !n,
				thumbnailStream: r,
				...C ? { thumbnailSrc: C } : {},
				...w ? { onSelectCustomBackground: O(w) } : {},
				backgroundsUnsupported: T,
				filters: s,
				activeFilterId: c,
				onSelectFilter: O(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: O(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: O(g)
			}),
			x && /* @__PURE__ */ L("footer", {
				className: "mt-2 flex items-center justify-end gap-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ I("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-sm text-text-tertiary",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ I(t, {
						variant: "ghost",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						children: "Cancel"
					}),
					/* @__PURE__ */ I(t, {
						onClick: a,
						disabled: !k,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ L("section", {
		"data-testid": D,
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-white", E),
		children: [
			/* @__PURE__ */ L("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [r ? /* @__PURE__ */ I("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ I(X, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ L("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ I("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), n ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ I("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ I("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: n ? `This preview is private. Nobody else in the call can see these effects until you choose ${y}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ I(fe, {
				"data-testid": "media-effects-preview-tray",
				disabled: _ || !n,
				filters: s,
				activeFilterId: c,
				onSelectFilter: O(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: O(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: O(g)
			}),
			x && /* @__PURE__ */ L("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ I("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ I("button", {
						type: "button",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ I("button", {
						type: "button",
						onClick: a,
						disabled: !k,
						"data-testid": "media-effects-preview-apply",
						className: e("rounded-lg border-none px-4 py-1.5 text-[13px] font-semibold transition-colors", k ? "cursor-pointer bg-call-chrome-accent text-white hover:bg-call-chrome-accent-hover" : "cursor-not-allowed bg-white/10 text-white/40"),
						children: y
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/video/useHlsSource.ts
var Se = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function Ce(e) {
	return e ? Se[e.kind] : null;
}
function we(e) {
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
var Te = 3e3, Ee = 1e3, De = 1500, Oe = 8e3, ke = .5;
function Ae(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = Oe } = n, [a, o] = F(null), s = Ce(a), [c, l] = F(!1), [u, d] = F(!1), [f, p] = F(!1), [m, h] = F(null), [g, _] = F(null), [v, y] = F(0), b = P(null), x = P(!1), S = P(0), C = P(n.onError);
	M(() => {
		C.current = n.onError;
	}, [n.onError]);
	let w = j(() => {
		o(null), d(!1), p(!1), y((e) => e + 1);
	}, []), T = j(() => {
		let t = e.current;
		if (t) try {
			let e = b.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return M(() => {
		let n = e.current;
		if (!n || !t) return;
		o(null), l(!0), h(null), _(null);
		let i = !1, a = () => n.canPlayType("application/vnd.apple.mpegurl") ? (n.src = t, x.current = !0, !0) : (o({
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
				b.current = s, s.attachMedia(n), s.on(e.Events.MEDIA_ATTACHED, () => s.loadSource(t)), s.on(e.Events.ERROR, (e, n) => {
					if (n?.fatal) {
						let e = we(n);
						o(e), console.error("[useHlsSource] playback failed:", e.kind, e.detail, t), C.current?.(/* @__PURE__ */ Error(`HLS fatal: ${e.detail}`));
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
			if (i = !0, b.current) {
				try {
					b.current.destroy();
				} catch {}
				b.current = null;
			}
			x.current && (x.current = !1, n.removeAttribute("src"), n.load());
		};
	}, [
		e,
		t,
		r,
		v
	]), M(() => {
		let n = e.current;
		if (!n || !t) return;
		n.readyState >= 2 && l(!1);
		let i = () => {
			n.readyState < 1 || h(n.videoWidth === 0 && n.videoHeight === 0);
		}, a = () => {
			l(!1), i();
		}, s = () => {
			if (!r) return;
			d(!0);
			let e = Date.now();
			if (!(e - S.current < Te)) {
				S.current = e;
				try {
					b.current ? b.current.startLoad() : x.current && (n.src = t, n.load()), n.play().catch(() => {});
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
		v
	]), M(() => {
		if (!t) {
			d(!1), p(!1), _(null);
			return;
		}
		let n = e.current;
		if (!n) return;
		let r = NaN, a = Date.now(), o = () => {
			let e = null, t = b.current;
			if (t && typeof t.latency == "number" && Number.isFinite(t.latency) && t.latency > 0) e = t.latency;
			else if (n.seekable && n.seekable.length > 0) {
				let t = n.seekable.end(n.seekable.length - 1);
				Number.isFinite(t) && (e = Math.max(0, t - n.currentTime));
			}
			_((t) => {
				if (e === null) return t === null ? t : null;
				let n = Math.round(e * 10) / 10;
				return t !== null && Math.abs(t - n) < ke ? t : n;
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
			s >= i ? p(!0) : s >= De && d(!0);
		}, Ee);
		return () => clearInterval(s);
	}, [
		e,
		t,
		r,
		v,
		i
	]), {
		error: s,
		failure: a,
		loading: c,
		phase: t ? s ? "error" : c ? "connecting" : f ? "stalled" : u ? "buffering" : "playing" : "idle",
		audioOnly: m,
		latencySec: g,
		seekToLive: T,
		retry: w
	};
}
//#endregion
//#region src/lib/video/useAudioLevel.ts
var je = 80, Me = .6;
function Ne(e) {
	let [t, n] = F(null), r = P(0);
	return M(() => {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * Me);
			r.current = c, n(c);
		}, je);
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
var Pe = [
	.55,
	.8,
	1,
	.8,
	.55
], Fe = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], Ie = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], Le = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function Re(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return Fe[Math.min(Fe.length - 1, Math.round(n * (Fe.length - 1)))];
}
function ze({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: s, "data-testid": c = "stream-audio-only" }) {
	let l = typeof r == "number" && i, u = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ L("div", {
		"data-testid": c,
		"data-measured": String(l),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", s),
		children: [
			t ? /* @__PURE__ */ I(f, {
				name: t,
				src: n,
				size: 64
			}) : /* @__PURE__ */ I("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ L("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ I("span", {
					className: "text-sm font-medium text-white",
					children: t ?? "Audio only"
				}), /* @__PURE__ */ I("span", {
					"data-testid": `${c}-hint`,
					className: "text-xs text-white/60",
					children: u
				})]
			}),
			/* @__PURE__ */ I("div", {
				"data-testid": `${c}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: Pe.map((t, n) => /* @__PURE__ */ I("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !l && i && ["uic-audio-bar", Le[n]], l ? Re(r, t) : Ie[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function Be({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function Ve(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function He(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function Ue(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function We({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = N(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: Ue(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ I("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ I(h, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var Ge = 1e4;
function Ke(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !ce(e);
}
var qe = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function Je({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = Ge, chatMessages: m, chatVisibleCount: h, chatRotateMs: g, muted: _ = !0, allowFullscreen: v = !0, showLatency: y = !0, controls: b, placeholder: x, className: S, "data-testid": C = "stream-stage" }) {
	let [w, T] = F(_);
	M(() => {
		T(_);
	}, [_]);
	let E = P(null), D = P(null), O = Ae(D, t ? null : n, {
		live: !0,
		onError: r
	}), k = P(!1);
	(t || n) && (k.current = !0);
	let A = Y(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), ee = N(() => Ke(t), [t, A]), R = N(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, A]), te = !!t && R !== !1 || !!n && !O.loading, [ne, ie] = F(!1);
	M(() => {
		if (ie(!1), te || O.error) return;
		let e = setTimeout(() => ie(!0), p);
		return () => clearTimeout(e);
	}, [
		te,
		O.error,
		p
	]);
	let B = Be({
		hasStream: !!t,
		streamHasTracks: R,
		hasPlaylist: !!n,
		hadSource: k.current,
		graceExpired: ne,
		hls: O
	}), V = O.failure ?? null, H = P(!1);
	B === "playing" && (H.current = !0);
	let U = B === "error" && V?.kind === "no-broadcast" ? H.current ? "ended" : "not-started" : B, W = U === "ended" ? B === "ended" ? "withdrawn" : "stopped" : null, G = s && Ve(U), ae = t ? ee : O.audioOnly === !0, oe = (c ?? ae) && (U === "playing" || U === "buffering" || U === "stalled"), K = Ne(oe && t ? t : null), [q, se] = F(!1);
	M(() => {
		if (typeof document > "u") return;
		let e = () => se(document.fullscreenElement === E.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let J = j(() => {
		let e = E.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), ce = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), le = O.retry, ue = j(() => {
		le?.(), i?.();
	}, [le, i]), de = !!(t || n), Z = !!n && !t, Q = de && U !== "error" && U !== "not-started" && U !== "ended", fe = Q || !!b, pe = !V || V.retryable, me = (Z || !!i) && pe, $ = V?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ L("div", {
		ref: E,
		"data-testid": C,
		"data-live": String(G),
		"data-phase": U,
		"data-audio-only": String(oe),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": V?.kind,
		"data-error-detail": V?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ I(X, {
				stream: t,
				muted: w,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ I("video", {
				ref: D,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: w,
				className: "h-full w-full object-contain"
			}) : null,
			oe && /* @__PURE__ */ I(ze, {
				"data-testid": `${C}-audio-only`,
				name: l,
				avatarUrl: u,
				level: K,
				active: U !== "stalled" && !w,
				muted: w
			}),
			U === "idle" && /* @__PURE__ */ I(Ye, {
				testId: `${C}-placeholder`,
				children: x ?? "Waiting for the stream to start…"
			}),
			U === "ended" && /* @__PURE__ */ L(Ye, {
				testId: `${C}-ended`,
				"data-ended-reason": W,
				children: [
					/* @__PURE__ */ I("span", { children: f ?? (W === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					W === "stopped" && !f && /* @__PURE__ */ I("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					W === "stopped" ? me && /* @__PURE__ */ I(Xe, {
						testId: `${C}-retry`,
						label: "Try again",
						onClick: ue
					}) : i && /* @__PURE__ */ I(Xe, {
						testId: `${C}-retry`,
						label: "Check again",
						onClick: ue
					})
				]
			}),
			U === "not-started" && /* @__PURE__ */ L(Ye, {
				testId: `${C}-not-started`,
				children: [/* @__PURE__ */ I("span", { children: d ?? "Nothing is being broadcast right now." }), me && /* @__PURE__ */ I(Xe, {
					testId: `${C}-retry`,
					label: $,
					onClick: ue
				})]
			}),
			U === "connecting" && /* @__PURE__ */ I(Ye, {
				testId: `${C}-connecting`,
				children: "Connecting…"
			}),
			U === "buffering" && /* @__PURE__ */ I("div", {
				"data-testid": `${C}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			U === "stalled" && /* @__PURE__ */ L(Ye, {
				testId: `${C}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ I("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ I("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					me && /* @__PURE__ */ I(Xe, {
						testId: `${C}-retry`,
						onClick: ue
					})
				]
			}),
			U === "error" && /* @__PURE__ */ L(Ye, {
				testId: `${C}-error`,
				dim: !0,
				children: [/* @__PURE__ */ I("span", { children: O.error ?? "This stream could not be played." }), me && /* @__PURE__ */ I(Xe, {
					testId: `${C}-retry`,
					label: $,
					onClick: ue
				})]
			}),
			(a || G || z(o)) && /* @__PURE__ */ L("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					G && /* @__PURE__ */ I("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ I("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					z(o) && /* @__PURE__ */ I(re, { count: o })
				]
			}),
			m && m.length > 0 && /* @__PURE__ */ I(We, {
				messages: m,
				visibleCount: h,
				rotateMs: g,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			fe && /* @__PURE__ */ L("div", {
				"data-testid": `${C}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					Q && Z && y && (U === "playing" || U === "buffering") && /* @__PURE__ */ I("button", {
						type: "button",
						"data-testid": `${C}-latency`,
						onClick: () => O.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(qe, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof O.latencySec == "number" && Number.isFinite(O.latencySec) ? `${Math.max(1, Math.round(O.latencySec))}s behind` : "Behind live"
					}),
					Q && G && /* @__PURE__ */ L("button", {
						type: "button",
						"data-testid": `${C}-mute-toggle`,
						"aria-label": w ? "Unmute" : "Mute",
						"aria-pressed": w,
						onClick: () => T((e) => !e),
						className: e(qe, w ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ I("span", {
							"aria-hidden": !0,
							children: w ? "🔇" : "🔊"
						}), w ? "Unmute" : "Mute"]
					}),
					Q && v && ce && /* @__PURE__ */ L("button", {
						type: "button",
						"data-testid": `${C}-fullscreen`,
						"aria-label": q ? "Exit full screen" : "Full screen",
						"aria-pressed": q,
						onClick: J,
						className: e(qe, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ I("span", {
							"aria-hidden": !0,
							children: q ? "↙" : "↗"
						}), q ? "Exit" : "Full screen"]
					}),
					b
				]
			})
		]
	});
}
function Ye({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ I("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function Xe({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(qe, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var Ze = {
	microphone: "Mic",
	camera: "Camera"
}, Qe = {
	microphone: "microphone",
	camera: "camera"
}, $e = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, et = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function tt({ kind: t, on: n, onToggle: r, devices: a, selectedDeviceId: o, onSelectDevice: s, permission: c, level: l, size: u = "sm", showLabel: d = !1, extraItems: f, disabledReason: p, className: m, "data-testid": h = `device-toggle-${t}` }) {
	let _ = c === "denied" || c === "unavailable", v = p ?? (c === "denied" ? $e[t] : c === "unavailable" ? et[t] : void 0), y = !!v || _, S = n && !y, w = t === "microphone" && S && (l ?? 0) > .08, T = u === "md" ? 20 : 18, E;
	E = I(t === "microphone" ? S ? C : b : S ? x : O, { size: T });
	let D = `${Ze[t]} ${S ? "on" : "off"}`, k = S ? `Turn ${Qe[t]} off` : `Turn ${Qe[t]} on`, A = a.length ? a.map((e) => ({
		label: e.label,
		checked: e.deviceId === o,
		onSelect: () => s(e.deviceId),
		"data-testid": `${h}-device-${e.deviceId}`
	})) : [{
		label: et[t],
		disabled: !0
	}], j = u === "md" ? "h-10" : "h-8", M = !S && t === "microphone" && !y ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ L("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", w && "ring-2 ring-primary/50", j, m),
		"data-kind": t,
		"data-on": S ? "true" : "false",
		"data-permission": c,
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			onClick: y ? void 0 : r,
			disabled: y,
			"aria-pressed": S,
			"aria-label": d ? void 0 : k,
			title: v ?? k,
			"data-testid": h,
			className: e("inline-flex cursor-pointer items-center gap-2 rounded-l-md border-none bg-transparent font-[inherit] text-sm font-medium", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", u === "md" ? "px-2.5" : "px-2", d && "min-w-0 flex-1 justify-start gap-1.5 pr-2", M),
			children: [E, d && /* @__PURE__ */ I("span", {
				className: "min-w-0 truncate whitespace-nowrap",
				children: D
			})]
		}), /* @__PURE__ */ I(g, {
			trigger: /* @__PURE__ */ I(i, { size: 14 }),
			triggerLabel: `Choose ${Qe[t]}`,
			triggerTitle: `Choose ${Qe[t]}`,
			triggerTestId: `${h}-menu`,
			triggerVariant: "link",
			triggerClassName: e("h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary", u === "md" && "px-2"),
			align: "end",
			"data-testid": `${h}-menu-panel`,
			sections: [{
				label: t === "microphone" ? "Microphone" : "Camera",
				items: A
			}, ...f?.length ? [{ items: f }] : []]
		})]
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function nt({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
	let s = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0, c = i ? 0 : Math.round(s * n), l = Math.round(s * 100);
	return /* @__PURE__ */ I("div", {
		role: "meter",
		"aria-label": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": i ? 0 : l,
		"data-testid": o,
		"data-lit": c,
		className: e("inline-flex items-center gap-[3px]", a),
		children: Array.from({ length: n }, (t, n) => /* @__PURE__ */ I("span", {
			"aria-hidden": "true",
			className: e("h-3.5 w-1.5 rounded-[2px] transition-colors duration-75", n < c ? "bg-success" : "bg-border")
		}, n))
	});
}
//#endregion
//#region src/components/video/VolumeSlider.tsx
function rt({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: o = !1, muted: s = !1, disabled: c = !1, className: l, "data-testid": u = "settings-volume", testButtonTestId: f = "settings-test-sound" }) {
	let p = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ L("div", {
		className: e("flex items-center gap-3", l),
		children: [
			/* @__PURE__ */ I(y, {
				size: 20,
				className: e("shrink-0", s ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ I(d, {
				value: p,
				onChange: (e) => r(e / 100),
				min: 0,
				max: 100,
				step: 1,
				readout: !1,
				disabled: c,
				"aria-label": "Speaker volume",
				"data-testid": u,
				className: "min-w-0 flex-1"
			}),
			i && /* @__PURE__ */ I(t, {
				variant: "ghost",
				size: "md",
				onClick: i,
				disabled: c || o,
				"data-testid": f,
				className: "shrink-0 font-medium",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/video/AudioVideoSettingsForm.tsx
var it = [
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
], at = [
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
function ot(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function st({ children: t, divided: n = !0, className: r }) {
	return /* @__PURE__ */ I("section", {
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border", r),
		children: t
	});
}
function ct({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ I("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function lt({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ L("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ I(v, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function ut({ value: n, onChange: r, devices: i, permission: a, micLevel: s, previewStream: c, cameraOn: d, speakerSelectionSupported: m, onTestMic: h, onTestSound: g, testMicState: v = "idle", selfName: y = "You", selfAvatarUrl: b, className: x, "data-testid": S = "audio-video-settings-form" }) {
	let C = (e) => r({
		...n,
		...e
	}), w = a.microphone === "denied", T = a.camera === "denied", E = "w-full h-9 text-sm", D = v === "recording" ? "Recording…" : v === "playing" ? "Playing…" : "Test mic", O;
	return O = T ? null : d ? c ? /* @__PURE__ */ I(X, {
		stream: c,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ I("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ I(l, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ L("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ I(f, {
			name: y,
			size: 48,
			...b ? { src: b } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), /* @__PURE__ */ L("div", {
		className: e("flex flex-col", x),
		"data-testid": S,
		children: [
			/* @__PURE__ */ L(st, { children: [
				/* @__PURE__ */ I(ct, {
					htmlFor: `${S}-mic`,
					children: "Microphone"
				}),
				w ? /* @__PURE__ */ I(p, {
					tone: "error",
					"data-testid": "settings-mic-denied",
					children: "Microphone blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ I(_, {
					chevron: "custom",
					id: `${S}-mic`,
					value: n.microphoneId ?? i.microphones[0]?.deviceId ?? "",
					onChange: (e) => C({ microphoneId: e.target.value }),
					options: ot(i.microphones, "No microphone found"),
					disabled: i.microphones.length === 0,
					className: E,
					"data-testid": "settings-mic-select"
				}),
				/* @__PURE__ */ L("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ I("span", {
							className: "w-24 shrink-0 text-sm text-text-primary",
							children: "Input level"
						}),
						/* @__PURE__ */ I(nt, {
							level: s,
							disabled: w,
							"data-testid": "settings-mic-level"
						}),
						/* @__PURE__ */ I(t, {
							variant: "ghost",
							onClick: () => void h(),
							disabled: w || v !== "idle",
							"data-testid": "settings-test-mic",
							className: "ml-auto shrink-0 font-medium",
							children: D
						})
					]
				}),
				/* @__PURE__ */ L("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ I("span", {
						id: `${S}-noise`,
						className: "text-sm text-text-primary",
						children: "Noise reduction"
					}), /* @__PURE__ */ I(u, {
						checked: n.noiseSuppression,
						onChange: (e) => C({ noiseSuppression: e }),
						disabled: w,
						"aria-labelledby": `${S}-noise`,
						"data-testid": "settings-noise"
					})]
				})
			] }),
			/* @__PURE__ */ L(st, { children: [
				m && /* @__PURE__ */ L(ee, { children: [/* @__PURE__ */ I(ct, {
					htmlFor: `${S}-speaker`,
					children: "Speakers"
				}), /* @__PURE__ */ I(_, {
					chevron: "custom",
					id: `${S}-speaker`,
					value: n.speakerId ?? i.speakers[0]?.deviceId ?? "",
					onChange: (e) => C({ speakerId: e.target.value }),
					options: ot(i.speakers, "No speakers found"),
					disabled: i.speakers.length === 0,
					className: E,
					"data-testid": "settings-speaker-select"
				})] }),
				!m && /* @__PURE__ */ I(ct, { children: "Volume" }),
				/* @__PURE__ */ I(rt, {
					value: n.volume,
					onChange: (e) => C({ volume: e }),
					onTest: () => void g()
				})
			] }),
			/* @__PURE__ */ L(st, { children: [
				/* @__PURE__ */ I(ct, {
					htmlFor: `${S}-camera`,
					children: "Camera"
				}),
				T ? /* @__PURE__ */ I(p, {
					tone: "error",
					"data-testid": "settings-camera-denied",
					children: "Camera blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ L(ee, { children: [/* @__PURE__ */ I(_, {
					chevron: "custom",
					id: `${S}-camera`,
					value: n.cameraId ?? i.cameras[0]?.deviceId ?? "",
					onChange: (e) => C({ cameraId: e.target.value }),
					options: ot(i.cameras, "No camera found"),
					disabled: i.cameras.length === 0,
					className: E,
					"data-testid": "settings-camera-select"
				}), /* @__PURE__ */ L("div", {
					className: "relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage",
					"data-testid": "settings-preview",
					"data-mirrored": n.mirrorPreview ? "true" : "false",
					children: [O, /* @__PURE__ */ I("span", {
						className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
						children: "Your preview"
					})]
				})] }),
				/* @__PURE__ */ I(lt, {
					checked: n.mirrorPreview,
					onChange: (e) => C({ mirrorPreview: e }),
					testId: "settings-mirror",
					children: "Mirror my preview"
				}),
				/* @__PURE__ */ L("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ I("label", {
						htmlFor: `${S}-quality`,
						className: "text-sm text-text-primary",
						children: "Quality"
					}), /* @__PURE__ */ I(_, {
						chevron: "custom",
						id: `${S}-quality`,
						value: n.quality,
						onChange: (e) => C({ quality: e.target.value }),
						options: it,
						className: "h-9 w-full text-sm",
						wrapperClassName: "w-32 shrink-0",
						"data-testid": "settings-quality"
					})]
				})
			] }),
			/* @__PURE__ */ I(st, {
				className: "py-1.5",
				children: /* @__PURE__ */ L(o, {
					summary: "Advanced",
					variant: "plain",
					density: "compact",
					"data-testid": "settings-advanced",
					summaryClassName: "text-[15px] font-medium text-text-primary",
					bodyClassName: "flex flex-col gap-3 pt-3",
					children: [
						/* @__PURE__ */ L("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ I("span", {
								id: `${S}-echo`,
								className: "text-sm text-text-primary",
								children: "Echo cancellation"
							}), /* @__PURE__ */ I(u, {
								checked: n.echoCancellation,
								onChange: (e) => C({ echoCancellation: e }),
								"aria-labelledby": `${S}-echo`,
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ L("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ I("span", {
								id: `${S}-agc`,
								className: "text-sm text-text-primary",
								children: "Auto gain control"
							}), /* @__PURE__ */ I(u, {
								checked: n.autoGainControl,
								onChange: (e) => C({ autoGainControl: e }),
								"aria-labelledby": `${S}-agc`,
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ L("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ I("label", {
								htmlFor: `${S}-fps`,
								className: "text-sm text-text-primary",
								children: "Frame rate"
							}), /* @__PURE__ */ I(_, {
								chevron: "custom",
								id: `${S}-fps`,
								value: String(n.frameRate),
								onChange: (e) => {
									let t = e.target.value;
									C({ frameRate: t === "auto" ? "auto" : Number(t) });
								},
								options: at,
								className: "h-9 w-full text-sm",
								wrapperClassName: "w-32 shrink-0",
								"data-testid": "settings-frame-rate"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ I(st, {
				divided: !1,
				className: "pt-2.5 pb-0",
				children: /* @__PURE__ */ I(lt, {
					checked: n.rememberDevices,
					onChange: (e) => C({ rememberDevices: e }),
					testId: "settings-remember",
					children: "Use these devices next time"
				})
			})
		]
	});
}
//#endregion
//#region src/components/video/CallDock.tsx
function dt(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function ft(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
var pt = A(function({ phase: e, callingTo: t, participantCount: n, elapsedMs: r }) {
	B("meta");
	let i;
	return i = e === "calling" ? t ? `Calling ${t}…` : "Calling…" : e === "connecting" ? "Connecting…" : e === "reconnecting" ? /* @__PURE__ */ I("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${ft(n)}${r == null ? "" : ` · ${dt(r)}`}`, /* @__PURE__ */ I("span", {
		className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
		"data-testid": "call-dock-meta",
		children: i
	});
});
function mt(e, t, n) {
	return {
		...e,
		id: e.userId,
		isLocal: t,
		isMuted: !e.audioOn,
		videoElement: e.videoElement,
		cameraOff: !e.cameraOn && !e.screenSharing,
		audioElement: e.audioElement,
		screenSharing: e.screenSharing,
		reconnecting: n || e.connection === "reconnecting"
	};
}
var ht = A(function({ participants: e, localParticipantId: t, activeSpeakerId: n, followingUserId: r, reconnecting: i, compact: a, onTileClick: o, title: s }) {
	let c = e.find((e) => e.userId === t) ?? null, l = e.filter((e) => e.userId !== t);
	return /* @__PURE__ */ I(V, {
		variant: "dock",
		participants: l.map((e) => mt(e, !1, i)),
		localParticipant: c ? mt(c, !0, i) : null,
		activeSpeakerId: n,
		highlightedId: r,
		tileWidth: a ? 132 : 176,
		tileHeight: a ? 74 : 88,
		overflow: "collapse",
		maxVisible: a ? 5 : 6,
		...o ? { onParticipantClick: o } : {},
		title: s,
		"data-testid": "call-dock-tile-row"
	});
});
function gt({ title: r, participantCount: i, elapsedMs: o, phase: u, callingTo: d, documents: f = [], participants: p, localParticipantId: h, activeSpeakerId: g = null, followingUserId: _ = null, mic: v, camera: y, screenShare: b, onOpenPeople: x, onOpenDocuments: C, peopleOpen: E = !1, documentsOpen: O = !1, onOpenSettings: A, extras: M, onPopOut: N, onLeave: R, canEndForEveryone: te = !1, onEndForEveryone: ne, onTileClick: z, onTitleClick: re, onDocumentClick: ie, endedSummary: B, error: V, onDismiss: H, compact: U = !1, className: W, "data-testid": G = "call-dock" }) {
	let ae = P(null), [oe, K] = F(!1), q = P(z);
	q.current = z;
	let se = j((e) => q.current?.(e), []);
	if (u === "error" && V) return /* @__PURE__ */ I("div", {
		className: e("border-t border-border bg-surface px-5 py-3", W),
		"data-testid": G,
		"data-phase": "error",
		children: /* @__PURE__ */ I(c, {
			variant: "error",
			title: V.title ?? `Lost the call — ${V.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ L("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ I(t, {
					size: "sm",
					onClick: V.onRetry,
					"data-testid": "call-dock-rejoin",
					children: V.retryLabel ?? "Rejoin"
				}), H && /* @__PURE__ */ I(t, {
					size: "sm",
					variant: "ghost",
					onClick: H,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (u === "ended") return /* @__PURE__ */ L("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", W),
		"data-testid": G,
		"data-phase": "ended",
		children: [/* @__PURE__ */ L("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ I("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				o != null && /* @__PURE__ */ L(ee, { children: [" · ", dt(o)] }),
				B != null && /* @__PURE__ */ L(ee, { children: [" · ", B] })
			]
		}), H && /* @__PURE__ */ I(t, {
			variant: "link",
			onClick: H,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let J = u === "calling", Y = u === "connecting", ce = u === "reconnecting", X = () => {
		!J && te && ne ? K(!0) : R();
	};
	return /* @__PURE__ */ L("section", {
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", W),
		"aria-label": `Call: ${r}`,
		"data-testid": G,
		"data-phase": u,
		"data-compact": U ? "true" : "false",
		children: [/* @__PURE__ */ L("div", {
			className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2",
			"data-testid": `${G}-header`,
			children: [/* @__PURE__ */ L("div", {
				className: "flex min-w-0 flex-auto items-baseline gap-3",
				children: [
					/* @__PURE__ */ I("button", {
						type: "button",
						onClick: re,
						disabled: !re,
						className: "max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline",
						"data-testid": "call-dock-title",
						title: r,
						children: r
					}),
					/* @__PURE__ */ I(pt, {
						phase: u,
						callingTo: d,
						participantCount: i,
						elapsedMs: o
					}),
					f.length > 0 && /* @__PURE__ */ I("span", {
						className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
						"data-testid": "call-dock-documents-chips",
						children: f.map((t) => /* @__PURE__ */ L("button", {
							type: "button",
							onClick: ie ? () => ie(t.id) : void 0,
							className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", ie ? "cursor-pointer hover:underline" : "cursor-default"),
							"data-testid": `call-dock-document-${t.id}`,
							"data-presenting": t.presenting ? "true" : "false",
							title: t.presenting ? `${t.title} · Presenting` : t.title,
							children: [/* @__PURE__ */ I(a, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ I("span", {
								className: "truncate",
								children: t.title
							})]
						}, t.id))
					})
				]
			}), /* @__PURE__ */ L("div", {
				className: "ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2",
				"data-testid": `${G}-controls`,
				children: [
					/* @__PURE__ */ I(tt, {
						kind: "microphone",
						...v,
						"data-testid": "call-dock-mic",
						...Y ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ I(tt, {
						kind: "camera",
						...y,
						"data-testid": "call-dock-camera",
						...Y ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ L(t, {
						variant: b.on ? "danger" : "ghost",
						size: "sm",
						onClick: b.onToggle,
						disabled: Y || J || !!b.disabledReason,
						title: J ? "You can share once someone joins" : b.disabledReason ?? (b.on ? "Stop sharing" : "Share your screen"),
						"aria-label": b.on ? "Stop sharing" : "Share",
						"aria-pressed": b.on,
						"data-testid": "call-dock-share",
						className: "inline-flex h-8 items-center gap-1.5 bg-surface font-medium",
						children: [/* @__PURE__ */ I(w, { size: 16 }), /* @__PURE__ */ I("span", {
							className: "hidden @min-[860px]:inline",
							children: b.on ? "Stop sharing" : "Share"
						})]
					}),
					/* @__PURE__ */ L(t, {
						variant: E ? "secondary" : "ghost",
						size: "sm",
						onClick: x,
						disabled: Y,
						"aria-label": `People (${i})`,
						"aria-pressed": E,
						"data-testid": "call-dock-people",
						className: e("inline-flex h-8 items-center gap-1.5 font-medium", !E && "bg-surface"),
						children: [
							/* @__PURE__ */ I(k, { size: 16 }),
							/* @__PURE__ */ I("span", {
								className: "hidden @min-[860px]:inline",
								children: "People"
							}),
							/* @__PURE__ */ I(s, {
								variant: "count",
								value: i,
								color: "muted",
								"aria-label": `${i} people`
							})
						]
					}),
					C && /* @__PURE__ */ L(t, {
						variant: O ? "secondary" : "ghost",
						size: "sm",
						onClick: C,
						disabled: Y,
						"aria-label": `Documents (${f.length})`,
						"aria-pressed": O,
						"data-testid": "call-dock-documents",
						className: e("hidden h-8 items-center gap-1.5 font-medium @min-[980px]:inline-flex", !O && "bg-surface"),
						children: [
							/* @__PURE__ */ I(a, { size: 16 }),
							/* @__PURE__ */ I("span", {
								className: "hidden @min-[860px]:inline",
								children: "Documents"
							}),
							/* @__PURE__ */ I(s, {
								variant: "count",
								value: f.length,
								color: "muted",
								"aria-label": `${f.length} documents`
							})
						]
					}),
					M != null && /* @__PURE__ */ I("div", {
						className: "contents",
						"data-testid": "call-dock-extras",
						children: M
					}),
					/* @__PURE__ */ L("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-testid": "call-dock-end",
						children: [
							/* @__PURE__ */ I(n, {
								"aria-label": "Call settings",
								title: "Call settings",
								variant: "outline",
								onClick: A,
								icon: /* @__PURE__ */ I(S, { size: 18 }),
								"data-testid": "call-dock-settings"
							}),
							/* @__PURE__ */ I(n, {
								"aria-label": "Pop out the call",
								title: "Pop out the call",
								variant: "outline",
								onClick: N,
								disabled: Y,
								icon: /* @__PURE__ */ I(T, { size: 16 }),
								"data-testid": "call-dock-popout"
							}),
							/* @__PURE__ */ L(t, {
								ref: ae,
								variant: "danger-solid",
								size: "sm",
								onClick: X,
								"aria-haspopup": te && !J ? "dialog" : void 0,
								title: J ? "Cancel the call" : void 0,
								"data-testid": "call-dock-leave",
								className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5 font-medium",
								children: [/* @__PURE__ */ I(D, { size: 16 }), J ? "Cancel" : "Leave"]
							})
						]
					}),
					/* @__PURE__ */ L(m, {
						trigger: ae,
						open: oe,
						onClose: () => K(!1),
						placement: "bottom-end",
						"aria-label": "Leave the call",
						"data-testid": "call-dock-leave-confirm",
						className: "w-64 p-3",
						children: [/* @__PURE__ */ I("p", {
							className: "m-0 mb-3 text-sm text-text-primary",
							children: "Leave the call? Others stay on."
						}), /* @__PURE__ */ L("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ I(t, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									K(!1), R();
								},
								"data-testid": "call-dock-leave-confirm-leave",
								children: "Leave"
							}), /* @__PURE__ */ I(t, {
								variant: "danger-solid",
								size: "sm",
								onClick: () => {
									K(!1), ne?.();
								},
								"data-testid": "call-dock-end-for-everyone",
								children: "End for everyone"
							})]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ L("div", {
			className: "relative",
			"data-testid": "call-dock-tiles",
			children: [ce && /* @__PURE__ */ I("div", {
				className: "mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg",
				role: "status",
				"data-testid": "call-dock-reconnecting",
				children: "Reconnecting…"
			}), Y ? /* @__PURE__ */ I("div", {
				className: "flex gap-2",
				"data-testid": "call-dock-connecting",
				children: /* @__PURE__ */ I("div", {
					className: e("shrink-0 overflow-hidden rounded-md", U ? "h-[74px] w-[132px]" : "h-[88px] w-[176px]"),
					children: /* @__PURE__ */ I(l, {
						height: "100%",
						rounded: "md"
					})
				})
			}) : /* @__PURE__ */ I(ht, {
				participants: p,
				localParticipantId: h,
				activeSpeakerId: g,
				followingUserId: _,
				reconnecting: ce,
				compact: U,
				onTileClick: z ? se : void 0,
				title: r
			})]
		})]
	});
}
//#endregion
export { oe as A, X as C, K as D, J as E, re as M, z as N, q as O, R as P, ue as S, Y as T, xe as _, nt as a, ge as b, Ke as c, He as d, Be as f, Ae as g, Ce as h, rt as i, V as j, ae as k, We as l, Ne as m, dt as n, tt as o, ze as p, ut as r, Je as s, gt as t, Ve as u, be as v, ce as w, de as x, fe as y };
