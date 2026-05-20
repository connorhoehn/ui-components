import { useRef as b, useState as A, useCallback as d } from "react";
function _(e) {
  let t, r;
  switch (e.sectionType) {
    case "rich-text":
    case "long-text":
    case "long_text":
      t = "long_text", r = "textarea";
      break;
    case "number":
      t = "number", r = "number_input";
      break;
    case "date":
      t = "date", r = "date_picker";
      break;
    case "boolean":
    case "checkbox":
      t = "boolean", r = "checkbox";
      break;
    default:
      t = "text", r = "text_field";
      break;
  }
  return {
    name: e.name,
    fieldType: t,
    widget: r,
    cardinality: 1,
    required: e.required,
    helpText: e.placeholder ?? ""
  };
}
function w(e) {
  return {
    name: e.name,
    description: e.description,
    icon: e.icon,
    fields: e.fields.map(_)
  };
}
function k() {
  return "";
}
const y = /* @__PURE__ */ new Map();
async function g(e, t) {
  try {
    const r = w(e), n = await fetch(`${k()}/api/document-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify(r)
    });
    if (!n.ok) return { ok: !1, error: `POST failed: ${n.status}` };
    const c = await n.json();
    return y.set(e.id, c.typeId), { ok: !0, serverTypeId: c.typeId };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
async function E(e, t) {
  const r = y.get(e.id);
  if (!r)
    return g(e, t);
  try {
    const n = w(e), c = await fetch(`${k()}/api/document-types/${r}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify(n)
    });
    return c.status === 404 ? (y.delete(e.id), g(e, t)) : c.ok ? { ok: !0, serverTypeId: r } : { ok: !1, error: `PUT failed: ${c.status}` };
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
async function C(e, t) {
  const r = y.get(e);
  if (!r) return { ok: !0 };
  try {
    const n = await fetch(`${k()}/api/document-types/${r}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${t}` }
    });
    return !n.ok && n.status !== 404 ? { ok: !1, error: `DELETE failed: ${n.status}` } : (y.delete(e), { ok: !0 });
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
const h = "ws_document_types_v1";
function U(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = e;
  return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function m() {
  try {
    const e = localStorage.getItem(h);
    if (!e) return [];
    const t = JSON.parse(e);
    if (!Array.isArray(t)) return [];
    const r = t.filter(U);
    if (r.length !== t.length)
      try {
        localStorage.setItem(h, JSON.stringify(r));
      } catch {
      }
    return r;
  } catch {
    return [];
  }
}
function J(e) {
  try {
    localStorage.setItem(h, JSON.stringify(e));
  } catch {
  }
}
function j(e = {}) {
  const { idToken: t } = e, r = b(t);
  r.current = t;
  const [n, c] = A(m), [D, I] = A(null), T = b(0), i = d((s, a, o) => {
    T.current += 1, I({ op: s, ok: a, key: T.current, error: o });
  }, []), u = d((s) => {
    J(s), c(s);
  }, []), $ = d(
    (s) => {
      const a = (/* @__PURE__ */ new Date()).toISOString(), o = { ...s, id: crypto.randomUUID(), createdAt: a, updatedAt: a };
      u([...m(), o]);
      const f = r.current;
      return f && g(o, f).then((p) => {
        i("create", p.ok, p.error);
      }), o;
    },
    [u, i]
  ), v = d(
    (s, a) => {
      let o = null;
      const f = m().map((l) => l.id === s ? (o = { ...l, ...a, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, o) : l);
      u(f);
      const p = r.current;
      p && o && E(o, p).then((S) => {
        i("update", S.ok, S.error);
      });
    },
    [u, i]
  ), x = d(
    (s) => {
      u(m().filter((o) => o.id !== s));
      const a = r.current;
      a && C(s, a).then((o) => {
        i("delete", o.ok, o.error);
      });
    },
    [u, i]
  ), O = d(
    (s) => n.find((a) => a.id === s),
    [n]
  );
  return { types: n, createType: $, updateType: v, deleteType: x, getType: O, lastSync: D };
}
export {
  m as l,
  j as u
};
