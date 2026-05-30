import { jsx as C } from "react/jsx-runtime";
import { createContext as I, useRef as p, useCallback as u, useMemo as A, useEffect as w, useContext as T } from "react";
const y = I(null), g = 2048;
function P(n) {
  const e = n.payload, a = e && typeof e.runId == "string" ? e.runId : "<no-run>", d = e && typeof e.stepId == "string" ? e.stepId : "<run>";
  return `${a}:${d}:${n.seq}`;
}
function R({
  children: n
}) {
  const e = p(/* @__PURE__ */ new Map()), a = p(/* @__PURE__ */ new Set()), d = p(0), v = u(
    (r, s) => {
      const t = r;
      let o = e.current.get(t);
      o || (o = /* @__PURE__ */ new Set(), e.current.set(t, o));
      const i = s;
      return o.add(i), () => {
        const c = e.current.get(t);
        c && (c.delete(i), c.size === 0 && e.current.delete(t));
      };
    },
    []
  ), l = u(
    (r, s) => {
      const t = e.current.get(r);
      if (t)
        for (const i of Array.from(t))
          try {
            i(s);
          } catch (c) {
            console.error("[EventStream] handler threw", r, c);
          }
      const o = e.current.get("*");
      if (o) {
        const i = { eventType: r, payload: s };
        for (const c of Array.from(o))
          try {
            c(i);
          } catch (x) {
            console.error("[EventStream] wildcard handler threw", r, x);
          }
      }
    },
    []
  ), f = u(
    (r) => {
      const s = P(r), t = a.current;
      if (!t.has(s)) {
        if (t.add(s), t.size > g) {
          const o = t.values().next().value;
          o !== void 0 && t.delete(o);
        }
        l(r.eventType, r.payload);
      }
    },
    [l]
  ), m = u(
    (r, s) => {
      const t = {
        eventType: r,
        payload: s,
        seq: d.current++,
        sourceNodeId: "local",
        emittedAt: Date.now()
      };
      f(t);
    },
    [f]
  ), b = u((r) => () => {
  }, []), E = u(() => () => {
  }, []), h = u(() => () => {
  }, []), S = A(
    () => ({
      subscribe: v,
      dispatch: m,
      dispatchEnvelope: f,
      subscribeToRun: b,
      subscribeToAll: E,
      subscribeToApprovals: h
    }),
    [
      v,
      m,
      f,
      b,
      E,
      h
    ]
  );
  return /* @__PURE__ */ C(y.Provider, { value: S, children: n });
}
function k() {
  const n = T(y);
  if (!n)
    throw new Error(
      "useEventStreamContext must be used within an EventStreamProvider"
    );
  return n;
}
function $(n, e) {
  const { subscribe: a } = k(), d = p(e);
  w(() => {
    d.current = e;
  }, [e]), w(() => a(n, (l) => d.current(l)), [a, n]);
}
export {
  R as E,
  $ as a,
  k as u
};
