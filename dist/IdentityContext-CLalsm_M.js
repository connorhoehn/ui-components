import { jsx as r } from "react/jsx-runtime";
import { createContext as o, useContext as i } from "react";
const e = o(null);
function d({
  value: t,
  children: n
}) {
  return /* @__PURE__ */ r(e.Provider, { value: t, children: n });
}
function x() {
  const t = i(e);
  if (!t)
    throw new Error("useIdentityContext must be used within an <IdentityProvider>");
  return t;
}
export {
  d as I,
  x as u
};
