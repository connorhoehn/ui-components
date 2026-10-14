import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-uREUOWUk.js";
import { c as r, l as i, m as a, n as o, p as s, t as c } from "./overlayStack-C0EBgmzL.js";
import { forwardRef as l, useCallback as u, useEffect as d, useId as ee, useImperativeHandle as te, useLayoutEffect as ne, useMemo as re, useRef as f, useState as p } from "react";
import { Fragment as ie, jsx as m, jsxs as h } from "react/jsx-runtime";
import { createPortal as ae } from "react-dom";
//#region src/components/shared/Combobox.tsx
var g = {
	sm: `${t.sm} px-2 text-xs`,
	md: `${t.md} px-2.5 text-sm`
}, _ = {
	sm: "min-h-[var(--ui-control-sm,1.75rem)] px-2 text-xs",
	md: "min-h-[var(--ui-control-md,2.25rem)] px-2.5 text-sm"
}, oe = {
	sm: "text-xs",
	md: "text-sm"
}, v = (e, t) => [
	e.label,
	e.description,
	e.meta
].some((e) => (e ?? "").toLowerCase().includes(t));
function se(t) {
	let { options: r, placeholder: i, size: a, disabled: s, allowCustom: c, maxOptions: l = 8, emptyMessage: u = "No matches", filter: te, onQueryChange: ne, className: ae, "data-testid": se, id: y, invalid: ce, "aria-describedby": le, "aria-invalid": ue, "aria-required": de } = t, b = n(), x = a ?? (b === "compact" ? "sm" : "md"), fe = t.showToggle ?? !t.multiple, S = ce || ue === !0, C = f(null), w = ee(), T = `${w}-list`, pe = f(null), [E, me] = p(""), [D, O] = p(!1), [k, A] = p(-1), j = t.multiple ? t.value : t.value ? [t.value] : [], M = (e) => r.find((t) => t.value === e)?.label ?? e, N = re(() => {
		let e = E.trim().toLowerCase(), t = te ?? v;
		return r.filter((n) => !e || t(n, e)).slice(0, l);
	}, [
		r,
		E,
		te,
		l
	]), P = D && (N.length > 0 || E.trim().length > 0), he = () => {
		if (s) return;
		let e = j[0] ? N.findIndex((e) => e.value === j[0]) : -1;
		O(!0), A(e >= 0 ? e : N.length ? 0 : -1);
	}, ge = (e) => {
		me(e), ne?.(e);
	}, F = () => {
		O(!1), A(-1);
	}, I = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), ge(""), A(-1);
		} else t.onChange(e), ge(""), F();
	};
	d(() => {
		if (!D) return;
		let e = (e) => {
			pe.current?.contains(e.target) || F();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [D]);
	let L = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), D ? N.length && A((e) => Math.min(e + 1, N.length - 1)) : (O(!0), A(N.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!D) return;
				e.preventDefault(), A((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = D && k >= 0 ? N[k] : void 0;
				t && !t.disabled ? (e.preventDefault(), I(t.value)) : c && E.trim() && (e.preventDefault(), I(E.trim()));
				break;
			}
			case "Escape":
				D && (e.stopPropagation(), F());
				break;
			case "Backspace": t.multiple && !E && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, R = t.multiple || E || D ? E : j[0] ? M(j[0]) : "", z = !t.multiple && !E && !D && j[0] ? t.leading : void 0;
	return /* @__PURE__ */ h("div", {
		ref: pe,
		className: e("relative min-w-0", ae),
		"data-testid": se,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ h("div", {
			className: e("flex items-center gap-1 rounded-md border bg-surface-panel transition-colors duration-150", "focus-within:bg-surface focus-within:ring-1", t.multiple ? "flex-wrap py-0.5" : "flex-nowrap", S ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis focus-within:border-info focus-within:ring-info/40", t.multiple ? _[x] : g[x], s && "opacity-50"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ m(o, {
					size: "xs",
					tone: "accent",
					onRemove: s ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: M(e)
				}, e)),
				z && /* @__PURE__ */ m("span", {
					className: "flex shrink-0 items-center",
					"data-combobox-leading": "",
					children: z
				}),
				/* @__PURE__ */ m("input", {
					ref: C,
					id: y,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": le,
					"aria-invalid": S || void 0,
					"aria-required": de,
					"aria-expanded": P,
					"aria-controls": T,
					"aria-autocomplete": "list",
					"aria-activedescendant": P && k >= 0 ? `${w}-opt-${k}` : void 0,
					disabled: s,
					value: R,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && D && j[0] ? M(j[0]) : i,
					onChange: (e) => {
						ge(e.target.value), O(!0), A(-1);
					},
					onKeyDown: L,
					onClick: () => {
						D || he();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent p-0 font-inherit text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				fe && /* @__PURE__ */ m("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": D ? "Close options" : "Show options",
					disabled: s,
					onMouseDown: (e) => {
						e.preventDefault(), D ? F() : (C.current?.focus(), he());
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
						children: /* @__PURE__ */ m("path", { d: D ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), P && /* @__PURE__ */ m("ul", {
			id: T,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: N.length === 0 ? /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: c ? `Press Enter to use "${E.trim()}"` : u
			}) : N.map((t, n) => {
				let r = j.includes(t.value);
				return /* @__PURE__ */ m("li", {
					id: `${w}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || I(t.value);
					},
					onMouseEnter: () => A(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", oe[x], n === k ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
var y = {
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
var b = 8, x = 4, fe = l(function(t, o) {
	let { options: l, groups: g, placeholder: _, size: oe, variant: v = "default", tone: fe = "neutral", invalid: S = !1, disabled: C = !1, className: w, wrapperClassName: T, chevron: pe, renderValue: E, searchable: me, searchPlaceholder: D, native: O, "data-testid": k, "aria-invalid": A, value: j, defaultValue: M, onChange: N, name: P, id: he, onKeyDown: ge, ...F } = t, I = n(), L = oe ?? (I === "compact" ? "sm" : "md"), R = A ?? (S || void 0), z = S || R === !0 || R === "true", _e = ee(), ve = he ?? `${_e}-select`, ye = `${_e}-listbox`, B = re(() => {
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
	}, [l, g]), [be, xe] = p(() => M == null ? "" : String(M)), V = j == null ? be : String(j), H = B.find((e) => e.value === V), U = f(null), W = f(null);
	te(o, () => U.current);
	let [G, Se] = p(!1), [K, q] = p(-1), [J, Ce] = p(null), Y = f({
		text: "",
		at: 0
	}), we = c(G), X = u((e) => {
		j ?? xe(e), e !== V && N?.(ue(e, P, U.current));
	}, [
		j,
		V,
		N,
		P
	]), Te = f(X);
	Te.current = X, d(() => {
		let e = U.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [me, O]);
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
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = window.innerHeight, i = W.current?.scrollHeight ?? 240, a = r - t.bottom - x - b, o = t.top - x - b, s = a < Math.min(i, 240) && o > a, c = Math.max(96, Math.min(320, s ? o : a)), l = Math.min(i, c), u = Math.min(Math.max(t.width, 160), n - 16), d = Math.min(Math.max(b, t.left), n - u - b), ee = s ? t.top - x - l : t.bottom + x;
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
		if (ge?.(e), e.defaultPrevented || C) return;
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
	if (me) return /* @__PURE__ */ m(se, {
		id: ve,
		size: L,
		value: V,
		onChange: (e) => X(e),
		disabled: C,
		invalid: z,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: _ ?? D ?? "Search",
		maxOptions: Math.max(8, B.length),
		options: B.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(w, T),
		"data-testid": k
	});
	if (O) return /* @__PURE__ */ h("select", {
		id: ve,
		name: P,
		disabled: C,
		"data-testid": k,
		"data-ui-native-select": "",
		"data-ui-native-reason": O.reason,
		"aria-invalid": R,
		value: V,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", z ? "border-danger" : "border-border-emphasis", y[L], w),
		...F,
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
	let $ = v === "pill", Ne = v === "ghost", Pe = a(fe), Fe = H?.label ?? _ ?? "", Ie = !H, Le = /* @__PURE__ */ h("button", {
		...F,
		ref: U,
		id: ve,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? ye : void 0,
		"aria-activedescendant": G && K >= 0 ? `${ye}-opt-${K}` : void 0,
		"aria-invalid": R,
		disabled: C,
		value: V,
		"data-value": V,
		"data-testid": k,
		"data-ui-control": "select",
		"data-variant": v,
		onClick: (e) => {
			F.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", z ? "border-danger text-danger-fg bg-danger-bg" : e(i[Pe], r[Pe], s[Pe]), ce[L]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", z && "border-danger", y[L]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", z ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", y[L]), T, w),
		children: [E ? /* @__PURE__ */ m("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: E(H)
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
		id: ye,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? ve,
		"data-ui-listbox": "select",
		"data-testid": k ? `${k}-listbox` : void 0,
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
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", le[L], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
		P !== void 0 && /* @__PURE__ */ m("input", {
			type: "hidden",
			name: P,
			value: V
		}),
		ze
	] });
});
//#endregion
export { se as n, fe as t };
