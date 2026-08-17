import { jsx as t, jsxs as a, Fragment as le } from "react/jsx-runtime";
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
  const n = e.startTime ?? D.toISOString(), s = e.durationMs ?? 100, r = e.endTime ?? new Date(new Date(n).getTime() + s).toISOString();
  return {
    traceId: "trace-001",
    parentSpanId: void 0,
    status: "ok",
    attributes: {},
    ...e,
    startTime: n,
    endTime: r,
    durationMs: s
  };
}
const at = {
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
  agents: n,
  metrics: s,
  baseUrl: r
}) {
  const [o, u] = S(n ?? V), [l, c] = S(s ?? W), [h, N] = S([]), [i, p] = S([]), [b, g] = S(null);
  F(() => {
    n && u(n);
  }, [n]), F(() => {
    s && c(s);
  }, [s]);
  const v = I(() => {
    u(n ?? V), c(s ?? W);
  }, [n, s]), k = I((f) => {
    g(f);
  }, []), A = I(
    (f) => o.find((_) => _.id === f),
    [o]
  ), E = I(
    (f) => l.find((_) => _.agentId === f),
    [l]
  );
  return /* @__PURE__ */ t(
    pe.Provider,
    {
      value: {
        agents: o,
        metrics: l,
        sessions: h,
        a2aSessions: i,
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
function nt({ children: e, agents: n, metrics: s, baseUrl: r }) {
  return /* @__PURE__ */ t(Ce, { agents: n, metrics: s, baseUrl: r, children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full", children: e }) });
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
function me({ agent: e, metrics: n, selected: s, onClick: r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: x(
        "border rounded-lg cursor-pointer transition-all hover:shadow-sm overflow-hidden",
        s ? "border-info bg-info-bg/50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
      ),
      onClick: r,
      children: [
        /* @__PURE__ */ t("div", { className: x(
          "flex items-center justify-end px-3 py-1.5",
          e.status === "healthy" && "bg-success-bg",
          e.status === "degraded" && "bg-warning-bg",
          e.status === "offline" && "bg-danger-bg",
          e.status === "deploying" && "bg-info-bg"
        ), children: /* @__PURE__ */ a(
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
        /* @__PURE__ */ a("div", { className: "p-4 pt-3", children: [
          /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ t("span", { className: "text-lg shrink-0", children: "🤖" }),
            /* @__PURE__ */ a("div", { className: "min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "font-medium text-sm text-slate-900 truncate", children: e.name }),
              /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 font-mono truncate", children: e.id })
            ] })
          ] }),
          e.description && /* @__PURE__ */ t("p", { className: "text-xs text-slate-600 mb-3 line-clamp-2", children: e.description }),
          /* @__PURE__ */ a("div", { className: "flex flex-wrap items-center gap-2 text-xs text-slate-500", children: [
            /* @__PURE__ */ t("span", { className: "font-mono uppercase text-[10px] px-1.5 py-0.5 bg-slate-100 rounded shrink-0", children: e.protocol }),
            /* @__PURE__ */ t("span", { className: "truncate", children: e.model }),
            n && /* @__PURE__ */ a(le, { children: [
              /* @__PURE__ */ t("span", { className: "text-slate-300", children: "|" }),
              /* @__PURE__ */ a("span", { className: "shrink-0", children: [
                n.invocationsLast24h,
                " inv/24h"
              ] }),
              /* @__PURE__ */ a("span", { className: "shrink-0", children: [
                n.avgLatencyMs,
                "ms avg"
              ] })
            ] }),
            !n && e.avgLatencyMs != null && /* @__PURE__ */ a(le, { children: [
              /* @__PURE__ */ t("span", { className: "text-slate-300", children: "|" }),
              /* @__PURE__ */ a("span", { className: "shrink-0", children: [
                e.invocationsLast24h ?? 0,
                " inv/24h"
              ] }),
              /* @__PURE__ */ a("span", { className: "shrink-0", children: [
                e.avgLatencyMs,
                "ms avg"
              ] })
            ] })
          ] }),
          e.tools.length > 0 && /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1 mt-2", children: [
            e.tools.slice(0, 4).map((o) => /* @__PURE__ */ t(
              "span",
              {
                className: "text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-mono",
                children: o
              },
              o
            )),
            e.tools.length > 4 && /* @__PURE__ */ a("span", { className: "text-[10px] px-1.5 py-0.5 text-slate-400", children: [
              "+",
              e.tools.length - 4
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ge({ guardrails: e, className: n, compact: s }) {
  return e.length === 0 ? /* @__PURE__ */ t("span", { className: x("text-[10px] text-slate-400 italic", n), children: "No guardrails" }) : s ? /* @__PURE__ */ a("span", { className: x("inline-flex items-center gap-1 text-[10px]", n), children: [
    /* @__PURE__ */ t("span", { className: "text-warning-fg", children: "🛡️" }),
    /* @__PURE__ */ t("span", { className: "text-slate-600", children: e.length })
  ] }) : /* @__PURE__ */ t("div", { className: x("flex flex-wrap gap-1", n), children: e.map((r) => /* @__PURE__ */ a(
    "span",
    {
      className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-warning-bg border border-warning-border text-warning-fg rounded font-mono",
      children: [
        "🛡️ ",
        r
      ]
    },
    r
  )) });
}
function rt({ onAgentClick: e, className: n }) {
  const { agents: s, metrics: r } = Y(), o = s.filter((i) => i.status === "healthy").length, u = s.filter((i) => i.status === "degraded").length, l = s.filter((i) => i.status === "offline").length, c = s.reduce((i, p) => i + (p.invocationsLast24h ?? 0), 0), h = s.filter((i) => i.avgLatencyMs).length > 0 ? Math.round(s.reduce((i, p) => i + (p.avgLatencyMs ?? 0), 0) / s.filter((i) => i.avgLatencyMs).length) : 0, N = [...new Set(s.flatMap((i) => i.guardrails))];
  return /* @__PURE__ */ a("div", { className: x("space-y-6", n), children: [
    /* @__PURE__ */ a("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ t(B, { label: "Total Agents", value: s.length }),
      /* @__PURE__ */ t(B, { label: "Healthy", value: o, color: "emerald" }),
      /* @__PURE__ */ t(B, { label: "Degraded", value: u, color: "amber" }),
      /* @__PURE__ */ t(B, { label: "Offline", value: l, color: "red" }),
      /* @__PURE__ */ t(B, { label: "Invocations (24h)", value: c })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ a("div", { className: "text-xs text-slate-500", children: [
        "Avg latency: ",
        /* @__PURE__ */ a("span", { className: "font-medium text-slate-700", children: [
          h,
          "ms"
        ] }),
        " · ",
        "Metrics tracked: ",
        /* @__PURE__ */ a("span", { className: "font-medium text-slate-700", children: [
          r.length,
          " agents"
        ] })
      ] }),
      /* @__PURE__ */ t(ge, { guardrails: N })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: s.map((i) => /* @__PURE__ */ t(
      me,
      {
        agent: i,
        metrics: r.find((p) => p.agentId === i.id),
        onClick: () => e?.(i.id)
      },
      i.id
    )) })
  ] });
}
function B({ label: e, value: n, color: s }) {
  return /* @__PURE__ */ a("div", { className: "border border-slate-200 rounded-lg p-3 bg-white", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] uppercase text-slate-400 mb-1", children: e }),
    /* @__PURE__ */ t("div", { className: x("text-xl font-semibold", s === "emerald" ? "text-success-fg" : s === "amber" ? "text-warning-fg" : s === "red" ? "text-danger-fg" : "text-slate-800"), children: n })
  ] });
}
const X = {
  agent: "bg-info",
  tool: "bg-accent",
  llm: "bg-warning",
  retrieval: "bg-success",
  guardrail: "bg-danger",
  internal: "bg-slate-400"
}, ie = {
  agent: "Agent",
  tool: "Tool",
  llm: "LLM",
  retrieval: "Retrieval",
  guardrail: "Guardrail",
  internal: "Internal"
};
function Me({ span: e, depth: n, totalMs: s, startOffset: r, onSelect: o, selected: u }) {
  const l = s > 0 ? r / s * 100 : 0, c = s > 0 ? Math.max(e.durationMs / s * 100, 0.5) : 0;
  return /* @__PURE__ */ a(
    "div",
    {
      className: x(
        "flex items-center h-7 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100",
        u && "bg-info-bg"
      ),
      onClick: () => o(e),
      children: [
        /* @__PURE__ */ a("div", { className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden", children: [
          /* @__PURE__ */ t("span", { style: { marginLeft: n * 12 }, className: "shrink-0" }),
          /* @__PURE__ */ t("span", { className: x("w-2 h-2 rounded-sm shrink-0", X[e.kind]) }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-700 truncate", children: e.name })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 relative h-full flex items-center", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: x("absolute h-4 rounded-sm opacity-80", X[e.kind]),
              style: { left: `${l}%`, width: `${c}%`, minWidth: 2 }
            }
          ),
          /* @__PURE__ */ a(
            "span",
            {
              className: "absolute text-[10px] text-slate-500",
              style: { left: `${l + c + 0.5}%` },
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
function Oe(e, n) {
  const s = [], r = /* @__PURE__ */ new Map();
  for (const l of e) {
    const c = l.parentSpanId ?? "__root__";
    r.has(c) || r.set(c, []), r.get(c).push(l);
  }
  function o(l, c) {
    const h = l ?? "__root__", N = r.get(h) ?? r.get(l) ?? [];
    for (const i of N)
      s.push({ span: i, depth: c }), o(i.spanId, c + 1);
  }
  const u = e.find((l) => l.spanId === n);
  return u ? (s.push({ span: u, depth: 0 }), o(u.spanId, 1)) : o(void 0, 0), s;
}
function De({ trace: e, className: n }) {
  const [s, r] = S(null), o = Oe(e.spans, e.rootSpanId), u = new Date(e.startedAt).getTime();
  return /* @__PURE__ */ a("div", { className: x("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Trace" }),
        /* @__PURE__ */ t("span", { className: "text-[10px] font-mono text-slate-400", children: e.traceId })
      ] }),
      /* @__PURE__ */ a("span", { className: "text-xs text-slate-500", children: [
        e.totalDurationMs,
        "ms total"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex items-center gap-3 px-3 py-1.5 border-b border-slate-100", children: Object.keys(X).map((l) => /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ t("span", { className: x("w-2 h-2 rounded-sm", X[l]) }),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-500", children: ie[l] })
    ] }, l)) }),
    /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto", children: o.map(({ span: l, depth: c }) => {
      const h = new Date(l.startTime).getTime() - u;
      return /* @__PURE__ */ t(
        Me,
        {
          span: l,
          depth: c,
          totalMs: e.totalDurationMs,
          startOffset: h,
          onSelect: r,
          selected: s?.spanId === l.spanId
        },
        l.spanId
      );
    }) }),
    s && /* @__PURE__ */ a("div", { className: "border-t border-slate-200 p-3 bg-slate-50", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: s.name }),
        /* @__PURE__ */ t(
          "button",
          {
            className: "text-[10px] text-slate-400 hover:text-slate-600",
            onClick: () => r(null),
            children: "Close"
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]", children: [
        /* @__PURE__ */ t("div", { className: "text-slate-500", children: "Kind" }),
        /* @__PURE__ */ t("div", { className: "text-slate-700 font-medium", children: ie[s.kind] }),
        /* @__PURE__ */ t("div", { className: "text-slate-500", children: "Duration" }),
        /* @__PURE__ */ a("div", { className: "text-slate-700", children: [
          s.durationMs,
          "ms"
        ] }),
        /* @__PURE__ */ t("div", { className: "text-slate-500", children: "Status" }),
        /* @__PURE__ */ t("div", { className: x(
          "font-medium",
          s.status === "ok" && "text-success-fg",
          s.status === "error" && "text-danger-fg"
        ), children: s.status }),
        /* @__PURE__ */ t("div", { className: "text-slate-500", children: "Span ID" }),
        /* @__PURE__ */ t("div", { className: "text-slate-700 font-mono", children: s.spanId })
      ] }),
      Object.keys(s.attributes).length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "text-[10px] text-slate-400 uppercase mb-1", children: "Attributes" }),
        /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-slate-600 space-y-0.5", children: Object.entries(s.attributes).map(([l, c]) => /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ a("span", { className: "text-slate-400", children: [
            l,
            ":"
          ] }),
          " ",
          String(c)
        ] }, l)) })
      ] })
    ] })
  ] });
}
function lt({ agentId: e, trace: n, onBack: s, className: r }) {
  const { getAgent: o, getMetrics: u } = Y(), l = o(e), c = u(e);
  return l ? /* @__PURE__ */ a("div", { className: x("space-y-6", r), children: [
    /* @__PURE__ */ a("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ a("div", { children: [
        s && /* @__PURE__ */ t("button", { className: "text-xs text-info-fg hover:underline mb-2 block", onClick: s, children: "← Back" }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", children: "🤖" }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-slate-900", children: l.name }),
            /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 font-mono", children: l.id })
          ] })
        ] }),
        l.description && /* @__PURE__ */ t("p", { className: "text-sm text-slate-600 mt-2", children: l.description })
      ] }),
      /* @__PURE__ */ t(Re, { status: l.status })
    ] }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ a(z, { title: "Configuration", children: [
        /* @__PURE__ */ t(O, { label: "Protocol", value: l.protocol.toUpperCase() }),
        /* @__PURE__ */ t(O, { label: "Model", value: l.model }),
        /* @__PURE__ */ t(O, { label: "Endpoint", value: l.endpoint, mono: !0 })
      ] }),
      /* @__PURE__ */ t(z, { title: "Tools", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: l.tools.map((h) => /* @__PURE__ */ t("span", { className: "text-[11px] px-2 py-0.5 bg-slate-100 rounded font-mono text-slate-700", children: h }, h)) }) }),
      /* @__PURE__ */ t(z, { title: "Guardrails", children: /* @__PURE__ */ t(ge, { guardrails: l.guardrails }) }),
      c && /* @__PURE__ */ a(z, { title: "Metrics (24h)", children: [
        /* @__PURE__ */ t(O, { label: "Invocations", value: String(c.invocationsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Errors", value: String(c.errorsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Avg Latency", value: `${c.avgLatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "P99 Latency", value: `${c.p99LatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "Tokens In", value: c.tokensInLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Tokens Out", value: c.tokensOutLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Guardrail Blocks", value: String(c.guardrailBlocksLast24h) })
      ] })
    ] }),
    n && /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ t("h3", { className: "text-sm font-medium text-slate-700 mb-2", children: "Recent Trace" }),
      /* @__PURE__ */ t(De, { trace: n })
    ] })
  ] }) : /* @__PURE__ */ a("div", { className: x("text-center py-12", r), children: [
    /* @__PURE__ */ a("div", { className: "text-slate-400 text-sm", children: [
      "Agent not found: ",
      e
    ] }),
    s && /* @__PURE__ */ t("button", { className: "mt-2 text-xs text-info-fg hover:underline", onClick: s, children: "Back to dashboard" })
  ] });
}
function Re({ status: e }) {
  return /* @__PURE__ */ t("span", { className: x("text-xs font-medium px-2.5 py-1 rounded-full", {
    healthy: "bg-success-bg text-success-fg",
    degraded: "bg-warning-bg text-warning-fg",
    offline: "bg-danger-bg text-danger-fg",
    deploying: "bg-info-bg text-info-fg"
  }[e] ?? "bg-slate-100 text-slate-700"), children: e });
}
function z({ title: e, children: n }) {
  return /* @__PURE__ */ a("div", { className: "border border-slate-200 rounded-lg p-4 bg-white", children: [
    /* @__PURE__ */ t("h4", { className: "text-xs font-medium text-slate-500 uppercase mb-3", children: e }),
    n
  ] });
}
function O({ label: e, value: n, mono: s }) {
  return /* @__PURE__ */ a("div", { className: "flex items-baseline justify-between py-1 text-[12px]", children: [
    /* @__PURE__ */ t("span", { className: "text-slate-500", children: e }),
    /* @__PURE__ */ t("span", { className: x("text-slate-800", s && "font-mono text-[11px] break-all text-right max-w-[60%]"), children: n })
  ] });
}
function qe(e, n) {
  const s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const p of e)
    s.set(p.id, 0), r.set(p.id, 0);
  for (const p of n)
    s.set(p.from, (s.get(p.from) ?? 0) + 1), r.set(p.to, (r.get(p.to) ?? 0) + 1);
  const o = e.filter((p) => (r.get(p.id) ?? 0) === 0), u = e.filter((p) => (r.get(p.id) ?? 0) > 0 && (s.get(p.id) ?? 0) > 0), l = e.filter((p) => (s.get(p.id) ?? 0) === 0 && (r.get(p.id) ?? 0) > 0), c = [o, u, l].filter((p) => p.length > 0), h = [], N = 300, i = 120;
  for (let p = 0; p < c.length; p++) {
    const b = c[p], v = -((b.length - 1) * i) / 2;
    for (let k = 0; k < b.length; k++) {
      const A = b[k];
      h.push({
        id: A.id,
        position: { x: p * N, y: v + k * i },
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
function Pe(e, n) {
  const s = new Set(n.map((r) => r.id));
  return e.filter((r) => s.has(r.from) && s.has(r.to)).map((r, o) => {
    const l = n.find((c) => c.id === r.from)?.protocol === "a2a";
    return {
      id: `edge-${o}`,
      source: r.from,
      target: r.to,
      animated: l,
      style: { stroke: l ? "#3b82f6" : "#94a3b8", strokeWidth: l ? 2 : 1.5 },
      label: l ? "A2A" : void 0,
      labelStyle: { fontSize: 10, fill: "#64748b", fontWeight: 500 },
      markerEnd: { type: Le.ArrowClosed, width: 16, height: 16, color: l ? "#3b82f6" : "#94a3b8" }
    };
  });
}
function $e({
  agents: e,
  edges: n = [],
  onAgentClick: s,
  className: r
}) {
  const o = U(() => qe(e, n), [e, n]), u = U(() => Pe(n, e), [n, e]), l = (c, h) => {
    s?.(h.id);
  };
  return /* @__PURE__ */ t("div", { className: x("w-full h-[500px]", r), children: /* @__PURE__ */ a(
    Ae,
    {
      nodes: o,
      edges: u,
      onNodeClick: l,
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
function ot({ edges: e = Ge, onAgentClick: n, className: s }) {
  const { agents: r } = Y(), o = r.filter((l) => l.protocol === "a2a"), u = r.filter((l) => l.protocol === "direct");
  return /* @__PURE__ */ a("div", { className: x("space-y-4", s), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-slate-900", children: "Agent Flow (A2A)" }),
        /* @__PURE__ */ a("p", { className: "text-xs text-slate-500", children: [
          o.length,
          " A2A agents · ",
          u.length,
          " direct agents ·",
          " ",
          e.length,
          " connections"
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-3 text-[10px] text-slate-500", children: [
        /* @__PURE__ */ a("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-info inline-block" }),
          " A2A (animated)"
        ] }),
        /* @__PURE__ */ a("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-slate-400 inline-block" }),
          " Direct"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "border border-slate-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ t(
      $e,
      {
        agents: r,
        edges: e,
        onAgentClick: n
      }
    ) })
  ] });
}
function ae(e, n) {
  let s = e;
  for (const r of n) {
    if (s == null || typeof s != "object") return;
    s = s[r];
  }
  return s;
}
function K(e, n, s) {
  if (n.length === 0) return s;
  const r = Array.isArray(e) ? [...e] : { ...e }, o = n[0];
  return n.length === 1 ? r[o] = s : r[o] = K(r[o], n.slice(1), s), r;
}
function oe(e, n) {
  if (n.length === 0) return;
  const s = Array.isArray(e) ? [...e] : { ...e };
  return n.length === 1 ? delete s[n[0]] : s[n[0]] = oe(s[n[0]], n.slice(1)), s;
}
function ne(e) {
  return !e || e === "/" ? [] : e.replace(/^\//, "").split("/").map((n) => n.replace(/~1/g, "/").replace(/~0/g, "~"));
}
function Ue(e, n) {
  let s = e;
  for (const r of n)
    try {
      const o = ne(r.path);
      switch (r.op) {
        case "add":
        case "replace":
          s = K(s, o, r.value);
          break;
        case "remove":
          s = oe(s, o);
          break;
        case "copy": {
          const u = ne(r.from ?? "");
          s = K(s, o, ae(s, u));
          break;
        }
        case "move": {
          const u = ne(r.from ?? ""), l = ae(s, u);
          s = oe(s, u), s = K(s, o, l);
          break;
        }
        case "test": {
          const u = ae(s, o);
          JSON.stringify(u) !== JSON.stringify(r.value) && console.warn("[useAgUiStream] JSON Patch test op failed at", r.path);
          break;
        }
        default:
          console.warn("[useAgUiStream] Unsupported JSON Patch op:", r.op);
      }
    } catch (o) {
      console.warn("[useAgUiStream] JSON Patch op error:", r, o);
    }
  return s;
}
function re() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function je({
  url: e,
  threadId: n,
  headers: s,
  extraBody: r,
  onEvent: o
}) {
  const [u, l] = S([]), [c, h] = S(""), [N, i] = S([]), [p, b] = S(void 0), [g, v] = S(n ?? null), [k, A] = S(null), [E, f] = S(!1), [_, j] = S(null), J = G(null), L = G(null), R = G(""), C = G([]), M = I(
    (m) => {
      l((d) => {
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
      ), i(
        (w) => w.map((y) => y.id === m ? d(y) : y)
      ), l(
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
      switch (o?.(m), m.type) {
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
          const d = m.messageId ?? re();
          L.current = d, R.current = "", C.current = [];
          const w = m.role;
          l((y) => [
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
          const d = m.messageId ?? L.current ?? re();
          if (L.current !== d) {
            L.current = d, R.current = "", C.current = [];
            const w = m.role ?? "assistant";
            l((y) => [
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
          C.current = [...C.current, d], i((w) => [...w, d]), L.current && l(
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
          })), i((d) => d.filter((w) => w.id !== m.toolCallId));
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
            C.current = [...C.current, y], i((T) => [...T, y]), L.current && l(
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
          l(m.messages);
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
    [o, M, H]
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
    J.current?.abort(), f(!1), h(""), L.current && (M((m) => ({ ...m, isStreaming: !1 })), L.current = null), i([]);
  }, [M]), he = I(
    async (m, d) => {
      J.current?.abort();
      const w = new AbortController();
      J.current = w, j(null), f(!0);
      const y = {
        id: re(),
        role: "user",
        content: m,
        isStreaming: !1,
        toolCalls: []
      };
      l((T) => [...T, y]);
      try {
        const T = await fetch(e, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            ...s
          },
          body: JSON.stringify({
            message: m,
            threadId: g ?? void 0,
            ...r,
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
          const se = $.lastIndexOf(`

`);
          if (se !== -1) {
            const ye = $.slice(0, se + 2);
            $ = $.slice(se + 2);
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
    [e, g, s, r, Q, Z]
  ), xe = I(
    (m, d) => {
      ee(), v(m), A(null), l(d), h(""), i([]), j(null), R.current = "", C.current = [], L.current = null;
    },
    [ee]
  ), be = I(() => {
    J.current?.abort(), l([]), f(!1), h(""), i([]), b(void 0), v(null), A(null), j(null), R.current = "", C.current = [], L.current = null;
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
function ce({ toolCall: e, className: n }) {
  const [s, r] = S(!1), o = e.endedAt != null ? e.endedAt - e.startedAt : null;
  return /* @__PURE__ */ a(
    "div",
    {
      className: x(
        "border rounded text-xs font-mono overflow-hidden",
        e.status === "streaming" && "border-info-border bg-info-bg/50",
        e.status === "completed" && "border-slate-200 bg-slate-50",
        e.status === "error" && "border-danger-border bg-danger-bg/50",
        n
      ),
      children: [
        /* @__PURE__ */ a(
          "button",
          {
            className: "flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-slate-100/50 transition-colors",
            onClick: () => r(!s),
            children: [
              /* @__PURE__ */ t("span", { className: x(
                e.status === "streaming" && "animate-pulse",
                e.status === "completed" && "text-success-fg",
                e.status === "error" && "text-danger-fg"
              ), children: He[e.status] }),
              /* @__PURE__ */ t("span", { className: "text-slate-700 font-medium", children: e.name }),
              o != null && /* @__PURE__ */ a("span", { className: "text-slate-400 ml-auto", children: [
                o,
                "ms"
              ] }),
              /* @__PURE__ */ t("span", { className: "text-slate-400 ml-1", children: s ? "▾" : "▸" })
            ]
          }
        ),
        s && /* @__PURE__ */ a("div", { className: "px-2 pb-2 space-y-1 border-t border-slate-100", children: [
          e.args && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[10px] text-slate-400 uppercase mt-1", children: "args" }),
            /* @__PURE__ */ t("pre", { className: "text-[11px] text-slate-600 whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto", children: fe(e.args) })
          ] }),
          e.result != null && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[10px] text-slate-400 uppercase mt-1", children: "result" }),
            /* @__PURE__ */ t("pre", { className: "text-[11px] text-slate-600 whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto", children: Be(e.result) })
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
  isStreaming: n = !1,
  defaultOpen: s = !1,
  className: r
}) {
  const [o, u] = S(s);
  if (!e || !e.trim())
    return null;
  const l = e.split(/\s+/).filter(Boolean).length;
  return /* @__PURE__ */ a(
    "div",
    {
      className: x(
        "border border-dashed border-border-emphasis py-2 px-2.5 rounded max-w-full mb-1.5",
        r
      ),
      children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => u((c) => !c),
            className: "flex items-center w-full bg-transparent border-none p-0 cursor-pointer gap-1.5 text-left",
            children: [
              /* @__PURE__ */ t("span", { className: "text-[10px] text-text-secondary select-none leading-none w-3 inline-block shrink-0", children: o ? "▾" : "▸" }),
              /* @__PURE__ */ t("span", { className: "text-[12px] font-medium text-text-primary flex-1 select-none", children: n ? "Thinking…" : "Reasoning" }),
              /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary bg-surface border border-border rounded-[10px] py-px px-[7px] select-none shrink-0", children: [
                l,
                " tok"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ t("div", { className: "max-h-[240px] overflow-y-auto pt-2", children: /* @__PURE__ */ a("pre", { className: "m-0 font-[inherit] text-[12px] text-text-secondary whitespace-pre-wrap break-words leading-[1.6]", children: [
          e,
          n && /* @__PURE__ */ t("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-text-secondary ml-1 align-middle [animation:agui-reasoning-pulse_1.4s_ease-in-out_infinite]" })
        ] }) })
      ]
    }
  );
}
const de = "w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white text-[11px] font-bold shrink-0";
function Je({
  messages: e,
  isStreaming: n,
  streamingText: s = "",
  activeToolCalls: r = [],
  error: o,
  onSend: u,
  onCancel: l,
  placeholder: c = "Send a message to the agent...",
  className: h
}) {
  const [N, i] = S(""), p = G(null);
  F(() => {
    p.current && (p.current.scrollTop = p.current.scrollHeight);
  }, [e, r, s]);
  function b() {
    const g = N.trim();
    !g || n || (u(g), i(""));
  }
  return /* @__PURE__ */ a("div", { className: x("flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden", h), children: [
    /* @__PURE__ */ a("div", { className: "px-4 py-3 border-b border-slate-200 flex items-center justify-between", children: [
      /* @__PURE__ */ t("span", { className: "font-semibold text-sm text-slate-800", children: "Agent Chat" }),
      n && /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5 text-xs text-info-fg", children: [
        /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-info animate-pulse" }),
        "Streaming"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { ref: p, className: "flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4", children: [
      e.length === 0 && !n && /* @__PURE__ */ t("div", { className: "text-sm text-slate-400 text-center mt-[60px]", children: "Messages will appear here as you interact with the agent..." }),
      e.map((g) => /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
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
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ t("span", { className: "font-semibold text-[13px] text-[#1a1a2e]", children: g.role === "user" ? "You" : "Agent" }) }),
          g.role === "assistant" && g.reasoning && /* @__PURE__ */ t(
            Fe,
            {
              reasoning: g.reasoning,
              isStreaming: g.isStreaming && n,
              defaultOpen: !1
            }
          ),
          /* @__PURE__ */ a(
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
      r.length > 0 && /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col gap-1", children: r.map((g) => /* @__PURE__ */ t(ce, { toolCall: g }, g.id)) })
      ] }),
      s && !e.some((g) => g.isStreaming) && /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ a("div", { className: "flex-1 mt-1 py-2 px-3 bg-[#f1f5f9] rounded-[4px_12px_12px_12px] text-[14px] text-[#334155] leading-[1.5] whitespace-pre-wrap break-words", children: [
          s,
          /* @__PURE__ */ t("span", { className: "inline-block animate-pulse ml-0.5 text-info-fg", children: "▊" })
        ] })
      ] }),
      n && r.length === 0 && !s && e.length > 0 && !e[e.length - 1]?.isStreaming && /* @__PURE__ */ a("div", { className: "flex items-center gap-2 py-1", children: [
        /* @__PURE__ */ a("div", { className: "flex gap-[3px] py-1.5 px-3 bg-[#f1f5f9] rounded-xl", children: [
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" }),
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" }),
          /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" })
        ] }),
        /* @__PURE__ */ t("span", { className: "text-[12px] text-[#64748b]", children: "Agent is thinking..." })
      ] })
    ] }),
    o && /* @__PURE__ */ t("div", { className: "px-4 py-2 bg-danger-bg border-t border-danger-border text-xs text-danger-fg", children: o }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-2 p-3 border-t border-slate-200 bg-slate-50/50", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: N,
          onChange: (g) => i(g.target.value),
          onKeyDown: (g) => g.key === "Enter" && b(),
          disabled: n,
          placeholder: n ? "Waiting for response..." : c,
          className: x(
            "flex-1 text-sm px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-info focus:ring-1 focus:ring-info transition-all bg-white",
            n && "bg-slate-50 text-slate-400"
          )
        }
      ),
      n && l ? /* @__PURE__ */ t(
        "button",
        {
          onClick: l,
          className: "text-sm px-4 py-2.5 bg-danger text-white rounded-lg hover:bg-danger transition-colors font-medium",
          children: "Stop"
        }
      ) : /* @__PURE__ */ t(
        "button",
        {
          onClick: b,
          disabled: !N.trim() || n,
          className: x(
            "text-sm px-4 py-2.5 rounded-lg transition-colors font-medium",
            !N.trim() || n ? "bg-slate-100 text-slate-400 cursor-default" : "bg-info text-white hover:bg-info cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
function it({ defaultAgentId: e, baseUrl: n = "/api/agents", className: s }) {
  const { agents: r } = Y(), [o, u] = S(e ?? r[0]?.id ?? ""), [l, c] = S([]), h = `${n}/${o}/invoke`, { messages: N, isStreaming: i, streamingText: p, activeToolCalls: b, error: g, sendMessage: v, cancelStream: k, reset: A } = je({
    url: h,
    onEvent: (f) => c((_) => [..._, f])
  }), E = r.find((f) => f.id === o);
  return /* @__PURE__ */ a("div", { className: x("flex h-full min-h-[500px]", s), children: [
    /* @__PURE__ */ a("div", { className: "w-[240px] border-r border-[#e2e8f0] bg-white flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t("div", { className: "py-3 px-4 border-b border-[#e2e8f0] font-semibold text-[13px] text-[#64748b] uppercase tracking-[0.05em]", children: "Agents" }),
      /* @__PURE__ */ t("div", { className: "flex-1 py-2 overflow-y-auto", children: r.map((f) => /* @__PURE__ */ a(
        "div",
        {
          onClick: () => {
            u(f.id), A(), c([]);
          },
          className: x(
            "py-2 px-4 flex items-center justify-between transition-all duration-150 ease-in-out border-l-[3px]",
            f.status === "offline" ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            o === f.id ? "bg-[#f1f5f9] border-l-[#6366f1]" : "bg-transparent border-l-transparent"
          ),
          children: [
            /* @__PURE__ */ a("div", { className: "min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[14px] text-[#1a1a2e] truncate", children: f.name }),
              /* @__PURE__ */ a("div", { className: "text-[11px] text-[#94a3b8]", children: [
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
      E && /* @__PURE__ */ a("div", { className: "py-3 px-4 border-t border-[#e2e8f0] text-[11px]", children: [
        /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1.5", children: "Tools:" }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: E.tools.map((f) => /* @__PURE__ */ t(
          "span",
          {
            className: "py-0.5 px-1.5 bg-[#f1f5f9] rounded text-[10px] text-[#475569] font-mono",
            children: f
          },
          f
        )) }),
        E.guardrails.length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1", children: "Guardrails:" }),
          E.guardrails.map((f) => /* @__PURE__ */ a("div", { className: "text-[10px] text-[#d97706] font-mono", children: [
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
    /* @__PURE__ */ a("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t(
        Je,
        {
          messages: N,
          isStreaming: i,
          streamingText: p,
          activeToolCalls: b,
          error: g,
          onSend: v,
          onCancel: k,
          className: "flex-1 border-0 rounded-none"
        }
      ),
      l.length > 0 && /* @__PURE__ */ a("details", { className: "border-t border-[#e2e8f0] bg-[#f8fafc]", children: [
        /* @__PURE__ */ a("summary", { className: "py-2 px-4 text-[12px] text-[#64748b] cursor-pointer font-medium", children: [
          "Event Log (",
          l.length,
          " events)"
        ] }),
        /* @__PURE__ */ t("div", { className: "max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]", children: l.map((f, _) => /* @__PURE__ */ a("div", { className: "flex gap-2 text-[#475569] py-px", children: [
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
  pollIntervalMs: n = 3e4,
  enabled: s = !0
} = {}) {
  const [r, o] = S(V), [u, l] = S(!1), [c, h] = S(null), N = I(async () => {
    if (!e) {
      o(V);
      return;
    }
    l(!0), h(null);
    try {
      const v = await fetch(`${e}/agents`);
      if (!v.ok) throw new Error(`HTTP ${v.status}`);
      const k = await v.json();
      o(k);
    } catch (v) {
      h(v instanceof Error ? v.message : "Failed to fetch agents");
    } finally {
      l(!1);
    }
  }, [e]);
  F(() => {
    if (!s || (N(), !e || n <= 0)) return;
    const v = setInterval(N, n);
    return () => clearInterval(v);
  }, [s, N, e, n]);
  const i = I(
    (v) => r.find((k) => k.id === v),
    [r]
  ), p = r.filter((v) => v.status === "healthy").length, b = r.filter((v) => v.status === "degraded").length, g = r.filter((v) => v.status === "offline").length;
  return {
    agents: r,
    isLoading: u,
    error: c,
    refresh: N,
    getAgent: i,
    healthyCount: p,
    degradedCount: b,
    offlineCount: g
  };
}
function dt({
  baseUrl: e,
  agentId: n,
  pollIntervalMs: s = 6e4,
  enabled: r = !0
} = {}) {
  const [o, u] = S(W), [l, c] = S(!1), [h, N] = S(null), i = I(async () => {
    if (!e) {
      u(W);
      return;
    }
    c(!0), N(null);
    try {
      const k = n ? `${e}/agents/${n}/metrics` : `${e}/agents/metrics`, A = await fetch(k);
      if (!A.ok) throw new Error(`HTTP ${A.status}`);
      const E = await A.json();
      u(E);
    } catch (k) {
      N(k instanceof Error ? k.message : "Failed to fetch metrics");
    } finally {
      c(!1);
    }
  }, [e, n]);
  F(() => {
    if (!r || (i(), !e || s <= 0)) return;
    const k = setInterval(i, s);
    return () => clearInterval(k);
  }, [r, i, e, s]);
  const p = I(
    (k) => o.find((A) => A.agentId === k),
    [o]
  ), b = U(
    () => o.reduce((k, A) => k + A.invocationsLast24h, 0),
    [o]
  ), g = U(
    () => o.reduce((k, A) => k + A.errorsLast24h, 0),
    [o]
  ), v = U(() => o.length === 0 ? 0 : Math.round(o.reduce((k, A) => k + A.avgLatencyMs, 0) / o.length), [o]);
  return {
    metrics: o,
    isLoading: l,
    error: h,
    refresh: i,
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
  participants: n
} = {}) {
  const [s, r] = S(null), [o, u] = S([]), l = G(null), c = I((i) => {
    const p = `a2a-${ue()}`;
    l.current = p;
    const b = {
      sessionId: p,
      participants: i,
      messages: [],
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "active"
    };
    r(b), u([]);
  }, []), h = I(
    (i, p, b) => {
      if (!s) return;
      const g = {
        id: `msg-${ue()}`,
        from: i,
        to: p,
        content: b,
        protocol: "a2a",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      u((v) => [...v, g]), r(
        (v) => v && { ...v, messages: [...v.messages, g] }
      );
    },
    [s]
  ), N = I(() => {
    r((i) => i && { ...i, status: "completed" }), l.current = null;
  }, []);
  return n && !s && c(n), {
    session: s,
    messages: o,
    isActive: s?.status === "active",
    startSession: c,
    sendMessage: h,
    endSession: N
  };
}
const ze = ["healthy", "degraded", "offline", "deploying"];
function pt({
  agents: e,
  metricsById: n,
  filters: s = ze,
  selectedId: r = null,
  onSelect: o,
  emptyMessage: u = "No agents match your filter.",
  className: l
}) {
  const [c, h] = S(""), [N, i] = S(null), p = U(() => {
    const b = c.trim().toLowerCase();
    return e.filter((g) => N && g.status !== N ? !1 : b ? g.name.toLowerCase().includes(b) || g.id.toLowerCase().includes(b) || (g.description?.toLowerCase().includes(b) ?? !1) : !0);
  }, [e, c, N]);
  return /* @__PURE__ */ a("div", { className: x("flex flex-col gap-3", l), children: [
    /* @__PURE__ */ a("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "search",
          value: c,
          onChange: (b) => h(b.target.value),
          placeholder: "Search agents…",
          "aria-label": "Search agents",
          className: "flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-info focus:outline-none focus:ring-1 focus:ring-info"
        }
      ),
      /* @__PURE__ */ a("div", { className: "flex flex-wrap items-center gap-1", role: "group", "aria-label": "Filter by status", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => i(null),
            className: x(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
              N === null ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            ),
            children: "All"
          }
        ),
        s.map((b) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => i(N === b ? null : b),
            "aria-pressed": N === b,
            className: x(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize transition-colors",
              N === b ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            ),
            children: b
          },
          b
        ))
      ] })
    ] }),
    p.length === 0 ? /* @__PURE__ */ t("div", { className: "rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500", children: u }) : /* @__PURE__ */ t("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: p.map((b) => /* @__PURE__ */ t(
      me,
      {
        agent: b,
        metrics: n?.[b.id],
        selected: r === b.id,
        onClick: o ? () => o(b) : void 0
      },
      b.id
    )) })
  ] });
}
function Ke(e) {
  const n = e.find((s) => s.role === "user" && s.content.trim().length > 0);
  if (n) {
    const s = n.content.trim().replace(/\s+/g, " ");
    return s.length > 80 ? `${s.slice(0, 77)}…` : s;
  }
  return "New conversation";
}
function Ve(e) {
  const n = [...e].reverse().find(
    (r) => r.role === "assistant" && r.content.trim().length > 0
  );
  if (!n) return null;
  const s = n.content.trim().replace(/\s+/g, " ");
  return s.length > 120 ? `${s.slice(0, 117)}…` : s;
}
function mt({
  sessions: e,
  activeThreadId: n = null,
  onResume: s,
  onDelete: r,
  emptyMessage: o = "No prior conversations.",
  className: u
}) {
  return e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      className: x(
        "rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500",
        u
      ),
      children: o
    }
  ) : /* @__PURE__ */ t("ul", { className: x("flex flex-col gap-1", u), "aria-label": "Prior conversations", children: e.map((l) => {
    const c = n === l.threadId, h = Ke(l.messages), N = Ve(l.messages);
    return /* @__PURE__ */ a(
      "li",
      {
        className: x(
          "group flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
          c ? "border-info bg-info-bg/60" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        ),
        children: [
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: s ? () => s(l) : void 0,
              disabled: !s,
              className: "flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default",
              children: [
                /* @__PURE__ */ t("span", { className: "w-full truncate font-medium text-slate-900", children: h }),
                N && /* @__PURE__ */ t("span", { className: "w-full truncate text-xs text-slate-500", children: N }),
                /* @__PURE__ */ a("span", { className: "text-[10px] uppercase tracking-wide text-slate-400", children: [
                  l.messages.length,
                  " msg",
                  l.messages.length === 1 ? "" : "s"
                ] })
              ]
            }
          ),
          r && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => r(l),
              "aria-label": `Delete conversation ${h}`,
              className: "shrink-0 rounded-md px-2 py-1 text-xs text-slate-500 opacity-0 hover:bg-slate-100 hover:text-danger-fg focus:opacity-100 group-hover:opacity-100",
              children: "Delete"
            }
          )
        ]
      },
      l.threadId
    );
  }) });
}
function gt({ decisions: e, className: n, maxItems: s = 50 }) {
  const r = e.slice(0, s);
  return /* @__PURE__ */ a("div", { className: x("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Policy Decisions" }),
      /* @__PURE__ */ a("span", { className: "text-[10px] text-slate-400", children: [
        e.length,
        " total"
      ] })
    ] }),
    r.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 py-6 text-center text-xs text-slate-400", children: "No decisions recorded" }) : /* @__PURE__ */ t("div", { className: "max-h-[250px] overflow-y-auto divide-y divide-slate-100", children: r.map((o) => /* @__PURE__ */ a("div", { className: "flex items-center gap-2 px-3 py-2", children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: x(
            "shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold",
            o.decision === "allow" ? "bg-success-bg text-success-fg" : "bg-danger-bg text-danger-fg"
          ),
          children: o.decision === "allow" ? "✓" : "✗"
        }
      ),
      /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-slate-700 truncate", children: o.action }),
          /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-400", children: "on" }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-slate-600 truncate", children: o.resource })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5 text-[10px] text-slate-400", children: [
          /* @__PURE__ */ a("span", { children: [
            "by ",
            o.principal
          ] }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: o.policyId }),
          o.reason && /* @__PURE__ */ a(le, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ t("span", { className: "italic", children: o.reason })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-400 shrink-0", children: We(o.timestamp) })
    ] }, o.id)) })
  ] });
}
function We(e) {
  try {
    const n = new Date(e);
    return `${n.getHours().toString().padStart(2, "0")}:${n.getMinutes().toString().padStart(2, "0")}:${n.getSeconds().toString().padStart(2, "0")}`;
  } catch {
    return "";
  }
}
function ft({ entries: e, className: n, onDelete: s }) {
  const [r, o] = S("all"), [u, l] = S(""), c = e.filter((i) => !(r !== "all" && i.scope !== r || u && !i.key.toLowerCase().includes(u.toLowerCase()) && !i.value.toLowerCase().includes(u.toLowerCase()))), h = e.filter((i) => i.scope === "session").length, N = e.filter((i) => i.scope === "long-term").length;
  return /* @__PURE__ */ a("div", { className: x("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Memory Inspector" }),
      /* @__PURE__ */ a("span", { className: "text-[10px] text-slate-400", children: [
        h,
        " session · ",
        N,
        " long-term"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-slate-100", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: u,
          onChange: (i) => l(i.target.value),
          placeholder: "Search keys/values...",
          className: "flex-1 text-[11px] px-2 py-1 border border-slate-200 rounded outline-none focus:border-info"
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex text-[10px] border border-slate-200 rounded overflow-hidden", children: ["all", "session", "long-term"].map((i) => /* @__PURE__ */ t(
        "button",
        {
          className: x(
            "px-2 py-0.5 transition-colors",
            r === i ? "bg-info text-white" : "text-slate-500 hover:bg-slate-100"
          ),
          onClick: () => o(i),
          children: i
        },
        i
      )) })
    ] }),
    c.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 py-6 text-center text-xs text-slate-400", children: e.length === 0 ? "No memory entries" : "No matches" }) : /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto divide-y divide-slate-100", children: c.map((i) => /* @__PURE__ */ a("div", { className: "px-3 py-2 group", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between mb-0.5", children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: x(
                "text-[9px] uppercase px-1 py-0.5 rounded font-medium",
                i.scope === "session" ? "bg-info-bg text-info-fg" : "bg-accent-bg text-accent-fg"
              ),
              children: i.scope
            }
          ),
          i.namespace && /* @__PURE__ */ a("span", { className: "text-[10px] text-slate-400 font-mono", children: [
            i.namespace,
            "/"
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-slate-700 font-mono", children: i.key })
        ] }),
        s && /* @__PURE__ */ t(
          "button",
          {
            className: "text-[10px] text-danger-fg hover:text-danger-fg opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: () => s(i.id),
            children: "delete"
          }
        )
      ] }),
      /* @__PURE__ */ t("pre", { className: "text-[11px] text-slate-600 font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto", children: Xe(i.value) }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mt-0.5 text-[10px] text-slate-400", children: [
        /* @__PURE__ */ a("span", { children: [
          "Created ",
          Ye(i.createdAt)
        ] }),
        i.ttl && /* @__PURE__ */ a("span", { children: [
          "· TTL ",
          i.ttl,
          "s"
        ] })
      ] })
    ] }, i.id)) })
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
  lt as AgentDetailPage,
  pt as AgentDirectory,
  $e as AgentFlowCanvas,
  ot as AgentFlowPage,
  it as AgentInvokePage,
  rt as AgentsDashboardPage,
  nt as AgentsLayout,
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
  at as fixtureTrace,
  ut as useA2ASession,
  je as useAgUiStream,
  dt as useAgentMetrics,
  ct as useAgentRegistry,
  Y as useAgentsContext
};
