import { jsxs as l, jsx as n } from "react/jsx-runtime";
import { useState as v, useRef as x, useEffect as p } from "react";
import { A as F } from "./Avatar-BvKIaNVE.js";
import { c as u } from "./cn-B6yFEsav.js";
const y = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
  "#FF9F43",
  "#1DD1A1",
  "#F368E0",
  "#3742FA",
  "#2F3542",
  "#FF3838"
];
function C(e) {
  let r = 0;
  for (let t = 0; t < e.length; t++)
    r = e.charCodeAt(t) + ((r << 5) - r);
  return y[Math.abs(r) % y.length];
}
function T(e) {
  if (!e) return "?";
  const r = e.trim().split(/\s+/);
  if (r.length >= 2) {
    const t = r[0][0] ?? "", i = r[r.length - 1][0] ?? "";
    return (t + i).toUpperCase();
  }
  return e.slice(0, 2).toUpperCase();
}
function w(e) {
  try {
    const r = new Date(e), t = r.getHours().toString().padStart(2, "0"), i = r.getMinutes().toString().padStart(2, "0");
    return `${t}:${i}`;
  } catch {
    return "";
  }
}
function D(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing...`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
  const r = e.length - 2;
  return `${e[0]}, ${e[1]} and ${r} other${r > 1 ? "s" : ""} are typing...`;
}
function S({ messages: e, onSend: r, disabled: t = !1, onTyping: i, typingUsers: m = [] }) {
  const [o, d] = v(""), s = x(null), c = x(null);
  p(() => {
    s.current && (s.current.scrollTop = s.current.scrollHeight);
  }, [e.length]), p(() => () => {
    c.current && clearTimeout(c.current);
  }, []);
  function f() {
    const a = o.trim();
    !a || t || (c.current && clearTimeout(c.current), c.current = null, i?.(!1), r(a), d(""));
  }
  function g(a) {
    t || (i?.(!0), c.current && clearTimeout(c.current), c.current = setTimeout(() => i?.(!1), 2e3)), a.key === "Enter" && !t && o.trim() && f();
  }
  return /* @__PURE__ */ l("div", { className: "border border-border rounded p-3 mt-4 font-mono", children: [
    /* @__PURE__ */ l("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Chat (",
      e.length,
      ")"
    ] }),
    m.length > 0 && /* @__PURE__ */ n("div", { className: "text-[0.7rem] text-text-tertiary italic mb-1", children: D(m) }),
    /* @__PURE__ */ n(
      "div",
      {
        ref: s,
        className: "max-h-[200px] overflow-y-auto mb-2",
        children: e.length === 0 ? /* @__PURE__ */ n("div", { className: "text-text-tertiary text-xs", children: "No messages yet" }) : e.map((a, N) => {
          const h = a.displayName ?? a.clientId.slice(0, 8), b = w(a.timestamp);
          return /* @__PURE__ */ l(
            "div",
            {
              className: "flex items-start gap-1.5 py-0.5",
              children: [
                /* @__PURE__ */ n(
                  F,
                  {
                    name: h,
                    src: a.avatarUrl,
                    size: 20,
                    className: "mt-0.5"
                  }
                ),
                /* @__PURE__ */ l("div", { className: "flex items-baseline gap-1.5 grow flex-wrap min-w-0", children: [
                  /* @__PURE__ */ n("span", { className: "text-[0.7rem] text-text-secondary shrink-0", children: h }),
                  /* @__PURE__ */ n("span", { className: "text-[0.8rem] text-text-primary grow", children: a.content }),
                  /* @__PURE__ */ n("span", { className: "text-[0.65rem] text-text-tertiary shrink-0", children: b })
                ] })
              ]
            },
            N
          );
        })
      }
    ),
    /* @__PURE__ */ l("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ n(
        "input",
        {
          type: "text",
          value: o,
          onChange: (a) => d(a.target.value),
          onKeyDown: g,
          disabled: t,
          placeholder: t ? "Not connected" : "Type a message...",
          className: u(
            "flex-1 text-[0.8rem] px-2 py-1 border border-border-field rounded font-mono text-text-primary",
            t ? "bg-surface-inset" : "bg-surface"
          )
        }
      ),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: f,
          disabled: t || !o.trim(),
          className: u(
            "text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono",
            t || !o.trim() ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-[#007bff] text-white cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
function k({ users: e, currentClientId: r }) {
  return /* @__PURE__ */ l("div", { className: "border border-border rounded p-3 font-mono", children: [
    /* @__PURE__ */ l("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Users in channel (",
      e.length,
      ")"
    ] }),
    e.length === 0 ? /* @__PURE__ */ n("div", { className: "text-text-tertiary text-xs", children: "No other users connected" }) : /* @__PURE__ */ n("div", { children: e.map((t) => {
      const i = C(
        t.metadata.email ?? t.clientId
      ), m = T(
        t.metadata.displayName ?? t.clientId.slice(0, 2)
      ), o = t.metadata.isTyping === !0, d = t.clientId === r, s = t.metadata.displayName ?? (t.clientId.length > 12 ? t.clientId.slice(0, 12) + "..." : t.clientId);
      return /* @__PURE__ */ l(
        "div",
        {
          className: "flex items-center gap-2 py-1 text-xs",
          children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
                style: { backgroundColor: i },
                children: m
              }
            ),
            /* @__PURE__ */ n("span", { className: "text-text-primary", children: s }),
            d && /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "(you)" }),
            o && /* @__PURE__ */ n("span", { className: "text-text-tertiary italic", children: "typing..." })
          ]
        },
        t.clientId
      );
    }) })
  ] });
}
export {
  S as C,
  k as P,
  T as a,
  C as i
};
