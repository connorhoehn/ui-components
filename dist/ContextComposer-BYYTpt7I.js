import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./IconButton-DDeXW3mZ.js";
import { f as r, o as i, v as a } from "./Icons-CCn6EnUZ.js";
import { t as o } from "./Banner-e3wgB68D.js";
import { r as ee } from "./TaskStrip-Bjl8jz1-.js";
import { t as te } from "./DropdownMenu-dM1tsyrs.js";
import { t as ne } from "./QuoteBlock-cbJ8wpPM.js";
import { n as re } from "./composerCommands-DSXH8omK.js";
import { a as ie, i as ae, r as s } from "./composerContext-BLn1-Nao.js";
import { i as oe, t as se } from "./FloatingComposerDock-DMUQCjea.js";
import { r as ce } from "./RichChatComposer-Bo82mG6R.js";
import { useCallback as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as le, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var m = /* @__PURE__ */ e({
	ContextComposer: () => h,
	ContextComposerBase: () => g,
	default: () => h
});
function ue(e) {
	return typeof e == "string" || e === void 0 ? ie(e ?? "") : e;
}
function de(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function fe(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var pe = [], me = { conversation: "bg-transparent [--dock-inset:0px]" };
function h(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, o = l(() => s(t, {
		terminal: !!r,
		...a === void 0 ? {} : { chat: a },
		...i ? { agentUnavailableReason: i } : {}
	}), [
		t,
		r,
		a,
		i
	]);
	return /* @__PURE__ */ f(g, {
		...e,
		look: {
			preset: o,
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			className: me[t.kind]
		}
	});
}
function g({ look: e, context: s, mode: m, defaultMode: me, onModeChange: h, modes: g, disabledModes: he, modeUnavailableReasons: ge, placeholder: _, modePlaceholders: v, modeHints: _e, hints: ve, submitLabel: ye, contextChip: y = !0, onRemoveContext: b, references: be, onRemoveReference: x, commands: S, onCommand: xe, workflows: C, onWorkflow: w, workflowSubmitLabel: Se = "Prepare run", onSearchPeople: Ce, mentionMembers: we, onMentionNonMember: Te, onSearchDocuments: Ee, documentMenu: De, allowAttachments: Oe = !0, allowEmoji: ke = !0, onRequestLink: Ae, sendOptions: je, onSendOption: Me, onShareDocument: T, shareDocumentTestId: Ne, offline: E, onMakeDeck: D, makeDeckLabel: Pe = "Make a deck from this page", makeDeckTestId: Fe, moreActions: Ie, moreActionsLabel: Le = "Page actions", dock: O, above: k, strip: A, task: j, reply: M, replacement: N, modelUnavailable: Re, toolbarExtras: ze, processes: Be, onQuickOpen: Ve, onShellCommand: He, draft: Ue, onDraftChange: We, defaultDraft: Ge, draftKey: Ke, onSend: qe, identity: Je, expanded: Ye, working: Xe, console: Ze = !0, disabled: Qe, status: $e, suggestions: et, onSuggestion: tt, maxInputHeight: nt, composerRef: rt, label: it, inputLabel: at = "Message", className: ot, "data-testid": P = "context-composer", composerTestId: st }) {
	let { preset: F } = e, I = F.features, L = Ke ?? `${s.kind}:${s.id}`, R = g ?? F.modes, z = he ?? F.disabledModes.filter((e) => R.includes(e)), [ct, lt] = d(() => {
		let e = me ?? F.defaultMode;
		return R.includes(e) ? e : R.find((e) => !z.includes(e)) ?? e;
	}), B = m ?? ct, ut = c((e) => {
		m === void 0 && lt(e), h?.(e);
	}, [m, h]), [dt, V] = d(() => ue(Ge)), [ft, pt] = d(0), [mt, ht] = d(L), [gt, _t] = d(!1);
	mt !== L && (ht(L), V(ue(Ge)), pt(0), _t(!1));
	let H = Ue !== void 0, U = H ? Ue : dt, W = u(U);
	W.current = U;
	let G = c((e, t) => {
		H || V(e), We?.(e, t);
	}, [H, We]), K = I.workflows && C ? C : pe, q = I.workflowCommand, vt = c((e) => {
		if (w) {
			w(e);
			return;
		}
		let t = K.find((t) => t.id === e), n = q && t ? {
			html: `<p>${fe(`${q} ${t.label} `)}</p>`,
			files: W.current?.files ?? [],
			command: {
				trigger: q,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : ie(`/${e} `);
		G(n, W.current), pt((e) => e + 1);
	}, [
		w,
		K,
		q,
		G
	]), J = l(() => {
		if (!q || K.length === 0 || S?.some((e) => e.trigger === q)) return S;
		let e = {
			trigger: q,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ f(i, {
				size: 14,
				"aria-hidden": !0
			}),
			argument: {
				placeholder: "Choose a workflow",
				search: (e) => K.filter((t) => !t.disabled && t.label.toLowerCase().includes(e.trim().toLowerCase())).map((e) => ({
					id: e.id,
					label: e.label,
					...e.description ? { hint: e.description } : {}
				}))
			}
		};
		return [...S ?? [], e];
	}, [
		S,
		K,
		q
	]), yt = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", bt = !!q && K.length > 0 && (U?.command?.trigger === q || yt.toLowerCase().startsWith(`${q} `)), xt = u(null), St = c((e) => {
		xt.current = e, de(rt, e);
	}, [rt]), Y = ae(Je), Ct = c((e) => {
		let t = e;
		if (I.typedText) {
			let n = xt.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = re(n, J), i = r ? {
					trigger: r.trigger,
					...e.command?.trigger === r.trigger && e.command.argument ? { argument: e.command.argument } : {}
				} : void 0;
				t = {
					...e,
					text: n,
					command: i
				}, i || delete t.command;
			}
		}
		return qe(t, {
			mode: e.mode ?? B,
			context: s,
			...Y ? { author: Y } : {}
		});
	}, [
		I.typedText,
		J,
		B,
		qe,
		s,
		Y
	]), X = I.contextChip && y !== !1 && !gt ? typeof y == "string" ? y : F.chipLabel : null, Z = `context:${s.kind}:${s.id}`, wt = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...be ?? []] : be, Tt = c((e) => {
		if (e === Z) {
			_t(!0), b?.();
			return;
		}
		x?.(e);
	}, [
		Z,
		b,
		x
	]), Et = !!x || !!X && !!b, Q = I.pageActions ? [...D ? [{
		label: "This page",
		items: [{
			label: Pe,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: D,
			"data-testid": Fe ?? `${P}-make-deck`
		}]
	}] : [], ...Ie ?? []] : [], Dt = I.sendOptions && T ? /* @__PURE__ */ f(n, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(a, { size: 14 }),
		onClick: (e) => T(e.currentTarget),
		"data-testid": Ne ?? `${P}-share-document`
	}) : null, Ot = K.length > 0 ? /* @__PURE__ */ f(te, {
		trigger: /* @__PURE__ */ p("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ f(i, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ f(r, {
					dir: "down",
					size: 14,
					"aria-hidden": !0
				})
			]
		}),
		triggerLabel: "Workflow",
		triggerClassName: "h-7 px-2 text-xs font-medium text-text-secondary",
		triggerTestId: `${P}-workflow`,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => vt(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		})) }]
	}) : null, kt = Ot || Dt || ze != null ? /* @__PURE__ */ p(le, { children: [
		Ot,
		Dt,
		ze
	] }) : void 0, At = I.modelUnavailable && Re ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${P}-model-unavailable`,
		children: Re
	}) : null, jt = I.offline && E ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${P}-offline`,
		children: E
	}) : null, Mt = I.reply && M ? /* @__PURE__ */ f(ne, {
		quote: {
			messageId: M.messageId ?? "",
			author: M.author,
			text: M.quote,
			...M.timestamp ? { timestamp: M.timestamp } : {}
		},
		...M.onDismiss ? { onDismiss: M.onDismiss } : {},
		...M.onJump && M.messageId ? { onJump: M.onJump } : {},
		"data-testid": `${P}-reply`
	}) : null, Nt = !!(At || jt || Mt || k != null && k !== !1), Pt = Nt ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${P}-above`,
		children: [
			At,
			jt,
			k,
			Mt
		]
	}) : void 0, Ft = I.taskStrip && j ? /* @__PURE__ */ f(ee, {
		label: j.label,
		status: j.status,
		...j.phase ? { phase: j.phase } : {},
		...j.percent === void 0 ? {} : { percent: j.percent },
		...j.onOpen ? { onOpen: j.onOpen } : {},
		...j.onStop ? { onStop: j.onStop } : {},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		"data-testid": `${P}-task`
	}) : null, It = A != null && A !== !1 ? A : Ft, Lt = !!Ye || Nt || It != null, Rt = I.attachments === "chat-only" && B !== "chat", zt = {
		...F.modePlaceholders,
		..._ ? { agent: _ } : {},
		...v
	}, $ = {
		...F.modeUnavailableReasons,
		...ge
	};
	return z.includes("agent") && $.agent && !v?.agent && !_ && (zt.agent = $.agent), /* @__PURE__ */ f(se.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(oe, {
			label: it ?? F.regionLabel,
			"data-testid": P,
			className: t(e.className, ot),
			above: Pt,
			strip: It ?? void 0,
			composer: /* @__PURE__ */ p(le, { children: [O != null && O !== !1 && /* @__PURE__ */ f("div", {
				className: "shrink-0",
				"data-testid": `${P}-dock-slot`,
				children: O
			}), N != null && N !== !1 ? N : /* @__PURE__ */ f(ce, {
				ref: St,
				"data-testid": st,
				mode: B,
				onModeChange: ut,
				modeControl: "menu",
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Lt,
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: Ze ? "auto" : "none",
				working: Xe,
				allowAttachments: Oe && !Rt,
				allowEmoji: I.emoji && ke,
				onRequestLink: Ae,
				references: wt,
				onRemoveReference: Et ? Tt : void 0,
				modes: e.passModes ? R : g,
				disabledModes: z,
				modeUnavailableReasons: $,
				modeHints: _e,
				placeholder: _,
				inputLabel: at,
				modePlaceholders: zt,
				commands: J,
				onCommand: xe,
				onSearchDocuments: Ee,
				documentMenu: De,
				onSearchPeople: I.mentions ? Ce : void 0,
				mentionMembers: we,
				onMentionNonMember: Te,
				disabled: Qe,
				status: $e,
				hints: ve,
				suggestions: et,
				onSuggestion: tt,
				processes: Be,
				onQuickOpen: Ve,
				onShellCommand: He,
				sendOptions: I.sendOptions ? je : void 0,
				onSendOption: I.sendOptions ? Me : void 0,
				moreActions: Q.length ? Q : void 0,
				moreActionsLabel: Le,
				submitLabel: bt ? Se : ye,
				maxInputHeight: nt,
				toolbarExtras: kt,
				draft: U,
				onDraftChange: G,
				onSend: Ct
			}, `${L}:${ft}`)] })
		})
	});
}
//#endregion
export { g as n, m as r, h as t };
