import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { d as t, n, t as r } from "./Button-DQoeE5dN.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { S as a, c as o, m as s } from "./Icons-CqVFbuiZ.js";
import { t as ee } from "./Banner-DPR4sIxI.js";
import { t as te } from "./DropdownMenu-DoCRgXx4.js";
import { i as ne } from "./DecisionPath-C8Fn-5Ip.js";
import { t as re } from "./QuoteBlock-Dks53Idi.js";
import { i as ie } from "./composerSendError-vB7M56RD.js";
import { a as ae, i as oe, r as c } from "./composerContext-BLn1-Nao.js";
import { i as se, t as ce } from "./FloatingComposerDock-DbxmNCal.js";
import { r as le } from "./RichChatComposer-BXPt0nDX.js";
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
function _({ look: e, context: c, mode: h, defaultMode: ge, onModeChange: g, modes: _, disabledModes: _e, modeUnavailableReasons: ve, placeholder: v, modePlaceholders: ye, modeHints: be, hints: xe, submitLabel: Se, submitDisabledReason: Ce, contextChip: y = !0, onRemoveContext: b, references: we, onRemoveReference: Te, commands: x, onCommand: Ee, workflows: De, onWorkflow: Oe, workflowSubmitLabel: ke = "Prepare run", onSearchPeople: Ae, mentionMembers: je, onMentionNonMember: Me, onSearchDocuments: Ne, documentMenu: Pe, allowAttachments: Fe = !0, allowEmoji: Ie = !0, onRequestLink: Le, privacy: Re, onPrivacyChange: ze, privacyLabels: Be, sendOptions: Ve, onSendOption: He, onShareDocument: Ue, shareDocumentTestId: We, offline: Ge, onMakeDeck: Ke, makeDeckLabel: qe = "Make a deck from this page", makeDeckTestId: Je, moreActions: Ye, moreActionsLabel: Xe = "Page actions", dock: S, above: C, foldingAbove: Ze, header: w, strip: Qe, task: T, reply: E, replacement: D, modelUnavailable: $e, toolbarExtras: et, submitLead: tt, modeRowEnd: nt, modeRowStart: rt, sendWithReferencesOnly: it, referencesAction: at, referenceDrop: ot, processes: st, onQuickOpen: ct, onShellCommand: lt, draft: ut, onDraftChange: dt, defaultDraft: ft, draftKey: pt, onSend: O, identity: mt, expanded: ht, collapsible: k = !1, collapsedLabel: gt, responsive: _t, working: vt, console: yt = !0, disabled: bt, readOnly: A, status: xt, suggestions: St, onSuggestion: Ct, suggestionsVisible: wt, maxInputHeight: Tt, composerRef: Et, label: Dt, inputLabel: Ot = "Message", className: kt, "data-testid": j = "context-composer", composerTestId: At }) {
	let { preset: M } = e, N = M.features, P = pt ?? `${c.kind}:${c.id}`, F = _ ?? M.modes, I = _e ?? M.disabledModes.filter((e) => F.includes(e)), [jt, Mt] = d(() => {
		let e = ge ?? M.defaultMode;
		return F.includes(e) ? e : F.find((e) => !I.includes(e)) ?? e;
	}), L = h ?? jt, Nt = l((e) => {
		h === void 0 && Mt(e), g?.(e);
	}, [h, g]), [Pt, Ft] = d(() => fe(ft)), [It, Lt] = d(0), [Rt, zt] = d(P), [Bt, Vt] = d(!1), [Ht, R] = d(!1), z = ue(), Ut = u(null), B = k && Ht && !D && !w;
	Rt !== P && (zt(P), Ft(fe(ft)), Lt(0), Vt(!1), R(!1));
	let V = ut !== void 0, H = V ? ut : Pt, U = u(H);
	U.current = H;
	let W = l((e, t) => {
		V || Ft(e), dt?.(e, t);
	}, [V, dt]), G = N.workflows && De ? De : he, K = N.workflowCommand, Wt = l((e) => {
		if (Oe) {
			Oe(e);
			return;
		}
		let t = G.find((t) => t.id === e), n = K && t ? {
			html: `<p>${me(`${K} ${t.label} `)}</p>`,
			files: U.current?.files ?? [],
			command: {
				trigger: K,
				argument: {
					id: t.id,
					label: t.label,
					...t.description ? { hint: t.description } : {}
				}
			}
		} : ae(`/${e} `);
		W(n, U.current), Lt((e) => e + 1);
	}, [
		Oe,
		G,
		K,
		W
	]), q = de(() => {
		if (!K || G.length === 0 || x?.some((e) => e.trigger === K)) return x;
		let e = {
			trigger: K,
			label: "Run a workflow",
			hint: "pick a workflow, then say what it should do",
			icon: /* @__PURE__ */ p(o, {
				size: 14,
				"aria-hidden": !0
			}),
			argument: {
				placeholder: "Choose a workflow",
				search: (e) => G.filter((t) => !t.disabled && t.label.toLowerCase().includes(e.trim().toLowerCase())).map((e) => ({
					id: e.id,
					label: e.label,
					...e.description ? { hint: e.description } : {}
				}))
			}
		};
		return [...x ?? [], e];
	}, [
		x,
		G,
		K
	]), Gt = H?.html?.replace(/<[^>]*>/g, "").trimStart() ?? "", Kt = !!K && G.length > 0 && (H?.command?.trigger === K || Gt.toLowerCase().startsWith(`${K} `)), J = u(null), qt = l((e) => {
		J.current = e, pe(Et, e ? {
			...e,
			focus: () => {
				R(!1), requestAnimationFrame(() => e.focus());
			}
		} : null);
	}, [Et]), Jt = () => {
		R(!1), requestAnimationFrame(() => J.current?.focus());
	}, Yt = () => {
		J.current?.editor?.commands.blur(), R(!0), requestAnimationFrame(() => Ut.current?.focus());
	}, Y = oe(mt), Xt = l((e) => {
		let t = e;
		if (N.typedText) {
			let n = J.current?.editor?.getText();
			if (n !== void 0 && n !== e.text) {
				let r = ie(n, q), i = r ? {
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
		return O(t, {
			mode: e.mode ?? L,
			context: c,
			...Y ? { author: Y } : {}
		});
	}, [
		N.typedText,
		q,
		L,
		O,
		c,
		Y
	]), X = e.presentation === "prompt", Zt = l((e) => O({
		html: "",
		text: e.trigger,
		mentions: [],
		files: [],
		privacy: "visible",
		command: { trigger: e.trigger },
		mode: L
	}, {
		mode: L,
		context: c,
		...Y ? { author: Y } : {}
	}), [
		O,
		L,
		c,
		Y
	]), Z = N.contextChip && y !== !1 && !Bt ? typeof y == "string" ? y : M.chipLabel : null, Q = `context:${c.kind}:${c.id}`, Qt = Z ? [{
		id: Q,
		label: Z,
		marker: "dot"
	}, ...we ?? []] : we, $t = l((e) => {
		if (e === Q) {
			Vt(!0), b?.();
			return;
		}
		Te?.(e);
	}, [
		Q,
		b,
		Te
	]), $ = A != null && A !== !1, en = !$ && (!!Te || !!Z && !!b), tn = N.pageActions ? [...Ke ? [{
		label: "This page",
		items: [{
			label: qe,
			description: "Drafts a presentation that cites this page, then opens it",
			onSelect: Ke,
			"data-testid": Je ?? `${j}-make-deck`
		}]
	}] : [], ...Ye ?? []] : [], nn = N.sendOptions && Ue ? /* @__PURE__ */ p(i, {
		"aria-label": "Share a document",
		title: "Share a document",
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ p(a, { size: 14 }),
		disabled: $,
		onClick: (e) => Ue(e.currentTarget),
		"data-testid": We ?? `${j}-share-document`
	}) : null, rn = G.length > 0 ? /* @__PURE__ */ p(te, {
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
		triggerTestId: `${j}-workflow`,
		disabled: $ || !!bt,
		sections: [{ items: G.map((e) => ({
			label: e.label,
			description: e.description,
			disabled: e.disabled,
			disabledReason: e.disabledReason,
			active: H?.command?.trigger === K && H?.command?.argument?.id === e.id,
			onSelect: () => Wt(e.id),
			"data-testid": `${j}-workflow-${e.id}`
		})) }]
	}) : null, an = rn || nn || et != null ? /* @__PURE__ */ m(f, { children: [
		rn,
		nn,
		et
	] }) : void 0, on = N.modelUnavailable && $e ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${j}-model-unavailable`,
		children: $e
	}) : null, sn = N.offline && Ge ? /* @__PURE__ */ p(ee, {
		variant: "warning",
		"data-testid": `${j}-offline`,
		children: Ge
	}) : null, cn = N.reply && E ? /* @__PURE__ */ p(re, {
		quote: {
			messageId: E.messageId ?? "",
			author: E.author,
			text: E.quote,
			...E.timestamp ? { timestamp: E.timestamp } : {}
		},
		...E.onDismiss ? { onDismiss: E.onDismiss } : {},
		...E.onJump && E.messageId ? { onJump: E.onJump } : {},
		"data-testid": `${j}-reply`
	}) : null, ln = !!(on || sn || cn || C != null && C !== !1), [un, dn] = d(!1), fn = Ze != null && Ze !== !1 && !un, pn = ln || fn ? /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${j}-above`,
		children: [
			on,
			sn,
			fn ? Ze : null,
			C,
			cn
		]
	}) : void 0, mn = N.taskStrip && T ? /* @__PURE__ */ p(ne, {
		label: T.label,
		status: T.status,
		...T.phase ? { phase: T.phase } : {},
		...T.percent === void 0 ? {} : { percent: T.percent },
		...T.onOpen ? { onOpen: T.onOpen } : {},
		...T.onStop ? { onStop: T.onStop } : {},
		...T.onDismiss ? { onDismiss: T.onDismiss } : {},
		"data-testid": `${j}-task`
	}) : null, hn = Qe != null && Qe !== !1 ? Qe : mn, gn = w != null && w !== !1, _n = !!ht || ln || gn || hn != null, vn = N.attachments === "chat-only" && L !== "chat", yn = {
		...M.modePlaceholders,
		...v ? { agent: v } : {},
		...ye
	}, bn = {
		...M.modeUnavailableReasons,
		...ve
	};
	return I.includes("agent") && bn.agent && !ye?.agent && !v && (yn.agent = bn.agent), /* @__PURE__ */ p(ce.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ p(se, {
			label: Dt ?? M.regionLabel,
			"data-testid": j,
			className: t(e.className, kt),
			above: B ? void 0 : pn,
			strip: B ? void 0 : hn ?? void 0,
			composer: /* @__PURE__ */ m(f, { children: [
				S != null && S !== !1 && /* @__PURE__ */ p("div", {
					className: "shrink-0",
					"data-testid": `${j}-dock-slot`,
					children: S
				}),
				B && /* @__PURE__ */ m(n, {
					ref: Ut,
					variant: "ghost",
					size: "sm",
					onClick: Jt,
					"data-composer-readonly-allow": $ ? "Expand composer" : void 0,
					"aria-label": "Expand composer",
					"aria-expanded": !1,
					"aria-controls": z,
					className: "w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm",
					"data-composer-surface": "collapsed",
					"data-composer-fold": "explicit",
					"data-testid": `${j}-expand`,
					children: [
						/* @__PURE__ */ p("span", {
							className: "shrink-0 font-semibold",
							children: L === "agent" ? "Agent" : L === "chat" ? "Chat" : L === "terminal" ? "Terminal" : "Search"
						}),
						/* @__PURE__ */ p("span", {
							className: "min-w-0 flex-1 truncate text-left font-normal text-text-secondary",
							children: gt || c.title || "Write a message…"
						}),
						Gt || H?.files.length ? /* @__PURE__ */ m("span", {
							className: "shrink-0 text-xs text-text-secondary",
							children: ["Draft kept", H?.files.length ? ` · ${H.files.length} attached` : ""]
						}) : null,
						/* @__PURE__ */ p(s, {
							dir: "up",
							size: 16
						})
					]
				}),
				/* @__PURE__ */ p("div", {
					id: z,
					hidden: B,
					children: D != null && D !== !1 ? D : /* @__PURE__ */ p(le, {
						ref: qt,
						"data-testid": At,
						mode: L,
						onModeChange: Nt,
						modeControl: "menu",
						singleModeLabel: !!e.singleModeLabel,
						layout: "auto",
						toolbar: e.toolbar,
						density: e.density,
						collapseWhenIdle: e.collapseWhenIdle,
						expanded: _n,
						onIdleFoldChange: dn,
						..._t ? { responsive: _t } : {},
						modeShortcuts: !X,
						modeTriggers: !X,
						...X ? {
							presentation: "prompt",
							onCommandPick: Zt
						} : {},
						backdropTone: yt ? "auto" : "none",
						working: vt,
						allowAttachments: Fe && !vn,
						allowEmoji: N.emoji && Ie,
						onRequestLink: Le,
						privacy: Re,
						onPrivacyChange: ze,
						privacyLabels: Be,
						references: Qt,
						onRemoveReference: en ? $t : void 0,
						modes: e.passModes ? F : _,
						disabledModes: I,
						modeUnavailableReasons: bn,
						modeHints: be,
						placeholder: v,
						inputLabel: Ot,
						modePlaceholders: yn,
						commands: q,
						onCommand: Ee,
						onSearchDocuments: Ne,
						documentMenu: Pe,
						onSearchPeople: N.mentions ? Ae : void 0,
						mentionMembers: je,
						onMentionNonMember: Me,
						disabled: bt,
						...$ ? { readOnly: A } : {},
						status: xt,
						hints: xe,
						suggestions: St,
						onSuggestion: Ct,
						...wt ? { suggestionsVisible: wt } : {},
						processes: st,
						onQuickOpen: ct,
						onShellCommand: lt,
						sendOptions: N.sendOptions ? Ve : void 0,
						onSendOption: N.sendOptions ? He : void 0,
						moreActions: tn.length ? tn : void 0,
						moreActionsLabel: Xe,
						submitLabel: Kt ? ke : Se,
						...Ce ? { submitDisabledReason: Ce } : {},
						maxInputHeight: Tt,
						toolbarExtras: an,
						submitLead: tt,
						modeRowEnd: nt != null || k ? /* @__PURE__ */ m(f, { children: [nt, k && !w && /* @__PURE__ */ p(i, {
							size: "sm",
							"aria-label": "Collapse composer",
							"data-composer-readonly-allow": $ ? "Collapse composer" : void 0,
							title: "Collapse composer",
							"aria-expanded": !0,
							"aria-controls": z,
							onClick: Yt,
							icon: /* @__PURE__ */ p(s, {
								dir: "down",
								size: 16
							}),
							"data-testid": `${j}-collapse`
						})] }) : void 0,
						modeRowStart: rt,
						...gn ? { header: w } : {},
						sendWithReferencesOnly: it,
						referencesAction: at,
						referenceDrop: ot,
						draft: H,
						onDraftChange: W,
						onSend: Xt
					}, `${P}:${It}`)
				})
			] })
		})
	});
}
//#endregion
export { _ as n, h as r, g as t };
