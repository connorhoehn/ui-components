import { c as e, d as t, n } from "../Button-DQoeE5dN.js";
import { i as r } from "../ToastProvider-sYH17V34.js";
import { n as i, t as a } from "../Stack-CE1FjEn8.js";
import { n as o } from "../Text-XdCzxWMv.js";
import { t as s } from "../Select-k38b8PrZ.js";
import { t as c } from "../FormField-BDZIVA7n.js";
import { t as l } from "../Textarea-Cf4WFXAs.js";
import { t as u } from "../DecisionPath-BDXmSSg0.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-CHBTu9L8.js";
import { a as ee, i as v, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as S, i as C, n as te, o as ne, r as w, s as T, t as re } from "../ConversationInputs-CCs-hXjV.js";
import { a as E, c as D, d as ie, i as O, l as k, n as ae, o as A, r as j, s as M, t as oe, u as se } from "../RichChatComposer-CAZnMYX6.js";
import { t as ce } from "../ContextComposer-BHXqIFvn.js";
import { t as N } from "../AgentComposerDock-DJ3xJZQc.js";
import { useCallback as P, useContext as le, useEffect as F, useId as ue, useMemo as I, useRef as L, useState as R } from "react";
import { jsx as z, jsxs as B } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function de(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function V(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var fe = {
	draft: 0,
	review: 1,
	done: 2
};
function pe({ title: e, recipient: r, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: ee = "Confirmed.", continueLabel: v = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: S, onCancel: C, onDone: te, onStageChange: ne, path: w, autoFocus: T = !0, className: re, "data-testid": E = "composer-confirm-flow" }) {
	let [D, ie] = R(s), O = d !== void 0, k = O ? d : D, ae = P((e) => {
		O || ie(e), f?.(e);
	}, [O, f]), [A, j] = R("draft"), [M, oe] = R(!1), [se, ce] = R(null), [N, le] = R(null), I = L(!1), pe = L(null), me = L(null), H = L(null), he = ue(), U = k.trim().length > 0, W = P((e) => {
		j(e), ne?.(e);
	}, [ne]), ge = L(!1);
	F(() => {
		let e = !ge.current;
		ge.current = !0, !(e && !T) && (A === "draft" ? pe.current : A === "review" ? me.current : H.current)?.focus({ preventScroll: !0 });
	}, [A, T]);
	let G = P(() => {
		U && (ce(null), W("review"));
	}, [U, W]), _e = P(async () => {
		if (I.current) return;
		I.current = !0, oe(!0), ce(null);
		let e;
		try {
			e = await S(k);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			I.current = !1, oe(!1);
		}
		if (de(e)) {
			ce(e.error);
			return;
		}
		le(e && "receipt" in e ? e.receipt : null), W("done");
	}, [
		k,
		S,
		W
	]), ve = A === "review" ? h ?? e : A === "done" ? _ : e, K = `${he}-heading`, ye = `${he}-keys`, q = ve || r ? /* @__PURE__ */ B(a, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [ve && /* @__PURE__ */ z(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: K,
			className: "min-w-0",
			children: ve
		}), r && /* @__PURE__ */ z(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${E}-recipient`,
			children: r
		})]
	}) : null, be = w ? /* @__PURE__ */ z(u, {
		steps: w.steps,
		current: w.current + fe[A],
		"data-testid": `${E}-path`
	}) : null;
	return A === "done" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "done",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: H,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": ve ? K : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${E}-done`,
			children: [
				q,
				/* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${E}-done-message`,
					children: N ?? ee
				}),
				te && /* @__PURE__ */ z(a, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ z(n, {
						size: "sm",
						variant: "ghost",
						onClick: te,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${E}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : A === "review" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "review",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: me,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": ve ? K : void 0,
			"aria-describedby": ye,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${E}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), W("draft")) : V(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				q,
				/* @__PURE__ */ z(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${E}-message`,
					children: k
				}),
				/* @__PURE__ */ B(a, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(n, {
							size: "sm",
							variant: "primary",
							disabled: M,
							onClick: () => {
								_e();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${E}-confirm`,
							children: y
						}),
						/* @__PURE__ */ z(n, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => W("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${E}-back`,
							children: b
						}),
						/* @__PURE__ */ z(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ye,
							className: "min-w-0",
							"data-testid": `${E}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				se && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${E}-error`,
					children: se
				}),
				M && /* @__PURE__ */ z(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${E}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ z(o, {
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
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "draft",
		"data-testid": E,
		children: [be, /* @__PURE__ */ B(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), G();
			},
			"aria-labelledby": ve ? K : void 0,
			"data-testid": `${E}-draft`,
			children: [
				q,
				/* @__PURE__ */ z(c, {
					label: p,
					children: (e) => /* @__PURE__ */ z(l, {
						...e,
						ref: pe,
						"aria-describedby": [e["aria-describedby"], ye].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: k,
						placeholder: m,
						onChange: (e) => ae(e.target.value),
						onKeyDown: (e) => {
							V(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || G()));
						},
						"data-testid": `${E}-editor`
					})
				}),
				/* @__PURE__ */ B(a, {
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
							children: v
						}),
						C && /* @__PURE__ */ z(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: C,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${E}-cancel`,
							children: b
						}),
						/* @__PURE__ */ z(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ye,
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
var me = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function H(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? me : [];
}
function he(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function U(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function W(e) {
	return !!e && !e.readOnlyReason && !!e.onDirection && (e.kind === "choice" || e.kind === "confirm");
}
function ge(e) {
	let t = H(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function G(e, t) {
	if (e.kind === "confirm") {
		let n = H(e)[0];
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
function _e(e, t) {
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
function ve(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = H(e).find((e) => e.id === t.optionId);
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
function ye(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function q(e, t) {
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
function Se(e, t) {
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
	if (o || n.readOnlyReason || n.disabledReason) return null;
	let f = H(n);
	if (e.key === "Enter" && l && !a) {
		let e = ge(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = Ce(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => he(e, t) === p), h = m >= 0 ? f[m] : null;
	return h && !h.disabledReason ? {
		type: "pick",
		optionId: h.id
	} : null;
}
function Ce(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var J = [], we = {};
function Te(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function Y(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Ee(e, t) {
	return t == null || e.every((e) => e.scope == null || e.scope === t) ? e : e.filter((e) => e.scope == null || e.scope === t);
}
function De(e, t = {}) {
	let n = t.scope, r = I(() => Ee(e ?? J, n), [e, n]), [i, a] = R(() => /* @__PURE__ */ new Set()), [o, s] = R(null), [c, l] = R(!1), [u, d] = R(null), [f, p] = R({}), [m, h] = R(null), [g, _] = R(we), ee = L(g);
	ee.current = g;
	let v = L(n);
	F(() => {
		v.current !== n && (v.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let y = I(() => K(r, i, g), [
		r,
		i,
		g
	]), b = be(y, o), x = b >= 0 ? y[b] : null, S = u != null, C = L(!1), te = r.map((e) => e.id).join("\0");
	F(() => {
		let e = ye(r, ee.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [te]);
	let ne = y[0]?.id ?? null, w = L(/* @__PURE__ */ new Set());
	F(() => {
		let e = y.some((e) => !w.current.has(e.id));
		for (let e of y) w.current.add(e.id);
		e && l(!1);
	}, [ne, y]);
	let T = P(async (e, t) => {
		if (C.current || e.readOnlyReason || e.disabledReason) return !1;
		C.current = !0, d(e.id), p((t) => {
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
			C.current = !1, d(null);
		}
		return Te(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Y(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : ve(e, t)), !0);
	}, []), re = P(async (e) => {
		let t = x;
		if (!t || t.kind !== "compose" || t.readOnlyReason) return { error: "This question takes no message." };
		if (C.current) return { error: "Still working on the last answer." };
		C.current = !0, d(t.id);
		let n;
		try {
			n = await t.onAnswer({
				kind: "compose",
				message: e
			});
		} catch (e) {
			n = { error: e instanceof Error && e.message ? e.message : "That could not be confirmed. Try again." };
		} finally {
			C.current = !1, d(null);
		}
		return Te(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), E = x ? q(x.id, g) : null, D = P(() => {
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
		if (e.disabledReason || C.current) return !1;
		C.current = !0, d(x.id), p((e) => {
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
			C.current = !1, d(null);
		}
	}, [x, D]), ae = P(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), A = P(async (e) => {
		if (!x) return !1;
		let t = H(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : T(x, G(x, t));
	}, [x, T]), j = P(async (e) => {
		if (!x || !U(x)) return !1;
		let t = _e(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : T(x, t.answer);
	}, [x, T]), M = P(async (e) => {
		let t = x, n = e.trim();
		if (!t || c || !n || t.readOnlyReason || t.disabledReason || t.kind !== "choice" && t.kind !== "confirm") return !1;
		if (!t.onDirection) {
			let e = ge(t), n = e ? `Choose an answer, or press Enter on an empty box for ${e.label}.` : "Choose one of the answers.";
			return p((e) => ({
				...e,
				[t.id]: n
			})), !1;
		}
		if (C.current) return !1;
		C.current = !0, d(t.id), p((e) => {
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
			C.current = !1, d(null);
		}
		return Te(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : Y(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [x, c]), oe = P((e) => {
		if (!y.length) return;
		let t = (b + e + y.length) % y.length;
		s(y[t].id);
	}, [y, b]);
	return {
		pending: y,
		active: x,
		index: b,
		collapsed: c,
		busy: S,
		error: x ? f[x.id] ?? null : null,
		receipt: m,
		visible: y.length > 0 || m != null,
		typed: !c && U(x),
		setCollapsed: l,
		page: oe,
		pick: A,
		answerTyped: j,
		direction: !c && W(x),
		answerDirection: M,
		answerCompose: re,
		isFollowUp: E != null,
		back: D,
		backControl: O,
		goBack: k,
		finish: ae,
		dismissReceipt: () => h(null)
	};
}
var Oe = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function ke({ children: e }) {
	return /* @__PURE__ */ z("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Ae = "max-h-[min(40vh,24rem)] overflow-y-auto overscroll-contain [&>:not(dl)]:shrink-0", je = "min-h-0 overflow-y-auto overscroll-contain";
function Me(e) {
	return e.fullText == null ? typeof e.value == "string" || typeof e.value == "number" ? String(e.value) : void 0 : e.fullText;
}
function Ne({ deck: e, prompts: r, scope: s, input: c = null, submitDisabledReason: d, variant: f = "card", presentation: p, className: m, "data-testid": h = "composer-prompt-deck" }) {
	let g = f === "inset", _ = le(A), ee = p ?? _ ?? "card", v = ee === "prompt", y = De(e ? null : r, { scope: s }), b = e ?? y, x = L(null), S = ue(), C = L(null), [te, ne] = R({
		id: "",
		text: ""
	}), { active: w, pending: T, index: re, collapsed: E, busy: D, error: ie, receipt: O } = b, k = w?.inputDraft?.value ?? (te.id === w?.id ? te.text : ""), ae = !c && b.typed && !w?.readOnlyReason, j = w && !w.readOnlyReason && (d?.trim() || w.disabledReason?.trim()) || null, M = `${S}-disabled-reason`, oe = async () => {
		if (j) return;
		let e = w?.id;
		await b.answerTyped(k) && ne((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, se = L({
		deck: b,
		input: c,
		blockedBy: j
	});
	if (se.current = {
		deck: b,
		input: c,
		blockedBy: j
	}, F(() => {
		if (!w || E || w.readOnlyReason || w.kind === "compose" || w.focusOnArrive === !1) return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = se.current.input;
			t && !x.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : C.current ? C.current.focus() : (x.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? x.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		w?.id,
		E,
		w?.kind,
		w?.readOnlyReason,
		w?.focusOnArrive
	]), F(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n, blockedBy: r } = se.current, i = e.target, a = !!x.current && !!i && x.current.contains(i), o = !!n && n.contains(i), s = !!i && C.current?.contains(i), c = !a && !o && t.active?.keypad === "page" && !t.collapsed && xe(e.target);
			if (!a && !o && !c) return;
			let l = Se({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, c ? {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: !0,
				inDeck: !0,
				busy: t.busy,
				canBack: !1
			} : {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: n ? n.isEmpty() : !C.current?.value.trim(),
				inDeck: a && !s,
				busy: t.busy,
				canBack: !!t.backControl && !t.backControl.disabledReason
			});
			!l || c && l.type !== "pick" || r && l.type === "pick" || (e.preventDefault(), e.stopPropagation(), l.type === "page" ? t.page(l.delta) : l.type === "back" ? t.goBack() : l.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : l.type === "expand" ? t.setCollapsed(!1) : t.pick(l.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !b.visible) return null;
	let ce = X(), N = T.length, P = O ? /* @__PURE__ */ B(a, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: t("min-w-0", g && !E && w && "px-3 pb-2"),
		"data-testid": `${h}-receipt`,
		children: [/* @__PURE__ */ z(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			role: "status",
			className: "min-w-0 flex-1 truncate",
			title: `Answered · ${O}`,
			children: `Answered · ${O}`
		}), /* @__PURE__ */ z(n, {
			variant: "link",
			size: "sm",
			onClick: b.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!w || E) return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", g && "border-b border-border px-3 py-1.5", m),
		"data-composer-prompt-deck": w ? "collapsed" : "answered",
		"data-deck-variant": f,
		"data-presentation": ee,
		"data-testid": h,
		ref: x,
		children: [w && /* @__PURE__ */ B(a, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: t("min-w-0", !g && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ z(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: N === 1 ? `1 question waiting · ${w.title}` : `${N} questions waiting · ${w.title}`
				}),
				/* @__PURE__ */ z(n, {
					variant: "link",
					size: "sm",
					onClick: () => b.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${h}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ z(ke, { children: `${ce}↓` })
			]
		}), P]
	});
	let I = H(w), de = U(w), V = w.kind === "compose" && !w.readOnlyReason, fe = ge(w), me = `${S}-title`, W = `${S}-question`, G = I.map((e, t) => he(e, t)), _e = [
		I.length ? `${de ? "Alt+" : ""}${G.filter(Boolean).length > 1 ? `${G[0]}–${G[G.length - 1]}` : G[0] ?? ""} choose` : null,
		de ? "type an answer · Enter answer" : fe ? `Enter ${fe.label}` : null,
		N > 1 ? `${ce}↓ next` : null,
		b.backControl && !b.backControl.disabledReason ? `Alt+⌫ ${b.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: t("min-w-0", g && "border-b border-border", m),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : w.kind,
		"data-deck-variant": f,
		"data-presentation": ee,
		"data-testid": h,
		ref: x,
		children: [
			w.focusOnArrive === !1 && /* @__PURE__ */ z("span", {
				role: "status",
				"aria-live": "polite",
				className: "sr-only",
				"data-testid": `${h}-arrival`,
				children: `New question: ${w.title}`
			}),
			/* @__PURE__ */ B("section", {
				"data-ui-part": "",
				role: "group",
				"aria-labelledby": me,
				"aria-describedby": W,
				"aria-busy": D || void 0,
				className: t("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ae, !g && "rounded-lg border border-border bg-surface"),
				"data-composer-prompt": w.id,
				"data-composer-prompt-kind": w.kind,
				"data-testid": `${h}-card`,
				children: [
					w.path && !V && /* @__PURE__ */ z(u, {
						steps: w.path.steps,
						current: w.path.current,
						"data-testid": `${h}-path`
					}),
					/* @__PURE__ */ B(a, {
						gap: "sm",
						align: "center",
						wrap: !1,
						className: "min-w-0",
						children: [
							/* @__PURE__ */ B(i, {
								gap: "none",
								className: "min-w-0 flex-1",
								children: [w.eyebrow && /* @__PURE__ */ z(o, {
									size: "xs",
									tone: "tertiary",
									className: "truncate",
									children: w.eyebrow
								}), /* @__PURE__ */ z(o, {
									as: "p",
									size: "sm",
									weight: "semibold",
									tone: "primary",
									className: "min-w-0 truncate",
									id: me,
									title: w.title,
									children: w.title
								})]
							}),
							b.backControl && /* @__PURE__ */ z(n, {
								variant: "ghost",
								size: "sm",
								className: "shrink-0",
								"aria-keyshortcuts": "Alt+Backspace",
								disabled: D || !!b.backControl.disabledReason,
								title: b.backControl.disabledReason,
								onClick: () => {
									b.goBack();
								},
								"data-composer-prompt-back": "",
								"data-composer-readonly-allow": "Returns to the previous step without submitting an answer",
								"data-testid": `${h}-back`,
								children: b.backControl.label
							}),
							N > 1 && /* @__PURE__ */ B(a, {
								gap: "xs",
								align: "center",
								wrap: !1,
								className: "shrink-0",
								children: [
									/* @__PURE__ */ z(o, {
										size: "xs",
										tone: "secondary",
										tabular: !0,
										"data-testid": `${h}-position`,
										children: `${re + 1} of ${N}`
									}),
									/* @__PURE__ */ z(n, {
										variant: "ghost",
										size: "sm",
										"aria-label": "Previous question",
										"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
										onClick: () => b.page(-1),
										"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
										"data-testid": `${h}-previous`,
										children: "‹"
									}),
									/* @__PURE__ */ z(n, {
										variant: "ghost",
										size: "sm",
										"aria-label": "Next question",
										"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
										onClick: () => b.page(1),
										"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
										"data-testid": `${h}-next`,
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
									b.setCollapsed(!0), c?.focus();
								},
								"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
								"data-testid": `${h}-hide`,
								children: "Hide"
							})
						]
					}),
					N > 1 && /* @__PURE__ */ z(a, {
						gap: "xs",
						wrap: !1,
						"aria-hidden": !0,
						className: "min-w-0",
						"data-testid": `${h}-progress`,
						children: T.map((e, n) => /* @__PURE__ */ z(i, {
							gap: "none",
							className: t("h-1 min-w-0 flex-1 rounded-full", n === re ? "bg-primary" : "bg-border")
						}, e.id))
					}),
					w.fields && w.fields.length > 0 && v && /* @__PURE__ */ z("dl", {
						className: "m-0 flex min-w-0 flex-col gap-0.5",
						"data-testid": `${h}-fields`,
						children: w.fields.map((e, n) => /* @__PURE__ */ B("div", {
							className: "flex min-w-0 items-baseline gap-2",
							"data-composer-prompt-field": "",
							children: [/* @__PURE__ */ z("dt", {
								className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
								children: e.label
							}), /* @__PURE__ */ z("dd", {
								className: t("m-0 min-w-0 flex-1 truncate text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
								...Me(e) == null ? {} : { title: Me(e) },
								children: e.value
							})]
						}, `${e.label}-${n}`))
					}),
					w.fields && w.fields.length > 0 && !v && /* @__PURE__ */ z("dl", {
						className: t("m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5", je),
						"data-testid": `${h}-fields`,
						children: w.fields.map((e, n) => e.line === "one-line" ? /* @__PURE__ */ B("div", {
							className: "flex min-w-0 max-w-full flex-col",
							"data-composer-prompt-field-line": "one",
							children: [/* @__PURE__ */ z("dt", {
								className: "m-0 text-xs font-normal text-text-tertiary",
								children: e.label
							}), /* @__PURE__ */ z("dd", {
								className: t("m-0 min-w-0 truncate text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
								...Me(e) == null ? {} : { title: Me(e) },
								children: e.value
							})]
						}, `${e.label}-${n}`) : /* @__PURE__ */ B("div", {
							className: "flex min-w-0 max-w-full flex-col",
							children: [/* @__PURE__ */ z("dt", {
								className: "m-0 text-xs font-normal text-text-tertiary",
								children: e.label
							}), /* @__PURE__ */ z("dd", {
								className: t("m-0 min-w-0 break-words text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
								...typeof e.value == "string" ? { title: e.value } : {},
								children: e.value
							})]
						}, `${e.label}-${n}`))
					}),
					/* @__PURE__ */ z(o, {
						as: "p",
						size: "sm",
						tone: "primary",
						wrap: !0,
						id: W,
						className: "min-w-0",
						children: w.question
					}),
					w.readOnlyReason ? /* @__PURE__ */ z(o, {
						as: "p",
						size: "xs",
						tone: "secondary",
						wrap: !0,
						"data-testid": `${h}-read-only`,
						children: w.readOnlyReason
					}) : V ? /* @__PURE__ */ z(pe, {
						recipient: w.compose?.recipient,
						defaultMessage: w.compose?.initialMessage,
						messageLabel: w.compose?.messageLabel,
						placeholder: w.compose?.placeholder,
						reviewTitle: w.compose?.reviewTitle,
						note: w.compose?.note,
						doneTitle: w.compose?.doneTitle,
						doneMessage: w.compose?.doneMessage,
						continueLabel: w.compose?.continueLabel,
						confirmLabel: w.compose?.confirmLabel,
						backLabel: w.compose?.backLabel,
						doneActionLabel: w.compose?.doneActionLabel,
						path: w.path,
						onConfirm: (e) => b.answerCompose(e),
						onCancel: b.isFollowUp ? () => {
							b.back();
						} : w.compose?.onCancel ? () => {
							w.compose?.onCancel?.(), b.finish();
						} : void 0,
						onDone: () => {
							b.finish(), c?.focus();
						},
						"data-testid": `${h}-compose`
					}, w.id) : I.length > 0 && /* @__PURE__ */ z(a, {
						gap: "xs",
						wrap: !0,
						className: "min-w-0",
						role: "list",
						"aria-label": "Answers",
						children: I.map((e, t) => {
							let r = G[t], a = r ? `${de ? "Alt+" : ""}${r}` : void 0;
							return /* @__PURE__ */ B(i, {
								gap: "none",
								role: "listitem",
								className: "min-w-0",
								children: [/* @__PURE__ */ B(n, {
									size: "sm",
									variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
									disabled: D || !!e.disabledReason || !!j,
									title: e.disabledReason ?? j ?? e.hint,
									"aria-keyshortcuts": a,
									"aria-describedby": [e.hint && `${S}-hint-${t}`, j && M].filter(Boolean).join(" ") || void 0,
									onClick: () => {
										b.pick(e.id).then((e) => {
											e && c?.focus();
										});
									},
									"data-composer-prompt-option": e.id,
									"data-default": fe?.id === e.id || void 0,
									"data-testid": `${h}-option-${e.id}`,
									children: [a && !v && /* @__PURE__ */ z(ke, { children: a }), e.label]
								}), e.hint && /* @__PURE__ */ z(o, {
									size: "xs",
									tone: "tertiary",
									className: "hidden",
									id: `${S}-hint-${t}`,
									children: e.hint
								})]
							}, e.id);
						})
					}),
					ae && /* @__PURE__ */ B(i, {
						gap: "sm",
						className: "min-w-0",
						children: [/* @__PURE__ */ z(l, {
							ref: C,
							"aria-label": w.title,
							placeholder: w.placeholder ?? "Your answer",
							value: k,
							disabled: D || !!j,
							autoResize: !0,
							minRows: w.kind === "number" ? 1 : 2,
							inputMode: w.kind === "number" ? "decimal" : void 0,
							onChange: (e) => w.inputDraft ? w.inputDraft.onChange(e.target.value) : ne({
								id: w.id,
								text: e.target.value
							}),
							onKeyDown: (e) => {
								e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), !D && !j && oe());
							},
							"data-testid": `${h}-answer`
						}), /* @__PURE__ */ B(a, {
							gap: "sm",
							align: "center",
							justify: j ? "between" : "end",
							wrap: !1,
							className: "min-w-0",
							children: [j && /* @__PURE__ */ z(o, {
								as: "p",
								size: "xs",
								tone: "secondary",
								id: M,
								title: j,
								className: "min-w-0",
								"data-testid": `${h}-disabled-reason`,
								children: /* @__PURE__ */ z("span", {
									className: "truncate",
									children: j
								})
							}), /* @__PURE__ */ z(n, {
								variant: "primary",
								size: "sm",
								className: "shrink-0",
								disabled: D || !!j || !k.trim(),
								...j ? {
									title: j,
									"aria-describedby": M
								} : {},
								onClick: () => {
									oe();
								},
								"data-testid": `${h}-submit`,
								children: "Answer"
							})]
						})]
					}),
					j && !V && !ae && /* @__PURE__ */ z(o, {
						as: "p",
						size: "xs",
						tone: "secondary",
						wrap: !0,
						id: M,
						className: "min-w-0",
						"data-testid": `${h}-disabled-reason`,
						children: j
					}),
					ie && !V && /* @__PURE__ */ z(o, {
						as: "p",
						size: "xs",
						wrap: !0,
						role: "alert",
						className: "text-danger-fg",
						"data-testid": `${h}-error`,
						children: ie
					}),
					D && !V && /* @__PURE__ */ z(o, {
						as: "p",
						size: "xs",
						tone: "secondary",
						role: "status",
						"data-testid": `${h}-busy`,
						children: "Working…"
					}),
					!v && !w.readOnlyReason && !V && /* @__PURE__ */ z(o, {
						as: "p",
						size: "xs",
						tone: "tertiary",
						wrap: !0,
						className: "min-w-0",
						"data-testid": `${h}-keys`,
						children: _e
					})
				]
			}),
			P
		]
	});
}
function Pe(e) {
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
function Fe(e, t, n) {
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
function Ie(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Le(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Re(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Le(e.html).length > 0;
}
function ze(e) {
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
function Be(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Ve(e, t) {
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
function He(e) {
	return `${Z}${e}`;
}
function Ue(e, t) {
	try {
		let n = e?.getItem(He(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Le(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function We(e, t, n) {
	try {
		Le(n) ? e?.setItem(He(t), JSON.stringify({ html: n })) : e?.removeItem(He(t));
	} catch {}
}
var Ge = "Conversation changed; draft retained.";
function Ke(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function qe(e) {
	return e.map((e) => e.name).join(", ");
}
var Je = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Ke(`timed out (${n})`)));
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
}, Ye = "Message sent. Your current draft has been kept.", Xe = "This destination is no longer available. Choose a current destination.", Ze = "This view has no page to attach.";
function Qe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function $e(e, t) {
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
function et() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function tt(e, t, n, r = 6e4) {
	let i = L(new Je()), a = L(t);
	a.current = t, F(() => () => i.current.rejectAll(Ge), [t]);
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
			throw new _(Ke(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Ge);
		if (n.status === "failed") throw new _(Ke(n.error));
		if (!n.transferId) throw new _(Ke(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : Ke(void 0));
		}
	}, [o, r]);
	return P((e) => Promise.all(e.map(s)), [s]);
}
function nt({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: i, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ B(a, {
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
			...i ? { "data-composer-readonly-allow": i } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => r(e.target.value)
		})]
	});
}
function rt(e) {
	function t(t) {
		return /* @__PURE__ */ z(it, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function it({ rm: n, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: b, callBlock: x, reply: C, mode: te, onModeChange: ne, defaultMode: T, draftKey: re, persistDraft: E = !0, claim: D = !1, answersFocus: ie = !1, onReveal: O, disabled: k, offModes: ae, prompts: A, promptScope: j, composerRef: M, onDraftChange: oe, defaultDraft: se, draft: N, above: le, foldRecipients: ue = !1, modeRowEnd: de, references: V, onRemoveReference: fe, modePlaceholders: pe, contextChip: me, sendWithReferencesOnly: H, console: he, submitDisabledReason: U, "data-testid": W = "conversation-composer", ...G }) {
	let _e = e() === "compact", ve = f?.displayName || "You", K = re ?? s ?? `${l.kind}:${l.id}`, ye = u.readOnlyReason || "You can read this conversation but not post to it.", q = I(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? ye,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		ye
	]), [be, xe] = R(null), Se = g === void 0 ? be : g, Ce = !!Se && !q.some((e) => e.id === Se), J = Ce ? {
		id: Se,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Xe
	} : Fe(q, Se, h), we = q.filter((e) => !e.disabled && !e.unavailableReason).length, Te = q.length > 0, Y = $e(Pe({
		capabilities: u,
		hasChat: Te,
		choosable: we,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), ae), Ee = T && Y.modes.includes(T) ? T : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Oe, ke] = R(Ee), X = te ?? Oe, Ae = P((e) => {
		te === void 0 && ke(e), ne?.(e);
	}, [te, ne]), je = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	F(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Ae(e);
	}, [
		je,
		X,
		Ae
	]);
	let [Me, Le] = R(!0), Z = l.reference ?? null;
	F(() => {
		Le(!0);
	}, [Z?.id]);
	let He = !!J && J.carriesReference !== !1, Ge = !!Z && !Z.page, Ke = !!J && J.channel !== s, Je = !!Z && Me && !(X === "chat" && (!He || Ge && Ke)), rt = X === "chat" && He && Me && !(Ge && Ke) ? Z : null, it = L(0), st = N !== void 0, ct = f?.userId?.trim() || null, Q = ct ? JSON.stringify([
		"actor",
		ct,
		K
	]) : null, lt = E && !st ? JSON.stringify([
		"actor",
		ct,
		K
	]) : K, ut = JSON.stringify([
		K,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), dt = L(ut);
	dt.current !== ut && (dt.current = ut, it.current += 1);
	let ft = L(N);
	ft.current = N;
	let pt = I(() => {
		if (st || !E || !Q) return se;
		let e = Ue(et(), Q);
		return e ? {
			html: e,
			files: []
		} : se;
	}, [
		lt,
		st,
		E
	]), mt = L(""), ht = P((e, t) => {
		it.current += 1, mt.current = e.html, E && !st && Q && We(et(), Q, e.html), c?.setTyping?.(Re({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}));
		let n = gt.current;
		if (n && n.value !== void 0) {
			let t = St.current?.editor?.getText() ?? at(e.html);
			t !== n.lastSent && (n.lastSent = t, n.onChange(t));
		}
		oe?.(e, t);
	}, [
		E,
		st,
		Q,
		c,
		X,
		J?.channel,
		s,
		oe
	]), gt = L(null);
	F(() => {
		Re({
			html: mt.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		s
	]);
	let _t = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, vt = tt(n, _t, ve), [yt, bt] = R(null), xt = r(), St = L(null), Ct = P((e) => {
		St.current = e, Qe(M, e);
	}, [M]), wt = P(() => {
		O?.();
		let e = 20, t = () => {
			St.current ? St.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [O]), $ = De(A, { scope: j }), Tt = !!$.active && !$.collapsed, Et = G.presentation === "prompt", Dt = Et && Tt && $.active?.kind !== "compose", Ot = Dt && !$.active?.readOnlyReason, kt = Dt ? $.active?.inputDraft : void 0;
	gt.current = kt ? {
		value: kt.value,
		onChange: kt.onChange,
		lastSent: gt.current?.lastSent ?? kt.value
	} : null;
	let At = L(null), jt = kt && $.active ? $.active.id : null;
	F(() => {
		if (jt === At.current || (At.current = jt, !jt || !kt)) return;
		let e = kt.value, t = 20, n = () => {
			let r = St.current?.editor;
			if (!r) {
				t-- > 0 && requestAnimationFrame(n);
				return;
			}
			gt.current && (gt.current.lastSent = e), r.getText() !== e && r.commands.setContent(ee(e).html, { emitUpdate: !0 }), r.commands.focus("end");
		};
		n();
	}, [jt]);
	let Mt = L(!1);
	F(() => {
		Tt ? c?.setTyping?.(!1) : Mt.current && wt(), Mt.current = Tt;
	}, [
		Tt,
		c,
		wt
	]);
	let Nt = I(() => ({
		isEmpty: () => !St.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!St.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: wt
	}), [wt]), Pt = P((e) => {
		xe(e), v?.(e), it.current += 1, bt(null), q.find((t) => t.id === e)?.onSelect?.();
	}, [q, v]), Ft = q.filter((e) => e.claim !== !1);
	w({
		channels: D ? Ie(u.maySend || m === void 0 ? s : null, Ft) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = Ft.find((t) => t.channel === e.channel);
			return Ae("chat"), t && Pt(t.id), wt(), !0;
		}
	});
	let It = P((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (Ae("agent"), wt(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? q.find((e) => e.channel && e.channel === s) ?? (m ? q.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? Ft.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? q.find((e) => e.id === `person:${t.userId}`) ?? null : q.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && Pt(n.id), Ae("chat"), wt(), !0);
	}, [
		Y,
		Ae,
		wt,
		J,
		q,
		m,
		Ft,
		s,
		Pt
	]);
	S(It, ie);
	let Lt = I(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), Rt = I(() => Lt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [Lt]), zt = (e) => {
		if (typeof e == "string") throw new _(e);
		return e !== !1;
	}, Bt = async (e, t) => {
		if (bt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !st && Q && We(et(), Q, ""), t;
		}
		if (Ot) {
			let t = await $.answerDirection(e.text);
			return t && E && !st && Q && We(et(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: rt ?? (Me ? Z : null),
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Be(t), a = Ve(t, r) ?? (i === t ? null : Ve(i, r));
			if (a) {
				let e = Ve(t, [a.command]) ? t : i;
				return !a.command.disabled && zt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return zt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? zt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Ve(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), zt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!H && (!!rt || (V?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !_t) return !1;
		c?.setTyping?.(!1);
		let a = it.current, o = dt.current, l = e.files.length ? await vt(e.files) : [], d = !!J.channel && J.channel === s, f = ze({
			displayName: ve,
			reply: d ? C?.reply ?? null : null,
			reference: rt,
			attachments: l
		}), m = r || qe(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: rt
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? it.current !== a || ft.current !== N ? (dt.current === o && xt?.toast(Ye, { type: "success" }), !1) : (d && C?.clear(), E && !st && Q && We(et(), Q, ""), !0) : !1;
	}, Vt = !!u.pending, Ht = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Ut = Ht && !$.typed && !Ot && !k && !p && !Vt, Wt = Je && Z ? /* @__PURE__ */ z(d, {
		references: [{
			id: Z.id,
			label: _e ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Ut ? {} : { onRemove: () => {
			Le(!1), it.current += 1, fe?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Gt = Ce && J ? [...q, J] : q, Kt = X === "chat" && Gt.length > 1, qt = X === "chat" && Me && Ge && Ke && He, Jt = X === "chat" && Gt.length > 1 && !Vt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Yt = X === "chat" ? J?.error ?? null : null, Xt = ue && Kt && !Jt && !yt && !qt && !Yt && (le == null || le === !1), Zt = Kt || Jt || yt || qt || Yt || le != null && le !== !1 ? /* @__PURE__ */ B(i, {
		gap: "xs",
		children: [
			le,
			(Kt || Jt) && /* @__PURE__ */ B(a, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Kt && /* @__PURE__ */ z(nt, {
					id: `${K}-recipient`,
					value: J?.id ?? null,
					recipients: Gt,
					onChange: Pt,
					"data-testid": `${W}-recipient`,
					...Ut ? we > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Jt && /* @__PURE__ */ z(o, {
					size: "xs",
					tone: "tertiary",
					title: Jt,
					className: t("min-w-0", Kt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${W}-recipient-unavailable`,
					children: /* @__PURE__ */ z("span", {
						className: "truncate",
						children: Jt
					})
				})]
			}),
			qt && /* @__PURE__ */ z(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ze
			}),
			yt && /* @__PURE__ */ z(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${W}-note`,
				children: yt
			}),
			Yt && /* @__PURE__ */ z(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${W}-recipient-error`,
				children: Yt
			})
		]
	}) : void 0, Qt = !_e, $t = Qt && Wt || de ? /* @__PURE__ */ B(a, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Qt ? Wt : null, de]
	}) : void 0, en = !Qt && Je && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...V ?? []] : V, tn = (e) => {
		Z && e === Z.id && (Le(!1), it.current += 1), fe?.(e);
	}, nn = {
		...pe,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : Et ? $.active.placeholder ?? ot($.direction, ge($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, rn = Ut ? Jt ? we > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? ye : "Choose a destination.") : null, an = $.typed || Ot ? $.active?.disabledReason ?? null : U ?? null;
	return /* @__PURE__ */ z(ce, {
		collapsible: !0,
		...G,
		collapsedLabel: G.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: Ct,
		"data-testid": W,
		..._e ? { responsive: "pane" } : {},
		console: he ?? !!x,
		dock: x,
		mode: X,
		onModeChange: Ae,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: Te && !Y.reasons.chat,
		contextChip: me ?? (!Z && void 0),
		...!Tt && Xt ? { foldingAbove: Zt } : { above: Tt ? le : Zt },
		...Dt ? { header: /* @__PURE__ */ z(Ne, {
			deck: $,
			input: Nt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${W}-prompts`
		}) } : Tt ? { replacement: /* @__PURE__ */ z(Ne, {
			deck: $,
			"data-testid": `${W}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ z(Ne, {
			deck: $,
			input: Nt,
			variant: "inset",
			"data-testid": `${W}-prompts`
		}) } : {},
		headerFolds: $.collapsed && !!$.active,
		...$t ? { modeRowEnd: $t } : {},
		...en ? {
			references: en,
			onRemoveReference: tn
		} : {},
		modePlaceholders: nn,
		commands: Rt,
		reply: X === "chat" && C?.reply && J?.channel === s ? {
			author: C.reply.author,
			quote: C.reply.text,
			messageId: C.reply.messageId,
			...C.reply.timestamp ? { timestamp: C.reply.timestamp } : {},
			onDismiss: C.clear
		} : null,
		allowAttachments: !!_t,
		...H === void 0 ? {} : { sendWithReferencesOnly: H },
		...rn ? { readOnly: rn } : {},
		...an ? { submitDisabledReason: an } : {},
		disabled: !!k || !$.typed && !Ot && (!!p || Ht || X === "agent" && !u.agent?.allowed),
		draftKey: lt,
		...st ? { draft: N } : {},
		...pt === void 0 ? {} : { defaultDraft: pt },
		onDraftChange: ht,
		onSend: (e, t) => Bt(e, t.mode),
		className: t(G.className)
	});
}
function at(e) {
	return e.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}
function ot(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { N as AgentComposerDock, oe as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, ae as COMPOSER_MODE_ORDER, me as CONFIRM_OPTIONS, M as CommandSuggestions, ie as ComposerAttachments, pe as ComposerConfirmFlow, A as ComposerPresentationContext, Ne as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, ce as ContextComposer, re as ConversationInputProvider, k as DocumentSuggestions, f as EMOJI_SHORTCODES, D as EmojiSuggestions, se as MentionSuggestions, j as RichChatComposer, te as ThreadInputHandoff, G as answerForOption, qe as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, ee as composerDraftOf, h as composerSendErrorReason, O as composerSizeFor, rt as createConversationComposer, Se as deckKeyAction, ge as defaultOption, v as identityDisplayName, p as matchComposerCommand, E as matchesModeTrigger, xe as pageKeypadTarget, _e as parseTypedAnswer, H as promptOptions, Ee as promptsInScope, m as searchEmoji, W as takesDirection, U as takesTypedAnswer, C as useComposerFocus, ne as useComposerFocusReveal, De as useComposerPromptDeck, tt as useConversationUploads, T as useThreadInput };
