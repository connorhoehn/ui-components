import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { useState as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/agents/components/TraceTimeline.tsx
function o(e) {
	if (e.status === "error") for (let t of [
		"error.message",
		"errorMessage",
		"error"
	]) {
		let n = e.attributes[t];
		if (typeof n == "string" && n) return n;
	}
}
function s(e, t) {
	return t ? e.status === "error" ? "bg-danger" : "bg-success" : c[e.kind];
}
var c = {
	agent: "bg-info",
	tool: "bg-accent",
	llm: "bg-warning",
	retrieval: "bg-success",
	guardrail: "bg-danger",
	internal: "bg-surface-emphasis"
}, l = {
	agent: "Agent",
	tool: "Tool",
	llm: "LLM",
	retrieval: "Retrieval",
	guardrail: "Guardrail",
	internal: "Internal"
};
function u({ span: t, depth: n, totalMs: r, startOffset: o, onSelect: c, selected: l, scale: u, maxDurationMs: d, byStatus: f, durationColumn: p, error: m }) {
	let h = u === "duration", g = h ? 0 : r > 0 ? o / r * 100 : 0, _ = h ? d : r, v = _ > 0 ? Math.max(t.durationMs / _ * 100, .5) : 0, y = s(t, f);
	return /* @__PURE__ */ a("button", {
		type: "button",
		className: e("w-full text-left bg-transparent font-[inherit] flex items-center h-7 hover:bg-surface-panel cursor-pointer transition-colors border-b border-border-subtle", l && "bg-info-bg"),
		onClick: () => c(t),
		title: m ? `${t.name} - ${m} (${t.durationMs}ms)` : void 0,
		children: [
			/* @__PURE__ */ a("div", {
				className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden",
				children: [
					/* @__PURE__ */ i("span", {
						style: { marginLeft: n * 12 },
						className: "shrink-0"
					}),
					/* @__PURE__ */ i("span", { className: e("w-2 h-2 rounded-sm shrink-0", y) }),
					/* @__PURE__ */ i("span", {
						className: "text-[11px] text-text-primary truncate",
						children: t.name
					})
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "flex-1 relative h-full flex items-center",
				children: [/* @__PURE__ */ i("div", {
					className: e("absolute h-4 rounded-sm opacity-80", y),
					style: {
						left: `${g}%`,
						width: `${v}%`,
						minWidth: 2
					}
				}), !p && /* @__PURE__ */ a("span", {
					className: "absolute text-[10px] text-neutral",
					style: { left: `${g + v + .5}%` },
					children: [t.durationMs, "ms"]
				})]
			}),
			p && /* @__PURE__ */ a("span", {
				"data-testid": "trace-duration",
				className: e("w-20 shrink-0 px-2 text-right font-mono text-[10px] whitespace-nowrap", m ? "text-danger-fg" : "text-text-tertiary"),
				children: [t.durationMs, "ms"]
			})
		]
	});
}
function d(e, t) {
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
function f({ trace: s, className: f, title: p, legendKinds: m, scale: h = "time", onScaleChange: g, scaleToggle: _ = !1, colorByStatus: v = !1, durationColumn: y = !1, errorText: b = o }) {
	let [x, S] = n(null), [C, w] = n(h), T = g ? h : C, E = (e) => {
		w(e), g?.(e);
	}, D = Math.max(1, ...s.spans.map((e) => e.durationMs)), O = d(s.spans, s.rootSpanId), k = new Date(s.startedAt).getTime();
	return /* @__PURE__ */ a("div", {
		className: e("border border-border rounded-lg overflow-hidden bg-surface", f),
		children: [
			/* @__PURE__ */ a("div", {
				className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel",
				children: [/* @__PURE__ */ a("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ i("span", {
						className: "text-xs font-medium text-text-primary",
						children: p ?? "Trace"
					}), /* @__PURE__ */ i("span", {
						className: "text-[10px] font-mono text-text-tertiary",
						children: s.traceId
					})]
				}), /* @__PURE__ */ a("div", {
					className: "flex items-center gap-2",
					children: [_ && /* @__PURE__ */ a("div", {
						role: "group",
						"aria-label": "Bar scale",
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ i(t, {
							size: "sm",
							variant: T === "time" ? "primary" : "secondary",
							"aria-pressed": T === "time",
							title: "Positions bars on real time. Gaps between bars are time spent between spans.",
							onClick: () => E("time"),
							children: "By time"
						}), /* @__PURE__ */ i(t, {
							size: "sm",
							variant: T === "duration" ? "primary" : "secondary",
							"aria-pressed": T === "duration",
							title: "Every bar starts at 0 and scales to the longest span.",
							onClick: () => E("duration"),
							children: "By duration"
						})]
					}), /* @__PURE__ */ a("span", {
						className: "text-xs text-neutral",
						children: [s.totalDurationMs, "ms total"]
					})]
				})]
			}),
			/* @__PURE__ */ i("div", {
				className: "flex items-center gap-3 px-3 py-1.5 border-b border-border-subtle",
				children: v ? [["bg-success", "Passed"], ["bg-danger", "Failed"]].map(([t, n]) => /* @__PURE__ */ a("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ i("span", { className: e("w-2 h-2 rounded-sm", t) }), /* @__PURE__ */ i("span", {
						className: "text-[10px] text-neutral",
						children: n
					})]
				}, n)) : (m ?? Object.keys(c)).map((t) => /* @__PURE__ */ a("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ i("span", { className: e("w-2 h-2 rounded-sm", c[t]) }), /* @__PURE__ */ i("span", {
						className: "text-[10px] text-neutral",
						children: l[t]
					})]
				}, t))
			}),
			/* @__PURE__ */ i("div", {
				className: "max-h-[300px] overflow-y-auto",
				children: O.map(({ span: e, depth: t }) => {
					let n = new Date(e.startTime).getTime() - k;
					return /* @__PURE__ */ i(u, {
						span: e,
						depth: t,
						totalMs: s.totalDurationMs,
						startOffset: n,
						onSelect: S,
						selected: x?.spanId === e.spanId,
						scale: T,
						maxDurationMs: D,
						byStatus: v,
						durationColumn: y,
						error: b(e)
					}, e.spanId);
				})
			}),
			x && /* @__PURE__ */ a("div", {
				className: "border-t border-border p-3 bg-surface-panel",
				children: [
					/* @__PURE__ */ a("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ i("span", {
							className: "text-xs font-medium text-text-primary",
							children: x.name
						}), /* @__PURE__ */ i("button", {
							className: "text-[10px] text-text-tertiary hover:text-text-secondary",
							onClick: () => S(null),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ a("div", {
						className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]",
						children: [
							/* @__PURE__ */ i("div", {
								className: "text-neutral",
								children: "Kind"
							}),
							/* @__PURE__ */ i("div", {
								className: "text-text-primary font-medium",
								children: l[x.kind]
							}),
							/* @__PURE__ */ i("div", {
								className: "text-neutral",
								children: "Duration"
							}),
							/* @__PURE__ */ a("div", {
								className: "text-text-primary",
								children: [x.durationMs, "ms"]
							}),
							/* @__PURE__ */ i("div", {
								className: "text-neutral",
								children: "Status"
							}),
							/* @__PURE__ */ i("div", {
								className: e("font-medium", x.status === "ok" && "text-success-fg", x.status === "error" && "text-danger-fg"),
								children: x.status
							}),
							b(x) && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i("div", {
								className: "text-neutral",
								children: "Error"
							}), /* @__PURE__ */ i("div", {
								className: "text-danger-fg",
								children: b(x)
							})] }),
							/* @__PURE__ */ i("div", {
								className: "text-neutral",
								children: "Span ID"
							}),
							/* @__PURE__ */ i("div", {
								className: "text-text-primary font-mono",
								children: x.spanId
							})
						]
					}),
					Object.keys(x.attributes).length > 0 && /* @__PURE__ */ a("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ i("div", {
							className: "text-[10px] text-text-tertiary uppercase mb-1",
							children: "Attributes"
						}), /* @__PURE__ */ i("div", {
							className: "text-[11px] font-mono text-text-secondary space-y-0.5",
							children: Object.entries(x.attributes).map(([e, t]) => /* @__PURE__ */ a("div", { children: [
								/* @__PURE__ */ a("span", {
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
export { f as t };
