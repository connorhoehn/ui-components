import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { n, t as r } from "./useWebSocket-CGc0yRhM.js";
import { t as i } from "./cn-DhjIN-s0.js";
import { t as a } from "./useResolvedTheme-C-Qskt8V.js";
import { Suspense as o, lazy as s, useCallback as c, useMemo as l, useRef as u } from "react";
import { jsx as d } from "react/jsx-runtime";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var f = s(() => import("./ExcalidrawCanvas-BO3EZf65.js"));
function p({ label: e }) {
	return /* @__PURE__ */ d("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function m(e) {
	return e.ydoc !== void 0;
}
function h(e) {
	return m(e) ? /* @__PURE__ */ d(g, { ...e }) : /* @__PURE__ */ d(_, { ...e });
}
function g({ ydoc: e, awareness: t, className: n, ...r }) {
	return /* @__PURE__ */ d("div", {
		className: i("h-full w-full", n),
		children: /* @__PURE__ */ d(o, {
			fallback: /* @__PURE__ */ d(p, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ d(f, {
				ydoc: e,
				awareness: t ?? null,
				...r
			})
		})
	});
}
function _({ gatewayUrl: e, diagramId: t, authToken: a, requireSync: s, loadingSlot: m, className: h, ...g }) {
	let _ = u(/* @__PURE__ */ new Set()), v = c((e) => (_.current.add(e), () => {
		_.current.delete(e);
	}), []), y = c((e) => {
		_.current.forEach((t) => t(e));
	}, []), b = l(() => ({
		wsUrl: e,
		cognitoToken: a,
		defaultChannel: `doc:${t}`
	}), [
		e,
		a,
		t
	]), x = r({
		config: b,
		onMessage: y
	}), { ydoc: S, provider: C, synced: w } = n({
		documentId: t,
		ws: x,
		onMessage: v
	});
	return S && (s !== !0 || w) ? /* @__PURE__ */ d("div", {
		className: i("h-full w-full", h),
		children: /* @__PURE__ */ d(o, {
			fallback: /* @__PURE__ */ d(p, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ d(f, {
				ydoc: S,
				awareness: C?.awareness ?? null,
				...g
			})
		})
	}) : /* @__PURE__ */ d("div", {
		className: i("h-full w-full", h),
		children: m ?? /* @__PURE__ */ d(p, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
var v = "excalidraw";
function y({ section: e, editable: t, ydoc: n, provider: r, user: a }) {
	return n ? /* @__PURE__ */ d("div", {
		"data-testid": `diagram-block-${e.id}`,
		className: i("h-[420px] w-full overflow-hidden rounded-md border border-border"),
		children: /* @__PURE__ */ d(h, {
			ydoc: n,
			awareness: r?.awareness,
			blockId: e.id,
			editable: t,
			user: {
				displayName: a?.name ?? "Anonymous",
				color: a?.color ?? "#3b82f6"
			}
		})
	}) : /* @__PURE__ */ d("div", {
		"data-testid": `diagram-block-unavailable-${e.id}`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	});
}
function b() {
	e({
		type: v,
		label: "Diagram",
		icon: "✎",
		description: "Collaborative Excalidraw canvas embedded in the page",
		rendererKeys: {
			editor: ["excalidraw:editor"],
			ack: ["excalidraw:reader"],
			reader: ["excalidraw:reader"]
		},
		rendererLabels: {
			"excalidraw:editor": "Diagram Editor",
			"excalidraw:reader": "Diagram Viewer"
		}
	}), t(v, "*", y);
}
//#endregion
export { h as CollaborativeExcalidraw, v as DIAGRAM_BLOCK_TYPE, y as DiagramBlockRenderer, b as registerDiagramBlock, a as useResolvedTheme };
