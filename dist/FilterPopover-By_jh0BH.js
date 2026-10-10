import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-D4QmbyEy.js";
import { n } from "./Button-BEOshFFZ.js";
import { a as r } from "./Density-BgubVeSf.js";
import { t as i } from "./overlayStack-D0Hf2ZrU.js";
import { t as a } from "./Chip-D2jKHd4a.js";
import { M as o } from "./Icons-B_xESAH3.js";
import { i as s, r as c } from "./focusTrap-Cj-AL49l.js";
import { n as l, t as u } from "./DropdownMenu-DR9iVi2Z.js";
import { a as d, c as f, d as p, i as m, l as h, n as g, o as _ } from "./railType-DaEA_kg6.js";
import { createContext as v, useCallback as y, useContext as b, useEffect as x, useId as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
import { createPortal as k } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var A = v(null);
function j({ value: e, children: t }) {
	return /* @__PURE__ */ D(A.Provider, {
		value: e,
		children: t
	});
}
function M() {
	let e = b(A);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function N() {
	return b(A);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var P = "'SF Mono', Menlo, monospace", F = 12, I = 1.5, L = F * I, R = 8, ee = 10, z = 36;
function B({ value: e, onChange: n, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = w(null), [d, f] = T(!1), p = C(() => Math.max(1, e.split("\n").length), [e]), m = C(() => {
		let e = Math.max(p, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [p, a]), h = Math.min(Math.max(p, a), o) * L + 16, g = p > o, _ = (t) => {
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
	return x(() => {
		let e = u.current;
		if (!e || !g) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [g]), /* @__PURE__ */ O("div", { children: [c && c.length > 0 && /* @__PURE__ */ D("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ D("button", {
			type: "button",
			onClick: () => _(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: P },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ O("div", {
		className: t("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: P,
			fontSize: F,
			lineHeight: I,
			height: h
		},
		children: [/* @__PURE__ */ D("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: z,
				padding: `${R}px 6px`,
				fontFamily: P,
				lineHeight: I
			},
			children: m
		}), /* @__PURE__ */ D("textarea", {
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
				padding: `${R}px ${ee}px`,
				fontFamily: P,
				fontSize: F,
				lineHeight: I,
				tabSize: 2,
				height: h,
				overflow: g ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var V = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function H({ emoji: e, active: n, onPick: r }) {
	return /* @__PURE__ */ D("button", {
		type: "button",
		onClick: () => r(e),
		className: t("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", n ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": n,
		children: e
	});
}
function U({ value: e, onChange: t, curated: n }) {
	let [r, i] = T(!1), [a, o] = T(!1), [c, l] = T(""), u = w(null), d = w(null), f = n ?? V;
	x(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			u.current && u.current.contains(t) || d.current && d.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), s(r, y(() => i(!1), []));
	let p = (e) => {
		t(e), i(!1);
	}, m = () => {
		let e = c.trim();
		e.length !== 0 && (t(e), l(""), i(!1));
	};
	return /* @__PURE__ */ O("div", {
		className: "relative inline-block",
		ref: u,
		children: [/* @__PURE__ */ D("button", {
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ O("div", {
			ref: d,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ D("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: f.map((t, n) => /* @__PURE__ */ D(H, {
					emoji: t,
					active: t === e,
					onPick: p
				}, `${t}-${n}`))
			}), /* @__PURE__ */ O("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ D("input", {
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
				}), /* @__PURE__ */ D("button", {
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
var W = t("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function G({ images: e, openIndex: n, onClose: r, onNavigate: a }) {
	let o = w(null), s = w(null), [l, u] = T(n);
	x(() => {
		u(n);
	}, [n]);
	let d = n !== null && e.length > 0, f = i(d), p = a ? n : l ?? n, m = p === null ? 0 : Math.min(Math.max(p, 0), e.length - 1), h = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (m + t + n) % n;
		a ? a(r) : u(r);
	};
	if (x(() => {
		if (d) return s.current = typeof document < "u" ? document.activeElement : null, o.current?.focus(), () => {
			let e = s.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), s.current = null;
		};
	}, [d]), x(() => {
		if (!d) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? c(e, o.current) : e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), h(-1)) : e.key === "ArrowRight" && (e.preventDefault(), h(1)));
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
	return k(/* @__PURE__ */ O("div", {
		ref: o,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": g.caption ?? g.alt ?? `Image ${m + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ O("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					m + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ D("button", {
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: t("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ O("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ D("img", {
					"data-testid": "image-lightbox-img",
					src: g.src,
					alt: g.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), g.caption && /* @__PURE__ */ D("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: g.caption
				})]
			}),
			_ && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("button", {
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: t(W, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), h(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ D("button", {
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: t(W, "right-3"),
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
function K({ points: e, yMin: n, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ D("div", {
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
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), C = `${S} L${x[x.length - 1].x.toFixed(2)},${(a - y).toFixed(2)} L${x[0].x.toFixed(2)},${(a - y).toFixed(2)} Z`, w = x[x.length - 1], T = `Trend, ${f.length} points, starts ${q(f[0])}, ends ${q(f[f.length - 1])}`;
	return /* @__PURE__ */ D("div", {
		role: "img",
		"aria-label": u ?? T,
		className: t("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ O("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ D("path", {
					d: C,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ D("path", {
					d: S,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ D("circle", {
					cx: w.x,
					cy: w.y,
					r: s * 1.5,
					fill: o
				}) : null
			]
		})
	});
}
function q(e) {
	return Math.abs(e) >= 100 ? e.toFixed(0) : Math.abs(e) >= 1 ? e.toFixed(2) : e.toFixed(3);
}
//#endregion
//#region src/components/shared/TagEditor.tsx
function te(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function ne({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = T(""), [c, l] = T(!1), u = w(null), d = (e) => {
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
	}, m = C(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), h = c && m.length > 0;
	return /* @__PURE__ */ O("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ O("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ D("button", {
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ O("div", {
			className: "relative",
			children: [/* @__PURE__ */ D("input", {
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
			}), h ? /* @__PURE__ */ D("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ O("button", {
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
var J = "";
function Y(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function re({ value: n, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = N(), d = e(), f = o ?? u?.presenceUsers ?? [], p = s === void 0 ? d?.idToken ?? null : s, [m, h] = T(""), [g, _] = T(!1), [v, y] = T(0), [b, S] = T([]), E = w(null), k = w(null), A = C(() => {
		let e = new Set(n), t = [];
		for (let n of f) {
			let r = n.metadata.userId ?? n.clientId;
			e.has(r) || (e.add(r), t.push({
				userId: r,
				displayName: Y(n.metadata, r)
			}));
		}
		return t;
	}, [f, n]);
	x(() => {
		let e = m.trim();
		if (!e) {
			S([]);
			return;
		}
		if (!c && !p) {
			S([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => S(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? J}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
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
	}, [
		m,
		p,
		c,
		l
	]);
	let j = C(() => {
		let e = new Set(n), t = [];
		for (let n of A) e.has(n.userId) || (e.add(n.userId), t.push(n));
		for (let n of b) e.has(n.userId) || (e.add(n.userId), t.push({
			userId: n.userId,
			displayName: n.displayName || n.userId.slice(0, 8)
		}));
		return t;
	}, [
		A,
		b,
		n
	]), M = C(() => {
		let e = m.trim().toLowerCase();
		return e ? j.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : j;
	}, [j, m]), P = typeof a == "number" && n.length >= a, F = (e) => {
		let t = e.trim();
		t && (n.includes(t) || P || (r([...n, t]), h(""), y(0)));
	}, I = (e) => {
		r(n.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), y((e) => Math.min(e + 1, Math.max(M.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), y((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = M[v];
			t ? F(t.userId) : m.trim() && F(m.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !m && n.length > 0 && I(n[n.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return Y(t.metadata, e);
		let n = b.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ O("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [n.length > 0 && /* @__PURE__ */ D("div", {
			className: "flex flex-wrap gap-1.5",
			children: n.map((e) => /* @__PURE__ */ O("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ D("button", {
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ O("div", {
			className: "relative",
			children: [/* @__PURE__ */ D("input", {
				ref: E,
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
			}), g && !P && M.length > 0 && /* @__PURE__ */ D("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), k.current && clearTimeout(k.current);
				},
				children: M.map((e, n) => /* @__PURE__ */ O("div", {
					className: t("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", n === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => y(n),
					onClick: () => {
						F(e.userId), E.current?.focus();
					},
					children: [/* @__PURE__ */ D("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ D("span", {
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
var ie = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, ae = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, oe = {
	surface: "bg-border",
	code: "bg-code-border"
}, X = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function Z({ children: e, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": u }) {
	let d = w(null), f = y((e) => {
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
		let r = Array.from(n.querySelectorAll(X));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ O("div", {
		ref: d,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": u,
		onKeyDown: f,
		className: t("flex flex-none", s ? "flex-wrap items-start py-1.5" : "items-center", ie[i], ae[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ D("div", {
			className: t("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: e
		}), n && /* @__PURE__ */ D("div", {
			className: t("flex flex-none items-center gap-2", s ? "flex-wrap" : "pl-2"),
			children: n
		})]
	});
}
function se({ children: e, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ O(E, { children: [n && /* @__PURE__ */ D(ce, { tone: r }), /* @__PURE__ */ D("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: t("flex flex-none items-center gap-1.5", i),
		children: e
	})] });
}
function ce({ tone: e = "surface", className: n }) {
	return /* @__PURE__ */ D("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: t("h-4 w-px flex-none", oe[e], n)
	});
}
function le({ children: e, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ D("span", {
		className: t("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: e
	});
}
//#endregion
//#region src/components/forms/RadioGroup.tsx
function Q({ name: e, value: n, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = S();
	return /* @__PURE__ */ D("div", {
		role: "radiogroup",
		"data-testid": s,
		className: t("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === n;
			return /* @__PURE__ */ O("label", {
				htmlFor: s,
				className: t("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ O("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ D("input", {
							id: s,
							type: "radio",
							name: e,
							value: i.value,
							checked: l,
							disabled: a,
							onChange: () => r(i.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ D("span", {
							"aria-hidden": "true",
							className: t("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ D("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ O("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ D("span", {
						className: t("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ D("span", {
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
var ue = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function $({ label: e, spacing: n = "md", className: r, "data-testid": i }) {
	let a = ue[n];
	return e == null ? /* @__PURE__ */ D("hr", {
		className: t("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ O("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: t("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ D("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ D("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ D("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function de({ title: e, hint: n, actions: i, first: a = !1, variant: o = "label", size: s, description: c, children: l, className: u, "data-testid": d }) {
	let f = r("DetailSection", s, {
		comfortable: "md",
		compact: "sm"
	});
	if (o === "heading") {
		let r = f === "lg", a = f === "sm", o = c != null && c !== !1;
		return /* @__PURE__ */ O("section", {
			className: t("group/section", u),
			"data-variant": "heading",
			"data-size": f,
			...d ? { "data-testid": d } : {},
			children: [
				/* @__PURE__ */ O("div", {
					className: t("flex items-center gap-2", r ? "h-7" : "h-6", r ? o ? "mb-0" : "mb-2" : "mb-0.5"),
					children: [
						/* @__PURE__ */ D("h3", {
							className: t("m-0 font-semibold text-text-primary", r ? "text-[19px] leading-7" : a ? "text-sm leading-5" : "text-base leading-6"),
							children: e
						}),
						n != null && /* @__PURE__ */ D("span", {
							className: t("min-w-0 truncate text-text-tertiary", a ? "text-xs" : "text-[13px]"),
							children: n
						}),
						i != null && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("span", { className: "flex-1" }), /* @__PURE__ */ D("span", {
							className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
							children: i
						})] })
					]
				}),
				o && /* @__PURE__ */ D("p", {
					className: t("m-0 text-text-secondary", r ? "-mt-1 mb-2 text-[15px] leading-6" : a ? "mb-2 text-xs leading-4" : "mb-2 text-[13px] leading-5"),
					"data-testid": d ? `${d}-description` : void 0,
					children: c
				}),
				l
			]
		});
	}
	return /* @__PURE__ */ O("section", {
		className: t(u),
		...d ? { "data-testid": d } : {},
		children: [
			!a && /* @__PURE__ */ D($, { spacing: "md" }),
			/* @__PURE__ */ O("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ D("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					n != null && /* @__PURE__ */ D("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: n
					}),
					i != null && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("span", { className: "flex-1" }), i] })
				]
			}),
			l
		]
	});
}
function fe(e, t, n) {
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
var pe = null;
function me() {
	return pe ??= import("./GroupedListSortable-DzTojHzU.js").catch(() => null), pe;
}
var he = t("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function ge(e) {
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
function _e(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function ve(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ye(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function be({ groups: e, rows: n, onOpenRow: r, rowMenu: i, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: l, currentId: u = null, hideEmptyGroups: f = !1, onReorder: h, canReorder: g, reorderLabel: v, size: b = "sm", groupHeading: S = "title", currentStyle: E = "tint", groupCountStyle: k = "chip", groupCountAlign: A = "inline", rowStyle: j = "ruled", className: M, "data-testid": N = "grouped-list" }) {
	let P = b === "md", F = S === "label", I = A === "end" ? "ml-auto pr-1" : void 0, L = s !== void 0, [R, ee] = T(() => {
		let t = ge(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), z = y((e) => L ? s.includes(e) : !R.has(e), [
		L,
		s,
		R
	]), B = y((e, t) => {
		L || ee((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), _e(l, r), r;
		}), c?.(e, t);
	}, [
		L,
		c,
		l
	]), V = C(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => t.set(e.id, [])), n.forEach((e) => {
			let n = t.get(e.groupId);
			n && n.push(e);
		}), t;
	}, [e, n]), H = C(() => f ? e.filter((e) => (V.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		V,
		f
	]), U = C(() => {
		let e = [];
		return H.forEach((t) => {
			e.push(`g:${t.id}`), z(t.id) && V.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		H,
		V,
		z
	]), [W, G] = T(null), K = w(null), q = y((e) => !!h && (g ? g(e) : !e.disabled), [h, g]), [te, ne] = T(""), J = w(null), [Y, re] = T(null), [ie, ae] = T(null), oe = w(/* @__PURE__ */ new Map()), X = !!h;
	x(() => {
		if (!X || Y) return;
		let e = !0;
		return me().then((t) => {
			e && t && re(t);
		}), () => {
			e = !1;
		};
	}, [X, Y]);
	let Z = y((t, n, r) => {
		if (!h) return;
		let i = e.find((e) => e.id === n), a = (V.get(n) ?? []).filter((e) => e.id !== t.id).length;
		h(t.id, n, r), ne(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		h,
		e,
		V
	]), se = y((t, n) => {
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
	]), ce = y((e, t) => {
		let r = n.find((t) => t.id === e), i = r && q(r) ? fe(n, e, t) : null;
		r && i && Z(r, i.toGroupId, i.index);
	}, [
		n,
		q,
		Z
	]), le = C(() => {
		if (W && U.includes(W)) return W;
		let e = n.find((e) => e.current || e.id === u), t = e ? `r:${e.id}` : null;
		return t && U.includes(t) ? t : U[0] ?? null;
	}, [
		W,
		U,
		n,
		u
	]), Q = y((e) => {
		let t = K.current?.querySelector(`[data-focus-key="${ve(e)}"]`);
		t && (G(e), t.focus());
	}, []);
	x(() => {
		W && !U.includes(W) && G(null);
	}, [W, U]), x(() => {
		let e = J.current;
		if (!e || (V.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !U.includes(`r:${e.id}`)) return;
		J.current = null;
		let t = K.current?.querySelector(`[data-focus-key="${ve(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && Q(`r:${e.id}`);
	});
	let ue = y((e) => {
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
			t && q(t) && se(t, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let n = t.closest("[data-row-id]");
				n && ye(n) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < U.length - 1 && Q(U[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && Q(U[i - 1]);
				break;
			case "Home":
				e.preventDefault(), U.length && Q(U[0]);
				break;
			case "End":
				e.preventDefault(), U.length && Q(U[U.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) z(o) && B(o, !1);
				else {
					let e = n.find((e) => e.id === o);
					e && (B(e.groupId, !1), Q(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!z(o)) B(o, !0);
				else {
					let e = V.get(o)?.[0];
					e && Q(`r:${e.id}`);
				}
			}
		}
	}, [
		U,
		Q,
		z,
		B,
		n,
		V,
		h,
		q,
		se
	]), $ = /* @__PURE__ */ O("div", {
		ref: K,
		"data-testid": N,
		className: t("flex flex-col", M),
		onKeyDown: ue,
		children: [h && /* @__PURE__ */ D("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${N}-reorder-status`,
			children: te
		}), H.map((e) => {
			let n = z(e.id), s = V.get(e.id) ?? [], c = `${N}-group-toggle-${e.id}`, l = `${N}-group-rows-${e.id}`, f = `g:${e.id}`;
			return /* @__PURE__ */ O("section", {
				"aria-labelledby": c,
				"data-testid": `${N}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": n,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ D("h3", {
						className: t("m-0 rounded-md", ie === e.id && "bg-primary/8"),
						"data-drop-over": ie === e.id || void 0,
						ref: (t) => {
							oe.current.set(e.id, t);
						},
						children: /* @__PURE__ */ O("button", {
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": f,
							"aria-expanded": n,
							"aria-controls": l,
							tabIndex: le === f ? 0 : -1,
							onFocus: () => G(f),
							onClick: () => B(e.id, !n),
							"data-heading": F ? "label" : void 0,
							className: t("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left", _, F ? t(m, d) : P ? "text-[15px] font-semibold text-text-primary" : "text-[14px] font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ D("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ D(p, { open: n })
								}),
								e.icon && /* @__PURE__ */ D("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${N}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ D("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && !F && k === "plain" && /* @__PURE__ */ D("span", {
									className: t("shrink-0 text-[13px] font-medium text-text-secondary", I),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-style": "plain",
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && F && /* @__PURE__ */ D("span", {
									className: t("shrink-0", "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", I),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": A === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && !F && k !== "plain" && /* @__PURE__ */ D(a, {
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
					/* @__PURE__ */ O("ul", {
						id: l,
						"data-testid": l,
						hidden: !n,
						className: "m-0 flex list-none flex-col p-0",
						children: [n && s.length === 0 && /* @__PURE__ */ D("li", {
							className: "px-4 py-3 pl-12 text-[13px] text-text-tertiary",
							"data-testid": `${N}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), n && s.map((e) => /* @__PURE__ */ D(xe, {
							row: e,
							current: e.current || e.id === u,
							currentStyle: E,
							rowStyle: j,
							testId: N,
							size: b,
							tabbable: le === `r:${e.id}`,
							onFocusRow: () => G(`r:${e.id}`),
							onOpenRow: r,
							menuSections: i?.(e),
							menuLabel: o?.(e) ?? `Actions for ${e.title}`,
							reorder: q(e) ? {
								label: v?.(e) ?? `Reorder ${e.title}`,
								sortable: Y
							} : void 0
						}, e.id))]
					}),
					Y && /* @__PURE__ */ D(Y.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => oe.current.get(e.id) ?? null,
						onOverChange: (t) => ae((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return Y ? /* @__PURE__ */ D(Y.GroupedListDndRoot, {
		ids: U.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: ce,
		children: $
	}) : $;
}
function xe({ row: e, current: n, currentStyle: r, rowStyle: i, testId: a, size: s, tabbable: c, onFocusRow: l, onOpenRow: d, menuSections: p, menuLabel: m, reorder: _ }) {
	let v = !!p && p.some((e) => e.items.length > 0), b = e.hoverSubline !== void 0 && e.hoverSubline !== null, x = e.meta !== void 0 && e.meta !== null, S = e.leading !== void 0 && e.leading !== null, C = `r:${e.id}`, w = s === "md", E = w || i === "plain", [k, A] = T({
		dragging: !1,
		over: !1
	}), j = y((e) => {
		A((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), M = {
		"aria-label": _?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${a}-row-handle-${e.id}`,
		className: t(he, w && "h-8 w-6 text-text-secondary")
	}, N = /* @__PURE__ */ D(o, { size: w ? 20 : 14 });
	return /* @__PURE__ */ O("li", {
		"data-dragging": k.dragging || void 0,
		"data-drop-over": k.over && !k.dragging || void 0,
		"data-testid": `${a}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": n || void 0,
		"aria-current": n ? "true" : void 0,
		onFocus: l,
		...v ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), ye(e.currentTarget));
		} } : {},
		className: t("group relative flex items-center gap-3 px-2", i === "plain" ? "border-t-0" : "border-t border-border", i === "plain" ? h : w ? "py-[7px]" : "py-2.5", "transition-colors duration-100", n ? t(g, "hover:bg-primary/12") : "hover:bg-surface-hover", E && n && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !E && n && r === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", k.dragging && "opacity-50", k.over && !k.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			S && /* @__PURE__ */ D("span", {
				className: t("flex shrink-0 items-center justify-center", w ? "w-6" : "w-5"),
				"data-testid": `${a}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ O("button", {
				type: "button",
				"data-testid": `${a}-row-open-${e.id}`,
				"data-focus-key": C,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: c ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || d?.(e);
				},
				className: t("flex min-w-0 flex-1 items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!S && /* @__PURE__ */ D("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ D("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${a}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ O("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ O("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ D("span", {
									className: t("truncate text-text-primary", E ? f : "text-[14px] font-medium leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ D("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							x && /* @__PURE__ */ D("span", {
								"data-testid": `${a}-row-meta-${e.id}`,
								className: t("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", w ? "text-[13px] leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || b) && /* @__PURE__ */ O("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ D("span", {
									"data-testid": `${a}-row-subline-${e.id}`,
									className: t("block truncate", b && (n ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), b && /* @__PURE__ */ D("span", {
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
			e.hoverActions && /* @__PURE__ */ D("span", {
				"data-testid": `${a}-row-actions-${e.id}`,
				className: t("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", n ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ D("span", {
				className: "flex shrink-0 items-center gap-1.5 text-[13px]",
				"data-testid": `${a}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			v && /* @__PURE__ */ D("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${a}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ D(u, {
					trigger: /* @__PURE__ */ D("span", {
						"aria-hidden": "true",
						className: "text-base leading-none",
						children: "⋯"
					}),
					triggerLabel: m,
					triggerTabIndex: -1,
					triggerTestId: `${a}-row-menu-trigger-${e.id}`,
					align: "end",
					sections: p,
					triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
				})
			}),
			_ && (_.sortable ? /* @__PURE__ */ D(_.sortable.SortableHandle, {
				id: e.id,
				onStateChange: j,
				...M,
				children: N
			}) : /* @__PURE__ */ D("button", {
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
var Se = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function Ce() {
	return /* @__PURE__ */ D("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ D("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function we({ children: e, label: r = "Filter", activeCount: i = 0, onClear: o, clearLabel: s = "Clear filters", open: c, onOpenChange: u, placement: d = "bottom-start", size: f = "md", trigger: p = "label", panelLabel: m = "Filters", className: h, panelClassName: g, icon: _, "data-testid": v = "filter-popover" }) {
	let [y, b] = T(!1), x = c ?? y, C = (e) => {
		c === void 0 && b(e), u?.(e);
	}, E = w(null), k = S(), A = i > 0;
	return /* @__PURE__ */ O("span", {
		className: t("inline-flex shrink-0", h),
		"data-testid": `${v}-root`,
		children: [/* @__PURE__ */ O(n, {
			ref: E,
			type: "button",
			variant: "secondary",
			size: f,
			"aria-haspopup": "dialog",
			"aria-expanded": x,
			"aria-controls": x ? k : void 0,
			"data-testid": `${v}-trigger`,
			"data-active": A || void 0,
			onClick: () => C(!x),
			...p === "icon" ? {
				"aria-label": A ? `${r} (${i} active)` : r,
				title: r
			} : {},
			className: t("inline-flex items-center gap-2 whitespace-nowrap", p === "icon" && (f === "lg" ? "relative h-11 w-11 justify-center rounded-lg px-0 py-0 text-text-secondary [&_svg]:h-5 [&_svg]:w-5" : "relative h-9 w-9 justify-center px-0 py-0 text-text-secondary [&_svg]:h-[18px] [&_svg]:w-[18px]"), A && "border-primary-border text-primary-fg"),
			children: [
				_ ?? /* @__PURE__ */ D(Ce, {}),
				p === "label" && /* @__PURE__ */ D("span", { children: r }),
				p === "icon" && A && /* @__PURE__ */ D("span", {
					"aria-hidden": "true",
					"data-testid": `${v}-dot`,
					className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"
				}),
				p === "label" && A && /* @__PURE__ */ D(a, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${v}-count`,
					"aria-label": `${i} active filters`,
					children: i
				})
			]
		}), /* @__PURE__ */ D(l, {
			open: x,
			onClose: () => C(!1),
			trigger: E,
			placement: Se[d],
			"aria-label": m,
			"data-testid": v,
			className: t("min-w-[280px] max-w-[420px] p-3", g),
			children: /* @__PURE__ */ O("div", {
				id: k,
				className: "flex flex-col gap-3",
				children: [e, o && /* @__PURE__ */ D("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ D(n, {
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
export { j as _, Q as a, le as c, ne as d, K as f, B as g, U as h, $ as i, ce as l, V as m, be as n, Z as o, G as p, de as r, se as s, we as t, re as u, N as v, M as y };
