import { t as e } from "./cn-D4QmbyEy.js";
import { n as t, t as n } from "./Button-uREUOWUk.js";
import { t as r } from "./IconButton-IE5g44md.js";
import { K as i, S as a, m as o, nt as s } from "./Icons-GSE-QGuJ.js";
import { _ as c, a as l, b as u, h as d, i as f, p, r as m, s as h, u as g, x as _, y as v } from "./MediaIcons-_ai5Til2.js";
import { t as y } from "./Text-4BIlhd_-.js";
import { n as b, t as x } from "./Badge-B51Hl2wN.js";
import { t as S } from "./Banner-CU6GChN-.js";
import { t as C } from "./Select-DjpQtNw3.js";
import { t as w } from "./InlinePopover-BSeEQkYe.js";
import { t as T } from "./SkeletonCard-D3FL0TB7.js";
import { n as E, t as D } from "./Slider-DEbQCKD1.js";
import { t as O } from "./DropdownMenu-BvzGTOgf.js";
import { t as k } from "./Textarea-BwvE1HPn.js";
import { t as A } from "./Avatar-CpUrJRJP.js";
import { t as j } from "./SegmentedControl-CSn7GyT9.js";
import { t as M } from "./InlineAlert-CBtteaVZ.js";
import { t as N } from "./ActivityFeed-Cp6MhNab.js";
import { t as ee } from "./NumberInput-D_suV6tQ.js";
import { t as P } from "./Checkbox-Jycr-rlf.js";
import { t as te } from "./InlineEditableText-CdErtRnG.js";
import { memo as F, useCallback as ne, useEffect as I, useId as re, useLayoutEffect as L, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/video/MeetingIcons.tsx
function W(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.75,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		focusable: !1,
		...t
	};
}
function ie({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11" }),
			/* @__PURE__ */ H("path", { d: "M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" }),
			/* @__PURE__ */ H("path", { d: "M14 10.5V5.5a1.5 1.5 0 0 1 3 0v8" }),
			/* @__PURE__ */ H("path", { d: "M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.1l3.4 4.6A6 6 0 0 0 12.4 20h.6a4 4 0 0 0 4-4v-2.5" })
		]
	});
}
function ae({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ H("path", { d: "M8.5 14a4.5 4.5 0 0 0 7 0" }),
			/* @__PURE__ */ H("line", {
				x1: "9",
				y1: "9.5",
				x2: "9",
				y2: "9.6"
			}),
			/* @__PURE__ */ H("line", {
				x1: "15",
				y1: "9.5",
				x2: "15",
				y2: "9.6"
			})
		]
	});
}
function oe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2"
			}),
			/* @__PURE__ */ H("line", {
				x1: "12",
				y1: "3.5",
				x2: "12",
				y2: "20.5"
			}),
			/* @__PURE__ */ H("line", {
				x1: "3.5",
				y1: "12",
				x2: "20.5",
				y2: "12"
			})
		]
	});
}
function se({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("rect", {
				x: "5",
				y: "3",
				width: "14",
				height: "18",
				rx: "2"
			}),
			/* @__PURE__ */ H("line", {
				x1: "8.5",
				y1: "8",
				x2: "15.5",
				y2: "8"
			}),
			/* @__PURE__ */ H("line", {
				x1: "8.5",
				y1: "12",
				x2: "15.5",
				y2: "12"
			}),
			/* @__PURE__ */ H("line", {
				x1: "8.5",
				y1: "16",
				x2: "12.5",
				y2: "16"
			})
		]
	});
}
function ce({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [/* @__PURE__ */ H("rect", {
			x: "3.5",
			y: "3.5",
			width: "17",
			height: "17",
			rx: "2.5"
		}), /* @__PURE__ */ H("rect", {
			x: "11",
			y: "11",
			width: "6.5",
			height: "6.5",
			rx: "1.5"
		})]
	});
}
function G({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2.5"
			}),
			/* @__PURE__ */ H("line", {
				x1: "12",
				y1: "8",
				x2: "12",
				y2: "16"
			}),
			/* @__PURE__ */ H("line", {
				x1: "8",
				y1: "12",
				x2: "16",
				y2: "12"
			})
		]
	});
}
function le({ size: e = 20, ...t }) {
	return /* @__PURE__ */ H("svg", {
		...W(e, t),
		children: /* @__PURE__ */ H("path", { d: "M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" })
	});
}
function ue({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...W(e, t),
		children: [
			/* @__PURE__ */ H("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "13",
				rx: "2"
			}),
			/* @__PURE__ */ H("path", { d: "M12 14V8.5" }),
			/* @__PURE__ */ H("path", { d: "m9.25 11 2.75-2.75L14.75 11" })
		]
	});
}
//#endregion
//#region src/components/video/RaisedHandBadge.tsx
function K(e) {
	return e ? typeof e == "number" ? `Hand raised, ${de(e)} in line` : "Hand raised" : null;
}
function de(e) {
	let t = [
		"th",
		"st",
		"nd",
		"rd"
	], n = e % 100;
	return `${e}${t[(n - 20) % 10] ?? t[n] ?? t[0]}`;
}
function q({ raised: t, tone: n = "chip", size: r = "sm", className: i, "data-testid": a = "raised-hand-badge" }) {
	let o = K(t);
	return o ? /* @__PURE__ */ U("span", {
		role: "img",
		"aria-label": o,
		title: o,
		"data-testid": a,
		"data-hand-position": typeof t == "number" ? t : void 0,
		className: e("inline-flex shrink-0 items-center gap-0.5 rounded-full font-semibold leading-none tabular-nums", r === "sm" ? "h-4 px-1 text-[10px]" : "h-5 px-1.5 text-xs", n === "chip" ? "bg-warning-bg text-warning-fg" : "bg-warning text-white", i),
		children: [/* @__PURE__ */ H(ie, { size: r === "sm" ? 11 : 13 }), typeof t == "number" && /* @__PURE__ */ H("span", { children: t })]
	}) : null;
}
//#endregion
//#region src/components/video/ParticipantTile.tsx
function J({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, handRaised: o, isLocal: s = !1, isSpotlight: c = !1, videoElement: l, onClick: u, fillParent: d = !1, className: f, style: p }) {
	let m = s ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ U("div", {
		className: e("relative bg-video-tile flex items-center justify-center rounded overflow-hidden border-2 transition-colors", d ? "w-full h-full" : "aspect-video", i ? "border-success" : "border-transparent", u && "cursor-pointer hover:border-white/30", f),
		style: p,
		onClick: u,
		role: u ? "button" : void 0,
		tabIndex: u ? 0 : void 0,
		onKeyDown: u ? (e) => {
			(e.key === "Enter" || e.key === " ") && u();
		} : void 0,
		"data-testid": m,
		"data-peer-id": t,
		"data-peer-name": n,
		"data-is-local": s ? "true" : "false",
		"data-is-spotlight": c ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-hand-raised": o ? "true" : void 0,
		"data-track-kind": l ? "camera" : "avatar",
		children: [
			l ?? /* @__PURE__ */ H("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: X(n) },
				children: /* @__PURE__ */ H("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", c ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ H("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : Y(n)
				})
			}),
			/* @__PURE__ */ U("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					s && /* @__PURE__ */ H("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!s && /* @__PURE__ */ H("span", {
						className: "truncate font-medium",
						children: n
					}),
					/* @__PURE__ */ H(q, {
						raised: o,
						tone: "overlay",
						"data-testid": "tile-raised-hand"
					}),
					a && /* @__PURE__ */ H("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ H("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ H("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", c ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ U("svg", {
					width: c ? 16 : 12,
					height: c ? 16 : 12,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": !0,
					children: [
						/* @__PURE__ */ H("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ H("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ H("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ H("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ H("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ H("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function Y(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function X(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function fe(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function pe({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!fe(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ U("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ U("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ H("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ H("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ U("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/video/callDockRenderProbe.ts
var Z = null;
function Q(e, t) {
	Z?.(e, t);
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function me({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = R(() => {
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
	]), m = he(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ U("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ H(J, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === r,
				isMuted: e.isMuted,
				handRaised: e.handRaised,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: a,
				onClick: i ? () => i(e.id) : void 0
			}, e.id)),
			p.length === 0 && /* @__PURE__ */ H("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", a ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			f && n && /* @__PURE__ */ H("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: o },
				children: /* @__PURE__ */ H(J, {
					id: n.id,
					displayName: n.displayName,
					avatarUrl: n.avatarUrl,
					isMuted: n.isMuted,
					handRaised: n.handRaised,
					isLocal: !0,
					videoElement: n.videoElement
				})
			})
		]
	});
}
function he(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function ge({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: f = 84, tileTestIdPrefix: p = "call-tile", maxColumns: m, className: h, style: g, "data-testid": _ = "call-tile-row" }) {
	if (c === "grid") {
		let i = n ? [n, ...t] : t, a = m ? Math.max(1, Math.min(he(i.length), m)) : he(i.length);
		return /* @__PURE__ */ H("div", {
			className: e("grid w-full min-w-0 gap-2", _e[a] ?? _e[4], h),
			style: g,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": _,
			"data-variant": "grid",
			"data-tile-count": i.length,
			"data-columns": a,
			children: i.map((e) => /* @__PURE__ */ H(xe, {
				participant: e,
				width: 0,
				height: 0,
				fluid: !0,
				speaking: e.id === r,
				highlighted: e.id === l,
				testId: `${p}-${e.id}`,
				...s ? { onParticipantClick: s } : {}
			}, e.id))
		});
	}
	if (c === "dock") return /* @__PURE__ */ H(ye, {
		all: n ? [n, ...t] : t,
		activeSpeakerId: r ?? null,
		highlightedId: l,
		tileWidth: i,
		tileHeight: f,
		overflow: u,
		maxVisible: d,
		tileTestIdPrefix: p,
		title: o,
		...s ? { onParticipantClick: s } : {},
		...h ? { className: h } : {},
		...g ? { style: g } : {},
		testId: _
	});
	let v = n ? [...t, n] : t, y = v.map((t) => /* @__PURE__ */ H(J, {
		id: t.id,
		displayName: t.displayName,
		...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
		isMuted: t.isMuted,
		handRaised: t.handRaised,
		isLocal: t.isLocal,
		isSpeaking: t.id === r,
		videoElement: t.videoElement,
		...s ? { onClick: () => s(t.id) } : {},
		className: e("shrink-0", c === "floating" && "rounded-xl shadow-lg ring-1 ring-black/10", t.id === l && "ring-2 ring-primary"),
		style: { width: i }
	}, t.id)), b = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ U("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "floating",
		"data-tile-count": v.length,
		children: [/* @__PURE__ */ H("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${_}-tiles`,
			children: v.map((t) => t.videoElement ? /* @__PURE__ */ H(J, {
				id: t.id,
				displayName: t.displayName,
				...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
				isMuted: t.isMuted,
				handRaised: t.handRaised,
				isLocal: t.isLocal,
				isSpeaking: t.id === r,
				videoElement: t.videoElement,
				...s ? { onClick: () => s(t.id) } : {},
				className: e("shrink-0 rounded-xl !border-0 shadow-lg ring-2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&>*:first-child]:h-full [&>*:first-child]:w-full", t.id === l ? "ring-primary" : t.id === r ? "ring-success" : "ring-white/80"),
				style: { width: i }
			}, t.id) : /* @__PURE__ */ H(Ce, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ H("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${_}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ U("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "bar",
		"data-tile-count": v.length,
		children: [
			o && /* @__PURE__ */ H("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${_}-title`,
				children: o
			}),
			/* @__PURE__ */ H("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${_}-tiles`,
				children: y
			}),
			a && /* @__PURE__ */ H("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${_}-controls`,
				children: a
			})
		]
	});
}
var _e = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function ve(e) {
	if (!e.length) return [];
	let t = e[0].offsetTop;
	return e.flatMap((e, n) => e.offsetTop > t + 1 ? [n] : []);
}
function ye({ all: t, activeSpeakerId: n, highlightedId: r, tileWidth: i, tileHeight: a, overflow: o, maxVisible: s, tileTestIdPrefix: c, title: l, onParticipantClick: u, className: d, style: f, testId: p }) {
	let m = o === "collapse" && t.length > s ? t.slice(0, Math.max(1, s - 1)) : t, h = t.slice(m.length), g = z(null), [_, v] = B(null), y = m.map((e) => e.id).join("|");
	L(() => {
		let e = g.current;
		if (!e || o !== "collapse") return;
		let t = () => {
			let t = [...e.children].filter((e) => e instanceof HTMLElement && e.dataset.dockItem === "true"), n = ve(t);
			if (!n.length) {
				v((e) => e && null);
				return;
			}
			let r = [], i = 0;
			for (let e of n) {
				let n = t[e];
				n.dataset.dockOverflow === "true" ? (i += h.length, r.push(...h.map((e) => e.displayName))) : (i += 1, r.push(n.dataset.dockName ?? ""));
			}
			let a = t[n[0] - 1], o = a ? a.offsetLeft + a.offsetWidth : 0, s = {
				hidden: i,
				names: r.join(", "),
				left: o
			};
			v((e) => e && e.hidden === s.hidden && e.left === s.left && e.names === s.names ? e : s);
		};
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [
		o,
		y,
		h.length
	]);
	let b = o === "collapse";
	return /* @__PURE__ */ U("div", {
		className: e("relative min-w-0", d),
		style: f,
		children: [/* @__PURE__ */ U("div", {
			ref: g,
			className: e("flex min-w-0 items-center gap-2", b ? "flex-wrap overflow-hidden" : "overflow-x-auto"),
			style: b ? { height: a } : void 0,
			role: "group",
			"aria-label": typeof l == "string" ? `Call: ${l}` : "Call participants",
			"data-testid": p,
			"data-variant": "dock",
			"data-tile-count": t.length,
			"data-hidden-count": _?.hidden ?? 0,
			children: [m.map((e) => /* @__PURE__ */ H(xe, {
				participant: e,
				width: i,
				height: a,
				speaking: e.id === n,
				highlighted: e.id === r,
				testId: `${c}-${e.id}`,
				...u ? { onParticipantClick: u } : {}
			}, e.id)), h.length > 0 && /* @__PURE__ */ U("div", {
				className: "relative flex shrink-0 items-center justify-center rounded-md bg-video-tile text-white",
				style: {
					width: i,
					height: a
				},
				"data-testid": `${c}-overflow`,
				"data-dock-item": "true",
				"data-dock-overflow": "true",
				"aria-label": `${h.length} more`,
				title: h.map((e) => e.displayName).join(", "),
				role: "img",
				children: [h.map((e) => (e.videoElement != null || e.audioElement != null) && /* @__PURE__ */ U("div", {
					className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
					"aria-hidden": "true",
					"data-testid": `${c}-${e.id}-media-sink`,
					children: [e.videoElement, e.audioElement]
				}, e.id)), /* @__PURE__ */ H(A, {
					name: `+ ${h.length}`,
					initials: `+${h.length}`,
					size: 40,
					color: "rgba(255,255,255,0.18)",
					showTitle: !1
				})]
			})]
		}), _ && /* @__PURE__ */ U("span", {
			className: "pointer-events-none absolute top-1 z-20 -translate-x-full rounded-full bg-surface-inverse/70 px-2 py-0.5 text-xs font-medium text-white",
			style: { left: _.left - 4 },
			title: _.names,
			"aria-label": `${_.hidden} more: ${_.names}`,
			"data-testid": `${c}-wrapped`,
			children: ["+", _.hidden]
		})]
	});
}
function be(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => Object.is(e[n], t[n]));
}
var xe = F(Se, (e, t) => e.width === t.width && e.height === t.height && e.fluid === t.fluid && e.speaking === t.speaking && e.highlighted === t.highlighted && e.testId === t.testId && e.onParticipantClick === t.onParticipantClick && be(e.participant, t.participant));
function Se({ participant: t, width: n, height: r, fluid: i = !1, speaking: a, highlighted: o, testId: s, onParticipantClick: c }) {
	Q("tile", t.id);
	let u = c ? () => c(t.id) : void 0, d = t.isLocal ? "You" : t.displayName, m = t.ringing ? `${t.displayName}, ringing` : `${t.isLocal ? "You" : t.displayName}${t.handRaised ? `, ${K(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
	return /* @__PURE__ */ U("div", {
		className: e("relative shrink-0 overflow-hidden rounded-md text-white", i && "aspect-video w-full", t.videoElement && !t.cameraOff ? "bg-video-tile" : "bg-video-tile-off", "[&_video]:h-full [&_video]:w-full [&_video]:object-cover", u && "cursor-pointer"),
		style: i ? void 0 : {
			width: n,
			height: r
		},
		title: m,
		"aria-label": m,
		role: u ? "button" : "img",
		tabIndex: u ? 0 : void 0,
		onClick: u,
		onKeyDown: u ? (e) => {
			(e.key === "Enter" || e.key === " ") && u();
		} : void 0,
		"data-testid": s,
		"data-peer-id": t.id,
		"data-dock-item": "true",
		"data-dock-name": t.displayName,
		"data-is-local": t.isLocal ? "true" : "false",
		"data-is-muted": t.isMuted ? "true" : "false",
		"data-highlighted": o ? "true" : "false",
		"data-speaking": a ? "true" : "false",
		"data-track-kind": t.videoElement && !t.cameraOff ? "camera" : "avatar",
		"data-ringing": t.ringing ? "true" : void 0,
		"data-hand-raised": t.handRaised ? "true" : void 0,
		children: [
			t.videoElement && t.cameraOff && /* @__PURE__ */ H("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${s}-media-sink`,
				children: t.videoElement
			}),
			t.audioElement != null && /* @__PURE__ */ H("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${s}-audio-sink`,
				children: t.audioElement
			}),
			t.videoElement && !t.cameraOff ? t.videoElement : /* @__PURE__ */ H("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ H(A, {
					name: t.displayName,
					size: i ? 56 : Math.round(Math.min(40, r * .48)),
					...t.avatarUrl ? { src: t.avatarUrl } : {},
					color: "rgba(71,80,92,0.28)",
					showTitle: !1,
					...t.ringing ? { className: "animate-pulse" } : {}
				})
			}),
			t.reconnecting && /* @__PURE__ */ H("div", {
				className: "absolute inset-0 bg-surface-inverse/40",
				"data-testid": `${s}-reconnecting`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ U("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-xs",
				children: [/* @__PURE__ */ H("span", {
					className: "min-w-0 flex-1 truncate font-medium",
					children: d
				}), t.ringing ? /* @__PURE__ */ H("span", {
					className: "shrink-0 text-white/80",
					"data-testid": `${s}-ringing`,
					children: "Ringing…"
				}) : /* @__PURE__ */ U(V, { children: [
					/* @__PURE__ */ H(q, {
						raised: t.handRaised,
						tone: "overlay",
						"data-testid": `${s}-hand`
					}),
					t.screenSharing && /* @__PURE__ */ H(p, {
						size: 13,
						className: "shrink-0"
					}),
					t.isMuted ? /* @__PURE__ */ H(l, {
						size: 14,
						className: "shrink-0"
					}) : /* @__PURE__ */ H(f, {
						size: 14,
						className: "shrink-0"
					})
				] })]
			}),
			(o || a) && /* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				"data-testid": `${s}-ring`,
				"data-ring": o ? "highlighted" : "speaking",
				className: e("pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset", o ? "ring-primary" : "ring-success")
			}),
			a && o && /* @__PURE__ */ H("span", {
				className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-success",
				"aria-hidden": "true"
			})
		]
	});
}
function Ce({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${t.handRaised ? `, ${K(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ U("div", {
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
		children: [
			/* @__PURE__ */ H(A, {
				name: t.displayName,
				size: 44,
				...t.avatarUrl ? { src: t.avatarUrl } : {}
			}),
			t.handRaised ? /* @__PURE__ */ H(q, {
				raised: t.handRaised,
				tone: "overlay",
				className: "absolute -left-1 -top-1 ring-2 ring-white",
				"data-testid": "bubble-hand"
			}) : null,
			t.isMuted && /* @__PURE__ */ H("span", {
				className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
				"aria-hidden": "true",
				children: "✕"
			})
		]
	});
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function we({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = Te(a, o), p = R(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = R(() => {
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
	return r ? (g = "screen", _ = i ?? h?.displayName ?? "", v = r) : p ? (g = "screen", _ = p.displayName, v = p.screenElement) : h ? (g = "camera", _ = h.displayName, v = /* @__PURE__ */ H(J, {
		id: h.id,
		displayName: h.displayName,
		avatarUrl: h.avatarUrl,
		isMuted: h.isMuted,
		handRaised: h.handRaised,
		isLocal: h.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: h.videoElement,
		className: "w-full h-full"
	})) : (g = "camera", _ = ""), /* @__PURE__ */ U("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", c && "h-full w-full", u),
		style: d,
		children: [/* @__PURE__ */ H("div", {
			className: e("bg-black relative", c ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": g,
			"data-spotlight-user": _,
			children: v
		}), m.length > 0 && /* @__PURE__ */ H("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: m.map((e) => /* @__PURE__ */ H("div", {
				className: "shrink-0",
				style: { width: l },
				children: /* @__PURE__ */ H(J, {
					id: e.id,
					displayName: e.displayName,
					avatarUrl: e.avatarUrl,
					isMuted: e.isMuted,
					handRaised: e.handRaised,
					isLocal: e.isLocal,
					videoElement: e.videoElement,
					onClick: s ? () => s(e.id) : void 0
				})
			}, e.id))
		})]
	});
}
function Te(e, t) {
	let [n, r] = B(e ?? null);
	return I(() => {
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
var Ee = 10;
function De({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= Ee ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ H(we, {
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
	}) : /* @__PURE__ */ H(me, {
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
function Oe(e, t) {
	let [n, r] = B(0);
	return I(() => {
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
function ke(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function Ae({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
	let a = z(null), o = z(i);
	return o.current = i, I(() => {
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
	}, [e, n]), /* @__PURE__ */ H("video", {
		ref: a,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function je({ stream: e }) {
	let t = z(null);
	return I(() => {
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
	}, [e]), /* @__PURE__ */ H("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function Me({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	Oe(e, t);
	let i = ke(e);
	return !n || !i || !e ? /* @__PURE__ */ U("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ H(A, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ H(je, { stream: e })]
	}) : /* @__PURE__ */ H(Ae, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function Ne({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ H("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var Pe = {
	microphone: "Mic",
	camera: "Camera"
}, Fe = {
	microphone: "microphone",
	camera: "camera"
}, Ie = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, Le = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function Re({ kind: t, on: r, onToggle: i, devices: a, selectedDeviceId: s, onSelectDevice: c, permission: d, level: p, size: m = "sm", showLabel: h = !1, extraItems: g, disabledReason: v, deviceMenu: y = !0, className: b, "data-testid": x = `device-toggle-${t}` }) {
	let S = d === "denied" || d === "unavailable", C = v ?? (d === "denied" ? Ie[t] : d === "unavailable" ? Le[t] : void 0), w = !!C || S, T = r && !w, E = t === "microphone" && T && (p ?? 0) > .08, D = m === "md" ? 20 : 18, k;
	k = H(t === "microphone" ? T ? f : l : T ? u : _, { size: D });
	let A = `${Pe[t]} ${T ? "on" : "off"}`, j = T ? `Turn ${Fe[t]} off` : `Turn ${Fe[t]} on`, M = a.length ? a.map((e) => ({
		label: e.label,
		checked: e.deviceId === s,
		onSelect: () => c(e.deviceId),
		"data-testid": `${x}-device-${e.deviceId}`
	})) : [{
		label: Le[t],
		disabled: !0
	}], N = m === "md" ? "h-10" : "h-8", ee = !T && t === "microphone" && !w ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ U("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", E && "ring-2 ring-primary/50", N, b),
		"data-kind": t,
		"data-on": T ? "true" : "false",
		"data-permission": d,
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			onClick: w ? void 0 : i,
			disabled: w,
			"aria-pressed": T,
			"aria-label": h ? void 0 : j,
			title: C ?? j,
			"data-testid": x,
			className: e("inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-[inherit] text-sm", y ? "rounded-l-md" : "rounded-md", n, "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", m === "md" ? "px-2.5" : "px-2", h && "min-w-0 flex-1 justify-start gap-1.5 pr-2", ee),
			children: [k, h && /* @__PURE__ */ H("span", {
				className: "min-w-0 truncate whitespace-nowrap",
				children: A
			})]
		}), y && /* @__PURE__ */ H(O, {
			trigger: /* @__PURE__ */ H(o, { size: 14 }),
			triggerLabel: `Choose ${Fe[t]}`,
			triggerTitle: `Choose ${Fe[t]}`,
			triggerTestId: `${x}-menu`,
			triggerVariant: "link",
			triggerClassName: e("h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary", m === "md" && "px-2"),
			align: "end",
			"data-testid": `${x}-menu-panel`,
			sections: [{
				label: t === "microphone" ? "Microphone" : "Camera",
				items: M
			}, ...g?.length ? [{ items: g }] : []]
		})]
	});
}
//#endregion
//#region src/components/video/CallDock.tsx
var ze = {
	sm: {
		w: 132,
		h: 74,
		box: "h-[74px] w-[132px]",
		visible: 5
	},
	md: {
		w: 176,
		h: 88,
		box: "h-[88px] w-[176px]",
		visible: 6
	},
	lg: {
		w: 240,
		h: 135,
		box: "h-[135px] w-[240px]",
		visible: 6
	}
};
function $(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function Be(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
var Ve = F(function({ phase: e, callingTo: t, participantCount: n, elapsedMs: r }) {
	Q("meta");
	let i;
	return i = e === "calling" ? t ? `Calling ${t}…` : "Calling…" : e === "connecting" ? "Connecting…" : e === "reconnecting" ? /* @__PURE__ */ H("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${Be(n)}${r == null ? "" : ` · ${$(r)}`}`, /* @__PURE__ */ H("span", {
		className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
		"data-testid": "call-dock-meta",
		children: i
	});
});
function He(e, t, n) {
	return {
		...e,
		id: e.userId,
		isLocal: t,
		isMuted: !e.audioOn,
		videoElement: e.videoElement,
		cameraOff: !e.cameraOn && !e.screenSharing,
		audioElement: e.audioElement,
		screenSharing: e.screenSharing,
		reconnecting: n || e.connection === "reconnecting",
		ringing: e.connection === "ringing"
	};
}
var Ue = F(function({ participants: e, localParticipantId: t, activeSpeakerId: n, followingUserId: r, reconnecting: i, size: a, grid: o = !1, maxColumns: s, onTileClick: c, title: l }) {
	let u = e.find((e) => e.userId === t) ?? null, d = e.filter((e) => e.userId !== t);
	return /* @__PURE__ */ H(ge, {
		variant: o ? "grid" : "dock",
		participants: d.map((e) => He(e, !1, i)),
		localParticipant: u ? He(u, !0, i) : null,
		activeSpeakerId: n,
		highlightedId: r,
		tileWidth: ze[a].w,
		tileHeight: ze[a].h,
		overflow: "collapse",
		maxVisible: ze[a].visible,
		...s ? { maxColumns: s } : {},
		...c ? { onParticipantClick: c } : {},
		title: l,
		"data-testid": "call-dock-tile-row"
	});
});
function We({ title: n, participantCount: o, elapsedMs: s, phase: c, callingTo: l, documents: u = [], participants: f, localParticipantId: h, activeSpeakerId: _ = null, followingUserId: y = null, mic: b, camera: C, screenShare: E, onOpenPeople: D, onOpenDocuments: k, peopleOpen: A = !1, documentsOpen: j = !1, onOpenSettings: M, extras: N, onPopOut: ee, onLeave: P, canEndForEveryone: te = !1, onEndForEveryone: F, onTileClick: I, onTitleClick: re, onDocumentClick: L, endedSummary: R, error: W, onDismiss: ie, compact: ae = !1, tileSize: oe, layout: se = "shelf", className: ce, "data-testid": G = "call-dock" }) {
	let le = oe ?? (ae ? "sm" : "md"), ue = z(null), [K, de] = B(!1), q = z(I);
	q.current = I;
	let J = ne((e) => q.current?.(e), []);
	if (c === "error" && W) return /* @__PURE__ */ H("div", {
		className: e("border-t border-border bg-surface px-5 py-3", ce),
		"data-testid": G,
		"data-phase": "error",
		children: /* @__PURE__ */ H(S, {
			variant: "error",
			title: W.title ?? `Lost the call — ${W.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ H(t, {
					size: "sm",
					onClick: W.onRetry,
					"data-testid": "call-dock-rejoin",
					children: W.retryLabel ?? "Rejoin"
				}), ie && /* @__PURE__ */ H(t, {
					size: "sm",
					variant: "ghost",
					onClick: ie,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (c === "ended") return /* @__PURE__ */ U("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", ce),
		"data-testid": G,
		"data-phase": "ended",
		children: [/* @__PURE__ */ U("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ H("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				s != null && /* @__PURE__ */ U(V, { children: [" · ", $(s)] }),
				R != null && /* @__PURE__ */ U(V, { children: [" · ", R] })
			]
		}), ie && /* @__PURE__ */ H(t, {
			variant: "link",
			onClick: ie,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let Y = c === "calling", X = c === "connecting", fe = c === "reconnecting", pe = () => {
		!Y && te && F ? de(!0) : P();
	}, Z = se === "grid", Q = se === "stack", me = Y ? "You can share once someone joins" : X ? "Connecting…" : E.disabledReason, he = [
		{
			label: E.on ? "Stop sharing" : "Share your screen",
			icon: /* @__PURE__ */ H(p, { size: 16 }),
			onSelect: E.onToggle,
			...me ? {
				disabled: !0,
				disabledReason: me
			} : {},
			"data-testid": "call-dock-share"
		},
		{
			label: `People (${o})`,
			icon: /* @__PURE__ */ H(v, { size: 16 }),
			onSelect: D,
			...A ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-people"
		},
		...k ? [{
			label: `Documents (${u.length})`,
			icon: /* @__PURE__ */ H(a, { size: 16 }),
			onSelect: k,
			...j ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-documents"
		}] : [],
		{
			label: "Call settings",
			icon: /* @__PURE__ */ H(d, { size: 16 }),
			onSelect: M,
			"data-testid": "call-dock-settings"
		},
		{
			label: "Pop out the call",
			icon: /* @__PURE__ */ H(m, { size: 16 }),
			onSelect: ee,
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-popout"
		}
	], ge = /* @__PURE__ */ U("div", {
		className: "relative",
		"data-testid": "call-dock-tiles",
		children: [fe && /* @__PURE__ */ H("div", {
			className: "mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg",
			role: "status",
			"data-testid": "call-dock-reconnecting",
			children: "Reconnecting…"
		}), X ? /* @__PURE__ */ H("div", {
			className: "flex gap-2",
			"data-testid": "call-dock-connecting",
			children: /* @__PURE__ */ H("div", {
				className: e("shrink-0 overflow-hidden rounded-md", Z || Q ? "aspect-video w-full" : ze[le].box),
				children: /* @__PURE__ */ H(T, {
					height: "100%",
					rounded: "md"
				})
			})
		}) : /* @__PURE__ */ H(Ue, {
			participants: f,
			localParticipantId: h,
			activeSpeakerId: _,
			followingUserId: y,
			reconnecting: fe,
			size: le,
			grid: Z || Q,
			...Q ? { maxColumns: 2 } : {},
			onTileClick: I ? J : void 0,
			title: n
		})]
	});
	return Z ? /* @__PURE__ */ H("section", {
		className: e("flex min-w-0 flex-col gap-2 bg-surface p-3", ce),
		"aria-label": `Call: ${n}`,
		"data-testid": G,
		"data-phase": c,
		"data-layout": "grid",
		"data-compact": le === "sm" ? "true" : "false",
		children: ge
	}) : /* @__PURE__ */ U("section", {
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", ce),
		"aria-label": `Call: ${n}`,
		"data-testid": G,
		"data-phase": c,
		"data-layout": Q ? "stack" : "shelf",
		"data-compact": le === "sm" || Q ? "true" : "false",
		"data-tile-size": Q ? void 0 : le,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2",
			"data-testid": `${G}-header`,
			children: [/* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-auto items-baseline gap-3",
				children: [
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: re,
						disabled: !re,
						className: "max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline",
						"data-testid": "call-dock-title",
						title: n,
						children: n
					}),
					/* @__PURE__ */ H(Ve, {
						phase: c,
						callingTo: l,
						participantCount: o,
						elapsedMs: s
					}),
					u.length > 0 && /* @__PURE__ */ H("span", {
						className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
						"data-testid": "call-dock-documents-chips",
						children: u.map((t) => /* @__PURE__ */ U("button", {
							type: "button",
							onClick: L ? () => L(t.id) : void 0,
							className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", L ? "cursor-pointer hover:underline" : "cursor-default"),
							"data-testid": `call-dock-document-${t.id}`,
							"data-presenting": t.presenting ? "true" : "false",
							title: t.presenting ? `${t.title} · Presenting` : t.title,
							children: [/* @__PURE__ */ H(a, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ H("span", {
								className: "truncate",
								children: t.title
							})]
						}, t.id))
					})
				]
			}), /* @__PURE__ */ U("div", {
				className: "ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2",
				"data-testid": `${G}-controls`,
				children: [
					/* @__PURE__ */ H(Re, {
						kind: "microphone",
						...b,
						"data-testid": "call-dock-mic",
						...X ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ H(Re, {
						kind: "camera",
						...C,
						"data-testid": "call-dock-camera",
						...X ? { disabledReason: "Connecting…" } : {}
					}),
					!Q && /* @__PURE__ */ U(V, { children: [
						/* @__PURE__ */ U(t, {
							variant: E.on ? "danger" : "ghost",
							size: "sm",
							onClick: E.onToggle,
							disabled: X || Y || !!E.disabledReason,
							title: Y ? "You can share once someone joins" : E.disabledReason ?? (E.on ? "Stop sharing" : "Share your screen"),
							"aria-label": E.on ? "Stop sharing" : "Share",
							"aria-pressed": E.on,
							"data-testid": "call-dock-share",
							className: "inline-flex h-8 items-center gap-1.5 bg-surface",
							children: [/* @__PURE__ */ H(p, { size: 16 }), /* @__PURE__ */ H("span", {
								className: "hidden @min-[860px]:inline",
								children: E.on ? "Stop sharing" : "Share"
							})]
						}),
						/* @__PURE__ */ U(t, {
							variant: A ? "secondary" : "ghost",
							size: "sm",
							onClick: D,
							disabled: X,
							"aria-label": `People (${o})`,
							"aria-pressed": A,
							"data-testid": "call-dock-people",
							className: e("inline-flex h-8 items-center gap-1.5", !A && "bg-surface"),
							children: [
								/* @__PURE__ */ H(v, { size: 16 }),
								/* @__PURE__ */ H("span", {
									className: "hidden @min-[860px]:inline",
									children: "People"
								}),
								/* @__PURE__ */ H(x, {
									variant: "count",
									value: o,
									color: "muted",
									"aria-label": `${o} people`
								})
							]
						}),
						k && /* @__PURE__ */ U(t, {
							variant: j ? "secondary" : "ghost",
							size: "sm",
							onClick: k,
							disabled: X,
							"aria-label": `Documents (${u.length})`,
							"aria-pressed": j,
							"data-testid": "call-dock-documents",
							className: e("hidden h-8 items-center gap-1.5 @min-[980px]:inline-flex", !j && "bg-surface"),
							children: [
								/* @__PURE__ */ H(a, { size: 16 }),
								/* @__PURE__ */ H("span", {
									className: "hidden @min-[860px]:inline",
									children: "Documents"
								}),
								/* @__PURE__ */ H(x, {
									variant: "count",
									value: u.length,
									color: "muted",
									"aria-label": `${u.length} documents`
								})
							]
						})
					] }),
					N != null && /* @__PURE__ */ H("div", {
						className: "contents",
						"data-testid": "call-dock-extras",
						children: N
					}),
					/* @__PURE__ */ U("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-testid": "call-dock-end",
						children: [Q ? /* @__PURE__ */ H(O, {
							trigger: /* @__PURE__ */ H(i, { size: 16 }),
							triggerLabel: "More call controls",
							triggerTitle: "More",
							triggerTestId: "call-dock-more",
							triggerClassName: "h-8 w-8 px-0 py-0",
							align: "end",
							sections: [{ items: he }],
							"data-testid": "call-dock-more-menu"
						}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(r, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							onClick: M,
							icon: /* @__PURE__ */ H(d, { size: 18 }),
							"data-testid": "call-dock-settings"
						}), /* @__PURE__ */ H(r, {
							"aria-label": "Pop out the call",
							title: "Pop out the call",
							variant: "outline",
							onClick: ee,
							disabled: X,
							icon: /* @__PURE__ */ H(m, { size: 16 }),
							"data-testid": "call-dock-popout"
						})] }), /* @__PURE__ */ U(t, {
							ref: ue,
							variant: "danger-solid",
							size: "sm",
							onClick: pe,
							"aria-haspopup": te && !Y ? "dialog" : void 0,
							title: Y ? "Cancel the call" : void 0,
							"data-testid": "call-dock-leave",
							className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5",
							children: [/* @__PURE__ */ H(g, { size: 16 }), Y ? "Cancel" : "Leave"]
						})]
					}),
					/* @__PURE__ */ U(w, {
						trigger: ue,
						open: K,
						onClose: () => de(!1),
						placement: "bottom-end",
						"aria-label": "Leave the call",
						"data-testid": "call-dock-leave-confirm",
						className: "w-64 p-3",
						children: [/* @__PURE__ */ H("p", {
							className: "m-0 mb-3 text-sm text-text-primary",
							children: "Leave the call? Others stay on."
						}), /* @__PURE__ */ U("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ H(t, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									de(!1), P();
								},
								"data-testid": "call-dock-leave-confirm-leave",
								children: "Leave"
							}), /* @__PURE__ */ H(t, {
								variant: "danger-solid",
								size: "sm",
								onClick: () => {
									de(!1), F?.();
								},
								"data-testid": "call-dock-end-for-everyone",
								children: "End for everyone"
							})]
						})]
					})
				]
			})]
		}), ge]
	});
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function Ge({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ H("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function Ke({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ U("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ H("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ H("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function qe({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: b, "data-testid": x }) {
	return p === "grid" ? /* @__PURE__ */ H(tt, {
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
	}) : /* @__PURE__ */ U("div", {
		"data-testid": x,
		className: e("flex flex-col text-white", f ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", b),
		children: [
			/* @__PURE__ */ H(Ke, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ H(Ge, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ U(Ke, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ H(Ge, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ H(Ge, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ H(Ge, {
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
			/* @__PURE__ */ U(Ke, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ H(Ge, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ H(Ge, {
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
var Je = 5242880;
function Ye(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function Xe({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: Ye(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ H(Ae, {
			stream: e,
			muted: !0,
			className: "h-full w-full scale-x-[-1] object-cover"
		}) : t ? /* @__PURE__ */ H("img", {
			src: t,
			alt: "",
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ H("span", { className: "block h-full w-full bg-gradient-to-br from-white/15 to-black/30" })
	});
}
function Ze({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: i,
		disabled: r,
		"aria-pressed": s ? void 0 : n,
		title: t,
		"data-testid": a,
		"data-active": n ? "true" : "false",
		className: e("group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]", "disabled:cursor-not-allowed disabled:opacity-50"),
		children: [/* @__PURE__ */ H("span", {
			className: e("relative flex aspect-[101/50] w-full items-center justify-center overflow-hidden rounded-md", s ? "border border-dashed border-border-emphasis bg-surface text-text-tertiary" : "bg-video-tile", n ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : !s && "group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis"),
			children: o
		}), /* @__PURE__ */ H("span", {
			className: e("truncate text-xs", s ? "text-primary" : "text-text-secondary"),
			children: t
		})]
	});
}
function Qe(e) {
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
function $e({ children: e, action: t }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ H("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var et = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function tt({ filters: n, activeFilterId: r, onSelectFilter: i, backgrounds: a, backgroundMode: o, activeBackgroundUrl: c, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p, columns: m, thumbnailStream: g, thumbnailSrc: _, filterLimit: v, onSelectCustomBackground: y, backgroundsUnsupported: b, className: x, "data-testid": S }) {
	let [w, T] = B(!1), [E, D] = B(!1), O = z(null), k = et[m] ?? "grid-cols-3", A = !w && n.length > v + 1, j = A ? n.slice(0, v) : n, N = !E && u.length > 3, ee = N ? u.slice(0, 2) : u, P = {
		stream: g,
		..._ ? { src: _ } : {}
	};
	return /* @__PURE__ */ U("div", {
		"data-testid": S,
		"data-layout": "grid",
		className: e("flex flex-col gap-3 text-text-primary", x),
		children: [
			/* @__PURE__ */ U("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Filter",
				children: [/* @__PURE__ */ H($e, {
					action: /* @__PURE__ */ H(t, {
						variant: "link",
						onClick: () => i("none"),
						disabled: p,
						"data-testid": "effects-filter-reset",
						className: "text-sm",
						children: "Reset"
					}),
					children: "Filter"
				}), /* @__PURE__ */ U("div", {
					className: e("grid gap-x-3 gap-y-2", k),
					children: [j.map((e) => /* @__PURE__ */ H(Ze, {
						label: e.label,
						active: e.id === r,
						disabled: p,
						onClick: () => i(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ H(Xe, {
							...P,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), A && /* @__PURE__ */ U(Ze, {
						label: "More...",
						active: !1,
						disabled: p,
						onClick: () => T(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ H(Xe, {
							...P,
							filter: "blur(3px)"
						}), /* @__PURE__ */ H("span", {
							className: "relative text-white",
							children: /* @__PURE__ */ H(h, { size: 22 })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ U("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Background",
				children: [/* @__PURE__ */ H($e, { children: "Background" }), b ? /* @__PURE__ */ H(M, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ U("div", {
					className: e("grid gap-x-3 gap-y-2", k),
					children: [
						/* @__PURE__ */ H(Ze, {
							label: "None",
							active: o === "none",
							disabled: p,
							onClick: () => l("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ H(Xe, { ...P })
						}),
						/* @__PURE__ */ H(Ze, {
							label: "Blur",
							active: o === "blur",
							disabled: p,
							onClick: () => l("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ H(Xe, {
								...P,
								filter: "blur(4px)"
							})
						}),
						a.map((e) => /* @__PURE__ */ H(Ze, {
							label: e.label,
							active: o === "image" && c === e.url,
							disabled: p,
							onClick: () => l("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ H(Xe, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						y && /* @__PURE__ */ U(Ze, {
							label: "+ Custom",
							active: !1,
							disabled: p,
							dashed: !0,
							onClick: () => O.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ H(s, { size: 22 }), /* @__PURE__ */ H("input", {
								ref: O,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= Je && y(t);
								}
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ U("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Face effects",
				children: [
					/* @__PURE__ */ H($e, { children: "Face effects" }),
					/* @__PURE__ */ H(C, {
						value: d ?? "",
						onChange: (e) => f(e.target.value || null),
						disabled: p,
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
					u.length > 0 && /* @__PURE__ */ U("div", {
						className: e("-mt-0.5 grid gap-2", k),
						children: [ee.map((t) => {
							let n = t.id === d, { glyph: r, text: i } = Qe(t.label);
							return /* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => f(n ? null : t.id),
								disabled: p,
								"aria-pressed": n,
								"data-testid": `effects-face-${t.id}`,
								className: e("flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", n && "bg-primary-bg text-primary"),
								children: [/* @__PURE__ */ H("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary",
									children: t.icon ?? r ?? Array.from(i)[0]
								}), /* @__PURE__ */ H("span", {
									className: "truncate",
									children: t.icon ? t.label : i
								})]
							}, t.id);
						}), N && /* @__PURE__ */ U("button", {
							type: "button",
							onClick: () => D(!0),
							disabled: p,
							"data-testid": "effects-face-more",
							className: "flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover",
							children: [/* @__PURE__ */ H("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-text-primary",
								children: /* @__PURE__ */ H(h, { size: 20 })
							}), /* @__PURE__ */ H("span", { children: "More" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function nt(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function rt({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: b = "chrome", showFooter: x = !0, hint: S = "Changes appear in the call after Apply.", thumbnailSrc: C, onSelectCustomBackground: w, backgroundsUnsupported: T = !1, className: E, "data-testid": D = "media-effects-preview-panel" }) {
	let O = (e) => nt(n, e), k = n && i && !_;
	return b === "surface" ? /* @__PURE__ */ U("section", {
		"data-testid": D,
		"data-variant": "surface",
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-text-primary", E),
		children: [
			/* @__PURE__ */ U("div", {
				"data-testid": "effects-preview",
				className: "relative aspect-[338/161] w-full shrink-0 overflow-hidden rounded-lg bg-video-stage",
				children: [r ? /* @__PURE__ */ H("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ H(Ae, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ H("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70",
					children: n ? "Turn the camera on to preview effects" : "Preview is not running"
				}), /* @__PURE__ */ H("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
					children: "Preview · Only you"
				})]
			}),
			S != null && /* @__PURE__ */ H("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 text-xs text-text-secondary",
				children: S
			}),
			/* @__PURE__ */ H(qe, {
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
			x && /* @__PURE__ */ U("footer", {
				className: "mt-2 flex items-center justify-end gap-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ H("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-sm text-text-tertiary",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ H(t, {
						variant: "ghost",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						children: "Cancel"
					}),
					/* @__PURE__ */ H(t, {
						onClick: a,
						disabled: !k,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ U("section", {
		"data-testid": D,
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-white", E),
		children: [
			/* @__PURE__ */ U("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [r ? /* @__PURE__ */ H("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ H(Ae, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ U("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), n ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ H("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ H("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: n ? `This preview is private. Nobody else in the call can see these effects until you choose ${y}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ H(qe, {
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
			x && /* @__PURE__ */ U("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ H("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ H("button", {
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
var it = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function at(e) {
	return e ? it[e.kind] : null;
}
function ot(e) {
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
var st = 3e3, ct = 1e3, lt = 1500, ut = 8e3, dt = .5;
function ft(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = ut } = n, [a, o] = B(null), s = at(a), [c, l] = B(!1), [u, d] = B(!1), [f, p] = B(!1), [m, h] = B(null), [g, _] = B(null), [v, y] = B(0), b = z(null), x = z(!1), S = z(0), C = z(n.onError);
	I(() => {
		C.current = n.onError;
	}, [n.onError]);
	let w = ne(() => {
		o(null), d(!1), p(!1), y((e) => e + 1);
	}, []), T = ne(() => {
		let t = e.current;
		if (t) try {
			let e = b.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return I(() => {
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
						let e = ot(n);
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
	]), I(() => {
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
			if (!(e - S.current < st)) {
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
	]), I(() => {
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
				return t !== null && Math.abs(t - n) < dt ? t : n;
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
			s >= i ? p(!0) : s >= lt && d(!0);
		}, ct);
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
var pt = 80, mt = .6;
function ht(e) {
	let [t, n] = B(null), r = z(0);
	return I(() => {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * mt);
			r.current = c, n(c);
		}, pt);
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
var gt = [
	.55,
	.8,
	1,
	.8,
	.55
], _t = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], vt = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], yt = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function bt(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return _t[Math.min(_t.length - 1, Math.round(n * (_t.length - 1)))];
}
function xt({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: s, "data-testid": c = "stream-audio-only" }) {
	let l = typeof r == "number" && i, u = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ U("div", {
		"data-testid": c,
		"data-measured": String(l),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", s),
		children: [
			t ? /* @__PURE__ */ H(A, {
				name: t,
				src: n,
				size: 64
			}) : /* @__PURE__ */ H("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ H("span", {
					className: "text-sm font-medium text-white",
					children: t ?? "Audio only"
				}), /* @__PURE__ */ H("span", {
					"data-testid": `${c}-hint`,
					className: "text-xs text-white/60",
					children: u
				})]
			}),
			/* @__PURE__ */ H("div", {
				"data-testid": `${c}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: gt.map((t, n) => /* @__PURE__ */ H("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !l && i && ["uic-audio-bar", yt[n]], l ? bt(r, t) : vt[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function St({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function Ct(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function wt(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function Tt(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Et({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = R(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: Tt(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ H("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ H(N, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var Dt = 1e4;
function Ot(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !ke(e);
}
var kt = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function At({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = Dt, chatMessages: m, chatVisibleCount: h, chatRotateMs: g, muted: _ = !0, allowFullscreen: v = !0, showLatency: y = !0, controls: b, placeholder: x, className: S, "data-testid": C = "stream-stage" }) {
	let [w, T] = B(_);
	I(() => {
		T(_);
	}, [_]);
	let E = z(null), D = z(null), O = ft(D, t ? null : n, {
		live: !0,
		onError: r
	}), k = z(!1);
	(t || n) && (k.current = !0);
	let A = Oe(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), j = R(() => Ot(t), [t, A]), M = R(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, A]), N = !!t && M !== !1 || !!n && !O.loading, [ee, P] = B(!1);
	I(() => {
		if (P(!1), N || O.error) return;
		let e = setTimeout(() => P(!0), p);
		return () => clearTimeout(e);
	}, [
		N,
		O.error,
		p
	]);
	let te = St({
		hasStream: !!t,
		streamHasTracks: M,
		hasPlaylist: !!n,
		hadSource: k.current,
		graceExpired: ee,
		hls: O
	}), F = O.failure ?? null, re = z(!1);
	te === "playing" && (re.current = !0);
	let L = te === "error" && F?.kind === "no-broadcast" ? re.current ? "ended" : "not-started" : te, V = L === "ended" ? te === "ended" ? "withdrawn" : "stopped" : null, W = s && Ct(L), ie = t ? j : O.audioOnly === !0, ae = (c ?? ie) && (L === "playing" || L === "buffering" || L === "stalled"), oe = ht(ae && t ? t : null), [se, ce] = B(!1);
	I(() => {
		if (typeof document > "u") return;
		let e = () => ce(document.fullscreenElement === E.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let G = ne(() => {
		let e = E.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), le = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), ue = O.retry, K = ne(() => {
		ue?.(), i?.();
	}, [ue, i]), de = !!(t || n), q = !!n && !t, J = de && L !== "error" && L !== "not-started" && L !== "ended", Y = J || !!b, X = !F || F.retryable, Z = (q || !!i) && X, Q = F?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ U("div", {
		ref: E,
		"data-testid": C,
		"data-live": String(W),
		"data-phase": L,
		"data-audio-only": String(ae),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": F?.kind,
		"data-error-detail": F?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ H(Ae, {
				stream: t,
				muted: w,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ H("video", {
				ref: D,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: w,
				className: "h-full w-full object-contain"
			}) : null,
			ae && /* @__PURE__ */ H(xt, {
				"data-testid": `${C}-audio-only`,
				name: l,
				avatarUrl: u,
				level: oe,
				active: L !== "stalled" && !w,
				muted: w
			}),
			L === "idle" && /* @__PURE__ */ H(jt, {
				testId: `${C}-placeholder`,
				children: x ?? "Waiting for the stream to start…"
			}),
			L === "ended" && /* @__PURE__ */ U(jt, {
				testId: `${C}-ended`,
				"data-ended-reason": V,
				children: [
					/* @__PURE__ */ H("span", { children: f ?? (V === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					V === "stopped" && !f && /* @__PURE__ */ H("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					V === "stopped" ? Z && /* @__PURE__ */ H(Mt, {
						testId: `${C}-retry`,
						label: "Try again",
						onClick: K
					}) : i && /* @__PURE__ */ H(Mt, {
						testId: `${C}-retry`,
						label: "Check again",
						onClick: K
					})
				]
			}),
			L === "not-started" && /* @__PURE__ */ U(jt, {
				testId: `${C}-not-started`,
				children: [/* @__PURE__ */ H("span", { children: d ?? "Nothing is being broadcast right now." }), Z && /* @__PURE__ */ H(Mt, {
					testId: `${C}-retry`,
					label: Q,
					onClick: K
				})]
			}),
			L === "connecting" && /* @__PURE__ */ H(jt, {
				testId: `${C}-connecting`,
				children: "Connecting…"
			}),
			L === "buffering" && /* @__PURE__ */ H("div", {
				"data-testid": `${C}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			L === "stalled" && /* @__PURE__ */ U(jt, {
				testId: `${C}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ H("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ H("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					Z && /* @__PURE__ */ H(Mt, {
						testId: `${C}-retry`,
						onClick: K
					})
				]
			}),
			L === "error" && /* @__PURE__ */ U(jt, {
				testId: `${C}-error`,
				dim: !0,
				children: [/* @__PURE__ */ H("span", { children: O.error ?? "This stream could not be played." }), Z && /* @__PURE__ */ H(Mt, {
					testId: `${C}-retry`,
					label: Q,
					onClick: K
				})]
			}),
			(a || W || fe(o)) && /* @__PURE__ */ U("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					W && /* @__PURE__ */ H("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ H("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					fe(o) && /* @__PURE__ */ H(pe, { count: o })
				]
			}),
			m && m.length > 0 && /* @__PURE__ */ H(Et, {
				messages: m,
				visibleCount: h,
				rotateMs: g,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			Y && /* @__PURE__ */ U("div", {
				"data-testid": `${C}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					J && q && y && (L === "playing" || L === "buffering") && /* @__PURE__ */ H("button", {
						type: "button",
						"data-testid": `${C}-latency`,
						onClick: () => O.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(kt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof O.latencySec == "number" && Number.isFinite(O.latencySec) ? `${Math.max(1, Math.round(O.latencySec))}s behind` : "Behind live"
					}),
					J && W && /* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": `${C}-mute-toggle`,
						"aria-label": w ? "Unmute" : "Mute",
						"aria-pressed": w,
						onClick: () => T((e) => !e),
						className: e(kt, w ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ H("span", {
							"aria-hidden": !0,
							children: w ? "🔇" : "🔊"
						}), w ? "Unmute" : "Mute"]
					}),
					J && v && le && /* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": `${C}-fullscreen`,
						"aria-label": se ? "Exit full screen" : "Full screen",
						"aria-pressed": se,
						onClick: G,
						className: e(kt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ H("span", {
							"aria-hidden": !0,
							children: se ? "↙" : "↗"
						}), se ? "Exit" : "Full screen"]
					}),
					b
				]
			})
		]
	});
}
function jt({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ H("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function Mt({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ H("button", {
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(kt, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function Nt({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
	let s = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0, c = i ? 0 : Math.round(s * n), l = Math.round(s * 100);
	return /* @__PURE__ */ H("div", {
		role: "meter",
		"aria-label": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": i ? 0 : l,
		"data-testid": o,
		"data-lit": c,
		className: e("inline-flex items-center gap-[3px]", a),
		children: Array.from({ length: n }, (t, n) => /* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: e("h-3.5 w-1.5 rounded-[2px] transition-colors duration-75", n < c ? "bg-success" : "bg-border")
		}, n))
	});
}
//#endregion
//#region src/components/video/VolumeSlider.tsx
function Pt({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: o = !1, muted: s = !1, disabled: l = !1, className: u, "data-testid": d = "settings-volume", testButtonTestId: f = "settings-test-sound" }) {
	let p = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ U("div", {
		className: e("flex items-center gap-3", u),
		children: [
			/* @__PURE__ */ H(c, {
				size: 20,
				className: e("shrink-0", s ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ H(D, {
				value: p,
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
			i && /* @__PURE__ */ H(t, {
				variant: "ghost",
				size: "md",
				onClick: i,
				disabled: l || o,
				"data-testid": f,
				className: "shrink-0",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/video/AudioVideoSettingsForm.tsx
var Ft = [
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
], It = [
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
function Lt(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function Rt({ children: t, divided: n = !0, className: r }) {
	return /* @__PURE__ */ H("section", {
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border", r),
		children: t
	});
}
function zt({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ H("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function Bt({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ U("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ H(P, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function Vt({ value: n, onChange: r, devices: i, permission: a, micLevel: o, previewStream: s, cameraOn: c, speakerSelectionSupported: l, onTestMic: u, onTestSound: d, testMicState: f = "idle", selfName: p = "You", selfAvatarUrl: m, layout: h = "stack", className: g, "data-testid": _ = "audio-video-settings-form" }) {
	let v = (e) => r({
		...n,
		...e
	}), y = a.microphone === "denied", x = a.camera === "denied", S = "w-full h-9 text-sm", w = f === "recording" ? "Recording…" : f === "playing" ? "Playing…" : "Test mic", D;
	return D = x ? null : c ? s ? /* @__PURE__ */ H(Ae, {
		stream: s,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ H("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ H(T, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ U("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ H(A, {
			name: p,
			size: 48,
			...m ? { src: m } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), /* @__PURE__ */ U("div", {
		className: e(h === "prejoin" ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6" : "flex flex-col", g),
		"data-testid": _,
		"data-layout": h,
		children: [
			/* @__PURE__ */ U(Rt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-1 py-0" : void 0,
				children: [
					/* @__PURE__ */ H(zt, {
						htmlFor: `${_}-mic`,
						children: "Microphone"
					}),
					y ? /* @__PURE__ */ H(M, {
						tone: "error",
						"data-testid": "settings-mic-denied",
						children: "Microphone blocked — allow it in the browser's site settings"
					}) : /* @__PURE__ */ H(C, {
						chevron: "custom",
						id: `${_}-mic`,
						value: n.microphoneId ?? i.microphones[0]?.deviceId ?? "",
						onChange: (e) => v({ microphoneId: e.target.value }),
						options: Lt(i.microphones, "No microphone found"),
						disabled: i.microphones.length === 0,
						className: S,
						"data-testid": "settings-mic-select"
					}),
					/* @__PURE__ */ U("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ H("span", {
								className: "w-24 shrink-0 text-sm text-text-primary",
								children: "Input level"
							}),
							/* @__PURE__ */ H(Nt, {
								level: o,
								disabled: y,
								"data-testid": "settings-mic-level"
							}),
							/* @__PURE__ */ H(t, {
								variant: "ghost",
								onClick: () => void u(),
								disabled: y || f !== "idle",
								"data-testid": "settings-test-mic",
								className: "ml-auto shrink-0",
								children: w
							})
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ H("span", {
							id: `${_}-noise`,
							className: "text-sm text-text-primary",
							children: "Noise reduction"
						}), /* @__PURE__ */ H(E, {
							checked: n.noiseSuppression,
							onChange: (e) => v({ noiseSuppression: e }),
							disabled: y,
							"aria-labelledby": `${_}-noise`,
							"data-testid": "settings-noise"
						})]
					})
				]
			}),
			/* @__PURE__ */ U(Rt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-2 py-0" : void 0,
				children: [
					l && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(zt, {
						htmlFor: `${_}-speaker`,
						children: "Speakers"
					}), /* @__PURE__ */ H(C, {
						chevron: "custom",
						id: `${_}-speaker`,
						value: n.speakerId ?? i.speakers[0]?.deviceId ?? "",
						onChange: (e) => v({ speakerId: e.target.value }),
						options: Lt(i.speakers, "No speakers found"),
						disabled: i.speakers.length === 0,
						className: S,
						"data-testid": "settings-speaker-select"
					})] }),
					!l && /* @__PURE__ */ H(zt, { children: "Volume" }),
					/* @__PURE__ */ H(Pt, {
						value: n.volume,
						onChange: (e) => v({ volume: e }),
						onTest: () => void d()
					})
				]
			}),
			/* @__PURE__ */ U(Rt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-1 md:row-start-1 md:row-span-3 py-0" : void 0,
				children: [
					/* @__PURE__ */ H(zt, {
						htmlFor: `${_}-camera`,
						children: "Camera"
					}),
					x ? /* @__PURE__ */ H(M, {
						tone: "error",
						"data-testid": "settings-camera-denied",
						children: "Camera blocked — allow it in the browser's site settings"
					}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(C, {
						chevron: "custom",
						id: `${_}-camera`,
						value: n.cameraId ?? i.cameras[0]?.deviceId ?? "",
						onChange: (e) => v({ cameraId: e.target.value }),
						options: Lt(i.cameras, "No camera found"),
						disabled: i.cameras.length === 0,
						className: S,
						"data-testid": "settings-camera-select"
					}), /* @__PURE__ */ U("div", {
						className: h === "prejoin" ? "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-video-stage" : "relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage",
						"data-testid": "settings-preview",
						"data-mirrored": n.mirrorPreview ? "true" : "false",
						children: [D, /* @__PURE__ */ H("span", {
							className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
							children: "Your preview"
						})]
					})] }),
					/* @__PURE__ */ H(Bt, {
						checked: n.mirrorPreview,
						onChange: (e) => v({ mirrorPreview: e }),
						testId: "settings-mirror",
						children: "Mirror my preview"
					}),
					/* @__PURE__ */ U("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ H("label", {
							htmlFor: `${_}-quality`,
							className: "text-sm text-text-primary",
							children: "Quality"
						}), /* @__PURE__ */ H(C, {
							chevron: "custom",
							id: `${_}-quality`,
							value: n.quality,
							onChange: (e) => v({ quality: e.target.value }),
							options: Ft,
							className: "h-9 w-full text-sm",
							wrapperClassName: "w-32 shrink-0",
							"data-testid": "settings-quality"
						})]
					})
				]
			}),
			/* @__PURE__ */ H(Rt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-3 py-0" : "py-1.5",
				children: /* @__PURE__ */ U(b, {
					summary: "Advanced",
					variant: "plain",
					density: "compact",
					"data-testid": "settings-advanced",
					summaryClassName: "text-[15px] font-medium text-text-primary",
					bodyClassName: "flex flex-col gap-3 pt-3",
					children: [
						/* @__PURE__ */ U("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ H("span", {
								id: `${_}-echo`,
								className: "text-sm text-text-primary",
								children: "Echo cancellation"
							}), /* @__PURE__ */ H(E, {
								checked: n.echoCancellation,
								onChange: (e) => v({ echoCancellation: e }),
								"aria-labelledby": `${_}-echo`,
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ U("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ H("span", {
								id: `${_}-agc`,
								className: "text-sm text-text-primary",
								children: "Auto gain control"
							}), /* @__PURE__ */ H(E, {
								checked: n.autoGainControl,
								onChange: (e) => v({ autoGainControl: e }),
								"aria-labelledby": `${_}-agc`,
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ U("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ H("label", {
								htmlFor: `${_}-fps`,
								className: "text-sm text-text-primary",
								children: "Frame rate"
							}), /* @__PURE__ */ H(C, {
								chevron: "custom",
								id: `${_}-fps`,
								value: String(n.frameRate),
								onChange: (e) => {
									let t = e.target.value;
									v({ frameRate: t === "auto" ? "auto" : Number(t) });
								},
								options: It,
								className: "h-9 w-full text-sm",
								wrapperClassName: "w-32 shrink-0",
								"data-testid": "settings-frame-rate"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ H(Rt, {
				divided: !1,
				className: h === "prejoin" ? "hidden" : "pt-2.5 pb-0",
				children: /* @__PURE__ */ H(Bt, {
					checked: n.rememberDevices,
					onChange: (e) => v({ rememberDevices: e }),
					testId: "settings-remember",
					children: "Use these devices next time"
				})
			})
		]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomBanner.tsx
function Ht(e) {
	let t = e ? Date.parse(e) : NaN, [n, r] = B(() => Date.now());
	return I(() => {
		if (!Number.isFinite(t)) return;
		r(Date.now());
		let e = setInterval(() => r(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t]), Number.isFinite(t) ? Math.max(0, t - n) : null;
}
function Ut({ roomName: n, endsAt: i, closing: a = !1, announcement: o, onDismissAnnouncement: s, onReturnToMain: c, className: l, "data-testid": u = "breakout-banner" }) {
	let d = Ht(i), f = d !== null && (a || d <= 6e4);
	return /* @__PURE__ */ U("div", {
		role: "region",
		"aria-label": `Breakout room: ${n}`,
		"data-testid": u,
		className: e("flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg", l),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ H(ce, { size: 18 }),
				/* @__PURE__ */ U(y, {
					size: "sm",
					weight: "semibold",
					tone: "inherit",
					className: "min-w-0 truncate",
					children: ["You're in ", n]
				}),
				d !== null && /* @__PURE__ */ H(y, {
					size: "sm",
					tone: "inherit",
					tabular: !0,
					"data-testid": `${u}-countdown`,
					"data-urgent": f ? "true" : void 0,
					"data-closing": a ? "true" : void 0,
					className: e(f && "font-semibold text-danger"),
					children: a ? `Room closes in ${$(d)}` : `${$(d)} left`
				}),
				/* @__PURE__ */ H("span", {
					role: "status",
					"aria-live": "polite",
					className: "sr-only",
					"data-testid": `${u}-closing-status`,
					children: a ? "The organizer is closing the breakout rooms. You will return to the main meeting shortly." : ""
				}),
				/* @__PURE__ */ H("span", { className: "flex-1" }),
				c && /* @__PURE__ */ H(t, {
					variant: "secondary",
					size: "sm",
					onClick: c,
					"data-testid": `${u}-return`,
					children: "Return to main meeting"
				})
			]
		}), o && /* @__PURE__ */ U("div", {
			className: "flex items-start gap-2",
			"data-testid": `${u}-announcement`,
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ U(y, {
				size: "sm",
				tone: "inherit",
				className: "block min-w-0 flex-1",
				children: [
					/* @__PURE__ */ U("span", {
						className: "font-semibold",
						children: [o.fromDisplayName, ":"]
					}),
					" ",
					o.message
				]
			}), s && /* @__PURE__ */ H(r, {
				"aria-label": "Dismiss announcement",
				variant: "ghost",
				size: "sm",
				onClick: s,
				"data-testid": `${u}-announcement-dismiss`,
				children: /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "text-base leading-none",
					children: "×"
				})
			})]
		})]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomsPanel.tsx
var Wt = [
	5,
	10,
	15,
	30,
	60
], Gt = 50, Kt = 80;
function qt({ room: e, mine: n, canJoin: i, canReturn: a, isOrganizer: s, rooms: c, onJoin: l, onReturnToMain: u, onAssign: d, onToggleRoom: f, onRenameRoom: p }) {
	let [m, h] = B(!1), g = re(), _ = e.state === "open";
	return /* @__PURE__ */ U("li", {
		className: "border-b border-border-subtle last:border-b-0",
		"data-testid": "breakout-room",
		"data-room-id": e.id,
		"data-room-state": e.state,
		"data-mine": n ? "true" : void 0,
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-2 px-3 py-3",
			children: [
				/* @__PURE__ */ H(r, {
					"aria-label": m ? `Hide people in ${e.name}` : `Show people in ${e.name}`,
					"aria-expanded": m,
					"aria-controls": g,
					variant: "ghost",
					size: "sm",
					onClick: () => h((e) => !e),
					"data-testid": "breakout-room-expand",
					children: /* @__PURE__ */ H(o, {
						size: 14,
						dir: m ? "down" : "right"
					})
				}),
				/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [s && p ? /* @__PURE__ */ H(te, {
						value: e.name,
						onCommit: (t) => p(e.id, t),
						label: "Room name",
						maxLength: Kt,
						required: !0,
						className: "-ml-1 self-start",
						"data-testid": "breakout-room-name"
					}) : /* @__PURE__ */ H(y, {
						size: "base",
						tone: "primary",
						className: "truncate",
						title: e.name,
						children: e.name
					}), /* @__PURE__ */ U(y, {
						size: "sm",
						tone: "inherit",
						className: _ ? "text-success" : "text-text-tertiary",
						"data-testid": "breakout-room-status",
						children: [_ ? "Open" : "Closed", e.members.length > 0 && /* @__PURE__ */ U("span", {
							className: "ml-1 text-text-tertiary",
							children: ["· ", e.members.length]
						})]
					})]
				}),
				s && f && /* @__PURE__ */ H(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => f(e.id, _ ? "closed" : "open"),
					"data-testid": "breakout-room-toggle",
					children: _ ? "Close" : "Open"
				}),
				n && a && u && /* @__PURE__ */ H(t, {
					variant: "secondary",
					size: "sm",
					onClick: u,
					"data-testid": "breakout-room-leave",
					children: "Leave"
				}),
				n && !a && /* @__PURE__ */ H(y, {
					size: "sm",
					tone: "secondary",
					"data-testid": "breakout-room-here",
					children: "You're here"
				}),
				!n && i && l && /* @__PURE__ */ H(t, {
					variant: "secondary",
					size: "sm",
					onClick: () => l(e.id),
					"data-testid": "breakout-room-join",
					children: "Join"
				})
			]
		}), m && /* @__PURE__ */ U("ul", {
			id: g,
			className: "flex flex-col gap-1 pb-3 pl-12 pr-3",
			"data-testid": "breakout-room-members",
			children: [e.members.length === 0 && /* @__PURE__ */ H("li", { children: /* @__PURE__ */ H(y, {
				size: "sm",
				tone: "tertiary",
				children: "Nobody yet"
			}) }), e.members.map((t) => /* @__PURE__ */ U("li", {
				className: "flex items-center gap-2",
				"data-testid": "breakout-member",
				"data-user-id": t.id,
				children: [
					/* @__PURE__ */ H(A, {
						name: t.name,
						src: t.avatarUrl,
						size: 24
					}),
					/* @__PURE__ */ H(y, {
						size: "sm",
						className: "min-w-0 flex-1 truncate",
						children: t.name
					}),
					/* @__PURE__ */ H(q, { raised: t.handRaised }),
					s && d && /* @__PURE__ */ H(Jt, {
						person: t,
						rooms: c,
						current: e.id,
						onAssign: d
					})
				]
			}, t.id))]
		})]
	});
}
function Jt({ person: e, rooms: t, current: n, onAssign: r }) {
	return /* @__PURE__ */ H(C, {
		size: "sm",
		"aria-label": `Move ${e.name}`,
		value: n ?? "",
		onChange: (t) => r(e.id, t.target.value || null),
		options: [{
			value: "",
			label: "Main meeting"
		}, ...t.map((e) => ({
			value: e.id,
			label: e.name
		}))],
		wrapperClassName: "w-36 shrink-0",
		"data-testid": "breakout-move"
	});
}
function Yt({ onCreateRooms: e }) {
	let [n, r] = B(3), [i, a] = B("assigned");
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-3 border-b border-border px-4 py-4",
		"data-testid": "breakout-create",
		children: [
			/* @__PURE__ */ H(y, {
				size: "sm",
				tone: "secondary",
				className: "block",
				children: "Split the meeting into smaller rooms."
			}),
			/* @__PURE__ */ U("label", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ H(y, {
					size: "sm",
					children: "Rooms"
				}), /* @__PURE__ */ H(ee, {
					value: n,
					onChange: r,
					min: 1,
					max: 50,
					size: "sm",
					"aria-label": "Number of rooms",
					"data-testid": "breakout-create-count"
				})]
			}),
			/* @__PURE__ */ H(j, {
				"aria-label": "How people get into rooms",
				size: "sm",
				fullWidth: !0,
				value: i,
				onChange: (e) => a(e),
				options: [{
					value: "assigned",
					label: "I assign people"
				}, {
					value: "self-select",
					label: "People choose"
				}],
				"data-testid": "breakout-create-mode"
			}),
			/* @__PURE__ */ H(t, {
				variant: "primary",
				size: "sm",
				onClick: () => e(Math.max(1, Math.min(50, Math.round(n || 1))), i),
				"data-testid": "breakout-create-submit",
				children: "Create rooms"
			})
		]
	});
}
function Xt(n) {
	let { phase: r, mode: i, rooms: a, onOpenRooms: o, onCloseRooms: s, onAutoAssign: c, onSetTimer: l, onBroadcast: u, onEnd: d, onDeleteRooms: f, onAddRoom: p, left: m, timerMinutes: h = Wt, maxRooms: g = Gt, closing: _ = !1 } = n, [v, b] = B(""), x = a.some((e) => e.state === "open"), S = () => {
		let e = v.trim();
		!e || !u || (u(e), b(""));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-3 border-b border-border px-4 py-3",
		"data-testid": "breakout-controls",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					_ && x ? /* @__PURE__ */ U(V, { children: [s && /* @__PURE__ */ H(t, {
						variant: "danger",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-close-now",
						children: "Close now"
					}), o && /* @__PURE__ */ H(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => o(),
						"data-testid": "breakout-keep-open",
						children: "Keep rooms open"
					})] }) : x ? s && /* @__PURE__ */ H(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-close-all",
						children: "Close rooms"
					}) : o && /* @__PURE__ */ H(t, {
						variant: "primary",
						size: "sm",
						onClick: () => o(),
						"data-testid": "breakout-open-all",
						children: "Open rooms"
					}),
					p && /* @__PURE__ */ H(t, {
						variant: "secondary",
						size: "sm",
						onClick: p,
						disabled: a.length >= g,
						title: a.length >= g ? `At most ${g} rooms` : void 0,
						"data-testid": "breakout-add-room",
						children: "Add room"
					}),
					i === "assigned" && c && /* @__PURE__ */ H(t, {
						variant: "secondary",
						size: "sm",
						onClick: c,
						"data-testid": "breakout-auto-assign",
						children: "Assign automatically"
					}),
					d && r === "open" && !_ && /* @__PURE__ */ H(t, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						className: "text-danger",
						"data-testid": "breakout-end",
						children: "End breakout rooms"
					}),
					f && r === "draft" && /* @__PURE__ */ H(t, {
						variant: "ghost",
						size: "sm",
						onClick: f,
						className: "text-danger",
						"data-testid": "breakout-delete",
						children: "Delete rooms"
					})
				]
			}),
			l && /* @__PURE__ */ U("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ H(y, {
					size: "sm",
					children: "Timer"
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [m !== null && /* @__PURE__ */ H(y, {
						size: "sm",
						tone: _ ? "inherit" : "secondary",
						tabular: !0,
						className: e(_ && "font-semibold text-danger"),
						"data-testid": "breakout-timer-left",
						children: _ ? `Closing in ${$(m)}` : `${$(m)} left`
					}), /* @__PURE__ */ H(C, {
						size: "sm",
						"aria-label": "Breakout timer",
						disabled: r !== "open",
						value: m === null ? "" : "running",
						onChange: (e) => {
							let t = e.target.value;
							t !== "running" && l(t ? Number(t) * 6e4 : null);
						},
						options: [
							{
								value: "",
								label: "No timer"
							},
							...m === null ? [] : [{
								value: "running",
								label: "Running"
							}],
							...h.map((e) => ({
								value: String(e),
								label: `${e} min`
							}))
						],
						wrapperClassName: "w-32",
						"data-testid": "breakout-timer"
					})]
				})]
			}),
			u && r === "open" && /* @__PURE__ */ U("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ H(k, {
					"aria-label": "Announcement to every room",
					placeholder: "Send an announcement to every room",
					value: v,
					onChange: (e) => b(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), S());
					},
					minRows: 1,
					maxRows: 4,
					autoResize: !0,
					maxLength: 500,
					className: "flex-1",
					"data-testid": "breakout-broadcast-input"
				}), /* @__PURE__ */ H(t, {
					variant: "secondary",
					size: "sm",
					onClick: S,
					disabled: !v.trim(),
					"data-testid": "breakout-broadcast-send",
					children: "Send"
				})]
			})
		]
	});
}
function Zt(t) {
	let { rooms: n, phase: i, mode: a, myRoomId: o = null, isOrganizer: s = !1, unassigned: c = [], endsAt: l = null, allowReturnToMain: u = !0, closing: d = !1, onJoin: f, onReturnToMain: p, onCreateRooms: m, onAssign: h, onOpenRooms: g, onCloseRooms: _, onRenameRoom: v, onClose: b, title: x = "Breakout rooms", notice: S, className: C, "data-testid": w = "breakout-rooms-panel" } = t, T = Ht(i === "open" ? l : null), E = u || s, D = g && _ ? (e, t) => t === "open" ? g([e]) : _([e]) : void 0;
	return /* @__PURE__ */ U("aside", {
		"aria-label": x,
		"data-testid": w,
		"data-phase": i,
		"data-mode": a,
		className: e("flex h-full min-h-0 w-full min-w-0 flex-col bg-surface", C),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ H(y, {
					as: "div",
					size: "lg",
					weight: "semibold",
					role: "heading",
					"aria-label": x,
					children: x
				}), b && /* @__PURE__ */ H(r, {
					"aria-label": `Close ${x.toLowerCase()}`,
					variant: "ghost",
					size: "sm",
					onClick: b,
					"data-testid": `${w}-close`,
					children: /* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						className: "text-xl leading-none",
						children: "×"
					})
				})]
			}),
			S,
			/* @__PURE__ */ U("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: [
					s && i === "none" && m && /* @__PURE__ */ H(Yt, { onCreateRooms: m }),
					s && i !== "none" && /* @__PURE__ */ H(Xt, {
						...t,
						left: T
					}),
					!s && T !== null && /* @__PURE__ */ U(y, {
						as: "div",
						size: "sm",
						tone: d ? "inherit" : "secondary",
						tabular: !0,
						className: e("px-4 pt-3", d && "font-semibold text-danger"),
						"data-testid": "breakout-timer-left",
						children: [
							d ? "Closing" : "Rooms close",
							" in ",
							$(T)
						]
					}),
					n.length === 0 && !s && /* @__PURE__ */ H(y, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "block px-4 py-6",
						"data-testid": `${w}-empty`,
						children: "No breakout rooms yet. The organizer will open them."
					}),
					n.length > 0 && /* @__PURE__ */ H("ul", {
						className: "flex flex-col",
						"data-testid": "breakout-room-list",
						children: n.map((e) => {
							let t = e.id === o, r = e.state === "open" && i === "open" && !d && (a === "self-select" || s);
							return /* @__PURE__ */ H(qt, {
								room: e,
								mine: t,
								canJoin: r,
								canReturn: E,
								isOrganizer: s,
								rooms: n,
								onJoin: f,
								onReturnToMain: p,
								onAssign: h,
								onToggleRoom: D,
								onRenameRoom: v
							}, e.id);
						})
					}),
					s && i !== "none" && c.length > 0 && /* @__PURE__ */ U("section", {
						className: "border-t border-border px-4 py-3",
						"data-testid": "breakout-unassigned",
						"aria-label": "Not in a room",
						children: [/* @__PURE__ */ U(y, {
							as: "div",
							size: "sm",
							weight: "semibold",
							className: "mb-2",
							children: [
								"Not in a room (",
								c.length,
								")"
							]
						}), /* @__PURE__ */ H("ul", {
							className: "flex flex-col gap-1",
							children: c.map((e) => /* @__PURE__ */ U("li", {
								className: "flex items-center gap-2",
								"data-testid": "breakout-unassigned-person",
								"data-user-id": e.id,
								children: [
									/* @__PURE__ */ H(A, {
										name: e.name,
										src: e.avatarUrl,
										size: 24
									}),
									/* @__PURE__ */ H(y, {
										size: "sm",
										className: "min-w-0 flex-1 truncate",
										children: e.name
									}),
									/* @__PURE__ */ H(q, { raised: e.handRaised }),
									h && /* @__PURE__ */ H(Jt, {
										person: e,
										rooms: n,
										current: null,
										onAssign: h
									})
								]
							}, e.id))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { we as A, G as B, Re as C, ke as D, Ae as E, pe as F, ue as G, se as H, fe as I, le as K, J as L, ge as M, me as N, Oe as O, he as P, q as R, $ as S, Me as T, ae as U, ie as V, ce as W, rt as _, Pt as a, Qe as b, Ot as c, wt as d, St as f, ft as g, at as h, Vt as i, Te as j, De as k, Et as l, ht as m, Ut as n, Nt as o, xt as p, oe as q, Ht as r, At as s, Zt as t, Ct as u, nt as v, Ne as w, We as x, qe as y, K as z };
