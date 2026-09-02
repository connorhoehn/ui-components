import { t as e } from "./cn-DhjIN-s0.js";
import { n as t, t as n } from "./useResolvedTheme-MncahQcS.js";
import { useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { CaptureUpdateAction as l, Excalidraw as u, reconcileElements as d } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useCollaborativeDiagram as f } from "@connorhoehn/realtime-modules/adapters/excalidraw";
//#region src/components/diagram/ExcalidrawCanvas.tsx
function p({ ydoc: p, awareness: m, blockId: h, user: g, editable: _ = !0, className: v, assetPath: y, onSceneChange: b }) {
	let x = a(null), S = n(x), C = a(null), [w, T] = o(!1);
	i(() => {
		!y || typeof window > "u" || (window.EXCALIDRAW_ASSET_PATH = y);
	}, [y]);
	let E = r((e) => {
		let t = C.current;
		if (!t) return;
		let n = d(t.getSceneElementsIncludingDeleted(), e, t.getAppState());
		t.updateScene({
			elements: n,
			captureUpdate: l.NEVER
		});
	}, []), { ready: D, collaborators: O, participants: k, commitLocal: A, publishPresence: j, readAll: M } = f({
		ydoc: p,
		awareness: m,
		blockId: h,
		user: g,
		onRemoteElements: E
	}), N = a(!1);
	i(() => {
		if (N.current || !w || !D) return;
		let e = !1, t = null, n = (r) => {
			if (e || N.current) return;
			let i = C.current, a = i ? M() : [];
			if (i && i.getSceneElementsIncludingDeleted().length > 0) {
				N.current = !0;
				return;
			}
			i && a.length > 0 && i.updateScene({
				elements: a,
				captureUpdate: l.NEVER
			});
			let [o, ...s] = r;
			o !== void 0 && (t = setTimeout(() => n(s), o));
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
		w,
		D,
		M
	]);
	let P = r((e, t) => {
		_ && (A(e), j({ selectedElementIds: t.selectedElementIds }), b?.(e.length));
	}, [
		A,
		j,
		_,
		b
	]), F = r((e) => {
		j({
			pointer: e.pointer,
			button: e.button
		});
	}, [j]);
	return i(() => {
		let e = C.current;
		if (!e) return;
		let t = /* @__PURE__ */ new Map();
		for (let e of O) t.set(e.clientId, {
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
	}, [O, w]), /* @__PURE__ */ c("div", {
		ref: x,
		"data-testid": "excalidraw-canvas",
		className: e("relative h-full w-full", v),
		children: [/* @__PURE__ */ s("div", {
			className: "pointer-events-none absolute right-2 top-20 z-[5] flex justify-end",
			children: /* @__PURE__ */ s(t, { participants: k })
		}), /* @__PURE__ */ s(u, {
			theme: S,
			viewModeEnabled: !_,
			isCollaborating: !0,
			excalidrawAPI: (e) => {
				C.current = e, T(!0);
			},
			onChange: P,
			onPointerUpdate: F,
			UIOptions: { canvasActions: { toggleTheme: !1 } }
		})]
	});
}
//#endregion
export { p as default };
