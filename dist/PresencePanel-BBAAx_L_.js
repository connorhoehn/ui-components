import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { n } from "./DockedPanelContext-pH9A5z1h.js";
import { t as r } from "./Input-DLknWXri.js";
import { t as i } from "./Avatar-BzicCOft.js";
import { n as a, r as o, t as s } from "./ReactionPickerPopover-moHezwrL.js";
import { useEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/utils/identity.ts
var h = [
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
function g(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return h[Math.abs(t) % h.length];
}
function _(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function v(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function y({ author: t, content: n, timestamp: r, avatarUrl: a, hideAvatar: o = !1, hideAuthor: s = !1, mine: c = !1, footer: l, tone: u = "light", className: d }) {
	let f = u === "dark", h = v(r), g = !s || !!h;
	return /* @__PURE__ */ m("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		className: e("flex items-start gap-2 py-1", d),
		children: [/* @__PURE__ */ p("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ p(i, {
				name: t,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ m("div", {
			className: "flex grow flex-col min-w-0",
			children: [
				g && /* @__PURE__ */ m("div", {
					className: "flex items-baseline gap-2 min-w-0",
					children: [!s && /* @__PURE__ */ p("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), h && /* @__PURE__ */ p("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: h
					})]
				}),
				/* @__PURE__ */ p("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary"),
					children: n
				}),
				l && /* @__PURE__ */ p("div", {
					"data-testid": "message-row-footer",
					className: "mt-1",
					children: l
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var b = /* @__PURE__ */ new Set([
	"P",
	"BR",
	"STRONG",
	"B",
	"EM",
	"I",
	"S",
	"DEL",
	"CODE",
	"PRE",
	"UL",
	"OL",
	"LI",
	"BLOCKQUOTE",
	"A",
	"SPAN"
]), x = /^(https?:|mailto:)/i;
function S(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || x.test(t) ? t : null;
}
function C(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => C(e, `${t}-${n}`));
	if (!b.has(n.tagName)) return /* @__PURE__ */ p("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ p("br", {}, t);
		case "A": {
			let e = S(n.getAttribute("href"));
			return e ? /* @__PURE__ */ p("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ p("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ p("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ p(e, { children: r }, t);
		}
	}
}
function w({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = l(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => C(e, `n${t}`));
	}, [t]);
	return /* @__PURE__ */ p("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? n
	});
}
//#endregion
//#region src/components/social/ChatAttachment.tsx
function T(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function E(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function D({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = T(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ m("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ p("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: o ? /* @__PURE__ */ p("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : /* @__PURE__ */ p("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ m("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ p("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ p("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: E(t.size)
			})]
		})]
	}) : /* @__PURE__ */ p("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ m("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: [/* @__PURE__ */ p(k, {}), /* @__PURE__ */ m("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ p("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ p("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: E(t.size)
				})]
			})]
		})
	});
}
function O({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : E(o);
	return /* @__PURE__ */ m("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ p("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ p(k, {}),
			/* @__PURE__ */ m("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ m("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ p("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ p("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ p("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ p("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ p("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ p("button", {
				type: "button",
				onClick: () => r(t.transferId),
				"aria-label": `Cancel upload of ${t.name}`,
				"data-testid": "transfer-bubble-cancel",
				className: e("shrink-0 rounded px-1.5 py-0.5 text-xs", "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
				children: "✕"
			})
		]
	});
}
function k() {
	return /* @__PURE__ */ p("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ p("path", {
			d: "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ee(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function te(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function A({ messages: i, onSend: l, disabled: h = !1, onTyping: g, typingUsers: _ = [], composer: v, tone: b = "light", showHeader: x, fill: S, onLoadMore: C, hasMore: T, loadingMore: E = !1, onSendFiles: k, transfers: A = [], currentActor: j, onCancelTransfer: re, attachmentSrc: ie, onOpenAttachment: ae, acceptFiles: M, maxFileSize: N, onFileError: P, emojis: oe = s }) {
	let F = b === "dark", I = n(), se = x ?? !(I?.hasHeader ?? !1), L = S ?? I?.fillsHeight ?? !1, [R, z] = d(""), B = u(null), V = u(null), ce = !!C && T !== !1, H = u(null), U = u(null), [W, G] = d(!1), K = !!k && !h, [q, J] = d(0), Y = u(!0), X = u(i.length), Z = i.length + A.length, Q = u(null);
	function le() {
		let e = B.current;
		e && (e.scrollTop = e.scrollHeight, Y.current = !0, J(0));
	}
	function ue() {
		let e = B.current;
		if (!e) return;
		let t = ee(e);
		Y.current = t, t && J(0);
	}
	c(() => {
		let e = B.current, t = X.current, n = Z - t;
		if (X.current = Z, !e) return;
		let r = Q.current;
		if (r && n > 0) {
			Q.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Y.current ? (e.scrollTop = e.scrollHeight, J(0)) : n > 0 && J((e) => e + n);
	}, [Z]);
	function de() {
		let e = B.current;
		e && (Q.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), C?.();
	}
	c(() => () => {
		V.current && clearTimeout(V.current);
	}, []);
	function fe() {
		let e = R.trim();
		!e || h || (V.current && clearTimeout(V.current), V.current = null, g?.(!1), Y.current = !0, l(e), z(""));
	}
	function $(e) {
		!K || e.length === 0 || (Y.current = !0, k?.(e));
	}
	function pe(e) {
		if (!K) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), $(t));
	}
	function me(e) {
		z((t) => t + e), G(!1);
	}
	function he(e) {
		h || (g?.(!0), V.current && clearTimeout(V.current), V.current = setTimeout(() => g?.(!1), 2e3)), e.key === "Enter" && !h && R.trim() && fe();
	}
	let ge = /* @__PURE__ */ m("div", {
		"data-testid": "chat-panel",
		className: e(L ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", F ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			se && /* @__PURE__ */ m("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", F ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					i.length,
					")"
				]
			}),
			_.length > 0 && /* @__PURE__ */ p("div", {
				className: e("text-xs italic mb-1 shrink-0", F ? "text-white/50" : "text-text-secondary"),
				children: te(_)
			}),
			/* @__PURE__ */ m("div", {
				className: e("relative flex flex-col mb-2", L ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ m("div", {
					ref: B,
					onScroll: ue,
					"data-testid": "chat-panel-messages",
					className: e("overflow-y-auto overflow-x-hidden", L ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [
						ce && i.length > 0 && /* @__PURE__ */ p("div", {
							className: "flex justify-center pb-1",
							children: /* @__PURE__ */ p("button", {
								type: "button",
								"data-testid": "chat-panel-load-more",
								onClick: de,
								disabled: E,
								className: e("rounded px-2 py-1 text-xs disabled:opacity-60", F ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
								children: E ? "Loading…" : "Load earlier messages"
							})
						}),
						i.length === 0 ? /* @__PURE__ */ p("div", {
							className: e("text-sm", F ? "text-white/40" : "text-text-secondary"),
							children: "No messages yet"
						}) : i.map((e, t) => {
							let n = e.displayName ?? e.clientId.slice(0, 8), r = e.attachments ?? [], i = e.metadata?.html, a = typeof i == "string" ? i : void 0, o = /* @__PURE__ */ p(w, {
								html: a,
								text: e.content
							}), s = r.length === 0 ? o : /* @__PURE__ */ m(f, { children: [(e.content || a) && o, r.map((e) => /* @__PURE__ */ p(D, {
								attachment: e,
								src: ie?.(e),
								onOpen: ae
							}, e.id))] });
							return /* @__PURE__ */ p(y, {
								author: n,
								content: s,
								timestamp: e.timestamp,
								avatarUrl: e.avatarUrl,
								tone: b
							}, e.id ?? t);
						}),
						A.map((e) => /* @__PURE__ */ p(y, {
							author: e.actor,
							timestamp: "",
							tone: b,
							content: /* @__PURE__ */ p(O, {
								transfer: e,
								mine: !!j && e.actor === j,
								onCancel: re
							})
						}, e.transferId))
					]
				}), q > 0 && /* @__PURE__ */ m("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: le,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", F ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						q,
						" new message",
						q === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			v ? /* @__PURE__ */ p("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				children: v
			}) : /* @__PURE__ */ m("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					k && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !K,
						onClick: () => H.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", F ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ p(ne, {})
					}), /* @__PURE__ */ p("input", {
						ref: H,
						type: "file",
						multiple: !0,
						accept: M,
						"aria-hidden": "true",
						tabIndex: -1,
						className: "hidden",
						onChange: (e) => {
							let t = Array.from(e.target.files ?? []), n = N ? t.filter((e) => e.size > N) : [];
							n.length > 0 && P?.(`Skipped ${n.length} file(s) over the size limit.`), $(t.filter((e) => !n.includes(e))), e.target.value = "";
						}
					})] }),
					/* @__PURE__ */ p("button", {
						ref: U,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": W,
						title: "Insert emoji",
						disabled: h,
						onClick: () => G((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", F ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ p("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ p(a, {
						open: W,
						onSelect: me,
						onClose: () => G(!1),
						triggerRef: U,
						emojis: oe
					}),
					/* @__PURE__ */ p(r, {
						size: "sm",
						value: R,
						onChange: (e) => z(e.target.value),
						onKeyDown: he,
						onPaste: pe,
						disabled: h,
						placeholder: h ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", F && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ p(t, {
						variant: "primary",
						size: "sm",
						onClick: fe,
						disabled: h || !R.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return k ? /* @__PURE__ */ p(o, {
		onFiles: $,
		accept: M,
		maxSize: N,
		onError: P,
		disabled: h,
		className: L ? "flex h-full min-h-0 flex-col" : void 0,
		children: ge
	}) : ge;
}
function ne() {
	return /* @__PURE__ */ p("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ p("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function j({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ m("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ m("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ p("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ p("div", { children: e.map((e) => {
			let n = g(e.metadata.email ?? e.clientId), r = _(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ m("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ p("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ p("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ p("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ p("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
export { E as a, y as c, _ as d, O as i, v as l, A as n, T as o, D as r, w as s, j as t, g as u };
