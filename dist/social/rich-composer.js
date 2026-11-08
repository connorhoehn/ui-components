import { t as e } from "../cn-D4QmbyEy.js";
import { r as t } from "../ToastProvider-D6jAeNNE.js";
import { c as n, n as r } from "../Button-C-I3BxWI.js";
import { c as i, l as a, n as o } from "../Text-BAAQrepu.js";
import { t as s } from "../Select-CpZyUWay.js";
import { t as c } from "../FormField-CQ27qxWt.js";
import { t as l } from "../Textarea-CvdLeuO_.js";
import { t as u } from "../DecisionPath-BC9qttuI.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-BTSwRiUg.js";
import { a as v, i as y, n as b, r as x, t as S } from "../composerContext-BLn1-Nao.js";
import { a as ee, i as C, n as te, o as w, r as ne, s as T, t as E } from "../ConversationInputs-Du5oOgKC.js";
import { a as D, c as re, d as O, i as k, l as ie, n as ae, o as A, r as oe, s as j, t as M, u as N } from "../RichChatComposer-Cx3hs7VC.js";
import { t as P } from "../ContextComposer-DvB25RLK.js";
import { t as F } from "../AgentComposerDock-CaJVRyFz.js";
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
function fe({ title: t, recipient: n, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: b = "Confirm", backLabel: x = "Back", doneActionLabel: S = "Back", onConfirm: ee, onCancel: C, onDone: te, onStageChange: w, path: ne, autoFocus: T = !0, className: E, "data-testid": D = "composer-confirm-flow" }) {
	let [re, O] = B(s), k = d !== void 0, ie = k ? d : re, ae = I((e) => {
		k || O(e), f?.(e);
	}, [k, f]), [A, oe] = B("draft"), [j, M] = B(!1), [N, P] = B(null), [F, se] = B(null), R = z(!1), fe = z(null), pe = z(null), U = z(null), me = ce(), W = ie.trim().length > 0, G = I((e) => {
		oe(e), w?.(e);
	}, [w]), he = z(!1);
	L(() => {
		let e = !he.current;
		he.current = !0, !(e && !T) && (A === "draft" ? fe.current : A === "review" ? pe.current : U.current)?.focus({ preventScroll: !0 });
	}, [A, T]);
	let ge = I(() => {
		W && (P(null), G("review"));
	}, [W, G]), _e = I(async () => {
		if (R.current) return;
		R.current = !0, M(!0), P(null);
		let e;
		try {
			e = await ee(ie);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			R.current = !1, M(!1);
		}
		if (le(e)) {
			P(e.error);
			return;
		}
		se(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		ie,
		ee,
		G
	]), K = A === "review" ? h ?? t : A === "done" ? _ : t, ve = `${me}-heading`, ye = `${me}-keys`, be = K || n ? /* @__PURE__ */ H(i, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [K && /* @__PURE__ */ V(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: ve,
			className: "min-w-0",
			children: K
		}), n && /* @__PURE__ */ V(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${D}-recipient`,
			children: n
		})]
	}) : null, xe = ne ? /* @__PURE__ */ V(u, {
		steps: ne.steps,
		current: ne.current + de[A],
		"data-testid": `${D}-path`
	}) : null;
	return A === "done" ? /* @__PURE__ */ H(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "done",
		"data-testid": D,
		children: [xe, /* @__PURE__ */ H(a, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": K ? ve : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${D}-done`,
			children: [
				be,
				/* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-done-message`,
					children: F ?? v
				}),
				te && /* @__PURE__ */ V(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ V(r, {
						size: "sm",
						variant: "ghost",
						onClick: te,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${D}-done-action`,
						children: S
					})
				})
			]
		})]
	}) : A === "review" ? /* @__PURE__ */ H(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "review",
		"data-testid": D,
		children: [xe, /* @__PURE__ */ H(a, {
			as: "section",
			gap: "xs",
			ref: pe,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": K ? ve : void 0,
			"aria-describedby": ye,
			"aria-busy": j || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${D}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || j || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : ue(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				be,
				/* @__PURE__ */ V(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${D}-message`,
					children: ie
				}),
				/* @__PURE__ */ H(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(r, {
							size: "sm",
							variant: "primary",
							disabled: j,
							onClick: () => {
								_e();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${D}-confirm`,
							children: b
						}),
						/* @__PURE__ */ V(r, {
							size: "sm",
							variant: "ghost",
							disabled: j,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${D}-back`,
							children: x
						}),
						/* @__PURE__ */ V(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ye,
							className: "min-w-0",
							"data-testid": `${D}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				N && /* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${D}-error`,
					children: N
				}),
				j && /* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${D}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ V(o, {
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
	}) : /* @__PURE__ */ H(a, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "draft",
		"data-testid": D,
		children: [xe, /* @__PURE__ */ H(a, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), ge();
			},
			"aria-labelledby": K ? ve : void 0,
			"data-testid": `${D}-draft`,
			children: [
				be,
				/* @__PURE__ */ V(c, {
					label: p,
					children: (e) => /* @__PURE__ */ V(l, {
						...e,
						ref: fe,
						"aria-describedby": [e["aria-describedby"], ye].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: ie,
						placeholder: m,
						onChange: (e) => ae(e.target.value),
						onKeyDown: (e) => {
							ue(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || ge()));
						},
						"data-testid": `${D}-editor`
					})
				}),
				/* @__PURE__ */ H(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(r, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !W,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${D}-continue`,
							children: y
						}),
						C && /* @__PURE__ */ V(r, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: C,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${D}-cancel`,
							children: x
						}),
						/* @__PURE__ */ V(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ye,
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
function ye(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function be(e, t) {
	for (let [n, r] of Object.entries(t)) if (r.id === e) return n;
	return null;
}
function xe(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function q(e, t) {
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
	let p = Se(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => me(e, t) === p), h = m >= 0 ? f[m] : null;
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
var Ce = [], J = {};
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
	let n = t.scope, r = R(() => Ee(e ?? Ce, n), [e, n]), [i, a] = B(() => /* @__PURE__ */ new Set()), [o, s] = B(null), [c, l] = B(!1), [u, d] = B(null), [f, p] = B({}), [m, h] = B(null), [g, _] = B(J), v = z(g);
	v.current = g;
	let y = z(n);
	L(() => {
		y.current !== n && (y.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let b = R(() => ve(r, i, g), [
		r,
		i,
		g
	]), x = xe(b, o), S = x >= 0 ? b[x] : null, ee = u != null, C = z(!1), te = r.map((e) => e.id).join("\0");
	L(() => {
		let e = ye(r, v.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [te]);
	let w = b[0]?.id ?? null, ne = z(/* @__PURE__ */ new Set());
	L(() => {
		let e = b.some((e) => !ne.current.has(e.id));
		for (let e of b) ne.current.add(e.id);
		e && l(!1);
	}, [w, b]);
	let T = I(async (e, t) => {
		if (C.current || e.readOnlyReason) return !1;
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
		return we(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Te(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : K(e, t)), !0);
	}, []), E = I(async (e) => {
		let t = S;
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
		return we(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [S]), D = S ? be(S.id, g) : null, re = I(() => {
		if (!S || D == null) return !1;
		let e = S.id;
		return _((e) => {
			let { [D]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(D), n.delete(e), n;
		}), s(D), !0;
	}, [S, D]), O = S?.back, k = O ? {
		label: O.label || "Back",
		...O.disabledReason ? { disabledReason: O.disabledReason } : {}
	} : D != null && S?.kind !== "compose" ? { label: "Back" } : null, ie = I(async () => {
		if (!S) return !1;
		let e = S.back;
		if (!e) return S.kind !== "compose" && re();
		if (e.disabledReason || C.current) return !1;
		C.current = !0, d(S.id), p((e) => {
			if (!(S.id in e)) return e;
			let { [S.id]: t, ...n } = e;
			return n;
		});
		try {
			return await e.onBack(), !0;
		} catch (e) {
			let t = e instanceof Error && e.message ? e.message : "Could not go back. Try again.";
			return p((e) => ({
				...e,
				[S.id]: t
			})), !1;
		} finally {
			C.current = !1, d(null);
		}
	}, [S, re]), ae = I(() => {
		S && (a((e) => new Set(e).add(S.id)), s(null));
	}, [S]), A = I(async (e) => {
		if (!S) return !1;
		let t = U(S).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : T(S, ge(S, t));
	}, [S, T]), oe = I(async (e) => {
		if (!S || !W(S)) return !1;
		let t = _e(S, e);
		return "error" in t ? (p((e) => ({
			...e,
			[S.id]: t.error
		})), !1) : T(S, t.answer);
	}, [S, T]), j = I(async (e) => {
		let t = S, n = e.trim();
		if (!t || c || !n || t.readOnlyReason || t.kind !== "choice" && t.kind !== "confirm") return !1;
		if (!t.onDirection) {
			let e = he(t), n = e ? `Choose an answer, or press Enter on an empty box for ${e.label}.` : "Choose one of the answers.";
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
		return we(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : Te(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [S, c]), M = I((e) => {
		if (!b.length) return;
		let t = (x + e + b.length) % b.length;
		s(b[t].id);
	}, [b, x]);
	return {
		pending: b,
		active: S,
		index: x,
		collapsed: c,
		busy: ee,
		error: S ? f[S.id] ?? null : null,
		receipt: m,
		visible: b.length > 0 || m != null,
		typed: !c && W(S),
		setCollapsed: l,
		page: M,
		pick: A,
		answerTyped: oe,
		direction: !c && G(S),
		answerDirection: j,
		answerCompose: E,
		isFollowUp: D != null,
		back: re,
		backControl: k,
		goBack: ie,
		finish: ae,
		dismissReceipt: () => h(null)
	};
}
var Y = {
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
function Oe() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var ke = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Ae({ deck: t, prompts: n, scope: s, input: c = null, variant: d = "card", presentation: f, className: p, "data-testid": m = "composer-prompt-deck" }) {
	let h = d === "inset", g = se(A), _ = f ?? g ?? "card", v = _ === "prompt", y = De(t ? null : n, { scope: s }), b = t ?? y, x = z(null), S = ce(), ee = z(null), [C, te] = B({
		id: "",
		text: ""
	}), { active: w, pending: ne, index: T, collapsed: E, busy: D, error: re, receipt: O } = b, k = w?.inputDraft?.value ?? (C.id === w?.id ? C.text : ""), ie = !c && b.typed && !w?.readOnlyReason, ae = async () => {
		let e = w?.id;
		await b.answerTyped(k) && te((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, oe = z({
		deck: b,
		input: c
	});
	if (oe.current = {
		deck: b,
		input: c
	}, L(() => {
		if (!w || E || w.readOnlyReason || w.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = oe.current.input;
			t && !x.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : ee.current ? ee.current.focus() : (x.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? x.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
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
			let { deck: t, input: n } = oe.current, r = e.target, i = !!x.current && !!r && x.current.contains(r), a = !!n && n.contains(r), o = !!r && ee.current?.contains(r);
			if (!i && !a) return;
			let s = q({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: n ? n.isEmpty() : !ee.current?.value.trim(),
				inDeck: i && !o,
				busy: t.busy,
				canBack: !!t.backControl && !t.backControl.disabledReason
			});
			s && (e.preventDefault(), e.stopPropagation(), s.type === "page" ? t.page(s.delta) : s.type === "back" ? t.goBack() : s.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : s.type === "expand" ? t.setCollapsed(!1) : t.pick(s.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !b.visible) return null;
	let j = Oe(), M = ne.length, N = O ? /* @__PURE__ */ H(i, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", h && !E && w && "px-3 pb-2"),
		"data-testid": `${m}-receipt`,
		children: [/* @__PURE__ */ V(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${O}`
		}), /* @__PURE__ */ V(r, {
			variant: "link",
			size: "sm",
			onClick: b.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!w || E) return /* @__PURE__ */ H(a, {
		gap: "xs",
		className: e("min-w-0", h && "border-b border-border px-3 py-1.5", p),
		"data-composer-prompt-deck": w ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: x,
		children: [w && /* @__PURE__ */ H(i, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !h && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ V(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: M === 1 ? `1 question waiting · ${w.title}` : `${M} questions waiting · ${w.title}`
				}),
				/* @__PURE__ */ V(r, {
					variant: "link",
					size: "sm",
					onClick: () => b.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${m}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ V(X, { children: `${j}↓` })
			]
		}), N]
	});
	let P = U(w), F = W(w), I = w.kind === "compose" && !w.readOnlyReason, R = he(w), le = `${S}-title`, ue = `${S}-question`, de = P.map((e, t) => me(e, t)), pe = [
		P.length ? `${F ? "Alt+" : ""}${de.filter(Boolean).length > 1 ? `${de[0]}–${de[de.length - 1]}` : de[0] ?? ""} choose` : null,
		F ? "type an answer · Enter answer" : R ? `Enter ${R.label}` : null,
		M > 1 ? `${j}↓ next` : null,
		b.backControl && !b.backControl.disabledReason ? `Alt+⌫ ${b.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ H(a, {
		gap: "xs",
		className: e("min-w-0", h && "border-b border-border", p),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : w.kind,
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: x,
		children: [/* @__PURE__ */ H("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": le,
			"aria-describedby": ue,
			"aria-busy": D || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", ke, !h && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": w.id,
			"data-composer-prompt-kind": w.kind,
			"data-testid": `${m}-card`,
			children: [
				w.path && !I && /* @__PURE__ */ V(u, {
					steps: w.path.steps,
					current: w.path.current,
					"data-testid": `${m}-path`
				}),
				/* @__PURE__ */ H(i, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ H(a, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [w.eyebrow && /* @__PURE__ */ V(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: w.eyebrow
							}), /* @__PURE__ */ V(o, {
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
						b.backControl && /* @__PURE__ */ V(r, {
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
							"data-testid": `${m}-back`,
							children: b.backControl.label
						}),
						M > 1 && /* @__PURE__ */ H(i, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ V(o, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${m}-position`,
									children: `${T + 1} of ${M}`
								}),
								/* @__PURE__ */ V(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => b.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${m}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ V(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => b.page(1),
									"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
									"data-testid": `${m}-next`,
									children: "›"
								})
							]
						}),
						/* @__PURE__ */ V(r, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Escape",
							onClick: () => {
								b.setCollapsed(!0), c?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${m}-hide`,
							children: "Hide"
						})
					]
				}),
				M > 1 && /* @__PURE__ */ V(i, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${m}-progress`,
					children: ne.map((t, n) => /* @__PURE__ */ V(a, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === T ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				w.fields && w.fields.length > 0 && v && /* @__PURE__ */ V("dl", {
					className: "m-0 flex min-w-0 flex-col gap-0.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((t, n) => /* @__PURE__ */ H("div", {
						className: "flex min-w-0 items-baseline gap-2",
						"data-composer-prompt-field": "",
						children: [/* @__PURE__ */ V("dt", {
							className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ V("dd", {
							className: e("m-0 min-w-0 flex-1 truncate text-xs font-normal", Y[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" || typeof t.value == "number" ? { title: String(t.value) } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				w.fields && w.fields.length > 0 && !v && /* @__PURE__ */ V("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((t, n) => /* @__PURE__ */ H("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ V("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ V("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", Y[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ V(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: ue,
					className: "min-w-0",
					children: w.question
				}),
				w.readOnlyReason ? /* @__PURE__ */ V(o, {
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
					onConfirm: (e) => b.answerCompose(e),
					onCancel: b.isFollowUp ? () => {
						b.back();
					} : w.compose?.onCancel ? () => {
						w.compose?.onCancel?.(), b.finish();
					} : void 0,
					onDone: () => {
						b.finish(), c?.focus();
					},
					"data-testid": `${m}-compose`
				}, w.id) : P.length > 0 && /* @__PURE__ */ V(i, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: P.map((e, t) => {
						let n = de[t], i = n ? `${F ? "Alt+" : ""}${n}` : void 0;
						return /* @__PURE__ */ H(a, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ H(r, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: D || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": i,
								"aria-describedby": e.hint ? `${S}-hint-${t}` : void 0,
								onClick: () => {
									b.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": R?.id === e.id || void 0,
								"data-testid": `${m}-option-${e.id}`,
								children: [i && !v && /* @__PURE__ */ V(X, { children: i }), e.label]
							}), e.hint && /* @__PURE__ */ V(o, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${S}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				ie && /* @__PURE__ */ H(a, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ V(l, {
						ref: ee,
						"aria-label": w.title,
						placeholder: w.placeholder ?? "Your answer",
						value: k,
						disabled: D,
						autoResize: !0,
						minRows: w.kind === "number" ? 1 : 2,
						inputMode: w.kind === "number" ? "decimal" : void 0,
						onChange: (e) => w.inputDraft ? w.inputDraft.onChange(e.target.value) : te({
							id: w.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), D || ae());
						},
						"data-testid": `${m}-answer`
					}), /* @__PURE__ */ V(r, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: D || !k.trim(),
						onClick: () => {
							ae();
						},
						"data-testid": `${m}-submit`,
						children: "Answer"
					})]
				}),
				re && !I && /* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${m}-error`,
					children: re
				}),
				D && !I && /* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${m}-busy`,
					children: "Working…"
				}),
				!v && !w.readOnlyReason && !I && /* @__PURE__ */ V(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${m}-keys`,
					children: pe
				})
			]
		}), N]
	});
}
function je(e) {
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
function Me(e, t, n) {
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
function Ne(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function Pe(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Fe(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && Pe(e.html).length > 0;
}
function Ie(e) {
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
function Le(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Re(e, t) {
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
function ze(e) {
	return `${Z}${e}`;
}
function Be(e, t) {
	try {
		let n = e?.getItem(ze(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Pe(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ve(e, t, n) {
	try {
		Pe(n) ? e?.setItem(ze(t), JSON.stringify({ html: n })) : e?.removeItem(ze(t));
	} catch {}
}
var He = "Conversation changed; draft retained.";
function Ue(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function We(e) {
	return e.map((e) => e.name).join(", ");
}
var Ge = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Ue(`timed out (${n})`)));
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
}, Ke = "Message sent. Your current draft has been kept.", qe = "This destination is no longer available. Choose a current destination.", Je = "This view has no page to attach.";
function Ye(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Xe(e, t) {
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
function Ze() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Qe(e, t, n, r = 6e4) {
	let i = z(new Ge()), a = z(t);
	a.current = t, L(() => () => i.current.rejectAll(He), [t]);
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
			throw new _(Ue(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(He);
		if (n.status === "failed") throw new _(Ue(n.error));
		if (!n.transferId) throw new _(Ue(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : Ue(void 0));
		}
	}, [o, r]);
	return I((e) => Promise.all(e.map(s)), [s]);
}
function $e({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: a, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ H(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ V(o, {
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
			...a ? { "data-composer-readonly-allow": a } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => r(e.target.value)
		})]
	});
}
function et(e) {
	function t(t) {
		return /* @__PURE__ */ V(tt, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function tt({ rm: r, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: b, callBlock: x, reply: S, mode: C, onModeChange: te, defaultMode: w, draftKey: T, persistDraft: E = !0, claim: D = !1, answersFocus: re = !1, onReveal: O, disabled: k, offModes: ie, prompts: ae, promptScope: A, composerRef: oe, onDraftChange: j, defaultDraft: M, draft: N, above: F, modeRowEnd: se, references: ce, onRemoveReference: le, modePlaceholders: ue, contextChip: de, sendWithReferencesOnly: fe, console: pe, "data-testid": U = "conversation-composer", ...me }) {
	let W = n() === "compact", G = f?.displayName || "You", ge = T ?? s ?? `${l.kind}:${l.id}`, _e = u.readOnlyReason || "You can read this conversation but not post to it.", K = R(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? _e,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		_e
	]), [ve, ye] = B(null), be = g === void 0 ? ve : g, xe = !!be && !K.some((e) => e.id === be), q = xe ? {
		id: be,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: qe
	} : Me(K, be, h), Se = K.filter((e) => !e.disabled && !e.unavailableReason).length, Ce = K.length > 0, J = Xe(je({
		capabilities: u,
		hasChat: Ce,
		choosable: Se,
		offline: p ?? null,
		chatOffReason: q?.unavailableReason ?? null
	}), ie), we = w && J.modes.includes(w) ? w : J.modes.find((e) => !J.disabledModes.includes(e)) ?? J.modes[0] ?? "chat", [Te, Ee] = B(we), Y = C ?? Te, X = I((e) => {
		C === void 0 && Ee(e), te?.(e);
	}, [C, te]), Oe = `${J.modes.join(",")}|${J.disabledModes.join(",")}`;
	L(() => {
		if (J.modes.includes(Y) && !J.disabledModes.includes(Y)) return;
		let e = J.modes.find((e) => !J.disabledModes.includes(e));
		e && e !== Y && X(e);
	}, [
		Oe,
		Y,
		X
	]);
	let [ke, Pe] = B(!0), Z = l.reference ?? null;
	L(() => {
		Pe(!0);
	}, [Z?.id]);
	let ze = !!q && q.carriesReference !== !1, He = !!Z && !Z.page, Ue = !!q && q.channel !== s, Ge = !!Z && ke && !(Y === "chat" && (!ze || He && Ue)), et = Y === "chat" && ze && ke && !(He && Ue) ? Z : null, tt = z(0), rt = N !== void 0, it = f?.userId?.trim() || null, Q = it ? JSON.stringify([
		"actor",
		it,
		ge
	]) : null, at = E && !rt ? JSON.stringify([
		"actor",
		it,
		ge
	]) : ge, ot = JSON.stringify([
		ge,
		s ?? null,
		f?.userId ?? null,
		q?.id ?? null,
		q?.channel ?? null
	]), st = z(ot);
	st.current !== ot && (st.current = ot, tt.current += 1);
	let ct = z(N);
	ct.current = N;
	let lt = R(() => {
		if (rt || !E || !Q) return M;
		let e = Be(Ze(), Q);
		return e ? {
			html: e,
			files: []
		} : M;
	}, [
		at,
		rt,
		E
	]), ut = z(""), dt = I((e, t) => {
		tt.current += 1, ut.current = e.html, E && !rt && Q && Ve(Ze(), Q, e.html), c?.setTyping?.(Fe({
			html: e.html,
			mode: Y,
			recipientChannel: q?.channel,
			channel: s
		})), j?.(e, t);
	}, [
		E,
		rt,
		Q,
		c,
		Y,
		q?.channel,
		s,
		j
	]);
	L(() => {
		Fe({
			html: ut.current,
			mode: Y,
			recipientChannel: q?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		Y,
		q?.channel,
		s
	]);
	let ft = Y === "chat" && u.mayAttach && q?.attachments && q.channel ? q.channel : null, pt = Qe(r, ft, G), [mt, ht] = B(null), gt = t(), _t = z(null), vt = I((e) => {
		_t.current = e, Ye(oe, e);
	}, [oe]), yt = I(() => {
		O?.();
		let e = 20, t = () => {
			_t.current ? _t.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [O]), $ = De(ae, { scope: A }), bt = !!$.active && !$.collapsed, xt = me.presentation === "prompt", St = xt && bt && $.active?.kind !== "compose", Ct = St && !$.active?.readOnlyReason, wt = z(!1);
	L(() => {
		bt ? c?.setTyping?.(!1) : wt.current && yt(), wt.current = bt;
	}, [
		bt,
		c,
		yt
	]);
	let Tt = R(() => ({
		isEmpty: () => !_t.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!_t.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: yt
	}), [yt]), Et = I((e) => {
		ye(e), v?.(e), tt.current += 1, ht(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, v]), Dt = K.filter((e) => e.claim !== !1);
	ne({
		channels: D ? Ne(u.maySend || m === void 0 ? s : null, Dt) : [],
		label: D ? D.label : "",
		replies: D ? !!D.replies : !1,
		enabled: !!D && D.enabled !== !1,
		focus: (e) => {
			let t = Dt.find((t) => t.channel === e.channel);
			return X("chat"), t && Et(t.id), yt(), !0;
		}
	});
	let Ot = I((e) => {
		if (e.mode === "agent") return !J.modes.includes("agent") || J.disabledModes.includes("agent") ? !1 : (X("agent"), yt(), !0);
		if (!J.modes.includes("chat") || J.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? K.find((e) => e.channel && e.channel === s) ?? (m ? K.find((e) => e.id === "discussion") : q) : t.kind === "huddle" ? Dt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? K.find((e) => e.id === `person:${t.userId}`) ?? null : K.find((e) => e.channel === t.channel) ?? null : q;
		return !n || n.disabled ? !1 : (n.id !== q?.id && Et(n.id), X("chat"), yt(), !0);
	}, [
		J,
		X,
		yt,
		q,
		K,
		m,
		Dt,
		s,
		Et
	]);
	ee(Ot, re);
	let kt = R(() => y.filter((e) => !e.modes || e.modes.includes(Y)), [y, Y]), At = R(() => kt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [kt]), jt = (e) => {
		if (typeof e == "string") throw new _(e);
		return e !== !1;
	}, Mt = async (e, t) => {
		if (ht(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && E && !rt && Q && Ve(Ze(), Q, ""), t;
		}
		if (Ct) {
			let t = await $.answerDirection(e.text);
			return t && E && !rt && Q && Ve(Ze(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: et ?? (ke ? Z : null),
			recipientId: q?.id ?? null,
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Le(t), a = Re(t, r) ?? (i === t ? null : Re(i, r));
			if (a) {
				let e = Re(t, [a.command]) ? t : i;
				return !a.command.disabled && jt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return jt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? jt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Re(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), jt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!q || q.disabled || q.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!fe && (!!et || (ce?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ft) return !1;
		c?.setTyping?.(!1);
		let a = tt.current, o = st.current, l = e.files.length ? await pt(e.files) : [], d = !!q.channel && q.channel === s, f = Ie({
			displayName: G,
			reply: d ? S?.reply ?? null : null,
			reference: et,
			attachments: l
		}), m = r || We(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: et
		}, g;
		return q.send ? g = await q.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? tt.current !== a || ct.current !== N ? (st.current === o && gt?.toast(Ke, { type: "success" }), !1) : (d && S?.clear(), E && !rt && Q && Ve(Ze(), Q, ""), !0) : !1;
	}, Nt = !!u.pending, Pt = Y === "chat" && (!q || !!q.unavailableReason || !!q.disabled), Ft = Pt && !$.typed && !Ct && !k && !p && !Nt, It = Ge && Z ? /* @__PURE__ */ V(d, {
		references: [{
			id: Z.id,
			label: W ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Ft ? {} : { onRemove: () => {
			Pe(!1), tt.current += 1, le?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Lt = xe && q ? [...K, q] : K, Rt = Y === "chat" && Lt.length > 1, zt = Y === "chat" && ke && He && Ue && ze, Bt = Y === "chat" && Lt.length > 1 && !Nt ? q?.unavailableReason ?? (q ? null : "Choose a destination.") : null, Vt = Y === "chat" ? q?.error ?? null : null, Ht = Rt || Bt || mt || zt || Vt || F != null && F !== !1 ? /* @__PURE__ */ H(a, {
		gap: "xs",
		children: [
			F,
			(Rt || Bt) && /* @__PURE__ */ H(i, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Rt && /* @__PURE__ */ V($e, {
					id: `${ge}-recipient`,
					value: q?.id ?? null,
					recipients: Lt,
					onChange: Et,
					"data-testid": `${U}-recipient`,
					...Ft ? Se > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Bt && /* @__PURE__ */ V(o, {
					size: "xs",
					tone: "tertiary",
					title: Bt,
					className: e("min-w-0", Rt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${U}-recipient-unavailable`,
					children: /* @__PURE__ */ V("span", {
						className: "truncate",
						children: Bt
					})
				})]
			}),
			zt && /* @__PURE__ */ V(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Je
			}),
			mt && /* @__PURE__ */ V(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${U}-note`,
				children: mt
			}),
			Vt && /* @__PURE__ */ V(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${U}-recipient-error`,
				children: Vt
			})
		]
	}) : void 0, Ut = !W, Wt = Ut && It || se ? /* @__PURE__ */ H(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Ut ? It : null, se]
	}) : void 0, Gt = !Ut && Ge && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...ce ?? []] : ce, Kt = (e) => {
		Z && e === Z.id && (Pe(!1), tt.current += 1), le?.(e);
	}, qt = {
		...ue,
		...Y === "chat" && q?.placeholder ? { chat: q.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [Y]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : xt ? $.active.placeholder ?? nt($.direction, he($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, Jt = Ft ? Bt ? Se > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : q?.unavailableReason ?? (q ? _e : "Choose a destination.") : null;
	return /* @__PURE__ */ V(P, {
		collapsible: !0,
		...me,
		collapsedLabel: me.collapsedLabel ?? (Y === "chat" ? q?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: vt,
		"data-testid": U,
		...W ? { responsive: "pane" } : {},
		console: pe ?? !!x,
		dock: x,
		mode: Y,
		onModeChange: X,
		modes: J.modes,
		disabledModes: J.disabledModes,
		modeUnavailableReasons: J.reasons,
		chatAvailable: Ce && !J.reasons.chat,
		contextChip: de ?? (!Z && void 0),
		above: bt ? F : Ht,
		...St ? { header: /* @__PURE__ */ V(Ae, {
			deck: $,
			input: Tt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${U}-prompts`
		}) } : bt ? { replacement: /* @__PURE__ */ V(Ae, {
			deck: $,
			"data-testid": `${U}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ V(Ae, {
			deck: $,
			input: Tt,
			variant: "inset",
			"data-testid": `${U}-prompts`
		}) } : {},
		...Wt ? { modeRowEnd: Wt } : {},
		...Gt ? {
			references: Gt,
			onRemoveReference: Kt
		} : {},
		modePlaceholders: qt,
		commands: At,
		reply: Y === "chat" && S?.reply && q?.channel === s ? {
			author: S.reply.author,
			quote: S.reply.text,
			messageId: S.reply.messageId,
			...S.reply.timestamp ? { timestamp: S.reply.timestamp } : {},
			onDismiss: S.clear
		} : null,
		allowAttachments: !!ft,
		...fe === void 0 ? {} : { sendWithReferencesOnly: fe },
		...Jt ? { readOnly: Jt } : {},
		disabled: !!k || !$.typed && !Ct && (!!p || Pt || Y === "agent" && !u.agent?.allowed),
		draftKey: at,
		...rt ? { draft: N } : {},
		...lt === void 0 ? {} : { defaultDraft: lt },
		onDraftChange: dt,
		onSend: (e, t) => Mt(e, t.mode),
		className: e(me.className)
	});
}
function nt(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { F as AgentComposerDock, M as COMPOSER_BREAKPOINTS, S as COMPOSER_CONTEXT_KINDS, b as COMPOSER_CONTEXT_REASONS, ae as COMPOSER_MODE_ORDER, pe as CONFIRM_OPTIONS, j as CommandSuggestions, O as ComposerAttachments, fe as ComposerConfirmFlow, A as ComposerPresentationContext, Ae as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, P as ContextComposer, E as ConversationInputProvider, ie as DocumentSuggestions, f as EMOJI_SHORTCODES, re as EmojiSuggestions, N as MentionSuggestions, oe as RichChatComposer, te as ThreadInputHandoff, ge as answerForOption, We as attachmentOnlyText, g as composerCommandArgumentText, x as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, k as composerSizeFor, et as createConversationComposer, q as deckKeyAction, he as defaultOption, y as identityDisplayName, p as matchComposerCommand, D as matchesModeTrigger, _e as parseTypedAnswer, U as promptOptions, Ee as promptsInScope, m as searchEmoji, G as takesDirection, W as takesTypedAnswer, C as useComposerFocus, w as useComposerFocusReveal, De as useComposerPromptDeck, Qe as useConversationUploads, T as useThreadInput };
