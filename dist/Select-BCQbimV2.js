import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-C-I3BxWI.js";
import { c as r, f as i, p as a, s as o, t as s } from "./Chip-BlpTnjWu.js";
import { t as c } from "./overlayStack-BFH9XXvN.js";
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
	let { options: r, placeholder: i, size: a, disabled: o, allowCustom: c, maxOptions: l = 8, emptyMessage: u = "No matches", filter: te, onQueryChange: ne, className: ae, "data-testid": se, id: y, invalid: ce, "aria-describedby": le, "aria-invalid": ue, "aria-required": de } = t, b = n(), x = a ?? (b === "compact" ? "sm" : "md"), fe = t.showToggle ?? !t.multiple, pe = ce || ue === !0, S = f(null), C = ee(), w = `${C}-list`, me = f(null), [T, he] = p(""), [E, D] = p(!1), [O, k] = p(-1), A = t.multiple ? t.value : t.value ? [t.value] : [], j = (e) => r.find((t) => t.value === e)?.label ?? e, M = re(() => {
		let e = T.trim().toLowerCase(), t = te ?? v;
		return r.filter((n) => !e || t(n, e)).slice(0, l);
	}, [
		r,
		T,
		te,
		l
	]), N = E && (M.length > 0 || T.trim().length > 0), ge = () => {
		if (o) return;
		let e = A[0] ? M.findIndex((e) => e.value === A[0]) : -1;
		D(!0), k(e >= 0 ? e : M.length ? 0 : -1);
	}, P = (e) => {
		he(e), ne?.(e);
	}, F = () => {
		D(!1), k(-1);
	}, I = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), P(""), k(-1);
		} else t.onChange(e), P(""), F();
	};
	d(() => {
		if (!E) return;
		let e = (e) => {
			me.current?.contains(e.target) || F();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [E]);
	let L = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), E ? M.length && k((e) => Math.min(e + 1, M.length - 1)) : (D(!0), k(M.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!E) return;
				e.preventDefault(), k((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = E && O >= 0 ? M[O] : void 0;
				t && !t.disabled ? (e.preventDefault(), I(t.value)) : c && T.trim() && (e.preventDefault(), I(T.trim()));
				break;
			}
			case "Escape":
				E && (e.stopPropagation(), F());
				break;
			case "Backspace": t.multiple && !T && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, R = t.multiple || T || E ? T : A[0] ? j(A[0]) : "", z = !t.multiple && !T && !E && A[0] ? t.leading : void 0;
	return /* @__PURE__ */ h("div", {
		ref: me,
		className: e("relative min-w-0", ae),
		"data-testid": se,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ h("div", {
			className: e("flex items-center gap-1 rounded-md border bg-surface-panel transition-colors duration-150", "focus-within:bg-surface focus-within:ring-1", t.multiple ? "flex-wrap py-0.5" : "flex-nowrap", pe ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis focus-within:border-info focus-within:ring-info/40", t.multiple ? _[x] : g[x], o && "opacity-50"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ m(s, {
					size: "xs",
					tone: "accent",
					onRemove: o ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: j(e)
				}, e)),
				z && /* @__PURE__ */ m("span", {
					className: "flex shrink-0 items-center",
					"data-combobox-leading": "",
					children: z
				}),
				/* @__PURE__ */ m("input", {
					"data-ui-part": "",
					ref: S,
					id: y,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": le,
					"aria-invalid": pe || void 0,
					"aria-required": de,
					"aria-expanded": N,
					"aria-controls": w,
					"aria-autocomplete": "list",
					"aria-activedescendant": N && O >= 0 ? `${C}-opt-${O}` : void 0,
					disabled: o,
					value: R,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && E && A[0] ? j(A[0]) : i,
					onChange: (e) => {
						P(e.target.value), D(!0), k(-1);
					},
					onKeyDown: L,
					onClick: () => {
						E || ge();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent p-0 font-inherit text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				fe && /* @__PURE__ */ m("button", {
					"data-ui-part": "",
					type: "button",
					tabIndex: -1,
					"aria-label": E ? "Close options" : "Show options",
					disabled: o,
					onMouseDown: (e) => {
						e.preventDefault(), E ? F() : (S.current?.focus(), ge());
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
						children: /* @__PURE__ */ m("path", { d: E ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), N && /* @__PURE__ */ m("ul", {
			id: w,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: M.length === 0 ? /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: c ? `Press Enter to use "${T.trim()}"` : u
			}) : M.map((t, n) => {
				let r = A.includes(t.value);
				return /* @__PURE__ */ m("li", {
					id: `${C}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || I(t.value);
					},
					onMouseEnter: () => k(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", oe[x], n === O ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
var b = 8, x = 4, fe = l(function(t, s) {
	let { options: l, groups: g, placeholder: _, size: oe, variant: v = "default", tone: fe = "neutral", invalid: pe = !1, disabled: S = !1, className: C, wrapperClassName: w, chevron: me, renderValue: T, searchable: he, searchPlaceholder: E, native: D, "data-testid": O, "aria-invalid": k, value: A, defaultValue: j, onChange: M, name: N, id: ge, onKeyDown: P, ...F } = t, I = n(), L = oe ?? (I === "compact" ? "sm" : "md"), R = k ?? (pe || void 0), z = pe || R === !0 || R === "true", _e = ee(), B = ge ?? `${_e}-select`, ve = `${_e}-listbox`, V = re(() => {
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
	}, [l, g]), [ye, be] = p(() => j == null ? "" : String(j)), H = A == null ? ye : String(A), U = V.find((e) => e.value === H), W = f(null), xe = f(null);
	te(s, () => W.current);
	let [G, Se] = p(!1), [K, q] = p(-1), [J, Ce] = p(null), Y = f({
		text: "",
		at: 0
	}), we = c(G), X = u((e) => {
		A ?? be(e), e !== H && M?.(ue(e, N, W.current));
	}, [
		A,
		H,
		M,
		N
	]), Te = f(X);
	Te.current = X, d(() => {
		let e = W.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [he, D]);
	let Z = (e) => e >= 0 && e < V.length && !V[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < V.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(V.length, -1), ke = (e) => {
		S || V.length === 0 || (Se(!0), q(e ?? (U && !U.disabled ? U.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = u(() => {
		let e = W.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = window.innerHeight, i = xe.current?.scrollHeight ?? 240, a = r - t.bottom - x - b, o = t.top - x - b, s = a < Math.min(i, 240) && o > a, c = Math.max(96, Math.min(320, s ? o : a)), l = Math.min(i, c), u = Math.min(Math.max(t.width, 160), n - 16), d = Math.min(Math.max(b, t.left), n - u - b), ee = s ? t.top - x - l : t.bottom + x;
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
		V.length
	]), d(() => {
		if (!G) return;
		let e = () => Ae(), t = (e) => {
			let t = e.target;
			!W.current?.contains(t) && !xe.current?.contains(t) && Q();
		};
		return window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), document.addEventListener("mousedown", t), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0), document.removeEventListener("mousedown", t);
		};
	}, [G, Ae]), d(() => {
		!G || K < 0 || (xe.current?.querySelector(`[data-option-index="${K}"]`))?.scrollIntoView?.({ block: "nearest" });
	}, [G, K]);
	let je = (e) => {
		let t = Date.now(), n = (t - Y.current.at > 600 ? "" : Y.current.text) + e.toLowerCase();
		Y.current = {
			text: n,
			at: t
		};
		let r = G && K >= 0 ? K : U?.index ?? -1, i = [...V.slice(r + +(n.length === 1)), ...V.slice(0, r + +(n.length === 1))].find((e) => !e.disabled && e.label.toLowerCase().startsWith(n));
		return i ? i.index : null;
	}, Me = (e) => {
		if (P?.(e), e.defaultPrevented || S) return;
		let t = Date.now() - Y.current.at < 600 && Y.current.text.length > 0;
		if (!G) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " " && !t) e.preventDefault(), ke(e.key === "ArrowUp" && !U ? Oe() : void 0);
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
				e.preventDefault(), e.altKey ? (Z(K) && X(V[K].value), Q()) : q((e) => Ee(e, -1));
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
				e.preventDefault(), Z(K) && X(V[K].value), Q();
				break;
			case " ":
				if (t) {
					let t = je(" ");
					t !== null && q(t), e.preventDefault();
					break;
				}
				e.preventDefault(), Z(K) && X(V[K].value), Q();
				break;
			case "Tab":
				Z(K) && X(V[K].value), Q();
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
	if (he) return /* @__PURE__ */ m(se, {
		id: B,
		size: L,
		value: H,
		onChange: (e) => X(e),
		disabled: S,
		invalid: z,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: _ ?? E ?? "Search",
		maxOptions: Math.max(8, V.length),
		options: V.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(C, w),
		"data-testid": O
	});
	if (D) return /* @__PURE__ */ h("select", {
		"data-ui-part": "",
		id: B,
		name: N,
		disabled: S,
		"data-testid": O,
		"data-ui-native-select": "",
		"data-ui-native-reason": D.reason,
		"aria-invalid": R,
		value: H,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", z ? "border-danger" : "border-border-emphasis", y[L], C),
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
	let $ = v === "pill", Ne = v === "ghost", Pe = a(fe), Fe = U?.label ?? _ ?? "", Ie = !U, Le = /* @__PURE__ */ h("button", {
		"data-ui-part": "",
		...F,
		ref: W,
		id: B,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? ve : void 0,
		"aria-activedescendant": G && K >= 0 ? `${ve}-opt-${K}` : void 0,
		"aria-invalid": R,
		disabled: S,
		value: H,
		"data-value": H,
		"data-testid": O,
		"data-ui-control": "select",
		"data-ui-size": L,
		"data-variant": v,
		onClick: (e) => {
			F.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", z ? "border-danger text-danger-fg bg-danger-bg" : e(r[Pe], o[Pe], i[Pe]), ce[L]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", z && "border-danger", y[L]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", z ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", y[L]), w, C),
		children: [T ? /* @__PURE__ */ m("span", {
			className: e("inline-flex min-w-0 items-center gap-2", !Ne && !$ && "flex-1"),
			children: T(U)
		}) : /* @__PURE__ */ h(ie, { children: [U?.icon && /* @__PURE__ */ m("span", {
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: U.icon
		}), /* @__PURE__ */ m("span", {
			className: e("min-w-0 truncate", !Ne && !$ && "flex-1", Ie && !$ && "text-text-tertiary"),
			children: Fe || "\xA0"
		})] }), /* @__PURE__ */ m(de, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? ae(/* @__PURE__ */ m("ul", {
		ref: xe,
		id: ve,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? B,
		"data-ui-listbox": "select",
		"data-testid": O ? `${O}-listbox` : void 0,
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
		children: V.map((t) => {
			let n = t.group !== void 0 && t.group !== Re ? t.group : null;
			Re = t.group;
			let r = t.value === H;
			return [n !== null && /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary",
				children: n
			}, `g-${t.index}`), /* @__PURE__ */ h("li", {
				id: `${ve}-opt-${t.index}`,
				role: "option",
				"aria-selected": r,
				"aria-disabled": t.disabled || void 0,
				"data-ui-option": "",
				"data-option-index": t.index,
				"data-value": t.value,
				onMouseDown: (e) => {
					e.preventDefault(), t.disabled || (X(t.value), Q(), W.current?.focus());
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
		N !== void 0 && /* @__PURE__ */ m("input", {
			"data-ui-part": "",
			type: "hidden",
			name: N,
			value: H
		}),
		ze
	] });
});
//#endregion
export { se as n, fe as t };
