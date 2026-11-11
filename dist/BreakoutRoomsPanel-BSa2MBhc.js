import { d as e, n as t, t as n } from "./Button-DQoeE5dN.js";
import { t as r } from "./Text-XdCzxWMv.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { E as a, J as o, S as s, h as c, it as l, m as u } from "./Icons-CqVFbuiZ.js";
import { _ as d, a as f, b as p, h as m, i as h, p as g, r as _, s as v, u as y, x as b, y as x } from "./MediaIcons-_ai5Til2.js";
import { n as S, t as C } from "./Badge-TifgAmIH.js";
import { t as w } from "./Banner-DPR4sIxI.js";
import { t as T } from "./Select-CDxAVVnW.js";
import { t as E } from "./Tooltip-DGN3JB6V.js";
import { t as ee } from "./InlinePopover-BJntntHW.js";
import { t as D } from "./DropdownMenu-DsOGcoH4.js";
import { t as O } from "./SegmentedControl-CO8w_o0t.js";
import { t as k } from "./Slider-DuMQEWA1.js";
import { n as A } from "./Avatar-KvxS_RDw.js";
import { t as j } from "./SkeletonCard-BryltcC7.js";
import { t as M } from "./Switch-CRiY_kzy.js";
import { t as N } from "./Textarea-Cf4WFXAs.js";
import { t as te } from "./StatusDot-DAok6F5B.js";
import { t as P } from "./InlineAlert-Cpf1ooBU.js";
import { t as F } from "./ActivityFeed-DB9ULSns.js";
import { t as ne } from "./NumberInput-pHxC7Spt.js";
import { t as I } from "./Checkbox-DgSkOMOT.js";
import { t as re } from "./InlineEditableText-CKjRokmb.js";
import { memo as L, useCallback as ie, useEffect as R, useId as z, useLayoutEffect as ae, useMemo as oe, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
//#region src/components/video/ParticipantAccessBadge.tsx
var G = { "view-only": {
	label: "View only",
	description: "Can watch and listen, but cannot turn on a camera, microphone or screen share"
} };
function K(e) {
	return e ? G[e] ?? null : null;
}
function q({ access: t, tone: n = "chip", size: i = "sm", iconOnly: o = !1, label: s, className: c, "data-testid": l = "participant-access-badge" }) {
	let u = K(t);
	if (!u) return null;
	let d = s ?? u.label, f = i === "sm" ? 11 : 13;
	return /* @__PURE__ */ W("span", {
		...o ? {
			role: "img",
			"aria-label": d
		} : {},
		title: o ? `${d}: ${u.description}` : u.description,
		"data-testid": l,
		"data-access": t,
		className: e("inline-flex shrink-0 items-center gap-1 rounded-full leading-none", i === "sm" ? "h-4" : "h-5", o ? i === "sm" ? "w-4 justify-center" : "w-5 justify-center" : i === "sm" ? "px-1.5" : "px-2", n === "chip" ? "bg-surface-emphasis text-text-secondary" : "bg-white/20 text-white", c),
		children: [/* @__PURE__ */ U(a, { size: f }), !o && /* @__PURE__ */ U(r, {
			as: "span",
			size: "xs",
			weight: "medium",
			tone: "inherit",
			className: "leading-none whitespace-nowrap",
			children: d
		})]
	});
}
//#endregion
//#region src/components/video/MeetingIcons.tsx
function J(e, t) {
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
function se({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11" }),
			/* @__PURE__ */ U("path", { d: "M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" }),
			/* @__PURE__ */ U("path", { d: "M14 10.5V5.5a1.5 1.5 0 0 1 3 0v8" }),
			/* @__PURE__ */ U("path", { d: "M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.1l3.4 4.6A6 6 0 0 0 12.4 20h.6a4 4 0 0 0 4-4v-2.5" })
		]
	});
}
function ce({ size: e = 16, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [/* @__PURE__ */ U("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		}), /* @__PURE__ */ U("circle", {
			cx: "12",
			cy: "12",
			r: "4",
			fill: "currentColor"
		})]
	});
}
function le({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ U("path", { d: "M8.5 14a4.5 4.5 0 0 0 7 0" }),
			/* @__PURE__ */ U("line", {
				x1: "9",
				y1: "9.5",
				x2: "9",
				y2: "9.6"
			}),
			/* @__PURE__ */ U("line", {
				x1: "15",
				y1: "9.5",
				x2: "15",
				y2: "9.6"
			})
		]
	});
}
function ue({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2"
			}),
			/* @__PURE__ */ U("line", {
				x1: "12",
				y1: "3.5",
				x2: "12",
				y2: "20.5"
			}),
			/* @__PURE__ */ U("line", {
				x1: "3.5",
				y1: "12",
				x2: "20.5",
				y2: "12"
			})
		]
	});
}
function de({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("rect", {
				x: "5",
				y: "3",
				width: "14",
				height: "18",
				rx: "2"
			}),
			/* @__PURE__ */ U("line", {
				x1: "8.5",
				y1: "8",
				x2: "15.5",
				y2: "8"
			}),
			/* @__PURE__ */ U("line", {
				x1: "8.5",
				y1: "12",
				x2: "15.5",
				y2: "12"
			}),
			/* @__PURE__ */ U("line", {
				x1: "8.5",
				y1: "16",
				x2: "12.5",
				y2: "16"
			})
		]
	});
}
function fe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [/* @__PURE__ */ U("rect", {
			x: "3.5",
			y: "3.5",
			width: "17",
			height: "17",
			rx: "2.5"
		}), /* @__PURE__ */ U("rect", {
			x: "11",
			y: "11",
			width: "6.5",
			height: "6.5",
			rx: "1.5"
		})]
	});
}
function pe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("rect", {
				x: "3.5",
				y: "3.5",
				width: "17",
				height: "17",
				rx: "2.5"
			}),
			/* @__PURE__ */ U("line", {
				x1: "12",
				y1: "8",
				x2: "12",
				y2: "16"
			}),
			/* @__PURE__ */ U("line", {
				x1: "8",
				y1: "12",
				x2: "16",
				y2: "12"
			})
		]
	});
}
function Y({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...J(e, t),
		children: /* @__PURE__ */ U("path", { d: "M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" })
	});
}
function X({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...J(e, t),
		children: [
			/* @__PURE__ */ U("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "13",
				rx: "2"
			}),
			/* @__PURE__ */ U("path", { d: "M12 14V8.5" }),
			/* @__PURE__ */ U("path", { d: "m9.25 11 2.75-2.75L14.75 11" })
		]
	});
}
//#endregion
//#region src/components/video/RaisedHandBadge.tsx
function me(e) {
	return e ? typeof e == "number" ? `Hand raised, ${he(e)} in line` : "Hand raised" : null;
}
function he(e) {
	let t = [
		"th",
		"st",
		"nd",
		"rd"
	], n = e % 100;
	return `${e}${t[(n - 20) % 10] ?? t[n] ?? t[0]}`;
}
function Z({ raised: t, tone: n = "chip", size: i = "sm", className: a, "data-testid": o = "raised-hand-badge" }) {
	let s = me(t);
	return s ? /* @__PURE__ */ W("span", {
		role: "img",
		"aria-label": s,
		title: s,
		"data-testid": o,
		"data-hand-position": typeof t == "number" ? t : void 0,
		className: e("inline-flex shrink-0 items-center gap-0.5 rounded-full leading-none", i === "sm" ? "h-4 px-1" : "h-5 px-1.5", n === "chip" ? "bg-warning-bg text-text-primary [&_svg]:text-warning" : "bg-warning text-call-chrome", a),
		children: [/* @__PURE__ */ U(se, { size: i === "sm" ? 11 : 13 }), typeof t == "number" && /* @__PURE__ */ U(r, {
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
function Q({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, handRaised: o, access: s, isLocal: c = !1, isSpotlight: l = !1, videoElement: u, onClick: d, fillParent: f = !1, className: p, style: m }) {
	let h = c ? "local-tile" : "remote-tile";
	return /* @__PURE__ */ W("div", {
		className: e("relative bg-video-tile flex items-center justify-center rounded overflow-hidden border-2 transition-colors", f ? "w-full h-full" : "aspect-video", i ? "border-success" : "border-transparent", d && "cursor-pointer hover:border-white/30", p),
		style: m,
		onClick: d,
		role: d ? "button" : void 0,
		tabIndex: d ? 0 : void 0,
		onKeyDown: d ? (e) => {
			(e.key === "Enter" || e.key === " ") && d();
		} : void 0,
		"data-testid": h,
		"data-peer-id": t,
		"data-peer-name": n,
		"data-is-local": c ? "true" : "false",
		"data-is-spotlight": l ? "true" : "false",
		"data-is-muted": a ? "true" : "false",
		"data-hand-raised": o ? "true" : void 0,
		"data-access": s,
		"data-track-kind": u ? "camera" : "avatar",
		children: [
			u ?? /* @__PURE__ */ U("div", {
				className: "absolute inset-0 flex items-center justify-center",
				style: { background: $(n) },
				children: /* @__PURE__ */ U("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", l ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ U("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : ge(n)
				})
			}),
			/* @__PURE__ */ W("div", {
				className: e("absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow"),
				children: [
					c && /* @__PURE__ */ U("span", {
						className: e("text-code-blue truncate font-medium"),
						children: "You"
					}),
					!c && /* @__PURE__ */ U("span", {
						className: "truncate font-medium",
						children: n
					}),
					/* @__PURE__ */ U(q, {
						access: s,
						tone: "overlay",
						iconOnly: !0,
						"data-testid": "tile-access"
					}),
					/* @__PURE__ */ U(Z, {
						raised: o,
						tone: "overlay",
						"data-testid": "tile-raised-hand"
					}),
					a && /* @__PURE__ */ U("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 10 10",
						fill: "none",
						"aria-hidden": !0,
						children: /* @__PURE__ */ U("path", {
							d: "M1 1l8 8M5 1v4.5",
							stroke: "#ef4444",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})
				]
			}),
			a && /* @__PURE__ */ U("div", {
				className: e("absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md", l ? "w-7 h-7" : "w-5 h-5"),
				"aria-label": "Microphone muted",
				children: /* @__PURE__ */ W("svg", {
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
						/* @__PURE__ */ U("line", {
							x1: "3",
							y1: "3",
							x2: "21",
							y2: "21"
						}),
						/* @__PURE__ */ U("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
						/* @__PURE__ */ U("path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }),
						/* @__PURE__ */ U("path", { d: "M19 10v2a7 7 0 0 1-.11 1.23" }),
						/* @__PURE__ */ U("path", { d: "M5 10v2a7 7 0 0 0 12 5.29" })
					]
				})
			}),
			i && /* @__PURE__ */ U("div", { className: e("absolute top-1 right-1 w-2 h-2 rounded-full bg-success shadow-[0_0_4px_#22c55e]") })
		]
	});
}
function ge(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function $(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ReactionOverlay.tsx
var _e = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function ve(e) {
	return _e[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function ye({ reactions: t, className: n, style: r }) {
	let [i, a] = V([]);
	return R(() => {
		if (t.length === 0) return;
		let e = t[t.length - 1], n = {
			id: e.id + "-" + Date.now(),
			emoji: e.emoji,
			x: 10 + Math.random() * 80,
			createdAt: Date.now()
		};
		a((e) => [...e.slice(-20), n]);
	}, [t]), R(() => {
		let e = setInterval(() => {
			a((e) => {
				let t = e.filter((e) => Date.now() - e.createdAt < 3e3);
				return t.length === e.length ? e : t;
			});
		}, 500);
		return () => clearInterval(e);
	}, []), /* @__PURE__ */ U("div", {
		"data-testid": "reaction-overlay",
		className: e("absolute inset-0 pointer-events-none overflow-hidden", n),
		style: r,
		children: i.map((t) => /* @__PURE__ */ U("span", {
			"data-testid": "reaction-float",
			className: e("absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]"),
			style: { left: `${t.x}%` },
			children: t.emoji
		}, t.id))
	});
}
var be = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function xe({ onReact: t, emojis: n = be, className: r, style: i, tone: a = "chrome" }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": "reaction-picker",
		"data-tone": a,
		className: e("flex gap-1", a === "chrome" ? "px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border" : "p-0.5", r),
		style: i,
		children: n.map((n) => {
			let r = ve(n);
			return /* @__PURE__ */ U("button", {
				"data-ui-part": "",
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
var Se = /* @__PURE__ */ W("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ U("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ U("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
		/* @__PURE__ */ U("line", {
			x1: "9",
			y1: "9",
			x2: "9.01",
			y2: "9"
		}),
		/* @__PURE__ */ U("line", {
			x1: "15",
			y1: "9",
			x2: "15.01",
			y2: "9"
		})
	]
});
function Ce({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, tone: o = "chrome", className: s }) {
	let [c, l] = V(!1);
	return /* @__PURE__ */ W("div", {
		className: e("relative inline-flex", s),
		children: [/* @__PURE__ */ U("button", {
			"data-ui-part": "",
			type: "button",
			title: "Send a reaction",
			"aria-label": "Send a reaction",
			"aria-expanded": c,
			disabled: a,
			onClick: () => l((e) => !e),
			"data-testid": "reaction-picker-open",
			"data-tone": o,
			className: e(o === "surface" ? ["w-8 h-8 rounded-md flex items-center justify-center border border-solid border-border cursor-pointer transition-colors duration-150", c ? "bg-surface-inset text-text-primary" : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"] : ["w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150", c ? "bg-white/20 text-white" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"], a && "opacity-40 cursor-not-allowed"),
			children: Se
		}), c && /* @__PURE__ */ U(xe, {
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
function we(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function Te({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!we(t)) return null;
	let a = t >= 1e3 ? `${(t / 1e3).toFixed(1)}K` : `${t}`;
	return /* @__PURE__ */ W("div", {
		"data-testid": i,
		"data-viewers": t,
		className: e("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium", n),
		style: r,
		children: [/* @__PURE__ */ W("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ U("circle", {
				cx: "6",
				cy: "4",
				r: "2.5",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ U("path", {
				d: "M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ W("span", { children: [a, " watching"] })]
	});
}
//#endregion
//#region src/components/shared/DisabledReason.tsx
var Ee = "cursor-not-allowed *:opacity-45";
function De(e, t, n) {
	let r = z(), i = e || void 0, a = i !== void 0;
	return {
		reason: i,
		off: !!t || a,
		buttonProps: {
			disabled: a ? void 0 : t,
			"aria-disabled": a ? "true" : void 0,
			"aria-describedby": a ? [n, r].filter(Boolean).join(" ") : n,
			"data-disabled-reason": i
		},
		guard: (e) => a ? void 0 : e,
		description: a ? /* @__PURE__ */ U("span", {
			id: r,
			hidden: !0,
			children: i
		}) : null
	};
}
function Oe({ reason: e, children: t, placement: n = "top", "data-testid": r }) {
	return /* @__PURE__ */ U(E, {
		content: e ?? "",
		disabled: !e,
		placement: n,
		triggerClassName: "contents",
		openDelay: 200,
		...r ? { "data-testid": r } : {},
		children: t
	});
}
//#endregion
//#region src/components/video/callDockRenderProbe.ts
var ke = null;
function Ae(e, t) {
	ke?.(e, t);
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function je({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = oe(() => {
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
	]), m = Me(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ W("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ U(Q, {
				id: e.id,
				displayName: e.displayName,
				avatarUrl: e.avatarUrl,
				isSpeaking: e.id === r,
				isMuted: e.isMuted,
				handRaised: e.handRaised,
				access: e.access,
				isLocal: e.isLocal,
				videoElement: e.videoElement,
				fillParent: a,
				onClick: i ? () => i(e.id) : void 0
			}, e.id)),
			p.length === 0 && /* @__PURE__ */ U("div", {
				className: e("flex items-center justify-center text-white/40 text-sm", a ? "h-full w-full" : "aspect-video"),
				children: "Waiting for others to join…"
			}),
			f && n && /* @__PURE__ */ U("div", {
				className: "absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10",
				style: { width: o },
				children: /* @__PURE__ */ U(Q, {
					id: n.id,
					displayName: n.displayName,
					avatarUrl: n.avatarUrl,
					isMuted: n.isMuted,
					handRaised: n.handRaised,
					access: n.access,
					isLocal: !0,
					videoElement: n.videoElement
				})
			})
		]
	});
}
function Me(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function Ne({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: f = 84, tileTestIdPrefix: p = "call-tile", maxColumns: m, className: h, style: g, "data-testid": _ = "call-tile-row" }) {
	if (c === "grid" || c === "gallery") {
		let i = n ? [n, ...t] : t, a = m ? Math.max(1, Math.min(Me(i.length), m)) : Me(i.length);
		return /* @__PURE__ */ U("div", {
			className: e("grid w-full min-w-0 gap-3", c === "gallery" ? "grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] justify-items-center [&>*]:max-w-[26rem]" : Pe[a] ?? Pe[4], h),
			style: g,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": _,
			"data-variant": c,
			"data-tile-count": i.length,
			"data-columns": c === "gallery" ? void 0 : a,
			children: i.map((e) => /* @__PURE__ */ U(Re, {
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
	if (c === "dock") return /* @__PURE__ */ U(Ie, {
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
	let v = n ? [...t, n] : t, y = v.map((t) => /* @__PURE__ */ U(Q, {
		id: t.id,
		displayName: t.displayName,
		...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
		isMuted: t.isMuted,
		handRaised: t.handRaised,
		access: t.access,
		isLocal: t.isLocal,
		isSpeaking: t.id === r,
		videoElement: t.videoElement,
		...s ? { onClick: () => s(t.id) } : {},
		className: e("shrink-0", c === "floating" && "rounded-xl shadow-lg ring-1 ring-black/10", t.id === l && "ring-2 ring-primary"),
		style: { width: i }
	}, t.id)), b = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ W("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "floating",
		"data-tile-count": v.length,
		children: [/* @__PURE__ */ U("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${_}-tiles`,
			children: v.map((t) => t.videoElement ? /* @__PURE__ */ U(Q, {
				id: t.id,
				displayName: t.displayName,
				...t.avatarUrl ? { avatarUrl: t.avatarUrl } : {},
				isMuted: t.isMuted,
				handRaised: t.handRaised,
				access: t.access,
				isLocal: t.isLocal,
				isSpeaking: t.id === r,
				videoElement: t.videoElement,
				...s ? { onClick: () => s(t.id) } : {},
				className: e("shrink-0 rounded-xl !border-0 shadow-lg ring-2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&>*:first-child]:h-full [&>*:first-child]:w-full", t.id === l ? "ring-primary" : t.id === r ? "ring-success" : "ring-white/80"),
				style: { width: i }
			}, t.id) : /* @__PURE__ */ U(Be, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ U("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${_}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ W("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", h),
		style: g,
		role: "group",
		"aria-label": b,
		"data-testid": _,
		"data-variant": "bar",
		"data-tile-count": v.length,
		children: [
			o && /* @__PURE__ */ U("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${_}-title`,
				children: o
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${_}-tiles`,
				children: y
			}),
			a && /* @__PURE__ */ U("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${_}-controls`,
				children: a
			})
		]
	});
}
var Pe = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function Fe(e) {
	if (!e.length) return [];
	let t = e[0].offsetTop;
	return e.flatMap((e, n) => e.offsetTop > t + 1 ? [n] : []);
}
function Ie({ all: t, activeSpeakerId: n, highlightedId: r, tileWidth: i, tileHeight: a, overflow: o, maxVisible: s, tileTestIdPrefix: c, title: l, onParticipantClick: u, className: d, style: f, testId: p }) {
	let m = o === "collapse" && t.length > s ? t.slice(0, Math.max(1, s - 1)) : t, h = t.slice(m.length), g = B(null), [_, v] = V(null), y = m.map((e) => e.id).join("|");
	ae(() => {
		let e = g.current;
		if (!e || o !== "collapse") return;
		let t = () => {
			let t = [...e.children].filter((e) => e instanceof HTMLElement && e.dataset.dockItem === "true"), n = Fe(t);
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
	return /* @__PURE__ */ W("div", {
		className: e("relative min-w-0", d),
		style: f,
		children: [/* @__PURE__ */ W("div", {
			ref: g,
			className: e("flex min-w-0 items-center gap-2", b ? "flex-wrap overflow-hidden" : "overflow-x-auto"),
			style: b ? { height: a } : void 0,
			role: "group",
			"aria-label": typeof l == "string" ? `Call: ${l}` : "Call participants",
			"data-testid": p,
			"data-variant": "dock",
			"data-tile-count": t.length,
			"data-hidden-count": _?.hidden ?? 0,
			children: [m.map((e) => /* @__PURE__ */ U(Re, {
				participant: e,
				width: i,
				height: a,
				speaking: e.id === n,
				highlighted: e.id === r,
				testId: `${c}-${e.id}`,
				...u ? { onParticipantClick: u } : {}
			}, e.id)), h.length > 0 && /* @__PURE__ */ W("div", {
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
				children: [h.map((e) => (e.videoElement != null || e.audioElement != null) && /* @__PURE__ */ W("div", {
					className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
					"aria-hidden": "true",
					"data-testid": `${c}-${e.id}-media-sink`,
					children: [e.videoElement, e.audioElement]
				}, e.id)), /* @__PURE__ */ U(A, {
					name: `+ ${h.length}`,
					initials: `+${h.length}`,
					size: 40,
					color: "rgba(255,255,255,0.18)",
					showTitle: !1
				})]
			})]
		}), _ && /* @__PURE__ */ W("span", {
			className: "pointer-events-none absolute top-1 z-20 -translate-x-full rounded-full bg-surface-inverse/70 px-2 py-0.5 text-xs font-medium text-white",
			style: { left: _.left - 4 },
			title: _.names,
			"aria-label": `${_.hidden} more: ${_.names}`,
			"data-testid": `${c}-wrapped`,
			children: ["+", _.hidden]
		})]
	});
}
function Le(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => Object.is(e[n], t[n]));
}
var Re = L(ze, (e, t) => e.width === t.width && e.height === t.height && e.fluid === t.fluid && e.speaking === t.speaking && e.highlighted === t.highlighted && e.testId === t.testId && e.onParticipantClick === t.onParticipantClick && Le(e.participant, t.participant));
function ze({ participant: t, width: n, height: r, fluid: i = !1, speaking: a, highlighted: o, testId: s, onParticipantClick: c }) {
	Ae("tile", t.id);
	let l = c ? () => c(t.id) : void 0, u = t.isLocal ? "You" : t.displayName, d = t.ringing ? `${t.displayName}, ringing` : `${t.isLocal ? "You" : t.displayName}${Ve(t.access)}${t.handRaised ? `, ${me(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
	return /* @__PURE__ */ W("div", {
		className: e("relative shrink-0 overflow-hidden rounded-md text-white", i && "aspect-video w-full", t.videoElement && !t.cameraOff ? "bg-video-tile" : "bg-video-tile-off", "[&_video]:h-full [&_video]:w-full [&_video]:object-cover", l && "cursor-pointer"),
		style: i ? void 0 : {
			width: n,
			height: r
		},
		title: d,
		"aria-label": d,
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
		"data-access": t.access,
		children: [
			t.videoElement && /* @__PURE__ */ U("div", {
				className: t.cameraOff ? "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" : "absolute inset-0",
				"aria-hidden": t.cameraOff || void 0,
				"data-testid": t.cameraOff ? `${s}-media-sink` : `${s}-media`,
				children: t.videoElement
			}),
			t.audioElement != null && /* @__PURE__ */ U("div", {
				className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
				"aria-hidden": "true",
				"data-testid": `${s}-audio-sink`,
				children: t.audioElement
			}),
			(!t.videoElement || t.cameraOff) && /* @__PURE__ */ U("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ U(A, {
					name: t.displayName,
					size: i ? 56 : Math.round(Math.min(40, r * .48)),
					...t.avatarUrl ? { src: t.avatarUrl } : {},
					color: "rgba(71,80,92,0.28)",
					showTitle: !1,
					...t.ringing ? { className: "animate-pulse" } : {}
				})
			}),
			t.reconnecting && /* @__PURE__ */ U("div", {
				className: "absolute inset-0 bg-surface-inverse/40",
				"data-testid": `${s}-reconnecting`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ W("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/75 from-65% to-transparent px-1.5 pb-1 pt-3 text-xs",
				"data-tile-label": "",
				children: [/* @__PURE__ */ U("span", {
					className: "min-w-0 flex-1 truncate font-medium",
					children: u
				}), t.ringing ? /* @__PURE__ */ U("span", {
					className: "shrink-0 text-white/80",
					"data-testid": `${s}-ringing`,
					children: "Ringing…"
				}) : /* @__PURE__ */ W(H, { children: [
					/* @__PURE__ */ U(q, {
						access: t.access,
						tone: "overlay",
						iconOnly: !0,
						"data-testid": `${s}-access`
					}),
					/* @__PURE__ */ U(Z, {
						raised: t.handRaised,
						tone: "overlay",
						"data-testid": `${s}-hand`
					}),
					t.screenSharing && /* @__PURE__ */ U(g, {
						size: 13,
						className: "shrink-0"
					}),
					t.isMuted ? /* @__PURE__ */ U(f, {
						size: 14,
						className: "shrink-0"
					}) : /* @__PURE__ */ U(h, {
						size: 14,
						className: "shrink-0"
					})
				] })]
			}),
			(o || a) && /* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				"data-testid": `${s}-ring`,
				"data-ring": o ? "highlighted" : "speaking",
				className: e("pointer-events-none absolute inset-0 z-10 rounded-md ring-2 ring-inset", o ? "ring-primary" : "ring-success")
			}),
			a && o && /* @__PURE__ */ U("span", {
				className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-success",
				"aria-hidden": "true"
			})
		]
	});
}
function Be({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${Ve(t.access)}${t.handRaised ? `, ${me(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}`;
	return /* @__PURE__ */ W("div", {
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
		"data-access": t.access,
		children: [
			/* @__PURE__ */ U(A, {
				name: t.displayName,
				size: 44,
				...t.avatarUrl ? { src: t.avatarUrl } : {}
			}),
			t.handRaised ? /* @__PURE__ */ U(Z, {
				raised: t.handRaised,
				tone: "overlay",
				className: "absolute -left-1 -top-1 ring-2 ring-white",
				"data-testid": "bubble-hand"
			}) : null,
			/* @__PURE__ */ U(q, {
				access: t.access,
				tone: "overlay",
				iconOnly: !0,
				className: "absolute -bottom-1 -left-1 bg-call-chrome ring-2 ring-white",
				"data-testid": "bubble-access"
			}),
			t.isMuted && /* @__PURE__ */ U("span", {
				className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] text-white ring-2 ring-white",
				"aria-hidden": "true",
				children: "✕"
			})
		]
	});
}
function Ve(e) {
	let t = K(e);
	return t ? `, ${t.label.toLowerCase()}` : "";
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function He({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = Ue(a, o), p = oe(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = oe(() => {
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
	return r ? (g = "screen", _ = i ?? h?.displayName ?? "", v = r) : p ? (g = "screen", _ = p.displayName, v = p.screenElement) : h ? (g = "camera", _ = h.displayName, v = /* @__PURE__ */ U(Q, {
		id: h.id,
		displayName: h.displayName,
		avatarUrl: h.avatarUrl,
		isMuted: h.isMuted,
		handRaised: h.handRaised,
		access: h.access,
		isLocal: h.isLocal,
		isSpotlight: !0,
		fillParent: !0,
		videoElement: h.videoElement,
		className: "w-full h-full"
	})) : (g = "camera", _ = ""), /* @__PURE__ */ W("div", {
		className: e("flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden", c && "h-full w-full", u),
		style: d,
		children: [/* @__PURE__ */ U("div", {
			className: e("bg-black relative", c ? "flex-1 min-h-0" : "flex-1 aspect-video"),
			"data-testid": "hangout-spotlight",
			"data-spotlight-type": g,
			"data-spotlight-user": _,
			children: v
		}), m.length > 0 && /* @__PURE__ */ U("div", {
			className: "flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0",
			children: m.map((e) => /* @__PURE__ */ U("div", {
				className: "shrink-0",
				style: { width: l },
				children: /* @__PURE__ */ U(Q, {
					id: e.id,
					displayName: e.displayName,
					avatarUrl: e.avatarUrl,
					isMuted: e.isMuted,
					handRaised: e.handRaised,
					access: e.access,
					isLocal: e.isLocal,
					videoElement: e.videoElement,
					onClick: s ? () => s(e.id) : void 0
				})
			}, e.id))
		})]
	});
}
function Ue(e, t) {
	let [n, r] = V(e ?? null);
	return R(() => {
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
var We = 10;
function Ge({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= We ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ U(He, {
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
	}) : /* @__PURE__ */ U(je, {
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
function Ke(e, t) {
	let [n, r] = V(0);
	return R(() => {
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
function qe(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/bindMediaStream.ts
function Je(e, t, { onPlayState: n, onRebind: r } = {}) {
	e.srcObject !== t && (e.srcObject = t), r?.("bind");
	let i = (e) => n?.(e), a = () => i("playing"), o = () => i("ended"), s = () => {
		e.ended && i("ended");
	}, c = () => {
		let t = e.play();
		t && typeof t.catch == "function" && t.catch((e) => {
			e?.name === "NotAllowedError" && i("paused-by-autoplay");
		});
	}, l = (n) => {
		e.srcObject = null, e.srcObject = t, r?.(n.type), c();
	};
	e.addEventListener("play", a), e.addEventListener("ended", o), e.addEventListener("pause", s);
	let u = typeof t?.addEventListener == "function";
	return u && (t.addEventListener("addtrack", l), t.addEventListener("removetrack", l)), c(), () => {
		e.removeEventListener("play", a), e.removeEventListener("ended", o), e.removeEventListener("pause", s), u && (t.removeEventListener("addtrack", l), t.removeEventListener("removetrack", l));
	};
}
//#endregion
//#region src/components/video/StreamVideo.tsx
function Ye({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
	let a = B(null), o = B(i);
	return o.current = i, R(() => {
		let t = a.current;
		if (!t) return;
		n && (n.current = t);
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
		}, i = Je(t, e, {
			onPlayState: (e) => o.current?.(e),
			onRebind: (e) => r(e === "bind" ? "bind" : `stream ${e}`)
		});
		return () => {
			i(), n && n.current === t && (n.current = null);
		};
	}, [e, n]), /* @__PURE__ */ U("video", {
		ref: a,
		autoPlay: !0,
		playsInline: !0,
		muted: t,
		className: r
	});
}
//#endregion
//#region src/components/video/RemoteTileSlot.tsx
function Xe({ stream: e }) {
	let t = B(null);
	return R(() => {
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
	}, [e]), /* @__PURE__ */ U("audio", {
		ref: t,
		autoPlay: !0,
		playsInline: !0,
		className: "hidden",
		"data-testid": "remote-tile-hidden-audio"
	});
}
function Ze({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	Ke(e, t);
	let i = qe(e);
	return !n || !i || !e ? /* @__PURE__ */ W("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ U(A, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ U(Xe, { stream: e })]
	}) : /* @__PURE__ */ U(Ye, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function Qe({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ U("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var $e = {
	microphone: "Mic",
	camera: "Camera"
}, et = {
	microphone: "microphone",
	camera: "camera"
}, tt = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, nt = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function rt({ kind: t, on: r, onToggle: i, devices: a, selectedDeviceId: o, onSelectDevice: s, permission: c, level: l, size: d = "sm", showLabel: m = !1, extraItems: g, disabledReason: _, deviceMenu: v = !0, className: y, "data-testid": x = `device-toggle-${t}` }) {
	let S = c === "denied" || c === "unavailable", C = De(_ ?? (c === "denied" ? tt[t] : c === "unavailable" ? nt[t] : void 0), S), w = C.off, T = r && !w, E = t === "microphone" && T && (l ?? 0) > .08, ee = d === "md" ? 20 : 18, O;
	O = U(t === "microphone" ? T ? h : f : T ? p : b, { size: ee });
	let k = `${$e[t]} ${T ? "on" : "off"}`, A = T ? `Turn ${et[t]} off` : `Turn ${et[t]} on`, j = a.length ? a.map((e) => ({
		label: e.label,
		checked: e.deviceId === o,
		onSelect: () => s(e.deviceId),
		"data-testid": `${x}-device-${e.deviceId}`
	})) : [{
		label: nt[t],
		disabled: !0
	}], M = d === "md" ? "h-10" : "h-8", N = !T && t === "microphone" && !w ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ W("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", E && "ring-2 ring-primary/50", M, y),
		"data-kind": t,
		"data-on": T ? "true" : "false",
		"data-permission": c,
		children: [/* @__PURE__ */ U(Oe, {
			reason: C.reason,
			children: /* @__PURE__ */ W("button", {
				"data-ui-part": "",
				type: "button",
				onClick: w ? void 0 : i,
				...C.buttonProps,
				"aria-pressed": T,
				"aria-label": m ? void 0 : A,
				title: C.reason === void 0 ? A : void 0,
				"data-testid": x,
				className: e("inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-[inherit] text-sm", v ? "rounded-l-md" : "rounded-md", n, "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", C.reason === void 0 ? "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50" : Ee, d === "md" ? "px-2.5" : "px-2", m && "min-w-0 flex-1 justify-start gap-1.5 pr-2", N),
				children: [
					O,
					m && /* @__PURE__ */ U("span", {
						className: "min-w-0 truncate whitespace-nowrap",
						children: k
					}),
					C.description
				]
			})
		}), v && /* @__PURE__ */ U(D, {
			trigger: /* @__PURE__ */ U(u, { size: 14 }),
			triggerLabel: `Choose ${et[t]}`,
			triggerTitle: `Choose ${et[t]}`,
			triggerTestId: `${x}-menu`,
			triggerVariant: "link",
			triggerClassName: e("h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary", d === "md" && "px-2"),
			align: "end",
			"data-testid": `${x}-menu-panel`,
			sections: [{
				label: t === "microphone" ? "Microphone" : "Camera",
				items: j
			}, ...g?.length ? [{ items: g }] : []]
		})]
	});
}
//#endregion
//#region src/components/video/CallDock.tsx
var it = {
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
function at(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function ot(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
var st = L(function({ phase: e, callingTo: t, participantCount: n, elapsedMs: r }) {
	Ae("meta");
	let i;
	return i = e === "calling" ? t ? `Calling ${t}…` : "Calling…" : e === "connecting" ? "Connecting…" : e === "reconnecting" ? /* @__PURE__ */ U("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${ot(n)}${r == null ? "" : ` · ${at(r)}`}`, /* @__PURE__ */ U("span", {
		className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
		"data-testid": "call-dock-meta",
		children: i
	});
});
function ct(e, t, n) {
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
var lt = L(function({ participants: e, localParticipantId: t, activeSpeakerId: n, followingUserId: r, reconnecting: i, size: a, grid: o = !1, gallery: s = !1, maxColumns: c, onTileClick: l, title: u }) {
	let d = e.find((e) => e.userId === t) ?? null, f = e.filter((e) => e.userId !== t);
	return /* @__PURE__ */ U(Ne, {
		variant: s ? "gallery" : o ? "grid" : "dock",
		participants: f.map((e) => ct(e, !1, i)),
		localParticipant: d ? ct(d, !0, i) : null,
		activeSpeakerId: n,
		highlightedId: r,
		tileWidth: it[a].w,
		tileHeight: it[a].h,
		overflow: "collapse",
		maxVisible: it[a].visible,
		...c ? { maxColumns: c } : {},
		...l ? { onParticipantClick: l } : {},
		title: u,
		"data-testid": "call-dock-tile-row"
	});
});
function ut({ title: n, participantCount: r, elapsedMs: a, phase: c, callingTo: l, documents: u = [], participants: d, localParticipantId: f, activeSpeakerId: p = null, followingUserId: h = null, mic: v, camera: b, screenShare: S, onOpenPeople: T, onOpenDocuments: E, peopleOpen: O = !1, documentsOpen: k = !1, onOpenSettings: A, extras: M, onPopOut: N, onLeave: te, canEndForEveryone: P = !1, onEndForEveryone: F, onTileClick: ne, onTitleClick: I, onDocumentClick: re, endedSummary: L, error: R, onDismiss: z, compact: ae = !1, tileSize: oe, layout: G = "shelf", className: K, "data-testid": q = "call-dock" }) {
	let J = G === "compact" ? "sm" : oe ?? (ae ? "sm" : "md"), se = B(null), [ce, le] = V(!1), ue = B(ne);
	ue.current = ne;
	let de = ie((e) => ue.current?.(e), []), fe = c === "calling" ? "You can share once someone joins" : c === "connecting" ? "Connecting…" : S.disabledReason, pe = De(fe, !1);
	if (c === "error" && R) return /* @__PURE__ */ U("div", {
		className: e("border-t border-border bg-surface px-5 py-3", K),
		"data-testid": q,
		"data-phase": "error",
		children: /* @__PURE__ */ U(w, {
			variant: "error",
			title: R.title ?? `Lost the call — ${R.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U(t, {
					size: "sm",
					onClick: R.onRetry,
					"data-testid": "call-dock-rejoin",
					children: R.retryLabel ?? "Rejoin"
				}), z && /* @__PURE__ */ U(t, {
					size: "sm",
					variant: "ghost",
					onClick: z,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (c === "ended") return /* @__PURE__ */ W("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", K),
		"data-testid": q,
		"data-phase": "ended",
		children: [/* @__PURE__ */ W("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ U("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				a != null && /* @__PURE__ */ W(H, { children: [" · ", at(a)] }),
				L != null && /* @__PURE__ */ W(H, { children: [" · ", L] })
			]
		}), z && /* @__PURE__ */ U(t, {
			variant: "link",
			onClick: z,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let Y = c === "calling", X = c === "connecting", me = c === "reconnecting", he = () => {
		!Y && P && F ? le(!0) : te();
	}, Z = G === "stage", Q = G === "compact", ge = G === "grid" || Z, $ = G === "stack" || Q || Z && J === "sm", _e = [
		{
			label: S.on ? "Stop sharing" : "Share your screen",
			icon: /* @__PURE__ */ U(g, { size: 16 }),
			onSelect: S.onToggle,
			...fe ? {
				disabled: !0,
				disabledReason: fe
			} : {},
			"data-testid": "call-dock-share"
		},
		{
			label: `People (${r})`,
			icon: /* @__PURE__ */ U(x, { size: 16 }),
			onSelect: T,
			...O ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-people"
		},
		...E ? [{
			label: `Documents (${u.length})`,
			icon: /* @__PURE__ */ U(s, { size: 16 }),
			onSelect: E,
			...k ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-documents"
		}] : [],
		{
			label: "Call settings",
			icon: /* @__PURE__ */ U(m, { size: 16 }),
			onSelect: A,
			"data-testid": "call-dock-settings"
		},
		{
			label: "Pop out the call",
			icon: /* @__PURE__ */ U(_, { size: 16 }),
			onSelect: N,
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-popout"
		}
	], ve = /* @__PURE__ */ W("div", {
		className: e("relative min-w-0", Z && "min-h-0 flex-1 overflow-y-auto", Q && "col-start-1 row-start-1 @min-[520px]:row-span-2 @min-[900px]:row-span-1"),
		"data-testid": "call-dock-tiles",
		children: [me && /* @__PURE__ */ U("div", {
			className: "mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg",
			role: "status",
			"data-testid": "call-dock-reconnecting",
			children: "Reconnecting…"
		}), X ? /* @__PURE__ */ U("div", {
			className: "flex gap-2",
			"data-testid": "call-dock-connecting",
			children: /* @__PURE__ */ U("div", {
				className: e("shrink-0 overflow-hidden rounded-md", Z ? "aspect-video w-full max-w-[26rem] mx-auto" : ge || $ && !Q ? "aspect-video w-full" : it[J].box),
				children: /* @__PURE__ */ U(j, {
					height: "100%",
					rounded: "md"
				})
			})
		}) : /* @__PURE__ */ U(lt, {
			participants: d,
			localParticipantId: f,
			activeSpeakerId: p,
			followingUserId: h,
			reconnecting: me,
			size: J,
			grid: ge || $ && !Q,
			gallery: Z,
			...$ && !Q ? { maxColumns: 2 } : {},
			onTileClick: ne ? de : void 0,
			title: n
		})]
	});
	return ge && !Z ? /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("flex min-w-0 flex-col gap-2 bg-surface p-3", K),
		"aria-label": `Call: ${n}`,
		"data-testid": q,
		"data-phase": c,
		"data-layout": "grid",
		"data-compact": J === "sm" ? "true" : "false",
		children: ve
	}) : /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", Q && "gap-0 px-3 py-2", Z && "h-full min-h-0 border-t-0 px-3", K),
		"aria-label": `Call: ${n}`,
		"data-testid": q,
		"data-phase": c,
		"data-layout": Q ? "compact" : Z ? "stage" : $ ? "stack" : "shelf",
		"data-call-dock": !0,
		"data-compact": J === "sm" || $ ? "true" : "false",
		"data-tile-size": $ && !Q ? void 0 : J,
		children: /* @__PURE__ */ W("div", {
			className: Q ? "grid min-w-0 grid-cols-[132px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 @min-[900px]:grid-cols-[132px_minmax(0,1fr)_auto]" : "contents",
			"data-testid": Q ? "call-dock-compact-columns" : void 0,
			children: [/* @__PURE__ */ W("div", {
				className: e("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2", Z && "order-last shrink-0 justify-center", Q && "contents"),
				"data-call-dock-header": !0,
				"data-testid": `${q}-header`,
				children: [!Z && /* @__PURE__ */ W("div", {
					className: e("flex min-w-0 flex-auto items-baseline gap-3", Q && "col-start-2 row-start-1 flex-col items-start gap-0.5"),
					children: [
						/* @__PURE__ */ U("button", {
							"data-ui-part": "",
							type: "button",
							onClick: I,
							disabled: !I,
							className: e("max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline", Q && "max-w-full text-sm"),
							"data-testid": "call-dock-title",
							title: n,
							children: n
						}),
						/* @__PURE__ */ U(st, {
							phase: c,
							callingTo: l,
							participantCount: r,
							elapsedMs: a
						}),
						!Q && u.length > 0 && /* @__PURE__ */ U("span", {
							className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
							"data-testid": "call-dock-documents-chips",
							children: u.map((t) => /* @__PURE__ */ W("button", {
								"data-ui-part": "",
								type: "button",
								onClick: re ? () => re(t.id) : void 0,
								className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", re ? "cursor-pointer hover:underline" : "cursor-default"),
								"data-testid": `call-dock-document-${t.id}`,
								"data-presenting": t.presenting ? "true" : "false",
								title: t.presenting ? `${t.title} · Presenting` : t.title,
								children: [/* @__PURE__ */ U(s, {
									size: 16,
									className: "shrink-0"
								}), /* @__PURE__ */ U("span", {
									className: "truncate",
									children: t.title
								})]
							}, t.id))
						})
					]
				}), /* @__PURE__ */ W("div", {
					className: e("flex min-w-0 max-w-full flex-wrap items-center gap-2", Z ? "justify-center" : "ml-auto justify-end", Q && "col-span-2 row-start-2 ml-0 justify-start @min-[520px]:col-span-1 @min-[520px]:col-start-2 @min-[900px]:col-start-3 @min-[900px]:row-start-1 @min-[900px]:justify-end"),
					"data-testid": `${q}-controls`,
					children: [
						/* @__PURE__ */ U(rt, {
							kind: "microphone",
							...v,
							"data-testid": "call-dock-mic",
							...X ? { disabledReason: "Connecting…" } : {}
						}),
						/* @__PURE__ */ U(rt, {
							kind: "camera",
							...b,
							"data-testid": "call-dock-camera",
							...X ? { disabledReason: "Connecting…" } : {}
						}),
						!$ && /* @__PURE__ */ W(H, { children: [
							/* @__PURE__ */ U(Oe, {
								reason: pe.reason,
								children: /* @__PURE__ */ W(t, {
									variant: S.on ? "danger" : "ghost",
									size: "sm",
									onClick: pe.guard(S.onToggle),
									...pe.buttonProps,
									title: pe.reason === void 0 ? S.on ? "Stop sharing" : "Share your screen" : void 0,
									"aria-label": S.on ? "Stop sharing" : "Share",
									"aria-pressed": S.on,
									"data-testid": "call-dock-share",
									className: e("inline-flex h-8 items-center gap-1.5 bg-surface", pe.reason !== void 0 && e("cursor-not-allowed *:opacity-45", "aria-disabled:hover:bg-surface aria-disabled:hover:text-text-primary")),
									children: [
										/* @__PURE__ */ U(g, { size: 16 }),
										/* @__PURE__ */ U("span", {
											className: "hidden @min-[860px]:inline",
											children: S.on ? "Stop sharing" : "Share"
										}),
										pe.description
									]
								})
							}),
							/* @__PURE__ */ W(t, {
								variant: O ? "secondary" : "ghost",
								size: "sm",
								onClick: T,
								disabled: X,
								"aria-label": `People (${r})`,
								"aria-pressed": O,
								"data-testid": "call-dock-people",
								className: e("inline-flex h-8 items-center gap-1.5", !O && "bg-surface"),
								children: [
									/* @__PURE__ */ U(x, { size: 16 }),
									/* @__PURE__ */ U("span", {
										className: "hidden @min-[860px]:inline",
										children: "People"
									}),
									/* @__PURE__ */ U(C, {
										variant: "count",
										value: r,
										color: "muted",
										"aria-label": `${r} people`
									})
								]
							}),
							E && /* @__PURE__ */ W(t, {
								variant: k ? "secondary" : "ghost",
								size: "sm",
								onClick: E,
								disabled: X,
								"aria-label": `Documents (${u.length})`,
								"aria-pressed": k,
								"data-testid": "call-dock-documents",
								className: e("hidden h-8 items-center gap-1.5 @min-[980px]:inline-flex", !k && "bg-surface"),
								children: [
									/* @__PURE__ */ U(s, { size: 16 }),
									/* @__PURE__ */ U("span", {
										className: "hidden @min-[860px]:inline",
										children: "Documents"
									}),
									/* @__PURE__ */ U(C, {
										variant: "count",
										value: u.length,
										color: "muted",
										"aria-label": `${u.length} documents`
									})
								]
							})
						] }),
						M != null && /* @__PURE__ */ U("div", {
							className: "contents",
							"data-testid": "call-dock-extras",
							children: M
						}),
						/* @__PURE__ */ W("div", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": "call-dock-end",
							children: [$ ? /* @__PURE__ */ U(D, {
								trigger: /* @__PURE__ */ U(o, { size: 16 }),
								triggerLabel: "More call controls",
								triggerTitle: "More",
								triggerTestId: "call-dock-more",
								triggerClassName: "h-8 w-8 px-0 py-0",
								align: "end",
								sections: [{ items: _e }],
								"data-testid": "call-dock-more-menu"
							}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(i, {
								"aria-label": "Call settings",
								title: "Call settings",
								variant: "outline",
								onClick: A,
								icon: /* @__PURE__ */ U(m, { size: 18 }),
								"data-testid": "call-dock-settings"
							}), /* @__PURE__ */ U(i, {
								"aria-label": "Pop out the call",
								title: "Pop out the call",
								variant: "outline",
								onClick: N,
								disabled: X,
								icon: /* @__PURE__ */ U(_, { size: 16 }),
								"data-testid": "call-dock-popout"
							})] }), /* @__PURE__ */ W(t, {
								ref: se,
								variant: "danger-solid",
								size: "sm",
								onClick: he,
								"aria-haspopup": P && !Y ? "dialog" : void 0,
								title: Y ? "Cancel the call" : void 0,
								"data-testid": "call-dock-leave",
								className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5",
								children: [/* @__PURE__ */ U(y, { size: 16 }), Y ? "Cancel" : "Leave"]
							})]
						}),
						/* @__PURE__ */ W(ee, {
							trigger: se,
							open: ce,
							onClose: () => le(!1),
							placement: "bottom-end",
							"aria-label": "Leave the call",
							"data-testid": "call-dock-leave-confirm",
							className: "w-64 p-3",
							children: [/* @__PURE__ */ U("p", {
								className: "m-0 mb-3 text-sm text-text-primary",
								children: "Leave the call? Others stay on."
							}), /* @__PURE__ */ W("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ U(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										le(!1), te();
									},
									"data-testid": "call-dock-leave-confirm-leave",
									children: "Leave"
								}), /* @__PURE__ */ U(t, {
									variant: "danger-solid",
									size: "sm",
									onClick: () => {
										le(!1), F?.();
									},
									"data-testid": "call-dock-end-for-everyone",
									children: "End for everyone"
								})]
							})]
						})
					]
				})]
			}), ve]
		})
	});
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function dt({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
	return /* @__PURE__ */ W("button", {
		"data-ui-part": "",
		type: "button",
		onClick: a,
		disabled: r,
		"aria-pressed": n,
		title: t,
		"data-testid": s,
		className: e("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap shrink-0", "transition-colors duration-150", i ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm", n ? "bg-call-chrome-accent text-white" : "bg-white/10 text-white hover:bg-white/20", r && "opacity-40 cursor-not-allowed", !r && "cursor-pointer"),
		children: [o && /* @__PURE__ */ U("span", {
			"aria-hidden": !0,
			className: e("rounded-full bg-cover bg-center shrink-0 border border-white/20", i ? "h-4 w-4" : "h-5 w-5"),
			style: { backgroundImage: `url(${o})` }
		}), t]
	});
}
function ft({ label: t, compact: n, children: r }) {
	return /* @__PURE__ */ W("section", {
		"data-ui-part": "",
		className: e("flex flex-col", n ? "gap-1.5" : "gap-2"),
		children: [/* @__PURE__ */ U("h3", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-white/60",
			children: t
		}), /* @__PURE__ */ U("div", {
			className: e("flex gap-2", n ? "items-center overflow-x-auto pb-1" : "flex-wrap"),
			children: r
		})]
	});
}
function pt({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: b, "data-testid": x }) {
	return p === "grid" ? /* @__PURE__ */ U(xt, {
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
	}) : /* @__PURE__ */ W("div", {
		"data-testid": x,
		className: e("flex flex-col text-white", f ? "gap-3 rounded-xl border border-call-chrome-border bg-call-chrome p-3" : "gap-4", b),
		children: [
			/* @__PURE__ */ U(ft, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ U(dt, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ W(ft, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ U(dt, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ U(dt, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ U(dt, {
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
			/* @__PURE__ */ W(ft, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ U(dt, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ U(dt, {
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
var mt = 5242880;
function ht(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function gt({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: ht(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ U(Ye, {
			stream: e,
			muted: !0,
			className: "h-full w-full scale-x-[-1] object-cover"
		}) : t ? /* @__PURE__ */ U("img", {
			src: t,
			alt: "",
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ U("span", { className: "block h-full w-full bg-gradient-to-br from-white/15 to-black/30" })
	});
}
function _t({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
	return /* @__PURE__ */ W("button", {
		"data-ui-part": "",
		type: "button",
		onClick: i,
		disabled: r,
		"aria-pressed": s ? void 0 : n,
		title: t,
		"data-testid": a,
		"data-active": n ? "true" : "false",
		className: e("group/thumb flex min-w-0 cursor-pointer flex-col gap-1 border-none bg-transparent p-0 text-left font-[inherit]", "disabled:cursor-not-allowed disabled:opacity-50"),
		children: [/* @__PURE__ */ U("span", {
			className: e("relative flex aspect-[101/50] w-full items-center justify-center overflow-hidden rounded-md", s ? "border border-dashed border-border-emphasis bg-surface text-text-tertiary" : "bg-video-tile", n ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : !s && "group-hover/thumb:ring-1 group-hover/thumb:ring-border-emphasis"),
			children: o
		}), /* @__PURE__ */ U("span", {
			className: e("truncate text-xs", s ? "text-primary" : "text-text-secondary"),
			children: t
		})]
	});
}
function vt(e) {
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
function yt({ children: e, action: t }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ U("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var bt = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function xt({ filters: n, activeFilterId: r, onSelectFilter: i, backgrounds: a, backgroundMode: o, activeBackgroundUrl: s, onSelectBackground: c, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p, columns: m, thumbnailStream: h, thumbnailSrc: g, filterLimit: _, onSelectCustomBackground: y, backgroundsUnsupported: b, className: x, "data-testid": S }) {
	let [C, w] = V(!1), [E, ee] = V(!1), D = B(null), O = bt[m] ?? "grid-cols-3", k = !C && n.length > _ + 1, A = k ? n.slice(0, _) : n, j = !E && u.length > 3, M = j ? u.slice(0, 2) : u, N = {
		stream: h,
		...g ? { src: g } : {}
	};
	return /* @__PURE__ */ W("div", {
		"data-testid": S,
		"data-layout": "grid",
		className: e("flex flex-col gap-3 text-text-primary", x),
		children: [
			/* @__PURE__ */ W("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-2",
				"aria-label": "Filter",
				children: [/* @__PURE__ */ U(yt, {
					action: /* @__PURE__ */ U(t, {
						variant: "link",
						onClick: () => i("none"),
						disabled: p,
						"data-testid": "effects-filter-reset",
						className: "text-sm",
						children: "Reset"
					}),
					children: "Filter"
				}), /* @__PURE__ */ W("div", {
					className: e("grid gap-x-3 gap-y-2", O),
					children: [A.map((e) => /* @__PURE__ */ U(_t, {
						label: e.label,
						active: e.id === r,
						disabled: p,
						onClick: () => i(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ U(gt, {
							...N,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), k && /* @__PURE__ */ W(_t, {
						label: "More...",
						active: !1,
						disabled: p,
						onClick: () => w(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ U(gt, {
							...N,
							filter: "blur(3px)"
						}), /* @__PURE__ */ U("span", {
							className: "relative text-white",
							children: /* @__PURE__ */ U(v, { size: 22 })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ W("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-2",
				"aria-label": "Background",
				children: [/* @__PURE__ */ U(yt, { children: "Background" }), b ? /* @__PURE__ */ U(P, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ W("div", {
					className: e("grid gap-x-3 gap-y-2", O),
					children: [
						/* @__PURE__ */ U(_t, {
							label: "None",
							active: o === "none",
							disabled: p,
							onClick: () => c("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ U(gt, { ...N })
						}),
						/* @__PURE__ */ U(_t, {
							label: "Blur",
							active: o === "blur",
							disabled: p,
							onClick: () => c("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ U(gt, {
								...N,
								filter: "blur(4px)"
							})
						}),
						a.map((e) => /* @__PURE__ */ U(_t, {
							label: e.label,
							active: o === "image" && s === e.url,
							disabled: p,
							onClick: () => c("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ U(gt, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						y && /* @__PURE__ */ W(_t, {
							label: "+ Custom",
							active: !1,
							disabled: p,
							dashed: !0,
							onClick: () => D.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ U(l, { size: 22 }), /* @__PURE__ */ U("input", {
								"data-ui-part": "",
								ref: D,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= mt && y(t);
								}
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ W("section", {
				"data-ui-part": "",
				className: "flex flex-col gap-2",
				"aria-label": "Face effects",
				children: [
					/* @__PURE__ */ U(yt, { children: "Face effects" }),
					/* @__PURE__ */ U(T, {
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
					u.length > 0 && /* @__PURE__ */ W("div", {
						className: e("-mt-0.5 grid gap-2", O),
						children: [M.map((t) => {
							let n = t.id === d, { glyph: r, text: i } = vt(t.label);
							return /* @__PURE__ */ W("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => f(n ? null : t.id),
								disabled: p,
								"aria-pressed": n,
								"data-testid": `effects-face-${t.id}`,
								className: e("flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary", "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50", n && "bg-primary-bg text-primary"),
								children: [/* @__PURE__ */ U("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-lg text-text-primary",
									children: t.icon ?? r ?? Array.from(i)[0]
								}), /* @__PURE__ */ U("span", {
									className: "truncate",
									children: t.icon ? t.label : i
								})]
							}, t.id);
						}), j && /* @__PURE__ */ W("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => ee(!0),
							disabled: p,
							"data-testid": "effects-face-more",
							className: "flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-none bg-transparent py-0.5 font-[inherit] text-xs text-text-secondary hover:bg-surface-hover",
							children: [/* @__PURE__ */ U("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-inset text-text-primary",
								children: /* @__PURE__ */ U(v, { size: 20 })
							}), /* @__PURE__ */ U("span", { children: "More" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/video/MediaEffectsPreviewPanel.tsx
function St(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function Ct({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: b = "chrome", showFooter: x = !0, hint: S = "Changes appear in the call after Apply.", thumbnailSrc: C, onSelectCustomBackground: w, backgroundsUnsupported: T = !1, className: E, "data-testid": ee = "media-effects-preview-panel" }) {
	let D = (e) => St(n, e), O = n && i && !_;
	return b === "surface" ? /* @__PURE__ */ W("section", {
		"data-ui-part": "",
		"data-testid": ee,
		"data-variant": "surface",
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-text-primary", E),
		children: [
			/* @__PURE__ */ W("div", {
				"data-testid": "effects-preview",
				className: "relative aspect-[338/161] w-full shrink-0 overflow-hidden rounded-lg bg-video-stage",
				children: [r ? /* @__PURE__ */ U("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ U(Ye, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ U("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full items-center justify-center px-6 text-center text-sm text-white/70",
					children: n ? "Turn the camera on to preview effects" : "Preview is not running"
				}), /* @__PURE__ */ U("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
					children: "Preview · Only you"
				})]
			}),
			S != null && /* @__PURE__ */ U("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 text-xs text-text-secondary",
				children: S
			}),
			/* @__PURE__ */ U(pt, {
				"data-testid": "media-effects-preview-tray",
				layout: "grid",
				className: "mt-1.5",
				disabled: _ || !n,
				thumbnailStream: r,
				...C ? { thumbnailSrc: C } : {},
				...w ? { onSelectCustomBackground: D(w) } : {},
				backgroundsUnsupported: T,
				filters: s,
				activeFilterId: c,
				onSelectFilter: D(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: D(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: D(g)
			}),
			x && /* @__PURE__ */ W("footer", {
				className: "mt-2 flex items-center justify-end gap-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ U("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-sm text-text-tertiary",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ U(t, {
						variant: "ghost",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						children: "Cancel"
					}),
					/* @__PURE__ */ U(t, {
						onClick: a,
						disabled: !O,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ W("section", {
		"data-ui-part": "",
		"data-testid": ee,
		"data-preview-active": n ? "true" : "false",
		"data-preview-dirty": i ? "true" : "false",
		"aria-label": v,
		className: e("flex flex-col gap-3 text-white", E),
		children: [
			/* @__PURE__ */ W("div", {
				"data-testid": "media-effects-preview-stage",
				className: "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-video-stage",
				children: [r ? /* @__PURE__ */ U("div", {
					"data-testid": "media-effects-preview-video",
					className: "h-full w-full",
					children: /* @__PURE__ */ U(Ye, {
						stream: r,
						muted: !0,
						className: "h-full w-full scale-x-[-1] object-cover"
					})
				}) : /* @__PURE__ */ W("div", {
					"data-testid": "media-effects-preview-empty",
					className: "flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50",
					children: [/* @__PURE__ */ U("span", {
						"aria-hidden": !0,
						className: "text-2xl",
						children: "📷"
					}), n ? "Starting preview…" : "Camera off"]
				}), /* @__PURE__ */ U("span", {
					"data-testid": "media-effects-preview-badge",
					className: "absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white",
					children: "Preview — only you"
				})]
			}),
			/* @__PURE__ */ U("p", {
				"data-testid": "media-effects-preview-notice",
				className: "m-0 rounded-lg bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/80",
				children: n ? `This preview is private. Nobody else in the call can see these effects until you choose ${y}.` : "Preview is not running, so these controls are read-only. Nothing here is shared with the call."
			}),
			/* @__PURE__ */ U(pt, {
				"data-testid": "media-effects-preview-tray",
				disabled: _ || !n,
				filters: s,
				activeFilterId: c,
				onSelectFilter: D(l),
				backgrounds: u,
				backgroundMode: d,
				activeBackgroundUrl: f,
				onSelectBackground: D(p),
				faceSprites: m,
				activeFaceSpriteId: h,
				onSelectFaceSprite: D(g)
			}),
			x && /* @__PURE__ */ W("footer", {
				className: "sticky bottom-0 z-10 -mx-1 mt-auto flex shrink-0 items-center justify-end gap-3 border-t border-call-chrome-border bg-call-chrome px-1 pb-1 pt-3",
				children: [
					/* @__PURE__ */ U("span", {
						"data-testid": "media-effects-preview-status",
						className: "mr-auto text-[12px] text-white/60",
						children: i ? "Not shared yet" : "Nothing to apply"
					}),
					/* @__PURE__ */ U("button", {
						"data-ui-part": "",
						type: "button",
						onClick: o,
						"data-testid": "media-effects-preview-cancel",
						className: "cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
						children: "Cancel"
					}),
					/* @__PURE__ */ U("button", {
						"data-ui-part": "",
						type: "button",
						onClick: a,
						disabled: !O,
						"data-testid": "media-effects-preview-apply",
						className: e("rounded-lg border-none px-4 py-1.5 text-[13px] font-semibold transition-colors", O ? "cursor-pointer bg-call-chrome-accent text-white hover:bg-call-chrome-accent-hover" : "cursor-not-allowed bg-white/10 text-white/40"),
						children: y
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/video/useHlsSource.ts
var wt = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function Tt(e) {
	return e ? wt[e.kind] : null;
}
function Et(e) {
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
var Dt = 3e3, Ot = 1e3, kt = 1500, At = 8e3, jt = .5;
function Mt(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = At } = n, [a, o] = V(null), s = Tt(a), [c, l] = V(!1), [u, d] = V(!1), [f, p] = V(!1), [m, h] = V(null), [g, _] = V(null), [v, y] = V(0), b = B(null), x = B(!1), S = B(0), C = B(n.onError);
	R(() => {
		C.current = n.onError;
	}, [n.onError]);
	let w = ie(() => {
		o(null), d(!1), p(!1), y((e) => e + 1);
	}, []), T = ie(() => {
		let t = e.current;
		if (t) try {
			let e = b.current, n = e && typeof e.liveSyncPosition == "number" && Number.isFinite(e.liveSyncPosition) ? e.liveSyncPosition : t.seekable && t.seekable.length > 0 ? t.seekable.end(t.seekable.length - 1) : null;
			n !== null && (t.currentTime = n), t.play?.().catch(() => {});
		} catch {}
	}, [e]);
	return R(() => {
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
						let e = Et(n);
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
	]), R(() => {
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
			if (!(e - S.current < Dt)) {
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
	]), R(() => {
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
				return t !== null && Math.abs(t - n) < jt ? t : n;
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
			s >= i ? p(!0) : s >= kt && d(!0);
		}, Ot);
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
var Nt = 80, Pt = .6;
function Ft(e) {
	let [t, n] = V(null), r = B(0);
	return R(() => {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * Pt);
			r.current = c, n(c);
		}, Nt);
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
var It = [
	.55,
	.8,
	1,
	.8,
	.55
], Lt = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], Rt = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], zt = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function Bt(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return Lt[Math.min(Lt.length - 1, Math.round(n * (Lt.length - 1)))];
}
function Vt({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: s, "data-testid": c = "stream-audio-only" }) {
	let l = typeof r == "number" && i, u = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ W("div", {
		"data-testid": c,
		"data-measured": String(l),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", s),
		children: [
			t ? /* @__PURE__ */ U(A, {
				name: t,
				src: n,
				size: 64
			}) : /* @__PURE__ */ U("div", {
				"aria-hidden": !0,
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl",
				children: "🎙"
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-col items-center gap-1",
				children: [/* @__PURE__ */ U("span", {
					className: "text-sm font-medium text-white",
					children: t ?? "Audio only"
				}), /* @__PURE__ */ U("span", {
					"data-testid": `${c}-hint`,
					className: "text-xs text-white/60",
					children: u
				})]
			}),
			/* @__PURE__ */ U("div", {
				"data-testid": `${c}-meter`,
				"aria-hidden": !0,
				className: "flex h-10 items-end gap-1",
				children: It.map((t, n) => /* @__PURE__ */ U("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !l && i && ["uic-audio-bar", zt[n]], l ? Bt(r, t) : Rt[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function Ht({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function Ut(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function Wt(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function Gt(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Kt({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = oe(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: Gt(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ U("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ U(F, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var qt = 1e4;
function Jt(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !qe(e);
}
var Yt = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function Xt({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = qt, chatMessages: m, chatVisibleCount: h, chatRotateMs: g, muted: _ = !0, allowFullscreen: v = !0, showLatency: y = !0, controls: b, placeholder: x, className: S, "data-testid": C = "stream-stage" }) {
	let [w, T] = V(_);
	R(() => {
		T(_);
	}, [_]);
	let E = B(null), ee = B(null), D = Mt(ee, t ? null : n, {
		live: !0,
		onError: r
	}), O = B(!1);
	(t || n) && (O.current = !0);
	let k = Ke(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), A = oe(() => Jt(t), [t, k]), j = oe(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, k]), M = !!t && j !== !1 || !!n && !D.loading, [N, te] = V(!1);
	R(() => {
		if (te(!1), M || D.error) return;
		let e = setTimeout(() => te(!0), p);
		return () => clearTimeout(e);
	}, [
		M,
		D.error,
		p
	]);
	let P = Ht({
		hasStream: !!t,
		streamHasTracks: j,
		hasPlaylist: !!n,
		hadSource: O.current,
		graceExpired: N,
		hls: D
	}), F = D.failure ?? null, ne = B(!1);
	P === "playing" && (ne.current = !0);
	let I = P === "error" && F?.kind === "no-broadcast" ? ne.current ? "ended" : "not-started" : P, re = I === "ended" ? P === "ended" ? "withdrawn" : "stopped" : null, L = s && Ut(I), z = t ? A : D.audioOnly === !0, ae = (c ?? z) && (I === "playing" || I === "buffering" || I === "stalled"), H = Ft(ae && t ? t : null), [G, K] = V(!1);
	R(() => {
		if (typeof document > "u") return;
		let e = () => K(document.fullscreenElement === E.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let q = ie(() => {
		let e = E.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), J = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), se = D.retry, ce = ie(() => {
		se?.(), i?.();
	}, [se, i]), le = !!(t || n), ue = !!n && !t, de = le && I !== "error" && I !== "not-started" && I !== "ended", fe = de || !!b, pe = !F || F.retryable, Y = (ue || !!i) && pe, X = F?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ W("div", {
		ref: E,
		"data-testid": C,
		"data-live": String(L),
		"data-phase": I,
		"data-audio-only": String(ae),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": F?.kind,
		"data-error-detail": F?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ U(Ye, {
				stream: t,
				muted: w,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ U("video", {
				ref: ee,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: w,
				className: "h-full w-full object-contain"
			}) : null,
			ae && /* @__PURE__ */ U(Vt, {
				"data-testid": `${C}-audio-only`,
				name: l,
				avatarUrl: u,
				level: H,
				active: I !== "stalled" && !w,
				muted: w
			}),
			I === "idle" && /* @__PURE__ */ U(Zt, {
				testId: `${C}-placeholder`,
				children: x ?? "Waiting for the stream to start…"
			}),
			I === "ended" && /* @__PURE__ */ W(Zt, {
				testId: `${C}-ended`,
				"data-ended-reason": re,
				children: [
					/* @__PURE__ */ U("span", { children: f ?? (re === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					re === "stopped" && !f && /* @__PURE__ */ U("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					re === "stopped" ? Y && /* @__PURE__ */ U(Qt, {
						testId: `${C}-retry`,
						label: "Try again",
						onClick: ce
					}) : i && /* @__PURE__ */ U(Qt, {
						testId: `${C}-retry`,
						label: "Check again",
						onClick: ce
					})
				]
			}),
			I === "not-started" && /* @__PURE__ */ W(Zt, {
				testId: `${C}-not-started`,
				children: [/* @__PURE__ */ U("span", { children: d ?? "Nothing is being broadcast right now." }), Y && /* @__PURE__ */ U(Qt, {
					testId: `${C}-retry`,
					label: X,
					onClick: ce
				})]
			}),
			I === "connecting" && /* @__PURE__ */ U(Zt, {
				testId: `${C}-connecting`,
				children: "Connecting…"
			}),
			I === "buffering" && /* @__PURE__ */ U("div", {
				"data-testid": `${C}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			I === "stalled" && /* @__PURE__ */ W(Zt, {
				testId: `${C}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ U("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ U("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					Y && /* @__PURE__ */ U(Qt, {
						testId: `${C}-retry`,
						onClick: ce
					})
				]
			}),
			I === "error" && /* @__PURE__ */ W(Zt, {
				testId: `${C}-error`,
				dim: !0,
				children: [/* @__PURE__ */ U("span", { children: D.error ?? "This stream could not be played." }), Y && /* @__PURE__ */ U(Qt, {
					testId: `${C}-retry`,
					label: X,
					onClick: ce
				})]
			}),
			(a || L || we(o)) && /* @__PURE__ */ W("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					L && /* @__PURE__ */ U("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ U("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					we(o) && /* @__PURE__ */ U(Te, { count: o })
				]
			}),
			m && m.length > 0 && /* @__PURE__ */ U(Kt, {
				messages: m,
				visibleCount: h,
				rotateMs: g,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			fe && /* @__PURE__ */ W("div", {
				"data-testid": `${C}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					de && ue && y && (I === "playing" || I === "buffering") && /* @__PURE__ */ U("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-latency`,
						onClick: () => D.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(Yt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof D.latencySec == "number" && Number.isFinite(D.latencySec) ? `${Math.max(1, Math.round(D.latencySec))}s behind` : "Behind live"
					}),
					de && L && /* @__PURE__ */ W("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-mute-toggle`,
						"aria-label": w ? "Unmute" : "Mute",
						"aria-pressed": w,
						onClick: () => T((e) => !e),
						className: e(Yt, w ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ U("span", {
							"aria-hidden": !0,
							children: w ? "🔇" : "🔊"
						}), w ? "Unmute" : "Mute"]
					}),
					de && v && J && /* @__PURE__ */ W("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-fullscreen`,
						"aria-label": G ? "Exit full screen" : "Full screen",
						"aria-pressed": G,
						onClick: q,
						className: e(Yt, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ U("span", {
							"aria-hidden": !0,
							children: G ? "↙" : "↗"
						}), G ? "Exit" : "Full screen"]
					}),
					b
				]
			})
		]
	});
}
function Zt({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function Qt({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ U("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(Yt, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function $t({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
	let s = Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0, c = i ? 0 : Math.round(s * n), l = Math.round(s * 100);
	return /* @__PURE__ */ U("div", {
		role: "meter",
		"aria-label": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": i ? 0 : l,
		"data-testid": o,
		"data-lit": c,
		className: e("inline-flex items-center gap-[3px]", a),
		children: Array.from({ length: n }, (t, n) => /* @__PURE__ */ U("span", {
			"aria-hidden": "true",
			className: e("h-3.5 w-1.5 rounded-[2px] transition-colors duration-75", n < c ? "bg-success" : "bg-border")
		}, n))
	});
}
//#endregion
//#region src/components/video/VolumeSlider.tsx
function en({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: o = !1, muted: s = !1, disabled: c = !1, className: l, "data-testid": u = "settings-volume", testButtonTestId: f = "settings-test-sound" }) {
	let p = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ W("div", {
		className: e("flex items-center gap-3", l),
		children: [
			/* @__PURE__ */ U(d, {
				size: 20,
				className: e("shrink-0", s ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ U(k, {
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
			i && /* @__PURE__ */ U(t, {
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
//#region src/components/video/PreJoinDeviceSetup.tsx
function tn({ value: e, onChange: n, devices: r, permission: i, micLevel: a, cameraOn: o, speakerSelectionSupported: s, onTestMic: c, onTestSound: l, testMicState: u = "idle", preview: f, previewControls: m, selfName: g = "You", className: _, "data-testid": v = "audio-video-settings-form" }) {
	let y = (t) => n({
		...e,
		...t
	}), b = (t, n, a) => {
		let o = t === "camera" ? r.cameras : t === "microphone" ? r.microphones : r.speakers, s = t === "camera" ? "cameraId" : t === "microphone" ? "microphoneId" : "speakerId", c = t !== "speaker" && i[t] === "denied", l = t === "microphone" ? "mic" : t;
		return /* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-col gap-2",
			children: [/* @__PURE__ */ U("label", {
				htmlFor: `${v}-${l}`,
				className: "text-sm font-semibold text-text-primary",
				children: n
			}), c ? /* @__PURE__ */ W(P, {
				tone: "error",
				"data-testid": `settings-${l}-denied`,
				children: [n, " blocked — allow it in the browser’s site settings"]
			}) : /* @__PURE__ */ U(T, {
				id: `${v}-${l}`,
				value: e[s] ?? o[0]?.deviceId ?? "",
				onChange: (e) => y({ [s]: e.target.value }),
				disabled: !o.length,
				options: o.length ? o.map((e) => ({
					value: e.deviceId,
					label: e.label,
					icon: a
				})) : [{
					value: "",
					label: `No ${t} found`,
					disabled: !0,
					icon: a
				}],
				className: "h-10 w-full min-w-0 bg-surface text-sm",
				"data-testid": `settings-${l}-select`
			})]
		});
	};
	return /* @__PURE__ */ W("div", {
		className: `grid min-w-0 grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] ${_ ?? ""}`,
		"data-testid": v,
		"data-layout": "prejoin",
		children: [/* @__PURE__ */ W("section", {
			"data-ui-part": "",
			className: "flex min-w-0 flex-col gap-3",
			"aria-label": "Camera preview",
			children: [
				/* @__PURE__ */ W("div", {
					className: "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-video-stage",
					"data-testid": "settings-preview",
					"data-mirrored": e.mirrorPreview ? "true" : "false",
					children: [f, /* @__PURE__ */ W("span", {
						className: "absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-md bg-black/65 px-2 py-1 text-xs font-medium text-white",
						children: [g, " · Your preview"]
					})]
				}),
				/* @__PURE__ */ W("div", {
					role: "group",
					"aria-label": "Preview controls",
					className: "flex min-w-0 flex-wrap items-center gap-2",
					"data-testid": "prejoin-preview-controls",
					children: [m, /* @__PURE__ */ U(t, {
						size: "sm",
						variant: "secondary",
						"aria-pressed": e.mirrorPreview,
						onClick: () => y({ mirrorPreview: !e.mirrorPreview }),
						"data-testid": "settings-mirror",
						children: "Mirror"
					})]
				}),
				/* @__PURE__ */ U("span", {
					className: "text-xs text-text-secondary",
					children: o ? "Your camera is on. This is how you’ll appear in the huddle." : "Your camera is off. You can turn it on when you’re ready."
				})
			]
		}), /* @__PURE__ */ W("section", {
			"data-ui-part": "",
			className: "flex min-w-0 flex-col gap-4",
			"aria-label": "Device setup",
			children: [
				b("camera", "Camera", /* @__PURE__ */ U(p, { size: 16 })),
				/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col gap-2",
					children: [b("microphone", "Microphone", /* @__PURE__ */ U(h, { size: 16 })), /* @__PURE__ */ W(S, {
						summary: "Microphone test & settings",
						variant: "plain",
						density: "compact",
						"data-testid": "settings-mic-test-panel",
						bodyClassName: "flex min-w-0 flex-col gap-3 pt-3",
						children: [/* @__PURE__ */ W("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ U($t, {
								level: a,
								disabled: i.microphone === "denied",
								"data-testid": "settings-mic-level"
							}), /* @__PURE__ */ U(t, {
								size: "sm",
								variant: "secondary",
								onClick: () => void c(),
								disabled: i.microphone === "denied" || u !== "idle",
								"data-testid": "settings-test-mic",
								children: u === "recording" ? "Recording…" : u === "playing" ? "Playing…" : "Test mic"
							})]
						}), /* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3 text-sm text-text-secondary",
							children: [/* @__PURE__ */ U("span", { children: "Noise reduction" }), /* @__PURE__ */ U(M, {
								checked: e.noiseSuppression,
								onChange: (e) => y({ noiseSuppression: e }),
								"aria-label": "Noise reduction",
								"data-testid": "settings-noise"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col gap-2",
					children: [s && b("speaker", "Speakers", /* @__PURE__ */ U(d, { size: 16 })), /* @__PURE__ */ U(S, {
						summary: "Speaker test & volume",
						variant: "plain",
						density: "compact",
						"data-testid": "settings-speaker-test-panel",
						bodyClassName: "pt-3",
						children: /* @__PURE__ */ U(en, {
							value: e.volume,
							onChange: (e) => y({ volume: e }),
							onTest: () => void l()
						})
					})]
				}),
				/* @__PURE__ */ W(S, {
					summary: "Advanced settings",
					variant: "plain",
					density: "compact",
					"data-testid": "settings-advanced",
					bodyClassName: "flex min-w-0 flex-col gap-3 pt-3",
					children: [
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3 text-sm text-text-secondary",
							children: [/* @__PURE__ */ U("span", { children: "Echo cancellation" }), /* @__PURE__ */ U(M, {
								checked: e.echoCancellation,
								onChange: (e) => y({ echoCancellation: e }),
								"aria-label": "Echo cancellation",
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3 text-sm text-text-secondary",
							children: [/* @__PURE__ */ U("span", { children: "Auto gain control" }), /* @__PURE__ */ U(M, {
								checked: e.autoGainControl,
								onChange: (e) => y({ autoGainControl: e }),
								"aria-label": "Auto gain control",
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ U(T, {
							"aria-label": "Video quality",
							value: e.quality,
							onChange: (e) => y({ quality: e.target.value }),
							options: [
								"auto",
								"720p",
								"480p",
								"360p"
							].map((e) => ({
								value: e,
								label: e === "auto" ? "Quality · Auto" : `Quality · ${e}`
							})),
							className: "w-full",
							"data-testid": "settings-quality"
						}),
						/* @__PURE__ */ U(T, {
							"aria-label": "Frame rate",
							value: String(e.frameRate),
							onChange: (e) => y({ frameRate: e.target.value === "auto" ? "auto" : Number(e.target.value) }),
							options: [
								"auto",
								"30",
								"15"
							].map((e) => ({
								value: e,
								label: e === "auto" ? "Frame rate · Auto" : `${e} fps`
							})),
							className: "w-full",
							"data-testid": "settings-frame-rate"
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/video/AudioVideoSettingsForm.tsx
var nn = [
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
], rn = [
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
function an(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function on({ children: t, divided: n = !0, className: r }) {
	return /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border", r),
		children: t
	});
}
function sn({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ U("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function cn({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ W("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ U(I, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function ln({ value: n, onChange: r, devices: i, permission: a, micLevel: o, previewStream: s, cameraOn: c, speakerSelectionSupported: l, onTestMic: u, onTestSound: d, testMicState: f = "idle", selfName: p = "You", selfAvatarUrl: m, layout: h = "stack", previewControls: g, className: _, "data-testid": v = "audio-video-settings-form" }) {
	let y = (e) => r({
		...n,
		...e
	}), b = a.microphone === "denied", x = a.camera === "denied", C = "w-full h-9 text-sm", w = f === "recording" ? "Recording…" : f === "playing" ? "Playing…" : "Test mic", E;
	return E = x ? null : c ? s ? /* @__PURE__ */ U(Ye, {
		stream: s,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ U("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ U(j, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ W("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ U(A, {
			name: p,
			size: 48,
			...m ? { src: m } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), h === "prejoin" ? /* @__PURE__ */ U(tn, {
		value: n,
		onChange: r,
		devices: i,
		permission: a,
		micLevel: o,
		previewStream: s,
		cameraOn: c,
		speakerSelectionSupported: l,
		onTestMic: u,
		onTestSound: d,
		testMicState: f,
		preview: E,
		previewControls: g,
		selfName: p,
		selfAvatarUrl: m,
		className: _,
		"data-testid": v
	}) : /* @__PURE__ */ W("div", {
		className: e("flex flex-col", _),
		"data-testid": v,
		"data-layout": h,
		children: [
			/* @__PURE__ */ W(on, { children: [
				/* @__PURE__ */ U(sn, {
					htmlFor: `${v}-mic`,
					children: "Microphone"
				}),
				b ? /* @__PURE__ */ U(P, {
					tone: "error",
					"data-testid": "settings-mic-denied",
					children: "Microphone blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${v}-mic`,
					value: n.microphoneId ?? i.microphones[0]?.deviceId ?? "",
					onChange: (e) => y({ microphoneId: e.target.value }),
					options: an(i.microphones, "No microphone found"),
					disabled: i.microphones.length === 0,
					className: C,
					"data-testid": "settings-mic-select"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ U("span", {
							className: "w-24 shrink-0 text-sm text-text-primary",
							children: "Input level"
						}),
						/* @__PURE__ */ U($t, {
							level: o,
							disabled: b,
							"data-testid": "settings-mic-level"
						}),
						/* @__PURE__ */ U(t, {
							variant: "ghost",
							onClick: () => void u(),
							disabled: b || f !== "idle",
							"data-testid": "settings-test-mic",
							className: "ml-auto shrink-0",
							children: w
						})
					]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ U("span", {
						id: `${v}-noise`,
						className: "text-sm text-text-primary",
						children: "Noise reduction"
					}), /* @__PURE__ */ U(M, {
						checked: n.noiseSuppression,
						onChange: (e) => y({ noiseSuppression: e }),
						disabled: b,
						"aria-labelledby": `${v}-noise`,
						"data-testid": "settings-noise"
					})]
				})
			] }),
			/* @__PURE__ */ W(on, { children: [
				l && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(sn, {
					htmlFor: `${v}-speaker`,
					children: "Speakers"
				}), /* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${v}-speaker`,
					value: n.speakerId ?? i.speakers[0]?.deviceId ?? "",
					onChange: (e) => y({ speakerId: e.target.value }),
					options: an(i.speakers, "No speakers found"),
					disabled: i.speakers.length === 0,
					className: C,
					"data-testid": "settings-speaker-select"
				})] }),
				!l && /* @__PURE__ */ U(sn, { children: "Volume" }),
				/* @__PURE__ */ U(en, {
					value: n.volume,
					onChange: (e) => y({ volume: e }),
					onTest: () => void d()
				})
			] }),
			/* @__PURE__ */ W(on, { children: [
				/* @__PURE__ */ U(sn, {
					htmlFor: `${v}-camera`,
					children: "Camera"
				}),
				x ? /* @__PURE__ */ U(P, {
					tone: "error",
					"data-testid": "settings-camera-denied",
					children: "Camera blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${v}-camera`,
					value: n.cameraId ?? i.cameras[0]?.deviceId ?? "",
					onChange: (e) => y({ cameraId: e.target.value }),
					options: an(i.cameras, "No camera found"),
					disabled: i.cameras.length === 0,
					className: C,
					"data-testid": "settings-camera-select"
				}), /* @__PURE__ */ W("div", {
					className: "relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage",
					"data-testid": "settings-preview",
					"data-mirrored": n.mirrorPreview ? "true" : "false",
					children: [E, /* @__PURE__ */ U("span", {
						className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
						children: "Your preview"
					})]
				})] }),
				/* @__PURE__ */ U(cn, {
					checked: n.mirrorPreview,
					onChange: (e) => y({ mirrorPreview: e }),
					testId: "settings-mirror",
					children: "Mirror my preview"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ U("label", {
						htmlFor: `${v}-quality`,
						className: "text-sm text-text-primary",
						children: "Quality"
					}), /* @__PURE__ */ U(T, {
						chevron: "custom",
						id: `${v}-quality`,
						value: n.quality,
						onChange: (e) => y({ quality: e.target.value }),
						options: nn,
						className: "h-9 w-full text-sm",
						wrapperClassName: "w-32 shrink-0",
						"data-testid": "settings-quality"
					})]
				})
			] }),
			/* @__PURE__ */ U(on, {
				className: "py-1.5",
				children: /* @__PURE__ */ W(S, {
					summary: "Advanced",
					variant: "plain",
					density: "compact",
					"data-testid": "settings-advanced",
					summaryClassName: "text-[15px] font-medium text-text-primary",
					bodyClassName: "flex flex-col gap-3 pt-3",
					children: [
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ U("span", {
								id: `${v}-echo`,
								className: "text-sm text-text-primary",
								children: "Echo cancellation"
							}), /* @__PURE__ */ U(M, {
								checked: n.echoCancellation,
								onChange: (e) => y({ echoCancellation: e }),
								"aria-labelledby": `${v}-echo`,
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ U("span", {
								id: `${v}-agc`,
								className: "text-sm text-text-primary",
								children: "Auto gain control"
							}), /* @__PURE__ */ U(M, {
								checked: n.autoGainControl,
								onChange: (e) => y({ autoGainControl: e }),
								"aria-labelledby": `${v}-agc`,
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ U("label", {
								htmlFor: `${v}-fps`,
								className: "text-sm text-text-primary",
								children: "Frame rate"
							}), /* @__PURE__ */ U(T, {
								chevron: "custom",
								id: `${v}-fps`,
								value: String(n.frameRate),
								onChange: (e) => {
									let t = e.target.value;
									y({ frameRate: t === "auto" ? "auto" : Number(t) });
								},
								options: rn,
								className: "h-9 w-full text-sm",
								wrapperClassName: "w-32 shrink-0",
								"data-testid": "settings-frame-rate"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ U(on, {
				divided: !1,
				className: "pt-2.5 pb-0",
				children: /* @__PURE__ */ U(cn, {
					checked: n.rememberDevices,
					onChange: (e) => y({ rememberDevices: e }),
					testId: "settings-remember",
					children: "Use these devices next time"
				})
			})
		]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomBanner.tsx
function un(e, t = 0) {
	let n = e ? Date.parse(e) : NaN, [r, i] = V(() => Date.now());
	return R(() => {
		if (!Number.isFinite(n)) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [n]), Number.isFinite(n) ? Math.max(0, n - (r + t)) : null;
}
function dn({ roomName: n, endsAt: a, clockOffsetMs: o = 0, closing: s = !1, announcement: l, onDismissAnnouncement: u, onReturnToMain: d, className: f, "data-testid": p = "breakout-banner" }) {
	let m = un(a, o), h = m !== null && (s || m <= 6e4);
	return /* @__PURE__ */ W("div", {
		role: "region",
		"aria-label": `Breakout room: ${n}`,
		"data-testid": p,
		className: e("flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg", f),
		children: [/* @__PURE__ */ W("div", {
			className: "flex flex-wrap items-center gap-x-3 gap-y-1",
			children: [
				/* @__PURE__ */ U(fe, {
					size: 18,
					className: "shrink-0"
				}),
				/* @__PURE__ */ W(r, {
					size: "sm",
					weight: "semibold",
					tone: "inherit",
					className: "min-w-0 truncate",
					children: ["You're in ", n]
				}),
				m !== null && /* @__PURE__ */ U(r, {
					size: "sm",
					tone: "inherit",
					tabular: !0,
					weight: h ? "semibold" : void 0,
					"data-testid": `${p}-countdown`,
					"data-urgent": h ? "true" : void 0,
					"data-closing": s ? "true" : void 0,
					className: e(h && "text-danger"),
					children: s ? `Room closes in ${at(m)}` : `${at(m)} left`
				}),
				/* @__PURE__ */ U("span", {
					role: "status",
					"aria-live": "polite",
					className: "sr-only",
					"data-testid": `${p}-closing-status`,
					children: s ? "The organizer is closing the breakout rooms. You will return to the main meeting shortly." : ""
				}),
				/* @__PURE__ */ U("span", { className: "flex-1" }),
				d && /* @__PURE__ */ U(t, {
					variant: "secondary",
					size: "sm",
					onClick: d,
					"data-testid": `${p}-return`,
					children: "Return to main meeting"
				})
			]
		}), l && /* @__PURE__ */ W("div", {
			className: "flex items-start gap-2",
			"data-testid": `${p}-announcement`,
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ W(r, {
				size: "sm",
				tone: "inherit",
				className: "block min-w-0 flex-1",
				children: [
					/* @__PURE__ */ W("strong", { children: [l.fromDisplayName, ":"] }),
					" ",
					l.message
				]
			}), u && /* @__PURE__ */ U(i, {
				"aria-label": "Dismiss announcement",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(c, {}),
				onClick: u,
				"data-testid": `${p}-announcement-dismiss`
			})]
		})]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomsPanel.tsx
var fn = [
	5,
	10,
	15,
	30,
	60
], pn = 50, mn = 80;
function hn({ room: e, mine: n, canJoin: a, canReturn: o, isOrganizer: s, rooms: c, onJoin: l, onReturnToMain: d, onAssign: f, onToggleRoom: p, onRenameRoom: m }) {
	let [h, g] = V(!1), _ = z(), v = e.state === "open";
	return /* @__PURE__ */ W("li", {
		className: "border-b border-border-subtle last:border-b-0",
		"data-testid": "breakout-room",
		"data-room-id": e.id,
		"data-room-state": e.state,
		"data-mine": n ? "true" : void 0,
		children: [/* @__PURE__ */ W("div", {
			className: "flex min-h-9 items-center gap-1.5 px-2 py-0.5",
			children: [
				/* @__PURE__ */ U(i, {
					"aria-label": h ? `Hide people in ${e.name}` : `Show people in ${e.name}`,
					"aria-expanded": h,
					"aria-controls": _,
					variant: "ghost",
					size: "sm",
					onClick: () => g((e) => !e),
					"data-testid": "breakout-room-expand",
					children: /* @__PURE__ */ U(u, {
						size: 14,
						dir: h ? "down" : "right"
					})
				}),
				/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [s && m ? /* @__PURE__ */ U(re, {
						value: e.name,
						onCommit: (t) => m(e.id, t),
						label: "Room name",
						maxLength: mn,
						required: !0,
						className: "-ml-1 min-w-0",
						"data-testid": "breakout-room-name"
					}) : /* @__PURE__ */ U(r, {
						size: "sm",
						tone: "primary",
						className: "min-w-0 truncate",
						title: e.name,
						children: e.name
					}), /* @__PURE__ */ W(r, {
						size: "xs",
						tone: "secondary",
						className: "shrink-0 items-center gap-1",
						"data-testid": "breakout-room-status",
						children: [
							/* @__PURE__ */ U(te, {
								size: "sm",
								color: v ? "var(--color-success)" : void 0
							}),
							v ? "Open" : "Closed",
							e.members.length > 0 && /* @__PURE__ */ W("span", { children: ["· ", e.members.length] })
						]
					})]
				}),
				s && p && /* @__PURE__ */ U(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => p(e.id, v ? "closed" : "open"),
					"data-testid": "breakout-room-toggle",
					children: v ? "Close" : "Open"
				}),
				n && o && d && /* @__PURE__ */ U(t, {
					variant: "secondary",
					size: "sm",
					onClick: d,
					"data-testid": "breakout-room-leave",
					children: "Leave"
				}),
				n && !o && /* @__PURE__ */ U(r, {
					size: "xs",
					tone: "secondary",
					className: "shrink-0",
					"data-testid": "breakout-room-here",
					children: "You're here"
				}),
				!n && a && l && /* @__PURE__ */ U(t, {
					variant: "secondary",
					size: "sm",
					onClick: () => l(e.id),
					"data-testid": "breakout-room-join",
					children: "Join"
				})
			]
		}), h && /* @__PURE__ */ W("ul", {
			id: _,
			className: "flex flex-col gap-0.5 pb-2 pl-10 pr-2",
			"data-testid": "breakout-room-members",
			children: [e.members.length === 0 && /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U(r, {
				size: "xs",
				tone: "tertiary",
				children: "Nobody yet"
			}) }), e.members.map((t) => /* @__PURE__ */ W("li", {
				className: "flex items-center gap-2",
				"data-testid": "breakout-member",
				"data-user-id": t.id,
				children: [
					/* @__PURE__ */ U(A, {
						name: t.name,
						src: t.avatarUrl,
						size: 20
					}),
					/* @__PURE__ */ U(r, {
						size: "sm",
						className: "min-w-0 flex-1 truncate",
						children: t.name
					}),
					/* @__PURE__ */ U(Z, { raised: t.handRaised }),
					s && f && /* @__PURE__ */ U(gn, {
						person: t,
						rooms: c,
						current: e.id,
						onAssign: f
					})
				]
			}, t.id))]
		})]
	});
}
function gn({ person: e, rooms: t, current: n, onAssign: r }) {
	return /* @__PURE__ */ U(T, {
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
function _n({ onCreateRooms: e }) {
	let [n, i] = V(3), [a, o] = V("assigned");
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-2 border-b border-border px-3 py-2.5",
		"data-testid": "breakout-create",
		children: [
			/* @__PURE__ */ U(r, {
				size: "sm",
				tone: "secondary",
				className: "block",
				children: "Split the meeting into smaller rooms."
			}),
			/* @__PURE__ */ W("label", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ U(r, {
					size: "sm",
					children: "Rooms"
				}), /* @__PURE__ */ U(ne, {
					value: n,
					onChange: i,
					min: 1,
					max: 50,
					size: "sm",
					"aria-label": "Number of rooms",
					"data-testid": "breakout-create-count"
				})]
			}),
			/* @__PURE__ */ U(O, {
				"aria-label": "How people get into rooms",
				size: "sm",
				fullWidth: !0,
				value: a,
				onChange: (e) => o(e),
				options: [{
					value: "assigned",
					label: "I assign people"
				}, {
					value: "self-select",
					label: "People choose"
				}],
				"data-testid": "breakout-create-mode"
			}),
			/* @__PURE__ */ U(t, {
				variant: "primary",
				size: "sm",
				onClick: () => e(Math.max(1, Math.min(50, Math.round(n || 1))), a),
				"data-testid": "breakout-create-submit",
				children: "Create rooms"
			})
		]
	});
}
function vn(n) {
	let { phase: i, mode: a, rooms: o, onOpenRooms: s, onCloseRooms: c, onAutoAssign: l, onSetTimer: u, onBroadcast: d, announceIn: f = "chat", onEnd: p, onDeleteRooms: m, onAddRoom: h, left: g, timerMinutes: _ = fn, maxRooms: v = pn, closing: y = !1, folded: b } = n, [x, S] = V(""), C = o.some((e) => e.state === "open"), w = () => {
		let e = x.trim();
		!e || !d || (d(e), S(""));
	};
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-2 border-b border-border px-3 py-2",
		"data-testid": "breakout-controls",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					y && C ? /* @__PURE__ */ W(H, { children: [c && /* @__PURE__ */ U(t, {
						variant: "danger",
						size: "sm",
						onClick: () => c(),
						"data-testid": "breakout-close-now",
						children: "Close now"
					}), s && /* @__PURE__ */ U(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-keep-open",
						children: "Keep rooms open"
					})] }) : C ? c && /* @__PURE__ */ U(t, {
						variant: "secondary",
						size: "sm",
						onClick: () => c(),
						"data-testid": "breakout-close-all",
						children: "Close rooms"
					}) : s && /* @__PURE__ */ U(t, {
						variant: "primary",
						size: "sm",
						onClick: () => s(),
						"data-testid": "breakout-open-all",
						children: "Open rooms"
					}),
					h && /* @__PURE__ */ U(t, {
						variant: "secondary",
						size: "sm",
						onClick: h,
						disabled: o.length >= v,
						title: o.length >= v ? `At most ${v} rooms` : void 0,
						"data-testid": "breakout-add-room",
						children: "Add room"
					}),
					a === "assigned" && l && /* @__PURE__ */ U(t, {
						variant: "secondary",
						size: "sm",
						onClick: l,
						"data-testid": "breakout-auto-assign",
						children: "Assign automatically"
					}),
					p && i === "open" && !y && /* @__PURE__ */ U(t, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						className: "text-danger",
						"data-testid": "breakout-end",
						children: "End breakout rooms"
					}),
					m && i === "draft" && !b && /* @__PURE__ */ U(t, {
						variant: "ghost",
						size: "sm",
						onClick: m,
						className: "text-danger",
						"data-testid": "breakout-delete",
						children: "Delete rooms"
					})
				]
			}),
			u && /* @__PURE__ */ W("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ U(r, {
					size: "sm",
					children: "Timer"
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [g !== null && /* @__PURE__ */ U(r, {
						size: "sm",
						tone: y ? "inherit" : "secondary",
						tabular: !0,
						weight: y ? "semibold" : void 0,
						className: e(y && "text-danger"),
						"data-testid": "breakout-timer-left",
						children: y ? `Closing in ${at(g)}` : `${at(g)} left`
					}), /* @__PURE__ */ U(T, {
						size: "sm",
						"aria-label": "Breakout timer",
						disabled: i !== "open",
						value: g === null ? "" : "running",
						onChange: (e) => {
							let t = e.target.value;
							t !== "running" && u(t ? Number(t) * 6e4 : null);
						},
						options: [
							{
								value: "",
								label: "No timer"
							},
							...g === null ? [] : [{
								value: "running",
								label: "Running"
							}],
							..._.map((e) => ({
								value: String(e),
								label: `${e} min`
							}))
						],
						wrapperClassName: "w-32",
						"data-testid": "breakout-timer"
					})]
				})]
			}),
			d && i === "open" && f === "chat" && /* @__PURE__ */ U(r, {
				as: "p",
				size: "xs",
				tone: "tertiary",
				"data-testid": "breakout-announce-hint",
				children: "Send announcements to every room from the meeting chat."
			}),
			d && i === "open" && f === "pane" && /* @__PURE__ */ W("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ U(N, {
					"aria-label": "Announcement to every room",
					placeholder: "Send an announcement to every room",
					value: x,
					onChange: (e) => S(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), w());
					},
					minRows: 1,
					maxRows: 4,
					autoResize: !0,
					maxLength: 500,
					className: "flex-1",
					"data-testid": "breakout-broadcast-input"
				}), /* @__PURE__ */ U(t, {
					variant: "secondary",
					size: "sm",
					onClick: w,
					disabled: !x.trim(),
					"data-testid": "breakout-broadcast-send",
					children: "Send"
				})]
			})
		]
	});
}
function yn(n) {
	let { rooms: a, phase: o, mode: s, myRoomId: l = null, isOrganizer: u = !1, unassigned: d = [], endsAt: f = null, allowReturnToMain: p = !0, closing: m = !1, onJoin: h, onReturnToMain: g, onCreateRooms: _, onAssign: v, onOpenRooms: y, onCloseRooms: b, onRenameRoom: x, onClose: S, title: C = "Breakout rooms", notice: w, collapseClosedRooms: T = !0, onDeleteRooms: E, className: ee, "data-testid": D = "breakout-rooms-panel" } = n, O = a.length > 0 && a.every((e) => e.state === "closed"), [k, j] = V(u), M = B(o);
	R(() => {
		let e = M.current;
		M.current = o, e !== o && (e === "open" ? j(!1) : e === "none" && u && j(!0));
	}, [o, u]);
	let N = T && O && !k, P = z(), F = un(o === "open" ? f : null, n.clockOffsetMs), ne = p || u, I = y && b ? (e, t) => t === "open" ? y([e]) : b([e]) : void 0;
	return /* @__PURE__ */ W("aside", {
		"aria-label": C,
		"data-testid": D,
		"data-phase": o,
		"data-mode": s,
		className: e("flex h-full min-h-0 w-full min-w-0 flex-col bg-surface", ee),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex min-h-9 shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
				children: [/* @__PURE__ */ U(r, {
					as: "div",
					size: "sm",
					weight: "semibold",
					role: "heading",
					"aria-label": C,
					className: "truncate",
					children: C
				}), S && /* @__PURE__ */ U(i, {
					"aria-label": `Close ${C.toLowerCase()}`,
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ U(c, {}),
					onClick: S,
					"data-testid": `${D}-close`
				})]
			}),
			w,
			/* @__PURE__ */ W("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: [
					u && o === "none" && _ && /* @__PURE__ */ U(_n, { onCreateRooms: _ }),
					u && o !== "none" && /* @__PURE__ */ U(vn, {
						...n,
						left: F,
						folded: N
					}),
					!u && F !== null && /* @__PURE__ */ W(r, {
						as: "div",
						size: "sm",
						tone: m ? "inherit" : "secondary",
						tabular: !0,
						weight: m ? "semibold" : void 0,
						className: e("px-3 pt-2", m && "text-danger"),
						"data-testid": "breakout-timer-left",
						children: [
							m ? "Closing" : "Rooms close",
							" in ",
							at(F)
						]
					}),
					a.length === 0 && !u && /* @__PURE__ */ U(r, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "block px-3 py-4",
						"data-testid": `${D}-empty`,
						children: "No breakout rooms yet. The organizer will open them."
					}),
					T && O && /* @__PURE__ */ W("div", {
						className: "flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1 border-b border-border-subtle px-3 py-1",
						"data-testid": "breakout-closed-summary",
						children: [
							/* @__PURE__ */ W(r, {
								size: "sm",
								tone: "secondary",
								className: "mr-auto items-center gap-1.5",
								children: [/* @__PURE__ */ U(te, { size: "sm" }), a.length === 1 ? "1 room closed" : `${a.length} rooms closed`]
							}),
							/* @__PURE__ */ U(t, {
								variant: "ghost",
								size: "sm",
								onClick: () => j((e) => !e),
								"aria-expanded": !N,
								"aria-controls": P,
								"data-testid": "breakout-closed-toggle",
								children: N ? "Show rooms" : "Hide rooms"
							}),
							u && E && N && /* @__PURE__ */ U(t, {
								variant: "secondary",
								size: "sm",
								onClick: E,
								"data-testid": "breakout-delete",
								children: "Start new rooms"
							})
						]
					}),
					a.length > 0 && !N && /* @__PURE__ */ U("ul", {
						id: P,
						className: "flex flex-col",
						"data-testid": "breakout-room-list",
						children: a.map((e) => {
							let t = e.id === l, n = e.state === "open" && o === "open" && !m && (s === "self-select" || u);
							return /* @__PURE__ */ U(hn, {
								room: e,
								mine: t,
								canJoin: n,
								canReturn: ne,
								isOrganizer: u,
								rooms: a,
								onJoin: h,
								onReturnToMain: g,
								onAssign: v,
								onToggleRoom: I,
								onRenameRoom: x
							}, e.id);
						})
					}),
					u && o !== "none" && !N && d.length > 0 && /* @__PURE__ */ W("section", {
						"data-ui-part": "",
						className: "border-t border-border px-3 py-2",
						"data-testid": "breakout-unassigned",
						"aria-label": "Not in a room",
						children: [/* @__PURE__ */ W(r, {
							as: "div",
							size: "xs",
							weight: "semibold",
							tone: "secondary",
							className: "mb-1",
							children: [
								"Not in a room (",
								d.length,
								")"
							]
						}), /* @__PURE__ */ U("ul", {
							className: "flex flex-col gap-0.5",
							children: d.map((e) => /* @__PURE__ */ W("li", {
								className: "flex items-center gap-2",
								"data-testid": "breakout-unassigned-person",
								"data-user-id": e.id,
								children: [
									/* @__PURE__ */ U(A, {
										name: e.name,
										src: e.avatarUrl,
										size: 20
									}),
									/* @__PURE__ */ U(r, {
										size: "sm",
										className: "min-w-0 flex-1 truncate",
										children: e.name
									}),
									/* @__PURE__ */ U(Z, { raised: e.handRaised }),
									v && /* @__PURE__ */ U(gn, {
										person: e,
										rooms: a,
										current: null,
										onAssign: v
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
export { fe as $, Ge as A, we as B, rt as C, Je as D, Ye as E, Me as F, Q as G, xe as H, Ee as I, pe as J, Z as K, Oe as L, Ue as M, Ne as N, qe as O, je as P, ce as Q, De as R, at as S, Ze as T, Ce as U, ye as V, ve as W, de as X, se as Y, le as Z, Ct as _, en as a, vt as b, Jt as c, Wt as d, X as et, Ht as f, Mt as g, Tt as h, ln as i, K as it, He as j, Ke as k, Kt as l, Ft as m, dn as n, ue as nt, $t as o, Vt as p, me as q, un as r, q as rt, Xt as s, yn as t, Y as tt, Ut as u, St as v, Qe as w, ut as x, pt as y, Te as z };
