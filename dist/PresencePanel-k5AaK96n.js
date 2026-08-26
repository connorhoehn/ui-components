import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { o as n, t as r } from "./Avatar-Yxs_9Jio.js";
import { t as i } from "./Input-DLknWXri.js";
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
	let h = f === "dark", g = p(i), _ = !s || !!g;
	return /* @__PURE__ */ l("div", {
		"data-testid": "message-row",
		"data-mine": u ? "true" : "false",
		className: e("flex items-start gap-2 py-1", m),
		children: [/* @__PURE__ */ c("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ c(r, {
				name: t,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ l("div", {
			className: "flex grow flex-col min-w-0",
			children: [
				_ && /* @__PURE__ */ l("div", {
					className: "flex items-baseline gap-2 min-w-0",
					children: [!s && /* @__PURE__ */ c("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", h ? "text-white/70" : "text-text-secondary"),
						children: t
					}), g && /* @__PURE__ */ c("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", h ? "text-white/40" : "text-text-tertiary"),
						children: g
					})]
				}),
				/* @__PURE__ */ c("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", h ? "text-white/90" : "text-text-primary"),
					children: n
				}),
				d && /* @__PURE__ */ c("div", {
					"data-testid": "message-row-footer",
					className: "mt-1",
					children: d
				})
			]
		})]
	});
}
function h(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function g(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function _({ messages: r, onSend: u, disabled: d = !1, onTyping: f, typingUsers: p = [], tone: _ = "light", showHeader: v, fill: y, onLoadMore: b, hasMore: x, loadingMore: S = !1 }) {
	let C = _ === "dark", w = n(), T = v ?? !(w?.hasHeader ?? !1), E = y ?? w?.fillsHeight ?? !1, [D, O] = s(""), k = o(null), A = o(null), j = !!b && x !== !1, [M, N] = s(0), P = o(!0), F = o(r.length), I = o(null);
	function L() {
		let e = k.current;
		e && (e.scrollTop = e.scrollHeight, P.current = !0, N(0));
	}
	function R() {
		let e = k.current;
		if (!e) return;
		let t = h(e);
		P.current = t, t && N(0);
	}
	a(() => {
		let e = k.current, t = F.current, n = r.length - t;
		if (F.current = r.length, !e) return;
		let i = I.current;
		if (i && n > 0) {
			I.current = null, e.scrollTop = i.scrollTop + (e.scrollHeight - i.scrollHeight);
			return;
		}
		P.current ? (e.scrollTop = e.scrollHeight, N(0)) : n > 0 && N((e) => e + n);
	}, [r.length]);
	function z() {
		let e = k.current;
		e && (I.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), b?.();
	}
	a(() => () => {
		A.current && clearTimeout(A.current);
	}, []);
	function B() {
		let e = D.trim();
		!e || d || (A.current && clearTimeout(A.current), A.current = null, f?.(!1), P.current = !0, u(e), O(""));
	}
	function V(e) {
		d || (f?.(!0), A.current && clearTimeout(A.current), A.current = setTimeout(() => f?.(!1), 2e3)), e.key === "Enter" && !d && D.trim() && B();
	}
	return /* @__PURE__ */ l("div", {
		"data-testid": "chat-panel",
		className: e(E ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", C ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			T && /* @__PURE__ */ l("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", C ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					r.length,
					")"
				]
			}),
			p.length > 0 && /* @__PURE__ */ c("div", {
				className: e("text-xs italic mb-1 shrink-0", C ? "text-white/50" : "text-text-secondary"),
				children: g(p)
			}),
			/* @__PURE__ */ l("div", {
				className: e("relative flex flex-col mb-2", E ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ l("div", {
					ref: k,
					onScroll: R,
					"data-testid": "chat-panel-messages",
					className: e("overflow-y-auto overflow-x-hidden", E ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [j && r.length > 0 && /* @__PURE__ */ c("div", {
						className: "flex justify-center pb-1",
						children: /* @__PURE__ */ c("button", {
							type: "button",
							"data-testid": "chat-panel-load-more",
							onClick: z,
							disabled: S,
							className: e("rounded px-2 py-1 text-xs disabled:opacity-60", C ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
							children: S ? "Loading…" : "Load earlier messages"
						})
					}), r.length === 0 ? /* @__PURE__ */ c("div", {
						className: e("text-sm", C ? "text-white/40" : "text-text-secondary"),
						children: "No messages yet"
					}) : r.map((e, t) => {
						let n = e.displayName ?? e.clientId.slice(0, 8);
						return /* @__PURE__ */ c(m, {
							author: n,
							content: e.content,
							timestamp: e.timestamp,
							avatarUrl: e.avatarUrl,
							tone: _
						}, t);
					})]
				}), M > 0 && /* @__PURE__ */ l("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: L,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", C ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						M,
						" new message",
						M === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			/* @__PURE__ */ l("div", {
				className: "flex flex-row gap-2 shrink-0",
				children: [/* @__PURE__ */ c(i, {
					size: "sm",
					value: D,
					onChange: (e) => O(e.target.value),
					onKeyDown: V,
					disabled: d,
					placeholder: d ? "Not connected" : "Type a message...",
					className: e("flex-1 text-sm", C && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
				}), /* @__PURE__ */ c(t, {
					variant: "primary",
					size: "sm",
					onClick: B,
					disabled: d || !D.trim(),
					className: "text-sm px-3 shrink-0",
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function v({ users: e, currentClientId: t }) {
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
export { d as a, p as i, _ as n, f as o, m as r, v as t };
