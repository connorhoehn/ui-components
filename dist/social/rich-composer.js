import { t as e } from "../cn-D4QmbyEy.js";
import { c as t, n } from "../Button-uREUOWUk.js";
import { c as r, l as i, n as a } from "../Text-DtCnB-EA.js";
import { t as o } from "../Select-DcKBWGgP.js";
import { a as s, c, i as l, l as u, n as d, r as f, t as p } from "../composerSendError-CGnAqRRn.js";
import { a as m, i as h, n as g, r as ee, t as _ } from "../composerContext-BLn1-Nao.js";
import { a as te, i as v, n as y, o as b, r as x, s as S, t as C } from "../ConversationInputs-B2Y9iIaf.js";
import { a as w, c as T, i as E, l as D, n as O, o as ne, r as re, s as ie, t as ae, u as oe } from "../RichChatComposer-Dxj26F6X.js";
import { t as se } from "../ContextComposer-DQPAW4GB.js";
import { t as ce } from "../AgentComposerDock-BOrS_xrj.js";
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
	let t = e ?? ve, [n, r] = N(() => /* @__PURE__ */ new Set()), [i, a] = N(null), [o, s] = N(!1), [c, l] = N(null), [u, d] = N({}), [f, p] = N(null), m = j(() => he(t, n), [t, n]), h = z(m, i), g = h >= 0 ? m[h] : null, ee = c != null, _ = M(!1), te = t.map((e) => e.id).join("\0");
	A(() => {
		r((e) => {
			let n = new Set(t.map((e) => e.id)), r = new Set([...e].filter((e) => n.has(e)));
			return r.size === e.size ? e : r;
		});
	}, [te]);
	let v = m[0]?.id ?? null, y = M(/* @__PURE__ */ new Set());
	A(() => {
		let e = m.some((e) => !y.current.has(e.id));
		for (let e of m) y.current.add(e.id);
		e && s(!1);
	}, [v, m]);
	let b = k(async (e, t) => {
		if (_.current || e.readOnlyReason) return !1;
		_.current = !0, l(e.id), d((t) => {
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
			_.current = !1, l(null);
		}
		return B(n) ? (d((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : me(e, t)), !0);
	}, []), x = k(async (e) => {
		if (!g) return !1;
		let t = L(g).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : b(g, fe(g, t));
	}, [g, b]), S = k(async (e) => {
		if (!g || !R(g)) return !1;
		let t = pe(g, e);
		return "error" in t ? (d((e) => ({
			...e,
			[g.id]: t.error
		})), !1) : b(g, t.answer);
	}, [g, b]), C = k((e) => {
		if (!m.length) return;
		let t = (h + e + m.length) % m.length;
		a(m[t].id);
	}, [m, h]);
	return {
		pending: m,
		active: g,
		index: h,
		collapsed: o,
		busy: ee,
		error: g ? u[g.id] ?? null : null,
		receipt: f,
		visible: m.length > 0 || f != null,
		typed: !o && R(g),
		setCollapsed: s,
		page: C,
		pick: x,
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
function Se({ deck: t, prompts: o, input: s = null, className: c, "data-testid": l = "composer-prompt-deck" }) {
	let u = ye(t ? null : o), d = t ?? u, f = M(null), p = le(), { active: m, pending: h, index: g, collapsed: ee, busy: _, error: te, receipt: v } = d, y = M({
		deck: d,
		input: s
	});
	if (y.current = {
		deck: d,
		input: s
	}, A(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing) return;
			let { deck: t, input: n } = y.current, r = e.target, i = !!f.current && !!r && f.current.contains(r), a = !!n && n.contains(r);
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
	}, []), !d.visible) return null;
	let b = xe(), x = h.length, S = v ? /* @__PURE__ */ F(r, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: "min-w-0",
		"data-testid": `${l}-receipt`,
		children: [/* @__PURE__ */ P(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${v}`
		}), /* @__PURE__ */ P(n, {
			variant: "link",
			size: "sm",
			onClick: d.dismissReceipt,
			children: "Dismiss"
		})]
	}) : null;
	if (!m || ee) return /* @__PURE__ */ F(i, {
		gap: "xs",
		className: e("min-w-0", c),
		"data-composer-prompt-deck": m ? "collapsed" : "answered",
		"data-testid": l,
		ref: f,
		children: [m && /* @__PURE__ */ F(r, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: "min-w-0 rounded-md border border-border bg-surface-secondary px-3 py-1.5",
			children: [
				/* @__PURE__ */ P(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: x === 1 ? `1 question waiting · ${m.title}` : `${x} questions waiting · ${m.title}`
				}),
				/* @__PURE__ */ P(n, {
					variant: "link",
					size: "sm",
					onClick: () => d.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-testid": `${l}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ P(V, { children: `${b}↓` })
			]
		}), S]
	});
	let C = L(m), w = R(m), T = de(m), E = `${p}-title`, D = `${p}-question`, O = C.map((e, t) => ue(e, t)), ne = [
		C.length ? `${w ? "Alt+" : ""}${O.filter(Boolean).length > 1 ? `${O[0]}–${O[O.length - 1]}` : O[0] ?? ""} choose` : null,
		w ? "type the answer below · Enter send" : T ? `Enter ${T.label}` : null,
		x > 1 ? `${b}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ F(i, {
		gap: "xs",
		className: e("min-w-0", c),
		"data-composer-prompt-deck": "expanded",
		"data-testid": l,
		ref: f,
		children: [/* @__PURE__ */ F("section", {
			role: "group",
			"aria-labelledby": E,
			"aria-describedby": D,
			"aria-busy": _ || void 0,
			className: "flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-surface px-3 py-2.5",
			"data-composer-prompt": m.id,
			"data-composer-prompt-kind": m.kind,
			"data-testid": `${l}-card`,
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
							children: [m.eyebrow && /* @__PURE__ */ P(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: m.eyebrow
							}), /* @__PURE__ */ P(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: E,
								title: m.title,
								children: m.title
							})]
						}),
						x > 1 && /* @__PURE__ */ F(r, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ P(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${l}-position`,
									children: `${g + 1} of ${x}`
								}),
								/* @__PURE__ */ P(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => d.page(-1),
									"data-testid": `${l}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ P(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => d.page(1),
									"data-testid": `${l}-next`,
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
								d.setCollapsed(!0), s?.focus();
							},
							"data-testid": `${l}-hide`,
							children: "Hide"
						})
					]
				}),
				x > 1 && /* @__PURE__ */ P(r, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${l}-progress`,
					children: h.map((t, n) => /* @__PURE__ */ P(i, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === g ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				m.fields && m.fields.length > 0 && /* @__PURE__ */ P("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${l}-fields`,
					children: m.fields.map((t, n) => /* @__PURE__ */ F("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ P("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ P("dd", {
							className: e("m-0 min-w-0 break-words text-sm font-normal", be[t.tone ?? "neutral"], t.mono && "font-mono"),
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
					id: D,
					className: "min-w-0",
					children: m.question
				}),
				m.readOnlyReason ? /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${l}-read-only`,
					children: m.readOnlyReason
				}) : C.length > 0 && /* @__PURE__ */ P(r, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: C.map((e, t) => {
						let r = O[t], o = r ? `${w ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ F(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ F(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: _ || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${p}-hint-${t}` : void 0,
								onClick: () => {
									d.pick(e.id).then((e) => {
										e && s?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": T?.id === e.id || void 0,
								"data-testid": `${l}-option-${e.id}`,
								children: [r && /* @__PURE__ */ P(V, { children: r }), e.label]
							}), e.hint && /* @__PURE__ */ P(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${p}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				te && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${l}-error`,
					children: te
				}),
				_ && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${l}-busy`,
					children: "Working…"
				}),
				!m.readOnlyReason && /* @__PURE__ */ P(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${l}-keys`,
					children: ne
				})
			]
		}), S]
	});
}
function Ce(e) {
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
function we(e, t, n) {
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
function Te(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Ee(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function De(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Ee(e.html).length > 0;
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
var H = "ui.conversation-draft:";
function je(e) {
	return `${H}${e}`;
}
function Me(e, t) {
	try {
		let n = e?.getItem(je(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Ee(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ne(e, t, n) {
	try {
		Ee(n) ? e?.setItem(je(t), JSON.stringify({ html: n })) : e?.removeItem(je(t));
	} catch {}
}
var U = "Conversation changed; draft retained.";
function W(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Pe(e) {
	return e.map((e) => e.name).join(", ");
}
var Fe = class {
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
	let i = M(new Fe()), a = M(t);
	a.current = t, A(() => () => i.current.rejectAll(U), [t]);
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
		if (a.current !== t) throw Error(U);
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
		className: "ml-1 min-w-0 self-start rounded-md border border-border bg-surface pl-2",
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
function G(e) {
	function t(t) {
		return /* @__PURE__ */ P(We, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function We({ rm: n, channel: o, chat: c, context: l, capabilities: u, identity: d, offline: f, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: ee, commands: _ = [], onAgent: v, callBlock: y, reply: b, mode: S, onModeChange: C, defaultMode: w, draftKey: T, persistDraft: E = !0, claim: D = !1, answersFocus: O = !1, onReveal: ne, disabled: re, offModes: ie, prompts: ae, composerRef: oe, onDraftChange: ce, defaultDraft: le, draft: I, above: L, modeRowEnd: ue, references: R, onRemoveReference: de, modePlaceholders: fe, contextChip: pe, sendWithReferencesOnly: me, console: he, "data-testid": z = "conversation-composer", ...ge }) {
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
	]), [xe, Ee] = N(null), H = g === void 0 ? xe : g, je = !!H && !V.some((e) => e.id === H), U = je ? {
		id: H,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Le
	} : we(V, H, h), W = V.filter((e) => !e.disabled && !e.unavailableReason).length, Fe = V.length > 0, G = Be(Ce({
		capabilities: u,
		hasChat: Fe,
		choosable: W,
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
		ne?.();
		let e = 20, t = () => {
			Q.current ? Q.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [ne]), $ = ye(ae), ht = j(() => ({
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
		Ee(e), ee?.(e), Y.current += 1, ft(null), V.find((t) => t.id === e)?.onSelect?.();
	}, [V, ee]), _t = V.filter((e) => e.claim !== !1);
	x({
		channels: D ? Te(u.maySend || m === void 0 ? o : null, _t) : [],
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
	te(vt, O);
	let yt = j(() => _.filter((e) => !e.modes || e.modes.includes(K)), [_, K]), bt = j(() => yt.map((e) => ({
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
			let r = _.filter((e) => !e.modes || e.modes.includes("agent")), i = ke(t), a = Ae(t, r) ?? (i === t ? null : Ae(i, r));
			if (a) {
				let e = Ae(t, [a.command]) ? t : i;
				return !a.command.disabled && xt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (v) return xt(await v(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? xt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Ae(e.text, _.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), xt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!U || U.disabled || U.unavailableReason || f) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!me && (!!et || (R?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !lt) return !1;
		c?.setTyping?.(!1);
		let a = Y.current, s = it.current, l = e.files.length ? await ut(e.files) : [], d = !!U.channel && U.channel === o, p = Oe({
			displayName: ve,
			reply: d ? b?.reply ?? null : null,
			reference: et,
			attachments: l
		}), m = r || Pe(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: p,
			reference: et
		}, g;
		return U.send ? g = await U.send(h) : c ? (c.sendMessage(m, p), g = !0) : g = !1, g ? Y.current !== a || at.current !== I ? (it.current === s && ft(Ie), !1) : (d && b?.clear(), E && !X && Z && Ne(Ve(), Z, ""), !0) : !1;
	}, Ct = $e && J ? /* @__PURE__ */ P(s, {
		references: [{
			id: J.id,
			label: _e ? J.label.split(" › ").pop() ?? J.label : J.label,
			title: J.label
		}],
		onRemove: () => {
			Ye(!1), Y.current += 1, de?.(J.id);
		},
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, wt = je && U ? [...V, U] : V, Tt = K === "chat" && wt.length > 1, Et = K === "chat" && Je && Ze && Qe && Xe, Dt = K === "chat" && wt.length > 1 ? U?.unavailableReason ?? (U ? null : "Choose a destination.") : null, Ot = K === "chat" ? U?.error ?? null : null, kt = $.visible || Tt || Dt || dt || Et || Ot || L != null && L !== !1 ? /* @__PURE__ */ F(i, {
		gap: "xs",
		children: [
			$.visible && /* @__PURE__ */ P(Se, {
				deck: $,
				input: ht,
				"data-testid": `${z}-prompts`
			}),
			L,
			Tt && /* @__PURE__ */ P(Ue, {
				id: `${B}-recipient`,
				value: U?.id ?? null,
				recipients: wt,
				onChange: gt,
				"data-testid": `${z}-recipient`
			}),
			Dt && /* @__PURE__ */ P(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				"data-testid": `${z}-recipient-unavailable`,
				children: Dt
			}),
			Et && /* @__PURE__ */ P(a, {
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
			Ot && /* @__PURE__ */ P(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${z}-recipient-error`,
				children: Ot
			})
		]
	}) : void 0, At = !_e, jt = At && Ct || ue ? /* @__PURE__ */ F(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [At ? Ct : null, ue]
	}) : void 0, Mt = !At && $e && J ? [{
		id: J.id,
		label: J.label.split(" › ").pop() ?? J.label,
		title: J.label
	}, ...R ?? []] : R, Nt = (e) => {
		J && e === J.id && (Ye(!1), Y.current += 1), de?.(e);
	}, Pt = {
		...fe,
		...K === "chat" && U?.placeholder ? { chat: U.placeholder } : {},
		...$.typed && $.active ? { [K]: $.active.placeholder ?? "Type your answer and press Enter" } : {}
	}, Ft = K === "chat" && (!U || !!U.unavailableReason || !!U.disabled);
	return /* @__PURE__ */ P(se, {
		...ge,
		context: l,
		composerRef: pt,
		"data-testid": z,
		..._e ? { responsive: "pane" } : {},
		console: he ?? !!y,
		dock: y,
		mode: K,
		onModeChange: q,
		modes: G.modes,
		disabledModes: G.disabledModes,
		modeUnavailableReasons: G.reasons,
		chatAvailable: Fe && !G.reasons.chat,
		contextChip: pe ?? (!J && void 0),
		...kt ? { above: kt } : {},
		...jt ? { modeRowEnd: jt } : {},
		...Mt ? {
			references: Mt,
			onRemoveReference: Nt
		} : {},
		modePlaceholders: Pt,
		commands: bt,
		reply: K === "chat" && b?.reply && U?.channel === o ? {
			author: b.reply.author,
			quote: b.reply.text,
			messageId: b.reply.messageId,
			...b.reply.timestamp ? { timestamp: b.reply.timestamp } : {},
			onDismiss: b.clear
		} : null,
		allowAttachments: !!lt,
		...me === void 0 ? {} : { sendWithReferencesOnly: me },
		disabled: !!re || !$.typed && (!!f || Ft || K === "agent" && !u.agent?.allowed),
		draftKey: nt,
		...X ? { draft: I } : {},
		...ot === void 0 ? {} : { defaultDraft: ot },
		onDraftChange: ct,
		onSend: (e, t) => St(e, t.mode),
		className: e(ge.className)
	});
}
//#endregion
export { ce as AgentComposerDock, ae as COMPOSER_BREAKPOINTS, _ as COMPOSER_CONTEXT_KINDS, g as COMPOSER_CONTEXT_REASONS, O as COMPOSER_MODE_ORDER, I as CONFIRM_OPTIONS, ne as CommandSuggestions, oe as ComposerAttachments, Se as ComposerPromptDeck, s as ComposerReferences, p as ComposerSendError, se as ContextComposer, C as ConversationInputProvider, T as DocumentSuggestions, c as EMOJI_SHORTCODES, ie as EmojiSuggestions, D as MentionSuggestions, re as RichChatComposer, y as ThreadInputHandoff, fe as answerForOption, Pe as attachmentOnlyText, f as composerCommandArgumentText, ee as composerContextPreset, m as composerDraftOf, d as composerSendErrorReason, E as composerSizeFor, G as createConversationComposer, ge as deckKeyAction, de as defaultOption, h as identityDisplayName, l as matchComposerCommand, w as matchesModeTrigger, pe as parseTypedAnswer, L as promptOptions, u as searchEmoji, R as takesTypedAnswer, v as useComposerFocus, b as useComposerFocusReveal, ye as useComposerPromptDeck, He as useConversationUploads, S as useThreadInput };
