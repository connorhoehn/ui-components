import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { _ as n, t as r } from "./overlayStack-CHdlnODN.js";
import { t as i } from "./DropdownMenu-CVxGuTie.js";
import { t as a } from "./Chip-B_HZn3xl.js";
import { i as o, r as s } from "./focusTrap-C5l9cvTe.js";
import { t as c } from "./InlinePopover-DtYo8_ZC.js";
import { createContext as l, useCallback as u, useContext as d, useEffect as f, useId as p, useMemo as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
import { createPortal as b } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var x = l(null);
function S({ value: e, children: t }) {
	return /* @__PURE__ */ v(x.Provider, {
		value: e,
		children: t
	});
}
function C() {
	let e = d(x);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function w() {
	return d(x);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var T = "'SF Mono', Menlo, monospace", E = 12, D = 1.5, O = E * D, k = 8, A = 10, j = 36;
function M({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = h(null), [d, p] = g(!1), _ = m(() => Math.max(1, e.split("\n").length), [e]), b = m(() => {
		let e = Math.max(_, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [_, a]), x = Math.min(Math.max(_, a), o) * O + 16, S = _ > o, C = (t) => {
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
	return f(() => {
		let e = u.current;
		if (!e || !S) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [S]), /* @__PURE__ */ y("div", { children: [c && c.length > 0 && /* @__PURE__ */ v("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ v("button", {
			type: "button",
			onClick: () => C(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: T },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ y("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: T,
			fontSize: E,
			lineHeight: D,
			height: x
		},
		children: [/* @__PURE__ */ v("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: j,
				padding: `${k}px 6px`,
				fontFamily: T,
				lineHeight: D
			},
			children: b
		}), /* @__PURE__ */ v("textarea", {
			ref: u,
			value: e,
			onChange: (e) => {
				n(e.target.value);
			},
			onKeyDown: (e) => {
				s || e.key === "Tab" && (e.preventDefault(), C("  "));
			},
			onFocus: () => p(!0),
			onBlur: () => p(!1),
			placeholder: i,
			readOnly: s,
			"aria-label": l,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${k}px ${A}px`,
				fontFamily: T,
				fontSize: E,
				lineHeight: D,
				tabSize: 2,
				height: x,
				overflow: S ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var N = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function P({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ v("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function F({ value: e, onChange: t, curated: n }) {
	let [r, i] = g(!1), [a, s] = g(!1), [c, l] = g(""), d = h(null), p = h(null), m = n ?? N;
	f(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			d.current && d.current.contains(t) || p.current && p.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), o(r, u(() => i(!1), []));
	let _ = (e) => {
		t(e), i(!1);
	}, b = () => {
		let e = c.trim();
		e.length !== 0 && (t(e), l(""), i(!1));
	};
	return /* @__PURE__ */ y("div", {
		className: "relative inline-block",
		ref: d,
		children: [/* @__PURE__ */ v("button", {
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ y("div", {
			ref: p,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ v("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: m.map((t, n) => /* @__PURE__ */ v(P, {
					emoji: t,
					active: t === e,
					onPick: _
				}, `${t}-${n}`))
			}), /* @__PURE__ */ y("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ v("input", {
					type: "text",
					value: c,
					onChange: (e) => l(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), b()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ v("button", {
					type: "button",
					onClick: b,
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
var I = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function L({ images: e, openIndex: n, onClose: i, onNavigate: a }) {
	let o = h(null), c = h(null), [l, u] = g(n);
	f(() => {
		u(n);
	}, [n]);
	let d = n !== null && e.length > 0, p = r(d), m = a ? n : l ?? n, x = m === null ? 0 : Math.min(Math.max(m, 0), e.length - 1), S = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (x + t + n) % n;
		a ? a(r) : u(r);
	};
	if (f(() => {
		if (d) return c.current = typeof document < "u" ? document.activeElement : null, o.current?.focus(), () => {
			let e = c.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), c.current = null;
		};
	}, [d]), f(() => {
		if (!d) return;
		let e = (e) => {
			p() && (e.key === "Tab" ? s(e, o.current) : e.key === "Escape" ? (e.stopPropagation(), i()) : e.key === "ArrowLeft" ? (e.preventDefault(), S(-1)) : e.key === "ArrowRight" && (e.preventDefault(), S(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		x,
		e.length,
		i,
		a,
		p
	]), !d) return null;
	let C = e[x], w = e.length > 1;
	return b(/* @__PURE__ */ y("div", {
		ref: o,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": C.caption ?? C.alt ?? `Image ${x + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: i,
		children: [
			/* @__PURE__ */ y("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					x + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ v("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				children: "✕"
			}),
			/* @__PURE__ */ y("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ v("img", {
					"data-testid": "image-lightbox-img",
					src: C.src,
					alt: C.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), C.caption && /* @__PURE__ */ v("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: C.caption
				})]
			}),
			w && /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(I, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), S(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ v("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(I, "right-3"),
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
var R = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, ee = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function z({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, u = r ?? (l >= n ? "success" : "danger"), d = (o ?? B)(l);
	return /* @__PURE__ */ y("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${d} (threshold ${B(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ v("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", ee[i]),
			children: /* @__PURE__ */ v("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", R[u]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ v("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: d
		}) : null]
	});
}
function B(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function V({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ v("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = n ?? (p === m ? p - 1 : p), g = r ?? (p === m ? m + 1 : m), _ = Math.max(1e-9, g - h), b = f.length === 1 ? 0 : i / (f.length - 1), x = s, S = a - x * 2, C = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * b,
		y: x + S - (e - h) / _ * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${f.length} points, starts ${H(f[0])}, ends ${H(f[f.length - 1])}`;
	return /* @__PURE__ */ v("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ y("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ v("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ v("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ v("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function H(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function te(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function ne({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = g(""), [c, l] = g(!1), u = h(null), d = (e) => {
		let r = te(e, a);
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
	}, _ = m(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), b = c && _.length > 0;
	return /* @__PURE__ */ y("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ y("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ v("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ y("div", {
			className: "relative",
			children: [/* @__PURE__ */ v("input", {
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
			}), b ? /* @__PURE__ */ v("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: _.map((e) => /* @__PURE__ */ y("button", {
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
var re = "";
function U(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function W({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = w(), d = e(), p = o ?? u?.presenceUsers ?? [], _ = s === void 0 ? d?.idToken ?? null : s, [b, x] = g(""), [S, C] = g(!1), [T, E] = g(0), [D, O] = g([]), k = h(null), A = h(null), j = m(() => {
		let e = new Set(n), t = [];
		for (let n of p) {
			let r = n.metadata.userId ?? n.clientId;
			e.has(r) || (e.add(r), t.push({
				userId: r,
				displayName: U(n.metadata, r)
			}));
		}
		return t;
	}, [p, n]);
	f(() => {
		let e = b.trim();
		if (!e) {
			O([]);
			return;
		}
		if (!c && !_) {
			O([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => O(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? re}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${_}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				O(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		b,
		_,
		c,
		l
	]);
	let M = m(() => {
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
	]), N = m(() => {
		let e = b.trim().toLowerCase();
		return e ? M.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : M;
	}, [M, b]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), x(""), E(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), C(!0), E((e) => Math.min(e + 1, Math.max(N.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), E((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = N[T];
			t ? F(t.userId) : b.trim() && F(b.trim());
		} else e.key === "Escape" ? C(!1) : e.key === "Backspace" && !b && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = p.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return U(t.metadata, e);
		let n = D.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ y("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ v("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ y("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ v("button", {
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ y("div", {
			className: "relative",
			children: [/* @__PURE__ */ v("input", {
				ref: k,
				type: "text",
				value: b,
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
			}), S && !P && N.length > 0 && /* @__PURE__ */ v("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), A.current && clearTimeout(A.current);
				},
				children: N.map((e, n) => /* @__PURE__ */ y("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === T ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => E(n),
					onClick: () => {
						F(e.userId), k.current?.focus();
					},
					children: [/* @__PURE__ */ v("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ v("span", {
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
var G = {
	md: "px-3 py-1 text-[12.5px]",
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, K = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", q = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", J = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Y({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": l }) {
	let u = e && !!r, d = u ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ y("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", G[a], e ? u ? J : q : K, c && "opacity-50 cursor-not-allowed", s),
		style: d,
		children: [i && /* @__PURE__ */ v("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var ie = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, X = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, ae = {
	surface: "bg-border",
	code: "bg-code-border"
}, oe = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function se({ children: e, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": d }) {
	let f = h(null), p = u((e) => {
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
		let r = Array.from(n.querySelectorAll(oe));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ y("div", {
		ref: f,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": d,
		onKeyDown: p,
		className: t("flex flex-none", s ? "flex-wrap items-start py-1.5" : "items-center", ie[i], X[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ v("div", {
			className: t("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: e
		}), n && /* @__PURE__ */ v("div", {
			className: t("flex flex-none items-center gap-2", s ? "flex-wrap" : "pl-2"),
			children: n
		})]
	});
}
function ce({ children: e, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ y(_, { children: [n && /* @__PURE__ */ v(Z, { tone: r }), /* @__PURE__ */ v("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: t("flex flex-none items-center gap-1.5", i),
		children: e
	})] });
}
function Z({ tone: e = "surface", className: n }) {
	return /* @__PURE__ */ v("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: t("h-4 w-px flex-none", ae[e], n)
	});
}
function le({ children: e, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ v("span", {
		className: t("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: e
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function ue({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = p();
	return /* @__PURE__ */ v("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ y("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ y("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ v("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ v("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ v("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ y("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ v("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ v("span", {
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
function Q({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = de[n];
	return e == null ? /* @__PURE__ */ v("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ y("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ v("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ v("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ v("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function fe({ title: e, hint: n, actions: r, first: i = !1, children: a, className: o, "data-testid": s }) {
	return /* @__PURE__ */ y("section", {
		className: t(o),
		...s ? { "data-testid": s } : {},
		children: [
			!i && /* @__PURE__ */ v(Q, { spacing: "md" }),
			/* @__PURE__ */ y("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ v("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ v("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					r != null && /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("span", { className: "flex-1" }), r] })
				]
			}),
			a
		]
	});
}
//#endregion
//#region src/components/shared/GroupedList.tsx
function pe(e) {
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
function me(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function he({ open: e }) {
	return /* @__PURE__ */ v("svg", {
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
		children: /* @__PURE__ */ v("path", { d: "M4 6l4 4 4-4" })
	});
}
function ge(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function $(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function _e({ groups: e, rows: n, onOpenRow: r, rowMenu: i, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: l, currentId: d = null, hideEmptyGroups: p = !1, className: _, "data-testid": b = "grouped-list" }) {
	let x = s !== void 0, [S, C] = g(() => {
		let t = pe(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), w = u((e) => x ? s.includes(e) : !S.has(e), [
		x,
		s,
		S
	]), T = u((e, t) => {
		x || C((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), me(l, r), r;
		}), c?.(e, t);
	}, [
		x,
		c,
		l
	]), E = m(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => t.set(e.id, [])), n.forEach((e) => {
			let n = t.get(e.groupId);
			n && n.push(e);
		}), t;
	}, [e, n]), D = m(() => p ? e.filter((e) => (E.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		E,
		p
	]), O = m(() => {
		let e = [];
		return D.forEach((t) => {
			e.push(`g:${t.id}`), w(t.id) && E.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		D,
		E,
		w
	]), [k, A] = g(null), j = h(null), M = m(() => {
		if (k && O.includes(k)) return k;
		let e = n.find((e) => e.current || e.id === d), t = e ? `r:${e.id}` : null;
		return t && O.includes(t) ? t : O[0] ?? null;
	}, [
		k,
		O,
		n,
		d
	]), N = u((e) => {
		let t = j.current?.querySelector(`[data-focus-key="${ge(e)}"]`);
		t && (A(e), t.focus());
	}, []);
	f(() => {
		k && !O.includes(k) && A(null);
	}, [k, O]);
	let P = u((e) => {
		let t = e.target;
		if (t.closest("[role=\"menu\"]")) return;
		let r = t.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = O.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let n = t.closest("[data-row-id]");
				n && $(n) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < O.length - 1 && N(O[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && N(O[i - 1]);
				break;
			case "Home":
				e.preventDefault(), O.length && N(O[0]);
				break;
			case "End":
				e.preventDefault(), O.length && N(O[O.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) w(o) && T(o, !1);
				else {
					let e = n.find((e) => e.id === o);
					e && (T(e.groupId, !1), N(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!w(o)) T(o, !0);
				else {
					let e = E.get(o)?.[0];
					e && N(`r:${e.id}`);
				}
			}
		}
	}, [
		O,
		N,
		w,
		T,
		n,
		E
	]);
	return /* @__PURE__ */ v("div", {
		ref: j,
		"data-testid": b,
		className: t("flex flex-col", _),
		onKeyDown: P,
		children: D.map((e) => {
			let n = w(e.id), s = E.get(e.id) ?? [], c = `${b}-group-toggle-${e.id}`, l = `${b}-group-rows-${e.id}`, u = `g:${e.id}`;
			return /* @__PURE__ */ y("section", {
				"aria-labelledby": c,
				"data-testid": `${b}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": n,
				className: "flex flex-col",
				children: [/* @__PURE__ */ v("h3", {
					className: "m-0",
					children: /* @__PURE__ */ y("button", {
						type: "button",
						id: c,
						"data-testid": c,
						"data-focus-key": u,
						"aria-expanded": n,
						"aria-controls": l,
						tabIndex: M === u ? 0 : -1,
						onFocus: () => A(u),
						onClick: () => T(e.id, !n),
						className: t("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 py-2.5 text-left", "text-[14px] font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: [
							/* @__PURE__ */ v("span", {
								className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
								children: /* @__PURE__ */ v(he, { open: n })
							}),
							e.icon && /* @__PURE__ */ v("span", {
								className: "flex shrink-0 items-center text-text-secondary",
								"data-testid": `${b}-group-icon-${e.id}`,
								children: e.icon
							}),
							/* @__PURE__ */ v("span", {
								className: "truncate",
								children: e.title
							}),
							typeof e.count == "number" && /* @__PURE__ */ v(a, {
								size: "xs",
								tone: "neutral",
								className: "shrink-0",
								"aria-label": `${e.count} items`,
								"data-testid": `${b}-group-count-${e.id}`,
								children: e.count
							})
						]
					})
				}), /* @__PURE__ */ y("ul", {
					id: l,
					"data-testid": l,
					hidden: !n,
					className: "m-0 flex list-none flex-col p-0",
					children: [n && s.length === 0 && /* @__PURE__ */ v("li", {
						className: "px-4 py-3 pl-12 text-[13px] text-text-tertiary",
						"data-testid": `${b}-group-empty-${e.id}`,
						children: e.emptyLabel ?? "Nothing here"
					}), n && s.map((e) => /* @__PURE__ */ v(ve, {
						row: e,
						current: e.current || e.id === d,
						testId: b,
						tabbable: M === `r:${e.id}`,
						onFocusRow: () => A(`r:${e.id}`),
						onOpenRow: r,
						menuSections: i?.(e),
						menuLabel: o?.(e) ?? `Actions for ${e.title}`
					}, e.id))]
				})]
			}, e.id);
		})
	});
}
function ve({ row: e, current: n, testId: r, tabbable: a, onFocusRow: o, onOpenRow: s, menuSections: c, menuLabel: l }) {
	let u = !!c && c.some((e) => e.items.length > 0), d = e.hoverSubline !== void 0 && e.hoverSubline !== null, f = `r:${e.id}`;
	return /* @__PURE__ */ y("li", {
		"data-testid": `${r}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": n || void 0,
		"aria-current": n ? "true" : void 0,
		onFocus: o,
		...u ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), $(e.currentTarget));
		} } : {},
		className: t("group relative flex items-center gap-3 border-t border-border px-2 py-2.5", "transition-colors duration-100", n ? "bg-primary/8 hover:bg-primary/12" : "hover:bg-surface-hover", e.disabled && "opacity-60"),
		children: [
			/* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `${r}-row-open-${e.id}`,
				"data-focus-key": f,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: a ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || s?.(e);
				},
				className: t("flex min-w-0 flex-1 items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					/* @__PURE__ */ v("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ v("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${r}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ y("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [/* @__PURE__ */ y("span", {
							className: "flex min-w-0 items-center gap-2.5",
							children: [/* @__PURE__ */ v("span", {
								className: "truncate text-[14px] font-medium leading-5 text-text-primary",
								title: e.title,
								children: e.title
							}), e.pill && /* @__PURE__ */ v("span", {
								className: "flex shrink-0 items-center",
								children: e.pill
							})]
						}), (e.subline !== void 0 || d) && /* @__PURE__ */ y("span", {
							className: "min-w-0 text-[12px] leading-4 text-text-secondary",
							children: [e.subline !== void 0 && /* @__PURE__ */ v("span", {
								"data-testid": `${r}-row-subline-${e.id}`,
								className: t("block truncate", d && (n ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
								children: e.subline
							}), d && /* @__PURE__ */ v("span", {
								"aria-hidden": e.subline !== void 0 || void 0,
								"data-testid": `${r}-row-hover-subline-${e.id}`,
								className: t("truncate", n || e.subline === void 0 ? "block" : "hidden group-hover:block group-focus-within:block"),
								children: e.hoverSubline
							})]
						})]
					})
				]
			}),
			e.hoverActions && /* @__PURE__ */ v("span", {
				"data-testid": `${r}-row-actions-${e.id}`,
				className: t("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ v("span", {
				className: "flex shrink-0 items-center gap-1.5 text-[13px]",
				"data-testid": `${r}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			u && /* @__PURE__ */ v("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${r}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ v(i, {
					trigger: /* @__PURE__ */ v("span", {
						"aria-hidden": "true",
						className: "text-base leading-none",
						children: "⋯"
					}),
					triggerLabel: l,
					triggerTabIndex: -1,
					triggerTestId: `${r}-row-menu-trigger-${e.id}`,
					align: "end",
					sections: c,
					triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/FilterPopover.tsx
var ye = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function be() {
	return /* @__PURE__ */ v("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ v("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function xe({ children: e, label: r = "Filter", activeCount: i = 0, onClear: o, clearLabel: s = "Clear filters", open: l, onOpenChange: u, placement: d = "bottom-start", size: f = "md", panelLabel: m = "Filters", className: _, panelClassName: b, "data-testid": x = "filter-popover" }) {
	let [S, C] = g(!1), w = l ?? S, T = (e) => {
		l === void 0 && C(e), u?.(e);
	}, E = h(null), D = p(), O = i > 0;
	return /* @__PURE__ */ y("span", {
		className: t("inline-flex shrink-0", _),
		"data-testid": `${x}-root`,
		children: [/* @__PURE__ */ y(n, {
			ref: E,
			type: "button",
			variant: "secondary",
			size: f,
			"aria-haspopup": "dialog",
			"aria-expanded": w,
			"aria-controls": w ? D : void 0,
			"data-testid": `${x}-trigger`,
			"data-active": O || void 0,
			onClick: () => T(!w),
			className: t("inline-flex items-center gap-2 whitespace-nowrap", O && "border-primary-border text-primary-fg"),
			children: [
				/* @__PURE__ */ v(be, {}),
				/* @__PURE__ */ v("span", { children: r }),
				O && /* @__PURE__ */ v(a, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${x}-count`,
					"aria-label": `${i} active filters`,
					children: i
				})
			]
		}), /* @__PURE__ */ v(c, {
			open: w,
			onClose: () => T(!1),
			trigger: E,
			placement: ye[d],
			"aria-label": m,
			"data-testid": x,
			className: t("min-w-[280px] max-w-[420px] p-3", b),
			children: /* @__PURE__ */ y("div", {
				id: D,
				className: "flex flex-col gap-3",
				children: [e, o && /* @__PURE__ */ v("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ v(n, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: !O,
						"data-testid": `${x}-clear`,
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
export { F as _, ue as a, w as b, le as c, W as d, ne as f, N as g, L as h, Q as i, Z as l, z as m, _e as n, se as o, V as p, fe as r, ce as s, xe as t, Y as u, M as v, C as x, S as y };
