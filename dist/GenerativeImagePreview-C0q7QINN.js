import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { l as r, n as i, o as a } from "./Button-C-I3BxWI.js";
import { n as o, t as s } from "./overlayStack-DxIDMUs-.js";
import { M as c } from "./Icons-CqVFbuiZ.js";
import { t as l } from "./Input-Brvp1kPv.js";
import { i as u, r as d } from "./focusTrap-D9J7npjl.js";
import { t as f } from "./DropdownMenu-DP3rRjEd.js";
import { a as p, c as m, d as h, i as g, l as _, n as v, o as y } from "./railType-AsIPWdQ5.js";
import { t as b } from "./FileUploadDrop-CF2-g14E.js";
import { createContext as x, useCallback as S, useContext as C, useEffect as w, useId as T, useMemo as E, useRef as D, useState as O } from "react";
import { Fragment as k, jsx as A, jsxs as j } from "react/jsx-runtime";
import { createPortal as M } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var N = x(null);
function P({ value: e, children: t }) {
	return /* @__PURE__ */ A(N.Provider, {
		value: e,
		children: t
	});
}
function F() {
	let e = C(N);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function I() {
	return C(N);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var L = "'SF Mono', Menlo, monospace", R = 12, z = 1.5, B = R * z, V = 8, H = 10, U = 36;
function ee({ value: e, onChange: t, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = D(null), [d, f] = O(!1), p = E(() => Math.max(1, e.split("\n").length), [e]), m = E(() => {
		let e = Math.max(p, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [p, a]), h = Math.min(Math.max(p, a), o) * B + 16, g = p > o, _ = (n) => {
		let r = u.current, i = e ?? "";
		if (!r) {
			t(i + n);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		t(i.slice(0, a) + n + i.slice(o)), queueMicrotask(() => {
			if (u.current) {
				let e = a + n.length;
				u.current.focus(), u.current.setSelectionRange(e, e);
			}
		});
	};
	return w(() => {
		let e = u.current;
		if (!e || !g) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [g]), /* @__PURE__ */ j("div", { children: [c && c.length > 0 && /* @__PURE__ */ A("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ A("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => _(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: L },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ j("div", {
		className: n("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: L,
			fontSize: R,
			lineHeight: z,
			height: h
		},
		children: [/* @__PURE__ */ A("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: U,
				padding: `${V}px 6px`,
				fontFamily: L,
				lineHeight: z
			},
			children: m
		}), /* @__PURE__ */ A("textarea", {
			"data-ui-part": "",
			ref: u,
			value: e,
			onChange: (e) => {
				t(e.target.value);
			},
			onKeyDown: (e) => {
				s || e.key === "Tab" && (e.preventDefault(), _("  "));
			},
			onFocus: () => f(!0),
			onBlur: () => f(!1),
			placeholder: i,
			readOnly: s,
			"aria-label": l,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${V}px ${H}px`,
				fontFamily: L,
				fontSize: R,
				lineHeight: z,
				tabSize: 2,
				height: h,
				overflow: g ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var W = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function G({ emoji: e, active: t, onPick: r }) {
	return /* @__PURE__ */ A("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(e),
		className: n("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", t ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": t,
		children: e
	});
}
function K({ value: e, onChange: t, curated: n }) {
	let [r, i] = O(!1), [a, o] = O(!1), [s, c] = O(""), l = D(null), d = D(null), f = n ?? W;
	w(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			l.current && l.current.contains(t) || d.current && d.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), u(r, S(() => i(!1), []));
	let p = (e) => {
		t(e), i(!1);
	}, m = () => {
		let e = s.trim();
		e.length !== 0 && (t(e), c(""), i(!1));
	};
	return /* @__PURE__ */ j("div", {
		className: "relative inline-block",
		ref: l,
		children: [/* @__PURE__ */ A("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ j("div", {
			ref: d,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ A("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: f.map((t, n) => /* @__PURE__ */ A(G, {
					emoji: t,
					active: t === e,
					onPick: p
				}, `${t}-${n}`))
			}), /* @__PURE__ */ j("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ A("input", {
					"data-ui-part": "",
					type: "text",
					value: s,
					onChange: (e) => c(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), m()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ A("button", {
					"data-ui-part": "",
					type: "button",
					onClick: m,
					disabled: s.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-on-primary border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var q = n("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function J({ images: e, openIndex: t, onClose: r, onNavigate: i }) {
	let a = D(null), o = D(null), [c, l] = O(t);
	w(() => {
		l(t);
	}, [t]);
	let u = t !== null && e.length > 0, f = s(u), p = i ? t : c ?? t, m = p === null ? 0 : Math.min(Math.max(p, 0), e.length - 1), h = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (m + t + n) % n;
		i ? i(r) : l(r);
	};
	if (w(() => {
		if (u) return o.current = typeof document < "u" ? document.activeElement : null, a.current?.focus(), () => {
			let e = o.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), o.current = null;
		};
	}, [u]), w(() => {
		if (!u) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? d(e, a.current) : e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), h(-1)) : e.key === "ArrowRight" && (e.preventDefault(), h(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		u,
		m,
		e.length,
		r,
		i,
		f
	]), !u) return null;
	let g = e[m], _ = e.length > 1;
	return M(/* @__PURE__ */ j("div", {
		ref: a,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": g.caption ?? g.alt ?? `Image ${m + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ j("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					m + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ A("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: n("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ j("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ A("img", {
					"data-testid": "image-lightbox-img",
					src: g.src,
					alt: g.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), g.caption && /* @__PURE__ */ A("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: g.caption
				})]
			}),
			_ && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: n(q, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), h(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ A("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: n(q, "right-3"),
				onClick: (e) => {
					e.stopPropagation(), h(1);
				},
				children: "›"
			})] })
		]
	}), document.body);
}
function te(e, t, n) {
	let r = e.find((e) => e.id === t);
	if (!r || t === n) return null;
	if (n.startsWith("__grouped-list-group__:")) {
		let i = n.slice(23), a = e.filter((e) => e.groupId === i && e.id !== t).length, o = e.filter((e) => e.groupId === i).findIndex((e) => e.id === t);
		return i === r.groupId && o === a ? null : {
			toGroupId: i,
			index: a
		};
	}
	let i = e.find((e) => e.id === n);
	if (!i) return null;
	let a = e.filter((e) => e.groupId === i.groupId).findIndex((e) => e.id === n);
	return {
		toGroupId: i.groupId,
		index: a
	};
}
var ne = null;
function re() {
	return ne ??= import("./GroupedListSortable-8yOADSur.js").catch(() => null), ne;
}
var ie = n("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function ae(e) {
	if (!e || typeof window > "u") return /* @__PURE__ */ new Set();
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return /* @__PURE__ */ new Set();
		let n = JSON.parse(t);
		return new Set(Array.isArray(n) ? n.filter((e) => typeof e == "string") : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function oe(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function se(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ce(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function Y({ groups: e, rows: t, onOpenRow: r, rowMenu: i, rowMenuLabel: a, openGroups: s, onToggleGroup: c, storageKey: l, currentId: u = null, hideEmptyGroups: d = !1, onReorder: f, canReorder: m, reorderLabel: _, size: v = "sm", groupHeading: b = "title", currentStyle: x = "tint", groupCountStyle: C = "chip", groupCountAlign: T = "inline", rowStyle: k = "ruled", trailingLayout: M = "inline", className: N, "data-testid": P = "grouped-list" }) {
	let F = M === "columns", I = b === "label", L = T === "end" ? "ml-auto pr-1" : void 0, R = s !== void 0, [z, B] = O(() => {
		let t = ae(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), V = S((e) => R ? s.includes(e) : !z.has(e), [
		R,
		s,
		z
	]), H = S((e, t) => {
		R || B((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), oe(l, r), r;
		}), c?.(e, t);
	}, [
		R,
		c,
		l
	]), U = E(() => {
		let n = /* @__PURE__ */ new Map();
		return e.forEach((e) => n.set(e.id, [])), t.forEach((e) => {
			let t = n.get(e.groupId);
			t && t.push(e);
		}), n;
	}, [e, t]), ee = E(() => d ? e.filter((e) => (U.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		U,
		d
	]), W = E(() => {
		let e = [];
		return ee.forEach((t) => {
			e.push(`g:${t.id}`), V(t.id) && U.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		ee,
		U,
		V
	]), [G, K] = O(null), q = D(null), J = S((e) => !!f && (m ? m(e) : !e.disabled), [f, m]), [ne, ie] = O(""), Y = D(null), [X, ue] = O(null), [de, pe] = O(null), me = D(/* @__PURE__ */ new Map()), he = !!f;
	w(() => {
		if (!he || X) return;
		let e = !0;
		return re().then((t) => {
			e && t && ue(t);
		}), () => {
			e = !1;
		};
	}, [he, X]);
	let Z = S((t, n, r) => {
		if (!f) return;
		let i = e.find((e) => e.id === n), a = (U.get(n) ?? []).filter((e) => e.id !== t.id).length;
		f(t.id, n, r), ie(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		f,
		e,
		U
	]), ge = S((t, n) => {
		let r = U.get(t.groupId) ?? [], i = r.findIndex((e) => e.id === t.id), a = null;
		if (n === "ArrowUp" && i > 0) a = {
			toGroupId: t.groupId,
			index: i - 1
		};
		else if (n === "ArrowDown" && i >= 0 && i < r.length - 1) a = {
			toGroupId: t.groupId,
			index: i + 1
		};
		else if (n === "ArrowLeft" || n === "ArrowRight") {
			let r = e.findIndex((e) => e.id === t.groupId), i = e[n === "ArrowLeft" ? r - 1 : r + 1];
			r >= 0 && i && (a = {
				toGroupId: i.id,
				index: U.get(i.id)?.length ?? 0
			});
		}
		a && (Z(t, a.toGroupId, a.index), Y.current = {
			id: t.id,
			groupId: a.toGroupId,
			index: a.index
		}, V(a.toGroupId) || H(a.toGroupId, !0));
	}, [
		U,
		e,
		Z,
		V,
		H
	]), _e = S((e, n) => {
		let r = t.find((t) => t.id === e), i = r && J(r) ? te(t, e, n) : null;
		r && i && Z(r, i.toGroupId, i.index);
	}, [
		t,
		J,
		Z
	]), ve = E(() => {
		if (G && W.includes(G)) return G;
		let e = t.find((e) => e.current || e.id === u), n = e ? `r:${e.id}` : null;
		return n && W.includes(n) ? n : W[0] ?? null;
	}, [
		G,
		W,
		t,
		u
	]), Q = S((e) => {
		let t = q.current?.querySelector(`[data-focus-key="${se(e)}"]`);
		t && (K(e), t.focus());
	}, []);
	w(() => {
		G && !W.includes(G) && K(null);
	}, [G, W]), w(() => {
		let e = Y.current;
		if (!e || (U.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !W.includes(`r:${e.id}`)) return;
		Y.current = null;
		let t = q.current?.querySelector(`[data-focus-key="${se(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && Q(`r:${e.id}`);
	});
	let ye = S((e) => {
		let n = e.target;
		if (n.closest("[role=\"menu\"]")) return;
		let r = n.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = W.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (Y.current = null, e.altKey && f && e.key.startsWith("Arrow")) {
			if (a) return;
			e.preventDefault();
			let n = t.find((e) => e.id === o);
			n && J(n) && ge(n, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let t = n.closest("[data-row-id]");
				t && ce(t) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < W.length - 1 && Q(W[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && Q(W[i - 1]);
				break;
			case "Home":
				e.preventDefault(), W.length && Q(W[0]);
				break;
			case "End":
				e.preventDefault(), W.length && Q(W[W.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) V(o) && H(o, !1);
				else {
					let e = t.find((e) => e.id === o);
					e && (H(e.groupId, !1), Q(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!V(o)) H(o, !0);
				else {
					let e = U.get(o)?.[0];
					e && Q(`r:${e.id}`);
				}
			}
		}
	}, [
		W,
		Q,
		V,
		H,
		t,
		U,
		f,
		J,
		ge
	]), be = /* @__PURE__ */ j("div", {
		ref: q,
		"data-testid": P,
		"data-ui-row-list": "grouped",
		"data-row-actions-layout": M,
		className: n(F ? n("@container grid", le) : "flex flex-col", N),
		onKeyDown: ye,
		children: [f && /* @__PURE__ */ A("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${P}-reorder-status`,
			children: ne
		}), ee.map((e) => {
			let t = V(e.id), s = U.get(e.id) ?? [], c = `${P}-group-toggle-${e.id}`, l = `${P}-group-rows-${e.id}`, d = `g:${e.id}`;
			return /* @__PURE__ */ j("section", {
				"data-ui-part": "",
				"aria-labelledby": c,
				"data-testid": `${P}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": t,
				className: F ? "col-span-full grid grid-cols-subgrid" : "flex flex-col",
				children: [
					/* @__PURE__ */ A("h3", {
						className: n("m-0 rounded-md", F && "col-span-full", I ? g : "text-sm font-semibold", de === e.id && "bg-primary/8"),
						"data-drop-over": de === e.id || void 0,
						ref: (t) => {
							me.current.set(e.id, t);
						},
						children: /* @__PURE__ */ j("button", {
							"data-ui-part": "",
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": d,
							"aria-expanded": t,
							"aria-controls": l,
							tabIndex: ve === d ? 0 : -1,
							onFocus: () => K(d),
							onClick: () => H(e.id, !t),
							"data-heading": I ? "label" : void 0,
							className: n("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left", y, I ? n(g, p) : "text-sm font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ A("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ A(h, { open: t })
								}),
								e.icon && /* @__PURE__ */ A("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${P}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ A("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && !I && C === "plain" && /* @__PURE__ */ A("span", {
									className: n("shrink-0 text-xs font-medium tabular-nums text-text-secondary", L),
									"aria-label": `${e.count} items`,
									"data-testid": `${P}-group-count-${e.id}`,
									"data-count-style": "plain",
									"data-count-align": T === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && I && /* @__PURE__ */ A("span", {
									className: n("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", L),
									"aria-label": `${e.count} items`,
									"data-testid": `${P}-group-count-${e.id}`,
									"data-count-align": T === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && !I && C !== "plain" && /* @__PURE__ */ A(o, {
									size: "md",
									tone: "neutral",
									className: n("shrink-0", L),
									"aria-label": `${e.count} items`,
									"data-testid": `${P}-group-count-${e.id}`,
									"data-count-align": T === "end" ? "end" : void 0,
									children: e.count
								})
							]
						})
					}),
					/* @__PURE__ */ j("ul", {
						id: l,
						"data-testid": l,
						hidden: !t,
						className: n("m-0 list-none p-0", F ? "col-span-full grid grid-cols-subgrid" : "flex flex-col"),
						children: [t && s.length === 0 && /* @__PURE__ */ A("li", {
							className: n("px-4 py-3 pl-12 text-xs text-text-tertiary", F && "col-span-full"),
							"data-testid": `${P}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), t && s.map((e) => /* @__PURE__ */ A(fe, {
							row: e,
							current: e.current || e.id === u,
							currentStyle: x,
							rowStyle: k,
							columns: F,
							testId: P,
							size: v,
							tabbable: ve === `r:${e.id}`,
							onFocusRow: () => K(`r:${e.id}`),
							onOpenRow: r,
							menuSections: i?.(e),
							menuLabel: a?.(e) ?? `Actions for ${e.title}`,
							reorder: J(e) ? {
								label: _?.(e) ?? `Reorder ${e.title}`,
								sortable: X
							} : void 0
						}, e.id))]
					}),
					X && /* @__PURE__ */ A(X.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => me.current.get(e.id) ?? null,
						onOverChange: (t) => pe((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return X ? /* @__PURE__ */ A(X.GroupedListDndRoot, {
		ids: W.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: _e,
		children: be
	}) : be;
}
function X(e, t, n) {
	return n ? e.leadingSize === "indicator" ? "@max-[35rem]:pl-4" : t ? "@max-[35rem]:pl-9" : "@max-[35rem]:pl-8" : e.leadingSize === "none" ? "" : "@max-[35rem]:pl-[30px]";
}
var le = "grid-cols-[auto_minmax(0,1fr)_max-content_max-content_auto]", ue = "[&_:is(a,button)[data-variant]]:inline-flex [&_:is(a,button)[data-variant]]:items-center [&_:is(a,button)[data-variant]]:h-[var(--ui-control-sm,1.75rem)]";
function de(e, t, n) {
	return X(e, t, n) || "@max-[35rem]:pl-0";
}
function fe({ row: e, current: t, currentStyle: r, rowStyle: i, columns: o, testId: s, size: l, tabbable: u, onFocusRow: d, onOpenRow: p, menuSections: h, menuLabel: g, reorder: y }) {
	let b = !!h && h.some((e) => e.items.length > 0), x = e.hoverSubline !== void 0 && e.hoverSubline !== null, C = e.meta !== void 0 && e.meta !== null, w = e.leading !== void 0 && e.leading !== null, T = e.actions !== void 0 && e.actions !== null && e.actions !== !1, E = `r:${e.id}`, D = l === "md", M = D || i === "plain", [N, P] = O({
		dragging: !1,
		over: !1
	}), F = S((e) => {
		P((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), I = {
		"aria-label": y?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${s}-row-handle-${e.id}`,
		className: n(ie, D && "h-8 w-6 text-text-secondary")
	}, L = /* @__PURE__ */ A(c, { size: D ? 20 : 14 }), R = e.hoverActions ? /* @__PURE__ */ A("span", {
		"data-testid": `${s}-row-actions-${e.id}`,
		className: n("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", t ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
		children: e.hoverActions
	}) : null, z = /* @__PURE__ */ A("span", {
		"data-ui-part": "row-trailing",
		className: n("flex shrink-0 items-center text-xs", o ? "gap-2" : "gap-1.5", o && "col-start-4 justify-end justify-self-end pl-3 text-right tabular-nums"),
		"data-testid": `${s}-row-trailing-${e.id}`,
		children: e.trailing
	}), B = b ? /* @__PURE__ */ A("span", {
		"data-grouped-list-menu": !0,
		"data-testid": `${s}-row-menu-${e.id}`,
		className: "flex shrink-0 items-center",
		onContextMenu: (e) => e.stopPropagation(),
		children: /* @__PURE__ */ A(f, {
			trigger: /* @__PURE__ */ A("span", {
				"aria-hidden": "true",
				className: "text-base leading-none",
				children: "⋯"
			}),
			triggerLabel: g,
			triggerTabIndex: -1,
			triggerTestId: `${s}-row-menu-trigger-${e.id}`,
			align: "end",
			sections: h,
			triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
		})
	}) : null, V = y ? y.sortable ? /* @__PURE__ */ A(y.sortable.SortableHandle, {
		id: e.id,
		onStateChange: F,
		...I,
		children: L
	}) : /* @__PURE__ */ A("button", {
		"data-ui-part": "",
		type: "button",
		tabIndex: -1,
		...I,
		children: L
	}) : null;
	return /* @__PURE__ */ j("li", {
		"data-dragging": N.dragging || void 0,
		"data-drop-over": N.over && !N.dragging || void 0,
		"data-testid": `${s}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": t || void 0,
		"aria-current": t ? "true" : void 0,
		onFocus: d,
		...b ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), ce(e.currentTarget));
		} } : {},
		className: n(o ? "group relative col-span-full grid grid-cols-subgrid items-center gap-y-1 px-2" : "group relative flex items-center px-2", !o && (e.leadingSize === "indicator" ? "gap-2" : "gap-3"), !o && T && "@container flex-wrap gap-y-1", i === "plain" ? "border-t-0" : "border-t border-border", i === "plain" ? _ : D ? "py-[7px]" : "py-2.5", "transition-colors duration-100", t ? n(v, "hover:bg-primary/12") : "hover:bg-surface-hover", M && t && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !M && t && r === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", N.dragging && "opacity-50", N.over && !N.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			w && /* @__PURE__ */ A("span", {
				className: n("flex shrink-0 items-center justify-center", e.leadingSize === "indicator" ? "w-2" : D ? "w-6" : "w-5", o && n("col-start-1 box-content", e.leadingSize === "indicator" ? "pr-2" : "pr-3")),
				"data-ui-rail-leading": e.leadingSize,
				"data-testid": `${s}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ j("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${s}-row-open-${e.id}`,
				"data-ui-row-main": "",
				"data-focus-key": E,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: u ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || p?.(e);
				},
				className: n("flex min-w-0 flex-1 items-center rounded-md border-0 bg-transparent p-0 text-left", o && (w ? "col-start-2" : "col-start-1 col-span-2"), !w && e.leadingSize !== "none" ? "gap-2.5" : "gap-3", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!w && e.leadingSize !== "none" && /* @__PURE__ */ A("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ A("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${s}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ j("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ j("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ A("span", {
									"data-ui-text": M ? "rail-item" : void 0,
									className: n("truncate text-text-primary", M ? m : "text-[14px] font-medium leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ A("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							C && /* @__PURE__ */ A("span", {
								"data-testid": `${s}-row-meta-${e.id}`,
								className: n("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", D ? "text-xs leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || x) && /* @__PURE__ */ j("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ A("span", {
									"data-testid": `${s}-row-subline-${e.id}`,
									className: n("block truncate", x && (t ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), x && /* @__PURE__ */ A("span", {
									"aria-hidden": e.subline !== void 0 || void 0,
									"data-testid": `${s}-row-hover-subline-${e.id}`,
									className: n("truncate", t || e.subline === void 0 ? "block" : "hidden group-hover:block group-focus-within:block"),
									children: e.hoverSubline
								})]
							})
						]
					})
				]
			}),
			T && /* @__PURE__ */ A("span", {
				"data-grouped-list-row-actions": "",
				"data-ui-part": "row-actions",
				"data-testid": `${s}-row-controls-${e.id}`,
				className: n("flex shrink-0 items-center", o ? n("col-start-3 justify-self-end gap-2 pl-3", ue, "@max-[35rem]:col-span-full @max-[35rem]:row-start-2 @max-[35rem]:flex-wrap @max-[35rem]:justify-self-start", de(e, D, w)) : n("gap-1.5 @max-[35rem]:order-last @max-[35rem]:basis-full @max-[35rem]:flex-wrap", X(e, D, w))),
				children: o ? /* @__PURE__ */ A(a, {
					density: "compact",
					children: e.actions
				}) : e.actions
			}),
			o ? /* @__PURE__ */ j(k, { children: [e.trailing && z, (R || B || V) && /* @__PURE__ */ j("span", {
				"data-ui-part": "row-end",
				className: "col-start-5 flex items-center gap-2 justify-self-end pl-2",
				children: [
					R,
					B,
					V
				]
			})] }) : /* @__PURE__ */ j(k, { children: [
				R,
				e.trailing && z,
				B,
				V
			] })
		]
	});
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function pe({ points: e, yMin: t, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ A("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: n("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = t ?? (p === m ? p - 1 : p), g = r ?? (p === m ? m + 1 : m), _ = Math.max(1e-9, g - h), v = f.length === 1 ? 0 : i / (f.length - 1), y = s, b = a - y * 2, x = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * v,
		y: y + b - (e - h) / _ * b
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), C = `${S} L${x[x.length - 1].x.toFixed(2)},${(a - y).toFixed(2)} L${x[0].x.toFixed(2)},${(a - y).toFixed(2)} Z`, w = x[x.length - 1], T = `Trend, ${f.length} points, starts ${me(f[0])}, ends ${me(f[f.length - 1])}`;
	return /* @__PURE__ */ A("div", {
		role: "img",
		"aria-label": u ?? T,
		className: n("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ j("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ A("path", {
					d: C,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ A("path", {
					d: S,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ A("circle", {
					cx: w.x,
					cy: w.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function me(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function he(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function Z({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = O(""), [c, l] = O(!1), u = D(null), d = (e) => {
		let r = he(e, a);
		if (r) {
			if (t.includes(r)) {
				s("");
				return;
			}
			n([...t, r]), s("");
		}
	}, f = (e) => {
		n(t.filter((t) => t !== e));
	}, p = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), d(o);
			return;
		}
		e.key === "Backspace" && o === "" && t.length > 0 && (e.preventDefault(), f(t[t.length - 1]));
	}, m = E(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), h = c && m.length > 0;
	return /* @__PURE__ */ j("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ j("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ A("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ j("div", {
			className: "relative",
			children: [/* @__PURE__ */ A("input", {
				"data-ui-part": "",
				ref: u,
				"data-testid": "tag-editor-input",
				type: "text",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: p,
				onFocus: () => l(!0),
				onBlur: () => {
					setTimeout(() => l(!1), 120);
				},
				"aria-label": e ?? (r || "Add tag"),
				placeholder: r,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), h ? /* @__PURE__ */ A("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ j("button", {
					"data-ui-part": "",
					type: "button",
					onMouseDown: (e) => {
						e.preventDefault();
					},
					onClick: () => d(e),
					className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary cursor-pointer border border-dashed border-border-emphasis",
					children: ["+ ", e]
				}, e))
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/shared/UserPicker.tsx
var ge = "";
function _e(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function ve({ value: t, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = I(), d = e(), f = o ?? u?.presenceUsers ?? [], p = s === void 0 ? d?.idToken ?? null : s, [m, h] = O(""), [g, _] = O(!1), [v, y] = O(0), [b, x] = O([]), S = D(null), C = D(null), T = E(() => {
		let e = new Set(t), n = [];
		for (let t of f) {
			let r = t.metadata.userId ?? t.clientId;
			e.has(r) || (e.add(r), n.push({
				userId: r,
				displayName: _e(t.metadata, r)
			}));
		}
		return n;
	}, [f, t]);
	w(() => {
		let e = m.trim();
		if (!e) {
			x([]);
			return;
		}
		if (!c && !p) {
			x([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => x(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? ge}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${p}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				x(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		m,
		p,
		c,
		l
	]);
	let k = E(() => {
		let e = new Set(t), n = [];
		for (let t of T) e.has(t.userId) || (e.add(t.userId), n.push(t));
		for (let t of b) e.has(t.userId) || (e.add(t.userId), n.push({
			userId: t.userId,
			displayName: t.displayName || t.userId.slice(0, 8)
		}));
		return n;
	}, [
		T,
		b,
		t
	]), M = E(() => {
		let e = m.trim().toLowerCase();
		return e ? k.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : k;
	}, [k, m]), N = typeof a == "number" && t.length >= a, P = (e) => {
		let n = e.trim();
		n && (t.includes(n) || N || (r([...t, n]), h(""), y(0)));
	}, F = (e) => {
		r(t.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), y((e) => Math.min(e + 1, Math.max(M.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), y((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = M[v];
			t ? P(t.userId) : m.trim() && P(m.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !m && t.length > 0 && F(t[t.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return _e(t.metadata, e);
		let n = b.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ j("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [t.length > 0 && /* @__PURE__ */ A("div", {
			className: "flex flex-wrap gap-1.5",
			children: t.map((e) => /* @__PURE__ */ j("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ A("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => F(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ j("div", {
			className: "relative",
			children: [/* @__PURE__ */ A("input", {
				"data-ui-part": "",
				ref: S,
				type: "text",
				value: m,
				disabled: N,
				"aria-label": N ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: N ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					h(e.target.value), _(!0), y(0);
				},
				onFocus: () => _(!0),
				onBlur: () => {
					C.current = setTimeout(() => _(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), g && !N && M.length > 0 && /* @__PURE__ */ A("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), C.current && clearTimeout(C.current);
				},
				children: M.map((e, t) => /* @__PURE__ */ j("div", {
					className: n("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", t === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => y(t),
					onClick: () => {
						P(e.userId), S.current?.focus();
					},
					children: [/* @__PURE__ */ A("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ A("span", {
						className: "text-text-tertiary ml-2 text-[11px] font-mono",
						children: e.userId.slice(0, 12)
					})]
				}, e.userId))
			})]
		})]
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function Q({ name: e, value: t, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = T();
	return /* @__PURE__ */ A("div", {
		role: "radiogroup",
		"data-testid": s,
		className: n("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === t;
			return /* @__PURE__ */ j("label", {
				htmlFor: s,
				className: n("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ j("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ A("input", {
							"data-ui-part": "",
							id: s,
							type: "radio",
							"data-ui-control": "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							className: n("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ j("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ A("span", {
						className: n("text-sm leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ A("span", {
						className: n("text-xs leading-4 mt-0.5", a ? "text-text-disabled" : "text-neutral"),
						children: i.description
					})]
				})]
			}, i.value);
		})
	});
}
//#endregion
//#region src/components/shared/Divider.tsx
var ye = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function be({ label: e, spacing: t = "md", className: r, "data-testid": i }) {
	let a = ye[t];
	return e == null ? /* @__PURE__ */ A("hr", {
		className: n("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ j("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: n("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ A("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ A("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ A("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function xe({ title: e, as: t = "h3", hint: i, actions: a, first: o = !1, variant: s = "label", size: c, description: l, children: u, className: d, "data-testid": f }) {
	let p = r("DetailSection", c, {
		comfortable: "md",
		compact: "sm"
	});
	if (s === "heading") {
		let r = p === "lg", s = p === "sm", c = l != null && l !== !1;
		return /* @__PURE__ */ j("section", {
			"data-ui-part": "",
			className: n("group/section", d),
			"data-variant": "heading",
			"data-size": p,
			...f ? { "data-testid": f } : {},
			children: [
				!o && /* @__PURE__ */ A(be, { spacing: "md" }),
				/* @__PURE__ */ j("div", {
					className: n("flex items-center gap-2", r ? "h-7" : "h-6", r ? c ? "mb-0" : "mb-2" : "mb-0.5"),
					children: [
						/* @__PURE__ */ A(t, {
							className: n("m-0 font-semibold text-text-primary", r ? "text-[19px] leading-7" : s ? "text-sm leading-5" : "text-base leading-6"),
							children: e
						}),
						i != null && /* @__PURE__ */ A("span", {
							className: n("min-w-0 truncate text-text-tertiary", s ? "text-xs" : "text-[13px]"),
							children: i
						}),
						a != null && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("span", { className: "flex-1" }), /* @__PURE__ */ A("span", {
							className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
							children: a
						})] })
					]
				}),
				c && /* @__PURE__ */ A("p", {
					className: n("m-0 text-text-secondary", r ? "-mt-1 mb-2 text-[15px] leading-6" : s ? "mb-2 text-xs leading-4" : "mb-2 text-[13px] leading-5"),
					"data-testid": f ? `${f}-description` : void 0,
					children: l
				}),
				u
			]
		});
	}
	return /* @__PURE__ */ j("section", {
		"data-ui-part": "",
		className: n(d),
		...f ? { "data-testid": f } : {},
		children: [
			!o && /* @__PURE__ */ A(be, { spacing: "md" }),
			/* @__PURE__ */ j("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ A(t, {
						className: "m-0 text-xs font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					i != null && /* @__PURE__ */ A("span", {
						className: "min-w-0 truncate text-xs text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("span", { className: "flex-1" }), a] })
				]
			}),
			u
		]
	});
}
//#endregion
//#region src/components/pipelines/list/catalog.ts
var Se = {
	documents: "Documents & presentations",
	agents: "Agents & experiments",
	conversations: "Conversations & media",
	other: "Other"
}, Ce = [
	"documents",
	"agents",
	"conversations",
	"other"
], we = {
	document: "page",
	presentation: "presentation",
	diagram: "diagram",
	agent: "agent",
	experiment: "experiment",
	recording: "recording",
	call: "call",
	conversation: "conversation",
	media: "media",
	workflow: "workflow"
}, Te = {
	document: "documents",
	presentation: "documents",
	diagram: "documents",
	agent: "agents",
	experiment: "agents",
	recording: "conversations",
	call: "conversations",
	conversation: "conversations",
	media: "conversations",
	workflow: "other"
}, Ee = {
	document: "Document",
	presentation: "Presentation",
	diagram: "Diagram",
	agent: "Agent",
	experiment: "Experiment",
	recording: "Recording",
	call: "Call",
	conversation: "Conversation",
	media: "Media",
	workflow: "Workflow"
}, De = [
	"document",
	"presentation",
	"diagram",
	"agent",
	"experiment",
	"recording",
	"call",
	"conversation",
	"media",
	"workflow"
], Oe = {
	draft: "Draft",
	published: "Published",
	archived: "Archived"
}, ke = [
	"published",
	"draft",
	"archived"
], Ae = {
	worktype: "Work type",
	status: "Status",
	kind: "Kind",
	none: "None"
}, je = [
	"worktype",
	"status",
	"kind",
	"none"
], Me = "all";
function Ne(e) {
	return e.kind && e.kind in we ? e.kind : "workflow";
}
function Pe(e) {
	return e.workType && e.workType in Se ? e.workType : Te[Ne(e)];
}
function Fe(e) {
	if (!(!e || e.length === 0)) return e.join(" → ");
}
function Ie(e, t = Date.now()) {
	if (!e) return;
	let n = new Date(e).getTime();
	if (Number.isNaN(n)) return;
	let r = Math.max(0, t - n);
	return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 6048e5 ? `${Math.floor(r / 864e5)}d ago` : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric"
	}).format(new Date(n));
}
var Le = /* @__PURE__ */ new Set([
	"failed",
	"interrupted",
	"stuck"
]), Re = /* @__PURE__ */ new Set(["running", "awaiting_approval"]);
function ze(e, t = Date.now()) {
	let n = e.rollup;
	if (n && n.lastRunId) {
		let e = Ie(n.lastRunAt, t);
		if (Re.has(n.lastRunStatus)) return {
			tone: "info",
			label: n.lastRunStatus === "running" ? "Running" : "Awaiting approval",
			meta: e
		};
		if (Le.has(n.lastRunStatus)) return {
			tone: "danger",
			label: n.lastRunStatus === "failed" ? "Failed" : n.lastRunStatus === "stuck" ? "Stuck" : "Interrupted",
			meta: e
		};
		if (n.failedOfRecent > 0 && n.recent.length > 0) return {
			tone: "warning",
			label: `${n.failedOfRecent} of ${n.recent.length} failed`,
			meta: e
		};
	}
	return {
		tone: e.status === "published" ? "success" : "neutral",
		label: Oe[e.status] ?? e.status
	};
}
function Be(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = (e, t) => {
		n.set(t, e), r.set(e, (r.get(e) ?? 0) + 1);
	};
	return e.forEach((e) => {
		switch (t) {
			case "worktype":
				i(Pe(e), e.id);
				break;
			case "status":
				i(e.status, e.id);
				break;
			case "kind":
				i(Ne(e), e.id);
				break;
			default: i("all", e.id);
		}
	}), {
		groups: (t === "worktype" ? Ce.map((e) => ({
			id: e,
			title: Se[e]
		})) : t === "status" ? ke.map((e) => ({
			id: e,
			title: Oe[e]
		})) : t === "kind" ? De.map((e) => ({
			id: e,
			title: Ee[e]
		})) : [{
			id: "all",
			title: "All pipelines"
		}]).filter((e) => (r.get(e.id) ?? 0) > 0).map((e) => ({
			...e,
			count: r.get(e.id) ?? 0
		})),
		groupOf: n
	};
}
function Ve(e, t) {
	let n = t.trim().toLowerCase();
	return !n || [
		e.name,
		e.description ?? "",
		Fe(e.route) ?? "",
		...e.tags ?? []
	].join(" ").toLowerCase().includes(n);
}
//#endregion
//#region src/components/image/ImageThumbnail.tsx
var He = {
	sm: "w-16",
	md: "w-32",
	lg: "w-48"
}, Ue = {
	square: "aspect-square",
	video: "aspect-video",
	auto: ""
};
function We() {
	return /* @__PURE__ */ j("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "w-6 h-6 text-text-tertiary",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ A("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ A("circle", {
				cx: "8.5",
				cy: "8.5",
				r: "1.5"
			}),
			/* @__PURE__ */ A("path", { d: "M21 15l-5-5L5 21" })
		]
	});
}
function Ge({ src: e, alt: t, size: r = "md", aspectRatio: i = "square", rounded: a = !1, fallback: o, loading: s = "lazy", className: c, "data-testid": l }) {
	let [u, d] = O({
		src: e,
		status: "loading"
	}), f = e ? u.src === e ? u.status : "loading" : "error", p = a ? i === "square" ? "rounded-full" : "rounded-lg" : "rounded-md";
	return /* @__PURE__ */ j("div", {
		"data-testid": l,
		className: n("relative overflow-hidden bg-surface-hover", He[r], i !== "auto" && Ue[i], p, c),
		children: [
			f === "loading" && /* @__PURE__ */ A("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 animate-pulse bg-surface-emphasis"
			}),
			f === "error" && /* @__PURE__ */ A("div", {
				className: "absolute inset-0 flex items-center justify-center bg-surface-hover",
				children: o ?? /* @__PURE__ */ A(We, {})
			}),
			e && /* @__PURE__ */ A("img", {
				src: e,
				alt: t,
				loading: s,
				onLoad: () => d({
					src: e,
					status: "loaded"
				}),
				onError: () => d({
					src: e,
					status: "error"
				}),
				className: n("w-full h-full object-cover transition-opacity duration-200", f === "loaded" ? "opacity-100" : "opacity-0")
			}, e)
		]
	});
}
//#endregion
//#region src/components/pipelines/services/PipelineEditorServicesContext.tsx
var $ = x(null);
function Ke({ services: e, children: t }) {
	return /* @__PURE__ */ A($.Provider, {
		value: e,
		children: t
	});
}
function qe() {
	let e = C($);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function Je() {
	return C($)?.getImageUrl ?? null;
}
function Ye() {
	let e = C($);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function Xe(e) {
	let t = C($)?.nodeVocabulary?.[e];
	return E(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function Ze(e, t) {
	let n = C($)?.modelOptions?.[e];
	return E(() => n ?? t, [n, t]);
}
function Qe() {
	let e = C($)?.modelOptions;
	return E(() => (t, n) => e?.[t] ?? n, [e]);
}
function $e() {
	let e = C($)?.webhookRelay;
	return E(() => ({
		enabled: e?.enabled ?? !1,
		publicUrlBase: e?.publicUrlBase
	}), [e?.enabled, e?.publicUrlBase]);
}
function et() {
	let e = C($)?.executableNodeTypes;
	return E(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
//#region src/components/image/ImageUploader.tsx
function tt({ value: e, onChange: t, uploadImage: r, getImageUrl: a, maxSize: o = 8388608, accept: s = "image/*", fileOnly: c = !1, urlOnly: u = !1, className: d, "data-testid": f }) {
	let [p, m] = O(!1), [h, g] = O(null), [_, v] = O("");
	async function y(e) {
		m(!0), g(null);
		try {
			t(await r(e)), v("");
		} catch (e) {
			let t = e instanceof Error ? e.message : "Upload failed. Please try again.";
			g(t);
		} finally {
			m(!1);
		}
	}
	function x(e) {
		e.length > 0 && y(e[0]);
	}
	async function S() {
		let e = _.trim();
		e && await y({ url: e });
	}
	if (e) {
		let r = a(e.imageId);
		return /* @__PURE__ */ A("div", {
			className: n("flex flex-col gap-3", d),
			"data-testid": f,
			children: /* @__PURE__ */ j("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ A(Ge, {
					src: r,
					alt: "Uploaded image",
					size: "md",
					aspectRatio: "square",
					"data-testid": f ? `${f}-thumbnail` : void 0
				}), /* @__PURE__ */ A(i, {
					variant: "ghost",
					size: "sm",
					onClick: () => t(null),
					"data-testid": f ? `${f}-replace` : void 0,
					children: "Replace"
				})]
			})
		});
	}
	return /* @__PURE__ */ j("div", {
		className: n("flex flex-col gap-3", d),
		"data-testid": f,
		children: [
			p && /* @__PURE__ */ A("p", {
				className: "text-sm text-neutral",
				"data-testid": f ? `${f}-uploading` : void 0,
				children: "Uploading..."
			}),
			!u && /* @__PURE__ */ A(b, {
				accept: s,
				maxSize: o,
				onFiles: x,
				disabled: p,
				"data-testid": f ? `${f}-drop` : void 0
			}),
			!c && /* @__PURE__ */ j("div", {
				className: "flex items-center gap-2",
				"data-testid": f ? `${f}-url-row` : void 0,
				children: [/* @__PURE__ */ A(l, {
					type: "url",
					placeholder: "https://example.com/image.jpg",
					value: _,
					onChange: (e) => v(e.target.value),
					disabled: p,
					"data-testid": f ? `${f}-url-input` : void 0,
					onKeyDown: (e) => {
						e.key === "Enter" && S();
					}
				}), /* @__PURE__ */ A(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void S(),
					disabled: p || !_.trim(),
					"data-testid": f ? `${f}-fetch-btn` : void 0,
					children: "Fetch"
				})]
			}),
			h && /* @__PURE__ */ A("p", {
				role: "alert",
				className: "text-sm text-danger-fg",
				"data-testid": f ? `${f}-error` : void 0,
				children: h
			})
		]
	});
}
function nt(e) {
	let t = Ye(), n = t.uploadImage;
	return n ? /* @__PURE__ */ A(tt, {
		...e,
		uploadImage: n,
		getImageUrl: t.getImageUrl
	}) : /* @__PURE__ */ A("div", {
		className: "text-sm text-neutral",
		children: "This host has not wired uploadImage. Cannot accept new uploads."
	});
}
//#endregion
//#region src/components/image/GenerativeImagePreview.tsx
function rt(e) {
	return e < 60 ? `${e}s` : `${Math.floor(e / 60)}m ${e % 60}s`;
}
function it({ startedAt: e }) {
	let [t, n] = O(() => Math.max(0, Math.floor((Date.now() - e) / 1e3)));
	return w(() => {
		let t = () => n(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
		t();
		let r = setInterval(t, 1e3);
		return () => clearInterval(r);
	}, [e]), /* @__PURE__ */ A("span", {
		"data-testid": "generative-image-preview-elapsed",
		className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
		children: rt(t)
	});
}
function at({ status: e, src: r, alt: i = "", startedAt: a, className: o }) {
	let s = t(), c = D(e), [l, u] = O(!1);
	return c.current !== e && (c.current = e, e === "done" && !s && u(!0)), w(() => {
		if (!l) return;
		let e = setTimeout(() => u(!1), 30);
		return () => clearTimeout(e);
	}, [l]), /* @__PURE__ */ A("div", {
		"data-testid": "generative-image-preview",
		"data-status": e,
		className: n("relative overflow-hidden rounded-md bg-surface-hover", o),
		children: e === "synthesizing" ? /* @__PURE__ */ j(k, { children: [
			/* @__PURE__ */ A("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-shimmer",
				className: n("absolute inset-0", s ? "bg-surface-emphasis" : n("bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover", "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"))
			}),
			!s && /* @__PURE__ */ A("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-sweep",
				className: n("absolute inset-0", "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]", "bg-[length:400px_100%] bg-no-repeat", "animate-[skeleton-shimmer_2.4s_linear_infinite]")
			}),
			/* @__PURE__ */ A("span", {
				className: n("absolute inset-0 flex items-center justify-center", "text-[11px] font-medium tracking-wide text-neutral select-none"),
				children: "✦ synthesizing"
			}),
			a !== void 0 && /* @__PURE__ */ A(it, { startedAt: a })
		] }) : r ? /* @__PURE__ */ A("img", {
			src: r,
			alt: i,
			"data-testid": "generative-image-preview-img",
			className: n("h-full w-full object-cover", !s && "transition-[filter] duration-[400ms] ease-out", l ? "blur-[16px]" : "blur-0")
		}) : /* @__PURE__ */ A("div", {
			"aria-hidden": "true",
			className: "absolute inset-0 bg-surface-emphasis"
		})
	});
}
//#endregion
export { ze as A, K as B, Ce as C, Ve as D, Be as E, Z as F, P as H, pe as I, Y as L, be as M, Q as N, Ie as O, ve as P, J as R, Se as S, Pe as T, I as U, ee as V, F as W, we as _, Je as a, Oe as b, Qe as c, $e as d, Ge as f, Ee as g, je as h, qe as i, xe as j, Fe as k, Xe as l, Ae as m, nt as n, et as o, Me as p, Ke as r, Ze as s, at as t, Ye as u, De as v, Ne as w, ke as x, Te as y, W as z };
