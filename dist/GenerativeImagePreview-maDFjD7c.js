import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./usePrefersReducedMotion-Cllucr7i.js";
import { d as n, l as r, n as i } from "./Button-DQoeE5dN.js";
import { t as a } from "./Chip-5WvKIIpI.js";
import { M as o } from "./Icons-CqVFbuiZ.js";
import { t as s } from "./overlayStack-BFH9XXvN.js";
import { t as c } from "./Input-DiOEvL5h.js";
import { i as l, r as u } from "./focusTrap-CmWJlptm.js";
import { t as d } from "./DropdownMenu-DoCRgXx4.js";
import { t as f } from "./FileUploadDrop-Da3teuhw.js";
import { a as p, c as m, d as h, i as g, l as _, n as v, o as y } from "./railType-OvWDaK-G.js";
import { createContext as b, useCallback as x, useContext as S, useEffect as C, useId as w, useMemo as T, useRef as E, useState as D } from "react";
import { Fragment as O, jsx as k, jsxs as A } from "react/jsx-runtime";
import { createPortal as j } from "react-dom";
//#region src/contexts/PresenceContext.tsx
var M = b(null);
function N({ value: e, children: t }) {
	return /* @__PURE__ */ k(M.Provider, {
		value: e,
		children: t
	});
}
function P() {
	let e = S(M);
	if (!e) throw Error("usePresenceContext must be used within a <PresenceProvider>");
	return e;
}
function F() {
	return S(M);
}
//#endregion
//#region src/components/shared/CodeEditor.tsx
var I = "'SF Mono', Menlo, monospace", L = 12, R = 1.5, z = L * R, B = 8, V = 10, H = 36;
function U({ value: e, onChange: t, language: r = "plain", placeholder: i, minLines: a = 4, maxLines: o = 20, readOnly: s = !1, variables: c, "aria-label": l }) {
	let u = E(null), [d, f] = D(!1), p = T(() => Math.max(1, e.split("\n").length), [e]), m = T(() => {
		let e = Math.max(p, a), t = [];
		for (let n = 1; n <= e; n++) t.push(String(n));
		return t.join("\n");
	}, [p, a]), h = Math.min(Math.max(p, a), o) * z + 16, g = p > o, _ = (n) => {
		let r = u.current, i = e ?? "";
		if (!r) {
			t(i + n);
			return;
		}
		let a = r.selectionStart ?? i.length, o = r.selectionEnd ?? i.length;
		t(i.slice(0, a) + n + i.slice(o)), queueMicrotask(() => {
			if (u.current) {
				let e = a + n.length;
				u.current.focus(), u.current.setSelectionRange(e, e);
			}
		});
	};
	return C(() => {
		let e = u.current;
		if (!e || !g) return;
		let t = e.parentElement?.querySelector("[data-gutter]");
		if (!t) return;
		let n = () => {
			t.scrollTop = e.scrollTop;
		};
		return e.addEventListener("scroll", n), () => e.removeEventListener("scroll", n);
	}, [g]), /* @__PURE__ */ A("div", { children: [c && c.length > 0 && /* @__PURE__ */ k("div", {
		className: "flex flex-wrap gap-1 mb-1",
		children: c.map((e) => /* @__PURE__ */ k("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => _(`{{ ${e} }}`),
			className: "inline-block px-1.5 py-px text-[11px] bg-primary-bg text-primary-fg border border-primary-border rounded cursor-pointer leading-[1.4]",
			style: { fontFamily: I },
			title: `Insert {{ ${e} }}`,
			disabled: s,
			children: e
		}, e))
	}), /* @__PURE__ */ A("div", {
		className: n("flex border border-border-field rounded-md bg-surface-inset overflow-hidden box-border", d && "border-primary shadow-[0_0_0_1px_#646cff]"),
		style: {
			fontFamily: I,
			fontSize: L,
			lineHeight: R,
			height: h
		},
		children: [/* @__PURE__ */ k("div", {
			"data-gutter": !0,
			className: "text-right select-none border-r border-border overflow-hidden whitespace-pre bg-surface-panel text-text-tertiary text-[11px]",
			style: {
				width: H,
				padding: `${B}px 6px`,
				fontFamily: I,
				lineHeight: R
			},
			children: m
		}), /* @__PURE__ */ k("textarea", {
			"data-ui-part": "",
			ref: u,
			value: e,
			onChange: (e) => {
				t(e.target.value);
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
				padding: `${B}px ${V}px`,
				fontFamily: I,
				fontSize: L,
				lineHeight: R,
				tabSize: 2,
				height: h,
				overflow: g ? "auto" : "hidden"
			}
		})]
	})] });
}
//#endregion
//#region src/components/shared/IconPicker.tsx
var W = /* @__PURE__ */ "🔀.🔁.🔄.⚙️.🛠.🧰.🔧.⚡.🧠.💡.📊.📈.📉.📋.📝.📄.✉️.💬.📨.📤.📥.🔔.📢.📡.🚀.🎯.🎨.🧪.🔬.🔭.🧭.🗺.🗂.📁.🗃.🗄.💾.🔒.🔑.🛡.🌐.🔗.🔀.⏩.⏱.🔍.📌.🏷".split(".");
function G({ emoji: e, active: t, onPick: r }) {
	return /* @__PURE__ */ k("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(e),
		className: n("w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-surface-hover", t ? "border border-primary" : "border border-transparent"),
		"aria-label": `Select ${e}`,
		"aria-pressed": t,
		children: e
	});
}
function ee({ value: e, onChange: t, curated: n }) {
	let [r, i] = D(!1), [a, o] = D(!1), [s, c] = D(""), u = E(null), d = E(null), f = n ?? W;
	C(() => {
		if (!r) return;
		let e = (e) => {
			let t = e.target;
			u.current && u.current.contains(t) || d.current && d.current.contains(t) || i(!1);
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [r]), l(r, x(() => i(!1), []));
	let p = (e) => {
		t(e), i(!1);
	}, m = () => {
		let e = s.trim();
		e.length !== 0 && (t(e), c(""), i(!1));
	};
	return /* @__PURE__ */ A("div", {
		className: "relative inline-block",
		ref: u,
		children: [/* @__PURE__ */ k("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => i((e) => !e),
			className: "w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-surface-hover hover:border-border-emphasis",
			"aria-label": "Choose icon",
			"aria-haspopup": "dialog",
			"aria-expanded": r,
			"data-testid": "icon-picker-trigger",
			children: /* @__PURE__ */ k("span", {
				"aria-hidden": !0,
				children: e
			})
		}), r ? /* @__PURE__ */ A("div", {
			ref: d,
			role: "dialog",
			"aria-label": "Choose an icon",
			className: "absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]",
			"data-testid": "icon-picker-popover",
			children: [/* @__PURE__ */ k("div", {
				className: "grid grid-cols-[repeat(8,28px)] gap-1",
				children: f.map((t, n) => /* @__PURE__ */ k(G, {
					emoji: t,
					active: t === e,
					onPick: p
				}, `${t}-${n}`))
			}), /* @__PURE__ */ A("div", {
				className: "flex gap-1.5 mt-2.5 pt-2.5 border-t border-border",
				children: [/* @__PURE__ */ k("input", {
					"data-ui-part": "",
					type: "text",
					value: s,
					onChange: (e) => c(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), m()) : e.key === "Escape" && i(!1);
					},
					placeholder: "Paste any emoji…",
					className: "flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-surface-inset text-text-primary outline-none",
					"data-testid": "icon-picker-custom-input",
					"aria-label": "Custom emoji"
				}), /* @__PURE__ */ k("button", {
					"data-ui-part": "",
					type: "button",
					onClick: m,
					disabled: s.trim().length === 0,
					className: "px-2.5 py-1 text-xs font-semibold bg-primary text-on-primary border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
					children: "Set"
				})]
			})]
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ImageLightbox.tsx
var K = n("absolute top-1/2 -translate-y-1/2 flex items-center justify-center", "w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none", "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80");
function te({ images: e, openIndex: t, onClose: r, onNavigate: i }) {
	let a = E(null), o = E(null), [c, l] = D(t);
	C(() => {
		l(t);
	}, [t]);
	let d = t !== null && e.length > 0, f = s(d), p = i ? t : c ?? t, m = p === null ? 0 : Math.min(Math.max(p, 0), e.length - 1), h = (t) => {
		let n = e.length;
		if (n < 2) return;
		let r = (m + t + n) % n;
		i ? i(r) : l(r);
	};
	if (C(() => {
		if (d) return o.current = typeof document < "u" ? document.activeElement : null, a.current?.focus(), () => {
			let e = o.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), o.current = null;
		};
	}, [d]), C(() => {
		if (!d) return;
		let e = (e) => {
			f() && (e.key === "Tab" ? u(e, a.current) : e.key === "Escape" ? (e.stopPropagation(), r()) : e.key === "ArrowLeft" ? (e.preventDefault(), h(-1)) : e.key === "ArrowRight" && (e.preventDefault(), h(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		m,
		e.length,
		r,
		i,
		f
	]), !d) return null;
	let g = e[m], _ = e.length > 1;
	return j(/* @__PURE__ */ A("div", {
		ref: a,
		"data-testid": "image-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": g.caption ?? g.alt ?? `Image ${m + 1} of ${e.length}`,
		tabIndex: -1,
		className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none",
		onClick: r,
		children: [
			/* @__PURE__ */ A("div", {
				"data-testid": "image-lightbox-counter",
				className: "absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90",
				children: [
					m + 1,
					" / ",
					e.length
				]
			}),
			/* @__PURE__ */ k("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Close",
				"data-testid": "image-lightbox-close",
				className: n("absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full", "bg-black/50 text-lg leading-none text-white hover:bg-black/70", "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"),
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				children: "✕"
			}),
			/* @__PURE__ */ A("figure", {
				className: "flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ k("img", {
					"data-testid": "image-lightbox-img",
					src: g.src,
					alt: g.alt ?? "",
					className: "max-h-[85vh] max-w-[85vw] rounded-md object-contain"
				}), g.caption && /* @__PURE__ */ k("figcaption", {
					"data-testid": "image-lightbox-caption",
					className: "max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90",
					children: g.caption
				})]
			}),
			_ && /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Previous image",
				"data-testid": "image-lightbox-prev",
				className: n(K, "left-3"),
				onClick: (e) => {
					e.stopPropagation(), h(-1);
				},
				children: "‹"
			}), /* @__PURE__ */ k("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Next image",
				"data-testid": "image-lightbox-next",
				className: n(K, "right-3"),
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
function ne({ points: e, yMin: t, yMax: r, width: i = 120, height: a = 32, stroke: o = "currentColor", strokeWidth: s = 1.5, showLastPoint: c = !0, showFill: l = !0, ariaLabel: u, className: d }) {
	let f = e.filter((e) => Number.isFinite(e));
	if (f.length === 0) return /* @__PURE__ */ k("div", {
		role: "img",
		"aria-label": u ?? "No trend data",
		className: n("inline-flex items-center justify-center text-[10px] text-text-tertiary", d),
		style: {
			width: i,
			height: a
		},
		children: "—"
	});
	let p = Math.min(...f), m = Math.max(...f), h = t ?? (p === m ? p - 1 : p), g = r ?? (p === m ? m + 1 : m), _ = Math.max(1e-9, g - h), v = f.length === 1 ? 0 : i / (f.length - 1), y = s, b = a - y * 2, x = f.map((e, t) => ({
		x: f.length === 1 ? i / 2 : t * v,
		y: y + b - (e - h) / _ * b
	})), S = x.map((e, t) => `${t === 0 ? "M" : "L"}${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" "), C = `${S} L${x[x.length - 1].x.toFixed(2)},${(a - y).toFixed(2)} L${x[0].x.toFixed(2)},${(a - y).toFixed(2)} Z`, w = x[x.length - 1], T = `Trend, ${f.length} points, starts ${q(f[0])}, ends ${q(f[f.length - 1])}`;
	return /* @__PURE__ */ k("div", {
		role: "img",
		"aria-label": u ?? T,
		className: n("inline-block align-middle text-text-secondary", d),
		style: {
			width: i,
			height: a
		},
		children: /* @__PURE__ */ A("svg", {
			"aria-hidden": !0,
			viewBox: `0 0 ${i} ${a}`,
			width: i,
			height: a,
			className: "block",
			children: [
				l ? /* @__PURE__ */ k("path", {
					d: C,
					fill: o,
					fillOpacity: .12,
					stroke: "none"
				}) : null,
				/* @__PURE__ */ k("path", {
					d: S,
					fill: "none",
					stroke: o,
					strokeWidth: s,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				c ? /* @__PURE__ */ k("circle", {
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
function J(e, t) {
	let n = e.trim();
	return t ? n.toLowerCase() : n;
}
function re({ "aria-label": e, value: t, onChange: n, placeholder: r = "add tag...", suggestions: i, lowercase: a = !0 }) {
	let [o, s] = D(""), [c, l] = D(!1), u = E(null), d = (e) => {
		let r = J(e, a);
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
	}, m = T(() => {
		if (!i || i.length === 0) return [];
		let e = o.trim().toLowerCase(), n = new Set(t.map((e) => e.toLowerCase()));
		return i.map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0 && !n.has(e)).filter((t) => !e || t.includes(e)).slice(0, 12);
	}, [
		i,
		t,
		o
	]), h = c && m.length > 0;
	return /* @__PURE__ */ A("div", {
		className: "relative flex flex-wrap items-center gap-1.5",
		"data-testid": "tag-editor",
		children: [t.map((e) => /* @__PURE__ */ A("span", {
			className: "inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-surface-hover text-text-secondary",
			"data-testid": `tag-chip-${e}`,
			children: [e, /* @__PURE__ */ k("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": `Remove tag ${e}`,
				onClick: () => f(e),
				className: "ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]",
				children: "×"
			})]
		}, e)), /* @__PURE__ */ A("div", {
			className: "relative",
			children: [/* @__PURE__ */ k("input", {
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
			}), h ? /* @__PURE__ */ k("div", {
				className: "absolute top-full mt-1 bg-surface border border-border rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30",
				"data-testid": "tag-suggestions",
				children: m.map((e) => /* @__PURE__ */ A("button", {
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
var ie = "";
function ae(e, t) {
	let n = e.displayName;
	return typeof n == "string" && n.length > 0 ? n : t.slice(0, 8);
}
function oe({ value: t, onChange: r, placeholder: i, maxSelect: a, presenceUsers: o, idToken: s, searchUsers: c, baseUrl: l }) {
	let u = F(), d = e(), f = o ?? u?.presenceUsers ?? [], p = s === void 0 ? d?.idToken ?? null : s, [m, h] = D(""), [g, _] = D(!1), [v, y] = D(0), [b, x] = D([]), S = E(null), w = E(null), O = T(() => {
		let e = new Set(t), n = [];
		for (let t of f) {
			let r = t.metadata.userId ?? t.clientId;
			e.has(r) || (e.add(r), n.push({
				userId: r,
				displayName: ae(t.metadata, r)
			}));
		}
		return n;
	}, [f, t]);
	C(() => {
		let e = m.trim();
		if (!e) {
			x([]);
			return;
		}
		if (!c && !p) {
			x([]);
			return;
		}
		let t = new AbortController(), n = setTimeout(() => {
			if (c) {
				Promise.resolve(c(e, t.signal)).then((e) => x(Array.isArray(e) ? e : [])).catch(() => {});
				return;
			}
			let n = `${l ?? ie}/api/profiles?q=${encodeURIComponent(e)}&limit=20`;
			fetch(n, {
				headers: { Authorization: `Bearer ${p}` },
				signal: t.signal
			}).then((e) => e.ok ? e.json() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))).then((e) => {
				x(Array.isArray(e.profiles) ? e.profiles : []);
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
	let j = T(() => {
		let e = new Set(t), n = [];
		for (let t of O) e.has(t.userId) || (e.add(t.userId), n.push(t));
		for (let t of b) e.has(t.userId) || (e.add(t.userId), n.push({
			userId: t.userId,
			displayName: t.displayName || t.userId.slice(0, 8)
		}));
		return n;
	}, [
		O,
		b,
		t
	]), M = T(() => {
		let e = m.trim().toLowerCase();
		return e ? j.filter((t) => t.displayName.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e)) : j;
	}, [j, m]), N = typeof a == "number" && t.length >= a, P = (e) => {
		let n = e.trim();
		n && (t.includes(n) || N || (r([...t, n]), h(""), y(0)));
	}, I = (e) => {
		r(t.filter((t) => t !== e));
	}, L = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), _(!0), y((e) => Math.min(e + 1, Math.max(M.length - 1, 0)));
		else if (e.key === "ArrowUp") e.preventDefault(), y((e) => Math.max(e - 1, 0));
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = M[v];
			t ? P(t.userId) : m.trim() && P(m.trim());
		} else e.key === "Escape" ? _(!1) : e.key === "Backspace" && !m && t.length > 0 && I(t[t.length - 1]);
	}, R = (e) => {
		let t = f.find((t) => (t.metadata.userId ?? t.clientId) === e);
		if (t) return ae(t.metadata, e);
		let n = b.find((t) => t.userId === e);
		return n && n.displayName ? n.displayName : e;
	};
	return /* @__PURE__ */ A("div", {
		className: "flex flex-col gap-1.5 font-[inherit]",
		children: [t.length > 0 && /* @__PURE__ */ k("div", {
			className: "flex flex-wrap gap-1.5",
			children: t.map((e) => /* @__PURE__ */ A("span", {
				className: "inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
				children: [R(e), /* @__PURE__ */ k("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => I(e),
					"aria-label": `Remove ${R(e)}`,
					className: "bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0",
					children: "×"
				})]
			}, e))
		}), /* @__PURE__ */ A("div", {
			className: "relative",
			children: [/* @__PURE__ */ k("input", {
				"data-ui-part": "",
				ref: S,
				type: "text",
				value: m,
				disabled: N,
				"aria-label": N ? `Max ${a} selected` : i ?? "Search users…",
				placeholder: N ? `Max ${a} selected` : i ?? "Search users…",
				onChange: (e) => {
					h(e.target.value), _(!0), y(0);
				},
				onFocus: () => _(!0),
				onBlur: () => {
					w.current = setTimeout(() => _(!1), 120);
				},
				onKeyDown: L,
				className: "w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
			}), g && !N && M.length > 0 && /* @__PURE__ */ k("div", {
				className: "absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
				onMouseDown: (e) => {
					e.preventDefault(), w.current && clearTimeout(w.current);
				},
				children: M.map((e, t) => /* @__PURE__ */ A("div", {
					className: n("py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer", t === v ? "bg-surface-hover" : "bg-transparent"),
					onMouseEnter: () => y(t),
					onClick: () => {
						P(e.userId), S.current?.focus();
					},
					children: [/* @__PURE__ */ k("span", {
						className: "font-medium",
						children: e.displayName
					}), e.displayName !== e.userId && /* @__PURE__ */ k("span", {
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
function se({ name: e, value: t, onChange: r, options: i, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = w();
	return /* @__PURE__ */ k("div", {
		role: "radiogroup",
		"data-testid": s,
		className: n("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: i.map((i, o) => {
			let s = `${c}-${o}`, l = i.value === t;
			return /* @__PURE__ */ A("label", {
				htmlFor: s,
				className: n("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ A("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ k("input", {
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
						/* @__PURE__ */ k("span", {
							"aria-hidden": "true",
							className: n("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-surface" : "border-border-emphasis bg-surface", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ k("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ A("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ k("span", {
						className: n("text-sm leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: i.label
					}), i.description && /* @__PURE__ */ k("span", {
						className: n("text-xs leading-4 mt-0.5", a ? "text-text-disabled" : "text-neutral"),
						children: i.description
					})]
				})]
			}, i.value);
		})
	});
}
//#endregion
//#region src/components/shared/Divider.tsx
var Y = {
	none: "my-0",
	sm: "my-2",
	md: "my-4",
	lg: "my-6"
};
function X({ label: e, spacing: t = "md", className: r, "data-testid": i }) {
	let a = Y[t];
	return e == null ? /* @__PURE__ */ k("hr", {
		className: n("border-0 border-t border-border", a, r),
		...i ? { "data-testid": i } : {}
	}) : /* @__PURE__ */ A("div", {
		role: "separator",
		"aria-label": typeof e == "string" ? e : void 0,
		className: n("flex items-center gap-3", a, r),
		...i ? { "data-testid": i } : {},
		children: [
			/* @__PURE__ */ k("span", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ k("span", {
				className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap",
				children: e
			}),
			/* @__PURE__ */ k("span", { className: "h-px flex-1 bg-border" })
		]
	});
}
//#endregion
//#region src/components/shared/DetailSection.tsx
function ce({ title: e, as: t = "h3", hint: i, actions: a, first: o = !1, variant: s = "label", size: c, description: l, children: u, className: d, "data-testid": f }) {
	let p = r("DetailSection", c, {
		comfortable: "md",
		compact: "sm"
	});
	if (s === "heading") {
		let r = p === "lg", s = p === "sm", c = l != null && l !== !1;
		return /* @__PURE__ */ A("section", {
			"data-ui-part": "",
			className: n("group/section", d),
			"data-variant": "heading",
			"data-size": p,
			...f ? { "data-testid": f } : {},
			children: [
				!o && /* @__PURE__ */ k(X, { spacing: "md" }),
				/* @__PURE__ */ A("div", {
					className: n("flex items-center gap-2", r ? "h-7" : "h-6", r ? c ? "mb-0" : "mb-2" : "mb-0.5"),
					children: [
						/* @__PURE__ */ k(t, {
							className: n("m-0 font-semibold text-text-primary", r ? "text-[19px] leading-7" : s ? "text-sm leading-5" : "text-base leading-6"),
							children: e
						}),
						i != null && /* @__PURE__ */ k("span", {
							className: n("min-w-0 truncate text-text-tertiary", s ? "text-xs" : "text-[13px]"),
							children: i
						}),
						a != null && /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("span", { className: "flex-1" }), /* @__PURE__ */ k("span", {
							className: "flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100",
							children: a
						})] })
					]
				}),
				c && /* @__PURE__ */ k("p", {
					className: n("m-0 text-text-secondary", r ? "-mt-1 mb-2 text-[15px] leading-6" : s ? "mb-2 text-xs leading-4" : "mb-2 text-[13px] leading-5"),
					"data-testid": f ? `${f}-description` : void 0,
					children: l
				}),
				u
			]
		});
	}
	return /* @__PURE__ */ A("section", {
		"data-ui-part": "",
		className: n(d),
		...f ? { "data-testid": f } : {},
		children: [
			!o && /* @__PURE__ */ k(X, { spacing: "md" }),
			/* @__PURE__ */ A("div", {
				className: "mb-2 flex items-baseline gap-2",
				children: [
					/* @__PURE__ */ k(t, {
						className: "m-0 text-xs font-semibold uppercase tracking-wide text-text-tertiary",
						children: e
					}),
					i != null && /* @__PURE__ */ k("span", {
						className: "min-w-0 truncate text-xs text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("span", { className: "flex-1" }), a] })
				]
			}),
			u
		]
	});
}
function le(e, t, n) {
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
var ue = null;
function de() {
	return ue ??= import("./GroupedListSortable-8yOADSur.js").catch(() => null), ue;
}
var Z = n("flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0", "text-text-tertiary hover:text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function fe(e) {
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
function pe(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(Array.from(t)));
	} catch {}
}
function me(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function he(e) {
	let t = e.querySelector("[data-grouped-list-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function ge({ groups: e, rows: t, onOpenRow: r, rowMenu: i, rowMenuLabel: o, openGroups: s, onToggleGroup: c, storageKey: l, currentId: u = null, hideEmptyGroups: d = !1, onReorder: f, canReorder: m, reorderLabel: _, size: v = "sm", groupHeading: b = "title", currentStyle: S = "tint", groupCountStyle: w = "chip", groupCountAlign: O = "inline", rowStyle: j = "ruled", className: M, "data-testid": N = "grouped-list" }) {
	let P = b === "label", F = O === "end" ? "ml-auto pr-1" : void 0, I = s !== void 0, [L, R] = D(() => {
		let t = fe(l);
		return e.forEach((e) => {
			e.defaultOpen === !1 && !t.has(e.id) && t.add(e.id);
		}), t;
	}), z = x((e) => I ? s.includes(e) : !L.has(e), [
		I,
		s,
		L
	]), B = x((e, t) => {
		I || R((n) => {
			let r = new Set(n);
			return t ? r.delete(e) : r.add(e), pe(l, r), r;
		}), c?.(e, t);
	}, [
		I,
		c,
		l
	]), V = T(() => {
		let n = /* @__PURE__ */ new Map();
		return e.forEach((e) => n.set(e.id, [])), t.forEach((e) => {
			let t = n.get(e.groupId);
			t && t.push(e);
		}), n;
	}, [e, t]), H = T(() => d ? e.filter((e) => (V.get(e.id)?.length ?? 0) > 0) : e, [
		e,
		V,
		d
	]), U = T(() => {
		let e = [];
		return H.forEach((t) => {
			e.push(`g:${t.id}`), z(t.id) && V.get(t.id)?.forEach((t) => e.push(`r:${t.id}`));
		}), e;
	}, [
		H,
		V,
		z
	]), [W, G] = D(null), ee = E(null), K = x((e) => !!f && (m ? m(e) : !e.disabled), [f, m]), [te, ne] = D(""), q = E(null), [J, re] = D(null), [ie, ae] = D(null), oe = E(/* @__PURE__ */ new Map()), se = !!f;
	C(() => {
		if (!se || J) return;
		let e = !0;
		return de().then((t) => {
			e && t && re(t);
		}), () => {
			e = !1;
		};
	}, [se, J]);
	let Y = x((t, n, r) => {
		if (!f) return;
		let i = e.find((e) => e.id === n), a = (V.get(n) ?? []).filter((e) => e.id !== t.id).length;
		f(t.id, n, r), ne(`Moved ${t.title} to position ${r + 1} of ${a + 1} in ${i?.title ?? n}`);
	}, [
		f,
		e,
		V
	]), X = x((t, n) => {
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
		a && (Y(t, a.toGroupId, a.index), q.current = {
			id: t.id,
			groupId: a.toGroupId,
			index: a.index
		}, z(a.toGroupId) || B(a.toGroupId, !0));
	}, [
		V,
		e,
		Y,
		z,
		B
	]), ce = x((e, n) => {
		let r = t.find((t) => t.id === e), i = r && K(r) ? le(t, e, n) : null;
		r && i && Y(r, i.toGroupId, i.index);
	}, [
		t,
		K,
		Y
	]), ue = T(() => {
		if (W && U.includes(W)) return W;
		let e = t.find((e) => e.current || e.id === u), n = e ? `r:${e.id}` : null;
		return n && U.includes(n) ? n : U[0] ?? null;
	}, [
		W,
		U,
		t,
		u
	]), Z = x((e) => {
		let t = ee.current?.querySelector(`[data-focus-key="${me(e)}"]`);
		t && (G(e), t.focus());
	}, []);
	C(() => {
		W && !U.includes(W) && G(null);
	}, [W, U]), C(() => {
		let e = q.current;
		if (!e || (V.get(e.groupId) ?? []).findIndex((t) => t.id === e.id) !== e.index || !U.includes(`r:${e.id}`)) return;
		q.current = null;
		let t = ee.current?.querySelector(`[data-focus-key="${me(`r:${e.id}`)}"]`);
		t && t !== document.activeElement && Z(`r:${e.id}`);
	});
	let ge = x((e) => {
		let n = e.target;
		if (n.closest("[role=\"menu\"]")) return;
		let r = n.closest("[data-focus-key]")?.dataset.focusKey;
		if (!r) return;
		let i = U.indexOf(r);
		if (i < 0) return;
		let a = r.startsWith("g:"), o = r.slice(2);
		if (q.current = null, e.altKey && f && e.key.startsWith("Arrow")) {
			if (a) return;
			e.preventDefault();
			let n = t.find((e) => e.id === o);
			n && K(n) && X(n, e.key);
			return;
		}
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			if (!a) {
				let t = n.closest("[data-row-id]");
				t && he(t) && e.preventDefault();
			}
			return;
		}
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), i < U.length - 1 && Z(U[i + 1]);
				break;
			case "ArrowUp":
				e.preventDefault(), i > 0 && Z(U[i - 1]);
				break;
			case "Home":
				e.preventDefault(), U.length && Z(U[0]);
				break;
			case "End":
				e.preventDefault(), U.length && Z(U[U.length - 1]);
				break;
			case "ArrowLeft":
				if (e.preventDefault(), a) z(o) && B(o, !1);
				else {
					let e = t.find((e) => e.id === o);
					e && (B(e.groupId, !1), Z(`g:${e.groupId}`));
				}
				break;
			case "ArrowRight": if (e.preventDefault(), a) {
				if (!z(o)) B(o, !0);
				else {
					let e = V.get(o)?.[0];
					e && Z(`r:${e.id}`);
				}
			}
		}
	}, [
		U,
		Z,
		z,
		B,
		t,
		V,
		f,
		K,
		X
	]), Q = /* @__PURE__ */ A("div", {
		ref: ee,
		"data-testid": N,
		className: n("flex flex-col", M),
		onKeyDown: ge,
		children: [f && /* @__PURE__ */ k("div", {
			role: "status",
			"aria-live": "polite",
			className: "sr-only",
			"data-testid": `${N}-reorder-status`,
			children: te
		}), H.map((e) => {
			let t = z(e.id), s = V.get(e.id) ?? [], c = `${N}-group-toggle-${e.id}`, l = `${N}-group-rows-${e.id}`, d = `g:${e.id}`;
			return /* @__PURE__ */ A("section", {
				"data-ui-part": "",
				"aria-labelledby": c,
				"data-testid": `${N}-group-${e.id}`,
				"data-group-id": e.id,
				"data-open": t,
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ k("h3", {
						className: n("m-0 rounded-md", P ? g : "text-sm font-semibold", ie === e.id && "bg-primary/8"),
						"data-drop-over": ie === e.id || void 0,
						ref: (t) => {
							oe.current.set(e.id, t);
						},
						children: /* @__PURE__ */ A("button", {
							"data-ui-part": "",
							type: "button",
							id: c,
							"data-testid": c,
							"data-focus-key": d,
							"aria-expanded": t,
							"aria-controls": l,
							tabIndex: ue === d ? 0 : -1,
							onFocus: () => G(d),
							onClick: () => B(e.id, !t),
							"data-heading": P ? "label" : void 0,
							className: n("flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left", y, P ? n(g, p) : "text-sm font-semibold text-text-primary", "rounded-md hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: [
								/* @__PURE__ */ k("span", {
									className: "grid h-5 w-5 shrink-0 place-items-center text-text-secondary",
									children: /* @__PURE__ */ k(h, { open: t })
								}),
								e.icon && /* @__PURE__ */ k("span", {
									className: "flex shrink-0 items-center text-text-secondary",
									"data-testid": `${N}-group-icon-${e.id}`,
									children: e.icon
								}),
								/* @__PURE__ */ k("span", {
									className: "truncate",
									children: e.title
								}),
								typeof e.count == "number" && !P && w === "plain" && /* @__PURE__ */ k("span", {
									className: n("shrink-0 text-xs font-medium tabular-nums text-text-secondary", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-style": "plain",
									"data-count-align": O === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && P && /* @__PURE__ */ k("span", {
									className: n("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": O === "end" ? "end" : void 0,
									children: e.count
								}),
								typeof e.count == "number" && !P && w !== "plain" && /* @__PURE__ */ k(a, {
									size: "md",
									tone: "neutral",
									className: n("shrink-0", F),
									"aria-label": `${e.count} items`,
									"data-testid": `${N}-group-count-${e.id}`,
									"data-count-align": O === "end" ? "end" : void 0,
									children: e.count
								})
							]
						})
					}),
					/* @__PURE__ */ A("ul", {
						id: l,
						"data-testid": l,
						hidden: !t,
						className: "m-0 flex list-none flex-col p-0",
						children: [t && s.length === 0 && /* @__PURE__ */ k("li", {
							className: "px-4 py-3 pl-12 text-xs text-text-tertiary",
							"data-testid": `${N}-group-empty-${e.id}`,
							children: e.emptyLabel ?? "Nothing here"
						}), t && s.map((e) => /* @__PURE__ */ k(_e, {
							row: e,
							current: e.current || e.id === u,
							currentStyle: S,
							rowStyle: j,
							testId: N,
							size: v,
							tabbable: ue === `r:${e.id}`,
							onFocusRow: () => G(`r:${e.id}`),
							onOpenRow: r,
							menuSections: i?.(e),
							menuLabel: o?.(e) ?? `Actions for ${e.title}`,
							reorder: K(e) ? {
								label: _?.(e) ?? `Reorder ${e.title}`,
								sortable: J
							} : void 0
						}, e.id))]
					}),
					J && /* @__PURE__ */ k(J.GroupDropTarget, {
						id: `__grouped-list-group__:${e.id}`,
						getNode: () => oe.current.get(e.id) ?? null,
						onOverChange: (t) => ae((n) => t ? e.id : n === e.id ? null : n)
					})
				]
			}, e.id);
		})]
	});
	return J ? /* @__PURE__ */ k(J.GroupedListDndRoot, {
		ids: U.filter((e) => e.startsWith("r:")).map((e) => e.slice(2)),
		onDrop: ce,
		children: Q
	}) : Q;
}
function _e({ row: e, current: t, currentStyle: r, rowStyle: i, testId: a, size: s, tabbable: c, onFocusRow: l, onOpenRow: u, menuSections: f, menuLabel: p, reorder: h }) {
	let g = !!f && f.some((e) => e.items.length > 0), y = e.hoverSubline !== void 0 && e.hoverSubline !== null, b = e.meta !== void 0 && e.meta !== null, S = e.leading !== void 0 && e.leading !== null, C = `r:${e.id}`, w = s === "md", T = w || i === "plain", [E, O] = D({
		dragging: !1,
		over: !1
	}), j = x((e) => {
		O((t) => t.dragging === e.dragging && t.over === e.over ? t : e);
	}, []), M = {
		"aria-label": h?.label,
		title: "Drag to reorder, or Alt+arrow keys on the row",
		"data-testid": `${a}-row-handle-${e.id}`,
		className: n(Z, w && "h-8 w-6 text-text-secondary")
	}, N = /* @__PURE__ */ k(o, { size: w ? 20 : 14 });
	return /* @__PURE__ */ A("li", {
		"data-dragging": E.dragging || void 0,
		"data-drop-over": E.over && !E.dragging || void 0,
		"data-testid": `${a}-row-${e.id}`,
		"data-row-id": e.id,
		"data-current": t || void 0,
		"aria-current": t ? "true" : void 0,
		onFocus: l,
		...g ? { onContextMenu: (e) => {
			e.target.closest("[data-grouped-list-menu]") || (e.preventDefault(), he(e.currentTarget));
		} } : {},
		className: n("group relative flex items-center px-2", e.leadingSize === "indicator" ? "gap-2" : "gap-3", i === "plain" ? "border-t-0" : "border-t border-border", i === "plain" ? _ : w ? "py-[7px]" : "py-2.5", "transition-colors duration-100", t ? n(v, "hover:bg-primary/12") : "hover:bg-surface-hover", T && t && "rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]", !T && t && r === "bar" && "shadow-[inset_2px_0_0_0_var(--color-primary)]", e.disabled && "opacity-60", E.dragging && "opacity-50", E.over && !E.dragging && "shadow-[inset_0_2px_0_0_var(--color-primary)]"),
		children: [
			S && /* @__PURE__ */ k("span", {
				className: n("flex shrink-0 items-center justify-center", e.leadingSize === "indicator" ? "w-2" : w ? "w-6" : "w-5"),
				"data-ui-rail-leading": e.leadingSize,
				"data-testid": `${a}-row-leading-${e.id}`,
				children: e.leading
			}),
			/* @__PURE__ */ A("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${a}-row-open-${e.id}`,
				"data-focus-key": C,
				"aria-label": e.ariaLabel,
				"aria-disabled": e.disabled || void 0,
				tabIndex: c ? 0 : -1,
				disabled: e.disabled,
				onClick: () => {
					e.disabled || u?.(e);
				},
				className: n("flex min-w-0 flex-1 items-center rounded-md border-0 bg-transparent p-0 text-left", !S && e.leadingSize !== "none" ? "gap-2.5" : "gap-3", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.disabled ? "cursor-default" : "cursor-pointer"),
				children: [
					!S && e.leadingSize !== "none" && /* @__PURE__ */ k("span", {
						className: "w-5 shrink-0",
						"aria-hidden": "true"
					}),
					e.icon && /* @__PURE__ */ k("span", {
						className: "flex shrink-0 items-center",
						"data-testid": `${a}-row-icon-${e.id}`,
						children: e.icon
					}),
					/* @__PURE__ */ A("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ A("span", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [/* @__PURE__ */ k("span", {
									"data-ui-text": T ? "rail-item" : void 0,
									className: n("truncate text-text-primary", T ? m : "text-[14px] font-medium leading-5"),
									title: e.title,
									children: e.title
								}), e.pill && /* @__PURE__ */ k("span", {
									className: "flex shrink-0 items-center",
									children: e.pill
								})]
							}),
							b && /* @__PURE__ */ k("span", {
								"data-testid": `${a}-row-meta-${e.id}`,
								className: n("flex min-w-0 items-center gap-1.5 truncate text-text-secondary", w ? "text-xs leading-5" : "text-[12px] leading-4"),
								children: e.meta
							}),
							(e.subline !== void 0 || y) && /* @__PURE__ */ A("span", {
								className: "min-w-0 text-[12px] leading-4 text-text-secondary",
								children: [e.subline !== void 0 && /* @__PURE__ */ k("span", {
									"data-testid": `${a}-row-subline-${e.id}`,
									className: n("block truncate", y && (t ? "hidden" : "group-hover:hidden group-focus-within:hidden")),
									children: e.subline
								}), y && /* @__PURE__ */ k("span", {
									"aria-hidden": e.subline !== void 0 || void 0,
									"data-testid": `${a}-row-hover-subline-${e.id}`,
									className: n("truncate", t || e.subline === void 0 ? "block" : "hidden group-hover:block group-focus-within:block"),
									children: e.hoverSubline
								})]
							})
						]
					})
				]
			}),
			e.hoverActions && /* @__PURE__ */ k("span", {
				"data-testid": `${a}-row-actions-${e.id}`,
				className: n("flex shrink-0 items-center gap-1.5 transition-opacity duration-100", t ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"),
				children: e.hoverActions
			}),
			e.trailing && /* @__PURE__ */ k("span", {
				className: "flex shrink-0 items-center gap-1.5 text-xs",
				"data-testid": `${a}-row-trailing-${e.id}`,
				children: e.trailing
			}),
			g && /* @__PURE__ */ k("span", {
				"data-grouped-list-menu": !0,
				"data-testid": `${a}-row-menu-${e.id}`,
				className: "flex shrink-0 items-center",
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ k(d, {
					trigger: /* @__PURE__ */ k("span", {
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
			h && (h.sortable ? /* @__PURE__ */ k(h.sortable.SortableHandle, {
				id: e.id,
				onStateChange: j,
				...M,
				children: N
			}) : /* @__PURE__ */ k("button", {
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
//#region src/components/pipelines/list/catalog.ts
var Q = {
	documents: "Documents & presentations",
	agents: "Agents & experiments",
	conversations: "Conversations & media",
	other: "Other"
}, ve = [
	"documents",
	"agents",
	"conversations",
	"other"
], ye = {
	document: "page",
	presentation: "presentation",
	diagram: "diagram",
	agent: "agent",
	experiment: "experiment",
	recording: "recording",
	call: "call",
	conversation: "conversation",
	media: "media",
	workflow: "workflow"
}, be = {
	document: "documents",
	presentation: "documents",
	diagram: "documents",
	agent: "agents",
	experiment: "agents",
	recording: "conversations",
	call: "conversations",
	conversation: "conversations",
	media: "conversations",
	workflow: "other"
}, xe = {
	document: "Document",
	presentation: "Presentation",
	diagram: "Diagram",
	agent: "Agent",
	experiment: "Experiment",
	recording: "Recording",
	call: "Call",
	conversation: "Conversation",
	media: "Media",
	workflow: "Workflow"
}, Se = [
	"document",
	"presentation",
	"diagram",
	"agent",
	"experiment",
	"recording",
	"call",
	"conversation",
	"media",
	"workflow"
], Ce = {
	draft: "Draft",
	published: "Published",
	archived: "Archived"
}, we = [
	"published",
	"draft",
	"archived"
], Te = {
	worktype: "Work type",
	status: "Status",
	kind: "Kind",
	none: "None"
}, Ee = [
	"worktype",
	"status",
	"kind",
	"none"
], De = "all";
function Oe(e) {
	return e.kind && e.kind in ye ? e.kind : "workflow";
}
function ke(e) {
	return e.workType && e.workType in Q ? e.workType : be[Oe(e)];
}
function Ae(e) {
	if (!(!e || e.length === 0)) return e.join(" → ");
}
function je(e, t = Date.now()) {
	if (!e) return;
	let n = new Date(e).getTime();
	if (Number.isNaN(n)) return;
	let r = Math.max(0, t - n);
	return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 6048e5 ? `${Math.floor(r / 864e5)}d ago` : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric"
	}).format(new Date(n));
}
var Me = /* @__PURE__ */ new Set([
	"failed",
	"interrupted",
	"stuck"
]), Ne = /* @__PURE__ */ new Set(["running", "awaiting_approval"]);
function Pe(e, t = Date.now()) {
	let n = e.rollup;
	if (n && n.lastRunId) {
		let e = je(n.lastRunAt, t);
		if (Ne.has(n.lastRunStatus)) return {
			tone: "info",
			label: n.lastRunStatus === "running" ? "Running" : "Awaiting approval",
			meta: e
		};
		if (Me.has(n.lastRunStatus)) return {
			tone: "danger",
			label: n.lastRunStatus === "failed" ? "Failed" : n.lastRunStatus === "stuck" ? "Stuck" : "Interrupted",
			meta: e
		};
		if (n.failedOfRecent > 0 && n.recent.length > 0) return {
			tone: "warning",
			label: `${n.failedOfRecent} of ${n.recent.length} failed`,
			meta: e
		};
	}
	return {
		tone: e.status === "published" ? "success" : "neutral",
		label: Ce[e.status] ?? e.status
	};
}
function Fe(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = (e, t) => {
		n.set(t, e), r.set(e, (r.get(e) ?? 0) + 1);
	};
	return e.forEach((e) => {
		switch (t) {
			case "worktype":
				i(ke(e), e.id);
				break;
			case "status":
				i(e.status, e.id);
				break;
			case "kind":
				i(Oe(e), e.id);
				break;
			default: i("all", e.id);
		}
	}), {
		groups: (t === "worktype" ? ve.map((e) => ({
			id: e,
			title: Q[e]
		})) : t === "status" ? we.map((e) => ({
			id: e,
			title: Ce[e]
		})) : t === "kind" ? Se.map((e) => ({
			id: e,
			title: xe[e]
		})) : [{
			id: "all",
			title: "All pipelines"
		}]).filter((e) => (r.get(e.id) ?? 0) > 0).map((e) => ({
			...e,
			count: r.get(e.id) ?? 0
		})),
		groupOf: n
	};
}
function Ie(e, t) {
	let n = t.trim().toLowerCase();
	return !n || [
		e.name,
		e.description ?? "",
		Ae(e.route) ?? "",
		...e.tags ?? []
	].join(" ").toLowerCase().includes(n);
}
//#endregion
//#region src/components/image/ImageThumbnail.tsx
var Le = {
	sm: "w-16",
	md: "w-32",
	lg: "w-48"
}, Re = {
	square: "aspect-square",
	video: "aspect-video",
	auto: ""
};
function ze() {
	return /* @__PURE__ */ A("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "w-6 h-6 text-text-tertiary",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ k("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ k("circle", {
				cx: "8.5",
				cy: "8.5",
				r: "1.5"
			}),
			/* @__PURE__ */ k("path", { d: "M21 15l-5-5L5 21" })
		]
	});
}
function Be({ src: e, alt: t, size: r = "md", aspectRatio: i = "square", rounded: a = !1, fallback: o, loading: s = "lazy", className: c, "data-testid": l }) {
	let [u, d] = D({
		src: e,
		status: "loading"
	}), f = e ? u.src === e ? u.status : "loading" : "error", p = a ? i === "square" ? "rounded-full" : "rounded-lg" : "rounded-md";
	return /* @__PURE__ */ A("div", {
		"data-testid": l,
		className: n("relative overflow-hidden bg-surface-hover", Le[r], i !== "auto" && Re[i], p, c),
		children: [
			f === "loading" && /* @__PURE__ */ k("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 animate-pulse bg-surface-emphasis"
			}),
			f === "error" && /* @__PURE__ */ k("div", {
				className: "absolute inset-0 flex items-center justify-center bg-surface-hover",
				children: o ?? /* @__PURE__ */ k(ze, {})
			}),
			e && /* @__PURE__ */ k("img", {
				src: e,
				alt: t,
				loading: s,
				onLoad: () => d({
					src: e,
					status: "loaded"
				}),
				onError: () => d({
					src: e,
					status: "error"
				}),
				className: n("w-full h-full object-cover transition-opacity duration-200", f === "loaded" ? "opacity-100" : "opacity-0")
			}, e)
		]
	});
}
//#endregion
//#region src/components/pipelines/services/PipelineEditorServicesContext.tsx
var $ = b(null);
function Ve({ services: e, children: t }) {
	return /* @__PURE__ */ k($.Provider, {
		value: e,
		children: t
	});
}
function He() {
	let e = S($);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function Ue() {
	return S($)?.getImageUrl ?? null;
}
function We() {
	let e = S($);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function Ge(e) {
	let t = S($)?.nodeVocabulary?.[e];
	return T(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function Ke(e, t) {
	let n = S($)?.modelOptions?.[e];
	return T(() => n ?? t, [n, t]);
}
function qe() {
	let e = S($)?.modelOptions;
	return T(() => (t, n) => e?.[t] ?? n, [e]);
}
function Je() {
	let e = S($)?.webhookRelay;
	return T(() => ({
		enabled: e?.enabled ?? !1,
		publicUrlBase: e?.publicUrlBase
	}), [e?.enabled, e?.publicUrlBase]);
}
function Ye() {
	let e = S($)?.executableNodeTypes;
	return T(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
//#region src/components/image/ImageUploader.tsx
function Xe({ value: e, onChange: t, uploadImage: r, getImageUrl: a, maxSize: o = 8388608, accept: s = "image/*", fileOnly: l = !1, urlOnly: u = !1, className: d, "data-testid": p }) {
	let [m, h] = D(!1), [g, _] = D(null), [v, y] = D("");
	async function b(e) {
		h(!0), _(null);
		try {
			t(await r(e)), y("");
		} catch (e) {
			let t = e instanceof Error ? e.message : "Upload failed. Please try again.";
			_(t);
		} finally {
			h(!1);
		}
	}
	function x(e) {
		e.length > 0 && b(e[0]);
	}
	async function S() {
		let e = v.trim();
		e && await b({ url: e });
	}
	if (e) {
		let r = a(e.imageId);
		return /* @__PURE__ */ k("div", {
			className: n("flex flex-col gap-3", d),
			"data-testid": p,
			children: /* @__PURE__ */ A("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ k(Be, {
					src: r,
					alt: "Uploaded image",
					size: "md",
					aspectRatio: "square",
					"data-testid": p ? `${p}-thumbnail` : void 0
				}), /* @__PURE__ */ k(i, {
					variant: "ghost",
					size: "sm",
					onClick: () => t(null),
					"data-testid": p ? `${p}-replace` : void 0,
					children: "Replace"
				})]
			})
		});
	}
	return /* @__PURE__ */ A("div", {
		className: n("flex flex-col gap-3", d),
		"data-testid": p,
		children: [
			m && /* @__PURE__ */ k("p", {
				className: "text-sm text-neutral",
				"data-testid": p ? `${p}-uploading` : void 0,
				children: "Uploading..."
			}),
			!u && /* @__PURE__ */ k(f, {
				accept: s,
				maxSize: o,
				onFiles: x,
				disabled: m,
				"data-testid": p ? `${p}-drop` : void 0
			}),
			!l && /* @__PURE__ */ A("div", {
				className: "flex items-center gap-2",
				"data-testid": p ? `${p}-url-row` : void 0,
				children: [/* @__PURE__ */ k(c, {
					type: "url",
					placeholder: "https://example.com/image.jpg",
					value: v,
					onChange: (e) => y(e.target.value),
					disabled: m,
					"data-testid": p ? `${p}-url-input` : void 0,
					onKeyDown: (e) => {
						e.key === "Enter" && S();
					}
				}), /* @__PURE__ */ k(i, {
					variant: "secondary",
					size: "sm",
					onClick: () => void S(),
					disabled: m || !v.trim(),
					"data-testid": p ? `${p}-fetch-btn` : void 0,
					children: "Fetch"
				})]
			}),
			g && /* @__PURE__ */ k("p", {
				role: "alert",
				className: "text-sm text-danger-fg",
				"data-testid": p ? `${p}-error` : void 0,
				children: g
			})
		]
	});
}
function Ze(e) {
	let t = We(), n = t.uploadImage;
	return n ? /* @__PURE__ */ k(Xe, {
		...e,
		uploadImage: n,
		getImageUrl: t.getImageUrl
	}) : /* @__PURE__ */ k("div", {
		className: "text-sm text-neutral",
		children: "This host has not wired uploadImage. Cannot accept new uploads."
	});
}
//#endregion
//#region src/components/image/GenerativeImagePreview.tsx
function Qe(e) {
	return e < 60 ? `${e}s` : `${Math.floor(e / 60)}m ${e % 60}s`;
}
function $e({ startedAt: e }) {
	let [t, n] = D(() => Math.max(0, Math.floor((Date.now() - e) / 1e3)));
	return C(() => {
		let t = () => n(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
		t();
		let r = setInterval(t, 1e3);
		return () => clearInterval(r);
	}, [e]), /* @__PURE__ */ k("span", {
		"data-testid": "generative-image-preview-elapsed",
		className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
		children: Qe(t)
	});
}
function et({ status: e, src: r, alt: i = "", startedAt: a, className: o }) {
	let s = t(), c = E(e), [l, u] = D(!1);
	return c.current !== e && (c.current = e, e === "done" && !s && u(!0)), C(() => {
		if (!l) return;
		let e = setTimeout(() => u(!1), 30);
		return () => clearTimeout(e);
	}, [l]), /* @__PURE__ */ k("div", {
		"data-testid": "generative-image-preview",
		"data-status": e,
		className: n("relative overflow-hidden rounded-md bg-surface-hover", o),
		children: e === "synthesizing" ? /* @__PURE__ */ A(O, { children: [
			/* @__PURE__ */ k("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-shimmer",
				className: n("absolute inset-0", s ? "bg-surface-emphasis" : n("bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover", "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"))
			}),
			!s && /* @__PURE__ */ k("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-sweep",
				className: n("absolute inset-0", "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]", "bg-[length:400px_100%] bg-no-repeat", "animate-[skeleton-shimmer_2.4s_linear_infinite]")
			}),
			/* @__PURE__ */ k("span", {
				className: n("absolute inset-0 flex items-center justify-center", "text-[11px] font-medium tracking-wide text-neutral select-none"),
				children: "✦ synthesizing"
			}),
			a !== void 0 && /* @__PURE__ */ k($e, { startedAt: a })
		] }) : r ? /* @__PURE__ */ k("img", {
			src: r,
			alt: i,
			"data-testid": "generative-image-preview-img",
			className: n("h-full w-full object-cover", !s && "transition-[filter] duration-[400ms] ease-out", l ? "blur-[16px]" : "blur-0")
		}) : /* @__PURE__ */ k("div", {
			"aria-hidden": "true",
			className: "absolute inset-0 bg-surface-emphasis"
		})
	});
}
//#endregion
export { Pe as A, ee as B, ve as C, Ie as D, Fe as E, oe as F, N as H, re as I, ne as L, ce as M, X as N, je as O, se as P, te as R, Q as S, ke as T, F as U, U as V, P as W, ye as _, Ue as a, Ce as b, qe as c, Je as d, Be as f, xe as g, Ee as h, He as i, ge as j, Ae as k, Ge as l, Te as m, Ze as n, Ye as o, De as p, Ve as r, Ke as s, et as t, We as u, Se as v, Oe as w, we as x, be as y, W as z };
