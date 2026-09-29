import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-D4QmbyEy.js";
import { createContext as n, useCallback as r, useContext as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/Toast.tsx
var u = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	error: "text-danger"
}, d = {
	info: "border-l-info",
	success: "border-l-success",
	warning: "border-l-warning",
	error: "border-l-danger"
};
function f({ id: n, message: r, type: i, exiting: a, actionLabel: o, onAction: s, onDismiss: f }) {
	let p = e(), m = i === "error" || i === "warning", h = p ? "animate-none" : a ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
	return /* @__PURE__ */ l("div", {
		role: m ? "alert" : "status",
		className: t("bg-surface border border-border border-l-[3px] rounded-lg", "px-4 py-3 flex items-center justify-between gap-3", "font-[system-ui,-apple-system,sans-serif] shadow-md", "min-w-[260px] max-w-[360px]", d[i], h, p && a && "opacity-0"),
		children: [/* @__PURE__ */ c("span", {
			className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]",
			children: r
		}), /* @__PURE__ */ l("div", {
			className: "flex items-center gap-1 shrink-0",
			children: [o && s && /* @__PURE__ */ c("button", {
				onClick: () => {
					s(), f(n);
				},
				className: t("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", u[i]),
				children: o
			}), /* @__PURE__ */ c("button", {
				onClick: () => f(n),
				"aria-label": "Dismiss notification",
				className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
				children: "×"
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/ToastProvider.tsx
var p = n(null), m = {
	info: 3e3,
	success: 3e3,
	warning: 5e3,
	error: 6e3
}, h = 160;
function g({ children: e }) {
	let [t, n] = s([]), i = o(/* @__PURE__ */ new Map()), u = r((e) => {
		let t = i.current.get(e);
		t && (clearTimeout(t), i.current.delete(e));
	}, []), d = r((e) => {
		u(e), n((t) => t.filter((t) => t.id !== e));
	}, [u]), g = r((e) => {
		n((t) => t.map((t) => t.id === e ? {
			...t,
			exiting: !0
		} : t)), u(e);
		let t = setTimeout(() => d(e), h);
		i.current.set(e, t);
	}, [d, u]), _ = r((e, t = {}) => {
		let r = t.type ?? "info", a = t.durationMs ?? m[r], o = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, s = {
			id: o,
			message: e,
			type: r,
			actionLabel: t.actionLabel,
			onAction: t.onAction
		};
		n((e) => [...e, s]);
		let c = setTimeout(() => g(o), a);
		i.current.set(o, c);
	}, [g]), v = a(() => ({ toast: _ }), [_]);
	return /* @__PURE__ */ l(p.Provider, {
		value: v,
		children: [e, /* @__PURE__ */ c("div", {
			"data-testid": "toast-stack",
			className: "fixed top-16 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[2000] flex flex-col gap-2 pointer-events-none",
			children: t.map((e) => /* @__PURE__ */ c("div", {
				className: "pointer-events-auto",
				children: /* @__PURE__ */ c(f, {
					id: e.id,
					message: e.message,
					type: e.type,
					exiting: e.exiting,
					actionLabel: e.actionLabel,
					onAction: e.onAction,
					onDismiss: g
				})
			}, e.id))
		})]
	});
}
function _() {
	let e = i(p);
	if (!e) throw Error("useToast must be used within a <ToastProvider>");
	return e;
}
function v() {
	return i(p);
}
//#endregion
export { f as i, _ as n, v as r, g as t };
