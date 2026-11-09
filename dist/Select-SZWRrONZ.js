import { d as e, r as t, s as n } from "./Button-DQoeE5dN.js";
import { c as r, f as i, p as a, s as o, t as s } from "./Chip-5WvKIIpI.js";
import { t as c } from "./overlayStack-BFH9XXvN.js";
import { forwardRef as l, useCallback as u, useEffect as d, useId as ee, useImperativeHandle as te, useLayoutEffect as ne, useMemo as re, useRef as f, useState as p } from "react";
import { Fragment as ie, jsx as m, jsxs as h } from "react/jsx-runtime";
import { createPortal as ae } from "react-dom";
//#region src/components/shared/Combobox.tsx
var oe = {
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
	let { options: r, placeholder: i, size: a, disabled: o, allowCustom: c, maxOptions: l = 8, emptyMessage: u = "No matches", filter: te, onQueryChange: ne, className: ae, "data-testid": le, id: _, invalid: ue, "aria-describedby": de, "aria-invalid": fe, "aria-required": pe } = t, v = n(), y = a ?? (v === "compact" ? "sm" : "md"), me = t.showToggle ?? !t.multiple, he = ue || fe === !0, b = f(null), x = ee(), S = `${x}-list`, ge = f(null), [C, _e] = p(""), [w, T] = p(!1), [E, D] = p(-1), O = t.multiple ? t.value : t.value ? [t.value] : [], k = (e) => r.find((t) => t.value === e)?.label ?? e, A = re(() => {
		let e = C.trim().toLowerCase(), t = te ?? ce;
		return r.filter((n) => !e || t(n, e)).slice(0, l);
	}, [
		r,
		C,
		te,
		l
	]), j = w && (A.length > 0 || C.trim().length > 0), ve = () => {
		if (o) return;
		let e = O[0] ? A.findIndex((e) => e.value === O[0]) : -1;
		T(!0), D(e >= 0 ? e : A.length ? 0 : -1);
	}, M = (e) => {
		_e(e), ne?.(e);
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
			ge.current?.contains(e.target) || N();
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
				t && !t.disabled ? (e.preventDefault(), P(t.value)) : c && C.trim() && (e.preventDefault(), P(C.trim()));
				break;
			}
			case "Escape":
				w && (e.stopPropagation(), N());
				break;
			case "Backspace": t.multiple && !C && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, I = t.multiple || C || w ? C : O[0] ? k(O[0]) : "", L = !t.multiple && !C && !w && O[0] ? t.leading : void 0;
	return /* @__PURE__ */ h("div", {
		ref: ge,
		className: e("relative min-w-0", ae),
		"data-testid": le,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ h("div", {
			className: e("flex items-center gap-1 rounded-md border bg-surface-panel transition-colors duration-150", "focus-within:bg-surface focus-within:ring-1", t.multiple ? "flex-wrap py-0.5" : "flex-nowrap", he ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis focus-within:border-info focus-within:ring-info/40", t.multiple ? g[y] : oe[y], o && "opacity-50"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ m(s, {
					size: "xs",
					tone: "accent",
					onRemove: o ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: k(e)
				}, e)),
				L && /* @__PURE__ */ m("span", {
					className: "flex shrink-0 items-center",
					"data-combobox-leading": "",
					children: L
				}),
				/* @__PURE__ */ m("input", {
					"data-ui-part": "",
					ref: b,
					id: _,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": de,
					"aria-invalid": he || void 0,
					"aria-required": pe,
					"aria-expanded": j,
					"aria-controls": S,
					"aria-autocomplete": "list",
					"aria-activedescendant": j && E >= 0 ? `${x}-opt-${E}` : void 0,
					disabled: o,
					value: I,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && w && O[0] ? k(O[0]) : i,
					onChange: (e) => {
						M(e.target.value), T(!0), D(-1);
					},
					onKeyDown: F,
					onClick: () => {
						w || ve();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent p-0 font-inherit text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				me && /* @__PURE__ */ m("button", {
					"data-ui-part": "",
					type: "button",
					tabIndex: -1,
					"aria-label": w ? "Close options" : "Show options",
					disabled: o,
					onMouseDown: (e) => {
						e.preventDefault(), w ? N() : (b.current?.focus(), ve());
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
			id: S,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: A.length === 0 ? /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: c ? `Press Enter to use "${C.trim()}"` : u
			}) : A.map((t, n) => {
				let r = O.includes(t.value);
				return /* @__PURE__ */ m("li", {
					id: `${x}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || P(t.value);
					},
					onMouseEnter: () => D(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", se[y], n === E ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
					children: t.leading ? /* @__PURE__ */ h("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ m("span", {
							className: "flex shrink-0 items-center",
							"aria-hidden": "true",
							children: t.leading
						}), /* @__PURE__ */ h("span", {
							className: "flex min-w-0 flex-1 flex-col gap-0.5",
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
						})]
					}) : /* @__PURE__ */ h(ie, { children: [/* @__PURE__ */ h("span", {
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
var v = 8, y = 4, me = l(function(t, s) {
	let { options: l, groups: oe, placeholder: g, size: se, variant: ce = "default", tone: me = "neutral", invalid: he = !1, disabled: b = !1, className: x, wrapperClassName: S, chevron: ge, renderValue: C, searchable: _e, searchPlaceholder: w, native: T, "data-testid": E, "aria-invalid": D, value: O, defaultValue: k, onChange: A, name: j, id: ve, onKeyDown: M, ...N } = t, P = n(), F = se ?? (P === "compact" ? "sm" : "md"), I = D ?? (he || void 0), L = he || I === !0 || I === "true", ye = ee(), R = ve ?? `${ye}-select`, z = `${ye}-listbox`, B = re(() => {
		let e = [];
		for (let t of l) e.push({
			...t,
			index: e.length
		});
		for (let t of oe ?? []) for (let n of t.options) e.push({
			...n,
			group: t.label,
			index: e.length
		});
		return e;
	}, [l, oe]), [be, xe] = p(() => k == null ? "" : String(k)), V = O == null ? be : String(O), H = B.find((e) => e.value === V), U = f(null), W = f(null);
	te(s, () => U.current);
	let [G, Se] = p(!1), [K, q] = p(-1), [J, Ce] = p(null), Y = f({
		text: "",
		at: 0
	}), we = c(G), X = u((e) => {
		O ?? xe(e), e !== V && A?.(fe(e, j, U.current));
	}, [
		O,
		V,
		A,
		j
	]), Te = f(X);
	Te.current = X, d(() => {
		let e = U.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [_e, T]);
	let Z = (e) => e >= 0 && e < B.length && !B[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < B.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(B.length, -1), ke = (e) => {
		b || B.length === 0 || (Se(!0), q(e ?? (H && !H.disabled ? H.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = u(() => {
		let e = U.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--shell-collaboration-floor")) || 0, i = window.innerHeight - Math.max(0, r), a = W.current?.scrollHeight ?? 240, o = i - t.bottom - y - v, s = t.top - y - v, c = o < Math.min(a, 240) && s > o, l = Math.max(96, Math.min(320, c ? s : o)), u = Math.min(a, l), d = n - 16, ee = Math.min(t.width, d), te = Math.min(Math.max(ee, W.current?.offsetWidth ?? 0), d), ne = Math.min(Math.max(v, t.left), n - te - v), re = c ? t.top - y - u : t.bottom + y;
		Ce({
			top: re,
			left: ne,
			minWidth: ee,
			maxWidth: d,
			maxHeight: l
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
		if (M?.(e), e.defaultPrevented || b) return;
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
	if (_e) return /* @__PURE__ */ m(le, {
		id: R,
		size: F,
		value: V,
		onChange: (e) => X(e),
		disabled: b,
		invalid: L,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: g ?? w ?? "Search",
		maxOptions: Math.max(8, B.length),
		options: B.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(x, S),
		"data-testid": E
	});
	if (T) return /* @__PURE__ */ h("select", {
		"data-ui-part": "",
		id: R,
		name: j,
		disabled: b,
		"data-testid": E,
		"data-ui-native-select": "",
		"data-ui-native-reason": T.reason,
		"aria-invalid": I,
		value: V,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", L ? "border-danger" : "border-border-emphasis", _[F], x),
		...N,
		children: [
			g && /* @__PURE__ */ m("option", {
				value: "",
				disabled: !0,
				children: g
			}),
			l.map((e) => /* @__PURE__ */ m("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value)),
			oe?.map((e) => /* @__PURE__ */ m("optgroup", {
				label: e.label,
				children: e.options.map((e) => /* @__PURE__ */ m("option", {
					value: e.value,
					disabled: e.disabled,
					children: e.label
				}, e.value))
			}, e.label))
		]
	});
	let $ = ce === "pill", Ne = ce === "ghost", Pe = a(me), Fe = H?.label ?? g ?? "", Ie = !H, Le = /* @__PURE__ */ h("button", {
		"data-ui-part": "",
		...N,
		ref: U,
		id: R,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? z : void 0,
		"aria-activedescendant": G && K >= 0 ? `${z}-opt-${K}` : void 0,
		"aria-invalid": I,
		disabled: b,
		value: V,
		"data-value": V,
		"data-testid": E,
		"data-ui-control": "select",
		"data-ui-size": F,
		"data-variant": ce,
		onClick: (e) => {
			N.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", L ? "border-danger text-danger-fg bg-danger-bg" : e(r[Pe], o[Pe], i[Pe]), ue[F]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", L && "border-danger", _[F]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", L ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", _[F]), S, x),
		children: [C ? /* @__PURE__ */ m("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: C(H)
		}) : /* @__PURE__ */ h(ie, { children: [H?.icon && /* @__PURE__ */ m("span", {
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: H.icon
		}), /* @__PURE__ */ m("span", {
			className: e("min-w-0 truncate", !Ne && !$ && "flex-1", Ie && !$ && "text-text-tertiary"),
			children: Fe || "\xA0"
		})] }), /* @__PURE__ */ m(pe, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? ae(/* @__PURE__ */ m("ul", {
		ref: W,
		id: z,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? R,
		"data-ui-listbox": "select",
		"data-testid": E ? `${E}-listbox` : void 0,
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
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", de[F], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
		j !== void 0 && /* @__PURE__ */ m("input", {
			"data-ui-part": "",
			type: "hidden",
			name: j,
			value: V
		}),
		ze
	] });
});
//#endregion
export { le as n, me as t };
