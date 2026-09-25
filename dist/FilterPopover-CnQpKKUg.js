import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { g as n } from "./tones-CEbHiujQ.js";
import { S as r } from "./Icons-rzhVAphQ.js";
import { t as i } from "./Chip-S5_92B2V.js";
import { t as a } from "./overlayStack-BFH9XXvN.js";
import { i as o, r as s } from "./focusTrap-CmWJlptm.js";
import { t as c } from "./InlinePopover-D102uoo1.js";
import { t as l } from "./DropdownMenu-DUAebTA4.js";
import { createContext as u, useCallback as d, useContext as f, useEffect as p, useId as m, useMemo as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { createPortal as x } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var S = u(null);
function C({ value: e, children: t }) {
	return /* @__PURE__ */ y(S.Provider, {
		value: e,
		children: t
	});
}
function w() {
	let e = f(S);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function T() {
	return f(S);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var E = "'SF Mono', Menlo, monospace", D = 12, O = 1.5, k = D * O, A = 8, j = 10, M = 36;
function N({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = g(null), [d, f] = _(!1), m = h(() => Math.max(1, e.split("\n").length), [e]), v = h(() => {
		let e = Math.max(m, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [m, a]), x = Math.min(Math.max(m, a), o) * k + 16, S = m > o, C = (t) => {
		let r = u.current, i = e ?? "";
		if (!r) {
			n(i + t);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		n(i.slice(0, a) + t + i.slice(o)), queueMicrotask(() => {
			if (u.current) {
				let e = a + t.length;
				u.current.focus(), u.current.setSelectionRange(e, e);
			}
		});
	};
	return p(() => {
		let e = u.current;
		if (!e || !S) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [S]), /* @__PURE__ */ b("div", { children: [c && c.length > 0 && /* @__PURE__ */ y("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ y("button", {
			type: "button",
			onClick: () => C(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: E },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ b("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: E,
			fontSize: D,
			lineHeight: O,
			height: x
		},
		children: [/* @__PURE__ */ y("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: M,
				padding: `${A}px 6px`,
				fontFamily: E,
				lineHeight: O
			},
			children: v
		}), /* @__PURE__ */ y("textarea", {
			ref: u,
			value: e,
			onChange: (e) => {
				n(e.target.value);
			},
			onKeyDown: (e) => {
				s || e.key === "Tab" && (e.preventDefault(), C("  "));
			},
			onFocus: () => f(!0),
			onBlur: () => f(!1),
			placeholder: i,
			readOnly: s,
			"aria-label": l,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${A}px ${j}px`,
				fontFamily: E,
				fontSize: D,
				lineHeight: O,
				tabSize: 2,
				height: x,
				overflow: S ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var P = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function F({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ y("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function I({ value: e, onChange: t, curated: n }) {
	let [r, i] = _(!1), [a, s] = _(!1), [c, l] = _(""), u = g(null), f = g(null), m = n ?? P;
	p(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			u.current && u.current.contains(t) || f.current && f.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), o(r, d(() => i(!1), []));
	let h = (e) => {
		t(e), i(!1);
	}, v = () => {
		let e = c.trim();
		e.length !== 0 && (t(e), l(""), i(!1));
	};
	return /* @__PURE__ */ b("div", {
		className: "relative inline-block",
		ref: u,
		children: [/* @__PURE__ */ y("button", {
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ b("div", {
			ref: f,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ y("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: m.map((t, n) => /* @__PURE__ */ y(F, {
					emoji: t,
					active: t === e,
					onPick: h
				}, `${t}-${n}`))
			}), /* @__PURE__ */ b("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ y("input", {
					type: "text",
					value: c,
					onChange: (e) => l(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), v()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ y("button", {
					type: "button",
					onClick: v,
					disabled: c.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-on-primary border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var L = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function R({ images: e, openIndex: n, onClose: r, onNavigate: i }) {
	let o = g(null), c = g(null), [l, u] = _(n);
	p(() => {
		u(n);
	}, [n]);
	let d = n !== null && e.length > 0, f = a(d), m = i ? n : l ?? n, h = m === null ? 0 : Math.min(Math.max(m, 0), e.length - 1), S = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (h + t + n) % n;
		i ? i(r) : u(r);
	};
	if (p(() => {
		if (d) return c.current = typeof document < "u" ? document.activeElement : null, o.current?.focus(), () => {
			let e = c.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), c.current = null;
		};
	}, [d]), p(() => {
		if (!d) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? s(e, o.current) : e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), S(-1)) : e.key === "ArrowRight" && (e.preventDefault(), S(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		h,
		e.length,
		r,
		i,
		f
	]), !d) return null;
	let C = e[h], w = e.length > 1;
	return x(/* @__PURE__ */ b("div", {
		ref: o,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": C.caption ?? C.alt ?? `Image ${h + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ b("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					h + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ y("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ b("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ y("img", {
					"data-testid": "image-lightbox-img",
					src: C.src,
					alt: C.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), C.caption && /* @__PURE__ */ y("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: C.caption
				})]
			}),
			w && /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(L, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), S(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ y("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(L, "right-3"),
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
var z = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, B = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function V({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, u = r ?? (l >= n ? "success" : "danger"), d = (o ?? H)(l);
	return /* @__PURE__ */ b("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${d} (threshold ${H(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ y("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", B[i]),
			children: /* @__PURE__ */ y("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", z[u]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ y("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: d
		}) : null]
	});
}
function H(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function U({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ y("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = n ?? (p === m ? p - 1 : p), g = r ?? (p === m ? m + 1 : m), _ = Math.max(1e-9, g - h), v = f.length === 1 ? 0 : i / (f.length - 1), x = s, S = a - x * 2, C = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * v,
		y: x + S - (e - h) / _ * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${f.length} points, starts ${W(f[0])}, ends ${W(f[f.length - 1])}`;
	return /* @__PURE__ */ y("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ b("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ y("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ y("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ y("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function W(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function ee(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function G({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = _(""), [c, l] = _(!1), u = g(null), d = (e) => {
		let r = ee(e, a);
		if (r) {
			if (t.includes(r)) {
				s("");
				return;
			}
			n([...t, r]), s("");
		}
	}, f = (e) => {
		n(t.filter((t) => t !== e));
	}, p = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), d(o);
			return;
		}
		e.key === "Backspace" && o === "" && t.length > 0 && (e.preventDefault(), f(t[t.length - 1]));
	}, m = h(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), v = c && m.length > 0;
	return /* @__PURE__ */ b("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ b("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ y("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ b("div", {
			className: "relative",
			children: [/* @__PURE__ */ y("input", {
				ref: u,
				"data-testid": "tag-editor-input",
				type: "text",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: p,
				onFocus: () => l(!0),
				onBlur: () => {
					setTimeout(() => l(!1), 120);
				},
				"aria-label": e ?? (r || "Add tag"),
				placeholder: r,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), v ? /* @__PURE__ */ y("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ b("button", {
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
var te = "";
function K(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function q({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = T(), d = e(), f = o ?? u?.presenceUsers ?? [], m = s === void 0 ? d?.idToken ?? null : s, [v, x] = _(""), [S, C] = _(!1), [w, E] = _(0), [D, O] = _([]), k = g(null), A = g(null), j = h(() => {
		let e = new Set(n), t = [];
		for (let n of f) {
			let r = n.metadata.userId ?? n.clientId;
			e.has(r) || (e.add(r), t.push({
				userId: r,
				displayName: K(n.metadata, r)
			}));
		}
		return t;
	}, [f, n]);
	p(() => {
		let e = v.trim();
		if (!e) {
			O([]);
			return;
		}
		if (!c && !m) {
			O([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => O(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? te}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${m}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				O(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		v,
		m,
		c,
		l
	]);
	let M = h(() => {
		let e = new Set(n), t = [];
		for (let n of j) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of D) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		j,
		D,
		n
	]), N = h(() => {
		let e = v.trim().toLowerCase();
		return e ? M.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : M;
	}, [M, v]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), x(""), E(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), C(!0), E((e) => Math.min(e + 1, Math.max(N.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), E((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = N[w];
			t ? F(t.userId) : v.trim() && F(v.trim());
		} else e.key === "Escape" ? C(!1) : e.key === "Backspace" && !v && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return K(t.metadata, e);
		let n = D.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ y("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ b("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ y("button", {
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ b("div", {
			className: "relative",
			children: [/* @__PURE__ */ y("input", {
				ref: k,
				type: "text",
				value: v,
				disabled: P,
				"aria-label": P ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: P ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					x(e.target.value), C(!0), E(0);
				},
				onFocus: () => C(!0),
				onBlur: () => {
					A.current = setTimeout(() => C(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), S && !P && N.length > 0 && /* @__PURE__ */ y("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), A.current && clearTimeout(A.current);
				},
				children: N.map((e, n) => /* @__PURE__ */ b("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === w ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => E(n),
					onClick: () => {
						F(e.userId), k.current?.focus();
					},
					children: [/* @__PURE__ */ y("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ y("span", {
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
var J = {
	md: "px-3 py-1 text-[12.5px]",
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, Y = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", ne = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", X = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Z({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": l }) {
	let u = e && !!r, d = u ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ b("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", J[a], e ? u ? X : ne : Y, c && "opacity-50 cursor-not-allowed", s),
		style: d,
		children: [i && /* @__PURE__ */ y("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var re = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, Q = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, ie = {
	surface: "bg-border",
	code: "bg-code-border"
}, ae = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function oe({ children: e, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": u }) {
	let f = g(null), p = d((e) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = e.target;
		if (t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
		let n = f.current;
		if (!n) return;
		let r = Array.from(n.querySelectorAll(ae));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ b("div", {
		ref: f,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": u,
		onKeyDown: p,
		className: t("flex flex-none", s ? "flex-wrap items-start py-1.5" : "items-center", re[i], Q[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ y("div", {
			className: t("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: e
		}), n && /* @__PURE__ */ y("div", {
			className: t("flex flex-none items-center gap-2", s ? "flex-wrap" : "pl-2"),
			children: n
		})]
	});
}
function se({ children: e, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ b(v, { children: [n && /* @__PURE__ */ y(ce, { tone: r }), /* @__PURE__ */ y("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: t("flex flex-none items-center gap-1.5", i),
		children: e
	})] });
}
function ce({ tone: e = "surface", className: n }) {
	return /* @__PURE__ */ y("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: t("h-4 w-px flex-none", ie[e], n)
	});
}
function le({ children: e, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ y("span", {
		className: t("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: e
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function ue({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = m();
	return /* @__PURE__ */ y("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ b("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ b("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ y("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ y("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ y("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ b("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ y("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ y("span", {
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
var de = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function fe({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = de[n];
	return e == null ? /* @__PURE__ */ y("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ b("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ y("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ y("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ y("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function pe({ title: e, hint: n, actions: r, first: i = !1, variant: a = "label", children: o, className: s, "data-testid": c }) {
	return a === "heading" ? /* @__PURE__ */ b("section", {
		className: t("group/section", s),
		"data-variant": "heading",
		...c ? { "data-testid": c } : {},
		children: [/* @__PURE__ */ b("div", {
			className: "mb-0.5 flex h-6 items-center gap-2",
			children: [
				/* @__PURE__ */ y("h3", {
					className: "m-0 text-base font-semibold leading-6 text-text-primary",
					children: e
				}),
				n != null && /* @__PURE__ */ y("span", {
					className: "min-w-0 truncate text-[13px] text-text-tertiary",
					children: n
				}),
				r != null && /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("span", { className: "flex-1" }), /* @__PURE__ */ y("span", {
					className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
					children: r
				})] })
			]
		}), o]
	}) : /* @__PURE__ */ b("section", {
		className: t(s),
		...c ? { "data-testid": c } : {},
		children: [
			!i && /* @__PURE__ */ y(fe, { spacing: "md" }),
			/* @__PURE__ */ b("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ y("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ y("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					r != null && /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("span", { className: "flex-1" }), r] })
				]
			}),
			o
		]
	});
}
function me(e, t, n) {
	let r = e.find((e) => e.id === t);
	if (!r || t === n) return null;
	if (n.startsWith("__grouped-list-group__:")) {
		let i = n.slice(23), a = e.filter((e) => e.groupId === i && e.id !== t).length, o = e.filter((e) => e.groupId === i).findIndex((e) => e.id === t);
		return i === r.groupId && o === a ? null : {
			toGroupId: i,
			index: a
		};
	}
	let i = e.find((e) => e.id === n);
	if (!i) return null;
	let a = e.filter((e) => e.groupId === i.groupId).findIndex((e) => e.id === n);
	return {
		toGroupId: i.groupId,
		index: a
	};
}
var he = null;
function ge() {
	return he ??= import("./GroupedListSortable-DzTojHzU.js").catch(() => null), he;
}
var _e = t("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function ve(e) {
	if (!e || typeof window > "u") return /* @__PURE__ */ new Set();
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return /* @__PURE__ */ new Set();
		let n = JSON.parse(t);
		return new Set(Array.isArray(n) ? n.filter((e) => typeof e == "string") : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function ye(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function be({ open: e }) {
	return /* @__PURE__ */ y("svg", {
		viewBox: "0 0 16 16",
		width: "14",
		height: "14",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className: t("shrink-0 transition-transform duration-150", e ? "" : "-rotate-90"),
		children: /* @__PURE__ */ y("path", { d: "M4 6l4 4 4-4" })
	});
}
function xe(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function $(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function Se({ groups: e, rows: n, onOpenRow: r, rowMenu: a, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: l, currentId: u = null, hideEmptyGroups: f = !1, onReorder: m, canReorder: v, reorderLabel: x, size: S = "sm", groupHeading: C = "title", currentStyle: w = "tint", className: T, "data-testid": E = "grouped-list" }) {
	let D = S === "md", O = C === "label", k = s !== void 0, [A, j] = _(() => {
		let t = ve(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), M = d((e) => k ? s.includes(e) : !A.has(e), [
		k,
		s,
		A
	]), N = d((e, t) => {
		k || j((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), ye(l, r), r;
		}), c?.(e, t);
	}, [
		k,
		c,
		l
	]), P = h(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => t.set(e.id, [])), n.forEach((e) => {
			let n = t.get(e.groupId);
			n && n.push(e);
		}), t;
	}, [e, n]), F = h(() => f ? e.filter((e) => (P.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		P,
		f
	]), I = h(() => {
		let e = [];
		return F.forEach((t) => {
			e.push(`g:${t.id}`), M(t.id) && P.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		F,
		P,
		M
	]), [L, R] = _(null), z = g(null), B = d((e) => !!m && (v ? v(e) : !e.disabled), [m, v]), [V, H] = _(""), U = g(null), [W, ee] = _(null), [G, te] = _(null), K = g(/* @__PURE__ */ new Map()), q = !!m;
	p(() => {
		if (!q || W) return;
		let e = !0;
		return ge().then((t) => {
			e && t && ee(t);
		}), () => {
			e = !1;
		};
	}, [q, W]);
	let J = d((t, n, r) => {
		if (!m) return;
		let i = e.find((e) => e.id === n), a = (P.get(n) ?? []).filter((e) => e.id !== t.id).length;
		m(t.id, n, r), H(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		m,
		e,
		P
	]), Y = d((t, n) => {
		let r = P.get(t.groupId) ?? [], i = r.findIndex((e) => e.id === t.id), a = null;
		if (n === "ArrowUp" && i > 0) a = {
			toGroupId: t.groupId,
			index: i - 1
		};
		else if (n === "ArrowDown" && i >= 0 && i < r.length - 1) a = {
			toGroupId: t.groupId,
			index: i + 1
		};
		else if (n === "ArrowLeft" || n === "ArrowRight") {
			let r = e.findIndex((e) => e.id === t.groupId), i = e[n === "ArrowLeft" ? r - 1 : r + 1];
			r >= 0 && i && (a = {
				toGroupId: i.id,
				index: P.get(i.id)?.length ?? 0
			});
		}
		a && (J(t, a.toGroupId, a.index), U.current = {
			id: t.id,
			groupId: a.toGroupId,
			index: a.index
		}, M(a.toGroupId) || N(a.toGroupId, !0));
	}, [
		P,
		e,
		J,
		M,
		N
	]), ne = d((e, t) => {
		let r = n.find((t) => t.id === e), i = r && B(r) ? me(n, e, t) : null;
		r && i && J(r, i.toGroupId, i.index);
	}, [
		n,
		B,
		J
	]), X = h(() => {
		if (L && I.includes(L)) return L;
		let e = n.find((e) => e.current || e.id === u), t = e ? `r:${e.id}` : null;
		return t && I.includes(t) ? t : I[0] ?? null;
	}, [
		L,
		I,
		n,
		u
	]), Z = d((e) => {
		let t = z.current?.querySelector(`[data-focus-key="${xe(e)}"]`);
		t && (R(e), t.focus());
	}, []);
	p(() => {
		L && !I.includes(L) && R(null);
	}, [L, I]), p(() => {
		let e = U.current;
		if (!e || (P.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !I.includes(`r:${e.id}`)) return;
		U.current = null;
		let t = z.current?.querySelector(`[data-focus-key="${xe(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && Z(`r:${e.id}`);
	});
	let re = d((e) => {
		let t = e.target;
		if (t.closest("[role=\"menu\"]")) return;
		let r = t.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = I.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (U.current = null, e.altKey && m && e.key.startsWith("Arrow")) {
			if (a) return;
			e.preventDefault();
			let t = n.find((e) => e.id === o);
			t && B(t) && Y(t, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let n = t.closest("[data-row-id]");
				n && $(n) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < I.length - 1 && Z(I[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && Z(I[i - 1]);
				break;
			case "Home":
				e.preventDefault(), I.length && Z(I[0]);
				break;
			case "End":
				e.preventDefault(), I.length && Z(I[I.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) M(o) && N(o, !1);
				else {
					let e = n.find((e) => e.id === o);
					e && (N(e.groupId, !1), Z(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!M(o)) N(o, !0);
				else {
					let e = P.get(o)?.[0];
					e && Z(`r:${e.id}`);
				}
			}
		}
	}, [
		I,
		Z,
		M,
		N,
		n,
		P,
		m,
		B,
		Y
	]), Q = /* @__PURE__ */ b("div", {
		ref: z,
		"data-testid": E,
		className: t("flex flex-col", T),
		onKeyDown: re,
		children: [m && /* @__PURE__ */ y("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${E}-reorder-status`,
			children: V
		}), F.map((e) => {
			let n = M(e.id), s = P.get(e.id) ?? [], c = `${E}-group-toggle-${e.id}`, l = `${E}-group-rows-${e.id}`, d = `g:${e.id}`;
			return /* @__PURE__ */ b("section", {
				"aria-labelledby": c,
				"data-testid": `${E}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": n,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ y("h3", {
						className: t("m-0 rounded-md", G === e.id && "bg-primary/8"),
						"data-drop-over": G === e.id || void 0,
						ref: (t) => {
							K.current.set(e.id, t);
						},
						children: /* @__PURE__ */ b("button", {
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": d,
							"aria-expanded": n,
							"aria-controls": l,
							tabIndex: X === d ? 0 : -1,
							onFocus: () => R(d),
							onClick: () => N(e.id, !n),
							"data-heading": O ? "label" : void 0,
							className: t("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 py-2.5 text-left", O ? "text-[11px] font-semibold uppercase leading-4 tracking-wide text-text-secondary" : D ? "text-[15px] font-semibold text-text-primary" : "text-[14px] font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ y("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ y(be, { open: n })
								}),
								e.icon && /* @__PURE__ */ y("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${E}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ y("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && O && /* @__PURE__ */ y("span", {
									className: "shrink-0 font-medium normal-case tracking-normal text-text-tertiary",
									"aria-label": `${e.count} items`,
									"data-testid": `${E}-group-count-${e.id}`,
									children: e.count
								}),
								typeof e.count == "number" && !O && /* @__PURE__ */ y(i, {
									size: "xs",
									tone: "neutral",
									className: "shrink-0",
									"aria-label": `${e.count} items`,
									"data-testid": `${E}-group-count-${e.id}`,
									children: e.count
								})
							]
						})
					}),
					/* @__PURE__ */ b("ul", {
						id: l,
						"data-testid": l,
						hidden: !n,
						className: "m-0 flex list-none flex-col p-0",
						children: [n && s.length === 0 && /* @__PURE__ */ y("li", {
							className: "px-4 py-3 pl-12 text-[13px] text-text-tertiary",
							"data-testid": `${E}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), n && s.map((e) => /* @__PURE__ */ y(Ce, {
							row: e,
							current: e.current || e.id === u,
							currentStyle: w,
							testId: E,
							size: S,
							tabbable: X === `r:${e.id}`,
							onFocusRow: () => R(`r:${e.id}`),
							onOpenRow: r,
							menuSections: a?.(e),
							menuLabel: o?.(e) ?? `Actions for ${e.title}`,
							reorder: B(e) ? {
								label: x?.(e) ?? `Reorder ${e.title}`,
								sortable: W
							} : void 0
						}, e.id))]
					}),
					W && /* @__PURE__ */ y(W.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => K.current.get(e.id) ?? null,
						onOverChange: (t) => te((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return W ? /* @__PURE__ */ y(W.GroupedListDndRoot, {
		ids: I.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: ne,
		children: Q
	}) : Q;
}
function Ce({ row: e, current: n, currentStyle: i, testId: a, size: o, tabbable: s, onFocusRow: c, onOpenRow: u, menuSections: f, menuLabel: p, reorder: m }) {
	let h = !!f && f.some((e) => e.items.length > 0), g = e.hoverSubline !== void 0 && e.hoverSubline !== null, v = e.meta !== void 0 && e.meta !== null, x = e.leading !== void 0 && e.leading !== null, S = `r:${e.id}`, C = o === "md", [w, T] = _({
		dragging: !1,
		over: !1
	}), E = d((e) => {
		T((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), D = {
		"aria-label": m?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${a}-row-handle-${e.id}`,
		className: t(_e, C && "h-8 w-6 text-text-secondary")
	}, O = /* @__PURE__ */ y(r, { size: C ? 20 : 14 });
	return /* @__PURE__ */ b("li", {
		"data-dragging": w.dragging || void 0,
		"data-drop-over": w.over && !w.dragging || void 0,
		"data-testid": `${a}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": n || void 0,
		"aria-current": n ? "true" : void 0,
		onFocus: c,
		...h ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), $(e.currentTarget));
		} } : {},
		className: t("group relative flex items-center gap-3 border-t border-border px-2", C ? "py-[7px]" : "py-2.5", "transition-colors duration-100", n ? "bg-primary/8 hover:bg-primary/12" : "hover:bg-surface-hover", C && n && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !C && n && i === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", w.dragging && "opacity-50", w.over && !w.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			x && /* @__PURE__ */ y("span", {
				className: t("flex shrink-0 items-center justify-center", C ? "w-6" : "w-5"),
				"data-testid": `${a}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ b("button", {
				type: "button",
				"data-testid": `${a}-row-open-${e.id}`,
				"data-focus-key": S,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: s ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || u?.(e);
				},
				className: t("flex min-w-0 flex-1 items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!x && /* @__PURE__ */ y("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ y("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${a}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ b("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ b("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ y("span", {
									className: t("truncate font-medium text-text-primary", C ? "text-[15px] leading-[22px]" : "text-[14px] leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ y("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							v && /* @__PURE__ */ y("span", {
								"data-testid": `${a}-row-meta-${e.id}`,
								className: t("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", C ? "text-[13px] leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || g) && /* @__PURE__ */ b("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ y("span", {
									"data-testid": `${a}-row-subline-${e.id}`,
									className: t("block truncate", g && (n ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), g && /* @__PURE__ */ y("span", {
									"aria-hidden": e.subline !== void 0 || void 0,
									"data-testid": `${a}-row-hover-subline-${e.id}`,
									className: t("truncate", n || e.subline === void 0 ? "block" : "hidden group-hover:block group-focus-within:block"),
									children: e.hoverSubline
								})]
							})
						]
					})
				]
			}),
			e.hoverActions && /* @__PURE__ */ y("span", {
				"data-testid": `${a}-row-actions-${e.id}`,
				className: t("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ y("span", {
				className: "flex shrink-0 items-center gap-1.5 text-[13px]",
				"data-testid": `${a}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			h && /* @__PURE__ */ y("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${a}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ y(l, {
					trigger: /* @__PURE__ */ y("span", {
						"aria-hidden": "true",
						className: "text-base leading-none",
						children: "⋯"
					}),
					triggerLabel: p,
					triggerTabIndex: -1,
					triggerTestId: `${a}-row-menu-trigger-${e.id}`,
					align: "end",
					sections: f,
					triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
				})
			}),
			m && (m.sortable ? /* @__PURE__ */ y(m.sortable.SortableHandle, {
				id: e.id,
				onStateChange: E,
				...D,
				children: O
			}) : /* @__PURE__ */ y("button", {
				type: "button",
				tabIndex: -1,
				...D,
				children: O
			}))
		]
	});
}
//#endregion
//#region src/components/shared/FilterPopover.tsx
var we = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function Te() {
	return /* @__PURE__ */ y("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ y("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function Ee({ children: e, label: r = "Filter", activeCount: a = 0, onClear: o, clearLabel: s = "Clear filters", open: l, onOpenChange: u, placement: d = "bottom-start", size: f = "md", trigger: p = "label", panelLabel: h = "Filters", className: v, panelClassName: x, icon: S, "data-testid": C = "filter-popover" }) {
	let [w, T] = _(!1), E = l ?? w, D = (e) => {
		l === void 0 && T(e), u?.(e);
	}, O = g(null), k = m(), A = a > 0;
	return /* @__PURE__ */ b("span", {
		className: t("inline-flex shrink-0", v),
		"data-testid": `${C}-root`,
		children: [/* @__PURE__ */ b(n, {
			ref: O,
			type: "button",
			variant: "secondary",
			size: f,
			"aria-haspopup": "dialog",
			"aria-expanded": E,
			"aria-controls": E ? k : void 0,
			"data-testid": `${C}-trigger`,
			"data-active": A || void 0,
			onClick: () => D(!E),
			...p === "icon" ? {
				"aria-label": A ? `${r} (${a} active)` : r,
				title: r
			} : {},
			className: t("inline-flex items-center gap-2 whitespace-nowrap", p === "icon" && (f === "lg" ? "relative h-11 w-11 justify-center rounded-lg px-0 py-0 text-text-secondary [&_svg]:h-5 [&_svg]:w-5" : "relative h-9 w-9 justify-center px-0 py-0 text-text-secondary [&_svg]:h-[18px] [&_svg]:w-[18px]"), A && "border-primary-border text-primary-fg"),
			children: [
				S ?? /* @__PURE__ */ y(Te, {}),
				p === "label" && /* @__PURE__ */ y("span", { children: r }),
				p === "icon" && A && /* @__PURE__ */ y("span", {
					"aria-hidden": "true",
					"data-testid": `${C}-dot`,
					className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"
				}),
				p === "label" && A && /* @__PURE__ */ y(i, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${C}-count`,
					"aria-label": `${a} active filters`,
					children: a
				})
			]
		}), /* @__PURE__ */ y(c, {
			open: E,
			onClose: () => D(!1),
			trigger: O,
			placement: we[d],
			"aria-label": h,
			"data-testid": C,
			className: t("min-w-[280px] max-w-[420px] p-3", x),
			children: /* @__PURE__ */ b("div", {
				id: k,
				className: "flex flex-col gap-3",
				children: [e, o && /* @__PURE__ */ y("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ y(n, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: !A,
						"data-testid": `${C}-clear`,
						onClick: () => {
							o();
						},
						children: s
					})
				})]
			})
		})]
	});
}
//#endregion
export { I as _, ue as a, T as b, le as c, q as d, G as f, P as g, R as h, fe as i, ce as l, V as m, Se as n, oe as o, U as p, pe as r, se as s, Ee as t, Z as u, N as v, w as x, C as y };
