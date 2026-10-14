import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-uREUOWUk.js";
import { c as r, l as i, m as a, n as o, p as s, t as c } from "./overlayStack-C0EBgmzL.js";
import { forwardRef as l, useCallback as u, useEffect as d, useId as ee, useImperativeHandle as te, useLayoutEffect as ne, useMemo as re, useRef as f, useState as p } from "react";
import { Fragment as ie, jsx as m, jsxs as h } from "react/jsx-runtime";
import { createPortal as ae } from "react-dom";
//#region src/components/shared/Combobox.tsx
var oe = {
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
	let { options: n, placeholder: r, size: i = "sm", disabled: a, allowCustom: s, maxOptions: c = 8, emptyMessage: l = "No matches", filter: u, onQueryChange: te, className: ne, "data-testid": ae, id: ce, invalid: le, "aria-describedby": ue, "aria-invalid": de, "aria-required": fe } = t, pe = t.showToggle ?? !t.multiple, _ = le || de === !0, v = f(null), y = ee(), me = `${y}-list`, b = f(null), [x, S] = p(""), [C, w] = p(!1), [T, E] = p(-1), D = t.multiple ? t.value : t.value ? [t.value] : [], O = (e) => n.find((t) => t.value === e)?.label ?? e, k = re(() => {
		let e = x.trim().toLowerCase(), t = u ?? se;
		return n.filter((n) => !e || t(n, e)).slice(0, c);
	}, [
		n,
		x,
		u,
		c
	]), A = C && (k.length > 0 || x.trim().length > 0), j = () => {
		if (a) return;
		let e = D[0] ? k.findIndex((e) => e.value === D[0]) : -1;
		w(!0), E(e >= 0 ? e : k.length ? 0 : -1);
	}, M = (e) => {
		S(e), te?.(e);
	}, N = () => {
		w(!1), E(-1);
	}, P = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), M(""), E(-1);
		} else t.onChange(e), M(""), N();
	};
	d(() => {
		if (!C) return;
		let e = (e) => {
			b.current?.contains(e.target) || N();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [C]);
	let he = (e) => {
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
				t && !t.disabled ? (e.preventDefault(), P(t.value)) : s && x.trim() && (e.preventDefault(), P(x.trim()));
				break;
			}
			case "Escape":
				C && (e.stopPropagation(), N());
				break;
			case "Backspace": t.multiple && !x && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, ge = t.multiple || x || C ? x : D[0] ? O(D[0]) : "", F = !t.multiple && !x && !C && D[0] ? t.leading : void 0;
	return /* @__PURE__ */ h("div", {
		ref: b,
		className: e("relative min-w-0", ne),
		"data-testid": ae,
		"data-ui-control": "combobox",
		children: [/* @__PURE__ */ h("div", {
			className: e("flex flex-wrap items-center gap-1 rounded-md border bg-surface px-2 py-0.5", _ ? "border-danger focus-within:border-danger" : "border-border-field focus-within:border-primary", oe[i], a && "opacity-60"),
			children: [
				t.multiple && t.value.map((e) => /* @__PURE__ */ m(o, {
					size: "xs",
					tone: "accent",
					onRemove: a ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
					children: O(e)
				}, e)),
				F && /* @__PURE__ */ m("span", {
					className: "flex shrink-0 items-center",
					"data-combobox-leading": "",
					children: F
				}),
				/* @__PURE__ */ m("input", {
					ref: v,
					id: ce,
					role: "combobox",
					"aria-label": t["aria-label"],
					"aria-describedby": ue,
					"aria-invalid": _ || void 0,
					"aria-required": fe,
					"aria-expanded": A,
					"aria-controls": me,
					"aria-autocomplete": "list",
					"aria-activedescendant": A && T >= 0 ? `${y}-opt-${T}` : void 0,
					disabled: a,
					value: ge,
					placeholder: t.multiple && t.value.length ? void 0 : !t.multiple && C && D[0] ? O(D[0]) : r,
					onChange: (e) => {
						M(e.target.value), w(!0), E(-1);
					},
					onKeyDown: he,
					onClick: () => {
						C || j();
					},
					className: "min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
				}),
				pe && /* @__PURE__ */ m("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": C ? "Close options" : "Show options",
					disabled: a,
					onMouseDown: (e) => {
						e.preventDefault(), C ? N() : (v.current?.focus(), j());
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
						children: /* @__PURE__ */ m("path", { d: C ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4" })
					})
				})
			]
		}), A && /* @__PURE__ */ m("ul", {
			id: me,
			role: "listbox",
			"data-ui-listbox": "combobox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: k.length === 0 ? /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-xs text-text-tertiary",
				children: s ? `Press Enter to use "${x.trim()}"` : l
			}) : k.map((t, n) => {
				let r = D.includes(t.value);
				return /* @__PURE__ */ m("li", {
					id: `${y}-opt-${n}`,
					role: "option",
					"aria-selected": r,
					"aria-disabled": t.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), t.disabled || P(t.value);
					},
					onMouseEnter: () => E(n),
					className: e("flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5", g[i], n === T ? "bg-primary-bg text-primary-fg" : r ? "font-semibold text-text-primary" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
var le = {
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
var _ = 8, v = 4, y = l(function(t, o) {
	let { options: l, groups: oe, placeholder: g, size: se, variant: y = "default", tone: me = "neutral", invalid: b = !1, disabled: x = !1, className: S, wrapperClassName: C, chevron: w, renderValue: T, searchable: E, searchPlaceholder: D, native: O, "data-testid": k, "aria-invalid": A, value: j, defaultValue: M, onChange: N, name: P, id: he, onKeyDown: ge, ...F } = t, _e = n(), I = se ?? (_e === "compact" ? "sm" : "md"), L = A ?? (b || void 0), R = b || L === !0 || L === "true", ve = ee(), z = he ?? `${ve}-select`, B = `${ve}-listbox`, V = re(() => {
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
	}, [l, oe]), [ye, be] = p(() => M == null ? "" : String(M)), H = j == null ? ye : String(j), U = V.find((e) => e.value === H), W = f(null), xe = f(null);
	te(o, () => W.current);
	let [G, Se] = p(!1), [K, q] = p(-1), [J, Ce] = p(null), Y = f({
		text: "",
		at: 0
	}), we = c(G), X = u((e) => {
		j ?? be(e), e !== H && N?.(fe(e, P, W.current));
	}, [
		j,
		H,
		N,
		P
	]), Te = f(X);
	Te.current = X, d(() => {
		let e = W.current;
		if (!e) return;
		let t = () => {
			Te.current(e.value);
		};
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [E, O]);
	let Z = (e) => e >= 0 && e < V.length && !V[e].disabled, Ee = (e, t) => {
		for (let n = e + t; n >= 0 && n < V.length; n += t) if (Z(n)) return n;
		return e;
	}, De = () => Ee(-1, 1), Oe = () => Ee(V.length, -1), ke = (e) => {
		x || V.length === 0 || (Se(!0), q(e ?? (U && !U.disabled ? U.index : De())));
	}, Q = () => {
		Se(!1), q(-1), Ce(null), Y.current = {
			text: "",
			at: 0
		};
	}, Ae = u(() => {
		let e = W.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = window.innerWidth, r = window.innerHeight, i = xe.current?.scrollHeight ?? 240, a = r - t.bottom - v - _, o = t.top - v - _, s = a < Math.min(i, 240) && o > a, c = Math.max(96, Math.min(320, s ? o : a)), l = Math.min(i, c), u = Math.min(Math.max(t.width, 160), n - 16), d = Math.min(Math.max(_, t.left), n - u - _), ee = s ? t.top - v - l : t.bottom + v;
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
		if (ge?.(e), e.defaultPrevented || x) return;
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
	if (E) return /* @__PURE__ */ m(ce, {
		id: z,
		size: I,
		value: H,
		onChange: (e) => X(e),
		disabled: x,
		invalid: R,
		"aria-label": t["aria-label"],
		"aria-describedby": t["aria-describedby"],
		"aria-required": t["aria-required"] === !0 || t["aria-required"] === "true" || void 0,
		placeholder: g ?? D ?? "Search",
		maxOptions: Math.max(8, V.length),
		options: V.map((e) => ({
			value: e.value,
			label: e.label,
			description: e.description,
			meta: e.group,
			disabled: e.disabled
		})),
		className: e(S, C),
		"data-testid": k
	});
	if (O) return /* @__PURE__ */ h("select", {
		id: z,
		name: P,
		disabled: x,
		"data-testid": k,
		"data-ui-native-select": "",
		"data-ui-native-reason": O.reason,
		"aria-invalid": L,
		value: H,
		onChange: (e) => X(e.target.value),
		className: e("w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none", "focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50", R ? "border-danger" : "border-border-emphasis", le[I], S),
		...F,
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
	let $ = y === "pill", Ne = y === "ghost", Pe = a(me), Fe = U?.label ?? g ?? "", Ie = !U, Le = /* @__PURE__ */ h("button", {
		...F,
		ref: W,
		id: z,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": G,
		"aria-controls": G ? B : void 0,
		"aria-activedescendant": G && K >= 0 ? `${B}-opt-${K}` : void 0,
		"aria-invalid": L,
		disabled: x,
		value: H,
		"data-value": H,
		"data-testid": k,
		"data-ui-control": "select",
		"data-variant": y,
		onClick: (e) => {
			F.onClick?.(e), G ? Q() : ke();
		},
		onKeyDown: Me,
		className: e("inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer", "disabled:cursor-not-allowed disabled:opacity-50", $ ? e("w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40", R ? "border-danger text-danger-fg bg-danger-bg" : e(i[Pe], r[Pe], s[Pe]), ue[I]) : Ne ? e("w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary", "hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40", R && "border-danger", le[I]) : e("w-full justify-between rounded-md border bg-surface-panel text-text-primary", "focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover", G && "border-info ring-1 ring-info/40", R ? "border-danger focus-visible:border-danger focus-visible:ring-danger/40" : !G && "border-border-emphasis", le[I]), C, S),
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
		})] }), /* @__PURE__ */ m(pe, {
			open: G,
			className: $ ? void 0 : "text-text-secondary"
		})]
	}), Re, ze = G && typeof document < "u" ? ae(/* @__PURE__ */ m("ul", {
		ref: xe,
		id: B,
		role: "listbox",
		"aria-labelledby": t["aria-labelledby"] ?? z,
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
		children: V.map((t) => {
			let n = t.group !== void 0 && t.group !== Re ? t.group : null;
			Re = t.group;
			let r = t.value === H;
			return [n !== null && /* @__PURE__ */ m("li", {
				role: "presentation",
				className: "px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary",
				children: n
			}, `g-${t.index}`), /* @__PURE__ */ h("li", {
				id: `${B}-opt-${t.index}`,
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
				className: e("flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5", de[I], t.index === K ? "bg-primary-bg text-primary-fg" : "text-text-primary", t.disabled && "cursor-not-allowed opacity-50"),
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
			value: H
		}),
		ze
	] });
});
//#endregion
export { ce as n, y as t };
