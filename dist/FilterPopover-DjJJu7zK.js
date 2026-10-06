import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-D4QmbyEy.js";
import { n } from "./Button-C2OEUpX-.js";
import { t as r } from "./overlayStack-D0Hf2ZrU.js";
import { t as i } from "./Chip-0zFpfJ52.js";
import { j as a } from "./Icons-D2Jd38B6.js";
import { i as o, r as s } from "./focusTrap-Cj-AL49l.js";
import { n as c, t as l } from "./DropdownMenu-zZZX4CFi.js";
import { a as u, c as d, d as f, i as p, l as m, n as h, o as g } from "./railType-DaEA_kg6.js";
import { createContext as _, useCallback as v, useContext as y, useEffect as b, useId as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import { createPortal as O } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var k = _(null);
function A({ value: e, children: t }) {
	return /* @__PURE__ */ E(k.Provider, {
		value: e,
		children: t
	});
}
function j() {
	let e = y(k);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function M() {
	return y(k);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var N = "'SF Mono', Menlo, monospace", P = 12, F = 1.5, I = P * F, L = 8, R = 10, ee = 36;
function z({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = C(null), [d, f] = w(!1), p = S(() => Math.max(1, e.split("\n").length), [e]), m = S(() => {
		let e = Math.max(p, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [p, a]), h = Math.min(Math.max(p, a), o) * I + 16, g = p > o, _ = (t) => {
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
	return b(() => {
		let e = u.current;
		if (!e || !g) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [g]), /* @__PURE__ */ D("div", { children: [c && c.length > 0 && /* @__PURE__ */ E("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ E("button", {
			type: "button",
			onClick: () => _(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: N },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ D("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: N,
			fontSize: P,
			lineHeight: F,
			height: h
		},
		children: [/* @__PURE__ */ E("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: ee,
				padding: `${L}px 6px`,
				fontFamily: N,
				lineHeight: F
			},
			children: m
		}), /* @__PURE__ */ E("textarea", {
			ref: u,
			value: e,
			onChange: (e) => {
				n(e.target.value);
			},
			onKeyDown: (e) => {
				s || e.key === "Tab" && (e.preventDefault(), _("  "));
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
				padding: `${L}px ${R}px`,
				fontFamily: N,
				fontSize: P,
				lineHeight: F,
				tabSize: 2,
				height: h,
				overflow: g ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var B = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function V({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ E("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function H({ value: e, onChange: t, curated: n }) {
	let [r, i] = w(!1), [a, s] = w(!1), [c, l] = w(""), u = C(null), d = C(null), f = n ?? B;
	b(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			u.current && u.current.contains(t) || d.current && d.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), o(r, v(() => i(!1), []));
	let p = (e) => {
		t(e), i(!1);
	}, m = () => {
		let e = c.trim();
		e.length !== 0 && (t(e), l(""), i(!1));
	};
	return /* @__PURE__ */ D("div", {
		className: "relative inline-block",
		ref: u,
		children: [/* @__PURE__ */ E("button", {
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ D("div", {
			ref: d,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ E("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: f.map((t, n) => /* @__PURE__ */ E(V, {
					emoji: t,
					active: t === e,
					onPick: p
				}, `${t}-${n}`))
			}), /* @__PURE__ */ D("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ E("input", {
					type: "text",
					value: c,
					onChange: (e) => l(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), m()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: m,
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
var U = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function W({ images: e, openIndex: n, onClose: i, onNavigate: a }) {
	let o = C(null), c = C(null), [l, u] = w(n);
	b(() => {
		u(n);
	}, [n]);
	let d = n !== null && e.length > 0, f = r(d), p = a ? n : l ?? n, m = p === null ? 0 : Math.min(Math.max(p, 0), e.length - 1), h = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (m + t + n) % n;
		a ? a(r) : u(r);
	};
	if (b(() => {
		if (d) return c.current = typeof document < "u" ? document.activeElement : null, o.current?.focus(), () => {
			let e = c.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), c.current = null;
		};
	}, [d]), b(() => {
		if (!d) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? s(e, o.current) : e.key === "Escape" ? (e.stopPropagation(), i()) : e.key === "ArrowLeft" ? (e.preventDefault(), h(-1)) : e.key === "ArrowRight" && (e.preventDefault(), h(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		m,
		e.length,
		i,
		a,
		f
	]), !d) return null;
	let g = e[m], _ = e.length > 1;
	return O(/* @__PURE__ */ D("div", {
		ref: o,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": g.caption ?? g.alt ?? `Image ${m + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: i,
		children: [
			/* @__PURE__ */ D("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					m + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ E("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				children: "✕"
			}),
			/* @__PURE__ */ D("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ E("img", {
					"data-testid": "image-lightbox-img",
					src: g.src,
					alt: g.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), g.caption && /* @__PURE__ */ E("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: g.caption
				})]
			}),
			_ && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(U, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), h(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ E("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(U, "right-3"),
				onClick: (e) => {
					e.stopPropagation(), h(1);
				},
				children: "›"
			})] })
		]
	}), document.body);
}
//#endregion
//#region src/components/shared/TrendSparkline.tsx
function G({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ E("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: t("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = n ?? (p === m ? p - 1 : p), g = r ?? (p === m ? m + 1 : m), _ = Math.max(1e-9, g - h), v = f.length === 1 ? 0 : i / (f.length - 1), y = s, b = a - y * 2, x = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * v,
		y: y + b - (e - h) / _ * b
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), C = `${S} L${x[x.length - 1].x.toFixed(2)},${(a - y).toFixed(2)} L${x[0].x.toFixed(2)},${(a - y).toFixed(2)} Z`, w = x[x.length - 1], T = `Trend, ${f.length} points, starts ${K(f[0])}, ends ${K(f[f.length - 1])}`;
	return /* @__PURE__ */ E("div", {
		role: "img",
		"aria-label": u ?? T,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ D("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ E("path", {
					d: C,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ E("path", {
					d: S,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ E("circle", {
					cx: w.x,
					cy: w.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function K(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function q(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function te({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = w(""), [c, l] = w(!1), u = C(null), d = (e) => {
		let r = q(e, a);
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
	}, m = S(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), h = c && m.length > 0;
	return /* @__PURE__ */ D("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ D("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ E("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ D("div", {
			className: "relative",
			children: [/* @__PURE__ */ E("input", {
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
			}), h ? /* @__PURE__ */ E("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ D("button", {
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
var ne = "";
function J(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function Y({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = M(), d = e(), f = o ?? u?.presenceUsers ?? [], p = s === void 0 ? d?.idToken ?? null : s, [m, h] = w(""), [g, _] = w(!1), [v, y] = w(0), [x, T] = w([]), O = C(null), k = C(null), A = S(() => {
		let e = new Set(n), t = [];
		for (let n of f) {
			let r = n.metadata.userId ?? n.clientId;
			e.has(r) || (e.add(r), t.push({
				userId: r,
				displayName: J(n.metadata, r)
			}));
		}
		return t;
	}, [f, n]);
	b(() => {
		let e = m.trim();
		if (!e) {
			T([]);
			return;
		}
		if (!c && !p) {
			T([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => T(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? ne}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${p}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				T(Array.isArray(e.profiles) ? e.profiles : []);
			}).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		m,
		p,
		c,
		l
	]);
	let j = S(() => {
		let e = new Set(n), t = [];
		for (let n of A) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of x) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		A,
		x,
		n
	]), N = S(() => {
		let e = m.trim().toLowerCase();
		return e ? j.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : j;
	}, [j, m]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), h(""), y(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), y((e) => Math.min(e + 1, Math.max(N.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), y((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = N[v];
			t ? F(t.userId) : m.trim() && F(m.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !m && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return J(t.metadata, e);
		let n = x.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ D("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ E("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ D("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ D("div", {
			className: "relative",
			children: [/* @__PURE__ */ E("input", {
				ref: O,
				type: "text",
				value: m,
				disabled: P,
				"aria-label": P ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: P ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					h(e.target.value), _(!0), y(0);
				},
				onFocus: () => _(!0),
				onBlur: () => {
					k.current = setTimeout(() => _(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), g && !P && N.length > 0 && /* @__PURE__ */ E("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), k.current && clearTimeout(k.current);
				},
				children: N.map((e, n) => /* @__PURE__ */ D("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => y(n),
					onClick: () => {
						F(e.userId), O.current?.focus();
					},
					children: [/* @__PURE__ */ E("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ E("span", {
						className: "text-text-tertiary ml-2 text-[11px] font-mono",
						children: e.userId.slice(0, 12)
					})]
				}, e.userId))
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var re = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, X = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, ie = {
	surface: "bg-border",
	code: "bg-code-border"
}, ae = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function oe({ children: e, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": u }) {
	let d = C(null), f = v((e) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = e.target;
		if (t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
		let n = d.current;
		if (!n) return;
		let r = Array.from(n.querySelectorAll(ae));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ D("div", {
		ref: d,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": u,
		onKeyDown: f,
		className: t("flex flex-none", s ? "flex-wrap items-start py-1.5" : "items-center", re[i], X[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ E("div", {
			className: t("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: e
		}), n && /* @__PURE__ */ E("div", {
			className: t("flex flex-none items-center gap-2", s ? "flex-wrap" : "pl-2"),
			children: n
		})]
	});
}
function Z({ children: e, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ D(T, { children: [n && /* @__PURE__ */ E(Q, { tone: r }), /* @__PURE__ */ E("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: t("flex flex-none items-center gap-1.5", i),
		children: e
	})] });
}
function Q({ tone: e = "surface", className: n }) {
	return /* @__PURE__ */ E("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: t("h-4 w-px flex-none", ie[e], n)
	});
}
function se({ children: e, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ E("span", {
		className: t("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: e
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function ce({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = x();
	return /* @__PURE__ */ E("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ D("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ D("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ E("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ E("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ E("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ D("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ E("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ E("span", {
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
var $ = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function le({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = $[n];
	return e == null ? /* @__PURE__ */ E("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ D("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ E("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ E("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ E("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function ue({ title: e, hint: n, actions: r, first: i = !1, variant: a = "label", size: o = "md", description: s, children: c, className: l, "data-testid": u }) {
	if (a === "heading") {
		let i = o === "lg", a = s != null && s !== !1;
		return /* @__PURE__ */ D("section", {
			className: t("group/section", l),
			"data-variant": "heading",
			"data-size": o,
			...u ? { "data-testid": u } : {},
			children: [
				/* @__PURE__ */ D("div", {
					className: t("flex items-center gap-2", i ? "h-7" : "h-6", i ? a ? "mb-0" : "mb-2" : "mb-0.5"),
					children: [
						/* @__PURE__ */ E("h3", {
							className: t("m-0 font-semibold text-text-primary", i ? "text-[19px] leading-7" : "text-base leading-6"),
							children: e
						}),
						n != null && /* @__PURE__ */ E("span", {
							className: "min-w-0 truncate text-[13px] text-text-tertiary",
							children: n
						}),
						r != null && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("span", { className: "flex-1" }), /* @__PURE__ */ E("span", {
							className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
							children: r
						})] })
					]
				}),
				a && /* @__PURE__ */ E("p", {
					className: t("m-0 text-text-secondary", i ? "-mt-1 mb-2 text-[15px] leading-6" : "mb-2 text-[13px] leading-5"),
					"data-testid": u ? `${u}-description` : void 0,
					children: s
				}),
				c
			]
		});
	}
	return /* @__PURE__ */ D("section", {
		className: t(l),
		...u ? { "data-testid": u } : {},
		children: [
			!i && /* @__PURE__ */ E(le, { spacing: "md" }),
			/* @__PURE__ */ D("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ E("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ E("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					r != null && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("span", { className: "flex-1" }), r] })
				]
			}),
			c
		]
	});
}
function de(e, t, n) {
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
var fe = null;
function pe() {
	return fe ??= import("./GroupedListSortable-DzTojHzU.js").catch(() => null), fe;
}
var me = t("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function he(e) {
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
function ge(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function _e(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ve(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function ye({ groups: e, rows: n, onOpenRow: r, rowMenu: a, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: l, currentId: d = null, hideEmptyGroups: m = !1, onReorder: h, canReorder: _, reorderLabel: y, size: x = "sm", groupHeading: T = "title", currentStyle: O = "tint", groupCountStyle: k = "chip", groupCountAlign: A = "inline", rowStyle: j = "ruled", className: M, "data-testid": N = "grouped-list" }) {
	let P = x === "md", F = T === "label", I = A === "end" ? "ml-auto pr-1" : void 0, L = s !== void 0, [R, ee] = w(() => {
		let t = he(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), z = v((e) => L ? s.includes(e) : !R.has(e), [
		L,
		s,
		R
	]), B = v((e, t) => {
		L || ee((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), ge(l, r), r;
		}), c?.(e, t);
	}, [
		L,
		c,
		l
	]), V = S(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => t.set(e.id, [])), n.forEach((e) => {
			let n = t.get(e.groupId);
			n && n.push(e);
		}), t;
	}, [e, n]), H = S(() => m ? e.filter((e) => (V.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		V,
		m
	]), U = S(() => {
		let e = [];
		return H.forEach((t) => {
			e.push(`g:${t.id}`), z(t.id) && V.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		H,
		V,
		z
	]), [W, G] = w(null), K = C(null), q = v((e) => !!h && (_ ? _(e) : !e.disabled), [h, _]), [te, ne] = w(""), J = C(null), [Y, re] = w(null), [X, ie] = w(null), ae = C(/* @__PURE__ */ new Map()), oe = !!h;
	b(() => {
		if (!oe || Y) return;
		let e = !0;
		return pe().then((t) => {
			e && t && re(t);
		}), () => {
			e = !1;
		};
	}, [oe, Y]);
	let Z = v((t, n, r) => {
		if (!h) return;
		let i = e.find((e) => e.id === n), a = (V.get(n) ?? []).filter((e) => e.id !== t.id).length;
		h(t.id, n, r), ne(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		h,
		e,
		V
	]), Q = v((t, n) => {
		let r = V.get(t.groupId) ?? [], i = r.findIndex((e) => e.id === t.id), a = null;
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
				index: V.get(i.id)?.length ?? 0
			});
		}
		a && (Z(t, a.toGroupId, a.index), J.current = {
			id: t.id,
			groupId: a.toGroupId,
			index: a.index
		}, z(a.toGroupId) || B(a.toGroupId, !0));
	}, [
		V,
		e,
		Z,
		z,
		B
	]), se = v((e, t) => {
		let r = n.find((t) => t.id === e), i = r && q(r) ? de(n, e, t) : null;
		r && i && Z(r, i.toGroupId, i.index);
	}, [
		n,
		q,
		Z
	]), ce = S(() => {
		if (W && U.includes(W)) return W;
		let e = n.find((e) => e.current || e.id === d), t = e ? `r:${e.id}` : null;
		return t && U.includes(t) ? t : U[0] ?? null;
	}, [
		W,
		U,
		n,
		d
	]), $ = v((e) => {
		let t = K.current?.querySelector(`[data-focus-key="${_e(e)}"]`);
		t && (G(e), t.focus());
	}, []);
	b(() => {
		W && !U.includes(W) && G(null);
	}, [W, U]), b(() => {
		let e = J.current;
		if (!e || (V.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !U.includes(`r:${e.id}`)) return;
		J.current = null;
		let t = K.current?.querySelector(`[data-focus-key="${_e(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && $(`r:${e.id}`);
	});
	let le = v((e) => {
		let t = e.target;
		if (t.closest("[role=\"menu\"]")) return;
		let r = t.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = U.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (J.current = null, e.altKey && h && e.key.startsWith("Arrow")) {
			if (a) return;
			e.preventDefault();
			let t = n.find((e) => e.id === o);
			t && q(t) && Q(t, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let n = t.closest("[data-row-id]");
				n && ve(n) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < U.length - 1 && $(U[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && $(U[i - 1]);
				break;
			case "Home":
				e.preventDefault(), U.length && $(U[0]);
				break;
			case "End":
				e.preventDefault(), U.length && $(U[U.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) z(o) && B(o, !1);
				else {
					let e = n.find((e) => e.id === o);
					e && (B(e.groupId, !1), $(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!z(o)) B(o, !0);
				else {
					let e = V.get(o)?.[0];
					e && $(`r:${e.id}`);
				}
			}
		}
	}, [
		U,
		$,
		z,
		B,
		n,
		V,
		h,
		q,
		Q
	]), ue = /* @__PURE__ */ D("div", {
		ref: K,
		"data-testid": N,
		className: t("flex flex-col", M),
		onKeyDown: le,
		children: [h && /* @__PURE__ */ E("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${N}-reorder-status`,
			children: te
		}), H.map((e) => {
			let n = z(e.id), s = V.get(e.id) ?? [], c = `${N}-group-toggle-${e.id}`, l = `${N}-group-rows-${e.id}`, m = `g:${e.id}`;
			return /* @__PURE__ */ D("section", {
				"aria-labelledby": c,
				"data-testid": `${N}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": n,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ E("h3", {
						className: t("m-0 rounded-md", X === e.id && "bg-primary/8"),
						"data-drop-over": X === e.id || void 0,
						ref: (t) => {
							ae.current.set(e.id, t);
						},
						children: /* @__PURE__ */ D("button", {
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": m,
							"aria-expanded": n,
							"aria-controls": l,
							tabIndex: ce === m ? 0 : -1,
							onFocus: () => G(m),
							onClick: () => B(e.id, !n),
							"data-heading": F ? "label" : void 0,
							className: t("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left", g, F ? t(p, u) : P ? "text-[15px] font-semibold text-text-primary" : "text-[14px] font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ E("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ E(f, { open: n })
								}),
								e.icon && /* @__PURE__ */ E("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${N}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ E("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && !F && k === "plain" && /* @__PURE__ */ E("span", {
									className: t("shrink-0 text-[13px] font-medium text-text-secondary", I),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-style": "plain",
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && F && /* @__PURE__ */ E("span", {
									className: t("shrink-0", "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", I),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && !F && k !== "plain" && /* @__PURE__ */ E(i, {
									size: "xs",
									tone: "neutral",
									className: t("shrink-0", I),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								})
							]
						})
					}),
					/* @__PURE__ */ D("ul", {
						id: l,
						"data-testid": l,
						hidden: !n,
						className: "m-0 flex list-none flex-col p-0",
						children: [n && s.length === 0 && /* @__PURE__ */ E("li", {
							className: "px-4 py-3 pl-12 text-[13px] text-text-tertiary",
							"data-testid": `${N}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), n && s.map((e) => /* @__PURE__ */ E(be, {
							row: e,
							current: e.current || e.id === d,
							currentStyle: O,
							rowStyle: j,
							testId: N,
							size: x,
							tabbable: ce === `r:${e.id}`,
							onFocusRow: () => G(`r:${e.id}`),
							onOpenRow: r,
							menuSections: a?.(e),
							menuLabel: o?.(e) ?? `Actions for ${e.title}`,
							reorder: q(e) ? {
								label: y?.(e) ?? `Reorder ${e.title}`,
								sortable: Y
							} : void 0
						}, e.id))]
					}),
					Y && /* @__PURE__ */ E(Y.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => ae.current.get(e.id) ?? null,
						onOverChange: (t) => ie((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return Y ? /* @__PURE__ */ E(Y.GroupedListDndRoot, {
		ids: U.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: se,
		children: ue
	}) : ue;
}
function be({ row: e, current: n, currentStyle: r, rowStyle: i, testId: o, size: s, tabbable: c, onFocusRow: u, onOpenRow: f, menuSections: p, menuLabel: g, reorder: _ }) {
	let y = !!p && p.some((e) => e.items.length > 0), b = e.hoverSubline !== void 0 && e.hoverSubline !== null, x = e.meta !== void 0 && e.meta !== null, S = e.leading !== void 0 && e.leading !== null, C = `r:${e.id}`, T = s === "md", O = T || i === "plain", [k, A] = w({
		dragging: !1,
		over: !1
	}), j = v((e) => {
		A((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), M = {
		"aria-label": _?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${o}-row-handle-${e.id}`,
		className: t(me, T && "h-8 w-6 text-text-secondary")
	}, N = /* @__PURE__ */ E(a, { size: T ? 20 : 14 });
	return /* @__PURE__ */ D("li", {
		"data-dragging": k.dragging || void 0,
		"data-drop-over": k.over && !k.dragging || void 0,
		"data-testid": `${o}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": n || void 0,
		"aria-current": n ? "true" : void 0,
		onFocus: u,
		...y ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), ve(e.currentTarget));
		} } : {},
		className: t("group relative flex items-center gap-3 px-2", i === "plain" ? "border-t-0" : "border-t border-border", i === "plain" ? m : T ? "py-[7px]" : "py-2.5", "transition-colors duration-100", n ? t(h, "hover:bg-primary/12") : "hover:bg-surface-hover", O && n && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !O && n && r === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", k.dragging && "opacity-50", k.over && !k.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			S && /* @__PURE__ */ E("span", {
				className: t("flex shrink-0 items-center justify-center", T ? "w-6" : "w-5"),
				"data-testid": `${o}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ D("button", {
				type: "button",
				"data-testid": `${o}-row-open-${e.id}`,
				"data-focus-key": C,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: c ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || f?.(e);
				},
				className: t("flex min-w-0 flex-1 items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!S && /* @__PURE__ */ E("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ E("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${o}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ D("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ D("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ E("span", {
									className: t("truncate text-text-primary", O ? d : "text-[14px] font-medium leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ E("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							x && /* @__PURE__ */ E("span", {
								"data-testid": `${o}-row-meta-${e.id}`,
								className: t("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", T ? "text-[13px] leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || b) && /* @__PURE__ */ D("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ E("span", {
									"data-testid": `${o}-row-subline-${e.id}`,
									className: t("block truncate", b && (n ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), b && /* @__PURE__ */ E("span", {
									"aria-hidden": e.subline !== void 0 || void 0,
									"data-testid": `${o}-row-hover-subline-${e.id}`,
									className: t("truncate", n || e.subline === void 0 ? "block" : "hidden group-hover:block group-focus-within:block"),
									children: e.hoverSubline
								})]
							})
						]
					})
				]
			}),
			e.hoverActions && /* @__PURE__ */ E("span", {
				"data-testid": `${o}-row-actions-${e.id}`,
				className: t("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ E("span", {
				className: "flex shrink-0 items-center gap-1.5 text-[13px]",
				"data-testid": `${o}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			y && /* @__PURE__ */ E("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${o}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ E(l, {
					trigger: /* @__PURE__ */ E("span", {
						"aria-hidden": "true",
						className: "text-base leading-none",
						children: "⋯"
					}),
					triggerLabel: g,
					triggerTabIndex: -1,
					triggerTestId: `${o}-row-menu-trigger-${e.id}`,
					align: "end",
					sections: p,
					triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
				})
			}),
			_ && (_.sortable ? /* @__PURE__ */ E(_.sortable.SortableHandle, {
				id: e.id,
				onStateChange: j,
				...M,
				children: N
			}) : /* @__PURE__ */ E("button", {
				type: "button",
				tabIndex: -1,
				...M,
				children: N
			}))
		]
	});
}
//#endregion
//#region src/components/shared/FilterPopover.tsx
var xe = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function Se() {
	return /* @__PURE__ */ E("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ E("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function Ce({ children: e, label: r = "Filter", activeCount: a = 0, onClear: o, clearLabel: s = "Clear filters", open: l, onOpenChange: u, placement: d = "bottom-start", size: f = "md", trigger: p = "label", panelLabel: m = "Filters", className: h, panelClassName: g, icon: _, "data-testid": v = "filter-popover" }) {
	let [y, b] = w(!1), S = l ?? y, T = (e) => {
		l === void 0 && b(e), u?.(e);
	}, O = C(null), k = x(), A = a > 0;
	return /* @__PURE__ */ D("span", {
		className: t("inline-flex shrink-0", h),
		"data-testid": `${v}-root`,
		children: [/* @__PURE__ */ D(n, {
			ref: O,
			type: "button",
			variant: "secondary",
			size: f,
			"aria-haspopup": "dialog",
			"aria-expanded": S,
			"aria-controls": S ? k : void 0,
			"data-testid": `${v}-trigger`,
			"data-active": A || void 0,
			onClick: () => T(!S),
			...p === "icon" ? {
				"aria-label": A ? `${r} (${a} active)` : r,
				title: r
			} : {},
			className: t("inline-flex items-center gap-2 whitespace-nowrap", p === "icon" && (f === "lg" ? "relative h-11 w-11 justify-center rounded-lg px-0 py-0 text-text-secondary [&_svg]:h-5 [&_svg]:w-5" : "relative h-9 w-9 justify-center px-0 py-0 text-text-secondary [&_svg]:h-[18px] [&_svg]:w-[18px]"), A && "border-primary-border text-primary-fg"),
			children: [
				_ ?? /* @__PURE__ */ E(Se, {}),
				p === "label" && /* @__PURE__ */ E("span", { children: r }),
				p === "icon" && A && /* @__PURE__ */ E("span", {
					"aria-hidden": "true",
					"data-testid": `${v}-dot`,
					className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"
				}),
				p === "label" && A && /* @__PURE__ */ E(i, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${v}-count`,
					"aria-label": `${a} active filters`,
					children: a
				})
			]
		}), /* @__PURE__ */ E(c, {
			open: S,
			onClose: () => T(!1),
			trigger: O,
			placement: xe[d],
			"aria-label": m,
			"data-testid": v,
			className: t("min-w-[280px] max-w-[420px] p-3", g),
			children: /* @__PURE__ */ D("div", {
				id: k,
				className: "flex flex-col gap-3",
				children: [e, o && /* @__PURE__ */ E("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ E(n, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: !A,
						"data-testid": `${v}-clear`,
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
export { A as _, ce as a, se as c, te as d, G as f, z as g, H as h, le as i, Q as l, B as m, ye as n, oe as o, W as p, ue as r, Z as s, Ce as t, Y as u, M as v, j as y };
