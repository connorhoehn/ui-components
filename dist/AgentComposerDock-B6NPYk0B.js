import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t } from "./ContextComposer-Bnup7QEH.js";
import { useMemo as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/components/social/AgentComposerDock.tsx
var i = /* @__PURE__ */ e({
	AgentComposerDock: () => l,
	default: () => l
}), a = ["chat", "terminal"], o = [], s = {
	chat: "This view has no discussion thread — ask the agent instead",
	terminal: "This view has no terminal"
}, c = [
	"chat",
	"agent",
	"terminal"
];
function l({ presentation: e = "compact", defaultMode: i = "agent", modes: l, disabledModes: u, modeUnavailableReasons: d, draftKey: f = "", allowAttachments: p = !0, allowEmoji: m = !1, label: h = "Agent composer", className: g, "data-testid": _ = "agent-composer-dock", onSend: v, ...y }) {
	let b = u ?? (l ? o : a), x = e === "document", S = n(() => ({
		kind: "initiative",
		modes: l ?? c,
		defaultMode: i,
		disabledModes: b,
		modeUnavailableReasons: s,
		modePlaceholders: {},
		chipLabel: null,
		regionLabel: h,
		features: {
			contextChip: !1,
			workflows: !0,
			workflowCommand: null,
			pageActions: !1,
			sendOptions: !1,
			reply: !1,
			taskStrip: !1,
			offline: !1,
			modelUnavailable: !1,
			attachments: "always",
			emoji: !0,
			mentions: !0,
			typedText: !0
		}
	}), [
		l,
		i,
		b,
		h
	]);
	return /* @__PURE__ */ r(t, {
		...y,
		look: {
			preset: S,
			toolbar: x ? "editor" : "compact",
			density: x ? "comfortable" : "compact",
			collapseWhenIdle: !1,
			passModes: !1,
			className: "bg-surface pt-3 [--dock-inset:1.5rem]"
		},
		context: {
			kind: "initiative",
			id: f,
			title: ""
		},
		contextChip: !1,
		defaultMode: i,
		...l ? { modes: l } : {},
		disabledModes: b,
		modeUnavailableReasons: d,
		draftKey: f,
		allowAttachments: p,
		allowEmoji: m,
		console: !1,
		label: h,
		...g ? { className: g } : {},
		"data-testid": _,
		onSend: (e, t) => v(e, { mode: t.mode })
	});
}
//#endregion
export { i as n, l as t };
