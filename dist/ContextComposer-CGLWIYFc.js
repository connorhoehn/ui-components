import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { t as n } from "./Button-uREUOWUk.js";
import { t as r } from "./IconButton-IE5g44md.js";
import { S as i, c as a, m as ee } from "./Icons-GSE-QGuJ.js";
import { t as te } from "./Banner-CU6GChN-.js";
import { t as ne } from "./DropdownMenu-BvzGTOgf.js";
import { r as re } from "./TaskStrip-DzscdfU0.js";
import { t as ie } from "./QuoteBlock-qqQqscMP.js";
import { i as ae } from "./composerSendError-BCxgMhHn.js";
import { a as oe, i as se, r as o } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-D10uQ4k3.js";
import { r as ue } from "./RichChatComposer-Cv1Y_umf.js";
import { useCallback as s, useMemo as de, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var p = /* @__PURE__ */ e({
	ContextComposer: () => h,
	ContextComposerBase: () => g,
	default: () => h
});
function m(e) {
	return typeof e == "string" || e === void 0 ? oe(e ?? "") : e;
}
function fe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function pe(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var me = [], he = { conversation: "bg-transparent [--dock-inset:0px]" };
function h(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, ee = de(() => o(t, {
		terminal: !!r,
		...a === void 0 ? {} : { chat: a },
		...i ? { agentUnavailableReason: i } : {}
	}), [
		t,
		r,
		a,
		i
	]);
	return /* @__PURE__ */ d(g, {
		...e,
		look: {
			preset: ee,
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: he[t.kind]
		}
	});
}
function g({ look: e, context: o, mode: p, defaultMode: he, onModeChange: h, modes: g, disabledModes: ge, modeUnavailableReasons: _e, placeholder: _, modePlaceholders: ve, modeHints: ye, hints: be, submitLabel: xe, contextChip: v = !0, onRemoveContext: y, references: Se, onRemoveReference: b, commands: x, onCommand: Ce, workflows: we, onWorkflow: S, workflowSubmitLabel: Te = "Prepare run", onSearchPeople: Ee, mentionMembers: De, onMentionNonMember: Oe, onSearchDocuments: ke, documentMenu: Ae, allowAttachments: je = !0, allowEmoji: Me = !0, onRequestLink: Ne, privacy: Pe, onPrivacyChange: Fe, privacyLabels: Ie, sendOptions: Le, onSendOption: Re, onShareDocument: C, shareDocumentTestId: ze, offline: w, onMakeDeck: T, makeDeckLabel: Be = "Make a deck from this page", makeDeckTestId: Ve, moreActions: He, moreActionsLabel: Ue = "Page actions", dock: E, above: D, header: O, strip: k, task: A, reply: j, replacement: M, modelUnavailable: We, toolbarExtras: Ge, submitLead: Ke, modeRowEnd: qe, modeRowStart: Je, sendWithReferencesOnly: Ye, referencesAction: Xe, referenceDrop: Ze, processes: Qe, onQuickOpen: $e, onShellCommand: et, draft: tt, onDraftChange: nt, defaultDraft: rt, draftKey: it, onSend: at, identity: ot, expanded: st, responsive: ct, working: lt, console: ut = !0, disabled: dt, readOnly: N, status: ft, suggestions: pt, onSuggestion: mt, maxInputHeight: ht, composerRef: gt, label: _t, inputLabel: vt = "Message", className: yt, "data-testid": P = "context-composer", composerTestId: bt }) {
	let { preset: F } = e, I = F.features, L = it ?? `${o.kind}:${o.id}`, R = g ?? F.modes, z = ge ?? F.disabledModes.filter((e) => R.includes(e)), [xt, St] = l(() => {
		let e = he ?? F.defaultMode;
		return R.includes(e) ? e : R.find((e) => !z.includes(e)) ?? e;
	}), B = p ?? xt, Ct = s((e) => {
		p === void 0 && St(e), h?.(e);
	}, [p, h]), [wt, Tt] = l(() => m(rt)), [Et, Dt] = l(0), [Ot, kt] = l(L), [At, jt] = l(!1);
	Ot !== L && (kt(L), Tt(m(rt)), Dt(0), jt(!1));
	let V = tt !== void 0, H = V ? tt : wt, U = c(H);
	U.current = H;
	let W = s((e, t) => {
		V || Tt(e), nt?.(e, t);
	}, [V, nt]), G = I.workflows && we ? we : me, K = I.workflowCommand, Mt = s((e) => {
		if (S) {
			S(e);
			return;
		}
		let t = G.find((t) => t.id === e), n = K && t ? {
			html: `<p>${pe(`${K} ${t.label} `)}</p>`,
			files: U.current?.files ?? [],
			command: {
				trigger: K,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : oe(`/${e} `);
		W(n, U.current), Dt((e) => e + 1);
	}, [
		S,
		G,
		K,
		W
	]), q = de(() => {
		if (!K || G.length === 0 || x?.some((e) => e.trigger === K)) return x;
		let e = {
			trigger: K,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ d(a, {
				size: 14,
				"aria-hidden": !0
			}),
			argument: {
				placeholder: "Choose a workflow",
				search: (e) => G.filter((t) => !t.disabled && t.label.toLowerCase().includes(e.trim().toLowerCase())).map((e) => ({
					id: e.id,
					label: e.label,
					...e.description ? { hint: e.description } : {}
				}))
			}
		};
		return [...x ?? [], e];
	}, [
		x,
		G,
		K
	]), Nt = H?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Pt = !!K && G.length > 0 && (H?.command?.trigger === K || Nt.toLowerCase().startsWith(`${K} `)), Ft = c(null), It = s((e) => {
		Ft.current = e, fe(gt, e);
	}, [gt]), J = se(ot), Lt = s((e) => {
		let t = e;
		if (I.typedText) {
			let n = Ft.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ae(n, q), i = r ? {
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
		return at(t, {
			mode: e.mode ?? B,
			context: o,
			...J ? { author: J } : {}
		});
	}, [
		I.typedText,
		q,
		B,
		at,
		o,
		J
	]), Y = I.contextChip && v !== !1 && !At ? typeof v == "string" ? v : F.chipLabel : null, X = `context:${o.kind}:${o.id}`, Rt = Y ? [{
		id: X,
		label: Y,
		marker: "dot"
	}, ...Se ?? []] : Se, zt = s((e) => {
		if (e === X) {
			jt(!0), y?.();
			return;
		}
		b?.(e);
	}, [
		X,
		y,
		b
	]), Z = N != null && N !== !1, Bt = !Z && (!!b || !!Y && !!y), Vt = I.pageActions ? [...T ? [{
		label: "This page",
		items: [{
			label: Be,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: T,
			"data-testid": Ve ?? `${P}-make-deck`
		}]
	}] : [], ...He ?? []] : [], Q = I.sendOptions && C ? /* @__PURE__ */ d(r, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ d(i, { size: 14 }),
		disabled: Z,
		onClick: (e) => C(e.currentTarget),
		"data-testid": ze ?? `${P}-share-document`
	}) : null, Ht = G.length > 0 ? /* @__PURE__ */ d(ne, {
		trigger: /* @__PURE__ */ f("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ d(a, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ d(ee, {
					dir: "down",
					size: 14,
					"aria-hidden": !0
				})
			]
		}),
		triggerLabel: "Workflow",
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${n}`,
		triggerTestId: `${P}-workflow`,
		disabled: Z || !!dt,
		sections: [{ items: G.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: H?.command?.trigger === K && H?.command?.argument?.id === e.id,
			onSelect: () => Mt(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		})) }]
	}) : null, Ut = Ht || Q || Ge != null ? /* @__PURE__ */ f(u, { children: [
		Ht,
		Q,
		Ge
	] }) : void 0, Wt = I.modelUnavailable && We ? /* @__PURE__ */ d(te, {
		variant: "warning",
		"data-testid": `${P}-model-unavailable`,
		children: We
	}) : null, Gt = I.offline && w ? /* @__PURE__ */ d(te, {
		variant: "warning",
		"data-testid": `${P}-offline`,
		children: w
	}) : null, Kt = I.reply && j ? /* @__PURE__ */ d(ie, {
		quote: {
			messageId: j.messageId ?? "",
			author: j.author,
			text: j.quote,
			...j.timestamp ? { timestamp: j.timestamp } : {}
		},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		...j.onJump && j.messageId ? { onJump: j.onJump } : {},
		"data-testid": `${P}-reply`
	}) : null, qt = !!(Wt || Gt || Kt || D != null && D !== !1), Jt = qt ? /* @__PURE__ */ f("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${P}-above`,
		children: [
			Wt,
			Gt,
			D,
			Kt
		]
	}) : void 0, Yt = I.taskStrip && A ? /* @__PURE__ */ d(re, {
		label: A.label,
		status: A.status,
		...A.phase ? { phase: A.phase } : {},
		...A.percent === void 0 ? {} : { percent: A.percent },
		...A.onOpen ? { onOpen: A.onOpen } : {},
		...A.onStop ? { onStop: A.onStop } : {},
		...A.onDismiss ? { onDismiss: A.onDismiss } : {},
		"data-testid": `${P}-task`
	}) : null, Xt = k != null && k !== !1 ? k : Yt, Zt = O != null && O !== !1, Qt = !!st || qt || Zt || Xt != null, $t = I.attachments === "chat-only" && B !== "chat", en = {
		...F.modePlaceholders,
		..._ ? { agent: _ } : {},
		...ve
	}, $ = {
		...F.modeUnavailableReasons,
		..._e
	};
	return z.includes("agent") && $.agent && !ve?.agent && !_ && (en.agent = $.agent), /* @__PURE__ */ d(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ d(ce, {
			label: _t ?? F.regionLabel,
			"data-testid": P,
			className: t(e.className, yt),
			above: Jt,
			strip: Xt ?? void 0,
			composer: /* @__PURE__ */ f(u, { children: [E != null && E !== !1 && /* @__PURE__ */ d("div", {
				className: "shrink-0",
				"data-testid": `${P}-dock-slot`,
				children: E
			}), M != null && M !== !1 ? M : /* @__PURE__ */ d(ue, {
				ref: It,
				"data-testid": bt,
				mode: B,
				onModeChange: Ct,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Qt,
				...ct ? { responsive: ct } : {},
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: ut ? "auto" : "none",
				working: lt,
				allowAttachments: je && !$t,
				allowEmoji: I.emoji && Me,
				onRequestLink: Ne,
				privacy: Pe,
				onPrivacyChange: Fe,
				privacyLabels: Ie,
				references: Rt,
				onRemoveReference: Bt ? zt : void 0,
				modes: e.passModes ? R : g,
				disabledModes: z,
				modeUnavailableReasons: $,
				modeHints: ye,
				placeholder: _,
				inputLabel: vt,
				modePlaceholders: en,
				commands: q,
				onCommand: Ce,
				onSearchDocuments: ke,
				documentMenu: Ae,
				onSearchPeople: I.mentions ? Ee : void 0,
				mentionMembers: De,
				onMentionNonMember: Oe,
				disabled: dt,
				...Z ? { readOnly: N } : {},
				status: ft,
				hints: be,
				suggestions: pt,
				onSuggestion: mt,
				processes: Qe,
				onQuickOpen: $e,
				onShellCommand: et,
				sendOptions: I.sendOptions ? Le : void 0,
				onSendOption: I.sendOptions ? Re : void 0,
				moreActions: Vt.length ? Vt : void 0,
				moreActionsLabel: Ue,
				submitLabel: Pt ? Te : xe,
				maxInputHeight: ht,
				toolbarExtras: Ut,
				submitLead: Ke,
				modeRowEnd: qe,
				modeRowStart: Je,
				...Zt ? { header: O } : {},
				sendWithReferencesOnly: Ye,
				referencesAction: Xe,
				referenceDrop: Ze,
				draft: H,
				onDraftChange: W,
				onSend: Lt
			}, `${L}:${Et}`)] })
		})
	});
}
//#endregion
export { g as n, p as r, h as t };
