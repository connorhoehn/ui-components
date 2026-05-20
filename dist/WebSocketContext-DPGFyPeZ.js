import { jsx as r } from "react/jsx-runtime";
import { createContext as n, useContext as c } from "react";
const t = n(null);
function s({
  value: e,
  children: o
}) {
  return /* @__PURE__ */ r(t.Provider, { value: e, children: o });
}
function x() {
  const e = c(t);
  if (!e)
    throw new Error("useWebSocketContext must be used within a <WebSocketProvider>");
  return e;
}
export {
  s as W,
  x as u
};
