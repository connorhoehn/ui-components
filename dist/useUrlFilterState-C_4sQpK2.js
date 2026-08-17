import { useState as T, useRef as D, useEffect as S, useCallback as y, useMemo as ee } from "react";
import { u as k } from "./IdentityContext-CLalsm_M.js";
import { CognitoUserPool as te, CognitoRefreshToken as ne, CognitoUser as re, AuthenticationDetails as se, CognitoUserAttribute as ae } from "amazon-cognito-identity-js";
import * as Y from "yjs";
import { applyUpdate as W, encodeStateAsUpdate as oe } from "yjs";
import { C as z, i as ce } from "./fieldType-BJfRz7mO.js";
import { g as ie, r as ue } from "./registry-qR57lair.js";
import { u as le } from "./ToastProvider-DLKtnzJT.js";
import { useSearchParams as de } from "react-router";
const j = "activity:broadcast", fe = 100, me = 2e3;
let pe = 0;
function B() {
  return `local-${Date.now()}-${++pe}`;
}
function Pe(e) {
  const {
    sendMessage: n,
    onMessage: c,
    connectionState: r,
    userId: i,
    displayName: f,
    color: u,
    maxItems: d = fe
  } = e, [h, p] = T([]), [s, a] = T(!1), t = D(n);
  S(() => {
    t.current = n;
  }, [n]);
  const o = D(i);
  S(() => {
    o.current = i;
  }, [i]);
  const m = D(f);
  S(() => {
    m.current = f;
  }, [f]);
  const l = D(u);
  S(() => {
    l.current = u;
  }, [u]);
  const g = D(d);
  S(() => {
    g.current = d;
  }, [d]), S(() => c((v) => {
    if (v.type === "activity:event") {
      const w = v.payload;
      if (!w) return;
      p((R) => {
        const P = new Date(w.timestamp).getTime();
        return R.some(
          (O) => O.source === "local" && O.eventType === w.eventType && Math.abs(new Date(O.timestamp).getTime() - P) < me
        ) || R.length > 0 && R[0].timestamp === w.timestamp && R[0].eventType === w.eventType ? R : [{
          id: w.id ?? B(),
          eventType: w.eventType,
          detail: w.detail,
          timestamp: w.timestamp,
          userId: w.userId,
          displayName: w.displayName,
          color: w.color,
          source: "remote"
        }, ...R].slice(0, g.current);
      });
      return;
    }
    if (v.type === "activity" && v.action === "history") {
      const w = v.events;
      if (!w || w.length === 0) return;
      p((R) => R.length > 0 ? R : w.map((N) => ({
        id: B(),
        eventType: N.eventType,
        detail: N.detail ?? {},
        timestamp: N.timestamp,
        userId: N.userId,
        displayName: N.displayName,
        source: "remote"
      })).slice(0, g.current));
    }
  }), [c]), S(() => {
    if (r !== "connected") {
      a(!1);
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
      limit: g.current
    }), a(!0), () => {
      t.current({
        service: "activity",
        action: "unsubscribe",
        channelId: j
      }), a(!1);
    };
  }, [r]);
  const I = y(
    (M, v) => {
      const w = (/* @__PURE__ */ new Date()).toISOString(), P = {
        id: B(),
        eventType: M,
        detail: v,
        timestamp: w,
        userId: o.current,
        displayName: m.current,
        color: l.current,
        source: "local"
      };
      p((N) => [P, ...N].slice(0, g.current)), t.current({
        service: "activity",
        action: "publish",
        event: { eventType: M, detail: v }
      });
    },
    []
    // All deps accessed via refs — stable callback
  );
  return { events: h, publish: I, isLive: s };
}
function Oe(e) {
  const [n, c] = T(null), [r, i] = T(!1), [f, u] = T(null), [d, h] = T([]), p = y(
    async (...t) => {
      i(!0), u(null), h(t);
      try {
        const o = await e(...t);
        c(o);
      } catch (o) {
        u(o instanceof Error ? o.message : String(o));
      } finally {
        i(!1);
      }
    },
    [e]
  ), s = y(async () => {
    await p(...d);
  }, [p, d]), a = y(() => {
    c(null), u(null), i(!1), h([]);
  }, []);
  return { data: n, loading: r, error: f, execute: p, retry: s, reset: a };
}
const ye = 3e4;
function Ce(e = ye) {
  const [c, r] = T({
    status: "unknown",
    checks: {},
    failing: []
  });
  return D(!1), S(() => {
  }, ["", e]), c;
}
const he = "";
async function U(e, n, c) {
  const r = await fetch(`${he}${e}`, {
    ...c,
    headers: {
      "Content-Type": "application/json",
      ...n ? { Authorization: `Bearer ${n}` } : {},
      ...c?.headers
    }
  });
  if (!r.ok) {
    const i = await r.json().catch(() => ({ message: r.statusText }));
    throw new Error(i.message || r.statusText);
  }
  return r.json();
}
function Ue() {
  const { idToken: e } = k(), [n, c] = T(!1), [r, i] = T(!1), [f, u] = T(null), d = y(async () => {
    if (!e) {
      c(!1);
      return;
    }
    i(!0), u(null);
    try {
      await U("/api/admin/session", e), c(!0);
    } catch (s) {
      c(!1), u(s.message);
    } finally {
      i(!1);
    }
  }, [e]), h = y(async (s, a) => {
    i(!0), u(null);
    try {
      await U("/api/admin/login", e, {
        method: "POST",
        body: JSON.stringify({ email: s, password: a })
      }), c(!0);
    } catch (t) {
      c(!1), u(t.message);
    } finally {
      i(!1);
    }
  }, [e]), p = y(async () => {
    i(!0), u(null);
    try {
      await U("/api/admin/logout", e, { method: "POST" }), c(!1);
    } catch (s) {
      u(s.message);
    } finally {
      i(!1);
    }
  }, [e]);
  return { authenticated: n, loading: r, error: f, login: h, logout: p, checkSession: d };
}
function Ae() {
  const { idToken: e } = k(), [n, c] = T([]), [r, i] = T(!1), [f, u] = T(null), d = y(async (s) => {
    if (e) {
      i(!0), u(null);
      try {
        const a = new URLSearchParams();
        s.entityType && a.set("entityType", s.entityType), s.entityId && a.set("entityId", s.entityId), s.fromTime != null && a.set("fromTime", String(s.fromTime)), s.toTime != null && a.set("toTime", String(s.toTime)), s.limit != null && a.set("limit", String(s.limit)), s.cursor && a.set("cursor", s.cursor);
        const t = a.toString(), o = `/api/audit${t ? `?${t}` : ""}`, m = await U(o, e);
        c(m);
      } catch (a) {
        u(a.message);
      } finally {
        i(!1);
      }
    }
  }, [e]), h = y(async (s, a) => {
    if (!e) return [];
    try {
      return await U(
        `/api/audit/entity/${s}/${a}`,
        e
      );
    } catch (t) {
      return u(t.message), [];
    }
  }, [e]), p = y(async (s, a) => {
    if (!e) return null;
    try {
      return await U(
        `/api/audit/state/${s}?at=${a}`,
        e
      );
    } catch (t) {
      return u(t.message), null;
    }
  }, [e]);
  return { records: n, loading: r, error: f, query: d, getEntityHistory: h, getStateAtTime: p };
}
function _(e, n) {
  const { idToken: c } = k(), [r, i] = T(e), [f, u] = T(!1), [d, h] = T(null), p = y(async () => {
    if (!(!c || !n.url)) {
      u(!0), h(null);
      try {
        const a = await U(n.url, c);
        i(a);
      } catch (a) {
        h(a.message);
      } finally {
        u(!1);
      }
    }
  }, [c, n.url]);
  S(() => {
    n.fetchOnMount !== !1 && p();
  }, [p, n.fetchOnMount]);
  const s = y(
    async (a, t) => {
      if (!c) return null;
      u(!0), h(null);
      try {
        return await U(a, c, t);
      } catch (o) {
        return h(o.message), null;
      } finally {
        u(!1);
      }
    },
    [c]
  );
  return { data: r, loading: f, error: d, setData: i, refresh: p, mutate: s };
}
function Le() {
  const { data: e, loading: n, error: c, setData: r, refresh: i, mutate: f } = _([], { url: "/api/clients" }), u = y(async (s) => {
    const a = await f("/api/clients", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return a && r((t) => [...t, a]), a;
  }, [f, r]), d = y(async (s, a) => {
    const t = await f(`/api/clients/${s}`, {
      method: "PUT",
      body: JSON.stringify(a)
    });
    return t && r((o) => o.map((m) => m.clientId === s ? t : m)), t;
  }, [f, r]), h = y(async (s) => {
    await f(`/api/clients/${s}`, { method: "DELETE" }) !== null && r((t) => t.filter((o) => o.clientId !== s));
  }, [f, r]), p = y(async (s) => {
    const a = await f("/api/clients/with-pool", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return a && r((t) => [...t, a]), a;
  }, [f, r]);
  return { clients: e, loading: n, error: c, createClient: u, updateClient: d, deleteClient: h, createWithPool: p, refresh: i };
}
function _e() {
  const { idToken: e } = k(), [n, c] = T(null), [r, i] = T(null), [f, u] = T([]), [d, h] = T(!1), [p, s] = T(null), a = y(async () => {
    if (e) {
      h(!0), s(null);
      try {
        const [m, l, g] = await Promise.all([
          U("/api/admin/diagnostics", e),
          U("/api/admin/diagnostics/rates", e),
          U("/api/admin/diagnostics/dlq", e)
        ]);
        c(m), i(l), u(g);
      } catch (m) {
        s(m.message);
      } finally {
        h(!1);
      }
    }
  }, [e]), t = y(async (m) => {
    if (e) {
      s(null);
      try {
        await U(`/api/admin/diagnostics/dlq/${m}/redrive`, e, {
          method: "POST"
        }), u((l) => l.filter((g) => g.id !== m));
      } catch (l) {
        s(l.message);
      }
    }
  }, [e]), o = y(async (m) => {
    if (e) {
      s(null);
      try {
        await U(`/api/admin/diagnostics/dlq/${m}`, e, {
          method: "DELETE"
        }), u((l) => l.filter((g) => g.id !== m));
      } catch (l) {
        s(l.message);
      }
    }
  }, [e]);
  return { diagnostics: n, rates: r, dlq: f, loading: d, error: p, redriveDlq: t, purgeDlq: o, refresh: a };
}
function ke() {
  const { data: e, loading: n, error: c, setData: r, refresh: i, mutate: f } = _([], { url: "/api/email-templates" }), u = y(async (s) => {
    const a = await f("/api/email-templates", {
      method: "POST",
      body: JSON.stringify(s)
    });
    return a && r((t) => [...t, a]), a;
  }, [f, r]), d = y(async (s, a) => {
    const t = await f(`/api/email-templates/${s}`, {
      method: "PUT",
      body: JSON.stringify(a)
    });
    return t && r((o) => o.map((m) => m.templateId === s ? t : m)), t;
  }, [f, r]), h = y(async (s) => {
    await f(`/api/email-templates/${s}`, { method: "DELETE" }) !== null && r((t) => t.filter((o) => o.templateId !== s));
  }, [f, r]), p = y(async (s, a) => {
    await f(`/api/email-templates/${s}/test`, {
      method: "POST",
      body: JSON.stringify({ recipientEmail: a })
    });
  }, [f]);
  return { templates: e, loading: n, error: c, createTemplate: u, updateTemplate: d, deleteTemplate: h, testSend: p, refresh: i };
}
function xe(e) {
  const { data: n, loading: c, error: r, setData: i, refresh: f, mutate: u } = _([], {
    url: e ? `/api/pools/${e}/groups` : null
  }), d = y(async (t) => {
    const o = await u(`/api/pools/${e}/groups`, {
      method: "POST",
      body: JSON.stringify(t)
    });
    return o && i((m) => [...m, o]), o;
  }, [e, u, i]), h = y(async (t, o) => {
    const m = await u(`/api/pools/${e}/groups/${t}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
    return m && i((l) => l.map((g) => g.groupId === t ? m : g)), m;
  }, [e, u, i]), p = y(async (t) => {
    await u(`/api/pools/${e}/groups/${t}`, { method: "DELETE" }) !== null && i((m) => m.filter((l) => l.groupId !== t));
  }, [e, u, i]), s = y(async (t, o) => {
    await u(`/api/pools/${e}/groups/${t}/members`, {
      method: "POST",
      body: JSON.stringify({ userId: o })
    }) !== null && i(
      (l) => l.map(
        (g) => g.groupId === t ? { ...g, members: [...g.members ?? [], o] } : g
      )
    );
  }, [e, u, i]), a = y(async (t, o) => {
    await u(`/api/pools/${e}/groups/${t}/members/${o}`, {
      method: "DELETE"
    }) !== null && i(
      (l) => l.map(
        (g) => g.groupId === t ? { ...g, members: (g.members ?? []).filter((I) => I !== o) } : g
      )
    );
  }, [e, u, i]);
  return { groups: n, loading: c, error: r, createGroup: d, updateGroup: h, deleteGroup: p, addMember: s, removeMember: a, refresh: f };
}
function Je() {
  const { data: e, loading: n, error: c, setData: r, mutate: i } = _([], { url: null, fetchOnMount: !1 }), f = y(async (s, a) => {
    const t = await i(`/api/pools/${s}/users/${a}/mfa/devices`, {
      method: "GET"
    });
    t && r(t);
  }, [i, r]), u = y(async (s, a, t) => await i(
    `/api/pools/${s}/users/${a}/mfa/setup`,
    { method: "POST", body: JSON.stringify({ deviceName: t }) }
  ), [i]), d = y(async (s, a, t, o) => await i(
    `/api/pools/${s}/users/${a}/mfa/verify`,
    { method: "POST", body: JSON.stringify({ deviceId: t, code: o }) }
  ) !== null ? (r(
    (l) => l.map((g) => g.deviceId === t ? { ...g, isVerified: !0 } : g)
  ), !0) : !1, [i, r]), h = y(async (s, a, t, o) => {
    await i(
      `/api/pools/${s}/users/${a}/mfa/devices/${t}`,
      { method: "PUT", body: JSON.stringify({ deviceName: o }) }
    ) !== null && r(
      (l) => l.map((g) => g.deviceId === t ? { ...g, deviceName: o } : g)
    );
  }, [i, r]), p = y(async (s, a, t) => {
    await i(
      `/api/pools/${s}/users/${a}/mfa/devices/${t}`,
      { method: "DELETE" }
    ) !== null && r((m) => m.filter((l) => l.deviceId !== t));
  }, [i, r]);
  return { devices: e, loading: n, error: c, setupDevice: u, verifySetup: d, renameDevice: h, removeDevice: p, refresh: f };
}
function Fe() {
  const { idToken: e } = k(), [n, c] = T(null), [r, i] = T([]), [f, u] = T([]), [d, h] = T(!1), [p, s] = T(null), a = y(async () => {
    if (e) {
      h(!0), s(null);
      try {
        const [t, o, m] = await Promise.all([
          U("/api/admin/mfa/metrics", e),
          U("/api/admin/mfa/users", e),
          U("/api/admin/mfa/pools", e)
        ]);
        c(t), i(o), u(m);
      } catch (t) {
        s(t.message);
      } finally {
        h(!1);
      }
    }
  }, [e]);
  return { metrics: n, users: r, pools: f, loading: d, error: p, refresh: a };
}
function je() {
  const { idToken: e } = k(), { data: n, loading: c, error: r, setData: i, refresh: f, mutate: u } = _([], { url: "/api/pools" }), d = y(async (a) => {
    const t = await u("/api/pools", {
      method: "POST",
      body: JSON.stringify(a)
    });
    return t && i((o) => [...o, t]), t;
  }, [u, i]), h = y(async (a, t) => {
    const o = await u(`/api/pools/${a}`, {
      method: "PUT",
      body: JSON.stringify(t)
    });
    return o && i((m) => m.map((l) => l.poolId === a ? o : l)), o;
  }, [u, i]), p = y(async (a) => {
    await u(`/api/pools/${a}`, { method: "DELETE" }) !== null && i((o) => o.filter((m) => m.poolId !== a));
  }, [u, i]), s = y(async () => {
    if (!e) return [];
    try {
      return await U("/api/pools/stats", e);
    } catch {
      return [];
    }
  }, [e]);
  return { pools: n, loading: c, error: r, createPool: d, updatePool: h, deletePool: p, getStats: s, refresh: f };
}
function Be() {
  const { data: e, loading: n, error: c, refresh: r } = _(null, { url: "/api/admin/setup-status" });
  return { status: e, loading: n, error: c, refresh: r };
}
function Ke(e) {
  const { data: n, loading: c, error: r, setData: i, refresh: f, mutate: u } = _([], {
    url: e ? `/api/pools/${e}/users` : null
  }), d = y(async (s) => {
    const a = await u(`/api/pools/${e}/users`, {
      method: "POST",
      body: JSON.stringify(s)
    });
    return a && i((t) => [...t, a]), a;
  }, [e, u, i]), h = y(async (s, a) => {
    const t = await u(`/api/pools/${e}/users/${s}`, {
      method: "PUT",
      body: JSON.stringify(a)
    });
    return t && i((o) => o.map((m) => m.userId === s ? t : m)), t;
  }, [e, u, i]), p = y(async (s) => {
    await u(`/api/pools/${e}/users/${s}`, { method: "DELETE" }) !== null && i((t) => t.filter((o) => o.userId !== s));
  }, [e, u, i]);
  return { users: n, loading: c, error: r, createUser: d, updateUser: h, deleteUser: p, refresh: f };
}
const x = "auth_id_token", J = "auth_refresh_token", K = "auth_email";
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
function qe() {
  const [e, n] = T({
    status: "loading",
    idToken: null,
    email: null,
    error: null
  }), c = ee(
    () => new te({
      UserPoolId: "",
      ClientId: ""
    }),
    []
  ), r = D(null), i = D(null), f = y(() => {
    r.current && (clearTimeout(r.current), r.current = null), c?.getCurrentUser()?.signOut(), localStorage.removeItem(x), localStorage.removeItem(J), localStorage.removeItem(K), i.current?.postMessage({ type: "SIGNED_OUT" }), n({
      status: "unauthenticated",
      idToken: null,
      email: null,
      error: null
    });
  }, [c]), u = D(() => {
  }), d = y(() => {
    const s = localStorage.getItem(J);
    if (!s) {
      f(), n((o) => ({
        ...o,
        status: "unauthenticated",
        error: "Your session has expired. Please sign in again."
      }));
      return;
    }
    const a = c.getCurrentUser();
    if (!a) {
      f(), n((o) => ({
        ...o,
        status: "unauthenticated",
        error: "Your session has expired. Please sign in again."
      }));
      return;
    }
    const t = new ne({ RefreshToken: s });
    a.refreshSession(t, (o, m) => {
      if (o || !m) {
        f(), n((I) => ({
          ...I,
          status: "unauthenticated",
          error: "Your session has expired. Please sign in again."
        }));
        return;
      }
      const l = m.getIdToken().getJwtToken(), g = m.getRefreshToken().getToken();
      localStorage.setItem(x, l), localStorage.setItem(J, g), n((I) => ({ ...I, idToken: l })), i.current?.postMessage({ type: "TOKEN_REFRESHED", idToken: l }), r.current = q(l, () => u.current());
    });
  }, [c, f]);
  S(() => {
    u.current = d;
  }, [d]), S(() => {
    const s = new BroadcastChannel("auth");
    return i.current = s, s.onmessage = (a) => {
      const t = a.data;
      t.type === "TOKEN_REFRESHED" ? (localStorage.setItem(x, t.idToken), n((o) => ({ ...o, idToken: t.idToken }))) : t.type === "SIGNED_OUT" && (localStorage.removeItem(x), localStorage.removeItem(J), localStorage.removeItem(K), n({ status: "unauthenticated", idToken: null, email: null, error: null }));
    }, () => {
      s.close(), i.current = null;
    };
  }, []), S(() => {
    const s = c.getCurrentUser();
    if (!s) {
      n({
        status: "unauthenticated",
        idToken: null,
        email: null,
        error: null
      });
      return;
    }
    return s.getSession((a, t) => {
      if (a || !t || !t.isValid())
        n({
          status: "unauthenticated",
          idToken: null,
          email: null,
          error: null
        });
      else {
        const o = t.getIdToken().getJwtToken(), m = s.getUsername();
        n({
          status: "authenticated",
          idToken: o,
          email: m,
          error: null
        }), r.current = q(o, d);
      }
    }), () => {
      r.current && (clearTimeout(r.current), r.current = null);
    };
  }, []);
  const h = y(
    (s, a) => new Promise((t) => {
      const o = new re({ Username: s, Pool: c }), m = new se({ Username: s, Password: a });
      o.authenticateUser(m, {
        onSuccess: (l) => {
          const g = l.getIdToken().getJwtToken(), I = l.getRefreshToken().getToken();
          localStorage.setItem(x, g), localStorage.setItem(J, I), localStorage.setItem(K, s), n({
            status: "authenticated",
            idToken: g,
            email: s,
            error: null
          }), r.current = q(g, d), t();
        },
        onFailure: (l) => {
          n((g) => ({
            ...g,
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
    [c, d]
  ), p = y(
    (s, a) => new Promise((t) => {
      const o = [new ae({ Name: "email", Value: s })];
      c.signUp(s, a, o, [], (m) => {
        if (m) {
          n((l) => ({
            ...l,
            status: "unauthenticated",
            error: m.message
          })), t();
          return;
        }
        h(s, a).then(t);
      });
    }),
    [c, h]
  );
  return {
    ...e,
    signIn: h,
    signUp: p,
    signOut: f
  };
}
function Ge(e) {
  const { sendMessage: n, onMessage: c, currentChannel: r, connectionState: i, displayName: f } = e, [u, d] = T([]), h = D(n);
  S(() => {
    h.current = n;
  }, [n]);
  const p = D(r);
  S(() => {
    p.current = r;
  }, [r]);
  const s = D(f);
  S(() => {
    s.current = f;
  }, [f]), S(() => c((o) => {
    if (o.type === "chat" && o.action === "history") {
      if (o.channel !== p.current) return;
      const m = o.messages ?? [];
      d(m.map((l) => ({
        clientId: l.clientId,
        content: l.message,
        timestamp: l.timestamp,
        displayName: l.metadata?.displayName,
        avatarUrl: l.metadata?.avatarUrl
      })));
      return;
    }
    if (o.type === "chat" && o.action === "message") {
      if (o.channel !== p.current) return;
      const m = o.message;
      if (!m) return;
      const l = {
        id: m.id,
        clientId: m.clientId,
        content: m.message,
        timestamp: m.timestamp,
        displayName: m.metadata?.displayName,
        avatarUrl: m.metadata?.avatarUrl
      };
      d((g) => l.id && g.some((I) => I.id === l.id) ? g : [...g, l]);
      return;
    }
  }), [c]), S(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "chat", action: "join", channel: r }), () => {
        h.current({
          service: "chat",
          action: "leave",
          channel: r
        }), d([]);
      };
  }, [r, i]);
  const a = y((t) => {
    h.current({
      service: "chat",
      action: "send",
      channel: p.current,
      message: t,
      metadata: { displayName: s.current }
    });
  }, []);
  return { messages: u, send: a };
}
function He(e, n, c = !0) {
  S(() => {
    if (!c) return;
    const r = (i) => {
      e.current && !e.current.contains(i.target) && n();
    };
    return document.addEventListener("mousedown", r), () => document.removeEventListener("mousedown", r);
  }, [e, n, c]);
}
function X(e) {
  const n = atob(e), c = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++) c[r] = n.charCodeAt(r);
  return c;
}
function ge(e) {
  let n = "";
  for (let c = 0; c < e.length; c++) n += String.fromCharCode(e[c]);
  return btoa(n);
}
function ze(e) {
  const { sendMessage: n, onMessage: c, currentChannel: r, connectionState: i } = e, [f, u] = T(""), [d, h] = T(!1), [p] = T(() => new Y.Doc()), s = D(p), [a] = T(() => p.getText("content")), t = D(a), o = D(n);
  S(() => {
    o.current = n;
  }, [n]);
  const m = D(r);
  S(() => {
    m.current = r;
  }, [r]), S(() => c((M) => {
    if (M.type === "crdt:snapshot") {
      if (M.channel !== m.current) return;
      const v = M.snapshot;
      if (!v) return;
      try {
        const w = X(v);
        W(s.current, w), u(t.current.toString());
      } catch {
      }
      return;
    }
    if (M.type === "crdt:update") {
      if (M.channel !== m.current) return;
      const v = M.update;
      if (!v) return;
      try {
        const w = X(v);
        W(s.current, w), u(t.current.toString());
      } catch {
      }
      return;
    }
  }), [c]), S(() => {
    if (!(i !== "connected" || !r))
      return h(!1), s.current.destroy(), s.current = new Y.Doc(), t.current = s.current.getText("content"), t.current.observe(() => u(t.current.toString())), u(""), s.current.on("afterTransaction", (I) => {
        I.origin !== null && t.current.length > 0 && h(!0);
      }), n({ service: "crdt", action: "subscribe", channel: r }), () => {
        o.current({
          service: "crdt",
          action: "unsubscribe",
          channel: r
        }), u("");
      };
  }, [r, i]);
  const l = y(() => {
    h(!1);
  }, []), g = y((I) => {
    s.current.transact(() => {
      t.current.delete(0, t.current.length), t.current.insert(0, I);
    });
    const M = oe(s.current), v = ge(M);
    o.current({
      service: "crdt",
      action: "update",
      channel: m.current,
      update: v
    });
  }, []);
  return { content: f, applyLocalEdit: g, hasConflict: d, dismissConflict: l };
}
function Ve(e) {
  const { sendMessage: n, onMessage: c, currentChannel: r, connectionState: i, clientId: f, displayName: u } = e, d = D(/* @__PURE__ */ new Map()), [h, p] = T(/* @__PURE__ */ new Map()), [s, a] = T(null), [t, o] = T("freeform"), m = D("freeform"), l = D(null), g = D(r);
  S(() => {
    g.current = r;
  }, [r]);
  const I = D(i);
  S(() => {
    I.current = i;
  }, [i]);
  const M = D(f);
  S(() => {
    M.current = f;
  }, [f]);
  const v = D(u);
  S(() => {
    v.current = u;
  }, [u]), S(() => c(($) => {
    if ($.type !== "cursor") return;
    const E = $.action;
    if (E === "subscribed") {
      const b = $.cursors ?? [], C = /* @__PURE__ */ new Map();
      for (const L of b)
        L.clientId !== M.current && C.set(L.clientId, L);
      d.current = C, p(new Map(C));
      return;
    }
    if (E === "update") {
      const b = $.cursor;
      if (!b || b.clientId === M.current) return;
      d.current.set(b.clientId, b), p(new Map(d.current));
      return;
    }
    if (E === "remove") {
      const b = $.clientId;
      if (!b) return;
      d.current.delete(b), p(new Map(d.current));
    }
  }), [c]), S(() => {
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
        }), d.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), l.current !== null && (clearTimeout(l.current), l.current = null);
      };
  }, [r, i, t, n]);
  const w = y(
    (O, $) => {
      if (I.current !== "connected" || l.current !== null) return;
      const E = { x: O, y: $ }, b = { mode: "freeform", displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: g.current,
        position: E,
        metadata: b
      }), a({
        clientId: M.current ?? "local",
        position: E,
        metadata: b
      }), l.current = setTimeout(() => {
        l.current = null;
      }, 50);
    },
    [n]
  ), R = y(
    (O, $) => {
      if (I.current !== "connected") return;
      const E = { row: O, col: $ }, b = { mode: "table", displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: g.current,
        position: E,
        metadata: b
      }), a({
        clientId: M.current ?? "local",
        position: E,
        metadata: b
      });
    },
    [n]
  ), P = y(
    (O, $, E) => {
      if (I.current !== "connected") return;
      const b = { position: O }, C = { mode: "text", selection: $, hasSelection: E, displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: g.current,
        position: b,
        metadata: C
      }), a({
        clientId: M.current ?? "local",
        position: b,
        metadata: C
      });
    },
    [n]
  ), N = y(
    (O, $, E, b, C) => {
      if (I.current !== "connected" || !g.current) return;
      const L = { x: O, y: $ }, V = { mode: "canvas", tool: E, color: b, size: C, displayName: v.current };
      n({
        service: "cursor",
        action: "update",
        channel: g.current,
        position: L,
        metadata: V
      }), a({
        clientId: M.current ?? "local",
        position: L,
        metadata: V
      });
    },
    [n]
  ), A = y(
    (O) => {
      I.current === "connected" && g.current && n({
        service: "cursor",
        action: "unsubscribe",
        channel: g.current
      }), d.current = /* @__PURE__ */ new Map(), p(/* @__PURE__ */ new Map()), a(null), m.current = O, o(O);
    },
    [n]
  );
  return {
    cursors: h,
    localCursor: s,
    activeMode: t,
    sendFreeformUpdate: w,
    sendTableUpdate: R,
    sendTextUpdate: P,
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
    const c = n.filter(ce);
    return c.length !== n.length && localStorage.setItem(z, JSON.stringify(c)), c;
  } catch {
    return [];
  }
}
function G(e) {
  localStorage.setItem(z, JSON.stringify(e));
}
function Q(e) {
  const n = ie(e.baseType);
  ue({
    type: e.id,
    label: e.name,
    icon: e.icon,
    description: e.description,
    rendererType: e.baseType,
    rendererKeys: n?.rendererKeys ?? {},
    rendererLabels: n?.rendererLabels ?? {}
  });
}
function Ye() {
  const [e, n] = T(() => F()), c = y(
    (f) => {
      const u = (/* @__PURE__ */ new Date()).toISOString(), d = {
        ...f,
        id: crypto.randomUUID(),
        createdAt: u,
        updatedAt: u
      }, p = [...F(), d];
      return G(p), n(p), Q(d), d;
    },
    []
  ), r = y(
    (f, u) => {
      const d = (/* @__PURE__ */ new Date()).toISOString(), p = F().map(
        (a) => a.id === f ? { ...a, ...u, updatedAt: d } : a
      );
      G(p), n(p);
      const s = p.find((a) => a.id === f);
      s && Q(s);
    },
    []
  ), i = y((f) => {
    const d = F().filter((h) => h.id !== f);
    G(d), n(d);
  }, []);
  return { types: e, createType: c, updateType: r, deleteType: i };
}
const Te = 15e3, we = 1e4;
function H(e) {
  return [...e].sort(
    (n, c) => new Date(c.updatedAt).getTime() - new Date(n.updatedAt).getTime()
  );
}
function We(e) {
  const { sendMessage: n, onMessage: c, connectionState: r } = e, [i, f] = T([]), [u, d] = T({}), [h, p] = T(!0), s = D(null), a = D(null), t = D(!1), o = D(n);
  S(() => {
    o.current = n;
  }, [n]), S(() => c((w) => {
    if (w.type === "documents:presence") {
      t.current = !0;
      const R = w.documents;
      if (R) {
        const P = {};
        for (const N of R) {
          const A = N.documentId.startsWith("doc:") ? N.documentId.slice(4) : N.documentId;
          P[A] = N.users;
        }
        d(P);
      }
      return;
    }
    if (w.type === "crdt") {
      if (w.action === "documentList") {
        const R = w.documents ?? [];
        f(H(R)), p(!1);
        return;
      }
      if (w.action === "documentCreated") {
        const R = w.document;
        R && f((P) => H([R, ...P]));
        return;
      }
      if (w.action === "documentDeleted") {
        const R = w.documentId;
        R && f((P) => P.filter((N) => N.id !== R));
        return;
      }
      if (w.action === "documentMetaUpdated") {
        const R = w.documentId, P = w.meta;
        R && P && f(
          (N) => H(
            N.map((A) => A.id === R ? { ...A, ...P } : A)
          )
        );
        return;
      }
      if (w.action === "documentPresence") {
        const R = w.presence;
        if (R) {
          const P = {};
          for (const [N, A] of Object.entries(R)) {
            const O = N.startsWith("doc:") ? N.slice(4) : N;
            P[O] = A;
          }
          d(P);
        }
      }
    }
  }), [c]), S(() => {
    if (r !== "connected") return;
    t.current = !1;
    const v = setTimeout(() => {
      o.current({ service: "crdt", action: "listDocuments" }), o.current({ service: "crdt", action: "getDocumentPresence" });
    }, 100), w = () => clearTimeout(v);
    return a.current = setTimeout(() => {
      t.current || (s.current = setInterval(() => {
        o.current({ service: "crdt", action: "getDocumentPresence" });
      }, we));
    }, Te), () => {
      w(), a.current !== null && (clearTimeout(a.current), a.current = null), s.current !== null && (clearInterval(s.current), s.current = null), f([]), d({}), p(!0);
    };
  }, [r]);
  const m = y(
    (v) => {
      o.current({ service: "crdt", action: "createDocument", meta: v });
    },
    []
  ), l = y((v) => {
    o.current({ service: "crdt", action: "deleteDocument", documentId: v });
  }, []), g = y(
    (v, w) => {
      o.current({
        service: "crdt",
        action: "updateDocumentMeta",
        documentId: v,
        meta: w
      });
    },
    []
  ), I = y(() => {
    o.current({ service: "crdt", action: "listDocuments" });
  }, []), M = y(() => {
    o.current({ service: "crdt", action: "getDocumentPresence" });
  }, []);
  return {
    documents: i,
    presence: u,
    loading: h,
    createDocument: m,
    deleteDocument: l,
    updateDocumentMeta: g,
    refreshDocuments: I,
    refreshPresence: M
  };
}
function Se(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName.toLowerCase();
  return !!(n === "input" || n === "textarea" || e.isContentEditable);
}
function Xe(e) {
  S(() => {
    const n = (c) => {
      if (!Se(c.target))
        for (const r of e) {
          const i = r.meta ? c.metaKey || c.ctrlKey : !0, f = r.shift ? c.shiftKey : !0, u = r.alt ? c.altKey : !0, d = c.key.toLowerCase() === r.key.toLowerCase();
          if (i && f && u && d) {
            r.preventDefault !== !1 && c.preventDefault(), r.handler(c);
            return;
          }
        }
    };
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [e]);
}
const ve = 3e4;
function Qe(e) {
  const { sendMessage: n, onMessage: c, currentChannel: r, connectionState: i, displayName: f } = e, [u, d] = T(/* @__PURE__ */ new Map()), h = D(null), p = D(null), s = D(n);
  S(() => {
    s.current = n;
  }, [n]);
  const a = D(r);
  S(() => {
    a.current = r;
  }, [r]);
  const t = D(f);
  S(() => {
    t.current = f;
  }, [f]), S(() => c((g) => {
    if (g.type === "presence") {
      if (g.action === "subscribed") {
        const I = g.presence ?? g.users ?? [], M = /* @__PURE__ */ new Map();
        for (const v of I)
          M.set(v.clientId, v);
        d(M);
        return;
      }
      if (g.action === "update") {
        const I = g.presence, M = I?.clientId ?? g.clientId;
        if (!M) return;
        const v = I?.status ?? "online", w = I?.metadata ?? {};
        d((R) => {
          const P = new Map(R);
          return P.set(M, { clientId: M, status: v, metadata: w }), P;
        });
        return;
      }
      if (g.action === "offline") {
        const I = g.clientId;
        d((M) => {
          const v = new Map(M);
          return v.delete(I), v;
        });
      }
    }
  }), [c]), S(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "presence", action: "subscribe", channel: r }), n({
        service: "presence",
        action: "set",
        status: "online",
        metadata: { displayName: t.current },
        channels: [r]
      }), h.current = setInterval(() => {
        s.current({
          service: "presence",
          action: "heartbeat",
          metadata: { displayName: t.current, isTyping: !1 },
          channels: [a.current]
        });
      }, ve), () => {
        h.current !== null && (clearInterval(h.current), h.current = null), s.current({
          service: "presence",
          action: "unsubscribe",
          channel: r
        }), d(/* @__PURE__ */ new Map());
      };
  }, [r, i]);
  const o = y(
    (l) => {
      s.current({
        service: "presence",
        action: "set",
        status: l ? "typing" : "online",
        metadata: { displayName: t.current, isTyping: l },
        channels: [a.current]
      }), l ? (p.current !== null && clearTimeout(p.current), p.current = setTimeout(() => {
        s.current({
          service: "presence",
          action: "set",
          status: "online",
          metadata: { displayName: t.current, isTyping: !1 },
          channels: [a.current]
        }), p.current = null;
      }, 2e3)) : p.current !== null && (clearTimeout(p.current), p.current = null);
    },
    []
    // All deps are accessed via refs — stable callback that never causes re-renders
  );
  return { users: Array.from(u.values()), setTyping: o };
}
function Ze(e) {
  const { sendMessage: n, onMessage: c, currentChannel: r, connectionState: i } = e, [f, u] = T([]), d = D(n);
  S(() => {
    d.current = n;
  }, [n]);
  const h = D(r);
  S(() => {
    h.current = r;
  }, [r]), S(() => c((a) => {
    if (a.type === "reaction" && a.action === "reaction_received") {
      const t = a.data;
      if (t?.channel !== h.current) return;
      const o = {
        id: `${Date.now()}-${Math.random()}`,
        emoji: t?.emoji,
        x: Math.floor(Math.random() * 81) + 10,
        // 10-90
        y: Math.floor(Math.random() * 81) + 10,
        // 10-90
        timestamp: t?.timestamp
      };
      u((m) => [...m, o]), setTimeout(() => {
        u((m) => m.filter((l) => l.id !== o.id));
      }, 2500);
    }
  }), [c]), S(() => {
    if (!(i !== "connected" || !r))
      return n({ service: "reaction", action: "subscribe", channel: r }), () => {
        d.current({
          service: "reaction",
          action: "unsubscribe",
          channel: r
        }), u([]);
      };
  }, [r, i]);
  const p = y((s) => {
    d.current({
      service: "reaction",
      action: "send",
      channel: h.current,
      emoji: s
    });
  }, []);
  return { activeReactions: f, react: p };
}
function et({ idToken: e, onMessage: n }) {
  const [c, r] = T([]), [i, f] = T(null), [u, d] = T([]), [h, p] = T(!1), [s, a] = T(null), [t, o] = T(0), { toast: m } = le(), l = "", g = y(() => o(($) => $ + 1), []), I = D(n);
  S(() => {
    I.current = n;
  }, [n]);
  const M = D(null);
  S(() => {
  }, [e, l, t, m]), S(() => I.current((E) => {
    const b = E.payload ?? E;
    E.type === "social:member_joined" && b.roomId === M.current ? d((C) => [
      ...C,
      {
        roomId: b.roomId,
        userId: b.userId,
        displayName: b.displayName,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]) : E.type === "social:member_left" && b.roomId === M.current && d((C) => C.filter((L) => L.userId !== b.userId));
  }), []);
  const v = y(async ($) => {
    if (e)
      try {
        const E = await fetch(`${l}/api/rooms/${$}/members`, {
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to load members (${E.status})`);
        const b = await E.json();
        d(b.members ?? []);
      } catch (E) {
        a(E.message);
      }
  }, [e, l]), w = y(($) => {
    M.current = $?.roomId ?? null, f($), $ && v($.roomId);
  }, [v]), R = y(async ($) => {
    {
      a("Social API not configured");
      return;
    }
  }, [e, l]), P = y(async ($) => {
    if (e) {
      p(!0), a(null);
      try {
        const E = await fetch(`${l}/api/rooms/dm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          },
          body: JSON.stringify({ peerId: $ })
        });
        if (!E.ok) throw new Error(`Failed to create DM (${E.status})`);
        const b = await E.json();
        r((C) => [b, ...C]);
      } catch (E) {
        throw a(E.message), E;
      } finally {
        p(!1);
      }
    }
  }, [e, l]), N = y(async ($) => {
    if (e) {
      a(null);
      try {
        const E = await fetch(`${l}/api/rooms/${$}/join`, {
          method: "POST",
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to join room (${E.status})`);
      } catch (E) {
        a(E.message);
      }
    }
  }, [e, l]), A = y(async ($) => {
    if (e) {
      a(null);
      try {
        const E = await fetch(`${l}/api/rooms/${$}/leave`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${e}` }
        });
        if (!E.ok) throw new Error(`Failed to leave room (${E.status})`);
        r((b) => b.filter((C) => C.roomId !== $));
      } catch (E) {
        a(E.message);
      }
    }
  }, [e, l]), O = y(async ($, E) => {
    if (e) {
      p(!0), a(null);
      try {
        const b = await fetch(`${l}/api/groups/${$}/rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          },
          body: JSON.stringify({ name: E })
        });
        if (!b.ok) throw new Error(`Failed to create group room (${b.status})`);
        const C = await b.json();
        r((L) => [C, ...L]);
      } catch (b) {
        throw a(b.message), b;
      } finally {
        p(!1);
      }
    }
  }, [e, l]);
  return {
    rooms: c,
    activeRoom: i,
    setActiveRoom: w,
    createRoom: R,
    createDM: P,
    createGroupRoom: O,
    joinRoom: N,
    leaveRoom: A,
    loadMembers: v,
    members: u,
    loading: h,
    error: s,
    retry: g
  };
}
function Z() {
  return "";
}
function tt({ idToken: e, typeId: n }) {
  const [c, r] = T([]), [i, f] = T(!1), [u, d] = T(null), [h, p] = T(0);
  S(() => {
    if (!e || !n) {
      r([]);
      return;
    }
    let t = !1;
    return f(!0), d(null), fetch(`${Z()}/api/typed-documents?typeId=${encodeURIComponent(n)}`, {
      headers: { Authorization: `Bearer ${e}` }
    }).then(async (o) => {
      if (!o.ok) throw new Error(`Failed to load documents (${o.status})`);
      return o.json();
    }).then((o) => {
      t || r(o.items ?? []);
    }).catch((o) => {
      t || d(o.message);
    }).finally(() => {
      t || f(!1);
    }), () => {
      t = !0;
    };
  }, [e, n, h]);
  const s = y(
    async (t) => {
      if (!e || !n) throw new Error("not ready: missing idToken or typeId");
      const o = await fetch(`${Z()}/api/typed-documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        },
        body: JSON.stringify({ typeId: n, values: t })
      });
      if (!o.ok) {
        const l = await o.text();
        throw new Error(`Create failed (${o.status}): ${l}`);
      }
      const m = await o.json();
      return r((l) => [m, ...l]), m;
    },
    [e, n]
  ), a = y(() => {
    p((t) => t + 1);
  }, []);
  return { documents: c, loading: i, error: u, createDocument: s, refresh: a };
}
function nt(e) {
  const [n, c] = de(), r = ee(() => {
    const u = { ...e };
    for (const d in e) {
      const h = n.get(d);
      h !== null && (u[d] = h);
    }
    return u;
  }, [n, e]), i = y(
    (u, d) => {
      c((h) => {
        const p = new URLSearchParams(h);
        return d === void 0 || d === e[u] ? p.delete(String(u)) : p.set(String(u), d), p;
      });
    },
    [c, e]
  ), f = y(() => {
    c({});
  }, [c]);
  return { filters: r, setFilter: i, clearFilters: f };
}
export {
  et as A,
  he as B,
  tt as C,
  nt as D,
  U as a,
  Oe as b,
  Ce as c,
  qe as d,
  ze as e,
  Ge as f,
  He as g,
  Ve as h,
  Ye as i,
  We as j,
  Ue as k,
  Ae as l,
  Le as m,
  _e as n,
  ke as o,
  xe as p,
  Je as q,
  Fe as r,
  je as s,
  _ as t,
  Pe as u,
  Be as v,
  Ke as w,
  Xe as x,
  Qe as y,
  Ze as z
};
