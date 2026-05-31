import { useState as T, useRef as D, useEffect as I, useCallback as y, useMemo as te } from "react";
import { u as L } from "./IdentityContext-CLalsm_M.js";
import { CognitoUserPool as ne, CognitoRefreshToken as re, CognitoUser as se, AuthenticationDetails as oe, CognitoUserAttribute as ce } from "amazon-cognito-identity-js";
import * as Y from "yjs";
import { applyUpdate as X, encodeStateAsUpdate as ae } from "yjs";
import { C as z, i as ie } from "./fieldType-BJfRz7mO.js";
import { b as ue, r as le } from "./registry-D1eP6Kby.js";
import { a as de } from "./ToastProvider-aHBNxMTO.js";
import { useSearchParams as fe } from "react-router";
const j = "activity:broadcast", me = 100, pe = 2e3;
let ye = 0;
function K() {
  return `local-${Date.now()}-${++ye}`;
}
function Ae(e) {
  const {
    sendMessage: n,
    onMessage: a,
    connectionState: r,
    userId: i,
    displayName: m,
    color: u,
    maxItems: f = me
  } = e, [g, p] = T([]), [s, o] = T(!1), t = D(n);
  I(() => {
    t.current = n;
  }, [n]);
  const c = D(i);
  I(() => {
    c.current = i;
  }, [i]);
  const d = D(m);
  I(() => {
    d.current = m;
  }, [m]);
  const l = D(u);
  I(() => {
    l.current = u;
  }, [u]);
  const h = D(f);
  I(() => {
    h.current = f;
  }, [f]), I(() => a((v) => {
    if (v.type === "activity:event") {
      const w = v.payload;
      if (!w) return;
      p((C) => {
        const $ = new Date(w.timestamp).getTime();
        return C.some(
          (O) => O.source === "local" && O.eventType === w.eventType && Math.abs(new Date(O.timestamp).getTime() - $) < pe
        ) || C.length > 0 && C[0].timestamp === w.timestamp && C[0].eventType === w.eventType ? C : [{
          id: w.id ?? K(),
          eventType: w.eventType,
          detail: w.detail,
          timestamp: w.timestamp,
          userId: w.userId,
          displayName: w.displayName,
          color: w.color,
          source: "remote"
        }, ...C].slice(0, h.current);
      });
      return;
    }
    if (v.type === "activity" && v.action === "history") {
      const w = v.events;
      if (!w || w.length === 0) return;
      p((C) => C.length > 0 ? C : w.map((N) => ({
        id: K(),
        eventType: N.eventType,
        detail: N.detail ?? {},
        timestamp: N.timestamp,
        userId: N.userId,
        displayName: N.displayName,
        source: "remote"
      })).slice(0, h.current));
    }
  }), [a]), I(() => {
    if (r !== "connected") {
      o(!1);
      return;
    }
    return t.current({
      service: "activity",
      action: "subscribe",
      channelId: j
    }), t.current({
      service: "activity",
      action: "getHistory",
      channelId: j,
      limit: h.current
    }), o(!0), () => {
      t.current({
        service: "activity",
        action: "unsubscribe",
        channelId: j
      }), o(!1);
    };
  }, [r]);
  const R = y(
    (M, v) => {
      const w = (/* @__PURE__ */ new Date()).toISOString(), $ = {
        id: K(),
        eventType: M,
        detail: v,
        timestamp: w,
        userId: c.current,
        displayName: d.current,
        color: l.current,
        source: "local"
      };
      p((N) => [$, ...N].slice(0, h.current)), t.current({
        service: "activity",
        action: "publish",
        event: { eventType: M, detail: v }
      });
    },
    []
    // All deps accessed via refs — stable callback
  );
  return { events: g, publish: R, isLive: s };
}
function _e(e) {
  const [n, a] = T(null), [r, i] = T(!1), [m, u] = T(null), [f, g] = T([]), p = y(
    async (...t) => {
      i(!0), u(null), g(t);
      try {
        const c = await e(...t);
        a(c);
      } catch (c) {
        u(c instanceof Error ? c.message : String(c));
      } finally {
        i(!1);
      }
    },
    [e]
  ), s = y(async () => {
    await p(...f);
  }, [p, f]), o = y(() => {
    a(null), u(null), i(!1), g([]);
  }, []);
  return { data: n, loading: r, error: m, execute: p, retry: s, reset: o };
}
const he = 3e4;
function ke(e = he) {
  const [a, r] = T({
    status: "unknown",
    checks: {},
    failing: []
  });
  return D(!1), I(() => {
  }, ["", e]), a;
}
const ge = "";
async function U(e, n, a) {
  const r = await fetch(`${ge}${e}`, {
    ...a,
    headers: {
      "Content-Type": "application/json",
      ...n ? { Authorization: `Bearer ${n}` } : {},
      ...a?.headers
    }
  });
  if (!r.ok) {
    const i = await r.json().catch(() => ({ message: r.statusText }));
    throw new Error(i.message || r.statusText);
  }
  return r.json();
}
function Le() {
  const { idToken: e } = L(), [n, a] = T(!1), [r, i] = T(!1), [m, u] = T(null), f = y(async () => {
    if (!e) {
      a(!1);
      return;
    }
    i(!0), u(null);
    try {
      await U("/api/admin/session", e), a(!0);
    } catch (s) {
      a(!1), u(s.message);
    } finally {
      i(!1);
    }
  }, [e]), g = y(async (s, o) => {
    i(!0), u(null);
    try {
      await U("/api/admin/login", e, {
        method: "POST",
        body: JSON.stringify({ email: s, password: o })
      }), a(!0);
    } catch (t) {
      a(!1), u(t.message);
    } finally {
      i(!1);
    }
  }, [e]), p = y(async () => {
    i(!0), u(null);
    try {
      await U("/api/admin/logout", e, { method: "POST" }), a(!1);
    } catch (s) {
      u(s.message);
    } finally {
      i(!1);
    }
  }, [e]);
  return { authenticated: n, loading: r, error: m, login: g, logout: p, checkSession: f };
}
function xe() {
  const { idToken: e } = L(), [n, a] = T([]), [r, i] = T(!1), [m, u] = T(null), f = y(async (s) => {
    if (e) {
      i(!0), u(null);
      try {
        const o = new URLSearchParams();
        s.entityType && o.set("entityType", s.entityType), s.entityId && o.set("entityId", s.entityId), s.fromTime != null && o.set("fromTime", String(s.fromTime)), s.toTime != null && o.set("toTime", String(s.toTime)), s.limit != null && o.set("limit", String(s.limit)), s.cursor && o.set("cursor", s.cursor);
        const t = o.toString(), c = `/api/audit${t ? `?${t}` : ""}`, d = await U(c, e);
        a(d);
      } catch (o) {
        u(o.message);
      } finally {
        i(!1);
      }
    }
  }, [e]), g = y(async (s, o) => {
    if (!e) return [];
    try {
      return await U(
        `/api/audit/entity/${s}/${o}`,
        e
      );
    } catch (t) {
      return u(t.message), [];
    }
  }, [e]), p = y(async (s, o) => {
    if (!e) return null;
    try {
      return await U(
        `/api/audit/state/${s}?at=${o}`,
        e
      );
    } catch (t) {
      return u(t.message), null;
    }
  }, [e]);
  return { records: n, loading: r, error: m, query: f, getEntityHistory: g, getStateAtTime: p };
}
function k(e, n) {
  const { idToken: a } = L(), [r, i] = T(e), [m, u] = T(!1), [f, g] = T(null), p = y(async () => {
    if (!(!a || !n.url)) {
      u(!0), g(null);
      try {
        const o = await U(n.url, a);
        i(o);
      } catch (o) {
        g(o.message);
      } finally {
        u(!1);
      }
    }
  }, [a, n.url]);
  I(() => {
    n.fetchOnMount !== !1 && p();
  }, [p, n.fetchOnMount]);
  const s = y(
    async (o, t) => {
      if (!a) return null;
      u(!0), g(null);
      try {
        return await U(o, a, t);
      } catch (c) {
        return g(c.message), null;
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return { data: r, loading: m, error: f, setData: i, refresh: p, mutate: s };
}
function Je() {
  const { data: e, loading: n, error: a, setData: r, refresh: i, mutate: m } = k([], { url: "/api/clients" }), u = y(async (s) => {
    const o = await m("/api/clients", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return o && r((t) => [...t, o]), o;
  }, [m, r]), f = y(async (s, o) => {
    const t = await m(`/api/clients/${s}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
    return t && r((c) => c.map((d) => d.clientId === s ? t : d)), t;
  }, [m, r]), g = y(async (s) => {
    await m(`/api/clients/${s}`, { method: "DELETE" }) !== null && r((t) => t.filter((c) => c.clientId !== s));
  }, [m, r]), p = y(async (s) => {
    const o = await m("/api/clients/with-pool", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return o && r((t) => [...t, o]), o;
  }, [m, r]);
  return { clients: e, loading: n, error: a, createClient: u, updateClient: f, deleteClient: g, createWithPool: p, refresh: i };
}
function Fe() {
  const { idToken: e } = L(), [n, a] = T(null), [r, i] = T(null), [m, u] = T([]), [f, g] = T(!1), [p, s] = T(null), o = y(async () => {
    if (e) {
      g(!0), s(null);
      try {
        const [d, l, h] = await Promise.all([
          U("/api/admin/diagnostics", e),
          U("/api/admin/diagnostics/rates", e),
          U("/api/admin/diagnostics/dlq", e)
        ]);
        a(d), i(l), u(h);
      } catch (d) {
        s(d.message);
      } finally {
        g(!1);
      }
    }
  }, [e]), t = y(async (d) => {
    if (e) {
      s(null);
      try {
        await U(`/api/admin/diagnostics/dlq/${d}/redrive`, e, {
          method: "POST"
        }), u((l) => l.filter((h) => h.id !== d));
      } catch (l) {
        s(l.message);
      }
    }
  }, [e]), c = y(async (d) => {
    if (e) {
      s(null);
      try {
        await U(`/api/admin/diagnostics/dlq/${d}`, e, {
          method: "DELETE"
        }), u((l) => l.filter((h) => h.id !== d));
      } catch (l) {
        s(l.message);
      }
    }
  }, [e]);
  return { diagnostics: n, rates: r, dlq: m, loading: f, error: p, redriveDlq: t, purgeDlq: c, refresh: o };
}
function Be() {
  const { data: e, loading: n, error: a, setData: r, refresh: i, mutate: m } = k([], { url: "/api/email-templates" }), u = y(async (s) => {
    const o = await m("/api/email-templates", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return o && r((t) => [...t, o]), o;
  }, [m, r]), f = y(async (s, o) => {
    const t = await m(`/api/email-templates/${s}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
    return t && r((c) => c.map((d) => d.templateId === s ? t : d)), t;
  }, [m, r]), g = y(async (s) => {
    await m(`/api/email-templates/${s}`, { method: "DELETE" }) !== null && r((t) => t.filter((c) => c.templateId !== s));
  }, [m, r]), p = y(async (s, o) => {
    await m(`/api/email-templates/${s}/test`, {
      method: "POST",
      body: JSON.stringify({ recipientEmail: o })
    });
  }, [m]);
  return { templates: e, loading: n, error: a, createTemplate: u, updateTemplate: f, deleteTemplate: g, testSend: p, refresh: i };
}
function je(e) {
  const { data: n, loading: a, error: r, setData: i, refresh: m, mutate: u } = k([], {
    url: e ? `/api/pools/${e}/groups` : null
  }), f = y(async (t) => {
    const c = await u(`/api/pools/${e}/groups`, {
      method: "POST",
      body: JSON.stringify(t)
    });
    return c && i((d) => [...d, c]), c;
  }, [e, u, i]), g = y(async (t, c) => {
    const d = await u(`/api/pools/${e}/groups/${t}`, {
      method: "PUT",
      body: JSON.stringify(c)
    });
    return d && i((l) => l.map((h) => h.groupId === t ? d : h)), d;
  }, [e, u, i]), p = y(async (t) => {
    await u(`/api/pools/${e}/groups/${t}`, { method: "DELETE" }) !== null && i((d) => d.filter((l) => l.groupId !== t));
  }, [e, u, i]), s = y(async (t, c) => {
    await u(`/api/pools/${e}/groups/${t}/members`, {
      method: "POST",
      body: JSON.stringify({ userId: c })
    }) !== null && i(
      (l) => l.map(
        (h) => h.groupId === t ? { ...h, members: [...h.members ?? [], c] } : h
      )
    );
  }, [e, u, i]), o = y(async (t, c) => {
    await u(`/api/pools/${e}/groups/${t}/members/${c}`, {
      method: "DELETE"
    }) !== null && i(
      (l) => l.map(
        (h) => h.groupId === t ? { ...h, members: (h.members ?? []).filter((R) => R !== c) } : h
      )
    );
  }, [e, u, i]);
  return { groups: n, loading: a, error: r, createGroup: f, updateGroup: g, deleteGroup: p, addMember: s, removeMember: o, refresh: m };
}
function Ke() {
  const { data: e, loading: n, error: a, setData: r, mutate: i } = k([], { url: null, fetchOnMount: !1 }), m = y(async (s, o) => {
    const t = await i(`/api/pools/${s}/users/${o}/mfa/devices`, {
      method: "GET"
    });
    t && r(t);
  }, [i, r]), u = y(async (s, o, t) => await i(
    `/api/pools/${s}/users/${o}/mfa/setup`,
    { method: "POST", body: JSON.stringify({ deviceName: t }) }
  ), [i]), f = y(async (s, o, t, c) => await i(
    `/api/pools/${s}/users/${o}/mfa/verify`,
    { method: "POST", body: JSON.stringify({ deviceId: t, code: c }) }
  ) !== null ? (r(
    (l) => l.map((h) => h.deviceId === t ? { ...h, isVerified: !0 } : h)
  ), !0) : !1, [i, r]), g = y(async (s, o, t, c) => {
    await i(
      `/api/pools/${s}/users/${o}/mfa/devices/${t}`,
      { method: "PUT", body: JSON.stringify({ deviceName: c }) }
    ) !== null && r(
      (l) => l.map((h) => h.deviceId === t ? { ...h, deviceName: c } : h)
    );
  }, [i, r]), p = y(async (s, o, t) => {
    await i(
      `/api/pools/${s}/users/${o}/mfa/devices/${t}`,
      { method: "DELETE" }
    ) !== null && r((d) => d.filter((l) => l.deviceId !== t));
  }, [i, r]);
  return { devices: e, loading: n, error: a, setupDevice: u, verifySetup: f, renameDevice: g, removeDevice: p, refresh: m };
}
function Ge() {
  const { idToken: e } = L(), [n, a] = T(null), [r, i] = T([]), [m, u] = T([]), [f, g] = T(!1), [p, s] = T(null), o = y(async () => {
    if (e) {
      g(!0), s(null);
      try {
        const [t, c, d] = await Promise.all([
          U("/api/admin/mfa/metrics", e),
          U("/api/admin/mfa/users", e),
          U("/api/admin/mfa/pools", e)
        ]);
        a(t), i(c), u(d);
      } catch (t) {
        s(t.message);
      } finally {
        g(!1);
      }
    }
  }, [e]);
  return { metrics: n, users: r, pools: m, loading: f, error: p, refresh: o };
}
function qe() {
  const { idToken: e } = L(), { data: n, loading: a, error: r, setData: i, refresh: m, mutate: u } = k([], { url: "/api/pools" }), f = y(async (o) => {
    const t = await u("/api/pools", {
      method: "POST",
      body: JSON.stringify(o)
    });
    return t && i((c) => [...c, t]), t;
  }, [u, i]), g = y(async (o, t) => {
    const c = await u(`/api/pools/${o}`, {
      method: "PUT",
      body: JSON.stringify(t)
    });
    return c && i((d) => d.map((l) => l.poolId === o ? c : l)), c;
  }, [u, i]), p = y(async (o) => {
    await u(`/api/pools/${o}`, { method: "DELETE" }) !== null && i((c) => c.filter((d) => d.poolId !== o));
  }, [u, i]), s = y(async () => {
    if (!e) return [];
    try {
      return await U("/api/pools/stats", e);
    } catch {
      return [];
    }
  }, [e]);
  return { pools: n, loading: a, error: r, createPool: f, updatePool: g, deletePool: p, getStats: s, refresh: m };
}
function He() {
  const { data: e, loading: n, error: a, refresh: r } = k(null, { url: "/api/admin/setup-status" });
  return { status: e, loading: n, error: a, refresh: r };
}
function We(e) {
  const { data: n, loading: a, error: r, setData: i, refresh: m, mutate: u } = k([], {
    url: e ? `/api/pools/${e}/users` : null
  }), f = y(async (s) => {
    const o = await u(`/api/pools/${e}/users`, {
      method: "POST",
      body: JSON.stringify(s)
    });
    return o && i((t) => [...t, o]), o;
  }, [e, u, i]), g = y(async (s, o) => {
    const t = await u(`/api/pools/${e}/users/${s}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
    return t && i((c) => c.map((d) => d.userId === s ? t : d)), t;
  }, [e, u, i]), p = y(async (s) => {
    await u(`/api/pools/${e}/users/${s}`, { method: "DELETE" }) !== null && i((t) => t.filter((c) => c.userId !== s));
  }, [e, u, i]);
  return { users: n, loading: a, error: r, createUser: f, updateUser: g, deleteUser: p, refresh: m };
}
const x = "auth_id_token", J = "auth_refresh_token", G = "auth_email";
function q(e, n) {
  try {
    const i = JSON.parse(
      atob(e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    ).exp * 1e3 - Date.now() - 120 * 1e3;
    return i <= 0 ? (n(), null) : setTimeout(n, i);
  } catch {
    return null;
  }
}
function ze() {
  const [e, n] = T({
    status: "loading",
    idToken: null,
    email: null,
    error: null
  }), a = te(
    () => new ne({
      UserPoolId: "",
      ClientId: ""
    }),
    []
  ), r = D(null), i = D(null), m = y(() => {
    r.current && (clearTimeout(r.current), r.current = null), a?.getCurrentUser()?.signOut(), localStorage.removeItem(x), localStorage.removeItem(J), localStorage.removeItem(G), i.current?.postMessage({ type: "SIGNED_OUT" }), n({
      status: "unauthenticated",
      idToken: null,
      email: null,
      error: null
    });
  }, [a]), u = D(() => {
  }), f = y(() => {
    const s = localStorage.getItem(J);
    if (!s) {
      m(), n((c) => ({
        ...c,
        status: "unauthenticated",
        error: "Your session has expired. Please sign in again."
      }));
      return;
    }
    const o = a.getCurrentUser();
    if (!o) {
      m(), n((c) => ({
        ...c,
        status: "unauthenticated",
        error: "Your session has expired. Please sign in again."
      }));
      return;
    }
    const t = new re({ RefreshToken: s });
    o.refreshSession(t, (c, d) => {
      if (c || !d) {
        m(), n((R) => ({
          ...R,
          status: "unauthenticated",
          error: "Your session has expired. Please sign in again."
        }));
        return;
      }
      const l = d.getIdToken().getJwtToken(), h = d.getRefreshToken().getToken();
      localStorage.setItem(x, l), localStorage.setItem(J, h), n((R) => ({ ...R, idToken: l })), i.current?.postMessage({ type: "TOKEN_REFRESHED", idToken: l }), r.current = q(l, () => u.current());
    });
  }, [a, m]);
  I(() => {
    u.current = f;
  }, [f]), I(() => {
    const s = new BroadcastChannel("auth");
    return i.current = s, s.onmessage = (o) => {
      const t = o.data;
      t.type === "TOKEN_REFRESHED" ? (localStorage.setItem(x, t.idToken), n((c) => ({ ...c, idToken: t.idToken }))) : t.type === "SIGNED_OUT" && (localStorage.removeItem(x), localStorage.removeItem(J), localStorage.removeItem(G), n({ status: "unauthenticated", idToken: null, email: null, error: null }));
    }, () => {
      s.close(), i.current = null;
    };
  }, []), I(() => {
    const s = a.getCurrentUser();
    if (!s) {
      n({
        status: "unauthenticated",
        idToken: null,
        email: null,
        error: null
      });
      return;
    }
    return s.getSession((o, t) => {
      if (o || !t || !t.isValid())
        n({
          status: "unauthenticated",
          idToken: null,
          email: null,
          error: null
        });
      else {
        const c = t.getIdToken().getJwtToken(), d = s.getUsername();
        n({
          status: "authenticated",
          idToken: c,
          email: d,
          error: null
        }), r.current = q(c, f);
      }
    }), () => {
      r.current && (clearTimeout(r.current), r.current = null);
    };
  }, []);
  const g = y(
    (s, o) => new Promise((t) => {
      const c = new se({ Username: s, Pool: a }), d = new oe({ Username: s, Password: o });
      c.authenticateUser(d, {
        onSuccess: (l) => {
          const h = l.getIdToken().getJwtToken(), R = l.getRefreshToken().getToken();
          localStorage.setItem(x, h), localStorage.setItem(J, R), localStorage.setItem(G, s), n({
            status: "authenticated",
            idToken: h,
            email: s,
            error: null
          }), r.current = q(h, f), t();
        },
        onFailure: (l) => {
          n((h) => ({
            ...h,
            status: "unauthenticated",
            idToken: null,
            error: l.message
          })), t();
        },
        newPasswordRequired: () => {
          n((l) => ({
            ...l,
            status: "unauthenticated",
            idToken: null,
            error: "Password change required — contact admin"
          })), t();
        }
      });
    }),
    [a, f]
  ), p = y(
    (s, o) => new Promise((t) => {
      const c = [new ce({ Name: "email", Value: s })];
      a.signUp(s, o, c, [], (d) => {
        if (d) {
          n((l) => ({
            ...l,
            status: "unauthenticated",
            error: d.message
          })), t();
          return;
        }
        g(s, o).then(t);
      });
    }),
    [a, g]
  );
  return {
    ...e,
    signIn: g,
    signUp: p,
    signOut: m
  };
}
function Ve(e) {
  const { sendMessage: n, onMessage: a, currentChannel: r, connectionState: i, displayName: m } = e, [u, f] = T([]), g = D(n);
  I(() => {
    g.current = n;
  }, [n]);
  const p = D(r);
  I(() => {
    p.current = r;
  }, [r]);
  const s = D(m);
  I(() => {
    s.current = m;
  }, [m]), I(() => a((c) => {
    if (c.type === "chat" && c.action === "history") {
      if (c.channel !== p.current) return;
      const d = c.messages ?? [];
      f(d.map((l) => ({
        clientId: l.clientId,
        content: l.message,
        timestamp: l.timestamp,
        displayName: l.metadata?.displayName,
        avatarUrl: l.metadata?.avatarUrl
      })));
      return;
    }
    if (c.type === "chat" && c.action === "message") {
      if (c.channel !== p.current) return;
      const d = c.message;
      if (!d) return;
      const l = {
        id: d.id,
        clientId: d.clientId,
        content: d.message,
        timestamp: d.timestamp,
        displayName: d.metadata?.displayName,
        avatarUrl: d.metadata?.avatarUrl
      };
      f((h) => l.id && h.some((R) => R.id === l.id) ? h : [...h, l]);
      return;
    }
  }), [a]), I(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "chat", action: "join", channel: r }), () => {
        g.current({
          service: "chat",
          action: "leave",
          channel: r
        }), f([]);
      };
  }, [r, i]);
  const o = y((t) => {
    g.current({
      service: "chat",
      action: "send",
      channel: p.current,
      message: t,
      metadata: { displayName: s.current }
    });
  }, []);
  return { messages: u, send: o };
}
function Ye(e, n, a = !0) {
  I(() => {
    if (!a) return;
    const r = (i) => {
      e.current && !e.current.contains(i.target) && n();
    };
    return document.addEventListener("mousedown", r), () => document.removeEventListener("mousedown", r);
  }, [e, n, a]);
}
function Q(e) {
  const n = atob(e), a = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++) a[r] = n.charCodeAt(r);
  return a;
}
function Te(e) {
  let n = "";
  for (let a = 0; a < e.length; a++) n += String.fromCharCode(e[a]);
  return btoa(n);
}
function Xe(e) {
  const { sendMessage: n, onMessage: a, currentChannel: r, connectionState: i } = e, [m, u] = T(""), [f, g] = T(!1), [p] = T(() => new Y.Doc()), s = D(p), [o] = T(() => p.getText("content")), t = D(o), c = D(n);
  I(() => {
    c.current = n;
  }, [n]);
  const d = D(r);
  I(() => {
    d.current = r;
  }, [r]), I(() => a((M) => {
    if (M.type === "crdt:snapshot") {
      if (M.channel !== d.current) return;
      const v = M.snapshot;
      if (!v) return;
      try {
        const w = Q(v);
        X(s.current, w), u(t.current.toString());
      } catch {
      }
      return;
    }
    if (M.type === "crdt:update") {
      if (M.channel !== d.current) return;
      const v = M.update;
      if (!v) return;
      try {
        const w = Q(v);
        X(s.current, w), u(t.current.toString());
      } catch {
      }
      return;
    }
  }), [a]), I(() => {
    if (!(i !== "connected" || !r))
      return g(!1), s.current.destroy(), s.current = new Y.Doc(), t.current = s.current.getText("content"), t.current.observe(() => u(t.current.toString())), u(""), s.current.on("afterTransaction", (R) => {
        R.origin !== null && t.current.length > 0 && g(!0);
      }), n({ service: "crdt", action: "subscribe", channel: r }), () => {
        c.current({
          service: "crdt",
          action: "unsubscribe",
          channel: r
        }), u("");
      };
  }, [r, i]);
  const l = y(() => {
    g(!1);
  }, []), h = y((R) => {
    s.current.transact(() => {
      t.current.delete(0, t.current.length), t.current.insert(0, R);
    });
    const M = ae(s.current), v = Te(M);
    c.current({
      service: "crdt",
      action: "update",
      channel: d.current,
      update: v
    });
  }, []);
  return { content: m, applyLocalEdit: h, hasConflict: f, dismissConflict: l };
}
function Qe(e) {
  const { sendMessage: n, onMessage: a, currentChannel: r, connectionState: i, clientId: m, displayName: u } = e, f = D(/* @__PURE__ */ new Map()), [g, p] = T(/* @__PURE__ */ new Map()), [s, o] = T(null), [t, c] = T("freeform"), d = D("freeform"), l = D(null), h = D(r);
  I(() => {
    h.current = r;
  }, [r]);
  const R = D(i);
  I(() => {
    R.current = i;
  }, [i]);
  const M = D(m);
  I(() => {
    M.current = m;
  }, [m]);
  const v = D(u);
  I(() => {
    v.current = u;
  }, [u]), I(() => a((b) => {
    if (b.type !== "cursor") return;
    const E = b.action;
    if (E === "subscribed") {
      const S = b.cursors ?? [], P = /* @__PURE__ */ new Map();
      for (const _ of S)
        _.clientId !== M.current && P.set(_.clientId, _);
      f.current = P, p(new Map(P));
      return;
    }
    if (E === "update") {
      const S = b.cursor;
      if (!S || S.clientId === M.current) return;
      f.current.set(S.clientId, S), p(new Map(f.current));
      return;
    }
    if (E === "remove") {
      const S = b.clientId;
      if (!S) return;
      f.current.delete(S), p(new Map(f.current));
    }
  }), [a]), I(() => {
    if (!(i !== "connected" || !r))
      return n({
        service: "cursor",
        action: "subscribe",
        channel: r,
        mode: t
      }), () => {
        n({
          service: "cursor",
          action: "unsubscribe",
          channel: r
        }), f.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), l.current !== null && (clearTimeout(l.current), l.current = null);
      };
  }, [r, i, t, n]);
  const w = y(
    (O, b) => {
      if (R.current !== "connected" || l.current !== null) return;
      const E = { x: O, y: b }, S = { mode: "freeform", displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: h.current,
        position: E,
        metadata: S
      }), o({
        clientId: M.current ?? "local",
        position: E,
        metadata: S
      }), l.current = setTimeout(() => {
        l.current = null;
      }, 50);
    },
    [n]
  ), C = y(
    (O, b) => {
      if (R.current !== "connected") return;
      const E = { row: O, col: b }, S = { mode: "table", displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: h.current,
        position: E,
        metadata: S
      }), o({
        clientId: M.current ?? "local",
        position: E,
        metadata: S
      });
    },
    [n]
  ), $ = y(
    (O, b, E) => {
      if (R.current !== "connected") return;
      const S = { position: O }, P = { mode: "text", selection: b, hasSelection: E, displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: h.current,
        position: S,
        metadata: P
      }), o({
        clientId: M.current ?? "local",
        position: S,
        metadata: P
      });
    },
    [n]
  ), N = y(
    (O, b, E, S, P) => {
      if (R.current !== "connected" || !h.current) return;
      const _ = { x: O, y: b }, V = { mode: "canvas", tool: E, color: S, size: P, displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: h.current,
        position: _,
        metadata: V
      }), o({
        clientId: M.current ?? "local",
        position: _,
        metadata: V
      });
    },
    [n]
  ), A = y(
    (O) => {
      R.current === "connected" && h.current && n({
        service: "cursor",
        action: "unsubscribe",
        channel: h.current
      }), f.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), o(null), d.current = O, c(O);
    },
    [n]
  );
  return {
    cursors: g,
    localCursor: s,
    activeMode: t,
    sendFreeformUpdate: w,
    sendTableUpdate: C,
    sendTextUpdate: $,
    sendCanvasUpdate: N,
    switchMode: A
  };
}
function F() {
  try {
    const e = localStorage.getItem(z);
    if (!e) return [];
    const n = JSON.parse(e);
    if (!Array.isArray(n)) return [];
    const a = n.filter(ie);
    return a.length !== n.length && localStorage.setItem(z, JSON.stringify(a)), a;
  } catch {
    return [];
  }
}
function H(e) {
  localStorage.setItem(z, JSON.stringify(e));
}
function Z(e) {
  const n = ue(e.baseType);
  le({
    type: e.id,
    label: e.name,
    icon: e.icon,
    description: e.description,
    rendererType: e.baseType,
    rendererKeys: n?.rendererKeys ?? {},
    rendererLabels: n?.rendererLabels ?? {}
  });
}
function Ze() {
  const [e, n] = T(() => F()), a = y(
    (m) => {
      const u = (/* @__PURE__ */ new Date()).toISOString(), f = {
        ...m,
        id: crypto.randomUUID(),
        createdAt: u,
        updatedAt: u
      }, p = [...F(), f];
      return H(p), n(p), Z(f), f;
    },
    []
  ), r = y(
    (m, u) => {
      const f = (/* @__PURE__ */ new Date()).toISOString(), p = F().map(
        (o) => o.id === m ? { ...o, ...u, updatedAt: f } : o
      );
      H(p), n(p);
      const s = p.find((o) => o.id === m);
      s && Z(s);
    },
    []
  ), i = y((m) => {
    const f = F().filter((g) => g.id !== m);
    H(f), n(f);
  }, []);
  return { types: e, createType: a, updateType: r, deleteType: i };
}
const we = 15e3, Se = 1e4;
function W(e) {
  return [...e].sort(
    (n, a) => new Date(a.updatedAt).getTime() - new Date(n.updatedAt).getTime()
  );
}
function et(e) {
  const { sendMessage: n, onMessage: a, connectionState: r } = e, [i, m] = T([]), [u, f] = T({}), [g, p] = T(!0), s = D(null), o = D(null), t = D(!1), c = D(n);
  I(() => {
    c.current = n;
  }, [n]), I(() => a((w) => {
    if (w.type === "documents:presence") {
      t.current = !0;
      const C = w.documents;
      if (C) {
        const $ = {};
        for (const N of C) {
          const A = N.documentId.startsWith("doc:") ? N.documentId.slice(4) : N.documentId;
          $[A] = N.users;
        }
        f($);
      }
      return;
    }
    if (w.type === "crdt") {
      if (w.action === "documentList") {
        const C = w.documents ?? [];
        m(W(C)), p(!1);
        return;
      }
      if (w.action === "documentCreated") {
        const C = w.document;
        C && m(($) => W([C, ...$]));
        return;
      }
      if (w.action === "documentDeleted") {
        const C = w.documentId;
        C && m(($) => $.filter((N) => N.id !== C));
        return;
      }
      if (w.action === "documentMetaUpdated") {
        const C = w.documentId, $ = w.meta;
        C && $ && m(
          (N) => W(
            N.map((A) => A.id === C ? { ...A, ...$ } : A)
          )
        );
        return;
      }
      if (w.action === "documentPresence") {
        const C = w.presence;
        if (C) {
          const $ = {};
          for (const [N, A] of Object.entries(C)) {
            const O = N.startsWith("doc:") ? N.slice(4) : N;
            $[O] = A;
          }
          f($);
        }
      }
    }
  }), [a]), I(() => {
    if (r !== "connected") return;
    t.current = !1;
    const v = setTimeout(() => {
      c.current({ service: "crdt", action: "listDocuments" }), c.current({ service: "crdt", action: "getDocumentPresence" });
    }, 100), w = () => clearTimeout(v);
    return o.current = setTimeout(() => {
      t.current || (s.current = setInterval(() => {
        c.current({ service: "crdt", action: "getDocumentPresence" });
      }, Se));
    }, we), () => {
      w(), o.current !== null && (clearTimeout(o.current), o.current = null), s.current !== null && (clearInterval(s.current), s.current = null), m([]), f({}), p(!0);
    };
  }, [r]);
  const d = y(
    (v) => {
      c.current({ service: "crdt", action: "createDocument", meta: v });
    },
    []
  ), l = y((v) => {
    c.current({ service: "crdt", action: "deleteDocument", documentId: v });
  }, []), h = y(
    (v, w) => {
      c.current({
        service: "crdt",
        action: "updateDocumentMeta",
        documentId: v,
        meta: w
      });
    },
    []
  ), R = y(() => {
    c.current({ service: "crdt", action: "listDocuments" });
  }, []), M = y(() => {
    c.current({ service: "crdt", action: "getDocumentPresence" });
  }, []);
  return {
    documents: i,
    presence: u,
    loading: g,
    createDocument: d,
    deleteDocument: l,
    updateDocumentMeta: h,
    refreshDocuments: R,
    refreshPresence: M
  };
}
function Ee(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName.toLowerCase();
  return !!(n === "input" || n === "textarea" || e.isContentEditable);
}
function tt(e) {
  I(() => {
    const n = (a) => {
      if (!Ee(a.target))
        for (const r of e) {
          const i = r.meta ? a.metaKey || a.ctrlKey : !0, m = r.shift ? a.shiftKey : !0, u = r.alt ? a.altKey : !0, f = a.key.toLowerCase() === r.key.toLowerCase();
          if (i && m && u && f) {
            r.preventDefault !== !1 && a.preventDefault(), r.handler(a);
            return;
          }
        }
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e]);
}
const Ie = 3e4;
function nt(e) {
  const { sendMessage: n, onMessage: a, currentChannel: r, connectionState: i, displayName: m } = e, [u, f] = T(/* @__PURE__ */ new Map()), g = D(null), p = D(null), s = D(n);
  I(() => {
    s.current = n;
  }, [n]);
  const o = D(r);
  I(() => {
    o.current = r;
  }, [r]);
  const t = D(m);
  I(() => {
    t.current = m;
  }, [m]), I(() => a((h) => {
    if (h.type === "presence") {
      if (h.action === "subscribed") {
        const R = h.presence ?? h.users ?? [], M = /* @__PURE__ */ new Map();
        for (const v of R)
          M.set(v.clientId, v);
        f(M);
        return;
      }
      if (h.action === "update") {
        const R = h.presence, M = R?.clientId ?? h.clientId;
        if (!M) return;
        const v = R?.status ?? "online", w = R?.metadata ?? {};
        f((C) => {
          const $ = new Map(C);
          return $.set(M, { clientId: M, status: v, metadata: w }), $;
        });
        return;
      }
      if (h.action === "offline") {
        const R = h.clientId;
        f((M) => {
          const v = new Map(M);
          return v.delete(R), v;
        });
      }
    }
  }), [a]), I(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "presence", action: "subscribe", channel: r }), n({
        service: "presence",
        action: "set",
        status: "online",
        metadata: { displayName: t.current },
        channels: [r]
      }), g.current = setInterval(() => {
        s.current({
          service: "presence",
          action: "heartbeat",
          metadata: { displayName: t.current, isTyping: !1 },
          channels: [o.current]
        });
      }, Ie), () => {
        g.current !== null && (clearInterval(g.current), g.current = null), s.current({
          service: "presence",
          action: "unsubscribe",
          channel: r
        }), f(/* @__PURE__ */ new Map());
      };
  }, [r, i]);
  const c = y(
    (l) => {
      s.current({
        service: "presence",
        action: "set",
        status: l ? "typing" : "online",
        metadata: { displayName: t.current, isTyping: l },
        channels: [o.current]
      }), l ? (p.current !== null && clearTimeout(p.current), p.current = setTimeout(() => {
        s.current({
          service: "presence",
          action: "set",
          status: "online",
          metadata: { displayName: t.current, isTyping: !1 },
          channels: [o.current]
        }), p.current = null;
      }, 2e3)) : p.current !== null && (clearTimeout(p.current), p.current = null);
    },
    []
    // All deps are accessed via refs — stable callback that never causes re-renders
  );
  return { users: Array.from(u.values()), setTyping: c };
}
function rt(e) {
  const { sendMessage: n, onMessage: a, currentChannel: r, connectionState: i } = e, [m, u] = T([]), f = D(n);
  I(() => {
    f.current = n;
  }, [n]);
  const g = D(r);
  I(() => {
    g.current = r;
  }, [r]), I(() => a((o) => {
    if (o.type === "reaction" && o.action === "reaction_received") {
      const t = o.data;
      if (t?.channel !== g.current) return;
      const c = {
        id: `${Date.now()}-${Math.random()}`,
        emoji: t?.emoji,
        x: Math.floor(Math.random() * 81) + 10,
        // 10-90
        y: Math.floor(Math.random() * 81) + 10,
        // 10-90
        timestamp: t?.timestamp
      };
      u((d) => [...d, c]), setTimeout(() => {
        u((d) => d.filter((l) => l.id !== c.id));
      }, 2500);
    }
  }), [a]), I(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "reaction", action: "subscribe", channel: r }), () => {
        f.current({
          service: "reaction",
          action: "unsubscribe",
          channel: r
        }), u([]);
      };
  }, [r, i]);
  const p = y((s) => {
    f.current({
      service: "reaction",
      action: "send",
      channel: g.current,
      emoji: s
    });
  }, []);
  return { activeReactions: m, react: p };
}
function st({ idToken: e, onMessage: n }) {
  const [a, r] = T([]), [i, m] = T(null), [u, f] = T([]), [g, p] = T(!1), [s, o] = T(null), [t, c] = T(0), { toast: d } = de(), l = "", h = y(() => c((b) => b + 1), []), R = D(n);
  I(() => {
    R.current = n;
  }, [n]);
  const M = D(null);
  I(() => {
  }, [e, l, t, d]), I(() => R.current((E) => {
    const S = E.payload ?? E;
    E.type === "social:member_joined" && S.roomId === M.current ? f((P) => [
      ...P,
      {
        roomId: S.roomId,
        userId: S.userId,
        displayName: S.displayName,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]) : E.type === "social:member_left" && S.roomId === M.current && f((P) => P.filter((_) => _.userId !== S.userId));
  }), []);
  const v = y(async (b) => {
    if (e)
      try {
        const E = await fetch(`${l}/api/rooms/${b}/members`, {
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to load members (${E.status})`);
        const S = await E.json();
        f(S.members ?? []);
      } catch (E) {
        o(E.message);
      }
  }, [e, l]), w = y((b) => {
    M.current = b?.roomId ?? null, m(b), b && v(b.roomId);
  }, [v]), C = y(async (b) => {
    {
      o("Social API not configured");
      return;
    }
  }, [e, l]), $ = y(async (b) => {
    if (e) {
      p(!0), o(null);
      try {
        const E = await fetch(`${l}/api/rooms/dm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          },
          body: JSON.stringify({ peerId: b })
        });
        if (!E.ok) throw new Error(`Failed to create DM (${E.status})`);
        const S = await E.json();
        r((P) => [S, ...P]);
      } catch (E) {
        throw o(E.message), E;
      } finally {
        p(!1);
      }
    }
  }, [e, l]), N = y(async (b) => {
    if (e) {
      o(null);
      try {
        const E = await fetch(`${l}/api/rooms/${b}/join`, {
          method: "POST",
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to join room (${E.status})`);
      } catch (E) {
        o(E.message);
      }
    }
  }, [e, l]), A = y(async (b) => {
    if (e) {
      o(null);
      try {
        const E = await fetch(`${l}/api/rooms/${b}/leave`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to leave room (${E.status})`);
        r((S) => S.filter((P) => P.roomId !== b));
      } catch (E) {
        o(E.message);
      }
    }
  }, [e, l]), O = y(async (b, E) => {
    if (e) {
      p(!0), o(null);
      try {
        const S = await fetch(`${l}/api/groups/${b}/rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          },
          body: JSON.stringify({ name: E })
        });
        if (!S.ok) throw new Error(`Failed to create group room (${S.status})`);
        const P = await S.json();
        r((_) => [P, ..._]);
      } catch (S) {
        throw o(S.message), S;
      } finally {
        p(!1);
      }
    }
  }, [e, l]);
  return {
    rooms: a,
    activeRoom: i,
    setActiveRoom: w,
    createRoom: C,
    createDM: $,
    createGroupRoom: O,
    joinRoom: N,
    leaveRoom: A,
    loadMembers: v,
    members: u,
    loading: g,
    error: s,
    retry: h
  };
}
function ee() {
  return "";
}
function ot({ idToken: e, typeId: n }) {
  const [a, r] = T([]), [i, m] = T(!1), [u, f] = T(null), [g, p] = T(0);
  I(() => {
    if (!e || !n) {
      r([]);
      return;
    }
    let t = !1;
    return m(!0), f(null), fetch(`${ee()}/api/typed-documents?typeId=${encodeURIComponent(n)}`, {
      headers: { Authorization: `Bearer ${e}` }
    }).then(async (c) => {
      if (!c.ok) throw new Error(`Failed to load documents (${c.status})`);
      return c.json();
    }).then((c) => {
      t || r(c.items ?? []);
    }).catch((c) => {
      t || f(c.message);
    }).finally(() => {
      t || m(!1);
    }), () => {
      t = !0;
    };
  }, [e, n, g]);
  const s = y(
    async (t) => {
      if (!e || !n) throw new Error("not ready: missing idToken or typeId");
      const c = await fetch(`${ee()}/api/typed-documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        },
        body: JSON.stringify({ typeId: n, values: t })
      });
      if (!c.ok) {
        const l = await c.text();
        throw new Error(`Create failed (${c.status}): ${l}`);
      }
      const d = await c.json();
      return r((l) => [d, ...l]), d;
    },
    [e, n]
  ), o = y(() => {
    p((t) => t + 1);
  }, []);
  return { documents: a, loading: i, error: u, createDocument: s, refresh: o };
}
function ct(e) {
  const [n, a] = fe(), r = te(() => {
    const u = { ...e };
    for (const f in e) {
      const g = n.get(f);
      g !== null && (u[f] = g);
    }
    return u;
  }, [n, e]), i = y(
    (u, f) => {
      a((g) => {
        const p = new URLSearchParams(g);
        return f === void 0 || f === e[u] ? p.delete(String(u)) : p.set(String(u), f), p;
      });
    },
    [a, e]
  ), m = y(() => {
    a({});
  }, [a]);
  return { filters: r, setFilter: i, clearFilters: m };
}
const B = 5, ve = 1e3;
function be(e, n) {
  const a = new URL(e.wsUrl);
  return n && a.searchParams.set("sessionToken", n), a.toString();
}
const De = "bearer-token-v1";
function at(e) {
  const { config: n, onMessage: a } = e, [r, i] = T("idle"), [m, u] = T(null), [f, g] = T(
    () => sessionStorage.getItem("ws_session_token")
  ), [p, s] = T(
    () => sessionStorage.getItem("ws_client_id")
  ), [o, t] = T(n.defaultChannel), c = D(null), d = D(0), l = D(null), h = D(!1), R = D(a);
  I(() => {
    R.current = a;
  }, [a]);
  const M = D(
    sessionStorage.getItem("ws_session_token")
  );
  I(() => {
    M.current = f;
  }, [f]);
  const v = D(() => {
  }), w = y(() => {
    if (c.current && (c.current.readyState === WebSocket.OPEN || c.current.readyState === WebSocket.CONNECTING))
      return;
    i("connecting");
    const O = be(n, M.current), b = new WebSocket(O, [De, n.cognitoToken]);
    c.current = b, b.onopen = () => {
      c.current === b && (d.current = 0, i("connected"));
    }, b.onmessage = (E) => {
      if (c.current !== b) return;
      let S;
      try {
        S = JSON.parse(E.data);
      } catch {
        return;
      }
      if (S.type === "session") {
        const P = S;
        g(P.sessionToken), s(P.clientId), M.current = P.sessionToken, sessionStorage.setItem("ws_session_token", P.sessionToken), sessionStorage.setItem("ws_client_id", P.clientId);
      }
      S.type === "error" && S.error && u(S.error), R.current?.(S);
    }, b.onclose = () => {
      if (c.current === b)
        if (d.current < B) {
          d.current === 0 ? console.warn("[useWebSocket] connection lost, retrying with backoff") : console.debug("[useWebSocket] reconnect attempt", d.current + 1, "of", B), i("reconnecting");
          const E = ve * Math.pow(2, d.current);
          d.current += 1, l.current = setTimeout(() => {
            v.current();
          }, E);
        } else
          i("disconnected"), h.current || u({
            code: "RECONNECT_EXHAUSTED",
            message: `Lost connection to gateway after ${B} retries`,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
    }, b.onerror = (E) => {
      if (c.current !== b) return;
      const S = E;
      S.message && u({
        code: "CONNECTION_ERROR",
        message: S.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    };
  }, [n]);
  I(() => {
    v.current = w;
  }, [w]), I(() => (w(), () => {
    l.current !== null && (clearTimeout(l.current), l.current = null), c.current?.close(), c.current = null;
  }), []);
  const C = y((O) => {
    t(O);
  }, []), $ = y((O) => {
    c.current?.readyState === WebSocket.OPEN && c.current.send(JSON.stringify(O));
  }, []), N = y(() => {
    l.current !== null && (clearTimeout(l.current), l.current = null), h.current = !0, d.current = B, c.current?.close(), c.current = null, i("disconnected"), sessionStorage.removeItem("ws_session_token"), sessionStorage.removeItem("ws_client_id");
  }, []), A = y(() => {
    d.current = 0, h.current = !1, l.current !== null && (clearTimeout(l.current), l.current = null);
    const O = c.current;
    c.current = null, O?.close(), d.current = 0, w();
  }, [w]);
  return {
    connectionState: r,
    lastError: m,
    sessionToken: f,
    clientId: p,
    currentChannel: o,
    switchChannel: C,
    sendMessage: $,
    disconnect: N,
    reconnect: A
  };
}
export {
  st as A,
  ge as B,
  ot as C,
  ct as D,
  at as E,
  U as a,
  _e as b,
  ke as c,
  ze as d,
  Xe as e,
  Ve as f,
  Ye as g,
  Qe as h,
  Ze as i,
  et as j,
  Le as k,
  xe as l,
  Je as m,
  Fe as n,
  Be as o,
  je as p,
  Ke as q,
  Ge as r,
  qe as s,
  k as t,
  Ae as u,
  He as v,
  We as w,
  tt as x,
  nt as y,
  rt as z
};
