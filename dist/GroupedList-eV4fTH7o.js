import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-D4QmbyEy.js";
import { l as n } from "./Button-C-I3BxWI.js";
import { n as r, t as i } from "./overlayStack-DxIDMUs-.js";
import { M as a } from "./Icons-CqVFbuiZ.js";
import { i as o, r as s } from "./focusTrap-D9J7npjl.js";
import { t as c } from "./DropdownMenu-DP3rRjEd.js";
import { a as l, c as u, d, i as f, l as p, n as m, o as h } from "./railType-AsIPWdQ5.js";
import { createContext as g, useCallback as _, useContext as v, useEffect as y, useId as b, useMemo as x, useRef as S, useState as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
import { createPortal as D } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var O = g(null);
function k({ value: e, children: t }) {
	return /* @__PURE__ */ T(O.Provider, {
		value: e,
		children: t
	});
}
function A() {
	let e = v(O);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function j() {
	return v(O);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var M = "'SF Mono', Menlo, monospace", N = 12, P = 1.5, F = N * P, I = 8, L = 10, R = 36;
function z({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = S(null), [d, f] = C(!1), p = x(() => Math.max(1, e.split("\n").length), [e]), m = x(() => {
		let e = Math.max(p, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [p, a]), h = Math.min(Math.max(p, a), o) * F + 16, g = p > o, _ = (t) => {
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
	return y(() => {
		let e = u.current;
		if (!e || !g) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [g]), /* @__PURE__ */ E("div", { children: [c && c.length > 0 && /* @__PURE__ */ T("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ T("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => _(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: M },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ E("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: M,
			fontSize: N,
			lineHeight: P,
			height: h
		},
		children: [/* @__PURE__ */ T("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: R,
				padding: `${I}px 6px`,
				fontFamily: M,
				lineHeight: P
			},
			children: m
		}), /* @__PURE__ */ T("textarea", {
			"data-ui-part": "",
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
				padding: `${I}px ${L}px`,
				fontFamily: M,
				fontSize: N,
				lineHeight: P,
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
	return /* @__PURE__ */ T("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function H({ value: e, onChange: t, curated: n }) {
	let [r, i] = C(!1), [a, s] = C(!1), [c, l] = C(""), u = S(null), d = S(null), f = n ?? B;
	y(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			u.current && u.current.contains(t) || d.current && d.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), o(r, _(() => i(!1), []));
	let p = (e) => {
		t(e), i(!1);
	}, m = () => {
		let e = c.trim();
		e.length !== 0 && (t(e), l(""), i(!1));
	};
	return /* @__PURE__ */ E("div", {
		className: "relative inline-block",
		ref: u,
		children: [/* @__PURE__ */ T("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ E("div", {
			ref: d,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ T("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: f.map((t, n) => /* @__PURE__ */ T(V, {
					emoji: t,
					active: t === e,
					onPick: p
				}, `${t}-${n}`))
			}), /* @__PURE__ */ E("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ T("input", {
					"data-ui-part": "",
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
				}), /* @__PURE__ */ T("button", {
					"data-ui-part": "",
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
function W({ images: e, openIndex: n, onClose: r, onNavigate: a }) {
	let o = S(null), c = S(null), [l, u] = C(n);
	y(() => {
		u(n);
	}, [n]);
	let d = n !== null && e.length > 0, f = i(d), p = a ? n : l ?? n, m = p === null ? 0 : Math.min(Math.max(p, 0), e.length - 1), h = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (m + t + n) % n;
		a ? a(r) : u(r);
	};
	if (y(() => {
		if (d) return c.current = typeof document < "u" ? document.activeElement : null, o.current?.focus(), () => {
			let e = c.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), c.current = null;
		};
	}, [d]), y(() => {
		if (!d) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? s(e, o.current) : e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), h(-1)) : e.key === "ArrowRight" && (e.preventDefault(), h(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		m,
		e.length,
		r,
		a,
		f
	]), !d) return null;
	let g = e[m], _ = e.length > 1;
	return D(/* @__PURE__ */ E("div", {
		ref: o,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": g.caption ?? g.alt ?? `Image ${m + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ E("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					m + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ T("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ E("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ T("img", {
					"data-testid": "image-lightbox-img",
					src: g.src,
					alt: g.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), g.caption && /* @__PURE__ */ T("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: g.caption
				})]
			}),
			_ && /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(U, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), h(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ T("button", {
				"data-ui-part": "",
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
	if (f.length === 0) return /* @__PURE__ */ T("div", {
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
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), C = `${S} L${x[x.length - 1].x.toFixed(2)},${(a - y).toFixed(2)} L${x[0].x.toFixed(2)},${(a - y).toFixed(2)} Z`, w = x[x.length - 1], D = `Trend, ${f.length} points, starts ${K(f[0])}, ends ${K(f[f.length - 1])}`;
	return /* @__PURE__ */ T("div", {
		role: "img",
		"aria-label": u ?? D,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ E("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ T("path", {
					d: C,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ T("path", {
					d: S,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ T("circle", {
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
function ee({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = C(""), [c, l] = C(!1), u = S(null), d = (e) => {
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
	}, m = x(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), h = c && m.length > 0;
	return /* @__PURE__ */ E("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ E("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ T("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ E("div", {
			className: "relative",
			children: [/* @__PURE__ */ T("input", {
				"data-ui-part": "",
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
			}), h ? /* @__PURE__ */ T("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ E("button", {
					"data-ui-part": "",
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
function J(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function Y({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = j(), d = e(), f = o ?? u?.presenceUsers ?? [], p = s === void 0 ? d?.idToken ?? null : s, [m, h] = C(""), [g, _] = C(!1), [v, b] = C(0), [w, D] = C([]), O = S(null), k = S(null), A = x(() => {
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
	y(() => {
		let e = m.trim();
		if (!e) {
			D([]);
			return;
		}
		if (!c && !p) {
			D([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => D(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? te}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${p}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				D(Array.isArray(e.profiles) ? e.profiles : []);
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
	let M = x(() => {
		let e = new Set(n), t = [];
		for (let n of A) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of w) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		A,
		w,
		n
	]), N = x(() => {
		let e = m.trim().toLowerCase();
		return e ? M.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : M;
	}, [M, m]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), h(""), b(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), b((e) => Math.min(e + 1, Math.max(N.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), b((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = N[v];
			t ? F(t.userId) : m.trim() && F(m.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !m && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return J(t.metadata, e);
		let n = w.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ E("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ T("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ E("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ T("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ E("div", {
			className: "relative",
			children: [/* @__PURE__ */ T("input", {
				"data-ui-part": "",
				ref: O,
				type: "text",
				value: m,
				disabled: P,
				"aria-label": P ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: P ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					h(e.target.value), _(!0), b(0);
				},
				onFocus: () => _(!0),
				onBlur: () => {
					k.current = setTimeout(() => _(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), g && !P && N.length > 0 && /* @__PURE__ */ T("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), k.current && clearTimeout(k.current);
				},
				children: N.map((e, n) => /* @__PURE__ */ E("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => b(n),
					onClick: () => {
						F(e.userId), O.current?.focus();
					},
					children: [/* @__PURE__ */ T("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ T("span", {
						className: "text-text-tertiary ml-2 text-[11px] font-mono",
						children: e.userId.slice(0, 12)
					})]
				}, e.userId))
			})]
		})]
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function ne({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = b();
	return /* @__PURE__ */ T("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ E("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ E("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ T("input", {
							"data-ui-part": "",
							id: s,
							type: "radio",
							"data-ui-control": "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ T("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ T("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ E("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ T("span", {
						className: t("text-sm leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ T("span", {
						className: t("text-xs leading-4 mt-0.5", a ? "text-text-disabled" : "text-neutral"),
						children: i.description
					})]
				})]
			}, i.value);
		})
	});
}
//#endregion
//#region src/components/shared/Divider.tsx
var re = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function X({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = re[n];
	return e == null ? /* @__PURE__ */ T("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ E("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ T("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ T("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ T("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function ie({ title: e, as: r = "h3", hint: i, actions: a, first: o = !1, variant: s = "label", size: c, description: l, children: u, className: d, "data-testid": f }) {
	let p = n("DetailSection", c, {
		comfortable: "md",
		compact: "sm"
	});
	if (s === "heading") {
		let n = p === "lg", s = p === "sm", c = l != null && l !== !1;
		return /* @__PURE__ */ E("section", {
			"data-ui-part": "",
			className: t("group/section", d),
			"data-variant": "heading",
			"data-size": p,
			...f ? { "data-testid": f } : {},
			children: [
				!o && /* @__PURE__ */ T(X, { spacing: "md" }),
				/* @__PURE__ */ E("div", {
					className: t("flex items-center gap-2", n ? "h-7" : "h-6", n ? c ? "mb-0" : "mb-2" : "mb-0.5"),
					children: [
						/* @__PURE__ */ T(r, {
							className: t("m-0 font-semibold text-text-primary", n ? "text-[19px] leading-7" : s ? "text-sm leading-5" : "text-base leading-6"),
							children: e
						}),
						i != null && /* @__PURE__ */ T("span", {
							className: t("min-w-0 truncate text-text-tertiary", s ? "text-xs" : "text-[13px]"),
							children: i
						}),
						a != null && /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("span", { className: "flex-1" }), /* @__PURE__ */ T("span", {
							className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
							children: a
						})] })
					]
				}),
				c && /* @__PURE__ */ T("p", {
					className: t("m-0 text-text-secondary", n ? "-mt-1 mb-2 text-[15px] leading-6" : s ? "mb-2 text-xs leading-4" : "mb-2 text-[13px] leading-5"),
					"data-testid": f ? `${f}-description` : void 0,
					children: l
				}),
				u
			]
		});
	}
	return /* @__PURE__ */ E("section", {
		"data-ui-part": "",
		className: t(d),
		...f ? { "data-testid": f } : {},
		children: [
			!o && /* @__PURE__ */ T(X, { spacing: "md" }),
			/* @__PURE__ */ E("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ T(r, {
						className: "m-0 text-xs font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					i != null && /* @__PURE__ */ T("span", {
						className: "min-w-0 truncate text-xs text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("span", { className: "flex-1" }), a] })
				]
			}),
			u
		]
	});
}
function ae(e, t, n) {
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
var Z = null;
function oe() {
	return Z ??= import("./GroupedListSortable-8yOADSur.js").catch(() => null), Z;
}
var Q = t("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function se(e) {
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
function ce(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function le(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ue(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function de({ groups: e, rows: n, onOpenRow: i, rowMenu: a, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: u, currentId: p = null, hideEmptyGroups: m = !1, onReorder: g, canReorder: v, reorderLabel: b, size: w = "sm", groupHeading: D = "title", currentStyle: O = "tint", groupCountStyle: k = "chip", groupCountAlign: A = "inline", rowStyle: j = "ruled", className: M, "data-testid": N = "grouped-list" }) {
	let P = D === "label", F = A === "end" ? "ml-auto pr-1" : void 0, I = s !== void 0, [L, R] = C(() => {
		let t = se(u);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), z = _((e) => I ? s.includes(e) : !L.has(e), [
		I,
		s,
		L
	]), B = _((e, t) => {
		I || R((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), ce(u, r), r;
		}), c?.(e, t);
	}, [
		I,
		c,
		u
	]), V = x(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => t.set(e.id, [])), n.forEach((e) => {
			let n = t.get(e.groupId);
			n && n.push(e);
		}), t;
	}, [e, n]), H = x(() => m ? e.filter((e) => (V.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		V,
		m
	]), U = x(() => {
		let e = [];
		return H.forEach((t) => {
			e.push(`g:${t.id}`), z(t.id) && V.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		H,
		V,
		z
	]), [W, G] = C(null), K = S(null), q = _((e) => !!g && (v ? v(e) : !e.disabled), [g, v]), [ee, te] = C(""), J = S(null), [Y, ne] = C(null), [re, X] = C(null), ie = S(/* @__PURE__ */ new Map()), Z = !!g;
	y(() => {
		if (!Z || Y) return;
		let e = !0;
		return oe().then((t) => {
			e && t && ne(t);
		}), () => {
			e = !1;
		};
	}, [Z, Y]);
	let Q = _((t, n, r) => {
		if (!g) return;
		let i = e.find((e) => e.id === n), a = (V.get(n) ?? []).filter((e) => e.id !== t.id).length;
		g(t.id, n, r), te(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		g,
		e,
		V
	]), de = _((t, n) => {
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
		a && (Q(t, a.toGroupId, a.index), J.current = {
			id: t.id,
			groupId: a.toGroupId,
			index: a.index
		}, z(a.toGroupId) || B(a.toGroupId, !0));
	}, [
		V,
		e,
		Q,
		z,
		B
	]), pe = _((e, t) => {
		let r = n.find((t) => t.id === e), i = r && q(r) ? ae(n, e, t) : null;
		r && i && Q(r, i.toGroupId, i.index);
	}, [
		n,
		q,
		Q
	]), me = x(() => {
		if (W && U.includes(W)) return W;
		let e = n.find((e) => e.current || e.id === p), t = e ? `r:${e.id}` : null;
		return t && U.includes(t) ? t : U[0] ?? null;
	}, [
		W,
		U,
		n,
		p
	]), $ = _((e) => {
		let t = K.current?.querySelector(`[data-focus-key="${le(e)}"]`);
		t && (G(e), t.focus());
	}, []);
	y(() => {
		W && !U.includes(W) && G(null);
	}, [W, U]), y(() => {
		let e = J.current;
		if (!e || (V.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !U.includes(`r:${e.id}`)) return;
		J.current = null;
		let t = K.current?.querySelector(`[data-focus-key="${le(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && $(`r:${e.id}`);
	});
	let he = _((e) => {
		let t = e.target;
		if (t.closest("[role=\"menu\"]")) return;
		let r = t.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = U.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (J.current = null, e.altKey && g && e.key.startsWith("Arrow")) {
			if (a) return;
			e.preventDefault();
			let t = n.find((e) => e.id === o);
			t && q(t) && de(t, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let n = t.closest("[data-row-id]");
				n && ue(n) && e.preventDefault();
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
		g,
		q,
		de
	]), ge = /* @__PURE__ */ E("div", {
		ref: K,
		"data-testid": N,
		className: t("flex flex-col", M),
		onKeyDown: he,
		children: [g && /* @__PURE__ */ T("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${N}-reorder-status`,
			children: ee
		}), H.map((e) => {
			let n = z(e.id), s = V.get(e.id) ?? [], c = `${N}-group-toggle-${e.id}`, u = `${N}-group-rows-${e.id}`, m = `g:${e.id}`;
			return /* @__PURE__ */ E("section", {
				"data-ui-part": "",
				"aria-labelledby": c,
				"data-testid": `${N}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": n,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ T("h3", {
						className: t("m-0 rounded-md", P ? f : "text-sm font-semibold", re === e.id && "bg-primary/8"),
						"data-drop-over": re === e.id || void 0,
						ref: (t) => {
							ie.current.set(e.id, t);
						},
						children: /* @__PURE__ */ E("button", {
							"data-ui-part": "",
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": m,
							"aria-expanded": n,
							"aria-controls": u,
							tabIndex: me === m ? 0 : -1,
							onFocus: () => G(m),
							onClick: () => B(e.id, !n),
							"data-heading": P ? "label" : void 0,
							className: t("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left", h, P ? t(f, l) : "text-sm font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ T("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ T(d, { open: n })
								}),
								e.icon && /* @__PURE__ */ T("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${N}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ T("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && !P && k === "plain" && /* @__PURE__ */ T("span", {
									className: t("shrink-0 text-xs font-medium tabular-nums text-text-secondary", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-style": "plain",
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && P && /* @__PURE__ */ T("span", {
									className: t("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && !P && k !== "plain" && /* @__PURE__ */ T(r, {
									size: "md",
									tone: "neutral",
									className: t("shrink-0", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								})
							]
						})
					}),
					/* @__PURE__ */ E("ul", {
						id: u,
						"data-testid": u,
						hidden: !n,
						className: "m-0 flex list-none flex-col p-0",
						children: [n && s.length === 0 && /* @__PURE__ */ T("li", {
							className: "px-4 py-3 pl-12 text-xs text-text-tertiary",
							"data-testid": `${N}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), n && s.map((e) => /* @__PURE__ */ T(fe, {
							row: e,
							current: e.current || e.id === p,
							currentStyle: O,
							rowStyle: j,
							testId: N,
							size: w,
							tabbable: me === `r:${e.id}`,
							onFocusRow: () => G(`r:${e.id}`),
							onOpenRow: i,
							menuSections: a?.(e),
							menuLabel: o?.(e) ?? `Actions for ${e.title}`,
							reorder: q(e) ? {
								label: b?.(e) ?? `Reorder ${e.title}`,
								sortable: Y
							} : void 0
						}, e.id))]
					}),
					Y && /* @__PURE__ */ T(Y.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => ie.current.get(e.id) ?? null,
						onOverChange: (t) => X((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return Y ? /* @__PURE__ */ T(Y.GroupedListDndRoot, {
		ids: U.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: pe,
		children: ge
	}) : ge;
}
function fe({ row: e, current: n, currentStyle: r, rowStyle: i, testId: o, size: s, tabbable: l, onFocusRow: d, onOpenRow: f, menuSections: h, menuLabel: g, reorder: v }) {
	let y = !!h && h.some((e) => e.items.length > 0), b = e.hoverSubline !== void 0 && e.hoverSubline !== null, x = e.meta !== void 0 && e.meta !== null, S = e.leading !== void 0 && e.leading !== null, w = `r:${e.id}`, D = s === "md", O = D || i === "plain", [k, A] = C({
		dragging: !1,
		over: !1
	}), j = _((e) => {
		A((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), M = {
		"aria-label": v?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${o}-row-handle-${e.id}`,
		className: t(Q, D && "h-8 w-6 text-text-secondary")
	}, N = /* @__PURE__ */ T(a, { size: D ? 20 : 14 });
	return /* @__PURE__ */ E("li", {
		"data-dragging": k.dragging || void 0,
		"data-drop-over": k.over && !k.dragging || void 0,
		"data-testid": `${o}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": n || void 0,
		"aria-current": n ? "true" : void 0,
		onFocus: d,
		...y ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), ue(e.currentTarget));
		} } : {},
		className: t("group relative flex items-center px-2", e.leadingSize === "indicator" ? "gap-2" : "gap-3", i === "plain" ? "border-t-0" : "border-t border-border", i === "plain" ? p : D ? "py-[7px]" : "py-2.5", "transition-colors duration-100", n ? t(m, "hover:bg-primary/12") : "hover:bg-surface-hover", O && n && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !O && n && r === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", k.dragging && "opacity-50", k.over && !k.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			S && /* @__PURE__ */ T("span", {
				className: t("flex shrink-0 items-center justify-center", e.leadingSize === "indicator" ? "w-2" : D ? "w-6" : "w-5"),
				"data-ui-rail-leading": e.leadingSize,
				"data-testid": `${o}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ E("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${o}-row-open-${e.id}`,
				"data-focus-key": w,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: l ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || f?.(e);
				},
				className: t("flex min-w-0 flex-1 items-center rounded-md border-0 bg-transparent p-0 text-left", !S && e.leadingSize !== "none" ? "gap-2.5" : "gap-3", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!S && e.leadingSize !== "none" && /* @__PURE__ */ T("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ T("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${o}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ E("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ T("span", {
									"data-ui-text": O ? "rail-item" : void 0,
									className: t("truncate text-text-primary", O ? u : "text-[14px] font-medium leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ T("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							x && /* @__PURE__ */ T("span", {
								"data-testid": `${o}-row-meta-${e.id}`,
								className: t("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", D ? "text-xs leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || b) && /* @__PURE__ */ E("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ T("span", {
									"data-testid": `${o}-row-subline-${e.id}`,
									className: t("block truncate", b && (n ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), b && /* @__PURE__ */ T("span", {
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
			e.hoverActions && /* @__PURE__ */ T("span", {
				"data-testid": `${o}-row-actions-${e.id}`,
				className: t("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ T("span", {
				className: "flex shrink-0 items-center gap-1.5 text-xs",
				"data-testid": `${o}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			y && /* @__PURE__ */ T("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${o}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ T(c, {
					trigger: /* @__PURE__ */ T("span", {
						"aria-hidden": "true",
						className: "text-base leading-none",
						children: "⋯"
					}),
					triggerLabel: g,
					triggerTabIndex: -1,
					triggerTestId: `${o}-row-menu-trigger-${e.id}`,
					align: "end",
					sections: h,
					triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
				})
			}),
			v && (v.sortable ? /* @__PURE__ */ T(v.sortable.SortableHandle, {
				id: e.id,
				onStateChange: j,
				...M,
				children: N
			}) : /* @__PURE__ */ T("button", {
				"data-ui-part": "",
				type: "button",
				tabIndex: -1,
				...M,
				children: N
			}))
		]
	});
}
//#endregion
export { Y as a, W as c, z as d, k as f, ne as i, B as l, A as m, ie as n, ee as o, j as p, X as r, G as s, de as t, H as u };
