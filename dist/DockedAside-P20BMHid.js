import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./IconButton-IiLzRH-W.js";
import { h as n } from "./Icons-B_xESAH3.js";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/sidebar/SidebarSection.tsx
function d(e, t) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function f({ title: t, actions: n, collapsible: r = !0, defaultCollapsed: c = !1, storageKey: f, children: p, className: m, "data-testid": h = "sidebar-section" }) {
	let g = a(), _ = `${g}-label`, v = `${g}-body`, y = f ?? `sidebar-section:${t}`, [b, x] = s(() => r ? d(y, c) : !1);
	i(() => {
		if (r && !(typeof window > "u")) try {
			window.localStorage.setItem(y, String(b));
		} catch {}
	}, [
		b,
		r,
		y
	]);
	let S = !b, C = o(null), w = o(null);
	return /* @__PURE__ */ u("section", {
		"aria-labelledby": _,
		"data-testid": h,
		"data-collapsed": b ? "true" : "false",
		className: e("flex flex-col", m),
		children: [/* @__PURE__ */ u("div", {
			className: "flex items-center justify-between gap-1 py-2 pr-1",
			children: [/* @__PURE__ */ u("button", {
				type: "button",
				ref: C,
				id: _,
				"aria-expanded": r ? S : void 0,
				"aria-controls": v,
				onClick: () => {
					if (r) {
						if (S) {
							let e = typeof document > "u" ? null : document.activeElement;
							e && w.current?.contains(e) && C.current?.focus();
						}
						x((e) => !e);
					}
				},
				disabled: !r,
				className: e("flex items-center gap-1.5 min-w-0 flex-1", "text-[11px] font-bold uppercase tracking-[0.5px]", "text-neutral select-none text-left", r && "cursor-pointer hover:text-text-primary", !r && "cursor-default", "bg-transparent border-0 p-0 m-0"),
				children: [r && /* @__PURE__ */ l("span", {
					"aria-hidden": "true",
					className: e("inline-block text-[10px] leading-none transition-transform duration-150", S ? "rotate-90" : "rotate-0"),
					children: "▸"
				}), /* @__PURE__ */ l("span", {
					className: "truncate",
					children: t
				})]
			}), n && /* @__PURE__ */ l("div", {
				className: "flex items-center gap-1 shrink-0",
				children: n
			})]
		}), /* @__PURE__ */ l("div", {
			id: v,
			ref: w,
			hidden: !S,
			className: e("flex flex-col gap-0.5", S && "pb-1"),
			children: p
		})]
	});
}
//#endregion
//#region src/components/sidebar/SidebarRow.tsx
function p({ icon: t, label: n, trailing: i, active: a = !1, onClick: s, onContextMenu: d, href: f, kebab: p, disabled: m = !1, "aria-label": h, className: g, "data-testid": _ = "sidebar-row", dataAttrs: v }) {
	let y = {};
	if (v) for (let [e, t] of Object.entries(v)) t != null && t !== "" && (y[e] = t);
	let b = o(null), x = r(() => {
		m || s?.();
	}, [m, s]), S = r((e) => {
		if (!m) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault(), s?.();
				return;
			}
			e.key === "ContextMenu" && d && (e.preventDefault(), d(e));
		}
	}, [
		m,
		s,
		d
	]), C = r((e) => {
		m || d?.(e);
	}, [m, d]), w = !!s || !!f || !!d, T = e("group relative flex items-center gap-2 w-full", "px-2 py-1.5 rounded-md text-sm leading-tight select-none", "transition-colors duration-100", !m && w && "cursor-pointer hover:bg-surface-hover", a && !m && "bg-info-bg text-info-fg hover:bg-info-bg", !a && !m && "text-text-primary", m && "opacity-50 cursor-not-allowed text-neutral", "no-underline", g), E = /* @__PURE__ */ u(c, { children: [
		t && /* @__PURE__ */ l("span", {
			className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral",
			children: t
		}),
		/* @__PURE__ */ l("span", {
			className: "flex-1 min-w-0 truncate",
			children: n
		}),
		i && /* @__PURE__ */ l("span", {
			className: "flex items-center gap-1 shrink-0",
			children: i
		}),
		p && /* @__PURE__ */ l("span", {
			className: "shrink-0",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation(),
			children: p
		})
	] });
	return f ? /* @__PURE__ */ l("a", {
		ref: b,
		href: f,
		"aria-current": a ? "page" : void 0,
		"aria-disabled": m || void 0,
		"aria-label": h,
		"data-testid": _,
		"data-active": a ? "true" : "false",
		...y,
		className: T,
		onClick: (e) => {
			if (m) {
				e.preventDefault();
				return;
			}
			s && (e.preventDefault(), s());
		},
		onContextMenu: C,
		onKeyDown: S,
		children: E
	}) : /* @__PURE__ */ l("div", {
		ref: b,
		role: w ? "button" : void 0,
		tabIndex: w ? m ? -1 : 0 : void 0,
		"aria-pressed": w ? a : void 0,
		"aria-disabled": m || void 0,
		"aria-label": h,
		"data-testid": _,
		"data-active": a ? "true" : "false",
		...y,
		className: T,
		onClick: x,
		onContextMenu: C,
		onKeyDown: S,
		children: E
	});
}
//#endregion
//#region src/components/collaboration/ReactionsOverlay.tsx
var m = {
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
function h({ reactions: t }) {
	return /* @__PURE__ */ l("div", {
		className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]",
		children: t.map((t) => /* @__PURE__ */ l("span", {
			className: e("absolute text-[2rem] select-none", m[t.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"),
			style: {
				left: `${t.x}%`,
				top: `${t.y}%`
			},
			children: t.emoji
		}, t.id))
	});
}
//#endregion
//#region src/components/layout/DockedAside.tsx
function g({ children: r, width: i = 420, offsetTop: a, maxHeight: o = "calc(100vh - 180px)", title: s, onClose: c, closeLabel: d = "Close", bodyPadding: f = "md", className: p, "data-testid": m = "docked-aside" }) {
	return /* @__PURE__ */ u("aside", {
		"data-testid": m,
		className: e("flex shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-surface-panel", p),
		style: {
			width: i,
			marginTop: a,
			maxHeight: o
		},
		children: [(s !== void 0 || c) && /* @__PURE__ */ u("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3.5 py-3",
			"data-testid": `${m}-header`,
			children: [/* @__PURE__ */ l("div", {
				className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-secondary",
				children: s
			}), c && /* @__PURE__ */ l(t, {
				"aria-label": d,
				title: d,
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ l(n, { size: 14 }),
				onClick: c,
				"data-testid": `${m}-close`
			})]
		}), /* @__PURE__ */ l("div", {
			className: e("min-h-0 flex-1 overflow-y-auto", f === "md" && "px-3 py-3.5"),
			"data-testid": `${m}-body`,
			children: r
		})]
	});
}
var _ = {
	"bottom-right": "bottom-4 right-4",
	"bottom-left": "bottom-4 left-4",
	"top-right": "top-4 right-4",
	"top-left": "top-4 left-4"
};
function v({ children: t, corner: n = "bottom-right", width: r = 160, maxHeight: i = 280, className: a, "data-testid": o = "floating-card" }) {
	return /* @__PURE__ */ l("div", {
		"data-testid": o,
		"data-corner": n,
		className: e("fixed z-30 overflow-y-auto rounded-[10px] border border-border bg-surface px-3 py-2.5 shadow-lg", _[n], a),
		style: {
			width: r,
			maxHeight: i
		},
		children: t
	});
}
function y({ width: t, pinned: n, top: r, left: i, slotId: a, spacerRef: o, children: s, "data-testid": c = "pinned-slot" }) {
	return /* @__PURE__ */ l("div", {
		ref: o,
		className: "shrink-0",
		style: { width: t },
		"data-testid": c,
		children: /* @__PURE__ */ l("div", {
			id: a,
			className: e(n && "fixed z-30"),
			style: n ? {
				top: r,
				left: i,
				width: t
			} : void 0,
			"data-pinned": n ? "true" : "false",
			children: s
		})
	});
}
//#endregion
export { p as a, h as i, v as n, f as o, y as r, g as t };
