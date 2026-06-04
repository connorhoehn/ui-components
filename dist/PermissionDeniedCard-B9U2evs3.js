import { jsx as r, jsxs as n } from "react/jsx-runtime";
import { c } from "./cn-B6yFEsav.js";
import { B as p } from "./Button-Qsbxqsl9.js";
const u = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function f({
  size: e = "md",
  color: i,
  className: o,
  style: a,
  "aria-label": s = "Loading",
  "data-testid": d
}) {
  const l = i ?? "var(--color-primary)";
  return /* @__PURE__ */ r(
    "div",
    {
      role: "status",
      "aria-label": s,
      "data-testid": d,
      className: c(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        u[e],
        o
      ),
      style: { borderTopColor: l, ...a }
    }
  );
}
const t = {
  camera: "Camera",
  microphone: "Microphone",
  screen: "Screen sharing"
}, x = {
  denied: (e) => `${t[e]} access blocked`,
  blocked: (e) => `${t[e]} is in use`,
  "no-device": (e) => e === "screen" ? "Screen sharing not supported" : `No ${e} detected`,
  unavailable: (e) => `${t[e]} unavailable`
}, m = {
  denied: (e) => `${t[e]} access was blocked. Click the icon in your browser's address bar to allow it.`,
  blocked: (e) => `${t[e]} is being used by another application. Close other tabs or apps using it and try again.`,
  "no-device": (e) => `No ${e === "screen" ? "screen sharing capability" : e} was found on this device.`,
  unavailable: () => "This browser doesn't support the requested device access."
};
function b({ kind: e }) {
  return e === "camera" ? /* @__PURE__ */ n("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ r("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ r("path", { d: "m22 8-6 4 6 4V8Z" }),
    /* @__PURE__ */ r("path", { d: "M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" }),
    /* @__PURE__ */ r("path", { d: "M2 6.5v9a2 2 0 0 0 2 2h7" })
  ] }) : e === "microphone" ? /* @__PURE__ */ n("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ r("line", { x1: "2", y1: "2", x2: "22", y2: "22" }),
    /* @__PURE__ */ r("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
    /* @__PURE__ */ r("path", { d: "M15 9.34V5a3 3 0 0 0-5.94-.6" }),
    /* @__PURE__ */ r("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "19", x2: "12", y2: "22" })
  ] }) : /* @__PURE__ */ n("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": !0, children: [
    /* @__PURE__ */ r("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
    /* @__PURE__ */ r("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "17", x2: "12", y2: "21" }),
    /* @__PURE__ */ r("line", { x1: "3", y1: "9", x2: "21", y2: "9" })
  ] });
}
function w({
  kind: e,
  state: i,
  message: o,
  onRetry: a,
  retryLabel: s = "Try again",
  icon: d,
  className: l,
  "data-testid": h
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-testid": h,
      "data-permission-kind": e,
      "data-permission-state": i,
      className: c(
        "flex flex-col items-center text-center gap-3 p-6 max-w-sm",
        l
      ),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ r("div", { className: "h-10 w-10 rounded-full bg-amber-100 text-amber-700 grid place-items-center", children: d ?? /* @__PURE__ */ r(b, { kind: e }) }),
        /* @__PURE__ */ r("div", { className: "text-base font-semibold text-slate-900", children: x[i](e) }),
        /* @__PURE__ */ r("p", { className: "text-xs text-slate-600", children: o ?? m[i](e) }),
        a && /* @__PURE__ */ r(p, { variant: "ghost", size: "sm", onClick: a, children: s })
      ]
    }
  );
}
export {
  w as P,
  f as S
};
