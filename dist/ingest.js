import { jsxs as r, jsx as e, Fragment as Q } from "react/jsx-runtime";
import { useMemo as L, useState as I, useCallback as A, useEffect as B, useRef as ae } from "react";
import { useNavigate as V, useParams as be } from "react-router";
import { e as G, c as le, h as ge, g as ye, d as ce, a as ve, i as Ne, b as we, u as Ie, f as Se } from "./useSyncConflicts-DruS2duy.js";
import { C as _ } from "./Chip-BXdhqVFm.js";
import { E as q } from "./EmptyState-C3KCJ6Ae.js";
import { S as P } from "./SkeletonCard-C89GWQ3p.js";
import { c as E } from "./cn-B6yFEsav.js";
import { u as K } from "./IdentityContext-CLalsm_M.js";
import { u as pe } from "./useDocumentTypes-C29MkgPl.js";
import { ResponsiveContainer as ke, LineChart as Ce, YAxis as Te, Tooltip as $e, Line as De } from "recharts";
function Pe(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function Ee(t) {
  return Date.now() - new Date(t).getTime() < 864e5;
}
function Re(t) {
  return Date.now() - new Date(t).getTime() < 36e5;
}
const Ae = 50;
function Ct() {
  const t = V(), { sources: a, loading: d, error: u, refresh: x } = G(), { items: n, loading: y, error: b, refresh: w } = le(), S = d || y, h = u || b, s = L(() => {
    const N = a.filter(($) => $.status === "active").length, p = a.filter(($) => $.status === "paused").length, o = a.filter(($) => $.status === "error").length, m = n.filter(($) => $.status !== "done" && $.status !== "failed").length, g = n.filter(($) => $.status === "done" && Ee($.updatedAt)).length, D = n.filter(($) => $.status === "failed").length;
    return { total: a.length, active: N, paused: p, errored: o, queued: m, recentDone: g, failed: D };
  }, [a, n]), v = L(() => n.filter((N) => N.status === "done").sort((N, p) => p.updatedAt.localeCompare(N.updatedAt)).slice(0, 5), [n]), k = L(() => {
    const N = [];
    for (const o of a)
      o.status === "error" && N.push({
        id: `source-error-${o.sourceId}`,
        level: "critical",
        message: `Source "${o.name}" is in error state — check its config or last sync log.`
      });
    const p = n.filter((o) => Re(o.updatedAt));
    if (p.length >= 5) {
      const o = p.filter((g) => g.status === "failed").length, m = o / p.length;
      m > 0.1 && N.push({
        id: "failure-rate-1h",
        level: "warning",
        message: `Last-hour failure rate is ${(m * 100).toFixed(0)}% (${o} of ${p.length} items failed).`
      });
    }
    return s.queued > Ae && N.push({
      id: "queue-depth",
      level: "warning",
      message: `Queue depth is ${s.queued} items — sources may be ingesting faster than the engine can drain.`
    }), N;
  }, [a, n, s.queued]), f = () => {
    x(), w();
  };
  return S && a.length === 0 && n.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "ingest-dashboard", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest" }) }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5", children: [
      /* @__PURE__ */ e(P, { height: 90 }),
      /* @__PURE__ */ e(P, { height: 90 }),
      /* @__PURE__ */ e(P, { height: 90 }),
      /* @__PURE__ */ e(P, { height: 90 })
    ] }),
    /* @__PURE__ */ e(P, { height: 200 })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": "ingest-dashboard", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest" }),
      /* @__PURE__ */ r("div", { className: "flex gap-2.5 items-center", children: [
        null,
        /* @__PURE__ */ e(
          "button",
          {
            className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            onClick: () => t("/ingest/sources"),
            "data-testid": "add-source-btn",
            children: "Add Source"
          }
        )
      ] })
    ] }),
    h && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Failed to load ingest data." }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: f,
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] }),
    k.length > 0 && /* @__PURE__ */ e("div", { "data-testid": "alerts-strip", className: "flex flex-col gap-1.5 mb-3", children: k.map((N) => /* @__PURE__ */ r(
      "div",
      {
        "data-testid": `alert-${N.id}`,
        className: E(
          "px-3 py-2 rounded-md text-[13px] border",
          N.level === "critical" ? "bg-[#fef2f2] border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-[#fefce8] border-[#fbbf24] text-[#92400e]"
        ),
        children: [
          /* @__PURE__ */ e("strong", { children: N.level === "critical" ? "⛔" : "⚠" }),
          " ",
          N.message
        ]
      },
      N.id
    )) }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5", children: [
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "Sources" }),
        /* @__PURE__ */ e("span", { className: "text-[28px] font-bold text-text-primary leading-none", children: s.total }),
        /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary", children: [
          s.active,
          " active, ",
          s.paused,
          " paused",
          s.errored > 0 ? `, ${s.errored} error` : ""
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "In Queue" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", s.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"), children: s.queued }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items processing" })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "Completed (24h)" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", s.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"), children: s.recentDone }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items ingested" })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "Errors" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", s.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"), children: s.failed }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items failed" })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4 mb-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Recent Activity" }),
      v.length === 0 ? /* @__PURE__ */ e(
        q,
        {
          icon: "📥",
          title: "No recent activity",
          body: "Completed ingest items will appear here."
        }
      ) : /* @__PURE__ */ e("div", { children: v.map((N) => /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3 py-2 border-b border-border", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0", title: N.sourcePath, children: N.sourcePath }),
        /* @__PURE__ */ e(_, { tone: "success", size: "xs", children: "done" }),
        /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0", children: Pe(N.updatedAt) })
      ] }, N.itemId)) })
    ] })
  ] });
}
function Me(t) {
  switch (t) {
    case "active":
      return "success";
    case "paused":
      return "warning";
    case "error":
      return "danger";
    default:
      return "neutral";
  }
}
function je(t) {
  switch (t) {
    case "local":
      return "Local";
    case "s3":
      return "S3";
    case "google-drive":
      return "Google Drive";
    case "webhook":
      return "Webhook";
    default:
      return t;
  }
}
function Le(t) {
  switch (t) {
    case "s3":
      return "info";
    case "google-drive":
      return "purple";
    case "webhook":
      return "caution";
    case "local":
      return "neutral";
    default:
      return "neutral";
  }
}
function _e(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : a < 2592e5 ? `${Math.floor(a / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Tt() {
  const t = V(), { sources: a, loading: d, error: u, refresh: x, deleteSource: n, triggerSync: y } = G(), [b, w] = I(() => /* @__PURE__ */ new Set()), S = A(async (s) => {
    w((v) => new Set(v).add(s)), await y(s), w((v) => {
      const k = new Set(v);
      return k.delete(s), k;
    }), x();
  }, [y, x]), h = A(async (s) => {
    confirm(`Delete source "${s.name}"? This cannot be undone.`) && await n(s.sourceId);
  }, [n]);
  return d && a.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "sources-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sources" }) }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": "sources-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sources" }),
        /* @__PURE__ */ r("span", { className: "text-[13px] text-text-tertiary", children: [
          a.length,
          " source",
          a.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
          onClick: () => t("/ingest/sources"),
          "data-testid": "add-source-btn",
          children: "Add Source"
        }
      )
    ] }),
    u && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Failed to load sources." }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            x();
          },
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] }),
    !u && a.length === 0 ? /* @__PURE__ */ e(
      q,
      {
        icon: "📂",
        title: "No sources configured",
        body: "Add a data source to start ingesting files into the system.",
        actionLabel: "Add Source",
        onAction: () => t("/ingest/sources")
      }
    ) : /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Name" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Type" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Status" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Last Sync" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Files Synced" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: a.map((s) => /* @__PURE__ */ r(
        "tr",
        {
          className: "border-b border-border hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "p-2 font-medium text-text-primary", children: /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `source-name-link-${s.sourceId}`,
                onClick: () => t(`/ingest/sources/${s.sourceId}`),
                className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
                children: s.name
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(_, { tone: Le(s.type), size: "xs", children: je(s.type) }) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(_, { tone: Me(s.status), size: "sm", children: s.status }) }),
            /* @__PURE__ */ e("td", { className: "p-2 text-text-secondary", children: s.lastSyncAt ? _e(s.lastSyncAt) : "Never" }),
            /* @__PURE__ */ e(
              "td",
              {
                "data-testid": `source-files-synced-${s.sourceId}`,
                className: "p-2 font-mono text-xs text-text-secondary",
                children: s.lastSyncStats ? /* @__PURE__ */ r("span", { children: [
                  s.lastSyncStats.filesFound,
                  s.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ r("span", { className: "text-text-tertiary", children: [
                    " · ",
                    s.lastSyncStats.filesNew,
                    " new"
                  ] }) : null
                ] }) : "—"
              }
            ),
            /* @__PURE__ */ e("td", { className: "p-2 text-right", children: /* @__PURE__ */ r("div", { className: "flex gap-1.5 justify-end", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  className: E(
                    "px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]",
                    b.has(s.sourceId) || s.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"
                  ),
                  disabled: b.has(s.sourceId) || s.status === "paused",
                  onClick: () => {
                    S(s.sourceId);
                  },
                  "data-testid": `sync-${s.sourceId}`,
                  children: b.has(s.sourceId) ? "Syncing..." : "Sync Now"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-[#fef2f2] cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
                  onClick: () => {
                    h(s);
                  },
                  "data-testid": `delete-${s.sourceId}`,
                  children: "Delete"
                }
              )
            ] }) })
          ]
        },
        s.sourceId
      )) })
    ] }) })
  ] });
}
const Oe = "", Fe = ["extension", "path", "mimeType", "tag", "name"], ze = ["eq", "contains", "regex", "startsWith"];
function ne({ rules: t, onChange: a }) {
  const { idToken: d } = K(), [u, x] = I(null), [n, y] = I(""), [b, w] = I(null), [S, h] = I(!1), [s, v] = I(null), k = A((i) => {
    x(i), v({ ...t[i] });
  }, [t]), f = A(() => {
    x(null), v(null);
  }, []), N = A(() => {
    if (u === null || !s) return;
    const i = [...t];
    i[u] = s, a(i), x(null), v(null);
  }, [u, s, t, a]), p = A(() => {
    const i = {
      pattern: "",
      documentTypeId: "",
      priority: t.length > 0 ? Math.max(...t.map((C) => C.priority)) + 1 : 1
    }, c = [...t, i];
    a(c), x(c.length - 1), v(i);
  }, [t, a]), o = A((i) => {
    const c = t.filter((C, F) => F !== i);
    a(c), u === i && (x(null), v(null));
  }, [t, a, u]), m = A((i) => {
    if (i === 0) return;
    const c = [...t];
    [c[i - 1], c[i]] = [c[i], c[i - 1]];
    const C = c[i - 1].priority;
    c[i - 1] = { ...c[i - 1], priority: c[i].priority }, c[i] = { ...c[i], priority: C }, a(c), u === i ? x(i - 1) : u === i - 1 && x(i);
  }, [t, a, u]), g = A((i) => {
    if (i >= t.length - 1) return;
    const c = [...t];
    [c[i], c[i + 1]] = [c[i + 1], c[i]];
    const C = c[i].priority;
    c[i] = { ...c[i], priority: c[i + 1].priority }, c[i + 1] = { ...c[i + 1], priority: C }, a(c), u === i ? x(i + 1) : u === i + 1 && x(i);
  }, [t, a, u]), D = A(async () => {
    if (n.trim()) {
      h(!0), w(null);
      try {
        const i = { "Content-Type": "application/json" };
        d && (i.Authorization = `Bearer ${d}`);
        const c = await fetch(`${Oe}/api/ingest/mapping/preview`, {
          method: "POST",
          headers: i,
          body: JSON.stringify({ path: n, rules: t })
        });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const C = await c.json();
        w(JSON.stringify(C, null, 2));
      } catch (i) {
        w(`Error: ${i instanceof Error ? i.message : String(i)}`);
      } finally {
        h(!1);
      }
    }
  }, [n, t, d]), $ = (i) => {
    const c = i.split(":");
    return c.length >= 3 ? { field: c[0], op: c[1], value: c.slice(2).join(":") } : { field: "path", op: "contains", value: i };
  }, O = (i, c, C) => `${i}:${c}:${C}`;
  return /* @__PURE__ */ r("div", { className: "flex flex-col gap-2.5", "data-testid": "mapping-rule-editor", children: [
    t.length === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-text-tertiary text-[13px]", children: "No mapping rules configured. Add one to get started." }) : /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full border-collapse text-xs", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Priority" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Condition" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Target Type ID" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Pipeline" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: t.map((i, c) => {
        const C = u === c && s !== null, F = $(i.pattern);
        if (C) {
          const j = $(s.pattern);
          return /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              "input",
              {
                className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none w-[50px]",
                type: "number",
                value: s.priority,
                onChange: (R) => v({ ...s, priority: Number(R.target.value) })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ r("div", { className: "flex gap-1 items-center flex-wrap", children: [
              /* @__PURE__ */ e(
                "select",
                {
                  className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none min-w-[90px] cursor-pointer",
                  value: j.field,
                  onChange: (R) => v({ ...s, pattern: O(R.target.value, j.op, j.value) }),
                  children: Fe.map((R) => /* @__PURE__ */ e("option", { value: R, children: R }, R))
                }
              ),
              /* @__PURE__ */ e(
                "select",
                {
                  className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none min-w-[90px] cursor-pointer",
                  value: j.op,
                  onChange: (R) => v({ ...s, pattern: O(j.field, R.target.value, j.value) }),
                  children: ze.map((R) => /* @__PURE__ */ e("option", { value: R, children: R }, R))
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none min-w-[100px] w-full",
                  value: j.value,
                  placeholder: "value",
                  onChange: (R) => v({ ...s, pattern: O(j.field, j.op, R.target.value) })
                }
              )
            ] }) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              "input",
              {
                className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none min-w-[80px] w-full",
                value: s.documentTypeId,
                placeholder: "document type id",
                onChange: (R) => v({ ...s, documentTypeId: R.target.value })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              "input",
              {
                className: "border border-border-field rounded-md px-2 py-1 text-xs bg-surface-inset text-text-primary outline-none min-w-[80px] w-full",
                value: s.pipelineId ?? "",
                placeholder: "(optional)",
                onChange: (R) => v({ ...s, pipelineId: R.target.value || void 0 })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right", children: /* @__PURE__ */ r("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: N, children: "Save" }),
              /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: f, children: "Cancel" })
            ] }) })
          ] }, c);
        }
        return /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold", children: i.priority }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ r("span", { className: "font-mono text-[11px]", children: [
            F.field,
            " ",
            F.op,
            ' "',
            F.value,
            '"'
          ] }) }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono", children: i.documentTypeId || "—" }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono", children: i.pipelineId ?? "—" }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right", children: /* @__PURE__ */ r("div", { className: "flex gap-1 justify-end", children: [
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => m(c), disabled: c === 0, title: "Move up", children: "↑" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => g(c), disabled: c === t.length - 1, title: "Move down", children: "↓" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => k(c), children: "Edit" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-[#fef2f2] cursor-pointer font-[inherit] text-[var(--color-state-failed)]", onClick: () => o(c), children: "Delete" })
          ] }) })
        ] }, c);
      }) })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "flex gap-2.5 items-center", children: /* @__PURE__ */ e(
      "button",
      {
        className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
        onClick: p,
        "data-testid": "add-rule-btn",
        children: "+ Add Rule"
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2 items-center mt-1", children: [
      /* @__PURE__ */ e(
        "input",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none flex-1",
          value: n,
          onChange: (i) => y(i.target.value),
          placeholder: "Enter a file path to preview mapping..."
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: E(
            "px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-[#eff6ff] cursor-pointer font-[inherit] text-primary self-start",
            (S || !n.trim()) && "opacity-50 cursor-not-allowed"
          ),
          onClick: () => {
            D();
          },
          disabled: S || !n.trim(),
          children: S ? "Checking..." : "Preview"
        }
      )
    ] }),
    b && /* @__PURE__ */ e("div", { className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words", children: b })
  ] });
}
const qe = ["15m", "1h", "6h", "24h"];
function Y({ points: t, color: a, testId: d }) {
  const u = t.map((x) => ({ at: x.at, value: x.value ?? null }));
  return /* @__PURE__ */ e("div", { "data-testid": d, className: "h-[60px]", children: /* @__PURE__ */ e(ke, { width: "100%", height: "100%", children: /* @__PURE__ */ r(Ce, { data: u, margin: { top: 4, right: 4, left: 4, bottom: 4 }, children: [
    /* @__PURE__ */ e(Te, { hide: !0 }),
    /* @__PURE__ */ e(
      $e,
      {
        cursor: !1,
        contentStyle: { fontSize: 11, padding: "4px 6px" },
        formatter: ((x) => [x, ""])
      }
    ),
    /* @__PURE__ */ e(
      De,
      {
        type: "monotone",
        dataKey: "value",
        stroke: a,
        strokeWidth: 2,
        dot: !1,
        connectNulls: !1,
        isAnimationActive: !1
      }
    )
  ] }) }) });
}
function X(t) {
  for (let a = t.length - 1; a >= 0; a--)
    if (t[a].value !== null) return t[a].value;
  return null;
}
function Be({ sourceId: t }) {
  const [a, d] = I("1h"), { metrics: u, error: x } = ge(t, a);
  return /* @__PURE__ */ r("div", { "data-testid": "source-slo-panel", className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2 gap-2", children: [
      /* @__PURE__ */ r("span", { className: "text-sm font-bold text-text-primary", children: [
        "Health (last ",
        a,
        ")"
      ] }),
      /* @__PURE__ */ e(
        "select",
        {
          "data-testid": "slo-window-picker",
          "aria-label": "Window",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[100px]",
          value: a,
          onChange: (n) => d(n.target.value),
          children: qe.map((n) => /* @__PURE__ */ r("option", { value: n, children: [
            "Last ",
            n
          ] }, n))
        }
      )
    ] }),
    x ? /* @__PURE__ */ r("div", { "data-testid": "slo-error", className: "px-3 py-2 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs", children: [
      "Couldn't load source metrics: ",
      x
    ] }) : null,
    u ? /* @__PURE__ */ r("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "p95 latency" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-latency-value", className: "text-base font-bold text-text-primary", children: (() => {
          const n = X(u.latencyP95);
          return n === null ? "—" : `${Math.round(n)} ms`;
        })() }),
        /* @__PURE__ */ e(Y, { points: u.latencyP95, color: "var(--color-state-completed)", testId: "slo-latency-chart" })
      ] }),
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "error rate" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-error-rate-value", className: "text-base font-bold text-text-primary", children: (() => {
          const n = X(u.errorRate);
          return n === null ? "—" : `${n.toFixed(1)}%`;
        })() }),
        /* @__PURE__ */ e(Y, { points: u.errorRate, color: "var(--color-state-failed)", testId: "slo-error-rate-chart" })
      ] }),
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "queue depth" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-queue-depth-value", className: "text-base font-bold text-text-primary", children: X(u.queueDepth) ?? 0 }),
        /* @__PURE__ */ e(Y, { points: u.queueDepth, color: "var(--color-state-awaiting)", testId: "slo-queue-depth-chart" })
      ] })
    ] }) : null
  ] });
}
const ie = [
  { label: "Manual only", cron: "" },
  { label: "Every 15 min", cron: "*/15 * * * *" },
  { label: "Hourly", cron: "0 * * * *" },
  { label: "Every 6 hours", cron: "0 */6 * * *" },
  { label: "Daily 2am", cron: "0 2 * * *" },
  { label: "Weekly Mon 6am", cron: "0 6 * * 1" }
], H = "";
function se(t) {
  switch (t) {
    case "active":
      return "success";
    case "paused":
      return "warning";
    case "error":
      return "danger";
    default:
      return "neutral";
  }
}
function We(t) {
  switch (t) {
    case "local":
      return "Local";
    case "s3":
      return "S3";
    case "google-drive":
      return "Google Drive";
    case "webhook":
      return "Webhook";
    default:
      return t;
  }
}
function He(t) {
  switch (t) {
    case "s3":
      return "info";
    case "google-drive":
      return "purple";
    case "webhook":
      return "caution";
    case "local":
      return "neutral";
    default:
      return "neutral";
  }
}
function Je(t) {
  return t < 1e3 ? `${t}ms` : t < 6e4 ? `${(t / 1e3).toFixed(1)}s` : `${(t / 6e4).toFixed(1)}m`;
}
function Ue(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : a < 2592e5 ? `${Math.floor(a / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Qe(t) {
  return Array.isArray(t) ? t.map((a) => {
    if (typeof a.pattern == "string") return a;
    const d = a.condition;
    return {
      pattern: d ? `${d.field ?? "path"}:${d.op ?? "contains"}:${d.value ?? ""}` : "",
      documentTypeId: a.targetTypeId ?? a.documentTypeId ?? "",
      pipelineId: a.pipelineId,
      priority: a.priority ?? 0
    };
  }) : [];
}
function $t() {
  const { id: t } = be(), a = V(), { idToken: d } = K(), { pipelines: u } = ye(), { types: x } = pe({ idToken: d }), [n, y] = I(null), [b, w] = I(!0), [S, h] = I(null), [s, v] = I(!1), [k, f] = I(!1), [N, p] = I(!1), [o, m] = I({}), [g, D] = I([]), [$, O] = I(""), [i, c] = I(""), [C, F] = I({}), [j, R] = I(!1), z = A(() => {
    const l = { "Content-Type": "application/json" };
    return d && (l.Authorization = `Bearer ${d}`), l;
  }, [d]), W = A(async () => {
    if (t) {
      w(!0), h(null);
      try {
        const l = await fetch(`${H}/api/ingest/sources/${t}`, { headers: z() });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        const T = await l.json(), M = { ...T, mappingRules: Qe(T.mappingRules ?? []) };
        y(M);
      } catch (l) {
        h(l instanceof Error ? l.message : String(l));
      } finally {
        w(!1);
      }
    }
  }, [t, z]);
  B(() => {
    W();
  }, [W]);
  const ue = A(() => {
    n && (m({ ...n.config }), D([...n.mappingRules]), O(n.syncSchedule ?? ""), c(n.defaultPipelineId ?? ""), F({ ...n.pipelineByDocType ?? {} }), v(!0));
  }, [n]), xe = A(() => {
    v(!1);
  }, []), me = A(async () => {
    if (!(!n || !t)) {
      p(!0);
      try {
        const l = {
          config: o,
          mappingRules: g,
          syncSchedule: $.trim() || null,
          defaultPipelineId: i.trim() || null,
          pipelineByDocType: C
        }, T = await fetch(`${H}/api/ingest/sources/${t}`, {
          method: "PUT",
          headers: z(),
          body: JSON.stringify(l)
        });
        if (!T.ok) throw new Error(`HTTP ${T.status}`);
        const M = await T.json();
        y(M), v(!1);
      } catch (l) {
        h(l instanceof Error ? l.message : String(l));
      } finally {
        p(!1);
      }
    }
  }, [n, t, o, g, $, i, C, z]), re = s && n !== null && (JSON.stringify(o) !== JSON.stringify(n.config) || JSON.stringify(g) !== JSON.stringify(n.mappingRules) || $ !== (n.syncSchedule ?? "") || i !== (n.defaultPipelineId ?? "") || JSON.stringify(C) !== JSON.stringify(n.pipelineByDocType ?? {}));
  B(() => {
    if (!re) return;
    const l = (T) => {
      T.preventDefault(), T.returnValue = "";
    };
    return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
  }, [re]);
  const fe = A(async () => {
    if (t) {
      f(!0);
      try {
        const l = await fetch(`${H}/api/ingest/sources/${t}/sync`, {
          method: "POST",
          headers: z()
        });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        await W();
      } catch (l) {
        h(l instanceof Error ? l.message : String(l));
      } finally {
        f(!1);
      }
    }
  }, [t, z, W]), he = A(async () => {
    if (!n || !t) return;
    const l = n.status === "paused" ? "active" : "paused";
    try {
      const T = await fetch(`${H}/api/ingest/sources/${t}`, {
        method: "PATCH",
        headers: z(),
        body: JSON.stringify({ status: l })
      });
      if (!T.ok) throw new Error(`HTTP ${T.status}`);
      const M = await T.json();
      y(M);
    } catch (T) {
      h(T instanceof Error ? T.message : String(T));
    }
  }, [n, t, z]);
  return b && !n ? /* @__PURE__ */ r("div", { "data-testid": "source-detail-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Source Detail" }) }),
    /* @__PURE__ */ e(P, { height: 120 }),
    /* @__PURE__ */ e(P, { height: 200 }),
    /* @__PURE__ */ e(P, { height: 100 })
  ] }) : S && !n ? /* @__PURE__ */ r("div", { "data-testid": "source-detail-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3", children: /* @__PURE__ */ e(
      "button",
      {
        className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
        onClick: () => a("/ingest/sources"),
        children: "Back to Sources"
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3", role: "alert", children: [
      /* @__PURE__ */ r("span", { className: "text-[13px] font-medium", children: [
        "Failed to load source: ",
        S
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            W();
          },
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] })
  ] }) : n ? /* @__PURE__ */ r("div", { "data-testid": "source-detail-page", className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-2.5", children: /* @__PURE__ */ e(
      "button",
      {
        className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
        onClick: () => a("/ingest/sources"),
        children: "Back to Sources"
      }
    ) }) }),
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: n.name }),
        /* @__PURE__ */ e(_, { tone: He(n.type), size: "sm", children: We(n.type) }),
        /* @__PURE__ */ e(_, { tone: se(n.status), size: "sm", children: n.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex gap-2.5 items-center", children: s ? /* @__PURE__ */ r(Q, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
            onClick: xe,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: E(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
              N && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => {
              me();
            },
            disabled: N,
            children: N ? "Saving..." : "Save Changes"
          }
        )
      ] }) : /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
          onClick: ue,
          children: "Edit"
        }
      ) })
    ] }),
    S && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: S }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => h(null),
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Dismiss"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Configuration" }),
      s ? /* @__PURE__ */ e("div", { children: Object.entries(o).map(([l, T]) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: l }),
        /* @__PURE__ */ e(
          "input",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none flex-1",
            value: typeof T == "string" ? T : JSON.stringify(T),
            onChange: (M) => m({ ...o, [l]: M.target.value })
          }
        )
      ] }, l)) }) : /* @__PURE__ */ r("div", { children: [
        Object.entries(n.config).map(([l, T]) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: l }),
          /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: typeof T == "string" ? T : JSON.stringify(T) })
        ] }, l)),
        Object.keys(n.config).length === 0 && /* @__PURE__ */ e("span", { className: "text-[13px] text-text-tertiary", children: "No configuration fields." })
      ] })
    ] }),
    n ? /* @__PURE__ */ e(Be, { sourceId: n.sourceId }) : null,
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Mapping Rules" }),
      s ? /* @__PURE__ */ e(ne, { rules: g, onChange: D }) : /* @__PURE__ */ e(ne, { rules: n.mappingRules, onChange: () => {
      } })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary", children: "Sync History" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: E(
              "px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]",
              k || n.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-[#eff6ff] text-primary"
            ),
            disabled: k || n.status === "paused",
            onClick: () => {
              fe();
            },
            "data-testid": "sync-now-btn",
            children: k ? "Syncing..." : "Sync Now"
          }
        )
      ] }),
      n.lastSyncAt ? /* @__PURE__ */ r(Q, { children: [
        /* @__PURE__ */ r("div", { className: "text-xs text-text-tertiary mb-2.5", children: [
          "Last synced: ",
          Ue(n.lastSyncAt),
          " (",
          new Date(n.lastSyncAt).toLocaleString(),
          ")"
        ] }),
        n.lastSyncStats && /* @__PURE__ */ r("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5", children: [
          /* @__PURE__ */ r("div", { className: "p-3 bg-surface-inset border border-border rounded-lg text-center", children: [
            /* @__PURE__ */ e("div", { className: "text-xl font-bold text-text-primary leading-none", children: n.lastSyncStats.filesDiscovered }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Found" })
          ] }),
          /* @__PURE__ */ r("div", { className: "p-3 bg-surface-inset border border-border rounded-lg text-center", children: [
            /* @__PURE__ */ e("div", { className: "text-xl font-bold text-[var(--color-state-completed)] leading-none", children: n.lastSyncStats.filesIngested }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Ingested" })
          ] }),
          /* @__PURE__ */ r("div", { className: "p-3 bg-surface-inset border border-border rounded-lg text-center", children: [
            /* @__PURE__ */ e("div", { className: "text-xl font-bold text-text-primary leading-none", children: n.lastSyncStats.filesSkipped }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Skipped" })
          ] }),
          /* @__PURE__ */ r("div", { className: "p-3 bg-surface-inset border border-border rounded-lg text-center", children: [
            /* @__PURE__ */ e("div", { className: E("text-xl font-bold leading-none", n.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"), children: n.lastSyncStats.filesFailed }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Errors" })
          ] }),
          /* @__PURE__ */ r("div", { className: "p-3 bg-surface-inset border border-border rounded-lg text-center", children: [
            /* @__PURE__ */ e("div", { className: "text-xl font-bold text-text-primary leading-none", children: Je(n.lastSyncStats.durationMs) }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Duration" })
          ] })
        ] })
      ] }) : /* @__PURE__ */ e("span", { className: "text-[13px] text-text-tertiary", children: "No sync history yet." })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Settings" }),
      s ? /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: "Sync Schedule" }),
          /* @__PURE__ */ r("div", { className: "flex gap-2 flex-1 flex-wrap", children: [
            /* @__PURE__ */ r(
              "select",
              {
                className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[160px]",
                value: ie.some((l) => l.cron === $) ? $ : "__custom__",
                onChange: (l) => {
                  l.target.value !== "__custom__" && O(l.target.value);
                },
                "data-testid": "schedule-preset",
                children: [
                  ie.map((l) => /* @__PURE__ */ e("option", { value: l.cron, children: l.label }, l.cron || "__manual__")),
                  /* @__PURE__ */ e("option", { value: "__custom__", children: "Custom…" })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "input",
              {
                className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none font-mono flex-1",
                value: $,
                onChange: (l) => O(l.target.value),
                placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
                "data-testid": "schedule-cron"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: "Default Pipeline" }),
          /* @__PURE__ */ r(
            "select",
            {
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none flex-1",
              value: i,
              onChange: (l) => c(l.target.value),
              "data-testid": "default-pipeline-picker",
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "— None (use mapping rule pipeline) —" }),
                u.map((l) => /* @__PURE__ */ r("option", { value: l.id, children: [
                  l.name,
                  " ",
                  l.status ? `(${l.status})` : ""
                ] }, l.id)),
                i && !u.some((l) => l.id === i) && /* @__PURE__ */ r("option", { value: i, children: [
                  i,
                  " (unknown)"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: "Pipeline overrides" }),
          /* @__PURE__ */ r("div", { className: "flex-1 flex flex-col gap-2", children: [
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                "data-testid": "overrides-toggle",
                onClick: () => R(!j),
                className: "bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]",
                children: [
                  j ? "▾" : "▸",
                  " Per-matched-DocType pipeline override (",
                  Object.keys(C).length,
                  ")"
                ]
              }
            ),
            j ? /* @__PURE__ */ r("div", { "data-testid": "overrides-section", className: "flex flex-col gap-1.5", children: [
              Object.keys(C).length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No overrides — every matched type uses the default pipeline." }) : Object.entries(C).map(([l, T]) => /* @__PURE__ */ r("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ e("span", { className: "flex-[0_0_160px] text-[13px]", children: x.find((M) => M.id === l)?.name ?? l }),
                /* @__PURE__ */ e(
                  "select",
                  {
                    "data-testid": `overrides-pipeline-${l}`,
                    className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none flex-1",
                    value: T,
                    onChange: (M) => F({ ...C, [l]: M.target.value }),
                    children: u.map((M) => /* @__PURE__ */ e("option", { value: M.id, children: M.name }, M.id))
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    "data-testid": `overrides-remove-${l}`,
                    onClick: () => {
                      const M = { ...C };
                      delete M[l], F(M);
                    },
                    className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer",
                    children: "Remove"
                  }
                )
              ] }, l)),
              /* @__PURE__ */ r(
                "select",
                {
                  "data-testid": "overrides-add-type",
                  className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none self-start",
                  value: "",
                  onChange: (l) => {
                    const T = l.target.value;
                    T && F({
                      ...C,
                      [T]: u[0]?.id ?? ""
                    });
                  },
                  children: [
                    /* @__PURE__ */ e("option", { value: "", children: "+ Add override for type…" }),
                    x.filter((l) => C[l.id] === void 0).map((l) => /* @__PURE__ */ e("option", { value: l.id, children: l.name }, l.id))
                  ]
                }
              )
            ] }) : null
          ] })
        ] })
      ] }) : /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: "Sync Schedule" }),
          /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: n.syncSchedule ?? "Manual (no schedule)" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: "Default Pipeline" }),
          /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: n.defaultPipelineId ? u.find((l) => l.id === n.defaultPipelineId)?.name ?? n.defaultPipelineId : "—" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: "Status" }),
          /* @__PURE__ */ r("span", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ e(_, { tone: se(n.status), size: "sm", children: n.status }),
            /* @__PURE__ */ e(
              "button",
              {
                className: E(
                  "px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white",
                  n.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"
                ),
                onClick: () => {
                  he();
                },
                children: n.status === "paused" ? "Resume" : "Pause"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) : null;
}
const Ve = "", te = [
  "queued",
  "mapping",
  "materializing",
  "triggering",
  "done"
];
function Ge(t) {
  switch (t) {
    case "queued":
      return "neutral";
    case "mapping":
      return "info";
    case "materializing":
      return "purple";
    case "triggering":
      return "caution";
    case "done":
      return "success";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}
function Ke(t) {
  switch (t) {
    case "rule":
      return "neutral";
    case "llm-match":
      return "info";
    case "llm-generate":
      return "purple";
    default:
      return "neutral";
  }
}
function Ye(t) {
  switch (t) {
    case "rule":
      return "Matched a configured rule";
    case "llm-match":
      return "LLM matched to existing DocType";
    case "llm-generate":
      return "LLM proposed a new DocType";
    default:
      return t;
  }
}
function Xe(t, a) {
  if (a === "failed")
    return t === "queued";
  const d = te;
  return d.indexOf(t) <= d.indexOf(a);
}
function J(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function Ze({ item: t, sourceName: a, onClose: d, onRetry: u, onSkip: x }) {
  const { idToken: n } = K(), [y, b] = I(null), [w, S] = I(null), { events: h } = ce();
  B(() => {
    if (!t) return;
    const m = (g) => {
      g.key === "Escape" && d();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [t, d]);
  const s = L(() => {
    if (!t) return /* @__PURE__ */ new Map();
    const m = /* @__PURE__ */ new Map();
    for (const g of h)
      g.ingestId === t.itemId && (g.type === "item.status" && typeof g.status == "string" && typeof g.timestamp == "string" && m.set(g.status, g.timestamp), g.type === "item.materialized" && typeof g.timestamp == "string" && m.set("done", g.timestamp), g.type === "item.failed" && typeof g.timestamp == "string" && m.set("failed", g.timestamp));
    return m;
  }, [h, t]);
  if (!t) return null;
  const v = t.status === "failed", k = t.status === "done" || t.status === "failed", f = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, N = async () => {
    b("retry");
    try {
      await u(t.itemId);
    } finally {
      b(null), d();
    }
  }, p = async () => {
    b("skip");
    try {
      await x(t.itemId);
    } finally {
      b(null), d();
    }
  }, o = async () => {
    b("remap"), S(null);
    try {
      const m = { "Content-Type": "application/json" };
      n && (m.Authorization = `Bearer ${n}`);
      const g = await fetch(`${Ve}/api/ingest/items/${t.itemId}/remap`, {
        method: "POST",
        headers: m
      });
      if (!g.ok) throw new Error(`HTTP ${g.status}`);
      d();
    } catch (m) {
      S(m instanceof Error ? m.message : String(m));
    } finally {
      b(null);
    }
  };
  return /* @__PURE__ */ e(
    "div",
    {
      className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
      onClick: d,
      "data-testid": "ingest-item-drawer-scrim",
      children: /* @__PURE__ */ r(
        "div",
        {
          className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
          onClick: (m) => m.stopPropagation(),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Ingest item details",
          "data-testid": "ingest-item-drawer",
          children: [
            /* @__PURE__ */ r("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]", children: [
              /* @__PURE__ */ e("h3", { className: "text-base font-bold text-text-primary m-0", children: "Ingest Item" }),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
                  onClick: d,
                  "aria-label": "Close",
                  "data-testid": "ingest-item-drawer-close",
                  children: "×"
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "p-5 flex flex-col gap-4.5 flex-1", children: [
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Source path" }),
                /* @__PURE__ */ e("div", { className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all", children: t.sourcePath }),
                /* @__PURE__ */ r("div", { className: "flex gap-2 items-center mt-1", children: [
                  /* @__PURE__ */ e(_, { tone: Ge(t.status), size: "sm", children: t.status }),
                  a && /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary", children: [
                    "from ",
                    /* @__PURE__ */ e("strong", { className: "text-text-secondary", children: a })
                  ] }),
                  /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary ml-auto", children: [
                    "Updated ",
                    J(t.updatedAt)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Status timeline" }),
                /* @__PURE__ */ r("div", { className: "flex flex-col relative", children: [
                  te.map((m, g) => {
                    const D = Xe(m, t.status), $ = m === t.status, O = v && g === 0, i = {
                      ...D ? {
                        background: O ? "var(--color-state-failed)" : "var(--color-state-completed)",
                        borderColor: O ? "var(--color-state-failed)" : "var(--color-state-completed)"
                      } : {},
                      ...$ && !k ? { background: "var(--color-state-running)", borderColor: "var(--color-state-running)" } : {}
                    };
                    return /* @__PURE__ */ r("div", { className: "flex items-start gap-3 relative py-1.5", children: [
                      g < te.length - 1 && /* @__PURE__ */ e("span", { className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border", "aria-hidden": "true" }),
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
                          style: i,
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("div", { className: "text-[13px] font-medium text-text-primary", children: m }),
                        (() => {
                          const c = s.get(m);
                          return c ? /* @__PURE__ */ e("div", { "data-testid": `timeline-meta-${m}`, className: "text-[11px] text-text-tertiary mt-0.5", children: J(c) }) : $ ? /* @__PURE__ */ e("div", { "data-testid": `timeline-meta-${m}`, className: "text-[11px] text-text-tertiary mt-0.5", children: k ? J(t.updatedAt) : "in progress" }) : null;
                        })()
                      ] })
                    ] }, m);
                  }),
                  v && /* @__PURE__ */ r("div", { className: "flex items-start gap-3 relative py-1.5", children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed"
                      }
                    ),
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ e("div", { className: "text-[13px] font-medium text-[var(--color-state-failed)]", children: "failed" }),
                      /* @__PURE__ */ e("div", { "data-testid": "timeline-meta-failed", className: "text-[11px] text-text-tertiary mt-0.5", children: J(s.get("failed") ?? t.updatedAt) })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Mapping decision" }),
                t.mappingMethod ? /* @__PURE__ */ r(Q, { children: [
                  /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ e(_, { tone: Ke(t.mappingMethod), size: "sm", children: t.mappingMethod }),
                    /* @__PURE__ */ e("span", { className: "text-xs text-text-secondary", children: Ye(t.mappingMethod) })
                  ] }),
                  f !== null && /* @__PURE__ */ r("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ e("div", { className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border", children: /* @__PURE__ */ e(
                      "div",
                      {
                        className: "h-full transition-[width] duration-200 ease-out",
                        style: {
                          width: `${Math.round(f * 100)}%`,
                          background: f >= 0.7 ? "var(--color-state-completed)" : f >= 0.4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
                        }
                      }
                    ) }),
                    /* @__PURE__ */ r("span", { className: "font-mono text-xs text-text-secondary min-w-[48px] text-right", children: [
                      (f * 100).toFixed(0),
                      "%"
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary", children: [
                  "No mapping decision yet — item is still in ",
                  t.status,
                  "."
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Identity" }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
                  /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight", children: "Item ID" }),
                  /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: t.itemId })
                ] }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
                  /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight", children: "Document Type" }),
                  /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: t.documentTypeId ?? "—" })
                ] }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
                  /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight", children: "Document" }),
                  /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: t.documentId ? /* @__PURE__ */ e("a", { href: `/documents/${t.documentId}`, className: "text-primary", children: t.documentId }) : "—" })
                ] }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight", children: "Pipeline Run" }),
                  /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: t.pipelineRunId ?? "—" })
                ] })
              ] }),
              t.error && /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Error" }),
                /* @__PURE__ */ e("div", { className: "bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words", children: t.error })
              ] }),
              w && /* @__PURE__ */ r("div", { className: "bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words", children: [
                "Re-map failed: ",
                w
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  className: E(
                    "px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary",
                    (y || t.status === "done") && "opacity-50 cursor-not-allowed"
                  ),
                  onClick: () => {
                    o();
                  },
                  disabled: !!y || t.status === "done",
                  "data-testid": "item-remap-btn",
                  title: "Re-run the mapping engine for this item",
                  children: y === "remap" ? "Re-mapping…" : "Re-map"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: E(
                    "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer",
                    y || !v ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-white"
                  ),
                  onClick: () => {
                    N();
                  },
                  disabled: !!y || !v,
                  "data-testid": "item-retry-btn",
                  title: v ? "Retry this item from the beginning" : "Only failed items can be retried",
                  children: y === "retry" ? "Retrying…" : "Retry"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: E(
                    "px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer",
                    y || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"
                  ),
                  onClick: () => {
                    p();
                  },
                  disabled: !!y || t.status === "done",
                  "data-testid": "item-discard-btn",
                  title: "Skip / discard this item",
                  children: y === "skip" ? "Discarding…" : "Discard"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const et = ["queued", "mapping", "materializing", "triggering", "done", "failed"];
function tt(t) {
  switch (t) {
    case "queued":
      return "neutral";
    case "mapping":
      return "info";
    case "materializing":
      return "purple";
    case "triggering":
      return "caution";
    case "done":
      return "success";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}
function rt(t) {
  switch (t) {
    case "rule":
      return "neutral";
    case "llm-match":
      return "info";
    case "llm-generate":
      return "purple";
    default:
      return "neutral";
  }
}
function at(t, a = 50) {
  return t.length <= a ? t : "..." + t.slice(t.length - a + 3);
}
function Dt() {
  const [t, a] = I(null), [d, u] = I(null), [x, n] = I(null), { sources: y } = G(), { items: b, loading: w, error: S, refresh: h, retryItem: s, skipItem: v } = le({
    sourceId: t,
    status: d
  }), k = x ? b.find((o) => o.itemId === x.itemId) ?? x : null, f = L(() => {
    const o = /* @__PURE__ */ new Map();
    for (const m of y)
      o.set(m.sourceId, m.name);
    return o;
  }, [y]), N = A(async (o) => {
    await s(o);
  }, [s]), p = A(async (o) => {
    await v(o);
  }, [v]);
  return w && b.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "ingest-items-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest Items" }) }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": "ingest-items-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest Items" }),
      /* @__PURE__ */ r("span", { className: "text-[13px] text-text-tertiary", children: [
        b.length,
        " item",
        b.length !== 1 ? "s" : ""
      ] })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2.5 items-center mb-3 flex-wrap", children: [
      /* @__PURE__ */ r(
        "select",
        {
          className: "px-2.5 py-1.5 text-[13px] font-[inherit] border border-border-field rounded-md bg-surface text-text-primary cursor-pointer outline-none",
          value: t ?? "",
          onChange: (o) => a(o.target.value || null),
          "data-testid": "source-filter",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All Sources" }),
            y.map((o) => /* @__PURE__ */ e("option", { value: o.sourceId, children: o.name }, o.sourceId))
          ]
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          className: "px-2.5 py-1.5 text-[13px] font-[inherit] border border-border-field rounded-md bg-surface text-text-primary cursor-pointer outline-none",
          value: d ?? "",
          onChange: (o) => u(o.target.value || null),
          "data-testid": "status-filter",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All" }),
            et.map((o) => /* @__PURE__ */ e("option", { value: o, children: o }, o))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
          onClick: () => {
            h();
          },
          "data-testid": "refresh-btn",
          children: "Refresh"
        }
      )
    ] }),
    S && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Failed to load ingest items." }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            h();
          },
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] }),
    !S && b.length === 0 ? /* @__PURE__ */ e(
      q,
      {
        icon: "📋",
        title: "No items found",
        body: "No ingest items match the current filters."
      }
    ) : !S && /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "File Path" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Source" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Status" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Type" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Method" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase", children: "Document" }),
        /* @__PURE__ */ e("th", { className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: b.map((o) => /* @__PURE__ */ r(
        "tr",
        {
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          onClick: () => n(o),
          "data-testid": `item-row-${o.itemId}`,
          children: [
            /* @__PURE__ */ e("td", { className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap", title: o.sourcePath, children: at(o.sourcePath) }),
            /* @__PURE__ */ e("td", { className: "p-2 text-text-secondary", children: f.get(o.sourceId) ?? o.sourceId.slice(0, 8) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(_, { tone: tt(o.status), size: "sm", children: o.status }) }),
            /* @__PURE__ */ e("td", { className: "p-2 font-mono text-[11px] text-text-secondary", children: o.documentTypeId ?? "—" }),
            /* @__PURE__ */ e("td", { className: "p-2", children: o.mappingMethod ? /* @__PURE__ */ e(_, { tone: rt(o.mappingMethod), size: "xs", children: o.mappingMethod }) : "—" }),
            /* @__PURE__ */ e("td", { className: "p-2", children: o.documentId ? /* @__PURE__ */ r(
              "a",
              {
                href: `/documents/${o.documentId}`,
                className: "text-primary no-underline font-medium text-xs",
                onClick: (m) => m.stopPropagation(),
                children: [
                  o.documentId.slice(0, 8),
                  "..."
                ]
              }
            ) : "—" }),
            /* @__PURE__ */ e(
              "td",
              {
                className: "p-2 text-right",
                onClick: (m) => m.stopPropagation(),
                children: /* @__PURE__ */ r("div", { className: "flex gap-1.5 justify-end", children: [
                  o.status === "failed" && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
                      onClick: () => {
                        N(o.itemId);
                      },
                      "data-testid": `retry-${o.itemId}`,
                      children: "Retry"
                    }
                  ),
                  o.status !== "done" && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-[#fef2f2] cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
                      onClick: () => {
                        p(o.itemId);
                      },
                      "data-testid": `skip-${o.itemId}`,
                      children: "Skip"
                    }
                  )
                ] })
              }
            )
          ]
        },
        o.itemId
      )) })
    ] }) }),
    /* @__PURE__ */ e(
      Ze,
      {
        item: k,
        sourceName: k ? f.get(k.sourceId) : void 0,
        onClose: () => n(null),
        onRetry: async (o) => {
          await N(o);
        },
        onSkip: async (o) => {
          await p(o);
        }
      }
    )
  ] });
}
const nt = [
  { value: "", label: "All events" },
  { value: "mapping.decided", label: "mapping.decided" },
  { value: "source.created", label: "source.created" },
  { value: "source.updated", label: "source.updated" },
  { value: "source.paused", label: "source.paused" },
  { value: "source.resumed", label: "source.resumed" },
  { value: "writeback.attempted", label: "writeback.attempted" },
  { value: "writeback.failed", label: "writeback.failed" }
], oe = [
  { value: "1h", label: "Last 1h", ms: 3600 * 1e3 },
  { value: "6h", label: "Last 6h", ms: 360 * 60 * 1e3 },
  { value: "24h", label: "Last 24h", ms: 1440 * 60 * 1e3 },
  { value: "7d", label: "Last 7d", ms: 10080 * 60 * 1e3 },
  { value: "all", label: "All time", ms: null }
];
function Pt() {
  const [t, a] = I("24h"), [d, u] = I(""), [x, n] = I(""), [y, b] = I(""), [w, S] = I(null), h = L(() => {
    const f = oe.find((N) => N.value === t);
    return {
      since: f && f.ms !== null ? new Date(Date.now() - f.ms).toISOString() : void 0,
      eventType: d || void 0,
      actor: x.trim() || void 0,
      targetId: y.trim() || void 0,
      limit: 200
    };
  }, [t, d, x, y]), { entries: s, loading: v, error: k } = ve(h);
  return /* @__PURE__ */ r("div", { "data-testid": "ingest-audit-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "mb-3", children: /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Audit log" }) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Time" }),
      /* @__PURE__ */ e(
        "select",
        {
          "data-testid": "audit-time-range",
          "aria-label": "Time range",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[140px]",
          value: t,
          onChange: (f) => a(f.target.value),
          children: oe.map((f) => /* @__PURE__ */ e("option", { value: f.value, children: f.label }, f.value))
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Event" }),
      /* @__PURE__ */ e(
        "select",
        {
          "data-testid": "audit-event-type",
          "aria-label": "Event type",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[140px]",
          value: d,
          onChange: (f) => u(f.target.value),
          children: nt.map((f) => /* @__PURE__ */ e("option", { value: f.value, children: f.label }, f.value))
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Actor" }),
      /* @__PURE__ */ e(
        "input",
        {
          "data-testid": "audit-actor",
          "aria-label": "Actor",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[140px]",
          value: x,
          onChange: (f) => n(f.target.value),
          placeholder: "email or system"
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Target" }),
      /* @__PURE__ */ e(
        "input",
        {
          "data-testid": "audit-target-id",
          "aria-label": "Target ID",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[140px]",
          value: y,
          onChange: (f) => b(f.target.value),
          placeholder: "sourceId / itemId"
        }
      )
    ] }),
    k ? /* @__PURE__ */ r("div", { "data-testid": "audit-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load audit log: ",
      k
    ] }) : null,
    v && s.length === 0 ? /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(P, { height: 200 }) }) : s.length === 0 && !k ? /* @__PURE__ */ e(
      q,
      {
        icon: "📜",
        title: "No audit entries",
        body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
        testId: "audit-empty"
      }
    ) : /* @__PURE__ */ r("table", { "data-testid": "audit-table", className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border", children: "Time" }),
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border", children: "Actor" }),
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border", children: "Event" }),
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border", children: "Target" }),
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border", children: "Summary" }),
        /* @__PURE__ */ e("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: s.map((f) => /* @__PURE__ */ e(
        it,
        {
          entry: f,
          expanded: w === f.auditId,
          onToggle: () => S(w === f.auditId ? null : f.auditId)
        },
        f.auditId
      )) })
    ] })
  ] });
}
function it({ entry: t, expanded: a, onToggle: d }) {
  return /* @__PURE__ */ r(Q, { children: [
    /* @__PURE__ */ r("tr", { "data-testid": `audit-row-${t.auditId}`, children: [
      /* @__PURE__ */ e("td", { className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs", children: t.createdAt.slice(0, 19).replace("T", " ") }),
      /* @__PURE__ */ e("td", { className: "text-[13px] p-2 align-top border-b border-border", children: t.actor }),
      /* @__PURE__ */ e("td", { className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs", children: t.eventType }),
      /* @__PURE__ */ r("td", { className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs", title: t.targetId, children: [
        t.targetType,
        "/",
        t.targetId.slice(0, 12)
      ] }),
      /* @__PURE__ */ e("td", { className: "text-[13px] p-2 align-top border-b border-border", children: t.summary }),
      /* @__PURE__ */ e("td", { className: "text-[13px] p-2 align-top border-b border-border", children: /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `audit-detail-toggle-${t.auditId}`,
          className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
          onClick: d,
          children: a ? "hide" : "detail"
        }
      ) })
    ] }),
    a ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { colSpan: 6, className: "text-[13px] p-2 align-top border-b border-border", children: /* @__PURE__ */ e("pre", { "data-testid": `audit-detail-${t.auditId}`, className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto", children: JSON.stringify(t.detail, null, 2) }) }) }) : null
  ] });
}
function U(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function st(t) {
  if (t == null) return "—";
  if (typeof t == "string") return t;
  try {
    return JSON.stringify(t, null, 2);
  } catch {
    return String(t);
  }
}
function Et() {
  const { conflicts: t, loading: a, error: d, usingMock: u, refresh: x, resolveConflict: n, discardConflict: y } = Ne(), { sources: b } = G(), [w, S] = I(null), [h, s] = I("platform"), [v, k] = I({}), [f, N] = I(""), [p, o] = I(!1), m = L(() => {
    const i = /* @__PURE__ */ new Map();
    for (const c of b) i.set(c.sourceId, c.name);
    return i;
  }, [b]), g = L(() => t.filter((i) => i.status === "pending"), [t]);
  B(() => {
    w && g.some((i) => i.conflictId === w) || S(g[0]?.conflictId ?? null);
  }, [g, w]);
  const D = L(
    () => g.find((i) => i.conflictId === w) ?? null,
    [g, w]
  );
  B(() => {
    s("platform"), k({}), N("");
  }, [w]);
  const $ = async () => {
    if (D) {
      o(!0);
      try {
        const i = {
          pick: h,
          ...Object.keys(v).length > 0 ? { fieldChoices: v } : {},
          ...f.trim() ? { note: f.trim() } : {}
        };
        await n(D.conflictId, i);
      } finally {
        o(!1);
      }
    }
  }, O = async () => {
    if (D) {
      o(!0);
      try {
        await y(D.conflictId);
      } finally {
        o(!1);
      }
    }
  };
  return a && t.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "conflicts-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sync Conflicts" }) }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 200 })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": "conflicts-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sync Conflicts" }),
        /* @__PURE__ */ r("span", { className: "text-[13px] text-text-tertiary", children: [
          g.length,
          " pending",
          (g.length !== 1, ""),
          " • ",
          t.length - g.length,
          " resolved"
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
          onClick: () => {
            x();
          },
          "data-testid": "conflicts-refresh",
          children: "Refresh"
        }
      )
    ] }),
    u && /* @__PURE__ */ r(
      "div",
      {
        className: "px-3.5 py-2.5 bg-[#fffbeb] border border-[var(--color-state-awaiting)] text-[#92400e] rounded-lg text-xs mb-3",
        "data-testid": "conflicts-mock-banner",
        children: [
          "Showing mock conflicts — backend endpoint ",
          /* @__PURE__ */ e("code", { children: "/api/sync/conflicts" }),
          " not implemented yet."
        ]
      }
    ),
    d && !u && /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3", role: "alert", children: /* @__PURE__ */ r("span", { className: "text-[13px]", children: [
      "Failed to load conflicts: ",
      d
    ] }) }),
    g.length === 0 ? /* @__PURE__ */ e(
      q,
      {
        icon: "✅",
        title: "No pending conflicts",
        body: "Write-back conflicts that need operator intervention will appear here."
      }
    ) : /* @__PURE__ */ r("div", { className: "grid grid-cols-[320px_1fr] gap-4 items-start", children: [
      /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] overflow-hidden", "data-testid": "conflicts-list", children: [
        /* @__PURE__ */ r("div", { className: "px-3.5 py-2.5 border-b border-border text-xs font-semibold text-text-tertiary uppercase tracking-wide bg-surface-panel", children: [
          "Pending (",
          g.length,
          ")"
        ] }),
        g.map((i) => {
          const c = i.conflictId === w;
          return /* @__PURE__ */ r(
            "div",
            {
              className: E(
                "px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1",
                c && "bg-[#eef2ff]"
              ),
              onClick: () => S(i.conflictId),
              "data-testid": `conflict-row-${i.conflictId}`,
              children: [
                /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary leading-tight line-clamp-2", children: i.summary }),
                /* @__PURE__ */ r("div", { className: "flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary", children: [
                  /* @__PURE__ */ r(_, { tone: "warning", size: "xs", children: [
                    i.fields.length,
                    " field",
                    i.fields.length !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ e("span", { children: m.get(i.sourceId) ?? i.sourceId.slice(0, 10) }),
                  /* @__PURE__ */ e("span", { children: "•" }),
                  /* @__PURE__ */ e("span", { children: U(i.detectedAt) })
                ] })
              ]
            },
            i.conflictId
          );
        })
      ] }),
      D && /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4", "data-testid": "conflict-detail", children: [
        /* @__PURE__ */ r("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("h3", { className: "m-0 text-base font-bold text-text-primary", children: D.summary }),
            /* @__PURE__ */ r("div", { className: "mt-1.5 flex gap-2 items-center flex-wrap", children: [
              /* @__PURE__ */ e(_, { tone: "info", size: "xs", children: m.get(D.sourceId) ?? D.sourceId }),
              D.documentTypeId && /* @__PURE__ */ e(_, { tone: "purple", size: "xs", children: D.documentTypeId }),
              /* @__PURE__ */ r("span", { className: "text-[11px] text-text-tertiary", children: [
                "Detected ",
                U(D.detectedAt)
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary font-mono break-all mt-1.5", children: D.sourceRef })
          ] }),
          /* @__PURE__ */ r("div", { className: "text-[11px] text-text-tertiary text-right", children: [
            /* @__PURE__ */ r("div", { children: [
              "Source edited: ",
              U(D.sourceUpdatedAt)
            ] }),
            /* @__PURE__ */ r("div", { children: [
              "Platform edited: ",
              U(D.platformUpdatedAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-secondary mr-1", children: "Apply to all fields:" }),
          ["source", "merged", "platform"].map((i) => {
            const c = i !== "merged" || D.fields.some((C) => C.mergedValue !== void 0);
            return /* @__PURE__ */ e(
              "button",
              {
                className: E(
                  "px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer",
                  h === i ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-border",
                  !c && "opacity-40 cursor-not-allowed"
                ),
                onClick: () => c && s(i),
                disabled: !c,
                "data-testid": `global-pick-${i}`,
                children: i === "source" ? "Source side" : i === "platform" ? "Platform side" : "Auto-merged"
              },
              i
            );
          })
        ] }),
        D.fields.map((i) => /* @__PURE__ */ e(
          ot,
          {
            field: i,
            globalPick: h,
            fieldChoice: v[i.field],
            onPick: (c) => k((C) => ({ ...C, [i.field]: c })),
            onClear: () => k((c) => {
              const C = { ...c };
              return delete C[i.field], C;
            })
          },
          i.field
        )),
        /* @__PURE__ */ r("div", { className: "flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap", children: [
          /* @__PURE__ */ e(
            "input",
            {
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none font-[inherit] min-w-[240px] flex-1",
              placeholder: "Optional note (logged in audit trail)",
              value: f,
              onChange: (i) => N(i.target.value),
              "data-testid": "conflict-note"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: E(
                "px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)]",
                p && "opacity-50 cursor-not-allowed"
              ),
              onClick: () => {
                O();
              },
              disabled: p,
              "data-testid": "conflict-discard",
              children: "Discard"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: E(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
                p && "opacity-50 cursor-not-allowed"
              ),
              onClick: () => {
                $();
              },
              disabled: p,
              "data-testid": "conflict-resolve",
              children: p ? "Resolving…" : "Resolve"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ot({
  field: t,
  globalPick: a,
  fieldChoice: d,
  onPick: u,
  onClear: x
}) {
  const n = d ?? a, y = t.mergedValue !== void 0;
  return /* @__PURE__ */ r("div", { className: "border border-border rounded-lg overflow-hidden", "data-testid": `field-diff-${t.field}`, children: [
    /* @__PURE__ */ r("div", { className: "px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary font-semibold", children: t.field }),
      d && /* @__PURE__ */ e(
        "button",
        {
          onClick: x,
          className: "text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium",
          "data-testid": `field-clear-${t.field}`,
          children: "Clear override"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-3", children: [
      /* @__PURE__ */ e(
        Z,
        {
          label: "Source side",
          value: t.sourceValue,
          selected: n === "source"
        }
      ),
      /* @__PURE__ */ e(
        Z,
        {
          label: y ? "Auto-merged" : "Auto-merged (none)",
          value: y ? t.mergedValue : "—",
          selected: y && n === "merged",
          dim: !y
        }
      ),
      /* @__PURE__ */ e(
        Z,
        {
          label: "Platform side",
          value: t.platformValue,
          selected: n === "platform",
          last: !0
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "flex gap-1.5 px-2.5 py-1.5 border-t border-border bg-surface-inset", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Pick for this field:" }),
      ["source", "merged", "platform"].map((b) => {
        const w = b !== "merged" || y;
        return /* @__PURE__ */ e(
          "button",
          {
            className: E(
              "text-[11px] px-2.5 py-0.5 rounded-full cursor-pointer border font-[inherit] font-medium",
              n === b ? "bg-[var(--color-state-completed)] text-white border-[var(--color-state-completed)]" : "bg-surface text-text-secondary border-border",
              !w && "opacity-40 cursor-not-allowed"
            ),
            onClick: () => w && u(b),
            disabled: !w,
            "data-testid": `field-pick-${t.field}-${b}`,
            children: b === "source" ? "Source" : b === "platform" ? "Platform" : "Merged"
          },
          b
        );
      })
    ] })
  ] });
}
function Z({
  label: t,
  value: a,
  selected: d,
  last: u,
  dim: x
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: E(
        "p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface",
        !u && "border-r border-border",
        d && "bg-[#ecfdf5] border-[var(--color-state-completed)]",
        x && "opacity-55"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans", children: t }),
        /* @__PURE__ */ e("div", { children: st(a) })
      ]
    }
  );
}
function dt(t) {
  const a = Date.now() - t;
  return a < 0 ? "just now" : a < 6e4 ? `${Math.floor(a / 1e3)}s ago` : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function Rt() {
  const { entries: t, loading: a, error: d, replay: u, drop: x } = we();
  return /* @__PURE__ */ r("div", { "data-testid": "ingest-dlq-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Dead Letter Queue" }),
      /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "Items the engine couldn't process. Replay re-enqueues; drop purges." })
    ] }) }),
    d ? /* @__PURE__ */ e("div", { "data-testid": "ingest-dlq-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: d }) : null,
    a && t.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 })
    ] }) : t.length === 0 && !d ? /* @__PURE__ */ e(
      q,
      {
        icon: "🧹",
        title: "DLQ is empty",
        body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
        testId: "ingest-dlq-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "ingest-dlq-list", className: "flex flex-col gap-3", children: t.map((n) => /* @__PURE__ */ e(
      lt,
      {
        entry: n,
        onReplay: () => {
          u(n.id);
        },
        onDrop: () => {
          x(n.id);
        }
      },
      n.id
    )) })
  ] });
}
function lt({ entry: t, onReplay: a, onDrop: d }) {
  return /* @__PURE__ */ r("div", { "data-testid": `dlq-row-${t.id}`, className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[13px] text-text-primary", title: t.id, children: t.id }),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: dt(t.failedAtMs) })
    ] }),
    /* @__PURE__ */ r("div", { className: "text-xs text-text-secondary flex gap-4 flex-wrap", children: [
      /* @__PURE__ */ r("span", { children: [
        "Attempts: ",
        /* @__PURE__ */ e("strong", { children: t.totalAttempts })
      ] }),
      t.envelope.body?.sourceId ? /* @__PURE__ */ r("span", { children: [
        "Source: ",
        t.envelope.body.sourceId.slice(0, 12)
      ] }) : null
    ] }),
    t.lastError ? /* @__PURE__ */ e("div", { className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto", children: t.lastError }) : null,
    /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `dlq-replay-${t.id}`,
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
          onClick: a,
          children: "Replay"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `dlq-drop-${t.id}`,
          className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
          onClick: d,
          children: "Drop"
        }
      )
    ] })
  ] });
}
function At() {
  const { proposals: t, loading: a, error: d, promote: u, reject: x } = Ie();
  return /* @__PURE__ */ r("div", { "data-testid": "doctype-proposals-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "mb-4", children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "DocType proposals" }),
      /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary mt-1", children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals." })
    ] }),
    d ? /* @__PURE__ */ r("div", { "data-testid": "proposals-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load DocType proposals: ",
      d
    ] }) : null,
    a && t.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 120 }),
      /* @__PURE__ */ e(P, { height: 120 })
    ] }) : t.length === 0 && !d ? /* @__PURE__ */ e(
      q,
      {
        icon: "🧬",
        title: "No proposals waiting",
        body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
        testId: "proposals-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "proposals-list", className: "flex flex-col gap-3", children: t.map((n) => /* @__PURE__ */ e(
      ct,
      {
        proposal: n,
        onPromote: () => {
          u(n.proposalId);
        },
        onReject: () => {
          x(n.proposalId);
        }
      },
      n.proposalId
    )) })
  ] });
}
function ct({ proposal: t, onPromote: a, onReject: d }) {
  return /* @__PURE__ */ r("div", { "data-testid": `proposal-row-${t.proposalId}`, className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-base font-bold text-text-primary", children: t.proposedName }),
      /* @__PURE__ */ r("span", { className: "text-[11px] text-text-tertiary", children: [
        t.sampleIngestIds.length,
        " sample",
        t.sampleIngestIds.length === 1 ? "" : "s"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "text-xs text-text-secondary flex gap-4 flex-wrap", children: [
      /* @__PURE__ */ r("span", { children: [
        "Source: ",
        t.sourceId.slice(0, 12)
      ] }),
      /* @__PURE__ */ r("span", { children: [
        "Signature: ",
        t.signature.slice(0, 24)
      ] })
    ] }),
    t.proposedDescription ? /* @__PURE__ */ e("div", { className: "text-[13px] text-text-primary leading-relaxed", children: t.proposedDescription }) : null,
    t.proposedFields.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.proposedFields.map((u) => /* @__PURE__ */ r("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono", children: [
      u.name,
      u.required ? "*" : ""
    ] }, u.name)) }) : null,
    t.reasoning ? /* @__PURE__ */ r("div", { className: "text-xs text-text-tertiary italic", title: t.reasoning, children: [
      t.reasoning.slice(0, 200),
      t.reasoning.length > 200 ? "…" : ""
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `proposal-promote-${t.proposalId}`,
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
          onClick: a,
          children: "Promote"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `proposal-reject-${t.proposalId}`,
          className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
          onClick: d,
          children: "Reject"
        }
      )
    ] })
  ] });
}
function Mt() {
  const { idToken: t } = K(), { items: a, threshold: d, loading: u, error: x, remap: n, skip: y } = Se(), { types: b } = pe({ idToken: t }), [w, S] = I({});
  return /* @__PURE__ */ r("div", { "data-testid": "mapping-review-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-baseline justify-between mb-4", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Mapping needs review" }),
      /* @__PURE__ */ r("div", { className: "text-xs text-text-tertiary", children: [
        "Showing items with confidence < ",
        Math.round(d * 100),
        "%."
      ] })
    ] }) }),
    x ? /* @__PURE__ */ r("div", { "data-testid": "mapping-review-error", className: "px-3 py-2 bg-[#fef2f2] border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load review queue: ",
      x
    ] }) : null,
    u && a.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 })
    ] }) : a.length === 0 && !x ? /* @__PURE__ */ e(
      q,
      {
        icon: "✨",
        title: "No items need review",
        body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
        testId: "mapping-review-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "mapping-review-list", className: "flex flex-col gap-3", children: a.map((h) => /* @__PURE__ */ e(
      pt,
      {
        item: h,
        docTypes: b,
        remapTypeId: w[h.itemId] ?? "",
        onPickRemapType: (s) => S((v) => ({ ...v, [h.itemId]: s })),
        onAccept: () => {
          h.documentTypeId && n(h.itemId, h.documentTypeId);
        },
        onRemap: () => {
          const s = w[h.itemId];
          s && n(h.itemId, s);
        },
        onDiscard: () => {
          y(h.itemId);
        }
      },
      h.itemId
    )) })
  ] });
}
function pt({ item: t, docTypes: a, remapTypeId: d, onPickRemapType: u, onAccept: x, onRemap: n, onDiscard: y }) {
  const w = a.find((h) => h.id === t.documentTypeId)?.name ?? t.documentTypeId ?? "(unknown)", S = typeof t.mappingConfidence == "number" ? `${Math.round(t.mappingConfidence * 100)}%` : "—";
  return /* @__PURE__ */ r("div", { "data-testid": `review-row-${t.itemId}`, className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", title: t.sourcePath, children: t.sourcePath }),
      /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e]", children: [
        "conf ",
        S
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "text-xs text-text-secondary flex gap-3 flex-wrap", children: [
      /* @__PURE__ */ r("span", { children: [
        "Suggested type: ",
        /* @__PURE__ */ e("strong", { children: w })
      ] }),
      /* @__PURE__ */ r("span", { children: [
        "Source: ",
        t.sourceId.slice(0, 8)
      ] })
    ] }),
    t.error ? /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary italic", children: t.error.slice(0, 200) }) : null,
    /* @__PURE__ */ r("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `review-accept-${t.itemId}`,
          className: E(
            "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            !t.documentTypeId && "opacity-50 cursor-not-allowed"
          ),
          onClick: x,
          disabled: !t.documentTypeId,
          title: t.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
          children: "Accept suggestion"
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          "data-testid": `review-remap-picker-${t.itemId}`,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[200px]",
          value: d,
          onChange: (h) => u(h.target.value),
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "Re-map to…" }),
            a.map((h) => /* @__PURE__ */ e("option", { value: h.id, children: h.name }, h.id))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `review-remap-${t.itemId}`,
          className: E(
            "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            !d && "opacity-50 cursor-not-allowed"
          ),
          onClick: n,
          disabled: !d,
          children: "Re-map"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `review-discard-${t.itemId}`,
          className: "px-3 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
          onClick: y,
          children: "Discard"
        }
      )
    ] })
  ] });
}
function ut(t) {
  return new Date(t).toLocaleTimeString("en-US", { hour12: !1, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
function xt(t) {
  const a = Date.now() - new Date(t).getTime(), d = Math.floor(a / 1e3);
  if (d < 60) return `${d}s`;
  const u = Math.floor(d / 60), x = d % 60;
  return `${u}m ${x}s`;
}
function mt(t) {
  return t.startsWith("sync.") ? "bg-[#dbeafe] text-[#1d4ed8]" : t === "item.mapped" ? "bg-[#ede9fe] text-[#7c3aed]" : t === "item.materialized" ? "bg-[#dcfce7] text-[#16a34a]" : t === "item.failed" ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#f1f5f9] text-[#64748b]";
}
function de(t) {
  const a = t.sourceName ?? t.sourceId ?? "";
  switch (t.type) {
    case "sync.started":
      return `Sync started for ${a}`;
    case "sync.progress":
      return `${a}: fetched ${t.filesFetched ?? 0}/${t.fileCount ?? "?"} files`;
    case "sync.completed":
      return `Sync completed for ${a}`;
    case "sync.failed":
      return `Sync failed for ${a}${t.error ? `: ${t.error}` : ""}`;
    case "item.mapped":
      return `Item mapped: ${t.sourcePath ?? t.itemId ?? "unknown"}`;
    case "item.materialized":
      return `Item materialized: ${t.sourcePath ?? t.itemId ?? "unknown"}`;
    case "item.failed":
      return `Item failed: ${t.sourcePath ?? t.itemId ?? "unknown"}`;
    default:
      return t.type;
  }
}
const ee = [
  { value: "all", label: "All", match: (t) => !0 },
  { value: "sync", label: "Sync", match: (t) => t.startsWith("sync.") },
  { value: "item", label: "Item", match: (t) => t.startsWith("item.") },
  { value: "source", label: "Source", match: (t) => t.startsWith("source.") },
  { value: "errors", label: "Errors", match: (t) => t === "item.failed" || t === "sync.failed" }
];
function jt() {
  const t = V(), { events: a, activeSyncs: d, clearEvents: u } = ce(), x = ae(null), [n, y] = I(!1), [b, w] = I(""), [S, h] = I("all"), s = ae(null);
  B(() => {
    n && s.current === null ? s.current = [...a] : n || (s.current = null);
  }, [n, a]);
  const v = L(() => {
    const p = /* @__PURE__ */ new Set();
    for (const o of a) {
      const m = o.sourceId;
      typeof m == "string" && m && p.add(m);
    }
    for (const o of d.keys()) p.add(o);
    return Array.from(p).sort();
  }, [a, d]), k = L(() => {
    const p = n && s.current ? s.current : a, o = ee.find((m) => m.value === S) ?? ee[0];
    return p.filter((m) => !(!o.match(m.type) || b && m.sourceId !== b));
  }, [a, n, S, b]);
  B(() => {
    n || x.current && (x.current.scrollTop = x.current.scrollHeight);
  }, [k.length, n]);
  const f = L(() => {
    const p = a.filter((o) => o.type === "item.failed" || o.type === "sync.failed").length;
    return {
      totalEvents: a.length,
      activeSyncsCount: d.size,
      errorsCount: p
    };
  }, [a, d]), N = L(
    () => Array.from(d.values()),
    [d]
  );
  return /* @__PURE__ */ r("div", { "data-testid": "sync-monitor-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sync Monitor" }),
        /* @__PURE__ */ r("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-[#ecfdf5] text-[#16a34a] rounded-full border border-[#bbf7d0]", children: [
          /* @__PURE__ */ e("span", { className: "w-[7px] h-[7px] rounded-full bg-[#16a34a] animate-[sync-pulse_1.5s_ease-in-out_infinite]" }),
          "Live"
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
          onClick: () => t("/ingest/sources"),
          children: "Sources"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5", children: [
      /* @__PURE__ */ r("div", { className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight", children: "Events Received" }),
        /* @__PURE__ */ e("span", { className: "text-[22px] font-bold text-text-primary leading-none", children: f.totalEvents })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight", children: "Active Syncs" }),
        /* @__PURE__ */ e("span", { className: E("text-[22px] font-bold leading-none", f.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"), children: f.activeSyncsCount })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight", children: "Errors" }),
        /* @__PURE__ */ e("span", { className: E("text-[22px] font-bold leading-none", f.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"), children: f.errorsCount })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4 mb-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Active Syncs" }),
      N.length === 0 ? /* @__PURE__ */ r("div", { className: "py-8 text-center", children: [
        /* @__PURE__ */ e("div", { className: "text-sm font-medium text-text-secondary mb-1", children: "No active syncs" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "Trigger a sync from the Sources page to see progress here." })
      ] }) : N.map((p) => {
        const o = p.fileCount > 0 ? Math.round(p.filesFetched / p.fileCount * 100) : 0;
        return /* @__PURE__ */ r("div", { className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: p.sourceName }),
            /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary font-mono", children: xt(p.startedAt) })
          ] }),
          /* @__PURE__ */ e("div", { className: "h-2 rounded bg-[#e2e8f0] overflow-hidden mb-2", children: /* @__PURE__ */ e(
            "div",
            {
              className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
              style: { width: `${o}%` }
            }
          ) }),
          /* @__PURE__ */ r("div", { className: "flex gap-4 text-xs text-text-secondary", children: [
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Files: ",
              p.filesFetched,
              "/",
              p.fileCount,
              " (",
              o,
              "%)"
            ] }),
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Mapped: ",
              p.itemsMapped
            ] }),
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Materialized: ",
              p.itemsMaterialized
            ] })
          ] })
        ] }, p.sourceId);
      })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4 mb-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3 gap-2 flex-wrap", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: "Event Log" }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ r(
            "select",
            {
              "data-testid": "event-source-filter",
              "aria-label": "Filter by source",
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[140px]",
              value: b,
              onChange: (p) => w(p.target.value),
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "All sources" }),
                v.map((p) => /* @__PURE__ */ e("option", { value: p, children: p.slice(0, 12) }, p))
              ]
            }
          ),
          /* @__PURE__ */ e(
            "select",
            {
              "data-testid": "event-type-filter",
              "aria-label": "Filter by event type",
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none min-w-[110px]",
              value: S,
              onChange: (p) => h(p.target.value),
              children: ee.map((p) => /* @__PURE__ */ e("option", { value: p.value, children: p.label }, p.value))
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": "event-pause-toggle",
              className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
              onClick: () => y((p) => !p),
              title: n ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
              children: n ? "Resume" : "Pause"
            }
          ),
          a.length > 0 && /* @__PURE__ */ e(
            "button",
            {
              className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
              onClick: u,
              children: "Clear"
            }
          )
        ] })
      ] }),
      k.length === 0 ? /* @__PURE__ */ r("div", { className: "py-8 text-center", children: [
        /* @__PURE__ */ e("div", { className: "text-sm font-medium text-text-secondary mb-1", children: a.length === 0 ? "No events yet" : "No events match the current filter" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: a.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter." })
      ] }) : /* @__PURE__ */ e("div", { ref: x, "data-testid": "event-log", className: "max-h-80 overflow-y-auto flex flex-col gap-0.5", children: k.map((p, o) => /* @__PURE__ */ r("div", { className: "flex items-center gap-2 px-2 py-1 rounded text-xs", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]", children: ut(p.timestamp) }),
        /* @__PURE__ */ e("span", { className: E("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", mt(p.type)), children: p.type }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap", title: de(p), children: de(p) })
      ] }, `${p.timestamp}-${o}`)) })
    ] })
  ] });
}
export {
  Et as ConflictsPage,
  Rt as DeadLetterQueuePage,
  At as DocTypeProposalsPage,
  Pt as IngestAuditPage,
  Ct as IngestDashboard,
  Ze as IngestItemDrawer,
  Dt as IngestItemsPage,
  Mt as MappingReviewPage,
  ne as MappingRuleEditor,
  $t as SourceDetailPage,
  Be as SourceSloPanel,
  Tt as SourcesPage,
  jt as SyncMonitorPage
};
