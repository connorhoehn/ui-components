import { t as e } from "./SegmentedControl-X19S_gNQ.js";
import { t } from "./FollowUpChips-BD9scwlC.js";
import { r as n } from "./RichChatComposer-C-WU9dlU.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/doc-editor/presentation/PresentationAgentComposer.tsx
var a = {
	slide: "Tell the agent what to change on this slide…",
	deck: "Tell the agent what to change across the deck…"
};
function o({ scope: o, onScopeChange: s, slideLabel: c, busy: l, onSubmit: u, suggestions: d, testIdPrefix: f }) {
	let p = l ? [{
		id: "deck-agent",
		label: o === "slide" ? `Agent is editing ${c}…` : "Agent is editing the deck…",
		tone: "running"
	}] : [], m = async (e) => {
		let t = e.text.trim();
		return t ? u(t) : !1;
	};
	return /* @__PURE__ */ i("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${f}-agent`,
		children: [/* @__PURE__ */ i("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ r(e, {
				size: "sm",
				value: o,
				onChange: (e) => s(e),
				options: [{
					value: "slide",
					label: "This slide"
				}, {
					value: "deck",
					label: "Whole deck"
				}],
				disabled: l,
				"aria-label": "What the agent may change",
				"data-testid": `${f}-agent-scope`
			}), !!d?.length && !l && /* @__PURE__ */ r("div", {
				className: "min-w-0",
				"data-testid": `${f}-agent-suggestions`,
				children: /* @__PURE__ */ r(t, {
					suggestions: [...d],
					onSelect: (e) => {
						u(e);
					},
					className: "py-0"
				})
			})]
		}), /* @__PURE__ */ r(n, {
			fixedMode: "agent",
			modePlaceholders: { agent: a[o] },
			processes: p,
			disabled: l,
			allowAttachments: !1,
			allowEmoji: !1,
			hints: [{
				key: "↵",
				label: "to send"
			}, {
				key: "⇧↵",
				label: "for a new line"
			}],
			onSend: m,
			"data-testid": `${f}-agent-composer`
		})]
	});
}
//#endregion
export { o as PresentationAgentComposer, o as default };
