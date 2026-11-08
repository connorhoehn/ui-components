import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { i as n, r, t as i } from "./Text-DAQCiXe4.js";
import { t as a } from "./IconButton-BgM9MvwA.js";
import { a as o, i as s, u as c } from "./MediaIcons-_ai5Til2.js";
import { t as l } from "./InlinePopover-BQTS5egk.js";
import { t as u } from "./DotMeter-DJzl5dNX.js";
import { t as d } from "./StatusPill-CoaiP2Bt.js";
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
function T({ pending: a, handleEscape: o = !0, autoFocus: s = !0, className: c, "data-testid": l = "voice-confirm-card" }) {
	let u = m(null);
	return p(() => {
		s && u.current?.focus();
	}, [s]), /* @__PURE__ */ _(n, {
		ref: u,
		gap: "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Confirm: ${a.title}`,
		onKeyDown: (e) => {
			e.key === "Escape" && o ? (e.stopPropagation(), a.onCancel()) : e.key === "Enter" && e.target === e.currentTarget && (e.preventDefault(), a.onConfirm());
		},
		"data-testid": l,
		className: e("rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary", c),
		children: [
			/* @__PURE__ */ g(i, {
				size: "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: a.title
			}),
			a.detail ? /* @__PURE__ */ g(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				children: a.detail
			}) : null,
			/* @__PURE__ */ _(r, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ g(t, {
					variant: "secondary",
					size: "sm",
					onClick: a.onCancel,
					"data-testid": `${l}-cancel`,
					children: "Cancel"
				}), /* @__PURE__ */ g(t, {
					variant: "primary",
					size: "sm",
					onClick: a.onConfirm,
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
function D({ turns: a, maxVisible: o = 4, onClear: s, pending: c = null, className: l, "data-testid": u = "voice-turn-strip" }) {
	let f = o > 0 ? a.slice(-o) : a;
	return /* @__PURE__ */ _(n, {
		gap: "sm",
		className: e("min-w-0", l),
		"data-testid": u,
		children: [
			f.length === 0 && !c ? /* @__PURE__ */ g(i, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${u}-empty`,
				children: "Nothing said yet."
			}) : null,
			f.map((e) => /* @__PURE__ */ _(n, {
				gap: "xs",
				"data-testid": `${u}-turn-${e.id}`,
				"data-role": e.role,
				children: [
					/* @__PURE__ */ _(r, {
						gap: "sm",
						children: [/* @__PURE__ */ g(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							children: e.role === "you" ? "You" : "Assistant"
						}), /* @__PURE__ */ g(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							children: E(e.at)
						})]
					}),
					/* @__PURE__ */ g(i, {
						size: "sm",
						tone: "primary",
						as: "p",
						wrap: !0,
						children: e.text
					}),
					e.toolCalls?.map((t, n) => /* @__PURE__ */ _(r, {
						gap: "sm",
						"data-testid": `${u}-tool-${e.id}-${n}`,
						"data-status": t.status,
						children: [
							/* @__PURE__ */ g(d, {
								size: "sm",
								tone: w[t.status],
								label: t.status
							}),
							/* @__PURE__ */ g(i, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: t.name
							}),
							/* @__PURE__ */ g(i, {
								size: "xs",
								tone: "tertiary",
								children: t.summary
							})
						]
					}, `${t.name}-${n}`))
				]
			}, e.id)),
			c ? /* @__PURE__ */ g(T, { pending: c }) : null,
			s && a.length > 0 ? /* @__PURE__ */ g(r, {
				justify: "end",
				children: /* @__PURE__ */ g(t, {
					variant: "ghost",
					size: "sm",
					onClick: s,
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
function j({ phase: n, level: v, outputLevel: b, elapsedSeconds: x, budget: S = null, pending: w = null, lastLine: E = null, onStart: D, onStop: j, onMute: M, muted: N = !1, unavailableReason: P, compact: F = !1, size: I = "panel", startLabel: L = "Voice", className: R, ref: z, "data-testid": B = "voice-dock" }) {
	let V = m(null), [H, U] = h(!1);
	p(() => U(!0), []);
	let W = f((e) => {
		V.current = e, typeof z == "function" ? z(e) : z && (z.current = e);
	}, [z]), G = n !== "off" && n !== "ended" && n !== "unavailable", K = H && !!w && n === "confirming", q = n === "unavailable" ? P : void 0, J = y[n], Y = I === "footer";
	return /* @__PURE__ */ _(r, {
		ref: W,
		wrap: !1,
		gap: "sm",
		className: e("min-w-0", Y ? "px-1" : "px-2 py-1", R),
		"data-testid": B,
		"data-phase": n,
		"data-size": I,
		"data-voice-dock": "",
		children: [
			/* @__PURE__ */ g(C, {
				level: v,
				outputLevel: b,
				phase: n,
				size: F || Y ? "sm" : "md",
				"data-testid": `${B}-ring`
			}),
			/* @__PURE__ */ g(i, {
				title: q,
				"data-testid": `${B}-phase`,
				children: Y ? /* @__PURE__ */ g(i, {
					size: "xs",
					tone: "secondary",
					className: "whitespace-nowrap",
					role: "status",
					children: J
				}) : /* @__PURE__ */ g(d, {
					size: "sm",
					tone: O[n],
					label: J
				})
			}),
			!F && E ? /* @__PURE__ */ g(i, {
				size: Y ? "xs" : "sm",
				tone: E.role === "you" ? "secondary" : "primary",
				className: "min-w-0 flex-1 truncate",
				title: E.text,
				"data-testid": `${B}-last-line`,
				"data-role": E.role,
				children: E.text
			}) : /* @__PURE__ */ g(i, {
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
			G && x !== void 0 ? /* @__PURE__ */ g(i, {
				size: "xs",
				tone: "tertiary",
				tabular: !0,
				"data-testid": `${B}-elapsed`,
				children: k(x)
			}) : null,
			G && M ? /* @__PURE__ */ g(a, {
				"aria-label": N ? "Unmute microphone" : "Mute microphone",
				"aria-pressed": N,
				size: "sm",
				variant: "ghost",
				icon: g(N ? o : s, { size: 16 }),
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
				children: [/* @__PURE__ */ g(c, {
					size: 16,
					className: "text-danger"
				}), "End"]
			}) : /* @__PURE__ */ _(t, {
				variant: "ghost",
				size: "sm",
				"aria-label": "Start voice session",
				className: "gap-1.5",
				disabled: n === "unavailable" || !D,
				title: q,
				onClick: D,
				"data-testid": `${B}-start`,
				children: [/* @__PURE__ */ g(s, { size: 16 }), L]
			}) : G ? /* @__PURE__ */ g(a, {
				"aria-label": "End voice session",
				size: "sm",
				variant: "danger",
				icon: /* @__PURE__ */ g(c, { size: 16 }),
				onClick: j,
				"data-testid": `${B}-stop`
			}) : /* @__PURE__ */ g(a, {
				"aria-label": "Start voice session",
				size: "sm",
				variant: "primary",
				icon: /* @__PURE__ */ g(s, { size: 16 }),
				disabled: n === "unavailable" || !D,
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
