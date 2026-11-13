import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { t as n } from "./Text-XdCzxWMv.js";
import { t as r } from "./IconButton-BgM9MvwA.js";
import { h as i } from "./Icons-CqVFbuiZ.js";
import { t as a } from "./Link-Dv9PR9D2.js";
import { Q as o } from "./BreakoutRoomsPanel-DFI0aXXk.js";
import { useCallback as s, useEffect as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/video/RecordingConsentNotice.tsx
var p = {
	recording: "Recording",
	transcription: "Transcription",
	both: "Recording and transcription"
};
function m({ open: s, kind: c, startedBy: l, privacyHref: m, privacyLabel: h = "Privacy policy", onDismiss: g, title: _, description: v, acknowledgeLabel: y = "OK", onAcknowledge: b, secondaryLabel: x, onSecondary: S, placement: C = "overlay", className: w, "data-testid": T = "recording-consent" }) {
	if (!s) return null;
	let E = _ ?? p[c], D = b || S && x ? /* @__PURE__ */ f(u, { children: [b && /* @__PURE__ */ d(t, {
		size: "sm",
		variant: "primary",
		onClick: b,
		"data-testid": `${T}-acknowledge`,
		children: y
	}), S && x && /* @__PURE__ */ d(t, {
		size: "sm",
		variant: "ghost",
		onClick: S,
		"data-testid": `${T}-secondary`,
		children: x
	})] }) : null;
	if (C === "line") {
		let t = typeof v == "string" ? `${E} · ${v}` : `${E}${l ? ` by ${l}` : ""} · by attending you agree to be included`;
		return /* @__PURE__ */ f("div", {
			role: "status",
			"aria-live": "polite",
			"aria-label": E,
			"data-testid": T,
			"data-kind": c,
			"data-placement": "line",
			title: t,
			className: e("flex h-8 min-w-0 items-center gap-1.5", w),
			children: [
				/* @__PURE__ */ d("span", {
					"aria-hidden": !0,
					className: "h-2 w-2 shrink-0 rounded-full bg-danger"
				}),
				/* @__PURE__ */ d(n, {
					size: "xs",
					tone: "secondary",
					className: "min-w-0 truncate",
					children: t
				}),
				m && /* @__PURE__ */ d(n, {
					size: "xs",
					className: "shrink-0",
					children: /* @__PURE__ */ d(a, {
						href: m,
						external: !0,
						className: "text-primary-fg underline",
						"data-testid": `${T}-privacy`,
						children: h
					})
				}),
				D && /* @__PURE__ */ d("span", {
					className: "flex shrink-0 items-center gap-1",
					children: D
				}),
				/* @__PURE__ */ d(r, {
					"aria-label": "Dismiss recording note",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ d(i, {}),
					onClick: g,
					className: "h-6 w-6 shrink-0",
					"data-testid": `${T}-dismiss`
				})
			]
		});
	}
	return /* @__PURE__ */ d("section", {
		"data-ui-part": "",
		role: "status",
		"aria-live": "polite",
		"aria-label": E,
		"data-testid": T,
		"data-kind": c,
		className: e("w-[min(30rem,calc(100%-2rem))] rounded-lg border border-border bg-surface p-4 shadow-lg", C === "overlay" && "absolute left-1/2 top-3 z-30 -translate-x-1/2", w),
		children: /* @__PURE__ */ f("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ d(o, {
					"aria-hidden": !0,
					size: 16,
					className: "mt-0.5 shrink-0 text-text-primary"
				}),
				/* @__PURE__ */ f("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ d(n, {
							as: "p",
							size: "sm",
							weight: "semibold",
							children: E
						}),
						/* @__PURE__ */ f(n, {
							as: "p",
							size: "sm",
							tone: "secondary",
							className: "mt-1 block",
							children: [v ?? /* @__PURE__ */ f(u, { children: [l ? `Started by ${l}. ` : "Started. ", "By attending this meeting, you agree to being included."] }), m && /* @__PURE__ */ f(u, { children: [" ", /* @__PURE__ */ d(a, {
								href: m,
								external: !0,
								className: "text-primary-fg underline",
								"data-testid": `${T}-privacy`,
								children: h
							})] })]
						}),
						D && /* @__PURE__ */ d("div", {
							className: "mt-3 flex items-center gap-2",
							children: D
						})
					]
				}),
				/* @__PURE__ */ d(r, {
					"aria-label": "Dismiss",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ d(i, {}),
					onClick: g,
					"data-testid": `${T}-dismiss`
				})
			]
		})
	});
}
var h = "ui-components:consent-dismissed:", g = /* @__PURE__ */ new Set();
function _(e) {
	try {
		return e === "local" ? window.localStorage : window.sessionStorage;
	} catch {
		return null;
	}
}
function v(e, t) {
	if (g.has(e)) return !0;
	try {
		return _(t)?.getItem(h + e) === "1";
	} catch {
		return !1;
	}
}
function y(e, t = {}) {
	let n = t.storage ?? "session", [r, i] = l(() => e ? v(e, n) : !1);
	return c(() => {
		i(e ? v(e, n) : !1);
	}, [e, n]), {
		dismissed: r,
		dismiss: s(() => {
			if (e) {
				g.add(e);
				try {
					_(n)?.setItem(h + e, "1");
				} catch {}
				i(!0);
			}
		}, [e, n]),
		reset: s(() => {
			if (e) {
				g.delete(e);
				try {
					_(n)?.removeItem(h + e);
				} catch {}
				i(!1);
			}
		}, [e, n])
	};
}
//#endregion
export { m as n, y as r, p as t };
