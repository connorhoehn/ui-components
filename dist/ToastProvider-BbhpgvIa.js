import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { d as t } from "./Button-DQoeE5dN.js";
import { f as n, m as r, p as i, t as a } from "./Chip-5WvKIIpI.js";
import { t as o } from "./Text-DAQCiXe4.js";
import { createContext as s, useCallback as c, useContext as l, useMemo as u, useRef as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/shared/Toast.tsx
var h = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	error: "text-danger"
}, g = {
	info: "border-l-info",
	success: "border-l-success",
	warning: "border-l-warning",
	error: "border-l-danger"
};
function _({ id: n, message: r, type: i, exiting: a, actionLabel: o, onAction: s, onDismiss: c }) {
	let l = e(), u = i === "error" || i === "warning", d = l ? "animate-none" : a ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
	return /* @__PURE__ */ m("div", {
		role: u ? "alert" : "status",
		className: t("bg-surface border border-border border-l-[3px] rounded-lg", "px-4 py-3 flex items-center justify-between gap-3", "font-[system-ui,-apple-system,sans-serif] shadow-md", "min-w-[260px] max-w-[360px]", g[i], d, l && a && "opacity-0"),
		children: [/* @__PURE__ */ p("span", {
			className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]",
			children: r
		}), /* @__PURE__ */ m("div", {
			className: "flex items-center gap-1 shrink-0",
			children: [o && s && /* @__PURE__ */ p("button", {
				"data-ui-part": "",
				onClick: () => {
					s(), c(n);
				},
				className: t("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", h[i]),
				children: o
			}), /* @__PURE__ */ p("button", {
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
var v = {
	sm: "h-1.5",
	md: "h-2"
};
function y({ value: e, max: a = 100, color: o, size: s = "md", completeTone: c, label: l, valueLabel: u, showRatio: d = !0, labelClassName: f, className: h, style: g, "data-testid": _, "aria-label": y }) {
	let b = a > 0 ? a : 100, x = Math.max(0, Math.min(e, b)), S = Math.min(100, x / b * 100), C = c !== void 0 && S >= 100 ? i(c) : null, w = C ? r(C) : o ?? "var(--color-primary)";
	return /* @__PURE__ */ m("div", {
		"data-testid": _,
		className: t("w-full", h),
		style: g,
		children: [l != null && /* @__PURE__ */ m("div", {
			className: t("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", f),
			children: [/* @__PURE__ */ p("span", { children: l }), /* @__PURE__ */ p("span", {
				className: t("tabular-nums", C ? n[C] : "text-[var(--color-text-tertiary)]"),
				children: u ?? (d ? `${x}/${b}` : `${Math.round(S)}%`)
			})]
		}), /* @__PURE__ */ p("div", {
			role: "progressbar",
			"aria-valuenow": x,
			"aria-valuemin": 0,
			"aria-valuemax": b,
			"aria-label": y,
			className: t("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", v[s]),
			children: /* @__PURE__ */ p("div", {
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
var b = {
	queued: "Queued",
	running: "Running",
	done: "Done",
	failed: "Failed"
}, x = {
	queued: "neutral",
	running: "info",
	done: "success",
	failed: "danger"
}, S = {
	queued: "border-l-border",
	running: "border-l-info",
	done: "border-l-success",
	failed: "border-l-danger"
};
function C({ id: n, title: r, state: i, detail: s, progress: c, href: l, hrefLabel: u = "View", exiting: d, onDismiss: f, onHoverChange: h }) {
	let g = e(), _ = g ? "animate-none" : d ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]", v = i === "queued" || i === "running";
	return /* @__PURE__ */ m("div", {
		role: i === "failed" ? "alert" : "status",
		"data-testid": `job-toast-${n}`,
		"data-job-state": i,
		onMouseEnter: () => h?.(!0),
		onMouseLeave: () => h?.(!1),
		className: t("bg-surface border border-border border-l-[3px] rounded-lg shadow-md", "px-4 py-3 flex flex-col gap-2 min-w-[260px] max-w-[360px]", S[i], _, g && d && "opacity-0"),
		children: [
			/* @__PURE__ */ m("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ p(o, {
					as: "span",
					size: "sm",
					weight: "medium",
					tone: "primary",
					className: "flex-1",
					"data-testid": "job-toast-title",
					children: r
				}), /* @__PURE__ */ m("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ p(a, {
						tone: x[i],
						size: "xs",
						"data-testid": "job-toast-state",
						children: b[i]
					}), /* @__PURE__ */ p("button", {
						"data-ui-part": "",
						"data-testid": "job-toast-close",
						onClick: () => f(n),
						"aria-label": "Dismiss notification",
						className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
						children: "×"
					})]
				})]
			}),
			s && /* @__PURE__ */ p(o, {
				as: "span",
				size: "xs",
				tone: "secondary",
				"data-testid": "job-toast-detail",
				children: s
			}),
			v && typeof c == "number" && /* @__PURE__ */ p(y, {
				value: Math.max(0, Math.min(100, c)),
				size: "sm",
				showRatio: !1,
				"data-testid": "job-toast-progress",
				"aria-label": `${r} progress`
			}),
			l && /* @__PURE__ */ p("a", {
				href: l,
				"data-testid": "job-toast-link",
				className: "text-xs font-semibold text-primary no-underline hover:underline self-start",
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/shared/ToastProvider.tsx
var w = 8e3, T = s(null), E = {
	info: 3e3,
	success: 3e3,
	warning: 5e3,
	error: 6e3
}, D = 160, O = (e) => `job:${e}`;
function k({ children: e }) {
	let [t, n] = f([]), r = d(/* @__PURE__ */ new Map()), i = c((e) => {
		let t = r.current.get(e);
		t && (clearTimeout(t), r.current.delete(e));
	}, []), a = c((e) => {
		i(e), n((t) => t.filter((t) => t.id !== e));
	}, [i]), o = c((e) => {
		n((t) => t.map((t) => t.id === e ? {
			...t,
			exiting: !0
		} : t)), i(e);
		let t = setTimeout(() => a(e), D);
		r.current.set(e, t);
	}, [a, i]), s = d(/* @__PURE__ */ new Map()), l = c((e, t) => {
		i(e);
		let n = s.current.get(e);
		n && (n.remaining = t, n.deadline = Date.now() + t), r.current.set(e, setTimeout(() => {
			s.current.delete(e), o(e);
		}, t));
	}, [i, o]), h = c((e) => {
		let t = O(e.id), r = s.current.get(t);
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
		r.hovering ? (r.remaining = a, r.deadline = null) : l(t, a), e.onSettled?.({
			id: e.id,
			title: e.title,
			state: e.state,
			detail: e.detail,
			href: e.href,
			hrefLabel: e.hrefLabel
		});
	}, [i, l]), g = c((e) => {
		let t = O(e);
		s.current.delete(t), o(t);
	}, [o]), v = c((e, t) => {
		let n = s.current.get(e);
		n && (n.hovering = t, !(!n.settled || n.remaining === null) && (t ? (n.deadline !== null && (n.remaining = Math.max(0, n.deadline - Date.now())), n.deadline = null, i(e)) : l(e, n.remaining)));
	}, [i, l]), y = c((e, t = {}) => {
		let i = t.type ?? "info", a = t.durationMs ?? E[i], s = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, c = {
			id: s,
			message: e,
			type: i,
			actionLabel: t.actionLabel,
			onAction: t.onAction
		};
		n((e) => [...e, c]);
		let l = setTimeout(() => o(s), a);
		r.current.set(s, l);
	}, [o]), b = c((e) => {
		s.current.delete(e), o(e);
	}, [o]), x = u(() => ({
		toast: y,
		toastJob: h,
		dismissJobToast: g
	}), [
		y,
		h,
		g
	]);
	return /* @__PURE__ */ m(T.Provider, {
		value: x,
		children: [e, /* @__PURE__ */ p("div", {
			"data-testid": "toast-stack",
			className: "fixed top-16 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[2000] flex flex-col gap-2 pointer-events-none",
			children: t.map((e) => /* @__PURE__ */ p("div", {
				className: "pointer-events-auto",
				children: e.job ? /* @__PURE__ */ p(C, {
					id: e.id,
					title: e.job.title,
					state: e.job.state,
					detail: e.job.detail,
					progress: e.job.progress,
					href: e.job.href,
					hrefLabel: e.job.hrefLabel,
					exiting: e.exiting,
					onDismiss: b,
					onHoverChange: (t) => v(e.id, t)
				}) : /* @__PURE__ */ p(_, {
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
function A() {
	let e = l(T);
	if (!e) throw Error("useToast must be used within a <ToastProvider>");
	return e;
}
function j() {
	return l(T);
}
//#endregion
export { C as a, j as i, k as n, y as o, A as r, _ as s, w as t };
