import { jsxs as o, jsx as r } from "react/jsx-runtime";
import { useState as F, useRef as f, useEffect as x } from "react";
import { c as u } from "./cn-B6yFEsav.js";
function v(e) {
  try {
    const n = new Date(e), t = n.getHours().toString().padStart(2, "0"), a = n.getMinutes().toString().padStart(2, "0");
    return `${t}:${a}`;
  } catch {
    return "";
  }
}
function C(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing...`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
  const n = e.length - 2;
  return `${e[0]}, ${e[1]} and ${n} other${n > 1 ? "s" : ""} are typing...`;
}
function E({ messages: e, onSend: n, disabled: t = !1, onTyping: a, typingUsers: d = [] }) {
  const [l, m] = F(""), s = f(null), c = f(null);
  x(() => {
    s.current && (s.current.scrollTop = s.current.scrollHeight);
  }, [e.length]), x(() => () => {
    c.current && clearTimeout(c.current);
  }, []);
  function h() {
    const i = l.trim();
    !i || t || (c.current && clearTimeout(c.current), c.current = null, a?.(!1), n(i), m(""));
  }
  function y(i) {
    t || (a?.(!0), c.current && clearTimeout(c.current), c.current = setTimeout(() => a?.(!1), 2e3)), i.key === "Enter" && !t && l.trim() && h();
  }
  return /* @__PURE__ */ o("div", { className: "border border-border rounded p-3 mt-4 font-mono", children: [
    /* @__PURE__ */ o("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Chat (",
      e.length,
      ")"
    ] }),
    d.length > 0 && /* @__PURE__ */ r("div", { className: "text-[0.7rem] text-text-tertiary italic mb-1", children: C(d) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: s,
        className: "max-h-[200px] overflow-y-auto mb-2",
        children: e.length === 0 ? /* @__PURE__ */ r("div", { className: "text-text-tertiary text-xs", children: "No messages yet" }) : e.map((i, g) => {
          const N = i.displayName ?? i.clientId.slice(0, 8), b = v(i.timestamp);
          return /* @__PURE__ */ o(
            "div",
            {
              className: "flex items-baseline gap-1.5 py-0.5 flex-wrap",
              children: [
                /* @__PURE__ */ r("span", { className: "text-[0.7rem] text-text-secondary shrink-0", children: N }),
                /* @__PURE__ */ r("span", { className: "text-[0.8rem] text-text-primary grow", children: i.content }),
                /* @__PURE__ */ r("span", { className: "text-[0.65rem] text-text-tertiary shrink-0", children: b })
              ]
            },
            g
          );
        })
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "text",
          value: l,
          onChange: (i) => m(i.target.value),
          onKeyDown: y,
          disabled: t,
          placeholder: t ? "Not connected" : "Type a message...",
          className: u(
            "flex-1 text-[0.8rem] px-2 py-1 border border-border-field rounded font-mono text-text-primary",
            t ? "bg-surface-inset" : "bg-surface"
          )
        }
      ),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: h,
          disabled: t || !l.trim(),
          className: u(
            "text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono",
            t || !l.trim() ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-[#007bff] text-white cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
const p = [
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
function T(e) {
  let n = 0;
  for (let t = 0; t < e.length; t++)
    n = e.charCodeAt(t) + ((n << 5) - n);
  return p[Math.abs(n) % p.length];
}
function w(e) {
  if (!e) return "?";
  const n = e.trim().split(/\s+/);
  if (n.length >= 2) {
    const t = n[0][0] ?? "", a = n[n.length - 1][0] ?? "";
    return (t + a).toUpperCase();
  }
  return e.slice(0, 2).toUpperCase();
}
function S({ users: e, currentClientId: n }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded p-3 font-mono", children: [
    /* @__PURE__ */ o("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Users in channel (",
      e.length,
      ")"
    ] }),
    e.length === 0 ? /* @__PURE__ */ r("div", { className: "text-text-tertiary text-xs", children: "No other users connected" }) : /* @__PURE__ */ r("div", { children: e.map((t) => {
      const a = T(
        t.metadata.email ?? t.clientId
      ), d = w(
        t.metadata.displayName ?? t.clientId.slice(0, 2)
      ), l = t.metadata.isTyping === !0, m = t.clientId === n, s = t.metadata.displayName ?? (t.clientId.length > 12 ? t.clientId.slice(0, 12) + "..." : t.clientId);
      return /* @__PURE__ */ o(
        "div",
        {
          className: "flex items-center gap-2 py-1 text-xs",
          children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
                style: { backgroundColor: a },
                children: d
              }
            ),
            /* @__PURE__ */ r("span", { className: "text-text-primary", children: s }),
            m && /* @__PURE__ */ r("span", { className: "text-text-tertiary", children: "(you)" }),
            l && /* @__PURE__ */ r("span", { className: "text-text-tertiary italic", children: "typing..." })
          ]
        },
        t.clientId
      );
    }) })
  ] });
}
export {
  E as C,
  S as P
};
