import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/shared/PresenceAvatars.tsx
var l = {
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
function u(e) {
	return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "var(--color-text-tertiary)" : e.online === !0 ? "#22c55e" : null;
}
function d(e) {
	if (e) return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function f({ user: t, isFollowing: n, onFollow: o, children: l }) {
	let [u, d] = a(!1), f = i(null), p = () => {
		f.current &&= (clearTimeout(f.current), null), d(!0);
	}, m = () => {
		f.current = setTimeout(() => d(!1), 150);
	};
	return r(() => () => {
		f.current && clearTimeout(f.current);
	}, []), /* @__PURE__ */ c("span", {
		className: "relative inline-flex",
		onMouseEnter: p,
		onMouseLeave: m,
		onFocus: p,
		onBlur: m,
		onKeyDown: (e) => {
			e.key === "Escape" && d(!1);
		},
		children: [l, u && /* @__PURE__ */ c("div", {
			role: "tooltip",
			"data-testid": "presence-card",
			onMouseEnter: p,
			onMouseLeave: m,
			className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 min-w-[140px] rounded-md border border-border bg-surface shadow-lg px-2.5 py-2 text-left",
			children: [
				/* @__PURE__ */ s("div", {
					className: "text-[12px] font-semibold text-text-primary whitespace-nowrap",
					children: t.name
				}),
				t.detail && /* @__PURE__ */ s("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap",
					children: t.detail
				}),
				t.location && /* @__PURE__ */ c("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap mt-0.5",
					children: ["§ ", t.location]
				}),
				/* @__PURE__ */ s("button", {
					type: "button",
					onClick: (e) => {
						e.stopPropagation(), o(t.id);
					},
					className: e("mt-1.5 text-[11px] font-semibold bg-transparent border-0 p-0 cursor-pointer", n ? "text-warning" : "text-info"),
					children: n ? "Stop following" : "Follow"
				})
			]
		})]
	});
}
function p({ users: r, maxVisible: i = 5, size: a = 28, onMoreClick: p, onUserClick: m, onFollowUser: h, followingUserId: g = null, className: _ }) {
	let v = r.slice(0, i), y = r.length - v.length, b = -(a * .3), x = Math.max(1, Math.round(a * .07)), S = Math.max(10, Math.round(a * .42));
	return /* @__PURE__ */ c("div", {
		className: e("inline-flex items-center", _),
		role: "list",
		"aria-label": "Online users",
		children: [v.map((e, r) => {
			let i = u(e), p = e.idle === !0, _ = p ? d(e.color) : e.color, v = p && !e.color ? .6 : void 0, y = e.mode ? l[e.mode] : null, C = [e.name];
			p ? C.push("Away") : y && C.push(y.label);
			let w = C.join(" — "), T = {
				"data-testid": "presence-avatar",
				"data-presence-user": e.name,
				"data-presence-user-id": e.id,
				...p ? { "data-presence-idle": "true" } : {},
				...e.mode ? { "data-presence-mode": e.mode } : {}
			}, E = /* @__PURE__ */ c(o, { children: [
				e.avatarUrl ? /* @__PURE__ */ s("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "rounded-full object-cover",
					style: {
						width: a,
						height: a,
						border: `${x}px solid white`,
						opacity: v
					}
				}) : /* @__PURE__ */ s(t, {
					name: e.name,
					size: a,
					color: _,
					style: {
						border: `${x}px solid white`,
						opacity: v
					}
				}),
				i && /* @__PURE__ */ s("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ s(n, {
						color: i,
						size: "xs",
						"aria-label": p ? `${e.name} away` : e.online === !1 ? `${e.name} offline` : `${e.name} online`
					})
				}),
				y && /* @__PURE__ */ s("span", {
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
			return ((t) => h ? /* @__PURE__ */ s(f, {
				user: e,
				isFollowing: g === e.id,
				onFollow: h,
				children: t
			}, e.id) : t)(m ? /* @__PURE__ */ s("button", {
				type: "button",
				role: "listitem",
				onClick: (t) => {
					t.stopPropagation(), m(e.id);
				},
				className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
				...h ? {} : { title: w },
				"aria-label": w,
				...T,
				style: D,
				children: E
			}, e.id) : /* @__PURE__ */ s("div", {
				role: "listitem",
				className: "relative shrink-0",
				...h ? {} : { title: w },
				...T,
				style: D,
				children: E
			}, e.id));
		}), y > 0 && /* @__PURE__ */ c("button", {
			type: "button",
			onClick: p,
			disabled: !p,
			"aria-label": `${y} more users`,
			className: e("inline-flex items-center justify-center rounded-full shrink-0", "font-semibold select-none bg-surface-emphasis text-text-secondary", p && "cursor-pointer hover:bg-surface-emphasis", !p && "cursor-default", "border-white"),
			style: {
				width: a,
				height: a,
				fontSize: a * .34,
				marginLeft: b,
				border: `${x}px solid white`
			},
			children: ["+", y]
		})]
	});
}
//#endregion
export { p as t };
