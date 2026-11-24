import { f as e } from "./Button-DwPf_9pb.js";
import { a as t, i as n, o as r, r as i, s as a } from "./camera-DA6Tr5r2.js";
import { useCallback as o, useEffect as s, useMemo as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
import { CaptureUpdateAction as p, Excalidraw as m, Footer as h, reconcileElements as g } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useCollaborativeDiagram as ee } from "@connorhoehn/realtime-modules/adapters/excalidraw";
//#region src/components/diagram/ExcalidrawCanvas.tsx
function _(e, t) {
	let n = e.filter((e) => !e.isDeleted);
	if (t === !0) return n;
	if (t.elementIds?.length) {
		let e = new Set(t.elementIds);
		return n.filter((t) => t.id !== void 0 && e.has(t.id));
	}
	if (t.elementIdPrefix) {
		let e = t.elementIdPrefix;
		return n.filter((t) => t.id?.startsWith(e));
	}
	return n;
}
function v({ ydoc: v, awareness: te, blockId: ne, user: re, editable: y = !0, className: ie, assetPath: b, onSceneChange: x, followUserId: S = null, followFit: C = "mirror", onViewportInput: w, fitOnOpen: T = !1, helpButton: E = "corner", onExcalidrawAPI: ae, presenceActions: D }) {
	let O = l(null), oe = r(O), k = l(null), A = l(null), j = l(w);
	j.current = w;
	let M = l(T);
	M.current = T;
	let N = l(!1), P = l(!1), [F, I] = u(!1);
	s(() => {
		!b || typeof window > "u" || (window.EXCALIDRAW_ASSET_PATH = b);
	}, [b]);
	let se = o((e) => {
		let t = k.current;
		if (!t) return;
		let n = g(t.getSceneElementsIncludingDeleted(), e, t.getAppState());
		t.updateScene({
			elements: n,
			captureUpdate: p.NEVER
		});
	}, []), { ready: L, collaborators: R, participants: z, commitLocal: B, publishPresence: V, readAll: H } = ee({
		ydoc: v,
		awareness: te,
		blockId: ne,
		user: re,
		onRemoteElements: se
	}), U = o((e) => {
		let t = k.current;
		t && (P.current = !0, t.updateScene({
			appState: {
				scrollX: e.scrollX,
				scrollY: e.scrollY,
				zoom: { value: e.zoom }
			},
			captureUpdate: p.NEVER
		}), setTimeout(() => {
			P.current = !1;
		}, 0));
	}, []), W = o(() => {
		let e = k.current?.getAppState(), t = e?.width ?? 0, n = e?.height ?? 0;
		return t > 0 && n > 0 ? {
			width: t,
			height: n
		} : null;
	}, []), G = o(() => {
		let e = M.current;
		if (!e || N.current) return;
		let t = k.current, r = W();
		if (!t) return;
		if (!r) {
			ce.current++ < 20 && setTimeout(() => K.current(), 100);
			return;
		}
		let a = n(_(t.getSceneElementsIncludingDeleted(), e));
		if (!a) return;
		N.current = !0;
		let o = e === !0 ? {} : e;
		U(i(a, r, {
			zoom: o.maxZoom ?? 1,
			minZoom: o.minZoom,
			margin: o.margin,
			overflow: "start"
		}));
	}, [U, W]), ce = l(0), K = l(G);
	K.current = G;
	let q = l(!1);
	s(() => {
		if (q.current || !F || !L) return;
		let e = !1, t = null, n = (r) => {
			if (e || q.current) return;
			let i = k.current, a = i ? H() : [];
			if (i && i.getSceneElementsIncludingDeleted().length > 0) {
				q.current = !0, G();
				return;
			}
			i && a.length > 0 && i.updateScene({
				elements: a,
				captureUpdate: p.NEVER
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
		F,
		L,
		H,
		G
	]);
	let le = o((e, t) => {
		if (!P.current) {
			let e = {
				scrollX: t.scrollX ?? 0,
				scrollY: t.scrollY ?? 0,
				zoom: t.zoom?.value ?? 1
			};
			t.width && t.height && (e.width = t.width, e.height = t.height);
			let n = A.current, r = !!n && (Math.abs(n.scrollX - e.scrollX) > .5 || Math.abs(n.scrollY - e.scrollY) > .5 || n.zoom !== e.zoom), i = !!n && (n.width !== e.width || n.height !== e.height);
			(!n || r || i) && (A.current = e, V({ viewport: e })), r && (N.current = !0, j.current?.());
		}
		y && (B(e), V({ selectedElementIds: t.selectedElementIds }), x?.(e.length));
	}, [
		B,
		V,
		y,
		x
	]), ue = o((e) => {
		V({
			pointer: e.pointer,
			button: e.button
		});
	}, [V]);
	s(() => {
		let e = k.current;
		if (!e) return;
		let t = /* @__PURE__ */ new Map();
		for (let e of R) t.set(e.clientId, {
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
	}, [R, F]);
	let J = c(() => S ? z.find((e) => !e.isSelf && (e.userId === S || e.clientId === S)) ?? null : null, [S, z])?.viewport, Y = J?.scrollX, X = J?.scrollY, Z = J?.zoom, Q = J?.width, $ = J?.height;
	return s(() => {
		if (!k.current || Y === void 0 || X === void 0 || Z === void 0) return;
		let e = {
			scrollX: Y,
			scrollY: X,
			zoom: Z
		}, n = C === "contain" ? W() : null;
		U(n && Q && $ ? i(t(e, {
			width: Q,
			height: $
		}), n, {
			zoom: Z,
			margin: 0
		}) : e);
	}, [
		Y,
		X,
		Z,
		Q,
		$,
		C,
		F,
		U,
		W
	]), /* @__PURE__ */ f("div", {
		ref: O,
		"data-testid": "excalidraw-canvas",
		"data-help-button": E,
		className: e("relative h-full w-full", E !== "corner" && "[&_.help-icon:not([data-ui-help])]:hidden!", ie),
		children: [/* @__PURE__ */ d("div", {
			className: "pointer-events-none absolute right-2 top-20 z-[5] flex justify-end",
			children: /* @__PURE__ */ d(a, {
				participants: z,
				actions: D,
				followingUserId: S
			})
		}), /* @__PURE__ */ d(m, {
			theme: oe,
			viewModeEnabled: !y,
			isCollaborating: !0,
			excalidrawAPI: (e) => {
				k.current = e, I(!0), ae?.(e);
			},
			onChange: le,
			onPointerUpdate: ue,
			UIOptions: { canvasActions: { toggleTheme: !1 } },
			children: E === "start" && /* @__PURE__ */ d(h, { children: /* @__PURE__ */ d("button", {
				type: "button",
				className: "help-icon",
				"data-ui-help": "",
				"aria-label": "Help",
				title: "Help — ?",
				onClick: () => k.current?.updateScene({ appState: { openDialog: { name: "help" } } }),
				children: /* @__PURE__ */ d("span", {
					"aria-hidden": "true",
					className: "text-sm font-semibold",
					children: "?"
				})
			}) })
		})]
	});
}
//#endregion
export { v as default };
