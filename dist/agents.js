import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Input-DcK2h-jK.js";
/* empty css               */
import { createContext as n, useCallback as r, useContext as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { Background as f, Controls as p, MarkerType as m, ReactFlow as h } from "@xyflow/react";
//#region src/components/agents/fixtures/agentsFixture.ts
var g = [
	{
		id: "orgiq-supervisor",
		name: "Supervisor",
		status: "healthy",
		protocol: "a2a",
		model: "claude-sonnet-4-6",
		tools: ["route-to-agent", "summarize"],
		guardrails: ["orgiq-content-filter"],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-supervisor",
		description: "Orchestrates sub-agents via A2A protocol",
		avgLatencyMs: 1240,
		invocationsLast24h: 47
	},
	{
		id: "orgiq-search",
		name: "Search Agent",
		status: "healthy",
		protocol: "a2a",
		model: "claude-sonnet-4-6",
		tools: ["knowledge-base-query", "graph-traversal"],
		guardrails: ["orgiq-content-filter", "orgiq-pii-filter"],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-search",
		description: "Conversational search across org knowledge",
		avgLatencyMs: 2100,
		invocationsLast24h: 123
	},
	{
		id: "orgiq-scoring",
		name: "Scoring Agent",
		status: "healthy",
		protocol: "direct",
		model: "claude-haiku-4-5",
		tools: [
			"graph-query",
			"compute-pagerank",
			"write-scores"
		],
		guardrails: [],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-scoring",
		description: "Computes expertise and influence scores",
		avgLatencyMs: 890,
		invocationsLast24h: 12
	},
	{
		id: "orgiq-ingestion",
		name: "Ingestion Agent",
		status: "degraded",
		protocol: "direct",
		model: "claude-haiku-4-5",
		tools: [
			"parse-document",
			"chunk-text",
			"embed-chunks",
			"write-kb"
		],
		guardrails: ["orgiq-pii-filter"],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-ingestion",
		description: "Ingests and processes documents into knowledge base",
		avgLatencyMs: 3400,
		invocationsLast24h: 8,
		lastInvocation: "2026-05-08T14:23:00Z"
	},
	{
		id: "orgiq-graph-builder",
		name: "Graph Builder",
		status: "healthy",
		protocol: "direct",
		model: "claude-sonnet-4-6",
		tools: [
			"extract-entities",
			"resolve-entities",
			"write-graph"
		],
		guardrails: [],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-graph-builder",
		description: "Extracts entities and relationships into Neptune graph",
		avgLatencyMs: 4200,
		invocationsLast24h: 5
	},
	{
		id: "orgiq-advisor",
		name: "Advisor Agent",
		status: "offline",
		protocol: "a2a",
		model: "claude-sonnet-4-6",
		tools: [
			"search-agent",
			"scoring-agent",
			"generate-recommendation"
		],
		guardrails: ["orgiq-content-filter"],
		endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-advisor",
		description: "Provides strategic recommendations based on org intelligence",
		avgLatencyMs: 0,
		invocationsLast24h: 0
	}
], _ = [
	{
		agentId: "orgiq-supervisor",
		invocationsTotal: 1247,
		invocationsLast24h: 47,
		errorsLast24h: 2,
		avgLatencyMs: 1240,
		p99LatencyMs: 3800,
		tokensInLast24h: 42e3,
		tokensOutLast24h: 18500,
		guardrailBlocksLast24h: 1,
		asOf: "2026-05-08T15:00:00Z"
	},
	{
		agentId: "orgiq-search",
		invocationsTotal: 3892,
		invocationsLast24h: 123,
		errorsLast24h: 5,
		avgLatencyMs: 2100,
		p99LatencyMs: 6200,
		tokensInLast24h: 156e3,
		tokensOutLast24h: 89e3,
		guardrailBlocksLast24h: 3,
		asOf: "2026-05-08T15:00:00Z"
	},
	{
		agentId: "orgiq-scoring",
		invocationsTotal: 456,
		invocationsLast24h: 12,
		errorsLast24h: 0,
		avgLatencyMs: 890,
		p99LatencyMs: 2100,
		tokensInLast24h: 8400,
		tokensOutLast24h: 3200,
		guardrailBlocksLast24h: 0,
		asOf: "2026-05-08T15:00:00Z"
	}
], v = /* @__PURE__ */ new Date("2026-05-08T15:00:00Z");
function y(e) {
	let t = e.startTime ?? v.toISOString(), n = e.durationMs ?? 100, r = e.endTime ?? new Date(new Date(t).getTime() + n).toISOString();
	return {
		traceId: "trace-001",
		parentSpanId: void 0,
		status: "ok",
		attributes: {},
		...e,
		startTime: t,
		endTime: r,
		durationMs: n
	};
}
var b = {
	traceId: "trace-001",
	rootSpanId: "span-root",
	agentId: "orgiq-supervisor",
	startedAt: v.toISOString(),
	totalDurationMs: 3200,
	spans: [
		y({
			spanId: "span-root",
			name: "supervisor.invoke",
			kind: "agent",
			durationMs: 3200
		}),
		y({
			spanId: "span-guard",
			parentSpanId: "span-root",
			name: "guardrail.evaluate",
			kind: "guardrail",
			durationMs: 120,
			startTime: new Date(v.getTime() + 50).toISOString()
		}),
		y({
			spanId: "span-route",
			parentSpanId: "span-root",
			name: "supervisor.route",
			kind: "internal",
			durationMs: 80,
			startTime: new Date(v.getTime() + 180).toISOString()
		}),
		y({
			spanId: "span-search",
			parentSpanId: "span-root",
			name: "search-agent.invoke",
			kind: "agent",
			durationMs: 2100,
			startTime: new Date(v.getTime() + 270).toISOString()
		}),
		y({
			spanId: "span-kb",
			parentSpanId: "span-search",
			name: "knowledge-base.retrieve",
			kind: "retrieval",
			durationMs: 450,
			startTime: new Date(v.getTime() + 300).toISOString()
		}),
		y({
			spanId: "span-llm",
			parentSpanId: "span-search",
			name: "bedrock.invoke_model",
			kind: "llm",
			durationMs: 1400,
			startTime: new Date(v.getTime() + 800).toISOString()
		}),
		y({
			spanId: "span-graph",
			parentSpanId: "span-search",
			name: "neptune.execute_query",
			kind: "tool",
			durationMs: 200,
			startTime: new Date(v.getTime() + 2250).toISOString()
		}),
		y({
			spanId: "span-summary",
			parentSpanId: "span-root",
			name: "supervisor.summarize",
			kind: "llm",
			durationMs: 700,
			startTime: new Date(v.getTime() + 2450).toISOString()
		})
	]
}, x = n(null);
function S({ children: e, agents: t, metrics: n, baseUrl: i }) {
	let [s, l] = c(t ?? g), [d, f] = c(n ?? _), [p, m] = c([]), [h, v] = c([]), [y, b] = c(null);
	a(() => {
		t && l(t);
	}, [t]), a(() => {
		n && f(n);
	}, [n]);
	let S = r(() => {
		l(t ?? g), f(n ?? _);
	}, [t, n]), C = r((e) => {
		b(e);
	}, []), w = r((e) => s.find((t) => t.id === e), [s]), T = r((e) => d.find((t) => t.agentId === e), [d]), E = o(() => ({
		agents: s,
		metrics: d,
		sessions: p,
		a2aSessions: h,
		selectedAgentId: y,
		selectAgent: C,
		refreshAgents: S,
		getAgent: w,
		getMetrics: T
	}), [
		s,
		d,
		p,
		h,
		y,
		C,
		S,
		w,
		T
	]);
	return /* @__PURE__ */ u(x.Provider, {
		value: E,
		children: e
	});
}
function C() {
	let e = i(x);
	if (!e) throw Error("useAgentsContext must be used within AgentsProvider");
	return e;
}
//#endregion
//#region src/components/agents/AgentsLayout.tsx
function w({ children: e, agents: t, metrics: n, baseUrl: r }) {
	return /* @__PURE__ */ u(S, {
		agents: t,
		metrics: n,
		baseUrl: r,
		children: /* @__PURE__ */ u("div", {
			className: "flex flex-col h-full",
			children: e
		})
	});
}
//#endregion
//#region src/components/agents/components/AgentCard.tsx
var T = {
	healthy: "bg-success-bg text-success-fg",
	degraded: "bg-warning-bg text-warning-fg",
	offline: "bg-danger-bg text-danger-fg",
	deploying: "bg-info-bg text-info-fg"
}, E = {
	healthy: "bg-success",
	degraded: "bg-warning",
	offline: "bg-danger",
	deploying: "bg-info"
};
function D({ agent: t, metrics: n, selected: r, onClick: i }) {
	return /* @__PURE__ */ d("button", {
		type: "button",
		className: e("flex flex-col w-full text-left font-[inherit] border rounded-lg cursor-pointer transition-all hover:shadow-sm overflow-hidden", r ? "border-info bg-info-bg/50 shadow-sm" : "border-border bg-white hover:border-border-emphasis"),
		onClick: i,
		children: [/* @__PURE__ */ u("div", {
			className: e("flex items-center justify-end px-3 py-1.5", t.status === "healthy" && "bg-success-bg", t.status === "degraded" && "bg-warning-bg", t.status === "offline" && "bg-danger-bg", t.status === "deploying" && "bg-info-bg"),
			children: /* @__PURE__ */ d("span", {
				className: e("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", T[t.status]),
				children: [/* @__PURE__ */ u("span", { className: e("w-1.5 h-1.5 rounded-full", E[t.status]) }), t.status]
			})
		}), /* @__PURE__ */ d("div", {
			className: "p-4 pt-3",
			children: [
				/* @__PURE__ */ d("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ u("span", {
						className: "text-lg shrink-0",
						children: "🤖"
					}), /* @__PURE__ */ d("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ u("div", {
							className: "font-medium text-sm text-text-primary truncate",
							children: t.name
						}), /* @__PURE__ */ u("div", {
							className: "text-xs text-neutral font-mono truncate",
							children: t.id
						})]
					})]
				}),
				t.description && /* @__PURE__ */ u("p", {
					className: "text-xs text-text-secondary mb-3 line-clamp-2",
					children: t.description
				}),
				/* @__PURE__ */ d("div", {
					className: "flex flex-wrap items-center gap-2 text-xs text-neutral",
					children: [
						/* @__PURE__ */ u("span", {
							className: "font-mono uppercase text-[10px] px-1.5 py-0.5 bg-surface-hover rounded shrink-0",
							children: t.protocol
						}),
						/* @__PURE__ */ u("span", {
							className: "truncate",
							children: t.model
						}),
						n && /* @__PURE__ */ d(l, { children: [
							/* @__PURE__ */ u("span", {
								className: "text-text-disabled",
								children: "|"
							}),
							/* @__PURE__ */ d("span", {
								className: "shrink-0",
								children: [n.invocationsLast24h, " inv/24h"]
							}),
							/* @__PURE__ */ d("span", {
								className: "shrink-0",
								children: [n.avgLatencyMs, "ms avg"]
							})
						] }),
						!n && t.avgLatencyMs != null && /* @__PURE__ */ d(l, { children: [
							/* @__PURE__ */ u("span", {
								className: "text-text-disabled",
								children: "|"
							}),
							/* @__PURE__ */ d("span", {
								className: "shrink-0",
								children: [t.invocationsLast24h ?? 0, " inv/24h"]
							}),
							/* @__PURE__ */ d("span", {
								className: "shrink-0",
								children: [t.avgLatencyMs, "ms avg"]
							})
						] })
					]
				}),
				t.tools.length > 0 && /* @__PURE__ */ d("div", {
					className: "flex flex-wrap gap-1 mt-2",
					children: [t.tools.slice(0, 4).map((e) => /* @__PURE__ */ u("span", {
						className: "text-[10px] px-1.5 py-0.5 bg-surface-hover text-text-secondary rounded font-mono",
						children: e
					}, e)), t.tools.length > 4 && /* @__PURE__ */ d("span", {
						className: "text-[10px] px-1.5 py-0.5 text-text-tertiary",
						children: ["+", t.tools.length - 4]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/agents/components/GuardrailBadge.tsx
function O({ guardrails: t, className: n, compact: r }) {
	return t.length === 0 ? /* @__PURE__ */ u("span", {
		className: e("text-[10px] text-text-tertiary italic", n),
		children: "No guardrails"
	}) : r ? /* @__PURE__ */ d("span", {
		className: e("inline-flex items-center gap-1 text-[10px]", n),
		children: [/* @__PURE__ */ u("span", {
			className: "text-warning-fg",
			children: "🛡️"
		}), /* @__PURE__ */ u("span", {
			className: "text-text-secondary",
			children: t.length
		})]
	}) : /* @__PURE__ */ u("div", {
		className: e("flex flex-wrap gap-1", n),
		children: t.map((e) => /* @__PURE__ */ d("span", {
			className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-warning-bg border border-warning-border text-warning-fg rounded font-mono",
			children: ["🛡️ ", e]
		}, e))
	});
}
//#endregion
//#region src/components/agents/AgentsDashboardPage.tsx
function k({ onAgentClick: t, className: n }) {
	let { agents: r, metrics: i } = C(), a = r.filter((e) => e.status === "healthy").length, o = r.filter((e) => e.status === "degraded").length, s = r.filter((e) => e.status === "offline").length, c = r.reduce((e, t) => e + (t.invocationsLast24h ?? 0), 0), l = r.filter((e) => e.avgLatencyMs).length > 0 ? Math.round(r.reduce((e, t) => e + (t.avgLatencyMs ?? 0), 0) / r.filter((e) => e.avgLatencyMs).length) : 0, f = [...new Set(r.flatMap((e) => e.guardrails))];
	return /* @__PURE__ */ d("div", {
		className: e("space-y-6", n),
		children: [
			/* @__PURE__ */ d("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-3",
				children: [
					/* @__PURE__ */ u(A, {
						label: "Total Agents",
						value: r.length
					}),
					/* @__PURE__ */ u(A, {
						label: "Healthy",
						value: a,
						color: "emerald"
					}),
					/* @__PURE__ */ u(A, {
						label: "Degraded",
						value: o,
						color: "amber"
					}),
					/* @__PURE__ */ u(A, {
						label: "Offline",
						value: s,
						color: "red"
					}),
					/* @__PURE__ */ u(A, {
						label: "Invocations (24h)",
						value: c
					})
				]
			}),
			/* @__PURE__ */ d("div", {
				className: "flex items-center justify-between px-1",
				children: [/* @__PURE__ */ d("div", {
					className: "text-xs text-neutral",
					children: [
						"Avg latency: ",
						/* @__PURE__ */ d("span", {
							className: "font-medium text-text-primary",
							children: [l, "ms"]
						}),
						" · ",
						"Metrics tracked: ",
						/* @__PURE__ */ d("span", {
							className: "font-medium text-text-primary",
							children: [i.length, " agents"]
						})
					]
				}), /* @__PURE__ */ u(O, { guardrails: f })]
			}),
			/* @__PURE__ */ u("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: r.map((e) => /* @__PURE__ */ u(D, {
					agent: e,
					metrics: i.find((t) => t.agentId === e.id),
					onClick: () => t?.(e.id)
				}, e.id))
			})
		]
	});
}
function A({ label: t, value: n, color: r }) {
	return /* @__PURE__ */ d("div", {
		className: "border border-border rounded-lg p-3 bg-white",
		children: [/* @__PURE__ */ u("div", {
			className: "text-[10px] uppercase text-text-tertiary mb-1",
			children: t
		}), /* @__PURE__ */ u("div", {
			className: e("text-xl font-semibold", r === "emerald" ? "text-success-fg" : r === "amber" ? "text-warning-fg" : r === "red" ? "text-danger-fg" : "text-text-primary"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/agents/components/TraceTimeline.tsx
var j = {
	agent: "bg-info",
	tool: "bg-accent",
	llm: "bg-warning",
	retrieval: "bg-success",
	guardrail: "bg-danger",
	internal: "bg-surface-emphasis"
}, M = {
	agent: "Agent",
	tool: "Tool",
	llm: "LLM",
	retrieval: "Retrieval",
	guardrail: "Guardrail",
	internal: "Internal"
};
function N({ span: t, depth: n, totalMs: r, startOffset: i, onSelect: a, selected: o }) {
	let s = r > 0 ? i / r * 100 : 0, c = r > 0 ? Math.max(t.durationMs / r * 100, .5) : 0;
	return /* @__PURE__ */ d("button", {
		type: "button",
		className: e("w-full text-left bg-transparent font-[inherit] flex items-center h-7 hover:bg-surface-panel cursor-pointer transition-colors border-b border-border-subtle", o && "bg-info-bg"),
		onClick: () => a(t),
		children: [/* @__PURE__ */ d("div", {
			className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden",
			children: [
				/* @__PURE__ */ u("span", {
					style: { marginLeft: n * 12 },
					className: "shrink-0"
				}),
				/* @__PURE__ */ u("span", { className: e("w-2 h-2 rounded-sm shrink-0", j[t.kind]) }),
				/* @__PURE__ */ u("span", {
					className: "text-[11px] text-text-primary truncate",
					children: t.name
				})
			]
		}), /* @__PURE__ */ d("div", {
			className: "flex-1 relative h-full flex items-center",
			children: [/* @__PURE__ */ u("div", {
				className: e("absolute h-4 rounded-sm opacity-80", j[t.kind]),
				style: {
					left: `${s}%`,
					width: `${c}%`,
					minWidth: 2
				}
			}), /* @__PURE__ */ d("span", {
				className: "absolute text-[10px] text-neutral",
				style: { left: `${s + c + .5}%` },
				children: [t.durationMs, "ms"]
			})]
		})]
	});
}
function P(e, t) {
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
function F({ trace: t, className: n }) {
	let [r, i] = c(null), a = P(t.spans, t.rootSpanId), o = new Date(t.startedAt).getTime();
	return /* @__PURE__ */ d("div", {
		className: e("border border-border rounded-lg overflow-hidden bg-white", n),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel",
				children: [/* @__PURE__ */ d("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ u("span", {
						className: "text-xs font-medium text-text-primary",
						children: "Trace"
					}), /* @__PURE__ */ u("span", {
						className: "text-[10px] font-mono text-text-tertiary",
						children: t.traceId
					})]
				}), /* @__PURE__ */ d("span", {
					className: "text-xs text-neutral",
					children: [t.totalDurationMs, "ms total"]
				})]
			}),
			/* @__PURE__ */ u("div", {
				className: "flex items-center gap-3 px-3 py-1.5 border-b border-border-subtle",
				children: Object.keys(j).map((t) => /* @__PURE__ */ d("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ u("span", { className: e("w-2 h-2 rounded-sm", j[t]) }), /* @__PURE__ */ u("span", {
						className: "text-[10px] text-neutral",
						children: M[t]
					})]
				}, t))
			}),
			/* @__PURE__ */ u("div", {
				className: "max-h-[300px] overflow-y-auto",
				children: a.map(({ span: e, depth: n }) => {
					let a = new Date(e.startTime).getTime() - o;
					return /* @__PURE__ */ u(N, {
						span: e,
						depth: n,
						totalMs: t.totalDurationMs,
						startOffset: a,
						onSelect: i,
						selected: r?.spanId === e.spanId
					}, e.spanId);
				})
			}),
			r && /* @__PURE__ */ d("div", {
				className: "border-t border-border p-3 bg-surface-panel",
				children: [
					/* @__PURE__ */ d("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ u("span", {
							className: "text-xs font-medium text-text-primary",
							children: r.name
						}), /* @__PURE__ */ u("button", {
							className: "text-[10px] text-text-tertiary hover:text-text-secondary",
							onClick: () => i(null),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ d("div", {
						className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]",
						children: [
							/* @__PURE__ */ u("div", {
								className: "text-neutral",
								children: "Kind"
							}),
							/* @__PURE__ */ u("div", {
								className: "text-text-primary font-medium",
								children: M[r.kind]
							}),
							/* @__PURE__ */ u("div", {
								className: "text-neutral",
								children: "Duration"
							}),
							/* @__PURE__ */ d("div", {
								className: "text-text-primary",
								children: [r.durationMs, "ms"]
							}),
							/* @__PURE__ */ u("div", {
								className: "text-neutral",
								children: "Status"
							}),
							/* @__PURE__ */ u("div", {
								className: e("font-medium", r.status === "ok" && "text-success-fg", r.status === "error" && "text-danger-fg"),
								children: r.status
							}),
							/* @__PURE__ */ u("div", {
								className: "text-neutral",
								children: "Span ID"
							}),
							/* @__PURE__ */ u("div", {
								className: "text-text-primary font-mono",
								children: r.spanId
							})
						]
					}),
					Object.keys(r.attributes).length > 0 && /* @__PURE__ */ d("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ u("div", {
							className: "text-[10px] text-text-tertiary uppercase mb-1",
							children: "Attributes"
						}), /* @__PURE__ */ u("div", {
							className: "text-[11px] font-mono text-text-secondary space-y-0.5",
							children: Object.entries(r.attributes).map(([e, t]) => /* @__PURE__ */ d("div", { children: [
								/* @__PURE__ */ d("span", {
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
//#region src/components/agents/AgentDetailPage.tsx
function I({ agentId: t, trace: n, onBack: r, className: i }) {
	let { getAgent: a, getMetrics: o } = C(), s = a(t), c = o(t);
	return s ? /* @__PURE__ */ d("div", {
		className: e("space-y-6", i),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ d("div", { children: [
					r && /* @__PURE__ */ u("button", {
						className: "text-xs text-info-fg hover:underline mb-2 block",
						onClick: r,
						children: "← Back"
					}),
					/* @__PURE__ */ d("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ u("span", {
							className: "text-2xl",
							children: "🤖"
						}), /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("h2", {
							className: "text-lg font-semibold text-text-primary",
							children: s.name
						}), /* @__PURE__ */ u("div", {
							className: "text-xs text-neutral font-mono",
							children: s.id
						})] })]
					}),
					s.description && /* @__PURE__ */ u("p", {
						className: "text-sm text-text-secondary mt-2",
						children: s.description
					})
				] }), /* @__PURE__ */ u(ee, { status: s.status })]
			}),
			/* @__PURE__ */ d("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ d(L, {
						title: "Configuration",
						children: [
							/* @__PURE__ */ u(R, {
								label: "Protocol",
								value: s.protocol.toUpperCase()
							}),
							/* @__PURE__ */ u(R, {
								label: "Model",
								value: s.model
							}),
							/* @__PURE__ */ u(R, {
								label: "Endpoint",
								value: s.endpoint,
								mono: !0
							})
						]
					}),
					/* @__PURE__ */ u(L, {
						title: "Tools",
						children: /* @__PURE__ */ u("div", {
							className: "flex flex-wrap gap-1",
							children: s.tools.map((e) => /* @__PURE__ */ u("span", {
								className: "text-[11px] px-2 py-0.5 bg-surface-hover rounded font-mono text-text-primary",
								children: e
							}, e))
						})
					}),
					/* @__PURE__ */ u(L, {
						title: "Guardrails",
						children: /* @__PURE__ */ u(O, { guardrails: s.guardrails })
					}),
					c && /* @__PURE__ */ d(L, {
						title: "Metrics (24h)",
						children: [
							/* @__PURE__ */ u(R, {
								label: "Invocations",
								value: String(c.invocationsLast24h)
							}),
							/* @__PURE__ */ u(R, {
								label: "Errors",
								value: String(c.errorsLast24h)
							}),
							/* @__PURE__ */ u(R, {
								label: "Avg Latency",
								value: `${c.avgLatencyMs}ms`
							}),
							/* @__PURE__ */ u(R, {
								label: "P99 Latency",
								value: `${c.p99LatencyMs}ms`
							}),
							/* @__PURE__ */ u(R, {
								label: "Tokens In",
								value: c.tokensInLast24h.toLocaleString()
							}),
							/* @__PURE__ */ u(R, {
								label: "Tokens Out",
								value: c.tokensOutLast24h.toLocaleString()
							}),
							/* @__PURE__ */ u(R, {
								label: "Guardrail Blocks",
								value: String(c.guardrailBlocksLast24h)
							})
						]
					})
				]
			}),
			n && /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("h3", {
				className: "text-sm font-medium text-text-primary mb-2",
				children: "Recent Trace"
			}), /* @__PURE__ */ u(F, { trace: n })] })
		]
	}) : /* @__PURE__ */ d("div", {
		className: e("text-center py-12", i),
		children: [/* @__PURE__ */ d("div", {
			className: "text-text-tertiary text-sm",
			children: ["Agent not found: ", t]
		}), r && /* @__PURE__ */ u("button", {
			className: "mt-2 text-xs text-info-fg hover:underline",
			onClick: r,
			children: "Back to dashboard"
		})]
	});
}
function ee({ status: t }) {
	return /* @__PURE__ */ u("span", {
		className: e("text-xs font-medium px-2.5 py-1 rounded-full", {
			healthy: "bg-success-bg text-success-fg",
			degraded: "bg-warning-bg text-warning-fg",
			offline: "bg-danger-bg text-danger-fg",
			deploying: "bg-info-bg text-info-fg"
		}[t] ?? "bg-surface-hover text-text-primary"),
		children: t
	});
}
function L({ title: e, children: t }) {
	return /* @__PURE__ */ d("div", {
		className: "border border-border rounded-lg p-4 bg-white",
		children: [/* @__PURE__ */ u("h4", {
			className: "text-xs font-medium text-neutral uppercase mb-3",
			children: e
		}), t]
	});
}
function R({ label: t, value: n, mono: r }) {
	return /* @__PURE__ */ d("div", {
		className: "flex items-baseline justify-between py-1 text-[12px]",
		children: [/* @__PURE__ */ u("span", {
			className: "text-neutral",
			children: t
		}), /* @__PURE__ */ u("span", {
			className: e("text-text-primary", r && "font-mono text-[11px] break-all text-right max-w-[60%]"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/agents/components/AgentFlowCanvas.tsx
function te(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.id, 0), r.set(t.id, 0);
	for (let e of t) n.set(e.from, (n.get(e.from) ?? 0) + 1), r.set(e.to, (r.get(e.to) ?? 0) + 1);
	let i = [
		e.filter((e) => (r.get(e.id) ?? 0) === 0),
		e.filter((e) => (r.get(e.id) ?? 0) > 0 && (n.get(e.id) ?? 0) > 0),
		e.filter((e) => (n.get(e.id) ?? 0) === 0 && (r.get(e.id) ?? 0) > 0)
	].filter((e) => e.length > 0), a = [];
	for (let e = 0; e < i.length; e++) {
		let t = i[e], n = -((t.length - 1) * 120) / 2;
		for (let r = 0; r < t.length; r++) {
			let i = t[r];
			a.push({
				id: i.id,
				position: {
					x: e * 300,
					y: n + r * 120
				},
				data: { label: i.name },
				type: "default",
				style: {
					background: i.status === "offline" ? "var(--color-danger-bg)" : i.status === "degraded" ? "var(--color-warning-bg)" : "var(--color-success-bg)",
					border: `2px solid ${i.status === "offline" ? "var(--color-danger-border)" : i.status === "degraded" ? "var(--color-caution-border)" : "#86efac"}`,
					borderRadius: 8,
					padding: "8px 16px",
					fontSize: 13,
					fontWeight: 500,
					width: 180
				}
			});
		}
	}
	return a;
}
function ne(e, t) {
	let n = new Set(t.map((e) => e.id));
	return e.filter((e) => n.has(e.from) && n.has(e.to)).map((e, n) => {
		let r = t.find((t) => t.id === e.from)?.protocol === "a2a";
		return {
			id: `edge-${n}`,
			source: e.from,
			target: e.to,
			animated: r,
			style: {
				stroke: r ? "var(--color-info)" : "var(--color-text-tertiary)",
				strokeWidth: r ? 2 : 1.5
			},
			label: r ? "A2A" : void 0,
			labelStyle: {
				fontSize: 10,
				fill: "var(--color-neutral)",
				fontWeight: 500
			},
			markerEnd: {
				type: m.ArrowClosed,
				width: 16,
				height: 16,
				color: r ? "var(--color-info)" : "var(--color-text-tertiary)"
			}
		};
	});
}
var re = [];
function z({ agents: t, edges: n = re, onAgentClick: r, className: i }) {
	let a = o(() => te(t, n), [t, n]), s = o(() => ne(n, t), [n, t]);
	return /* @__PURE__ */ u("div", {
		className: e("w-full h-[500px]", i),
		children: /* @__PURE__ */ d(h, {
			nodes: a,
			edges: s,
			onNodeClick: (e, t) => {
				r?.(t.id);
			},
			fitView: !0,
			fitViewOptions: { padding: .3 },
			proOptions: { hideAttribution: !0 },
			children: [/* @__PURE__ */ u(f, {
				gap: 20,
				size: 1,
				color: "#e2e8f0"
			}), /* @__PURE__ */ u(p, { showInteractive: !1 })]
		})
	});
}
//#endregion
//#region src/components/agents/AgentFlowPage.tsx
var B = [
	{
		from: "orgiq-supervisor",
		to: "orgiq-search"
	},
	{
		from: "orgiq-supervisor",
		to: "orgiq-advisor"
	},
	{
		from: "orgiq-advisor",
		to: "orgiq-search"
	},
	{
		from: "orgiq-advisor",
		to: "orgiq-scoring"
	},
	{
		from: "orgiq-ingestion",
		to: "orgiq-graph-builder"
	},
	{
		from: "orgiq-graph-builder",
		to: "orgiq-scoring"
	}
];
function V({ edges: t = B, onAgentClick: n, className: r }) {
	let { agents: i } = C(), a = i.filter((e) => e.protocol === "a2a"), o = i.filter((e) => e.protocol === "direct");
	return /* @__PURE__ */ d("div", {
		className: e("space-y-4", r),
		children: [/* @__PURE__ */ d("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("h2", {
				className: "text-lg font-semibold text-text-primary",
				children: "Agent Flow (A2A)"
			}), /* @__PURE__ */ d("p", {
				className: "text-xs text-neutral",
				children: [
					a.length,
					" A2A agents · ",
					o.length,
					" direct agents ·",
					" ",
					t.length,
					" connections"
				]
			})] }), /* @__PURE__ */ d("div", {
				className: "flex items-center gap-3 text-[10px] text-neutral",
				children: [/* @__PURE__ */ d("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ u("span", { className: "w-3 h-0.5 bg-info inline-block" }), " A2A (animated)"]
				}), /* @__PURE__ */ d("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ u("span", { className: "w-3 h-0.5 bg-surface-emphasis inline-block" }), " Direct"]
				})]
			})]
		}), /* @__PURE__ */ u("div", {
			className: "border border-border rounded-lg overflow-hidden",
			children: /* @__PURE__ */ u(z, {
				agents: i,
				edges: t,
				onAgentClick: n
			})
		})]
	});
}
//#endregion
//#region src/components/agents/hooks/useAgUiStream.ts
function H(e, t) {
	let n = e;
	for (let e of t) {
		if (typeof n != "object" || !n) return;
		n = n[e];
	}
	return n;
}
function U(e, t, n) {
	if (t.length === 0) return n;
	let r = Array.isArray(e) ? [...e] : { ...e }, i = t[0];
	return r[i] = t.length === 1 ? n : U(r[i], t.slice(1), n), r;
}
function W(e, t) {
	if (t.length === 0) return;
	let n = Array.isArray(e) ? [...e] : { ...e };
	return t.length === 1 ? delete n[t[0]] : n[t[0]] = W(n[t[0]], t.slice(1)), n;
}
function G(e) {
	return !e || e === "/" ? [] : e.replace(/^\//, "").split("/").map((e) => e.replace(/~1/g, "/").replace(/~0/g, "~"));
}
function ie(e, t) {
	let n = e;
	for (let e of t) try {
		let t = G(e.path);
		switch (e.op) {
			case "add":
			case "replace":
				n = U(n, t, e.value);
				break;
			case "remove":
				n = W(n, t);
				break;
			case "copy": {
				let r = G(e.from ?? "");
				n = U(n, t, H(n, r));
				break;
			}
			case "move": {
				let r = G(e.from ?? ""), i = H(n, r);
				n = W(n, r), n = U(n, t, i);
				break;
			}
			case "test": {
				let r = H(n, t);
				JSON.stringify(r) !== JSON.stringify(e.value) && console.warn("[useAgUiStream] JSON Patch test op failed at", e.path);
				break;
			}
			default: console.warn("[useAgUiStream] Unsupported JSON Patch op:", e.op);
		}
	} catch (t) {
		console.warn("[useAgUiStream] JSON Patch op error:", e, t);
	}
	return n;
}
function K() {
	return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function q({ url: e, threadId: t, headers: n, extraBody: i, onEvent: o }) {
	let [l, u] = c([]), [d, f] = c(""), [p, m] = c([]), [h, g] = c(void 0), [_, v] = c(t ?? null), [y, b] = c(null), [x, S] = c(!1), [C, w] = c(null), T = s(null), E = s(null), D = s(""), O = s([]), k = r((e) => {
		u((t) => {
			let n = t.findIndex((e) => e.id === E.current);
			if (n === -1) return t;
			let r = [...t];
			return r[n] = e(r[n]), r;
		});
	}, []), A = r((e, t) => {
		O.current = O.current.map((n) => n.id === e ? t(n) : n), m((n) => n.map((n) => n.id === e ? t(n) : n)), u((n) => n.map((n) => ({
			...n,
			toolCalls: n.toolCalls.map((n) => n.id === e ? t(n) : n)
		})));
	}, []), j = r((e) => {
		switch (o?.(e), e.type) {
			case "RUN_STARTED":
				v(e.threadId), b(e.runId);
				break;
			case "RUN_FINISHED":
				S(!1), E.current &&= (k((e) => ({
					...e,
					isStreaming: !1
				})), null), f("");
				break;
			case "RUN_ERROR":
				w(e.message), S(!1), E.current &&= (k((e) => ({
					...e,
					isStreaming: !1
				})), null), f("");
				break;
			case "STEP_STARTED":
			case "STEP_FINISHED": break;
			case "TEXT_MESSAGE_START": {
				let t = e.messageId ?? K();
				E.current = t, D.current = "", O.current = [];
				let n = e.role;
				u((e) => [...e, {
					id: t,
					role: n,
					content: "",
					isStreaming: !0,
					toolCalls: []
				}]);
				break;
			}
			case "TEXT_MESSAGE_CONTENT": {
				D.current += e.delta;
				let t = D.current;
				f(t), k((e) => ({
					...e,
					content: t
				}));
				break;
			}
			case "TEXT_MESSAGE_END":
				k((e) => ({
					...e,
					isStreaming: !1
				})), f(""), E.current = null;
				break;
			case "TEXT_MESSAGE_CHUNK": {
				let t = e.messageId ?? E.current ?? K();
				if (E.current !== t) {
					E.current = t, D.current = "", O.current = [];
					let n = e.role ?? "assistant";
					u((e) => [...e, {
						id: t,
						role: n,
						content: "",
						isStreaming: !0,
						toolCalls: []
					}]);
				}
				if (e.delta) {
					D.current += e.delta;
					let t = D.current;
					f(t), k((e) => ({
						...e,
						content: t
					}));
				}
				break;
			}
			case "TOOL_CALL_START": {
				let t = {
					id: e.toolCallId,
					name: e.toolCallName,
					args: "",
					status: "streaming",
					startedAt: Date.now(),
					parentMessageId: e.parentMessageId
				};
				O.current = [...O.current, t], m((e) => [...e, t]), E.current && u((e) => e.map((e) => e.id === E.current ? {
					...e,
					toolCalls: [...e.toolCalls, t]
				} : e));
				break;
			}
			case "TOOL_CALL_ARGS":
				A(e.toolCallId, (t) => ({
					...t,
					args: t.args + e.delta
				}));
				break;
			case "TOOL_CALL_END":
				A(e.toolCallId, (e) => ({
					...e,
					status: "completed",
					endedAt: Date.now()
				})), m((t) => t.filter((t) => t.id !== e.toolCallId));
				break;
			case "TOOL_CALL_RESULT":
				A(e.toolCallId, (t) => ({
					...t,
					result: e.content
				}));
				break;
			case "TOOL_CALL_CHUNK": {
				let t = e.toolCallId;
				if (!t) break;
				let n = O.current.find((e) => e.id === t);
				if (!n && e.toolCallName) {
					let n = {
						id: t,
						name: e.toolCallName,
						args: e.delta ?? "",
						status: "streaming",
						startedAt: Date.now(),
						parentMessageId: e.parentMessageId
					};
					O.current = [...O.current, n], m((e) => [...e, n]), E.current && u((e) => e.map((e) => e.id === E.current ? {
						...e,
						toolCalls: [...e.toolCalls, n]
					} : e));
				} else n && e.delta && A(t, (t) => ({
					...t,
					args: t.args + (e.delta ?? "")
				}));
				break;
			}
			case "STATE_SNAPSHOT":
				g(e.snapshot);
				break;
			case "STATE_DELTA":
				g((t) => ie(t, e.delta));
				break;
			case "MESSAGES_SNAPSHOT":
				u(e.messages);
				break;
			case "ACTIVITY_SNAPSHOT":
			case "ACTIVITY_DELTA": break;
			case "REASONING_MESSAGE_START":
				k((e) => ({
					...e,
					reasoning: ""
				}));
				break;
			case "REASONING_MESSAGE_CONTENT":
				k((t) => ({
					...t,
					reasoning: (t.reasoning ?? "") + e.delta
				}));
				break;
			case "REASONING_MESSAGE_END": break;
			case "REASONING_START":
			case "REASONING_END":
			case "REASONING_MESSAGE_CHUNK":
			case "REASONING_ENCRYPTED_VALUE": break;
			case "RAW":
			case "CUSTOM":
			case "META_EVENT": break;
			default: console.warn("[useAgUiStream] Unhandled event type:", e.type);
		}
	}, [
		o,
		k,
		A
	]), M = r((e) => {
		let t = [], n = e.split("\n"), r = "";
		for (let e of n) {
			if (e === "" || e.startsWith(":")) {
				if (e === "" && r) {
					try {
						t.push(JSON.parse(r));
					} catch {}
					r = "";
				}
				continue;
			}
			e.startsWith("data: ") && (r += e.slice(6));
		}
		return t;
	}, []), N = r(() => {
		T.current?.abort(), S(!1), f(""), E.current &&= (k((e) => ({
			...e,
			isStreaming: !1
		})), null), m([]);
	}, [k]), P = r(async (t, r) => {
		T.current?.abort();
		let a = new AbortController();
		T.current = a, w(null), S(!0);
		let o = {
			id: K(),
			role: "user",
			content: t,
			isStreaming: !1,
			toolCalls: []
		};
		u((e) => [...e, o]);
		try {
			let o = await fetch(e, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream",
					...n
				},
				body: JSON.stringify({
					message: t,
					threadId: _ ?? void 0,
					...i,
					...r?.extraBody
				}),
				signal: a.signal
			});
			if (!o.ok) throw Error(`HTTP ${o.status}: ${o.statusText}`);
			let s = o.body?.getReader();
			if (!s) throw Error("No response body");
			let c = new TextDecoder(), l = "";
			for (;;) {
				let { done: e, value: t } = await s.read();
				if (e) break;
				l += c.decode(t, { stream: !0 });
				let n = l.lastIndexOf("\n\n");
				if (n !== -1) {
					let e = l.slice(0, n + 2);
					l = l.slice(n + 2);
					for (let t of M(e)) j(t);
				}
			}
			if (l.trim()) for (let e of M(l + "\n\n")) j(e);
		} catch (e) {
			if (e instanceof Error && e.name === "AbortError") return;
			w(e instanceof Error ? e.message : "Stream failed"), S(!1), f("");
		}
	}, [
		e,
		_,
		n,
		i,
		M,
		j
	]), F = r((e, t) => {
		N(), v(e), b(null), u(t), f(""), m([]), w(null), D.current = "", O.current = [], E.current = null;
	}, [N]), I = r(() => {
		T.current?.abort(), u([]), S(!1), f(""), m([]), g(void 0), v(null), b(null), w(null), D.current = "", O.current = [], E.current = null;
	}, []);
	return a(() => () => T.current?.abort(), []), {
		messages: l,
		streamingText: d,
		activeToolCalls: p,
		state: h,
		threadId: _,
		runId: y,
		isStreaming: x,
		error: C,
		sendMessage: P,
		cancelStream: N,
		reset: I,
		loadHistory: F
	};
}
//#endregion
//#region src/components/agents/components/ToolCallRenderer.tsx
var ae = {
	streaming: "⏳",
	completed: "✓",
	error: "✗"
};
function J({ toolCall: t, className: n }) {
	let [r, i] = c(!1), a = t.endedAt == null ? null : t.endedAt - t.startedAt;
	return /* @__PURE__ */ d("div", {
		className: e("border rounded text-xs font-mono overflow-hidden", t.status === "streaming" && "border-info-border bg-info-bg/50", t.status === "completed" && "border-border bg-surface-panel", t.status === "error" && "border-danger-border bg-danger-bg/50", n),
		children: [/* @__PURE__ */ d("button", {
			className: "flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-surface-hover/50 transition-colors",
			onClick: () => i(!r),
			children: [
				/* @__PURE__ */ u("span", {
					className: e(t.status === "streaming" && "animate-pulse", t.status === "completed" && "text-success-fg", t.status === "error" && "text-danger-fg"),
					children: ae[t.status]
				}),
				/* @__PURE__ */ u("span", {
					className: "text-text-primary font-medium",
					children: t.name
				}),
				a != null && /* @__PURE__ */ d("span", {
					className: "text-text-tertiary ml-auto",
					children: [a, "ms"]
				}),
				/* @__PURE__ */ u("span", {
					className: "text-text-tertiary ml-1",
					children: r ? "▾" : "▸"
				})
			]
		}), r && /* @__PURE__ */ d("div", {
			className: "px-2 pb-2 space-y-1 border-t border-border-subtle",
			children: [t.args && /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("div", {
				className: "text-[10px] text-text-tertiary uppercase mt-1",
				children: "args"
			}), /* @__PURE__ */ u("pre", {
				className: "text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto",
				children: Y(t.args)
			})] }), t.result != null && /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("div", {
				className: "text-[10px] text-text-tertiary uppercase mt-1",
				children: "result"
			}), /* @__PURE__ */ u("pre", {
				className: "text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto",
				children: oe(t.result)
			})] })]
		})]
	});
}
function Y(e) {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}
function oe(e) {
	if (typeof e == "string") return Y(e);
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
//#endregion
//#region src/components/agents/components/AgUiReasoningBlock.tsx
function X({ reasoning: t, isStreaming: n = !1, defaultOpen: r = !1, className: i }) {
	let [a, o] = c(r);
	if (!t || !t.trim()) return null;
	let s = t.split(/\s+/).filter(Boolean).length;
	return /* @__PURE__ */ d("div", {
		className: e("border border-dashed border-border-emphasis py-2 px-2.5 rounded max-w-full mb-1.5", i),
		children: [/* @__PURE__ */ d("button", {
			type: "button",
			onClick: () => o((e) => !e),
			className: "flex items-center w-full bg-transparent border-none p-0 cursor-pointer gap-1.5 text-left",
			children: [
				/* @__PURE__ */ u("span", {
					className: "text-[10px] text-text-secondary select-none leading-none w-3 inline-block shrink-0",
					children: a ? "▾" : "▸"
				}),
				/* @__PURE__ */ u("span", {
					className: "text-[12px] font-medium text-text-primary flex-1 select-none",
					children: n ? "Thinking…" : "Reasoning"
				}),
				/* @__PURE__ */ d("span", {
					className: "text-[11px] text-text-tertiary bg-surface border border-border rounded-[10px] py-px px-[7px] select-none shrink-0",
					children: [s, " tok"]
				})
			]
		}), a && /* @__PURE__ */ u("div", {
			className: "max-h-[240px] overflow-y-auto pt-2",
			children: /* @__PURE__ */ d("pre", {
				className: "m-0 font-[inherit] text-[12px] text-text-secondary whitespace-pre-wrap break-words leading-[1.6]",
				children: [t, n && /* @__PURE__ */ u("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-text-secondary ml-1 align-middle [animation:agui-reasoning-pulse_1.4s_ease-in-out_infinite]" })]
			})
		})]
	});
}
//#endregion
//#region src/components/agents/components/StreamingChatPanel.tsx
var Z = "w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-[11px] font-bold shrink-0";
function Q({ messages: n, isStreaming: r, streamingText: i = "", activeToolCalls: o = [], error: l, onSend: f, onCancel: p, placeholder: m = "Send a message to the agent...", className: h }) {
	let [g, _] = c(""), v = s(null);
	a(() => {
		v.current && (v.current.scrollTop = v.current.scrollHeight);
	}, [
		n,
		o,
		i
	]);
	function y() {
		let e = g.trim();
		!e || r || (f(e), _(""));
	}
	return /* @__PURE__ */ d("div", {
		className: e("flex flex-col border border-border rounded-lg bg-white overflow-hidden", h),
		children: [
			/* @__PURE__ */ d("div", {
				className: "px-4 py-3 border-b border-border flex items-center justify-between",
				children: [/* @__PURE__ */ u("span", {
					className: "font-semibold text-sm text-text-primary",
					children: "Agent Chat"
				}), r && /* @__PURE__ */ d("span", {
					className: "flex items-center gap-1.5 text-xs text-info-fg",
					children: [/* @__PURE__ */ u("span", { className: "w-1.5 h-1.5 rounded-full bg-info animate-pulse" }), "Streaming"]
				})]
			}),
			/* @__PURE__ */ d("div", {
				ref: v,
				className: "flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4",
				children: [
					n.length === 0 && !r && /* @__PURE__ */ u("div", {
						className: "text-sm text-text-tertiary text-center mt-[60px]",
						children: "Messages will appear here as you interact with the agent..."
					}),
					n.map((t) => /* @__PURE__ */ d("div", {
						className: "flex gap-2.5",
						children: [/* @__PURE__ */ u("div", {
							className: e("w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0", t.role === "user" ? "bg-primary" : "bg-success"),
							children: t.role === "user" ? "U" : "AI"
						}), /* @__PURE__ */ d("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ u("div", {
									className: "flex items-baseline gap-2",
									children: /* @__PURE__ */ u("span", {
										className: "font-semibold text-[13px] text-text-primary",
										children: t.role === "user" ? "You" : "Agent"
									})
								}),
								t.role === "assistant" && t.reasoning && /* @__PURE__ */ u(X, {
									reasoning: t.reasoning,
									isStreaming: t.isStreaming && r,
									defaultOpen: !1
								}),
								/* @__PURE__ */ d("div", {
									className: e("mt-1 py-2 px-3 text-[14px] text-text-primary leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] whitespace-pre-wrap break-words", t.role === "user" ? "bg-primary-bg rounded-[12px_4px_12px_12px]" : "bg-surface-hover rounded-[4px_12px_12px_12px]"),
									children: [t.content, t.isStreaming && /* @__PURE__ */ u("span", {
										className: "inline-block animate-pulse ml-0.5 text-info-fg",
										children: "▊"
									})]
								}),
								t.toolCalls.length > 0 && /* @__PURE__ */ u("div", {
									className: "mt-1.5 flex flex-col gap-1",
									children: t.toolCalls.map((e) => /* @__PURE__ */ u(J, { toolCall: e }, e.id))
								})
							]
						})]
					}, t.id)),
					o.length > 0 && /* @__PURE__ */ d("div", {
						className: "flex gap-2.5",
						children: [/* @__PURE__ */ u("div", {
							className: Z,
							children: "AI"
						}), /* @__PURE__ */ u("div", {
							className: "flex-1 flex flex-col gap-1",
							children: o.map((e) => /* @__PURE__ */ u(J, { toolCall: e }, e.id))
						})]
					}),
					i && !n.some((e) => e.isStreaming) && /* @__PURE__ */ d("div", {
						className: "flex gap-2.5",
						children: [/* @__PURE__ */ u("div", {
							className: Z,
							children: "AI"
						}), /* @__PURE__ */ d("div", {
							className: "flex-1 mt-1 py-2 px-3 bg-surface-hover rounded-[4px_12px_12px_12px] text-[14px] text-text-primary leading-[1.5] whitespace-pre-wrap break-words",
							children: [i, /* @__PURE__ */ u("span", {
								className: "inline-block animate-pulse ml-0.5 text-info-fg",
								children: "▊"
							})]
						})]
					}),
					r && o.length === 0 && !i && n.length > 0 && !n[n.length - 1]?.isStreaming && /* @__PURE__ */ d("div", {
						className: "flex items-center gap-2 py-1",
						children: [/* @__PURE__ */ d("div", {
							className: "flex gap-[3px] py-1.5 px-3 bg-surface-hover rounded-xl",
							children: [
								/* @__PURE__ */ u("span", { className: "w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:0ms]" }),
								/* @__PURE__ */ u("span", { className: "w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:150ms]" }),
								/* @__PURE__ */ u("span", { className: "w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:300ms]" })
							]
						}), /* @__PURE__ */ u("span", {
							className: "text-[12px] text-neutral",
							children: "Agent is thinking..."
						})]
					})
				]
			}),
			l && /* @__PURE__ */ u("div", {
				className: "px-4 py-2 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: l
			}),
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-2 p-3 border-t border-border bg-surface-panel/50",
				children: [/* @__PURE__ */ u(t, {
					value: g,
					onChange: (e) => _(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && y(),
					disabled: r,
					placeholder: r ? "Waiting for response..." : m,
					className: e("flex-1 rounded-lg", r && "bg-surface-panel text-text-tertiary")
				}), r && p ? /* @__PURE__ */ u("button", {
					onClick: p,
					className: "text-sm px-4 py-2.5 bg-danger text-white rounded-lg hover:bg-danger transition-colors font-medium",
					children: "Stop"
				}) : /* @__PURE__ */ u("button", {
					onClick: y,
					disabled: !g.trim() || r,
					className: e("text-sm px-4 py-2.5 rounded-lg transition-colors font-medium", !g.trim() || r ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-info text-white hover:bg-info cursor-pointer"),
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/agents/AgentInvokePage.tsx
function se({ defaultAgentId: t, baseUrl: n = "/api/agents", className: r }) {
	let { agents: i } = C(), [a, o] = c(t ?? i[0]?.id ?? ""), [s, l] = c([]), { messages: f, isStreaming: p, streamingText: m, activeToolCalls: h, error: g, sendMessage: _, cancelStream: v, reset: y } = q({
		url: `${n}/${a}/invoke`,
		onEvent: (e) => l((t) => [...t, e])
	}), b = i.find((e) => e.id === a);
	return /* @__PURE__ */ d("div", {
		className: e("flex h-full min-h-[500px]", r),
		children: [/* @__PURE__ */ d("div", {
			className: "w-[240px] border-r border-border bg-white flex flex-col overflow-hidden",
			children: [
				/* @__PURE__ */ u("div", {
					className: "py-3 px-4 border-b border-border font-semibold text-[13px] text-neutral uppercase tracking-[0.05em]",
					children: "Agents"
				}),
				/* @__PURE__ */ u("div", {
					className: "flex-1 py-2 overflow-y-auto",
					children: i.map((t) => /* @__PURE__ */ d("button", {
						type: "button",
						onClick: () => {
							o(t.id), y(), l([]);
						},
						className: e("w-full text-left bg-transparent font-[inherit] py-2 px-4 flex items-center justify-between transition-all duration-150 ease-in-out border-l-[3px]", t.status === "offline" ? "cursor-not-allowed opacity-50" : "cursor-pointer", a === t.id ? "bg-surface-hover border-l-primary" : "bg-transparent border-l-transparent"),
						children: [/* @__PURE__ */ d("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ u("div", {
								className: "text-[14px] text-text-primary truncate",
								children: t.name
							}), /* @__PURE__ */ d("div", {
								className: "text-[11px] text-text-tertiary",
								children: [
									t.protocol.toUpperCase(),
									" · ",
									t.model
								]
							})]
						}), /* @__PURE__ */ u("span", { className: e("w-2 h-2 rounded-full shrink-0", t.status === "healthy" ? "bg-success" : t.status === "degraded" ? "bg-warning" : "bg-danger") })]
					}, t.id))
				}),
				b && /* @__PURE__ */ d("div", {
					className: "py-3 px-4 border-t border-border text-[11px]",
					children: [
						/* @__PURE__ */ u("div", {
							className: "text-neutral mb-1.5",
							children: "Tools:"
						}),
						/* @__PURE__ */ u("div", {
							className: "flex flex-wrap gap-1",
							children: b.tools.map((e) => /* @__PURE__ */ u("span", {
								className: "py-0.5 px-1.5 bg-surface-hover rounded text-[10px] text-text-secondary font-mono",
								children: e
							}, e))
						}),
						b.guardrails.length > 0 && /* @__PURE__ */ d("div", {
							className: "mt-2",
							children: [/* @__PURE__ */ u("div", {
								className: "text-neutral mb-1",
								children: "Guardrails:"
							}), b.guardrails.map((e) => /* @__PURE__ */ d("div", {
								className: "text-[10px] text-warning-fg font-mono",
								children: ["🛡️ ", e]
							}, e))]
						})
					]
				}),
				/* @__PURE__ */ u("div", {
					className: "py-2 px-4 border-t border-border",
					children: /* @__PURE__ */ u("button", {
						onClick: () => {
							y(), l([]);
						},
						className: "w-full py-1.5 text-[12px] text-neutral bg-surface-panel border border-border rounded-md cursor-pointer",
						children: "Reset Session"
					})
				})
			]
		}), /* @__PURE__ */ d("div", {
			className: "flex-1 flex flex-col overflow-hidden",
			children: [/* @__PURE__ */ u(Q, {
				messages: f,
				isStreaming: p,
				streamingText: m,
				activeToolCalls: h,
				error: g,
				onSend: _,
				onCancel: v,
				className: "flex-1 border-0 rounded-none"
			}), s.length > 0 && /* @__PURE__ */ d("details", {
				className: "border-t border-border bg-surface-panel",
				children: [/* @__PURE__ */ d("summary", {
					className: "py-2 px-4 text-[12px] text-neutral cursor-pointer font-medium",
					children: [
						"Event Log (",
						s.length,
						" events)"
					]
				}), /* @__PURE__ */ u("div", {
					className: "max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]",
					children: s.map((e, t) => /* @__PURE__ */ d("div", {
						className: "flex gap-2 text-text-secondary py-px",
						children: [
							/* @__PURE__ */ u("span", {
								className: "text-text-tertiary w-5 text-right shrink-0",
								children: t + 1
							}),
							/* @__PURE__ */ u("span", {
								className: "text-text-primary w-[150px] shrink-0 font-medium",
								children: e.type
							}),
							/* @__PURE__ */ u("span", {
								className: "text-neutral overflow-hidden text-ellipsis whitespace-nowrap",
								children: e.type === "TEXT_MESSAGE_CONTENT" || e.type === "TOOL_CALL_ARGS" || e.type === "TEXT_MESSAGE_CHUNK" && e.delta ? `"${e.delta.slice(0, 60)}"` : e.type === "TOOL_CALL_START" ? e.toolCallName : e.type === "RUN_ERROR" ? e.message : ""
							})
						]
					}, t))
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/agents/hooks/useAgentRegistry.ts
function ce({ baseUrl: e, pollIntervalMs: t = 3e4, enabled: n = !0 } = {}) {
	let [i, o] = c(g), [s, l] = c("fixture"), [u, d] = c(!1), [f, p] = c(null), m = r(async () => {
		if (!e) {
			o(g), l("fixture");
			return;
		}
		d(!0), p(null);
		try {
			let t = await fetch(`${e}/agents`);
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			let n = await t.json();
			o(n), l("remote");
		} catch (e) {
			p(e instanceof Error ? e.message : "Failed to fetch agents");
		} finally {
			d(!1);
		}
	}, [e]);
	return a(() => {
		if (!n || (m(), !e || t <= 0)) return;
		let r = setInterval(m, t);
		return () => clearInterval(r);
	}, [
		n,
		m,
		e,
		t
	]), {
		agents: i,
		source: s,
		isLoading: u,
		error: f,
		refresh: m,
		getAgent: r((e) => i.find((t) => t.id === e), [i]),
		healthyCount: i.filter((e) => e.status === "healthy").length,
		degradedCount: i.filter((e) => e.status === "degraded").length,
		offlineCount: i.filter((e) => e.status === "offline").length
	};
}
//#endregion
//#region src/components/agents/hooks/useAgentMetrics.ts
function le({ baseUrl: e, agentId: t, pollIntervalMs: n = 6e4, enabled: i = !0 } = {}) {
	let [s, l] = c(_), [u, d] = c(!1), [f, p] = c(null), m = r(async () => {
		if (!e) {
			l(_);
			return;
		}
		d(!0), p(null);
		try {
			let n = t ? `${e}/agents/${t}/metrics` : `${e}/agents/metrics`, r = await fetch(n);
			if (!r.ok) throw Error(`HTTP ${r.status}`);
			let i = await r.json();
			l(i);
		} catch (e) {
			p(e instanceof Error ? e.message : "Failed to fetch metrics");
		} finally {
			d(!1);
		}
	}, [e, t]);
	return a(() => {
		if (!i || (m(), !e || n <= 0)) return;
		let t = setInterval(m, n);
		return () => clearInterval(t);
	}, [
		i,
		m,
		e,
		n
	]), {
		metrics: s,
		isLoading: u,
		error: f,
		refresh: m,
		getMetricsForAgent: r((e) => s.find((t) => t.agentId === e), [s]),
		totalInvocations24h: o(() => s.reduce((e, t) => e + t.invocationsLast24h, 0), [s]),
		totalErrors24h: o(() => s.reduce((e, t) => e + t.errorsLast24h, 0), [s]),
		avgLatencyMs: o(() => s.length === 0 ? 0 : Math.round(s.reduce((e, t) => e + t.avgLatencyMs, 0) / s.length), [s])
	};
}
//#endregion
//#region src/components/agents/hooks/useA2ASession.ts
function $() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function ue({ baseUrl: e, participants: t } = {}) {
	let [n, i] = c(null), [a, o] = c([]), l = s(null), u = r((e) => {
		let t = `a2a-${$()}`;
		l.current = t;
		let n = {
			sessionId: t,
			participants: e,
			messages: [],
			startedAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "active"
		};
		i(n), o([]);
	}, []), d = r((e, t, r) => {
		if (!n) return;
		let a = {
			id: `msg-${$()}`,
			from: e,
			to: t,
			content: r,
			protocol: "a2a",
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		o((e) => [...e, a]), i((e) => e && {
			...e,
			messages: [...e.messages, a]
		});
	}, [n]), f = r(() => {
		i((e) => e && {
			...e,
			status: "completed"
		}), l.current = null;
	}, []);
	return t && !n && u(t), {
		session: n,
		messages: a,
		isActive: n?.status === "active",
		startSession: u,
		sendMessage: d,
		endSession: f
	};
}
//#endregion
//#region src/components/agents/components/AgentDirectory.tsx
var de = [
	"healthy",
	"degraded",
	"offline",
	"deploying"
];
function fe({ agents: n, metricsById: r, filters: i = de, selectedId: a = null, onSelect: s, emptyMessage: l = "No agents match your filter.", className: f }) {
	let [p, m] = c(""), [h, g] = c(null), _ = o(() => {
		let e = p.trim().toLowerCase();
		return n.filter((t) => h && t.status !== h ? !1 : !e || t.name.toLowerCase().includes(e) || t.id.toLowerCase().includes(e) || (t.description?.toLowerCase().includes(e) ?? !1));
	}, [
		n,
		p,
		h
	]);
	return /* @__PURE__ */ d("div", {
		className: e("flex flex-col gap-3", f),
		children: [/* @__PURE__ */ d("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ u(t, {
				type: "search",
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: "Search agents…",
				"aria-label": "Search agents",
				className: "flex-1"
			}), /* @__PURE__ */ d("div", {
				className: "flex flex-wrap items-center gap-1",
				role: "group",
				"aria-label": "Filter by status",
				children: [/* @__PURE__ */ u("button", {
					type: "button",
					onClick: () => g(null),
					className: e("rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors", h === null ? "border-surface-inverse bg-surface-inverse text-white" : "border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel"),
					children: "All"
				}), i.map((t) => /* @__PURE__ */ u("button", {
					type: "button",
					onClick: () => g(h === t ? null : t),
					"aria-pressed": h === t,
					className: e("rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize transition-colors", h === t ? "border-surface-inverse bg-surface-inverse text-white" : "border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel"),
					children: t
				}, t))]
			})]
		}), _.length === 0 ? /* @__PURE__ */ u("div", {
			className: "rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-8 text-center text-sm text-neutral",
			children: l
		}) : /* @__PURE__ */ u("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: _.map((e) => /* @__PURE__ */ u(D, {
				agent: e,
				metrics: r?.[e.id],
				selected: a === e.id,
				onClick: s ? () => s(e) : void 0
			}, e.id))
		})]
	});
}
//#endregion
//#region src/components/agents/components/ConversationHistory.tsx
function pe(e) {
	let t = e.find((e) => e.role === "user" && e.content.trim().length > 0);
	if (t) {
		let e = t.content.trim().replace(/\s+/g, " ");
		return e.length > 80 ? `${e.slice(0, 77)}…` : e;
	}
	return "New conversation";
}
function me(e) {
	let t = [...e].reverse().find((e) => e.role === "assistant" && e.content.trim().length > 0);
	if (!t) return null;
	let n = t.content.trim().replace(/\s+/g, " ");
	return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
function he({ sessions: t, activeThreadId: n = null, onResume: r, onDelete: i, emptyMessage: a = "No prior conversations.", className: o }) {
	return t.length === 0 ? /* @__PURE__ */ u("div", {
		className: e("rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-6 text-center text-sm text-neutral", o),
		children: a
	}) : /* @__PURE__ */ u("ul", {
		className: e("flex flex-col gap-1", o),
		"aria-label": "Prior conversations",
		children: t.map((t) => {
			let a = n === t.threadId, o = pe(t.messages), s = me(t.messages);
			return /* @__PURE__ */ d("li", {
				className: e("group flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors", a ? "border-info bg-info-bg/60" : "border-border bg-white hover:border-border-emphasis hover:bg-surface-panel"),
				children: [/* @__PURE__ */ d("button", {
					type: "button",
					onClick: r ? () => r(t) : void 0,
					disabled: !r,
					className: "flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default",
					children: [
						/* @__PURE__ */ u("span", {
							className: "w-full truncate font-medium text-text-primary",
							children: o
						}),
						s && /* @__PURE__ */ u("span", {
							className: "w-full truncate text-xs text-neutral",
							children: s
						}),
						/* @__PURE__ */ d("span", {
							className: "text-[10px] uppercase tracking-wide text-text-tertiary",
							children: [
								t.messages.length,
								" msg",
								t.messages.length === 1 ? "" : "s"
							]
						})
					]
				}), i && /* @__PURE__ */ u("button", {
					type: "button",
					onClick: () => i(t),
					"aria-label": `Delete conversation ${o}`,
					className: "shrink-0 rounded-md px-2 py-1 text-xs text-neutral opacity-0 hover:bg-surface-hover hover:text-danger-fg focus:opacity-100 group-hover:opacity-100",
					children: "Delete"
				})]
			}, t.threadId);
		})
	});
}
//#endregion
//#region src/components/agents/components/PolicyDecisionLog.tsx
function ge({ decisions: t, className: n, maxItems: r = 50 }) {
	let i = t.slice(0, r);
	return /* @__PURE__ */ d("div", {
		className: e("border border-border rounded-lg overflow-hidden bg-white", n),
		children: [/* @__PURE__ */ d("div", {
			className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel",
			children: [/* @__PURE__ */ u("span", {
				className: "text-xs font-medium text-text-primary",
				children: "Policy Decisions"
			}), /* @__PURE__ */ d("span", {
				className: "text-[10px] text-text-tertiary",
				children: [t.length, " total"]
			})]
		}), i.length === 0 ? /* @__PURE__ */ u("div", {
			className: "px-3 py-6 text-center text-xs text-text-tertiary",
			children: "No decisions recorded"
		}) : /* @__PURE__ */ u("div", {
			className: "max-h-[250px] overflow-y-auto divide-y divide-border-subtle",
			children: i.map((t) => /* @__PURE__ */ d("div", {
				className: "flex items-center gap-2 px-3 py-2",
				children: [
					/* @__PURE__ */ u("span", {
						className: e("shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold", t.decision === "allow" ? "bg-success-bg text-success-fg" : "bg-danger-bg text-danger-fg"),
						children: t.decision === "allow" ? "✓" : "✗"
					}),
					/* @__PURE__ */ d("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ d("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ u("span", {
									className: "text-[11px] font-medium text-text-primary truncate",
									children: t.action
								}),
								/* @__PURE__ */ u("span", {
									className: "text-[10px] text-text-tertiary",
									children: "on"
								}),
								/* @__PURE__ */ u("span", {
									className: "text-[11px] font-mono text-text-secondary truncate",
									children: t.resource
								})
							]
						}), /* @__PURE__ */ d("div", {
							className: "flex items-center gap-1.5 text-[10px] text-text-tertiary",
							children: [
								/* @__PURE__ */ d("span", { children: ["by ", t.principal] }),
								/* @__PURE__ */ u("span", { children: "·" }),
								/* @__PURE__ */ u("span", {
									className: "font-mono",
									children: t.policyId
								}),
								t.reason && /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("span", { children: "·" }), /* @__PURE__ */ u("span", {
									className: "italic",
									children: t.reason
								})] })
							]
						})]
					}),
					/* @__PURE__ */ u("span", {
						className: "text-[10px] text-text-tertiary shrink-0",
						children: _e(t.timestamp)
					})
				]
			}, t.id))
		})]
	});
}
function _e(e) {
	try {
		let t = new Date(e);
		return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
//#endregion
//#region src/components/agents/components/MemoryInspector.tsx
function ve({ entries: n, className: r, onDelete: i }) {
	let [a, o] = c("all"), [s, l] = c(""), f = n.filter((e) => !(a !== "all" && e.scope !== a || s && !e.key.toLowerCase().includes(s.toLowerCase()) && !e.value.toLowerCase().includes(s.toLowerCase()))), p = n.filter((e) => e.scope === "session").length, m = n.filter((e) => e.scope === "long-term").length;
	return /* @__PURE__ */ d("div", {
		className: e("border border-border rounded-lg overflow-hidden bg-white", r),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel",
				children: [/* @__PURE__ */ u("span", {
					className: "text-xs font-medium text-text-primary",
					children: "Memory Inspector"
				}), /* @__PURE__ */ d("span", {
					className: "text-[10px] text-text-tertiary",
					children: [
						p,
						" session · ",
						m,
						" long-term"
					]
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-border-subtle",
				children: [/* @__PURE__ */ u(t, {
					size: "sm",
					value: s,
					onChange: (e) => l(e.target.value),
					placeholder: "Search keys/values...",
					className: "flex-1 text-[11px]"
				}), /* @__PURE__ */ u("div", {
					className: "flex text-[10px] border border-border rounded overflow-hidden",
					children: [
						"all",
						"session",
						"long-term"
					].map((t) => /* @__PURE__ */ u("button", {
						className: e("px-2 py-0.5 transition-colors", a === t ? "bg-info text-white" : "text-neutral hover:bg-surface-hover"),
						onClick: () => o(t),
						children: t
					}, t))
				})]
			}),
			f.length === 0 ? /* @__PURE__ */ u("div", {
				className: "px-3 py-6 text-center text-xs text-text-tertiary",
				children: n.length === 0 ? "No memory entries" : "No matches"
			}) : /* @__PURE__ */ u("div", {
				className: "max-h-[300px] overflow-y-auto divide-y divide-border-subtle",
				children: f.map((t) => /* @__PURE__ */ d("div", {
					className: "px-3 py-2 group",
					children: [
						/* @__PURE__ */ d("div", {
							className: "flex items-center justify-between mb-0.5",
							children: [/* @__PURE__ */ d("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ u("span", {
										className: e("text-[9px] uppercase px-1 py-0.5 rounded font-medium", t.scope === "session" ? "bg-info-bg text-info-fg" : "bg-accent-bg text-accent-fg"),
										children: t.scope
									}),
									t.namespace && /* @__PURE__ */ d("span", {
										className: "text-[10px] text-text-tertiary font-mono",
										children: [t.namespace, "/"]
									}),
									/* @__PURE__ */ u("span", {
										className: "text-[11px] font-medium text-text-primary font-mono",
										children: t.key
									})
								]
							}), i && /* @__PURE__ */ u("button", {
								className: "text-[10px] text-danger-fg hover:text-danger-fg opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity",
								onClick: () => i(t.id),
								children: "delete"
							})]
						}),
						/* @__PURE__ */ u("pre", {
							className: "text-[11px] text-text-secondary font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto",
							children: ye(t.value)
						}),
						/* @__PURE__ */ d("div", {
							className: "flex items-center gap-2 mt-0.5 text-[10px] text-text-tertiary",
							children: [/* @__PURE__ */ d("span", { children: ["Created ", be(t.createdAt)] }), t.ttl && /* @__PURE__ */ d("span", { children: [
								"· TTL ",
								t.ttl,
								"s"
							] })]
						})
					]
				}, t.id))
			})
		]
	});
}
function ye(e) {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}
function be(e) {
	try {
		return new Date(e).toLocaleString(void 0, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	} catch {
		return e;
	}
}
//#endregion
export { X as AgUiReasoningBlock, D as AgentCard, I as AgentDetailPage, fe as AgentDirectory, z as AgentFlowCanvas, V as AgentFlowPage, se as AgentInvokePage, k as AgentsDashboardPage, w as AgentsLayout, S as AgentsProvider, he as ConversationHistory, O as GuardrailBadge, ve as MemoryInspector, ge as PolicyDecisionLog, Q as StreamingChatPanel, J as ToolCallRenderer, F as TraceTimeline, g as fixtureAgents, _ as fixtureMetrics, b as fixtureTrace, ue as useA2ASession, q as useAgUiStream, le as useAgentMetrics, ce as useAgentRegistry, C as useAgentsContext };
