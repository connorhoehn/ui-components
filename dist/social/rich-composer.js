import { t as e } from "../cn-D4QmbyEy.js";
import { c as t, n } from "../Button-C-I3BxWI.js";
import { c as r, l as i, n as a } from "../Text-DqNdYJ7p.js";
import { t as o } from "../Select-DovxLSsz.js";
import { t as s } from "../FormField-CQ27qxWt.js";
import { t as c } from "../Textarea-BwvE1HPn.js";
import { t as l } from "../DecisionPath-B3pT70Ce.js";
import { a as u, c as d, i as f, l as p, n as m, r as h, t as g } from "../composerSendError-jtcERQXu.js";
import { a as _, i as v, n as y, r as ee, t as b } from "../composerContext-BLn1-Nao.js";
import { a as te, i as x, n as S, o as C, r as ne, s as w, t as T } from "../ConversationInputs-D6Bhkit6.js";
import { a as E, c as D, i as re, l as ie, n as O, o as k, r as ae, s as A, t as j, u as M } from "../RichChatComposer-DLCjmujA.js";
import { t as oe } from "../ContextComposer-CDkkNVki.js";
import { t as N } from "../AgentComposerDock-CHfVp7ok.js";
import { useCallback as P, useEffect as F, useId as se, useMemo as I, useRef as L, useState as R } from "react";
import { jsx as z, jsxs as B } from "react/jsx-runtime";
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
function de({ title: t, recipient: o, defaultMessage: u = "", message: d, onMessageChange: f, messageLabel: p = "Message", placeholder: m, reviewTitle: h, note: g, doneTitle: _ = "Done", doneMessage: v = "Confirmed.", continueLabel: y = "Continue", confirmLabel: ee = "Confirm", backLabel: b = "Back", doneActionLabel: te = "Back", onConfirm: x, onCancel: S, onDone: C, onStageChange: ne, path: w, autoFocus: T = !0, className: E, "data-testid": D = "composer-confirm-flow" }) {
	let [re, ie] = R(u), O = d !== void 0, k = O ? d : re, ae = P((e) => {
		O || ie(e), f?.(e);
	}, [O, f]), [A, j] = R("draft"), [M, oe] = R(!1), [N, I] = R(null), [de, fe] = R(null), V = L(!1), H = L(null), U = L(null), pe = L(null), me = se(), W = k.trim().length > 0, G = P((e) => {
		j(e), ne?.(e);
	}, [ne]), K = L(!1);
	F(() => {
		let e = !K.current;
		K.current = !0, !(e && !T) && (A === "draft" ? H.current : A === "review" ? U.current : pe.current)?.focus({ preventScroll: !0 });
	}, [A, T]);
	let he = P(() => {
		W && (I(null), G("review"));
	}, [W, G]), ge = P(async () => {
		if (V.current) return;
		V.current = !0, oe(!0), I(null);
		let e;
		try {
			e = await x(k);
		} catch (t) {
			e = { error: t instanceof Error && t.message ? t.message : "That could not be confirmed. Try again." };
		} finally {
			V.current = !1, oe(!1);
		}
		if (ce(e)) {
			I(e.error);
			return;
		}
		fe(e && "receipt" in e ? e.receipt : null), G("done");
	}, [
		k,
		x,
		G
	]), q = A === "review" ? h ?? t : A === "done" ? _ : t, _e = `${me}-heading`, J = `${me}-keys`, ve = q || o ? /* @__PURE__ */ B(r, {
		gap: "sm",
		align: "baseline",
		wrap: !0,
		className: "min-w-0",
		children: [q && /* @__PURE__ */ z(a, {
			as: "p",
			size: "sm",
			weight: "semibold",
			tone: "primary",
			id: _e,
			className: "min-w-0",
			children: q
		}), o && /* @__PURE__ */ z(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			className: "min-w-0",
			"data-testid": `${D}-recipient`,
			children: o
		})]
	}) : null, ye = w ? /* @__PURE__ */ z(l, {
		steps: w.steps,
		current: w.current + ue[A],
		"data-testid": `${D}-path`
	}) : null;
	return A === "done" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "done",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: pe,
			tabIndex: -1,
			role: "status",
			"aria-labelledby": q ? _e : void 0,
			className: "min-w-0 outline-none",
			"data-testid": `${D}-done`,
			children: [
				ve,
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${D}-done-message`,
					children: de ?? v
				}),
				C && /* @__PURE__ */ z(r, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: /* @__PURE__ */ z(n, {
						size: "sm",
						variant: "ghost",
						onClick: C,
						"data-composer-readonly-allow": "Leaves the confirmed result without changing a record or submitting an answer",
						"data-testid": `${D}-done-action`,
						children: te
					})
				})
			]
		})]
	}) : A === "review" ? /* @__PURE__ */ B(i, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "review",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(i, {
			as: "section",
			gap: "xs",
			ref: U,
			tabIndex: -1,
			role: "group",
			"aria-labelledby": q ? _e : void 0,
			"aria-describedby": J,
			"aria-busy": M || void 0,
			className: "min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40",
			"data-testid": `${D}-review`,
			onKeyDownCapture: (e) => {
				e.key === "Enter" && (e.repeat || e.nativeEvent.isComposing) && (e.preventDefault(), e.stopPropagation());
			},
			onKeyDown: (e) => {
				e.defaultPrevented || M || (e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), G("draft")) : le(e) && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), ge()));
			},
			children: [
				ve,
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					className: "min-w-0 whitespace-pre-wrap break-words",
					"data-testid": `${D}-message`,
					children: k
				}),
				/* @__PURE__ */ B(r, {
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
								ge();
							},
							"aria-keyshortcuts": "Enter",
							"data-testid": `${D}-confirm`,
							children: ee
						}),
						/* @__PURE__ */ z(n, {
							size: "sm",
							variant: "ghost",
							disabled: M,
							onClick: () => G("draft"),
							"aria-keyshortcuts": "Escape",
							"data-composer-readonly-allow": "Returns to the retained draft without changing a record or submitting an answer",
							"data-testid": `${D}-back`,
							children: b
						}),
						/* @__PURE__ */ z(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: J,
							className: "min-w-0",
							"data-testid": `${D}-keys`,
							children: "Enter to confirm · Esc to edit"
						})
					]
				}),
				N && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "min-w-0 text-danger-fg",
					"data-testid": `${D}-error`,
					children: N
				}),
				M && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${D}-busy`,
					children: "Working…"
				}),
				g && /* @__PURE__ */ z(a, {
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
	}) : /* @__PURE__ */ B(i, {
		gap: "xs",
		className: e("min-w-0", E),
		"data-composer-confirm-flow": "draft",
		"data-testid": D,
		children: [ye, /* @__PURE__ */ B(i, {
			as: "form",
			gap: "xs",
			className: "min-w-0",
			onSubmit: (e) => {
				e.preventDefault(), he();
			},
			"aria-labelledby": q ? _e : void 0,
			"data-testid": `${D}-draft`,
			children: [
				ve,
				/* @__PURE__ */ z(s, {
					label: p,
					children: (e) => /* @__PURE__ */ z(c, {
						...e,
						ref: H,
						"aria-describedby": [e["aria-describedby"], J].filter(Boolean).join(" "),
						autoResize: !0,
						minRows: 2,
						maxRows: 8,
						value: k,
						placeholder: m,
						onChange: (e) => ae(e.target.value),
						onKeyDown: (e) => {
							le(e) && (e.nativeEvent.isComposing || (e.preventDefault(), e.stopPropagation(), e.repeat || he()));
						},
						"data-testid": `${D}-editor`
					})
				}),
				/* @__PURE__ */ B(r, {
					gap: "sm",
					align: "center",
					wrap: !0,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ z(n, {
							size: "sm",
							type: "submit",
							variant: "primary",
							disabled: !W,
							"aria-keyshortcuts": "Enter",
							"data-composer-readonly-allow": "Moves the draft to its review without changing a record or submitting an answer",
							"data-testid": `${D}-continue`,
							children: y
						}),
						S && /* @__PURE__ */ z(n, {
							size: "sm",
							type: "button",
							variant: "ghost",
							onClick: S,
							"data-composer-readonly-allow": "Leaves the draft without changing a record or submitting an answer",
							"data-testid": `${D}-cancel`,
							children: b
						}),
						/* @__PURE__ */ z(a, {
							size: "xs",
							tone: "tertiary",
							wrap: !0,
							id: J,
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
var fe = [{
	id: "confirm",
	label: "Confirm",
	emphasis: "primary"
}, {
	id: "cancel",
	label: "Cancel"
}];
function V(e) {
	return e.options && e.options.length ? e.options : e.kind === "confirm" ? fe : [];
}
function H(e, t) {
	return e.shortcut ? e.shortcut.toLowerCase() : t < 9 ? String(t + 1) : null;
}
function U(e) {
	return !!e && !e.readOnlyReason && (e.kind === "text" || e.kind === "number");
}
function pe(e) {
	let t = V(e), n = e.defaultOptionId ?? (e.kind === "confirm" ? t[0]?.id : void 0), r = n ? t.find((e) => e.id === n) ?? null : null;
	return r && !r.disabledReason ? r : null;
}
function me(e, t) {
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
function G(e, t) {
	if (t.kind === "text") return `${e.title}: ${t.text}`;
	if (t.kind === "number") return `${e.title}: ${t.value}`;
	if (t.kind === "compose") return `${e.title}: ${t.message}`;
	let n = V(e).find((e) => e.id === t.optionId);
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
function he(e, t = {}) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = r;
		for (; e && !n.has(e.id);) n.add(e.id), e = t[e.id];
	}
	return n;
}
function ge(e, t) {
	for (let [n, r] of Object.entries(t)) if (r.id === e) return n;
	return null;
}
function q(e, t) {
	if (!e.length) return -1;
	let n = t ? e.findIndex((e) => e.id === t) : -1;
	return n >= 0 ? n : 0;
}
function _e(e, t) {
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
		let e = pe(n);
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
var ve = [], ye = {};
function Y(e) {
	return !!e && typeof e == "object" && "error" in e && typeof e.error == "string";
}
function be(e) {
	return !!e && typeof e == "object" && "next" in e && !!e.next && typeof e.next == "object";
}
function xe(e) {
	let t = e ?? ve, [n, r] = R(() => /* @__PURE__ */ new Set()), [i, a] = R(null), [o, s] = R(!1), [c, l] = R(null), [u, d] = R({}), [f, p] = R(null), [m, h] = R(ye), g = L(m);
	g.current = m;
	let _ = I(() => K(t, n, m), [
		t,
		n,
		m
	]), v = q(_, i), y = v >= 0 ? _[v] : null, ee = c != null, b = L(!1), te = t.map((e) => e.id).join("\0");
	F(() => {
		let e = he(t, g.current);
		r((t) => {
			let n = new Set([...t].filter((t) => e.has(t)));
			return n.size === t.size ? t : n;
		}), h((t) => {
			let n = Object.entries(t).filter(([t]) => e.has(t));
			return n.length === Object.keys(t).length ? t : Object.fromEntries(n);
		});
	}, [te]);
	let x = _[0]?.id ?? null, S = L(/* @__PURE__ */ new Set());
	F(() => {
		let e = _.some((e) => !S.current.has(e.id));
		for (let e of _) S.current.add(e.id);
		e && s(!1);
	}, [x, _]);
	let C = P(async (e, t) => {
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
		})), !1) : be(n) ? (h((t) => ({
			...t,
			[e.id]: n.next
		})), r((t) => new Set(t).add(e.id)), a(null), !0) : (r((t) => new Set(t).add(e.id)), a(null), p(n && "receipt" in n ? n.receipt : G(e, t)), !0);
	}, []), ne = P(async (e) => {
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
	}, [y]), w = y ? ge(y.id, m) : null, T = P(() => {
		if (!y || w == null) return !1;
		let e = y.id;
		return h((e) => {
			let { [w]: t, ...n } = e;
			return n;
		}), r((t) => {
			let n = new Set(t);
			return n.delete(w), n.delete(e), n;
		}), a(w), !0;
	}, [y, w]), E = P(() => {
		y && (r((e) => new Set(e).add(y.id)), a(null));
	}, [y]), D = P(async (e) => {
		if (!y) return !1;
		let t = V(y).find((t) => t.id === e);
		return !t || t.disabledReason ? !1 : C(y, me(y, t));
	}, [y, C]), re = P(async (e) => {
		if (!y || !U(y)) return !1;
		let t = W(y, e);
		return "error" in t ? (d((e) => ({
			...e,
			[y.id]: t.error
		})), !1) : C(y, t.answer);
	}, [y, C]), ie = P((e) => {
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
		answerCompose: ne,
		isFollowUp: w != null,
		back: T,
		finish: E,
		dismissReceipt: () => p(null)
	};
}
var Se = {
	neutral: "text-text-primary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg"
};
function Ce({ children: e }) {
	return /* @__PURE__ */ z("kbd", {
		className: "inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary",
		children: e
	});
}
function X() {
	return typeof navigator > "u" ? "Ctrl" : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl+";
}
var we = "max-h-[min(40vh,18rem)] overflow-y-auto overscroll-contain";
function Te({ deck: t, prompts: o, input: s = null, variant: u = "card", className: d, "data-testid": f = "composer-prompt-deck" }) {
	let p = u === "inset", m = xe(t ? null : o), h = t ?? m, g = L(null), _ = se(), v = L(null), [y, ee] = R({
		id: "",
		text: ""
	}), { active: b, pending: te, index: x, collapsed: S, busy: C, error: ne, receipt: w } = h, T = y.id === b?.id ? y.text : "", E = !s && h.typed && !b?.readOnlyReason, D = async () => {
		await h.answerTyped(T) && ee({
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
	}, F(() => {
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
	]), F(() => {
		let e = (e) => {
			if (e.defaultPrevented || e.isComposing || e.repeat) return;
			let { deck: t, input: n } = re.current, r = e.target, i = !!g.current && !!r && g.current.contains(r), a = !!n && n.contains(r), o = !!r && v.current?.contains(r);
			if (!i && !a) return;
			let s = _e({
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
	let ie = X(), O = te.length, k = w ? /* @__PURE__ */ B(r, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: e("min-w-0", p && !S && b && "px-3 pb-2"),
		"data-testid": `${f}-receipt`,
		children: [/* @__PURE__ */ z(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			wrap: !0,
			role: "status",
			className: "min-w-0",
			children: `Answered · ${w}`
		}), /* @__PURE__ */ z(n, {
			variant: "link",
			size: "sm",
			onClick: h.dismissReceipt,
			"data-composer-readonly-allow": "Dismisses the local answer receipt without changing a record or submitting an answer",
			children: "Dismiss"
		})]
	}) : null;
	if (!b || S) return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border px-3 py-1.5", d),
		"data-composer-prompt-deck": b ? "collapsed" : "answered",
		"data-deck-variant": u,
		"data-testid": f,
		ref: g,
		children: [b && /* @__PURE__ */ B(r, {
			gap: "sm",
			align: "center",
			wrap: !0,
			className: e("min-w-0", !p && "rounded-md border border-border bg-surface-secondary px-3 py-1.5"),
			children: [
				/* @__PURE__ */ z(a, {
					size: "xs",
					tone: "secondary",
					wrap: !0,
					className: "min-w-0 flex-1",
					children: O === 1 ? `1 question waiting · ${b.title}` : `${O} questions waiting · ${b.title}`
				}),
				/* @__PURE__ */ z(n, {
					variant: "link",
					size: "sm",
					onClick: () => h.setCollapsed(!1),
					"aria-keyshortcuts": "Control+ArrowDown Meta+ArrowDown",
					"data-composer-readonly-allow": "Shows the prompt's existing facts without changing a record or submitting an answer",
					"data-testid": `${f}-show`,
					children: "Show"
				}),
				/* @__PURE__ */ z(Ce, { children: `${ie}↓` })
			]
		}), k]
	});
	let ae = V(b), A = U(b), j = b.kind === "compose" && !b.readOnlyReason, M = pe(b), oe = `${_}-title`, N = `${_}-question`, P = ae.map((e, t) => H(e, t)), I = [
		ae.length ? `${A ? "Alt+" : ""}${P.filter(Boolean).length > 1 ? `${P[0]}–${P[P.length - 1]}` : P[0] ?? ""} choose` : null,
		A ? "type an answer · Enter answer" : M ? `Enter ${M.label}` : null,
		O > 1 ? `${ie}↓ next` : null,
		"Esc hide"
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ B(i, {
		gap: "xs",
		className: e("min-w-0", p && "border-b border-border", d),
		"data-composer-prompt-deck": "expanded",
		"data-composer-dialogue": s ? void 0 : b.kind,
		"data-deck-variant": u,
		"data-testid": f,
		ref: g,
		children: [/* @__PURE__ */ B("section", {
			role: "group",
			"aria-labelledby": oe,
			"aria-describedby": N,
			"aria-busy": C || void 0,
			className: e("flex min-w-0 flex-col gap-2 px-3 py-2.5", we, !p && "rounded-lg border border-border bg-surface"),
			"data-composer-prompt": b.id,
			"data-composer-prompt-kind": b.kind,
			"data-testid": `${f}-card`,
			children: [
				b.path && !j && /* @__PURE__ */ z(l, {
					steps: b.path.steps,
					current: b.path.current,
					"data-testid": `${f}-path`
				}),
				/* @__PURE__ */ B(r, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [
						/* @__PURE__ */ B(i, {
							gap: "none",
							className: "min-w-0 flex-1",
							children: [b.eyebrow && /* @__PURE__ */ z(a, {
								size: "xs",
								tone: "tertiary",
								className: "truncate",
								children: b.eyebrow
							}), /* @__PURE__ */ z(a, {
								as: "p",
								size: "sm",
								weight: "semibold",
								tone: "primary",
								className: "min-w-0 truncate",
								id: oe,
								title: b.title,
								children: b.title
							})]
						}),
						O > 1 && /* @__PURE__ */ B(r, {
							gap: "xs",
							align: "center",
							wrap: !1,
							className: "shrink-0",
							children: [
								/* @__PURE__ */ z(a, {
									size: "xs",
									tone: "secondary",
									tabular: !0,
									"data-testid": `${f}-position`,
									children: `${x + 1} of ${O}`
								}),
								/* @__PURE__ */ z(n, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Previous question",
									"aria-keyshortcuts": "Control+ArrowUp Meta+ArrowUp",
									onClick: () => h.page(-1),
									"data-composer-readonly-allow": "Reads the previous prompt without changing a record or submitting an answer",
									"data-testid": `${f}-previous`,
									children: "‹"
								}),
								/* @__PURE__ */ z(n, {
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
						/* @__PURE__ */ z(n, {
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
				O > 1 && /* @__PURE__ */ z(r, {
					gap: "xs",
					wrap: !1,
					"aria-hidden": !0,
					className: "min-w-0",
					"data-testid": `${f}-progress`,
					children: te.map((t, n) => /* @__PURE__ */ z(i, {
						gap: "none",
						className: e("h-1 min-w-0 flex-1 rounded-full", n === x ? "bg-primary" : "bg-border")
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
							className: e("m-0 min-w-0 break-words text-xs font-normal", Se[t.tone ?? "neutral"], t.mono && "tabular-nums"),
							...typeof t.value == "string" ? { title: t.value } : {},
							children: t.value
						})]
					}, `${t.label}-${n}`))
				}),
				/* @__PURE__ */ z(a, {
					as: "p",
					size: "sm",
					tone: "primary",
					wrap: !0,
					id: N,
					className: "min-w-0",
					children: b.question
				}),
				b.readOnlyReason ? /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					wrap: !0,
					"data-testid": `${f}-read-only`,
					children: b.readOnlyReason
				}) : j ? /* @__PURE__ */ z(de, {
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
				}, b.id) : ae.length > 0 && /* @__PURE__ */ z(r, {
					gap: "xs",
					wrap: !0,
					className: "min-w-0",
					role: "list",
					"aria-label": "Answers",
					children: ae.map((e, t) => {
						let r = P[t], o = r ? `${A ? "Alt+" : ""}${r}` : void 0;
						return /* @__PURE__ */ B(i, {
							gap: "none",
							role: "listitem",
							className: "min-w-0",
							children: [/* @__PURE__ */ B(n, {
								size: "sm",
								variant: e.emphasis === "primary" ? "primary" : e.emphasis === "danger" ? "danger" : "secondary",
								disabled: C || !!e.disabledReason,
								title: e.disabledReason ?? e.hint,
								"aria-keyshortcuts": o,
								"aria-describedby": e.hint ? `${_}-hint-${t}` : void 0,
								onClick: () => {
									h.pick(e.id).then((e) => {
										e && s?.focus();
									});
								},
								"data-composer-prompt-option": e.id,
								"data-default": M?.id === e.id || void 0,
								"data-testid": `${f}-option-${e.id}`,
								children: [o && /* @__PURE__ */ z(Ce, { children: o }), e.label]
							}), e.hint && /* @__PURE__ */ z(a, {
								size: "xs",
								tone: "tertiary",
								className: "hidden",
								id: `${_}-hint-${t}`,
								children: e.hint
							})]
						}, e.id);
					})
				}),
				E && /* @__PURE__ */ B(i, {
					gap: "sm",
					className: "min-w-0",
					children: [/* @__PURE__ */ z(c, {
						ref: v,
						"aria-label": b.title,
						placeholder: b.placeholder ?? "Your answer",
						value: T,
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
					}), /* @__PURE__ */ z(n, {
						variant: "primary",
						size: "sm",
						className: "self-end",
						disabled: C || !T.trim(),
						onClick: () => {
							D();
						},
						"data-testid": `${f}-submit`,
						children: "Answer"
					})]
				}),
				ne && !j && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					wrap: !0,
					role: "alert",
					className: "text-danger-fg",
					"data-testid": `${f}-error`,
					children: ne
				}),
				C && !j && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "secondary",
					role: "status",
					"data-testid": `${f}-busy`,
					children: "Working…"
				}),
				!b.readOnlyReason && !j && /* @__PURE__ */ z(a, {
					as: "p",
					size: "xs",
					tone: "tertiary",
					wrap: !0,
					className: "min-w-0",
					"data-testid": `${f}-keys`,
					children: I
				})
			]
		}), k]
	});
}
function Ee(e) {
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
function De(e, t, n) {
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
function Oe(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function ke(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function Ae(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && ke(e.html).length > 0;
}
function je(e) {
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
function Me(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function Ne(e, t) {
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
var Pe = "ui.conversation-draft:";
function Fe(e) {
	return `${Pe}${e}`;
}
function Ie(e, t) {
	try {
		let n = e?.getItem(Fe(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && ke(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Le(e, t, n) {
	try {
		ke(n) ? e?.setItem(Fe(t), JSON.stringify({ html: n })) : e?.removeItem(Fe(t));
	} catch {}
}
var Z = "Conversation changed; draft retained.";
function Re(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function ze(e) {
	return e.map((e) => e.name).join(", ");
}
var Be = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(Re(`timed out (${n})`)));
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
}, Ve = "Message sent. Your current draft has been kept.", He = "This destination is no longer available. Choose a current destination.", Ue = "This view has no page to attach.";
function We(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ge(e, t) {
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
function Ke() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function qe(e, t, n, r = 6e4) {
	let i = L(new Be()), a = L(t);
	a.current = t, F(() => () => i.current.rejectAll(Z), [t]);
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
		if (!t) throw new g("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new g(Re(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(Z);
		if (n.status === "failed") throw new g(Re(n.error));
		if (!n.transferId) throw new g(Re(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new g(e instanceof Error ? e.message : Re(void 0));
		}
	}, [o, r]);
	return P((e) => Promise.all(e.map(s)), [s]);
}
function Je({ id: e, value: t, recipients: n, onChange: i, readOnlyWayOut: s, disabled: c, "data-testid": l }) {
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
	return /* @__PURE__ */ B(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ z(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ z(o, {
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
			...s ? { "data-composer-readonly-allow": s } : {},
			...c ? { disabled: !0 } : {},
			onChange: (e) => i(e.target.value)
		})]
	});
}
function Ye(e) {
	function t(t) {
		return /* @__PURE__ */ z(Xe, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Xe({ rm: n, channel: o, chat: s, context: c, capabilities: l, identity: d, offline: f, recipients: p, defaultRecipient: m, recipient: h, onRecipientChange: _, commands: v = [], onAgent: y, callBlock: ee, reply: b, mode: x, onModeChange: S, defaultMode: C, draftKey: w, persistDraft: T = !0, claim: E = !1, answersFocus: D = !1, onReveal: re, disabled: ie, offModes: O, prompts: k, composerRef: ae, onDraftChange: A, defaultDraft: j, draft: M, above: N, modeRowEnd: se, references: ce, onRemoveReference: le, modePlaceholders: ue, contextChip: de, sendWithReferencesOnly: fe, console: V, "data-testid": H = "conversation-composer", ...U }) {
	let pe = t() === "compact", me = d?.displayName || "You", W = w ?? o ?? `${c.kind}:${c.id}`, G = l.readOnlyReason || "You can read this conversation but not post to it.", K = I(() => {
		let e = p ?? (o ? [{
			id: "discussion",
			label: c.title || "This conversation",
			channel: o,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === o && !l.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? G,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		p,
		o,
		c.title,
		l.maySend,
		G
	]), [he, ge] = R(null), q = h === void 0 ? he : h, _e = !!q && !K.some((e) => e.id === q), J = _e ? {
		id: q,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: He
	} : De(K, q, m), ve = K.filter((e) => !e.disabled && !e.unavailableReason).length, ye = K.length > 0, Y = Ge(Ee({
		capabilities: l,
		hasChat: ye,
		choosable: ve,
		offline: f ?? null,
		chatOffReason: J?.unavailableReason ?? null
	}), O), be = C && Y.modes.includes(C) ? C : Y.modes.find((e) => !Y.disabledModes.includes(e)) ?? Y.modes[0] ?? "chat", [Se, Ce] = R(be), X = x ?? Se, we = P((e) => {
		x === void 0 && Ce(e), S?.(e);
	}, [x, S]), ke = `${Y.modes.join(",")}|${Y.disabledModes.join(",")}`;
	F(() => {
		if (Y.modes.includes(X) && !Y.disabledModes.includes(X)) return;
		let e = Y.modes.find((e) => !Y.disabledModes.includes(e));
		e && e !== X && we(e);
	}, [
		ke,
		X,
		we
	]);
	let [Pe, Fe] = R(!0), Z = c.reference ?? null;
	F(() => {
		Fe(!0);
	}, [Z?.id]);
	let Re = !!J && J.carriesReference !== !1, Be = !!Z && !Z.page, Ye = !!J && J.channel !== o, Xe = !!Z && Pe && !(X === "chat" && (!Re || Be && Ye)), Ze = X === "chat" && Re && Pe && !(Be && Ye) ? Z : null, Qe = L(0), $e = M !== void 0, et = d?.userId?.trim() || null, Q = et ? JSON.stringify([
		"actor",
		et,
		W
	]) : null, tt = T && !$e ? JSON.stringify([
		"actor",
		et,
		W
	]) : W, nt = JSON.stringify([
		W,
		o ?? null,
		d?.userId ?? null,
		J?.id ?? null,
		J?.channel ?? null
	]), rt = L(nt);
	rt.current !== nt && (rt.current = nt, Qe.current += 1);
	let it = L(M);
	it.current = M;
	let at = I(() => {
		if ($e || !T || !Q) return j;
		let e = Ie(Ke(), Q);
		return e ? {
			html: e,
			files: []
		} : j;
	}, [
		tt,
		$e,
		T
	]), ot = L(""), st = P((e, t) => {
		Qe.current += 1, ot.current = e.html, T && !$e && Q && Le(Ke(), Q, e.html), s?.setTyping?.(Ae({
			html: e.html,
			mode: X,
			recipientChannel: J?.channel,
			channel: o
		})), A?.(e, t);
	}, [
		T,
		$e,
		Q,
		s,
		X,
		J?.channel,
		o,
		A
	]);
	F(() => {
		Ae({
			html: ot.current,
			mode: X,
			recipientChannel: J?.channel,
			channel: o
		}) || s?.setTyping?.(!1);
	}, [
		X,
		J?.channel,
		o
	]);
	let ct = X === "chat" && l.mayAttach && J?.attachments && J.channel ? J.channel : null, lt = qe(n, ct, me), [ut, dt] = R(null), ft = L(null), pt = P((e) => {
		ft.current = e, We(ae, e);
	}, [ae]), mt = P(() => {
		re?.();
		let e = 20, t = () => {
			ft.current ? ft.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [re]), $ = xe(k), ht = !!$.active && !$.collapsed, gt = L(!1);
	F(() => {
		ht ? s?.setTyping?.(!1) : gt.current && mt(), gt.current = ht;
	}, [
		ht,
		s,
		mt
	]);
	let _t = I(() => ({
		isEmpty: () => !ft.current?.editor?.getText().trim(),
		contains: (e) => {
			try {
				return !!e && !!ft.current?.editor?.view.dom.contains(e);
			} catch {
				return !1;
			}
		},
		focus: mt
	}), [mt]), vt = P((e) => {
		ge(e), _?.(e), Qe.current += 1, dt(null), K.find((t) => t.id === e)?.onSelect?.();
	}, [K, _]), yt = K.filter((e) => e.claim !== !1);
	ne({
		channels: E ? Oe(l.maySend || p === void 0 ? o : null, yt) : [],
		label: E ? E.label : "",
		replies: E ? !!E.replies : !1,
		enabled: !!E && E.enabled !== !1,
		focus: (e) => {
			let t = yt.find((t) => t.channel === e.channel);
			return we("chat"), t && vt(t.id), mt(), !0;
		}
	});
	let bt = P((e) => {
		if (e.mode === "agent") return !Y.modes.includes("agent") || Y.disabledModes.includes("agent") ? !1 : (we("agent"), mt(), !0);
		if (!Y.modes.includes("chat") || Y.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? K.find((e) => e.channel && e.channel === o) ?? (p ? K.find((e) => e.id === "discussion") : J) : t.kind === "huddle" ? yt.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? K.find((e) => e.id === `person:${t.userId}`) ?? null : K.find((e) => e.channel === t.channel) ?? null : J;
		return !n || n.disabled ? !1 : (n.id !== J?.id && vt(n.id), we("chat"), mt(), !0);
	}, [
		Y,
		we,
		mt,
		J,
		K,
		p,
		yt,
		o,
		vt
	]);
	te(bt, D);
	let xt = I(() => v.filter((e) => !e.modes || e.modes.includes(X)), [v, X]), St = I(() => xt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [xt]), Ct = (e) => {
		if (typeof e == "string") throw new g(e);
		return e !== !1;
	}, wt = async (e, t) => {
		if (dt(null), $.typed) {
			let t = await $.answerTyped(e.text);
			return t && T && !$e && Q && Le(Ke(), Q, ""), t;
		}
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: Ze ?? (Pe ? Z : null),
			recipientId: J?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!l.agent?.allowed || f) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = v.filter((e) => !e.modes || e.modes.includes("agent")), i = Me(t), a = Ne(t, r) ?? (i === t ? null : Ne(i, r));
			if (a) {
				let e = Ne(t, [a.command]) ? t : i;
				return !a.command.disabled && Ct(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (y) return Ct(await y(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Ct(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = Ne(e.text, v.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (s?.setTyping?.(!1), Ct(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!J || J.disabled || J.unavailableReason || f) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!fe && (!!Ze || (ce?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !ct) return !1;
		s?.setTyping?.(!1);
		let a = Qe.current, c = rt.current, u = e.files.length ? await lt(e.files) : [], d = !!J.channel && J.channel === o, p = je({
			displayName: me,
			reply: d ? b?.reply ?? null : null,
			reference: Ze,
			attachments: u
		}), m = r || ze(u), h = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: p,
			reference: Ze
		}, g;
		return J.send ? g = await J.send(h) : s ? (s.sendMessage(m, p), g = !0) : g = !1, g ? Qe.current !== a || it.current !== M ? (rt.current === c && dt(Ve), !1) : (d && b?.clear(), T && !$e && Q && Le(Ke(), Q, ""), !0) : !1;
	}, Tt = !!l.pending, Et = X === "chat" && (!J || !!J.unavailableReason || !!J.disabled), Dt = Et && !$.typed && !ie && !f && !Tt, Ot = Xe && Z ? /* @__PURE__ */ z(u, {
		references: [{
			id: Z.id,
			label: pe ? Z.label.split(" › ").pop() ?? Z.label : Z.label,
			title: Z.label
		}],
		...Dt ? {} : { onRemove: () => {
			Fe(!1), Qe.current += 1, le?.(Z.id);
		} },
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, kt = _e && J ? [...K, J] : K, At = X === "chat" && kt.length > 1, jt = X === "chat" && Pe && Be && Ye && Re, Mt = X === "chat" && kt.length > 1 && !Tt ? J?.unavailableReason ?? (J ? null : "Choose a destination.") : null, Nt = X === "chat" ? J?.error ?? null : null, Pt = At || Mt || ut || jt || Nt || N != null && N !== !1 ? /* @__PURE__ */ B(i, {
		gap: "xs",
		children: [
			N,
			(At || Mt) && /* @__PURE__ */ B(r, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				"data-composer-recipient-row": "",
				children: [At && /* @__PURE__ */ z(Je, {
					id: `${W}-recipient`,
					value: J?.id ?? null,
					recipients: kt,
					onChange: vt,
					"data-testid": `${H}-recipient`,
					...Dt ? ve > 0 ? { readOnlyWayOut: "Choose a destination you can post to" } : { disabled: !0 } : {}
				}), Mt && /* @__PURE__ */ z(a, {
					size: "xs",
					tone: "tertiary",
					title: Mt,
					className: e("min-w-0", At && "border-0 border-l border-solid border-border pl-2"),
					"data-composer-recipient-notice": "",
					"data-testid": `${H}-recipient-unavailable`,
					children: /* @__PURE__ */ z("span", {
						className: "truncate",
						children: Mt
					})
				})]
			}),
			jt && /* @__PURE__ */ z(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ue
			}),
			ut && /* @__PURE__ */ z(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${H}-note`,
				children: ut
			}),
			Nt && /* @__PURE__ */ z(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${H}-recipient-error`,
				children: Nt
			})
		]
	}) : void 0, Ft = !pe, It = Ft && Ot || se ? /* @__PURE__ */ B(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [Ft ? Ot : null, se]
	}) : void 0, Lt = !Ft && Xe && Z ? [{
		id: Z.id,
		label: Z.label.split(" › ").pop() ?? Z.label,
		title: Z.label
	}, ...ce ?? []] : ce, Rt = (e) => {
		Z && e === Z.id && (Fe(!1), Qe.current += 1), le?.(e);
	}, zt = {
		...ue,
		...X === "chat" && J?.placeholder ? { chat: J.placeholder } : {},
		...!$.collapsed && $.active && !$.active.readOnlyReason && $.active.kind !== "compose" ? { [X]: $.typed ? $.active.placeholder ?? "Type your answer and press Enter" : "Choose an answer above, or press its number" } : {}
	}, Bt = Dt ? Mt ? ve > 0 ? "Read only. Choose another destination in To: to post." : "Read only" : J?.unavailableReason ?? (J ? G : "Choose a destination.") : null;
	return /* @__PURE__ */ z(oe, {
		...U,
		context: c,
		composerRef: pt,
		"data-testid": H,
		...pe ? { responsive: "pane" } : {},
		console: V ?? !!ee,
		dock: ee,
		mode: X,
		onModeChange: we,
		modes: Y.modes,
		disabledModes: Y.disabledModes,
		modeUnavailableReasons: Y.reasons,
		chatAvailable: ye && !Y.reasons.chat,
		contextChip: de ?? (!Z && void 0),
		above: ht ? N : Pt,
		...ht ? { replacement: /* @__PURE__ */ z(Te, {
			deck: $,
			"data-testid": `${H}-prompts`
		}) } : $.visible ? { header: /* @__PURE__ */ z(Te, {
			deck: $,
			input: _t,
			variant: "inset",
			"data-testid": `${H}-prompts`
		}) } : {},
		...It ? { modeRowEnd: It } : {},
		...Lt ? {
			references: Lt,
			onRemoveReference: Rt
		} : {},
		modePlaceholders: zt,
		commands: St,
		reply: X === "chat" && b?.reply && J?.channel === o ? {
			author: b.reply.author,
			quote: b.reply.text,
			messageId: b.reply.messageId,
			...b.reply.timestamp ? { timestamp: b.reply.timestamp } : {},
			onDismiss: b.clear
		} : null,
		allowAttachments: !!ct,
		...fe === void 0 ? {} : { sendWithReferencesOnly: fe },
		...Bt ? { readOnly: Bt } : {},
		disabled: !!ie || !$.typed && (!!f || Et || X === "agent" && !l.agent?.allowed),
		draftKey: tt,
		...$e ? { draft: M } : {},
		...at === void 0 ? {} : { defaultDraft: at },
		onDraftChange: st,
		onSend: (e, t) => wt(e, t.mode),
		className: e(U.className)
	});
}
//#endregion
export { N as AgentComposerDock, j as COMPOSER_BREAKPOINTS, b as COMPOSER_CONTEXT_KINDS, y as COMPOSER_CONTEXT_REASONS, O as COMPOSER_MODE_ORDER, fe as CONFIRM_OPTIONS, k as CommandSuggestions, M as ComposerAttachments, de as ComposerConfirmFlow, Te as ComposerPromptDeck, u as ComposerReferences, g as ComposerSendError, oe as ContextComposer, T as ConversationInputProvider, D as DocumentSuggestions, d as EMOJI_SHORTCODES, A as EmojiSuggestions, ie as MentionSuggestions, ae as RichChatComposer, S as ThreadInputHandoff, me as answerForOption, ze as attachmentOnlyText, h as composerCommandArgumentText, ee as composerContextPreset, _ as composerDraftOf, m as composerSendErrorReason, re as composerSizeFor, Ye as createConversationComposer, _e as deckKeyAction, pe as defaultOption, v as identityDisplayName, f as matchComposerCommand, E as matchesModeTrigger, W as parseTypedAnswer, V as promptOptions, p as searchEmoji, U as takesTypedAnswer, x as useComposerFocus, C as useComposerFocusReveal, xe as useComposerPromptDeck, qe as useConversationUploads, w as useThreadInput };
