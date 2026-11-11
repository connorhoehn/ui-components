import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { n, t as r } from "./Stack-CE1FjEn8.js";
import { t as i } from "./Text-XdCzxWMv.js";
import { t as a } from "./IconButton-BgM9MvwA.js";
import { J as o, P as s } from "./Icons-CqVFbuiZ.js";
import { a as c, i as l, t as u, u as d } from "./MediaIcons-_ai5Til2.js";
import { t as f } from "./Input-DiOEvL5h.js";
import { t as p } from "./InlinePopover-BJntntHW.js";
import { t as m } from "./DropdownMenu-DsOGcoH4.js";
import { t as h } from "./SegmentedControl-CO8w_o0t.js";
import { t as g } from "./StatusPill-AqmSksrZ.js";
import { t as _ } from "./Switch-CRiY_kzy.js";
import { t as v } from "./DotMeter-DJzl5dNX.js";
import { useCallback as y, useEffect as b, useId as x, useRef as S, useState as C } from "react";
import { jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/voice/voiceTypes.ts
var E = [
	"off",
	"connecting",
	"listening",
	"thinking",
	"executing",
	"speaking",
	"confirming",
	"ended",
	"unavailable"
], D = {
	off: "Voice off",
	connecting: "Connecting",
	listening: "Listening",
	thinking: "Thinking",
	executing: "Working",
	speaking: "Speaking",
	confirming: "Confirm",
	ended: "Ended",
	unavailable: "Unavailable"
}, O = 200, k = 10;
function A(e) {
	return typeof e != "number" || Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
//#endregion
//#region src/components/voice/VoiceActivityRing.tsx
var j = {
	sm: "size-4.5",
	md: "size-9"
}, M = {
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
function N({ level: t = 0, outputLevel: n = 0, phase: r, size: i = "md", label: a, className: o, "data-testid": s }) {
	let c = A(t), l = A(n), u = r === "thinking" || r === "executing" || r === "connecting", d = r === "listening" ? 1.5 + c * 3.5 : 2, f = r === "speaking" ? .25 + l * .6 : 0;
	return /* @__PURE__ */ T("svg", {
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
		className: e("shrink-0", j[i], M[r], u && "motion-safe:animate-spin", o),
		children: [
			r === "speaking" && /* @__PURE__ */ w("circle", {
				cx: "12",
				cy: "12",
				r: "11",
				strokeWidth: 1,
				strokeOpacity: f,
				className: "motion-safe:animate-pulse",
				"data-part": "halo"
			}),
			/* @__PURE__ */ w("circle", {
				cx: "12",
				cy: "12",
				r: "8",
				strokeWidth: d,
				strokeDasharray: u ? "30 21" : void 0,
				strokeOpacity: r === "off" || r === "ended" || r === "unavailable" ? .6 : 1,
				"data-part": "ring"
			}),
			r === "unavailable" && /* @__PURE__ */ w("line", {
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
//#region src/components/voice/voiceFocus.ts
function P(e) {
	return !e || !(e instanceof HTMLElement) ? !1 : e.isContentEditable || e.closest("[contenteditable=\"\"], [contenteditable=\"true\"]") || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement ? !0 : e instanceof HTMLInputElement && ![
		"button",
		"submit",
		"reset",
		"checkbox",
		"radio",
		"range",
		"color",
		"file",
		"image",
		"hidden"
	].includes(e.type);
}
function F(e) {
	if (typeof document > "u" || !e) return !1;
	let t = document.activeElement;
	return t && e.contains(t) ? !1 : !P(t);
}
//#endregion
//#region src/components/voice/VoiceChoiceCard.tsx
function I(e) {
	let { choice: t } = e;
	return /* @__PURE__ */ w(L, { ...e }, t.requestId ?? t.title);
}
function L({ choice: a, handleEscape: o = !0, autoFocus: s = !0, compact: c = !1, className: l, "data-testid": u = "voice-choice-card" }) {
	let d = S(null), f = a.candidates.slice(0, 10), p = f.length, m = (e) => typeof e == "number" && Number.isInteger(e) && e >= 1 && e <= p, [h, _] = C(m(a.ordinal) ? a.ordinal - 1 : 0);
	b(() => {
		s && F(d.current) && d.current?.focus();
	}, [s]);
	let v = S(void 0), y = S(a.onChoose);
	y.current = a.onChoose, b(() => {
		if (!m(a.ordinal)) {
			v.current = void 0;
			return;
		}
		_(a.ordinal - 1), v.current !== a.ordinal && (v.current = a.ordinal, y.current(a.ordinal - 1));
	}, [a.ordinal, p]);
	let x = (e) => {
		if (p === 0) return;
		let t = (e % p + p) % p;
		_(t), d.current?.querySelectorAll("[data-part=\"row\"]")[t]?.focus();
	};
	return /* @__PURE__ */ T(n, {
		ref: d,
		gap: c ? "xs" : "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Choose: ${a.title}`,
		onKeyDown: (e) => {
			if (e.key === "Escape" && o) e.stopPropagation(), a.onCancel();
			else if (e.key === "ArrowDown" || e.key === "ArrowRight") e.preventDefault(), x(h + 1);
			else if (e.key === "ArrowUp" || e.key === "ArrowLeft") e.preventDefault(), x(h - 1);
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
			/* @__PURE__ */ w(i, {
				size: c ? "xs" : "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				children: a.title
			}),
			/* @__PURE__ */ w(n, {
				gap: "xs",
				role: "listbox",
				"aria-label": a.title,
				children: f.map((t, o) => {
					let s = o === h;
					return /* @__PURE__ */ T("div", {
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
						children: [/* @__PURE__ */ w(i, {
							size: "xs",
							weight: "semibold",
							tone: "secondary",
							tabular: !0,
							children: o + 1
						}), /* @__PURE__ */ T(n, {
							gap: "xs",
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ T(r, {
								gap: "sm",
								wrap: !1,
								className: "min-w-0",
								children: [/* @__PURE__ */ w(i, {
									size: c ? "xs" : "sm",
									weight: "medium",
									tone: "primary",
									className: "min-w-0 truncate",
									children: t.title
								}), t.kind ? /* @__PURE__ */ w(g, {
									size: "sm",
									tone: "neutral",
									label: t.kind
								}) : null]
							}), t.subtitle ? /* @__PURE__ */ w(i, {
								size: "xs",
								tone: "tertiary",
								className: "min-w-0 truncate",
								children: t.subtitle
							}) : null]
						})]
					}, o);
				})
			}),
			/* @__PURE__ */ w(r, {
				gap: "sm",
				justify: "end",
				children: /* @__PURE__ */ w(t, {
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
var R = [{
	label: "Approve",
	value: "approve"
}, {
	label: "Reject",
	value: "reject"
}], z = {
	running: "info",
	done: "success",
	refused: "warning",
	failed: "danger"
};
function ee(e, t) {
	return typeof e == "function" ? e(t) || "Confirm" : e ?? "Confirm";
}
function B(e) {
	let { pending: t } = e;
	return /* @__PURE__ */ w(V, { ...e }, t.requestId ?? t.title);
}
function V({ pending: a, handleEscape: o = !0, autoFocus: s = !0, hint: c, noteDefault: l = a.noteDefault, noteLabel: u = a.noteLabel, noteMaxLength: d = a.noteMaxLength, confirmLabel: p = a.confirmLabel, cancelLabel: m = a.cancelLabel ?? "Cancel", hideDecisionToggle: g = a.hideDecisionToggle ?? !1, clickOnly: _ = a.clickOnly ?? !1, submitOnEnter: v = a.submitOnEnter ?? !1, className: y, "data-testid": E = "voice-confirm-card" }) {
	let D = x(), O = x(), k = S(null);
	b(() => {
		s && F(k.current) && k.current?.focus();
	}, [s]);
	let [A, j] = C("");
	b(() => {
		j(`Confirmation needed: ${a.title}`);
	}, [a.title]);
	let { fields: M } = a, N = !!M || l !== void 0, P = !!M && !g, I = d && d > 0 ? Math.floor(d) : 200, [L, z] = C(M?.decision ?? "approve"), B = ee(p, L), V = c ?? a.hint ?? (_ ? `Check it, then click ${B}; say cancel to drop it.` : void 0), [H, te] = C(() => (l ?? "").slice(0, I)), U = () => {
		N ? a.onConfirm({
			decision: L,
			note: H.trim().slice(0, I).trim()
		}) : a.onConfirm();
	}, ne = (e) => {
		e.key === "Escape" && o ? (e.stopPropagation(), a.onCancel()) : e.key === "Enter" && N && e.target instanceof HTMLInputElement && (e.preventDefault(), v && U());
	}, W = Array.isArray(a.detail) ? a.detail.filter(Boolean) : a.detail ? [a.detail] : [];
	return /* @__PURE__ */ T(n, {
		ref: k,
		gap: "sm",
		tabIndex: 0,
		role: "group",
		"aria-label": `Confirm: ${a.title}`,
		onKeyDown: ne,
		"data-testid": E,
		"data-click-only": _ ? "" : void 0,
		className: e("rounded-md border border-solid border-warning/40 bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary", y),
		children: [
			/* @__PURE__ */ w(i, {
				size: "sm",
				weight: "semibold",
				tone: "primary",
				as: "p",
				clamp: 2,
				"data-testid": `${E}-title`,
				children: a.title
			}),
			W.length === 1 ? /* @__PURE__ */ w(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				children: W[0]
			}) : null,
			W.length > 1 ? /* @__PURE__ */ w(n, {
				as: "ul",
				gap: "xs",
				"data-testid": `${E}-detail`,
				className: "m-0 list-none p-0",
				children: W.map((e, t) => /* @__PURE__ */ w(i, {
					size: "xs",
					tone: "secondary",
					as: "li",
					children: e
				}, t))
			}) : null,
			N ? /* @__PURE__ */ T(n, {
				gap: "xs",
				children: [
					P ? /* @__PURE__ */ w(h, {
						size: "sm",
						tone: "accent",
						"aria-label": "Decision",
						options: R,
						value: L,
						onChange: (e) => z(e),
						"data-testid": `${E}-decision`
					}) : null,
					u || d ? /* @__PURE__ */ T(r, {
						gap: "sm",
						justify: "between",
						wrap: !1,
						children: [u ? /* @__PURE__ */ w(i, {
							id: O,
							size: "xs",
							weight: "medium",
							tone: "secondary",
							"data-testid": `${E}-note-label`,
							children: u
						}) : /* @__PURE__ */ w(i, {
							"aria-hidden": "true",
							children: ""
						}), d ? /* @__PURE__ */ w(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "shrink-0",
							"data-testid": `${E}-note-count`,
							children: `${H.length}/${I}`
						}) : null]
					}) : null,
					/* @__PURE__ */ w(f, {
						size: "sm",
						value: H,
						maxLength: I,
						placeholder: M?.notePlaceholder ?? (M ? "Note (optional)" : void 0),
						"aria-label": u ? void 0 : "Note",
						"aria-labelledby": u ? O : void 0,
						onChange: (e) => te(e.target.value),
						"data-testid": `${E}-note`
					})
				]
			}) : null,
			/* @__PURE__ */ T(r, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ w(t, {
					variant: "secondary",
					size: "sm",
					onClick: a.onCancel,
					"data-testid": `${E}-cancel`,
					children: m
				}), /* @__PURE__ */ w(t, {
					variant: "primary",
					size: "sm",
					onClick: U,
					"aria-describedby": V ? D : void 0,
					"data-testid": `${E}-confirm`,
					children: B
				})]
			}),
			V ? /* @__PURE__ */ w(i, {
				size: "xs",
				tone: "secondary",
				as: "p",
				id: D,
				clamp: 2,
				"data-testid": `${E}-hint`,
				children: V
			}) : null,
			/* @__PURE__ */ w(i, {
				className: "sr-only",
				role: "status",
				"aria-live": "polite",
				"data-testid": `${E}-announce`,
				children: A
			})
		]
	});
}
function H(e) {
	if (typeof e == "string") return e;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function te({ turns: a, maxVisible: o = 4, onClear: c, pending: l = null, pendingChoice: u = null, size: d = "panel", keepTranscript: f = !1, onKeepTranscriptChange: p, onOpenLog: m, className: h, "data-testid": v = "voice-turn-strip" }) {
	let y = d === "footer", b = x(), S = !y && o > 0 ? a.slice(-o) : a, C = p || m ? /* @__PURE__ */ T(r, {
		gap: "sm",
		justify: "between",
		className: "min-h-7",
		"data-testid": `${v}-extras`,
		children: [p ? /* @__PURE__ */ T(r, {
			gap: "sm",
			children: [/* @__PURE__ */ w(_, {
				size: "sm",
				checked: f,
				onChange: p,
				"aria-labelledby": b,
				"data-testid": `${v}-keep`
			}), /* @__PURE__ */ w(i, {
				id: b,
				size: "xs",
				tone: "secondary",
				children: "Keep transcripts on this device"
			})]
		}) : /* @__PURE__ */ w("span", {}), m ? /* @__PURE__ */ T(t, {
			variant: "ghost",
			size: "sm",
			className: "gap-1.5",
			onClick: m,
			"data-testid": `${v}-log`,
			children: [/* @__PURE__ */ w(s, { size: 16 }), "History"]
		}) : null]
	}) : null;
	return y ? /* @__PURE__ */ T(n, {
		gap: "xs",
		className: e("min-w-0", h),
		"data-testid": v,
		"data-size": "footer",
		children: [
			S.length === 0 && !l && !u ? /* @__PURE__ */ w(i, {
				size: "xs",
				tone: "tertiary",
				className: "min-h-7 leading-7",
				"data-testid": `${v}-empty`,
				children: "Nothing said yet."
			}) : null,
			S.length > 0 ? /* @__PURE__ */ w(n, {
				gap: "none",
				className: "max-h-21 overflow-y-auto",
				"data-testid": `${v}-list`,
				children: S.map((e) => /* @__PURE__ */ T(r, {
					wrap: !1,
					gap: "sm",
					className: "h-7 min-w-0 shrink-0",
					"data-testid": `${v}-turn-${e.id}`,
					"data-role": e.role,
					children: [
						/* @__PURE__ */ w(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							className: "shrink-0",
							children: e.role === "you" ? "You" : "Assistant"
						}),
						/* @__PURE__ */ w(i, {
							size: "xs",
							tone: "primary",
							className: "min-w-0 flex-1 truncate",
							title: e.text,
							children: e.text
						}),
						e.toolCalls?.map((t, n) => /* @__PURE__ */ T(r, {
							gap: "xs",
							className: "shrink-0",
							"data-testid": `${v}-tool-${e.id}-${n}`,
							"data-status": t.status,
							children: [/* @__PURE__ */ w(g, {
								size: "sm",
								tone: z[t.status],
								label: t.status
							}), /* @__PURE__ */ w(i, {
								size: "xs",
								tone: "secondary",
								children: t.name
							})]
						}, `${t.name}-${n}`)),
						/* @__PURE__ */ w(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "shrink-0",
							children: H(e.at)
						})
					]
				}, e.id))
			}) : null,
			l ? /* @__PURE__ */ w(B, { pending: l }) : null,
			u ? /* @__PURE__ */ w(I, {
				choice: u,
				compact: !0
			}) : null,
			C,
			c && a.length > 0 ? /* @__PURE__ */ w(r, {
				justify: "end",
				children: /* @__PURE__ */ w(t, {
					variant: "ghost",
					size: "sm",
					onClick: c,
					"data-testid": `${v}-clear`,
					children: "Clear"
				})
			}) : null
		]
	}) : /* @__PURE__ */ T(n, {
		gap: "sm",
		className: e("min-w-0", h),
		"data-testid": v,
		children: [
			S.length === 0 && !l && !u ? /* @__PURE__ */ w(i, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${v}-empty`,
				children: "Nothing said yet."
			}) : null,
			S.map((e) => /* @__PURE__ */ T(n, {
				gap: "xs",
				"data-testid": `${v}-turn-${e.id}`,
				"data-role": e.role,
				children: [
					/* @__PURE__ */ T(r, {
						gap: "sm",
						children: [/* @__PURE__ */ w(i, {
							size: "xs",
							weight: "semibold",
							tone: e.role === "you" ? "secondary" : "primary",
							children: e.role === "you" ? "You" : "Assistant"
						}), /* @__PURE__ */ w(i, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							children: H(e.at)
						})]
					}),
					/* @__PURE__ */ w(i, {
						size: "sm",
						tone: "primary",
						as: "p",
						wrap: !0,
						children: e.text
					}),
					e.toolCalls?.map((t, n) => /* @__PURE__ */ T(r, {
						gap: "sm",
						"data-testid": `${v}-tool-${e.id}-${n}`,
						"data-status": t.status,
						children: [
							/* @__PURE__ */ w(g, {
								size: "sm",
								tone: z[t.status],
								label: t.status
							}),
							/* @__PURE__ */ w(i, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: t.name
							}),
							/* @__PURE__ */ w(i, {
								size: "xs",
								tone: "tertiary",
								children: t.summary
							})
						]
					}, `${t.name}-${n}`))
				]
			}, e.id)),
			l ? /* @__PURE__ */ w(B, { pending: l }) : null,
			u ? /* @__PURE__ */ w(I, { choice: u }) : null,
			C,
			c && a.length > 0 ? /* @__PURE__ */ w(r, {
				justify: "end",
				children: /* @__PURE__ */ w(t, {
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
var U = "(max-width: 39.99rem)";
function ne(e, t) {
	let [n, r] = C(() => t && typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(e).matches);
	return b(() => {
		if (!t || typeof window > "u" || typeof window.matchMedia != "function") {
			r(!1);
			return;
		}
		let n = window.matchMedia(e), i = () => r(n.matches);
		return i(), n.addEventListener?.("change", i), () => n.removeEventListener?.("change", i);
	}, [e, t]), n;
}
var W = "w-md max-w-[calc(100vw-1rem)]", re = "w-auto p-2 shadow-xl", ie = {
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
function ae(e) {
	let t = Math.max(0, Math.floor(e));
	return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
var oe = 600, se = (e) => `$${e.toFixed(2)}`;
function G({ phase: f, level: h, outputLevel: _, elapsedSeconds: x, budget: E = null, pending: O = null, pendingChoice: k = null, lastLine: A = null, onStart: j, onStop: M, onMute: P, muted: F = !1, unavailableReason: L, compact: R = !1, size: z = "panel", startLabel: ee = "Voice", transcriptOpen: V = !1, onToggleTranscript: H, onOpenLog: G, turns: ce = [], keepTranscript: le, onKeepTranscriptChange: ue, pulse: de = !1, cardPlacement: fe, cardPresentation: pe = "auto", density: me = "default", className: he, ref: K, "data-testid": q = "voice-dock" }) {
	let [J, ge] = C(!1);
	b(() => {
		if (!de) return;
		ge(!0);
		let e = setTimeout(() => ge(!1), oe);
		return () => clearTimeout(e);
	}, [de]);
	let Y = J ? "motion-safe:animate-[pulse_600ms_ease-out_1]" : void 0, X = S(null), [_e, ve] = C(!1);
	b(() => ve(!0), []);
	let ye = y((e) => {
		typeof K == "function" ? K(e) : K && (K.current = e);
	}, [K]), Z = f !== "off" && f !== "ended" && f !== "unavailable", be = _e && !!k, xe = _e && !!O && !k, Se = f === "unavailable" ? L : void 0, Ce = D[f], Q = z === "footer", we = me === "compact", Te = we && !Z && !O && !k, Ee = ne(U, pe === "auto"), $ = pe === "sheet" || pe === "auto" && Ee, De = $ ? "sheet" : fe ?? (Q ? "top-start" : "bottom-start"), Oe = S(null);
	return Oe.current = $ ? X.current?.closest("footer, [data-uic-footer]") ?? X.current : X.current, /* @__PURE__ */ T(n, {
		ref: ye,
		gap: "none",
		className: e("min-w-0", he),
		"data-testid": q,
		"data-phase": f,
		"data-size": z,
		"data-density": me,
		"data-voice-dock": "",
		children: [V ? /* @__PURE__ */ w("div", {
			className: e("min-w-0 border-0 border-b border-solid border-border", Q ? "px-1 py-1" : "px-2 py-1"),
			"data-testid": `${q}-transcript`,
			children: /* @__PURE__ */ w(te, {
				turns: ce,
				size: Q ? "footer" : "panel",
				keepTranscript: le,
				onKeepTranscriptChange: ue,
				onOpenLog: G,
				"data-testid": `${q}-strip`
			})
		}) : null, /* @__PURE__ */ T(r, {
			ref: X,
			wrap: !1,
			gap: "sm",
			className: e("min-w-0", Q ? "px-1" : "px-2 py-1"),
			"data-testid": `${q}-row`,
			children: [
				Te ? null : /* @__PURE__ */ w(N, {
					level: h,
					outputLevel: _,
					phase: f,
					size: R || Q ? "sm" : "md",
					"data-testid": `${q}-ring`
				}),
				/* @__PURE__ */ w(i, {
					title: Se,
					role: "status",
					"aria-live": "polite",
					className: Te ? "sr-only" : void 0,
					"data-testid": `${q}-phase`,
					children: Q ? /* @__PURE__ */ w(i, {
						size: "xs",
						tone: "secondary",
						className: "whitespace-nowrap",
						children: Ce
					}) : /* @__PURE__ */ w(g, {
						size: "sm",
						tone: ie[f],
						label: Ce
					})
				}),
				!R && A ? /* @__PURE__ */ w(i, {
					size: Q ? "xs" : "sm",
					tone: A.role === "you" ? "secondary" : "primary",
					className: "min-w-0 flex-1 truncate",
					title: A.text,
					"data-testid": `${q}-last-line`,
					"data-role": A.role,
					children: A.text
				}) : /* @__PURE__ */ w(i, {
					className: "min-w-0 flex-1",
					"aria-hidden": "true",
					children: ""
				}),
				!R && E && Z ? /* @__PURE__ */ w(v, {
					value: E.holdUsd > 0 ? E.usedUsd / E.holdUsd : 0,
					segments: 5,
					showPercent: !1,
					note: `${se(E.usedUsd)} of ${se(E.holdUsd)}`,
					tone: "surface",
					"data-testid": `${q}-budget`
				}) : null,
				Z && x !== void 0 ? /* @__PURE__ */ w(i, {
					size: "xs",
					tone: "tertiary",
					tabular: !0,
					"data-testid": `${q}-elapsed`,
					children: ae(x)
				}) : null,
				Z && P ? /* @__PURE__ */ w(a, {
					"aria-label": F ? "Unmute microphone" : "Mute microphone",
					"aria-pressed": F,
					size: "sm",
					variant: "ghost",
					icon: w(F ? c : l, { size: 16 }),
					onClick: P,
					"data-testid": `${q}-mute`
				}) : null,
				we && (H || G) ? /* @__PURE__ */ w(m, {
					trigger: /* @__PURE__ */ w(o, { size: 16 }),
					triggerLabel: "More voice controls",
					triggerTitle: "More voice controls",
					triggerVariant: "link",
					triggerTestId: `${q}-overflow`,
					align: "end",
					"data-testid": `${q}-overflow-menu`,
					sections: [{ items: [...H ? [{
						label: V ? "Hide transcript" : "Show transcript",
						icon: /* @__PURE__ */ w(u, { size: 16 }),
						checked: V,
						onSelect: H,
						"data-testid": `${q}-cc`
					}] : [], ...G ? [{
						label: "Open voice history",
						icon: /* @__PURE__ */ w(s, { size: 16 }),
						onSelect: G,
						"data-testid": `${q}-history`
					}] : []] }]
				}) : null,
				!we && H ? /* @__PURE__ */ w(a, {
					"aria-label": V ? "Hide transcript" : "Show transcript",
					"aria-pressed": V,
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ w(u, { size: 16 }),
					onClick: H,
					"data-testid": `${q}-cc`
				}) : null,
				!we && G ? /* @__PURE__ */ w(a, {
					"aria-label": "Open voice history",
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ w(s, { size: 16 }),
					onClick: G,
					"data-testid": `${q}-history`
				}) : null,
				Q ? Z ? /* @__PURE__ */ T(t, {
					variant: "ghost",
					size: "sm",
					"aria-label": "End voice session",
					className: e("gap-1.5", Y),
					"data-pulse": J ? "" : void 0,
					onClick: M,
					"data-testid": `${q}-stop`,
					children: [/* @__PURE__ */ w(d, {
						size: 16,
						className: "text-danger"
					}), "End"]
				}) : /* @__PURE__ */ T(t, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Start voice session",
					className: e("gap-1.5", Y),
					"data-pulse": J ? "" : void 0,
					disabled: f === "unavailable" || !j,
					title: Se,
					onClick: j,
					"data-testid": `${q}-start`,
					children: [/* @__PURE__ */ w(l, { size: 16 }), ee]
				}) : Z ? /* @__PURE__ */ w(a, {
					"aria-label": "End voice session",
					size: "sm",
					variant: "danger",
					className: Y,
					"data-pulse": J ? "" : void 0,
					icon: /* @__PURE__ */ w(d, { size: 16 }),
					onClick: M,
					"data-testid": `${q}-stop`
				}) : /* @__PURE__ */ w(a, {
					"aria-label": "Start voice session",
					size: "sm",
					variant: "primary",
					className: Y,
					"data-pulse": J ? "" : void 0,
					icon: /* @__PURE__ */ w(l, { size: 16 }),
					disabled: f === "unavailable" || !j,
					title: Se,
					onClick: j,
					"data-testid": `${q}-start`
				}),
				O ? /* @__PURE__ */ w(p, {
					trigger: Oe,
					open: xe,
					onClose: O.onCancel,
					placement: De,
					avoidKeepouts: !$,
					className: $ ? re : W,
					"aria-label": `Confirm: ${O.title}`,
					kind: "voice-confirm",
					focusOnOpen: "none",
					escapeScope: "inside",
					trapFocus: !1,
					"data-testid": `${q}-pending`,
					children: /* @__PURE__ */ w(B, {
						pending: O,
						handleEscape: !1
					})
				}) : null,
				k ? /* @__PURE__ */ w(p, {
					trigger: Oe,
					open: be,
					onClose: k.onCancel,
					placement: De,
					avoidKeepouts: !$,
					className: $ ? re : W,
					"aria-label": `Choose: ${k.title}`,
					kind: "voice-choice",
					focusOnOpen: "none",
					escapeScope: "inside",
					trapFocus: !1,
					"data-testid": `${q}-pending-choice`,
					children: /* @__PURE__ */ w(I, {
						choice: k,
						handleEscape: !1,
						compact: Q
					})
				}) : null
			]
		})]
	});
}
//#endregion
export { k as VOICE_CHOICE_MAX, O as VOICE_NOTE_MAX, E as VOICE_PHASES, D as VOICE_PHASE_LABEL, U as VOICE_SHEET_QUERY, N as VoiceActivityRing, I as VoiceChoiceCard, B as VoiceConfirmCard, G as VoiceDock, te as VoiceTurnStrip };
