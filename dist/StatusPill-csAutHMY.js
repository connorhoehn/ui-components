import { n as e } from "./IdentityContext-m2wQF4sJ.js";
import { t } from "./cn-DhjIN-s0.js";
import { createContext as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { createPortal as d } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var f = n(null);
function p({ value: e, children: t }) {
	return /* @__PURE__ */ l(f.Provider, {
		value: e,
		children: t
	});
}
function m() {
	let e = r(f);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var h = "'SF Mono', Menlo, monospace", g = 12, _ = 1.5, v = g * _, y = 8, b = 10, x = 36;
function S({ value: e, onChange: n, language: r = "plain", placeholder: c, minLines: d = 4, maxLines: f = 20, readOnly: p = !1, variables: m, "aria-label": S }) {
	let C = o(null), [w, T] = s(!1), E = a(() => Math.max(1, e.split("\n").length), [e]), D = a(() => {
		let e = Math.max(E, d), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [E, d]), O = Math.min(Math.max(E, d), f) * v + 16, k = E > f, A = (t) => {
		let r = C.current, i = e ?? "";
		if (!r) {
			n(i + t);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		n(i.slice(0, a) + t + i.slice(o)), queueMicrotask(() => {
			if (C.current) {
				let e = a + t.length;
				C.current.focus(), C.current.setSelectionRange(e, e);
			}
		});
	};
	return i(() => {
		let e = C.current;
		if (!e || !k) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [k]), /* @__PURE__ */ u("div", { children: [m && m.length > 0 && /* @__PURE__ */ l("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: m.map((e) => /* @__PURE__ */ l("button", {
			type: "button",
			onClick: () => A(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: h },
			title: `Insert {{ ${e} }}`,
			disabled: p,
			children: e
		}, e))
	}), /* @__PURE__ */ u("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", w && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: h,
			fontSize: g,
			lineHeight: _,
			height: O
		},
		children: [/* @__PURE__ */ l("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: x,
				padding: `${y}px 6px`,
				fontFamily: h,
				lineHeight: _
			},
			children: D
		}), /* @__PURE__ */ l("textarea", {
			ref: C,
			value: e,
			onChange: (e) => {
				n(e.target.value);
			},
			onKeyDown: (e) => {
				p || e.key === "Tab" && (e.preventDefault(), A("  "));
			},
			onFocus: () => T(!0),
			onBlur: () => T(!1),
			placeholder: c,
			readOnly: p,
			"aria-label": S,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${y}px ${b}px`,
				fontFamily: h,
				fontSize: g,
				lineHeight: _,
				tabSize: 2,
				height: O,
				overflow: k ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var C = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function w({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ l("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function T({ value: e, onChange: t, curated: n }) {
	let [r, a] = s(!1), [c, d] = s(!1), [f, p] = s(""), m = o(null), h = o(null), g = n ?? C;
	i(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			m.current && m.current.contains(t) || h.current && h.current.contains(t) || a(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]);
	let _ = (e) => {
		t(e), a(!1);
	}, v = () => {
		let e = f.trim();
		e.length !== 0 && (t(e), p(""), a(!1));
	};
	return /* @__PURE__ */ u("div", {
		className: "relative inline-block",
		ref: m,
		children: [/* @__PURE__ */ l("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ l("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ u("div", {
			ref: h,
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ l("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: g.map((t, n) => /* @__PURE__ */ l(w, {
					emoji: t,
					active: t === e,
					onPick: _
				}, `${t}-${n}`))
			}), /* @__PURE__ */ u("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ l("input", {
					type: "text",
					value: f,
					onChange: (e) => p(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), v()) : e.key === "Escape" && a(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ l("button", {
					type: "button",
					onClick: v,
					disabled: f.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var E = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function D({ images: e, openIndex: n, onClose: r, onNavigate: a }) {
	let f = o(null), p = o(null), [m, h] = s(n);
	i(() => {
		h(n);
	}, [n]);
	let g = n !== null && e.length > 0, _ = a ? n : m ?? n, v = _ === null ? 0 : Math.min(Math.max(_, 0), e.length - 1), y = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (v + t + n) % n;
		a ? a(r) : h(r);
	};
	if (i(() => {
		if (g) return p.current = typeof document < "u" ? document.activeElement : null, f.current?.focus(), () => {
			let e = p.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), p.current = null;
		};
	}, [g]), i(() => {
		if (!g) return;
		let e = (e) => {
			e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), y(-1)) : e.key === "ArrowRight" && (e.preventDefault(), y(1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		v,
		e.length,
		r,
		a
	]), !g) return null;
	let b = e[v], x = e.length > 1;
	return d(/* @__PURE__ */ u("div", {
		ref: f,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": b.caption ?? b.alt ?? `Image ${v + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ u("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					v + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ l("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ u("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ l("img", {
					"data-testid": "image-lightbox-img",
					src: b.src,
					alt: b.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), b.caption && /* @__PURE__ */ l("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: b.caption
				})]
			}),
			x && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(E, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), y(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ l("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(E, "right-3"),
				onClick: (e) => {
					e.stopPropagation(), y(1);
				},
				children: "›"
			})] })
		]
	}), document.body);
}
//#endregion
//#region src/components/shared/ScoreBarGauge.tsx
var O = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, k = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function A({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let d = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, f = r ?? (d >= n ? "success" : "danger"), p = (o ?? j)(d);
	return /* @__PURE__ */ u("div", {
		role: "meter",
		"aria-valuenow": d,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${p} (threshold ${j(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ l("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", k[i]),
			children: /* @__PURE__ */ l("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", O[f]),
				style: { width: `${d * 100}%` }
			})
		}), a ? /* @__PURE__ */ l("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: p
		}) : null]
	});
}
function j(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function M({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: d = !0, ariaLabel: f, className: p }) {
	let m = e.filter((e) => Number.isFinite(e));
	if (m.length === 0) return /* @__PURE__ */ l("div", {
		role: "img",
		"aria-label": f ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", p),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let h = Math.min(...m), g = Math.max(...m), _ = n ?? (h === g ? h - 1 : h), v = r ?? (h === g ? g + 1 : g), y = Math.max(1e-9, v - _), b = m.length === 1 ? 0 : i / (m.length - 1), x = s, S = a - x * 2, C = m.map((e, t) => ({
		x: m.length === 1 ? i / 2 : t * b,
		y: x + S - (e - _) / y * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${m.length} points, starts ${N(m[0])}, ends ${N(m[m.length - 1])}`;
	return /* @__PURE__ */ l("div", {
		role: "img",
		"aria-label": f ?? D,
		className: t("inline-block align-middle text-text-secondary", p),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ u("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				d ? /* @__PURE__ */ l("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ l("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ l("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function N(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function P(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function F({ value: e, onChange: t, placeholder: n = "add tag...", suggestions: r, lowercase: i = !0 }) {
	let [c, d] = s(""), [f, p] = s(!1), m = o(null), h = (n) => {
		let r = P(n, i);
		if (r) {
			if (e.includes(r)) {
				d("");
				return;
			}
			t([...e, r]), d("");
		}
	}, g = (n) => {
		t(e.filter((e) => e !== n));
	}, _ = (t) => {
		if (t.key === "Enter") {
			t.preventDefault(), h(c);
			return;
		}
		t.key === "Backspace" && c === "" && e.length > 0 && (t.preventDefault(), g(e[e.length - 1]));
	}, v = a(() => {
		if (!r || r.length === 0) return [];
		let t = c.trim().toLowerCase(), n = new Set(e.map((e) => e.toLowerCase()));
		return r.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((e) => !t || e.includes(t)).slice(0, 12);
	}, [
		r,
		e,
		c
	]), y = f && v.length > 0;
	return /* @__PURE__ */ u("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [e.map((e) => /* @__PURE__ */ u("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ l("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => g(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ u("div", {
			className: "relative",
			children: [/* @__PURE__ */ l("input", {
				ref: m,
				"data-testid": "tag-editor-input",
				type: "text",
				value: c,
				onChange: (e) => d(e.target.value),
				onKeyDown: _,
				onFocus: () => p(!0),
				onBlur: () => {
					setTimeout(() => p(!1), 120);
				},
				placeholder: n,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), y ? /* @__PURE__ */ l("div", {
				className: "absolute top-full mt-1 bg-white border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: v.map((e) => /* @__PURE__ */ u("button", {
					type: "button",
					onMouseDown: (e) => {
						e.preventDefault();
					},
					onClick: () => h(e),
					className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary cursor-pointer border border-dashed border-border-emphasis",
					children: ["+ ", e]
				}, e))
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/shared/UserPicker.tsx
var I = "";
function L(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function R({ value: n, onChange: r, placeholder: c, maxSelect: d }) {
	let { presenceUsers: f } = m(), { idToken: p } = e(), [h, g] = s(""), [_, v] = s(!1), [y, b] = s(0), [x, S] = s([]), C = o(null), w = o(null), T = a(() => {
		let e = new Set(n), t = [];
		for (let n of f) e.has(n.clientId) || (e.add(n.clientId), t.push({
			userId: n.clientId,
			displayName: L(n.metadata, n.clientId)
		}));
		return t;
	}, [f, n]);
	i(() => {
		let e = h.trim();
		if (!e || !p) {
			S([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			let n = `${I}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${p}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				S(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [h, p]);
	let E = a(() => {
		let e = new Set(n), t = [];
		for (let n of T) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of x) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		T,
		x,
		n
	]), D = a(() => {
		let e = h.trim().toLowerCase();
		return e ? E.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : E;
	}, [E, h]), O = typeof d == "number" && n.length >= d, k = (e) => {
		let t = e.trim();
		t && (n.includes(t) || O || (r([...n, t]), g(""), b(0)));
	}, A = (e) => {
		r(n.filter((t) => t !== e));
	}, j = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), v(!0), b((e) => Math.min(e + 1, Math.max(D.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), b((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = D[y];
			t ? k(t.userId) : h.trim() && k(h.trim());
		} else e.key === "Escape" ? v(!1) : e.key === "Backspace" && !h && n.length > 0 && A(n[n.length - 1]);
	}, M = (e) => {
		let t = f.find((t) => t.clientId === e);
		if (t) return L(t.metadata, e);
		let n = x.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ u("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ l("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ u("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [M(e), /* @__PURE__ */ l("button", {
					type: "button",
					onClick: () => A(e),
					"aria-label": `Remove ${M(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ u("div", {
			className: "relative",
			children: [/* @__PURE__ */ l("input", {
				ref: C,
				type: "text",
				value: h,
				disabled: O,
				placeholder: O ? `Max ${d} selected` : c ?? "Search users…",
				onChange: (e) => {
					g(e.target.value), v(!0), b(0);
				},
				onFocus: () => v(!0),
				onBlur: () => {
					w.current = setTimeout(() => v(!1), 120);
				},
				onKeyDown: j,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), _ && !O && D.length > 0 && /* @__PURE__ */ l("div", {
				className: "absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), w.current && clearTimeout(w.current);
				},
				children: D.map((e, n) => /* @__PURE__ */ u("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === y ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => b(n),
					onClick: () => {
						k(e.userId), C.current?.focus();
					},
					children: [/* @__PURE__ */ l("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ l("span", {
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
var z = {
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, B = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", V = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", H = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function U({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": d }) {
	let f = e && !!r, p = f ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ u("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": d,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", z[a], e ? f ? H : V : B, c && "opacity-50 cursor-not-allowed", s),
		style: p,
		children: [i && /* @__PURE__ */ l("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/StatusPill.tsx
var W = {
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
}, G = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, K = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function q({ state: e, label: n, icon: r, size: i = "md", className: a, "data-testid": o }) {
	let s = W[e], c = e === "pending";
	return /* @__PURE__ */ u("span", {
		role: "status",
		"data-testid": o,
		"data-state": e,
		className: t("inline-flex items-center rounded-full border font-medium leading-none select-none", s.pill, s.text, G[i], a),
		children: [r ? /* @__PURE__ */ l("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ u("span", {
			className: t("relative inline-flex shrink-0", K[i]),
			children: [c && /* @__PURE__ */ l("span", {
				"aria-hidden": "true",
				className: t("absolute inset-0 rounded-full animate-ping opacity-75", s.dot)
			}), /* @__PURE__ */ l("span", {
				"aria-hidden": "true",
				className: t("relative rounded-full", K[i], s.dot)
			})]
		}), n]
	});
}
//#endregion
export { M as a, C as c, p as d, m as f, F as i, T as l, U as n, A as o, R as r, D as s, q as t, S as u };
