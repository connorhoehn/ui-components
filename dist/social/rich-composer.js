import { t as e } from "../cn-D4QmbyEy.js";
import { r as t } from "../ToastProvider-D6jAeNNE.js";
import { c as n, n as r } from "../Button-C-I3BxWI.js";
import { c as i, l as a, n as o } from "../Text-BEZVdfww.js";
import { t as s } from "../Select-CpZyUWay.js";
import { t as c } from "../FormField-CQ27qxWt.js";
import { t as l } from "../Textarea-CvdLeuO_.js";
import { t as u } from "../DecisionPath-ZneSRRKp.js";
import { a as d, c as f, i as p, l as m, n as h, r as g, t as _ } from "../composerSendError-BTSwRiUg.js";
import { a as v, i as y, n as ee, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as C, o as w, r as T, s as E, t as D } from "../ConversationInputs-InPayN0Y.js";
import { a as O, c as ne, i as re, l as k, n as A, o as ie, r as j, s as M, t as N, u as P } from "../RichChatComposer-B2Xmnqkg.js";
import { t as ae } from "../ContextComposer-aVIphlok.js";
import { t as F } from "../AgentComposerDock-DrE1fGWN.js";
import { useCallback as I, useEffect as L, useId as oe, useMemo as se, useRef as R, useState as z } from "react";
import { jsx as B, jsxs as V } from "react/jsx-runtime";
//#region src/components/social/ComposerConfirmFlow.tsx
function ce(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function le(e) {
	return e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
}
var ue = {
	draft: 0,
	review: 1,
	done: 2
};
function de({ title: t, recipient: n, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: ee = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: C, onStageChange: w, path: T, autoFocus: E = !0, className: D, "data-testid": O = "composer-confirm-flow" }) {
	let [ne, re] = z(s), k = d !== void 0, A = k ? d : ne, ie = I((e) => {
		k || re(e), f?.(e);
	}, [k, f]), [j, M] = z("draft"), [N, P] = z(!1), [ae, F] = z(null), [se, de] = z(null), fe = R(!1), H = R(null), U = R(null), W = R(null), pe = oe(), me = A.trim().length > 0, G = I((e) => {
		M(e), w?.(e);
	}, [w]), he = R(!1);
	L(() => {
		let e = !he.current;
		he.current = !0, !(e && !E) && (j === "draft" ? H.current : j === "review" ? U.current : W.current)?.focus({ preventScroll: !0 });
	}, [j, E]);
	let K = I(() => {
		me && (F(null), G("review"));
	}, [me, G]), ge = I(async () => {
		if (fe.current) return;
		fe.current = !0, P(!0), F(null);
		let e;
		try {
			e = await te(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			fe.current = !1, P(!1);
		}
		if (ce(e)) {
			F(e.error);
			return;
		}
		de(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		A,
		te,
		G
	]), _e = j === "review" ? h ?? t : j === "done" ? _ : t, q = `${pe}-heading`, ve = `${pe}-keys`, J = _e || n ? /* @__PURE__ */ V(i, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [_e && /* @__PURE__ */ B(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: q,
			className: "min-w-0",
			children: _e
		}), n && /* @__PURE__ */ B(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${O}-recipient`,
			children: n
		})]
	}) : null, ye = T ? /* @__PURE__ */ B(u, {
		steps: T.steps,
		current: T.current + ue[j],
		"data-testid": `${O}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "done",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ V(a, {
			as: "section",
			gap: "xs",
			ref: W,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": _e ? q : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${O}-done`,
			children: [
				J,
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${O}-done-message`,
					children: se ?? v
				}),
				C && /* @__PURE__ */ B(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ B(r, {
						size: "sm",
						variant: "ghost",
						onClick: C,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${O}-done-action`,
						children: x
					})
				})
			]
		})]
	}) : j === "review" ? /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "review",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ V(a, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": _e ? q : void 0,
			"aria-describedby": ve,
			"aria-busy": N || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${O}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || N || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : le(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), ge()));
			},
			children: [
				J,
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${O}-message`,
					children: A
				}),
				/* @__PURE__ */ V(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(r, {
							size: "sm",
							variant: "primary",
							disabled: N,
							onClick: () => {
								ge();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${O}-confirm`,
							children: ee
						}),
						/* @__PURE__ */ B(r, {
							size: "sm",
							variant: "ghost",
							disabled: N,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${O}-back`,
							children: b
						}),
						/* @__PURE__ */ B(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
							className: "min-w-0",
							"data-testid": `${O}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				ae && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${O}-error`,
					children: ae
				}),
				N && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${O}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ B(o, {
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
	}) : /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "draft",
		"data-testid": O,
		children: [ye, /* @__PURE__ */ V(a, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), K();
			},
			"aria-labelledby": _e ? q : void 0,
			"data-testid": `${O}-draft`,
			children: [
				J,
				/* @__PURE__ */ B(c, {
					label: p,
					children: (e) => /* @__PURE__ */ B(l, {
						...e,
						ref: H,
						"aria-describedby": [e["aria-describedby"], ve].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							le(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || K()));
						},
						"data-testid": `${O}-editor`
					})
				}),
				/* @__PURE__ */ V(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(r, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !me,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${O}-continue`,
							children: y
						}),
						S && /* @__PURE__ */ B(r, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${O}-cancel`,
							children: b
						}),
						/* @__PURE__ */ B(o, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: ve,
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
var fe = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function H(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? fe : [];
}
function U(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function W(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function pe(e) {
	let t = H(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function me(e, t) {
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
function he(e, t) {
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
function ge(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function _e(e, t) {
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
	let l = W(n), u = c && !e.altKey && (!l || a);
	if (u && (e.key === "j" || e.key === "J")) return {
		type: "page",
		delta: 1
	};
	if (u && (e.key === "k" || e.key === "K")) return {
		type: "page",
		delta: -1
	};
	if (o || n.readOnlyReason) return null;
	let d = H(n);
	if (e.key === "Enter" && c && !a) {
		let e = pe(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (l ? !e.altKey : !c || e.altKey) return null;
	let f = J(e) ?? e.key.toLowerCase(), p = d.findIndex((e, t) => U(e, t) === f), m = p >= 0 ? d[p] : null;
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
	let t = e ?? ye, [n, r] = z(() => /* @__PURE__ */ new Set()), [i, a] = z(null), [o, s] = z(!1), [c, l] = z(null), [u, d] = z({}), [f, p] = z(null), [m, h] = z(be), g = R(m);
	g.current = m;
	let _ = se(() => K(t, n, m), [
		t,
		n,
		m
	]), v = q(_, i), y = v >= 0 ? _[v] : null, ee = c != null, b = R(!1), x = t.map((e) => e.id).join("\0");
	L(() => {
		let e = ge(t, g.current);
		r((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), h((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [x]);
	let te = _[0]?.id ?? null, S = R(/* @__PURE__ */ new Set());
	L(() => {
		let e = _.some((e) => !S.current.has(e.id));
		for (let e of _) S.current.add(e.id);
		e && s(!1);
	}, [te, _]);
	let C = I(async (e, t) => {
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
		})), r((t) => new Set(t).add(e.id)), a(null), !0) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : he(e, t)), !0);
	}, []), w = I(async (e) => {
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
	}, [y]), T = y ? _e(y.id, m) : null, E = I(() => {
		if (!y || T == null) return !1;
		let e = y.id;
		return h((e) => {
			let { [T]: t, ...n } = e;
			return n;
		}), r((t) => {
			let n = new Set(t);
			return n.delete(T), n.delete(e), n;
		}), a(T), !0;
	}, [y, T]), D = I(() => {
		y && (r((e) => new Set(e).add(y.id)), a(null));
	}, [y]), O = I(async (e) => {
		if (!y) return !1;
		let t = H(y).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : C(y, me(y, t));
	}, [y, C]), ne = I(async (e) => {
		if (!y || !W(y)) return !1;
		let t = G(y, e);
		return "error" in t ? (d((e) => ({
			...e,
			[y.id]: t.error
		})), !1) : C(y, t.answer);
	}, [y, C]), re = I((e) => {
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
		typed: !o && W(y),
		setCollapsed: s,
		page: re,
		pick: O,
		answerTyped: ne,
		answerCompose: w,
		isFollowUp: T != null,
		back: E,
		finish: D,
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
	return /* @__PURE__ */ B("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Te = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Ee({ deck: t, prompts: n, input: s = null, variant: c = "card", className: d, "data-testid": f = "composer-prompt-deck" }) {
	let p = c === "inset", m = Se(t ? null : n), h = t ?? m, g = R(null), _ = oe(), v = R(null), [y, ee] = z({
		id: "",
		text: ""
	}), { active: b, pending: x, index: te, collapsed: S, busy: C, error: w, receipt: T } = h, E = b?.inputDraft?.value ?? (y.id === b?.id ? y.text : ""), D = !s && h.typed && !b?.readOnlyReason, O = async () => {
		let e = b?.id;
		await h.answerTyped(E) && ee((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, ne = R({
		deck: h,
		input: s
	});
	if (ne.current = {
		deck: h,
		input: s
	}, L(() => {
		if (!b || S || b.readOnlyReason || b.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = ne.current.input;
			t && !g.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : v.current ? v.current.focus() : (g.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? g.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		b?.id,
		S,
		b?.kind,
		b?.readOnlyReason
	]), L(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = ne.current, r = e.target, i = !!g.current && !!r && g.current.contains(r), a = !!n && n.contains(r), o = !!r && v.current?.contains(r);
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
	let re = X(), k = x.length, A = T ? /* @__PURE__ */ V(i, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", p && !S && b && "px-3 pb-2"),
		"data-testid": `${f}-receipt`,
		children: [/* @__PURE__ */ B(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${T}`
		}), /* @__PURE__ */ B(r, {
			variant: "link",
			size: "sm",
			onClick: h.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!b || S) return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border px-3 py-1.5", d),
		"data-composer-prompt-deck": b ? "collapsed" : "answered",
		"data-deck-variant": c,
		"data-testid": f,
		ref: g,
		children: [b && /* @__PURE__ */ V(i, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !p && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ B(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: k === 1 ? `1 question waiting · ${b.title}` : `${k} questions waiting · ${b.title}`
				}),
				/* @__PURE__ */ B(r, {
					variant: "link",
					size: "sm",
					onClick: () => h.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${f}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ B(we, { children: `${re}↓` })
			]
		}), A]
	});
	let ie = H(b), j = W(b), M = b.kind === "compose" && !b.readOnlyReason, N = pe(b), P = `${_}-title`, ae = `${_}-question`, F = ie.map((e, t) => U(e, t)), I = [
		ie.length ? `${j ? "Alt+" : ""}${F.filter(Boolean).length > 1 ? `${F[0]}–${F[F.length - 1]}` : F[0] ?? ""} choose` : null,
		j ? "type an answer · Enter answer" : N ? `Enter ${N.label}` : null,
		k > 1 ? `${re}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border", d),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": s ? void 0 : b.kind,
		"data-deck-variant": c,
		"data-testid": f,
		ref: g,
		children: [/* @__PURE__ */ V("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": P,
			"aria-describedby": ae,
			"aria-busy": C || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", Te, !p && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": b.id,
			"data-composer-prompt-kind": b.kind,
			"data-testid": `${f}-card`,
			children: [
				b.path && !M && /* @__PURE__ */ B(u, {
					steps: b.path.steps,
					current: b.path.current,
					"data-testid": `${f}-path`
				}),
				/* @__PURE__ */ V(i, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ V(a, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [b.eyebrow && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: b.eyebrow
							}), /* @__PURE__ */ B(o, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: P,
								title: b.title,
								children: b.title
							})]
						}),
						k > 1 && /* @__PURE__ */ V(i, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ B(o, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${f}-position`,
									children: `${te + 1} of ${k}`
								}),
								/* @__PURE__ */ B(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => h.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${f}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ B(r, {
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
						/* @__PURE__ */ B(r, {
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
				k > 1 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${f}-progress`,
					children: x.map((t, n) => /* @__PURE__ */ B(a, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === te ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				b.fields && b.fields.length > 0 && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${f}-fields`,
					children: b.fields.map((t, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ B("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", Ce[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: ae,
					className: "min-w-0",
					children: b.question
				}),
				b.readOnlyReason ? /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${f}-read-only`,
					children: b.readOnlyReason
				}) : M ? /* @__PURE__ */ B(de, {
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
				}, b.id) : ie.length > 0 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: ie.map((e, t) => {
						let n = F[t], i = n ? `${j ? "Alt+" : ""}${n}` : void 0;
						return /* @__PURE__ */ V(a, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ V(r, {
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
								"data-default": N?.id === e.id || void 0,
								"data-testid": `${f}-option-${e.id}`,
								children: [i && /* @__PURE__ */ B(we, { children: i }), e.label]
							}), e.hint && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${_}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				D && /* @__PURE__ */ V(a, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ B(l, {
						ref: v,
						"aria-label": b.title,
						placeholder: b.placeholder ?? "Your answer",
						value: E,
						disabled: C,
						autoResize: !0,
						minRows: b.kind === "number" ? 1 : 2,
						inputMode: b.kind === "number" ? "decimal" : void 0,
						onChange: (e) => b.inputDraft ? b.inputDraft.onChange(e.target.value) : ee({
							id: b.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), C || O());
						},
						"data-testid": `${f}-answer`
					}), /* @__PURE__ */ B(r, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: C || !E.trim(),
						onClick: () => {
							O();
						},
						"data-testid": `${f}-submit`,
						children: "Answer"
					})]
				}),
				w && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${f}-error`,
					children: w
				}),
				C && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${f}-busy`,
					children: "Working…"
				}),
				!b.readOnlyReason && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${f}-keys`,
					children: I
				})
			]
		}), A]
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
	let i = R(new Ve()), a = R(t);
	a.current = t, L(() => () => i.current.rejectAll(Z), [t]);
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
	return I((e) => Promise.all(e.map(s)), [s]);
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
	return /* @__PURE__ */ V(i, {
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
			...a ? { "data-composer-readonly-allow": a } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => r(e.target.value)
		})]
	});
}
function Xe(e) {
	function t(t) {
		return /* @__PURE__ */ B(Ze, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Ze({ rm: r, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: ee, callBlock: b, reply: x, mode: S, onModeChange: C, defaultMode: w, draftKey: E, persistDraft: D = !0, claim: O = !1, answersFocus: ne = !1, onReveal: re, disabled: k, offModes: A, prompts: ie, composerRef: j, onDraftChange: M, defaultDraft: N, draft: P, above: F, modeRowEnd: oe, references: ce, onRemoveReference: le, modePlaceholders: ue, contextChip: de, sendWithReferencesOnly: fe, console: H, "data-testid": U = "conversation-composer", ...W }) {
	let pe = n() === "compact", me = f?.displayName || "You", G = E ?? s ?? `${l.kind}:${l.id}`, he = u.readOnlyReason || "You can read this conversation but not post to it.", K = se(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? he,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		he
	]), [ge, _e] = z(null), q = g === void 0 ? ge : g, ve = !!q && !K.some((e) => e.id === q), J = ve ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Ue
	} : Oe(K, q, h), ye = K.filter((e) => !e.disabled && !e.unavailableReason).length, be = K.length > 0, Y = Ke(De({
		capabilities: u,
		hasChat: be,
		choosable: ye,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), A), xe = w && Y.modes.includes(w) ? w : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Ce, we] = z(xe), X = S ?? Ce, Te = I((e) => {
		S === void 0 && we(e), C?.(e);
	}, [S, C]), Ae = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	L(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Te(e);
	}, [
		Ae,
		X,
		Te
	]);
	let [Fe, Ie] = z(!0), Z = l.reference ?? null;
	L(() => {
		Ie(!0);
	}, [Z?.id]);
	let ze = !!J && J.carriesReference !== !1, Ve = !!Z && !Z.page, Xe = !!J && J.channel !== s, Ze = !!Z && Fe && !(X === "chat" && (!ze || Ve && Xe)), Qe = X === "chat" && ze && Fe && !(Ve && Xe) ? Z : null, $e = R(0), et = P !== void 0, tt = f?.userId?.trim() || null, Q = tt ? JSON.stringify([
		"actor",
		tt,
		G
	]) : null, nt = D && !et ? JSON.stringify([
		"actor",
		tt,
		G
	]) : G, rt = JSON.stringify([
		G,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), it = R(rt);
	it.current !== rt && (it.current = rt, $e.current += 1);
	let at = R(P);
	at.current = P;
	let ot = se(() => {
		if (et || !D || !Q) return N;
		let e = Le(qe(), Q);
		return e ? {
			html: e,
			files: []
		} : N;
	}, [
		nt,
		et,
		D
	]), st = R(""), ct = I((e, t) => {
		$e.current += 1, st.current = e.html, D && !et && Q && Re(qe(), Q, e.html), c?.setTyping?.(je({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		})), M?.(e, t);
	}, [
		D,
		et,
		Q,
		c,
		X,
		J?.channel,
		s,
		M
	]);
	L(() => {
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
	let lt = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, ut = Je(r, lt, me), [dt, ft] = z(null), pt = t(), mt = R(null), ht = I((e) => {
		mt.current = e, Ge(j, e);
	}, [j]), gt = I(() => {
		re?.();
		let e = 20, t = () => {
			mt.current ? mt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [re]), $ = Se(ie), _t = !!$.active && !$.collapsed, vt = R(!1);
	L(() => {
		_t ? c?.setTyping?.(!1) : vt.current && gt(), vt.current = _t;
	}, [
		_t,
		c,
		gt
	]);
	let yt = se(() => ({
		isEmpty: () => !mt.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!mt.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: gt
	}), [gt]), bt = I((e) => {
		_e(e), v?.(e), $e.current += 1, ft(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, v]), xt = K.filter((e) => e.claim !== !1);
	T({
		channels: O ? ke(u.maySend || m === void 0 ? s : null, xt) : [],
		label: O ? O.label : "",
		replies: O ? !!O.replies : !1,
		enabled: !!O && O.enabled !== !1,
		focus: (e) => {
			let t = xt.find((t) => t.channel === e.channel);
			return Te("chat"), t && bt(t.id), gt(), !0;
		}
	});
	let St = I((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (Te("agent"), gt(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? K.find((e) => e.channel && e.channel === s) ?? (m ? K.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? xt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? K.find((e) => e.id === `person:${t.userId}`) ?? null : K.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && bt(n.id), Te("chat"), gt(), !0);
	}, [
		Y,
		Te,
		gt,
		J,
		K,
		m,
		xt,
		s,
		bt
	]);
	te(St, ne);
	let Ct = se(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), wt = se(() => Ct.map((e) => ({
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
			return t && D && !et && Q && Re(qe(), Q, ""), t;
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
		let r = e.text.trim(), i = !r && !e.files.length && !!fe && (!!Qe || (ce?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !lt) return !1;
		c?.setTyping?.(!1);
		let a = $e.current, o = it.current, l = e.files.length ? await ut(e.files) : [], d = !!J.channel && J.channel === s, f = Me({
			displayName: me,
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
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? $e.current !== a || at.current !== P ? (it.current === o && pt?.toast(He, { type: "success" }), !1) : (d && x?.clear(), D && !et && Q && Re(qe(), Q, ""), !0) : !1;
	}, Dt = !!u.pending, Ot = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), kt = Ot && !$.typed && !k && !p && !Dt, At = Ze && Z ? /* @__PURE__ */ B(d, {
		references: [{
			id: Z.id,
			label: pe ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...kt ? {} : { onRemove: () => {
			Ie(!1), $e.current += 1, le?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, jt = ve && J ? [...K, J] : K, Mt = X === "chat" && jt.length > 1, Nt = X === "chat" && Fe && Ve && Xe && ze, Pt = X === "chat" && jt.length > 1 && !Dt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Ft = X === "chat" ? J?.error ?? null : null, It = Mt || Pt || dt || Nt || Ft || F != null && F !== !1 ? /* @__PURE__ */ V(a, {
		gap: "xs",
		children: [
			F,
			(Mt || Pt) && /* @__PURE__ */ V(i, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Mt && /* @__PURE__ */ B(Ye, {
					id: `${G}-recipient`,
					value: J?.id ?? null,
					recipients: jt,
					onChange: bt,
					"data-testid": `${U}-recipient`,
					...kt ? ye > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Pt && /* @__PURE__ */ B(o, {
					size: "xs",
					tone: "tertiary",
					title: Pt,
					className: e("min-w-0", Mt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${U}-recipient-unavailable`,
					children: /* @__PURE__ */ B("span", {
						className: "truncate",
						children: Pt
					})
				})]
			}),
			Nt && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: We
			}),
			dt && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${U}-note`,
				children: dt
			}),
			Ft && /* @__PURE__ */ B(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${U}-recipient-error`,
				children: Ft
			})
		]
	}) : void 0, Lt = !pe, Rt = Lt && At || oe ? /* @__PURE__ */ V(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Lt ? At : null, oe]
	}) : void 0, zt = !Lt && Ze && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...ce ?? []] : ce, Bt = (e) => {
		Z && e === Z.id && (Ie(!1), $e.current += 1), le?.(e);
	}, Vt = {
		...ue,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : "Choose an answer above, or press its number" } : {}
	}, Ht = kt ? Pt ? ye > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? he : "Choose a destination.") : null;
	return /* @__PURE__ */ B(ae, {
		collapsible: !0,
		...W,
		collapsedLabel: W.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: ht,
		"data-testid": U,
		...pe ? { responsive: "pane" } : {},
		console: H ?? !!b,
		dock: b,
		mode: X,
		onModeChange: Te,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: be && !Y.reasons.chat,
		contextChip: de ?? (!Z && void 0),
		above: _t ? F : It,
		..._t ? { replacement: /* @__PURE__ */ B(Ee, {
			deck: $,
			"data-testid": `${U}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ B(Ee, {
			deck: $,
			input: yt,
			variant: "inset",
			"data-testid": `${U}-prompts`
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
		...fe === void 0 ? {} : { sendWithReferencesOnly: fe },
		...Ht ? { readOnly: Ht } : {},
		disabled: !!k || !$.typed && (!!p || Ot || X === "agent" && !u.agent?.allowed),
		draftKey: nt,
		...et ? { draft: P } : {},
		...ot === void 0 ? {} : { defaultDraft: ot },
		onDraftChange: ct,
		onSend: (e, t) => Et(e, t.mode),
		className: e(W.className)
	});
}
//#endregion
export { F as AgentComposerDock, N as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, ee as COMPOSER_CONTEXT_REASONS, A as COMPOSER_MODE_ORDER, fe as CONFIRM_OPTIONS, ie as CommandSuggestions, P as ComposerAttachments, de as ComposerConfirmFlow, Ee as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, ae as ContextComposer, D as ConversationInputProvider, ne as DocumentSuggestions, f as EMOJI_SHORTCODES, M as EmojiSuggestions, k as MentionSuggestions, j as RichChatComposer, C as ThreadInputHandoff, me as answerForOption, Be as attachmentOnlyText, g as composerCommandArgumentText, b as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, re as composerSizeFor, Xe as createConversationComposer, ve as deckKeyAction, pe as defaultOption, y as identityDisplayName, p as matchComposerCommand, O as matchesModeTrigger, G as parseTypedAnswer, H as promptOptions, m as searchEmoji, W as takesTypedAnswer, S as useComposerFocus, w as useComposerFocusReveal, Se as useComposerPromptDeck, Je as useConversationUploads, E as useThreadInput };
