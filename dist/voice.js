import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { t as n } from "./IconButton-Bf5Wy0tS.js";
import { a as r, i, u as a } from "./MediaIcons-_ai5Til2.js";
import { i as o, r as s, t as c } from "./Text-k7rQu4ud.js";
import { t as l } from "./InlinePopover-CPu3gKSr.js";
import { t as u } from "./DotMeter-B6ZDgLU7.js";
import { t as d } from "./StatusPill-Dh1Ary6I.js";
import { useCallback as f, useEffect as p, useRef as m, useState as h } from "react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/components/voice/voiceTypes.ts
var v = [
	"off",
	"connecting",
	"listening",
	"thinking",
	"executing",
	"speaking",
	"confirming",
	"ended",
	"unavailable"
], y = {
	off: "Voice off",
	connecting: "Connecting",
	listening: "Listening",
	thinking: "Thinking",
	executing: "Working",
	speaking: "Speaking",
	confirming: "Confirm",
	ended: "Ended",
	unavailable: "Unavailable"
};
function b(e) {
	return typeof e != "number" || Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
//#endregion
//#region src/components/voice/VoiceActivityRing.tsx
var x = {
	sm: "size-4.5",
	md: "size-9"
}, S = {
	off: "text-text-tertiary opacity-50",
	connecting: "text-info",
	listening: "text-success",
	thinking: "text-info",
	executing: "text-info",
	speaking: "text-primary",
	confirming: "text-warning",
	ended: "text-text-tertiary opacity-50",
	unavailable: "text-text-tertiary opacity-50"
};
function C({ level: t = 0, outputLevel: n = 0, phase: r, size: i = "md", label: a, className: o, "data-testid": s }) {
	let c = b(t), l = b(n), u = r === "thinking" || r === "executing" || r === "connecting", d = r === "listening" ? 1.5 + c * 3.5 : 2, f = r === "speaking" ? .25 + l * .6 : 0;
	return /* @__PURE__ */ _("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		"aria-hidden": "true",
		focusable: "false",
		role: "presentation",
		"data-testid": s,
		"data-phase": r,
		"data-level": c.toFixed(2),
		"data-output-level": l.toFixed(2),
		"data-label": a,
		className: e("shrink-0", x[i], S[r], u && "motion-safe:animate-spin", o),
		children: [
			r === "speaking" && /* @__PURE__ */ g("circle", {
				cx: "12",
				cy: "12",
				r: "11",
				strokeWidth: 1,
				strokeOpacity: f,
				className: "motion-safe:animate-pulse",
				"data-part": "halo"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "12",
				cy: "12",
				r: "8",
				strokeWidth: d,
				strokeDasharray: u ? "30 21" : void 0,
				strokeOpacity: r === "off" || r === "ended" || r === "unavailable" ? .6 : 1,
				"data-part": "ring"
			}),
			r === "unavailable" && /* @__PURE__ */ g("line", {
				x1: "6",
				y1: "18",
				x2: "18",
				y2: "6",
				strokeWidth: 2
			})
		]
	});
}
//#endregion
//#region src/components/voice/VoiceTurnStrip.tsx
var w = {
	running: "info",
	done: "success",
	refused: "warning",
	failed: "danger"
};
function T({ pending: n, handleEscape: r = !0, autoFocus: i = !0, className: a, "data-testid": l = "voice-confirm-card" }) {
	let u = m(null);
	return p(() => {
		i && u.current?.focus();
	}, [i]), /* @__PURE__ */ _(o, {
		ref: u,
		gap: "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Confirm: ${n.title}`,
		onKeyDown: (e) => {
			e.key === "Escape" && r ? (e.stopPropagation(), n.onCancel()) : e.key === "Enter" && e.target === e.currentTarget && (e.preventDefault(), n.onConfirm());
		},
		"data-testid": l,
		className: e("rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary", a),
		children: [
			/* @__PURE__ */ g(c, {
				size: "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: n.title
			}),
			n.detail ? /* @__PURE__ */ g(c, {
				size: "xs",
				tone: "secondary",
				as: "p",
				children: n.detail
			}) : null,
			/* @__PURE__ */ _(s, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ g(t, {
					variant: "secondary",
					size: "sm",
					onClick: n.onCancel,
					"data-testid": `${l}-cancel`,
					children: "Cancel"
				}), /* @__PURE__ */ g(t, {
					variant: "primary",
					size: "sm",
					onClick: n.onConfirm,
					"data-testid": `${l}-confirm`,
					children: "Confirm"
				})]
			})
		]
	});
}
function E(e) {
	if (typeof e == "string") return e;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function D({ turns: n, maxVisible: r = 4, onClear: i, pending: a = null, className: l, "data-testid": u = "voice-turn-strip" }) {
	let f = r > 0 ? n.slice(-r) : n;
	return /* @__PURE__ */ _(o, {
		gap: "sm",
		className: e("min-w-0", l),
		"data-testid": u,
		children: [
			f.length === 0 && !a ? /* @__PURE__ */ g(c, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${u}-empty`,
				children: "Nothing said yet."
			}) : null,
			f.map((e) => /* @__PURE__ */ _(o, {
				gap: "xs",
				"data-testid": `${u}-turn-${e.id}`,
				"data-role": e.role,
				children: [
					/* @__PURE__ */ _(s, {
						gap: "sm",
						children: [/* @__PURE__ */ g(c, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							children: e.role === "you" ? "You" : "Assistant"
						}), /* @__PURE__ */ g(c, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							children: E(e.at)
						})]
					}),
					/* @__PURE__ */ g(c, {
						size: "sm",
						tone: "primary",
						as: "p",
						wrap: !0,
						children: e.text
					}),
					e.toolCalls?.map((t, n) => /* @__PURE__ */ _(s, {
						gap: "sm",
						"data-testid": `${u}-tool-${e.id}-${n}`,
						"data-status": t.status,
						children: [
							/* @__PURE__ */ g(d, {
								size: "sm",
								tone: w[t.status],
								label: t.status
							}),
							/* @__PURE__ */ g(c, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: t.name
							}),
							/* @__PURE__ */ g(c, {
								size: "xs",
								tone: "tertiary",
								children: t.summary
							})
						]
					}, `${t.name}-${n}`))
				]
			}, e.id)),
			a ? /* @__PURE__ */ g(T, { pending: a }) : null,
			i && n.length > 0 ? /* @__PURE__ */ g(s, {
				justify: "end",
				children: /* @__PURE__ */ g(t, {
					variant: "ghost",
					size: "sm",
					onClick: i,
					"data-testid": `${u}-clear`,
					children: "Clear"
				})
			}) : null
		]
	});
}
//#endregion
//#region src/components/voice/VoiceDock.tsx
var O = {
	off: "neutral",
	connecting: "pending",
	listening: "success",
	thinking: "info",
	executing: "info",
	speaking: "success",
	confirming: "warning",
	ended: "neutral",
	unavailable: "neutral"
};
function k(e) {
	let t = Math.max(0, Math.floor(e));
	return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
var A = (e) => `$${e.toFixed(2)}`;
function j({ phase: o, level: v, outputLevel: b, elapsedSeconds: x, budget: S = null, pending: w = null, lastLine: E = null, onStart: D, onStop: j, onMute: M, muted: N = !1, unavailableReason: P, compact: F = !1, size: I = "panel", startLabel: L = "Voice", className: R, ref: z, "data-testid": B = "voice-dock" }) {
	let V = m(null), [H, U] = h(!1);
	p(() => U(!0), []);
	let W = f((e) => {
		V.current = e, typeof z == "function" ? z(e) : z && (z.current = e);
	}, [z]), G = o !== "off" && o !== "ended" && o !== "unavailable", K = H && !!w && o === "confirming", q = o === "unavailable" ? P : void 0, J = y[o], Y = I === "footer";
	return /* @__PURE__ */ _(s, {
		ref: W,
		wrap: !1,
		gap: "sm",
		className: e("min-w-0", Y ? "px-1" : "px-2 py-1", R),
		"data-testid": B,
		"data-phase": o,
		"data-size": I,
		"data-voice-dock": "",
		children: [
			/* @__PURE__ */ g(C, {
				level: v,
				outputLevel: b,
				phase: o,
				size: F || Y ? "sm" : "md",
				"data-testid": `${B}-ring`
			}),
			/* @__PURE__ */ g(c, {
				title: q,
				"data-testid": `${B}-phase`,
				children: Y ? /* @__PURE__ */ g(c, {
					size: "xs",
					tone: "secondary",
					className: "whitespace-nowrap",
					role: "status",
					children: J
				}) : /* @__PURE__ */ g(d, {
					size: "sm",
					tone: O[o],
					label: J
				})
			}),
			!F && E ? /* @__PURE__ */ g(c, {
				size: Y ? "xs" : "sm",
				tone: E.role === "you" ? "secondary" : "primary",
				className: "min-w-0 flex-1 truncate",
				title: E.text,
				"data-testid": `${B}-last-line`,
				"data-role": E.role,
				children: E.text
			}) : /* @__PURE__ */ g(c, {
				className: "min-w-0 flex-1",
				"aria-hidden": "true",
				children: ""
			}),
			!F && S && G ? /* @__PURE__ */ g(u, {
				value: S.holdUsd > 0 ? S.usedUsd / S.holdUsd : 0,
				segments: 5,
				showPercent: !1,
				note: `${A(S.usedUsd)} of ${A(S.holdUsd)}`,
				tone: "surface",
				"data-testid": `${B}-budget`
			}) : null,
			G && x !== void 0 ? /* @__PURE__ */ g(c, {
				size: "xs",
				tone: "tertiary",
				tabular: !0,
				"data-testid": `${B}-elapsed`,
				children: k(x)
			}) : null,
			G && M ? /* @__PURE__ */ g(n, {
				"aria-label": N ? "Unmute microphone" : "Mute microphone",
				"aria-pressed": N,
				size: "sm",
				variant: "ghost",
				icon: g(N ? r : i, { size: 16 }),
				onClick: M,
				"data-testid": `${B}-mute`
			}) : null,
			Y ? G ? /* @__PURE__ */ _(t, {
				variant: "ghost",
				size: "sm",
				"aria-label": "End voice session",
				className: "gap-1.5",
				onClick: j,
				"data-testid": `${B}-stop`,
				children: [/* @__PURE__ */ g(a, {
					size: 16,
					className: "text-danger"
				}), "End"]
			}) : /* @__PURE__ */ _(t, {
				variant: "ghost",
				size: "sm",
				"aria-label": "Start voice session",
				className: "gap-1.5",
				disabled: o === "unavailable" || !D,
				title: q,
				onClick: D,
				"data-testid": `${B}-start`,
				children: [/* @__PURE__ */ g(i, { size: 16 }), L]
			}) : G ? /* @__PURE__ */ g(n, {
				"aria-label": "End voice session",
				size: "sm",
				variant: "danger",
				icon: /* @__PURE__ */ g(a, { size: 16 }),
				onClick: j,
				"data-testid": `${B}-stop`
			}) : /* @__PURE__ */ g(n, {
				"aria-label": "Start voice session",
				size: "sm",
				variant: "primary",
				icon: /* @__PURE__ */ g(i, { size: 16 }),
				disabled: o === "unavailable" || !D,
				title: q,
				onClick: D,
				"data-testid": `${B}-start`
			}),
			w ? /* @__PURE__ */ g(l, {
				trigger: V,
				open: K,
				onClose: w.onCancel,
				placement: "bottom-start",
				"aria-label": `Confirm: ${w.title}`,
				kind: "voice-confirm",
				"data-testid": `${B}-pending`,
				children: /* @__PURE__ */ g(T, {
					pending: w,
					handleEscape: !1
				})
			}) : null
		]
	});
}
//#endregion
export { v as VOICE_PHASES, y as VOICE_PHASE_LABEL, C as VoiceActivityRing, T as VoiceConfirmCard, j as VoiceDock, D as VoiceTurnStrip };
