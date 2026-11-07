import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { n, t as r } from "./Button-C-I3BxWI.js";
import { t as i } from "./IconButton-Bf5Wy0tS.js";
import { S as a, c as o, m as s } from "./Icons-CqVFbuiZ.js";
import { t as ee } from "./Banner-400g6E1q.js";
import { t as te } from "./DropdownMenu-DP3rRjEd.js";
import { i as ne } from "./DecisionPath-BC9qttuI.js";
import { t as re } from "./QuoteBlock-NVq2JJEM.js";
import { i as ie } from "./composerSendError-BTSwRiUg.js";
import { a as ae, i as oe, r as c } from "./composerContext-BLn1-Nao.js";
import { i as se, t as ce } from "./FloatingComposerDock-D10uQ4k3.js";
import { r as le } from "./RichChatComposer-DvLdanaL.js";
import { useCallback as l, useId as ue, useMemo as de, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var h = /* @__PURE__ */ e({
	ContextComposer: () => g,
	ContextComposerBase: () => _,
	default: () => g
});
function fe(e) {
	return typeof e == "string" || e === void 0 ? ae(e ?? "") : e;
}
function pe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function me(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var he = [], ge = { conversation: "bg-transparent [--dock-inset:0px]" };
function g(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, o = de(() => c(t, {
		terminal: !!r,
		...a === void 0 ? {} : { chat: a },
		...i ? { agentUnavailableReason: i } : {}
	}), [
		t,
		r,
		a,
		i
	]);
	return /* @__PURE__ */ p(_, {
		...e,
		look: {
			preset: o,
			toolbar: e.toolbar ?? "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: ge[t.kind]
		}
	});
}
function _({ look: e, context: c, mode: h, defaultMode: ge, onModeChange: g, modes: _, disabledModes: _e, modeUnavailableReasons: ve, placeholder: v, modePlaceholders: ye, modeHints: be, hints: xe, submitLabel: Se, contextChip: y = !0, onRemoveContext: b, references: Ce, onRemoveReference: x, commands: S, onCommand: we, workflows: Te, onWorkflow: Ee, workflowSubmitLabel: De = "Prepare run", onSearchPeople: Oe, mentionMembers: ke, onMentionNonMember: Ae, onSearchDocuments: je, documentMenu: Me, allowAttachments: Ne = !0, allowEmoji: Pe = !0, onRequestLink: Fe, privacy: Ie, onPrivacyChange: Le, privacyLabels: Re, sendOptions: ze, onSendOption: Be, onShareDocument: Ve, shareDocumentTestId: He, offline: Ue, onMakeDeck: We, makeDeckLabel: Ge = "Make a deck from this page", makeDeckTestId: Ke, moreActions: qe, moreActionsLabel: Je = "Page actions", dock: C, above: w, header: T, strip: E, task: D, reply: O, replacement: k, modelUnavailable: Ye, toolbarExtras: Xe, submitLead: Ze, modeRowEnd: Qe, modeRowStart: $e, sendWithReferencesOnly: et, referencesAction: tt, referenceDrop: nt, processes: rt, onQuickOpen: it, onShellCommand: at, draft: ot, onDraftChange: st, defaultDraft: ct, draftKey: lt, onSend: ut, identity: dt, expanded: ft, collapsible: A = !1, collapsedLabel: pt, responsive: mt, working: ht, console: gt = !0, disabled: _t, readOnly: j, status: vt, suggestions: yt, onSuggestion: bt, suggestionsVisible: xt, maxInputHeight: St, composerRef: Ct, label: wt, inputLabel: Tt = "Message", className: Et, "data-testid": M = "context-composer", composerTestId: Dt }) {
	let { preset: N } = e, P = N.features, F = lt ?? `${c.kind}:${c.id}`, I = _ ?? N.modes, L = _e ?? N.disabledModes.filter((e) => I.includes(e)), [Ot, kt] = d(() => {
		let e = ge ?? N.defaultMode;
		return I.includes(e) ? e : I.find((e) => !L.includes(e)) ?? e;
	}), R = h ?? Ot, At = l((e) => {
		h === void 0 && kt(e), g?.(e);
	}, [h, g]), [jt, Mt] = d(() => fe(ct)), [Nt, Pt] = d(0), [Ft, It] = d(F), [Lt, Rt] = d(!1), [zt, z] = d(!1), B = ue(), Bt = u(null), V = A && zt && !k && !T;
	Ft !== F && (It(F), Mt(fe(ct)), Pt(0), Rt(!1), z(!1));
	let H = ot !== void 0, U = H ? ot : jt, W = u(U);
	W.current = U;
	let G = l((e, t) => {
		H || Mt(e), st?.(e, t);
	}, [H, st]), K = P.workflows && Te ? Te : he, q = P.workflowCommand, Vt = l((e) => {
		if (Ee) {
			Ee(e);
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
		} : ae(`/${e} `);
		G(n, W.current), Pt((e) => e + 1);
	}, [
		Ee,
		K,
		q,
		G
	]), J = de(() => {
		if (!q || K.length === 0 || S?.some((e) => e.trigger === q)) return S;
		let e = {
			trigger: q,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ p(o, {
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
	]), Ht = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ut = !!q && K.length > 0 && (U?.command?.trigger === q || Ht.toLowerCase().startsWith(`${q} `)), Y = u(null), Wt = l((e) => {
		Y.current = e, pe(Ct, e ? {
			...e,
			focus: () => {
				z(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [Ct]), Gt = () => {
		z(!1), requestAnimationFrame(() => Y.current?.focus());
	}, Kt = () => {
		Y.current?.editor?.commands.blur(), z(!0), requestAnimationFrame(() => Bt.current?.focus());
	}, X = oe(dt), qt = l((e) => {
		let t = e;
		if (P.typedText) {
			let n = Y.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ie(n, J), i = r ? {
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
		return ut(t, {
			mode: e.mode ?? R,
			context: c,
			...X ? { author: X } : {}
		});
	}, [
		P.typedText,
		J,
		R,
		ut,
		c,
		X
	]), Z = P.contextChip && y !== !1 && !Lt ? typeof y == "string" ? y : N.chipLabel : null, Q = `context:${c.kind}:${c.id}`, Jt = Z ? [{
		id: Q,
		label: Z,
		marker: "dot"
	}, ...Ce ?? []] : Ce, Yt = l((e) => {
		if (e === Q) {
			Rt(!0), b?.();
			return;
		}
		x?.(e);
	}, [
		Q,
		b,
		x
	]), $ = j != null && j !== !1, Xt = !$ && (!!x || !!Z && !!b), Zt = P.pageActions ? [...We ? [{
		label: "This page",
		items: [{
			label: Ge,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: We,
			"data-testid": Ke ?? `${M}-make-deck`
		}]
	}] : [], ...qe ?? []] : [], Qt = P.sendOptions && Ve ? /* @__PURE__ */ p(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ p(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Ve(e.currentTarget),
		"data-testid": He ?? `${M}-share-document`
	}) : null, $t = K.length > 0 ? /* @__PURE__ */ p(te, {
		trigger: /* @__PURE__ */ m("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ p(o, {
					size: 14,
					"aria-hidden": !0
				}),
				"Workflow",
				/* @__PURE__ */ p(s, {
					dir: "down",
					size: 14,
					"aria-hidden": !0
				})
			]
		}),
		triggerLabel: "Workflow",
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${r}`,
		triggerTestId: `${M}-workflow`,
		disabled: $ || !!_t,
		sections: [{ items: K.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: U?.command?.trigger === q && U?.command?.argument?.id === e.id,
			onSelect: () => Vt(e.id),
			"data-testid": `${M}-workflow-${e.id}`
		})) }]
	}) : null, en = $t || Qt || Xe != null ? /* @__PURE__ */ m(f, { children: [
		$t,
		Qt,
		Xe
	] }) : void 0, tn = P.modelUnavailable && Ye ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${M}-model-unavailable`,
		children: Ye
	}) : null, nn = P.offline && Ue ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${M}-offline`,
		children: Ue
	}) : null, rn = P.reply && O ? /* @__PURE__ */ p(re, {
		quote: {
			messageId: O.messageId ?? "",
			author: O.author,
			text: O.quote,
			...O.timestamp ? { timestamp: O.timestamp } : {}
		},
		...O.onDismiss ? { onDismiss: O.onDismiss } : {},
		...O.onJump && O.messageId ? { onJump: O.onJump } : {},
		"data-testid": `${M}-reply`
	}) : null, an = !!(tn || nn || rn || w != null && w !== !1), on = an ? /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${M}-above`,
		children: [
			tn,
			nn,
			w,
			rn
		]
	}) : void 0, sn = P.taskStrip && D ? /* @__PURE__ */ p(ne, {
		label: D.label,
		status: D.status,
		...D.phase ? { phase: D.phase } : {},
		...D.percent === void 0 ? {} : { percent: D.percent },
		...D.onOpen ? { onOpen: D.onOpen } : {},
		...D.onStop ? { onStop: D.onStop } : {},
		...D.onDismiss ? { onDismiss: D.onDismiss } : {},
		"data-testid": `${M}-task`
	}) : null, cn = E != null && E !== !1 ? E : sn, ln = T != null && T !== !1, un = !!ft || an || ln || cn != null, dn = P.attachments === "chat-only" && R !== "chat", fn = {
		...N.modePlaceholders,
		...v ? { agent: v } : {},
		...ye
	}, pn = {
		...N.modeUnavailableReasons,
		...ve
	};
	return L.includes("agent") && pn.agent && !ye?.agent && !v && (fn.agent = pn.agent), /* @__PURE__ */ p(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ p(se, {
			label: wt ?? N.regionLabel,
			"data-testid": M,
			className: t(e.className, Et),
			above: V ? void 0 : on,
			strip: V ? void 0 : cn ?? void 0,
			composer: /* @__PURE__ */ m(f, { children: [
				C != null && C !== !1 && /* @__PURE__ */ p("div", {
					className: "shrink-0",
					"data-testid": `${M}-dock-slot`,
					children: C
				}),
				V && /* @__PURE__ */ m(n, {
					ref: Bt,
					variant: "ghost",
					size: "sm",
					onClick: Gt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": B,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-testid": `${M}-expand`,
					children: [
						/* @__PURE__ */ p("span", {
							className: "shrink-0 font-semibold",
							children: R === "agent" ? "Agent" : R === "chat" ? "Chat" : R === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ p("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: pt || c.title || "Write a message…"
						}),
						Ht || U?.files.length ? /* @__PURE__ */ m("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", U?.files.length ? ` · ${U.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ p(s, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ p("div", {
					id: B,
					hidden: V,
					children: k != null && k !== !1 ? k : /* @__PURE__ */ p(le, {
						ref: Wt,
						"data-testid": Dt,
						mode: R,
						onModeChange: At,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: un,
						...mt ? { responsive: mt } : {},
						modeShortcuts: !0,
						modeTriggers: !0,
						backdropTone: gt ? "auto" : "none",
						working: ht,
						allowAttachments: Ne && !dn,
						allowEmoji: P.emoji && Pe,
						onRequestLink: Fe,
						privacy: Ie,
						onPrivacyChange: Le,
						privacyLabels: Re,
						references: Jt,
						onRemoveReference: Xt ? Yt : void 0,
						modes: e.passModes ? I : _,
						disabledModes: L,
						modeUnavailableReasons: pn,
						modeHints: be,
						placeholder: v,
						inputLabel: Tt,
						modePlaceholders: fn,
						commands: J,
						onCommand: we,
						onSearchDocuments: je,
						documentMenu: Me,
						onSearchPeople: P.mentions ? Oe : void 0,
						mentionMembers: ke,
						onMentionNonMember: Ae,
						disabled: _t,
						...$ ? { readOnly: j } : {},
						status: vt,
						hints: xe,
						suggestions: yt,
						onSuggestion: bt,
						...xt ? { suggestionsVisible: xt } : {},
						processes: rt,
						onQuickOpen: it,
						onShellCommand: at,
						sendOptions: P.sendOptions ? ze : void 0,
						onSendOption: P.sendOptions ? Be : void 0,
						moreActions: Zt.length ? Zt : void 0,
						moreActionsLabel: Je,
						submitLabel: Ut ? De : Se,
						maxInputHeight: St,
						toolbarExtras: en,
						submitLead: Ze,
						modeRowEnd: Qe != null || A ? /* @__PURE__ */ m(f, { children: [Qe, A && !T && /* @__PURE__ */ p(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": B,
							onClick: Kt,
							icon: /* @__PURE__ */ p(s, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${M}-collapse`
						})] }) : void 0,
						modeRowStart: $e,
						...ln ? { header: T } : {},
						sendWithReferencesOnly: et,
						referencesAction: tt,
						referenceDrop: nt,
						draft: U,
						onDraftChange: G,
						onSend: qt
					}, `${F}:${Nt}`)
				})
			] })
		})
	});
}
//#endregion
export { _ as n, h as r, g as t };
