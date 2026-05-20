async function h(r, n) {
  const e = new URLSearchParams();
  n?.limit && e.set("limit", String(n.limit)), n?.cursor && e.set("cursor", n.cursor);
  const t = `/api/pipelines/${r}/runs${e.toString() ? `?${e}` : ""}`;
  try {
    const s = await fetch(t, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
      // Send cookies for auth
    });
    if (!s.ok)
      throw new Error(`Failed to list runs: ${s.status} ${s.statusText}`);
    const o = await s.json();
    return Array.isArray(o.runs) && (o.runs = o.runs.map((a) => ({
      ...a,
      id: a.id ?? a.runId
    })).sort((a, c) => {
      const i = a.startedAt ? new Date(a.startedAt).getTime() : 0;
      return (c.startedAt ? new Date(c.startedAt).getTime() : 0) - i;
    })), o;
  } catch (s) {
    return console.error("[pipelineRuns] Failed to fetch from API:", s), { runs: [] };
  }
}
async function f(r, n) {
  const e = `/api/v2/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(n)}`;
  try {
    const t = await fetch(e, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    if (t.status === 404) return null;
    if (!t.ok)
      throw new Error(`Failed to get run: ${t.status} ${t.statusText}`);
    const s = await t.json();
    return { ...s, id: s.runId };
  } catch (t) {
    return console.error("[pipelineRuns] Failed to fetch run:", t), null;
  }
}
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: f,
  listPipelineRuns: h
}, Symbol.toStringTag, { value: "Module" }));
class $ extends Error {
  reason;
  result;
  constructor(n, e) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = e;
  }
}
class l extends Error {
  status;
  body;
  constructor(n, e, t) {
    super(e), this.name = "PatchHttpError", this.status = n, this.body = t;
  }
}
function d(r, n, e, t) {
  const o = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(e)}/patch`;
  return t ? `${o}/${encodeURIComponent(t)}` : `${o}`;
}
async function w(r, n, e, t, s) {
  const o = await fetch(d(r, n, e), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: t, ...s ? { appliedBy: s } : {} })
  });
  if (o.status === 200)
    return await o.json();
  if (o.status === 422) {
    const i = await o.json().catch(() => ({}));
    let u = "patch rejected by validator";
    throw i.result && i.result.validation && i.result.validation.ok === !1 && typeof i.result.validation.reason == "string" ? u = i.result.validation.reason : typeof i.error == "string" && (u = i.error), new $(u, i.result);
  }
  const a = await o.text().catch(() => "");
  let c;
  try {
    c = JSON.parse(a);
  } catch {
    c = a;
  }
  throw new l(
    o.status,
    `applyPatch HTTP ${o.status}: ${a}`,
    c
  );
}
async function y(r, n, e, t) {
  const s = await fetch(d(r, n, e, t), {
    method: "DELETE",
    credentials: "include"
  });
  if (s.status === 204) return;
  const o = await s.text().catch(() => "");
  let a;
  try {
    a = JSON.parse(o);
  } catch {
    a = o;
  }
  throw new l(
    s.status,
    `revertPatch HTTP ${s.status}: ${o}`,
    a
  );
}
async function T(r, n) {
  const e = `/api/pipelines/${r}/runs/${n}/force-fail`, t = await fetch(e, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (!t.ok) {
    const s = await t.text();
    throw new Error(`Force-fail failed: ${t.status} ${s}`);
  }
  return t.json();
}
async function R(r, n, e, t, s) {
  const o = `/api/pipelines/${r}/runs/${n}/retry/${e}`, a = await fetch(o, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: t, ...s ? { snapshotInput: s } : {} })
  });
  if (!a.ok) {
    const c = await a.text();
    throw new Error(`Failed to retry from node ${e}: ${a.status} ${c}`);
  }
  return a.json();
}
async function j(r, n, e, t) {
  const s = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(n)}/resume?fromNodeId=${encodeURIComponent(e)}`, o = await fetch(s, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(t ?? {})
  });
  if (!o.ok) {
    const a = await o.text();
    throw new Error(`Failed to resume run ${n} from node ${e}: ${o.status} ${a}`);
  }
  return o.json();
}
function p(r) {
  const n = [];
  for (const [e, t] of Object.entries(r))
    if (t != null)
      if (Array.isArray(t)) {
        if (t.length === 0) continue;
        n.push(`${encodeURIComponent(e)}=${encodeURIComponent(t.join(","))}`);
      } else
        n.push(`${encodeURIComponent(e)}=${encodeURIComponent(String(t))}`);
  return n.length > 0 ? `?${n.join("&")}` : "";
}
async function C(r, n, e = {}) {
  const t = p({
    since: e.since,
    until: e.until,
    actions: e.actions,
    limit: e.limit,
    cursor: e.cursor
  }), s = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(n)}/audit${t}`, o = await fetch(s, {
    method: "GET",
    credentials: "include"
  });
  if (!o.ok) {
    const a = await o.text();
    throw new Error(`Failed to load audit log for ${r}/${n}: ${o.status} ${a}`);
  }
  return o.json();
}
async function g(r) {
  if (!r.actor && !r.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const e = `/api/pipelines/audit/search${p({
    actor: r.actor,
    pipelineId: r.pipelineId,
    actions: r.actions,
    since: r.since,
    until: r.until,
    limit: r.limit,
    cursor: r.cursor
  })}`, t = await fetch(e, {
    method: "GET",
    credentials: "include"
  });
  if (!t.ok) {
    const s = await t.text();
    throw new Error(`Audit search failed: ${t.status} ${s}`);
  }
  return t.json();
}
export {
  l as P,
  $ as a,
  w as b,
  C as c,
  R as d,
  y as e,
  T as f,
  f as g,
  h as l,
  m as p,
  j as r,
  g as s
};
