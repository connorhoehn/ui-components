import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useResolvedTheme-C-Qskt8V.js";
import { useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o } from "react/jsx-runtime";
import { CaptureUpdateAction as s, Excalidraw as c, reconcileElements as l } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useCollaborativeDiagram as u } from "@connorhoehn/realtime-modules/adapters/excalidraw";
//#region src/components/diagram/ExcalidrawCanvas.tsx
function d({ ydoc: d, awareness: f, blockId: p, user: m, editable: h = !0, className: g, assetPath: _, onSceneChange: v }) {
	let y = i(null), b = t(y), x = i(null), [S, C] = a(!1);
	r(() => {
		!_ || typeof window > "u" || (window.EXCALIDRAW_ASSET_PATH = _);
	}, [_]);
	let w = n((e) => {
		let t = x.current;
		if (!t) return;
		let n = l(t.getSceneElementsIncludingDeleted(), e, t.getAppState());
		t.updateScene({
			elements: n,
			captureUpdate: s.NEVER
		});
	}, []), { ready: T, collaborators: E, commitLocal: D, publishPointer: O, readAll: k } = u({
		ydoc: d,
		awareness: f,
		blockId: p,
		user: m,
		onRemoteElements: w
	}), A = i(!1);
	r(() => {
		if (A.current || !S || !T) return;
		let e = !1, t = null, n = (r) => {
			if (e || A.current) return;
			let i = x.current, a = i ? k() : [];
			if (i && i.getSceneElementsIncludingDeleted().length > 0) {
				A.current = !0;
				return;
			}
			i && a.length > 0 && i.updateScene({
				elements: a,
				captureUpdate: s.NEVER
			});
			let [o, ...c] = r;
			o !== void 0 && (t = setTimeout(() => n(c), o));
		};
		return n([
			0,
			60,
			150,
			300,
			600,
			1e3,
			1500,
			1500
		]), () => {
			e = !0, t && clearTimeout(t);
		};
	}, [
		S,
		T,
		k
	]);
	let j = n((e, t) => {
		h && (D(e), O({ selectedElementIds: t.selectedElementIds }), v?.(e.length));
	}, [
		D,
		O,
		h,
		v
	]), M = n((e) => {
		O({
			pointer: e.pointer,
			button: e.button
		});
	}, [O]);
	return r(() => {
		let e = x.current;
		if (!e) return;
		let t = /* @__PURE__ */ new Map();
		for (let e of E) t.set(e.clientId, {
			username: e.displayName,
			pointer: e.pointer,
			button: e.button,
			selectedElementIds: e.selectedElementIds,
			color: {
				background: e.color,
				stroke: e.color
			},
			id: e.userId ?? e.clientId
		});
		e.updateScene({ collaborators: t });
	}, [E, S]), /* @__PURE__ */ o("div", {
		ref: y,
		"data-testid": "excalidraw-canvas",
		className: e("h-full w-full", g),
		children: /* @__PURE__ */ o(c, {
			theme: b,
			viewModeEnabled: !h,
			isCollaborating: !0,
			excalidrawAPI: (e) => {
				x.current = e, C(!0);
			},
			onChange: j,
			onPointerUpdate: M,
			UIOptions: { canvasActions: { toggleTheme: !1 } }
		})
	});
}
//#endregion
export { d as default };
