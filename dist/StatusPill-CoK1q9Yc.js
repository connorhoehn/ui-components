import { n as e } from "./IdentityContext-m2wQF4sJ.js";
import { t } from "./cn-DhjIN-s0.js";
import { r as n } from "./focusTrap-BWX7tm6P.js";
import { createContext as r, useContext as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { createPortal as f } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var p = r(null);
function m({ value: e, children: t }) {
	return /* @__PURE__ */ u(p.Provider, {
		value: e,
		children: t
	});
}
function h() {
	let e = i(p);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var g = "'SF Mono', Menlo, monospace", _ = 12, v = 1.5, y = _ * v, b = 8, x = 10, S = 36;
function C({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: l = 4, maxLines: f = 20, readOnly: p = !1, variables: m, "aria-label": h }) {
	let C = s(null), [w, T] = c(!1), E = o(() => Math.max(1, e.split("\n").length), [e]), D = o(() => {
		let e = Math.max(E, l), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [E, l]), O = Math.min(Math.max(E, l), f) * y + 16, k = E > f, A = (t) => {
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
	return a(() => {
		let e = C.current;
		if (!e || !k) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [k]), /* @__PURE__ */ d("div", { children: [m && m.length > 0 && /* @__PURE__ */ u("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: m.map((e) => /* @__PURE__ */ u("button", {
			type: "button",
			onClick: () => A(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: g },
			title: `Insert {{ ${e} }}`,
			disabled: p,
			children: e
		}, e))
	}), /* @__PURE__ */ d("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", w && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: g,
			fontSize: _,
			lineHeight: v,
			height: O
		},
		children: [/* @__PURE__ */ u("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: S,
				padding: `${b}px 6px`,
				fontFamily: g,
				lineHeight: v
			},
			children: D
		}), /* @__PURE__ */ u("textarea", {
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
			placeholder: i,
			readOnly: p,
			"aria-label": h,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${b}px ${x}px`,
				fontFamily: g,
				fontSize: _,
				lineHeight: v,
				tabSize: 2,
				height: O,
				overflow: k ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var w = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function T({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ u("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function E({ value: e, onChange: t, curated: n }) {
	let [r, i] = c(!1), [o, l] = c(!1), [f, p] = c(""), m = s(null), h = s(null), g = n ?? w;
	a(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			m.current && m.current.contains(t) || h.current && h.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]);
	let _ = (e) => {
		t(e), i(!1);
	}, v = () => {
		let e = f.trim();
		e.length !== 0 && (t(e), p(""), i(!1));
	};
	return /* @__PURE__ */ d("div", {
		className: "relative inline-block",
		ref: m,
		children: [/* @__PURE__ */ u("button", {
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ u("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ d("div", {
			ref: h,
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ u("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: g.map((t, n) => /* @__PURE__ */ u(T, {
					emoji: t,
					active: t === e,
					onPick: _
				}, `${t}-${n}`))
			}), /* @__PURE__ */ d("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ u("input", {
					type: "text",
					value: f,
					onChange: (e) => p(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), v()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ u("button", {
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
var D = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function O({ images: e, openIndex: r, onClose: i, onNavigate: o }) {
	let p = s(null), m = s(null), [h, g] = c(r);
	a(() => {
		g(r);
	}, [r]);
	let _ = r !== null && e.length > 0, v = o ? r : h ?? r, y = v === null ? 0 : Math.min(Math.max(v, 0), e.length - 1), b = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (y + t + n) % n;
		o ? o(r) : g(r);
	};
	if (a(() => {
		if (_) return m.current = typeof document < "u" ? document.activeElement : null, p.current?.focus(), () => {
			let e = m.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), m.current = null;
		};
	}, [_]), a(() => {
		if (!_) return;
		let e = (e) => {
			e.key === "Tab" ? n(e, p.current) : e.key === "Escape" ? (e.stopPropagation(), i()) : e.key === "ArrowLeft" ? (e.preventDefault(), b(-1)) : e.key === "ArrowRight" && (e.preventDefault(), b(1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		_,
		y,
		e.length,
		i,
		o
	]), !_) return null;
	let x = e[y], S = e.length > 1;
	return f(/* @__PURE__ */ d("div", {
		ref: p,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": x.caption ?? x.alt ?? `Image ${y + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: i,
		children: [
			/* @__PURE__ */ d("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					y + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ u("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				children: "✕"
			}),
			/* @__PURE__ */ d("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ u("img", {
					"data-testid": "image-lightbox-img",
					src: x.src,
					alt: x.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), x.caption && /* @__PURE__ */ u("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: x.caption
				})]
			}),
			S && /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(D, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), b(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ u("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(D, "right-3"),
				onClick: (e) => {
					e.stopPropagation(), b(1);
				},
				children: "›"
			})] })
		]
	}), document.body);
}
//#endregion
//#region src/components/shared/ScoreBarGauge.tsx
var k = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, A = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function j({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, f = r ?? (l >= n ? "success" : "danger"), p = (o ?? M)(l);
	return /* @__PURE__ */ d("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${p} (threshold ${M(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ u("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", A[i]),
			children: /* @__PURE__ */ u("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", k[f]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ u("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: p
		}) : null]
	});
}
function M(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function N({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: f, className: p }) {
	let m = e.filter((e) => Number.isFinite(e));
	if (m.length === 0) return /* @__PURE__ */ u("div", {
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
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${m.length} points, starts ${P(m[0])}, ends ${P(m[m.length - 1])}`;
	return /* @__PURE__ */ u("div", {
		role: "img",
		"aria-label": f ?? D,
		className: t("inline-block align-middle text-text-secondary", p),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ d("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ u("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ u("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ u("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function P(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function F(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function I({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [l, f] = c(""), [p, m] = c(!1), h = s(null), g = (e) => {
		let r = F(e, a);
		if (r) {
			if (t.includes(r)) {
				f("");
				return;
			}
			n([...t, r]), f("");
		}
	}, _ = (e) => {
		n(t.filter((t) => t !== e));
	}, v = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), g(l);
			return;
		}
		e.key === "Backspace" && l === "" && t.length > 0 && (e.preventDefault(), _(t[t.length - 1]));
	}, y = o(() => {
		if (!i || i.length === 0) return [];
		let e = l.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		l
	]), b = p && y.length > 0;
	return /* @__PURE__ */ d("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ d("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ u("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => _(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ d("div", {
			className: "relative",
			children: [/* @__PURE__ */ u("input", {
				ref: h,
				"data-testid": "tag-editor-input",
				type: "text",
				value: l,
				onChange: (e) => f(e.target.value),
				onKeyDown: v,
				onFocus: () => m(!0),
				onBlur: () => {
					setTimeout(() => m(!1), 120);
				},
				"aria-label": e ?? (r || "Add tag"),
				placeholder: r,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), b ? /* @__PURE__ */ u("div", {
				className: "absolute top-full mt-1 bg-white border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: y.map((e) => /* @__PURE__ */ d("button", {
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
var L = "";
function R(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function z({ value: n, onChange: r, placeholder: i, maxSelect: l }) {
	let { presenceUsers: f } = h(), { idToken: p } = e(), [m, g] = c(""), [_, v] = c(!1), [y, b] = c(0), [x, S] = c([]), C = s(null), w = s(null), T = o(() => {
		let e = new Set(n), t = [];
		for (let n of f) e.has(n.clientId) || (e.add(n.clientId), t.push({
			userId: n.clientId,
			displayName: R(n.metadata, n.clientId)
		}));
		return t;
	}, [f, n]);
	a(() => {
		let e = m.trim();
		if (!e || !p) {
			S([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			let n = `${L}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
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
	}, [m, p]);
	let E = o(() => {
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
	]), D = o(() => {
		let e = m.trim().toLowerCase();
		return e ? E.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : E;
	}, [E, m]), O = typeof l == "number" && n.length >= l, k = (e) => {
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
			t ? k(t.userId) : m.trim() && k(m.trim());
		} else e.key === "Escape" ? v(!1) : e.key === "Backspace" && !m && n.length > 0 && A(n[n.length - 1]);
	}, M = (e) => {
		let t = f.find((t) => t.clientId === e);
		if (t) return R(t.metadata, e);
		let n = x.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ d("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ u("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ d("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [M(e), /* @__PURE__ */ u("button", {
					type: "button",
					onClick: () => A(e),
					"aria-label": `Remove ${M(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ d("div", {
			className: "relative",
			children: [/* @__PURE__ */ u("input", {
				ref: C,
				type: "text",
				value: m,
				disabled: O,
				"aria-label": O ? `Max ${l} selected` : i ?? "Search users…",
				placeholder: O ? `Max ${l} selected` : i ?? "Search users…",
				onChange: (e) => {
					g(e.target.value), v(!0), b(0);
				},
				onFocus: () => v(!0),
				onBlur: () => {
					w.current = setTimeout(() => v(!1), 120);
				},
				onKeyDown: j,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), _ && !O && D.length > 0 && /* @__PURE__ */ u("div", {
				className: "absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), w.current && clearTimeout(w.current);
				},
				children: D.map((e, n) => /* @__PURE__ */ d("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === y ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => b(n),
					onClick: () => {
						k(e.userId), C.current?.focus();
					},
					children: [/* @__PURE__ */ u("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ u("span", {
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
var B = {
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, V = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", H = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", U = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function W({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": l }) {
	let f = e && !!r, p = f ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ d("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", B[a], e ? f ? U : H : V, c && "opacity-50 cursor-not-allowed", s),
		style: p,
		children: [i && /* @__PURE__ */ u("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/StatusPill.tsx
var G = {
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
}, K = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, q = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function J({ state: e, label: n, icon: r, size: i = "md", className: a, "data-testid": o }) {
	let s = G[e], c = e === "pending";
	return /* @__PURE__ */ d("span", {
		role: "status",
		"data-testid": o,
		"data-state": e,
		className: t("inline-flex items-center rounded-full border font-medium leading-none select-none", s.pill, s.text, K[i], a),
		children: [r ? /* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ d("span", {
			className: t("relative inline-flex shrink-0", q[i]),
			children: [c && /* @__PURE__ */ u("span", {
				"aria-hidden": "true",
				className: t("absolute inset-0 rounded-full animate-ping opacity-75", s.dot)
			}), /* @__PURE__ */ u("span", {
				"aria-hidden": "true",
				className: t("relative rounded-full", q[i], s.dot)
			})]
		}), n]
	});
}
//#endregion
export { N as a, w as c, m as d, h as f, I as i, E as l, W as n, j as o, z as r, O as s, J as t, C as u };
