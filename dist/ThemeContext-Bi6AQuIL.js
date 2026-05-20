import { jsx as s } from "react/jsx-runtime";
import { createContext as a, useState as h, useEffect as l, useCallback as u, useContext as g } from "react";
const r = a({ theme: "light", toggleTheme: () => {
} }), o = "wsg-theme";
function f({ children: c }) {
  const [t, m] = h(() => {
    try {
      const e = localStorage.getItem(o);
      if (e === "dark" || e === "light") return e;
    } catch {
    }
    return "light";
  });
  l(() => {
    try {
      localStorage.setItem(o, t);
    } catch {
    }
    document.documentElement.setAttribute("data-theme", t);
  }, [t]);
  const n = u(() => {
    m((e) => e === "light" ? "dark" : "light");
  }, []);
  return /* @__PURE__ */ s(r.Provider, { value: { theme: t, toggleTheme: n }, children: c });
}
function C() {
  return g(r);
}
export {
  f as C,
  C as u
};
