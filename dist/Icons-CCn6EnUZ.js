import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/components/ui/Icons.tsx
function n(e, t) {
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
function r({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M8 3.5v9M3.5 8h9" })
	});
}
function i({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M4 4l8 8M12 4l-8 8" })
	});
}
function a({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" })
	});
}
function ee({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 10H7l-3 3v-3H4a1.5 1.5 0 0 1-1.5-1.5z" }), /* @__PURE__ */ e("path", { d: "M5.5 5.5h5M5.5 7.5h3" })]
	});
}
function o({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "7",
			cy: "7",
			r: "4.5"
		}), /* @__PURE__ */ e("path", { d: "M10.5 10.5 14 14" })]
	});
}
function s({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" })
	});
}
function c({ size: t = 16, dir: r = "down", ...i }) {
	let a = r === "down" ? "M4 6l4 4 4-4" : r === "up" ? "M4 10l4-4 4 4" : r === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4";
	return /* @__PURE__ */ e("svg", {
		...n(t, i),
		children: /* @__PURE__ */ e("path", { d: a })
	});
}
function l({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8",
			r: "5.5"
		}), /* @__PURE__ */ e("path", { d: "M8 5v3l2 1.5" })]
	});
}
function u({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }), /* @__PURE__ */ e("path", { d: "M9.5 2v3.5H13M6 9h4M6 11.5h4" })]
	});
}
function d({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("rect", {
				x: "2",
				y: "3",
				width: "12",
				height: "9",
				rx: "1.5"
			}),
			/* @__PURE__ */ e("rect", {
				x: "4.25",
				y: "5.5",
				width: "3.5",
				height: "2.75",
				rx: "0.5"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "11",
				cy: "9.25",
				r: "1.5"
			}),
			/* @__PURE__ */ e("path", { d: "M7.75 6.875H9.5" })
		]
	});
}
function f({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" }),
			/* @__PURE__ */ e("path", { d: "M9.5 2.5H13.5V6.5" }),
			/* @__PURE__ */ e("path", { d: "M13.5 2.5 7.5 8.5" })
		]
	});
}
function p({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M11.5 2.5 13.5 4.5 5.5 12.5H3.5V10.5z" }), /* @__PURE__ */ e("path", { d: "M10 4l2 2" })]
	});
}
function m({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M3 4.5h10" }),
			/* @__PURE__ */ e("path", { d: "M6.5 4.5V3h3v1.5" }),
			/* @__PURE__ */ e("path", { d: "M4.5 4.5 5 13h6l.5-8.5" }),
			/* @__PURE__ */ e("path", { d: "M7 7v4M9 7v4" })
		]
	});
}
function h({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M5.5 2h5" }),
			/* @__PURE__ */ e("path", { d: "M6.5 2v3.5L5 8.5h6L9.5 5.5V2" }),
			/* @__PURE__ */ e("path", { d: "M8 8.5V14" })
		]
	});
}
function g({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M2 4.5a1 1 0 0 1 1-1h3l1.5 2H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" })
	});
}
function _({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M4.6 11.5h6.8l-.8-1.4V7a2.7 2.7 0 0 0-4.2-2.2" }),
			/* @__PURE__ */ e("path", { d: "M5.3 6.3V7v3.1l-.7 1.4" }),
			/* @__PURE__ */ e("path", { d: "M6.9 13.2a1.2 1.2 0 0 0 2.2 0" }),
			/* @__PURE__ */ e("path", { d: "M2.5 2.5 13.5 13.5" })
		]
	});
}
function v({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("rect", {
			x: "3.5",
			y: "7.5",
			width: "9",
			height: "6",
			rx: "1.2"
		}), /* @__PURE__ */ e("path", { d: "M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" })]
	});
}
function y({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M3 4.5v3a3 3 0 0 0 3 3h6.5" }), /* @__PURE__ */ e("path", { d: "M10 8.2l2.8 2.3L10 12.8" })]
	});
}
function b({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M1.8 8s2.4-4 6.2-4 6.2 4 6.2 4-2.4 4-6.2 4S1.8 8 1.8 8z" }), /* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8",
			r: "1.8"
		})]
	});
}
function x({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M2.3 4.6C3.6 6 5.6 7.2 8 7.2s4.4-1.2 5.7-2.6M2.3 11.4c.6-.66 1.28-1.24 2.02-1.72M13.7 11.4a11 11 0 0 1-2.02-1.72M6.3 12.6c.55.13 1.12.2 1.7.2s1.15-.07 1.7-.2" }), /* @__PURE__ */ e("path", { d: "M2 2l12 12" })]
	});
}
function S({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M5.2 2.8 3.4 4.6c-.5.5-.6 1.3-.2 1.9a15 15 0 0 0 6.3 6.3c.6.4 1.4.3 1.9-.2l1.8-1.8-2.6-1.7-1.3 1a11 11 0 0 1-3.4-3.4l1-1.3z" })
	});
}
function C({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("rect", {
			x: "2",
			y: "4.5",
			width: "8.5",
			height: "7",
			rx: "1.5"
		}), /* @__PURE__ */ e("path", { d: "M10.5 8.2 14 6.2v3.6l-3.5-2z" })]
	});
}
function w({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M8.5 2 4 9h3.2l-.7 5L12 7H8.8z" })
	});
}
function T({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8.3",
			r: "2.8"
		}), /* @__PURE__ */ e("path", { d: "M10.8 8.3v.9a1.9 1.9 0 0 0 3.7 0V8a6.5 6.5 0 1 0-2.8 5.4" })]
	});
}
function E({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" })
	});
}
function D({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8",
			r: "3"
		}), /* @__PURE__ */ e("path", { d: "M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" })]
	});
}
function O({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M2.5 4.5h11M2.5 8h11M2.5 11.5h11" })
	});
}
function k({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("rect", {
				x: "6",
				y: "1.75",
				width: "4",
				height: "7.5",
				rx: "2"
			}),
			/* @__PURE__ */ e("path", { d: "M3.5 7.5a4.5 4.5 0 0 0 9 0" }),
			/* @__PURE__ */ e("path", { d: "M8 12v2M5.5 14h5" })
		]
	});
}
function A({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "4.5",
				cy: "3.5",
				r: "1.5"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "4.5",
				cy: "12.5",
				r: "1.5"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "11.5",
				cy: "3.5",
				r: "1.5"
			}),
			/* @__PURE__ */ e("path", { d: "M4.5 5v6" }),
			/* @__PURE__ */ e("path", { d: "M11.5 5v1.5a3 3 0 0 1-3 3H4.5" })
		]
	});
}
function j({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.75"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "12.5",
				cy: "3.5",
				r: "1.75"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "12.5",
				cy: "12.5",
				r: "1.75"
			}),
			/* @__PURE__ */ e("path", { d: "M5.1 7.2 10.9 4.3M5.1 8.8l5.8 2.9M12.5 5.25v5.5" })
		]
	});
}
function M({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M2.5 13.5h11" }), /* @__PURE__ */ e("path", { d: "M4.5 13.5V9M8 13.5V4M11.5 13.5V7" })]
	});
}
function N({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M5.5 5.5 2.5 8l3 2.5M10.5 5.5 13.5 8l-3 2.5M9.3 3.5 6.7 12.5" })
	});
}
function P({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M3.2 3.2H6.3a1.7 1.7 0 0 0 3.4 0H12.8V6.3a1.7 1.7 0 0 1 0 3.4V12.8H3.2z" })
	});
}
function F({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M3 7v-.5A3.5 3.5 0 0 1 6.5 3H12" }),
			/* @__PURE__ */ e("path", { d: "M10 1.5 12 3.5 10 5.5" }),
			/* @__PURE__ */ e("path", { d: "M13 9v.5a3.5 3.5 0 0 1-3.5 3.5H4" }),
			/* @__PURE__ */ e("path", { d: "M6 10.5 4 12.5 6 14.5" })
		]
	});
}
function I({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M14.3 7.4 8.2 13.5a4 4 0 0 1-5.7-5.7l6.2-6.1a2.7 2.7 0 0 1 3.8 3.8l-6.2 6.1a1.3 1.3 0 0 1-1.9-1.9l5.7-5.6" })
	});
}
function L({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M6.8 11H5.5a3 3 0 0 1 0-6h1.3" }),
			/* @__PURE__ */ e("path", { d: "M9.2 5h1.3a3 3 0 0 1 0 6H9.2" }),
			/* @__PURE__ */ e("path", { d: "M6 8h4" })
		]
	});
}
function R({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M6.5 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" }), /* @__PURE__ */ e("path", { d: "M13 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" })]
	});
}
function z({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "8",
				cy: "8",
				r: "5.5"
			}),
			/* @__PURE__ */ e("path", { d: "M6.2 6.6h.01M9.8 6.6h.01" }),
			/* @__PURE__ */ e("path", { d: "M5.5 9.3c.6.9 1.5 1.4 2.5 1.4s1.9-.5 2.5-1.4" })
		]
	});
}
function B({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M13 4.5v3a3 3 0 0 1-3 3H3.5" }), /* @__PURE__ */ e("path", { d: "M6 8.2 3.2 10.5 6 12.8" })]
	});
}
function V({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "8",
				cy: "8",
				r: "6"
			}),
			/* @__PURE__ */ e("path", { d: "M8 7.2v3.6" }),
			/* @__PURE__ */ e("path", { d: "M8 5.1v.1" })
		]
	});
}
function te({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M3 8h10" }), /* @__PURE__ */ e("path", { d: "M9 4l4 4-4 4" })]
	});
}
function H({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M4.5 11.5 11.5 4.5" }), /* @__PURE__ */ e("path", { d: "M5.5 4.5h6v6" })]
	});
}
function U({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "5.5",
				r: "2.2"
			}),
			/* @__PURE__ */ e("path", { d: "M2 13c.4-2.2 2-3.5 4-3.5s3.6 1.3 4 3.5" }),
			/* @__PURE__ */ e("path", { d: "M10.3 3.6a2.2 2.2 0 0 1 0 4" }),
			/* @__PURE__ */ e("path", { d: "M11.3 9.7c1.4.4 2.4 1.6 2.7 3.3" })
		]
	});
}
function W({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "5.5",
			r: "2.5"
		}), /* @__PURE__ */ e("path", { d: "M3 13.5c.5-2.6 2.5-4.2 5-4.2s4.5 1.6 5 4.2" })]
	});
}
function G({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M8 13V3" }), /* @__PURE__ */ e("path", { d: "M4 7l4-4 4 4" })]
	});
}
function K({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, {
			...i,
			fill: "currentColor",
			stroke: "none"
		}),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "4",
				r: "1.1"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "10",
				cy: "4",
				r: "1.1"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "8",
				r: "1.1"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "10",
				cy: "8",
				r: "1.1"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "12",
				r: "1.1"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "10",
				cy: "12",
				r: "1.1"
			})
		]
	});
}
function q({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M2.5 3.5h11l-4.2 5v4l-2.6 1.2V8.5z" })
	});
}
function J({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M6 4h7.5M6 8h7.5M6 12h7.5" }), /* @__PURE__ */ e("path", {
			d: "M2.75 4h.01M2.75 8h.01M2.75 12h.01",
			strokeWidth: 2
		})]
	});
}
function Y({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M7 2.5 8.2 5.8 11.5 7 8.2 8.2 7 11.5 5.8 8.2 2.5 7 5.8 5.8z" }), /* @__PURE__ */ e("path", { d: "M12.5 10.5v3M11 12h3" })]
	});
}
function X({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M5.5 4 3 6.5 5.5 9" }), /* @__PURE__ */ e("path", { d: "M3 6.5h6.5a3.5 3.5 0 0 1 0 7H7" })]
	});
}
function Z({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M10.5 4 13 6.5 10.5 9" }), /* @__PURE__ */ e("path", { d: "M13 6.5H6.5a3.5 3.5 0 0 0 0 7H9" })]
	});
}
function Q({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("rect", {
				x: "2",
				y: "3",
				width: "12",
				height: "10",
				rx: "1.5"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "6.5",
				r: "1.1"
			}),
			/* @__PURE__ */ e("path", { d: "M14 10.5 10.8 7.8 5 13" })
		]
	});
}
function ne({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M6 4h8M6 8h8M6 12h8" }),
			/* @__PURE__ */ e("circle", {
				cx: "2.8",
				cy: "4",
				r: ".6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "2.8",
				cy: "8",
				r: ".6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "2.8",
				cy: "12",
				r: ".6",
				fill: "currentColor"
			})
		]
	});
}
function re({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M6.5 4h7.5M6.5 8h7.5M6.5 12h7.5" }),
			/* @__PURE__ */ e("path", {
				d: "M2.2 2.8 3.2 2.3v3.2",
				strokeWidth: 1.1
			}),
			/* @__PURE__ */ e("path", {
				d: "M2.2 7.2c.3-.5 1.8-.6 1.8.3 0 .7-1.8 1.3-1.8 2h1.9",
				strokeWidth: 1.1
			}),
			/* @__PURE__ */ e("path", {
				d: "M2.2 11h1.7l-.9 1c.7 0 1 .3 1 .8 0 .8-1.3.9-1.8.4",
				strokeWidth: 1.1
			})
		]
	});
}
function ie({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M5 3.5h9M7.5 8H14M10 12.5h4" }),
			/* @__PURE__ */ e("circle", {
				cx: "2.5",
				cy: "3.5",
				r: ".6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "5",
				cy: "8",
				r: ".6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "7.5",
				cy: "12.5",
				r: ".6",
				fill: "currentColor"
			})
		]
	});
}
function ae({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("rect", {
			x: "2.5",
			y: "2.5",
			width: "11",
			height: "11",
			rx: "2"
		}), /* @__PURE__ */ e("path", { d: "m5.3 8.2 1.9 1.9 3.6-4" })]
	});
}
function oe({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "m9.5 2.5 3 3-5 5H4.5v-3z" }),
			/* @__PURE__ */ e("path", { d: "M4.5 10.5 3 12h3" }),
			/* @__PURE__ */ e("path", {
				d: "M2 14.5h12",
				strokeWidth: 2
			})
		]
	});
}
function se({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, {
			...i,
			fill: "currentColor",
			stroke: "none"
		}),
		children: [
			/* @__PURE__ */ e("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.2"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "8",
				cy: "8",
				r: "1.2"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.2"
			})
		]
	});
}
function ce({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M7.13 2.5a1 1 0 0 1 1.74 0l5.5 9.75a1 1 0 0 1-.87 1.5H2.5a1 1 0 0 1-.87-1.5z" }),
			/* @__PURE__ */ e("path", { d: "M8 6.2v3.3" }),
			/* @__PURE__ */ e("path", { d: "M8 11.4v.1" })
		]
	});
}
function le({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M8 10.5V2.5" }),
			/* @__PURE__ */ e("path", { d: "M5 5.5l3-3 3 3" }),
			/* @__PURE__ */ e("path", { d: "M2.5 10v2.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V10" })
		]
	});
}
function ue({ size: t = 16, ...r }) {
	return /* @__PURE__ */ e("svg", {
		...n(t, r),
		children: /* @__PURE__ */ e("path", { d: "M3 8.5l3.2 3L13 4.5" })
	});
}
function de({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8",
			r: "6"
		}), /* @__PURE__ */ e("path", { d: "M8 5.5v5M5.5 8h5" })]
	});
}
function fe({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M2.5 5h6M11.5 5h2M2.5 11h2M7.5 11h6" }),
			/* @__PURE__ */ e("circle", {
				cx: "10",
				cy: "5",
				r: "1.5"
			}),
			/* @__PURE__ */ e("circle", {
				cx: "6",
				cy: "11",
				r: "1.5"
			})
		]
	});
}
function pe({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("path", { d: "M14 2 7 9" }), /* @__PURE__ */ e("path", { d: "M14 2 9.5 14l-2.5-5-5-2.5z" })]
	});
}
function $({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M8 2.5v8" }),
			/* @__PURE__ */ e("path", { d: "M5 7.5l3 3 3-3" }),
			/* @__PURE__ */ e("path", { d: "M2.5 10v2.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V10" })
		]
	});
}
function me({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M4.5 6V2.5h7V6" }),
			/* @__PURE__ */ e("rect", {
				x: "2",
				y: "6",
				width: "12",
				height: "5.5",
				rx: "1.2"
			}),
			/* @__PURE__ */ e("path", { d: "M4.5 9.5h7v4h-7z" })
		]
	});
}
function he({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("circle", {
			cx: "8",
			cy: "8",
			r: "5.75"
		}), /* @__PURE__ */ e("path", { d: "M6.8 5.9v4.2L10.2 8z" })]
	});
}
function ge({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [/* @__PURE__ */ e("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ e("path", { d: "M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" })]
	});
}
function _e({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M8 14H4.5A1.5 1.5 0 0 1 3 12.5v-9A1.5 1.5 0 0 1 4.5 2h5L13 5.5V8" }),
			/* @__PURE__ */ e("path", { d: "M9.5 2v3.5H13" }),
			/* @__PURE__ */ e("circle", {
				cx: "11.75",
				cy: "11.75",
				r: "2.25"
			}),
			/* @__PURE__ */ e("path", { d: "M11.75 10.9v1.7M10.9 11.75h1.7" })
		]
	});
}
function ve({ size: r = 16, ...i }) {
	return /* @__PURE__ */ t("svg", {
		...n(r, i),
		children: [
			/* @__PURE__ */ e("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }),
			/* @__PURE__ */ e("path", { d: "M9.5 2v3.5H13" }),
			/* @__PURE__ */ e("path", {
				d: "M5.75 8.5h4.5v3h-4.5z",
				strokeDasharray: "1.4 1.1"
			})
		]
	});
}
//#endregion
export { Z as $, l as A, re as B, x as C, j as D, y as E, ie as F, h as G, U as H, v as I, r as J, he as K, O as L, V as M, L as N, K as O, J as P, R as Q, E as R, b as S, g as T, W as U, I as V, S as W, me as X, f as Y, P as Z, _e as _, _ as a, fe as at, p as b, M as c, D as ct, ae as d, m as dt, F as et, c as f, X as ft, ge as g, d as gt, ee as h, ce as ht, T as i, s as it, Q as j, oe as k, a as l, ve as lt, N as m, C as mt, te as n, o as nt, A as o, z as ot, i as p, le as pt, de as q, G as r, pe as rt, ne as s, Y as st, w as t, B as tt, ue as u, k as ut, u as v, q as w, H as x, $ as y, se as z };
