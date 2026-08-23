import { a as e, t } from "./registry-DbX3MVAA.js";
import { n, t as r } from "./fieldType-Be2vqdKv.js";
import { n as i } from "./IdentityContext-m2wQF4sJ.js";
import "./useWebSocket-C17ijv1B.js";
import "./useSocialProfile-DXPZ4OO4.js";
import "./useSyncConflicts-DNj4F6oF.js";
import "./useDocumentTypes-C-AMWgYq.js";
import { n as a } from "./ToastProvider-BqgHlzIs.js";
import { useCallback as o, useEffect as s, useMemo as c, useRef as l, useState as u } from "react";
import { AuthenticationDetails as d, CognitoRefreshToken as f, CognitoUser as p, CognitoUserAttribute as m, CognitoUserPool as h } from "amazon-cognito-identity-js";
import * as g from "yjs";
import { applyUpdate as _, encodeStateAsUpdate as v } from "yjs";
import { useSearchParams as y } from "react-router";
//#region src/hooks/useActivityBus.ts
var b = "activity:broadcast", x = 100, S = 2e3, C = 0;
function w() {
	return `local-${Date.now()}-${++C}`;
}
function T(e) {
	let { sendMessage: t, onMessage: n, connectionState: r, userId: i, displayName: a, color: c, maxItems: d = x } = e, [f, p] = u([]), [m, h] = u(!1), g = l(t);
	s(() => {
		g.current = t;
	}, [t]);
	let _ = l(i);
	s(() => {
		_.current = i;
	}, [i]);
	let v = l(a);
	s(() => {
		v.current = a;
	}, [a]);
	let y = l(c);
	s(() => {
		y.current = c;
	}, [c]);
	let C = l(d);
	return s(() => {
		C.current = d;
	}, [d]), s(() => n((e) => {
		if (e.type === "activity:event") {
			let t = e.payload;
			if (!t) return;
			p((e) => {
				let n = new Date(t.timestamp).getTime();
				return e.some((e) => e.source === "local" && e.eventType === t.eventType && Math.abs(new Date(e.timestamp).getTime() - n) < S) || e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
					id: t.id ?? w(),
					eventType: t.eventType,
					detail: t.detail,
					timestamp: t.timestamp,
					userId: t.userId,
					displayName: t.displayName,
					color: t.color,
					source: "remote"
				}, ...e].slice(0, C.current);
			});
			return;
		}
		if (e.type === "activity" && e.action === "history") {
			let t = e.events;
			if (!t || t.length === 0) return;
			p((e) => e.length > 0 ? e : t.map((e) => ({
				id: w(),
				eventType: e.eventType,
				detail: e.detail ?? {},
				timestamp: e.timestamp,
				userId: e.userId,
				displayName: e.displayName,
				source: "remote"
			})).slice(0, C.current));
		}
	}), [n]), s(() => {
		if (r !== "connected") {
			h(!1);
			return;
		}
		return g.current({
			service: "activity",
			action: "subscribe",
			channelId: b
		}), g.current({
			service: "activity",
			action: "getHistory",
			channelId: b,
			limit: C.current
		}), h(!0), () => {
			g.current({
				service: "activity",
				action: "unsubscribe",
				channelId: b
			}), h(!1);
		};
	}, [r]), {
		events: f,
		publish: o((e, t) => {
			let n = (/* @__PURE__ */ new Date()).toISOString(), r = {
				id: w(),
				eventType: e,
				detail: t,
				timestamp: n,
				userId: _.current,
				displayName: v.current,
				color: y.current,
				source: "local"
			};
			p((e) => [r, ...e].slice(0, C.current)), g.current({
				service: "activity",
				action: "publish",
				event: {
					eventType: e,
					detail: t
				}
			});
		}, []),
		isLive: m
	};
}
//#endregion
//#region src/hooks/useApiCall.ts
function E(e) {
	let [t, n] = u(null), [r, i] = u(!1), [a, s] = u(null), [c, l] = u([]), d = o(async (...t) => {
		i(!0), s(null), l(t);
		try {
			let r = await e(...t);
			n(r);
		} catch (e) {
			s(e instanceof Error ? e.message : String(e));
		} finally {
			i(!1);
		}
	}, [e]);
	return {
		data: t,
		loading: r,
		error: a,
		execute: d,
		retry: o(async () => {
			await d(...c);
		}, [d, c]),
		reset: o(() => {
			n(null), s(null), i(!1), l([]);
		}, [])
	};
}
//#endregion
//#region src/hooks/useApiHealth.ts
var D = 3e4;
function O(e = D) {
	let [t, n] = u({
		status: "unknown",
		checks: {},
		failing: []
	});
	return l(!1), s(() => {}, ["", e]), t;
}
//#endregion
//#region src/hooks/identityApi.ts
var k = "";
async function A(e, t, n) {
	let r = await fetch(`${e}`, {
		...n,
		headers: {
			"Content-Type": "application/json",
			...t ? { Authorization: `Bearer ${t}` } : {},
			...n?.headers
		}
	});
	if (!r.ok) {
		let e = await r.json().catch(() => ({ message: r.statusText }));
		throw Error(e.message || r.statusText);
	}
	return r.json();
}
//#endregion
//#region src/hooks/useIdentityAdmin.ts
function ee() {
	let { idToken: e } = i(), [t, n] = u(!1), [r, a] = u(!1), [s, c] = u(null), l = o(async () => {
		if (!e) {
			n(!1);
			return;
		}
		a(!0), c(null);
		try {
			await A("/api/admin/session", e), n(!0);
		} catch (e) {
			n(!1), c(e.message);
		} finally {
			a(!1);
		}
	}, [e]);
	return {
		authenticated: t,
		loading: r,
		error: s,
		login: o(async (t, r) => {
			a(!0), c(null);
			try {
				await A("/api/admin/login", e, {
					method: "POST",
					body: JSON.stringify({
						email: t,
						password: r
					})
				}), n(!0);
			} catch (e) {
				n(!1), c(e.message);
			} finally {
				a(!1);
			}
		}, [e]),
		logout: o(async () => {
			a(!0), c(null);
			try {
				await A("/api/admin/logout", e, { method: "POST" }), n(!1);
			} catch (e) {
				c(e.message);
			} finally {
				a(!1);
			}
		}, [e]),
		checkSession: l
	};
}
//#endregion
//#region src/hooks/useIdentityAudit.ts
function te() {
	let { idToken: e } = i(), [t, n] = u([]), [r, a] = u(!1), [s, c] = u(null);
	return {
		records: t,
		loading: r,
		error: s,
		query: o(async (t) => {
			if (e) {
				a(!0), c(null);
				try {
					let r = new URLSearchParams();
					t.entityType && r.set("entityType", t.entityType), t.entityId && r.set("entityId", t.entityId), t.fromTime != null && r.set("fromTime", String(t.fromTime)), t.toTime != null && r.set("toTime", String(t.toTime)), t.limit != null && r.set("limit", String(t.limit)), t.cursor && r.set("cursor", t.cursor);
					let i = r.toString(), a = await A(`/api/audit${i ? `?${i}` : ""}`, e);
					n(a);
				} catch (e) {
					c(e.message);
				} finally {
					a(!1);
				}
			}
		}, [e]),
		getEntityHistory: o(async (t, n) => {
			if (!e) return [];
			try {
				return await A(`/api/audit/entity/${t}/${n}`, e);
			} catch (e) {
				return c(e.message), [];
			}
		}, [e]),
		getStateAtTime: o(async (t, n) => {
			if (!e) return null;
			try {
				return await A(`/api/audit/state/${t}?at=${n}`, e);
			} catch (e) {
				return c(e.message), null;
			}
		}, [e])
	};
}
//#endregion
//#region src/hooks/useIdentityResource.ts
function j(e, t) {
	let { idToken: n } = i(), [r, a] = u(e), [c, l] = u(!1), [d, f] = u(null), p = o(async () => {
		if (!(!n || !t.url)) {
			l(!0), f(null);
			try {
				let e = await A(t.url, n);
				a(e);
			} catch (e) {
				f(e.message);
			} finally {
				l(!1);
			}
		}
	}, [n, t.url]);
	return s(() => {
		t.fetchOnMount !== !1 && p();
	}, [p, t.fetchOnMount]), {
		data: r,
		loading: c,
		error: d,
		setData: a,
		refresh: p,
		mutate: o(async (e, t) => {
			if (!n) return null;
			l(!0), f(null);
			try {
				return await A(e, n, t);
			} catch (e) {
				return f(e.message), null;
			} finally {
				l(!1);
			}
		}, [n])
	};
}
//#endregion
//#region src/hooks/useIdentityClients.ts
function ne() {
	let { data: e, loading: t, error: n, setData: r, refresh: i, mutate: a } = j([], { url: "/api/clients" });
	return {
		clients: e,
		loading: t,
		error: n,
		createClient: o(async (e) => {
			let t = await a("/api/clients", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && r((e) => [...e, t]), t;
		}, [a, r]),
		updateClient: o(async (e, t) => {
			let n = await a(`/api/clients/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && r((t) => t.map((t) => t.clientId === e ? n : t)), n;
		}, [a, r]),
		deleteClient: o(async (e) => {
			await a(`/api/clients/${e}`, { method: "DELETE" }) !== null && r((t) => t.filter((t) => t.clientId !== e));
		}, [a, r]),
		createWithPool: o(async (e) => {
			let t = await a("/api/clients/with-pool", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && r((e) => [...e, t]), t;
		}, [a, r]),
		refresh: i
	};
}
//#endregion
//#region src/hooks/useIdentityDiagnostics.ts
function M() {
	let { idToken: e } = i(), [t, n] = u(null), [r, a] = u(null), [s, c] = u([]), [l, d] = u(!1), [f, p] = u(null), m = o(async () => {
		if (e) {
			d(!0), p(null);
			try {
				let [t, r, i] = await Promise.all([
					A("/api/admin/diagnostics", e),
					A("/api/admin/diagnostics/rates", e),
					A("/api/admin/diagnostics/dlq", e)
				]);
				n(t), a(r), c(i);
			} catch (e) {
				p(e.message);
			} finally {
				d(!1);
			}
		}
	}, [e]);
	return {
		diagnostics: t,
		rates: r,
		dlq: s,
		loading: l,
		error: f,
		redriveDlq: o(async (t) => {
			if (e) {
				p(null);
				try {
					await A(`/api/admin/diagnostics/dlq/${t}/redrive`, e, { method: "POST" }), c((e) => e.filter((e) => e.id !== t));
				} catch (e) {
					p(e.message);
				}
			}
		}, [e]),
		purgeDlq: o(async (t) => {
			if (e) {
				p(null);
				try {
					await A(`/api/admin/diagnostics/dlq/${t}`, e, { method: "DELETE" }), c((e) => e.filter((e) => e.id !== t));
				} catch (e) {
					p(e.message);
				}
			}
		}, [e]),
		refresh: m
	};
}
//#endregion
//#region src/hooks/useIdentityEmailTemplates.ts
function N() {
	let { data: e, loading: t, error: n, setData: r, refresh: i, mutate: a } = j([], { url: "/api/email-templates" });
	return {
		templates: e,
		loading: t,
		error: n,
		createTemplate: o(async (e) => {
			let t = await a("/api/email-templates", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && r((e) => [...e, t]), t;
		}, [a, r]),
		updateTemplate: o(async (e, t) => {
			let n = await a(`/api/email-templates/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && r((t) => t.map((t) => t.templateId === e ? n : t)), n;
		}, [a, r]),
		deleteTemplate: o(async (e) => {
			await a(`/api/email-templates/${e}`, { method: "DELETE" }) !== null && r((t) => t.filter((t) => t.templateId !== e));
		}, [a, r]),
		testSend: o(async (e, t) => {
			await a(`/api/email-templates/${e}/test`, {
				method: "POST",
				body: JSON.stringify({ recipientEmail: t })
			});
		}, [a]),
		refresh: i
	};
}
//#endregion
//#region src/hooks/useIdentityGroups.ts
function P(e) {
	let { data: t, loading: n, error: r, setData: i, refresh: a, mutate: s } = j([], { url: e ? `/api/pools/${e}/groups` : null });
	return {
		groups: t,
		loading: n,
		error: r,
		createGroup: o(async (t) => {
			let n = await s(`/api/pools/${e}/groups`, {
				method: "POST",
				body: JSON.stringify(t)
			});
			return n && i((e) => [...e, n]), n;
		}, [
			e,
			s,
			i
		]),
		updateGroup: o(async (t, n) => {
			let r = await s(`/api/pools/${e}/groups/${t}`, {
				method: "PUT",
				body: JSON.stringify(n)
			});
			return r && i((e) => e.map((e) => e.groupId === t ? r : e)), r;
		}, [
			e,
			s,
			i
		]),
		deleteGroup: o(async (t) => {
			await s(`/api/pools/${e}/groups/${t}`, { method: "DELETE" }) !== null && i((e) => e.filter((e) => e.groupId !== t));
		}, [
			e,
			s,
			i
		]),
		addMember: o(async (t, n) => {
			await s(`/api/pools/${e}/groups/${t}/members`, {
				method: "POST",
				body: JSON.stringify({ userId: n })
			}) !== null && i((e) => e.map((e) => e.groupId === t ? {
				...e,
				members: [...e.members ?? [], n]
			} : e));
		}, [
			e,
			s,
			i
		]),
		removeMember: o(async (t, n) => {
			await s(`/api/pools/${e}/groups/${t}/members/${n}`, { method: "DELETE" }) !== null && i((e) => e.map((e) => e.groupId === t ? {
				...e,
				members: (e.members ?? []).filter((e) => e !== n)
			} : e));
		}, [
			e,
			s,
			i
		]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useIdentityMfa.ts
function F() {
	let { data: e, loading: t, error: n, setData: r, mutate: i } = j([], {
		url: null,
		fetchOnMount: !1
	}), a = o(async (e, t) => {
		let n = await i(`/api/pools/${e}/users/${t}/mfa/devices`, { method: "GET" });
		n && r(n);
	}, [i, r]);
	return {
		devices: e,
		loading: t,
		error: n,
		setupDevice: o(async (e, t, n) => await i(`/api/pools/${e}/users/${t}/mfa/setup`, {
			method: "POST",
			body: JSON.stringify({ deviceName: n })
		}), [i]),
		verifySetup: o(async (e, t, n, a) => await i(`/api/pools/${e}/users/${t}/mfa/verify`, {
			method: "POST",
			body: JSON.stringify({
				deviceId: n,
				code: a
			})
		}) !== null && (r((e) => e.map((e) => e.deviceId === n ? {
			...e,
			isVerified: !0
		} : e)), !0), [i, r]),
		renameDevice: o(async (e, t, n, a) => {
			await i(`/api/pools/${e}/users/${t}/mfa/devices/${n}`, {
				method: "PUT",
				body: JSON.stringify({ deviceName: a })
			}) !== null && r((e) => e.map((e) => e.deviceId === n ? {
				...e,
				deviceName: a
			} : e));
		}, [i, r]),
		removeDevice: o(async (e, t, n) => {
			await i(`/api/pools/${e}/users/${t}/mfa/devices/${n}`, { method: "DELETE" }) !== null && r((e) => e.filter((e) => e.deviceId !== n));
		}, [i, r]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useIdentityMfaAdmin.ts
function I() {
	let { idToken: e } = i(), [t, n] = u(null), [r, a] = u([]), [s, c] = u([]), [l, d] = u(!1), [f, p] = u(null);
	return {
		metrics: t,
		users: r,
		pools: s,
		loading: l,
		error: f,
		refresh: o(async () => {
			if (e) {
				d(!0), p(null);
				try {
					let [t, r, i] = await Promise.all([
						A("/api/admin/mfa/metrics", e),
						A("/api/admin/mfa/users", e),
						A("/api/admin/mfa/pools", e)
					]);
					n(t), a(r), c(i);
				} catch (e) {
					p(e.message);
				} finally {
					d(!1);
				}
			}
		}, [e])
	};
}
//#endregion
//#region src/hooks/useIdentityPools.ts
function L() {
	let { idToken: e } = i(), { data: t, loading: n, error: r, setData: a, refresh: s, mutate: c } = j([], { url: "/api/pools" });
	return {
		pools: t,
		loading: n,
		error: r,
		createPool: o(async (e) => {
			let t = await c("/api/pools", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && a((e) => [...e, t]), t;
		}, [c, a]),
		updatePool: o(async (e, t) => {
			let n = await c(`/api/pools/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && a((t) => t.map((t) => t.poolId === e ? n : t)), n;
		}, [c, a]),
		deletePool: o(async (e) => {
			await c(`/api/pools/${e}`, { method: "DELETE" }) !== null && a((t) => t.filter((t) => t.poolId !== e));
		}, [c, a]),
		getStats: o(async () => {
			if (!e) return [];
			try {
				return await A("/api/pools/stats", e);
			} catch {
				return [];
			}
		}, [e]),
		refresh: s
	};
}
//#endregion
//#region src/hooks/useIdentitySetupStatus.ts
function re() {
	let { data: e, loading: t, error: n, refresh: r } = j(null, { url: "/api/admin/setup-status" });
	return {
		status: e,
		loading: t,
		error: n,
		refresh: r
	};
}
//#endregion
//#region src/hooks/useIdentityUsers.ts
function ie(e) {
	let { data: t, loading: n, error: r, setData: i, refresh: a, mutate: s } = j([], { url: e ? `/api/pools/${e}/users` : null });
	return {
		users: t,
		loading: n,
		error: r,
		createUser: o(async (t) => {
			let n = await s(`/api/pools/${e}/users`, {
				method: "POST",
				body: JSON.stringify(t)
			});
			return n && i((e) => [...e, n]), n;
		}, [
			e,
			s,
			i
		]),
		updateUser: o(async (t, n) => {
			let r = await s(`/api/pools/${e}/users/${t}`, {
				method: "PUT",
				body: JSON.stringify(n)
			});
			return r && i((e) => e.map((e) => e.userId === t ? r : e)), r;
		}, [
			e,
			s,
			i
		]),
		deleteUser: o(async (t) => {
			await s(`/api/pools/${e}/users/${t}`, { method: "DELETE" }) !== null && i((e) => e.filter((e) => e.userId !== t));
		}, [
			e,
			s,
			i
		]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useAuth.ts
var R = "auth_id_token", z = "auth_refresh_token", B = "auth_email";
function V(e, t) {
	try {
		let n = JSON.parse(atob(e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).exp * 1e3 - Date.now() - 12e4;
		return n <= 0 ? (t(), null) : setTimeout(t, n);
	} catch {
		return null;
	}
}
function H() {
	let [e, t] = u({
		status: "loading",
		idToken: null,
		email: null,
		error: null
	}), n = c(() => new h({
		UserPoolId: "",
		ClientId: ""
	}), []), r = l(null), i = l(null), a = o(() => {
		r.current &&= (clearTimeout(r.current), null), n?.getCurrentUser()?.signOut(), localStorage.removeItem(R), localStorage.removeItem(z), localStorage.removeItem(B), i.current?.postMessage({ type: "SIGNED_OUT" }), t({
			status: "unauthenticated",
			idToken: null,
			email: null,
			error: null
		});
	}, [n]), g = l(() => {}), _ = o(() => {
		let e = localStorage.getItem(z);
		if (!e) {
			a(), t((e) => ({
				...e,
				status: "unauthenticated",
				error: "Your session has expired. Please sign in again."
			}));
			return;
		}
		let o = n.getCurrentUser();
		if (!o) {
			a(), t((e) => ({
				...e,
				status: "unauthenticated",
				error: "Your session has expired. Please sign in again."
			}));
			return;
		}
		let s = new f({ RefreshToken: e });
		o.refreshSession(s, (e, n) => {
			if (e || !n) {
				a(), t((e) => ({
					...e,
					status: "unauthenticated",
					error: "Your session has expired. Please sign in again."
				}));
				return;
			}
			let o = n.getIdToken().getJwtToken(), s = n.getRefreshToken().getToken();
			localStorage.setItem(R, o), localStorage.setItem(z, s), t((e) => ({
				...e,
				idToken: o
			})), i.current?.postMessage({
				type: "TOKEN_REFRESHED",
				idToken: o
			}), r.current = V(o, () => g.current());
		});
	}, [n, a]);
	s(() => {
		g.current = _;
	}, [_]), s(() => {
		let e = new BroadcastChannel("auth");
		return i.current = e, e.onmessage = (e) => {
			let n = e.data;
			n.type === "TOKEN_REFRESHED" ? (localStorage.setItem(R, n.idToken), t((e) => ({
				...e,
				idToken: n.idToken
			}))) : n.type === "SIGNED_OUT" && (localStorage.removeItem(R), localStorage.removeItem(z), localStorage.removeItem(B), t({
				status: "unauthenticated",
				idToken: null,
				email: null,
				error: null
			}));
		}, () => {
			e.close(), i.current = null;
		};
	}, []), s(() => {
		let e = n.getCurrentUser();
		if (!e) {
			t({
				status: "unauthenticated",
				idToken: null,
				email: null,
				error: null
			});
			return;
		}
		return e.getSession((n, i) => {
			if (n || !i || !i.isValid()) t({
				status: "unauthenticated",
				idToken: null,
				email: null,
				error: null
			});
			else {
				let n = i.getIdToken().getJwtToken(), a = e.getUsername();
				t({
					status: "authenticated",
					idToken: n,
					email: a,
					error: null
				}), r.current = V(n, _);
			}
		}), () => {
			r.current &&= (clearTimeout(r.current), null);
		};
	}, []);
	let v = o((e, i) => new Promise((a) => {
		let o = new p({
			Username: e,
			Pool: n
		}), s = new d({
			Username: e,
			Password: i
		});
		o.authenticateUser(s, {
			onSuccess: (n) => {
				let i = n.getIdToken().getJwtToken(), o = n.getRefreshToken().getToken();
				localStorage.setItem(R, i), localStorage.setItem(z, o), localStorage.setItem(B, e), t({
					status: "authenticated",
					idToken: i,
					email: e,
					error: null
				}), r.current = V(i, _), a();
			},
			onFailure: (e) => {
				t((t) => ({
					...t,
					status: "unauthenticated",
					idToken: null,
					error: e.message
				})), a();
			},
			newPasswordRequired: () => {
				t((e) => ({
					...e,
					status: "unauthenticated",
					idToken: null,
					error: "Password change required — contact admin"
				})), a();
			}
		});
	}), [n, _]), y = o((e, r) => new Promise((i) => {
		let a = [new m({
			Name: "email",
			Value: e
		})];
		n.signUp(e, r, a, [], (n) => {
			if (n) {
				t((e) => ({
					...e,
					status: "unauthenticated",
					error: n.message
				})), i();
				return;
			}
			v(e, r).then(i);
		});
	}), [n, v]);
	return {
		...e,
		signIn: v,
		signUp: y,
		signOut: a
	};
}
//#endregion
//#region src/hooks/useChat.ts
function U(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, displayName: a } = e, [c, d] = u([]), f = l(t);
	s(() => {
		f.current = t;
	}, [t]);
	let p = l(r);
	s(() => {
		p.current = r;
	}, [r]);
	let m = l(a);
	return s(() => {
		m.current = a;
	}, [a]), s(() => n((e) => {
		if (e.type === "chat" && e.action === "history") {
			if (e.channel !== p.current) return;
			let t = e.messages ?? [];
			d(t.map((e) => ({
				clientId: e.clientId,
				content: e.message,
				timestamp: e.timestamp,
				displayName: e.metadata?.displayName,
				avatarUrl: e.metadata?.avatarUrl
			})));
			return;
		}
		if (e.type === "chat" && e.action === "message") {
			if (e.channel !== p.current) return;
			let t = e.message;
			if (!t) return;
			let n = {
				id: t.id,
				clientId: t.clientId,
				content: t.message,
				timestamp: t.timestamp,
				displayName: t.metadata?.displayName,
				avatarUrl: t.metadata?.avatarUrl
			};
			d((e) => n.id && e.some((e) => e.id === n.id) ? e : [...e, n]);
			return;
		}
	}), [n]), s(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "chat",
			action: "join",
			channel: r
		}), () => {
			f.current({
				service: "chat",
				action: "leave",
				channel: r
			}), d([]);
		};
	}, [r, i]), {
		messages: c,
		send: o((e) => {
			f.current({
				service: "chat",
				action: "send",
				channel: p.current,
				message: e,
				metadata: { displayName: m.current }
			});
		}, [])
	};
}
//#endregion
//#region src/hooks/useClickOutside.ts
function W(e, t, n = !0) {
	s(() => {
		if (!n) return;
		let r = (n) => {
			e.current && !e.current.contains(n.target) && t();
		};
		return document.addEventListener("mousedown", r), () => document.removeEventListener("mousedown", r);
	}, [
		e,
		t,
		n
	]);
}
//#endregion
//#region src/hooks/useCRDT.ts
function G(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function K(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return btoa(t);
}
function q(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i } = e, [a, c] = u(""), [d, f] = u(!1), [p] = u(() => new g.Doc()), m = l(p), [h] = u(() => p.getText("content")), y = l(h), b = l(t);
	s(() => {
		b.current = t;
	}, [t]);
	let x = l(r);
	s(() => {
		x.current = r;
	}, [r]), s(() => n((e) => {
		if (e.type === "crdt:snapshot") {
			if (e.channel !== x.current) return;
			let t = e.snapshot;
			if (!t) return;
			try {
				let e = G(t);
				_(m.current, e), c(y.current.toString());
			} catch {}
			return;
		}
		if (e.type === "crdt:update") {
			if (e.channel !== x.current) return;
			let t = e.update;
			if (!t) return;
			try {
				let e = G(t);
				_(m.current, e), c(y.current.toString());
			} catch {}
			return;
		}
	}), [n]), s(() => {
		if (!(i !== "connected" || !r)) return f(!1), m.current.destroy(), m.current = new g.Doc(), y.current = m.current.getText("content"), y.current.observe(() => c(y.current.toString())), c(""), m.current.on("afterTransaction", (e) => {
			e.origin !== null && y.current.length > 0 && f(!0);
		}), t({
			service: "crdt",
			action: "subscribe",
			channel: r
		}), () => {
			b.current({
				service: "crdt",
				action: "unsubscribe",
				channel: r
			}), c("");
		};
	}, [r, i]);
	let S = o(() => {
		f(!1);
	}, []);
	return {
		content: a,
		applyLocalEdit: o((e) => {
			m.current.transact(() => {
				y.current.delete(0, y.current.length), y.current.insert(0, e);
			});
			let t = K(v(m.current));
			b.current({
				service: "crdt",
				action: "update",
				channel: x.current,
				update: t
			});
		}, []),
		hasConflict: d,
		dismissConflict: S
	};
}
//#endregion
//#region src/hooks/useCursors.ts
function J(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, clientId: a, displayName: c } = e, d = l(/* @__PURE__ */ new Map()), [f, p] = u(/* @__PURE__ */ new Map()), [m, h] = u(null), [g, _] = u("freeform"), v = l("freeform"), y = l(null), b = l(r);
	s(() => {
		b.current = r;
	}, [r]);
	let x = l(i);
	s(() => {
		x.current = i;
	}, [i]);
	let S = l(a);
	s(() => {
		S.current = a;
	}, [a]);
	let C = l(c);
	return s(() => {
		C.current = c;
	}, [c]), s(() => n((e) => {
		if (e.type !== "cursor") return;
		let t = e.action;
		if (t === "subscribed") {
			let t = e.cursors ?? [], n = /* @__PURE__ */ new Map();
			for (let e of t) e.clientId !== S.current && n.set(e.clientId, e);
			d.current = n, p(new Map(n));
			return;
		}
		if (t === "update") {
			let t = e.cursor;
			if (!t || t.clientId === S.current) return;
			d.current.set(t.clientId, t), p(new Map(d.current));
			return;
		}
		if (t === "remove") {
			let t = e.clientId;
			if (!t) return;
			d.current.delete(t), p(new Map(d.current));
		}
	}), [n]), s(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "cursor",
			action: "subscribe",
			channel: r,
			mode: g
		}), () => {
			t({
				service: "cursor",
				action: "unsubscribe",
				channel: r
			}), d.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), y.current !== null && (clearTimeout(y.current), y.current = null);
		};
	}, [
		r,
		i,
		g,
		t
	]), {
		cursors: f,
		localCursor: m,
		activeMode: g,
		sendFreeformUpdate: o((e, n) => {
			if (x.current !== "connected" || y.current !== null) return;
			let r = {
				x: e,
				y: n
			}, i = {
				mode: "freeform",
				displayName: C.current
			};
			t({
				service: "cursor",
				action: "update",
				channel: b.current,
				position: r,
				metadata: i
			}), h({
				clientId: S.current ?? "local",
				position: r,
				metadata: i
			}), y.current = setTimeout(() => {
				y.current = null;
			}, 50);
		}, [t]),
		sendTableUpdate: o((e, n) => {
			if (x.current !== "connected") return;
			let r = {
				row: e,
				col: n
			}, i = {
				mode: "table",
				displayName: C.current
			};
			t({
				service: "cursor",
				action: "update",
				channel: b.current,
				position: r,
				metadata: i
			}), h({
				clientId: S.current ?? "local",
				position: r,
				metadata: i
			});
		}, [t]),
		sendTextUpdate: o((e, n, r) => {
			if (x.current !== "connected") return;
			let i = { position: e }, a = {
				mode: "text",
				selection: n,
				hasSelection: r,
				displayName: C.current
			};
			t({
				service: "cursor",
				action: "update",
				channel: b.current,
				position: i,
				metadata: a
			}), h({
				clientId: S.current ?? "local",
				position: i,
				metadata: a
			});
		}, [t]),
		sendCanvasUpdate: o((e, n, r, i, a) => {
			if (x.current !== "connected" || !b.current) return;
			let o = {
				x: e,
				y: n
			}, s = {
				mode: "canvas",
				tool: r,
				color: i,
				size: a,
				displayName: C.current
			};
			t({
				service: "cursor",
				action: "update",
				channel: b.current,
				position: o,
				metadata: s
			}), h({
				clientId: S.current ?? "local",
				position: o,
				metadata: s
			});
		}, [t]),
		switchMode: o((e) => {
			x.current === "connected" && b.current && t({
				service: "cursor",
				action: "unsubscribe",
				channel: b.current
			}), d.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), h(null), v.current = e, _(e);
		}, [t])
	};
}
//#endregion
//#region src/hooks/useCustomFieldTypes.ts
function Y() {
	try {
		let e = localStorage.getItem(r);
		if (!e) return [];
		let t = JSON.parse(e);
		if (!Array.isArray(t)) return [];
		let i = t.filter(n);
		return i.length !== t.length && localStorage.setItem(r, JSON.stringify(i)), i;
	} catch {
		return [];
	}
}
function X(e) {
	localStorage.setItem(r, JSON.stringify(e));
}
function Z(n) {
	let r = t(n.baseType);
	e({
		type: n.id,
		label: n.name,
		icon: n.icon,
		description: n.description,
		rendererType: n.baseType,
		rendererKeys: r?.rendererKeys ?? {},
		rendererLabels: r?.rendererLabels ?? {}
	});
}
function ae() {
	let [e, t] = u(() => Y());
	return {
		types: e,
		createType: o((e) => {
			let n = (/* @__PURE__ */ new Date()).toISOString(), r = {
				...e,
				id: crypto.randomUUID(),
				createdAt: n,
				updatedAt: n
			}, i = [...Y(), r];
			return X(i), t(i), Z(r), r;
		}, []),
		updateType: o((e, n) => {
			let r = (/* @__PURE__ */ new Date()).toISOString(), i = Y().map((t) => t.id === e ? {
				...t,
				...n,
				updatedAt: r
			} : t);
			X(i), t(i);
			let a = i.find((t) => t.id === e);
			a && Z(a);
		}, []),
		deleteType: o((e) => {
			let n = Y().filter((t) => t.id !== e);
			X(n), t(n);
		}, [])
	};
}
//#endregion
//#region src/hooks/useDocuments.ts
var oe = 15e3, se = 1e4;
function Q(e) {
	return [...e].sort((e, t) => new Date(t.updatedAt).getTime() - new Date(e.updatedAt).getTime());
}
function ce(e) {
	let { sendMessage: t, onMessage: n, connectionState: r } = e, [i, a] = u([]), [c, d] = u({}), [f, p] = u(!0), m = l(null), h = l(null), g = l(!1), _ = l(t);
	return s(() => {
		_.current = t;
	}, [t]), s(() => n((e) => {
		if (e.type === "documents:presence") {
			g.current = !0;
			let t = e.documents;
			if (t) {
				let e = {};
				for (let n of t) {
					let t = n.documentId.startsWith("doc:") ? n.documentId.slice(4) : n.documentId;
					e[t] = n.users;
				}
				d(e);
			}
			return;
		}
		if (e.type === "crdt") {
			if (e.action === "documentList") {
				let t = e.documents ?? [];
				a(Q(t)), p(!1);
				return;
			}
			if (e.action === "documentCreated") {
				let t = e.document;
				t && a((e) => Q([t, ...e]));
				return;
			}
			if (e.action === "documentDeleted") {
				let t = e.documentId;
				t && a((e) => e.filter((e) => e.id !== t));
				return;
			}
			if (e.action === "documentMetaUpdated") {
				let t = e.documentId, n = e.meta;
				t && n && a((e) => Q(e.map((e) => e.id === t ? {
					...e,
					...n
				} : e)));
				return;
			}
			if (e.action === "documentPresence") {
				let t = e.presence;
				if (t) {
					let e = {};
					for (let [n, r] of Object.entries(t)) {
						let t = n.startsWith("doc:") ? n.slice(4) : n;
						e[t] = r;
					}
					d(e);
				}
			}
		}
	}), [n]), s(() => {
		if (r !== "connected") return;
		g.current = !1;
		let e = setTimeout(() => {
			_.current({
				service: "crdt",
				action: "listDocuments"
			}), _.current({
				service: "crdt",
				action: "getDocumentPresence"
			});
		}, 100), t = () => clearTimeout(e);
		return h.current = setTimeout(() => {
			g.current || (m.current = setInterval(() => {
				_.current({
					service: "crdt",
					action: "getDocumentPresence"
				});
			}, se));
		}, oe), () => {
			t(), h.current !== null && (clearTimeout(h.current), h.current = null), m.current !== null && (clearInterval(m.current), m.current = null), a([]), d({}), p(!0);
		};
	}, [r]), {
		documents: i,
		presence: c,
		loading: f,
		createDocument: o((e) => {
			_.current({
				service: "crdt",
				action: "createDocument",
				meta: e
			});
		}, []),
		deleteDocument: o((e) => {
			_.current({
				service: "crdt",
				action: "deleteDocument",
				documentId: e
			});
		}, []),
		updateDocumentMeta: o((e, t) => {
			_.current({
				service: "crdt",
				action: "updateDocumentMeta",
				documentId: e,
				meta: t
			});
		}, []),
		refreshDocuments: o(() => {
			_.current({
				service: "crdt",
				action: "listDocuments"
			});
		}, []),
		refreshPresence: o(() => {
			_.current({
				service: "crdt",
				action: "getDocumentPresence"
			});
		}, [])
	};
}
//#endregion
//#region src/hooks/useKeyboardShortcuts.ts
function le(e) {
	if (!e || !(e instanceof HTMLElement)) return !1;
	let t = e.tagName.toLowerCase();
	return !!(t === "input" || t === "textarea" || e.isContentEditable);
}
function ue(e) {
	s(() => {
		let t = (t) => {
			if (!le(t.target)) for (let n of e) {
				let e = !n.meta || t.metaKey || t.ctrlKey, r = !n.shift || t.shiftKey, i = !n.alt || t.altKey, a = t.key.toLowerCase() === n.key.toLowerCase();
				if (e && r && i && a) {
					n.preventDefault !== !1 && t.preventDefault(), n.handler(t);
					return;
				}
			}
		};
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e]);
}
//#endregion
//#region src/hooks/usePresence.ts
var de = 3e4;
function fe(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, displayName: a } = e, [c, d] = u(/* @__PURE__ */ new Map()), f = l(null), p = l(null), m = l(t);
	s(() => {
		m.current = t;
	}, [t]);
	let h = l(r);
	s(() => {
		h.current = r;
	}, [r]);
	let g = l(a);
	s(() => {
		g.current = a;
	}, [a]), s(() => n((e) => {
		if (e.type === "presence") {
			if (e.action === "subscribed") {
				let t = e.presence ?? e.users ?? [], n = /* @__PURE__ */ new Map();
				for (let e of t) n.set(e.clientId, e);
				d(n);
				return;
			}
			if (e.action === "update") {
				let t = e.presence, n = t?.clientId ?? e.clientId;
				if (!n) return;
				let r = t?.status ?? "online", i = t?.metadata ?? {};
				d((e) => {
					let t = new Map(e);
					return t.set(n, {
						clientId: n,
						status: r,
						metadata: i
					}), t;
				});
				return;
			}
			if (e.action === "offline") {
				let t = e.clientId;
				d((e) => {
					let n = new Map(e);
					return n.delete(t), n;
				});
			}
		}
	}), [n]), s(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "presence",
			action: "subscribe",
			channel: r
		}), t({
			service: "presence",
			action: "set",
			status: "online",
			metadata: { displayName: g.current },
			channels: [r]
		}), f.current = setInterval(() => {
			m.current({
				service: "presence",
				action: "heartbeat",
				metadata: {
					displayName: g.current,
					isTyping: !1
				},
				channels: [h.current]
			});
		}, de), () => {
			f.current !== null && (clearInterval(f.current), f.current = null), m.current({
				service: "presence",
				action: "unsubscribe",
				channel: r
			}), d(/* @__PURE__ */ new Map());
		};
	}, [r, i]);
	let _ = o((e) => {
		m.current({
			service: "presence",
			action: "set",
			status: e ? "typing" : "online",
			metadata: {
				displayName: g.current,
				isTyping: e
			},
			channels: [h.current]
		}), e ? (p.current !== null && clearTimeout(p.current), p.current = setTimeout(() => {
			m.current({
				service: "presence",
				action: "set",
				status: "online",
				metadata: {
					displayName: g.current,
					isTyping: !1
				},
				channels: [h.current]
			}), p.current = null;
		}, 2e3)) : p.current !== null && (clearTimeout(p.current), p.current = null);
	}, []);
	return {
		users: Array.from(c.values()),
		setTyping: _
	};
}
//#endregion
//#region src/hooks/useReactions.ts
function pe(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i } = e, [a, c] = u([]), d = l(t);
	s(() => {
		d.current = t;
	}, [t]);
	let f = l(r);
	return s(() => {
		f.current = r;
	}, [r]), s(() => n((e) => {
		if (e.type === "reaction" && e.action === "reaction_received") {
			let t = e.data;
			if (t?.channel !== f.current) return;
			let n = {
				id: `${Date.now()}-${Math.random()}`,
				emoji: t?.emoji,
				x: Math.floor(Math.random() * 81) + 10,
				y: Math.floor(Math.random() * 81) + 10,
				timestamp: t?.timestamp
			};
			c((e) => [...e, n]), setTimeout(() => {
				c((e) => e.filter((e) => e.id !== n.id));
			}, 2500);
		}
	}), [n]), s(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "reaction",
			action: "subscribe",
			channel: r
		}), () => {
			d.current({
				service: "reaction",
				action: "unsubscribe",
				channel: r
			}), c([]);
		};
	}, [r, i]), {
		activeReactions: a,
		react: o((e) => {
			d.current({
				service: "reaction",
				action: "send",
				channel: f.current,
				emoji: e
			});
		}, [])
	};
}
//#endregion
//#region src/hooks/useRooms.ts
function me({ idToken: e, onMessage: t }) {
	let [n, r] = u([]), [i, c] = u(null), [d, f] = u([]), [p, m] = u(!1), [h, g] = u(null), [_, v] = u(0), { toast: y } = a(), b = o(() => v((e) => e + 1), []), x = l(t);
	s(() => {
		x.current = t;
	}, [t]);
	let S = l(null);
	s(() => {}, [
		e,
		"",
		_,
		y
	]), s(() => x.current((e) => {
		let t = e.payload ?? e;
		e.type === "social:member_joined" && t.roomId === S.current ? f((e) => [...e, {
			roomId: t.roomId,
			userId: t.userId,
			displayName: t.displayName,
			joinedAt: (/* @__PURE__ */ new Date()).toISOString()
		}]) : e.type === "social:member_left" && t.roomId === S.current && f((e) => e.filter((e) => e.userId !== t.userId));
	}), []);
	let C = o(async (t) => {
		if (e) try {
			let n = await fetch(`/api/rooms/${t}/members`, { headers: { Authorization: `Bearer ${e}` } });
			if (!n.ok) throw Error(`Failed to load members (${n.status})`);
			let r = await n.json();
			f(r.members ?? []);
		} catch (e) {
			g(e.message);
		}
	}, [e, ""]), w = o((e) => {
		S.current = e?.roomId ?? null, c(e), e && C(e.roomId);
	}, [C]), T = o(async (e) => {
		g("Social API not configured");
	}, [e, ""]), E = o(async (t) => {
		if (e) {
			m(!0), g(null);
			try {
				let n = await fetch("/api/rooms/dm", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${e}`
					},
					body: JSON.stringify({ peerId: t })
				});
				if (!n.ok) throw Error(`Failed to create DM (${n.status})`);
				let i = await n.json();
				r((e) => [i, ...e]);
			} catch (e) {
				throw g(e.message), e;
			} finally {
				m(!1);
			}
		}
	}, [e, ""]), D = o(async (t) => {
		if (e) {
			g(null);
			try {
				let n = await fetch(`/api/rooms/${t}/join`, {
					method: "POST",
					headers: { Authorization: `Bearer ${e}` }
				});
				if (!n.ok) throw Error(`Failed to join room (${n.status})`);
			} catch (e) {
				g(e.message);
			}
		}
	}, [e, ""]), O = o(async (t) => {
		if (e) {
			g(null);
			try {
				let n = await fetch(`/api/rooms/${t}/leave`, {
					method: "DELETE",
					headers: { Authorization: `Bearer ${e}` }
				});
				if (!n.ok) throw Error(`Failed to leave room (${n.status})`);
				r((e) => e.filter((e) => e.roomId !== t));
			} catch (e) {
				g(e.message);
			}
		}
	}, [e, ""]);
	return {
		rooms: n,
		activeRoom: i,
		setActiveRoom: w,
		createRoom: T,
		createDM: E,
		createGroupRoom: o(async (t, n) => {
			if (e) {
				m(!0), g(null);
				try {
					let i = await fetch(`/api/groups/${t}/rooms`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${e}`
						},
						body: JSON.stringify({ name: n })
					});
					if (!i.ok) throw Error(`Failed to create group room (${i.status})`);
					let a = await i.json();
					r((e) => [a, ...e]);
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [e, ""]),
		joinRoom: D,
		leaveRoom: O,
		loadMembers: C,
		members: d,
		loading: p,
		error: h,
		retry: b
	};
}
//#endregion
//#region src/hooks/useTypedDocuments.ts
function $() {
	return "";
}
function he({ idToken: e, typeId: t }) {
	let [n, r] = u([]), [i, a] = u(!1), [c, l] = u(null), [d, f] = u(0);
	return s(() => {
		if (!e || !t) {
			r([]);
			return;
		}
		let n = !1;
		return a(!0), l(null), fetch(`${$()}/api/typed-documents?typeId=${encodeURIComponent(t)}`, { headers: { Authorization: `Bearer ${e}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load documents (${e.status})`);
			return e.json();
		}).then((e) => {
			n || r(e.items ?? []);
		}).catch((e) => {
			n || l(e.message);
		}).finally(() => {
			n || a(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		t,
		d
	]), {
		documents: n,
		loading: i,
		error: c,
		createDocument: o(async (n) => {
			if (!e || !t) throw Error("not ready: missing idToken or typeId");
			let i = await fetch(`${$()}/api/typed-documents`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${e}`
				},
				body: JSON.stringify({
					typeId: t,
					values: n
				})
			});
			if (!i.ok) {
				let e = await i.text();
				throw Error(`Create failed (${i.status}): ${e}`);
			}
			let a = await i.json();
			return r((e) => [a, ...e]), a;
		}, [e, t]),
		refresh: o(() => {
			f((e) => e + 1);
		}, [])
	};
}
//#endregion
//#region src/hooks/useUrlFilterState.ts
function ge(e) {
	let [t, n] = y();
	return {
		filters: c(() => {
			let n = { ...e };
			for (let r in e) {
				let e = t.get(r);
				e !== null && (n[r] = e);
			}
			return n;
		}, [t, e]),
		setFilter: o((t, r) => {
			n((n) => {
				let i = new URLSearchParams(n);
				return r === void 0 || r === e[t] ? i.delete(String(t)) : i.set(String(t), r), i;
			});
		}, [n, e]),
		clearFilters: o(() => {
			n({});
		}, [n])
	};
}
//#endregion
export { T as A, j as C, A as D, k as E, O, ne as S, ee as T, I as _, fe as a, N as b, ae as c, W as d, U as f, L as g, re as h, pe as i, E as k, J as l, ie as m, he as n, ue as o, H as p, me as r, ce as s, ge as t, q as u, F as v, te as w, M as x, P as y };
