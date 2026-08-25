import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { t as n } from "./Avatar-BzicCOft.js";
import { t as r } from "./Input-DcK2h-jK.js";
import { useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/utils/identity.ts
var l = [
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
function u(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return l[Math.abs(t) % l.length];
}
function d(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function f(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function p({ author: t, content: r, timestamp: i, avatarUrl: a, hideAvatar: o = !1, hideAuthor: l = !1, mine: u = !1, footer: d, tone: p = "light", className: m }) {
	let h = p === "dark", g = f(i);
	return /* @__PURE__ */ c("div", {
		"data-testid": "message-row",
		"data-mine": u ? "true" : "false",
		className: e("flex items-start gap-1.5 py-0.5", m),
		children: [/* @__PURE__ */ s("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ s(n, {
				name: t,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ c("div", {
			className: "flex items-baseline gap-1.5 grow flex-wrap min-w-0",
			children: [
				!l && /* @__PURE__ */ s("span", {
					"data-testid": "message-row-author",
					className: e("text-[0.7rem] shrink-0", h ? "text-white/70" : "text-text-secondary"),
					children: t
				}),
				/* @__PURE__ */ s("span", {
					"data-testid": "message-row-content",
					className: e("text-[0.8rem] grow", h ? "text-white/90" : "text-text-primary"),
					children: r
				}),
				g && /* @__PURE__ */ s("span", {
					"data-testid": "message-row-time",
					className: e("text-[0.65rem] shrink-0", h ? "text-white/40" : "text-text-tertiary"),
					children: g
				}),
				d && /* @__PURE__ */ s("div", {
					"data-testid": "message-row-footer",
					className: "basis-full mt-1",
					children: d
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/ChatPanel.tsx
function m(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function h({ messages: n, onSend: l, disabled: u = !1, onTyping: d, typingUsers: f = [], tone: h = "light" }) {
	let g = h === "dark", [_, v] = o(""), y = a(null), b = a(null);
	i(() => {
		y.current && (y.current.scrollTop = y.current.scrollHeight);
	}, [n.length]), i(() => () => {
		b.current && clearTimeout(b.current);
	}, []);
	function x() {
		let e = _.trim();
		!e || u || (b.current && clearTimeout(b.current), b.current = null, d?.(!1), l(e), v(""));
	}
	function S(e) {
		u || (d?.(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => d?.(!1), 2e3)), e.key === "Enter" && !u && _.trim() && x();
	}
	return /* @__PURE__ */ c("div", {
		className: e("border rounded p-3 mt-4 font-mono", g ? "border-white/10 bg-white/5" : "border-border"),
		children: [
			/* @__PURE__ */ c("div", {
				className: e("text-[0.8rem] font-bold mb-2", g ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			f.length > 0 && /* @__PURE__ */ s("div", {
				className: e("text-[0.7rem] italic mb-1", g ? "text-white/50" : "text-text-tertiary"),
				children: m(f)
			}),
			/* @__PURE__ */ s("div", {
				ref: y,
				className: "max-h-[200px] overflow-y-auto mb-2",
				children: n.length === 0 ? /* @__PURE__ */ s("div", {
					className: e("text-xs", g ? "text-white/40" : "text-text-tertiary"),
					children: "No messages yet"
				}) : n.map((e, t) => {
					let n = e.displayName ?? e.clientId.slice(0, 8);
					return /* @__PURE__ */ s(p, {
						author: n,
						content: e.content,
						timestamp: e.timestamp,
						avatarUrl: e.avatarUrl,
						tone: h
					}, t);
				})
			}),
			/* @__PURE__ */ c("div", {
				className: "flex flex-row gap-2",
				children: [/* @__PURE__ */ s(r, {
					size: "sm",
					mono: !0,
					value: _,
					onChange: (e) => v(e.target.value),
					onKeyDown: S,
					disabled: u,
					placeholder: u ? "Not connected" : "Type a message...",
					className: e("flex-1 text-[0.8rem]", g && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
				}), /* @__PURE__ */ s(t, {
					variant: "primary",
					size: "sm",
					onClick: x,
					disabled: u || !_.trim(),
					className: "text-[0.8rem] px-3 shrink-0",
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function g({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ c("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ c("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ s("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ s("div", { children: e.map((e) => {
			let n = u(e.metadata.email ?? e.clientId), r = d(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ c("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ s("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ s("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ s("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ s("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
export { u as a, f as i, h as n, d as o, p as r, g as t };
