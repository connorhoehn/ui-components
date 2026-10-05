import { t as e } from "./cn-D4QmbyEy.js";
import { forwardRef as t, useCallback as n, useEffect as r, useId as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { Command as d } from "cmdk";
//#region src/components/forms/FileInput.tsx
var f = t(function({ onFiles: t, className: n, "data-testid": r, ...i }, a) {
	return /* @__PURE__ */ l("input", {
		ref: a,
		type: "file",
		"aria-hidden": "true",
		tabIndex: -1,
		"data-testid": r,
		className: e("hidden", n),
		onChange: (e) => {
			t(Array.from(e.target.files ?? [])), e.target.value = "";
		},
		...i
	});
});
//#endregion
//#region src/components/social/ChatDropZone.tsx
function p(e, t) {
	let n = t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
	return n.length === 0 || n.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function m(e) {
	let t = e.dataTransfer?.types;
	return t ? Array.prototype.indexOf.call(t, "Files") !== -1 : !1;
}
function h({ children: t, onFiles: r, accept: i, maxSize: a, onError: o, disabled: d = !1, label: f, className: h }) {
	let [g, _] = c(!1), v = s(0), y = n(() => {
		v.current = 0, _(!1);
	}, []), b = n((e) => {
		!d && m(e) && (e.preventDefault(), v.current += 1, _(!0));
	}, [d]), x = n((e) => {
		!d && m(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
	}, [d]), S = n((e) => {
		m(e) && (v.current = Math.max(0, v.current - 1), v.current === 0 && _(!1));
	}, []), C = n((e) => {
		if (d) return;
		e.preventDefault(), y();
		let t = Array.from(e.dataTransfer?.files ?? []);
		if (t.length === 0) return;
		let n = t.filter((e) => i && !p(e, i) || !!a && e.size > a);
		n.length > 0 && o?.(n.length === t.length ? `Can't attach ${n.map((e) => e.name).join(", ")} — unsupported type or too large.` : `Skipped ${n.length} file(s) — unsupported type or too large.`);
		let s = t.filter((e) => !n.includes(e));
		s.length > 0 && r(s);
	}, [
		i,
		d,
		a,
		o,
		r,
		y
	]);
	return /* @__PURE__ */ u("div", {
		"data-testid": "chat-drop-zone",
		"data-dragging": g ? "true" : "false",
		onDragEnter: b,
		onDragOver: x,
		onDragLeave: S,
		onDrop: C,
		className: e("relative", h),
		children: [t, g && /* @__PURE__ */ l("div", {
			"data-testid": "chat-drop-zone-overlay",
			className: e("pointer-events-none absolute inset-0 z-20 flex items-center justify-center", "rounded-lg border-2 border-dashed border-[var(--color-primary)]", "bg-[var(--color-surface)]/85 backdrop-blur-[1px]"),
			children: /* @__PURE__ */ l("span", {
				className: "text-sm font-semibold text-[var(--color-primary)]",
				children: f ?? "Drop to share with everyone here"
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var g = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function _(e, t) {
	let [n, r] = c(null);
	return a(() => {
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
function v({ open: t, onSelect: a, onClose: c, triggerRef: f, emojis: p = g, showSearch: m = !0, className: h, style: v }) {
	let y = s(null), b = i(), x = _(f, t);
	r(() => {
		if (!t) return;
		let e = (e) => {
			let t = e.target;
			y.current?.contains(t) || f?.current?.contains(t) || c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		t,
		c,
		f
	]), r(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), c());
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [t, c]);
	let S = s(null), C = s(!1);
	r(() => {
		if (t) {
			C.current = !0;
			let e = document.activeElement;
			S.current = e instanceof HTMLElement ? e : null;
			return;
		}
		if (!C.current) return;
		C.current = !1;
		let e = S.current ?? f?.current ?? null;
		S.current = null, e?.isConnected && e.focus();
	}, [t, f]);
	let w = n((e) => {
		a(e), c();
	}, [a, c]), T = o(() => x ? {
		position: "fixed",
		top: x.top,
		left: x.left,
		transform: "translateY(-100%)"
	} : { position: "absolute" }, [x]);
	return t ? /* @__PURE__ */ l("div", {
		ref: y,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: e("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem]", h),
		style: {
			...T,
			...v
		},
		children: /* @__PURE__ */ u(d, {
			label: "Pick a reaction",
			loop: !0,
			children: [m && /* @__PURE__ */ l(d.Input, {
				id: `${b}-search`,
				placeholder: "Search reactions…",
				className: e("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ u(d.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ l(d.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ l("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: p.map((t) => /* @__PURE__ */ l(d.Item, {
						value: t,
						onSelect: () => w(t),
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
export { f as i, v as n, h as r, g as t };
