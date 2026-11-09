import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { d as t } from "./Button-DQoeE5dN.js";
import { f as n, m as r, p as i, t as a } from "./Chip-5WvKIIpI.js";
import { i as o, r as s, t as c } from "./Text-DAQCiXe4.js";
import { createContext as l, useCallback as u, useContext as d, useMemo as f, useRef as p, useState as m } from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/components/shared/Toast.tsx
var _ = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	error: "text-danger"
}, v = {
	info: "border-l-info",
	success: "border-l-success",
	warning: "border-l-warning",
	error: "border-l-danger"
};
function y({ id: n, message: r, type: i, exiting: a, actionLabel: o, onAction: s, onDismiss: c }) {
	let l = e(), u = i === "error" || i === "warning", d = l ? "animate-none" : a ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
	return /* @__PURE__ */ g("div", {
		role: u ? "alert" : "status",
		className: t("bg-surface border border-border border-l-[3px] rounded-lg", "px-4 py-3 flex items-center justify-between gap-3", "font-[system-ui,-apple-system,sans-serif] shadow-md", "min-w-[260px] max-w-[360px]", v[i], d, l && a && "opacity-0"),
		children: [/* @__PURE__ */ h("span", {
			className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]",
			children: r
		}), /* @__PURE__ */ g("div", {
			className: "flex items-center gap-1 shrink-0",
			children: [o && s && /* @__PURE__ */ h("button", {
				"data-ui-part": "",
				onClick: () => {
					s(), c(n);
				},
				className: t("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", _[i]),
				children: o
			}), /* @__PURE__ */ h("button", {
				"data-ui-part": "",
				onClick: () => c(n),
				"aria-label": "Dismiss notification",
				className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
				children: "×"
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var b = {
	sm: "h-1.5",
	md: "h-2"
};
function x({ value: e, max: a = 100, color: o, size: s = "md", completeTone: c, label: l, valueLabel: u, showRatio: d = !0, labelClassName: f, className: p, style: m, "data-testid": _, "aria-label": v }) {
	let y = a > 0 ? a : 100, x = Math.max(0, Math.min(e, y)), S = Math.min(100, x / y * 100), C = c !== void 0 && S >= 100 ? i(c) : null, w = C ? r(C) : o ?? "var(--color-primary)";
	return /* @__PURE__ */ g("div", {
		"data-testid": _,
		className: t("w-full", p),
		style: m,
		children: [l != null && /* @__PURE__ */ g("div", {
			className: t("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", f),
			children: [/* @__PURE__ */ h("span", { children: l }), /* @__PURE__ */ h("span", {
				className: t("tabular-nums", C ? n[C] : "text-[var(--color-text-tertiary)]"),
				children: u ?? (d ? `${x}/${y}` : `${Math.round(S)}%`)
			})]
		}), /* @__PURE__ */ h("div", {
			role: "progressbar",
			"aria-valuenow": x,
			"aria-valuemin": 0,
			"aria-valuemax": y,
			"aria-label": v,
			className: t("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", b[s]),
			children: /* @__PURE__ */ h("div", {
				className: "h-full rounded-full transition-all duration-300",
				style: {
					width: `${S}%`,
					background: w
				}
			})
		})]
	});
}
//#endregion
//#region src/components/shared/JobToast.tsx
var S = {
	queued: "Queued",
	running: "Running",
	done: "Done",
	failed: "Failed"
}, C = {
	queued: "neutral",
	running: "info",
	done: "success",
	failed: "danger"
}, w = {
	queued: "border-l-border",
	running: "border-l-info",
	done: "border-l-success",
	failed: "border-l-danger"
};
function T({ id: n, title: r, state: i, detail: l, progress: u, href: d, hrefLabel: f = "View", onNavigate: p, exiting: m, onDismiss: _, onHoverChange: v }) {
	let y = e(), b = y ? "animate-none" : m ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]", T = i === "queued" || i === "running";
	return /* @__PURE__ */ g(o, {
		gap: "sm",
		role: i === "failed" ? "alert" : "status",
		"data-testid": `job-toast-${n}`,
		"data-job-state": i,
		onMouseEnter: () => v?.(!0),
		onMouseLeave: () => v?.(!1),
		className: t("bg-surface border border-border border-l-[3px] rounded-lg shadow-md", "px-4 py-3 min-w-[260px] max-w-[360px]", w[i], b, y && m && "opacity-0"),
		children: [
			/* @__PURE__ */ g(s, {
				wrap: !1,
				align: "start",
				justify: "between",
				gap: "md",
				children: [/* @__PURE__ */ h(c, {
					as: "span",
					size: "sm",
					weight: "medium",
					tone: "primary",
					className: "flex-1",
					"data-testid": "job-toast-title",
					children: r
				}), /* @__PURE__ */ g(s, {
					wrap: !1,
					gap: "sm",
					className: "shrink-0",
					children: [/* @__PURE__ */ h(a, {
						tone: C[i],
						size: "xs",
						"data-testid": "job-toast-state",
						children: S[i]
					}), /* @__PURE__ */ h("button", {
						"data-ui-part": "",
						"data-testid": "job-toast-close",
						onClick: () => _(n),
						"aria-label": "Dismiss notification",
						className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
						children: "×"
					})]
				})]
			}),
			l && /* @__PURE__ */ h(c, {
				as: "span",
				size: "xs",
				tone: "secondary",
				"data-testid": "job-toast-detail",
				children: l
			}),
			T && typeof u == "number" && /* @__PURE__ */ h(x, {
				value: Math.max(0, Math.min(100, u)),
				size: "sm",
				showRatio: !1,
				"data-testid": "job-toast-progress",
				"aria-label": `${r} progress`
			}),
			d && /* @__PURE__ */ h("a", {
				href: d,
				onClick: p ? (e) => {
					e.preventDefault(), p(d, e);
				} : void 0,
				"data-testid": "job-toast-link",
				className: "text-xs font-semibold text-primary no-underline hover:underline self-start",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/ToastProvider.tsx
var E = 8e3, D = l(null), O = {
	info: 3e3,
	success: 3e3,
	warning: 5e3,
	error: 6e3
}, k = 160, A = (e) => `job:${e}`;
function j({ children: e }) {
	let [t, n] = m([]), r = p(/* @__PURE__ */ new Map()), i = u((e) => {
		let t = r.current.get(e);
		t && (clearTimeout(t), r.current.delete(e));
	}, []), a = u((e) => {
		i(e), n((t) => t.filter((t) => t.id !== e));
	}, [i]), o = u((e) => {
		n((t) => t.map((t) => t.id === e ? {
			...t,
			exiting: !0
		} : t)), i(e);
		let t = setTimeout(() => a(e), k);
		r.current.set(e, t);
	}, [a, i]), s = p(/* @__PURE__ */ new Map()), c = u((e, t) => {
		i(e);
		let n = s.current.get(e);
		n && (n.remaining = t, n.deadline = Date.now() + t), r.current.set(e, setTimeout(() => {
			s.current.delete(e), o(e);
		}, t));
	}, [i, o]), l = u((e) => {
		let t = A(e.id), r = s.current.get(t);
		if (r || (r = {
			settled: !1,
			hovering: !1,
			remaining: null,
			deadline: null
		}, s.current.set(t, r)), n((n) => {
			let r = {
				id: t,
				message: e.title,
				type: "info",
				job: e
			};
			return n.some((e) => e.id === t) ? n.map((e) => e.id === t ? r : e) : [...n, r];
		}), e.state !== "done" && e.state !== "failed") {
			r.settled = !1, r.remaining = null, r.deadline = null, i(t);
			return;
		}
		if (r.settled) return;
		r.settled = !0;
		let a = e.dismissAfterMs ?? 8e3;
		r.hovering ? (r.remaining = a, r.deadline = null) : c(t, a), e.onSettled?.({
			id: e.id,
			title: e.title,
			state: e.state,
			detail: e.detail,
			href: e.href,
			hrefLabel: e.hrefLabel
		});
	}, [i, c]), d = u((e) => {
		let t = A(e);
		s.current.delete(t), o(t);
	}, [o]), _ = u((e, t) => {
		let n = s.current.get(e);
		n && (n.hovering = t, !(!n.settled || n.remaining === null) && (t ? (n.deadline !== null && (n.remaining = Math.max(0, n.deadline - Date.now())), n.deadline = null, i(e)) : c(e, n.remaining)));
	}, [i, c]), v = u((e, t = {}) => {
		let i = t.type ?? "info", a = t.durationMs ?? O[i], s = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, c = {
			id: s,
			message: e,
			type: i,
			actionLabel: t.actionLabel,
			onAction: t.onAction
		};
		n((e) => [...e, c]);
		let l = setTimeout(() => o(s), a);
		r.current.set(s, l);
	}, [o]), b = u((e) => {
		s.current.delete(e), o(e);
	}, [o]), x = f(() => ({
		toast: v,
		toastJob: l,
		dismissJobToast: d
	}), [
		v,
		l,
		d
	]);
	return /* @__PURE__ */ g(D.Provider, {
		value: x,
		children: [e, /* @__PURE__ */ h("div", {
			"data-testid": "toast-stack",
			className: "fixed top-16 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[2000] flex flex-col gap-2 pointer-events-none",
			children: t.map((e) => /* @__PURE__ */ h("div", {
				className: "pointer-events-auto",
				children: e.job ? /* @__PURE__ */ h(T, {
					id: e.id,
					title: e.job.title,
					state: e.job.state,
					detail: e.job.detail,
					progress: e.job.progress,
					href: e.job.href,
					hrefLabel: e.job.hrefLabel,
					onNavigate: e.job.onNavigate,
					exiting: e.exiting,
					onDismiss: b,
					onHoverChange: (t) => _(e.id, t)
				}) : /* @__PURE__ */ h(y, {
					id: e.id,
					message: e.message,
					type: e.type,
					exiting: e.exiting,
					actionLabel: e.actionLabel,
					onAction: e.onAction,
					onDismiss: o
				})
			}, e.id))
		})]
	});
}
function M() {
	let e = d(D);
	if (!e) throw Error("useToast must be used within a <ToastProvider>");
	return e;
}
function N() {
	return d(D);
}
//#endregion
export { T as a, N as i, j as n, x as o, M as r, y as s, E as t };
