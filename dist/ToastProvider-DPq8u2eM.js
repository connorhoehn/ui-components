import { t as e } from "./cn-DhjIN-s0.js";
import { createContext as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/hooks/usePrefersReducedMotion.ts
function u() {
	let [e, t] = s(() => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	return i(() => {
		if (typeof window > "u") return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), n = () => t(e.matches);
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), e;
}
//#endregion
//#region src/components/shared/Toast.tsx
var d = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	error: "text-danger"
}, f = {
	info: "border-l-info",
	success: "border-l-success",
	warning: "border-l-warning",
	error: "border-l-danger"
};
function p({ id: t, message: n, type: r, exiting: i, actionLabel: a, onAction: o, onDismiss: s }) {
	let p = u(), m = r === "error" || r === "warning", h = p ? "animate-none" : i ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
	return /* @__PURE__ */ l("div", {
		role: m ? "alert" : "status",
		className: e("bg-white border border-border border-l-[3px] rounded-lg", "px-4 py-3 flex items-center justify-between gap-3", "font-[system-ui,-apple-system,sans-serif] shadow-md", "min-w-[260px] max-w-[360px]", f[r], h, p && i && "opacity-0"),
		children: [/* @__PURE__ */ c("span", {
			className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]",
			children: n
		}), /* @__PURE__ */ l("div", {
			className: "flex items-center gap-1 shrink-0",
			children: [a && o && /* @__PURE__ */ c("button", {
				onClick: () => {
					o(), s(t);
				},
				className: e("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", d[r]),
				children: a
			}), /* @__PURE__ */ c("button", {
				onClick: () => s(t),
				"aria-label": "Dismiss notification",
				className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
				children: "×"
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/ToastProvider.tsx
var m = t(null), h = {
	info: 3e3,
	success: 3e3,
	warning: 5e3,
	error: 6e3
}, g = 160;
function _({ children: e }) {
	let [t, r] = s([]), i = o(/* @__PURE__ */ new Map()), u = n((e) => {
		let t = i.current.get(e);
		t && (clearTimeout(t), i.current.delete(e));
	}, []), d = n((e) => {
		u(e), r((t) => t.filter((t) => t.id !== e));
	}, [u]), f = n((e) => {
		r((t) => t.map((t) => t.id === e ? {
			...t,
			exiting: !0
		} : t)), u(e);
		let t = setTimeout(() => d(e), g);
		i.current.set(e, t);
	}, [d, u]), _ = n((e, t = {}) => {
		let n = t.type ?? "info", a = t.durationMs ?? h[n], o = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, s = {
			id: o,
			message: e,
			type: n,
			actionLabel: t.actionLabel,
			onAction: t.onAction
		};
		r((e) => [...e, s]);
		let c = setTimeout(() => f(o), a);
		i.current.set(o, c);
	}, [f]), v = a(() => ({ toast: _ }), [_]);
	return /* @__PURE__ */ l(m.Provider, {
		value: v,
		children: [e, /* @__PURE__ */ c("div", {
			className: "fixed top-16 right-4 z-[2000] flex flex-col gap-2 pointer-events-none",
			children: t.map((e) => /* @__PURE__ */ c("div", {
				className: "pointer-events-auto",
				children: /* @__PURE__ */ c(p, {
					id: e.id,
					message: e.message,
					type: e.type,
					exiting: e.exiting,
					actionLabel: e.actionLabel,
					onAction: e.onAction,
					onDismiss: f
				})
			}, e.id))
		})]
	});
}
function v() {
	let e = r(m);
	if (!e) throw Error("useToast must be used within a <ToastProvider>");
	return e;
}
function y() {
	return r(m);
}
//#endregion
export { u as a, p as i, v as n, y as r, _ as t };
