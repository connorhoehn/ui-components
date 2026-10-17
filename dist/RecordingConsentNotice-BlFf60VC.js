import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./IconButton-IE5g44md.js";
import { h as n } from "./Icons-GSE-QGuJ.js";
import { t as r } from "./Text-KEOV-uPA.js";
import { t as i } from "./Link-h2c9gcsw.js";
import { J as a } from "./BreakoutRoomsPanel-DuqdYSWL.js";
import { useCallback as o, useEffect as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/video/RecordingConsentNotice.tsx
var f = {
	recording: "Recording",
	transcription: "Transcription",
	both: "Recording and transcription"
};
function p({ open: o, kind: s, startedBy: c, privacyHref: p, privacyLabel: m = "Privacy policy", onDismiss: h, placement: g = "overlay", className: _, "data-testid": v = "recording-consent" }) {
	if (!o) return null;
	let y = f[s];
	return /* @__PURE__ */ u("section", {
		role: "status",
		"aria-live": "polite",
		"aria-label": y,
		"data-testid": v,
		"data-kind": s,
		className: e("w-[min(30rem,calc(100%-2rem))] rounded-lg border border-border bg-surface p-4 shadow-lg", g === "overlay" && "absolute left-1/2 top-3 z-30 -translate-x-1/2", _),
		children: /* @__PURE__ */ d("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ u(a, {
					"aria-hidden": !0,
					size: 16,
					className: "mt-0.5 shrink-0 text-text-primary"
				}),
				/* @__PURE__ */ d("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ u(r, {
						as: "p",
						size: "sm",
						weight: "semibold",
						children: y
					}), /* @__PURE__ */ d(r, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "mt-1 block",
						children: [
							c ? `Started by ${c}. ` : "Started. ",
							"By attending this meeting, you agree to being included.",
							p && /* @__PURE__ */ d(l, { children: [" ", /* @__PURE__ */ u(i, {
								href: p,
								external: !0,
								className: "text-primary-fg underline",
								"data-testid": `${v}-privacy`,
								children: m
							})] })
						]
					})]
				}),
				/* @__PURE__ */ u(t, {
					"aria-label": "Dismiss",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ u(n, {}),
					onClick: h,
					"data-testid": `${v}-dismiss`
				})
			]
		})
	});
}
var m = "ui-components:consent-dismissed:", h = /* @__PURE__ */ new Set();
function g(e) {
	try {
		return e === "local" ? window.localStorage : window.sessionStorage;
	} catch {
		return null;
	}
}
function _(e, t) {
	if (h.has(e)) return !0;
	try {
		return g(t)?.getItem(m + e) === "1";
	} catch {
		return !1;
	}
}
function v(e, t = {}) {
	let n = t.storage ?? "session", [r, i] = c(() => e ? _(e, n) : !1);
	return s(() => {
		i(e ? _(e, n) : !1);
	}, [e, n]), {
		dismissed: r,
		dismiss: o(() => {
			if (e) {
				h.add(e);
				try {
					g(n)?.setItem(m + e, "1");
				} catch {}
				i(!0);
			}
		}, [e, n]),
		reset: o(() => {
			if (e) {
				h.delete(e);
				try {
					g(n)?.removeItem(m + e);
				} catch {}
				i(!1);
			}
		}, [e, n])
	};
}
//#endregion
export { p as n, v as r, f as t };
