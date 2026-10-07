import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { t as n } from "./Button-C2OEUpX-.js";
import { r } from "./Tabs-C6UIoOMr.js";
import { S as i, c as a, m as ee } from "./Icons-B_xESAH3.js";
import { t as te } from "./Banner-8ngXUtJu.js";
import { t as ne } from "./DropdownMenu-M27Ly7by.js";
import { r as re } from "./TaskStrip-D9k1daM1.js";
import { t as ie } from "./QuoteBlock-qqQqscMP.js";
import { i as ae } from "./composerSendError-DYBOFD37.js";
import { a as o, i as oe, r as s } from "./composerContext-BLn1-Nao.js";
import { i as se, t as ce } from "./FloatingComposerDock-ZezHreIm.js";
import { r as le } from "./RichChatComposer-Cc5SJB7-.js";
import { useCallback as c, useMemo as ue, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var m = /* @__PURE__ */ e({
	ContextComposer: () => _,
	ContextComposerBase: () => v,
	default: () => _
});
function h(e) {
	return typeof e == "string" || e === void 0 ? o(e ?? "") : e;
}
function de(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function fe(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var pe = [], g = { conversation: "bg-transparent [--dock-inset:0px]" };
function _(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, ee = ue(() => s(t, {
		terminal: !!r,
		...a === void 0 ? {} : { chat: a },
		...i ? { agentUnavailableReason: i } : {}
	}), [
		t,
		r,
		a,
		i
	]);
	return /* @__PURE__ */ f(v, {
		...e,
		look: {
			preset: ee,
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: g[t.kind]
		}
	});
}
function v({ look: e, context: s, mode: m, defaultMode: g, onModeChange: _, modes: v, disabledModes: me, modeUnavailableReasons: he, placeholder: y, modePlaceholders: b, modeHints: ge, hints: _e, submitLabel: ve, contextChip: x = !0, onRemoveContext: S, references: ye, onRemoveReference: C, commands: w, onCommand: be, workflows: xe, onWorkflow: T, workflowSubmitLabel: Se = "Prepare run", onSearchPeople: Ce, mentionMembers: we, onMentionNonMember: Te, onSearchDocuments: Ee, documentMenu: De, allowAttachments: Oe = !0, allowEmoji: ke = !0, onRequestLink: Ae, privacy: je, onPrivacyChange: Me, privacyLabels: Ne, sendOptions: Pe, onSendOption: Fe, onShareDocument: Ie, shareDocumentTestId: Le, offline: E, onMakeDeck: Re, makeDeckLabel: ze = "Make a deck from this page", makeDeckTestId: Be, moreActions: Ve, moreActionsLabel: He = "Page actions", dock: D, above: O, strip: k, task: A, reply: j, replacement: M, modelUnavailable: Ue, toolbarExtras: We, submitLead: Ge, modeRowEnd: Ke, modeRowStart: qe, sendWithReferencesOnly: Je, referencesAction: Ye, referenceDrop: Xe, processes: Ze, onQuickOpen: Qe, onShellCommand: $e, draft: et, onDraftChange: tt, defaultDraft: nt, draftKey: rt, onSend: it, identity: at, expanded: ot, responsive: st, working: ct, console: lt = !0, disabled: ut, status: dt, suggestions: ft, onSuggestion: pt, maxInputHeight: mt, composerRef: N, label: ht, inputLabel: gt = "Message", className: _t, "data-testid": P = "context-composer", composerTestId: vt }) {
	let { preset: F } = e, I = F.features, L = rt ?? `${s.kind}:${s.id}`, R = v ?? F.modes, z = me ?? F.disabledModes.filter((e) => R.includes(e)), [yt, bt] = u(() => {
		let e = g ?? F.defaultMode;
		return R.includes(e) ? e : R.find((e) => !z.includes(e)) ?? e;
	}), B = m ?? yt, xt = c((e) => {
		m === void 0 && bt(e), _?.(e);
	}, [m, _]), [St, V] = u(() => h(nt)), [Ct, wt] = u(0), [Tt, Et] = u(L), [Dt, Ot] = u(!1);
	Tt !== L && (Et(L), V(h(nt)), wt(0), Ot(!1));
	let H = et !== void 0, U = H ? et : St, W = l(U);
	W.current = U;
	let G = c((e, t) => {
		H || V(e), tt?.(e, t);
	}, [H, tt]), K = I.workflows && xe ? xe : pe, q = I.workflowCommand, kt = c((e) => {
		if (T) {
			T(e);
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
		} : o(`/${e} `);
		G(n, W.current), wt((e) => e + 1);
	}, [
		T,
		K,
		q,
		G
	]), J = ue(() => {
		if (!q || K.length === 0 || w?.some((e) => e.trigger === q)) return w;
		let e = {
			trigger: q,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ f(a, {
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
		return [...w ?? [], e];
	}, [
		w,
		K,
		q
	]), At = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", jt = !!q && K.length > 0 && (U?.command?.trigger === q || At.toLowerCase().startsWith(`${q} `)), Mt = l(null), Nt = c((e) => {
		Mt.current = e, de(N, e);
	}, [N]), Y = oe(at), Pt = c((e) => {
		let t = e;
		if (I.typedText) {
			let n = Mt.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ae(n, J), i = r ? {
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
		return it(t, {
			mode: e.mode ?? B,
			context: s,
			...Y ? { author: Y } : {}
		});
	}, [
		I.typedText,
		J,
		B,
		it,
		s,
		Y
	]), X = I.contextChip && x !== !1 && !Dt ? typeof x == "string" ? x : F.chipLabel : null, Z = `context:${s.kind}:${s.id}`, Ft = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...ye ?? []] : ye, It = c((e) => {
		if (e === Z) {
			Ot(!0), S?.();
			return;
		}
		C?.(e);
	}, [
		Z,
		S,
		C
	]), Lt = !!C || !!X && !!S, Rt = I.pageActions ? [...Re ? [{
		label: "This page",
		items: [{
			label: ze,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Re,
			"data-testid": Be ?? `${P}-make-deck`
		}]
	}] : [], ...Ve ?? []] : [], Q = I.sendOptions && Ie ? /* @__PURE__ */ f(r, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(i, { size: 14 }),
		onClick: (e) => Ie(e.currentTarget),
		"data-testid": Le ?? `${P}-share-document`
	}) : null, zt = K.length > 0 ? /* @__PURE__ */ f(ne, {
		trigger: /* @__PURE__ */ p("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ f(a, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ f(ee, {
					dir: "down",
					size: 14,
					"aria-hidden": !0
				})
			]
		}),
		triggerLabel: "Workflow",
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${n}`,
		triggerTestId: `${P}-workflow`,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => kt(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		})) }]
	}) : null, Bt = zt || Q || We != null ? /* @__PURE__ */ p(d, { children: [
		zt,
		Q,
		We
	] }) : void 0, Vt = I.modelUnavailable && Ue ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${P}-model-unavailable`,
		children: Ue
	}) : null, Ht = I.offline && E ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${P}-offline`,
		children: E
	}) : null, Ut = I.reply && j ? /* @__PURE__ */ f(ie, {
		quote: {
			messageId: j.messageId ?? "",
			author: j.author,
			text: j.quote,
			...j.timestamp ? { timestamp: j.timestamp } : {}
		},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		...j.onJump && j.messageId ? { onJump: j.onJump } : {},
		"data-testid": `${P}-reply`
	}) : null, Wt = !!(Vt || Ht || Ut || O != null && O !== !1), Gt = Wt ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${P}-above`,
		children: [
			Vt,
			Ht,
			O,
			Ut
		]
	}) : void 0, Kt = I.taskStrip && A ? /* @__PURE__ */ f(re, {
		label: A.label,
		status: A.status,
		...A.phase ? { phase: A.phase } : {},
		...A.percent === void 0 ? {} : { percent: A.percent },
		...A.onOpen ? { onOpen: A.onOpen } : {},
		...A.onStop ? { onStop: A.onStop } : {},
		...A.onDismiss ? { onDismiss: A.onDismiss } : {},
		"data-testid": `${P}-task`
	}) : null, qt = k != null && k !== !1 ? k : Kt, Jt = !!ot || Wt || qt != null, Yt = I.attachments === "chat-only" && B !== "chat", Xt = {
		...F.modePlaceholders,
		...y ? { agent: y } : {},
		...b
	}, $ = {
		...F.modeUnavailableReasons,
		...he
	};
	return z.includes("agent") && $.agent && !b?.agent && !y && (Xt.agent = $.agent), /* @__PURE__ */ f(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(se, {
			label: ht ?? F.regionLabel,
			"data-testid": P,
			className: t(e.className, _t),
			above: Gt,
			strip: qt ?? void 0,
			composer: /* @__PURE__ */ p(d, { children: [D != null && D !== !1 && /* @__PURE__ */ f("div", {
				className: "shrink-0",
				"data-testid": `${P}-dock-slot`,
				children: D
			}), M != null && M !== !1 ? M : /* @__PURE__ */ f(le, {
				ref: Nt,
				"data-testid": vt,
				mode: B,
				onModeChange: xt,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Jt,
				...st ? { responsive: st } : {},
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: lt ? "auto" : "none",
				working: ct,
				allowAttachments: Oe && !Yt,
				allowEmoji: I.emoji && ke,
				onRequestLink: Ae,
				privacy: je,
				onPrivacyChange: Me,
				privacyLabels: Ne,
				references: Ft,
				onRemoveReference: Lt ? It : void 0,
				modes: e.passModes ? R : v,
				disabledModes: z,
				modeUnavailableReasons: $,
				modeHints: ge,
				placeholder: y,
				inputLabel: gt,
				modePlaceholders: Xt,
				commands: J,
				onCommand: be,
				onSearchDocuments: Ee,
				documentMenu: De,
				onSearchPeople: I.mentions ? Ce : void 0,
				mentionMembers: we,
				onMentionNonMember: Te,
				disabled: ut,
				status: dt,
				hints: _e,
				suggestions: ft,
				onSuggestion: pt,
				processes: Ze,
				onQuickOpen: Qe,
				onShellCommand: $e,
				sendOptions: I.sendOptions ? Pe : void 0,
				onSendOption: I.sendOptions ? Fe : void 0,
				moreActions: Rt.length ? Rt : void 0,
				moreActionsLabel: He,
				submitLabel: jt ? Se : ve,
				maxInputHeight: mt,
				toolbarExtras: Bt,
				submitLead: Ge,
				modeRowEnd: Ke,
				modeRowStart: qe,
				sendWithReferencesOnly: Je,
				referencesAction: Ye,
				referenceDrop: Xe,
				draft: U,
				onDraftChange: G,
				onSend: Pt
			}, `${L}:${Ct}`)] })
		})
	});
}
//#endregion
export { v as n, m as r, _ as t };
