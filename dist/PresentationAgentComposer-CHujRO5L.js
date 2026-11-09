import { o as e } from "./Button-DQoeE5dN.js";
import { t } from "./SegmentedControl-DMudc23g.js";
import { t as n } from "./FollowUpChips-DiWiWsSm.js";
import { r } from "./RichChatComposer-C9nqo_2q.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/doc-editor/presentation/PresentationAgentComposer.tsx
var o = {
	slide: "Tell the agent what to change on this slide…",
	deck: "Tell the agent what to change across the deck…"
};
function s({ scope: s, onScopeChange: c, slideLabel: l, busy: u, onSubmit: d, suggestions: f, testIdPrefix: p }) {
	let m = u ? [{
		id: "deck-agent",
		label: s === "slide" ? `Agent is editing ${l}…` : "Agent is editing the deck…",
		tone: "running"
	}] : [], h = async (e) => {
		let t = e.text.trim();
		return t ? d(t) : !1;
	};
	return /* @__PURE__ */ a("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${p}-agent`,
		children: [/* @__PURE__ */ a("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ i(e, {
				density: "compact",
				children: /* @__PURE__ */ i(t, {
					value: s,
					onChange: (e) => c(e),
					options: [{
						value: "slide",
						label: "This slide"
					}, {
						value: "deck",
						label: "Whole deck"
					}],
					disabled: u,
					"aria-label": "What the agent may change",
					"data-testid": `${p}-agent-scope`
				})
			}), !!f?.length && !u && /* @__PURE__ */ i("div", {
				className: "min-w-0",
				"data-testid": `${p}-agent-suggestions`,
				children: /* @__PURE__ */ i(n, {
					suggestions: [...f],
					onSelect: (e) => {
						d(e);
					},
					className: "py-0"
				})
			})]
		}), /* @__PURE__ */ i(r, {
			fixedMode: "agent",
			modePlaceholders: { agent: o[s] },
			processes: m,
			disabled: u,
			allowAttachments: !1,
			allowEmoji: !1,
			hints: [{
				key: "↵",
				label: "to send"
			}, {
				key: "⇧↵",
				label: "for a new line"
			}],
			onSend: h,
			"data-testid": `${p}-agent-composer`
		})]
	});
}
//#endregion
export { s as PresentationAgentComposer, s as default };
