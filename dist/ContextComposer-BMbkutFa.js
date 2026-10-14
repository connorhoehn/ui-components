import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { t as n } from "./Button-uREUOWUk.js";
import { t as r } from "./IconButton-IE5g44md.js";
import { S as i, c as a, m as ee } from "./Icons-B_xESAH3.js";
import { t as te } from "./Banner-8ngXUtJu.js";
import { t as ne } from "./DropdownMenu-BTo1zmfS.js";
import { r as re } from "./TaskStrip-lt_FXzaK.js";
import { t as ie } from "./QuoteBlock-qqQqscMP.js";
import { i as ae } from "./composerSendError-BA_aS2ld.js";
import { a as oe, i as se, r as o } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-D10uQ4k3.js";
import { r as ue } from "./RichChatComposer-DRcN99IE.js";
import { useCallback as s, useMemo as c, useRef as de, useState as l } from "react";
import { Fragment as fe, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var f = /* @__PURE__ */ e({
	ContextComposer: () => h,
	ContextComposerBase: () => g,
	default: () => h
});
function p(e) {
	return typeof e == "string" || e === void 0 ? oe(e ?? "") : e;
}
function pe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function me(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var he = [], m = { conversation: "bg-transparent [--dock-inset:0px]" };
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
	return /* @__PURE__ */ u(g, {
		...e,
		look: {
			preset: ee,
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: m[t.kind]
		}
	});
}
function g({ look: e, context: o, mode: f, defaultMode: m, onModeChange: h, modes: g, disabledModes: ge, modeUnavailableReasons: _e, placeholder: _, modePlaceholders: ve, modeHints: ye, hints: be, submitLabel: xe, contextChip: v = !0, onRemoveContext: y, references: Se, onRemoveReference: b, commands: x, onCommand: Ce, workflows: S, onWorkflow: C, workflowSubmitLabel: we = "Prepare run", onSearchPeople: Te, mentionMembers: Ee, onMentionNonMember: De, onSearchDocuments: Oe, documentMenu: ke, allowAttachments: Ae = !0, allowEmoji: je = !0, onRequestLink: Me, privacy: Ne, onPrivacyChange: Pe, privacyLabels: Fe, sendOptions: Ie, onSendOption: Le, onShareDocument: w, shareDocumentTestId: Re, offline: T, onMakeDeck: E, makeDeckLabel: ze = "Make a deck from this page", makeDeckTestId: Be, moreActions: Ve, moreActionsLabel: He = "Page actions", dock: D, above: O, header: k, strip: A, task: j, reply: M, replacement: N, modelUnavailable: Ue, toolbarExtras: We, submitLead: Ge, modeRowEnd: Ke, modeRowStart: qe, sendWithReferencesOnly: Je, referencesAction: Ye, referenceDrop: Xe, processes: Ze, onQuickOpen: Qe, onShellCommand: $e, draft: et, onDraftChange: tt, defaultDraft: nt, draftKey: rt, onSend: it, identity: at, expanded: ot, responsive: st, working: ct, console: lt = !0, disabled: ut, status: dt, suggestions: ft, onSuggestion: pt, maxInputHeight: mt, composerRef: P, label: ht, inputLabel: gt = "Message", className: _t, "data-testid": F = "context-composer", composerTestId: vt }) {
	let { preset: I } = e, L = I.features, R = rt ?? `${o.kind}:${o.id}`, z = g ?? I.modes, B = ge ?? I.disabledModes.filter((e) => z.includes(e)), [yt, bt] = l(() => {
		let e = m ?? I.defaultMode;
		return z.includes(e) ? e : z.find((e) => !B.includes(e)) ?? e;
	}), V = f ?? yt, xt = s((e) => {
		f === void 0 && bt(e), h?.(e);
	}, [f, h]), [St, Ct] = l(() => p(nt)), [wt, Tt] = l(0), [Et, Dt] = l(R), [Ot, kt] = l(!1);
	Et !== R && (Dt(R), Ct(p(nt)), Tt(0), kt(!1));
	let H = et !== void 0, U = H ? et : St, W = de(U);
	W.current = U;
	let G = s((e, t) => {
		H || Ct(e), tt?.(e, t);
	}, [H, tt]), K = L.workflows && S ? S : he, q = L.workflowCommand, At = s((e) => {
		if (C) {
			C(e);
			return;
		}
		let t = K.find((t) => t.id === e), n = q && t ? {
			html: `<p>${me(`${q} ${t.label} `)}</p>`,
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
		G(n, W.current), Tt((e) => e + 1);
	}, [
		C,
		K,
		q,
		G
	]), J = c(() => {
		if (!q || K.length === 0 || x?.some((e) => e.trigger === q)) return x;
		let e = {
			trigger: q,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ u(a, {
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
	]), jt = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Mt = !!q && K.length > 0 && (U?.command?.trigger === q || jt.toLowerCase().startsWith(`${q} `)), Nt = de(null), Pt = s((e) => {
		Nt.current = e, pe(P, e);
	}, [P]), Y = se(at), Ft = s((e) => {
		let t = e;
		if (L.typedText) {
			let n = Nt.current?.editor?.getText();
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
			mode: e.mode ?? V,
			context: o,
			...Y ? { author: Y } : {}
		});
	}, [
		L.typedText,
		J,
		V,
		it,
		o,
		Y
	]), X = L.contextChip && v !== !1 && !Ot ? typeof v == "string" ? v : I.chipLabel : null, Z = `context:${o.kind}:${o.id}`, It = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...Se ?? []] : Se, Lt = s((e) => {
		if (e === Z) {
			kt(!0), y?.();
			return;
		}
		b?.(e);
	}, [
		Z,
		y,
		b
	]), Rt = !!b || !!X && !!y, zt = L.pageActions ? [...E ? [{
		label: "This page",
		items: [{
			label: ze,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: E,
			"data-testid": Be ?? `${F}-make-deck`
		}]
	}] : [], ...Ve ?? []] : [], Bt = L.sendOptions && w ? /* @__PURE__ */ u(r, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ u(i, { size: 14 }),
		onClick: (e) => w(e.currentTarget),
		"data-testid": Re ?? `${F}-share-document`
	}) : null, Vt = K.length > 0 ? /* @__PURE__ */ u(ne, {
		trigger: /* @__PURE__ */ d("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ u(a, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ u(ee, {
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
			onSelect: () => At(e.id),
			"data-testid": `${F}-workflow-${e.id}`
		})) }]
	}) : null, Ht = Vt || Bt || We != null ? /* @__PURE__ */ d(fe, { children: [
		Vt,
		Bt,
		We
	] }) : void 0, Ut = L.modelUnavailable && Ue ? /* @__PURE__ */ u(te, {
		variant: "warning",
		"data-testid": `${F}-model-unavailable`,
		children: Ue
	}) : null, Wt = L.offline && T ? /* @__PURE__ */ u(te, {
		variant: "warning",
		"data-testid": `${F}-offline`,
		children: T
	}) : null, Q = L.reply && M ? /* @__PURE__ */ u(ie, {
		quote: {
			messageId: M.messageId ?? "",
			author: M.author,
			text: M.quote,
			...M.timestamp ? { timestamp: M.timestamp } : {}
		},
		...M.onDismiss ? { onDismiss: M.onDismiss } : {},
		...M.onJump && M.messageId ? { onJump: M.onJump } : {},
		"data-testid": `${F}-reply`
	}) : null, Gt = !!(Ut || Wt || Q || O != null && O !== !1), Kt = Gt ? /* @__PURE__ */ d("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${F}-above`,
		children: [
			Ut,
			Wt,
			O,
			Q
		]
	}) : void 0, qt = L.taskStrip && j ? /* @__PURE__ */ u(re, {
		label: j.label,
		status: j.status,
		...j.phase ? { phase: j.phase } : {},
		...j.percent === void 0 ? {} : { percent: j.percent },
		...j.onOpen ? { onOpen: j.onOpen } : {},
		...j.onStop ? { onStop: j.onStop } : {},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		"data-testid": `${F}-task`
	}) : null, Jt = A != null && A !== !1 ? A : qt, Yt = k != null && k !== !1, Xt = !!ot || Gt || Yt || Jt != null, Zt = L.attachments === "chat-only" && V !== "chat", Qt = {
		...I.modePlaceholders,
		..._ ? { agent: _ } : {},
		...ve
	}, $ = {
		...I.modeUnavailableReasons,
		..._e
	};
	return B.includes("agent") && $.agent && !ve?.agent && !_ && (Qt.agent = $.agent), /* @__PURE__ */ u(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ u(ce, {
			label: ht ?? I.regionLabel,
			"data-testid": F,
			className: t(e.className, _t),
			above: Kt,
			strip: Jt ?? void 0,
			composer: /* @__PURE__ */ d(fe, { children: [D != null && D !== !1 && /* @__PURE__ */ u("div", {
				className: "shrink-0",
				"data-testid": `${F}-dock-slot`,
				children: D
			}), N != null && N !== !1 ? N : /* @__PURE__ */ u(ue, {
				ref: Pt,
				"data-testid": vt,
				mode: V,
				onModeChange: xt,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: Xt,
				...st ? { responsive: st } : {},
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: lt ? "auto" : "none",
				working: ct,
				allowAttachments: Ae && !Zt,
				allowEmoji: L.emoji && je,
				onRequestLink: Me,
				privacy: Ne,
				onPrivacyChange: Pe,
				privacyLabels: Fe,
				references: It,
				onRemoveReference: Rt ? Lt : void 0,
				modes: e.passModes ? z : g,
				disabledModes: B,
				modeUnavailableReasons: $,
				modeHints: ye,
				placeholder: _,
				inputLabel: gt,
				modePlaceholders: Qt,
				commands: J,
				onCommand: Ce,
				onSearchDocuments: Oe,
				documentMenu: ke,
				onSearchPeople: L.mentions ? Te : void 0,
				mentionMembers: Ee,
				onMentionNonMember: De,
				disabled: ut,
				status: dt,
				hints: be,
				suggestions: ft,
				onSuggestion: pt,
				processes: Ze,
				onQuickOpen: Qe,
				onShellCommand: $e,
				sendOptions: L.sendOptions ? Ie : void 0,
				onSendOption: L.sendOptions ? Le : void 0,
				moreActions: zt.length ? zt : void 0,
				moreActionsLabel: He,
				submitLabel: Mt ? we : xe,
				maxInputHeight: mt,
				toolbarExtras: Ht,
				submitLead: Ge,
				modeRowEnd: Ke,
				modeRowStart: qe,
				...Yt ? { header: k } : {},
				sendWithReferencesOnly: Je,
				referencesAction: Ye,
				referenceDrop: Xe,
				draft: U,
				onDraftChange: G,
				onSend: Ft
			}, `${R}:${wt}`)] })
		})
	});
}
//#endregion
export { g as n, f as r, h as t };
