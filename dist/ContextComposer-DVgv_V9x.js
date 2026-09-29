import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./IconButton-DDeXW3mZ.js";
import { f as r, o as i, v as a } from "./Icons-CCn6EnUZ.js";
import { t as o } from "./Banner-e3wgB68D.js";
import { r as ee } from "./TaskStrip-Bjl8jz1-.js";
import { t as te } from "./DropdownMenu-dM1tsyrs.js";
import { t as ne } from "./QuoteBlock-cbJ8wpPM.js";
import { n as re } from "./composerCommands-DSXH8omK.js";
import { a as s, i as ie, r as c } from "./composerContext-BLn1-Nao.js";
import { i as ae, t as oe } from "./FloatingComposerDock-DvFguey-.js";
import { r as se } from "./RichChatComposer-B-Pev2rF.js";
import { useCallback as l, useMemo as ce, useRef as le, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var m = /* @__PURE__ */ e({
	ContextComposer: () => g,
	ContextComposerBase: () => _,
	default: () => g
});
function h(e) {
	return typeof e == "string" || e === void 0 ? s(e ?? "") : e;
}
function ue(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function de(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var fe = [], pe = { conversation: "bg-transparent [--dock-inset:0px]" };
function g(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, o = ce(() => c(t, {
		terminal: !!r,
		...a === void 0 ? {} : { chat: a },
		...i ? { agentUnavailableReason: i } : {}
	}), [
		t,
		r,
		a,
		i
	]);
	return /* @__PURE__ */ f(_, {
		...e,
		look: {
			preset: o,
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: pe[t.kind]
		}
	});
}
function _({ look: e, context: c, mode: m, defaultMode: pe, onModeChange: g, modes: _, disabledModes: me, modeUnavailableReasons: he, placeholder: v, modePlaceholders: ge, modeHints: _e, hints: ve, submitLabel: ye, contextChip: y = !0, onRemoveContext: b, references: be, onRemoveReference: x, commands: S, onCommand: xe, workflows: C, onWorkflow: w, workflowSubmitLabel: Se = "Prepare run", onSearchPeople: Ce, mentionMembers: we, onMentionNonMember: Te, onSearchDocuments: Ee, documentMenu: De, allowAttachments: Oe = !0, allowEmoji: ke = !0, onRequestLink: Ae, privacy: je, onPrivacyChange: Me, privacyLabels: Ne, sendOptions: Pe, onSendOption: Fe, onShareDocument: T, shareDocumentTestId: Ie, offline: E, onMakeDeck: D, makeDeckLabel: Le = "Make a deck from this page", makeDeckTestId: Re, moreActions: ze, moreActionsLabel: Be = "Page actions", dock: O, above: k, strip: A, task: j, reply: M, replacement: N, modelUnavailable: P, toolbarExtras: F, submitLead: Ve, modeRowEnd: He, referencesAction: Ue, referenceDrop: We, processes: Ge, onQuickOpen: Ke, onShellCommand: qe, draft: Je, onDraftChange: Ye, defaultDraft: Xe, draftKey: Ze, onSend: Qe, identity: $e, expanded: et, working: tt, console: nt = !0, disabled: rt, status: it, suggestions: at, onSuggestion: ot, maxInputHeight: st, composerRef: ct, label: lt, inputLabel: ut = "Message", className: dt, "data-testid": I = "context-composer", composerTestId: ft }) {
	let { preset: L } = e, R = L.features, z = Ze ?? `${c.kind}:${c.id}`, B = _ ?? L.modes, V = me ?? L.disabledModes.filter((e) => B.includes(e)), [pt, mt] = u(() => {
		let e = pe ?? L.defaultMode;
		return B.includes(e) ? e : B.find((e) => !V.includes(e)) ?? e;
	}), H = m ?? pt, ht = l((e) => {
		m === void 0 && mt(e), g?.(e);
	}, [m, g]), [gt, _t] = u(() => h(Xe)), [vt, yt] = u(0), [bt, xt] = u(z), [St, Ct] = u(!1);
	bt !== z && (xt(z), _t(h(Xe)), yt(0), Ct(!1));
	let U = Je !== void 0, W = U ? Je : gt, G = le(W);
	G.current = W;
	let K = l((e, t) => {
		U || _t(e), Ye?.(e, t);
	}, [U, Ye]), q = R.workflows && C ? C : fe, J = R.workflowCommand, wt = l((e) => {
		if (w) {
			w(e);
			return;
		}
		let t = q.find((t) => t.id === e), n = J && t ? {
			html: `<p>${de(`${J} ${t.label} `)}</p>`,
			files: G.current?.files ?? [],
			command: {
				trigger: J,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : s(`/${e} `);
		K(n, G.current), yt((e) => e + 1);
	}, [
		w,
		q,
		J,
		K
	]), Y = ce(() => {
		if (!J || q.length === 0 || S?.some((e) => e.trigger === J)) return S;
		let e = {
			trigger: J,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ f(i, {
				size: 14,
				"aria-hidden": !0
			}),
			argument: {
				placeholder: "Choose a workflow",
				search: (e) => q.filter((t) => !t.disabled && t.label.toLowerCase().includes(e.trim().toLowerCase())).map((e) => ({
					id: e.id,
					label: e.label,
					...e.description ? { hint: e.description } : {}
				}))
			}
		};
		return [...S ?? [], e];
	}, [
		S,
		q,
		J
	]), Tt = W?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Et = !!J && q.length > 0 && (W?.command?.trigger === J || Tt.toLowerCase().startsWith(`${J} `)), Dt = le(null), Ot = l((e) => {
		Dt.current = e, ue(ct, e);
	}, [ct]), X = ie($e), kt = l((e) => {
		let t = e;
		if (R.typedText) {
			let n = Dt.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = re(n, Y), i = r ? {
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
		return Qe(t, {
			mode: e.mode ?? H,
			context: c,
			...X ? { author: X } : {}
		});
	}, [
		R.typedText,
		Y,
		H,
		Qe,
		c,
		X
	]), Z = R.contextChip && y !== !1 && !St ? typeof y == "string" ? y : L.chipLabel : null, Q = `context:${c.kind}:${c.id}`, At = Z ? [{
		id: Q,
		label: Z,
		marker: "dot"
	}, ...be ?? []] : be, jt = l((e) => {
		if (e === Q) {
			Ct(!0), b?.();
			return;
		}
		x?.(e);
	}, [
		Q,
		b,
		x
	]), Mt = !!x || !!Z && !!b, Nt = R.pageActions ? [...D ? [{
		label: "This page",
		items: [{
			label: Le,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: D,
			"data-testid": Re ?? `${I}-make-deck`
		}]
	}] : [], ...ze ?? []] : [], Pt = R.sendOptions && T ? /* @__PURE__ */ f(n, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(a, { size: 14 }),
		onClick: (e) => T(e.currentTarget),
		"data-testid": Ie ?? `${I}-share-document`
	}) : null, Ft = q.length > 0 ? /* @__PURE__ */ f(te, {
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
		triggerTestId: `${I}-workflow`,
		sections: [{ items: q.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: W?.command?.trigger === J && W?.command?.argument?.id === e.id,
			onSelect: () => wt(e.id),
			"data-testid": `${I}-workflow-${e.id}`
		})) }]
	}) : null, It = Ft || Pt || F != null ? /* @__PURE__ */ p(d, { children: [
		Ft,
		Pt,
		F
	] }) : void 0, Lt = R.modelUnavailable && P ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${I}-model-unavailable`,
		children: P
	}) : null, Rt = R.offline && E ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${I}-offline`,
		children: E
	}) : null, zt = R.reply && M ? /* @__PURE__ */ f(ne, {
		quote: {
			messageId: M.messageId ?? "",
			author: M.author,
			text: M.quote,
			...M.timestamp ? { timestamp: M.timestamp } : {}
		},
		...M.onDismiss ? { onDismiss: M.onDismiss } : {},
		...M.onJump && M.messageId ? { onJump: M.onJump } : {},
		"data-testid": `${I}-reply`
	}) : null, Bt = !!(Lt || Rt || zt || k != null && k !== !1), Vt = Bt ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${I}-above`,
		children: [
			Lt,
			Rt,
			k,
			zt
		]
	}) : void 0, Ht = R.taskStrip && j ? /* @__PURE__ */ f(ee, {
		label: j.label,
		status: j.status,
		...j.phase ? { phase: j.phase } : {},
		...j.percent === void 0 ? {} : { percent: j.percent },
		...j.onOpen ? { onOpen: j.onOpen } : {},
		...j.onStop ? { onStop: j.onStop } : {},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		"data-testid": `${I}-task`
	}) : null, Ut = A != null && A !== !1 ? A : Ht, Wt = !!et || Bt || Ut != null, Gt = R.attachments === "chat-only" && H !== "chat", Kt = {
		...L.modePlaceholders,
		...v ? { agent: v } : {},
		...ge
	}, $ = {
		...L.modeUnavailableReasons,
		...he
	};
	return V.includes("agent") && $.agent && !ge?.agent && !v && (Kt.agent = $.agent), /* @__PURE__ */ f(oe.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(ae, {
			label: lt ?? L.regionLabel,
			"data-testid": I,
			className: t(e.className, dt),
			above: Vt,
			strip: Ut ?? void 0,
			composer: /* @__PURE__ */ p(d, { children: [O != null && O !== !1 && /* @__PURE__ */ f("div", {
				className: "shrink-0",
				"data-testid": `${I}-dock-slot`,
				children: O
			}), N != null && N !== !1 ? N : /* @__PURE__ */ f(se, {
				ref: Ot,
				"data-testid": ft,
				mode: H,
				onModeChange: ht,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Wt,
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: nt ? "auto" : "none",
				working: tt,
				allowAttachments: Oe && !Gt,
				allowEmoji: R.emoji && ke,
				onRequestLink: Ae,
				privacy: je,
				onPrivacyChange: Me,
				privacyLabels: Ne,
				references: At,
				onRemoveReference: Mt ? jt : void 0,
				modes: e.passModes ? B : _,
				disabledModes: V,
				modeUnavailableReasons: $,
				modeHints: _e,
				placeholder: v,
				inputLabel: ut,
				modePlaceholders: Kt,
				commands: Y,
				onCommand: xe,
				onSearchDocuments: Ee,
				documentMenu: De,
				onSearchPeople: R.mentions ? Ce : void 0,
				mentionMembers: we,
				onMentionNonMember: Te,
				disabled: rt,
				status: it,
				hints: ve,
				suggestions: at,
				onSuggestion: ot,
				processes: Ge,
				onQuickOpen: Ke,
				onShellCommand: qe,
				sendOptions: R.sendOptions ? Pe : void 0,
				onSendOption: R.sendOptions ? Fe : void 0,
				moreActions: Nt.length ? Nt : void 0,
				moreActionsLabel: Be,
				submitLabel: Et ? Se : ye,
				maxInputHeight: st,
				toolbarExtras: It,
				submitLead: Ve,
				modeRowEnd: He,
				referencesAction: Ue,
				referenceDrop: We,
				draft: W,
				onDraftChange: K,
				onSend: kt
			}, `${z}:${vt}`)] })
		})
	});
}
//#endregion
export { _ as n, m as r, g as t };
