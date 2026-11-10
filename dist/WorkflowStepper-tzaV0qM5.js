import { d as e, n as t, s as n, u as r } from "./Button-DQoeE5dN.js";
import { r as i } from "./safeHref-D1tj5kGa.js";
import { t as a } from "./ProgressBar-B7ysv2Eo.js";
import { i as o, n as s, r as c } from "./Text-DYn7PTcU.js";
import { t as l } from "./Card-D4k-Buoz.js";
import { t as u } from "./Tooltip-ClzY6PN8.js";
import { useEffect as d, useId as f, useRef as p, useState as m } from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/components/shared/ConfirmButton.tsx
function _({ label: n, question: r, confirmLabel: i = "Confirm", cancelLabel: a = "Cancel", tone: o = "default", variant: s, size: c = "sm", disabled: l = !1, busy: u = !1, onConfirm: f, actionKind: _, className: v, "data-testid": y = "confirm-button" }) {
	let [b, x] = m("idle"), [S, C] = m(!1), w = p(null), T = p(null), E = p(null), D = p(!0);
	d(() => (D.current = !0, () => {
		D.current = !1;
	}), []), d(() => {
		let e = E.current === "confirm" ? T.current : E.current === "trigger" ? w.current : null;
		E.current = null, e?.focus();
	});
	let O = u || S, k = O ? "busy" : b, A = (e) => {
		E.current = e ? "trigger" : null, x("idle");
	};
	return b === "asking" && !O && !l ? /* @__PURE__ */ g("span", {
		role: "group",
		"aria-label": r,
		"data-ui-confirm-button": "",
		"data-confirm-state": "asking",
		"data-action-kind": _,
		"data-testid": y,
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), A(!0));
		},
		onBlur: (e) => {
			let t = e.relatedTarget;
			t && !e.currentTarget.contains(t) && A(!1);
		},
		className: e("inline-flex max-w-full items-center gap-1.5", v),
		children: [
			/* @__PURE__ */ h("span", {
				"data-ui-part": "",
				"aria-hidden": "true",
				className: e("truncate text-text-secondary", c === "sm" ? "text-xs" : "text-sm"),
				children: r
			}),
			/* @__PURE__ */ h(t, {
				ref: T,
				size: c,
				variant: o === "destructive" ? "danger-solid" : "primary",
				onClick: () => {
					E.current = "trigger", x("idle");
					let e = f();
					e && typeof e.then == "function" && (C(!0), e.then(() => {
						D.current && C(!1);
					}, () => {
						D.current && C(!1);
					}));
				},
				"data-testid": `${y}-confirm`,
				children: i
			}),
			/* @__PURE__ */ h(t, {
				size: c,
				variant: "ghost",
				onClick: () => A(!0),
				"data-testid": `${y}-cancel`,
				children: a
			})
		]
	}) : /* @__PURE__ */ h(t, {
		ref: w,
		size: c,
		variant: s ?? (o === "destructive" ? "danger" : "secondary"),
		disabled: l || O,
		"aria-busy": O || void 0,
		"data-ui-confirm-button": "",
		"data-confirm-state": k,
		"data-action-kind": _,
		"data-testid": y,
		className: v,
		onClick: () => {
			E.current = "confirm", x("asking");
		},
		children: n
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function v({ items: t, layout: n = "row", labelWidth: r = "w-28", divided: i = !1, responsive: a = !1, className: o, "aria-label": s, "data-testid": c = "key-value" }) {
	if (t.length === 0) return null;
	let l = n === "row", u = l && i;
	return /* @__PURE__ */ h("dl", {
		className: e("m-0 min-w-0", a && "@container/key-value", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : u ? "flex flex-col border-t border-border" : l ? "flex flex-col gap-1.5" : "flex flex-col gap-3", o),
		"data-layout": n,
		"data-divided": u || void 0,
		"data-testid": c,
		...s ? { "aria-label": s } : {},
		children: t.map((t, n) => /* @__PURE__ */ g("div", {
			className: e("min-w-0", a && u && "flex-wrap @lg/key-value:flex-nowrap", u ? "flex min-h-[38px] items-center gap-3 border-b border-border px-2.5 py-1.5" : l ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${c}-item`,
			"data-key-value-row": "",
			children: [
				/* @__PURE__ */ h("dt", {
					className: e("m-0", a && u && "basis-full @lg/key-value:basis-auto", u ? e("shrink-0 text-sm text-text-primary", r) : "text-text-secondary", !u && (l ? e("shrink-0 text-xs", r) : "text-[12px]")),
					children: t.label
				}),
				/* @__PURE__ */ h("dd", {
					className: e("m-0 min-w-0 truncate", "text-sm", t.muted ? "text-text-tertiary" : "text-text-primary", l && "flex-1", t.mono && "font-mono text-[12px]"),
					...t.title ? { title: t.title } : {},
					children: t.value
				}),
				l && t.action != null && t.action !== !1 && /* @__PURE__ */ h("dd", {
					className: "m-0 flex shrink-0 items-center",
					"data-testid": `${c}-action`,
					children: t.action
				})
			]
		}, `${t.label}-${n}`))
	});
}
//#endregion
//#region src/components/shared/RunProgressPanel.tsx
function y(e) {
	if (e == null || !Number.isFinite(e) || e < 0) return "—";
	let t = Math.round(e / 1e3);
	if (t < 60) return `${t}s`;
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? `${n}h ${String(r).padStart(2, "0")}m` : `${r}m ${i}s`;
}
var b = (e) => {
	if (e == null) return;
	let t = typeof e == "number" ? e : Date.parse(e);
	return Number.isFinite(t) ? t : void 0;
}, x = {
	queued: "Queued",
	running: "Running",
	done: "Done",
	failed: "Failed",
	cancelled: "Cancelled"
};
function S({ title: n, description: r, state: p = "running", progress: S, elapsedMs: C, startedAt: w, remainingMs: T, onRefresh: E, refreshLabel: D = "Refresh status", onCancel: O, cancelLabel: k = "Cancel job", cancelQuestion: A = "Cancel this job?", nonBlocking: j = !0, nonBlockingHint: M = "You can keep working while this runs.", facts: N = [], framed: P = !0, now: F = Date.now, className: I, "data-testid": L = "run-progress-panel" }) {
	let R = f(), z = p === "running" || p === "queued", B = b(w), [V, H] = m(() => F());
	d(() => {
		if (!z || C != null || B == null) return;
		H(F());
		let e = setInterval(() => H(F()), 1e3);
		return () => clearInterval(e);
	}, [
		z,
		C,
		B,
		F
	]);
	let U = C ?? (B == null ? void 0 : Math.max(0, V - B)), W = [
		...U == null ? [] : [{
			label: "Elapsed",
			value: y(U)
		}],
		...z && T != null ? [{
			label: "Est. remaining",
			value: `~${y(T)}`
		}] : [],
		...N
	], G = S == null ? void 0 : Math.max(0, Math.min(100, S)), K = /* @__PURE__ */ g(o, {
		gap: "md",
		children: [
			/* @__PURE__ */ g(c, {
				gap: "sm",
				align: "center",
				justify: "between",
				wrap: !0,
				children: [/* @__PURE__ */ h(s, {
					as: "span",
					size: "sm",
					weight: "semibold",
					tone: "primary",
					children: /* @__PURE__ */ h("span", {
						id: R,
						"data-ui-part": "",
						children: n
					})
				}), /* @__PURE__ */ g(c, {
					gap: "xs",
					align: "center",
					children: [!z && /* @__PURE__ */ h(i, {
						size: "sm",
						tone: p === "done" ? "success" : p === "failed" ? "danger" : "neutral",
						children: x[p]
					}), j && z && /* @__PURE__ */ h(u, {
						content: M,
						children: /* @__PURE__ */ h(i, {
							size: "sm",
							tone: "info",
							title: M,
							"data-testid": `${L}-non-blocking`,
							children: "Non-blocking"
						})
					})]
				})]
			}),
			r != null && /* @__PURE__ */ h(s, {
				as: "p",
				size: "sm",
				tone: "secondary",
				wrap: !0,
				children: r
			}),
			W.length > 0 && /* @__PURE__ */ h(v, {
				items: W,
				layout: "grid",
				"data-testid": `${L}-facts`
			}),
			G != null && /* @__PURE__ */ h(a, {
				value: G,
				size: "md",
				completeTone: "success",
				label: p === "queued" ? "Waiting to start" : "Progress",
				showRatio: !1,
				"aria-label": `${typeof n == "string" ? n : "Job"}: ${Math.round(G)}%`,
				"data-testid": `${L}-bar`
			}),
			(E || O && z) && /* @__PURE__ */ g(c, {
				gap: "sm",
				align: "center",
				wrap: !0,
				children: [E && /* @__PURE__ */ h(t, {
					variant: "secondary",
					size: "sm",
					onClick: E,
					"data-testid": `${L}-refresh`,
					children: D
				}), O && z && /* @__PURE__ */ h(_, {
					label: k,
					question: A,
					confirmLabel: k,
					cancelLabel: "Keep running",
					tone: "destructive",
					actionKind: "cancel",
					onConfirm: O,
					"data-testid": `${L}-cancel`
				})]
			})
		]
	});
	return /* @__PURE__ */ h("section", {
		"aria-labelledby": R,
		"aria-busy": z || void 0,
		"data-run-progress": "",
		"data-run-state": p,
		"data-testid": L,
		className: e("min-w-0", I),
		children: P ? /* @__PURE__ */ h(l, {
			padding: "md",
			children: K
		}) : K
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var C = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	compact: "h-4 w-4"
}, w = {
	sm: "text-[10px] font-medium leading-none",
	md: "text-[11px] font-medium leading-none",
	compact: "text-xs font-semibold leading-4"
};
function T({ compact: e }) {
	return /* @__PURE__ */ h("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: e ? "h-2.5 w-2.5" : "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function E({ step: t, size: n }) {
	let r = n === "compact";
	return /* @__PURE__ */ h("div", {
		"data-workflow-marker": t.outcome ?? (t.done ? "done" : t.active ? "active" : "todo"),
		className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", C[n], t.outcome === "failed" ? "border-2 border-danger bg-danger-bg text-danger" : t.outcome === "cancelled" ? "border-2 border-border bg-surface-inset text-text-secondary" : t.done ? "bg-success text-white" : t.active ? e(r ? "border-[1.5px]" : "border-2", "border-info bg-info-bg") : "border border-border bg-surface-inset"),
		children: t.outcome ? /* @__PURE__ */ h("span", { className: e("rounded-full", t.outcome === "failed" ? "bg-danger" : "bg-text-secondary", r ? "h-1.5 w-1.5" : "h-2 w-2") }) : t.done ? /* @__PURE__ */ h(T, { compact: r }) : t.active ? /* @__PURE__ */ h("span", { className: e("rounded-full bg-info", r ? "h-1.5 w-1.5" : "h-2 w-2") }) : null
	});
}
function D(e, t) {
	return e.done ? t?.done ? "full" : "partial" : "none";
}
function O({ steps: t, size: n, className: r, ariaLabel: i, testId: a }) {
	return /* @__PURE__ */ h("ol", {
		className: e("m-0 flex min-w-0 list-none flex-col p-0", r),
		"data-orientation": "vertical",
		"data-testid": a,
		...n === "compact" ? { "data-density": "compact" } : {},
		...i ? { "aria-label": i } : {},
		children: t.map((r, i) => {
			let a = i === t.length - 1, o = D(r, t[i + 1]), s = r.outcome ?? (r.done ? "done" : r.active ? "active" : "pending");
			return /* @__PURE__ */ g("li", {
				"aria-current": r.active ? "step" : void 0,
				"data-state": s,
				className: "flex min-w-0 gap-3",
				children: [/* @__PURE__ */ g("div", {
					className: "flex flex-shrink-0 flex-col items-center",
					children: [/* @__PURE__ */ h(E, {
						step: r,
						size: n
					}), !a && /* @__PURE__ */ h("div", {
						"aria-hidden": "true",
						"data-workflow-connector": o,
						className: e("my-1 min-h-4 w-0.5 flex-1 rounded-full transition-colors", o === "full" ? "bg-success" : o === "partial" ? "bg-gradient-to-b from-success to-success/30" : "bg-border")
					})]
				}), /* @__PURE__ */ g("div", {
					className: e("flex min-w-0 flex-1 flex-col gap-1", !a && "pb-4"),
					children: [
						/* @__PURE__ */ h("span", {
							className: e("text-sm font-medium leading-6", r.active ? "text-text-primary" : r.done ? "text-text-secondary" : "text-text-tertiary"),
							children: r.label
						}),
						r.description != null && /* @__PURE__ */ h("div", {
							"data-ui-text": "workflow-step-description",
							className: "min-w-0 break-words text-xs leading-5 text-text-secondary",
							children: r.description
						}),
						r.active && r.action != null && /* @__PURE__ */ h("div", {
							"data-workflow-action": "",
							className: "mt-1 flex min-w-0 flex-wrap items-center gap-2",
							children: r.action
						})
					]
				})]
			}, r.step);
		})
	});
}
function k({ steps: t, size: i, wrap: a = !1, orientation: o = "horizontal", className: s, "aria-label": c, "data-testid": l = "workflow-stepper" }) {
	let u = n();
	i === "sm" && r("WorkflowStepper", "sm");
	let d = i ?? (u === "compact" ? "compact" : "md"), f = d === "compact";
	if (o === "vertical") return /* @__PURE__ */ h(O, {
		steps: t,
		size: d,
		className: s,
		ariaLabel: c,
		testId: l
	});
	let p = t.some((e) => e.description != null);
	return /* @__PURE__ */ h("ol", {
		className: e(p || f ? "m-0 inline-flex w-fit max-w-full list-none p-0" : "flex", a ? "flex-wrap gap-y-2" : "overflow-x-auto", p ? "items-start" : "items-center", s),
		...a ? { "data-wrap": "" } : {},
		"data-orientation": "horizontal",
		"data-testid": l,
		...f ? { "data-density": "compact" } : {},
		...c ? { "aria-label": c } : {},
		children: t.map((n, r) => {
			let i = r === t.length - 1, a = t[r + 1], o = n.done ? a?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border", s = n.outcome ?? (n.done ? "done" : n.active ? "active" : "pending"), c = /* @__PURE__ */ h(E, {
				step: n,
				size: d
			}), l = /* @__PURE__ */ h("span", {
				className: e(p ? "block text-xs font-semibold leading-4" : w[d], n.active ? "text-text-primary" : n.done ? "text-text-secondary" : "text-text-tertiary"),
				children: n.label
			});
			return p ? /* @__PURE__ */ g("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: e("shrink-0", f ? "w-32" : "w-40"),
				children: [/* @__PURE__ */ g("div", {
					className: "flex items-center",
					children: [c, !i && /* @__PURE__ */ h("div", {
						"aria-hidden": "true",
						"data-workflow-connector": "",
						className: e("h-0.5 flex-1", o)
					})]
				}), /* @__PURE__ */ g("div", {
					className: "mt-2 pr-3 space-y-1",
					children: [l, n.description != null && /* @__PURE__ */ h("div", {
						"data-ui-text": "workflow-step-description",
						className: "text-xs text-text-secondary leading-5 break-words",
						children: n.description
					})]
				})]
			}, n.step) : /* @__PURE__ */ g("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: f ? "flex items-center" : "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ g("div", {
					className: e("flex items-center whitespace-nowrap", f ? "gap-1" : "gap-1.5"),
					children: [c, l]
				}), !i && /* @__PURE__ */ h("div", {
					"aria-hidden": "true",
					className: e(f ? "mx-2 h-0.5 w-3" : "mx-2 h-1 flex-1", "rounded-full transition-colors", o)
				})]
			}, n.step);
		})
	});
}
//#endregion
export { _ as a, v as i, S as n, y as r, k as t };
