import { t as e } from "../cn-D4QmbyEy.js";
import { c as t, n } from "../Button-C-I3BxWI.js";
import { c as r, l as i, n as a } from "../Text-DqNdYJ7p.js";
import { t as o } from "../Select-DovxLSsz.js";
import { t as s } from "../FormField-CQ27qxWt.js";
import { t as c } from "../Textarea-BwvE1HPn.js";
import { t as l } from "../DecisionPath-B3pT70Ce.js";
import { a as u, c as d, i as f, l as p, n as m, r as h, t as g } from "../composerSendError-jtcERQXu.js";
import { a as _, i as v, n as y, r as ee, t as b } from "../composerContext-BLn1-Nao.js";
import { a as te, i as x, n as S, o as C, r as w, s as T, t as E } from "../ConversationInputs-D6Bhkit6.js";
import { a as D, c as O, i as k, l as ne, n as re, o as A, r as ie, s as j, t as ae, u as M } from "../RichChatComposer-DLCjmujA.js";
import { t as oe } from "../ContextComposer-CDkkNVki.js";
import { t as se } from "../AgentComposerDock-CHfVp7ok.js";
import { useCallback as N, useEffect as P, useId as ce, useMemo as F, useRef as I, useState as L } from "react";
import { jsx as R, jsxs as z } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function le(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function ue(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var de = {
	draft: 0,
	review: 1,
	done: 2
};
function fe({ title: t, recipient: o, defaultMessage: u = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: ee = "Confirm", backLabel: b = "Back", doneActionLabel: te = "Back", onConfirm: x, onCancel: S, onDone: C, onStageChange: w, path: T, autoFocus: E = !0, className: D, "data-testid": O = "composer-confirm-flow" }) {
	let [k, ne] = L(u), re = d !== void 0, A = re ? d : k, ie = N((e) => {
		re || ne(e), f?.(e);
	}, [re, f]), [j, ae] = L("draft"), [M, oe] = L(!1), [se, F] = L(null), [fe, pe] = L(null), B = I(!1), V = I(null), H = I(null), U = I(null), me = ce(), W = A.trim().length > 0, G = N((e) => {
		ae(e), w?.(e);
	}, [w]), K = I(!1);
	P(() => {
		let e = !K.current;
		K.current = !0, !(e && !E) && (j === "draft" ? V.current : j === "review" ? H.current : U.current)?.focus({ preventScroll: !0 });
	}, [j, E]);
	let he = N(() => {
		W && (F(null), G("review"));
	}, [W, G]), ge = N(async () => {
		if (B.current) return;
		B.current = !0, oe(!0), F(null);
		let e;
		try {
			e = await x(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			B.current = !1, oe(!1);
		}
		if (le(e)) {
			F(e.error);
			return;
		}
		pe(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		A,
		x,
		G
	]), q = j === "review" ? h ?? t : j === "done" ? _ : t, _e = `${me}-heading`, J = `${me}-keys`, ve = q || o ? /* @__PURE__ */ z(r, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [q && /* @__PURE__ */ R(a, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: _e,
			className: "min-w-0",
			children: q
		}), o && /* @__PURE__ */ R(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${O}-recipient`,
			children: o
		})]
	}) : null, ye = T ? /* @__PURE__ */ R(l, {
		steps: T.steps,
		current: T.current + de[j],
		"data-testid": `${O}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ z(i, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "done",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ z(i, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": q ? _e : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${O}-done`,
			children: [
				ve,
				/* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${O}-done-message`,
					children: fe ?? v
				}),
				C && /* @__PURE__ */ R(r, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ R(n, {
						size: "sm",
						variant: "ghost",
						onClick: C,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${O}-done-action`,
						children: te
					})
				})
			]
		})]
	}) : j === "review" ? /* @__PURE__ */ z(i, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "review",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ z(i, {
			as: "section",
			gap: "xs",
			ref: H,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": q ? _e : void 0,
			"aria-describedby": J,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${O}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : ue(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), ge()));
			},
			children: [
				ve,
				/* @__PURE__ */ R(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${O}-message`,
					children: A
				}),
				/* @__PURE__ */ z(r, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ R(n, {
							size: "sm",
							variant: "primary",
							disabled: M,
							onClick: () => {
								ge();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${O}-confirm`,
							children: ee
						}),
						/* @__PURE__ */ R(n, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${O}-back`,
							children: b
						}),
						/* @__PURE__ */ R(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: J,
							className: "min-w-0",
							"data-testid": `${O}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				se && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${O}-error`,
					children: se
				}),
				M && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${O}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${O}-note`,
					children: g
				})
			]
		})]
	}) : /* @__PURE__ */ z(i, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "draft",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ z(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), he();
			},
			"aria-labelledby": q ? _e : void 0,
			"data-testid": `${O}-draft`,
			children: [
				ve,
				/* @__PURE__ */ R(s, {
					label: p,
					children: (e) => /* @__PURE__ */ R(c, {
						...e,
						ref: V,
						"aria-describedby": [e["aria-describedby"], J].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							ue(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || he()));
						},
						"data-testid": `${O}-editor`
					})
				}),
				/* @__PURE__ */ z(r, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ R(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !W,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${O}-continue`,
							children: y
						}),
						S && /* @__PURE__ */ R(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${O}-cancel`,
							children: b
						}),
						/* @__PURE__ */ R(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: J,
							className: "min-w-0",
							"data-testid": `${O}-keys`,
							children: "Enter to continue · Shift+Enter for a new line"
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/composerPromptModel.ts
var pe = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function B(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? pe : [];
}
function V(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function H(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function U(e) {
	let t = B(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function me(e, t) {
	if (e.kind === "confirm") {
		let n = B(e)[0];
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
function W(e, t) {
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
function G(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = B(e).find((e) => e.id === t.optionId);
	return `${e.title}: ${n?.label ?? t.optionId}`;
}
function K(e, t, n = {}) {
	let r = [];
	for (let i of e) {
		let e = i, a = /* @__PURE__ */ new Set();
		for (; e && t.has(e.id) && !a.has(e.id);) a.add(e.id), e = n[e.id];
		e && !t.has(e.id) && r.push(e);
	}
	return r;
}
function he(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function ge(e, t) {
	for (let [n, r] of Object.entries(t)) if (r.id === e) return n;
	return null;
}
function q(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function _e(e, t) {
	let { prompt: n, collapsed: r, inputEmpty: i, inDeck: a, busy: o } = t;
	if (!n) return null;
	let s = !!(e.metaKey || e.ctrlKey), c = i || a;
	if (r) return s && e.key === "ArrowDown" ? { type: "expand" } : null;
	if (s && (e.key === "ArrowDown" || e.key === "ArrowUp")) return {
		type: "page",
		delta: e.key === "ArrowDown" ? 1 : -1
	};
	if (n.kind === "compose") return null;
	if (e.key === "Escape" && c) return { type: "collapse" };
	if (s || e.shiftKey) return null;
	let l = H(n), u = c && !e.altKey && (!l || a);
	if (u && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (u && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let d = B(n);
	if (e.key === "Enter" && c && !a) {
		let e = U(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (l ? !e.altKey : !c || e.altKey) return null;
	let f = J(e) ?? e.key.toLowerCase(), p = d.findIndex((e, t) => V(e, t) === f), m = p >= 0 ? d[p] : null;
	return m && !m.disabledReason ? {
		type: "pick",
		optionId: m.id
	} : null;
}
function J(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var ve = [], ye = {};
function Y(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function be(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function xe(e) {
	let t = e ?? ve, [n, r] = L(() => /* @__PURE__ */ new Set()), [i, a] = L(null), [o, s] = L(!1), [c, l] = L(null), [u, d] = L({}), [f, p] = L(null), [m, h] = L(ye), g = I(m);
	g.current = m;
	let _ = F(() => K(t, n, m), [
		t,
		n,
		m
	]), v = q(_, i), y = v >= 0 ? _[v] : null, ee = c != null, b = I(!1), te = t.map((e) => e.id).join("\0");
	P(() => {
		let e = he(t, g.current);
		r((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), h((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [te]);
	let x = _[0]?.id ?? null, S = I(/* @__PURE__ */ new Set());
	P(() => {
		let e = _.some((e) => !S.current.has(e.id));
		for (let e of _) S.current.add(e.id);
		e && s(!1);
	}, [x, _]);
	let C = N(async (e, t) => {
		if (b.current || e.readOnlyReason) return !1;
		b.current = !0, l(e.id), d((t) => {
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
			b.current = !1, l(null);
		}
		return Y(n) ? (d((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : be(n) ? (h((t) => ({
			...t,
			[e.id]: n.next
		})), r((t) => new Set(t).add(e.id)), a(null), !0) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : G(e, t)), !0);
	}, []), w = N(async (e) => {
		let t = y;
		if (!t || t.kind !== "compose" || t.readOnlyReason) return { error: "This question takes no message." };
		if (b.current) return { error: "Still working on the last answer." };
		b.current = !0, l(t.id);
		let n;
		try {
			n = await t.onAnswer({
				kind: "compose",
				message: e
			});
		} catch (e) {
			n = { error: e instanceof Error && e.message ? e.message : "That could not be confirmed. Try again." };
		} finally {
			b.current = !1, l(null);
		}
		return Y(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [y]), T = y ? ge(y.id, m) : null, E = N(() => {
		if (!y || T == null) return !1;
		let e = y.id;
		return h((e) => {
			let { [T]: t, ...n } = e;
			return n;
		}), r((t) => {
			let n = new Set(t);
			return n.delete(T), n.delete(e), n;
		}), a(T), !0;
	}, [y, T]), D = N(() => {
		y && (r((e) => new Set(e).add(y.id)), a(null));
	}, [y]), O = N(async (e) => {
		if (!y) return !1;
		let t = B(y).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : C(y, me(y, t));
	}, [y, C]), k = N(async (e) => {
		if (!y || !H(y)) return !1;
		let t = W(y, e);
		return "error" in t ? (d((e) => ({
			...e,
			[y.id]: t.error
		})), !1) : C(y, t.answer);
	}, [y, C]), ne = N((e) => {
		if (!_.length) return;
		let t = (v + e + _.length) % _.length;
		a(_[t].id);
	}, [_, v]);
	return {
		pending: _,
		active: y,
		index: v,
		collapsed: o,
		busy: ee,
		error: y ? u[y.id] ?? null : null,
		receipt: f,
		visible: _.length > 0 || f != null,
		typed: !o && H(y),
		setCollapsed: s,
		page: ne,
		pick: O,
		answerTyped: k,
		answerCompose: w,
		isFollowUp: T != null,
		back: E,
		finish: D,
		dismissReceipt: () => p(null)
	};
}
var Se = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function Ce({ children: e }) {
	return /* @__PURE__ */ R("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-xs font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var we = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Te({ deck: t, prompts: o, input: s = null, variant: c = "card", className: u, "data-testid": d = "composer-prompt-deck" }) {
	let f = c === "inset", p = xe(t ? null : o), m = t ?? p, h = I(null), g = ce(), { active: _, pending: v, index: y, collapsed: ee, busy: b, error: te, receipt: x } = m, S = I({
		deck: m,
		input: s
	});
	if (S.current = {
		deck: m,
		input: s
	}, P(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing) return;
			let { deck: t, input: n } = S.current, r = e.target, i = !!h.current && !!r && h.current.contains(r), a = !!n && n.contains(r);
			if (!i && !a) return;
			let o = _e({
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
	}, []), !m.visible) return null;
	let C = X(), w = v.length, T = x ? /* @__PURE__ */ z(r, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", f && !ee && _ && "px-3 pb-2"),
		"data-testid": `${d}-receipt`,
		children: [/* @__PURE__ */ R(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${x}`
		}), /* @__PURE__ */ R(n, {
			variant: "link",
			size: "sm",
			onClick: m.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!_ || ee) return /* @__PURE__ */ z(i, {
		gap: "xs",
		className: e("min-w-0", f && "border-b border-border px-3 py-1.5", u),
		"data-composer-prompt-deck": _ ? "collapsed" : "answered",
		"data-deck-variant": c,
		"data-testid": d,
		ref: h,
		children: [_ && /* @__PURE__ */ z(r, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !f && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ R(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: w === 1 ? `1 question waiting · ${_.title}` : `${w} questions waiting · ${_.title}`
				}),
				/* @__PURE__ */ R(n, {
					variant: "link",
					size: "sm",
					onClick: () => m.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${d}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ R(Ce, { children: `${C}↓` })
			]
		}), T]
	});
	let E = B(_), D = H(_), O = _.kind === "compose" && !_.readOnlyReason, k = U(_), ne = `${g}-title`, re = `${g}-question`, A = E.map((e, t) => V(e, t)), ie = [
		E.length ? `${D ? "Alt+" : ""}${A.filter(Boolean).length > 1 ? `${A[0]}–${A[A.length - 1]}` : A[0] ?? ""} choose` : null,
		D ? "type the answer below · Enter send" : k ? `Enter ${k.label}` : null,
		w > 1 ? `${C}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ z(i, {
		gap: "xs",
		className: e("min-w-0", f && "border-b border-border", u),
		"data-composer-prompt-deck": "expanded",
		"data-deck-variant": c,
		"data-testid": d,
		ref: h,
		children: [/* @__PURE__ */ z("section", {
			role: "group",
			"aria-labelledby": ne,
			"aria-describedby": re,
			"aria-busy": b || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", we, !f && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": _.id,
			"data-composer-prompt-kind": _.kind,
			"data-testid": `${d}-card`,
			children: [
				_.path && !O && /* @__PURE__ */ R(l, {
					steps: _.path.steps,
					current: _.path.current,
					"data-testid": `${d}-path`
				}),
				/* @__PURE__ */ z(r, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [_.eyebrow && /* @__PURE__ */ R(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: _.eyebrow
							}), /* @__PURE__ */ R(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: ne,
								title: _.title,
								children: _.title
							})]
						}),
						w > 1 && /* @__PURE__ */ z(r, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ R(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${d}-position`,
									children: `${y + 1} of ${w}`
								}),
								/* @__PURE__ */ R(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => m.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${d}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ R(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => m.page(1),
									"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
									"data-testid": `${d}-next`,
									children: "›"
								})
							]
						}),
						/* @__PURE__ */ R(n, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Escape",
							onClick: () => {
								m.setCollapsed(!0), s?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${d}-hide`,
							children: "Hide"
						})
					]
				}),
				w > 1 && /* @__PURE__ */ R(r, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${d}-progress`,
					children: v.map((t, n) => /* @__PURE__ */ R(i, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === y ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				_.fields && _.fields.length > 0 && /* @__PURE__ */ R("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${d}-fields`,
					children: _.fields.map((t, n) => /* @__PURE__ */ z("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ R("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ R("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", Se[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ R(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: re,
					className: "min-w-0",
					children: _.question
				}),
				_.readOnlyReason ? /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${d}-read-only`,
					children: _.readOnlyReason
				}) : O ? /* @__PURE__ */ R(fe, {
					recipient: _.compose?.recipient,
					defaultMessage: _.compose?.initialMessage,
					messageLabel: _.compose?.messageLabel,
					placeholder: _.compose?.placeholder,
					reviewTitle: _.compose?.reviewTitle,
					note: _.compose?.note,
					doneTitle: _.compose?.doneTitle,
					doneMessage: _.compose?.doneMessage,
					continueLabel: _.compose?.continueLabel,
					confirmLabel: _.compose?.confirmLabel,
					backLabel: _.compose?.backLabel,
					doneActionLabel: _.compose?.doneActionLabel,
					path: _.path,
					onConfirm: (e) => m.answerCompose(e),
					onCancel: m.isFollowUp ? () => {
						m.back();
					} : _.compose?.onCancel ? () => {
						_.compose?.onCancel?.(), m.finish();
					} : void 0,
					onDone: () => {
						m.finish(), s?.focus();
					},
					"data-testid": `${d}-compose`
				}, _.id) : E.length > 0 && /* @__PURE__ */ R(r, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: E.map((e, t) => {
						let r = A[t], o = r ? `${D ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ z(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ z(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: b || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${g}-hint-${t}` : void 0,
								onClick: () => {
									m.pick(e.id).then((e) => {
										e && s?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": k?.id === e.id || void 0,
								"data-testid": `${d}-option-${e.id}`,
								children: [r && /* @__PURE__ */ R(Ce, { children: r }), e.label]
							}), e.hint && /* @__PURE__ */ R(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${g}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				te && !O && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${d}-error`,
					children: te
				}),
				b && !O && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${d}-busy`,
					children: "Working…"
				}),
				!_.readOnlyReason && !O && /* @__PURE__ */ R(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${d}-keys`,
					children: ie
				})
			]
		}), T]
	});
}
function Ee(e) {
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
function De(e, t, n) {
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
function Oe(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function ke(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Ae(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && ke(e.html).length > 0;
}
function je(e) {
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
function Me(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Ne(e, t) {
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
var Pe = "ui.conversation-draft:";
function Fe(e) {
	return `${Pe}${e}`;
}
function Ie(e, t) {
	try {
		let n = e?.getItem(Fe(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && ke(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Le(e, t, n) {
	try {
		ke(n) ? e?.setItem(Fe(t), JSON.stringify({ html: n })) : e?.removeItem(Fe(t));
	} catch {}
}
var Z = "Conversation changed; draft retained.";
function Re(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function ze(e) {
	return e.map((e) => e.name).join(", ");
}
var Be = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Re(`timed out (${n})`)));
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
}, Ve = "Message sent. Your current draft has been kept.", He = "This destination is no longer available. Choose a current destination.", Ue = "This view has no page to attach.";
function We(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ge(e, t) {
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
function Ke() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function qe(e, t, n, r = 6e4) {
	let i = I(new Be()), a = I(t);
	a.current = t, P(() => () => i.current.rejectAll(Z), [t]);
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
	}), s = N(async (e) => {
		let t = a.current;
		if (!t) throw new g("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new g(Re(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Z);
		if (n.status === "failed") throw new g(Re(n.error));
		if (!n.transferId) throw new g(Re(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new g(e instanceof Error ? e.message : Re(void 0));
		}
	}, [o, r]);
	return N((e) => Promise.all(e.map(s)), [s]);
}
function Je({ id: e, value: t, recipients: n, onChange: i, readOnlyWayOut: s, disabled: c, "data-testid": l }) {
	let u = n.filter((e) => !e.group).map((e) => ({
		value: e.id,
		label: e.label,
		...e.disabled ? { disabled: !0 } : {}
	})), d = [...new Set(n.filter((e) => e.group).map((e) => e.group))].map((e) => ({
		label: e,
		options: n.filter((t) => t.group === e).map((e) => ({
			value: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {}
		}))
	}));
	return /* @__PURE__ */ z(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ R(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ R(o, {
			id: e,
			"aria-label": "Chat recipient",
			value: t ?? "",
			size: "sm",
			placeholder: "Choose a destination",
			wrapperClassName: "max-w-[12rem]",
			className: "max-w-[12rem] truncate border-0 bg-transparent pr-7 text-xs font-medium",
			options: u,
			groups: d,
			chevron: "custom",
			...l ? { "data-testid": l } : {},
			...s ? { "data-composer-readonly-allow": s } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => i(e.target.value)
		})]
	});
}
function Ye(e) {
	function t(t) {
		return /* @__PURE__ */ R(Xe, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Xe({ rm: n, channel: o, chat: s, context: c, capabilities: l, identity: d, offline: f, recipients: p, defaultRecipient: m, recipient: h, onRecipientChange: _, commands: v = [], onAgent: y, callBlock: ee, reply: b, mode: x, onModeChange: S, defaultMode: C, draftKey: T, persistDraft: E = !0, claim: D = !1, answersFocus: O = !1, onReveal: k, disabled: ne, offModes: re, prompts: A, composerRef: ie, onDraftChange: j, defaultDraft: ae, draft: M, above: se, modeRowEnd: ce, references: le, onRemoveReference: ue, modePlaceholders: de, contextChip: fe, sendWithReferencesOnly: pe, console: B, "data-testid": V = "conversation-composer", ...H }) {
	let U = t() === "compact", me = d?.displayName || "You", W = T ?? o ?? `${c.kind}:${c.id}`, G = l.readOnlyReason || "You can read this conversation but not post to it.", K = F(() => {
		let e = p ?? (o ? [{
			id: "discussion",
			label: c.title || "This conversation",
			channel: o,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === o && !l.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? G,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		p,
		o,
		c.title,
		l.maySend,
		G
	]), [he, ge] = L(null), q = h === void 0 ? he : h, _e = !!q && !K.some((e) => e.id === q), J = _e ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: He
	} : De(K, q, m), ve = K.filter((e) => !e.disabled && !e.unavailableReason).length, ye = K.length > 0, Y = Ge(Ee({
		capabilities: l,
		hasChat: ye,
		choosable: ve,
		offline: f ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), re), be = C && Y.modes.includes(C) ? C : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Se, Ce] = L(be), X = x ?? Se, we = N((e) => {
		x === void 0 && Ce(e), S?.(e);
	}, [x, S]), ke = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	P(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && we(e);
	}, [
		ke,
		X,
		we
	]);
	let [Pe, Fe] = L(!0), Z = c.reference ?? null;
	P(() => {
		Fe(!0);
	}, [Z?.id]);
	let Re = !!J && J.carriesReference !== !1, Be = !!Z && !Z.page, Ye = !!J && J.channel !== o, Xe = !!Z && Pe && !(X === "chat" && (!Re || Be && Ye)), Ze = X === "chat" && Re && Pe && !(Be && Ye) ? Z : null, Qe = I(0), $e = M !== void 0, et = d?.userId?.trim() || null, Q = et ? JSON.stringify([
		"actor",
		et,
		W
	]) : null, tt = E && !$e ? JSON.stringify([
		"actor",
		et,
		W
	]) : W, nt = JSON.stringify([
		W,
		o ?? null,
		d?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), rt = I(nt);
	rt.current !== nt && (rt.current = nt, Qe.current += 1);
	let it = I(M);
	it.current = M;
	let at = F(() => {
		if ($e || !E || !Q) return ae;
		let e = Ie(Ke(), Q);
		return e ? {
			html: e,
			files: []
		} : ae;
	}, [
		tt,
		$e,
		E
	]), ot = I(""), st = N((e, t) => {
		Qe.current += 1, ot.current = e.html, E && !$e && Q && Le(Ke(), Q, e.html), s?.setTyping?.(Ae({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: o
		})), j?.(e, t);
	}, [
		E,
		$e,
		Q,
		s,
		X,
		J?.channel,
		o,
		j
	]);
	P(() => {
		Ae({
			html: ot.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: o
		}) || s?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		o
	]);
	let ct = X === "chat" && l.mayAttach && J?.attachments && J.channel ? J.channel : null, lt = qe(n, ct, me), [ut, dt] = L(null), ft = I(null), pt = N((e) => {
		ft.current = e, We(ie, e);
	}, [ie]), mt = N(() => {
		k?.();
		let e = 20, t = () => {
			ft.current ? ft.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [k]), $ = xe(A), ht = F(() => ({
		isEmpty: () => !ft.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!ft.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: () => ft.current?.focus()
	}), []), gt = N((e) => {
		ge(e), _?.(e), Qe.current += 1, dt(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, _]), _t = K.filter((e) => e.claim !== !1);
	w({
		channels: D ? Oe(l.maySend || p === void 0 ? o : null, _t) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = _t.find((t) => t.channel === e.channel);
			return we("chat"), t && gt(t.id), mt(), !0;
		}
	});
	let vt = N((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (we("agent"), mt(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? K.find((e) => e.channel && e.channel === o) ?? (p ? K.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? _t.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? K.find((e) => e.id === `person:${t.userId}`) ?? null : K.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && gt(n.id), we("chat"), mt(), !0);
	}, [
		Y,
		we,
		mt,
		J,
		K,
		p,
		_t,
		o,
		gt
	]);
	te(vt, O);
	let yt = F(() => v.filter((e) => !e.modes || e.modes.includes(X)), [v, X]), bt = F(() => yt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [yt]), xt = (e) => {
		if (typeof e == "string") throw new g(e);
		return e !== !1;
	}, St = async (e, t) => {
		if (dt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !$e && Q && Le(Ke(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: Ze ?? (Pe ? Z : null),
			recipientId: J?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!l.agent?.allowed || f) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = v.filter((e) => !e.modes || e.modes.includes("agent")), i = Me(t), a = Ne(t, r) ?? (i === t ? null : Ne(i, r));
			if (a) {
				let e = Ne(t, [a.command]) ? t : i;
				return !a.command.disabled && xt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (y) return xt(await y(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? xt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Ne(e.text, v.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (s?.setTyping?.(!1), xt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || f) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!pe && (!!Ze || (le?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ct) return !1;
		s?.setTyping?.(!1);
		let a = Qe.current, c = rt.current, u = e.files.length ? await lt(e.files) : [], d = !!J.channel && J.channel === o, p = je({
			displayName: me,
			reply: d ? b?.reply ?? null : null,
			reference: Ze,
			attachments: u
		}), m = r || ze(u), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: p,
			reference: Ze
		}, g;
		return J.send ? g = await J.send(h) : s ? (s.sendMessage(m, p), g = !0) : g = !1, g ? Qe.current !== a || it.current !== M ? (rt.current === c && dt(Ve), !1) : (d && b?.clear(), E && !$e && Q && Le(Ke(), Q, ""), !0) : !1;
	}, Ct = !!l.pending, wt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Tt = wt && !$.typed && !ne && !f && !Ct, Et = Xe && Z ? /* @__PURE__ */ R(u, {
		references: [{
			id: Z.id,
			label: U ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Tt ? {} : { onRemove: () => {
			Fe(!1), Qe.current += 1, ue?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Dt = _e && J ? [...K, J] : K, Ot = X === "chat" && Dt.length > 1, kt = X === "chat" && Pe && Be && Ye && Re, At = X === "chat" && Dt.length > 1 && !Ct ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, jt = X === "chat" ? J?.error ?? null : null, Mt = Ot || At || ut || kt || jt || se != null && se !== !1 ? /* @__PURE__ */ z(i, {
		gap: "xs",
		children: [
			se,
			(Ot || At) && /* @__PURE__ */ z(r, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Ot && /* @__PURE__ */ R(Je, {
					id: `${W}-recipient`,
					value: J?.id ?? null,
					recipients: Dt,
					onChange: gt,
					"data-testid": `${V}-recipient`,
					...Tt ? ve > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), At && /* @__PURE__ */ R(a, {
					size: "xs",
					tone: "tertiary",
					title: At,
					className: e("min-w-0", Ot && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${V}-recipient-unavailable`,
					children: /* @__PURE__ */ R("span", {
						className: "truncate",
						children: At
					})
				})]
			}),
			kt && /* @__PURE__ */ R(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ue
			}),
			ut && /* @__PURE__ */ R(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${V}-note`,
				children: ut
			}),
			jt && /* @__PURE__ */ R(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${V}-recipient-error`,
				children: jt
			})
		]
	}) : void 0, Nt = !U, Pt = Nt && Et || ce ? /* @__PURE__ */ z(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Nt ? Et : null, ce]
	}) : void 0, Ft = !Nt && Xe && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...le ?? []] : le, It = (e) => {
		Z && e === Z.id && (Fe(!1), Qe.current += 1), ue?.(e);
	}, Lt = {
		...de,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...$.typed && $.active ? { [X]: $.active.placeholder ?? "Type your answer and press Enter" } : {}
	}, Rt = Tt ? At ? ve > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? G : "Choose a destination.") : null;
	return /* @__PURE__ */ R(oe, {
		...H,
		context: c,
		composerRef: pt,
		"data-testid": V,
		...U ? { responsive: "pane" } : {},
		console: B ?? !!ee,
		dock: ee,
		mode: X,
		onModeChange: we,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: ye && !Y.reasons.chat,
		contextChip: fe ?? (!Z && void 0),
		...Mt ? { above: Mt } : {},
		...$.visible ? { header: /* @__PURE__ */ R(Te, {
			deck: $,
			input: ht,
			variant: "inset",
			"data-testid": `${V}-prompts`
		}) } : {},
		...Pt ? { modeRowEnd: Pt } : {},
		...Ft ? {
			references: Ft,
			onRemoveReference: It
		} : {},
		modePlaceholders: Lt,
		commands: bt,
		reply: X === "chat" && b?.reply && J?.channel === o ? {
			author: b.reply.author,
			quote: b.reply.text,
			messageId: b.reply.messageId,
			...b.reply.timestamp ? { timestamp: b.reply.timestamp } : {},
			onDismiss: b.clear
		} : null,
		allowAttachments: !!ct,
		...pe === void 0 ? {} : { sendWithReferencesOnly: pe },
		...Rt ? { readOnly: Rt } : {},
		disabled: !!ne || !$.typed && (!!f || wt || X === "agent" && !l.agent?.allowed),
		draftKey: tt,
		...$e ? { draft: M } : {},
		...at === void 0 ? {} : { defaultDraft: at },
		onDraftChange: st,
		onSend: (e, t) => St(e, t.mode),
		className: e(H.className)
	});
}
//#endregion
export { se as AgentComposerDock, ae as COMPOSER_BREAKPOINTS, b as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, re as COMPOSER_MODE_ORDER, pe as CONFIRM_OPTIONS, A as CommandSuggestions, M as ComposerAttachments, fe as ComposerConfirmFlow, Te as ComposerPromptDeck, u as ComposerReferences, g as ComposerSendError, oe as ContextComposer, E as ConversationInputProvider, O as DocumentSuggestions, d as EMOJI_SHORTCODES, j as EmojiSuggestions, ne as MentionSuggestions, ie as RichChatComposer, S as ThreadInputHandoff, me as answerForOption, ze as attachmentOnlyText, h as composerCommandArgumentText, ee as composerContextPreset, _ as composerDraftOf, m as composerSendErrorReason, k as composerSizeFor, Ye as createConversationComposer, _e as deckKeyAction, U as defaultOption, v as identityDisplayName, f as matchComposerCommand, D as matchesModeTrigger, W as parseTypedAnswer, B as promptOptions, p as searchEmoji, H as takesTypedAnswer, x as useComposerFocus, C as useComposerFocusReveal, xe as useComposerPromptDeck, qe as useConversationUploads, T as useThreadInput };
