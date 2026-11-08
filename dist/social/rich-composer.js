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
import { a as ee, i as C, n as w, o as T, r as te, s as E, t as D } from "../ConversationInputs-Du5oOgKC.js";
import { a as O, c as ne, i as k, l as A, n as j, o as re, r as M, s as ie, t as N, u as ae } from "../RichChatComposer-DxTvhhb2.js";
import { t as oe } from "../ContextComposer-D1Fc4zJd.js";
import { t as P } from "../AgentComposerDock-CltjTfG1.js";
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
function de({ title: t, recipient: n, defaultMessage: s = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: b = "Confirm", backLabel: x = "Back", doneActionLabel: S = "Back", onConfirm: ee, onCancel: C, onDone: w, onStageChange: T, path: te, autoFocus: E = !0, className: D, "data-testid": O = "composer-confirm-flow" }) {
	let [ne, k] = z(s), A = d !== void 0, j = A ? d : ne, re = F((e) => {
		A || k(e), f?.(e);
	}, [A, f]), [M, ie] = z("draft"), [N, ae] = z(!1), [oe, P] = z(null), [L, de] = z(null), fe = R(!1), H = R(null), pe = R(null), U = R(null), W = se(), me = j.trim().length > 0, G = F((e) => {
		ie(e), T?.(e);
	}, [T]), he = R(!1);
	I(() => {
		let e = !he.current;
		he.current = !0, !(e && !E) && (M === "draft" ? H.current : M === "review" ? pe.current : U.current)?.focus({ preventScroll: !0 });
	}, [M, E]);
	let ge = F(() => {
		me && (P(null), G("review"));
	}, [me, G]), K = F(async () => {
		if (fe.current) return;
		fe.current = !0, ae(!0), P(null);
		let e;
		try {
			e = await ee(j);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			fe.current = !1, ae(!1);
		}
		if (ce(e)) {
			P(e.error);
			return;
		}
		de(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		j,
		ee,
		G
	]), _e = M === "review" ? h ?? t : M === "done" ? _ : t, ve = `${W}-heading`, q = `${W}-keys`, ye = _e || n ? /* @__PURE__ */ V(i, {
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
	}) : null, J = te ? /* @__PURE__ */ B(u, {
		steps: te.steps,
		current: te.current + ue[M],
		"data-testid": `${O}-path`
	}) : null;
	return M === "done" ? /* @__PURE__ */ V(a, {
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
					children: L ?? v
				}),
				w && /* @__PURE__ */ B(i, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ B(r, {
						size: "sm",
						variant: "ghost",
						onClick: w,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${O}-done-action`,
						children: S
					})
				})
			]
		})]
	}) : M === "review" ? /* @__PURE__ */ V(a, {
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
			"aria-busy": N || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${O}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || N || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : le(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), K()));
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
					children: j
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
								K();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${O}-confirm`,
							children: b
						}),
						/* @__PURE__ */ B(r, {
							size: "sm",
							variant: "ghost",
							disabled: N,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${O}-back`,
							children: x
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
						value: j,
						placeholder: m,
						onChange: (e) => re(e.target.value),
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
							children: y
						}),
						C && /* @__PURE__ */ B(r, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: C,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${O}-cancel`,
							children: x
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
	let u = U(n), d = l && !e.altKey && (!u || a);
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
		let e = W(n);
		return e ? {
			type: "default",
			optionId: e.id
		} : null;
	}
	if (u ? !e.altKey : !l || e.altKey) return null;
	let p = ye(e) ?? e.key.toLowerCase(), m = f.findIndex((e, t) => pe(e, t) === p), h = m >= 0 ? f[m] : null;
	return h && !h.disabledReason ? {
		type: "pick",
		optionId: h.id
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
	let n = t.scope, r = L(() => Se(e ?? J, n), [e, n]), [i, a] = z(() => /* @__PURE__ */ new Set()), [o, s] = z(null), [c, l] = z(!1), [u, d] = z(null), [f, p] = z({}), [m, h] = z(null), [g, _] = z(be), v = R(g);
	v.current = g;
	let y = R(n);
	I(() => {
		y.current !== n && (y.current = n, s(null), l(!1), h(null), p({}));
	}, [n]);
	let b = L(() => ge(r, i, g), [
		r,
		i,
		g
	]), x = ve(b, o), S = x >= 0 ? b[x] : null, ee = u != null, C = R(!1), w = r.map((e) => e.id).join("\0");
	I(() => {
		let e = K(r, v.current);
		a((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), _((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [w]);
	let T = b[0]?.id ?? null, te = R(/* @__PURE__ */ new Set());
	I(() => {
		let e = b.some((e) => !te.current.has(e.id));
		for (let e of b) te.current.add(e.id);
		e && l(!1);
	}, [T, b]);
	let E = F(async (e, t) => {
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
		return xe(n) ? (p((t) => ({
			...t,
			[e.id]: n.error
		})), !1) : Y(n) ? (_((t) => ({
			...t,
			[e.id]: n.next
		})), a((t) => new Set(t).add(e.id)), s(null), !0) : (a((t) => new Set(t).add(e.id)), s(null), h(n && "receipt" in n ? n.receipt : he(e, t)), !0);
	}, []), D = F(async (e) => {
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
		return xe(n) ? n : n && "receipt" in n ? { receipt: n.receipt } : void 0;
	}, [S]), O = S ? _e(S.id, g) : null, ne = F(() => {
		if (!S || O == null) return !1;
		let e = S.id;
		return _((e) => {
			let { [O]: t, ...n } = e;
			return n;
		}), a((t) => {
			let n = new Set(t);
			return n.delete(O), n.delete(e), n;
		}), s(O), !0;
	}, [S, O]), k = S?.back, A = k ? {
		label: k.label || "Back",
		...k.disabledReason ? { disabledReason: k.disabledReason } : {}
	} : O != null && S?.kind !== "compose" ? { label: "Back" } : null, j = F(async () => {
		if (!S) return !1;
		let e = S.back;
		if (!e) return S.kind !== "compose" && ne();
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
	}, [S, ne]), re = F(() => {
		S && (a((e) => new Set(e).add(S.id)), s(null));
	}, [S]), M = F(async (e) => {
		if (!S) return !1;
		let t = H(S).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : E(S, me(S, t));
	}, [S, E]), ie = F(async (e) => {
		if (!S || !U(S)) return !1;
		let t = G(S, e);
		return "error" in t ? (p((e) => ({
			...e,
			[S.id]: t.error
		})), !1) : E(S, t.answer);
	}, [S, E]), N = F((e) => {
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
		typed: !c && U(S),
		setCollapsed: l,
		page: N,
		pick: M,
		answerTyped: ie,
		answerCompose: D,
		isFollowUp: O != null,
		back: ne,
		backControl: A,
		goBack: j,
		finish: re,
		dismissReceipt: () => h(null)
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
	let m = d === "inset", h = Ce(t ? null : n, { scope: s }), g = t ?? h, _ = R(null), v = se(), y = R(null), [b, x] = z({
		id: "",
		text: ""
	}), { active: S, pending: ee, index: C, collapsed: w, busy: T, error: te, receipt: E } = g, D = S?.inputDraft?.value ?? (b.id === S?.id ? b.text : ""), O = !c && g.typed && !S?.readOnlyReason, ne = async () => {
		let e = S?.id;
		await g.answerTyped(D) && x((t) => t.id === e ? {
			id: "",
			text: ""
		} : t);
	}, k = R({
		deck: g,
		input: c
	});
	if (k.current = {
		deck: g,
		input: c
	}, I(() => {
		if (!S || w || S.readOnlyReason || S.kind === "compose") return;
		let e = requestAnimationFrame(() => {
			let e = document.activeElement, t = e?.closest("input,textarea,select,[contenteditable=\"true\"]"), n = k.current.input;
			t && !_.current?.contains(e) && !n?.contains(e) || (n ? n.focus() : y.current ? y.current.focus() : (_.current?.querySelector("[data-default=\"true\"]:not(:disabled)") ?? _.current?.querySelector("[data-composer-prompt-option]:not(:disabled)"))?.focus());
		});
		return () => cancelAnimationFrame(e);
	}, [
		S?.id,
		w,
		S?.kind,
		S?.readOnlyReason
	]), I(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = k.current, r = e.target, i = !!_.current && !!r && _.current.contains(r), a = !!n && n.contains(r), o = !!r && y.current?.contains(r);
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
				inputEmpty: n ? n.isEmpty() : !y.current?.value.trim(),
				inDeck: i && !o,
				busy: t.busy,
				canBack: !!t.backControl && !t.backControl.disabledReason
			});
			s && (e.preventDefault(), e.stopPropagation(), s.type === "page" ? t.page(s.delta) : s.type === "back" ? t.goBack() : s.type === "collapse" ? (t.setCollapsed(!0), n?.focus()) : s.type === "expand" ? t.setCollapsed(!1) : t.pick(s.optionId).then((e) => {
				e && n?.focus();
			}));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}, []), !g.visible) return null;
	let A = X(), j = ee.length, re = E ? /* @__PURE__ */ V(i, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", m && !w && S && "px-3 pb-2"),
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
			onClick: g.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!S || w) return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", m && "border-b border-border px-3 py-1.5", f),
		"data-composer-prompt-deck": S ? "collapsed" : "answered",
		"data-deck-variant": d,
		"data-testid": p,
		ref: _,
		children: [S && /* @__PURE__ */ V(i, {
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
					children: j === 1 ? `1 question waiting · ${S.title}` : `${j} questions waiting · ${S.title}`
				}),
				/* @__PURE__ */ B(r, {
					variant: "link",
					size: "sm",
					onClick: () => g.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${p}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ B(Te, { children: `${A}↓` })
			]
		}), re]
	});
	let M = H(S), ie = U(S), N = S.kind === "compose" && !S.readOnlyReason, ae = W(S), oe = `${v}-title`, P = `${v}-question`, F = M.map((e, t) => pe(e, t)), L = [
		M.length ? `${ie ? "Alt+" : ""}${F.filter(Boolean).length > 1 ? `${F[0]}–${F[F.length - 1]}` : F[0] ?? ""} choose` : null,
		ie ? "type an answer · Enter answer" : ae ? `Enter ${ae.label}` : null,
		j > 1 ? `${A}↓ next` : null,
		g.backControl && !g.backControl.disabledReason ? `Alt+⌫ ${g.backControl.label}` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V(a, {
		gap: "xs",
		className: e("min-w-0", m && "border-b border-border", f),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": c ? void 0 : S.kind,
		"data-deck-variant": d,
		"data-testid": p,
		ref: _,
		children: [/* @__PURE__ */ V("section", {
			"data-ui-part": "",
			role: "group",
			"aria-labelledby": oe,
			"aria-describedby": P,
			"aria-busy": T || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", Ee, !m && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": S.id,
			"data-composer-prompt-kind": S.kind,
			"data-testid": `${p}-card`,
			children: [
				S.path && !N && /* @__PURE__ */ B(u, {
					steps: S.path.steps,
					current: S.path.current,
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
							children: [S.eyebrow && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: S.eyebrow
							}), /* @__PURE__ */ B(o, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: oe,
								title: S.title,
								children: S.title
							})]
						}),
						g.backControl && /* @__PURE__ */ B(r, {
							variant: "ghost",
							size: "sm",
							className: "shrink-0",
							"aria-keyshortcuts": "Alt+Backspace",
							disabled: T || !!g.backControl.disabledReason,
							title: g.backControl.disabledReason,
							onClick: () => {
								g.goBack();
							},
							"data-composer-prompt-back": "",
							"data-composer-readonly-allow": "Returns to the previous step without submitting an answer",
							"data-testid": `${p}-back`,
							children: g.backControl.label
						}),
						j > 1 && /* @__PURE__ */ V(i, {
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
									children: `${C + 1} of ${j}`
								}),
								/* @__PURE__ */ B(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => g.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${p}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ B(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Next question",
									"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
									onClick: () => g.page(1),
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
								g.setCollapsed(!0), c?.focus();
							},
							"data-composer-readonly-allow": "Hides the prompt's existing facts without changing a record or submitting an answer",
							"data-testid": `${p}-hide`,
							children: "Hide"
						})
					]
				}),
				j > 1 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${p}-progress`,
					children: ee.map((t, n) => /* @__PURE__ */ B(a, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === C ? "bg-primary" : "bg-border")
					}, t.id))
				}),
				S.fields && S.fields.length > 0 && /* @__PURE__ */ B("dl", {
					className: "m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5",
					"data-testid": `${p}-fields`,
					children: S.fields.map((t, n) => /* @__PURE__ */ V("div", {
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
					children: S.question
				}),
				S.readOnlyReason ? /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${p}-read-only`,
					children: S.readOnlyReason
				}) : N ? /* @__PURE__ */ B(de, {
					recipient: S.compose?.recipient,
					defaultMessage: S.compose?.initialMessage,
					messageLabel: S.compose?.messageLabel,
					placeholder: S.compose?.placeholder,
					reviewTitle: S.compose?.reviewTitle,
					note: S.compose?.note,
					doneTitle: S.compose?.doneTitle,
					doneMessage: S.compose?.doneMessage,
					continueLabel: S.compose?.continueLabel,
					confirmLabel: S.compose?.confirmLabel,
					backLabel: S.compose?.backLabel,
					doneActionLabel: S.compose?.doneActionLabel,
					path: S.path,
					onConfirm: (e) => g.answerCompose(e),
					onCancel: g.isFollowUp ? () => {
						g.back();
					} : S.compose?.onCancel ? () => {
						S.compose?.onCancel?.(), g.finish();
					} : void 0,
					onDone: () => {
						g.finish(), c?.focus();
					},
					"data-testid": `${p}-compose`
				}, S.id) : M.length > 0 && /* @__PURE__ */ B(i, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: M.map((e, t) => {
						let n = F[t], i = n ? `${ie ? "Alt+" : ""}${n}` : void 0;
						return /* @__PURE__ */ V(a, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ V(r, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: T || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": i,
								"aria-describedby": e.hint ? `${v}-hint-${t}` : void 0,
								onClick: () => {
									g.pick(e.id).then((e) => {
										e && c?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": ae?.id === e.id || void 0,
								"data-testid": `${p}-option-${e.id}`,
								children: [i && /* @__PURE__ */ B(Te, { children: i }), e.label]
							}), e.hint && /* @__PURE__ */ B(o, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${v}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				O && /* @__PURE__ */ V(a, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ B(l, {
						ref: y,
						"aria-label": S.title,
						placeholder: S.placeholder ?? "Your answer",
						value: D,
						disabled: T,
						autoResize: !0,
						minRows: S.kind === "number" ? 1 : 2,
						inputMode: S.kind === "number" ? "decimal" : void 0,
						onChange: (e) => S.inputDraft ? S.inputDraft.onChange(e.target.value) : x({
							id: S.id,
							text: e.target.value
						}),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && !e.repeat && (e.preventDefault(), T || ne());
						},
						"data-testid": `${p}-answer`
					}), /* @__PURE__ */ B(r, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: T || !D.trim(),
						onClick: () => {
							ne();
						},
						"data-testid": `${p}-submit`,
						children: "Answer"
					})]
				}),
				te && !N && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${p}-error`,
					children: te
				}),
				T && !N && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${p}-busy`,
					children: "Working…"
				}),
				!S.readOnlyReason && !N && /* @__PURE__ */ B(o, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${p}-keys`,
					children: L
				})
			]
		}), re]
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
		if (!t) throw new _("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new _(Be(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Z);
		if (n.status === "failed") throw new _(Be(n.error));
		if (!n.transferId) throw new _(Be(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new _(e instanceof Error ? e.message : Be(void 0));
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
function Qe({ rm: r, channel: s, chat: c, context: l, capabilities: u, identity: f, offline: p, recipients: m, defaultRecipient: h, recipient: g, onRecipientChange: v, commands: y = [], onAgent: b, callBlock: x, reply: S, mode: C, onModeChange: w, defaultMode: T, draftKey: E, persistDraft: D = !0, claim: O = !1, answersFocus: ne = !1, onReveal: k, disabled: A, offModes: j, prompts: re, promptScope: M, composerRef: ie, onDraftChange: N, defaultDraft: ae, draft: P, above: se, modeRowEnd: ce, references: le, onRemoveReference: ue, modePlaceholders: de, contextChip: fe, sendWithReferencesOnly: H, console: pe, "data-testid": U = "conversation-composer", ...W }) {
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
	]), [_e, ve] = z(null), q = g === void 0 ? _e : g, ye = !!q && !K.some((e) => e.id === q), J = ye ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: We
	} : ke(K, q, h), be = K.filter((e) => !e.disabled && !e.unavailableReason).length, xe = K.length > 0, Y = qe(Oe({
		capabilities: u,
		hasChat: xe,
		choosable: be,
		offline: p ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), j), Se = T && Y.modes.includes(T) ? T : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [we, Te] = z(Se), X = C ?? we, Ee = F((e) => {
		C === void 0 && Te(e), w?.(e);
	}, [C, w]), je = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
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
		if (tt || !D || !Q) return ae;
		let e = Re(Je(), Q);
		return e ? {
			html: e,
			files: []
		} : ae;
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
		})), N?.(e, t);
	}, [
		D,
		tt,
		Q,
		c,
		X,
		J?.channel,
		s,
		N
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
		ht.current = e, Ke(ie, e);
	}, [ie]), _t = F(() => {
		k?.();
		let e = 20, t = () => {
			ht.current ? ht.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [k]), $ = Ce(re, { scope: M }), vt = !!$.active && !$.collapsed, yt = R(!1);
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
		ve(e), v?.(e), et.current += 1, pt(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, v]), St = K.filter((e) => e.claim !== !1);
	te({
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
	ee(Ct, ne);
	let wt = L(() => y.filter((e) => !e.modes || e.modes.includes(X)), [y, X]), Tt = L(() => wt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [wt]), Et = (e) => {
		if (typeof e == "string") throw new _(e);
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
			let r = y.filter((e) => !e.modes || e.modes.includes("agent")), i = Pe(t), a = Fe(t, r) ?? (i === t ? null : Fe(i, r));
			if (a) {
				let e = Fe(t, [a.command]) ? t : i;
				return !a.command.disabled && Et(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (b) return Et(await b(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Et(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Fe(e.text, y.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Et(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!H && (!!$e || (le?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ut) return !1;
		c?.setTyping?.(!1);
		let a = et.current, o = at.current, l = e.files.length ? await dt(e.files) : [], d = !!J.channel && J.channel === s, f = Ne({
			displayName: G,
			reply: d ? S?.reply ?? null : null,
			reference: $e,
			attachments: l
		}), m = r || Ve(l), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: $e
		}, g;
		return J.send ? g = await J.send(h) : c ? (c.sendMessage(m, f), g = !0) : g = !1, g ? et.current !== a || ot.current !== P ? (at.current === o && mt?.toast(Ue, { type: "success" }), !1) : (d && S?.clear(), D && !tt && Q && ze(Je(), Q, ""), !0) : !1;
	}, Ot = !!u.pending, kt = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), At = kt && !$.typed && !A && !p && !Ot, jt = Qe && Z ? /* @__PURE__ */ B(d, {
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
		console: pe ?? !!x,
		dock: x,
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
		reply: X === "chat" && S?.reply && J?.channel === s ? {
			author: S.reply.author,
			quote: S.reply.text,
			messageId: S.reply.messageId,
			...S.reply.timestamp ? { timestamp: S.reply.timestamp } : {},
			onDismiss: S.clear
		} : null,
		allowAttachments: !!ut,
		...H === void 0 ? {} : { sendWithReferencesOnly: H },
		...Ut ? { readOnly: Ut } : {},
		disabled: !!A || !$.typed && (!!p || kt || X === "agent" && !u.agent?.allowed),
		draftKey: rt,
		...tt ? { draft: P } : {},
		...st === void 0 ? {} : { defaultDraft: st },
		onDraftChange: lt,
		onSend: (e, t) => Dt(e, t.mode),
		className: e(W.className)
	});
}
//#endregion
export { P as AgentComposerDock, N as COMPOSER_BREAKPOINTS, S as COMPOSER_CONTEXT_KINDS, b as COMPOSER_CONTEXT_REASONS, j as COMPOSER_MODE_ORDER, fe as CONFIRM_OPTIONS, re as CommandSuggestions, ae as ComposerAttachments, de as ComposerConfirmFlow, De as ComposerPromptDeck, d as ComposerReferences, _ as ComposerSendError, oe as ContextComposer, D as ConversationInputProvider, ne as DocumentSuggestions, f as EMOJI_SHORTCODES, ie as EmojiSuggestions, A as MentionSuggestions, M as RichChatComposer, w as ThreadInputHandoff, me as answerForOption, Ve as attachmentOnlyText, g as composerCommandArgumentText, x as composerContextPreset, v as composerDraftOf, h as composerSendErrorReason, k as composerSizeFor, Ze as createConversationComposer, q as deckKeyAction, W as defaultOption, y as identityDisplayName, p as matchComposerCommand, O as matchesModeTrigger, G as parseTypedAnswer, H as promptOptions, Se as promptsInScope, m as searchEmoji, U as takesTypedAnswer, C as useComposerFocus, T as useComposerFocusReveal, Ce as useComposerPromptDeck, Ye as useConversationUploads, E as useThreadInput };
