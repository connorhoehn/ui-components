import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Banner-Bya4ng_Y.js";
import { useCallback as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/FileUploadDrop.tsx
function s(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function c(e, t) {
	return t.split(",").map((e) => e.trim().toLowerCase()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function l({ accept: l, maxSize: u, multiple: d = !1, onFiles: f, onError: p, disabled: m = !1, label: h, className: g, "data-testid": _, inputTestId: v, inputProps: y }) {
	let [b, x] = i(!1), [S, C] = i(null), w = r(null), T = n((e) => {
		let t = Array.from(e);
		if (!d && t.length > 1) {
			let e = "Only one file is allowed.";
			return C(e), p?.(e), null;
		}
		for (let e of t) {
			if (l && !c(e, l)) {
				let t = `"${e.name}" has an unsupported file type.`;
				return C(t), p?.(t), null;
			}
			if (u && e.size > u) {
				let t = `"${e.name}" exceeds the ${s(u)} size limit.`;
				return C(t), p?.(t), null;
			}
		}
		return C(null), t;
	}, [
		l,
		u,
		d,
		p
	]), E = n((e) => {
		if (e.preventDefault(), x(!1), m) return;
		let t = T(e.dataTransfer.files);
		t && f(t);
	}, [
		m,
		T,
		f
	]), D = n((e) => {
		e.preventDefault(), m || x(!0);
	}, [m]), O = n(() => {
		x(!1);
	}, []), k = n((e) => {
		if (!e.target.files || e.target.files.length === 0) return;
		let t = T(e.target.files);
		t && f(t), e.target.value = "";
	}, [T, f]), A = u ? `Up to ${s(u)}` : void 0, j = l ?? void 0;
	return /* @__PURE__ */ o("div", {
		className: e("flex flex-col gap-2", g),
		"data-testid": _,
		children: [
			/* @__PURE__ */ o("div", {
				role: "button",
				tabIndex: m ? -1 : 0,
				"aria-label": h ?? "File upload drop zone",
				"aria-disabled": m,
				onDrop: E,
				onDragOver: D,
				onDragLeave: O,
				onClick: () => !m && w.current?.click(),
				onKeyDown: (e) => {
					!m && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), w.current?.click());
				},
				className: e("flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed", "px-6 py-10 text-center transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]", b ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]", m ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"),
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
					children: h ?? (b ? "Drop to upload" : "Drag & drop or click to upload")
				}), (j || A) && /* @__PURE__ */ a("p", {
					className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
					children: [j, A].filter(Boolean).join(" · ")
				})] })]
			}),
			S && /* @__PURE__ */ a(t, {
				variant: "error",
				onDismiss: () => C(null),
				children: S
			}),
			/* @__PURE__ */ a("input", {
				"aria-hidden": "true",
				tabIndex: -1,
				...y,
				ref: w,
				type: "file",
				accept: l,
				multiple: d,
				disabled: m,
				"data-testid": v,
				className: "hidden",
				onChange: k
			})
		]
	});
}
//#endregion
export { l as t };
