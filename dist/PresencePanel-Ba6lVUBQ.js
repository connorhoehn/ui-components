import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-OiMcrjPJ.js";
import { t as n } from "./Input-DcK2h-jK.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/utils/identity.ts
var c = [
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
function l(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return c[Math.abs(t) % c.length];
}
function u(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function d(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function f({ author: n, content: r, timestamp: i, avatarUrl: a, hideAvatar: c = !1, hideAuthor: l = !1, mine: u = !1, footer: f, className: p }) {
	let m = d(i);
	return /* @__PURE__ */ s("div", {
		"data-testid": "message-row",
		"data-mine": u ? "true" : "false",
		className: e("flex items-start gap-1.5 py-0.5", p),
		children: [/* @__PURE__ */ o("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !c && /* @__PURE__ */ o(t, {
				name: n,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ s("div", {
			className: "flex items-baseline gap-1.5 grow flex-wrap min-w-0",
			children: [
				!l && /* @__PURE__ */ o("span", {
					"data-testid": "message-row-author",
					className: "text-[0.7rem] text-text-secondary shrink-0",
					children: n
				}),
				/* @__PURE__ */ o("span", {
					"data-testid": "message-row-content",
					className: "text-[0.8rem] text-text-primary grow",
					children: r
				}),
				m && /* @__PURE__ */ o("span", {
					"data-testid": "message-row-time",
					className: "text-[0.65rem] text-text-tertiary shrink-0",
					children: m
				}),
				f && /* @__PURE__ */ o("div", {
					"data-testid": "message-row-footer",
					className: "basis-full mt-1",
					children: f
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/ChatPanel.tsx
function p(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function m({ messages: t, onSend: c, disabled: l = !1, onTyping: u, typingUsers: d = [] }) {
	let [m, h] = a(""), g = i(null), _ = i(null);
	r(() => {
		g.current && (g.current.scrollTop = g.current.scrollHeight);
	}, [t.length]), r(() => () => {
		_.current && clearTimeout(_.current);
	}, []);
	function v() {
		let e = m.trim();
		!e || l || (_.current && clearTimeout(_.current), _.current = null, u?.(!1), c(e), h(""));
	}
	function y(e) {
		l || (u?.(!0), _.current && clearTimeout(_.current), _.current = setTimeout(() => u?.(!1), 2e3)), e.key === "Enter" && !l && m.trim() && v();
	}
	return /* @__PURE__ */ s("div", {
		className: "border border-border rounded p-3 mt-4 font-mono",
		children: [
			/* @__PURE__ */ s("div", {
				className: "text-[0.8rem] font-bold mb-2 text-text-primary",
				children: [
					"Chat (",
					t.length,
					")"
				]
			}),
			d.length > 0 && /* @__PURE__ */ o("div", {
				className: "text-[0.7rem] text-text-tertiary italic mb-1",
				children: p(d)
			}),
			/* @__PURE__ */ o("div", {
				ref: g,
				className: "max-h-[200px] overflow-y-auto mb-2",
				children: t.length === 0 ? /* @__PURE__ */ o("div", {
					className: "text-text-tertiary text-xs",
					children: "No messages yet"
				}) : t.map((e, t) => {
					let n = e.displayName ?? e.clientId.slice(0, 8);
					return /* @__PURE__ */ o(f, {
						author: n,
						content: e.content,
						timestamp: e.timestamp,
						avatarUrl: e.avatarUrl
					}, t);
				})
			}),
			/* @__PURE__ */ s("div", {
				className: "flex flex-row gap-2",
				children: [/* @__PURE__ */ o(n, {
					size: "sm",
					mono: !0,
					value: m,
					onChange: (e) => h(e.target.value),
					onKeyDown: y,
					disabled: l,
					placeholder: l ? "Not connected" : "Type a message...",
					className: "flex-1 text-[0.8rem]"
				}), /* @__PURE__ */ o("button", {
					onClick: v,
					disabled: l || !m.trim(),
					className: e("text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono", l || !m.trim() ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-info text-white cursor-pointer"),
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function h({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ s("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ s("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ o("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ o("div", { children: e.map((e) => {
			let n = l(e.metadata.email ?? e.clientId), r = u(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, c = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ s("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ o("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ o("span", {
						className: "text-text-primary",
						children: c
					}),
					a && /* @__PURE__ */ o("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ o("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
export { l as a, d as i, m as n, u as o, f as r, h as t };
