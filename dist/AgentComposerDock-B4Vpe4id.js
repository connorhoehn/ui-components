import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-DhjIN-s0.js";
import { f as n, o as r } from "./Icons-BSEVGRI6.js";
import { t as i } from "./DropdownMenu-CHrQvZgc.js";
import { n as ee } from "./composerCommands-CgPFKkKH.js";
import { t as a } from "./agentComposerDraft-Cj2sSkVv.js";
import { i as te, t as ne } from "./FloatingComposerDock-DMUQCjea.js";
import { r as re } from "./RichChatComposer-BP--4sGI.js";
import { useCallback as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/social/AgentComposerDock.tsx
var d = /* @__PURE__ */ e({
	AgentComposerDock: () => p,
	default: () => p
}), ie = ["chat", "terminal"], ae = {
	chat: "This view has no discussion thread — ask the agent instead",
	terminal: "This view has no terminal"
};
function f(e) {
	return typeof e == "string" || e === void 0 ? a(e ?? "") : e;
}
function oe(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function p({ presentation: e = "compact", mode: d, defaultMode: p = "agent", onModeChange: m, placeholder: h, modePlaceholders: g, references: se, onRemoveReference: ce, commands: _, workflows: le, onWorkflow: v, disabledModes: ue = ie, modeUnavailableReasons: de, draft: y, onDraftChange: b, defaultDraft: x, draftKey: S = "", onSend: C, onSearchDocuments: w, documentMenu: T, onSearchPeople: E, allowAttachments: D = !0, allowEmoji: O, disabled: k, working: A, status: j, hints: M, suggestions: N, onSuggestion: P, submitLabel: F, maxInputHeight: I, composerRef: L, label: R = "Agent composer", className: z, "data-testid": B = "agent-composer-dock", composerTestId: V }) {
	let [H, fe] = c(p), U = d ?? H, pe = o((e) => {
		d === void 0 && fe(e), m?.(e);
	}, [d, m]), [me, W] = c(() => f(x)), [he, G] = c(0), [ge, _e] = c(S);
	ge !== S && (_e(S), W(f(x)), G(0));
	let K = y !== void 0, q = K ? y : me, J = s(q);
	J.current = q;
	let Y = o((e, t) => {
		K || W(e), b?.(e, t);
	}, [K, b]), ve = o((e) => {
		if (v) {
			v(e);
			return;
		}
		let t = a(`/${e} `);
		Y(t, J.current), G((e) => e + 1);
	}, [v, Y]), X = s(null), Z = o((e) => {
		X.current = e, oe(L, e);
	}, [L]), ye = o((e) => {
		let t = X.current?.editor?.getText(), n = e;
		if (t !== void 0 && t !== e.text) {
			let r = ee(t, _), i = r ? {
				trigger: r.trigger,
				...e.command?.trigger === r.trigger && e.command.argument ? { argument: e.command.argument } : {}
			} : void 0;
			n = {
				...e,
				text: t,
				command: i
			}, i || delete n.command;
		}
		return C(n, { mode: e.mode ?? U });
	}, [
		_,
		U,
		C
	]), be = {
		...h ? { agent: h } : {},
		...g
	}, Q = e === "document", $ = le ?? [];
	return /* @__PURE__ */ l(ne.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ l(te, {
			label: R,
			"data-testid": B,
			className: t("bg-surface pt-3 [--dock-inset:1.5rem]", z),
			composer: /* @__PURE__ */ l(re, {
				ref: Z,
				"data-testid": V,
				mode: U,
				onModeChange: pe,
				modeControl: "menu",
				layout: "auto",
				toolbar: Q ? "editor" : "compact",
				density: Q ? "comfortable" : "compact",
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: "none",
				allowAttachments: D,
				allowEmoji: O,
				references: se,
				onRemoveReference: ce,
				disabledModes: ue,
				modeUnavailableReasons: {
					...ae,
					...de
				},
				placeholder: h,
				modePlaceholders: be,
				commands: _,
				onSearchDocuments: w,
				documentMenu: T,
				onSearchPeople: E,
				disabled: k,
				working: A,
				status: j,
				hints: M,
				suggestions: N,
				onSuggestion: P,
				submitLabel: F,
				maxInputHeight: I,
				toolbarExtras: $.length > 0 ? /* @__PURE__ */ l(i, {
					trigger: /* @__PURE__ */ u("span", {
						className: "inline-flex items-center gap-2",
						children: [
							/* @__PURE__ */ l(r, {
								size: 14,
								"aria-hidden": !0
							}),
							"Workflow",
							/* @__PURE__ */ l(n, {
								dir: "down",
								size: 14,
								"aria-hidden": !0
							})
						]
					}),
					triggerLabel: "Workflow",
					triggerClassName: "h-7 px-2 text-xs font-medium text-text-secondary",
					triggerTestId: `${B}-workflow`,
					sections: [{ items: $.map((e) => ({
						label: e.label,
						description: e.description,
						disabled: e.disabled,
						disabledReason: e.disabledReason,
						onSelect: () => ve(e.id)
					})) }]
				}) : void 0,
				draft: q,
				onDraftChange: Y,
				onSend: ye
			}, `${S}:${he}`)
		})
	});
}
//#endregion
export { d as n, p as t };
