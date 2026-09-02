import { t as e } from "./cn-DhjIN-s0.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/agents/components/TraceTimeline.tsx
var i = {
	agent: "bg-info",
	tool: "bg-accent",
	llm: "bg-warning",
	retrieval: "bg-success",
	guardrail: "bg-danger",
	internal: "bg-surface-emphasis"
}, a = {
	agent: "Agent",
	tool: "Tool",
	llm: "LLM",
	retrieval: "Retrieval",
	guardrail: "Guardrail",
	internal: "Internal"
};
function o({ span: t, depth: a, totalMs: o, startOffset: s, onSelect: c, selected: l }) {
	let u = o > 0 ? s / o * 100 : 0, d = o > 0 ? Math.max(t.durationMs / o * 100, .5) : 0;
	return /* @__PURE__ */ r("button", {
		type: "button",
		className: e("w-full text-left bg-transparent font-[inherit] flex items-center h-7 hover:bg-surface-panel cursor-pointer transition-colors border-b border-border-subtle", l && "bg-info-bg"),
		onClick: () => c(t),
		children: [/* @__PURE__ */ r("div", {
			className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden",
			children: [
				/* @__PURE__ */ n("span", {
					style: { marginLeft: a * 12 },
					className: "shrink-0"
				}),
				/* @__PURE__ */ n("span", { className: e("w-2 h-2 rounded-sm shrink-0", i[t.kind]) }),
				/* @__PURE__ */ n("span", {
					className: "text-[11px] text-text-primary truncate",
					children: t.name
				})
			]
		}), /* @__PURE__ */ r("div", {
			className: "flex-1 relative h-full flex items-center",
			children: [/* @__PURE__ */ n("div", {
				className: e("absolute h-4 rounded-sm opacity-80", i[t.kind]),
				style: {
					left: `${u}%`,
					width: `${d}%`,
					minWidth: 2
				}
			}), /* @__PURE__ */ r("span", {
				className: "absolute text-[10px] text-neutral",
				style: { left: `${u + d + .5}%` },
				children: [t.durationMs, "ms"]
			})]
		})]
	});
}
function s(e, t) {
	let n = [], r = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = t.parentSpanId ?? "__root__";
		r.has(e) || r.set(e, []), r.get(e).push(t);
	}
	function i(e, t) {
		let a = e ?? "__root__", o = r.get(a) ?? r.get(e) ?? [];
		for (let e of o) n.push({
			span: e,
			depth: t
		}), i(e.spanId, t + 1);
	}
	let a = e.find((e) => e.spanId === t);
	return a ? (n.push({
		span: a,
		depth: 0
	}), i(a.spanId, 1)) : i(void 0, 0), n;
}
function c({ trace: c, className: l, title: u, legendKinds: d }) {
	let [f, p] = t(null), m = s(c.spans, c.rootSpanId), h = new Date(c.startedAt).getTime();
	return /* @__PURE__ */ r("div", {
		className: e("border border-border rounded-lg overflow-hidden bg-surface", l),
		children: [
			/* @__PURE__ */ r("div", {
				className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel",
				children: [/* @__PURE__ */ r("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ n("span", {
						className: "text-xs font-medium text-text-primary",
						children: u ?? "Trace"
					}), /* @__PURE__ */ n("span", {
						className: "text-[10px] font-mono text-text-tertiary",
						children: c.traceId
					})]
				}), /* @__PURE__ */ r("span", {
					className: "text-xs text-neutral",
					children: [c.totalDurationMs, "ms total"]
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "flex items-center gap-3 px-3 py-1.5 border-b border-border-subtle",
				children: (d ?? Object.keys(i)).map((t) => /* @__PURE__ */ r("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ n("span", { className: e("w-2 h-2 rounded-sm", i[t]) }), /* @__PURE__ */ n("span", {
						className: "text-[10px] text-neutral",
						children: a[t]
					})]
				}, t))
			}),
			/* @__PURE__ */ n("div", {
				className: "max-h-[300px] overflow-y-auto",
				children: m.map(({ span: e, depth: t }) => {
					let r = new Date(e.startTime).getTime() - h;
					return /* @__PURE__ */ n(o, {
						span: e,
						depth: t,
						totalMs: c.totalDurationMs,
						startOffset: r,
						onSelect: p,
						selected: f?.spanId === e.spanId
					}, e.spanId);
				})
			}),
			f && /* @__PURE__ */ r("div", {
				className: "border-t border-border p-3 bg-surface-panel",
				children: [
					/* @__PURE__ */ r("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ n("span", {
							className: "text-xs font-medium text-text-primary",
							children: f.name
						}), /* @__PURE__ */ n("button", {
							className: "text-[10px] text-text-tertiary hover:text-text-secondary",
							onClick: () => p(null),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ r("div", {
						className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]",
						children: [
							/* @__PURE__ */ n("div", {
								className: "text-neutral",
								children: "Kind"
							}),
							/* @__PURE__ */ n("div", {
								className: "text-text-primary font-medium",
								children: a[f.kind]
							}),
							/* @__PURE__ */ n("div", {
								className: "text-neutral",
								children: "Duration"
							}),
							/* @__PURE__ */ r("div", {
								className: "text-text-primary",
								children: [f.durationMs, "ms"]
							}),
							/* @__PURE__ */ n("div", {
								className: "text-neutral",
								children: "Status"
							}),
							/* @__PURE__ */ n("div", {
								className: e("font-medium", f.status === "ok" && "text-success-fg", f.status === "error" && "text-danger-fg"),
								children: f.status
							}),
							/* @__PURE__ */ n("div", {
								className: "text-neutral",
								children: "Span ID"
							}),
							/* @__PURE__ */ n("div", {
								className: "text-text-primary font-mono",
								children: f.spanId
							})
						]
					}),
					Object.keys(f.attributes).length > 0 && /* @__PURE__ */ r("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ n("div", {
							className: "text-[10px] text-text-tertiary uppercase mb-1",
							children: "Attributes"
						}), /* @__PURE__ */ n("div", {
							className: "text-[11px] font-mono text-text-secondary space-y-0.5",
							children: Object.entries(f.attributes).map(([e, t]) => /* @__PURE__ */ r("div", { children: [
								/* @__PURE__ */ r("span", {
									className: "text-text-tertiary",
									children: [e, ":"]
								}),
								" ",
								String(t)
							] }, e))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { c as t };
