import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/sidebar/SidebarSection.tsx
function l(e, t) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function u({ title: t, actions: i, collapsible: o = !0, defaultCollapsed: u = !1, storageKey: d, children: f, className: p, "data-testid": m = "sidebar-section" }) {
	let h = r(), g = `${h}-label`, _ = `${h}-body`, v = d ?? `sidebar-section:${t}`, [y, b] = a(() => o ? l(v, u) : !1);
	n(() => {
		if (o && !(typeof window > "u")) try {
			window.localStorage.setItem(v, String(y));
		} catch {}
	}, [
		y,
		o,
		v
	]);
	let x = !y;
	return /* @__PURE__ */ c("section", {
		"aria-labelledby": g,
		"data-testid": m,
		"data-collapsed": y ? "true" : "false",
		className: e("flex flex-col", p),
		children: [/* @__PURE__ */ c("div", {
			className: "flex items-center justify-between gap-1 py-2 pr-1",
			children: [/* @__PURE__ */ c("button", {
				type: "button",
				id: g,
				"aria-expanded": o ? x : void 0,
				"aria-controls": _,
				onClick: () => {
					o && b((e) => !e);
				},
				disabled: !o,
				className: e("flex items-center gap-1.5 min-w-0 flex-1", "text-[11px] font-bold uppercase tracking-[0.5px]", "text-neutral select-none text-left", o && "cursor-pointer hover:text-text-primary", !o && "cursor-default", "bg-transparent border-0 p-0 m-0"),
				children: [o && /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: e("inline-block text-[10px] leading-none transition-transform duration-150", x ? "rotate-90" : "rotate-0"),
					children: "▸"
				}), /* @__PURE__ */ s("span", {
					className: "truncate",
					children: t
				})]
			}), i && /* @__PURE__ */ s("div", {
				className: "flex items-center gap-1 shrink-0",
				children: i
			})]
		}), /* @__PURE__ */ s("div", {
			id: _,
			hidden: !x,
			className: e("flex flex-col gap-0.5", x && "pb-1"),
			children: f
		})]
	});
}
//#endregion
//#region src/components/sidebar/SidebarRow.tsx
function d({ icon: n, label: r, trailing: a, active: l = !1, onClick: u, onContextMenu: d, href: f, kebab: p, disabled: m = !1, "aria-label": h, className: g, "data-testid": _ = "sidebar-row", dataAttrs: v }) {
	let y = {};
	if (v) for (let [e, t] of Object.entries(v)) t != null && t !== "" && (y[e] = t);
	let b = i(null), x = t(() => {
		m || u?.();
	}, [m, u]), S = t((e) => {
		if (!m) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault(), u?.();
				return;
			}
			e.key === "ContextMenu" && d && (e.preventDefault(), d(e));
		}
	}, [
		m,
		u,
		d
	]), C = t((e) => {
		m || d?.(e);
	}, [m, d]), w = e("group relative flex items-center gap-2 w-full", "px-2 py-1.5 rounded-md text-sm leading-tight select-none", "transition-colors duration-100", !m && "cursor-pointer hover:bg-surface-hover", l && !m && "bg-info-bg text-info-fg hover:bg-info-bg", !l && !m && "text-text-primary", m && "opacity-50 cursor-not-allowed text-neutral", "no-underline", g), T = /* @__PURE__ */ c(o, { children: [
		n && /* @__PURE__ */ s("span", {
			className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral",
			children: n
		}),
		/* @__PURE__ */ s("span", {
			className: "flex-1 min-w-0 truncate",
			children: r
		}),
		a && /* @__PURE__ */ s("span", {
			className: "flex items-center gap-1 shrink-0",
			children: a
		}),
		p && /* @__PURE__ */ s("span", {
			className: "shrink-0",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation(),
			children: p
		})
	] });
	return f ? /* @__PURE__ */ s("a", {
		ref: b,
		href: f,
		"aria-current": l ? "page" : void 0,
		"aria-disabled": m || void 0,
		"aria-label": h,
		"data-testid": _,
		"data-active": l ? "true" : "false",
		...y,
		className: w,
		onClick: (e) => {
			if (m) {
				e.preventDefault();
				return;
			}
			u && (e.preventDefault(), u());
		},
		onContextMenu: C,
		onKeyDown: S,
		children: T
	}) : /* @__PURE__ */ s("div", {
		ref: b,
		role: "button",
		tabIndex: m ? -1 : 0,
		"aria-pressed": l,
		"aria-disabled": m || void 0,
		"aria-label": h,
		"data-testid": _,
		"data-active": l ? "true" : "false",
		...y,
		className: w,
		onClick: x,
		onContextMenu: C,
		onKeyDown: S,
		children: T
	});
}
//#endregion
//#region src/components/collaboration/ReactionsOverlay.tsx
var f = {
	"❤️": "[animation:reaction-heart_2.5s_ease-out_forwards]",
	"😂": "[animation:reaction-laugh_2.5s_ease-out_forwards]",
	"👍": "[animation:reaction-thumbsup_2.5s_ease-out_forwards]",
	"👎": "[animation:reaction-thumbsdown_2.5s_ease-out_forwards]",
	"😮": "[animation:reaction-wow_2.5s_ease-out_forwards]",
	"😢": "[animation:reaction-cry_2.5s_ease-out_forwards]",
	"😡": "[animation:reaction-angry_1.8s_ease-out_forwards]",
	"🎉": "[animation:reaction-party_2.5s_ease-out_forwards]",
	"🔥": "[animation:reaction-fire_2.5s_ease-out_forwards]",
	"⚡": "[animation:reaction-lightning_1.5s_ease-out_forwards]",
	"💯": "[animation:reaction-hundred_2.0s_ease-out_forwards]",
	"🚀": "[animation:reaction-rocket_2.0s_ease-out_forwards]"
};
function p({ reactions: t }) {
	return /* @__PURE__ */ s("div", {
		className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]",
		children: t.map((t) => /* @__PURE__ */ s("span", {
			className: e("absolute text-[2rem] select-none", f[t.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"),
			style: {
				left: `${t.x}%`,
				top: `${t.y}%`
			},
			children: t.emoji
		}, t.id))
	});
}
//#endregion
export { d as n, u as r, p as t };
