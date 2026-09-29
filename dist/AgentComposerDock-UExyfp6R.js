import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./cn-DhjIN-s0.js";
import { f as n, o as r } from "./Icons-CCn6EnUZ.js";
import { t as i } from "./DropdownMenu-dM1tsyrs.js";
import { n as ee } from "./composerCommands-DSXH8omK.js";
import { t as a } from "./agentComposerDraft-Cj2sSkVv.js";
import { i as te, t as ne } from "./FloatingComposerDock-DMUQCjea.js";
import { r as re } from "./RichChatComposer-DWLSykYx.js";
import { useCallback as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as ie } from "react/jsx-runtime";
//#region src/components/social/AgentComposerDock.tsx
var u = /* @__PURE__ */ e({
	AgentComposerDock: () => p,
	default: () => p
}), ae = ["chat", "terminal"], oe = {
	chat: "This view has no discussion thread — ask the agent instead",
	terminal: "This view has no terminal"
};
function d(e) {
	return typeof e == "string" || e === void 0 ? a(e ?? "") : e;
}
function f(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function p({ presentation: e = "compact", mode: u, defaultMode: p = "agent", onModeChange: m, placeholder: h, modePlaceholders: g, references: se, onRemoveReference: ce, commands: _, workflows: le, onWorkflow: v, disabledModes: y = ae, modeUnavailableReasons: ue, draft: b, onDraftChange: x, defaultDraft: S, draftKey: C = "", onSend: w, onSearchDocuments: T, documentMenu: E, onSearchPeople: D, allowAttachments: O = !0, allowEmoji: k, disabled: A, working: j, status: M, hints: N, suggestions: P, onSuggestion: F, submitLabel: I, maxInputHeight: L, composerRef: R, label: z = "Agent composer", inputLabel: B = "Message", className: V, "data-testid": H = "agent-composer-dock", composerTestId: U }) {
	let [de, fe] = c(p), W = u ?? de, pe = o((e) => {
		u === void 0 && fe(e), m?.(e);
	}, [u, m]), [me, G] = c(() => d(S)), [he, K] = c(0), [ge, _e] = c(C);
	ge !== C && (_e(C), G(d(S)), K(0));
	let q = b !== void 0, J = q ? b : me, Y = s(J);
	Y.current = J;
	let X = o((e, t) => {
		q || G(e), x?.(e, t);
	}, [q, x]), ve = o((e) => {
		if (v) {
			v(e);
			return;
		}
		let t = a(`/${e} `);
		X(t, Y.current), K((e) => e + 1);
	}, [v, X]), Z = s(null), ye = o((e) => {
		Z.current = e, f(R, e);
	}, [R]), be = o((e) => {
		let t = Z.current?.editor?.getText(), n = e;
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
		return w(n, { mode: e.mode ?? W });
	}, [
		_,
		W,
		w
	]), xe = {
		...h ? { agent: h } : {},
		...g
	}, Q = e === "document", $ = le ?? [];
	return /* @__PURE__ */ l(ne.Provider, {
		value: "pinned",
		children: /* @__PURE__ */ l(te, {
			label: z,
			"data-testid": H,
			className: t("bg-surface pt-3 [--dock-inset:1.5rem]", V),
			composer: /* @__PURE__ */ l(re, {
				ref: ye,
				"data-testid": U,
				mode: W,
				onModeChange: pe,
				modeControl: "menu",
				layout: "auto",
				toolbar: Q ? "editor" : "compact",
				density: Q ? "comfortable" : "compact",
				modeShortcuts: !0,
				modeTriggers: !0,
				backdropTone: "none",
				allowAttachments: O,
				allowEmoji: k,
				references: se,
				onRemoveReference: ce,
				disabledModes: y,
				modeUnavailableReasons: {
					...oe,
					...ue
				},
				placeholder: h,
				inputLabel: B,
				modePlaceholders: xe,
				commands: _,
				onSearchDocuments: T,
				documentMenu: E,
				onSearchPeople: D,
				disabled: A,
				working: j,
				status: M,
				hints: N,
				suggestions: P,
				onSuggestion: F,
				submitLabel: I,
				maxInputHeight: L,
				toolbarExtras: $.length > 0 ? /* @__PURE__ */ l(i, {
					trigger: /* @__PURE__ */ ie("span", {
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
					triggerTestId: `${H}-workflow`,
					sections: [{ items: $.map((e) => ({
						label: e.label,
						description: e.description,
						disabled: e.disabled,
						disabledReason: e.disabledReason,
						onSelect: () => ve(e.id)
					})) }]
				}) : void 0,
				draft: J,
				onDraftChange: X,
				onSend: be
			}, `${C}:${he}`)
		})
	});
}
//#endregion
export { u as n, p as t };
