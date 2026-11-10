import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { d as t, n, t as r } from "./Button-DQoeE5dN.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { S as a, c as o, m as ee } from "./Icons-CqVFbuiZ.js";
import { t as te } from "./Banner-DPR4sIxI.js";
import { t as ne } from "./DropdownMenu-DsOGcoH4.js";
import { i as re } from "./DecisionPath-BItsvKd5.js";
import { t as ie } from "./QuoteBlock-Dks53Idi.js";
import { i as ae } from "./composerSendError-BFTLY93R.js";
import { a as oe, i as se, r as s } from "./composerContext-BLn1-Nao.js";
import { i as ce, t as le } from "./FloatingComposerDock-DbxmNCal.js";
import { r as ue } from "./RichChatComposer-DtSBcOQ-.js";
import { useCallback as c, useId as de, useMemo as fe, useRef as pe, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/social/ContextComposer.tsx
var p = /* @__PURE__ */ e({
	ContextComposer: () => m,
	ContextComposerBase: () => h,
	default: () => m
});
function me(e) {
	return typeof e == "string" || e === void 0 ? oe(e ?? "") : e;
}
function he(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function ge(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var _e = [], ve = { conversation: "bg-transparent [--dock-inset:0px]" };
function m(e) {
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
	return /* @__PURE__ */ d(h, {
		...e,
		look: {
			preset: o,
			toolbar: e.toolbar ?? (n === "prompt" ? "prompt" : "editor"),
			density: n === "compact" ? "compact" : "comfortable",
			collapseWhenIdle: !0,
			passModes: !0,
			singleModeLabel: !0,
			presentation: n === "prompt" ? "prompt" : "card",
			className: ve[t.kind]
		}
	});
}
function h({ look: e, context: s, mode: p, defaultMode: ve, onModeChange: m, modes: h, disabledModes: ye, modeUnavailableReasons: be, placeholder: g, modePlaceholders: xe, modeHints: Se, hints: Ce, submitLabel: we, submitDisabledReason: Te, contextChip: _ = !0, onRemoveContext: v, references: Ee, onRemoveReference: y, commands: b, onCommand: De, workflows: Oe, onWorkflow: x, workflowSubmitLabel: ke = "Prepare run", onSearchPeople: Ae, mentionMembers: je, onMentionNonMember: Me, onSearchDocuments: Ne, documentMenu: Pe, allowAttachments: Fe = !0, allowEmoji: Ie = !0, onRequestLink: Le, privacy: Re, onPrivacyChange: ze, privacyLabels: Be, sendOptions: Ve, onSendOption: He, onShareDocument: Ue, shareDocumentTestId: We, offline: Ge, onMakeDeck: Ke, makeDeckLabel: qe = "Make a deck from this page", makeDeckTestId: Je, moreActions: Ye, moreActionsLabel: Xe = "Page actions", dock: S, above: C, foldingAbove: Ze, header: w, strip: T, task: E, reply: D, replacement: O, modelUnavailable: Qe, toolbarExtras: $e, submitLead: et, modeRowEnd: tt, modeRowStart: nt, sendWithReferencesOnly: rt, referencesAction: it, referenceDrop: at, processes: ot, onQuickOpen: st, onShellCommand: ct, draft: lt, onDraftChange: ut, defaultDraft: dt, draftKey: ft, onSend: k, identity: pt, expanded: mt, collapsible: A = !1, collapsedLabel: ht, responsive: gt, working: _t, console: vt = !0, disabled: j, readOnly: M, status: yt, suggestions: bt, onSuggestion: xt, suggestionsVisible: St, maxInputHeight: Ct, composerRef: wt, label: Tt, inputLabel: Et = "Message", className: Dt, "data-testid": N = "context-composer", composerTestId: Ot }) {
	let { preset: P } = e, F = P.features, I = ft ?? `${s.kind}:${s.id}`, L = h ?? P.modes, R = ye ?? P.disabledModes.filter((e) => L.includes(e)), [kt, At] = l(() => {
		let e = ve ?? P.defaultMode;
		return L.includes(e) ? e : L.find((e) => !R.includes(e)) ?? e;
	}), z = p ?? kt, jt = c((e) => {
		p === void 0 && At(e), m?.(e);
	}, [p, m]), [Mt, Nt] = l(() => me(dt)), [Pt, Ft] = l(0), [It, Lt] = l(I), [Rt, zt] = l(!1), [Bt, B] = l(!1), V = de(), Vt = pe(null), H = A && Bt && !O && !w;
	It !== I && (Lt(I), Nt(me(dt)), Ft(0), zt(!1), B(!1));
	let U = lt !== void 0, W = U ? lt : Mt, G = pe(W);
	G.current = W;
	let K = c((e, t) => {
		U || Nt(e), ut?.(e, t);
	}, [U, ut]), q = F.workflows && Oe ? Oe : _e, J = F.workflowCommand, Ht = c((e) => {
		if (x) {
			x(e);
			return;
		}
		let t = q.find((t) => t.id === e), n = J && t ? {
			html: `<p>${ge(`${J} ${t.label} `)}</p>`,
			files: G.current?.files ?? [],
			command: {
				trigger: J,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : oe(`/${e} `);
		K(n, G.current), Ft((e) => e + 1);
	}, [
		x,
		q,
		J,
		K
	]), Y = fe(() => {
		if (!J || q.length === 0 || b?.some((e) => e.trigger === J)) return b;
		let e = {
			trigger: J,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ d(o, {
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
		return [...b ?? [], e];
	}, [
		b,
		q,
		J
	]), Ut = W?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Wt = !!J && q.length > 0 && (W?.command?.trigger === J || Ut.toLowerCase().startsWith(`${J} `)), X = pe(null), Gt = c((e) => {
		X.current = e, he(wt, e ? {
			...e,
			focus: () => {
				B(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [wt]), Kt = () => {
		B(!1), requestAnimationFrame(() => X.current?.focus());
	}, qt = () => {
		X.current?.editor?.commands.blur(), B(!0), requestAnimationFrame(() => Vt.current?.focus());
	}, Z = se(pt), Jt = c((e) => {
		let t = e;
		if (F.typedText) {
			let n = X.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ae(n, Y), i = r ? {
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
		return k(t, {
			mode: e.mode ?? z,
			context: s,
			...Z ? { author: Z } : {}
		});
	}, [
		F.typedText,
		Y,
		z,
		k,
		s,
		Z
	]), Q = e.presentation === "prompt", Yt = c((e) => k({
		html: "",
		text: e.trigger,
		mentions: [],
		files: [],
		privacy: "visible",
		command: { trigger: e.trigger },
		mode: z
	}, {
		mode: z,
		context: s,
		...Z ? { author: Z } : {}
	}), [
		k,
		z,
		s,
		Z
	]), Xt = F.contextChip && _ !== !1 && !Rt ? typeof _ == "string" ? _ : P.chipLabel : null, Zt = `context:${s.kind}:${s.id}`, Qt = Xt ? [{
		id: Zt,
		label: Xt,
		marker: "dot"
	}, ...Ee ?? []] : Ee, $t = c((e) => {
		if (e === Zt) {
			zt(!0), v?.();
			return;
		}
		y?.(e);
	}, [
		Zt,
		v,
		y
	]), $ = M != null && M !== !1, en = !$ && (!!y || !!Xt && !!v), tn = F.pageActions ? [...Ke ? [{
		label: "This page",
		items: [{
			label: qe,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Ke,
			"data-testid": Je ?? `${N}-make-deck`
		}]
	}] : [], ...Ye ?? []] : [], nn = F.sendOptions && Ue ? /* @__PURE__ */ d(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ d(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Ue(e.currentTarget),
		"data-testid": We ?? `${N}-share-document`
	}) : null, rn = q.length > 0 ? /* @__PURE__ */ d(ne, {
		trigger: /* @__PURE__ */ f("span", {
			className: "inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ d(o, {
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
		triggerClassName: `h-7 px-2 text-xs text-text-secondary ${r}`,
		triggerTestId: `${N}-workflow`,
		disabled: $ || !!j,
		sections: [{ items: q.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: W?.command?.trigger === J && W?.command?.argument?.id === e.id,
			onSelect: () => Ht(e.id),
			"data-testid": `${N}-workflow-${e.id}`
		})) }]
	}) : null, an = q.length > 0 && !($ || j) ? [{
		label: "Workflow",
		items: q.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: W?.command?.trigger === J && W?.command?.argument?.id === e.id,
			onSelect: () => Ht(e.id),
			"data-testid": `${N}-workflow-${e.id}`
		}))
	}] : void 0, on = rn || nn || $e != null ? /* @__PURE__ */ f(u, { children: [
		rn,
		nn,
		$e
	] }) : void 0, sn = F.modelUnavailable && Qe ? /* @__PURE__ */ d(te, {
		variant: "warning",
		"data-testid": `${N}-model-unavailable`,
		children: Qe
	}) : null, cn = F.offline && Ge ? /* @__PURE__ */ d(te, {
		variant: "warning",
		"data-testid": `${N}-offline`,
		children: Ge
	}) : null, ln = F.reply && D ? /* @__PURE__ */ d(ie, {
		quote: {
			messageId: D.messageId ?? "",
			author: D.author,
			text: D.quote,
			...D.timestamp ? { timestamp: D.timestamp } : {}
		},
		...D.onDismiss ? { onDismiss: D.onDismiss } : {},
		...D.onJump && D.messageId ? { onJump: D.onJump } : {},
		"data-testid": `${N}-reply`
	}) : null, un = !!(sn || cn || ln || C != null && C !== !1), [dn, fn] = l(!1), pn = Ze != null && Ze !== !1 && !dn, mn = un || pn ? /* @__PURE__ */ f("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${N}-above`,
		children: [
			sn,
			cn,
			pn ? Ze : null,
			C,
			ln
		]
	}) : void 0, hn = F.taskStrip && E ? /* @__PURE__ */ d(re, {
		label: E.label,
		status: E.status,
		...E.phase ? { phase: E.phase } : {},
		...E.percent === void 0 ? {} : { percent: E.percent },
		...E.onOpen ? { onOpen: E.onOpen } : {},
		...E.onStop ? { onStop: E.onStop } : {},
		...E.onDismiss ? { onDismiss: E.onDismiss } : {},
		"data-testid": `${N}-task`
	}) : null, gn = T != null && T !== !1 ? T : hn, _n = w != null && w !== !1, vn = !!mt || un || _n || gn != null, yn = F.attachments === "chat-only" && z !== "chat", bn = {
		...P.modePlaceholders,
		...g ? { agent: g } : {},
		...xe
	}, xn = {
		...P.modeUnavailableReasons,
		...be
	};
	return R.includes("agent") && xn.agent && !xe?.agent && !g && (bn.agent = xn.agent), /* @__PURE__ */ d(le.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ d(ce, {
			label: Tt ?? P.regionLabel,
			"data-testid": N,
			className: t(e.className, Dt),
			above: H ? void 0 : mn,
			strip: H ? void 0 : gn ?? void 0,
			composer: /* @__PURE__ */ f(u, { children: [
				S != null && S !== !1 && /* @__PURE__ */ d("div", {
					className: "shrink-0",
					"data-testid": `${N}-dock-slot`,
					children: S
				}),
				H && /* @__PURE__ */ f(n, {
					ref: Vt,
					variant: "ghost",
					size: "sm",
					onClick: Kt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": V,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-composer-fold": "explicit",
					"data-testid": `${N}-expand`,
					children: [
						/* @__PURE__ */ d("span", {
							className: "shrink-0 font-semibold",
							children: z === "agent" ? "Agent" : z === "chat" ? "Chat" : z === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ d("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: ht || s.title || "Write a message…"
						}),
						Ut || W?.files.length ? /* @__PURE__ */ f("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", W?.files.length ? ` · ${W.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ d(ee, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ d("div", {
					id: V,
					hidden: H,
					children: O != null && O !== !1 ? O : /* @__PURE__ */ d(ue, {
						ref: Gt,
						"data-testid": Ot,
						mode: z,
						onModeChange: jt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: vn,
						onIdleFoldChange: fn,
						...gt ? { responsive: gt } : {},
						modeShortcuts: !Q,
						modeTriggers: !Q,
						...Q ? {
							presentation: "prompt",
							onCommandPick: Yt
						} : {},
						backdropTone: vt ? "auto" : "none",
						working: _t,
						allowAttachments: Fe && !yn,
						allowEmoji: F.emoji && Ie,
						onRequestLink: Le,
						privacy: Re,
						onPrivacyChange: ze,
						privacyLabels: Be,
						references: Qt,
						onRemoveReference: en ? $t : void 0,
						modes: e.passModes ? L : h,
						disabledModes: R,
						modeUnavailableReasons: xn,
						modeHints: Se,
						placeholder: g,
						inputLabel: Et,
						modePlaceholders: bn,
						commands: Y,
						onCommand: De,
						onSearchDocuments: Ne,
						documentMenu: Pe,
						onSearchPeople: F.mentions ? Ae : void 0,
						mentionMembers: je,
						onMentionNonMember: Me,
						disabled: j,
						...$ ? { readOnly: M } : {},
						status: yt,
						hints: Ce,
						suggestions: bt,
						onSuggestion: xt,
						...St ? { suggestionsVisible: St } : {},
						processes: ot,
						onQuickOpen: st,
						onShellCommand: ct,
						sendOptions: F.sendOptions ? Ve : void 0,
						onSendOption: F.sendOptions ? He : void 0,
						moreActions: tn.length ? tn : void 0,
						moreActionsLabel: Xe,
						submitLabel: Wt ? ke : we,
						...Te ? { submitDisabledReason: Te } : {},
						maxInputHeight: Ct,
						toolbarExtras: on,
						...an ? {
							foldedMenu: an,
							foldedMenuLabel: "Workflow"
						} : {},
						submitLead: et,
						modeRowEnd: tt != null || A ? /* @__PURE__ */ f(u, { children: [tt, A && !w && /* @__PURE__ */ d(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": V,
							onClick: qt,
							icon: /* @__PURE__ */ d(ee, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${N}-collapse`
						})] }) : void 0,
						modeRowStart: nt,
						..._n ? { header: w } : {},
						sendWithReferencesOnly: rt,
						referencesAction: it,
						referenceDrop: at,
						draft: W,
						onDraftChange: K,
						onSend: Jt
					}, `${I}:${Pt}`)
				})
			] })
		})
	});
}
//#endregion
export { h as n, p as r, m as t };
