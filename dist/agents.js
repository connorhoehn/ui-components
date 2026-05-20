import { jsx as t, jsxs as a, Fragment as le } from "react/jsx-runtime";
import { createContext as we, useState as w, useEffect as J, useCallback as I, useContext as Se, useMemo as B, useRef as $ } from "react";
import { c as N } from "./cn-B6yFEsav.js";
import { ReactFlow as ke, Background as Ae, Controls as Te, MarkerType as Ie } from "@xyflow/react";
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
], R = /* @__PURE__ */ new Date("2026-05-08T15:00:00Z");
function q(e) {
  const n = e.startTime ?? R.toISOString(), s = e.durationMs ?? 100, r = e.endTime ?? new Date(new Date(n).getTime() + s).toISOString();
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
const et = {
  traceId: "trace-001",
  rootSpanId: "span-root",
  agentId: "orgiq-supervisor",
  startedAt: R.toISOString(),
  totalDurationMs: 3200,
  spans: [
    q({ spanId: "span-root", name: "supervisor.invoke", kind: "agent", durationMs: 3200 }),
    q({ spanId: "span-guard", parentSpanId: "span-root", name: "guardrail.evaluate", kind: "guardrail", durationMs: 120, startTime: new Date(R.getTime() + 50).toISOString() }),
    q({ spanId: "span-route", parentSpanId: "span-root", name: "supervisor.route", kind: "internal", durationMs: 80, startTime: new Date(R.getTime() + 180).toISOString() }),
    q({ spanId: "span-search", parentSpanId: "span-root", name: "search-agent.invoke", kind: "agent", durationMs: 2100, startTime: new Date(R.getTime() + 270).toISOString() }),
    q({ spanId: "span-kb", parentSpanId: "span-search", name: "knowledge-base.retrieve", kind: "retrieval", durationMs: 450, startTime: new Date(R.getTime() + 300).toISOString() }),
    q({ spanId: "span-llm", parentSpanId: "span-search", name: "bedrock.invoke_model", kind: "llm", durationMs: 1400, startTime: new Date(R.getTime() + 800).toISOString() }),
    q({ spanId: "span-graph", parentSpanId: "span-search", name: "neptune.execute_query", kind: "tool", durationMs: 200, startTime: new Date(R.getTime() + 2250).toISOString() }),
    q({ spanId: "span-summary", parentSpanId: "span-root", name: "supervisor.summarize", kind: "llm", durationMs: 700, startTime: new Date(R.getTime() + 2450).toISOString() })
  ]
}, me = we(null);
function Le({
  children: e,
  agents: n,
  metrics: s,
  baseUrl: r
}) {
  const [o, u] = w(n ?? V), [l, d] = w(s ?? W), [g, S] = w([]), [i, p] = w([]), [T, f] = w(null);
  J(() => {
    n && u(n);
  }, [n]), J(() => {
    s && d(s);
  }, [s]);
  const x = I(() => {
    u(n ?? V), d(s ?? W);
  }, [n, s]), y = I((h) => {
    f(h);
  }, []), k = I(
    (h) => o.find((C) => C.id === h),
    [o]
  ), _ = I(
    (h) => l.find((C) => C.agentId === h),
    [l]
  );
  return /* @__PURE__ */ t(
    me.Provider,
    {
      value: {
        agents: o,
        metrics: l,
        sessions: g,
        a2aSessions: i,
        selectedAgentId: T,
        selectAgent: y,
        refreshAgents: x,
        getAgent: k,
        getMetrics: _
      },
      children: e
    }
  );
}
function Y() {
  const e = Se(me);
  if (!e) throw new Error("useAgentsContext must be used within AgentsProvider");
  return e;
}
function tt({ children: e, agents: n, metrics: s, baseUrl: r }) {
  return /* @__PURE__ */ t(Le, { agents: n, metrics: s, baseUrl: r, children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full", children: e }) });
}
const Ee = {
  healthy: "bg-emerald-100 text-emerald-800",
  degraded: "bg-amber-100 text-amber-800",
  offline: "bg-red-100 text-red-800",
  deploying: "bg-blue-100 text-blue-800"
}, _e = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  offline: "bg-red-500",
  deploying: "bg-blue-500"
};
function Ce({ agent: e, metrics: n, selected: s, onClick: r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: N(
        "border rounded-lg cursor-pointer transition-all hover:shadow-sm overflow-hidden",
        s ? "border-blue-500 bg-blue-50/50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
      ),
      onClick: r,
      children: [
        /* @__PURE__ */ t("div", { className: N(
          "flex items-center justify-end px-3 py-1.5",
          e.status === "healthy" && "bg-emerald-50",
          e.status === "degraded" && "bg-amber-50",
          e.status === "offline" && "bg-red-50",
          e.status === "deploying" && "bg-blue-50"
        ), children: /* @__PURE__ */ a(
          "span",
          {
            className: N(
              "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
              Ee[e.status]
            ),
            children: [
              /* @__PURE__ */ t("span", { className: N("w-1.5 h-1.5 rounded-full", _e[e.status]) }),
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
function pe({ guardrails: e, className: n, compact: s }) {
  return e.length === 0 ? /* @__PURE__ */ t("span", { className: N("text-[10px] text-slate-400 italic", n), children: "No guardrails" }) : s ? /* @__PURE__ */ a("span", { className: N("inline-flex items-center gap-1 text-[10px]", n), children: [
    /* @__PURE__ */ t("span", { className: "text-amber-500", children: "🛡️" }),
    /* @__PURE__ */ t("span", { className: "text-slate-600", children: e.length })
  ] }) : /* @__PURE__ */ t("div", { className: N("flex flex-wrap gap-1", n), children: e.map((r) => /* @__PURE__ */ a(
    "span",
    {
      className: "inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded font-mono",
      children: [
        "🛡️ ",
        r
      ]
    },
    r
  )) });
}
function st({ onAgentClick: e, className: n }) {
  const { agents: s, metrics: r } = Y(), o = s.filter((i) => i.status === "healthy").length, u = s.filter((i) => i.status === "degraded").length, l = s.filter((i) => i.status === "offline").length, d = s.reduce((i, p) => i + (p.invocationsLast24h ?? 0), 0), g = s.filter((i) => i.avgLatencyMs).length > 0 ? Math.round(s.reduce((i, p) => i + (p.avgLatencyMs ?? 0), 0) / s.filter((i) => i.avgLatencyMs).length) : 0, S = [...new Set(s.flatMap((i) => i.guardrails))];
  return /* @__PURE__ */ a("div", { className: N("space-y-6", n), children: [
    /* @__PURE__ */ a("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ t(H, { label: "Total Agents", value: s.length }),
      /* @__PURE__ */ t(H, { label: "Healthy", value: o, color: "emerald" }),
      /* @__PURE__ */ t(H, { label: "Degraded", value: u, color: "amber" }),
      /* @__PURE__ */ t(H, { label: "Offline", value: l, color: "red" }),
      /* @__PURE__ */ t(H, { label: "Invocations (24h)", value: d })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ a("div", { className: "text-xs text-slate-500", children: [
        "Avg latency: ",
        /* @__PURE__ */ a("span", { className: "font-medium text-slate-700", children: [
          g,
          "ms"
        ] }),
        " · ",
        "Metrics tracked: ",
        /* @__PURE__ */ a("span", { className: "font-medium text-slate-700", children: [
          r.length,
          " agents"
        ] })
      ] }),
      /* @__PURE__ */ t(pe, { guardrails: S })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: s.map((i) => /* @__PURE__ */ t(
      Ce,
      {
        agent: i,
        metrics: r.find((p) => p.agentId === i.id),
        onClick: () => e?.(i.id)
      },
      i.id
    )) })
  ] });
}
function H({ label: e, value: n, color: s }) {
  return /* @__PURE__ */ a("div", { className: "border border-slate-200 rounded-lg p-3 bg-white", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] uppercase text-slate-400 mb-1", children: e }),
    /* @__PURE__ */ t("div", { className: N("text-xl font-semibold", s === "emerald" ? "text-emerald-600" : s === "amber" ? "text-amber-600" : s === "red" ? "text-red-600" : "text-slate-800"), children: n })
  ] });
}
const X = {
  agent: "bg-blue-500",
  tool: "bg-purple-500",
  llm: "bg-amber-500",
  retrieval: "bg-emerald-500",
  guardrail: "bg-red-400",
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
  const l = s > 0 ? r / s * 100 : 0, d = s > 0 ? Math.max(e.durationMs / s * 100, 0.5) : 0;
  return /* @__PURE__ */ a(
    "div",
    {
      className: N(
        "flex items-center h-7 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100",
        u && "bg-blue-50"
      ),
      onClick: () => o(e),
      children: [
        /* @__PURE__ */ a("div", { className: "w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden", children: [
          /* @__PURE__ */ t("span", { style: { marginLeft: n * 12 }, className: "shrink-0" }),
          /* @__PURE__ */ t("span", { className: N("w-2 h-2 rounded-sm shrink-0", X[e.kind]) }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-700 truncate", children: e.name })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 relative h-full flex items-center", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: N("absolute h-4 rounded-sm opacity-80", X[e.kind]),
              style: { left: `${l}%`, width: `${d}%`, minWidth: 2 }
            }
          ),
          /* @__PURE__ */ a(
            "span",
            {
              className: "absolute text-[10px] text-slate-500",
              style: { left: `${l + d + 0.5}%` },
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
    const d = l.parentSpanId ?? "__root__";
    r.has(d) || r.set(d, []), r.get(d).push(l);
  }
  function o(l, d) {
    const g = l ?? "__root__", S = r.get(g) ?? r.get(l) ?? [];
    for (const i of S)
      s.push({ span: i, depth: d }), o(i.spanId, d + 1);
  }
  const u = e.find((l) => l.spanId === n);
  return u ? (s.push({ span: u, depth: 0 }), o(u.spanId, 1)) : o(void 0, 0), s;
}
function Re({ trace: e, className: n }) {
  const [s, r] = w(null), o = Oe(e.spans, e.rootSpanId), u = new Date(e.startedAt).getTime();
  return /* @__PURE__ */ a("div", { className: N("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
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
      /* @__PURE__ */ t("span", { className: N("w-2 h-2 rounded-sm", X[l]) }),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-500", children: ie[l] })
    ] }, l)) }),
    /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto", children: o.map(({ span: l, depth: d }) => {
      const g = new Date(l.startTime).getTime() - u;
      return /* @__PURE__ */ t(
        Me,
        {
          span: l,
          depth: d,
          totalMs: e.totalDurationMs,
          startOffset: g,
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
        /* @__PURE__ */ t("div", { className: N(
          "font-medium",
          s.status === "ok" && "text-emerald-600",
          s.status === "error" && "text-red-600"
        ), children: s.status }),
        /* @__PURE__ */ t("div", { className: "text-slate-500", children: "Span ID" }),
        /* @__PURE__ */ t("div", { className: "text-slate-700 font-mono", children: s.spanId })
      ] }),
      Object.keys(s.attributes).length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "text-[10px] text-slate-400 uppercase mb-1", children: "Attributes" }),
        /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-slate-600 space-y-0.5", children: Object.entries(s.attributes).map(([l, d]) => /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ a("span", { className: "text-slate-400", children: [
            l,
            ":"
          ] }),
          " ",
          String(d)
        ] }, l)) })
      ] })
    ] })
  ] });
}
function at({ agentId: e, trace: n, onBack: s, className: r }) {
  const { getAgent: o, getMetrics: u } = Y(), l = o(e), d = u(e);
  return l ? /* @__PURE__ */ a("div", { className: N("space-y-6", r), children: [
    /* @__PURE__ */ a("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ a("div", { children: [
        s && /* @__PURE__ */ t("button", { className: "text-xs text-blue-500 hover:underline mb-2 block", onClick: s, children: "← Back" }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", children: "🤖" }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-slate-900", children: l.name }),
            /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 font-mono", children: l.id })
          ] })
        ] }),
        l.description && /* @__PURE__ */ t("p", { className: "text-sm text-slate-600 mt-2", children: l.description })
      ] }),
      /* @__PURE__ */ t(De, { status: l.status })
    ] }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ a(z, { title: "Configuration", children: [
        /* @__PURE__ */ t(O, { label: "Protocol", value: l.protocol.toUpperCase() }),
        /* @__PURE__ */ t(O, { label: "Model", value: l.model }),
        /* @__PURE__ */ t(O, { label: "Endpoint", value: l.endpoint, mono: !0 })
      ] }),
      /* @__PURE__ */ t(z, { title: "Tools", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: l.tools.map((g) => /* @__PURE__ */ t("span", { className: "text-[11px] px-2 py-0.5 bg-slate-100 rounded font-mono text-slate-700", children: g }, g)) }) }),
      /* @__PURE__ */ t(z, { title: "Guardrails", children: /* @__PURE__ */ t(pe, { guardrails: l.guardrails }) }),
      d && /* @__PURE__ */ a(z, { title: "Metrics (24h)", children: [
        /* @__PURE__ */ t(O, { label: "Invocations", value: String(d.invocationsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Errors", value: String(d.errorsLast24h) }),
        /* @__PURE__ */ t(O, { label: "Avg Latency", value: `${d.avgLatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "P99 Latency", value: `${d.p99LatencyMs}ms` }),
        /* @__PURE__ */ t(O, { label: "Tokens In", value: d.tokensInLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Tokens Out", value: d.tokensOutLast24h.toLocaleString() }),
        /* @__PURE__ */ t(O, { label: "Guardrail Blocks", value: String(d.guardrailBlocksLast24h) })
      ] })
    ] }),
    n && /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ t("h3", { className: "text-sm font-medium text-slate-700 mb-2", children: "Recent Trace" }),
      /* @__PURE__ */ t(Re, { trace: n })
    ] })
  ] }) : /* @__PURE__ */ a("div", { className: N("text-center py-12", r), children: [
    /* @__PURE__ */ a("div", { className: "text-slate-400 text-sm", children: [
      "Agent not found: ",
      e
    ] }),
    s && /* @__PURE__ */ t("button", { className: "mt-2 text-xs text-blue-500 hover:underline", onClick: s, children: "Back to dashboard" })
  ] });
}
function De({ status: e }) {
  return /* @__PURE__ */ t("span", { className: N("text-xs font-medium px-2.5 py-1 rounded-full", {
    healthy: "bg-emerald-100 text-emerald-800",
    degraded: "bg-amber-100 text-amber-800",
    offline: "bg-red-100 text-red-800",
    deploying: "bg-blue-100 text-blue-800"
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
    /* @__PURE__ */ t("span", { className: N("text-slate-800", s && "font-mono text-[11px] break-all text-right max-w-[60%]"), children: n })
  ] });
}
function qe(e, n) {
  const s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const p of e)
    s.set(p.id, 0), r.set(p.id, 0);
  for (const p of n)
    s.set(p.from, (s.get(p.from) ?? 0) + 1), r.set(p.to, (r.get(p.to) ?? 0) + 1);
  const o = e.filter((p) => (r.get(p.id) ?? 0) === 0), u = e.filter((p) => (r.get(p.id) ?? 0) > 0 && (s.get(p.id) ?? 0) > 0), l = e.filter((p) => (s.get(p.id) ?? 0) === 0 && (r.get(p.id) ?? 0) > 0), d = [o, u, l].filter((p) => p.length > 0), g = [], S = 300, i = 120;
  for (let p = 0; p < d.length; p++) {
    const T = d[p], x = -((T.length - 1) * i) / 2;
    for (let y = 0; y < T.length; y++) {
      const k = T[y];
      g.push({
        id: k.id,
        position: { x: p * S, y: x + y * i },
        data: { label: k.name },
        type: "default",
        style: {
          background: k.status === "offline" ? "#fef2f2" : k.status === "degraded" ? "#fffbeb" : "#f0fdf4",
          border: `2px solid ${k.status === "offline" ? "#fecaca" : k.status === "degraded" ? "#fed7aa" : "#86efac"}`,
          borderRadius: 8,
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 500,
          width: 180
        }
      });
    }
  }
  return g;
}
function Pe(e, n) {
  const s = new Set(n.map((r) => r.id));
  return e.filter((r) => s.has(r.from) && s.has(r.to)).map((r, o) => {
    const l = n.find((d) => d.id === r.from)?.protocol === "a2a";
    return {
      id: `edge-${o}`,
      source: r.from,
      target: r.to,
      animated: l,
      style: { stroke: l ? "#3b82f6" : "#94a3b8", strokeWidth: l ? 2 : 1.5 },
      label: l ? "A2A" : void 0,
      labelStyle: { fontSize: 10, fill: "#64748b", fontWeight: 500 },
      markerEnd: { type: Ie.ArrowClosed, width: 16, height: 16, color: l ? "#3b82f6" : "#94a3b8" }
    };
  });
}
function Ge({
  agents: e,
  edges: n = [],
  onAgentClick: s,
  className: r
}) {
  const o = B(() => qe(e, n), [e, n]), u = B(() => Pe(n, e), [n, e]), l = (d, g) => {
    s?.(g.id);
  };
  return /* @__PURE__ */ t("div", { className: N("w-full h-[500px]", r), children: /* @__PURE__ */ a(
    ke,
    {
      nodes: o,
      edges: u,
      onNodeClick: l,
      fitView: !0,
      fitViewOptions: { padding: 0.3 },
      proOptions: { hideAttribution: !0 },
      children: [
        /* @__PURE__ */ t(Ae, { gap: 20, size: 1, color: "#e2e8f0" }),
        /* @__PURE__ */ t(Te, { showInteractive: !1 })
      ]
    }
  ) });
}
const $e = [
  { from: "orgiq-supervisor", to: "orgiq-search" },
  { from: "orgiq-supervisor", to: "orgiq-advisor" },
  { from: "orgiq-advisor", to: "orgiq-search" },
  { from: "orgiq-advisor", to: "orgiq-scoring" },
  { from: "orgiq-ingestion", to: "orgiq-graph-builder" },
  { from: "orgiq-graph-builder", to: "orgiq-scoring" }
];
function nt({ edges: e = $e, onAgentClick: n, className: s }) {
  const { agents: r } = Y(), o = r.filter((l) => l.protocol === "a2a"), u = r.filter((l) => l.protocol === "direct");
  return /* @__PURE__ */ a("div", { className: N("space-y-4", s), children: [
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
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-blue-500 inline-block" }),
          " A2A (animated)"
        ] }),
        /* @__PURE__ */ a("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ t("span", { className: "w-3 h-0.5 bg-slate-400 inline-block" }),
          " Direct"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "border border-slate-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ t(
      Ge,
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
  const [u, l] = w([]), [d, g] = w(""), [S, i] = w([]), [p, T] = w(void 0), [f, x] = w(n ?? null), [y, k] = w(null), [_, h] = w(!1), [C, U] = w(null), F = $(null), L = $(null), D = $(""), E = $([]), M = I(
    (m) => {
      l((c) => {
        const v = c.findIndex((A) => A.id === L.current);
        if (v === -1) return c;
        const b = [...c];
        return b[v] = m(b[v]), b;
      });
    },
    []
  ), j = I(
    (m, c) => {
      E.current = E.current.map(
        (v) => v.id === m ? c(v) : v
      ), i(
        (v) => v.map((b) => b.id === m ? c(b) : b)
      ), l(
        (v) => v.map((b) => ({
          ...b,
          toolCalls: b.toolCalls.map(
            (A) => A.id === m ? c(A) : A
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
          x(m.threadId), k(m.runId);
          break;
        }
        case "RUN_FINISHED": {
          h(!1), L.current && (M((c) => ({ ...c, isStreaming: !1 })), L.current = null), g("");
          break;
        }
        case "RUN_ERROR": {
          U(m.message), h(!1), L.current && (M((c) => ({ ...c, isStreaming: !1 })), L.current = null), g("");
          break;
        }
        case "STEP_STARTED":
        case "STEP_FINISHED":
          break;
        // ─── Text Messages ───────────────────────────────────────────────────
        case "TEXT_MESSAGE_START": {
          const c = m.messageId ?? re();
          L.current = c, D.current = "", E.current = [];
          const v = m.role;
          l((b) => [
            ...b,
            { id: c, role: v, content: "", isStreaming: !0, toolCalls: [] }
          ]);
          break;
        }
        case "TEXT_MESSAGE_CONTENT": {
          D.current += m.delta;
          const c = D.current;
          g(c), M((v) => ({ ...v, content: c }));
          break;
        }
        case "TEXT_MESSAGE_END": {
          M((c) => ({ ...c, isStreaming: !1 })), g(""), L.current = null;
          break;
        }
        case "TEXT_MESSAGE_CHUNK": {
          const c = m.messageId ?? L.current ?? re();
          if (L.current !== c) {
            L.current = c, D.current = "", E.current = [];
            const v = m.role ?? "assistant";
            l((b) => [
              ...b,
              { id: c, role: v, content: "", isStreaming: !0, toolCalls: [] }
            ]);
          }
          if (m.delta) {
            D.current += m.delta;
            const v = D.current;
            g(v), M((b) => ({ ...b, content: v }));
          }
          break;
        }
        // ─── Tool Calls ──────────────────────────────────────────────────────
        case "TOOL_CALL_START": {
          const c = {
            id: m.toolCallId,
            name: m.toolCallName,
            args: "",
            status: "streaming",
            startedAt: Date.now(),
            parentMessageId: m.parentMessageId
          };
          E.current = [...E.current, c], i((v) => [...v, c]), L.current && l(
            (v) => v.map(
              (b) => b.id === L.current ? { ...b, toolCalls: [...b.toolCalls, c] } : b
            )
          );
          break;
        }
        case "TOOL_CALL_ARGS": {
          j(m.toolCallId, (c) => ({
            ...c,
            args: c.args + m.delta
          }));
          break;
        }
        case "TOOL_CALL_END": {
          j(m.toolCallId, (c) => ({
            ...c,
            status: "completed",
            endedAt: Date.now()
          })), i((c) => c.filter((v) => v.id !== m.toolCallId));
          break;
        }
        case "TOOL_CALL_RESULT": {
          j(m.toolCallId, (c) => ({ ...c, result: m.content }));
          break;
        }
        case "TOOL_CALL_CHUNK": {
          const c = m.toolCallId;
          if (!c) break;
          const v = E.current.find((b) => b.id === c);
          if (!v && m.toolCallName) {
            const b = {
              id: c,
              name: m.toolCallName,
              args: m.delta ?? "",
              status: "streaming",
              startedAt: Date.now(),
              parentMessageId: m.parentMessageId
            };
            E.current = [...E.current, b], i((A) => [...A, b]), L.current && l(
              (A) => A.map(
                (P) => P.id === L.current ? { ...P, toolCalls: [...P.toolCalls, b] } : P
              )
            );
          } else v && m.delta && j(c, (b) => ({ ...b, args: b.args + (m.delta ?? "") }));
          break;
        }
        // ─── State Management ────────────────────────────────────────────────
        case "STATE_SNAPSHOT": {
          T(m.snapshot);
          break;
        }
        case "STATE_DELTA": {
          T((c) => Ue(c, m.delta));
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
          M((c) => ({ ...c, reasoning: "" }));
          break;
        }
        case "REASONING_MESSAGE_CONTENT": {
          M((c) => ({
            ...c,
            reasoning: (c.reasoning ?? "") + m.delta
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
    [o, M, j]
  ), Q = I((m) => {
    const c = [], v = m.split(`
`);
    let b = "";
    for (const A of v) {
      if (A === "" || A.startsWith(":")) {
        if (A === "" && b) {
          try {
            c.push(JSON.parse(b));
          } catch {
          }
          b = "";
        }
        continue;
      }
      A.startsWith("data: ") && (b += A.slice(6));
    }
    return c;
  }, []), ee = I(() => {
    F.current?.abort(), h(!1), g(""), L.current && (M((m) => ({ ...m, isStreaming: !1 })), L.current = null), i([]);
  }, [M]), fe = I(
    async (m, c) => {
      F.current?.abort();
      const v = new AbortController();
      F.current = v, U(null), h(!0);
      const b = {
        id: re(),
        role: "user",
        content: m,
        isStreaming: !1,
        toolCalls: []
      };
      l((A) => [...A, b]);
      try {
        const A = await fetch(e, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            ...s
          },
          body: JSON.stringify({
            message: m,
            threadId: f ?? void 0,
            ...r,
            ...c?.extraBody
          }),
          signal: v.signal
        });
        if (!A.ok)
          throw new Error(`HTTP ${A.status}: ${A.statusText}`);
        const P = A.body?.getReader();
        if (!P) throw new Error("No response body");
        const be = new TextDecoder();
        let G = "";
        for (; ; ) {
          const { done: te, value: Ne } = await P.read();
          if (te) break;
          G += be.decode(Ne, { stream: !0 });
          const se = G.lastIndexOf(`

`);
          if (se !== -1) {
            const ve = G.slice(0, se + 2);
            G = G.slice(se + 2);
            for (const ye of Q(ve))
              Z(ye);
          }
        }
        if (G.trim())
          for (const te of Q(G + `

`))
            Z(te);
      } catch (A) {
        if (A instanceof Error && A.name === "AbortError") return;
        U(A instanceof Error ? A.message : "Stream failed"), h(!1), g("");
      }
    },
    [e, f, s, r, Q, Z]
  ), ge = I(
    (m, c) => {
      ee(), x(m), k(null), l(c), g(""), i([]), U(null), D.current = "", E.current = [], L.current = null;
    },
    [ee]
  ), xe = I(() => {
    F.current?.abort(), l([]), h(!1), g(""), i([]), T(void 0), x(null), k(null), U(null), D.current = "", E.current = [], L.current = null;
  }, []);
  return {
    messages: u,
    streamingText: d,
    activeToolCalls: S,
    state: p,
    threadId: f,
    runId: y,
    isStreaming: _,
    error: C,
    sendMessage: fe,
    cancelStream: ee,
    reset: xe,
    loadHistory: ge
  };
}
const He = {
  streaming: "⏳",
  completed: "✓",
  error: "✗"
};
function ce({ toolCall: e, className: n }) {
  const [s, r] = w(!1), o = e.endedAt != null ? e.endedAt - e.startedAt : null;
  return /* @__PURE__ */ a(
    "div",
    {
      className: N(
        "border rounded text-xs font-mono overflow-hidden",
        e.status === "streaming" && "border-blue-200 bg-blue-50/50",
        e.status === "completed" && "border-slate-200 bg-slate-50",
        e.status === "error" && "border-red-200 bg-red-50/50",
        n
      ),
      children: [
        /* @__PURE__ */ a(
          "button",
          {
            className: "flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-slate-100/50 transition-colors",
            onClick: () => r(!s),
            children: [
              /* @__PURE__ */ t("span", { className: N(
                e.status === "streaming" && "animate-pulse",
                e.status === "completed" && "text-emerald-600",
                e.status === "error" && "text-red-600"
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
            /* @__PURE__ */ t("pre", { className: "text-[11px] text-slate-600 whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto", children: he(e.args) })
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
function he(e) {
  try {
    return JSON.stringify(JSON.parse(e), null, 2);
  } catch {
    return e;
  }
}
function Be(e) {
  if (typeof e == "string") return he(e);
  try {
    return JSON.stringify(e, null, 2);
  } catch {
    return String(e);
  }
}
function Je({
  reasoning: e,
  isStreaming: n = !1,
  defaultOpen: s = !1,
  className: r
}) {
  const [o, u] = w(s);
  if (!e || !e.trim())
    return null;
  const l = e.split(/\s+/).filter(Boolean).length;
  return /* @__PURE__ */ a(
    "div",
    {
      className: N(
        "border border-dashed border-border-emphasis py-2 px-2.5 rounded max-w-full mb-1.5",
        r
      ),
      children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => u((d) => !d),
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
function Fe({
  messages: e,
  isStreaming: n,
  streamingText: s = "",
  activeToolCalls: r = [],
  error: o,
  onSend: u,
  onCancel: l,
  placeholder: d = "Send a message to the agent...",
  className: g
}) {
  const [S, i] = w(""), p = $(null);
  J(() => {
    p.current && (p.current.scrollTop = p.current.scrollHeight);
  }, [e, r, s]);
  function T() {
    const f = S.trim();
    !f || n || (u(f), i(""));
  }
  return /* @__PURE__ */ a("div", { className: N("flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden", g), children: [
    /* @__PURE__ */ a("div", { className: "px-4 py-3 border-b border-slate-200 flex items-center justify-between", children: [
      /* @__PURE__ */ t("span", { className: "font-semibold text-sm text-slate-800", children: "Agent Chat" }),
      n && /* @__PURE__ */ a("span", { className: "flex items-center gap-1.5 text-xs text-blue-600", children: [
        /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" }),
        "Streaming"
      ] })
    ] }),
    /* @__PURE__ */ a("div", { ref: p, className: "flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4", children: [
      e.length === 0 && !n && /* @__PURE__ */ t("div", { className: "text-sm text-slate-400 text-center mt-[60px]", children: "Messages will appear here as you interact with the agent..." }),
      e.map((f) => /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: N(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0",
              f.role === "user" ? "bg-[#6366f1]" : "bg-[#10b981]"
            ),
            children: f.role === "user" ? "U" : "AI"
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ t("span", { className: "font-semibold text-[13px] text-[#1a1a2e]", children: f.role === "user" ? "You" : "Agent" }) }),
          f.role === "assistant" && f.reasoning && /* @__PURE__ */ t(
            Je,
            {
              reasoning: f.reasoning,
              isStreaming: f.isStreaming && n,
              defaultOpen: !1
            }
          ),
          /* @__PURE__ */ a(
            "div",
            {
              className: N(
                "mt-1 py-2 px-3 text-[14px] text-[#334155] leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] whitespace-pre-wrap break-words",
                f.role === "user" ? "bg-[#eef2ff] rounded-[12px_4px_12px_12px]" : "bg-[#f1f5f9] rounded-[4px_12px_12px_12px]"
              ),
              children: [
                f.content,
                f.isStreaming && /* @__PURE__ */ t("span", { className: "inline-block animate-pulse ml-0.5 text-blue-500", children: "▊" })
              ]
            }
          ),
          f.toolCalls.length > 0 && /* @__PURE__ */ t("div", { className: "mt-1.5 flex flex-col gap-1", children: f.toolCalls.map((x) => /* @__PURE__ */ t(ce, { toolCall: x }, x.id)) })
        ] })
      ] }, f.id)),
      r.length > 0 && /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col gap-1", children: r.map((f) => /* @__PURE__ */ t(ce, { toolCall: f }, f.id)) })
      ] }),
      s && !e.some((f) => f.isStreaming) && /* @__PURE__ */ a("div", { className: "flex gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: de, children: "AI" }),
        /* @__PURE__ */ a("div", { className: "flex-1 mt-1 py-2 px-3 bg-[#f1f5f9] rounded-[4px_12px_12px_12px] text-[14px] text-[#334155] leading-[1.5] whitespace-pre-wrap break-words", children: [
          s,
          /* @__PURE__ */ t("span", { className: "inline-block animate-pulse ml-0.5 text-blue-500", children: "▊" })
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
    o && /* @__PURE__ */ t("div", { className: "px-4 py-2 bg-red-50 border-t border-red-100 text-xs text-red-700", children: o }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-2 p-3 border-t border-slate-200 bg-slate-50/50", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: S,
          onChange: (f) => i(f.target.value),
          onKeyDown: (f) => f.key === "Enter" && T(),
          disabled: n,
          placeholder: n ? "Waiting for response..." : d,
          className: N(
            "flex-1 text-sm px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all bg-white",
            n && "bg-slate-50 text-slate-400"
          )
        }
      ),
      n && l ? /* @__PURE__ */ t(
        "button",
        {
          onClick: l,
          className: "text-sm px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium",
          children: "Stop"
        }
      ) : /* @__PURE__ */ t(
        "button",
        {
          onClick: T,
          disabled: !S.trim() || n,
          className: N(
            "text-sm px-4 py-2.5 rounded-lg transition-colors font-medium",
            !S.trim() || n ? "bg-slate-100 text-slate-400 cursor-default" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
function rt({ defaultAgentId: e, baseUrl: n = "/api/agents", className: s }) {
  const { agents: r } = Y(), [o, u] = w(e ?? r[0]?.id ?? ""), [l, d] = w([]), g = `${n}/${o}/invoke`, { messages: S, isStreaming: i, streamingText: p, activeToolCalls: T, error: f, sendMessage: x, cancelStream: y, reset: k } = je({
    url: g,
    onEvent: (h) => d((C) => [...C, h])
  }), _ = r.find((h) => h.id === o);
  return /* @__PURE__ */ a("div", { className: N("flex h-full min-h-[500px]", s), children: [
    /* @__PURE__ */ a("div", { className: "w-[240px] border-r border-[#e2e8f0] bg-white flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t("div", { className: "py-3 px-4 border-b border-[#e2e8f0] font-semibold text-[13px] text-[#64748b] uppercase tracking-[0.05em]", children: "Agents" }),
      /* @__PURE__ */ t("div", { className: "flex-1 py-2 overflow-y-auto", children: r.map((h) => /* @__PURE__ */ a(
        "div",
        {
          onClick: () => {
            u(h.id), k(), d([]);
          },
          className: N(
            "py-2 px-4 flex items-center justify-between transition-all duration-150 ease-in-out border-l-[3px]",
            h.status === "offline" ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            o === h.id ? "bg-[#f1f5f9] border-l-[#6366f1]" : "bg-transparent border-l-transparent"
          ),
          children: [
            /* @__PURE__ */ a("div", { className: "min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[14px] text-[#1a1a2e] truncate", children: h.name }),
              /* @__PURE__ */ a("div", { className: "text-[11px] text-[#94a3b8]", children: [
                h.protocol.toUpperCase(),
                " · ",
                h.model
              ] })
            ] }),
            /* @__PURE__ */ t(
              "span",
              {
                className: N(
                  "w-2 h-2 rounded-full shrink-0",
                  h.status === "healthy" ? "bg-[#10b981]" : h.status === "degraded" ? "bg-[#f59e0b]" : "bg-[#ef4444]"
                )
              }
            )
          ]
        },
        h.id
      )) }),
      _ && /* @__PURE__ */ a("div", { className: "py-3 px-4 border-t border-[#e2e8f0] text-[11px]", children: [
        /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1.5", children: "Tools:" }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: _.tools.map((h) => /* @__PURE__ */ t(
          "span",
          {
            className: "py-0.5 px-1.5 bg-[#f1f5f9] rounded text-[10px] text-[#475569] font-mono",
            children: h
          },
          h
        )) }),
        _.guardrails.length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[#64748b] mb-1", children: "Guardrails:" }),
          _.guardrails.map((h) => /* @__PURE__ */ a("div", { className: "text-[10px] text-[#d97706] font-mono", children: [
            "🛡️ ",
            h
          ] }, h))
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "py-2 px-4 border-t border-[#e2e8f0]", children: /* @__PURE__ */ t(
        "button",
        {
          onClick: () => {
            k(), d([]);
          },
          className: "w-full py-1.5 text-[12px] text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] rounded-md cursor-pointer",
          children: "Reset Session"
        }
      ) })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ t(
        Fe,
        {
          messages: S,
          isStreaming: i,
          streamingText: p,
          activeToolCalls: T,
          error: f,
          onSend: x,
          onCancel: y,
          className: "flex-1 border-0 rounded-none"
        }
      ),
      l.length > 0 && /* @__PURE__ */ a("details", { className: "border-t border-[#e2e8f0] bg-[#f8fafc]", children: [
        /* @__PURE__ */ a("summary", { className: "py-2 px-4 text-[12px] text-[#64748b] cursor-pointer font-medium", children: [
          "Event Log (",
          l.length,
          " events)"
        ] }),
        /* @__PURE__ */ t("div", { className: "max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]", children: l.map((h, C) => /* @__PURE__ */ a("div", { className: "flex gap-2 text-[#475569] py-px", children: [
          /* @__PURE__ */ t("span", { className: "text-[#94a3b8] w-5 text-right shrink-0", children: C + 1 }),
          /* @__PURE__ */ t("span", { className: "text-[#1e293b] w-[150px] shrink-0 font-medium", children: h.type }),
          /* @__PURE__ */ t("span", { className: "text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap", children: h.type === "TEXT_MESSAGE_CONTENT" || h.type === "TOOL_CALL_ARGS" ? `"${h.delta.slice(0, 60)}"` : h.type === "TEXT_MESSAGE_CHUNK" && h.delta ? `"${h.delta.slice(0, 60)}"` : h.type === "TOOL_CALL_START" ? h.toolCallName : h.type === "RUN_ERROR" ? h.message : "" })
        ] }, C)) })
      ] })
    ] })
  ] });
}
function lt({
  baseUrl: e,
  pollIntervalMs: n = 3e4,
  enabled: s = !0
} = {}) {
  const [r, o] = w(V), [u, l] = w(!1), [d, g] = w(null), S = I(async () => {
    if (!e) {
      o(V);
      return;
    }
    l(!0), g(null);
    try {
      const x = await fetch(`${e}/agents`);
      if (!x.ok) throw new Error(`HTTP ${x.status}`);
      const y = await x.json();
      o(y);
    } catch (x) {
      g(x instanceof Error ? x.message : "Failed to fetch agents");
    } finally {
      l(!1);
    }
  }, [e]);
  J(() => {
    if (!s || (S(), !e || n <= 0)) return;
    const x = setInterval(S, n);
    return () => clearInterval(x);
  }, [s, S, e, n]);
  const i = I(
    (x) => r.find((y) => y.id === x),
    [r]
  ), p = r.filter((x) => x.status === "healthy").length, T = r.filter((x) => x.status === "degraded").length, f = r.filter((x) => x.status === "offline").length;
  return {
    agents: r,
    isLoading: u,
    error: d,
    refresh: S,
    getAgent: i,
    healthyCount: p,
    degradedCount: T,
    offlineCount: f
  };
}
function ot({
  baseUrl: e,
  agentId: n,
  pollIntervalMs: s = 6e4,
  enabled: r = !0
} = {}) {
  const [o, u] = w(W), [l, d] = w(!1), [g, S] = w(null), i = I(async () => {
    if (!e) {
      u(W);
      return;
    }
    d(!0), S(null);
    try {
      const y = n ? `${e}/agents/${n}/metrics` : `${e}/agents/metrics`, k = await fetch(y);
      if (!k.ok) throw new Error(`HTTP ${k.status}`);
      const _ = await k.json();
      u(_);
    } catch (y) {
      S(y instanceof Error ? y.message : "Failed to fetch metrics");
    } finally {
      d(!1);
    }
  }, [e, n]);
  J(() => {
    if (!r || (i(), !e || s <= 0)) return;
    const y = setInterval(i, s);
    return () => clearInterval(y);
  }, [r, i, e, s]);
  const p = I(
    (y) => o.find((k) => k.agentId === y),
    [o]
  ), T = B(
    () => o.reduce((y, k) => y + k.invocationsLast24h, 0),
    [o]
  ), f = B(
    () => o.reduce((y, k) => y + k.errorsLast24h, 0),
    [o]
  ), x = B(() => o.length === 0 ? 0 : Math.round(o.reduce((y, k) => y + k.avgLatencyMs, 0) / o.length), [o]);
  return {
    metrics: o,
    isLoading: l,
    error: g,
    refresh: i,
    getMetricsForAgent: p,
    totalInvocations24h: T,
    totalErrors24h: f,
    avgLatencyMs: x
  };
}
function ue() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function it({
  baseUrl: e,
  participants: n
} = {}) {
  const [s, r] = w(null), [o, u] = w([]), l = $(null), d = I((i) => {
    const p = `a2a-${ue()}`;
    l.current = p;
    const T = {
      sessionId: p,
      participants: i,
      messages: [],
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "active"
    };
    r(T), u([]);
  }, []), g = I(
    (i, p, T) => {
      if (!s) return;
      const f = {
        id: `msg-${ue()}`,
        from: i,
        to: p,
        content: T,
        protocol: "a2a",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      u((x) => [...x, f]), r(
        (x) => x && { ...x, messages: [...x.messages, f] }
      );
    },
    [s]
  ), S = I(() => {
    r((i) => i && { ...i, status: "completed" }), l.current = null;
  }, []);
  return n && !s && d(n), {
    session: s,
    messages: o,
    isActive: s?.status === "active",
    startSession: d,
    sendMessage: g,
    endSession: S
  };
}
function ct({ decisions: e, className: n, maxItems: s = 50 }) {
  const r = e.slice(0, s);
  return /* @__PURE__ */ a("div", { className: N("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
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
          className: N(
            "shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold",
            o.decision === "allow" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
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
      /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-400 shrink-0", children: ze(o.timestamp) })
    ] }, o.id)) })
  ] });
}
function ze(e) {
  try {
    const n = new Date(e);
    return `${n.getHours().toString().padStart(2, "0")}:${n.getMinutes().toString().padStart(2, "0")}:${n.getSeconds().toString().padStart(2, "0")}`;
  } catch {
    return "";
  }
}
function dt({ entries: e, className: n, onDelete: s }) {
  const [r, o] = w("all"), [u, l] = w(""), d = e.filter((i) => !(r !== "all" && i.scope !== r || u && !i.key.toLowerCase().includes(u.toLowerCase()) && !i.value.toLowerCase().includes(u.toLowerCase()))), g = e.filter((i) => i.scope === "session").length, S = e.filter((i) => i.scope === "long-term").length;
  return /* @__PURE__ */ a("div", { className: N("border border-slate-200 rounded-lg overflow-hidden bg-white", n), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-700", children: "Memory Inspector" }),
      /* @__PURE__ */ a("span", { className: "text-[10px] text-slate-400", children: [
        g,
        " session · ",
        S,
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
          className: "flex-1 text-[11px] px-2 py-1 border border-slate-200 rounded outline-none focus:border-blue-400"
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex text-[10px] border border-slate-200 rounded overflow-hidden", children: ["all", "session", "long-term"].map((i) => /* @__PURE__ */ t(
        "button",
        {
          className: N(
            "px-2 py-0.5 transition-colors",
            r === i ? "bg-blue-500 text-white" : "text-slate-500 hover:bg-slate-100"
          ),
          onClick: () => o(i),
          children: i
        },
        i
      )) })
    ] }),
    d.length === 0 ? /* @__PURE__ */ t("div", { className: "px-3 py-6 text-center text-xs text-slate-400", children: e.length === 0 ? "No memory entries" : "No matches" }) : /* @__PURE__ */ t("div", { className: "max-h-[300px] overflow-y-auto divide-y divide-slate-100", children: d.map((i) => /* @__PURE__ */ a("div", { className: "px-3 py-2 group", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between mb-0.5", children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: N(
                "text-[9px] uppercase px-1 py-0.5 rounded font-medium",
                i.scope === "session" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
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
            className: "text-[10px] text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: () => s(i.id),
            children: "delete"
          }
        )
      ] }),
      /* @__PURE__ */ t("pre", { className: "text-[11px] text-slate-600 font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto", children: Ke(i.value) }),
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mt-0.5 text-[10px] text-slate-400", children: [
        /* @__PURE__ */ a("span", { children: [
          "Created ",
          Ve(i.createdAt)
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
function Ke(e) {
  try {
    return JSON.stringify(JSON.parse(e), null, 2);
  } catch {
    return e;
  }
}
function Ve(e) {
  try {
    return new Date(e).toLocaleString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return e;
  }
}
export {
  Je as AgUiReasoningBlock,
  Ce as AgentCard,
  at as AgentDetailPage,
  Ge as AgentFlowCanvas,
  nt as AgentFlowPage,
  rt as AgentInvokePage,
  st as AgentsDashboardPage,
  tt as AgentsLayout,
  Le as AgentsProvider,
  pe as GuardrailBadge,
  dt as MemoryInspector,
  ct as PolicyDecisionLog,
  Fe as StreamingChatPanel,
  ce as ToolCallRenderer,
  Re as TraceTimeline,
  V as fixtureAgents,
  W as fixtureMetrics,
  et as fixtureTrace,
  it as useA2ASession,
  je as useAgUiStream,
  ot as useAgentMetrics,
  lt as useAgentRegistry,
  Y as useAgentsContext
};
