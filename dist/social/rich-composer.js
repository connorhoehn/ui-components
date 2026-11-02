import { t as e } from "../cn-D4QmbyEy.js";
import { r as t } from "../ToastProvider-CJAceUvq.js";
import { c as n, n as r } from "../Button-C-I3BxWI.js";
import { c as i, l as a, n as o } from "../Text-Cv8fPFPw.js";
import { t as s } from "../Select-DovxLSsz.js";
import { t as c } from "../FormField-CQ27qxWt.js";
import { t as l } from "../Textarea-BwvE1HPn.js";
import { t as u } from "../DecisionPath-BvmAep_H.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-DbyF0DW9.js";
import { a as v, i as y, n as ee, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as C, o as w, r as T, s as ne, t as E } from "../ConversationInputs-IPP6DL_j.js";
import { a as D, c as re, i as ie, l as O, n as k, o as ae, r as A, s as j, t as M, u as N } from "../RichChatComposer-alkaGJel.js";
import { t as oe } from "../ContextComposer-Bnup7QEH.js";
import { t as P } from "../AgentComposerDock-B6NPYk0B.js";
import { useCallback as F, useEffect as I, useId as se, useMemo as ce, useRef as L, useState as R } from "react";
import { jsx as z, jsxs as B } from "react/jsx-runtime";
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
function fe({ title: t, recipient: n, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: ee = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: C, onStageChange: w, path: T, autoFocus: ne = !0, className: E, "data-testid": D = "composer-confirm-flow" }) {
	let [re, ie] = R(s), O = d !== void 0, k = O ? d : re, ae = F((e) => {
		O || ie(e), f?.(e);
	}, [O, f]), [A, j] = R("draft"), [M, N] = R(!1), [oe, P] = R(null), [ce, fe] = R(null), pe = L(!1), V = L(null), H = L(null), U = L(null), me = se(), he = k.trim().length > 0, W = F((e) => {
		j(e), w?.(e);
	}, [w]), ge = L(!1);
	I(() => {
		let e = !ge.current;
		ge.current = !0, !(e && !ne) && (A === "draft" ? V.current : A === "review" ? H.current : U.current)?.focus({ preventScroll: !0 });
	}, [A, ne]);
	let G = F(() => {
		he && (P(null), W("review"));
	}, [he, W]), _e = F(async () => {
		if (pe.current) return;
		pe.current = !0, N(!0), P(null);
		let e;
		try {
			e = await te(k);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			pe.current = !1, N(!1);
		}
		if (le(e)) {
			P(e.error);
			return;
		}
		fe(e && "receipt" in e ? e.receipt : null), W("done");
	}, [
		k,
		te,
		W
	]), K = A === "review" ? h ?? t : A === "done" ? _ : t, q = `${me}-heading`, ve = `${me}-keys`, J = K || n ? /* @__PURE__ */ B(i, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [K && /* @__PURE__ */ z(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: q,
			className: "min-w-0",
			children: K
		}), n && /* @__PURE__ */ z(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${D}-recipient`,
			children: n
		})]
	}) : null, ye = T ? /* @__PURE__ */ z(u, {
		steps: T.steps,
		current: T.current + de[A],
		"data-testid": `${D}-path`
	}) : null;
	return A === "done" ? /* @__PURE__ */ B(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "done",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(a, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": K ? q : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${D}-done`,
			children: [
				J,
				/* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-done-message`,
					children: ce ?? v
				}),
				C && /* @__PURE__ */ z(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ z(r, {
						size: "sm",
						variant: "ghost",
						onClick: C,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${D}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : A === "review" ? /* @__PURE__ */ B(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "review",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(a, {
			as: "section",
			gap: "xs",
			ref: H,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": K ? q : void 0,
			"aria-describedby": ve,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${D}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), W("draft")) : ue(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				J,
				/* @__PURE__ */ z(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${D}-message`,
					children: k
				}),
				/* @__PURE__ */ B(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(r, {
							size: "sm",
							variant: "primary",
							disabled: M,
							onClick: () => {
								_e();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${D}-confirm`,
							children: ee
						}),
						/* @__PURE__ */ z(r, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => W("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${D}-back`,
							children: b
						}),
						/* @__PURE__ */ z(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
							className: "min-w-0",
							"data-testid": `${D}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				oe && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${D}-error`,
					children: oe
				}),
				M && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${D}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-note`,
					children: g
				})
			]
		})]
	}) : /* @__PURE__ */ B(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "draft",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(a, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), G();
			},
			"aria-labelledby": K ? q : void 0,
			"data-testid": `${D}-draft`,
			children: [
				J,
				/* @__PURE__ */ z(c, {
					label: p,
					children: (e) => /* @__PURE__ */ z(l, {
						...e,
						ref: V,
						"aria-describedby": [e["aria-describedby"], ve].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: k,
						placeholder: m,
						onChange: (e) => ae(e.target.value),
						onKeyDown: (e) => {
							ue(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || G()));
						},
						"data-testid": `${D}-editor`
					})
				}),
				/* @__PURE__ */ B(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(r, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !he,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${D}-continue`,
							children: y
						}),
						S && /* @__PURE__ */ z(r, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${D}-cancel`,
							children: b
						}),
						/* @__PURE__ */ z(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
							className: "min-w-0",
							"data-testid": `${D}-keys`,
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
function V(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? pe : [];
}
function H(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function U(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function me(e) {
	let t = V(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function he(e, t) {
	if (e.kind === "confirm") {
		let n = V(e)[0];
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
function ge(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = V(e).find((e) => e.id === t.optionId);
	return `${e.title}: ${n?.label ?? t.optionId}`;
}
function G(e, t, n = {}) {
	let r = [];
	for (let i of e) {
		let e = i, a = /* @__PURE__ */ new Set();
		for (; e && t.has(e.id) && !a.has(e.id);) a.add(e.id), e = n[e.id];
		e && !t.has(e.id) && r.push(e);
	}
	return r;
}
function _e(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function K(e, t) {
	for (let [n, r] of Object.entries(t)) if (r.id === e) return n;
	return null;
}
function q(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function ve(e, t) {
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
	let l = U(n), u = c && !e.altKey && (!l || a);
	if (u && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (u && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let d = V(n);
	if (e.key === "Enter" && c && !a) {
		let e = me(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (l ? !e.altKey : !c || e.altKey) return null;
	let f = J(e) ?? e.key.toLowerCase(), p = d.findIndex((e, t) => H(e, t) === f), m = p >= 0 ? d[p] : null;
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
var ye = [], be = {};
function Y(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function xe(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Se(e) {
	let t = e ?? ye, [n, r] = R(() => /* @__PURE__ */ new Set()), [i, a] = R(null), [o, s] = R(!1), [c, l] = R(null), [u, d] = R({}), [f, p] = R(null), [m, h] = R(be), g = L(m);
	g.current = m;
	let _ = ce(() => G(t, n, m), [
		t,
		n,
		m
	]), v = q(_, i), y = v >= 0 ? _[v] : null, ee = c != null, b = L(!1), x = t.map((e) => e.id).join("\0");
	I(() => {
		let e = _e(t, g.current);
		r((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), h((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [x]);
	let te = _[0]?.id ?? null, S = L(/* @__PURE__ */ new Set());
	I(() => {
		let e = _.some((e) => !S.current.has(e.id));
		for (let e of _) S.current.add(e.id);
		e && s(!1);
	}, [te, _]);
	let C = F(async (e, t) => {
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
		})), !1) : xe(n) ? (h((t) => ({
			...t,
			[e.id]: n.next
		})), r((t) => new Set(t).add(e.id)), a(null), !0) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : ge(e, t)), !0);
	}, []), w = F(async (e) => {
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
	}, [y]), T = y ? K(y.id, m) : null, ne = F(() => {
		if (!y || T == null) return !1;
		let e = y.id;
		return h((e) => {
			let { [T]: t, ...n } = e;
			return n;
		}), r((t) => {
			let n = new Set(t);
			return n.delete(T), n.delete(e), n;
		}), a(T), !0;
	}, [y, T]), E = F(() => {
		y && (r((e) => new Set(e).add(y.id)), a(null));
	}, [y]), D = F(async (e) => {
		if (!y) return !1;
		let t = V(y).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : C(y, he(y, t));
	}, [y, C]), re = F(async (e) => {
		if (!y || !U(y)) return !1;
		let t = W(y, e);
		return "error" in t ? (d((e) => ({
			...e,
			[y.id]: t.error
		})), !1) : C(y, t.answer);
	}, [y, C]), ie = F((e) => {
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
		typed: !o && U(y),
		setCollapsed: s,
		page: ie,
		pick: D,
		answerTyped: re,
		answerCompose: w,
		isFollowUp: T != null,
		back: ne,
		finish: E,
		dismissReceipt: () => p(null)
	};
}
var Ce = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function we({ children: e }) {
	return /* @__PURE__ */ z("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Te = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Ee({ deck: t, prompts: n, input: s = null, variant: c = "card", className: d, "data-testid": f = "composer-prompt-deck" }) {
	let p = c === "inset", m = Se(t ? null : n), h = t ?? m, g = L(null), _ = se(), v = L(null), [y, ee] = R({
		id: "",
		text: ""
	}), { active: b, pending: x, index: te, collapsed: S, busy: C, error: w, receipt: T } = h, ne = y.id === b?.id ? y.text : "", E = !s && h.typed && !b?.readOnlyReason, D = async () => {
		await h.answerTyped(ne) && ee({
			id: "",
			text: ""
		});
	}, re = L({
		deck: h,
		input: s
	});
	if (re.current = {
		deck: h,
		input: s
	}, I(() => {
		if (!b || S || b.readOnlyReason || b.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = re.current.input;
			t && !g.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : v.current ? v.current.focus() : (g.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? g.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		b?.id,
		S,
		b?.kind,
		b?.readOnlyReason
	]), I(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = re.current, r = e.target, i = !!g.current && !!r && g.current.contains(r), a = !!n && n.contains(r), o = !!r && v.current?.contains(r);
			if (!i && !a) return;
			let s = ve({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: n ? n.isEmpty() : !v.current?.value.trim(),
				inDeck: i && !o,
				busy: t.busy
			});
			s && (e.preventDefault(), e.stopPropagation(), s.type === "page" ? t.page(s.delta) : s.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : s.type === "expand" ? t.setCollapsed(!1) : t.pick(s.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !h.visible) return null;
	let ie = X(), O = x.length, k = T ? /* @__PURE__ */ B(i, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", p && !S && b && "px-3 pb-2"),
		"data-testid": `${f}-receipt`,
		children: [/* @__PURE__ */ z(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${T}`
		}), /* @__PURE__ */ z(r, {
			variant: "link",
			size: "sm",
			onClick: h.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!b || S) return /* @__PURE__ */ B(a, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border px-3 py-1.5", d),
		"data-composer-prompt-deck": b ? "collapsed" : "answered",
		"data-deck-variant": c,
		"data-testid": f,
		ref: g,
		children: [b && /* @__PURE__ */ B(i, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !p && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ z(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: O === 1 ? `1 question waiting · ${b.title}` : `${O} questions waiting · ${b.title}`
				}),
				/* @__PURE__ */ z(r, {
					variant: "link",
					size: "sm",
					onClick: () => h.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${f}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ z(we, { children: `${ie}↓` })
			]
		}), k]
	});
	let ae = V(b), A = U(b), j = b.kind === "compose" && !b.readOnlyReason, M = me(b), N = `${_}-title`, oe = `${_}-question`, P = ae.map((e, t) => H(e, t)), F = [
		ae.length ? `${A ? "Alt+" : ""}${P.filter(Boolean).length > 1 ? `${P[0]}–${P[P.length - 1]}` : P[0] ?? ""} choose` : null,
		A ? "type an answer · Enter answer" : M ? `Enter ${M.label}` : null,
		O > 1 ? `${ie}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ B(a, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border", d),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": s ? void 0 : b.kind,
		"data-deck-variant": c,
		"data-testid": f,
		ref: g,
		children: [/* @__PURE__ */ B("section", {
			role: "group",
			"aria-labelledby": N,
			"aria-describedby": oe,
			"aria-busy": C || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", Te, !p && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": b.id,
			"data-composer-prompt-kind": b.kind,
			"data-testid": `${f}-card`,
			children: [
				b.path && !j && /* @__PURE__ */ z(u, {
					steps: b.path.steps,
					current: b.path.current,
					"data-testid": `${f}-path`
				}),
				/* @__PURE__ */ B(i, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(a, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [b.eyebrow && /* @__PURE__ */ z(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: b.eyebrow
							}), /* @__PURE__ */ z(o, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: N,
								title: b.title,
								children: b.title
							})]
						}),
						O > 1 && /* @__PURE__ */ B(i, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ z(o, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${f}-position`,
									children: `${te + 1} of ${O}`
								}),
								/* @__PURE__ */ z(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => h.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${f}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ z(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => h.page(1),
									"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
									"data-testid": `${f}-next`,
									children: "›"
								})
							]
						}),
						/* @__PURE__ */ z(r, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Escape",
							onClick: () => {
								h.setCollapsed(!0), s?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${f}-hide`,
							children: "Hide"
						})
					]
				}),
				O > 1 && /* @__PURE__ */ z(i, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${f}-progress`,
					children: x.map((t, n) => /* @__PURE__ */ z(a, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === te ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				b.fields && b.fields.length > 0 && /* @__PURE__ */ z("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${f}-fields`,
					children: b.fields.map((t, n) => /* @__PURE__ */ B("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ z("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ z("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", Ce[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ z(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: oe,
					className: "min-w-0",
					children: b.question
				}),
				b.readOnlyReason ? /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${f}-read-only`,
					children: b.readOnlyReason
				}) : j ? /* @__PURE__ */ z(fe, {
					recipient: b.compose?.recipient,
					defaultMessage: b.compose?.initialMessage,
					messageLabel: b.compose?.messageLabel,
					placeholder: b.compose?.placeholder,
					reviewTitle: b.compose?.reviewTitle,
					note: b.compose?.note,
					doneTitle: b.compose?.doneTitle,
					doneMessage: b.compose?.doneMessage,
					continueLabel: b.compose?.continueLabel,
					confirmLabel: b.compose?.confirmLabel,
					backLabel: b.compose?.backLabel,
					doneActionLabel: b.compose?.doneActionLabel,
					path: b.path,
					onConfirm: (e) => h.answerCompose(e),
					onCancel: h.isFollowUp ? () => {
						h.back();
					} : b.compose?.onCancel ? () => {
						b.compose?.onCancel?.(), h.finish();
					} : void 0,
					onDone: () => {
						h.finish(), s?.focus();
					},
					"data-testid": `${f}-compose`
				}, b.id) : ae.length > 0 && /* @__PURE__ */ z(i, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: ae.map((e, t) => {
						let n = P[t], i = n ? `${A ? "Alt+" : ""}${n}` : void 0;
						return /* @__PURE__ */ B(a, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ B(r, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: C || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": i,
								"aria-describedby": e.hint ? `${_}-hint-${t}` : void 0,
								onClick: () => {
									h.pick(e.id).then((e) => {
										e && s?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": M?.id === e.id || void 0,
								"data-testid": `${f}-option-${e.id}`,
								children: [i && /* @__PURE__ */ z(we, { children: i }), e.label]
							}), e.hint && /* @__PURE__ */ z(o, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${_}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				E && /* @__PURE__ */ B(a, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ z(l, {
						ref: v,
						"aria-label": b.title,
						placeholder: b.placeholder ?? "Your answer",
						value: ne,
						disabled: C,
						autoResize: !0,
						minRows: b.kind === "number" ? 1 : 2,
						inputMode: b.kind === "number" ? "decimal" : void 0,
						onChange: (e) => ee({
							id: b.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), C || D());
						},
						"data-testid": `${f}-answer`
					}), /* @__PURE__ */ z(r, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: C || !ne.trim(),
						onClick: () => {
							D();
						},
						"data-testid": `${f}-submit`,
						children: "Answer"
					})]
				}),
				w && !j && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${f}-error`,
					children: w
				}),
				C && !j && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${f}-busy`,
					children: "Working…"
				}),
				!b.readOnlyReason && !j && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${f}-keys`,
					children: F
				})
			]
		}), k]
	});
}
function De(e) {
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
function Oe(e, t, n) {
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
function ke(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Ae(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function je(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Ae(e.html).length > 0;
}
function Me(e) {
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
function Ne(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Pe(e, t) {
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
var Fe = "ui.conversation-draft:";
function Ie(e) {
	return `${Fe}${e}`;
}
function Le(e, t) {
	try {
		let n = e?.getItem(Ie(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Ae(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Re(e, t, n) {
	try {
		Ae(n) ? e?.setItem(Ie(t), JSON.stringify({ html: n })) : e?.removeItem(Ie(t));
	} catch {}
}
var Z = "Conversation changed; draft retained.";
function ze(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Be(e) {
	return e.map((e) => e.name).join(", ");
}
var Ve = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(ze(`timed out (${n})`)));
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
}, He = "Message sent. Your current draft has been kept.", Ue = "This destination is no longer available. Choose a current destination.", We = "This view has no page to attach.";
function Ge(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ke(e, t) {
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
function qe() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Je(e, t, n, r = 6e4) {
	let i = L(new Ve()), a = L(t);
	a.current = t, I(() => () => i.current.rejectAll(Z), [t]);
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
	}), s = F(async (e) => {
		let t = a.current;
		if (!t) throw new _("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new _(ze(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Z);
		if (n.status === "failed") throw new _(ze(n.error));
		if (!n.transferId) throw new _(ze(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : ze(void 0));
		}
	}, [o, r]);
	return F((e) => Promise.all(e.map(s)), [s]);
}
function Ye({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: a, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ B(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ z(o, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ z(s, {
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
			...a ? { "data-composer-readonly-allow": a } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => r(e.target.value)
		})]
	});
}
function Xe(e) {
	function t(t) {
		return /* @__PURE__ */ z(Ze, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Ze({ rm: r, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: ee, callBlock: b, reply: x, mode: S, onModeChange: C, defaultMode: w, draftKey: ne, persistDraft: E = !0, claim: D = !1, answersFocus: re = !1, onReveal: ie, disabled: O, offModes: k, prompts: ae, composerRef: A, onDraftChange: j, defaultDraft: M, draft: N, above: P, modeRowEnd: se, references: le, onRemoveReference: ue, modePlaceholders: de, contextChip: fe, sendWithReferencesOnly: pe, console: V, "data-testid": H = "conversation-composer", ...U }) {
	let me = n() === "compact", he = f?.displayName || "You", W = ne ?? s ?? `${l.kind}:${l.id}`, ge = u.readOnlyReason || "You can read this conversation but not post to it.", G = ce(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? ge,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		ge
	]), [_e, K] = R(null), q = g === void 0 ? _e : g, ve = !!q && !G.some((e) => e.id === q), J = ve ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Ue
	} : Oe(G, q, h), ye = G.filter((e) => !e.disabled && !e.unavailableReason).length, be = G.length > 0, Y = Ke(De({
		capabilities: u,
		hasChat: be,
		choosable: ye,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), k), xe = w && Y.modes.includes(w) ? w : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Ce, we] = R(xe), X = S ?? Ce, Te = F((e) => {
		S === void 0 && we(e), C?.(e);
	}, [S, C]), Ae = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	I(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Te(e);
	}, [
		Ae,
		X,
		Te
	]);
	let [Fe, Ie] = R(!0), Z = l.reference ?? null;
	I(() => {
		Ie(!0);
	}, [Z?.id]);
	let ze = !!J && J.carriesReference !== !1, Ve = !!Z && !Z.page, Xe = !!J && J.channel !== s, Ze = !!Z && Fe && !(X === "chat" && (!ze || Ve && Xe)), Qe = X === "chat" && ze && Fe && !(Ve && Xe) ? Z : null, $e = L(0), et = N !== void 0, tt = f?.userId?.trim() || null, Q = tt ? JSON.stringify([
		"actor",
		tt,
		W
	]) : null, nt = E && !et ? JSON.stringify([
		"actor",
		tt,
		W
	]) : W, rt = JSON.stringify([
		W,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), it = L(rt);
	it.current !== rt && (it.current = rt, $e.current += 1);
	let at = L(N);
	at.current = N;
	let ot = ce(() => {
		if (et || !E || !Q) return M;
		let e = Le(qe(), Q);
		return e ? {
			html: e,
			files: []
		} : M;
	}, [
		nt,
		et,
		E
	]), st = L(""), ct = F((e, t) => {
		$e.current += 1, st.current = e.html, E && !et && Q && Re(qe(), Q, e.html), c?.setTyping?.(je({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		})), j?.(e, t);
	}, [
		E,
		et,
		Q,
		c,
		X,
		J?.channel,
		s,
		j
	]);
	I(() => {
		je({
			html: st.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		s
	]);
	let lt = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, ut = Je(r, lt, he), [dt, ft] = R(null), pt = t(), mt = L(null), ht = F((e) => {
		mt.current = e, Ge(A, e);
	}, [A]), gt = F(() => {
		ie?.();
		let e = 20, t = () => {
			mt.current ? mt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [ie]), $ = Se(ae), _t = !!$.active && !$.collapsed, vt = L(!1);
	I(() => {
		_t ? c?.setTyping?.(!1) : vt.current && gt(), vt.current = _t;
	}, [
		_t,
		c,
		gt
	]);
	let yt = ce(() => ({
		isEmpty: () => !mt.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!mt.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: gt
	}), [gt]), bt = F((e) => {
		K(e), v?.(e), $e.current += 1, ft(null), G.find((t) => t.id === e)?.onSelect?.();
	}, [G, v]), xt = G.filter((e) => e.claim !== !1);
	T({
		channels: D ? ke(u.maySend || m === void 0 ? s : null, xt) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = xt.find((t) => t.channel === e.channel);
			return Te("chat"), t && bt(t.id), gt(), !0;
		}
	});
	let St = F((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (Te("agent"), gt(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? G.find((e) => e.channel && e.channel === s) ?? (m ? G.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? xt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? G.find((e) => e.id === `person:${t.userId}`) ?? null : G.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && bt(n.id), Te("chat"), gt(), !0);
	}, [
		Y,
		Te,
		gt,
		J,
		G,
		m,
		xt,
		s,
		bt
	]);
	te(St, re);
	let Ct = ce(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), wt = ce(() => Ct.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [Ct]), Tt = (e) => {
		if (typeof e == "string") throw new _(e);
		return e !== !1;
	}, Et = async (e, t) => {
		if (ft(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !et && Q && Re(qe(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: Qe ?? (Fe ? Z : null),
			recipientId: J?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!u.agent?.allowed || p) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Ne(t), a = Pe(t, r) ?? (i === t ? null : Pe(i, r));
			if (a) {
				let e = Pe(t, [a.command]) ? t : i;
				return !a.command.disabled && Tt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (ee) return Tt(await ee(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Tt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Pe(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Tt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!pe && (!!Qe || (le?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !lt) return !1;
		c?.setTyping?.(!1);
		let a = $e.current, o = it.current, l = e.files.length ? await ut(e.files) : [], d = !!J.channel && J.channel === s, f = Me({
			displayName: he,
			reply: d ? x?.reply ?? null : null,
			reference: Qe,
			attachments: l
		}), m = r || Be(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: Qe
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? $e.current !== a || at.current !== N ? (it.current === o && pt?.toast(He, { type: "success" }), !1) : (d && x?.clear(), E && !et && Q && Re(qe(), Q, ""), !0) : !1;
	}, Dt = !!u.pending, Ot = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), kt = Ot && !$.typed && !O && !p && !Dt, At = Ze && Z ? /* @__PURE__ */ z(d, {
		references: [{
			id: Z.id,
			label: me ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...kt ? {} : { onRemove: () => {
			Ie(!1), $e.current += 1, ue?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, jt = ve && J ? [...G, J] : G, Mt = X === "chat" && jt.length > 1, Nt = X === "chat" && Fe && Ve && Xe && ze, Pt = X === "chat" && jt.length > 1 && !Dt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Ft = X === "chat" ? J?.error ?? null : null, It = Mt || Pt || dt || Nt || Ft || P != null && P !== !1 ? /* @__PURE__ */ B(a, {
		gap: "xs",
		children: [
			P,
			(Mt || Pt) && /* @__PURE__ */ B(i, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Mt && /* @__PURE__ */ z(Ye, {
					id: `${W}-recipient`,
					value: J?.id ?? null,
					recipients: jt,
					onChange: bt,
					"data-testid": `${H}-recipient`,
					...kt ? ye > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Pt && /* @__PURE__ */ z(o, {
					size: "xs",
					tone: "tertiary",
					title: Pt,
					className: e("min-w-0", Mt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${H}-recipient-unavailable`,
					children: /* @__PURE__ */ z("span", {
						className: "truncate",
						children: Pt
					})
				})]
			}),
			Nt && /* @__PURE__ */ z(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: We
			}),
			dt && /* @__PURE__ */ z(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${H}-note`,
				children: dt
			}),
			Ft && /* @__PURE__ */ z(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${H}-recipient-error`,
				children: Ft
			})
		]
	}) : void 0, Lt = !me, Rt = Lt && At || se ? /* @__PURE__ */ B(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Lt ? At : null, se]
	}) : void 0, zt = !Lt && Ze && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...le ?? []] : le, Bt = (e) => {
		Z && e === Z.id && (Ie(!1), $e.current += 1), ue?.(e);
	}, Vt = {
		...de,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : "Choose an answer above, or press its number" } : {}
	}, Ht = kt ? Pt ? ye > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? ge : "Choose a destination.") : null;
	return /* @__PURE__ */ z(oe, {
		...U,
		context: l,
		composerRef: ht,
		"data-testid": H,
		...me ? { responsive: "pane" } : {},
		console: V ?? !!b,
		dock: b,
		mode: X,
		onModeChange: Te,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: be && !Y.reasons.chat,
		contextChip: fe ?? (!Z && void 0),
		above: _t ? P : It,
		..._t ? { replacement: /* @__PURE__ */ z(Ee, {
			deck: $,
			"data-testid": `${H}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ z(Ee, {
			deck: $,
			input: yt,
			variant: "inset",
			"data-testid": `${H}-prompts`
		}) } : {},
		...Rt ? { modeRowEnd: Rt } : {},
		...zt ? {
			references: zt,
			onRemoveReference: Bt
		} : {},
		modePlaceholders: Vt,
		commands: wt,
		reply: X === "chat" && x?.reply && J?.channel === s ? {
			author: x.reply.author,
			quote: x.reply.text,
			messageId: x.reply.messageId,
			...x.reply.timestamp ? { timestamp: x.reply.timestamp } : {},
			onDismiss: x.clear
		} : null,
		allowAttachments: !!lt,
		...pe === void 0 ? {} : { sendWithReferencesOnly: pe },
		...Ht ? { readOnly: Ht } : {},
		disabled: !!O || !$.typed && (!!p || Ot || X === "agent" && !u.agent?.allowed),
		draftKey: nt,
		...et ? { draft: N } : {},
		...ot === void 0 ? {} : { defaultDraft: ot },
		onDraftChange: ct,
		onSend: (e, t) => Et(e, t.mode),
		className: e(U.className)
	});
}
//#endregion
export { P as AgentComposerDock, M as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, ee as COMPOSER_CONTEXT_REASONS, k as COMPOSER_MODE_ORDER, pe as CONFIRM_OPTIONS, ae as CommandSuggestions, N as ComposerAttachments, fe as ComposerConfirmFlow, Ee as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, oe as ContextComposer, E as ConversationInputProvider, re as DocumentSuggestions, f as EMOJI_SHORTCODES, j as EmojiSuggestions, O as MentionSuggestions, A as RichChatComposer, C as ThreadInputHandoff, he as answerForOption, Be as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, ie as composerSizeFor, Xe as createConversationComposer, ve as deckKeyAction, me as defaultOption, y as identityDisplayName, p as matchComposerCommand, D as matchesModeTrigger, W as parseTypedAnswer, V as promptOptions, m as searchEmoji, U as takesTypedAnswer, S as useComposerFocus, w as useComposerFocusReveal, Se as useComposerPromptDeck, Je as useConversationUploads, ne as useThreadInput };
