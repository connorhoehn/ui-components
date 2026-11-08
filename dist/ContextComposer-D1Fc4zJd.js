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
import { r as le } from "./RichChatComposer-DxTvhhb2.js";
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
			toolbar: e.toolbar ?? (n === "prompt" ? "prompt" : "editor"),
			density: n === "compact" ? "compact" : "comfortable",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			presentation: n === "prompt" ? "prompt" : "card",
			className: ge[t.kind]
		}
	});
}
function _({ look: e, context: c, mode: h, defaultMode: ge, onModeChange: g, modes: _, disabledModes: _e, modeUnavailableReasons: ve, placeholder: v, modePlaceholders: ye, modeHints: be, hints: xe, submitLabel: Se, contextChip: y = !0, onRemoveContext: Ce, references: we, onRemoveReference: b, commands: x, onCommand: Te, workflows: Ee, onWorkflow: S, workflowSubmitLabel: De = "Prepare run", onSearchPeople: Oe, mentionMembers: ke, onMentionNonMember: Ae, onSearchDocuments: je, documentMenu: Me, allowAttachments: Ne = !0, allowEmoji: Pe = !0, onRequestLink: Fe, privacy: Ie, onPrivacyChange: Le, privacyLabels: Re, sendOptions: ze, onSendOption: Be, onShareDocument: Ve, shareDocumentTestId: He, offline: Ue, onMakeDeck: We, makeDeckLabel: Ge = "Make a deck from this page", makeDeckTestId: Ke, moreActions: qe, moreActionsLabel: Je = "Page actions", dock: C, above: w, header: T, strip: E, task: D, reply: O, replacement: k, modelUnavailable: Ye, toolbarExtras: Xe, submitLead: Ze, modeRowEnd: Qe, modeRowStart: $e, sendWithReferencesOnly: et, referencesAction: tt, referenceDrop: nt, processes: rt, onQuickOpen: it, onShellCommand: at, draft: ot, onDraftChange: st, defaultDraft: ct, draftKey: lt, onSend: A, identity: ut, expanded: dt, collapsible: j = !1, collapsedLabel: ft, responsive: pt, working: mt, console: ht = !0, disabled: gt, readOnly: M, status: _t, suggestions: vt, onSuggestion: yt, suggestionsVisible: bt, maxInputHeight: xt, composerRef: St, label: Ct, inputLabel: wt = "Message", className: Tt, "data-testid": N = "context-composer", composerTestId: Et }) {
	let { preset: P } = e, F = P.features, I = lt ?? `${c.kind}:${c.id}`, L = _ ?? P.modes, R = _e ?? P.disabledModes.filter((e) => L.includes(e)), [Dt, Ot] = d(() => {
		let e = ge ?? P.defaultMode;
		return L.includes(e) ? e : L.find((e) => !R.includes(e)) ?? e;
	}), z = h ?? Dt, kt = l((e) => {
		h === void 0 && Ot(e), g?.(e);
	}, [h, g]), [At, jt] = d(() => fe(ct)), [Mt, Nt] = d(0), [Pt, Ft] = d(I), [It, Lt] = d(!1), [Rt, B] = d(!1), V = ue(), zt = u(null), H = j && Rt && !k && !T;
	Pt !== I && (Ft(I), jt(fe(ct)), Nt(0), Lt(!1), B(!1));
	let U = ot !== void 0, W = U ? ot : At, G = u(W);
	G.current = W;
	let K = l((e, t) => {
		U || jt(e), st?.(e, t);
	}, [U, st]), q = F.workflows && Ee ? Ee : he, J = F.workflowCommand, Bt = l((e) => {
		if (S) {
			S(e);
			return;
		}
		let t = q.find((t) => t.id === e), n = J && t ? {
			html: `<p>${me(`${J} ${t.label} `)}</p>`,
			files: G.current?.files ?? [],
			command: {
				trigger: J,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : ae(`/${e} `);
		K(n, G.current), Nt((e) => e + 1);
	}, [
		S,
		q,
		J,
		K
	]), Y = de(() => {
		if (!J || q.length === 0 || x?.some((e) => e.trigger === J)) return x;
		let e = {
			trigger: J,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ p(o, {
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
		return [...x ?? [], e];
	}, [
		x,
		q,
		J
	]), Vt = W?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ht = !!J && q.length > 0 && (W?.command?.trigger === J || Vt.toLowerCase().startsWith(`${J} `)), X = u(null), Ut = l((e) => {
		X.current = e, pe(St, e ? {
			...e,
			focus: () => {
				B(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [St]), Wt = () => {
		B(!1), requestAnimationFrame(() => X.current?.focus());
	}, Gt = () => {
		X.current?.editor?.commands.blur(), B(!0), requestAnimationFrame(() => zt.current?.focus());
	}, Z = oe(ut), Kt = l((e) => {
		let t = e;
		if (F.typedText) {
			let n = X.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ie(n, Y), i = r ? {
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
		return A(t, {
			mode: e.mode ?? z,
			context: c,
			...Z ? { author: Z } : {}
		});
	}, [
		F.typedText,
		Y,
		z,
		A,
		c,
		Z
	]), Q = e.presentation === "prompt", qt = l((e) => A({
		html: "",
		text: e.trigger,
		mentions: [],
		files: [],
		privacy: "visible",
		command: { trigger: e.trigger },
		mode: z
	}, {
		mode: z,
		context: c,
		...Z ? { author: Z } : {}
	}), [
		A,
		z,
		c,
		Z
	]), Jt = F.contextChip && y !== !1 && !It ? typeof y == "string" ? y : P.chipLabel : null, Yt = `context:${c.kind}:${c.id}`, Xt = Jt ? [{
		id: Yt,
		label: Jt,
		marker: "dot"
	}, ...we ?? []] : we, Zt = l((e) => {
		if (e === Yt) {
			Lt(!0), Ce?.();
			return;
		}
		b?.(e);
	}, [
		Yt,
		Ce,
		b
	]), $ = M != null && M !== !1, Qt = !$ && (!!b || !!Jt && !!Ce), $t = F.pageActions ? [...We ? [{
		label: "This page",
		items: [{
			label: Ge,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: We,
			"data-testid": Ke ?? `${N}-make-deck`
		}]
	}] : [], ...qe ?? []] : [], en = F.sendOptions && Ve ? /* @__PURE__ */ p(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ p(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Ve(e.currentTarget),
		"data-testid": He ?? `${N}-share-document`
	}) : null, tn = q.length > 0 ? /* @__PURE__ */ p(te, {
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
		triggerTestId: `${N}-workflow`,
		disabled: $ || !!gt,
		sections: [{ items: q.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: W?.command?.trigger === J && W?.command?.argument?.id === e.id,
			onSelect: () => Bt(e.id),
			"data-testid": `${N}-workflow-${e.id}`
		})) }]
	}) : null, nn = tn || en || Xe != null ? /* @__PURE__ */ m(f, { children: [
		tn,
		en,
		Xe
	] }) : void 0, rn = F.modelUnavailable && Ye ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${N}-model-unavailable`,
		children: Ye
	}) : null, an = F.offline && Ue ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${N}-offline`,
		children: Ue
	}) : null, on = F.reply && O ? /* @__PURE__ */ p(re, {
		quote: {
			messageId: O.messageId ?? "",
			author: O.author,
			text: O.quote,
			...O.timestamp ? { timestamp: O.timestamp } : {}
		},
		...O.onDismiss ? { onDismiss: O.onDismiss } : {},
		...O.onJump && O.messageId ? { onJump: O.onJump } : {},
		"data-testid": `${N}-reply`
	}) : null, sn = !!(rn || an || on || w != null && w !== !1), cn = sn ? /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${N}-above`,
		children: [
			rn,
			an,
			w,
			on
		]
	}) : void 0, ln = F.taskStrip && D ? /* @__PURE__ */ p(ne, {
		label: D.label,
		status: D.status,
		...D.phase ? { phase: D.phase } : {},
		...D.percent === void 0 ? {} : { percent: D.percent },
		...D.onOpen ? { onOpen: D.onOpen } : {},
		...D.onStop ? { onStop: D.onStop } : {},
		...D.onDismiss ? { onDismiss: D.onDismiss } : {},
		"data-testid": `${N}-task`
	}) : null, un = E != null && E !== !1 ? E : ln, dn = T != null && T !== !1, fn = !!dt || sn || dn || un != null, pn = F.attachments === "chat-only" && z !== "chat", mn = {
		...P.modePlaceholders,
		...v ? { agent: v } : {},
		...ye
	}, hn = {
		...P.modeUnavailableReasons,
		...ve
	};
	return R.includes("agent") && hn.agent && !ye?.agent && !v && (mn.agent = hn.agent), /* @__PURE__ */ p(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ p(se, {
			label: Ct ?? P.regionLabel,
			"data-testid": N,
			className: t(e.className, Tt),
			above: H ? void 0 : cn,
			strip: H ? void 0 : un ?? void 0,
			composer: /* @__PURE__ */ m(f, { children: [
				C != null && C !== !1 && /* @__PURE__ */ p("div", {
					className: "shrink-0",
					"data-testid": `${N}-dock-slot`,
					children: C
				}),
				H && /* @__PURE__ */ m(n, {
					ref: zt,
					variant: "ghost",
					size: "sm",
					onClick: Wt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": V,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-testid": `${N}-expand`,
					children: [
						/* @__PURE__ */ p("span", {
							className: "shrink-0 font-semibold",
							children: z === "agent" ? "Agent" : z === "chat" ? "Chat" : z === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ p("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: ft || c.title || "Write a message…"
						}),
						Vt || W?.files.length ? /* @__PURE__ */ m("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", W?.files.length ? ` · ${W.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ p(s, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ p("div", {
					id: V,
					hidden: H,
					children: k != null && k !== !1 ? k : /* @__PURE__ */ p(le, {
						ref: Ut,
						"data-testid": Et,
						mode: z,
						onModeChange: kt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: fn,
						...pt ? { responsive: pt } : {},
						modeShortcuts: !Q,
						modeTriggers: !Q,
						...Q ? {
							presentation: "prompt",
							onCommandPick: qt
						} : {},
						backdropTone: ht ? "auto" : "none",
						working: mt,
						allowAttachments: Ne && !pn,
						allowEmoji: F.emoji && Pe,
						onRequestLink: Fe,
						privacy: Ie,
						onPrivacyChange: Le,
						privacyLabels: Re,
						references: Xt,
						onRemoveReference: Qt ? Zt : void 0,
						modes: e.passModes ? L : _,
						disabledModes: R,
						modeUnavailableReasons: hn,
						modeHints: be,
						placeholder: v,
						inputLabel: wt,
						modePlaceholders: mn,
						commands: Y,
						onCommand: Te,
						onSearchDocuments: je,
						documentMenu: Me,
						onSearchPeople: F.mentions ? Oe : void 0,
						mentionMembers: ke,
						onMentionNonMember: Ae,
						disabled: gt,
						...$ ? { readOnly: M } : {},
						status: _t,
						hints: xe,
						suggestions: vt,
						onSuggestion: yt,
						...bt ? { suggestionsVisible: bt } : {},
						processes: rt,
						onQuickOpen: it,
						onShellCommand: at,
						sendOptions: F.sendOptions ? ze : void 0,
						onSendOption: F.sendOptions ? Be : void 0,
						moreActions: $t.length ? $t : void 0,
						moreActionsLabel: Je,
						submitLabel: Ht ? De : Se,
						maxInputHeight: xt,
						toolbarExtras: nn,
						submitLead: Ze,
						modeRowEnd: Qe != null || j ? /* @__PURE__ */ m(f, { children: [Qe, j && !T && /* @__PURE__ */ p(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": V,
							onClick: Gt,
							icon: /* @__PURE__ */ p(s, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${N}-collapse`
						})] }) : void 0,
						modeRowStart: $e,
						...dn ? { header: T } : {},
						sendWithReferencesOnly: et,
						referencesAction: tt,
						referenceDrop: nt,
						draft: W,
						onDraftChange: K,
						onSend: Kt
					}, `${I}:${Mt}`)
				})
			] })
		})
	});
}
//#endregion
export { _ as n, h as r, g as t };
