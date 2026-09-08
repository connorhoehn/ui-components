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
		return f.set(t.id, e.typeId), t;
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
	return f.set(t.id, e.typeId), t;
}
function l() {
	let e = {
		BASE_URL: "/",
		DEV: !1,
		MODE: "production",
		PROD: !0,
		SSR: !1
	};
	return e.VITE_SOCIAL_API_URL ?? e.VITE_PLATFORM_API_URL ?? "";
}
function u(e) {
	return e ? { Authorization: `Bearer ${e}` } : {};
}
async function d(e) {
	try {
		let t = await fetch(`${l()}/api/document-types`, { headers: u(e) });
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
var f = /* @__PURE__ */ new Map();
function p(e) {
	return !e.ok && e.status !== void 0 && e.status >= 400 && e.status < 500;
}
async function m(e, t) {
	try {
		let n = a(e), r = await fetch(`${l()}/api/document-types`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...u(t)
			},
			body: JSON.stringify(n)
		});
		if (!r.ok) return {
			ok: !1,
			status: r.status,
			error: `POST failed: ${r.status}`
		};
		let i = await r.json();
		return f.set(e.id, i.typeId), {
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
async function h(e, t) {
	let n = f.get(e.id) ?? e.serverTypeId;
	if (!n) return m(e, t);
	try {
		let r = a(e), i = await fetch(`${l()}/api/document-types/${n}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				...u(t)
			},
			body: JSON.stringify(r)
		});
		return i.status === 404 ? (f.delete(e.id), m(e, t)) : i.ok ? {
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
async function g(e, t, n) {
	let r = f.get(e) ?? n;
	if (!r) return { ok: !0 };
	try {
		let n = await fetch(`${l()}/api/document-types/${r}`, {
			method: "DELETE",
			headers: u(t)
		});
		return !n.ok && n.status !== 404 ? {
			ok: !1,
			status: n.status,
			error: `DELETE failed: ${n.status}`
		} : (f.delete(e), { ok: !0 });
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/hooks/useDocumentTypes.ts
var _ = "ws_document_types_v1";
function v(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function y() {
	try {
		let e = localStorage.getItem(_);
		if (!e) return [];
		let t = JSON.parse(e);
		if (!Array.isArray(t)) return [];
		let n = t.filter(v);
		if (n.length !== t.length) try {
			localStorage.setItem(_, JSON.stringify(n));
		} catch {}
		return n;
	} catch {
		return [];
	}
}
function b(e) {
	try {
		localStorage.setItem(_, JSON.stringify(e));
	} catch {}
}
var x = /* @__PURE__ */ new Set();
async function S(e) {
	let t = await d(e);
	if (!t.ok) return {
		ok: !1,
		error: t.error,
		cached: y()
	};
	let n = t.types, r = y(), i = new Set(n.map((e) => e.id)), a = new Set(n.map((e) => e.name.toLowerCase())), o = r.filter((e) => !e.serverTypeId && !i.has(e.id) && !a.has(e.name.toLowerCase()));
	for (let t of o) x.has(t.id) || (x.add(t.id), m(t, e).then((e) => {
		!e.ok || !e.serverTypeId || b(y().map((n) => n.id === t.id ? {
			...n,
			serverTypeId: e.serverTypeId
		} : n));
	}));
	let s = [...n, ...o];
	return b(s), {
		ok: !0,
		types: s
	};
}
function C(i = {}) {
	let { idToken: a } = i, o = n(a);
	o.current = a;
	let [s, c] = r(y), [l, u] = r("loading"), [d, f] = r(!0), [_, v] = r(null), x = n(!0);
	t(() => (x.current = !0, () => {
		x.current = !1;
	}), []);
	let C = n(0), w = e(async () => {
		let e = ++C.current;
		f(!0);
		let t = await S(o.current);
		!x.current || e !== C.current || (t.ok ? (c(t.types), u("remote"), v(null)) : (c(t.cached), u("cache"), v(t.error)), f(!1));
	}, []);
	t(() => {
		w();
	}, [w, a]);
	let T = e((e) => {
		b(e), c(e);
	}, []);
	return {
		types: s,
		loading: d,
		source: l,
		error: _,
		refresh: w,
		createType: e(async (e) => {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				...e,
				id: crypto.randomUUID(),
				createdAt: t,
				updatedAt: t
			}, r = await m(n, o.current);
			if (p(r)) return {
				status: "rejected",
				error: r.error ?? "server rejected the save"
			};
			let i = r.ok && r.serverTypeId ? {
				...n,
				serverTypeId: r.serverTypeId
			} : n;
			return T([...y(), i]), r.ok ? {
				status: "synced",
				type: i
			} : {
				status: "offline",
				type: i,
				error: r.error ?? "server unreachable"
			};
		}, [T]),
		updateType: e(async (e, t) => {
			let n = s.find((t) => t.id === e) ?? y().find((t) => t.id === e);
			if (!n) return {
				status: "rejected",
				error: `unknown document type ${e}`
			};
			let r = {
				...n,
				...t,
				id: e,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, i = await h(r, o.current);
			if (p(i)) return {
				status: "rejected",
				error: i.error ?? "server rejected the save"
			};
			let a = s.some((t) => t.id === e) ? s : y();
			return T(a.map((t) => t.id === e ? r : t)), i.ok ? {
				status: "synced",
				type: r
			} : {
				status: "offline",
				type: r,
				error: i.error ?? "server unreachable"
			};
		}, [T, s]),
		deleteType: e(async (e) => {
			let t = s.find((t) => t.id === e) ?? y().find((t) => t.id === e), n = await g(e, o.current, t?.serverTypeId);
			if (p(n)) return {
				status: "rejected",
				error: n.error ?? "server rejected the delete"
			};
			let r = s.some((t) => t.id === e) ? s : y();
			return T(r.filter((t) => t.id !== e)), n.ok ? { status: "synced" } : {
				status: "offline",
				error: n.error ?? "server unreachable"
			};
		}, [T, s]),
		getType: e((e) => s.find((t) => t.id === e), [s])
	};
}
//#endregion
export { C as i, b as n, S as r, y as t };
