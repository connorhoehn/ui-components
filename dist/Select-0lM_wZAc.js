import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-uREUOWUk.js";
import { c as r, l as i, m as a, n as ee, p as o, t as s } from "./overlayStack-C0EBgmzL.js";
import { forwardRef as c, useCallback as l, useEffect as u, useId as te, useImperativeHandle as ne, useLayoutEffect as re, useMemo as ie, useRef as d, useState as f } from "react";
import { Fragment as ae, jsx as p, jsxs as m } from "react/jsx-runtime";
import { createPortal as oe } from "react-dom";
//#region src/components/shared/Combobox.tsx
var h = {
	sm: "min-h-7 text-xs",
	md: "min-h-9 text-sm"
}, g = {
	sm: "text-xs",
	md: "text-sm"
}, se = (e, t) => [
	e.label,
	e.description,
	e.meta
].some((e) => (e ?? "").toLowerCase().includes(t));
function ce(t) {
	let { options: n, placeholder: r, size: i = "sm", disabled: a, allowCustom: o, maxOptions: s = 8, emptyMessage: c = "No matches", filter: l, onQueryChange: ne, className: re, "data-testid": ae, id: oe, invalid: ce, "aria-describedby": _, "aria-invalid": le, "aria-required": ue } = t, de = t.showToggle ?? !t.multiple, fe = ce || le === !0, v = d(null), y = te(), b = `${y}-list`, pe = d(null), [x, S] = f(""), [C, w] = f(!1), [T, E] = f(-1), D = t.multiple ? t.value : t.value ? [t.value] : [], O = (e) => n.find((t) => t.value === e)?.label ?? e, k = ie(() => {
		let e = x.trim().toLowerCase(), t = l ?? se;
		return n.filter((n) => !e || t(n, e)).slice(0, s);
	}, [
		n,
		x,
		l,
		s
	]), A = C && (k.length > 0 || x.trim().length > 0), me = () => {
		if (a) return;
		let e = D[0] ? k.findIndex((e) => e.value === D[0]) : -1;
		w(!0), E(e >= 0 ? e : k.length ? 0 : -1);
	}, j = (e) => {
		S(e), ne?.(e);
	}, M = () => {
		w(!1), E(-1);
	}, N = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), j(""), E(-1);
		} else t.onChange(e), j(""), M();
	};
	u(() => {
		if (!C) return;
		let e = (e) => {
			pe.current?.contains(e.target) || M();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [C]);
	let P = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), C ? k.length && E((e) => Math.min(e + 1, k.length - 1)) : (w(!0), E(k.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!C) return;
				e.preventDefault(), E((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = C && T >= 0 ? k[T] : void 0;
				t && !t.disabled ? (e.preventDefault(), N(t.value)) : o && x.trim() && (e.preventDefault(), N(x.trim()));
				break;
			}
			case "Escape":
				C && (e.stopPropagation(), M());
				break;
			case "Backspace": t.multiple && !x && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, he = t.multiple || x || C ? x : D[0] ? O(D[0]) : "";
	return /* @__PURE__ */ m("div", {
		ref: pe,
		className: e("relative min-w-0", re),
		"data-testid": ae,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ m("div", {
			className: e("flex flex-wrap items-center gap-1 rounded-md border bg-surface px-2 py-0.5", fe ? "border-danger focus-within:border-danger" : "border-border-field focus-within:border-primary", h[i], a && "opacity-60"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ p(ee, {
					size: "xs",
					tone: "accent",
					onRemove: a ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: O(e)
				}, e)),
				/* @__PURE__ */ p("input", {
					ref: v,
					id: oe,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": _,
					"aria-invalid": fe || void 0,
					"aria-required": ue,
					"aria-expanded": A,
					"aria-controls": b,
					"aria-autocomplete": "list",
					"aria-activedescendant": A && T >= 0 ? `${y}-opt-${T}` : void 0,
					disabled: a,
					value: he,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && C && D[0] ? O(D[0]) : r,
					onChange: (e) => {
						j(e.target.value), w(!0), E(-1);
					},
					onKeyDown: P,
					onClick: () => {
						C || me();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				de && /* @__PURE__ */ p("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": C ? "Close options" : "Show options",
					disabled: a,
					onMouseDown: (e) => {
						e.preventDefault(), C ? M() : (v.current?.focus(), me());
					},
					className: "flex shrink-0 items-center justify-center rounded p-0.5 text-text-secondary hover:bg-surface-hover disabled:cursor-not-allowed",
					children: /* @__PURE__ */ p("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "14",
						height: "14",
						viewBox: "0 0 16 16",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ p("path", { d: C ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), A && /* @__PURE__ */ p("ul", {
			id: b,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: k.length === 0 ? /* @__PURE__ */ p("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: o ? `Press Enter to use "${x.trim()}"` : c
			}) : k.map((t, n) => {
				let r = D.includes(t.value);
				return /* @__PURE__ */ m("li", {
					id: `${y}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || N(t.value);
					},
					onMouseEnter: () => E(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", g[i], n === T ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
					children: [/* @__PURE__ */ m("span", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ m("span", {
							className: "min-w-0 flex-1 truncate",
							children: [r ? "✓ " : "", t.label]
						}), t.meta && /* @__PURE__ */ p("span", {
							className: "shrink-0 text-xs font-normal text-text-secondary",
							children: t.meta
						})]
					}), t.description && /* @__PURE__ */ p("span", {
						className: "text-xs font-normal leading-4 text-text-tertiary",
						children: t.description
					})]
				}, t.value);
			})
		})]
	});
}
//#endregion
//#region src/components/forms/Select.tsx
var _ = {
	sm: `${t.sm} pl-2 pr-1.5 text-xs`,
	md: `${t.md} pl-2.5 pr-2 text-sm`
}, le = {
	sm: "h-6 pl-2 pr-1 text-xs",
	md: "h-7 pl-2.5 pr-1.5 text-xs"
}, ue = {
	sm: "text-xs",
	md: "text-sm"
};
function de(e, t, n) {
	let r = {
		value: e,
		name: t ?? "",
		id: n?.id ?? ""
	}, i = !1;
	return {
		target: r,
		currentTarget: r,
		type: "change",
		bubbles: !0,
		cancelable: !1,
		defaultPrevented: !1,
		eventPhase: 2,
		isTrusted: !0,
		timeStamp: Date.now(),
		nativeEvent: new Event("change"),
		preventDefault() {
			i = !0;
		},
		isDefaultPrevented: () => i,
		stopPropagation() {},
		isPropagationStopped: () => !1,
		persist() {}
	};
}
function fe({ open: t, className: n }) {
	return /* @__PURE__ */ p("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e("shrink-0", n),
		children: /* @__PURE__ */ p("path", { d: t ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
	});
}
var v = 8, y = 4, b = c(function(t, ee) {
	let { options: c, groups: h, placeholder: g, size: se, variant: b = "default", tone: pe = "neutral", invalid: x = !1, disabled: S = !1, className: C, wrapperClassName: w, chevron: T, renderValue: E, searchable: D, searchPlaceholder: O, native: k, "data-testid": A, "aria-invalid": me, value: j, defaultValue: M, onChange: N, name: P, id: he, onKeyDown: ge, ..._e } = t, ve = n(), F = se ?? (ve === "compact" ? "sm" : "md"), I = me ?? (x || void 0), L = x || I === !0 || I === "true", ye = te(), R = he ?? `${ye}-select`, z = `${ye}-listbox`, B = ie(() => {
		let e = [];
		for (let t of c) e.push({
			...t,
			index: e.length
		});
		for (let t of h ?? []) for (let n of t.options) e.push({
			...n,
			group: t.label,
			index: e.length
		});
		return e;
	}, [c, h]), [be, xe] = f(() => M == null ? "" : String(M)), V = j == null ? be : String(j), H = B.find((e) => e.value === V), U = d(null), W = d(null);
	ne(ee, () => U.current);
	let [G, Se] = f(!1), [K, q] = f(-1), [J, Ce] = f(null), Y = d({
		text: "",
		at: 0
	}), we = s(G), X = l((e) => {
		j ?? xe(e), e !== V && N?.(de(e, P, U.current));
	}, [
		j,
		V,
		N,
		P
	]), Te = d(X);
	Te.current = X, u(() => {
		let e = U.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [D, k]);
	let Z = (e) => e >= 0 && e < B.length && !B[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < B.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(B.length, -1), ke = (e) => {
		S || B.length === 0 || (Se(!0), q(e ?? (H && !H.disabled ? H.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = l(() => {
		let e = U.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = window.innerHeight, i = W.current?.scrollHeight ?? 240, a = r - t.bottom - y - v, ee = t.top - y - v, o = a < Math.min(i, 240) && ee > a, s = Math.max(96, Math.min(320, o ? ee : a)), c = Math.min(i, s), l = Math.min(Math.max(t.width, 160), n - 16), u = Math.min(Math.max(v, t.left), n - l - v), te = o ? t.top - y - c : t.bottom + y;
		Ce({
			top: te,
			left: u,
			width: l,
			maxHeight: s
		});
	}, []);
	re(() => {
		G && Ae();
	}, [
		G,
		Ae,
		B.length
	]), u(() => {
		if (!G) return;
		let e = () => Ae(), t = (e) => {
			let t = e.target;
			!U.current?.contains(t) && !W.current?.contains(t) && Q();
		};
		return window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), document.addEventListener("mousedown", t), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0), document.removeEventListener("mousedown", t);
		};
	}, [G, Ae]), u(() => {
		!G || K < 0 || (W.current?.querySelector(`[data-option-index="${K}"]`))?.scrollIntoView?.({ block: "nearest" });
	}, [G, K]);
	let je = (e) => {
		let t = Date.now(), n = (t - Y.current.at > 600 ? "" : Y.current.text) + e.toLowerCase();
		Y.current = {
			text: n,
			at: t
		};
		let r = G && K >= 0 ? K : H?.index ?? -1, i = [...B.slice(r + +(n.length === 1)), ...B.slice(0, r + +(n.length === 1))].find((e) => !e.disabled && e.label.toLowerCase().startsWith(n));
		return i ? i.index : null;
	}, Me = (e) => {
		if (ge?.(e), e.defaultPrevented || S) return;
		let t = Date.now() - Y.current.at < 600 && Y.current.text.length > 0;
		if (!G) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " " && !t) e.preventDefault(), ke(e.key === "ArrowUp" && !H ? Oe() : void 0);
			else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== " ") {
				let t = je(e.key);
				t !== null && ke(t);
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), q((e) => Ee(e, 1));
				break;
			case "ArrowUp":
				e.preventDefault(), e.altKey ? (Z(K) && X(B[K].value), Q()) : q((e) => Ee(e, -1));
				break;
			case "Home":
			case "PageUp":
				e.preventDefault(), q(De());
				break;
			case "End":
			case "PageDown":
				e.preventDefault(), q(Oe());
				break;
			case "Enter":
				e.preventDefault(), Z(K) && X(B[K].value), Q();
				break;
			case " ":
				if (t) {
					let t = je(" ");
					t !== null && q(t), e.preventDefault();
					break;
				}
				e.preventDefault(), Z(K) && X(B[K].value), Q();
				break;
			case "Tab":
				Z(K) && X(B[K].value), Q();
				break;
			case "Escape":
				we() && (e.preventDefault(), e.stopPropagation(), Q());
				break;
			default: if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
				let t = je(e.key);
				t !== null && q(t);
			}
		}
	};
	if (D) return /* @__PURE__ */ p(ce, {
		id: R,
		size: F,
		value: V,
		onChange: (e) => X(e),
		disabled: S,
		invalid: L,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: g ?? O ?? "Search",
		maxOptions: Math.max(8, B.length),
		options: B.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(C, w),
		"data-testid": A
	});
	if (k) return /* @__PURE__ */ m("select", {
		id: R,
		name: P,
		disabled: S,
		"data-testid": A,
		"data-ui-native-select": "",
		"data-ui-native-reason": k.reason,
		"aria-invalid": I,
		value: V,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", L ? "border-danger" : "border-border-emphasis", _[F], C),
		..._e,
		children: [
			g && /* @__PURE__ */ p("option", {
				value: "",
				disabled: !0,
				children: g
			}),
			c.map((e) => /* @__PURE__ */ p("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value)),
			h?.map((e) => /* @__PURE__ */ p("optgroup", {
				label: e.label,
				children: e.options.map((e) => /* @__PURE__ */ p("option", {
					value: e.value,
					disabled: e.disabled,
					children: e.label
				}, e.value))
			}, e.label))
		]
	});
	let $ = b === "pill", Ne = b === "ghost", Pe = a(pe), Fe = H?.label ?? g ?? "", Ie = !H, Le = /* @__PURE__ */ m("button", {
		..._e,
		ref: U,
		id: R,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? z : void 0,
		"aria-activedescendant": G && K >= 0 ? `${z}-opt-${K}` : void 0,
		"aria-invalid": I,
		disabled: S,
		value: V,
		"data-value": V,
		"data-testid": A,
		"data-ui-control": "select",
		"data-variant": b,
		onClick: (e) => {
			_e.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", L ? "border-danger text-danger-fg bg-danger-bg" : e(i[Pe], r[Pe], o[Pe]), le[F]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", L && "border-danger", _[F]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", L ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", _[F]), w, C),
		children: [E ? /* @__PURE__ */ p("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: E(H)
		}) : /* @__PURE__ */ m(ae, { children: [H?.icon && /* @__PURE__ */ p("span", {
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: H.icon
		}), /* @__PURE__ */ p("span", {
			className: e("min-w-0 truncate", !Ne && !$ && "flex-1", Ie && !$ && "text-text-tertiary"),
			children: Fe || "\xA0"
		})] }), /* @__PURE__ */ p(fe, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? oe(/* @__PURE__ */ p("ul", {
		ref: W,
		id: z,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? R,
		"data-ui-listbox": "select",
		"data-testid": A ? `${A}-listbox` : void 0,
		tabIndex: -1,
		style: J ? {
			position: "fixed",
			top: J.top,
			left: J.left,
			width: J.width,
			maxHeight: J.maxHeight
		} : {
			position: "fixed",
			visibility: "hidden"
		},
		className: "z-[10100] m-0 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
		children: B.map((t) => {
			let n = t.group !== void 0 && t.group !== Re ? t.group : null;
			Re = t.group;
			let r = t.value === V;
			return [n !== null && /* @__PURE__ */ p("li", {
				role: "presentation",
				className: "px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary",
				children: n
			}, `g-${t.index}`), /* @__PURE__ */ m("li", {
				id: `${z}-opt-${t.index}`,
				role: "option",
				"aria-selected": r,
				"aria-disabled": t.disabled || void 0,
				"data-ui-option": "",
				"data-option-index": t.index,
				"data-value": t.value,
				onMouseDown: (e) => {
					e.preventDefault(), t.disabled || (X(t.value), Q(), U.current?.focus());
				},
				onMouseEnter: () => {
					t.disabled || q(t.index);
				},
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", ue[F], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
				children: [
					/* @__PURE__ */ p("span", {
						"aria-hidden": "true",
						className: e("mt-0.5 w-3 shrink-0 text-xs", !r && "invisible"),
						children: "✓"
					}),
					t.icon && /* @__PURE__ */ p("span", {
						"aria-hidden": "true",
						className: "mt-0.5 inline-flex shrink-0",
						children: t.icon
					}),
					/* @__PURE__ */ m("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [/* @__PURE__ */ p("span", {
							className: e("truncate leading-5", r ? "font-semibold" : "font-normal"),
							children: t.label
						}), t.description && /* @__PURE__ */ p("span", {
							className: "text-xs font-normal leading-4 text-text-tertiary",
							children: t.description
						})]
					})
				]
			}, `o-${t.index}`)];
		})
	}), document.body) : null;
	return /* @__PURE__ */ m(ae, { children: [
		Le,
		P !== void 0 && /* @__PURE__ */ p("input", {
			type: "hidden",
			name: P,
			value: V
		}),
		ze
	] });
});
//#endregion
export { ce as n, b as t };
