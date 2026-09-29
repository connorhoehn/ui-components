import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, t as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./IconButton-DDeXW3mZ.js";
import { b as i } from "./Icons-CCn6EnUZ.js";
import { n as a, r as o, t as s } from "./focusTrap-C5l9cvTe.js";
import { useEffect as c, useId as l, useRef as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
import { createPortal as m } from "react-dom";
//#region src/components/shared/TechnicalDetails.tsx
function h({ text: t, label: n = "Show technical details", hideLabel: r = "Hide technical details", defaultOpen: i = !1, className: a, testId: o = "technical-details" }) {
	let [s, u] = d(i), [m, h] = d(!1), g = l();
	c(() => {
		if (!m) return;
		let e = setTimeout(() => h(!1), 1600);
		return () => clearTimeout(e);
	}, [m]);
	let _ = typeof t == "string" ? t.trim() : "";
	return _ ? /* @__PURE__ */ p("div", {
		className: e("flex flex-col gap-1.5", a),
		"data-testid": o,
		children: [/* @__PURE__ */ p("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ f("button", {
				type: "button",
				onClick: () => u((e) => !e),
				"aria-expanded": s,
				"aria-controls": g,
				"data-testid": `${o}-toggle`,
				className: e("self-start text-[11px] font-medium text-text-tertiary", "underline decoration-dotted underline-offset-2", "bg-transparent border-none p-0 cursor-pointer", "hover:text-text-secondary"),
				children: s ? r : n
			}), s && /* @__PURE__ */ f("button", {
				type: "button",
				onClick: () => {
					try {
						navigator.clipboard?.writeText(_).then(() => h(!0), () => {});
					} catch {}
				},
				"data-testid": `${o}-copy`,
				className: e("text-[11px] font-medium text-text-tertiary", "bg-transparent border-none p-0 cursor-pointer hover:text-text-secondary"),
				children: m ? "Copied" : "Copy"
			})]
		}), s && /* @__PURE__ */ f("pre", {
			id: g,
			"data-testid": `${o}-text`,
			className: e("m-0 max-h-40 overflow-auto rounded-md", "bg-surface-panel border border-border", "px-2 py-1.5 text-[11px] leading-snug text-text-secondary", "font-mono whitespace-pre-wrap break-words select-text"),
			children: _
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/EditableHeading.tsx
var g = {
	md: "text-base",
	lg: "text-xl"
};
function _({ value: t, onCommit: n, placeholder: a, size: o = "md", readOnly: s = !1, editLabel: l = "Rename", className: m, "data-testid": h = "editable-heading" }) {
	let [_, v] = d(!1), [y, b] = d(t), x = u(null);
	c(() => {
		_ || b(t);
	}, [t, _]), c(() => {
		_ && (x.current?.focus(), x.current?.select());
	}, [_]);
	let S = () => {
		let e = y.trim();
		if (v(!1), !e || e === t) {
			b(t);
			return;
		}
		n(e);
	};
	return _ ? /* @__PURE__ */ f("input", {
		ref: x,
		value: y,
		placeholder: a,
		"aria-label": l,
		onChange: (e) => b(e.target.value),
		onBlur: S,
		onKeyDown: (e) => {
			e.key === "Enter" ? (e.preventDefault(), S()) : e.key === "Escape" && (e.preventDefault(), b(t), v(!1));
		},
		"data-testid": h,
		"data-editing": "true",
		className: e("w-full min-w-0 rounded-md border border-border-field bg-surface px-2 py-1 font-semibold text-text-primary outline-none", "focus:border-primary focus:ring-2 focus:ring-primary/20", g[o], m)
	}) : /* @__PURE__ */ p("div", {
		className: e("flex min-w-0 items-center gap-1.5", m),
		"data-testid": h,
		"data-editing": "false",
		children: [/* @__PURE__ */ f("span", {
			className: e("min-w-0 truncate font-semibold text-text-primary", g[o], !s && "cursor-text"),
			onClick: s ? void 0 : () => v(!0),
			title: t,
			children: t || a
		}), !s && /* @__PURE__ */ f(r, {
			"aria-label": l,
			title: l,
			size: "sm",
			onClick: () => v(!0),
			"data-testid": `${h}-edit`,
			className: "shrink-0 text-text-secondary hover:text-text-primary",
			icon: /* @__PURE__ */ f(i, { size: 15 })
		})]
	});
}
//#endregion
//#region src/components/shared/PermissionDeniedCard.tsx
var v = {
	camera: "Camera",
	microphone: "Microphone",
	screen: "Screen sharing"
}, y = {
	denied: (e) => `${v[e]} access blocked`,
	blocked: (e) => `${v[e]} is in use`,
	"no-device": (e) => e === "screen" ? "Screen sharing not supported" : `No ${e} detected`,
	unavailable: (e) => `${v[e]} unavailable`
}, b = {
	denied: (e) => `${v[e]} access was blocked. Click the icon in your browser's address bar to allow it.`,
	blocked: (e) => `${v[e]} is being used by another application. Close other tabs or apps using it and try again.`,
	"no-device": (e) => `No ${e === "screen" ? "screen sharing capability" : e} was found on this device.`,
	unavailable: () => "This browser doesn't support the requested device access."
};
function x({ kind: e }) {
	return e === "camera" ? /* @__PURE__ */ p("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ f("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ f("path", { d: "m22 8-6 4 6 4V8Z" }),
			/* @__PURE__ */ f("path", { d: "M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" }),
			/* @__PURE__ */ f("path", { d: "M2 6.5v9a2 2 0 0 0 2 2h7" })
		]
	}) : e === "microphone" ? /* @__PURE__ */ p("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ f("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ f("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ f("path", { d: "M15 9.34V5a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ f("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2" }),
			/* @__PURE__ */ f("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}) : /* @__PURE__ */ p("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ f("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ f("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ f("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ f("line", {
				x1: "3",
				y1: "9",
				x2: "21",
				y2: "9"
			})
		]
	});
}
function S({ kind: n, state: r, message: i, onRetry: a, retryLabel: o = "Try again", icon: s, className: c, "data-testid": l }) {
	return /* @__PURE__ */ p("div", {
		"data-testid": l,
		"data-permission-kind": n,
		"data-permission-state": r,
		className: e("flex flex-col items-center text-center gap-3 p-6 max-w-sm", c),
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ f("div", {
				className: "h-10 w-10 rounded-full bg-warning-bg text-warning-fg grid place-items-center",
				children: s ?? /* @__PURE__ */ f(x, { kind: n })
			}),
			/* @__PURE__ */ f("div", {
				className: "text-base font-semibold text-text-primary",
				children: (y[r] ?? y.unavailable)(n)
			}),
			/* @__PURE__ */ f("p", {
				className: "text-xs text-text-secondary",
				children: i ?? (b[r] ?? b.unavailable)(n)
			}),
			a && /* @__PURE__ */ f(t, {
				variant: "ghost",
				size: "sm",
				onClick: a,
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
function C({ open: t, onClose: r, title: i, subtitle: d, width: h, children: g, footer: _, docked: v = !1, actions: y, className: b, bodyClassName: x, headerClassName: S, titleClassName: C, footerClassName: w, closeTestId: T, "aria-label": E, "data-testid": D, closeLabel: O = "Close", modal: k = !0, trapFocus: A = !0, backdrop: j = !0 }) {
	let M = u(null), N = u(null), P = l(), F = k && !v, I = n(t && !v), L = h ?? (v ? void 0 : 460);
	if (c(() => {
		if (!t || v) return;
		let e = (e) => {
			if (e.key === "Escape") {
				F && I() && r();
				return;
			}
			A && I() && o(e, M.current);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		r,
		I,
		v,
		F,
		A
	]), c(() => {
		if (!(!t || v || !A)) return N.current = typeof document < "u" ? document.activeElement : null, s(M.current), () => {
			a(N.current), N.current = null;
		};
	}, [
		t,
		v,
		A
	]), !t) return null;
	let R = !!(i || d || y), z = /* @__PURE__ */ p("div", {
		className: e("flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", S),
		children: [/* @__PURE__ */ p("div", {
			className: "min-w-0",
			children: [i && /* @__PURE__ */ f("h2", {
				id: P,
				className: e("text-base font-semibold text-[var(--color-text-primary)]", C),
				children: i
			}), d && /* @__PURE__ */ f("p", {
				className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
				children: d
			})]
		}), /* @__PURE__ */ p("div", {
			className: "ml-4 flex flex-shrink-0 items-center gap-1",
			children: [y, /* @__PURE__ */ f("button", {
				type: "button",
				onClick: r,
				"data-testid": T,
				className: "flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
				"aria-label": O,
				children: /* @__PURE__ */ f("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					children: /* @__PURE__ */ f("path", {
						d: "M4 4l8 8M12 4l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})]
		})]
	}), B = /* @__PURE__ */ f("div", {
		className: e("flex-1 overflow-y-auto p-5", x),
		children: g
	}), V = _ ? /* @__PURE__ */ f("div", {
		className: e("flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", w),
		children: _
	}) : null;
	return v ? /* @__PURE__ */ p("aside", {
		ref: M,
		role: "complementary",
		"aria-labelledby": i ? P : void 0,
		"aria-label": i ? void 0 : E,
		"data-testid": D,
		"data-docked": "true",
		className: e("relative flex h-full min-h-0 max-w-full flex-shrink-0 flex-col overflow-hidden", "bg-surface border-l border-[var(--color-border)]", L === void 0 && "w-full", b),
		...L === void 0 ? {} : { style: { width: L } },
		children: [
			R && z,
			B,
			V
		]
	}) : m(/* @__PURE__ */ p("div", {
		className: e("fixed inset-0 z-[9000]", !j && "pointer-events-none"),
		"data-testid": D,
		children: [j && /* @__PURE__ */ f("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: r,
			"aria-hidden": "true"
		}), /* @__PURE__ */ p("aside", {
			ref: M,
			role: F ? "dialog" : "complementary",
			"aria-modal": F ? "true" : void 0,
			"aria-labelledby": i ? P : void 0,
			"aria-label": i ? void 0 : E,
			className: e("absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col", "transition-transform duration-200", !j && "pointer-events-auto", t ? "translate-x-0" : "translate-x-full", b),
			style: { width: L },
			children: [
				R && z,
				B,
				V
			]
		})]
	}), document.body);
}
//#endregion
export { h as i, S as n, _ as r, C as t };
