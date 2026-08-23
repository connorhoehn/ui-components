import { useCallback as e, useRef as t, useState as n } from "react";
//#region src/lib/documentTypeApiAdapter.ts
function r(e) {
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
function i(e) {
	return {
		name: e.name,
		description: e.description,
		icon: e.icon,
		fields: e.fields.map(r)
	};
}
function a() {
	return "";
}
var o = /* @__PURE__ */ new Map();
async function s(e, t) {
	try {
		let n = i(e), r = await fetch(`${a()}/api/document-types`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${t}`
			},
			body: JSON.stringify(n)
		});
		if (!r.ok) return {
			ok: !1,
			error: `POST failed: ${r.status}`
		};
		let s = await r.json();
		return o.set(e.id, s.typeId), {
			ok: !0,
			serverTypeId: s.typeId
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
async function c(e, t) {
	let n = o.get(e.id);
	if (!n) return s(e, t);
	try {
		let r = i(e), c = await fetch(`${a()}/api/document-types/${n}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${t}`
			},
			body: JSON.stringify(r)
		});
		return c.status === 404 ? (o.delete(e.id), s(e, t)) : c.ok ? {
			ok: !0,
			serverTypeId: n
		} : {
			ok: !1,
			error: `PUT failed: ${c.status}`
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
async function l(e, t) {
	let n = o.get(e);
	if (!n) return { ok: !0 };
	try {
		let r = await fetch(`${a()}/api/document-types/${n}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${t}` }
		});
		return !r.ok && r.status !== 404 ? {
			ok: !1,
			error: `DELETE failed: ${r.status}`
		} : (o.delete(e), { ok: !0 });
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/hooks/useDocumentTypes.ts
var u = "ws_document_types_v1";
function d(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.description == "string" && typeof t.icon == "string" && Array.isArray(t.fields) && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
function f() {
	try {
		let e = localStorage.getItem(u);
		if (!e) return [];
		let t = JSON.parse(e);
		if (!Array.isArray(t)) return [];
		let n = t.filter(d);
		if (n.length !== t.length) try {
			localStorage.setItem(u, JSON.stringify(n));
		} catch {}
		return n;
	} catch {
		return [];
	}
}
function p(e) {
	try {
		localStorage.setItem(u, JSON.stringify(e));
	} catch {}
}
function m(r = {}) {
	let { idToken: i } = r, a = t(i);
	a.current = i;
	let [o, u] = n(f), [d, m] = n(null), h = t(0), g = e((e, t, n) => {
		h.current += 1, m({
			op: e,
			ok: t,
			key: h.current,
			error: n
		});
	}, []), _ = e((e) => {
		p(e), u(e);
	}, []);
	return {
		types: o,
		createType: e((e) => {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				...e,
				id: crypto.randomUUID(),
				createdAt: t,
				updatedAt: t
			};
			_([...f(), n]);
			let r = a.current;
			return r && s(n, r).then((e) => {
				g("create", e.ok, e.error);
			}), n;
		}, [_, g]),
		updateType: e((e, t) => {
			let n = null, r = f().map((r) => r.id === e ? (n = {
				...r,
				...t,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, n) : r);
			_(r);
			let i = a.current;
			i && n && c(n, i).then((e) => {
				g("update", e.ok, e.error);
			});
		}, [_, g]),
		deleteType: e((e) => {
			_(f().filter((t) => t.id !== e));
			let t = a.current;
			t && l(e, t).then((e) => {
				g("delete", e.ok, e.error);
			});
		}, [_, g]),
		getType: e((e) => o.find((t) => t.id === e), [o]),
		lastSync: d
	};
}
//#endregion
export { m as n, f as t };
