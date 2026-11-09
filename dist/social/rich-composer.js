import { c as e, d as t, n } from "../Button-DQoeE5dN.js";
import { i as r } from "../ToastProvider-DWf7aLVm.js";
import { i, n as a, r as o } from "../Text-DAQCiXe4.js";
import { t as s } from "../Select-BGBx7BNi.js";
import { t as c } from "../FormField-BDZIVA7n.js";
import { t as l } from "../Textarea-Cf4WFXAs.js";
import { t as u } from "../DecisionPath-DIWtr1gN.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-vB7M56RD.js";
import { a as v, i as ee, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as S, i as C, n as te, o as w, r as ne, s as T, t as E } from "../ConversationInputs-CPKX3wfR.js";
import { a as D, c as O, d as re, i as k, l as A, n as ie, o as j, r as ae, s as M, t as N, u as oe } from "../RichChatComposer-HarjZCBx.js";
import { t as se } from "../ContextComposer-DTX7gRNv.js";
import { t as P } from "../AgentComposerDock-DnhOV2t8.js";
import { useCallback as F, useContext as ce, useEffect as I, useId as le, useMemo as L, useRef as R, useState as z } from "react";
import { jsx as B, jsxs as V } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function ue(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function de(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var fe = {
	draft: 0,
	review: 1,
	done: 2
};
function pe({ title: e, recipient: r, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: ee = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: S, onCancel: C, onDone: te, onStageChange: w, path: ne, autoFocus: T = !0, className: E, "data-testid": D = "composer-confirm-flow" }) {
	let [O, re] = z(s), k = d !== void 0, A = k ? d : O, ie = F((e) => {
		k || re(e), f?.(e);
	}, [k, f]), [j, ae] = z("draft"), [M, N] = z(!1), [oe, se] = z(null), [P, ce] = z(null), L = R(!1), pe = R(null), me = R(null), H = R(null), U = le(), W = A.trim().length > 0, G = F((e) => {
		ae(e), w?.(e);
	}, [w]), he = R(!1);
	I(() => {
		let e = !he.current;
		he.current = !0, !(e && !T) && (j === "draft" ? pe.current : j === "review" ? me.current : H.current)?.focus({ preventScroll: !0 });
	}, [j, T]);
	let ge = F(() => {
		W && (se(null), G("review"));
	}, [W, G]), _e = F(async () => {
		if (L.current) return;
		L.current = !0, N(!0), se(null);
		let e;
		try {
			e = await S(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			L.current = !1, N(!1);
		}
		if (ue(e)) {
			se(e.error);
			return;
		}
		ce(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		A,
		S,
		G
	]), K = j === "review" ? h ?? e : j === "done" ? _ : e, q = `${U}-heading`, ve = `${U}-keys`, ye = K || r ? /* @__PURE__ */ V(o, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [K && /* @__PURE__ */ B(a, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: q,
			className: "min-w-0",
			children: K
		}), r && /* @__PURE__ */ B(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${D}-recipient`,
			children: r
		})]
	}) : null, be = ne ? /* @__PURE__ */ B(u, {
		steps: ne.steps,
		current: ne.current + fe[j],
		"data-testid": `${D}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "done",
		"data-testid": D,
		children: [be, /* @__PURE__ */ V(i, {
			as: "section",
			gap: "xs",
			ref: H,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": K ? q : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${D}-done`,
			children: [
				ye,
				/* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-done-message`,
					children: P ?? v
				}),
				te && /* @__PURE__ */ B(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ B(n, {
						size: "sm",
						variant: "ghost",
						onClick: te,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${D}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : j === "review" ? /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "review",
		"data-testid": D,
		children: [be, /* @__PURE__ */ V(i, {
			as: "section",
			gap: "xs",
			ref: me,
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
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : de(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), _e()));
			},
			children: [
				ye,
				/* @__PURE__ */ B(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${D}-message`,
					children: A
				}),
				/* @__PURE__ */ V(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(n, {
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
						/* @__PURE__ */ B(n, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${D}-back`,
							children: b
						}),
						/* @__PURE__ */ B(a, {
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
				oe && /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${D}-error`,
					children: oe
				}),
				M && /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${D}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ B(a, {
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
	}) : /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", E),
		"data-composer-confirm-flow": "draft",
		"data-testid": D,
		children: [be, /* @__PURE__ */ V(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), ge();
			},
			"aria-labelledby": K ? q : void 0,
			"data-testid": `${D}-draft`,
			children: [
				ye,
				/* @__PURE__ */ B(c, {
					label: p,
					children: (e) => /* @__PURE__ */ B(l, {
						...e,
						ref: pe,
						"aria-describedby": [e["aria-describedby"], ve].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							de(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || ge()));
						},
						"data-testid": `${D}-editor`
					})
				}),
				/* @__PURE__ */ V(o, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !W,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${D}-continue`,
							children: ee
						}),
						C && /* @__PURE__ */ B(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: C,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${D}-cancel`,
							children: b
						}),
						/* @__PURE__ */ B(a, {
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
function U(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function W(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function G(e) {
	return !!e && !e.readOnlyReason && !!e.onDirection && (e.kind === "choice" || e.kind === "confirm");
}
function he(e) {
	let t = H(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function ge(e, t) {
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
function K(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = H(e).find((e) => e.id === t.optionId);
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
function xe(e, t) {
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
	let f = H(n);
	if (e.key === "Enter" && l && !a) {
		let e = he(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = J(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => U(e, t) === p), h = m >= 0 ? f[m] : null;
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
var Se = [], Ce = {};
function Y(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function we(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Te(e, t) {
	return t == null || e.every((e) => e.scope == null || e.scope === t) ? e : e.filter((e) => e.scope == null || e.scope === t);
}
function Ee(e, t = {}) {
	let n = t.scope, r = L(() => Te(e ?? Se, n), [e, n]), [i, a] = z(() => /* @__PURE__ */ new Set()), [o, s] = z(null), [c, l] = z(!1), [u, d] = z(null), [f, p] = z({}), [m, h] = z(null), [g, _] = z(Ce), v = R(g);
	v.current = g;
	let ee = R(n);
	I(() => {
		ee.current !== n && (ee.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let y = L(() => q(r, i, g), [
		r,
		i,
		g
	]), b = be(y, o), x = b >= 0 ? y[b] : null, S = u != null, C = R(!1), te = r.map((e) => e.id).join("\0");
	I(() => {
		let e = ve(r, v.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [te]);
	let w = y[0]?.id ?? null, ne = R(/* @__PURE__ */ new Set());
	I(() => {
		let e = y.some((e) => !ne.current.has(e.id));
		for (let e of y) ne.current.add(e.id);
		e && l(!1);
	}, [w, y]);
	let T = F(async (e, t) => {
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
		return Y(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : we(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : K(e, t)), !0);
	}, []), E = F(async (e) => {
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
		return Y(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), D = x ? ye(x.id, g) : null, O = F(() => {
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
	} : D != null && x?.kind !== "compose" ? { label: "Back" } : null, A = F(async () => {
		if (!x) return !1;
		let e = x.back;
		if (!e) return x.kind !== "compose" && O();
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
	}, [x, O]), ie = F(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), j = F(async (e) => {
		if (!x) return !1;
		let t = H(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : T(x, ge(x, t));
	}, [x, T]), ae = F(async (e) => {
		if (!x || !W(x)) return !1;
		let t = _e(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : T(x, t.answer);
	}, [x, T]), M = F(async (e) => {
		let t = x, n = e.trim();
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
		return Y(r) ? (p((e) => ({
			...e,
			[t.id]: r.error
		})), !1) : we(r) ? (_((e) => ({
			...e,
			[t.id]: r.next
		})), a((e) => new Set(e).add(t.id)), s(null), !0) : (r && "receipt" in r && h(r.receipt), !0);
	}, [x, c]), N = F((e) => {
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
var De = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function X({ children: e }) {
	return /* @__PURE__ */ B("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function Oe() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var ke = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Ae({ deck: e, prompts: r, scope: s, input: c = null, variant: d = "card", presentation: f, className: p, "data-testid": m = "composer-prompt-deck" }) {
	let h = d === "inset", g = ce(j), _ = f ?? g ?? "card", v = _ === "prompt", ee = Ee(e ? null : r, { scope: s }), y = e ?? ee, b = R(null), x = le(), S = R(null), [C, te] = z({
		id: "",
		text: ""
	}), { active: w, pending: ne, index: T, collapsed: E, busy: D, error: O, receipt: re } = y, k = w?.inputDraft?.value ?? (C.id === w?.id ? C.text : ""), A = !c && y.typed && !w?.readOnlyReason, ie = async () => {
		let e = w?.id;
		await y.answerTyped(k) && te((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, ae = R({
		deck: y,
		input: c
	});
	if (ae.current = {
		deck: y,
		input: c
	}, I(() => {
		if (!w || E || w.readOnlyReason || w.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = ae.current.input;
			t && !b.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : S.current ? S.current.focus() : (b.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? b.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
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
			let { deck: t, input: n } = ae.current, r = e.target, i = !!b.current && !!r && b.current.contains(r), a = !!n && n.contains(r), o = !!r && S.current?.contains(r);
			if (!i && !a) return;
			let s = xe({
				key: e.key,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				code: e.code
			}, {
				prompt: t.active,
				collapsed: t.collapsed,
				inputEmpty: n ? n.isEmpty() : !S.current?.value.trim(),
				inDeck: i && !o,
				busy: t.busy,
				canBack: !!t.backControl && !t.backControl.disabledReason
			});
			s && (e.preventDefault(), e.stopPropagation(), s.type === "page" ? t.page(s.delta) : s.type === "back" ? t.goBack() : s.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : s.type === "expand" ? t.setCollapsed(!1) : t.pick(s.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !y.visible) return null;
	let M = Oe(), N = ne.length, oe = re ? /* @__PURE__ */ V(o, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: t("min-w-0", h && !E && w && "px-3 pb-2"),
		"data-testid": `${m}-receipt`,
		children: [/* @__PURE__ */ B(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${re}`
		}), /* @__PURE__ */ B(n, {
			variant: "link",
			size: "sm",
			onClick: y.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!w || E) return /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border px-3 py-1.5", p),
		"data-composer-prompt-deck": w ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [w && /* @__PURE__ */ V(o, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: t("min-w-0", !h && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ B(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: N === 1 ? `1 question waiting · ${w.title}` : `${N} questions waiting · ${w.title}`
				}),
				/* @__PURE__ */ B(n, {
					variant: "link",
					size: "sm",
					onClick: () => y.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${m}-show`,
					children: "Show"
				}),
				!v && /* @__PURE__ */ B(X, { children: `${M}↓` })
			]
		}), oe]
	});
	let se = H(w), P = W(w), F = w.kind === "compose" && !w.readOnlyReason, L = he(w), ue = `${x}-title`, de = `${x}-question`, fe = se.map((e, t) => U(e, t)), me = [
		se.length ? `${P ? "Alt+" : ""}${fe.filter(Boolean).length > 1 ? `${fe[0]}–${fe[fe.length - 1]}` : fe[0] ?? ""} choose` : null,
		P ? "type an answer · Enter answer" : L ? `Enter ${L.label}` : null,
		N > 1 ? `${M}↓ next` : null,
		y.backControl && !y.backControl.disabledReason ? `Alt+⌫ ${y.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V(i, {
		gap: "xs",
		className: t("min-w-0", h && "border-b border-border", p),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : w.kind,
		"data-deck-variant": d,
		"data-presentation": _,
		"data-testid": m,
		ref: b,
		children: [/* @__PURE__ */ V("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": ue,
			"aria-describedby": de,
			"aria-busy": D || void 0,
			className: t("flex min-w-0 flex-col gap-2 px-3 py-2.5", ke, !h && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": w.id,
			"data-composer-prompt-kind": w.kind,
			"data-testid": `${m}-card`,
			children: [
				w.path && !F && /* @__PURE__ */ B(u, {
					steps: w.path.steps,
					current: w.path.current,
					"data-testid": `${m}-path`
				}),
				/* @__PURE__ */ V(o, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [w.eyebrow && /* @__PURE__ */ B(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: w.eyebrow
							}), /* @__PURE__ */ B(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: ue,
								title: w.title,
								children: w.title
							})]
						}),
						y.backControl && /* @__PURE__ */ B(n, {
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
						N > 1 && /* @__PURE__ */ V(o, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ B(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${m}-position`,
									children: `${T + 1} of ${N}`
								}),
								/* @__PURE__ */ B(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => y.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${m}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ B(n, {
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
						/* @__PURE__ */ B(n, {
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
				N > 1 && /* @__PURE__ */ B(o, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${m}-progress`,
					children: ne.map((e, n) => /* @__PURE__ */ B(i, {
						gap: "none",
						className: t("h-1 min-w-0 flex-1 rounded-full", n === T ? "bg-primary" : "bg-border")
					}, e.id))
				}),
				w.fields && w.fields.length > 0 && v && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-col gap-0.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-baseline gap-2",
						"data-composer-prompt-field": "",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 shrink-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ B("dd", {
							className: t("m-0 min-w-0 flex-1 truncate text-xs font-normal", De[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" || typeof e.value == "number" ? { title: String(e.value) } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				w.fields && w.fields.length > 0 && !v && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${m}-fields`,
					children: w.fields.map((e, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: e.label
						}), /* @__PURE__ */ B("dd", {
							className: t("m-0 min-w-0 break-words text-xs font-normal", De[e.tone ?? "neutral"], e.mono && "tabular-nums"),
							...typeof e.value == "string" ? { title: e.value } : {},
							children: e.value
						})]
					}, `${e.label}-${n}`))
				}),
				/* @__PURE__ */ B(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: de,
					className: "min-w-0",
					children: w.question
				}),
				w.readOnlyReason ? /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${m}-read-only`,
					children: w.readOnlyReason
				}) : F ? /* @__PURE__ */ B(pe, {
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
				}, w.id) : se.length > 0 && /* @__PURE__ */ B(o, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: se.map((e, t) => {
						let r = fe[t], o = r ? `${P ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ V(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ V(n, {
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
								"data-default": L?.id === e.id || void 0,
								"data-testid": `${m}-option-${e.id}`,
								children: [o && !v && /* @__PURE__ */ B(X, { children: o }), e.label]
							}), e.hint && /* @__PURE__ */ B(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${x}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				A && /* @__PURE__ */ V(i, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ B(l, {
						ref: S,
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
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), D || ie());
						},
						"data-testid": `${m}-answer`
					}), /* @__PURE__ */ B(n, {
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
				O && !F && /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${m}-error`,
					children: O
				}),
				D && !F && /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${m}-busy`,
					children: "Working…"
				}),
				!v && !w.readOnlyReason && !F && /* @__PURE__ */ B(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${m}-keys`,
					children: me
				})
			]
		}), oe]
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
var ze = "ui.conversation-draft:";
function Z(e) {
	return `${ze}${e}`;
}
function Be(e, t) {
	try {
		let n = e?.getItem(Z(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && Pe(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ve(e, t, n) {
	try {
		Pe(n) ? e?.setItem(Z(t), JSON.stringify({ html: n })) : e?.removeItem(Z(t));
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
	let i = R(new Ge()), a = R(t);
	a.current = t, I(() => () => i.current.rejectAll(He), [t]);
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
	return F((e) => Promise.all(e.map(s)), [s]);
}
function $e({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: i, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ V(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ B(a, {
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
function et(e) {
	function t(t) {
		return /* @__PURE__ */ B(tt, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function tt({ rm: n, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: ee, commands: y = [], onAgent: b, callBlock: x, reply: C, mode: te, onModeChange: w, defaultMode: T, draftKey: E, persistDraft: D = !0, claim: O = !1, answersFocus: re = !1, onReveal: k, disabled: A, offModes: ie, prompts: j, promptScope: ae, composerRef: M, onDraftChange: N, defaultDraft: oe, draft: P, above: ce, modeRowEnd: le, references: ue, onRemoveReference: de, modePlaceholders: fe, contextChip: pe, sendWithReferencesOnly: me, console: H, "data-testid": U = "conversation-composer", ...W }) {
	let G = e() === "compact", ge = f?.displayName || "You", _e = E ?? s ?? `${l.kind}:${l.id}`, K = u.readOnlyReason || "You can read this conversation but not post to it.", q = L(() => {
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
	]), [ve, ye] = z(null), be = g === void 0 ? ve : g, xe = !!be && !q.some((e) => e.id === be), J = xe ? {
		id: be,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: qe
	} : Me(q, be, h), Se = q.filter((e) => !e.disabled && !e.unavailableReason).length, Ce = q.length > 0, Y = Xe(je({
		capabilities: u,
		hasChat: Ce,
		choosable: Se,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), ie), we = T && Y.modes.includes(T) ? T : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Te, De] = z(we), X = te ?? Te, Oe = F((e) => {
		te === void 0 && De(e), w?.(e);
	}, [te, w]), ke = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	I(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Oe(e);
	}, [
		ke,
		X,
		Oe
	]);
	let [Pe, ze] = z(!0), Z = l.reference ?? null;
	I(() => {
		ze(!0);
	}, [Z?.id]);
	let He = !!J && J.carriesReference !== !1, Ue = !!Z && !Z.page, Ge = !!J && J.channel !== s, et = !!Z && Pe && !(X === "chat" && (!He || Ue && Ge)), tt = X === "chat" && He && Pe && !(Ue && Ge) ? Z : null, it = R(0), at = P !== void 0, ot = f?.userId?.trim() || null, Q = ot ? JSON.stringify([
		"actor",
		ot,
		_e
	]) : null, st = D && !at ? JSON.stringify([
		"actor",
		ot,
		_e
	]) : _e, ct = JSON.stringify([
		_e,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), lt = R(ct);
	lt.current !== ct && (lt.current = ct, it.current += 1);
	let ut = R(P);
	ut.current = P;
	let dt = L(() => {
		if (at || !D || !Q) return oe;
		let e = Be(Ze(), Q);
		return e ? {
			html: e,
			files: []
		} : oe;
	}, [
		st,
		at,
		D
	]), ft = R(""), pt = F((e, t) => {
		it.current += 1, ft.current = e.html, D && !at && Q && Ve(Ze(), Q, e.html), c?.setTyping?.(Fe({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}));
		let n = mt.current;
		if (n && n.value !== void 0) {
			let t = bt.current?.editor?.getText() ?? nt(e.html);
			t !== n.lastSent && (n.lastSent = t, n.onChange(t));
		}
		N?.(e, t);
	}, [
		D,
		at,
		Q,
		c,
		X,
		J?.channel,
		s,
		N
	]), mt = R(null);
	I(() => {
		Fe({
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
	let ht = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, gt = Qe(n, ht, ge), [_t, vt] = z(null), yt = r(), bt = R(null), xt = F((e) => {
		bt.current = e, Ye(M, e);
	}, [M]), St = F(() => {
		k?.();
		let e = 20, t = () => {
			bt.current ? bt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [k]), $ = Ee(j, { scope: ae }), Ct = !!$.active && !$.collapsed, wt = W.presentation === "prompt", Tt = wt && Ct && $.active?.kind !== "compose", Et = Tt && !$.active?.readOnlyReason, Dt = Tt ? $.active?.inputDraft : void 0;
	mt.current = Dt ? {
		value: Dt.value,
		onChange: Dt.onChange,
		lastSent: mt.current?.lastSent ?? Dt.value
	} : null;
	let Ot = R(null), kt = Dt && $.active ? $.active.id : null;
	I(() => {
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
	let At = R(!1);
	I(() => {
		Ct ? c?.setTyping?.(!1) : At.current && St(), At.current = Ct;
	}, [
		Ct,
		c,
		St
	]);
	let jt = L(() => ({
		isEmpty: () => !bt.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!bt.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: St
	}), [St]), Mt = F((e) => {
		ye(e), ee?.(e), it.current += 1, vt(null), q.find((t) => t.id === e)?.onSelect?.();
	}, [q, ee]), Nt = q.filter((e) => e.claim !== !1);
	ne({
		channels: O ? Ne(u.maySend || m === void 0 ? s : null, Nt) : [],
		label: O ? O.label : "",
		replies: O ? !!O.replies : !1,
		enabled: !!O && O.enabled !== !1,
		focus: (e) => {
			let t = Nt.find((t) => t.channel === e.channel);
			return Oe("chat"), t && Mt(t.id), St(), !0;
		}
	});
	let Pt = F((e) => {
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
	S(Pt, re);
	let Ft = L(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), It = L(() => Ft.map((e) => ({
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
			return t && D && !at && Q && Ve(Ze(), Q, ""), t;
		}
		if (Et) {
			let t = await $.answerDirection(e.text);
			return t && D && !at && Q && Ve(Ze(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: tt ?? (Pe ? Z : null),
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Le(t), a = Re(t, r) ?? (i === t ? null : Re(i, r));
			if (a) {
				let e = Re(t, [a.command]) ? t : i;
				return !a.command.disabled && Lt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return Lt(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Lt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Re(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Lt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!me && (!!tt || (ue?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ht) return !1;
		c?.setTyping?.(!1);
		let a = it.current, o = lt.current, l = e.files.length ? await gt(e.files) : [], d = !!J.channel && J.channel === s, f = Ie({
			displayName: ge,
			reply: d ? C?.reply ?? null : null,
			reference: tt,
			attachments: l
		}), m = r || We(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: tt
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? it.current !== a || ut.current !== P ? (lt.current === o && yt?.toast(Ke, { type: "success" }), !1) : (d && C?.clear(), D && !at && Q && Ve(Ze(), Q, ""), !0) : !1;
	}, zt = !!u.pending, Bt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Vt = Bt && !$.typed && !Et && !A && !p && !zt, Ht = et && Z ? /* @__PURE__ */ B(d, {
		references: [{
			id: Z.id,
			label: G ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Vt ? {} : { onRemove: () => {
			ze(!1), it.current += 1, de?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Ut = xe && J ? [...q, J] : q, Wt = X === "chat" && Ut.length > 1, Gt = X === "chat" && Pe && Ue && Ge && He, Kt = X === "chat" && Ut.length > 1 && !zt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, qt = X === "chat" ? J?.error ?? null : null, Jt = Wt || Kt || _t || Gt || qt || ce != null && ce !== !1 ? /* @__PURE__ */ V(i, {
		gap: "xs",
		children: [
			ce,
			(Wt || Kt) && /* @__PURE__ */ V(o, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Wt && /* @__PURE__ */ B($e, {
					id: `${_e}-recipient`,
					value: J?.id ?? null,
					recipients: Ut,
					onChange: Mt,
					"data-testid": `${U}-recipient`,
					...Vt ? Se > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Kt && /* @__PURE__ */ B(a, {
					size: "xs",
					tone: "tertiary",
					title: Kt,
					className: t("min-w-0", Wt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${U}-recipient-unavailable`,
					children: /* @__PURE__ */ B("span", {
						className: "truncate",
						children: Kt
					})
				})]
			}),
			Gt && /* @__PURE__ */ B(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Je
			}),
			_t && /* @__PURE__ */ B(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${U}-note`,
				children: _t
			}),
			qt && /* @__PURE__ */ B(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${U}-recipient-error`,
				children: qt
			})
		]
	}) : void 0, Yt = !G, Xt = Yt && Ht || le ? /* @__PURE__ */ V(o, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Yt ? Ht : null, le]
	}) : void 0, Zt = !Yt && et && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...ue ?? []] : ue, Qt = (e) => {
		Z && e === Z.id && (ze(!1), it.current += 1), de?.(e);
	}, $t = {
		...fe,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : wt ? $.active.placeholder ?? rt($.direction, he($.active)?.label) : "Choose an answer above, or press its number" } : {}
	}, en = Vt ? Kt ? Se > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? K : "Choose a destination.") : null;
	return /* @__PURE__ */ B(se, {
		collapsible: !0,
		...W,
		collapsedLabel: W.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: xt,
		"data-testid": U,
		...G ? { responsive: "pane" } : {},
		console: H ?? !!x,
		dock: x,
		mode: X,
		onModeChange: Oe,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: Ce && !Y.reasons.chat,
		contextChip: pe ?? (!Z && void 0),
		above: Ct ? ce : Jt,
		...Tt ? { header: /* @__PURE__ */ B(Ae, {
			deck: $,
			input: jt,
			variant: "inset",
			presentation: "prompt",
			"data-testid": `${U}-prompts`
		}) } : Ct ? { replacement: /* @__PURE__ */ B(Ae, {
			deck: $,
			"data-testid": `${U}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ B(Ae, {
			deck: $,
			input: jt,
			variant: "inset",
			"data-testid": `${U}-prompts`
		}) } : {},
		...Xt ? { modeRowEnd: Xt } : {},
		...Zt ? {
			references: Zt,
			onRemoveReference: Qt
		} : {},
		modePlaceholders: $t,
		commands: It,
		reply: X === "chat" && C?.reply && J?.channel === s ? {
			author: C.reply.author,
			quote: C.reply.text,
			messageId: C.reply.messageId,
			...C.reply.timestamp ? { timestamp: C.reply.timestamp } : {},
			onDismiss: C.clear
		} : null,
		allowAttachments: !!ht,
		...me === void 0 ? {} : { sendWithReferencesOnly: me },
		...en ? { readOnly: en } : {},
		disabled: !!A || !$.typed && !Et && (!!p || Bt || X === "agent" && !u.agent?.allowed),
		draftKey: st,
		...at ? { draft: P } : {},
		...dt === void 0 ? {} : { defaultDraft: dt },
		onDraftChange: pt,
		onSend: (e, t) => Rt(e, t.mode),
		className: t(W.className)
	});
}
function nt(e) {
	return e.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}
function rt(e, t) {
	return e ? t ? `Type a change, or press Enter to ${t}` : "Type a change, or choose an answer above" : t ? `Press Enter to ${t}, or choose an answer above` : "Choose an answer above";
}
//#endregion
export { P as AgentComposerDock, N as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, ie as COMPOSER_MODE_ORDER, me as CONFIRM_OPTIONS, M as CommandSuggestions, re as ComposerAttachments, pe as ComposerConfirmFlow, j as ComposerPresentationContext, Ae as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, se as ContextComposer, E as ConversationInputProvider, A as DocumentSuggestions, f as EMOJI_SHORTCODES, O as EmojiSuggestions, oe as MentionSuggestions, ae as RichChatComposer, te as ThreadInputHandoff, ge as answerForOption, We as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, k as composerSizeFor, et as createConversationComposer, xe as deckKeyAction, he as defaultOption, ee as identityDisplayName, p as matchComposerCommand, D as matchesModeTrigger, _e as parseTypedAnswer, H as promptOptions, Te as promptsInScope, m as searchEmoji, G as takesDirection, W as takesTypedAnswer, C as useComposerFocus, w as useComposerFocusReveal, Ee as useComposerPromptDeck, Qe as useConversationUploads, T as useThreadInput };
