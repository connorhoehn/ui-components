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
import { r as ce } from "./RichChatComposer-CTVwRTpQ.js";
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
			singleModeLabel: !0,
			className: me[t.kind]
		}
	});
}
function g({ look: e, context: s, mode: m, defaultMode: me, onModeChange: h, modes: g, disabledModes: he, modeUnavailableReasons: ge, placeholder: _, modePlaceholders: _e, modeHints: ve, hints: ye, submitLabel: be, contextChip: v = !0, onRemoveContext: y, references: xe, onRemoveReference: b, commands: x, onCommand: Se, workflows: S, onWorkflow: C, workflowSubmitLabel: Ce = "Prepare run", onSearchPeople: we, mentionMembers: Te, onMentionNonMember: Ee, onSearchDocuments: De, documentMenu: Oe, allowAttachments: ke = !0, allowEmoji: Ae = !0, onRequestLink: je, privacy: Me, onPrivacyChange: Ne, privacyLabels: Pe, sendOptions: Fe, onSendOption: Ie, onShareDocument: w, shareDocumentTestId: Le, offline: T, onMakeDeck: E, makeDeckLabel: Re = "Make a deck from this page", makeDeckTestId: ze, moreActions: Be, moreActionsLabel: Ve = "Page actions", dock: D, above: O, strip: k, task: A, reply: j, replacement: M, modelUnavailable: He, toolbarExtras: Ue, processes: We, onQuickOpen: Ge, onShellCommand: Ke, draft: qe, onDraftChange: Je, defaultDraft: Ye, draftKey: Xe, onSend: Ze, identity: Qe, expanded: $e, working: et, console: tt = !0, disabled: nt, status: rt, suggestions: it, onSuggestion: at, maxInputHeight: ot, composerRef: st, label: ct, inputLabel: lt = "Message", className: ut, "data-testid": N = "context-composer", composerTestId: dt }) {
	let { preset: P } = e, F = P.features, I = Xe ?? `${s.kind}:${s.id}`, L = g ?? P.modes, R = he ?? P.disabledModes.filter((e) => L.includes(e)), [ft, pt] = d(() => {
		let e = me ?? P.defaultMode;
		return L.includes(e) ? e : L.find((e) => !R.includes(e)) ?? e;
	}), z = m ?? ft, mt = c((e) => {
		m === void 0 && pt(e), h?.(e);
	}, [m, h]), [ht, B] = d(() => ue(Ye)), [gt, V] = d(0), [_t, vt] = d(I), [yt, bt] = d(!1);
	_t !== I && (vt(I), B(ue(Ye)), V(0), bt(!1));
	let H = qe !== void 0, U = H ? qe : ht, W = u(U);
	W.current = U;
	let G = c((e, t) => {
		H || B(e), Je?.(e, t);
	}, [H, Je]), K = F.workflows && S ? S : pe, q = F.workflowCommand, xt = c((e) => {
		if (C) {
			C(e);
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
		G(n, W.current), V((e) => e + 1);
	}, [
		C,
		K,
		q,
		G
	]), J = l(() => {
		if (!q || K.length === 0 || x?.some((e) => e.trigger === q)) return x;
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
		return [...x ?? [], e];
	}, [
		x,
		K,
		q
	]), St = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ct = !!q && K.length > 0 && (U?.command?.trigger === q || St.toLowerCase().startsWith(`${q} `)), wt = u(null), Tt = c((e) => {
		wt.current = e, de(st, e);
	}, [st]), Y = ae(Qe), Et = c((e) => {
		let t = e;
		if (F.typedText) {
			let n = wt.current?.editor?.getText();
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
		return Ze(t, {
			mode: e.mode ?? z,
			context: s,
			...Y ? { author: Y } : {}
		});
	}, [
		F.typedText,
		J,
		z,
		Ze,
		s,
		Y
	]), X = F.contextChip && v !== !1 && !yt ? typeof v == "string" ? v : P.chipLabel : null, Z = `context:${s.kind}:${s.id}`, Dt = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...xe ?? []] : xe, Ot = c((e) => {
		if (e === Z) {
			bt(!0), y?.();
			return;
		}
		b?.(e);
	}, [
		Z,
		y,
		b
	]), kt = !!b || !!X && !!y, At = F.pageActions ? [...E ? [{
		label: "This page",
		items: [{
			label: Re,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: E,
			"data-testid": ze ?? `${N}-make-deck`
		}]
	}] : [], ...Be ?? []] : [], jt = F.sendOptions && w ? /* @__PURE__ */ f(n, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(a, { size: 14 }),
		onClick: (e) => w(e.currentTarget),
		"data-testid": Le ?? `${N}-share-document`
	}) : null, Mt = K.length > 0 ? /* @__PURE__ */ f(te, {
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
		triggerTestId: `${N}-workflow`,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => xt(e.id),
			"data-testid": `${N}-workflow-${e.id}`
		})) }]
	}) : null, Nt = Mt || jt || Ue != null ? /* @__PURE__ */ p(le, { children: [
		Mt,
		jt,
		Ue
	] }) : void 0, Q = F.modelUnavailable && He ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${N}-model-unavailable`,
		children: He
	}) : null, Pt = F.offline && T ? /* @__PURE__ */ f(o, {
		variant: "warning",
		"data-testid": `${N}-offline`,
		children: T
	}) : null, Ft = F.reply && j ? /* @__PURE__ */ f(ne, {
		quote: {
			messageId: j.messageId ?? "",
			author: j.author,
			text: j.quote,
			...j.timestamp ? { timestamp: j.timestamp } : {}
		},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		...j.onJump && j.messageId ? { onJump: j.onJump } : {},
		"data-testid": `${N}-reply`
	}) : null, It = !!(Q || Pt || Ft || O != null && O !== !1), Lt = It ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${N}-above`,
		children: [
			Q,
			Pt,
			O,
			Ft
		]
	}) : void 0, Rt = F.taskStrip && A ? /* @__PURE__ */ f(ee, {
		label: A.label,
		status: A.status,
		...A.phase ? { phase: A.phase } : {},
		...A.percent === void 0 ? {} : { percent: A.percent },
		...A.onOpen ? { onOpen: A.onOpen } : {},
		...A.onStop ? { onStop: A.onStop } : {},
		...A.onDismiss ? { onDismiss: A.onDismiss } : {},
		"data-testid": `${N}-task`
	}) : null, zt = k != null && k !== !1 ? k : Rt, Bt = !!$e || It || zt != null, Vt = F.attachments === "chat-only" && z !== "chat", Ht = {
		...P.modePlaceholders,
		..._ ? { agent: _ } : {},
		..._e
	}, $ = {
		...P.modeUnavailableReasons,
		...ge
	};
	return R.includes("agent") && $.agent && !_e?.agent && !_ && (Ht.agent = $.agent), /* @__PURE__ */ f(se.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(oe, {
			label: ct ?? P.regionLabel,
			"data-testid": N,
			className: t(e.className, ut),
			above: Lt,
			strip: zt ?? void 0,
			composer: /* @__PURE__ */ p(le, { children: [D != null && D !== !1 && /* @__PURE__ */ f("div", {
				className: "shrink-0",
				"data-testid": `${N}-dock-slot`,
				children: D
			}), M != null && M !== !1 ? M : /* @__PURE__ */ f(ce, {
				ref: Tt,
				"data-testid": dt,
				mode: z,
				onModeChange: mt,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Bt,
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: tt ? "auto" : "none",
				working: et,
				allowAttachments: ke && !Vt,
				allowEmoji: F.emoji && Ae,
				onRequestLink: je,
				privacy: Me,
				onPrivacyChange: Ne,
				privacyLabels: Pe,
				references: Dt,
				onRemoveReference: kt ? Ot : void 0,
				modes: e.passModes ? L : g,
				disabledModes: R,
				modeUnavailableReasons: $,
				modeHints: ve,
				placeholder: _,
				inputLabel: lt,
				modePlaceholders: Ht,
				commands: J,
				onCommand: Se,
				onSearchDocuments: De,
				documentMenu: Oe,
				onSearchPeople: F.mentions ? we : void 0,
				mentionMembers: Te,
				onMentionNonMember: Ee,
				disabled: nt,
				status: rt,
				hints: ye,
				suggestions: it,
				onSuggestion: at,
				processes: We,
				onQuickOpen: Ge,
				onShellCommand: Ke,
				sendOptions: F.sendOptions ? Fe : void 0,
				onSendOption: F.sendOptions ? Ie : void 0,
				moreActions: At.length ? At : void 0,
				moreActionsLabel: Ve,
				submitLabel: Ct ? Ce : be,
				maxInputHeight: ot,
				toolbarExtras: Nt,
				draft: U,
				onDraftChange: G,
				onSend: Et
			}, `${I}:${gt}`)] })
		})
	});
}
//#endregion
export { g as n, m as r, h as t };
