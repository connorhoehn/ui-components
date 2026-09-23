import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./InlinePopover-DtYo8_ZC.js";
import { useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/ui/Icons.tsx
function l(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		...t
	};
}
function u({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M8 3.5v9M3.5 8h9" })
	});
}
function d({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M4 4l8 8M12 4l-8 8" })
	});
}
function f({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" })
	});
}
function p({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 10H7l-3 3v-3H4a1.5 1.5 0 0 1-1.5-1.5z" }), /* @__PURE__ */ s("path", { d: "M5.5 5.5h5M5.5 7.5h3" })]
	});
}
function m({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("circle", {
			cx: "7",
			cy: "7",
			r: "4.5"
		}), /* @__PURE__ */ s("path", { d: "M10.5 10.5 14 14" })]
	});
}
function h({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" })
	});
}
function g({ size: e = 16, dir: t = "down", ...n }) {
	let r = t === "down" ? "M4 6l4 4 4-4" : t === "up" ? "M4 10l4-4 4 4" : t === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4";
	return /* @__PURE__ */ s("svg", {
		...l(e, n),
		children: /* @__PURE__ */ s("path", { d: r })
	});
}
function _({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("circle", {
			cx: "8",
			cy: "8",
			r: "5.5"
		}), /* @__PURE__ */ s("path", { d: "M8 5v3l2 1.5" })]
	});
}
function v({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }), /* @__PURE__ */ s("path", { d: "M9.5 2v3.5H13M6 9h4M6 11.5h4" })]
	});
}
function y({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("rect", {
				x: "2",
				y: "3",
				width: "12",
				height: "9",
				rx: "1.5"
			}),
			/* @__PURE__ */ s("rect", {
				x: "4.25",
				y: "5.5",
				width: "3.5",
				height: "2.75",
				rx: "0.5"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "11",
				cy: "9.25",
				r: "1.5"
			}),
			/* @__PURE__ */ s("path", { d: "M7.75 6.875H9.5" })
		]
	});
}
function b({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" }),
			/* @__PURE__ */ s("path", { d: "M9.5 2.5H13.5V6.5" }),
			/* @__PURE__ */ s("path", { d: "M13.5 2.5 7.5 8.5" })
		]
	});
}
function x({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M11.5 2.5 13.5 4.5 5.5 12.5H3.5V10.5z" }), /* @__PURE__ */ s("path", { d: "M10 4l2 2" })]
	});
}
function S({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M3 4.5h10" }),
			/* @__PURE__ */ s("path", { d: "M6.5 4.5V3h3v1.5" }),
			/* @__PURE__ */ s("path", { d: "M4.5 4.5 5 13h6l.5-8.5" }),
			/* @__PURE__ */ s("path", { d: "M7 7v4M9 7v4" })
		]
	});
}
function C({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M5.5 2h5" }),
			/* @__PURE__ */ s("path", { d: "M6.5 2v3.5L5 8.5h6L9.5 5.5V2" }),
			/* @__PURE__ */ s("path", { d: "M8 8.5V14" })
		]
	});
}
function w({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M2 4.5a1 1 0 0 1 1-1h3l1.5 2H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" })
	});
}
function ee({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M4.6 11.5h6.8l-.8-1.4V7a2.7 2.7 0 0 0-4.2-2.2" }),
			/* @__PURE__ */ s("path", { d: "M5.3 6.3V7v3.1l-.7 1.4" }),
			/* @__PURE__ */ s("path", { d: "M6.9 13.2a1.2 1.2 0 0 0 2.2 0" }),
			/* @__PURE__ */ s("path", { d: "M2.5 2.5 13.5 13.5" })
		]
	});
}
function te({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("rect", {
			x: "3.5",
			y: "7.5",
			width: "9",
			height: "6",
			rx: "1.2"
		}), /* @__PURE__ */ s("path", { d: "M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" })]
	});
}
function ne({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M3 4.5v3a3 3 0 0 0 3 3h6.5" }), /* @__PURE__ */ s("path", { d: "M10 8.2l2.8 2.3L10 12.8" })]
	});
}
function re({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M1.8 8s2.4-4 6.2-4 6.2 4 6.2 4-2.4 4-6.2 4S1.8 8 1.8 8z" }), /* @__PURE__ */ s("circle", {
			cx: "8",
			cy: "8",
			r: "1.8"
		})]
	});
}
function T({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M2.3 4.6C3.6 6 5.6 7.2 8 7.2s4.4-1.2 5.7-2.6M2.3 11.4c.6-.66 1.28-1.24 2.02-1.72M13.7 11.4a11 11 0 0 1-2.02-1.72M6.3 12.6c.55.13 1.12.2 1.7.2s1.15-.07 1.7-.2" }), /* @__PURE__ */ s("path", { d: "M2 2l12 12" })]
	});
}
function E({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M5.2 2.8 3.4 4.6c-.5.5-.6 1.3-.2 1.9a15 15 0 0 0 6.3 6.3c.6.4 1.4.3 1.9-.2l1.8-1.8-2.6-1.7-1.3 1a11 11 0 0 1-3.4-3.4l1-1.3z" })
	});
}
function D({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("rect", {
			x: "2",
			y: "4.5",
			width: "8.5",
			height: "7",
			rx: "1.5"
		}), /* @__PURE__ */ s("path", { d: "M10.5 8.2 14 6.2v3.6l-3.5-2z" })]
	});
}
function O({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M8.5 2 4 9h3.2l-.7 5L12 7H8.8z" })
	});
}
function k({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("circle", {
			cx: "8",
			cy: "8.3",
			r: "2.8"
		}), /* @__PURE__ */ s("path", { d: "M10.8 8.3v.9a1.9 1.9 0 0 0 3.7 0V8a6.5 6.5 0 1 0-2.8 5.4" })]
	});
}
function A({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" })
	});
}
function j({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("circle", {
			cx: "8",
			cy: "8",
			r: "3"
		}), /* @__PURE__ */ s("path", { d: "M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" })]
	});
}
function M({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M2.5 4.5h11M2.5 8h11M2.5 11.5h11" })
	});
}
function N({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("rect", {
				x: "6",
				y: "1.75",
				width: "4",
				height: "7.5",
				rx: "2"
			}),
			/* @__PURE__ */ s("path", { d: "M3.5 7.5a4.5 4.5 0 0 0 9 0" }),
			/* @__PURE__ */ s("path", { d: "M8 12v2M5.5 14h5" })
		]
	});
}
function P({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("circle", {
				cx: "4.5",
				cy: "3.5",
				r: "1.5"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "4.5",
				cy: "12.5",
				r: "1.5"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "11.5",
				cy: "3.5",
				r: "1.5"
			}),
			/* @__PURE__ */ s("path", { d: "M4.5 5v6" }),
			/* @__PURE__ */ s("path", { d: "M11.5 5v1.5a3 3 0 0 1-3 3H4.5" })
		]
	});
}
function F({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M2.5 13.5h11" }), /* @__PURE__ */ s("path", { d: "M4.5 13.5V9M8 13.5V4M11.5 13.5V7" })]
	});
}
function I({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M5.5 5.5 2.5 8l3 2.5M10.5 5.5 13.5 8l-3 2.5M9.3 3.5 6.7 12.5" })
	});
}
function L({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M3.2 3.2H6.3a1.7 1.7 0 0 0 3.4 0H12.8V6.3a1.7 1.7 0 0 1 0 3.4V12.8H3.2z" })
	});
}
function R({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M3 7v-.5A3.5 3.5 0 0 1 6.5 3H12" }),
			/* @__PURE__ */ s("path", { d: "M10 1.5 12 3.5 10 5.5" }),
			/* @__PURE__ */ s("path", { d: "M13 9v.5a3.5 3.5 0 0 1-3.5 3.5H4" }),
			/* @__PURE__ */ s("path", { d: "M6 10.5 4 12.5 6 14.5" })
		]
	});
}
function z({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M14.3 7.4 8.2 13.5a4 4 0 0 1-5.7-5.7l6.2-6.1a2.7 2.7 0 0 1 3.8 3.8l-6.2 6.1a1.3 1.3 0 0 1-1.9-1.9l5.7-5.6" })
	});
}
function B({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("path", { d: "M6.8 11H5.5a3 3 0 0 1 0-6h1.3" }),
			/* @__PURE__ */ s("path", { d: "M9.2 5h1.3a3 3 0 0 1 0 6H9.2" }),
			/* @__PURE__ */ s("path", { d: "M6 8h4" })
		]
	});
}
function V({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M6.5 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" }), /* @__PURE__ */ s("path", { d: "M13 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" })]
	});
}
function H({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("circle", {
				cx: "8",
				cy: "8",
				r: "5.5"
			}),
			/* @__PURE__ */ s("path", { d: "M6.2 6.6h.01M9.8 6.6h.01" }),
			/* @__PURE__ */ s("path", { d: "M5.5 9.3c.6.9 1.5 1.4 2.5 1.4s1.9-.5 2.5-1.4" })
		]
	});
}
function U({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M13 4.5v3a3 3 0 0 1-3 3H3.5" }), /* @__PURE__ */ s("path", { d: "M6 8.2 3.2 10.5 6 12.8" })]
	});
}
function W({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("circle", {
				cx: "8",
				cy: "8",
				r: "6"
			}),
			/* @__PURE__ */ s("path", { d: "M8 7.2v3.6" }),
			/* @__PURE__ */ s("path", { d: "M8 5.1v.1" })
		]
	});
}
function G({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M3 8h10" }), /* @__PURE__ */ s("path", { d: "M9 4l4 4-4 4" })]
	});
}
function K({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [
			/* @__PURE__ */ s("circle", {
				cx: "6",
				cy: "5.5",
				r: "2.2"
			}),
			/* @__PURE__ */ s("path", { d: "M2 13c.4-2.2 2-3.5 4-3.5s3.6 1.3 4 3.5" }),
			/* @__PURE__ */ s("path", { d: "M10.3 3.6a2.2 2.2 0 0 1 0 4" }),
			/* @__PURE__ */ s("path", { d: "M11.3 9.7c1.4.4 2.4 1.6 2.7 3.3" })
		]
	});
}
function q({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, {
			...t,
			fill: "currentColor",
			stroke: "none"
		}),
		children: [
			/* @__PURE__ */ s("circle", {
				cx: "6",
				cy: "4",
				r: "1.1"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "10",
				cy: "4",
				r: "1.1"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "6",
				cy: "8",
				r: "1.1"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "10",
				cy: "8",
				r: "1.1"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "6",
				cy: "12",
				r: "1.1"
			}),
			/* @__PURE__ */ s("circle", {
				cx: "10",
				cy: "12",
				r: "1.1"
			})
		]
	});
}
function J({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M2.5 3.5h11l-4.2 5v4l-2.6 1.2V8.5z" })
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function Y({ trigger: r, triggerLabel: l = "Open menu", triggerTitle: u, triggerClassName: d, triggerTabIndex: f, triggerTestId: p, align: m = "start", sections: h, className: g, "data-testid": _ = "dropdown-menu" }) {
	let [v, y] = a(!1), b = i(null), x = i(null), S = n(() => y(!1), []), C = n((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = x.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
		ref: b,
		type: "button",
		"aria-label": l,
		"aria-haspopup": "menu",
		"aria-expanded": v,
		title: u,
		tabIndex: f,
		"data-testid": p,
		onClick: () => y((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", v && "bg-[var(--color-surface-hover)]", d),
		children: r
	}), /* @__PURE__ */ s(t, {
		trigger: b,
		open: v,
		onClose: S,
		placement: m === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", g),
		"data-testid": _,
		children: /* @__PURE__ */ s("div", {
			ref: x,
			role: "menu",
			"aria-label": l,
			onKeyDown: C,
			className: "py-1 uic-menu-scroll",
			children: h.map((e, t) => /* @__PURE__ */ c("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ s("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ s("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ s($, {
						item: e,
						close: S,
						testId: _
					}, t))
				]
			}, t))
		})
	})] });
}
var X = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function Z(e, t = !1) {
	return e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : e.active || t ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function Q({ item: e }) {
	return /* @__PURE__ */ c(o, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ s("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ s("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ c("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ s("span", {
				className: "truncate",
				children: e.label
			}), e.description && /* @__PURE__ */ s("span", {
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: e.description
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ s("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ s(g, {
			dir: "right",
			size: 14,
			className: "shrink-0 text-[var(--color-text-tertiary)]"
		})
	] });
}
function $({ item: n, close: l, testId: u }) {
	let [d, f] = a(!1), p = i(null), m = i(null), h = i(null), g = () => {
		h.current &&= (clearTimeout(h.current), null);
	}, _ = () => {
		g(), h.current = setTimeout(() => f(!1), 180);
	};
	return r(() => () => g(), []), n.submenu ? /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
		ref: p,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": d,
		onMouseEnter: () => {
			g(), f(!0);
		},
		onMouseLeave: _,
		onClick: () => f(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(!0), setTimeout(() => m.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": n["data-testid"],
		className: e(X, Z(n, d)),
		children: /* @__PURE__ */ s(Q, { item: n })
	}), /* @__PURE__ */ s(t, {
		trigger: p,
		open: d,
		onClose: () => f(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${u}-submenu`,
		children: /* @__PURE__ */ s("div", {
			ref: m,
			role: "menu",
			"aria-label": n.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: g,
			onMouseLeave: _,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), f(!1), p.current?.focus());
			},
			children: n.submenu.map((e, t) => /* @__PURE__ */ c("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ s("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ s("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ s($, {
						item: e,
						close: l,
						testId: u
					}, t))
				]
			}, t))
		})
	})] }) : /* @__PURE__ */ s("button", {
		type: "button",
		role: n.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": n.checked === void 0 ? void 0 : n.checked,
		"aria-current": n.active || void 0,
		onClick: () => {
			n.onSelect?.(), l();
		},
		"data-testid": n["data-testid"],
		className: e(X, Z(n)),
		children: /* @__PURE__ */ s(Q, { item: n })
	});
}
//#endregion
export { C as A, j as B, B as C, z as D, A as E, R as F, S as H, U as I, m as L, b as M, L as N, K as O, V as P, h as R, W as S, M as T, D as U, N as V, y as W, J as _, ee as a, q as b, f as c, I as d, p as f, T as g, re as h, k as i, u as j, E as k, g as l, x as m, O as n, P as o, v as p, G as r, F as s, Y as t, d as u, w as v, te as w, _ as x, ne as y, H as z };
