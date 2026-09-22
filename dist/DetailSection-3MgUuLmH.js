import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./overlayStack-BDlo8PJg.js";
import { i as r, r as i } from "./focusTrap-w9Uk7DPx.js";
import { createContext as a, useCallback as o, useContext as s, useEffect as c, useId as l, useMemo as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
import { createPortal as g } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var _ = a(null);
function v({ value: e, children: t }) {
	return /* @__PURE__ */ m(_.Provider, {
		value: e,
		children: t
	});
}
function y() {
	let e = s(_);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function b() {
	return s(_);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var x = "'SF Mono', Menlo, monospace", S = 12, C = 1.5, w = S * C, T = 8, E = 10, D = 36;
function O({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: l, "aria-label": p }) {
	let g = d(null), [_, v] = f(!1), y = u(() => Math.max(1, e.split("\n").length), [e]), b = u(() => {
		let e = Math.max(y, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [y, a]), O = Math.min(Math.max(y, a), o) * w + 16, k = y > o, A = (t) => {
		let r = g.current, i = e ?? "";
		if (!r) {
			n(i + t);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		n(i.slice(0, a) + t + i.slice(o)), queueMicrotask(() => {
			if (g.current) {
				let e = a + t.length;
				g.current.focus(), g.current.setSelectionRange(e, e);
			}
		});
	};
	return c(() => {
		let e = g.current;
		if (!e || !k) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [k]), /* @__PURE__ */ h("div", { children: [l && l.length > 0 && /* @__PURE__ */ m("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: l.map((e) => /* @__PURE__ */ m("button", {
			type: "button",
			onClick: () => A(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: x },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ h("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", _ && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: x,
			fontSize: S,
			lineHeight: C,
			height: O
		},
		children: [/* @__PURE__ */ m("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: D,
				padding: `${T}px 6px`,
				fontFamily: x,
				lineHeight: C
			},
			children: b
		}), /* @__PURE__ */ m("textarea", {
			ref: g,
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
			"aria-label": p,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${T}px ${E}px`,
				fontFamily: x,
				fontSize: S,
				lineHeight: C,
				tabSize: 2,
				height: O,
				overflow: k ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var k = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function A({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ m("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function j({ value: e, onChange: t, curated: n }) {
	let [i, a] = f(!1), [s, l] = f(!1), [u, p] = f(""), g = d(null), _ = d(null), v = n ?? k;
	c(() => {
		if (!i) return;
		let e = (e) => {
			let t = e.target;
			g.current && g.current.contains(t) || _.current && _.current.contains(t) || a(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [i]), r(i, o(() => a(!1), []));
	let y = (e) => {
		t(e), a(!1);
	}, b = () => {
		let e = u.trim();
		e.length !== 0 && (t(e), p(""), a(!1));
	};
	return /* @__PURE__ */ h("div", {
		className: "relative inline-block",
		ref: g,
		children: [/* @__PURE__ */ m("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": i,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				children: e
			})
		}), i ? /* @__PURE__ */ h("div", {
			ref: _,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ m("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: v.map((t, n) => /* @__PURE__ */ m(A, {
					emoji: t,
					active: t === e,
					onPick: y
				}, `${t}-${n}`))
			}), /* @__PURE__ */ h("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ m("input", {
					type: "text",
					value: u,
					onChange: (e) => p(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), b()) : e.key === "Escape" && a(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ m("button", {
					type: "button",
					onClick: b,
					disabled: u.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var M = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function N({ images: e, openIndex: r, onClose: a, onNavigate: o }) {
	let s = d(null), l = d(null), [u, _] = f(r);
	c(() => {
		_(r);
	}, [r]);
	let v = r !== null && e.length > 0, y = n(v), b = o ? r : u ?? r, x = b === null ? 0 : Math.min(Math.max(b, 0), e.length - 1), S = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (x + t + n) % n;
		o ? o(r) : _(r);
	};
	if (c(() => {
		if (v) return l.current = typeof document < "u" ? document.activeElement : null, s.current?.focus(), () => {
			let e = l.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), l.current = null;
		};
	}, [v]), c(() => {
		if (!v) return;
		let e = (e) => {
			y() && (e.key === "Tab" ? i(e, s.current) : e.key === "Escape" ? (e.stopPropagation(), a()) : e.key === "ArrowLeft" ? (e.preventDefault(), S(-1)) : e.key === "ArrowRight" && (e.preventDefault(), S(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		v,
		x,
		e.length,
		a,
		o,
		y
	]), !v) return null;
	let C = e[x], w = e.length > 1;
	return g(/* @__PURE__ */ h("div", {
		ref: s,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": C.caption ?? C.alt ?? `Image ${x + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: a,
		children: [
			/* @__PURE__ */ h("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					x + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ m("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), a();
				},
				children: "✕"
			}),
			/* @__PURE__ */ h("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ m("img", {
					"data-testid": "image-lightbox-img",
					src: C.src,
					alt: C.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), C.caption && /* @__PURE__ */ m("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: C.caption
				})]
			}),
			w && /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(M, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), S(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ m("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(M, "right-3"),
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
var P = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, F = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function I({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, u = r ?? (l >= n ? "success" : "danger"), d = (o ?? L)(l);
	return /* @__PURE__ */ h("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${d} (threshold ${L(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ m("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", F[i]),
			children: /* @__PURE__ */ m("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", P[u]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ m("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: d
		}) : null]
	});
}
function L(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function R({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ m("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), g = Math.max(...f), _ = n ?? (p === g ? p - 1 : p), v = r ?? (p === g ? g + 1 : g), y = Math.max(1e-9, v - _), b = f.length === 1 ? 0 : i / (f.length - 1), x = s, S = a - x * 2, C = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * b,
		y: x + S - (e - _) / y * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${f.length} points, starts ${z(f[0])}, ends ${z(f[f.length - 1])}`;
	return /* @__PURE__ */ m("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ h("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ m("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ m("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ m("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function z(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function B(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function V({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = f(""), [c, l] = f(!1), p = d(null), g = (e) => {
		let r = B(e, a);
		if (r) {
			if (t.includes(r)) {
				s("");
				return;
			}
			n([...t, r]), s("");
		}
	}, _ = (e) => {
		n(t.filter((t) => t !== e));
	}, v = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), g(o);
			return;
		}
		e.key === "Backspace" && o === "" && t.length > 0 && (e.preventDefault(), _(t[t.length - 1]));
	}, y = u(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), b = c && y.length > 0;
	return /* @__PURE__ */ h("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ h("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ m("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => _(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ h("div", {
			className: "relative",
			children: [/* @__PURE__ */ m("input", {
				ref: p,
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
			}), b ? /* @__PURE__ */ m("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: y.map((e) => /* @__PURE__ */ h("button", {
					type: "button",
					onMouseDown: (e) => {
						e.preventDefault();
					},
					onClick: () => g(e),
					className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary cursor-pointer border border-dashed border-border-emphasis",
					children: ["+ ", e]
				}, e))
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/shared/UserPicker.tsx
var H = "";
function U(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function W({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: l, baseUrl: p }) {
	let g = b(), _ = e(), v = o ?? g?.presenceUsers ?? [], y = s === void 0 ? _?.idToken ?? null : s, [x, S] = f(""), [C, w] = f(!1), [T, E] = f(0), [D, O] = f([]), k = d(null), A = d(null), j = u(() => {
		let e = new Set(n), t = [];
		for (let n of v) {
			let r = n.metadata.userId ?? n.clientId;
			e.has(r) || (e.add(r), t.push({
				userId: r,
				displayName: U(n.metadata, r)
			}));
		}
		return t;
	}, [v, n]);
	c(() => {
		let e = x.trim();
		if (!e) {
			O([]);
			return;
		}
		if (!l && !y) {
			O([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (l) {
				Promise.resolve(l(e, t.signal)).then((e) => O(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${p ?? H}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${y}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				O(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		x,
		y,
		l,
		p
	]);
	let M = u(() => {
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
	]), N = u(() => {
		let e = x.trim().toLowerCase();
		return e ? M.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : M;
	}, [M, x]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), S(""), E(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), w(!0), E((e) => Math.min(e + 1, Math.max(N.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), E((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = N[T];
			t ? F(t.userId) : x.trim() && F(x.trim());
		} else e.key === "Escape" ? w(!1) : e.key === "Backspace" && !x && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = v.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return U(t.metadata, e);
		let n = D.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ h("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ m("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ h("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ m("button", {
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ h("div", {
			className: "relative",
			children: [/* @__PURE__ */ m("input", {
				ref: k,
				type: "text",
				value: x,
				disabled: P,
				"aria-label": P ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: P ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					S(e.target.value), w(!0), E(0);
				},
				onFocus: () => w(!0),
				onBlur: () => {
					A.current = setTimeout(() => w(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), C && !P && N.length > 0 && /* @__PURE__ */ m("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), A.current && clearTimeout(A.current);
				},
				children: N.map((e, n) => /* @__PURE__ */ h("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === T ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => E(n),
					onClick: () => {
						F(e.userId), k.current?.focus();
					},
					children: [/* @__PURE__ */ m("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ m("span", {
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
	return /* @__PURE__ */ h("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", G[a], e ? u ? J : q : K, c && "opacity-50 cursor-not-allowed", s),
		style: d,
		children: [i && /* @__PURE__ */ m("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function X({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = l();
	return /* @__PURE__ */ m("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ h("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ h("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ m("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ m("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ m("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ h("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ m("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ m("span", {
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
var Z = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function Q({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = Z[n];
	return e == null ? /* @__PURE__ */ m("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ h("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ m("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ m("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ m("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function $({ title: e, hint: n, actions: r, first: i = !1, children: a, className: o, "data-testid": s }) {
	return /* @__PURE__ */ h("section", {
		className: t(o),
		...s ? { "data-testid": s } : {},
		children: [
			!i && /* @__PURE__ */ m(Q, { spacing: "md" }),
			/* @__PURE__ */ h("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ m("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ m("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					r != null && /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m("span", { className: "flex-1" }), r] })
				]
			}),
			a
		]
	});
}
//#endregion
export { W as a, I as c, j as d, O as f, y as h, Y as i, N as l, b as m, Q as n, V as o, v as p, X as r, R as s, $ as t, k as u };
