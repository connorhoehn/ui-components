import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { i as n, r, t as i } from "./Text-DAQCiXe4.js";
import { t as a } from "./IconButton-BgM9MvwA.js";
import { a as o, i as s, u as c } from "./MediaIcons-_ai5Til2.js";
import { t as l } from "./Input-DiOEvL5h.js";
import { t as u } from "./InlinePopover-BQTS5egk.js";
import { t as d } from "./DotMeter-DJzl5dNX.js";
import { t as f } from "./SegmentedControl-DMudc23g.js";
import { t as p } from "./StatusPill-CoaiP2Bt.js";
import { useCallback as m, useEffect as h, useRef as g, useState as _ } from "react";
import { jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/components/voice/voiceTypes.ts
var b = [
	"off",
	"connecting",
	"listening",
	"thinking",
	"executing",
	"speaking",
	"confirming",
	"ended",
	"unavailable"
], x = {
	off: "Voice off",
	connecting: "Connecting",
	listening: "Listening",
	thinking: "Thinking",
	executing: "Working",
	speaking: "Speaking",
	confirming: "Confirm",
	ended: "Ended",
	unavailable: "Unavailable"
}, S = 200, C = 10;
function w(e) {
	return typeof e != "number" || Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
//#endregion
//#region src/components/voice/VoiceActivityRing.tsx
var T = {
	sm: "size-4.5",
	md: "size-9"
}, E = {
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
function D({ level: t = 0, outputLevel: n = 0, phase: r, size: i = "md", label: a, className: o, "data-testid": s }) {
	let c = w(t), l = w(n), u = r === "thinking" || r === "executing" || r === "connecting", d = r === "listening" ? 1.5 + c * 3.5 : 2, f = r === "speaking" ? .25 + l * .6 : 0;
	return /* @__PURE__ */ y("svg", {
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
		className: e("shrink-0", T[i], E[r], u && "motion-safe:animate-spin", o),
		children: [
			r === "speaking" && /* @__PURE__ */ v("circle", {
				cx: "12",
				cy: "12",
				r: "11",
				strokeWidth: 1,
				strokeOpacity: f,
				className: "motion-safe:animate-pulse",
				"data-part": "halo"
			}),
			/* @__PURE__ */ v("circle", {
				cx: "12",
				cy: "12",
				r: "8",
				strokeWidth: d,
				strokeDasharray: u ? "30 21" : void 0,
				strokeOpacity: r === "off" || r === "ended" || r === "unavailable" ? .6 : 1,
				"data-part": "ring"
			}),
			r === "unavailable" && /* @__PURE__ */ v("line", {
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
//#region src/components/voice/VoiceChoiceCard.tsx
function O({ choice: a, handleEscape: o = !0, autoFocus: s = !0, compact: c = !1, className: l, "data-testid": u = "voice-choice-card" }) {
	let d = g(null), f = a.candidates.slice(0, 10), m = f.length, b = (e) => typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= m, [x, S] = _(b(a.ordinal) ? a.ordinal - 1 : 0);
	h(() => {
		s && d.current?.focus();
	}, [s]);
	let C = g(void 0), w = g(a.onChoose);
	w.current = a.onChoose, h(() => {
		if (!b(a.ordinal)) {
			C.current = void 0;
			return;
		}
		S(a.ordinal - 1), C.current !== a.ordinal && (C.current = a.ordinal, w.current(a.ordinal - 1));
	}, [a.ordinal, m]);
	let T = (e) => {
		if (m === 0) return;
		let t = (e % m + m) % m;
		S(t), d.current?.querySelectorAll("[data-part=\"row\"]")[t]?.focus();
	};
	return /* @__PURE__ */ y(n, {
		ref: d,
		gap: c ? "xs" : "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Choose: ${a.title}`,
		onKeyDown: (e) => {
			if (e.key === "Escape" && o) e.stopPropagation(), a.onCancel();
			else if (e.key === "ArrowDown" || e.key === "ArrowRight") e.preventDefault(), T(x + 1);
			else if (e.key === "ArrowUp" || e.key === "ArrowLeft") e.preventDefault(), T(x - 1);
			else if (/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
				let t = e.key === "0" ? 10 : Number(e.key);
				t <= m && (e.preventDefault(), a.onChoose(t - 1));
			}
		},
		"data-testid": u,
		"data-compact": c ? "true" : void 0,
		className: e("rounded-md border border-solid border-warning/40 bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary", c ? "p-2" : "p-3", l),
		children: [
			/* @__PURE__ */ v(i, {
				size: c ? "xs" : "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: a.title
			}),
			/* @__PURE__ */ v(n, {
				gap: "xs",
				role: "list",
				children: f.map((t, o) => {
					let s = o === x;
					return /* @__PURE__ */ y("button", {
						type: "button",
						role: "listitem",
						"data-part": "row",
						"data-ordinal": o + 1,
						"data-selected": s ? "true" : void 0,
						"data-href": t.href,
						title: t.href,
						tabIndex: s ? 0 : -1,
						onClick: () => a.onChoose(o),
						onFocus: () => S(o),
						"data-testid": `${u}-row-${o + 1}`,
						className: e("flex w-full min-w-0 cursor-pointer items-start gap-2 rounded-md border border-solid bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-surface-hover", c ? "px-1.5 py-1" : "px-2 py-1.5", s ? "border-primary bg-surface-hover" : "border-transparent"),
						children: [/* @__PURE__ */ v(i, {
							size: "xs",
							weight: "semibold",
							tone: "secondary",
							tabular: !0,
							children: o + 1
						}), /* @__PURE__ */ y(n, {
							gap: "xs",
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ y(r, {
								gap: "sm",
								wrap: !1,
								className: "min-w-0",
								children: [/* @__PURE__ */ v(i, {
									size: c ? "xs" : "sm",
									weight: "medium",
									tone: "primary",
									className: "min-w-0 truncate",
									children: t.title
								}), t.kind ? /* @__PURE__ */ v(p, {
									size: "sm",
									tone: "neutral",
									label: t.kind
								}) : null]
							}), t.subtitle ? /* @__PURE__ */ v(i, {
								size: "xs",
								tone: "tertiary",
								className: "min-w-0 truncate",
								children: t.subtitle
							}) : null]
						})]
					}, o);
				})
			}),
			/* @__PURE__ */ v(r, {
				gap: "sm",
				justify: "end",
				children: /* @__PURE__ */ v(t, {
					variant: "secondary",
					size: "sm",
					onClick: a.onCancel,
					"data-testid": `${u}-cancel`,
					children: "Cancel"
				})
			})
		]
	});
}
//#endregion
//#region src/components/voice/VoiceTurnStrip.tsx
var k = [{
	label: "Approve",
	value: "approve"
}, {
	label: "Reject",
	value: "reject"
}], A = {
	running: "info",
	done: "success",
	refused: "warning",
	failed: "danger"
};
function j({ pending: a, handleEscape: o = !0, autoFocus: s = !0, className: c, "data-testid": u = "voice-confirm-card" }) {
	let d = g(null);
	h(() => {
		s && d.current?.focus();
	}, [s]);
	let { fields: p } = a, [m, b] = _(p?.decision ?? "approve"), [x, S] = _(""), C = () => {
		p ? a.onConfirm({
			decision: m,
			note: x.trim().slice(0, 200).trim()
		}) : a.onConfirm();
	}, w = (e) => {
		e.key === "Escape" && o ? (e.stopPropagation(), a.onCancel()) : e.key === "Enter" && (e.target === e.currentTarget || p && e.target instanceof HTMLInputElement) && (e.preventDefault(), C());
	}, T = Array.isArray(a.detail) ? a.detail.filter(Boolean) : a.detail ? [a.detail] : [];
	return /* @__PURE__ */ y(n, {
		ref: d,
		gap: "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Confirm: ${a.title}`,
		onKeyDown: w,
		"data-testid": u,
		className: e("rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary", c),
		children: [
			/* @__PURE__ */ v(i, {
				size: "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: a.title
			}),
			T.length === 1 ? /* @__PURE__ */ v(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				children: T[0]
			}) : null,
			T.length > 1 ? /* @__PURE__ */ v(n, {
				as: "ul",
				gap: "xs",
				"data-testid": `${u}-detail`,
				className: "m-0 list-none p-0",
				children: T.map((e, t) => /* @__PURE__ */ v(i, {
					size: "xs",
					tone: "secondary",
					as: "li",
					children: e
				}, t))
			}) : null,
			p ? /* @__PURE__ */ y(n, {
				gap: "xs",
				children: [/* @__PURE__ */ v(f, {
					size: "sm",
					tone: "accent",
					"aria-label": "Decision",
					options: k,
					value: m,
					onChange: (e) => b(e),
					"data-testid": `${u}-decision`
				}), /* @__PURE__ */ v(l, {
					size: "sm",
					value: x,
					maxLength: 200,
					placeholder: p.notePlaceholder ?? "Note (optional)",
					"aria-label": "Note",
					onChange: (e) => S(e.target.value),
					"data-testid": `${u}-note`
				})]
			}) : null,
			/* @__PURE__ */ y(r, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ v(t, {
					variant: "secondary",
					size: "sm",
					onClick: a.onCancel,
					"data-testid": `${u}-cancel`,
					children: "Cancel"
				}), /* @__PURE__ */ v(t, {
					variant: "primary",
					size: "sm",
					onClick: C,
					"data-testid": `${u}-confirm`,
					children: "Confirm"
				})]
			})
		]
	});
}
function M(e) {
	if (typeof e == "string") return e;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function N({ turns: a, maxVisible: o = 4, onClear: s, pending: c = null, pendingChoice: l = null, className: u, "data-testid": d = "voice-turn-strip" }) {
	let f = o > 0 ? a.slice(-o) : a;
	return /* @__PURE__ */ y(n, {
		gap: "sm",
		className: e("min-w-0", u),
		"data-testid": d,
		children: [
			f.length === 0 && !c && !l ? /* @__PURE__ */ v(i, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${d}-empty`,
				children: "Nothing said yet."
			}) : null,
			f.map((e) => /* @__PURE__ */ y(n, {
				gap: "xs",
				"data-testid": `${d}-turn-${e.id}`,
				"data-role": e.role,
				children: [
					/* @__PURE__ */ y(r, {
						gap: "sm",
						children: [/* @__PURE__ */ v(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							children: e.role === "you" ? "You" : "Assistant"
						}), /* @__PURE__ */ v(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							children: M(e.at)
						})]
					}),
					/* @__PURE__ */ v(i, {
						size: "sm",
						tone: "primary",
						as: "p",
						wrap: !0,
						children: e.text
					}),
					e.toolCalls?.map((t, n) => /* @__PURE__ */ y(r, {
						gap: "sm",
						"data-testid": `${d}-tool-${e.id}-${n}`,
						"data-status": t.status,
						children: [
							/* @__PURE__ */ v(p, {
								size: "sm",
								tone: A[t.status],
								label: t.status
							}),
							/* @__PURE__ */ v(i, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: t.name
							}),
							/* @__PURE__ */ v(i, {
								size: "xs",
								tone: "tertiary",
								children: t.summary
							})
						]
					}, `${t.name}-${n}`))
				]
			}, e.id)),
			c ? /* @__PURE__ */ v(j, { pending: c }) : null,
			l ? /* @__PURE__ */ v(O, { choice: l }) : null,
			s && a.length > 0 ? /* @__PURE__ */ v(r, {
				justify: "end",
				children: /* @__PURE__ */ v(t, {
					variant: "ghost",
					size: "sm",
					onClick: s,
					"data-testid": `${d}-clear`,
					children: "Clear"
				})
			}) : null
		]
	});
}
//#endregion
//#region src/components/voice/VoiceDock.tsx
var P = {
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
function F(e) {
	let t = Math.max(0, Math.floor(e));
	return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
var I = (e) => `$${e.toFixed(2)}`;
function L({ phase: n, level: l, outputLevel: f, elapsedSeconds: b, budget: S = null, pending: C = null, pendingChoice: w = null, lastLine: T = null, onStart: E, onStop: k, onMute: A, muted: M = !1, unavailableReason: N, compact: L = !1, size: R = "panel", startLabel: z = "Voice", className: B, ref: V, "data-testid": H = "voice-dock" }) {
	let U = g(null), [W, G] = _(!1);
	h(() => G(!0), []);
	let K = m((e) => {
		U.current = e, typeof V == "function" ? V(e) : V && (V.current = e);
	}, [V]), q = n !== "off" && n !== "ended" && n !== "unavailable", J = W && !!C && n === "confirming", Y = W && !!w && n === "confirming", X = n === "unavailable" ? N : void 0, Z = x[n], Q = R === "footer";
	return /* @__PURE__ */ y(r, {
		ref: K,
		wrap: !1,
		gap: "sm",
		className: e("min-w-0", Q ? "px-1" : "px-2 py-1", B),
		"data-testid": H,
		"data-phase": n,
		"data-size": R,
		"data-voice-dock": "",
		children: [
			/* @__PURE__ */ v(D, {
				level: l,
				outputLevel: f,
				phase: n,
				size: L || Q ? "sm" : "md",
				"data-testid": `${H}-ring`
			}),
			/* @__PURE__ */ v(i, {
				title: X,
				"data-testid": `${H}-phase`,
				children: Q ? /* @__PURE__ */ v(i, {
					size: "xs",
					tone: "secondary",
					className: "whitespace-nowrap",
					role: "status",
					children: Z
				}) : /* @__PURE__ */ v(p, {
					size: "sm",
					tone: P[n],
					label: Z
				})
			}),
			!L && T ? /* @__PURE__ */ v(i, {
				size: Q ? "xs" : "sm",
				tone: T.role === "you" ? "secondary" : "primary",
				className: "min-w-0 flex-1 truncate",
				title: T.text,
				"data-testid": `${H}-last-line`,
				"data-role": T.role,
				children: T.text
			}) : /* @__PURE__ */ v(i, {
				className: "min-w-0 flex-1",
				"aria-hidden": "true",
				children: ""
			}),
			!L && S && q ? /* @__PURE__ */ v(d, {
				value: S.holdUsd > 0 ? S.usedUsd / S.holdUsd : 0,
				segments: 5,
				showPercent: !1,
				note: `${I(S.usedUsd)} of ${I(S.holdUsd)}`,
				tone: "surface",
				"data-testid": `${H}-budget`
			}) : null,
			q && b !== void 0 ? /* @__PURE__ */ v(i, {
				size: "xs",
				tone: "tertiary",
				tabular: !0,
				"data-testid": `${H}-elapsed`,
				children: F(b)
			}) : null,
			q && A ? /* @__PURE__ */ v(a, {
				"aria-label": M ? "Unmute microphone" : "Mute microphone",
				"aria-pressed": M,
				size: "sm",
				variant: "ghost",
				icon: v(M ? o : s, { size: 16 }),
				onClick: A,
				"data-testid": `${H}-mute`
			}) : null,
			Q ? q ? /* @__PURE__ */ y(t, {
				variant: "ghost",
				size: "sm",
				"aria-label": "End voice session",
				className: "gap-1.5",
				onClick: k,
				"data-testid": `${H}-stop`,
				children: [/* @__PURE__ */ v(c, {
					size: 16,
					className: "text-danger"
				}), "End"]
			}) : /* @__PURE__ */ y(t, {
				variant: "ghost",
				size: "sm",
				"aria-label": "Start voice session",
				className: "gap-1.5",
				disabled: n === "unavailable" || !E,
				title: X,
				onClick: E,
				"data-testid": `${H}-start`,
				children: [/* @__PURE__ */ v(s, { size: 16 }), z]
			}) : q ? /* @__PURE__ */ v(a, {
				"aria-label": "End voice session",
				size: "sm",
				variant: "danger",
				icon: /* @__PURE__ */ v(c, { size: 16 }),
				onClick: k,
				"data-testid": `${H}-stop`
			}) : /* @__PURE__ */ v(a, {
				"aria-label": "Start voice session",
				size: "sm",
				variant: "primary",
				icon: /* @__PURE__ */ v(s, { size: 16 }),
				disabled: n === "unavailable" || !E,
				title: X,
				onClick: E,
				"data-testid": `${H}-start`
			}),
			C ? /* @__PURE__ */ v(u, {
				trigger: U,
				open: J,
				onClose: C.onCancel,
				placement: "bottom-start",
				"aria-label": `Confirm: ${C.title}`,
				kind: "voice-confirm",
				"data-testid": `${H}-pending`,
				children: /* @__PURE__ */ v(j, {
					pending: C,
					handleEscape: !1
				})
			}) : null,
			w ? /* @__PURE__ */ v(u, {
				trigger: U,
				open: Y,
				onClose: w.onCancel,
				placement: "bottom-start",
				"aria-label": `Choose: ${w.title}`,
				kind: "voice-choice",
				"data-testid": `${H}-pending-choice`,
				children: /* @__PURE__ */ v(O, {
					choice: w,
					handleEscape: !1,
					compact: Q
				})
			}) : null
		]
	});
}
//#endregion
export { C as VOICE_CHOICE_MAX, S as VOICE_NOTE_MAX, b as VOICE_PHASES, x as VOICE_PHASE_LABEL, D as VoiceActivityRing, O as VoiceChoiceCard, j as VoiceConfirmCard, L as VoiceDock, N as VoiceTurnStrip };
