import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { d as t, n, t as r } from "./Button-DQoeE5dN.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { S as a, c as o, m as s } from "./Icons-CqVFbuiZ.js";
import { t as ee } from "./Banner-DPR4sIxI.js";
import { t as te } from "./DropdownMenu-DoCRgXx4.js";
import { i as ne } from "./DecisionPath-CUrGXMTf.js";
import { t as re } from "./QuoteBlock-Dks53Idi.js";
import { i as ie } from "./composerSendError-vB7M56RD.js";
import { a as ae, i as oe, r as c } from "./composerContext-BLn1-Nao.js";
import { i as se, t as ce } from "./FloatingComposerDock-DbxmNCal.js";
import { r as le } from "./RichChatComposer-BTpLwFVg.js";
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
function _({ look: e, context: c, mode: h, defaultMode: ge, onModeChange: g, modes: _, disabledModes: _e, modeUnavailableReasons: ve, placeholder: v, modePlaceholders: ye, modeHints: be, hints: xe, submitLabel: Se, contextChip: y = !0, onRemoveContext: b, references: Ce, onRemoveReference: x, commands: S, onCommand: we, workflows: Te, onWorkflow: Ee, workflowSubmitLabel: De = "Prepare run", onSearchPeople: Oe, mentionMembers: ke, onMentionNonMember: Ae, onSearchDocuments: je, documentMenu: Me, allowAttachments: Ne = !0, allowEmoji: Pe = !0, onRequestLink: Fe, privacy: Ie, onPrivacyChange: Le, privacyLabels: Re, sendOptions: ze, onSendOption: Be, onShareDocument: Ve, shareDocumentTestId: He, offline: Ue, onMakeDeck: We, makeDeckLabel: Ge = "Make a deck from this page", makeDeckTestId: Ke, moreActions: qe, moreActionsLabel: Je = "Page actions", dock: C, above: w, foldingAbove: T, header: E, strip: D, task: O, reply: k, replacement: A, modelUnavailable: Ye, toolbarExtras: Xe, submitLead: Ze, modeRowEnd: Qe, modeRowStart: $e, sendWithReferencesOnly: et, referencesAction: tt, referenceDrop: nt, processes: rt, onQuickOpen: it, onShellCommand: at, draft: ot, onDraftChange: st, defaultDraft: ct, draftKey: lt, onSend: j, identity: ut, expanded: dt, collapsible: M = !1, collapsedLabel: ft, responsive: pt, working: mt, console: ht = !0, disabled: gt, readOnly: N, status: _t, suggestions: vt, onSuggestion: yt, suggestionsVisible: bt, maxInputHeight: xt, composerRef: St, label: Ct, inputLabel: wt = "Message", className: Tt, "data-testid": P = "context-composer", composerTestId: Et }) {
	let { preset: F } = e, I = F.features, L = lt ?? `${c.kind}:${c.id}`, R = _ ?? F.modes, z = _e ?? F.disabledModes.filter((e) => R.includes(e)), [Dt, Ot] = d(() => {
		let e = ge ?? F.defaultMode;
		return R.includes(e) ? e : R.find((e) => !z.includes(e)) ?? e;
	}), B = h ?? Dt, kt = l((e) => {
		h === void 0 && Ot(e), g?.(e);
	}, [h, g]), [At, jt] = d(() => fe(ct)), [Mt, Nt] = d(0), [Pt, Ft] = d(L), [It, Lt] = d(!1), [Rt, V] = d(!1), H = ue(), zt = u(null), U = M && Rt && !A && !E;
	Pt !== L && (Ft(L), jt(fe(ct)), Nt(0), Lt(!1), V(!1));
	let W = ot !== void 0, G = W ? ot : At, K = u(G);
	K.current = G;
	let q = l((e, t) => {
		W || jt(e), st?.(e, t);
	}, [W, st]), J = I.workflows && Te ? Te : he, Y = I.workflowCommand, Bt = l((e) => {
		if (Ee) {
			Ee(e);
			return;
		}
		let t = J.find((t) => t.id === e), n = Y && t ? {
			html: `<p>${me(`${Y} ${t.label} `)}</p>`,
			files: K.current?.files ?? [],
			command: {
				trigger: Y,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : ae(`/${e} `);
		q(n, K.current), Nt((e) => e + 1);
	}, [
		Ee,
		J,
		Y,
		q
	]), X = de(() => {
		if (!Y || J.length === 0 || S?.some((e) => e.trigger === Y)) return S;
		let e = {
			trigger: Y,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ p(o, {
				size: 14,
				"aria-hidden": !0
			}),
			argument: {
				placeholder: "Choose a workflow",
				search: (e) => J.filter((t) => !t.disabled && t.label.toLowerCase().includes(e.trim().toLowerCase())).map((e) => ({
					id: e.id,
					label: e.label,
					...e.description ? { hint: e.description } : {}
				}))
			}
		};
		return [...S ?? [], e];
	}, [
		S,
		J,
		Y
	]), Vt = G?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Ht = !!Y && J.length > 0 && (G?.command?.trigger === Y || Vt.toLowerCase().startsWith(`${Y} `)), Z = u(null), Ut = l((e) => {
		Z.current = e, pe(St, e ? {
			...e,
			focus: () => {
				V(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [St]), Wt = () => {
		V(!1), requestAnimationFrame(() => Z.current?.focus());
	}, Gt = () => {
		Z.current?.editor?.commands.blur(), V(!0), requestAnimationFrame(() => zt.current?.focus());
	}, Q = oe(ut), Kt = l((e) => {
		let t = e;
		if (I.typedText) {
			let n = Z.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ie(n, X), i = r ? {
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
		return j(t, {
			mode: e.mode ?? B,
			context: c,
			...Q ? { author: Q } : {}
		});
	}, [
		I.typedText,
		X,
		B,
		j,
		c,
		Q
	]), qt = e.presentation === "prompt", Jt = l((e) => j({
		html: "",
		text: e.trigger,
		mentions: [],
		files: [],
		privacy: "visible",
		command: { trigger: e.trigger },
		mode: B
	}, {
		mode: B,
		context: c,
		...Q ? { author: Q } : {}
	}), [
		j,
		B,
		c,
		Q
	]), Yt = I.contextChip && y !== !1 && !It ? typeof y == "string" ? y : F.chipLabel : null, Xt = `context:${c.kind}:${c.id}`, Zt = Yt ? [{
		id: Xt,
		label: Yt,
		marker: "dot"
	}, ...Ce ?? []] : Ce, Qt = l((e) => {
		if (e === Xt) {
			Lt(!0), b?.();
			return;
		}
		x?.(e);
	}, [
		Xt,
		b,
		x
	]), $ = N != null && N !== !1, $t = !$ && (!!x || !!Yt && !!b), en = I.pageActions ? [...We ? [{
		label: "This page",
		items: [{
			label: Ge,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: We,
			"data-testid": Ke ?? `${P}-make-deck`
		}]
	}] : [], ...qe ?? []] : [], tn = I.sendOptions && Ve ? /* @__PURE__ */ p(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ p(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Ve(e.currentTarget),
		"data-testid": He ?? `${P}-share-document`
	}) : null, nn = J.length > 0 ? /* @__PURE__ */ p(te, {
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
		triggerTestId: `${P}-workflow`,
		disabled: $ || !!gt,
		sections: [{ items: J.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: G?.command?.trigger === Y && G?.command?.argument?.id === e.id,
			onSelect: () => Bt(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		})) }]
	}) : null, rn = nn || tn || Xe != null ? /* @__PURE__ */ m(f, { children: [
		nn,
		tn,
		Xe
	] }) : void 0, an = I.modelUnavailable && Ye ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${P}-model-unavailable`,
		children: Ye
	}) : null, on = I.offline && Ue ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${P}-offline`,
		children: Ue
	}) : null, sn = I.reply && k ? /* @__PURE__ */ p(re, {
		quote: {
			messageId: k.messageId ?? "",
			author: k.author,
			text: k.quote,
			...k.timestamp ? { timestamp: k.timestamp } : {}
		},
		...k.onDismiss ? { onDismiss: k.onDismiss } : {},
		...k.onJump && k.messageId ? { onJump: k.onJump } : {},
		"data-testid": `${P}-reply`
	}) : null, cn = !!(an || on || sn || w != null && w !== !1), [ln, un] = d(!1), dn = T != null && T !== !1 && !ln, fn = cn || dn ? /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${P}-above`,
		children: [
			an,
			on,
			dn ? T : null,
			w,
			sn
		]
	}) : void 0, pn = I.taskStrip && O ? /* @__PURE__ */ p(ne, {
		label: O.label,
		status: O.status,
		...O.phase ? { phase: O.phase } : {},
		...O.percent === void 0 ? {} : { percent: O.percent },
		...O.onOpen ? { onOpen: O.onOpen } : {},
		...O.onStop ? { onStop: O.onStop } : {},
		...O.onDismiss ? { onDismiss: O.onDismiss } : {},
		"data-testid": `${P}-task`
	}) : null, mn = D != null && D !== !1 ? D : pn, hn = E != null && E !== !1, gn = !!dt || cn || hn || mn != null, _n = I.attachments === "chat-only" && B !== "chat", vn = {
		...F.modePlaceholders,
		...v ? { agent: v } : {},
		...ye
	}, yn = {
		...F.modeUnavailableReasons,
		...ve
	};
	return z.includes("agent") && yn.agent && !ye?.agent && !v && (vn.agent = yn.agent), /* @__PURE__ */ p(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ p(se, {
			label: Ct ?? F.regionLabel,
			"data-testid": P,
			className: t(e.className, Tt),
			above: U ? void 0 : fn,
			strip: U ? void 0 : mn ?? void 0,
			composer: /* @__PURE__ */ m(f, { children: [
				C != null && C !== !1 && /* @__PURE__ */ p("div", {
					className: "shrink-0",
					"data-testid": `${P}-dock-slot`,
					children: C
				}),
				U && /* @__PURE__ */ m(n, {
					ref: zt,
					variant: "ghost",
					size: "sm",
					onClick: Wt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": H,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-composer-fold": "explicit",
					"data-testid": `${P}-expand`,
					children: [
						/* @__PURE__ */ p("span", {
							className: "shrink-0 font-semibold",
							children: B === "agent" ? "Agent" : B === "chat" ? "Chat" : B === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ p("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: ft || c.title || "Write a message…"
						}),
						Vt || G?.files.length ? /* @__PURE__ */ m("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", G?.files.length ? ` · ${G.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ p(s, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ p("div", {
					id: H,
					hidden: U,
					children: A != null && A !== !1 ? A : /* @__PURE__ */ p(le, {
						ref: Ut,
						"data-testid": Et,
						mode: B,
						onModeChange: kt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: gn,
						onIdleFoldChange: un,
						...pt ? { responsive: pt } : {},
						modeShortcuts: !qt,
						modeTriggers: !qt,
						...qt ? {
							presentation: "prompt",
							onCommandPick: Jt
						} : {},
						backdropTone: ht ? "auto" : "none",
						working: mt,
						allowAttachments: Ne && !_n,
						allowEmoji: I.emoji && Pe,
						onRequestLink: Fe,
						privacy: Ie,
						onPrivacyChange: Le,
						privacyLabels: Re,
						references: Zt,
						onRemoveReference: $t ? Qt : void 0,
						modes: e.passModes ? R : _,
						disabledModes: z,
						modeUnavailableReasons: yn,
						modeHints: be,
						placeholder: v,
						inputLabel: wt,
						modePlaceholders: vn,
						commands: X,
						onCommand: we,
						onSearchDocuments: je,
						documentMenu: Me,
						onSearchPeople: I.mentions ? Oe : void 0,
						mentionMembers: ke,
						onMentionNonMember: Ae,
						disabled: gt,
						...$ ? { readOnly: N } : {},
						status: _t,
						hints: xe,
						suggestions: vt,
						onSuggestion: yt,
						...bt ? { suggestionsVisible: bt } : {},
						processes: rt,
						onQuickOpen: it,
						onShellCommand: at,
						sendOptions: I.sendOptions ? ze : void 0,
						onSendOption: I.sendOptions ? Be : void 0,
						moreActions: en.length ? en : void 0,
						moreActionsLabel: Je,
						submitLabel: Ht ? De : Se,
						maxInputHeight: xt,
						toolbarExtras: rn,
						submitLead: Ze,
						modeRowEnd: Qe != null || M ? /* @__PURE__ */ m(f, { children: [Qe, M && !E && /* @__PURE__ */ p(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": H,
							onClick: Gt,
							icon: /* @__PURE__ */ p(s, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${P}-collapse`
						})] }) : void 0,
						modeRowStart: $e,
						...hn ? { header: E } : {},
						sendWithReferencesOnly: et,
						referencesAction: tt,
						referenceDrop: nt,
						draft: G,
						onDraftChange: q,
						onSend: Kt
					}, `${L}:${Mt}`)
				})
			] })
		})
	});
}
//#endregion
export { _ as n, h as r, g as t };
