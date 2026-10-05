import { r as e, t } from "./apiBaseUrl-DLrXlmVj.js";
import { useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
//#region src/lib/documentTypeApiAdapter.ts
function o(e) {
	let t, n;
	switch (e.sectionType) {
		case "rich-text":
		case "long-text":
		case "long_text":
			t = "long_text", n = "textarea";
			break;
		case "number":
			t = "number", n = "number_input";
			break;
		case "date":
			t = "date", n = "date_picker";
			break;
		case "boolean":
		case "checkbox":
			t = "boolean", n = "checkbox";
			break;
		default: t = "text", n = "text_field";
	}
	return {
		name: e.name,
		fieldType: t,
		widget: n,
		cardinality: 1,
		required: e.required,
		helpText: e.placeholder ?? ""
	};
}
function s(e) {
	return {
		name: e.name,
		description: e.description,
		icon: e.icon,
		fields: e.fields.map(o),
		editorSchema: e
	};
}
function c(e) {
	switch (e) {
		case "long_text": return "rich-text";
		case "number": return "number";
		case "date": return "date";
		case "boolean": return "checkbox";
		default: return "text";
	}
}
function l(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function u(e) {
	if (l(e.editorSchema)) {
		let t = {
			...e.editorSchema,
			name: e.name,
			description: e.description ?? e.editorSchema.description,
			icon: e.icon ?? e.editorSchema.icon,
			updatedAt: e.updatedAt ?? e.editorSchema.updatedAt,
			serverTypeId: e.typeId
		};
		return m.set(t.id, e.typeId), t;
	}
	let t = {
		id: e.typeId,
		serverTypeId: e.typeId,
		name: e.name,
		description: e.description ?? "",
		icon: e.icon ?? "📄",
		fields: (e.fields ?? []).map((e) => ({
			id: e.fieldId,
			name: e.name,
			sectionType: c(e.fieldType),
			required: e.required === !0,
			defaultCollapsed: !1,
			placeholder: e.helpText ?? "",
			hiddenInModes: [],
			rendererOverrides: {}
		})),
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	};
	return m.set(t.id, e.typeId), t;
}
function d() {
	return t();
}
function f(e) {
	return e ? { Authorization: `Bearer ${e}` } : {};
}
async function p(e) {
	try {
		let t = await fetch(`${d()}/api/document-types`, { headers: f(e) });
		if (!t.ok) return {
			ok: !1,
			error: `GET failed: ${t.status}`
		};
		let n = await t.json();
		return {
			ok: !0,
			types: (Array.isArray(n.items) ? n.items : []).map(u)
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
var m = /* @__PURE__ */ new Map();
function h(e) {
	return !e.ok && e.status !== void 0 && e.status >= 400 && e.status < 500;
}
async function g(e, t) {
	try {
		let n = s(e), r = await fetch(`${d()}/api/document-types`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...f(t)
			},
			body: JSON.stringify(n)
		});
		if (!r.ok) return {
			ok: !1,
			status: r.status,
			error: `POST failed: ${r.status}`
		};
		let i = await r.json();
		return m.set(e.id, i.typeId), {
			ok: !0,
			serverTypeId: i.typeId
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
async function _(e, t) {
	let n = m.get(e.id) ?? e.serverTypeId;
	if (!n) return g(e, t);
	try {
		let r = s(e), i = await fetch(`${d()}/api/document-types/${n}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				...f(t)
			},
			body: JSON.stringify(r)
		});
		return i.status === 404 ? (m.delete(e.id), g(e, t)) : i.ok ? {
			ok: !0,
			serverTypeId: n
		} : {
			ok: !1,
			status: i.status,
			error: `PUT failed: ${i.status}`
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
async function v(e, t, n) {
	let r = m.get(e) ?? n;
	if (!r) return { ok: !0 };
	try {
		let n = await fetch(`${d()}/api/document-types/${r}`, {
			method: "DELETE",
			headers: f(t)
		});
		return !n.ok && n.status !== 404 ? {
			ok: !1,
			status: n.status,
			error: `DELETE failed: ${n.status}`
		} : (m.delete(e), { ok: !0 });
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/hooks/useDocumentTypes.ts
var y = "ws_document_types_v1";
function b(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function x() {
	try {
		let e = localStorage.getItem(y);
		if (!e) return [];
		let t = JSON.parse(e);
		if (!Array.isArray(t)) return [];
		let n = t.filter(b);
		if (n.length !== t.length) try {
			localStorage.setItem(y, JSON.stringify(n));
		} catch {}
		return n;
	} catch {
		return [];
	}
}
function S(e) {
	try {
		localStorage.setItem(y, JSON.stringify(e));
	} catch {}
}
var C = /* @__PURE__ */ new Set();
async function w(e) {
	let t = await p(e);
	if (!t.ok) return {
		ok: !1,
		error: t.error,
		cached: x()
	};
	let n = t.types, r = x(), i = new Set(n.map((e) => e.id)), a = new Set(n.map((e) => e.name.toLowerCase())), o = r.filter((e) => !e.serverTypeId && !i.has(e.id) && !a.has(e.name.toLowerCase()));
	for (let t of o) C.has(t.id) || (C.add(t.id), g(t, e).then((e) => {
		e.ok && e.serverTypeId && S(x().map((n) => n.id === t.id ? {
			...n,
			serverTypeId: e.serverTypeId
		} : n));
	}));
	let s = [...n, ...o];
	return S(s), {
		ok: !0,
		types: s
	};
}
function T(t = {}) {
	let { idToken: o, baseUrl: s } = t;
	s !== void 0 && e(s);
	let c = i(o);
	c.current = o;
	let [l, u] = a(x), [d, f] = a("loading"), [p, m] = a(!0), [y, b] = a(null), C = i(!0);
	r(() => (C.current = !0, () => {
		C.current = !1;
	}), []);
	let T = i(0), E = n(async () => {
		let e = ++T.current;
		m(!0);
		let t = await w(c.current);
		C.current && e === T.current && (t.ok ? (u(t.types), f("remote"), b(null)) : (u(t.cached), f("cache"), b(t.error)), m(!1));
	}, []);
	r(() => {
		E();
	}, [E, o]);
	let D = n((e) => {
		S(e), u(e);
	}, []);
	return {
		types: l,
		loading: p,
		source: d,
		error: y,
		refresh: E,
		createType: n(async (e) => {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				...e,
				id: crypto.randomUUID(),
				createdAt: t,
				updatedAt: t
			}, r = await g(n, c.current);
			if (h(r)) return {
				status: "rejected",
				error: r.error ?? "server rejected the save"
			};
			let i = r.ok && r.serverTypeId ? {
				...n,
				serverTypeId: r.serverTypeId
			} : n;
			return D([...x(), i]), r.ok ? {
				status: "synced",
				type: i
			} : {
				status: "offline",
				type: i,
				error: r.error ?? "server unreachable"
			};
		}, [D]),
		updateType: n(async (e, t) => {
			let n = l.find((t) => t.id === e) ?? x().find((t) => t.id === e);
			if (!n) return {
				status: "rejected",
				error: `unknown document type ${e}`
			};
			let r = {
				...n,
				...t,
				id: e,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, i = await _(r, c.current);
			if (h(i)) return {
				status: "rejected",
				error: i.error ?? "server rejected the save"
			};
			let a = l.some((t) => t.id === e) ? l : x();
			return D(a.map((t) => t.id === e ? r : t)), i.ok ? {
				status: "synced",
				type: r
			} : {
				status: "offline",
				type: r,
				error: i.error ?? "server unreachable"
			};
		}, [D, l]),
		deleteType: n(async (e) => {
			let t = l.find((t) => t.id === e) ?? x().find((t) => t.id === e), n = await v(e, c.current, t?.serverTypeId);
			if (h(n)) return {
				status: "rejected",
				error: n.error ?? "server rejected the delete"
			};
			let r = l.some((t) => t.id === e) ? l : x();
			return D(r.filter((t) => t.id !== e)), n.ok ? { status: "synced" } : {
				status: "offline",
				error: n.error ?? "server unreachable"
			};
		}, [D, l]),
		getType: n((e) => l.find((t) => t.id === e), [l])
	};
}
//#endregion
export { T as i, S as n, w as r, x as t };
