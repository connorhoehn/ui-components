import { jsxs as r, jsx as e, Fragment as G } from "react/jsx-runtime";
import { useMemo as O, useState as I, useCallback as A, useEffect as H, useRef as se } from "react";
import { useNavigate as K, useParams as ye } from "react-router";
import { e as Y, c as pe, h as ve, g as Ne, d as ue, a as we, i as Ie, b as Se, u as ke, f as Ce } from "./useMappingReviewQueue-DRbIo6-O.js";
import { C as F } from "./Chip-BDT8ro4h.js";
import { E as W } from "./EmptyState-Ejc9dJA3.js";
import { S as P } from "./SkeletonCard-Bm2f1JX1.js";
import { c as E } from "./cn-B6yFEsav.js";
import { u as X } from "./IdentityContext-CLalsm_M.js";
import { I as q } from "./Input-Dt0yAs9r.js";
import { S as j } from "./Select-DAEcKWg2.js";
import { u as me } from "./useDocumentTypes-C29MkgPl.js";
import { ResponsiveContainer as $e, LineChart as Te, YAxis as De, Tooltip as Pe, Line as Ee } from "recharts";
function Re(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function Ae(t) {
  return Date.now() - new Date(t).getTime() < 864e5;
}
function Me(t) {
  return Date.now() - new Date(t).getTime() < 36e5;
}
const je = 50;
function Pt() {
  const t = K(), { sources: a, loading: l, error: p, refresh: m } = Y(), { items: n, loading: y, error: h, refresh: w } = pe(), S = l || y, b = p || h, i = O(() => {
    const N = a.filter((T) => T.status === "active").length, u = a.filter((T) => T.status === "paused").length, o = a.filter((T) => T.status === "error").length, x = n.filter((T) => T.status !== "done" && T.status !== "failed").length, g = n.filter((T) => T.status === "done" && Ae(T.updatedAt)).length, D = n.filter((T) => T.status === "failed").length;
    return { total: a.length, active: N, paused: u, errored: o, queued: x, recentDone: g, failed: D };
  }, [a, n]), v = O(() => n.filter((N) => N.status === "done").sort((N, u) => u.updatedAt.localeCompare(N.updatedAt)).slice(0, 5), [n]), k = O(() => {
    const N = [];
    for (const o of a)
      o.status === "error" && N.push({
        id: `source-error-${o.sourceId}`,
        level: "critical",
        message: `Source "${o.name}" is in error state — check its config or last sync log.`
      });
    const u = n.filter((o) => Me(o.updatedAt));
    if (u.length >= 5) {
      const o = u.filter((g) => g.status === "failed").length, x = o / u.length;
      x > 0.1 && N.push({
        id: "failure-rate-1h",
        level: "warning",
        message: `Last-hour failure rate is ${(x * 100).toFixed(0)}% (${o} of ${u.length} items failed).`
      });
    }
    return i.queued > je && N.push({
      id: "queue-depth",
      level: "warning",
      message: `Queue depth is ${i.queued} items — sources may be ingesting faster than the engine can drain.`
    }), N;
  }, [a, n, i.queued]), f = () => {
    m(), w();
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
    b && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
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
          N.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"
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
        /* @__PURE__ */ e("span", { className: "text-[28px] font-bold text-text-primary leading-none", children: i.total }),
        /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary", children: [
          i.active,
          " active, ",
          i.paused,
          " paused",
          i.errored > 0 ? `, ${i.errored} error` : ""
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "In Queue" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", i.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"), children: i.queued }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items processing" })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "Completed (24h)" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", i.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"), children: i.recentDone }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items ingested" })
      ] }),
      /* @__PURE__ */ r("div", { className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-text-tertiary uppercase tracking-wide", children: "Errors" }),
        /* @__PURE__ */ e("span", { className: E("text-[28px] font-bold leading-none", i.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"), children: i.failed }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "items failed" })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4 mb-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Recent Activity" }),
      v.length === 0 ? /* @__PURE__ */ e(
        W,
        {
          icon: "📥",
          title: "No recent activity",
          body: "Completed ingest items will appear here."
        }
      ) : /* @__PURE__ */ e("div", { children: v.map((N) => /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3 py-2 border-b border-border", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0", title: N.sourcePath, children: N.sourcePath }),
        /* @__PURE__ */ e(F, { tone: "success", size: "xs", children: "done" }),
        /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0", children: Re(N.updatedAt) })
      ] }, N.itemId)) })
    ] })
  ] });
}
function Le(t) {
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
function Oe(t) {
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
function Fe(t) {
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
function Et() {
  const t = K(), { sources: a, loading: l, error: p, refresh: m, deleteSource: n, triggerSync: y } = Y(), [h, w] = I(() => /* @__PURE__ */ new Set()), S = A(async (i) => {
    w((v) => new Set(v).add(i)), await y(i), w((v) => {
      const k = new Set(v);
      return k.delete(i), k;
    }), m();
  }, [y, m]), b = A(async (i) => {
    confirm(`Delete source "${i.name}"? This cannot be undone.`) && await n(i.sourceId);
  }, [n]);
  return l && a.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "sources-page", className: "p-6 flex flex-col gap-3", children: [
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
    p && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Failed to load sources." }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            m();
          },
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] }),
    !p && a.length === 0 ? /* @__PURE__ */ e(
      W,
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
      /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ r(
        "tr",
        {
          className: "border-b border-border hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "p-2 font-medium text-text-primary", children: /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `source-name-link-${i.sourceId}`,
                onClick: () => t(`/ingest/sources/${i.sourceId}`),
                className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
                children: i.name
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(F, { tone: Fe(i.type), size: "xs", children: Oe(i.type) }) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(F, { tone: Le(i.status), size: "sm", children: i.status }) }),
            /* @__PURE__ */ e("td", { className: "p-2 text-text-secondary", children: i.lastSyncAt ? _e(i.lastSyncAt) : "Never" }),
            /* @__PURE__ */ e(
              "td",
              {
                "data-testid": `source-files-synced-${i.sourceId}`,
                className: "p-2 font-mono text-xs text-text-secondary",
                children: i.lastSyncStats ? /* @__PURE__ */ r("span", { children: [
                  i.lastSyncStats.filesFound,
                  i.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ r("span", { className: "text-text-tertiary", children: [
                    " · ",
                    i.lastSyncStats.filesNew,
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
                    h.has(i.sourceId) || i.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"
                  ),
                  disabled: h.has(i.sourceId) || i.status === "paused",
                  onClick: () => {
                    S(i.sourceId);
                  },
                  "data-testid": `sync-${i.sourceId}`,
                  children: h.has(i.sourceId) ? "Syncing..." : "Sync Now"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
                  onClick: () => {
                    b(i);
                  },
                  "data-testid": `delete-${i.sourceId}`,
                  children: "Delete"
                }
              )
            ] }) })
          ]
        },
        i.sourceId
      )) })
    ] }) })
  ] });
}
const ze = "", qe = ["extension", "path", "mimeType", "tag", "name"], Be = ["eq", "contains", "regex", "startsWith"];
function ie({ rules: t, onChange: a }) {
  const { idToken: l } = X(), [p, m] = I(null), [n, y] = I(""), [h, w] = I(null), [S, b] = I(!1), [i, v] = I(null), k = A((s) => {
    m(s), v({ ...t[s] });
  }, [t]), f = A(() => {
    m(null), v(null);
  }, []), N = A(() => {
    if (p === null || !i) return;
    const s = [...t];
    s[p] = i, a(s), m(null), v(null);
  }, [p, i, t, a]), u = A(() => {
    const s = {
      pattern: "",
      documentTypeId: "",
      priority: t.length > 0 ? Math.max(...t.map((C) => C.priority)) + 1 : 1
    }, c = [...t, s];
    a(c), m(c.length - 1), v(s);
  }, [t, a]), o = A((s) => {
    const c = t.filter((C, z) => z !== s);
    a(c), p === s && (m(null), v(null));
  }, [t, a, p]), x = A((s) => {
    if (s === 0) return;
    const c = [...t];
    [c[s - 1], c[s]] = [c[s], c[s - 1]];
    const C = c[s - 1].priority;
    c[s - 1] = { ...c[s - 1], priority: c[s].priority }, c[s] = { ...c[s], priority: C }, a(c), p === s ? m(s - 1) : p === s - 1 && m(s);
  }, [t, a, p]), g = A((s) => {
    if (s >= t.length - 1) return;
    const c = [...t];
    [c[s], c[s + 1]] = [c[s + 1], c[s]];
    const C = c[s].priority;
    c[s] = { ...c[s], priority: c[s + 1].priority }, c[s + 1] = { ...c[s + 1], priority: C }, a(c), p === s ? m(s + 1) : p === s + 1 && m(s);
  }, [t, a, p]), D = A(async () => {
    if (n.trim()) {
      b(!0), w(null);
      try {
        const s = { "Content-Type": "application/json" };
        l && (s.Authorization = `Bearer ${l}`);
        const c = await fetch(`${ze}/api/ingest/mapping/preview`, {
          method: "POST",
          headers: s,
          body: JSON.stringify({ path: n, rules: t })
        });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const C = await c.json();
        w(JSON.stringify(C, null, 2));
      } catch (s) {
        w(`Error: ${s instanceof Error ? s.message : String(s)}`);
      } finally {
        b(!1);
      }
    }
  }, [n, t, l]), T = (s) => {
    const c = s.split(":");
    return c.length >= 3 ? { field: c[0], op: c[1], value: c.slice(2).join(":") } : { field: "path", op: "contains", value: s };
  }, _ = (s, c, C) => `${s}:${c}:${C}`;
  return /* @__PURE__ */ r("div", { className: "flex flex-col gap-2.5", "data-testid": "mapping-rule-editor", children: [
    t.length === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-text-tertiary text-[13px]", children: "No mapping rules configured. Add one to get started." }) : /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full border-collapse text-xs", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Priority" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Condition" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Target Type ID" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Pipeline" }),
        /* @__PURE__ */ e("th", { className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: t.map((s, c) => {
        const C = p === c && i !== null, z = T(s.pattern);
        if (C) {
          const L = T(i.pattern);
          return /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              q,
              {
                size: "sm",
                className: "w-[50px]",
                type: "number",
                value: i.priority,
                onChange: (R) => v({ ...i, priority: Number(R.target.value) })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ r("div", { className: "flex gap-1 items-center flex-wrap", children: [
              /* @__PURE__ */ e(
                j,
                {
                  size: "sm",
                  className: "w-auto min-w-[90px]",
                  value: L.field,
                  onChange: (R) => v({ ...i, pattern: _(R.target.value, L.op, L.value) }),
                  options: qe.map((R) => ({ value: R, label: R }))
                }
              ),
              /* @__PURE__ */ e(
                j,
                {
                  size: "sm",
                  className: "w-auto min-w-[90px]",
                  value: L.op,
                  onChange: (R) => v({ ...i, pattern: _(L.field, R.target.value, L.value) }),
                  options: Be.map((R) => ({ value: R, label: R }))
                }
              ),
              /* @__PURE__ */ e(
                q,
                {
                  size: "sm",
                  className: "min-w-[100px]",
                  value: L.value,
                  placeholder: "value",
                  onChange: (R) => v({ ...i, pattern: _(L.field, L.op, R.target.value) })
                }
              )
            ] }) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              q,
              {
                size: "sm",
                className: "min-w-[80px]",
                value: i.documentTypeId,
                placeholder: "document type id",
                onChange: (R) => v({ ...i, documentTypeId: R.target.value })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ e(
              q,
              {
                size: "sm",
                className: "min-w-[80px]",
                value: i.pipelineId ?? "",
                placeholder: "(optional)",
                onChange: (R) => v({ ...i, pipelineId: R.target.value || void 0 })
              }
            ) }),
            /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right", children: /* @__PURE__ */ r("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: N, children: "Save" }),
              /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: f, children: "Cancel" })
            ] }) })
          ] }, c);
        }
        return /* @__PURE__ */ r("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold", children: s.priority }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle", children: /* @__PURE__ */ r("span", { className: "font-mono text-[11px]", children: [
            z.field,
            " ",
            z.op,
            ' "',
            z.value,
            '"'
          ] }) }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono", children: s.documentTypeId || "—" }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono", children: s.pipelineId ?? "—" }),
          /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right", children: /* @__PURE__ */ r("div", { className: "flex gap-1 justify-end", children: [
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => x(c), disabled: c === 0, title: "Move up", children: "↑" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => g(c), disabled: c === t.length - 1, title: "Move down", children: "↓" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary", onClick: () => k(c), children: "Edit" }),
            /* @__PURE__ */ e("button", { className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]", onClick: () => o(c), children: "Delete" })
          ] }) })
        ] }, c);
      }) })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "flex gap-2.5 items-center", children: /* @__PURE__ */ e(
      "button",
      {
        className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
        onClick: u,
        "data-testid": "add-rule-btn",
        children: "+ Add Rule"
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2 items-center mt-1", children: [
      /* @__PURE__ */ e(
        q,
        {
          className: "flex-1",
          value: n,
          onChange: (s) => y(s.target.value),
          placeholder: "Enter a file path to preview mapping..."
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: E(
            "px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start",
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
    h && /* @__PURE__ */ e("div", { className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words", children: h })
  ] });
}
const We = ["15m", "1h", "6h", "24h"];
function Z({ points: t, color: a, testId: l }) {
  const p = t.map((m) => ({ at: m.at, value: m.value ?? null }));
  return /* @__PURE__ */ e("div", { "data-testid": l, className: "h-[60px]", children: /* @__PURE__ */ e($e, { width: "100%", height: "100%", children: /* @__PURE__ */ r(Te, { data: p, margin: { top: 4, right: 4, left: 4, bottom: 4 }, children: [
    /* @__PURE__ */ e(De, { hide: !0 }),
    /* @__PURE__ */ e(
      Pe,
      {
        cursor: !1,
        contentStyle: { fontSize: 11, padding: "4px 6px" },
        formatter: ((m) => [m, ""])
      }
    ),
    /* @__PURE__ */ e(
      Ee,
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
function ee(t) {
  for (let a = t.length - 1; a >= 0; a--)
    if (t[a].value !== null) return t[a].value;
  return null;
}
function He({ sourceId: t }) {
  const [a, l] = I("1h"), { metrics: p, error: m } = ve(t, a);
  return /* @__PURE__ */ r("div", { "data-testid": "source-slo-panel", className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2 gap-2", children: [
      /* @__PURE__ */ r("span", { className: "text-sm font-bold text-text-primary", children: [
        "Health (last ",
        a,
        ")"
      ] }),
      /* @__PURE__ */ e(
        j,
        {
          "data-testid": "slo-window-picker",
          "aria-label": "Window",
          className: "w-auto min-w-[100px]",
          value: a,
          onChange: (n) => l(n.target.value),
          options: We.map((n) => ({ value: n, label: `Last ${n}` }))
        }
      )
    ] }),
    m ? /* @__PURE__ */ r("div", { "data-testid": "slo-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs", children: [
      "Couldn't load source metrics: ",
      m
    ] }) : null,
    p ? /* @__PURE__ */ r("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "p95 latency" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-latency-value", className: "text-base font-bold text-text-primary", children: (() => {
          const n = ee(p.latencyP95);
          return n === null ? "—" : `${Math.round(n)} ms`;
        })() }),
        /* @__PURE__ */ e(Z, { points: p.latencyP95, color: "var(--color-state-completed)", testId: "slo-latency-chart" })
      ] }),
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "error rate" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-error-rate-value", className: "text-base font-bold text-text-primary", children: (() => {
          const n = ee(p.errorRate);
          return n === null ? "—" : `${n.toFixed(1)}%`;
        })() }),
        /* @__PURE__ */ e(Z, { points: p.errorRate, color: "var(--color-state-failed)", testId: "slo-error-rate-chart" })
      ] }),
      /* @__PURE__ */ r("div", { className: "px-2.5 py-2 bg-surface-inset rounded-lg", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "queue depth" }),
        /* @__PURE__ */ e("div", { "data-testid": "slo-queue-depth-value", className: "text-base font-bold text-text-primary", children: ee(p.queueDepth) ?? 0 }),
        /* @__PURE__ */ e(Z, { points: p.queueDepth, color: "var(--color-state-awaiting)", testId: "slo-queue-depth-chart" })
      ] })
    ] }) : null
  ] });
}
const oe = [
  { label: "Manual only", cron: "" },
  { label: "Every 15 min", cron: "*/15 * * * *" },
  { label: "Hourly", cron: "0 * * * *" },
  { label: "Every 6 hours", cron: "0 */6 * * *" },
  { label: "Daily 2am", cron: "0 2 * * *" },
  { label: "Weekly Mon 6am", cron: "0 6 * * 1" }
], U = "";
function le(t) {
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
function Je(t) {
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
function Ue(t) {
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
function Qe(t) {
  return t < 1e3 ? `${t}ms` : t < 6e4 ? `${(t / 1e3).toFixed(1)}s` : `${(t / 6e4).toFixed(1)}m`;
}
function Ve(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : a < 2592e5 ? `${Math.floor(a / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Ge(t) {
  return Array.isArray(t) ? t.map((a) => {
    if (typeof a.pattern == "string") return a;
    const l = a.condition;
    return {
      pattern: l ? `${l.field ?? "path"}:${l.op ?? "contains"}:${l.value ?? ""}` : "",
      documentTypeId: a.targetTypeId ?? a.documentTypeId ?? "",
      pipelineId: a.pipelineId,
      priority: a.priority ?? 0
    };
  }) : [];
}
function Rt() {
  const { id: t } = ye(), a = K(), { idToken: l } = X(), { pipelines: p } = Ne(), { types: m } = me({ idToken: l }), [n, y] = I(null), [h, w] = I(!0), [S, b] = I(null), [i, v] = I(!1), [k, f] = I(!1), [N, u] = I(!1), [o, x] = I({}), [g, D] = I([]), [T, _] = I(""), [s, c] = I(""), [C, z] = I({}), [L, R] = I(!1), B = A(() => {
    const d = { "Content-Type": "application/json" };
    return l && (d.Authorization = `Bearer ${l}`), d;
  }, [l]), J = A(async () => {
    if (t) {
      w(!0), b(null);
      try {
        const d = await fetch(`${U}/api/ingest/sources/${t}`, { headers: B() });
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const $ = await d.json(), M = { ...$, mappingRules: Ge($.mappingRules ?? []) };
        y(M);
      } catch (d) {
        b(d instanceof Error ? d.message : String(d));
      } finally {
        w(!1);
      }
    }
  }, [t, B]);
  H(() => {
    J();
  }, [J]);
  const xe = A(() => {
    n && (x({ ...n.config }), D([...n.mappingRules]), _(n.syncSchedule ?? ""), c(n.defaultPipelineId ?? ""), z({ ...n.pipelineByDocType ?? {} }), v(!0));
  }, [n]), fe = A(() => {
    v(!1);
  }, []), he = A(async () => {
    if (!(!n || !t)) {
      u(!0);
      try {
        const d = {
          config: o,
          mappingRules: g,
          syncSchedule: T.trim() || null,
          defaultPipelineId: s.trim() || null,
          pipelineByDocType: C
        }, $ = await fetch(`${U}/api/ingest/sources/${t}`, {
          method: "PUT",
          headers: B(),
          body: JSON.stringify(d)
        });
        if (!$.ok) throw new Error(`HTTP ${$.status}`);
        const M = await $.json();
        y(M), v(!1);
      } catch (d) {
        b(d instanceof Error ? d.message : String(d));
      } finally {
        u(!1);
      }
    }
  }, [n, t, o, g, T, s, C, B]), ne = i && n !== null && (JSON.stringify(o) !== JSON.stringify(n.config) || JSON.stringify(g) !== JSON.stringify(n.mappingRules) || T !== (n.syncSchedule ?? "") || s !== (n.defaultPipelineId ?? "") || JSON.stringify(C) !== JSON.stringify(n.pipelineByDocType ?? {}));
  H(() => {
    if (!ne) return;
    const d = ($) => {
      $.preventDefault(), $.returnValue = "";
    };
    return window.addEventListener("beforeunload", d), () => window.removeEventListener("beforeunload", d);
  }, [ne]);
  const be = A(async () => {
    if (t) {
      f(!0);
      try {
        const d = await fetch(`${U}/api/ingest/sources/${t}/sync`, {
          method: "POST",
          headers: B()
        });
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        await J();
      } catch (d) {
        b(d instanceof Error ? d.message : String(d));
      } finally {
        f(!1);
      }
    }
  }, [t, B, J]), ge = A(async () => {
    if (!n || !t) return;
    const d = n.status === "paused" ? "active" : "paused";
    try {
      const $ = await fetch(`${U}/api/ingest/sources/${t}`, {
        method: "PATCH",
        headers: B(),
        body: JSON.stringify({ status: d })
      });
      if (!$.ok) throw new Error(`HTTP ${$.status}`);
      const M = await $.json();
      y(M);
    } catch ($) {
      b($ instanceof Error ? $.message : String($));
    }
  }, [n, t, B]);
  return h && !n ? /* @__PURE__ */ r("div", { "data-testid": "source-detail-page", className: "p-6 flex flex-col gap-3", children: [
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
    /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3", role: "alert", children: [
      /* @__PURE__ */ r("span", { className: "text-[13px] font-medium", children: [
        "Failed to load source: ",
        S
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            J();
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
        /* @__PURE__ */ e(F, { tone: Ue(n.type), size: "sm", children: Je(n.type) }),
        /* @__PURE__ */ e(F, { tone: le(n.status), size: "sm", children: n.status })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex gap-2.5 items-center", children: i ? /* @__PURE__ */ r(G, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
            onClick: fe,
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
              he();
            },
            disabled: N,
            children: N ? "Saving..." : "Save Changes"
          }
        )
      ] }) : /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
          onClick: xe,
          children: "Edit"
        }
      ) })
    ] }),
    S && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: S }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b(null),
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Dismiss"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Configuration" }),
      i ? /* @__PURE__ */ e("div", { children: Object.entries(o).map(([d, $]) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: d }),
        /* @__PURE__ */ e(
          q,
          {
            className: "flex-1",
            value: typeof $ == "string" ? $ : JSON.stringify($),
            onChange: (M) => x({ ...o, [d]: M.target.value })
          }
        )
      ] }, d)) }) : /* @__PURE__ */ r("div", { children: [
        Object.entries(n.config).map(([d, $]) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: d }),
          /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: typeof $ == "string" ? $ : JSON.stringify($) })
        ] }, d)),
        Object.keys(n.config).length === 0 && /* @__PURE__ */ e("span", { className: "text-[13px] text-text-tertiary", children: "No configuration fields." })
      ] })
    ] }),
    n ? /* @__PURE__ */ e(He, { sourceId: n.sourceId }) : null,
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Mapping Rules" }),
      i ? /* @__PURE__ */ e(ie, { rules: g, onChange: D }) : /* @__PURE__ */ e(ie, { rules: n.mappingRules, onChange: () => {
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
              k || n.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"
            ),
            disabled: k || n.status === "paused",
            onClick: () => {
              be();
            },
            "data-testid": "sync-now-btn",
            children: k ? "Syncing..." : "Sync Now"
          }
        )
      ] }),
      n.lastSyncAt ? /* @__PURE__ */ r(G, { children: [
        /* @__PURE__ */ r("div", { className: "text-xs text-text-tertiary mb-2.5", children: [
          "Last synced: ",
          Ve(n.lastSyncAt),
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
            /* @__PURE__ */ e("div", { className: "text-xl font-bold text-text-primary leading-none", children: Qe(n.lastSyncStats.durationMs) }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight", children: "Duration" })
          ] })
        ] })
      ] }) : /* @__PURE__ */ e("span", { className: "text-[13px] text-text-tertiary", children: "No sync history yet." })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-3", children: "Settings" }),
      i ? /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: "Sync Schedule" }),
          /* @__PURE__ */ r("div", { className: "flex gap-2 flex-1 flex-wrap", children: [
            /* @__PURE__ */ e(
              j,
              {
                className: "w-auto min-w-[160px]",
                value: oe.some((d) => d.cron === T) ? T : "__custom__",
                onChange: (d) => {
                  d.target.value !== "__custom__" && _(d.target.value);
                },
                "data-testid": "schedule-preset",
                options: [
                  ...oe.map((d) => ({ value: d.cron, label: d.label })),
                  { value: "__custom__", label: "Custom…" }
                ]
              }
            ),
            /* @__PURE__ */ e(
              q,
              {
                mono: !0,
                className: "flex-1",
                value: T,
                onChange: (d) => _(d.target.value),
                placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
                "data-testid": "schedule-cron"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 mb-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[140px]", children: "Default Pipeline" }),
          /* @__PURE__ */ e(
            j,
            {
              className: "flex-1",
              value: s,
              onChange: (d) => c(d.target.value),
              "data-testid": "default-pipeline-picker",
              options: [
                { value: "", label: "— None (use mapping rule pipeline) —" },
                ...p.map((d) => ({
                  value: d.id,
                  label: `${d.name}${d.status ? ` (${d.status})` : ""}`
                })),
                ...s && !p.some((d) => d.id === s) ? [{ value: s, label: `${s} (unknown)` }] : []
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
                onClick: () => R(!L),
                className: "bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]",
                children: [
                  L ? "▾" : "▸",
                  " Per-matched-DocType pipeline override (",
                  Object.keys(C).length,
                  ")"
                ]
              }
            ),
            L ? /* @__PURE__ */ r("div", { "data-testid": "overrides-section", className: "flex flex-col gap-1.5", children: [
              Object.keys(C).length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No overrides — every matched type uses the default pipeline." }) : Object.entries(C).map(([d, $]) => /* @__PURE__ */ r("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ e("span", { className: "flex-[0_0_160px] text-[13px]", children: m.find((M) => M.id === d)?.name ?? d }),
                /* @__PURE__ */ e(
                  j,
                  {
                    "data-testid": `overrides-pipeline-${d}`,
                    className: "flex-1",
                    value: $,
                    onChange: (M) => z({ ...C, [d]: M.target.value }),
                    options: p.map((M) => ({ value: M.id, label: M.name }))
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    "data-testid": `overrides-remove-${d}`,
                    onClick: () => {
                      const M = { ...C };
                      delete M[d], z(M);
                    },
                    className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer",
                    children: "Remove"
                  }
                )
              ] }, d)),
              /* @__PURE__ */ e(
                j,
                {
                  "data-testid": "overrides-add-type",
                  className: "w-auto self-start",
                  value: "",
                  onChange: (d) => {
                    const $ = d.target.value;
                    $ && z({
                      ...C,
                      [$]: p[0]?.id ?? ""
                    });
                  },
                  options: [
                    { value: "", label: "+ Add override for type…" },
                    ...m.filter((d) => C[d.id] === void 0).map((d) => ({ value: d.id, label: d.name }))
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
          /* @__PURE__ */ e("span", { className: "text-[13px] text-text-secondary font-mono break-all", children: n.defaultPipelineId ? p.find((d) => d.id === n.defaultPipelineId)?.name ?? n.defaultPipelineId : "—" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight", children: "Status" }),
          /* @__PURE__ */ r("span", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ e(F, { tone: le(n.status), size: "sm", children: n.status }),
            /* @__PURE__ */ e(
              "button",
              {
                className: E(
                  "px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white",
                  n.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"
                ),
                onClick: () => {
                  ge();
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
const Ke = "", ae = [
  "queued",
  "mapping",
  "materializing",
  "triggering",
  "done"
];
function Ye(t) {
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
function Xe(t) {
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
function Ze(t) {
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
function et(t, a) {
  if (a === "failed")
    return t === "queued";
  const l = ae;
  return l.indexOf(t) <= l.indexOf(a);
}
function Q(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function tt({ item: t, sourceName: a, onClose: l, onRetry: p, onSkip: m }) {
  const { idToken: n } = X(), [y, h] = I(null), [w, S] = I(null), { events: b } = ue();
  H(() => {
    if (!t) return;
    const x = (g) => {
      g.key === "Escape" && l();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [t, l]);
  const i = O(() => {
    if (!t) return /* @__PURE__ */ new Map();
    const x = /* @__PURE__ */ new Map();
    for (const g of b)
      g.ingestId === t.itemId && (g.type === "item.status" && typeof g.status == "string" && typeof g.timestamp == "string" && x.set(g.status, g.timestamp), g.type === "item.materialized" && typeof g.timestamp == "string" && x.set("done", g.timestamp), g.type === "item.failed" && typeof g.timestamp == "string" && x.set("failed", g.timestamp));
    return x;
  }, [b, t]);
  if (!t) return null;
  const v = t.status === "failed", k = t.status === "done" || t.status === "failed", f = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, N = async () => {
    h("retry");
    try {
      await p(t.itemId);
    } finally {
      h(null), l();
    }
  }, u = async () => {
    h("skip");
    try {
      await m(t.itemId);
    } finally {
      h(null), l();
    }
  }, o = async () => {
    h("remap"), S(null);
    try {
      const x = { "Content-Type": "application/json" };
      n && (x.Authorization = `Bearer ${n}`);
      const g = await fetch(`${Ke}/api/ingest/items/${t.itemId}/remap`, {
        method: "POST",
        headers: x
      });
      if (!g.ok) throw new Error(`HTTP ${g.status}`);
      l();
    } catch (x) {
      S(x instanceof Error ? x.message : String(x));
    } finally {
      h(null);
    }
  };
  return /* @__PURE__ */ e(
    "div",
    {
      className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
      onClick: l,
      "data-testid": "ingest-item-drawer-scrim",
      children: /* @__PURE__ */ r(
        "div",
        {
          className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
          onClick: (x) => x.stopPropagation(),
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
                  onClick: l,
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
                  /* @__PURE__ */ e(F, { tone: Ye(t.status), size: "sm", children: t.status }),
                  a && /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary", children: [
                    "from ",
                    /* @__PURE__ */ e("strong", { className: "text-text-secondary", children: a })
                  ] }),
                  /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary ml-auto", children: [
                    "Updated ",
                    Q(t.updatedAt)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Status timeline" }),
                /* @__PURE__ */ r("div", { className: "flex flex-col relative", children: [
                  ae.map((x, g) => {
                    const D = et(x, t.status), T = x === t.status, _ = v && g === 0, s = {
                      ...D ? {
                        background: _ ? "var(--color-state-failed)" : "var(--color-state-completed)",
                        borderColor: _ ? "var(--color-state-failed)" : "var(--color-state-completed)"
                      } : {},
                      ...T && !k ? { background: "var(--color-state-running)", borderColor: "var(--color-state-running)" } : {}
                    };
                    return /* @__PURE__ */ r("div", { className: "flex items-start gap-3 relative py-1.5", children: [
                      g < ae.length - 1 && /* @__PURE__ */ e("span", { className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border", "aria-hidden": "true" }),
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
                          style: s,
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("div", { className: "text-[13px] font-medium text-text-primary", children: x }),
                        (() => {
                          const c = i.get(x);
                          return c ? /* @__PURE__ */ e("div", { "data-testid": `timeline-meta-${x}`, className: "text-[11px] text-text-tertiary mt-0.5", children: Q(c) }) : T ? /* @__PURE__ */ e("div", { "data-testid": `timeline-meta-${x}`, className: "text-[11px] text-text-tertiary mt-0.5", children: k ? Q(t.updatedAt) : "in progress" }) : null;
                        })()
                      ] })
                    ] }, x);
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
                      /* @__PURE__ */ e("div", { "data-testid": "timeline-meta-failed", className: "text-[11px] text-text-tertiary mt-0.5", children: Q(i.get("failed") ?? t.updatedAt) })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide", children: "Mapping decision" }),
                t.mappingMethod ? /* @__PURE__ */ r(G, { children: [
                  /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ e(F, { tone: Xe(t.mappingMethod), size: "sm", children: t.mappingMethod }),
                    /* @__PURE__ */ e("span", { className: "text-xs text-text-secondary", children: Ze(t.mappingMethod) })
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
                /* @__PURE__ */ e("div", { className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words", children: t.error })
              ] }),
              w && /* @__PURE__ */ r("div", { className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words", children: [
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
                    y || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"
                  ),
                  onClick: () => {
                    u();
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
const rt = ["queued", "mapping", "materializing", "triggering", "done", "failed"];
function at(t) {
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
function nt(t) {
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
function st(t, a = 50) {
  return t.length <= a ? t : "..." + t.slice(t.length - a + 3);
}
function At() {
  const [t, a] = I(null), [l, p] = I(null), [m, n] = I(null), { sources: y } = Y(), { items: h, loading: w, error: S, refresh: b, retryItem: i, skipItem: v } = pe({
    sourceId: t,
    status: l
  }), k = m ? h.find((o) => o.itemId === m.itemId) ?? m : null, f = O(() => {
    const o = /* @__PURE__ */ new Map();
    for (const x of y)
      o.set(x.sourceId, x.name);
    return o;
  }, [y]), N = A(async (o) => {
    await i(o);
  }, [i]), u = A(async (o) => {
    await v(o);
  }, [v]);
  return w && h.length === 0 ? /* @__PURE__ */ r("div", { "data-testid": "ingest-items-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest Items" }) }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 }),
    /* @__PURE__ */ e(P, { height: 48 })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": "ingest-items-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Ingest Items" }),
      /* @__PURE__ */ r("span", { className: "text-[13px] text-text-tertiary", children: [
        h.length,
        " item",
        h.length !== 1 ? "s" : ""
      ] })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2.5 items-center mb-3 flex-wrap", children: [
      /* @__PURE__ */ e(
        j,
        {
          className: "w-auto",
          value: t ?? "",
          onChange: (o) => a(o.target.value || null),
          "data-testid": "source-filter",
          options: [
            { value: "", label: "All Sources" },
            ...y.map((o) => ({ value: o.sourceId, label: o.name }))
          ]
        }
      ),
      /* @__PURE__ */ e(
        j,
        {
          className: "w-auto",
          value: l ?? "",
          onChange: (o) => p(o.target.value || null),
          "data-testid": "status-filter",
          options: [
            { value: "", label: "All" },
            ...rt.map((o) => ({ value: o, label: o }))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
          onClick: () => {
            b();
          },
          "data-testid": "refresh-btn",
          children: "Refresh"
        }
      )
    ] }),
    S && /* @__PURE__ */ r("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4", role: "alert", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Failed to load ingest items." }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            b();
          },
          className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
          children: "Retry"
        }
      )
    ] }),
    !S && h.length === 0 ? /* @__PURE__ */ e(
      W,
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
      /* @__PURE__ */ e("tbody", { children: h.map((o) => /* @__PURE__ */ r(
        "tr",
        {
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          onClick: () => n(o),
          "data-testid": `item-row-${o.itemId}`,
          children: [
            /* @__PURE__ */ e("td", { className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap", title: o.sourcePath, children: st(o.sourcePath) }),
            /* @__PURE__ */ e("td", { className: "p-2 text-text-secondary", children: f.get(o.sourceId) ?? o.sourceId.slice(0, 8) }),
            /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(F, { tone: at(o.status), size: "sm", children: o.status }) }),
            /* @__PURE__ */ e("td", { className: "p-2 font-mono text-[11px] text-text-secondary", children: o.documentTypeId ?? "—" }),
            /* @__PURE__ */ e("td", { className: "p-2", children: o.mappingMethod ? /* @__PURE__ */ e(F, { tone: nt(o.mappingMethod), size: "xs", children: o.mappingMethod }) : "—" }),
            /* @__PURE__ */ e("td", { className: "p-2", children: o.documentId ? /* @__PURE__ */ r(
              "a",
              {
                href: `/documents/${o.documentId}`,
                className: "text-primary no-underline font-medium text-xs",
                onClick: (x) => x.stopPropagation(),
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
                onClick: (x) => x.stopPropagation(),
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
                      className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
                      onClick: () => {
                        u(o.itemId);
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
      tt,
      {
        item: k,
        sourceName: k ? f.get(k.sourceId) : void 0,
        onClose: () => n(null),
        onRetry: async (o) => {
          await N(o);
        },
        onSkip: async (o) => {
          await u(o);
        }
      }
    )
  ] });
}
const it = [
  { value: "", label: "All events" },
  { value: "mapping.decided", label: "mapping.decided" },
  { value: "source.created", label: "source.created" },
  { value: "source.updated", label: "source.updated" },
  { value: "source.paused", label: "source.paused" },
  { value: "source.resumed", label: "source.resumed" },
  { value: "writeback.attempted", label: "writeback.attempted" },
  { value: "writeback.failed", label: "writeback.failed" }
], de = [
  { value: "1h", label: "Last 1h", ms: 3600 * 1e3 },
  { value: "6h", label: "Last 6h", ms: 360 * 60 * 1e3 },
  { value: "24h", label: "Last 24h", ms: 1440 * 60 * 1e3 },
  { value: "7d", label: "Last 7d", ms: 10080 * 60 * 1e3 },
  { value: "all", label: "All time", ms: null }
];
function Mt() {
  const [t, a] = I("24h"), [l, p] = I(""), [m, n] = I(""), [y, h] = I(""), [w, S] = I(null), b = O(() => {
    const f = de.find((N) => N.value === t);
    return {
      since: f && f.ms !== null ? new Date(Date.now() - f.ms).toISOString() : void 0,
      eventType: l || void 0,
      actor: m.trim() || void 0,
      targetId: y.trim() || void 0,
      limit: 200
    };
  }, [t, l, m, y]), { entries: i, loading: v, error: k } = we(b);
  return /* @__PURE__ */ r("div", { "data-testid": "ingest-audit-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "mb-3", children: /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Audit log" }) }),
    /* @__PURE__ */ r("div", { className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Time" }),
      /* @__PURE__ */ e(
        j,
        {
          "data-testid": "audit-time-range",
          "aria-label": "Time range",
          className: "w-auto min-w-[140px]",
          value: t,
          onChange: (f) => a(f.target.value),
          options: de.map((f) => ({ value: f.value, label: f.label }))
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Event" }),
      /* @__PURE__ */ e(
        j,
        {
          "data-testid": "audit-event-type",
          "aria-label": "Event type",
          className: "w-auto min-w-[140px]",
          value: l,
          onChange: (f) => p(f.target.value),
          options: it.map((f) => ({ value: f.value, label: f.label }))
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Actor" }),
      /* @__PURE__ */ e(
        q,
        {
          "data-testid": "audit-actor",
          "aria-label": "Actor",
          className: "w-auto min-w-[140px]",
          value: m,
          onChange: (f) => n(f.target.value),
          placeholder: "email or system"
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Target" }),
      /* @__PURE__ */ e(
        q,
        {
          "data-testid": "audit-target-id",
          "aria-label": "Target ID",
          className: "w-auto min-w-[140px]",
          value: y,
          onChange: (f) => h(f.target.value),
          placeholder: "sourceId / itemId"
        }
      )
    ] }),
    k ? /* @__PURE__ */ r("div", { "data-testid": "audit-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load audit log: ",
      k
    ] }) : null,
    v && i.length === 0 ? /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(P, { height: 200 }) }) : i.length === 0 && !k ? /* @__PURE__ */ e(
      W,
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
      /* @__PURE__ */ e("tbody", { children: i.map((f) => /* @__PURE__ */ e(
        ot,
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
function ot({ entry: t, expanded: a, onToggle: l }) {
  return /* @__PURE__ */ r(G, { children: [
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
          onClick: l,
          children: a ? "hide" : "detail"
        }
      ) })
    ] }),
    a ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { colSpan: 6, className: "text-[13px] p-2 align-top border-b border-border", children: /* @__PURE__ */ e("pre", { "data-testid": `audit-detail-${t.auditId}`, className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto", children: JSON.stringify(t.detail, null, 2) }) }) }) : null
  ] });
}
function V(t) {
  const a = Date.now() - new Date(t).getTime();
  return a < 6e4 ? "just now" : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function lt(t) {
  if (t == null) return "—";
  if (typeof t == "string") return t;
  try {
    return JSON.stringify(t, null, 2);
  } catch {
    return String(t);
  }
}
function jt() {
  const { conflicts: t, loading: a, error: l, usingMock: p, refresh: m, resolveConflict: n, discardConflict: y } = Ie(), { sources: h } = Y(), [w, S] = I(null), [b, i] = I("platform"), [v, k] = I({}), [f, N] = I(""), [u, o] = I(!1), x = O(() => {
    const s = /* @__PURE__ */ new Map();
    for (const c of h) s.set(c.sourceId, c.name);
    return s;
  }, [h]), g = O(() => t.filter((s) => s.status === "pending"), [t]);
  H(() => {
    w && g.some((s) => s.conflictId === w) || S(g[0]?.conflictId ?? null);
  }, [g, w]);
  const D = O(
    () => g.find((s) => s.conflictId === w) ?? null,
    [g, w]
  );
  H(() => {
    i("platform"), k({}), N("");
  }, [w]);
  const T = async () => {
    if (D) {
      o(!0);
      try {
        const s = {
          pick: b,
          ...Object.keys(v).length > 0 ? { fieldChoices: v } : {},
          ...f.trim() ? { note: f.trim() } : {}
        };
        await n(D.conflictId, s);
      } finally {
        o(!1);
      }
    }
  }, _ = async () => {
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
            m();
          },
          "data-testid": "conflicts-refresh",
          children: "Refresh"
        }
      )
    ] }),
    p && /* @__PURE__ */ r(
      "div",
      {
        className: "px-3.5 py-2.5 bg-warning-bg border border-[var(--color-state-awaiting)] text-warning-fg rounded-lg text-xs mb-3",
        "data-testid": "conflicts-mock-banner",
        children: [
          "Showing mock conflicts — backend endpoint ",
          /* @__PURE__ */ e("code", { children: "/api/sync/conflicts" }),
          " not implemented yet."
        ]
      }
    ),
    l && !p && /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3", role: "alert", children: /* @__PURE__ */ r("span", { className: "text-[13px]", children: [
      "Failed to load conflicts: ",
      l
    ] }) }),
    g.length === 0 ? /* @__PURE__ */ e(
      W,
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
        g.map((s) => {
          const c = s.conflictId === w;
          return /* @__PURE__ */ r(
            "div",
            {
              className: E(
                "px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1",
                c && "bg-primary-bg"
              ),
              onClick: () => S(s.conflictId),
              "data-testid": `conflict-row-${s.conflictId}`,
              children: [
                /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary leading-tight line-clamp-2", children: s.summary }),
                /* @__PURE__ */ r("div", { className: "flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary", children: [
                  /* @__PURE__ */ r(F, { tone: "warning", size: "xs", children: [
                    s.fields.length,
                    " field",
                    s.fields.length !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ e("span", { children: x.get(s.sourceId) ?? s.sourceId.slice(0, 10) }),
                  /* @__PURE__ */ e("span", { children: "•" }),
                  /* @__PURE__ */ e("span", { children: V(s.detectedAt) })
                ] })
              ]
            },
            s.conflictId
          );
        })
      ] }),
      D && /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4", "data-testid": "conflict-detail", children: [
        /* @__PURE__ */ r("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("h3", { className: "m-0 text-base font-bold text-text-primary", children: D.summary }),
            /* @__PURE__ */ r("div", { className: "mt-1.5 flex gap-2 items-center flex-wrap", children: [
              /* @__PURE__ */ e(F, { tone: "info", size: "xs", children: x.get(D.sourceId) ?? D.sourceId }),
              D.documentTypeId && /* @__PURE__ */ e(F, { tone: "purple", size: "xs", children: D.documentTypeId }),
              /* @__PURE__ */ r("span", { className: "text-[11px] text-text-tertiary", children: [
                "Detected ",
                V(D.detectedAt)
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary font-mono break-all mt-1.5", children: D.sourceRef })
          ] }),
          /* @__PURE__ */ r("div", { className: "text-[11px] text-text-tertiary text-right", children: [
            /* @__PURE__ */ r("div", { children: [
              "Source edited: ",
              V(D.sourceUpdatedAt)
            ] }),
            /* @__PURE__ */ r("div", { children: [
              "Platform edited: ",
              V(D.platformUpdatedAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-text-secondary mr-1", children: "Apply to all fields:" }),
          ["source", "merged", "platform"].map((s) => {
            const c = s !== "merged" || D.fields.some((C) => C.mergedValue !== void 0);
            return /* @__PURE__ */ e(
              "button",
              {
                className: E(
                  "px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer",
                  b === s ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-border",
                  !c && "opacity-40 cursor-not-allowed"
                ),
                onClick: () => c && i(s),
                disabled: !c,
                "data-testid": `global-pick-${s}`,
                children: s === "source" ? "Source side" : s === "platform" ? "Platform side" : "Auto-merged"
              },
              s
            );
          })
        ] }),
        D.fields.map((s) => /* @__PURE__ */ e(
          dt,
          {
            field: s,
            globalPick: b,
            fieldChoice: v[s.field],
            onPick: (c) => k((C) => ({ ...C, [s.field]: c })),
            onClear: () => k((c) => {
              const C = { ...c };
              return delete C[s.field], C;
            })
          },
          s.field
        )),
        /* @__PURE__ */ r("div", { className: "flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap", children: [
          /* @__PURE__ */ e(
            q,
            {
              className: "min-w-[240px] flex-1",
              placeholder: "Optional note (logged in audit trail)",
              value: f,
              onChange: (s) => N(s.target.value),
              "data-testid": "conflict-note"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: E(
                "px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]",
                u && "opacity-50 cursor-not-allowed"
              ),
              onClick: () => {
                _();
              },
              disabled: u,
              "data-testid": "conflict-discard",
              children: "Discard"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: E(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
                u && "opacity-50 cursor-not-allowed"
              ),
              onClick: () => {
                T();
              },
              disabled: u,
              "data-testid": "conflict-resolve",
              children: u ? "Resolving…" : "Resolve"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function dt({
  field: t,
  globalPick: a,
  fieldChoice: l,
  onPick: p,
  onClear: m
}) {
  const n = l ?? a, y = t.mergedValue !== void 0;
  return /* @__PURE__ */ r("div", { className: "border border-border rounded-lg overflow-hidden", "data-testid": `field-diff-${t.field}`, children: [
    /* @__PURE__ */ r("div", { className: "px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary font-semibold", children: t.field }),
      l && /* @__PURE__ */ e(
        "button",
        {
          onClick: m,
          className: "text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium",
          "data-testid": `field-clear-${t.field}`,
          children: "Clear override"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-3", children: [
      /* @__PURE__ */ e(
        te,
        {
          label: "Source side",
          value: t.sourceValue,
          selected: n === "source"
        }
      ),
      /* @__PURE__ */ e(
        te,
        {
          label: y ? "Auto-merged" : "Auto-merged (none)",
          value: y ? t.mergedValue : "—",
          selected: y && n === "merged",
          dim: !y
        }
      ),
      /* @__PURE__ */ e(
        te,
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
      ["source", "merged", "platform"].map((h) => {
        const w = h !== "merged" || y;
        return /* @__PURE__ */ e(
          "button",
          {
            className: E(
              "text-[11px] px-2.5 py-0.5 rounded-full cursor-pointer border font-[inherit] font-medium",
              n === h ? "bg-[var(--color-state-completed)] text-white border-[var(--color-state-completed)]" : "bg-surface text-text-secondary border-border",
              !w && "opacity-40 cursor-not-allowed"
            ),
            onClick: () => w && p(h),
            disabled: !w,
            "data-testid": `field-pick-${t.field}-${h}`,
            children: h === "source" ? "Source" : h === "platform" ? "Platform" : "Merged"
          },
          h
        );
      })
    ] })
  ] });
}
function te({
  label: t,
  value: a,
  selected: l,
  last: p,
  dim: m
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: E(
        "p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface",
        !p && "border-r border-border",
        l && "bg-success-bg border-[var(--color-state-completed)]",
        m && "opacity-55"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans", children: t }),
        /* @__PURE__ */ e("div", { children: lt(a) })
      ]
    }
  );
}
function ct(t) {
  const a = Date.now() - t;
  return a < 0 ? "just now" : a < 6e4 ? `${Math.floor(a / 1e3)}s ago` : a < 36e5 ? `${Math.floor(a / 6e4)}m ago` : a < 864e5 ? `${Math.floor(a / 36e5)}h ago` : `${Math.floor(a / 864e5)}d ago`;
}
function Lt() {
  const { entries: t, loading: a, error: l, replay: p, drop: m } = Se();
  return /* @__PURE__ */ r("div", { "data-testid": "ingest-dlq-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Dead Letter Queue" }),
      /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "Items the engine couldn't process. Replay re-enqueues; drop purges." })
    ] }) }),
    l ? /* @__PURE__ */ e("div", { "data-testid": "ingest-dlq-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: l }) : null,
    a && t.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 })
    ] }) : t.length === 0 && !l ? /* @__PURE__ */ e(
      W,
      {
        icon: "🧹",
        title: "DLQ is empty",
        body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
        testId: "ingest-dlq-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "ingest-dlq-list", className: "flex flex-col gap-3", children: t.map((n) => /* @__PURE__ */ e(
      pt,
      {
        entry: n,
        onReplay: () => {
          p(n.id);
        },
        onDrop: () => {
          m(n.id);
        }
      },
      n.id
    )) })
  ] });
}
function pt({ entry: t, onReplay: a, onDrop: l }) {
  return /* @__PURE__ */ r("div", { "data-testid": `dlq-row-${t.id}`, className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[13px] text-text-primary", title: t.id, children: t.id }),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: ct(t.failedAtMs) })
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
          onClick: l,
          children: "Drop"
        }
      )
    ] })
  ] });
}
function Ot() {
  const { proposals: t, loading: a, error: l, promote: p, reject: m } = ke();
  return /* @__PURE__ */ r("div", { "data-testid": "doctype-proposals-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "mb-4", children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "DocType proposals" }),
      /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary mt-1", children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals." })
    ] }),
    l ? /* @__PURE__ */ r("div", { "data-testid": "proposals-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load DocType proposals: ",
      l
    ] }) : null,
    a && t.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 120 }),
      /* @__PURE__ */ e(P, { height: 120 })
    ] }) : t.length === 0 && !l ? /* @__PURE__ */ e(
      W,
      {
        icon: "🧬",
        title: "No proposals waiting",
        body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
        testId: "proposals-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "proposals-list", className: "flex flex-col gap-3", children: t.map((n) => /* @__PURE__ */ e(
      ut,
      {
        proposal: n,
        onPromote: () => {
          p(n.proposalId);
        },
        onReject: () => {
          m(n.proposalId);
        }
      },
      n.proposalId
    )) })
  ] });
}
function ut({ proposal: t, onPromote: a, onReject: l }) {
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
    t.proposedFields.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.proposedFields.map((p) => /* @__PURE__ */ r("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono", children: [
      p.name,
      p.required ? "*" : ""
    ] }, p.name)) }) : null,
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
          onClick: l,
          children: "Reject"
        }
      )
    ] })
  ] });
}
function Ft() {
  const { idToken: t } = X(), { items: a, threshold: l, loading: p, error: m, remap: n, skip: y } = Ce(), { types: h } = me({ idToken: t }), [w, S] = I({});
  return /* @__PURE__ */ r("div", { "data-testid": "mapping-review-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e("div", { className: "flex items-baseline justify-between mb-4", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary", children: "Mapping needs review" }),
      /* @__PURE__ */ r("div", { className: "text-xs text-text-tertiary", children: [
        "Showing items with confidence < ",
        Math.round(l * 100),
        "%."
      ] })
    ] }) }),
    m ? /* @__PURE__ */ r("div", { "data-testid": "mapping-review-error", className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3", children: [
      "Couldn't load review queue: ",
      m
    ] }) : null,
    p && a.length === 0 ? /* @__PURE__ */ r("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 }),
      /* @__PURE__ */ e(P, { height: 96 })
    ] }) : a.length === 0 && !m ? /* @__PURE__ */ e(
      W,
      {
        icon: "✨",
        title: "No items need review",
        body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
        testId: "mapping-review-empty"
      }
    ) : /* @__PURE__ */ e("div", { "data-testid": "mapping-review-list", className: "flex flex-col gap-3", children: a.map((b) => /* @__PURE__ */ e(
      mt,
      {
        item: b,
        docTypes: h,
        remapTypeId: w[b.itemId] ?? "",
        onPickRemapType: (i) => S((v) => ({ ...v, [b.itemId]: i })),
        onAccept: () => {
          b.documentTypeId && n(b.itemId, b.documentTypeId);
        },
        onRemap: () => {
          const i = w[b.itemId];
          i && n(b.itemId, i);
        },
        onDiscard: () => {
          y(b.itemId);
        }
      },
      b.itemId
    )) })
  ] });
}
function mt({ item: t, docTypes: a, remapTypeId: l, onPickRemapType: p, onAccept: m, onRemap: n, onDiscard: y }) {
  const w = a.find((b) => b.id === t.documentTypeId)?.name ?? t.documentTypeId ?? "(unknown)", S = typeof t.mappingConfidence == "number" ? `${Math.round(t.mappingConfidence * 100)}%` : "—";
  return /* @__PURE__ */ r("div", { "data-testid": `review-row-${t.itemId}`, className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", title: t.sourcePath, children: t.sourcePath }),
      /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg", children: [
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
          onClick: m,
          disabled: !t.documentTypeId,
          title: t.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
          children: "Accept suggestion"
        }
      ),
      /* @__PURE__ */ e(
        j,
        {
          "data-testid": `review-remap-picker-${t.itemId}`,
          className: "w-auto min-w-[200px]",
          value: l,
          onChange: (b) => p(b.target.value),
          options: [
            { value: "", label: "Re-map to…" },
            ...a.map((b) => ({ value: b.id, label: b.name }))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          "data-testid": `review-remap-${t.itemId}`,
          className: E(
            "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            !l && "opacity-50 cursor-not-allowed"
          ),
          onClick: n,
          disabled: !l,
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
function xt(t) {
  return new Date(t).toLocaleTimeString("en-US", { hour12: !1, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
function ft(t) {
  const a = Date.now() - new Date(t).getTime(), l = Math.floor(a / 1e3);
  if (l < 60) return `${l}s`;
  const p = Math.floor(l / 60), m = l % 60;
  return `${p}m ${m}s`;
}
function ht(t) {
  return t.startsWith("sync.") ? "bg-info-bg text-info-fg" : t === "item.mapped" ? "bg-accent-bg text-accent-fg" : t === "item.materialized" ? "bg-success-bg text-success-fg" : t === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function ce(t) {
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
const re = [
  { value: "all", label: "All", match: (t) => !0 },
  { value: "sync", label: "Sync", match: (t) => t.startsWith("sync.") },
  { value: "item", label: "Item", match: (t) => t.startsWith("item.") },
  { value: "source", label: "Source", match: (t) => t.startsWith("source.") },
  { value: "errors", label: "Errors", match: (t) => t === "item.failed" || t === "sync.failed" }
];
function _t() {
  const t = K(), { events: a, activeSyncs: l, clearEvents: p } = ue(), m = se(null), [n, y] = I(!1), [h, w] = I(""), [S, b] = I("all"), i = se(null);
  H(() => {
    n && i.current === null ? i.current = [...a] : n || (i.current = null);
  }, [n, a]);
  const v = O(() => {
    const u = /* @__PURE__ */ new Set();
    for (const o of a) {
      const x = o.sourceId;
      typeof x == "string" && x && u.add(x);
    }
    for (const o of l.keys()) u.add(o);
    return Array.from(u).sort();
  }, [a, l]), k = O(() => {
    const u = n && i.current ? i.current : a, o = re.find((x) => x.value === S) ?? re[0];
    return u.filter((x) => !(!o.match(x.type) || h && x.sourceId !== h));
  }, [a, n, S, h]);
  H(() => {
    n || m.current && (m.current.scrollTop = m.current.scrollHeight);
  }, [k.length, n]);
  const f = O(() => {
    const u = a.filter((o) => o.type === "item.failed" || o.type === "sync.failed").length;
    return {
      totalEvents: a.length,
      activeSyncsCount: l.size,
      errorsCount: u
    };
  }, [a, l]), N = O(
    () => Array.from(l.values()),
    [l]
  );
  return /* @__PURE__ */ r("div", { "data-testid": "sync-monitor-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Sync Monitor" }),
        /* @__PURE__ */ r("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border", children: [
          /* @__PURE__ */ e("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }),
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
      ] }) : N.map((u) => {
        const o = u.fileCount > 0 ? Math.round(u.filesFetched / u.fileCount * 100) : 0;
        return /* @__PURE__ */ r("div", { className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: u.sourceName }),
            /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary font-mono", children: ft(u.startedAt) })
          ] }),
          /* @__PURE__ */ e("div", { className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2", children: /* @__PURE__ */ e(
            "div",
            {
              className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
              style: { width: `${o}%` }
            }
          ) }),
          /* @__PURE__ */ r("div", { className: "flex gap-4 text-xs text-text-secondary", children: [
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Files: ",
              u.filesFetched,
              "/",
              u.fileCount,
              " (",
              o,
              "%)"
            ] }),
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Mapped: ",
              u.itemsMapped
            ] }),
            /* @__PURE__ */ r("span", { className: "flex items-center gap-1", children: [
              "Materialized: ",
              u.itemsMaterialized
            ] })
          ] })
        ] }, u.sourceId);
      })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-surface border border-border rounded-[10px] p-4 mb-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3 gap-2 flex-wrap", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: "Event Log" }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ e(
            j,
            {
              "data-testid": "event-source-filter",
              "aria-label": "Filter by source",
              className: "w-auto min-w-[140px]",
              value: h,
              onChange: (u) => w(u.target.value),
              options: [
                { value: "", label: "All sources" },
                ...v.map((u) => ({ value: u, label: u.slice(0, 12) }))
              ]
            }
          ),
          /* @__PURE__ */ e(
            j,
            {
              "data-testid": "event-type-filter",
              "aria-label": "Filter by event type",
              className: "w-auto min-w-[110px]",
              value: S,
              onChange: (u) => b(u.target.value),
              options: re.map((u) => ({ value: u.value, label: u.label }))
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": "event-pause-toggle",
              className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
              onClick: () => y((u) => !u),
              title: n ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
              children: n ? "Resume" : "Pause"
            }
          ),
          a.length > 0 && /* @__PURE__ */ e(
            "button",
            {
              className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
              onClick: p,
              children: "Clear"
            }
          )
        ] })
      ] }),
      k.length === 0 ? /* @__PURE__ */ r("div", { className: "py-8 text-center", children: [
        /* @__PURE__ */ e("div", { className: "text-sm font-medium text-text-secondary mb-1", children: a.length === 0 ? "No events yet" : "No events match the current filter" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: a.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter." })
      ] }) : /* @__PURE__ */ e("div", { ref: m, "data-testid": "event-log", className: "max-h-80 overflow-y-auto flex flex-col gap-0.5", children: k.map((u, o) => /* @__PURE__ */ r("div", { className: "flex items-center gap-2 px-2 py-1 rounded text-xs", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]", children: xt(u.timestamp) }),
        /* @__PURE__ */ e("span", { className: E("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", ht(u.type)), children: u.type }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap", title: ce(u), children: ce(u) })
      ] }, `${u.timestamp}-${o}`)) })
    ] })
  ] });
}
export {
  jt as ConflictsPage,
  Lt as DeadLetterQueuePage,
  Ot as DocTypeProposalsPage,
  Mt as IngestAuditPage,
  Pt as IngestDashboard,
  tt as IngestItemDrawer,
  At as IngestItemsPage,
  Ft as MappingReviewPage,
  ie as MappingRuleEditor,
  Rt as SourceDetailPage,
  He as SourceSloPanel,
  Et as SourcesPage,
  _t as SyncMonitorPage
};
