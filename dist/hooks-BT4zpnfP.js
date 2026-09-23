import { a as e, t } from "./registry-DbX3MVAA.js";
import { n, t as r } from "./fieldType-CGXsQUaC.js";
import { t as i } from "./apiBaseUrl-DLrXlmVj.js";
import { n as a } from "./IdentityContext-CQM1qwH6.js";
import "./useVideoSessions-DGJPO8EQ.js";
import "./useWebSocket-Dk13OQX6.js";
import "./useSocialProfile-5S1qyvsv.js";
import "./useSyncConflicts-BspqjVsW.js";
import "./useDocumentTypes-DCKwxXn8.js";
import "./usePrefersReducedMotion-Cllucr7i.js";
import "./useWebGLCanvas-CjaNVKO9.js";
import { r as o } from "./ToastProvider-B0D0SLKU.js";
import "./useEventCallback-Cwx9QVSi.js";
import "./useAudioRecorder-BhPxnLmg.js";
import { useCallback as s, useEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { AuthenticationDetails as f, CognitoRefreshToken as p, CognitoUser as m, CognitoUserAttribute as h, CognitoUserPool as g } from "amazon-cognito-identity-js";
import * as _ from "yjs";
import { applyUpdate as v, encodeStateAsUpdate as y } from "yjs";
import { useSearchParams as b } from "react-router";
//#region src/hooks/useActivityBus.ts
var x = "activity:broadcast", S = 100, C = 2e3, w = 0;
function T() {
	return `local-${Date.now()}-${++w}`;
}
function E(e) {
	let { sendMessage: t, onMessage: n, connectionState: r, userId: i, displayName: a, color: o, maxItems: l = S } = e, [f, p] = d([]), [m, h] = d(!1), g = u(t);
	c(() => {
		g.current = t;
	}, [t]);
	let _ = u(i);
	c(() => {
		_.current = i;
	}, [i]);
	let v = u(a);
	c(() => {
		v.current = a;
	}, [a]);
	let y = u(o);
	c(() => {
		y.current = o;
	}, [o]);
	let b = u(l);
	return c(() => {
		b.current = l;
	}, [l]), c(() => n((e) => {
		if (e.type === "activity:event") {
			let t = e.payload;
			if (!t) return;
			p((e) => {
				let n = new Date(t.timestamp).getTime();
				return e.some((e) => e.source === "local" && e.eventType === t.eventType && Math.abs(new Date(e.timestamp).getTime() - n) < C) || e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
					id: t.id ?? T(),
					eventType: t.eventType,
					detail: t.detail,
					timestamp: t.timestamp,
					userId: t.userId,
					displayName: t.displayName,
					color: t.color,
					source: "remote"
				}, ...e].slice(0, b.current);
			});
			return;
		}
		if (e.type === "activity" && e.action === "history") {
			let t = e.events;
			if (!t || t.length === 0) return;
			p((e) => e.length > 0 ? e : t.map((e) => ({
				id: T(),
				eventType: e.eventType,
				detail: e.detail ?? {},
				timestamp: e.timestamp,
				userId: e.userId,
				displayName: e.displayName,
				source: "remote"
			})).slice(0, b.current));
		}
	}), [n]), c(() => {
		if (r !== "connected") {
			h(!1);
			return;
		}
		return g.current({
			service: "activity",
			action: "subscribe",
			channelId: x
		}), g.current({
			service: "activity",
			action: "getHistory",
			channelId: x,
			limit: b.current
		}), h(!0), () => {
			g.current({
				service: "activity",
				action: "unsubscribe",
				channelId: x
			}), h(!1);
		};
	}, [r]), {
		events: f,
		publish: s((e, t) => {
			let n = (/* @__PURE__ */ new Date()).toISOString(), r = {
				id: T(),
				eventType: e,
				detail: t,
				timestamp: n,
				userId: _.current,
				displayName: v.current,
				color: y.current,
				source: "local"
			};
			p((e) => [r, ...e].slice(0, b.current)), g.current({
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
function D(e) {
	let [t, n] = d(null), [r, i] = d(!1), [a, o] = d(null), [c, l] = d([]), u = s(async (...t) => {
		i(!0), o(null), l(t);
		try {
			let r = await e(...t);
			n(r);
		} catch (e) {
			o(e instanceof Error ? e.message : String(e));
		} finally {
			i(!1);
		}
	}, [e]);
	return {
		data: t,
		loading: r,
		error: a,
		execute: u,
		retry: s(async () => {
			await u(...c);
		}, [u, c]),
		reset: s(() => {
			n(null), o(null), i(!1), l([]);
		}, [])
	};
}
//#endregion
//#region src/hooks/useApiHealth.ts
var O = 3e4;
function k(e) {
	if (!e || typeof e != "object") return null;
	let t = e, n;
	if (t.status === "ok" || t.status === "healthy") n = "ok";
	else if (t.status === "degraded" || t.status === "unhealthy") n = "degraded";
	else return null;
	let r = {};
	if (Array.isArray(t.checks)) for (let e of t.checks) !e || typeof e.name != "string" || (r[e.name] = {
		status: e.ok === !0 || e.status === "ok" ? "ok" : "error",
		...e.durationMs === void 0 ? {} : { latencyMs: e.durationMs },
		...e.error === void 0 ? {} : { error: e.error }
	});
	else t.checks && typeof t.checks == "object" && (r = t.checks);
	return {
		status: n,
		checks: r
	};
}
function A(e) {
	return e ? Object.entries(e).filter(([, e]) => e && e.status !== "ok").map(([e]) => e) : [];
}
function j(e = {}) {
	let { pollMs: t = O, baseUrl: n } = typeof e == "number" ? { pollMs: e } : e, r = n ?? i(), [a, o] = d({
		status: "unknown",
		checks: {},
		failing: []
	});
	return c(() => {
		if (!r) return;
		let e = !0, n = async () => {
			try {
				let t = await (await fetch(`${r}/health`)).json().catch(() => null);
				if (!e) return;
				let n = k(t);
				o(n ? {
					status: n.status,
					checks: n.checks,
					failing: A(n.checks)
				} : {
					status: "degraded",
					checks: {},
					failing: ["unknown"]
				});
			} catch {
				if (!e) return;
				o({
					status: "degraded",
					checks: {},
					failing: ["network"]
				});
			}
		};
		n();
		let i = setInterval(() => {
			n();
		}, t), a = () => {
			typeof document < "u" && document.visibilityState === "visible" && n();
		}, s = () => {
			n();
		};
		return typeof document < "u" && document.addEventListener("visibilitychange", a), typeof window < "u" && window.addEventListener("online", s), () => {
			e = !1, clearInterval(i), typeof document < "u" && document.removeEventListener("visibilitychange", a), typeof window < "u" && window.removeEventListener("online", s);
		};
	}, [r, t]), a;
}
//#endregion
//#region src/hooks/identityApi.ts
var M = "";
async function N(e, t, n) {
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
function P() {
	let { idToken: e } = a(), [t, n] = d(!1), [r, i] = d(!1), [o, c] = d(null), l = s(async () => {
		if (!e) {
			n(!1);
			return;
		}
		i(!0), c(null);
		try {
			await N("/api/admin/session", e), n(!0);
		} catch (e) {
			n(!1), c(e.message);
		} finally {
			i(!1);
		}
	}, [e]);
	return {
		authenticated: t,
		loading: r,
		error: o,
		login: s(async (t, r) => {
			i(!0), c(null);
			try {
				await N("/api/admin/login", e, {
					method: "POST",
					body: JSON.stringify({
						email: t,
						password: r
					})
				}), n(!0);
			} catch (e) {
				n(!1), c(e.message);
			} finally {
				i(!1);
			}
		}, [e]),
		logout: s(async () => {
			i(!0), c(null);
			try {
				await N("/api/admin/logout", e, { method: "POST" }), n(!1);
			} catch (e) {
				c(e.message);
			} finally {
				i(!1);
			}
		}, [e]),
		checkSession: l
	};
}
//#endregion
//#region src/hooks/useIdentityAudit.ts
function ee() {
	let { idToken: e } = a(), [t, n] = d([]), [r, i] = d(!1), [o, c] = d(null);
	return {
		records: t,
		loading: r,
		error: o,
		query: s(async (t) => {
			if (e) {
				i(!0), c(null);
				try {
					let r = new URLSearchParams();
					t.entityType && r.set("entityType", t.entityType), t.entityId && r.set("entityId", t.entityId), t.fromTime != null && r.set("fromTime", String(t.fromTime)), t.toTime != null && r.set("toTime", String(t.toTime)), t.limit != null && r.set("limit", String(t.limit)), t.cursor && r.set("cursor", t.cursor);
					let i = r.toString(), a = await N(`/api/audit${i ? `?${i}` : ""}`, e);
					n(a);
				} catch (e) {
					c(e.message);
				} finally {
					i(!1);
				}
			}
		}, [e]),
		getEntityHistory: s(async (t, n) => {
			if (!e) return [];
			try {
				return await N(`/api/audit/entity/${t}/${n}`, e);
			} catch (e) {
				return c(e.message), [];
			}
		}, [e]),
		getStateAtTime: s(async (t, n) => {
			if (!e) return null;
			try {
				return await N(`/api/audit/state/${t}?at=${n}`, e);
			} catch (e) {
				return c(e.message), null;
			}
		}, [e])
	};
}
//#endregion
//#region src/hooks/useIdentityResource.ts
function F(e, t) {
	let { idToken: n } = a(), [r, i] = d(e), [o, l] = d(!1), [u, f] = d(null), p = s(async () => {
		if (!(!n || !t.url)) {
			l(!0), f(null);
			try {
				let e = await N(t.url, n);
				i(e);
			} catch (e) {
				f(e.message);
			} finally {
				l(!1);
			}
		}
	}, [n, t.url]);
	return c(() => {
		t.fetchOnMount !== !1 && p();
	}, [p, t.fetchOnMount]), {
		data: r,
		loading: o,
		error: u,
		setData: i,
		refresh: p,
		mutate: s(async (e, t) => {
			if (!n) return null;
			l(!0), f(null);
			try {
				return await N(e, n, t);
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
function I() {
	let { data: e, loading: t, error: n, setData: r, refresh: i, mutate: a } = F([], { url: "/api/clients" });
	return {
		clients: e,
		loading: t,
		error: n,
		createClient: s(async (e) => {
			let t = await a("/api/clients", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && r((e) => [...e, t]), t;
		}, [a, r]),
		updateClient: s(async (e, t) => {
			let n = await a(`/api/clients/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && r((t) => t.map((t) => t.clientId === e ? n : t)), n;
		}, [a, r]),
		deleteClient: s(async (e) => {
			await a(`/api/clients/${e}`, { method: "DELETE" }) !== null && r((t) => t.filter((t) => t.clientId !== e));
		}, [a, r]),
		createWithPool: s(async (e) => {
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
function L() {
	let { idToken: e } = a(), [t, n] = d(null), [r, i] = d(null), [o, c] = d([]), [l, u] = d(!1), [f, p] = d(null), m = s(async () => {
		if (e) {
			u(!0), p(null);
			try {
				let [t, r, a] = await Promise.all([
					N("/api/admin/diagnostics", e),
					N("/api/admin/diagnostics/rates", e),
					N("/api/admin/diagnostics/dlq", e)
				]);
				n(t), i(r), c(a);
			} catch (e) {
				p(e.message);
			} finally {
				u(!1);
			}
		}
	}, [e]);
	return {
		diagnostics: t,
		rates: r,
		dlq: o,
		loading: l,
		error: f,
		redriveDlq: s(async (t) => {
			if (e) {
				p(null);
				try {
					await N(`/api/admin/diagnostics/dlq/${t}/redrive`, e, { method: "POST" }), c((e) => e.filter((e) => e.id !== t));
				} catch (e) {
					p(e.message);
				}
			}
		}, [e]),
		purgeDlq: s(async (t) => {
			if (e) {
				p(null);
				try {
					await N(`/api/admin/diagnostics/dlq/${t}`, e, { method: "DELETE" }), c((e) => e.filter((e) => e.id !== t));
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
function R() {
	let { data: e, loading: t, error: n, setData: r, refresh: i, mutate: a } = F([], { url: "/api/email-templates" });
	return {
		templates: e,
		loading: t,
		error: n,
		createTemplate: s(async (e) => {
			let t = await a("/api/email-templates", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && r((e) => [...e, t]), t;
		}, [a, r]),
		updateTemplate: s(async (e, t) => {
			let n = await a(`/api/email-templates/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && r((t) => t.map((t) => t.templateId === e ? n : t)), n;
		}, [a, r]),
		deleteTemplate: s(async (e) => {
			await a(`/api/email-templates/${e}`, { method: "DELETE" }) !== null && r((t) => t.filter((t) => t.templateId !== e));
		}, [a, r]),
		testSend: s(async (e, t) => {
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
function te(e) {
	let { data: t, loading: n, error: r, setData: i, refresh: a, mutate: o } = F([], { url: e ? `/api/pools/${e}/groups` : null });
	return {
		groups: t,
		loading: n,
		error: r,
		createGroup: s(async (t) => {
			let n = await o(`/api/pools/${e}/groups`, {
				method: "POST",
				body: JSON.stringify(t)
			});
			return n && i((e) => [...e, n]), n;
		}, [
			e,
			o,
			i
		]),
		updateGroup: s(async (t, n) => {
			let r = await o(`/api/pools/${e}/groups/${t}`, {
				method: "PUT",
				body: JSON.stringify(n)
			});
			return r && i((e) => e.map((e) => e.groupId === t ? r : e)), r;
		}, [
			e,
			o,
			i
		]),
		deleteGroup: s(async (t) => {
			await o(`/api/pools/${e}/groups/${t}`, { method: "DELETE" }) !== null && i((e) => e.filter((e) => e.groupId !== t));
		}, [
			e,
			o,
			i
		]),
		addMember: s(async (t, n) => {
			await o(`/api/pools/${e}/groups/${t}/members`, {
				method: "POST",
				body: JSON.stringify({ userId: n })
			}) !== null && i((e) => e.map((e) => e.groupId === t ? {
				...e,
				members: [...e.members ?? [], n]
			} : e));
		}, [
			e,
			o,
			i
		]),
		removeMember: s(async (t, n) => {
			await o(`/api/pools/${e}/groups/${t}/members/${n}`, { method: "DELETE" }) !== null && i((e) => e.map((e) => e.groupId === t ? {
				...e,
				members: (e.members ?? []).filter((e) => e !== n)
			} : e));
		}, [
			e,
			o,
			i
		]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useIdentityMfa.ts
function ne() {
	let { data: e, loading: t, error: n, setData: r, mutate: i } = F([], {
		url: null,
		fetchOnMount: !1
	}), a = s(async (e, t) => {
		let n = await i(`/api/pools/${e}/users/${t}/mfa/devices`, { method: "GET" });
		n && r(n);
	}, [i, r]);
	return {
		devices: e,
		loading: t,
		error: n,
		setupDevice: s(async (e, t, n) => await i(`/api/pools/${e}/users/${t}/mfa/setup`, {
			method: "POST",
			body: JSON.stringify({ deviceName: n })
		}), [i]),
		verifySetup: s(async (e, t, n, a) => await i(`/api/pools/${e}/users/${t}/mfa/verify`, {
			method: "POST",
			body: JSON.stringify({
				deviceId: n,
				code: a
			})
		}) !== null && (r((e) => e.map((e) => e.deviceId === n ? {
			...e,
			isVerified: !0
		} : e)), !0), [i, r]),
		renameDevice: s(async (e, t, n, a) => {
			await i(`/api/pools/${e}/users/${t}/mfa/devices/${n}`, {
				method: "PUT",
				body: JSON.stringify({ deviceName: a })
			}) !== null && r((e) => e.map((e) => e.deviceId === n ? {
				...e,
				deviceName: a
			} : e));
		}, [i, r]),
		removeDevice: s(async (e, t, n) => {
			await i(`/api/pools/${e}/users/${t}/mfa/devices/${n}`, { method: "DELETE" }) !== null && r((e) => e.filter((e) => e.deviceId !== n));
		}, [i, r]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useIdentityMfaAdmin.ts
function re() {
	let { idToken: e } = a(), [t, n] = d(null), [r, i] = d([]), [o, c] = d([]), [l, u] = d(!1), [f, p] = d(null);
	return {
		metrics: t,
		users: r,
		pools: o,
		loading: l,
		error: f,
		refresh: s(async () => {
			if (e) {
				u(!0), p(null);
				try {
					let [t, r, a] = await Promise.all([
						N("/api/admin/mfa/metrics", e),
						N("/api/admin/mfa/users", e),
						N("/api/admin/mfa/pools", e)
					]);
					n(t), i(r), c(a);
				} catch (e) {
					p(e.message);
				} finally {
					u(!1);
				}
			}
		}, [e])
	};
}
//#endregion
//#region src/hooks/useIdentityPools.ts
function ie() {
	let { idToken: e } = a(), { data: t, loading: n, error: r, setData: i, refresh: o, mutate: c } = F([], { url: "/api/pools" });
	return {
		pools: t,
		loading: n,
		error: r,
		createPool: s(async (e) => {
			let t = await c("/api/pools", {
				method: "POST",
				body: JSON.stringify(e)
			});
			return t && i((e) => [...e, t]), t;
		}, [c, i]),
		updatePool: s(async (e, t) => {
			let n = await c(`/api/pools/${e}`, {
				method: "PUT",
				body: JSON.stringify(t)
			});
			return n && i((t) => t.map((t) => t.poolId === e ? n : t)), n;
		}, [c, i]),
		deletePool: s(async (e) => {
			await c(`/api/pools/${e}`, { method: "DELETE" }) !== null && i((t) => t.filter((t) => t.poolId !== e));
		}, [c, i]),
		getStats: s(async () => {
			if (!e) return [];
			try {
				return await N("/api/pools/stats", e);
			} catch {
				return [];
			}
		}, [e]),
		refresh: o
	};
}
//#endregion
//#region src/hooks/useIdentitySetupStatus.ts
function ae() {
	let { data: e, loading: t, error: n, refresh: r } = F(null, { url: "/api/admin/setup-status" });
	return {
		status: e,
		loading: t,
		error: n,
		refresh: r
	};
}
//#endregion
//#region src/hooks/useIdentityUsers.ts
function oe(e) {
	let { data: t, loading: n, error: r, setData: i, refresh: a, mutate: o } = F([], { url: e ? `/api/pools/${e}/users` : null });
	return {
		users: t,
		loading: n,
		error: r,
		createUser: s(async (t) => {
			let n = await o(`/api/pools/${e}/users`, {
				method: "POST",
				body: JSON.stringify(t)
			});
			return n && i((e) => [...e, n]), n;
		}, [
			e,
			o,
			i
		]),
		updateUser: s(async (t, n) => {
			let r = await o(`/api/pools/${e}/users/${t}`, {
				method: "PUT",
				body: JSON.stringify(n)
			});
			return r && i((e) => e.map((e) => e.userId === t ? r : e)), r;
		}, [
			e,
			o,
			i
		]),
		deleteUser: s(async (t) => {
			await o(`/api/pools/${e}/users/${t}`, { method: "DELETE" }) !== null && i((e) => e.filter((e) => e.userId !== t));
		}, [
			e,
			o,
			i
		]),
		refresh: a
	};
}
//#endregion
//#region src/hooks/useAuth.ts
var z = "auth_id_token", B = "auth_refresh_token", V = "auth_email";
function H(e, t) {
	try {
		let n = JSON.parse(atob(e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).exp * 1e3 - Date.now() - 12e4;
		return n <= 0 ? (t(), null) : setTimeout(t, n);
	} catch {
		return null;
	}
}
function U() {
	let [e, t] = d({
		status: "loading",
		idToken: null,
		email: null,
		error: null
	}), n = l(() => new g({
		UserPoolId: "",
		ClientId: ""
	}), []), r = u(null), i = u(null), a = u(!0);
	c(() => (a.current = !0, () => {
		a.current = !1, r.current &&= (clearTimeout(r.current), null);
	}), []);
	let o = s((e, t) => {
		a.current && (r.current && clearTimeout(r.current), r.current = H(e, t));
	}, []), _ = s(() => {
		r.current &&= (clearTimeout(r.current), null), n?.getCurrentUser()?.signOut(), localStorage.removeItem(z), localStorage.removeItem(B), localStorage.removeItem(V), i.current?.postMessage({ type: "SIGNED_OUT" }), t({
			status: "unauthenticated",
			idToken: null,
			email: null,
			error: null
		});
	}, [n]), v = u(() => {}), y = s(() => {
		let e = localStorage.getItem(B);
		if (!e) {
			_(), t((e) => ({
				...e,
				status: "unauthenticated",
				error: "Your session has expired. Please sign in again."
			}));
			return;
		}
		let r = n.getCurrentUser();
		if (!r) {
			_(), t((e) => ({
				...e,
				status: "unauthenticated",
				error: "Your session has expired. Please sign in again."
			}));
			return;
		}
		let a = new p({ RefreshToken: e });
		r.refreshSession(a, (e, n) => {
			if (e || !n) {
				_(), t((e) => ({
					...e,
					status: "unauthenticated",
					error: "Your session has expired. Please sign in again."
				}));
				return;
			}
			let r = n.getIdToken().getJwtToken(), a = n.getRefreshToken().getToken();
			localStorage.setItem(z, r), localStorage.setItem(B, a), t((e) => ({
				...e,
				idToken: r
			})), i.current?.postMessage({
				type: "TOKEN_REFRESHED",
				idToken: r
			}), o(r, () => v.current());
		});
	}, [
		n,
		_,
		o
	]);
	c(() => {
		v.current = y;
	}, [y]), c(() => {
		let e = new BroadcastChannel("auth");
		return i.current = e, e.onmessage = (e) => {
			let n = e.data;
			n.type === "TOKEN_REFRESHED" ? (localStorage.setItem(z, n.idToken), t((e) => ({
				...e,
				idToken: n.idToken
			}))) : n.type === "SIGNED_OUT" && (localStorage.removeItem(z), localStorage.removeItem(B), localStorage.removeItem(V), t({
				status: "unauthenticated",
				idToken: null,
				email: null,
				error: null
			}));
		}, () => {
			e.close(), i.current = null;
		};
	}, []), c(() => {
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
		return e.getSession((n, r) => {
			if (n || !r || !r.isValid()) t({
				status: "unauthenticated",
				idToken: null,
				email: null,
				error: null
			});
			else {
				let n = r.getIdToken().getJwtToken(), i = e.getUsername();
				t({
					status: "authenticated",
					idToken: n,
					email: i,
					error: null
				}), o(n, y);
			}
		}), () => {
			r.current &&= (clearTimeout(r.current), null);
		};
	}, []);
	let b = s((e, r) => new Promise((i) => {
		let a = new m({
			Username: e,
			Pool: n
		}), s = new f({
			Username: e,
			Password: r
		});
		a.authenticateUser(s, {
			onSuccess: (n) => {
				let r = n.getIdToken().getJwtToken(), a = n.getRefreshToken().getToken();
				localStorage.setItem(z, r), localStorage.setItem(B, a), localStorage.setItem(V, e), t({
					status: "authenticated",
					idToken: r,
					email: e,
					error: null
				}), o(r, y), i();
			},
			onFailure: (e) => {
				t((t) => ({
					...t,
					status: "unauthenticated",
					idToken: null,
					error: e.message
				})), i();
			},
			newPasswordRequired: () => {
				t((e) => ({
					...e,
					status: "unauthenticated",
					idToken: null,
					error: "Password change required — contact admin"
				})), i();
			}
		});
	}), [n, y]), x = s((e, r) => new Promise((i) => {
		let a = [new h({
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
			b(e, r).then(i);
		});
	}), [n, b]);
	return {
		...e,
		signIn: b,
		signUp: x,
		signOut: _
	};
}
//#endregion
//#region src/hooks/useChat.ts
function W(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, displayName: a } = e, [o, l] = d([]), f = u(t);
	c(() => {
		f.current = t;
	}, [t]);
	let p = u(r);
	c(() => {
		p.current = r;
	}, [r]);
	let m = u(a);
	return c(() => {
		m.current = a;
	}, [a]), c(() => n((e) => {
		if (e.type === "chat" && e.action === "history") {
			if (e.channel !== p.current) return;
			let t = e.messages ?? [];
			l(t.map((e) => ({
				id: e.id,
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
			l((e) => n.id && e.some((e) => e.id === n.id) ? e : [...e, n]);
			return;
		}
	}), [n]), c(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "chat",
			action: "join",
			channel: r
		}), () => {
			f.current({
				service: "chat",
				action: "leave",
				channel: r
			});
		};
	}, [r, i]), c(() => {
		l([]);
	}, [r]), {
		messages: o,
		send: s((e) => {
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
function G(e, t, n = !0) {
	c(() => {
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
function K(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function se(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return btoa(t);
}
function ce(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i } = e, [a, o] = d(""), [l, f] = d(!1), [p] = d(() => new _.Doc()), m = u(p), [h] = d(() => p.getText("content")), g = u(h), b = u(t);
	c(() => {
		b.current = t;
	}, [t]);
	let x = u(r);
	c(() => {
		x.current = r;
	}, [r]), c(() => n((e) => {
		if (e.type === "crdt:snapshot") {
			if (e.channel !== x.current) return;
			let t = e.snapshot;
			if (!t) return;
			try {
				let e = K(t);
				v(m.current, e), o(g.current.toString());
			} catch {}
			return;
		}
		if (e.type === "crdt:update") {
			if (e.channel !== x.current) return;
			let t = e.update;
			if (!t) return;
			try {
				let e = K(t);
				v(m.current, e), o(g.current.toString());
			} catch {}
			return;
		}
	}), [n]), c(() => {
		if (!(i !== "connected" || !r)) return f(!1), m.current.destroy(), m.current = new _.Doc(), g.current = m.current.getText("content"), g.current.observe(() => o(g.current.toString())), o(""), m.current.on("afterTransaction", (e) => {
			e.origin !== null && g.current.length > 0 && f(!0);
		}), t({
			service: "crdt",
			action: "subscribe",
			channel: r
		}), () => {
			b.current({
				service: "crdt",
				action: "unsubscribe",
				channel: r
			}), o("");
		};
	}, [r, i]);
	let S = s(() => {
		f(!1);
	}, []);
	return {
		content: a,
		applyLocalEdit: s((e) => {
			m.current.transact(() => {
				g.current.delete(0, g.current.length), g.current.insert(0, e);
			});
			let t = se(y(m.current));
			b.current({
				service: "crdt",
				action: "update",
				channel: x.current,
				update: t
			});
		}, []),
		hasConflict: l,
		dismissConflict: S
	};
}
//#endregion
//#region src/hooks/useCursors.ts
function le(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, clientId: a, displayName: o } = e, l = u(/* @__PURE__ */ new Map()), [f, p] = d(/* @__PURE__ */ new Map()), [m, h] = d(null), [g, _] = d("freeform"), v = u("freeform"), y = u(null), b = u(r);
	c(() => {
		b.current = r;
	}, [r]);
	let x = u(i);
	c(() => {
		x.current = i;
	}, [i]);
	let S = u(a);
	c(() => {
		S.current = a;
	}, [a]);
	let C = u(o);
	return c(() => {
		C.current = o;
	}, [o]), c(() => n((e) => {
		if (e.type !== "cursor") return;
		let t = e.action;
		if (t === "subscribed") {
			let t = e.cursors ?? [], n = /* @__PURE__ */ new Map();
			for (let e of t) e.clientId !== S.current && n.set(e.clientId, e);
			l.current = n, p(new Map(n));
			return;
		}
		if (t === "update") {
			let t = e.cursor;
			if (!t || t.clientId === S.current) return;
			l.current.set(t.clientId, t), p(new Map(l.current));
			return;
		}
		if (t === "remove") {
			let t = e.clientId;
			if (!t) return;
			l.current.delete(t), p(new Map(l.current));
		}
	}), [n]), c(() => {
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
			}), l.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), y.current !== null && (clearTimeout(y.current), y.current = null);
		};
	}, [
		r,
		i,
		g,
		t
	]), c(() => () => {
		y.current !== null && (clearTimeout(y.current), y.current = null);
	}, []), {
		cursors: f,
		localCursor: m,
		activeMode: g,
		sendFreeformUpdate: s((e, n) => {
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
		sendTableUpdate: s((e, n) => {
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
		sendTextUpdate: s((e, n, r) => {
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
		sendCanvasUpdate: s((e, n, r, i, a) => {
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
		switchMode: s((e) => {
			x.current === "connected" && b.current && t({
				service: "cursor",
				action: "unsubscribe",
				channel: b.current
			}), l.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), h(null), v.current = e, _(e);
		}, [t])
	};
}
//#endregion
//#region src/hooks/useCustomFieldTypes.ts
function q() {
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
function J(e) {
	localStorage.setItem(r, JSON.stringify(e));
}
function ue(e, t) {
	if (!e.display) return t;
	let n = {};
	for (let [r, i] of Object.entries(t)) {
		let t = e.display[r];
		t && !t.visible || (n[r] = t?.renderer && i.includes(t.renderer) ? [t.renderer] : i);
	}
	return n;
}
function Y(n) {
	let r = t(n.baseType);
	e({
		type: n.id,
		label: n.name,
		icon: n.icon,
		description: n.description,
		rendererType: n.baseType,
		rendererKeys: ue(n, r?.rendererKeys ?? {}),
		rendererLabels: r?.rendererLabels ?? {}
	});
}
function de() {
	let [e, t] = d(() => q());
	return {
		types: e,
		createType: s((e) => {
			let n = (/* @__PURE__ */ new Date()).toISOString(), r = {
				...e,
				id: crypto.randomUUID(),
				createdAt: n,
				updatedAt: n
			}, i = [...q(), r];
			return J(i), t(i), Y(r), r;
		}, []),
		updateType: s((e, n) => {
			let r = (/* @__PURE__ */ new Date()).toISOString(), i = q().map((t) => t.id === e ? {
				...t,
				...n,
				updatedAt: r
			} : t);
			J(i), t(i);
			let a = i.find((t) => t.id === e);
			a && Y(a);
		}, []),
		deleteType: s((e) => {
			let n = q().filter((t) => t.id !== e);
			J(n), t(n);
		}, [])
	};
}
//#endregion
//#region src/hooks/useDocuments.ts
var fe = 15e3, pe = 1e4;
function X(e) {
	return [...e].sort((e, t) => new Date(t.updatedAt).getTime() - new Date(e.updatedAt).getTime());
}
function me(e) {
	let { sendMessage: t, onMessage: n, connectionState: r } = e, [i, a] = d([]), [o, l] = d({}), [f, p] = d(!0), m = u(null), h = u(null), g = u(!1), _ = u(t);
	return c(() => {
		_.current = t;
	}, [t]), c(() => n((e) => {
		if (e.type === "documents:presence") {
			g.current = !0;
			let t = e.documents;
			if (t) {
				let e = {};
				for (let n of t) {
					let t = n.documentId.startsWith("doc:") ? n.documentId.slice(4) : n.documentId;
					e[t] = n.users;
				}
				l(e);
			}
			return;
		}
		if (e.type === "crdt") {
			if (e.action === "documentList") {
				let t = e.documents ?? [];
				a(X(t)), p(!1);
				return;
			}
			if (e.action === "documentCreated") {
				let t = e.document;
				t && a((e) => X([t, ...e]));
				return;
			}
			if (e.action === "documentDeleted") {
				let t = e.documentId;
				t && a((e) => e.filter((e) => e.id !== t));
				return;
			}
			if (e.action === "documentMetaUpdated") {
				let t = e.documentId, n = e.meta;
				t && n && a((e) => X(e.map((e) => e.id === t ? {
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
					l(e);
				}
			}
		}
	}), [n]), c(() => {
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
			}, pe));
		}, fe), () => {
			t(), h.current !== null && (clearTimeout(h.current), h.current = null), m.current !== null && (clearInterval(m.current), m.current = null), a([]), l({}), p(!0);
		};
	}, [r]), {
		documents: i,
		presence: o,
		loading: f,
		createDocument: s((e) => {
			_.current({
				service: "crdt",
				action: "createDocument",
				meta: e
			});
		}, []),
		deleteDocument: s((e) => {
			_.current({
				service: "crdt",
				action: "deleteDocument",
				documentId: e
			});
		}, []),
		updateDocumentMeta: s((e, t) => {
			_.current({
				service: "crdt",
				action: "updateDocumentMeta",
				documentId: e,
				meta: t
			});
		}, []),
		refreshDocuments: s(() => {
			_.current({
				service: "crdt",
				action: "listDocuments"
			});
		}, []),
		refreshPresence: s(() => {
			_.current({
				service: "crdt",
				action: "getDocumentPresence"
			});
		}, [])
	};
}
//#endregion
//#region src/hooks/useKeyboardShortcuts.ts
function he(e) {
	if (!e || !(e instanceof HTMLElement)) return !1;
	let t = e.tagName.toLowerCase();
	return !!(t === "input" || t === "textarea" || e.isContentEditable);
}
function Z(e) {
	c(() => {
		let t = (t) => {
			if (!he(t.target)) for (let n of e) {
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
var ge = 3e4;
function _e(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i, displayName: a } = e, [o, l] = d(/* @__PURE__ */ new Map()), f = u(null), p = u(null), m = u(t);
	c(() => {
		m.current = t;
	}, [t]);
	let h = u(r);
	c(() => {
		h.current = r;
	}, [r]);
	let g = u(a);
	c(() => {
		g.current = a;
	}, [a]), c(() => n((e) => {
		if (e.type === "presence") {
			if (e.action === "subscribed") {
				let t = e.presence ?? e.users ?? [], n = /* @__PURE__ */ new Map();
				for (let e of t) n.set(e.clientId, e);
				l(n);
				return;
			}
			if (e.action === "update") {
				let t = e.presence, n = t?.clientId ?? e.clientId;
				if (!n) return;
				let r = t?.status ?? "online", i = t?.metadata ?? {};
				l((e) => {
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
				l((e) => {
					let n = new Map(e);
					return n.delete(t), n;
				});
			}
		}
	}), [n]), c(() => {
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
		}, ge), () => {
			f.current !== null && (clearInterval(f.current), f.current = null), m.current({
				service: "presence",
				action: "unsubscribe",
				channel: r
			}), l(/* @__PURE__ */ new Map());
		};
	}, [r, i]);
	let _ = s((e) => {
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
	return c(() => () => {
		p.current !== null && (clearTimeout(p.current), p.current = null);
	}, []), {
		users: Array.from(o.values()),
		setTyping: _
	};
}
//#endregion
//#region src/hooks/useReactions.ts
function ve(e) {
	let { sendMessage: t, onMessage: n, currentChannel: r, connectionState: i } = e, [a, o] = d([]), l = u(t);
	c(() => {
		l.current = t;
	}, [t]);
	let f = u(r);
	c(() => {
		f.current = r;
	}, [r]);
	let p = u(/* @__PURE__ */ new Set());
	return c(() => {
		let e = p.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), c(() => n((e) => {
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
			o((e) => [...e, n]);
			let r = setTimeout(() => {
				p.current.delete(r), o((e) => e.filter((e) => e.id !== n.id));
			}, 2500);
			p.current.add(r);
		}
	}), [n]), c(() => {
		if (!(i !== "connected" || !r)) return t({
			service: "reaction",
			action: "subscribe",
			channel: r
		}), () => {
			l.current({
				service: "reaction",
				action: "unsubscribe",
				channel: r
			}), o([]);
		};
	}, [r, i]), {
		activeReactions: a,
		react: s((e) => {
			l.current({
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
function Q(e) {
	return e.channelId ? e : {
		...e,
		channelId: e.slug ? `room:${e.slug}` : e.roomId
	};
}
var $ = "Social API not configured";
function ye({ idToken: e, onMessage: t, baseUrl: n }) {
	let [r, a] = d([]), [l, f] = d(null), [p, m] = d([]), [h, g] = d(!1), [_, v] = d(null), [y, b] = d(null), [x, S] = d(0), { toast: C } = o() ?? {}, w = n ?? i(), T = s(() => S((e) => e + 1), []), E = u(t);
	c(() => {
		E.current = t;
	}, [t]);
	let D = u(null), O = u(0);
	c(() => {
		if (!e || !w) return;
		let t = !1;
		return g(!0), v(null), b(null), fetch(`${w}/api/rooms`, { headers: { Authorization: `Bearer ${e}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load rooms (${e.status})`);
			return e.json();
		}).then((e) => {
			t || a((e.rooms ?? []).map(Q));
		}).catch((e) => {
			t || (v(e.message), b(e.message), C?.("Couldn't load rooms", { type: "error" }));
		}).finally(() => {
			t || g(!1);
		}), () => {
			t = !0;
		};
	}, [
		e,
		w,
		x,
		C
	]), c(() => E.current((e) => {
		let t = e.payload ?? e;
		e.type === "social:member_joined" && t.roomId === D.current ? m((e) => [...e, {
			roomId: t.roomId,
			userId: t.userId,
			displayName: t.displayName,
			joinedAt: (/* @__PURE__ */ new Date()).toISOString()
		}]) : e.type === "social:member_left" && t.roomId === D.current && m((e) => e.filter((e) => e.userId !== t.userId));
	}), []);
	let k = s(async (t) => {
		if (!e) return;
		let n = ++O.current;
		try {
			let r = await fetch(`${w}/api/rooms/${t}/members`, { headers: { Authorization: `Bearer ${e}` } });
			if (!r.ok) throw Error(`Failed to load members (${r.status})`);
			let i = await r.json();
			if (n !== O.current) return;
			m(i.members ?? []);
		} catch (e) {
			if (n !== O.current) return;
			v(e.message);
		}
	}, [e, w]), A = s((e) => {
		D.current = e?.roomId ?? null, f(e), e ? k(e.roomId) : (O.current += 1, m([]));
	}, [k]), j = s(async (t) => {
		if (!e || !w) throw v($), Error($);
		g(!0), v(null);
		try {
			let n = await fetch(`${w}/api/rooms`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${e}`
				},
				body: JSON.stringify({ name: t })
			});
			if (!n.ok) throw Error(`Failed to create room (${n.status})`);
			let r = Q(await n.json());
			return a((e) => [r, ...e]), r;
		} catch (e) {
			throw v(e.message), e;
		} finally {
			g(!1);
		}
	}, [e, w]), M = s(async (t) => {
		if (!e || !w) throw v($), Error($);
		g(!0), v(null);
		try {
			let n = await fetch(`${w}/api/rooms/dm`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${e}`
				},
				body: JSON.stringify({ peerId: t })
			});
			if (!n.ok) throw Error(`Failed to create DM (${n.status})`);
			let r = Q(await n.json());
			return a((e) => [r, ...e]), r;
		} catch (e) {
			throw v(e.message), e;
		} finally {
			g(!1);
		}
	}, [e, w]), N = s(async (t) => {
		if (e) {
			if (!t) {
				v("joinRoom called with empty roomId");
				return;
			}
			v(null);
			try {
				let n = await fetch(`${w}/api/rooms/${encodeURIComponent(t)}/join`, {
					method: "POST",
					headers: { Authorization: `Bearer ${e}` }
				});
				if (!n.ok) throw Error(`Failed to join room (${n.status})`);
			} catch (e) {
				v(e.message);
			}
		}
	}, [e, w]), P = s(async (t) => {
		if (e) {
			v(null);
			try {
				let n = await fetch(`${w}/api/rooms/${t}/leave`, {
					method: "DELETE",
					headers: { Authorization: `Bearer ${e}` }
				});
				if (!n.ok) throw Error(`Failed to leave room (${n.status})`);
				a((e) => e.filter((e) => e.roomId !== t)), D.current === t && (D.current = null, f(null), O.current += 1, m([]));
			} catch (e) {
				v(e.message);
			}
		}
	}, [e, w]);
	return {
		rooms: r,
		activeRoom: l,
		setActiveRoom: A,
		createRoom: j,
		createDM: M,
		createGroupRoom: s(async (t, n) => {
			if (!e || !w) throw v($), Error($);
			g(!0), v(null);
			try {
				let r = await fetch(`${w}/api/groups/${t}/rooms`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${e}`
					},
					body: JSON.stringify({ name: n })
				});
				if (!r.ok) throw Error(`Failed to create group room (${r.status})`);
				let i = Q(await r.json());
				return a((e) => [i, ...e]), i;
			} catch (e) {
				throw v(e.message), e;
			} finally {
				g(!1);
			}
		}, [e, w]),
		joinRoom: N,
		leaveRoom: P,
		loadMembers: k,
		members: p,
		loading: h,
		error: _,
		loadError: y,
		retry: T
	};
}
//#endregion
//#region src/hooks/useTypedDocuments.ts
function be() {
	return "";
}
function xe({ idToken: e, typeId: t, baseUrl: n }) {
	let r = n ?? be(), [i, a] = d([]), [o, l] = d(!1), [u, f] = d(null), [p, m] = d(0);
	return c(() => {
		if (!e || !t) {
			a([]);
			return;
		}
		let n = !1;
		return l(!0), f(null), fetch(`${r}/api/typed-documents?typeId=${encodeURIComponent(t)}`, { headers: { Authorization: `Bearer ${e}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load documents (${e.status})`);
			return e.json();
		}).then((e) => {
			n || a(e.items ?? []);
		}).catch((e) => {
			n || f(e.message);
		}).finally(() => {
			n || l(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		t,
		p,
		r
	]), {
		documents: i,
		loading: o,
		error: u,
		createDocument: s(async (n) => {
			if (!e || !t) throw Error("not ready: missing idToken or typeId");
			let i = await fetch(`${r}/api/typed-documents`, {
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
			let o = await i.json();
			return a((e) => [o, ...e]), o;
		}, [
			e,
			t,
			r
		]),
		refresh: s(() => {
			m((e) => e + 1);
		}, [])
	};
}
//#endregion
//#region src/hooks/useUrlFilterState.ts
function Se(e) {
	let [t, n] = b();
	return {
		filters: l(() => {
			let n = { ...e };
			for (let r in e) {
				let e = t.get(r);
				e !== null && (n[r] = e);
			}
			return n;
		}, [t, e]),
		setFilter: s((t, r) => {
			n((n) => {
				let i = new URLSearchParams(n);
				return r === void 0 || r === e[t] ? i.delete(String(t)) : i.set(String(t), r), i;
			});
		}, [n, e]),
		clearFilters: s(() => {
			n({});
		}, [n])
	};
}
//#endregion
export { D as A, F as C, N as D, M as E, k as O, I as S, P as T, re as _, _e as a, R as b, de as c, G as d, W as f, ie as g, ae as h, ve as i, E as j, j as k, le as l, oe as m, xe as n, Z as o, U as p, ye as r, me as s, Se as t, ce as u, ne as v, ee as w, L as x, te as y };
