import { t as e } from "../cn-D4QmbyEy.js";
import { r as t } from "../ToastProvider-D6jAeNNE.js";
import { c as n, n as r } from "../Button-C-I3BxWI.js";
import { c as i, l as a, n as o } from "../Text-BAAQrepu.js";
import { t as s } from "../Select-CpZyUWay.js";
import { t as c } from "../FormField-CQ27qxWt.js";
import { t as l } from "../Textarea-CvdLeuO_.js";
import { t as u } from "../DecisionPath-BC9qttuI.js";
import { a as d, c as f, i as p, l as m, n as ee, r as h, t as g } from "../composerSendError-BTSwRiUg.js";
import { a as _, i as v, n as y, r as b, t as x } from "../composerContext-BLn1-Nao.js";
import { a as te, i as S, n as C, o as w, r as T, s as E, t as D } from "../ConversationInputs-Du5oOgKC.js";
import { a as O, c as ne, i as re, l as k, n as A, o as ie, r as j, s as ae, t as M, u as N } from "../RichChatComposer-C0wm4sKU.js";
import { t as oe } from "../ContextComposer-CIZ8XU8p.js";
import { t as P } from "../AgentComposerDock-DJFJA7m-.js";
import { useCallback as F, useEffect as I, useId as se, useMemo as L, useRef as R, useState as z } from "react";
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
function de({ title: t, recipient: n, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: ee, note: h, doneTitle: g = "Done", doneMessage: _ = "Confirmed.", continueLabel: v = "Continue", confirmLabel: y = "Confirm", backLabel: b = "Back", doneActionLabel: x = "Back", onConfirm: te, onCancel: S, onDone: C, onStageChange: w, path: T, autoFocus: E = !0, className: D, "data-testid": O = "composer-confirm-flow" }) {
	let [ne, re] = z(s), k = d !== void 0, A = k ? d : ne, ie = F((e) => {
		k || re(e), f?.(e);
	}, [k, f]), [j, ae] = z("draft"), [M, N] = z(!1), [oe, P] = z(null), [L, de] = z(null), fe = R(!1), H = R(null), pe = R(null), U = R(null), W = se(), me = A.trim().length > 0, G = F((e) => {
		ae(e), w?.(e);
	}, [w]), he = R(!1);
	I(() => {
		let e = !he.current;
		he.current = !0, !(e && !E) && (j === "draft" ? H.current : j === "review" ? pe.current : U.current)?.focus({ preventScroll: !0 });
	}, [j, E]);
	let ge = F(() => {
		me && (P(null), G("review"));
	}, [me, G]), K = F(async () => {
		if (fe.current) return;
		fe.current = !0, N(!0), P(null);
		let e;
		try {
			e = await te(A);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			fe.current = !1, N(!1);
		}
		if (ce(e)) {
			P(e.error);
			return;
		}
		de(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		A,
		te,
		G
	]), _e = j === "review" ? ee ?? t : j === "done" ? g : t, ve = `${W}-heading`, q = `${W}-keys`, ye = _e || n ? /* @__PURE__ */ V(i, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [_e && /* @__PURE__ */ B(o, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: ve,
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
	}) : null, J = T ? /* @__PURE__ */ B(u, {
		steps: T.steps,
		current: T.current + ue[j],
		"data-testid": `${O}-path`
	}) : null;
	return j === "done" ? /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "done",
		"data-testid": O,
		children: [J, /* @__PURE__ */ V(a, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": _e ? ve : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${O}-done`,
			children: [
				ye,
				/* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${O}-done-message`,
					children: L ?? _
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
		children: [J, /* @__PURE__ */ V(a, {
			as: "section",
			gap: "xs",
			ref: pe,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": _e ? ve : void 0,
			"aria-describedby": q,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${O}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : le(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), K()));
			},
			children: [
				ye,
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
							disabled: M,
							onClick: () => {
								K();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${O}-confirm`,
							children: y
						}),
						/* @__PURE__ */ B(r, {
							size: "sm",
							variant: "ghost",
							disabled: M,
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
							id: q,
							className: "min-w-0",
							"data-testid": `${O}-keys`,
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
					"data-testid": `${O}-error`,
					children: oe
				}),
				M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${O}-busy`,
					children: "Working…"
				}),
				h && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${O}-note`,
					children: h
				})
			]
		})]
	}) : /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", D),
		"data-composer-confirm-flow": "draft",
		"data-testid": O,
		children: [J, /* @__PURE__ */ V(a, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), ge();
			},
			"aria-labelledby": _e ? ve : void 0,
			"data-testid": `${O}-draft`,
			children: [
				ye,
				/* @__PURE__ */ B(c, {
					label: p,
					children: (e) => /* @__PURE__ */ B(l, {
						...e,
						ref: H,
						"aria-describedby": [e["aria-describedby"], q].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: A,
						placeholder: m,
						onChange: (e) => ie(e.target.value),
						onKeyDown: (e) => {
							le(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || ge()));
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
							children: v
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
							id: q,
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
function pe(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function U(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function W(e) {
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
function ge(e, t, n = {}) {
	let r = [];
	for (let i of e) {
		let e = i, a = /* @__PURE__ */ new Set();
		for (; e && t.has(e.id) && !a.has(e.id);) a.add(e.id), e = n[e.id];
		e && !t.has(e.id) && r.push(e);
	}
	return r;
}
function K(e, t = {}) {
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
function ve(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function q(e, t) {
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
	let d = H(n);
	if (e.key === "Enter" && c && !a) {
		let e = W(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (l ? !e.altKey : !c || e.altKey) return null;
	let f = ye(e) ?? e.key.toLowerCase(), p = d.findIndex((e, t) => pe(e, t) === f), m = p >= 0 ? d[p] : null;
	return m && !m.disabledReason ? {
		type: "pick",
		optionId: m.id
	} : null;
}
function ye(e) {
	if (!e.altKey) return null;
	let t = e.code ? /^Digit([1-9])$/.exec(e.code) : null;
	return t ? t[1] : null;
}
//#endregion
//#region src/components/social/ComposerPromptDeck.tsx
var J = [], be = {};
function xe(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function Y(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function Se(e, t) {
	return t == null || e.every((e) => e.scope == null || e.scope === t) ? e : e.filter((e) => e.scope == null || e.scope === t);
}
function Ce(e, t = {}) {
	let n = t.scope, r = L(() => Se(e ?? J, n), [e, n]), [i, a] = z(() => /* @__PURE__ */ new Set()), [o, s] = z(null), [c, l] = z(!1), [u, d] = z(null), [f, p] = z({}), [m, ee] = z(null), [h, g] = z(be), _ = R(h);
	_.current = h;
	let v = R(n);
	I(() => {
		v.current !== n && (v.current = n, s(null), l(!1), ee(null), p({}));
	}, [n]);
	let y = L(() => ge(r, i, h), [
		r,
		i,
		h
	]), b = ve(y, o), x = b >= 0 ? y[b] : null, te = u != null, S = R(!1), C = r.map((e) => e.id).join("\0");
	I(() => {
		let e = K(r, _.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), g((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [C]);
	let w = y[0]?.id ?? null, T = R(/* @__PURE__ */ new Set());
	I(() => {
		let e = y.some((e) => !T.current.has(e.id));
		for (let e of y) T.current.add(e.id);
		e && l(!1);
	}, [w, y]);
	let E = F(async (e, t) => {
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
		return xe(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Y(n) ? (g((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), ee(n && "receipt" in n ? n.receipt : he(e, t)), !0);
	}, []), D = F(async (e) => {
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
		return xe(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [x]), O = x ? _e(x.id, h) : null, ne = F(() => {
		if (!x || O == null) return !1;
		let e = x.id;
		return g((e) => {
			let { [O]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(O), n.delete(e), n;
		}), s(O), !0;
	}, [x, O]), re = F(() => {
		x && (a((e) => new Set(e).add(x.id)), s(null));
	}, [x]), k = F(async (e) => {
		if (!x) return !1;
		let t = H(x).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : E(x, me(x, t));
	}, [x, E]), A = F(async (e) => {
		if (!x || !U(x)) return !1;
		let t = G(x, e);
		return "error" in t ? (p((e) => ({
			...e,
			[x.id]: t.error
		})), !1) : E(x, t.answer);
	}, [x, E]), ie = F((e) => {
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
		page: ie,
		pick: k,
		answerTyped: A,
		answerCompose: D,
		isFollowUp: O != null,
		back: ne,
		finish: re,
		dismissReceipt: () => ee(null)
	};
}
var we = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function Te({ children: e }) {
	return /* @__PURE__ */ B("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var Ee = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function De({ deck: t, prompts: n, scope: s, input: c = null, variant: d = "card", className: f, "data-testid": p = "composer-prompt-deck" }) {
	let m = d === "inset", ee = Ce(t ? null : n, { scope: s }), h = t ?? ee, g = R(null), _ = se(), v = R(null), [y, b] = z({
		id: "",
		text: ""
	}), { active: x, pending: te, index: S, collapsed: C, busy: w, error: T, receipt: E } = h, D = x?.inputDraft?.value ?? (y.id === x?.id ? y.text : ""), O = !c && h.typed && !x?.readOnlyReason, ne = async () => {
		let e = x?.id;
		await h.answerTyped(D) && b((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, re = R({
		deck: h,
		input: c
	});
	if (re.current = {
		deck: h,
		input: c
	}, I(() => {
		if (!x || C || x.readOnlyReason || x.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = re.current.input;
			t && !g.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : v.current ? v.current.focus() : (g.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? g.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		x?.id,
		C,
		x?.kind,
		x?.readOnlyReason
	]), I(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = re.current, r = e.target, i = !!g.current && !!r && g.current.contains(r), a = !!n && n.contains(r), o = !!r && v.current?.contains(r);
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
	let k = X(), A = te.length, ie = E ? /* @__PURE__ */ V(i, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", m && !C && x && "px-3 pb-2"),
		"data-testid": `${p}-receipt`,
		children: [/* @__PURE__ */ B(o, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${E}`
		}), /* @__PURE__ */ B(r, {
			variant: "link",
			size: "sm",
			onClick: h.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!x || C) return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", m && "border-b border-border px-3 py-1.5", f),
		"data-composer-prompt-deck": x ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-testid": p,
		ref: g,
		children: [x && /* @__PURE__ */ V(i, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !m && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ B(o, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: A === 1 ? `1 question waiting · ${x.title}` : `${A} questions waiting · ${x.title}`
				}),
				/* @__PURE__ */ B(r, {
					variant: "link",
					size: "sm",
					onClick: () => h.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${p}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ B(Te, { children: `${k}↓` })
			]
		}), ie]
	});
	let j = H(x), ae = U(x), M = x.kind === "compose" && !x.readOnlyReason, N = W(x), oe = `${_}-title`, P = `${_}-question`, F = j.map((e, t) => pe(e, t)), L = [
		j.length ? `${ae ? "Alt+" : ""}${F.filter(Boolean).length > 1 ? `${F[0]}–${F[F.length - 1]}` : F[0] ?? ""} choose` : null,
		ae ? "type an answer · Enter answer" : N ? `Enter ${N.label}` : null,
		A > 1 ? `${k}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", m && "border-b border-border", f),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : x.kind,
		"data-deck-variant": d,
		"data-testid": p,
		ref: g,
		children: [/* @__PURE__ */ V("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": oe,
			"aria-describedby": P,
			"aria-busy": w || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ee, !m && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": x.id,
			"data-composer-prompt-kind": x.kind,
			"data-testid": `${p}-card`,
			children: [
				x.path && !M && /* @__PURE__ */ B(u, {
					steps: x.path.steps,
					current: x.path.current,
					"data-testid": `${p}-path`
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
							children: [x.eyebrow && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: x.eyebrow
							}), /* @__PURE__ */ B(o, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: oe,
								title: x.title,
								children: x.title
							})]
						}),
						A > 1 && /* @__PURE__ */ V(i, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ B(o, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${p}-position`,
									children: `${S + 1} of ${A}`
								}),
								/* @__PURE__ */ B(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => h.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${p}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ B(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => h.page(1),
									"data-composer-readonly-allow": "Reads the next prompt without changing a record or submitting an answer",
									"data-testid": `${p}-next`,
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
								h.setCollapsed(!0), c?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${p}-hide`,
							children: "Hide"
						})
					]
				}),
				A > 1 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${p}-progress`,
					children: te.map((t, n) => /* @__PURE__ */ B(a, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === S ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				x.fields && x.fields.length > 0 && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${p}-fields`,
					children: x.fields.map((t, n) => /* @__PURE__ */ V("div", {
						className: "flex min-w-0 max-w-full flex-col",
						children: [/* @__PURE__ */ B("dt", {
							className: "m-0 text-xs font-normal text-text-tertiary",
							children: t.label
						}), /* @__PURE__ */ B("dd", {
							className: e("m-0 min-w-0 break-words text-xs font-normal", we[t.tone ?? "neutral"], t.mono && "tabular-nums"),
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
					id: P,
					className: "min-w-0",
					children: x.question
				}),
				x.readOnlyReason ? /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${p}-read-only`,
					children: x.readOnlyReason
				}) : M ? /* @__PURE__ */ B(de, {
					recipient: x.compose?.recipient,
					defaultMessage: x.compose?.initialMessage,
					messageLabel: x.compose?.messageLabel,
					placeholder: x.compose?.placeholder,
					reviewTitle: x.compose?.reviewTitle,
					note: x.compose?.note,
					doneTitle: x.compose?.doneTitle,
					doneMessage: x.compose?.doneMessage,
					continueLabel: x.compose?.continueLabel,
					confirmLabel: x.compose?.confirmLabel,
					backLabel: x.compose?.backLabel,
					doneActionLabel: x.compose?.doneActionLabel,
					path: x.path,
					onConfirm: (e) => h.answerCompose(e),
					onCancel: h.isFollowUp ? () => {
						h.back();
					} : x.compose?.onCancel ? () => {
						x.compose?.onCancel?.(), h.finish();
					} : void 0,
					onDone: () => {
						h.finish(), c?.focus();
					},
					"data-testid": `${p}-compose`
				}, x.id) : j.length > 0 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: j.map((e, t) => {
						let n = F[t], i = n ? `${ae ? "Alt+" : ""}${n}` : void 0;
						return /* @__PURE__ */ V(a, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ V(r, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: w || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": i,
								"aria-describedby": e.hint ? `${_}-hint-${t}` : void 0,
								onClick: () => {
									h.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": N?.id === e.id || void 0,
								"data-testid": `${p}-option-${e.id}`,
								children: [i && /* @__PURE__ */ B(Te, { children: i }), e.label]
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
				O && /* @__PURE__ */ V(a, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ B(l, {
						ref: v,
						"aria-label": x.title,
						placeholder: x.placeholder ?? "Your answer",
						value: D,
						disabled: w,
						autoResize: !0,
						minRows: x.kind === "number" ? 1 : 2,
						inputMode: x.kind === "number" ? "decimal" : void 0,
						onChange: (e) => x.inputDraft ? x.inputDraft.onChange(e.target.value) : b({
							id: x.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), w || ne());
						},
						"data-testid": `${p}-answer`
					}), /* @__PURE__ */ B(r, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: w || !D.trim(),
						onClick: () => {
							ne();
						},
						"data-testid": `${p}-submit`,
						children: "Answer"
					})]
				}),
				T && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${p}-error`,
					children: T
				}),
				w && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${p}-busy`,
					children: "Working…"
				}),
				!x.readOnlyReason && !M && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${p}-keys`,
					children: L
				})
			]
		}), ie]
	});
}
function Oe(e) {
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
function ke(e, t, n) {
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
function Ae(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function je(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Me(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && je(e.html).length > 0;
}
function Ne(e) {
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
function Pe(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Fe(e, t) {
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
var Ie = "ui.conversation-draft:";
function Le(e) {
	return `${Ie}${e}`;
}
function Re(e, t) {
	try {
		let n = e?.getItem(Le(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && je(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function ze(e, t, n) {
	try {
		je(n) ? e?.setItem(Le(t), JSON.stringify({ html: n })) : e?.removeItem(Le(t));
	} catch {}
}
var Z = "Conversation changed; draft retained.";
function Be(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Ve(e) {
	return e.map((e) => e.name).join(", ");
}
var He = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Be(`timed out (${n})`)));
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
}, Ue = "Message sent. Your current draft has been kept.", We = "This destination is no longer available. Choose a current destination.", Ge = "This view has no page to attach.";
function Ke(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function qe(e, t) {
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
function Je() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Ye(e, t, n, r = 6e4) {
	let i = R(new He()), a = R(t);
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
		if (!t) throw new g("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new g(Be(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Z);
		if (n.status === "failed") throw new g(Be(n.error));
		if (!n.transferId) throw new g(Be(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new g(e instanceof Error ? e.message : Be(void 0));
		}
	}, [o, r]);
	return F((e) => Promise.all(e.map(s)), [s]);
}
function Xe({ id: e, value: t, recipients: n, onChange: r, readOnlyWayOut: a, disabled: c, "data-testid": l }) {
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
function Ze(e) {
	function t(t) {
		return /* @__PURE__ */ B(Qe, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Qe({ rm: r, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: ee, recipient: h, onRecipientChange: _, commands: v = [], onAgent: y, callBlock: b, reply: x, mode: S, onModeChange: C, defaultMode: w, draftKey: E, persistDraft: D = !0, claim: O = !1, answersFocus: ne = !1, onReveal: re, disabled: k, offModes: A, prompts: ie, promptScope: j, composerRef: ae, onDraftChange: M, defaultDraft: N, draft: P, above: se, modeRowEnd: ce, references: le, onRemoveReference: ue, modePlaceholders: de, contextChip: fe, sendWithReferencesOnly: H, console: pe, "data-testid": U = "conversation-composer", ...W }) {
	let me = n() === "compact", G = f?.displayName || "You", he = E ?? s ?? `${l.kind}:${l.id}`, ge = u.readOnlyReason || "You can read this conversation but not post to it.", K = L(() => {
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
	]), [_e, ve] = z(null), q = h === void 0 ? _e : h, ye = !!q && !K.some((e) => e.id === q), J = ye ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: We
	} : ke(K, q, ee), be = K.filter((e) => !e.disabled && !e.unavailableReason).length, xe = K.length > 0, Y = qe(Oe({
		capabilities: u,
		hasChat: xe,
		choosable: be,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), A), Se = w && Y.modes.includes(w) ? w : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [we, Te] = z(Se), X = S ?? we, Ee = F((e) => {
		S === void 0 && Te(e), C?.(e);
	}, [S, C]), je = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	I(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && Ee(e);
	}, [
		je,
		X,
		Ee
	]);
	let [Ie, Le] = z(!0), Z = l.reference ?? null;
	I(() => {
		Le(!0);
	}, [Z?.id]);
	let Be = !!J && J.carriesReference !== !1, He = !!Z && !Z.page, Ze = !!J && J.channel !== s, Qe = !!Z && Ie && !(X === "chat" && (!Be || He && Ze)), $e = X === "chat" && Be && Ie && !(He && Ze) ? Z : null, et = R(0), tt = P !== void 0, nt = f?.userId?.trim() || null, Q = nt ? JSON.stringify([
		"actor",
		nt,
		he
	]) : null, rt = D && !tt ? JSON.stringify([
		"actor",
		nt,
		he
	]) : he, it = JSON.stringify([
		he,
		s ?? null,
		f?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), at = R(it);
	at.current !== it && (at.current = it, et.current += 1);
	let ot = R(P);
	ot.current = P;
	let st = L(() => {
		if (tt || !D || !Q) return N;
		let e = Re(Je(), Q);
		return e ? {
			html: e,
			files: []
		} : N;
	}, [
		rt,
		tt,
		D
	]), ct = R(""), lt = F((e, t) => {
		et.current += 1, ct.current = e.html, D && !tt && Q && ze(Je(), Q, e.html), c?.setTyping?.(Me({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		})), M?.(e, t);
	}, [
		D,
		tt,
		Q,
		c,
		X,
		J?.channel,
		s,
		M
	]);
	I(() => {
		Me({
			html: ct.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		s
	]);
	let ut = X === "chat" && u.mayAttach && J?.attachments && J.channel ? J.channel : null, dt = Ye(r, ut, G), [ft, pt] = z(null), mt = t(), ht = R(null), gt = F((e) => {
		ht.current = e, Ke(ae, e);
	}, [ae]), _t = F(() => {
		re?.();
		let e = 20, t = () => {
			ht.current ? ht.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [re]), $ = Ce(ie, { scope: j }), vt = !!$.active && !$.collapsed, yt = R(!1);
	I(() => {
		vt ? c?.setTyping?.(!1) : yt.current && _t(), yt.current = vt;
	}, [
		vt,
		c,
		_t
	]);
	let bt = L(() => ({
		isEmpty: () => !ht.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!ht.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: _t
	}), [_t]), xt = F((e) => {
		ve(e), _?.(e), et.current += 1, pt(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, _]), St = K.filter((e) => e.claim !== !1);
	T({
		channels: O ? Ae(u.maySend || m === void 0 ? s : null, St) : [],
		label: O ? O.label : "",
		replies: O ? !!O.replies : !1,
		enabled: !!O && O.enabled !== !1,
		focus: (e) => {
			let t = St.find((t) => t.channel === e.channel);
			return Ee("chat"), t && xt(t.id), _t(), !0;
		}
	});
	let Ct = F((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (Ee("agent"), _t(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? K.find((e) => e.channel && e.channel === s) ?? (m ? K.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? St.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? K.find((e) => e.id === `person:${t.userId}`) ?? null : K.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && xt(n.id), Ee("chat"), _t(), !0);
	}, [
		Y,
		Ee,
		_t,
		J,
		K,
		m,
		St,
		s,
		xt
	]);
	te(Ct, ne);
	let wt = L(() => v.filter((e) => !e.modes || e.modes.includes(X)), [v, X]), Tt = L(() => wt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [wt]), Et = (e) => {
		if (typeof e == "string") throw new g(e);
		return e !== !1;
	}, Dt = async (e, t) => {
		if (pt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && D && !tt && Q && ze(Je(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: $e ?? (Ie ? Z : null),
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
			let r = v.filter((e) => !e.modes || e.modes.includes("agent")), i = Pe(t), a = Fe(t, r) ?? (i === t ? null : Fe(i, r));
			if (a) {
				let e = Fe(t, [a.command]) ? t : i;
				return !a.command.disabled && Et(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (y) return Et(await y(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Et(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Fe(e.text, v.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Et(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!H && (!!$e || (le?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ut) return !1;
		c?.setTyping?.(!1);
		let a = et.current, o = at.current, l = e.files.length ? await dt(e.files) : [], d = !!J.channel && J.channel === s, f = Ne({
			displayName: G,
			reply: d ? x?.reply ?? null : null,
			reference: $e,
			attachments: l
		}), m = r || Ve(l), ee = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: $e
		}, h;
		return J.send ? h = await J.send(ee) : c ? (c.sendMessage(m, f), h = !0) : h = !1, h ? et.current !== a || ot.current !== P ? (at.current === o && mt?.toast(Ue, { type: "success" }), !1) : (d && x?.clear(), D && !tt && Q && ze(Je(), Q, ""), !0) : !1;
	}, Ot = !!u.pending, kt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), At = kt && !$.typed && !k && !p && !Ot, jt = Qe && Z ? /* @__PURE__ */ B(d, {
		references: [{
			id: Z.id,
			label: me ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...At ? {} : { onRemove: () => {
			Le(!1), et.current += 1, ue?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, Mt = ye && J ? [...K, J] : K, Nt = X === "chat" && Mt.length > 1, Pt = X === "chat" && Ie && He && Ze && Be, Ft = X === "chat" && Mt.length > 1 && !Ot ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, It = X === "chat" ? J?.error ?? null : null, Lt = Nt || Ft || ft || Pt || It || se != null && se !== !1 ? /* @__PURE__ */ V(a, {
		gap: "xs",
		children: [
			se,
			(Nt || Ft) && /* @__PURE__ */ V(i, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [Nt && /* @__PURE__ */ B(Xe, {
					id: `${he}-recipient`,
					value: J?.id ?? null,
					recipients: Mt,
					onChange: xt,
					"data-testid": `${U}-recipient`,
					...At ? be > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Ft && /* @__PURE__ */ B(o, {
					size: "xs",
					tone: "tertiary",
					title: Ft,
					className: e("min-w-0", Nt && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${U}-recipient-unavailable`,
					children: /* @__PURE__ */ B("span", {
						className: "truncate",
						children: Ft
					})
				})]
			}),
			Pt && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ge
			}),
			ft && /* @__PURE__ */ B(o, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${U}-note`,
				children: ft
			}),
			It && /* @__PURE__ */ B(o, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${U}-recipient-error`,
				children: It
			})
		]
	}) : void 0, Rt = !me, zt = Rt && jt || ce ? /* @__PURE__ */ V(i, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Rt ? jt : null, ce]
	}) : void 0, Bt = !Rt && Qe && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...le ?? []] : le, Vt = (e) => {
		Z && e === Z.id && (Le(!1), et.current += 1), ue?.(e);
	}, Ht = {
		...de,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : "Choose an answer above, or press its number" } : {}
	}, Ut = At ? Ft ? be > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? ge : "Choose a destination.") : null;
	return /* @__PURE__ */ B(oe, {
		collapsible: !0,
		...W,
		collapsedLabel: W.collapsedLabel ?? (X === "chat" ? J?.label : l.reference?.label ?? l.title),
		context: l,
		composerRef: gt,
		"data-testid": U,
		...me ? { responsive: "pane" } : {},
		console: pe ?? !!b,
		dock: b,
		mode: X,
		onModeChange: Ee,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: xe && !Y.reasons.chat,
		contextChip: fe ?? (!Z && void 0),
		above: vt ? se : Lt,
		...vt ? { replacement: /* @__PURE__ */ B(De, {
			deck: $,
			"data-testid": `${U}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ B(De, {
			deck: $,
			input: bt,
			variant: "inset",
			"data-testid": `${U}-prompts`
		}) } : {},
		...zt ? { modeRowEnd: zt } : {},
		...Bt ? {
			references: Bt,
			onRemoveReference: Vt
		} : {},
		modePlaceholders: Ht,
		commands: Tt,
		reply: X === "chat" && x?.reply && J?.channel === s ? {
			author: x.reply.author,
			quote: x.reply.text,
			messageId: x.reply.messageId,
			...x.reply.timestamp ? { timestamp: x.reply.timestamp } : {},
			onDismiss: x.clear
		} : null,
		allowAttachments: !!ut,
		...H === void 0 ? {} : { sendWithReferencesOnly: H },
		...Ut ? { readOnly: Ut } : {},
		disabled: !!k || !$.typed && (!!p || kt || X === "agent" && !u.agent?.allowed),
		draftKey: rt,
		...tt ? { draft: P } : {},
		...st === void 0 ? {} : { defaultDraft: st },
		onDraftChange: lt,
		onSend: (e, t) => Dt(e, t.mode),
		className: e(W.className)
	});
}
//#endregion
export { P as AgentComposerDock, M as COMPOSER_BREAKPOINTS, x as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, A as COMPOSER_MODE_ORDER, fe as CONFIRM_OPTIONS, ie as CommandSuggestions, N as ComposerAttachments, de as ComposerConfirmFlow, De as ComposerPromptDeck, d as ComposerReferences, g as ComposerSendError, oe as ContextComposer, D as ConversationInputProvider, ne as DocumentSuggestions, f as EMOJI_SHORTCODES, ae as EmojiSuggestions, k as MentionSuggestions, j as RichChatComposer, C as ThreadInputHandoff, me as answerForOption, Ve as attachmentOnlyText, h as composerCommandArgumentText, b as composerContextPreset, _ as composerDraftOf, ee as composerSendErrorReason, re as composerSizeFor, Ze as createConversationComposer, q as deckKeyAction, W as defaultOption, v as identityDisplayName, p as matchComposerCommand, O as matchesModeTrigger, G as parseTypedAnswer, H as promptOptions, Se as promptsInScope, m as searchEmoji, U as takesTypedAnswer, S as useComposerFocus, w as useComposerFocusReveal, Ce as useComposerPromptDeck, Ye as useConversationUploads, E as useThreadInput };
