import { useState as g, useRef as A, useCallback as w, useEffect as E } from "react";
import { u as P } from "./IdentityContext-CLalsm_M.js";
import { u as _ } from "./WebSocketContext-DPGFyPeZ.js";
const v = "";
function W() {
  const { idToken: e } = P(), [h, f] = g([]), [$, T] = g(!0), [I, d] = g(null), i = A(!1), a = w(() => {
    const o = { "Content-Type": "application/json" };
    return e && (o.Authorization = `Bearer ${e}`), o;
  }, [e]), s = w(async () => {
    T(!0), d(null);
    try {
      const o = await fetch(`${v}/api/ingest/sources`, { headers: a() });
      if (!o.ok) throw new Error(`HTTP ${o.status}`);
      const r = await o.json();
      i.current || f(r.sources ?? []);
    } catch (o) {
      i.current || d(o instanceof Error ? o.message : String(o));
    } finally {
      i.current || T(!1);
    }
  }, [a]);
  E(() => (i.current = !1, s(), () => {
    i.current = !0;
  }), [s]);
  const n = w(async (o) => {
    try {
      const r = await fetch(`${v}/api/ingest/sources`, {
        method: "POST",
        headers: a(),
        body: JSON.stringify(o)
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const c = await r.json();
      return f((u) => [...u, c]), c;
    } catch (r) {
      return d(r instanceof Error ? r.message : String(r)), null;
    }
  }, [a]), t = w(async (o) => {
    try {
      const r = await fetch(`${v}/api/ingest/sources/${o}`, {
        method: "DELETE",
        headers: a()
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return f((c) => c.filter((u) => u.sourceId !== o)), !0;
    } catch (r) {
      return d(r instanceof Error ? r.message : String(r)), !1;
    }
  }, [a]), m = w(async (o) => {
    try {
      const r = await fetch(`${v}/api/ingest/sources/${o}/sync`, {
        method: "POST",
        headers: a()
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return !0;
    } catch (r) {
      return d(r instanceof Error ? r.message : String(r)), !1;
    }
  }, [a]);
  return { sources: h, loading: $, error: I, refresh: s, createSource: n, deleteSource: t, triggerSync: m };
}
const L = "";
function H(e) {
  return {
    itemId: e.itemId ?? e.ingestId ?? "",
    sourceId: e.sourceId,
    sourcePath: e.sourcePath ?? e.filePath ?? "",
    status: e.status,
    documentTypeId: e.documentTypeId ?? e.mappedTypeId ?? null,
    documentId: e.documentId ?? null,
    pipelineRunId: e.pipelineRunId ?? null,
    mappingMethod: e.mappingMethod ?? null,
    mappingConfidence: e.mappingConfidence ?? null,
    attempts: e.attempts,
    error: e.error ?? null,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt
  };
}
function G(e = {}) {
  const { sourceId: h, status: f } = e, { idToken: $ } = P(), [T, I] = g([]), [d, i] = g(!0), [a, s] = g(null), n = A(!1), t = w(() => {
    const c = { "Content-Type": "application/json" };
    return $ && (c.Authorization = `Bearer ${$}`), c;
  }, [$]), m = w(async () => {
    i(!0), s(null);
    try {
      const c = new URLSearchParams();
      h && c.set("sourceId", h), f && c.set("status", f);
      const u = c.toString(), l = `${L}/api/ingest/items${u ? `?${u}` : ""}`, p = await fetch(l, { headers: t() });
      if (!p.ok) throw new Error(`HTTP ${p.status}`);
      const y = await p.json();
      n.current || I((y.items ?? []).map(H));
    } catch (c) {
      n.current || s(c instanceof Error ? c.message : String(c));
    } finally {
      n.current || i(!1);
    }
  }, [t, h, f]);
  E(() => (n.current = !1, m(), () => {
    n.current = !0;
  }), [m]);
  const o = w(async (c) => {
    try {
      const u = await fetch(`${L}/api/ingest/items/${c}/retry`, {
        method: "POST",
        headers: t()
      });
      if (!u.ok) throw new Error(`HTTP ${u.status}`);
      return I(
        (l) => l.map((p) => p.itemId === c ? { ...p, status: "queued", error: null } : p)
      ), !0;
    } catch (u) {
      return s(u instanceof Error ? u.message : String(u)), !1;
    }
  }, [t]), r = w(async (c) => {
    try {
      const u = await fetch(`${L}/api/ingest/items/${c}/skip`, {
        method: "POST",
        headers: t()
      });
      if (!u.ok) throw new Error(`HTTP ${u.status}`);
      return I((l) => l.filter((p) => p.itemId !== c)), !0;
    } catch (u) {
      return s(u instanceof Error ? u.message : String(u)), !1;
    }
  }, [t]);
  return { items: T, loading: d, error: a, refresh: m, retryItem: o, skipItem: r };
}
const j = "";
function K() {
  const { idToken: e } = P(), [h, f] = g([]), [$, T] = g(!0), [I, d] = g(null), i = A(!1), a = w(async () => {
    T(!0), d(null);
    try {
      const s = {};
      e && (s.Authorization = `Bearer ${e}`);
      const n = await fetch(`${j}/api/pipelines/defs`, {
        headers: s,
        credentials: "include"
      });
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const t = await n.json();
      i.current || f((t.pipelines ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        status: m.status,
        icon: m.icon
      })));
    } catch (s) {
      i.current || (d(s instanceof Error ? s.message : String(s)), f([]));
    } finally {
      i.current || T(!1);
    }
  }, [e]);
  return E(() => (i.current = !1, a(), () => {
    i.current = !0;
  }), [a]), { pipelines: h, loading: $, error: I, refresh: a };
}
const B = "", D = 3e4;
function X(e, h = "1h") {
  const { idToken: f } = P(), [$, T] = g(null), [I, d] = g(!0), [i, a] = g(null), s = w(async () => {
    if (e) {
      d(!0), a(null);
      try {
        const n = { "Content-Type": "application/json" };
        f && (n.Authorization = `Bearer ${f}`);
        const t = await fetch(
          `${B}/api/ingest/sources/${encodeURIComponent(e)}/metrics?window=${h}`,
          { headers: n }
        );
        if (!t.ok) throw new Error(`HTTP ${t.status}`);
        const m = await t.json();
        T(m);
      } catch (n) {
        a(n instanceof Error ? n.message : String(n));
      } finally {
        d(!1);
      }
    }
  }, [e, h, f]);
  return E(() => {
    s();
    const n = globalThis.setInterval(() => {
      document.hidden || s();
    }, D);
    return () => globalThis.clearInterval(n);
  }, [s]), { metrics: $, loading: I, error: i, refresh: s };
}
const k = "ingest:progress";
function Y() {
  const { sendMessage: e, onMessage: h, connectionState: f } = _(), [$, T] = g([]), [I, d] = g(
    () => /* @__PURE__ */ new Map()
  ), i = A(e);
  E(() => {
    i.current = e;
  }, [e]), E(() => h((n) => {
    const t = n.type ?? "", m = n.channel === k, o = t.startsWith("sync.") || t.startsWith("item.");
    if (!m && !o) return;
    const { type: r, ...c } = n, u = {
      ...c,
      type: t,
      timestamp: n.timestamp ?? (/* @__PURE__ */ new Date()).toISOString()
    };
    T((p) => [...p, u].slice(-50));
    const l = n.sourceId ?? n.source_id ?? "";
    t === "sync.started" && l ? d((p) => {
      const y = new Map(p);
      return y.set(l, {
        sourceId: l,
        sourceName: n.sourceName ?? n.source_name ?? l,
        fileCount: n.fileCount ?? 0,
        filesFetched: 0,
        itemsMapped: 0,
        itemsMaterialized: 0,
        startedAt: u.timestamp
      }), y;
    }) : t === "sync.progress" && l ? d((p) => {
      const y = p.get(l);
      if (!y) return p;
      const S = new Map(p);
      return S.set(l, {
        ...y,
        fileCount: n.fileCount ?? y.fileCount,
        filesFetched: n.filesFetched ?? y.filesFetched
      }), S;
    }) : t === "sync.completed" && l ? d((p) => {
      const y = new Map(p);
      return y.delete(l), y;
    }) : t === "sync.failed" && l ? d((p) => {
      const y = new Map(p);
      return y.delete(l), y;
    }) : t === "item.mapped" && l ? d((p) => {
      const y = p.get(l);
      if (!y) return p;
      const S = new Map(p);
      return S.set(l, {
        ...y,
        itemsMapped: y.itemsMapped + 1
      }), S;
    }) : t === "item.materialized" && l ? d((p) => {
      const y = p.get(l);
      if (!y) return p;
      const S = new Map(p);
      return S.set(l, {
        ...y,
        itemsMaterialized: y.itemsMaterialized + 1
      }), S;
    }) : t === "item.failed" && l && d((p) => {
      const y = p.get(l);
      if (!y) return p;
      const S = new Map(p);
      return S.set(l, {
        ...y,
        filesFetched: y.filesFetched + 1
      }), S;
    });
  }), [h]), E(() => {
    if (f === "connected")
      return i.current({
        service: "ingest",
        action: "subscribe",
        channelId: k
      }), () => {
        i.current({
          service: "ingest",
          action: "unsubscribe",
          channelId: k
        });
      };
  }, [f]);
  const a = w(() => {
    T([]);
  }, []);
  return { events: $, activeSyncs: I, clearEvents: a };
}
const b = "", z = 3e4;
function Z(e = {}) {
  const { idToken: h } = P(), [f, $] = g([]), [T, I] = g(!0), [d, i] = g(null), a = w(async () => {
    I(!0), i(null);
    try {
      const s = { "Content-Type": "application/json" };
      h && (s.Authorization = `Bearer ${h}`);
      const n = new URLSearchParams();
      e.since && n.set("since", e.since), e.until && n.set("until", e.until), e.actor && n.set("actor", e.actor), e.eventType && n.set("eventType", e.eventType), e.targetId && n.set("targetId", e.targetId), e.limit && n.set("limit", String(e.limit));
      const t = n.toString(), m = `${b}/api/ingest/audit${t ? `?${t}` : ""}`, o = await fetch(m, { headers: s });
      if (!o.ok) throw new Error(`HTTP ${o.status}`);
      const r = await o.json();
      $(r.entries);
    } catch (s) {
      i(s instanceof Error ? s.message : String(s));
    } finally {
      I(!1);
    }
  }, [h, e.since, e.until, e.actor, e.eventType, e.targetId, e.limit]);
  return E(() => {
    a();
    const s = window.setInterval(() => {
      document.hidden || a();
    }, z);
    return () => window.clearInterval(s);
  }, [a]), { entries: f, loading: T, error: d, refresh: a };
}
const R = "";
function O() {
  const e = Date.now(), h = (f) => new Date(e - f * 6e4).toISOString();
  return [
    {
      conflictId: "cfl-001",
      sourceId: "src-gdrive-team",
      documentId: "doc-policy-acceptable-use",
      documentTypeId: "doctype-policy",
      sourceRef: "drive:1A2B3C4D5E6F",
      summary: "Title and body changed remotely while platform edit was pending",
      fields: [
        {
          field: "title",
          sourceValue: "Acceptable Use Policy (revised May 2026)",
          platformValue: "Acceptable Use Policy — DRAFT",
          mergedValue: "Acceptable Use Policy (revised May 2026) — DRAFT"
        },
        {
          field: "body.intro",
          sourceValue: "This policy supersedes the 2025 version and applies to all employees, contractors, and partners.",
          platformValue: "This policy applies to all staff and contractors. Reviewed quarterly."
        }
      ],
      status: "pending",
      platformUpdatedAt: h(8),
      sourceUpdatedAt: h(3),
      detectedAt: h(2)
    },
    {
      conflictId: "cfl-003",
      sourceId: "src-s3-reports",
      documentId: "doc-fin-0002",
      documentTypeId: "doctype-financial-report",
      sourceRef: "s3://acme-quarterly-reports/2026/Q2/financial-overview.pdf",
      summary: "Source replaced PDF; platform comments pending",
      fields: [
        {
          field: "attachment.sha256",
          sourceValue: "sha256:c1a2b3...new",
          platformValue: "sha256:9f8e7d...old"
        }
      ],
      status: "pending",
      platformUpdatedAt: h(220),
      sourceUpdatedAt: h(15),
      detectedAt: h(15)
    }
  ];
}
function ee() {
  const { idToken: e } = P(), [h, f] = g([]), [$, T] = g(!0), [I, d] = g(null), [i, a] = g(!1), s = A(!1), n = w(() => {
    const r = { "Content-Type": "application/json" };
    return e && (r.Authorization = `Bearer ${e}`), r;
  }, [e]), t = w(async () => {
    T(!0), d(null);
    try {
      const r = await fetch(`${R}/api/sync/conflicts`, { headers: n() });
      if (r.status === 404) {
        s.current || (f(O()), a(!0));
        return;
      }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const c = await r.json();
      s.current || (f(c.conflicts ?? []), a(!1));
    } catch (r) {
      s.current || (f(O()), a(!0), d(r instanceof Error ? r.message : String(r)));
    } finally {
      s.current || T(!1);
    }
  }, [n]);
  E(() => (s.current = !1, t(), () => {
    s.current = !0;
  }), [t]);
  const m = w(async (r, c) => {
    if (i)
      return f((u) => u.map(
        (l) => l.conflictId === r ? { ...l, status: "resolved", resolvedAt: (/* @__PURE__ */ new Date()).toISOString() } : l
      )), !0;
    try {
      const u = await fetch(`${R}/api/sync/conflicts/${r}/resolve`, {
        method: "POST",
        headers: n(),
        body: JSON.stringify(c)
      });
      if (!u.ok) throw new Error(`HTTP ${u.status}`);
      const l = await u.json();
      return l.conflict && f((p) => p.map((y) => y.conflictId === r ? l.conflict : y)), !0;
    } catch (u) {
      return d(u instanceof Error ? u.message : String(u)), !1;
    }
  }, [n, i]), o = w(async (r) => {
    if (i)
      return f((c) => c.map(
        (u) => u.conflictId === r ? { ...u, status: "discarded", resolvedAt: (/* @__PURE__ */ new Date()).toISOString() } : u
      )), !0;
    try {
      const c = await fetch(`${R}/api/sync/conflicts/${r}/discard`, {
        method: "POST",
        headers: n()
      });
      if (!c.ok) throw new Error(`HTTP ${c.status}`);
      return f((u) => u.map(
        (l) => l.conflictId === r ? { ...l, status: "discarded", resolvedAt: (/* @__PURE__ */ new Date()).toISOString() } : l
      )), !0;
    } catch (c) {
      return d(c instanceof Error ? c.message : String(c)), !1;
    }
  }, [n, i]);
  return { conflicts: h, loading: $, error: I, usingMock: i, refresh: t, resolveConflict: m, discardConflict: o };
}
const M = "", x = 3e4;
function te() {
  const { idToken: e } = P(), [h, f] = g([]), [$, T] = g(!0), [I, d] = g(null), i = w(() => {
    const t = { "Content-Type": "application/json" };
    return e && (t.Authorization = `Bearer ${e}`), t;
  }, [e]), a = w(async () => {
    T(!0), d(null);
    try {
      const t = await fetch(`${M}/api/ingest/dlq`, { headers: i() });
      if (!t.ok) {
        if (t.status === 503) {
          d("Ingest DLQ is not initialized yet. Start a sync to populate it."), f([]);
          return;
        }
        throw new Error(`HTTP ${t.status}`);
      }
      const m = await t.json();
      f(m.items);
    } catch (t) {
      d(t instanceof Error ? t.message : String(t));
    } finally {
      T(!1);
    }
  }, [i]);
  E(() => {
    a();
    const t = window.setInterval(() => {
      document.hidden || a();
    }, x);
    return () => window.clearInterval(t);
  }, [a]);
  const s = w(
    async (t) => {
      const m = await fetch(`${M}/api/ingest/dlq/${encodeURIComponent(t)}/replay`, {
        method: "POST",
        headers: i()
      });
      if (!m.ok) throw new Error(`HTTP ${m.status}`);
      await a();
    },
    [i, a]
  ), n = w(
    async (t) => {
      const m = await fetch(`${M}/api/ingest/dlq/${encodeURIComponent(t)}`, {
        method: "DELETE",
        headers: i()
      });
      if (!m.ok) throw new Error(`HTTP ${m.status}`);
      await a();
    },
    [i, a]
  );
  return { entries: h, loading: $, error: I, refresh: a, replay: s, drop: n };
}
const U = "", N = 3e4;
function ne() {
  const { idToken: e, userEmail: h } = P(), [f, $] = g([]), [T, I] = g(!0), [d, i] = g(null), a = w(() => {
    const t = { "Content-Type": "application/json" };
    return e && (t.Authorization = `Bearer ${e}`), t;
  }, [e]), s = w(async () => {
    I(!0), i(null);
    try {
      const t = await fetch(`${U}/api/ingest/mapping/proposals`, { headers: a() });
      if (!t.ok) throw new Error(`HTTP ${t.status}`);
      const m = await t.json();
      $(m.proposals);
    } catch (t) {
      i(t instanceof Error ? t.message : String(t));
    } finally {
      I(!1);
    }
  }, [a]);
  E(() => {
    s();
    const t = window.setInterval(() => {
      document.hidden || s();
    }, N);
    return () => window.clearInterval(t);
  }, [s]);
  const n = w(
    async (t, m) => {
      const o = await fetch(
        `${U}/api/ingest/mapping/proposals/${encodeURIComponent(t)}/${m}`,
        {
          method: "POST",
          headers: a(),
          body: JSON.stringify({ reviewedBy: h ?? "operator" })
        }
      );
      if (!o.ok) throw new Error(`HTTP ${o.status}`);
      await s();
    },
    [a, s, h]
  );
  return {
    proposals: f,
    loading: T,
    error: d,
    refresh: s,
    promote: (t) => n(t, "promote"),
    reject: (t) => n(t, "reject")
  };
}
const C = "", V = 15e3;
function F(e) {
  return {
    itemId: e.itemId ?? e.ingestId ?? "",
    sourceId: e.sourceId,
    sourcePath: e.sourcePath ?? e.filePath ?? "",
    status: e.status,
    documentTypeId: e.documentTypeId ?? e.mappedTypeId ?? null,
    documentId: e.documentId ?? null,
    pipelineRunId: e.pipelineRunId ?? null,
    mappingMethod: e.mappingMethod ?? null,
    mappingConfidence: e.mappingConfidence ?? null,
    attempts: e.attempts,
    error: e.error ?? null,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt
  };
}
function re() {
  const { idToken: e } = P(), [h, f] = g([]), [$, T] = g(0.7), [I, d] = g(!0), [i, a] = g(null), s = w(() => {
    const o = { "Content-Type": "application/json" };
    return e && (o.Authorization = `Bearer ${e}`), o;
  }, [e]), n = w(async () => {
    d(!0), a(null);
    try {
      const o = await fetch(`${C}/api/ingest/mapping/review`, { headers: s() });
      if (!o.ok) throw new Error(`HTTP ${o.status}`);
      const r = await o.json();
      f(r.items.map(F)), T(r.threshold);
    } catch (o) {
      a(o instanceof Error ? o.message : String(o));
    } finally {
      d(!1);
    }
  }, [s]);
  E(() => {
    n();
    const o = window.setInterval(() => {
      document.hidden || n();
    }, V);
    return () => window.clearInterval(o);
  }, [n]);
  const t = w(
    async (o, r) => {
      const c = await fetch(`${C}/api/ingest/items/${o}/remap`, {
        method: "POST",
        headers: s(),
        body: JSON.stringify({ typeId: r })
      });
      if (!c.ok) throw new Error(`HTTP ${c.status}`);
      await n();
    },
    [s, n]
  ), m = w(
    async (o) => {
      const r = await fetch(`${C}/api/ingest/items/${o}/skip`, {
        method: "POST",
        headers: s()
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await n();
    },
    [s, n]
  );
  return { items: h, threshold: $, loading: I, error: i, refresh: n, remap: t, skip: m };
}
export {
  Z as a,
  te as b,
  G as c,
  Y as d,
  W as e,
  re as f,
  K as g,
  X as h,
  ee as i,
  ne as u
};
