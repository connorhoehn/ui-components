import { f as e, n as t } from "./Button-DwPf_9pb.js";
import { t as n } from "./Text-DyujO08i.js";
import { t as r } from "./IconButton-BmDqeC-b.js";
import { h as i } from "./Icons-CNCMF52q.js";
import { t as a } from "./Tooltip-BaCci7O5.js";
import { t as o } from "./LiveRegion-DOMNUSPR.js";
import { t as s } from "./Link-BuANgxYo.js";
import { rt as c } from "./BreakoutRoomsPanel-kSEdG_RC.js";
import { useCallback as l, useEffect as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/video/RecordingConsentNotice.tsx
var g = {
	recording: "Recording",
	transcription: "Transcription",
	both: "Recording and transcription"
};
function _({ open: a, kind: o, startedBy: l, privacyHref: u, privacyLabel: d = "Privacy policy", onDismiss: f, title: _, description: y, acknowledgeLabel: b = "OK", onAcknowledge: x, secondaryLabel: S, onSecondary: C, placement: w = "overlay", className: T, "data-testid": E = "recording-consent" }) {
	if (!a) return null;
	let D = _ ?? g[o];
	if (w === "indicator") {
		let e = typeof y == "string" ? `${D}. ${y}` : `${D}${l ? `, started by ${l}` : ""}. By attending you agree to be included.`;
		return /* @__PURE__ */ m(v, {
			kind: o,
			sentence: e,
			testId: E,
			...T ? { className: T } : {}
		});
	}
	let O = x || C && S ? /* @__PURE__ */ h(p, { children: [x && /* @__PURE__ */ m(t, {
		size: "sm",
		variant: "primary",
		onClick: x,
		"data-testid": `${E}-acknowledge`,
		children: b
	}), C && S && /* @__PURE__ */ m(t, {
		size: "sm",
		variant: "ghost",
		onClick: C,
		"data-testid": `${E}-secondary`,
		children: S
	})] }) : null;
	if (w === "line") {
		let t = typeof y == "string" ? `${D} · ${y}` : `${D}${l ? ` by ${l}` : ""} · by attending you agree to be included`;
		return /* @__PURE__ */ h("div", {
			role: "status",
			"aria-live": "polite",
			"aria-label": D,
			"data-testid": E,
			"data-kind": o,
			"data-placement": "line",
			title: t,
			className: e("flex h-8 min-w-0 items-center gap-1.5", T),
			children: [
				/* @__PURE__ */ m("span", {
					"aria-hidden": !0,
					className: "h-2 w-2 shrink-0 rounded-full bg-danger"
				}),
				/* @__PURE__ */ m(n, {
					size: "xs",
					tone: "secondary",
					className: "min-w-0 truncate",
					children: t
				}),
				u && /* @__PURE__ */ m(n, {
					size: "xs",
					className: "shrink-0",
					children: /* @__PURE__ */ m(s, {
						href: u,
						external: !0,
						className: "text-primary-fg underline",
						"data-testid": `${E}-privacy`,
						children: d
					})
				}),
				O && /* @__PURE__ */ m("span", {
					className: "flex shrink-0 items-center gap-1",
					children: O
				}),
				/* @__PURE__ */ m(r, {
					"aria-label": "Dismiss recording note",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ m(i, {}),
					onClick: () => f?.(),
					className: "h-6 w-6 shrink-0",
					"data-testid": `${E}-dismiss`
				})
			]
		});
	}
	return /* @__PURE__ */ m("section", {
		"data-ui-part": "",
		role: "status",
		"aria-live": "polite",
		"aria-label": D,
		"data-testid": E,
		"data-kind": o,
		className: e("w-[min(30rem,calc(100%-2rem))] rounded-lg border border-border bg-surface p-4 shadow-lg", w === "overlay" && "absolute left-1/2 top-3 z-30 -translate-x-1/2", T),
		children: /* @__PURE__ */ h("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ m(c, {
					"aria-hidden": !0,
					size: 16,
					className: "mt-0.5 shrink-0 text-text-primary"
				}),
				/* @__PURE__ */ h("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ m(n, {
							as: "p",
							size: "sm",
							weight: "semibold",
							children: D
						}),
						/* @__PURE__ */ h(n, {
							as: "p",
							size: "sm",
							tone: "secondary",
							className: "mt-1 block",
							children: [y ?? /* @__PURE__ */ h(p, { children: [l ? `Started by ${l}. ` : "Started. ", "By attending this meeting, you agree to being included."] }), u && /* @__PURE__ */ h(p, { children: [" ", /* @__PURE__ */ m(s, {
								href: u,
								external: !0,
								className: "text-primary-fg underline",
								"data-testid": `${E}-privacy`,
								children: d
							})] })]
						}),
						O && /* @__PURE__ */ m("div", {
							className: "mt-3 flex items-center gap-2",
							children: O
						})
					]
				}),
				/* @__PURE__ */ m(r, {
					"aria-label": "Dismiss",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ m(i, {}),
					onClick: () => f?.(),
					"data-testid": `${E}-dismiss`
				})
			]
		})
	});
}
function v({ kind: t, sentence: n, testId: r, className: i }) {
	let [s, c] = f(""), l = d(n);
	return u(() => {
		c(l.current);
	}, []), /* @__PURE__ */ h("span", {
		className: e("inline-flex shrink-0 items-center", i),
		"data-testid": r,
		"data-kind": t,
		"data-placement": "indicator",
		children: [/* @__PURE__ */ m(a, {
			content: n,
			placement: "top",
			"data-testid": `${r}-tooltip`,
			children: /* @__PURE__ */ m("span", {
				role: "img",
				tabIndex: 0,
				"aria-label": n,
				className: "inline-flex h-4 w-4 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary",
				"data-testid": `${r}-dot`,
				children: /* @__PURE__ */ m("span", {
					"aria-hidden": !0,
					className: "h-2 w-2 rounded-full bg-danger"
				})
			})
		}), /* @__PURE__ */ m(o, {
			message: s,
			role: "none",
			"data-testid": `${r}-announce`
		})]
	});
}
var y = "ui-components:consent-dismissed:", b = /* @__PURE__ */ new Set();
function x(e) {
	try {
		return e === "local" ? window.localStorage : window.sessionStorage;
	} catch {
		return null;
	}
}
function S(e, t) {
	if (b.has(e)) return !0;
	try {
		return x(t)?.getItem(y + e) === "1";
	} catch {
		return !1;
	}
}
function C(e, t = {}) {
	let n = t.storage ?? "session", [r, i] = f(() => e ? S(e, n) : !1);
	return u(() => {
		i(e ? S(e, n) : !1);
	}, [e, n]), {
		dismissed: r,
		dismiss: l(() => {
			if (e) {
				b.add(e);
				try {
					x(n)?.setItem(y + e, "1");
				} catch {}
				i(!0);
			}
		}, [e, n]),
		reset: l(() => {
			if (e) {
				b.delete(e);
				try {
					x(n)?.removeItem(y + e);
				} catch {}
				i(!1);
			}
		}, [e, n])
	};
}
//#endregion
export { _ as n, C as r, g as t };
