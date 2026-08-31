import { t as e } from "./Button-wU9TwJvB.js";
import { t } from "./Banner-BLOg1hC_.js";
import { t as n } from "./Chip-YhQI5B9P.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { t as i } from "./TiptapEditor-BQYsBaf7.js";
import { useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/doc-editor/CanvasDocumentView.tsx
function c({ isCanvas: c, body: l, ydoc: u, provider: d, user: f, editable: p = !0, extensions: m, onConvert: h, unsupported: g = [], header: _, "data-testid": v = "canvas-document" }) {
	let [y, b] = a(!1), [x, S] = a(null);
	return /* @__PURE__ */ s("div", {
		"data-testid": v,
		className: "flex flex-col gap-3",
		children: [
			_,
			g.length > 0 && /* @__PURE__ */ o(t, {
				variant: "warning",
				title: "Some content could not be represented",
				"data-testid": `${v}-unsupported`,
				children: /* @__PURE__ */ s("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [g.map((e, t) => /* @__PURE__ */ o(n, {
						tone: "warning",
						size: "xs",
						children: e.kind
					}, `${e.kind}-${t}`)), /* @__PURE__ */ o("span", { children: "— kept on the page as text so nothing was lost." })]
				})
			}),
			x && /* @__PURE__ */ o(t, {
				variant: "error",
				title: "Could not convert",
				"data-testid": `${v}-convert-error`,
				children: x
			}),
			c && l ? /* @__PURE__ */ o("div", {
				"data-testid": `${v}-paper`,
				className: "rounded-lg border border-paper-border bg-paper px-10 py-8 text-paper-ink shadow-sm",
				children: /* @__PURE__ */ o(i, {
					fragment: l,
					ydoc: u,
					provider: d,
					user: f,
					editable: p,
					extensions: m,
					placeholder: "Start writing…"
				})
			}) : /* @__PURE__ */ o(r, {
				testId: `${v}-convert-prompt`,
				title: "This document still uses sections",
				description: "Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted.",
				action: h ? /* @__PURE__ */ o(e, {
					onClick: async () => {
						if (!(!h || y)) {
							b(!0), S(null);
							try {
								let e = await h();
								e && S(e);
							} catch (e) {
								S(e instanceof Error ? e.message : String(e));
							} finally {
								b(!1);
							}
						}
					},
					disabled: y,
					"data-testid": `${v}-convert`,
					children: y ? "Converting…" : "Convert to page"
				}) : void 0
			})
		]
	});
}
//#endregion
export { c as t };
