import { jsxs as s, jsx as n } from "react/jsx-runtime";
import { useState as v, useRef as h, useEffect as u } from "react";
import { A as b } from "./Avatar-B7O2g50s.js";
import { c as p } from "./cn-B6yFEsav.js";
import { I as w } from "./Input-Dt0yAs9r.js";
function F(t) {
  try {
    const r = new Date(t);
    if (isNaN(r.getTime())) return "";
    const e = r.getHours().toString().padStart(2, "0"), i = r.getMinutes().toString().padStart(2, "0");
    return `${e}:${i}`;
  } catch {
    return "";
  }
}
function C({
  author: t,
  content: r,
  timestamp: e,
  avatarUrl: i,
  hideAvatar: m = !1,
  hideAuthor: c = !1,
  mine: d = !1,
  footer: o,
  className: l
}) {
  const f = F(e);
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "message-row",
      "data-mine": d ? "true" : "false",
      className: p("flex items-start gap-1.5 py-0.5", l),
      children: [
        /* @__PURE__ */ n("div", { className: "w-5 shrink-0 mt-0.5", children: !m && /* @__PURE__ */ n(b, { name: t, src: i, size: 20 }) }),
        /* @__PURE__ */ s("div", { className: "flex items-baseline gap-1.5 grow flex-wrap min-w-0", children: [
          !c && /* @__PURE__ */ n(
            "span",
            {
              "data-testid": "message-row-author",
              className: "text-[0.7rem] text-text-secondary shrink-0",
              children: t
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              "data-testid": "message-row-content",
              className: "text-[0.8rem] text-text-primary grow",
              children: r
            }
          ),
          f && /* @__PURE__ */ n(
            "span",
            {
              "data-testid": "message-row-time",
              className: "text-[0.65rem] text-text-tertiary shrink-0",
              children: f
            }
          ),
          o && /* @__PURE__ */ n("div", { "data-testid": "message-row-footer", className: "basis-full mt-1", children: o })
        ] })
      ]
    }
  );
}
function T(t) {
  if (t.length === 0) return "";
  if (t.length === 1) return `${t[0]} is typing...`;
  if (t.length === 2) return `${t[0]} and ${t[1]} are typing...`;
  const r = t.length - 2;
  return `${t[0]}, ${t[1]} and ${r} other${r > 1 ? "s" : ""} are typing...`;
}
function B({ messages: t, onSend: r, disabled: e = !1, onTyping: i, typingUsers: m = [] }) {
  const [c, d] = v(""), o = h(null), l = h(null);
  u(() => {
    o.current && (o.current.scrollTop = o.current.scrollHeight);
  }, [t.length]), u(() => () => {
    l.current && clearTimeout(l.current);
  }, []);
  function f() {
    const a = c.trim();
    !a || e || (l.current && clearTimeout(l.current), l.current = null, i?.(!1), r(a), d(""));
  }
  function g(a) {
    e || (i?.(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => i?.(!1), 2e3)), a.key === "Enter" && !e && c.trim() && f();
  }
  return /* @__PURE__ */ s("div", { className: "border border-border rounded p-3 mt-4 font-mono", children: [
    /* @__PURE__ */ s("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Chat (",
      t.length,
      ")"
    ] }),
    m.length > 0 && /* @__PURE__ */ n("div", { className: "text-[0.7rem] text-text-tertiary italic mb-1", children: T(m) }),
    /* @__PURE__ */ n(
      "div",
      {
        ref: o,
        className: "max-h-[200px] overflow-y-auto mb-2",
        children: t.length === 0 ? /* @__PURE__ */ n("div", { className: "text-text-tertiary text-xs", children: "No messages yet" }) : t.map((a, y) => {
          const N = a.displayName ?? a.clientId.slice(0, 8);
          return /* @__PURE__ */ n(
            C,
            {
              author: N,
              content: a.content,
              timestamp: a.timestamp,
              avatarUrl: a.avatarUrl
            },
            y
          );
        })
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ n(
        w,
        {
          size: "sm",
          mono: !0,
          value: c,
          onChange: (a) => d(a.target.value),
          onKeyDown: g,
          disabled: e,
          placeholder: e ? "Not connected" : "Type a message...",
          className: "flex-1 text-[0.8rem]"
        }
      ),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: f,
          disabled: e || !c.trim(),
          className: p(
            "text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono",
            e || !c.trim() ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-[#007bff] text-white cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
const x = [
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
function I(t) {
  let r = 0;
  for (let e = 0; e < t.length; e++)
    r = t.charCodeAt(e) + ((r << 5) - r);
  return x[Math.abs(r) % x.length];
}
function D(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  if (r.length >= 2) {
    const e = r[0][0] ?? "", i = r[r.length - 1][0] ?? "";
    return (e + i).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}
function P({ users: t, currentClientId: r }) {
  return /* @__PURE__ */ s("div", { className: "border border-border rounded p-3 font-mono", children: [
    /* @__PURE__ */ s("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Users in channel (",
      t.length,
      ")"
    ] }),
    t.length === 0 ? /* @__PURE__ */ n("div", { className: "text-text-tertiary text-xs", children: "No other users connected" }) : /* @__PURE__ */ n("div", { children: t.map((e) => {
      const i = I(
        e.metadata.email ?? e.clientId
      ), m = D(
        e.metadata.displayName ?? e.clientId.slice(0, 2)
      ), c = e.metadata.isTyping === !0, d = e.clientId === r, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
      return /* @__PURE__ */ s(
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
            /* @__PURE__ */ n("span", { className: "text-text-primary", children: o }),
            d && /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "(you)" }),
            c && /* @__PURE__ */ n("span", { className: "text-text-tertiary italic", children: "typing..." })
          ]
        },
        e.clientId
      );
    }) })
  ] });
}
export {
  B as C,
  C as M,
  P,
  D as a,
  F as f,
  I as i
};
