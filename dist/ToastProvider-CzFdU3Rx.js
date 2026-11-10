import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { d as t } from "./Button-DQoeE5dN.js";
import { n, r } from "./safeHref-D1tj5kGa.js";
import { t as i } from "./ProgressBar-B7ysv2Eo.js";
import { i as a, r as o, t as s } from "./Text-fqIvcZp2.js";
import { createContext as c, useCallback as l, useContext as u, useMemo as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/shared/Toast.tsx
var g = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	error: "text-danger"
}, _ = {
	info: "border-l-info",
	success: "border-l-success",
	warning: "border-l-warning",
	error: "border-l-danger"
};
function v({ id: n, message: r, type: i, exiting: a, actionLabel: o, onAction: s, onDismiss: c }) {
	let l = e(), u = i === "error" || i === "warning", d = l ? "animate-none" : a ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
	return /* @__PURE__ */ h("div", {
		role: u ? "alert" : "status",
		className: t("bg-surface border border-border border-l-[3px] rounded-lg", "px-4 py-3 flex items-center justify-between gap-3", "font-[system-ui,-apple-system,sans-serif] shadow-md", "min-w-[260px] max-w-[360px]", _[i], d, l && a && "opacity-0"),
		children: [/* @__PURE__ */ m("span", {
			className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]",
			children: r
		}), /* @__PURE__ */ h("div", {
			className: "flex items-center gap-1 shrink-0",
			children: [o && s && /* @__PURE__ */ m("button", {
				"data-ui-part": "",
				onClick: () => {
					s(), c(n);
				},
				className: t("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", g[i]),
				children: o
			}), /* @__PURE__ */ m("button", {
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
//#region src/components/shared/JobToast.tsx
var y = {
	queued: "Queued",
	running: "Running",
	done: "Done",
	failed: "Failed"
}, b = {
	queued: "neutral",
	running: "info",
	done: "success",
	failed: "danger"
}, x = {
	queued: "border-l-border",
	running: "border-l-info",
	done: "border-l-success",
	failed: "border-l-danger"
};
function S({ id: c, title: l, state: u, detail: d, progress: f, href: p, hrefLabel: g = "View", onNavigate: _, exiting: v, onDismiss: S, onHoverChange: C }) {
	let w = e(), T = w ? "animate-none" : v ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]", E = u === "queued" || u === "running";
	return /* @__PURE__ */ h(a, {
		gap: "sm",
		role: u === "failed" ? "alert" : "status",
		"data-testid": `job-toast-${c}`,
		"data-job-state": u,
		onMouseEnter: () => C?.(!0),
		onMouseLeave: () => C?.(!1),
		className: t("bg-surface border border-border border-l-[3px] rounded-lg shadow-md", "px-4 py-3 min-w-[260px] max-w-[360px]", x[u], T, w && v && "opacity-0"),
		children: [
			/* @__PURE__ */ h(o, {
				wrap: !1,
				align: "start",
				justify: "between",
				gap: "md",
				children: [/* @__PURE__ */ m(s, {
					as: "span",
					size: "sm",
					weight: "medium",
					tone: "primary",
					className: "flex-1",
					"data-testid": "job-toast-title",
					children: l
				}), /* @__PURE__ */ h(o, {
					wrap: !1,
					gap: "sm",
					className: "shrink-0",
					children: [/* @__PURE__ */ m(r, {
						tone: b[u],
						size: "xs",
						"data-testid": "job-toast-state",
						children: y[u]
					}), /* @__PURE__ */ m("button", {
						"data-ui-part": "",
						"data-testid": "job-toast-close",
						onClick: () => S(c),
						"aria-label": "Dismiss notification",
						className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
						children: "×"
					})]
				})]
			}),
			d && /* @__PURE__ */ m(s, {
				as: "span",
				size: "xs",
				tone: "secondary",
				"data-testid": "job-toast-detail",
				children: d
			}),
			E && typeof f == "number" && /* @__PURE__ */ m(i, {
				value: Math.max(0, Math.min(100, f)),
				size: "sm",
				showRatio: !1,
				"data-testid": "job-toast-progress",
				"aria-label": `${l} progress`
			}),
			p && /* @__PURE__ */ m("a", {
				href: n(p) ?? void 0,
				onClick: _ ? (e) => {
					e.preventDefault(), _(p, e);
				} : void 0,
				"data-testid": "job-toast-link",
				className: "text-xs font-semibold text-primary no-underline hover:underline self-start",
				children: g
			})
		]
	});
}
//#endregion
//#region src/components/shared/ToastProvider.tsx
var C = 8e3, w = c(null), T = {
	info: 3e3,
	success: 3e3,
	warning: 5e3,
	error: 6e3
}, E = 160, D = (e) => `job:${e}`;
function O({ children: e }) {
	let [t, n] = p([]), r = f(/* @__PURE__ */ new Map()), i = l((e) => {
		let t = r.current.get(e);
		t && (clearTimeout(t), r.current.delete(e));
	}, []), a = l((e) => {
		i(e), n((t) => t.filter((t) => t.id !== e));
	}, [i]), o = l((e) => {
		n((t) => t.map((t) => t.id === e ? {
			...t,
			exiting: !0
		} : t)), i(e);
		let t = setTimeout(() => a(e), E);
		r.current.set(e, t);
	}, [a, i]), s = f(/* @__PURE__ */ new Map()), c = l((e, t) => {
		i(e);
		let n = s.current.get(e);
		n && (n.remaining = t, n.deadline = Date.now() + t), r.current.set(e, setTimeout(() => {
			s.current.delete(e), o(e);
		}, t));
	}, [i, o]), u = l((e) => {
		let t = D(e.id), r = s.current.get(t);
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
	}, [i, c]), g = l((e) => {
		let t = D(e);
		s.current.delete(t), o(t);
	}, [o]), _ = l((e, t) => {
		let n = s.current.get(e);
		n && (n.hovering = t, !(!n.settled || n.remaining === null) && (t ? (n.deadline !== null && (n.remaining = Math.max(0, n.deadline - Date.now())), n.deadline = null, i(e)) : c(e, n.remaining)));
	}, [i, c]), y = l((e, t = {}) => {
		let i = t.type ?? "info", a = t.durationMs ?? T[i], s = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, c = {
			id: s,
			message: e,
			type: i,
			actionLabel: t.actionLabel,
			onAction: t.onAction
		};
		n((e) => [...e, c]);
		let l = setTimeout(() => o(s), a);
		r.current.set(s, l);
	}, [o]), b = l((e) => {
		s.current.delete(e), o(e);
	}, [o]), x = d(() => ({
		toast: y,
		toastJob: u,
		dismissJobToast: g
	}), [
		y,
		u,
		g
	]);
	return /* @__PURE__ */ h(w.Provider, {
		value: x,
		children: [e, /* @__PURE__ */ m("div", {
			"data-testid": "toast-stack",
			className: "fixed top-16 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[2000] flex flex-col gap-2 pointer-events-none",
			children: t.map((e) => /* @__PURE__ */ m("div", {
				className: "pointer-events-auto",
				children: e.job ? /* @__PURE__ */ m(S, {
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
				}) : /* @__PURE__ */ m(v, {
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
function k() {
	let e = u(w);
	if (!e) throw Error("useToast must be used within a <ToastProvider>");
	return e;
}
function A() {
	return u(w);
}
//#endregion
export { S as a, A as i, O as n, v as o, k as r, C as t };
