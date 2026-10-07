import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { t as n } from "./Button-C2OEUpX-.js";
import { t as r } from "./IconButton-VqtspsS5.js";
import { S as i, c as a, m as ee } from "./Icons-B_xESAH3.js";
import { t as te } from "./Banner-8ngXUtJu.js";
import { r as ne } from "./TaskStrip-BcMWCOfO.js";
import { t as re } from "./DropdownMenu-BS-H0H0p.js";
import { t as ie } from "./QuoteBlock-qqQqscMP.js";
import { i as ae } from "./composerSendError-CMnZJzVf.js";
import { a as oe, i as se, r as o } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-ZezHreIm.js";
import { r as ue } from "./RichChatComposer-DmlYix9q.js";
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
function g({ look: e, context: o, mode: f, defaultMode: m, onModeChange: h, modes: g, disabledModes: ge, modeUnavailableReasons: _e, placeholder: _, modePlaceholders: ve, modeHints: ye, hints: be, submitLabel: xe, contextChip: v = !0, onRemoveContext: y, references: b, onRemoveReference: x, commands: S, onCommand: Se, workflows: C, onWorkflow: w, workflowSubmitLabel: Ce = "Prepare run", onSearchPeople: we, mentionMembers: Te, onMentionNonMember: Ee, onSearchDocuments: De, documentMenu: Oe, allowAttachments: ke = !0, allowEmoji: Ae = !0, onRequestLink: je, privacy: Me, onPrivacyChange: Ne, privacyLabels: Pe, sendOptions: Fe, onSendOption: Ie, onShareDocument: T, shareDocumentTestId: Le, offline: E, onMakeDeck: Re, makeDeckLabel: ze = "Make a deck from this page", makeDeckTestId: Be, moreActions: Ve, moreActionsLabel: He = "Page actions", dock: D, above: O, strip: k, task: A, reply: j, replacement: M, modelUnavailable: Ue, toolbarExtras: We, submitLead: Ge, modeRowEnd: Ke, modeRowStart: qe, sendWithReferencesOnly: Je, referencesAction: Ye, referenceDrop: Xe, processes: Ze, onQuickOpen: Qe, onShellCommand: $e, draft: et, onDraftChange: tt, defaultDraft: nt, draftKey: rt, onSend: it, identity: at, expanded: ot, working: st, console: ct = !0, disabled: lt, status: ut, suggestions: dt, onSuggestion: ft, maxInputHeight: pt, composerRef: mt, label: ht, inputLabel: gt = "Message", className: _t, "data-testid": N = "context-composer", composerTestId: vt }) {
	let { preset: P } = e, F = P.features, I = rt ?? `${o.kind}:${o.id}`, L = g ?? P.modes, R = ge ?? P.disabledModes.filter((e) => L.includes(e)), [yt, bt] = l(() => {
		let e = m ?? P.defaultMode;
		return L.includes(e) ? e : L.find((e) => !R.includes(e)) ?? e;
	}), z = f ?? yt, xt = s((e) => {
		f === void 0 && bt(e), h?.(e);
	}, [f, h]), [St, B] = l(() => p(nt)), [Ct, V] = l(0), [wt, Tt] = l(I), [Et, Dt] = l(!1);
	wt !== I && (Tt(I), B(p(nt)), V(0), Dt(!1));
	let H = et !== void 0, U = H ? et : St, W = de(U);
	W.current = U;
	let G = s((e, t) => {
		H || B(e), tt?.(e, t);
	}, [H, tt]), K = F.workflows && C ? C : he, q = F.workflowCommand, Ot = s((e) => {
		if (w) {
			w(e);
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
		G(n, W.current), V((e) => e + 1);
	}, [
		w,
		K,
		q,
		G
	]), J = c(() => {
		if (!q || K.length === 0 || S?.some((e) => e.trigger === q)) return S;
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
		return [...S ?? [], e];
	}, [
		S,
		K,
		q
	]), kt = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", At = !!q && K.length > 0 && (U?.command?.trigger === q || kt.toLowerCase().startsWith(`${q} `)), jt = de(null), Mt = s((e) => {
		jt.current = e, pe(mt, e);
	}, [mt]), Y = se(at), Nt = s((e) => {
		let t = e;
		if (F.typedText) {
			let n = jt.current?.editor?.getText();
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
			mode: e.mode ?? z,
			context: o,
			...Y ? { author: Y } : {}
		});
	}, [
		F.typedText,
		J,
		z,
		it,
		o,
		Y
	]), X = F.contextChip && v !== !1 && !Et ? typeof v == "string" ? v : P.chipLabel : null, Z = `context:${o.kind}:${o.id}`, Pt = X ? [{
		id: Z,
		label: X,
		marker: "dot"
	}, ...b ?? []] : b, Ft = s((e) => {
		if (e === Z) {
			Dt(!0), y?.();
			return;
		}
		x?.(e);
	}, [
		Z,
		y,
		x
	]), It = !!x || !!X && !!y, Lt = F.pageActions ? [...Re ? [{
		label: "This page",
		items: [{
			label: ze,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Re,
			"data-testid": Be ?? `${N}-make-deck`
		}]
	}] : [], ...Ve ?? []] : [], Rt = F.sendOptions && T ? /* @__PURE__ */ u(r, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ u(i, { size: 14 }),
		onClick: (e) => T(e.currentTarget),
		"data-testid": Le ?? `${N}-share-document`
	}) : null, Q = K.length > 0 ? /* @__PURE__ */ u(re, {
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
		triggerTestId: `${N}-workflow`,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => Ot(e.id),
			"data-testid": `${N}-workflow-${e.id}`
		})) }]
	}) : null, zt = Q || Rt || We != null ? /* @__PURE__ */ d(fe, { children: [
		Q,
		Rt,
		We
	] }) : void 0, Bt = F.modelUnavailable && Ue ? /* @__PURE__ */ u(te, {
		variant: "warning",
		"data-testid": `${N}-model-unavailable`,
		children: Ue
	}) : null, Vt = F.offline && E ? /* @__PURE__ */ u(te, {
		variant: "warning",
		"data-testid": `${N}-offline`,
		children: E
	}) : null, Ht = F.reply && j ? /* @__PURE__ */ u(ie, {
		quote: {
			messageId: j.messageId ?? "",
			author: j.author,
			text: j.quote,
			...j.timestamp ? { timestamp: j.timestamp } : {}
		},
		...j.onDismiss ? { onDismiss: j.onDismiss } : {},
		...j.onJump && j.messageId ? { onJump: j.onJump } : {},
		"data-testid": `${N}-reply`
	}) : null, Ut = !!(Bt || Vt || Ht || O != null && O !== !1), Wt = Ut ? /* @__PURE__ */ d("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${N}-above`,
		children: [
			Bt,
			Vt,
			O,
			Ht
		]
	}) : void 0, Gt = F.taskStrip && A ? /* @__PURE__ */ u(ne, {
		label: A.label,
		status: A.status,
		...A.phase ? { phase: A.phase } : {},
		...A.percent === void 0 ? {} : { percent: A.percent },
		...A.onOpen ? { onOpen: A.onOpen } : {},
		...A.onStop ? { onStop: A.onStop } : {},
		...A.onDismiss ? { onDismiss: A.onDismiss } : {},
		"data-testid": `${N}-task`
	}) : null, Kt = k != null && k !== !1 ? k : Gt, qt = !!ot || Ut || Kt != null, Jt = F.attachments === "chat-only" && z !== "chat", Yt = {
		...P.modePlaceholders,
		..._ ? { agent: _ } : {},
		...ve
	}, $ = {
		...P.modeUnavailableReasons,
		..._e
	};
	return R.includes("agent") && $.agent && !ve?.agent && !_ && (Yt.agent = $.agent), /* @__PURE__ */ u(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ u(ce, {
			label: ht ?? P.regionLabel,
			"data-testid": N,
			className: t(e.className, _t),
			above: Wt,
			strip: Kt ?? void 0,
			composer: /* @__PURE__ */ d(fe, { children: [D != null && D !== !1 && /* @__PURE__ */ u("div", {
				className: "shrink-0",
				"data-testid": `${N}-dock-slot`,
				children: D
			}), M != null && M !== !1 ? M : /* @__PURE__ */ u(ue, {
				ref: Mt,
				"data-testid": vt,
				mode: z,
				onModeChange: xt,
				modeControl: "menu",
				singleModeLabel: !!e.singleModeLabel,
				layout: "auto",
				toolbar: e.toolbar,
				density: e.density,
				collapseWhenIdle: e.collapseWhenIdle,
				expanded: qt,
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: ct ? "auto" : "none",
				working: st,
				allowAttachments: ke && !Jt,
				allowEmoji: F.emoji && Ae,
				onRequestLink: je,
				privacy: Me,
				onPrivacyChange: Ne,
				privacyLabels: Pe,
				references: Pt,
				onRemoveReference: It ? Ft : void 0,
				modes: e.passModes ? L : g,
				disabledModes: R,
				modeUnavailableReasons: $,
				modeHints: ye,
				placeholder: _,
				inputLabel: gt,
				modePlaceholders: Yt,
				commands: J,
				onCommand: Se,
				onSearchDocuments: De,
				documentMenu: Oe,
				onSearchPeople: F.mentions ? we : void 0,
				mentionMembers: Te,
				onMentionNonMember: Ee,
				disabled: lt,
				status: ut,
				hints: be,
				suggestions: dt,
				onSuggestion: ft,
				processes: Ze,
				onQuickOpen: Qe,
				onShellCommand: $e,
				sendOptions: F.sendOptions ? Fe : void 0,
				onSendOption: F.sendOptions ? Ie : void 0,
				moreActions: Lt.length ? Lt : void 0,
				moreActionsLabel: He,
				submitLabel: At ? Ce : xe,
				maxInputHeight: pt,
				toolbarExtras: zt,
				submitLead: Ge,
				modeRowEnd: Ke,
				modeRowStart: qe,
				sendWithReferencesOnly: Je,
				referencesAction: Ye,
				referenceDrop: Xe,
				draft: U,
				onDraftChange: G,
				onSend: Nt
			}, `${I}:${Ct}`)] })
		})
	});
}
//#endregion
export { g as n, f as r, h as t };
