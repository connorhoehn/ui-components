import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { n } from "./DockedPanelContext-pH9A5z1h.js";
import { t as r } from "./Input-DLknWXri.js";
import { t as i } from "./Avatar-BzicCOft.js";
import { n as a, r as o, t as s } from "./ReactionPickerPopover-moHezwrL.js";
import { useEffect as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/utils/identity.ts
var m = [
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
function h(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return m[Math.abs(t) % m.length];
}
function g(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function _(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function v({ author: t, content: n, timestamp: r, avatarUrl: a, hideAvatar: o = !1, hideAuthor: s = !1, mine: c = !1, footer: l, tone: u = "light", className: d }) {
	let m = u === "dark", h = _(r), g = !s || !!h;
	return /* @__PURE__ */ p("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		className: e("flex items-start gap-2 py-1", d),
		children: [/* @__PURE__ */ f("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ f(i, {
				name: t,
				src: a,
				size: 20
			})
		}), /* @__PURE__ */ p("div", {
			className: "flex grow flex-col min-w-0",
			children: [
				g && /* @__PURE__ */ p("div", {
					className: "flex items-baseline gap-2 min-w-0",
					children: [!s && /* @__PURE__ */ f("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", m ? "text-white/70" : "text-text-secondary"),
						children: t
					}), h && /* @__PURE__ */ f("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", m ? "text-white/40" : "text-text-tertiary"),
						children: h
					})]
				}),
				/* @__PURE__ */ f("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", m ? "text-white/90" : "text-text-primary"),
					children: n
				}),
				l && /* @__PURE__ */ f("div", {
					"data-testid": "message-row-footer",
					className: "mt-1",
					children: l
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/ChatAttachment.tsx
function y(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function b(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function x({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = y(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ p("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ f("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: o ? /* @__PURE__ */ f("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : /* @__PURE__ */ f("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ p("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ f("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ f("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: b(t.size)
			})]
		})]
	}) : /* @__PURE__ */ f("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ p("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: [/* @__PURE__ */ f(C, {}), /* @__PURE__ */ p("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ f("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ f("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: b(t.size)
				})]
			})]
		})
	});
}
function S({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : b(o);
	return /* @__PURE__ */ p("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ f("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ f(C, {}),
			/* @__PURE__ */ p("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ p("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ f("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ f("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ f("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ f("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ f("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ f("button", {
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
function C() {
	return /* @__PURE__ */ f("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ f("path", {
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
function w({ messages: i, onSend: m, disabled: h = !1, onTyping: g, typingUsers: _ = [], tone: y = "light", showHeader: b, fill: C, onLoadMore: w, hasMore: T, loadingMore: E = !1, onSendFiles: D, transfers: O = [], currentActor: k, onCancelTransfer: re, attachmentSrc: ie, onOpenAttachment: ae, acceptFiles: A, maxFileSize: j, onFileError: M, emojis: oe = s }) {
	let N = y === "dark", P = n(), se = b ?? !(P?.hasHeader ?? !1), F = C ?? P?.fillsHeight ?? !1, [I, L] = u(""), R = l(null), z = l(null), ce = !!w && T !== !1, B = l(null), V = l(null), [H, U] = u(!1), W = !!D && !h, [G, K] = u(0), q = l(!0), J = l(i.length), Y = i.length + O.length, X = l(null);
	function le() {
		let e = R.current;
		e && (e.scrollTop = e.scrollHeight, q.current = !0, K(0));
	}
	function ue() {
		let e = R.current;
		if (!e) return;
		let t = ee(e);
		q.current = t, t && K(0);
	}
	c(() => {
		let e = R.current, t = J.current, n = Y - t;
		if (J.current = Y, !e) return;
		let r = X.current;
		if (r && n > 0) {
			X.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		q.current ? (e.scrollTop = e.scrollHeight, K(0)) : n > 0 && K((e) => e + n);
	}, [Y]);
	function de() {
		let e = R.current;
		e && (X.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), w?.();
	}
	c(() => () => {
		z.current && clearTimeout(z.current);
	}, []);
	function Z() {
		let e = I.trim();
		!e || h || (z.current && clearTimeout(z.current), z.current = null, g?.(!1), q.current = !0, m(e), L(""));
	}
	function Q(e) {
		!W || e.length === 0 || (q.current = !0, D?.(e));
	}
	function fe(e) {
		if (!W) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Q(t));
	}
	function pe(e) {
		L((t) => t + e), U(!1);
	}
	function me(e) {
		h || (g?.(!0), z.current && clearTimeout(z.current), z.current = setTimeout(() => g?.(!1), 2e3)), e.key === "Enter" && !h && I.trim() && Z();
	}
	let $ = /* @__PURE__ */ p("div", {
		"data-testid": "chat-panel",
		className: e(F ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", N ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			se && /* @__PURE__ */ p("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", N ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					i.length,
					")"
				]
			}),
			_.length > 0 && /* @__PURE__ */ f("div", {
				className: e("text-xs italic mb-1 shrink-0", N ? "text-white/50" : "text-text-secondary"),
				children: te(_)
			}),
			/* @__PURE__ */ p("div", {
				className: e("relative flex flex-col mb-2", F ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ p("div", {
					ref: R,
					onScroll: ue,
					"data-testid": "chat-panel-messages",
					className: e("overflow-y-auto overflow-x-hidden", F ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [
						ce && i.length > 0 && /* @__PURE__ */ f("div", {
							className: "flex justify-center pb-1",
							children: /* @__PURE__ */ f("button", {
								type: "button",
								"data-testid": "chat-panel-load-more",
								onClick: de,
								disabled: E,
								className: e("rounded px-2 py-1 text-xs disabled:opacity-60", N ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
								children: E ? "Loading…" : "Load earlier messages"
							})
						}),
						i.length === 0 ? /* @__PURE__ */ f("div", {
							className: e("text-sm", N ? "text-white/40" : "text-text-secondary"),
							children: "No messages yet"
						}) : i.map((e, t) => {
							let n = e.displayName ?? e.clientId.slice(0, 8), r = e.attachments ?? [], i = r.length === 0 ? e.content : /* @__PURE__ */ p(d, { children: [e.content && /* @__PURE__ */ f("span", { children: e.content }), r.map((e) => /* @__PURE__ */ f(x, {
								attachment: e,
								src: ie?.(e),
								onOpen: ae
							}, e.id))] });
							return /* @__PURE__ */ f(v, {
								author: n,
								content: i,
								timestamp: e.timestamp,
								avatarUrl: e.avatarUrl,
								tone: y
							}, e.id ?? t);
						}),
						O.map((e) => /* @__PURE__ */ f(v, {
							author: e.actor,
							timestamp: "",
							tone: y,
							content: /* @__PURE__ */ f(S, {
								transfer: e,
								mine: !!k && e.actor === k,
								onCancel: re
							})
						}, e.transferId))
					]
				}), G > 0 && /* @__PURE__ */ p("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: le,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", N ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						G,
						" new message",
						G === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			/* @__PURE__ */ p("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					D && /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !W,
						onClick: () => B.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", N ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ f(ne, {})
					}), /* @__PURE__ */ f("input", {
						ref: B,
						type: "file",
						multiple: !0,
						accept: A,
						"aria-hidden": "true",
						tabIndex: -1,
						className: "hidden",
						onChange: (e) => {
							let t = Array.from(e.target.files ?? []), n = j ? t.filter((e) => e.size > j) : [];
							n.length > 0 && M?.(`Skipped ${n.length} file(s) over the size limit.`), Q(t.filter((e) => !n.includes(e))), e.target.value = "";
						}
					})] }),
					/* @__PURE__ */ f("button", {
						ref: V,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": H,
						title: "Insert emoji",
						disabled: h,
						onClick: () => U((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", N ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ f("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ f(a, {
						open: H,
						onSelect: pe,
						onClose: () => U(!1),
						triggerRef: V,
						emojis: oe
					}),
					/* @__PURE__ */ f(r, {
						size: "sm",
						value: I,
						onChange: (e) => L(e.target.value),
						onKeyDown: me,
						onPaste: fe,
						disabled: h,
						placeholder: h ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", N && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ f(t, {
						variant: "primary",
						size: "sm",
						onClick: Z,
						disabled: h || !I.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return D ? /* @__PURE__ */ f(o, {
		onFiles: Q,
		accept: A,
		maxSize: j,
		onError: M,
		disabled: h,
		className: F ? "flex h-full min-h-0 flex-col" : void 0,
		children: $
	}) : $;
}
function ne() {
	return /* @__PURE__ */ f("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ f("path", {
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
function T({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ p("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ p("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ f("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ f("div", { children: e.map((e) => {
			let n = h(e.metadata.email ?? e.clientId), r = g(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ p("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ f("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ f("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ f("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ f("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
export { b as a, _ as c, S as i, h as l, w as n, y as o, x as r, v as s, T as t, g as u };
