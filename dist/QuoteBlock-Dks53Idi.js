import { d as e } from "./Button-DQoeE5dN.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/social/QuoteBlock.tsx
function i(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function a(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function o({ quote: o, onJump: s, onDismiss: c, className: l, "data-testid": u = "quote-block" }) {
	let d = /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ r("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ n("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: o.author
		}), o.timestamp && /* @__PURE__ */ n("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: a(o.timestamp)
		})]
	}), /* @__PURE__ */ n("span", {
		className: "block truncate text-xs text-text-secondary",
		children: i(o.text)
	})] });
	return /* @__PURE__ */ r("div", {
		"data-testid": u,
		"data-quoted-message-id": o.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", l),
		children: [s ? /* @__PURE__ */ n("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": `${u}-jump`,
			onClick: () => s(o.messageId),
			"aria-label": `Go to the message from ${o.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: d
		}) : /* @__PURE__ */ n("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: d
		}), c && /* @__PURE__ */ n("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": `${u}-dismiss`,
			"aria-label": "Remove quote",
			onClick: c,
			className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
			children: "✕"
		})]
	});
}
//#endregion
export { i as n, o as t };
