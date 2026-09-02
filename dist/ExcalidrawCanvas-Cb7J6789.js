import { t as e } from "./cn-DhjIN-s0.js";
import { n as t, t as n } from "./useResolvedTheme-MncahQcS.js";
import { useCallback as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { CaptureUpdateAction as u, Excalidraw as d, reconcileElements as f } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useCollaborativeDiagram as p } from "@connorhoehn/realtime-modules/adapters/excalidraw";
//#region src/components/diagram/ExcalidrawCanvas.tsx
function m({ ydoc: m, awareness: h, blockId: g, user: _, editable: v = !0, className: y, assetPath: b, onSceneChange: x, followUserId: S = null }) {
	let C = o(null), w = n(C), T = o(null), E = o(null), D = o(!1), [O, k] = s(!1);
	i(() => {
		!b || typeof window > "u" || (window.EXCALIDRAW_ASSET_PATH = b);
	}, [b]);
	let A = r((e) => {
		let t = T.current;
		if (!t) return;
		let n = f(t.getSceneElementsIncludingDeleted(), e, t.getAppState());
		t.updateScene({
			elements: n,
			captureUpdate: u.NEVER
		});
	}, []), { ready: j, collaborators: M, participants: N, commitLocal: P, publishPresence: F, readAll: I } = p({
		ydoc: m,
		awareness: h,
		blockId: g,
		user: _,
		onRemoteElements: A
	}), L = o(!1);
	i(() => {
		if (L.current || !O || !j) return;
		let e = !1, t = null, n = (r) => {
			if (e || L.current) return;
			let i = T.current, a = i ? I() : [];
			if (i && i.getSceneElementsIncludingDeleted().length > 0) {
				L.current = !0;
				return;
			}
			i && a.length > 0 && i.updateScene({
				elements: a,
				captureUpdate: u.NEVER
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
		O,
		j,
		I
	]);
	let R = r((e, t) => {
		if (!D.current) {
			let e = {
				scrollX: t.scrollX ?? 0,
				scrollY: t.scrollY ?? 0,
				zoom: t.zoom?.value ?? 1
			}, n = E.current;
			(!n || Math.abs(n.scrollX - e.scrollX) > .5 || Math.abs(n.scrollY - e.scrollY) > .5 || n.zoom !== e.zoom) && (E.current = e, F({ viewport: e }));
		}
		v && (P(e), F({ selectedElementIds: t.selectedElementIds }), x?.(e.length));
	}, [
		P,
		F,
		v,
		x
	]), z = r((e) => {
		F({
			pointer: e.pointer,
			button: e.button
		});
	}, [F]);
	i(() => {
		let e = T.current;
		if (!e) return;
		let t = /* @__PURE__ */ new Map();
		for (let e of M) t.set(e.clientId, {
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
	}, [M, O]);
	let B = a(() => S ? N.find((e) => !e.isSelf && (e.userId === S || e.clientId === S)) ?? null : null, [S, N]), V = B?.viewport?.scrollX, H = B?.viewport?.scrollY, U = B?.viewport?.zoom;
	return i(() => {
		let e = T.current;
		if (!e || V === void 0 || H === void 0 || U === void 0) return;
		D.current = !0, e.updateScene({
			appState: {
				scrollX: V,
				scrollY: H,
				zoom: { value: U }
			},
			captureUpdate: u.NEVER
		});
		let t = setTimeout(() => {
			D.current = !1;
		}, 0);
		return () => clearTimeout(t);
	}, [
		V,
		H,
		U,
		O
	]), /* @__PURE__ */ l("div", {
		ref: C,
		"data-testid": "excalidraw-canvas",
		className: e("relative h-full w-full", y),
		children: [/* @__PURE__ */ c("div", {
			className: "pointer-events-none absolute right-2 top-20 z-[5] flex justify-end",
			children: /* @__PURE__ */ c(t, { participants: N })
		}), /* @__PURE__ */ c(d, {
			theme: w,
			viewModeEnabled: !v,
			isCollaborating: !0,
			excalidrawAPI: (e) => {
				T.current = e, k(!0);
			},
			onChange: R,
			onPointerUpdate: z,
			UIOptions: { canvasActions: { toggleTheme: !1 } }
		})]
	});
}
//#endregion
export { m as default };
