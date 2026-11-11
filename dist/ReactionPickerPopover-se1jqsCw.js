import { d as e } from "./Button-DQoeE5dN.js";
import { a as t, i as n } from "./InlinePopover-CEzf8hyR.js";
import { forwardRef as r, useCallback as i, useEffect as a, useId as o, useLayoutEffect as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { Command as f } from "cmdk";
import { createPortal as p } from "react-dom";
//#region src/components/forms/FileInput.tsx
var m = r(function({ onFiles: t, className: n, "data-testid": r, ...i }, a) {
	return /* @__PURE__ */ u("input", {
		"data-ui-part": "",
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
function h(e, t) {
	let n = t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
	return n.length === 0 || n.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function g(e) {
	let t = e.dataTransfer?.types;
	return t ? Array.prototype.indexOf.call(t, "Files") !== -1 : !1;
}
function _({ children: t, onFiles: n, accept: r, maxSize: a, onError: o, disabled: s = !1, label: f, className: p }) {
	let [m, _] = l(!1), v = c(0), y = i(() => {
		v.current = 0, _(!1);
	}, []), b = i((e) => {
		s || !g(e) || (e.preventDefault(), v.current += 1, _(!0));
	}, [s]), x = i((e) => {
		s || !g(e) || (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
	}, [s]), S = i((e) => {
		g(e) && (v.current = Math.max(0, v.current - 1), v.current === 0 && _(!1));
	}, []), C = i((e) => {
		if (s) return;
		e.preventDefault(), y();
		let t = Array.from(e.dataTransfer?.files ?? []);
		if (t.length === 0) return;
		let i = t.filter((e) => r && !h(e, r) || !!a && e.size > a);
		i.length > 0 && o?.(i.length === t.length ? `Can't attach ${i.map((e) => e.name).join(", ")} — unsupported type or too large.` : `Skipped ${i.length} file(s) — unsupported type or too large.`);
		let c = t.filter((e) => !i.includes(e));
		c.length > 0 && n(c);
	}, [
		r,
		s,
		a,
		o,
		n,
		y
	]);
	return /* @__PURE__ */ d("div", {
		"data-testid": "chat-drop-zone",
		"data-dragging": m ? "true" : "false",
		onDragEnter: b,
		onDragOver: x,
		onDragLeave: S,
		onDrop: C,
		className: e("relative", p),
		children: [t, m && /* @__PURE__ */ u("div", {
			"data-testid": "chat-drop-zone-overlay",
			className: e("pointer-events-none absolute inset-0 z-20 flex items-center justify-center", "rounded-lg border-2 border-dashed border-[var(--color-primary)]", "bg-[var(--color-surface)]/85 backdrop-blur-[1px]"),
			children: /* @__PURE__ */ u("span", {
				className: "text-sm font-semibold text-[var(--color-primary)]",
				children: f ?? "Drop to share with everyone here"
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var v = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function y(e, r, i) {
	let [a, o] = l(null);
	return s(() => {
		if (!i || !e?.current) {
			o(null);
			return;
		}
		let a = () => {
			let i = e.current, a = r.current;
			if (!i || !a) return;
			let s = i.getBoundingClientRect(), c = n(i, window.innerWidth), l = t(s, window.innerHeight), u = Math.max(1, c.right - c.left - 16), d = Math.max(1, l - 16);
			a.style.maxWidth = `${u}px`, a.style.maxHeight = `${d}px`;
			let f = a.getBoundingClientRect(), p = Math.min(f.width, u), m = Math.min(f.height, d), h = s.top - 12 - m, g = s.bottom + 6, _ = {
				position: "fixed",
				top: h >= 8 ? h : g + m <= l - 8 ? g : Math.max(8, l - 8 - m),
				left: Math.max(c.left + 8, Math.min(s.left, c.right - 8 - p)),
				maxWidth: u,
				maxHeight: d
			};
			o((e) => e?.top === _.top && e.left === _.left && e.maxWidth === u && e.maxHeight === d ? e : _);
		};
		a();
		let s = new ResizeObserver(a);
		return r.current && s.observe(r.current), window.addEventListener("scroll", a, !0), window.addEventListener("resize", a), () => {
			s.disconnect(), window.removeEventListener("scroll", a, !0), window.removeEventListener("resize", a);
		};
	}, [
		i,
		e,
		r
	]), a;
}
function b({ open: t, onSelect: n, onClose: r, triggerRef: s, emojis: l = v, showSearch: m = !0, className: h, style: g }) {
	let _ = c(null), b = o(), x = y(s, _, t);
	a(() => {
		if (!t) return;
		let e = (e) => {
			let t = e.target;
			_.current?.contains(t) || s?.current?.contains(t) || r();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		t,
		r,
		s
	]), a(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), r());
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [t, r]);
	let S = c(null), C = c(!1);
	a(() => {
		if (t) {
			C.current = !0;
			let e = document.activeElement;
			S.current = e instanceof HTMLElement ? e : null;
			return;
		}
		if (!C.current) return;
		C.current = !1;
		let e = S.current ?? s?.current ?? null;
		S.current = null, e?.isConnected && e.focus();
	}, [t, s]);
	let w = i((e) => {
		n(e), r();
	}, [n, r]);
	if (!t) return null;
	let T = /* @__PURE__ */ u("div", {
		ref: _,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: e("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem] overflow-y-auto", h),
		style: {
			...x ?? { position: "absolute" },
			...g
		},
		children: /* @__PURE__ */ d(f, {
			label: "Pick a reaction",
			loop: !0,
			children: [m && /* @__PURE__ */ u(f.Input, {
				id: `${b}-search`,
				placeholder: "Search reactions…",
				className: e("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ d(f.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ u(f.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ u("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: l.map((t) => /* @__PURE__ */ u(f.Item, {
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
	});
	return s?.current ? p(T, document.body) : T;
}
//#endregion
export { m as i, b as n, _ as r, v as t };
