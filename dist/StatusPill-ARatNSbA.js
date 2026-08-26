import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./overlayStack-8srL4FsO.js";
import { i as r, r as i } from "./focusTrap-CPpSEdvJ.js";
import { createContext as a, useCallback as o, useContext as s, useEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { createPortal as h } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var g = a(null);
function _({ value: e, children: t }) {
	return /* @__PURE__ */ p(g.Provider, {
		value: e,
		children: t
	});
}
function v() {
	let e = s(g);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var y = "'SF Mono', Menlo, monospace", b = 12, x = 1.5, S = b * x, C = 8, w = 10, T = 36;
function E({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: f, "aria-label": h }) {
	let g = u(null), [_, v] = d(!1), E = l(() => Math.max(1, e.split("\n").length), [e]), D = l(() => {
		let e = Math.max(E, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [E, a]), O = Math.min(Math.max(E, a), o) * S + 16, k = E > o, A = (t) => {
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
	}, [k]), /* @__PURE__ */ m("div", { children: [f && f.length > 0 && /* @__PURE__ */ p("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: f.map((e) => /* @__PURE__ */ p("button", {
			type: "button",
			onClick: () => A(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: y },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ m("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", _ && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: y,
			fontSize: b,
			lineHeight: x,
			height: O
		},
		children: [/* @__PURE__ */ p("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: T,
				padding: `${C}px 6px`,
				fontFamily: y,
				lineHeight: x
			},
			children: D
		}), /* @__PURE__ */ p("textarea", {
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
			"aria-label": h,
			spellCheck: !1,
			autoCorrect: "off",
			autoCapitalize: "off",
			className: "flex-1 border-none outline-none resize-none bg-transparent text-text-primary box-border",
			style: {
				padding: `${C}px ${w}px`,
				fontFamily: y,
				fontSize: b,
				lineHeight: x,
				tabSize: 2,
				height: O,
				overflow: k ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var D = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function O({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ p("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function k({ value: e, onChange: t, curated: n }) {
	let [i, a] = d(!1), [s, l] = d(!1), [f, h] = d(""), g = u(null), _ = u(null), v = n ?? D;
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
		let e = f.trim();
		e.length !== 0 && (t(e), h(""), a(!1));
	};
	return /* @__PURE__ */ m("div", {
		className: "relative inline-block",
		ref: g,
		children: [/* @__PURE__ */ p("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": i,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ p("span", {
				"aria-hidden": !0,
				children: e
			})
		}), i ? /* @__PURE__ */ m("div", {
			ref: _,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ p("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: v.map((t, n) => /* @__PURE__ */ p(O, {
					emoji: t,
					active: t === e,
					onPick: y
				}, `${t}-${n}`))
			}), /* @__PURE__ */ m("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ p("input", {
					type: "text",
					value: f,
					onChange: (e) => h(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), b()) : e.key === "Escape" && a(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ p("button", {
					type: "button",
					onClick: b,
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
var A = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function j({ images: e, openIndex: r, onClose: a, onNavigate: o }) {
	let s = u(null), l = u(null), [g, _] = d(r);
	c(() => {
		_(r);
	}, [r]);
	let v = r !== null && e.length > 0, y = n(v), b = o ? r : g ?? r, x = b === null ? 0 : Math.min(Math.max(b, 0), e.length - 1), S = (t) => {
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
	return h(/* @__PURE__ */ m("div", {
		ref: s,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": C.caption ?? C.alt ?? `Image ${x + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: a,
		children: [
			/* @__PURE__ */ m("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					x + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ p("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), a();
				},
				children: "✕"
			}),
			/* @__PURE__ */ m("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ p("img", {
					"data-testid": "image-lightbox-img",
					src: C.src,
					alt: C.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), C.caption && /* @__PURE__ */ p("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: C.caption
				})]
			}),
			w && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(A, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), S(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ p("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(A, "right-3"),
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
var M = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, N = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function P({ value: e, threshold: n = .5, tone: r, size: i = "md", showLabel: a = !0, formatLabel: o, ariaLabel: s, className: c }) {
	let l = Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0, u = r ?? (l >= n ? "success" : "danger"), d = (o ?? F)(l);
	return /* @__PURE__ */ m("div", {
		role: "meter",
		"aria-valuenow": l,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": s ?? `Score ${d} (threshold ${F(n)})`,
		className: t("flex w-full items-center gap-2", c),
		children: [/* @__PURE__ */ p("div", {
			className: t("relative flex-1 overflow-hidden rounded-full bg-surface-panel", N[i]),
			children: /* @__PURE__ */ p("div", {
				className: t("absolute inset-y-0 left-0 rounded-full transition-[width]", M[u]),
				style: { width: `${l * 100}%` }
			})
		}), a ? /* @__PURE__ */ p("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: d
		}) : null]
	});
}
function F(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function I({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ p("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let h = Math.min(...f), g = Math.max(...f), _ = n ?? (h === g ? h - 1 : h), v = r ?? (h === g ? g + 1 : g), y = Math.max(1e-9, v - _), b = f.length === 1 ? 0 : i / (f.length - 1), x = s, S = a - x * 2, C = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * b,
		y: x + S - (e - _) / y * S
	})), w = C.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), T = `${w} L${C[C.length - 1].x.toFixed(2)},${(a - x).toFixed(2)} L${C[0].x.toFixed(2)},${(a - x).toFixed(2)} Z`, E = C[C.length - 1], D = `Trend, ${f.length} points, starts ${L(f[0])}, ends ${L(f[f.length - 1])}`;
	return /* @__PURE__ */ p("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ m("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ p("path", {
					d: T,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ p("path", {
					d: w,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ p("circle", {
					cx: E.x,
					cy: E.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function L(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function R(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function z({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = d(""), [c, f] = d(!1), h = u(null), g = (e) => {
		let r = R(e, a);
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
	}, y = l(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), b = c && y.length > 0;
	return /* @__PURE__ */ m("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ m("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ p("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => _(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ m("div", {
			className: "relative",
			children: [/* @__PURE__ */ p("input", {
				ref: h,
				"data-testid": "tag-editor-input",
				type: "text",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: v,
				onFocus: () => f(!0),
				onBlur: () => {
					setTimeout(() => f(!1), 120);
				},
				"aria-label": e ?? (r || "Add tag"),
				placeholder: r,
				className: "border border-border-emphasis rounded-md px-2.5 py-1.5 text-xs bg-surface-panel w-[140px] min-w-[120px] outline-none font-[inherit] text-text-primary"
			}), b ? /* @__PURE__ */ p("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: y.map((e) => /* @__PURE__ */ m("button", {
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
var B = "";
function V(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function H({ value: n, onChange: r, placeholder: i, maxSelect: a }) {
	let { presenceUsers: o } = v(), { idToken: s } = e(), [f, h] = d(""), [g, _] = d(!1), [y, b] = d(0), [x, S] = d([]), C = u(null), w = u(null), T = l(() => {
		let e = new Set(n), t = [];
		for (let n of o) e.has(n.clientId) || (e.add(n.clientId), t.push({
			userId: n.clientId,
			displayName: V(n.metadata, n.clientId)
		}));
		return t;
	}, [o, n]);
	c(() => {
		let e = f.trim();
		if (!e || !s) {
			S([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			let n = `${B}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
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
	}, [f, s]);
	let E = l(() => {
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
	]), D = l(() => {
		let e = f.trim().toLowerCase();
		return e ? E.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : E;
	}, [E, f]), O = typeof a == "number" && n.length >= a, k = (e) => {
		let t = e.trim();
		t && (n.includes(t) || O || (r([...n, t]), h(""), b(0)));
	}, A = (e) => {
		r(n.filter((t) => t !== e));
	}, j = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), b((e) => Math.min(e + 1, Math.max(D.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), b((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = D[y];
			t ? k(t.userId) : f.trim() && k(f.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !f && n.length > 0 && A(n[n.length - 1]);
	}, M = (e) => {
		let t = o.find((t) => t.clientId === e);
		if (t) return V(t.metadata, e);
		let n = x.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ m("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ p("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ m("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [M(e), /* @__PURE__ */ p("button", {
					type: "button",
					onClick: () => A(e),
					"aria-label": `Remove ${M(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ m("div", {
			className: "relative",
			children: [/* @__PURE__ */ p("input", {
				ref: C,
				type: "text",
				value: f,
				disabled: O,
				"aria-label": O ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: O ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					h(e.target.value), _(!0), b(0);
				},
				onFocus: () => _(!0),
				onBlur: () => {
					w.current = setTimeout(() => _(!1), 120);
				},
				onKeyDown: j,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), g && !O && D.length > 0 && /* @__PURE__ */ p("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), w.current && clearTimeout(w.current);
				},
				children: D.map((e, n) => /* @__PURE__ */ m("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === y ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => b(n),
					onClick: () => {
						k(e.userId), C.current?.focus();
					},
					children: [/* @__PURE__ */ p("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ p("span", {
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
var U = {
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, W = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", G = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", K = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function q({ active: e, onClick: n, color: r, dot: i = !1, size: a = "sm", children: o, className: s, disabled: c = !1, "data-testid": l }) {
	let u = e && !!r, d = u ? {
		background: `${r}22`,
		borderColor: `${r}66`,
		color: r
	} : void 0;
	return /* @__PURE__ */ m("button", {
		type: "button",
		onClick: n,
		disabled: c,
		"aria-pressed": e,
		"data-testid": l,
		className: t("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", U[a], e ? u ? K : G : W, c && "opacity-50 cursor-not-allowed", s),
		style: d,
		children: [i && /* @__PURE__ */ p("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: r || "currentColor" }
		}), o]
	});
}
//#endregion
//#region src/components/shared/StatusPill.tsx
var J = {
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
}, Y = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, X = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function Z({ state: e, label: n, icon: r, size: i = "md", className: a, "data-testid": o }) {
	let s = J[e] ?? J.neutral ?? Object.values(J)[0], c = e === "pending";
	return /* @__PURE__ */ m("span", {
		role: "status",
		"data-testid": o,
		"data-state": e,
		className: t("inline-flex items-center rounded-full border font-medium leading-none select-none", s.pill, s.text, Y[i], a),
		children: [r ? /* @__PURE__ */ p("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ m("span", {
			className: t("relative inline-flex shrink-0", X[i]),
			children: [c && /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				className: t("absolute inset-0 rounded-full animate-ping opacity-75", s.dot)
			}), /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				className: t("relative rounded-full", X[i], s.dot)
			})]
		}), n]
	});
}
//#endregion
export { I as a, D as c, _ as d, v as f, z as i, k as l, q as n, P as o, H as r, j as s, Z as t, E as u };
