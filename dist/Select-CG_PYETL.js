import { d as e, r as t, s as n } from "./Button-DQoeE5dN.js";
import { h as r, l as i, m as ee, r as a, u as o } from "./safeHref-D1tj5kGa.js";
import { t as s } from "./overlayStack-BFH9XXvN.js";
import { forwardRef as c, useCallback as te, useEffect as l, useId as u, useImperativeHandle as ne, useLayoutEffect as re, useMemo as ie, useRef as d, useState as f } from "react";
import { Fragment as ae, jsx as p, jsxs as m } from "react/jsx-runtime";
import { createPortal as oe } from "react-dom";
//#region src/components/shared/Combobox.tsx
var h = {
	sm: `${t.sm} px-2 text-xs`,
	md: `${t.md} px-2.5 text-sm`
}, g = {
	sm: "min-h-[var(--ui-control-sm,1.75rem)] px-2 text-xs",
	md: "min-h-[var(--ui-control-md,2.25rem)] px-2.5 text-sm"
}, se = {
	sm: "text-xs",
	md: "text-sm"
}, ce = (e, t) => [
	e.label,
	e.description,
	e.meta
].some((e) => (e ?? "").toLowerCase().includes(t));
function le(t) {
	let { options: r, placeholder: i, size: ee, disabled: o, allowCustom: s, maxOptions: c = 8, emptyMessage: te = "No matches", filter: ne, onQueryChange: re, className: oe, "data-testid": le, id: _, invalid: ue, "aria-describedby": de, "aria-invalid": fe, "aria-required": pe } = t, v = n(), y = ee ?? (v === "compact" ? "sm" : "md"), me = t.showToggle ?? !t.multiple, b = ue || fe === !0, x = d(null), S = u(), C = `${S}-list`, he = d(null), [w, ge] = f(""), [T, E] = f(!1), [D, O] = f(-1), k = t.multiple ? t.value : t.value ? [t.value] : [], A = (e) => r.find((t) => t.value === e)?.label ?? e, j = ie(() => {
		let e = w.trim().toLowerCase(), t = ne ?? ce;
		return r.filter((n) => !e || t(n, e)).slice(0, c);
	}, [
		r,
		w,
		ne,
		c
	]), M = T && (j.length > 0 || w.trim().length > 0), _e = () => {
		if (o) return;
		let e = k[0] ? j.findIndex((e) => e.value === k[0]) : -1;
		E(!0), O(e >= 0 ? e : j.length ? 0 : -1);
	}, N = (e) => {
		ge(e), re?.(e);
	}, P = () => {
		E(!1), O(-1);
	}, F = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), N(""), O(-1);
		} else t.onChange(e), N(""), P();
	};
	l(() => {
		if (!T) return;
		let e = (e) => {
			he.current?.contains(e.target) || P();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [T]);
	let I = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), T ? j.length && O((e) => Math.min(e + 1, j.length - 1)) : (E(!0), O(j.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!T) return;
				e.preventDefault(), O((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = T && D >= 0 ? j[D] : void 0;
				t && !t.disabled ? (e.preventDefault(), F(t.value)) : s && w.trim() && (e.preventDefault(), F(w.trim()));
				break;
			}
			case "Escape":
				T && (e.stopPropagation(), P());
				break;
			case "Backspace": t.multiple && !w && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, L = t.multiple || w || T ? w : k[0] ? A(k[0]) : "", R = !t.multiple && !w && !T && k[0] ? t.leading : void 0;
	return /* @__PURE__ */ m("div", {
		ref: he,
		className: e("relative min-w-0", oe),
		"data-testid": le,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ m("div", {
			className: e("flex items-center gap-1 rounded-md border bg-surface-panel transition-colors duration-150", "focus-within:bg-surface focus-within:ring-1", t.multiple ? "flex-wrap py-0.5" : "flex-nowrap", b ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis focus-within:border-info focus-within:ring-info/40", t.multiple ? g[y] : h[y], o && "opacity-50"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ p(a, {
					size: "xs",
					tone: "accent",
					onRemove: o ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: A(e)
				}, e)),
				R && /* @__PURE__ */ p("span", {
					className: "flex shrink-0 items-center",
					"data-combobox-leading": "",
					children: R
				}),
				/* @__PURE__ */ p("input", {
					"data-ui-part": "",
					ref: x,
					id: _,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": de,
					"aria-invalid": b || void 0,
					"aria-required": pe,
					"aria-expanded": M,
					"aria-controls": C,
					"aria-autocomplete": "list",
					"aria-activedescendant": M && D >= 0 ? `${S}-opt-${D}` : void 0,
					disabled: o,
					value: L,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && T && k[0] ? A(k[0]) : i,
					onChange: (e) => {
						N(e.target.value), E(!0), O(-1);
					},
					onKeyDown: I,
					onClick: () => {
						T || _e();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent p-0 font-inherit text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				me && /* @__PURE__ */ p("button", {
					"data-ui-part": "",
					type: "button",
					tabIndex: -1,
					"aria-label": T ? "Close options" : "Show options",
					disabled: o,
					onMouseDown: (e) => {
						e.preventDefault(), T ? P() : (x.current?.focus(), _e());
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
						children: /* @__PURE__ */ p("path", { d: T ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), M && /* @__PURE__ */ p("ul", {
			id: C,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: j.length === 0 ? /* @__PURE__ */ p("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: s ? `Press Enter to use "${w.trim()}"` : te
			}) : j.map((t, n) => {
				let r = k.includes(t.value);
				return /* @__PURE__ */ p("li", {
					id: `${S}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || F(t.value);
					},
					onMouseEnter: () => O(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", se[y], n === D ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
					children: t.leading ? /* @__PURE__ */ m("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ p("span", {
							className: "flex shrink-0 items-center",
							"aria-hidden": "true",
							children: t.leading
						}), /* @__PURE__ */ m("span", {
							className: "flex min-w-0 flex-1 flex-col gap-0.5",
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
						})]
					}) : /* @__PURE__ */ m(ae, { children: [/* @__PURE__ */ m("span", {
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
					})] })
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
}, ue = {
	sm: "h-6 pl-2 pr-1 text-xs",
	md: "h-7 pl-2.5 pr-1.5 text-xs"
}, de = {
	sm: "text-xs",
	md: "text-sm"
};
function fe(e, t, n) {
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
function pe({ open: t, className: n }) {
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
var v = 8, y = 4, me = c(function(t, a) {
	let { options: c, groups: h, placeholder: g, size: se, variant: ce = "default", tone: me = "neutral", invalid: b = !1, disabled: x = !1, className: S, wrapperClassName: C, chevron: he, renderValue: w, searchable: ge, searchPlaceholder: T, native: E, "data-testid": D, "aria-invalid": O, value: k, defaultValue: A, onChange: j, name: M, id: _e, onKeyDown: N, ...P } = t, F = n(), I = se ?? (F === "compact" ? "sm" : "md"), L = O ?? (b || void 0), R = b || L === !0 || L === "true", ve = u(), z = _e ?? `${ve}-select`, ye = `${ve}-listbox`, B = ie(() => {
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
	}, [c, h]), [be, xe] = f(() => A == null ? "" : String(A)), V = k == null ? be : String(k), H = B.find((e) => e.value === V), U = d(null), W = d(null);
	ne(a, () => U.current);
	let [G, Se] = f(!1), [K, q] = f(-1), [J, Ce] = f(null), Y = d({
		text: "",
		at: 0
	}), we = s(G), X = te((e) => {
		k ?? xe(e), e !== V && j?.(fe(e, M, U.current));
	}, [
		k,
		V,
		j,
		M
	]), Te = d(X);
	Te.current = X, l(() => {
		let e = U.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [ge, E]);
	let Z = (e) => e >= 0 && e < B.length && !B[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < B.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(B.length, -1), ke = (e) => {
		x || B.length === 0 || (Se(!0), q(e ?? (H && !H.disabled ? H.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = te(() => {
		let e = U.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--shell-collaboration-floor")) || 0, i = window.innerHeight - Math.max(0, r), ee = W.current?.scrollHeight ?? 240, a = i - t.bottom - y - v, o = t.top - y - v, s = a < Math.min(ee, 240) && o > a, c = Math.max(96, Math.min(320, s ? o : a)), te = Math.min(ee, c), l = n - 16, u = Math.min(t.width, l), ne = Math.min(Math.max(u, W.current?.offsetWidth ?? 0), l), re = Math.min(Math.max(v, t.left), n - ne - v), ie = s ? t.top - y - te : t.bottom + y;
		Ce({
			top: ie,
			left: re,
			minWidth: u,
			maxWidth: l,
			maxHeight: c
		});
	}, []);
	re(() => {
		G && Ae();
	}, [
		G,
		Ae,
		B.length
	]), l(() => {
		if (!G) return;
		let e = () => Ae(), t = (e) => {
			let t = e.target;
			!U.current?.contains(t) && !W.current?.contains(t) && Q();
		};
		return window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), document.addEventListener("mousedown", t), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0), document.removeEventListener("mousedown", t);
		};
	}, [G, Ae]), l(() => {
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
		if (N?.(e), e.defaultPrevented || x) return;
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
	if (ge) return /* @__PURE__ */ p(le, {
		id: z,
		size: I,
		value: V,
		onChange: (e) => X(e),
		disabled: x,
		invalid: R,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: g ?? T ?? "Search",
		maxOptions: Math.max(8, B.length),
		options: B.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(S, C),
		"data-testid": D
	});
	if (E) return /* @__PURE__ */ m("select", {
		"data-ui-part": "",
		id: z,
		name: M,
		disabled: x,
		"data-testid": D,
		"data-ui-native-select": "",
		"data-ui-native-reason": E.reason,
		"aria-invalid": L,
		value: V,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", R ? "border-danger" : "border-border-emphasis", _[I], S),
		...P,
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
	let $ = ce === "pill", Ne = ce === "ghost", Pe = r(me), Fe = H?.label ?? g ?? "", Ie = !H, Le = /* @__PURE__ */ m("button", {
		"data-ui-part": "",
		...P,
		ref: U,
		id: z,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? ye : void 0,
		"aria-activedescendant": G && K >= 0 ? `${ye}-opt-${K}` : void 0,
		"aria-invalid": L,
		disabled: x,
		value: V,
		"data-value": V,
		"data-testid": D,
		"data-ui-control": "select",
		"data-ui-size": I,
		"data-variant": ce,
		onClick: (e) => {
			P.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", R ? "border-danger text-danger-fg bg-danger-bg" : e(o[Pe], i[Pe], ee[Pe]), ue[I]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", R && "border-danger", _[I]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", R ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", _[I]), C, S),
		children: [w ? /* @__PURE__ */ p("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: w(H)
		}) : /* @__PURE__ */ m(ae, { children: [H?.icon && /* @__PURE__ */ p("span", {
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: H.icon
		}), /* @__PURE__ */ p("span", {
			className: e("min-w-0 truncate", !Ne && !$ && "flex-1", Ie && !$ && "text-text-tertiary"),
			children: Fe || "\xA0"
		})] }), /* @__PURE__ */ p(pe, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? oe(/* @__PURE__ */ p("ul", {
		ref: W,
		id: ye,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? z,
		"data-ui-listbox": "select",
		"data-testid": D ? `${D}-listbox` : void 0,
		tabIndex: -1,
		style: J ? {
			position: "fixed",
			top: J.top,
			left: J.left,
			width: "max-content",
			minWidth: J.minWidth,
			maxWidth: J.maxWidth,
			maxHeight: J.maxHeight
		} : {
			position: "fixed",
			top: 0,
			left: 0,
			width: "max-content",
			visibility: "hidden"
		},
		className: "z-[var(--ui-z-popover,10100)] m-0 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
		children: B.map((t) => {
			let n = t.group !== void 0 && t.group !== Re ? t.group : null;
			Re = t.group;
			let r = t.value === V;
			return [n !== null && /* @__PURE__ */ p("li", {
				role: "presentation",
				className: "px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary",
				children: n
			}, `g-${t.index}`), /* @__PURE__ */ m("li", {
				id: `${ye}-opt-${t.index}`,
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
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", de[I], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
		M !== void 0 && /* @__PURE__ */ p("input", {
			"data-ui-part": "",
			type: "hidden",
			name: M,
			value: V
		}),
		ze
	] });
});
//#endregion
export { le as n, me as t };
