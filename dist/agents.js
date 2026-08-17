import { jsx as t, jsxs as n, Fragment as oe } from "react/jsx-runtime";
import { createContext as Se, useState as S, useEffect as F, useCallback as I, useContext as ke, useMemo as U, useRef as G } from "react";
import { c as x } from "./cn-B6yFEsav.js";
import { ReactFlow as Ae, Background as Te, Controls as Ie, MarkerType as Le } from "@xyflow/react";
/* empty css               */
const V = [
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
    tools: ["graph-query", "compute-pagerank", "write-scores"],
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
    tools: ["parse-document", "chunk-text", "embed-chunks", "write-kb"],
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
    tools: ["extract-entities", "resolve-entities", "write-graph"],
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
    tools: ["search-agent", "scoring-agent", "generate-recommendation"],
    guardrails: ["orgiq-content-filter"],
    endpoint: "https://runtime.agentcore.us-east-1.amazonaws.com/agents/orgiq-advisor",
    description: "Provides strategic recommendations based on org intelligence",
    avgLatencyMs: 0,
    invocationsLast24h: 0
  }
], W = [
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
], D = /* @__PURE__ */ new Date("2026-05-08T15:00:00Z");
function q(e) {
  const s = e.startTime ?? D.toISOString(), r = e.durationMs ?? 100, a = e.endTime ?? new Date(new Date(s).getTime() + r).toISOString();
  return {
    traceId: "trace-001",
    parentSpanId: void 0,
    status: "ok",
    attributes: {},
    ...e,
    startTime: s,
    endTime: a,
    durationMs: r
  };
}
const nt = {
  traceId: "trace-001",
  rootSpanId: "span-root",
  agentId: "orgiq-supervisor",
  startedAt: D.toISOString(),
  totalDurationMs: 3200,
  spans: [
    q({ spanId: "span-root", name: "supervisor.invoke", kind: "agent", durationMs: 3200 }),
    q({ spanId: "span-guard", parentSpanId: "span-root", name: "guardrail.evaluate", kind: "guardrail", durationMs: 120, startTime: new Date(D.getTime() + 50).toISOString() }),
    q({ spanId: "span-route", parentSpanId: "span-root", name: "supervisor.route", kind: "internal", durationMs: 80, startTime: new Date(D.getTime() + 180).toISOString() }),
    q({ spanId: "span-search", parentSpanId: "span-root", name: "search-agent.invoke", kind: "agent", durationMs: 2100, startTime: new Date(D.getTime() + 270).toISOString() }),
    q({ spanId: "span-kb", parentSpanId: "span-search", name: "knowledge-base.retrieve", kind: "retrieval", durationMs: 450, startTime: new Date(D.getTime() + 300).toISOString() }),
    q({ spanId: "span-llm", parentSpanId: "span-search", name: "bedrock.invoke_model", kind: "llm", durationMs: 1400, startTime: new Date(D.getTime() + 800).toISOString() }),
    q({ spanId: "span-graph", parentSpanId: "span-search", name: "neptune.execute_query", kind: "tool", durationMs: 200, startTime: new Date(D.getTime() + 2250).toISOString() }),
    q({ spanId: "span-summary", parentSpanId: "span-root", name: "supervisor.summarize", kind: "llm", durationMs: 700, startTime: new Date(D.getTime() + 2450).toISOString() })
  ]
}, pe = Se(null);
function Ce({
  children: e,
  agents: s,
  metrics: r,
  baseUrl: a
}) {
  const [i, u] = S(s ?? V), [o, c] = S(r ?? W), [h, N] = S([]), [l, p] = S([]), [b, g] = S(null);
  F(() => {
    s && u(s);
  }, [s]), F(() => {
    r && c(r);
  }, [r]);
  const v = I(() => {
    u(s ?? V), c(r ?? W);
  }, [s, r]), k = I((f) => {
    g(f);
  }, []), A = I(
    (f) => i.find((_) => _.id === f),
    [i]
  ), E = I(
    (f) => o.find((_) => _.agentId === f),
    [o]
  );
  return /* @__PURE__ */ t(
    pe.Provider,
    {
      value: {
        agents: i,
        metrics: o,
        sessions: h,
        a2aSessions: l,
        selectedAgentId: b,
        selectAgent: k,
        refreshAgents: v,
        getAgent: A,
        getMetrics: E
      },
      children: e
    }
  );
}
function Y() {
  const e = ke(pe);
  if (!e) throw new Error("useAgentsContext must be used within AgentsProvider");
  return e;
}
function st({ children: e, agents: s, metrics: r, baseUrl: a }) {
  return /* @__PURE__ */ t(Ce, { agents: s, metrics: r, baseUrl: a, children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full", children: e }) });
}
const Ee = {
  healthy: "bg-success-bg text-success-fg",
  degraded: "bg-warning-bg text-warning-fg",
  offline: "bg-danger-bg text-danger-fg",
  deploying: "bg-info-bg text-info-fg"
}, _e = {
  healthy: "bg-success",
  degraded: "bg-warning",
  offline: "bg-danger",
  deploying: "bg-info"
};
function me({ agent: e, metrics: s, selected: r, onClick: a }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: x(
        "border rounded-lg cursor-pointer transition-all hover:shadow-sm overflow-hidden",
        r ? "border-info bg-info-bg/50 shadow-sm" : "border-border bg-white hover:border-border-emphasis"
      ),
      onClick: a,
      children: [
        /* @__PURE__ */ t("div", { className: x(
          "flex items-center justify-end px-3 py-1.5",
          e.status === "healthy" && "bg-success-bg",
          e.status === "degraded" && "bg-warning-bg",
          e.status === "offline" && "bg-danger-bg",
          e.status === "deploying" && "bg-info-bg"
        ), children: /* @__PURE__ */ n(
          "span",
          {
            className: x(
              "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
              Ee[e.status]
            ),
            children: [
              /* @__PURE__ */ t("span", { className: x("w-1.5 h-1.5 rounded-full", _e[e.status]) }),
              e.status
            ]
          }
        ) }),
        /* @__PURE__ */ n("div", { className: "p-4 pt-3", children: [
          /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ t("span", { className: "text-lg shrink-0", children: "🤖" }),
            /* @__PURE__ */ n("div", { className: "min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "font-medium text-sm text-text-primary truncate", children: e.name }),
              /* @__PURE__ */ t("div", { className: "text-xs text-neutral font-mono truncate", children: e.id })
            ] })
          ] }),
          e.description && /* @__PURE__ */ t("p", { className: "text-xs text-text-secondary mb-3 line-clamp-2", children: e.description }),
          /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-2 text-xs text-neutral", children: [
            /* @__PURE__ */ t("span", { className: "font-mono uppercase text-[10px] px-1.5 py-0.5 bg-surface-hover rounded shrink-0", children: e.protocol }),
            /* @__PURE__ */ t("span", { className: "truncate", children: e.model }),
            s && /* @__PURE__ */ n(oe, { children: [
              /* @__PURE__ */ t("span", { className: "text-text-disabled", children: "|" }),
              /* @__PURE__ */ n("span", { className: "shrink-0", children: [
                s.invocationsLast24h,
                " inv/24h"
              ] }),
              /* @__PURE__ */ n("span", { className: "shrink-0", children: [
                s.avgLatencyMs,
                "ms avg"
              ] })
            ] }),
            !s && e.avgLatencyMs != null && /* @__PURE__ */ n(oe, { children: [
              /* @__PURE__ */ t("span", { className: "text-text-disabled", children: "|" }),
              /* @__PURE__ */ n("span", { className: "shrink-0", children: [
                e.invocationsLast24h ?? 0,
                " inv/24h"
              ] }),
              /* @__PURE__ */ n("span", { className: "shrink-0", children: [
                e.avgLatencyMs,
                "ms avg"
              ] })
            ] })
          ] }),
          e.tools.length > 0 && /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1 mt-2", children: [
            e.tools.slice(0, 4).map((i) => /* @__PURE__ */ t(
              "span",
              {
                className: "text-[10px] px-1.5 py-0.5 bg-surface-hover text-text-secondary rounded font-mono",
                children: i
              },
              i
            )),
            e.tools.length > 4 && /* @__PURE__ */ n("span", { className: "text-[10px] px-1.5 py-0.5 text-text-tertiary", children: [
              "+",
              e.tools.length - 4
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ge({ guardrails: e, className: s, compact: r }) {
  return e.length === 0 ? /* @__PURE__ */ t("span", { className: x("text-[10px] text-text-tertiary italic", s), children: "No guardrails" }) : r ? /* @__PURE__ */ n("span", { className: x("inline-flex items-center gap-1 text-[10px]", s), children: [
    /* @__PURE__ */ t("span", { className: "text-warning-fg", children: "🛡️" }),
    /* @__PURE__ */ t("span", { className: "text-text-secondary", children: e.length })
  ] }) : /* @__PURE__ */ t("div", { className: x("flex flex-wrap gap-1", s), children: e.map((a) => /* @__PURE__ */ n(
    "span",
    {
      className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-warning-bg border border-warning-border text-warning-fg rounded font-mono",
      children: [
        "🛡️ ",
        a
      ]
    },
    a
  )) });
}
function at({ onAgentClick: e, className: s }) {
  const { agents: r, metrics: a } = Y(), i = r.filter((l) => l.status === "healthy").length, u = r.filter((l) => l.status === "degraded").length, o = r.filter((l) => l.status === "offline").length, c = r.reduce((l, p) => l + (p.invocationsLast24h ?? 0), 0), h = r.filter((l) => l.avgLatencyMs).length > 0 ? Math.round(r.reduce((l, p) => l + (p.avgLatencyMs ?? 0), 0) / r.filter((l) => l.avgLatencyMs).length) : 0, N = [...new Set(r.flatMap((l) => l.guardrails))];
  return /* @__PURE__ */ n("div", { className: x("space-y-6", s), children: [
    /* @__PURE__ */ n("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ t(B, { label: "Total Agents", value: r.length }),
      /* @__PURE__ */ t(B, { label: "Healthy", value: i, color: "emerald" }),
      /* @__PURE__ */ t(B, { label: "Degraded", value: u, color: "amber" }),
      /* @__PURE__ */ t(B, { label: "Offline", value: o, color: "red" }),
      /* @__PURE__ */ t(B, { label: "Invocations (24h)", value: c })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ n("div", { className: "text-xs text-neutral", children: [
        "Avg latency: ",
        /* @__PURE__ */ n("span", { className: "font-medium text-slate-700", children: [
          h,
          "ms"
        ] }),
        " · ",
        "Metrics tracked: ",
        /* @__PURE__ */ n("span", { className: "font-medium text-slate-700", children: [
          a.length,
          " agents"
        ] })
      ] }),
      /* @__PURE__ */ t(ge, { guardrails: N })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: r.map((l) => /* @__PURE__ */ t(
      me,
      {
        agent: l,
        metrics: a.find((p) => p.agentId === l.id),
        onClick: () => e?.(l.id)
      },
      l.id
    )) })
  ] });
}
function B({ label: e, value: s, color: r }) {
  return /* @__PURE__ */ n("div", { className: "border border-border rounded-lg p-3 bg-white", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] uppercase text-text-tertiary mb-1", children: e }),
    /* @__PURE__ */ t("div", { className: x("text-xl font-semibold", r === "emerald" ? "text-success-fg" : r === "amber" ? "text-warning-fg" : r === "red" ? "text-danger-fg" : "text-slate-800"), children: s })
  ] });
}
const X = {
  agent: "bg-info",
  tool: "bg-accent",
  llm: "bg-warning",
  retrieval: "bg-success",
  guardrail: "bg-danger",
  internal: "bg-slate-400"
}, le = {
  agent: "Agent",
  tool: "Tool",
  llm: "LLM",
  retrieval: "Retrieval",
  guardrail: "Guardrail",
  internal: "Internal"
};
function Me({ span: e, depth: s, totalMs: r, startOffset: a, onSelect: i, selected: u }) {
  const o = r > 0 ? a / r * 100 : 0, c = r > 0 ? Math.max(e.durationMs / r * 100, 0.5) : 0;
  return /* @__PURE__ */ n(
    "div",
    {
      className: x(
        "flex items-center h-7 hover:bg-surface-panel cursor-pointer transition-colors border-b border-slate-100",
        u && "bg-info-bg"
      ),
      onClick: () => i(e),
      children: [
        /* @__PURE__ */ n("div", { className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden", children: [
          /* @__PURE__ */ t("span", { style: { marginLeft: s * 12 }, className: "shrink-0" }),
          /* @__PURE__ */ t("span", { className: x("w-2 h-2 rounded-sm shrink-0", X[e.kind]) }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-700 truncate", children: e.name })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex-1 relative h-full flex items-center", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: x("absolute h-4 rounded-sm opacity-80", X[e.kind]),
              style: { left: `${o}%`, width: `${c}%`, minWidth: 2 }
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              className: "absolute text-[10px] text-neutral",
              style: { left: `${o + c + 0.5}%` },
              children: [
                e.durationMs,
                "ms"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Oe(e, s) {
  const r = [], a = /* @__PURE__ */ new Map();
  for (const o of e) {
    const c = o.parentSpanId ?? "__root__";
    a.has(c) || a.set(c, []), a.get(c).push(o);
  }
  function i(o, c) {
    const h = o ?? "__root__", N = a.get(h) ?? a.get(o) ?? [];
    for (const l of N)
      r.push({ span: l, depth: c }), i(l.spanId, c + 1);
  }
  const u = e.find((o) => o.spanId === s);
  return u ? (r.push({ span: u, depth: 0 }), i(u.spanId, 1)) : i(void 0, 0), r;
}
function De({ trace: e, className: s }) {
  const [r, a] = S(null), i = Oe(e.spans, e.rootSpanId), u = new Date(e.startedAt).getTime();
  return /* @__PURE__ */ n("div", { className: x("border border-border rounded-lg overflow-hidden bg-white", s), children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ n("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Trace" }),
        /* @__PURE__ */ t("span", { className: "text-[10px] font-mono text-text-tertiary", children: e.traceId })
      ] }),
      /* @__PURE__ */ n("span", { className: "text-xs text-neutral", children: [
        e.totalDurationMs,
        "ms total"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex items-center gap-3 px-3 py-1.5 border-b border-slate-100", children: Object.keys(X).map((o) => /* @__PURE__ */ n("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ t("span", { className: x("w-2 h-2 rounded-sm", X[o]) }),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-neutral", children: le[o] })
    ] }, o)) }),
    /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto", children: i.map(({ span: o, depth: c }) => {
      const h = new Date(o.startTime).getTime() - u;
      return /* @__PURE__ */ t(
        Me,
        {
          span: o,
          depth: c,
          totalMs: e.totalDurationMs,
          startOffset: h,
          onSelect: a,
          selected: r?.spanId === o.spanId
        },
        o.spanId
      );
    }) }),
    r && /* @__PURE__ */ n("div", { className: "border-t border-border p-3 bg-surface-panel", children: [
      /* @__PURE__ */ n("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: r.name }),
        /* @__PURE__ */ t(
          "button",
          {
            className: "text-[10px] text-text-tertiary hover:text-text-secondary",
            onClick: () => a(null),
            children: "Close"
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]", children: [
        /* @__PURE__ */ t("div", { className: "text-neutral", children: "Kind" }),
        /* @__PURE__ */ t("div", { className: "text-slate-700 font-medium", children: le[r.kind] }),
        /* @__PURE__ */ t("div", { className: "text-neutral", children: "Duration" }),
        /* @__PURE__ */ n("div", { className: "text-slate-700", children: [
          r.durationMs,
          "ms"
        ] }),
        /* @__PURE__ */ t("div", { className: "text-neutral", children: "Status" }),
        /* @__PURE__ */ t("div", { className: x(
          "font-medium",
          r.status === "ok" && "text-success-fg",
          r.status === "error" && "text-danger-fg"
        ), children: r.status }),
        /* @__PURE__ */ t("div", { className: "text-neutral", children: "Span ID" }),
        /* @__PURE__ */ t("div", { className: "text-slate-700 font-mono", children: r.spanId })
      ] }),
      Object.keys(r.attributes).length > 0 && /* @__PURE__ */ n("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "text-[10px] text-text-tertiary uppercase mb-1", children: "Attributes" }),
        /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-text-secondary space-y-0.5", children: Object.entries(r.attributes).map(([o, c]) => /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: [
            o,
            ":"
          ] }),
          " ",
          String(c)
        ] }, o)) })
      ] })
    ] })
  ] });
}
function ot({ agentId: e, trace: s, onBack: r, className: a }) {
  const { getAgent: i, getMetrics: u } = Y(), o = i(e), c = u(e);
  return o ? /* @__PURE__ */ n("div", { className: x("space-y-6", a), children: [
    /* @__PURE__ */ n("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ n("div", { children: [
        r && /* @__PURE__ */ t("button", { className: "text-xs text-info-fg hover:underline mb-2 block", onClick: r, children: "← Back" }),
        /* @__PURE__ */ n("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", children: "🤖" }),
          /* @__PURE__ */ n("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-text-primary", children: o.name }),
            /* @__PURE__ */ t("div", { className: "text-xs text-neutral font-mono", children: o.id })
          ] })
        ] }),
        o.description && /* @__PURE__ */ t("p", { className: "text-sm text-text-secondary mt-2", children: o.description })
      ] }),
      /* @__PURE__ */ t(Re, { status: o.status })
    ] }),
    /* @__PURE__ */ n("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ n(z, { title: "Configuration", children: [
        /* @__PURE__ */ t(O, { label: "Protocol", value: o.protocol.toUpperCase() }),
        /* @__PURE__ */ t(O, { label: "Model", value: o.model }),
        /* @__PURE__ */ t(O, { label: "Endpoint", value: o.endpoint, mono: !0 })
      ] }),
      /* @__PURE__ */ t(z, { title: "Tools", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: o.tools.map((h) => /* @__PURE__ */ t("span", { className: "text-[11px] px-2 py-0.5 bg-surface-hover rounded font-mono text-slate-700", children: h }, h)) }) }),
      /* @__PURE__ */ t(z, { title: "Guardrails", children: /* @__PURE__ */ t(ge, { guardrails: o.guardrails }) }),
      c && /* @__PURE__ */ n(z, { title: "Metrics (24h)", children: [
        /* @__PURE__ */ t(O, { label: "Invocations", value: String(c.invocationsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Errors", value: String(c.errorsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Avg Latency", value: `${c.avgLatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "P99 Latency", value: `${c.p99LatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "Tokens In", value: c.tokensInLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Tokens Out", value: c.tokensOutLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Guardrail Blocks", value: String(c.guardrailBlocksLast24h) })
      ] })
    ] }),
    s && /* @__PURE__ */ n("div", { children: [
      /* @__PURE__ */ t("h3", { className: "text-sm font-medium text-slate-700 mb-2", children: "Recent Trace" }),
      /* @__PURE__ */ t(De, { trace: s })
    ] })
  ] }) : /* @__PURE__ */ n("div", { className: x("text-center py-12", a), children: [
    /* @__PURE__ */ n("div", { className: "text-text-tertiary text-sm", children: [
      "Agent not found: ",
      e
    ] }),
    r && /* @__PURE__ */ t("button", { className: "mt-2 text-xs text-info-fg hover:underline", onClick: r, children: "Back to dashboard" })
  ] });
}
function Re({ status: e }) {
  return /* @__PURE__ */ t("span", { className: x("text-xs font-medium px-2.5 py-1 rounded-full", {
    healthy: "bg-success-bg text-success-fg",
    degraded: "bg-warning-bg text-warning-fg",
    offline: "bg-danger-bg text-danger-fg",
    deploying: "bg-info-bg text-info-fg"
  }[e] ?? "bg-surface-hover text-slate-700"), children: e });
}
function z({ title: e, children: s }) {
  return /* @__PURE__ */ n("div", { className: "border border-border rounded-lg p-4 bg-white", children: [
    /* @__PURE__ */ t("h4", { className: "text-xs font-medium text-neutral uppercase mb-3", children: e }),
    s
  ] });
}
function O({ label: e, value: s, mono: r }) {
  return /* @__PURE__ */ n("div", { className: "flex items-baseline justify-between py-1 text-[12px]", children: [
    /* @__PURE__ */ t("span", { className: "text-neutral", children: e }),
    /* @__PURE__ */ t("span", { className: x("text-slate-800", r && "font-mono text-[11px] break-all text-right max-w-[60%]"), children: s })
  ] });
}
function qe(e, s) {
  const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const p of e)
    r.set(p.id, 0), a.set(p.id, 0);
  for (const p of s)
    r.set(p.from, (r.get(p.from) ?? 0) + 1), a.set(p.to, (a.get(p.to) ?? 0) + 1);
  const i = e.filter((p) => (a.get(p.id) ?? 0) === 0), u = e.filter((p) => (a.get(p.id) ?? 0) > 0 && (r.get(p.id) ?? 0) > 0), o = e.filter((p) => (r.get(p.id) ?? 0) === 0 && (a.get(p.id) ?? 0) > 0), c = [i, u, o].filter((p) => p.length > 0), h = [], N = 300, l = 120;
  for (let p = 0; p < c.length; p++) {
    const b = c[p], v = -((b.length - 1) * l) / 2;
    for (let k = 0; k < b.length; k++) {
      const A = b[k];
      h.push({
        id: A.id,
        position: { x: p * N, y: v + k * l },
        data: { label: A.name },
        type: "default",
        style: {
          background: A.status === "offline" ? "#fef2f2" : A.status === "degraded" ? "#fffbeb" : "#f0fdf4",
          border: `2px solid ${A.status === "offline" ? "#fecaca" : A.status === "degraded" ? "#fed7aa" : "#86efac"}`,
          borderRadius: 8,
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 500,
          width: 180
        }
      });
    }
  }
  return h;
}
function Pe(e, s) {
  const r = new Set(s.map((a) => a.id));
  return e.filter((a) => r.has(a.from) && r.has(a.to)).map((a, i) => {
    const o = s.find((c) => c.id === a.from)?.protocol === "a2a";
    return {
      id: `edge-${i}`,
      source: a.from,
      target: a.to,
      animated: o,
      style: { stroke: o ? "#3b82f6" : "#94a3b8", strokeWidth: o ? 2 : 1.5 },
      label: o ? "A2A" : void 0,
      labelStyle: { fontSize: 10, fill: "#64748b", fontWeight: 500 },
      markerEnd: { type: Le.ArrowClosed, width: 16, height: 16, color: o ? "#3b82f6" : "#94a3b8" }
    };
  });
}
function $e({
  agents: e,
  edges: s = [],
  onAgentClick: r,
  className: a
}) {
  const i = U(() => qe(e, s), [e, s]), u = U(() => Pe(s, e), [s, e]), o = (c, h) => {
    r?.(h.id);
  };
  return /* @__PURE__ */ t("div", { className: x("w-full h-[500px]", a), children: /* @__PURE__ */ n(
    Ae,
    {
      nodes: i,
      edges: u,
      onNodeClick: o,
      fitView: !0,
      fitViewOptions: { padding: 0.3 },
      proOptions: { hideAttribution: !0 },
      children: [
        /* @__PURE__ */ t(Te, { gap: 20, size: 1, color: "#e2e8f0" }),
        /* @__PURE__ */ t(Ie, { showInteractive: !1 })
      ]
    }
  ) });
}
const Ge = [
  { from: "orgiq-supervisor", to: "orgiq-search" },
  { from: "orgiq-supervisor", to: "orgiq-advisor" },
  { from: "orgiq-advisor", to: "orgiq-search" },
  { from: "orgiq-advisor", to: "orgiq-scoring" },
  { from: "orgiq-ingestion", to: "orgiq-graph-builder" },
  { from: "orgiq-graph-builder", to: "orgiq-scoring" }
];
function it({ edges: e = Ge, onAgentClick: s, className: r }) {
  const { agents: a } = Y(), i = a.filter((o) => o.protocol === "a2a"), u = a.filter((o) => o.protocol === "direct");
  return /* @__PURE__ */ n("div", { className: x("space-y-4", r), children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-text-primary", children: "Agent Flow (A2A)" }),
        /* @__PURE__ */ n("p", { className: "text-xs text-neutral", children: [
          i.length,
          " A2A agents · ",
          u.length,
          " direct agents ·",
          " ",
          e.length,
          " connections"
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "flex items-center gap-3 text-[10px] text-neutral", children: [
        /* @__PURE__ */ n("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-info inline-block" }),
          " A2A (animated)"
        ] }),
        /* @__PURE__ */ n("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-slate-400 inline-block" }),
          " Direct"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "border border-border rounded-lg overflow-hidden", children: /* @__PURE__ */ t(
      $e,
      {
        agents: a,
        edges: e,
        onAgentClick: s
      }
    ) })
  ] });
}
function ne(e, s) {
  let r = e;
  for (const a of s) {
    if (r == null || typeof r != "object") return;
    r = r[a];
  }
  return r;
}
function K(e, s, r) {
  if (s.length === 0) return r;
  const a = Array.isArray(e) ? [...e] : { ...e }, i = s[0];
  return s.length === 1 ? a[i] = r : a[i] = K(a[i], s.slice(1), r), a;
}
function ie(e, s) {
  if (s.length === 0) return;
  const r = Array.isArray(e) ? [...e] : { ...e };
  return s.length === 1 ? delete r[s[0]] : r[s[0]] = ie(r[s[0]], s.slice(1)), r;
}
function se(e) {
  return !e || e === "/" ? [] : e.replace(/^\//, "").split("/").map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}
function Ue(e, s) {
  let r = e;
  for (const a of s)
    try {
      const i = se(a.path);
      switch (a.op) {
        case "add":
        case "replace":
          r = K(r, i, a.value);
          break;
        case "remove":
          r = ie(r, i);
          break;
        case "copy": {
          const u = se(a.from ?? "");
          r = K(r, i, ne(r, u));
          break;
        }
        case "move": {
          const u = se(a.from ?? ""), o = ne(r, u);
          r = ie(r, u), r = K(r, i, o);
          break;
        }
        case "test": {
          const u = ne(r, i);
          JSON.stringify(u) !== JSON.stringify(a.value) && console.warn("[useAgUiStream] JSON Patch test op failed at", a.path);
          break;
        }
        default:
          console.warn("[useAgUiStream] Unsupported JSON Patch op:", a.op);
      }
    } catch (i) {
      console.warn("[useAgUiStream] JSON Patch op error:", a, i);
    }
  return r;
}
function ae() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function je({
  url: e,
  threadId: s,
  headers: r,
  extraBody: a,
  onEvent: i
}) {
  const [u, o] = S([]), [c, h] = S(""), [N, l] = S([]), [p, b] = S(void 0), [g, v] = S(s ?? null), [k, A] = S(null), [E, f] = S(!1), [_, j] = S(null), J = G(null), L = G(null), R = G(""), C = G([]), M = I(
    (m) => {
      o((d) => {
        const w = d.findIndex((T) => T.id === L.current);
        if (w === -1) return d;
        const y = [...d];
        return y[w] = m(y[w]), y;
      });
    },
    []
  ), H = I(
    (m, d) => {
      C.current = C.current.map(
        (w) => w.id === m ? d(w) : w
      ), l(
        (w) => w.map((y) => y.id === m ? d(y) : y)
      ), o(
        (w) => w.map((y) => ({
          ...y,
          toolCalls: y.toolCalls.map(
            (T) => T.id === m ? d(T) : T
          )
        }))
      );
    },
    []
  ), Z = I(
    (m) => {
      switch (i?.(m), m.type) {
        // ─── Lifecycle ───────────────────────────────────────────────────────
        case "RUN_STARTED": {
          v(m.threadId), A(m.runId);
          break;
        }
        case "RUN_FINISHED": {
          f(!1), L.current && (M((d) => ({ ...d, isStreaming: !1 })), L.current = null), h("");
          break;
        }
        case "RUN_ERROR": {
          j(m.message), f(!1), L.current && (M((d) => ({ ...d, isStreaming: !1 })), L.current = null), h("");
          break;
        }
        case "STEP_STARTED":
        case "STEP_FINISHED":
          break;
        // ─── Text Messages ───────────────────────────────────────────────────
        case "TEXT_MESSAGE_START": {
          const d = m.messageId ?? ae();
          L.current = d, R.current = "", C.current = [];
          const w = m.role;
          o((y) => [
            ...y,
            { id: d, role: w, content: "", isStreaming: !0, toolCalls: [] }
          ]);
          break;
        }
        case "TEXT_MESSAGE_CONTENT": {
          R.current += m.delta;
          const d = R.current;
          h(d), M((w) => ({ ...w, content: d }));
          break;
        }
        case "TEXT_MESSAGE_END": {
          M((d) => ({ ...d, isStreaming: !1 })), h(""), L.current = null;
          break;
        }
        case "TEXT_MESSAGE_CHUNK": {
          const d = m.messageId ?? L.current ?? ae();
          if (L.current !== d) {
            L.current = d, R.current = "", C.current = [];
            const w = m.role ?? "assistant";
            o((y) => [
              ...y,
              { id: d, role: w, content: "", isStreaming: !0, toolCalls: [] }
            ]);
          }
          if (m.delta) {
            R.current += m.delta;
            const w = R.current;
            h(w), M((y) => ({ ...y, content: w }));
          }
          break;
        }
        // ─── Tool Calls ──────────────────────────────────────────────────────
        case "TOOL_CALL_START": {
          const d = {
            id: m.toolCallId,
            name: m.toolCallName,
            args: "",
            status: "streaming",
            startedAt: Date.now(),
            parentMessageId: m.parentMessageId
          };
          C.current = [...C.current, d], l((w) => [...w, d]), L.current && o(
            (w) => w.map(
              (y) => y.id === L.current ? { ...y, toolCalls: [...y.toolCalls, d] } : y
            )
          );
          break;
        }
        case "TOOL_CALL_ARGS": {
          H(m.toolCallId, (d) => ({
            ...d,
            args: d.args + m.delta
          }));
          break;
        }
        case "TOOL_CALL_END": {
          H(m.toolCallId, (d) => ({
            ...d,
            status: "completed",
            endedAt: Date.now()
          })), l((d) => d.filter((w) => w.id !== m.toolCallId));
          break;
        }
        case "TOOL_CALL_RESULT": {
          H(m.toolCallId, (d) => ({ ...d, result: m.content }));
          break;
        }
        case "TOOL_CALL_CHUNK": {
          const d = m.toolCallId;
          if (!d) break;
          const w = C.current.find((y) => y.id === d);
          if (!w && m.toolCallName) {
            const y = {
              id: d,
              name: m.toolCallName,
              args: m.delta ?? "",
              status: "streaming",
              startedAt: Date.now(),
              parentMessageId: m.parentMessageId
            };
            C.current = [...C.current, y], l((T) => [...T, y]), L.current && o(
              (T) => T.map(
                (P) => P.id === L.current ? { ...P, toolCalls: [...P.toolCalls, y] } : P
              )
            );
          } else w && m.delta && H(d, (y) => ({ ...y, args: y.args + (m.delta ?? "") }));
          break;
        }
        // ─── State Management ────────────────────────────────────────────────
        case "STATE_SNAPSHOT": {
          b(m.snapshot);
          break;
        }
        case "STATE_DELTA": {
          b((d) => Ue(d, m.delta));
          break;
        }
        case "MESSAGES_SNAPSHOT": {
          o(m.messages);
          break;
        }
        // ─── Activity ────────────────────────────────────────────────────────
        case "ACTIVITY_SNAPSHOT":
        case "ACTIVITY_DELTA":
          break;
        // ─── Reasoning ───────────────────────────────────────────────────────
        case "REASONING_MESSAGE_START": {
          M((d) => ({ ...d, reasoning: "" }));
          break;
        }
        case "REASONING_MESSAGE_CONTENT": {
          M((d) => ({
            ...d,
            reasoning: (d.reasoning ?? "") + m.delta
          }));
          break;
        }
        case "REASONING_MESSAGE_END":
          break;
        case "REASONING_START":
        case "REASONING_END":
        case "REASONING_MESSAGE_CHUNK":
        case "REASONING_ENCRYPTED_VALUE":
          break;
        // ─── Special / Draft ─────────────────────────────────────────────────
        case "RAW":
        case "CUSTOM":
        case "META_EVENT":
          break;
        default:
          console.warn("[useAgUiStream] Unhandled event type:", m.type);
      }
    },
    [i, M, H]
  ), Q = I((m) => {
    const d = [], w = m.split(`
`);
    let y = "";
    for (const T of w) {
      if (T === "" || T.startsWith(":")) {
        if (T === "" && y) {
          try {
            d.push(JSON.parse(y));
          } catch {
          }
          y = "";
        }
        continue;
      }
      T.startsWith("data: ") && (y += T.slice(6));
    }
    return d;
  }, []), ee = I(() => {
    J.current?.abort(), f(!1), h(""), L.current && (M((m) => ({ ...m, isStreaming: !1 })), L.current = null), l([]);
  }, [M]), he = I(
    async (m, d) => {
      J.current?.abort();
      const w = new AbortController();
      J.current = w, j(null), f(!0);
      const y = {
        id: ae(),
        role: "user",
        content: m,
        isStreaming: !1,
        toolCalls: []
      };
      o((T) => [...T, y]);
      try {
        const T = await fetch(e, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            ...r
          },
          body: JSON.stringify({
            message: m,
            threadId: g ?? void 0,
            ...a,
            ...d?.extraBody
          }),
          signal: w.signal
        });
        if (!T.ok)
          throw new Error(`HTTP ${T.status}: ${T.statusText}`);
        const P = T.body?.getReader();
        if (!P) throw new Error("No response body");
        const Ne = new TextDecoder();
        let $ = "";
        for (; ; ) {
          const { done: te, value: ve } = await P.read();
          if (te) break;
          $ += Ne.decode(ve, { stream: !0 });
          const re = $.lastIndexOf(`

`);
          if (re !== -1) {
            const ye = $.slice(0, re + 2);
            $ = $.slice(re + 2);
            for (const we of Q(ye))
              Z(we);
          }
        }
        if ($.trim())
          for (const te of Q($ + `

`))
            Z(te);
      } catch (T) {
        if (T instanceof Error && T.name === "AbortError") return;
        j(T instanceof Error ? T.message : "Stream failed"), f(!1), h("");
      }
    },
    [e, g, r, a, Q, Z]
  ), xe = I(
    (m, d) => {
      ee(), v(m), A(null), o(d), h(""), l([]), j(null), R.current = "", C.current = [], L.current = null;
    },
    [ee]
  ), be = I(() => {
    J.current?.abort(), o([]), f(!1), h(""), l([]), b(void 0), v(null), A(null), j(null), R.current = "", C.current = [], L.current = null;
  }, []);
  return {
    messages: u,
    streamingText: c,
    activeToolCalls: N,
    state: p,
    threadId: g,
    runId: k,
    isStreaming: E,
    error: _,
    sendMessage: he,
    cancelStream: ee,
    reset: be,
    loadHistory: xe
  };
}
const He = {
  streaming: "⏳",
  completed: "✓",
  error: "✗"
};
function ce({ toolCall: e, className: s }) {
  const [r, a] = S(!1), i = e.endedAt != null ? e.endedAt - e.startedAt : null;
  return /* @__PURE__ */ n(
    "div",
    {
      className: x(
        "border rounded text-xs font-mono overflow-hidden",
        e.status === "streaming" && "border-info-border bg-info-bg/50",
        e.status === "completed" && "border-border bg-surface-panel",
        e.status === "error" && "border-danger-border bg-danger-bg/50",
        s
      ),
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            className: "flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-surface-hover/50 transition-colors",
            onClick: () => a(!r),
            children: [
              /* @__PURE__ */ t("span", { className: x(
                e.status === "streaming" && "animate-pulse",
                e.status === "completed" && "text-success-fg",
                e.status === "error" && "text-danger-fg"
              ), children: He[e.status] }),
              /* @__PURE__ */ t("span", { className: "text-slate-700 font-medium", children: e.name }),
              i != null && /* @__PURE__ */ n("span", { className: "text-text-tertiary ml-auto", children: [
                i,
                "ms"
              ] }),
              /* @__PURE__ */ t("span", { className: "text-text-tertiary ml-1", children: r ? "▾" : "▸" })
            ]
          }
        ),
        r && /* @__PURE__ */ n("div", { className: "px-2 pb-2 space-y-1 border-t border-slate-100", children: [
          e.args && /* @__PURE__ */ n("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[10px] text-text-tertiary uppercase mt-1", children: "args" }),
            /* @__PURE__ */ t("pre", { className: "text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto", children: fe(e.args) })
          ] }),
          e.result != null && /* @__PURE__ */ n("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[10px] text-text-tertiary uppercase mt-1", children: "result" }),
            /* @__PURE__ */ t("pre", { className: "text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto", children: Be(e.result) })
          ] })
        ] })
      ]
    }
  );
}
function fe(e) {
  try {
    return JSON.stringify(JSON.parse(e), null, 2);
  } catch {
    return e;
  }
}
function Be(e) {
  if (typeof e == "string") return fe(e);
  try {
    return JSON.stringify(e, null, 2);
  } catch {
    return String(e);
  }
}
function Fe({
  reasoning: e,
  isStreaming: s = !1,
  defaultOpen: r = !1,
  className: a
}) {
  const [i, u] = S(r);
  if (!e || !e.trim())
    return null;
  const o = e.split(/\s+/).filter(Boolean).length;
  return /* @__PURE__ */ n(
    "div",
    {
      className: x(
        "border border-dashed border-border-emphasis py-2 px-2.5 rounded max-w-full mb-1.5",
        a
      ),
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => u((c) => !c),
            className: "flex items-center w-full bg-transparent border-none p-0 cursor-pointer gap-1.5 text-left",
            children: [
              /* @__PURE__ */ t("span", { className: "text-[10px] text-text-secondary select-none leading-none w-3 inline-block shrink-0", children: i ? "▾" : "▸" }),
              /* @__PURE__ */ t("span", { className: "text-[12px] font-medium text-text-primary flex-1 select-none", children: s ? "Thinking…" : "Reasoning" }),
              /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary bg-surface border border-border rounded-[10px] py-px px-[7px] select-none shrink-0", children: [
                o,
                " tok"
              ] })
            ]
          }
        ),
        i && /* @__PURE__ */ t("div", { className: "max-h-[240px] overflow-y-auto pt-2", children: /* @__PURE__ */ n("pre", { className: "m-0 font-[inherit] text-[12px] text-text-secondary whitespace-pre-wrap break-words leading-[1.6]", children: [
          e,
          s && /* @__PURE__ */ t("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-text-secondary ml-1 align-middle [animation:agui-reasoning-pulse_1.4s_ease-in-out_infinite]" })
        ] }) })
      ]
    }
  );
}
const de = "w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white text-[11px] font-bold shrink-0";
function Je({
  messages: e,
  isStreaming: s,
  streamingText: r = "",
  activeToolCalls: a = [],
  error: i,
  onSend: u,
  onCancel: o,
  placeholder: c = "Send a message to the agent...",
  className: h
}) {
  const [N, l] = S(""), p = G(null);
  F(() => {
    p.current && (p.current.scrollTop = p.current.scrollHeight);
  }, [e, a, r]);
  function b() {
    const g = N.trim();
    !g || s || (u(g), l(""));
  }
  return /* @__PURE__ */ n("div", { className: x("flex flex-col border border-border rounded-lg bg-white overflow-hidden", h), children: [
    /* @__PURE__ */ n("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
      /* @__PURE__ */ t("span", { className: "font-semibold text-sm text-slate-800", children: "Agent Chat" }),
      s && /* @__PURE__ */ n("span", { className: "flex items-center gap-1.5 text-xs text-info-fg", children: [
        /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-info animate-pulse" }),
        "Streaming"
      ] })
    ] }),
    /* @__PURE__ */ n("div", { ref: p, className: "flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4", children: [
      e.length === 0 && !s && /* @__PURE__ */ t("div", { className: "text-sm text-text-tertiary text-center mt-[60px]", children: "Messages will appear here as you interact with the agent..." }),
      e.map((g) => /* @__PURE__ */ n("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: x(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0",
              g.role === "user" ? "bg-[#6366f1]" : "bg-[#10b981]"
            ),
            children: g.role === "user" ? "U" : "AI"
          }
        ),
        /* @__PURE__ */ n("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ t("span", { className: "font-semibold text-[13px] text-[#1a1a2e]", children: g.role === "user" ? "You" : "Agent" }) }),
          g.role === "assistant" && g.reasoning && /* @__PURE__ */ t(
            Fe,
            {
              reasoning: g.reasoning,
              isStreaming: g.isStreaming && s,
              defaultOpen: !1
            }
          ),
          /* @__PURE__ */ n(
            "div",
            {
              className: x(
                "mt-1 py-2 px-3 text-[14px] text-[#334155] leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] whitespace-pre-wrap break-words",
                g.role === "user" ? "bg-[#eef2ff] rounded-[12px_4px_12px_12px]" : "bg-[#f1f5f9] rounded-[4px_12px_12px_12px]"
              ),
              children: [
                g.content,
                g.isStreaming && /* @__PURE__ */ t("span", { className: "inline-block animate-pulse ml-0.5 text-info-fg", children: "▊" })
              ]
            }
          ),
          g.toolCalls.length > 0 && /* @__PURE__ */ t("div", { className: "mt-1.5 flex flex-col gap-1", children: g.toolCalls.map((v) => /* @__PURE__ */ t(ce, { toolCall: v }, v.id)) })
        ] })
      ] }, g.id)),
      a.length > 0 && /* @__PURE__ */ n("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col gap-1", children: a.map((g) => /* @__PURE__ */ t(ce, { toolCall: g }, g.id)) })
      ] }),
      r && !e.some((g) => g.isStreaming) && /* @__PURE__ */ n("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ n("div", { className: "flex-1 mt-1 py-2 px-3 bg-[#f1f5f9] rounded-[4px_12px_12px_12px] text-[14px] text-[#334155] leading-[1.5] whitespace-pre-wrap break-words", children: [
          r,
          /* @__PURE__ */ t("span", { className: "inline-block animate-pulse ml-0.5 text-info-fg", children: "▊" })
        ] })
      ] }),
      s && a.length === 0 && !r && e.length > 0 && !e[e.length - 1]?.isStreaming && /* @__PURE__ */ n("div", { className: "flex items-center gap-2 py-1", children: [
        /* @__PURE__ */ n("div", { className: "flex gap-[3px] py-1.5 px-3 bg-[#f1f5f9] rounded-xl", children: [
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" }),
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" }),
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" })
        ] }),
        /* @__PURE__ */ t("span", { className: "text-[12px] text-[#64748b]", children: "Agent is thinking..." })
      ] })
    ] }),
    i && /* @__PURE__ */ t("div", { className: "px-4 py-2 bg-danger-bg border-t border-danger-border text-xs text-danger-fg", children: i }),
    /* @__PURE__ */ n("div", { className: "flex items-center gap-2 p-3 border-t border-border bg-surface-panel/50", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: N,
          onChange: (g) => l(g.target.value),
          onKeyDown: (g) => g.key === "Enter" && b(),
          disabled: s,
          placeholder: s ? "Waiting for response..." : c,
          className: x(
            "flex-1 text-sm px-3 py-2.5 border border-border rounded-lg outline-none focus:border-info focus:ring-1 focus:ring-info transition-all bg-white",
            s && "bg-surface-panel text-text-tertiary"
          )
        }
      ),
      s && o ? /* @__PURE__ */ t(
        "button",
        {
          onClick: o,
          className: "text-sm px-4 py-2.5 bg-danger text-white rounded-lg hover:bg-danger transition-colors font-medium",
          children: "Stop"
        }
      ) : /* @__PURE__ */ t(
        "button",
        {
          onClick: b,
          disabled: !N.trim() || s,
          className: x(
            "text-sm px-4 py-2.5 rounded-lg transition-colors font-medium",
            !N.trim() || s ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-info text-white hover:bg-info cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
function lt({ defaultAgentId: e, baseUrl: s = "/api/agents", className: r }) {
  const { agents: a } = Y(), [i, u] = S(e ?? a[0]?.id ?? ""), [o, c] = S([]), h = `${s}/${i}/invoke`, { messages: N, isStreaming: l, streamingText: p, activeToolCalls: b, error: g, sendMessage: v, cancelStream: k, reset: A } = je({
    url: h,
    onEvent: (f) => c((_) => [..._, f])
  }), E = a.find((f) => f.id === i);
  return /* @__PURE__ */ n("div", { className: x("flex h-full min-h-[500px]", r), children: [
    /* @__PURE__ */ n("div", { className: "w-[240px] border-r border-[#e2e8f0] bg-white flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t("div", { className: "py-3 px-4 border-b border-[#e2e8f0] font-semibold text-[13px] text-[#64748b] uppercase tracking-[0.05em]", children: "Agents" }),
      /* @__PURE__ */ t("div", { className: "flex-1 py-2 overflow-y-auto", children: a.map((f) => /* @__PURE__ */ n(
        "div",
        {
          onClick: () => {
            u(f.id), A(), c([]);
          },
          className: x(
            "py-2 px-4 flex items-center justify-between transition-all duration-150 ease-in-out border-l-[3px]",
            f.status === "offline" ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            i === f.id ? "bg-[#f1f5f9] border-l-[#6366f1]" : "bg-transparent border-l-transparent"
          ),
          children: [
            /* @__PURE__ */ n("div", { className: "min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[14px] text-[#1a1a2e] truncate", children: f.name }),
              /* @__PURE__ */ n("div", { className: "text-[11px] text-[#94a3b8]", children: [
                f.protocol.toUpperCase(),
                " · ",
                f.model
              ] })
            ] }),
            /* @__PURE__ */ t(
              "span",
              {
                className: x(
                  "w-2 h-2 rounded-full shrink-0",
                  f.status === "healthy" ? "bg-[#10b981]" : f.status === "degraded" ? "bg-[#f59e0b]" : "bg-[#ef4444]"
                )
              }
            )
          ]
        },
        f.id
      )) }),
      E && /* @__PURE__ */ n("div", { className: "py-3 px-4 border-t border-[#e2e8f0] text-[11px]", children: [
        /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1.5", children: "Tools:" }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: E.tools.map((f) => /* @__PURE__ */ t(
          "span",
          {
            className: "py-0.5 px-1.5 bg-[#f1f5f9] rounded text-[10px] text-[#475569] font-mono",
            children: f
          },
          f
        )) }),
        E.guardrails.length > 0 && /* @__PURE__ */ n("div", { className: "mt-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1", children: "Guardrails:" }),
          E.guardrails.map((f) => /* @__PURE__ */ n("div", { className: "text-[10px] text-[#d97706] font-mono", children: [
            "🛡️ ",
            f
          ] }, f))
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "py-2 px-4 border-t border-[#e2e8f0]", children: /* @__PURE__ */ t(
        "button",
        {
          onClick: () => {
            A(), c([]);
          },
          className: "w-full py-1.5 text-[12px] text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] rounded-md cursor-pointer",
          children: "Reset Session"
        }
      ) })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t(
        Je,
        {
          messages: N,
          isStreaming: l,
          streamingText: p,
          activeToolCalls: b,
          error: g,
          onSend: v,
          onCancel: k,
          className: "flex-1 border-0 rounded-none"
        }
      ),
      o.length > 0 && /* @__PURE__ */ n("details", { className: "border-t border-[#e2e8f0] bg-[#f8fafc]", children: [
        /* @__PURE__ */ n("summary", { className: "py-2 px-4 text-[12px] text-[#64748b] cursor-pointer font-medium", children: [
          "Event Log (",
          o.length,
          " events)"
        ] }),
        /* @__PURE__ */ t("div", { className: "max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]", children: o.map((f, _) => /* @__PURE__ */ n("div", { className: "flex gap-2 text-[#475569] py-px", children: [
          /* @__PURE__ */ t("span", { className: "text-[#94a3b8] w-5 text-right shrink-0", children: _ + 1 }),
          /* @__PURE__ */ t("span", { className: "text-[#1e293b] w-[150px] shrink-0 font-medium", children: f.type }),
          /* @__PURE__ */ t("span", { className: "text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap", children: f.type === "TEXT_MESSAGE_CONTENT" || f.type === "TOOL_CALL_ARGS" ? `"${f.delta.slice(0, 60)}"` : f.type === "TEXT_MESSAGE_CHUNK" && f.delta ? `"${f.delta.slice(0, 60)}"` : f.type === "TOOL_CALL_START" ? f.toolCallName : f.type === "RUN_ERROR" ? f.message : "" })
        ] }, _)) })
      ] })
    ] })
  ] });
}
function ct({
  baseUrl: e,
  pollIntervalMs: s = 3e4,
  enabled: r = !0
} = {}) {
  const [a, i] = S(V), [u, o] = S(!1), [c, h] = S(null), N = I(async () => {
    if (!e) {
      i(V);
      return;
    }
    o(!0), h(null);
    try {
      const v = await fetch(`${e}/agents`);
      if (!v.ok) throw new Error(`HTTP ${v.status}`);
      const k = await v.json();
      i(k);
    } catch (v) {
      h(v instanceof Error ? v.message : "Failed to fetch agents");
    } finally {
      o(!1);
    }
  }, [e]);
  F(() => {
    if (!r || (N(), !e || s <= 0)) return;
    const v = setInterval(N, s);
    return () => clearInterval(v);
  }, [r, N, e, s]);
  const l = I(
    (v) => a.find((k) => k.id === v),
    [a]
  ), p = a.filter((v) => v.status === "healthy").length, b = a.filter((v) => v.status === "degraded").length, g = a.filter((v) => v.status === "offline").length;
  return {
    agents: a,
    isLoading: u,
    error: c,
    refresh: N,
    getAgent: l,
    healthyCount: p,
    degradedCount: b,
    offlineCount: g
  };
}
function dt({
  baseUrl: e,
  agentId: s,
  pollIntervalMs: r = 6e4,
  enabled: a = !0
} = {}) {
  const [i, u] = S(W), [o, c] = S(!1), [h, N] = S(null), l = I(async () => {
    if (!e) {
      u(W);
      return;
    }
    c(!0), N(null);
    try {
      const k = s ? `${e}/agents/${s}/metrics` : `${e}/agents/metrics`, A = await fetch(k);
      if (!A.ok) throw new Error(`HTTP ${A.status}`);
      const E = await A.json();
      u(E);
    } catch (k) {
      N(k instanceof Error ? k.message : "Failed to fetch metrics");
    } finally {
      c(!1);
    }
  }, [e, s]);
  F(() => {
    if (!a || (l(), !e || r <= 0)) return;
    const k = setInterval(l, r);
    return () => clearInterval(k);
  }, [a, l, e, r]);
  const p = I(
    (k) => i.find((A) => A.agentId === k),
    [i]
  ), b = U(
    () => i.reduce((k, A) => k + A.invocationsLast24h, 0),
    [i]
  ), g = U(
    () => i.reduce((k, A) => k + A.errorsLast24h, 0),
    [i]
  ), v = U(() => i.length === 0 ? 0 : Math.round(i.reduce((k, A) => k + A.avgLatencyMs, 0) / i.length), [i]);
  return {
    metrics: i,
    isLoading: o,
    error: h,
    refresh: l,
    getMetricsForAgent: p,
    totalInvocations24h: b,
    totalErrors24h: g,
    avgLatencyMs: v
  };
}
function ue() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function ut({
  baseUrl: e,
  participants: s
} = {}) {
  const [r, a] = S(null), [i, u] = S([]), o = G(null), c = I((l) => {
    const p = `a2a-${ue()}`;
    o.current = p;
    const b = {
      sessionId: p,
      participants: l,
      messages: [],
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "active"
    };
    a(b), u([]);
  }, []), h = I(
    (l, p, b) => {
      if (!r) return;
      const g = {
        id: `msg-${ue()}`,
        from: l,
        to: p,
        content: b,
        protocol: "a2a",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      u((v) => [...v, g]), a(
        (v) => v && { ...v, messages: [...v.messages, g] }
      );
    },
    [r]
  ), N = I(() => {
    a((l) => l && { ...l, status: "completed" }), o.current = null;
  }, []);
  return s && !r && c(s), {
    session: r,
    messages: i,
    isActive: r?.status === "active",
    startSession: c,
    sendMessage: h,
    endSession: N
  };
}
const ze = ["healthy", "degraded", "offline", "deploying"];
function pt({
  agents: e,
  metricsById: s,
  filters: r = ze,
  selectedId: a = null,
  onSelect: i,
  emptyMessage: u = "No agents match your filter.",
  className: o
}) {
  const [c, h] = S(""), [N, l] = S(null), p = U(() => {
    const b = c.trim().toLowerCase();
    return e.filter((g) => N && g.status !== N ? !1 : b ? g.name.toLowerCase().includes(b) || g.id.toLowerCase().includes(b) || (g.description?.toLowerCase().includes(b) ?? !1) : !0);
  }, [e, c, N]);
  return /* @__PURE__ */ n("div", { className: x("flex flex-col gap-3", o), children: [
    /* @__PURE__ */ n("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "search",
          value: c,
          onChange: (b) => h(b.target.value),
          placeholder: "Search agents…",
          "aria-label": "Search agents",
          className: "flex-1 rounded-md border border-border-emphasis bg-white px-3 py-1.5 text-sm placeholder:text-text-tertiary focus:border-info focus:outline-none focus:ring-1 focus:ring-info"
        }
      ),
      /* @__PURE__ */ n("div", { className: "flex flex-wrap items-center gap-1", role: "group", "aria-label": "Filter by status", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => l(null),
            className: x(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
              N === null ? "border-slate-900 bg-slate-900 text-white" : "border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel"
            ),
            children: "All"
          }
        ),
        r.map((b) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => l(N === b ? null : b),
            "aria-pressed": N === b,
            className: x(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize transition-colors",
              N === b ? "border-slate-900 bg-slate-900 text-white" : "border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel"
            ),
            children: b
          },
          b
        ))
      ] })
    ] }),
    p.length === 0 ? /* @__PURE__ */ t("div", { className: "rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-8 text-center text-sm text-neutral", children: u }) : /* @__PURE__ */ t("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: p.map((b) => /* @__PURE__ */ t(
      me,
      {
        agent: b,
        metrics: s?.[b.id],
        selected: a === b.id,
        onClick: i ? () => i(b) : void 0
      },
      b.id
    )) })
  ] });
}
function Ke(e) {
  const s = e.find((r) => r.role === "user" && r.content.trim().length > 0);
  if (s) {
    const r = s.content.trim().replace(/\s+/g, " ");
    return r.length > 80 ? `${r.slice(0, 77)}…` : r;
  }
  return "New conversation";
}
function Ve(e) {
  const s = [...e].reverse().find(
    (a) => a.role === "assistant" && a.content.trim().length > 0
  );
  if (!s) return null;
  const r = s.content.trim().replace(/\s+/g, " ");
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function mt({
  sessions: e,
  activeThreadId: s = null,
  onResume: r,
  onDelete: a,
  emptyMessage: i = "No prior conversations.",
  className: u
}) {
  return e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      className: x(
        "rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-6 text-center text-sm text-neutral",
        u
      ),
      children: i
    }
  ) : /* @__PURE__ */ t("ul", { className: x("flex flex-col gap-1", u), "aria-label": "Prior conversations", children: e.map((o) => {
    const c = s === o.threadId, h = Ke(o.messages), N = Ve(o.messages);
    return /* @__PURE__ */ n(
      "li",
      {
        className: x(
          "group flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
          c ? "border-info bg-info-bg/60" : "border-border bg-white hover:border-border-emphasis hover:bg-surface-panel"
        ),
        children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: r ? () => r(o) : void 0,
              disabled: !r,
              className: "flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default",
              children: [
                /* @__PURE__ */ t("span", { className: "w-full truncate font-medium text-text-primary", children: h }),
                N && /* @__PURE__ */ t("span", { className: "w-full truncate text-xs text-neutral", children: N }),
                /* @__PURE__ */ n("span", { className: "text-[10px] uppercase tracking-wide text-text-tertiary", children: [
                  o.messages.length,
                  " msg",
                  o.messages.length === 1 ? "" : "s"
                ] })
              ]
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => a(o),
              "aria-label": `Delete conversation ${h}`,
              className: "shrink-0 rounded-md px-2 py-1 text-xs text-neutral opacity-0 hover:bg-surface-hover hover:text-danger-fg focus:opacity-100 group-hover:opacity-100",
              children: "Delete"
            }
          )
        ]
      },
      o.threadId
    );
  }) });
}
function gt({ decisions: e, className: s, maxItems: r = 50 }) {
  const a = e.slice(0, r);
  return /* @__PURE__ */ n("div", { className: x("border border-border rounded-lg overflow-hidden bg-white", s), children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Policy Decisions" }),
      /* @__PURE__ */ n("span", { className: "text-[10px] text-text-tertiary", children: [
        e.length,
        " total"
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 py-6 text-center text-xs text-text-tertiary", children: "No decisions recorded" }) : /* @__PURE__ */ t("div", { className: "max-h-[250px] overflow-y-auto divide-y divide-slate-100", children: a.map((i) => /* @__PURE__ */ n("div", { className: "flex items-center gap-2 px-3 py-2", children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: x(
            "shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold",
            i.decision === "allow" ? "bg-success-bg text-success-fg" : "bg-danger-bg text-danger-fg"
          ),
          children: i.decision === "allow" ? "✓" : "✗"
        }
      ),
      /* @__PURE__ */ n("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ n("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-slate-700 truncate", children: i.action }),
          /* @__PURE__ */ t("span", { className: "text-[10px] text-text-tertiary", children: "on" }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-text-secondary truncate", children: i.resource })
        ] }),
        /* @__PURE__ */ n("div", { className: "flex items-center gap-1.5 text-[10px] text-text-tertiary", children: [
          /* @__PURE__ */ n("span", { children: [
            "by ",
            i.principal
          ] }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: i.policyId }),
          i.reason && /* @__PURE__ */ n(oe, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ t("span", { className: "italic", children: i.reason })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-text-tertiary shrink-0", children: We(i.timestamp) })
    ] }, i.id)) })
  ] });
}
function We(e) {
  try {
    const s = new Date(e);
    return `${s.getHours().toString().padStart(2, "0")}:${s.getMinutes().toString().padStart(2, "0")}:${s.getSeconds().toString().padStart(2, "0")}`;
  } catch {
    return "";
  }
}
function ft({ entries: e, className: s, onDelete: r }) {
  const [a, i] = S("all"), [u, o] = S(""), c = e.filter((l) => !(a !== "all" && l.scope !== a || u && !l.key.toLowerCase().includes(u.toLowerCase()) && !l.value.toLowerCase().includes(u.toLowerCase()))), h = e.filter((l) => l.scope === "session").length, N = e.filter((l) => l.scope === "long-term").length;
  return /* @__PURE__ */ n("div", { className: x("border border-border rounded-lg overflow-hidden bg-white", s), children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Memory Inspector" }),
      /* @__PURE__ */ n("span", { className: "text-[10px] text-text-tertiary", children: [
        h,
        " session · ",
        N,
        " long-term"
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-slate-100", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: u,
          onChange: (l) => o(l.target.value),
          placeholder: "Search keys/values...",
          className: "flex-1 text-[11px] px-2 py-1 border border-border rounded outline-none focus:border-info"
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex text-[10px] border border-border rounded overflow-hidden", children: ["all", "session", "long-term"].map((l) => /* @__PURE__ */ t(
        "button",
        {
          className: x(
            "px-2 py-0.5 transition-colors",
            a === l ? "bg-info text-white" : "text-neutral hover:bg-surface-hover"
          ),
          onClick: () => i(l),
          children: l
        },
        l
      )) })
    ] }),
    c.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 py-6 text-center text-xs text-text-tertiary", children: e.length === 0 ? "No memory entries" : "No matches" }) : /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto divide-y divide-slate-100", children: c.map((l) => /* @__PURE__ */ n("div", { className: "px-3 py-2 group", children: [
      /* @__PURE__ */ n("div", { className: "flex items-center justify-between mb-0.5", children: [
        /* @__PURE__ */ n("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: x(
                "text-[9px] uppercase px-1 py-0.5 rounded font-medium",
                l.scope === "session" ? "bg-info-bg text-info-fg" : "bg-accent-bg text-accent-fg"
              ),
              children: l.scope
            }
          ),
          l.namespace && /* @__PURE__ */ n("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            l.namespace,
            "/"
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-slate-700 font-mono", children: l.key })
        ] }),
        r && /* @__PURE__ */ t(
          "button",
          {
            className: "text-[10px] text-danger-fg hover:text-danger-fg opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: () => r(l.id),
            children: "delete"
          }
        )
      ] }),
      /* @__PURE__ */ t("pre", { className: "text-[11px] text-text-secondary font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto", children: Xe(l.value) }),
      /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mt-0.5 text-[10px] text-text-tertiary", children: [
        /* @__PURE__ */ n("span", { children: [
          "Created ",
          Ye(l.createdAt)
        ] }),
        l.ttl && /* @__PURE__ */ n("span", { children: [
          "· TTL ",
          l.ttl,
          "s"
        ] })
      ] })
    ] }, l.id)) })
  ] });
}
function Xe(e) {
  try {
    return JSON.stringify(JSON.parse(e), null, 2);
  } catch {
    return e;
  }
}
function Ye(e) {
  try {
    return new Date(e).toLocaleString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return e;
  }
}
export {
  Fe as AgUiReasoningBlock,
  me as AgentCard,
  ot as AgentDetailPage,
  pt as AgentDirectory,
  $e as AgentFlowCanvas,
  it as AgentFlowPage,
  lt as AgentInvokePage,
  at as AgentsDashboardPage,
  st as AgentsLayout,
  Ce as AgentsProvider,
  mt as ConversationHistory,
  ge as GuardrailBadge,
  ft as MemoryInspector,
  gt as PolicyDecisionLog,
  Je as StreamingChatPanel,
  ce as ToolCallRenderer,
  De as TraceTimeline,
  V as fixtureAgents,
  W as fixtureMetrics,
  nt as fixtureTrace,
  ut as useA2ASession,
  je as useAgUiStream,
  dt as useAgentMetrics,
  ct as useAgentRegistry,
  Y as useAgentsContext
};
