import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region src/lib/documentTypeApiAdapter.ts
function i(e) {
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
function a(e) {
	return {
		name: e.name,
		description: e.description,
		icon: e.icon,
		fields: e.fields.map(i),
		editorSchema: e
	};
}
function o(e) {
	switch (e) {
		case "long_text": return "rich-text";
		case "number": return "number";
		case "date": return "date";
		case "boolean": return "checkbox";
		default: return "text";
	}
}
function s(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function c(e) {
	if (s(e.editorSchema)) {
		let t = {
			...e.editorSchema,
			name: e.name,
			description: e.description ?? e.editorSchema.description,
			icon: e.icon ?? e.editorSchema.icon,
			updatedAt: e.updatedAt ?? e.editorSchema.updatedAt,
			serverTypeId: e.typeId
		};
		return h.set(t.id, e.typeId), t;
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
			sectionType: o(e.fieldType),
			required: e.required === !0,
			defaultCollapsed: !1,
			placeholder: e.helpText ?? "",
			hiddenInModes: [],
			rendererOverrides: {}
		})),
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	};
	return h.set(t.id, e.typeId), t;
}
var l = null;
function u(e) {
	l = e;
}
function d() {
	return f();
}
function f() {
	if (l !== null) return l;
	let e = {
		BASE_URL: "/",
		DEV: !1,
		MODE: "production",
		PROD: !0,
		SSR: !1
	};
	return e.VITE_SOCIAL_API_URL ?? e.VITE_PLATFORM_API_URL ?? "";
}
function p(e) {
	return e ? { Authorization: `Bearer ${e}` } : {};
}
async function m(e) {
	try {
		let t = await fetch(`${f()}/api/document-types`, { headers: p(e) });
		if (!t.ok) return {
			ok: !1,
			error: `GET failed: ${t.status}`
		};
		let n = await t.json();
		return {
			ok: !0,
			types: (Array.isArray(n.items) ? n.items : []).map(c)
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
var h = /* @__PURE__ */ new Map();
function g(e) {
	return !e.ok && e.status !== void 0 && e.status >= 400 && e.status < 500;
}
async function _(e, t) {
	try {
		let n = a(e), r = await fetch(`${f()}/api/document-types`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...p(t)
			},
			body: JSON.stringify(n)
		});
		if (!r.ok) return {
			ok: !1,
			status: r.status,
			error: `POST failed: ${r.status}`
		};
		let i = await r.json();
		return h.set(e.id, i.typeId), {
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
async function v(e, t) {
	let n = h.get(e.id) ?? e.serverTypeId;
	if (!n) return _(e, t);
	try {
		let r = a(e), i = await fetch(`${f()}/api/document-types/${n}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				...p(t)
			},
			body: JSON.stringify(r)
		});
		return i.status === 404 ? (h.delete(e.id), _(e, t)) : i.ok ? {
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
async function y(e, t, n) {
	let r = h.get(e) ?? n;
	if (!r) return { ok: !0 };
	try {
		let n = await fetch(`${f()}/api/document-types/${r}`, {
			method: "DELETE",
			headers: p(t)
		});
		return !n.ok && n.status !== 404 ? {
			ok: !1,
			status: n.status,
			error: `DELETE failed: ${n.status}`
		} : (h.delete(e), { ok: !0 });
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/hooks/useDocumentTypes.ts
var b = "ws_document_types_v1";
function x(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function S() {
	try {
		let e = localStorage.getItem(b);
		if (!e) return [];
		let t = JSON.parse(e);
		if (!Array.isArray(t)) return [];
		let n = t.filter(x);
		if (n.length !== t.length) try {
			localStorage.setItem(b, JSON.stringify(n));
		} catch {}
		return n;
	} catch {
		return [];
	}
}
function C(e) {
	try {
		localStorage.setItem(b, JSON.stringify(e));
	} catch {}
}
var w = /* @__PURE__ */ new Set();
async function T(e) {
	let t = await m(e);
	if (!t.ok) return {
		ok: !1,
		error: t.error,
		cached: S()
	};
	let n = t.types, r = S(), i = new Set(n.map((e) => e.id)), a = new Set(n.map((e) => e.name.toLowerCase())), o = r.filter((e) => !e.serverTypeId && !i.has(e.id) && !a.has(e.name.toLowerCase()));
	for (let t of o) w.has(t.id) || (w.add(t.id), _(t, e).then((e) => {
		!e.ok || !e.serverTypeId || C(S().map((n) => n.id === t.id ? {
			...n,
			serverTypeId: e.serverTypeId
		} : n));
	}));
	let s = [...n, ...o];
	return C(s), {
		ok: !0,
		types: s
	};
}
function E(i = {}) {
	let { idToken: a, baseUrl: o } = i;
	o !== void 0 && u(o);
	let s = n(a);
	s.current = a;
	let [c, l] = r(S), [d, f] = r("loading"), [p, m] = r(!0), [h, b] = r(null), x = n(!0);
	t(() => (x.current = !0, () => {
		x.current = !1;
	}), []);
	let w = n(0), E = e(async () => {
		let e = ++w.current;
		m(!0);
		let t = await T(s.current);
		!x.current || e !== w.current || (t.ok ? (l(t.types), f("remote"), b(null)) : (l(t.cached), f("cache"), b(t.error)), m(!1));
	}, []);
	t(() => {
		E();
	}, [E, a]);
	let D = e((e) => {
		C(e), l(e);
	}, []);
	return {
		types: c,
		loading: p,
		source: d,
		error: h,
		refresh: E,
		createType: e(async (e) => {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				...e,
				id: crypto.randomUUID(),
				createdAt: t,
				updatedAt: t
			}, r = await _(n, s.current);
			if (g(r)) return {
				status: "rejected",
				error: r.error ?? "server rejected the save"
			};
			let i = r.ok && r.serverTypeId ? {
				...n,
				serverTypeId: r.serverTypeId
			} : n;
			return D([...S(), i]), r.ok ? {
				status: "synced",
				type: i
			} : {
				status: "offline",
				type: i,
				error: r.error ?? "server unreachable"
			};
		}, [D]),
		updateType: e(async (e, t) => {
			let n = c.find((t) => t.id === e) ?? S().find((t) => t.id === e);
			if (!n) return {
				status: "rejected",
				error: `unknown document type ${e}`
			};
			let r = {
				...n,
				...t,
				id: e,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, i = await v(r, s.current);
			if (g(i)) return {
				status: "rejected",
				error: i.error ?? "server rejected the save"
			};
			let a = c.some((t) => t.id === e) ? c : S();
			return D(a.map((t) => t.id === e ? r : t)), i.ok ? {
				status: "synced",
				type: r
			} : {
				status: "offline",
				type: r,
				error: i.error ?? "server unreachable"
			};
		}, [D, c]),
		deleteType: e(async (e) => {
			let t = c.find((t) => t.id === e) ?? S().find((t) => t.id === e), n = await y(e, s.current, t?.serverTypeId);
			if (g(n)) return {
				status: "rejected",
				error: n.error ?? "server rejected the delete"
			};
			let r = c.some((t) => t.id === e) ? c : S();
			return D(r.filter((t) => t.id !== e)), n.ok ? { status: "synced" } : {
				status: "offline",
				error: n.error ?? "server unreachable"
			};
		}, [D, c]),
		getType: e((e) => c.find((t) => t.id === e), [c])
	};
}
//#endregion
export { d as a, E as i, C as n, u as o, T as r, S as t };
