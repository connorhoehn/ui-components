import { c as e, d as t, n } from "../Button-DQoeE5dN.js";
import { i as r } from "../ToastProvider-Dgew98nE.js";
import { i, n as a, r as o } from "../Text-DYn7PTcU.js";
import { t as s } from "../Select-SZWRrONZ.js";
import { t as c } from "../FormField-BDZIVA7n.js";
import { t as l } from "../Textarea-Cf4WFXAs.js";
import { t as u } from "../DecisionPath-CUrGXMTf.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-vB7M56RD.js";
import { a as v, i as ee, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as ne, o as C, r as re, s as w, t as T } from "../ConversationInputs-BLX0EsnD.js";
import { a as E, c as D, d as ie, i as O, l as k, n as ae, o as A, r as oe, s as j, t as M, u as se } from "../RichChatComposer-DZL8D7JV.js";
import { t as ce } from "../ContextComposer-BiAMyDOr.js";
import { t as N } from "../AgentComposerDock-DhqRpY2c.js";
import { useCallback as P, useContext as le, useEffect as F, useId as ue, useMemo as I, useRef as L, useState as R } from "react";
import { jsx as z, jsxs as B } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function de(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function fe(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var pe = {
	draft: 0,
	review: 1,
	done: 2
};
function me({ title: e, recipient: r, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: ee = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: ne, onStageChange: C, path: re, autoFocus: w = !0, className: T, "data-testid": E = "composer-confirm-flow" }) {
	let [D, ie] = R(s), O = d !== void 0, k = O ? d : D, ae = P((e) => {
		O || ie(e), f?.(e);
	}, [O, f]), [A, oe] = R("draft"), [j, M] = R(!1), [se, ce] = R(null), [N, le] = R(null), I = L(!1), me = L(null), he = L(null), V = L(null), H = ue(), U = k.trim().length > 0, W = P((e) => {
		oe(e), C?.(e);
	}, [C]), ge = L(!1);
	F(() => {
		let e = !ge.current;
		ge.current = !0, !(e && !w) && (A === "draft" ? me.current : A === "review" ? he.current : V.current)?.focus({ preventScroll: !0 });
	}, [A, w]);
	let _e = P(() => {
		U && (ce(null), W("review"));
	}, [U, W]), G = P(async () => {
		if (I.current) return;
		I.current = !0, M(!0), ce(null);
		let e;
		try {
			e = await te(k);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			I.current = !1, M(!1);
		}
		if (de(e)) {
			ce(e.error);
			return;
		}
		le(e && "receipt" in e ? e.receipt : null), W("done");
	}, [
		k,
		te,
		W
	]), K = A === "review" ? h ?? e : A === "done" ? _ : e, q = `${H}-heading`, ve = `${H}-keys`, ye = K || r ? /* @__PURE__ */ B(o, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [K && /* @__PURE__ */ z(a, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: q,
			className: "min-w-0",
			children: K
		}), r && /* @__PURE__ */ z(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${E}-recipient`,
			children: r
		})]
	}) : null, be = re ? /* @__PURE__ */ z(u, {
		steps: re.steps,
		current: re.current + pe[A],
		"data-testid": `${E}-path`
	}) : null;
	return A === "done" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", T),
		"data-composer-confirm-flow": "done",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: V,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": K ? q : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${E}-done`,
			children: [
				ye,
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${E}-done-message`,
					children: N ?? v
				}),
				ne && /* @__PURE__ */ z(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ z(n, {
						size: "sm",
						variant: "ghost",
						onClick: ne,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${E}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : A === "review" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", T),
		"data-composer-confirm-flow": "review",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: he,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": K ? q : void 0,
			"aria-describedby": ve,
			"aria-busy": j || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${E}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || j || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), W("draft")) : fe(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), G()));
			},
			children: [
				ye,
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${E}-message`,
					children: k
				}),
				/* @__PURE__ */ B(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(n, {
							size: "sm",
							variant: "primary",
							disabled: j,
							onClick: () => {
								G();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${E}-confirm`,
							children: y
						}),
						/* @__PURE__ */ z(n, {
							size: "sm",
							variant: "ghost",
							disabled: j,
							onClick: () => W("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${E}-back`,
							children: b
						}),
						/* @__PURE__ */ z(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
							className: "min-w-0",
							"data-testid": `${E}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				se && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${E}-error`,
					children: se
				}),
				j && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${E}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${E}-note`,
					children: g
				})
			]
		})]
	}) : /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", T),
		"data-composer-confirm-flow": "draft",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), _e();
			},
			"aria-labelledby": K ? q : void 0,
			"data-testid": `${E}-draft`,
			children: [
				ye,
				/* @__PURE__ */ z(c, {
					label: p,
					children: (e) => /* @__PURE__ */ z(l, {
						...e,
						ref: me,
						"aria-describedby": [e["aria-describedby"], ve].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: k,
						placeholder: m,
						onChange: (e) => ae(e.target.value),
						onKeyDown: (e) => {
							fe(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || _e()));
						},
						"data-testid": `${E}-editor`
					})
				}),
				/* @__PURE__ */ B(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !U,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${E}-continue`,
							children: ee
						}),
						S && /* @__PURE__ */ z(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${E}-cancel`,
							children: b
						}),
						/* @__PURE__ */ z(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
							className: "min-w-0",
							"data-testid": `${E}-keys`,
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
var he = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function V(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? he : [];
}
function H(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function U(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function W(e) {
	return !!e && !e.readOnlyReason && !!e.onDirection && (e.kind === "choice" || e.kind === "confirm");
}
function ge(e) {
	let t = V(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function _e(e, t) {
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
function G(e, t) {
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
function K(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = V(e).find((e) => e.id === t.optionId);
	return `${e.title}: ${n?.label ?? t.optionId}`;
}
function q(e, t, n = {}) {
	let r = [];
	for (let i of e) {
		let e = i, a = /* @__PURE__ */ new Set();
		for (; e && t.has(e.id) && !a.has(e.id);) a.add(e.id), e = n[e.id];
		e && !t.has(e.id) && r.push(e);
	}
	return r;
}
function ve(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function ye(e, t) {
	for (let [n, r] of Object.entries(t)) if (r.id === e) return n;
	return null;
}
function be(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function xe(e) {
	return !e || typeof e.closest != "function" || !e.closest("input,textarea,select,[contenteditable]:not([contenteditable=\"false\"]),[role=\"dialog\"],[role=\"alertdialog\"],[role=\"menu\"],[role=\"listbox\"],[role=\"combobox\"]");
}
function J(e, t) {
	let { prompt: n, collapsed: r, inputEmpty: i, inDeck: a, busy: o, canBack: s } = t;
	if (!n) return null;
	let c = !!(e.metaKey || e.ctrlKey), l = i || a;
	if (r) return c && e.key === "ArrowDown" ? { type: "expand" } : null;
	if (c && (e.key === "ArrowDown" || e.key === "ArrowUp")) return {
		type: "page",
		delta: e.key === "ArrowDown" ? 1 : -1
	};
	if (n.kind === "compose") return null;
	if (e.key === "Escape" && l) return { type: "collapse" };
	if (e.key === "Backspace" && e.altKey && !c && !e.shiftKey && l && s && !o) return { type: "back" };
	if (c || e.shiftKey) return null;
	let u = U(n), d = l && !e.altKey && (!u && !W(n) || a);
	if (d && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (d && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let f = V(n);
	if (e.key === "Enter" && l && !a) {
		let e = ge(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = Se(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => H(e, t) === p), h = m >= 0 ? f[m] : null;
	return h && !h.disabledReason ? {
		type: "pick",
		optionId: h.id
	} : null;
}
function Se(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var Ce = [], Y = {};
function we(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function Te(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Ee(e, t) {
	return t == null || e.every((e) => e.scope == null || e.scope === t) ? e : e.filter((e) => e.scope == null || e.scope === t);
}
function De(e, t = {}) {
	let n = t.scope, r = I(() => Ee(e ?? Ce, n), [e, n]), [i, a] = R(() => /* @__PURE__ */ new Set()), [o, s] = R(null), [c, l] = R(!1), [u, d] = R(null), [f, p] = R({}), [m, h] = R(null), [g, _] = R(Y), v = L(g);
	v.current = g;
	let ee = L(n);
	F(() => {
		ee.current !== n && (ee.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let y = I(() => q(r, i, g), [
		r,
		i,
		g
	]), b = be(y, o), x = b >= 0 ? y[b] : null, te = u != null, S = L(!1), ne = r.map((e) => e.id).join("\0");
	F(() => {
		let e = ve(r, v.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [ne]);
	let C = y[0]?.id ?? null, re = L(/* @__PURE__ */ new Set());
	F(() => {
		let e = y.some((e) => !re.current.has(e.id));
		for (let e of y) re.current.add(e.id);
		e && l(!1);
	}, [C, y]);
	let w = P(async (e, t) => {
		if (S.current || e.readOnlyReason) return !1;
		S.current = !0, d(e.id), p((t) => {
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
			S.current = !1, d(null);
		}
		return we(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Te(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : K(e, t)), !0);
	}, []), T = P(async (e) => {
		let t = x;
		if (!t || t.kind !== "compose" || t.readOnlyReason) return { error: "This question takes no message." };
		if (S.current) return { error: "Still working on the last answer." };
		S.current = !0, d(t.id);
		let n;
		try {
			n = await t.onAnswer({
				kind: "compose",
				message: e
			});
		} catch (e) {
			n = { error: e instanceof Error && e.message ? e.message : "That could not be confirmed. Try again." };
		} finally {
			S.current = !1, d(null);
		}
		return we(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), E = x ? ye(x.id, g) : null, D = P(() => {
		if (!x || E == null) return !1;
		let e = x.id;
		return _((e) => {
			let { [E]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(E), n.delete(e), n;
		}), s(E), !0;
	}, [x, E]), ie = x?.back, O = ie ? {
		label: ie.label || "Back",
		...ie.disabledReason ? { disabledReason: ie.disabledReason } : {}
	} : E != null && x?.kind !== "compose" ? { label: "Back" } : null, k = P(async () => {
		if (!x) return !1;
		let e = x.back;
		if (!e) return x.kind !== "compose" && D();
		if (e.disabledReason || S.current) return !1;
		S.current = !0, d(x.id), p((e) => {
			if (!(x.id in e)) return e;
			let { [x.id]: t, ...n } = e;
			return n;
		});
		try {
			return await e.onBack(), !0;
		} catch (e) {
			let t = e instanceof Error && e.message ? e.message : "Could not go back. Try again.";
			return p((e) => ({
				...e,
				[x.id]: t
			})), !1;
		} finally {
			S.current = !1, d(null);
		}
	}, [x, D]), ae = P(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), A = P(async (e) => {
		if (!x) return !1;
		let t = V(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : w(x, _e(x, t));
	}, [x, w]), oe = P(async (e) => {
		if (!x || !U(x)) return !1;
		let t = G(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : w(x, t.answer);
	}, [x, w]), j = P(async (e) => {
		let t = x, n = e.trim();
		if (!t || c || !n || t.readOnlyReason || t.kind !== "choice" && t.kind !== "confirm") return !1;
		if (!t.onDirection) {
			let e = ge(t), n = e ? `Choose an answer, or press Enter on an empty box for ${e.label}.` : "Choose one of the answers.";
			return p((e) => ({
				...e,
				[t.id]: n
			})), !1;
		}
		if (S.current) return !1;
		S.current = !0, d(t.id), p((e) => {
			if (!(t.id in e)) return e;
			let { [t.id]: n, ...r } = e;
			return r;
		});
		let r;
		try {
			r = await t.onDirection(n);
		} catch (e) {
			r = { error: e instanceof Error && e.message ? e.message : "That direction could not be taken. Try again." };
		} finally {
			S.current = !1, d(null);
		}
		return we(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : Te(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [x, c]), M = P((e) => {
		if (!y.length) return;
		let t = (b + e + y.length) % y.length;
		s(y[t].id);
	}, [y, b]);
	return {
		pending: y,
		active: x,
		index: b,
		collapsed: c,
		busy: te,
		error: x ? f[x.id] ?? null : null,
		receipt: m,
		visible: y.length > 0 || m != null,
		typed: !c && U(x),
		setCollapsed: l,
		page: M,
		pick: A,
		answerTyped: oe,
		direction: !c && W(x),
		answerDirection: j,
		answerCompose: T,
		isFollowUp: E != null,
		back: D,
		backControl: O,
		goBack: k,
		finish: ae,
		dismissReceipt: () => h(null)
	};
}
var X = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function Oe({ children: e }) {
	return /* @__PURE__ */ z("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function ke() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Ae = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function je({ deck: e, prompts: r, scope: s, input: c = null, variant: d = "card", presentation: f, className: p, "data-testid": m = "composer-prompt-deck" }) {
	let h = d === "inset", g = le(A), _ = f ?? g ?? "card", v = _ === "prompt", ee = De(e ? null : r, { scope: s }), y = e ?? ee, b = L(null), x = ue(), te = L(null), [S, ne] = R({
		id: "",
		text: ""
	}), { active: C, pending: re, index: w, collapsed: T, busy: E, error: D, receipt: ie } = y, O = C?.inputDraft?.value ?? (S.id === C?.id ? S.text : ""), k = !c && y.typed && !C?.readOnlyReason, ae = async () => {
		let e = C?.id;
		await y.answerTyped(O) && ne((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, oe = L({
		deck: y,
		input: c
	});
	if (oe.current = {
		deck: y,
		input: c
	}, F(() => {
		if (!C || T || C.readOnlyReason || C.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = oe.current.input;
			t && !b.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : te.current ? te.current.focus() : (b.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? b.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		C?.id,
		T,
		C?.kind,
		C?.readOnlyReason
	]), F(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = oe.current, r = e.target, i = !!b.current && !!r && b.current.contains(r), a = !!n && n.contains(r), o = !!r && te.current?.contains(r), s = !i && !a && t.active?.keypad === "page" && !t.collapsed && xe(e.target);
			if (!i && !a && !s) return;
			let c = J({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, s ? {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: !0,
				inDeck: !0,
				busy: t.busy,
				canBack: !1
			} : {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: n ? n.isEmpty() : !te.current?.value.trim(),
				inDeck: i && !o,
				busy: t.busy,
				canBack: !!t.backControl && !t.backControl.disabledReason
			});
			!c || s && c.type !== "pick" || (e.preventDefault(), e.stopPropagation(), c.type === "page" ? t.page(c.delta) : c.type === "back" ? t.goBack() : c.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : c.type === "expand" ? t.setCollapsed(!1) : t.pick(c.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !y.visible) return null;
	let j = ke(), M = re.length, se = ie ? /* @__PURE__ */ B(o, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: t("min-w-0", h && !T && C && "px-3 pb-2"),
		"data-testid": `${m}-receipt`,
		children: [/* @__PURE__ */ z(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${ie}`
		}), /* @__PURE__ */ z(n, {
			variant: "link",
			size: "sm",
			onClick: y.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!C || T) return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border px-3 py-1.5", p),
		"data-composer-prompt-deck": C ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [C && /* @__PURE__ */ B(o, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: t("min-w-0", !h && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ z(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: M === 1 ? `1 question waiting · ${C.title}` : `${M} questions waiting · ${C.title}`
				}),
				/* @__PURE__ */ z(n, {
					variant: "link",
					size: "sm",
					onClick: () => y.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${m}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ z(Oe, { children: `${j}↓` })
			]
		}), se]
	});
	let ce = V(C), N = U(C), P = C.kind === "compose" && !C.readOnlyReason, I = ge(C), de = `${x}-title`, fe = `${x}-question`, pe = ce.map((e, t) => H(e, t)), he = [
		ce.length ? `${N ? "Alt+" : ""}${pe.filter(Boolean).length > 1 ? `${pe[0]}–${pe[pe.length - 1]}` : pe[0] ?? ""} choose` : null,
		N ? "type an answer · Enter answer" : I ? `Enter ${I.label}` : null,
		M > 1 ? `${j}↓ next` : null,
		y.backControl && !y.backControl.disabledReason ? `Alt+⌫ ${y.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border", p),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : C.kind,
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [/* @__PURE__ */ B("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": de,
			"aria-describedby": fe,
			"aria-busy": E || void 0,
			className: t("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ae, !h && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": C.id,
			"data-composer-prompt-kind": C.kind,
			"data-testid": `${m}-card`,
			children: [
				C.path && !P && /* @__PURE__ */ z(u, {
					steps: C.path.steps,
					current: C.path.current,
					"data-testid": `${m}-path`
				}),
				/* @__PURE__ */ B(o, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [C.eyebrow && /* @__PURE__ */ z(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: C.eyebrow
							}), /* @__PURE__ */ z(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: de,
								title: C.title,
								children: C.title
							})]
						}),
						y.backControl && /* @__PURE__ */ z(n, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Alt+Backspace",
							disabled: E || !!y.backControl.disabledReason,
							title: y.backControl.disabledReason,
							onClick: () => {
								y.goBack();
							},
							"data-composer-prompt-back": "",
							"data-composer-readonly-allow": "Returns to the previous step without submitting an answer",
							"data-testid": `${m}-back`,
							children: y.backControl.label
						}),
						M > 1 && /* @__PURE__ */ B(o, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ z(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${m}-position`,
									children: `${w + 1} of ${M}`
								}),
								/* @__PURE__ */ z(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => y.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${m}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ z(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => y.page(1),
									"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
									"data-testid": `${m}-next`,
									children: "›"
								})
							]
						}),
						/* @__PURE__ */ z(n, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Escape",
							onClick: () => {
								y.setCollapsed(!0), c?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${m}-hide`,
							children: "Hide"
						})
					]
				}),
				M > 1 && /* @__PURE__ */ z(o, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${m}-progress`,
					children: re.map((e, n) => /* @__PURE__ */ z(i, {
						gap: "none",
						className: t("h-1 min-w-0 flex-1 rounded-full", n === w ? "bg-primary" : "bg-border")
					}, e.id))
				}),
				C.fields && C.fields.length > 0 && v && /* @__PURE__ */ z("dl", {
					className: "m-0 flex min-w-0 flex-col gap-0.5",
					"data-testid": `${m}-fields`,
					children: C.fields.map((e, n) => /* @__PURE__ */ B("div", {
						className: "flex min-w-0 items-baseline gap-2",
						"data-composer-prompt-field": "",
						children: [/* @__PURE__ */ z("dt", {
							className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ z("dd", {
							className: t("m-0 min-w-0 flex-1 truncate text-xs font-normal", X[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" || typeof e.value == "number" ? { title: String(e.value) } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				C.fields && C.fields.length > 0 && !v && /* @__PURE__ */ z("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${m}-fields`,
					children: C.fields.map((e, n) => /* @__PURE__ */ B("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ z("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ z("dd", {
							className: t("m-0 min-w-0 break-words text-xs font-normal", X[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" ? { title: e.value } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: fe,
					className: "min-w-0",
					children: C.question
				}),
				C.readOnlyReason ? /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${m}-read-only`,
					children: C.readOnlyReason
				}) : P ? /* @__PURE__ */ z(me, {
					recipient: C.compose?.recipient,
					defaultMessage: C.compose?.initialMessage,
					messageLabel: C.compose?.messageLabel,
					placeholder: C.compose?.placeholder,
					reviewTitle: C.compose?.reviewTitle,
					note: C.compose?.note,
					doneTitle: C.compose?.doneTitle,
					doneMessage: C.compose?.doneMessage,
					continueLabel: C.compose?.continueLabel,
					confirmLabel: C.compose?.confirmLabel,
					backLabel: C.compose?.backLabel,
					doneActionLabel: C.compose?.doneActionLabel,
					path: C.path,
					onConfirm: (e) => y.answerCompose(e),
					onCancel: y.isFollowUp ? () => {
						y.back();
					} : C.compose?.onCancel ? () => {
						C.compose?.onCancel?.(), y.finish();
					} : void 0,
					onDone: () => {
						y.finish(), c?.focus();
					},
					"data-testid": `${m}-compose`
				}, C.id) : ce.length > 0 && /* @__PURE__ */ z(o, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: ce.map((e, t) => {
						let r = pe[t], o = r ? `${N ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ B(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ B(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: E || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${x}-hint-${t}` : void 0,
								onClick: () => {
									y.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": I?.id === e.id || void 0,
								"data-testid": `${m}-option-${e.id}`,
								children: [o && !v && /* @__PURE__ */ z(Oe, { children: o }), e.label]
							}), e.hint && /* @__PURE__ */ z(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${x}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				k && /* @__PURE__ */ B(i, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ z(l, {
						ref: te,
						"aria-label": C.title,
						placeholder: C.placeholder ?? "Your answer",
						value: O,
						disabled: E,
						autoResize: !0,
						minRows: C.kind === "number" ? 1 : 2,
						inputMode: C.kind === "number" ? "decimal" : void 0,
						onChange: (e) => C.inputDraft ? C.inputDraft.onChange(e.target.value) : ne({
							id: C.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), E || ae());
						},
						"data-testid": `${m}-answer`
					}), /* @__PURE__ */ z(n, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: E || !O.trim(),
						onClick: () => {
							ae();
						},
						"data-testid": `${m}-submit`,
						children: "Answer"
					})]
				}),
				D && !P && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${m}-error`,
					children: D
				}),
				E && !P && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${m}-busy`,
					children: "Working…"
				}),
				!v && !C.readOnlyReason && !P && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${m}-keys`,
					children: he
				})
			]
		}), se]
	});
}
function Me(e) {
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
function Ne(e, t, n) {
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
function Pe(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Fe(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Ie(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Fe(e.html).length > 0;
}
function Le(e) {
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
function Re(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function ze(e, t) {
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
var Z = "ui.conversation-draft:";
function Be(e) {
	return `${Z}${e}`;
}
function Ve(e, t) {
	try {
		let n = e?.getItem(Be(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Fe(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function He(e, t, n) {
	try {
		Fe(n) ? e?.setItem(Be(t), JSON.stringify({ html: n })) : e?.removeItem(Be(t));
	} catch {}
}
var Ue = "Conversation changed; draft retained.";
function We(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Ge(e) {
	return e.map((e) => e.name).join(", ");
}
var Ke = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(We(`timed out (${n})`)));
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
}, qe = "Message sent. Your current draft has been kept.", Je = "This destination is no longer available. Choose a current destination.", Ye = "This view has no page to attach.";
function Xe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ze(e, t) {
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
function Qe() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function $e(e, t, n, r = 6e4) {
	let i = L(new Ke()), a = L(t);
	a.current = t, F(() => () => i.current.rejectAll(Ue), [t]);
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
	}), s = P(async (e) => {
		let t = a.current;
		if (!t) throw new _("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new _(We(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Ue);
		if (n.status === "failed") throw new _(We(n.error));
		if (!n.transferId) throw new _(We(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : We(void 0));
		}
	}, [o, r]);
	return P((e) => Promise.all(e.map(s)), [s]);
}
function et({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: i, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ B(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ z(a, {
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
			...i ? { "data-composer-readonly-allow": i } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => r(e.target.value)
		})]
	});
}
function tt(e) {
	function t(t) {
		return /* @__PURE__ */ z(nt, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function nt({ rm: n, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: ee, commands: y = [], onAgent: b, callBlock: x, reply: S, mode: ne, onModeChange: C, defaultMode: w, draftKey: T, persistDraft: E = !0, claim: D = !1, answersFocus: ie = !1, onReveal: O, disabled: k, offModes: ae, prompts: A, promptScope: oe, composerRef: j, onDraftChange: M, defaultDraft: se, draft: N, above: le, modeRowEnd: ue, references: de, onRemoveReference: fe, modePlaceholders: pe, contextChip: me, sendWithReferencesOnly: he, console: V, "data-testid": H = "conversation-composer", ...U }) {
	let W = e() === "compact", _e = f?.displayName || "You", G = T ?? s ?? `${l.kind}:${l.id}`, K = u.readOnlyReason || "You can read this conversation but not post to it.", q = I(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? K,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		K
	]), [ve, ye] = R(null), be = g === void 0 ? ve : g, xe = !!be && !q.some((e) => e.id === be), J = xe ? {
		id: be,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Je
	} : Ne(q, be, h), Se = q.filter((e) => !e.disabled && !e.unavailableReason).length, Ce = q.length > 0, Y = Ze(Me({
		capabilities: u,
		hasChat: Ce,
		choosable: Se,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), ae), we = w && Y.modes.includes(w) ? w : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Te, Ee] = R(we), X = ne ?? Te, Oe = P((e) => {
		ne === void 0 && Ee(e), C?.(e);
	}, [ne, C]), ke = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	F(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Oe(e);
	}, [
		ke,
		X,
		Oe
	]);
	let [Ae, Fe] = R(!0), Z = l.reference ?? null;
	F(() => {
		Fe(!0);
	}, [Z?.id]);
	let Be = !!J && J.carriesReference !== !1, Ue = !!Z && !Z.page, We = !!J && J.channel !== s, Ke = !!Z && Ae && !(X === "chat" && (!Be || Ue && We)), tt = X === "chat" && Be && Ae && !(Ue && We) ? Z : null, nt = L(0), at = N !== void 0, ot = f?.userId?.trim() || null, Q = ot ? JSON.stringify([
		"actor",
		ot,
		G
	]) : null, st = E && !at ? JSON.stringify([
		"actor",
		ot,
		G
	]) : G, ct = JSON.stringify([
		G,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), lt = L(ct);
	lt.current !== ct && (lt.current = ct, nt.current += 1);
	let ut = L(N);
	ut.current = N;
	let dt = I(() => {
		if (at || !E || !Q) return se;
		let e = Ve(Qe(), Q);
		return e ? {
			html: e,
			files: []
		} : se;
	}, [
		st,
		at,
		E
	]), ft = L(""), pt = P((e, t) => {
		nt.current += 1, ft.current = e.html, E && !at && Q && He(Qe(), Q, e.html), c?.setTyping?.(Ie({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}));
		let n = mt.current;
		if (n && n.value !== void 0) {
			let t = bt.current?.editor?.getText() ?? rt(e.html);
			t !== n.lastSent && (n.lastSent = t, n.onChange(t));
		}
		M?.(e, t);
	}, [
		E,
		at,
		Q,
		c,
		X,
		J?.channel,
		s,
		M
	]), mt = L(null);
	F(() => {
		Ie({
			html: ft.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		s
	]);
	let ht = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, gt = $e(n, ht, _e), [_t, vt] = R(null), yt = r(), bt = L(null), xt = P((e) => {
		bt.current = e, Xe(j, e);
	}, [j]), St = P(() => {
		O?.();
		let e = 20, t = () => {
			bt.current ? bt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [O]), $ = De(A, { scope: oe }), Ct = !!$.active && !$.collapsed, wt = U.presentation === "prompt", Tt = wt && Ct && $.active?.kind !== "compose", Et = Tt && !$.active?.readOnlyReason, Dt = Tt ? $.active?.inputDraft : void 0;
	mt.current = Dt ? {
		value: Dt.value,
		onChange: Dt.onChange,
		lastSent: mt.current?.lastSent ?? Dt.value
	} : null;
	let Ot = L(null), kt = Dt && $.active ? $.active.id : null;
	F(() => {
		if (kt === Ot.current || (Ot.current = kt, !kt || !Dt)) return;
		let e = Dt.value, t = 20, n = () => {
			let r = bt.current?.editor;
			if (!r) {
				t-- > 0 && requestAnimationFrame(n);
				return;
			}
			mt.current && (mt.current.lastSent = e), r.getText() !== e && r.commands.setContent(v(e).html, { emitUpdate: !0 }), r.commands.focus("end");
		};
		n();
	}, [kt]);
	let At = L(!1);
	F(() => {
		Ct ? c?.setTyping?.(!1) : At.current && St(), At.current = Ct;
	}, [
		Ct,
		c,
		St
	]);
	let jt = I(() => ({
		isEmpty: () => !bt.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!bt.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: St
	}), [St]), Mt = P((e) => {
		ye(e), ee?.(e), nt.current += 1, vt(null), q.find((t) => t.id === e)?.onSelect?.();
	}, [q, ee]), Nt = q.filter((e) => e.claim !== !1);
	re({
		channels: D ? Pe(u.maySend || m === void 0 ? s : null, Nt) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = Nt.find((t) => t.channel === e.channel);
			return Oe("chat"), t && Mt(t.id), St(), !0;
		}
	});
	let Pt = P((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (Oe("agent"), St(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? q.find((e) => e.channel && e.channel === s) ?? (m ? q.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? Nt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? q.find((e) => e.id === `person:${t.userId}`) ?? null : q.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && Mt(n.id), Oe("chat"), St(), !0);
	}, [
		Y,
		Oe,
		St,
		J,
		q,
		m,
		Nt,
		s,
		Mt
	]);
	te(Pt, ie);
	let Ft = I(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), It = I(() => Ft.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [Ft]), Lt = (e) => {
		if (typeof e == "string") throw new _(e);
		return e !== !1;
	}, Rt = async (e, t) => {
		if (vt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !at && Q && He(Qe(), Q, ""), t;
		}
		if (Et) {
			let t = await $.answerDirection(e.text);
			return t && E && !at && Q && He(Qe(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: tt ?? (Ae ? Z : null),
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Re(t), a = ze(t, r) ?? (i === t ? null : ze(i, r));
			if (a) {
				let e = ze(t, [a.command]) ? t : i;
				return !a.command.disabled && Lt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return Lt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Lt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = ze(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Lt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!he && (!!tt || (de?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ht) return !1;
		c?.setTyping?.(!1);
		let a = nt.current, o = lt.current, l = e.files.length ? await gt(e.files) : [], d = !!J.channel && J.channel === s, f = Le({
			displayName: _e,
			reply: d ? S?.reply ?? null : null,
			reference: tt,
			attachments: l
		}), m = r || Ge(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: tt
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? nt.current !== a || ut.current !== N ? (lt.current === o && yt?.toast(qe, { type: "success" }), !1) : (d && S?.clear(), E && !at && Q && He(Qe(), Q, ""), !0) : !1;
	}, zt = !!u.pending, Bt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Vt = Bt && !$.typed && !Et && !k && !p && !zt, Ht = Ke && Z ? /* @__PURE__ */ z(d, {
		references: [{
			id: Z.id,
			label: W ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Vt ? {} : { onRemove: () => {
			Fe(!1), nt.current += 1, fe?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Ut = xe && J ? [...q, J] : q, Wt = X === "chat" && Ut.length > 1, Gt = X === "chat" && Ae && Ue && We && Be, Kt = X === "chat" && Ut.length > 1 && !zt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, qt = X === "chat" ? J?.error ?? null : null, Jt = Wt || Kt || _t || Gt || qt || le != null && le !== !1 ? /* @__PURE__ */ B(i, {
		gap: "xs",
		children: [
			le,
			(Wt || Kt) && /* @__PURE__ */ B(o, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Wt && /* @__PURE__ */ z(et, {
					id: `${G}-recipient`,
					value: J?.id ?? null,
					recipients: Ut,
					onChange: Mt,
					"data-testid": `${H}-recipient`,
					...Vt ? Se > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Kt && /* @__PURE__ */ z(a, {
					size: "xs",
					tone: "tertiary",
					title: Kt,
					className: t("min-w-0", Wt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${H}-recipient-unavailable`,
					children: /* @__PURE__ */ z("span", {
						className: "truncate",
						children: Kt
					})
				})]
			}),
			Gt && /* @__PURE__ */ z(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ye
			}),
			_t && /* @__PURE__ */ z(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${H}-note`,
				children: _t
			}),
			qt && /* @__PURE__ */ z(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${H}-recipient-error`,
				children: qt
			})
		]
	}) : void 0, Yt = !W, Xt = Yt && Ht || ue ? /* @__PURE__ */ B(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Yt ? Ht : null, ue]
	}) : void 0, Zt = !Yt && Ke && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...de ?? []] : de, Qt = (e) => {
		Z && e === Z.id && (Fe(!1), nt.current += 1), fe?.(e);
	}, $t = {
		...pe,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : wt ? $.active.placeholder ?? it($.direction, ge($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, en = Vt ? Kt ? Se > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? K : "Choose a destination.") : null;
	return /* @__PURE__ */ z(ce, {
		collapsible: !0,
		...U,
		collapsedLabel: U.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: xt,
		"data-testid": H,
		...W ? { responsive: "pane" } : {},
		console: V ?? !!x,
		dock: x,
		mode: X,
		onModeChange: Oe,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: Ce && !Y.reasons.chat,
		contextChip: me ?? (!Z && void 0),
		above: Ct ? le : Jt,
		...Tt ? { header: /* @__PURE__ */ z(je, {
			deck: $,
			input: jt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${H}-prompts`
		}) } : Ct ? { replacement: /* @__PURE__ */ z(je, {
			deck: $,
			"data-testid": `${H}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ z(je, {
			deck: $,
			input: jt,
			variant: "inset",
			"data-testid": `${H}-prompts`
		}) } : {},
		...Xt ? { modeRowEnd: Xt } : {},
		...Zt ? {
			references: Zt,
			onRemoveReference: Qt
		} : {},
		modePlaceholders: $t,
		commands: It,
		reply: X === "chat" && S?.reply && J?.channel === s ? {
			author: S.reply.author,
			quote: S.reply.text,
			messageId: S.reply.messageId,
			...S.reply.timestamp ? { timestamp: S.reply.timestamp } : {},
			onDismiss: S.clear
		} : null,
		allowAttachments: !!ht,
		...he === void 0 ? {} : { sendWithReferencesOnly: he },
		...en ? { readOnly: en } : {},
		disabled: !!k || !$.typed && !Et && (!!p || Bt || X === "agent" && !u.agent?.allowed),
		draftKey: st,
		...at ? { draft: N } : {},
		...dt === void 0 ? {} : { defaultDraft: dt },
		onDraftChange: pt,
		onSend: (e, t) => Rt(e, t.mode),
		className: t(U.className)
	});
}
function rt(e) {
	return e.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}
function it(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { N as AgentComposerDock, M as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, ae as COMPOSER_MODE_ORDER, he as CONFIRM_OPTIONS, j as CommandSuggestions, ie as ComposerAttachments, me as ComposerConfirmFlow, A as ComposerPresentationContext, je as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, ce as ContextComposer, T as ConversationInputProvider, k as DocumentSuggestions, f as EMOJI_SHORTCODES, D as EmojiSuggestions, se as MentionSuggestions, oe as RichChatComposer, ne as ThreadInputHandoff, _e as answerForOption, Ge as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, O as composerSizeFor, tt as createConversationComposer, J as deckKeyAction, ge as defaultOption, ee as identityDisplayName, p as matchComposerCommand, E as matchesModeTrigger, xe as pageKeypadTarget, G as parseTypedAnswer, V as promptOptions, Ee as promptsInScope, m as searchEmoji, W as takesDirection, U as takesTypedAnswer, S as useComposerFocus, C as useComposerFocusReveal, De as useComposerPromptDeck, $e as useConversationUploads, w as useThreadInput };
