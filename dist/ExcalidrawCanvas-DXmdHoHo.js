import { d as e } from "./Button-DQoeE5dN.js";
import { n as t, t as n } from "./useResolvedTheme-CRd7AB6_.js";
import { useCallback as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { CaptureUpdateAction as u, Excalidraw as d, reconcileElements as f } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useCollaborativeDiagram as p } from "@connorhoehn/realtime-modules/adapters/excalidraw";
//#region src/components/diagram/ExcalidrawCanvas.tsx
function m({ ydoc: m, awareness: h, blockId: g, user: _, editable: v = !0, className: y, assetPath: b, onSceneChange: x, followUserId: S = null, presenceActions: C }) {
	let w = o(null), T = n(w), E = o(null), D = o(null), O = o(!1), [k, A] = s(!1);
	i(() => {
		!b || typeof window > "u" || (window.EXCALIDRAW_ASSET_PATH = b);
	}, [b]);
	let j = r((e) => {
		let t = E.current;
		if (!t) return;
		let n = f(t.getSceneElementsIncludingDeleted(), e, t.getAppState());
		t.updateScene({
			elements: n,
			captureUpdate: u.NEVER
		});
	}, []), { ready: M, collaborators: N, participants: P, commitLocal: F, publishPresence: I, readAll: L } = p({
		ydoc: m,
		awareness: h,
		blockId: g,
		user: _,
		onRemoteElements: j
	}), R = o(!1);
	i(() => {
		if (R.current || !k || !M) return;
		let e = !1, t = null, n = (r) => {
			if (e || R.current) return;
			let i = E.current, a = i ? L() : [];
			if (i && i.getSceneElementsIncludingDeleted().length > 0) {
				R.current = !0;
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
		k,
		M,
		L
	]);
	let z = r((e, t) => {
		if (!O.current) {
			let e = {
				scrollX: t.scrollX ?? 0,
				scrollY: t.scrollY ?? 0,
				zoom: t.zoom?.value ?? 1
			}, n = D.current;
			(!n || Math.abs(n.scrollX - e.scrollX) > .5 || Math.abs(n.scrollY - e.scrollY) > .5 || n.zoom !== e.zoom) && (D.current = e, I({ viewport: e }));
		}
		v && (F(e), I({ selectedElementIds: t.selectedElementIds }), x?.(e.length));
	}, [
		F,
		I,
		v,
		x
	]), B = r((e) => {
		I({
			pointer: e.pointer,
			button: e.button
		});
	}, [I]);
	i(() => {
		let e = E.current;
		if (!e) return;
		let t = /* @__PURE__ */ new Map();
		for (let e of N) t.set(e.clientId, {
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
	}, [N, k]);
	let V = a(() => S ? P.find((e) => !e.isSelf && (e.userId === S || e.clientId === S)) ?? null : null, [S, P]), H = V?.viewport?.scrollX, U = V?.viewport?.scrollY, W = V?.viewport?.zoom;
	return i(() => {
		let e = E.current;
		if (!e || H === void 0 || U === void 0 || W === void 0) return;
		O.current = !0, e.updateScene({
			appState: {
				scrollX: H,
				scrollY: U,
				zoom: { value: W }
			},
			captureUpdate: u.NEVER
		});
		let t = setTimeout(() => {
			O.current = !1;
		}, 0);
		return () => clearTimeout(t);
	}, [
		H,
		U,
		W,
		k
	]), /* @__PURE__ */ l("div", {
		ref: w,
		"data-testid": "excalidraw-canvas",
		className: e("relative h-full w-full", y),
		children: [/* @__PURE__ */ c("div", {
			className: "pointer-events-none absolute right-2 top-20 z-[5] flex justify-end",
			children: /* @__PURE__ */ c(t, {
				participants: P,
				actions: C,
				followingUserId: S
			})
		}), /* @__PURE__ */ c(d, {
			theme: T,
			viewModeEnabled: !v,
			isCollaborating: !0,
			excalidrawAPI: (e) => {
				E.current = e, A(!0);
			},
			onChange: z,
			onPointerUpdate: B,
			UIOptions: { canvasActions: { toggleTheme: !1 } }
		})]
	});
}
//#endregion
export { m as default };
