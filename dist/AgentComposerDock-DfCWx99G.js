import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-DhjIN-s0.js";
import { f as n, o as r } from "./Icons-CCn6EnUZ.js";
import { t as i } from "./DropdownMenu-dM1tsyrs.js";
import { n as a } from "./composerCommands-DSXH8omK.js";
import { t as o } from "./agentComposerDraft-Cj2sSkVv.js";
import { i as ee, t as te } from "./FloatingComposerDock-DMUQCjea.js";
import { r as ne } from "./RichChatComposer-DWLSykYx.js";
import { useCallback as s, useRef as c, useState as l } from "react";
import { Fragment as re, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/social/AgentComposerDock.tsx
var f = /* @__PURE__ */ e({
	AgentComposerDock: () => m,
	default: () => m
}), ie = ["chat", "terminal"], ae = [], oe = {
	chat: "This view has no discussion thread — ask the agent instead",
	terminal: "This view has no terminal"
};
function p(e) {
	return typeof e == "string" || e === void 0 ? o(e ?? "") : e;
}
function se(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function m({ presentation: e = "compact", mode: f, defaultMode: m = "agent", onModeChange: h, placeholder: g, modePlaceholders: _, references: ce, onRemoveReference: le, commands: v, workflows: ue, onWorkflow: y, modes: b, disabledModes: de, modeUnavailableReasons: fe, dock: x, draft: S, onDraftChange: C, defaultDraft: w, draftKey: T = "", onSend: E, onSearchDocuments: D, documentMenu: O, onSearchPeople: k, allowAttachments: A = !0, allowEmoji: j, disabled: M, working: N, status: P, hints: F, suggestions: I, onSuggestion: L, submitLabel: R, maxInputHeight: z, composerRef: B, label: V = "Agent composer", inputLabel: pe = "Message", className: me, "data-testid": H = "agent-composer-dock", composerTestId: he }) {
	let ge = de ?? (b ? ae : ie), [_e, ve] = l(m), U = f ?? _e, ye = s((e) => {
		f === void 0 && ve(e), h?.(e);
	}, [f, h]), [be, W] = l(() => p(w)), [xe, G] = l(0), [Se, Ce] = l(T);
	Se !== T && (Ce(T), W(p(w)), G(0));
	let K = S !== void 0, q = K ? S : be, J = c(q);
	J.current = q;
	let Y = s((e, t) => {
		K || W(e), C?.(e, t);
	}, [K, C]), we = s((e) => {
		if (y) {
			y(e);
			return;
		}
		let t = o(`/${e} `);
		Y(t, J.current), G((e) => e + 1);
	}, [y, Y]), X = c(null), Te = s((e) => {
		X.current = e, se(B, e);
	}, [B]), Z = s((e) => {
		let t = X.current?.editor?.getText(), n = e;
		if (t !== void 0 && t !== e.text) {
			let r = a(t, v), i = r ? {
				trigger: r.trigger,
				...e.command?.trigger === r.trigger && e.command.argument ? { argument: e.command.argument } : {}
			} : void 0;
			n = {
				...e,
				text: t,
				command: i
			}, i || delete n.command;
		}
		return E(n, { mode: e.mode ?? U });
	}, [
		v,
		U,
		E
	]), Ee = {
		...g ? { agent: g } : {},
		..._
	}, Q = e === "document", $ = ue ?? [];
	return /* @__PURE__ */ u(te.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ u(ee, {
			label: V,
			"data-testid": H,
			className: t("bg-surface pt-3 [--dock-inset:1.5rem]", me),
			composer: /* @__PURE__ */ d(re, { children: [x != null && x !== !1 && /* @__PURE__ */ u("div", {
				className: "shrink-0",
				"data-testid": `${H}-dock-slot`,
				children: x
			}), /* @__PURE__ */ u(ne, {
				ref: Te,
				"data-testid": he,
				mode: U,
				onModeChange: ye,
				modeControl: "menu",
				layout: "auto",
				toolbar: Q ? "editor" : "compact",
				density: Q ? "comfortable" : "compact",
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: "none",
				allowAttachments: A,
				allowEmoji: j,
				references: ce,
				onRemoveReference: le,
				modes: b,
				disabledModes: ge,
				modeUnavailableReasons: {
					...oe,
					...fe
				},
				placeholder: g,
				inputLabel: pe,
				modePlaceholders: Ee,
				commands: v,
				onSearchDocuments: D,
				documentMenu: O,
				onSearchPeople: k,
				disabled: M,
				working: N,
				status: P,
				hints: F,
				suggestions: I,
				onSuggestion: L,
				submitLabel: R,
				maxInputHeight: z,
				toolbarExtras: $.length > 0 ? /* @__PURE__ */ u(i, {
					trigger: /* @__PURE__ */ d("span", {
						className: "inline-flex items-center gap-2",
						children: [
							/* @__PURE__ */ u(r, {
								size: 14,
								"aria-hidden": !0
							}),
							"Workflow",
							/* @__PURE__ */ u(n, {
								dir: "down",
								size: 14,
								"aria-hidden": !0
							})
						]
					}),
					triggerLabel: "Workflow",
					triggerClassName: "h-7 px-2 text-xs font-medium text-text-secondary",
					triggerTestId: `${H}-workflow`,
					sections: [{ items: $.map((e) => ({
						label: e.label,
						description: e.description,
						disabled: e.disabled,
						disabledReason: e.disabledReason,
						onSelect: () => we(e.id)
					})) }]
				}) : void 0,
				draft: q,
				onDraftChange: Y,
				onSend: Z
			}, `${T}:${xe}`)] })
		})
	});
}
//#endregion
export { f as n, m as t };
