import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-D4QmbyEy.js";
import { n, t as r } from "./Button-C-I3BxWI.js";
import { t as i } from "./IconButton-Bf5Wy0tS.js";
import { S as a, c as o, m as s } from "./Icons-CqVFbuiZ.js";
import { t as ee } from "./Banner-400g6E1q.js";
import { t as te } from "./DropdownMenu-DP3rRjEd.js";
import { i as ne } from "./DecisionPath-ZneSRRKp.js";
import { t as re } from "./QuoteBlock-NVq2JJEM.js";
import { i as ie } from "./composerSendError-BTSwRiUg.js";
import { a as ae, i as oe, r as c } from "./composerContext-BLn1-Nao.js";
import { i as se, t as ce } from "./FloatingComposerDock-D10uQ4k3.js";
import { r as le } from "./RichChatComposer-B2Xmnqkg.js";
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
			toolbar: "editor",
			density: n === "document" ? "comfortable" : "compact",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			className: ge[t.kind]
		}
	});
}
function _({ look: e, context: c, mode: h, defaultMode: ge, onModeChange: g, modes: _, disabledModes: _e, modeUnavailableReasons: ve, placeholder: v, modePlaceholders: ye, modeHints: be, hints: xe, submitLabel: Se, contextChip: y = !0, onRemoveContext: b, references: Ce, onRemoveReference: x, commands: S, onCommand: we, workflows: Te, onWorkflow: C, workflowSubmitLabel: Ee = "Prepare run", onSearchPeople: De, mentionMembers: Oe, onMentionNonMember: ke, onSearchDocuments: Ae, documentMenu: je, allowAttachments: Me = !0, allowEmoji: Ne = !0, onRequestLink: Pe, privacy: Fe, onPrivacyChange: Ie, privacyLabels: Le, sendOptions: Re, onSendOption: ze, onShareDocument: Be, shareDocumentTestId: Ve, offline: He, onMakeDeck: Ue, makeDeckLabel: We = "Make a deck from this page", makeDeckTestId: Ge, moreActions: Ke, moreActionsLabel: qe = "Page actions", dock: Je, above: w, header: T, strip: E, task: D, reply: O, replacement: k, modelUnavailable: Ye, toolbarExtras: Xe, submitLead: Ze, modeRowEnd: Qe, modeRowStart: $e, sendWithReferencesOnly: et, referencesAction: tt, referenceDrop: nt, processes: rt, onQuickOpen: it, onShellCommand: at, draft: ot, onDraftChange: st, defaultDraft: ct, draftKey: lt, onSend: ut, identity: dt, expanded: ft, collapsible: A = !1, collapsedLabel: pt, responsive: mt, working: ht, console: gt = !0, disabled: _t, readOnly: j, status: vt, suggestions: yt, onSuggestion: bt, maxInputHeight: xt, composerRef: St, label: Ct, inputLabel: wt = "Message", className: Tt, "data-testid": M = "context-composer", composerTestId: Et }) {
	let { preset: N } = e, P = N.features, F = lt ?? `${c.kind}:${c.id}`, I = _ ?? N.modes, L = _e ?? N.disabledModes.filter((e) => I.includes(e)), [Dt, Ot] = d(() => {
		let e = ge ?? N.defaultMode;
		return I.includes(e) ? e : I.find((e) => !L.includes(e)) ?? e;
	}), R = h ?? Dt, kt = l((e) => {
		h === void 0 && Ot(e), g?.(e);
	}, [h, g]), [At, jt] = d(() => fe(ct)), [Mt, Nt] = d(0), [Pt, Ft] = d(F), [It, Lt] = d(!1), [Rt, z] = d(!1), B = ue(), zt = u(null), V = A && Rt && !k && !T;
	Pt !== F && (Ft(F), jt(fe(ct)), Nt(0), Lt(!1), z(!1));
	let H = ot !== void 0, U = H ? ot : At, W = u(U);
	W.current = U;
	let G = l((e, t) => {
		H || jt(e), st?.(e, t);
	}, [H, st]), K = P.workflows && Te ? Te : he, q = P.workflowCommand, Bt = l((e) => {
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
		} : ae(`/${e} `);
		G(n, W.current), Nt((e) => e + 1);
	}, [
		C,
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
	]), Vt = U?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ht = !!q && K.length > 0 && (U?.command?.trigger === q || Vt.toLowerCase().startsWith(`${q} `)), Y = u(null), Ut = l((e) => {
		Y.current = e, pe(St, e ? {
			...e,
			focus: () => {
				z(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [St]), Wt = () => {
		z(!1), requestAnimationFrame(() => Y.current?.focus());
	}, Gt = () => {
		Y.current?.editor?.commands.blur(), z(!0), requestAnimationFrame(() => zt.current?.focus());
	}, X = oe(dt), Kt = l((e) => {
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
	]), Z = P.contextChip && y !== !1 && !It ? typeof y == "string" ? y : N.chipLabel : null, Q = `context:${c.kind}:${c.id}`, qt = Z ? [{
		id: Q,
		label: Z,
		marker: "dot"
	}, ...Ce ?? []] : Ce, Jt = l((e) => {
		if (e === Q) {
			Lt(!0), b?.();
			return;
		}
		x?.(e);
	}, [
		Q,
		b,
		x
	]), $ = j != null && j !== !1, Yt = !$ && (!!x || !!Z && !!b), Xt = P.pageActions ? [...Ue ? [{
		label: "This page",
		items: [{
			label: We,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Ue,
			"data-testid": Ge ?? `${M}-make-deck`
		}]
	}] : [], ...Ke ?? []] : [], Zt = P.sendOptions && Be ? /* @__PURE__ */ p(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ p(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Be(e.currentTarget),
		"data-testid": Ve ?? `${M}-share-document`
	}) : null, Qt = K.length > 0 ? /* @__PURE__ */ p(te, {
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
			onSelect: () => Bt(e.id),
			"data-testid": `${M}-workflow-${e.id}`
		})) }]
	}) : null, $t = Qt || Zt || Xe != null ? /* @__PURE__ */ m(f, { children: [
		Qt,
		Zt,
		Xe
	] }) : void 0, en = P.modelUnavailable && Ye ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${M}-model-unavailable`,
		children: Ye
	}) : null, tn = P.offline && He ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${M}-offline`,
		children: He
	}) : null, nn = P.reply && O ? /* @__PURE__ */ p(re, {
		quote: {
			messageId: O.messageId ?? "",
			author: O.author,
			text: O.quote,
			...O.timestamp ? { timestamp: O.timestamp } : {}
		},
		...O.onDismiss ? { onDismiss: O.onDismiss } : {},
		...O.onJump && O.messageId ? { onJump: O.onJump } : {},
		"data-testid": `${M}-reply`
	}) : null, rn = !!(en || tn || nn || w != null && w !== !1), an = rn ? /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${M}-above`,
		children: [
			en,
			tn,
			w,
			nn
		]
	}) : void 0, on = P.taskStrip && D ? /* @__PURE__ */ p(ne, {
		label: D.label,
		status: D.status,
		...D.phase ? { phase: D.phase } : {},
		...D.percent === void 0 ? {} : { percent: D.percent },
		...D.onOpen ? { onOpen: D.onOpen } : {},
		...D.onStop ? { onStop: D.onStop } : {},
		...D.onDismiss ? { onDismiss: D.onDismiss } : {},
		"data-testid": `${M}-task`
	}) : null, sn = E != null && E !== !1 ? E : on, cn = T != null && T !== !1, ln = !!ft || rn || cn || sn != null, un = P.attachments === "chat-only" && R !== "chat", dn = {
		...N.modePlaceholders,
		...v ? { agent: v } : {},
		...ye
	}, fn = {
		...N.modeUnavailableReasons,
		...ve
	};
	return L.includes("agent") && fn.agent && !ye?.agent && !v && (dn.agent = fn.agent), /* @__PURE__ */ p(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ p(se, {
			label: Ct ?? N.regionLabel,
			"data-testid": M,
			className: t(e.className, Tt),
			above: V ? void 0 : an,
			strip: V ? void 0 : sn ?? void 0,
			composer: /* @__PURE__ */ m(f, { children: [
				Je != null && Je !== !1 && /* @__PURE__ */ p("div", {
					className: "shrink-0",
					"data-testid": `${M}-dock-slot`,
					children: Je
				}),
				V && /* @__PURE__ */ m(n, {
					ref: zt,
					variant: "ghost",
					size: "sm",
					onClick: Wt,
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
						Vt || U?.files.length ? /* @__PURE__ */ m("span", {
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
						ref: Ut,
						"data-testid": Et,
						mode: R,
						onModeChange: kt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: ln,
						...mt ? { responsive: mt } : {},
						modeShortcuts: !0,
						modeTriggers: !0,
						backdropTone: gt ? "auto" : "none",
						working: ht,
						allowAttachments: Me && !un,
						allowEmoji: P.emoji && Ne,
						onRequestLink: Pe,
						privacy: Fe,
						onPrivacyChange: Ie,
						privacyLabels: Le,
						references: qt,
						onRemoveReference: Yt ? Jt : void 0,
						modes: e.passModes ? I : _,
						disabledModes: L,
						modeUnavailableReasons: fn,
						modeHints: be,
						placeholder: v,
						inputLabel: wt,
						modePlaceholders: dn,
						commands: J,
						onCommand: we,
						onSearchDocuments: Ae,
						documentMenu: je,
						onSearchPeople: P.mentions ? De : void 0,
						mentionMembers: Oe,
						onMentionNonMember: ke,
						disabled: _t,
						...$ ? { readOnly: j } : {},
						status: vt,
						hints: xe,
						suggestions: yt,
						onSuggestion: bt,
						processes: rt,
						onQuickOpen: it,
						onShellCommand: at,
						sendOptions: P.sendOptions ? Re : void 0,
						onSendOption: P.sendOptions ? ze : void 0,
						moreActions: Xt.length ? Xt : void 0,
						moreActionsLabel: qe,
						submitLabel: Ht ? Ee : Se,
						maxInputHeight: xt,
						toolbarExtras: $t,
						submitLead: Ze,
						modeRowEnd: Qe != null || A ? /* @__PURE__ */ m(f, { children: [Qe, A && !T && /* @__PURE__ */ p(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": B,
							onClick: Gt,
							icon: /* @__PURE__ */ p(s, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${M}-collapse`
						})] }) : void 0,
						modeRowStart: $e,
						...cn ? { header: T } : {},
						sendWithReferencesOnly: et,
						referencesAction: tt,
						referenceDrop: nt,
						draft: U,
						onDraftChange: G,
						onSend: Kt
					}, `${F}:${Mt}`)
				})
			] })
		})
	});
}
//#endregion
export { _ as n, h as r, g as t };
