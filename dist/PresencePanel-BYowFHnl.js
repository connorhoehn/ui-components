import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { o as n, t as r } from "./Avatar-Yxs_9Jio.js";
import { t as i } from "./Input-DLknWXri.js";
import { useCallback as a, useEffect as o, useId as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { Command as h } from "cmdk";
//#region src/utils/identity.ts
var g = [
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
function _(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return g[Math.abs(t) % g.length];
}
function v(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function y(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function b({ author: t, content: n, timestamp: i, avatarUrl: a, hideAvatar: o = !1, hideAuthor: s = !1, mine: c = !1, footer: l, tone: u = "light", className: d }) {
	let f = u === "dark", h = y(i), g = !s || !!h;
	return /* @__PURE__ */ m("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		className: e("flex items-start gap-2 py-1", d),
		children: [/* @__PURE__ */ p("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !o && /* @__PURE__ */ p(r, {
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
//#region src/components/social/ChatAttachment.tsx
function x(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function S(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function C({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = x(t), o = n ?? t.preview;
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
				children: S(t.size)
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
			children: [/* @__PURE__ */ p(T, {}), /* @__PURE__ */ m("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ p("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ p("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: S(t.size)
				})]
			})]
		})
	});
}
function w({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : S(o);
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
			}) : /* @__PURE__ */ p(T, {}),
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
function T() {
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
//#endregion
//#region src/components/social/ChatDropZone.tsx
function E(e, t) {
	let n = t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
	return n.length === 0 || n.some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -1)) : e.type === t);
}
function D(e) {
	let t = e.dataTransfer?.types;
	return t ? Array.prototype.indexOf.call(t, "Files") !== -1 : !1;
}
function O({ children: t, onFiles: n, accept: r, maxSize: i, onError: o, disabled: s = !1, label: c, className: l }) {
	let [f, h] = d(!1), g = u(0), _ = a(() => {
		g.current = 0, h(!1);
	}, []), v = a((e) => {
		s || !D(e) || (e.preventDefault(), g.current += 1, h(!0));
	}, [s]), y = a((e) => {
		s || !D(e) || (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
	}, [s]), b = a((e) => {
		D(e) && (g.current = Math.max(0, g.current - 1), g.current === 0 && h(!1));
	}, []), x = a((e) => {
		if (s) return;
		e.preventDefault(), _();
		let t = Array.from(e.dataTransfer?.files ?? []);
		if (t.length === 0) return;
		let a = t.filter((e) => r && !E(e, r) || !!i && e.size > i);
		a.length > 0 && o?.(a.length === t.length ? `Can't attach ${a.map((e) => e.name).join(", ")} — unsupported type or too large.` : `Skipped ${a.length} file(s) — unsupported type or too large.`);
		let c = t.filter((e) => !a.includes(e));
		c.length > 0 && n(c);
	}, [
		r,
		s,
		i,
		o,
		n,
		_
	]);
	return /* @__PURE__ */ m("div", {
		"data-testid": "chat-drop-zone",
		"data-dragging": f ? "true" : "false",
		onDragEnter: v,
		onDragOver: y,
		onDragLeave: b,
		onDrop: x,
		className: e("relative", l),
		children: [t, f && /* @__PURE__ */ p("div", {
			"data-testid": "chat-drop-zone-overlay",
			className: e("pointer-events-none absolute inset-0 z-20 flex items-center justify-center", "rounded-lg border-2 border-dashed border-[var(--color-primary)]", "bg-[var(--color-surface)]/85 backdrop-blur-[1px]"),
			children: /* @__PURE__ */ p("span", {
				className: "text-sm font-semibold text-[var(--color-primary)]",
				children: c ?? "Drop to share with everyone here"
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var k = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function ee(e, t) {
	let [n, r] = d(null);
	return c(() => {
		if (!t || !e?.current) {
			r(null);
			return;
		}
		let n = () => {
			let t = e.current;
			if (!t) return;
			let n = t.getBoundingClientRect();
			r({
				top: Math.max(8, n.top - 12),
				left: n.left
			});
		};
		return n(), window.addEventListener("scroll", n, !0), window.addEventListener("resize", n), () => {
			window.removeEventListener("scroll", n, !0), window.removeEventListener("resize", n);
		};
	}, [t, e]), n;
}
function A({ open: t, onSelect: n, onClose: r, triggerRef: i, emojis: c = k, showSearch: d = !0, className: f, style: g }) {
	let _ = u(null), v = s(), y = ee(i, t);
	o(() => {
		if (!t) return;
		let e = (e) => {
			let t = e.target;
			_.current?.contains(t) || i?.current?.contains(t) || r();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		t,
		r,
		i
	]), o(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), r());
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [t, r]);
	let b = a((e) => {
		n(e), r();
	}, [n, r]), x = l(() => y ? {
		position: "fixed",
		top: y.top,
		left: y.left,
		transform: "translateY(-100%)"
	} : { position: "absolute" }, [y]);
	return t ? /* @__PURE__ */ p("div", {
		ref: _,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: e("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem]", f),
		style: {
			...x,
			...g
		},
		children: /* @__PURE__ */ m(h, {
			label: "Pick a reaction",
			loop: !0,
			children: [d && /* @__PURE__ */ p(h.Input, {
				id: `${v}-search`,
				placeholder: "Search reactions…",
				className: e("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ m(h.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ p(h.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ p("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: c.map((t) => /* @__PURE__ */ p(h.Item, {
						value: t,
						onSelect: () => b(t),
						"data-testid": "reaction-picker-item",
						"data-emoji": t,
						className: e("flex items-center justify-center text-xl rounded-md", "h-9 cursor-pointer select-none", "aria-selected:bg-[var(--color-primary)]/20", "hover:bg-white/5"),
						children: t
					}, t))
				})]
			})]
		})
	}) : null;
}
function te(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function ne(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function j({ messages: r, onSend: a, disabled: s = !1, onTyping: c, typingUsers: l = [], tone: h = "light", showHeader: g, fill: _, onLoadMore: v, hasMore: y, loadingMore: x = !1, onSendFiles: S, transfers: T = [], currentActor: E, onCancelTransfer: D, attachmentSrc: ee, onOpenAttachment: j, acceptFiles: M, maxFileSize: N, onFileError: P, emojis: ie = k }) {
	let F = h === "dark", ae = n(), oe = g ?? !(ae?.hasHeader ?? !1), I = _ ?? ae?.fillsHeight ?? !1, [L, R] = d(""), z = u(null), B = u(null), se = !!v && y !== !1, V = u(null), H = u(null), [U, W] = d(!1), G = !!S && !s, [K, q] = d(0), J = u(!0), Y = u(r.length), X = r.length + T.length, Z = u(null);
	function ce() {
		let e = z.current;
		e && (e.scrollTop = e.scrollHeight, J.current = !0, q(0));
	}
	function le() {
		let e = z.current;
		if (!e) return;
		let t = te(e);
		J.current = t, t && q(0);
	}
	o(() => {
		let e = z.current, t = Y.current, n = X - t;
		if (Y.current = X, !e) return;
		let r = Z.current;
		if (r && n > 0) {
			Z.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		J.current ? (e.scrollTop = e.scrollHeight, q(0)) : n > 0 && q((e) => e + n);
	}, [X]);
	function ue() {
		let e = z.current;
		e && (Z.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), v?.();
	}
	o(() => () => {
		B.current && clearTimeout(B.current);
	}, []);
	function Q() {
		let e = L.trim();
		!e || s || (B.current && clearTimeout(B.current), B.current = null, c?.(!1), J.current = !0, a(e), R(""));
	}
	function $(e) {
		!G || e.length === 0 || (J.current = !0, S?.(e));
	}
	function de(e) {
		if (!G) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), $(t));
	}
	function fe(e) {
		R((t) => t + e), W(!1);
	}
	function pe(e) {
		s || (c?.(!0), B.current && clearTimeout(B.current), B.current = setTimeout(() => c?.(!1), 2e3)), e.key === "Enter" && !s && L.trim() && Q();
	}
	let me = /* @__PURE__ */ m("div", {
		"data-testid": "chat-panel",
		className: e(I ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", F ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			oe && /* @__PURE__ */ m("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", F ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					r.length,
					")"
				]
			}),
			l.length > 0 && /* @__PURE__ */ p("div", {
				className: e("text-xs italic mb-1 shrink-0", F ? "text-white/50" : "text-text-secondary"),
				children: ne(l)
			}),
			/* @__PURE__ */ m("div", {
				className: e("relative flex flex-col mb-2", I ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ m("div", {
					ref: z,
					onScroll: le,
					"data-testid": "chat-panel-messages",
					className: e("overflow-y-auto overflow-x-hidden", I ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [
						se && r.length > 0 && /* @__PURE__ */ p("div", {
							className: "flex justify-center pb-1",
							children: /* @__PURE__ */ p("button", {
								type: "button",
								"data-testid": "chat-panel-load-more",
								onClick: ue,
								disabled: x,
								className: e("rounded px-2 py-1 text-xs disabled:opacity-60", F ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
								children: x ? "Loading…" : "Load earlier messages"
							})
						}),
						r.length === 0 ? /* @__PURE__ */ p("div", {
							className: e("text-sm", F ? "text-white/40" : "text-text-secondary"),
							children: "No messages yet"
						}) : r.map((e, t) => {
							let n = e.displayName ?? e.clientId.slice(0, 8), r = e.attachments ?? [], i = r.length === 0 ? e.content : /* @__PURE__ */ m(f, { children: [e.content && /* @__PURE__ */ p("span", { children: e.content }), r.map((e) => /* @__PURE__ */ p(C, {
								attachment: e,
								src: ee?.(e),
								onOpen: j
							}, e.id))] });
							return /* @__PURE__ */ p(b, {
								author: n,
								content: i,
								timestamp: e.timestamp,
								avatarUrl: e.avatarUrl,
								tone: h
							}, e.id ?? t);
						}),
						T.map((e) => /* @__PURE__ */ p(b, {
							author: e.actor,
							timestamp: "",
							tone: h,
							content: /* @__PURE__ */ p(w, {
								transfer: e,
								mine: !!E && e.actor === E,
								onCancel: D
							})
						}, e.transferId))
					]
				}), K > 0 && /* @__PURE__ */ m("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: ce,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", F ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						K,
						" new message",
						K === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			/* @__PURE__ */ m("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					S && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !G,
						onClick: () => V.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", F ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ p(re, {})
					}), /* @__PURE__ */ p("input", {
						ref: V,
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
						ref: H,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": U,
						title: "Insert emoji",
						disabled: s,
						onClick: () => W((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", F ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ p("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ p(A, {
						open: U,
						onSelect: fe,
						onClose: () => W(!1),
						triggerRef: H,
						emojis: ie
					}),
					/* @__PURE__ */ p(i, {
						size: "sm",
						value: L,
						onChange: (e) => R(e.target.value),
						onKeyDown: pe,
						onPaste: de,
						disabled: s,
						placeholder: s ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", F && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ p(t, {
						variant: "primary",
						size: "sm",
						onClick: Q,
						disabled: s || !L.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return S ? /* @__PURE__ */ p(O, {
		onFiles: $,
		accept: M,
		maxSize: N,
		onError: P,
		disabled: s,
		className: I ? "flex h-full min-h-0 flex-col" : void 0,
		children: me
	}) : me;
}
function re() {
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
function M({ users: e, currentClientId: t }) {
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
			let n = _(e.metadata.email ?? e.clientId), r = v(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
export { O as a, S as c, y as d, _ as f, A as i, x as l, j as n, C as o, v as p, k as r, w as s, M as t, b as u };
