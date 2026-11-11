import { c as e, d as t, n } from "../Button-DQoeE5dN.js";
import { i as r } from "../ToastProvider-BU9h6ZJU.js";
import { n as i, t as a } from "../Stack-CE1FjEn8.js";
import { n as o } from "../Text-XdCzxWMv.js";
import { t as s } from "../Select-CDxAVVnW.js";
import { t as c } from "../FormField-BDZIVA7n.js";
import { t as l } from "../Textarea-Cf4WFXAs.js";
import { t as u } from "../DecisionPath-EmucEGVS.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-CkZXGTCj.js";
import { a as ee, i as v, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as C, o as ne, r as w, s as T, t as re } from "../ConversationInputs-CCs-hXjV.js";
import { a as E, c as D, d as O, i as k, l as A, n as ie, o as j, r as M, s as N, t as ae, u as oe } from "../RichChatComposer-SfF4SJhR.js";
import { t as se } from "../ContextComposer-Dv0_1MYI.js";
import { t as P } from "../AgentComposerDock-BvELQd-I.js";
import { useCallback as F, useContext as ce, useEffect as I, useId as le, useMemo as L, useRef as R, useState as z } from "react";
import { jsx as B, jsxs as V } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function ue(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function H(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var de = {
	draft: 0,
	review: 1,
	done: 2
};
function fe({ title: e, recipient: r, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: ee = "Confirmed.", continueLabel: v = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: C, onStageChange: ne, path: w, autoFocus: T = !0, className: re, "data-testid": E = "composer-confirm-flow" }) {
	let [D, O] = z(s), k = d !== void 0, A = k ? d : D, ie = F((e) => {
		k || O(e), f?.(e);
	}, [k, f]), [j, M] = z("draft"), [N, ae] = z(!1), [oe, se] = z(null), [P, ce] = z(null), L = R(!1), fe = R(null), pe = R(null), U = R(null), me = le(), he = A.trim().length > 0, W = F((e) => {
		M(e), ne?.(e);
	}, [ne]), ge = R(!1);
	I(() => {
		let e = !ge.current;
		ge.current = !0, !(e && !T) && (j === "draft" ? fe.current : j === "review" ? pe.current : U.current)?.focus({ preventScroll: !0 });
	}, [j, T]);
	let G = F(() => {
		he && (se(null), W("review"));
	}, [he, W]), _e = F(async () => {
		if (L.current) return;
		L.current = !0, ae(!0), se(null);
		let e;
		try {
			e = await te(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			L.current = !1, ae(!1);
		}
		if (ue(e)) {
			se(e.error);
			return;
		}
		ce(e && "receipt" in e ? e.receipt : null), W("done");
	}, [
		A,
		te,
		W
	]), ve = j === "review" ? h ?? e : j === "done" ? _ : e, K = `${me}-heading`, ye = `${me}-keys`, q = ve || r ? /* @__PURE__ */ V(a, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [ve && /* @__PURE__ */ B(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: K,
			className: "min-w-0",
			children: ve
		}), r && /* @__PURE__ */ B(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${E}-recipient`,
			children: r
		})]
	}) : null, be = w ? /* @__PURE__ */ B(u, {
		steps: w.steps,
		current: w.current + de[j],
		"data-testid": `${E}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "done",
		"data-testid": E,
		children: [be, /* @__PURE__ */ V(i, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": ve ? K : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${E}-done`,
			children: [
				q,
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${E}-done-message`,
					children: P ?? ee
				}),
				C && /* @__PURE__ */ B(a, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ B(n, {
						size: "sm",
						variant: "ghost",
						onClick: C,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${E}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : j === "review" ? /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "review",
		"data-testid": E,
		children: [be, /* @__PURE__ */ V(i, {
			as: "section",
			gap: "xs",
			ref: pe,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": ve ? K : void 0,
			"aria-describedby": ye,
			"aria-busy": N || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${E}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || N || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), W("draft")) : H(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				q,
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${E}-message`,
					children: A
				}),
				/* @__PURE__ */ V(a, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(n, {
							size: "sm",
							variant: "primary",
							disabled: N,
							onClick: () => {
								_e();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${E}-confirm`,
							children: y
						}),
						/* @__PURE__ */ B(n, {
							size: "sm",
							variant: "ghost",
							disabled: N,
							onClick: () => W("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${E}-back`,
							children: b
						}),
						/* @__PURE__ */ B(o, {
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
				oe && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${E}-error`,
					children: oe
				}),
				N && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${E}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ B(o, {
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
	}) : /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", re),
		"data-composer-confirm-flow": "draft",
		"data-testid": E,
		children: [be, /* @__PURE__ */ V(i, {
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
				/* @__PURE__ */ B(c, {
					label: p,
					children: (e) => /* @__PURE__ */ B(l, {
						...e,
						ref: fe,
						"aria-describedby": [e["aria-describedby"], ye].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							H(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || G()));
						},
						"data-testid": `${E}-editor`
					})
				}),
				/* @__PURE__ */ V(a, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !he,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${E}-continue`,
							children: v
						}),
						S && /* @__PURE__ */ B(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${E}-cancel`,
							children: b
						}),
						/* @__PURE__ */ B(o, {
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
function he(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function W(e) {
	return !!e && !e.readOnlyReason && !!e.onDirection && (e.kind === "choice" || e.kind === "confirm");
}
function ge(e) {
	let t = U(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function G(e, t) {
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
function ve(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = U(e).find((e) => e.id === t.optionId);
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
	let u = he(n), d = l && !e.altKey && (!u && !W(n) || a);
	if (d && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (d && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason || n.disabledReason) return null;
	let f = U(n);
	if (e.key === "Enter" && l && !a) {
		let e = ge(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = Ce(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => me(e, t) === p), h = m >= 0 ? f[m] : null;
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
	let n = t.scope, r = L(() => Ee(e ?? J, n), [e, n]), [i, a] = z(() => /* @__PURE__ */ new Set()), [o, s] = z(null), [c, l] = z(!1), [u, d] = z(null), [f, p] = z({}), [m, h] = z(null), [g, _] = z(we), ee = R(g);
	ee.current = g;
	let v = R(n);
	I(() => {
		v.current !== n && (v.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let y = L(() => K(r, i, g), [
		r,
		i,
		g
	]), b = be(y, o), x = b >= 0 ? y[b] : null, te = u != null, S = R(!1), C = r.map((e) => e.id).join("\0");
	I(() => {
		let e = ye(r, ee.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [C]);
	let ne = y[0]?.id ?? null, w = R(/* @__PURE__ */ new Set());
	I(() => {
		let e = y.some((e) => !w.current.has(e.id));
		for (let e of y) w.current.add(e.id);
		e && l(!1);
	}, [ne, y]);
	let T = F(async (e, t) => {
		if (S.current || e.readOnlyReason || e.disabledReason) return !1;
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
		return Te(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Y(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : ve(e, t)), !0);
	}, []), re = F(async (e) => {
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
		return Te(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), E = x ? q(x.id, g) : null, D = F(() => {
		if (!x || E == null) return !1;
		let e = x.id;
		return _((e) => {
			let { [E]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(E), n.delete(e), n;
		}), s(E), !0;
	}, [x, E]), O = x?.back, k = O ? {
		label: O.label || "Back",
		...O.disabledReason ? { disabledReason: O.disabledReason } : {}
	} : E != null && x?.kind !== "compose" ? { label: "Back" } : null, A = F(async () => {
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
	}, [x, D]), ie = F(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), j = F(async (e) => {
		if (!x) return !1;
		let t = U(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : T(x, G(x, t));
	}, [x, T]), M = F(async (e) => {
		if (!x || !he(x)) return !1;
		let t = _e(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : T(x, t.answer);
	}, [x, T]), N = F(async (e) => {
		let t = x, n = e.trim();
		if (!t || c || !n || t.readOnlyReason || t.disabledReason || t.kind !== "choice" && t.kind !== "confirm") return !1;
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
		return Te(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : Y(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [x, c]), ae = F((e) => {
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
		typed: !c && he(x),
		setCollapsed: l,
		page: ae,
		pick: j,
		answerTyped: M,
		direction: !c && W(x),
		answerDirection: N,
		answerCompose: re,
		isFollowUp: E != null,
		back: D,
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
function ke({ children: e }) {
	return /* @__PURE__ */ B("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Ae = "max-h-[min(40vh,24rem)] overflow-y-auto overscroll-contain [&>:not(dl)]:shrink-0", je = "min-h-0 overflow-y-auto overscroll-contain";
function Me({ deck: e, prompts: r, scope: s, input: c = null, submitDisabledReason: d, variant: f = "card", presentation: p, className: m, "data-testid": h = "composer-prompt-deck" }) {
	let g = f === "inset", _ = ce(j), ee = p ?? _ ?? "card", v = ee === "prompt", y = De(e ? null : r, { scope: s }), b = e ?? y, x = R(null), te = le(), S = R(null), [C, ne] = z({
		id: "",
		text: ""
	}), { active: w, pending: T, index: re, collapsed: E, busy: D, error: O, receipt: k } = b, A = w?.inputDraft?.value ?? (C.id === w?.id ? C.text : ""), ie = !c && b.typed && !w?.readOnlyReason, M = w && !w.readOnlyReason && (d?.trim() || w.disabledReason?.trim()) || null, N = `${te}-disabled-reason`, ae = async () => {
		if (M) return;
		let e = w?.id;
		await b.answerTyped(A) && ne((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, oe = R({
		deck: b,
		input: c,
		blockedBy: M
	});
	if (oe.current = {
		deck: b,
		input: c,
		blockedBy: M
	}, I(() => {
		if (!w || E || w.readOnlyReason || w.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = oe.current.input;
			t && !x.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : S.current ? S.current.focus() : (x.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? x.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		w?.id,
		E,
		w?.kind,
		w?.readOnlyReason
	]), I(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n, blockedBy: r } = oe.current, i = e.target, a = !!x.current && !!i && x.current.contains(i), o = !!n && n.contains(i), s = !!i && S.current?.contains(i), c = !a && !o && t.active?.keypad === "page" && !t.collapsed && xe(e.target);
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
				inputEmpty: n ? n.isEmpty() : !S.current?.value.trim(),
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
	let se = X(), P = T.length, F = k ? /* @__PURE__ */ V(a, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: t("min-w-0", g && !E && w && "px-3 pb-2"),
		"data-testid": `${h}-receipt`,
		children: [/* @__PURE__ */ B(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			role: "status",
			className: "min-w-0 flex-1 truncate",
			title: `Answered · ${k}`,
			children: `Answered · ${k}`
		}), /* @__PURE__ */ B(n, {
			variant: "link",
			size: "sm",
			onClick: b.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!w || E) return /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", g && "border-b border-border px-3 py-1.5", m),
		"data-composer-prompt-deck": w ? "collapsed" : "answered",
		"data-deck-variant": f,
		"data-presentation": ee,
		"data-testid": h,
		ref: x,
		children: [w && /* @__PURE__ */ V(a, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: t("min-w-0", !g && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ B(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: P === 1 ? `1 question waiting · ${w.title}` : `${P} questions waiting · ${w.title}`
				}),
				/* @__PURE__ */ B(n, {
					variant: "link",
					size: "sm",
					onClick: () => b.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${h}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ B(ke, { children: `${se}↓` })
			]
		}), F]
	});
	let L = U(w), ue = he(w), H = w.kind === "compose" && !w.readOnlyReason, de = ge(w), pe = `${te}-title`, W = `${te}-question`, G = L.map((e, t) => me(e, t)), _e = [
		L.length ? `${ue ? "Alt+" : ""}${G.filter(Boolean).length > 1 ? `${G[0]}–${G[G.length - 1]}` : G[0] ?? ""} choose` : null,
		ue ? "type an answer · Enter answer" : de ? `Enter ${de.label}` : null,
		P > 1 ? `${se}↓ next` : null,
		b.backControl && !b.backControl.disabledReason ? `Alt+⌫ ${b.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", g && "border-b border-border", m),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : w.kind,
		"data-deck-variant": f,
		"data-presentation": ee,
		"data-testid": h,
		ref: x,
		children: [/* @__PURE__ */ V("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": pe,
			"aria-describedby": W,
			"aria-busy": D || void 0,
			className: t("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ae, !g && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": w.id,
			"data-composer-prompt-kind": w.kind,
			"data-testid": `${h}-card`,
			children: [
				w.path && !H && /* @__PURE__ */ B(u, {
					steps: w.path.steps,
					current: w.path.current,
					"data-testid": `${h}-path`
				}),
				/* @__PURE__ */ V(a, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [w.eyebrow && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: w.eyebrow
							}), /* @__PURE__ */ B(o, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: pe,
								title: w.title,
								children: w.title
							})]
						}),
						b.backControl && /* @__PURE__ */ B(n, {
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
						P > 1 && /* @__PURE__ */ V(a, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ B(o, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${h}-position`,
									children: `${re + 1} of ${P}`
								}),
								/* @__PURE__ */ B(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => b.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${h}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ B(n, {
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
						/* @__PURE__ */ B(n, {
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
				P > 1 && /* @__PURE__ */ B(a, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${h}-progress`,
					children: T.map((e, n) => /* @__PURE__ */ B(i, {
						gap: "none",
						className: t("h-1 min-w-0 flex-1 rounded-full", n === re ? "bg-primary" : "bg-border")
					}, e.id))
				}),
				w.fields && w.fields.length > 0 && v && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-col gap-0.5",
					"data-testid": `${h}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-baseline gap-2",
						"data-composer-prompt-field": "",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ B("dd", {
							className: t("m-0 min-w-0 flex-1 truncate text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" || typeof e.value == "number" ? { title: String(e.value) } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				w.fields && w.fields.length > 0 && !v && /* @__PURE__ */ B("dl", {
					className: t("m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5", je),
					"data-testid": `${h}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ B("dd", {
							className: t("m-0 min-w-0 break-words text-xs font-normal", Oe[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" ? { title: e.value } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: W,
					className: "min-w-0",
					children: w.question
				}),
				w.readOnlyReason ? /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${h}-read-only`,
					children: w.readOnlyReason
				}) : H ? /* @__PURE__ */ B(fe, {
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
				}, w.id) : L.length > 0 && /* @__PURE__ */ B(a, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: L.map((e, t) => {
						let r = G[t], a = r ? `${ue ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ V(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ V(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: D || !!e.disabledReason || !!M,
								title: e.disabledReason ?? M ?? e.hint,
								"aria-keyshortcuts": a,
								"aria-describedby": [e.hint && `${te}-hint-${t}`, M && N].filter(Boolean).join(" ") || void 0,
								onClick: () => {
									b.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": de?.id === e.id || void 0,
								"data-testid": `${h}-option-${e.id}`,
								children: [a && !v && /* @__PURE__ */ B(ke, { children: a }), e.label]
							}), e.hint && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${te}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				ie && /* @__PURE__ */ V(i, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ B(l, {
						ref: S,
						"aria-label": w.title,
						placeholder: w.placeholder ?? "Your answer",
						value: A,
						disabled: D || !!M,
						autoResize: !0,
						minRows: w.kind === "number" ? 1 : 2,
						inputMode: w.kind === "number" ? "decimal" : void 0,
						onChange: (e) => w.inputDraft ? w.inputDraft.onChange(e.target.value) : ne({
							id: w.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), !D && !M && ae());
						},
						"data-testid": `${h}-answer`
					}), /* @__PURE__ */ V(a, {
						gap: "sm",
						align: "center",
						justify: M ? "between" : "end",
						wrap: !1,
						className: "min-w-0",
						children: [M && /* @__PURE__ */ B(o, {
							as: "p",
							size: "xs",
							tone: "secondary",
							id: N,
							title: M,
							className: "min-w-0",
							"data-testid": `${h}-disabled-reason`,
							children: /* @__PURE__ */ B("span", {
								className: "truncate",
								children: M
							})
						}), /* @__PURE__ */ B(n, {
							variant: "primary",
							size: "sm",
							className: "shrink-0",
							disabled: D || !!M || !A.trim(),
							...M ? {
								title: M,
								"aria-describedby": N
							} : {},
							onClick: () => {
								ae();
							},
							"data-testid": `${h}-submit`,
							children: "Answer"
						})]
					})]
				}),
				M && !H && !ie && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					id: N,
					className: "min-w-0",
					"data-testid": `${h}-disabled-reason`,
					children: M
				}),
				O && !H && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${h}-error`,
					children: O
				}),
				D && !H && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${h}-busy`,
					children: "Working…"
				}),
				!v && !w.readOnlyReason && !H && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${h}-keys`,
					children: _e
				})
			]
		}), F]
	});
}
function Ne(e) {
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
function Pe(e, t, n) {
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
function Fe(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Ie(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Le(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Ie(e.html).length > 0;
}
function Re(e) {
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
function ze(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Be(e, t) {
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
var Ve = "ui.conversation-draft:";
function Z(e) {
	return `${Ve}${e}`;
}
function He(e, t) {
	try {
		let n = e?.getItem(Z(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Ie(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ue(e, t, n) {
	try {
		Ie(n) ? e?.setItem(Z(t), JSON.stringify({ html: n })) : e?.removeItem(Z(t));
	} catch {}
}
var We = "Conversation changed; draft retained.";
function Ge(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Ke(e) {
	return e.map((e) => e.name).join(", ");
}
var qe = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Ge(`timed out (${n})`)));
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
}, Je = "Message sent. Your current draft has been kept.", Ye = "This destination is no longer available. Choose a current destination.", Xe = "This view has no page to attach.";
function Ze(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Qe(e, t) {
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
function $e() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function et(e, t, n, r = 6e4) {
	let i = R(new qe()), a = R(t);
	a.current = t, I(() => () => i.current.rejectAll(We), [t]);
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
			throw new _(Ge(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(We);
		if (n.status === "failed") throw new _(Ge(n.error));
		if (!n.transferId) throw new _(Ge(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : Ge(void 0));
		}
	}, [o, r]);
	return F((e) => Promise.all(e.map(s)), [s]);
}
function tt({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: i, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ V(a, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ B(o, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ B(s, {
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
function nt(e) {
	function t(t) {
		return /* @__PURE__ */ B(rt, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function rt({ rm: n, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: b, callBlock: x, reply: S, mode: C, onModeChange: ne, defaultMode: T, draftKey: re, persistDraft: E = !0, claim: D = !1, answersFocus: O = !1, onReveal: k, disabled: A, offModes: ie, prompts: j, promptScope: M, composerRef: N, onDraftChange: ae, defaultDraft: oe, draft: P, above: ce, foldRecipients: le = !1, modeRowEnd: ue, references: H, onRemoveReference: de, modePlaceholders: fe, contextChip: pe, sendWithReferencesOnly: U, console: me, submitDisabledReason: he, "data-testid": W = "conversation-composer", ...G }) {
	let _e = e() === "compact", ve = f?.displayName || "You", K = re ?? s ?? `${l.kind}:${l.id}`, ye = u.readOnlyReason || "You can read this conversation but not post to it.", q = L(() => {
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
	]), [be, xe] = z(null), Se = g === void 0 ? be : g, Ce = !!Se && !q.some((e) => e.id === Se), J = Ce ? {
		id: Se,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Ye
	} : Pe(q, Se, h), we = q.filter((e) => !e.disabled && !e.unavailableReason).length, Te = q.length > 0, Y = Qe(Ne({
		capabilities: u,
		hasChat: Te,
		choosable: we,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), ie), Ee = T && Y.modes.includes(T) ? T : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Oe, ke] = z(Ee), X = C ?? Oe, Ae = F((e) => {
		C === void 0 && ke(e), ne?.(e);
	}, [C, ne]), je = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	I(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Ae(e);
	}, [
		je,
		X,
		Ae
	]);
	let [Ie, Ve] = z(!0), Z = l.reference ?? null;
	I(() => {
		Ve(!0);
	}, [Z?.id]);
	let We = !!J && J.carriesReference !== !1, Ge = !!Z && !Z.page, qe = !!J && J.channel !== s, nt = !!Z && Ie && !(X === "chat" && (!We || Ge && qe)), rt = X === "chat" && We && Ie && !(Ge && qe) ? Z : null, ot = R(0), st = P !== void 0, ct = f?.userId?.trim() || null, Q = ct ? JSON.stringify([
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
	]), dt = R(ut);
	dt.current !== ut && (dt.current = ut, ot.current += 1);
	let ft = R(P);
	ft.current = P;
	let pt = L(() => {
		if (st || !E || !Q) return oe;
		let e = He($e(), Q);
		return e ? {
			html: e,
			files: []
		} : oe;
	}, [
		lt,
		st,
		E
	]), mt = R(""), ht = F((e, t) => {
		ot.current += 1, mt.current = e.html, E && !st && Q && Ue($e(), Q, e.html), c?.setTyping?.(Le({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}));
		let n = gt.current;
		if (n && n.value !== void 0) {
			let t = St.current?.editor?.getText() ?? it(e.html);
			t !== n.lastSent && (n.lastSent = t, n.onChange(t));
		}
		ae?.(e, t);
	}, [
		E,
		st,
		Q,
		c,
		X,
		J?.channel,
		s,
		ae
	]), gt = R(null);
	I(() => {
		Le({
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
	let _t = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, vt = et(n, _t, ve), [yt, bt] = z(null), xt = r(), St = R(null), Ct = F((e) => {
		St.current = e, Ze(N, e);
	}, [N]), wt = F(() => {
		k?.();
		let e = 20, t = () => {
			St.current ? St.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [k]), $ = De(j, { scope: M }), Tt = !!$.active && !$.collapsed, Et = G.presentation === "prompt", Dt = Et && Tt && $.active?.kind !== "compose", Ot = Dt && !$.active?.readOnlyReason, kt = Dt ? $.active?.inputDraft : void 0;
	gt.current = kt ? {
		value: kt.value,
		onChange: kt.onChange,
		lastSent: gt.current?.lastSent ?? kt.value
	} : null;
	let At = R(null), jt = kt && $.active ? $.active.id : null;
	I(() => {
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
	let Mt = R(!1);
	I(() => {
		Tt ? c?.setTyping?.(!1) : Mt.current && wt(), Mt.current = Tt;
	}, [
		Tt,
		c,
		wt
	]);
	let Nt = L(() => ({
		isEmpty: () => !St.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!St.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: wt
	}), [wt]), Pt = F((e) => {
		xe(e), v?.(e), ot.current += 1, bt(null), q.find((t) => t.id === e)?.onSelect?.();
	}, [q, v]), Ft = q.filter((e) => e.claim !== !1);
	w({
		channels: D ? Fe(u.maySend || m === void 0 ? s : null, Ft) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = Ft.find((t) => t.channel === e.channel);
			return Ae("chat"), t && Pt(t.id), wt(), !0;
		}
	});
	let It = F((e) => {
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
	te(It, O);
	let Lt = L(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), Rt = L(() => Lt.map((e) => ({
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
			return t && E && !st && Q && Ue($e(), Q, ""), t;
		}
		if (Ot) {
			let t = await $.answerDirection(e.text);
			return t && E && !st && Q && Ue($e(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: rt ?? (Ie ? Z : null),
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = ze(t), a = Be(t, r) ?? (i === t ? null : Be(i, r));
			if (a) {
				let e = Be(t, [a.command]) ? t : i;
				return !a.command.disabled && zt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return zt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? zt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Be(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), zt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!U && (!!rt || (H?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !_t) return !1;
		c?.setTyping?.(!1);
		let a = ot.current, o = dt.current, l = e.files.length ? await vt(e.files) : [], d = !!J.channel && J.channel === s, f = Re({
			displayName: ve,
			reply: d ? S?.reply ?? null : null,
			reference: rt,
			attachments: l
		}), m = r || Ke(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: rt
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? ot.current !== a || ft.current !== P ? (dt.current === o && xt?.toast(Je, { type: "success" }), !1) : (d && S?.clear(), E && !st && Q && Ue($e(), Q, ""), !0) : !1;
	}, Vt = !!u.pending, Ht = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Ut = Ht && !$.typed && !Ot && !A && !p && !Vt, Wt = nt && Z ? /* @__PURE__ */ B(d, {
		references: [{
			id: Z.id,
			label: _e ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Ut ? {} : { onRemove: () => {
			Ve(!1), ot.current += 1, de?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Gt = Ce && J ? [...q, J] : q, Kt = X === "chat" && Gt.length > 1, qt = X === "chat" && Ie && Ge && qe && We, Jt = X === "chat" && Gt.length > 1 && !Vt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Yt = X === "chat" ? J?.error ?? null : null, Xt = le && Kt && !Jt && !yt && !qt && !Yt && (ce == null || ce === !1), Zt = Kt || Jt || yt || qt || Yt || ce != null && ce !== !1 ? /* @__PURE__ */ V(i, {
		gap: "xs",
		children: [
			ce,
			(Kt || Jt) && /* @__PURE__ */ V(a, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Kt && /* @__PURE__ */ B(tt, {
					id: `${K}-recipient`,
					value: J?.id ?? null,
					recipients: Gt,
					onChange: Pt,
					"data-testid": `${W}-recipient`,
					...Ut ? we > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Jt && /* @__PURE__ */ B(o, {
					size: "xs",
					tone: "tertiary",
					title: Jt,
					className: t("min-w-0", Kt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${W}-recipient-unavailable`,
					children: /* @__PURE__ */ B("span", {
						className: "truncate",
						children: Jt
					})
				})]
			}),
			qt && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Xe
			}),
			yt && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${W}-note`,
				children: yt
			}),
			Yt && /* @__PURE__ */ B(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${W}-recipient-error`,
				children: Yt
			})
		]
	}) : void 0, Qt = !_e, $t = Qt && Wt || ue ? /* @__PURE__ */ V(a, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Qt ? Wt : null, ue]
	}) : void 0, en = !Qt && nt && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...H ?? []] : H, tn = (e) => {
		Z && e === Z.id && (Ve(!1), ot.current += 1), de?.(e);
	}, nn = {
		...fe,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : Et ? $.active.placeholder ?? at($.direction, ge($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, rn = Ut ? Jt ? we > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? ye : "Choose a destination.") : null, an = $.typed || Ot ? $.active?.disabledReason ?? null : he ?? null;
	return /* @__PURE__ */ B(se, {
		collapsible: !0,
		...G,
		collapsedLabel: G.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: Ct,
		"data-testid": W,
		..._e ? { responsive: "pane" } : {},
		console: me ?? !!x,
		dock: x,
		mode: X,
		onModeChange: Ae,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: Te && !Y.reasons.chat,
		contextChip: pe ?? (!Z && void 0),
		...!Tt && Xt ? { foldingAbove: Zt } : { above: Tt ? ce : Zt },
		...Dt ? { header: /* @__PURE__ */ B(Me, {
			deck: $,
			input: Nt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${W}-prompts`
		}) } : Tt ? { replacement: /* @__PURE__ */ B(Me, {
			deck: $,
			"data-testid": `${W}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ B(Me, {
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
		reply: X === "chat" && S?.reply && J?.channel === s ? {
			author: S.reply.author,
			quote: S.reply.text,
			messageId: S.reply.messageId,
			...S.reply.timestamp ? { timestamp: S.reply.timestamp } : {},
			onDismiss: S.clear
		} : null,
		allowAttachments: !!_t,
		...U === void 0 ? {} : { sendWithReferencesOnly: U },
		...rn ? { readOnly: rn } : {},
		...an ? { submitDisabledReason: an } : {},
		disabled: !!A || !$.typed && !Ot && (!!p || Ht || X === "agent" && !u.agent?.allowed),
		draftKey: lt,
		...st ? { draft: P } : {},
		...pt === void 0 ? {} : { defaultDraft: pt },
		onDraftChange: ht,
		onSend: (e, t) => Bt(e, t.mode),
		className: t(G.className)
	});
}
function it(e) {
	return e.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}
function at(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { P as AgentComposerDock, ae as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, ie as COMPOSER_MODE_ORDER, pe as CONFIRM_OPTIONS, N as CommandSuggestions, O as ComposerAttachments, fe as ComposerConfirmFlow, j as ComposerPresentationContext, Me as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, se as ContextComposer, re as ConversationInputProvider, A as DocumentSuggestions, f as EMOJI_SHORTCODES, D as EmojiSuggestions, oe as MentionSuggestions, M as RichChatComposer, C as ThreadInputHandoff, G as answerForOption, Ke as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, ee as composerDraftOf, h as composerSendErrorReason, k as composerSizeFor, nt as createConversationComposer, Se as deckKeyAction, ge as defaultOption, v as identityDisplayName, p as matchComposerCommand, E as matchesModeTrigger, xe as pageKeypadTarget, _e as parseTypedAnswer, U as promptOptions, Ee as promptsInScope, m as searchEmoji, W as takesDirection, he as takesTypedAnswer, S as useComposerFocus, ne as useComposerFocusReveal, De as useComposerPromptDeck, et as useConversationUploads, T as useThreadInput };
