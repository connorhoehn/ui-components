import { t as e } from "./cn-D4QmbyEy.js";
import { n as t, t as n } from "./Button-C-I3BxWI.js";
import { t as r } from "./IconButton-J9jGN6eo.js";
import { S as i, h as a, m as o, q as s, rt as c } from "./Icons-C__ztBBw.js";
import { _ as l, a as u, b as d, h as f, i as p, p as m, r as h, s as g, u as _, x as v, y } from "./MediaIcons-_ai5Til2.js";
import { t as b } from "./Text-B7xYP_4n.js";
import { n as x, t as S } from "./Badge-CogooeUA.js";
import { t as C } from "./Banner-9a794qOE.js";
import { t as w } from "./Select-DovxLSsz.js";
import { t as T } from "./InlinePopover-CdWlzyRG.js";
import { t as E } from "./SkeletonCard-D3FL0TB7.js";
import { n as D, t as O } from "./Slider-DEbQCKD1.js";
import { t as k } from "./DropdownMenu-iRFl_IXz.js";
import { t as A } from "./Textarea-BwvE1HPn.js";
import { t as j } from "./Avatar-DkkMISPQ.js";
import { t as M } from "./StatusDot-GwVn-q5q.js";
import { t as N } from "./SegmentedControl-DJWbLQSw.js";
import { t as P } from "./InlineAlert-BqOYETP1.js";
import { t as F } from "./ActivityFeed-BU9LDJNO.js";
import { t as I } from "./NumberInput-C1JOoCoC.js";
import { t as L } from "./Checkbox-Dvt09s3H.js";
import { t as ee } from "./InlineEditableText-CzB64Ufv.js";
import { memo as R, useCallback as te, useEffect as z, useId as ne, useLayoutEffect as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/components/video/MeetingIcons.tsx
function q(e, t) {
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
function re({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11" }),
			/* @__PURE__ */ G("path", { d: "M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" }),
			/* @__PURE__ */ G("path", { d: "M14 10.5V5.5a1.5 1.5 0 0 1 3 0v8" }),
			/* @__PURE__ */ G("path", { d: "M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.1l3.4 4.6A6 6 0 0 0 12.4 20h.6a4 4 0 0 0 4-4v-2.5" })
		]
	});
}
function ie({ size: e = 16, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [/* @__PURE__ */ G("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ G("circle", {
			cx: "12",
			cy: "12",
			r: "4",
			fill: "currentColor"
		})]
	});
}
function ae({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ G("path", { d: "M8.5 14a4.5 4.5 0 0 0 7 0" }),
			/* @__PURE__ */ G("line", {
				x1: "9",
				y1: "9.5",
				x2: "9",
				y2: "9.6"
			}),
			/* @__PURE__ */ G("line", {
				x1: "15",
				y1: "9.5",
				x2: "15",
				y2: "9.6"
			})
		]
	});
}
function oe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2"
			}),
			/* @__PURE__ */ G("line", {
				x1: "12",
				y1: "3.5",
				x2: "12",
				y2: "20.5"
			}),
			/* @__PURE__ */ G("line", {
				x1: "3.5",
				y1: "12",
				x2: "20.5",
				y2: "12"
			})
		]
	});
}
function se({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("rect", {
				x: "5",
				y: "3",
				width: "14",
				height: "18",
				rx: "2"
			}),
			/* @__PURE__ */ G("line", {
				x1: "8.5",
				y1: "8",
				x2: "15.5",
				y2: "8"
			}),
			/* @__PURE__ */ G("line", {
				x1: "8.5",
				y1: "12",
				x2: "15.5",
				y2: "12"
			}),
			/* @__PURE__ */ G("line", {
				x1: "8.5",
				y1: "16",
				x2: "12.5",
				y2: "16"
			})
		]
	});
}
function ce({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [/* @__PURE__ */ G("rect", {
			x: "3.5",
			y: "3.5",
			width: "17",
			height: "17",
			rx: "2.5"
		}), /* @__PURE__ */ G("rect", {
			x: "11",
			y: "11",
			width: "6.5",
			height: "6.5",
			rx: "1.5"
		})]
	});
}
function le({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2.5"
			}),
			/* @__PURE__ */ G("line", {
				x1: "12",
				y1: "8",
				x2: "12",
				y2: "16"
			}),
			/* @__PURE__ */ G("line", {
				x1: "8",
				y1: "12",
				x2: "16",
				y2: "12"
			})
		]
	});
}
function ue({ size: e = 20, ...t }) {
	return /* @__PURE__ */ G("svg", {
		...q(e, t),
		children: /* @__PURE__ */ G("path", { d: "M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" })
	});
}
function de({ size: e = 20, ...t }) {
	return /* @__PURE__ */ K("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ G("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "13",
				rx: "2"
			}),
			/* @__PURE__ */ G("path", { d: "M12 14V8.5" }),
			/* @__PURE__ */ G("path", { d: "m9.25 11 2.75-2.75L14.75 11" })
		]
	});
}
//#endregion
//#region src/components/video/RaisedHandBadge.tsx
function J(e) {
	return e ? typeof e == "number" ? `Hand raised, ${Y(e)} in line` : "Hand raised" : null;
}
function Y(e) {
	let t = [
		"th",
		"st",
		"nd",
		"rd"
	], n = e % 100;
	return `${e}${t[(n - 20) % 10] ?? t[n] ?? t[0]}`;
}
function X({ raised: t, tone: n = "chip", size: r = "sm", className: i, "data-testid": a = "raised-hand-badge" }) {
	let o = J(t);
	return o ? /* @__PURE__ */ K("span", {
		role: "img",
		"aria-label": o,
		title: o,
		"data-testid": a,
		"data-hand-position": typeof t == "number" ? t : void 0,
		className: e("inline-flex shrink-0 items-center gap-0.5 rounded-full leading-none", r === "sm" ? "h-4 px-1" : "h-5 px-1.5", n === "chip" ? "bg-warning-bg text-text-primary [&_svg]:text-warning" : "bg-warning text-call-chrome", i),
		children: [/* @__PURE__ */ G(re, { size: r === "sm" ? 11 : 13 }), typeof t == "number" && /* @__PURE__ */ G(b, {
			as: "span",
			size: "xs",
			weight: "semibold",
			tone: "inherit",
			tabular: !0,
			className: "leading-none",
			children: t
		})]
	}) : null;
}
//#endregion
//#region src/components/video/ParticipantTile.tsx
function Z({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, handRaised: o, isLocal: s = !1, isSpotlight: c = !1, videoElement: l, onClick: u, fillParent: d = !1, className: f, style: p }) {
	let m = s ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ K("div", {
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
			l ?? /* @__PURE__ */ G("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: pe(n) },
				children: /* @__PURE__ */ G("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", c ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ G("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : fe(n)
				})
			}),
			/* @__PURE__ */ K("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					s && /* @__PURE__ */ G("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!s && /* @__PURE__ */ G("span", {
						className: "truncate font-medium",
						children: n
					}),
					/* @__PURE__ */ G(X, {
						raised: o,
						tone: "overlay",
						"data-testid": "tile-raised-hand"
					}),
					a && /* @__PURE__ */ G("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ G("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ G("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", c ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ K("svg", {
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
						/* @__PURE__ */ G("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ G("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ G("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ G("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ G("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ G("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function fe(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function pe(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ReactionOverlay.tsx
var me = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function Q(e) {
	return me[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function he({ reactions: t, className: n, style: r }) {
	let [i, a] = U([]);
	return z(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), z(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ G("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ G("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var ge = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function _e({ onReact: t, emojis: n = ge, className: r, style: i, tone: a = "chrome" }) {
	return /* @__PURE__ */ G("div", {
		"data-testid": "reaction-picker",
		"data-tone": a,
		className: e("flex gap-1", a === "chrome" ? "px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border" : "p-0.5", r),
		style: i,
		children: n.map((n) => {
			let r = Q(n);
			return /* @__PURE__ */ G("button", {
				type: "button",
				onClick: () => t(n),
				"aria-label": `React with ${r}`,
				"data-testid": `reaction-option-${r}`,
				className: e("bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded", "transition-transform duration-100 active:scale-125", a === "chrome" ? "hover:bg-white/10" : "hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-primary"),
				children: n
			}, n);
		})
	});
}
var ve = /* @__PURE__ */ K("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ G("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ G("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ G("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ G("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function ye({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, tone: o = "chrome", className: s }) {
	let [c, l] = U(!1);
	return /* @__PURE__ */ K("div", {
		className: e("relative inline-flex", s),
		children: [/* @__PURE__ */ G("button", {
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": c,
			disabled: a,
			onClick: () => l((e) => !e),
			"data-testid": "reaction-picker-open",
			"data-tone": o,
			className: e(o === "surface" ? ["w-8 h-8 rounded-md flex items-center justify-center border border-solid border-border cursor-pointer transition-colors duration-150", c ? "bg-surface-inset text-text-primary" : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", c ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"], a && "opacity-40 cursor-not-allowed"),
			children: ve
		}), c && /* @__PURE__ */ G(_e, {
			emojis: n,
			onReact: (e) => {
				t(e), r && l(!1);
			},
			className: e("absolute bottom-full mb-2 z-10 shadow-lg", i === "center" && "left-1/2 -translate-x-1/2", i === "left" && "left-0", i === "right" && "right-0")
		})]
	});
}
//#endregion
//#region src/components/video/ViewerCount.tsx
function be(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function xe({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!be(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ K("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ K("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ G("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ G("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ K("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/video/callDockRenderProbe.ts
var Se = null;
function Ce(e, t) {
	Se?.(e, t);
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function we({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = V(() => {
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
	]), m = Te(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ K("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ G(Z, {
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
			p.length === 0 && /* @__PURE__ */ G("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", a ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			f && n && /* @__PURE__ */ G("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: o },
				children: /* @__PURE__ */ G(Z, {
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
function Te(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function Ee({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: f = 84, tileTestIdPrefix: p = "call-tile", maxColumns: m, className: h, style: g, "data-testid": _ = "call-tile-row" }) {
	if (c === "grid") {
		let i = n ? [n, ...t] : t, a = m ? Math.max(1, Math.min(Te(i.length), m)) : Te(i.length);
		return /* @__PURE__ */ G("div", {
			className: e("grid w-full min-w-0 gap-2", De[a] ?? De[4], h),
			style: g,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": _,
			"data-variant": "grid",
			"data-tile-count": i.length,
			"data-columns": a,
			children: i.map((e) => /* @__PURE__ */ G(je, {
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
	if (c === "dock") return /* @__PURE__ */ G(ke, {
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
	let v = n ? [...t, n] : t, y = v.map((t) => /* @__PURE__ */ G(Z, {
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
	return c === "floating" ? /* @__PURE__ */ K("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "floating",
		"data-tile-count": v.length,
		children: [/* @__PURE__ */ G("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${_}-tiles`,
			children: v.map((t) => t.videoElement ? /* @__PURE__ */ G(Z, {
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
			}, t.id) : /* @__PURE__ */ G(Ne, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ G("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${_}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ K("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "bar",
		"data-tile-count": v.length,
		children: [
			o && /* @__PURE__ */ G("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${_}-title`,
				children: o
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${_}-tiles`,
				children: y
			}),
			a && /* @__PURE__ */ G("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${_}-controls`,
				children: a
			})
		]
	});
}
var De = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function Oe(e) {
	if (!e.length) return [];
	let t = e[0].offsetTop;
	return e.flatMap((e, n) => e.offsetTop > t + 1 ? [n] : []);
}
function ke({ all: t, activeSpeakerId: n, highlightedId: r, tileWidth: i, tileHeight: a, overflow: o, maxVisible: s, tileTestIdPrefix: c, title: l, onParticipantClick: u, className: d, style: f, testId: p }) {
	let m = o === "collapse" && t.length > s ? t.slice(0, Math.max(1, s - 1)) : t, h = t.slice(m.length), g = H(null), [_, v] = U(null), y = m.map((e) => e.id).join("|");
	B(() => {
		let e = g.current;
		if (!e || o !== "collapse") return;
		let t = () => {
			let t = [...e.children].filter((e) => e instanceof HTMLElement && e.dataset.dockItem === "true"), n = Oe(t);
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
	return /* @__PURE__ */ K("div", {
		className: e("relative min-w-0", d),
		style: f,
		children: [/* @__PURE__ */ K("div", {
			ref: g,
			className: e("flex min-w-0 items-center gap-2", b ? "flex-wrap overflow-hidden" : "overflow-x-auto"),
			style: b ? { height: a } : void 0,
			role: "group",
			"aria-label": typeof l == "string" ? `Call: ${l}` : "Call participants",
			"data-testid": p,
			"data-variant": "dock",
			"data-tile-count": t.length,
			"data-hidden-count": _?.hidden ?? 0,
			children: [m.map((e) => /* @__PURE__ */ G(je, {
				participant: e,
				width: i,
				height: a,
				speaking: e.id === n,
				highlighted: e.id === r,
				testId: `${c}-${e.id}`,
				...u ? { onParticipantClick: u } : {}
			}, e.id)), h.length > 0 && /* @__PURE__ */ K("div", {
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
				children: [h.map((e) => (e.videoElement != null || e.audioElement != null) && /* @__PURE__ */ K("div", {
					className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
					"aria-hidden": "true",
					"data-testid": `${c}-${e.id}-media-sink`,
					children: [e.videoElement, e.audioElement]
				}, e.id)), /* @__PURE__ */ G(j, {
					name: `+ ${h.length}`,
					initials: `+${h.length}`,
					size: 40,
					color: "rgba(255,255,255,0.18)",
					showTitle: !1
				})]
			})]
		}), _ && /* @__PURE__ */ K("span", {
			className: "pointer-events-none absolute top-1 z-20 -translate-x-full rounded-full bg-surface-inverse/70 px-2 py-0.5 text-xs font-medium text-white",
			style: { left: _.left - 4 },
			title: _.names,
			"aria-label": `${_.hidden} more: ${_.names}`,
			"data-testid": `${c}-wrapped`,
			children: ["+", _.hidden]
		})]
	});
}
function Ae(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => Object.is(e[n], t[n]));
}
var je = R(Me, (e, t) => e.width === t.width && e.height === t.height && e.fluid === t.fluid && e.speaking === t.speaking && e.highlighted === t.highlighted && e.testId === t.testId && e.onParticipantClick === t.onParticipantClick && Ae(e.participant, t.participant));
function Me({ participant: t, width: n, height: r, fluid: i = !1, speaking: a, highlighted: o, testId: s, onParticipantClick: c }) {
	Ce("tile", t.id);
	let l = c ? () => c(t.id) : void 0, d = t.isLocal ? "You" : t.displayName, f = t.ringing ? `${t.displayName}, ringing` : `${t.isLocal ? "You" : t.displayName}${t.handRaised ? `, ${J(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
	return /* @__PURE__ */ K("div", {
		className: e("relative shrink-0 overflow-hidden rounded-md text-white", i && "aspect-video w-full", t.videoElement && !t.cameraOff ? "bg-video-tile" : "bg-video-tile-off", "[&_video]:h-full [&_video]:w-full [&_video]:object-cover", l && "cursor-pointer"),
		style: i ? void 0 : {
			width: n,
			height: r
		},
		title: f,
		"aria-label": f,
		role: l ? "button" : "img",
		tabIndex: l ? 0 : void 0,
		onClick: l,
		onKeyDown: l ? (e) => {
			(e.key === "Enter" || e.key === " ") && l();
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
			t.videoElement && t.cameraOff && /* @__PURE__ */ G("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${s}-media-sink`,
				children: t.videoElement
			}),
			t.audioElement != null && /* @__PURE__ */ G("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${s}-audio-sink`,
				children: t.audioElement
			}),
			t.videoElement && !t.cameraOff ? t.videoElement : /* @__PURE__ */ G("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ G(j, {
					name: t.displayName,
					size: i ? 56 : Math.round(Math.min(40, r * .48)),
					...t.avatarUrl ? { src: t.avatarUrl } : {},
					color: "rgba(71,80,92,0.28)",
					showTitle: !1,
					...t.ringing ? { className: "animate-pulse" } : {}
				})
			}),
			t.reconnecting && /* @__PURE__ */ G("div", {
				className: "absolute inset-0 bg-surface-inverse/40",
				"data-testid": `${s}-reconnecting`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ K("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-3 text-xs",
				children: [/* @__PURE__ */ G("span", {
					className: "min-w-0 flex-1 truncate font-medium",
					children: d
				}), t.ringing ? /* @__PURE__ */ G("span", {
					className: "shrink-0 text-white/80",
					"data-testid": `${s}-ringing`,
					children: "Ringing…"
				}) : /* @__PURE__ */ K(W, { children: [
					/* @__PURE__ */ G(X, {
						raised: t.handRaised,
						tone: "overlay",
						"data-testid": `${s}-hand`
					}),
					t.screenSharing && /* @__PURE__ */ G(m, {
						size: 13,
						className: "shrink-0"
					}),
					t.isMuted ? /* @__PURE__ */ G(u, {
						size: 14,
						className: "shrink-0"
					}) : /* @__PURE__ */ G(p, {
						size: 14,
						className: "shrink-0"
					})
				] })]
			}),
			(o || a) && /* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				"data-testid": `${s}-ring`,
				"data-ring": o ? "highlighted" : "speaking",
				className: e("pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset", o ? "ring-primary" : "ring-success")
			}),
			a && o && /* @__PURE__ */ G("span", {
				className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-success",
				"aria-hidden": "true"
			})
		]
	});
}
function Ne({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${t.handRaised ? `, ${J(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ K("div", {
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
			/* @__PURE__ */ G(j, {
				name: t.displayName,
				size: 44,
				...t.avatarUrl ? { src: t.avatarUrl } : {}
			}),
			t.handRaised ? /* @__PURE__ */ G(X, {
				raised: t.handRaised,
				tone: "overlay",
				className: "absolute -left-1 -top-1 ring-2 ring-white",
				"data-testid": "bubble-hand"
			}) : null,
			t.isMuted && /* @__PURE__ */ G("span", {
				className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
				"aria-hidden": "true",
				children: "✕"
			})
		]
	});
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function Pe({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = Fe(a, o), p = V(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = V(() => {
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
	return r ? (g = "screen", _ = i ?? h?.displayName ?? "", v = r) : p ? (g = "screen", _ = p.displayName, v = p.screenElement) : h ? (g = "camera", _ = h.displayName, v = /* @__PURE__ */ G(Z, {
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
	})) : (g = "camera", _ = ""), /* @__PURE__ */ K("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", c && "h-full w-full", u),
		style: d,
		children: [/* @__PURE__ */ G("div", {
			className: e("bg-black relative", c ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": g,
			"data-spotlight-user": _,
			children: v
		}), m.length > 0 && /* @__PURE__ */ G("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: m.map((e) => /* @__PURE__ */ G("div", {
				className: "shrink-0",
				style: { width: l },
				children: /* @__PURE__ */ G(Z, {
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
function Fe(e, t) {
	let [n, r] = U(e ?? null);
	return z(() => {
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
var Ie = 10;
function Le({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= Ie ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ G(Pe, {
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
	}) : /* @__PURE__ */ G(we, {
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
function Re(e, t) {
	let [n, r] = U(0);
	return z(() => {
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
function ze(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function Be({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
	let a = H(null), o = H(i);
	return o.current = i, z(() => {
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
	}, [e, n]), /* @__PURE__ */ G("video", {
		ref: a,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function Ve({ stream: e }) {
	let t = H(null);
	return z(() => {
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
	}, [e]), /* @__PURE__ */ G("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function He({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	Re(e, t);
	let i = ze(e);
	return !n || !i || !e ? /* @__PURE__ */ K("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ G(j, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ G(Ve, { stream: e })]
	}) : /* @__PURE__ */ G(Be, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function Ue({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ G("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var We = {
	microphone: "Mic",
	camera: "Camera"
}, Ge = {
	microphone: "microphone",
	camera: "camera"
}, Ke = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, qe = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function Je({ kind: t, on: r, onToggle: i, devices: a, selectedDeviceId: s, onSelectDevice: c, permission: l, level: f, size: m = "sm", showLabel: h = !1, extraItems: g, disabledReason: _, deviceMenu: y = !0, className: b, "data-testid": x = `device-toggle-${t}` }) {
	let S = l === "denied" || l === "unavailable", C = _ ?? (l === "denied" ? Ke[t] : l === "unavailable" ? qe[t] : void 0), w = !!C || S, T = r && !w, E = t === "microphone" && T && (f ?? 0) > .08, D = m === "md" ? 20 : 18, O;
	O = G(t === "microphone" ? T ? p : u : T ? d : v, { size: D });
	let A = `${We[t]} ${T ? "on" : "off"}`, j = T ? `Turn ${Ge[t]} off` : `Turn ${Ge[t]} on`, M = a.length ? a.map((e) => ({
		label: e.label,
		checked: e.deviceId === s,
		onSelect: () => c(e.deviceId),
		"data-testid": `${x}-device-${e.deviceId}`
	})) : [{
		label: qe[t],
		disabled: !0
	}], N = m === "md" ? "h-10" : "h-8", P = !T && t === "microphone" && !w ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ K("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", E && "ring-2 ring-primary/50", N, b),
		"data-kind": t,
		"data-on": T ? "true" : "false",
		"data-permission": l,
		children: [/* @__PURE__ */ K("button", {
			type: "button",
			onClick: w ? void 0 : i,
			disabled: w,
			"aria-pressed": T,
			"aria-label": h ? void 0 : j,
			title: C ?? j,
			"data-testid": x,
			className: e("inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-[inherit] text-sm", y ? "rounded-l-md" : "rounded-md", n, "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", m === "md" ? "px-2.5" : "px-2", h && "min-w-0 flex-1 justify-start gap-1.5 pr-2", P),
			children: [O, h && /* @__PURE__ */ G("span", {
				className: "min-w-0 truncate whitespace-nowrap",
				children: A
			})]
		}), y && /* @__PURE__ */ G(k, {
			trigger: /* @__PURE__ */ G(o, { size: 14 }),
			triggerLabel: `Choose ${Ge[t]}`,
			triggerTitle: `Choose ${Ge[t]}`,
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
var Ye = {
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
function Xe(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
var Ze = R(function({ phase: e, callingTo: t, participantCount: n, elapsedMs: r }) {
	Ce("meta");
	let i;
	return i = e === "calling" ? t ? `Calling ${t}…` : "Calling…" : e === "connecting" ? "Connecting…" : e === "reconnecting" ? /* @__PURE__ */ G("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${Xe(n)}${r == null ? "" : ` · ${$(r)}`}`, /* @__PURE__ */ G("span", {
		className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
		"data-testid": "call-dock-meta",
		children: i
	});
});
function Qe(e, t, n) {
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
var $e = R(function({ participants: e, localParticipantId: t, activeSpeakerId: n, followingUserId: r, reconnecting: i, size: a, grid: o = !1, maxColumns: s, onTileClick: c, title: l }) {
	let u = e.find((e) => e.userId === t) ?? null, d = e.filter((e) => e.userId !== t);
	return /* @__PURE__ */ G(Ee, {
		variant: o ? "grid" : "dock",
		participants: d.map((e) => Qe(e, !1, i)),
		localParticipant: u ? Qe(u, !0, i) : null,
		activeSpeakerId: n,
		highlightedId: r,
		tileWidth: Ye[a].w,
		tileHeight: Ye[a].h,
		overflow: "collapse",
		maxVisible: Ye[a].visible,
		...s ? { maxColumns: s } : {},
		...c ? { onParticipantClick: c } : {},
		title: l,
		"data-testid": "call-dock-tile-row"
	});
});
function et({ title: n, participantCount: a, elapsedMs: o, phase: c, callingTo: l, documents: u = [], participants: d, localParticipantId: p, activeSpeakerId: g = null, followingUserId: v = null, mic: b, camera: x, screenShare: w, onOpenPeople: D, onOpenDocuments: O, peopleOpen: A = !1, documentsOpen: j = !1, onOpenSettings: M, extras: N, onPopOut: P, onLeave: F, canEndForEveryone: I = !1, onEndForEveryone: L, onTileClick: ee, onTitleClick: R, onDocumentClick: z, endedSummary: ne, error: B, onDismiss: V, compact: q = !1, tileSize: re, layout: ie = "shelf", className: ae, "data-testid": oe = "call-dock" }) {
	let se = re ?? (q ? "sm" : "md"), ce = H(null), [le, ue] = U(!1), de = H(ee);
	de.current = ee;
	let J = te((e) => de.current?.(e), []);
	if (c === "error" && B) return /* @__PURE__ */ G("div", {
		className: e("border-t border-border bg-surface px-5 py-3", ae),
		"data-testid": oe,
		"data-phase": "error",
		children: /* @__PURE__ */ G(C, {
			variant: "error",
			title: B.title ?? `Lost the call — ${B.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ K("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ G(t, {
					size: "sm",
					onClick: B.onRetry,
					"data-testid": "call-dock-rejoin",
					children: B.retryLabel ?? "Rejoin"
				}), V && /* @__PURE__ */ G(t, {
					size: "sm",
					variant: "ghost",
					onClick: V,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (c === "ended") return /* @__PURE__ */ K("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", ae),
		"data-testid": oe,
		"data-phase": "ended",
		children: [/* @__PURE__ */ K("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ G("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				o != null && /* @__PURE__ */ K(W, { children: [" · ", $(o)] }),
				ne != null && /* @__PURE__ */ K(W, { children: [" · ", ne] })
			]
		}), V && /* @__PURE__ */ G(t, {
			variant: "link",
			onClick: V,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let Y = c === "calling", X = c === "connecting", Z = c === "reconnecting", fe = () => {
		!Y && I && L ? ue(!0) : F();
	}, pe = ie === "stage", me = ie === "grid" || pe, Q = ie === "stack" || pe && se === "sm", he = Y ? "You can share once someone joins" : X ? "Connecting…" : w.disabledReason, ge = [
		{
			label: w.on ? "Stop sharing" : "Share your screen",
			icon: /* @__PURE__ */ G(m, { size: 16 }),
			onSelect: w.onToggle,
			...he ? {
				disabled: !0,
				disabledReason: he
			} : {},
			"data-testid": "call-dock-share"
		},
		{
			label: `People (${a})`,
			icon: /* @__PURE__ */ G(y, { size: 16 }),
			onSelect: D,
			...A ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-people"
		},
		...O ? [{
			label: `Documents (${u.length})`,
			icon: /* @__PURE__ */ G(i, { size: 16 }),
			onSelect: O,
			...j ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-documents"
		}] : [],
		{
			label: "Call settings",
			icon: /* @__PURE__ */ G(f, { size: 16 }),
			onSelect: M,
			"data-testid": "call-dock-settings"
		},
		{
			label: "Pop out the call",
			icon: /* @__PURE__ */ G(h, { size: 16 }),
			onSelect: P,
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-popout"
		}
	], _e = /* @__PURE__ */ K("div", {
		className: "relative",
		"data-testid": "call-dock-tiles",
		children: [Z && /* @__PURE__ */ G("div", {
			className: "mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg",
			role: "status",
			"data-testid": "call-dock-reconnecting",
			children: "Reconnecting…"
		}), X ? /* @__PURE__ */ G("div", {
			className: "flex gap-2",
			"data-testid": "call-dock-connecting",
			children: /* @__PURE__ */ G("div", {
				className: e("shrink-0 overflow-hidden rounded-md", me || Q ? "aspect-video w-full" : Ye[se].box),
				children: /* @__PURE__ */ G(E, {
					height: "100%",
					rounded: "md"
				})
			})
		}) : /* @__PURE__ */ G($e, {
			participants: d,
			localParticipantId: p,
			activeSpeakerId: g,
			followingUserId: v,
			reconnecting: Z,
			size: se,
			grid: me || Q,
			...Q ? { maxColumns: 2 } : {},
			onTileClick: ee ? J : void 0,
			title: n
		})]
	});
	return me && !pe ? /* @__PURE__ */ G("section", {
		className: e("flex min-w-0 flex-col gap-2 bg-surface p-3", ae),
		"aria-label": `Call: ${n}`,
		"data-testid": oe,
		"data-phase": c,
		"data-layout": "grid",
		"data-compact": se === "sm" ? "true" : "false",
		children: _e
	}) : /* @__PURE__ */ K("section", {
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", ae),
		"aria-label": `Call: ${n}`,
		"data-testid": oe,
		"data-phase": c,
		"data-layout": pe ? "stage" : Q ? "stack" : "shelf",
		"data-call-dock": !0,
		"data-compact": se === "sm" || Q ? "true" : "false",
		"data-tile-size": Q ? void 0 : se,
		children: [/* @__PURE__ */ K("div", {
			className: e("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2", pe && "order-last justify-center"),
			"data-call-dock-header": !0,
			"data-testid": `${oe}-header`,
			children: [!pe && /* @__PURE__ */ K("div", {
				className: "flex min-w-0 flex-auto items-baseline gap-3",
				children: [
					/* @__PURE__ */ G("button", {
						type: "button",
						onClick: R,
						disabled: !R,
						className: "max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline",
						"data-testid": "call-dock-title",
						title: n,
						children: n
					}),
					/* @__PURE__ */ G(Ze, {
						phase: c,
						callingTo: l,
						participantCount: a,
						elapsedMs: o
					}),
					u.length > 0 && /* @__PURE__ */ G("span", {
						className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
						"data-testid": "call-dock-documents-chips",
						children: u.map((t) => /* @__PURE__ */ K("button", {
							type: "button",
							onClick: z ? () => z(t.id) : void 0,
							className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", z ? "cursor-pointer hover:underline" : "cursor-default"),
							"data-testid": `call-dock-document-${t.id}`,
							"data-presenting": t.presenting ? "true" : "false",
							title: t.presenting ? `${t.title} · Presenting` : t.title,
							children: [/* @__PURE__ */ G(i, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ G("span", {
								className: "truncate",
								children: t.title
							})]
						}, t.id))
					})
				]
			}), /* @__PURE__ */ K("div", {
				className: e("flex min-w-0 max-w-full flex-wrap items-center gap-2", pe ? "justify-center" : "ml-auto justify-end"),
				"data-testid": `${oe}-controls`,
				children: [
					/* @__PURE__ */ G(Je, {
						kind: "microphone",
						...b,
						"data-testid": "call-dock-mic",
						...X ? { disabledReason: "Connecting…" } : {}
					}),
					/* @__PURE__ */ G(Je, {
						kind: "camera",
						...x,
						"data-testid": "call-dock-camera",
						...X ? { disabledReason: "Connecting…" } : {}
					}),
					!Q && /* @__PURE__ */ K(W, { children: [
						/* @__PURE__ */ K(t, {
							variant: w.on ? "danger" : "ghost",
							size: "sm",
							onClick: w.onToggle,
							disabled: X || Y || !!w.disabledReason,
							title: Y ? "You can share once someone joins" : w.disabledReason ?? (w.on ? "Stop sharing" : "Share your screen"),
							"aria-label": w.on ? "Stop sharing" : "Share",
							"aria-pressed": w.on,
							"data-testid": "call-dock-share",
							className: "inline-flex h-8 items-center gap-1.5 bg-surface",
							children: [/* @__PURE__ */ G(m, { size: 16 }), /* @__PURE__ */ G("span", {
								className: "hidden @min-[860px]:inline",
								children: w.on ? "Stop sharing" : "Share"
							})]
						}),
						/* @__PURE__ */ K(t, {
							variant: A ? "secondary" : "ghost",
							size: "sm",
							onClick: D,
							disabled: X,
							"aria-label": `People (${a})`,
							"aria-pressed": A,
							"data-testid": "call-dock-people",
							className: e("inline-flex h-8 items-center gap-1.5", !A && "bg-surface"),
							children: [
								/* @__PURE__ */ G(y, { size: 16 }),
								/* @__PURE__ */ G("span", {
									className: "hidden @min-[860px]:inline",
									children: "People"
								}),
								/* @__PURE__ */ G(S, {
									variant: "count",
									value: a,
									color: "muted",
									"aria-label": `${a} people`
								})
							]
						}),
						O && /* @__PURE__ */ K(t, {
							variant: j ? "secondary" : "ghost",
							size: "sm",
							onClick: O,
							disabled: X,
							"aria-label": `Documents (${u.length})`,
							"aria-pressed": j,
							"data-testid": "call-dock-documents",
							className: e("hidden h-8 items-center gap-1.5 @min-[980px]:inline-flex", !j && "bg-surface"),
							children: [
								/* @__PURE__ */ G(i, { size: 16 }),
								/* @__PURE__ */ G("span", {
									className: "hidden @min-[860px]:inline",
									children: "Documents"
								}),
								/* @__PURE__ */ G(S, {
									variant: "count",
									value: u.length,
									color: "muted",
									"aria-label": `${u.length} documents`
								})
							]
						})
					] }),
					N != null && /* @__PURE__ */ G("div", {
						className: "contents",
						"data-testid": "call-dock-extras",
						children: N
					}),
					/* @__PURE__ */ K("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-testid": "call-dock-end",
						children: [Q ? /* @__PURE__ */ G(k, {
							trigger: /* @__PURE__ */ G(s, { size: 16 }),
							triggerLabel: "More call controls",
							triggerTitle: "More",
							triggerTestId: "call-dock-more",
							triggerClassName: "h-8 w-8 px-0 py-0",
							align: "end",
							sections: [{ items: ge }],
							"data-testid": "call-dock-more-menu"
						}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(r, {
							"aria-label": "Call settings",
							title: "Call settings",
							variant: "outline",
							onClick: M,
							icon: /* @__PURE__ */ G(f, { size: 18 }),
							"data-testid": "call-dock-settings"
						}), /* @__PURE__ */ G(r, {
							"aria-label": "Pop out the call",
							title: "Pop out the call",
							variant: "outline",
							onClick: P,
							disabled: X,
							icon: /* @__PURE__ */ G(h, { size: 16 }),
							"data-testid": "call-dock-popout"
						})] }), /* @__PURE__ */ K(t, {
							ref: ce,
							variant: "danger-solid",
							size: "sm",
							onClick: fe,
							"aria-haspopup": I && !Y ? "dialog" : void 0,
							title: Y ? "Cancel the call" : void 0,
							"data-testid": "call-dock-leave",
							className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5",
							children: [/* @__PURE__ */ G(_, { size: 16 }), Y ? "Cancel" : "Leave"]
						})]
					}),
					/* @__PURE__ */ K(T, {
						trigger: ce,
						open: le,
						onClose: () => ue(!1),
						placement: "bottom-end",
						"aria-label": "Leave the call",
						"data-testid": "call-dock-leave-confirm",
						className: "w-64 p-3",
						children: [/* @__PURE__ */ G("p", {
							className: "m-0 mb-3 text-sm text-text-primary",
							children: "Leave the call? Others stay on."
						}), /* @__PURE__ */ K("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ G(t, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									ue(!1), F();
								},
								"data-testid": "call-dock-leave-confirm-leave",
								children: "Leave"
							}), /* @__PURE__ */ G(t, {
								variant: "danger-solid",
								size: "sm",
								onClick: () => {
									ue(!1), L?.();
								},
								"data-testid": "call-dock-end-for-everyone",
								children: "End for everyone"
							})]
						})]
					})
				]
			})]
		}), _e]
	});
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function tt({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ K("button", {
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ G("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function nt({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ K("section", {
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ G("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ G("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function rt({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: b, "data-testid": x }) {
	return p === "grid" ? /* @__PURE__ */ G(dt, {
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
	}) : /* @__PURE__ */ K("div", {
		"data-testid": x,
		className: e("flex flex-col text-white", f ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", b),
		children: [
			/* @__PURE__ */ G(nt, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ G(tt, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ K(nt, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ G(tt, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ G(tt, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ G(tt, {
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
			/* @__PURE__ */ K(nt, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ G(tt, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ G(tt, {
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
var it = 5242880;
function at(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function ot({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: at(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ G(Be, {
			stream: e,
			muted: !0,
			className: "h-full w-full scale-x-[-1] object-cover"
		}) : t ? /* @__PURE__ */ G("img", {
			src: t,
			alt: "",
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ G("span", { className: "block h-full w-full bg-gradient-to-br from-white/15 to-black/30" })
	});
}
function st({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
	return /* @__PURE__ */ K("button", {
		type: "button",
		onClick: i,
		disabled: r,
		"aria-pressed": s ? void 0 : n,
		title: t,
		"data-testid": a,
		"data-active": n ? "true" : "false",
		className: e("group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]", "disabled:cursor-not-allowed disabled:opacity-50"),
		children: [/* @__PURE__ */ G("span", {
			className: e("relative flex aspect-[101/50] w-full items-center justify-center overflow-hidden rounded-md", s ? "border border-dashed border-border-emphasis bg-surface text-text-tertiary" : "bg-video-tile", n ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : !s && "group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis"),
			children: o
		}), /* @__PURE__ */ G("span", {
			className: e("truncate text-xs", s ? "text-primary" : "text-text-secondary"),
			children: t
		})]
	});
}
function ct(e) {
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
function lt({ children: e, action: t }) {
	return /* @__PURE__ */ K("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ G("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var ut = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function dt({ filters: n, activeFilterId: r, onSelectFilter: i, backgrounds: a, backgroundMode: o, activeBackgroundUrl: s, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p, columns: m, thumbnailStream: h, thumbnailSrc: _, filterLimit: v, onSelectCustomBackground: y, backgroundsUnsupported: b, className: x, "data-testid": S }) {
	let [C, T] = U(!1), [E, D] = U(!1), O = H(null), k = ut[m] ?? "grid-cols-3", A = !C && n.length > v + 1, j = A ? n.slice(0, v) : n, M = !E && u.length > 3, N = M ? u.slice(0, 2) : u, F = {
		stream: h,
		..._ ? { src: _ } : {}
	};
	return /* @__PURE__ */ K("div", {
		"data-testid": S,
		"data-layout": "grid",
		className: e("flex flex-col gap-3 text-text-primary", x),
		children: [
			/* @__PURE__ */ K("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Filter",
				children: [/* @__PURE__ */ G(lt, {
					action: /* @__PURE__ */ G(t, {
						variant: "link",
						onClick: () => i("none"),
						disabled: p,
						"data-testid": "effects-filter-reset",
						className: "text-sm",
						children: "Reset"
					}),
					children: "Filter"
				}), /* @__PURE__ */ K("div", {
					className: e("grid gap-x-3 gap-y-2", k),
					children: [j.map((e) => /* @__PURE__ */ G(st, {
						label: e.label,
						active: e.id === r,
						disabled: p,
						onClick: () => i(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ G(ot, {
							...F,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), A && /* @__PURE__ */ K(st, {
						label: "More...",
						active: !1,
						disabled: p,
						onClick: () => T(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ G(ot, {
							...F,
							filter: "blur(3px)"
						}), /* @__PURE__ */ G("span", {
							className: "relative text-white",
							children: /* @__PURE__ */ G(g, { size: 22 })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ K("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Background",
				children: [/* @__PURE__ */ G(lt, { children: "Background" }), b ? /* @__PURE__ */ G(P, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ K("div", {
					className: e("grid gap-x-3 gap-y-2", k),
					children: [
						/* @__PURE__ */ G(st, {
							label: "None",
							active: o === "none",
							disabled: p,
							onClick: () => l("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ G(ot, { ...F })
						}),
						/* @__PURE__ */ G(st, {
							label: "Blur",
							active: o === "blur",
							disabled: p,
							onClick: () => l("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ G(ot, {
								...F,
								filter: "blur(4px)"
							})
						}),
						a.map((e) => /* @__PURE__ */ G(st, {
							label: e.label,
							active: o === "image" && s === e.url,
							disabled: p,
							onClick: () => l("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ G(ot, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						y && /* @__PURE__ */ K(st, {
							label: "+ Custom",
							active: !1,
							disabled: p,
							dashed: !0,
							onClick: () => O.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ G(c, { size: 22 }), /* @__PURE__ */ G("input", {
								ref: O,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= it && y(t);
								}
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ K("section", {
				className: "flex flex-col gap-2",
				"aria-label": "Face effects",
				children: [
					/* @__PURE__ */ G(lt, { children: "Face effects" }),
					/* @__PURE__ */ G(w, {
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
					u.length > 0 && /* @__PURE__ */ K("div", {
						className: e("-mt-0.5 grid gap-2", k),
						children: [N.map((t) => {
							let n = t.id === d, { glyph: r, text: i } = ct(t.label);
							return /* @__PURE__ */ K("button", {
								type: "button",
								onClick: () => f(n ? null : t.id),
								disabled: p,
								"aria-pressed": n,
								"data-testid": `effects-face-${t.id}`,
								className: e("flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", n && "bg-primary-bg text-primary"),
								children: [/* @__PURE__ */ G("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary",
									children: t.icon ?? r ?? Array.from(i)[0]
								}), /* @__PURE__ */ G("span", {
									className: "truncate",
									children: t.icon ? t.label : i
								})]
							}, t.id);
						}), M && /* @__PURE__ */ K("button", {
							type: "button",
							onClick: () => D(!0),
							disabled: p,
							"data-testid": "effects-face-more",
							className: "flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover",
							children: [/* @__PURE__ */ G("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-text-primary",
								children: /* @__PURE__ */ G(g, { size: 20 })
							}), /* @__PURE__ */ G("span", { children: "More" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function ft(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function pt({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: b = "chrome", showFooter: x = !0, hint: S = "Changes appear in the call after Apply.", thumbnailSrc: C, onSelectCustomBackground: w, backgroundsUnsupported: T = !1, className: E, "data-testid": D = "media-effects-preview-panel" }) {
	let O = (e) => ft(n, e), k = n && i && !_;
	return b === "surface" ? /* @__PURE__ */ K("section", {
		"data-testid": D,
		"data-variant": "surface",
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-text-primary", E),
		children: [
			/* @__PURE__ */ K("div", {
				"data-testid": "effects-preview",
				className: "relative aspect-[338/161] w-full shrink-0 overflow-hidden rounded-lg bg-video-stage",
				children: [r ? /* @__PURE__ */ G("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ G(Be, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ G("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70",
					children: n ? "Turn the camera on to preview effects" : "Preview is not running"
				}), /* @__PURE__ */ G("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
					children: "Preview · Only you"
				})]
			}),
			S != null && /* @__PURE__ */ G("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 text-xs text-text-secondary",
				children: S
			}),
			/* @__PURE__ */ G(rt, {
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
			x && /* @__PURE__ */ K("footer", {
				className: "mt-2 flex items-center justify-end gap-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ G("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-sm text-text-tertiary",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ G(t, {
						variant: "ghost",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						children: "Cancel"
					}),
					/* @__PURE__ */ G(t, {
						onClick: a,
						disabled: !k,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ K("section", {
		"data-testid": D,
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-white", E),
		children: [
			/* @__PURE__ */ K("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [r ? /* @__PURE__ */ G("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ G(Be, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ K("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ G("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), n ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ G("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ G("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: n ? `This preview is private. Nobody else in the call can see these effects until you choose ${y}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ G(rt, {
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
			x && /* @__PURE__ */ K("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ G("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ G("button", {
						type: "button",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ G("button", {
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
var mt = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function ht(e) {
	return e ? mt[e.kind] : null;
}
function gt(e) {
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
var _t = 3e3, vt = 1e3, yt = 1500, bt = 8e3, xt = .5;
function St(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = bt } = n, [a, o] = U(null), s = ht(a), [c, l] = U(!1), [u, d] = U(!1), [f, p] = U(!1), [m, h] = U(null), [g, _] = U(null), [v, y] = U(0), b = H(null), x = H(!1), S = H(0), C = H(n.onError);
	z(() => {
		C.current = n.onError;
	}, [n.onError]);
	let w = te(() => {
		o(null), d(!1), p(!1), y((e) => e + 1);
	}, []), T = te(() => {
		let t = e.current;
		if (t) try {
			let e = b.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return z(() => {
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
						let e = gt(n);
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
	]), z(() => {
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
			if (!(e - S.current < _t)) {
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
	]), z(() => {
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
				return t !== null && Math.abs(t - n) < xt ? t : n;
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
			s >= i ? p(!0) : s >= yt && d(!0);
		}, vt);
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
var Ct = 80, wt = .6;
function Tt(e) {
	let [t, n] = U(null), r = H(0);
	return z(() => {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * wt);
			r.current = c, n(c);
		}, Ct);
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
var Et = [
	.55,
	.8,
	1,
	.8,
	.55
], Dt = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], Ot = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], kt = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function At(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return Dt[Math.min(Dt.length - 1, Math.round(n * (Dt.length - 1)))];
}
function jt({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: s, "data-testid": c = "stream-audio-only" }) {
	let l = typeof r == "number" && i, u = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ K("div", {
		"data-testid": c,
		"data-measured": String(l),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", s),
		children: [
			t ? /* @__PURE__ */ G(j, {
				name: t,
				src: n,
				size: 64
			}) : /* @__PURE__ */ G("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ K("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ G("span", {
					className: "text-sm font-medium text-white",
					children: t ?? "Audio only"
				}), /* @__PURE__ */ G("span", {
					"data-testid": `${c}-hint`,
					className: "text-xs text-white/60",
					children: u
				})]
			}),
			/* @__PURE__ */ G("div", {
				"data-testid": `${c}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: Et.map((t, n) => /* @__PURE__ */ G("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !l && i && ["uic-audio-bar", kt[n]], l ? At(r, t) : Ot[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function Mt({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function Nt(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function Pt(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function Ft(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function It({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = V(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: Ft(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ G("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ G(F, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var Lt = 1e4;
function Rt(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !ze(e);
}
var zt = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function Bt({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = Lt, chatMessages: m, chatVisibleCount: h, chatRotateMs: g, muted: _ = !0, allowFullscreen: v = !0, showLatency: y = !0, controls: b, placeholder: x, className: S, "data-testid": C = "stream-stage" }) {
	let [w, T] = U(_);
	z(() => {
		T(_);
	}, [_]);
	let E = H(null), D = H(null), O = St(D, t ? null : n, {
		live: !0,
		onError: r
	}), k = H(!1);
	(t || n) && (k.current = !0);
	let A = Re(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), j = V(() => Rt(t), [t, A]), M = V(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, A]), N = !!t && M !== !1 || !!n && !O.loading, [P, F] = U(!1);
	z(() => {
		if (F(!1), N || O.error) return;
		let e = setTimeout(() => F(!0), p);
		return () => clearTimeout(e);
	}, [
		N,
		O.error,
		p
	]);
	let I = Mt({
		hasStream: !!t,
		streamHasTracks: M,
		hasPlaylist: !!n,
		hadSource: k.current,
		graceExpired: P,
		hls: O
	}), L = O.failure ?? null, ee = H(!1);
	I === "playing" && (ee.current = !0);
	let R = I === "error" && L?.kind === "no-broadcast" ? ee.current ? "ended" : "not-started" : I, ne = R === "ended" ? I === "ended" ? "withdrawn" : "stopped" : null, B = s && Nt(R), W = t ? j : O.audioOnly === !0, q = (c ?? W) && (R === "playing" || R === "buffering" || R === "stalled"), re = Tt(q && t ? t : null), [ie, ae] = U(!1);
	z(() => {
		if (typeof document > "u") return;
		let e = () => ae(document.fullscreenElement === E.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let oe = te(() => {
		let e = E.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), se = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), ce = O.retry, le = te(() => {
		ce?.(), i?.();
	}, [ce, i]), ue = !!(t || n), de = !!n && !t, J = ue && R !== "error" && R !== "not-started" && R !== "ended", Y = J || !!b, X = !L || L.retryable, Z = (de || !!i) && X, fe = L?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ K("div", {
		ref: E,
		"data-testid": C,
		"data-live": String(B),
		"data-phase": R,
		"data-audio-only": String(q),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": L?.kind,
		"data-error-detail": L?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ G(Be, {
				stream: t,
				muted: w,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ G("video", {
				ref: D,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: w,
				className: "h-full w-full object-contain"
			}) : null,
			q && /* @__PURE__ */ G(jt, {
				"data-testid": `${C}-audio-only`,
				name: l,
				avatarUrl: u,
				level: re,
				active: R !== "stalled" && !w,
				muted: w
			}),
			R === "idle" && /* @__PURE__ */ G(Vt, {
				testId: `${C}-placeholder`,
				children: x ?? "Waiting for the stream to start…"
			}),
			R === "ended" && /* @__PURE__ */ K(Vt, {
				testId: `${C}-ended`,
				"data-ended-reason": ne,
				children: [
					/* @__PURE__ */ G("span", { children: f ?? (ne === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					ne === "stopped" && !f && /* @__PURE__ */ G("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					ne === "stopped" ? Z && /* @__PURE__ */ G(Ht, {
						testId: `${C}-retry`,
						label: "Try again",
						onClick: le
					}) : i && /* @__PURE__ */ G(Ht, {
						testId: `${C}-retry`,
						label: "Check again",
						onClick: le
					})
				]
			}),
			R === "not-started" && /* @__PURE__ */ K(Vt, {
				testId: `${C}-not-started`,
				children: [/* @__PURE__ */ G("span", { children: d ?? "Nothing is being broadcast right now." }), Z && /* @__PURE__ */ G(Ht, {
					testId: `${C}-retry`,
					label: fe,
					onClick: le
				})]
			}),
			R === "connecting" && /* @__PURE__ */ G(Vt, {
				testId: `${C}-connecting`,
				children: "Connecting…"
			}),
			R === "buffering" && /* @__PURE__ */ G("div", {
				"data-testid": `${C}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			R === "stalled" && /* @__PURE__ */ K(Vt, {
				testId: `${C}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ G("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ G("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					Z && /* @__PURE__ */ G(Ht, {
						testId: `${C}-retry`,
						onClick: le
					})
				]
			}),
			R === "error" && /* @__PURE__ */ K(Vt, {
				testId: `${C}-error`,
				dim: !0,
				children: [/* @__PURE__ */ G("span", { children: O.error ?? "This stream could not be played." }), Z && /* @__PURE__ */ G(Ht, {
					testId: `${C}-retry`,
					label: fe,
					onClick: le
				})]
			}),
			(a || B || be(o)) && /* @__PURE__ */ K("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					B && /* @__PURE__ */ G("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ G("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					be(o) && /* @__PURE__ */ G(xe, { count: o })
				]
			}),
			m && m.length > 0 && /* @__PURE__ */ G(It, {
				messages: m,
				visibleCount: h,
				rotateMs: g,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			Y && /* @__PURE__ */ K("div", {
				"data-testid": `${C}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					J && de && y && (R === "playing" || R === "buffering") && /* @__PURE__ */ G("button", {
						type: "button",
						"data-testid": `${C}-latency`,
						onClick: () => O.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(zt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof O.latencySec == "number" && Number.isFinite(O.latencySec) ? `${Math.max(1, Math.round(O.latencySec))}s behind` : "Behind live"
					}),
					J && B && /* @__PURE__ */ K("button", {
						type: "button",
						"data-testid": `${C}-mute-toggle`,
						"aria-label": w ? "Unmute" : "Mute",
						"aria-pressed": w,
						onClick: () => T((e) => !e),
						className: e(zt, w ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ G("span", {
							"aria-hidden": !0,
							children: w ? "🔇" : "🔊"
						}), w ? "Unmute" : "Mute"]
					}),
					J && v && se && /* @__PURE__ */ K("button", {
						type: "button",
						"data-testid": `${C}-fullscreen`,
						"aria-label": ie ? "Exit full screen" : "Full screen",
						"aria-pressed": ie,
						onClick: oe,
						className: e(zt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ G("span", {
							"aria-hidden": !0,
							children: ie ? "↙" : "↗"
						}), ie ? "Exit" : "Full screen"]
					}),
					b
				]
			})
		]
	});
}
function Vt({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ G("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function Ht({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ G("button", {
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(zt, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function Ut({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
	let s = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0, c = i ? 0 : Math.round(s * n), l = Math.round(s * 100);
	return /* @__PURE__ */ G("div", {
		role: "meter",
		"aria-label": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": i ? 0 : l,
		"data-testid": o,
		"data-lit": c,
		className: e("inline-flex items-center gap-[3px]", a),
		children: Array.from({ length: n }, (t, n) => /* @__PURE__ */ G("span", {
			"aria-hidden": "true",
			className: e("h-3.5 w-1.5 rounded-[2px] transition-colors duration-75", n < c ? "bg-success" : "bg-border")
		}, n))
	});
}
//#endregion
//#region src/components/video/VolumeSlider.tsx
function Wt({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: o = !1, muted: s = !1, disabled: c = !1, className: u, "data-testid": d = "settings-volume", testButtonTestId: f = "settings-test-sound" }) {
	let p = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ K("div", {
		className: e("flex items-center gap-3", u),
		children: [
			/* @__PURE__ */ G(l, {
				size: 20,
				className: e("shrink-0", s ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ G(O, {
				value: p,
				onChange: (e) => r(e / 100),
				min: 0,
				max: 100,
				step: 1,
				readout: !1,
				disabled: c,
				"aria-label": "Speaker volume",
				"data-testid": d,
				className: "min-w-0 flex-1"
			}),
			i && /* @__PURE__ */ G(t, {
				variant: "ghost",
				size: "md",
				onClick: i,
				disabled: c || o,
				"data-testid": f,
				className: "shrink-0",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/video/AudioVideoSettingsForm.tsx
var Gt = [
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
], Kt = [
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
function qt(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function Jt({ children: t, divided: n = !0, className: r }) {
	return /* @__PURE__ */ G("section", {
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border", r),
		children: t
	});
}
function Yt({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ G("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function Xt({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ K("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ G(L, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function Zt({ value: n, onChange: r, devices: i, permission: a, micLevel: o, previewStream: s, cameraOn: c, speakerSelectionSupported: l, onTestMic: u, onTestSound: d, testMicState: f = "idle", selfName: p = "You", selfAvatarUrl: m, layout: h = "stack", className: g, "data-testid": _ = "audio-video-settings-form" }) {
	let v = (e) => r({
		...n,
		...e
	}), y = a.microphone === "denied", b = a.camera === "denied", S = "w-full h-9 text-sm", C = f === "recording" ? "Recording…" : f === "playing" ? "Playing…" : "Test mic", T;
	return T = b ? null : c ? s ? /* @__PURE__ */ G(Be, {
		stream: s,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ G("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ G(E, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ K("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ G(j, {
			name: p,
			size: 48,
			...m ? { src: m } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), /* @__PURE__ */ K("div", {
		className: e(h === "prejoin" ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6" : "flex flex-col", g),
		"data-testid": _,
		"data-layout": h,
		children: [
			/* @__PURE__ */ K(Jt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-1 py-0" : void 0,
				children: [
					/* @__PURE__ */ G(Yt, {
						htmlFor: `${_}-mic`,
						children: "Microphone"
					}),
					y ? /* @__PURE__ */ G(P, {
						tone: "error",
						"data-testid": "settings-mic-denied",
						children: "Microphone blocked — allow it in the browser's site settings"
					}) : /* @__PURE__ */ G(w, {
						chevron: "custom",
						id: `${_}-mic`,
						value: n.microphoneId ?? i.microphones[0]?.deviceId ?? "",
						onChange: (e) => v({ microphoneId: e.target.value }),
						options: qt(i.microphones, "No microphone found"),
						disabled: i.microphones.length === 0,
						className: S,
						"data-testid": "settings-mic-select"
					}),
					/* @__PURE__ */ K("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ G("span", {
								className: "w-24 shrink-0 text-sm text-text-primary",
								children: "Input level"
							}),
							/* @__PURE__ */ G(Ut, {
								level: o,
								disabled: y,
								"data-testid": "settings-mic-level"
							}),
							/* @__PURE__ */ G(t, {
								variant: "ghost",
								onClick: () => void u(),
								disabled: y || f !== "idle",
								"data-testid": "settings-test-mic",
								className: "ml-auto shrink-0",
								children: C
							})
						]
					}),
					/* @__PURE__ */ K("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ G("span", {
							id: `${_}-noise`,
							className: "text-sm text-text-primary",
							children: "Noise reduction"
						}), /* @__PURE__ */ G(D, {
							checked: n.noiseSuppression,
							onChange: (e) => v({ noiseSuppression: e }),
							disabled: y,
							"aria-labelledby": `${_}-noise`,
							"data-testid": "settings-noise"
						})]
					})
				]
			}),
			/* @__PURE__ */ K(Jt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-2 py-0" : void 0,
				children: [
					l && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(Yt, {
						htmlFor: `${_}-speaker`,
						children: "Speakers"
					}), /* @__PURE__ */ G(w, {
						chevron: "custom",
						id: `${_}-speaker`,
						value: n.speakerId ?? i.speakers[0]?.deviceId ?? "",
						onChange: (e) => v({ speakerId: e.target.value }),
						options: qt(i.speakers, "No speakers found"),
						disabled: i.speakers.length === 0,
						className: S,
						"data-testid": "settings-speaker-select"
					})] }),
					!l && /* @__PURE__ */ G(Yt, { children: "Volume" }),
					/* @__PURE__ */ G(Wt, {
						value: n.volume,
						onChange: (e) => v({ volume: e }),
						onTest: () => void d()
					})
				]
			}),
			/* @__PURE__ */ K(Jt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-1 md:row-start-1 md:row-span-3 py-0" : void 0,
				children: [
					/* @__PURE__ */ G(Yt, {
						htmlFor: `${_}-camera`,
						children: "Camera"
					}),
					b ? /* @__PURE__ */ G(P, {
						tone: "error",
						"data-testid": "settings-camera-denied",
						children: "Camera blocked — allow it in the browser's site settings"
					}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(w, {
						chevron: "custom",
						id: `${_}-camera`,
						value: n.cameraId ?? i.cameras[0]?.deviceId ?? "",
						onChange: (e) => v({ cameraId: e.target.value }),
						options: qt(i.cameras, "No camera found"),
						disabled: i.cameras.length === 0,
						className: S,
						"data-testid": "settings-camera-select"
					}), /* @__PURE__ */ K("div", {
						className: h === "prejoin" ? "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-video-stage" : "relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage",
						"data-testid": "settings-preview",
						"data-mirrored": n.mirrorPreview ? "true" : "false",
						children: [T, /* @__PURE__ */ G("span", {
							className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
							children: "Your preview"
						})]
					})] }),
					/* @__PURE__ */ G(Xt, {
						checked: n.mirrorPreview,
						onChange: (e) => v({ mirrorPreview: e }),
						testId: "settings-mirror",
						children: "Mirror my preview"
					}),
					/* @__PURE__ */ K("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ G("label", {
							htmlFor: `${_}-quality`,
							className: "text-sm text-text-primary",
							children: "Quality"
						}), /* @__PURE__ */ G(w, {
							chevron: "custom",
							id: `${_}-quality`,
							value: n.quality,
							onChange: (e) => v({ quality: e.target.value }),
							options: Gt,
							className: "h-9 w-full text-sm",
							wrapperClassName: "w-32 shrink-0",
							"data-testid": "settings-quality"
						})]
					})
				]
			}),
			/* @__PURE__ */ G(Jt, {
				divided: h !== "prejoin",
				className: h === "prejoin" ? "md:col-start-2 md:row-start-3 py-0" : "py-1.5",
				children: /* @__PURE__ */ K(x, {
					summary: "Advanced",
					variant: "plain",
					density: "compact",
					"data-testid": "settings-advanced",
					summaryClassName: "text-[15px] font-medium text-text-primary",
					bodyClassName: "flex flex-col gap-3 pt-3",
					children: [
						/* @__PURE__ */ K("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ G("span", {
								id: `${_}-echo`,
								className: "text-sm text-text-primary",
								children: "Echo cancellation"
							}), /* @__PURE__ */ G(D, {
								checked: n.echoCancellation,
								onChange: (e) => v({ echoCancellation: e }),
								"aria-labelledby": `${_}-echo`,
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ K("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ G("span", {
								id: `${_}-agc`,
								className: "text-sm text-text-primary",
								children: "Auto gain control"
							}), /* @__PURE__ */ G(D, {
								checked: n.autoGainControl,
								onChange: (e) => v({ autoGainControl: e }),
								"aria-labelledby": `${_}-agc`,
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ K("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ G("label", {
								htmlFor: `${_}-fps`,
								className: "text-sm text-text-primary",
								children: "Frame rate"
							}), /* @__PURE__ */ G(w, {
								chevron: "custom",
								id: `${_}-fps`,
								value: String(n.frameRate),
								onChange: (e) => {
									let t = e.target.value;
									v({ frameRate: t === "auto" ? "auto" : Number(t) });
								},
								options: Kt,
								className: "h-9 w-full text-sm",
								wrapperClassName: "w-32 shrink-0",
								"data-testid": "settings-frame-rate"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ G(Jt, {
				divided: !1,
				className: h === "prejoin" ? "hidden" : "pt-2.5 pb-0",
				children: /* @__PURE__ */ G(Xt, {
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
function Qt(e, t = 0) {
	let n = e ? Date.parse(e) : NaN, [r, i] = U(() => Date.now());
	return z(() => {
		if (!Number.isFinite(n)) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [n]), Number.isFinite(n) ? Math.max(0, n - (r + t)) : null;
}
function $t({ roomName: n, endsAt: i, clockOffsetMs: o = 0, closing: s = !1, announcement: c, onDismissAnnouncement: l, onReturnToMain: u, className: d, "data-testid": f = "breakout-banner" }) {
	let p = Qt(i, o), m = p !== null && (s || p <= 6e4);
	return /* @__PURE__ */ K("div", {
		role: "region",
		"aria-label": `Breakout room: ${n}`,
		"data-testid": f,
		className: e("flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg", d),
		children: [/* @__PURE__ */ K("div", {
			className: "flex flex-wrap items-center gap-x-3 gap-y-1",
			children: [
				/* @__PURE__ */ G(ce, {
					size: 18,
					className: "shrink-0"
				}),
				/* @__PURE__ */ K(b, {
					size: "sm",
					weight: "semibold",
					tone: "inherit",
					className: "min-w-0 truncate",
					children: ["You're in ", n]
				}),
				p !== null && /* @__PURE__ */ G(b, {
					size: "sm",
					tone: "inherit",
					tabular: !0,
					weight: m ? "semibold" : void 0,
					"data-testid": `${f}-countdown`,
					"data-urgent": m ? "true" : void 0,
					"data-closing": s ? "true" : void 0,
					className: e(m && "text-danger"),
					children: s ? `Room closes in ${$(p)}` : `${$(p)} left`
				}),
				/* @__PURE__ */ G("span", {
					role: "status",
					"aria-live": "polite",
					className: "sr-only",
					"data-testid": `${f}-closing-status`,
					children: s ? "The organizer is closing the breakout rooms. You will return to the main meeting shortly." : ""
				}),
				/* @__PURE__ */ G("span", { className: "flex-1" }),
				u && /* @__PURE__ */ G(t, {
					variant: "secondary",
					size: "sm",
					onClick: u,
					"data-testid": `${f}-return`,
					children: "Return to main meeting"
				})
			]
		}), c && /* @__PURE__ */ K("div", {
			className: "flex items-start gap-2",
			"data-testid": `${f}-announcement`,
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ K(b, {
				size: "sm",
				tone: "inherit",
				className: "block min-w-0 flex-1",
				children: [
					/* @__PURE__ */ K("strong", { children: [c.fromDisplayName, ":"] }),
					" ",
					c.message
				]
			}), l && /* @__PURE__ */ G(r, {
				"aria-label": "Dismiss announcement",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ G(a, {}),
				onClick: l,
				"data-testid": `${f}-announcement-dismiss`
			})]
		})]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomsPanel.tsx
var en = [
	5,
	10,
	15,
	30,
	60
], tn = 50, nn = 80;
function rn({ room: e, mine: n, canJoin: i, canReturn: a, isOrganizer: s, rooms: c, onJoin: l, onReturnToMain: u, onAssign: d, onToggleRoom: f, onRenameRoom: p }) {
	let [m, h] = U(!1), g = ne(), _ = e.state === "open";
	return /* @__PURE__ */ K("li", {
		className: "border-b border-border-subtle last:border-b-0",
		"data-testid": "breakout-room",
		"data-room-id": e.id,
		"data-room-state": e.state,
		"data-mine": n ? "true" : void 0,
		children: [/* @__PURE__ */ K("div", {
			className: "flex min-h-9 items-center gap-1.5 px-2 py-0.5",
			children: [
				/* @__PURE__ */ G(r, {
					"aria-label": m ? `Hide people in ${e.name}` : `Show people in ${e.name}`,
					"aria-expanded": m,
					"aria-controls": g,
					variant: "ghost",
					size: "sm",
					onClick: () => h((e) => !e),
					"data-testid": "breakout-room-expand",
					children: /* @__PURE__ */ G(o, {
						size: 14,
						dir: m ? "down" : "right"
					})
				}),
				/* @__PURE__ */ K("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [s && p ? /* @__PURE__ */ G(ee, {
						value: e.name,
						onCommit: (t) => p(e.id, t),
						label: "Room name",
						maxLength: nn,
						required: !0,
						className: "-ml-1 min-w-0",
						"data-testid": "breakout-room-name"
					}) : /* @__PURE__ */ G(b, {
						size: "sm",
						tone: "primary",
						className: "min-w-0 truncate",
						title: e.name,
						children: e.name
					}), /* @__PURE__ */ K(b, {
						size: "xs",
						tone: "secondary",
						className: "shrink-0 items-center gap-1",
						"data-testid": "breakout-room-status",
						children: [
							/* @__PURE__ */ G(M, {
								size: "sm",
								color: _ ? "var(--color-success)" : void 0
							}),
							_ ? "Open" : "Closed",
							e.members.length > 0 && /* @__PURE__ */ K("span", { children: ["· ", e.members.length] })
						]
					})]
				}),
				s && f && /* @__PURE__ */ G(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => f(e.id, _ ? "closed" : "open"),
					"data-testid": "breakout-room-toggle",
					children: _ ? "Close" : "Open"
				}),
				n && a && u && /* @__PURE__ */ G(t, {
					variant: "secondary",
					size: "sm",
					onClick: u,
					"data-testid": "breakout-room-leave",
					children: "Leave"
				}),
				n && !a && /* @__PURE__ */ G(b, {
					size: "xs",
					tone: "secondary",
					className: "shrink-0",
					"data-testid": "breakout-room-here",
					children: "You're here"
				}),
				!n && i && l && /* @__PURE__ */ G(t, {
					variant: "secondary",
					size: "sm",
					onClick: () => l(e.id),
					"data-testid": "breakout-room-join",
					children: "Join"
				})
			]
		}), m && /* @__PURE__ */ K("ul", {
			id: g,
			className: "flex flex-col gap-0.5 pb-2 pl-10 pr-2",
			"data-testid": "breakout-room-members",
			children: [e.members.length === 0 && /* @__PURE__ */ G("li", { children: /* @__PURE__ */ G(b, {
				size: "xs",
				tone: "tertiary",
				children: "Nobody yet"
			}) }), e.members.map((t) => /* @__PURE__ */ K("li", {
				className: "flex items-center gap-2",
				"data-testid": "breakout-member",
				"data-user-id": t.id,
				children: [
					/* @__PURE__ */ G(j, {
						name: t.name,
						src: t.avatarUrl,
						size: 20
					}),
					/* @__PURE__ */ G(b, {
						size: "sm",
						className: "min-w-0 flex-1 truncate",
						children: t.name
					}),
					/* @__PURE__ */ G(X, { raised: t.handRaised }),
					s && d && /* @__PURE__ */ G(an, {
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
function an({ person: e, rooms: t, current: n, onAssign: r }) {
	return /* @__PURE__ */ G(w, {
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
function on({ onCreateRooms: e }) {
	let [n, r] = U(3), [i, a] = U("assigned");
	return /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-2 border-b border-border px-3 py-2.5",
		"data-testid": "breakout-create",
		children: [
			/* @__PURE__ */ G(b, {
				size: "sm",
				tone: "secondary",
				className: "block",
				children: "Split the meeting into smaller rooms."
			}),
			/* @__PURE__ */ K("label", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ G(b, {
					size: "sm",
					children: "Rooms"
				}), /* @__PURE__ */ G(I, {
					value: n,
					onChange: r,
					min: 1,
					max: 50,
					size: "sm",
					"aria-label": "Number of rooms",
					"data-testid": "breakout-create-count"
				})]
			}),
			/* @__PURE__ */ G(N, {
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
			/* @__PURE__ */ G(t, {
				variant: "primary",
				size: "sm",
				onClick: () => e(Math.max(1, Math.min(50, Math.round(n || 1))), i),
				"data-testid": "breakout-create-submit",
				children: "Create rooms"
			})
		]
	});
}
function sn(n) {
	let { phase: r, mode: i, rooms: a, onOpenRooms: o, onCloseRooms: s, onAutoAssign: c, onSetTimer: l, onBroadcast: u, announceIn: d = "chat", onEnd: f, onDeleteRooms: p, onAddRoom: m, left: h, timerMinutes: g = en, maxRooms: _ = tn, closing: v = !1, folded: y } = n, [x, S] = U(""), C = a.some((e) => e.state === "open"), T = () => {
		let e = x.trim();
		!e || !u || (u(e), S(""));
	};
	return /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-2 border-b border-border px-3 py-2",
		"data-testid": "breakout-controls",
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					v && C ? /* @__PURE__ */ K(W, { children: [s && /* @__PURE__ */ G(t, {
						variant: "danger",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-close-now",
						children: "Close now"
					}), o && /* @__PURE__ */ G(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => o(),
						"data-testid": "breakout-keep-open",
						children: "Keep rooms open"
					})] }) : C ? s && /* @__PURE__ */ G(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-close-all",
						children: "Close rooms"
					}) : o && /* @__PURE__ */ G(t, {
						variant: "primary",
						size: "sm",
						onClick: () => o(),
						"data-testid": "breakout-open-all",
						children: "Open rooms"
					}),
					m && /* @__PURE__ */ G(t, {
						variant: "secondary",
						size: "sm",
						onClick: m,
						disabled: a.length >= _,
						title: a.length >= _ ? `At most ${_} rooms` : void 0,
						"data-testid": "breakout-add-room",
						children: "Add room"
					}),
					i === "assigned" && c && /* @__PURE__ */ G(t, {
						variant: "secondary",
						size: "sm",
						onClick: c,
						"data-testid": "breakout-auto-assign",
						children: "Assign automatically"
					}),
					f && r === "open" && !v && /* @__PURE__ */ G(t, {
						variant: "ghost",
						size: "sm",
						onClick: f,
						className: "text-danger",
						"data-testid": "breakout-end",
						children: "End breakout rooms"
					}),
					p && r === "draft" && !y && /* @__PURE__ */ G(t, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						className: "text-danger",
						"data-testid": "breakout-delete",
						children: "Delete rooms"
					})
				]
			}),
			l && /* @__PURE__ */ K("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ G(b, {
					size: "sm",
					children: "Timer"
				}), /* @__PURE__ */ K("div", {
					className: "flex items-center gap-2",
					children: [h !== null && /* @__PURE__ */ G(b, {
						size: "sm",
						tone: v ? "inherit" : "secondary",
						tabular: !0,
						weight: v ? "semibold" : void 0,
						className: e(v && "text-danger"),
						"data-testid": "breakout-timer-left",
						children: v ? `Closing in ${$(h)}` : `${$(h)} left`
					}), /* @__PURE__ */ G(w, {
						size: "sm",
						"aria-label": "Breakout timer",
						disabled: r !== "open",
						value: h === null ? "" : "running",
						onChange: (e) => {
							let t = e.target.value;
							t !== "running" && l(t ? Number(t) * 6e4 : null);
						},
						options: [
							{
								value: "",
								label: "No timer"
							},
							...h === null ? [] : [{
								value: "running",
								label: "Running"
							}],
							...g.map((e) => ({
								value: String(e),
								label: `${e} min`
							}))
						],
						wrapperClassName: "w-32",
						"data-testid": "breakout-timer"
					})]
				})]
			}),
			u && r === "open" && d === "chat" && /* @__PURE__ */ G(b, {
				as: "p",
				size: "xs",
				tone: "tertiary",
				"data-testid": "breakout-announce-hint",
				children: "Send announcements to every room from the meeting chat."
			}),
			u && r === "open" && d === "pane" && /* @__PURE__ */ K("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ G(A, {
					"aria-label": "Announcement to every room",
					placeholder: "Send an announcement to every room",
					value: x,
					onChange: (e) => S(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), T());
					},
					minRows: 1,
					maxRows: 4,
					autoResize: !0,
					maxLength: 500,
					className: "flex-1",
					"data-testid": "breakout-broadcast-input"
				}), /* @__PURE__ */ G(t, {
					variant: "secondary",
					size: "sm",
					onClick: T,
					disabled: !x.trim(),
					"data-testid": "breakout-broadcast-send",
					children: "Send"
				})]
			})
		]
	});
}
function cn(n) {
	let { rooms: i, phase: o, mode: s, myRoomId: c = null, isOrganizer: l = !1, unassigned: u = [], endsAt: d = null, allowReturnToMain: f = !0, closing: p = !1, onJoin: m, onReturnToMain: h, onCreateRooms: g, onAssign: _, onOpenRooms: v, onCloseRooms: y, onRenameRoom: x, onClose: S, title: C = "Breakout rooms", notice: w, collapseClosedRooms: T = !0, onDeleteRooms: E, className: D, "data-testid": O = "breakout-rooms-panel" } = n, k = i.length > 0 && i.every((e) => e.state === "closed"), [A, N] = U(l), P = H(o);
	z(() => {
		let e = P.current;
		P.current = o, e !== o && (e === "open" ? N(!1) : e === "none" && l && N(!0));
	}, [o, l]);
	let F = T && k && !A, I = ne(), L = Qt(o === "open" ? d : null, n.clockOffsetMs), ee = f || l, R = v && y ? (e, t) => t === "open" ? v([e]) : y([e]) : void 0;
	return /* @__PURE__ */ K("aside", {
		"aria-label": C,
		"data-testid": O,
		"data-phase": o,
		"data-mode": s,
		className: e("flex h-full min-h-0 w-full min-w-0 flex-col bg-surface", D),
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex min-h-9 shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
				children: [/* @__PURE__ */ G(b, {
					as: "div",
					size: "sm",
					weight: "semibold",
					role: "heading",
					"aria-label": C,
					className: "truncate",
					children: C
				}), S && /* @__PURE__ */ G(r, {
					"aria-label": `Close ${C.toLowerCase()}`,
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ G(a, {}),
					onClick: S,
					"data-testid": `${O}-close`
				})]
			}),
			w,
			/* @__PURE__ */ K("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: [
					l && o === "none" && g && /* @__PURE__ */ G(on, { onCreateRooms: g }),
					l && o !== "none" && /* @__PURE__ */ G(sn, {
						...n,
						left: L,
						folded: F
					}),
					!l && L !== null && /* @__PURE__ */ K(b, {
						as: "div",
						size: "sm",
						tone: p ? "inherit" : "secondary",
						tabular: !0,
						weight: p ? "semibold" : void 0,
						className: e("px-3 pt-2", p && "text-danger"),
						"data-testid": "breakout-timer-left",
						children: [
							p ? "Closing" : "Rooms close",
							" in ",
							$(L)
						]
					}),
					i.length === 0 && !l && /* @__PURE__ */ G(b, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "block px-3 py-4",
						"data-testid": `${O}-empty`,
						children: "No breakout rooms yet. The organizer will open them."
					}),
					T && k && /* @__PURE__ */ K("div", {
						className: "flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1 border-b border-border-subtle px-3 py-1",
						"data-testid": "breakout-closed-summary",
						children: [
							/* @__PURE__ */ K(b, {
								size: "sm",
								tone: "secondary",
								className: "mr-auto items-center gap-1.5",
								children: [/* @__PURE__ */ G(M, { size: "sm" }), i.length === 1 ? "1 room closed" : `${i.length} rooms closed`]
							}),
							/* @__PURE__ */ G(t, {
								variant: "ghost",
								size: "sm",
								onClick: () => N((e) => !e),
								"aria-expanded": !F,
								"aria-controls": I,
								"data-testid": "breakout-closed-toggle",
								children: F ? "Show rooms" : "Hide rooms"
							}),
							l && E && F && /* @__PURE__ */ G(t, {
								variant: "secondary",
								size: "sm",
								onClick: E,
								"data-testid": "breakout-delete",
								children: "Start new rooms"
							})
						]
					}),
					i.length > 0 && !F && /* @__PURE__ */ G("ul", {
						id: I,
						className: "flex flex-col",
						"data-testid": "breakout-room-list",
						children: i.map((e) => {
							let t = e.id === c, n = e.state === "open" && o === "open" && !p && (s === "self-select" || l);
							return /* @__PURE__ */ G(rn, {
								room: e,
								mine: t,
								canJoin: n,
								canReturn: ee,
								isOrganizer: l,
								rooms: i,
								onJoin: m,
								onReturnToMain: h,
								onAssign: _,
								onToggleRoom: R,
								onRenameRoom: x
							}, e.id);
						})
					}),
					l && o !== "none" && !F && u.length > 0 && /* @__PURE__ */ K("section", {
						className: "border-t border-border px-3 py-2",
						"data-testid": "breakout-unassigned",
						"aria-label": "Not in a room",
						children: [/* @__PURE__ */ K(b, {
							as: "div",
							size: "xs",
							weight: "semibold",
							tone: "secondary",
							className: "mb-1",
							children: [
								"Not in a room (",
								u.length,
								")"
							]
						}), /* @__PURE__ */ G("ul", {
							className: "flex flex-col gap-0.5",
							children: u.map((e) => /* @__PURE__ */ K("li", {
								className: "flex items-center gap-2",
								"data-testid": "breakout-unassigned-person",
								"data-user-id": e.id,
								children: [
									/* @__PURE__ */ G(j, {
										name: e.name,
										src: e.avatarUrl,
										size: 20
									}),
									/* @__PURE__ */ G(b, {
										size: "sm",
										className: "min-w-0 flex-1 truncate",
										children: e.name
									}),
									/* @__PURE__ */ G(X, { raised: e.handRaised }),
									_ && /* @__PURE__ */ G(an, {
										person: e,
										rooms: i,
										current: null,
										onAssign: _
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
export { Pe as A, Q as B, Je as C, ze as D, Be as E, xe as F, re as G, X as H, be as I, ie as J, se as K, he as L, Ee as M, we as N, Re as O, Te as P, oe as Q, _e as R, $ as S, He as T, J as U, Z as V, le as W, de as X, ce as Y, ue as Z, pt as _, Wt as a, ct as b, Rt as c, Pt as d, Mt as f, St as g, ht as h, Zt as i, Fe as j, Le as k, It as l, Tt as m, $t as n, Ut as o, jt as p, ae as q, Qt as r, Bt as s, cn as t, Nt as u, ft as v, Ue as w, et as x, rt as y, ye as z };
