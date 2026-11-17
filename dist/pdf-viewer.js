import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { n } from "./Text-BxqRqgIU.js";
import { t as r } from "./IconButton-Bf5Wy0tS.js";
import { at as i, m as a, q as o } from "./Icons-CNCMF52q.js";
import { i as s, n as c, t as l } from "./Toolbar-xG0VXaMD.js";
import { t as ee } from "./ErrorState-D3rBNHhz.js";
import { t as te } from "./LoadingState-ED7Di_id.js";
import { useCallback as ne, useEffect as u, useMemo as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/pdf-viewer/PdfViewer.tsx
var g = [
	.5,
	.75,
	1,
	1.25,
	1.5,
	2,
	3
], _ = null, v = null;
function y(e) {
	_ = e;
}
function b() {
	return v ??= import("pdfjs-dist").catch((e) => {
		throw v = null, e;
	}), v;
}
var x = 32;
function S(e, t) {
	return Math.min(Math.max(1, Math.round(e) || 1), Math.max(1, t));
}
function re(e, t) {
	return t > 0 ? g.find((t) => t > e + .001) ?? g[g.length - 1] : [...g].reverse().find((t) => t < e - .001) ?? g[0];
}
function C({ src: v, data: y, withCredentials: C, workerSrc: w, title: T = "Document", initialPage: E = 1, onPageChange: D, initialZoom: ie = "fit-width", onLoad: O, onError: k, actions: A, variant: j = "framed", className: M }) {
	let [N, P] = p({ status: "loading" }), [F, I] = p(0), [L, R] = p(() => Math.max(1, Math.round(E) || 1)), [z, B] = p(ie), [V, H] = p(null), [U, W] = p(0), G = f(null), K = f(null), q = f({
		onLoad: O,
		onError: k,
		onPageChange: D,
		initialPage: E
	});
	q.current = {
		onLoad: O,
		onError: k,
		onPageChange: D,
		initialPage: E
	};
	let J = v === void 0 ? "" : String(v);
	u(() => {
		if (!J && !y) return;
		let e = !1, t = null;
		return P({ status: "loading" }), H(null), (async () => {
			try {
				let n = await b();
				if (e) return;
				let r = w ?? _;
				if (r && (n.GlobalWorkerOptions.workerSrc = r), !n.GlobalWorkerOptions.workerSrc) throw Error("PdfViewer: pdf.js has no worker. Serve pdfjs-dist/build/pdf.worker.min.mjs and pass its URL as `workerSrc` or to setPdfWorkerSrc().");
				let i = y ? y instanceof Uint8Array ? y.slice() : new Uint8Array(y.slice(0)) : void 0;
				t = n.getDocument(i ? { data: i } : {
					url: J,
					withCredentials: !!C
				});
				let a = await t.promise;
				if (e) return;
				R(S(q.current.initialPage, a.numPages)), P({
					status: "ready",
					doc: a
				}), q.current.onLoad?.({ pageCount: a.numPages });
			} catch (t) {
				if (e) return;
				let n = t instanceof Error ? t : Error(String(t));
				n.name !== "PasswordException" && console.error(n), P({
					status: "error",
					reason: n.name === "PasswordException" ? "password" : "unreadable"
				}), q.current.onError?.(n);
			}
		})(), () => {
			e = !0, t?.destroy().catch(() => void 0);
		};
	}, [
		J,
		y,
		C,
		w,
		F
	]), u(() => {
		let e = G.current;
		if (!e || (W(e.clientWidth), typeof ResizeObserver > "u")) return;
		let t = new ResizeObserver(() => W(e.clientWidth));
		return t.observe(e), () => t.disconnect();
	}, []);
	let Y = N.status === "ready" ? N.doc : null, X = Y?.numPages ?? 0;
	u(() => {
		if (!Y) return;
		let e = !1, t = null;
		return (async () => {
			try {
				let n = await Y.getPage(L);
				if (e) return;
				let r = n.getViewport({ scale: 1 }), i = z === "fit-width" ? U > x ? (U - x) / r.width : 1 : z, a = typeof window < "u" && window.devicePixelRatio > 0 ? window.devicePixelRatio : 1, o = n.getViewport({ scale: i * a }), s = K.current;
				if (!s) return;
				s.width = Math.floor(o.width), s.height = Math.floor(o.height), s.style.width = `${Math.floor(o.width / a)}px`, s.style.height = `${Math.floor(o.height / a)}px`, t = n.render({
					canvas: s,
					viewport: o
				}), H(i), await t.promise;
			} catch (t) {
				if (e || t instanceof Error && t.name === "RenderingCancelledException") return;
				console.error(t);
			}
		})(), () => {
			e = !0, t?.cancel();
		};
	}, [
		Y,
		L,
		z,
		U
	]);
	let Z = ne((e) => {
		if (!X) return;
		let t = S(e, X);
		t !== L && (R(t), q.current.onPageChange?.(t), G.current?.scrollTo?.({ top: 0 }));
	}, [L, X]), Q = z === "fit-width" ? V ?? 1 : z, $ = (e) => B(re(Q, e)), ae = Q < g[g.length - 1] - .001, oe = Q > g[0] + .001, se = (e) => {
		if (Y) {
			if (e.key === "PageDown") Z(L + 1);
			else if (e.key === "PageUp") Z(L - 1);
			else if (e.key === "+" || e.key === "=") $(1);
			else if (e.key === "-") $(-1);
			else return;
			e.preventDefault();
		}
	}, ce = d(() => X ? `Page ${L} of ${X}` : "Page", [L, X]);
	return /* @__PURE__ */ h("div", {
		"data-testid": "pdf-viewer",
		"data-state": N.status,
		"data-page": Y ? L : void 0,
		"data-page-count": X || void 0,
		className: e("flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface", j === "framed" && "rounded-md border border-solid border-border", M),
		children: [/* @__PURE__ */ h(l, {
			"aria-label": `${T} controls`,
			end: A,
			children: [
				/* @__PURE__ */ h(c, {
					"aria-label": "Pages",
					children: [
						/* @__PURE__ */ m(r, {
							"aria-label": "Previous page",
							size: "sm",
							icon: /* @__PURE__ */ m(a, { dir: "left" }),
							disabled: !Y || L <= 1,
							onClick: () => Z(L - 1)
						}),
						/* @__PURE__ */ m(n, {
							size: "xs",
							tone: "secondary",
							tabular: !0,
							role: "status",
							"data-testid": "pdf-viewer-page",
							children: ce
						}),
						/* @__PURE__ */ m(r, {
							"aria-label": "Next page",
							size: "sm",
							icon: /* @__PURE__ */ m(a, { dir: "right" }),
							disabled: !Y || L >= X,
							onClick: () => Z(L + 1)
						})
					]
				}),
				/* @__PURE__ */ m(s, {}),
				/* @__PURE__ */ h(c, {
					"aria-label": "Zoom",
					children: [
						/* @__PURE__ */ m(r, {
							"aria-label": "Zoom out",
							size: "sm",
							icon: /* @__PURE__ */ m(o, {}),
							disabled: !Y || !oe,
							onClick: () => $(-1)
						}),
						/* @__PURE__ */ m(n, {
							size: "xs",
							tone: "secondary",
							tabular: !0,
							"data-testid": "pdf-viewer-zoom",
							children: `${Math.round(Q * 100)}%`
						}),
						/* @__PURE__ */ m(r, {
							"aria-label": "Zoom in",
							size: "sm",
							icon: /* @__PURE__ */ m(i, {}),
							disabled: !Y || !ae,
							onClick: () => $(1)
						}),
						/* @__PURE__ */ m(t, {
							size: "sm",
							variant: "ghost",
							"aria-pressed": z === "fit-width",
							disabled: !Y,
							onClick: () => B("fit-width"),
							children: "Fit width"
						})
					]
				})
			]
		}), /* @__PURE__ */ h("div", {
			ref: G,
			role: "region",
			"aria-label": T,
			tabIndex: 0,
			onKeyDown: se,
			className: "relative min-h-0 flex-1 overflow-auto bg-surface-panel p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
			children: [
				N.status === "loading" && /* @__PURE__ */ m(te, { label: "Opening the document…" }),
				N.status === "error" && /* @__PURE__ */ m(ee, {
					compact: !0,
					title: N.reason === "password" ? "This document is protected by a password." : "This document could not be shown.",
					description: N.reason === "password" ? "It cannot be opened here." : "Try again in a moment.",
					actionLabel: N.reason === "password" ? void 0 : "Try again",
					onAction: N.reason === "password" ? void 0 : () => I((e) => e + 1)
				}),
				/* @__PURE__ */ m("canvas", {
					ref: K,
					role: "img",
					"aria-label": Y ? `${T}, page ${L} of ${X}` : T,
					"data-testid": "pdf-viewer-canvas",
					className: e("mx-auto block bg-paper shadow-md", !Y && "hidden")
				})
			]
		})]
	});
}
//#endregion
export { g as PDF_ZOOM_STEPS, C as PdfViewer, y as setPdfWorkerSrc };
