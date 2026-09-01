import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Banner-BLOg1hC_.js";
import { useCallback as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/Switch.tsx
var s = {
	sm: "w-7 h-4",
	md: "w-9 h-5"
}, c = {
	sm: "w-3 h-3",
	md: "w-4 h-4"
}, l = {
	sm: "translate-x-3",
	md: "translate-x-4"
};
function u({ checked: t, onChange: n, disabled: r = !1, size: i = "md", "aria-label": o, "aria-labelledby": u, className: d, style: f, "data-testid": p }) {
	return /* @__PURE__ */ a("button", {
		type: "button",
		role: "switch",
		"aria-checked": t,
		"aria-label": o,
		"aria-labelledby": u,
		disabled: r,
		"data-testid": p,
		onClick: () => {
			r || n(!t);
		},
		className: e("relative inline-flex items-center rounded-full border border-transparent transition-colors", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", s[i], t ? "bg-info" : "bg-surface-emphasis", r ? "opacity-50 cursor-not-allowed" : "cursor-pointer", d),
		style: f,
		children: /* @__PURE__ */ a("span", { className: e("inline-block rounded-full bg-white shadow transform transition-transform", c[i], t ? l[i] : "translate-x-0.5") })
	});
}
//#endregion
//#region src/components/shared/FileUploadDrop.tsx
function d(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function f(e, t) {
	return t.split(",").map((e) => e.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function p({ accept: s, maxSize: c, multiple: l = !1, onFiles: u, onError: p, disabled: m = !1, label: h, className: g, "data-testid": _ }) {
	let [v, y] = i(!1), [b, x] = i(null), S = r(null), C = n((e) => {
		let t = Array.from(e);
		if (!l && t.length > 1) {
			let e = "Only one file is allowed.";
			return x(e), p?.(e), null;
		}
		for (let e of t) {
			if (s && !f(e, s)) {
				let t = `"${e.name}" has an unsupported file type.`;
				return x(t), p?.(t), null;
			}
			if (c && e.size > c) {
				let t = `"${e.name}" exceeds the ${d(c)} size limit.`;
				return x(t), p?.(t), null;
			}
		}
		return x(null), t;
	}, [
		s,
		c,
		l,
		p
	]), w = n((e) => {
		if (e.preventDefault(), y(!1), m) return;
		let t = C(e.dataTransfer.files);
		t && u(t);
	}, [
		m,
		C,
		u
	]), T = n((e) => {
		e.preventDefault(), m || y(!0);
	}, [m]), E = n(() => {
		y(!1);
	}, []), D = n((e) => {
		if (!e.target.files || e.target.files.length === 0) return;
		let t = C(e.target.files);
		t && u(t), e.target.value = "";
	}, [C, u]), O = c ? `Up to ${d(c)}` : void 0, k = s ?? void 0;
	return /* @__PURE__ */ o("div", {
		className: e("flex flex-col gap-2", g),
		"data-testid": _,
		children: [
			/* @__PURE__ */ o("div", {
				role: "button",
				tabIndex: m ? -1 : 0,
				"aria-label": h ?? "File upload drop zone",
				"aria-disabled": m,
				onDrop: w,
				onDragOver: T,
				onDragLeave: E,
				onClick: () => !m && S.current?.click(),
				onKeyDown: (e) => {
					!m && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), S.current?.click());
				},
				className: e("flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed", "px-6 py-10 text-center transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]", v ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]", m ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"),
				children: [/* @__PURE__ */ o("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					fill: "none",
					"aria-hidden": "true",
					className: "text-[var(--color-text-tertiary)]",
					children: [/* @__PURE__ */ a("path", {
						d: "M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3",
						stroke: "currentColor",
						strokeWidth: "1.75",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), /* @__PURE__ */ a("rect", {
						x: "2",
						y: "2",
						width: "28",
						height: "28",
						rx: "6",
						stroke: "currentColor",
						strokeWidth: "1.5",
						opacity: ".2"
					})]
				}), /* @__PURE__ */ o("div", { children: [/* @__PURE__ */ a("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: h ?? (v ? "Drop to upload" : "Drag & drop or click to upload")
				}), (k || O) && /* @__PURE__ */ a("p", {
					className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
					children: [k, O].filter(Boolean).join(" · ")
				})] })]
			}),
			b && /* @__PURE__ */ a(t, {
				variant: "error",
				onDismiss: () => x(null),
				children: b
			}),
			/* @__PURE__ */ a("input", {
				ref: S,
				type: "file",
				accept: s,
				multiple: l,
				disabled: m,
				"aria-hidden": "true",
				tabIndex: -1,
				className: "hidden",
				onChange: D
			})
		]
	});
}
//#endregion
export { u as n, p as t };
