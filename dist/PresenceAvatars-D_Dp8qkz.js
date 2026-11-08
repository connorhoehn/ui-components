import { d as e } from "./Button-DQoeE5dN.js";
import { n as t } from "./Avatar-BcOAdTaX.js";
import { t as n } from "./StatusDot-DAok6F5B.js";
import { useEffect as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/PresenceAvatars.tsx
var u = {
	editor: {
		glyph: "✏",
		label: "Editing"
	},
	reviewer: {
		glyph: "✔",
		label: "Reviewing"
	},
	reader: {
		glyph: "👁",
		label: "Viewing"
	}
};
function d(e) {
	return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "var(--color-text-tertiary)" : e.online === !0 ? "#22c55e" : null;
}
function f(e) {
	if (e) return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function p(e) {
	let t = e.ownerDocument.defaultView, n = {
		left: 0,
		top: 0,
		right: t?.innerWidth ?? Infinity,
		bottom: t?.innerHeight ?? Infinity
	};
	for (let r = e.parentElement; r && r !== e.ownerDocument.body; r = r.parentElement) {
		let e = t?.getComputedStyle(r);
		if (!e) break;
		let i = (e) => e !== "" && e !== "visible", a = i(e.overflowX || e.overflow), o = i(e.overflowY || e.overflow);
		if (!a && !o) continue;
		let s = r.getBoundingClientRect();
		a && (n.left = Math.max(n.left, s.left), n.right = Math.min(n.right, s.right)), o && (n.top = Math.max(n.top, s.top), n.bottom = Math.min(n.bottom, s.bottom));
	}
	return n;
}
var m = 8;
function h({ user: t, isFollowing: n, onFollow: s, children: u }) {
	let [d, f] = o(!1), h = a(null), [g, _] = o({
		shift: 0,
		above: !1
	});
	i(() => {
		if (!d) {
			_({
				shift: 0,
				above: !1
			});
			return;
		}
		let e = h.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = p(e), r = 0;
		t.left < n.left + m ? r = n.left + m - t.left : t.right > n.right - m && (r = n.right - m - t.right);
		let i = e.parentElement?.getBoundingClientRect(), a = i ? i.top - n.top : 0, o = t.bottom > n.bottom - m && a > t.height + m;
		_({
			shift: Math.round(r),
			above: o
		});
	}, [d]);
	let v = a(null), y = () => {
		v.current &&= (clearTimeout(v.current), null), f(!0);
	}, b = () => {
		v.current = setTimeout(() => f(!1), 150);
	};
	return r(() => () => {
		v.current && clearTimeout(v.current);
	}, []), /* @__PURE__ */ l("span", {
		className: "relative inline-flex",
		onMouseEnter: y,
		onMouseLeave: b,
		onFocus: y,
		onBlur: b,
		onKeyDown: (e) => {
			e.key === "Escape" && f(!1);
		},
		children: [u, d && /* @__PURE__ */ l("div", {
			ref: h,
			role: "tooltip",
			"data-testid": "presence-card",
			"data-placement": g.above ? "top" : "bottom",
			onMouseEnter: y,
			onMouseLeave: b,
			style: { "--presence-card-shift": `${g.shift}px` },
			className: e("absolute left-1/2 z-50 min-w-[140px] translate-x-[calc(-50%+var(--presence-card-shift,0px))] rounded-md border border-border bg-surface px-2.5 py-2 text-left shadow-lg", g.above ? "bottom-full mb-1.5" : "top-full mt-1.5"),
			children: [
				/* @__PURE__ */ c("div", {
					className: "text-[12px] font-semibold text-text-primary whitespace-nowrap",
					children: t.name
				}),
				t.detail && /* @__PURE__ */ c("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap",
					children: t.detail
				}),
				t.location && /* @__PURE__ */ l("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap mt-0.5",
					children: ["§ ", t.location]
				}),
				/* @__PURE__ */ c("button", {
					"data-ui-part": "",
					type: "button",
					onClick: (e) => {
						e.stopPropagation(), s(t.id);
					},
					className: e("mt-1.5 text-[11px] font-semibold bg-transparent border-0 p-0 cursor-pointer", n ? "text-warning" : "text-info"),
					children: n ? "Stop following" : "Follow"
				})
			]
		})]
	});
}
function g({ users: r, maxVisible: i = 5, size: a = 28, onMoreClick: o, onUserClick: p, onFollowUser: m, followingUserId: g = null, className: _ }) {
	let v = r.slice(0, i), y = r.length - v.length, b = -(a * .3), x = Math.max(1, Math.round(a * .07)), S = Math.max(10, Math.round(a * .42));
	return /* @__PURE__ */ l("div", {
		className: e("inline-flex items-center", _),
		role: "list",
		"aria-label": "Online users",
		children: [v.map((e, r) => {
			let i = d(e), o = e.idle === !0, _ = o ? f(e.color) : e.color, v = o && !e.color ? .6 : void 0, y = e.mode ? u[e.mode] : null, C = [e.name];
			o ? C.push("Away") : y && C.push(y.label);
			let w = C.join(" — ") + (e.detail ? `: ${e.detail}` : ""), T = {
				"data-testid": "presence-avatar",
				"data-presence-user": e.name,
				"data-presence-user-id": e.id,
				...o ? { "data-presence-idle": "true" } : {},
				...e.mode ? { "data-presence-mode": e.mode } : {},
				...e.detail ? { "data-presence-detail": e.detail } : {}
			}, E = /* @__PURE__ */ l(s, { children: [
				e.avatarUrl ? /* @__PURE__ */ c("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "rounded-full object-cover",
					style: {
						width: a,
						height: a,
						border: `${x}px solid white`,
						opacity: v
					}
				}) : /* @__PURE__ */ c(t, {
					name: e.name,
					size: a,
					color: _,
					style: {
						border: `${x}px solid white`,
						opacity: v
					}
				}),
				i && /* @__PURE__ */ c("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ c(n, {
						color: i,
						size: "xs",
						"aria-label": o ? `${e.name} away` : e.online === !1 ? `${e.name} offline` : `${e.name} online`
					})
				}),
				y && /* @__PURE__ */ c("span", {
					className: "absolute flex items-center justify-center rounded-full bg-surface border border-border select-none",
					style: {
						top: -x,
						right: -x,
						width: S,
						height: S,
						fontSize: S * .6,
						lineHeight: 1
					},
					"data-testid": "presence-mode-badge",
					"aria-label": y.label,
					children: y.glyph
				})
			] }), D = { marginLeft: r > 0 ? b : 0 };
			return ((t) => m ? /* @__PURE__ */ c(h, {
				user: e,
				isFollowing: g === e.id,
				onFollow: m,
				children: t
			}, e.id) : t)(p ? /* @__PURE__ */ c("button", {
				"data-ui-part": "",
				type: "button",
				role: "listitem",
				onClick: (t) => {
					t.stopPropagation(), p(e.id);
				},
				className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
				...m ? {} : { title: w },
				"aria-label": w,
				...T,
				style: D,
				children: E
			}, e.id) : /* @__PURE__ */ c("div", {
				role: "listitem",
				className: "relative shrink-0",
				...m ? {} : { title: w },
				...T,
				style: D,
				children: E
			}, e.id));
		}), y > 0 && /* @__PURE__ */ l("button", {
			"data-ui-part": "",
			type: "button",
			onClick: o,
			disabled: !o,
			"aria-label": `${y} more users`,
			"data-ui-text": "avatar",
			className: e("inline-flex items-center justify-center rounded-full shrink-0", "font-semibold select-none bg-surface-emphasis text-text-secondary", o && "cursor-pointer hover:bg-surface-emphasis", !o && "cursor-default", "border-white"),
			style: {
				width: a,
				height: a,
				fontSize: Math.max(10, a * .34),
				marginLeft: b,
				border: `${x}px solid white`
			},
			children: ["+", y]
		})]
	});
}
//#endregion
export { g as t };
