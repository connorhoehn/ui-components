import { t as e } from "../cn-D4QmbyEy.js";
import { c as t, n } from "../Button-uREUOWUk.js";
import { c as r, l as i, n as a } from "../Text-4BIlhd_-.js";
import { t as o } from "../Select-DjpQtNw3.js";
import { a as s, c, i as l, l as u, n as d, r as f, t as p } from "../composerSendError-BCxgMhHn.js";
import { a as m, i as h, n as g, r as _, t as v } from "../composerContext-BLn1-Nao.js";
import { a as ee, i as y, n as b, o as x, r as te, s as S, t as C } from "../ConversationInputs-GSOr1WbY.js";
import { a as w, c as T, i as E, l as D, n as ne, o as re, r as O, s as ie, t as ae, u as oe } from "../RichChatComposer-D5Y1PWbu.js";
import { t as se } from "../ContextComposer-CgnYDkaR.js";
import { t as ce } from "../AgentComposerDock-BF_0EM0q.js";
import { useCallback as k, useEffect as A, useId as le, useMemo as j, useRef as M, useState as N } from "react";
import { jsx as P, jsxs as F } from "react/jsx-runtime";
//#region src/components/social/composerPromptModel.ts
var I = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function L(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? I : [];
}
function ue(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function R(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function de(e) {
	let t = L(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function fe(e, t) {
	if (e.kind === "confirm") {
		let n = L(e)[0];
		return {
			kind: "confirm",
			optionId: t.id,
			confirmed: t.id === n?.id
		};
	}
	return e.kind === "choice" ? {
		kind: "choice",
		optionId: t.id
	} : {
		kind: "option",
		optionId: t.id
	};
}
function pe(e, t) {
	let n = t.trim();
	if (e.kind === "text") return n ? { answer: {
		kind: "text",
		text: n
	} } : { error: "Type an answer, or pick an option." };
	if (e.kind === "number") {
		let t = n.replace(/^\$/, "").replace(/,/g, ""), r = t === "" ? NaN : Number(t);
		return Number.isFinite(r) ? e.min != null && r < e.min ? { error: `Use ${e.min} or more.` } : e.max != null && r > e.max ? { error: `Use ${e.max} or less.` } : { answer: {
			kind: "number",
			value: r
		} } : { error: "Type a number, or pick an option." };
	}
	return { error: "Pick one of the options." };
}
function me(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	let n = L(e).find((e) => e.id === t.optionId);
	return `${e.title}: ${n?.label ?? t.optionId}`;
}
function he(e, t) {
	return e.filter((e) => !t.has(e.id));
}
function z(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function ge(e, t) {
	let { prompt: n, collapsed: r, inputEmpty: i, inDeck: a, busy: o } = t;
	if (!n) return null;
	let s = !!(e.metaKey || e.ctrlKey), c = i || a;
	if (r) return s && e.key === "ArrowDown" ? { type: "expand" } : null;
	if (s && (e.key === "ArrowDown" || e.key === "ArrowUp")) return {
		type: "page",
		delta: e.key === "ArrowDown" ? 1 : -1
	};
	if (e.key === "Escape" && c) return { type: "collapse" };
	if (s || e.shiftKey) return null;
	let l = R(n), u = c && !e.altKey && (!l || a);
	if (u && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (u && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let d = L(n);
	if (e.key === "Enter" && c && !a) {
		let e = de(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (l ? !e.altKey : !c || e.altKey) return null;
	let f = _e(e) ?? e.key.toLowerCase(), p = d.findIndex((e, t) => ue(e, t) === f), m = p >= 0 ? d[p] : null;
	return m && !m.disabledReason ? {
		type: "pick",
		optionId: m.id
	} : null;
}
function _e(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var ve = [];
function B(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function ye(e) {
	let t = e ?? ve, [n, r] = N(() => /* @__PURE__ */ new Set()), [i, a] = N(null), [o, s] = N(!1), [c, l] = N(null), [u, d] = N({}), [f, p] = N(null), m = j(() => he(t, n), [t, n]), h = z(m, i), g = h >= 0 ? m[h] : null, _ = c != null, v = M(!1), ee = t.map((e) => e.id).join("\0");
	A(() => {
		r((e) => {
			let n = new Set(t.map((e) => e.id)), r = new Set([...e].filter((e) => n.has(e)));
			return r.size === e.size ? e : r;
		});
	}, [ee]);
	let y = m[0]?.id ?? null, b = M(/* @__PURE__ */ new Set());
	A(() => {
		let e = m.some((e) => !b.current.has(e.id));
		for (let e of m) b.current.add(e.id);
		e && s(!1);
	}, [y, m]);
	let x = k(async (e, t) => {
		if (v.current || e.readOnlyReason) return !1;
		v.current = !0, l(e.id), d((t) => {
			if (!(e.id in t)) return t;
			let { [e.id]: n, ...r } = t;
			return r;
		});
		let n;
		try {
			n = await e.onAnswer(t);
		} catch (e) {
			n = { error: e instanceof Error && e.message ? e.message : "That answer could not be taken. Try again." };
		} finally {
			v.current = !1, l(null);
		}
		return B(n) ? (d((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : me(e, t)), !0);
	}, []), te = k(async (e) => {
		if (!g) return !1;
		let t = L(g).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : x(g, fe(g, t));
	}, [g, x]), S = k(async (e) => {
		if (!g || !R(g)) return !1;
		let t = pe(g, e);
		return "error" in t ? (d((e) => ({
			...e,
			[g.id]: t.error
		})), !1) : x(g, t.answer);
	}, [g, x]), C = k((e) => {
		if (!m.length) return;
		let t = (h + e + m.length) % m.length;
		a(m[t].id);
	}, [m, h]);
	return {
		pending: m,
		active: g,
		index: h,
		collapsed: o,
		busy: _,
		error: g ? u[g.id] ?? null : null,
		receipt: f,
		visible: m.length > 0 || f != null,
		typed: !o && R(g),
		setCollapsed: s,
		page: C,
		pick: te,
		answerTyped: S,
		dismissReceipt: () => p(null)
	};
}
var be = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function V({ children: e }) {
	return /* @__PURE__ */ P("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-xs font-normal leading-none text-text-secondary",
		children: e
	});
}
function xe() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Se = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Ce({ deck: t, prompts: o, input: s = null, variant: c = "card", className: l, "data-testid": u = "composer-prompt-deck" }) {
	let d = c === "inset", f = ye(t ? null : o), p = t ?? f, m = M(null), h = le(), { active: g, pending: _, index: v, collapsed: ee, busy: y, error: b, receipt: x } = p, te = M({
		deck: p,
		input: s
	});
	if (te.current = {
		deck: p,
		input: s
	}, A(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing) return;
			let { deck: t, input: n } = te.current, r = e.target, i = !!m.current && !!r && m.current.contains(r), a = !!n && n.contains(r);
			if (!i && !a) return;
			let o = ge({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: !n || n.isEmpty(),
				inDeck: i,
				busy: t.busy
			});
			o && (e.preventDefault(), e.stopPropagation(), o.type === "page" ? t.page(o.delta) : o.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : o.type === "expand" ? t.setCollapsed(!1) : t.pick(o.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !p.visible) return null;
	let S = xe(), C = _.length, w = x ? /* @__PURE__ */ F(r, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", d && !ee && g && "px-3 pb-2"),
		"data-testid": `${u}-receipt`,
		children: [/* @__PURE__ */ P(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${x}`
		}), /* @__PURE__ */ P(n, {
			variant: "link",
			size: "sm",
			onClick: p.dismissReceipt,
			children: "Dismiss"
		})]
	}) : null;
	if (!g || ee) return /* @__PURE__ */ F(i, {
		gap: "xs",
		className: e("min-w-0", d && "border-b border-border px-3 py-1.5", l),
		"data-composer-prompt-deck": g ? "collapsed" : "answered",
		"data-deck-variant": c,
		"data-testid": u,
		ref: m,
		children: [g && /* @__PURE__ */ F(r, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !d && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ P(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: C === 1 ? `1 question waiting · ${g.title}` : `${C} questions waiting · ${g.title}`
				}),
				/* @__PURE__ */ P(n, {
					variant: "link",
					size: "sm",
					onClick: () => p.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-testid": `${u}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ P(V, { children: `${S}↓` })
			]
		}), w]
	});
	let T = L(g), E = R(g), D = de(g), ne = `${h}-title`, re = `${h}-question`, O = T.map((e, t) => ue(e, t)), ie = [
		T.length ? `${E ? "Alt+" : ""}${O.filter(Boolean).length > 1 ? `${O[0]}–${O[O.length - 1]}` : O[0] ?? ""} choose` : null,
		E ? "type the answer below · Enter send" : D ? `Enter ${D.label}` : null,
		C > 1 ? `${S}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ F(i, {
		gap: "xs",
		className: e("min-w-0", d && "border-b border-border", l),
		"data-composer-prompt-deck": "expanded",
		"data-deck-variant": c,
		"data-testid": u,
		ref: m,
		children: [/* @__PURE__ */ F("section", {
			role: "group",
			"aria-labelledby": ne,
			"aria-describedby": re,
			"aria-busy": y || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", Se, !d && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": g.id,
			"data-composer-prompt-kind": g.kind,
			"data-testid": `${u}-card`,
			children: [
				/* @__PURE__ */ F(r, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ F(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [g.eyebrow && /* @__PURE__ */ P(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: g.eyebrow
							}), /* @__PURE__ */ P(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: ne,
								title: g.title,
								children: g.title
							})]
						}),
						C > 1 && /* @__PURE__ */ F(r, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ P(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${u}-position`,
									children: `${v + 1} of ${C}`
								}),
								/* @__PURE__ */ P(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => p.page(-1),
									"data-testid": `${u}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ P(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => p.page(1),
									"data-testid": `${u}-next`,
									children: "›"
								})
							]
						}),
						/* @__PURE__ */ P(n, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Escape",
							onClick: () => {
								p.setCollapsed(!0), s?.focus();
							},
							"data-testid": `${u}-hide`,
							children: "Hide"
						})
					]
				}),
				C > 1 && /* @__PURE__ */ P(r, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${u}-progress`,
					children: _.map((t, n) => /* @__PURE__ */ P(i, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === v ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				g.fields && g.fields.length > 0 && /* @__PURE__ */ P("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${u}-fields`,
					children: g.fields.map((t, n) => /* @__PURE__ */ F("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ P("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ P("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", be[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ P(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: re,
					className: "min-w-0",
					children: g.question
				}),
				g.readOnlyReason ? /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${u}-read-only`,
					children: g.readOnlyReason
				}) : T.length > 0 && /* @__PURE__ */ P(r, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: T.map((e, t) => {
						let r = O[t], o = r ? `${E ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ F(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ F(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: y || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${h}-hint-${t}` : void 0,
								onClick: () => {
									p.pick(e.id).then((e) => {
										e && s?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": D?.id === e.id || void 0,
								"data-testid": `${u}-option-${e.id}`,
								children: [r && /* @__PURE__ */ P(V, { children: r }), e.label]
							}), e.hint && /* @__PURE__ */ P(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${h}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				b && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${u}-error`,
					children: b
				}),
				y && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${u}-busy`,
					children: "Working…"
				}),
				!g.readOnlyReason && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${u}-keys`,
					children: ie
				})
			]
		}), w]
	});
}
function we(e) {
	let { capabilities: t, offline: n } = e, r = [], i = {};
	if (e.hasChat) {
		r.push("chat");
		let a = n || (e.choosable > 0 ? null : e.chatOffReason || t.readOnlyReason || "You can read this conversation but not post to it.");
		a && (i.chat = a);
	}
	if (t.agent) {
		r.push("agent");
		let e = t.agent.allowed ? n || null : t.agent.reason || "The agent is not available to you here.";
		e && (i.agent = e);
	}
	return {
		modes: r,
		disabledModes: r.filter((e) => !!i[e]),
		reasons: i
	};
}
function Te(e, t, n) {
	if (t) {
		let n = e.find((e) => e.id === t);
		if (n) return n;
	}
	if (n) {
		let t = e.find((e) => e.id === n);
		if (t) return t;
	}
	return e.find((e) => !e.disabled) ?? null;
}
function Ee(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function H(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function De(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && H(e.html).length > 0;
}
function Oe(e) {
	return {
		displayName: e.displayName,
		...e.reply ? { replyTo: e.reply } : {},
		...e.reference?.page ? { pageReference: {
			kind: e.reference.page.kind,
			id: e.reference.page.id
		} } : {},
		...e.attachments?.length ? { attachments: [...e.attachments] } : {}
	};
}
function ke(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Ae(e, t) {
	let n = e.trim(), r = n.toLowerCase();
	for (let e of t) {
		let t = e.trigger.toLowerCase();
		if (r === t || r.startsWith(`${t} `) || r.startsWith(`${t}\n`)) return {
			command: e,
			argumentText: n.slice(e.trigger.length).trim()
		};
	}
	return null;
}
var je = "ui.conversation-draft:";
function U(e) {
	return `${je}${e}`;
}
function Me(e, t) {
	try {
		let n = e?.getItem(U(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && H(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ne(e, t, n) {
	try {
		H(n) ? e?.setItem(U(t), JSON.stringify({ html: n })) : e?.removeItem(U(t));
	} catch {}
}
var Pe = "Conversation changed; draft retained.";
function W(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Fe(e) {
	return e.map((e) => e.name).join(", ");
}
var G = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(W(`timed out (${n})`)));
			}, t);
			this.pending.set(e, {
				resolve: r,
				reject: i,
				timer: a
			});
		});
	}
	complete(e, t) {
		let n = this.pending.get(e);
		return n ? (this.pending.delete(e), clearTimeout(n.timer), n.resolve(t), !0) : !1;
	}
	rejectAll(e) {
		for (let t of this.pending.values()) clearTimeout(t.timer), t.reject(Error(e));
		this.pending.clear();
	}
	get size() {
		return this.pending.size;
	}
}, Ie = "Message sent. Your current draft has been kept.", Le = "This destination is no longer available. Choose a current destination.", Re = "This view has no page to attach.";
function ze(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Be(e, t) {
	if (!t) return e;
	let n = Object.keys(t).filter((n) => !e.modes.includes(n) && t[n]);
	return n.length ? {
		modes: [...e.modes, ...n],
		disabledModes: [...e.disabledModes, ...n],
		reasons: {
			...e.reasons,
			...Object.fromEntries(n.map((e) => [e, t[e]]))
		}
	} : e;
}
function Ve() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function He(e, t, n, r = 6e4) {
	let i = M(new G()), a = M(t);
	a.current = t, A(() => () => i.current.rejectAll(Pe), [t]);
	let { upload: o } = e.useFileUpload(t ?? "chat:no-conversation", {
		displayName: n,
		onComplete: (e) => {
			e.mine && i.current.complete(e.transferId, {
				id: e.transferId,
				name: e.filename,
				size: e.size,
				contentType: e.contentType,
				url: e.downloadUrl,
				...e.width ? { width: e.width } : {},
				...e.height ? { height: e.height } : {}
			});
		}
	}), s = k(async (e) => {
		let t = a.current;
		if (!t) throw new p("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new p(W(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Pe);
		if (n.status === "failed") throw new p(W(n.error));
		if (!n.transferId) throw new p(W(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new p(e instanceof Error ? e.message : W(void 0));
		}
	}, [o, r]);
	return k((e) => Promise.all(e.map(s)), [s]);
}
function Ue({ id: e, value: t, recipients: n, onChange: i, "data-testid": s }) {
	let c = n.filter((e) => !e.group).map((e) => ({
		value: e.id,
		label: e.label,
		...e.disabled ? { disabled: !0 } : {}
	})), l = [...new Set(n.filter((e) => e.group).map((e) => e.group))].map((e) => ({
		label: e,
		options: n.filter((t) => t.group === e).map((e) => ({
			value: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {}
		}))
	}));
	return /* @__PURE__ */ F(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ P(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ P(o, {
			id: e,
			"aria-label": "Chat recipient",
			value: t ?? "",
			size: "sm",
			placeholder: "Choose a destination",
			wrapperClassName: "max-w-[12rem]",
			className: "max-w-[12rem] truncate border-0 bg-transparent pr-7 text-xs font-medium",
			options: c,
			groups: l,
			chevron: "custom",
			...s ? { "data-testid": s } : {},
			onChange: (e) => i(e.target.value)
		})]
	});
}
function We(e) {
	function t(t) {
		return /* @__PURE__ */ P(Ge, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Ge({ rm: n, channel: o, chat: c, context: l, capabilities: u, identity: d, offline: f, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: _, commands: v = [], onAgent: y, callBlock: b, reply: x, mode: S, onModeChange: C, defaultMode: w, draftKey: T, persistDraft: E = !0, claim: D = !1, answersFocus: ne = !1, onReveal: re, disabled: O, offModes: ie, prompts: ae, composerRef: oe, onDraftChange: ce, defaultDraft: le, draft: I, above: L, modeRowEnd: ue, references: R, onRemoveReference: de, modePlaceholders: fe, contextChip: pe, sendWithReferencesOnly: me, console: he, "data-testid": z = "conversation-composer", ...ge }) {
	let _e = t() === "compact", ve = d?.displayName || "You", B = T ?? o ?? `${l.kind}:${l.id}`, be = u.readOnlyReason || "You can read this conversation but not post to it.", V = j(() => {
		let e = m ?? (o ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: o,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === o && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? be,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		o,
		l.title,
		u.maySend,
		be
	]), [xe, Se] = N(null), H = g === void 0 ? xe : g, je = !!H && !V.some((e) => e.id === H), U = je ? {
		id: H,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Le
	} : Te(V, H, h), Pe = V.filter((e) => !e.disabled && !e.unavailableReason).length, W = V.length > 0, G = Be(we({
		capabilities: u,
		hasChat: W,
		choosable: Pe,
		offline: f ?? null,
		chatOffReason: U?.unavailableReason ?? null
	}), ie), We = w && G.modes.includes(w) ? w : G.modes.find((e) => !G.disabledModes.includes(e)) ?? G.modes[0] ?? "chat", [Ge, Ke] = N(We), K = S ?? Ge, q = k((e) => {
		S === void 0 && Ke(e), C?.(e);
	}, [S, C]), qe = `${G.modes.join(",")}|${G.disabledModes.join(",")}`;
	A(() => {
		if (G.modes.includes(K) && !G.disabledModes.includes(K)) return;
		let e = G.modes.find((e) => !G.disabledModes.includes(e));
		e && e !== K && q(e);
	}, [
		qe,
		K,
		q
	]);
	let [Je, Ye] = N(!0), J = l.reference ?? null;
	A(() => {
		Ye(!0);
	}, [J?.id]);
	let Xe = !!U && U.carriesReference !== !1, Ze = !!J && !J.page, Qe = !!U && U.channel !== o, $e = !!J && Je && !(K === "chat" && (!Xe || Ze && Qe)), et = K === "chat" && Xe && Je && !(Ze && Qe) ? J : null, Y = M(0), X = I !== void 0, tt = d?.userId?.trim() || null, Z = tt ? JSON.stringify([
		"actor",
		tt,
		B
	]) : null, nt = E && !X ? JSON.stringify([
		"actor",
		tt,
		B
	]) : B, rt = JSON.stringify([
		B,
		o ?? null,
		d?.userId ?? null,
		U?.id ?? null,
		U?.channel ?? null
	]), it = M(rt);
	it.current !== rt && (it.current = rt, Y.current += 1);
	let at = M(I);
	at.current = I;
	let ot = j(() => {
		if (X || !E || !Z) return le;
		let e = Me(Ve(), Z);
		return e ? {
			html: e,
			files: []
		} : le;
	}, [
		nt,
		X,
		E
	]), st = M(""), ct = k((e, t) => {
		Y.current += 1, st.current = e.html, E && !X && Z && Ne(Ve(), Z, e.html), c?.setTyping?.(De({
			html: e.html,
			mode: K,
			recipientChannel: U?.channel,
			channel: o
		})), ce?.(e, t);
	}, [
		E,
		X,
		Z,
		c,
		K,
		U?.channel,
		o,
		ce
	]);
	A(() => {
		De({
			html: st.current,
			mode: K,
			recipientChannel: U?.channel,
			channel: o
		}) || c?.setTyping?.(!1);
	}, [
		K,
		U?.channel,
		o
	]);
	let lt = K === "chat" && u.mayAttach && U?.attachments && U.channel ? U.channel : null, ut = He(n, lt, ve), [dt, ft] = N(null), Q = M(null), pt = k((e) => {
		Q.current = e, ze(oe, e);
	}, [oe]), mt = k(() => {
		re?.();
		let e = 20, t = () => {
			Q.current ? Q.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [re]), $ = ye(ae), ht = j(() => ({
		isEmpty: () => !Q.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!Q.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: () => Q.current?.focus()
	}), []), gt = k((e) => {
		Se(e), _?.(e), Y.current += 1, ft(null), V.find((t) => t.id === e)?.onSelect?.();
	}, [V, _]), _t = V.filter((e) => e.claim !== !1);
	te({
		channels: D ? Ee(u.maySend || m === void 0 ? o : null, _t) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = _t.find((t) => t.channel === e.channel);
			return q("chat"), t && gt(t.id), mt(), !0;
		}
	});
	let vt = k((e) => {
		if (e.mode === "agent") return !G.modes.includes("agent") || G.disabledModes.includes("agent") ? !1 : (q("agent"), mt(), !0);
		if (!G.modes.includes("chat") || G.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? V.find((e) => e.channel && e.channel === o) ?? (m ? V.find((e) => e.id === "discussion") : U) : t.kind === "huddle" ? _t.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? V.find((e) => e.id === `person:${t.userId}`) ?? null : V.find((e) => e.channel === t.channel) ?? null : U;
		return !n || n.disabled ? !1 : (n.id !== U?.id && gt(n.id), q("chat"), mt(), !0);
	}, [
		G,
		q,
		mt,
		U,
		V,
		m,
		_t,
		o,
		gt
	]);
	ee(vt, ne);
	let yt = j(() => v.filter((e) => !e.modes || e.modes.includes(K)), [v, K]), bt = j(() => yt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [yt]), xt = (e) => {
		if (typeof e == "string") throw new p(e);
		return e !== !1;
	}, St = async (e, t) => {
		if (ft(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !X && Z && Ne(Ve(), Z, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: et ?? (Je ? J : null),
			recipientId: U?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!u.agent?.allowed || f) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = v.filter((e) => !e.modes || e.modes.includes("agent")), i = ke(t), a = Ae(t, r) ?? (i === t ? null : Ae(i, r));
			if (a) {
				let e = Ae(t, [a.command]) ? t : i;
				return !a.command.disabled && xt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (y) return xt(await y(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? xt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Ae(e.text, v.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), xt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!U || U.disabled || U.unavailableReason || f) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!me && (!!et || (R?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !lt) return !1;
		c?.setTyping?.(!1);
		let a = Y.current, s = it.current, l = e.files.length ? await ut(e.files) : [], d = !!U.channel && U.channel === o, p = Oe({
			displayName: ve,
			reply: d ? x?.reply ?? null : null,
			reference: et,
			attachments: l
		}), m = r || Fe(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: p,
			reference: et
		}, g;
		return U.send ? g = await U.send(h) : c ? (c.sendMessage(m, p), g = !0) : g = !1, g ? Y.current !== a || at.current !== I ? (it.current === s && ft(Ie), !1) : (d && x?.clear(), E && !X && Z && Ne(Ve(), Z, ""), !0) : !1;
	}, Ct = !!u.pending, wt = K === "chat" && (!U || !!U.unavailableReason || !!U.disabled), Tt = wt && !$.typed && !O && !f && !Ct, Et = $e && J ? /* @__PURE__ */ P(s, {
		references: [{
			id: J.id,
			label: _e ? J.label.split(" › ").pop() ?? J.label : J.label,
			title: J.label
		}],
		...Tt ? {} : { onRemove: () => {
			Ye(!1), Y.current += 1, de?.(J.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Dt = je && U ? [...V, U] : V, Ot = K === "chat" && Dt.length > 1, kt = K === "chat" && Je && Ze && Qe && Xe, At = K === "chat" && Dt.length > 1 && !Ct ? U?.unavailableReason ?? (U ? null : "Choose a destination.") : null, jt = K === "chat" ? U?.error ?? null : null, Mt = Ot || At || dt || kt || jt || L != null && L !== !1 ? /* @__PURE__ */ F(i, {
		gap: "xs",
		children: [
			L,
			(Ot || At) && /* @__PURE__ */ F(r, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Ot && /* @__PURE__ */ P(Ue, {
					id: `${B}-recipient`,
					value: U?.id ?? null,
					recipients: Dt,
					onChange: gt,
					"data-testid": `${z}-recipient`
				}), At && /* @__PURE__ */ P(a, {
					size: "xs",
					tone: "tertiary",
					title: At,
					className: e("min-w-0", Ot && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${z}-recipient-unavailable`,
					children: /* @__PURE__ */ P("span", {
						className: "truncate",
						children: At
					})
				})]
			}),
			kt && /* @__PURE__ */ P(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Re
			}),
			dt && /* @__PURE__ */ P(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${z}-note`,
				children: dt
			}),
			jt && /* @__PURE__ */ P(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${z}-recipient-error`,
				children: jt
			})
		]
	}) : void 0, Nt = !_e, Pt = Nt && Et || ue ? /* @__PURE__ */ F(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Nt ? Et : null, ue]
	}) : void 0, Ft = !Nt && $e && J ? [{
		id: J.id,
		label: J.label.split(" › ").pop() ?? J.label,
		title: J.label
	}, ...R ?? []] : R, It = (e) => {
		J && e === J.id && (Ye(!1), Y.current += 1), de?.(e);
	}, Lt = {
		...fe,
		...K === "chat" && U?.placeholder ? { chat: U.placeholder } : {},
		...$.typed && $.active ? { [K]: $.active.placeholder ?? "Type your answer and press Enter" } : {}
	}, Rt = Tt ? At ? Pe > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : U?.unavailableReason ?? (U ? be : "Choose a destination.") : null;
	return /* @__PURE__ */ P(se, {
		...ge,
		context: l,
		composerRef: pt,
		"data-testid": z,
		..._e ? { responsive: "pane" } : {},
		console: he ?? !!b,
		dock: b,
		mode: K,
		onModeChange: q,
		modes: G.modes,
		disabledModes: G.disabledModes,
		modeUnavailableReasons: G.reasons,
		chatAvailable: W && !G.reasons.chat,
		contextChip: pe ?? (!J && void 0),
		...Mt ? { above: Mt } : {},
		...$.visible ? { header: /* @__PURE__ */ P(Ce, {
			deck: $,
			input: ht,
			variant: "inset",
			"data-testid": `${z}-prompts`
		}) } : {},
		...Pt ? { modeRowEnd: Pt } : {},
		...Ft ? {
			references: Ft,
			onRemoveReference: It
		} : {},
		modePlaceholders: Lt,
		commands: bt,
		reply: K === "chat" && x?.reply && U?.channel === o ? {
			author: x.reply.author,
			quote: x.reply.text,
			messageId: x.reply.messageId,
			...x.reply.timestamp ? { timestamp: x.reply.timestamp } : {},
			onDismiss: x.clear
		} : null,
		allowAttachments: !!lt,
		...me === void 0 ? {} : { sendWithReferencesOnly: me },
		...Rt ? { readOnly: Rt } : {},
		disabled: !!O || !$.typed && (!!f || wt || K === "agent" && !u.agent?.allowed),
		draftKey: nt,
		...X ? { draft: I } : {},
		...ot === void 0 ? {} : { defaultDraft: ot },
		onDraftChange: ct,
		onSend: (e, t) => St(e, t.mode),
		className: e(ge.className)
	});
}
//#endregion
export { ce as AgentComposerDock, ae as COMPOSER_BREAKPOINTS, v as COMPOSER_CONTEXT_KINDS, g as COMPOSER_CONTEXT_REASONS, ne as COMPOSER_MODE_ORDER, I as CONFIRM_OPTIONS, re as CommandSuggestions, oe as ComposerAttachments, Ce as ComposerPromptDeck, s as ComposerReferences, p as ComposerSendError, se as ContextComposer, C as ConversationInputProvider, T as DocumentSuggestions, c as EMOJI_SHORTCODES, ie as EmojiSuggestions, D as MentionSuggestions, O as RichChatComposer, b as ThreadInputHandoff, fe as answerForOption, Fe as attachmentOnlyText, f as composerCommandArgumentText, _ as composerContextPreset, m as composerDraftOf, d as composerSendErrorReason, E as composerSizeFor, We as createConversationComposer, ge as deckKeyAction, de as defaultOption, h as identityDisplayName, l as matchComposerCommand, w as matchesModeTrigger, pe as parseTypedAnswer, L as promptOptions, u as searchEmoji, R as takesTypedAnswer, y as useComposerFocus, x as useComposerFocusReveal, ye as useComposerPromptDeck, He as useConversationUploads, S as useThreadInput };
