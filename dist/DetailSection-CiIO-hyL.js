import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./overlayStack-BFH9XXvN.js";
import { i as r, r as i } from "./focusTrap-CmWJlptm.js";
import { t as a } from "./Input-DLknWXri.js";
import { createContext as o, forwardRef as s, useCallback as c, useContext as l, useEffect as u, useId as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { createPortal as v } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var y = o(null);
function b({ value: e, children: t }) {
	return /* @__PURE__ */ g(y.Provider, {
		value: e,
		children: t
	});
}
function x() {
	let e = l(y);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var S = "'SF Mono', Menlo, monospace", C = 12, w = 1.5, T = C * w, E = 8, D = 10, O = 36;
function k({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let d = p(null), [h, v] = m(!1), y = f(() => Math.max(1, e.split("\n").length), [e]), b = f(() => {
		let e = Math.max(y, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [y, a]), x = Math.min(Math.max(y, a), o) * T + 16, k = y > o, A = (t) => {
		let r = d.current, i = e ?? "";
		if (!r) {
			n(i + t);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		n(i.slice(0, a) + t + i.slice(o)), queueMicrotask(() => {
			if (d.current) {
				let e = a + t.length;
				d.current.focus(), d.current.setSelectionRange(e, e);
			}
		});
	};
	return u(() => {
		let e = d.current;
		if (!e || !k) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [k]), /* @__PURE__ */ _("div", { children: [c && c.length > 0 && /* @__PURE__ */ g("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ g("button", {
			type: "button",
			onClick: () => A(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: S },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ _("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", h && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: S,
			fontSize: C,
			lineHeight: w,
			height: x
		},
		children: [/* @__PURE__ */ g("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: O,
				padding: `${E}px 6px`,
				fontFamily: S,
				lineHeight: w
			},
			children: b
		}), /* @__PURE__ */ g("textarea", {
			ref: d,
			value: e,
			onChange: (e) => {
				n(e.target.value);
			},
			onKeyDown: (e) => {
				s || e.key === "Tab" && (e.preventDefault(), A("  "));
			},
			onFocus: () => v(!0),
			onBlur: () => v(!1),
			placeholder: i,
			readOnly: s,
			"aria-label": l,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${E}px ${D}px`,
				fontFamily: S,
				fontSize: C,
				lineHeight: w,
				tabSize: 2,
				height: x,
				overflow: k ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var A = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function j({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ g("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function M({ value: e, onChange: t, curated: n }) {
	let [i, a] = m(!1), [o, s] = m(!1), [l, d] = m(""), f = p(null), h = p(null), v = n ?? A;
	u(() => {
		if (!i) return;
		let e = (e) => {
			let t = e.target;
			f.current && f.current.contains(t) || h.current && h.current.contains(t) || a(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [i]), r(i, c(() => a(!1), []));
	let y = (e) => {
		t(e), a(!1);
	}, b = () => {
		let e = l.trim();
		e.length !== 0 && (t(e), d(""), a(!1));
	};
	return /* @__PURE__ */ _("div", {
		className: "relative inline-block",
		ref: f,
		children: [/* @__PURE__ */ g("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": i,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ g("span", {
				"aria-hidden": !0,
				children: e
			})
		}), i ? /* @__PURE__ */ _("div", {
			ref: h,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ g("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: v.map((t, n) => /* @__PURE__ */ g(j, {
					emoji: t,
					active: t === e,
					onPick: y
				}, `${t}-${n}`))
			}), /* @__PURE__ */ _("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ g("input", {
					type: "text",
					value: l,
					onChange: (e) => d(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), b()) : e.key === "Escape" && a(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ g("button", {
					type: "button",
					onClick: b,
					disabled: l.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var N = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function P({ images: e, openIndex: r, onClose: a, onNavigate: o }) {
	let s = p(null), c = p(null), [l, d] = m(r);
	u(() => {
		d(r);
	}, [r]);
	let f = r !== null && e.length > 0, y = n(f), b = o ? r : l ?? r, x = b === null ? 0 : Math.min(Math.max(b, 0), e.length - 1), S = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (x + t + n) % n;
		o ? o(r) : d(r);
	};
	if (u(() => {
		if (f) return c.current = typeof document < "u" ? document.activeElement : null, s.current?.focus(), () => {
			let e = c.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), c.current = null;
		};
	}, [f]), u(() => {
		if (!f) return;
		let e = (e) => {
			y() && (e.key === "Tab" ? i(e, s.current) : e.key === "Escape" ? (e.stopPropagation(), a()) : e.key === "ArrowLeft" ? (e.preventDefault(), S(-1)) : e.key === "ArrowRight" && (e.preventDefault(), S(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		f,
		x,
		e.length,
		a,
		o,
		y
	]), !f) return null;
	let C = e[x], w = e.length > 1;
	return v(/* @__PURE__ */ _("div", {
		ref: s,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": C.caption ?? C.alt ?? `Image ${x + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: a,
		children: [
			/* @__PURE__ */ _("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					x + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ g("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), a();
				},
				children: "✕"
			}),
			/* @__PURE__ */ _("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ g("img", {
					"data-testid": "image-lightbox-img",
					src: C.src,
					alt: C.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), C.caption && /* @__PURE__ */ g("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: C.caption
				})]
			}),
			w && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(N, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), S(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ g("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(N, "right-3"),
				onClick: (e) => {
					e.stopPropagation(), S(1);
				},
				children: "›"
			})] })
		]
	}), document.body);
}
//#endregion
//#region src/components/shared/ScoreBarGauge.tsx
var F = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, I = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function L({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, u = r ?? (l >= n ? "success" : "danger"), d = (o ?? R)(l);
	return /* @__PURE__ */ _("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${d} (threshold ${R(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ g("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", I[i]),
			children: /* @__PURE__ */ g("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", F[u]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ g("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: d
		}) : null]
	});
}
function R(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function z({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ g("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = n ?? (p === m ? p - 1 : p), v = r ?? (p === m ? m + 1 : m), y = Math.max(1e-9, v - h), b = f.length === 1 ? 0 : i / (f.length - 1), x = s, S = a - x * 2, C = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * b,
		y: x + S - (e - h) / y * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${f.length} points, starts ${B(f[0])}, ends ${B(f[f.length - 1])}`;
	return /* @__PURE__ */ g("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ _("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ g("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ g("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ g("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function B(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function V(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function H({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = m(""), [c, l] = m(!1), u = p(null), d = (e) => {
		let r = V(e, a);
		if (r) {
			if (t.includes(r)) {
				s("");
				return;
			}
			n([...t, r]), s("");
		}
	}, h = (e) => {
		n(t.filter((t) => t !== e));
	}, v = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), d(o);
			return;
		}
		e.key === "Backspace" && o === "" && t.length > 0 && (e.preventDefault(), h(t[t.length - 1]));
	}, y = f(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), b = c && y.length > 0;
	return /* @__PURE__ */ _("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ _("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ g("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => h(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ _("div", {
			className: "relative",
			children: [/* @__PURE__ */ g("input", {
				ref: u,
				"data-testid": "tag-editor-input",
				type: "text",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: v,
				onFocus: () => l(!0),
				onBlur: () => {
					setTimeout(() => l(!1), 120);
				},
				"aria-label": e ?? (r || "Add tag"),
				placeholder: r,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), b ? /* @__PURE__ */ g("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: y.map((e) => /* @__PURE__ */ _("button", {
					type: "button",
					onMouseDown: (e) => {
						e.preventDefault();
					},
					onClick: () => d(e),
					className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary cursor-pointer border border-dashed border-border-emphasis",
					children: ["+ ", e]
				}, e))
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/shared/UserPicker.tsx
var U = "";
function W(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function G({ value: n, onChange: r, placeholder: i, maxSelect: a }) {
	let { presenceUsers: o } = x(), { idToken: s } = e(), [c, l] = m(""), [d, h] = m(!1), [v, y] = m(0), [b, S] = m([]), C = p(null), w = p(null), T = f(() => {
		let e = new Set(n), t = [];
		for (let n of o) e.has(n.clientId) || (e.add(n.clientId), t.push({
			userId: n.clientId,
			displayName: W(n.metadata, n.clientId)
		}));
		return t;
	}, [o, n]);
	u(() => {
		let e = c.trim();
		if (!e || !s) {
			S([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			let n = `${U}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${s}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				S(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [c, s]);
	let E = f(() => {
		let e = new Set(n), t = [];
		for (let n of T) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of b) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		T,
		b,
		n
	]), D = f(() => {
		let e = c.trim().toLowerCase();
		return e ? E.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : E;
	}, [E, c]), O = typeof a == "number" && n.length >= a, k = (e) => {
		let t = e.trim();
		t && (n.includes(t) || O || (r([...n, t]), l(""), y(0)));
	}, A = (e) => {
		r(n.filter((t) => t !== e));
	}, j = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), h(!0), y((e) => Math.min(e + 1, Math.max(D.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), y((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = D[v];
			t ? k(t.userId) : c.trim() && k(c.trim());
		} else e.key === "Escape" ? h(!1) : e.key === "Backspace" && !c && n.length > 0 && A(n[n.length - 1]);
	}, M = (e) => {
		let t = o.find((t) => t.clientId === e);
		if (t) return W(t.metadata, e);
		let n = b.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ _("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ g("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ _("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [M(e), /* @__PURE__ */ g("button", {
					type: "button",
					onClick: () => A(e),
					"aria-label": `Remove ${M(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ _("div", {
			className: "relative",
			children: [/* @__PURE__ */ g("input", {
				ref: C,
				type: "text",
				value: c,
				disabled: O,
				"aria-label": O ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: O ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					l(e.target.value), h(!0), y(0);
				},
				onFocus: () => h(!0),
				onBlur: () => {
					w.current = setTimeout(() => h(!1), 120);
				},
				onKeyDown: j,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), d && !O && D.length > 0 && /* @__PURE__ */ g("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), w.current && clearTimeout(w.current);
				},
				children: D.map((e, n) => /* @__PURE__ */ _("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => y(n),
					onClick: () => {
						k(e.userId), C.current?.focus();
					},
					children: [/* @__PURE__ */ g("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ g("span", {
						className: "text-text-tertiary ml-2 text-[11px] font-mono",
						children: e.userId.slice(0, 12)
					})]
				}, e.userId))
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/FilterChip.tsx
var K = {
	md: "px-3 py-1 text-[12.5px]",
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, q = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", J = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Y = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function X({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": l }) {
	let u = e && !!r, d = u ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ _("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", K[a], e ? u ? Y : J : q, c && "opacity-50 cursor-not-allowed", s),
		style: d,
		children: [i && /* @__PURE__ */ g("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/StatusPill.tsx
var Z = {
	success: {
		pill: "bg-success-bg border-success-border",
		dot: "bg-success",
		text: "text-success-fg"
	},
	error: {
		pill: "bg-danger-bg border-danger-border",
		dot: "bg-danger",
		text: "text-danger-fg"
	},
	warning: {
		pill: "bg-warning-bg border-warning-border",
		dot: "bg-warning",
		text: "text-warning-fg"
	},
	info: {
		pill: "bg-info-bg border-info-border",
		dot: "bg-info",
		text: "text-info-fg"
	},
	neutral: {
		pill: "bg-surface-hover border-border",
		dot: "bg-surface-emphasis",
		text: "text-text-primary"
	},
	pending: {
		pill: "bg-accent-bg border-accent-border",
		dot: "bg-accent",
		text: "text-accent-fg"
	}
}, ee = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, Q = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function te({ state: e, label: n, icon: r, size: i = "md", className: a, "data-testid": o }) {
	let s = Z[e] ?? Z.neutral ?? Object.values(Z)[0], c = e === "pending";
	return /* @__PURE__ */ _("span", {
		role: "status",
		"data-testid": o,
		"data-state": e,
		className: t("inline-flex items-center rounded-full border font-medium leading-none select-none", s.pill, s.text, ee[i], a),
		children: [r ? /* @__PURE__ */ g("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ _("span", {
			className: t("relative inline-flex shrink-0", Q[i]),
			children: [c && /* @__PURE__ */ g("span", {
				"aria-hidden": "true",
				className: t("absolute inset-0 rounded-full animate-ping opacity-75", s.dot)
			}), /* @__PURE__ */ g("span", {
				"aria-hidden": "true",
				className: t("relative rounded-full", Q[i], s.dot)
			})]
		}), n]
	});
}
//#endregion
//#region src/components/forms/NumberInput.tsx
var ne = s(function({ value: e, onChange: t, onClear: n, min: r, max: i, step: o, unit: s, placeholder: l, invalid: u = !1, disabled: d = !1, size: f = "md", id: p, name: m, required: h, "aria-label": _, "aria-labelledby": v, "aria-describedby": y, "aria-invalid": b, "aria-required": x, "data-testid": S }, C) {
	let w = c((e) => {
		let t = e;
		return r !== void 0 && t < r && (t = r), i !== void 0 && t > i && (t = i), t;
	}, [r, i]), T = c((e) => {
		let r = e.target.value;
		if (r === "" && n) {
			n();
			return;
		}
		let i = parseFloat(r);
		Number.isNaN(i) || t(i);
	}, [t, n]), E = c((e) => {
		let n = parseFloat(e.target.value);
		if (!Number.isNaN(n)) {
			let e = w(n);
			e !== n && t(e);
		}
	}, [w, t]);
	return /* @__PURE__ */ g(a, {
		ref: C,
		type: "number",
		size: f,
		value: e ?? "",
		min: r,
		max: i,
		step: o,
		placeholder: l,
		invalid: u,
		disabled: d,
		suffix: s ? /* @__PURE__ */ g("span", {
			className: "text-text-tertiary font-sans text-[12px] select-none",
			children: s
		}) : void 0,
		id: p,
		name: m,
		required: h,
		"aria-label": _,
		"aria-labelledby": v,
		"aria-describedby": y,
		"aria-invalid": b,
		"aria-required": x,
		"data-testid": S,
		onChange: T,
		onBlur: E
	});
});
//#endregion
//#region src/components/forms/RadioGroup.tsx
function re({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = d();
	return /* @__PURE__ */ g("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ _("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ _("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ g("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ g("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ g("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ _("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ g("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ g("span", {
						className: t("text-[11px] leading-4 mt-0.5", a ? "text-text-disabled" : "text-neutral"),
						children: i.description
					})]
				})]
			}, i.value);
		})
	});
}
//#endregion
//#region src/components/shared/Divider.tsx
var ie = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function $({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = ie[n];
	return e == null ? /* @__PURE__ */ g("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ _("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ g("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ g("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ g("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function ae({ title: e, hint: n, actions: r, first: i = !1, children: a, className: o, "data-testid": s }) {
	return /* @__PURE__ */ _("section", {
		className: t(o),
		...s ? { "data-testid": s } : {},
		children: [
			!i && /* @__PURE__ */ g($, { spacing: "md" }),
			/* @__PURE__ */ _("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ g("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ g("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					r != null && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("span", { className: "flex-1" }), r] })
				]
			}),
			a
		]
	});
}
//#endregion
export { te as a, H as c, P as d, A as f, x as g, b as h, ne as i, z as l, k as m, $ as n, X as o, M as p, re as r, G as s, ae as t, L as u };
