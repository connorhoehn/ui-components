import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Command as u } from "cmdk";
//#region src/components/social/ChatDropZone.tsx
function d(e, t) {
	let n = t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
	return n.length === 0 || n.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function f(e) {
	let t = e.dataTransfer?.types;
	return t ? Array.prototype.indexOf.call(t, "Files") !== -1 : !1;
}
function p({ children: n, onFiles: r, accept: i, maxSize: a, onError: u, disabled: p = !1, label: m, className: h }) {
	let [g, _] = s(!1), v = o(0), y = t(() => {
		v.current = 0, _(!1);
	}, []), b = t((e) => {
		p || !f(e) || (e.preventDefault(), v.current += 1, _(!0));
	}, [p]), x = t((e) => {
		p || !f(e) || (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
	}, [p]), S = t((e) => {
		f(e) && (v.current = Math.max(0, v.current - 1), v.current === 0 && _(!1));
	}, []), C = t((e) => {
		if (p) return;
		e.preventDefault(), y();
		let t = Array.from(e.dataTransfer?.files ?? []);
		if (t.length === 0) return;
		let n = t.filter((e) => i && !d(e, i) || !!a && e.size > a);
		n.length > 0 && u?.(n.length === t.length ? `Can't attach ${n.map((e) => e.name).join(", ")} — unsupported type or too large.` : `Skipped ${n.length} file(s) — unsupported type or too large.`);
		let o = t.filter((e) => !n.includes(e));
		o.length > 0 && r(o);
	}, [
		i,
		p,
		a,
		u,
		r,
		y
	]);
	return /* @__PURE__ */ l("div", {
		"data-testid": "chat-drop-zone",
		"data-dragging": g ? "true" : "false",
		onDragEnter: b,
		onDragOver: x,
		onDragLeave: S,
		onDrop: C,
		className: e("relative", h),
		children: [n, g && /* @__PURE__ */ c("div", {
			"data-testid": "chat-drop-zone-overlay",
			className: e("pointer-events-none absolute inset-0 z-20 flex items-center justify-center", "rounded-lg border-2 border-dashed border-[var(--color-primary)]", "bg-[var(--color-surface)]/85 backdrop-blur-[1px]"),
			children: /* @__PURE__ */ c("span", {
				className: "text-sm font-semibold text-[var(--color-primary)]",
				children: m ?? "Drop to share with everyone here"
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var m = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function h(e, t) {
	let [n, r] = s(null);
	return i(() => {
		if (!t || !e?.current) {
			r(null);
			return;
		}
		let n = () => {
			let t = e.current;
			if (!t) return;
			let n = t.getBoundingClientRect();
			r({
				top: Math.max(8, n.top - 12),
				left: n.left
			});
		};
		return n(), window.addEventListener("scroll", n, !0), window.addEventListener("resize", n), () => {
			window.removeEventListener("scroll", n, !0), window.removeEventListener("resize", n);
		};
	}, [t, e]), n;
}
function g({ open: i, onSelect: s, onClose: d, triggerRef: f, emojis: p = m, showSearch: g = !0, className: _, style: v }) {
	let y = o(null), b = r(), x = h(f, i);
	n(() => {
		if (!i) return;
		let e = (e) => {
			let t = e.target;
			y.current?.contains(t) || f?.current?.contains(t) || d();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		i,
		d,
		f
	]), n(() => {
		if (!i) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), d());
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [i, d]);
	let S = t((e) => {
		s(e), d();
	}, [s, d]), C = a(() => x ? {
		position: "fixed",
		top: x.top,
		left: x.left,
		transform: "translateY(-100%)"
	} : { position: "absolute" }, [x]);
	return i ? /* @__PURE__ */ c("div", {
		ref: y,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: e("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem]", _),
		style: {
			...C,
			...v
		},
		children: /* @__PURE__ */ l(u, {
			label: "Pick a reaction",
			loop: !0,
			children: [g && /* @__PURE__ */ c(u.Input, {
				id: `${b}-search`,
				placeholder: "Search reactions…",
				className: e("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ l(u.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ c(u.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ c("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: p.map((t) => /* @__PURE__ */ c(u.Item, {
						value: t,
						onSelect: () => S(t),
						"data-testid": "reaction-picker-item",
						"data-emoji": t,
						className: e("flex items-center justify-center text-xl rounded-md", "h-9 cursor-pointer select-none", "aria-selected:bg-[var(--color-primary)]/20", "hover:bg-white/5"),
						children: t
					}, t))
				})]
			})]
		})
	}) : null;
}
//#endregion
export { g as n, p as r, m as t };
