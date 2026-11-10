import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { i as n, r, t as i } from "./Text-CEOhQu1A.js";
import { t as a } from "./IconButton-BgM9MvwA.js";
import { P as o } from "./Icons-CqVFbuiZ.js";
import { a as s, i as c, t as l, u } from "./MediaIcons-_ai5Til2.js";
import { t as d } from "./Input-DiOEvL5h.js";
import { t as f } from "./InlinePopover-qnf51Wbc.js";
import { t as p } from "./SegmentedControl-DMudc23g.js";
import { t as m } from "./StatusPill-AqmSksrZ.js";
import { t as h } from "./Switch-CRiY_kzy.js";
import { t as g } from "./DotMeter-DJzl5dNX.js";
import { useCallback as _, useEffect as v, useId as y, useRef as b, useState as x } from "react";
import { jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/voice/voiceTypes.ts
var w = [
	"off",
	"connecting",
	"listening",
	"thinking",
	"executing",
	"speaking",
	"confirming",
	"ended",
	"unavailable"
], T = {
	off: "Voice off",
	connecting: "Connecting",
	listening: "Listening",
	thinking: "Thinking",
	executing: "Working",
	speaking: "Speaking",
	confirming: "Confirm",
	ended: "Ended",
	unavailable: "Unavailable"
}, E = 200, D = 10;
function O(e) {
	return typeof e != "number" || Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
//#endregion
//#region src/components/voice/VoiceActivityRing.tsx
var k = {
	sm: "size-4.5",
	md: "size-9"
}, A = {
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
function j({ level: t = 0, outputLevel: n = 0, phase: r, size: i = "md", label: a, className: o, "data-testid": s }) {
	let c = O(t), l = O(n), u = r === "thinking" || r === "executing" || r === "connecting", d = r === "listening" ? 1.5 + c * 3.5 : 2, f = r === "speaking" ? .25 + l * .6 : 0;
	return /* @__PURE__ */ C("svg", {
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
		className: e("shrink-0", k[i], A[r], u && "motion-safe:animate-spin", o),
		children: [
			r === "speaking" && /* @__PURE__ */ S("circle", {
				cx: "12",
				cy: "12",
				r: "11",
				strokeWidth: 1,
				strokeOpacity: f,
				className: "motion-safe:animate-pulse",
				"data-part": "halo"
			}),
			/* @__PURE__ */ S("circle", {
				cx: "12",
				cy: "12",
				r: "8",
				strokeWidth: d,
				strokeDasharray: u ? "30 21" : void 0,
				strokeOpacity: r === "off" || r === "ended" || r === "unavailable" ? .6 : 1,
				"data-part": "ring"
			}),
			r === "unavailable" && /* @__PURE__ */ S("line", {
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
function M(e) {
	let { choice: t } = e;
	return /* @__PURE__ */ S(N, { ...e }, t.requestId ?? t.title);
}
function N({ choice: a, handleEscape: o = !0, autoFocus: s = !0, compact: c = !1, className: l, "data-testid": u = "voice-choice-card" }) {
	let d = b(null), f = a.candidates.slice(0, 10), p = f.length, h = (e) => typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= p, [g, _] = x(h(a.ordinal) ? a.ordinal - 1 : 0);
	v(() => {
		s && d.current?.focus();
	}, [s]);
	let y = b(void 0), w = b(a.onChoose);
	w.current = a.onChoose, v(() => {
		if (!h(a.ordinal)) {
			y.current = void 0;
			return;
		}
		_(a.ordinal - 1), y.current !== a.ordinal && (y.current = a.ordinal, w.current(a.ordinal - 1));
	}, [a.ordinal, p]);
	let T = (e) => {
		if (p === 0) return;
		let t = (e % p + p) % p;
		_(t), d.current?.querySelectorAll("[data-part=\"row\"]")[t]?.focus();
	};
	return /* @__PURE__ */ C(n, {
		ref: d,
		gap: c ? "xs" : "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Choose: ${a.title}`,
		onKeyDown: (e) => {
			if (e.key === "Escape" && o) e.stopPropagation(), a.onCancel();
			else if (e.key === "ArrowDown" || e.key === "ArrowRight") e.preventDefault(), T(g + 1);
			else if (e.key === "ArrowUp" || e.key === "ArrowLeft") e.preventDefault(), T(g - 1);
			else if ((e.key === "Enter" || e.key === " ") && e.target instanceof HTMLElement && e.target.dataset.part === "row") e.preventDefault(), a.onChoose(Number(e.target.dataset.ordinal) - 1);
			else if (/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
				let t = e.key === "0" ? 10 : Number(e.key);
				t <= p && (e.preventDefault(), a.onChoose(t - 1));
			}
		},
		"data-testid": u,
		"data-compact": c ? "true" : void 0,
		className: e("rounded-md border border-solid border-warning/40 bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary", c ? "p-2" : "p-3", l),
		children: [
			/* @__PURE__ */ S(i, {
				size: c ? "xs" : "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: a.title
			}),
			/* @__PURE__ */ S(n, {
				gap: "xs",
				role: "listbox",
				"aria-label": a.title,
				children: f.map((t, o) => {
					let s = o === g;
					return /* @__PURE__ */ C("div", {
						role: "option",
						"aria-selected": s,
						"data-part": "row",
						"data-ordinal": o + 1,
						"data-selected": s ? "true" : void 0,
						"data-href": t.href,
						title: t.href,
						tabIndex: s ? 0 : -1,
						onClick: () => a.onChoose(o),
						onFocus: () => _(o),
						"data-testid": `${u}-row-${o + 1}`,
						className: e("flex w-full min-w-0 cursor-pointer items-start gap-2 rounded-md border border-solid bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-surface-hover", c ? "px-1.5 py-1" : "px-2 py-1.5", s ? "border-primary bg-surface-hover" : "border-transparent"),
						children: [/* @__PURE__ */ S(i, {
							size: "xs",
							weight: "semibold",
							tone: "secondary",
							tabular: !0,
							children: o + 1
						}), /* @__PURE__ */ C(n, {
							gap: "xs",
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ C(r, {
								gap: "sm",
								wrap: !1,
								className: "min-w-0",
								children: [/* @__PURE__ */ S(i, {
									size: c ? "xs" : "sm",
									weight: "medium",
									tone: "primary",
									className: "min-w-0 truncate",
									children: t.title
								}), t.kind ? /* @__PURE__ */ S(m, {
									size: "sm",
									tone: "neutral",
									label: t.kind
								}) : null]
							}), t.subtitle ? /* @__PURE__ */ S(i, {
								size: "xs",
								tone: "tertiary",
								className: "min-w-0 truncate",
								children: t.subtitle
							}) : null]
						})]
					}, o);
				})
			}),
			/* @__PURE__ */ S(r, {
				gap: "sm",
				justify: "end",
				children: /* @__PURE__ */ S(t, {
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
var P = [{
	label: "Approve",
	value: "approve"
}, {
	label: "Reject",
	value: "reject"
}], F = {
	running: "info",
	done: "success",
	refused: "warning",
	failed: "danger"
};
function I(e, t) {
	return typeof e == "function" ? e(t) || "Confirm" : e ?? "Confirm";
}
function L(e) {
	let { pending: t } = e;
	return /* @__PURE__ */ S(R, { ...e }, t.requestId ?? t.title);
}
function R({ pending: a, handleEscape: o = !0, autoFocus: s = !0, hint: c, noteDefault: l = a.noteDefault, noteLabel: u = a.noteLabel, noteMaxLength: f = a.noteMaxLength, confirmLabel: m = a.confirmLabel, cancelLabel: h = a.cancelLabel ?? "Cancel", hideDecisionToggle: g = a.hideDecisionToggle ?? !1, clickOnly: _ = a.clickOnly ?? !1, className: w, "data-testid": T = "voice-confirm-card" }) {
	let E = y(), D = y(), O = b(null);
	v(() => {
		s && O.current?.focus();
	}, [s]);
	let { fields: k } = a, A = !!k || l !== void 0, j = !!k && !g, M = f && f > 0 ? Math.floor(f) : 200, [N, F] = x(k?.decision ?? "approve"), L = I(m, N), R = c ?? a.hint ?? (_ ? `Check it, then click ${L}; say cancel to drop it.` : void 0), [z, B] = x(() => (l ?? "").slice(0, M)), V = () => {
		A ? a.onConfirm({
			decision: N,
			note: z.trim().slice(0, M).trim()
		}) : a.onConfirm();
	}, ee = (e) => {
		e.key === "Escape" && o ? (e.stopPropagation(), a.onCancel()) : e.key === "Enter" && (e.target === e.currentTarget || A && e.target instanceof HTMLInputElement) && (e.preventDefault(), V());
	}, H = Array.isArray(a.detail) ? a.detail.filter(Boolean) : a.detail ? [a.detail] : [];
	return /* @__PURE__ */ C(n, {
		ref: O,
		gap: "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Confirm: ${a.title}`,
		onKeyDown: ee,
		"data-testid": T,
		"data-click-only": _ ? "" : void 0,
		className: e("rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary", w),
		children: [
			/* @__PURE__ */ S(i, {
				size: "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				clamp: 2,
				"data-testid": `${T}-title`,
				children: a.title
			}),
			H.length === 1 ? /* @__PURE__ */ S(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				children: H[0]
			}) : null,
			H.length > 1 ? /* @__PURE__ */ S(n, {
				as: "ul",
				gap: "xs",
				"data-testid": `${T}-detail`,
				className: "m-0 list-none p-0",
				children: H.map((e, t) => /* @__PURE__ */ S(i, {
					size: "xs",
					tone: "secondary",
					as: "li",
					children: e
				}, t))
			}) : null,
			A ? /* @__PURE__ */ C(n, {
				gap: "xs",
				children: [
					j ? /* @__PURE__ */ S(p, {
						size: "sm",
						tone: "accent",
						"aria-label": "Decision",
						options: P,
						value: N,
						onChange: (e) => F(e),
						"data-testid": `${T}-decision`
					}) : null,
					u || f ? /* @__PURE__ */ C(r, {
						gap: "sm",
						justify: "between",
						wrap: !1,
						children: [u ? /* @__PURE__ */ S(i, {
							id: D,
							size: "xs",
							weight: "medium",
							tone: "secondary",
							"data-testid": `${T}-note-label`,
							children: u
						}) : /* @__PURE__ */ S(i, {
							"aria-hidden": "true",
							children: ""
						}), f ? /* @__PURE__ */ S(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "shrink-0",
							"data-testid": `${T}-note-count`,
							children: `${z.length}/${M}`
						}) : null]
					}) : null,
					/* @__PURE__ */ S(d, {
						size: "sm",
						value: z,
						maxLength: M,
						placeholder: k?.notePlaceholder ?? (k ? "Note (optional)" : void 0),
						"aria-label": u ? void 0 : "Note",
						"aria-labelledby": u ? D : void 0,
						onChange: (e) => B(e.target.value),
						"data-testid": `${T}-note`
					})
				]
			}) : null,
			/* @__PURE__ */ C(r, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ S(t, {
					variant: "secondary",
					size: "sm",
					onClick: a.onCancel,
					"data-testid": `${T}-cancel`,
					children: h
				}), /* @__PURE__ */ S(t, {
					variant: "primary",
					size: "sm",
					onClick: V,
					"aria-describedby": R ? E : void 0,
					"data-testid": `${T}-confirm`,
					children: L
				})]
			}),
			R ? /* @__PURE__ */ S(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				id: E,
				clamp: 2,
				"data-testid": `${T}-hint`,
				children: R
			}) : null
		]
	});
}
function z(e) {
	if (typeof e == "string") return e;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function B({ turns: a, maxVisible: s = 4, onClear: c, pending: l = null, pendingChoice: u = null, size: d = "panel", keepTranscript: f = !1, onKeepTranscriptChange: p, onOpenLog: g, className: _, "data-testid": v = "voice-turn-strip" }) {
	let b = d === "footer", x = y(), w = !b && s > 0 ? a.slice(-s) : a, T = p || g ? /* @__PURE__ */ C(r, {
		gap: "sm",
		justify: "between",
		className: "min-h-7",
		"data-testid": `${v}-extras`,
		children: [p ? /* @__PURE__ */ C(r, {
			gap: "sm",
			children: [/* @__PURE__ */ S(h, {
				size: "sm",
				checked: f,
				onChange: p,
				"aria-labelledby": x,
				"data-testid": `${v}-keep`
			}), /* @__PURE__ */ S(i, {
				id: x,
				size: "xs",
				tone: "secondary",
				children: "Keep transcripts on this device"
			})]
		}) : /* @__PURE__ */ S("span", {}), g ? /* @__PURE__ */ C(t, {
			variant: "ghost",
			size: "sm",
			className: "gap-1.5",
			onClick: g,
			"data-testid": `${v}-log`,
			children: [/* @__PURE__ */ S(o, { size: 16 }), "History"]
		}) : null]
	}) : null;
	return b ? /* @__PURE__ */ C(n, {
		gap: "xs",
		className: e("min-w-0", _),
		"data-testid": v,
		"data-size": "footer",
		children: [
			w.length === 0 && !l && !u ? /* @__PURE__ */ S(i, {
				size: "xs",
				tone: "tertiary",
				className: "min-h-7 leading-7",
				"data-testid": `${v}-empty`,
				children: "Nothing said yet."
			}) : null,
			w.length > 0 ? /* @__PURE__ */ S(n, {
				gap: "none",
				className: "max-h-21 overflow-y-auto",
				"data-testid": `${v}-list`,
				children: w.map((e) => /* @__PURE__ */ C(r, {
					wrap: !1,
					gap: "sm",
					className: "h-7 min-w-0 shrink-0",
					"data-testid": `${v}-turn-${e.id}`,
					"data-role": e.role,
					children: [
						/* @__PURE__ */ S(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							className: "shrink-0",
							children: e.role === "you" ? "You" : "Assistant"
						}),
						/* @__PURE__ */ S(i, {
							size: "xs",
							tone: "primary",
							className: "min-w-0 flex-1 truncate",
							title: e.text,
							children: e.text
						}),
						e.toolCalls?.map((t, n) => /* @__PURE__ */ C(r, {
							gap: "xs",
							className: "shrink-0",
							"data-testid": `${v}-tool-${e.id}-${n}`,
							"data-status": t.status,
							children: [/* @__PURE__ */ S(m, {
								size: "sm",
								tone: F[t.status],
								label: t.status
							}), /* @__PURE__ */ S(i, {
								size: "xs",
								tone: "secondary",
								children: t.name
							})]
						}, `${t.name}-${n}`)),
						/* @__PURE__ */ S(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "shrink-0",
							children: z(e.at)
						})
					]
				}, e.id))
			}) : null,
			l ? /* @__PURE__ */ S(L, { pending: l }) : null,
			u ? /* @__PURE__ */ S(M, {
				choice: u,
				compact: !0
			}) : null,
			T,
			c && a.length > 0 ? /* @__PURE__ */ S(r, {
				justify: "end",
				children: /* @__PURE__ */ S(t, {
					variant: "ghost",
					size: "sm",
					onClick: c,
					"data-testid": `${v}-clear`,
					children: "Clear"
				})
			}) : null
		]
	}) : /* @__PURE__ */ C(n, {
		gap: "sm",
		className: e("min-w-0", _),
		"data-testid": v,
		children: [
			w.length === 0 && !l && !u ? /* @__PURE__ */ S(i, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${v}-empty`,
				children: "Nothing said yet."
			}) : null,
			w.map((e) => /* @__PURE__ */ C(n, {
				gap: "xs",
				"data-testid": `${v}-turn-${e.id}`,
				"data-role": e.role,
				children: [
					/* @__PURE__ */ C(r, {
						gap: "sm",
						children: [/* @__PURE__ */ S(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							children: e.role === "you" ? "You" : "Assistant"
						}), /* @__PURE__ */ S(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							children: z(e.at)
						})]
					}),
					/* @__PURE__ */ S(i, {
						size: "sm",
						tone: "primary",
						as: "p",
						wrap: !0,
						children: e.text
					}),
					e.toolCalls?.map((t, n) => /* @__PURE__ */ C(r, {
						gap: "sm",
						"data-testid": `${v}-tool-${e.id}-${n}`,
						"data-status": t.status,
						children: [
							/* @__PURE__ */ S(m, {
								size: "sm",
								tone: F[t.status],
								label: t.status
							}),
							/* @__PURE__ */ S(i, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: t.name
							}),
							/* @__PURE__ */ S(i, {
								size: "xs",
								tone: "tertiary",
								children: t.summary
							})
						]
					}, `${t.name}-${n}`))
				]
			}, e.id)),
			l ? /* @__PURE__ */ S(L, { pending: l }) : null,
			u ? /* @__PURE__ */ S(M, { choice: u }) : null,
			T,
			c && a.length > 0 ? /* @__PURE__ */ S(r, {
				justify: "end",
				children: /* @__PURE__ */ S(t, {
					variant: "ghost",
					size: "sm",
					onClick: c,
					"data-testid": `${v}-clear`,
					children: "Clear"
				})
			}) : null
		]
	});
}
//#endregion
//#region src/components/voice/VoiceDock.tsx
var V = "w-md max-w-[calc(100vw-1rem)]", ee = {
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
function H(e) {
	let t = Math.max(0, Math.floor(e));
	return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
var te = 600, ne = (e) => `$${e.toFixed(2)}`;
function U({ phase: d, level: p, outputLevel: h, elapsedSeconds: y, budget: w = null, pending: E = null, pendingChoice: D = null, lastLine: O = null, onStart: k, onStop: A, onMute: N, muted: P = !1, unavailableReason: F, compact: I = !1, size: R = "panel", startLabel: z = "Voice", transcriptOpen: U = !1, onToggleTranscript: re, onOpenLog: W, turns: ie = [], keepTranscript: ae, onKeepTranscriptChange: oe, pulse: G = !1, cardPlacement: se, className: ce, ref: K, "data-testid": q = "voice-dock" }) {
	let [J, le] = x(!1);
	v(() => {
		if (!G) return;
		le(!0);
		let e = setTimeout(() => le(!1), te);
		return () => clearTimeout(e);
	}, [G]);
	let Y = J ? "motion-safe:animate-[pulse_600ms_ease-out_1]" : void 0, X = b(null), [ue, de] = x(!1);
	v(() => de(!0), []);
	let fe = _((e) => {
		typeof K == "function" ? K(e) : K && (K.current = e);
	}, [K]), Z = d !== "off" && d !== "ended" && d !== "unavailable", pe = ue && !!D, me = ue && !!E && !D, Q = d === "unavailable" ? F : void 0, he = T[d], $ = R === "footer", ge = se ?? ($ ? "top-start" : "bottom-start");
	return /* @__PURE__ */ C(n, {
		ref: fe,
		gap: "none",
		className: e("min-w-0", ce),
		"data-testid": q,
		"data-phase": d,
		"data-size": R,
		"data-voice-dock": "",
		children: [U ? /* @__PURE__ */ S("div", {
			className: e("min-w-0 border-0 border-b border-solid border-border", $ ? "px-1 py-1" : "px-2 py-1"),
			"data-testid": `${q}-transcript`,
			children: /* @__PURE__ */ S(B, {
				turns: ie,
				size: $ ? "footer" : "panel",
				keepTranscript: ae,
				onKeepTranscriptChange: oe,
				onOpenLog: W,
				"data-testid": `${q}-strip`
			})
		}) : null, /* @__PURE__ */ C(r, {
			ref: X,
			wrap: !1,
			gap: "sm",
			className: e("min-w-0", $ ? "px-1" : "px-2 py-1"),
			"data-testid": `${q}-row`,
			children: [
				/* @__PURE__ */ S(j, {
					level: p,
					outputLevel: h,
					phase: d,
					size: I || $ ? "sm" : "md",
					"data-testid": `${q}-ring`
				}),
				/* @__PURE__ */ S(i, {
					title: Q,
					role: "status",
					"aria-live": "polite",
					"data-testid": `${q}-phase`,
					children: $ ? /* @__PURE__ */ S(i, {
						size: "xs",
						tone: "secondary",
						className: "whitespace-nowrap",
						children: he
					}) : /* @__PURE__ */ S(m, {
						size: "sm",
						tone: ee[d],
						label: he
					})
				}),
				!I && O ? /* @__PURE__ */ S(i, {
					size: $ ? "xs" : "sm",
					tone: O.role === "you" ? "secondary" : "primary",
					className: "min-w-0 flex-1 truncate",
					title: O.text,
					"data-testid": `${q}-last-line`,
					"data-role": O.role,
					children: O.text
				}) : /* @__PURE__ */ S(i, {
					className: "min-w-0 flex-1",
					"aria-hidden": "true",
					children: ""
				}),
				!I && w && Z ? /* @__PURE__ */ S(g, {
					value: w.holdUsd > 0 ? w.usedUsd / w.holdUsd : 0,
					segments: 5,
					showPercent: !1,
					note: `${ne(w.usedUsd)} of ${ne(w.holdUsd)}`,
					tone: "surface",
					"data-testid": `${q}-budget`
				}) : null,
				Z && y !== void 0 ? /* @__PURE__ */ S(i, {
					size: "xs",
					tone: "tertiary",
					tabular: !0,
					"data-testid": `${q}-elapsed`,
					children: H(y)
				}) : null,
				Z && N ? /* @__PURE__ */ S(a, {
					"aria-label": P ? "Unmute microphone" : "Mute microphone",
					"aria-pressed": P,
					size: "sm",
					variant: "ghost",
					icon: S(P ? s : c, { size: 16 }),
					onClick: N,
					"data-testid": `${q}-mute`
				}) : null,
				re ? /* @__PURE__ */ S(a, {
					"aria-label": U ? "Hide transcript" : "Show transcript",
					"aria-pressed": U,
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ S(l, { size: 16 }),
					onClick: re,
					"data-testid": `${q}-cc`
				}) : null,
				W ? /* @__PURE__ */ S(a, {
					"aria-label": "Open voice history",
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ S(o, { size: 16 }),
					onClick: W,
					"data-testid": `${q}-history`
				}) : null,
				$ ? Z ? /* @__PURE__ */ C(t, {
					variant: "ghost",
					size: "sm",
					"aria-label": "End voice session",
					className: e("gap-1.5", Y),
					"data-pulse": J ? "" : void 0,
					onClick: A,
					"data-testid": `${q}-stop`,
					children: [/* @__PURE__ */ S(u, {
						size: 16,
						className: "text-danger"
					}), "End"]
				}) : /* @__PURE__ */ C(t, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Start voice session",
					className: e("gap-1.5", Y),
					"data-pulse": J ? "" : void 0,
					disabled: d === "unavailable" || !k,
					title: Q,
					onClick: k,
					"data-testid": `${q}-start`,
					children: [/* @__PURE__ */ S(c, { size: 16 }), z]
				}) : Z ? /* @__PURE__ */ S(a, {
					"aria-label": "End voice session",
					size: "sm",
					variant: "danger",
					className: Y,
					"data-pulse": J ? "" : void 0,
					icon: /* @__PURE__ */ S(u, { size: 16 }),
					onClick: A,
					"data-testid": `${q}-stop`
				}) : /* @__PURE__ */ S(a, {
					"aria-label": "Start voice session",
					size: "sm",
					variant: "primary",
					className: Y,
					"data-pulse": J ? "" : void 0,
					icon: /* @__PURE__ */ S(c, { size: 16 }),
					disabled: d === "unavailable" || !k,
					title: Q,
					onClick: k,
					"data-testid": `${q}-start`
				}),
				E ? /* @__PURE__ */ S(f, {
					trigger: X,
					open: me,
					onClose: E.onCancel,
					placement: ge,
					avoidKeepouts: !0,
					className: V,
					"aria-label": `Confirm: ${E.title}`,
					kind: "voice-confirm",
					"data-testid": `${q}-pending`,
					children: /* @__PURE__ */ S(L, {
						pending: E,
						handleEscape: !1
					})
				}) : null,
				D ? /* @__PURE__ */ S(f, {
					trigger: X,
					open: pe,
					onClose: D.onCancel,
					placement: ge,
					avoidKeepouts: !0,
					className: V,
					"aria-label": `Choose: ${D.title}`,
					kind: "voice-choice",
					"data-testid": `${q}-pending-choice`,
					children: /* @__PURE__ */ S(M, {
						choice: D,
						handleEscape: !1,
						compact: $
					})
				}) : null
			]
		})]
	});
}
//#endregion
export { D as VOICE_CHOICE_MAX, E as VOICE_NOTE_MAX, w as VOICE_PHASES, T as VOICE_PHASE_LABEL, j as VoiceActivityRing, M as VoiceChoiceCard, L as VoiceConfirmCard, U as VoiceDock, B as VoiceTurnStrip };
