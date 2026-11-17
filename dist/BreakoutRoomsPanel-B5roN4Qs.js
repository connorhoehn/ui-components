import { d as e, n as t, t as n } from "./Button-DQoeE5dN.js";
import { t as r } from "./Text-XdCzxWMv.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { E as a, S as o, Y as s, at as c, h as l, m as u } from "./Icons-CNCMF52q.js";
import { _ as d, a as f, b as p, h as m, i as h, p as g, r as _, s as v, u as y, x as b, y as x } from "./MediaIcons-_ai5Til2.js";
import { n as S, t as C } from "./Badge-hAdAjIrX.js";
import { t as w } from "./Banner-CL5Cl_V8.js";
import { t as T } from "./Select-k38b8PrZ.js";
import { t as E } from "./Tooltip-DGN3JB6V.js";
import { t as D } from "./InlinePopover-CEzf8hyR.js";
import { t as O } from "./Slider-COaaKXgy.js";
import { t as k } from "./DropdownMenu-8X91cU7p.js";
import { t as A } from "./SegmentedControl-CO8w_o0t.js";
import { a as j } from "./Tabs-VCUI4Fx2.js";
import { n as M } from "./Avatar-DPJ8Mh6Y.js";
import { t as N } from "./SkeletonCard-BryltcC7.js";
import { t as P } from "./Switch-CRiY_kzy.js";
import { t as ee } from "./Textarea-Cf4WFXAs.js";
import { t as te } from "./StatusDot-DAok6F5B.js";
import { t as F } from "./InlineAlert-BMRUWJjD.js";
import { t as ne } from "./ActivityFeed-CIGF7n7Z.js";
import { t as I } from "./NumberInput-pHxC7Spt.js";
import { t as re } from "./Checkbox-DrdG_-IA.js";
import { t as ie } from "./InlineEditableText-CKjRokmb.js";
import { createContext as ae, memo as L, useCallback as oe, useContext as se, useEffect as R, useId as ce, useLayoutEffect as z, useMemo as le, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
//#region src/components/video/ParticipantAccessBadge.tsx
var ue = { "view-only": {
	label: "View only",
	description: "Can watch and listen, but cannot turn on a camera, microphone or screen share"
} };
function G(e) {
	return e ? ue[e] ?? null : null;
}
function K({ access: t, tone: n = "chip", size: i = "sm", iconOnly: o = !1, label: s, className: c, "data-testid": l = "participant-access-badge" }) {
	let u = G(t);
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
function de({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
		children: [
			/* @__PURE__ */ U("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11" }),
			/* @__PURE__ */ U("path", { d: "M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" }),
			/* @__PURE__ */ U("path", { d: "M14 10.5V5.5a1.5 1.5 0 0 1 3 0v8" }),
			/* @__PURE__ */ U("path", { d: "M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.1l3.4 4.6A6 6 0 0 0 12.4 20h.6a4 4 0 0 0 4-4v-2.5" })
		]
	});
}
function fe({ size: e = 16, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function pe({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function me({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function he({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function ge({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function _e({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function J({ size: e = 20, ...t }) {
	return /* @__PURE__ */ U("svg", {
		...q(e, t),
		children: /* @__PURE__ */ U("path", { d: "M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" })
	});
}
function ve({ size: e = 20, ...t }) {
	return /* @__PURE__ */ W("svg", {
		...q(e, t),
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
function ye(e) {
	return e ? typeof e == "number" ? `Hand raised, ${be(e)} in line` : "Hand raised" : null;
}
function be(e) {
	let t = [
		"th",
		"st",
		"nd",
		"rd"
	], n = e % 100;
	return `${e}${t[(n - 20) % 10] ?? t[n] ?? t[0]}`;
}
function xe({ raised: t, tone: n = "chip", size: i = "sm", className: a, "data-testid": o = "raised-hand-badge" }) {
	let s = ye(t);
	return s ? /* @__PURE__ */ W("span", {
		role: "img",
		"aria-label": s,
		title: s,
		"data-testid": o,
		"data-hand-position": typeof t == "number" ? t : void 0,
		className: e("inline-flex shrink-0 items-center gap-0.5 rounded-full leading-none", i === "sm" ? "h-4 px-1" : "h-5 px-1.5", n === "chip" ? "bg-warning-bg text-text-primary [&_svg]:text-warning" : "bg-warning text-call-chrome", a),
		children: [/* @__PURE__ */ U(de, { size: i === "sm" ? 11 : 13 }), typeof t == "number" && /* @__PURE__ */ U(r, {
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
function Y({ id: t, displayName: n, avatarUrl: r, isSpeaking: i = !1, isMuted: a = !1, handRaised: o, access: s, isLocal: c = !1, isSpotlight: l = !1, videoElement: u, onClick: d, fillParent: f = !1, className: p, style: m }) {
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
				style: { background: Se(n) },
				children: /* @__PURE__ */ U("div", {
					className: e("rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner", l ? "w-24 h-24 text-4xl" : "w-14 h-14 text-xl"),
					children: r ? /* @__PURE__ */ U("img", {
						src: r,
						alt: "",
						className: e("w-full h-full rounded-full object-cover")
					}) : X(n)
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
					/* @__PURE__ */ U(K, {
						access: s,
						tone: "overlay",
						iconOnly: !0,
						"data-testid": "tile-access"
					}),
					/* @__PURE__ */ U(xe, {
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
function X(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	return n.length === 1 ? n[0].charAt(0).toUpperCase() : (n[0].charAt(0) + n[n.length - 1].charAt(0)).toUpperCase();
}
function Se(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return `hsl(${Math.abs(t) % 360}, 55%, 45%)`;
}
//#endregion
//#region src/components/video/ReactionOverlay.tsx
var Ce = {
	"👍": "thumbs-up",
	"❤️": "heart",
	"🔥": "fire",
	"😂": "laugh",
	"👏": "clap",
	"🎉": "party",
	"😮": "wow",
	"💯": "hundred"
};
function Z(e) {
	return Ce[e] || Array.from(e).map((e) => e.codePointAt(0).toString(16)).join("-");
}
function Q({ reactions: t, className: n, style: r }) {
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
var we = [
	"👍",
	"❤️",
	"🔥",
	"😂",
	"👏",
	"🎉",
	"😮",
	"💯"
];
function $({ onReact: t, emojis: n = we, className: r, style: i, tone: a = "chrome" }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": "reaction-picker",
		"data-tone": a,
		className: e("flex gap-1", a === "chrome" ? "px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border" : "p-0.5", r),
		style: i,
		children: n.map((n) => {
			let r = Z(n);
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
var Te = /* @__PURE__ */ W("svg", {
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
function Ee({ onReact: t, emojis: n, closeOnReact: r = !0, align: i = "center", disabled: a = !1, tone: o = "chrome", className: s }) {
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
			children: Te
		}), c && /* @__PURE__ */ U($, {
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
function De(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0;
}
function Oe({ count: t, className: n, style: r, "data-testid": i = "viewer-count" }) {
	if (!De(t)) return null;
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
var ke = "cursor-not-allowed *:opacity-45";
function Ae(e, t, n) {
	let r = ce(), i = e || void 0, a = i !== void 0;
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
function je({ reason: e, children: t, placement: n = "top", "data-testid": r }) {
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
var Me = null;
function Ne(e, t) {
	Me?.(e, t);
}
//#endregion
//#region src/components/video/HangoutGrid.tsx
function Pe({ participants: t, localParticipant: n = null, activeSpeakerId: r = null, onParticipantClick: i, fillParent: a = !1, pipWidth: o = 96, className: s, style: c }) {
	let l = t.length, u = !!n && l === 0, d = !!n && l >= 2, f = !!n && l === 1, p = le(() => {
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
	]), m = Fe(p.length), h = Math.max(1, Math.ceil(p.length / m));
	return /* @__PURE__ */ W("div", {
		className: e("relative grid gap-1 bg-video-stage rounded-lg overflow-hidden", a && "h-full w-full", s),
		style: {
			gridTemplateColumns: `repeat(${m}, 1fr)`,
			...a ? { gridTemplateRows: `repeat(${h}, 1fr)` } : {},
			...c
		},
		children: [
			p.map((e) => /* @__PURE__ */ U(Y, {
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
				children: /* @__PURE__ */ U(Y, {
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
function Fe(e) {
	return e <= 1 ? 1 : e === 2 || e <= 4 ? 2 : e <= 9 ? 3 : 4;
}
//#endregion
//#region src/components/video/gridFit.ts
var Ie = 9 / 16;
function Le(e, t, n, r = 0) {
	let i = Math.max(0, Math.floor(e));
	if (i === 0 || !(t > 0) || !(n > 0)) return {
		columns: 1,
		rows: i === 0 ? 0 : i,
		tileWidth: 0,
		tileHeight: 0
	};
	let a = {
		columns: 1,
		rows: i,
		tileWidth: 0,
		tileHeight: 0
	}, o = -1;
	for (let e = 1; e <= i; e += 1) {
		let s = Math.ceil(i / e), c = (t - r * (e - 1)) / e, l = (n - r * (s - 1)) / s / Ie, u = Math.min(c, l);
		u > o && (o = u, a = {
			columns: e,
			rows: s,
			tileWidth: 0,
			tileHeight: 0
		});
	}
	let s = Math.max(0, Math.floor(o));
	return {
		...a,
		tileWidth: s,
		tileHeight: Math.floor(s * Ie)
	};
}
//#endregion
//#region src/components/video/CallTileRow.tsx
function Re({ participants: t, localParticipant: n, activeSpeakerId: r, tileWidth: i = 144, controls: a, title: o, onParticipantClick: s, variant: c = "floating", highlightedId: l = null, overflow: u = "collapse", maxVisible: d = 6, tileHeight: f = 84, tileTestIdPrefix: p = "call-tile", maxColumns: m, fitBox: h = null, wrap: g = !1, className: _, style: v, "data-testid": y = "call-tile-row" }) {
	if (c === "grid" || c === "gallery") {
		let i = n ? [n, ...t] : t, a = c === "grid" && h && h.width > 0 && h.height > 0 && i.length > 0 ? Le(i.length, h.width, h.height, ze) : null, u = a ? a.columns : m ? Math.max(1, Math.min(Fe(i.length), m)) : Fe(i.length);
		return /* @__PURE__ */ U("div", {
			className: e("grid w-full min-w-0 gap-3", a ? "h-full content-center justify-center" : c === "gallery" ? "grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] justify-items-center [&>*]:max-w-[26rem]" : Be[u] ?? Be[4], _),
			style: a ? {
				...v,
				gridTemplateColumns: `repeat(${a.columns}, ${a.tileWidth}px)`
			} : v,
			role: "group",
			"aria-label": typeof o == "string" ? `Call: ${o}` : "Call participants",
			"data-testid": y,
			"data-variant": c,
			"data-tile-count": i.length,
			"data-columns": c === "gallery" ? void 0 : u,
			...a ? {
				"data-fit": "contain",
				"data-tile-width": a.tileWidth
			} : {},
			children: i.map((e) => /* @__PURE__ */ U(Ge, {
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
	if (c === "dock" && g) return /* @__PURE__ */ U(Ue, {
		all: n ? [n, ...t] : t,
		activeSpeakerId: r ?? null,
		highlightedId: l,
		tileWidth: i,
		tileHeight: f,
		maxVisible: u === "collapse" ? d : Infinity,
		tileTestIdPrefix: p,
		title: o,
		...s ? { onParticipantClick: s } : {},
		..._ ? { className: _ } : {},
		...v ? { style: v } : {},
		testId: y
	});
	if (c === "dock") return /* @__PURE__ */ U(He, {
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
		..._ ? { className: _ } : {},
		...v ? { style: v } : {},
		testId: y
	});
	let b = n ? [...t, n] : t, x = b.map((t) => /* @__PURE__ */ U(Y, {
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
	}, t.id)), S = typeof o == "string" ? `Call: ${o}` : "Call";
	return c === "floating" ? /* @__PURE__ */ W("div", {
		className: e("group/row flex w-fit max-w-full min-w-0 flex-col items-center gap-2", _),
		style: v,
		role: "group",
		"aria-label": S,
		"data-testid": y,
		"data-variant": "floating",
		"data-tile-count": b.length,
		children: [/* @__PURE__ */ U("div", {
			className: "flex max-w-full items-end gap-2 bg-transparent",
			"data-testid": `${y}-tiles`,
			children: b.map((t) => t.videoElement ? /* @__PURE__ */ U(Y, {
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
			}, t.id) : /* @__PURE__ */ U(qe, {
				participant: t,
				speaking: t.id === r,
				...s ? { onClick: () => s(t.id) } : {}
			}, t.id))
		}), a && /* @__PURE__ */ U("div", {
			className: "flex items-center rounded-full bg-black/60 px-1 py-0.5 shadow-md backdrop-blur-sm transition-opacity duration-150 opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 [&_button]:!h-9 [&_button]:!w-9",
			"data-testid": `${y}-controls`,
			children: a
		})]
	}) : /* @__PURE__ */ W("div", {
		className: e("flex w-full min-w-0 items-center gap-2 rounded-xl bg-video-stage p-2 text-white shadow-md", _),
		style: v,
		role: "group",
		"aria-label": S,
		"data-testid": y,
		"data-variant": "bar",
		"data-tile-count": b.length,
		children: [
			o && /* @__PURE__ */ U("span", {
				className: "max-w-[10rem] shrink-0 truncate px-1 text-xs font-semibold text-white/80",
				"data-testid": `${y}-title`,
				children: o
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
				"data-testid": `${y}-tiles`,
				children: x
			}),
			a && /* @__PURE__ */ U("div", {
				className: "flex shrink-0 items-center",
				"data-testid": `${y}-controls`,
				children: a
			})
		]
	});
}
var ze = 12, Be = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function Ve(e) {
	if (!e.length) return [];
	let t = e[0].offsetTop;
	return e.flatMap((e, n) => e.offsetTop > t + 1 ? [n] : []);
}
function He({ all: t, activeSpeakerId: n, highlightedId: r, tileWidth: i, tileHeight: a, overflow: o, maxVisible: s, tileTestIdPrefix: c, title: l, onParticipantClick: u, className: d, style: f, testId: p }) {
	let m = o === "collapse" && t.length > s ? t.slice(0, Math.max(1, s - 1)) : t, h = t.slice(m.length), g = B(null), [_, v] = V(null), y = m.map((e) => e.id).join("|");
	z(() => {
		let e = g.current;
		if (!e || o !== "collapse") return;
		let t = () => {
			let t = [...e.children].filter((e) => e instanceof HTMLElement && e.dataset.dockItem === "true"), n = Ve(t);
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
			children: [m.map((e) => /* @__PURE__ */ U(Ge, {
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
				}, e.id)), /* @__PURE__ */ U(M, {
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
function Ue({ all: t, activeSpeakerId: n, highlightedId: r, tileWidth: i, tileHeight: a, maxVisible: o, tileTestIdPrefix: s, title: c, onParticipantClick: l, className: u, style: d, testId: f }) {
	let p = t.length > o ? t.slice(0, Math.max(1, o)) : t, m = t.slice(p.length), h = m.map((e) => e.displayName).join(", ");
	return /* @__PURE__ */ U("div", {
		className: e("flex min-w-0 max-w-full flex-wrap items-center gap-2", u),
		style: d,
		role: "group",
		"aria-label": typeof c == "string" ? `Call: ${c}` : "Call participants",
		"data-testid": f,
		"data-variant": "dock",
		"data-wrap": "true",
		"data-tile-count": t.length,
		"data-hidden-count": m.length,
		children: p.map((e, t) => {
			let o = /* @__PURE__ */ U(Ge, {
				participant: e,
				width: i,
				height: a,
				speaking: e.id === n,
				highlighted: e.id === r,
				testId: `${s}-${e.id}`,
				...l ? { onParticipantClick: l } : {}
			}, e.id);
			return t !== p.length - 1 || m.length === 0 ? o : /* @__PURE__ */ W("div", {
				className: "relative shrink-0",
				children: [
					o,
					/* @__PURE__ */ W("span", {
						className: "pointer-events-none absolute right-1 top-1 z-20 rounded-full bg-surface-inverse/70 px-2 py-0.5 text-xs font-medium text-white",
						title: h,
						"aria-label": `${m.length} more: ${h}`,
						"data-testid": `${s}-wrapped`,
						children: ["+", m.length]
					}),
					m.map((e) => (e.videoElement != null || e.audioElement != null) && /* @__PURE__ */ W("div", {
						className: "pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0",
						"aria-hidden": "true",
						"data-testid": `${s}-${e.id}-media-sink`,
						children: [e.videoElement, e.audioElement]
					}, e.id))
				]
			}, e.id);
		})
	});
}
function We(e, t) {
	if (e === t) return !0;
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => Object.is(e[n], t[n]));
}
var Ge = L(Ke, (e, t) => e.width === t.width && e.height === t.height && e.fluid === t.fluid && e.speaking === t.speaking && e.highlighted === t.highlighted && e.testId === t.testId && e.onParticipantClick === t.onParticipantClick && We(e.participant, t.participant));
function Ke({ participant: t, width: n, height: r, fluid: i = !1, speaking: a, highlighted: o, testId: s, onParticipantClick: c }) {
	Ne("tile", t.id);
	let l = c ? () => c(t.id) : void 0, u = t.isLocal ? "You" : t.displayName, d = t.ringing ? `${t.displayName}, ringing` : `${t.isLocal ? "You" : t.displayName}${Je(t.access)}${t.handRaised ? `, ${ye(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}${t.screenSharing ? ", sharing screen" : ""}`;
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
				children: /* @__PURE__ */ U(M, {
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
					/* @__PURE__ */ U(K, {
						access: t.access,
						tone: "overlay",
						iconOnly: !0,
						"data-testid": `${s}-access`
					}),
					/* @__PURE__ */ U(xe, {
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
function qe({ participant: t, speaking: n, onClick: r }) {
	let i = `${t.displayName}${t.isLocal ? " (you)" : ""}${Je(t.access)}${t.handRaised ? `, ${ye(t.handRaised).toLowerCase()}` : ""}${t.isMuted ? ", muted" : ""}`;
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
			/* @__PURE__ */ U(M, {
				name: t.displayName,
				size: 44,
				...t.avatarUrl ? { src: t.avatarUrl } : {}
			}),
			t.handRaised ? /* @__PURE__ */ U(xe, {
				raised: t.handRaised,
				tone: "overlay",
				className: "absolute -left-1 -top-1 ring-2 ring-white",
				"data-testid": "bubble-hand"
			}) : null,
			/* @__PURE__ */ U(K, {
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
function Je(e) {
	let t = G(e);
	return t ? `, ${t.label.toLowerCase()}` : "";
}
//#endregion
//#region src/components/video/HangoutSpotlight.tsx
function Ye({ participants: t, localParticipant: n = null, spotlightContent: r, spotlightContentLabel: i, activeSpeakerId: a = null, speakerHysteresisMs: o = 750, onParticipantClick: s, fillParent: c = !1, filmstripTileWidth: l = 128, className: u, style: d }) {
	let f = Xe(a, o), p = le(() => t.find((e) => e.screenElement) || (n && n.screenElement ? {
		...n,
		isLocal: !0
	} : null), [t, n]), m = le(() => {
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
	return r ? (g = "screen", _ = i ?? h?.displayName ?? "", v = r) : p ? (g = "screen", _ = p.displayName, v = p.screenElement) : h ? (g = "camera", _ = h.displayName, v = /* @__PURE__ */ U(Y, {
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
				children: /* @__PURE__ */ U(Y, {
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
function Xe(e, t) {
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
var Ze = 10;
function Qe({ participants: e, localParticipant: t = null, mode: n = "auto", activeSpeakerId: r = null, speakerHysteresisMs: i = 750, spotlightContent: a, spotlightContentLabel: o, onParticipantClick: s, fillParent: c = !1, pipWidth: l, filmstripTileWidth: u, className: d, style: f }) {
	let p = e.length + +!!t, m = e.some((e) => e.screenElement) || !!(t && t.screenElement);
	return (a || m || n === "auto" && p >= Ze ? "spotlight" : n) === "spotlight" ? /* @__PURE__ */ U(Ye, {
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
	}) : /* @__PURE__ */ U(Pe, {
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
function $e(e, t) {
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
function et(e) {
	if (!e) return !1;
	let t = e.getVideoTracks();
	return t.length !== 0 && t.some((e) => e.readyState === "live" && e.enabled && !e.muted);
}
//#endregion
//#region src/components/video/bindMediaStream.ts
function tt(e, t, { onPlayState: n, onRebind: r } = {}) {
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
function nt({ stream: e, muted: t = !1, videoRef: n, className: r = "h-full w-full object-cover", onPlayStateChange: i }) {
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
		}, i = tt(t, e, {
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
function rt({ stream: e }) {
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
function it({ stream: e, displayName: t, cameraOn: n, avatarSize: r = 96 }) {
	$e(e, t);
	let i = et(e);
	return !n || !i || !e ? /* @__PURE__ */ W("div", {
		className: "flex items-center justify-center w-full h-full bg-[var(--color-surface-inset,#0f172a)]",
		"data-testid": "remote-tile-avatar-branch",
		children: [/* @__PURE__ */ U(M, {
			name: t,
			size: r
		}), e && /* @__PURE__ */ U(rt, { stream: e })]
	}) : /* @__PURE__ */ U(nt, { stream: e });
}
//#endregion
//#region src/components/video/ReconnectingBanner.tsx
function at({ show: e, label: t = "Reconnecting…" }) {
	return e ? /* @__PURE__ */ U("div", {
		"data-testid": "hangout-reconnecting-banner",
		className: "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-warning/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap",
		role: "status",
		"aria-live": "polite",
		children: t
	}) : null;
}
//#endregion
//#region src/components/video/callNoun.tsx
var ot = "huddle", st = ae(null);
function ct({ noun: e, children: t }) {
	return /* @__PURE__ */ U(st.Provider, {
		value: e || null,
		children: t
	});
}
function lt(e) {
	let t = se(st);
	return e || t || "huddle";
}
//#endregion
//#region src/components/video/DeviceToggleSelect.tsx
var ut = {
	microphone: "Mic",
	camera: "Camera"
}, dt = {
	microphone: "microphone",
	camera: "camera"
}, ft = {
	microphone: "Microphone blocked in the browser",
	camera: "Camera blocked in the browser"
}, pt = {
	microphone: "No microphone found",
	camera: "No camera found"
};
function mt({ kind: t, on: r, onToggle: i, devices: a, selectedDeviceId: o, onSelectDevice: s, permission: c, level: l, size: d = "sm", showLabel: m = !1, extraItems: g, disabledReason: _, deviceMenu: v = !0, className: y, "data-testid": x = `device-toggle-${t}` }) {
	let S = c === "denied" || c === "unavailable", C = Ae(_ ?? (c === "denied" ? ft[t] : c === "unavailable" ? pt[t] : void 0), S), w = C.off, T = r && !w, E = t === "microphone" && T && (l ?? 0) > .08, D = d === "md" ? 20 : 18, O;
	O = U(t === "microphone" ? T ? h : f : T ? p : b, { size: D });
	let A = `${ut[t]} ${T ? "on" : "off"}`, j = T ? `Turn ${dt[t]} off` : `Turn ${dt[t]} on`, M = a.length ? a.map((e) => ({
		label: e.label,
		checked: e.deviceId === o,
		onSelect: () => s(e.deviceId),
		"data-testid": `${x}-device-${e.deviceId}`
	})) : [{
		label: pt[t],
		disabled: !0
	}], N = d === "md" ? "h-10" : "h-8", P = !T && t === "microphone" && !w ? "text-danger-fg" : "text-text-primary";
	return /* @__PURE__ */ W("div", {
		className: e("inline-flex shrink-0 items-stretch rounded-md border border-border bg-surface", E && "ring-2 ring-primary/50", N, y),
		"data-kind": t,
		"data-on": T ? "true" : "false",
		"data-permission": c,
		children: [/* @__PURE__ */ U(je, {
			reason: C.reason,
			children: /* @__PURE__ */ W("button", {
				"data-ui-part": "",
				type: "button",
				onClick: w ? void 0 : i,
				...C.buttonProps,
				"aria-pressed": T,
				"aria-label": m ? void 0 : j,
				title: C.reason === void 0 ? j : void 0,
				"data-testid": x,
				className: e("inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-[inherit] text-sm", v ? "rounded-l-md" : "rounded-md", n, "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", C.reason === void 0 ? "hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50" : ke, d === "md" ? "px-2.5" : "px-2", m && "min-w-0 flex-1 justify-start gap-1.5 pr-2", P),
				children: [
					O,
					m && /* @__PURE__ */ U("span", {
						className: "min-w-0 truncate whitespace-nowrap",
						children: A
					}),
					C.description
				]
			})
		}), v && /* @__PURE__ */ U(k, {
			trigger: /* @__PURE__ */ U(u, { size: 14 }),
			triggerLabel: `Choose ${dt[t]}`,
			triggerTitle: `Choose ${dt[t]}`,
			triggerTestId: `${x}-menu`,
			triggerVariant: "link",
			triggerClassName: e("h-full shrink-0 rounded-none rounded-r-md px-2 text-text-secondary", d === "md" && "px-2"),
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
var ht = {
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
}, gt = {
	w: 120,
	h: 68,
	box: "h-[68px] w-[120px]",
	visible: 6
};
function _t(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function vt(e) {
	return e === 1 ? "1 person" : `${e} people`;
}
var yt = L(function({ phase: e, callingTo: t, participantCount: n, elapsedMs: r }) {
	Ne("meta");
	let i;
	return i = e === "calling" ? t ? `Calling ${t}…` : "Calling…" : e === "connecting" ? "Connecting…" : e === "reconnecting" ? /* @__PURE__ */ U("span", {
		className: "text-warning-fg",
		children: "Reconnecting…"
	}) : `${vt(n)}${r == null ? "" : ` · ${_t(r)}`}`, /* @__PURE__ */ U("span", {
		className: "shrink-0 whitespace-nowrap text-sm tabular-nums text-text-tertiary",
		"data-testid": "call-dock-meta",
		children: i
	});
});
function bt(e, t, n) {
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
var xt = L(function({ participants: e, localParticipantId: t, activeSpeakerId: n, followingUserId: r, reconnecting: i, size: a, grid: o = !1, gallery: s = !1, wrap: c = !1, maxColumns: l, fitWidth: u = 0, fitHeight: d = 0, onTileClick: f, title: p }) {
	let m = e.find((e) => e.userId === t) ?? null, h = e.filter((e) => e.userId !== t);
	return /* @__PURE__ */ U(Re, {
		variant: s ? "gallery" : o ? "grid" : "dock",
		participants: h.map((e) => bt(e, !1, i)),
		localParticipant: m ? bt(m, !0, i) : null,
		activeSpeakerId: n,
		highlightedId: r,
		tileWidth: c ? gt.w : ht[a].w,
		tileHeight: c ? gt.h : ht[a].h,
		overflow: "collapse",
		maxVisible: c ? gt.visible : ht[a].visible,
		...c ? { wrap: !0 } : {},
		...l ? { maxColumns: l } : {},
		...u > 0 && d > 0 ? { fitBox: {
			width: u,
			height: d
		} } : {},
		...f ? { onParticipantClick: f } : {},
		title: p,
		"data-testid": "call-dock-tile-row"
	});
});
function St({ title: n, participantCount: r, elapsedMs: a, phase: c, callingTo: l, documents: u = [], participants: d, localParticipantId: f, activeSpeakerId: p = null, followingUserId: h = null, mic: v, camera: b, screenShare: S, onOpenPeople: T, onOpenDocuments: E, peopleOpen: O = !1, documentsOpen: A = !1, onOpenSettings: M, extras: P, onPopOut: ee, onLeave: te, canEndForEveryone: F = !1, onEndForEveryone: ne, onTileClick: I, onTitleClick: re, onDocumentClick: ie, endedSummary: ae, error: L, onDismiss: se, compact: R = !1, tileSize: ce, layout: z = "shelf", metaAside: le, fit: ue = "width", className: G, "data-testid": K = "call-dock" }) {
	let q = z === "compact" ? "sm" : ce ?? (R ? "sm" : "md"), de = B(null), [fe, pe] = V(!1), me = B(I);
	me.current = I;
	let he = oe((e) => me.current?.(e), []), ge = c === "calling" ? "You can share once someone joins" : c === "connecting" ? "Connecting…" : S.disabledReason, _e = Ae(ge, !1), J = ue === "contain" && z === "grid", ve = j({
		axis: "height",
		enabled: J
	}), ye = j({
		axis: "width",
		forward: ve.ref,
		enabled: J
	}), be = J && ye.size && ve.size ? ye.size : 0, xe = J && ye.size && ve.size ? ve.size : 0;
	if (c === "error" && L) return /* @__PURE__ */ U("div", {
		className: e("border-t border-border bg-surface px-5 py-3", G),
		"data-testid": K,
		"data-phase": "error",
		children: /* @__PURE__ */ U(w, {
			variant: "error",
			title: L.title ?? `Lost the call — ${L.message}`,
			"data-testid": "call-dock-error",
			action: /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U(t, {
					size: "sm",
					onClick: L.onRetry,
					"data-testid": "call-dock-rejoin",
					children: L.retryLabel ?? "Rejoin"
				}), se && /* @__PURE__ */ U(t, {
					size: "sm",
					variant: "ghost",
					onClick: se,
					"data-testid": "call-dock-dismiss",
					children: "Dismiss"
				})]
			})
		})
	});
	if (c === "ended") return /* @__PURE__ */ W("div", {
		className: e("flex items-center gap-2 border-t border-border bg-surface px-5 py-3 text-sm", G),
		"data-testid": K,
		"data-phase": "ended",
		children: [/* @__PURE__ */ W("span", {
			className: "min-w-0 flex-1 truncate text-text-secondary",
			"data-testid": "call-dock-ended",
			children: [
				/* @__PURE__ */ U("span", {
					className: "font-semibold text-text-primary",
					children: "Call ended"
				}),
				a != null && /* @__PURE__ */ W(H, { children: [" · ", _t(a)] }),
				ae != null && /* @__PURE__ */ W(H, { children: [" · ", ae] })
			]
		}), se && /* @__PURE__ */ U(t, {
			variant: "link",
			onClick: se,
			"data-testid": "call-dock-dismiss",
			className: "text-sm",
			children: "Dismiss"
		})]
	});
	let Y = c === "calling", X = c === "connecting", Se = c === "reconnecting", Ce = () => {
		!Y && F && ne ? pe(!0) : te();
	}, Z = z === "stage", Q = z === "compact", we = z === "grid" || Z, $ = z === "stack" || Q || Z && q === "sm", Te = [
		{
			label: S.on ? "Stop sharing" : "Share your screen",
			icon: /* @__PURE__ */ U(g, { size: 16 }),
			onSelect: S.onToggle,
			...ge ? {
				disabled: !0,
				disabledReason: ge
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
			icon: /* @__PURE__ */ U(o, { size: 16 }),
			onSelect: E,
			...A ? { active: !0 } : {},
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-documents"
		}] : [],
		{
			label: "Call settings",
			icon: /* @__PURE__ */ U(m, { size: 16 }),
			onSelect: M,
			"data-testid": "call-dock-settings"
		},
		{
			label: "Pop out the call",
			icon: /* @__PURE__ */ U(_, { size: 16 }),
			onSelect: ee,
			...X ? {
				disabled: !0,
				disabledReason: "Connecting…"
			} : {},
			"data-testid": "call-dock-popout"
		}
	], Ee = !!f && d.some((e) => e.userId === f), De = X && !(Q && d.length > 0) && !(z === "grid" && Ee), Oe = /* @__PURE__ */ U("div", {
		className: "flex gap-2",
		"data-testid": "call-dock-connecting",
		children: /* @__PURE__ */ U("div", {
			className: e("shrink-0 overflow-hidden rounded-md", Z ? "aspect-video w-full max-w-[26rem] mx-auto" : we || $ && !Q ? "aspect-video w-full" : Q ? gt.box : ht[q].box),
			children: /* @__PURE__ */ U(N, {
				height: "100%",
				rounded: "md"
			})
		})
	}), ke = /* @__PURE__ */ U(xt, {
		participants: d,
		localParticipantId: f,
		activeSpeakerId: p,
		followingUserId: h,
		reconnecting: Se,
		size: q,
		grid: we || $ && !Q,
		gallery: Z,
		wrap: Q,
		...$ && !Q ? { maxColumns: 2 } : {},
		...J ? {
			fitWidth: be,
			fitHeight: xe
		} : {},
		onTileClick: I ? he : void 0,
		title: n
	}), Me = Se && /* @__PURE__ */ U("div", {
		className: e("mb-2 inline-flex rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning-fg", J && "shrink-0 self-start"),
		role: "status",
		"data-testid": "call-dock-reconnecting",
		children: "Reconnecting…"
	}), Ne = Le(1, be, xe, 0), Pe = J ? /* @__PURE__ */ W("div", {
		className: "relative flex min-h-0 min-w-0 flex-1 flex-col",
		"data-testid": "call-dock-tiles",
		children: [Me, /* @__PURE__ */ U("div", {
			ref: ye.ref,
			className: "flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center",
			"data-testid": "call-dock-fit-box",
			children: De ? /* @__PURE__ */ U("div", {
				className: "flex w-full justify-center",
				"data-testid": "call-dock-connecting",
				children: /* @__PURE__ */ U("div", {
					className: "aspect-video w-full shrink-0 overflow-hidden rounded-md",
					style: Ne.tileWidth > 0 ? { width: Ne.tileWidth } : void 0,
					children: /* @__PURE__ */ U(N, {
						height: "100%",
						rounded: "md"
					})
				})
			}) : ke
		})]
	}) : /* @__PURE__ */ W("div", {
		className: e("relative min-w-0", Z && "min-h-0 flex-1 overflow-y-auto", Q && "order-first max-w-full"),
		"data-testid": "call-dock-tiles",
		children: [Me, De ? Oe : ke]
	});
	return we && !Z ? /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("flex min-w-0 flex-col gap-2 bg-surface p-3", J && "min-h-0 flex-1", G),
		"aria-label": `Call: ${n}`,
		"data-testid": K,
		"data-phase": c,
		"data-layout": "grid",
		...J ? { "data-fit": "contain" } : {},
		"data-compact": q === "sm" ? "true" : "false",
		children: Pe
	}) : /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("@container flex flex-col gap-2.5 border-t border-border bg-surface px-5 pt-3 pb-3.5", Q && "gap-0 px-3 py-2", Z && "h-full min-h-0 border-t-0 px-3", G),
		"aria-label": `Call: ${n}`,
		"data-testid": K,
		"data-phase": c,
		"data-layout": Q ? "compact" : Z ? "stage" : $ ? "stack" : "shelf",
		"data-call-dock": !0,
		"data-compact": q === "sm" || $ ? "true" : "false",
		"data-tile-size": $ && !Q ? void 0 : q,
		children: /* @__PURE__ */ W("div", {
			className: Q ? "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2" : "contents",
			"data-testid": Q ? "call-dock-compact-columns" : void 0,
			children: [/* @__PURE__ */ W("div", {
				className: e("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2", Z && "order-last shrink-0 justify-center", Q && "contents"),
				"data-call-dock-header": !0,
				"data-testid": `${K}-header`,
				children: [!Z && /* @__PURE__ */ W("div", {
					className: e("flex min-w-0 flex-auto items-baseline gap-3", Q && "min-w-[8rem] basis-[8rem] flex-col items-start gap-0.5"),
					children: [
						/* @__PURE__ */ U("button", {
							"data-ui-part": "",
							type: "button",
							onClick: re,
							disabled: !re,
							className: e("max-w-[45cqw] shrink-0 truncate whitespace-nowrap border-none bg-transparent p-0 text-left font-[inherit] text-base font-semibold text-text-primary enabled:cursor-pointer enabled:hover:underline", Q && "max-w-full text-sm"),
							"data-testid": "call-dock-title",
							title: n,
							children: n
						}),
						le == null ? /* @__PURE__ */ U(yt, {
							phase: c,
							callingTo: l,
							participantCount: r,
							elapsedMs: a
						}) : /* @__PURE__ */ W("span", {
							className: "inline-flex min-w-0 items-center gap-1.5",
							"data-testid": "call-dock-meta-line",
							children: [/* @__PURE__ */ U(yt, {
								phase: c,
								callingTo: l,
								participantCount: r,
								elapsedMs: a
							}), le]
						}),
						!Q && u.length > 0 && /* @__PURE__ */ U("span", {
							className: "hidden min-w-0 flex-1 items-center gap-4 overflow-hidden @min-[1240px]:flex",
							"data-testid": "call-dock-documents-chips",
							children: u.map((t) => /* @__PURE__ */ W("button", {
								"data-ui-part": "",
								type: "button",
								onClick: ie ? () => ie(t.id) : void 0,
								className: e("inline-flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap border-none bg-transparent p-0 font-[inherit] text-[13px]", t.presenting ? "text-primary" : "text-text-primary", ie ? "cursor-pointer hover:underline" : "cursor-default"),
								"data-testid": `call-dock-document-${t.id}`,
								"data-presenting": t.presenting ? "true" : "false",
								title: t.presenting ? `${t.title} · Presenting` : t.title,
								children: [/* @__PURE__ */ U(o, {
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
					className: e("flex min-w-0 max-w-full flex-wrap items-center gap-2", Z ? "justify-center" : "ml-auto justify-end", Q && "shrink-0"),
					"data-testid": `${K}-controls`,
					children: [
						/* @__PURE__ */ U(mt, {
							kind: "microphone",
							...v,
							"data-testid": "call-dock-mic",
							...X ? { disabledReason: "Connecting…" } : {}
						}),
						/* @__PURE__ */ U(mt, {
							kind: "camera",
							...b,
							"data-testid": "call-dock-camera",
							...X ? { disabledReason: "Connecting…" } : {}
						}),
						!$ && /* @__PURE__ */ W(H, { children: [
							/* @__PURE__ */ U(je, {
								reason: _e.reason,
								children: /* @__PURE__ */ W(t, {
									variant: S.on ? "danger" : "ghost",
									size: "sm",
									onClick: _e.guard(S.onToggle),
									..._e.buttonProps,
									title: _e.reason === void 0 ? S.on ? "Stop sharing" : "Share your screen" : void 0,
									"aria-label": S.on ? "Stop sharing" : "Share",
									"aria-pressed": S.on,
									"data-testid": "call-dock-share",
									className: e("inline-flex h-8 items-center gap-1.5 bg-surface", _e.reason !== void 0 && e("cursor-not-allowed *:opacity-45", "aria-disabled:hover:bg-surface aria-disabled:hover:text-text-primary")),
									children: [
										/* @__PURE__ */ U(g, { size: 16 }),
										/* @__PURE__ */ U("span", {
											className: "hidden @min-[860px]:inline",
											children: S.on ? "Stop sharing" : "Share"
										}),
										_e.description
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
								variant: A ? "secondary" : "ghost",
								size: "sm",
								onClick: E,
								disabled: X,
								"aria-label": `Documents (${u.length})`,
								"aria-pressed": A,
								"data-testid": "call-dock-documents",
								className: e("hidden h-8 items-center gap-1.5 @min-[980px]:inline-flex", !A && "bg-surface"),
								children: [
									/* @__PURE__ */ U(o, { size: 16 }),
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
						P != null && /* @__PURE__ */ U("div", {
							className: "contents",
							"data-testid": "call-dock-extras",
							children: P
						}),
						/* @__PURE__ */ W("div", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": "call-dock-end",
							children: [$ ? /* @__PURE__ */ U(k, {
								trigger: /* @__PURE__ */ U(s, { size: 16 }),
								triggerLabel: "More call controls",
								triggerTitle: "More",
								triggerTestId: "call-dock-more",
								triggerClassName: "h-8 w-8 px-0 py-0",
								align: "end",
								sections: [{ items: Te }],
								"data-testid": "call-dock-more-menu"
							}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(i, {
								"aria-label": "Call settings",
								title: "Call settings",
								variant: "outline",
								onClick: M,
								icon: /* @__PURE__ */ U(m, { size: 18 }),
								"data-testid": "call-dock-settings"
							}), /* @__PURE__ */ U(i, {
								"aria-label": "Pop out the call",
								title: "Pop out the call",
								variant: "outline",
								onClick: ee,
								disabled: X,
								icon: /* @__PURE__ */ U(_, { size: 16 }),
								"data-testid": "call-dock-popout"
							})] }), /* @__PURE__ */ W(t, {
								ref: de,
								variant: "danger-solid",
								size: "sm",
								onClick: Ce,
								"aria-haspopup": F && !Y ? "dialog" : void 0,
								title: Y ? "Cancel the call" : void 0,
								"data-testid": "call-dock-leave",
								className: "inline-flex h-8 shrink-0 items-center gap-1.5 px-3.5",
								children: [/* @__PURE__ */ U(y, { size: 16 }), Y ? "Cancel" : "Leave"]
							})]
						}),
						/* @__PURE__ */ W(D, {
							trigger: de,
							open: fe,
							onClose: () => pe(!1),
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
										pe(!1), te();
									},
									"data-testid": "call-dock-leave-confirm-leave",
									children: "Leave"
								}), /* @__PURE__ */ U(t, {
									variant: "danger-solid",
									size: "sm",
									onClick: () => {
										pe(!1), ne?.();
									},
									"data-testid": "call-dock-end-for-everyone",
									children: "End for everyone"
								})]
							})]
						})
					]
				})]
			}), Pe]
		})
	});
}
//#endregion
//#region src/components/video/MediaEffectsTray.tsx
function Ct({ label: t, active: n, disabled: r, compact: i, onClick: a, thumbUrl: o, "data-testid": s }) {
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
function wt({ label: t, compact: n, children: r }) {
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
function Tt({ filters: t, activeFilterId: n, onSelectFilter: r, backgrounds: i, backgroundMode: a, activeBackgroundUrl: o, onSelectBackground: s, faceSprites: c, activeFaceSpriteId: l, onSelectFaceSprite: u, disabled: d = !1, compact: f = !1, layout: p = "strip", columns: m = 3, thumbnailStream: h = null, thumbnailSrc: g, filterLimit: _ = 5, onSelectCustomBackground: v, backgroundsUnsupported: y = !1, className: b, "data-testid": x }) {
	return p === "grid" ? /* @__PURE__ */ U(Nt, {
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
			/* @__PURE__ */ U(wt, {
				label: "Filters",
				compact: f,
				children: t.map((e) => {
					let t = e.id === n;
					return /* @__PURE__ */ U(Ct, {
						label: e.label,
						active: t,
						disabled: d,
						compact: f,
						onClick: () => r(t ? "none" : e.id),
						"data-testid": `effects-filter-${e.id}`
					}, e.id);
				})
			}),
			/* @__PURE__ */ W(wt, {
				label: "Background",
				compact: f,
				children: [
					/* @__PURE__ */ U(Ct, {
						label: "None",
						active: a === "none",
						disabled: d,
						compact: f,
						onClick: () => s("none", null),
						"data-testid": "effects-bg-none"
					}),
					/* @__PURE__ */ U(Ct, {
						label: "Blur",
						active: a === "blur",
						disabled: d,
						compact: f,
						onClick: () => s(a === "blur" ? "none" : "blur", null),
						"data-testid": "effects-bg-blur"
					}),
					i.map((e) => {
						let t = a === "image" && o === e.url;
						return /* @__PURE__ */ U(Ct, {
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
			/* @__PURE__ */ W(wt, {
				label: "Face FX",
				compact: f,
				children: [/* @__PURE__ */ U(Ct, {
					label: "None",
					active: l === null,
					disabled: d,
					compact: f,
					onClick: () => u(null),
					"data-testid": "effects-face-none"
				}), c.map((e) => {
					let t = e.id === l;
					return /* @__PURE__ */ U(Ct, {
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
var Et = 5242880;
function Dt(e) {
	return `url("${e.replace(/["\\\n\r]/g, (e) => encodeURIComponent(e))}")`;
}
function Ot({ stream: e, src: t, filter: n, backgroundUrl: r }) {
	if (r) return /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 bg-cover bg-center",
		style: { backgroundImage: Dt(r) }
	});
	let i = n && n !== "none" ? n : void 0;
	return /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		className: "absolute inset-0 overflow-hidden bg-video-tile",
		style: i ? { filter: i } : void 0,
		children: e ? /* @__PURE__ */ U(nt, {
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
function kt({ label: t, active: n, disabled: r, onClick: i, testId: a, children: o, dashed: s = !1 }) {
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
function At(e) {
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
function jt({ children: e, action: t }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ U("h3", {
			className: "m-0 text-sm font-semibold text-text-primary",
			children: e
		}), t]
	});
}
var Mt = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4"
};
function Nt({ filters: n, activeFilterId: r, onSelectFilter: i, backgrounds: a, backgroundMode: o, activeBackgroundUrl: s, onSelectBackground: l, faceSprites: u, activeFaceSpriteId: d, onSelectFaceSprite: f, disabled: p, columns: m, thumbnailStream: h, thumbnailSrc: g, filterLimit: _, onSelectCustomBackground: y, backgroundsUnsupported: b, className: x, "data-testid": S }) {
	let [C, w] = V(!1), [E, D] = V(!1), O = B(null), k = Mt[m] ?? "grid-cols-3", A = !C && n.length > _ + 1, j = A ? n.slice(0, _) : n, M = !E && u.length > 3, N = M ? u.slice(0, 2) : u, P = {
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
				children: [/* @__PURE__ */ U(jt, {
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
					className: e("grid gap-x-3 gap-y-2", k),
					children: [j.map((e) => /* @__PURE__ */ U(kt, {
						label: e.label,
						active: e.id === r,
						disabled: p,
						onClick: () => i(e.id),
						testId: `effects-filter-${e.id}`,
						children: /* @__PURE__ */ U(Ot, {
							...P,
							...e.cssFilter ? { filter: e.cssFilter } : {}
						})
					}, e.id)), A && /* @__PURE__ */ W(kt, {
						label: "More...",
						active: !1,
						disabled: p,
						onClick: () => w(!0),
						testId: "effects-filter-more",
						children: [/* @__PURE__ */ U(Ot, {
							...P,
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
				children: [/* @__PURE__ */ U(jt, { children: "Background" }), b ? /* @__PURE__ */ U(F, {
					tone: "info",
					"data-testid": "effects-background-unsupported",
					children: "Backgrounds need a newer browser"
				}) : /* @__PURE__ */ W("div", {
					className: e("grid gap-x-3 gap-y-2", k),
					children: [
						/* @__PURE__ */ U(kt, {
							label: "None",
							active: o === "none",
							disabled: p,
							onClick: () => l("none", null),
							testId: "effects-background-none",
							children: /* @__PURE__ */ U(Ot, { ...P })
						}),
						/* @__PURE__ */ U(kt, {
							label: "Blur",
							active: o === "blur",
							disabled: p,
							onClick: () => l("blur", null),
							testId: "effects-background-blur",
							children: /* @__PURE__ */ U(Ot, {
								...P,
								filter: "blur(4px)"
							})
						}),
						a.map((e) => /* @__PURE__ */ U(kt, {
							label: e.label,
							active: o === "image" && s === e.url,
							disabled: p,
							onClick: () => l("image", e.url),
							testId: `effects-background-${e.id}`,
							children: /* @__PURE__ */ U(Ot, {
								stream: null,
								backgroundUrl: e.url
							})
						}, e.id)),
						y && /* @__PURE__ */ W(kt, {
							label: "+ Custom",
							active: !1,
							disabled: p,
							dashed: !0,
							onClick: () => O.current?.click(),
							testId: "effects-background-custom",
							children: [/* @__PURE__ */ U(c, { size: 22 }), /* @__PURE__ */ U("input", {
								"data-ui-part": "",
								ref: O,
								type: "file",
								accept: "image/*",
								className: "hidden",
								"data-testid": "effects-background-custom-input",
								onChange: (e) => {
									let t = e.target.files?.[0];
									e.target.value = "", t && t.size <= Et && y(t);
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
					/* @__PURE__ */ U(jt, { children: "Face effects" }),
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
						className: e("-mt-0.5 grid gap-2", k),
						children: [N.map((t) => {
							let n = t.id === d, { glyph: r, text: i } = At(t.label);
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
						}), M && /* @__PURE__ */ W("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => D(!0),
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
function Pt(e, t) {
	return (...n) => {
		e && t(...n);
	};
}
function Ft({ previewActive: n, previewStream: r, isDirty: i, onApply: a, onCancel: o, filters: s, activeFilterId: c, onSelectFilter: l, backgrounds: u, backgroundMode: d, activeBackgroundUrl: f, onSelectBackground: p, faceSprites: m, activeFaceSpriteId: h, onSelectFaceSprite: g, disabled: _ = !1, title: v = "Video effects", applyLabel: y = "Apply", variant: b = "chrome", showFooter: x = !0, hint: S = "Changes appear in the call after Apply.", thumbnailSrc: C, onSelectCustomBackground: w, backgroundsUnsupported: T = !1, className: E, "data-testid": D = "media-effects-preview-panel" }) {
	let O = (e) => Pt(n, e), k = n && i && !_;
	return b === "surface" ? /* @__PURE__ */ W("section", {
		"data-ui-part": "",
		"data-testid": D,
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
					children: /* @__PURE__ */ U(nt, {
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
			/* @__PURE__ */ U(Tt, {
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
						disabled: !k,
						"data-testid": "media-effects-preview-apply",
						children: y
					})
				]
			})
		]
	}) : /* @__PURE__ */ W("section", {
		"data-ui-part": "",
		"data-testid": D,
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
					children: /* @__PURE__ */ U(nt, {
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
			/* @__PURE__ */ U(Tt, {
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
var It = {
	"no-broadcast": "This broadcast is not running right now.",
	network: "Cannot reach the broadcast — check your connection.",
	server: "Something went wrong on our side.",
	media: "This stream could not be played.",
	unsupported: "This browser cannot play this broadcast.",
	other: "This stream could not be played."
};
function Lt(e) {
	return e ? It[e.kind] : null;
}
function Rt(e) {
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
var zt = 3e3, Bt = 1e3, Vt = 1500, Ht = 8e3, Ut = .5;
function Wt(e, t, n = {}) {
	let { live: r = !1, stalledAfterMs: i = Ht } = n, [a, o] = V(null), s = Lt(a), [c, l] = V(!1), [u, d] = V(!1), [f, p] = V(!1), [m, h] = V(null), [g, _] = V(null), [v, y] = V(0), b = B(null), x = B(!1), S = B(0), C = B(n.onError);
	R(() => {
		C.current = n.onError;
	}, [n.onError]);
	let w = oe(() => {
		o(null), d(!1), p(!1), y((e) => e + 1);
	}, []), T = oe(() => {
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
						let e = Rt(n);
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
			if (!(e - S.current < zt)) {
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
				return t !== null && Math.abs(t - n) < Ut ? t : n;
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
			s >= i ? p(!0) : s >= Vt && d(!0);
		}, Bt);
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
var Gt = 80, Kt = .6;
function qt(e) {
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
			let t = Math.sqrt(e / s.length), a = Math.min(1, t * 3.5), c = Math.max(a, r.current * Kt);
			r.current = c, n(c);
		}, Gt);
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
var Jt = [
	.55,
	.8,
	1,
	.8,
	.55
], Yt = [
	"h-1",
	"h-1.5",
	"h-2",
	"h-3",
	"h-4",
	"h-6",
	"h-8",
	"h-10"
], Xt = [
	"h-2",
	"h-4",
	"h-6",
	"h-4",
	"h-2"
], Zt = [
	"[animation-delay:0ms]",
	"[animation-delay:110ms]",
	"[animation-delay:220ms]",
	"[animation-delay:330ms]",
	"[animation-delay:440ms]"
];
function Qt(e, t) {
	let n = Math.max(0, Math.min(1, e * t));
	return Yt[Math.min(Yt.length - 1, Math.round(n * (Yt.length - 1)))];
}
function $t({ name: t, avatarUrl: n, level: r = null, active: i = !1, muted: a = !1, hint: o, className: s, "data-testid": c = "stream-audio-only" }) {
	let l = typeof r == "number" && i, u = o ?? (a ? "Audio only — unmute to hear it." : i ? "Audio only — there is no picture on this broadcast." : "Audio only.");
	return /* @__PURE__ */ W("div", {
		"data-testid": c,
		"data-measured": String(l),
		"data-active": String(i),
		className: e("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center", s),
		children: [
			t ? /* @__PURE__ */ U(M, {
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
				children: Jt.map((t, n) => /* @__PURE__ */ U("span", { className: e("w-1.5 rounded-full transition-[height] duration-100", i ? "bg-white/80" : "bg-white/25", !l && i && ["uic-audio-bar", Zt[n]], l ? Qt(r, t) : Xt[n]) }, n))
			})
		]
	});
}
//#endregion
//#region src/components/video/streamStagePhase.ts
function en({ hasStream: e, hasPlaylist: t, hadSource: n, graceExpired: r, streamHasTracks: i = null, hls: a }) {
	if (e) return i === !1 ? r ? "not-started" : "connecting" : "playing";
	if (t) {
		let e = a?.phase ?? (a?.error ? "error" : a?.loading ? "connecting" : "playing");
		return e === "error" ? "error" : e === "connecting" || e === "idle" ? r ? "not-started" : "connecting" : e;
	}
	return n ? "ended" : r ? "not-started" : "idle";
}
function tn(e) {
	return e === "playing" || e === "buffering" || e === "idle";
}
function nn(e) {
	return e === "playing";
}
//#endregion
//#region src/components/video/StreamChatTicker.tsx
function rn(e) {
	if (!e) return;
	let t = new Date(e);
	if (!Number.isNaN(t.getTime())) return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function an({ messages: t, visibleCount: n = 3, rotateMs: r = 4200, window: i = 20, className: a, "data-testid": o = "stream-chat-ticker" }) {
	let s = le(() => t.slice(-i).reverse().map((e) => ({
		id: e.id,
		actor: e.displayName,
		action: "",
		subject: e.content,
		timeLabel: rn(e.timestamp),
		kind: "comment"
	})), [t, i]);
	return s.length === 0 ? null : /* @__PURE__ */ U("div", {
		"data-testid": o,
		className: e("pointer-events-none max-w-sm", a),
		children: /* @__PURE__ */ U(ne, {
			items: s,
			visibleCount: n,
			rotateMs: r,
			className: "text-white"
		})
	});
}
//#endregion
//#region src/components/video/StreamStage.tsx
var on = 1e4;
function sn(e) {
	return !e || typeof e.getVideoTracks != "function" || typeof e.getAudioTracks != "function" || e.getAudioTracks().length === 0 ? !1 : !et(e);
}
var cn = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors";
function ln({ stream: t = null, playlistUrl: n = null, onPlaybackError: r, onRetry: i, title: a, viewerCount: o, live: s = !1, audioOnly: c, speakerName: l, speakerAvatarUrl: u, notStartedLabel: d, endedLabel: f, stallAfterMs: p = on, chatMessages: m, chatVisibleCount: h, chatRotateMs: g, muted: _ = !0, allowFullscreen: v = !0, showLatency: y = !0, controls: b, placeholder: x, className: S, "data-testid": C = "stream-stage" }) {
	let [w, T] = V(_);
	R(() => {
		T(_);
	}, [_]);
	let E = B(null), D = B(null), O = Wt(D, t ? null : n, {
		live: !0,
		onError: r
	}), k = B(!1);
	(t || n) && (k.current = !0);
	let A = $e(t && typeof t.getVideoTracks == "function" ? t : null, a ?? "stream"), j = le(() => sn(t), [t, A]), M = le(() => t && typeof t.getTracks == "function" ? t.getTracks().length > 0 : null, [t, A]), N = !!t && M !== !1 || !!n && !O.loading, [P, ee] = V(!1);
	R(() => {
		if (ee(!1), N || O.error) return;
		let e = setTimeout(() => ee(!0), p);
		return () => clearTimeout(e);
	}, [
		N,
		O.error,
		p
	]);
	let te = en({
		hasStream: !!t,
		streamHasTracks: M,
		hasPlaylist: !!n,
		hadSource: k.current,
		graceExpired: P,
		hls: O
	}), F = O.failure ?? null, ne = B(!1);
	te === "playing" && (ne.current = !0);
	let I = te === "error" && F?.kind === "no-broadcast" ? ne.current ? "ended" : "not-started" : te, re = I === "ended" ? te === "ended" ? "withdrawn" : "stopped" : null, ie = s && tn(I), ae = t ? j : O.audioOnly === !0, L = (c ?? ae) && (I === "playing" || I === "buffering" || I === "stalled"), se = qt(L && t ? t : null), [ce, z] = V(!1);
	R(() => {
		if (typeof document > "u") return;
		let e = () => z(document.fullscreenElement === E.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let H = oe(() => {
		let e = E.current;
		if (e) try {
			if (typeof document < "u" && document.fullscreenElement) {
				document.exitFullscreen?.();
				return;
			}
			let t = (e.requestFullscreen ?? e.webkitRequestFullscreen ?? e.msRequestFullscreen)?.call(e);
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch {}
	}, []), ue = typeof document < "u" && document.fullscreenEnabled !== !1 && typeof Element < "u" && !!(Element.prototype.requestFullscreen ?? Element.prototype.webkitRequestFullscreen), G = O.retry, K = oe(() => {
		G?.(), i?.();
	}, [G, i]), q = !!(t || n), de = !!n && !t, fe = q && I !== "error" && I !== "not-started" && I !== "ended", pe = fe || !!b, me = !F || F.retryable, he = (de || !!i) && me, ge = F?.kind === "no-broadcast" ? "Check again" : "Try again";
	return /* @__PURE__ */ W("div", {
		ref: E,
		"data-testid": C,
		"data-live": String(ie),
		"data-phase": I,
		"data-audio-only": String(L),
		"data-transport": t ? "realtime" : n ? "hls" : "none",
		"data-error-kind": F?.kind,
		"data-error-detail": F?.detail,
		className: e("relative h-full w-full overflow-hidden rounded-lg bg-black", S),
		children: [
			t ? /* @__PURE__ */ U(nt, {
				stream: t,
				muted: w,
				className: "h-full w-full object-contain"
			}) : n ? /* @__PURE__ */ U("video", {
				ref: D,
				"data-testid": `${C}-hls`,
				autoPlay: !0,
				playsInline: !0,
				muted: w,
				className: "h-full w-full object-contain"
			}) : null,
			L && /* @__PURE__ */ U($t, {
				"data-testid": `${C}-audio-only`,
				name: l,
				avatarUrl: u,
				level: se,
				active: I !== "stalled" && !w,
				muted: w
			}),
			I === "idle" && /* @__PURE__ */ U(un, {
				testId: `${C}-placeholder`,
				children: x ?? "Waiting for the stream to start…"
			}),
			I === "ended" && /* @__PURE__ */ W(un, {
				testId: `${C}-ended`,
				"data-ended-reason": re,
				children: [
					/* @__PURE__ */ U("span", { children: f ?? (re === "withdrawn" ? "The broadcast has ended." : "The stream stopped.") }),
					re === "stopped" && !f && /* @__PURE__ */ U("span", {
						className: "text-xs text-white/60",
						children: "Nothing is arriving from the broadcaster right now — they may be reconnecting."
					}),
					re === "stopped" ? he && /* @__PURE__ */ U(dn, {
						testId: `${C}-retry`,
						label: "Try again",
						onClick: K
					}) : i && /* @__PURE__ */ U(dn, {
						testId: `${C}-retry`,
						label: "Check again",
						onClick: K
					})
				]
			}),
			I === "not-started" && /* @__PURE__ */ W(un, {
				testId: `${C}-not-started`,
				children: [/* @__PURE__ */ U("span", { children: d ?? "Nothing is being broadcast right now." }), he && /* @__PURE__ */ U(dn, {
					testId: `${C}-retry`,
					label: ge,
					onClick: K
				})]
			}),
			I === "connecting" && /* @__PURE__ */ U(un, {
				testId: `${C}-connecting`,
				children: "Connecting…"
			}),
			I === "buffering" && /* @__PURE__ */ U("div", {
				"data-testid": `${C}-buffering`,
				className: "pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90",
				children: "Buffering…"
			}),
			I === "stalled" && /* @__PURE__ */ W(un, {
				testId: `${C}-stalled`,
				dim: !0,
				children: [
					/* @__PURE__ */ U("span", { children: "The stream has stopped responding." }),
					/* @__PURE__ */ U("span", {
						className: "text-xs text-white/60",
						children: "The picture below is the last frame that arrived."
					}),
					he && /* @__PURE__ */ U(dn, {
						testId: `${C}-retry`,
						onClick: K
					})
				]
			}),
			I === "error" && /* @__PURE__ */ W(un, {
				testId: `${C}-error`,
				dim: !0,
				children: [/* @__PURE__ */ U("span", { children: O.error ?? "This stream could not be played." }), he && /* @__PURE__ */ U(dn, {
					testId: `${C}-retry`,
					label: ge,
					onClick: K
				})]
			}),
			(a || ie || De(o)) && /* @__PURE__ */ W("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-2",
				children: [
					ie && /* @__PURE__ */ U("span", {
						"data-testid": `${C}-live`,
						className: "rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white",
						children: "Live"
					}),
					a && /* @__PURE__ */ U("span", {
						className: "truncate text-sm font-medium text-white drop-shadow",
						children: a
					}),
					De(o) && /* @__PURE__ */ U(Oe, { count: o })
				]
			}),
			m && m.length > 0 && /* @__PURE__ */ U(an, {
				messages: m,
				visibleCount: h,
				rotateMs: g,
				className: "absolute bottom-3 left-3",
				"data-testid": `${C}-chat`
			}),
			pe && /* @__PURE__ */ W("div", {
				"data-testid": `${C}-controls`,
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [
					fe && de && y && (I === "playing" || I === "buffering") && /* @__PURE__ */ U("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-latency`,
						onClick: () => O.seekToLive?.(),
						title: "This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge.",
						"aria-label": "Jump to the live edge",
						className: e(cn, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: typeof O.latencySec == "number" && Number.isFinite(O.latencySec) ? `${Math.max(1, Math.round(O.latencySec))}s behind` : "Behind live"
					}),
					fe && ie && /* @__PURE__ */ W("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-mute-toggle`,
						"aria-label": w ? "Unmute" : "Mute",
						"aria-pressed": w,
						onClick: () => T((e) => !e),
						className: e(cn, w ? "bg-white text-black hover:bg-white/90" : "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ U("span", {
							"aria-hidden": !0,
							children: w ? "🔇" : "🔊"
						}), w ? "Unmute" : "Mute"]
					}),
					fe && v && ue && /* @__PURE__ */ W("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${C}-fullscreen`,
						"aria-label": ce ? "Exit full screen" : "Full screen",
						"aria-pressed": ce,
						onClick: H,
						className: e(cn, "bg-black/50 text-white/80 hover:bg-black/70"),
						children: [/* @__PURE__ */ U("span", {
							"aria-hidden": !0,
							children: ce ? "↙" : "↗"
						}), ce ? "Exit" : "Full screen"]
					}),
					b
				]
			})
		]
	});
}
function un({ testId: t, dim: n, children: r, "data-ended-reason": i }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": t,
		"data-ended-reason": i ?? void 0,
		className: e("absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70", n && "bg-black/60"),
		children: r
	});
}
function dn({ testId: t, label: n = "Try again", onClick: r }) {
	return /* @__PURE__ */ U("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": t,
		onClick: r,
		className: e(cn, "bg-white text-black hover:bg-white/90"),
		children: n
	});
}
//#endregion
//#region src/components/video/AudioLevelMeter.tsx
function fn({ level: t, segments: n = 10, label: r = "Input level", disabled: i = !1, className: a, "data-testid": o = "audio-level-meter" }) {
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
function pn({ value: n, onChange: r, onTest: i, testLabel: a = "Test sound", testing: o = !1, muted: s = !1, disabled: c = !1, className: l, "data-testid": u = "settings-volume", testButtonTestId: f = "settings-test-sound" }) {
	let p = Math.round(Math.min(1, Math.max(0, n)) * 100);
	return /* @__PURE__ */ W("div", {
		className: e("flex items-center gap-3", l),
		children: [
			/* @__PURE__ */ U(d, {
				size: 20,
				className: e("shrink-0", s ? "text-text-tertiary" : "text-text-primary")
			}),
			/* @__PURE__ */ U(O, {
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
function mn({ value: e, onChange: n, devices: r, permission: i, micLevel: a, cameraOn: o, speakerSelectionSupported: s, onTestMic: c, onTestSound: l, testMicState: u = "idle", preview: f, previewControls: m, selfName: g = "You", callNoun: _, className: v, "data-testid": y = "audio-video-settings-form" }) {
	let b = lt(_), x = (t) => n({
		...e,
		...t
	}), C = (t, n, a) => {
		let o = t === "camera" ? r.cameras : t === "microphone" ? r.microphones : r.speakers, s = t === "camera" ? "cameraId" : t === "microphone" ? "microphoneId" : "speakerId", c = t !== "speaker" && i[t] === "denied", l = t === "microphone" ? "mic" : t;
		return /* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-col gap-2",
			children: [/* @__PURE__ */ U("label", {
				htmlFor: `${y}-${l}`,
				className: "text-sm font-semibold text-text-primary",
				children: n
			}), c ? /* @__PURE__ */ W(F, {
				tone: "error",
				"data-testid": `settings-${l}-denied`,
				children: [n, " blocked — allow it in the browser’s site settings"]
			}) : /* @__PURE__ */ U(T, {
				id: `${y}-${l}`,
				value: e[s] ?? o[0]?.deviceId ?? "",
				onChange: (e) => x({ [s]: e.target.value }),
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
		className: `grid min-w-0 grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] ${v ?? ""}`,
		"data-testid": y,
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
						onClick: () => x({ mirrorPreview: !e.mirrorPreview }),
						"data-testid": "settings-mirror",
						children: "Mirror"
					})]
				}),
				/* @__PURE__ */ U("span", {
					className: "text-xs text-text-secondary",
					children: o ? `Your camera is on. This is how you’ll appear in the ${b}.` : "Your camera is off. You can turn it on when you’re ready."
				})
			]
		}), /* @__PURE__ */ W("section", {
			"data-ui-part": "",
			className: "flex min-w-0 flex-col gap-4",
			"aria-label": "Device setup",
			children: [
				C("camera", "Camera", /* @__PURE__ */ U(p, { size: 16 })),
				/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col gap-2",
					children: [C("microphone", "Microphone", /* @__PURE__ */ U(h, { size: 16 })), /* @__PURE__ */ W(S, {
						summary: "Microphone test & settings",
						variant: "plain",
						density: "compact",
						"data-testid": "settings-mic-test-panel",
						bodyClassName: "flex min-w-0 flex-col gap-3 pt-3",
						children: [/* @__PURE__ */ W("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ U(fn, {
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
							children: [/* @__PURE__ */ U("span", { children: "Noise reduction" }), /* @__PURE__ */ U(P, {
								checked: e.noiseSuppression,
								onChange: (e) => x({ noiseSuppression: e }),
								"aria-label": "Noise reduction",
								"data-testid": "settings-noise"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col gap-2",
					children: [s && C("speaker", "Speakers", /* @__PURE__ */ U(d, { size: 16 })), /* @__PURE__ */ U(S, {
						summary: "Speaker test & volume",
						variant: "plain",
						density: "compact",
						"data-testid": "settings-speaker-test-panel",
						bodyClassName: "pt-3",
						children: /* @__PURE__ */ U(pn, {
							value: e.volume,
							onChange: (e) => x({ volume: e }),
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
							children: [/* @__PURE__ */ U("span", { children: "Echo cancellation" }), /* @__PURE__ */ U(P, {
								checked: e.echoCancellation,
								onChange: (e) => x({ echoCancellation: e }),
								"aria-label": "Echo cancellation",
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3 text-sm text-text-secondary",
							children: [/* @__PURE__ */ U("span", { children: "Auto gain control" }), /* @__PURE__ */ U(P, {
								checked: e.autoGainControl,
								onChange: (e) => x({ autoGainControl: e }),
								"aria-label": "Auto gain control",
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ U(T, {
							"aria-label": "Video quality",
							value: e.quality,
							onChange: (e) => x({ quality: e.target.value }),
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
							onChange: (e) => x({ frameRate: e.target.value === "auto" ? "auto" : Number(e.target.value) }),
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
var hn = [
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
], gn = [
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
function _n(e, t) {
	return e.length ? e.map((e) => ({
		value: e.deviceId,
		label: e.label
	})) : [{
		value: "",
		label: t,
		disabled: !0
	}];
}
function vn({ children: t, divided: n = !0, className: r }) {
	return /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		className: e("flex flex-col gap-2.5 py-3.5 first:pt-0", n && "border-b border-border", r),
		children: t
	});
}
function yn({ children: e, htmlFor: t }) {
	return /* @__PURE__ */ U("label", {
		htmlFor: t,
		className: "text-[15px] font-semibold text-text-primary",
		children: e
	});
}
function bn({ checked: e, onChange: t, children: n, testId: r }) {
	return /* @__PURE__ */ W("label", {
		className: "flex cursor-pointer items-center gap-2.5 text-sm text-text-primary",
		children: [/* @__PURE__ */ U(re, {
			checked: e,
			onChange: (e) => t(e),
			className: "h-[18px] w-[18px]",
			"data-testid": r
		}), n]
	});
}
function xn({ value: n, onChange: r, devices: i, permission: a, micLevel: o, previewStream: s, cameraOn: c, speakerSelectionSupported: l, onTestMic: u, onTestSound: d, testMicState: f = "idle", selfName: p = "You", selfAvatarUrl: m, layout: h = "stack", previewControls: g, callNoun: _, className: v, "data-testid": y = "audio-video-settings-form" }) {
	let b = (e) => r({
		...n,
		...e
	}), x = a.microphone === "denied", C = a.camera === "denied", w = "w-full h-9 text-sm", E = f === "recording" ? "Recording…" : f === "playing" ? "Playing…" : "Test mic", D;
	return D = C ? null : c ? s ? /* @__PURE__ */ U(nt, {
		stream: s,
		muted: !0,
		className: e("h-full w-full object-cover", n.mirrorPreview && "scale-x-[-1]")
	}) : /* @__PURE__ */ U("div", {
		className: "h-full w-full [&>*]:!h-full",
		"data-testid": "settings-preview-loading",
		children: /* @__PURE__ */ U(N, {
			height: "100%",
			rounded: "lg"
		})
	}) : /* @__PURE__ */ W("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75",
		"data-testid": "settings-preview-off",
		children: [/* @__PURE__ */ U(M, {
			name: p,
			size: 48,
			...m ? { src: m } : {},
			color: "rgba(255,255,255,0.2)",
			showTitle: !1
		}), "Camera is off"]
	}), h === "prejoin" ? /* @__PURE__ */ U(mn, {
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
		preview: D,
		previewControls: g,
		..._ ? { callNoun: _ } : {},
		selfName: p,
		selfAvatarUrl: m,
		className: v,
		"data-testid": y
	}) : /* @__PURE__ */ W("div", {
		className: e("flex flex-col", v),
		"data-testid": y,
		"data-layout": h,
		children: [
			/* @__PURE__ */ W(vn, { children: [
				/* @__PURE__ */ U(yn, {
					htmlFor: `${y}-mic`,
					children: "Microphone"
				}),
				x ? /* @__PURE__ */ U(F, {
					tone: "error",
					"data-testid": "settings-mic-denied",
					children: "Microphone blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${y}-mic`,
					value: n.microphoneId ?? i.microphones[0]?.deviceId ?? "",
					onChange: (e) => b({ microphoneId: e.target.value }),
					options: _n(i.microphones, "No microphone found"),
					disabled: i.microphones.length === 0,
					className: w,
					"data-testid": "settings-mic-select"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ U("span", {
							className: "w-24 shrink-0 text-sm text-text-primary",
							children: "Input level"
						}),
						/* @__PURE__ */ U(fn, {
							level: o,
							disabled: x,
							"data-testid": "settings-mic-level"
						}),
						/* @__PURE__ */ U(t, {
							variant: "ghost",
							onClick: () => void u(),
							disabled: x || f !== "idle",
							"data-testid": "settings-test-mic",
							className: "ml-auto shrink-0",
							children: E
						})
					]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ U("span", {
						id: `${y}-noise`,
						className: "text-sm text-text-primary",
						children: "Noise reduction"
					}), /* @__PURE__ */ U(P, {
						checked: n.noiseSuppression,
						onChange: (e) => b({ noiseSuppression: e }),
						disabled: x,
						"aria-labelledby": `${y}-noise`,
						"data-testid": "settings-noise"
					})]
				})
			] }),
			/* @__PURE__ */ W(vn, { children: [
				l && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(yn, {
					htmlFor: `${y}-speaker`,
					children: "Speakers"
				}), /* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${y}-speaker`,
					value: n.speakerId ?? i.speakers[0]?.deviceId ?? "",
					onChange: (e) => b({ speakerId: e.target.value }),
					options: _n(i.speakers, "No speakers found"),
					disabled: i.speakers.length === 0,
					className: w,
					"data-testid": "settings-speaker-select"
				})] }),
				!l && /* @__PURE__ */ U(yn, { children: "Volume" }),
				/* @__PURE__ */ U(pn, {
					value: n.volume,
					onChange: (e) => b({ volume: e }),
					onTest: () => void d()
				})
			] }),
			/* @__PURE__ */ W(vn, { children: [
				/* @__PURE__ */ U(yn, {
					htmlFor: `${y}-camera`,
					children: "Camera"
				}),
				C ? /* @__PURE__ */ U(F, {
					tone: "error",
					"data-testid": "settings-camera-denied",
					children: "Camera blocked — allow it in the browser's site settings"
				}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
					chevron: "custom",
					id: `${y}-camera`,
					value: n.cameraId ?? i.cameras[0]?.deviceId ?? "",
					onChange: (e) => b({ cameraId: e.target.value }),
					options: _n(i.cameras, "No camera found"),
					disabled: i.cameras.length === 0,
					className: w,
					"data-testid": "settings-camera-select"
				}), /* @__PURE__ */ W("div", {
					className: "relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage",
					"data-testid": "settings-preview",
					"data-mirrored": n.mirrorPreview ? "true" : "false",
					children: [D, /* @__PURE__ */ U("span", {
						className: "absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white",
						children: "Your preview"
					})]
				})] }),
				/* @__PURE__ */ U(bn, {
					checked: n.mirrorPreview,
					onChange: (e) => b({ mirrorPreview: e }),
					testId: "settings-mirror",
					children: "Mirror my preview"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ U("label", {
						htmlFor: `${y}-quality`,
						className: "text-sm text-text-primary",
						children: "Quality"
					}), /* @__PURE__ */ U(T, {
						chevron: "custom",
						id: `${y}-quality`,
						value: n.quality,
						onChange: (e) => b({ quality: e.target.value }),
						options: hn,
						className: "h-9 w-full text-sm",
						wrapperClassName: "w-32 shrink-0",
						"data-testid": "settings-quality"
					})]
				})
			] }),
			/* @__PURE__ */ U(vn, {
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
								id: `${y}-echo`,
								className: "text-sm text-text-primary",
								children: "Echo cancellation"
							}), /* @__PURE__ */ U(P, {
								checked: n.echoCancellation,
								onChange: (e) => b({ echoCancellation: e }),
								"aria-labelledby": `${y}-echo`,
								"data-testid": "settings-echo"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ U("span", {
								id: `${y}-agc`,
								className: "text-sm text-text-primary",
								children: "Auto gain control"
							}), /* @__PURE__ */ U(P, {
								checked: n.autoGainControl,
								onChange: (e) => b({ autoGainControl: e }),
								"aria-labelledby": `${y}-agc`,
								"data-testid": "settings-agc"
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ U("label", {
								htmlFor: `${y}-fps`,
								className: "text-sm text-text-primary",
								children: "Frame rate"
							}), /* @__PURE__ */ U(T, {
								chevron: "custom",
								id: `${y}-fps`,
								value: String(n.frameRate),
								onChange: (e) => {
									let t = e.target.value;
									b({ frameRate: t === "auto" ? "auto" : Number(t) });
								},
								options: gn,
								className: "h-9 w-full text-sm",
								wrapperClassName: "w-32 shrink-0",
								"data-testid": "settings-frame-rate"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ U(vn, {
				divided: !1,
				className: "pt-2.5 pb-0",
				children: /* @__PURE__ */ U(bn, {
					checked: n.rememberDevices,
					onChange: (e) => b({ rememberDevices: e }),
					testId: "settings-remember",
					children: "Use these devices next time"
				})
			})
		]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomBanner.tsx
function Sn(e, t = 0) {
	let n = e ? Date.parse(e) : NaN, [r, i] = V(() => Date.now());
	return R(() => {
		if (!Number.isFinite(n)) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [n]), Number.isFinite(n) ? Math.max(0, n - (r + t)) : null;
}
function Cn({ roomName: n, endsAt: a, clockOffsetMs: o = 0, closing: s = !1, announcement: c, onDismissAnnouncement: u, onReturnToMain: d, className: f, "data-testid": p = "breakout-banner" }) {
	let m = Sn(a, o), h = m !== null && (s || m <= 6e4);
	return /* @__PURE__ */ W("div", {
		role: "region",
		"aria-label": `Breakout room: ${n}`,
		"data-testid": p,
		className: e("flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg", f),
		children: [/* @__PURE__ */ W("div", {
			className: "flex flex-wrap items-center gap-x-3 gap-y-1",
			children: [
				/* @__PURE__ */ U(ge, {
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
					children: s ? `Room closes in ${_t(m)}` : `${_t(m)} left`
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
		}), c && /* @__PURE__ */ W("div", {
			className: "flex items-start gap-2",
			"data-testid": `${p}-announcement`,
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ W(r, {
				size: "sm",
				tone: "inherit",
				className: "block min-w-0 flex-1",
				children: [
					/* @__PURE__ */ W("strong", { children: [c.fromDisplayName, ":"] }),
					" ",
					c.message
				]
			}), u && /* @__PURE__ */ U(i, {
				"aria-label": "Dismiss announcement",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(l, {}),
				onClick: u,
				"data-testid": `${p}-announcement-dismiss`
			})]
		})]
	});
}
//#endregion
//#region src/components/video/BreakoutRoomsPanel.tsx
var wn = [
	5,
	10,
	15,
	30,
	60
], Tn = 50, En = 80;
function Dn({ room: e, mine: n, canJoin: a, canReturn: o, isOrganizer: s, rooms: c, onJoin: l, onReturnToMain: d, onAssign: f, onToggleRoom: p, onRenameRoom: m }) {
	let [h, g] = V(!1), _ = ce(), v = e.state === "open";
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
					children: [s && m ? /* @__PURE__ */ U(ie, {
						value: e.name,
						onCommit: (t) => m(e.id, t),
						label: "Room name",
						maxLength: En,
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
					/* @__PURE__ */ U(M, {
						name: t.name,
						src: t.avatarUrl,
						size: 20
					}),
					/* @__PURE__ */ U(r, {
						size: "sm",
						className: "min-w-0 flex-1 truncate",
						children: t.name
					}),
					/* @__PURE__ */ U(xe, { raised: t.handRaised }),
					s && f && /* @__PURE__ */ U(On, {
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
function On({ person: e, rooms: t, current: n, onAssign: r }) {
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
function kn({ onCreateRooms: e }) {
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
				}), /* @__PURE__ */ U(I, {
					value: n,
					onChange: i,
					min: 1,
					max: 50,
					size: "sm",
					"aria-label": "Number of rooms",
					"data-testid": "breakout-create-count"
				})]
			}),
			/* @__PURE__ */ U(A, {
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
function An(n) {
	let { phase: i, mode: a, rooms: o, onOpenRooms: s, onCloseRooms: c, onAutoAssign: l, onSetTimer: u, onBroadcast: d, announceIn: f = "chat", onEnd: p, onDeleteRooms: m, onAddRoom: h, left: g, timerMinutes: _ = wn, maxRooms: v = Tn, closing: y = !1, folded: b } = n, [x, S] = V(""), C = o.some((e) => e.state === "open"), w = () => {
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
						children: y ? `Closing in ${_t(g)}` : `${_t(g)} left`
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
				children: [/* @__PURE__ */ U(ee, {
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
function jn(n) {
	let { rooms: a, phase: o, mode: s, myRoomId: c = null, isOrganizer: u = !1, unassigned: d = [], endsAt: f = null, allowReturnToMain: p = !0, closing: m = !1, onJoin: h, onReturnToMain: g, onCreateRooms: _, onAssign: v, onOpenRooms: y, onCloseRooms: b, onRenameRoom: x, onClose: S, title: C = "Breakout rooms", notice: w, collapseClosedRooms: T = !0, onDeleteRooms: E, className: D, "data-testid": O = "breakout-rooms-panel" } = n, k = a.length > 0 && a.every((e) => e.state === "closed"), [A, j] = V(u), N = B(o);
	R(() => {
		let e = N.current;
		N.current = o, e !== o && (e === "open" ? j(!1) : e === "none" && u && j(!0));
	}, [o, u]);
	let P = T && k && !A, ee = ce(), F = Sn(o === "open" ? f : null, n.clockOffsetMs), ne = p || u, I = y && b ? (e, t) => t === "open" ? y([e]) : b([e]) : void 0;
	return /* @__PURE__ */ W("aside", {
		"aria-label": C,
		"data-testid": O,
		"data-phase": o,
		"data-mode": s,
		className: e("flex h-full min-h-0 w-full min-w-0 flex-col bg-surface", D),
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
					icon: /* @__PURE__ */ U(l, {}),
					onClick: S,
					"data-testid": `${O}-close`
				})]
			}),
			w,
			/* @__PURE__ */ W("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: [
					u && o === "none" && _ && /* @__PURE__ */ U(kn, { onCreateRooms: _ }),
					u && o !== "none" && /* @__PURE__ */ U(An, {
						...n,
						left: F,
						folded: P
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
							_t(F)
						]
					}),
					a.length === 0 && !u && /* @__PURE__ */ U(r, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "block px-3 py-4",
						"data-testid": `${O}-empty`,
						children: "No breakout rooms yet. The organizer will open them."
					}),
					T && k && /* @__PURE__ */ W("div", {
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
								"aria-expanded": !P,
								"aria-controls": ee,
								"data-testid": "breakout-closed-toggle",
								children: P ? "Show rooms" : "Hide rooms"
							}),
							u && E && P && /* @__PURE__ */ U(t, {
								variant: "secondary",
								size: "sm",
								onClick: E,
								"data-testid": "breakout-delete",
								children: "Start new rooms"
							})
						]
					}),
					a.length > 0 && !P && /* @__PURE__ */ U("ul", {
						id: ee,
						className: "flex flex-col",
						"data-testid": "breakout-room-list",
						children: a.map((e) => {
							let t = e.id === c, n = e.state === "open" && o === "open" && !m && (s === "self-select" || u);
							return /* @__PURE__ */ U(Dn, {
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
					u && o !== "none" && !P && d.length > 0 && /* @__PURE__ */ W("section", {
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
									/* @__PURE__ */ U(M, {
										name: e.name,
										src: e.avatarUrl,
										size: 20
									}),
									/* @__PURE__ */ U(r, {
										size: "sm",
										className: "min-w-0 flex-1 truncate",
										children: e.name
									}),
									/* @__PURE__ */ U(xe, { raised: e.handRaised }),
									v && /* @__PURE__ */ U(On, {
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
export { _e as $, tt as A, Fe as B, mt as C, at as D, lt as E, Xe as F, De as G, je as H, Re as I, Ee as J, Q as K, Ie as L, $e as M, Qe as N, it as O, Ye as P, ye as Q, Le as R, _t as S, ot as T, Ae as U, ke as V, Oe as W, Y as X, Z as Y, xe as Z, Ft as _, pn as a, ve as at, At as b, sn as c, K as ct, nn as d, de as et, en as f, Wt as g, Lt as h, xn as i, ge as it, et as j, nt as k, an as l, G as lt, qt as m, Cn as n, pe as nt, fn as o, J as ot, $t as p, $ as q, Sn as r, fe as rt, ln as s, me as st, jn as t, he as tt, tn as u, Pt as v, ct as w, St as x, Tt as y, Pe as z };
