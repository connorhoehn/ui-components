import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { _ as n } from "./overlayStack-DWxp7Rsz.js";
import { t as r } from "./IconButton-VqtspsS5.js";
import { p as i, s as a, y as ee } from "./Icons-_hcrQmPz.js";
import { t as te } from "./Banner-CmrqvKtx.js";
import { r as ne } from "./TaskStrip-CpvxYIs_.js";
import { t as re } from "./DropdownMenu-BWgk2cUe.js";
import { t as ie } from "./QuoteBlock-qqQqscMP.js";
import { n as ae } from "./composerCommands-B-Zn2aTG.js";
import { a as oe, i as se, r as o } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-ZezHreIm.js";
import { r as ue } from "./RichChatComposer-DsxOIoDe.js";
import { useCallback as s, useMemo as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var m = /* @__PURE__ */ e({
	ContextComposer: () => h,
	ContextComposerBase: () => g,
	default: () => h
});
function de(e) {
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
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, ee = c(() => o(t, {
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
function g({ look: e, context: o, mode: m, defaultMode: he, onModeChange: h, modes: g, disabledModes: ge, modeUnavailableReasons: _e, placeholder: _, modePlaceholders: ve, modeHints: ye, hints: be, submitLabel: xe, contextChip: v = !0, onRemoveContext: y, references: Se, onRemoveReference: b, commands: x, onCommand: Ce, workflows: we, onWorkflow: S, workflowSubmitLabel: Te = "Prepare run", onSearchPeople: Ee, mentionMembers: De, onMentionNonMember: Oe, onSearchDocuments: ke, documentMenu: Ae, allowAttachments: je = !0, allowEmoji: Me = !0, onRequestLink: Ne, privacy: Pe, onPrivacyChange: Fe, privacyLabels: Ie, sendOptions: Le, onSendOption: Re, onShareDocument: C, shareDocumentTestId: ze, offline: w, onMakeDeck: T, makeDeckLabel: Be = "Make a deck from this page", makeDeckTestId: Ve, moreActions: He, moreActionsLabel: Ue = "Page actions", dock: E, above: D, strip: O, task: k, reply: A, replacement: j, modelUnavailable: M, toolbarExtras: N, submitLead: We, modeRowEnd: Ge, referencesAction: Ke, referenceDrop: qe, processes: Je, onQuickOpen: Ye, onShellCommand: Xe, draft: P, onDraftChange: Ze, defaultDraft: Qe, draftKey: $e, onSend: et, identity: tt, expanded: nt, working: rt, console: it = !0, disabled: at, status: ot, suggestions: st, onSuggestion: ct, maxInputHeight: lt, composerRef: ut, label: dt, inputLabel: ft = "Message", className: pt, "data-testid": F = "context-composer", composerTestId: mt }) {
	let { preset: I } = e, L = I.features, R = $e ?? `${o.kind}:${o.id}`, z = g ?? I.modes, B = ge ?? I.disabledModes.filter((e) => z.includes(e)), [ht, gt] = u(() => {
		let e = he ?? I.defaultMode;
		return z.includes(e) ? e : z.find((e) => !B.includes(e)) ?? e;
	}), V = m ?? ht, _t = s((e) => {
		m === void 0 && gt(e), h?.(e);
	}, [m, h]), [vt, yt] = u(() => de(Qe)), [bt, xt] = u(0), [St, Ct] = u(R), [wt, Tt] = u(!1);
	St !== R && (Ct(R), yt(de(Qe)), xt(0), Tt(!1));
	let H = P !== void 0, U = H ? P : vt, W = l(U);
	W.current = U;
	let G = s((e, t) => {
		H || yt(e), Ze?.(e, t);
	}, [H, Ze]), K = L.workflows && we ? we : me, q = L.workflowCommand, Et = s((e) => {
		if (S) {
			S(e);
			return;
		}
		let t = K.find((t) => t.id === e), n = q && t ? {
			html: `<p>${pe(`${q} ${t.label} `)}</p>`,
			files: W.current?.files ?? [],
			command: {
				trigger: q,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : oe(`/${e} `);
		G(n, W.current), xt((e) => e + 1);
	}, [
		S,
		K,
		q,
		G
	]), J = c(() => {
		if (!q || K.length === 0 || x?.some((e) => e.trigger === q)) return x;
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
		return [...x ?? [], e];
	}, [
		x,
		K,
		q
	]), Dt = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ot = !!q && K.length > 0 && (U?.command?.trigger === q || Dt.toLowerCase().startsWith(`${q} `)), kt = l(null), At = s((e) => {
		kt.current = e, fe(ut, e);
	}, [ut]), Y = se(tt), jt = s((e) => {
		let t = e;
		if (L.typedText) {
			let n = kt.current?.editor?.getText();
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
		return et(t, {
			mode: e.mode ?? V,
			context: o,
			...Y ? { author: Y } : {}
		});
	}, [
		L.typedText,
		J,
		V,
		et,
		o,
		Y
	]), X = L.contextChip && v !== !1 && !wt ? typeof v == "string" ? v : I.chipLabel : null, Z = `context:${o.kind}:${o.id}`, Mt = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...Se ?? []] : Se, Nt = s((e) => {
		if (e === Z) {
			Tt(!0), y?.();
			return;
		}
		b?.(e);
	}, [
		Z,
		y,
		b
	]), Pt = !!b || !!X && !!y, Q = L.pageActions ? [...T ? [{
		label: "This page",
		items: [{
			label: Be,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: T,
			"data-testid": Ve ?? `${F}-make-deck`
		}]
	}] : [], ...He ?? []] : [], Ft = L.sendOptions && C ? /* @__PURE__ */ f(r, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(ee, { size: 14 }),
		onClick: (e) => C(e.currentTarget),
		"data-testid": ze ?? `${F}-share-document`
	}) : null, It = K.length > 0 ? /* @__PURE__ */ f(re, {
		trigger: /* @__PURE__ */ p("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ f(a, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ f(i, {
					dir: "down",
					size: 14,
					"aria-hidden": !0
				})
			]
		}),
		triggerLabel: "Workflow",
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${n}`,
		triggerTestId: `${F}-workflow`,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => Et(e.id),
			"data-testid": `${F}-workflow-${e.id}`
		})) }]
	}) : null, Lt = It || Ft || N != null ? /* @__PURE__ */ p(d, { children: [
		It,
		Ft,
		N
	] }) : void 0, Rt = L.modelUnavailable && M ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${F}-model-unavailable`,
		children: M
	}) : null, zt = L.offline && w ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${F}-offline`,
		children: w
	}) : null, Bt = L.reply && A ? /* @__PURE__ */ f(ie, {
		quote: {
			messageId: A.messageId ?? "",
			author: A.author,
			text: A.quote,
			...A.timestamp ? { timestamp: A.timestamp } : {}
		},
		...A.onDismiss ? { onDismiss: A.onDismiss } : {},
		...A.onJump && A.messageId ? { onJump: A.onJump } : {},
		"data-testid": `${F}-reply`
	}) : null, Vt = !!(Rt || zt || Bt || D != null && D !== !1), Ht = Vt ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${F}-above`,
		children: [
			Rt,
			zt,
			D,
			Bt
		]
	}) : void 0, Ut = L.taskStrip && k ? /* @__PURE__ */ f(ne, {
		label: k.label,
		status: k.status,
		...k.phase ? { phase: k.phase } : {},
		...k.percent === void 0 ? {} : { percent: k.percent },
		...k.onOpen ? { onOpen: k.onOpen } : {},
		...k.onStop ? { onStop: k.onStop } : {},
		...k.onDismiss ? { onDismiss: k.onDismiss } : {},
		"data-testid": `${F}-task`
	}) : null, Wt = O != null && O !== !1 ? O : Ut, Gt = !!nt || Vt || Wt != null, Kt = L.attachments === "chat-only" && V !== "chat", qt = {
		...I.modePlaceholders,
		..._ ? { agent: _ } : {},
		...ve
	}, $ = {
		...I.modeUnavailableReasons,
		..._e
	};
	return B.includes("agent") && $.agent && !ve?.agent && !_ && (qt.agent = $.agent), /* @__PURE__ */ f(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(ce, {
			label: dt ?? I.regionLabel,
			"data-testid": F,
			className: t(e.className, pt),
			above: Ht,
			strip: Wt ?? void 0,
			composer: /* @__PURE__ */ p(d, { children: [E != null && E !== !1 && /* @__PURE__ */ f("div", {
				className: "shrink-0",
				"data-testid": `${F}-dock-slot`,
				children: E
			}), j != null && j !== !1 ? j : /* @__PURE__ */ f(ue, {
				ref: At,
				"data-testid": mt,
				mode: V,
				onModeChange: _t,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Gt,
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: it ? "auto" : "none",
				working: rt,
				allowAttachments: je && !Kt,
				allowEmoji: L.emoji && Me,
				onRequestLink: Ne,
				privacy: Pe,
				onPrivacyChange: Fe,
				privacyLabels: Ie,
				references: Mt,
				onRemoveReference: Pt ? Nt : void 0,
				modes: e.passModes ? z : g,
				disabledModes: B,
				modeUnavailableReasons: $,
				modeHints: ye,
				placeholder: _,
				inputLabel: ft,
				modePlaceholders: qt,
				commands: J,
				onCommand: Ce,
				onSearchDocuments: ke,
				documentMenu: Ae,
				onSearchPeople: L.mentions ? Ee : void 0,
				mentionMembers: De,
				onMentionNonMember: Oe,
				disabled: at,
				status: ot,
				hints: be,
				suggestions: st,
				onSuggestion: ct,
				processes: Je,
				onQuickOpen: Ye,
				onShellCommand: Xe,
				sendOptions: L.sendOptions ? Le : void 0,
				onSendOption: L.sendOptions ? Re : void 0,
				moreActions: Q.length ? Q : void 0,
				moreActionsLabel: Ue,
				submitLabel: Ot ? Te : xe,
				maxInputHeight: lt,
				toolbarExtras: Lt,
				submitLead: We,
				modeRowEnd: Ge,
				referencesAction: Ke,
				referenceDrop: qe,
				draft: U,
				onDraftChange: G,
				onSend: jt
			}, `${R}:${bt}`)] })
		})
	});
}
//#endregion
export { g as n, m as r, h as t };
