import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-uREUOWUk.js";
import { c as r, l as i, m as a, n as o, p as s, t as c } from "./overlayStack-C0EBgmzL.js";
import { forwardRef as l, useCallback as u, useEffect as d, useId as ee, useImperativeHandle as te, useLayoutEffect as ne, useMemo as re, useRef as f, useState as p } from "react";
import { Fragment as ie, jsx as m, jsxs as h } from "react/jsx-runtime";
import { createPortal as ae } from "react-dom";
//#region src/components/shared/Combobox.tsx
var g = {
	sm: "min-h-7 text-xs",
	md: "min-h-9 text-sm"
}, _ = {
	sm: "text-xs",
	md: "text-sm"
}, oe = (e, t) => [
	e.label,
	e.description,
	e.meta
].some((e) => (e ?? "").toLowerCase().includes(t));
function se(t) {
	let { options: n, placeholder: r, size: i = "sm", disabled: a, allowCustom: s, maxOptions: c = 8, emptyMessage: l = "No matches", filter: u, onQueryChange: te, className: ne, "data-testid": ie, id: ae, invalid: se, "aria-describedby": v, "aria-invalid": ce, "aria-required": le } = t, ue = t.showToggle ?? !t.multiple, de = se || ce === !0, y = f(null), b = ee(), x = `${b}-list`, fe = f(null), [S, C] = p(""), [w, T] = p(!1), [E, D] = p(-1), O = t.multiple ? t.value : t.value ? [t.value] : [], k = (e) => n.find((t) => t.value === e)?.label ?? e, A = re(() => {
		let e = S.trim().toLowerCase(), t = u ?? oe;
		return n.filter((n) => !e || t(n, e)).slice(0, c);
	}, [
		n,
		S,
		u,
		c
	]), j = w && (A.length > 0 || S.trim().length > 0), pe = () => {
		if (a) return;
		let e = O[0] ? A.findIndex((e) => e.value === O[0]) : -1;
		T(!0), D(e >= 0 ? e : A.length ? 0 : -1);
	}, M = (e) => {
		C(e), te?.(e);
	}, N = () => {
		T(!1), D(-1);
	}, P = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), M(""), D(-1);
		} else t.onChange(e), M(""), N();
	};
	d(() => {
		if (!w) return;
		let e = (e) => {
			fe.current?.contains(e.target) || N();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [w]);
	let F = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), w ? A.length && D((e) => Math.min(e + 1, A.length - 1)) : (T(!0), D(A.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!w) return;
				e.preventDefault(), D((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = w && E >= 0 ? A[E] : void 0;
				t && !t.disabled ? (e.preventDefault(), P(t.value)) : s && S.trim() && (e.preventDefault(), P(S.trim()));
				break;
			}
			case "Escape":
				w && (e.stopPropagation(), N());
				break;
			case "Backspace": t.multiple && !S && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, me = t.multiple || S || w ? S : O[0] ? k(O[0]) : "";
	return /* @__PURE__ */ h("div", {
		ref: fe,
		className: e("relative min-w-0", ne),
		"data-testid": ie,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ h("div", {
			className: e("flex flex-wrap items-center gap-1 rounded-md border bg-surface px-2 py-0.5", de ? "border-danger focus-within:border-danger" : "border-border-field focus-within:border-primary", g[i], a && "opacity-60"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ m(o, {
					size: "xs",
					tone: "accent",
					onRemove: a ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: k(e)
				}, e)),
				/* @__PURE__ */ m("input", {
					ref: y,
					id: ae,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": v,
					"aria-invalid": de || void 0,
					"aria-required": le,
					"aria-expanded": j,
					"aria-controls": x,
					"aria-autocomplete": "list",
					"aria-activedescendant": j && E >= 0 ? `${b}-opt-${E}` : void 0,
					disabled: a,
					value: me,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && w && O[0] ? k(O[0]) : r,
					onChange: (e) => {
						M(e.target.value), T(!0), D(-1);
					},
					onKeyDown: F,
					onClick: () => {
						w || pe();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				ue && /* @__PURE__ */ m("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": w ? "Close options" : "Show options",
					disabled: a,
					onMouseDown: (e) => {
						e.preventDefault(), w ? N() : (y.current?.focus(), pe());
					},
					className: "flex shrink-0 items-center justify-center rounded p-0.5 text-text-secondary hover:bg-surface-hover disabled:cursor-not-allowed",
					children: /* @__PURE__ */ m("svg", {
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
						children: /* @__PURE__ */ m("path", { d: w ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), j && /* @__PURE__ */ m("ul", {
			id: x,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: A.length === 0 ? /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: s ? `Press Enter to use "${S.trim()}"` : l
			}) : A.map((t, n) => {
				let r = O.includes(t.value);
				return /* @__PURE__ */ h("li", {
					id: `${b}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || P(t.value);
					},
					onMouseEnter: () => D(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", _[i], n === E ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
					children: [/* @__PURE__ */ h("span", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ h("span", {
							className: "min-w-0 flex-1 truncate",
							children: [r ? "✓ " : "", t.label]
						}), t.meta && /* @__PURE__ */ m("span", {
							className: "shrink-0 text-xs font-normal text-text-secondary",
							children: t.meta
						})]
					}), t.description && /* @__PURE__ */ m("span", {
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
var v = {
	sm: `${t.sm} pl-2 pr-1.5 text-xs`,
	md: `${t.md} pl-2.5 pr-2 text-sm`
}, ce = {
	sm: "h-6 pl-2 pr-1 text-xs",
	md: "h-7 pl-2.5 pr-1.5 text-xs"
}, le = {
	sm: "text-xs",
	md: "text-sm"
};
function ue(e, t, n) {
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
function de({ open: t, className: n }) {
	return /* @__PURE__ */ m("svg", {
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
		children: /* @__PURE__ */ m("path", { d: t ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
	});
}
var y = 8, b = 4, x = l(function(t, o) {
	let { options: l, groups: g, placeholder: _, size: oe, variant: x = "default", tone: fe = "neutral", invalid: S = !1, disabled: C = !1, className: w, wrapperClassName: T, chevron: E, renderValue: D, searchable: O, searchPlaceholder: k, native: A, "data-testid": j, "aria-invalid": pe, value: M, defaultValue: N, onChange: P, name: F, id: me, onKeyDown: he, ...ge } = t, _e = n(), I = oe ?? (_e === "compact" ? "sm" : "md"), L = pe ?? (S || void 0), R = S || L === !0 || L === "true", ve = ee(), ye = me ?? `${ve}-select`, z = `${ve}-listbox`, B = re(() => {
		let e = [];
		for (let t of l) e.push({
			...t,
			index: e.length
		});
		for (let t of g ?? []) for (let n of t.options) e.push({
			...n,
			group: t.label,
			index: e.length
		});
		return e;
	}, [l, g]), [be, xe] = p(() => N == null ? "" : String(N)), V = M == null ? be : String(M), H = B.find((e) => e.value === V), U = f(null), W = f(null);
	te(o, () => U.current);
	let [G, Se] = p(!1), [K, q] = p(-1), [J, Ce] = p(null), Y = f({
		text: "",
		at: 0
	}), we = c(G), X = u((e) => {
		M ?? xe(e), e !== V && P?.(ue(e, F, U.current));
	}, [
		M,
		V,
		P,
		F
	]), Te = f(X);
	Te.current = X, d(() => {
		let e = U.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [O, A]);
	let Z = (e) => e >= 0 && e < B.length && !B[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < B.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(B.length, -1), ke = (e) => {
		C || B.length === 0 || (Se(!0), q(e ?? (H && !H.disabled ? H.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = u(() => {
		let e = U.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = window.innerHeight, i = W.current?.scrollHeight ?? 240, a = r - t.bottom - b - y, o = t.top - b - y, s = a < Math.min(i, 240) && o > a, c = Math.max(96, Math.min(320, s ? o : a)), l = Math.min(i, c), u = Math.min(Math.max(t.width, 160), n - 16), d = Math.min(Math.max(y, t.left), n - u - y), ee = s ? t.top - b - l : t.bottom + b;
		Ce({
			top: ee,
			left: d,
			width: u,
			maxHeight: c
		});
	}, []);
	ne(() => {
		G && Ae();
	}, [
		G,
		Ae,
		B.length
	]), d(() => {
		if (!G) return;
		let e = () => Ae(), t = (e) => {
			let t = e.target;
			!U.current?.contains(t) && !W.current?.contains(t) && Q();
		};
		return window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), document.addEventListener("mousedown", t), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0), document.removeEventListener("mousedown", t);
		};
	}, [G, Ae]), d(() => {
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
		if (he?.(e), e.defaultPrevented || C) return;
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
	if (O) return /* @__PURE__ */ m(se, {
		id: ye,
		size: I,
		value: V,
		onChange: (e) => X(e),
		disabled: C,
		invalid: R,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: _ ?? k ?? "Search",
		maxOptions: Math.max(8, B.length),
		options: B.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(w, T),
		"data-testid": j
	});
	if (A) return /* @__PURE__ */ h("select", {
		id: ye,
		name: F,
		disabled: C,
		"data-testid": j,
		"data-ui-native-select": "",
		"data-ui-native-reason": A.reason,
		"aria-invalid": L,
		value: V,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", R ? "border-danger" : "border-border-emphasis", v[I], w),
		...ge,
		children: [
			_ && /* @__PURE__ */ m("option", {
				value: "",
				disabled: !0,
				children: _
			}),
			l.map((e) => /* @__PURE__ */ m("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value)),
			g?.map((e) => /* @__PURE__ */ m("optgroup", {
				label: e.label,
				children: e.options.map((e) => /* @__PURE__ */ m("option", {
					value: e.value,
					disabled: e.disabled,
					children: e.label
				}, e.value))
			}, e.label))
		]
	});
	let $ = x === "pill", Ne = x === "ghost", Pe = a(fe), Fe = H?.label ?? _ ?? "", Ie = !H, Le = /* @__PURE__ */ h("button", {
		...ge,
		ref: U,
		id: ye,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? z : void 0,
		"aria-activedescendant": G && K >= 0 ? `${z}-opt-${K}` : void 0,
		"aria-invalid": L,
		disabled: C,
		value: V,
		"data-value": V,
		"data-testid": j,
		"data-ui-control": "select",
		"data-variant": x,
		onClick: (e) => {
			ge.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", R ? "border-danger text-danger-fg bg-danger-bg" : e(i[Pe], r[Pe], s[Pe]), ce[I]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", R && "border-danger", v[I]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", R ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", v[I]), T, w),
		children: [D ? /* @__PURE__ */ m("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: D(H)
		}) : /* @__PURE__ */ h(ie, { children: [H?.icon && /* @__PURE__ */ m("span", {
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: H.icon
		}), /* @__PURE__ */ m("span", {
			className: e("min-w-0 truncate", !Ne && !$ && "flex-1", Ie && !$ && "text-text-tertiary"),
			children: Fe || "\xA0"
		})] }), /* @__PURE__ */ m(de, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? ae(/* @__PURE__ */ m("ul", {
		ref: W,
		id: z,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"],
		"aria-label": t["aria-labelledby"] ? void 0 : t["aria-label"] ?? (_ || void 0),
		"data-ui-listbox": "select",
		"data-testid": j ? `${j}-listbox` : void 0,
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
			return [n !== null && /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary",
				children: n
			}, `g-${t.index}`), /* @__PURE__ */ h("li", {
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
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", le[I], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
				children: [
					/* @__PURE__ */ m("span", {
						"aria-hidden": "true",
						className: e("mt-0.5 w-3 shrink-0 text-xs", !r && "invisible"),
						children: "✓"
					}),
					t.icon && /* @__PURE__ */ m("span", {
						"aria-hidden": "true",
						className: "mt-0.5 inline-flex shrink-0",
						children: t.icon
					}),
					/* @__PURE__ */ h("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [/* @__PURE__ */ m("span", {
							className: e("truncate leading-5", r ? "font-semibold" : "font-normal"),
							children: t.label
						}), t.description && /* @__PURE__ */ m("span", {
							className: "text-xs font-normal leading-4 text-text-tertiary",
							children: t.description
						})]
					})
				]
			}, `o-${t.index}`)];
		})
	}), document.body) : null;
	return /* @__PURE__ */ h(ie, { children: [
		Le,
		F !== void 0 && /* @__PURE__ */ m("input", {
			type: "hidden",
			name: F,
			value: V
		}),
		ze
	] });
});
//#endregion
export { se as n, x as t };
