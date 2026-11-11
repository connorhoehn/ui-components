import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { d as t, n, t as r } from "./Button-DQoeE5dN.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { S as a, c as o, m as ee } from "./Icons-CqVFbuiZ.js";
import { t as te } from "./Banner-DPR4sIxI.js";
import { t as ne } from "./DropdownMenu-LFtIWj5Y.js";
import { i as re } from "./DecisionPath-EmucEGVS.js";
import { t as ie } from "./QuoteBlock-Dks53Idi.js";
import { i as ae } from "./composerSendError-CkZXGTCj.js";
import { a as oe, i as se, r as s } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-DbxmNCal.js";
import { r as ue } from "./RichChatComposer-SfF4SJhR.js";
import { useCallback as c, useId as de, useMemo as fe, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var m = /* @__PURE__ */ e({
	ContextComposer: () => h,
	ContextComposerBase: () => g,
	default: () => h
});
function pe(e) {
	return typeof e == "string" || e === void 0 ? oe(e ?? "") : e;
}
function me(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function he(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var ge = [], _e = { conversation: "bg-transparent [--dock-inset:0px]" };
function h(e) {
	let { context: t, presentation: n = "compact", onShellCommand: r, agentUnavailableReason: i, chatAvailable: a } = e, o = fe(() => s(t, {
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
			toolbar: e.toolbar ?? (n === "prompt" ? "prompt" : "editor"),
			density: n === "compact" ? "compact" : "comfortable",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			presentation: n === "prompt" ? "prompt" : "card",
			className: _e[t.kind]
		}
	});
}
function g({ look: e, context: s, mode: m, defaultMode: _e, onModeChange: h, modes: g, disabledModes: ve, modeUnavailableReasons: ye, placeholder: _, modePlaceholders: be, modeHints: xe, hints: Se, submitLabel: Ce, submitDisabledReason: we, contextChip: v = !0, onRemoveContext: y, references: Te, onRemoveReference: b, commands: x, onCommand: Ee, workflows: De, onWorkflow: S, workflowSubmitLabel: Oe = "Prepare run", onSearchPeople: ke, mentionMembers: Ae, onMentionNonMember: je, onSearchDocuments: Me, documentMenu: Ne, allowAttachments: Pe = !0, allowEmoji: Fe = !0, onRequestLink: Ie, privacy: Le, onPrivacyChange: Re, privacyLabels: ze, sendOptions: Be, onSendOption: Ve, onShareDocument: He, shareDocumentTestId: Ue, offline: We, onMakeDeck: Ge, makeDeckLabel: Ke = "Make a deck from this page", makeDeckTestId: qe, moreActions: Je, moreActionsLabel: Ye = "Page actions", dock: C, above: Xe, foldingAbove: w, header: T, headerFolds: Ze = !1, strip: E, task: D, reply: O, replacement: k, modelUnavailable: Qe, toolbarExtras: $e, submitLead: et, modeRowEnd: tt, modeRowStart: nt, sendWithReferencesOnly: rt, referencesAction: it, referenceDrop: at, processes: ot, onQuickOpen: st, onShellCommand: ct, draft: lt, onDraftChange: ut, defaultDraft: dt, draftKey: ft, onSend: A, identity: pt, expanded: mt, collapsible: j = !1, collapsedLabel: ht, responsive: gt, working: _t, console: vt = !0, disabled: M, readOnly: N, status: yt, suggestions: bt, onSuggestion: xt, suggestionsVisible: St, maxInputHeight: Ct, composerRef: wt, label: Tt, inputLabel: Et = "Message", className: Dt, "data-testid": P = "context-composer", composerTestId: Ot }) {
	let { preset: F } = e, I = F.features, L = ft ?? `${s.kind}:${s.id}`, R = g ?? F.modes, z = ve ?? F.disabledModes.filter((e) => R.includes(e)), [kt, At] = u(() => {
		let e = _e ?? F.defaultMode;
		return R.includes(e) ? e : R.find((e) => !z.includes(e)) ?? e;
	}), B = m ?? kt, jt = c((e) => {
		m === void 0 && At(e), h?.(e);
	}, [m, h]), [Mt, Nt] = u(() => pe(dt)), [Pt, Ft] = u(0), [It, Lt] = u(L), [Rt, zt] = u(!1), [Bt, V] = u(!1), H = de(), Vt = l(null), U = j && Bt && !k && !T;
	It !== L && (Lt(L), Nt(pe(dt)), Ft(0), zt(!1), V(!1));
	let W = lt !== void 0, G = W ? lt : Mt, K = l(G);
	K.current = G;
	let q = c((e, t) => {
		W || Nt(e), ut?.(e, t);
	}, [W, ut]), J = I.workflows && De ? De : ge, Y = I.workflowCommand, Ht = c((e) => {
		if (S) {
			S(e);
			return;
		}
		let t = J.find((t) => t.id === e), n = Y && t ? {
			html: `<p>${he(`${Y} ${t.label} `)}</p>`,
			files: K.current?.files ?? [],
			command: {
				trigger: Y,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : oe(`/${e} `);
		q(n, K.current), Ft((e) => e + 1);
	}, [
		S,
		J,
		Y,
		q
	]), X = fe(() => {
		if (!Y || J.length === 0 || x?.some((e) => e.trigger === Y)) return x;
		let e = {
			trigger: Y,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ f(o, {
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
		return [...x ?? [], e];
	}, [
		x,
		J,
		Y
	]), Ut = G?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Wt = !!Y && J.length > 0 && (G?.command?.trigger === Y || Ut.toLowerCase().startsWith(`${Y} `)), Z = l(null), Gt = c((e) => {
		Z.current = e, me(wt, e ? {
			...e,
			focus: () => {
				V(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [wt]), Kt = () => {
		V(!1), requestAnimationFrame(() => Z.current?.focus());
	}, qt = () => {
		Z.current?.editor?.commands.blur(), V(!0), requestAnimationFrame(() => Vt.current?.focus());
	}, Q = se(pt), Jt = c((e) => {
		let t = e;
		if (I.typedText) {
			let n = Z.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ae(n, X), i = r ? {
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
			mode: e.mode ?? B,
			context: s,
			...Q ? { author: Q } : {}
		});
	}, [
		I.typedText,
		X,
		B,
		A,
		s,
		Q
	]), Yt = e.presentation === "prompt", Xt = c((e) => A({
		html: "",
		text: e.trigger,
		mentions: [],
		files: [],
		privacy: "visible",
		command: { trigger: e.trigger },
		mode: B
	}, {
		mode: B,
		context: s,
		...Q ? { author: Q } : {}
	}), [
		A,
		B,
		s,
		Q
	]), Zt = I.contextChip && v !== !1 && !Rt ? typeof v == "string" ? v : F.chipLabel : null, Qt = `context:${s.kind}:${s.id}`, $t = Zt ? [{
		id: Qt,
		label: Zt,
		marker: "dot"
	}, ...Te ?? []] : Te, en = c((e) => {
		if (e === Qt) {
			zt(!0), y?.();
			return;
		}
		b?.(e);
	}, [
		Qt,
		y,
		b
	]), $ = N != null && N !== !1, tn = !$ && (!!b || !!Zt && !!y), nn = I.pageActions ? [...Ge ? [{
		label: "This page",
		items: [{
			label: Ke,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Ge,
			"data-testid": qe ?? `${P}-make-deck`
		}]
	}] : [], ...Je ?? []] : [], rn = I.sendOptions && He ? /* @__PURE__ */ f(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ f(a, { size: 14 }),
		disabled: $,
		onClick: (e) => He(e.currentTarget),
		"data-testid": Ue ?? `${P}-share-document`
	}) : null, an = J.length > 0 ? /* @__PURE__ */ f(ne, {
		trigger: /* @__PURE__ */ p("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ f(o, {
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
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${r}`,
		triggerTestId: `${P}-workflow`,
		disabled: $ || !!M,
		sections: [{ items: J.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: G?.command?.trigger === Y && G?.command?.argument?.id === e.id,
			onSelect: () => Ht(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		})) }]
	}) : null, on = J.length > 0 && !($ || M) ? [{
		label: "Workflow",
		items: J.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: G?.command?.trigger === Y && G?.command?.argument?.id === e.id,
			onSelect: () => Ht(e.id),
			"data-testid": `${P}-workflow-${e.id}`
		}))
	}] : void 0, sn = an || rn || $e != null ? /* @__PURE__ */ p(d, { children: [
		an,
		rn,
		$e
	] }) : void 0, cn = I.modelUnavailable && Qe ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${P}-model-unavailable`,
		children: Qe
	}) : null, ln = I.offline && We ? /* @__PURE__ */ f(te, {
		variant: "warning",
		"data-testid": `${P}-offline`,
		children: We
	}) : null, un = I.reply && O ? /* @__PURE__ */ f(ie, {
		quote: {
			messageId: O.messageId ?? "",
			author: O.author,
			text: O.quote,
			...O.timestamp ? { timestamp: O.timestamp } : {}
		},
		...O.onDismiss ? { onDismiss: O.onDismiss } : {},
		...O.onJump && O.messageId ? { onJump: O.onJump } : {},
		"data-testid": `${P}-reply`
	}) : null, dn = !!(cn || ln || un || Xe != null && Xe !== !1), [fn, pn] = u(!1), mn = w != null && w !== !1 && !fn, hn = dn || mn ? /* @__PURE__ */ p("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${P}-above`,
		children: [
			cn,
			ln,
			mn ? w : null,
			Xe,
			un
		]
	}) : void 0, gn = I.taskStrip && D ? /* @__PURE__ */ f(re, {
		label: D.label,
		status: D.status,
		...D.phase ? { phase: D.phase } : {},
		...D.percent === void 0 ? {} : { percent: D.percent },
		...D.onOpen ? { onOpen: D.onOpen } : {},
		...D.onStop ? { onStop: D.onStop } : {},
		...D.onDismiss ? { onDismiss: D.onDismiss } : {},
		"data-testid": `${P}-task`
	}) : null, _n = E != null && E !== !1 ? E : gn, vn = T != null && T !== !1, yn = !!mt || dn || vn && !Ze || _n != null, bn = I.attachments === "chat-only" && B !== "chat", xn = {
		...F.modePlaceholders,
		..._ ? { agent: _ } : {},
		...be
	}, Sn = {
		...F.modeUnavailableReasons,
		...ye
	};
	return z.includes("agent") && Sn.agent && !be?.agent && !_ && (xn.agent = Sn.agent), /* @__PURE__ */ f(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ f(ce, {
			label: Tt ?? F.regionLabel,
			"data-testid": P,
			className: t(e.className, Dt),
			above: U ? void 0 : hn,
			strip: U ? void 0 : _n ?? void 0,
			composer: /* @__PURE__ */ p(d, { children: [
				C != null && C !== !1 && /* @__PURE__ */ f("div", {
					className: "shrink-0",
					"data-testid": `${P}-dock-slot`,
					children: C
				}),
				U && /* @__PURE__ */ p(n, {
					ref: Vt,
					variant: "ghost",
					size: "sm",
					onClick: Kt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": H,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-composer-fold": "explicit",
					"data-testid": `${P}-expand`,
					children: [
						/* @__PURE__ */ f("span", {
							className: "shrink-0 font-semibold",
							children: B === "agent" ? "Agent" : B === "chat" ? "Chat" : B === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ f("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: ht || s.title || "Write a message…"
						}),
						Ut || G?.files.length ? /* @__PURE__ */ p("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", G?.files.length ? ` · ${G.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ f(ee, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ f("div", {
					id: H,
					hidden: U,
					children: k != null && k !== !1 ? k : /* @__PURE__ */ f(ue, {
						ref: Gt,
						"data-testid": Ot,
						mode: B,
						onModeChange: jt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: yn,
						onIdleFoldChange: pn,
						...gt ? { responsive: gt } : {},
						modeShortcuts: !Yt,
						modeTriggers: !Yt,
						...Yt ? {
							presentation: "prompt",
							onCommandPick: Xt
						} : {},
						backdropTone: vt ? "auto" : "none",
						working: _t,
						allowAttachments: Pe && !bn,
						allowEmoji: I.emoji && Fe,
						onRequestLink: Ie,
						privacy: Le,
						onPrivacyChange: Re,
						privacyLabels: ze,
						references: $t,
						onRemoveReference: tn ? en : void 0,
						modes: e.passModes ? R : g,
						disabledModes: z,
						modeUnavailableReasons: Sn,
						modeHints: xe,
						placeholder: _,
						inputLabel: Et,
						modePlaceholders: xn,
						commands: X,
						onCommand: Ee,
						onSearchDocuments: Me,
						documentMenu: Ne,
						onSearchPeople: I.mentions ? ke : void 0,
						mentionMembers: Ae,
						onMentionNonMember: je,
						disabled: M,
						...$ ? { readOnly: N } : {},
						status: yt,
						hints: Se,
						suggestions: bt,
						onSuggestion: xt,
						...St ? { suggestionsVisible: St } : {},
						processes: ot,
						onQuickOpen: st,
						onShellCommand: ct,
						sendOptions: I.sendOptions ? Be : void 0,
						onSendOption: I.sendOptions ? Ve : void 0,
						moreActions: nn.length ? nn : void 0,
						moreActionsLabel: Ye,
						submitLabel: Wt ? Oe : Ce,
						...we ? { submitDisabledReason: we } : {},
						maxInputHeight: Ct,
						toolbarExtras: sn,
						...on ? {
							foldedMenu: on,
							foldedMenuLabel: "Workflow"
						} : {},
						submitLead: et,
						modeRowEnd: tt != null || j ? /* @__PURE__ */ p(d, { children: [tt, j && !T && /* @__PURE__ */ f(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": H,
							onClick: qt,
							icon: /* @__PURE__ */ f(ee, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${P}-collapse`
						})] }) : void 0,
						modeRowStart: nt,
						...vn ? { header: T } : {},
						sendWithReferencesOnly: rt,
						referencesAction: it,
						referenceDrop: at,
						draft: G,
						onDraftChange: q,
						onSend: Jt
					}, `${L}:${Pt}`)
				})
			] })
		})
	});
}
//#endregion
export { g as n, m as r, h as t };
