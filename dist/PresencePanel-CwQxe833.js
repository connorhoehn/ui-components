import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { o as n, t as r } from "./Avatar-Yxs_9Jio.js";
import { t as i } from "./Input-DcK2h-jK.js";
import { useEffect as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/utils/identity.ts
var u = [
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
function d(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return u[Math.abs(t) % u.length];
}
function f(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function p(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function m({ author: t, content: n, timestamp: i, avatarUrl: a, hideAvatar: o = !1, hideAuthor: s = !1, mine: u = !1, footer: d, tone: f = "light", className: m }) {
	let h = f === "dark", g = p(i);
	return /* @__PURE__ */ l("div", {
		"data-testid": "message-row",
		"data-mine": u ? "true" : "false",
		className: e("flex items-start gap-1.5 py-0.5", m),
		children: [/* @__PURE__ */ c("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ c(r, {
				name: t,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ l("div", {
			className: "flex items-baseline gap-1.5 grow flex-wrap min-w-0",
			children: [
				!s && /* @__PURE__ */ c("span", {
					"data-testid": "message-row-author",
					className: e("text-[0.7rem] shrink-0", h ? "text-white/70" : "text-text-secondary"),
					children: t
				}),
				/* @__PURE__ */ c("span", {
					"data-testid": "message-row-content",
					className: e("text-[0.8rem] grow", h ? "text-white/90" : "text-text-primary"),
					children: n
				}),
				g && /* @__PURE__ */ c("span", {
					"data-testid": "message-row-time",
					className: e("text-[0.65rem] shrink-0", h ? "text-white/40" : "text-text-tertiary"),
					children: g
				}),
				d && /* @__PURE__ */ c("div", {
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
function h(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function g({ messages: r, onSend: u, disabled: d = !1, onTyping: f, typingUsers: p = [], tone: g = "light", showHeader: _, fill: v }) {
	let y = g === "dark", b = n(), x = _ ?? !(b?.hasHeader ?? !1), S = v ?? b?.fillsHeight ?? !1, [C, w] = s(""), T = o(null), E = o(null);
	a(() => {
		T.current && (T.current.scrollTop = T.current.scrollHeight);
	}, [r.length]), a(() => () => {
		E.current && clearTimeout(E.current);
	}, []);
	function D() {
		let e = C.trim();
		!e || d || (E.current && clearTimeout(E.current), E.current = null, f?.(!1), u(e), w(""));
	}
	function O(e) {
		d || (f?.(!0), E.current && clearTimeout(E.current), E.current = setTimeout(() => f?.(!1), 2e3)), e.key === "Enter" && !d && C.trim() && D();
	}
	return /* @__PURE__ */ l("div", {
		"data-testid": "chat-panel",
		className: e("font-mono", S ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", y ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			x && /* @__PURE__ */ l("div", {
				className: e("text-[0.8rem] font-bold mb-2 shrink-0", y ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					r.length,
					")"
				]
			}),
			p.length > 0 && /* @__PURE__ */ c("div", {
				className: e("text-[0.7rem] italic mb-1 shrink-0", y ? "text-white/50" : "text-text-tertiary"),
				children: h(p)
			}),
			/* @__PURE__ */ c("div", {
				ref: T,
				"data-testid": "chat-panel-messages",
				className: e("overflow-y-auto mb-2", S ? "min-h-0 flex-1" : "max-h-[200px]"),
				children: r.length === 0 ? /* @__PURE__ */ c("div", {
					className: e("text-xs", y ? "text-white/40" : "text-text-tertiary"),
					children: "No messages yet"
				}) : r.map((e, t) => {
					let n = e.displayName ?? e.clientId.slice(0, 8);
					return /* @__PURE__ */ c(m, {
						author: n,
						content: e.content,
						timestamp: e.timestamp,
						avatarUrl: e.avatarUrl,
						tone: g
					}, t);
				})
			}),
			/* @__PURE__ */ l("div", {
				className: "flex flex-row gap-2 shrink-0",
				children: [/* @__PURE__ */ c(i, {
					size: "sm",
					mono: !0,
					value: C,
					onChange: (e) => w(e.target.value),
					onKeyDown: O,
					disabled: d,
					placeholder: d ? "Not connected" : "Type a message...",
					className: e("flex-1 text-[0.8rem]", y && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
				}), /* @__PURE__ */ c(t, {
					variant: "primary",
					size: "sm",
					onClick: D,
					disabled: d || !C.trim(),
					className: "text-[0.8rem] px-3 shrink-0",
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function _({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ l("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ l("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ c("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ c("div", { children: e.map((e) => {
			let n = d(e.metadata.email ?? e.clientId), r = f(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ l("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ c("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ c("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ c("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ c("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
export { d as a, p as i, g as n, f as o, m as r, _ as t };
