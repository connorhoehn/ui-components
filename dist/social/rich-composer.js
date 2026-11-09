import { c as e, d as t, n } from "../Button-DQoeE5dN.js";
import { i as r } from "../ToastProvider-Dgew98nE.js";
import { i, n as a, r as o } from "../Text-DYn7PTcU.js";
import { t as s } from "../Select-SZWRrONZ.js";
import { t as c } from "../FormField-BDZIVA7n.js";
import { t as l } from "../Textarea-Cf4WFXAs.js";
import { t as u } from "../DecisionPath-CUrGXMTf.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-vB7M56RD.js";
import { a as v, i as ee, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as C, o as w, r as ne, s as T, t as E } from "../ConversationInputs-BLX0EsnD.js";
import { a as D, c as O, d as re, i as k, l as A, n as ie, o as j, r as ae, s as M, t as N, u as oe } from "../RichChatComposer-BTpLwFVg.js";
import { t as P } from "../ContextComposer-1Q84zeyb.js";
import { t as F } from "../AgentComposerDock-qUH9Z6_8.js";
import { useCallback as I, useContext as se, useEffect as L, useId as ce, useMemo as R, useRef as z, useState as B } from "react";
import { jsx as V, jsxs as H } from "react/jsx-runtime";
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
function fe({ title: e, recipient: r, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: ee = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: C, onStageChange: w, path: ne, autoFocus: T = !0, className: E, "data-testid": D = "composer-confirm-flow" }) {
	let [O, re] = B(s), k = d !== void 0, A = k ? d : O, ie = I((e) => {
		k || re(e), f?.(e);
	}, [k, f]), [j, ae] = B("draft"), [M, N] = B(!1), [oe, P] = B(null), [F, se] = B(null), R = z(!1), fe = z(null), pe = z(null), U = z(null), me = ce(), W = A.trim().length > 0, G = I((e) => {
		ae(e), w?.(e);
	}, [w]), he = z(!1);
	L(() => {
		let e = !he.current;
		he.current = !0, !(e && !T) && (j === "draft" ? fe.current : j === "review" ? pe.current : U.current)?.focus({ preventScroll: !0 });
	}, [j, T]);
	let ge = I(() => {
		W && (P(null), G("review"));
	}, [W, G]), _e = I(async () => {
		if (R.current) return;
		R.current = !0, N(!0), P(null);
		let e;
		try {
			e = await te(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			R.current = !1, N(!1);
		}
		if (le(e)) {
			P(e.error);
			return;
		}
		se(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		A,
		te,
		G
	]), K = j === "review" ? h ?? e : j === "done" ? _ : e, ve = `${me}-heading`, q = `${me}-keys`, ye = K || r ? /* @__PURE__ */ H(o, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [K && /* @__PURE__ */ V(a, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: ve,
			className: "min-w-0",
			children: K
		}), r && /* @__PURE__ */ V(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${D}-recipient`,
			children: r
		})]
	}) : null, be = ne ? /* @__PURE__ */ V(u, {
		steps: ne.steps,
		current: ne.current + de[j],
		"data-testid": `${D}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ H(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "done",
		"data-testid": D,
		children: [be, /* @__PURE__ */ H(i, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": K ? ve : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${D}-done`,
			children: [
				ye,
				/* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-done-message`,
					children: F ?? v
				}),
				C && /* @__PURE__ */ V(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ V(n, {
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
	}) : j === "review" ? /* @__PURE__ */ H(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "review",
		"data-testid": D,
		children: [be, /* @__PURE__ */ H(i, {
			as: "section",
			gap: "xs",
			ref: pe,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": K ? ve : void 0,
			"aria-describedby": q,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${D}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : ue(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				ye,
				/* @__PURE__ */ V(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${D}-message`,
					children: A
				}),
				/* @__PURE__ */ H(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(n, {
							size: "sm",
							variant: "primary",
							disabled: M,
							onClick: () => {
								_e();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${D}-confirm`,
							children: y
						}),
						/* @__PURE__ */ V(n, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${D}-back`,
							children: b
						}),
						/* @__PURE__ */ V(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: q,
							className: "min-w-0",
							"data-testid": `${D}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				oe && /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${D}-error`,
					children: oe
				}),
				M && /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${D}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ V(a, {
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
	}) : /* @__PURE__ */ H(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "draft",
		"data-testid": D,
		children: [be, /* @__PURE__ */ H(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), ge();
			},
			"aria-labelledby": K ? ve : void 0,
			"data-testid": `${D}-draft`,
			children: [
				ye,
				/* @__PURE__ */ V(c, {
					label: p,
					children: (e) => /* @__PURE__ */ V(l, {
						...e,
						ref: fe,
						"aria-describedby": [e["aria-describedby"], q].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							ue(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || ge()));
						},
						"data-testid": `${D}-editor`
					})
				}),
				/* @__PURE__ */ H(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !W,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${D}-continue`,
							children: ee
						}),
						S && /* @__PURE__ */ V(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${D}-cancel`,
							children: b
						}),
						/* @__PURE__ */ V(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: q,
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
function U(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? pe : [];
}
function me(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function W(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function G(e) {
	return !!e && !e.readOnlyReason && !!e.onDirection && (e.kind === "choice" || e.kind === "confirm");
}
function he(e) {
	let t = U(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function ge(e, t) {
	if (e.kind === "confirm") {
		let n = U(e)[0];
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
function K(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = U(e).find((e) => e.id === t.optionId);
	return `${e.title}: ${n?.label ?? t.optionId}`;
}
function ve(e, t, n = {}) {
	let r = [];
	for (let i of e) {
		let e = i, a = /* @__PURE__ */ new Set();
		for (; e && t.has(e.id) && !a.has(e.id);) a.add(e.id), e = n[e.id];
		e && !t.has(e.id) && r.push(e);
	}
	return r;
}
function q(e, t = {}) {
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
	let u = W(n), d = l && !e.altKey && (!u && !G(n) || a);
	if (d && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (d && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let f = U(n);
	if (e.key === "Enter" && l && !a) {
		let e = he(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = J(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => me(e, t) === p), h = m >= 0 ? f[m] : null;
	return h && !h.disabledReason ? {
		type: "pick",
		optionId: h.id
	} : null;
}
function J(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var Ce = [], we = {};
function Y(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function Te(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Ee(e, t) {
	return t == null || e.every((e) => e.scope == null || e.scope === t) ? e : e.filter((e) => e.scope == null || e.scope === t);
}
function De(e, t = {}) {
	let n = t.scope, r = R(() => Ee(e ?? Ce, n), [e, n]), [i, a] = B(() => /* @__PURE__ */ new Set()), [o, s] = B(null), [c, l] = B(!1), [u, d] = B(null), [f, p] = B({}), [m, h] = B(null), [g, _] = B(we), v = z(g);
	v.current = g;
	let ee = z(n);
	L(() => {
		ee.current !== n && (ee.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let y = R(() => ve(r, i, g), [
		r,
		i,
		g
	]), b = be(y, o), x = b >= 0 ? y[b] : null, te = u != null, S = z(!1), C = r.map((e) => e.id).join("\0");
	L(() => {
		let e = q(r, v.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [C]);
	let w = y[0]?.id ?? null, ne = z(/* @__PURE__ */ new Set());
	L(() => {
		let e = y.some((e) => !ne.current.has(e.id));
		for (let e of y) ne.current.add(e.id);
		e && l(!1);
	}, [w, y]);
	let T = I(async (e, t) => {
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
		return Y(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Te(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : K(e, t)), !0);
	}, []), E = I(async (e) => {
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
		return Y(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), D = x ? ye(x.id, g) : null, O = I(() => {
		if (!x || D == null) return !1;
		let e = x.id;
		return _((e) => {
			let { [D]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(D), n.delete(e), n;
		}), s(D), !0;
	}, [x, D]), re = x?.back, k = re ? {
		label: re.label || "Back",
		...re.disabledReason ? { disabledReason: re.disabledReason } : {}
	} : D != null && x?.kind !== "compose" ? { label: "Back" } : null, A = I(async () => {
		if (!x) return !1;
		let e = x.back;
		if (!e) return x.kind !== "compose" && O();
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
	}, [x, O]), ie = I(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), j = I(async (e) => {
		if (!x) return !1;
		let t = U(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : T(x, ge(x, t));
	}, [x, T]), ae = I(async (e) => {
		if (!x || !W(x)) return !1;
		let t = _e(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : T(x, t.answer);
	}, [x, T]), M = I(async (e) => {
		let t = x, n = e.trim();
		if (!t || c || !n || t.readOnlyReason || t.kind !== "choice" && t.kind !== "confirm") return !1;
		if (!t.onDirection) {
			let e = he(t), n = e ? `Choose an answer, or press Enter on an empty box for ${e.label}.` : "Choose one of the answers.";
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
		return Y(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : Te(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [x, c]), N = I((e) => {
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
		typed: !c && W(x),
		setCollapsed: l,
		page: N,
		pick: j,
		answerTyped: ae,
		direction: !c && G(x),
		answerDirection: M,
		answerCompose: E,
		isFollowUp: D != null,
		back: O,
		backControl: k,
		goBack: A,
		finish: ie,
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
function X({ children: e }) {
	return /* @__PURE__ */ V("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function ke() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Ae = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function je({ deck: e, prompts: r, scope: s, input: c = null, variant: d = "card", presentation: f, className: p, "data-testid": m = "composer-prompt-deck" }) {
	let h = d === "inset", g = se(j), _ = f ?? g ?? "card", v = _ === "prompt", ee = De(e ? null : r, { scope: s }), y = e ?? ee, b = z(null), x = ce(), te = z(null), [S, C] = B({
		id: "",
		text: ""
	}), { active: w, pending: ne, index: T, collapsed: E, busy: D, error: O, receipt: re } = y, k = w?.inputDraft?.value ?? (S.id === w?.id ? S.text : ""), A = !c && y.typed && !w?.readOnlyReason, ie = async () => {
		let e = w?.id;
		await y.answerTyped(k) && C((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, ae = z({
		deck: y,
		input: c
	});
	if (ae.current = {
		deck: y,
		input: c
	}, L(() => {
		if (!w || E || w.readOnlyReason || w.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = ae.current.input;
			t && !b.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : te.current ? te.current.focus() : (b.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? b.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		w?.id,
		E,
		w?.kind,
		w?.readOnlyReason
	]), L(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = ae.current, r = e.target, i = !!b.current && !!r && b.current.contains(r), a = !!n && n.contains(r), o = !!r && te.current?.contains(r), s = !i && !a && t.active?.keypad === "page" && !t.collapsed && xe(e.target);
			if (!i && !a && !s) return;
			let c = Se({
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
	let M = ke(), N = ne.length, oe = re ? /* @__PURE__ */ H(o, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: t("min-w-0", h && !E && w && "px-3 pb-2"),
		"data-testid": `${m}-receipt`,
		children: [/* @__PURE__ */ V(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${re}`
		}), /* @__PURE__ */ V(n, {
			variant: "link",
			size: "sm",
			onClick: y.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!w || E) return /* @__PURE__ */ H(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border px-3 py-1.5", p),
		"data-composer-prompt-deck": w ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [w && /* @__PURE__ */ H(o, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: t("min-w-0", !h && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ V(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: N === 1 ? `1 question waiting · ${w.title}` : `${N} questions waiting · ${w.title}`
				}),
				/* @__PURE__ */ V(n, {
					variant: "link",
					size: "sm",
					onClick: () => y.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${m}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ V(X, { children: `${M}↓` })
			]
		}), oe]
	});
	let P = U(w), F = W(w), I = w.kind === "compose" && !w.readOnlyReason, R = he(w), le = `${x}-title`, ue = `${x}-question`, de = P.map((e, t) => me(e, t)), pe = [
		P.length ? `${F ? "Alt+" : ""}${de.filter(Boolean).length > 1 ? `${de[0]}–${de[de.length - 1]}` : de[0] ?? ""} choose` : null,
		F ? "type an answer · Enter answer" : R ? `Enter ${R.label}` : null,
		N > 1 ? `${M}↓ next` : null,
		y.backControl && !y.backControl.disabledReason ? `Alt+⌫ ${y.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ H(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border", p),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : w.kind,
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [/* @__PURE__ */ H("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": le,
			"aria-describedby": ue,
			"aria-busy": D || void 0,
			className: t("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ae, !h && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": w.id,
			"data-composer-prompt-kind": w.kind,
			"data-testid": `${m}-card`,
			children: [
				w.path && !I && /* @__PURE__ */ V(u, {
					steps: w.path.steps,
					current: w.path.current,
					"data-testid": `${m}-path`
				}),
				/* @__PURE__ */ H(o, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ H(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [w.eyebrow && /* @__PURE__ */ V(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: w.eyebrow
							}), /* @__PURE__ */ V(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: le,
								title: w.title,
								children: w.title
							})]
						}),
						y.backControl && /* @__PURE__ */ V(n, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Alt+Backspace",
							disabled: D || !!y.backControl.disabledReason,
							title: y.backControl.disabledReason,
							onClick: () => {
								y.goBack();
							},
							"data-composer-prompt-back": "",
							"data-composer-readonly-allow": "Returns to the previous step without submitting an answer",
							"data-testid": `${m}-back`,
							children: y.backControl.label
						}),
						N > 1 && /* @__PURE__ */ H(o, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ V(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${m}-position`,
									children: `${T + 1} of ${N}`
								}),
								/* @__PURE__ */ V(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => y.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${m}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ V(n, {
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
						/* @__PURE__ */ V(n, {
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
				N > 1 && /* @__PURE__ */ V(o, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${m}-progress`,
					children: ne.map((e, n) => /* @__PURE__ */ V(i, {
						gap: "none",
						className: t("h-1 min-w-0 flex-1 rounded-full", n === T ? "bg-primary" : "bg-border")
					}, e.id))
				}),
				w.fields && w.fields.length > 0 && v && /* @__PURE__ */ V("dl", {
					className: "m-0 flex min-w-0 flex-col gap-0.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ H("div", {
						className: "flex min-w-0 items-baseline gap-2",
						"data-composer-prompt-field": "",
						children: [/* @__PURE__ */ V("dt", {
							className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ V("dd", {
							className: t("m-0 min-w-0 flex-1 truncate text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" || typeof e.value == "number" ? { title: String(e.value) } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				w.fields && w.fields.length > 0 && !v && /* @__PURE__ */ V("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ H("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ V("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ V("dd", {
							className: t("m-0 min-w-0 break-words text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" ? { title: e.value } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				/* @__PURE__ */ V(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: ue,
					className: "min-w-0",
					children: w.question
				}),
				w.readOnlyReason ? /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${m}-read-only`,
					children: w.readOnlyReason
				}) : I ? /* @__PURE__ */ V(fe, {
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
					onConfirm: (e) => y.answerCompose(e),
					onCancel: y.isFollowUp ? () => {
						y.back();
					} : w.compose?.onCancel ? () => {
						w.compose?.onCancel?.(), y.finish();
					} : void 0,
					onDone: () => {
						y.finish(), c?.focus();
					},
					"data-testid": `${m}-compose`
				}, w.id) : P.length > 0 && /* @__PURE__ */ V(o, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: P.map((e, t) => {
						let r = de[t], o = r ? `${F ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ H(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ H(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: D || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${x}-hint-${t}` : void 0,
								onClick: () => {
									y.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": R?.id === e.id || void 0,
								"data-testid": `${m}-option-${e.id}`,
								children: [o && !v && /* @__PURE__ */ V(X, { children: o }), e.label]
							}), e.hint && /* @__PURE__ */ V(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${x}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				A && /* @__PURE__ */ H(i, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ V(l, {
						ref: te,
						"aria-label": w.title,
						placeholder: w.placeholder ?? "Your answer",
						value: k,
						disabled: D,
						autoResize: !0,
						minRows: w.kind === "number" ? 1 : 2,
						inputMode: w.kind === "number" ? "decimal" : void 0,
						onChange: (e) => w.inputDraft ? w.inputDraft.onChange(e.target.value) : C({
							id: w.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), D || ie());
						},
						"data-testid": `${m}-answer`
					}), /* @__PURE__ */ V(n, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: D || !k.trim(),
						onClick: () => {
							ie();
						},
						"data-testid": `${m}-submit`,
						children: "Answer"
					})]
				}),
				O && !I && /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${m}-error`,
					children: O
				}),
				D && !I && /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${m}-busy`,
					children: "Working…"
				}),
				!v && !w.readOnlyReason && !I && /* @__PURE__ */ V(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${m}-keys`,
					children: pe
				})
			]
		}), oe]
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
var Be = "ui.conversation-draft:";
function Z(e) {
	return `${Be}${e}`;
}
function Ve(e, t) {
	try {
		let n = e?.getItem(Z(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Fe(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function He(e, t, n) {
	try {
		Fe(n) ? e?.setItem(Z(t), JSON.stringify({ html: n })) : e?.removeItem(Z(t));
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
	let i = z(new Ke()), a = z(t);
	a.current = t, L(() => () => i.current.rejectAll(Ue), [t]);
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
	}), s = I(async (e) => {
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
	return I((e) => Promise.all(e.map(s)), [s]);
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
	return /* @__PURE__ */ H(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ V(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ V(s, {
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
		return /* @__PURE__ */ V(nt, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function nt({ rm: n, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: ee, commands: y = [], onAgent: b, callBlock: x, reply: S, mode: C, onModeChange: w, defaultMode: T, draftKey: E, persistDraft: D = !0, claim: O = !1, answersFocus: re = !1, onReveal: k, disabled: A, offModes: ie, prompts: j, promptScope: ae, composerRef: M, onDraftChange: N, defaultDraft: oe, draft: F, above: se, foldRecipients: ce = !1, modeRowEnd: le, references: ue, onRemoveReference: de, modePlaceholders: fe, contextChip: pe, sendWithReferencesOnly: U, console: me, "data-testid": W = "conversation-composer", ...G }) {
	let ge = e() === "compact", _e = f?.displayName || "You", K = E ?? s ?? `${l.kind}:${l.id}`, ve = u.readOnlyReason || "You can read this conversation but not post to it.", q = R(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? ve,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		ve
	]), [ye, be] = B(null), xe = g === void 0 ? ye : g, Se = !!xe && !q.some((e) => e.id === xe), J = Se ? {
		id: xe,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Je
	} : Ne(q, xe, h), Ce = q.filter((e) => !e.disabled && !e.unavailableReason).length, we = q.length > 0, Y = Ze(Me({
		capabilities: u,
		hasChat: we,
		choosable: Ce,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), ie), Te = T && Y.modes.includes(T) ? T : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Ee, Oe] = B(Te), X = C ?? Ee, ke = I((e) => {
		C === void 0 && Oe(e), w?.(e);
	}, [C, w]), Ae = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	L(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && ke(e);
	}, [
		Ae,
		X,
		ke
	]);
	let [Fe, Be] = B(!0), Z = l.reference ?? null;
	L(() => {
		Be(!0);
	}, [Z?.id]);
	let Ue = !!J && J.carriesReference !== !1, We = !!Z && !Z.page, Ke = !!J && J.channel !== s, tt = !!Z && Fe && !(X === "chat" && (!Ue || We && Ke)), nt = X === "chat" && Ue && Fe && !(We && Ke) ? Z : null, at = z(0), ot = F !== void 0, st = f?.userId?.trim() || null, Q = st ? JSON.stringify([
		"actor",
		st,
		K
	]) : null, ct = D && !ot ? JSON.stringify([
		"actor",
		st,
		K
	]) : K, lt = JSON.stringify([
		K,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), ut = z(lt);
	ut.current !== lt && (ut.current = lt, at.current += 1);
	let dt = z(F);
	dt.current = F;
	let ft = R(() => {
		if (ot || !D || !Q) return oe;
		let e = Ve(Qe(), Q);
		return e ? {
			html: e,
			files: []
		} : oe;
	}, [
		ct,
		ot,
		D
	]), pt = z(""), mt = I((e, t) => {
		at.current += 1, pt.current = e.html, D && !ot && Q && He(Qe(), Q, e.html), c?.setTyping?.(Ie({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}));
		let n = ht.current;
		if (n && n.value !== void 0) {
			let t = xt.current?.editor?.getText() ?? rt(e.html);
			t !== n.lastSent && (n.lastSent = t, n.onChange(t));
		}
		N?.(e, t);
	}, [
		D,
		ot,
		Q,
		c,
		X,
		J?.channel,
		s,
		N
	]), ht = z(null);
	L(() => {
		Ie({
			html: pt.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		s
	]);
	let gt = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, _t = $e(n, gt, _e), [vt, yt] = B(null), bt = r(), xt = z(null), St = I((e) => {
		xt.current = e, Xe(M, e);
	}, [M]), Ct = I(() => {
		k?.();
		let e = 20, t = () => {
			xt.current ? xt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [k]), $ = De(j, { scope: ae }), wt = !!$.active && !$.collapsed, Tt = G.presentation === "prompt", Et = Tt && wt && $.active?.kind !== "compose", Dt = Et && !$.active?.readOnlyReason, Ot = Et ? $.active?.inputDraft : void 0;
	ht.current = Ot ? {
		value: Ot.value,
		onChange: Ot.onChange,
		lastSent: ht.current?.lastSent ?? Ot.value
	} : null;
	let kt = z(null), At = Ot && $.active ? $.active.id : null;
	L(() => {
		if (At === kt.current || (kt.current = At, !At || !Ot)) return;
		let e = Ot.value, t = 20, n = () => {
			let r = xt.current?.editor;
			if (!r) {
				t-- > 0 && requestAnimationFrame(n);
				return;
			}
			ht.current && (ht.current.lastSent = e), r.getText() !== e && r.commands.setContent(v(e).html, { emitUpdate: !0 }), r.commands.focus("end");
		};
		n();
	}, [At]);
	let jt = z(!1);
	L(() => {
		wt ? c?.setTyping?.(!1) : jt.current && Ct(), jt.current = wt;
	}, [
		wt,
		c,
		Ct
	]);
	let Mt = R(() => ({
		isEmpty: () => !xt.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!xt.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: Ct
	}), [Ct]), Nt = I((e) => {
		be(e), ee?.(e), at.current += 1, yt(null), q.find((t) => t.id === e)?.onSelect?.();
	}, [q, ee]), Pt = q.filter((e) => e.claim !== !1);
	ne({
		channels: O ? Pe(u.maySend || m === void 0 ? s : null, Pt) : [],
		label: O ? O.label : "",
		replies: O ? !!O.replies : !1,
		enabled: !!O && O.enabled !== !1,
		focus: (e) => {
			let t = Pt.find((t) => t.channel === e.channel);
			return ke("chat"), t && Nt(t.id), Ct(), !0;
		}
	});
	let Ft = I((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (ke("agent"), Ct(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? q.find((e) => e.channel && e.channel === s) ?? (m ? q.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? Pt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? q.find((e) => e.id === `person:${t.userId}`) ?? null : q.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && Nt(n.id), ke("chat"), Ct(), !0);
	}, [
		Y,
		ke,
		Ct,
		J,
		q,
		m,
		Pt,
		s,
		Nt
	]);
	te(Ft, re);
	let It = R(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), Lt = R(() => It.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [It]), Rt = (e) => {
		if (typeof e == "string") throw new _(e);
		return e !== !1;
	}, zt = async (e, t) => {
		if (yt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && D && !ot && Q && He(Qe(), Q, ""), t;
		}
		if (Dt) {
			let t = await $.answerDirection(e.text);
			return t && D && !ot && Q && He(Qe(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: nt ?? (Fe ? Z : null),
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
				return !a.command.disabled && Rt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return Rt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Rt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = ze(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Rt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!U && (!!nt || (ue?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !gt) return !1;
		c?.setTyping?.(!1);
		let a = at.current, o = ut.current, l = e.files.length ? await _t(e.files) : [], d = !!J.channel && J.channel === s, f = Le({
			displayName: _e,
			reply: d ? S?.reply ?? null : null,
			reference: nt,
			attachments: l
		}), m = r || Ge(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: nt
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? at.current !== a || dt.current !== F ? (ut.current === o && bt?.toast(qe, { type: "success" }), !1) : (d && S?.clear(), D && !ot && Q && He(Qe(), Q, ""), !0) : !1;
	}, Bt = !!u.pending, Vt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Ht = Vt && !$.typed && !Dt && !A && !p && !Bt, Ut = tt && Z ? /* @__PURE__ */ V(d, {
		references: [{
			id: Z.id,
			label: ge ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Ht ? {} : { onRemove: () => {
			Be(!1), at.current += 1, de?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Wt = Se && J ? [...q, J] : q, Gt = X === "chat" && Wt.length > 1, Kt = X === "chat" && Fe && We && Ke && Ue, qt = X === "chat" && Wt.length > 1 && !Bt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Jt = X === "chat" ? J?.error ?? null : null, Yt = ce && Gt && !qt && !vt && !Kt && !Jt && (se == null || se === !1), Xt = Gt || qt || vt || Kt || Jt || se != null && se !== !1 ? /* @__PURE__ */ H(i, {
		gap: "xs",
		children: [
			se,
			(Gt || qt) && /* @__PURE__ */ H(o, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Gt && /* @__PURE__ */ V(et, {
					id: `${K}-recipient`,
					value: J?.id ?? null,
					recipients: Wt,
					onChange: Nt,
					"data-testid": `${W}-recipient`,
					...Ht ? Ce > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), qt && /* @__PURE__ */ V(a, {
					size: "xs",
					tone: "tertiary",
					title: qt,
					className: t("min-w-0", Gt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${W}-recipient-unavailable`,
					children: /* @__PURE__ */ V("span", {
						className: "truncate",
						children: qt
					})
				})]
			}),
			Kt && /* @__PURE__ */ V(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ye
			}),
			vt && /* @__PURE__ */ V(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${W}-note`,
				children: vt
			}),
			Jt && /* @__PURE__ */ V(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${W}-recipient-error`,
				children: Jt
			})
		]
	}) : void 0, Zt = !ge, Qt = Zt && Ut || le ? /* @__PURE__ */ H(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Zt ? Ut : null, le]
	}) : void 0, $t = !Zt && tt && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...ue ?? []] : ue, en = (e) => {
		Z && e === Z.id && (Be(!1), at.current += 1), de?.(e);
	}, tn = {
		...fe,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : Tt ? $.active.placeholder ?? it($.direction, he($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, nn = Ht ? qt ? Ce > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? ve : "Choose a destination.") : null;
	return /* @__PURE__ */ V(P, {
		collapsible: !0,
		...G,
		collapsedLabel: G.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: St,
		"data-testid": W,
		...ge ? { responsive: "pane" } : {},
		console: me ?? !!x,
		dock: x,
		mode: X,
		onModeChange: ke,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: we && !Y.reasons.chat,
		contextChip: pe ?? (!Z && void 0),
		...!wt && Yt ? { foldingAbove: Xt } : { above: wt ? se : Xt },
		...Et ? { header: /* @__PURE__ */ V(je, {
			deck: $,
			input: Mt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${W}-prompts`
		}) } : wt ? { replacement: /* @__PURE__ */ V(je, {
			deck: $,
			"data-testid": `${W}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ V(je, {
			deck: $,
			input: Mt,
			variant: "inset",
			"data-testid": `${W}-prompts`
		}) } : {},
		...Qt ? { modeRowEnd: Qt } : {},
		...$t ? {
			references: $t,
			onRemoveReference: en
		} : {},
		modePlaceholders: tn,
		commands: Lt,
		reply: X === "chat" && S?.reply && J?.channel === s ? {
			author: S.reply.author,
			quote: S.reply.text,
			messageId: S.reply.messageId,
			...S.reply.timestamp ? { timestamp: S.reply.timestamp } : {},
			onDismiss: S.clear
		} : null,
		allowAttachments: !!gt,
		...U === void 0 ? {} : { sendWithReferencesOnly: U },
		...nn ? { readOnly: nn } : {},
		disabled: !!A || !$.typed && !Dt && (!!p || Vt || X === "agent" && !u.agent?.allowed),
		draftKey: ct,
		...ot ? { draft: F } : {},
		...ft === void 0 ? {} : { defaultDraft: ft },
		onDraftChange: mt,
		onSend: (e, t) => zt(e, t.mode),
		className: t(G.className)
	});
}
function rt(e) {
	return e.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}
function it(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { F as AgentComposerDock, N as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, ie as COMPOSER_MODE_ORDER, pe as CONFIRM_OPTIONS, M as CommandSuggestions, re as ComposerAttachments, fe as ComposerConfirmFlow, j as ComposerPresentationContext, je as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, P as ContextComposer, E as ConversationInputProvider, A as DocumentSuggestions, f as EMOJI_SHORTCODES, O as EmojiSuggestions, oe as MentionSuggestions, ae as RichChatComposer, C as ThreadInputHandoff, ge as answerForOption, Ge as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, k as composerSizeFor, tt as createConversationComposer, Se as deckKeyAction, he as defaultOption, ee as identityDisplayName, p as matchComposerCommand, D as matchesModeTrigger, xe as pageKeypadTarget, _e as parseTypedAnswer, U as promptOptions, Ee as promptsInScope, m as searchEmoji, G as takesDirection, W as takesTypedAnswer, S as useComposerFocus, w as useComposerFocusReveal, De as useComposerPromptDeck, $e as useConversationUploads, T as useThreadInput };
